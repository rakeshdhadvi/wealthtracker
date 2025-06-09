"use client"

import { useState, useEffect } from "react"
import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui-system/AnimatedElements"
import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Filter,
  Search,
  BarChart3,
  PieChart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { AddInvestmentModal } from "@/components/modals/AddInvestmentModal"
import { assetService, dashboardService } from "@/services/api"
import { useStore } from "@/stores/useStore"
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import DemoInvestmentsPage from "./demo/page"

export default function InvestmentsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [showAddInvestmentModal, setShowAddInvestmentModal] = useState(false)
  const [investments, setInvestments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { setDashboardData } = useStore()

  useEffect(() => {
    if (user) {
      loadInvestments()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadInvestments = async () => {
    try {
      setLoading(true)
      const data = await assetService.getAssets()

      // Transform database data to display format
      const transformedInvestments =
        data?.map((asset: any) => ({
          id: asset.id,
          name: asset.name,
          type: getInvestmentTypeName(asset.asset_type),
          symbol: asset.symbol || asset.asset_type.toUpperCase(),
          quantity: asset.quantity,
          avgPrice: asset.average_price,
          currentPrice: asset.current_price,
          value: asset.current_value,
          change: asset.current_value - asset.quantity * asset.average_price,
          changePercent: ((asset.current_price - asset.average_price) / asset.average_price) * 100,
          category: asset.asset_type,
          institution: asset.institution,
          riskLevel: asset.risk_level,
          metadata: asset.metadata,
        })) || []

      setInvestments(transformedInvestments)
    } catch (error) {
      console.error("Error loading investments:", error)
    } finally {
      setLoading(false)
    }
  }

  const getInvestmentTypeName = (type: string) => {
    const typeMap: Record<string, string> = {
      stocks: "Stock",
      mutual_funds: "Mutual Fund",
      fixed_deposits: "Fixed Deposit",
      real_estate: "Real Estate",
      gold: "Gold",
      crypto: "Cryptocurrency",
      bonds: "Bond",
      ppf: "PPF/EPF",
    }
    return typeMap[type] || type
  }

  const handleInvestmentAdded = async () => {
    // Reload investments and dashboard data
    if (user) {
      await loadInvestments()
      try {
        const dashboardData = await dashboardService.getDashboardData()
        setDashboardData(dashboardData)
      } catch (error) {
        console.error("Error refreshing dashboard:", error)
      }
    }
  }

  // Use investments from state for calculations
  const getInvestmentCounts = () => {
    const counts: Record<string, number> = {
      all: investments.length,
    }
    investments.forEach(inv => {
      counts[inv.category] = (counts[inv.category] || 0) + 1;
    });
    return counts;
  };

  const counts = getInvestmentCounts();

  const tabs = [
    { id: "all", label: "All Investments", count: counts.all || 0 },
    { id: "stocks", label: "Stocks", count: counts.stocks || 0 },
    { id: "mutual_funds", label: "Mutual Funds", count: counts.mutual_funds || 0 },
    { id: "fixed_deposits", label: "Fixed Deposits", count: counts.fixed_deposits || 0 },
    { id: "real_estate", label: "Real Estate", count: counts.real_estate || 0 },
    { id: "gold", label: "Gold", count: counts.gold || 0 },
    { id: "crypto", label: "Cryptocurrency", count: counts.crypto || 0 },
    { id: "bonds", label: "Bonds", count: counts.bonds || 0 },
    { id: "ppf", label: "PPF/EPF", count: counts.ppf || 0 },
  ].filter(tab => tab.id === "all" || tab.count > 0); // Only show tabs with investments

  const filteredInvestments = activeTab === "all" ? investments : investments.filter((investment) => investment.category === activeTab)
  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0)
  const totalChange = investments.reduce((sum, inv) => sum + inv.change, 0)
  const totalChangePercent = totalValue > 0 ? (totalChange / (totalValue - totalChange)) * 100 : 0
  const highestInvestment = investments.length > 0
    ? investments.reduce((highest, current) => {
        return current.value > highest.value ? current : highest;
      })
    : null;
  const lowestInvestment = investments.length > 0
    ? investments.reduce((lowest, current) => {
        return current.value < lowest.value ? current : lowest;
      })
    : null;

  if (!user) {
    return <DemoInvestmentsPage />
  }

  if (loading) {
    return (
      <Section padding="lg" background="gray">
        <Container>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        </Container>
      </Section>
    )
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
                  Your Investment Portfolio
                </Typography>
                <Typography variant="body" color="secondary">
                  Track and manage all your investments in one place.
                </Typography>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
                  Filter
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={() => setShowAddInvestmentModal(true)}
                >
                  Add Investment
                </Button>
              </div>
            </div>
          </FadeIn>
          <StaggerContainer className="space-y-8">
            {/* Portfolio Summary */}
            <StaggerItem>
              <div className="grid md:grid-cols-3 gap-6">
                <InteractiveCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Typography variant="body" color="secondary">
                      Total Portfolio Value
                    </Typography>
                    <DollarSign className="w-5 h-5 text-green-500" />
                  </div>
                  <Typography variant="h3" weight="bold" className="mb-2">
                    ₹{totalValue.toLocaleString()}
                  </Typography>
                  <div className={`flex items-center ${totalChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {totalChange >= 0 ? (
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    )}
                    {totalChange >= 0 ? "+" : ""}
                    {totalChange.toLocaleString()} ({totalChangePercent.toFixed(2)}%)
                  </div>
                </InteractiveCard>

                <InteractiveCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Typography variant="body" color="secondary">
                      Highest Valued Investment
                    </Typography>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  {highestInvestment ? (
                    <>
                      <Typography variant="h3" weight="bold" className="mb-2">
                        {highestInvestment.name}
                      </Typography>
                      <div className="text-green-500">
                        ₹{highestInvestment.value.toLocaleString()}
                      </div>
                    </>
                  ) : (
                    <Typography variant="body" color="secondary">
                      No investments yet
                    </Typography>
                  )}
                </InteractiveCard>

                <InteractiveCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Typography variant="body" color="secondary">
                      Lowest Valued Investment
                    </Typography>
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  </div>
                  {lowestInvestment ? (
                    <>
                      <Typography variant="h3" weight="bold" className="mb-2">
                        {lowestInvestment.name}
                      </Typography>
                      <div className="text-red-500">
                        ₹{lowestInvestment.value.toLocaleString()}
                      </div>
                    </>
                  ) : (
                    <Typography variant="body" color="secondary">
                      No investments yet
                    </Typography>
                  )}
                </InteractiveCard>
              </div>
            </StaggerItem>

            {/* Investment List */}
            <StaggerItem>
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.label} ({tab.count})
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="divide-y">
                  {filteredInvestments.map((investment) => (
                    <div key={investment.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <Typography variant="h4" weight="semibold">
                            {investment.name}
                          </Typography>
                          <Typography variant="body" color="secondary">
                            {investment.type} • {investment.institution}
                          </Typography>
                        </div>
                        <div className="text-right">
                          <Typography variant="h4" weight="semibold">
                            ₹{investment.value.toLocaleString()}
                          </Typography>
                          <div className={`flex items-center justify-end ${investment.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {investment.change >= 0 ? (
                              <ArrowUpRight className="w-4 h-4 mr-1" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 mr-1" />
                            )}
                            {investment.change >= 0 ? "+" : ""}
                            {investment.change.toLocaleString()} ({investment.changePercent.toFixed(2)}%)
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </Section>

      <AddInvestmentModal
        isOpen={showAddInvestmentModal}
        onClose={() => setShowAddInvestmentModal(false)}
        onSuccess={handleInvestmentAdded}
      />
    </div>
  )
}
