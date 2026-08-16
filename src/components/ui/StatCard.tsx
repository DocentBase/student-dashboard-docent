import { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  label?: string;
  title?: string;
  value: string | number;
  sublabel?: string;
  trendLabel?: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  sparklineData?: number[];
  icon?: ReactNode;
  className?: string;
}

export function StatCard({
  label,
  title,
  value,
  sublabel,
  trendLabel,
  change,
  trend,
  sparklineData,
  icon,
  className,
}: StatCardProps) {
  const displayLabel = label || title || '';
  const displaySublabel = sublabel || trendLabel;
  
  // Calculate trend direction
  let isPositive = change !== undefined ? change > 0 : trend === 'up';
  let isNegative = change !== undefined ? change < 0 : trend === 'down';
  
  // Generate sparkline points if provided
  const values = sparklineData ?? (isPositive ? [12, 16, 14, 20, 24, 30] : isNegative ? [30, 24, 20, 18, 14, 10] : [20, 22, 21, 23, 22, 24]);
  const maxVal = Math.max(...values, 1);
  const minVal = Math.min(...values, 0);
  const points = values
    .map((val, idx) => {
      const x = (idx / Math.max(values.length - 1, 1)) * 100;
      const y = 26 - ((val - minVal) / (maxVal - minVal || 1)) * 20;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div
      className={cn(
        'card flex flex-col justify-between transition-all duration-150',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            {displayLabel}
          </span>
          {icon && <div className="text-zinc-400 dark:text-zinc-500">{icon}</div>}
        </div>

        <div className="mt-3 flex items-baseline justify-between gap-2">
          <span className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 tabular-nums">
            {value}
          </span>
          {(change !== undefined || trend) && (
            <div
              className={cn(
                'inline-flex items-center gap-0.5 rounded-md border px-2 py-0.5 text-xs font-semibold tabular-nums',
                isPositive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400'
                  : isNegative
                  ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:border-red-800 dark:text-red-400'
                  : 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400'
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : isNegative ? (
                <ArrowDownRight className="w-3.5 h-3.5" />
              ) : (
                <Minus className="w-3.5 h-3.5" />
              )}
              <span>{change !== undefined ? `${Math.abs(change)}%` : isPositive ? 'Improving' : 'Attention'}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
        <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
          {displaySublabel || 'Operational metrics'}
        </span>
        {values.length > 1 && (
          <svg aria-label="Metric trend" className="h-5 w-18 shrink-0 overflow-visible" viewBox="0 0 100 30">
            <polyline
              fill="none"
              stroke={isNegative ? '#ef4444' : isPositive ? '#10b981' : '#3b82f6'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        )}
      </div>
    </div>
  );
}
