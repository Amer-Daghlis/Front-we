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


export type CaseStatus = "Open" | "In Progress" | "Pending Review" | "Resolved" | "Closed"
export type CasePriority = "High" | "Medium" | "Low"

export interface Case {
  id: string
  title: string
  description: string
  dateReported: string // ISO string format for dates
  status: CaseStatus
  priority: CasePriority
  location: string
  assignedLawyer?: string
  organizationId?: string
  evidenceCount: number
  victimCount: number
  victims?: Victim[] // Uses the canonical Victim type above
  lastUpdated: string
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
