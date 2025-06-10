"use client"

import { useEffect, useState } from "react"
import { Report } from "@/types/dashboard-item-types"
import { ReportCard } from "./report-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface ReportsGridProps {
  userType: "organization" | "user" | "lawyer" | "admin"
  showOnlyOwn?: boolean
  currentUserId?: string
  onStatusUpdate?: (item: Report) => void
}

export function ReportsGrid({ userType, showOnlyOwn = false, currentUserId, onStatusUpdate }: ReportsGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    const fetchReports = async () => {
      let url = "/api/reports"
      if (showOnlyOwn && currentUserId) {
        url += `?reporter_id=${currentUserId}`
      }
      try {
        const res = await fetch(url)
        const data = await res.json()
        setReports(data)
      } catch (error) {
        console.error("Failed to fetch reports:", error)
      }
    }
    fetchReports()
  }, [showOnlyOwn, currentUserId])

  const filteredReports = reports.filter(
    (r) =>
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reports by ID, title, location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredReports.map((r) => (
            <ReportCard key={r.id} report={r} userType={userType} onStatusUpdate={onStatusUpdate} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center bg-muted/50 rounded-lg p-12 min-h-[300px]">
          <h3 className="text-xl font-semibold">No Reports Found</h3>
          <p className="text-muted-foreground mt-2">
            {showOnlyOwn && userType === "user"
              ? "You have not submitted any reports yet."
              : "No reports match your criteria."}
          </p>
        </div>
      )}
    </div>
  )
}
