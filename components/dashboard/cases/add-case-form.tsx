"use client";

import type React from "react";
import { useState, type ChangeEvent, type FormEvent, useRef, useCallback, memo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { type CaseCreateData, createCase } from "@/lib/api/cases";
import { getAllVictims } from "@/lib/api/victims";
import { getLawyers } from "@/lib/api/lawyers";
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
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Combobox } from "@headlessui/react";

const initialFormData: CaseCreateData = {
  title: "",
  description: "",
  violation_types: [],
  status: "",
  priority: "",
  location: {
    country: "",
    region: "",
    coordinates: {
      type: "Point",
      coordinates: [34.4667, 31.5000],
    },
  },
  date_occurred: "",
  date_reported: "",
  victims: [],
  perpetrators: [],
  candidate_lawyers: [],
  evidenceFiles: [],
};

const violationTypeOptions = [
  "pollution",
  "illegal_dumping",
  "deforestation",
  "wildlife_trafficking",
  "other",
];

const SectionCard: React.FC<{
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
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
);

const CaseDetailsSection = memo(
  ({ data, onChange }: { data: CaseCreateData; onChange: (field: keyof CaseCreateData, value: any) => void }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      onChange(name as keyof CaseCreateData, value);
    };    const handleViolationTypeChange = (violation: string, checked: boolean) => {
      const newTypes = checked
        ? [...data.violation_types, violation]
        : data.violation_types.filter((v: string) => v !== violation);
      onChange("violation_types", newTypes);
    };

    const handleLocationChange = (field: "country" | "region", value: string) => {
      onChange("location", { ...data.location, [field]: value });
    };    const handleDateChange = (field: "date_occurred" | "date_reported", value: string) => {
      onChange(field, value);
    };

    return (
      <SectionCard
        title="Case Details"
        description="Provide detailed information about the case."
        icon={FileTextIcon}
      >
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={data.title}
            onChange={handleInputChange}
            required
            placeholder="Enter case title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleInputChange}
            required
            placeholder="Provide a detailed description of the case"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="violation_types">Violation Types</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {violationTypeOptions.map((type) => (              <div key={type} className="flex items-center space-x-2.5">
                <Checkbox
                  id={`violation-${type}`}
                  checked={data.violation_types.includes(type)}
                  onCheckedChange={(checked) => handleViolationTypeChange(type, checked as boolean)}
                />
                <Label htmlFor={`violation-${type}`}>{type}</Label>
              </div>            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Case Status</Label>
          <Select
            value={data.status}
            onValueChange={(value) => onChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select case status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under_investigation">Under Investigation</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <fieldset className="space-y-6 border-t border-slate-200 dark:border-slate-700 pt-6 mt-6">
          <legend className="text-lg font-semibold text-slate-700 dark:text-slate-200 px-1 mb-3 flex items-center">
            <MapPin className="w-6 h-6 mr-2 opacity-80" />
            Location
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">            <div className="space-y-2">
              <Label htmlFor="location.country">Country</Label>
              <Input
                id="location.country"
                name="country"
                value={data.location.country}
                onChange={(e) => handleLocationChange("country", e.target.value)}
                required
                placeholder="Enter country"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location.region">Region</Label>
              <Input
                id="location.region"
                name="region"
                value={data.location.region}
                onChange={(e) => handleLocationChange("region", e.target.value)}
                required
                placeholder="Enter region"
              />
            </div>
          </div>
        </fieldset>        <div className="space-y-2">
          <Label htmlFor="date_occurred">Date Occurred</Label>
          <DatePicker
            date={data.date_occurred ? new Date(data.date_occurred) : undefined}
            setDate={(date: Date | undefined) => handleDateChange("date_occurred", date ? date.toISOString() : "")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date_reported">Date Reported</Label>
          <DatePicker
            date={data.date_reported ? new Date(data.date_reported) : undefined}
            setDate={(date: Date | undefined) => handleDateChange("date_reported", date ? date.toISOString() : "")}
          />
        </div>
      </SectionCard>
    );
  }
);
CaseDetailsSection.displayName = "CaseDetailsSection";

const EvidenceUploadSection = memo(
  ({ files, onFileChange, onRemoveFile }: { files: File[]; onFileChange: (files: File[]) => void; onRemoveFile: (fileName: string) => void }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) onFileChange(Array.from(e.target.files));
    };

    const removeFile = (fileName: string) => {
      onRemoveFile(fileName);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
      <SectionCard
        title="Evidence Upload"
        description="Upload evidence files related to the case."
        icon={FileArchive}
      >
        <div className="space-y-2">
          <Label htmlFor="evidence">Upload Evidence</Label>
          <input
            id="evidence"
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            <UploadCloud className="mr-2" /> Select Files
          </Button>
        </div>
        {files.length > 0 && (
          <div className="space-y-2">
            <Label>Selected Files</Label>
            <ul className="list-disc pl-5">
              {files.map((file) => (
                <li key={file.name} className="flex items-center space-x-2">
                  <span>{file.name}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFile(file.name)}
                  >
                    <Trash2 className="mr-1" /> Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </SectionCard>
    );
  }
);
EvidenceUploadSection.displayName = "EvidenceUploadSection";

const VictimSelectionSection = memo(
  ({ selectedVictims, onSelectVictims }: { selectedVictims: string[]; onSelectVictims: (victimIds: string[]) => void }) => {
    const [victims, setVictims] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
      const fetchVictims = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getAllVictims();
          console.log("Victims Response:", data);
          setVictims(data);
        } catch (err: any) {
          setError(err.message || "Failed to fetch victims.");
        } finally {
          setLoading(false);
        }
      };

      fetchVictims();
    }, []);

    const filteredVictims = query
      ? victims.filter((victim) =>
          victim.vic_wit_id.toLowerCase().includes(query.toLowerCase())
        )
      : victims;    const handleVictimSelection = (victimId: string) => {
      if (selectedVictims.includes(victimId)) {
        onSelectVictims(selectedVictims.filter(id => id !== victimId));
      } else {
        onSelectVictims([...selectedVictims, victimId]);
      }
    };

    return (
      <SectionCard
        title="Victim Selection"
        description="Select victims associated with this case."
        icon={User}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="victims">Search and Select Victims</Label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search victims by ID"
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
            />
            <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md">
              {filteredVictims.map((victim) => (
                <div
                  key={victim.vic_wit_id}
                  onClick={() => handleVictimSelection(victim.vic_wit_id)}
                  className={`cursor-pointer select-none p-2 hover:bg-teal-100 ${
                    selectedVictims.includes(victim.vic_wit_id) ? "bg-teal-500 text-white" : "bg-white text-black"
                  }`}
                >
                  {victim.vic_wit_id} - {victim.full_name || 'Unknown'}
                </div>
              ))}
            </div>
            {selectedVictims.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Selected victims: {selectedVictims.length}</p>
              </div>
            )}
          </div>
        )}
      </SectionCard>
    );
  }
);
VictimSelectionSection.displayName = "VictimSelectionSection";

