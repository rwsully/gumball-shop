import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="mb-4">For any inquiries or support, please reach out to Ryan Sullivan via LinkedIn:</p>
      <Link
        href="https://www.linkedin.com/in/ryan-sullivan-20a388340/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors"
      >
        Ryan Sullivan's LinkedIn Profile
      </Link>
      <p className="mt-4">We appreciate your interest in Gumball and look forward to assisting you!</p>
    </div>
  )
}

