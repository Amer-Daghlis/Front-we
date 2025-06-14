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
