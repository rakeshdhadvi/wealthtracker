"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

export function Container({ className, size = "lg", children, ...props }: ContainerProps) {
  const sizes = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  }

  return (
    <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", sizes[size], className)} {...props}>
      {children}
    </div>
  )
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  background?: "white" | "gray" | "gradient"
}

export function Section({ className, padding = "lg", background = "white", children, ...props }: SectionProps) {
  const paddings = {
    none: "",
    sm: "py-8",
    md: "py-12",
    lg: "py-20",
    xl: "py-32",
  }

  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    gradient: "bg-gradient-to-br from-gray-50 to-white",
  }

  return (
    <section className={cn(paddings[padding], backgrounds[background], className)} {...props}>
      {children}
    </section>
  )
}

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: "sm" | "md" | "lg" | "xl"
  responsive?: boolean
}

export function Grid({ className, cols = 3, gap = "md", responsive = true, children, ...props }: GridProps) {
  const colsMap = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    6: "grid-cols-6",
    12: "grid-cols-12",
  }

  const gaps = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
  }

  const responsiveClasses = responsive ? "grid-cols-1 md:grid-cols-2 lg:" + colsMap[cols] : colsMap[cols]

  return (
    <div className={cn("grid", responsiveClasses, gaps[gap], className)} {...props}>
      {children}
    </div>
  )
}
