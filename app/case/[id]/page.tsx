"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  FileText,
  MapPin,
  Calendar,
  Download,
  Eye,
  MessageSquare,
  History,
  Users,
  Scale,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function CaseDetailPage() {
  const params = useParams()
  const caseId = params.id

  // Mock case data - replace with API call
  const caseData = {
    id: "HR-2024-001",
    title: "Workplace Discrimination Case",
    description:
      "A comprehensive case involving systematic workplace discrimination against multiple employees based on their ethnic background. The case includes documented evidence of unfair treatment, denied promotions, and hostile work environment. Multiple witnesses have come forward with testimonies supporting the claims. The investigation has revealed a pattern of discriminatory behavior spanning over 18 months.",
    location: "New York, USA",
    status: "Under Investigation",
    priority: "High",
    assignedLawyer: "Sarah Johnson",
    submittedBy: "Tech Workers Union",
    submittedDate: "2024-01-15",
    lastUpdated: "2024-01-22",
    violationType: "Workplace Discrimination",
    victims: [
      { name: "John Doe", age: 32, role: "Primary Victim" },
      { name: "Jane Smith", age: 28, role: "Secondary Victim" },
      { name: "Mike Johnson", age: 35, role: "Witness" },
    ],
    evidence: [
      { name: "Email_Evidence.pdf", size: "2.3 MB", type: "PDF" },
      { name: "Witness_Statements.docx", size: "1.8 MB", type: "Document" },
      { name: "Audio_Recording.mp3", size: "15.2 MB", type: "Audio" },
    ],
    timeline: [
      { date: "2024-01-15", event: "Case submitted", user: "Tech Workers Union" },
      { date: "2024-01-16", event: "Case assigned to lawyer", user: "Admin" },
      { date: "2024-01-18", event: "Initial investigation started", user: "Sarah Johnson" },
      { date: "2024-01-20", event: "Evidence collected", user: "Sarah Johnson" },
      { date: "2024-01-22", event: "Status updated", user: "Sarah Johnson" },
    ],
    notes: [
      { date: "2024-01-18", author: "Sarah Johnson", content: "Initial review completed. Strong evidence base." },
      {
        date: "2024-01-20",
        author: "Sarah Johnson",
        content: "Additional witnesses identified. Scheduling interviews.",
      },
    ],
  }

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
    <DashboardLayout userType="organization">
      <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/organization">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold">{caseData.title}</h1>
                <p className="text-blue-100 text-lg">Case ID: {caseData.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(caseData.status)}>{caseData.status}</Badge>
              <Badge className={getPriorityColor(caseData.priority)}>{caseData.priority}</Badge>
            </div>
          </div>
        </div>

        {/* Case Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{caseData.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <Scale className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Assigned Lawyer</p>
                  <p className="font-semibold">{caseData.assignedLawyer}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Victims</p>
                  <p className="font-semibold">{caseData.victims.length} People</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Submitted</p>
                  <p className="font-semibold">{caseData.submittedDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg rounded-xl p-2 border-0">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="victims">Victims</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Case Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{caseData.description}</p>
                <Separator className="my-6" />
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Case Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Violation Type:</span>
                        <span className="font-medium">{caseData.violationType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Submitted By:</span>
                        <span className="font-medium">{caseData.submittedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium">{caseData.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Progress</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Investigation Progress</span>
                          <span className="text-sm font-medium">65%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="w-[65%] h-2 bg-blue-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="victims" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Victims & Witnesses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.victims.map((victim, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{victim.name}</h4>
                          <p className="text-sm text-gray-600">
                            Age: {victim.age} • Role: {victim.role}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evidence" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Evidence Files
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.evidence.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{file.name}</h4>
                          <p className="text-sm text-gray-600">
                            {file.type} • {file.size}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  Case Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {caseData.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{event.event}</h4>
                          <span className="text-sm text-gray-500">{event.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">by {event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Case Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.notes.map((note, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{note.author}</span>
                        <span className="text-sm text-gray-500">{note.date}</span>
                      </div>
                      <p className="text-gray-700">{note.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
