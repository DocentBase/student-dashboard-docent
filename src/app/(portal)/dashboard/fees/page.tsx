'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { Wallet, CheckCircle2, Clock, Download, ArrowUpRight, ShieldCheck, CreditCard, Receipt } from 'lucide-react';

const mockPaymentHistory = [
  {
    id: 'TXN-2026-8941',
    description: 'July 2026 Monthly Tuition Fee',
    paidDate: '05 Jul 2026',
    method: 'bKash · TrxID: 9MK2L49',
    amount: '৳ 5,500',
    status: 'PAID' as const,
  },
  {
    id: 'TXN-2026-7812',
    description: 'June 2026 Monthly Tuition Fee',
    paidDate: '03 Jun 2026',
    method: 'Nagad · TrxID: 8JL1P20',
    amount: '৳ 5,500',
    status: 'PAID' as const,
  },
  {
    id: 'TXN-2026-6420',
    description: 'May 2026 Monthly Tuition + Lab Charge',
    paidDate: '08 May 2026',
    method: 'bKash · TrxID: 7TY9W11',
    amount: '৳ 6,200',
    status: 'PAID' as const,
  },
];

export default function FeesPage() {
  const [paying, setPaying] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaidSuccess(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="eyebrow">Financial Ledger</div>
        <h1 className="page-title">Fees & Tuition Management</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Review invoices, pay online via bKash/Nagad/Cards, and download verified tax receipts.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="stat-grid">
        <StatCard
          label="Pending Due"
          value="৳ 5,500"
          sublabel="Due by 25 Aug 2026"
          icon={<Wallet size={18} />}
          trend="down"
        />
        <StatCard
          label="Total Paid This Year"
          value="৳ 42,200"
          sublabel="8 Invoices Cleared"
          icon={<ShieldCheck size={18} />}
          trend="up"
        />
        <StatCard
          label="Next Invoice"
          value="01 Sep"
          sublabel="September Regular Fee"
          icon={<Clock size={18} />}
        />
      </div>

      {/* Current Outstanding Invoice */}
      {!paidSuccess ? (
        <Card className="p-6 border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/30 to-white dark:from-blue-950/20 dark:to-zinc-900">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Current Billing Cycle
                </span>
                <StatusBadge status="DUE" />
              </div>
              <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                August 2026 Tuition & Library Fee
              </h2>
              <p className="text-xs text-zinc-500">
                Invoice #INV-2026-AUG-102 · Issued on 01 Aug 2026 · Grace period until 25 Aug 2026
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-zinc-600 dark:text-zinc-400 pt-2 font-mono">
                <span>Tuition: ৳ 4,500</span>
                <span>•</span>
                <span>Physics Lab: ৳ 600</span>
                <span>•</span>
                <span>Study Materials: ৳ 400</span>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-3 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-zinc-200 dark:border-zinc-800">
              <div className="text-left lg:text-right">
                <span className="text-xs text-zinc-400">Total Payable</span>
                <div className="text-3xl font-bold text-zinc-950 dark:text-zinc-50 tabular-nums">
                  ৳ 5,500
                </div>
              </div>

              <div className="flex items-center gap-2 w-full lg:w-auto">
                <button
                  onClick={handlePay}
                  disabled={paying}
                  className="btn btn-primary h-10 px-6 text-xs w-full lg:w-auto"
                >
                  <CreditCard size={15} />
                  <span>{paying ? 'Processing Payment...' : 'Pay via bKash / Card'}</span>
                </button>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                  Payment Completed Successfully
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  August 2026 tuition cleared. TrxID: BKASH-99812A.
                </p>
              </div>
            </div>
            <button className="btn btn-secondary text-xs h-8">
              <Download size={14} /> Download Receipt
            </button>
          </div>
        </Card>
      )}

      {/* Payment History Audit Table */}
      <Card className="card-flush">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Historical Transactions</span>
            <h3 className="section-title mt-0.5">Verified Payment History</h3>
          </div>
          <span className="text-xs text-zinc-500 font-mono">Academic Year 2026</span>
        </div>

        <div className="table-container border-0 rounded-none">
          <table className="cockpit-table">
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Description</th>
                <th>Payment Method</th>
                <th>Date Paid</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockPaymentHistory.map((txn) => (
                <tr key={txn.id}>
                  <td className="font-mono text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    {txn.id}
                  </td>
                  <td className="font-semibold text-zinc-900 dark:text-zinc-100">{txn.description}</td>
                  <td className="text-zinc-500 text-xs font-mono">{txn.method}</td>
                  <td className="text-zinc-600 dark:text-zinc-400 text-xs font-mono">{txn.paidDate}</td>
                  <td className="text-right font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
                    {txn.amount}
                  </td>
                  <td className="text-center">
                    <StatusBadge status={txn.status} />
                  </td>
                  <td className="text-right">
                    <button className="icon-button h-7 w-7" title="Download PDF Receipt">
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
