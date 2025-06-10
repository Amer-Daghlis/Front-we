"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CasesGrid } from "@/components/dashboard/cases/cases-grid"

export default function AdminAllCasesPage() {
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage All Cases</h1>
        <p className="text-muted-foreground">Oversee, filter, and manage all cases in the system.</p>
        <CasesGrid userType="admin" showOnlyOwn={false} />
      </div>
    </DashboardLayout>
  )
}
