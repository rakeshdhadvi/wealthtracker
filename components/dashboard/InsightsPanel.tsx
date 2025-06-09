"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui-system/Card"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { Lightbulb, AlertTriangle, Trophy, Bell, X } from "lucide-react"
import type { Insight } from "@/types"

interface InsightsPanelProps {
  insights: Insight[]
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case "suggestion":
        return <Lightbulb className="w-5 h-5" />
      case "warning":
        return <AlertTriangle className="w-5 h-5" />
      case "achievement":
        return <Trophy className="w-5 h-5" />
      case "alert":
        return <Bell className="w-5 h-5" />
      default:
        return <Lightbulb className="w-5 h-5" />
    }
  }

  const getInsightColor = (type: string, priority: string) => {
    if (type === "achievement") return { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" }
    if (type === "warning") return { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" }
    if (priority === "high") return { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" }
    return { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h4" weight="bold">
          Smart Insights
        </Typography>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {insights.slice(0, 3).map((insight, index) => {
          const colors = getInsightColor(insight.type, insight.priority)

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${colors.bg} ${colors.border}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full bg-white ${colors.text}`}>{getInsightIcon(insight.type)}</div>
                  <div className="flex-1">
                    <Typography variant="body" weight="medium" className="mb-1">
                      {insight.title}
                    </Typography>
                    <Typography variant="caption" color="muted">
                      {formatDate(insight.createdAt)}
                    </Typography>
                  </div>
                </div>
                {!insight.isRead && (
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <Typography variant="caption" color="secondary" className="mb-3">
                {insight.message}
              </Typography>

              {insight.type === "suggestion" && (
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-white text-purple-600">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <Typography variant="body" weight="medium" className="text-purple-900 mb-1">
              AI-Powered Insights
            </Typography>
            <Typography variant="caption" className="text-purple-700">
              Get personalized recommendations based on your financial behavior
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  )
}
