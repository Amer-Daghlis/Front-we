"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Download, FileText, Users, Shield, BookOpen } from "lucide-react"

export default function UserResourcesPage() {
  return (
    <DashboardLayout userType="user">
      <div className="space-y-8 animate-fadeIn">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Helpful Resources</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Phone className="w-6 h-6 mr-3 text-red-500" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="group p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-red-700">Emergency Hotline</span>
                  <span className="text-red-600 font-bold text-lg">+1 (555) 911-HELP</span>
                </div>
                <p className="text-red-500 text-sm mt-1">24/7 immediate assistance for urgent situations.</p>
              </div>
              <div className="group p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-blue-700">Legal Aid Society</span>
                  <span className="text-blue-600 font-bold text-lg">+1 (555) 123-LAW</span>
                </div>
                <p className="text-blue-500 text-sm mt-1">Free legal consultation and support.</p>
              </div>
              <div className="group p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-green-700">Support Group Network</span>
                  <span className="text-green-600 font-bold text-lg">+1 (555) 555-CARE</span>
                </div>
                <p className="text-green-500 text-sm mt-1">Connect with others and find emotional support.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Download className="w-6 h-6 mr-3 text-emerald-500" />
                Quick Actions & Guides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 hover:bg-emerald-50 hover:border-emerald-300"
              >
                <FileText className="w-5 h-5 mr-3 flex-shrink-0" />
                <div>
                  <span className="font-medium">Download Report Template</span>
                  <p className="text-xs text-muted-foreground">Get our standard template for submitting reports.</p>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 hover:bg-blue-50 hover:border-blue-300"
              >
                <Users className="w-5 h-5 mr-3 flex-shrink-0" />
                <div>
                  <span className="font-medium">Find Local Legal Support</span>
                  <p className="text-xs text-muted-foreground">Directory of verified legal professionals.</p>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 hover:bg-purple-50 hover:border-purple-300"
              >
                <Shield className="w-5 h-5 mr-3 flex-shrink-0" />
                <div>
                  <span className="font-medium">Understand Your Privacy Rights</span>
                  <p className="text-xs text-muted-foreground">Learn how we protect your information.</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <BookOpen className="w-6 h-6 mr-3 text-indigo-500" />
                Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="#" className="block p-3 rounded-md hover:bg-indigo-50 transition-colors">
                <h4 className="font-medium text-indigo-700">How to Document Evidence Safely</h4>
                <p className="text-sm text-muted-foreground">
                  Best practices for collecting and storing sensitive information.
                </p>
              </Link>
              <Link href="#" className="block p-3 rounded-md hover:bg-indigo-50 transition-colors">
                <h4 className="font-medium text-indigo-700">Understanding International Human Rights Law</h4>
                <p className="text-sm text-muted-foreground">An overview of key treaties and conventions.</p>
              </Link>
              <Link href="#" className="block p-3 rounded-md hover:bg-indigo-50 transition-colors">
                <h4 className="font-medium text-indigo-700">Your Rights When Interacting with Law Enforcement</h4>
                <p className="text-sm text-muted-foreground">A guide to navigating encounters with authorities.</p>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
