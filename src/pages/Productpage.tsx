
import { useParams, Link } from "react-router-dom"
import { products } from "../data/product"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Award } from "lucide-react"

const ProductPage = () => {
  const { id } = useParams()
  const { addToCart } = useCart()

  const product = products.find((p) => p.id === Number(id))
  const images = product?.image || []

  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [qty, setQty] = useState(1)
  const [zoom, setZoom] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  const handleSwipe = (touchEnd: number) => {
    const diff = touchStart - touchEnd
    if (diff > 50) nextImage()
    if (diff < -50) prevImage()
  }

  const increaseQty = () => setQty((prev) => prev + 1)
  const decreaseQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1))

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4)

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Product not found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          <Link to="/" className="inline-block">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
              Go back to home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-8 pb-24 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden aspect-square group cursor-pointer"
              onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
              onTouchEnd={(e) => handleSwipe(e.changedTouches[0].clientX)}
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onClick={() => setModalOpen(true)}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {images.map((img, i) => (
                  <div key={i} className="min-w-full h-full flex items-center justify-center p-8">
                    <img
                      src={img}
                      alt={product.name}
                      className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
                        zoom ? "scale-110" : "scale-100"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentIndex === i
                        ? "border-blue-500 shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 lg:space-y-6">
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product.brand}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              <p className="text-lg lg:text-xl font-bold text-green-600">
                ₹{product.price.toLocaleString()}
              </p>

              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-yellow-500" : "bg-red-500"
              }`}></div>
              <span className={`text-sm font-medium ${
                product.stock > 10 ? "text-green-700" : product.stock > 0 ? "text-yellow-700" : "text-red-700"
              }`}>
                {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <span className="font-medium text-gray-700 text-sm lg:text-base">Quantity:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden w-fit">
                  <button
                    onClick={decreaseQty}
                    disabled={qty === 1}
                    className="px-4 py-3 font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 font-semibold text-center min-w-[60px] bg-gray-50">
                    {qty}
                  </span>
                  <button
                    onClick={increaseQty}
                    className="px-4 py-3 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                className="hidden lg:flex w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() =>
                  addToCart({
                    name: product.name,
                    price: product.price,
                    image: product.image?.[0] || "",
                    
                  })
                }
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">1 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">Certified Product</span>
              </div>
            </div>

            {/* Continue Shopping */}
            <Link to="/" className="inline-block">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                ← Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-8 lg:mt-16">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">Related Products</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:space-x-0 lg:overflow-x-visible">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white flex-shrink-0 w-48 lg:w-auto">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
                      <img
                        src={relatedProduct.image?.[0]}
                        alt={relatedProduct.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="text-sm font-medium line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-green-600">
                      ₹{relatedProduct.price}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky Add to Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center space-x-4 lg:hidden shadow-lg">
        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          <button
            onClick={decreaseQty}
            disabled={qty === 1}
            className="px-3 py-2 font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            -
          </button>
          <span className="px-4 py-2 font-semibold text-center min-w-[50px] bg-gray-50">
            {qty}
          </span>
          <button
            onClick={increaseQty}
            className="px-3 py-2 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            +
          </button>
        </div>

        <Button
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-base rounded-lg shadow-lg"
          onClick={() =>
            addToCart({
              name: product.name,
              price: product.price,
              image: product.image?.[0] || "",
             
            })
          }
          disabled={product.stock === 0}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {product.stock === 0 ? "Out of Stock" : `Add to Cart • ₹${(product.price * qty).toLocaleString()}`}
        </Button>
      </div>

      {/* Image Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={images[currentIndex]}
              className="max-h-full max-w-full object-contain rounded-lg"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductPage
