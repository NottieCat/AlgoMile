"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Define types for Leaflet
interface LatLng {
  lat: number
  lng: number
}

interface LeafletMap {
  setView: (center: [number, number], zoom: number) => void
  remove: () => void
}

interface LeafletMarker {
  setLatLng: (latlng: [number, number]) => void
  getLatLng: () => LatLng
  remove: () => void
}

export function DeliveryMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMap | null>(null)
  const markerRef = useRef<LeafletMarker | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null)
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return

    const initMap = async () => {
      // Dynamically import Leaflet to avoid SSR issues
      const L = (await import("leaflet")).default

      // Fix for default markers in Leaflet with webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })

      // Default location (San Francisco)
      const defaultLocation: [number, number] = [37.7749, -122.4194]

      const map = L.map(mapRef.current).setView(defaultLocation, 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map)

      // Create draggable marker
      const marker = L.marker(defaultLocation, { draggable: true }).addTo(map)

      // Handle marker drag
      marker.on("dragend", () => {
        const position = marker.getLatLng()
        setSelectedLocation(position)
      })

      // Handle map click
      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng
        marker.setLatLng([lat, lng])
        setSelectedLocation({ lat, lng })
      })

      mapInstanceRef.current = map as any
      markerRef.current = marker as any
      setSelectedLocation({ lat: defaultLocation[0], lng: defaultLocation[1] })
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }
    }
  }, [])

  const getCurrentLocation = () => {
    setIsLoading(true)

    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation.",
      })
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const newLocation = { lat: latitude, lng: longitude }

        setCurrentLocation(newLocation)
        setSelectedLocation(newLocation)

        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 15)
          markerRef.current.setLatLng([latitude, longitude])
        }

        toast({
          title: "Location found",
          description: "Your current location has been set as delivery address.",
        })
        setIsLoading(false)
      },
      (error) => {
        console.error("Error getting location:", error)
        toast({
          variant: "destructive",
          title: "Location error",
          description: "Unable to get your current location. Please select manually on the map.",
        })
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  const resetToDefault = () => {
    const defaultLocation: [number, number] = [37.7749, -122.4194]

    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView(defaultLocation, 13)
      markerRef.current.setLatLng(defaultLocation)
    }

    setSelectedLocation({ lat: defaultLocation[0], lng: defaultLocation[1] })
    setCurrentLocation(null)
  }

  const confirmLocation = () => {
    if (!selectedLocation) {
      toast({
        variant: "destructive",
        title: "No location selected",
        description: "Please select a delivery location on the map.",
      })
      return
    }

    toast({
      title: "Location confirmed",
      description: `Delivery location set to: ${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}`,
    })

    // Here you would typically save the location and proceed with the order
    console.log("Confirmed location:", selectedLocation)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Select Delivery Location
        </CardTitle>
        <CardDescription>
          Click on the map or drag the marker to set your delivery location. You can also use your current location.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Container */}
        <div className="relative">
          <div ref={mapRef} className="w-full h-96 rounded-lg border" style={{ minHeight: "400px" }} />

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={getCurrentLocation}
              disabled={isLoading}
              title="Get current location"
            >
              <Navigation className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={resetToDefault} title="Reset to default location">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Location Info */}
        {selectedLocation && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Selected Location:</h4>
            <p className="text-sm text-muted-foreground">Latitude: {selectedLocation.lat.toFixed(6)}</p>
            <p className="text-sm text-muted-foreground">Longitude: {selectedLocation.lng.toFixed(6)}</p>
            {currentLocation && <p className="text-sm text-green-600 mt-1">✓ Using your current location</p>}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={getCurrentLocation} disabled={isLoading} variant="outline">
            <Navigation className="mr-2 h-4 w-4" />
            {isLoading ? "Getting Location..." : "Use Current Location"}
          </Button>
          <Button onClick={confirmLocation} className="flex-1">
            <MapPin className="mr-2 h-4 w-4" />
            Confirm Location & Proceed
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
