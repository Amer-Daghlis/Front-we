import { getToken } from "./auth" // Assuming getToken is in auth.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

// Interface matching your Pydantic model VictimWitnessCreate
export interface VictimWitnessCreateData {
  type: "victim" | "witness"
  anonymous: boolean
  demographics: {
    gender: string
    age: number
    ethnicity: string
    occupation: string
  }
  contact_info: {
    email: string
    phone: string
    secure_messaging: string
  }
  risk_assessment: {
    level: "low" | "medium" | "high"
    threats: string[]
    protection_needed: boolean
  }
  support_services: Array<{
    type: string
    provider: string
    status: string
  }>
}

export async function addVictimWitness(victimData: VictimWitnessCreateData) {
  const token = getToken()
  if (!token) {
    throw new Error("Authentication token not found. Please log in.")
  }

  const response = await fetch(`${API_BASE_URL}/victims/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(victimData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || "Failed to add victim/witness. Please try again.")
  }
  return response.json()
}

// You can add other victim/witness related API functions here later
// e.g., getVictimDetails, updateVictimRiskLevel, etc.
export async function getAllVictims() {
  const token = localStorage.getItem("accessToken")
  if (!token) {
    throw new Error("Access token not found")
  }

  const response = await fetch(`${API_BASE_URL}/victims/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || "Failed to fetch victims")
  }

  return await response.json()
}
