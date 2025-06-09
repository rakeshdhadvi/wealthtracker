"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  glowColor?: "blue" | "purple" | "green" | "red" | "gold"
  children: React.ReactNode
}

export function NeonButton({
  variant = "primary",
  size = "md",
  glowColor = "blue",
  className,
  children,
  ...props
}: NeonButtonProps) {
  const { theme } = useTheme()

  const baseClasses =
    "relative overflow-hidden font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  }

  const lightVariants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
    ghost: "text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
  }

  const darkVariants = {
    primary: "btn-dark text-white",
    secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-600",
    outline: "border-2 border-blue-500 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300",
    ghost: "text-slate-100 hover:bg-slate-800/50",
  }

  const glowColors = {
    blue: "shadow-blue-500/50",
    purple: "shadow-purple-500/50",
    green: "shadow-green-500/50",
    red: "shadow-red-500/50",
    gold: "shadow-yellow-500/50",
  }

  return (
    <motion.button
      className={cn(
        baseClasses,
        sizeClasses[size],
        theme === "dark" ? darkVariants[variant] : lightVariants[variant],
        theme === "dark" && variant === "primary" && `hover:${glowColors[glowColor]}`,
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Dark theme glow effect */}
      {theme === "dark" && variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundSize: "200% 100%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">{children}</span>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}
