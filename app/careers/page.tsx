"use client"

import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui-system/AnimatedElements"
import { motion } from "framer-motion"
import {
  MapPin,
  Clock,
  Users,
  Heart,
  Zap,
  Target,
  Code,
  Palette,
  BarChart3,
  Shield,
  Headphones,
  Globe,
} from "lucide-react"

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "Mumbai / Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Build scalable fintech solutions using React, Node.js, and cloud technologies",
      skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Bangalore / Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Design intuitive user experiences for our wealth management platform",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    },
    {
      title: "Data Scientist",
      department: "Data",
      location: "Delhi / Remote",
      type: "Full-time",
      experience: "2+ years",
      description: "Develop AI models for investment insights and portfolio optimization",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Manage cloud infrastructure and deployment pipelines",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Mumbai",
      type: "Full-time",
      experience: "2+ years",
      description: "Help customers achieve their financial goals using our platform",
      skills: ["Customer Relations", "Financial Knowledge", "Communication"],
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Bangalore",
      type: "Full-time",
      experience: "3+ years",
      description: "Drive growth through digital marketing and content strategy",
      skills: ["Digital Marketing", "Content Strategy", "Analytics", "SEO"],
    },
  ]

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Learning & Growth",
      description: "Annual learning budget, conference attendance, and skill development programs",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Work-Life Balance",
      description: "Flexible working hours, remote work options, and unlimited PTO",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "Equity & Bonuses",
      description: "Employee stock options and performance-based bonuses",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Remote First",
      description: "Work from anywhere with quarterly team meetups",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Code,
      title: "Latest Tech",
      description: "MacBook Pro, latest tools, and technology stipend",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  const departments = [
    { icon: Code, name: "Engineering", count: 12, color: "from-blue-500 to-cyan-500" },
    { icon: Palette, name: "Design", count: 4, color: "from-purple-500 to-pink-500" },
    { icon: BarChart3, name: "Data", count: 6, color: "from-green-500 to-emerald-500" },
    { icon: Shield, name: "Security", count: 3, color: "from-red-500 to-orange-500" },
    { icon: Headphones, name: "Customer Success", count: 8, color: "from-teal-500 to-cyan-500" },
    { icon: Globe, name: "Marketing", count: 5, color: "from-orange-500 to-red-500" },
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
                Join Our Mission
                <span className="gradient-text block">Build the Future of Finance</span>
              </Typography>
              <Typography variant="body" color="secondary" className="mb-8 text-xl">
                We're looking for passionate individuals who want to democratize wealth management and help millions of
                Indians achieve their financial goals.
              </Typography>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="primary" size="lg">
                  View Open Positions
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Departments */}
      <Section padding="lg" background="white">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <Typography variant="h2" weight="bold" className="mb-4">
                Our Teams
              </Typography>
              <Typography variant="body" color="secondary">
                Join one of our diverse and talented teams
              </Typography>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {departments.map((dept, index) => (
                <StaggerItem key={index}>
                  <InteractiveCard className="p-4 text-center">
                    <motion.div
                      className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${dept.color} flex items-center justify-center mb-3`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <dept.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <Typography variant="h6" weight="bold" className="mb-1">
                      {dept.name}
                    </Typography>
                    <Typography variant="body" color="secondary" className="text-sm">
                      {dept.count} people
                    </Typography>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Benefits */}
      <Section padding="xl" background="gray">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <Typography variant="h2" weight="bold" className="mb-4">
                Why Work With Us?
              </Typography>
              <Typography variant="body" color="secondary">
                We believe in taking care of our team so they can do their best work
              </Typography>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <StaggerItem key={index}>
                  <InteractiveCard className="p-6 h-full">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <benefit.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <Typography variant="h5" weight="bold" className="mb-3">
                      {benefit.title}
                    </Typography>
                    <Typography variant="body" color="secondary">
                      {benefit.description}
                    </Typography>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Open Positions */}
      <Section padding="xl" background="white">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <Typography variant="h2" weight="bold" className="mb-4">
                Open Positions
              </Typography>
              <Typography variant="body" color="secondary">
                Find your next opportunity with us
              </Typography>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <StaggerItem key={index}>
                  <InteractiveCard className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          <Typography variant="h5" weight="bold">
                            {position.title}
                          </Typography>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {position.department}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {position.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {position.type}
                            </span>
                          </div>
                        </div>
                        <Typography variant="body" color="secondary" className="mb-4">
                          {position.description}
                        </Typography>
                        <div className="flex flex-wrap gap-2">
                          {position.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="primary">Apply Now</Button>
                        </motion.div>
                      </div>
                    </div>
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
                Don't See Your Role?
              </Typography>
              <Typography variant="body" className="mb-8 text-blue-100 text-lg">
                We're always looking for talented individuals. Send us your resume and tell us how you'd like to
                contribute.
              </Typography>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="primary" size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  Send Your Resume
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </div>
  )
}
