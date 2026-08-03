'use client';

import { motion } from 'framer-motion';
import { CoachingCenter } from '@/types';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  UserCheck,
  Calendar,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

interface CoachingCenterCardProps {
  center: CoachingCenter;
}

export function CoachingCenterCard({ center }: CoachingCenterCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="group relative rounded-3xl p-6 md:p-7 border transition-all flex flex-col justify-between overflow-hidden"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-default)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div>
        {/* Header Banner */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3.5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl text-white shadow-xl shadow-indigo-500/20 shrink-0"
              style={{
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
              }}
            >
              {center.code || 'DSA'}
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Verified Campus
                </span>
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                {center.name}
              </h3>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                {center.branch} Branch
              </p>
            </div>
          </div>
        </div>

        {/* Address & Hotline Info Box */}
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 mb-5">
          <div className="flex items-center gap-2.5">
            <MapPin size={15} className="text-rose-500 shrink-0" />
            <span className="font-medium">{center.address}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Phone size={15} className="text-blue-500 shrink-0" />
            <span className="font-medium">Campus Hotline: {center.contact_phone}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Mail size={15} className="text-amber-500 shrink-0" />
            <span className="font-medium">{center.contact_email}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <UserCheck size={15} className="text-emerald-500 shrink-0" />
            <span className="font-medium">Principal: {center.head_teacher}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3.5 p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 text-center mb-5">
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Enrolled Batches</p>
            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
              {center.enrolled_batches_count}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Active Subjects</p>
            <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-0.5">
              {center.total_subjects}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Quick Action Buttons */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <Link
          href={`tel:${center.contact_phone}`}
          className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-center text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20 active:scale-95"
        >
          Call Admin Hotline
        </Link>
        <Link
          href="/routine"
          className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
        >
          <Calendar size={14} /> Routine
        </Link>
      </div>
    </motion.div>
  );
}
