import { useState, useEffect } from "react"
import { products } from "../data/product"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Headphones, Watch, Smartphone, Zap, Package } from "lucide-react"

import heroAudioImage from "@/assets/hero-audio.png"

const categoryLabel: Record<string, string> = {
  All: "All Products",
  audio: "Smart Audio",
  watch: "Watches",
  smartwatch: "Smartwatches",
  combo: "Combos & Bundles",
  accessory: "Accessories",
}

const Home = () => {
  const { addToCart } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categories = ["All", ...new Set(products.map((p) => p.category))]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts = products.filter((p) => {
    return selectedCategory === "All" || p.category === selectedCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "audio": return <Headphones className="w-5 h-5" />
      case "watch": return <Watch className="w-5 h-5" />
      case "smartwatch": return <Smartphone className="w-5 h-5" />
      case "accessory": return <Zap className="w-5 h-5" />
      case "combo": return <Package className="w-5 h-5" />
      default: return <Package className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#ff4500] selection:text-white pb-20">

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-[1400px] mx-auto">
        <div className="bg-[#f5f5f7] rounded-3xl overflow-hidden relative min-h-[500px] lg:min-h-[600px] flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 w-full p-8 md:p-12 lg:p-20 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center space-y-6 max-w-xl"
            >
              <span className="text-sm font-bold tracking-widest text-[#ff4500] uppercase">
                New Arrival
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-black leading-[1.1]">
                Smart Audio <br /> Experience
              </h1>
              <p className="text-lg text-gray-500 max-w-md leading-relaxed">
                Discover trending gadgets, high-tech drones, audio devices, and smart accessories at unbeatable deals.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 text-white rounded-full px-8 h-14 text-base font-semibold tracking-wide transition-transform hover:scale-105"
                  onClick={() => {
                    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Shop Now
                </Button>
                <Link to="#products-section" onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })
                }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 text-black hover:bg-white rounded-full px-8 h-14 text-base font-semibold tracking-wide"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-200/50 to-transparent rounded-full filter blur-3xl opacity-50"></div>
              <img
                src={heroAudioImage}
                alt="Smart Audio Earpods"
                className="w-full max-w-md object-contain mix-blend-multiply drop-shadow-2xl z-10 hover:scale-105 transition-transform duration-700 rounded-3xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="border-y border-gray-100 bg-white sticky top-[81px] z-40 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center space-x-2 whitespace-nowrap px-4 py-2 rounded-full transition-colors ${selectedCategory === cat
                  ? "bg-black text-white font-medium"
                  : "text-gray-500 hover:text-black hover:bg-gray-50 font-medium"
                  }`}
              >
                {cat !== "All" && getCategoryIcon(cat)}
                <span className="capitalize">{categoryLabel[cat] ?? cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Product Grid */}
      <section id="products-section" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">

        {/* Mobile Categories Select */}
        <div className="md:hidden mb-8">
          <label className="block text-sm font-bold tracking-wide text-gray-500 uppercase mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#f5f5f7] border-0 rounded-xl px-4 py-4 text-base font-medium focus:ring-2 focus:ring-black"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{categoryLabel[cat] ?? cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-black">
              {categoryLabel[selectedCategory] ?? selectedCategory}
            </h2>
            <p className="text-gray-500 mt-2 text-lg">{filteredProducts.length} Results</p>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col"
              >
                <div className="bg-[#f5f5f7] rounded-3xl aspect-[4/5] sm:aspect-square flex items-center justify-center mb-4 sm:mb-6 relative overflow-hidden group/img">
                  <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" />
                  <motion.img
                    src={product.image?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Quick Add Button - Desktop Only */}
                  <div className="hidden sm:block absolute bottom-4 left-4 right-4 z-20 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      className="w-full bg-white hover:bg-black text-black hover:text-white rounded-full h-12 font-semibold tracking-wide shadow-lg border border-gray-100"
                      onClick={(e) => {
                        e.preventDefault()
                        addToCart({ name: product.name, price: product.price, image: product.image?.[0] || "" })
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col flex-1 px-1 sm:px-2">
                  <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 sm:mb-1.5">
                    {product.brand}
                  </span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-[#ff4500] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="mt-auto pt-2 sm:pt-3 flex items-center justify-between">
                    <p className="text-base sm:text-xl font-bold text-black">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </div>
                  {/* Mobile Quick Add */}
                  <div className="sm:hidden mt-3">
                    <Button
                      className="w-full bg-black hover:bg-gray-800 text-white rounded-xl h-10 font-medium text-xs tracking-wide"
                      onClick={(e) => {
                        e.preventDefault()
                        addToCart({ name: product.name, price: product.price, image: product.image?.[0] || "" })
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="bg-black rounded-3xl p-8 sm:p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4500] rounded-full mix-blend-screen filter blur-[100px] opacity-40 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 -translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Join the Club
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-gray-500 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#ff4500] transition-shadow h-14"
              />
              <Button
                type="submit"
                className="bg-[#ff4500] hover:bg-[#ff5500] text-white rounded-full px-8 h-14 font-semibold tracking-wide"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home