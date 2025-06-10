"use client"

import * as React from "react"
import type { Victim } from "@/types/dashboard-item-types"
import { VictimCard } from "./victim-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { getAllVictims } from "@/lib/api/victims"

interface VictimsGridProps {
  userType: "organization" | "user" | "lawyer" | "admin"
}

export function VictimsGrid({ userType }: VictimsGridProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [victims, setVictims] = React.useState<Victim[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function fetchVictims() {
      try {
        const rawData = await getAllVictims()
        const mapped = rawData.map((v: any) => ({
          vic_wit_id: v.vic_wit_id,
          name: `${v.demographics?.gender || ""} (${v.demographics?.age || "?"})`,
          age: v.demographics?.age || null,
          gender: v.demographics?.gender || "",
          location: v.contact_info?.secure_messaging || "",
          status: v.risk_assessment?.level || "unknown",
          caseIds: [], // Default empty if not available
          avatarUrl: "/placeholder.svg?height=100&width=100",
        }))
        setVictims(mapped)
        setLoading(false)
      } catch (err: any) {
        setError(err.message || "Failed to load victims")
        setLoading(false)
      }
    }
    fetchVictims()
  }, [])

  const filteredVictims = React.useMemo(() => {
    return victims.filter((v) => {
      const name = v.name || ""
      const location = v.location || ""
      const id = v.vic_wit_id || ""

      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [victims, searchTerm])

  return (
    <div className="space-y-6">
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search victims by ID, name, location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">Loading victims...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : filteredVictims.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVictims.map((v) => (
            <VictimCard key={v.vic_wit_id} victim={v} userType={userType} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center bg-muted/50 rounded-lg p-12 min-h-[300px]">
          <h3 className="text-xl font-semibold">No Victims Found</h3>
          <p className="text-muted-foreground mt-2">No victims match your search criteria.</p>
        </div>
      )}
    </div>
  )
}
