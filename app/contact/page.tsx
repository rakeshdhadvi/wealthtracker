"use client"

import type React from "react"

import { useState } from "react"
import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui-system/AnimatedElements"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, MessageCircle, Headphones } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  })

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "support@wealthtracker.in",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team directly",
      contact: "+91 888-888-8888",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available 9 AM - 6 PM IST",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Headphones,
      title: "Premium Support",
      description: "Priority support for premium users",
      contact: "24/7 dedicated support",
      color: "from-orange-500 to-red-500",
    },
  ]

  const offices = [
    {
      city: "Mumbai",
      address: "WeWork, Bandra Kurla Complex, Mumbai 400051",
      phone: "+91 888-888-8888",
      email: "mumbai@wealthtracker.in",
    },
    {
      city: "Bangalore",
      address: "Koramangala, Bangalore 560034",
      phone: "+91 888-888-8889",
      email: "bangalore@wealthtracker.in",
    },
    {
      city: "Delhi",
      address: "Connaught Place, New Delhi 110001",
      phone: "+91 888-888-8890",
      email: "delhi@wealthtracker.in",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you within 24 hours.")
    setFormData({ name: "", email: "", subject: "", message: "", category: "general" })
  }

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
                Get in Touch
                <span className="gradient-text block">We're Here to Help</span>
              </Typography>
              <Typography variant="body" color="secondary" className="mb-8 text-xl">
                Have questions about WealthTracker? Need help with your account? Our team is ready to assist you.
              </Typography>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Contact Methods */}
      <Section padding="xl" background="white">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <Typography variant="h2" weight="bold" className="mb-4">
                How Can We Help?
              </Typography>
              <Typography variant="body" color="secondary">
                Choose the best way to reach us
              </Typography>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <StaggerItem key={index}>
                  <InteractiveCard className="p-6 text-center h-full">
                    <motion.div
                      className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <method.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <Typography variant="h5" weight="bold" className="mb-3">
                      {method.title}
                    </Typography>
                    <Typography variant="body" color="secondary" className="mb-4">
                      {method.description}
                    </Typography>
                    <Typography variant="body" weight="medium" color="primary">
                      {method.contact}
                    </Typography>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Contact Form & Office Info */}
      <Section padding="xl" background="gray">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeIn>
              <InteractiveCard className="p-8">
                <Typography variant="h3" weight="bold" className="mb-6">
                  Send us a Message
                </Typography>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feature">Feature Request</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" variant="primary" size="lg" className="w-full">
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </InteractiveCard>
            </FadeIn>

            {/* Office Information */}
            <div className="space-y-8">
              <FadeIn>
                <Typography variant="h3" weight="bold" className="mb-6">
                  Our Offices
                </Typography>
              </FadeIn>

              <StaggerContainer>
                {offices.map((office, index) => (
                  <StaggerItem key={index}>
                    <InteractiveCard className="p-6">
                      <Typography variant="h5" weight="bold" className="mb-4 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                        {office.city}
                      </Typography>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600 dark:text-gray-400">{office.address}</p>
                        <p className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-green-600" />
                          {office.phone}
                        </p>
                        <p className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-blue-600" />
                          {office.email}
                        </p>
                      </div>
                    </InteractiveCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <FadeIn>
                <InteractiveCard className="p-6">
                  <Typography variant="h5" weight="bold" className="mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-purple-600" />
                    Business Hours
                  </Typography>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-blue-800 dark:text-blue-200 text-xs">
                        Premium users get 24/7 priority support
                      </p>
                    </div>
                  </div>
                </InteractiveCard>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
