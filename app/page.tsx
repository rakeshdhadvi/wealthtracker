"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useStore } from "@/stores/useStore"
import { dashboardService } from "@/services/api"
import { supabase } from "@/lib/supabase"
import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { NetWorthCard } from "@/components/dashboard/NetWorthCard"
import { AssetAllocationChart } from "@/components/dashboard/AssetAllocationChart"
import { RecentTransactions } from "@/components/dashboard/RecentTransactions"
import { UpcomingDues } from "@/components/dashboard/UpcomingDues"
import { InsightsPanel } from "@/components/dashboard/InsightsPanel"
import { GoalsProgress } from "@/components/dashboard/GoalsProgress"
import { PerformanceChart } from "@/components/dashboard/PerformanceChart"
import { StockWatchlist } from "@/components/dashboard/StockWatchlist"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui-system/AnimatedElements"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LoadingScreen } from "@/components/ui/loading-screen"

export default function Dashboard() {
  const { user, profile, loading: authLoading } = useAuth()
  const { dashboardData, setDashboardData } = useStore()
  const [isHandlingAuth, setIsHandlingAuth] = useState(false)
  const router = useRouter()

  // Handle auth callback from email confirmation
  useEffect(() => {
    const handleAuthCallback = async () => {
      // Check if we have auth tokens in the URL hash
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get("access_token")
      const refreshToken = hashParams.get("refresh_token")

      if (accessToken && refreshToken) {
        console.log("Auth tokens found in URL, handling callback...")
        setIsHandlingAuth(true)

        try {
          // Set the session with the tokens
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })

          if (error) {
            console.error("Error setting session:", error)
          } else if (data.session) {
            console.log("Session set successfully:", data.session.user.email)
            // Clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname)
            // Redirect to auth callback page for better UX
            router.push("/auth/callback")
            return
          }
        } catch (err) {
          console.error("Auth callback error:", err)
        } finally {
          setIsHandlingAuth(false)
        }
      }
    }

    handleAuthCallback()
  }, [router])

  useEffect(() => {
    if (user && !authLoading && !isHandlingAuth) {
      loadDashboardData()
    }
  }, [user, authLoading, isHandlingAuth])

  const loadDashboardData = async () => {
    try {
      const data = await dashboardService.getDashboardData()
      setDashboardData(data)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    }
  }

  if (authLoading || isHandlingAuth || (user && !dashboardData)) {
    return <LoadingScreen />
  }

  if (!user) {
    return (
      <div className="relative">
        <FloatingElements />
        <AnimatedBackground />

        {/* Hero Section */}
        <Section
          padding="xl"
          className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/20 dark:via-background dark:to-indigo-950/20"
        >
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="text-center lg:text-left relative z-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6 border border-blue-200 dark:border-blue-700"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>#1 Finance App for Indian Investors</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Typography variant="h1" weight="black" className="mb-6 text-4xl md:text-5xl lg:text-6xl">
                    <span className="gradient-text animate-shimmer">Track All Your Investments</span> <br />
                    <motion.span
                      className="inline-block"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      style={{
                        background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6)",
                        backgroundSize: "200% 100%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      in One Dashboard
                    </motion.span>
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Typography variant="body" color="secondary" className="mb-8 text-xl">
                    WealthTracker helps you monitor stocks, mutual funds, FDs, gold, crypto, and more - all in one
                    place. Built specifically for Indian investors.
                  </Typography>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/signup">
                      <Button variant="primary" size="lg" className="btn-interactive group">
                        <span className="flex items-center">
                          Get Started Free
                          <motion.div
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </span>
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" className="hover-glow">
                      See How It Works
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="hidden lg:block relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt="WealthTracker Dashboard"
                    className="w-full h-auto rounded-2xl shadow-2xl hover-lift"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* Features Section */}
        <Section padding="xl" background="white">
          <Container>
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h2" weight="bold" className="mb-4">
                Everything You Need to Manage Your Finances
              </Typography>
              <Typography variant="body" color="secondary" className="max-w-3xl mx-auto">
                WealthTracker brings all your financial data together in one beautiful dashboard, giving you complete
                visibility and control over your money.
              </Typography>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Complete Portfolio Tracking",
                  description:
                    "Track stocks, mutual funds, FDs, PPF, gold, crypto, real estate and more in one unified dashboard.",
                  icon: TrendingUp,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Broker Integrations",
                  description:
                    "Automatically import your investments from Zerodha, Groww, Upstox and other popular brokers.",
                  icon: Zap,
                  color: "from-green-500 to-emerald-500",
                },
                {
                  title: "Smart Insights",
                  description:
                    "Get AI-powered recommendations to optimize your portfolio and improve your financial health.",
                  icon: Sparkles,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  title: "Goal Planning",
                  description: "Set financial goals and track your progress with personalized recommendations.",
                  icon: "🎯",
                  color: "from-orange-500 to-red-500",
                },
                {
                  title: "Tax Optimization",
                  description:
                    "Understand tax implications of your investments and get suggestions to minimize your tax burden.",
                  icon: "💰",
                  color: "from-yellow-500 to-orange-500",
                },
                {
                  title: "Bank-Level Security",
                  description:
                    "Your data is protected with 256-bit encryption and we never store your broker passwords.",
                  icon: Shield,
                  color: "from-indigo-500 to-purple-500",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <InteractiveCard className="h-full p-6 hover-lift">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      {typeof feature.icon === "string" ? (
                        <span className="text-2xl">{feature.icon}</span>
                      ) : (
                        <feature.icon className="w-6 h-6 text-white" />
                      )}
                    </motion.div>
                    <Typography variant="h4" weight="bold" className="mb-2">
                      {feature.title}
                    </Typography>
                    <Typography variant="body" color="muted">
                      {feature.description}
                    </Typography>
                  </InteractiveCard>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section
          padding="xl"
          className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>

          <Container>
            <motion.div
              className="text-center max-w-3xl mx-auto relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h2" weight="bold" className="mb-6 text-white">
                Ready to Take Control of Your Financial Future?
              </Typography>
              <Typography variant="body" className="mb-8 text-blue-100 text-lg">
                Join thousands of Indian investors who are already using WealthTracker to manage their finances and make
                better investment decisions.
              </Typography>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-blue-50 btn-interactive"
                  >
                    Create Your Free Account
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                className="mt-8 text-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p>No credit card required • Free plan available • Cancel anytime</p>
              </motion.div>
            </motion.div>
          </Container>
        </Section>
      </div>
    )
  }

  return (
    <div className="relative">
      <FloatingElements />

      <Section padding="lg" background="gray">
        <Container>
          <FadeIn>
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Typography variant="h2" weight="bold" className="mb-2">
                    Welcome back, {profile?.full_name || "User"}!
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ rotate: [0, 20, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                    >
                      👋
                    </motion.span>
                  </Typography>
                </motion.div>
                <Typography variant="body" color="secondary">
                  Here's your financial overview for today
                </Typography>
              </div>
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<ArrowRight className="w-4 h-4" />}
                    className="hover-glow"
                  >
                    Add Transaction
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/brokers">
                    <Button variant="primary" size="sm" className="btn-interactive">
                      Connect Broker
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="space-y-8">
            {/* Net Worth Overview */}
            <StaggerItem>
              <NetWorthCard
                netWorth={dashboardData.netWorth}
                totalAssets={dashboardData.totalAssets}
                totalLiabilities={dashboardData.totalLiabilities}
                monthlyChange={2.3}
              />
            </StaggerItem>

            {/* Performance Chart */}
            <StaggerItem>
              <PerformanceChart />
            </StaggerItem>

            {/* Main Dashboard Grid */}
            <StaggerItem>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  <AssetAllocationChart allocation={dashboardData.assetAllocation} />
                  <StockWatchlist />
                  <RecentTransactions transactions={dashboardData.recentTransactions} />
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <UpcomingDues dues={dashboardData.upcomingDues} />
                  <InsightsPanel insights={dashboardData.insights} />
                </div>
              </div>
            </StaggerItem>

            {/* Goals Section */}
            <StaggerItem>
              <GoalsProgress
                goals={dashboardData.goals}
                onAddGoal={() => {
                  console.log("Add goal clicked")
                }}
              />
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </Section>
    </div>
  )
}
