"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllOrganizations, type Organization } from "@/lib/api/organization"

export default function AdminOrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrganizations()
        setOrganizations(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Organizations</h1>
            <p className="text-muted-foreground">Oversee all registered organizations.</p>
          </div>
          <Button asChild>
            <Link href="#">
              <Plus className="mr-2 h-4 w-4" /> Add Organization
            </Link>
          </Button>
        </div>

        {loading ? (
          <p>Loading organizations...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((org) => (
              <Card key={org.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>{org.username}</CardTitle>
                  <CardDescription>Email: {org.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Phone: {org.phone || "N/A"}</p>
                  <p>
                    Status: <Badge variant="default">{org.role}</Badge>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
