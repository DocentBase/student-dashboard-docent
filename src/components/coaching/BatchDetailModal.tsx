'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Batch } from '@/types';
import {
  X,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  BookOpen,
  Calendar,
  AlertCircle,
  FileText,
  Download,
  Users,
} from 'lucide-react';
import Link from 'next/link';

interface BatchDetailModalProps {
  batch: Batch | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestTransfer: (batch: Batch) => void;
}

export function BatchDetailModal({
  batch,
  isOpen,
  onClose,
  onRequestTransfer,
}: BatchDetailModalProps) {
  if (!isOpen || !batch) return null;

  const mockSyllabus = [
    { title: 'Chapter 01: Vector Mechanics & Calculus Applications', completed: true },
    { title: 'Chapter 02: Newtonian Mechanics & Work-Energy Theorem', completed: true },
    { title: 'Chapter 03: Gravitation, Planetary Motion & Satellite Dynamics', completed: true },
    { title: 'Chapter 04: Mechanical Properties of Matter & Fluid Statics', completed: false },
    { title: 'Chapter 05: Simple Harmonic Motion & Wave Optics', completed: false },
    { title: 'Chapter 06: Thermodynamics & Heat Engine Cycle', completed: false },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border bg-white dark:bg-slate-900 shadow-2xl p-6 text-slate-900 dark:text-slate-100 z-10"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-6 pr-8">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2"
              style={{
                background: 'var(--brand-primary-light)',
                color: 'var(--brand-primary)',
              }}
            >
              {batch.coaching_center_name || 'Docent Science Academy'}
            </span>
            <h2 className="text-2xl font-bold tracking-tight mb-1">
              {batch.name}
            </h2>
            <p className="text-xs font-mono text-slate-500">
              Batch Code: {batch.batch_code || batch.id} • Class Roll ID: #2026-{batch.id.slice(0, 4)}
            </p>
          </div>

          {/* Grid Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400">
                <Clock size={16} /> Class Schedule & Timing
              </div>
              <p className="text-slate-700 dark:text-slate-200">
                {batch.timing || 'Sat, Mon, Wed (04:00 PM - 05:30 PM)'}
              </p>
              <span className="text-[11px] text-slate-500">Duration: 90 Minutes per class</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                <MapPin size={16} /> Campus Location / Classroom
              </div>
              <p className="text-slate-700 dark:text-slate-200">
                {batch.room_number || 'Room 304, Farmgate Campus'}
              </p>
              <span className="text-[11px] text-slate-500">Building B, 3rd Floor</span>
            </div>
          </div>

          {/* Teacher Profile */}
          <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950/60 bg-indigo-50/50 dark:bg-indigo-950/20 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md shrink-0">
                {batch.assigned_teacher ? batch.assigned_teacher.charAt(0) : 'M'}
              </div>
              <div>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Lead Instructor</p>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {batch.assigned_teacher || 'Dr. Mahmudul Hasan'}
                </h4>
                <p className="text-[11px] text-slate-500">Senior Faculty, Dept. of Physics</p>
              </div>
            </div>
            <Link
              href="/notes"
              className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shadow-sm"
            >
              Class Notes
            </Link>
          </div>

          {/* Course Syllabus & Modules */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <BookOpen size={16} className="text-indigo-500" /> Syllabus Coverage & Modules
              </h3>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                {batch.progress_percentage || 50}% Completed
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {mockSyllabus.map((module, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/40 text-xs"
                >
                  <span className={module.completed ? 'text-slate-800 dark:text-slate-200 font-medium' : 'text-slate-500'}>
                    {module.title}
                  </span>
                  {module.completed ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                      <CheckCircle2 size={15} /> Completed
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium shrink-0">In Progress</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                onClose();
                onRequestTransfer(batch);
              }}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs font-semibold transition-all border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
            >
              Request Schedule Transfer
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                href="/routine"
                onClick={onClose}
                className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-semibold transition-all bg-indigo-600 hover:bg-indigo-700 text-white text-center shadow-md"
              >
                Open Full Routine
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
