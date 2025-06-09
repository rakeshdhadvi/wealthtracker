"use client"

import { CheckCircle, Clock, Zap, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const roadmapData = [
  {
    quarter: "Q1 2024",
    status: "completed",
    title: "Foundation & Core Features",
    items: [
      { name: "Multi-broker Integration", status: "completed", description: "Connect Zerodha, Groww, HDFC Securities" },
      { name: "Portfolio Dashboard", status: "completed", description: "Real-time portfolio tracking and analytics" },
      { name: "Goal Setting", status: "completed", description: "Smart financial goal planning and tracking" },
      { name: "Investment Categories", status: "completed", description: "Stocks, MF, FD, Gold, Crypto, Real Estate" },
    ],
  },
  {
    quarter: "Q2 2024",
    status: "in-progress",
    title: "Advanced Analytics & AI",
    items: [
      { name: "AI-Powered Insights", status: "completed", description: "Personalized investment recommendations" },
      { name: "Tax Optimization", status: "in-progress", description: "Smart tax planning and LTCG/STCG tracking" },
      { name: "Risk Assessment", status: "in-progress", description: "Portfolio risk analysis and suggestions" },
      { name: "Performance Benchmarking", status: "planned", description: "Compare against market indices" },
    ],
  },
  {
    quarter: "Q3 2024",
    status: "planned",
    title: "Mobile & Advanced Features",
    items: [
      { name: "Mobile App (iOS/Android)", status: "planned", description: "Native mobile applications" },
      { name: "Voice Commands", status: "planned", description: "Voice-controlled portfolio management" },
      { name: "Advanced Charting", status: "planned", description: "Technical analysis tools and charts" },
      { name: "Social Trading", status: "planned", description: "Follow and learn from top investors" },
    ],
  },
  {
    quarter: "Q4 2024",
    status: "planned",
    title: "Enterprise & Scaling",
    items: [
      { name: "Family Accounts", status: "planned", description: "Manage multiple family member portfolios" },
      { name: "Financial Advisor Tools", status: "planned", description: "Tools for financial advisors and RIAs" },
      { name: "API for Developers", status: "planned", description: "Public API for third-party integrations" },
      { name: "International Markets", status: "planned", description: "US stocks and global market support" },
    ],
  },
]

const statusConfig = {
  completed: { icon: CheckCircle, color: "bg-green-500", textColor: "text-green-700", bgColor: "bg-green-50" },
  "in-progress": { icon: Clock, color: "bg-blue-500", textColor: "text-blue-700", bgColor: "bg-blue-50" },
  planned: { icon: Target, color: "bg-gray-400", textColor: "text-gray-700", bgColor: "bg-gray-50" },
}

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Product Roadmap
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See what we're building next to make your wealth management even better
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {roadmapData.map((quarter, index) => {
              const config = statusConfig[quarter.status as keyof typeof statusConfig]
              const Icon = config.icon

              return (
                <div key={index} className="relative">
                  {/* Timeline Line */}
                  {index < roadmapData.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200 dark:bg-gray-700 -z-10" />
                  )}

                  <div className="flex items-start space-x-6">
                    {/* Timeline Icon */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full ${config.color} flex items-center justify-center`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{quarter.quarter}</h2>
                        <Badge variant="secondary" className={`${config.bgColor} ${config.textColor} border-0`}>
                          {quarter.status.replace("-", " ").toUpperCase()}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">{quarter.title}</h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        {quarter.items.map((item, itemIndex) => {
                          const itemConfig = statusConfig[item.status as keyof typeof statusConfig]
                          const ItemIcon = itemConfig.icon

                          return (
                            <Card key={itemIndex} className="hover:shadow-lg transition-shadow duration-200">
                              <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`w-8 h-8 rounded-full ${itemConfig.color} flex items-center justify-center`}
                                  >
                                    <ItemIcon className="h-4 w-4 text-white" />
                                  </div>
                                  <CardTitle className="text-lg">{item.name}</CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Have a Feature Request?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We'd love to hear your ideas! Help us prioritize what to build next.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Submit Feature Request
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
