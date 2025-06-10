"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ReportsGrid } from "@/components/dashboard/reports/reports-grid"

export default function AdminAllReportsPage() {
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage All Reports</h1>
        <p className="text-muted-foreground">Review, filter, and manage all submitted reports.</p>
        <ReportsGrid userType="admin" showOnlyOwn={false} />
      </div>
    </DashboardLayout>
  )
}
