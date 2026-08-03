'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Flame,
  ArrowRight,
} from 'lucide-react';

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
    head_teacher: 'Engr. Rafiqul Islam (BUET)',
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
  const totalWeeklyHours = 12;

  const handleOpenDetails = (batch: Batch) => {
    setSelectedDetailBatch(batch);
    setIsDetailOpen(true);
  };

  const handleOpenTransfer = (batch: Batch) => {
    setSelectedTransferBatch(batch);
    setIsTransferOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 pb-16 max-w-7xl mx-auto">
      {/* Top Header Banner & Search Controls */}
      <CoachingHeader
        activeBatchesCount={activeBatchesCount}
        centersCount={INITIAL_CENTERS.length}
        totalHoursPerWeek={totalWeeklyHours}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {/* Main Glass Navigation Tabs */}
      <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-start gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('batches')}
          className={`relative px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeTab === 'batches'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <GraduationCap size={18} /> Enrolled Batches ({filteredBatches.length})
        </button>

        <button
          onClick={() => setActiveTab('centers')}
          className={`relative px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeTab === 'centers'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Building2 size={18} /> Coaching Institutes ({INITIAL_CENTERS.length})
        </button>

        <button
          onClick={() => setActiveTab('browse')}
          className={`relative px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeTab === 'browse'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Sparkles size={18} className="text-amber-500" /> Browse New Batches
        </button>
      </div>

      {/* Tab 1: Enrolled Batches Grid */}
      {activeTab === 'batches' && (
        <AnimatePresence mode="wait">
          {filteredBatches.length > 0 ? (
            <motion.div
              key="batches-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
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
              icon={<GraduationCap size={44} className="text-indigo-500" />}
              title="No Batches Match Your Query"
              description="Try tweaking your search term or select 'All Batches' filter pill above."
            />
          )}
        </AnimatePresence>
      )}

      {/* Tab 2: Enrolled Coaching Centers */}
      {activeTab === 'centers' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl p-6 sm:p-8 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame size={18} className="text-amber-500" />
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                  New Semester Admissions Open
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                Explore Available Coaching Batches
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Enroll in specialized problem solving, model tests, or medical admission crash courses.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Course 1 */}
            <div className="p-6 rounded-2xl border bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-4 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Docent Science Academy
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                    6 Seats Remaining
                  </span>
                </div>
                <h4 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
                  HSC ICT Masterclass 2026 Batch 01
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Complete C-Programming, HTML, Database Management Systems & Digital Logic with hands-on lab practice.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">Tuition Fee</p>
                  <p className="text-base font-extrabold text-slate-900 dark:text-slate-100">৳ 2,000 / mo</p>
                </div>
                <button
                  onClick={() => alert('Enrollment application sent to campus coordinator!')}
                  className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all active:scale-95"
                >
                  Request Admission
                </button>
              </div>
            </div>

            {/* Course 2 */}
            <div className="p-6 rounded-2xl border bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-4 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                    Docent Engineering Care
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                    Early Bird Open
                  </span>
                </div>
                <h4 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
                  BUET Engineering Math & Physics Special
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Advanced engineering problem solving, previous BUET question analysis, and speed calculation drills.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">Tuition Fee</p>
                  <p className="text-base font-extrabold text-slate-900 dark:text-slate-100">৳ 3,500 / mo</p>
                </div>
                <button
                  onClick={() => alert('Enrollment application sent to campus coordinator!')}
                  className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all active:scale-95"
                >
                  Request Admission
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Interactive Modals */}
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
