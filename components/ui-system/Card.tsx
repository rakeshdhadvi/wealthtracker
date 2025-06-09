"use client"

import type React from "react"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "minimal"
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", hover = false, children, ...props }, ref) => {
    const baseStyles = "bg-white rounded-2xl transition-all duration-300 ease-in-out"

    const variants = {
      default: "shadow-md",
      elevated: "shadow-xl",
      outlined: "border-2 border-gray-200 shadow-sm",
      minimal: "shadow-sm",
    }

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    }

    const hoverStyles = hover ? "hover:shadow-xl hover:-translate-y-1" : ""

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], hoverStyles, className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  },
)

Card.displayName = "Card"

export { Card }
