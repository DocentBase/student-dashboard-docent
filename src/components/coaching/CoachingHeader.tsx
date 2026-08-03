'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap,
  Building2,
  Clock,
  Sparkles,
  Search,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

interface CoachingHeaderProps {
  activeBatchesCount: number;
  centersCount: number;
  totalHoursPerWeek: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedFilter: string;
  onFilterChange: (f: string) => void;
}

export function CoachingHeader({
  activeBatchesCount,
  centersCount,
  totalHoursPerWeek,
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
}: CoachingHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Ultra-Premium Glassmorphism Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-6 sm:p-8 md:p-10 text-white overflow-hidden shadow-2xl border border-white/10"
        style={{
          background:
            'radial-gradient(135% 135% at 0% 0%, #4F46E5 0%, #3730A3 50%, #1E1B4B 100%)',
        }}
      >
        {/* Decorative Ambient Glowing Orbs */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -ml-16 -mb-16 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Main Title & Subtitle */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-4 shadow-sm">
              <Sparkles size={14} className="text-amber-300 animate-pulse" />
              <span>Student Academic & Coaching Management</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              My Coaching & Batches
            </h1>

            <p className="mt-3 text-white/85 text-sm sm:text-base leading-relaxed max-w-xl">
              Track your enrolled coaching institutes, subject batches, class routines, instructor details, and submit batch schedule transfer requests.
            </p>

            {/* Quick Next Class Pill */}
            <div className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 text-xs text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-medium">
                <strong>Next Class:</strong> HSC Physics Batch 04 • Today at 04:00 PM (Room 304)
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3.5 w-full lg:w-auto shrink-0">
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-center shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-2 text-indigo-200">
                <GraduationCap size={20} />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeBatchesCount}
              </span>
              <span className="text-[11px] font-medium text-white/70 mt-0.5">
                Active Batches
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-center shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-2 text-purple-200">
                <Building2 size={20} />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {centersCount}
              </span>
              <span className="text-[11px] font-medium text-white/70 mt-0.5">
                Institutes
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-center shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-2 text-emerald-200">
                <Clock size={20} />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {totalHoursPerWeek}h
              </span>
              <span className="text-[11px] font-medium text-white/70 mt-0.5">
                Weekly Hours
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Control Bar: Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by course, batch code, or teacher..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto px-1">
          {[
            { id: 'all', label: 'All Batches' },
            { id: 'active', label: 'Active' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'completed', label: 'Completed' },
          ].map((item) => {
            const isSelected = selectedFilter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onFilterChange(item.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'text-white bg-indigo-600 shadow-md shadow-indigo-500/20'
                    : 'text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
