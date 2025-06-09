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
  Check,
  X,
  Star,
  Crown,
  Shield,
  TrendingUp,
  BarChart3,
  Brain,
  Smartphone,
  HeadphonesIcon,
  Globe,
} from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started with basic portfolio tracking",
      price: { monthly: 0, yearly: 0 },
      icon: Shield,
      color: "from-gray-500 to-gray-600",
      features: [
        "Track up to 10 investments",
        "Basic portfolio overview",
        "Manual transaction entry",
        "Basic charts and graphs",
        "Email support",
      ],
      limitations: ["No broker integrations", "No AI insights", "No tax optimization", "No goal planning"],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      description: "Advanced features for serious investors",
      price: { monthly: 499, yearly: 4990 },
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Unlimited investments tracking",
        "Connect 3 broker accounts",
        "Advanced analytics & insights",
        "Goal planning & tracking",
        "Tax optimization suggestions",
        "Real-time market data",
        "Priority email support",
        "Mobile app access",
      ],
      limitations: ["No AI-powered recommendations", "No custom reports"],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Premium",
      description: "Complete wealth management solution with AI",
      price: { monthly: 999, yearly: 9990 },
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      features: [
        "Everything in Pro",
        "Unlimited broker connections",
        "AI-powered recommendations",
        "Custom portfolio reports",
        "Advanced tax planning",
        "Dedicated relationship manager",
        "Phone & chat support",
        "API access for developers",
        "White-label solutions",
      ],
      limitations: [],
      cta: "Go Premium",
      popular: false,
    },
  ]

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into your portfolio performance with detailed charts and metrics",
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get personalized recommendations based on your financial goals and risk profile",
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Track your investments on the go with our native mobile applications",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your data is protected with 256-bit encryption and multi-factor authentication",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Get help when you need it with our dedicated customer support team",
    },
    {
      icon: Globe,
      title: "Multi-Asset Support",
      description: "Track stocks, mutual funds, FDs, gold, crypto, and international investments",
    },
  ]

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "Is my financial data secure?",
      answer:
        "Absolutely. We use bank-level 256-bit encryption and never store your broker passwords. Your data is completely secure.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.",
    },
    {
      question: "Can I connect multiple broker accounts?",
      answer: "Yes, Pro plan allows 3 broker connections and Premium plan allows unlimited connections.",
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
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>Trusted by 50,000+ Indian Investors</span>
                </div>
              </motion.div>

              <Typography variant="h1" weight="black" className="mb-6">
                Choose the Perfect Plan for Your
                <span className="gradient-text block">Financial Journey</span>
              </Typography>

              <Typography variant="body" color="secondary" className="mb-8 text-xl">
                Start free and upgrade as you grow. All plans include our core portfolio tracking features.
              </Typography>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-12">
                <span
                  className={`text-sm font-medium ${billingCycle === "monthly" ? "text-blue-600 dark:text-blue-400" : "text-gray-500"}`}
                >
                  Monthly
                </span>
                <motion.button
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    billingCycle === "yearly" ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ x: billingCycle === "yearly" ? 28 : 4 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
                <span
                  className={`text-sm font-medium ${billingCycle === "yearly" ? "text-blue-600 dark:text-blue-400" : "text-gray-500"}`}
                >
                  Yearly
                </span>
                {billingCycle === "yearly" && (
                  <motion.span
                    className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full text-xs font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    Save 17%
                  </motion.span>
                )}
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Pricing Cards */}
      <Section padding="lg" background="gray">
        <Container>
          <StaggerContainer>
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <StaggerItem key={plan.name}>
                  <motion.div
                    className={`relative ${plan.popular ? "scale-105" : ""}`}
                    whileHover={{ scale: plan.popular ? 1.08 : 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    {plan.popular && (
                      <motion.div
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        Most Popular
                      </motion.div>
                    )}

                    <InteractiveCard
                      className={`p-8 h-full ${plan.popular ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""}`}
                    >
                      <div className="text-center mb-8">
                        <motion.div
                          className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          <plan.icon className="w-8 h-8 text-white" />
                        </motion.div>

                        <Typography variant="h3" weight="bold" className="mb-2">
                          {plan.name}
                        </Typography>

                        <Typography variant="body" color="secondary" className="mb-6">
                          {plan.description}
                        </Typography>

                        <div className="mb-6">
                          <span className="text-4xl font-bold">₹{plan.price[billingCycle].toLocaleString()}</span>
                          {plan.price[billingCycle] > 0 && (
                            <span className="text-gray-500 dark:text-gray-400">
                              /{billingCycle === "monthly" ? "month" : "year"}
                            </span>
                          )}
                        </div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link href={plan.name === "Free" ? "/signup" : "/signup"}>
                            <Button variant={plan.popular ? "primary" : "outline"} size="lg" className="w-full">
                              {plan.cta}
                            </Button>
                          </Link>
                        </motion.div>
                      </div>

                      <div className="space-y-4">
                        <Typography variant="h6" weight="bold" className="text-green-600 dark:text-green-400">
                          What's included:
                        </Typography>
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <Typography variant="body" className="text-sm">
                              {feature}
                            </Typography>
                          </div>
                        ))}

                        {plan.limitations.length > 0 && (
                          <>
                            <Typography variant="h6" weight="bold" className="text-gray-500 dark:text-gray-400 mt-6">
                              Not included:
                            </Typography>
                            {plan.limitations.map((limitation, idx) => (
                              <div key={idx} className="flex items-start space-x-3">
                                <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                <Typography variant="body" color="secondary" className="text-sm">
                                  {limitation}
                                </Typography>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </InteractiveCard>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Features Section */}
      <Section padding="xl" background="white">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <Typography variant="h2" weight="bold" className="mb-4">
                Why Choose WealthTracker?
              </Typography>
              <Typography variant="body" color="secondary" className="max-w-3xl mx-auto">
                Built specifically for Indian investors with features that matter most to your financial success.
              </Typography>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <StaggerItem key={index}>
                  <InteractiveCard className="p-6 text-center h-full">
                    <motion.div
                      className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <Typography variant="h5" weight="bold" className="mb-2">
                      {feature.title}
                    </Typography>
                    <Typography variant="body" color="secondary">
                      {feature.description}
                    </Typography>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section padding="xl" background="gray">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <Typography variant="h2" weight="bold" className="mb-4">
                Frequently Asked Questions
              </Typography>
              <Typography variant="body" color="secondary">
                Got questions? We've got answers.
              </Typography>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <StaggerItem key={index}>
                  <InteractiveCard className="p-6">
                    <Typography variant="h5" weight="bold" className="mb-3">
                      {faq.question}
                    </Typography>
                    <Typography variant="body" color="secondary">
                      {faq.answer}
                    </Typography>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <Container>
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <Typography variant="h2" weight="bold" className="mb-6 text-white">
                Ready to Start Your Financial Journey?
              </Typography>
              <Typography variant="body" className="mb-8 text-blue-100 text-lg">
                Join thousands of Indian investors who trust WealthTracker to manage their finances.
              </Typography>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup">
                  <Button variant="primary" size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                    Start Free Today
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                className="mt-8 text-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p>No credit card required • 30-day money-back guarantee • Cancel anytime</p>
              </motion.div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </div>
  )
}
