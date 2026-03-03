import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import cmfCombo from "../assets/products/CMF COMBO.jpeg"
import cmfNeckband from "../assets/products/CMF NECKBAND.jpeg"
import fossilWatch from "../assets/products/FOSSIL WATCH.jpeg"
import iWatch from "../assets/products/I WATCH.jpeg"
import samsungWatch from "../assets/products/SAMSUNG GALAXY.jpeg"

const products = [
  { name: "Cmf combo", price: 899, image: cmfCombo },
  { name: "Cmf neckband", price: 599, image: cmfNeckband },
  { name: "Fossil analog watch", price: 999, image: fossilWatch },
  { name: "I watch series 10", price: 1050, image: iWatch },
  { name: "Samsung galaxy active 2 watch", price: 999, image: samsungWatch },
]

const Home = () => {

  const handleWhatsApp = (productName: string, price: number) => {
    const message = `Hello, I want to order ${productName} for ₹${price}`
    const encodedMessage = encodeURIComponent(message)

    window.open(
      `https://wa.me/916381041017?text=${encodedMessage}`,
      "_blank"
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Featured products
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* Product Image */}
            <div className="h-40 sm:h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            <CardContent className="p-3 sm:p-4 space-y-2">
              <h2 className="font-semibold text-sm sm:text-lg line-clamp-2">
                {product.name}
              </h2>

              <p className="text-lg sm:text-xl font-bold text-primary">
                ₹{product.price}
              </p>

              <Button
                className="w-full text-sm sm:text-base"
                onClick={() =>
                  handleWhatsApp(product.name, product.price)
                }
              >
                Add to cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Home