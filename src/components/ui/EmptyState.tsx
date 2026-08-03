import { ReactNode } from 'react';

export function EmptyState({ icon, title, description, action }: { icon: ReactNode, title: string, description: string, action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}>
      <div className="mb-4 text-4xl" style={{ color: 'var(--text-muted)' }}>{icon}</div>
      <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      <p className="mb-6 text-sm" style={{ color: 'var(--text-secondary)', maxWidth: '320px' }}>{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
