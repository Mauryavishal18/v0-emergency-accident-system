import SecurityDashboard from "@/components/security-dashboard"

export default function SecurityPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Security & Real-time Monitoring</h1>
        <p className="text-muted-foreground">Comprehensive security monitoring and real-time system status</p>
      </div>
      <SecurityDashboard />
    </div>
  )
}
