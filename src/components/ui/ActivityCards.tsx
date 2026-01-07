import { useState, useEffect } from 'react';
import { Search, FileCode, Shield, Code2, Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    status: 'pending' | 'active' | 'complete';
}

interface ActivityCardsProps {
    currentPhase: 'validating' | 'fetching' | 'analyzing' | 'complete';
    currentFile?: string;
    priority?: number;
    filesScanned?: number;
    totalFiles?: number;
}

export function ActivityCards({
    currentPhase,
    currentFile,
    priority = 1,
    filesScanned = 0,
    totalFiles = 0
}: ActivityCardsProps) {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [visibleCards, setVisibleCards] = useState<number>(0);

    useEffect(() => {
        const baseActivities: ActivityItem[] = [
            {
                id: 'validate',
                icon: <Search className="w-4 h-4" />,
                title: 'Validating Repository',
                description: 'Checking GitHub repository access...',
                status: currentPhase === 'validating' ? 'active' :
                    ['fetching', 'analyzing', 'complete'].includes(currentPhase) ? 'complete' : 'pending'
            },
            {
                id: 'fetch',
                icon: <FileCode className="w-4 h-4" />,
                title: 'Fetching Files',
                description: totalFiles > 0 ? `Found ${totalFiles} files to analyze` : 'Scanning repository structure...',
                status: currentPhase === 'fetching' ? 'active' :
                    ['analyzing', 'complete'].includes(currentPhase) ? 'complete' : 'pending'
            },
            {
                id: 'analyze',
                icon: priority === 1 ? <Shield className="w-4 h-4" /> :
                    priority === 2 ? <Code2 className="w-4 h-4" /> :
                        <Sparkles className="w-4 h-4" />,
                title: priority === 1 ? 'Security Analysis' :
                    priority === 2 ? 'Core Logic Analysis' :
                        'Quality Analysis',
                description: currentFile ? `Analyzing: ${currentFile}` :
                    filesScanned > 0 ? `Scanned ${filesScanned} of ${totalFiles} files` :
                        'Running DeepSeek AI analysis...',
                status: currentPhase === 'analyzing' ? 'active' :
                    currentPhase === 'complete' ? 'complete' : 'pending'
            }
        ];

        if (currentPhase === 'complete') {
            baseActivities.push({
                id: 'complete',
                icon: <CheckCircle className="w-4 h-4" />,
                title: 'Analysis Complete',
                description: 'All files have been analyzed',
                status: 'complete'
            });
        }

        setActivities(baseActivities);
    }, [currentPhase, currentFile, priority, filesScanned, totalFiles]);

    useEffect(() => {
        // Animate cards appearing one by one
        const timer = setInterval(() => {
            setVisibleCards(prev => {
                if (prev < activities.length) {
                    return prev + 1;
                }
                clearInterval(timer);
                return prev;
            });
        }, 300);

        return () => clearInterval(timer);
    }, [activities.length]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'border-primary bg-primary/5';
            case 'complete': return 'border-green-500/50 bg-green-500/5';
            default: return 'border-border bg-card/50';
        }
    };

    const getIconColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-primary';
            case 'complete': return 'text-green-500';
            default: return 'text-muted-foreground';
        }
    };

    return (
        <div className="space-y-3">
            {activities.slice(0, visibleCards).map((activity, index) => (
                <div
                    key={activity.id}
                    className={cn(
                        "p-4 rounded-xl border transition-all duration-500 animate-fade-in",
                        getStatusColor(activity.status)
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="flex items-start gap-3">
                        <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            activity.status === 'active' ? 'bg-primary/20' :
                                activity.status === 'complete' ? 'bg-green-500/20' :
                                    'bg-muted'
                        )}>
                            {activity.status === 'active' ? (
                                <Loader2 className={cn("w-4 h-4 animate-spin", getIconColor(activity.status))} />
                            ) : (
                                <span className={getIconColor(activity.status)}>{activity.icon}</span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{activity.title}</span>
                                {activity.status === 'active' && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/20 text-primary uppercase tracking-wider">
                                        Running
                                    </span>
                                )}
                                {activity.status === 'complete' && (
                                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                                {activity.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Pulsing dots for pending state */}
            {currentPhase !== 'complete' && visibleCards >= activities.length && (
                <div className="flex items-center justify-center gap-1 py-2 animate-fade-in">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            )}
        </div>
    );
}
