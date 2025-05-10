import { useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { searchArticles } from '../services/supabase'
import LatestNews from '../components/home/LatestNews'
import ArticleCardSkeleton from '../components/shared/ArticleCardSkeleton'

function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  const { 
    data: articles, 
    isLoading, 
    error 
  } = useQuery(
    ['search', query],
    () => searchArticles(query),
    {
      enabled: !!query,
      staleTime: 5 * 60 * 1000
    }
  )

  return (
    <>
      <Helmet>
        <title>{`Tìm kiếm: ${query || ''} - Mạng Tin Tức Toàn Cầu`}</title>
        <meta name="description" content={`Kết quả tìm kiếm cho "${query}"`} />
      </Helmet>
      
      <div className="min-h-screen bg-dark-50 py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">Kết quả tìm kiếm</h1>
            <p className="text-dark-600 mb-8">
              {query ? `Hiển thị kết quả cho "${query}"` : 'Vui lòng nhập từ khóa tìm kiếm'}
            </p>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <ArticleCardSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="p-8 text-center bg-red-50 rounded-lg">
                <p className="text-red-600">Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại sau.</p>
              </div>
            ) : articles?.length > 0 ? (
              <LatestNews articles={articles} isLoading={false} error={null} />
            ) : (
              <div className="p-8 text-center bg-dark-50 rounded-lg">
                <p className="text-dark-600">Không tìm thấy kết quả nào phù hợp.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default SearchPage