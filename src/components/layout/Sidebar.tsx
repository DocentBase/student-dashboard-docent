'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  GraduationCap,
  Home,
  Megaphone,
  Settings,
  Trophy,
  User,
  Wallet,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const primaryLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/coaching', label: 'Coaching', icon: GraduationCap },
  { href: '/dashboard/attendance', label: 'Attendance', icon: BarChart3 },
  { href: '/dashboard/fees', label: 'Fees & Tuition', icon: Wallet },
  { href: '/dashboard/notes', label: 'Study Notes', icon: FileText },
  { href: '/dashboard/exams', label: 'Exams & Tests', icon: ClipboardList },
  { href: '/dashboard/results', label: 'Results & Marks', icon: Trophy },
  { href: '/dashboard/routine', label: 'Class Routine', icon: Calendar },
  { href: '/dashboard/notices', label: 'Notices', icon: Megaphone },
];

const bottomLinks = [
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
  collapsed: boolean;
  toggleCollapse: () => void;
};

export function Sidebar({ isOpen, setIsOpen, isMobile, collapsed, toggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const width = collapsed ? 72 : 256;

  const renderLink = (link: (typeof primaryLinks)[number]) => {
    const isActive = pathname === link.href;
    const Icon = link.icon;

    return (
      <Link
        aria-label={collapsed ? link.label : undefined}
        className={cn('nav-link', isActive && 'nav-link-active')}
        href={link.href}
        key={link.href}
        onClick={() => isMobile && setIsOpen(false)}
        title={collapsed ? link.label : undefined}
      >
        <span className="nav-icon">
          <Icon size={18} strokeWidth={2} />
        </span>
        {!collapsed && <span>{link.label}</span>}
      </Link>
    );
  };

  const content = (
    <div className="sidebar-panel">
      <div className="sidebar-brand">
        <div className="brand-lockup">
          <div className="brand-mark overflow-hidden p-0.5 border border-zinc-200 dark:border-zinc-700 bg-white">
            <img src="/images/docent-logo.jpg" alt="DocentBase Logo" className="w-full h-full object-cover rounded-[7px]" />
          </div>
          {!collapsed && (
            <div>
              <span className="brand-name">DocentBase</span>
              <span className="brand-subtitle">Student Portal</span>
            </div>
          )}
        </div>
        {isMobile && (
          <button aria-label="Close navigation" className="icon-button" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="sidebar-scroll" aria-label="Student portal navigation">
        {!collapsed && <div className="nav-section-label">Cockpit Navigation</div>}
        {primaryLinks.map(renderLink)}

        {!collapsed && <div className="nav-section-label">Preferences</div>}
        {bottomLinks.map(renderLink)}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="student-mini-card">
            <div className="avatar-initials">ST</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: 'var(--foreground)', fontSize: 12, fontWeight: 700 }}>Student Portal</div>
              <div style={{ color: 'var(--muted-foreground)', fontSize: 11 }}>Active Session</div>
            </div>
          </div>
        )}

        {!isMobile && (
          <div className="flex justify-center" style={{ marginTop: collapsed ? 0 : 10 }}>
            <button
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="icon-button"
              onClick={toggleCollapse}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: '#09090b', zIndex: 40 }}
            />
            <motion.div
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              initial={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ position: 'fixed', top: 0, bottom: 0, left: 0, width: 270, zIndex: 50, background: 'var(--card)' }}
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <motion.aside
      animate={{ width }}
      className="app-sidebar"
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      {content}
    </motion.aside>
  );
}
