"use client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
// Placeholder for AssignmentsGrid/Component
// import { AssignmentsComponent } from "@/components/dashboard/assignments/assignments-component"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AdminAssignmentsPage() {
  // Mock data for assignments
  const assignments = [
    {
      id: "ASGN001",
      caseId: "HR-2024-015",
      lawyerId: "LWYR001",
      status: "Pending Acceptance",
      dateAssigned: "2024-06-01",
    },
    { id: "ASGN002", reportId: "RP-2024-089", lawyerId: "LWYR002", status: "In Progress", dateAssigned: "2024-05-28" },
  ]
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Assignments</h1>
        <p className="text-muted-foreground">Oversee case and report assignments to lawyers.</p>
        {/* Replace with actual assignments management component */}
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Assignment ID: {assignment.id}</CardTitle>
                <CardDescription>
                  {assignment.caseId ? `Case: ${assignment.caseId}` : `Report: ${assignment.reportId}`} assigned to
                  Lawyer {assignment.lawyerId}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <p>Date Assigned: {assignment.dateAssigned}</p>
                <Badge>{assignment.status}</Badge>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
