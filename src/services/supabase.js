// articleService.js
export async function getArticles({
    limit = 10,
    offset = 0,
    category = null,
    sortBy = "date",
    direction = "desc",
} = {}) {
    try {
        const url = new URL('http://164.90.136.110:8002/articles'); // Endpoint FastAPI
        const params = new URLSearchParams({
            limit: limit,
            offset: offset,
            category: category || '',
            sortBy: sortBy,
            direction: direction
        });

        url.search = params.toString();

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            return {
                data: data.data, // Lấy dữ liệu bài viết từ response
                hasNextPage: offset + limit < data.total,
                total: data.total
            };
        } else {
            console.error('Error fetching articles:', data);
            throw new Error("Failed to fetch articles");
        }
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw new Error("Failed to fetch articles");
    }
}

export async function getArticleById(id) {
    try {
        const response = await fetch(`http://164.90.136.110:8002/articles/${id}`);
        const data = await response.json();

        if (response.ok) {
            return data.data; // Lấy dữ liệu bài viết
        } else {
            console.error("Error fetching article:", data);
            throw new Error("Failed to fetch article");
        }
    } catch (error) {
        console.error("Error fetching article:", error);
        throw new Error("Failed to fetch article");
    }
}

export async function getRelatedArticles({ id, category, limit = 3 }) {
    try {
        const url = new URL('http://164.90.136.110:8002/articles/related'); // Endpoint FastAPI
        const params = new URLSearchParams({
            id: id,
            category: category,
            limit: limit
        });

        url.search = params.toString();

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            return data.data; // Lấy dữ liệu bài viết liên quan
        } else {
            console.error("Error fetching related articles:", data);
            throw new Error("Failed to fetch related articles");
        }
    } catch (error) {
        console.error("Error fetching related articles:", error);
        throw new Error("Failed to fetch related articles");
    }
}

export async function getFeaturedArticles(limit = 5) {
    try {
        const response = await fetch(`http://164.90.136.110:8002/articles/featured?limit=${limit}`);
        const data = await response.json();

        if (response.ok) {
            return data.data; // Lấy dữ liệu bài viết nổi bật
        } else {
            console.error("Error fetching featured articles:", data);
            throw new Error("Failed to fetch featured articles");
        }
    } catch (error) {
        console.error("Error fetching featured articles:", error);
        throw new Error("Failed to fetch featured articles");
    }
}

export async function getTrendingArticles(limit = 4) {
    try {
        const response = await fetch(`http://164.90.136.110:8002/articles/trending?limit=${limit}`);
        const data = await response.json();

        if (response.ok) {
            return data.data; // Lấy dữ liệu bài viết xu hướng
        } else {
            console.error("Error fetching trending articles:", data);
            throw new Error("Failed to fetch trending articles");
        }
    } catch (error) {
        console.error("Error fetching trending articles:", error);
        throw new Error("Failed to fetch trending articles");
    }
}

export async function getCategoryCounts() {
    try {
        const response = await fetch('http://164.90.136.110:8002/articles/categories');
        const data = await response.json();

        if (response.ok) {
            const counts = data.reduce((acc, item) => {
                acc[item.type_article] = (acc[item.type_article] || 0) + 1;
                return acc;
            }, {});

            return Object.entries(counts).map(([name, count]) => ({ name, count }));
        } else {
            console.error("Error fetching category counts:", data);
            throw new Error("Failed to fetch category counts");
        }
    } catch (error) {
        console.error("Error fetching category counts:", error);
        throw new Error("Failed to fetch category counts");
    }
}

export async function searchArticles(query) {
    if (!query) return [];

    try {
        const response = await fetch(`http://164.90.136.110:8002/articles/search?query=${query}`);
        const data = await response.json();

        if (response.ok) {
            return data.data; // Lấy dữ liệu bài viết tìm kiếm
        } else {
            console.error("Error searching articles:", data);
            throw new Error("Failed to search articles");
        }
    } catch (error) {
        console.error("Error searching articles:", error);
        throw new Error("Failed to search articles");
    }
}

export async function incrementArticleViews(id) {
    const currentDate = new Date().toISOString().split("T")[0];

    try {
        const response = await fetch(`http://164.90.136.110:8002/articles/${id}/increment-views`, {
            method: 'POST'
        });
        const data = await response.json();

        if (response.ok) {
            return { success: true, total_view: data.total_view, daily_view: data.daily_view };
        } else {
            console.error("Error updating view counts:", data);
            throw new Error("Failed to increment view counts");
        }
    } catch (error) {
        console.error("Error incrementing article views:", error);
        throw new Error("Failed to increment views");
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
