"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, DollarSign, Search, Filter, Navigation, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock available jobs data
const mockJobs = [
  {
    id: "JOB-001",
    type: "delivery",
    priority: "high",
    pickup: {
      address: "123 Warehouse St, Industrial District",
      time: "2024-01-15T14:00:00Z",
    },
    dropoff: {
      address: "456 Oak Ave, Downtown",
      time: "2024-01-15T15:30:00Z",
    },
    distance: 3.2,
    estimatedDuration: 45,
    payment: 28.5,
    items: 3,
    weight: "15 lbs",
    specialInstructions: "Fragile items - handle with care",
    customerRating: 4.8,
  },
  {
    id: "JOB-002",
    type: "delivery",
    priority: "medium",
    pickup: {
      address: "789 Supply Center, North Side",
      time: "2024-01-15T16:00:00Z",
    },
    dropoff: {
      address: "321 Pine St, Residential Area",
      time: "2024-01-15T17:15:00Z",
    },
    distance: 5.8,
    estimatedDuration: 65,
    payment: 35.75,
    items: 1,
    weight: "8 lbs",
    specialInstructions: "Leave at door if no answer",
    customerRating: 4.5,
  },
  {
    id: "JOB-003",
    type: "express",
    priority: "urgent",
    pickup: {
      address: "555 Express Hub, City Center",
      time: "2024-01-15T13:30:00Z",
    },
    dropoff: {
      address: "777 Business Plaza, Financial District",
      time: "2024-01-15T14:15:00Z",
    },
    distance: 2.1,
    estimatedDuration: 30,
    payment: 42.0,
    items: 1,
    weight: "2 lbs",
    specialInstructions: "Urgent document delivery - signature required",
    customerRating: 5.0,
  },
  {
    id: "JOB-004",
    type: "delivery",
    priority: "low",
    pickup: {
      address: "999 Storage Facility, South End",
      time: "2024-01-15T18:00:00Z",
    },
    dropoff: {
      address: "111 Elm Street, Suburbs",
      time: "2024-01-15T19:30:00Z",
    },
    distance: 7.5,
    estimatedDuration: 85,
    payment: 31.25,
    items: 5,
    weight: "25 lbs",
    specialInstructions: "Multiple packages - check inventory list",
    customerRating: 4.2,
  },
]

const priorityColors = {
  urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
}

const typeColors = {
  express: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  delivery: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
}

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("payment")
  const { toast } = useToast()

  const filteredJobs = mockJobs
    .filter((job) => {
      const matchesSearch =
        job.pickup.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.dropoff.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesPriority = priorityFilter === "all" || job.priority === priorityFilter
      const matchesType = typeFilter === "all" || job.type === typeFilter

      return matchesSearch && matchesPriority && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "payment":
          return b.payment - a.payment
        case "distance":
          return a.distance - b.distance
        case "time":
          return a.estimatedDuration - b.estimatedDuration
        default:
          return 0
      }
    })

  const handleAcceptJob = (jobId: string) => {
    toast({
      title: "Job Accepted",
      description: `You have successfully accepted job ${jobId}. Check your active deliveries.`,
    })
    // Here you would typically make an API call to accept the job
  }

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Jobs</h1>
          <p className="text-muted-foreground">Find and accept delivery jobs in your area</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Navigation className="mr-2 h-4 w-4" />
            View Map
          </Button>
          <Badge variant="secondary" className="text-sm">
            {filteredJobs.length} jobs available
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by location or job ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="express">Express</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payment">Highest Pay</SelectItem>
                <SelectItem value="distance">Shortest Distance</SelectItem>
                <SelectItem value="time">Shortest Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="grid gap-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{job.id}</h3>
                    <Badge variant="secondary" className={typeColors[job.type as keyof typeof typeColors]}>
                      {job.type}
                    </Badge>
                    <Badge variant="secondary" className={priorityColors[job.priority as keyof typeof priorityColors]}>
                      {job.priority} priority
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium text-foreground">${job.payment}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.distance} mi</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.estimatedDuration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      <span>
                        {job.items} items ({job.weight})
                      </span>
                    </div>
                  </div>
                </div>
                <Button onClick={() => handleAcceptJob(job.id)}>Accept Job</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Route Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-600">Pickup</h4>
                    <p className="text-sm">{job.pickup.address}</p>
                    <p className="text-xs text-muted-foreground">Scheduled: {formatTime(job.pickup.time)}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-600">Dropoff</h4>
                    <p className="text-sm">{job.dropoff.address}</p>
                    <p className="text-xs text-muted-foreground">Expected: {formatTime(job.dropoff.time)}</p>
                  </div>
                </div>

                {/* Special Instructions */}
                {job.specialInstructions && (
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Special Instructions</h4>
                    <p className="text-sm text-muted-foreground">{job.specialInstructions}</p>
                  </div>
                )}

                {/* Customer Rating */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>Customer Rating:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{job.customerRating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < Math.floor(job.customerRating) ? "text-yellow-400" : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-muted-foreground">${(job.payment / job.distance).toFixed(2)}/mile</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground text-center">
              No jobs match your current filters. Try adjusting your search criteria or check back later.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
