"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
// Import grids for lawyers, orgs, users when available
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTotalCasesNumber } from "@/lib/api/cases" 
import {getTotalReportNumber} from "@/lib/api/reports" 
import { getTotalLawyers } from "@/lib/api/lawyers" 
import { getTotalOrganizations } from "@/lib/api/organization"
import {
  FileText,
  Scale,
  Shield,
  TrendingUp,
  AlertTriangle,
  UserPlus,
  Gavel,
  Building2,
  BarChart3,
  Settings,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview") // Default to overview

  const stats = [
    // ... (stats remain the same)
    {
      title: "Total Cases",
      value: getTotalCasesNumber(),
      change: "+12 this month",
      icon: FileText,
      color: "blue",
      trend: "+8.3%",
    },
    {
      title: "Total Reports",
      value: getTotalReportNumber(),
      change: "+23 this week",
      icon: BarChart3,
      color: "green",
      trend: "+15.2%",
    },
    {
      title: "Active Lawyers",
      value: getTotalLawyers(),
      change: "+2 this month",
      icon: Scale,
      color: "purple",
      trend: "+9.1%",
    },
    {
      title: "Organizations",
      value: getTotalOrganizations(),
      change: "+5 this month",
      icon: Building2,
      color: "orange",
      trend: "+12.5%",
    },
  ]

  const pendingAssignments = [
    // ... (mock data remains the same)
    { id: "HR-2024-015", title: "Police Brutality Case", type: "Case", priority: "High", submitted: "2024-01-23" },
    {
      id: "RP-2024-089",
      title: "Workplace Discrimination",
      type: "Report",
      priority: "Medium",
      submitted: "2024-01-23",
    },
  ]
  const recentActivity = [
    // ... (mock data remains the same)
    { time: "2 hours ago", action: "New case submitted", user: "Tech Workers Union", type: "case" },
    { time: "4 hours ago", action: "Lawyer assigned to case", user: "Admin", type: "assignment" },
  ]

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-8 animate-fadeIn">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 rounded-2xl p-8 text-white shadow-2xl">
          {/* ... (header remains the same) */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-40 translate-x-40 animate-pulse"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold animate-slideInLeft">Admin Dashboard</h1>
              <p className="text-gray-300 text-base md:text-lg animate-slideInLeft animation-delay-200">
                Comprehensive system management and oversight
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4 animate-slideInLeft animation-delay-400">
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm text-xs md:text-sm">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">System Administrator</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm text-xs md:text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">All Access</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 self-start md:self-center animate-slideInRight">
              <Link href="/dashboard/admin/add-lawyer">
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Lawyer
                </Button>
              </Link>
              <Link href="/dashboard/admin/settings">
                <Button className="bg-white hover:bg-gray-100 text-gray-800 hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <StatsCards stats={stats} />

        {/* Quick Actions - these could link to the new dedicated pages */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 animate-slideInUp animation-delay-600">
          <Link href="/dashboard/admin/cases">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">View Cases</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/admin/reports">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">View Reports</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/admin/lawyers">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Scale className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Manage Lawyers</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/admin/organizations">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Building2 className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Manage Orgs</h3>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/admin/assignments">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-rose-50 to-fuchsia-50">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Gavel className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Assignments</h3>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Overview Section - This can remain on the main admin dashboard page */}
        <div className="animate-slideInUp animation-delay-800 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">System Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                  Pending Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingAssignments.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-600">
                          {item.id} • {item.submitted}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            item.priority === "High" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"
                          }
                        >
                          {item.priority}
                        </Badge>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/dashboard/admin/assignments?filter=${item.id}`}>Assign</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div
                        className={`flex-shrink-0 w-2.5 h-2.5 ${activity.type === "case" ? "bg-blue-500" : "bg-green-500"} rounded-full mt-1.5`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">{activity.action}</p>
                        <p className="text-xs text-gray-500">
                          by {activity.user} • {activity.time}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs capitalize">
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
