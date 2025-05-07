import { useState, useEffect } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { HiMenuAlt3, HiX, HiSearch } from "react-icons/hi"
import { categoryNames } from "../../services/supabase"

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false)
    }, [location.pathname])

    // Handle scroll event to change header style
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleSearch = e => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
            setIsSearchOpen(false)
            setSearchQuery("")
        }
    }

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white shadow-md py-2"
                    : "bg-white/90 backdrop-blur-sm py-4"
            }`}
        >
            <div className="container-custom flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img
                        src="/src/assets/logo.svg"
                        alt="Mạng Tin Tức Toàn Cầu"
                        className="h-8 w-auto"
                    />
                    <span className="ml-2 text-xl font-bold text-primary-600 hidden sm:block">
                        Tin Tức Toàn Cầu
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {Object.entries(categoryNames).map(([slug, name]) => (
                        <NavLink
                            key={slug}
                            to={`/category/${slug}`}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-primary-600 font-medium"
                                    : "text-dark-600 hover:text-primary-600 transition-colors"
                            }
                        >
                            {name}
                        </NavLink>
                    ))}
                </nav>

                {/* Search & Mobile Menu Buttons */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={toggleSearch}
                        className="p-2 rounded-full hover:bg-dark-100 transition-colors"
                        aria-label="Tìm kiếm"
                    >
                        <HiSearch className="w-5 h-5 text-dark-700" />
                    </button>

                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-full hover:bg-dark-100 transition-colors md:hidden"
                        aria-label="Menu"
                    >
                        {isMenuOpen ? (
                            <HiX className="w-5 h-5 text-dark-700" />
                        ) : (
                            <HiMenuAlt3 className="w-5 h-5 text-dark-700" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white border-t border-dark-100 overflow-hidden"
                    >
                        <nav className="container-custom py-4 flex flex-col space-y-4">
                            {Object.entries(categoryNames).map(
                                ([slug, name]) => (
                                    <NavLink
                                        key={slug}
                                        to={`/category/${slug}`}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-primary-600 font-medium text-lg"
                                                : "text-dark-600 hover:text-primary-600 transition-colors text-lg"
                                        }
                                    >
                                        {name}
                                    </NavLink>
                                )
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-full bg-white shadow-md p-4"
                    >
                        <form
                            onSubmit={handleSearch}
                            className="container-custom flex"
                        >
                            <input
                                type="text"
                                placeholder="Tìm kiếm bài viết..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="flex-1 p-2 border border-dark-200 rounded-l focus:outline-none focus:ring-2 focus:ring-primary-500"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="bg-primary-600 text-white p-2 rounded-r hover:bg-primary-700 transition-colors"
                            >
                                <HiSearch className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header
