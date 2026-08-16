'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const saved = localStorage.getItem('sidebar_collapsed');
    if (saved) setCollapsed(saved === 'true');
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('sidebar_collapsed', next.toString());
  };

  return (
    <div className="app-shell">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isMobile={isMobile}
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
      />
      <div className="app-main">
        <Header toggleSidebar={() => setSidebarOpen(true)} isMobile={isMobile} />
        <main className="app-body">
          {children}
        </main>
      </div>
    </div>
  );
}
