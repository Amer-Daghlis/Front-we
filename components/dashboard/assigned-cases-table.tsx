"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Search, Filter, Edit } from "lucide-react"

interface AssignedCasesTableProps {
  onStatusUpdate: (item: any) => void
}

export function AssignedCasesTable({ onStatusUpdate }: AssignedCasesTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const cases = [
    {
      id: "HR-2024-001",
      title: "Workplace Discrimination Case",
      location: "New York, USA",
      status: "Under Investigation",
      priority: "High",
      submittedBy: "Tech Workers Union",
      assignedDate: "2024-01-15",
      deadline: "2024-02-15",
      victims: 5,
      progress: 65,
    },
    {
      id: "HR-2024-004",
      title: "Religious Freedom Violation",
      location: "Paris, France",
      status: "Pending Review",
      priority: "Medium",
      submittedBy: "Faith Community",
      assignedDate: "2024-01-20",
      deadline: "2024-02-20",
      victims: 2,
      progress: 25,
    },
    {
      id: "HR-2024-007",
      title: "Child Labor Investigation",
      location: "Mumbai, India",
      status: "Evidence Collection",
      priority: "High",
      submittedBy: "Child Rights NGO",
      assignedDate: "2024-01-12",
      deadline: "2024-02-10",
      victims: 15,
      progress: 80,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Investigation":
        return "bg-orange-100 text-orange-800"
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800"
      case "Evidence Collection":
        return "bg-blue-100 text-blue-800"
      case "Resolved":
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
            placeholder="Search assigned cases..."
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
              <TableHead>Progress</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Victims</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((case_) => (
              <TableRow key={case_.id}>
                <TableCell className="font-medium">{case_.id}</TableCell>
                <TableCell>{case_.title}</TableCell>
                <TableCell>{case_.location}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(case_.progress)}`}
                        style={{ width: `${case_.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{case_.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>{case_.deadline}</TableCell>
                <TableCell>{case_.victims}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onStatusUpdate(case_)}>
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
