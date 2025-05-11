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

    if (category) {
        query = query.eq("type_article", category)
    }

    // First get the total count
    const { count } = await query.count()

    // Then get the paginated data
    const { data, error } = await query
        .range(offset, offset + limit - 1)

    if (error) {
        console.error("Error fetching articles:", error)
        throw new Error("Failed to fetch articles")
    }

    return {
        data,
        hasNextPage: offset + limit < count,
        total: count
    }
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
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("total_view", { ascending: false })
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

    const counts = data.reduce((acc, item) => {
        acc[item.type_article] = (acc[item.type_article] || 0) + 1
        return acc
    }, {})

    return Object.entries(counts).map(([name, count]) => ({ name, count }))
}

export async function searchArticles(query) {
    if (!query) return []
    
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .order("date", { ascending: false })
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
    const currentDate = new Date().toISOString().split("T")[0]

    try {
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

        return { success: true, total_view: newTotal, daily_view: newDaily }
    } catch (error) {
        console.error("Error incrementing article views:", error)
        throw new Error("Failed to increment views")
    }
}