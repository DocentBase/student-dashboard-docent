# Feature 04 — Notes & Learning Resources

## Route
`/notes` (protected by Clerk auth)

## Purpose
Provide students with easy access to all learning materials shared by their teachers. Students should be able to browse, search, filter, and download notes quickly.

---

## UI Layout

### Mobile (Primary)
```
┌─────────────────────────┐
│ Header + Back           │
├─────────────────────────┤
│ Page Title: Notes       │
├─────────────────────────┤
│ 🔍 Search Bar           │
├─────────────────────────┤
│ Subject Filter Chips    │
│ [All] [Math] [English]  │
│ [Science] [History] ... │
├─────────────────────────┤
│ Recently Uploaded       │
│ Section Header          │
├─────────────────────────┤
│ Note Card 1             │
│ ┌───────────────────┐   │
│ │ 📄 Algebra Ch.5   │   │
│ │ Math · Aug 2, 2026│   │
│ │ PDF · 2.4 MB      │   │
│ │         [Download] │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ Note Card 2             │
│ Note Card 3             │
│ ...                     │
├─────────────────────────┤
│ Bottom Navigation       │
└─────────────────────────┘
```

---

## Sections & Components

### 1. Search Bar
- **Design**: Full-width search input with search icon
- **Behavior**: Filters notes by title and subject in real-time (debounced)
- **Placeholder**: "Search notes by title or subject..."

### 2. Subject Filter Chips
- **Data**: Dynamic list of subjects from the student's class
- **Design**: Horizontal scrollable chip/pill buttons
- **Behavior**: "All" selected by default; selecting a subject filters the list
- **Active state**: Filled chip with primary color

### 3. Recently Uploaded Section
- **Design**: Section header "Recently Uploaded" with count
- **Behavior**: Shows notes from the last 7 days at the top

### 4. Note Cards
- **Data per card**: Title, subject, upload date, file type, file size, teacher name
- **Design**: Clean card with:
  - File type icon (📄 PDF, 🎬 Video, 📊 PPT)
  - Title (bold)
  - Subject badge + upload date
  - File size
  - Download button (right-aligned)
- **Action**: Tap card to view details; download button to save file
- **Animation**: Subtle appear animation on scroll

### 5. Empty State
- **Design**: Illustration + "No notes uploaded yet" message
- **Show when**: No notes available or search returns zero results

### 6. Favorites Section (Future)
- **V1**: Not implemented
- **Future**: Heart icon on cards to favorite, separate "My Favorites" tab

---

## Data Requirements

```typescript
interface NotesData {
  subjects: string[];  // ["Mathematics", "English", "Science", ...]
  notes: Array<{
    id: string;
    title: string;
    subject: string;
    teacher: string;
    uploadDate: string;
    fileType: 'pdf' | 'doc' | 'ppt' | 'video' | 'image';
    fileSize: string;    // "2.4 MB"
    downloadUrl: string;
    isFavorite?: boolean; // Future
  }>;
}
```

---

## File Structure

```
src/app/(portal)/notes/
├── page.tsx                    # Notes page (server component with client search)
├── loading.tsx                 # Skeleton loader
└── _components/
    ├── NotesSearch.tsx         # Search input (client component)
    ├── SubjectFilter.tsx       # Filter chips (client component)
    ├── NoteCard.tsx            # Individual note card
    ├── NotesList.tsx           # List wrapper with empty state
    └── NotesEmptyState.tsx     # Empty state component
```

---

## Acceptance Criteria

- [ ] Search filters notes by title and subject in real-time
- [ ] Subject chips filter the notes list correctly
- [ ] "All" chip shows all notes (default)
- [ ] Each note card displays title, subject, date, file type, size
- [ ] Download button triggers file download
- [ ] Recently uploaded notes (last 7 days) are highlighted
- [ ] File type icons differentiate between PDF, video, etc.
- [ ] Empty state shown when no results found
- [ ] Responsive from 320px to 1440px
- [ ] Dark mode fully supported
- [ ] Loading skeleton shown while data loads
- [ ] Notes are sorted by upload date (newest first)
