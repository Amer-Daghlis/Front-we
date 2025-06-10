"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
// Placeholder for UsersGrid
// import { UsersGrid } from "@/components/dashboard/users/users-grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AdminUsersPage() {
  // Mock data for now
  const users = [
    { id: "USR001", name: "Jane Doe", email: "jane@example.com", reports: 5, status: "Active" },
    { id: "USR002", name: "John Smith", email: "john@example.com", reports: 2, status: "Suspended" },
  ]
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
        <p className="text-muted-foreground">Oversee all registered users.</p>
        {/* Replace with <UsersGrid /> when available */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Submitted Reports: {user.reports}</p>
                <p>
                  Status: <Badge variant={user.status === "Active" ? "default" : "destructive"}>{user.status}</Badge>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
