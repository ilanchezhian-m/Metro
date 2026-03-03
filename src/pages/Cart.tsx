import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
const [pincode, setPincode] = useState("")
const [landmark, setLandmark] = useState("")

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleCheckout = () => {
    if (!name || !phone) {
      alert("Please fill your name and phone number")
      return
    }

    const productList = cart
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - ₹${
            item.price * item.quantity
          }`
      )
      .join("%0A")

    const message = `Order Details:%0A${productList}%0A%0ATotal items: ${totalItems}%0ATotal price: ₹${totalPrice}%0AName: ${name}%0APhone: ${phone}`

    window.open(
      `https://wa.me/916381041017?text=${message}`,
      "_blank"
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">
        Your cart ({totalItems})
      </h1>

      {cart.length === 0 && (
        <p className="text-muted-foreground">
          Your cart is empty
        </p>
      )}

      {cart.length > 0 && (
        <div className="grid md:grid-cols-3 gap-8">

          {/* Product Section */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.name}
                className="flex gap-4 border rounded-lg p-4"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                {/* Info */}
                <div className="flex-1 space-y-2">
                  <p className="font-semibold text-lg">
                    {item.name}
                  </p>

                  <p className="text-muted-foreground">
                    ₹{item.price} each
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQty(item.name)}
                      className="px-3 py-1 border rounded"
                    >
                      -
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.name)}
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFromCart(item.name)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border rounded-lg p-6 space-y-4 h-fit">
            <h2 className="text-xl font-semibold">
              Order summary
            </h2>

            <div className="flex justify-between">
              <span>Total items:</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total price:</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="border-t pt-4 space-y-3">
              <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                    placeholder="Your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />

                    <Input
                    placeholder="Delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />

                    <Input
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    />

                    <Input
                    placeholder="Landmark (optional)"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    />

              <Button
                className="w-full"
                onClick={handleCheckout}
              >
                Checkout via WhatsApp
              </Button>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default Cart