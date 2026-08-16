'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Megaphone, Pin, Calendar, BellRing, Info, AlertTriangle } from 'lucide-react';

const mockNotices = [
  {
    id: 'not-01',
    title: 'Mid-Term Examination Schedule & Hall Guidelines Published',
    category: 'Examination',
    badgeVariant: 'warning' as const,
    pinned: true,
    date: '15 Aug 2026',
    publisher: 'Academic Controller Office',
    content:
      'All HSC Science 2026 batch students are advised to check their exam hall seating arrangements and download digital admit cards. Mobile phones and programmable devices are strictly prohibited in examination halls.',
  },
  {
    id: 'not-02',
    title: 'Special Extra Problem-Solving Class for Higher Mathematics',
    category: 'Academic',
    badgeVariant: 'info' as const,
    pinned: false,
    date: '14 Aug 2026',
    publisher: 'Department of Mathematics',
    content:
      'Prof. Tanvir Ahmed will conduct a 2-hour interactive calculus problem-solving session this Friday at 03:30 PM in Room 402 for students preparing for the upcoming mid-term exam.',
  },
  {
    id: 'not-03',
    title: 'Institutional Holiday on National Mourning Day',
    category: 'Holiday',
    badgeVariant: 'paid' as const,
    pinned: false,
    date: '10 Aug 2026',
    publisher: 'Administrative Secretariat',
    content:
      'The academy will remain closed on 15 August in observance of National Mourning Day. All regular coaching batches and lab sessions will resume on Sunday, 16 August according to standard timetables.',
  },
];

export default function NoticesPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="eyebrow">Announcements</div>
        <h1 className="page-title">Notice Board</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Official institutional circulars, academic notices, and schedule updates.
        </p>
      </div>

      {/* Notices List */}
      <div className="flex flex-col gap-4">
        {mockNotices.map((notice) => (
          <Card
            key={notice.id}
            className={`p-6 transition-all ${
              notice.pinned
                ? 'border-blue-200 dark:border-blue-900 bg-blue-50/20 dark:bg-blue-950/10'
                : ''
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                {notice.pinned && (
                  <span className="p-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400" title="Pinned Announcement">
                    <Pin size={14} className="rotate-45" />
                  </span>
                )}
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {notice.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={notice.badgeVariant}>{notice.category}</Badge>
              </div>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              {notice.content}
            </p>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
              <div className="flex items-center gap-1.5 font-mono">
                <Calendar size={13} />
                <span>Posted on {notice.date}</span>
              </div>
              <div>
                <span>Authority: <strong className="text-zinc-600 dark:text-zinc-300">{notice.publisher}</strong></span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
