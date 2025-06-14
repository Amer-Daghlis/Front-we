import { getToken } from "./auth"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export async function getAllCases() {
  const token = getToken()
  if (!token) throw new Error("Token not found")

  const res = await fetch(`${API_BASE_URL}/case/cases-need-lawyers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  const data = await res.json()
  console.log("📦 Unassigned Cases from API:", data)

  if (!res.ok) {
    throw new Error(data.detail || "Failed to fetch unassigned cases")
  }

  return data
}

export async function getAllLawyers() {
  const token = getToken()
  if (!token) throw new Error("Token not found")

  const res = await fetch(`${API_BASE_URL}/users/lawyer`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json() // ✅ parse JSON only once
  console.log("Fetched lawyers from API:", data)

  if (!res.ok) {
    throw new Error(data.detail || "Failed to fetch lawyers")
  }

  return data
}


export async function assignLawyerToCase(caseId: string, lawyerName: string) {
  const token = getToken()
  if (!token) throw new Error("Token not found")

  const body = JSON.stringify([{ name: lawyerName }])

  const res = await fetch(`${API_BASE_URL}/case/${caseId}/add-lawyers`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body,
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Failed to assign lawyer")
  }

  return await res.json()
}

export async function getMyCases() {
  const token = getToken()
  if (!token) {
    throw new Error("Authentication required. Please log in.")
  }

  const res = await fetch(`${API_BASE_URL}/case/my-cases`, {    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Failed to fetch your cases")
  }

  return res.json()
}

export async function getCasesNeedingLawyers() {
  const token = getToken()
  if (!token) {
    throw new Error("Authentication required. Please log in.")
  }

  const res = await fetch(`${API_BASE_URL}/case/cases-need-lawyers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Failed to fetch cases needing lawyers")
  }

  return res.json()
}

export async function getCaseById(caseId: string) {
  const token = localStorage.getItem("accessToken")
  const response = await fetch(`${API_BASE_URL}/case/${caseId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to fetch case")
  }

  return response.json()
}

export async function searchCases(field: string, value: string) {
  const token = localStorage.getItem("accessToken")
  const response = await fetch(`${API_BASE_URL}/case/search/?field=${field}&value=${value}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Search failed")
  }

  return response.json()
}

export async function deleteCase(caseId: string) {
  const token = localStorage.getItem("accessToken")
  const response = await fetch(`${API_BASE_URL}/case/${caseId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Delete failed")
  }

  return response.json()
}

export async function updateCaseStatus(caseId: string, newStatus: string) {
  const token = localStorage.getItem("accessToken")
  const response = await fetch(`${API_BASE_URL}/case/${caseId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ new_status: newStatus }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to update case status")
  }

  return response.json()
}

export type CaseCreateData = {
  title: string
  description: string
  violation_types: string[]
  status: string
  priority: string
  location: {
    country: string
    region: string
    coordinates: {
      type: string
      coordinates: [number, number]
    }
  }
  date_occurred: string
  date_reported: string
  victims: string[]
  perpetrators: { name: string; type: string }[]
  candidate_lawyers: string[]
  evidenceFiles: File[]
}

export async function createCase(caseData: CaseCreateData, files: File[]) {
  const token = localStorage.getItem("accessToken")

  console.log("Creating case with data:", caseData)
  console.log("Files to upload:", files.length)

  const formData = new FormData()
  formData.append("case_model", JSON.stringify(caseData))

  files.forEach((file) => {
    formData.append("images", file)
  })

  const response = await fetch(`${API_BASE_URL}/case/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    console.error("Case creation failed:", error)
    throw new Error(error.detail || "Failed to create case")
  }

  const result = await response.json()
  console.log("Case created successfully:", result)
  return result
}

