"use client"

import { useCart } from "@/contexts/CartContext"

type Product = {
  id: string
  name: string
  slug: string
  price: number
}

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <button
      onClick={() =>
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        })
      }
      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Add to Cart
    </button>
  )
}

