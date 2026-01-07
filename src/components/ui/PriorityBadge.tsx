import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  level: 1 | 2 | 3;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

const priorityConfig = {
  1: {
    label: 'Security',
    className: 'bg-primary/10 text-primary border-primary/20',
    dotClass: 'bg-primary',
  },
  2: {
    label: 'Core Logic',
    className: 'bg-warning/10 text-warning border-warning/20',
    dotClass: 'bg-warning',
  },
  3: {
    label: 'Other',
    className: 'bg-muted text-muted-foreground border-border',
    dotClass: 'bg-muted-foreground',
  },
};

export function PriorityBadge({
  level,
  size = 'md',
  showLabel = true,
}: PriorityBadgeProps) {
  const config = priorityConfig[level];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dotClass)} />
      {showLabel && <span>P{level} {config.label}</span>}
    </span>
  );
}
