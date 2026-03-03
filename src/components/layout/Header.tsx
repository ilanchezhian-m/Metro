import { Link } from "react-router-dom"
import { ShoppingCart, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/CartContext"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar"

import logo from "@/assets/metro.png"

const Header = () => {
  const { cart } = useCart()

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4 gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Metro Gadgets Logo"
            className="h-10 w-10 object-cover rounded-full"
          />
          <span className="text-xl md:text-2xl font-bold tracking-tight">
            Metro Gadgets
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Shop</MenubarTrigger>
              <MenubarContent>
                <MenubarItem asChild>
                  <Link to="/shop">All products</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-9" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Cart Button */}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/cart">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>

          {/* Account */}
          <Button variant="outline" size="sm" asChild>
            <Link to="/account">
              <User className="w-4 h-4 mr-2" />
              Account
            </Link>
          </Button>

        </div>
      </div>
    </header>
  )
}

export default Header