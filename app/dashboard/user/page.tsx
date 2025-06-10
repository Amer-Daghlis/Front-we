"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ReportsGrid } from "@/components/dashboard/reports/reports-grid"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Users, Shield, Phone, Download, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserDashboard() {
  const stats = [
    {
      title: "My Reports",
      value: "7",
      change: "+1 this week",
      icon: FileText,
      color: "blue",
      trend: "+14.3%",
    },
    {
      title: "Under Review",
      value: "3",
      change: "Pending response",
      icon: Clock,
      color: "orange",
      trend: "Processing",
    },
    {
      title: "Acknowledged",
      value: "4",
      change: "Being processed",
      icon: AlertTriangle,
      color: "green",
      trend: "+100%",
    },
    {
      title: "People Helped",
      value: "12",
      change: "Through my reports",
      icon: Users,
      color: "purple",
      trend: "+20%",
    },
  ]
  const userId = "USER001"

  return (
    <DashboardLayout userType="user">
      <div className="space-y-8 animate-fadeIn">
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-36 translate-x-36 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-28 -translate-x-28 animate-float animation-delay-1000"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold animate-slideInLeft">User Dashboard</h1>
              <p className="text-emerald-100 text-base md:text-lg animate-slideInLeft animation-delay-200">
                Report violations and track your submissions
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4 animate-slideInLeft animation-delay-400">
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm text-xs md:text-sm">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Protected Identity</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm text-xs md:text-sm">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 self-start md:self-center animate-slideInRight">
              <Link href="/dashboard/user/add-victim">
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Add Victim
                </Button>
              </Link>
              <Link href="/dashboard/user/add-report">
                <Button className="bg-white hover:bg-gray-100 text-emerald-600 hover:text-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  New Report
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <StatsCards stats={stats} />

        <div className="animate-slideInUp animation-delay-600">
          <Tabs defaultValue="my-reports" className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 bg-white shadow-lg rounded-xl p-2 border-0">
              <TabsTrigger
                value="my-reports"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all duration-300 rounded-lg font-medium hover:bg-emerald-50"
              >
                My Reports
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all duration-300 rounded-lg font-medium hover:bg-emerald-50"
              >
                Resources
              </TabsTrigger>
            </TabsList>
            <TabsContent value="my-reports">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Submitted Reports</h2>
              <ReportsGrid userType="user" showOnlyOwn={true} currentUserId={userId} />
            </TabsContent>
            <TabsContent value="resources" className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border-0 shadow-xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-red-500" />
                    Emergency Contacts
                  </h3>
                  <div className="space-y-4">
                    <div className="group p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl hover:from-red-100 hover:to-pink-100 transition-all duration-300 cursor-pointer transform hover:scale-105">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-red-800">Emergency Hotline</span>
                        <span className="text-red-600 font-bold text-lg">+1 (555) 911-HELP</span>
                      </div>
                      <p className="text-red-600 text-sm mt-1">24/7 immediate assistance</p>
                    </div>
                    <div className="group p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 cursor-pointer transform hover:scale-105">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-blue-800">Legal Aid</span>
                        <span className="text-blue-600 font-bold text-lg">+1 (555) 123-LAW</span>
                      </div>
                      <p className="text-blue-600 text-sm mt-1">Free legal consultation</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-0 shadow-xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
                    <Download className="w-5 h-5 mr-2 text-emerald-500" />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-300 transform hover:scale-105"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Download Report Template
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 transform hover:scale-105"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Find Legal Support
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-purple-50 hover:border-purple-200 transition-all duration-300 transform hover:scale-105"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Privacy Guidelines
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
