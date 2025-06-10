"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ShieldAlert, FileText, Eye, Edit, UserCircle2, Cake, VenetianMask } from "lucide-react"
import type { Victim } from "@/types/dashboard-item-types"

interface VictimCardProps {
  victim: Victim
  userType: "organization" | "user" | "lawyer" | "admin"
}

export function VictimCard({ victim, userType }: VictimCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/victim/${victim.id}`) // Link to a general victim detail page
  }

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation()
    action()
  }

  const canEdit = userType === "admin" || userType === "organization"

  const statusColor =
    victim.status === "At Risk"
      ? "bg-red-500/10 text-red-700 border-red-500/30"
      : victim.status === "Safe"
        ? "bg-green-500/10 text-green-700 border-green-500/30"
        : "bg-yellow-500/10 text-yellow-700 border-yellow-500/30" // For Unknown or other states

  return (
    <Card
      onClick={handleCardClick}
      className="cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all duration-300 bg-white flex flex-col h-full rounded-xl overflow-hidden border"
    >
      <CardHeader className="p-5">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-primary/10 rounded-full">
            <UserCircle2 className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-800">{victim.name}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">{victim.id}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-5 flex-grow text-sm">
        <div className="flex items-center text-gray-600">
          <ShieldAlert className="w-4 h-4 mr-3 flex-shrink-0 text-primary/80" />
          <span className="font-medium mr-2">Status:</span>
          <Badge variant="outline" className={`px-2.5 py-0.5 text-xs ${statusColor}`}>
            {victim.status}
          </Badge>
        </div>
        <div className="flex items-center text-gray-600">
          <VenetianMask className="w-4 h-4 mr-3 flex-shrink-0 text-primary/80" />
          <span className="font-medium mr-2">Gender:</span>
          <span>{victim.gender}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Cake className="w-4 h-4 mr-3 flex-shrink-0 text-primary/80" />
          <span className="font-medium mr-2">Age:</span>
          <span>{victim.age} years old</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-3 flex-shrink-0 text-primary/80" />
          <span className="font-medium mr-2">Location:</span>
          <span className="truncate">{victim.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FileText className="w-4 h-4 mr-3 flex-shrink-0 text-primary/80" />
          <span className="font-medium mr-2">Involved in:</span>
          <span>{(victim.caseIds?.length || 0)} case(s)</span>

        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-4 p-4 border-t bg-gray-50/50 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => handleActionClick(e, handleCardClick)}
          aria-label="View victim details"
          className="hover:bg-primary/5 hover:text-primary"
        >
          <Eye className="h-4 w-4 mr-1.5" />
          View
        </Button>
        {canEdit && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => handleActionClick(e, () => router.push(`/dashboard/${userType}/victims/edit/${victim.id}`))}
            aria-label="Edit victim"
            className="hover:bg-gray-500/10"
          >
            <Edit className="h-4 w-4 mr-1.5" />
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
