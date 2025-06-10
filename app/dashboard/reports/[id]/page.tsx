import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

const ReportPage = ({ params }: { params: { id: string } }) => {
  const reportId = params.id

  return (
    <DashboardLayout>
      <div>
        <h1>Report ID: {reportId}</h1>
        {/* Add report content here */}
      </div>
    </DashboardLayout>
  )
}

export default ReportPage
