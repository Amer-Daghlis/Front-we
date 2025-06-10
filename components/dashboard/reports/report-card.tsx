"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, MapPin, CalendarDays, UserX, AlertTriangle, FileText } from "lucide-react"
import type { Report } from "@/types/dashboard-item-types"

interface ReportCardProps {
  report: Report
  userType: "organization" | "user" | "lawyer" | "admin"
  onStatusUpdate?: (item: Report) => void
}

export function ReportCard({ report, userType, onStatusUpdate }: ReportCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/report/${report.id}`)
  }

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation()
    action()
  }

  const canUpdateStatus = (userType === "lawyer" || userType === "admin") && onStatusUpdate

  const priorityColor =
    report.priority === "High"
      ? "bg-red-500/10 text-red-700 border-red-500/30"
      : report.priority === "Medium"
        ? "bg-orange-500/10 text-orange-700 border-orange-500/30"
        : "bg-yellow-500/10 text-yellow-700 border-yellow-500/30"

  const statusColor =
    report.status === "Pending Review"
      ? "bg-blue-500/10 text-blue-700 border-blue-500/30"
      : report.status === "Under Investigation"
        ? "bg-purple-500/10 text-purple-700 border-purple-500/30"
        : report.status === "Action Taken"
          ? "bg-green-500/10 text-green-700 border-green-500/30"
          : "bg-gray-500/10 text-gray-700 border-gray-500/30" // For Closed

  return (
    <Card
      onClick={handleCardClick}
      className="cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col h-full bg-white rounded-xl overflow-hidden border"
    >
      <CardHeader className="p-5">
        <div className="flex justify-between items-start gap-3 mb-2">
          <CardTitle className="text-xl font-bold leading-tight text-gray-800">{report.title}</CardTitle>
          <Badge variant="outline" className={`whitespace-nowrap px-3 py-1 text-xs font-semibold ${priorityColor}`}>
            <AlertTriangle className="w-3 h-3 mr-1.5" />
            {report.priority} Priority
          </Badge>
        </div>
        <CardDescription className="text-xs text-muted-foreground">{report.id}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-5 space-y-4 text-sm">
        <div className="flex items-center text-gray-600">
          <FileText className="w-4 h-4 mr-3 flex-shrink-0 text-primary/80" />
          <span className="font-medium mr-2">Status:</span>
          <Badge variant="outline" className={`px-2.5 py-0.5 text-xs ${statusColor}`}>
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
          <span className="font-medium mr-2">Reported:</span>
          <span>{new Date(report.dateReported).toLocaleDateString()}</span>
        </div>
        {report.isAnonymous && (
          <div className="flex items-center text-amber-700 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-md">
            <UserX className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="font-medium">Submitted Anonymously</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 p-4 border-t bg-gray-50/50">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => handleActionClick(e, handleCardClick)}
          aria-label="View report"
          className="hover:bg-primary/5 hover:text-primary"
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
            className="text-blue-600 border-blue-300 hover:bg-blue-500/10 hover:text-blue-700"
          >
            <Edit className="h-4 w-4 mr-1.5" />
            Update
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
