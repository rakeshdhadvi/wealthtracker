"use client"

import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui-system/AnimatedElements"
import { motion } from "framer-motion"
import {
  Brain,
  AlertTriangle,
  Target,
  Lightbulb,
  PieChart,
  BarChart3,
  ArrowRight,
  Star,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function DemoInsightsPage() {
  const insights = [
    {
      id: 1,
      type: "recommendation",
      title: "Diversify Your Portfolio",
      description:
        "Your portfolio is heavily weighted towards technology stocks (65%). Consider adding more sectors like healthcare and finance.",
      impact: "High",
      action: "Rebalance Portfolio",
      icon: PieChart,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      type: "opportunity",
      title: "Tax Saving Opportunity",
      description: "You can save ₹46,800 in taxes by investing ₹1.5L in ELSS funds before March 31st.",
      impact: "High",
      action: "Invest in ELSS",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      type: "alert",
      title: "Underperforming Asset",
      description: "Your ABC Mutual Fund has underperformed the benchmark by 3.2% over the last 6 months.",
      impact: "Medium",
      action: "Review Fund",
      icon: AlertTriangle,
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      type: "goal",
      title: "Emergency Fund Goal",
      description: "You're 78% towards your emergency fund goal. Consider increasing your monthly SIP by ₹5,000.",
      impact: "Medium",
      action: "Increase SIP",
      icon: Target,
      color: "from-purple-500 to-pink-500",
    },
  ]

  const aiRecommendations = [
    {
      title: "Optimal Asset Allocation",
      description: "Based on your risk profile and goals, we recommend 60% equity, 30% debt, 10% gold.",
      confidence: 92,
    },
    {
      title: "SIP Amount Optimization",
      description: "Increase your monthly SIP to ₹25,000 to reach your retirement goal by age 60.",
      confidence: 88,
    },
    {
      title: "Tax Optimization Strategy",
      description: "Switch to growth option in your ELSS funds to optimize long-term tax efficiency.",
      confidence: 85,
    },
  ]

  const marketInsights = [
    {
      title: "Market Outlook",
      description: "Indian markets are expected to remain volatile in Q1 2024 due to global uncertainties.",
      trend: "neutral",
    },
    {
      title: "Sector Focus",
      description: "Banking and IT sectors showing strong fundamentals for long-term growth.",
      trend: "positive",
    },
    {
      title: "Interest Rates",
      description: "RBI likely to maintain repo rate, favorable for debt fund investments.",
      trend: "positive",
    },
  ]

  return (
    <div className="relative">
      <FloatingElements />

      <Section padding="lg" background="gray">
        <Container>
          <FadeIn>
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Typography variant="h2" weight="bold" className="mb-2">
                  AI-Powered Insights
                </Typography>
                <Typography variant="body" color="secondary">
                  Personalized recommendations to optimize your financial portfolio
                </Typography>
              </div>
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" leftIcon={<Brain className="w-4 h-4" />} disabled>
                    Generate Report
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="primary" size="sm" leftIcon={<Zap className="w-4 h-4" />} disabled>
                    Get Premium Insights
                  </Button>
                </motion.div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="text-center py-12 border border-dashed rounded-lg bg-white/5 mb-8">
              <Typography variant="h4" weight="semibold" className="mb-2">
                Unlock Personalized Insights
              </Typography>
              <Typography variant="body" color="secondary" className="mb-6">
                Discover intelligent recommendations and market analysis to optimize your financial strategy. Sign up for tailored insights!
              </Typography>
              <div className="flex justify-center gap-4">
                <Link href="/signup"><Button variant="primary" size="lg">Get Started Free</Button></Link>
                <Link href="/login"><Button variant="outline" size="lg">Log In</Button></Link>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="space-y-8">
            {/* Key Insights */}
            <StaggerItem>
              <div className="grid md:grid-cols-2 gap-6">
                {insights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <InteractiveCard className="p-6 h-full">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${insight.color} flex items-center justify-center flex-shrink-0`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.8 }}
                        >
                          <insight.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Typography variant="h5" weight="bold">
                              {insight.title}
                            </Typography>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                insight.impact === "High"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                                  : insight.impact === "Medium"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                    : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              }`}
                            >
                              {insight.impact} Impact
                            </span>
                          </div>
                          <Typography variant="body" color="secondary" className="mb-4">
                            {insight.description}
                          </Typography>
                          <motion.div whileHover={{ x: 5 }}>
                            <Button variant="outline" size="sm" className="w-full" disabled>
                              {insight.action}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </InteractiveCard>
                  </motion.div>
                ))}
              </div>
            </StaggerItem>

            {/* AI Recommendations */}
            <StaggerItem>
              <InteractiveCard className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Brain className="w-5 h-5 text-white" />
                  </motion.div>
                  <Typography variant="h4" weight="bold">
                    AI Recommendations
                  </Typography>
                </div>
                <div className="text-center py-6 border border-dashed rounded-lg bg-white/5 mb-4">
                  <Typography variant="body" color="secondary">
                    AI recommendations are available when you connect your accounts.
                  </Typography>
                  <div className="mt-4">
                    <Link href="/signup"><Button variant="primary">Sign Up to Unlock Insights</Button></Link>
                  </div>
                </div>
              </InteractiveCard>
            </StaggerItem>

            {/* Market Insights */}
            <StaggerItem>
              <InteractiveCard className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <BarChart3 className="w-5 h-5 text-white" />
                  </motion.div>
                  <Typography variant="h4" weight="bold">
                    Market Insights
                  </Typography>
                </div>
                <div className="space-y-4">
                  {marketInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-white/5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <Typography variant="h5" weight="semibold" className="mb-1">
                            {insight.title}
                          </Typography>
                          <Typography variant="body" color="secondary">
                            {insight.description}
                          </Typography>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            insight.trend === "positive"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              : insight.trend === "negative"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                          }`}
                        >
                          {insight.trend === "positive" ? "Positive" : insight.trend === "negative" ? "Negative" : "Neutral"}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </InteractiveCard>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </Section>
    </div>
  )
} 