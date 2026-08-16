'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Clock, MapPin, User, ChevronRight } from 'lucide-react';

const mockWeeklyRoutine: Record<string, Array<{ time: string; subject: string; teacher: string; room: string; type: string }>> = {
  Saturday: [
    { time: '09:00 AM - 10:30 AM', subject: 'Higher Mathematics', teacher: 'Prof. Tanvir Ahmed', room: 'Room 402', type: 'Lecture' },
    { time: '11:00 AM - 12:30 PM', subject: 'Physics (Theory)', teacher: 'Dr. Mahmudul Hasan', room: 'Room 304', type: 'Lecture' },
    { time: '02:00 PM - 04:00 PM', subject: 'Physics Lab Session', teacher: 'Dr. Mahmudul Hasan', room: 'Lab A', type: 'Practical' },
  ],
  Sunday: [
    { time: '09:00 AM - 10:30 AM', subject: 'Chemistry (Organic)', teacher: 'Engr. Rafiqul Islam', room: 'Room 301', type: 'Lecture' },
    { time: '11:00 AM - 12:30 PM', subject: 'Biology', teacher: 'Dr. Nusrat Jahan', room: 'Room 205', type: 'Lecture' },
  ],
  Monday: [
    { time: '09:00 AM - 10:30 AM', subject: 'Higher Mathematics', teacher: 'Prof. Tanvir Ahmed', room: 'Room 402', type: 'Problem Solving' },
    { time: '11:00 AM - 12:30 PM', subject: 'English 1st Paper', teacher: 'Ms. Farhana Haque', room: 'Room 102', type: 'Interactive' },
  ],
  Tuesday: [
    { time: '09:00 AM - 10:30 AM', subject: 'Physics (Mechanics)', teacher: 'Dr. Mahmudul Hasan', room: 'Room 304', type: 'Lecture' },
    { time: '11:00 AM - 12:30 PM', subject: 'Chemistry Lab', teacher: 'Engr. Rafiqul Islam', room: 'Chem Lab 2', type: 'Practical' },
  ],
  Wednesday: [
    { time: '09:00 AM - 10:30 AM', subject: 'Higher Mathematics (Calculus)', teacher: 'Prof. Tanvir Ahmed', room: 'Room 402', type: 'Lecture' },
    { time: '11:00 AM - 12:30 PM', subject: 'Biology Discussion', teacher: 'Dr. Nusrat Jahan', room: 'Room 205', type: 'Lecture' },
  ],
  Thursday: [
    { time: '09:00 AM - 10:30 AM', subject: 'Weekly Model Test', teacher: 'Faculty Proctor Team', room: 'Auditorium Hall', type: 'Assessment' },
  ],
};

const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

export default function RoutinePage() {
  const [activeDay, setActiveDay] = useState('Saturday');

  const currentSchedule = mockWeeklyRoutine[activeDay] || [];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="eyebrow">Academic Schedule</div>
        <h1 className="page-title">Weekly Class Routine</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Faculty class schedule, lecture rooms, laboratory sessions, and weekly test slots.
        </p>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeDay === day
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Table / Cards */}
      <div className="flex flex-col gap-3">
        {currentSchedule.map((slot, idx) => (
          <Card key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{slot.subject}</h3>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                    {slot.type}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <User size={13} className="text-zinc-400" />
                    {slot.teacher}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-zinc-400" />
                    {slot.room}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-100 dark:border-zinc-800">
              <span className="font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                {slot.time}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
