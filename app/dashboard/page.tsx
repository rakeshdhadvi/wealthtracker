"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useStore } from "@/stores/useStore"
import { dashboardService } from "@/services/api"
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
import { LoadingScreen } from "@/components/ui/loading-screen"
import { AddInvestmentModal } from "@/components/modals/AddInvestmentModal"
import DemoDashboardPage from "./demo/page"

export default function DashboardPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const { dashboardData, setDashboardData } = useStore()
  const [showAddInvestmentModal, setShowAddInvestmentModal] = useState(false)

  useEffect(() => {
    if (user && !authLoading) {
      loadDashboardData()
    }
  }, [user, authLoading])

  const loadDashboardData = async () => {
    try {
      const data = await dashboardService.getDashboardData()
      setDashboardData(data)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    }
  }

  if (authLoading) {
    return <LoadingScreen />
  }

  if (!user) {
    return <DemoDashboardPage />
  }

  return (
    <div className="relative">
      <FloatingElements />
      <Section padding="lg" background="gray">
        <Container>
          <FadeIn>
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Typography variant="h2" weight="bold" className="mb-2">
                  Welcome back, {profile?.name || "User"}!
                </Typography>
                <Typography variant="body" color="secondary">
                  Here's your financial overview for today
                </Typography>
              </div>
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" onClick={() => setShowAddInvestmentModal(true)}>
                    Add Investment
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="primary" size="sm">
                    Generate Report
                  </Button>
                </motion.div>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="space-y-8">
            {/* Net Worth Overview */}
            <StaggerItem>
              <div className="mb-2 flex items-center justify-between">
                <Typography variant="h3" weight="bold">Net Worth</Typography>
                <Button variant="outline" size="sm">How it works</Button>
              </div>
              <Typography variant="body" color="secondary" className="mb-2">Track your total net worth in real time, including all assets and liabilities.</Typography>
              <NetWorthCard
                netWorth={dashboardData?.netWorth || 0}
                totalAssets={dashboardData?.totalAssets || 0}
                totalLiabilities={dashboardData?.totalLiabilities || 0}
                monthlyChange={dashboardData?.monthlyChange || 0}
              />
            </StaggerItem>

            {/* Performance Chart */}
            <StaggerItem>
              <div className="mb-2 flex items-center justify-between">
                <Typography variant="h3" weight="bold">Performance</Typography>
                <Button variant="outline" size="sm">How it works</Button>
              </div>
              <Typography variant="body" color="secondary" className="mb-2">Visualize your portfolio growth and returns over time.</Typography>
              <PerformanceChart />
            </StaggerItem>

            {/* Dashboard Grid */}
            <StaggerItem>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Typography variant="h3" weight="bold">Asset Allocation</Typography>
                      <Button variant="outline" size="sm">How it works</Button>
                    </div>
                    <Typography variant="body" color="secondary" className="mb-2">See how your investments are distributed across different asset classes.</Typography>
                    <AssetAllocationChart allocation={dashboardData?.assetAllocation || {}} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Typography variant="h3" weight="bold">Stock Watchlist</Typography>
                      <Button variant="outline" size="sm">Add Stock</Button>
                    </div>
                    <Typography variant="body" color="secondary" className="mb-2">Keep an eye on your favorite stocks and market movers.</Typography>
                    <StockWatchlist />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Typography variant="h3" weight="bold">Recent Transactions</Typography>
                      <Button variant="outline" size="sm">Add Transaction</Button>
                    </div>
                    <Typography variant="body" color="secondary" className="mb-2">View your latest investment and withdrawal activity.</Typography>
                    <RecentTransactions transactions={dashboardData?.recentTransactions || []} />
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-8">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Typography variant="h3" weight="bold">Upcoming Dues</Typography>
                      <Button variant="outline" size="sm">Add Due</Button>
                    </div>
                    <Typography variant="body" color="secondary" className="mb-2">Never miss a payment—track all your upcoming EMIs and bills.</Typography>
                    <UpcomingDues dues={dashboardData?.upcomingDues || []} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Typography variant="h3" weight="bold">Insights</Typography>
                      <Button variant="outline" size="sm">See More</Button>
                    </div>
                    <Typography variant="body" color="secondary" className="mb-2">Get smart suggestions and alerts to optimize your finances.</Typography>
                    <InsightsPanel insights={dashboardData?.insights || []} />
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Goals Section */}
            <StaggerItem>
              <div className="mb-2 flex items-center justify-between">
                <Typography variant="h3" weight="bold">Financial Goals</Typography>
                <Button variant="primary" size="sm">Add Goal</Button>
              </div>
              <Typography variant="body" color="secondary" className="mb-2">Set, track, and achieve your financial dreams with smart goal planning.</Typography>
              <GoalsProgress goals={dashboardData?.goals || []} />
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Add Investment Modal */}
      {showAddInvestmentModal && (
        <AddInvestmentModal
          onClose={() => setShowAddInvestmentModal(false)}
          onSuccess={() => {
            setShowAddInvestmentModal(false)
            loadDashboardData()
          }}
        />
      )}
    </div>
  )
}
