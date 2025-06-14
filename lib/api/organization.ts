// lib/api/organization.ts
import { getToken } from "./auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export interface Organization {
  id: string
  username: string
  email: string
  phone?: string
  role: string
  // Add any other fields returned by your API
}

export async function getAllOrganizations(): Promise<Organization[]> {
  const token = getToken()
  if (!token) throw new Error("Token not found")

  const res = await fetch(`${API_BASE_URL}/users/organizations`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.detail || "Failed to fetch organizations")
  }

  return data
}
