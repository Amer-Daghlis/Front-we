"use client"

import { CheckCircle, Award } from "lucide-react"

const principles = [
  "Independent and impartial investigations",
  "Collaboration with international bodies",
  "Victim-centered approach",
  "Transparency and accountability",
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">About HumanWatch</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2010, HumanWatch has been at the forefront of human rights monitoring and advocacy. Our
              dedicated team of investigators, lawyers, and activists work around the clock to document violations and
              ensure accountability.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We believe that every person deserves to live with dignity, free from persecution and violence. Our
              mission is to create a world where human rights are respected, protected, and fulfilled for all.
            </p>

            <div className="space-y-4">
              {principles.map((item, index) => (
                <div key={index} className="flex items-center group">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white transform hover:scale-105 transition-transform duration-300 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-blue-100 leading-relaxed">
                To monitor, document, and advocate for human rights worldwide, ensuring that violations are brought to
                light and justice is served for all victims of human rights abuses.
              </p>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="font-bold text-gray-900">UN Recognition</div>
                  <div className="text-sm text-gray-600">Official Observer Status</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
