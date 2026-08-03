'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BarChart3, Wallet, FileText, ClipboardList, Trophy, Calendar, Megaphone, User, Settings, ChevronLeft, ChevronRight, X, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/coaching', label: 'Coaching & Batches', icon: GraduationCap },
  { href: '/attendance', label: 'Attendance', icon: BarChart3 },
  { href: '/fees', label: 'Fees', icon: Wallet },
  { href: '/notes', label: 'Notes', icon: FileText },
  { href: '/exams', label: 'Exams', icon: ClipboardList },
  { href: '/results', label: 'Results', icon: Trophy },
  { href: '/routine', label: 'Routine', icon: Calendar },
  { href: '/notices', label: 'Notices', icon: Megaphone },
];

const bottomLinks = [
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ isOpen, setIsOpen, isMobile, collapsed, toggleCollapse }: { isOpen: boolean, setIsOpen: (o: boolean) => void, isMobile: boolean, collapsed: boolean, toggleCollapse: () => void }) {
  const pathname = usePathname();
  const width = collapsed ? 72 : 260;

  const content = (
    <div className="flex flex-col h-full glass" style={{ background: 'var(--bg-sidebar)' }}>
      <div className="flex items-center justify-between p-4" style={{ height: '60px', borderBottom: '1px solid var(--border-subtle)' }}>
        {!collapsed && <span className="font-bold text-lg" style={{ color: 'var(--brand-primary)' }}>DocentBase</span>}
        {collapsed && <span className="font-bold text-lg mx-auto" style={{ color: 'var(--brand-primary)' }}>DB</span>}
        {isMobile && (
          <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-gray-100">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className="nav-link-custom" style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px',
              textDecoration: 'none', color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
              background: isActive ? 'var(--brand-primary-light)' : 'transparent',
              fontWeight: isActive ? 600 : 500,
              borderLeft: isActive ? '3px solid var(--brand-primary)' : '3px solid transparent',
              justifyContent: collapsed ? 'center' : 'flex-start'
            }}>
              <link.icon size={20} />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}

        <div className="my-4 border-t" style={{ borderColor: 'var(--border-subtle)' }} />

        {bottomLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px',
              textDecoration: 'none', color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
              background: isActive ? 'var(--brand-primary-light)' : 'transparent',
              fontWeight: isActive ? 600 : 500,
              borderLeft: isActive ? '3px solid var(--brand-primary)' : '3px solid transparent',
              justifyContent: collapsed ? 'center' : 'flex-start'
            }}>
              <link.icon size={20} />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {!isMobile && (
        <div className="p-4 border-t" style={{ borderColor: 'var(--border-subtle)', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end' }}>
          <button onClick={toggleCollapse} className="p-2 rounded-md hover:bg-gray-100" style={{ color: 'var(--text-secondary)' }}>
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'black', zIndex: 40 }}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ position: 'fixed', top: 0, bottom: 0, left: 0, width: '280px', zIndex: 50, boxShadow: 'var(--shadow-xl)' }}
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
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      style={{ position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 30, borderRight: '1px solid var(--border-subtle)' }}
    >
      {content}
    </motion.aside>
  );
}
