import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { HiClock, HiTag, HiArrowRight } from 'react-icons/hi'
import ArticleCardSkeleton from '../shared/ArticleCardSkeleton'
import { categoryNames } from '../../services/supabase'
import { generateArticleUrl } from '../../utils/urlUtils'

function LatestNews({ articles, isLoading, error, onLoadMore, hasMore, isLoadingMore }) {
  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-lg">
        <p className="text-red-600">Failed to load latest articles. Please try again later.</p>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="latest-news">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
          >
            {articles.map((article) => (
              <motion.div key={article.id} variants={item} className="article-card">
                <div className="p-5">
                  <span className={`category-badge ${article.type_article} mb-3 inline-block`}>
                    {categoryNames[article.type_article]}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">
                    <Link to={generateArticleUrl(article)} className="hover:text-primary-600 transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-dark-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center text-dark-500 text-sm space-x-4">
                    <span className="flex items-center">
                      <HiClock className="mr-1" />
                      {format(new Date(article.date), 'MMM d, yyyy')}
                    </span>
                    <span className="flex items-center">
                      <HiTag className="mr-1" />
                      {categoryNames[article.type_article]}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {hasMore && (
            <div className="text-center mt-10">
              <button 
                onClick={onLoadMore}
                disabled={isLoadingMore}
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors disabled:bg-primary-400"
              >
                {isLoadingMore ? 'Loading...' : (
                  <>
                    Load More <HiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default LatestNews