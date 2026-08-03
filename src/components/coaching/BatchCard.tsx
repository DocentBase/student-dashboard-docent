'use client';
import { motion } from 'framer-motion';
import { Batch } from '@/types';
import { Badge } from '@/components/ui/Badge';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  ArrowUpRight,
  RefreshCw,
  Info,
  DollarSign,
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
  const getStatusBadgeVariant = (status?: string): 'success' | 'warning' | 'info' | 'danger' => {
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
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="rounded-2xl p-5 border flex flex-col justify-between transition-all"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div>
        {/* Header: Center Name + Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-md"
            style={{
              background: 'var(--brand-primary-light)',
              color: 'var(--brand-primary)',
            }}
          >
            {batch.coaching_center_name || 'Docent Academy'}
          </span>
          <Badge variant={getStatusBadgeVariant(batch.status)}>
            {batch.status ? batch.status.toUpperCase() : 'ACTIVE'}
          </Badge>
        </div>

        {/* Course & Batch Name */}
        <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-slate-100">
          {batch.name}
        </h3>
        <p className="text-xs font-mono mb-4 text-slate-500">
          Code: {batch.batch_code || batch.id} • Class: {batch.class_level || 'HSC 2nd Year'}
        </p>

        {/* Schedule & Location details */}
        <div className="flex flex-col gap-2 mb-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-indigo-500 shrink-0" />
            <span>
              <strong>Schedule:</strong> {batch.timing || 'Sat, Mon, Wed (04:00 PM - 05:30 PM)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-emerald-500 shrink-0" />
            <span>
              <strong>Venue:</strong> {batch.room_number || 'Room 304 (Farmgate Campus)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <User size={15} className="text-amber-500 shrink-0" />
            <span>
              <strong>Instructor:</strong> {batch.assigned_teacher || 'Dr. Mahmudul Hasan'}
            </span>
          </div>
        </div>

        {/* Syllabus Progress */}
        <div className="mb-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            <span className="text-slate-600 dark:text-slate-400">Syllabus Covered</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: 'var(--brand-primary)' }}
            />
          </div>
        </div>
      </div>

      {/* Footer: Fee info & Quick Action Buttons */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Monthly Fee:</span>
          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            ৳ {batch.monthly_fee ? batch.monthly_fee.toLocaleString() : '2,500'} / mo
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(batch)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
            style={{
              color: 'var(--brand-primary)',
              border: '1px solid var(--brand-primary-subtle)',
            }}
          >
            <Info size={14} /> View Details
          </button>

          <button
            onClick={() => onRequestTransfer(batch)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            <RefreshCw size={14} /> Request Transfer
          </button>
        </div>
      </div>
    </motion.div>
  );
}