const PerpetratorsSection = memo(
  ({ perpetrators, onChange }: { perpetrators: Array<{ name: string; type: string }>; onChange: (updatedPerpetrators: Array<{ name: string; type: string }>) => void }) => {
    const handlePerpetratorChange = (index: number, field: "name" | "type", value: string) => {
      const updatedPerpetrators = [...perpetrators];
      updatedPerpetrators[index][field] = value;
      onChange(updatedPerpetrators);
    };

    const addPerpetrator = () => {
      onChange([...perpetrators, { name: "", type: "individual" }]);
    };

    const removePerpetrator = (index: number) => {
      const updatedPerpetrators = perpetrators.filter((_, i) => i !== index);
      onChange(updatedPerpetrators);
    };

    return (
      <SectionCard
        title="Perpetrators"
        description="Add details about the perpetrators involved in the case."
        icon={ListChecks}
      >
        <div className="space-y-4">
          {perpetrators.map((perpetrator, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <Input
                value={perpetrator.name}
                onChange={(e) => handlePerpetratorChange(index, "name", e.target.value)}
                placeholder="Enter perpetrator name"
              />
              <Select
                value={perpetrator.type}
                onValueChange={(value) => handlePerpetratorChange(index, "type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="destructive" onClick={() => removePerpetrator(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={addPerpetrator} className="mt-4">
            Add Perpetrator
          </Button>
        </div>
      </SectionCard>
    );
  }
);
PerpetratorsSection.displayName = "PerpetratorsSection";

const PrioritySection = memo(
  ({ priority, onChange }: { priority: string; onChange: (value: string) => void }) => {
    return (
      <SectionCard
        title="Priority"
        description="Set the priority level for this case."
        icon={ShieldAlert}
      >
        <div className="space-y-2">
          <Label htmlFor="priority">Select Priority</Label>
          <Select
            value={priority}
            onValueChange={(value) => onChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SectionCard>
    );
  }
);
PrioritySection.displayName = "PrioritySection";

const LawyerSelectionSection = memo(
  ({ selectedLawyers, onSelectLawyers }: { selectedLawyers: string[]; onSelectLawyers: (lawyerIds: string[]) => void }) => {
    const [lawyers, setLawyers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchLawyers = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getLawyers();
          setLawyers(data);
        } catch (err: any) {
          setError(err.message || "Failed to fetch lawyers.");
        } finally {
          setLoading(false);
        }
      };
      fetchLawyers();
    }, []);    const handleLawyerSelection = (lawyerId: string) => {
      if (selectedLawyers.includes(lawyerId)) {
        onSelectLawyers(selectedLawyers.filter(id => id !== lawyerId));
      } else {
        onSelectLawyers([...selectedLawyers, lawyerId]);
      }
    };

    return (
      <SectionCard
        title="Lawyer Selection"
        description="Select lawyers associated with this case."
        icon={User}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="lawyers">Select Lawyers</Label>
            <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md">
              {lawyers.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No lawyers available</div>
              ) : (
                lawyers.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    onClick={() => handleLawyerSelection(lawyer.id)}
                    className={`cursor-pointer select-none p-2 hover:bg-blue-100 ${
                      selectedLawyers.includes(lawyer.id) ? "bg-blue-500 text-white" : "bg-white text-black"
                    }`}
                  >
                    {lawyer.full_name || lawyer.username || `Lawyer ${lawyer.id}`}
                  </div>
                ))
              )}
            </div>
            {selectedLawyers.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Selected lawyers: {selectedLawyers.length}</p>
              </div>
            )}
          </div>
        )}
      </SectionCard>
    );
  }
);
LawyerSelectionSection.displayName = "LawyerSelectionSection";

