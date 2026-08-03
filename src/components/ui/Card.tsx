'use client';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Card({ children, className, hoverable = false, style }: { children: ReactNode, className?: string, hoverable?: boolean, style?: React.CSSProperties }) {
  const inner = (
    <div className={cn('card', className)} style={style}>
      {children}
    </div>
  );
  if (hoverable) {
    return (
      <motion.div whileHover={{ y: -2, scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
        {inner}
      </motion.div>
    );
  }
  return inner;
}
