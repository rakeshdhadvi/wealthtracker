"use client"

import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { FadeIn } from "@/components/ui-system/AnimatedElements"
import { FileText, Users, Shield, CreditCard, AlertTriangle, Scale } from "lucide-react"

export default function TermsPage() {
  const sections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content: [
        "By accessing WealthTracker, you agree to be bound by these Terms of Service",
        "These terms apply to all users, including free and paid subscribers",
        "We may update these terms from time to time with notice to users",
        "Continued use after changes constitutes acceptance of new terms",
      ],
    },
    {
      icon: FileText,
      title: "Service Description",
      content: [
        "WealthTracker provides portfolio tracking and financial management tools",
        "We aggregate data from various financial institutions with your consent",
        "Our service includes analytics, reporting, and goal tracking features",
        "We do not provide investment advice or recommendations",
      ],
    },
    {
      icon: Shield,
      title: "User Responsibilities",
      content: [
        "Provide accurate and complete information when creating your account",
        "Maintain the security of your login credentials",
        "Use the service only for lawful purposes",
        "Not attempt to reverse engineer or hack our systems",
        "Comply with all applicable laws and regulations",
      ],
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: [
        "Subscription fees are billed in advance on a monthly or annual basis",
        "All fees are non-refundable except as required by law",
        "We may change pricing with 30 days notice to existing subscribers",
        "Failed payments may result in service suspension",
        "Taxes are your responsibility unless otherwise stated",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Limitations of Liability",
      content: [
        "WealthTracker is provided 'as is' without warranties of any kind",
        "We are not liable for investment losses or financial decisions",
        "Our liability is limited to the amount paid for our services",
        "We are not responsible for third-party service interruptions",
        "Users assume all risks associated with investment decisions",
      ],
    },
    {
      icon: Scale,
      title: "Termination",
      content: [
        "You may cancel your account at any time through your settings",
        "We may terminate accounts for violation of these terms",
        "Upon termination, your access to the service will cease",
        "We will delete your data within 30 days of account closure",
        "Some provisions of these terms survive termination",
      ],
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
                Terms of Service
                <span className="gradient-text block">Clear & Fair Terms</span>
              </Typography>
              <Typography variant="body" color="secondary" className="mb-8 text-xl">
                These terms govern your use of WealthTracker. We've written them in plain English to make them as clear
                as possible.
              </Typography>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg inline-block">
                <Typography variant="body" className="text-blue-800 dark:text-blue-200">
                  Last updated: December 2024
                </Typography>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Terms Sections */}
      <Section padding="xl" background="white">
        <Container>
          <div className="space-y-12">
            {sections.map((section, index) => (
              <FadeIn key={index}>
                <InteractiveCard className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Typography variant="h3" weight="bold" className="mb-4">
                        {section.title}
                      </Typography>
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <Typography variant="body" color="secondary">
                              {item}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </InteractiveCard>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Important Notice */}
      <Section padding="xl" background="gray">
        <Container>
          <FadeIn>
            <InteractiveCard className="p-8">
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 mx-auto text-orange-500 mb-4" />
                <Typography variant="h3" weight="bold" className="mb-4">
                  Important Disclaimer
                </Typography>
                <Typography variant="body" color="secondary" className="mb-6 max-w-3xl mx-auto">
                  WealthTracker is a portfolio tracking tool and does not provide investment advice. All investment
                  decisions are your responsibility. Past performance does not guarantee future results. Please consult
                  with a qualified financial advisor before making investment decisions.
                </Typography>
                <div className="space-y-2">
                  <Typography variant="body" weight="medium">
                    Questions? Contact us at legal@wealthtracker.in
                  </Typography>
                </div>
              </div>
            </InteractiveCard>
          </FadeIn>
        </Container>
      </Section>
    </div>
  )
}
