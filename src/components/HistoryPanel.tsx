import { Clock, CheckCircle2, AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HistoryEntry {
  id: string;
  timestamp: Date;
  codePreview: string;
  issueCount: number;
  isClean: boolean;
}

interface HistoryPanelProps {
  entries: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onClear: () => void;
}

export function HistoryPanel({ entries, onSelect, onClear }: HistoryPanelProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Clock className="h-4 w-4" />
          Recent Scans
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive transition-smooth"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Clear
        </Button>
      </div>
      <div className="space-y-2">
        {entries.slice(0, 5).map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelect(entry)}
            className="w-full text-left rounded-lg border border-border bg-card/50 p-3 hover:bg-card transition-smooth group"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-muted-foreground truncate">
                  {entry.codePreview}
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  {formatRelativeTime(entry.timestamp)}
                </p>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1.5 shrink-0",
                  entry.isClean ? "text-primary" : "text-destructive"
                )}
              >
                {entry.isClean ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs font-medium">{entry.issueCount}</span>
                  </>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}
