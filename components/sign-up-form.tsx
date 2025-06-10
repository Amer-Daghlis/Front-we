"use client"

import type React from "react"
import { useState } from "react"
import {
  Mail,
  Phone,
  Users,
  Building2,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Shield,
  AlertCircle,
  User,
} from "lucide-react"
import { registerUser } from "@/lib/api/auth" // Import the API function
import { useRouter } from "next/navigation"

interface FormData {
  username: string // Added username
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredContact: "email" | "phone"
  userType: "person" | "organization"
  organizationName: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  [key: string]: string
}

interface SignUpFormProps {
  onComplete: () => void
}

export function SignUpForm({ onComplete }: SignUpFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    username: "", // Initialized username
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "email",
    userType: "person",
    organizationName: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): string[] => {
    const errorsArr = []
    if (password.length < 8) errorsArr.push("Password must be at least 8 characters")
    // You can add more specific password rules if needed, matching your backend
    // if (!/[A-Z]/.test(password)) errorsArr.push("Password must contain at least one uppercase letter")
    // if (!/[a-z]/.test(password)) errorsArr.push("Password must contain at least one lowercase letter")
    // if (!/[0-9]/.test(password)) errorsArr.push("Password must contain at least one number")
    return errorsArr
  }

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {}

    if (formData.username.length < 3) {
      // Added username validation
      newErrors.username = "Username must be at least 3 characters"
    }
    if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    }
    if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (formData.phone && formData.phone.length < 10) {
      // Made phone optional for validation if it's optional in model
      newErrors.phone = "Please enter a valid phone number (at least 10 digits)"
    }
    if (formData.userType === "organization" && formData.organizationName.length < 2) {
      newErrors.organizationName = "Organization name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {}
    const passwordErrors = validatePassword(formData.password)

    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join(", ")
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    if (apiError) setApiError(null)
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep2()) {
      setIsLoading(true)
      setApiError(null)

      const apiPayload = {
        username: formData.username,
        email: formData.email,
        role: formData.userType === "person" ? "user" : (formData.userType as "organization" | "admin" | "lawyer"), // Adjust if other roles can sign up
        phone: formData.phone || undefined, // Send undefined if empty, matching Optional[str]
        preferred_contact_method: formData.preferredContact,
        organization_name: formData.userType === "organization" ? formData.organizationName : null,
        password: formData.password,
      }

      try {
        const result = await registerUser(apiPayload)
        console.log("Registration successful:", result)
        onComplete() // Call the onComplete prop from the parent page
      } catch (error: any) {
        console.error("Registration failed:", error)
        setApiError(error.message || "An unexpected error occurred.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="p-6 shadow-xl bg-white rounded-xl border-0">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > 1 ? <CheckCircle className="h-5 w-5" /> : "1"}
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-900">Account Details</p>
            </div>
          </div>
          <div className="hidden sm:block w-24 h-0.5 bg-gray-200"></div>
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-900">Security</p>
            </div>
          </div>
        </div>
      </div>

      {apiError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <p>{apiError}</p>
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleStep1Submit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none text-gray-700">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={`flex h-10 w-full rounded-md border px-3 py-2 pl-10 text-sm transition-colors ${
                  errors.username ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
            {errors.username && (
              <p className="text-sm font-medium text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.username}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-700">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`flex h-10 w-full rounded-md border px-3 py-2 pl-10 text-sm transition-colors ${
                    errors.firstName ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              {errors.firstName && (
                <p className="text-sm font-medium text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-700">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`flex h-10 w-full rounded-md border px-3 py-2 pl-10 text-sm transition-colors ${
                    errors.lastName ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              {errors.lastName && (
                <p className="text-sm font-medium text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`flex h-10 w-full rounded-md border px-3 py-2 pl-10 text-sm transition-colors ${
                    errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              {errors.email && (
                <p className="text-sm font-medium text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-700">Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`flex h-10 w-full rounded-md border px-3 py-2 pl-10 text-sm transition-colors ${
                    errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              {errors.phone && (
                <p className="text-sm font-medium text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium leading-none text-gray-700">Preferred Contact Method</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleInputChange("preferredContact", "email")}
                className={`flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.preferredContact === "email"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    formData.preferredContact === "email" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Mail className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Email</p>
                  <p className="text-xs text-gray-500">Receive updates via email</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleInputChange("preferredContact", "phone")}
                className={`flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.preferredContact === "phone"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    formData.preferredContact === "phone" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Phone className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Phone</p>
                  <p className="text-xs text-gray-500">Receive updates via SMS</p>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium leading-none text-gray-700">I am registering as</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleInputChange("userType", "person")}
                className={`flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.userType === "person"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    formData.userType === "person" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Individual</p>
                  <p className="text-xs text-gray-500">Personal account</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleInputChange("userType", "organization")}
                className={`flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.userType === "organization"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    formData.userType === "organization" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Organization</p>
                  <p className="text-xs text-gray-500">Business or NGO</p>
                </div>
              </button>
            </div>
          </div>

          {formData.userType === "organization" && (
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-700">Organization Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your organization name"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange("organizationName", e.target.value)}
                  className={`flex h-10 w-full rounded-md border px-3 py-2 pl-10 text-sm transition-colors ${
                    errors.organizationName
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              {errors.organizationName && (
                <p className="text-sm font-medium text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.organizationName}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 transform hover:scale-105 group"
            >
              {isLoading ? "Processing..." : "Continue"}
              {!isLoading && (
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              )}
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleStep2Submit} className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors ${
                  errors.password ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              <p className="text-sm text-gray-600">Password must be at least 8 characters.</p>
              {errors.password && (
                <p className="text-sm font-medium text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              {errors.confirmPassword && (
                <p className="text-sm font-medium text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-blue-600 bg-white text-blue-600 hover:bg-blue-50 h-10 px-4 py-2 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 transform hover:scale-105 group"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && (
                <Shield className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
