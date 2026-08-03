'use client';
import { motion } from 'framer-motion';
import { CoachingCenter } from '@/types';
import { Building2, MapPin, Phone, Mail, UserCheck, BookOpen, ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';

interface CoachingCenterCardProps {
  center: CoachingCenter;
}

export function CoachingCenterCard({ center }: CoachingCenterCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="rounded-2xl p-6 border flex flex-col justify-between"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-md shrink-0"
              style={{
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
              }}
            >
              {center.code || 'DSA'}
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                {center.name}
              </h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                {center.branch} Branch
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
            Enrolled
          </span>
        </div>

        {/* Center Details */}
        <div className="flex flex-col gap-2.5 mb-5 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-rose-500 shrink-0" />
            <span>{center.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={15} className="text-blue-500 shrink-0" />
            <span>Hotline: {center.contact_phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={15} className="text-amber-500 shrink-0" />
            <span>{center.contact_email}</span>
          </div>

          <div className="flex items-center gap-2">
            <UserCheck size={15} className="text-emerald-500 shrink-0" />
            <span>Campus Principal: {center.head_teacher}</span>
          </div>
        </div>

        {/* Statistics Pill */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-center mb-4">
          <div>
            <p className="text-xs text-slate-500">Active Batches</p>
            <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {center.enrolled_batches_count}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Subjects</p>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {center.total_subjects}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <Link
          href={`tel:${center.contact_phone}`}
          className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100"
        >
          Call Support
        </Link>
        <Link
          href="/routine"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Calendar size={14} /> Routine
        </Link>
      </div>
    </motion.div>
  );
}
