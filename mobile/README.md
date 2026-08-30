# DocentBase Student Portal - React Native Expo Mobile App

The official mobile application for the **DocentBase Student Portal**, built with **React Native**, **Expo SDK 52**, and **Expo Router**.

---

## 📱 Features

- **Full Parity with Web Portal**: Mirrors every cockpit feature (Dashboard, Attendance, Routine, Coaching Batches, Exams, Results, Fees, Notes, Notices, Settings, Profile).
- **Conversora / Calm Operator UI**: Matches the exact colors, typography, glassmorphism, and card tokens of the DocentBase design system.
- **Clerk Authentication**: Integrated `@clerk/clerk-expo` with `expo-secure-store` for seamless persistent biometric / token session management.
- **Zero Duplicate Backend**: Consumes the existing Next.js REST API endpoints directly with Bearer token authentication.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd mobile
npm install
```

### 2. Start Expo Development Server
```bash
npm run start
```

### 3. Run on Target Platform
- **iOS Simulator**: Press `i` or run `npm run ios` (macOS required)
- **Android Emulator**: Press `a` or run `npm run android`
- **Expo Go App**: Scan the QR code with the Expo Go app on your physical iOS/Android phone.
- **Web Preview**: Press `w` or run `npm run web`

---

## 📂 Architecture

```
mobile/
├── app/                      # Expo Router File-based Navigation
│   ├── _layout.tsx           # ClerkProvider + SafeArea Root Layout
│   ├── (auth)/               # Auth routes (Sign In, Sign Up)
│   ├── (tabs)/               # Bottom Tab Navigator
│   │   ├── index.tsx         # Cockpit Dashboard
│   │   ├── attendance.tsx    # Biometric Attendance Logs & Streak
│   │   ├── routine.tsx       # Daily Class Timetable
│   │   ├── coaching.tsx      # Enrolled Coaching Batches & Hub
│   │   └── profile.tsx       # Digital Student ID & Contacts
│   ├── exams/index.tsx       # Exam & Test Schedules
│   ├── results/index.tsx     # GPA Reports & Marks Sheets
│   ├── fees/index.tsx        # Tuition Dues & Payment Receipts
│   ├── notes/index.tsx       # PDF Resource & Lecture Library
│   ├── notices/index.tsx     # Categorized Notice Board
│   └── settings/index.tsx    # Notifications & Preferences
├── src/
│   ├── components/           # Reusable Calm Operator UI components
│   ├── constants/            # Design tokens (Cobalt, Zinc, Slate)
│   ├── lib/                  # Clerk Token Cache & API Fetch Client
│   └── types/                # Student & Academic TypeScript Schemas
├── assets/                   # Brand icons & splash graphics
├── app.json                  # Expo Project Configuration
└── package.json
```
