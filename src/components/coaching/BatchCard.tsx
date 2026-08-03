'use client';

import { motion } from 'framer-motion';
import { Batch } from '@/types';
import { Badge } from '@/components/ui/Badge';
import {
  Clock,
  MapPin,
  User,
  BookOpen,
  RefreshCw,
  Info,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

interface BatchCardProps {
  batch: Batch;
  onViewDetails: (batch: Batch) => void;
  onRequestTransfer: (batch: Batch) => void;
}

export function BatchCard({
  batch,
  onViewDetails,
  onRequestTransfer,
}: BatchCardProps) {
  const getStatusBadgeVariant = (
    status?: string
  ): 'success' | 'warning' | 'info' | 'danger' => {
    switch (status) {
      case 'active':
        return 'success';
      case 'upcoming':
        return 'warning';
      case 'completed':
        return 'info';
      default:
        return 'info';
    }
  };

  const progress = batch.progress_percentage || 0;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="group relative rounded-3xl p-6 border transition-all flex flex-col justify-between overflow-hidden"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-default)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Decorative Top Accent Glow on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Card Header: Institute Badge & Status */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-bold tracking-wide uppercase text-indigo-600 dark:text-indigo-400">
              {batch.coaching_center_name || 'Docent Academy'}
            </span>
          </div>

          <Badge variant={getStatusBadgeVariant(batch.status)}>
            {batch.status ? batch.status.toUpperCase() : 'ACTIVE'}
          </Badge>
        </div>

        {/* Course & Batch Title */}
        <h3 className="font-extrabold text-xl text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
          {batch.name}
        </h3>

        {/* Batch Code & Class Badge */}
        <div className="flex items-center gap-2 mt-2 mb-5">
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-medium text-slate-600 dark:text-slate-300">
            {batch.batch_code || batch.id}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-[11px] font-semibold text-indigo-600 dark:text-indigo-300">
            {batch.class_level || 'HSC 2nd Year'}
          </span>
        </div>

        {/* Schedule & Location Box */}
        <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 flex flex-col gap-3 mb-5 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 shrink-0">
              <Clock size={14} />
            </div>
            <span className="font-medium">
              <strong>Schedule:</strong> {batch.timing || 'Sat, Mon, Wed (04:00 PM - 05:30 PM)'}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
              <MapPin size={14} />
            </div>
            <span className="font-medium">
              <strong>Venue:</strong> {batch.room_number || 'Room 304 (Farmgate Campus)'}
            </span>
          </div>
        </div>

        {/* Instructor Info */}
        <div className="flex items-center justify-between mb-5 px-1">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                {batch.assigned_teacher ? batch.assigned_teacher.charAt(0) : 'T'}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400">Lead Instructor</p>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {batch.assigned_teacher || 'Dr. Mahmudul Hasan'}
              </p>
            </div>
          </div>
        </div>

        {/* Syllabus Progress Bar */}
        <div className="mb-5 p-3.5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/80 dark:border-indigo-900/40">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-slate-600 dark:text-slate-300">Syllabus Completion</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{progress}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Card Footer: Fee Info & Action Buttons */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-slate-500 font-medium">Monthly Tuition Fee</span>
          <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
            ৳ {batch.monthly_fee ? batch.monthly_fee.toLocaleString() : '2,500'}
            <span className="text-slate-400 text-xs font-normal"> / mo</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onViewDetails(batch)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20 active:scale-95"
          >
            <Info size={14} /> View Details
          </button>

          <button
            onClick={() => onRequestTransfer(batch)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
          >
            <RefreshCw size={14} /> Transfer Slot
          </button>
        </div>
      </div>
    </motion.div>
  );
}
