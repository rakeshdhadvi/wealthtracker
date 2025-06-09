"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui-system/Card"
import { Typography } from "@/components/ui-system/Typography"
import { ArrowUpRight, ArrowDownLeft, Gift, CreditCard } from "lucide-react"
import type { Transaction } from "@/types"

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    })
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "buy":
        return <ArrowUpRight className="w-5 h-5 text-green-600" />
      case "sell":
        return <ArrowDownLeft className="w-5 h-5 text-red-600" />
      case "dividend":
        return <Gift className="w-5 h-5 text-blue-600" />
      case "payment":
        return <CreditCard className="w-5 h-5 text-orange-600" />
      default:
        return <ArrowUpRight className="w-5 h-5 text-gray-600" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "buy":
        return "text-green-600"
      case "sell":
        return "text-red-600"
      case "dividend":
        return "text-blue-600"
      case "payment":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h4" weight="bold">
          Recent Transactions
        </Typography>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">View All</button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-white">{getTransactionIcon(transaction.type)}</div>
              <div>
                <Typography variant="body" weight="medium" className="mb-1">
                  {transaction.description}
                </Typography>
                <Typography variant="caption" color="muted">
                  {formatDate(transaction.date)}
                  {transaction.asset && ` • ${transaction.asset}`}
                </Typography>
              </div>
            </div>
            <Typography variant="body" weight="bold" className={getTransactionColor(transaction.type)}>
              {transaction.type === "payment" ? "-" : "+"}
              {formatCurrency(transaction.amount)}
            </Typography>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
