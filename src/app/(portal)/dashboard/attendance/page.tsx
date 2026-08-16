import { Card } from '@/components/ui/Card';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/Badge';
import { CheckCircle2, Clock, XCircle, Calendar, AlertCircle } from 'lucide-react';

const mockSubjectAttendance = [
  { subject: 'Higher Mathematics', present: 28, total: 30, percentage: 93, status: 'healthy' },
  { subject: 'Physics (Theory & Lab)', present: 24, total: 28, percentage: 86, status: 'healthy' },
  { subject: 'Chemistry', present: 22, total: 26, percentage: 85, status: 'healthy' },
  { subject: 'Biology', present: 19, total: 24, percentage: 79, status: 'warning' },
  { subject: 'English 1st Paper', present: 25, total: 26, percentage: 96, status: 'healthy' },
];

const mockRecentLogs = [
  { date: '14 Aug 2026', subject: 'Higher Math', time: '10:00 AM - 11:30 AM', teacher: 'Prof. Tanvir Ahmed', status: 'PRESENT' as const },
  { date: '13 Aug 2026', subject: 'Physics Lab', time: '02:00 PM - 03:30 PM', teacher: 'Dr. Mahmudul Hasan', status: 'PRESENT' as const },
  { date: '12 Aug 2026', subject: 'Biology', time: '11:45 AM - 01:15 PM', teacher: 'Dr. Nusrat Jahan', status: 'LATE' as const },
  { date: '10 Aug 2026', subject: 'Chemistry', time: '09:00 AM - 10:30 AM', teacher: 'Engr. Rafiqul Islam', status: 'PRESENT' as const },
  { date: '08 Aug 2026', subject: 'English', time: '03:45 PM - 05:00 PM', teacher: 'Ms. Farhana Haque', status: 'ABSENT' as const },
];

export default function AttendancePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="eyebrow">Academic Records</div>
          <h1 className="page-title">Attendance Cockpit</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Real-time biometric and faculty attendance tracking for Academic Year 2026.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="stat-grid">
        <StatCard
          label="Cumulative Attendance"
          value="87.6%"
          change={2.4}
          sublabel="Target: 80% mandatory"
          icon={<CheckCircle2 size={18} />}
        />
        <StatCard
          label="Classes Attended"
          value="118 / 134"
          trend="up"
          trendLabel="16 missed sessions"
          icon={<Calendar size={18} />}
        />
        <StatCard
          label="Consecutive Streak"
          value="14 Days"
          trend="up"
          trendLabel="Best: 22 days"
          icon={<Clock size={18} />}
        />
      </div>

      {/* Detailed Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ring Card */}
        <Card className="flex flex-col items-center justify-center text-center p-6">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-6">
            Overall Compliance
          </span>
          <div className="relative my-2">
            <ProgressRing radius={65} stroke={10} progress={87.6} color="var(--primary)" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 tabular-nums">
                88%
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 uppercase">Compliant</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="text-zinc-600 dark:text-zinc-400">118 Present</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-zinc-600 dark:text-zinc-400">16 Absent</span>
            </div>
          </div>
        </Card>

        {/* Subject Breakdown */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Subject Distribution</span>
                <h3 className="section-title mt-0.5">Subject Attendance Breakdown</h3>
              </div>
              <span className="text-xs text-zinc-400 font-mono">Min req: 75%</span>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              {mockSubjectAttendance.map((item) => (
                <div key={item.subject}>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{item.subject}</span>
                    <span className="text-zinc-500 tabular-nums">
                      {item.present}/{item.total} classes ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.percentage >= 85
                          ? 'bg-blue-600'
                          : item.percentage >= 75
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2 text-xs text-zinc-400">
            <AlertCircle size={14} className="text-amber-500" />
            <span>Biology attendance is near the minimum threshold (79%). Regular participation recommended.</span>
          </div>
        </Card>
      </div>

      {/* Attendance Log Table */}
      <Card className="card-flush">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Audit Trail</span>
            <h3 className="section-title mt-0.5">Recent Class Logs</h3>
          </div>
          <span className="text-xs text-zinc-500">Showing last 5 sessions</span>
        </div>

        <div className="table-container border-0 rounded-none">
          <table className="cockpit-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Schedule</th>
                <th>Faculty</th>
                <th className="text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentLogs.map((log, index) => (
                <tr key={index}>
                  <td className="font-medium text-xs font-mono">{log.date}</td>
                  <td className="font-semibold">{log.subject}</td>
                  <td className="text-zinc-500 text-xs font-mono">{log.time}</td>
                  <td className="text-zinc-600 dark:text-zinc-400 text-xs">{log.teacher}</td>
                  <td className="text-right">
                    <StatusBadge status={log.status} />
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
