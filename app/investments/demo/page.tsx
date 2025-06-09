"use client"

import { useState } from "react"
import { Container, Section } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui-system/AnimatedElements"
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
import Link from "next/link"

// Demo sample data
const sampleInvestments = [
  { id: "1", name: "HDFC Bank", type: "Stock", symbol: "HDFC", quantity: 50, avgPrice: 1500, currentPrice: 1700, value: 85000, change: 10000, changePercent: 13.3, category: "stocks" as const, institution: "Zerodha", riskLevel: "medium" as const },
  { id: "2", name: "Nippon India Growth Fund", type: "Mutual Fund", symbol: "NIGF", quantity: 100, avgPrice: 80, currentPrice: 120, value: 12000, change: 4000, changePercent: 50, category: "mutual_funds" as const, institution: "Groww", riskLevel: "low" as const },
  { id: "3", name: "SBI Gold ETF", type: "ETF", symbol: "SBIGOLD", quantity: 20, avgPrice: 500, currentPrice: 600, value: 12000, change: 2000, changePercent: 20, category: "gold" as const, institution: "Upstox", riskLevel: "low" as const },
  { id: "4", name: "PNB Fixed Deposit", type: "Fixed Deposit", symbol: "FD", quantity: 1, avgPrice: 50000, currentPrice: 50000, value: 50000, change: 0, changePercent: 0, category: "fixed_deposits" as const, institution: "PNB", riskLevel: "low" as const },
  { id: "5", name: "Prestige Falcon City", type: "Real Estate", symbol: "PFC", quantity: 1, avgPrice: 12000000, currentPrice: 13000000, value: 13000000, change: 1000000, changePercent: 8.33, category: "real_estate" as const, institution: "Self", riskLevel: "high" as const },
  { id: "6", name: "Bitcoin", type: "Cryptocurrency", symbol: "BTC", quantity: 0.1, avgPrice: 3000000, currentPrice: 4000000, value: 400000, change: 100000, changePercent: 33.33, category: "crypto" as const, institution: "CoinDCX", riskLevel: "high" as const },
  { id: "7", name: "Government of India Bond", type: "Bond", symbol: "GOI", quantity: 5, avgPrice: 1000, currentPrice: 1050, value: 5250, change: 250, changePercent: 5, category: "bonds" as const, institution: "RBI", riskLevel: "low" as const },
  { id: "8", name: "Public Provident Fund", type: "PPF/EPF", symbol: "PPF", quantity: 1, avgPrice: 200000, currentPrice: 215000, value: 215000, change: 15000, changePercent: 7.5, category: "ppf" as const, institution: "Post Office", riskLevel: "low" as const },
]

export default function DemoInvestmentsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const investments = sampleInvestments

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
                  onClick={() => {}}
                  disabled={true}
                >
                  Add Investment
                </Button>
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="text-center py-12 border border-dashed rounded-lg bg-white/5 mb-8">
              <Typography variant="h4" weight="semibold" className="mb-2">
                Explore Your Investments in Detail
              </Typography>
              <Typography variant="body" color="secondary" className="mb-6">
                See how you can effectively track and manage all your assets. Sign up to personalize your experience!
              </Typography>
              <div className="flex justify-center gap-4">
                <Link href="/signup"><Button variant="primary" size="lg">Get Started Free</Button></Link>
                <Link href="/login"><Button variant="outline" size="lg">Log In</Button></Link>
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
    </div>
  )
} 