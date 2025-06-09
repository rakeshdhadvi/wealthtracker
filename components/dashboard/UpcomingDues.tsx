"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui-system/Card"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { Calendar, AlertTriangle, CreditCard, Home, Shield } from "lucide-react"
import type { UpcomingDue } from "@/types"

interface UpcomingDuesProps {
  dues: UpcomingDue[]
}

export function UpcomingDues({ dues }: UpcomingDuesProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays < 0) return "Overdue"
    return `${diffDays} days`
  }

  const getDueIcon = (type: string) => {
    switch (type) {
      case "emi":
        return <Home className="w-5 h-5" />
      case "credit_card":
        return <CreditCard className="w-5 h-5" />
      case "insurance":
        return <Shield className="w-5 h-5" />
      default:
        return <Calendar className="w-5 h-5" />
    }
  }

  const getDueStatus = (due: UpcomingDue) => {
    const date = new Date(due.dueDate)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return { color: "text-red-600", bg: "bg-red-50" }
    if (diffDays <= 3) return { color: "text-orange-600", bg: "bg-orange-50" }
    return { color: "text-green-600", bg: "bg-green-50" }
  }

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h4" weight="bold">
          Upcoming Dues
        </Typography>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {dues.map((due, index) => {
          const status = getDueStatus(due)

          return (
            <motion.div
              key={due.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${status.bg} border-transparent hover:border-gray-200`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full bg-white ${status.color}`}>{getDueIcon(due.type)}</div>
                  <div>
                    <Typography variant="body" weight="medium">
                      {due.name}
                    </Typography>
                    <Typography variant="caption" color="muted">
                      Due {formatDate(due.dueDate)}
                    </Typography>
                  </div>
                </div>
                {due.status === "overdue" && <AlertTriangle className="w-5 h-5 text-red-600" />}
              </div>

              <div className="flex items-center justify-between">
                <Typography variant="h6" weight="bold" className={status.color}>
                  {formatCurrency(due.amount)}
                </Typography>
                <Button variant="outline" size="sm">
                  Pay Now
                </Button>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <Typography variant="caption" color="accent" className="font-medium">
          💡 Tip: Set up auto-pay to never miss a due date!
        </Typography>
      </div>
    </Card>
  )
}
