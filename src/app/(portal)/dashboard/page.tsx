import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { getCurrentStudent } from '@/lib/auth';
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  Megaphone,
  Trophy,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';

const quickActions = [
  {
    href: '/dashboard/routine',
    title: 'Routine',
    caption: 'Today at a glance',
    icon: Calendar,
    color: 'var(--brand-primary)',
    bg: 'var(--brand-primary-light)',
  },
  {
    href: '/dashboard/notes',
    title: 'Notes',
    caption: '2 new resources',
    icon: FileText,
    color: 'var(--color-info)',
    bg: 'var(--color-info-light)',
  },
  {
    href: '/dashboard/fees',
    title: 'Payments',
    caption: 'August tuition due',
    icon: Wallet,
    color: 'var(--color-warning)',
    bg: 'var(--color-warning-light)',
  },
  {
    href: '/dashboard/results',
    title: 'Results',
    caption: 'Latest marks',
    icon: Trophy,
    color: 'var(--color-success)',
    bg: 'var(--color-success-light)',
  },
];

export default async function DashboardPage() {
  const student = await getCurrentStudent();
  const name = student?.first_name || 'Student';

  return (
    <div className="flex flex-col gap-6">
      <section className="hero-card">
        <div className="hero-content">
          <div>
            <div className="eyebrow hero-eyebrow">Tuesday, 04 Aug 2026</div>
            <h1 className="hero-title">Good morning, {name}. Your study day is ready.</h1>
            <p className="hero-copy">
              Keep attendance healthy, review the Math exam plan, and clear your tuition before the
              bKash/Nagad deadline.
            </p>
          </div>

          <div className="hero-actions">
            <Link className="btn btn-light" href="/dashboard/routine">
              View routine <ArrowRight size={16} />
            </Link>
            <Link className="btn btn-glass" href="/dashboard/notes">
              Open study notes
            </Link>
          </div>

          <div className="hero-meta-grid">
            <div className="hero-meta">
              <span>Next class</span>
              <strong>Physics · 11:30 AM</strong>
            </div>
            <div className="hero-meta">
              <span>Attendance streak</span>
              <strong>12 days present</strong>
            </div>
            <div className="hero-meta">
              <span>Fee status</span>
              <strong>Due 10 Aug</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="stat-grid">
        <StatCard title="Attendance" value="85%" trend="up" trendLabel="3% better than last month" icon={<BarChart3 size={20} />} />
        <StatCard title="Pending Fees" value="৳ 5,500" trend="down" trendLabel="Due on 10 Aug 2026" icon={<Wallet size={20} />} />
        <StatCard title="Next Exam" value="6 days" trendLabel="Math Mid-Term" icon={<ClipboardList size={20} />} />
      </section>

      <section className="quick-grid">
        {quickActions.map((item) => {
          const Icon = item.icon;

          return (
            <Link className="quick-link" href={item.href} key={item.href}>
              <span className="quick-icon" style={{ background: item.bg, color: item.color }}>
                <Icon size={22} />
              </span>
              <span>
                <span className="quick-title">{item.title}</span>
                <span className="quick-caption">{item.caption}</span>
              </span>
            </Link>
          );
        })}
      </section>

      <section className="dashboard-grid">
        <Card>
          <div className="section-head">
            <div>
              <div className="eyebrow">Priority</div>
              <h2 className="section-title">Upcoming Exams</h2>
            </div>
            <Link className="section-link" href="/dashboard/exams">
              View all
            </Link>
          </div>
          <div className="list-stack">
            <div className="timeline-item">
              <div>
                <p className="timeline-title">Math Mid-Term</p>
                <p className="timeline-meta">10 Aug 2026 · 10:00 AM · Main Hall</p>
              </div>
              <Badge variant="warning">Upcoming</Badge>
            </div>
            <div className="timeline-item">
              <div>
                <p className="timeline-title">Physics Class Test</p>
                <p className="timeline-meta">17 Aug 2026 · 12:00 PM · Room 302</p>
              </div>
              <Badge variant="info">Scheduled</Badge>
            </div>
          </div>
        </Card>

        <Card>
          <div className="section-head">
            <div>
              <div className="eyebrow">Updates</div>
              <h2 className="section-title">Latest Notices</h2>
            </div>
            <Link className="section-link" href="/dashboard/notices">
              View all
            </Link>
          </div>
          <div className="list-stack">
            <div className="timeline-item">
              <div className="flex items-center gap-3">
                <span className="quick-icon" style={{ width: 38, height: 38, background: 'var(--color-info-light)', color: 'var(--color-info)' }}>
                  <Megaphone size={18} />
                </span>
                <div>
                  <p className="timeline-title">Holiday on 15 Aug</p>
                  <p className="timeline-meta">National Mourning Day notice published</p>
                </div>
              </div>
              <Badge variant="info">Holiday</Badge>
            </div>
            <div className="timeline-item">
              <div className="flex items-center gap-3">
                <span className="quick-icon" style={{ width: 38, height: 38, background: 'var(--color-success-light)', color: 'var(--color-success)' }}>
                  <CheckCircle2 size={18} />
                </span>
                <div>
                  <p className="timeline-title">New notes uploaded</p>
                  <p className="timeline-meta">Calculus and Mechanics PDFs are available</p>
                </div>
              </div>
              <Badge variant="success">New</Badge>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
