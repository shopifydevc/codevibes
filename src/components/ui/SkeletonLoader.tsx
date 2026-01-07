import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'code';
  lines?: number;
  className?: string;
}

export function SkeletonLoader({ variant = 'text', lines = 3, className }: SkeletonLoaderProps) {
  if (variant === 'card') {
    return (
      <div className={cn('animate-pulse p-5 rounded-xl border border-border bg-card', className)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-2 w-2 rounded-full bg-muted" />
          <div className="h-4 w-1/3 rounded bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-muted" />
          <div className="h-3 w-4/5 rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (variant === 'code') {
    return (
      <div className={cn('animate-pulse p-4 rounded-xl border border-border bg-card font-mono', className)}>
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-3 w-6 rounded bg-muted opacity-50" />
              <div 
                className="h-3 rounded bg-muted" 
                style={{ width: `${Math.random() * 40 + 30}%` }} 
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('animate-pulse space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded bg-muted"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}
