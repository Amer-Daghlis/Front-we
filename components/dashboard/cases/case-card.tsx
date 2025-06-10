"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2, MapPin, CalendarDays, UserCheck, AlertTriangle, Briefcase } from "lucide-react"
import type { Case } from "@/types/dashboard-item-types"

interface CaseCardProps {
  caseItem: Case
  userType: "organization" | "user" | "lawyer" | "admin"
  onStatusUpdate?: (item: Case) => void
}

export function CaseCard({ caseItem, userType, onStatusUpdate }: CaseCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/case/${caseItem.id}`)
  }

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation()
    action()
  }

  const canEditDelete = userType === "admin" || userType === "organization"
  const canUpdateStatus = (userType === "lawyer" || userType === "admin") && onStatusUpdate

  const priorityColor =
    caseItem.priority === "High"
      ? "bg-red-500/10 text-red-700 border-red-500/30"
      : caseItem.priority === "Medium"
        ? "bg-orange-500/10 text-orange-700 border-orange-500/30"
        : "bg-yellow-500/10 text-yellow-700 border-yellow-500/30"

  const statusColor =
    caseItem.status === "Open"
      ? "bg-blue-500/10 text-blue-700 border-blue-500/30"
      : caseItem.status === "In Progress"
        ? "bg-purple-500/10 text-purple-700 border-purple-500/30"
        : caseItem.status === "Resolved"
          ? "bg-green-500/10 text-green-700 border-green-500/30"
          : "bg-gray-500/10 text-gray-700 border-gray-500/30" // For Closed or other states

  return (
    <Card
      onClick={handleCardClick}
      className="cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col h-full bg-white rounded-xl overflow-hidden border"
    >
      <CardHeader className="p-5">
        <div className="flex justify-between items-start gap-3 mb-2">
          <CardTitle className="text-xl font-bold leading-tight text-gray-800">{caseItem.title}</CardTitle>
          <Badge variant="outline" className={`whitespace-nowrap px-3 py-1 text-xs font-semibold ${priorityColor}`}>
            <AlertTriangle className="w-3 h-3 mr-1.5" />
            {caseItem.priority} Priority
          </Badge>
        </div>
        <CardDescription className="text-xs text-muted-foreground">{caseItem.id}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-5 space-y-4 text-sm">
        <div className="flex items-center text-gray-600">
          <Briefcase className="w-4 h-4 mr-3 flex-shrink-0 text-primary/80" />
          <span className="font-medium mr-2">Status:</span>
          <Badge variant="outline" className={`px-2.5 py-0.5 text-xs ${statusColor}`}>
            {caseItem.status}
          </Badge>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-3 flex-shrink-0 text-primary/80" />
          <span className="font-medium mr-2">Location:</span>
          <span className="truncate">{caseItem.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <CalendarDays className="w-4 h-4 mr-3 flex-shrink-0 text-primary/80" />
          <span className="font-medium mr-2">Reported:</span>
          <span>{new Date(caseItem.dateReported).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <UserCheck className="w-4 h-4 mr-3 flex-shrink-0 text-primary/80" />
          <span className="font-medium mr-2">Assigned:</span>
          <span className="truncate">{caseItem.assignedLawyer || "N/A"}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 p-4 border-t bg-gray-50/50">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => handleActionClick(e, handleCardClick)}
          aria-label="View case"
          className="hover:bg-primary/5 hover:text-primary"
        >
          <Eye className="h-4 w-4 mr-1.5" />
          View
        </Button>
        {canUpdateStatus && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => handleActionClick(e, () => onStatusUpdate(caseItem))}
            aria-label="Update status"
            className="text-blue-600 border-blue-300 hover:bg-blue-500/10 hover:text-blue-700"
          >
            <Edit className="h-4 w-4 mr-1.5" />
            Update
          </Button>
        )}
        {canEditDelete && !canUpdateStatus && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => handleActionClick(e, () => router.push(`/dashboard/${userType}/cases/edit/${caseItem.id}`))}
            aria-label="Edit case"
            className="hover:bg-gray-500/10"
          >
            <Edit className="h-4 w-4 mr-1.5" />
            Edit
          </Button>
        )}
        {canEditDelete && (
          <Button
            variant="outline"
            size="sm"
            className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive/90"
            onClick={(e) => handleActionClick(e, () => alert(`Delete ${caseItem.id}? This action is not implemented.`))}
            aria-label="Delete case"
          >
            <Trash2 className="h-4 w-4 mr-1.5" />
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
