import { products } from "../data/product"
import { useCart } from "@/context/CartContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Home = () => {
  const { addToCart, cart } = useCart()

  const getProductQty = (name: string) => {
    const item = cart.find((p) => p.name === name)
    return item ? item.quantity : 0
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">
        Featured products
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const quantity = getProductQty(product.name)

          return (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition duration-300"
            >

              {/* Clickable Product Section */}
              <Link to={`/product/${product.id}`}>
                <div className="h-40 sm:h-48 overflow-hidden">
                  <img
                    src={product.image?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <CardContent className="p-4 space-y-3">
                  <h2 className="font-semibold text-sm sm:text-lg">
                    {product.name}
                  </h2>

                  <p className="text-lg font-bold text-primary">
                    ₹{product.price}
                  </p>
                </CardContent>
              </Link>

              {/* Add to Cart */}
              <div className="px-4 pb-4">
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
                    Add to cart
                  </Button>
                ) : (
                  <div className="flex items-center justify-center gap-4 border rounded py-2">
                    <span className="font-semibold">
                      In cart: {quantity}
                    </span>
                  </div>
                )}
              </div>

            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Home