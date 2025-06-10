"use client"

import type React from "react"
import { useState, useEffect } from "react" // Added useEffect
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface StatusUpdateModalProps {
  open: boolean
  onClose: () => void
  item: any // Should be Case or Report type
}

export function StatusUpdateModal({ open, onClose, item }: StatusUpdateModalProps) {
  const [newStatus, setNewStatus] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (item) {
      setNewStatus(item.status || "") // Initialize with current status if available
      setNotes("") // Reset notes when item changes
    }
  }, [item])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your submission logic here, e.g., API call
    console.log("Status updated:", { itemId: item.id, newStatus, notes })
    onClose() // Close modal after submission
  }

  if (!item) return null

  // Determine if it's a case or report to provide relevant status options
  // This is a simplified check; you might have a 'type' field on the item or pass it as a prop
  const isCase = item.priority !== undefined && item.assignedLawyer !== undefined // Heuristic
  const itemType = isCase ? "case" : "report"

  const getStatusOptions = () => {
    if (itemType === "case") {
      return [
        { value: "Open", label: "Open" },
        { value: "In Progress", label: "In Progress" },
        { value: "Pending Review", label: "Pending Review" },
        { value: "Resolved", label: "Resolved" },
        { value: "Closed", label: "Closed" },
      ]
    } else {
      // Assuming Report status types
      return [
        { value: "Pending Review", label: "Pending Review" },
        { value: "Under Investigation", label: "Under Investigation" },
        { value: "Action Taken", label: "Action Taken" },
        { value: "Closed", label: "Closed" },
      ]
    }
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

            <div className="space-y-2">
              <Label htmlFor="notes">Update Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this status update..."
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update Status</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
