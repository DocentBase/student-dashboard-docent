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
  Sparkles,
  FileText,
  Download,
  Users,
  ShieldCheck,
  ArrowRight,
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-slate-100 z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 p-2 rounded-2xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-6 pr-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-[11px] font-bold tracking-wide uppercase rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                {batch.coaching_center_name || 'Docent Science Academy'}
              </span>
              <span className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {batch.batch_code || batch.id}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {batch.name}
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Class Level: {batch.class_level || 'HSC 2nd Year'} • Student Roll ID: #2026-{batch.id.slice(0, 4)}
            </p>
          </div>

          {/* Overview Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400">
                <Clock size={16} /> Class Days & Timings
              </div>
              <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm">
                {batch.timing || 'Sat, Mon, Wed (04:00 PM - 05:30 PM)'}
              </p>
              <span className="text-[11px] text-slate-500">Duration: 90 Mins per session</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                <MapPin size={16} /> Campus Location
              </div>
              <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm">
                {batch.room_number || 'Room 304 (Farmgate Campus)'}
              </p>
              <span className="text-[11px] text-slate-500">Building B, 3rd Floor</span>
            </div>
          </div>

          {/* Instructor Box */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-lg flex items-center justify-center shadow-md shrink-0">
                {batch.assigned_teacher ? batch.assigned_teacher.charAt(0) : 'D'}
              </div>
              <div>
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                  Lead Instructor
                </span>
                <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  {batch.assigned_teacher || 'Dr. Mahmudul Hasan'}
                </h4>
                <p className="text-xs text-slate-500">Senior Faculty, Dept. of Physics</p>
              </div>
            </div>
            <Link
              href="/notes"
              onClick={onClose}
              className="py-2 px-3.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shadow-sm hover:bg-indigo-50 transition-all"
            >
              Class Notes
            </Link>
          </div>

          {/* Course Syllabus Checklist */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-600" /> Syllabus Coverage & Modules
              </h3>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {batch.progress_percentage || 50}% Completed
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {mockSyllabus.map((module, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs"
                >
                  <span
                    className={
                      module.completed
                        ? 'text-slate-900 dark:text-slate-100 font-semibold'
                        : 'text-slate-500 font-medium'
                    }
                  >
                    {module.title}
                  </span>
                  {module.completed ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                      <CheckCircle2 size={16} /> Done
                    </span>
                  ) : (
                    <span className="text-slate-400 font-semibold shrink-0">In Progress</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                onClose();
                onRequestTransfer(batch);
              }}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs font-bold border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all"
            >
              Request Schedule Transfer
            </button>

            <Link
              href="/routine"
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white text-center shadow-md shadow-indigo-500/20 transition-all"
            >
              Open Full Routine
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
