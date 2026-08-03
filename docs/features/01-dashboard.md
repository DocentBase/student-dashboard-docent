# Feature 01 — Dashboard (Home)

## Route
`/` (root, protected by Clerk auth)

## Purpose
The Dashboard is the student's homepage. It surfaces today's most important information at a glance so students never need to dig through menus to find what matters right now. If the student is enrolled in multiple courses/batches, the dashboard shows an aggregated overview with per-course cards.

---

## Data Source Rules

> **Only the student's name and profile photo come from Clerk.** Everything else (class, roll, section, batch, attendance, fees, exams, results, routine, notices, notes) is loaded from the **Neon PostgreSQL database**.

| Data | Source |
|---|---|
| Student name (`firstName`, `lastName`) | Clerk `user` object |
| Profile photo (`imageUrl`) | Clerk `user` object |
| Class, section, roll, batch | Neon PostgreSQL `students` table |
| Today's classes | Neon PostgreSQL `routines` table (filtered by active batch + day) |
| Attendance stats | Neon PostgreSQL `attendance` table (aggregated) |
| Pending fees | Neon PostgreSQL `fees` / `payments` table |
| Upcoming exams | Neon PostgreSQL `exams` table |
| Latest notices | Neon PostgreSQL `notices` table |
| Recent notes | Neon PostgreSQL `notes` table |
| Latest results | Neon PostgreSQL `results` table |

---

## Multi-Course Dashboard Behavior

If the student is enrolled in **one course/batch**: Dashboard shows all data for that single course.

If the student is enrolled in **multiple courses/batches**:
- The dashboard shows the **currently active course** data (as selected via the Course Switcher in the sidebar)
- An **"All Courses Summary" card** at the top aggregates key stats across all enrolled courses (total attendance %, total pending fees, next exam across all courses)
- Each section below is scoped to the active course context

---

## UI Layout

### Mobile
```
┌─────────────────────────┐
│ Header (☰ + 🔔 + 👤)   │
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
└─────────────────────────┘
```

### Desktop
Two-column layout: Main content (left ~65%), Summary sidebar (right ~35%).

---

## Sections & Components

### 1. Welcome Card
- **Data from Clerk**: Student name (for greeting)
- **Data from Database**: Class, section, roll number, batch name
- **Display**: Today's date
- **Design**: Gradient background card with glassmorphism, large greeting text, subtle wave/pattern decoration
- **Time-aware greeting**: Good morning / Good afternoon / Good evening
- **Profile photo**: Small circular avatar from Clerk `imageUrl`

### 2. Today's Classes
- **Data from Database**: Classes from today's routine filtered by active batch + current day of week
- **Fields**: Subject, time, teacher name, room number
- **Design**: Horizontal scrollable pill/chip cards with Framer Motion stagger animation
- **Highlight**: Mark the current or next class with an accent border + pulsing indicator
- **Empty state**: "No classes scheduled today" with a relaxation illustration

### 3. Quick Stats Row
- **Cards** (2–3 stat cards in a row):
  - **Attendance**: Overall percentage from DB — mini circular progress ring (green/amber/red based on threshold)
  - **Pending Fees**: Amount due from DB — status indicator (paid = green, due = red)
  - **Upcoming Exam**: Days until next exam from DB — countdown number
- **Design**: Small rounded cards with icon + number + label, subtle shadow, hover lift

### 4. Quick Action Buttons
- **Grid**: 2×2 on mobile, 4×1 on desktop
- **Actions**:
  - 📅 View Routine → `/routine`
  - 📝 View Notes → `/notes`
  - 💰 Pay Fees → `/fees` (badge "Coming Soon" if not live)
  - 📊 View Results → `/results`
- **Design**: Icon + label, subtle background, hover scale animation (Framer Motion)

### 5. Upcoming Exams Card
- **Data from Database**: Next 2–3 exams (subject, date, time, venue) for active batch
- **Design**: List card with exam icon, subject name bold, date/venue secondary
- **Link**: "View All" → `/exams`

### 6. Latest Notices
- **Data from Database**: Last 3 notices (title, date, category badge) targeted at the student's batch/organization
- **Design**: List with category color dot (important = red, academic = blue, holiday = green, exam = amber)
- **Link**: "View All" → `/notices`

### 7. Recently Uploaded Notes
- **Data from Database**: Last 3 notes (title, subject, upload date) for the active batch
- **Design**: List with subject icon and download indicator
- **Link**: "View All" → `/notes`

### 8. Latest Exam Results
- **Data from Database**: Most recent result (exam name, total marks, grade/GPA) for the active batch
- **Design**: Highlight card with grade badge and animated number reveal
- **Link**: "View All" → `/results`

---

## Data Requirements

```typescript
// Dashboard data fetched server-side from Neon PostgreSQL + Clerk
interface DashboardData {
  // From Clerk
  student: {
    name: string;           // Clerk user.firstName + user.lastName
    profilePhoto?: string;  // Clerk user.imageUrl
  };
  // From Database (students table)
  enrollment: {
    class: string;
    section: string;
    roll: string;
    batchId: string;
    batchName: string;
    organizationId: string;
  };
  // From Database (routines table, filtered by batch + day)
  todayClasses: Array<{
    subject: string;
    time: string;
    endTime: string;
    teacher: string;
    room: string;
    isCurrent: boolean;
  }>;
  // From Database (attendance table, aggregated)
  attendance: {
    overallPercentage: number;
    totalPresent: number;
    totalAbsent: number;
    totalClasses: number;
  };
  // From Database (fees/payments table)
  pendingFees: {
    amount: number;
    currency: string;     // "BDT" / "৳"
    dueDate: string;
    status: 'paid' | 'due' | 'overdue';
  };
  // From Database (exams table, filtered by batch)
  upcomingExams: Array<{
    subject: string;
    date: string;
    time: string;
    venue: string;
  }>;
  // From Database (notices table, filtered by batch/org)
  latestNotices: Array<{
    id: string;
    title: string;
    date: string;
    category: 'important' | 'academic' | 'holiday' | 'exam';
  }>;
  // From Database (notes table, filtered by batch)
  recentNotes: Array<{
    id: string;
    title: string;
    subject: string;
    uploadDate: string;
  }>;
  // From Database (results table, filtered by batch + student)
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

- [ ] Student name and photo loaded from Clerk; all other data from PostgreSQL
- [ ] Dashboard respects active course/batch context
- [ ] Page loads with skeleton states, then renders data
- [ ] Welcome greeting is time-aware (morning/afternoon/evening)
- [ ] Today's classes scroll horizontally and highlight current/next class
- [ ] All stat cards show real data with color-coded indicators
- [ ] Quick action buttons navigate to correct routes
- [ ] All "View All" links navigate to respective pages
- [ ] Mobile layout is single-column, scrollable (no bottom nav)
- [ ] Desktop layout uses two-column grid
- [ ] Dark mode fully supported
- [ ] Empty states show friendly messages when no data
- [ ] All animations use Framer Motion
- [ ] Page is fully responsive between 320px–1920px
- [ ] Currency displayed in BDT (৳) format
