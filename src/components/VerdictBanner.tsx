import { CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerdictBannerProps {
  isClean: boolean;
  issueCount?: number;
}

export function VerdictBanner({ isClean, issueCount = 0 }: VerdictBannerProps) {
  return (
    <div
      className={cn(
        "animate-slide-up rounded-lg border p-6 text-center",
        isClean
          ? "border-primary/30 bg-primary/10 glow-success"
          : "border-destructive/30 bg-destructive/10 glow-danger"
      )}
    >
      <div className="flex items-center justify-center gap-3">
        {isClean ? (
          <>
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <div className="text-left">
              <h2 className="text-xl font-semibold text-primary">
                Vibe Check Passed
              </h2>
              <p className="text-sm text-muted-foreground">
                No hallucinations detected. Ship it.
              </p>
            </div>
          </>
        ) : (
          <>
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div className="text-left">
              <h2 className="text-xl font-semibold text-destructive">
                Security Critical
              </h2>
              <p className="text-sm text-muted-foreground">
                {issueCount} issue{issueCount !== 1 ? "s" : ""} found. Do not push.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
