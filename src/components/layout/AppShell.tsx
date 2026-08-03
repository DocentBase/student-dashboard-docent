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
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-app)' }}>
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        isMobile={isMobile} 
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
      />
      <div 
        className="flex flex-col flex-1 overflow-hidden" 
        style={{ 
          marginLeft: !isMobile ? desktopWidth : 0, 
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
        }}
      >
        <Header toggleSidebar={() => setSidebarOpen(true)} isMobile={isMobile} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
