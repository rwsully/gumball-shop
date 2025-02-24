import { getSupabase } from "@/utils/supabase"
import ProductGrid from "@/components/ProductGrid"

async function getProductsByCategory(slug: string) {
  const supabase = getSupabase()
  try {
    console.log("Fetching products for category slug:", slug) // Debug log

    const { data, error } = await supabase
      .from("products")
      .select("id, name, slug, price, category")
      .eq("category", slug)

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Failed to fetch products: ${error.message}`)
    }

    console.log("Fetched products:", data) // Debug log

    return data
  } catch (error) {
    console.error("Error in getProductsByCategory:", error)
    throw error
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  console.log("CategoryPage rendered with slug:", params.slug) // Debug log

  try {
    const products = await getProductsByCategory(params.slug)

    // Convert the slug to a display-friendly category name
    const categoryName = params.slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    console.log("Processed category name:", categoryName) // Debug log

    if (!products || products.length === 0) {
      console.log("No products found for category:", categoryName) // Debug log
      return (
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      )
    }

    console.log("Rendering ProductGrid with products:", products) // Debug log

    return (
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">{categoryName}</h1>
        <ProductGrid products={products} />
      </div>
    )
  } catch (error) {
    console.error("Error in CategoryPage:", error)
    return (
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Category Not Found</h1>
        <p className="text-red-500">We couldn't find the category you're looking for.</p>
        <p className="text-sm text-gray-500 mt-2">Error details: {(error as Error).message}</p>
        <p className="text-sm text-gray-500">Slug: {params.slug}</p>
      </div>
    )
  }
}

