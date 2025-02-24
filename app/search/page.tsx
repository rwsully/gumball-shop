import { getSupabase } from "@/utils/supabase"
import ProductGrid from "@/components/ProductGrid"

async function searchProducts(query: string) {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, price, image_url")
    .ilike("name", `%${query}%`)

  if (error) {
    console.error("Error searching products:", error)
    throw new Error("Failed to search products")
  }

  return data
}

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q

  try {
    const products = await searchProducts(query)

    return (
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Search Results for "{query}"</h1>
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-center text-gray-600">No products found for "{query}"</p>
        )}
      </div>
    )
  } catch (error) {
    return (
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        <p className="text-red-500">Error searching products. Please try again later.</p>
      </div>
    )
  }
}

