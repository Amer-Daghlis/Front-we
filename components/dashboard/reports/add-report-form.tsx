"use client"

import type React from "react"
import { useState, type ChangeEvent, type FormEvent, useRef, useCallback, memo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { type IncidentReportCreateData, addIncidentReport } from "@/lib/api/reports"
import {
  AlertCircle,
  CheckCircle2,
  FileTextIcon,
  Trash2,
  UploadCloud,
  X,
  User,
  MapPin,
  FileArchive,
  ListChecks,
  CalendarDays,
  ShieldAlert,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react"

// --- Type Definitions ---
type ReporterInfo = IncidentReportCreateData["contact_info"] & {
  reporter_type: IncidentReportCreateData["reporter_type"]
  anonymous: IncidentReportCreateData["anonymous"]
}
type IncidentDetails = IncidentReportCreateData["incident_details"]

// --- Initial State ---
const initialFormData: IncidentReportCreateData = {
  reporter_type: "victim",
  anonymous: false,
  contact_info: { email: "", phone: "", preferred_contact: "email" },
  incident_details: {
    date: new Date().toISOString(),
    location: { country: "", city: "", coordinates: { type: "Point", coordinates: [0, 0] } },
    description: "",
    violation_types: [],
  },
  status: "new",
  assigned_to: null,
}

const violationTypeOptions = [
  "arbitrary_detention",
  "torture",
  "enforced_disappearance",
  "extrajudicial_killing",
  "sexual_violence",
  "restrictions_on_freedom_of_expression",
  "restrictions_on_freedom_of_assembly",
  "discrimination",
  "hate_speech",
  "unlawful_surveillance",
  "forced_displacement",
  "denial_of_fair_trial",
  "collective_punishment",
  "attacks_on_civilians",
  "child_soldiers",
  "other",
]

// --- Memoized Child Components for Performance and to Prevent Scroll Jumps ---

const SectionCard: React.FC<{
  title: string
  description: string
  icon: React.ElementType
  children: React.ReactNode
}> = ({ title, description, icon: Icon, children }) => (
  <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out border-l-4 border-teal-500 dark:border-teal-400 overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-teal-500 dark:bg-teal-400 rounded-full shadow-md">
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

const ReporterInfoSection = memo(
  ({ data, onChange }: { data: ReporterInfo; onChange: (field: keyof ReporterInfo, value: any) => void }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      onChange(name as keyof ReporterInfo, value);
    };

    const handleSelectChange = (name: keyof ReporterInfo, value: string) => {
      onChange(name, value);
    };

    return (
      <SectionCard
        title="Reporter Information"
        description="Details about the person submitting the report."
        icon={User}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <Label htmlFor="reporter_type" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Reporter Type
            </Label>
            <Select
              name="reporter_type"
              value={data.reporter_type}
              onValueChange={(value) => handleSelectChange("reporter_type", value)}
            >
              <SelectTrigger id="reporter_type" className="w-full input-field-style">
                <SelectValue placeholder="Select reporter type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="victim">Victim</SelectItem>
                <SelectItem value="witness">Witness</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-3 pt-6 md:pt-8">
            <Checkbox
              id="anonymous"
              name="anonymous"
              checked={data.anonymous}
              onCheckedChange={(checked) => onChange("anonymous", Boolean(checked))}
              className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-slate-400"
            />
            <Label
              htmlFor="anonymous"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              Report Anonymously
            </Label>
          </div>
        </div>
        <fieldset className="space-y-6 border-t border-slate-200 dark:border-slate-700 pt-6 mt-6">
          <legend className="text-lg font-semibold text-slate-700 dark:text-slate-200 px-1 mb-3">
            Contact Details (Confidential)
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 input-group">
              <Label
                htmlFor="email"
                className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <Mail className="w-4 h-4 mr-2 opacity-70" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleInputChange}
                required
                className="w-full input-field-style"
              />
            </div>
            <div className="space-y-2 input-group">
              <Label
                htmlFor="phone"
                className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <Phone className="w-4 h-4 mr-2 opacity-70" />
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={data.phone}
                onChange={handleInputChange}
                required
                className="w-full input-field-style"
              />
            </div>
          </div>
          <div className="space-y-2 input-group">
            <Label
              htmlFor="preferred_contact"
              className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              <MessageSquare className="w-4 h-4 mr-2 opacity-70" />
              Preferred Contact Method
            </Label>
            <Select
              name="preferred_contact"
              value={data.preferred_contact}
              onValueChange={(value) => handleSelectChange("preferred_contact", value)}
            >
              <SelectTrigger id="preferred_contact" className="w-full input-field-style">
                <SelectValue placeholder="Select preferred contact" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </fieldset>
      </SectionCard>
    );
  }
);
ReporterInfoSection.displayName = "ReporterInfoSection"

const IncidentDetailsSection = memo(
  ({ data, onChange }: { data: IncidentDetails; onChange: (newData: IncidentDetails) => void }) => {
    const handleNestedChange = (path: string, value: any) => {
      const keys = path.split(".");
      onChange(keys.reduceRight((acc, key, index) => ({ [key]: acc }), value) as IncidentDetails);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      const keys = name.split(".");
      const newData = JSON.parse(JSON.stringify(data));
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = type === "number" ? Number.parseFloat(value) || 0 : value;
      onChange(newData);
    };

    const handleDateChange = (date: Date | undefined) => {
      if (date) onChange({ ...data, date: date.toISOString() });
    };

    const handleViolationTypeChange = (violation: string, checked: boolean) => {
      const currentTypes = data.violation_types;
      const newTypes = checked ? [...currentTypes, violation] : currentTypes.filter((v) => v !== violation);
      onChange({ ...data, violation_types: newTypes });
    };

    return (
      <SectionCard title="Incident Details" description="Specifics about the event being reported." icon={FileTextIcon}>
        <div className="space-y-2 input-group">
          <Label htmlFor="date" className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
            <CalendarDays className="w-5 h-5 mr-2 opacity-70" />
            Date of Incident
          </Label>
          <DatePicker date={new Date(data.date)} setDate={handleDateChange} />
        </div>
        <fieldset className="space-y-6 border-t border-slate-200 dark:border-slate-700 pt-6 mt-6">
          <legend className="text-lg font-semibold text-slate-700 dark:text-slate-200 px-1 mb-3 flex items-center">
            <MapPin className="w-6 h-6 mr-2 opacity-80" />
            Location
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 input-group">
              <Label htmlFor="location.country" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Country
              </Label>
              <Input
                id="location.country"
                name="location.country"
                value={data.location.country}
                onChange={handleInputChange}
                required
                className="w-full input-field-style"
              />
            </div>
            <div className="space-y-2 input-group">
              <Label htmlFor="location.city" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                City
              </Label>
              <Input
                id="location.city"
                name="location.city"
                value={data.location.city}
                onChange={handleInputChange}
                required
                className="w-full input-field-style"
              />
            </div>
          </div>
        </fieldset>
        <div className="space-y-2 pt-4 input-group">
          <Label htmlFor="description" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Description of Incident
          </Label>
          <Textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleInputChange}
            rows={6}
            required
            placeholder="Provide a detailed account of what happened..."
            className="w-full input-field-style min-h-[120px]"
          />
        </div>
        <div className="space-y-3 pt-4">
          <Label className="flex items-center text-lg font-semibold text-slate-700 dark:text-slate-200">
            <ListChecks className="w-6 h-6 mr-2 opacity-80" />
            Types of Violation
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-1">(Select all that apply)</span>
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-700/30 shadow-sm">
            {violationTypeOptions.map((type) => (
              <div key={type} className="flex items-center space-x-2.5 group">
                <Checkbox
                  id={`violation-${type}`}
                  checked={data.violation_types.includes(type)}
                  onCheckedChange={(checked) => handleViolationTypeChange(type, Boolean(checked))}
                  className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-slate-400 group-hover:border-teal-500 transition-colors"
                />
                <Label
                  htmlFor={`violation-${type}`}
                  className="font-normal text-sm text-slate-700 dark:text-slate-300 cursor-pointer group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
                >
                  {type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    );
  }
);
IncidentDetailsSection.displayName = "IncidentDetailsSection"

// --- Main Form Component ---
export function AddReportForm() {
  const [formData, setFormData] = useState<IncidentReportCreateData>(initialFormData)
  const [filesToUpload, setFilesToUpload] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleReporterInfoChange = useCallback((field: keyof ReporterInfo, value: any) => {
    setFormData((prev) => {
      if (field === "email" || field === "phone" || field === "preferred_contact") {
        return { ...prev, contact_info: { ...prev.contact_info, [field]: value } }
      }
      return { ...prev, [field]: value }
    })
  }, [])

  const handleIncidentDetailsChange = useCallback((newData: Partial<IncidentDetails>) => {
    setFormData((prev) => ({ ...prev, incident_details: { ...prev.incident_details, ...newData } }))
  }, [])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFilesToUpload(Array.from(e.target.files))
  }

  const removeFile = (fileName: string) => {
    setFilesToUpload((prevFiles) => prevFiles.filter((file) => file.name !== fileName))
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await addIncidentReport(formData, filesToUpload)
      setSuccess("Incident report submitted successfully! The form will now reset.")
      setFormData(initialFormData)
      setFilesToUpload([])
      if (fileInputRef.current) fileInputRef.current.value = ""
      setTimeout(() => router.refresh(), 2500)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-3">
          <ShieldAlert className="h-12 w-12 text-teal-500 dark:text-teal-400 mx-auto animate-bounce" />
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            Submit New Incident Report
          </h1>
          <p className="mt-3 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Your voice matters. Document human rights violations with detailed and accurate information.
          </p>
        </div>
        {error && (
          <Alert variant="destructive" className="shadow-lg border-l-4 border-red-600 dark:border-red-500">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="font-semibold">Submission Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert
            variant="default"
            className="bg-green-50 border-green-400 dark:bg-green-900/50 dark:border-green-600 shadow-lg border-l-4"
          >
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <AlertTitle className="font-semibold text-green-700 dark:text-green-300">Report Submitted!</AlertTitle>
            <AlertDescription className="text-green-600 dark:text-green-400">{success}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-12">
          <ReporterInfoSection
            data={{ ...formData.contact_info, reporter_type: formData.reporter_type, anonymous: formData.anonymous }}
            onChange={handleReporterInfoChange}
          />
          <IncidentDetailsSection data={formData.incident_details} onChange={handleIncidentDetailsChange} />
          <SectionCard
            title="Evidence Upload"
            description="Upload relevant files (images, documents, videos, etc.)."
            icon={FileArchive}
          >
            <div>
              <Label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full min-h-[180px] p-6 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-700/40 hover:border-teal-500 dark:hover:border-teal-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-all duration-300 ease-in-out group"
              >
                <UploadCloud className="w-14 h-14 text-slate-400 dark:text-slate-500 mb-4 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors" />
                <span className="text-xl font-semibold text-slate-600 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  Click to upload or drag & drop
                </span>
                <span className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  (Max. 10MB per file, multiple files allowed)
                </span>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  accept="image/*,application/pdf,.doc,.docx,.txt,.mp4,.mov,.avi"
                />
              </Label>
            </div>
            {filesToUpload.length > 0 && (
              <div className="mt-6 space-y-4 p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-700/30 shadow-md">
                <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                  Selected Files ({filesToUpload.length}):
                </h4>
                <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {filesToUpload.map((file, index) => (
                    <li
                      key={index}
                      className="text-sm flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-600/60 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <FileTextIcon className="w-5 h-5 text-teal-500 dark:text-teal-400 flex-shrink-0" />
                        <span className="truncate text-slate-700 dark:text-slate-200" title={file.name}>
                          {file.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
                          ({(file.size / 1024).toFixed(2)} KB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(file.name)}
                        aria-label={`Remove ${file.name}`}
                        className="text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 h-7 w-7"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilesToUpload([])
                    if (fileInputRef.current) fileInputRef.current.value = ""
                  }}
                  className="mt-4 text-red-600 border-red-500 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/30"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Clear All Files
                </Button>
              </div>
            )}
          </SectionCard>
          <CardFooter className="pt-10 pb-6 flex flex-col items-center space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full md:w-3/4 lg:w-1/2 text-lg font-semibold bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 dark:from-teal-400 dark:to-cyan-500 dark:hover:from-teal-500 dark:hover:to-cyan-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 py-3"
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
                  Submitting Report...
                </div>
              ) : (
                "Submit Incident Report"
              )}
            </Button>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your report is confidential and will be handled with care.
            </p>
          </CardFooter>
        </form>
      </div>
      <style jsx global>{`
        .input-group:focus-within label {
          @apply text-teal-600 dark:text-teal-400;
        }
        .input-field-style {
          @apply bg-white dark:bg-slate-700/80 border-slate-300 dark:border-slate-600 hover:border-teal-500 dark:hover:border-teal-400 focus:ring-2 focus:ring-teal-500/50 dark:focus:ring-teal-400/50 focus:border-teal-500 dark:focus:border-teal-400 transition-all duration-150 ease-in-out;
        }
      `}</style>
    </div>
  )
}
