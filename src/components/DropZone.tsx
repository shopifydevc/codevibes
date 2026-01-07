import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";

interface DropZoneProps {
  code: string;
  onChange: (code: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export function DropZone({ code, onChange, onAnalyze, isLoading }: DropZoneProps) {
  return (
    <div className="space-y-4">
      <div className="relative rounded-lg border border-border bg-card overflow-hidden">
        {/* Line numbers gutter */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-background/50 border-r border-border flex flex-col items-end pr-2 pt-4 text-xs text-muted-foreground/50 font-mono select-none overflow-hidden">
          {Array.from({ length: Math.max(20, code.split('\n').length) }, (_, i) => (
            <div key={i} className="leading-relaxed h-[1.625rem]">
              {i + 1}
            </div>
          ))}
        </div>
        
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your Git Diff here..."
          className="w-full min-h-[400px] bg-transparent pl-14 pr-4 py-4 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0 resize-none"
          spellCheck={false}
        />
      </div>
      
      <Button
        onClick={onAnalyze}
        disabled={isLoading || !code.trim()}
        className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Scan className="h-5 w-5 animate-scanner" />
            <span>Interrogating Code...</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Scan className="h-5 w-5" />
            <span>Analyze</span>
          </span>
        )}
      </Button>
    </div>
  );
}
