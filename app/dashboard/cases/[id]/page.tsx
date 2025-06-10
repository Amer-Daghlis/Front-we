import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

const CasePage = ({ params }: { params: { id: string } }) => {
  const caseId = params.id

  return (
    <DashboardLayout>
      <div>
        <h1>Case Details</h1>
        <p>Case ID: {caseId}</p>
        {/* Add more case details here */}
      </div>
    </DashboardLayout>
  )
}

export default CasePage
