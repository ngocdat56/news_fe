import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Điều Khoản Dịch Vụ - Mạng Tin Tức Toàn Cầu</title>
        <meta name="description" content="Điều khoản và điều kiện sử dụng dịch vụ của chúng tôi." />
      </Helmet>
      
      <div className="min-h-screen bg-dark-50 py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-8"
          >
            <h1 className="text-3xl font-bold mb-6">Điều Khoản Dịch Vụ</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Bằng cách truy cập và sử dụng trang web của chúng tôi, bạn đồng ý tuân theo các điều 
                khoản và điều kiện sau đây.
              </p>

              <h2>1. Điều Khoản Sử Dụng</h2>
              <p>
                Khi sử dụng trang web của chúng tôi, bạn đồng ý:
              </p>
              <ul>
                <li>Tuân thủ tất cả luật pháp hiện hành</li>
                <li>Không vi phạm quyền của người khác</li>
                <li>Không gửi spam hoặc nội dung độc hại</li>
                <li>Không cố gắng phá hoại hệ thống</li>
              </ul>

              <h2>2. Tài Khoản Người Dùng</h2>
              <p>
                Khi tạo tài khoản, bạn phải:
              </p>
              <ul>
                <li>Cung cấp thông tin chính xác và đầy đủ</li>
                <li>Bảo mật thông tin đăng nhập</li>
                <li>Thông báo ngay khi phát hiện truy cập trái phép</li>
                <li>Chịu trách nhiệm về mọi hoạt động từ tài khoản của mình</li>
              </ul>

              <h2>3. Nội Dung</h2>
              <p>
                Tất cả nội dung trên trang web:
              </p>
              <ul>
                <li>Được bảo vệ bởi bản quyền</li>
                <li>Không được sao chép khi chưa được phép</li>
                <li>Có thể được thay đổi mà không cần thông báo</li>
                <li>Không đảm bảo độ chính xác tuyệt đối</li>
              </ul>

              <h2>4. Bình Luận và Tương Tác</h2>
              <p>
                Khi đăng bình luận hoặc tương tác, bạn không được:
              </p>
              <ul>
                <li>Đăng nội dung phỉ báng hoặc xúc phạm</li>
                <li>Vi phạm quyền sở hữu trí tuệ</li>
                <li>Quảng cáo hoặc spam</li>
                <li>Gây hấn hoặc quấy rối người khác</li>
              </ul>

              <h2>5. Giới Hạn Trách Nhiệm</h2>
              <p>
                Chúng tôi không chịu trách nhiệm về:
              </p>
              <ul>
                <li>Thiệt hại gián tiếp từ việc sử dụng dịch vụ</li>
                <li>Nội dung của các trang web liên kết</li>
                <li>Gián đoạn dịch vụ do yếu tố khách quan</li>
                <li>Hành động của người dùng khác</li>
              </ul>

              <h2>6. Thay Đổi Điều Khoản</h2>
              <p>
                Chúng tôi có quyền:
              </p>
              <ul>
                <li>Thay đổi điều khoản bất kỳ lúc nào</li>
                <li>Thông báo về các thay đổi quan trọng</li>
                <li>Yêu cầu chấp nhận điều khoản mới để tiếp tục sử dụng</li>
              </ul>

              <h2>7. Chấm Dứt Dịch Vụ</h2>
              <p>
                Chúng tôi có quyền:
              </p>
              <ul>
                <li>Đình chỉ hoặc xóa tài khoản vi phạm</li>
                <li>Từ chối cung cấp dịch vụ</li>
                <li>Thay đổi hoặc ngừng dịch vụ</li>
              </ul>

              <h2>8. Liên Hệ</h2>
              <p>
                Nếu bạn có thắc mắc về điều khoản dịch vụ, vui lòng liên hệ:
              </p>
              <ul>
                <li>Email: terms@tintuctoancau.com</li>
                <li>Điện thoại: +84 (28) 1234 5678</li>
                <li>Địa chỉ: 123 Đường Tin Tức, Quận 1, TP.HCM</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default TermsPage