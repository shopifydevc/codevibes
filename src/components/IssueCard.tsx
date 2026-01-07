import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface Issue {
  id: string;
  file: string;
  line: number;
  severity: "critical" | "high" | "medium" | "low";
  message: string;
  suggestedFix: string;
}

interface IssueCardProps {
  issue: Issue;
  index: number;
}

const severityColors: Record<Issue["severity"], string> = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-destructive/80 text-destructive-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-muted text-muted-foreground",
};

export function IssueCard({ issue, index }: IssueCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(issue.suggestedFix);
    setCopied(true);
    toast.success("Fix copied to clipboard", {
      description: "Paste it into your code editor",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="animate-slide-up rounded-lg border border-border bg-card overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-border bg-secondary/30 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <code className="font-mono text-sm text-foreground truncate">
            {issue.file}
          </code>
          <Badge variant="outline" className="shrink-0 font-mono text-xs">
            L{issue.line}
          </Badge>
        </div>
        <Badge className={cn("shrink-0 capitalize", severityColors[issue.severity])}>
          {issue.severity}
        </Badge>
      </div>

      {/* Body - Cynical message */}
      <div className="px-4 py-4">
        <p className="text-sm text-foreground leading-relaxed">{issue.message}</p>
      </div>

      {/* Footer - Suggested fix */}
      <div className="border-t border-border bg-background/50">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Suggested Fix
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground transition-smooth"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1 text-primary" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copy Fix
              </>
            )}
          </Button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="font-mono text-sm text-foreground/90">
            {issue.suggestedFix}
          </code>
        </pre>
      </div>
    </div>
  );
}
