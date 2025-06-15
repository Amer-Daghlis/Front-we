import { getToken } from "./auth" // Assuming getToken is in auth.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export interface IncidentReportCreateData {
  reporter_type: "victim" | "witness" | "other"
  anonymous: boolean
  contact_info: {
    email: string
    phone: string
    preferred_contact: string
  }
  incident_details: {
    date: string // ISO string
    location: {
      country: string
      city: string
      coordinates: {
        type: "Point"
        coordinates: [number, number] // [longitude, latitude]
      }
    }
    description: string
    violation_types: string[]
  }
  status: "new" | "in_progress" | "resolved" | "closed"
  assigned_to?: string | null
  // evidence is handled by file uploads, not directly in this JSON part for the API
}

export async function addIncidentReport(reportData: IncidentReportCreateData, files: File[]) {
  const token = getToken()
  if (!token) {
    throw new Error("Authentication token not found. Please log in.")
  }

  const formData = new FormData()
  formData.append("report_model", JSON.stringify(reportData))

  files.forEach((file) => {
    formData.append("images", file)
  })

  const response = await fetch(`${API_BASE_URL}/report/`, {
    method: "POST",
    headers: {
      // Content-Type is automatically set by the browser for FormData
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.detail || `Failed to submit report: ${response.statusText}`)
  }

  return await response.json()
}

// Placeholder for other report-related API functions if needed
// e.g., getReports, getReportById, updateReportStatus

export async function getUserReports(): Promise<Report[]> {
  const res = await fetch("http://127.0.0.1:8000/report/my", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })

  if (!res.ok) throw new Error("Failed to fetch your reports")
  return res.json()
}


export async function getAllReports(reporterId?: string) {
  const query = reporterId ? `?reporter_id=${reporterId}` : ""
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports${query}`)

  if (!res.ok) {
    throw new Error("Failed to fetch reports")
  }

  return res.json()
}


export async function getTotalReportNumber() {
  const token = localStorage.getItem("accessToken")
  const response = await fetch(`${API_BASE_URL}/report/total`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to fetch total cases number")
  }

  return response.json()
}