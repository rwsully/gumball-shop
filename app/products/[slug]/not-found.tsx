import Link from "next/link"

export default function ProductNotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
      <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
      <Link href="/products" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
        View All Products
      </Link>
    </div>
  )
}

