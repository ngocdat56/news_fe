import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase credentials!")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Article related functions
export async function getArticles({
    limit = 10,
    offset = 0,
    category = null,
    sortBy = "date",
    direction = "desc",
} = {}) {
    let query = supabase
        .from("articles")
        .select("*")
        .order(sortBy, { ascending: direction === "asc" })
        .range(offset, offset + limit - 1)

    if (category) {
        query = query.eq("type_article", category)
    }

    const { data, error } = await query

    if (error) {
        console.error("Error fetching articles:", error)
        throw new Error("Failed to fetch articles")
    }

    return data
}

export async function getArticleById(id) {
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        console.error("Error fetching article:", error)
        throw new Error("Failed to fetch article")
    }

    return data
}

export async function getRelatedArticles({ id, category, limit = 3 }) {
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("type_article", category)
        .neq("id", id)
        .limit(limit)

    if (error) {
        console.error("Error fetching related articles:", error)
        throw new Error("Failed to fetch related articles")
    }

    return data
}

export async function getFeaturedArticles(limit = 5) {
    // For demo purposes, we'll just get the latest articles
    // In a real app, you might have a featured field or algorithm
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("date", { ascending: false })
        .limit(limit)

    if (error) {
        console.error("Error fetching featured articles:", error)
        throw new Error("Failed to fetch featured articles")
    }

    return data
}

export async function getTrendingArticles(limit = 4) {
    // For demo purposes, just getting some articles
    // In a real app, this might be based on view counts, shares, etc.
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit)

    if (error) {
        console.error("Error fetching trending articles:", error)
        throw new Error("Failed to fetch trending articles")
    }

    return data
}

export async function getCategoryCounts() {
    const { data, error } = await supabase
        .from("articles")
        .select("type_article")

    if (error) {
        console.error("Error fetching category counts:", error)
        throw new Error("Failed to fetch category counts")
    }

    // Count occurrences of each category
    const counts = data.reduce((acc, item) => {
        acc[item.type_article] = (acc[item.type_article] || 0) + 1
        return acc
    }, {})

    return Object.entries(counts).map(([name, count]) => ({ name, count }))
}

export async function searchArticles(query) {
    // Basic search implementation
    // In a production app, you might use Supabase's full-text search or a dedicated search service
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .or(
            `title.ilike.%${query}%,description.ilike.%${query}%,content.ilike.%${query}%`
        )
        .limit(10)

    if (error) {
        console.error("Error searching articles:", error)
        throw new Error("Failed to search articles")
    }

    return data
}

export const categoryNames = {
    technology: "Technology",
    politics: "Politics",
    health: "Health",
    sports: "Sports",
    science: "Science",
    culture: "Culture",
    entertainment: "Entertainment",
}

export async function incrementArticleViews(id) {
    const currentDate = new Date().toISOString().split("T")[0] // YYYY-MM-DD

    try {
        // Fetch current view counts and created_at date
        const { data: article, error: selectError } = await supabase
            .from("articles")
            .select("total_view, daily_view, created_at")
            .eq("id", id)
            .single()

        if (selectError) {
            console.error("Error fetching current view counts:", selectError)
            throw new Error("Failed to fetch current view counts")
        }

        const newTotal = (article.total_view || 0) + 1
        const articleDate = article.created_at
            ? article.created_at.split("T")[0]
            : currentDate
        const newDaily =
            articleDate === currentDate ? (article.daily_view || 0) + 1 : 1

        // Update the article record with new view counts
        const { error: updateError } = await supabase
            .from("articles")
            .update({
                total_view: newTotal,
                daily_view: newDaily,
            })
            .eq("id", id)

        if (updateError) {
            console.error("Error updating view counts:", updateError)
            throw new Error("Failed to increment view counts")
        }

        // Return a success message or status if needed
        return { success: true, total_view: newTotal, daily_view: newDaily }
    } catch (error) {
        console.error("Error incrementing article views:", error)
        throw new Error("Failed to increment views")
    }
}
