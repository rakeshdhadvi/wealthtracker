"use client"

import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui-system/AnimatedElements"
import { motion } from "framer-motion"
import { Users, Target, Award, Heart, TrendingUp, Globe } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { number: "50,000+", label: "Active Users" },
    { number: "₹500Cr+", label: "Assets Tracked" },
    { number: "15+", label: "Broker Integrations" },
    { number: "99.9%", label: "Uptime" },
  ]

  const values = [
    {
      icon: Users,
      title: "User-Centric",
      description: "Every feature is designed with our users' financial success in mind",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "We help you achieve your financial goals with smart planning and tracking",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from code to customer service",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      title: "Transparency",
      description: "Complete transparency in pricing, features, and data handling",
      color: "from-red-500 to-pink-500",
    },
  ]

  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Co-Founder",
      bio: "Former Goldman Sachs analyst with 10+ years in fintech",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Priya Sharma",
      role: "CTO & Co-Founder",
      bio: "Ex-Google engineer passionate about financial technology",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Amit Patel",
      role: "Head of Product",
      bio: "Product leader with expertise in user experience design",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Sneha Gupta",
      role: "Head of Engineering",
      bio: "Full-stack engineer with focus on scalable systems",
      image: "/placeholder.svg?height=300&width=300",
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
                Building the Future of
                <span className="gradient-text block">Wealth Management</span>
              </Typography>
              <Typography variant="body" color="secondary" className="mb-8 text-xl">
                We're on a mission to democratize wealth management for every Indian investor, making sophisticated
                financial tools accessible to everyone.
              </Typography>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section padding="lg" background="white">
        <Container>
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StaggerItem key={index}>
                  <div className="text-center">
                    <motion.div
                      className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {stat.number}
                    </motion.div>
                    <Typography variant="body" color="secondary">
                      {stat.label}
                    </Typography>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Story Section */}
      <Section padding="xl" background="gray">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <Typography variant="h2" weight="bold" className="mb-6">
                  Our Story
                </Typography>
                <Typography variant="body" color="secondary" className="mb-6">
                  WealthTracker was born out of frustration with the fragmented state of investment tracking in India.
                  Our founders, having worked at top financial institutions, realized that individual investors lacked
                  the tools that institutional investors take for granted.
                </Typography>
                <Typography variant="body" color="secondary" className="mb-6">
                  We started with a simple idea: what if every Indian investor could have access to professional-grade
                  portfolio management tools? What if tracking your entire financial life could be as simple as checking
                  your phone?
                </Typography>
                <Typography variant="body" color="secondary">
                  Today, we're proud to serve over 50,000 investors across India, helping them track over ₹500 crores in
                  assets and achieve their financial goals.
                </Typography>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl"
                  animate={{ rotate: [0, 1, 0] }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                />
                <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 m-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
                      <div className="text-2xl font-bold text-blue-600">2019</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Founded</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <Users className="w-8 h-8 text-green-600 mb-2" />
                      <div className="text-2xl font-bold text-green-600">50K+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Users</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <Globe className="w-8 h-8 text-purple-600 mb-2" />
                      <div className="text-2xl font-bold text-purple-600">15+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Integrations</div>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                      <Award className="w-8 h-8 text-orange-600 mb-2" />
                      <div className="text-2xl font-bold text-orange-600">₹500Cr+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Tracked</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section padding="xl" background="white">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <Typography variant="h2" weight="bold" className="mb-4">
                Our Values
              </Typography>
              <Typography variant="body" color="secondary" className="max-w-3xl mx-auto">
                These core values guide everything we do, from product development to customer service
              </Typography>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <StaggerItem key={index}>
                  <InteractiveCard className="p-6 text-center h-full">
                    <motion.div
                      className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <value.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <Typography variant="h5" weight="bold" className="mb-3">
                      {value.title}
                    </Typography>
                    <Typography variant="body" color="secondary">
                      {value.description}
                    </Typography>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Team Section */}
      <Section padding="xl" background="gray">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <Typography variant="h2" weight="bold" className="mb-4">
                Meet Our Team
              </Typography>
              <Typography variant="body" color="secondary" className="max-w-3xl mx-auto">
                We're a diverse team of engineers, designers, and financial experts united by our passion for
                democratizing wealth management
              </Typography>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <StaggerItem key={index}>
                  <InteractiveCard className="p-6 text-center">
                    <motion.div
                      className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </motion.div>
                    <Typography variant="h5" weight="bold" className="mb-1">
                      {member.name}
                    </Typography>
                    <Typography variant="body" color="primary" className="mb-3 font-medium">
                      {member.role}
                    </Typography>
                    <Typography variant="body" color="secondary" className="text-sm">
                      {member.bio}
                    </Typography>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>
    </div>
  )
}
