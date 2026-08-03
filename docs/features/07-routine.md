# Feature 07 — Routine (Class Schedule)

## Route
`/routine` (protected by Clerk auth)

## Purpose
Display the student's class schedule in a clean, easy-to-read format. Students should instantly see what class they have now and what's coming next.

---

## UI Layout

### Mobile (Primary)
```
┌─────────────────────────┐
│ Header + Back           │
├─────────────────────────┤
│ Page Title: Routine     │
├─────────────────────────┤
│ Day Selector            │
│ [S] [M] [T] [W] [T] [F]│
│          ↑ Today        │
├─────────────────────────┤
│ Current Class Highlight │
│ ┌───────────────────┐   │
│ │ 🟢 NOW: Math      │   │
│ │ 10:00–10:45       │   │
│ │ Mr. Rahman        │   │
│ │ Room 301          │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ Today's Schedule        │
│ ┌─ 09:00 ─ English ──┐ │
│ ├─ 10:00 ─ Math ✨ ──┤ │
│ ├─ 10:45 ─ Break ────┤ │
│ ├─ 11:00 ─ Science ──┤ │
│ ├─ 12:00 ─ History ──┤ │
│ └─ 01:00 ─ Bengali ──┘ │
├─────────────────────────┤
│ Bottom Navigation       │
└─────────────────────────┘
```

### Desktop
Full weekly timetable grid view (Monday–Saturday columns, time rows).

---

## Sections & Components

### 1. Day Selector
- **Design**: Horizontal row of day circles (S, M, T, W, T, F, S)
- **Behavior**: Today is auto-selected and highlighted with primary color fill
- **Tap**: Select any day to view that day's schedule
- **Indicator**: Dot below the day label if there are classes that day

### 2. Current Class Highlight Card
- **Condition**: Only shows on today's tab during school hours when a class is active
- **Data**: Subject, teacher, room, current time range
- **Design**: Accent-bordered card with "NOW" badge and green pulsing dot
- **Next class preview**: Small text below "Next: Science at 11:00"

### 3. Today's Schedule (Timeline)
- **Data per slot**: Time, subject, teacher, room, duration
- **Design**: Vertical timeline with time markers
  - Active class: Highlighted with accent background
  - Past classes: Muted/gray styling
  - Future classes: Normal styling
  - Breaks: Dashed line with "Break" label
- **Subject colors**: Each subject gets a consistent color dot/bar

### 4. Weekly View (Desktop)
- **Design**: Grid/table layout
  - Columns: Days of the week
  - Rows: Time slots
  - Cells: Subject + teacher + room
- **Current day column**: Highlighted background
- **Current period**: Accent border

### 5. Empty State
- **Design**: "No classes today!" with relaxation illustration
- **Show when**: It's a holiday or no classes scheduled

---

## Data Requirements

```typescript
interface RoutineData {
  weeklySchedule: {
    [day: string]: Array<{
      id: string;
      subject: string;
      teacher: string;
      room: string;
      startTime: string;    // "10:00"
      endTime: string;      // "10:45"
      isBreak: boolean;
      subjectColor: string; // "#4F46E5"
    }>;
  };
  today: string;             // "monday"
  currentPeriod?: {
    subject: string;
    teacher: string;
    room: string;
    startTime: string;
    endTime: string;
  };
  nextPeriod?: {
    subject: string;
    startTime: string;
  };
}
```

---

## File Structure

```
src/app/(portal)/routine/
├── page.tsx                    # Routine page (server component)
├── loading.tsx                 # Skeleton loader
└── _components/
    ├── DaySelector.tsx         # Day circle selector (client component)
    ├── CurrentClassCard.tsx    # Active class highlight (client component)
    ├── DailyTimeline.tsx       # Timeline view for selected day
    ├── WeeklyGrid.tsx          # Desktop weekly timetable grid
    └── RoutineEmptyState.tsx   # No classes today
```

---

## Acceptance Criteria

- [ ] Day selector shows all days with today auto-selected
- [ ] Current class card appears only during active class times
- [ ] Green pulsing dot indicates live/active class
- [ ] Timeline shows all classes with correct time ordering
- [ ] Past classes are visually muted
- [ ] Active class is highlighted with accent color
- [ ] Break periods shown with dashed separator
- [ ] Desktop view shows full weekly timetable grid
- [ ] Subject colors are consistent across the schedule
- [ ] Empty state for days with no classes
- [ ] Responsive from 320px to 1440px
- [ ] Dark mode fully supported
- [ ] Loading skeleton shown while data loads
