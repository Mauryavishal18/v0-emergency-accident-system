"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Eye,
  Activity,
  MapPin,
  Clock,
  Zap,
  Car,
  Cloud,
  Heart,
  Flame,
  Waves,
  Camera,
  Wifi,
  Smartphone,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface RiskPrediction {
  id: string
  type: "traffic" | "weather" | "medical" | "fire" | "flood" | "crime"
  location: string
  coordinates: [number, number]
  riskLevel: number
  confidence: number
  timeframe: "1h" | "6h" | "24h" | "7d"
  factors: string[]
  prediction: string
  lastUpdated: Date
  trend: "increasing" | "decreasing" | "stable"
}

interface AISource {
  id: string
  name: string
  type: "camera" | "sensor" | "social" | "weather" | "traffic" | "medical"
  status: "online" | "offline" | "maintenance"
  location: string
  dataPoints: number
  accuracy: number
  lastUpdate: Date
}

export function AIRiskDashboard() {
  const [predictions, setPredictions] = useState<RiskPrediction[]>([
    {
      id: "1",
      type: "traffic",
      location: "Highway 101 Corridor",
      coordinates: [37.7749, -122.4194],
      riskLevel: 78,
      confidence: 92,
      timeframe: "6h",
      factors: ["Heavy traffic", "Weather conditions", "Historical patterns", "Event schedules"],
      prediction: "High probability of traffic accidents during evening rush hour",
      lastUpdated: new Date(Date.now() - 300000),
      trend: "increasing",
    },
    {
      id: "2",
      type: "weather",
      location: "Downtown District",
      coordinates: [37.7849, -122.4094],
      riskLevel: 45,
      confidence: 87,
      timeframe: "24h",
      factors: ["Storm system approaching", "Wind patterns", "Temperature drop"],
      prediction: "Moderate risk of severe weather conditions",
      lastUpdated: new Date(Date.now() - 600000),
      trend: "stable",
    },
    {
      id: "3",
      type: "medical",
      location: "Elderly Care District",
      coordinates: [37.7649, -122.4294],
      riskLevel: 34,
      confidence: 76,
      timeframe: "24h",
      factors: ["Air quality", "Temperature", "Seasonal patterns", "Population density"],
      prediction: "Elevated risk of respiratory emergencies",
      lastUpdated: new Date(Date.now() - 900000),
      trend: "decreasing",
    },
    {
      id: "4",
      type: "fire",
      location: "Wildland Interface Zone",
      coordinates: [37.7549, -122.4394],
      riskLevel: 67,
      confidence: 94,
      timeframe: "7d",
      factors: ["Dry conditions", "Wind speed", "Vegetation moisture", "Historical fire data"],
      prediction: "High fire risk due to dry conditions and wind patterns",
      lastUpdated: new Date(Date.now() - 1200000),
      trend: "increasing",
    },
  ])

  const [aiSources, setAISources] = useState<AISource[]>([
    {
      id: "1",
      name: "Traffic Camera Network",
      type: "camera",
      status: "online",
      location: "Citywide",
      dataPoints: 15420,
      accuracy: 94.2,
      lastUpdate: new Date(Date.now() - 60000),
    },
    {
      id: "2",
      name: "Weather Sensor Grid",
      type: "weather",
      status: "online",
      location: "Regional",
      dataPoints: 8760,
      accuracy: 91.8,
      lastUpdate: new Date(Date.now() - 120000),
    },
    {
      id: "3",
      name: "IoT Emergency Sensors",
      type: "sensor",
      status: "online",
      location: "Critical Infrastructure",
      dataPoints: 23100,
      accuracy: 96.7,
      lastUpdate: new Date(Date.now() - 180000),
    },
    {
      id: "4",
      name: "Social Media Monitor",
      type: "social",
      status: "online",
      location: "Digital",
      dataPoints: 45600,
      accuracy: 73.4,
      lastUpdate: new Date(Date.now() - 240000),
    },
    {
      id: "5",
      name: "Medical Alert System",
      type: "medical",
      status: "maintenance",
      location: "Healthcare Network",
      dataPoints: 12300,
      accuracy: 88.9,
      lastUpdate: new Date(Date.now() - 3600000),
    },
  ])

  // Mock real-time data for charts
  const [riskTrendData] = useState([
    { time: "00:00", traffic: 45, weather: 30, medical: 25, fire: 60 },
    { time: "04:00", traffic: 35, weather: 35, medical: 30, fire: 58 },
    { time: "08:00", traffic: 75, weather: 40, medical: 35, fire: 55 },
    { time: "12:00", traffic: 65, weather: 45, medical: 40, fire: 62 },
    { time: "16:00", traffic: 85, weather: 42, medical: 38, fire: 65 },
    { time: "20:00", traffic: 78, weather: 38, medical: 32, fire: 67 },
  ])

  const [accuracyData] = useState([
    { source: "Traffic Cameras", accuracy: 94.2, predictions: 1240 },
    { source: "Weather Sensors", accuracy: 91.8, predictions: 876 },
    { source: "IoT Sensors", accuracy: 96.7, predictions: 2310 },
    { source: "Social Media", accuracy: 73.4, predictions: 4560 },
    { source: "Medical Systems", accuracy: 88.9, predictions: 1230 },
  ])

  const getRiskColor = (level: number) => {
    if (level >= 70) return "text-destructive"
    if (level >= 50) return "text-orange-500"
    if (level >= 30) return "text-yellow-500"
    return "text-green-500"
  }

  const getRiskBadgeColor = (level: number) => {
    if (level >= 70) return "bg-destructive text-destructive-foreground"
    if (level >= 50) return "bg-orange-500 text-white"
    if (level >= 30) return "bg-yellow-500 text-black"
    return "bg-green-500 text-white"
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "traffic":
        return <Car className="h-4 w-4" />
      case "weather":
        return <Cloud className="h-4 w-4" />
      case "medical":
        return <Heart className="h-4 w-4" />
      case "fire":
        return <Flame className="h-4 w-4" />
      case "flood":
        return <Waves className="h-4 w-4" />
      case "crime":
        return <Eye className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "camera":
        return <Camera className="h-4 w-4" />
      case "sensor":
        return <Wifi className="h-4 w-4" />
      case "weather":
        return <Cloud className="h-4 w-4" />
      case "social":
        return <Smartphone className="h-4 w-4" />
      case "medical":
        return <Heart className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-destructive" />
      case "decreasing":
        return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getOverallRiskScore = () => {
    const totalRisk = predictions.reduce((sum, pred) => sum + pred.riskLevel, 0)
    return Math.round(totalRisk / predictions.length)
  }

  return (
    <div className="space-y-6">
      {/* AI Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Risk Score</CardTitle>
            <Brain className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getRiskColor(getOverallRiskScore())}`}>{getOverallRiskScore()}%</div>
            <Progress value={getOverallRiskScore()} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Predictions</CardTitle>
            <Zap className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{predictions.length}</div>
            <p className="text-xs text-muted-foreground">
              {predictions.filter((p) => p.riskLevel >= 50).length} high risk
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Sources Online</CardTitle>
            <Eye className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {aiSources.filter((s) => s.status === "online").length}/{aiSources.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((aiSources.filter((s) => s.status === "online").length / aiSources.length) * 100)}%
              operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
            <Activity className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(aiSources.reduce((sum, s) => sum + s.accuracy, 0) / aiSources.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Average across all sources</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="predictions">Risk Predictions</TabsTrigger>
          <TabsTrigger value="sources">AI Sources</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="training">Model Training</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Risk Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div key={prediction.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getTypeIcon(prediction.type)}</div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium capitalize">{prediction.type} Risk Assessment</h3>
                            <Badge className={getRiskBadgeColor(prediction.riskLevel)}>
                              {prediction.riskLevel}% Risk
                            </Badge>
                            <Badge variant="outline">{prediction.confidence}% Confidence</Badge>
                            <div className="flex items-center gap-1">
                              {getTrendIcon(prediction.trend)}
                              <span className="text-xs text-muted-foreground capitalize">{prediction.trend}</span>
                            </div>
                          </div>
                          <p className="text-sm">{prediction.prediction}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {prediction.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {prediction.timeframe} forecast
                            </span>
                            <span>
                              Updated {Math.floor((Date.now() - prediction.lastUpdated.getTime()) / 60000)}m ago
                            </span>
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {prediction.factors.map((factor, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm">Create Alert</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                AI Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiSources.map((source) => (
                  <div
                    key={source.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getSourceIcon(source.type)}
                        <div>
                          <h3 className="font-medium">{source.name}</h3>
                          <p className="text-sm text-muted-foreground">{source.location}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm">
                        <div className="font-medium">{source.dataPoints.toLocaleString()} data points</div>
                        <div className="text-muted-foreground">{source.accuracy}% accuracy</div>
                      </div>
                      <Badge
                        className={
                          source.status === "online"
                            ? "bg-green-500 text-white"
                            : source.status === "maintenance"
                              ? "bg-yellow-500 text-black"
                              : "bg-destructive text-destructive-foreground"
                        }
                      >
                        {source.status.toUpperCase()}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Trends (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={riskTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="traffic" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="weather" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="medical" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="fire" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Source Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={accuracyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="accuracy" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Model Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Traffic Prediction Model</span>
                    <span>94.2% Accuracy</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weather Risk Model</span>
                    <span>91.8% Accuracy</span>
                  </div>
                  <Progress value={91.8} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Medical Emergency Model</span>
                    <span>88.9% Accuracy</span>
                  </div>
                  <Progress value={88.9} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fire Risk Model</span>
                    <span>96.7% Accuracy</span>
                  </div>
                  <Progress value={96.7} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Training Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Training Run</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    2 hours ago
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Training Data Points</span>
                  <span className="text-sm font-medium">2.4M samples</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Model Version</span>
                  <span className="text-sm font-medium">v2.1.3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Next Scheduled Training</span>
                  <span className="text-sm font-medium">In 22 hours</span>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  Trigger Manual Training
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
