import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Helmet>
        <title>Liên Hệ - Mạng Tin Tức Toàn Cầu</title>
        <meta name="description" content="Liên hệ với chúng tôi để được hỗ trợ hoặc gửi phản hồi." />
      </Helmet>
      
      <div className="min-h-screen bg-dark-50 py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h1 className="text-3xl font-bold mb-6">Liên Hệ Với Chúng Tôi</h1>
              <p className="text-dark-600 mb-8">
                Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn. Hãy liên hệ với chúng tôi 
                qua các kênh dưới đây hoặc điền vào form liên hệ.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <HiLocationMarker className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Địa Chỉ</h3>
                    <p className="text-dark-600">
                      123 Đường Tin Tức<br />
                      Quận 1, TP.HCM<br />
                      Việt Nam
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <HiPhone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Điện Thoại</h3>
                    <p className="text-dark-600">
                      +84 (28) 1234 5678<br />
                      +84 (28) 8765 4321
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <HiMail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p className="text-dark-600">
                      info@tintuctoancau.com<br />
                      support@tintuctoancau.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Gửi Tin Nhắn</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-700 mb-1">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-dark-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-dark-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-dark-700 mb-1">
                    Chủ Đề
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-dark-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark-700 mb-1">
                    Nội Dung
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-dark-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors font-medium"
                >
                  Gửi Tin Nhắn
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default ContactPage