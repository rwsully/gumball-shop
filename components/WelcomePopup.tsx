"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Github, Linkedin } from "lucide-react"
import Image from "next/image"

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup")
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsOpen(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("hasSeenWelcomePopup", "true")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close popup"
            >
              <X size={24} />
            </button>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500">
                <Image src="/placeholder.svg" alt="Ryan Sullivan" layout="fill" objectFit="cover" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Welcome to My Portfolio Project</h2>
            <p className="text-gray-600 mb-4 text-center">
              I'm Ryan Sullivan, a full-stack developer. This e-commerce site showcases my skills in Next.js, React, and
              modern web development.
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Project Highlights:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Next.js with App Router</li>
                <li>Responsive design with Tailwind CSS</li>
                <li>State management with React Context</li>
                <li>Integration with Supabase and Stripe</li>
              </ul>
            </div>
            <div className="flex justify-center space-x-4 mb-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/ryan-sullivan-20a388340/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleClose}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Explore the Project
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

