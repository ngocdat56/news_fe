import { useEffect } from "react"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { HiClock, HiTag, HiShare } from "react-icons/hi"
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"
import { categoryNames, incrementArticleViews } from "../../services/supabase"

function ArticleContent({ article }) {
    if (!article) return null

    const shareUrl = window.location.href
    const articleDate = new Date(article.date)

    useEffect(() => {
        const incrementViewCount = async () => {
            try {
                console.log(
                    "Debug: Before incrementing views for article",
                    article.id
                )
                const result = await incrementArticleViews(article.id)
                console.log("Debug: Increment result", result)
            } catch (error) {
                console.error("Error incrementing view count:", error)
            }
        }

        incrementViewCount()
    }, [article.id])

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
            {/* Featured Image */}
            <div className="relative aspect-video">
                <img
                    src={article.link_image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                    <span className={`category-badge ${article.type_article}`}>
                        {categoryNames[article.type_article]}
                    </span>
                </div>
            </div>

            {/* Article Header */}
            <div className="p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                    {article.title}
                </h1>

                <div className="flex flex-wrap items-center text-dark-500 text-sm mb-6 gap-4">
                    <span className="flex items-center">
                        <HiClock className="mr-1" />
                        {format(articleDate, "MMMM d, yyyy")}
                    </span>
                    <span className="flex items-center">
                        <HiTag className="mr-1" />
                        {categoryNames[article.type_article]}
                    </span>
                    {/* Display Views */}
                    <span className="flex items-center">
                        <HiClock className="mr-1" />
                        Views: {article.total_view}
                    </span>
                </div>

                {/* Description/Summary */}
                <p className="text-lg text-dark-700 mb-8 italic border-l-4 border-primary-500 pl-4 py-2">
                    {article.description}
                </p>

                {/* Article Content */}
                <div
                    className="article-content mb-10"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Share Section */}
                <div className="border-t border-dark-100 pt-6 mt-8">
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <HiShare className="mr-2" />
                        Share this article
                    </h4>
                    <div className="flex space-x-4">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#3b5998] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                            aria-label="Share on Facebook"
                        >
                            <FaFacebook className="w-5 h-5" />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
                                article.title
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#1da1f2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                            aria-label="Share on Twitter"
                        >
                            <FaTwitter className="w-5 h-5" />
                        </a>
                        <a
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(
                                article.title
                            )}&summary=${encodeURIComponent(
                                article.description
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#0077b5] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                            aria-label="Share on LinkedIn"
                        >
                            <FaLinkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.article>
    )
}

export default ArticleContent
