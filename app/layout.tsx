import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { DarkThemeBackground } from "@/components/ui/dark-theme-background"
import type { Metadata } from "next"
import { ScrollToTop } from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WealthTracker - Indian Finance Management Platform",
  description: "Track all your assets and liabilities in one unified dashboard. Built for Indian investors.",
  keywords: "finance, wealth management, investment tracking, Indian stocks, mutual funds",
  authors: [{ name: "WealthTracker Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3B82F6",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ScrollToTop />
          <DarkThemeBackground />
          <Header />
          <main className="relative z-10">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
