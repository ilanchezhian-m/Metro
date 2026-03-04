import cmfCombo from "@/assets/products/CMF COMBO.jpeg"
import cmfNeckband from "@/assets/products/CMF NECKBAND.jpeg"
import fossilWatch from "@/assets/products/FOSSIL WATCH.jpeg"
import iWatch from "@/assets/products/I WATCH.jpeg"
import samsungWatch from "@/assets/products/SAMSUNG GALAXY.jpeg"

export type Product = {
  id: number
  name: string
  brand: string
  category: string
  price: number
  description: string
  image?: string
  stock: number
  rating?: number
  featured?: boolean
}

export const products: Product[] = [

  // ⭐ Featured Products (Homepage)

  {
    id: 1,
    name: "Cmf combo",
    brand: "CMF",
    category: "audio",
    price: 899,
    description: "Combo pack including CMF earbuds and accessories. Budget friendly audio bundle.",
    image: cmfCombo,
    stock: 50,
    rating: 4.3,
    featured: true
  },

  {
    id: 2,
    name: "Cmf neckband",
    brand: "CMF",
    category: "audio",
    price: 599,
    description: "Wireless CMF neckband with strong bass and long battery backup.",
    image: cmfNeckband,
    stock: 40,
    rating: 4.2,
    featured: true
  },

  {
    id: 3,
    name: "Fossil analog watch",
    brand: "Fossil",
    category: "watch",
    price: 999,
    description: "Classic Fossil analog watch with premium design and durable strap.",
    image: fossilWatch,
    stock: 20,
    rating: 4.4,
    featured: true
  },

  {
    id: 4,
    name: "I watch series 10",
    brand: "Apple",
    category: "smartwatch",
    price: 1050,
    description: "Smartwatch inspired design with fitness tracking and notification features.",
    image: iWatch,
    stock: 25,
    rating: 4.5,
    featured: true
  },

  {
    id: 5,
    name: "Samsung galaxy active 2 watch",
    brand: "Samsung",
    category: "smartwatch",
    price: 999,
    description: "Samsung Active 2 style smartwatch with fitness tracking and AMOLED display.",
    image: samsungWatch,
    stock: 30,
    rating: 4.4,
    featured: true
  },

  // 🍎 Apple Products

  {
    id: 6,
    name: "Airpods and magsafe combo",
    brand: "Apple",
    category: "audio",
    price: 999,
    description: "Apple style AirPods bundled with MagSafe wireless charger combo.",
    stock: 35
  },

  {
    id: 7,
    name: "Apple airpods pro gen 2",
    brand: "Apple",
    category: "audio",
    price: 650,
    description: "Noise cancelling AirPods Pro Gen 2 with improved sound clarity.",
    stock: 50
  },

  {
    id: 8,
    name: "Airpods pro gen 2",
    brand: "Apple",
    category: "audio",
    price: 850,
    description: "Premium AirPods Pro Gen 2 wireless earbuds with ANC support.",
    stock: 30
  },

  // 🔶 CMF Products

  {
    id: 9,
    name: "Cmf buds and neckband",
    brand: "CMF",
    category: "audio",
    price: 899,
    description: "Combo pack including CMF buds and neckband.",
    stock: 40
  },

  {
    id: 10,
    name: "Cmf buds pro with button",
    brand: "CMF",
    category: "audio",
    price: 600,
    description: "CMF Buds Pro with touch button controls and strong bass.",
    stock: 60
  },

  {
    id: 11,
    name: "Cmf neckband with spis roller",
    brand: "CMF",
    category: "audio",
    price: 600,
    description: "CMF neckband bundle with Spis roller accessory.",
    stock: 30
  },

  {
    id: 12,
    name: "Cmf buds",
    brand: "CMF",
    category: "audio",
    price: 600,
    description: "Compact CMF wireless earbuds with balanced sound.",
    stock: 50
  },

  {
    id: 13,
    name: "Cmf buds 2",
    brand: "CMF",
    category: "audio",
    price: 600,
    description: "Updated CMF Buds 2 with improved battery life.",
    stock: 45
  },

  // 📱 Samsung Products

  {
    id: 14,
    name: "Samsung ultra t watch + oneplus buds 3 pro",
    brand: "Samsung",
    category: "combo",
    price: 1499,
    description: "Combo pack including Samsung Ultra T watch and OnePlus Buds 3 Pro.",
    stock: 20
  },

  {
    id: 15,
    name: "Samsung buds 3 pro",
    brand: "Samsung",
    category: "audio",
    price: 850,
    description: "Samsung Buds 3 Pro with premium sound and comfortable fit.",
    stock: 40
  },

  {
    id: 16,
    name: "Samsung buds 2 pro",
    brand: "Samsung",
    category: "audio",
    price: 799,
    description: "Samsung Buds 2 Pro wireless earbuds with ANC.",
    stock: 35
  },

  // 🔵 OnePlus

  {
    id: 17,
    name: "Oneplus buds 3 pro",
    brand: "OnePlus",
    category: "audio",
    price: 599,
    description: "OnePlus Buds 3 Pro with clear audio and fast pairing.",
    stock: 45
  },

  {
    id: 18,
    name: "Oneplus and neckband combo",
    brand: "OnePlus",
    category: "combo",
    price: 599,
    description: "OnePlus earbuds and neckband combo pack.",
    stock: 25
  },

  // 🔋 Accessories

  {
    id: 19,
    name: "Magsafe powerbank",
    brand: "Apple",
    category: "accessory",
    price: 699,
    description: "MagSafe compatible wireless powerbank for smartphones.",
    stock: 30
  }

]