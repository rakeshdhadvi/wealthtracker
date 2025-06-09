"use client"

import { Users, MessageCircle, Calendar, Trophy, Star, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const communityStats = [
  { label: "Active Members", value: "12,500+", icon: Users },
  { label: "Daily Discussions", value: "450+", icon: MessageCircle },
  { label: "Monthly Events", value: "8", icon: Calendar },
  { label: "Success Stories", value: "200+", icon: Trophy },
]

const communityChannels = [
  {
    name: "Discord Server",
    description: "Join our active Discord community for real-time discussions, Q&A, and networking.",
    members: "8,500+",
    activity: "Very Active",
    link: "#",
    icon: "💬",
  },
  {
    name: "Telegram Group",
    description: "Get quick updates, market news, and connect with fellow investors on Telegram.",
    members: "3,200+",
    activity: "Active",
    link: "#",
    icon: "📱",
  },
  {
    name: "Reddit Community",
    description: "Share investment strategies, ask questions, and learn from experienced investors.",
    members: "1,800+",
    activity: "Growing",
    link: "#",
    icon: "🔗",
  },
]

const upcomingEvents = [
  {
    title: "Monthly Portfolio Review",
    date: "2024-04-15",
    time: "7:00 PM IST",
    type: "Webinar",
    description: "Expert-led session on portfolio optimization and rebalancing strategies.",
  },
  {
    title: "Beginner's Investment Workshop",
    date: "2024-04-20",
    time: "2:00 PM IST",
    type: "Workshop",
    description: "Learn the basics of investing in Indian markets with hands-on examples.",
  },
  {
    title: "Tax Planning Masterclass",
    date: "2024-04-25",
    time: "6:30 PM IST",
    type: "Masterclass",
    description: "Advanced tax optimization strategies for the current financial year.",
  },
]

const topContributors = [
  { name: "Rajesh Kumar", contributions: 145, badge: "Investment Guru", avatar: "👨‍💼" },
  { name: "Priya Sharma", contributions: 132, badge: "Tax Expert", avatar: "👩‍💻" },
  { name: "Amit Patel", contributions: 98, badge: "Crypto Specialist", avatar: "👨‍🔬" },
  { name: "Sneha Gupta", contributions: 87, badge: "MF Advisor", avatar: "👩‍🎓" },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Join Our Community
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with thousands of investors, share knowledge, and grow your wealth together
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <Icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Community Channels */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Community Channels</h2>
              <div className="space-y-4">
                {communityChannels.map((channel, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{channel.icon}</span>
                          <div>
                            <CardTitle className="text-xl">{channel.name}</CardTitle>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {channel.members} members
                              </span>
                              <Badge variant="secondary">{channel.activity}</Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Join
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">{channel.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge variant="outline">{event.type}</Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(event.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}{" "}
                              • {event.time}
                            </span>
                          </div>
                          <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                          <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                        </div>
                        <Button size="sm">Register</Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-2xl">{contributor.avatar}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{contributor.name}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {contributor.badge}
                          </Badge>
                          <span className="text-xs text-gray-500">{contributor.contributions} contributions</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <p>Be respectful and constructive in discussions</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <p>Share knowledge and help fellow investors</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <p>No spam, promotional content, or financial advice</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <p>Keep discussions relevant to investing and finance</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Read Full Guidelines
                </Button>
              </CardContent>
            </Card>

            {/* Get Started */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Join?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Start connecting with fellow investors today!</p>
                <Button className="w-full">Join Community</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
