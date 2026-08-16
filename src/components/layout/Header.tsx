'use client';

import { Bell, Menu, Search, Sparkles } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

export function Header({
  toggleSidebar,
  isMobile,
}: {
  toggleSidebar: () => void;
  isMobile: boolean;
}) {
  return (
    <header className="app-header">
      <div className="header-left">
        {isMobile && (
          <button
            aria-label="Open navigation"
            className="icon-button"
            onClick={toggleSidebar}
          >
            <Menu size={18} />
          </button>
        )}
        <div className="hidden sm:flex items-center gap-2.5">
          <span className="cockpit-status-pill">
            <span className="status-dot" />
            <span>Academic Term 2026</span>
          </span>
        </div>
      </div>

      <div className="header-right">
        <div className="hidden md:flex items-center gap-2 h-8 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-400 dark:text-zinc-500 w-64 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
          <Search size={14} />
          <span className="flex-1 text-[12px]">Quick search...</span>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
            ⌘K
          </kbd>
        </div>

        <button
          aria-label="Notifications"
          className="icon-button relative"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-zinc-900" />
        </button>

        <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <div className="flex items-center">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800',
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
