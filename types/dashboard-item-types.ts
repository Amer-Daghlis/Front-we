export interface Victim {
  vic_wit_id: string
  name: string
  age?: number
  gender?: string
  location: string
  status: string
  caseIds?: string[]
  avatarUrl: string
}


export type CaseStatus = "under_investigation" | "resolved" | "closed" | "pending"
export type CasePriority = "high" | "medium" | "low"

export interface CaseLocation {
  country: string
  region: string
  coordinates: {
    type: "Point"
    coordinates: [number, number]
  }
}

export interface Perpetrator {
  name: string
  type: "individual" | "organization"
}

export interface Case {
  _id: string
  case_id: string
  title: string
  description: string
  violation_types: string[]
  status: CaseStatus
  priority: CasePriority
  location: CaseLocation
  date_occurred: string
  date_reported: string
  victims: string[]
  perpetrators: Perpetrator[]
  evidence: string[]
  created_by: string
  candidate_lawyers?: string[] | null
  created_at: string
  updated_at: string
}

export interface CaseDetail extends Case {
  evidenceFiles: { name: string; url: string; type: string }[]
  timeline: { date: string; event: string }[]
  notes: string
}

export interface Report {
  id: string
  title: string
  description: string
  dateReported: string
  status: "Pending Review" | "Under Investigation" | "Action Taken" | "Closed"
  priority: "High" | "Medium" | "Low"
  location: string
  reporterId: string
  isAnonymous: boolean
  evidenceCount: number
  lastUpdated: string
}
