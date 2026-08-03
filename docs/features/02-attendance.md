# Feature 02 — Attendance

## Route
`/attendance` (protected by Clerk auth)

## Purpose
Allow students to monitor their attendance with clear visual indicators, helping them stay aware of their attendance status and take action if it drops below thresholds. All attendance data is **scoped to the currently active course/batch**.

---

## Multi-Course/Batch Attendance

> **Critical**: A student can be enrolled in **multiple courses/batches** simultaneously (e.g., "SSC Math Batch" + "SSC Physics Batch" + "HSC English Batch"). Attendance is tracked **per batch**.

### How This Is Solved

1. **Per-Batch Scoping**: When the student selects a course/batch via the Course Switcher (in the sidebar), all attendance data on this page reflects **only that batch**.
2. **Database Query**: `SELECT * FROM attendance WHERE student_id = ? AND batch_id = ?` — always filtered by both student ID and the active batch ID.
3. **Cross-Batch Summary** (optional card): At the top of the page, an optional "All Courses" summary card can show aggregated attendance across all enrolled batches. This is separate from the per-batch detail view below.
4. **Course Switcher**: The batch name is displayed at the top of the page. The student can use the sidebar Course Switcher to change context — the attendance page re-fetches data for the new batch.

### Database Compatibility with Staff Dashboard

The `attendance` table in Neon PostgreSQL is **shared with the staff dashboard** (`dashboard.docentbase.com`). Staff/teachers write attendance records; students read them. Schema must include:

```sql
-- Shared attendance table (written by staff dashboard, read by student portal)
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id TEXT NOT NULL,     -- Clerk org ID
  batch_id UUID NOT NULL,            -- Which batch/course
  student_id UUID NOT NULL,          -- Which student
  date DATE NOT NULL,
  status VARCHAR(10) NOT NULL,       -- 'present', 'absent', 'late', 'holiday'
  subject VARCHAR(100),              -- Subject name (if per-subject attendance)
  marked_by TEXT,                    -- Staff user who marked it
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(batch_id, student_id, date, subject)
);
```

---

## UI Layout

### Mobile
```
┌─────────────────────────┐
│ Header (☰ + 🔔 + 👤)   │
├─────────────────────────┤
│ Page Title: Attendance  │
│ Batch: SSC Math 2026    │
├─────────────────────────┤
│ All Courses Summary     │
│ (optional, if multi)    │
│ [Math 85%] [Phys 92%]  │
├─────────────────────────┤
│ Overall Attendance Ring │
│      ┌───┐              │
│      │82%│              │
│      └───┘              │
│  Present: 164  Absent: 36│
├─────────────────────────┤
│ ⚠️ Warning Banner       │
│ (if attendance < 75%)   │
├─────────────────────────┤
│ Monthly Selector Tabs   │
│ [Jan] [Feb] [Mar] ...   │
├─────────────────────────┤
│ Attendance Calendar     │
│ (color-coded days)      │
├─────────────────────────┤
│ Subject-wise Breakdown  │
│ ┌─ Math ────── 90% ──┐ │
│ ├─ English ─── 78% ──┤ │
│ ├─ Science ─── 65% ──┤ │
│ └─ History ─── 88% ──┘ │
├─────────────────────────┤
│ Present/Absent Stats    │
└─────────────────────────┘
```

### Desktop
Two-column layout: Main content (left ~65% — ring, calendar, subject breakdown), Summary panel (right ~35% — stats, warning, monthly chart).

---

## Sections & Components

### 1. Batch Context Header
- **Data**: Current batch/course name from the active context
- **Design**: Subtle label below the page title showing which batch is being viewed
- **Link**: "Switch Course" link → opens Course Switcher

### 2. All Courses Summary Card (Optional)
- **Condition**: Only shown if student is enrolled in 2+ courses/batches
- **Data**: Attendance percentage per batch across all enrolled courses
- **Design**: Horizontal scrollable cards, each showing batch name + attendance % with mini progress ring
- **Tap**: Tapping a card switches the active batch context and refreshes the page

### 3. Overall Attendance Card
- **Data**: Total percentage, total present, total absent, total classes — **for the active batch only**
- **Design**: Large circular progress ring (animated on load via Framer Motion)
  - Green (≥ 80%), Amber (60–79%), Red (< 60%)
- **Sub-stats**: "164 Present · 36 Absent · 200 Total" in a row below the ring
- **Animation**: Ring draws from 0% to actual % with spring easing

### 4. Attendance Warning Banner
- **Condition**: Show only if attendance < 75% for the active batch (configurable threshold from organization settings)
- **Design**: Amber/red banner with warning icon, subtle pulse animation
- **Message**: "Your attendance is below 75%. Contact your class teacher for guidance."

