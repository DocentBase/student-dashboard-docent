# DocentBase — Shared Database Schema & Cross-App Compatibility

> **Purpose:** This document defines the shared database schema that both `dashboard.docentbase.com` (Staff/Teacher) and `student.docentbase.com` (Student Portal) will use. Both apps connect to the **same Neon PostgreSQL database**. The staff dashboard **writes** data; the student portal **reads** it.

---

## 1. Architecture: Two Apps, One Database

```
┌─────────────────────────┐        ┌─────────────────────────┐
│ dashboard.docentbase.com│        │ student.docentbase.com  │
│ (Staff / Teachers)      │        │ (Students)              │
│                         │        │                         │
│ • Creates students      │        │ • Reads own profile     │
│ • Marks attendance      │        │ • Reads own attendance  │
│ • Records fee payments  │        │ • Reads own fees        │
│ • Creates exams/results │        │ • Reads own exams       │
│ • Posts notices         │        │ • Reads own notices     │
│ • Uploads notes         │        │ • Downloads notes       │
│ • Manages routines      │        │ • Reads own routine     │
│                         │        │                         │
│     WRITES ────────────►│ Neon   │◄──────────── READS      │
│                         │Postgres│                         │
└─────────────────────────┘        └─────────────────────────┘
```

---

## 2. Existing Tables (Already in Staff Dashboard)

These tables already exist in the staff dashboard and the student portal must be compatible with them:

### `organizations`
```sql
-- Already exists in staff dashboard
-- One row per Clerk org (id = Clerk org_...)
-- Student portal reads: institution name, logo, branding for UI
```

### `academic_info`
```sql
-- Already exists: one row per org
-- Fields: levels_class_range, subjects, courses (JSONB arrays)
-- Student portal reads: subjects list for filtering notes/attendance
```

### `batches`
```sql
-- Already exists: many rows per org
-- Fields: name, timing, capacity, assigned_teacher, monthly_fee
-- Student portal reads: batch name, timing, teacher, fee amount
```

---

## 3. New Shared Tables (To Be Created)

> **These tables do NOT exist yet in either dashboard.** Both dashboards' modules for these features are currently UI mocks. When we build the student portal, these schemas become the source of truth for both apps.

### `students`
```sql
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id TEXT NOT NULL,           -- Clerk org ID
  clerk_user_id TEXT,                      -- Clerk user ID (for portal login)
  
  -- Identity (stored in DB, NOT Clerk)
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  date_of_birth DATE,
  gender VARCHAR(20),
  blood_group VARCHAR(10),
  profile_photo_url TEXT,                  -- Override; Clerk photo used as fallback
  
  -- Academic
  student_id VARCHAR(50) UNIQUE,           -- USI / Institution student ID
  class VARCHAR(50),
  section VARCHAR(20),
  roll VARCHAR(20),
  
  -- Guardian
  guardian_name VARCHAR(200),
  guardian_relation VARCHAR(50),
  guardian_phone VARCHAR(20),
  guardian_email VARCHAR(100),
  guardian_address TEXT,
  
  -- Contact
  phone VARCHAR(20),
  email VARCHAR(100),
  address TEXT,
  is_phone_editable BOOLEAN DEFAULT false,
  is_email_editable BOOLEAN DEFAULT false,
  
  -- Status
  status VARCHAR(20) DEFAULT 'active',     -- active, archived, graduated
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_students_org ON students(organization_id);
CREATE INDEX idx_students_clerk ON students(clerk_user_id);
```

### `student_batch_enrollments`
```sql
-- A student can be enrolled in MULTIPLE batches (courses)
CREATE TABLE student_batch_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  organization_id TEXT NOT NULL,
  
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'active',     -- active, dropped, completed
  
  UNIQUE(student_id, batch_id)
);

CREATE INDEX idx_enrollments_student ON student_batch_enrollments(student_id);
CREATE INDEX idx_enrollments_batch ON student_batch_enrollments(batch_id);
```

