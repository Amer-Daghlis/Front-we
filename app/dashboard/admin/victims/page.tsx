"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { VictimsGrid } from "@/components/dashboard/victims/victims-grid"

export default function AdminAllVictimsPage() {
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage All Victims</h1>
        <p className="text-muted-foreground">View, filter, and manage all victim profiles.</p>
        <VictimsGrid userType="admin" />
      </div>
    </DashboardLayout>
  )
}
