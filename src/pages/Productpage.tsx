import { useParams, Link } from "react-router-dom"
import { products } from "../data/product"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const ProductPage = () => {
  const { id } = useParams()
  const { addToCart, cart } = useCart()
  

  const product = products.find((p) => p.id === Number(id))
    const images = product?.image || []

  const [selectedImage, setSelectedImage] = useState(images[0])


  const getProductQty = (name: string) => {
    const item = cart.find((p) => p.name === name)
    return item ? item.quantity : 0
  }

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
  const quantity = getProductQty(product.name)



  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid md:grid-cols-2 gap-10">

      {/* Product Image Section */}
      <div>

        {/* Main Image */}
        <div className="border rounded-lg overflow-hidden">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[100] object-cover"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-16 object-cover border rounded cursor-pointer transition
              ${selectedImage === img ? "border-black" : "border-gray-300"}`}
            />
          ))}
        </div>

      </div>

      {/* Product Details */}
      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>

        <p className="text-gray-500">
          Brand: {product.brand}
        </p>

        <p className="text-gray-600">
          {product.description}
        </p>

        <p className="text-2xl font-bold text-primary">
          ₹{product.price}
        </p>

        <p className="text-sm text-gray-500">
          Stock available: {product.stock}
        </p>

        {quantity === 0 ? (
          <Button
            className="w-full"
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
        ) : (
          <div className="border rounded py-3 text-center font-semibold">
            In cart: {quantity}
          </div>
        )}

        <Link to="/" className="block text-blue-500 underline">
          ← Continue shopping
        </Link>

      </div>

    </div>
  )
}

export default ProductPage