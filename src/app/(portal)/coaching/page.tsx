'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Batch, CoachingCenter } from '@/types';
import { CoachingHeader } from '@/components/coaching/CoachingHeader';
import { BatchCard } from '@/components/coaching/BatchCard';
import { CoachingCenterCard } from '@/components/coaching/CoachingCenterCard';
import { BatchDetailModal } from '@/components/coaching/BatchDetailModal';
import { BatchTransferModal } from '@/components/coaching/BatchTransferModal';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  GraduationCap,
  Building2,
  BookOpen,
  PlusCircle,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

// Mock Data for Enrolled Batches
const INITIAL_BATCHES: Batch[] = [
  {
    id: 'batch-001',
    organization_id: 'org-docent-01',
    name: 'HSC Physics 2026 - Regular Batch 04',
    batch_code: 'PHY-2026-B04',
    coaching_center_id: 'center-01',
    coaching_center_name: 'Docent Science Academy (Farmgate)',
    class_level: 'HSC 2nd Year',
    timing: 'Sat, Mon, Wed (04:00 PM - 05:30 PM)',
    days_schedule: ['Saturday', 'Monday', 'Wednesday'],
    room_number: 'Room 304 (Farmgate Main Campus)',
    assigned_teacher: 'Dr. Mahmudul Hasan (PhD, BUET)',
    monthly_fee: 2500,
    progress_percentage: 68,
    total_students: 45,
    status: 'active',
    enrolled_date: '10 Jan 2026',
  },
  {
    id: 'batch-002',
    organization_id: 'org-docent-01',
    name: 'HSC Higher Math - Advanced Problem Solving',
    batch_code: 'MATH-2026-B02',
    coaching_center_id: 'center-01',
    coaching_center_name: 'Docent Science Academy (Farmgate)',
    class_level: 'HSC 2nd Year',
    timing: 'Sun, Tue, Thu (05:30 PM - 07:00 PM)',
    days_schedule: ['Sunday', 'Tuesday', 'Thursday'],
    room_number: 'Room 402 (Farmgate Annex)',
    assigned_teacher: 'Prof. Tanvir Ahmed',
    monthly_fee: 2800,
    progress_percentage: 52,
    total_students: 40,
    status: 'active',
    enrolled_date: '15 Jan 2026',
  },
  {
    id: 'batch-003',
    organization_id: 'org-docent-02',
    name: 'Medical Chemistry Target 2026',
    batch_code: 'CHEM-MED-01',
    coaching_center_id: 'center-02',
    coaching_center_name: 'Docent Medical & Dental Care (Uttara)',
    class_level: 'Medical Admission',
    timing: 'Sat, Mon, Wed (08:00 AM - 10:00 AM)',
    days_schedule: ['Saturday', 'Monday', 'Wednesday'],
    room_number: 'Hall Room A (Uttara Branch)',
    assigned_teacher: 'Dr. Nusrat Jahan (DMC)',
    monthly_fee: 3200,
    progress_percentage: 35,
    total_students: 55,
    status: 'upcoming',
    enrolled_date: '01 Feb 2026',
  },
  {
    id: 'batch-004',
    organization_id: 'org-docent-01',
    name: 'HSC Physics 1st Paper Crash Revision',
    batch_code: 'PHY-CRASH-01',
    coaching_center_id: 'center-01',
    coaching_center_name: 'Docent Science Academy (Farmgate)',
    class_level: 'HSC 1st Year',
    timing: 'Friday Special (09:00 AM - 12:00 PM)',
    days_schedule: ['Friday'],
    room_number: 'Auditorium 1',
    assigned_teacher: 'Dr. Mahmudul Hasan',
    monthly_fee: 1800,
    progress_percentage: 100,
    total_students: 60,
    status: 'completed',
    enrolled_date: '01 Nov 2025',
  },
];

// Mock Data for Enrolled Coaching Centers
const INITIAL_CENTERS: CoachingCenter[] = [
  {
    id: 'center-01',
    name: 'Docent Science Academy',
    code: 'DSA',
    branch: 'Farmgate Main Campus',
    address: '42/A Green Road, Farmgate, Dhaka 1215',
    contact_phone: '+880 1711-223344',
    contact_email: 'farmgate@docentbase.edu.bd',
    head_teacher: 'Engr. Rafiqul Islam',
    enrolled_batches_count: 3,
    total_subjects: 4,
    established_year: '2018',
  },
  {
    id: 'center-02',
    name: 'Docent Medical & Dental Care',
    code: 'DMC',
    branch: 'Uttara Sector 4 Branch',
    address: 'House 12, Road 7, Sector 4, Uttara, Dhaka',
    contact_phone: '+880 1822-998877',
    contact_email: 'uttara@docentbase.edu.bd',
    head_teacher: 'Dr. Farhana Rahman (DMC)',
    enrolled_batches_count: 1,
    total_subjects: 2,
    established_year: '2020',
  },
];

export default function CoachingPage() {
  const [activeTab, setActiveTab] = useState<'batches' | 'centers' | 'browse'>('batches');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [selectedDetailBatch, setSelectedDetailBatch] = useState<Batch | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [selectedTransferBatch, setSelectedTransferBatch] = useState<Batch | null>(null);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  // Filter Batches
  const filteredBatches = INITIAL_BATCHES.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.coaching_center_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.assigned_teacher?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.batch_code?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedFilter === 'all' || b.status === selectedFilter;

    return matchesSearch && matchesStatus;
  });

  const activeBatchesCount = INITIAL_BATCHES.filter((b) => b.status === 'active').length;
  const totalWeeklyHours = 12; // Approx weekly class hours

  const handleOpenDetails = (batch: Batch) => {
    setSelectedDetailBatch(batch);
    setIsDetailOpen(true);
  };

  const handleOpenTransfer = (batch: Batch) => {
    setSelectedTransferBatch(batch);
    setIsTransferOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Top Header Banner & Global Controls */}
      <CoachingHeader
        activeBatchesCount={activeBatchesCount}
        centersCount={INITIAL_CENTERS.length}
        totalHoursPerWeek={totalWeeklyHours}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {/* Main Tab Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab('batches')}
          className={`pb-3 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'batches'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <GraduationCap size={18} /> Enrolled Batches ({filteredBatches.length})
        </button>

        <button
          onClick={() => setActiveTab('centers')}
          className={`pb-3 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'centers'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Building2 size={18} /> Coaching Institutes ({INITIAL_CENTERS.length})
        </button>

        <button
          onClick={() => setActiveTab('browse')}
          className={`pb-3 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'browse'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles size={18} /> Available Batches
        </button>
      </div>

      {/* Tab 1: Enrolled Batches Grid */}
      {activeTab === 'batches' && (
        <>
          {filteredBatches.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredBatches.map((batch) => (
                <BatchCard
                  key={batch.id}
                  batch={batch}
                  onViewDetails={handleOpenDetails}
                  onRequestTransfer={handleOpenTransfer}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState
              icon={<GraduationCap size={40} />}
              title="No Batches Found"
              description="No coaching batches matched your search query or filter selection."
            />
          )}
        </>
      )}

      {/* Tab 2: Enrolled Coaching Centers */}
      {activeTab === 'centers' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {INITIAL_CENTERS.map((center) => (
            <CoachingCenterCard key={center.id} center={center} />
          ))}
        </motion.div>
      )}

      {/* Tab 3: Available / Upcoming Batches */}
      {activeTab === 'browse' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 border bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 flex flex-col gap-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                Explore Upcoming Coaching Batches
              </h3>
              <p className="text-xs text-slate-500">
                Apply for additional subject modules or upgrade to model-test admission batches.
              </p>
            </div>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              New Admissions Open
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  Docent Science Academy
                </span>
                <h4 className="font-bold text-base mt-1">HSC ICT Masterclass 2026 Batch 01</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Complete C-Programming, HTML & Digital Logic syllabus coverage with live lab practices.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t text-xs">
                <span className="font-bold text-slate-900 dark:text-slate-100">৳ 2,000 / month</span>
                <button
                  onClick={() => alert('Admission request sent to campus admin!')}
                  className="py-1.5 px-3 rounded-lg bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition-all"
                >
                  Enroll Request
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                  Docent Engineering Care
                </span>
                <h4 className="font-bold text-base mt-1">BUET Special Math & Physics Advance</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Focused engineering admission problem-solving batch for top aspirants.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t text-xs">
                <span className="font-bold text-slate-900 dark:text-slate-100">৳ 3,500 / month</span>
                <button
                  onClick={() => alert('Admission request sent to campus admin!')}
                  className="py-1.5 px-3 rounded-lg bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition-all"
                >
                  Enroll Request
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Modals */}
      <BatchDetailModal
        batch={selectedDetailBatch}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onRequestTransfer={handleOpenTransfer}
      />

      <BatchTransferModal
        batch={selectedTransferBatch}
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
      />
    </div>
  );
}
