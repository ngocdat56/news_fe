import ContentLoader from 'react-content-loader'

function ArticleCardSkeleton({ height = "96" }) {
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md h-${height}`}>
      <ContentLoader 
        speed={2}
        width="100%"
        height="100%"
        backgroundColor="#f3f4f6"
        foregroundColor="#e5e7eb"
      >
        {/* Image */}
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="60%" />
        
        {/* Category Badge */}
        <rect x="20" y="65%" rx="5" ry="5" width="80" height="16" />
        
        {/* Title */}
        <rect x="20" y="70%" rx="4" ry="4" width="90%" height="18" />
        <rect x="20" y="75%" rx="4" ry="4" width="70%" height="18" />
        
        {/* Description */}
        <rect x="20" y="82%" rx="3" ry="3" width="85%" height="12" />
        <rect x="20" y="86%" rx="3" ry="3" width="90%" height="12" />
        
        {/* Date */}
        <rect x="20" y="92%" rx="3" ry="3" width="120" height="12" />
      </ContentLoader>
    </div>
  )
}

export default ArticleCardSkeleton