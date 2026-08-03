# Feature 01 — Dashboard (Home)

## Route
`/` (root, protected by Clerk auth)

## Purpose
The Dashboard is the student's homepage. It surfaces today's most important information at a glance so students never need to dig through menus to find what matters right now.

---

## UI Layout

### Mobile (Primary)
```
┌─────────────────────────┐
│ Header (Avatar + Bell)  │
├─────────────────────────┤
│ Welcome Card            │
│ "Good morning, Rahim"   │
│ Class 10 · Roll 12      │
├─────────────────────────┤
│ Today's Classes (H-Scroll)│
│ [Math 9:00] [Eng 10:00] │
├─────────────────────────┤
│ Quick Stats Row         │
│ [Attendance] [Due Fees] │
├─────────────────────────┤
│ Quick Actions Grid      │
│ [Routine] [Notes]       │
│ [Results] [Pay Fees]    │
├─────────────────────────┤
│ Upcoming Exams Card     │
├─────────────────────────┤
│ Latest Notices          │
├─────────────────────────┤
│ Recently Uploaded Notes │
├─────────────────────────┤
│ Latest Results          │
├─────────────────────────┤
│ Bottom Navigation Bar   │
└─────────────────────────┘
```

### Desktop
Two-column layout: Main content (left ~65%), Summary sidebar (right ~35%).

---

## Sections & Components

### 1. Welcome Card
- **Data**: Student name, class, section, roll number, today's date
- **Design**: Gradient background card, large greeting text, subtle wave/pattern decoration
- **Time-aware greeting**: Good morning / Good afternoon / Good evening

### 2. Today's Classes
- **Data**: Classes from today's routine (subject, time, teacher, room)
- **Design**: Horizontal scrollable pill/chip cards
- **Highlight**: Mark the current or next class with an accent border
- **Empty state**: "No classes scheduled today" with a relaxation illustration

### 3. Quick Stats Row
- **Cards** (2–3 stat cards in a row):
  - **Attendance**: Overall percentage with a mini circular progress ring (green/amber/red based on threshold)
  - **Pending Fees**: Amount due with status indicator (paid = green, due = red)
  - **Upcoming Exam**: Days until next exam with countdown
- **Design**: Small rounded cards with icon + number + label

### 4. Quick Action Buttons
- **Grid**: 2×2 on mobile, 4×1 on desktop
- **Actions**:
  - 📅 View Routine → `/routine`
  - 📝 View Notes → `/notes`
  - 💰 Pay Fees → `/fees` (badge "Coming Soon" if not live)
  - 📊 View Results → `/results`
- **Design**: Icon + label, subtle background, hover scale animation

### 5. Upcoming Exams Card
- **Data**: Next 2–3 exams (subject, date, time, venue)
- **Design**: List card with exam icon, subject name bold, date/venue secondary
- **Link**: "View All" → `/exams`

### 6. Latest Notices
- **Data**: Last 3 notices (title, date, category badge)
- **Design**: List with category color dot (important = red, academic = blue, holiday = green, exam = amber)
- **Link**: "View All" → `/notices`

### 7. Recently Uploaded Notes
- **Data**: Last 3 notes (title, subject, upload date)
- **Design**: List with subject icon and download indicator
- **Link**: "View All" → `/notes`

### 8. Latest Exam Results
- **Data**: Most recent result (exam name, total marks, grade/GPA)
- **Design**: Highlight card with grade badge
- **Link**: "View All" → `/results`

---

## Data Requirements

```typescript
// Dashboard data fetched server-side
interface DashboardData {
  student: {
    name: string;
    class: string;
    section: string;
    roll: string;
    profilePhoto?: string;
  };
  todayClasses: Array<{
    subject: string;
    time: string;
    teacher: string;
    room: string;
    isCurrent: boolean;
  }>;
  attendance: {
    overallPercentage: number;
    totalPresent: number;
    totalAbsent: number;
    totalClasses: number;
  };
  pendingFees: {
    amount: number;
    currency: string;
    dueDate: string;
    status: 'paid' | 'due' | 'overdue';
  };
  upcomingExams: Array<{
    subject: string;
    date: string;
    time: string;
    venue: string;
  }>;
  latestNotices: Array<{
    id: string;
    title: string;
    date: string;
    category: 'important' | 'academic' | 'holiday' | 'exam';
  }>;
  recentNotes: Array<{
    id: string;
    title: string;
    subject: string;
    uploadDate: string;
  }>;
  latestResult: {
    examName: string;
    totalMarks: number;
    obtainedMarks: number;
    grade: string;
    gpa: number;
  } | null;
}
```

---

## File Structure

```
src/app/(portal)/
├── page.tsx                    # Dashboard page (server component)
├── loading.tsx                 # Skeleton loader
└── _components/
    ├── WelcomeCard.tsx
    ├── TodayClasses.tsx
    ├── QuickStats.tsx
    ├── QuickActions.tsx
    ├── UpcomingExams.tsx
    ├── LatestNotices.tsx
    ├── RecentNotes.tsx
    └── LatestResults.tsx
```

---

## Acceptance Criteria

- [ ] Page loads with skeleton states, then renders data
- [ ] Welcome greeting is time-aware (morning/afternoon/evening)
- [ ] Today's classes scroll horizontally and highlight current/next class
- [ ] All stat cards show real data with color-coded indicators
- [ ] Quick action buttons navigate to correct routes
- [ ] All "View All" links navigate to respective pages
- [ ] Mobile layout is single-column, scrollable
- [ ] Desktop layout uses two-column grid
- [ ] Dark mode fully supported
- [ ] Empty states show friendly messages when no data
- [ ] Page is fully responsive between 320px–1440px
