import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { HiArrowDown } from 'react-icons/hi'
import { getArticles, categoryNames } from '../services/supabase'
import CategoryHeader from '../components/category/CategoryHeader'
import SortFilterControls from '../components/category/SortFilterControls'
import LatestNews from '../components/home/LatestNews'
import ArticleCardSkeleton from '../components/shared/ArticleCardSkeleton'

function CategoryPage() {
  const { category } = useParams()
  const [sort, setSort] = useState('date-desc')
  const [page, setPage] = useState(1)
  const pageSize = 9
  
  // Reset page when category changes
  useEffect(() => {
    setPage(1)
  }, [category])
  
  // Parse sort value
  const [sortField, sortDirection] = sort.split('-')
  
  // Fetch articles
  const { 
    data, 
    isLoading, 
    error,
    isFetching
  } = useQuery(
    ['categoryArticles', category, sortField, sortDirection, page],
    () => getArticles({ 
      category,
      sortBy: sortField,
      direction: sortDirection,
      limit: pageSize,
      offset: (page - 1) * pageSize
    }),
    { 
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true
    }
  )
  
  // Also fetch total count (in a real app, you might get this from an API endpoint)
  const { data: allArticles } = useQuery(
    ['allCategoryArticles', category],
    () => getArticles({ category, limit: 100 }),
    { staleTime: 5 * 60 * 1000 }
  )
  
  const articleCount = allArticles?.length || 0
  const totalPages = Math.ceil(articleCount / pageSize)
  
  const handleSortChange = (newSort) => {
    setSort(newSort)
    setPage(1) // Reset to first page when sort changes
  }
  
  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const categoryTitle = categoryNames[category] || 'Category'

  return (
    <>
      <Helmet>
        <title>{categoryTitle} News - Global News Network</title>
        <meta name="description" content={`Latest ${categoryTitle.toLowerCase()} news and updates from around the world.`} />
      </Helmet>
      
      <div className="min-h-screen bg-dark-50">
        {/* Category Header */}
        <CategoryHeader category={category} articleCount={articleCount} />
        
        <div className="container-custom py-12">
          {/* Sort Controls */}
          <div className="mb-8">
            <SortFilterControls onSortChange={handleSortChange} activeSort={sort} />
          </div>
          
          {/* Articles Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(pageSize)].map((_, index) => (
                <ArticleCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="p-8 text-center bg-red-50 rounded-lg">
              <p className="text-red-600">Failed to load articles. Please try again later.</p>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <LatestNews articles={data || []} isLoading={false} error={null} />
              </motion.div>
              
              {/* Pagination / Load More */}
              {page < totalPages && (
                <div className="text-center mt-12">
                  <button 
                    onClick={loadMore}
                    disabled={isFetching}
                    className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors disabled:bg-primary-400"
                  >
                    {isFetching ? 'Loading...' : (
                      <>
                        Load More <HiArrowDown className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              )}
              
              {data?.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-xl text-dark-600">No articles found in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CategoryPage