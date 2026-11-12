import { Injectable, UnauthorizedException } from '@nestjs/common';
import { App, applicationDefault, cert, getApps, initializeApp, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export interface VerifiedFirebaseToken {
  uid: string;
  phoneNumber?: string;
  email?: string;
  name?: string;
}

@Injectable()
export class FirebaseVerifierService {
  private app: App | null = null;

  private getOrInitApp(): App {
    if (this.app) {
      return this.app;
    }

    const existingApps = getApps();
    if (existingApps.length > 0) {
      this.app = existingApps[0];
      return this.app;
    }

    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
    const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
    const googleApplicationCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();

    if (serviceAccountJson) {
      let parsed: ServiceAccount & { project_id?: string };
      try {
        parsed = JSON.parse(serviceAccountJson) as ServiceAccount & { project_id?: string };
      } catch {
        throw new UnauthorizedException('Invalid Firebase configuration');
      }

      this.app = initializeApp({
        credential: cert(parsed),
        ...(parsed.project_id ? { projectId: parsed.project_id } : projectId ? { projectId } : {}),
      });
      return this.app;
    }

    if (projectId) {
      this.app = initializeApp({
        projectId,
        ...(googleApplicationCredentials ? { credential: applicationDefault() } : {}),
      });
      return this.app;
    }

    if (googleApplicationCredentials) {
      this.app = initializeApp({
        credential: applicationDefault(),
      });
      return this.app;
    }

    throw new UnauthorizedException('Firebase authentication is not configured');
  }

  async verifyIdToken(idToken: string): Promise<VerifiedFirebaseToken> {
    if (!idToken || typeof idToken !== 'string' || idToken.trim().length === 0) {
      throw new UnauthorizedException('Invalid Firebase ID token');
    }

    const app = this.getOrInitApp();

    try {
      const decoded = await getAuth(app).verifyIdToken(idToken.trim());
      if (!decoded?.uid) {
        throw new UnauthorizedException('Invalid Firebase ID token');
      }

      return {
        uid: decoded.uid,
        phoneNumber: typeof decoded.phone_number === 'string' ? decoded.phone_number : undefined,
        email: typeof decoded.email === 'string' ? decoded.email : undefined,
        name: typeof decoded.name === 'string' ? decoded.name : undefined,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired Firebase ID token');
    }
  }
}
