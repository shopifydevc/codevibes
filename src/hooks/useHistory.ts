import { useState, useEffect } from "react";
import type { HistoryEntry } from "@/components/HistoryPanel";

const HISTORY_KEY = "codevibes_history";
const MAX_HISTORY = 10;

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = () => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        const mapped: HistoryEntry[] = parsed.map((row: any) => ({
          ...row,
          timestamp: new Date(row.timestamp),
        }));
        setEntries(mapped);
      }
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveHistory = (newEntries: HistoryEntry[]) => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newEntries.slice(0, MAX_HISTORY)));
    } catch (err) {
      console.error("Failed to save history:", err);
    }
  };

  const addEntry = (entry: Omit<HistoryEntry, "id" | "timestamp">) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: new Date(),
    };
    const updated = [newEntry, ...entries].slice(0, MAX_HISTORY);
    setEntries(updated);
    saveHistory(updated);
  };

  const clearHistory = () => {
    setEntries([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    entries,
    isLoading,
    clearHistory,
    addEntry,
    refetch: fetchHistory,
  };
}
