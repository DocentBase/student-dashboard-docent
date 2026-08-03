import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export function Badge({ children, variant = 'info', className }: { children: ReactNode, variant?: 'paid' | 'due' | 'overdue' | 'present' | 'absent' | 'late' | 'holiday' | 'success' | 'warning' | 'danger' | 'info', className?: string }) {
  return (
    <span className={cn(`badge-${variant}`, className)}>
      {children}
    </span>
  );
}
