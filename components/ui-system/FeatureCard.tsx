"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "./Card"
import { Typography } from "./Typography"
import { HoverLift } from "./AnimatedElements"

interface FeatureCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  variant?: "default" | "minimal" | "highlighted"
}

export function FeatureCard({ icon, title, description, action, variant = "default" }: FeatureCardProps) {
  const variants = {
    default: "border-2 border-transparent hover:border-gray-200",
    minimal: "shadow-none border border-gray-100",
    highlighted: "bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100",
  }

  return (
    <HoverLift>
      <Card className={`h-full ${variants[variant]}`} padding="lg">
        {icon && (
          <motion.div
            className="mb-6 text-4xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {icon}
          </motion.div>
        )}

        <Typography variant="h5" weight="bold" className="mb-4">
          {title}
        </Typography>

        <Typography variant="body" color="secondary" className="mb-6">
          {description}
        </Typography>

        {action && (
          <button onClick={action.onClick} className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            {action.label} →
          </button>
        )}
      </Card>
    </HoverLift>
  )
}
