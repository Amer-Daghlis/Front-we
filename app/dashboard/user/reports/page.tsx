"use client"

import { useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/api/auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ReportsGrid } from "@/components/dashboard/reports/reports-grid"

export default function UserMyReportsPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser()
        setUserId(user.id)
      } catch (err) {
        console.error("Failed to fetch current user", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading your profile...</div>
  }

  return (
    <DashboardLayout userType="user">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">My Reports</h1>
        <p className="text-muted-foreground">Track the status of reports you have submitted.</p>
        {userId && <ReportsGrid userType="user" showOnlyOwn={true} currentUserId={userId} />}
      </div>
    </DashboardLayout>
  )
}
