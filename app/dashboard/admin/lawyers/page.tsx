"use client"
import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAllLawyers } from "@/lib/api/lawyer"

export default function AdminLawyersPage() {
  const [lawyers, setLawyers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  async function loadLawyers() {
    try {
      const data = await getAllLawyers()
      setLawyers(data)
    } catch (err) {
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  loadLawyers()
}, [])



  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Lawyers</h1>
            <p className="text-muted-foreground">Oversee all registered legal professionals.</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/admin/add-lawyer">
              <Plus className="mr-2 h-4 w-4" /> Add Lawyer
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : lawyers.length === 0 ? (
            <p className="text-gray-500">No lawyers found.</p>
          ) : (
            lawyers.map((lawyer) => (
              <Card key={lawyer.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>{lawyer.username}</CardTitle>
                  <CardDescription>{lawyer.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Phone: {lawyer.phone || "N/A"}</p>
                  <p>Preferred Contact: {lawyer.preferred_contact_method || "N/A"}</p>
                  <p>
                    Role: <Badge>{lawyer.role}</Badge>
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
