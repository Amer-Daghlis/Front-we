"use client"
import { useState, type ChangeEvent, type FormEvent } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  X,
  PlusCircle,
  Trash2,
  AlertCircle,
  CheckCircle2,
  UserCircle,
  ShieldCheck,
  HeartHandshake,
  Contact,
  Users,
  Sparkles,
} from "lucide-react"
import type { VictimWitnessCreateData } from "@/lib/api/victims"
import { addVictimWitness } from "@/lib/api/victims"
import { useRouter } from "next/navigation"

const initialSupportService = { type: "", provider: "", status: "" }

const initialFormData: VictimWitnessCreateData = {
  type: "victim",
  anonymous: false,
  demographics: {
    gender: "",
    age: 0,
    ethnicity: "",
    occupation: "",
  },
  contact_info: {
    email: "",
    phone: "",
    secure_messaging: "",
  },
  risk_assessment: {
    level: "low",
    threats: [],
    protection_needed: false,
  },
  support_services: [],
}

const genderOptions = ["Male", "Female"]
const supportServiceTypeOptions = [
  "Legal Aid",
  "Medical Assistance",
  "Psychological Support",
  "Shelter",
  "Financial Aid",
  "Translation Services",
  "Relocation Assistance",
  "Other",
]
const supportServiceStatusOptions = [
  "Requested",
  "Active",
  "Pending Assessment",
  "Ongoing",
  "Completed",
  "Referred",
  "Declined",
  "Closed",
]

