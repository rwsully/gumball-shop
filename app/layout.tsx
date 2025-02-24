import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navigation } from "@/components/Navigation"
import { CartProvider } from "@/contexts/CartContext"
import { AuthProvider } from "@/contexts/AuthContext"
import WelcomePopup from "@/components/WelcomePopup"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ryan Sullivan's E-commerce Portfolio Project",
  description: "A showcase of full-stack development skills using Next.js, React, and modern web technologies.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
              <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">About Gumball</h3>
                      <p className="text-gray-400">
                        We offer a colorful array of products, as diverse and delightful as a gumball machine.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Contact</h3>
                      <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                        Contact Us
                      </a>
                    </div>
                  </div>
                  <div className="mt-8 text-center text-gray-400">
                    <p>© 2023 Gumball. All rights reserved.</p>
                    <p className="mt-2">
                      Designed, developed and maintained by{" "}
                      <a
                        href="https://www.linkedin.com/in/ryan-sullivan-20a388340/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        Ryan Sullivan
                      </a>
                    </p>
                  </div>
                </div>
              </footer>
            </div>
            <WelcomePopup />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'