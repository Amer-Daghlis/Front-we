const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

interface RegisterUserData {
  username: string
  email: string
  role: "user" | "organization" | "admin" | "lawyer"
  phone?: string
  preferred_contact_method?: string
  organization_name?: string | null
  password?: string
}

export async function registerUser(userData: RegisterUserData) {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || "Registration failed. Please try again.")
  }
  return response.json()
}

export async function loginUser(credentials: FormData) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: credentials, // FastAPI's OAuth2PasswordRequestForm expects form data
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || "Login failed. Please check your credentials.")
  }
  const data = await response.json()
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", data.access_token)
    localStorage.setItem("tokenType", data.token_type)
  }
  return data
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken")
  }
  return null
}

export function getTokenType(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("tokenType")
  }
  return null
}

export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("tokenType")
    // Optionally, redirect to home or login page
    // window.location.href = '/';
  }
}


export async function getCurrentUser() {
  const token = getToken()
  if (!token) throw new Error("No token found")

  const response = await fetch(`${API_BASE_URL}/users/me`, {
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