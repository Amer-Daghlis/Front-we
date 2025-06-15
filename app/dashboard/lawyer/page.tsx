"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { CasesGrid } from "@/components/dashboard/cases/cases-grid"
import { StatusUpdateModal } from "@/components/dashboard/status-update-modal"
import { FileText, Clock, CheckCircle, AlertTriangle, Scale, Award, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LawyerDashboard() {
  const [showStatusUpdate, setShowStatusUpdate] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const lawyerId = "LAWYER001"

  const stats = [
    {
      title: "Assigned Cases",
      value: "15",
      change: "+3 this week",
      icon: Scale,
      color: "blue",
      trend: "+25%",
    },
   
    {
      title: "Pending Review",
      value: "8",
      change: "Requires action",
      icon: Clock,
      color: "orange",
      trend: "Urgent",
    },
    {
      title: "Completed",
      value: "12",
      change: "This month",
      icon: CheckCircle,
      color: "purple",
      trend: "+71%",
    },
  ]

  const handleStatusUpdate = (item: any, type: "case" | "report") => {
    setSelectedItem({ ...item, type })
    setShowStatusUpdate(true)
  }

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-8 animate-fadeIn">
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-40 translate-x-40 animate-spin-slow"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32 animate-pulse"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold animate-slideInLeft">Lawyer Dashboard</h1>
              <p className="text-indigo-100 text-base md:text-lg animate-slideInLeft animation-delay-200">
                Manage assigned cases and reports with expertise
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4 animate-slideInLeft animation-delay-400">
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm text-xs md:text-sm">
                  <Award className="w-4 h-4" />
                  <span className="font-medium">85% Success Rate</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm text-xs md:text-sm">
                  <Target className="w-4 h-4" />
                  <span className="font-medium">14 Days Avg Resolution</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 self-start md:self-center animate-slideInRight">
              <Badge
                variant="outline"
                className="text-orange-300 border-orange-400/50 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-3 py-1.5"
              >
                <Clock className="w-3.5 h-3.5 mr-1.5" />8 Pending Reviews
              </Badge>
              <Badge
                variant="outline"
                className="text-red-300 border-red-400/50 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-3 py-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />3 Urgent Cases
              </Badge>
            </div>
          </div>
        </div>

        <StatsCards stats={stats} />

        <div className="animate-slideInUp animation-delay-600">
          <Tabs defaultValue="assigned-cases" className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 bg-white/80 shadow-md rounded-xl p-1.5 border-0 backdrop-blur-sm">
              <TabsTrigger
                value="assigned-cases"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg font-medium hover:bg-slate-200/70 py-2"
              >
                Assigned Cases
              </TabsTrigger>
            </TabsList>

            <TabsContent value="assigned-cases">
              <CasesGrid
                userType="lawyer"
                showOnlyOwn={true}
                currentUserId={lawyerId}
                onStatusUpdate={(item) => handleStatusUpdate(item, "case")}
              />
            </TabsContent>
          </Tabs>
        </div>

        {selectedItem && (
          <StatusUpdateModal open={showStatusUpdate} onClose={() => setShowStatusUpdate(false)} item={selectedItem} />
        )}
      </div>
    </DashboardLayout>
  )
}
