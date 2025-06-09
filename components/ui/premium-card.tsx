"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface PremiumCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: "blue" | "purple" | "green" | "red" | "gold"
  animated?: boolean
}

export function PremiumCard({ children, className, glowColor = "blue", animated = true }: PremiumCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()

  const glowClasses = {
    blue: theme === "dark" ? "glow-blue" : "",
    purple: theme === "dark" ? "glow-purple" : "",
    green: theme === "dark" ? "glow-green" : "",
    red: theme === "dark" ? "glow-red" : "",
    gold: theme === "dark" ? "glow-gold" : "",
  }

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl transition-all duration-500",
        theme === "dark" ? "premium-card card-hover" : "bg-card border border-border/50 hover:shadow-xl",
        isHovered && theme === "dark" ? glowClasses[glowColor] : "",
        className,
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={
        animated
          ? {
              scale: 1.02,
              rotateX: 2,
              rotateY: 2,
            }
          : {}
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Animated border for dark theme */}
      {theme === "dark" && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(45deg, 
              rgba(59, 130, 246, ${isHovered ? 0.4 : 0.2}), 
              rgba(139, 92, 246, ${isHovered ? 0.4 : 0.2}), 
              rgba(236, 72, 153, ${isHovered ? 0.4 : 0.2}), 
              rgba(59, 130, 246, ${isHovered ? 0.4 : 0.2})
            )`,
            backgroundSize: "300% 300%",
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMaskComposite: "xor",
          }}
          animate={{
            backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
          }}
          transition={{ duration: 2, ease: "linear" }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>

      {/* Shimmer effect on hover */}
      {isHovered && theme === "dark" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      )}

      {/* Floating glow orb */}
      {theme === "dark" && (
        <motion.div
          className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  )
}
