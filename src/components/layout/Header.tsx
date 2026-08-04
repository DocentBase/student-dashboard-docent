'use client';

import { Bell, Menu, Search, Sparkles } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

export function Header({ toggleSidebar, isMobile }: { toggleSidebar: () => void; isMobile: boolean }) {
  return (
    <header className="portal-header">
      <div className="flex items-center gap-3">
        {isMobile && (
          <button aria-label="Open navigation" className="icon-button" onClick={toggleSidebar}>
            <Menu size={22} />
          </button>
        )}
        <div>
          <div className="header-title">Student Portal</div>
          <div className="header-subtitle">Learn, track, pay, and stay updated</div>
        </div>
      </div>

      <div className="header-actions">
        <div className="search-pill">
          <Search size={16} />
          <span>Search notes, exams, notices</span>
        </div>
        <button aria-label="Study assistant" className="icon-button">
          <Sparkles size={19} />
        </button>
        <button aria-label="Notifications" className="icon-button" style={{ position: 'relative' }}>
          <Bell size={19} />
          <span className="notification-dot" />
        </button>
        <UserButton />
      </div>
    </header>
  );
}
