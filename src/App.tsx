import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import ReactGA from "react-ga4"
import { Analytics } from "@vercel/analytics/react"
import MainLayout from "./components/layout/MainLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import Cart from "./pages/Cart"
import ProductPage from "./pages/Productpage"
import Checkout from "./pages/Checkout"
import NotFound from "./pages/NotFound"

// ✅ separate component to track pages
function PageTracker() {
  const location = useLocation()
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname })
  }, [location])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <PageTracker />  {/* ✅ add this */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}

export default App