"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    // Optionally log the error to an error reporting service
    // console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <Typography variant="h2" weight="bold" className="mb-4">
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body" color="secondary" className="mb-6">
        We couldn't load your dashboard. Please try refreshing the page or go back to the home page.
      </Typography>
      <div className="flex gap-4 justify-center">
        <Button variant="primary" onClick={() => reset()}>Try Again</Button>
        <Button variant="outline" onClick={() => router.push("/")}>Go Home</Button>
      </div>
    </div>
  )
} 