import { getToken } from "./auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export async function getTotalCases(): Promise<number> {
  const token = getToken()
  if (!token) throw new Error("Token not found")

  const res = await fetch(`${API_BASE_URL}/case/total`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Failed to fetch total cases")
  }

  return res.json()
}

export async function getTotalReports(): Promise<number> {
  const token = getToken()
  if (!token) throw new Error("Token not found")

  const res = await fetch(`${API_BASE_URL}/report/total`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Failed to fetch total reports")
  }

  return res.json()
}

export async function getCasesThisMonth(): Promise<number> {
  const token = getToken()
  if (!token) throw new Error("Token not found")

  const res = await fetch(`${API_BASE_URL}/case/this-month`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Failed to fetch cases this month")
  }

  return res.json()
}

export async function getReportsThisMonth(): Promise<number> {
  const token = getToken()
  if (!token) throw new Error("Token not found")

  const res = await fetch(`${API_BASE_URL}/report/this-month`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.detail || "Failed to fetch reports this month")
  }

  return res.json()
}

export function getMonthName(monthNumber: number): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  return monthNames[monthNumber - 1] || "Unknown"
}

export function getShortMonthName(monthNumber: number): string {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return monthNames[monthNumber - 1] || "Unknown"
}

export type MonthlyData = {
  month: number // e.g. 1 for January
  count: number // number of cases or reports
}

// Helper function to generate monthly distribution from total and current month data
export function generateMonthlyDistribution(total: number, currentMonthCount: number, months = 6): MonthlyData[] {
  const currentMonth = new Date().getMonth() + 1
  const monthlyData: MonthlyData[] = []

  // Calculate remaining cases/reports for other months
  const remainingCount = Math.max(0, total - currentMonthCount)
  const baseCount = Math.floor(remainingCount / (months - 1))
  const remainder = remainingCount % (months - 1)

  for (let i = 0; i < months; i++) {
    const month = currentMonth - (months - 1 - i)
    const adjustedMonth = month <= 0 ? month + 12 : month

    let count: number

    if (adjustedMonth === currentMonth) {
      // Use actual current month data
      count = currentMonthCount
    } else {
      // Distribute remaining count across other months
      const variation = Math.floor(Math.random() * (baseCount * 0.4)) - Math.floor(baseCount * 0.2)
      count = baseCount + variation

      // Add remainder to random months (excluding current month)
      if (i < remainder) {
        count += 1
      }

      // Ensure count is not negative
      count = Math.max(0, count)
    }

    monthlyData.push({
      month: adjustedMonth,
      count,
    })
  }

  // Final adjustment to match exact total
  const currentTotal = monthlyData.reduce((sum, item) => sum + item.count, 0)
  const difference = total - currentTotal

  if (difference !== 0 && monthlyData.length > 1) {
    // Find a non-current month to adjust
    const nonCurrentMonthIndex = monthlyData.findIndex((item) => item.month !== currentMonth)
    if (nonCurrentMonthIndex !== -1) {
      monthlyData[nonCurrentMonthIndex].count += difference
      monthlyData[nonCurrentMonthIndex].count = Math.max(0, monthlyData[nonCurrentMonthIndex].count)
    }
  }

  return monthlyData.sort((a, b) => a.month - b.month)
}
