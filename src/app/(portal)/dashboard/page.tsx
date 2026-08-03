import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, FileText, ClipboardList, Trophy } from 'lucide-react';
import Link from 'next/link';
import { getCurrentStudent } from '@/lib/auth';

export default async function DashboardPage() {
  const student = await getCurrentStudent();
  const name = student?.first_name || 'Student';

  return (
    <div className="flex flex-col gap-6">
      <Card className="text-white" style={{ background: 'var(--brand-primary)' }}>
        <h2 className="text-2xl font-bold mb-1">Good morning, {name}</h2>
        <p className="opacity-90">Here is your summary for today.</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
        <StatCard title="Attendance" value="85%" trend="up" trendLabel="from last month" icon={<Calendar size={20} />} />
        <StatCard title="Pending Fees" value="৳ 0" trendLabel="All clear!" icon={<Trophy size={20} />} />
        <StatCard title="Next Exam" value="3 Days" trendLabel="Mid-Term Math" icon={<ClipboardList size={20} />} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
        <Link href="/routine" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', border: '1px solid var(--border-subtle)', borderRadius: '12px', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
          <Calendar size={24} style={{ marginBottom: '8px', color: 'var(--brand-primary)' }} />
          <span style={{ fontWeight: 500 }}>Routine</span>
        </Link>
        <Link href="/notes" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', border: '1px solid var(--border-subtle)', borderRadius: '12px', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
          <FileText size={24} style={{ marginBottom: '8px', color: 'var(--color-info)' }} />
          <span style={{ fontWeight: 500 }}>Notes</span>
        </Link>
        <Link href="/exams" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', border: '1px solid var(--border-subtle)', borderRadius: '12px', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
          <ClipboardList size={24} style={{ marginBottom: '8px', color: 'var(--color-warning)' }} />
          <span style={{ fontWeight: 500 }}>Exams</span>
        </Link>
        <Link href="/results" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', border: '1px solid var(--border-subtle)', borderRadius: '12px', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
          <Trophy size={24} style={{ marginBottom: '8px', color: 'var(--color-success)' }} />
          <span style={{ fontWeight: 500 }}>Results</span>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Upcoming Exams</h3>
            <Link href="/exams" style={{ fontSize: '14px', color: 'var(--brand-primary)' }}>View All</Link>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center p-4 border rounded-xl" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <p className="font-semibold">Math Mid-Term</p>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>10 Aug 2026, 10:00 AM</p>
              </div>
              <Badge variant="warning">Upcoming</Badge>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Latest Notices</h3>
            <Link href="/notices" style={{ fontSize: '14px', color: 'var(--brand-primary)' }}>View All</Link>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center p-4 border rounded-xl" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <p className="font-semibold">Holiday on 15 Aug</p>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>National Mourning Day</p>
              </div>
              <Badge variant="info">Holiday</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
