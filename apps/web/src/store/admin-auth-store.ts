import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const ADMIN_TOKEN_STORAGE_KEY = 'pori_admin_token';
export const ADMIN_PORTAL_ROLES = ['ADMIN', 'EDITOR', 'REVIEWER'] as const;

export type AdminPortalRole = (typeof ADMIN_PORTAL_ROLES)[number];

export interface AdminUserProfile {
  id: string;
  phoneNumber?: string | null;
  fullName?: string | null;
  role: string;
  selectedClass?: string;
}

export function isAllowedAdminRole(role?: string | null): role is AdminPortalRole {
  return Boolean(role && ADMIN_PORTAL_ROLES.includes(role as AdminPortalRole));
}

function sanitizeAdminUser(user: AdminUserProfile): AdminUserProfile {
  const safeUser = { ...user } as AdminUserProfile & { passwordHash?: unknown };
  delete safeUser.passwordHash;
  return safeUser;
}

interface AdminAuthState {
  token: string | null;
  adminUser: AdminUserProfile | null;
  isVerified: boolean;

  setSession: (token: string, user: AdminUserProfile) => void;
  setVerified: (isVerified: boolean, user?: AdminUserProfile) => void;
  logout: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      token: null,
      adminUser: null,
      isVerified: false,

      setSession: (token, adminUser) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
        }
        set({ token, adminUser: sanitizeAdminUser(adminUser), isVerified: true });
      },

      setVerified: (isVerified, adminUser) =>
        set((state) => ({
          isVerified,
          adminUser: adminUser !== undefined ? sanitizeAdminUser(adminUser) : state.adminUser,
        })),

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
        }
        set({ token: null, adminUser: null, isVerified: false });
      },
    }),
    {
      name: 'pori-admin-auth-storage',
      partialize: (state) => ({
        token: state.token,
        adminUser: state.adminUser,
      }),
    },
  ),
);
