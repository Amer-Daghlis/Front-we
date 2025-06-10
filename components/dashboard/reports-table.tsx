"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Search, Filter } from "lucide-react"
import { useRouter } from "next/navigation"

interface ReportsTableProps {
  userType: "organization" | "user" | "lawyer"
  showOnlyOwn?: boolean
}

export function ReportsTable({ userType, showOnlyOwn = false }: ReportsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const reports = [
    {
      id: "RP-2024-001",
      title: "Harassment at Workplace",
      location: "San Francisco, USA",
      status: "Under Review",
      priority: "Medium",
      assignedLawyer: "David Kim",
      submittedBy: "Anonymous User",
      date: "2024-01-18",
      type: "Workplace Violation",
    },
    {
      id: "RP-2024-002",
      title: "Discrimination in Housing",
      location: "Toronto, Canada",
      status: "Acknowledged",
      priority: "High",
      assignedLawyer: "Lisa Rodriguez",
      submittedBy: "John Doe",
      date: "2024-01-16",
      type: "Housing Rights",
    },
    {
      id: "RP-2024-003",
      title: "Educational Access Denied",
      location: "Sydney, Australia",
      status: "Pending",
      priority: "Low",
      assignedLawyer: "Not Assigned",
      submittedBy: "Parent Coalition",
      date: "2024-01-22",
      type: "Education Rights",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Acknowledged":
        return "bg-green-100 text-green-800"
      case "Pending":
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
            placeholder="Search reports..."
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
              <TableHead>Report ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assigned Lawyer</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow
                key={report.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => router.push(`/report/${report.id}`)}
              >
                <TableCell className="font-medium">{report.id}</TableCell>
                <TableCell>{report.title}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.location}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(report.priority)}>{report.priority}</Badge>
                </TableCell>
                <TableCell>{report.assignedLawyer}</TableCell>
                <TableCell>{report.submittedBy}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation() // Prevent row click when clicking the button
                      router.push(`/report/${report.id}`) // Or handle view action differently if needed
                    }}
                    aria-label={`View report ${report.id}`}
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
