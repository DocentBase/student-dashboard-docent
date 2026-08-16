import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, XCircle, FileEdit, Archive, AlertCircle, Sparkles } from 'lucide-react';
import { ReactNode } from 'react';

export type StatusType = 
  | 'ACTIVE' 
  | 'PENDING' 
  | 'CANCELLED' 
  | 'DRAFT' 
  | 'ARCHIVED'
  | 'PAID'
  | 'DUE'
  | 'OVERDUE'
  | 'PRESENT'
  | 'ABSENT'
  | 'LATE';

export function StatusBadge({ 
  status, 
  label: customLabel,
  className 
}: { 
  status: StatusType; 
  label?: string;
  className?: string;
}) {
  const configs: Record<StatusType, { style: string; icon: ReactNode; defaultLabel: string }> = {
    ACTIVE: {
      style: 'border-emerald-200 text-emerald-700 bg-emerald-50/70 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400',
      icon: <CheckCircle2 className="w-3 h-3" />,
      defaultLabel: 'Active',
    },
    PAID: {
      style: 'border-emerald-200 text-emerald-700 bg-emerald-50/70 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400',
      icon: <CheckCircle2 className="w-3 h-3" />,
      defaultLabel: 'Paid',
    },
    PRESENT: {
      style: 'border-emerald-200 text-emerald-700 bg-emerald-50/70 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400',
      icon: <CheckCircle2 className="w-3 h-3" />,
      defaultLabel: 'Present',
    },
    PENDING: {
      style: 'border-amber-200 text-amber-700 bg-amber-50/70 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400',
      icon: <Clock className="w-3 h-3" />,
      defaultLabel: 'Pending',
    },
    DUE: {
      style: 'border-amber-200 text-amber-700 bg-amber-50/70 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400',
      icon: <Clock className="w-3 h-3" />,
      defaultLabel: 'Due',
    },
    LATE: {
      style: 'border-amber-200 text-amber-700 bg-amber-50/70 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400',
      icon: <Clock className="w-3 h-3" />,
      defaultLabel: 'Late',
    },
    CANCELLED: {
      style: 'border-red-200 text-red-700 bg-red-50/70 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400',
      icon: <XCircle className="w-3 h-3" />,
      defaultLabel: 'Cancelled',
    },
    OVERDUE: {
      style: 'border-red-200 text-red-700 bg-red-50/70 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400',
      icon: <AlertCircle className="w-3 h-3" />,
      defaultLabel: 'Overdue',
    },
    ABSENT: {
      style: 'border-red-200 text-red-700 bg-red-50/70 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400',
      icon: <XCircle className="w-3 h-3" />,
      defaultLabel: 'Absent',
    },
    DRAFT: {
      style: 'border-blue-200 text-blue-700 bg-blue-50/70 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-400',
      icon: <FileEdit className="w-3 h-3" />,
      defaultLabel: 'Draft',
    },
    ARCHIVED: {
      style: 'border-zinc-200 text-zinc-600 bg-zinc-50/70 dark:bg-zinc-800/40 dark:border-zinc-700 dark:text-zinc-400',
      icon: <Archive className="w-3 h-3" />,
      defaultLabel: 'Archived',
    },
  };

  const config = configs[status] || configs.ACTIVE;

  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-semibold tracking-tight',
        config.style,
        className
      )}
    >
      {config.icon}
      <span>{customLabel || config.defaultLabel}</span>
    </span>
  );
}

export function Badge({
  children,
  variant = 'info',
  className,
}: {
  children: ReactNode;
  variant?:
    | 'paid'
    | 'due'
    | 'overdue'
    | 'present'
    | 'absent'
    | 'late'
    | 'holiday'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'default';
  className?: string;
}) {
  const variantClasses: Record<string, string> = {
    paid: 'badge-success',
    present: 'badge-success',
    success: 'badge-success',
    due: 'badge-warning',
    late: 'badge-warning',
    warning: 'badge-warning',
    overdue: 'badge-danger',
    absent: 'badge-danger',
    danger: 'badge-danger',
    holiday: 'badge-info',
    info: 'badge-info',
    default: 'badge-default',
  };

  return (
    <span className={cn('badge', variantClasses[variant] || 'badge-default', className)}>
      {children}
    </span>
  );
}
