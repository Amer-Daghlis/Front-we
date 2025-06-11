import { getToken } from "./auth"; // Assuming getToken is in auth.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function getLawyers(){
  const token = getToken()
  if (!token) throw new Error("No token found")

const response = await fetch(`${API_BASE_URL}/users/lawyer`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch user info")
  }

  return response.json()
}