### 5. Monthly Attendance History
- **Design**: Horizontal scrollable month tabs (Jan–Dec)
- **Selected month**: Shows attendance percentage for that month in the active batch
- **Chart**: Mini bar chart or percentage bar for each month
- **Animation**: Smooth tab transition with Framer Motion

### 6. Attendance Calendar
- **Data**: Daily attendance records for the selected month **in the active batch**
- **Design**: Calendar grid for the selected month
- **Color coding**:
  - ✅ Green dot/fill = Present
  - ❌ Red dot/fill = Absent
  - 🟡 Amber dot/fill = Late
  - 🔵 Blue dot/fill = Holiday
  - ⬜ Gray = Future / No data
- **Interaction**: Tap a date to see details (which subjects were attended that day, if per-subject attendance is tracked)

### 7. Subject-wise Attendance
- **Data**: List of all subjects in the active batch with individual attendance percentage
- **Design**: Progress bar per subject with percentage label
  - Color follows the same green/amber/red thresholds
- **Sorting**: Lowest attendance first (to highlight problem areas)
- **Note**: Subject-wise breakdown is only available if the organization tracks per-subject attendance (otherwise this section is hidden)

### 8. Present / Absent Statistics
- **Design**: Two side-by-side stat cards
  - Card 1: Total Present count with green accent
  - Card 2: Total Absent count with red accent
- **Animation**: Count-up number animation on load

---

## Data Requirements

```typescript
interface AttendanceData {
  // Active batch context
  activeBatch: {
    id: string;
    name: string;          // "SSC Math Batch 2026"
  };
  // All courses summary (only if multi-enrolled)
  allCoursesSummary?: Array<{
    batchId: string;
    batchName: string;
    percentage: number;
  }>;
  // Overall stats for active batch
  overall: {
    percentage: number;
    totalPresent: number;
    totalAbsent: number;
    totalLate: number;
    totalClasses: number;
  };
  // Monthly breakdown for active batch
  monthly: Array<{
    month: string;       // "2026-01"
    percentage: number;
    present: number;
    absent: number;
    total: number;
  }>;
  // Daily calendar for selected month in active batch
  calendar: Array<{
    date: string;        // "2026-08-03"
    status: 'present' | 'absent' | 'late' | 'holiday' | 'no-class';
    subjects?: Array<{
      name: string;
      status: 'present' | 'absent' | 'late';
    }>;
  }>;
  // Subject-wise for active batch (if tracked)
  subjectWise?: Array<{
    subject: string;
    percentage: number;
    present: number;
    absent: number;
    total: number;
  }>;
  // Organization setting
  warningThreshold: number; // e.g. 75
}
```

---

## File Structure

```
src/app/(portal)/attendance/
├── page.tsx                    # Attendance page (server component)
├── loading.tsx                 # Skeleton loader
└── _components/
    ├── BatchContextHeader.tsx  # Shows active batch name
    ├── AllCoursesSummary.tsx   # Multi-course attendance cards
    ├── OverallAttendance.tsx   # Circular progress ring
    ├── AttendanceWarning.tsx   # Warning banner
    ├── MonthlyHistory.tsx      # Month tabs + stats
    ├── AttendanceCalendar.tsx  # Calendar grid
    ├── SubjectBreakdown.tsx    # Subject-wise progress bars
    └── AttendanceStats.tsx     # Present/Absent stat cards
```

---

## Acceptance Criteria

- [ ] All attendance data is scoped to the active batch (from Course Switcher)
- [ ] Multi-course summary card shown only if student is in 2+ batches
- [ ] Tapping a course summary card switches the active batch context
- [ ] Circular progress ring animates on page load (Framer Motion)
- [ ] Warning banner appears only when attendance is below the organization's threshold
- [ ] Monthly tabs are scrollable and show correct data per month for active batch
- [ ] Calendar grid is color-coded correctly (present/absent/late/holiday)
- [ ] Tapping a calendar date shows per-subject details (if available)
- [ ] Subject-wise list is sorted by lowest attendance first
- [ ] Subject-wise section is hidden if organization doesn't track per-subject attendance
- [ ] All percentages use correct color thresholds (green/amber/red)
- [ ] "Late" status is supported alongside present/absent
- [ ] Data loads from Neon PostgreSQL (shared with staff dashboard)
- [ ] Responsive from 320px to 1920px
- [ ] Dark mode fully supported
- [ ] Loading skeleton shown while data loads
- [ ] Empty state shown if no attendance data exists for active batch
- [ ] All animations use Framer Motion
