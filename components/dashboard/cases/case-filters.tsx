"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Search, XIcon } from "lucide-react"
import type { CasePriority, CaseStatus } from "@/types/dashboard-item-types" // Updated import

export interface CaseFilterValues {
  searchTerm: string
  location: string
  status: CaseStatus | "" | "all" // Added "all"
  priority: CasePriority | "" | "all" // Added "all"
  date: Date | null
}

interface CaseFiltersProps {
  onFiltersChange: (filters: CaseFilterValues) => void
  initialFilters?: Partial<CaseFilterValues>
}

const caseStatuses: CaseStatus[] = ["Open", "In Progress", "Pending Review", "Resolved", "Closed"]
const casePriorities: CasePriority[] = ["High", "Medium", "Low"]

export function CaseFilters({ onFiltersChange, initialFilters = {} }: CaseFiltersProps) {
  const [searchTerm, setSearchTerm] = React.useState(initialFilters.searchTerm || "")
  const [location, setLocation] = React.useState(initialFilters.location || "")
  const [status, setStatus] = React.useState<CaseStatus | "" | "all">(initialFilters.status || "all")
  const [priority, setPriority] = React.useState<CasePriority | "" | "all">(initialFilters.priority || "all")
  const [date, setDate] = React.useState<Date | null>(initialFilters.date || null)

  React.useEffect(() => {
    onFiltersChange({ searchTerm, location, status, priority, date })
  }, [searchTerm, location, status, priority, date, onFiltersChange])

  const handleClearFilters = () => {
    setSearchTerm("")
    setLocation("")
    setStatus("all")
    setPriority("all")
    setDate(null)
  }

  const hasActiveFilters =
    searchTerm || location || (status && status !== "all") || (priority && priority !== "all") || date

  return (
    <div className="p-4 border-b bg-card rounded-lg shadow">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
        <div className="space-y-1">
          <label htmlFor="searchTerm" className="text-sm font-medium text-gray-700">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="searchTerm"
              placeholder="Case ID, title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="location" className="text-sm font-medium text-gray-700">
            Location
          </label>
          <Input
            id="location"
            placeholder="City, Region..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </label>
          <Select value={status} onValueChange={(value: CaseStatus | "" | "all") => setStatus(value)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {caseStatuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label htmlFor="priority" className="text-sm font-medium text-gray-700">
            Priority
          </label>
          <Select value={priority} onValueChange={(value: CasePriority | "" | "all") => setPriority(value)}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              {casePriorities.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Date Reported
          </label>
          <DatePicker
            date={date}
            setDate={setDate}
            buttonClassName="w-full"
            calendarProps={{
              disabled: (d) => d > new Date() || d < new Date("1900-01-01"),
            }}
          />
        </div>
      </div>
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" onClick={handleClearFilters} size="sm">
            <XIcon className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
