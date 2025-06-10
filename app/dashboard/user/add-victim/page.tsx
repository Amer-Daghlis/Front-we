import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AddVictimForm } from "@/components/dashboard/victims/add-victim-form" // Import the new form

const AddVictimPageUser = () => {
  return (
    <DashboardLayout userType="user">
      <AddVictimForm />
    </DashboardLayout>
  )
}

export default AddVictimPageUser
