const API_BASE_URL = "http://164.90.136.110:8002";

export async function getArticles({
    limit = 10,
    offset = 0,
    category = null,
    sortBy = "date",
    direction = "desc",
} = {}) {
    try {
        const url = new URL(`${API_BASE_URL}/articles`);
        const params = {
            limit,
            offset,
            sortBy,
            direction
        };
        
        if (category) params.category = category;

        url.search = new URLSearchParams(params).toString();

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        return {
            data: data.data,
            hasNextPage: data.hasNextPage,
            total: data.total
        };
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
    }
}

export async function getArticleById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching article:", error);
        throw error;
    }
}

export async function getRelatedArticles({ id, category, limit = 3 }) {
    try {
        const url = new URL(`${API_BASE_URL}/articles/related`);
        url.search = new URLSearchParams({ id, category, limit }).toString();

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching related articles:", error);
        throw error;
    }
}

export async function getFeaturedArticles(limit = 5) {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/featured?limit=${limit}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching featured articles:", error);
        throw error;
    }
}

export async function getTrendingArticles(limit = 4) {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/trending?limit=${limit}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching trending articles:", error);
        throw error;
    }
}

export async function getCategoryCounts() {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/categories`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching category counts:", error);
        throw error;
    }
}

export async function searchArticles(query) {
    if (!query) return [];
    
    try {
        const response = await fetch(`${API_BASE_URL}/articles/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error searching articles:", error);
        throw error;
    }
}

export async function incrementArticleViews(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/${id}/increment-views`, {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error incrementing article views:", error);
        throw error;
    }
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