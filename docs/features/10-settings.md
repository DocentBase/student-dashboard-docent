# Feature 10 — Settings

## Route
`/settings` (protected by Clerk auth)

## Purpose
Allow students to manage personal preferences like theme, language, notifications, and account security.

---

## UI Layout

### Mobile (Primary)
```
┌─────────────────────────┐
│ Header + Back           │
├─────────────────────────┤
│ Page Title: Settings    │
├─────────────────────────┤
│ Appearance              │
│ ┌───────────────────┐   │
│ │ Theme             │   │
│ │ [Light] [Dark]    │   │
│ │ [System]          │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ Language                │
│ ┌───────────────────┐   │
│ │ Language: English │   │
│ │ [English] [বাংলা] │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ Notifications           │
│ ┌───────────────────┐   │
│ │ Push Notif  [ON]  │   │
│ │ Email Notif [ON]  │   │
│ │ Exam Alerts [ON]  │   │
│ │ Notice Alert[ON]  │   │
│ │ Fee Remind  [ON]  │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ Security                │
│ ┌───────────────────┐   │
│ │ [Change Password] │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ ┌───────────────────┐   │
│ │ [Log Out]  🔴     │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ App Version v1.0.0      │
├─────────────────────────┤
│ Bottom Navigation       │
└─────────────────────────┘
```

---

## Sections & Components

### 1. Appearance / Theme
- **Options**: Light, Dark, System (auto-detect)
- **Design**: Segmented control or radio card group
- **Behavior**: Instantly applies theme change
- **Storage**: LocalStorage + user preference in DB

### 2. Language
- **Options**: English, বাংলা (Bengali) — extensible
- **Design**: Radio group or dropdown selector
- **V1**: English only (Bengali shown as "Coming Soon")
- **Future**: Full i18n support

### 3. Notification Preferences
- **Toggles**:
  - Push Notifications (overall)
  - Email Notifications
  - Exam Alerts
  - Notice Alerts
  - Fee Reminders
- **Design**: Toggle switch list with labels and descriptions
- **Behavior**: Save to user preferences in DB
- **Visual**: Each toggle has an icon and brief description

### 4. Security
- **Change Password**: Button that redirects to Clerk's password change flow
- **Design**: Card with button
- **Note**: Since we use Clerk, this delegates to Clerk's built-in UI

### 5. Logout
- **Design**: Red-accented button, full width
- **Behavior**: Calls Clerk sign-out, redirects to login page
- **Confirmation**: "Are you sure?" confirmation dialog before logout

### 6. App Version Footer
- **Data**: App version number
- **Design**: Small muted text centered at bottom

---

## Data Requirements

```typescript
interface SettingsData {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'bn';
  notifications: {
    push: boolean;
    email: boolean;
    examAlerts: boolean;
    noticeAlerts: boolean;
    feeReminders: boolean;
  };
}
```

---

## File Structure

```
src/app/(portal)/settings/
├── page.tsx                    # Settings page (server component)
├── loading.tsx                 # Skeleton loader
└── _components/
    ├── ThemeSelector.tsx       # Theme toggle (client component)
    ├── LanguageSelector.tsx    # Language picker (client component)
    ├── NotificationToggles.tsx # Notification switches (client component)
    ├── SecuritySection.tsx     # Change password card
    ├── LogoutButton.tsx        # Logout with confirmation (client component)
    └── AppVersion.tsx          # Version footer
```

---

## Acceptance Criteria

- [ ] Theme toggle instantly switches between Light/Dark/System
- [ ] Theme preference persists across sessions
- [ ] Language selector shows English as active (Bengali as "Coming Soon")
- [ ] All notification toggles save preferences to database
- [ ] Toggle switches animate smoothly
- [ ] "Change Password" delegates to Clerk's password flow
- [ ] Logout button shows confirmation dialog
- [ ] Logout successfully signs out and redirects to login
- [ ] App version displayed at bottom
- [ ] Responsive from 320px to 1440px
- [ ] Dark mode fully supported
- [ ] Loading skeleton shown while data loads
