"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  glowOnHover?: boolean
  tiltOnHover?: boolean
  scaleOnHover?: boolean
}

export function InteractiveCard({
  children,
  className,
  glowOnHover = true,
  tiltOnHover = false,
  scaleOnHover = true,
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-300",
        glowOnHover && "hover:shadow-2xl hover:shadow-blue-500/20",
        className,
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: scaleOnHover ? 1.02 : 1,
        rotateX: tiltOnHover ? 5 : 0,
        rotateY: tiltOnHover ? 5 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
        }}
        transition={{ duration: 1.5, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>

      {/* Shimmer effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  )
}
