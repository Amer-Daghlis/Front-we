"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CasesGrid } from "@/components/dashboard/cases/cases-grid"
import withAuth from "@/lib/withAuth"

function OrganizationAllCasesPage() {
  return (
    <DashboardLayout userType="organization">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">All Cases</h1>
        <p className="text-muted-foreground">Browse and manage all cases in the system.</p>
        <CasesGrid userType="organization" showOnlyOwn={false} />
      </div>
    </DashboardLayout>
  )
}

export default withAuth(OrganizationAllCasesPage)
