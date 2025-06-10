"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Badge } from "@/components/ui/badge"

// Placeholder for LawyersGrid - you would create this similar to CasesGrid
// import { LawyersGrid } from "@/components/dashboard/lawyers/lawyers-grid"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminLawyersPage() {
  // Mock data for now
  const lawyers = [
    { id: "LWYR001", name: "Alice Smith", specialization: "Human Rights Law", cases: 12, status: "Active" },
    { id: "LWYR002", name: "Bob Johnson", specialization: "Refugee Law", cases: 8, status: "Active" },
  ]

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
        {/* Replace with <LawyersGrid /> when available */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <Card key={lawyer.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>{lawyer.name}</CardTitle>
                <CardDescription>{lawyer.specialization}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Active Cases: {lawyer.cases}</p>
                <p>
                  Status: <Badge>{lawyer.status}</Badge>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
