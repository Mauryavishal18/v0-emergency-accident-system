"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, MapPin, Clock, Mic, Camera, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface SOSButtonProps {
  onEmergencyTriggered?: (emergency: EmergencyReport) => void
}

interface EmergencyReport {
  id: string
  type: "medical" | "accident" | "fire" | "crime" | "other"
  location: {
    latitude: number
    longitude: number
    address: string
  }
  timestamp: Date
  description: string
  severity: "low" | "medium" | "high" | "critical"
  reporterInfo: {
    name?: string
    phone?: string
    emergencyContact?: string
  }
  media?: {
    photos: string[]
    audio?: string
    video?: string
  }
}

export function SOSButton({ onEmergencyTriggered }: SOSButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [emergencyType, setEmergencyType] = useState<EmergencyReport["type"]>("medical")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState<string>("Getting location...")
  const [isRecording, setIsRecording] = useState(false)

  // Simulate getting user location
  useEffect(() => {
    if (isEmergencyActive) {
      // Simulate geolocation
      setTimeout(() => {
        setLocation("123 Emergency St, City Center")
      }, 1000)
    }
  }, [isEmergencyActive])

  const handleSOSPress = () => {
    setIsPressed(true)
    setCountdown(5)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsEmergencyActive(true)
          setIsPressed(false)
          triggerEmergency()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleCancel = () => {
    setIsPressed(false)
    setCountdown(0)
  }

  const triggerEmergency = () => {
    const emergency: EmergencyReport = {
      id: `sos-${Date.now()}`,
      type: emergencyType,
      location: {
        latitude: 37.7749,
        longitude: -122.4194,
        address: location,
      },
      timestamp: new Date(),
      description: description || "Emergency SOS triggered",
      severity: "critical",
      reporterInfo: {
        name: "Current User",
        phone: "+1-555-0123",
      },
      media: {
        photos: [],
      },
    }

    onEmergencyTriggered?.(emergency)
  }

  const handleSendAlert = () => {
    triggerEmergency()
    setIsEmergencyActive(false)
    setDescription("")
  }

  if (isEmergencyActive) {
    return (
      <Card className="w-full max-w-md mx-auto border-destructive">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-destructive flex items-center justify-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Emergency Alert Active
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <Badge variant="destructive" className="text-sm">
              EMERGENCY SERVICES NOTIFIED
            </Badge>
            <p className="text-sm text-muted-foreground">Help is on the way. Stay calm and follow instructions.</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Alert sent at {new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Emergency Type:</label>
            <select
              value={emergencyType}
              onChange={(e) => setEmergencyType(e.target.value as EmergencyReport["type"])}
              className="w-full p-2 border border-border rounded-md bg-background"
            >
              <option value="medical">Medical Emergency</option>
              <option value="accident">Accident</option>
              <option value="fire">Fire</option>
              <option value="crime">Crime/Security</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Information:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the emergency situation..."
              className="w-full p-2 border border-border rounded-md bg-background min-h-[80px] resize-none"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRecording(!isRecording)}
              className={cn(isRecording && "bg-destructive text-destructive-foreground")}
            >
              <Mic className="h-4 w-4 mr-1" />
              {isRecording ? "Stop Recording" : "Voice Note"}
            </Button>
            <Button variant="outline" size="sm">
              <Camera className="h-4 w-4 mr-1" />
              Photo
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsEmergencyActive(false)}>
              Cancel
            </Button>
            <Button className="flex-1 bg-destructive hover:bg-destructive/90" onClick={handleSendAlert}>
              <Send className="h-4 w-4 mr-1" />
              Send Alert
            </Button>
          </div>

          <div className="text-center">
            <Button variant="ghost" size="sm" className="text-accent">
              <Phone className="h-4 w-4 mr-1" />
              Call Emergency Services Directly
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="text-center space-y-4">
      <div className="relative">
        <Button
          size="lg"
          className={cn(
            "h-32 w-32 rounded-full text-white font-bold text-xl transition-all duration-200",
            isPressed
              ? "bg-destructive/80 scale-110 animate-pulse"
              : "bg-destructive hover:bg-destructive/90 hover:scale-105",
          )}
          onMouseDown={handleSOSPress}
          onMouseUp={handleCancel}
          onMouseLeave={handleCancel}
          onTouchStart={handleSOSPress}
          onTouchEnd={handleCancel}
        >
          {isPressed ? (
            <div className="text-center">
              <div className="text-3xl font-bold">{countdown}</div>
              <div className="text-xs">Release to cancel</div>
            </div>
          ) : (
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-1" />
              <div>SOS</div>
            </div>
          )}
        </Button>

        {isPressed && <div className="absolute inset-0 rounded-full border-4 border-destructive animate-ping" />}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Emergency SOS</h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto text-pretty">
          Press and hold the SOS button for 5 seconds to trigger an emergency alert. Your location and emergency
          services will be notified immediately.
        </p>
      </div>

      <div className="flex justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>GPS Enabled</span>
        </div>
        <div className="flex items-center gap-1">
          <Phone className="h-3 w-3" />
          <span>Auto-Call</span>
        </div>
      </div>
    </div>
  )
}
