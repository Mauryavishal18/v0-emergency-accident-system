"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  MapPin,
  Clock,
  Star,
  MessageCircle,
  Navigation,
  Shield,
  Heart,
  Car,
  Flame,
  Waves,
  Search,
  UserPlus,
  Award,
} from "lucide-react"

interface Volunteer {
  id: string
  name: string
  avatar?: string
  skills: string[]
  certifications: string[]
  rating: number
  totalRescues: number
  location: string
  coordinates: [number, number]
  status: "available" | "responding" | "busy" | "offline"
  responseTime: number // in minutes
  specialties: ("medical" | "fire" | "water" | "technical" | "search")[]
  equipment: string[]
  joinedDate: Date
  lastActive: Date
  verified: boolean
}

interface RescueRequest {
  id: string
  type: "medical" | "fire" | "water" | "technical" | "search"
  severity: "low" | "medium" | "high" | "critical"
  location: string
  coordinates: [number, number]
  description: string
  requiredSkills: string[]
  estimatedDuration: number
  maxVolunteers: number
  assignedVolunteers: string[]
  status: "open" | "assigned" | "in-progress" | "completed" | "cancelled"
  createdAt: Date
  urgency: number
  reward?: number
}

interface Team {
  id: string
  name: string
  leader: string
  members: string[]
  specialization: string
  location: string
  status: "available" | "deployed" | "training"
  equipment: string[]
  rating: number
  completedMissions: number
}

