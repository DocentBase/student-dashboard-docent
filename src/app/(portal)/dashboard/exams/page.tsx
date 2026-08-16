'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { Calendar, Clock, MapPin, ClipboardList, BookOpen, AlertCircle, FileCheck, CheckCircle2 } from 'lucide-react';

const mockExams = [
  {
    id: 'ex-01',
    title: 'HSC Higher Math Mid-Term',
    subject: 'Higher Mathematics (Paper 1)',
    date: '24 Aug 2026',
    time: '10:00 AM - 12:30 PM',
    duration: '2h 30m',
    venue: 'Auditorium Hall A (Desk 42)',
    totalMarks: 100,
    status: 'PENDING' as const,
    syllabus: 'Calculus (Differentiation & Integration), Matrix, Vectors',
  },
  {
    id: 'ex-02',
    title: 'Physics Mechanics & Waves Test',
    subject: 'Physics (Paper 1)',
    date: '28 Aug 2026',
    time: '11:00 AM - 12:30 PM',
    duration: '1h 30m',
    venue: 'Science Building Room 304',
    totalMarks: 50,
    status: 'PENDING' as const,
    syllabus: 'Newtonian Mechanics, Work Power & Energy, Simple Harmonic Motion',
  },
  {
    id: 'ex-03',
    title: 'Chemistry Organic Reactions Assessment',
    subject: 'Chemistry (Paper 2)',
    date: '02 Sep 2026',
    time: '09:30 AM - 11:30 AM',
    duration: '2h 00m',
    venue: 'Chemistry Lab Annex',
    totalMarks: 75,
    status: 'DRAFT' as const,
    syllabus: 'Hydrocarbons, Alkyl Halides, Carbonyl Compounds',
  },
];

export default function ExamsPage() {
  const [selectedExam, setSelectedExam] = useState<typeof mockExams[0] | null>(null);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="eyebrow">Assessments & Schedules</div>
        <h1 className="page-title">Exams & Term Tests</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Official timetable, exam halls, syllabus outlines, and admit card verification.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="stat-grid">
        <StatCard
          label="Next Scheduled Exam"
          value="7 Days"
          sublabel="Math Mid-Term · 24 Aug"
          icon={<ClipboardList size={18} />}
        />
        <StatCard
          label="Total Term Exams"
          value="4 Tests"
          trend="neutral"
          trendLabel="2 Completed · 2 Pending"
          icon={<Calendar size={18} />}
        />
        <StatCard
          label="Current Average"
          value="88.5%"
          change={4.2}
          sublabel="Top decile in cohort"
          icon={<FileCheck size={18} />}
        />
      </div>

      {/* Exam List */}
      <div className="flex flex-col gap-4">
        {mockExams.map((exam) => (
          <Card key={exam.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-5">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1.5">
                <h3 className="section-title text-base">{exam.title}</h3>
                <StatusBadge status={exam.status} label={exam.status === 'PENDING' ? 'Scheduled' : 'Upcoming'} />
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-3">
                {exam.subject} · Total Marks: {exam.totalMarks}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-zinc-400" />
                  <span className="font-mono font-medium">{exam.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-zinc-400" />
                  <span className="font-mono">{exam.time} ({exam.duration})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-zinc-400" />
                  <span>{exam.venue}</span>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                <BookOpen size={14} className="text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Syllabus Scope:</strong> {exam.syllabus}</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-100 dark:border-zinc-800">
              <button
                onClick={() => setSelectedExam(exam)}
                className="btn btn-secondary text-xs h-9 px-4 w-full sm:w-auto"
              >
                View Details
              </button>
              <button className="btn btn-primary text-xs h-9 px-4 w-full sm:w-auto">
                Download Admit Card
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Exam Blueprint</span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{selectedExam.title}</h3>
              </div>
              <StatusBadge status={selectedExam.status} />
            </div>

            <div className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400 my-4">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <p className="font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Time & Venue</p>
                <p>{selectedExam.date} · {selectedExam.time}</p>
                <p>{selectedExam.venue}</p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <p className="font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Curriculum Details</p>
                <p>{selectedExam.syllabus}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setSelectedExam(null)} className="btn btn-secondary text-xs">
                Close
              </button>
              <button onClick={() => setSelectedExam(null)} className="btn btn-primary text-xs">
                Print Admit Slip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
