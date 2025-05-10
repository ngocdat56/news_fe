import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Về Chúng Tôi - Mạng Tin Tức Toàn Cầu</title>
        <meta name="description" content="Tìm hiểu thêm về Mạng Tin Tức Toàn Cầu - nguồn tin tức đáng tin cậy của bạn." />
      </Helmet>
      
      <div className="min-h-screen bg-dark-50 py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="relative h-[300px]">
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                alt="Về Chúng Tôi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-8">
                  <h1 className="text-4xl font-bold text-white mb-2">Về Chúng Tôi</h1>
                  <p className="text-white/80 text-lg">Kết nối bạn với tin tức toàn cầu</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <h2>Sứ Mệnh Của Chúng Tôi</h2>
                <p>
                  Mạng Tin Tức Toàn Cầu ra đời với sứ mệnh mang đến cho độc giả những thông tin chính xác, 
                  kịp thời và đa chiều về các sự kiện đang diễn ra trên toàn thế giới. Chúng tôi tin rằng 
                  thông tin chính xác là nền tảng cho một xã hội dân chủ và tiến bộ.
                </p>

                <h2>Giá Trị Cốt Lõi</h2>
                <ul>
                  <li>Chính xác và khách quan trong báo cáo</li>
                  <li>Độc lập trong quan điểm biên tập</li>
                  <li>Tôn trọng sự đa dạng và bao trùm</li>
                  <li>Đổi mới không ngừng trong cách thức truyền tải thông tin</li>
                </ul>

                <h2>Đội Ngũ Của Chúng Tôi</h2>
                <p>
                  Đội ngũ của chúng tôi bao gồm các nhà báo, biên tập viên và chuyên gia công nghệ 
                  giàu kinh nghiệm, làm việc 24/7 để đảm bảo độc giả luôn được cập nhật những tin 
                  tức mới nhất và quan trọng nhất.
                </p>

                <h2>Cam Kết Chất Lượng</h2>
                <p>
                  Chúng tôi cam kết duy trì các tiêu chuẩn cao nhất trong báo chí, tuân thủ đạo đức 
                  nghề nghiệp và liên tục cải tiến để đáp ứng nhu cầu ngày càng cao của độc giả 
                  trong kỷ nguyên số.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default AboutPage