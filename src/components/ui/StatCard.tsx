import { Card } from './Card';
import { ReactNode } from 'react';

export function StatCard({ title, value, icon, trend, trendLabel }: { title: string, value: string | number, icon?: ReactNode, trend?: 'up' | 'down', trendLabel?: string }) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500 }}>{title}</span>
        {icon && <span style={{ color: 'var(--text-muted)' }}>{icon}</span>}
      </div>
      <div style={{ fontSize: '30px', fontWeight: 700, color: 'var(--text-primary)' }}>
        {value}
      </div>
      {(trend || trendLabel) && (
        <div className="flex items-center gap-1" style={{ fontSize: '12px', marginTop: '4px' }}>
          {trend === 'up' && <span style={{ color: 'var(--color-success)' }}>↑</span>}
          {trend === 'down' && <span style={{ color: 'var(--color-danger)' }}>↓</span>}
          <span style={{ color: 'var(--text-muted)' }}>{trendLabel}</span>
        </div>
      )}
    </Card>
  );
}
