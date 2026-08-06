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
  { href: '/dashboard/fees', label: 'Fees', icon: Wallet },
  { href: '/dashboard/notes', label: 'Notes', icon: FileText },
  { href: '/dashboard/exams', label: 'Exams', icon: ClipboardList },
  { href: '/dashboard/results', label: 'Results', icon: Trophy },
  { href: '/dashboard/routine', label: 'Routine', icon: Calendar },
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
  const width = collapsed ? 72 : 260;

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
          <Icon size={20} strokeWidth={2.2} />
        </span>
        {!collapsed && <span>{link.label}</span>}
      </Link>
    );
  };

  const content = (
    <div className="sidebar-panel">
      <div className="sidebar-brand">
        <div className="brand-lockup">
          <div className="brand-mark">
            <GraduationCap size={22} />
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
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="sidebar-scroll" aria-label="Student portal navigation">
        {!collapsed && <div className="nav-section-label">Workspace</div>}
        {primaryLinks.map(renderLink)}

        {!collapsed && <div className="nav-section-label">Account</div>}
        {bottomLinks.map(renderLink)}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="student-mini-card">
            <div className="avatar-initials">ST</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 800 }}>Student workspace</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>Class 10 · Science</div>
            </div>
          </div>
        )}

        {!isMobile && (
          <div className="flex justify-center" style={{ marginTop: collapsed ? 0 : 12 }}>
            <button
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="icon-button"
              onClick={toggleCollapse}
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
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
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: '#020617', zIndex: 40 }}
            />
            <motion.div
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              initial={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ position: 'fixed', top: 0, bottom: 0, left: 0, width: 290, zIndex: 50 }}
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
