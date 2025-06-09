"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { Typography } from "@/components/ui-system/Typography"
import { TrendingUp, TrendingDown, DollarSign, Eye, EyeOff } from "lucide-react"

interface NetWorthCardProps {
  netWorth: number
  totalAssets: number
  totalLiabilities: number
  monthlyChange: number
}

export function NetWorthCard({ netWorth, totalAssets, totalLiabilities, monthlyChange }: NetWorthCardProps) {
  const [showValues, setShowValues] = useState(true)

  const formatCurrency = (amount: number) => {
    if (!showValues) return "••••••"
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const isPositiveChange = monthlyChange >= 0

  return (
    <InteractiveCard className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/50 dark:via-background dark:to-indigo-950/50 border-2 border-blue-100 dark:border-blue-800/50">
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-2">
            <motion.div
              className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <Typography variant="overline" color="accent" className="font-semibold">
              Net Worth
            </Typography>
          </div>

          <motion.button
            onClick={() => setShowValues(!showValues)}
            className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {showValues ? <Eye className="w-5 h-5 text-gray-500" /> : <EyeOff className="w-5 h-5 text-gray-500" />}
          </motion.button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Net Worth */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <Typography variant="h2" weight="black" className="text-blue-900 dark:text-blue-100 mb-2">
                {formatCurrency(netWorth)}
              </Typography>
            </motion.div>

            <motion.div className="flex items-center justify-center md:justify-start" whileHover={{ scale: 1.05 }}>
              <motion.div
                animate={{
                  rotate: isPositiveChange ? [0, 10, 0] : [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {isPositiveChange ? (
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                )}
              </motion.div>
              <Typography
                variant="caption"
                className={`font-medium ${isPositiveChange ? "text-green-600" : "text-red-600"}`}
              >
                {isPositiveChange ? "+" : ""}
                {monthlyChange}% this month
              </Typography>
            </motion.div>
          </motion.div>

          {/* Assets */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Typography variant="overline" color="secondary" className="mb-2">
              Total Assets
            </Typography>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Typography variant="h4" weight="bold" className="text-green-700 dark:text-green-400 mb-1">
                {formatCurrency(totalAssets)}
              </Typography>
            </motion.div>
            <div className="w-full bg-green-200 dark:bg-green-900/50 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Liabilities */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography variant="overline" color="secondary" className="mb-2">
              Total Liabilities
            </Typography>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Typography variant="h4" weight="bold" className="text-red-700 dark:text-red-400 mb-1">
                {formatCurrency(totalLiabilities)}
              </Typography>
            </motion.div>
            <div className="w-full bg-red-200 dark:bg-red-900/50 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(totalLiabilities / totalAssets) * 100}%` }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-4 right-4 opacity-20">
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </InteractiveCard>
  )
}
