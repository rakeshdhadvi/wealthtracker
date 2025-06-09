"use client"

import type React from "react"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "caption" | "overline"
  weight?: "normal" | "medium" | "semibold" | "bold" | "black"
  color?: "primary" | "secondary" | "muted" | "accent"
  gradient?: boolean
  animate?: boolean
}

const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = "body",
      weight = "normal",
      color = "primary",
      gradient = false,
      animate = false,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      h1: "text-5xl md:text-6xl lg:text-7xl",
      h2: "text-4xl md:text-5xl lg:text-6xl",
      h3: "text-3xl md:text-4xl lg:text-5xl",
      h4: "text-2xl md:text-3xl",
      h5: "text-xl md:text-2xl",
      h6: "text-lg md:text-xl",
      body: "text-base md:text-lg",
      caption: "text-sm",
      overline: "text-xs uppercase tracking-wider",
    }

    const weights = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    }

    const colors = {
      primary: "text-gray-900",
      secondary: "text-gray-600",
      muted: "text-gray-500",
      accent: "text-blue-600",
    }

    const gradientStyle = gradient ? "bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent" : ""

    const Component = variant.startsWith("h") ? (variant as keyof JSX.IntrinsicElements) : "p"

    const content = (
      <Component
        ref={ref as any}
        className={cn(variants[variant], weights[weight], gradient ? gradientStyle : colors[color], className)}
        {...props}
      >
        {children}
      </Component>
    )

    if (animate) {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {content}
        </motion.div>
      )
    }

    return content
  },
)

Typography.displayName = "Typography"

export { Typography }
