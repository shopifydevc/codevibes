import { cn } from '@/lib/utils';

interface VibeScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function VibeScoreGauge({ score, size = 'md', showLabel = true }: VibeScoreGaugeProps) {
  const sizeMap = {
    sm: { width: 80, stroke: 6, fontSize: 'text-xl', labelSize: 'text-xs' },
    md: { width: 120, stroke: 8, fontSize: 'text-3xl', labelSize: 'text-sm' },
    lg: { width: 160, stroke: 10, fontSize: 'text-5xl', labelSize: 'text-base' },
  };

  const { width, stroke, fontSize, labelSize } = sizeMap[size];
  const radius = (width - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(score, 0), 100);
  const offset = circumference - (progress / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-primary';
  };

  const getStrokeColor = () => {
    if (score >= 80) return 'hsl(var(--success))';
    if (score >= 60) return 'hsl(var(--warning))';
    return 'hsl(var(--primary))';
  };

  const getLabel = () => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width, height: width }}>
        {/* Background track */}
        <svg width={width} height={width} className="transform -rotate-90">
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={stroke}
          />
          {/* Progress arc */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={getStrokeColor()}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${getStrokeColor()})`,
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-bold tracking-tight', fontSize, getColor())}>
            {score}
          </span>
          {size !== 'sm' && (
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Score</span>
          )}
        </div>
      </div>

      {showLabel && (
        <span className={cn('font-medium', labelSize, getColor())}>
          {getLabel()}
        </span>
      )}
    </div>
  );
}
