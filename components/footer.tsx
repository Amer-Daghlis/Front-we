"use client"

import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">HumanWatch</span>
          </div>

          <div className="text-gray-400 text-center md:text-right">
            <p>&copy; 2024 HumanWatch. All rights reserved.</p>
            <p className="text-sm mt-1">Protecting human rights worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
