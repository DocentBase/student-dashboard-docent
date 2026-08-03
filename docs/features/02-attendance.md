# Feature 02 — Attendance

## Route
`/attendance` (protected by Clerk auth)

## Purpose
Allow students to monitor their attendance with clear visual indicators, helping them stay aware of their attendance status and take action if it drops below thresholds.

---

## UI Layout

### Mobile (Primary)
```
┌─────────────────────────┐
│ Header + Back           │
├─────────────────────────┤
│ Page Title: Attendance  │
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
├─────────────────────────┤
│ Bottom Navigation       │
└─────────────────────────┘
```

---

## Sections & Components

### 1. Overall Attendance Card
- **Data**: Total percentage, total present, total absent, total classes
- **Design**: Large circular progress ring (animated on load)
  - Green (≥ 80%), Amber (60–79%), Red (< 60%)
- **Sub-stats**: "164 Present · 36 Absent · 200 Total" in a row below the ring

### 2. Attendance Warning Banner
- **Condition**: Show only if attendance < 75% (configurable threshold)
- **Design**: Amber/red banner with warning icon
- **Message**: "Your attendance is below 75%. Contact your class teacher for guidance."

### 3. Monthly Attendance History
- **Design**: Horizontal scrollable month tabs (Jan–Dec)
- **Selected month**: Shows attendance percentage for that month
- **Chart**: Mini bar chart or percentage bar for each month

### 4. Attendance Calendar
- **Design**: Calendar grid for the selected month
- **Color coding**:
  - ✅ Green dot/fill = Present
  - ❌ Red dot/fill = Absent
  - 🔵 Blue dot/fill = Holiday
  - ⬜ Gray = Future / No data
- **Interaction**: Tap a date to see details (subject-wise attendance for that day)

### 5. Subject-wise Attendance
- **Data**: List of all subjects with individual attendance percentage
- **Design**: Progress bar per subject with percentage label
  - Color follows the same green/amber/red thresholds
- **Sorting**: Lowest attendance first (to highlight problem areas)

### 6. Present / Absent Statistics
- **Design**: Two side-by-side stat cards
  - Card 1: Total Present count with green accent
  - Card 2: Total Absent count with red accent

---

## Data Requirements

```typescript
interface AttendanceData {
  overall: {
    percentage: number;
    totalPresent: number;
    totalAbsent: number;
    totalClasses: number;
  };
  monthly: Array<{
    month: string;       // "2026-01"
    percentage: number;
    present: number;
    absent: number;
    total: number;
  }>;
  calendar: Array<{
    date: string;        // "2026-08-03"
    status: 'present' | 'absent' | 'holiday' | 'no-class';
    subjects?: Array<{
      name: string;
      status: 'present' | 'absent';
    }>;
  }>;
  subjectWise: Array<{
    subject: string;
    percentage: number;
    present: number;
    absent: number;
    total: number;
  }>;
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
    ├── OverallAttendance.tsx   # Circular progress ring
    ├── AttendanceWarning.tsx   # Warning banner
    ├── MonthlyHistory.tsx      # Month tabs + stats
    ├── AttendanceCalendar.tsx  # Calendar grid
    ├── SubjectBreakdown.tsx    # Subject-wise progress bars
    └── AttendanceStats.tsx     # Present/Absent stat cards
```

---

## Acceptance Criteria

- [ ] Circular progress ring animates on page load
- [ ] Warning banner appears only when attendance is below threshold
- [ ] Monthly tabs are scrollable and show correct data per month
- [ ] Calendar grid is color-coded correctly for present/absent/holiday
- [ ] Subject-wise list is sorted by lowest attendance first
- [ ] All percentages use correct color thresholds (green/amber/red)
- [ ] Responsive from 320px to 1440px
- [ ] Dark mode fully supported
- [ ] Loading skeleton shown while data loads
- [ ] Empty state shown if no attendance data exists
