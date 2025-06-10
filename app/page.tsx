"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { StatisticsSection } from "@/components/statistics-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HumanRightsLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <StatisticsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
