import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import { HiClock, HiTag } from 'react-icons/hi'
import 'swiper/css'
import 'swiper/css/pagination'
import ArticleCardSkeleton from '../shared/ArticleCardSkeleton'
import { categoryNames } from '../../services/supabase'
import { generateArticleUrl } from '../../utils/urlUtils'

function FeaturedCarousel({ articles, isLoading, error }) {
  const swiperRef = useRef(null)

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper
    if (!swiperInstance) return
    
    const el = swiperRef.current
    
    const handleMouseEnter = () => {
      swiperInstance.autoplay.stop()
    }
    
    const handleMouseLeave = () => {
      swiperInstance.autoplay.start()
    }
    
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-lg">
        <p className="text-red-600">Failed to load featured articles. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="featured-carousel relative">
      {isLoading ? (
        <div className="h-[300px]">
          <ArticleCardSkeleton height="full" />
        </div>
      ) : (
        <Swiper
          ref={swiperRef}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="h-[300px] rounded-xl overflow-hidden bg-primary-900"
        >
          {articles.map((article) => (
            <SwiperSlide key={article.id} className="relative">
              <div className="h-full flex flex-col justify-center p-6 md:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-white max-w-3xl mx-auto text-center"
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-accent-500 text-white text-sm font-medium mb-4">
                    {categoryNames[article.type_article]}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">
                    <Link to={generateArticleUrl(article)} className="hover:underline">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-white/80 text-base md:text-lg mb-4 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-center text-white/70 text-sm space-x-4 mb-6">
                    <span className="flex items-center">
                      <HiClock className="mr-1" />
                      {format(new Date(article.date), 'MMM d, yyyy')}
                    </span>
                    <span className="flex items-center">
                      <HiTag className="mr-1" />
                      {categoryNames[article.type_article]}
                    </span>
                  </div>
                  <Link 
                    to={generateArticleUrl(article)}
                    className="inline-block px-6 py-2 bg-white text-primary-900 font-medium rounded-md hover:bg-white/90 transition-colors"
                  >
                    Read More
                  </Link>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default FeaturedCarousel