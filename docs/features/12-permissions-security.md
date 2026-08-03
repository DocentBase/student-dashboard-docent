# Feature 12 — Permissions & Security

## Purpose
Define the access control rules that ensure students can only view their own data and cannot access any administrative or staff functionality.

---

## Authentication

### Provider: Clerk
- All authentication is handled by **Clerk** (sign-up, sign-in, password reset, session management)
- Clerk middleware protects all `/` routes (portal pages)
- Auth pages live under `(auth)/sign-in` and `(auth)/sign-up`

### Session Management
- JWT-based sessions via Clerk
- Session tokens include user ID and metadata (role, studentId)
- Server-side validation on every request

---

## Authorization Rules

### Student Role Permissions

| Resource | View Own | Edit | View Others | Admin Access |
|---|---|---|---|---|
| Attendance | ✅ | ❌ | ❌ | ❌ |
| Fees | ✅ | ❌ | ❌ | ❌ |
| Notes | ✅ Download | ❌ Upload | ❌ | ❌ |
| Exams | ✅ | ❌ | ❌ | ❌ |
| Results | ✅ | ❌ | ❌ | ❌ |
| Routine | ✅ | ❌ | ❌ | ❌ |
| Notices | ✅ Read | ❌ Create | ❌ | ❌ |
| Profile | ✅ | ⚠️ Limited | ❌ | ❌ |
| Settings | ✅ | ✅ Preferences | ❌ | ❌ |

### Students Can NEVER:
- Edit attendance records
- Modify fee amounts or payment status
- Change exam marks or results
- View other students' data
- Access staff/teacher pages
- Manage batches, classes, or sections
- Manage users or roles
- Access organization settings or admin panel
- Upload notes or resources
- Create or edit notices

### Profile Edit Rules:
- **Always editable**: Profile photo
- **Conditionally editable** (if organization allows): Phone number, email
- **Never editable**: Name, class, section, roll, batch, institution, guardian info

---

## Implementation

### Middleware (`src/middleware.ts`)
```typescript
// Clerk middleware configuration
// - Protect all routes under (portal)
// - Allow public access to (auth) routes
// - Redirect unauthenticated users to sign-in
```

### Server-Side Data Scoping
- Every database query MUST filter by the authenticated student's ID
- Never expose a query that can return another student's data
- Use Clerk's `auth()` helper to get the current user ID on every request

### API Route Protection
- All API routes under `/api/` must verify authentication
- All data queries must scope to `WHERE student_id = currentUser.studentId`
- Return 401 for unauthenticated requests
- Return 403 for unauthorized access attempts

---

## Security Headers

```typescript
// next.config.js security headers
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
];
```

---

## File Structure

```
src/
├── middleware.ts                # Clerk auth middleware
├── lib/
│   ├── auth.ts                 # Auth helper functions
│   └── permissions.ts          # Permission check utilities
```

---

## Acceptance Criteria

- [ ] All portal routes are protected by Clerk middleware
- [ ] Unauthenticated users are redirected to sign-in page
- [ ] Every database query filters by authenticated student ID
- [ ] No API endpoint returns data for other students
- [ ] Profile edit is restricted to allowed fields only
- [ ] 401 returned for unauthenticated API requests
- [ ] 403 returned for unauthorized data access attempts
- [ ] Security headers are set in Next.js config
- [ ] Staff/admin routes are completely inaccessible from student portal
- [ ] Session tokens are validated server-side on every request
