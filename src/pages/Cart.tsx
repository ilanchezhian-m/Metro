import { useCart } from "@/context/CartContext"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronRight, ShieldCheck, Truck, ArrowRight, Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart()

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-[#f5f5f7] selection:bg-orange-500 selection:text-white pt-8 pb-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm font-medium tracking-wide mb-8">
          <Link to="/" className="text-gray-400 hover:text-black transition-colors">Store</Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-black">Shopping Cart</span>
        </nav>

        <div className="flex items-baseline justify-between mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Your Cart
          </h1>
          {cart.length > 0 && (
            <span className="text-lg font-medium text-gray-500 bg-gray-200/50 px-4 py-1 rounded-full">
              {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-12 text-center space-y-6 shadow-sm border border-gray-100 max-w-2xl mx-auto mt-12"
          >
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/" className="inline-block pt-4">
              <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 text-lg font-medium tracking-wide transition-transform hover:scale-105">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Products List */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.name}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl p-3 sm:p-4 flex flex-row gap-3 sm:gap-4 items-center justify-between group shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-auto flex-1 truncate">
                      {/* Image */}
                      <Link to={`/`} className="w-16 h-16 sm:w-24 sm:h-24 bg-[#f5f5f7] rounded-xl flex items-center justify-center p-2 sm:p-3 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                        />
                      </Link>

                      {/* Info */}
                      <div className="min-w-0 pr-2">
                        <Link to={`/`} className="hover:text-[#ff4500] transition-colors">
                          <h3 className="font-bold text-sm sm:text-lg text-gray-900 truncate sm:line-clamp-2 sm:whitespace-normal">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-gray-500 text-xs sm:text-sm font-medium mt-0.5">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end w-auto gap-2 sm:gap-6 flex-shrink-0">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-full bg-[#f5f5f7] h-8 sm:h-10">
                        <button
                          onClick={() => decreaseQty(item.name)}
                          className="w-7 sm:w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="w-6 sm:w-8 text-center font-bold text-gray-900 text-xs sm:text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.name)}
                          className="w-7 sm:w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <p className="font-bold text-sm sm:text-lg text-gray-900 min-w-[60px] sm:min-w-[90px] text-right hidden sm:block">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>

                      <button
                        onClick={() => removeFromCart(item.name)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 sm:p-2 rounded-full transition-colors flex-shrink-0 sm:-mr-2 ml-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Checkout / Summary */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col gap-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">Order Summary</h2>

                  <div className="space-y-4 text-lg">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="font-medium text-gray-900">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="text-3xl font-bold text-gray-900 tracking-tight">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout" className="block w-full">
                  <Button className="w-full bg-[#ff4500] hover:bg-[#ff5500] text-white font-medium tracking-wide h-16 rounded-full text-lg shadow-[0_8px_30px_rgb(255,69,0,0.3)] hover:shadow-[0_8px_30px_rgb(255,69,0,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="text-xs font-medium uppercase tracking-wider">Secure</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Truck className="w-5 h-5 text-blue-500" />
                    <span className="text-xs font-medium uppercase tracking-wider">Free Ship</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Cart