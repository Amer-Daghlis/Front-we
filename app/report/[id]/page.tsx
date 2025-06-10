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
  User,
  AlertTriangle,
  Shield,
  Download,
  MessageSquare,
  History,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ReportDetailPage() {
  const params = useParams()
  const reportId = params.id

  // Mock report data - replace with API call
  const reportData = {
    id: "RP-2024-001",
    title: "Harassment at Workplace",
    description:
      "Detailed report of ongoing workplace harassment including verbal abuse, intimidation tactics, and discriminatory behavior. The incident occurred multiple times over a period of 3 months. The reporter has documented specific instances with dates and witnesses. The harassment has created a hostile work environment affecting the mental health and productivity of the victim.",
    location: "San Francisco, USA",
    status: "Under Review",
    priority: "Medium",
    assignedLawyer: "David Kim",
    submittedBy: "Anonymous User",
    submittedDate: "2024-01-18",
    lastUpdated: "2024-01-21",
    violationType: "Workplace Harassment",
    dateOfIncident: "2024-01-10",
    isAnonymous: true,
    contactInfo: "Protected",
    evidence: [
      { name: "Incident_Report.pdf", size: "1.2 MB", type: "PDF" },
      { name: "Email_Screenshots.jpg", size: "3.4 MB", type: "Image" },
    ],
    timeline: [
      { date: "2024-01-18", event: "Report submitted", user: "Anonymous User" },
      { date: "2024-01-19", event: "Report acknowledged", user: "System" },
      { date: "2024-01-20", event: "Assigned to lawyer", user: "Admin" },
      { date: "2024-01-21", event: "Initial review started", user: "David Kim" },
    ],
    notes: [
      { date: "2024-01-20", author: "David Kim", content: "Report received. Beginning preliminary review." },
      { date: "2024-01-21", author: "David Kim", content: "Evidence appears credible. Proceeding with investigation." },
    ],
    supportNeeded: true,
  }

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
    <DashboardLayout userType="user">
      <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/user">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold">{reportData.title}</h1>
                <p className="text-emerald-100 text-lg">Report ID: {reportData.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(reportData.status)}>{reportData.status}</Badge>
              <Badge className={getPriorityColor(reportData.priority)}>{reportData.priority}</Badge>
              {reportData.isAnonymous && (
                <Badge className="bg-purple-100 text-purple-800">
                  <Shield className="w-3 h-3 mr-1" />
                  Anonymous
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Report Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{reportData.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Assigned Lawyer</p>
                  <p className="font-semibold">{reportData.assignedLawyer}</p>
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
                  <p className="text-sm text-gray-600">Incident Date</p>
                  <p className="font-semibold">{reportData.dateOfIncident}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold">{reportData.violationType}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg rounded-xl p-2 border-0">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Report Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">{reportData.description}</p>

                {reportData.supportNeeded && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-800">Support Needed</span>
                    </div>
                    <p className="text-red-700 text-sm mt-1">
                      This person has requested immediate support or assistance.
                    </p>
                  </div>
                )}

                <Separator className="my-6" />

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Report Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Violation Type:</span>
                        <span className="font-medium">{reportData.violationType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Submitted By:</span>
                        <span className="font-medium">{reportData.submittedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contact Info:</span>
                        <span className="font-medium">{reportData.contactInfo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium">{reportData.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Privacy Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">
                          {reportData.isAnonymous ? "Anonymous submission" : "Identity disclosed"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700">24/7 support available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evidence" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Supporting Evidence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.evidence.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-emerald-100 rounded">
                          <FileText className="w-5 h-5 text-emerald-600" />
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
                  Report Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reportData.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-emerald-600 rounded-full mt-2"></div>
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
                  {reportData.notes.map((note, index) => (
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
