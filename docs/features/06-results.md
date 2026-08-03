# Feature 06 — Results

## Route
`/results` (protected by Clerk auth)

## Purpose
Allow students to view their academic performance across all exams, with subject-wise marks, grades, GPA, and teacher remarks.

---

## UI Layout

### Mobile (Primary)
```
┌─────────────────────────┐
│ Header + Back           │
├─────────────────────────┤
│ Page Title: Results     │
├─────────────────────────┤
│ Latest Result Hero Card │
│ ┌───────────────────┐   │
│ │ Final Exam 2026   │   │
│ │ GPA: 4.50         │   │
│ │ Grade: A+         │   │
│ │ Total: 892 / 1000 │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ Subject-wise Marks      │
│ ┌─ Math ──── 95/100 ──┐│
│ ├─ English ─ 88/100 ──┤│
│ ├─ Science ─ 92/100 ──┤│
│ ├─ History ─ 78/100 ──┤│
│ └─ Bengali ─ 85/100 ──┘│
├─────────────────────────┤
│ Teacher Remarks         │
├─────────────────────────┤
│ Previous Results List   │
│ ├─ Mid-term 2026 ──────┤│
│ ├─ Final 2025 ─────────┤│
│ └─ Mid-term 2025 ──────┘│
├─────────────────────────┤
│ [Download Marksheet]    │
│ (Future - disabled)     │
├─────────────────────────┤
│ Bottom Navigation       │
└─────────────────────────┘
```

---

## Sections & Components

### 1. Latest Result Hero Card
- **Data**: Exam name, total obtained/total marks, GPA, grade, position (if applicable)
- **Design**: Large hero card with gradient or accent background
  - GPA prominently displayed in a circle/badge
  - Grade letter badge
  - Total marks with progress bar
- **Animation**: Number count-up animation on load

### 2. Subject-wise Marks Table
- **Data per row**: Subject name, obtained marks, total marks, grade, pass/fail status
- **Design**: Clean table/list with:
  - Subject name (left)
  - Marks bar (visual) with "88/100" label
  - Grade badge (A+, A, B, etc.)
  - Pass (green) / Fail (red) indicator
- **Sorting**: By marks (highest first) or alphabetical (configurable)

### 3. Teacher Remarks
- **Data**: General remark from class teacher
- **Design**: Quoted text card with teacher name
- **Condition**: Only show if remarks exist

### 4. Previous Results List
- **Data**: List of all past exam results
- **Design**: Card list with:
  - Exam name + date
  - GPA / Grade badge
  - Total marks summary
- **Tap action**: Navigate to detailed view of that result (same layout, different data)

### 5. Download Marksheet Button
- **V1**: Disabled with "Coming Soon" badge
- **Future**: Download official marksheet as PDF
- **Design**: Full-width outlined button

---

## Data Requirements

```typescript
interface ResultsData {
  latest: {
    id: string;
    examName: string;
    examDate: string;
    totalObtained: number;
    totalMarks: number;
    gpa: number;
    grade: string;
    position?: number;
    totalStudents?: number;
    subjects: Array<{
      name: string;
      obtained: number;
      total: number;
      grade: string;
      isPassed: boolean;
    }>;
    teacherRemarks?: string;
    teacherName?: string;
  } | null;
  previous: Array<{
    id: string;
    examName: string;
    examDate: string;
    totalObtained: number;
    totalMarks: number;
    gpa: number;
    grade: string;
  }>;
}
```

---

## File Structure

```
src/app/(portal)/results/
├── page.tsx                    # Results page (server component)
├── loading.tsx                 # Skeleton loader
├── [id]/
│   └── page.tsx                # Individual result detail page
└── _components/
    ├── LatestResultCard.tsx    # Hero card with GPA/grade
    ├── SubjectMarks.tsx       # Subject-wise marks table
    ├── TeacherRemarks.tsx     # Remarks card
    ├── PreviousResults.tsx    # Past results list
    └── DownloadButton.tsx     # Marksheet download (future)
```

---

## Acceptance Criteria

- [ ] Latest result card shows GPA, grade, and total marks prominently
- [ ] Number count-up animation on marks and GPA
- [ ] Subject-wise marks displayed with visual progress bars
- [ ] Pass/fail indicators use green/red colors
- [ ] Teacher remarks section shows only when data exists
- [ ] Previous results are listed chronologically (most recent first)
- [ ] Tapping a previous result navigates to its detailed view
- [ ] Download marksheet button is disabled with "Coming Soon"
- [ ] Empty state when no results are available
- [ ] Responsive from 320px to 1440px
- [ ] Dark mode fully supported
- [ ] Loading skeleton shown while data loads
