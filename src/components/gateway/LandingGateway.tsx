'use client';

import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, BookOpen, Calendar, Trophy, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

export function LandingGateway() {
  const { isLoaded, userId } = useAuth();
  
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-inter, Arial, sans-serif)' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 5%', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'var(--brand-primary)', padding: '8px', borderRadius: '8px', color: 'white' }}>
            <GraduationCap size={24} />
          </div>
          <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>DocentBase</span>
        </div>
        <div>
          {isLoaded && !userId && (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Link href="/sign-in" style={{ padding: '8px 16px', color: 'var(--text-secondary)', fontWeight: 500, textDecoration: 'none' }}>Log in</Link>
              <Link href="/sign-up" style={{ padding: '8px 16px', background: 'var(--brand-primary)', color: 'white', borderRadius: '8px', fontWeight: 500, textDecoration: 'none' }}>Sign up</Link>
            </div>
          )}
          {isLoaded && userId && (
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--brand-primary)', color: 'white', borderRadius: '8px', fontWeight: 500, textDecoration: 'none' }}>
              Dashboard <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background Gradients */}
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '500px', background: 'radial-gradient(circle, var(--brand-primary-light) 0%, transparent 70%)', opacity: 0.7, zIndex: 0, pointerEvents: 'none' }} />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--brand-primary-light)', color: 'var(--brand-primary)', borderRadius: '9999px', fontWeight: 600, fontSize: '14px', marginBottom: '24px' }}>
            <span>Student Portal 2.0 is live</span>
          </div>
          
          <h1 style={{ fontSize: 'min(64px, 12vw)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Your academic journey, <br />
            <span style={{ color: 'var(--brand-primary)' }}>beautifully simplified.</span>
          </h1>
          
          <p style={{ fontSize: 'min(20px, 5vw)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Track your attendance, manage fees, access study materials, and monitor your progress—all in one seamless, premium experience.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {isLoaded && !userId && (
              <>
                <Link href="/sign-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', background: 'var(--brand-primary)', color: 'white', borderRadius: '12px', fontSize: '18px', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: 'var(--shadow-md)' }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                >
                  Sign Up as Student <ChevronRight size={20} />
                </Link>
                <Link href="/sign-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', borderRadius: '12px', fontSize: '18px', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'var(--bg-subtle)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'var(--bg-surface)'; }}
                >
                  Sign In
                </Link>
              </>
            )}
            {isLoaded && userId && (
              <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', background: 'var(--brand-primary)', color: 'white', borderRadius: '12px', fontSize: '18px', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: 'var(--shadow-md)' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              >
                Go to Student Dashboard <ArrowRight size={20} />
              </Link>
            )}
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', width: '100%', maxWidth: '1200px', marginTop: '80px', position: 'relative', zIndex: 1 }}
        >
          <FeatureCard icon={<Calendar size={28} color="var(--brand-primary)" />} title="Smart Routine" desc="Never miss a class with your personalized, always up-to-date schedule." />
          <FeatureCard icon={<BookOpen size={28} color="var(--color-info)" />} title="Resources Hub" desc="Access class notes, assignments, and study materials instantly." />
          <FeatureCard icon={<Trophy size={28} color="var(--color-success)" />} title="Performance" desc="Track your exam results and monitor your academic progress." />
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
        <p>© {new Date().getFullYear()} DocentBase Student Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div style={{ background: 'var(--bg-surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-subtle)', textAlign: 'left', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.3s, box-shadow 0.3s' }}
      onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
      onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
    >
      <div style={{ background: 'var(--bg-subtle)', width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}
