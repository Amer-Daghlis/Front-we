"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Upload } from "lucide-react"

interface AddCaseModalProps {
  open: boolean
  onClose: () => void
}

export function AddCaseModal({ open, onClose }: AddCaseModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    priority: "",
    violationType: "",
    victimCount: "",
    evidence: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Case submitted:", formData)
    onClose()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, evidence: e.target.files[0] })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Add New Case
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Case Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter case title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Country"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="violationType">Violation Type</Label>
              <Select
                value={formData.violationType}
                onValueChange={(value) => setFormData({ ...formData, violationType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discrimination">Discrimination</SelectItem>
                  <SelectItem value="police-brutality">Police Brutality</SelectItem>
                  <SelectItem value="freedom-speech">Freedom of Speech</SelectItem>
                  <SelectItem value="workplace">Workplace Violation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="victimCount">Number of Victims</Label>
              <Input
                id="victimCount"
                type="number"
                value={formData.victimCount}
                onChange={(e) => setFormData({ ...formData, victimCount: e.target.value })}
                placeholder="0"
                min="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Case Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide detailed description of the case..."
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="evidence">Evidence Files</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="evidence" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">Upload evidence files</span>
                  <span className="mt-1 block text-sm text-gray-500">PDF, DOC, images up to 10MB</span>
                </label>
                <input
                  id="evidence"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>
              {formData.evidence && <p className="mt-2 text-sm text-green-600">Selected: {formData.evidence.name}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit Case</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
