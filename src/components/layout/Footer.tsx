
import instagram from "../../assets/footer/instagram.svg"
import whatsapp from "../../assets/footer/whatsapp.svg"

const Footer = () => {
  return (
    <footer className="border-t mt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-center">

        {/* Tagline */}
        

        {/* Store Info */}
        <div className="text-sm text-gray-600 space-y-1">
          <p> 📱 Video Call Available to Verify the Product Before Purchase</p>
          <p>🚛 Cash On Delivery Available</p>
          <p>✈️ PAN INDIA Shipping</p>
          
        </div>

        {/* Social Logos */}
        <div className="flex justify-center gap-6 pt-2">

          {/* Instagram */}
          <a
            href="https://www.instagram.com/metro_gadgets7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={instagram}
              alt="Instagram"
              className="w-6 h-6 hover:scale-110 transition"
            />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/916381041017"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={whatsapp}
              alt="WhatsApp"
              className="w-6 h-6 hover:scale-110 transition"
            />
          </a>

        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400 pt-2">
          © {new Date().getFullYear()} Metro Gadgets
        </p>

      </div>
    </footer>
  )
}

export default Footer
