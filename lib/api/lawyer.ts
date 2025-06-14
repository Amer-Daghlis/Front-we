import { getToken } from "./auth"
import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

/**
 * Get all lawyers from the backend
 */
export async function getAllLawyers() {
  const token = getToken()
  if (!token) throw new Error("Token not found")

  const res = await fetch(`${API_BASE_URL}/users/lawyer`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  const data = await res.json()
  console.log("🧑‍⚖️ Lawyers from API:", data)

  if (!res.ok) {
    throw new Error(data.detail || "Failed to fetch lawyers")
  }

  return data
}


export async function createLawyer(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}) {
  const token = getToken()
  if (!token) throw new Error("Token not found")

  const payload = {
    username: `${data.firstName.toLowerCase()}${data.lastName.toLowerCase()}`,
    email: data.email,
    password: data.password,
    phone: data.phone,
    preferred_contact_method: "email",
  }

  const response = await axios.post(`${API_BASE_URL}/users/lawyer`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  return response.data
}
