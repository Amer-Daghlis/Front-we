"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { updateCaseStatus } from "@/lib/api/cases"

interface StatusUpdateModalProps {
  open: boolean
  onClose: () => void
  item: any
}

export function StatusUpdateModal({ open, onClose, item }: StatusUpdateModalProps) {
  const [newStatus, setNewStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (item) {
      setNewStatus(item.status || "")
    }
  }, [item])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      console.log("Submitting update for case ID:", item.id) // Debugging the ID
      await updateCaseStatus(item.id, newStatus)
      onClose()
    } catch (err) {
      if (err && typeof err === "object" && "message" in err) {
        setError((err as { message: string }).message || "Error updating status")
      } else {
        setError("Error updating status")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!item) return null

  const isCase = item.priority !== undefined && item.assignedLawyer !== undefined
  const itemType = isCase ? "case" : "report"

const getStatusOptions = () => {
  return [
    { value: "under_investigation", label: "Under Investigation" },
    { value: "escalated", label: "Escalated" },
    { value: "closed", label: "Closed" },
  ]
}

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Update Status for {itemType === "case" ? "Case" : "Report"} #{item.id}
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-medium text-gray-900">{item.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">Current Status: {item.status}</Badge>
              {item.priority && <Badge variant="outline">Priority: {item.priority}</Badge>}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newStatus">New Status *</Label>
              <Select value={newStatus} onValueChange={setNewStatus} required>
                <SelectTrigger id="newStatus">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  {getStatusOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Status"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
