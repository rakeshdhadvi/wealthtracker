"use client"

import { CheckCircle, ExternalLink, Zap, Shield, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const brokerIntegrations = [
  {
    name: "Zerodha",
    logo: "🟢",
    status: "active",
    description: "India's largest discount broker with comprehensive API support",
    features: ["Real-time portfolio sync", "Order history", "Holdings data", "P&L tracking"],
    users: "1M+",
  },
  {
    name: "Groww",
    logo: "🟡",
    status: "active",
    description: "Popular investment platform for stocks and mutual funds",
    features: ["Portfolio tracking", "SIP data", "Transaction history", "Goal tracking"],
    users: "500K+",
  },
  {
    name: "HDFC Securities",
    logo: "🔵",
    status: "active",
    description: "Full-service broker with extensive market coverage",
    features: ["Complete portfolio view", "Research reports", "Advisory services", "Tax reports"],
    users: "200K+",
  },
  {
    name: "ICICI Direct",
    logo: "🟠",
    status: "coming-soon",
    description: "Leading online trading platform with advanced tools",
    features: ["Portfolio analytics", "Market insights", "Trading tools", "Research"],
    users: "150K+",
  },
  {
    name: "Angel One",
    logo: "🔴",
    status: "coming-soon",
    description: "Technology-driven broker with innovative features",
    features: ["Smart portfolio", "AI insights", "Options trading", "Margin tracking"],
    users: "300K+",
  },
  {
    name: "Upstox",
    logo: "🟣",
    status: "planned",
    description: "Modern trading platform with competitive pricing",
    features: ["Real-time data", "Advanced charts", "Options chain", "Basket orders"],
    users: "250K+",
  },
]

const bankIntegrations = [
  {
    name: "HDFC Bank",
    logo: "🏦",
    status: "active",
    description: "Comprehensive banking integration for account aggregation",
    features: ["Account balance", "Transaction history", "FD tracking", "Loan details"],
  },
  {
    name: "ICICI Bank",
    logo: "🏛️",
    status: "active",
    description: "Full banking suite integration with investment tracking",
    features: ["Savings account", "Investment products", "Credit cards", "Insurance"],
  },
  {
    name: "SBI",
    logo: "🏢",
    status: "coming-soon",
    description: "India's largest bank with extensive product portfolio",
    features: ["Account aggregation", "Loan tracking", "Investment products", "PPF/EPF"],
  },
  {
    name: "Axis Bank",
    logo: "🏪",
    status: "planned",
    description: "Private sector bank with digital-first approach",
    features: ["Digital banking", "Investment advisory", "Wealth management", "Insurance"],
  },
]

const otherIntegrations = [
  {
    name: "Coin by Zerodha",
    logo: "💰",
    category: "Mutual Funds",
    status: "active",
    description: "Direct mutual fund platform with zero commission",
  },
  {
    name: "Kuvera",
    logo: "📊",
    category: "Mutual Funds",
    status: "active",
    description: "Free mutual fund investment platform",
  },
  {
    name: "CoinDCX",
    logo: "₿",
    category: "Cryptocurrency",
    status: "coming-soon",
    description: "Leading crypto exchange in India",
  },
  {
    name: "WazirX",
    logo: "🚀",
    category: "Cryptocurrency",
    status: "planned",
    description: "Popular cryptocurrency trading platform",
  },
]

const statusConfig = {
  active: { color: "bg-green-500", text: "Active", textColor: "text-green-700", bgColor: "bg-green-50" },
  "coming-soon": { color: "bg-blue-500", text: "Coming Soon", textColor: "text-blue-700", bgColor: "bg-blue-50" },
  planned: { color: "bg-gray-400", text: "Planned", textColor: "text-gray-700", bgColor: "bg-gray-50" },
}

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Integrations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect all your financial accounts in one place for a complete wealth overview
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Zap className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">15+</h3>
              <p className="text-gray-600 dark:text-gray-300">Active Integrations</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Bank-Grade</h3>
              <p className="text-gray-600 dark:text-gray-300">Security Standards</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Real-time</h3>
              <p className="text-gray-600 dark:text-gray-300">Data Synchronization</p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Broker Integrations */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Broker Integrations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {brokerIntegrations.map((broker, index) => {
                const config = statusConfig[broker.status as keyof typeof statusConfig]
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{broker.logo}</span>
                          <div>
                            <CardTitle className="text-xl">{broker.name}</CardTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{broker.users} users connected</p>
                          </div>
                        </div>
                        <Badge className={`${config.bgColor} ${config.textColor} border-0`}>{config.text}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{broker.description}</p>
                      <div className="space-y-2">
                        {broker.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        className="w-full mt-4"
                        variant={broker.status === "active" ? "default" : "outline"}
                        disabled={broker.status !== "active"}
                      >
                        {broker.status === "active" ? "Connect Now" : "Coming Soon"}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Bank Integrations */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Banking Partners</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {bankIntegrations.map((bank, index) => {
                const config = statusConfig[bank.status as keyof typeof statusConfig]
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{bank.logo}</span>
                          <CardTitle className="text-xl">{bank.name}</CardTitle>
                        </div>
                        <Badge className={`${config.bgColor} ${config.textColor} border-0`}>{config.text}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{bank.description}</p>
                      <div className="space-y-2">
                        {bank.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Other Integrations */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Other Platforms</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherIntegrations.map((integration, index) => {
                const config = statusConfig[integration.status as keyof typeof statusConfig]
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-4 text-center">
                      <span className="text-3xl mb-2 block">{integration.logo}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{integration.name}</h3>
                      <Badge variant="secondary" className="mb-2">
                        {integration.category}
                      </Badge>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{integration.description}</p>
                      <Badge className={`${config.bgColor} ${config.textColor} border-0 text-xs`}>{config.text}</Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <ExternalLink className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Need a Custom Integration?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're always adding new integrations. Let us know which platform you'd like to see next!
              </p>
              <Button size="lg">Request Integration</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
