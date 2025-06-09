"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/useAuth"
import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { Input } from "@/components/ui-system/Input"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    if (!formData.fullName.trim()) {
      setError("Please enter your full name")
      setLoading(false)
      return
    }

    try {
      console.log("Starting signup process...")

      const { data, error } = await signUp(formData.email, formData.password, {
        fullName: formData.fullName,
      })

      if (error) {
        console.error("Signup error:", error)
        setError(error.message)
      } else if (data.user) {
        console.log("Signup successful:", data.user.email)

        // Check if email confirmation is required
        if (data.user && !data.session) {
          setSuccess(true)
          setError("")
        } else {
          // User is automatically signed in
          router.push("/dashboard")
        }
      }
    } catch (err: any) {
      console.error("Signup exception:", err)
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (success) {
    return (
      <div className="relative min-h-screen">
        <FloatingElements />
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
                  Check Your Email!
                </Typography>

                <Typography variant="body" color="muted" className="mb-6">
                  We've sent a confirmation email to <strong>{formData.email}</strong>. Please click the link in the
                  email to verify your account.
                </Typography>

                <div className="space-y-4">
                  <Typography variant="caption" color="muted">
                    Didn't receive the email? Check your spam folder or{" "}
                    <button
                      onClick={() => {
                        setSuccess(false)
                        setFormData({ fullName: "", email: "", password: "", confirmPassword: "" })
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      try again
                    </button>
                  </Typography>

                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </InteractiveCard>
            </motion.div>
          </Container>
        </Section>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <FloatingElements />

      <Section padding="xl" className="flex items-center justify-center min-h-screen">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <Typography variant="h2" weight="bold" className="mb-4">
              Create Your Account
            </Typography>
            <Typography variant="body" color="muted">
              Start tracking your wealth today
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <InteractiveCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <Typography variant="caption" className="text-red-700">
                      {error}
                    </Typography>
                  </motion.div>
                )}

                <div>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    leftIcon={<User className="w-4 h-4" />}
                    required
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    leftIcon={<Mail className="w-4 h-4" />}
                    required
                  />
                </div>

                <div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password (min 6 characters)"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    leftIcon={<Lock className="w-4 h-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    leftIcon={<Lock className="w-4 h-4" />}
                    required
                    minLength={6}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={loading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Create Account
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Typography variant="caption" color="muted">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign in
                  </Link>
                </Typography>
              </div>
            </InteractiveCard>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
