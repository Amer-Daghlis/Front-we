"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Scale, Globe, Heart, TrendingUp } from "lucide-react"

const services = [
  {
    icon: FileText,
    title: "Case Documentation",
    description: "Thorough documentation and investigation of human rights violations with legal precision.",
    color: "blue",
  },
  {
    icon: Users,
    title: "Victim Support",
    description: "Comprehensive support services for victims including legal aid and psychological assistance.",
    color: "indigo",
  },
  {
    icon: Scale,
    title: "Legal Advocacy",
    description: "Strategic litigation and legal advocacy to ensure accountability and justice.",
    color: "purple",
  },
  {
    icon: Globe,
    title: "Global Monitoring",
    description: "Worldwide monitoring network tracking human rights situations across all continents.",
    color: "blue",
  },
  {
    icon: Heart,
    title: "Emergency Response",
    description: "Rapid response team for urgent human rights crises and emergency situations.",
    color: "red",
  },
  {
    icon: TrendingUp,
    title: "Policy Research",
    description: "In-depth research and policy recommendations to prevent future violations.",
    color: "green",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive human rights monitoring and advocacy services to protect and defend fundamental freedoms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50"
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${service.color}-100 text-${service.color}-600 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
