import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { HiClock, HiTag, HiArrowRight } from 'react-icons/hi'
import ArticleCardSkeleton from '../shared/ArticleCardSkeleton'
import { categoryNames } from '../../services/supabase'

function LatestNews({ articles, isLoading, error }) {
  const [visibleCount, setVisibleCount] = useState(6)
  
  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 6)
  }

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
            {articles.slice(0, visibleCount).map((article) => (
              <motion.div key={article.id} variants={item} className="article-card">
                <Link to={`/article/${article.id}`} className="block overflow-hidden relative aspect-video">
                  <img 
                    src={article.link_image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`category-badge ${article.type_article}`}>
                      {categoryNames[article.type_article]}
                    </span>
                  </div>
                </Link>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    <Link to={`/article/${article.id}`} className="hover:text-primary-600 transition-colors">
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
          
          {visibleCount < articles.length && (
            <div className="text-center mt-10">
              <button 
                onClick={loadMore}
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
              >
                Load More <HiArrowRight className="ml-2" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default LatestNews