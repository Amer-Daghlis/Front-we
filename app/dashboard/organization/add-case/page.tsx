import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AddCaseForm } from "@/components/dashboard/cases/add-case-form";

const AddCasePage = () => {
  return (
    <DashboardLayout userType="organization">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Submit New Case</h1>
        <AddCaseForm />
      </div>
    </DashboardLayout>
  )
}

export default AddCasePage
