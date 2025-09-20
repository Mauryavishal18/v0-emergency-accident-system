"use client"

import { GovernmentPortal } from "@/components/government-portal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, ArrowLeft, Settings, FileText } from "lucide-react"
import Link from "next/link"

export default function GovernmentPortalPage() {
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
              <Building2 className="h-6 w-6 text-chart-4" />
              <h1 className="text-lg font-semibold text-balance">Government Integration Portal</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              Secure Connection
            </Badge>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Portal Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <GovernmentPortal />
      </div>
    </div>
  )
}
