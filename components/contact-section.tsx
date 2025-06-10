"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    title: "Emergency Hotline",
    info: "+1 (555) 123-4567",
    description: "24/7 emergency response line",
  },
  {
    icon: Mail,
    title: "Email Us",
    info: "contact@humanwatch.org",
    description: "General inquiries and reports",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    info: "Geneva, Switzerland",
    description: "International Human Rights Center",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Report a case, seek support, or learn how you can contribute to our mission
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((contact, index) => (
            <Card
              key={index}
              className="text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg"
            >
              <CardHeader>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <contact.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {contact.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-blue-600 mb-2">{contact.info}</p>
                <p className="text-gray-600">{contact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            onClick={() => (window.location.href = "/sign-up")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            Report a Human Rights Violation
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  )
}