export function RescueNetwork() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    {
      id: "1",
      name: "Dr. Sarah Chen",
      avatar: "/caring-doctor.png",
      skills: ["Emergency Medicine", "Trauma Care", "CPR", "First Aid"],
      certifications: ["EMT-P", "ACLS", "PALS"],
      rating: 4.9,
      totalRescues: 127,
      location: "Downtown Medical District",
      coordinates: [37.7749, -122.4194],
      status: "available",
      responseTime: 8,
      specialties: ["medical"],
      equipment: ["Medical Kit", "Defibrillator", "Oxygen Tank"],
      joinedDate: new Date("2022-03-15"),
      lastActive: new Date(Date.now() - 300000),
      verified: true,
    },
    {
      id: "2",
      name: "Mike Rodriguez",
      avatar: "/firefighter-hero.png",
      skills: ["Fire Suppression", "Rescue Operations", "Hazmat"],
      certifications: ["Firefighter I", "Firefighter II", "Hazmat Ops"],
      rating: 4.8,
      totalRescues: 89,
      location: "Fire Station 12",
      coordinates: [37.7849, -122.4094],
      status: "responding",
      responseTime: 12,
      specialties: ["fire", "technical"],
      equipment: ["Fire Extinguisher", "Rescue Tools", "Breathing Apparatus"],
      joinedDate: new Date("2021-08-22"),
      lastActive: new Date(Date.now() - 600000),
      verified: true,
    },
    {
      id: "3",
      name: "Lisa Thompson",
      avatar: "/rescue-swimmer.jpg",
      skills: ["Water Rescue", "Swimming", "Boat Operation"],
      certifications: ["Water Safety Instructor", "Lifeguard"],
      rating: 4.7,
      totalRescues: 45,
      location: "Marina District",
      coordinates: [37.7649, -122.4294],
      status: "available",
      responseTime: 15,
      specialties: ["water"],
      equipment: ["Life Jacket", "Rescue Tube", "Throw Bag"],
      joinedDate: new Date("2023-01-10"),
      lastActive: new Date(Date.now() - 900000),
      verified: true,
    },
    {
      id: "4",
      name: "James Wilson",
      avatar: "/search-rescue.jpg",
      skills: ["Search & Rescue", "Navigation", "Wilderness Survival"],
      certifications: ["SAR Technician", "Wilderness First Aid"],
      rating: 4.6,
      totalRescues: 67,
      location: "Mountain Rescue Base",
      coordinates: [37.7549, -122.4394],
      status: "available",
      responseTime: 25,
      specialties: ["search", "technical"],
      equipment: ["GPS", "Rope", "Climbing Gear", "Radio"],
      joinedDate: new Date("2022-11-05"),
      lastActive: new Date(Date.now() - 1200000),
      verified: true,
    },
  ])

  const [rescueRequests, setRescueRequests] = useState<RescueRequest[]>([
    {
      id: "1",
      type: "medical",
      severity: "critical",
      location: "123 Emergency Ave",
      coordinates: [37.7749, -122.4194],
      description: "Cardiac arrest patient needs immediate medical attention",
      requiredSkills: ["CPR", "ACLS", "Emergency Medicine"],
      estimatedDuration: 60,
      maxVolunteers: 2,
      assignedVolunteers: ["1"],
      status: "assigned",
      createdAt: new Date(Date.now() - 300000),
      urgency: 10,
    },
    {
      id: "2",
      type: "fire",
      severity: "high",
      location: "456 Oak Street",
      coordinates: [37.7849, -122.4094],
      description: "Structure fire with potential trapped occupants",
      requiredSkills: ["Fire Suppression", "Rescue Operations"],
      estimatedDuration: 120,
      maxVolunteers: 4,
      assignedVolunteers: ["2"],
      status: "in-progress",
      createdAt: new Date(Date.now() - 600000),
      urgency: 9,
    },
    {
      id: "3",
      type: "water",
      severity: "medium",
      location: "Bay Area Marina",
      coordinates: [37.7649, -122.4294],
      description: "Boat taking on water, 3 people need rescue",
      requiredSkills: ["Water Rescue", "Boat Operation"],
      estimatedDuration: 90,
      maxVolunteers: 3,
      assignedVolunteers: [],
      status: "open",
      createdAt: new Date(Date.now() - 900000),
      urgency: 7,
    },
  ])

  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      name: "Alpha Medical Response",
      leader: "Dr. Sarah Chen",
      members: ["1", "5", "8"],
      specialization: "Emergency Medical Services",
      location: "Central Hospital",
      status: "available",
      equipment: ["Ambulance", "Advanced Life Support", "Trauma Kit"],
      rating: 4.9,
      completedMissions: 234,
    },
    {
      id: "2",
      name: "Fire & Rescue Squad",
      leader: "Mike Rodriguez",
      members: ["2", "6", "9", "10"],
      specialization: "Fire Suppression & Technical Rescue",
      location: "Fire Station 12",
      status: "deployed",
      equipment: ["Fire Engine", "Ladder Truck", "Rescue Tools"],
      rating: 4.8,
      completedMissions: 156,
    },
    {
      id: "3",
      name: "Water Rescue Team",
      leader: "Lisa Thompson",
      members: ["3", "7", "11"],
      specialization: "Water & Marine Rescue",
      location: "Coast Guard Station",
      status: "available",
      equipment: ["Rescue Boat", "Diving Equipment", "Water Safety Gear"],
      rating: 4.7,
      completedMissions: 89,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialty, setFilterSpecialty] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch =
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialty = filterSpecialty === "all" || volunteer.specialties.includes(filterSpecialty as any)
    const matchesStatus = filterStatus === "all" || volunteer.status === filterStatus

    return matchesSearch && matchesSpecialty && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500 text-white"
      case "responding":
        return "bg-orange-500 text-white"
      case "busy":
        return "bg-destructive text-destructive-foreground"
      case "offline":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "medical":
        return <Heart className="h-4 w-4" />
      case "fire":
        return <Flame className="h-4 w-4" />
      case "water":
        return <Waves className="h-4 w-4" />
      case "technical":
        return <Car className="h-4 w-4" />
      case "search":
        return <Search className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const assignVolunteer = (requestId: string, volunteerId: string) => {
    setRescueRequests((requests) =>
      requests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              assignedVolunteers: [...request.assignedVolunteers, volunteerId],
              status: "assigned" as const,
            }
          : request,
      ),
    )
    setVolunteers((vols) =>
      vols.map((vol) => (vol.id === volunteerId ? { ...vol, status: "responding" as const } : vol)),
    )
  }

  return (
    <div className="space-y-6">
      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Volunteers</p>
                <p className="text-2xl font-bold text-green-500">
                  {volunteers.filter((v) => v.status === "available").length}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Requests</p>
                <p className="text-2xl font-bold text-orange-500">
                  {rescueRequests.filter((r) => r.status === "open").length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Teams</p>
                <p className="text-2xl font-bold text-accent">{teams.filter((t) => t.status === "available").length}</p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-chart-2">
                  {Math.round(volunteers.reduce((sum, v) => sum + v.responseTime, 0) / volunteers.length)}m
                </p>
              </div>
              <Clock className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="volunteers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          <TabsTrigger value="requests">Rescue Requests</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="volunteers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Volunteer Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search volunteers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterSpecialty}
                    onChange={(e) => setFilterSpecialty(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="all">All Specialties</option>
                    <option value="medical">Medical</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="technical">Technical</option>
                    <option value="search">Search & Rescue</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="responding">Responding</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                  <Button variant="outline">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Recruit
                  </Button>
                </div>
              </div>

              {/* Volunteers List */}
              <div className="grid gap-4 md:grid-cols-2">
                {filteredVolunteers.map((volunteer) => (
                  <div key={volunteer.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={volunteer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {volunteer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{volunteer.name}</h3>
                            {volunteer.verified && <Shield className="h-4 w-4 text-green-500" />}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(volunteer.status)}>{volunteer.status.toUpperCase()}</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs">{volunteer.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {volunteer.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {volunteer.responseTime}m avg
                            </span>
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {volunteer.specialties.map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm" disabled={volunteer.status !== "available"}>
                          Assign
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span>{volunteer.totalRescues} rescues completed</span>
                      <span className="mx-2">•</span>
                      <span>Joined {volunteer.joinedDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Rescue Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rescueRequests.map((request) => (
                  <div key={request.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getTypeIcon(request.type)}</div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium capitalize">{request.type} Emergency</h3>
                            <Badge className={getSeverityColor(request.severity)}>
                              {request.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">Urgency: {request.urgency}/10</Badge>
                          </div>
                          <p className="text-sm">{request.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {request.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {request.estimatedDuration}min estimated
                            </span>
                            <span>
                              {request.assignedVolunteers.length}/{request.maxVolunteers} assigned
                            </span>
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {request.requiredSkills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Navigation className="h-4 w-4 mr-1" />
                          Navigate
                        </Button>
                        <Button size="sm" disabled={request.assignedVolunteers.length >= request.maxVolunteers}>
                          Assign Volunteer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Rescue Teams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teams.map((team) => (
                  <div key={team.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{team.name}</h3>
                          <Badge className={getStatusColor(team.status)}>{team.status.toUpperCase()}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{team.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{team.specialization}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {team.location}
                          </span>
                          <span>{team.members.length} members</span>
                          <span>{team.completedMissions} missions completed</span>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {team.equipment.map((item, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm" disabled={team.status !== "available"}>
                          Deploy
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Volunteer Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {volunteers
                  .sort((a, b) => b.totalRescues - a.totalRescues)
                  .map((volunteer, index) => (
                    <div
                      key={volunteer.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold">
                          {index + 1}
                        </div>
                        <Avatar>
                          <AvatarImage src={volunteer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {volunteer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{volunteer.name}</h3>
                          <p className="text-sm text-muted-foreground">{volunteer.specialties.join(", ")}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{volunteer.totalRescues} rescues</div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-sm">{volunteer.rating} rating</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
