import { Link } from "react-router-dom"
import { ShoppingCart, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

import logo from "@/assets/metro.png"


// import { Input } from "@/components/ui/input"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 gap-6">
        
            <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="Metro Gadgets Logo"
         className="h-15 w-15 object-cover rounded-full"
        />
        <span className="text-2xl font-bold tracking-tight">
          Metro Gadgets
        </span>
      </Link>
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/shop" className="hover:text-primary transition">
            Shop
          </Link>
          <Link to="/categories" className="hover:text-primary transition">
            Categories
          </Link>
          <Link to="/deals" className="hover:text-primary transition">
            Deals
          </Link>
        </nav>

        {/* Search Bar
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9"
          />
        </div> */}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart">
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </Button>

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