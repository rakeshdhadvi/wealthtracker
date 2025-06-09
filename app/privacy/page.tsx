"use client"

import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { FadeIn } from "@/components/ui-system/AnimatedElements"
import { Shield, Lock, Eye, Database, UserCheck, FileText } from "lucide-react"

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, phone)",
        "Financial data you choose to connect through broker integrations",
        "Usage data to improve our services and user experience",
        "Device information and IP addresses for security purposes",
        "Cookies and similar technologies for website functionality",
      ],
    },
    {
      icon: Shield,
      title: "How We Use Your Information",
      content: [
        "Provide and maintain our wealth tracking services",
        "Process transactions and send related notifications",
        "Improve our services and develop new features",
        "Communicate with you about your account and our services",
        "Comply with legal obligations and prevent fraud",
      ],
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "Bank-level 256-bit SSL encryption for all data transmission",
        "Multi-factor authentication to protect your account",
        "Regular security audits and penetration testing",
        "Data stored in secure, SOC 2 compliant data centers",
        "Employee access controls and background checks",
      ],
    },
    {
      icon: Eye,
      title: "Information Sharing",
      content: [
        "We never sell your personal information to third parties",
        "Data shared with broker APIs only with your explicit consent",
        "Service providers bound by strict confidentiality agreements",
        "Legal disclosures only when required by law",
        "Anonymous, aggregated data for research and analytics",
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access and download your personal data at any time",
        "Correct or update your information through your account",
        "Delete your account and associated data",
        "Opt-out of marketing communications",
        "Data portability to other services",
      ],
    },
    {
      icon: FileText,
      title: "Data Retention",
      content: [
        "Account data retained while your account is active",
        "Financial data deleted within 30 days of account closure",
        "Legal compliance data retained as required by law",
        "Anonymous analytics data may be retained indefinitely",
        "Backup data securely deleted within 90 days",
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
                Privacy Policy
                <span className="gradient-text block">Your Data, Your Control</span>
              </Typography>
              <Typography variant="body" color="secondary" className="mb-8 text-xl">
                We're committed to protecting your privacy and being transparent about how we handle your data.
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

      {/* Privacy Sections */}
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

      {/* Contact Section */}
      <Section padding="xl" background="gray">
        <Container>
          <FadeIn>
            <InteractiveCard className="p-8 text-center">
              <Typography variant="h3" weight="bold" className="mb-4">
                Questions About Privacy?
              </Typography>
              <Typography variant="body" color="secondary" className="mb-6">
                If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to
                contact us.
              </Typography>
              <div className="space-y-2">
                <Typography variant="body" weight="medium">
                  Email: privacy@wealthtracker.in
                </Typography>
                <Typography variant="body" weight="medium">
                  Phone: +91 888-888-8888
                </Typography>
              </div>
            </InteractiveCard>
          </FadeIn>
        </Container>
      </Section>
    </div>
  )
}
