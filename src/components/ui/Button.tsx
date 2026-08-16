import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'light' | 'glass' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', showArrow, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'btn',
          variant === 'primary' && 'btn-primary',
          variant === 'secondary' && 'btn-secondary',
          variant === 'light' && 'btn-light',
          variant === 'glass' && 'btn-glass',
          variant === 'destructive' && 'btn-destructive',
          variant === 'ghost' && 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
          size === 'sm' && 'btn-sm',
          size === 'lg' && 'btn-lg',
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {showArrow && <ArrowRight className="h-4 w-4 shrink-0" />}
      </button>
    );
  }
);
Button.displayName = 'Button';

export function PrimaryButton({ children, className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      className={cn(
        'btn btn-primary',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 shrink-0" />
    </button>
  );
}

export function SecondaryButton({ children, className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      className={cn(
        'btn btn-secondary',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
