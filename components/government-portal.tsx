"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Shield,
  AlertTriangle,
  FileText,
  Users,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  Download,
  Upload,
  Eye,
  Lock,
  Globe,
} from "lucide-react"

interface GovernmentAgency {
  id: string
  name: string
  type: "federal" | "state" | "local" | "military"
  department: string
  contactPerson: string
  phone: string
  email: string
  status: "active" | "standby" | "unavailable"
  capabilities: string[]
  jurisdiction: string
  responseTime: number
  lastContact: Date
  securityClearance: "public" | "confidential" | "secret" | "top-secret"
}

interface EmergencyDeclaration {
  id: string
  type: "local" | "state" | "federal" | "international"
  severity: "minor" | "major" | "catastrophic"
  title: string
  description: string
  affectedAreas: string[]
  estimatedCasualties: number
  estimatedDamage: number
  requestedResources: string[]
  status: "draft" | "submitted" | "under-review" | "approved" | "denied" | "active"
  submittedBy: string
  submittedAt: Date
  reviewedBy?: string
  reviewedAt?: Date
  approvalLevel: string
}

interface ResourceRequest {
  id: string
  requestingAgency: string
  resourceType: "personnel" | "equipment" | "funding" | "logistics" | "intelligence"
  description: string
  quantity: number
  urgency: "low" | "medium" | "high" | "critical"
  estimatedCost: number
  justification: string
  status: "pending" | "approved" | "denied" | "fulfilled"
  requestedAt: Date
  requiredBy: Date
  approvedBy?: string
}

interface ComplianceReport {
  id: string
  reportType: "incident" | "resource-usage" | "personnel" | "financial" | "security"
  title: string
  period: string
  status: "draft" | "submitted" | "approved"
  findings: string[]
  recommendations: string[]
  complianceScore: number
  submittedBy: string
  submittedAt: Date
}

