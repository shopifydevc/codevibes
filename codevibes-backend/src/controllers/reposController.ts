// ============================================================
// Repos Controller - Fetch authenticated user's repositories
// ============================================================

import type { Response } from 'express';
import { type AuthenticatedRequest } from '../utils/auth.js';
import { logger } from '../utils/logger.js';

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    private: boolean;
    stargazers_count: number;
    language: string | null;
    updated_at: string;
}

/**
 * GET /api/repos
 * Get authenticated user's repositories
 */
export async function getUserRepos(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
    }

    const githubToken = req.user.github_token;
    if (!githubToken) {
        res.status(400).json({ error: 'No GitHub token available' });
        return;
    }

    const sort = req.query.sort as string || 'updated';
    const per_page = parseInt(req.query.per_page as string, 10) || 30;

    try {
        const response = await fetch(`https://api.github.com/user/repos?sort=${sort}&per_page=${per_page}&affiliation=owner,collaborator`, {
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        if (!response.ok) {
            logger.error('GitHub API error fetching repos', { status: response.status });
            res.status(response.status).json({ error: 'Failed to fetch repositories' });
            return;
        }

        const repos = await response.json() as GitHubRepo[];

        // Return simplified repo data
        const simplified = repos.map(repo => ({
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            url: repo.html_url,
            description: repo.description,
            isPrivate: repo.private,
            stars: repo.stargazers_count,
            language: repo.language,
            updatedAt: repo.updated_at,
        }));

        res.json({ repos: simplified });
    } catch (error: any) {
        logger.error('Error fetching user repos', { error: error.message });
        res.status(500).json({ error: 'Failed to fetch repositories' });
    }
}
