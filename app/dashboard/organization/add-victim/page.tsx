import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AddVictimForm } from "@/components/dashboard/victims/add-victim-form" // Import the new form

const AddVictimPageOrganization = () => {
  return (
    <DashboardLayout userType="organization">
      <AddVictimForm />
    </DashboardLayout>
  )
}

export default AddVictimPageOrganization
