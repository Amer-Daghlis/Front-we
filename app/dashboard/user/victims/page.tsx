"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { VictimsGrid } from "@/components/dashboard/victims/victims-grid"

export default function UserAllVictimsPage() {
  return (
    <DashboardLayout userType="user">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Victims</h1>
        <p className="text-muted-foreground">
          View victim profiles relevant to your reports or cases you are involved in.
        </p>
        <VictimsGrid userType="user" />
      </div>
    </DashboardLayout>
  )
}
