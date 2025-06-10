"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { VictimsGrid } from "@/components/dashboard/victims/victims-grid"

export default function OrganizationAllVictimsPage() {
  return (
    <DashboardLayout userType="organization">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">All Victims</h1>
        <p className="text-muted-foreground">View and manage victim profiles.</p>
        <VictimsGrid userType="organization" />
      </div>
    </DashboardLayout>
  )
}
