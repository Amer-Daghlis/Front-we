"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Search, Filter, Edit } from "lucide-react"

interface AssignedReportsTableProps {
  onStatusUpdate: (item: any) => void
}

export function AssignedReportsTable({ onStatusUpdate }: AssignedReportsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const reports = [
    {
      id: "RP-2024-001",
      title: "Harassment at Workplace",
      location: "San Francisco, USA",
      status: "Under Review",
      priority: "Medium",
      submittedBy: "Anonymous User",
      assignedDate: "2024-01-18",
      deadline: "2024-02-01",
      type: "Workplace Violation",
      progress: 40,
    },
    {
      id: "RP-2024-005",
      title: "Police Misconduct Report",
      location: "Chicago, USA",
      status: "Investigation Required",
      priority: "High",
      submittedBy: "Community Member",
      assignedDate: "2024-01-19",
      deadline: "2024-01-30",
      type: "Police Brutality",
      progress: 75,
    },
    {
      id: "RP-2024-008",
      title: "Healthcare Access Denied",
      location: "Rural Texas, USA",
      status: "Pending Review",
      priority: "Medium",
      submittedBy: "Healthcare Advocate",
      assignedDate: "2024-01-21",
      deadline: "2024-02-05",
      type: "Healthcare Rights",
      progress: 20,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Investigation Required":
        return "bg-orange-100 text-orange-800"
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
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

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex items-center space-x-4 p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search assigned reports..."
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
              <TableHead>Progress</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
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
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(report.progress)}`}
                        style={{ width: `${report.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{report.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>{report.deadline}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onStatusUpdate(report)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
