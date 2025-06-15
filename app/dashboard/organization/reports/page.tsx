"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ReportsGrid } from "@/components/dashboard/reports/reports-grid"
import withAuth from "@/lib/withAuth"

function OrganizationAllReportsPage() {
  return (
    <DashboardLayout userType="organization">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">All Reports</h1>
        <p className="text-muted-foreground">Review all submitted reports.</p>
        <ReportsGrid userType="organization" />
      </div>
    </DashboardLayout>
  )
}

export default withAuth(OrganizationAllReportsPage)
