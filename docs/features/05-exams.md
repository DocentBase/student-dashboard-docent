# Feature 05 — Exams

## Route
`/exams` (protected by Clerk auth)

## Purpose
Help students track upcoming and past examinations with clear schedules, venue details, instructions, and countdowns.

---

## UI Layout

### Mobile (Primary)
```
┌─────────────────────────┐
│ Header + Back           │
├─────────────────────────┤
│ Page Title: Exams       │
├─────────────────────────┤
│ Tab Bar                 │
│ [Upcoming] [Completed]  │
├─────────────────────────┤
│ Next Exam Countdown     │
│ ┌───────────────────┐   │
│ │ Mathematics       │   │
│ │ 🕐 3d 14h 22m     │   │
│ │ Aug 7 · 10:00 AM  │   │
│ │ Room 301          │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ Exam Schedule List      │
│ ┌─ Aug 7  ─ Math ──────┐│
│ ├─ Aug 9  ─ English ───┤│
│ ├─ Aug 11 ─ Science ───┤│
│ ├─ Aug 13 ─ History ───┤│
│ └─ Aug 15 ─ Bengali ───┘│
├─────────────────────────┤
│ Exam Instructions       │
│ (Collapsible section)   │
├─────────────────────────┤
│ Bottom Navigation       │
└─────────────────────────┘
```

---

## Sections & Components

### 1. Tab Bar
- **Tabs**: "Upcoming" (default), "Completed"
- **Design**: Segmented control style, clean toggle
- **Behavior**: Switches between upcoming and past exams

### 2. Next Exam Countdown Card
- **Data**: Subject, date, time, venue, days/hours/minutes until exam
- **Design**: Hero card with live countdown timer (updates every minute)
  - Gradient or accent background
  - Large countdown digits
  - Subject name prominent
- **Condition**: Only shows when there are upcoming exams
- **Animation**: Subtle pulse on countdown digits

### 3. Exam Schedule List
- **Data per row**: Date, subject, time, venue/room, exam type
- **Design**: Timeline-style list with date markers
  - Date (left column) · Subject (main) · Time + Room (secondary)
  - Exam type badge: "Mid-term", "Final", "Quiz", "Class Test"
- **Sorting**: Chronological (nearest first for upcoming, most recent first for completed)
- **Tap action**: Expand row to show full details (instructions, syllabus)

### 4. Exam Detail (Expanded View)
- **Data**: Full exam details when a row is tapped
  - Subject name
  - Date and time
  - Duration
  - Venue / Room
  - Exam type
  - Instructions
  - Syllabus topics (if provided)
- **Design**: Expandable card or sheet

### 5. Exam Instructions
- **Data**: General exam instructions from the organization
- **Design**: Collapsible accordion
- **Content**: Rules, what to bring, reporting time, etc.

### 6. Completed Exams (Tab)
- **Data**: List of past exams
- **Design**: Same list layout with muted styling
- **Link**: "View Results" button per exam → `/results`

---

## Data Requirements

```typescript
interface ExamsData {
  upcoming: Array<{
    id: string;
    subject: string;
    date: string;
    time: string;
    duration: string;      // "2 hours"
    venue: string;
    examType: 'midterm' | 'final' | 'quiz' | 'class-test';
    instructions?: string;
    syllabus?: string[];
  }>;
  completed: Array<{
    id: string;
    subject: string;
    date: string;
    time: string;
    venue: string;
    examType: 'midterm' | 'final' | 'quiz' | 'class-test';
    hasResult: boolean;
  }>;
  generalInstructions: string;
  nextExam: {
    subject: string;
    date: string;
    time: string;
    venue: string;
    countdownMs: number;
  } | null;
}
```

---

## File Structure

```
src/app/(portal)/exams/
├── page.tsx                    # Exams page (server component)
├── loading.tsx                 # Skeleton loader
└── _components/
    ├── ExamTabs.tsx            # Tab switcher (client component)
    ├── CountdownCard.tsx       # Live countdown hero card (client component)
    ├── ExamScheduleList.tsx    # Timeline list of exams
    ├── ExamDetailCard.tsx      # Expandable exam details
    ├── ExamInstructions.tsx    # Collapsible instructions
    └── CompletedExams.tsx      # Past exams list
```

---

## Acceptance Criteria

- [ ] Tab bar switches between "Upcoming" and "Completed" exams
- [ ] Countdown card shows live timer for the next exam
- [ ] Countdown updates every minute (or every second if < 1 hour)
- [ ] Exam list is chronologically sorted
- [ ] Each exam row shows date, subject, time, venue, and type badge
- [ ] Tapping a row expands to show full details
- [ ] Completed exams have a "View Results" link
- [ ] General instructions section is collapsible
- [ ] Empty state when no upcoming/completed exams
- [ ] Responsive from 320px to 1440px
- [ ] Dark mode fully supported
- [ ] Loading skeleton shown while data loads
