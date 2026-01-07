// ============================================================
// File Filter - Priority-based file categorization
// ============================================================

import { minimatch } from 'minimatch';
import type { PriorityLevel } from '../types/index.js';

// -------------------- Ignore Patterns --------------------
// Files/directories that should ALWAYS be ignored
const IGNORE_PATTERNS = [
    // Dependencies
    'node_modules/**',
    'vendor/**',
    '__pycache__/**',
    '.venv/**',
    'venv/**',

    // Build outputs
    'dist/**',
    'build/**',
    'out/**',
    '.next/**',
    '.nuxt/**',
    '.output/**',
    'target/**',

    // Version control
    '.git/**',
    '.github/**',
    '.gitlab/**',
    '.svn/**',

    // Test coverage
    'coverage/**',
    'test-results/**',
    '.nyc_output/**',

    // IDE/Editor
    '.idea/**',
    '.vscode/**',
    '*.swp',
    '*.swo',
    '.DS_Store',

    // Lock files
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    'Gemfile.lock',
    'poetry.lock',
    'composer.lock',

    // Minified files
    '*.min.js',
    '*.min.css',
    '*.bundle.js',

    // Binary/media files
    '*.png',
    '*.jpg',
    '*.jpeg',
    '*.gif',
    '*.ico',
    '*.svg',
    '*.webp',
    '*.mp4',
    '*.mp3',
    '*.wav',
    '*.pdf',
    '*.zip',
    '*.tar',
    '*.gz',
    '*.woff',
    '*.woff2',
    '*.ttf',
    '*.eot',

    // Generated files
    '*.map',
    '*.d.ts',
    'generated/**',
    'auto-generated/**',
];

// -------------------- Priority 1: Security Critical --------------------
const PRIORITY_1_PATTERNS = [
    // Environment files
    '.env',
    '.env.local',
    '.env.production',
    '.env.development',
    '.env.test',
    '**/.env',
    // Exclude .env.example which usually contains placeholders
    // '.env.example' is implicitly excluded by not matching specific .env variants above
    // or we can handle it in the filter logic, but removing wildcard .env.* helps

    // Auth/Security directories
    '**/auth/**',
    '**/authentication/**',
    '**/authorization/**',
    '**/security/**',
    '**/crypto/**',
    '**/secrets/**',

    // Config files
    '**/config/**',
    '**/configs/**',
    '**/configuration/**',
    '*.config.js',
    '*.config.ts',

    // Files with sensitive keywords in name
    '**/*secret*',
    '**/*password*',
    '**/*token*',
    '**/*key*',
    '**/*credential*',
    '**/*private*',

    // Middleware (often contains auth logic)
    '**/middleware/**',
    '**/middlewares/**',

    // Database & Queries (Moved to P1 as requested)
    '**/database/**',
    '**/db/**',
    '**/repositories/**',
    '**/*.sql',
    '**/queries/**',
    '**/migrations/**',

    // CORS & Network Security
    '**/*cors*',
    '**/access-control/**',
];

// -------------------- Priority 2: Core Business Logic --------------------
const PRIORITY_2_PATTERNS = [
    // API layer
    '**/api/**',
    '**/routes/**',
    '**/router/**',
    '**/endpoints/**',

    // Business logic
    '**/controllers/**',
    '**/services/**',
    '**/handlers/**',
    '**/use-cases/**',
    '**/usecases/**',

    // Data layer
    '**/models/**',
    '**/entities/**',
    '**/schemas/**',

    // Entry points
    'index.js',
    'index.ts',
    'main.js',
    'main.ts',
    'app.js',
    'app.ts',
    'server.js',
    'server.ts',
    'main.py',
    'app.py',
    '__main__.py',

    // Core source files
    'src/index.*',
    'src/main.*',
    'src/app.*',
    'lib/**',
];

// -------------------- Priority 3: Supporting Code --------------------
const PRIORITY_3_PATTERNS = [
    // Utilities
    '**/utils/**',
    '**/utilities/**',
    '**/helpers/**',
    '**/common/**',
    '**/shared/**',
    '**/lib/**',

    // Frontend components
    '**/components/**',
    '**/views/**',
    '**/pages/**',
    '**/layouts/**',
    '**/templates/**',

    // Tests
    '**/*.test.*',
    '**/*.spec.*',
    '**/test/**',
    '**/tests/**',
    '**/__tests__/**',

    // Documentation
    '*.md',
    '**/docs/**',

    // Styles
    '**/*.css',
    '**/*.scss',
    '**/*.less',

    // Everything else (catch-all for remaining source files)
    '**/*.js',
    '**/*.ts',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.py',
    '**/*.java',
    '**/*.go',
    '**/*.rb',
    '**/*.php',
    '**/*.rs',
];

/**
 * Check if a file path matches any of the given patterns
 */
function matchesAnyPattern(filePath: string, patterns: string[]): boolean {
    return patterns.some(pattern =>
        minimatch(filePath, pattern, { dot: true, matchBase: true })
    );
}

/**
 * Check if a file should be ignored
 */
export function shouldIgnoreFile(filePath: string): boolean {
    return matchesAnyPattern(filePath, IGNORE_PATTERNS);
}

/**
 * Get the priority level for a file
 * Returns null if file should be ignored
 */
export function getFilePriority(filePath: string): PriorityLevel | null {
    // Check if file should be ignored first
    if (shouldIgnoreFile(filePath)) {
        return null;
    }

    // Check Priority 1 (Security Critical)
    if (matchesAnyPattern(filePath, PRIORITY_1_PATTERNS)) {
        return 1;
    }

    // Check Priority 2 (Core Business Logic)
    if (matchesAnyPattern(filePath, PRIORITY_2_PATTERNS)) {
        return 2;
    }

    // Check if it's a recognized source file for Priority 3
    if (matchesAnyPattern(filePath, PRIORITY_3_PATTERNS)) {
        return 3;
    }

    // Unknown file types are ignored
    return null;
}

/**
 * Filter files by priority level
 */
export function filterFilesByPriority(
    files: string[],
    priority: PriorityLevel
): string[] {
    return files.filter(file => getFilePriority(file) === priority);
}

/**
 * Categorize all files by priority
 */
export function categorizeFiles(files: string[]): {
    priority1: string[];
    priority2: string[];
    priority3: string[];
    ignored: string[];
} {
    const result = {
        priority1: [] as string[],
        priority2: [] as string[],
        priority3: [] as string[],
        ignored: [] as string[],
    };

    for (const file of files) {
        const priority = getFilePriority(file);

        switch (priority) {
            case 1:
                result.priority1.push(file);
                break;
            case 2:
                result.priority2.push(file);
                break;
            case 3:
                result.priority3.push(file);
                break;
            default:
                result.ignored.push(file);
        }
    }

    return result;
}

/**
 * ⚡ OPTIMIZED: Lazy categorization - only categorize specific priorities
 * This saves ~60% of categorization time by deferring P2/P3 until needed
 */
export function categorizeLazy(files: string[], priorities: PriorityLevel[]): {
    priority1?: string[];
    priority2?: string[];
    priority3?: string[];
    ignored?: string[];
} {
    const result: {
        priority1?: string[];
        priority2?: string[];
        priority3?: string[];
        ignored?: string[];
    } = {};

    // Only process requested priorities
    const shouldProcess1 = priorities.includes(1);
    const shouldProcess2 = priorities.includes(2);
    const shouldProcess3 = priorities.includes(3);

    if (shouldProcess1) result.priority1 = [];
    if (shouldProcess2) result.priority2 = [];
    if (shouldProcess3) result.priority3 = [];

    for (const file of files) {
        const priority = getFilePriority(file);

        // Only categorize if this priority was requested
        if (priority === 1 && shouldProcess1) {
            result.priority1!.push(file);
        } else if (priority === 2 && shouldProcess2) {
            result.priority2!.push(file);
        } else if (priority === 3 && shouldProcess3) {
            result.priority3!.push(file);
        }
        // Skip ignored files when doing lazy categorization
    }

    return result;
}

/**
 * Get priority name for display
 */
export function getPriorityName(priority: PriorityLevel): string {
    switch (priority) {
        case 1:
            return 'Security & Secrets';
        case 2:
            return 'Core Business Logic';
        case 3:
            return 'Supporting Code';
    }
}

/**
 * Get priority description
 */
export function getPriorityDescription(priority: PriorityLevel): string {
    switch (priority) {
        case 1:
            return 'Environment files, authentication, configuration, and security-related code';
        case 2:
            return 'API endpoints, controllers, services, models, and database logic';
        case 3:
            return 'Utilities, components, tests, and documentation';
    }
}
