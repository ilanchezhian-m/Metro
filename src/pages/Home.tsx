import { useState } from "react"
import { products } from "../data/product"
import { useCart } from "@/context/CartContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


const Home = () => {
  const { addToCart } = useCart()

  const brands = ["All", ...new Set(products.map((p) => p.brand))]

  const [selectedBrand, setSelectedBrand] = useState("All")

  const filteredProducts =
    selectedBrand === "All"
      ? products
      : products.filter((p) => p.brand === selectedBrand)

  return (
    <>
      {/* <Navbar /> */}

      <div className="max-w-7xl mx-auto py-2 px-1 md:px-6">

        {/* Brand Filter */}
        <div className="flex gap-3 mb-3 flex-wrap">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-4 py-1 border rounded-full text-sm
                ${selectedBrand === brand
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"}`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
           <Card
  key={product.id}
  className="group overflow-hidden border hover:shadow-lg transition duration-300"
>
  <Link to={`/product/${product.id}`}>

    {/* Product Image */}
    <div className="aspect-square bg-white flex items-center justify-center p-3 overflow-hidden">
      <img
        src={product.image?.[0]}
        alt={product.name}
        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    {/* Product Info */}
    <CardContent className="p-3 space-y-1 text-center">
      <h2 className="text-sm font-medium line-clamp-2 min-h-[40px]">
        {product.name}
      </h2>

      <p className="text-lg font-bold text-primary">
        ₹{product.price}
      </p>
    </CardContent>

  </Link>

  {/* Add to Cart */}
  <div className="px-3 pb-3">
    <Button
      className="w-full h-9 text-sm bg-red-400 hover:bg-red-500"
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
  </div>

</Card> 
          ))}
          
        </div>

      </div>
      
    </>
    
  )
 
}

export default Home