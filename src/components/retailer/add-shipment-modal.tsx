"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface AddShipmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddShipmentModal({ open, onOpenChange }: AddShipmentModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    carrier: "",
    cost: "",
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form
    if (!formData.origin || !formData.destination || !formData.carrier || !formData.cost) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      })
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Shipment Created",
        description: "New shipment has been successfully added to the system.",
      })

      // Reset form and close modal
      setFormData({
        origin: "",
        destination: "",
        carrier: "",
        cost: "",
      })
      onOpenChange(false)
    }, 1500)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Shipment</DialogTitle>
          <DialogDescription>
            Create a new shipment entry. Fill in all the required information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="origin">Origin *</Label>
              <Input
                id="origin"
                placeholder="e.g., New York, NY"
                value={formData.origin}
                onChange={(e) => updateFormData("origin", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="destination">Destination *</Label>
              <Input
                id="destination"
                placeholder="e.g., Boston, MA"
                value={formData.destination}
                onChange={(e) => updateFormData("destination", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="carrier">Carrier *</Label>
              <Select value={formData.carrier} onValueChange={(value) => updateFormData("carrier", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a carrier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fedex">FedEx</SelectItem>
                  <SelectItem value="ups">UPS</SelectItem>
                  <SelectItem value="dhl">DHL</SelectItem>
                  <SelectItem value="usps">USPS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cost">Cost ($) *</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.cost}
                onChange={(e) => updateFormData("cost", e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Shipment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
