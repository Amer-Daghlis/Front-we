"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
// Placeholder for OrganizationsGrid
// import { OrganizationsGrid } from "@/components/dashboard/organizations/organizations-grid"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AdminOrganizationsPage() {
  // Mock data for now
  const organizations = [
    { id: "ORG001", name: "Rights Watchers", members: 50, cases: 25, status: "Verified" },
    { id: "ORG002", name: "Justice Now", members: 120, cases: 40, status: "Pending" },
  ]
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Organizations</h1>
            <p className="text-muted-foreground">Oversee all registered organizations.</p>
          </div>
          <Button asChild>
            {/* Link to add organization page when created */}
            <Link href="#">
              <Plus className="mr-2 h-4 w-4" /> Add Organization
            </Link>
          </Button>
        </div>
        {/* Replace with <OrganizationsGrid /> when available */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <Card key={org.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>{org.name}</CardTitle>
                <CardDescription>Members: {org.members}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Active Cases: {org.cases}</p>
                <p>
                  Status: <Badge variant={org.status === "Verified" ? "default" : "secondary"}>{org.status}</Badge>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
