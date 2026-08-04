# Feature 13 — Coaching: Join a Batch

**Route**: `/coaching`  
**Status**: ✅ Implemented

---

## Overview

The `/coaching` page serves two purposes:

1. **My Batches / My Institutes** — View enrolled batches and coaching centers (with join request status tracking).
2. **Join a Batch** — A multi-step wizard for students to discover and request to join a specific coaching batch using a join key provided by their teacher.

---

## Navigation Tabs

| Tab | Content |
|---|---|
| My Batches | Pending/approved/rejected join requests + (future) enrolled batch cards |
| My Institutes | Coaching center cards for enrolled organizations |
| Join a Batch | Multi-step join flow (join key → preview → form → confirmation) |

---

## Join a Batch Flow (Steps)

### Step 1 — Enter Join Key
- Input field for the batch join key (e.g., `PHY-2026-K2M9`)
- Key is case-insensitive; stored and compared as uppercase
- Rate limited: 5 attempts per user per minute (enforced in API)
- On error: generic `"Invalid or expired key."` — never reveals whether a key exists

### Step 2 — Batch Preview Card (read-only)
Returned by `POST /api/batches/lookup`:
- Coaching center name (`organizations.name`)
- Batch name, subject, class set
- Schedule / timing
- Mentor / assigned teacher
- Location, website link
- Monthly fee in BDT
- Student's existing request status check (conflict prevention)

**Conflict prevention at preview step:**
- If student already has a `pending` request → shows warning, disables continue
- If student is already `approved` / enrolled → shows "You're already enrolled"

### Step 3 — Join Request Form
Auto-filled (non-editable, from Clerk):
- Student name + profile photo

Manually entered by student:
- School / College / University (required)
- Class (required)
- Section (optional)
- Shift (optional)
- Short message to teacher (optional, max 250 chars)

### Step 4 — Success Confirmation
- Shows ✅ "Request Sent!" banner
- Status: **Pending** until teacher acts
- Directs student to "My Batches" tab to track status

---

## My Batches Tab — Request Status Tracking

| Status | Badge | Student Action Available |
|---|---|---|
| `pending` | 🟡 Pending Approval | Withdraw request |
| `approved` | ✅ Approved | None (view batch) |
| `rejected` | ❌ Rejected | See rejection reason |
| `blocked` | ⛔ Blocked | None |
| `withdrawn` | ✗ Withdrawn | Can re-request with new key |

---

## API Endpoints Used

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/batches/lookup` | Look up batch by join key |
| `POST` | `/api/join-requests` | Submit join request |
| `GET` | `/api/join-requests` | List student's own requests |
| `POST` | `/api/join-requests/[id]/withdraw` | Withdraw pending request |

---

## Security

| Threat | Mitigation |
|---|---|
| Code enumeration | Random, non-sequential codes; globally unique |
| Brute-force | Rate limit: 5 attempts/minute/user in API |
| Info leakage | Generic `"Invalid or expired key."` error |
| Duplicate requests | Checked at API level before insert |
| Already enrolled | Checked at preview step via `student_status` |
| Blocked user | `batch_join_blocks` checked at API submit |
| Expired key | `join_key_expires_at` checked at lookup |

---

## Database Tables

- `batch_join_requests` — one row per request; lifecycle: `pending → approved | rejected | blocked | withdrawn`
- `batch_join_blocks` — blocks a clerk_user_id from requesting a specific batch
- `batches.join_key` — unique per batch, regeneratable by teacher

See `DATABASE_SCHEMA.md` for full schema.
