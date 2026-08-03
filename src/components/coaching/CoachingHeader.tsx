'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Building2, Clock, CheckCircle2, Search } from 'lucide-react';

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
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg"
        style={{
          background: 'linear-gradient(135deg, var(--brand-primary) 0%, #3730A3 100%)',
        }}
      >
        {/* Background decorative circles */}
        <div
          className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full opacity-10 pointer-events-none"
          style={{ background: '#FFFFFF' }}
        />
        <div
          className="absolute right-20 -top-10 w-32 h-32 rounded-full opacity-10 pointer-events-none"
          style={{ background: '#FFFFFF' }}
        />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20 text-white backdrop-blur-md">
                Student Academic Hub
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              My Enrolled Coaching & Batches
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-xl mt-1">
              Manage your active coaching institutes, subject batches, class schedules, and request batch transfers in one place.
            </p>
          </div>

          {/* Key Quick Stats Pills */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-white/80 text-xs mb-1">
                <GraduationCap size={14} /> Active Batches
              </div>
              <p className="text-xl font-bold">{activeBatchesCount}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-white/80 text-xs mb-1">
                <Building2 size={14} /> Institutes
              </div>
              <p className="text-xl font-bold">{centersCount}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-white/80 text-xs mb-1">
                <Clock size={14} /> Weekly Hours
              </div>
              <p className="text-xl font-bold">{totalHoursPerWeek}h</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by course, batch, or teacher..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            style={{
              background: 'var(--bg-surface)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'active', 'upcoming', 'completed'].map((filterKey) => {
            const isSelected = selectedFilter === filterKey;
            const label =
              filterKey.charAt(0).toUpperCase() + filterKey.slice(1);

            return (
              <button
                key={filterKey}
                onClick={() => onFilterChange(filterKey)}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap"
                style={{
                  background: isSelected
                    ? 'var(--brand-primary)'
                    : 'var(--bg-surface)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                  border: isSelected
                    ? '1px solid var(--brand-primary)'
                    : '1px solid var(--border-default)',
                  boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
