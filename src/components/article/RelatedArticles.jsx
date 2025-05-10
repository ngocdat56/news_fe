import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import ArticleCardSkeleton from '../shared/ArticleCardSkeleton'
import { categoryNames } from '../../services/supabase'
import { generateArticleUrl } from '../../utils/urlUtils'

function RelatedArticles({ articles, isLoading, error }) {
  if (error) {
    return (
      <div className="p-4 text-center bg-red-50 rounded-lg">
        <p className="text-red-600">Failed to load related articles.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[...Array(3)].map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-dark-500">No related articles found.</p>
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <motion.div 
      className="space-y-5"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {articles.map((article) => (
        <motion.div 
          key={article.id} 
          variants={item}
          className="pb-5 border-b border-dark-100 last:border-0 last:pb-0"
        >
          <span className={`category-badge ${article.type_article} mb-2 inline-block`}>
            {categoryNames[article.type_article]}
          </span>
          <h3 className="font-semibold mb-2">
            <Link 
              to={generateArticleUrl(article)}
              className="hover:text-primary-600 transition-colors"
            >
              {article.title}
            </Link>
          </h3>
          <p className="text-dark-600 text-sm mb-2">
            {article.description}
          </p>
          <span className="text-dark-500 text-xs">
            {format(new Date(article.date), 'MMM d, yyyy')}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default RelatedArticles