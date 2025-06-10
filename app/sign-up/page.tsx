"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SignUpForm } from "@/components/sign-up-form"

export default function SignUpPage() {
  const router = useRouter()
  const [formCompleted, setFormCompleted] = useState(false)

  const handleFormComplete = () => {
    setFormCompleted(true)
    // Redirect to dashboard or home page after a delay
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join HumanWatch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create an account to report cases, access resources, and support our mission for human rights
          </p>
        </div>

        {formCompleted ? (
          <div className="bg-white rounded-xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for joining HumanWatch. You will be redirected to the dashboard shortly.
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full animate-progress"></div>
            </div>
          </div>
        ) : (
          <SignUpForm onComplete={handleFormComplete} />
        )}
      </div>
      <Footer />
    </div>
  )
}
