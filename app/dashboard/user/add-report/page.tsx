import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AddReportForm } from "@/components/dashboard/reports/add-report-form" // Updated import

const AddReportPage = () => {
  return (
    <DashboardLayout userType="user">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Submit New Incident Report</h1>
        <AddReportForm />
      </div>
    </DashboardLayout>  
  )
}

export default AddReportPage
