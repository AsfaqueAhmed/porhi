# Design Specification: poRi Admin Authentication & Authorization (Phase 1)

**Date:** 2026-11-09  
**Status:** Approved by User  
**Target Applications:** `apps/api` (NestJS 11 + Prisma) and `apps/web` (Next.js 15 PWA)  
**Scope:** Phase 1 — Seeded System Admin (`01737740010`), Password Authentication, OTP Bypass Hardening, Dedicated Admin Session Store, `/admin/login` Page, and `/admin/*` Route Guard. *(Phase 2 — Staff Management UI & Fine-Grained Role Permissions — follows in a separate cycle.)*

---

## 1. Executive Summary & Problem Statement

### 1.1 Current Gaps
1. **Unprotected Frontend `/admin/*` Routes:** While backend mutations under `/admin/content/*` enforce `JwtAuthGuard` and `RolesGuard`, the Next.js `/admin` portal (`AdminLayout` and child routes) currently renders without checking authentication or user role.
2. **No Password Authentication Mechanism:** The Prisma `User` model and `AuthModule` only support passwordless guest sessions (`POST /auth/guest`) and SMS OTP (`POST /auth/verify-otp`). There is no password credential storage or verification endpoint for staff/admin login.
3. **OTP Takeover Vulnerability:** In development/test environments, `AuthService.verifyOtp` permits master OTP `'1234'`. Without an explicit block for non-student accounts, any user knowing an admin's phone number could log in via the public student OTP screen on `/` and obtain an `ADMIN` JWT without knowing the password.
4. **No Seeded Admin Account:** `apps/api/prisma/seed.ts` seeds curriculum data only; no initial `ADMIN` account exists in PostgreSQL.

### 1.2 Objectives
1. Add nullable `passwordHash` storage on `User` and a zero-dependency Node `crypto.scrypt` password hashing utility.
2. Seed the initial `ADMIN` user (`01737740010` / `Asfaque@321`) idempotently in `seed.ts` and apply to local PostgreSQL.
3. Expose `POST /auth/admin/login` for staff roles (`ADMIN`, `EDITOR`, `REVIEWER`) and harden `requestOtp` / `verifyOtp` so staff/password accounts cannot authenticate via student OTP.
4. Isolate admin credentials in Next.js (`useAdminAuthStore` + `pori_admin_token`) separate from student sessions (`useUserStore` + `pori_auth_token`), add `/admin/login`, enforce `/admin/*` verification via `GET /auth/me` inside `AdminLayout`, and provide logout + identity indicators in the admin shell.

---

## 2. Database & Seeding Design (`apps/api/prisma/`)

### 2.1 Prisma Schema Update (`schema.prisma`)
Add an optional `passwordHash` column to `User`:

```prisma
model User {
  id            String            @id @default(uuid())
  guestId       String?           @unique
  phoneNumber   String?           @unique
  fullName      String?
  passwordHash  String?
  role          Role              @default(STUDENT)
  selectedClass String            @default("SSC")
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt
  ...
}
```

- `passwordHash` remains `null` for `STUDENT` and guest accounts.
- `passwordHash` must never be included in serialized API user payloads.

### 2.2 Seed Script Update (`seed.ts`)
Inside `seed(prisma: PrismaClient)`:
- Read `adminPhone = process.env.ADMIN_SEED_PHONE || '01737740010'`.
- Read `adminPassword = process.env.ADMIN_SEED_PASSWORD || (process.env.NODE_ENV === 'production' ? '' : 'Asfaque@321')`.
- In production, if `ADMIN_SEED_PASSWORD` is omitted, skip overwriting/creating the default admin password and log a warning rather than hardcoding a production secret.
- Compute `passwordHash = await hashPassword(adminPassword)` using `password.util.ts`.
- Upsert via `prisma.user.upsert({ where: { phoneNumber: adminPhone }, update: { fullName: 'Asfaque (System Admin)', role: Role.ADMIN, passwordHash }, create: { phoneNumber: adminPhone, fullName: 'Asfaque (System Admin)', role: Role.ADMIN, selectedClass: 'SSC', passwordHash } })`.

---

## 3. Backend Auth & Security Design (`apps/api/src/modules/auth/`)

### 3.1 Password Hashing Utility (`password.util.ts`)
- Built exclusively on Node's standard `crypto` module (`scrypt`, `randomBytes`, `timingSafeEqual`) with zero extra npm dependencies.
- `hashPassword(password: string): Promise<string>`: generates a 16-byte random salt (`hex`) and 64-byte `scrypt` derived key (`hex`), returning `${salt}:${derivedKey}`.
- `verifyPassword(password: string, storedHash: string): Promise<boolean>`: splits `${salt}:${keyHex}`, computes candidate derived key with `scrypt`, verifies equal byte lengths, and compares using `timingSafeEqual`. Malformed hashes or non-matching lengths safely resolve to `false`.

