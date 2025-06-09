"use client"

import { useState } from "react"
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
import Link from "next/link"

// Demo sample data
const sampleLiabilities = [
  { id: "1", name: "Home Loan - HDFC", type: "Home Loan", category: "home_loan" as const, principal: 5000000, outstanding: 4500000, interestRate: 7.5, monthlyPayment: 35000, nextDueDate: "2024-07-01", institution: "HDFC Bank" },
  { id: "2", name: "Car Loan - SBI", type: "Car Loan", category: "car_loan" as const, principal: 1000000, outstanding: 600000, interestRate: 9.0, monthlyPayment: 15000, nextDueDate: "2024-07-05", institution: "SBI" },
  { id: "3", name: "Personal Loan - Axis", type: "Personal Loan", category: "personal_loan" as const, principal: 500000, outstanding: 200000, interestRate: 12.0, monthlyPayment: 10000, nextDueDate: "2024-07-10", institution: "Axis Bank" },
  { id: "4", name: "Education Loan - ICICI", type: "Education Loan", category: "education_loan" as const, principal: 800000, outstanding: 750000, interestRate: 8.5, monthlyPayment: 8000, nextDueDate: "2024-07-15", institution: "ICICI Bank" },
  { id: "5", name: "Credit Card - Amex", type: "Credit Card", category: "credit_card" as const, principal: 100000, outstanding: 50000, interestRate: 2.5, monthlyPayment: 5000, nextDueDate: "2024-07-20", institution: "American Express" },
  { id: "6", name: "Business Loan - Canara", type: "Business Loan", category: "business_loan" as const, principal: 2000000, outstanding: 1800000, interestRate: 10.0, monthlyPayment: 25000, nextDueDate: "2024-07-25", institution: "Canara Bank" },
  { id: "7", name: "Gold Loan - Muthoot", type: "Gold Loan", category: "gold_loan" as const, principal: 300000, outstanding: 150000, interestRate: 11.0, monthlyPayment: 7000, nextDueDate: "2024-07-28", institution: "Muthoot Finance" },
  { id: "8", name: "Other Loan - Family", type: "Other Loan", category: "other" as const, principal: 200000, outstanding: 100000, interestRate: 0, monthlyPayment: 2000, nextDueDate: "2024-07-30", institution: "Family" },
]

export default function DemoLiabilitiesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const liabilities = sampleLiabilities

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
                  <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />} disabled>
                    Filter
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Plus className="w-4 h-4" />}
                    disabled={true}
                  >
                    Add Liability
                  </Button>
                </motion.div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="text-center py-12 border border-dashed rounded-lg bg-white/5 mb-8">
              <Typography variant="h4" weight="semibold" className="mb-2">
                Explore Your Liabilities in Detail
              </Typography>
              <Typography variant="body" color="secondary" className="mb-6">
                See how you can effectively track and manage all your loans and debts. Sign up to personalize your experience!
              </Typography>
              <div className="flex justify-center gap-4">
                <Link href="/signup"><Button variant="primary" size="lg">Get Started Free</Button></Link>
                <Link href="/login"><Button variant="outline" size="lg">Log In</Button></Link>
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
    </div>
  )
} 