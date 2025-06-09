"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Typography } from "@/components/ui-system/Typography"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { Button } from "@/components/ui-system/Button"
import { formatPercent } from "@/utils/format"

const COLORS = {
  stocks: "#8884d8",
  mutual_funds: "#82ca9d",
  gold: "#ffc658",
  real_estate: "#ff8042",
  fixed_deposits: "#0088fe",
  crypto: "#00c49f",
  ppf: "#ffbb28",
  bonds: "#ff8042",
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-sm font-medium"
    >
      {formatPercent(percent * 100, 0)}
    </text>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <Typography variant="body" weight="semibold" className="mb-1">
          {data.name.replace(/_/g, " ").toUpperCase()}
        </Typography>
        <Typography variant="h4" weight="bold">
          {formatPercent(data.value)}
        </Typography>
      </motion.div>
    )
  }
  return null
}

interface AssetAllocationProps {
  allocation: {
    stocks: number
    mutual_funds: number
    gold: number
    real_estate: number
    fixed_deposits: number
    crypto: number
    ppf: number
    bonds: number
  }
}

export function AssetAllocationChart({ allocation }: AssetAllocationProps) {
  const [showInfo, setShowInfo] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const data = Object.entries(allocation).map(([name, value]) => ({
    name,
    value,
  }))

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Show asset allocation information"
          >
            <Info className="w-4 h-4" />
          </Button>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              Asset allocation shows how your investments are distributed across different asset classes
            </motion.div>
          )}
        </div>
      </div>

      <div className="h-[400px] w-full" role="img" aria-label="Asset allocation chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              animationDuration={1000}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name as keyof typeof COLORS]}
                  stroke={activeIndex === index ? "#fff" : "none"}
                  strokeWidth={activeIndex === index ? 2 : 0}
                  style={{
                    filter: activeIndex === index ? "brightness(1.1)" : "none",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop: "20px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-white/5"
            style={{
              borderLeft: `4px solid ${COLORS[item.name as keyof typeof COLORS]}`,
            }}
          >
            <Typography variant="body" color="secondary">
              {item.name.replace(/_/g, " ").toUpperCase()}
            </Typography>
            <Typography variant="h4" weight="bold">
              {formatPercent(item.value)}
            </Typography>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
