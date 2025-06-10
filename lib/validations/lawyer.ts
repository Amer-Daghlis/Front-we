import * as z from "zod"

export const lawyerSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  specialization: z.string().min(2, { message: "Specialization must be selected." }),
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters." })
    .max(500, { message: "Bio cannot exceed 500 characters." }),
  // Add other fields as necessary, e.g., barNumber, yearsOfExperience
})

export type LawyerFormData = z.infer<typeof lawyerSchema>
