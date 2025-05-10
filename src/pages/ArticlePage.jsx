import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { HiArrowLeft } from 'react-icons/hi'
import { useArticle, useRelatedArticles } from '../hooks/useArticles'
import { categoryNames } from '../services/supabase'
import ArticleContent from '../components/article/ArticleContent'
import RelatedArticles from '../components/article/RelatedArticles'
import ArticleCardSkeleton from '../components/shared/ArticleCardSkeleton'
import { parseArticleUrl, generateArticleUrl } from '../utils/urlUtils'

function ArticlePage() {
  const { category, slug } = useParams()
  const navigate = useNavigate()
  
  // Extract article ID from slug
  const articleInfo = parseArticleUrl(`/article/${category}/${slug}`)
  const id = articleInfo?.id
  
  // Fetch article
  const { 
    data: article, 
    isLoading, 
    error 
  } = useArticle(id)
  
  // Redirect if URL doesn't match the canonical form
  useEffect(() => {
    if (article) {
      const canonicalUrl = generateArticleUrl(article)
      const currentUrl = `/article/${category}/${slug}`
      if (canonicalUrl !== currentUrl) {
        navigate(canonicalUrl, { replace: true })
      }
    }
  }, [article, category, slug, navigate])
  
  // Fetch related articles
  const {
    data: relatedArticles,
    isLoading: isRelatedLoading,
    error: relatedError
  } = useRelatedArticles({
    id: id,
    category: article?.type_article
  })

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <ArticleCardSkeleton height="screen/2" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="p-8 text-center bg-red-50 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Article Not Found</h2>
          <p className="text-red-600 mb-6">The article you are looking for might have been removed or is temporarily unavailable.</p>
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
          >
            <HiArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (!article) return null

  const categoryLabel = categoryNames[article.type_article] || 'Category'

  return (
    <>
      <Helmet>
        <title>{article.title} - Global News Network</title>
        <meta name="description" content={article.description} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.link_image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:image" content={article.link_image} />
      </Helmet>
      
      <div className="min-h-screen bg-dark-50 py-12">
        <div className="container-custom">
          <div className="mb-8">
            <Link 
              to={`/category/${article.type_article}`}
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <HiArrowLeft className="mr-2" /> Back to {categoryLabel}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Article Content */}
            <div className="lg:col-span-2">
              <ArticleContent article={article} />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-primary-500 mr-2"></span>
                  Related Articles
                </h2>
                
                <RelatedArticles 
                  articles={relatedArticles || []}
                  isLoading={isRelatedLoading}
                  error={relatedError}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticlePage