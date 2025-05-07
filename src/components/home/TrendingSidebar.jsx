import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import ArticleCardSkeleton from '../shared/ArticleCardSkeleton'
import { categoryNames } from '../../services/supabase'

function TrendingSidebar({ articles, isLoading, error }) {
  if (error) {
    return (
      <div className="p-4 text-center bg-red-50 rounded-lg">
        <p className="text-red-600">Failed to load trending articles.</p>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }

  const item = {
    hidden: { opacity: 0, x: 10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  }

  return (
    <div className="trending-sidebar bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="inline-block w-4 h-4 rounded-full bg-accent-500 mr-2"></span>
        Trending Now
      </h2>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <ArticleCardSkeleton key={index} height="24" />
          ))}
        </div>
      ) : (
        <motion.div 
          className="space-y-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {articles.map((article, index) => (
            <motion.div 
              key={article.id} 
              variants={item}
              className="flex gap-4 pb-5 border-b border-dark-100 last:border-0 last:pb-0"
            >
              <div className="flex-none w-10 h-10 flex items-center justify-center bg-dark-100 rounded-full text-dark-700 font-bold text-lg">
                {index + 1}
              </div>
              <div>
                <span className={`category-badge ${article.type_article} mb-2`}>
                  {categoryNames[article.type_article]}
                </span>
                <h3 className="font-semibold line-clamp-2 mb-1">
                  <Link 
                    to={`/article/${article.id}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>
                <span className="text-dark-500 text-xs">
                  {format(new Date(article.date), 'MMM d, yyyy')}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default TrendingSidebar