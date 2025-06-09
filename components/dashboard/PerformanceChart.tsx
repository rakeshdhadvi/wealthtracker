"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui-system/Card"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts"
import { ArrowUp, ArrowDown, Info } from "lucide-react"
import { formatCurrencySymbol, formatPercent } from "@/utils/format"

// Mock data
const performanceData = [
  { month: "Jan", portfolio: 100000, nifty: 100000, sensex: 100000 },
  { month: "Feb", portfolio: 105000, nifty: 102000, sensex: 103000 },
  { month: "Mar", portfolio: 103000, nifty: 101000, sensex: 102000 },
  { month: "Apr", portfolio: 108000, nifty: 103000, sensex: 104000 },
  { month: "May", portfolio: 112000, nifty: 105000, sensex: 106000 },
  { month: "Jun", portfolio: 118000, nifty: 106000, sensex: 107000 },
  { month: "Jul", portfolio: 115000, nifty: 107000, sensex: 108000 },
  { month: "Aug", portfolio: 120000, nifty: 108000, sensex: 109000 },
  { month: "Sep", portfolio: 125000, nifty: 110000, sensex: 111000 },
  { month: "Oct", portfolio: 128000, nifty: 112000, sensex: 113000 },
  { month: "Nov", portfolio: 132000, nifty: 114000, sensex: 115000 },
  { month: "Dec", portfolio: 138000, nifty: 116000, sensex: 117000 },
]

type TimeRange = "1M" | "3M" | "6M" | "1Y" | "3Y" | "5Y" | "All"

export function PerformanceChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1Y")
  const [showInfo, setShowInfo] = useState(false)

  // Filter data based on time range
  const getFilteredData = () => {
    switch (timeRange) {
      case "1M":
        return performanceData.slice(-1)
      case "3M":
        return performanceData.slice(-3)
      case "6M":
        return performanceData.slice(-6)
      case "1Y":
        return performanceData
      default:
        return performanceData
    }
  }

  const data = getFilteredData()

  // Calculate returns
  const calculateReturns = () => {
    if (data.length === 0) return { portfolio: 0, nifty: 0, sensex: 0 }

    const first = data[0]
    const last = data[data.length - 1]

    return {
      portfolio: ((last.portfolio - first.portfolio) / first.portfolio) * 100,
      nifty: ((last.nifty - first.nifty) / first.nifty) * 100,
      sensex: ((last.sensex - first.sensex) / first.sensex) * 100,
    }
  }

  const returns = calculateReturns()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value
      const prevValue = data.find(d => d.month === label)?.portfolio || 0
      const change = ((value - prevValue) / prevValue) * 100

      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <Typography variant="body" weight="semibold" className="mb-1">
            {label}
          </Typography>
          <div className="flex items-center gap-2">
            <Typography variant="h4" weight="bold">
              {formatCurrencySymbol(value)}
            </Typography>
            <div className={`flex items-center ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              <Typography variant="body" weight="medium">
                {formatPercent(Math.abs(change))}
              </Typography>
            </div>
          </div>
        </motion.div>
      )
    }
    return null
  }

  return (
    <Card variant="default" padding="lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <Typography variant="h4" weight="bold">
            Portfolio Performance
          </Typography>
          <Typography variant="caption" color="muted">
            Compare your portfolio with market benchmarks
          </Typography>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
          {(["1M", "3M", "6M", "1Y", "3Y", "5Y", "All"] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                timeRange === range ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Returns summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <Typography variant="caption" color="muted" className="mb-1">
            Your Portfolio
          </Typography>
          <Typography variant="h5" weight="bold" className="text-blue-700">
            {returns.portfolio.toFixed(2)}%
          </Typography>
        </div>
        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
          <Typography variant="caption" color="muted" className="mb-1">
            NIFTY 50
          </Typography>
          <Typography variant="h5" weight="bold" className="text-green-700">
            {returns.nifty.toFixed(2)}%
          </Typography>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
          <Typography variant="caption" color="muted" className="mb-1">
            SENSEX
          </Typography>
          <Typography variant="h5" weight="bold" className="text-purple-700">
            {returns.sensex.toFixed(2)}%
          </Typography>
        </div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `₹${value / 1000}k`} domain={["dataMin - 10000", "dataMax + 10000"]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="portfolio"
              name="Your Portfolio"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line type="monotone" dataKey="nifty" name="NIFTY 50" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="sensex" name="SENSEX" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="mt-6 flex justify-end">
        <Button variant="outline" size="sm">
          View Detailed Analysis
        </Button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Show performance information"
          >
            <Info className="w-4 h-4" />
          </Button>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              Performance is calculated based on the total value of your portfolio over time
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  )
}
