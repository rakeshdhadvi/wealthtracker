"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState } from "react"
import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui-system/AnimatedElements"
import { motion } from "framer-motion"
import {
  TrendingUp,
  Shield,
  Zap,
  Target,
  PieChart,
  BarChart3,
  Calculator,
  Globe,
  Lock,
  Users,
  TrendingDown,
  Home,
} from "lucide-react"

const featureCategories = [
  {
    title: "Investment Tracking",
    description: "Comprehensive portfolio management across all asset classes",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    features: [
      {
        name: "Multi-Asset Portfolio",
        description: "Track stocks, mutual funds, ETFs, bonds, real estate, gold, crypto, and more",
        icon: PieChart,
      },
      {
        name: "Real-time Data",
        description: "Live market data from NSE, BSE, and mutual fund companies",
        icon: Zap,
      },
      {
        name: "Performance Analytics",
        description: "Detailed performance metrics, returns analysis, and benchmarking",
        icon: BarChart3,
      },
      {
        name: "Broker Integration",
        description: "Connect with Zerodha, Groww, HDFC Securities, and other major brokers",
        icon: Globe,
      },
    ],
  },
  {
    title: "Liability Management",
    description: "Complete debt and loan tracking for better financial health",
    icon: TrendingDown,
    color: "from-red-500 to-pink-500",
    features: [
      {
        name: "Loan Tracking",
        description: "Track home loans, car loans, personal loans, education loans, and more",
        icon: Home,
      },
      {
        name: "EMI Management",
        description: "Monitor monthly payments, due dates, and payment schedules",
        icon: Calendar,
      },
      {
        name: "Interest Optimization",
        description: "Analyze interest rates and get refinancing recommendations",
        icon: Calculator,
      },
      {
        name: "Debt-to-Income Ratio",
        description: "Track your financial health with key debt metrics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Goal Planning",
    description: "Smart financial goal setting and progress tracking",
    icon: Target,
    color: "from-green-500 to-emerald-500",
    features: [
      {
        name: "Smart Goal Templates",
        description: "Pre-built templates for house, car, education, retirement, and more",
        icon: Target,
      },
      {
        name: "Progress Tracking",
        description: "Visual progress indicators and milestone celebrations",
        icon: TrendingUp,
      },
      {
        name: "Savings Calculator",
        description: "Automatic calculation of monthly savings required",
        icon: Calculator,
      },
      {
        name: "Goal Insights",
        description: "AI-powered recommendations to achieve goals faster",
        icon: Zap,
      },
    ],
  },
  {
    title: "Security & Privacy",
    description: "Bank-grade security to protect your financial data",
    icon: Shield,
    color: "from-purple-500 to-indigo-500",
    features: [
      {
        name: "256-bit Encryption",
        description: "Military-grade encryption for all data transmission and storage",
        icon: Lock,
      },
      {
        name: "Read-only Access",
        description: "We can view your data but never make transactions on your behalf",
        icon: Shield,
      },
      {
        name: "SOC 2 Certified",
        description: "Independently audited security controls and compliance",
        icon: Users,
      },
      {
        name: "No Password Storage",
        description: "We never store your broker passwords or sensitive credentials",
        icon: Lock,
      },
    ],
  },
]

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState(0)
  const ActiveIcon = featureCategories[activeCategory].icon;

  return (
    <div className="relative">
      <FloatingElements />

      {/* Hero Section */}
      <Section
        padding="xl"
        className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      >
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <Typography variant="h1" weight="black" className="mb-6">
                <span className="gradient-text">Everything You Need</span> <br />
                to Manage Your Finances
              </Typography>
              <Typography variant="body" color="secondary" className="text-xl max-w-3xl mx-auto">
                WealthTracker provides comprehensive tools to track investments, manage liabilities, plan goals, and
                optimize your financial health - all in one beautiful dashboard.
              </Typography>
            </div>
          </FadeIn>

          {/* Feature Categories */}
          <StaggerContainer>
            <div className="grid lg:grid-cols-4 gap-6 mb-16">
              {featureCategories.map((category, index) => (
                <StaggerItem key={index}>
                  <motion.button
                    onClick={() => setActiveCategory(index)}
                    className={`w-full p-6 rounded-2xl text-left transition-all duration-300 ${
                      activeCategory === index
                        ? "bg-white dark:bg-slate-800 shadow-xl border-2 border-blue-200 dark:border-blue-700"
                        : "bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border-2 border-transparent"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}
                    >
                      <ActiveIcon className="w-6 h-6 text-white" />
                    </div>
                    <Typography variant="h4" weight="bold" className="mb-2">
                      {category.title}
                    </Typography>
                    <Typography variant="body" color="secondary" className="text-sm">
                      {category.description}
                    </Typography>
                  </motion.button>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Active Category Details */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InteractiveCard className="p-8">
              <div className="flex items-center space-x-4 mb-8">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${featureCategories[activeCategory].color} flex items-center justify-center`}
                >
                  <ActiveIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <Typography variant="h2" weight="bold">
                    {featureCategories[activeCategory].title}
                  </Typography>
                  <Typography variant="body" color="secondary">
                    {featureCategories[activeCategory].description}
                  </Typography>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {featureCategories[activeCategory].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div>
                      <Typography variant="h5" weight="bold" className="mb-1">
                        {feature.name}
                      </Typography>
                      <Typography variant="body" color="secondary" className="text-sm">
                        {feature.description}
                      </Typography>
                    </div>
                  </motion.div>
                ))}
              </div>
            </InteractiveCard>
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <Container>
          <div className="text-center">
            <Typography variant="h2" weight="bold" className="mb-6 text-white">
              Ready to Take Control of Your Finances?
            </Typography>
            <Typography variant="body" className="mb-8 text-blue-100 text-lg max-w-2xl mx-auto">
              Join thousands of users who are already using WealthTracker to manage their investments, track
              liabilities, and achieve their financial goals.
            </Typography>
            <Button variant="primary" size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              Get Started Free
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  )
}
