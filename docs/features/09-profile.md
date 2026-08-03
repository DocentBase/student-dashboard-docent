# Feature 09 — Profile

## Route
`/profile` (protected by Clerk auth)

## Purpose
Display the student's personal and academic information. Students can view all their details but can only edit limited fields (profile photo, phone, email if allowed).

---

## UI Layout

### Mobile (Primary)
```
┌─────────────────────────┐
│ Header + Back           │
├─────────────────────────┤
│ Profile Photo + Name    │
│ ┌───────────────────┐   │
│ │     [Photo]       │   │
│ │   Rahim Ahmed     │   │
│ │   Class 10 · A    │   │
│ │   Roll: 12        │   │
│ │  [Change Photo]   │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ Student Information     │
│ ┌───────────────────┐   │
│ │ Student ID: S2026 │   │
│ │ Name: Rahim Ahmed │   │
│ │ Class: 10         │   │
│ │ Section: A        │   │
│ │ Roll: 12          │   │
│ │ Batch: 2026       │   │
│ │ Institution: XYZ  │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ Guardian Information    │
│ ┌───────────────────┐   │
│ │ Father: Mr. Ahmed │   │
│ │ Mother: Mrs. Ahmed│   │
│ │ Phone: +8801...   │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ Contact Information     │
│ ┌───────────────────┐   │
│ │ Email: rahim@...  │   │
│ │ Phone: +8801...   │   │
│ │ Address: ...      │   │
│ │ [Edit Contact] ✏️ │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ Bottom Navigation       │
└─────────────────────────┘
```

---

## Sections & Components

### 1. Profile Header Card
- **Data**: Profile photo, full name, class, section, roll number
- **Design**: Centered layout with large circular photo
  - Subtle gradient background behind photo
  - Name in large bold text
  - Class/section/roll as secondary text
- **Action**: "Change Photo" button below photo (opens file picker)
- **Photo upload**: Accepts JPG/PNG, max 2MB, crops to circle

### 2. Student Information Card
- **Data**: Student ID, full name, class, section, roll, batch, institution name
- **Design**: Clean key-value list card
  - Labels in secondary/muted text
  - Values in bold/primary text
- **Non-editable**: All fields are read-only (institution-controlled)
- **Visual**: Lock icon on non-editable fields

### 3. Guardian Information Card
- **Data**: Father's name, mother's name, guardian phone, guardian email
- **Design**: Same key-value card style
- **Non-editable**: Read-only

### 4. Contact Information Card
- **Data**: Student email, phone, address
- **Design**: Key-value card with edit button
- **Editable fields** (if organization allows):
  - Phone number
  - Email address
- **Edit flow**: Inline editing with save/cancel buttons
- **Validation**: Phone format, email format

---

## Data Requirements

```typescript
interface ProfileData {
  student: {
    id: string;
    name: string;
    class: string;
    section: string;
    roll: string;
    batch: string;
    institution: string;
    profilePhoto?: string;
    dateOfBirth?: string;
    bloodGroup?: string;
    gender?: string;
  };
  guardian: {
    fatherName: string;
    motherName: string;
    guardianPhone: string;
    guardianEmail?: string;
    relationship?: string;
  };
  contact: {
    email: string;
    phone: string;
    address?: string;
    isEmailEditable: boolean;
    isPhoneEditable: boolean;
  };
}
```

---

## File Structure

```
src/app/(portal)/profile/
├── page.tsx                    # Profile page (server component)
├── loading.tsx                 # Skeleton loader
└── _components/
    ├── ProfileHeader.tsx      # Photo + name hero card
    ├── PhotoUpload.tsx        # Photo change dialog (client component)
    ├── StudentInfo.tsx        # Student details card
    ├── GuardianInfo.tsx       # Guardian details card
    ├── ContactInfo.tsx        # Contact details with edit (client component)
    └── InfoRow.tsx            # Reusable key-value row component
```

---

## Acceptance Criteria

- [ ] Profile photo displayed in circular frame
- [ ] "Change Photo" button opens file picker (JPG/PNG, max 2MB)
- [ ] Student information is read-only with lock indicators
- [ ] Guardian information is read-only
- [ ] Contact information shows edit button for allowed fields
- [ ] Inline editing for phone/email with save/cancel
- [ ] Input validation on editable fields
- [ ] Non-editable fields clearly marked as institution-controlled
- [ ] All data displayed in clean key-value format
- [ ] Responsive from 320px to 1440px
- [ ] Dark mode fully supported
- [ ] Loading skeleton shown while data loads
