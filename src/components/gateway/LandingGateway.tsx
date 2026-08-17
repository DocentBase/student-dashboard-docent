'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap,
  ArrowRight,
  BookOpen,
  Calendar,
  Trophy,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { ProductFrame } from '@/components/ui/ProductFrame';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';

export function LandingGateway() {
  const { isLoaded, userId } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Precision Cockpit Topbar */}
      <header className="sticky top-0 z-30 flex justify-between items-center px-6 lg:px-12 h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img
            src="/images/docent-logo.jpg"
            alt="DocentBase Logo"
            className="h-9 w-9 rounded-lg object-cover shadow-sm border border-zinc-200 dark:border-zinc-800"
          />
          <div>
            <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50 block leading-tight">
              DocentBase
            </span>
            <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
              Student Cockpit
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isLoaded && !userId && (
            <>
              <Link href="/sign-in">
                <SecondaryButton className="h-9 px-4 text-xs">Sign in</SecondaryButton>
              </Link>
              <Link href="/sign-up">
                <PrimaryButton className="h-9 px-4 text-xs">Create Account</PrimaryButton>
              </Link>
            </>
          )}
          {isLoaded && userId && (
            <Link href="/dashboard">
              <PrimaryButton className="h-9 px-4 text-xs">
                Launch Dashboard
              </PrimaryButton>
            </Link>
          )}
        </div>
      </header>

      {/* Hero Cockpit Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 py-16 lg:py-24 max-w-7xl mx-auto w-full">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50/70 dark:bg-blue-950/40 text-[11px] font-bold text-blue-700 dark:text-blue-400 tracking-wide uppercase mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>Operational Academic Workspace</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.05em] text-zinc-950 dark:text-zinc-50 text-center max-w-3xl leading-[1.1] mb-6"
        >
          Precision student operations, <br className="hidden sm:inline" />
          <span className="text-blue-600 dark:text-blue-500">calm and disciplined.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 text-center max-w-2xl leading-relaxed mb-8"
        >
          Track class attendance, clear tuition via bKash/Nagad, access lecture resources, and monitor real-time exam performance in one cohesive cockpit.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex items-center gap-3 mb-16 flex-wrap justify-center"
        >
          {isLoaded && !userId ? (
            <>
              <Link href="/sign-up">
                <PrimaryButton className="h-11 px-6 text-sm">
                  Enroll as Student
                </PrimaryButton>
              </Link>
              <Link href="/sign-in">
                <SecondaryButton className="h-11 px-6 text-sm">
                  Portal Login
                </SecondaryButton>
              </Link>
            </>
          ) : (
            <Link href="/dashboard">
              <PrimaryButton className="h-11 px-6 text-sm">
                Enter Student Cockpit
              </PrimaryButton>
            </Link>
          )}
        </motion.div>

        {/* Live Product Frame Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-5xl mb-20"
        >
          <ProductFrame url="portal.docentbase.edu.bd/dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Attendance</span>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1 tabular-nums">92.4%</p>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-2">
                  <CheckCircle2 size={13} />
                  <span>On track for term honor roll</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Current Standing</span>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1 tabular-nums">GPA 4.95</p>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 mt-2">
                  <Zap size={13} />
                  <span>Top 5% in HSC Science Batch</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Tuition Status</span>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1 tabular-nums">Cleared</p>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-2">
                  <ShieldCheck size={13} />
                  <span>August payment verified</span>
                </div>
              </div>
            </div>
          </ProductFrame>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Calendar size={20} />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Automated Schedules</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Real-time synchronization with faculty timetables, batch reschedule notifications, and exam venues.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <BookOpen size={20} />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Resource Repository</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Curated lecture slides, formula sheets, chapter practice problem sets, and verified syllabus materials.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <Trophy size={20} />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Analytics & Marks</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Weekly quiz mark tracking, historical percentile benchmarking, and detailed teacher feedback notes.
            </p>
          </div>
        </div>
      </main>

      {/* Cockpit Footer */}
      <footer className="px-6 lg:px-12 py-8 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center text-xs text-zinc-400">
        <p>© {new Date().getFullYear()} DocentBase Student Portal. Built on the Conversora Calm Operator Design System.</p>
      </footer>
    </div>
  );
}
