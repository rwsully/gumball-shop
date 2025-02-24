"use client"

import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, removeFromCart } = useCart()
  const router = useRouter()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => router.push("/products")}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="py-4 flex">
                <div className="flex-grow">
                  <h2 className="text-lg font-medium text-gray-900">{item.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-gray-900">Total</h2>
              <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="mt-8 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

