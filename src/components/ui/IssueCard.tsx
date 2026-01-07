import { ChevronDown, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CodeBlock } from './CodeBlock';
import type { AnalysisIssue } from '@/store/analysisStore';

interface IssueCardProps {
  issue: AnalysisIssue;
}

const severityConfig = {
  critical: {
    label: 'Critical',
    className: 'border-primary/30 bg-primary/5',
    dotClass: 'bg-primary animate-pulse-dot',
    badgeClass: 'bg-primary/10 text-primary',
  },
  important: {
    label: 'Important',
    className: 'border-warning/30 bg-warning/5',
    dotClass: 'bg-warning',
    badgeClass: 'bg-warning/10 text-warning',
  },
  'nice-to-have': {
    label: 'Nice to Have',
    className: 'border-border bg-card',
    dotClass: 'bg-muted-foreground',
    badgeClass: 'bg-muted text-muted-foreground',
  },
};

export function IssueCard({ issue }: IssueCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = severityConfig[issue.severity];

  return (
    <div 
      className={cn(
        'rounded-xl border p-4 transition-all duration-200 hover-lift',
        config.className
      )}
    >
      <div
        className="flex items-start gap-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsExpanded(!isExpanded)}
      >
        {/* Dot indicator */}
        <span className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', config.dotClass)} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="font-semibold text-sm">{issue.title}</h4>
            <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', config.badgeClass)}>
              {config.label}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {issue.description}
          </p>
          
          {issue.file && (
            <p className="text-xs font-mono text-muted-foreground mt-2 bg-muted px-2 py-1 rounded inline-block">
              {issue.file}{issue.line ? `:${issue.line}` : ''}
            </p>
          )}
        </div>

        {(issue.codeExample || issue.suggestion) && (
          <ChevronDown
            className={cn(
              'w-5 h-5 text-muted-foreground transition-transform flex-shrink-0',
              isExpanded && 'rotate-180'
            )}
          />
        )}
      </div>

      {isExpanded && (issue.codeExample || issue.suggestion) && (
        <div className="mt-4 pt-4 border-t border-border space-y-4 animate-fade-in">
          {issue.codeExample && (
            <CodeBlock code={issue.codeExample} language="typescript" showCopy />
          )}
          
          {issue.suggestion && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">{issue.suggestion}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
