"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, MapPin, CalendarDays, UserX, AlertTriangle, FileText } from "lucide-react"

interface Report {
  id: string
  title: string
  description: string
  location: string
  status: string
  priority: string
  dateReported: string
  isAnonymous: boolean
}

interface ReportCardProps {
  report: Report
  userType: "organization" | "user" | "lawyer" | "admin"
  onStatusUpdate?: (item: Report) => void
}

export function ReportCard({ report, userType, onStatusUpdate }: ReportCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    // Navigate to the report detail page using the report ID
    router.push(`/dashboard/reports/${report.id}`)
  }

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation()
    action()
  }

  const canUpdateStatus = (userType === "lawyer" || userType === "admin") && onStatusUpdate

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/10 text-red-700 border-red-500/30"
      case "medium":
        return "bg-orange-500/10 text-orange-700 border-orange-500/30"
      case "low":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/30"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-500/10 text-blue-700 border-blue-500/30"
      case "in progress":
      case "in_progress":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/30"
      case "resolved":
        return "bg-green-500/10 text-green-700 border-green-500/30"
      case "closed":
        return "bg-gray-500/10 text-gray-700 border-gray-500/30"
      default:
        return "bg-purple-500/10 text-purple-700 border-purple-500/30"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card
      onClick={handleCardClick}
      className="cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col h-full bg-white rounded-xl overflow-hidden border group"
    >
      <CardHeader className="p-5">
        <div className="flex justify-between items-start gap-3 mb-2">
          <CardTitle className="text-xl font-bold leading-tight text-gray-800 group-hover:text-primary transition-colors">
            {report.title}
          </CardTitle>
          <Badge variant="outline" className={`whitespace-nowrap px-3 py-1 text-xs font-semibold ${getPriorityColor(report.priority)}`}>
            <AlertTriangle className="w-3 h-3 mr-1.5" />
            {report.priority}
          </Badge>
        </div>
        <CardDescription className="text-xs text-muted-foreground">{report.id}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow p-5 space-y-4 text-sm">
        <div className="flex items-center text-gray-600">
          <FileText className="w-4 h-4 mr-3 flex-shrink-0 text-primary/80" />
          <span className="font-medium mr-2">Status:</span>
          <Badge variant="outline" className={`px-2.5 py-0.5 text-xs ${getStatusColor(report.status)}`}>
            {report.status}
          </Badge>
        </div>

        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-3 flex-shrink-0 text-primary/80" />
          <span className="font-medium mr-2">Location:</span>
          <span className="truncate">{report.location}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <CalendarDays className="w-4 h-4 mr-3 flex-shrink-0 text-primary/80" />
          <span className="font-medium mr-2">Submitted:</span>
          <span>{formatDate(report.dateReported)}</span>
        </div>

        {/* Description preview */}
        <div className="text-gray-600">
          <p className="text-sm line-clamp-2 mt-2">
            {report.description}
          </p>
        </div>

        {/* Anonymous indicator */}
        {report.isAnonymous && (
          <div className="flex items-center text-amber-700 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-md">
            <UserX className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="font-medium text-xs">Anonymous Report</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end space-x-2 p-4 border-t bg-gray-50/50">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => handleActionClick(e, handleCardClick)}
          aria-label="View report"
          className="hover:bg-primary/5 hover:text-primary transition-colors"
        >
          <Eye className="h-4 w-4 mr-1.5" />
          View
        </Button>

        {canUpdateStatus && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => handleActionClick(e, () => onStatusUpdate(report))}
            aria-label="Update status"
            className="text-blue-600 border-blue-300 hover:bg-blue-500/10 hover:text-blue-700 transition-colors"
          >
            <Edit className="h-4 w-4 mr-1.5" />
            Update
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}