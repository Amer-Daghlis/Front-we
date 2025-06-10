"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { CasesGrid } from "@/components/dashboard/cases/cases-grid"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Users, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function OrganizationDashboard() {
  const stats = [
    { title: "My Cases", value: "12", icon: FileText, color: "blue" },
    { title: "Active Investigations", value: "8", icon: AlertTriangle, color: "orange" },
    { title: "Resolved Cases", value: "4", icon: CheckCircle, color: "green" },
    { title: "Victims Helped", value: "28", icon: Users, color: "purple" },
  ]
  const organizationId = "ORG001" // This should be dynamically fetched for the logged-in org

  return (
    <DashboardLayout userType="organization">
      <div className="space-y-8 animate-fadeIn">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">Organization Dashboard</h1>
              <p className="text-blue-100 text-base md:text-lg">
                Monitor and manage your human rights cases with precision.
              </p>
            </div>
            <div className="flex gap-3 self-start md:self-center">
              <Button asChild variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                <Link href="/dashboard/organization/add-victim">
                  <Users className="w-4 h-4 mr-2" /> Add Victim
                </Link>
              </Button>
              <Button asChild className="bg-white hover:bg-gray-100 text-blue-600">
                <Link href="/dashboard/organization/add-case">
                  <Plus className="w-4 h-4 mr-2" /> New Case
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <StatsCards stats={stats} />

        <div className="animate-slideInUp animation-delay-600">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Cases</h2>
          <CasesGrid userType="organization" showOnlyOwn={true} currentUserId={organizationId} />
        </div>
      </div>
    </DashboardLayout>
  )
}
