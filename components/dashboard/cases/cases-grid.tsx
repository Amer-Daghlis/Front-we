"use client"

import * as React from "react"
import type { Case } from "@/types/dashboard-item-types"
import { CaseFilters, type CaseFilterValues } from "./case-filters"
import { CaseCard } from "./case-card"
import { getAllCases } from "@/lib/api/cases"

interface CasesGridProps {
  userType: "organization" | "user" | "lawyer" | "admin"
  showOnlyOwn?: boolean
  currentUserId?: string
  onStatusUpdate?: (item: Case) => void
  data?: Case[] // ✅ Add this to accept external case data
}

export function CasesGrid({ userType, showOnlyOwn = false, currentUserId, onStatusUpdate, data }: CasesGridProps) {
  const [filters, setFilters] = React.useState<CaseFilterValues>({
    searchTerm: "",
    location: "",
    status: "all",
    priority: "all",
    date: null,
  })

  const [cases, setCases] = React.useState<Case[]>(data || [])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function fetchCases() {
      try {
        const token = localStorage.getItem("token") || ""
        const fetched = await getAllCases(token)
        setCases(fetched)
      } catch (err: any) {
        setError(err.message || "Failed to load cases")
      } finally {
        setLoading(false)
      }
    }
    if (!data) {
      fetchCases()
    }
  }, [data])

  const filteredCases = React.useMemo(() => {
    return cases.filter((c) => {
      const searchMatch = filters.searchTerm
        ? c.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          c.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          (c.assignedLawyer && c.assignedLawyer.toLowerCase().includes(filters.searchTerm.toLowerCase()))
        : true
      const locationMatch = filters.location ? c.location.toLowerCase().includes(filters.location.toLowerCase()) : true
      const statusMatch = filters.status && filters.status !== "all" ? c.status === filters.status : true
      const priorityMatch = filters.priority && filters.priority !== "all" ? c.priority === filters.priority : true
      const dateMatch = filters.date ? new Date(c.dateReported).toDateString() === filters.date.toDateString() : true

      return searchMatch && locationMatch && statusMatch && priorityMatch && dateMatch
    })
  }, [cases, filters])

  return (
    <div className="space-y-6">
      <CaseFilters onFiltersChange={setFilters} />
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">Loading cases...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCases.map((c) => (
            <CaseCard key={c.id} caseItem={c} userType={userType} onStatusUpdate={onStatusUpdate} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center bg-muted/50 rounded-lg p-12 min-h-[300px]">
          <h3 className="text-xl font-semibold">No Cases Found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  )
}
