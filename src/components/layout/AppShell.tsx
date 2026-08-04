'use client';
import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const saved = localStorage.getItem('sidebar_collapsed');
    if (saved) setCollapsed(saved === 'true');
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    localStorage.setItem('sidebar_collapsed', (!collapsed).toString());
  };

  const desktopWidth = collapsed ? '72px' : '260px';

  return (
    <div className="app-shell">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        isMobile={isMobile} 
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
      />
      <div
        className="app-content flex flex-col"
        style={{ 
          marginLeft: !isMobile ? desktopWidth : 0,
        }}
      >
        <Header toggleSidebar={() => setSidebarOpen(true)} isMobile={isMobile} />
        <main className="portal-main">
          <div className="portal-page">{children}</div>
        </main>
      </div>
    </div>
  );
}
