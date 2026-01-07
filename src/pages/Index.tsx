import { useState } from "react";
import { Header } from "@/components/Header";
import { DropZone } from "@/components/DropZone";
import { VerdictBanner } from "@/components/VerdictBanner";
import { IssueCard } from "@/components/IssueCard";
import { SettingsModal } from "@/components/SettingsModal";
import { HistoryPanel } from "@/components/HistoryPanel";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useHistory } from "@/hooks/useHistory";
import type { Issue } from "@/components/IssueCard";

interface HistoryEntryWithCode {
  id: string;
  timestamp: Date;
  codePreview: string;
  issueCount: number;
  isClean: boolean;
  issues?: Issue[];
  code?: string;
}

export default function Index() {
  const [code, setCode] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { analyze, isLoading, result, clearResult } = useAnalysis();
  const { entries, clearHistory, refetch } = useHistory();

  const handleAnalyze = async () => {
    await analyze(code);
    refetch();
  };

  const handleHistorySelect = (entry: HistoryEntryWithCode) => {
    if (entry.code) {
      setCode(entry.code);
    }
    clearResult();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSettingsClick={() => setSettingsOpen(true)} />
      
      <main className="container max-w-4xl py-8 px-4 space-y-8">
        {/* Hero text */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            AI Code Security Auditor
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Paste your Git diff and let our cynical senior engineer find the 
            security holes you missed at 2 AM.
          </p>
        </div>

        {/* Code input */}
        <DropZone
          code={code}
          onChange={(newCode) => {
            setCode(newCode);
            if (result) clearResult();
          }}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <VerdictBanner
              isClean={result.isClean}
              issueCount={result.issues.length}
            />

            {result.issues.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Issues Found ({result.issues.length})
                </h3>
                {result.issues.map((issue: Issue, index: number) => (
                  <IssueCard key={issue.id} issue={issue} index={index} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* History */}
        {!result && entries.length > 0 && (
          <HistoryPanel
            entries={entries}
            onSelect={handleHistorySelect}
            onClear={clearHistory}
          />
        )}
      </main>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
