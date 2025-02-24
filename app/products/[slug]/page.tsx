import Image from "next/image"
import { notFound } from "next/navigation"
import { getSupabase } from "@/utils/supabase"
import AddToCartButton from "@/components/AddToCartButton"
import { getRandomProductImage } from "@/utils/imageUtils"

async function getProduct(slug: string) {
  const supabase = getSupabase()
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const imageUrl = getRandomProductImage(product.name, 800, 800)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={product.name}
            width={800}
            height={800}
            className="w-full h-auto rounded-lg object-cover"
            priority
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}