### 3.2 `AdminLoginDto` (`dto/admin-login.dto.ts`)
```ts
export class AdminLoginDto {
  @IsString()
  @Matches(PHONE_REGEX, { message: 'Valid phone number is required' })
  phoneNumber!: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;
}
```

### 3.3 Endpoints & Service Logic
- **New Route (`AuthController`):** `@Post('admin/login')` delegating to `authService.adminLogin(dto.phoneNumber, dto.password)`.
- **`AuthService.adminLogin(phoneNumber, password)`:**
  1. Normalize phone via `normalizePhoneNumber(phoneNumber)` (supports `01737740010`, `+8801737740010`, `8801737740010`).
  2. Query `prisma.user.findUnique({ where: { phoneNumber: normalizedPhone } })`.
  3. If `!user || !user.passwordHash`: throw `UnauthorizedException('Invalid phone number or password')`.
  4. Verify password with `verifyPassword(password, user.passwordHash)`; if false, throw `UnauthorizedException('Invalid phone number or password')`.
  5. Verify role is in `[Role.ADMIN, Role.EDITOR, Role.REVIEWER]`; if `user.role === Role.STUDENT`, throw `ForbiddenException('Admin or staff access required')`.
  6. Sign JWT `{ sub: user.id, role: user.role, isGuest: false }` using existing `JwtService`.
  7. Return `{ accessToken, user: { id, phoneNumber, fullName, role, selectedClass } }`.
- **OTP Hardening (`requestOtp` & `verifyOtp`):**
  - Look up user by `normalizedPhone`.
  - If `user` exists and (`user.role !== Role.STUDENT` || `Boolean(user.passwordHash)`):
    - Both `requestOtp` and `verifyOtp` throw `ForbiddenException('OTP login is not permitted for admin or staff accounts')` before issuing/checking OTP codes or performing any guest migration.
- **Session Verification (`GET /auth/me`):**
  - Already guarded by `JwtAuthGuard` and `JwtStrategy.validate`, returning `{ id, guestId, phoneNumber, fullName, role, selectedClass, isGuest }` without `passwordHash`.
- **Controller RBAC (`ContentAdminController`):**
  - Existing `@UseGuards(JwtAuthGuard, RolesGuard)` and `@Roles(...)` decorators already enforce `ADMIN`, `EDITOR`, and `REVIEWER` privileges at every `/admin/content/*` endpoint.

---

## 4. Frontend Auth Isolation, Login UI & Guard (`apps/web/`)

### 4.1 Isolated Admin Auth Store (`src/store/admin-auth-store.ts`)
- Dedicated Zustand store persisted under `localStorage` key `'pori-admin-auth-storage'`, with token mirrored to `'pori_admin_token'`.
- Completely separate from student `useUserStore` (`'pori-user-storage'` / `'pori_auth_token'`) so student exploration on `/` and admin management on `/admin` do not overwrite each other.
- State fields:
  - `token: string | null`
  - `adminUser: AdminUserProfile | null`
  - `isVerified: boolean` *(excluded from persistence via `partialize` so every fresh page load validates the JWT cryptographically against `/auth/me`)*
- Actions:
  - `setSession(token: string, user: AdminUserProfile): void`
  - `setVerified(isVerified: boolean, user?: AdminUserProfile): void`
  - `logout(): void`

### 4.2 Scoped API Client (`src/lib/api-client.ts`)
- Add `scope?: 'student' | 'admin'` to `RequestOptions`.
- Token resolution priority:
  1. `options.token` if explicitly passed.
  2. Admin store (`useAdminAuthStore.getState().token` / `localStorage.getItem('pori_admin_token')`) when `options.scope === 'admin'` OR `(!options.scope && endpoint.startsWith('/admin'))`. Never falls back to student `pori_auth_token`.
  3. Student store (`useUserStore.getState().token` / `localStorage.getItem('pori_auth_token')`) for student/public endpoints.
- When a `401 Unauthorized` occurs on an admin-scoped request (`options.scope === 'admin' || endpoint.startsWith('/admin')`), call `useAdminAuthStore.getState().logout()` before throwing `ApiError` so stale tokens are cleared immediately.

### 4.3 Admin Login Page (`src/app/admin/login/page.tsx`)
- Styled in the existing **poRi Admin Light Theme** (`bg-slate-50`, white centered card, indigo primary button, subtle slate borders).
- Inputs:
  - Phone Number (`017XXXXXXXX`)
  - Password with show/hide visibility toggle
