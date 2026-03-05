import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Search, Menu, X, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/CartContext"
import { motion, AnimatePresence } from "framer-motion"

import logo from "@/assets/metro.png"

const Header = () => {
  const { cart } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  // Quick categories for the menu
  const menuCategories = [
    { name: "All Products", path: "/", category: "All" },
    { name: "Smart Audio", path: "/", category: "audio" },
    { name: "Smartwatches", path: "/", category: "smartwatch" },
    { name: "Combos & Bundles", path: "/", category: "combo" },
    { name: "Accessories", path: "/", category: "accessory" },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 text-gray-900 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20 gap-4">

            {/* Mobile Menu Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-gray-900 hover:text-[#ff4500] transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={logo}
                  alt="Metro Gadgets Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 uppercase hidden sm:block">
                Metro Gadgets
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 space-x-8">
              {menuCategories.map((cat, idx) => (
                <Link
                  key={idx}
                  to={`${cat.path}?category=${cat.category}`}
                  className="text-sm font-bold tracking-wider text-gray-500 hover:text-black uppercase transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>

            {/* Actions (Search, Account, Cart) */}
            <div className="flex items-center justify-end gap-2 sm:gap-4 shrink-0">

              {/* Desktop Search Bar */}
              <div className="hidden xl:flex items-center relative w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 bg-[#f5f5f7] text-gray-900 placeholder:text-gray-400 border-transparent rounded-full focus-visible:ring-1 focus-visible:ring-black h-10 w-full hover:bg-gray-100 transition-colors"
                />
              </div>

              {/* Mobile Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="xl:hidden p-2 text-gray-900 hover:text-[#ff4500] transition-colors rounded-full hover:bg-gray-50"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <Link to="/cart">
                <div className="relative p-2 text-gray-900 hover:text-[#ff4500] transition-colors rounded-full hover:bg-gray-50 flex items-center">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-[#ff4500] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>

            </div>
          </div>

          {/* Collapsible Search Bar for Mobile/Tablet */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="xl:hidden overflow-hidden pb-4"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search for products, brands..."
                    className="pl-10 bg-[#f5f5f7] border-transparent rounded-full focus-visible:ring-black h-12 w-full text-base"
                    autoFocus
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white z-[60] shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black overflow-hidden flex items-center justify-center">
                    <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-lg font-bold tracking-tight uppercase">Menu</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6">
                <nav className="space-y-1 px-4">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">
                    Categories
                  </div>
                  {menuCategories.map((cat, idx) => (
                    <Link
                      key={idx}
                      to={`${cat.path}?category=${cat.category}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-[#f5f5f7] text-gray-900 group transition-colors"
                    >
                      <span className="text-lg font-semibold">{cat.name}</span>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 px-8">
                  <div className="h-px bg-gray-100 w-full mb-8"></div>
                  <nav className="space-y-4">
                    <Link to="/" className="block text-gray-500 font-medium hover:text-black transition-colors">About Us</Link>
                    <Link to="/" className="block text-gray-500 font-medium hover:text-black transition-colors">Support center</Link>
                    <Link to="/" className="block text-gray-500 font-medium hover:text-black transition-colors">Track Order</Link>
                  </nav>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header