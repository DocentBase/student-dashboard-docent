# Feature 03 — Fees & Payments

## Route
`/fees` (protected by Clerk auth)

## Purpose
Allow students to view their fee status, payment history, and due amounts in a clear, stress-free interface. No payment processing in V1 — display only.

---

## UI Layout

### Mobile (Primary)
```
┌─────────────────────────┐
│ Header + Back           │
├─────────────────────────┤
│ Page Title: Fees        │
├─────────────────────────┤
│ Current Status Card     │
│ ┌───────────────────┐   │
│ │ August 2026       │   │
│ │ ৳ 5,500           │   │
│ │ Status: PAID ✅   │   │
│ └───────────────────┘   │
├─────────────────────────┤
│ Due Amount Card         │
│ (if any pending dues)   │
├─────────────────────────┤
│ Payment Instructions    │
├─────────────────────────┤
│ Payment History         │
│ ┌─ Jul 2026 ─ ৳5,500 ─ Paid ─┐│
│ ├─ Jun 2026 ─ ৳5,500 ─ Paid ─┤│
│ ├─ May 2026 ─ ৳5,500 ─ Due ──┤│
│ └─ Apr 2026 ─ ৳5,500 ─ Paid ─┘│
├─────────────────────────┤
│ [Pay Online] Button     │
│ (Future - disabled/badge)│
├─────────────────────────┤
│ Bottom Navigation       │
└─────────────────────────┘
```

---

## Sections & Components

### 1. Current Month Status Card
- **Data**: Current month name, fee amount, payment status, payment date (if paid)
- **Design**: Large hero card with prominent status
  - Paid: Green background tint with checkmark
  - Due: Red/amber background tint with alert icon
  - Overdue: Red pulsing border with warning
- **Amount**: Large bold font with currency symbol

### 2. Due Amount Card
- **Condition**: Show only if there are pending dues
- **Data**: Total due amount, due date, late fee (if applicable)
- **Design**: Red-accented card with urgency indicator
- **Action**: "View Details" expands to show breakdown

### 3. Payment Instructions
- **Data**: Organization-specific payment instructions (bank details, bKash/Nagad numbers, office hours)
- **Design**: Collapsible accordion section
- **Content**: Static text from organization settings

### 4. Payment History
- **Data**: List of all previous months with payment status
- **Design**: Timeline-style list
  - Each row: Month/Year · Amount · Status badge · Date paid
  - Status badges: "Paid" (green), "Due" (amber), "Overdue" (red)
- **Action**: Tap a row to expand details
- **Download**: Receipt download button per paid entry (PDF icon)

### 5. Online Payment Button
- **V1**: Disabled button with "Coming Soon" badge
- **Future**: Active payment gateway integration
- **Design**: Full-width CTA button at bottom

---

## Data Requirements

```typescript
interface FeesData {
  currentMonth: {
    month: string;       // "August 2026"
    amount: number;
    currency: string;    // "BDT" / "৳"
    status: 'paid' | 'due' | 'overdue';
    paidDate?: string;
    dueDate: string;
  };
  totalDue: {
    amount: number;
    currency: string;
    breakdown: Array<{
      month: string;
      amount: number;
      lateFee: number;
    }>;
  };
  paymentInstructions: string;  // Markdown or plain text
  history: Array<{
    id: string;
    month: string;
    amount: number;
    currency: string;
    status: 'paid' | 'due' | 'overdue';
    paidDate?: string;
    dueDate: string;
    receiptUrl?: string;
  }>;
}
```

---

## File Structure

```
src/app/(portal)/fees/
├── page.tsx                    # Fees page (server component)
├── loading.tsx                 # Skeleton loader
└── _components/
    ├── CurrentMonthCard.tsx    # Hero card with current status
    ├── DueAmountCard.tsx       # Pending dues alert
    ├── PaymentInstructions.tsx # Accordion with payment info
    ├── PaymentHistory.tsx      # Timeline list of payments
    └── PayOnlineButton.tsx     # CTA button (future)
```

---

## Acceptance Criteria

- [ ] Current month card prominently shows fee amount and status
- [ ] Status colors: green (paid), amber (due), red (overdue)
- [ ] Due amount card only visible when there are pending fees
- [ ] Payment history is a scrollable list with status badges
- [ ] Receipt download button appears for paid entries
- [ ] Payment instructions section is collapsible
- [ ] "Pay Online" button is disabled with "Coming Soon" label
- [ ] Currency formatting is correct (locale-aware)
- [ ] Responsive from 320px to 1440px
- [ ] Dark mode fully supported
- [ ] Loading skeleton shown while data loads
- [ ] Empty state for students with no fee records
