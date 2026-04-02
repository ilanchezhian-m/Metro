import { useParams, Link } from "react-router-dom"
import { products } from "../data/product"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Truck, Shield, RotateCcw, Share2, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const ProductPage = () => {
  const { id } = useParams()
  const { addToCart } = useCart()

  const product = products.find((p) => p.id === Number(id))
  // Fallback to empty array if no images, but usually we have at least one or it's undefined
  const images = product?.image || []

  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      name: product.name,
      price: product.price,
      image: images[0] || "",
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  }

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const increaseQty = () => setQty((prev) => prev + 1)
  const decreaseQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1))

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4)

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">Not Found</h1>
          <p className="text-lg text-gray-500">The product you're looking for doesn't exist.</p>
          <Link to="/" className="inline-block mt-4">
            <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 text-lg font-medium">
              Back to Store
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-orange-500 selection:text-white">
      {/* Breadcrumb - Minimalist */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm font-medium tracking-wide">
            <Link to="/" className="text-gray-400 hover:text-black transition-colors">Store</Link>
            <span className="text-gray-300">/</span>
            <span className="text-black">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 lg:py-12 pb-32 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left Column: Image Gallery (Scrollable/Stacked on Desktop, Carousel on Mobile) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Desktop: Stacked Images */}
            <div className="hidden lg:flex flex-col gap-6">
              {images.length > 0 ? (
                images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-[#f5f5f7] rounded-3xl overflow-hidden flex items-center justify-center aspect-[4/3] group relative"
                  >
                    <img
                      src={img}
                      alt={`${product.name} - View ${idx + 1}`}
                      className="w-full h-full object-cover rounded-md mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>
                ))
              ) : (
                <div className="bg-[#f5f5f7] rounded-3xl flex items-center justify-center p-12 aspect-[4/3]">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            {/* Mobile/Tablet: Carousel */}
            <div className="lg:hidden relative">
              <div className="bg-[#f5f5f7] rounded-3xl overflow-hidden aspect-square flex items-center justify-center relative touch-pan-y group/img">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    src={images[activeImage] || ""}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md mix-blend-multiply"
                  />
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-black"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-black"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Dots */}
              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeImage === idx ? 'w-8 bg-black' : 'w-2 bg-gray-300'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Product Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 flex flex-col gap-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-sm font-bold tracking-widest text-[#ff4500] uppercase mb-2">
                      {product.brand}
                    </h2>
                    <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight leading-none text-black">
                      {product.name}
                    </h1>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-[#ff4500] hover:bg-[#ff4500]/10 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-3xl font-medium tracking-tight text-gray-900 mt-4">
                  ₹{product.price.toLocaleString()}
                </p>
                <p className="text-gray-500 text-lg leading-relaxed pt-2">
                  {product.description}
                </p>
              </motion.div>

              <hr className="border-gray-100" />

              {/* Status & Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 bg-gray-50 w-fit px-4 py-2 rounded-full">
                  <div className={`w-2.5 h-2.5 rounded-full ${product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-orange-500" : "bg-red-500"
                    } animate-pulse`}></div>
                  <span className="text-sm font-medium tracking-wide text-gray-700">
                    {product.stock > 10 ? "IN STOCK" : product.stock > 0 ? `ONLY ${product.stock} LEFT` : "OUT OF STOCK"}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white">
                    <button
                      onClick={decreaseQty}
                      disabled={qty === 1}
                      className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black disabled:opacity-30 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium text-lg">
                      {qty}
                    </span>
                    <button
                      onClick={increaseQty}
                      className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-sm text-gray-400 font-medium">Quantity</span>
                </div>
              </motion.div>

              {/* Add to Cart Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="pt-2"
              >
                <Button
                  className={`w-full text-white font-medium tracking-wide h-16 rounded-full text-lg transition-all transform hover:-translate-y-1 ${isAdded
                      ? "bg-green-500 hover:bg-green-600 shadow-[0_8px_30px_rgb(34,197,94,0.3)] scale-105"
                      : "bg-[#ff4500] hover:bg-[#ff5500] shadow-[0_8px_30px_rgb(255,69,0,0.3)] hover:shadow-[0_8px_30px_rgb(255,69,0,0.5)]"
                    }`}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {isAdded ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center">
                      <Check className="w-5 h-5 mr-3" /> Added to Cart!
                    </motion.div>
                  ) : (
                    <div className="flex items-center">
                      <ShoppingCart className="w-5 h-5 mr-3" />
                      {product.stock === 0 ? "Out of Stock" : `Add to Cart — ₹${(product.price * qty).toLocaleString()}`}
                    </div>
                  )}
                </Button>

                <p className="text-center text-xs text-gray-400 mt-4 tracking-wide uppercase">
                  Free shipping on all orders over ₹1000
                </p>
              </motion.div>

              {/* Minimalist Features Grid */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-2 gap-x-4 gap-y-6 pt-8 border-t border-gray-100"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-700">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Fast Delivery</h4>
                    <p className="text-xs text-gray-500 mt-0.5">2-4 business days</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-700">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">1 Year Warranty</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Official guarantee</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-700">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Free Returns</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Within 3 to 4 days</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-700">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Support</h4>
                    <p className="text-xs text-gray-500 mt-0.5">24/7 customer care</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Related Products - Reimagined */}
        {relatedProducts.length > 0 && (
          <section className="mt-32 pt-16 border-t border-gray-100">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-black">You May Also Like</h2>
                <p className="text-gray-500 mt-2">More from this category</p>
              </div>
              <Link to="/" className="text-sm font-bold text-[#ff4500] hover:text-[#ff5500] uppercase tracking-wider hidden sm:block">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((related, idx) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <Link to={`/product/${related.id}`} className="group block h-full">
                    <div className="bg-[#f5f5f7] rounded-3xl aspect-[4/5] sm:aspect-square flex items-center justify-center mb-4 overflow-hidden relative group/related">
                      <img
                        src={related.image?.[0]}
                        alt={related.name}
                        className="w-full h-full object-cover rounded-md mix-blend-multiply transition-transform duration-500 group-hover/related:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold line-clamp-1 text-gray-900 group-hover:text-[#ff4500] transition-colors">
                      {related.name}
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-gray-500 mt-1">
                      ₹{related.price}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky Add to Cart Bar - Enhanced */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 p-4 pb-safe flex items-center gap-4 lg:hidden z-50 pb-[calc(1rem+env(safe-area-inset-bottom))]"
      >
        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white flex-shrink-0 h-12">
          <button
            onClick={decreaseQty}
            disabled={qty === 1}
            className="w-10 h-full flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-30 transition-colors"
          >
            -
          </button>
          <span className="w-8 text-center font-semibold text-sm">
            {qty}
          </span>
          <button
            onClick={increaseQty}
            className="w-10 h-full flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            +
          </button>
        </div>

        <Button
          className={`flex-1 text-white font-medium tracking-wide h-12 rounded-full text-base shadow-lg transition-all ${isAdded ? "bg-green-500 hover:bg-green-600 scale-105" : "bg-[#ff4500] hover:bg-[#ff5500]"
            }`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {isAdded ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center justify-center">
              <Check className="w-4 h-4 mr-2" /> Added!
            </motion.div>
          ) : (
            <span>{product.stock === 0 ? "Out of Stock" : `Add • ₹${(product.price * qty).toLocaleString()}`}</span>
          )}
        </Button>
      </motion.div>
    </div>
  )
}

export default ProductPage
