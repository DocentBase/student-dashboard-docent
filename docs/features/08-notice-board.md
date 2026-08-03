# Feature 08 — Notice Board

## Route
`/notices` (protected by Clerk auth)

## Purpose
Display all organization announcements targeted at the student. Notices should be easy to scan, filter, and identify by priority.

---

## UI Layout

### Mobile (Primary)
```
┌─────────────────────────┐
│ Header + Back           │
├─────────────────────────┤
│ Page Title: Notices     │
├─────────────────────────┤
│ 🔍 Search Bar           │
├─────────────────────────┤
│ Category Filter Chips   │
│ [All] [Important]       │
│ [Academic] [Holiday]    │
│ [Exam]                  │
├─────────────────────────┤
│ Notice Card 1 (Unread)  │
│ ┌───────────────────┐   │
│ │ 🔴 Important      │   │
│ │ School will remain│   │
│ │ closed on Aug 5   │   │
│ │ Aug 2, 2026  •NEW │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ Notice Card 2 (Read)    │
│ ┌───────────────────┐   │
│ │ 📘 Academic       │   │
│ │ Mid-term exam     │   │
│ │ schedule released │   │
│ │ Jul 30, 2026      │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ More notices...         │
├─────────────────────────┤
│ Bottom Navigation       │
└─────────────────────────┘
```

---

## Sections & Components

### 1. Search Bar
- **Design**: Full-width search with icon
- **Behavior**: Filters notices by title content (debounced)
- **Placeholder**: "Search notices..."

### 2. Category Filter Chips
- **Categories**: All, Important, Academic, Holiday, Exam
- **Design**: Horizontal scrollable pill buttons
- **Colors per category**:
  - Important: Red
  - Academic: Blue
  - Holiday: Green
  - Exam: Amber
- **Active state**: Filled chip

### 3. Notice Cards
- **Data per card**: Title, body preview (2 lines), date, category, read/unread status
- **Design**:
  - **Unread**: Bold title, "NEW" badge, subtle left border accent
  - **Read**: Normal weight, no badge, muted styling
  - Category color dot/badge in top-right
  - Date in secondary text
- **Tap action**: Navigate to full notice detail view
- **Animation**: Fade-in on scroll

### 4. Notice Detail View
- **Route**: `/notices/[id]`
- **Data**: Full title, full body (markdown rendered), date, category, attachments
- **Design**: Clean reading view with generous typography
- **Back button**: Return to notice list
- **Mark as read**: Auto-marked when opened

### 5. Read/Unread Status
- **Unread count**: Badge on the Notice Board nav item
- **Visual**: Unread notices have a left border accent and "NEW" badge
- **Auto-read**: Opening a notice marks it as read

---

## Data Requirements

```typescript
interface NoticesData {
  notices: Array<{
    id: string;
    title: string;
    body: string;          // Full content (markdown)
    bodyPreview: string;   // First 100 chars
    date: string;
    category: 'important' | 'academic' | 'holiday' | 'exam';
    isRead: boolean;
    attachments?: Array<{
      name: string;
      url: string;
      type: string;
    }>;
  }>;
  unreadCount: number;
  categories: string[];
}
```

---

## File Structure

```
src/app/(portal)/notices/
├── page.tsx                    # Notices list page (server component)
├── loading.tsx                 # Skeleton loader
├── [id]/
│   ├── page.tsx                # Notice detail page
│   └── loading.tsx             # Detail skeleton
└── _components/
    ├── NoticeSearch.tsx        # Search input (client component)
    ├── CategoryFilter.tsx     # Category chips (client component)
    ├── NoticeCard.tsx         # Individual notice card
    ├── NoticeList.tsx         # List wrapper
    └── NoticeDetail.tsx       # Full notice reader view
```

---

## Acceptance Criteria

- [ ] Search filters notices by title in real-time
- [ ] Category chips filter notices correctly
- [ ] Unread notices have bold text, "NEW" badge, and left accent border
- [ ] Read notices are visually muted
- [ ] Tapping a notice navigates to detail view
- [ ] Detail view renders full markdown content
- [ ] Opening a notice auto-marks it as read
- [ ] Unread count badge shows on navigation item
- [ ] Category colors are consistent (red/blue/green/amber)
- [ ] Empty state when no notices found
- [ ] Responsive from 320px to 1440px
- [ ] Dark mode fully supported
- [ ] Loading skeleton shown while data loads
- [ ] Notices sorted by date (newest first), unread prioritized
