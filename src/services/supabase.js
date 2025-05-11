import { createClient } from "@supabase/supabase-js";

// Note: Since we're using FastAPI, not Supabase, we'll use fetch instead
const API_URL = process.env.REACT_APP_API_URL || "http://164.90.136.110:8000";

if (!API_URL) {
    console.error("Missing API URL!");
}

// Helper function to make API requests
async function fetchAPI(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || "API request failed");
    }
    return data;
}

// Article related functions
export async function getArticles({
    limit = 10,
    offset = 0,
    category = null,
    sortBy = "date",
    direction = "desc",
} = {}) {
    const params = new URLSearchParams({
        limit,
        offset,
        sortBy,
        direction,
    });
    if (category) {
        params.append("category", category);
    }
    const data = await fetchAPI(`/articles/?${params}`);
    return {
        data: data.data,
        hasNextPage: data.hasNextPage,
        total: data.total,
    };
}

export async function getArticleById(id) {
    return await fetchAPI(`/articles/${id}`);
}

export async function getRelatedArticles({ id, category, limit = 3 }) {
    const params = new URLSearchParams({ id, category, limit });
    return await fetchAPI(`/articles/related?${params}`);
}

export async function getFeaturedArticles(limit = 5) {
    const params = new URLSearchParams({ limit });
    return await fetchAPI(`/articles/featured?${params}`);
}

export async function getTrendingArticles(limit = 4) {
    const params = new URLSearchParams({ limit });
    return await fetchAPI(`/articles/trending?${params}`);
}

export async function getCategoryCounts() {
    return await fetchAPI("/articles/categories");
}

export async function searchArticles(query) {
    if (!query) return [];
    const params = new URLSearchParams({ query });
    return await fetchAPI(`/articles/search?${params}`);
}

export const categoryNames = {
    technology: "Technology",
    politics: "Politics",
    health: "Health",
    sports: "Sports",
    science: "Science",
    culture: "Culture",
    entertainment: "Entertainment",
};

export async function incrementArticleViews(id) {
    return await fetchAPI(`/articles/${id}/increment-views`, {
        method: "POST",
    });
}