export function AddCaseForm() {
  const [formData, setFormData] = useState<CaseCreateData>(initialFormData);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [selectedVictims, setSelectedVictims] = useState<string[]>([]);
  const [perpetrators, setPerpetrators] = useState<Array<{ name: string; type: string }>>([]);
  const [candidateLawyers, setCandidateLawyers] = useState<string[]>([]);
  const [priority, setPriority] = useState<string>("medium");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleCaseDetailsChange = useCallback((field: keyof CaseCreateData, value: any) => {
    setFormData((prev) => {
      if (field === "location") {
        return {
          ...prev,
          location: {
            ...prev.location,
            ...value,
          },
        };
      }
      return { ...prev, [field]: value };
    });
  }, []);

  const handleFileChange = (files: File[]) => {
    setFilesToUpload(files);
  };

  const removeFile = (fileName: string) => {
    setFilesToUpload((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);    try {      const caseData: CaseCreateData = {
        ...formData,
        victims: selectedVictims,
        perpetrators,
        candidate_lawyers: candidateLawyers,
        priority,
        location: {
          country: formData.location?.country || "",
          region: formData.location?.region || "",
          coordinates: {
            type: "Point",
            coordinates: [34.4667, 31.5000],
          },
        },
        status: formData.status || "under_investigation",
        date_occurred: formData.date_occurred || new Date().toISOString(),
        date_reported: formData.date_reported || new Date().toISOString(),
      };

      console.log("Submitting case data:", caseData);
      console.log("Files to upload:", filesToUpload);

      await createCase(caseData, filesToUpload);

      setSuccess("Case submitted successfully! The form will now reset.");
      setFormData(initialFormData);
      setFilesToUpload([]);
      setSelectedVictims([]);
      setPerpetrators([]);
      setCandidateLawyers([]);
      setPriority("medium");

      setTimeout(() => router.refresh(), 2500);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-gray-900 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-3">
          <ShieldAlert className="h-12 w-12 text-teal-500 dark:text-teal-400 mx-auto animate-bounce" />
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            Submit New Case
          </h1>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Submission Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert variant="default">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle>Case Submitted!</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-12">
          <CaseDetailsSection data={formData} onChange={handleCaseDetailsChange} />
          <VictimSelectionSection
            selectedVictims={selectedVictims}
            onSelectVictims={setSelectedVictims}
          />
          <EvidenceUploadSection
            files={filesToUpload}
            onFileChange={handleFileChange}
            onRemoveFile={removeFile}
          />
          <PerpetratorsSection
            perpetrators={perpetrators}
            onChange={setPerpetrators}
          />
          <PrioritySection priority={priority} onChange={setPriority} />
          <LawyerSelectionSection
            selectedLawyers={candidateLawyers}
            onSelectLawyers={setCandidateLawyers}
          />
          <CardFooter className="pt-10 pb-6 flex flex-col items-center space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full md:w-3/4 lg:w-1/2 text-lg font-semibold bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 py-3"
            >
              {isLoading ? "Submitting Case..." : "Submit Case"}
            </Button>
          </CardFooter>
        </form>
      </div>
    </div>
  );
}