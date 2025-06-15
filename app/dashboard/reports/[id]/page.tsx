"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
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
  Mail,
  Globe,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

// Type definitions based on your API response
interface ContactInfo {
  email: string
  phone: string
  preferred_contact: string
}

interface Location {
  country: string
  city: string
  coordinates: {
    type: string
    coordinates: [number, number]
  }
}

interface IncidentDetails {
  date: string
  location: Location
  description: string
  violation_types: string[]
}

interface IncidentReport {
  _id: string
  report_id: string
  reporter_type: string
  anonymous: boolean
  contact_info: ContactInfo
  incident_details: IncidentDetails
  status: string
  assigned_to: string | null
  created_at: string
  evidence: string[]
  created_by: string
}

const ReportPage = ({ params }: { params: { id: string } }) => {
  const reportId = params.id
  const router = useRouter()

  const [report, setReport] = useState<IncidentReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userType, setUserType] = useState<"organization" | "user" | "lawyer" | "admin">("user")

  const fetchReportDetails = async () => {
    try {
      setLoading(true)

      // Get current user and determine user type from localStorage or context
      const currentUser = getCurrentUser()
      const currentUserType = getUserType()
      setUserType(currentUserType)

      // Fetch all reports for the user to find the specific report
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/report/`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch reports: ${response.statusText}`)
      }

      const reports = await response.json()
      const foundReport = reports.find((r: IncidentReport) => r.report_id === reportId)

      if (!foundReport) {
        // Try fetching by username if not found in general reports
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/report/${currentUser}`, {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        })

        if (userResponse.ok) {
          const userReports = await userResponse.json()
          const userReport = userReports.find((r: IncidentReport) => r.report_id === reportId)
          if (userReport) {
            setReport(userReport)
            return
          }
        }

        setError('Report not found')
        return
      }

      setReport(foundReport)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch report details')
    } finally {
      setLoading(false)
    }
  }

  // Helper functions - implement these based on your auth system
  const getCurrentUser = () => {
    return localStorage.getItem('username') || 'user'
  }

  const getUserType = (): "organization" | "user" | "lawyer" | "admin" => {
    const role = localStorage.getItem('userRole') || 'user'
    if (['organization', 'user', 'lawyer', 'admin'].includes(role)) {
      return role as "organization" | "user" | "lawyer" | "admin"
    }
    return 'user'
  }

  const getAuthToken = () => {
    return localStorage.getItem('token') || ''
  }

  useEffect(() => {
    fetchReportDetails()
  }, [reportId])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityLevel = () => {
    if (!report) return "Medium"

    const highPriorityViolations = ['torture', 'extrajudicial_killing', 'sexual_violence', 'enforced_disappearance']
    const hasHighPriority = report.incident_details.violation_types.some(type =>
      highPriorityViolations.includes(type)
    )

    return hasHighPriority ? "High" : "Medium"
  }

  const getPriorityColor = () => {
    const priority = getPriorityLevel()
    return priority === "High" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getViolationTypesDisplay = (types: string[]) => {
    return types.map(type =>
      type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    ).join(', ')
  }

  const getReporterTypeDisplay = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const getBackLink = () => {
    const basePath = `/dashboard/${userType}`
    if (userType === 'user') {
      return `${basePath}/reports`
    }
    return `${basePath}/reports`
  }

  if (loading) {
    return (
      <DashboardLayout userType={userType}>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8">
            <Skeleton className="h-8 w-64 mb-2 bg-white/20" />
            <Skeleton className="h-6 w-48 bg-white/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-6 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6">
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !report) {
    return (
      <DashboardLayout userType={userType}>
        <div className="max-w-6xl mx-auto space-y-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-12 text-center">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-900 mb-2">
                {error || 'Report Not Found'}
              </h3>
              <p className="text-red-700 mb-6">
                The report you're looking for doesn't exist or you don't have access to it.
              </p>
              <Link href={getBackLink()}>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Reports
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={getBackLink()}>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold">
                  {getViolationTypesDisplay(report.incident_details.violation_types)}
                </h1>
                <p className="text-emerald-100 text-lg">Report ID: {report.report_id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(report.status)}>
                {report.status.replace('_', ' ').toUpperCase()}
              </Badge>
              <Badge className={getPriorityColor()}>
                {getPriorityLevel()}
              </Badge>
              {report.anonymous && (
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
                  <p className="font-semibold">
                    {report.incident_details.location.city}, {report.incident_details.location.country}
                  </p>
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
                  <p className="text-sm text-gray-600">Assigned To</p>
                  <p className="font-semibold">
                    {report.assigned_to || 'Not Assigned'}
                  </p>
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
                  <p className="font-semibold">
                    {formatDate(report.incident_details.date)}
                  </p>
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
                  <p className="text-sm text-gray-600">Reporter Type</p>
                  <p className="font-semibold">
                    {getReporterTypeDisplay(report.reporter_type)}
                  </p>
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
            <TabsTrigger value="contact">Contact</TabsTrigger>
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
                <p className="text-gray-700 leading-relaxed mb-6">
                  {report.incident_details.description}
                </p>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Report Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Violation Types:</span>
                        <span className="font-medium text-right">
                          {getViolationTypesDisplay(report.incident_details.violation_types)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reporter Type:</span>
                        <span className="font-medium">
                          {getReporterTypeDisplay(report.reporter_type)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created By:</span>
                        <span className="font-medium">{report.created_by}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Submitted:</span>
                        <span className="font-medium">
                          {formatDateTime(report.created_at)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Evidence Count:</span>
                        <span className="font-medium">{report.evidence.length} files</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Location Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700">
                          {report.incident_details.location.country}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">
                          {report.incident_details.location.city}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-gray-700">
                          Coordinates: {report.incident_details.location.coordinates.coordinates.join(', ')}
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
                {report.evidence.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No evidence files attached to this report.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {report.evidence.map((evidenceId, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-emerald-100 rounded">
                            <FileText className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Evidence {index + 1}</h4>
                            <p className="text-sm text-gray-600">
                              Evidence ID: {evidenceId}
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
                )}
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
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-emerald-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Report submitted</h4>
                        <span className="text-sm text-gray-500">
                          {formatDateTime(report.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">by {report.created_by}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Status: {report.status.replace('_', ' ')}</h4>
                        <span className="text-sm text-gray-500">Current</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {report.assigned_to ? `Assigned to ${report.assigned_to}` : 'Awaiting assignment'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {report.anonymous ? (
                  <div className="text-center py-8">
                    <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Anonymous Report</h3>
                    <p className="text-gray-600">
                      Contact information is protected for anonymous reports.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium">{report.contact_info.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="font-medium">{report.contact_info.phone}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <MessageSquare className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="text-sm text-gray-600">Preferred Contact</p>
                            <p className="font-medium">
                              {report.contact_info.preferred_contact.charAt(0).toUpperCase() +
                                report.contact_info.preferred_contact.slice(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default ReportPage