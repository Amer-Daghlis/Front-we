"use client"

import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export function Navbar() {
  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 group">
            <Shield className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
              Human Rights
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              Services
            </a>
            <a
              href="#statistics"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              Impact
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => (window.location.href = "/sign-in")} // Changed this
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300"
            >
              Sign In
            </Button>
            <Button
              onClick={() => (window.location.href = "/sign-up")}
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
