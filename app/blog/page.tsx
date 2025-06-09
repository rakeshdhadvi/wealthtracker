"use client"

import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui-system/AnimatedElements"
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, TrendingUp, BookOpen, Target, Shield, Smartphone, BarChart3 } from "lucide-react"
import Image from "next/image"

export default function BlogPage() {
  const featuredPost = {
    title: "The Complete Guide to Portfolio Diversification in 2024",
    excerpt:
      "Learn how to build a well-diversified investment portfolio that can weather market volatility and help you achieve your long-term financial goals.",
    author: "Priya Sharma",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Investment Strategy",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  }

  const blogPosts = [
    {
      title: "How to Track Your Mutual Fund Performance Like a Pro",
      excerpt:
        "Discover the key metrics and tools you need to evaluate your mutual fund investments and make informed decisions.",
      author: "Rajesh Kumar",
      date: "December 12, 2024",
      readTime: "6 min read",
      category: "Mutual Funds",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Tax-Saving Investments: A Complete Guide for Indian Investors",
      excerpt:
        "Maximize your tax savings while building wealth with these proven investment strategies under Section 80C and beyond.",
      author: "Amit Patel",
      date: "December 10, 2024",
      readTime: "10 min read",
      category: "Tax Planning",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Cryptocurrency in Your Portfolio: Risks and Opportunities",
      excerpt:
        "Should you invest in crypto? We break down the pros, cons, and how to approach digital assets responsibly.",
      author: "Sneha Gupta",
      date: "December 8, 2024",
      readTime: "7 min read",
      category: "Cryptocurrency",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Building an Emergency Fund: Your Financial Safety Net",
      excerpt:
        "Learn why an emergency fund is crucial and how to build one that protects you from unexpected financial challenges.",
      author: "Priya Sharma",
      date: "December 5, 2024",
      readTime: "5 min read",
      category: "Financial Planning",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Real Estate vs. Stock Market: Where Should You Invest?",
      excerpt:
        "Compare the pros and cons of real estate and stock market investments to make the right choice for your portfolio.",
      author: "Rajesh Kumar",
      date: "December 3, 2024",
      readTime: "9 min read",
      category: "Investment Strategy",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Understanding SIP: The Power of Systematic Investment",
      excerpt:
        "Discover how Systematic Investment Plans can help you build wealth consistently, regardless of market conditions.",
      author: "Amit Patel",
      date: "December 1, 2024",
      readTime: "6 min read",
      category: "SIP",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const categories = [
    { name: "Investment Strategy", icon: TrendingUp, count: 15, color: "from-blue-500 to-cyan-500" },
    { name: "Financial Planning", icon: Target, count: 12, color: "from-green-500 to-emerald-500" },
    { name: "Tax Planning", icon: BookOpen, count: 8, color: "from-purple-500 to-pink-500" },
    { name: "Technology", icon: Smartphone, count: 6, color: "from-orange-500 to-red-500" },
    { name: "Market Analysis", icon: BarChart3, count: 10, color: "from-teal-500 to-cyan-500" },
    { name: "Security", icon: Shield, count: 4, color: "from-indigo-500 to-purple-500" },
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
                WealthTracker Blog
                <span className="gradient-text block">Insights & Education</span>
              </Typography>
              <Typography variant="body" color="secondary" className="mb-8 text-xl">
                Stay informed with the latest investment strategies, market insights, and financial planning tips from
                our team of experts.
              </Typography>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Categories */}
      <Section padding="lg" background="white">
        <Container>
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <StaggerItem key={index}>
                  <InteractiveCard className="p-4 text-center">
                    <motion.div
                      className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-2`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <category.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <Typography variant="body" weight="medium" className="mb-1 text-sm">
                      {category.name}
                    </Typography>
                    <Typography variant="body" color="secondary" className="text-xs">
                      {category.count} articles
                    </Typography>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Featured Post */}
      <Section padding="xl" background="gray">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <Typography variant="h2" weight="bold" className="mb-4">
                Featured Article
              </Typography>
            </div>
          </FadeIn>

          <FadeIn>
            <InteractiveCard className="overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                  </div>
                  <Typography variant="h3" weight="bold" className="mb-4">
                    {featuredPost.title}
                  </Typography>
                  <Typography variant="body" color="secondary" className="mb-6">
                    {featuredPost.excerpt}
                  </Typography>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <Typography variant="body" weight="medium" className="text-sm">
                          {featuredPost.author}
                        </Typography>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{featuredPost.date}</span>
                        </div>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="primary">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </FadeIn>
        </Container>
      </Section>

      {/* Blog Posts Grid */}
      <Section padding="xl" background="white">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <Typography variant="h2" weight="bold" className="mb-4">
                Latest Articles
              </Typography>
              <Typography variant="body" color="secondary">
                Discover insights to help you make better financial decisions
              </Typography>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <StaggerItem key={index}>
                  <InteractiveCard className="overflow-hidden h-full">
                    <div className="relative h-48">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                      </div>
                      <Typography variant="h5" weight="bold" className="mb-3 line-clamp-2">
                        {post.title}
                      </Typography>
                      <Typography variant="body" color="secondary" className="mb-4 line-clamp-3">
                        {post.excerpt}
                      </Typography>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <Typography variant="body" weight="medium" className="text-sm">
                              {post.author}
                            </Typography>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              <span>{post.date}</span>
                            </div>
                          </div>
                        </div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" size="sm">
                            <ArrowRight className="w-4 h-4" />
                          </Button>
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

      {/* Newsletter Signup */}
      <Section padding="xl" background="gray">
        <Container>
          <FadeIn>
            <InteractiveCard className="p-8 text-center">
              <Typography variant="h3" weight="bold" className="mb-4">
                Stay Updated
              </Typography>
              <Typography variant="body" color="secondary" className="mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest financial insights, investment tips, and market updates
                delivered to your inbox.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="primary">Subscribe</Button>
                </motion.div>
              </div>
            </InteractiveCard>
          </FadeIn>
        </Container>
      </Section>
    </div>
  )
}
