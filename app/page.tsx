import { getSupabase } from "@/utils/supabase"
import ProductGrid from "@/components/ProductGrid"

async function getProducts() {
  const supabase = getSupabase()
  const { data, error } = await supabase.from("products").select("id, name, slug, price")

  if (error) {
    console.error("Error fetching products:", error)
    throw new Error("Failed to fetch products")
  }

  return data
}

export default async function HomePage() {
  try {
    const products = await getProducts()

    return (
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Gumball</h1>
        <p className="text-xl text-center mb-12">Discover our colorful world of products!</p>
        <ProductGrid products={products} />
      </div>
    )
  } catch (error) {
    return (
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Gumball</h1>
        <p className="text-red-500">Error loading products. Please try again later.</p>
      </div>
    )
  }
}

