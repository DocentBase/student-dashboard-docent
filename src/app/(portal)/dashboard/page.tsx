import { Badge, StatusBadge } from '@/components/ui/Badge';
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
  BookOpen,
  Zap,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

const quickActions = [
  {
    href: '/dashboard/routine',
    title: 'Class Routine',
    caption: 'Today at a glance',
    icon: Calendar,
    color: '#2563eb',
    bg: '#eff6ff',
  },
  {
    href: '/dashboard/notes',
    title: 'Study Notes',
    caption: '4 active resources',
    icon: FileText,
    color: '#0284c7',
    bg: '#f0f9ff',
  },
  {
    href: '/dashboard/fees',
    title: 'Fees & Tuition',
    caption: 'August tuition due',
    icon: Wallet,
    color: '#d97706',
    bg: '#fffbeb',
  },
  {
    href: '/dashboard/results',
    title: 'Marks & Results',
    caption: 'Latest assessment',
    icon: Trophy,
    color: '#059669',
    bg: '#ecfdf5',
  },
];

export default async function DashboardPage() {
  const student = await getCurrentStudent();
  const name = student?.first_name || 'Student';

  return (
    <div className="flex flex-col gap-6">
      {/* Precision Cockpit Hero Banner */}
      <section className="hero-card">
        <div className="hero-content">
          <div>
            <div className="eyebrow hero-eyebrow">Academic Term 2026 · Active Cockpit</div>
            <h1 className="hero-title">Welcome back, {name}. Your schedule is synchronized.</h1>
            <p className="hero-copy">
              Maintain optimal class attendance, review the Higher Math mid-term syllabus scope, and verify your tuition status before the monthly deadline.
            </p>
          </div>

          <div className="hero-actions">
            <Link className="btn btn-light" href="/dashboard/routine">
              <span>View Today's Routine</span>
              <ArrowRight size={15} />
            </Link>
            <Link className="btn btn-glass" href="/dashboard/notes">
              <span>Access Study Notes</span>
            </Link>
          </div>

          <div className="hero-meta-grid">
            <div className="hero-meta">
              <span>Upcoming Class</span>
              <strong>Higher Mathematics · 10:00 AM</strong>
            </div>
            <div className="hero-meta">
              <span>Attendance Streak</span>
              <strong>14 Consecutive Days</strong>
            </div>
            <div className="hero-meta">
              <span>Current Status</span>
              <strong>Term Enrolled · Good Standing</strong>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Stats Grid */}
      <section className="stat-grid">
        <StatCard
          label="Attendance Rate"
          value="87.6%"
          change={2.4}
          sublabel="3% higher than cohort"
          icon={<BarChart3 size={18} />}
        />
        <StatCard
          label="Pending Tuition"
          value="৳ 5,500"
          trend="down"
          trendLabel="Due on 25 Aug 2026"
          icon={<Wallet size={18} />}
        />
        <StatCard
          label="Next Assessment"
          value="7 Days"
          sublabel="Math Mid-Term · Hall A"
          icon={<ClipboardList size={18} />}
        />
      </section>

      {/* Quick Action Navigation Grid */}
      <section className="quick-grid">
        {quickActions.map((item) => {
          const Icon = item.icon;

          return (
            <Link className="quick-link" href={item.href} key={item.href}>
              <span className="quick-icon" style={{ background: item.bg, color: item.color }}>
                <Icon size={20} />
              </span>
              <div>
                <span className="quick-title">{item.title}</span>
                <span className="quick-caption">{item.caption}</span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Main Dual Grid */}
      <section className="dashboard-grid">
        {/* Upcoming Exams Card */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="section-head">
              <div>
                <div className="eyebrow">Priority Assessments</div>
                <h2 className="section-title">Upcoming Exams & Tests</h2>
              </div>
              <Link className="section-link" href="/dashboard/exams">
                <span>View all</span>
                <ArrowRight size={13} />
              </Link>
            </div>
            <div className="list-stack">
              <div className="timeline-item">
                <div>
                  <p className="timeline-title">HSC Higher Math Mid-Term</p>
                  <p className="timeline-meta">24 Aug 2026 · 10:00 AM · Hall A</p>
                </div>
                <StatusBadge status="PENDING" label="Scheduled" />
              </div>
              <div className="timeline-item">
                <div>
                  <p className="timeline-title">Physics Mechanics Class Test</p>
                  <p className="timeline-meta">28 Aug 2026 · 11:00 AM · Room 304</p>
                </div>
                <StatusBadge status="DRAFT" label="Upcoming" />
              </div>
            </div>
          </div>
        </Card>

        {/* Latest Notices Card */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="section-head">
              <div>
                <div className="eyebrow">Bulletin</div>
                <h2 className="section-title">Latest Announcements</h2>
              </div>
              <Link className="section-link" href="/dashboard/notices">
                <span>View all</span>
                <ArrowRight size={13} />
              </Link>
            </div>
            <div className="list-stack">
              <div className="timeline-item">
                <div className="flex items-center gap-3">
                  <span className="quick-icon" style={{ width: 36, height: 36, background: '#eff6ff', color: '#2563eb' }}>
                    <Megaphone size={16} />
                  </span>
                  <div>
                    <p className="timeline-title">Mid-Term Exam Guidelines</p>
                    <p className="timeline-meta">Seat plan and admit slip notice issued</p>
                  </div>
                </div>
                <Badge variant="warning">Exam</Badge>
              </div>
              <div className="timeline-item">
                <div className="flex items-center gap-3">
                  <span className="quick-icon" style={{ width: 36, height: 36, background: '#ecfdf5', color: '#059669' }}>
                    <CheckCircle2 size={16} />
                  </span>
                  <div>
                    <p className="timeline-title">Calculus & Mechanics Notes Uploaded</p>
                    <p className="timeline-meta">Download PDF materials in study hub</p>
                  </div>
                </div>
                <Badge variant="success">New</Badge>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
