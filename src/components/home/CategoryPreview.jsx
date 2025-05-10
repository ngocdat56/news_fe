import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import ArticleCardSkeleton from '../shared/ArticleCardSkeleton'
import { categoryNames } from '../../services/supabase'
import { generateArticleUrl } from '../../utils/urlUtils'

function CategoryPreview({ category, articles, isLoading, error }) {
  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-lg">
        <p className="text-red-600">Failed to load category articles. Please try again later.</p>
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

  const categoryColor = getCategoryColor(category)

  return (
    <div className="category-preview bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <span 
            className="inline-block w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: categoryColor }}
          ></span>
          {categoryNames[category] || 'Category'}
        </h2>
        <Link 
          to={`/category/${category}`}
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center transition-colors"
        >
          View All <HiArrowRight className="ml-1" />
        </Link>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, index) => (
            <ArticleCardSkeleton key={index} height="24" />
          ))}
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {articles.slice(0, 3).map((article) => (
            <motion.div 
              key={article.id} 
              variants={item}
              className="pb-4 border-b border-dark-100 last:border-0 last:pb-0"
            >
              <div>
                <span className={`category-badge ${article.type_article} mb-2 inline-block`}>
                  {categoryNames[article.type_article]}
                </span>
                <h3 className="text-lg font-semibold mb-2">
                  <Link 
                    to={generateArticleUrl(article)}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="text-dark-600 text-sm mb-2 line-clamp-2">
                  {article.description}
                </p>
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

// Helper function to get category color
function getCategoryColor(category) {
  const colorMap = {
    technology: '#3B82F6', // blue
    politics: '#EF4444',   // red
    health: '#10B981',     // green
    sports: '#F97316',     // orange
    science: '#8B5CF6',    // purple
    culture: '#EC4899',    // pink
    entertainment: '#F59E0B' // amber
  }
  
  return colorMap[category] || '#64748B' // default slate
}

export default CategoryPreview