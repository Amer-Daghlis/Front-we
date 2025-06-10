"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Search, Filter } from "lucide-react"
import { useRouter } from "next/navigation"

interface CasesTableProps {
  userType: "organization" | "user" | "lawyer"
  showOnlyOwn?: boolean
}

export function CasesTable({ userType, showOnlyOwn = false }: CasesTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const cases = [
    {
      id: "HR-2024-001",
      title: "Workplace Discrimination Case",
      location: "New York, USA",
      status: "Under Investigation",
      priority: "High",
      assignedLawyer: "Sarah Johnson",
      submittedBy: "Tech Workers Union",
      date: "2024-01-15",
      victims: 5,
    },
    {
      id: "HR-2024-002",
      title: "Freedom of Speech Violation",
      location: "London, UK",
      status: "Resolved",
      priority: "Medium",
      assignedLawyer: "Michael Chen",
      submittedBy: "Civil Rights Org",
      date: "2024-01-10",
      victims: 1,
    },
    {
      id: "HR-2024-003",
      title: "Police Brutality Incident",
      location: "Berlin, Germany",
      status: "Pending Review",
      priority: "High",
      assignedLawyer: "Emma Wilson",
      submittedBy: "Community Alliance",
      date: "2024-01-20",
      victims: 3,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Investigation":
        return "bg-orange-100 text-orange-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex items-center space-x-4 p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assigned Lawyer</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Victims</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((case_) => (
              <TableRow
                key={case_.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => router.push(`/case/${case_.id}`)}
              >
                <TableCell className="font-medium">{case_.id}</TableCell>
                <TableCell>{case_.title}</TableCell>
                <TableCell>{case_.location}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                </TableCell>
                <TableCell>{case_.assignedLawyer}</TableCell>
                <TableCell>{case_.submittedBy}</TableCell>
                <TableCell>{case_.victims}</TableCell>
                <TableCell>{case_.date}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation() // Prevent row click when clicking the button
                      router.push(`/case/${case_.id}`) // Or handle view action differently if needed
                    }}
                    aria-label={`View case ${case_.id}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