export function GovernmentPortal() {
  const [agencies, setAgencies] = useState<GovernmentAgency[]>([
    {
      id: "1",
      name: "Federal Emergency Management Agency",
      type: "federal",
      department: "Department of Homeland Security",
      contactPerson: "Director Sarah Johnson",
      phone: "+1-202-646-2500",
      email: "emergency.ops@fema.gov",
      status: "active",
      capabilities: ["Disaster Response", "Resource Coordination", "Federal Funding", "Logistics"],
      jurisdiction: "National",
      responseTime: 120,
      lastContact: new Date(Date.now() - 3600000),
      securityClearance: "secret",
    },
    {
      id: "2",
      name: "State Emergency Management",
      type: "state",
      department: "State Public Safety",
      contactPerson: "Commissioner Mike Davis",
      phone: "+1-555-STATE-911",
      email: "emergency@state.gov",
      status: "active",
      capabilities: ["State Resources", "National Guard", "Inter-agency Coordination"],
      jurisdiction: "Statewide",
      responseTime: 60,
      lastContact: new Date(Date.now() - 1800000),
      securityClearance: "confidential",
    },
    {
      id: "3",
      name: "National Guard Bureau",
      type: "military",
      department: "Department of Defense",
      contactPerson: "General Lisa Rodriguez",
      phone: "+1-703-607-2584",
      email: "ops@nationalguard.mil",
      status: "standby",
      capabilities: ["Military Personnel", "Heavy Equipment", "Logistics", "Security"],
      jurisdiction: "National",
      responseTime: 180,
      lastContact: new Date(Date.now() - 7200000),
      securityClearance: "secret",
    },
    {
      id: "4",
      name: "City Emergency Operations",
      type: "local",
      department: "City Public Safety",
      contactPerson: "Chief Operations Officer Tom Wilson",
      phone: "+1-555-CITY-911",
      email: "eoc@city.gov",
      status: "active",
      capabilities: ["Local Resources", "First Responders", "Public Communications"],
      jurisdiction: "City Limits",
      responseTime: 30,
      lastContact: new Date(Date.now() - 900000),
      securityClearance: "public",
    },
  ])

  const [declarations, setDeclarations] = useState<EmergencyDeclaration[]>([
    {
      id: "1",
      type: "state",
      severity: "major",
      title: "Multi-County Emergency Response Declaration",
      description: "Coordinated response for multiple emergency incidents across three counties",
      affectedAreas: ["County A", "County B", "County C"],
      estimatedCasualties: 45,
      estimatedDamage: 2500000,
      requestedResources: ["Medical Personnel", "Emergency Supplies", "Transportation"],
      status: "approved",
      submittedBy: "State Emergency Coordinator",
      submittedAt: new Date(Date.now() - 7200000),
      reviewedBy: "State Emergency Director",
      reviewedAt: new Date(Date.now() - 3600000),
      approvalLevel: "State Level",
    },
    {
      id: "2",
      type: "federal",
      severity: "catastrophic",
      title: "Regional Disaster Declaration Request",
      description: "Request for federal disaster declaration due to widespread infrastructure damage",
      affectedAreas: ["Region 1", "Region 2", "Region 3", "Region 4"],
      estimatedCasualties: 150,
      estimatedDamage: 50000000,
      requestedResources: ["Federal Funding", "Military Support", "Medical Teams", "Engineering Corps"],
      status: "under-review",
      submittedBy: "Governor's Office",
      submittedAt: new Date(Date.now() - 10800000),
      approvalLevel: "Federal Level",
    },
  ])

  const [resourceRequests, setResourceRequests] = useState<ResourceRequest[]>([
    {
      id: "1",
      requestingAgency: "City Fire Department",
      resourceType: "equipment",
      description: "Additional fire suppression equipment for large-scale incident",
      quantity: 5,
      urgency: "high",
      estimatedCost: 150000,
      justification: "Current equipment insufficient for multi-building fire response",
      status: "approved",
      requestedAt: new Date(Date.now() - 5400000),
      requiredBy: new Date(Date.now() + 3600000),
      approvedBy: "State Emergency Management",
    },
    {
      id: "2",
      requestingAgency: "County Medical Services",
      resourceType: "personnel",
      description: "Emergency medical personnel for mass casualty incident",
      quantity: 20,
      urgency: "critical",
      estimatedCost: 75000,
      justification: "Local medical capacity exceeded, need additional EMTs and paramedics",
      status: "pending",
      requestedAt: new Date(Date.now() - 1800000),
      requiredBy: new Date(Date.now() + 1800000),
    },
  ])

  const [complianceReports, setComplianceReports] = useState<ComplianceReport[]>([
    {
      id: "1",
      reportType: "incident",
      title: "Emergency Response Compliance Review - Q4 2024",
      period: "October - December 2024",
      status: "approved",
      findings: [
        "Response times met federal standards",
        "Resource allocation followed protocols",
        "Communication systems functioned properly",
      ],
      recommendations: [
        "Increase training frequency",
        "Update equipment inventory",
        "Improve inter-agency coordination",
      ],
      complianceScore: 94,
      submittedBy: "Compliance Officer",
      submittedAt: new Date(Date.now() - 2592000000),
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
      case "fulfilled":
        return "bg-green-500 text-white"
      case "standby":
      case "under-review":
      case "pending":
        return "bg-yellow-500 text-black"
      case "unavailable":
      case "denied":
        return "bg-destructive text-destructive-foreground"
      case "draft":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "catastrophic":
        return "bg-destructive text-destructive-foreground"
      case "major":
        return "bg-orange-500 text-white"
      case "minor":
        return "bg-yellow-500 text-black"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const getClearanceColor = (clearance: string) => {
    switch (clearance) {
      case "top-secret":
        return "bg-destructive text-destructive-foreground"
      case "secret":
        return "bg-orange-500 text-white"
      case "confidential":
        return "bg-yellow-500 text-black"
      case "public":
        return "bg-green-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Government Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Agencies</p>
                <p className="text-2xl font-bold text-green-500">
                  {agencies.filter((a) => a.status === "active").length}
                </p>
              </div>
              <Building2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold text-orange-500">
                  {resourceRequests.filter((r) => r.status === "pending").length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Declarations</p>
                <p className="text-2xl font-bold text-accent">
                  {declarations.filter((d) => d.status === "active" || d.status === "approved").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compliance Score</p>
                <p className="text-2xl font-bold text-chart-2">
                  {complianceReports.length > 0 ? complianceReports[0].complianceScore : 0}%
                </p>
              </div>
              <Shield className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="agencies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="agencies">Government Agencies</TabsTrigger>
          <TabsTrigger value="declarations">Emergency Declarations</TabsTrigger>
          <TabsTrigger value="resources">Resource Requests</TabsTrigger>
          <TabsTrigger value="compliance">Compliance & Reporting</TabsTrigger>
        </TabsList>

        <TabsContent value="agencies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Government Agency Coordination
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agencies.map((agency) => (
                  <div key={agency.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{agency.name}</h3>
                          <Badge className={getStatusColor(agency.status)}>{agency.status.toUpperCase()}</Badge>
                          <Badge className={getClearanceColor(agency.securityClearance)}>
                            <Lock className="h-3 w-3 mr-1" />
                            {agency.securityClearance.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{agency.department}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {agency.contactPerson}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {agency.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {agency.responseTime}min response
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {agency.jurisdiction}
                          </span>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {agency.capabilities.map((capability, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {capability}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last contact: {Math.floor((Date.now() - agency.lastContact.getTime()) / 60000)}m ago
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-1" />
                          Request Support
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="declarations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency Declarations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full md:w-auto">
                  <FileText className="h-4 w-4 mr-2" />
                  Create New Declaration
                </Button>

                {declarations.map((declaration) => (
                  <div key={declaration.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{declaration.title}</h3>
                          <Badge className={getSeverityColor(declaration.severity)}>
                            {declaration.severity.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(declaration.status)}>
                            {declaration.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm">{declaration.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="text-muted-foreground">Affected Areas:</span>
                            <div className="font-medium">{declaration.affectedAreas.length} locations</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Est. Casualties:</span>
                            <div className="font-medium">{declaration.estimatedCasualties}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Est. Damage:</span>
                            <div className="font-medium">${declaration.estimatedDamage.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Approval Level:</span>
                            <div className="font-medium">{declaration.approvalLevel}</div>
                          </div>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {declaration.requestedResources.map((resource, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {resource}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Submitted by {declaration.submittedBy} • {declaration.submittedAt.toLocaleString()}
                          {declaration.reviewedBy && ` • Reviewed by ${declaration.reviewedBy}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resource Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full md:w-auto">
                  <Send className="h-4 w-4 mr-2" />
                  Submit New Request
                </Button>

                {resourceRequests.map((request) => (
                  <div key={request.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium capitalize">{request.resourceType} Request</h3>
                          <Badge className={getUrgencyColor(request.urgency)}>{request.urgency.toUpperCase()}</Badge>
                          <Badge className={getStatusColor(request.status)}>{request.status.toUpperCase()}</Badge>
                        </div>
                        <p className="text-sm">{request.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="text-muted-foreground">Requesting Agency:</span>
                            <div className="font-medium">{request.requestingAgency}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Quantity:</span>
                            <div className="font-medium">{request.quantity}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Est. Cost:</span>
                            <div className="font-medium">${request.estimatedCost.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Required By:</span>
                            <div className="font-medium">{request.requiredBy.toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="bg-muted p-2 rounded text-xs">
                          <span className="text-muted-foreground">Justification:</span>
                          <div>{request.justification}</div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Requested: {request.requestedAt.toLocaleString()}
                          {request.approvedBy && ` • Approved by: ${request.approvedBy}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {request.status === "pending" && (
                          <>
                            <Button size="sm" variant="outline">
                              <XCircle className="h-4 w-4 mr-1" />
                              Deny
                            </Button>
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Compliance Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Generate New Report
                  </Button>

                  {complianceReports.map((report) => (
                    <div key={report.id} className="border border-border rounded-lg p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{report.title}</h3>
                          <Badge className={getStatusColor(report.status)}>{report.status.toUpperCase()}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{report.period}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Compliance Score</span>
                            <span className="font-medium">{report.complianceScore}%</span>
                          </div>
                          <Progress value={report.complianceScore} className="h-2" />
                        </div>
                        <div className="text-xs">
                          <div className="text-muted-foreground">Key Findings:</div>
                          <ul className="list-disc list-inside space-y-1">
                            {report.findings.slice(0, 2).map((finding, index) => (
                              <li key={index}>{finding}</li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Submitted by {report.submittedBy} • {report.submittedAt.toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Full Report
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Regulatory Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border border-border rounded">
                    <div>
                      <div className="font-medium text-sm">FEMA Compliance</div>
                      <div className="text-xs text-muted-foreground">Federal emergency standards</div>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Compliant
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border border-border rounded">
                    <div>
                      <div className="font-medium text-sm">NIMS Integration</div>
                      <div className="text-xs text-muted-foreground">National Incident Management System</div>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Compliant
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border border-border rounded">
                    <div>
                      <div className="font-medium text-sm">ICS Protocols</div>
                      <div className="text-xs text-muted-foreground">Incident Command System</div>
                    </div>
                    <Badge className="bg-yellow-500 text-black">
                      <Clock className="h-3 w-3 mr-1" />
                      Review Required
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border border-border rounded">
                    <div>
                      <div className="font-medium text-sm">Security Clearances</div>
                      <div className="text-xs text-muted-foreground">Personnel security verification</div>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Current
                    </Badge>
                  </div>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Requirements
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
