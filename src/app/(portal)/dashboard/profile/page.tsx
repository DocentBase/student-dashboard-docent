'use client';

import { Card } from '@/components/ui/Card';
import { UserProfile } from '@clerk/nextjs';
import { ShieldCheck, GraduationCap, School, Mail, Phone, Calendar, UserCheck } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="eyebrow">Account & Identity</div>
        <h1 className="page-title">Student Profile</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Verified academic credentials, biometric status, and personal preferences.
        </p>
      </div>

      {/* Official Academic Details Banner */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="text-blue-600" size={20} />
          <div>
            <h3 className="section-title">Official Academic Record</h3>
            <p className="text-xs text-zinc-500">Managed directly by the institution registry (read-only)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
              Universal Student ID (USI)
            </span>
            <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">
              DC-2026-0894
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
              Academic Group
            </span>
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              HSC Science 2026
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
              Roll / Section
            </span>
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Roll #12 (Section A)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
              Registry Status
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <UserCheck size={14} /> Active Enrolled
            </span>
          </div>
        </div>
      </Card>

      {/* Clerk User Profile Integration */}
      <div className="flex justify-center w-full">
        <UserProfile
          appearance={{
            elements: {
              card: 'border border-zinc-200 dark:border-zinc-800 shadow-xs rounded-2xl bg-white dark:bg-zinc-900 w-full',
              navbar: 'border-r border-zinc-200 dark:border-zinc-800',
              navbarButton: 'text-xs font-medium',
              headerTitle: 'text-lg font-bold text-zinc-900 dark:text-zinc-100',
              headerSubtitle: 'text-xs text-zinc-500',
              formButtonPrimary: 'btn btn-primary text-xs h-9 rounded-lg',
            },
          }}
          path="/dashboard/profile"
          routing="path"
        />
      </div>
    </div>
  );
}
