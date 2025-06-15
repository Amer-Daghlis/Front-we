"use client"

import { useEffect, useState } from "react"
import { ReportCard } from "./report-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, RefreshCw, AlertCircle, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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

interface UserInfo {
  username?: string
  email?: string
  id?: string
  [key: string]: any
}

interface ReportsGridProps {
  userType: "organization" | "user" | "lawyer" | "admin"
  showOnlyOwn?: boolean
  currentUserId?: string
  onStatusUpdate?: (item: Report) => void
}

export function ReportsGrid({ userType, showOnlyOwn = false, currentUserId, onStatusUpdate }: ReportsGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [authStatus, setAuthStatus] = useState<string>('checking')

  const getApiBaseUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
  }

  // Get authentication token from various possible storage locations
  const getAuthToken = () => {
    const possibleKeys = ['token', 'authToken', 'access_token', 'jwt', 'accessToken']

    for (const key of possibleKeys) {
      const token = localStorage.getItem(key)
      if (token && token.length > 10) { // Basic validation
        console.log(`🔐 Found token in '${key}':`, token.substring(0, 20) + '...')
        return token
      }
    }

    console.log('🔐 No valid token found in localStorage')
    return null
  }

  // Fetch current user info from /users/me endpoint
  const fetchUserInfo = async (): Promise<UserInfo | null> => {
    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error('No authentication token found')
      }

      const baseUrl = getApiBaseUrl()
      const response = await fetch(`${baseUrl}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch user info: ${response.status} ${response.statusText}`)
      }

      const userData = await response.json()
      console.log('👤 User info from /users/me:', userData)

      setUserInfo(userData)
      setAuthStatus('authenticated')
      return userData

    } catch (error: any) {
      console.error('❌ Failed to fetch user info:', error)
      setAuthStatus('failed')
      throw error
    }
  }

  // Get the correct username for API calls
  const getUsername = (userData: UserInfo | null): string => {
    if (userData) {
      // Try different possible username fields
      return userData.username ||
        userData.email ||
        userData.id ||
        currentUserId ||
        'unknown'
    }

    // Fallback to localStorage or currentUserId
    return localStorage.getItem('username') ||
      localStorage.getItem('user') ||
      currentUserId ||
      'unknown'
  }

  // Transform incident report to Report format
  const transformIncidentReport = (incidentReport: IncidentReport): Report => {
    const title = incidentReport.incident_details.violation_types
      .map(type => type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
      .join(', ') || 'Incident Report'

    const highPriorityViolations = ['torture', 'extrajudicial_killing', 'sexual_violence', 'enforced_disappearance']
    const hasHighPriority = incidentReport.incident_details.violation_types.some(type =>
      highPriorityViolations.includes(type)
    )
    const priority = hasHighPriority ? "High" : "Medium"

    return {
      id: incidentReport.report_id,
      title: title,
      description: incidentReport.incident_details.description,
      location: `${incidentReport.incident_details.location.city}, ${incidentReport.incident_details.location.country}`,
      status: incidentReport.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      priority: priority,
      dateReported: incidentReport.created_at,
      isAnonymous: incidentReport.anonymous
    }
  }

  const fetchReports = async () => {
    try {
      setLoading(true)
      setError(null)

      // First, get user info to determine the correct username
      let userData: UserInfo | null = null
      try {
        userData = await fetchUserInfo()
      } catch (authError: any) {
        setError(`Authentication failed: ${authError.message}. Please log in again.`)
        return
      }

      const token = getAuthToken()
      if (!token) {
        setError("No authentication token found. Please log in again.")
        return
      }

      const baseUrl = getApiBaseUrl()
      const username = getUsername(userData)

      console.log(`👤 Using username for API call: ${username}`)

      if (username === 'unknown') {
        setError("Could not determine username. Please log in again.")
        return
      }

      let url: string
      if (showOnlyOwn) {
        url = `${baseUrl}/report/${username}`
        console.log(`📡 Fetching user reports for: ${username}`)
      } else {
        url = `${baseUrl}/report/`
        console.log(`📡 Fetching all reports`)
      }

      console.log(`🚀 Making request to: ${url}`)

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })

      console.log(`📊 Response status: ${response.status}`)

      if (!response.ok) {
        if (response.status === 401) {
          setError("Your session has expired. Please log in again.")
          // Clear potentially invalid auth data
          ['token', 'authToken', 'access_token', 'jwt'].forEach(key =>
            localStorage.removeItem(key)
          )
          return
        } else if (response.status === 404) {
          console.log(`ℹ️ No reports found for user ${username}`)
          setReports([])
          return
        }

        const errorText = await response.text()
        throw new Error(`API Error ${response.status}: ${errorText || response.statusText}`)
      }

      const data: IncidentReport[] = await response.json()
      console.log(`✅ Received ${data.length} reports`)

      const transformedReports = data.map(transformIncidentReport)
      setReports(transformedReports)

    } catch (err: any) {
      console.error('❌ Error fetching reports:', err)
      setError(err.message || "Failed to load reports")
      setReports([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [showOnlyOwn, currentUserId])

  const filteredReports = reports.filter(
    (r) =>
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRetry = () => {
    setAuthStatus('checking')
    fetchReports()
  }

  const handleLoginRedirect = () => {
    window.location.href = '/sign-in'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports by ID, title, location..."
            disabled
            className="pl-8"
          />
        </div>
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading reports...</p>
          {authStatus === 'checking' && <p className="text-sm">Checking authentication...</p>}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports by ID, title, location..."
            disabled
            className="pl-8"
          />
        </div>

        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Reports</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-3">{error}</p>

            {/* User info display */}
            {userInfo && (
              <div className="mb-3 p-2 bg-gray-100 rounded text-sm">
                <p className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Logged in as: {getUsername(userInfo)}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleRetry} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
              {error.includes('Authentication') || error.includes('session') && (
                <Button onClick={handleLoginRedirect} size="sm">
                  Go to Login
                </Button>
              )}
            </div>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* User info display when authenticated */}
      {userInfo && (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center text-green-800">
            <User className="w-4 h-4 mr-2" />
            <span className="text-sm">Logged in as: <strong>{getUsername(userInfo)}</strong></span>
          </div>
          <Button onClick={handleRetry} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      )}

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reports by ID, title, location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredReports.map((r) => (
            <ReportCard key={r.id} report={r} userType={userType} onStatusUpdate={onStatusUpdate} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center bg-muted/50 rounded-lg p-12 min-h-[300px]">
          <h3 className="text-xl font-semibold">No Reports Found</h3>
          <p className="text-muted-foreground mt-2">
            {showOnlyOwn && userType === "user"
              ? `You have not submitted any reports yet.`
              : reports.length === 0
                ? "No reports have been submitted yet."
                : "No reports match your search criteria."}
          </p>
          {userInfo && (
            <p className="text-sm text-gray-500 mt-1">
              Checked for user: {getUsername(userInfo)}
            </p>
          )}
        </div>
      )}
    </div>
  )
}