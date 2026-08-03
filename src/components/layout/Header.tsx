'use client';
import { Menu, Bell } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

export function Header({ toggleSidebar, isMobile }: { toggleSidebar: () => void, isMobile: boolean }) {
  return (
    <header className="flex items-center justify-between px-4 lg:px-8 glass" style={{ height: '60px', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="flex items-center gap-4">
        {isMobile && (
          <button onClick={toggleSidebar} className="p-2 -ml-2 rounded-md hover:bg-gray-100 text-gray-600">
            <Menu size={24} />
          </button>
        )}
        <h1 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Student Portal</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <UserButton />
      </div>
    </header>
  );
}
