"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, XCircle, Activity, Users, Database, Wifi } from "lucide-react"

interface SecurityEvent {
  id: string
  type: "login" | "data_access" | "alert_trigger" | "system_breach"
  severity: "low" | "medium" | "high" | "critical"
  timestamp: Date
  user: string
  description: string
  status: "resolved" | "investigating" | "open"
}

interface SystemMetric {
  name: string
  value: number
  status: "healthy" | "warning" | "critical"
  lastUpdate: Date
}

export default function SecurityDashboard() {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: "1",
      type: "login",
      severity: "low",
      timestamp: new Date(Date.now() - 300000),
      user: "admin@emergency.gov",
      description: "Successful admin login from verified location",
      status: "resolved",
    },
    {
      id: "2",
      type: "alert_trigger",
      severity: "high",
      timestamp: new Date(Date.now() - 600000),
      user: "system",
      description: "Multiple emergency alerts triggered simultaneously",
      status: "investigating",
    },
    {
      id: "3",
      type: "data_access",
      severity: "medium",
      timestamp: new Date(Date.now() - 900000),
      user: "rescue.team.alpha",
      description: "Bulk victim data access during active rescue operation",
      status: "resolved",
    },
  ])

  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { name: "API Response Time", value: 95, status: "healthy", lastUpdate: new Date() },
    { name: "Database Performance", value: 88, status: "healthy", lastUpdate: new Date() },
    { name: "Real-time Connections", value: 76, status: "warning", lastUpdate: new Date() },
    { name: "Security Score", value: 92, status: "healthy", lastUpdate: new Date() },
  ])

  const [realTimeStats, setRealTimeStats] = useState({
    activeUsers: 247,
    activeAlerts: 12,
    systemUptime: 99.8,
    dataIntegrity: 100,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        activeAlerts: Math.max(0, prev.activeAlerts + Math.floor(Math.random() * 3 - 1)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "investigating":
        return <Eye className="h-4 w-4 text-yellow-500" />
      case "open":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Real-time System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeStats.activeUsers}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Activity className="h-3 w-3" />
              <span>Live</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{realTimeStats.activeAlerts}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Activity className="h-3 w-3" />
              <span>Real-time</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{realTimeStats.systemUptime}%</div>
            <div className="text-xs text-muted-foreground">Last 30 days</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Integrity</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{realTimeStats.dataIntegrity}%</div>
            <div className="text-xs text-muted-foreground">All systems</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Security Events</TabsTrigger>
          <TabsTrigger value="metrics">System Metrics</TabsTrigger>
          <TabsTrigger value="encryption">Data Protection</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Events</span>
              </CardTitle>
              <CardDescription>Real-time security monitoring and incident tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(event.status)}
                      <div>
                        <div className="font-medium">{event.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.user} • {event.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(event.severity)}>{event.severity.toUpperCase()}</Badge>
                      <Badge variant="outline">{event.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemMetrics.map((metric) => (
              <Card key={metric.name}>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{metric.value}%</span>
                      <Badge variant={metric.status === "healthy" ? "default" : "destructive"}>{metric.status}</Badge>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Last updated: {metric.lastUpdate.toLocaleTimeString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="encryption" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Data Encryption</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Data at Rest</span>
                    <Badge className="bg-green-500">AES-256 Encrypted</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data in Transit</span>
                    <Badge className="bg-green-500">TLS 1.3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API Communications</span>
                    <Badge className="bg-green-500">End-to-End</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Emergency Alerts</span>
                    <Badge className="bg-green-500">Encrypted</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Access Control</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Multi-Factor Auth</span>
                    <Badge className="bg-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Role-Based Access</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Session Management</span>
                    <Badge className="bg-green-500">Secure</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Audit Logging</span>
                    <Badge className="bg-green-500">Complete</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
