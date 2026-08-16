import React from 'react';
import { cn } from '@/lib/utils';

export function ProductFrame({
  children,
  url = 'app.docentbase.com/portal',
  className,
}: {
  children: React.ReactNode;
  url?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.18)]',
        className
      )}
    >
      <div className="flex h-10 items-center gap-1.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-zinc-950/90 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <div className="ml-3 flex h-6 min-w-0 flex-1 items-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 text-[11px] font-medium text-zinc-500">
          {url}
        </div>
        <span className="ml-2 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
        </span>
      </div>
      <div className="p-6 bg-zinc-50/50 dark:bg-zinc-950/50">
        {children}
      </div>
    </div>
  );
}
