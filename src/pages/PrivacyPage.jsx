import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Chính Sách Bảo Mật - Mạng Tin Tức Toàn Cầu</title>
        <meta name="description" content="Tìm hiểu về cách chúng tôi bảo vệ thông tin cá nhân của bạn." />
      </Helmet>
      
      <div className="min-h-screen bg-dark-50 py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-8"
          >
            <h1 className="text-3xl font-bold mb-6">Chính Sách Bảo Mật</h1>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin 
                cá nhân của bạn khi bạn sử dụng trang web của chúng tôi.
              </p>

              <h2>Thu Thập Thông Tin</h2>
              <p>
                Chúng tôi thu thập các thông tin sau đây:
              </p>
              <ul>
                <li>Thông tin cá nhân (tên, email, số điện thoại)</li>
                <li>Thông tin đăng nhập</li>
                <li>Dữ liệu về thiết bị và trình duyệt</li>
                <li>Thông tin về cách bạn sử dụng trang web</li>
              </ul>

              <h2>Sử Dụng Thông Tin</h2>
              <p>
                Chúng tôi sử dụng thông tin thu thập được để:
              </p>
              <ul>
                <li>Cung cấp và cải thiện dịch vụ</li>
                <li>Gửi thông báo và cập nhật</li>
                <li>Phân tích và tối ưu hóa trải nghiệm người dùng</li>
                <li>Bảo mật tài khoản</li>
              </ul>

              <h2>Bảo Vệ Thông Tin</h2>
              <p>
                Chúng tôi áp dụng các biện pháp bảo mật sau:
              </p>
              <ul>
                <li>Mã hóa dữ liệu</li>
                <li>Kiểm soát truy cập</li>
                <li>Giám sát an ninh liên tục</li>
                <li>Đào tạo nhân viên về bảo mật</li>
              </ul>

              <h2>Cookie và Công Nghệ Theo Dõi</h2>
              <p>
                Chúng tôi sử dụng cookie và các công nghệ tương tự để:
              </p>
              <ul>
                <li>Ghi nhớ tùy chọn của bạn</li>
                <li>Phân tích lưu lượng truy cập</li>
                <li>Cải thiện hiệu suất trang web</li>
                <li>Cung cấp nội dung phù hợp</li>
              </ul>

              <h2>Chia Sẻ Thông Tin</h2>
              <p>
                Chúng tôi không bán thông tin cá nhân của bạn. Thông tin chỉ được chia sẻ trong các 
                trường hợp sau:
              </p>
              <ul>
                <li>Khi có yêu cầu pháp lý</li>
                <li>Với đối tác cung cấp dịch vụ được ủy quyền</li>
                <li>Khi cần thiết để bảo vệ quyền lợi của chúng tôi</li>
              </ul>

              <h2>Quyền của Người Dùng</h2>
              <p>
                Bạn có các quyền sau đối với thông tin cá nhân:
              </p>
              <ul>
                <li>Quyền truy cập và chỉnh sửa</li>
                <li>Quyền xóa dữ liệu</li>
                <li>Quyền hạn chế xử lý</li>
                <li>Quyền phản đối</li>
              </ul>

              <h2>Cập Nhật Chính Sách</h2>
              <p>
                Chính sách này có thể được cập nhật theo thời gian. Chúng tôi sẽ thông báo về các 
                thay đổi quan trọng qua email hoặc thông báo trên trang web.
              </p>

              <h2>Liên Hệ</h2>
              <p>
                Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ:
              </p>
              <ul>
                <li>Email: privacy@tintuctoancau.com</li>
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

export default PrivacyPage