export function AddVictimForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<VictimWitnessCreateData>(initialFormData)
  const [currentThreat, setCurrentThreat] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    const keys = name.split(".")
    setFormData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev))
      let currentLevel: any = newData
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          currentLevel[key] = type === "checkbox" ? checked : type === "number" ? Number.parseInt(value) || 0 : value
        } else {
          if (!currentLevel[key]) currentLevel[key] = {}
          currentLevel = currentLevel[key]
        }
      })
      return newData
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    const keys = name.split(".")
    setFormData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev))
      let currentLevel: any = newData
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          currentLevel[key] = value
        } else {
          if (!currentLevel[key]) currentLevel[key] = {}
          currentLevel = currentLevel[key]
        }
      })
      return newData
    })
  }

  const handleCheckboxChange = (name: string, checked: boolean | "indeterminate") => {
    if (typeof checked === "boolean") {
      const keys = name.split(".")
      setFormData((prev) => {
        const newData = JSON.parse(JSON.stringify(prev))
        let currentLevel: any = newData
        keys.forEach((key, index) => {
          if (index === keys.length - 1) {
            currentLevel[key] = checked
          } else {
            if (!currentLevel[key]) currentLevel[key] = {}
            currentLevel = currentLevel[key]
          }
        })
        return newData
      })
    }
  }

  const handleAddThreat = () => {
    if (currentThreat.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        risk_assessment: {
          ...prev.risk_assessment,
          threats: [...prev.risk_assessment.threats, currentThreat.trim()],
        },
      }))
      setCurrentThreat("")
    }
  }

  const handleRemoveThreat = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      risk_assessment: {
        ...prev.risk_assessment,
        threats: prev.risk_assessment.threats.filter((_, i) => i !== index),
      },
    }))
  }

  const handleSupportServiceChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newSupportServices = prev.support_services.map((service, i) =>
        i === index ? { ...service, [field]: value } : service,
      )
      return { ...prev, support_services: newSupportServices }
    })
  }

  const handleSupportServiceSelectChange = (index: number, field: "type" | "status", value: string) => {
    setFormData((prev) => {
      const newSupportServices = [...prev.support_services]
      newSupportServices[index] = { ...newSupportServices[index], [field]: value }
      return { ...prev, support_services: newSupportServices }
    })
  }

  const handleAddSupportService = () => {
    setFormData((prev) => ({
      ...prev,
      support_services: [...prev.support_services, { ...initialSupportService }],
    }))
  }

  const handleRemoveSupportService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      support_services: prev.support_services.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const payload = {
      ...formData,
      demographics: {
        ...formData.demographics,
        age: Number(formData.demographics.age) || 0,
      },
    }

    try {
      const response = await addVictimWitness(payload)
      setSuccess(`Victim/Witness (ID: ${response.vic_wit_id}) added successfully! Form will reset.`)
      setFormData(initialFormData)
      setCurrentThreat("")
      setTimeout(() => {
        router.refresh()
      }, 2500)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please check your input and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const SectionCard: React.FC<{
    title: string
    description: string
    icon: React.ElementType
    children: React.ReactNode
  }> = ({ title, description, icon: Icon, children }) => (
    <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out border-l-4 border-blue-500 dark:border-blue-400 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500 dark:bg-blue-400 rounded-full shadow-md">
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{title}</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6 bg-white dark:bg-slate-800/30">{children}</CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-3">
          <Sparkles className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto animate-pulse" />
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            Register Victim or Witness
          </h1>
          <p className="mt-3 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Your contribution is vital. Provide accurate information to help us ensure justice and support.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="shadow-lg border-l-4 border-red-600 dark:border-red-500">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="font-semibold">Operation Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert
            variant="default"
            className="bg-green-50 border-green-400 dark:bg-green-900/50 dark:border-green-600 shadow-lg border-l-4"
          >
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <AlertTitle className="font-semibold text-green-700 dark:text-green-300">Success!</AlertTitle>
            <AlertDescription className="text-green-600 dark:text-green-400">{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          <SectionCard
            title="Basic Information"
            description="Identify the individual and their reporting preference."
            icon={UserCircle}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Type
                </Label>
                <Select name="type" value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger
                    id="type"
                    className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="victim">Victim</SelectItem>
                    <SelectItem value="witness">Witness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-3 pt-6 md:pt-8">
                <Checkbox
                  id="anonymous"
                  checked={formData.anonymous}
                  onCheckedChange={(checked) => handleCheckboxChange("anonymous", checked)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-400"
                />
                <Label
                  htmlFor="anonymous"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Report Anonymously
                </Label>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Demographics" description="Personal details of the individual." icon={Users}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {[
                { id: "gender", label: "Gender", type: "select", options: genderOptions, placeholder: "Select gender" },
                { id: "age", label: "Age", type: "number", placeholder: "Enter age", required: true, min: "0" },
                { id: "ethnicity", label: "Ethnicity", placeholder: "e.g., Kurdish, Arab", required: true },
                { id: "occupation", label: "Occupation", placeholder: "e.g., Teacher, Journalist", required: true },
              ].map((item) => (
                <div key={item.id} className="space-y-2">
                  <Label
                    htmlFor={`demographics.${item.id}`}
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {item.label}
                  </Label>
                  {item.type === "select" ? (
                    <Select
                      name={`demographics.${item.id}`}
                      value={formData.demographics[item.id as keyof typeof formData.demographics] as string}
                      onValueChange={(value) => handleSelectChange(`demographics.${item.id}`, value)}
                    >
                      <SelectTrigger
                        id={`demographics.${item.id}`}
                        className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                      >
                        <SelectValue placeholder={item.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {item.options?.map((option) => (
                          <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, "-")}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={`demographics.${item.id}`}
                      name={`demographics.${item.id}`}
                      type={item.type || "text"}
                      value={
                        item.id === "age" && formData.demographics.age === 0 && !isLoading
                          ? ""
                          : (formData.demographics[item.id as keyof typeof formData.demographics] as string | number)
                      }
                      onChange={handleInputChange}
                      placeholder={item.placeholder}
                      min={item.min}
                      required={item.required}
                      className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  )}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Contact Information"
            description="How to reach the individual (if not anonymous)."
            icon={Contact}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact_info.email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </Label>
                <Input
                  id="contact_info.email"
                  name="contact_info.email"
                  type="email"
                  value={formData.contact_info.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                  className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_info.phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Phone
                </Label>
                <Input
                  id="contact_info.phone"
                  name="contact_info.phone"
                  value={formData.contact_info.phone}
                  onChange={handleInputChange}
                  placeholder="+1234567890"
                  className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="contact_info.secure_messaging"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Secure Messaging App/Handle
              </Label>
              <Input
                id="contact_info.secure_messaging"
                name="contact_info.secure_messaging"
                value={formData.contact_info.secure_messaging}
                onChange={handleInputChange}
                placeholder="e.g., Signal, Telegram @username"
                className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
              You can provide contact details even if reporting anonymously.
            </p>
          </SectionCard>

          <SectionCard
            title="Risk Assessment"
            description="Evaluate potential threats and safety needs."
            icon={ShieldCheck}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <Label
                  htmlFor="risk_assessment.level"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Risk Level
                </Label>
                <Select
                  name="risk_assessment.level"
                  value={formData.risk_assessment.level}
                  onValueChange={(value) =>
                    handleSelectChange("risk_assessment.level", value as "low" | "medium" | "high")
                  }
                >
                  <SelectTrigger
                    id="risk_assessment.level"
                    className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                  >
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-3 pt-6 md:pt-8">
                <Checkbox
                  id="risk_assessment.protection_needed"
                  checked={formData.risk_assessment.protection_needed}
                  onCheckedChange={(checked) => handleCheckboxChange("risk_assessment.protection_needed", checked)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-400"
                />
                <Label
                  htmlFor="risk_assessment.protection_needed"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Protection Needed
                </Label>
              </div>
            </div>
            <div className="space-y-3 pt-4">
              <Label htmlFor="currentThreat" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Threats Identified
              </Label>
              <div className="flex gap-3">
                <Input
                  id="currentThreat"
                  value={currentThreat}
                  onChange={(e) => setCurrentThreat(e.target.value)}
                  placeholder="e.g., Intimidation, Surveillance"
                  className="flex-grow bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <Button
                  type="button"
                  onClick={handleAddThreat}
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30"
                  size="icon"
                  aria-label="Add threat"
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
              {formData.risk_assessment.threats.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.risk_assessment.threats.map((threat, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm p-3 bg-slate-100 dark:bg-slate-700/60 rounded-lg shadow-sm"
                    >
                      <span className="text-slate-700 dark:text-slate-200">{threat}</span>
                      <Button
                        type="button"
                        onClick={() => handleRemoveThreat(index)}
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        aria-label={`Remove threat: ${threat}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard
            title="Support Services"
            description="Details of support provided or needed."
            icon={HeartHandshake}
          >
            <div className="flex justify-end mb-4">
              <Button
                type="button"
                onClick={handleAddSupportService}
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30"
                size="sm"
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Service
              </Button>
            </div>
            {formData.support_services.map((service, index) => (
              <div
                key={index}
                className="space-y-4 p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-700/40 shadow-md relative mb-4"
              >
                <Button
                  type="button"
                  onClick={() => handleRemoveSupportService(index)}
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400"
                  aria-label={`Remove service ${index + 1}`}
                >
                  <X className="h-5 w-5" />
                </Button>
                <p className="text-md font-semibold text-blue-600 dark:text-blue-400">Service #{index + 1}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      id: "type",
                      label: "Service Type",
                      options: supportServiceTypeOptions,
                      placeholder: "Select service type",
                    },
                    { id: "provider", label: "Provider", placeholder: "e.g., HRM Legal Team" },
                    {
                      id: "status",
                      label: "Status",
                      options: supportServiceStatusOptions,
                      placeholder: "Select status",
                    },
                  ].map((item) => (
                    <div key={item.id} className="space-y-1">
                      <Label
                        htmlFor={`support_services.${index}.${item.id}`}
                        className="text-xs font-medium text-slate-600 dark:text-slate-400"
                      >
                        {item.label}
                      </Label>
                      {item.options ? (
                        <Select
                          name={`support_services.${index}.${item.id}`}
                          value={service[item.id as keyof typeof service]}
                          onValueChange={(value) =>
                            handleSupportServiceSelectChange(index, item.id as "type" | "status", value)
                          }
                        >
                          <SelectTrigger
                            id={`support_services.${index}.${item.id}`}
                            className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                          >
                            <SelectValue placeholder={item.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {item.options.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={`support_services.${index}.${item.id}`}
                          name={`support_services.${index}.${item.id}`}
                          value={service[item.id as keyof typeof service]}
                          onChange={(e) => handleSupportServiceChange(index, item.id, e.target.value)}
                          placeholder={item.placeholder}
                          className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {formData.support_services.length === 0 && (
              <p className="text-sm text-center text-slate-500 dark:text-slate-400 py-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                No support services added yet. Click "Add Service" to include one.
              </p>
            )}
          </SectionCard>

          <CardFooter className="pt-10 pb-6 flex flex-col items-center space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full md:w-3/4 lg:w-1/2 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                "Register Victim/Witness"
              )}
            </Button>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              All information is encrypted and stored securely.
            </p>
          </CardFooter>
        </form>
      </div>
    </div>
  )
}
