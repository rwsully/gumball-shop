"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useCart } from "@/contexts/CartContext"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { motion } from "framer-motion"
import { getRandomProductImage } from "@/utils/imageUtils"

type Product = {
  id: string
  name: string
  slug?: string
  price: number
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, removeFromCart, getItemQuantity } = useCart()
  const [quantity, setQuantity] = useState(0)
  const imageUrl = getRandomProductImage(product.name, 300, 300)

  useEffect(() => {
    setQuantity(getItemQuantity(product.id))
  }, [getItemQuantity, product.id])

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 })
  }

  const handleIncreaseQuantity = () => {
    addToCart({ ...product, quantity: 1 })
  }

  const handleDecreaseQuantity = () => {
    removeFromCart(product.id)
  }

  return (
    <motion.div className="card overflow-hidden" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Link
        href={product.slug ? `/product/${product.slug}` : `/product/${product.id}`}
        aria-label={`View details of ${product.name}`}
      >
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover object-center transition-opacity hover:opacity-75"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={product.slug ? `/product/${product.slug}` : `/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-900 font-bold mb-4">${product.price.toFixed(2)}</p>
        {quantity === 0 ? (
          <motion.button
            onClick={handleAddToCart}
            className="btn-primary w-full flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </motion.button>
        ) : (
          <div className="flex items-center justify-between">
            <motion.button
              onClick={handleDecreaseQuantity}
              className="bg-gray-200 text-gray-600 p-2 rounded-full hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <span className="text-lg font-semibold" aria-live="polite" aria-atomic="true">
              {quantity}
            </span>
            <motion.button
              onClick={handleIncreaseQuantity}
              className="bg-gray-200 text-gray-600 p-2 rounded-full hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

