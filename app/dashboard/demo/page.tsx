"use client"

import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { NetWorthCard } from "@/components/dashboard/NetWorthCard"
import { AssetAllocationChart } from "@/components/dashboard/AssetAllocationChart"
import { RecentTransactions } from "@/components/dashboard/RecentTransactions"
import { UpcomingDues } from "@/components/dashboard/UpcomingDues"
import { InsightsPanel } from "@/components/dashboard/InsightsPanel"
import { GoalsProgress } from "@/components/dashboard/GoalsProgress"
import { PerformanceChart } from "@/components/dashboard/PerformanceChart"
import { StockWatchlist } from "@/components/dashboard/StockWatchlist"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui-system/AnimatedElements"
import { FloatingElements } from "@/components/ui/floating-elements"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

export default function DemoDashboardPage() {
  const [showAuthModal, setShowAuthModal] = useState(false)

  // Sample data
  const sampleTransactions = [
    { id: "1", type: "buy" as const, amount: 25000, description: "Bought HDFC Bank Shares", date: "2024-06-01", asset: "HDFC" },
    { id: "2", type: "sell" as const, amount: 10000, description: "Sold Reliance Shares", date: "2024-05-28", asset: "Reliance" },
    { id: "3", type: "dividend" as const, amount: 1200, description: "Dividend from TCS", date: "2024-05-20", asset: "TCS" },
  ]
  const sampleDues = [
    { id: "1", name: "Home Loan EMI", amount: 25000, dueDate: "2024-06-10", type: "emi" as const, status: "pending" as const },
    { id: "2", name: "Credit Card Bill", amount: 8000, dueDate: "2024-06-15", type: "credit_card" as const, status: "pending" as const },
  ]
  const sampleInsights = [
    { id: "1", title: "Great Savings!", message: "You saved 20% more this month.", type: "achievement" as const, priority: "high" as const, isRead: false, createdAt: "2024-06-01" },
    { id: "2", title: "Diversify Portfolio", message: "Consider adding more mutual funds.", type: "suggestion" as const, priority: "medium" as const, isRead: false, createdAt: "2024-05-30" },
  ]
  const sampleGoals = [
    { id: "1", name: "Buy a House", progress: 40, target_amount: 1000000, current_amount: 400000, target_date: "2026-12-31", priority: "high" as const, category: "house" as const },
    { id: "2", name: "Retirement", progress: 60, target_amount: 5000000, current_amount: 3000000, target_date: "2045-01-01", priority: "medium" as const, category: "retirement" as const },
  ]

  return (
    <div className="relative">
      <FloatingElements />
      <Section padding="lg" background="gray">
        <Container>
          <FadeIn>
            <div className="mb-8 text-center">
              <Typography variant="h2" weight="bold" className="mb-2">
                Explore the WealthTracker Dashboard
              </Typography>
              <Typography variant="body" color="secondary" className="mb-6">
                See how you can track your net worth, investments, liabilities, and more—all in one place. Sign up to unlock your personalized dashboard!
              </Typography>
              <div className="flex justify-center gap-4 mb-8">
                <Link href="/signup"><Button variant="primary" size="lg">Get Started Free</Button></Link>
                <Link href="/login"><Button variant="outline" size="lg">Log In</Button></Link>
              </div>
            </div>
          </FadeIn>
          <StaggerContainer className="space-y-8">
            {/* Demo Net Worth Overview */}
            <StaggerItem>
              <div className="mb-2 flex items-center justify-between">
                <Typography variant="h3" weight="bold">Net Worth</Typography>
                <Button variant="outline" size="sm" disabled>How it works</Button>
              </div>
              <Typography variant="body" color="secondary" className="mb-2">Track your total net worth in real time, including all assets and liabilities.</Typography>
              <NetWorthCard
                netWorth={1234567}
                totalAssets={1500000}
                totalLiabilities={265433}
                monthlyChange={2.3}
              />
            </StaggerItem>
            {/* Demo Performance Chart */}
            <StaggerItem>
              <div className="mb-2 flex items-center justify-between">
                <Typography variant="h3" weight="bold">Performance</Typography>
                <Button variant="outline" size="sm" disabled>How it works</Button>
              </div>
              <Typography variant="body" color="secondary" className="mb-2">Visualize your portfolio growth and returns over time.</Typography>
              <PerformanceChart />
            </StaggerItem>
            {/* Demo Dashboard Grid */}
            <StaggerItem>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Typography variant="h3" weight="bold">Asset Allocation</Typography>
                      <Button variant="outline" size="sm" disabled>How it works</Button>
                    </div>
                    <Typography variant="body" color="secondary" className="mb-2">See how your investments are distributed across different asset classes.</Typography>
                    <AssetAllocationChart allocation={{ stocks: 50, mutual_funds: 30, gold: 10, real_estate: 10, fixed_deposits: 0, crypto: 0, ppf: 0, bonds: 0 }} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Typography variant="h3" weight="bold">Stock Watchlist</Typography>
                      <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>Add Stock</Button>
                    </div>
                    <Typography variant="body" color="secondary" className="mb-2">Keep an eye on your favorite stocks and market movers.</Typography>
                    <StockWatchlist />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Typography variant="h3" weight="bold">Recent Transactions</Typography>
                      <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>Add Transaction</Button>
                    </div>
                    <Typography variant="body" color="secondary" className="mb-2">View your latest investment and withdrawal activity.</Typography>
                    <RecentTransactions transactions={sampleTransactions} />
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-8">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Typography variant="h3" weight="bold">Upcoming Dues</Typography>
                      <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>Add Due</Button>
                    </div>
                    <Typography variant="body" color="secondary" className="mb-2">Never miss a payment—track all your upcoming EMIs and bills.</Typography>
                    <UpcomingDues dues={sampleDues} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Typography variant="h3" weight="bold">Insights</Typography>
                      <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>See More</Button>
                    </div>
                    <Typography variant="body" color="secondary" className="mb-2">Get smart suggestions and alerts to optimize your finances.</Typography>
                    <InsightsPanel insights={sampleInsights} />
                  </div>
                </div>
              </div>
            </StaggerItem>
            {/* Demo Goals Section */}
            <StaggerItem>
              <div className="mb-2 flex items-center justify-between">
                <Typography variant="h3" weight="bold">Financial Goals</Typography>
                <Button variant="primary" size="sm" onClick={() => setShowAuthModal(true)}>Add Goal</Button>
              </div>
              <Typography variant="body" color="secondary" className="mb-2">Set, track, and achieve your financial dreams with smart goal planning.</Typography>
              <GoalsProgress goals={sampleGoals} demo={true} />
            </StaggerItem>
          </StaggerContainer>
          {/* Call to action at the bottom */}
          <div className="mt-12 text-center">
            <Typography variant="h4" weight="bold" className="mb-4">Ready to take control of your finances?</Typography>
            <Link href="/signup"><Button variant="primary" size="lg">Get Started Free</Button></Link>
            <Typography variant="body" color="secondary" className="mt-2">Sign up now to unlock your personalized dashboard and all features!</Typography>
          </div>
        </Container>
      </Section>
      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 text-center max-w-md w-full">
            <Typography variant="h3" weight="bold" className="mb-4">Sign Up or Log In</Typography>
            <Typography variant="body" color="secondary" className="mb-6">Create your free account to add investments, set goals, and unlock all features!</Typography>
            <div className="flex justify-center gap-4 mb-4">
              <Link href="/signup"><Button variant="primary">Sign Up Free</Button></Link>
              <Link href="/login"><Button variant="outline">Log In</Button></Link>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowAuthModal(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
} 