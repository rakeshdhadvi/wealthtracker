"use client"

import { Calendar, ExternalLink, Download, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const pressReleases = [
  {
    date: "2024-03-15",
    title: "WealthTracker Raises $5M Series A to Democratize Wealth Management in India",
    excerpt: "Leading fintech startup secures funding from top VCs to expand broker integrations and AI capabilities.",
    publication: "TechCrunch India",
    type: "Funding",
    link: "#",
  },
  {
    date: "2024-02-28",
    title: "WealthTracker Wins 'Best Fintech Innovation' at India Fintech Awards 2024",
    excerpt:
      "Recognition for outstanding contribution to financial technology and user experience in wealth management.",
    publication: "Economic Times",
    type: "Award",
    link: "#",
  },
  {
    date: "2024-01-20",
    title: "WealthTracker Crosses 100,000 Active Users Milestone",
    excerpt: "Platform sees 300% growth in user base as Indians embrace digital wealth management solutions.",
    publication: "Business Standard",
    type: "Milestone",
    link: "#",
  },
  {
    date: "2023-12-10",
    title: "WealthTracker Partners with Major Indian Brokers for Seamless Integration",
    excerpt: "New partnerships with Zerodha, Groww, and HDFC Securities enable one-click portfolio sync.",
    publication: "Mint",
    type: "Partnership",
    link: "#",
  },
]

const mediaKit = [
  { name: "Company Logo (PNG)", size: "2.1 MB", type: "logo" },
  { name: "Company Logo (SVG)", size: "156 KB", type: "logo" },
  { name: "Product Screenshots", size: "8.4 MB", type: "screenshots" },
  { name: "Founder Photos", size: "3.2 MB", type: "photos" },
  { name: "Brand Guidelines", size: "1.8 MB", type: "guidelines" },
  { name: "Company Fact Sheet", size: "245 KB", type: "factsheet" },
]

const awards = [
  {
    year: "2024",
    award: "Best Fintech Innovation",
    organization: "India Fintech Awards",
    description: "Outstanding contribution to financial technology",
  },
  {
    year: "2023",
    award: "Startup of the Year",
    organization: "TechCircle Awards",
    description: "Most promising fintech startup in India",
  },
  {
    year: "2023",
    award: "Excellence in UX Design",
    organization: "Design Awards India",
    description: "Best user experience in financial applications",
  },
]

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Press & Media
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Latest news, press releases, and media resources about WealthTracker
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Press Releases */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="secondary">{release.type}</Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(release.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2 hover:text-blue-600 transition-colors">
                          <a href={release.link} className="flex items-center">
                            {release.title}
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{release.excerpt}</p>
                        <p className="text-sm font-medium text-blue-600">Published in {release.publication}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Media Kit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Media Kit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Download our media kit with logos, screenshots, and brand assets.
                </p>
                <div className="space-y-3">
                  {mediaKit.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.size}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Awards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Awards & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {awards.map((award, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline">{award.year}</Badge>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{award.award}</h4>
                      <p className="text-sm text-blue-600 mb-1">{award.organization}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{award.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Media Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Head of Communications</p>
                  </div>
                  <div>
                    <p className="text-sm">
                      <strong>Email:</strong> press@wealthtracker.in
                    </p>
                    <p className="text-sm">
                      <strong>Phone:</strong> +91 98765 43210
                    </p>
                  </div>
                  <Button className="w-full">Contact Media Team</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
