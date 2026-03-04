import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

type CartItem = {
  name: string
  price: number
  image: string
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (name: string) => void
  increaseQty: (name: string) => void
  decreaseQty: (name: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart")
    return storedCart ? JSON.parse(storedCart) : []
  })

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.name === item.name)

      if (existing) {
        return prev.map((p) =>
          p.name === item.name
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
        },
      ]
    })
  }

  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name))
  }

  const increaseQty = (name: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQty = (name: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used inside CartProvider")
  }

  return context
}