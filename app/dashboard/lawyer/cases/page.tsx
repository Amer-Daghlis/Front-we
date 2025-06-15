"use client"
import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CasesGrid } from "@/components/dashboard/cases/cases-grid"
import { StatusUpdateModal } from "@/components/dashboard/status-update-modal"
import { getCasesForLawyer } from "@/lib/api/cases"
import withAuth from "@/lib/withAuth"

function LawyerCasesPage() {
  const [showStatusUpdate, setShowStatusUpdate] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCases() {
      try {
        const data = await getCasesForLawyer()
        setCases(data)
      } catch (err) {
        setError(
          err && typeof err === "object" && "message" in err
            ? String((err as { message?: unknown }).message)
            : "Error fetching cases"
        )
      } finally {
        setLoading(false)
      }
    }
    fetchCases()
  }, [])

  const handleStatusUpdate = (item: any) => {
    setSelectedItem({ ...item, id: item.case_id, type: "case" }) // Map case_id to id
    setShowStatusUpdate(true)
  }

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Assigned Cases</h1>
        <p className="text-muted-foreground">Manage all cases assigned to you.</p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <CasesGrid
            userType="lawyer"
            showOnlyOwn={true}
            data={cases}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </div>

      {selectedItem && (
        <StatusUpdateModal
          open={showStatusUpdate}
          onClose={() => setShowStatusUpdate(false)}
          item={selectedItem}
        />
      )}
    </DashboardLayout>
  )
}

export default withAuth(LawyerCasesPage)