### `attendance`
```sql
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id TEXT NOT NULL,
  batch_id UUID NOT NULL REFERENCES batches(id),
  student_id UUID NOT NULL REFERENCES students(id),
  
  date DATE NOT NULL,
  status VARCHAR(10) NOT NULL,             -- 'present', 'absent', 'late', 'holiday'
  subject VARCHAR(100),                    -- NULL = batch-level attendance
  
  -- Staff dashboard audit
  marked_by TEXT,                          -- Clerk user ID of staff who marked
  marked_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ratings (staff dashboard feature)
  homework_rating SMALLINT,               -- 0-10 scale (NULL if not rated)
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(batch_id, student_id, date, COALESCE(subject, ''))
);

CREATE INDEX idx_attendance_student ON attendance(student_id, batch_id);
CREATE INDEX idx_attendance_date ON attendance(date);
```

### `fees`
```sql
CREATE TABLE fees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id TEXT NOT NULL,
  batch_id UUID NOT NULL REFERENCES batches(id),
  student_id UUID NOT NULL REFERENCES students(id),
  
  month VARCHAR(7) NOT NULL,              -- "2026-08"
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'BDT',
  
  status VARCHAR(20) NOT NULL DEFAULT 'due',  -- 'paid', 'due', 'overdue', 'waived'
  due_date DATE,
  paid_date DATE,
  paid_amount DECIMAL(10,2),
  late_fee DECIMAL(10,2) DEFAULT 0,
  
  -- Payment info
  payment_method VARCHAR(50),             -- 'cash', 'bkash', 'nagad', 'bank', 'sslcommerz'
  transaction_id VARCHAR(100),
  receipt_url TEXT,
  
  -- Staff audit
  recorded_by TEXT,                       -- Clerk user ID
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(batch_id, student_id, month)
);

CREATE INDEX idx_fees_student ON fees(student_id, batch_id);
```

### `exams`
```sql
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id TEXT NOT NULL,
  batch_id UUID NOT NULL REFERENCES batches(id),
  
  name VARCHAR(200) NOT NULL,             -- "Mid-Term Exam 2026"
  exam_type VARCHAR(50) NOT NULL,         -- 'midterm', 'final', 'quiz', 'class-test', 'model-test'
  subject VARCHAR(100) NOT NULL,
  
  date DATE NOT NULL,
  start_time TIME,
  duration_minutes INTEGER,
  venue VARCHAR(200),
  
  instructions TEXT,
  syllabus_topics TEXT[],                 -- Array of topic strings
  
  status VARCHAR(20) DEFAULT 'upcoming',  -- 'upcoming', 'ongoing', 'completed', 'cancelled'
  
  created_by TEXT,                        -- Clerk user ID
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_exams_batch ON exams(batch_id);
CREATE INDEX idx_exams_date ON exams(date);
```

### `results`
```sql
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id TEXT NOT NULL,
  exam_id UUID NOT NULL REFERENCES exams(id),
  student_id UUID NOT NULL REFERENCES students(id),
  batch_id UUID NOT NULL REFERENCES batches(id),
  
  obtained_marks DECIMAL(6,2),
  total_marks DECIMAL(6,2) NOT NULL,
  grade VARCHAR(10),
  gpa DECIMAL(3,2),
  is_passed BOOLEAN,
  position INTEGER,
  
  teacher_remarks TEXT,
  remarks_by TEXT,                        -- Teacher Clerk user ID
  
  published BOOLEAN DEFAULT false,        -- Staff can prepare results before publishing
  published_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(exam_id, student_id)
);

CREATE INDEX idx_results_student ON results(student_id);
CREATE INDEX idx_results_exam ON results(exam_id);
```

### `routines`
```sql
CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id TEXT NOT NULL,
  batch_id UUID NOT NULL REFERENCES batches(id),
  
  day_of_week SMALLINT NOT NULL,          -- 0=Sunday, 1=Monday, ..., 6=Saturday
  subject VARCHAR(100) NOT NULL,
  teacher_name VARCHAR(200),
  room VARCHAR(100),
  
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_break BOOLEAN DEFAULT false,
  
  subject_color VARCHAR(7),               -- "#4F46E5" for consistent UI
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_routines_batch ON routines(batch_id);
CREATE INDEX idx_routines_day ON routines(batch_id, day_of_week);
```

