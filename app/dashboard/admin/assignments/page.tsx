"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllCases, getAllLawyers, assignLawyerToCase } from "@/lib/api/cases"

export default function AdminAssignmentsPage() {
  const [cases, setCases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showModal, setShowModal] = useState(false)
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)
  const [lawyers, setLawyers] = useState<any[]>([])
  const [assigning, setAssigning] = useState(false)

  useEffect(() => {
    loadCases()
  }, [])

  async function loadCases() {
    try {
      setLoading(true)
      const data = await getAllCases()
      setCases(data)
    } catch (err: any) {
      setError(err.message || "Failed to load cases")
    } finally {
      setLoading(false)
    }
  }

  const openModal = async (caseId: string) => {
    setSelectedCaseId(caseId)
    setShowModal(true)
    try {
      const data = await getAllLawyers()
      setLawyers(data)
    } catch (err: any) {
      alert("Failed to load lawyers: " + (err.message || JSON.stringify(err)))
    }
  }

  const handleAssign = async (lawyerName: string) => {
    if (!selectedCaseId) return
    setAssigning(true)
    try {
      await assignLawyerToCase(selectedCaseId, lawyerName)
      alert(`Lawyer ${lawyerName} assigned successfully!`)
      setShowModal(false)
      await loadCases()
    } catch (err: any) {
      alert("Failed to assign lawyer: " + (err.message || JSON.stringify(err)))
    } finally {
      setAssigning(false)
    }
  }

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Assign Lawyers to Cases</h1>
        <p className="text-lg text-gray-600">Browse cases and assign responsible lawyers with ease.</p>

        {loading && <p className="text-lg text-blue-600 animate-pulse">Loading cases...</p>}
        {error && <p className="text-lg text-red-600">{error}</p>}
        {!loading && cases.length === 0 && (
          <p className="text-gray-500 text-lg">🎉 All cases have been assigned lawyers!</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <Card key={caseItem.case_id} className="shadow-lg hover:shadow-xl transition-shadow border border-gray-200 rounded-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-t-lg">
                <CardTitle className="text-xl font-semibold text-gray-800">Case ID: {caseItem.case_id}</CardTitle>
                <CardDescription className="text-gray-600">{caseItem.title}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 flex flex-col space-y-4">
                <p className="text-gray-700">Date Reported: {new Date(caseItem.date_reported).toLocaleDateString()}</p>
                <Badge className="bg-blue-500 text-white px-2 py-1 rounded-full">{caseItem.status}</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-600 hover:text-white transition-colors border-blue-500 text-blue-500"
                  onClick={() => openModal(caseItem.case_id)}
                >
                  Assign Lawyer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lawyer Assignment Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-white to-gray-100 rounded-lg p-8 shadow-xl w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Select a Lawyer to Assign</h2>
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {lawyers.map((lawyer) => (
                  <Button
                    key={lawyer.id}
                    className="w-full justify-start bg-gray-100 hover:bg-blue-100 transition-colors text-gray-800"
                    disabled={assigning}
                    onClick={() => handleAssign(lawyer.name || lawyer.full_name || lawyer.username)}
                  >
                    {lawyer.name || lawyer.full_name || lawyer.username}
                  </Button>
                ))}
              </div>
              <div className="mt-6 text-right space-x-4">
                <Button
                  variant="ghost"
                  className="hover:bg-gray-200 transition-colors text-gray-600"
                  onClick={() => setShowModal(false)}
                  disabled={assigning}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  disabled={assigning}
                >
                  Assign Lawyer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
