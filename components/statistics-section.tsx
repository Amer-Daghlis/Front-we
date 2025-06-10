"use client"

import { CheckCircle } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"
import { useInView } from "@/hooks/use-in-view"

const statistics = [
  { number: 15420, label: "Cases Documented", suffix: "" },
  { number: 89, label: "Countries Monitored", suffix: "" },
  { number: 7350, label: "Victims Supported", suffix: "" },
  { number: 94, label: "Success Rate", suffix: "%" },
]

export function StatisticsSection() {
  const [statsRef, statsInView] = useInView(0.3)

  return (
    <section
      id="statistics"
      ref={statsRef}
      className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Global Impact</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Numbers that represent real lives changed and justice served across the world
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white group-hover:text-yellow-300 transition-colors duration-300">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} start={statsInView} duration={2500} />
                </div>
                <div className="text-blue-100 font-medium text-lg">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            Trusted by international organizations and governments worldwide
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </section>
  )
}