### `notices`
```sql
CREATE TABLE notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id TEXT NOT NULL,
  
  title VARCHAR(500) NOT NULL,
  body TEXT NOT NULL,                     -- Markdown content
  category VARCHAR(20) NOT NULL,          -- 'important', 'academic', 'holiday', 'exam'
  
  -- Targeting
  target_type VARCHAR(20) DEFAULT 'all',  -- 'all', 'batch', 'class'
  target_batch_ids UUID[],                -- NULL = all batches
  
  -- Attachments
  attachments JSONB,                      -- [{name, url, type}]
  
  -- Audit
  created_by TEXT,                        -- Clerk user ID
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notices_org ON notices(organization_id);
CREATE INDEX idx_notices_date ON notices(created_at DESC);
```

### `notice_reads`
```sql
-- Track which students have read which notices
CREATE TABLE notice_reads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notice_id UUID NOT NULL REFERENCES notices(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  read_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(notice_id, student_id)
);
```

### `notes` (Learning Resources)
```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id TEXT NOT NULL,
  batch_id UUID NOT NULL REFERENCES batches(id),
  
  title VARCHAR(500) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  description TEXT,
  
  file_type VARCHAR(20) NOT NULL,         -- 'pdf', 'doc', 'ppt', 'video', 'image'
  file_url TEXT NOT NULL,
  file_size VARCHAR(20),                  -- "2.4 MB"
  
  uploaded_by TEXT,                       -- Clerk user ID (teacher)
  teacher_name VARCHAR(200),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notes_batch ON notes(batch_id);
CREATE INDEX idx_notes_subject ON notes(batch_id, subject);
```

---

## 4. Query Patterns for Student Portal

All student portal queries follow this pattern:

```sql
-- Step 1: Get student record from Clerk user ID
SELECT * FROM students WHERE clerk_user_id = $1;

-- Step 2: Get enrolled batches
SELECT sbe.*, b.name, b.timing, b.monthly_fee
FROM student_batch_enrollments sbe
JOIN batches b ON b.id = sbe.batch_id
WHERE sbe.student_id = $1 AND sbe.status = 'active';

-- Step 3: Query data for active batch
SELECT * FROM attendance 
WHERE student_id = $1 AND batch_id = $2
ORDER BY date DESC;
```

**Security Rule**: Every query MUST include `student_id = currentStudent.id` to prevent data leakage.

---

## 5. Clerk Data vs Database Data

| Field | Source | Rationale |
|---|---|---|
| Display name | Clerk `user.firstName + lastName` | Clerk manages identity |
| Profile photo | Clerk `user.imageUrl` | Clerk manages avatars |
| Email (login) | Clerk `user.emailAddresses` | Clerk manages auth |
| Student ID / USI | Database `students.student_id` | Institution-specific |
| Class, Section, Roll | Database `students` table | Academic data |
| Guardian info | Database `students` table | Private data |
| Attendance | Database `attendance` table | Operational data |
| Fees | Database `fees` table | Financial data |
| All other academic data | Database | Staff-managed data |

---

## 6. Staff Dashboard Compatibility Checklist

When building the student portal, ensure:

- [ ] All table names match this document exactly
- [ ] Column names and types are consistent
- [ ] Foreign key relationships are maintained
- [ ] Organization ID (`TEXT`, Clerk org format `org_...`) is used consistently
- [ ] Batch IDs reference the existing `batches` table
- [ ] Student `clerk_user_id` maps to Clerk's user ID format
- [ ] Status enums match (e.g., `'present'|'absent'|'late'|'holiday'` for attendance)
- [ ] Currency is always `BDT` with proper formatting (৳)
- [ ] Timestamps use `TIMESTAMPTZ` (timezone-aware)
- [ ] All indexes are created for query performance
