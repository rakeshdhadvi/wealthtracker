"use client"

import { useState } from "react"
import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { addSampleData } from "@/scripts/add-sample-data"
import { Database, Plus, CheckCircle, AlertCircle } from "lucide-react"

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; error?: any } | null>(null)

  const handleAddSampleData = async () => {
    setLoading(true)
    setResult(null)

    const result = await addSampleData()
    setResult(result)
    setLoading(false)
  }

  return (
    <Section padding="xl">
      <Container size="sm">
        <div className="text-center mb-8">
          <Typography variant="h2" weight="bold" className="mb-4">
            Admin Panel
          </Typography>
          <Typography variant="body" color="muted">
            Manage your WealthTracker data
          </Typography>
        </div>

        <InteractiveCard className="p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Database className="w-8 h-8 text-blue-600" />
            </div>

            <Typography variant="h4" weight="bold" className="mb-4">
              Add Sample Data
            </Typography>

            <Typography variant="body" color="muted" className="mb-6">
              This will add sample assets, liabilities, goals, transactions, and insights to your account for testing
              purposes.
            </Typography>

            {result && (
              <div
                className={`p-4 rounded-lg mb-6 ${
                  result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center justify-center">
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  )}
                  <Typography
                    variant="body"
                    className={result.success ? "text-green-700" : "text-red-700"}
                    weight="medium"
                  >
                    {result.success ? "Sample data added successfully!" : "Failed to add sample data"}
                  </Typography>
                </div>
                {result.error && (
                  <Typography variant="caption" className="text-red-600 mt-2">
                    {result.error.message}
                  </Typography>
                )}
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              onClick={handleAddSampleData}
              isLoading={loading}
              leftIcon={<Plus className="w-4 h-4" />}
              disabled={result?.success}
            >
              {result?.success ? "Sample Data Added" : "Add Sample Data"}
            </Button>

            <Typography variant="caption" color="muted" className="mt-4 block">
              Note: This will only work if you're logged in and have an active account.
            </Typography>
          </div>
        </InteractiveCard>
      </Container>
    </Section>
  )
}
