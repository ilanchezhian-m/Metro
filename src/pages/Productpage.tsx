
import { useParams, Link } from "react-router-dom"
import { products } from "../data/product"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { useState } from "react"

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

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/" className="text-blue-500 underline mt-4 block">
          Go back to home
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid md:grid-cols-2 gap-10">

        {/* Image Section */}
        <div>

          <div
            className="relative border rounded-lg overflow-hidden h-[320px] sm:h-[420px] bg-white"
            onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
            onTouchEnd={(e) => handleSwipe(e.changedTouches[0].clientX)}
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onClick={() => setModalOpen(true)}
          >

            {/* Slider */}
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((img, i) => (
                <div key={i} className="min-w-full h-full flex items-center justify-center">
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

            {/* Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black"
            >
              ‹
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black"
            >
              ›
            </button>

          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setCurrentIndex(i)}
                className={`w-16 h-16 object-cover border rounded cursor-pointer ${
                  currentIndex === i ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>

        </div>

        {/* Product Info */}
        <div className="space-y-6">

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500">Brand: {product.brand}</p>

          <p className="text-gray-600">{product.description}</p>

          <p className="text-2xl font-bold text-primary">
            ₹{product.price}
          </p>

          <p className="text-sm text-gray-500">
            Stock available: {product.stock}
          </p>

          {/* Quantity + Cart */}
          <div className="flex items-center gap-4">

            <div className="flex items-center border rounded overflow-hidden">

              <button
                onClick={decreaseQty}
                disabled={qty === 1}
                className="px-3 py-2 font-bold hover:bg-gray-100 disabled:opacity-40"
              >
                -
              </button>

              <span className="px-4 font-semibold">{qty}</span>

              <button
                onClick={increaseQty}
                className="px-3 py-2 font-bold hover:bg-gray-100"
              >
                +
              </button>

            </div>

            <Button
              className="flex-1"
              onClick={() =>
                addToCart({
                  name: product.name,
                  price: product.price,
                  image: product.image?.[0] || "",
                 
                })
              }
            >
              Add to Cart
            </Button>

          </div>

          <Link to="/" className="block text-blue-500 underline">
            ← Continue shopping
          </Link>

        </div>

      </div>

      {/* Image Fullscreen Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <img
            src={images[currentIndex]}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}

      {/* Mobile Sticky Cart Bar
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex items-center gap-3 md:hidden">

        <div className="flex items-center border rounded overflow-hidden">

          <button
            onClick={decreaseQty}
            disabled={qty === 1}
            className="px-3 py-2 font-bold disabled:opacity-40"
          >
            -
          </button>

          <span className="px-3">{qty}</span>

          <button
            onClick={increaseQty}
            className="px-3 py-2 font-bold"
          >
            +
          </button>

        </div>

        <Button
          className="flex-1"
          onClick={() =>
            addToCart({
              name: product.name,
              price: product.price,
              image: product.image?.[0] || "",
              quantity: qty,
            })
          }
        >
          Add to Cart
        </Button>

      </div> */}
    </>
  )
}

export default ProductPage
