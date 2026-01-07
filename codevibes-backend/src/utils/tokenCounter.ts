// ============================================================
// Token Counter - Estimates tokens for cost calculation
// ============================================================

// Simple token estimation (tiktoken can be slow to load, so we use approximation)
// Average: ~4 characters per token for code
const CHARS_PER_TOKEN = 4;

// DeepSeek pricing (per million tokens)
const INPUT_COST_PER_MILLION = 0.14;
const OUTPUT_COST_PER_MILLION = 0.28;

/**
 * Estimate token count from text
 * Uses character-based approximation for speed
 */
export function estimateTokens(text: string): number {
    if (!text) return 0;
    return Math.ceil(text.length / CHARS_PER_TOKEN);
}

/**
 * Estimate tokens for multiple files
 */
export function estimateTokensForFiles(contents: string[]): number {
    return contents.reduce((total, content) => total + estimateTokens(content), 0);
}

/**
 * Calculate cost based on token counts
 * @param inputTokens - Tokens sent to API (files + prompts)
 * @param outputTokens - Tokens received from API (analysis response)
 * @returns Cost in USD
 */
export function calculateCost(inputTokens: number, outputTokens: number): number {
    const inputCost = (inputTokens / 1_000_000) * INPUT_COST_PER_MILLION;
    const outputCost = (outputTokens / 1_000_000) * OUTPUT_COST_PER_MILLION;
    return inputCost + outputCost;
}

/**
 * Format cost for display
 */
export function formatCost(cost: number): string {
    return `$${cost.toFixed(6)}`;
}

/**
 * Estimate average output tokens based on input complexity
 * Rough estimate: ~20% of input tokens for analysis output
 */
export function estimateOutputTokens(inputTokens: number): number {
    return Math.ceil(inputTokens * 0.2);
}

/**
 * Get full cost estimate for a set of files
 */
export function getFullEstimate(fileContents: string[]): {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    estimatedCost: number;
} {
    const inputTokens = estimateTokensForFiles(fileContents);
    const outputTokens = estimateOutputTokens(inputTokens);
    const totalTokens = inputTokens + outputTokens;
    const estimatedCost = calculateCost(inputTokens, outputTokens);

    return {
        inputTokens,
        outputTokens,
        totalTokens,
        estimatedCost,
    };
}
