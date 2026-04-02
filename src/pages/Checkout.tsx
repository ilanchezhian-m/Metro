import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChevronRight, ShieldCheck, Truck, ArrowRight, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"

const Checkout = () => {
    const { cart } = useCart()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [altPhone, setAltPhone] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState("")
    const [landmark, setLandmark] = useState("")

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
        if (cart.length === 0) {
            navigate('/cart')
        }
    }, [cart, navigate])

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const handleCheckout = () => {
        if (!name || !phone || !address || !pincode) {
            alert("Please fill in all the required details (Name, Phone, Address, Pincode)")
            return
        }

        const isValidPhone = /^0\d{10}$/.test(phone) || /^[1-9]\d{9}$/.test(phone);
        if (!isValidPhone) {
            alert("Please enter a valid phone number (10 digits, or 11 digits starting with 0)")
            return
        }

        const isValidPincode = /^[1-9][0-9]{5}$/.test(pincode);
        if (!isValidPincode) {
            alert("Please enter a valid 6-digit Indian PIN code")
            return
        }

        const productList = cart
            .map((item) => `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`)
            .join("%0A")

        const altPhoneText = altPhone ? `%0AAlternate Phone: ${altPhone}` : "";
        const message = `Order Details:%0A${productList}%0A%0ATotal items: ${totalItems}%0ATotal price: ₹${totalPrice}%0A%0A*Delivery Details:*%0AName: ${name}%0APhone: ${phone}${altPhoneText}%0AAddress: ${address}%0ALandmark: ${landmark}%0APincode: ${pincode}`

        window.open(`https://wa.me/916381041017?text=${message}`, "_blank")
    }

    if (cart.length === 0) return null;

    return (
        <div className="min-h-screen bg-[#f5f5f7] selection:bg-orange-500 selection:text-white pt-8 pb-24">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm font-medium tracking-wide mb-8">
                    <Link to="/" className="text-gray-400 hover:text-black transition-colors">Store</Link>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                    <Link to="/cart" className="text-gray-400 hover:text-black transition-colors">Cart</Link>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                    <span className="text-black">Checkout</span>
                </nav>

                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-8 mt-4">
                    Checkout
                </h1>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Form */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">Delivery Details</h2>

                            <div className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Full Name *</label>
                                    <Input
                                        placeholder="Type your name here"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-[#f9f9fa] border-transparent shadow-sm rounded-xl px-4 py-6 text-base focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number *</label>
                                        <Input
                                            placeholder="Phone Number"
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, "");
                                                const maxLength = val.startsWith("0") ? 11 : 10;
                                                if (val.length <= maxLength) setPhone(val);
                                            }}
                                            className="bg-[#f9f9fa] border-transparent shadow-sm rounded-xl px-4 py-6 text-base focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Email(Optional)</label>
                                        <Input
                                            placeholder="Email"
                                            type="tel"
                                            value={altPhone}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, "");
                                                const maxLength = val.startsWith("0") ? 11 : 10;
                                                if (val.length <= maxLength) setAltPhone(val);
                                            }}
                                            className="bg-[#f9f9fa] border-transparent shadow-sm rounded-xl px-4 py-6 text-base focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Complete Address *</label>
                                    <textarea
                                        placeholder="House No, Building, Street&#10;City, State"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        rows={3}
                                        className="bg-[#f9f9fa] border-transparent shadow-sm rounded-xl px-4 py-3 text-base focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-all w-full resize-y min-h-[100px] outline-none"
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Landmark (Optional)</label>
                                        <Input
                                            placeholder=" "
                                            value={landmark}
                                            onChange={(e) => setLandmark(e.target.value)}
                                            className="bg-[#f9f9fa] border-transparent shadow-sm rounded-xl px-4 py-6 text-base focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Pincode *</label>
                                        <Input
                                            placeholder=" "
                                            value={pincode}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, "");
                                                if (val.length <= 6) setPincode(val);
                                            }}
                                            className="bg-[#f9f9fa] border-transparent shadow-sm rounded-xl px-4 py-6 text-base focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Checkout / Summary */}
                    <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col gap-8"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <ShoppingBag className="w-6 h-6 text-[#ff4500]" />
                                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Order Summary</h2>
                                </div>

                                <div className="space-y-4 text-lg">
                                    <div className="max-h-60 overflow-y-auto pr-2 space-y-3 mb-4 scrollbar-hide">
                                        {cart.map(item => (
                                            <div key={item.name} className="flex justify-between text-sm items-center gap-4">
                                                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                                                    <img src={item.image} alt={item.name} className="w-10 h-10 object-contain bg-[#f5f5f7] rounded-lg p-1" />
                                                    <span className="text-gray-700 truncate">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                                                </div>
                                                <span className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between text-gray-500 pt-4 border-t border-gray-100">
                                        <span>Subtotal ({totalItems} items)</span>
                                        <span className="font-medium text-gray-900">₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>Shipping</span>
                                        <span className="font-medium text-green-600">Free</span>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                                        <span className="font-bold text-gray-900">Total</span>
                                        <div className="text-right">
                                            <span className="text-xs text-gray-400 block mb-1">Including GST</span>
                                            <span className="text-4xl font-bold text-gray-900 tracking-tight">₹{totalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-[#ff4500] hover:bg-[#ff5500] text-white font-medium tracking-wide h-16 rounded-full text-xl shadow-[0_8px_30px_rgb(255,69,0,0.3)] hover:shadow-[0_8px_30px_rgb(255,69,0,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
                                onClick={handleCheckout}
                            >
                                Place Order Let's Go
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                            </Button>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-center gap-2 text-gray-500">
                                    <ShieldCheck className="w-5 h-5 text-green-500" />
                                    <span className="text-xs font-medium uppercase tracking-wider">Secure Checkout</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-gray-500">
                                    <Truck className="w-5 h-5 text-blue-500" />
                                    <span className="text-xs font-medium uppercase tracking-wider">Free Shipping</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Checkout
