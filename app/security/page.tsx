"use client"

import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui-system/AnimatedElements"
import { motion } from "framer-motion"
import { Shield, Lock, Eye, Server, UserCheck, AlertTriangle, CheckCircle, Key, Database, Globe } from "lucide-react"

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "256-bit SSL Encryption",
      description: "All data transmission is protected with bank-level encryption",
      status: "Active",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Key,
      title: "Multi-Factor Authentication",
      description: "Additional security layer with SMS and authenticator app support",
      status: "Available",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Database,
      title: "Encrypted Data Storage",
      description: "All sensitive data is encrypted at rest using AES-256",
      status: "Active",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Server,
      title: "SOC 2 Compliant Infrastructure",
      description: "Our servers meet the highest security and availability standards",
      status: "Certified",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Eye,
      title: "Regular Security Audits",
      description: "Third-party security assessments and penetration testing",
      status: "Quarterly",
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: UserCheck,
      title: "Access Controls",
      description: "Strict employee access controls and background checks",
      status: "Enforced",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Security, availability, and confidentiality controls",
      status: "Certified",
    },
    {
      name: "ISO 27001",
      description: "Information security management system",
      status: "In Progress",
    },
    {
      name: "PCI DSS",
      description: "Payment card industry data security standard",
      status: "Compliant",
    },
  ]

  const bestPractices = [
    "Use a strong, unique password for your WealthTracker account",
    "Enable two-factor authentication for additional security",
    "Regularly review your account activity and connected brokers",
    "Never share your login credentials with anyone",
    "Log out of shared or public computers",
    "Keep your mobile app updated to the latest version",
    "Report any suspicious activity immediately",
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
                Security & Trust
                <span className="gradient-text block">Your Data is Safe</span>
              </Typography>
              <Typography variant="body" color="secondary" className="mb-8 text-xl">
                We implement industry-leading security measures to protect your financial data and ensure your privacy
                is maintained at all times.
              </Typography>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  <Typography variant="body" className="text-green-800 dark:text-green-200 font-medium">
                    Bank-Level Security
                  </Typography>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <Typography variant="body" className="text-blue-800 dark:text-blue-200 font-medium">
                    SOC 2 Certified
                  </Typography>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Security Features */}
      <Section padding="xl" background="white">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <Typography variant="h2" weight="bold" className="mb-4">
                Security Features
              </Typography>
              <Typography variant="body" color="secondary">
                Multiple layers of protection for your financial data
              </Typography>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <StaggerItem key={index}>
                  <InteractiveCard className="p-6 h-full">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <Typography variant="h5" weight="bold" className="mb-3">
                      {feature.title}
                    </Typography>
                    <Typography variant="body" color="secondary" className="mb-4">
                      {feature.description}
                    </Typography>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <Typography variant="body" className="text-green-600 dark:text-green-400 text-sm font-medium">
                        {feature.status}
                      </Typography>
                    </div>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Certifications */}
      <Section padding="xl" background="gray">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <FadeIn>
              <div>
                <Typography variant="h2" weight="bold" className="mb-6">
                  Certifications & Compliance
                </Typography>
                <Typography variant="body" color="secondary" className="mb-8">
                  We maintain the highest industry standards and undergo regular audits to ensure your data is protected
                  according to global best practices.
                </Typography>

                <div className="space-y-6">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <InteractiveCard className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Typography variant="h6" weight="bold" className="mb-1">
                              {cert.name}
                            </Typography>
                            <Typography variant="body" color="secondary" className="text-sm">
                              {cert.description}
                            </Typography>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              cert.status === "Certified" || cert.status === "Compliant"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200"
                            }`}
                          >
                            {cert.status}
                          </div>
                        </div>
                      </InteractiveCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <InteractiveCard className="p-8">
                <Typography variant="h3" weight="bold" className="mb-6">
                  Security Best Practices
                </Typography>
                <Typography variant="body" color="secondary" className="mb-6">
                  Follow these recommendations to keep your account secure:
                </Typography>

                <ul className="space-y-4">
                  {bestPractices.map((practice, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <Typography variant="body" color="secondary">
                        {practice}
                      </Typography>
                    </motion.li>
                  ))}
                </ul>
              </InteractiveCard>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Incident Response */}
      <Section padding="xl" background="white">
        <Container>
          <FadeIn>
            <InteractiveCard className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                    <Typography variant="h3" weight="bold">
                      Incident Response
                    </Typography>
                  </div>
                  <Typography variant="body" color="secondary" className="mb-6">
                    In the unlikely event of a security incident, we have a comprehensive response plan to protect your
                    data and keep you informed.
                  </Typography>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <Typography variant="body" color="secondary">
                        24/7 security monitoring and alerting
                      </Typography>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <Typography variant="body" color="secondary">
                        Immediate containment and investigation
                      </Typography>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <Typography variant="body" color="secondary">
                        Transparent communication with affected users
                      </Typography>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <Typography variant="body" color="secondary">
                        Post-incident analysis and improvements
                      </Typography>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <motion.div
                    className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Globe className="w-16 h-16 text-white" />
                  </motion.div>
                  <Typography variant="h5" weight="bold" className="mb-2">
                    99.9% Uptime
                  </Typography>
                  <Typography variant="body" color="secondary">
                    Reliable and secure infrastructure
                  </Typography>
                </div>
              </div>
            </InteractiveCard>
          </FadeIn>
        </Container>
      </Section>

      {/* Contact Security Team */}
      <Section padding="xl" background="gray">
        <Container>
          <FadeIn>
            <InteractiveCard className="p-8 text-center">
              <Typography variant="h3" weight="bold" className="mb-4">
                Security Concerns?
              </Typography>
              <Typography variant="body" color="secondary" className="mb-6">
                If you have any security concerns or questions, please contact our security team directly.
              </Typography>
              <div className="space-y-2">
                <Typography variant="body" weight="medium">
                  Email: security@wealthtracker.in
                </Typography>
                <Typography variant="body" weight="medium">
                  Phone: +91 888-888-8888 (24/7 Security Hotline)
                </Typography>
              </div>
            </InteractiveCard>
          </FadeIn>
        </Container>
      </Section>
    </div>
  )
}
