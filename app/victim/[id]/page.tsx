// This is a new placeholder page for victim details
"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout" // Assuming victims might be viewed within a dashboard context by some users
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, UserCircle2, MapPin, ShieldAlert, FileText, Cake, VenetianMask } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

// Mock victim data - replace with actual data fetching
const mockVictims = [
  {
    id: "VIC-001",
    name: "John Doe",
    age: 34,
    gender: "Male",
    location: "Capital City, North Province",
    status: "At Risk",
    caseIds: ["HR-2024-001", "HR-2024-004"],
    details:
      "John Doe is a journalist who has been receiving threats due to his investigative work on local corruption.",
  },
  {
    id: "VIC-002",
    name: "Maria Garcia",
    age: 28,
    gender: "Female",
    location: "Metroville, South Province",
    status: "Safe",
    caseIds: ["HR-2024-002"],
    details: "Maria Garcia was a victim of domestic violence and has now been relocated to a safe house.",
  },
]

export default function VictimDetailPage() {
  const router = useRouter()
  const params = useParams()
  const victimId = params.id as string

  // Fetch victim data based on victimId - using mock data for now
  const victim = mockVictims.find((v) => v.id === victimId)

  if (!victim) {
    return (
      // Adjust layout if not within dashboard
      <div className="p-6">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <p>Victim not found.</p>
      </div>
    )
  }

  // Determine a userType for DashboardLayout if this page can be accessed by different roles
  // For simplicity, defaulting to 'user' or making it conditional
  const userTypeForLayout = "user" // Or determine dynamically

  return (
    <DashboardLayout userType={userTypeForLayout}>
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={() => router.back()} className="mb-6 text-sm">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
        </Button>

        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="bg-slate-50 p-6 border-b">
            <div className="flex items-center space-x-4">
              <UserCircle2 className="h-16 w-16 text-primary" />
              <div>
                <CardTitle className="text-3xl font-bold text-gray-800">{victim.name}</CardTitle>
                <CardDescription className="text-md text-gray-500">Victim ID: {victim.id}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
            <div className="flex items-start">
              <ShieldAlert className="h-5 w-5 mr-3 mt-0.5 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700">Status</p>
                <p className="text-gray-600">{victim.status}</p>
              </div>
            </div>
            <div className="flex items-start">
              <VenetianMask className="h-5 w-5 mr-3 mt-0.5 text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700">Gender</p>
                <p className="text-gray-600">{victim.gender}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Cake className="h-5 w-5 mr-3 mt-0.5 text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700">Age</p>
                <p className="text-gray-600">{victim.age} years old</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 mt-0.5 text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700">Location</p>
                <p className="text-gray-600">{victim.location}</p>
              </div>
            </div>
            <div className="md:col-span-2 flex items-start">
              <FileText className="h-5 w-5 mr-3 mt-0.5 text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700">Associated Case IDs</p>
                {victim.caseIds.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-600">
                    {victim.caseIds.map((caseId) => (
                      <li key={caseId}>
                        <Link href={`/case/${caseId}`} className="text-blue-600 hover:underline">
                          {caseId}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No associated cases.</p>
                )}
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold text-gray-700 mb-1">Details</p>
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed bg-slate-50 p-4 rounded-md border">
                {victim.details || "No additional details provided."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
