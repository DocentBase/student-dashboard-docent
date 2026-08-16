'use client';

import { Card } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { Trophy, Award, TrendingUp, BarChart3, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

const mockResults = [
  {
    id: 'res-01',
    examTitle: 'Physics Term Assessment 01',
    subject: 'Physics (Paper 1)',
    date: '12 Aug 2026',
    score: 46,
    total: 50,
    percentage: 92,
    grade: 'A+',
    classAverage: '38.4 / 50',
    rank: '3rd of 45',
  },
  {
    id: 'res-02',
    examTitle: 'Higher Math Calculus Quiz',
    subject: 'Higher Mathematics',
    date: '08 Aug 2026',
    score: 48,
    total: 50,
    percentage: 96,
    grade: 'A+',
    classAverage: '36.2 / 50',
    rank: '1st of 45',
  },
  {
    id: 'res-03',
    examTitle: 'Chemistry Chemical Kinetics Test',
    subject: 'Chemistry',
    date: '01 Aug 2026',
    score: 39,
    total: 50,
    percentage: 78,
    grade: 'A',
    classAverage: '34.0 / 50',
    rank: '8th of 45',
  },
  {
    id: 'res-04',
    examTitle: 'English Grammar & Comprehension',
    subject: 'English 1st Paper',
    date: '25 Jul 2026',
    score: 44,
    total: 50,
    percentage: 88,
    grade: 'A+',
    classAverage: '37.5 / 50',
    rank: '4th of 45',
  },
];

export default function ResultsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="eyebrow">Academic Standing</div>
        <h1 className="page-title">Results & Performance Analytics</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Term exam marks, grade sheets, percentile standing, and progress history.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="stat-grid">
        <StatCard
          label="Cumulative Grade"
          value="GPA 4.92"
          change={3.5}
          sublabel="Scale: 5.00 · Grade A+"
          icon={<Trophy size={18} />}
        />
        <StatCard
          label="Overall Average"
          value="88.5%"
          change={4.8}
          sublabel="Top 5% in cohort"
          icon={<Award size={18} />}
        />
        <StatCard
          label="Tests Evaluated"
          value="4 of 4"
          sublabel="100% submission rate"
          icon={<TrendingUp size={18} />}
        />
      </div>

      {/* Results Audit Table */}
      <Card className="card-flush">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Scorecard Ledger</span>
            <h3 className="section-title mt-0.5">Recent Examination Results</h3>
          </div>
          <span className="text-xs text-zinc-500 font-mono">Academic Term 2026</span>
        </div>

        <div className="table-container border-0 rounded-none">
          <table className="cockpit-table">
            <thead>
              <tr>
                <th>Exam Title</th>
                <th>Subject</th>
                <th>Date</th>
                <th className="text-right">Score</th>
                <th className="text-center">Grade</th>
                <th className="text-right">Cohort Average</th>
                <th className="text-right">Class Rank</th>
              </tr>
            </thead>
            <tbody>
              {mockResults.map((item) => (
                <tr key={item.id}>
                  <td className="font-semibold text-zinc-900 dark:text-zinc-100">{item.examTitle}</td>
                  <td className="text-xs text-zinc-500">{item.subject}</td>
                  <td className="text-xs text-zinc-400 font-mono">{item.date}</td>
                  <td className="text-right font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
                    {item.score} <span className="text-xs font-normal text-zinc-400">/ {item.total}</span>
                  </td>
                  <td className="text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {item.grade}
                    </span>
                  </td>
                  <td className="text-right text-xs text-zinc-500 font-mono">{item.classAverage}</td>
                  <td className="text-right text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {item.rank}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