- Behavior:
  - Validates non-empty fields; submits `POST /auth/admin/login` with `{ scope: 'admin' }`.
  - Calls `useAdminAuthStore.getState().setSession(res.accessToken, res.user)`.
  - Redirects via `router.replace(safeNext)` where `safeNext` is validated to start with `/admin/` or equal `/admin` (never `/admin/login` and never external `//...` URLs to prevent open redirects).
  - Surfaces clear Bengali error banners for invalid credentials (`401`), non-staff accounts (`403`), or unreachable API.
  - Wrapped in `<Suspense>` for `useSearchParams()` compatibility in Next.js 15 production builds.

### 4.4 Route Guard in `AdminLayout` (`src/app/admin/layout.tsx`) & Shell Controls
- **Login Route Bypass:** If `pathname === '/admin/login'`, render `children` directly inside a clean shell without `AdminSidebar` or `AdminTopbar`.
- **Protected Admin Shell:** For all other `/admin/*` paths:
  1. Read `token`, `adminUser`, and `isVerified` from `useAdminAuthStore`.
  2. Wait for client hydration (`useEffect`), then verify credentials when `!isVerified`:
     - Read active token from `useAdminAuthStore` (falling back to `localStorage.getItem('pori_admin_token')`).
     - If no token exists -> `logout()` and `router.replace('/admin/login?next=' + encodeURIComponent(pathname))`.
     - If token exists -> request `apiClient.get('/auth/me', { scope: 'admin' })`.
       - If valid and `['ADMIN', 'EDITOR', 'REVIEWER'].includes(user.role)` -> `setSession(token, user)`.
       - Otherwise -> `logout()` and `router.replace('/admin/login?next=' + encodeURIComponent(pathname))`.
  3. While verification is pending or unauthorized, render a centered light-theme verification loader and **never mount protected `children`**, `AdminSidebar`, or `AdminTopbar`.
- **Sidebar & Topbar Updates (`AdminSidebar.tsx`, `AdminTopbar.tsx`):**
  - Display logged-in staff identity (`adminUser.fullName || adminUser.phoneNumber`) and role badge (`ADMIN` / `EDITOR` / `REVIEWER`).
  - Add a **লগআউট (Logout)** action button that clears `useAdminAuthStore` and navigates to `/admin/login`.
- **Overview & Auth Error Surface (`apps/web/src/app/admin/page.tsx` & `curriculum-manager.tsx`):**
  - Ensure admin page fetches work consistently with `apiClient` and surface explicit error messages when `401`/`403` errors occur instead of silently masking authorization failures on authenticated mutations.

---

## 5. Verification & Testing Strategy

1. **API Unit Tests (`apps/api/src/modules/auth/auth.service.spec.ts`):**
   - `hashPassword` + `verifyPassword` round-trip, wrong password, tampered/malformed hash handling.
   - `adminLogin`: valid credentials -> signed JWT & sanitized user (no `passwordHash`); wrong password -> `401`; missing `passwordHash` -> `401`; `STUDENT` role -> `403`.
   - OTP hardening: both `requestOtp` and `verifyOtp` throw `ForbiddenException` (`403`, even with dev master OTP `'1234'`) when phone belongs to an `ADMIN` or password-enabled user.
2. **API E2E Tests (`apps/api/test/auth.e2e.spec.ts`):**
   - Full `POST /auth/admin/login` -> `GET /auth/me` -> `POST /admin/content/subjects` flow verifying role enforcement, `401` on invalid password, and blocked OTP login for admin account.
3. **Web Tests (`apps/web/tests/admin-auth.test.tsx`):**
   - `useAdminAuthStore` isolation from `useUserStore` (`pori_admin_token` vs `pori_auth_token`).
   - `apiClient` sends `pori_admin_token` on `/admin/*` endpoints even when a student token is present, and clears admin session on `401`.
   - `/admin/login` form submission, loading state, error alert rendering on `401`, and safe `?next=` redirect.
   - `AdminLayout` blocks children and redirects unauthenticated or `STUDENT`-role sessions to `/admin/login`, and renders children + logout action once verified as `ADMIN`.
4. **Live Database & Server Verification:**
   - Run `pnpm --filter @pori/api prisma:push && pnpm --filter @pori/api prisma:generate && pnpm --filter @pori/api prisma:seed`.
   - Verify live `POST http://localhost:3001/auth/admin/login` with `01737740010` / `Asfaque@321`, confirm `POST /auth/verify-otp` with `01737740010` + `1234` fails cleanly, and verify Next.js `pnpm --filter @pori/web build` + full monorepo tests pass.
