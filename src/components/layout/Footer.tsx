
import { Link } from "react-router-dom"
import { Phone, MapPin, Shield, Truck, Video } from "lucide-react"
import instagram from "../../assets/footer/instagram.svg"
import whatsapp from "../../assets/footer/whatsapp.svg"

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white mt-0">

      {/* Trust Badges */}
      <div className="border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ff4500]/10 flex items-center justify-center flex-shrink-0">
              <Video className="w-5 h-5 text-[#ff4500]" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Video Call Verification</h4>
              <p className="text-gray-400 text-xs mt-0.5">See the product live before you buy</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Cash On Delivery</h4>
              <p className="text-gray-400 text-xs mt-0.5">Pay when you receive — PAN India</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Buyer Protection</h4>
              <p className="text-gray-400 text-xs mt-0.5">Secure & hassle-free transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 px-3 rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center shadow-lg pointer-events-none">
              <span className="text-white font-black text-sm tracking-tighter uppercase">Logo</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight uppercase text-white">Company Name</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Your trusted source for the latest gadgets, audio gear, smartwatches, and more — at unbeatable prices.
          </p>
          {/* Social */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800/60 hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <img src={instagram} alt="Instagram" className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/919443353813"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800/60 hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <img src={whatsapp} alt="WhatsApp" className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { label: "All Products", to: "/" },
              { label: "Audio", to: "/" },
              { label: "Smart Watches", to: "/" },
              { label: "Combos & Bundles", to: "/" },
              { label: "Accessories", to: "/" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <Phone className="w-4 h-4 mt-0.5 text-[#ff4500] flex-shrink-0" />
              <a href="https://wa.me/919443353813" className="hover:text-white transition-colors">
                +91 (Mobile number )
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin className="w-4 h-4 mt-0.5 text-[#ff4500] flex-shrink-0" />
              <span>PAN India Delivery Available</span>
            </li>
          </ul>
          <a
            href="https://wa.me/919443353813"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 bg-[#ff4500] hover:bg-[#ff5500] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <img src={whatsapp} alt="WhatsApp" className="w-4 h-4" />
            Order on WhatsApp
          </a>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Crafted with ❤️ for gadget lovers
          </p>
        </div>
      </div>

    </footer>
  )
}

export default Footer
