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
  TrendingDown,
  Plus,
  Filter,
  Search,
  BarChart3,
  PieChart,
  DollarSign,
  ArrowDownRight,
  Calendar,
  CreditCard,
  Home,
  Car,
  GraduationCap,
  Building,
  Coins,
  MoreHorizontal,
} from "lucide-react"
import { AddLiabilityModal } from "@/components/modals/AddLiabilityModal"
import { liabilityService, dashboardService } from "@/services/api"
import { useStore } from "@/stores/useStore"
import { useAuth } from "@/hooks/useAuth"
import DemoLiabilitiesPage from "./demo/page"

export default function LiabilitiesPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [showAddLiabilityModal, setShowAddLiabilityModal] = useState(false)
  const [liabilities, setLiabilities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { setDashboardData } = useStore()

  useEffect(() => {
    if (user) {
      loadLiabilities()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadLiabilities = async () => {
    try {
      setLoading(true)
      const data = await liabilityService.getLiabilities()

      // Transform database data to display format
      const transformedLiabilities =
        data?.map((liability: any) => ({
          id: liability.id,
          name: liability.name,
          type: getLiabilityTypeName(liability.liability_type),
          category: liability.liability_type,
          principal: liability.principal_amount,
          outstanding: liability.outstanding_amount,
          interestRate: liability.interest_rate,
          monthlyPayment: liability.monthly_payment,
          nextDueDate: liability.next_due_date,
          institution: liability.institution,
          metadata: liability.metadata,
        })) || []

      setLiabilities(transformedLiabilities)
    } catch (error) {
      console.error("Error loading liabilities:", error)
    } finally {
      setLoading(false)
    }
  }

  const getLiabilityTypeName = (type: string) => {
    const typeMap: Record<string, string> = {
      home_loan: "Home Loan",
      car_loan: "Car Loan",
      personal_loan: "Personal Loan",
      education_loan: "Education Loan",
      credit_card: "Credit Card",
      business_loan: "Business Loan",
      gold_loan: "Gold Loan",
      other: "Other Loan",
    }
    return typeMap[type] || type
  }

  const getLiabilityIcon = (type: string) => {
    const iconMap: Record<string, any> = {
      home_loan: Home,
      car_loan: Car,
      personal_loan: DollarSign,
      education_loan: GraduationCap,
      credit_card: CreditCard,
      business_loan: Building,
      gold_loan: Coins,
      other: MoreHorizontal,
    }
    return iconMap[type] || MoreHorizontal
  }

  const handleLiabilityAdded = async () => {
    // Reload liabilities and dashboard data
    await loadLiabilities()

    // Refresh dashboard data
    try {
      const dashboardData = await dashboardService.getDashboardData()
      setDashboardData(dashboardData)
    } catch (error) {
      console.error("Error refreshing dashboard:", error)
    }
  }

  if (!user) {
    return <DemoLiabilitiesPage />
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

  const getLiabilityCounts = () => {
    const counts: Record<string, number> = {
      all: liabilities.length,
    }
    liabilities.forEach(liability => {
      counts[liability.category] = (counts[liability.category] || 0) + 1;
    });
    return counts;
  };

  const counts = getLiabilityCounts();

  const tabs = [
    { id: "all", label: "All Liabilities", count: counts.all || 0 },
    { id: "home_loan", label: "Home Loans", count: counts.home_loan || 0 },
    { id: "car_loan", label: "Car Loans", count: counts.car_loan || 0 },
    { id: "personal_loan", label: "Personal Loans", count: counts.personal_loan || 0 },
    { id: "education_loan", label: "Education Loans", count: counts.education_loan || 0 },
    { id: "credit_card", label: "Credit Cards", count: counts.credit_card || 0 },
    { id: "business_loan", label: "Business Loans", count: counts.business_loan || 0 },
    { id: "gold_loan", label: "Gold Loans", count: counts.gold_loan || 0 },
    { id: "other", label: "Other Loans", count: counts.other || 0 },
  ].filter(tab => tab.id === "all" || tab.count > 0);

  const filteredLiabilities = activeTab === "all" ? liabilities : liabilities.filter((liability) => liability.category === activeTab)
  const totalOutstanding = liabilities.reduce((sum, liability) => sum + liability.outstanding, 0)
  const totalMonthlyPayment = liabilities.reduce((sum, liability) => sum + liability.monthlyPayment, 0)
  const averageInterestRate = liabilities.length > 0
    ? liabilities.reduce((sum, liability) => sum + liability.interestRate, 0) / liabilities.length
    : 0

  const highestDebt = liabilities.length > 0
    ? liabilities.reduce((highest, current) => {
        return current.outstanding > highest.outstanding ? current : highest;
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
                  Your Liabilities
                </Typography>
                <Typography variant="body" color="secondary">
                  Track and manage all your loans and debts
                </Typography>
              </div>
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
                    Filter
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Plus className="w-4 h-4" />}
                    onClick={() => setShowAddLiabilityModal(true)}
                  >
                    Add Liability
                  </Button>
                </motion.div>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="space-y-8">
            {/* Liability Summary */}
            <StaggerItem>
              <div className="grid md:grid-cols-4 gap-6">
                <InteractiveCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Typography variant="body" color="secondary">
                      Total Outstanding
                    </Typography>
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  </div>
                  <Typography variant="h3" weight="bold" className="mb-2 text-red-600">
                    ₹{totalOutstanding.toLocaleString()}
                  </Typography>
                  <Typography variant="body" color="secondary" className="text-sm">
                    Across {liabilities.length} liabilities
                  </Typography>
                </InteractiveCard>

                <InteractiveCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Typography variant="body" color="secondary">
                      Monthly Payments
                    </Typography>
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                  <Typography variant="h3" weight="bold" className="mb-2 text-blue-600">
                    ₹{totalMonthlyPayment.toLocaleString()}
                  </Typography>
                  <Typography variant="body" color="secondary" className="text-sm">
                    Total monthly obligations
                  </Typography>
                </InteractiveCard>

                <InteractiveCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Typography variant="body" color="secondary">
                      Average Interest Rate
                    </Typography>
                    <PieChart className="w-5 h-5 text-purple-500" />
                  </div>
                  <Typography variant="h3" weight="bold" className="mb-2 text-purple-600">
                    {averageInterestRate.toFixed(1)}%
                  </Typography>
                  <Typography variant="body" color="secondary" className="text-sm">
                    Weighted average across all loans
                  </Typography>
                </InteractiveCard>

                <InteractiveCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Typography variant="body" color="secondary">
                      Highest Debt
                    </Typography>
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  </div>
                  {highestDebt ? (
                    <>
                      <Typography variant="h3" weight="bold" className="mb-2 text-red-600">
                        {highestDebt.name}
                      </Typography>
                      <Typography variant="body" color="secondary" className="text-sm">
                        ₹{highestDebt.outstanding.toLocaleString()}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body" color="secondary">
                      No liabilities yet
                    </Typography>
                  )}
                </InteractiveCard>
              </div>
            </StaggerItem>

            {/* Liability List */}
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
                  {filteredLiabilities.map((liability) => (
                    <div key={liability.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <Typography variant="h4" weight="semibold">
                            {liability.name}
                          </Typography>
                          <Typography variant="body" color="secondary">
                            {liability.type} • {liability.institution}
                          </Typography>
                        </div>
                        <div className="text-right">
                          <Typography variant="h4" weight="semibold" className="text-red-600">
                            ₹{liability.outstanding.toLocaleString()}
                          </Typography>
                          <div className="flex items-center justify-end text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            Due: {new Date(liability.nextDueDate).toLocaleDateString()}
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

      <AddLiabilityModal
        isOpen={showAddLiabilityModal}
        onClose={() => setShowAddLiabilityModal(false)}
        onSuccess={handleLiabilityAdded}
      />
    </div>
  )
}
