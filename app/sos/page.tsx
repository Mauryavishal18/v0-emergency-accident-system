"use client"

import { useState } from "react"
import { SOSButton } from "@/components/sos-button"
import { AlertManagement } from "@/components/alert-management"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, ArrowLeft, Phone, MapPin } from "lucide-react"
import Link from "next/link"

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
}

export default function SOSPage() {
  const [recentEmergencies, setRecentEmergencies] = useState<EmergencyReport[]>([])

  const handleEmergencyTriggered = (emergency: EmergencyReport) => {
    setRecentEmergencies((prev) => [emergency, ...prev])
    // In a real app, this would send to emergency services
    console.log("Emergency triggered:", emergency)
  }

  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-lg font-semibold text-balance">SOS & Alert System</h1>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Emergency Services Connected
          </Badge>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        <Tabs defaultValue="sos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sos">Emergency SOS</TabsTrigger>
            <TabsTrigger value="alerts">Alert Management</TabsTrigger>
            <TabsTrigger value="history">Emergency History</TabsTrigger>
          </TabsList>

          <TabsContent value="sos" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* SOS Button */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-balance">Emergency SOS</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center py-8">
                  <SOSButton onEmergencyTriggered={handleEmergencyTriggered} />
                </CardContent>
              </Card>

              {/* Emergency Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                      <Phone className="h-4 w-4 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Emergency Services</div>
                        <div className="text-sm text-muted-foreground">911</div>
                      </div>
                    </Button>

                    <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                      <Phone className="h-4 w-4 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Poison Control</div>
                        <div className="text-sm text-muted-foreground">1-800-222-1222</div>
                      </div>
                    </Button>

                    <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                      <Phone className="h-4 w-4 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Crisis Hotline</div>
                        <div className="text-sm text-muted-foreground">988</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Response Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-destructive">Medical Emergency</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Check for responsiveness</li>
                      <li>• Call for help immediately</li>
                      <li>• Provide first aid if trained</li>
                      <li>• Stay with the person</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-orange-500">Fire Emergency</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Get out immediately</li>
                      <li>• Stay low to avoid smoke</li>
                      <li>• Don't use elevators</li>
                      <li>• Meet at designated area</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-accent">Accident</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Ensure scene safety</li>
                      <li>• Don't move injured persons</li>
                      <li>• Direct traffic if needed</li>
                      <li>• Wait for emergency services</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-chart-2">Natural Disaster</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Follow evacuation orders</li>
                      <li>• Take emergency kit</li>
                      <li>• Stay informed via radio</li>
                      <li>• Avoid damaged areas</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <AlertManagement />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Recent Emergency Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentEmergencies.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No recent emergency reports</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentEmergencies.map((emergency) => (
                      <div key={emergency.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-destructive text-destructive-foreground">
                                {emergency.type.toUpperCase()}
                              </Badge>
                              <Badge className="bg-orange-500 text-white">{emergency.severity.toUpperCase()}</Badge>
                            </div>
                            <p className="font-medium">{emergency.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {emergency.location.address}
                              </span>
                              <span>{emergency.timestamp.toLocaleString()}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            Reported
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
