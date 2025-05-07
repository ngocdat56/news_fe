import { useQuery } from "react-query"
import {
    getArticles,
    getArticleById,
    getRelatedArticles,
    getFeaturedArticles,
    getTrendingArticles,
} from "../services/supabase"

export function useArticles(options = {}) {
    return useQuery(["articles", options], () => getArticles(options), {
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

export function useArticle(id) {
    return useQuery(["article", id], () => getArticleById(id), {
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

export function useRelatedArticles({ id, category }) {
    return useQuery(
        ["relatedArticles", id, category],
        () => getRelatedArticles({ id, category }),
        {
            enabled: !!id && !!category,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    )
}

export function useFeaturedArticles() {
    return useQuery("featuredArticles", () => getFeaturedArticles(), {
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

export function useTrendingArticles() {
    return useQuery("trendingArticles", () => getTrendingArticles(), {
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

export async function incrementArticleViews(id) {
    const currentDate = new Date().toISOString().split("T")[0] // Get today's date in YYYY-MM-DD format

    try {
        // Increment total_view and daily_view for the specific article
        const { data, error } = await supabase.from("articles").upsert(
            [
                {
                    id: id,
                    total_view: supabase.raw("total_view + 1"),
                    daily_view: supabase.raw(
                        "CASE WHEN date(created_at) = ? THEN daily_view + 1 ELSE 1 END",
                        [currentDate]
                    ),
                },
            ],
            { onConflict: ["id"] }
        ) // Ensure conflict on article ID, meaning if article already exists, update it

        if (error) {
            console.error("Error updating view counts:", error)
            throw new Error("Failed to increment view counts")
        }
        return data
    } catch (error) {
        console.error("Error incrementing article views:", error)
        throw new Error("Failed to increment views")
    }
}
