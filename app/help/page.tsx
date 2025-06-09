"use client"

import { useState } from "react"
import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui-system/AnimatedElements"
import { motion } from "framer-motion"
import {
  Search,
  BookOpen,
  MessageCircle,
  Video,
  Download,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Smartphone,
  CreditCard,
  Shield,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const helpCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of using WealthTracker",
      articles: 12,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Using WealthTracker on your mobile device",
      articles: 8,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: BarChart3,
      title: "Portfolio Tracking",
      description: "Track and analyze your investments",
      articles: 15,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: CreditCard,
      title: "Billing & Payments",
      description: "Subscription and payment questions",
      articles: 6,
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Keep your account safe and secure",
      articles: 9,
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: HelpCircle,
      title: "Troubleshooting",
      description: "Fix common issues and problems",
      articles: 11,
      color: "from-indigo-500 to-purple-500",
    },
  ]

  const faqs = [
    {
      question: "How do I connect my broker account?",
      answer:
        "Go to the 'Connect Brokers' page, select your broker from the list, and follow the secure authentication process. We use read-only access and never store your broker passwords.",
    },
    {
      question: "Is my financial data secure?",
      answer:
        "Yes, we use bank-level 256-bit encryption, multi-factor authentication, and store data in SOC 2 compliant data centers. We never sell your data to third parties.",
    },
    {
      question: "Can I track international investments?",
      answer:
        "Yes, WealthTracker supports tracking of international stocks, ETFs, and other investments. You can add them manually or through supported international brokers.",
    },
    {
      question: "How often is my portfolio data updated?",
      answer:
        "Portfolio data is updated in real-time during market hours. Broker integrations sync automatically every 4 hours, and you can manually refresh anytime.",
    },
    {
      question: "What happens if I cancel my subscription?",
      answer:
        "You can continue using the free plan with limited features. Your data is retained for 30 days, after which it's permanently deleted unless you reactivate.",
    },
    {
      question: "Do you provide investment advice?",
      answer:
        "No, WealthTracker is a portfolio tracking tool. We provide insights and analytics but not investment advice. Please consult a qualified financial advisor for investment decisions.",
    },
  ]

  const quickActions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      action: "Watch Videos",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Download,
      title: "User Guide",
      description: "Download comprehensive guide",
      action: "Download PDF",
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="relative">
      <FloatingElements />

      {/* Hero Section */}
      <Section
        padding="xl"
        className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20"
      >
        <Container>
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <Typography variant="h1" weight="black" className="mb-6">
                Help Center
                <span className="gradient-text block">We're Here to Help</span>
              </Typography>
              <Typography variant="body" color="secondary" className="mb-8 text-xl">
                Find answers to your questions, learn how to use WealthTracker, and get the most out of your financial
                tracking experience.
              </Typography>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-lg"
                />
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Quick Actions */}
      <Section padding="lg" background="white">
        <Container>
          <StaggerContainer>
            <div className="grid md:grid-cols-3 gap-8">
              {quickActions.map((action, index) => (
                <StaggerItem key={index}>
                  <InteractiveCard className="p-6 text-center h-full">
                    <motion.div
                      className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <action.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <Typography variant="h5" weight="bold" className="mb-3">
                      {action.title}
                    </Typography>
                    <Typography variant="body" color="secondary" className="mb-4">
                      {action.description}
                    </Typography>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm">
                        {action.action}
                      </Button>
                    </motion.div>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Help Categories */}
      <Section padding="xl" background="gray">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <Typography variant="h2" weight="bold" className="mb-4">
                Browse by Category
              </Typography>
              <Typography variant="body" color="secondary">
                Find help articles organized by topic
              </Typography>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {helpCategories.map((category, index) => (
                <StaggerItem key={index}>
                  <InteractiveCard className="p-6 h-full">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <Typography variant="h5" weight="bold" className="mb-3">
                      {category.title}
                    </Typography>
                    <Typography variant="body" color="secondary" className="mb-4">
                      {category.description}
                    </Typography>
                    <div className="flex items-center justify-between">
                      <Typography variant="body" className="text-sm text-blue-600 dark:text-blue-400">
                        {category.articles} articles
                      </Typography>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section padding="xl" background="white">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <Typography variant="h2" weight="bold" className="mb-4">
                Frequently Asked Questions
              </Typography>
              <Typography variant="body" color="secondary">
                Quick answers to common questions
              </Typography>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <InteractiveCard className="overflow-hidden">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <Typography variant="h6" weight="bold">
                      {faq.question}
                    </Typography>
                    <motion.div animate={{ rotate: expandedFaq === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedFaq === index ? "auto" : 0,
                      opacity: expandedFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <Typography variant="body" color="secondary">
                        {faq.answer}
                      </Typography>
                    </div>
                  </motion.div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact Support */}
      <Section padding="xl" background="gray">
        <Container>
          <FadeIn>
            <InteractiveCard className="p-8 text-center">
              <Typography variant="h3" weight="bold" className="mb-4">
                Still Need Help?
              </Typography>
              <Typography variant="body" color="secondary" className="mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/contact">
                    <Button variant="primary" size="lg">
                      Contact Support
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg">
                    Schedule a Call
                  </Button>
                </motion.div>
              </div>
            </InteractiveCard>
          </FadeIn>
        </Container>
      </Section>
    </div>
  )
}
