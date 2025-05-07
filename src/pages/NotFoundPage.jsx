import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { HiArrowLeft } from 'react-icons/hi'

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Global News Network</title>
        <meta name="description" content="The page you are looking for might have been removed or is temporarily unavailable." />
      </Helmet>
      
      <div className="min-h-screen bg-dark-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center"
        >
          <h1 className="text-primary-600 text-9xl font-bold mb-2">404</h1>
          <h2 className="text-2xl font-bold text-dark-900 mb-4">Page Not Found</h2>
          <p className="text-dark-600 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
          >
            <HiArrowLeft className="mr-2" /> Back to Home
          </Link>
        </motion.div>
      </div>
    </>
  )
}

export default NotFoundPage