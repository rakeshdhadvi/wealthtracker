"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function AuthCallbackPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log("Handling auth callback...")

        // Get the session from the URL hash
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          setError(error.message)
          setLoading(false)
          return
        }

        if (data.session) {
          console.log("Session found, user authenticated:", data.session.user.email)
          setSuccess(true)
          setLoading(false)

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000)
        } else {
          console.log("No session found")
          setError("No session found. Please try signing in again.")
          setLoading(false)
        }
      } catch (err: any) {
        console.error("Auth callback exception:", err)
        setError(err.message || "An unexpected error occurred")
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [router])

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <Section padding="xl" className="flex items-center justify-center min-h-screen">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <InteractiveCard className="p-8 text-center">
              <motion.div
                className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AlertCircle className="w-8 h-8 text-red-600" />
              </motion.div>

              <Typography variant="h3" weight="bold" className="mb-4">
                Authentication Error
              </Typography>

              <Typography variant="body" color="muted" className="mb-6">
                {error}
              </Typography>

              <div className="space-y-3">
                <Button variant="primary" onClick={() => router.push("/login")}>
                  Go to Login
                </Button>
                <Button variant="outline" onClick={() => router.push("/signup")}>
                  Sign Up Again
                </Button>
              </div>
            </InteractiveCard>
          </motion.div>
        </Container>
      </Section>
    )
  }

  if (success) {
    return (
      <Section padding="xl" className="flex items-center justify-center min-h-screen">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <InteractiveCard className="p-8 text-center">
              <motion.div
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>

              <Typography variant="h3" weight="bold" className="mb-4">
                Email Verified Successfully!
              </Typography>

              <Typography variant="body" color="muted" className="mb-6">
                Your account has been confirmed. Redirecting you to your dashboard...
              </Typography>

              <motion.div
                className="flex justify-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-blue-600 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </InteractiveCard>
          </motion.div>
        </Container>
      </Section>
    )
  }

  return null
}
