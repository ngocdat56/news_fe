import { motion } from 'framer-motion'
import { categoryNames } from '../../services/supabase'

function CategoryHeader({ category, articleCount }) {
  // Map of background images for each category
  const backgroundImages = {
    technology: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    politics: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg',
    health: 'https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg',
    sports: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    science: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg',
    culture: 'https://images.pexels.com/photos/2774546/pexels-photo-2774546.jpeg',
    entertainment: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg'
  }

  // Map of theme colors for each category
  const categoryColors = {
    technology: 'from-blue-900/80 to-blue-900/30',
    politics: 'from-red-900/80 to-red-900/30',
    health: 'from-green-900/80 to-green-900/30',
    sports: 'from-orange-900/80 to-orange-900/30',
    science: 'from-purple-900/80 to-purple-900/30',
    culture: 'from-pink-900/80 to-pink-900/30',
    entertainment: 'from-yellow-900/80 to-yellow-900/30'
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-[300px] md:h-[400px] flex items-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImages[category] || 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg'} 
          alt={categoryNames[category] || 'Category'}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${categoryColors[category] || 'from-dark-900/80 to-dark-900/30'}`}></div>
      </div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {categoryNames[category] || 'Category'} News
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl text-white/80 max-w-xl"
        >
          Discover the latest {categoryNames[category].toLowerCase()} news and insights from around the world.
          {articleCount !== undefined && <span> Showing {articleCount} articles.</span>}
        </motion.p>
      </div>
    </motion.section>
  )
}

export default CategoryHeader