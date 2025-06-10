"use client"

import { Button } from "@/components/ui/button"
import { Award, ChevronRight, Eye } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 animate-pulse">
            <Award className="w-4 h-4 mr-2" />
            Protecting Human Rights Worldwide
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Monitoring{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse">
              Human Rights
            </span>
            <br />
            Around the Globe
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We document violations, support victims, and work tirelessly to ensure justice and accountability for human
            rights abuses worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => (window.location.href = "/sign-up")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              Report a Case
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 group"
            >
              <Eye className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
      <div
        className="absolute bottom-20 right-10 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
    </section>
  )
}
