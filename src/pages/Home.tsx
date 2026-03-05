import { useState } from "react"
import { products } from "../data/product"
import { useCart } from "@/context/CartContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Headphones, Watch, Smartphone, Package, Zap, ShoppingCart } from "lucide-react"

const Home = () => {
  const { addToCart } = useCart()

  const brands = ["All", ...new Set(products.map((p) => p.brand))]
  const categories = ["All", ...new Set(products.map((p) => p.category))]

  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts = products.filter((p) => {
    const brandMatch = selectedBrand === "All" || p.brand === selectedBrand
    const categoryMatch = selectedCategory === "All" || p.category === selectedCategory
    return brandMatch && categoryMatch
  })

  const featuredProducts = products.filter(p => p.featured)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "audio": return <Headphones className="w-6 h-6" />
      case "watch": return <Watch className="w-6 h-6" />
      case "smartwatch": return <Smartphone className="w-6 h-6" />
      case "combo": return <Package className="w-6 h-6" />
      case "accessory": return <Zap className="w-6 h-6" />
      default: return <Package className="w-6 h-6" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Metro Gadgets
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover the latest in audio, watches, and tech accessories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold">
              View Featured
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 overflow-hidden relative">
                    <img
                      src={product.image?.[0]}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-semibold line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{product.price}
                  </p>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2"
                    onClick={() => addToCart({
                      name: product.name,
                      price: product.price,
                      image: product.image?.[0] || "",
                    })}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.slice(1).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  selectedCategory === category
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300"
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  {getCategoryIcon(category)}
                  <span className="font-semibold capitalize text-sm">{category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Brand Filter */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter by Brand</h3>
              <div className="flex gap-3 flex-wrap">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedBrand === brand
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border border-gray-200 hover:border-blue-300 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden relative">
                    <img
                      src={product.image?.[0]}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-sm font-medium line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-green-600">
                    ₹{product.price}
                  </p>
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-2 text-sm"
                    onClick={() => addToCart({
                      name: product.name,
                      price: product.price,
                      image: product.image?.[0] || "",
                    })}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Get the latest deals and new product launches delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home