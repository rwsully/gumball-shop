"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, Search, User, Menu } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"
import { getSupabase } from "@/utils/supabase"
import { useRouter } from "next/navigation"

export function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()
  const { totalItems } = useCart()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = getSupabase()
      const { data, error } = await supabase.from("products").select("category").not("category", "is", null)

      if (error) {
        console.error("Error fetching categories:", error)
        return
      }

      const uniqueCategories = Array.from(new Set(data.map((item) => item.category)))
      console.log("Fetched categories:", uniqueCategories) // Debug log
      setCategories(uniqueCategories)
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    try {
      const supabase = getSupabase()
      await supabase.auth.signOut()
      setError(null)
    } catch (err) {
      console.error("Error signing out:", err)
      setError("Failed to sign out. Please try again.")
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

  const getCategorySlug = (category: string) => {
    return category.toLowerCase().replace(/ /g, "-")
  }

  const getCategoryTitle = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  console.log("Rendered categories:", categories) // Debug log

  return (
    <nav
      className={`sticky top-0 z-50 bg-white shadow-md transition-shadow duration-300 ${isScrolled ? "shadow-lg" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FF6B6B" />
                <circle cx="12" cy="12" r="7" fill="#FFD93D" />
                <path
                  d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                  fill="#FF6B6B"
                />
              </svg>
              <span className="text-2xl font-bold text-gray-900">Gumball</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => {
              const categorySlug = getCategorySlug(category)
              const categoryTitle = getCategoryTitle(category)
              console.log(`Category: ${category}, Slug: ${categorySlug}, Title: ${categoryTitle}`) // Debug log
              return (
                <Link
                  key={category}
                  href={`/category/${categorySlug}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {categoryTitle}
                </Link>
              )
            })}
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none"
            >
              <Search className="h-6 w-6" />
            </button>
            <Link href="/cart" className="text-gray-600 hover:text-blue-600 transition-colors">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <User className="h-6 w-6 mr-1" />
                  <span className="text-sm">{user.email}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <button
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sign In
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-blue-600 transition-colors focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {isSearchOpen && (
        <div className="px-2 py-2 sm:px-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </form>
        </div>
      )}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {categories.map((category) => {
              const categorySlug = getCategorySlug(category)
              const categoryTitle = getCategoryTitle(category)
              return (
                <Link
                  key={category}
                  href={`/category/${categorySlug}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  {categoryTitle}
                </Link>
              )
            })}
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1 text-center">{error}</p>}
    </nav>
  )
}

