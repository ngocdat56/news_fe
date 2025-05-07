import { Link } from "react-router-dom"
import { HiMail } from "react-icons/hi"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"
import { categoryNames } from "../../services/supabase"

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-dark-900 text-white pt-16 pb-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* About column */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-white">
                            Mạng Tin Tức Toàn Cầu
                        </h2>
                        <p className="text-dark-300 mb-4">
                            Cung cấp tin tức chính xác, kịp thời và sâu sắc từ
                            khắp nơi trên thế giới để giúp bạn cập nhật những
                            vấn đề quan trọng nhất.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="text-dark-300 hover:text-primary-400 transition-colors"
                            >
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                aria-label="Twitter"
                                className="text-dark-300 hover:text-primary-400 transition-colors"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="text-dark-300 hover:text-primary-400 transition-colors"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="text-dark-300 hover:text-primary-400 transition-colors"
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Categories column */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-white">
                            Danh Mục
                        </h2>
                        <ul className="space-y-2">
                            {Object.entries(categoryNames).map(
                                ([slug, name]) => (
                                    <li key={slug}>
                                        <Link
                                            to={`/category/${slug}`}
                                            className="text-dark-300 hover:text-white transition-colors"
                                        >
                                            {name}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Quick Links column */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-white">
                            Liên Kết Nhanh
                        </h2>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-dark-300 hover:text-white transition-colors"
                                >
                                    Trang Chủ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-dark-300 hover:text-white transition-colors"
                                >
                                    Về Chúng Tôi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-dark-300 hover:text-white transition-colors"
                                >
                                    Liên Hệ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    className="text-dark-300 hover:text-white transition-colors"
                                >
                                    Chính Sách Bảo Mật
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="text-dark-300 hover:text-white transition-colors"
                                >
                                    Điều Khoản Dịch Vụ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter column */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-white">
                            Cập Nhật Thông Tin
                        </h2>
                        <p className="text-dark-300 mb-4">
                            Đăng ký nhận bản tin của chúng tôi để nhận tin tức
                            và cập nhật mới nhất.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 py-2 px-3 bg-dark-800 text-white border border-dark-700 rounded-l focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                            <button
                                type="submit"
                                className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-r transition-colors"
                                aria-label="Subscribe"
                            >
                                <HiMail className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-dark-400 text-sm mb-4 md:mb-0">
                        © {currentYear} Mạng Tin Tức Toàn Cầu. Bảo lưu mọi
                        quyền.
                    </p>
                    <div className="flex space-x-4 text-dark-400 text-sm">
                        <Link
                            to="/privacy"
                            className="hover:text-white transition-colors"
                        >
                            Bảo Mật
                        </Link>
                        <Link
                            to="/terms"
                            className="hover:text-white transition-colors"
                        >
                            Điều Khoản
                        </Link>
                        <Link
                            to="/cookies"
                            className="hover:text-white transition-colors"
                        >
                            Cookie
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
