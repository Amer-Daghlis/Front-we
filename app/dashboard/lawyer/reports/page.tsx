"use client"
import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ReportsGrid } from "@/components/dashboard/reports/reports-grid"
import { StatusUpdateModal } from "@/components/dashboard/status-update-modal"

export default function LawyerReportsPage() {
  const [showStatusUpdate, setShowStatusUpdate] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const lawyerId = "LAWYER001" // This should be dynamically fetched

  const handleStatusUpdate = (item: any) => {
    setSelectedItem({ ...item, type: "report" })
    setShowStatusUpdate(true)
  }
  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Assigned Reports</h1>
        <p className="text-muted-foreground">Review and manage all reports assigned to you.</p>
        <ReportsGrid
          userType="lawyer"
          showOnlyOwn={true}
          currentUserId={lawyerId}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>
      {selectedItem && (
        <StatusUpdateModal open={showStatusUpdate} onClose={() => setShowStatusUpdate(false)} item={selectedItem} />
      )}
    </DashboardLayout>
  )
}
