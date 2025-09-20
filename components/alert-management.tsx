"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Search, MapPin, Clock, User, Phone, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface Alert {
  id: string
  type: "sos" | "citizen" | "ai" | "sensor"
  severity: "low" | "medium" | "high" | "critical"
  status: "pending" | "verified" | "responding" | "resolved" | "false-alarm"
  title: string
  description: string
  location: string
  coordinates: [number, number]
  timestamp: Date
  reporter: {
    name: string
    phone?: string
    type: "citizen" | "ai" | "sensor" | "official"
  }
  assignedTeam?: string
  responseTime?: number
  priority: number
}

export function AlertManagement() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "sos",
      severity: "critical",
      status: "responding",
      title: "SOS Emergency Alert",
      description: "Medical emergency - chest pain, difficulty breathing",
      location: "123 Emergency St, City Center",
      coordinates: [37.7749, -122.4194],
      timestamp: new Date(Date.now() - 300000),
      reporter: {
        name: "John Doe",
        phone: "+1-555-0123",
        type: "citizen",
      },
      assignedTeam: "Medical Team Alpha",
      priority: 1,
    },
    {
      id: "2",
      type: "ai",
      severity: "high",
      status: "verified",
      title: "Traffic Accident Detected",
      description: "Multi-vehicle collision detected by traffic camera AI",
      location: "Highway 101, Mile 45",
      coordinates: [37.7849, -122.4094],
      timestamp: new Date(Date.now() - 600000),
      reporter: {
        name: "Traffic AI System",
        type: "ai",
      },
      priority: 2,
    },
    {
      id: "3",
      type: "citizen",
      severity: "medium",
      status: "pending",
      title: "Suspicious Activity Report",
      description: "Unusual activity reported in downtown area",
      location: "456 Main St, Downtown",
      coordinates: [37.7649, -122.4294],
      timestamp: new Date(Date.now() - 900000),
      reporter: {
        name: "Anonymous Citizen",
        type: "citizen",
      },
      priority: 3,
    },
    {
      id: "4",
      type: "sensor",
      severity: "high",
      status: "responding",
      title: "Fire Detected",
      description: "Smoke and heat sensors triggered in industrial area",
      location: "Industrial Park, Sector 12",
      coordinates: [37.7549, -122.4394],
      timestamp: new Date(Date.now() - 1200000),
      reporter: {
        name: "IoT Sensor Network",
        type: "sensor",
      },
      assignedTeam: "Fire Team Beta",
      priority: 1,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterSeverity, setFilterSeverity] = useState<string>("all")

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || alert.status === filterStatus
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity

    return matchesSearch && matchesStatus && matchesSeverity
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-black"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-black"
      case "verified":
        return "bg-accent text-accent-foreground"
      case "responding":
        return "bg-orange-500 text-white"
      case "resolved":
        return "bg-green-500 text-white"
      case "false-alarm":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sos":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "ai":
        return <AlertCircle className="h-4 w-4 text-accent" />
      case "citizen":
        return <User className="h-4 w-4 text-chart-2" />
      case "sensor":
        return <AlertCircle className="h-4 w-4 text-chart-3" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const updateAlertStatus = (alertId: string, newStatus: Alert["status"]) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, status: newStatus } : alert)))
  }

  const getStatusCounts = () => {
    return {
      pending: alerts.filter((a) => a.status === "pending").length,
      verified: alerts.filter((a) => a.status === "verified").length,
      responding: alerts.filter((a) => a.status === "responding").length,
      resolved: alerts.filter((a) => a.status === "resolved").length,
    }
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="space-y-6">
      {/* Alert Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-500">{statusCounts.pending}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold text-accent">{statusCounts.verified}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Responding</p>
                <p className="text-2xl font-bold text-orange-500">{statusCounts.responding}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-green-500">{statusCounts.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alert Management System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="responding">Responding</option>
                <option value="resolved">Resolved</option>
              </select>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getTypeIcon(alert.type)}</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{alert.title}</h3>
                        <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                        <Badge className={getStatusColor(alert.status)}>{alert.status.toUpperCase()}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)}m ago
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {alert.reporter.name}
                        </span>
                        {alert.reporter.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {alert.reporter.phone}
                          </span>
                        )}
                      </div>
                      {alert.assignedTeam && <Badge variant="outline">Assigned: {alert.assignedTeam}</Badge>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {alert.status === "pending" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => updateAlertStatus(alert.id, "false-alarm")}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Dismiss
                        </Button>
                        <Button size="sm" onClick={() => updateAlertStatus(alert.id, "verified")}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verify
                        </Button>
                      </>
                    )}
                    {alert.status === "verified" && (
                      <Button size="sm" onClick={() => updateAlertStatus(alert.id, "responding")}>
                        Deploy Team
                      </Button>
                    )}
                    {alert.status === "responding" && (
                      <Button size="sm" variant="outline" onClick={() => updateAlertStatus(alert.id, "resolved")}>
                        Mark Resolved
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
