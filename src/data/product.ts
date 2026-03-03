import cmfCombo from "@/assets/products/CMF COMBO.jpeg"
import cmfNeckband from "@/assets/products/CMF NECKBAND.jpeg"
import fossilWatch from "@/assets/products/FOSSIL WATCH.jpeg"
import iWatch from "@/assets/products/I WATCH.jpeg"
import samsungWatch from "@/assets/products/SAMSUNG GALAXY.jpeg"

export type Product = {
  id: number
  name: string
  price: number
  image: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Cmf combo",
    price: 899,
    image: cmfCombo,
  },
  {
    id: 2,
    name: "Cmf neckband",
    price: 599,
    image: cmfNeckband,
  },
  {
    id: 3,
    name: "Fossil analog watch",
    price: 999,
    image: fossilWatch,
  },
  {
    id: 4,
    name: "I watch series 10",
    price: 1050,
    image: iWatch,
  },
  {
    id: 5,
    name: "Samsung galaxy active 2 watch",
    price: 999,
    image: samsungWatch,
  },
]