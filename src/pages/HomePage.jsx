import { useState } from "react"
import { useQuery } from "react-query"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { getArticles } from "../services/supabase"
import { useFeaturedArticles, useTrendingArticles } from "../hooks/useArticles"
import FeaturedCarousel from "../components/home/FeaturedCarousel"
import LatestNews from "../components/home/LatestNews"
import CategoryPreview from "../components/home/CategoryPreview"
import TrendingSidebar from "../components/home/TrendingSidebar"

function HomePage() {
    const [visibleCount, setVisibleCount] = useState(6)
    const [selectedCategory, setSelectedCategory] = useState("technology")

    // Query for featured articles
    const {
        data: featuredArticles,
        isLoading: isFeaturedLoading,
        error: featuredError,
    } = useFeaturedArticles()

    // Query for latest articles with pagination
    const {
        data: latestArticles,
        isLoading: isLatestLoading,
        error: latestError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useQuery(
        ["latestArticles", visibleCount],
        () => getArticles({ 
            limit: visibleCount, 
            sortBy: "date", 
            direction: "desc" 
        }),
        { 
            staleTime: 5 * 60 * 1000,
            keepPreviousData: true,
        }
    )

    // Query for trending articles
    const {
        data: trendingArticles,
        isLoading: isTrendingLoading,
        error: trendingError,
    } = useTrendingArticles()

    // Query for category articles
    const {
        data: categoryArticles,
        isLoading: isCategoryLoading,
        error: categoryError,
    } = useQuery(
        ["categoryArticles", selectedCategory],
        () => getArticles({ category: selectedCategory, limit: 3 }),
        { staleTime: 5 * 60 * 1000 }
    )

    const loadMore = () => {
        setVisibleCount(prev => prev + 6)
    }

    // Additional categories to preview
    const additionalCategories = ["politics", "health", "sports"]

    // Queries for additional category previews
    const categoryQueries = additionalCategories.map(category => {
        return useQuery(
            ["categoryPreview", category],
            () => getArticles({ category, limit: 3 }),
            { staleTime: 5 * 60 * 1000 }
        )
    })

    return (
        <>
            <Helmet>
                <title>Mạng Tin Tức Toàn Cầu - Tin Mới Nhất và Tiêu Điểm</title>
                <meta
                    name="description"
                    content="Cập nhật tin tức mới nhất từ khắp nơi trên thế giới - công nghệ, chính trị, sức khỏe, thể thao và nhiều hơn nữa."
                />
            </Helmet>

            <div className="min-h-screen bg-dark-50">
                {/* Featured Articles Carousel */}
                <section className="mb-12">
                    <FeaturedCarousel
                        articles={featuredArticles || []}
                        isLoading={isFeaturedLoading}
                        error={featuredError}
                    />
                </section>

                <div className="container-custom">
                    {/* Latest News Section */}
                    <section className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-between mb-8"
                        >
                            <h2 className="text-3xl font-bold">Tin Mới Nhất</h2>
                        </motion.div>

                        <LatestNews
                            articles={latestArticles || []}
                            isLoading={isLatestLoading}
                            error={latestError}
                            onLoadMore={loadMore}
                            hasMore={hasNextPage}
                            isLoadingMore={isFetchingNextPage}
                        />
                    </section>

                    {/* Category Sections */}
                    <section className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <h2 className="text-3xl font-bold mb-2">
                                Khám Phá Theo Danh Mục
                            </h2>
                            <p className="text-dark-600">
                                Khám phá tin tức từ các danh mục yêu thích của
                                bạn
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                {additionalCategories.map((category, index) => (
                                    <CategoryPreview
                                        key={category}
                                        category={category}
                                        articles={
                                            categoryQueries[index].data || []
                                        }
                                        isLoading={
                                            categoryQueries[index].isLoading
                                        }
                                        error={categoryQueries[index].error}
                                    />
                                ))}
                            </div>

                            <div className="lg:col-span-1">
                                <TrendingSidebar
                                    articles={trendingArticles || []}
                                    isLoading={isTrendingLoading}
                                    error={trendingError}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Newsletter Section */}
                    <section className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-primary-900 text-white rounded-xl p-8 md:p-12"
                        >
                            <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Luôn Cập Nhật
                                </h2>
                                <p className="text-primary-100 mb-8">
                                    Đăng ký nhận bản tin của chúng tôi để không
                                    bỏ lỡ những tin tức và cập nhật mới nhất
                                    được gửi trực tiếp đến hộp thư của bạn.
                                </p>
                                <form className="flex flex-col sm:flex-row max-w-lg mx-auto">
                                    <input
                                        type="email"
                                        placeholder="Địa chỉ email của bạn"
                                        className="flex-1 px-4 py-3 rounded-l sm:rounded-r-none mb-2 sm:mb-0 text-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-r sm:rounded-l-none font-medium transition-colors"
                                    >
                                        Đăng Ký
                                    </button>
                                </form>
                                <p className="text-primary-200 text-sm mt-4">
                                    Chúng tôi tôn trọng quyền riêng tư của bạn.
                                    Hủy đăng ký bất cứ lúc nào.
                                </p>
                            </div>
                        </motion.div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default HomePage