"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Home, Car, DollarSign, GraduationCap, CreditCard, Building, Coins, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui-system/Button"
import { Typography } from "@/components/ui-system/Typography"
import { Input } from "@/components/ui/input"
import { liabilityService } from "@/services/api"

interface AddLiabilityModalProps {
  isOpen: boolean
  onClose: () => void
  onLiabilityAdded?: () => void
  demoMode?: boolean
}

const liabilityTypes = [
  {
    id: "home_loan",
    name: "Home Loan",
    icon: Home,
    color: "from-green-500 to-emerald-500",
    description: "Mortgage or housing loan",
  },
  {
    id: "car_loan",
    name: "Car Loan",
    icon: Car,
    color: "from-blue-500 to-cyan-500",
    description: "Vehicle financing loan",
  },
  {
    id: "personal_loan",
    name: "Personal Loan",
    icon: DollarSign,
    color: "from-purple-500 to-pink-500",
    description: "Unsecured personal loan",
  },
  {
    id: "education_loan",
    name: "Education Loan",
    icon: GraduationCap,
    color: "from-orange-500 to-red-500",
    description: "Student or education loan",
  },
  {
    id: "credit_card",
    name: "Credit Card",
    icon: CreditCard,
    color: "from-red-500 to-pink-500",
    description: "Credit card outstanding",
  },
  {
    id: "business_loan",
    name: "Business Loan",
    icon: Building,
    color: "from-indigo-500 to-purple-500",
    description: "Business or commercial loan",
  },
  {
    id: "gold_loan",
    name: "Gold Loan",
    icon: Coins,
    color: "from-yellow-500 to-orange-500",
    description: "Gold-backed loan",
  },
  {
    id: "other",
    name: "Other Loan",
    icon: MoreHorizontal,
    color: "from-gray-500 to-slate-500",
    description: "Other types of loans",
  },
]

export function AddLiabilityModal({ isOpen, onClose, onLiabilityAdded, demoMode }: AddLiabilityModalProps) {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    principal_amount: "",
    outstanding_amount: "",
    interest_rate: "",
    monthly_payment: "",
    tenure_months: "",
    institution: "",
    next_due_date: "",
  })
  const [loading, setLoading] = useState(false)

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    setStep(2)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const liabilityData = {
        name: formData.name,
        liability_type: selectedType,
        principal_amount: Number.parseFloat(formData.principal_amount),
        outstanding_amount: Number.parseFloat(formData.outstanding_amount),
        interest_rate: Number.parseFloat(formData.interest_rate),
        monthly_payment: Number.parseFloat(formData.monthly_payment),
        tenure_months: Number.parseInt(formData.tenure_months),
        institution: formData.institution,
        next_due_date: formData.next_due_date,
      }

      await liabilityService.createLiability(liabilityData)

      // Reset form
      setStep(1)
      setSelectedType("")
      setFormData({
        name: "",
        principal_amount: "",
        outstanding_amount: "",
        interest_rate: "",
        monthly_payment: "",
        tenure_months: "",
        institution: "",
        next_due_date: "",
      })

      onLiabilityAdded?.()
      onClose()
    } catch (error) {
      console.error("Error creating liability:", error)
      alert("Error creating liability. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const selectedTypeData = liabilityTypes.find((type) => type.id === selectedType)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex min-h-full items-start justify-center p-4 pt-20 pb-4">
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          style={{ maxHeight: "calc(100vh - 8rem)" }}
        >
          <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 8rem)" }}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <Typography variant="h3" weight="bold">
                Add Liability
              </Typography>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="h4" weight="bold" className="mb-2">
                      What type of liability do you want to add?
                    </Typography>
                    <Typography variant="body" color="secondary" className="mb-6">
                      Choose the category that best describes your loan or debt
                    </Typography>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {liabilityTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          onClick={() => handleTypeSelect(type.id)}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-red-300 dark:hover:border-red-600 transition-all duration-200 text-left group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={demoMode}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                            >
                              <type.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <Typography variant="h5" weight="bold" className="mb-1">
                                {type.name}
                              </Typography>
                              <Typography variant="body" color="secondary" className="text-sm">
                                {type.description}
                              </Typography>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && selectedTypeData && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${selectedTypeData.color} flex items-center justify-center text-white`}
                      >
                        <selectedTypeData.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <Typography variant="h4" weight="bold">
                          {selectedTypeData.name} Details
                        </Typography>
                        <Typography variant="body" color="secondary">
                          Enter your {selectedTypeData.name.toLowerCase()} information
                        </Typography>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Liability Name *</label>
                          <Input
                            type="text"
                            placeholder={`My ${selectedTypeData.name}`}
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            disabled={demoMode}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Institution</label>
                          <Input
                            type="text"
                            placeholder="Bank or lender name"
                            value={formData.institution}
                            onChange={(e) => handleInputChange("institution", e.target.value)}
                            disabled={demoMode}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Principal Amount *</label>
                          <Input
                            type="number"
                            placeholder="Original loan amount"
                            value={formData.principal_amount}
                            onChange={(e) => handleInputChange("principal_amount", e.target.value)}
                            disabled={demoMode}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Outstanding Amount *</label>
                          <Input
                            type="number"
                            placeholder="Current outstanding balance"
                            value={formData.outstanding_amount}
                            onChange={(e) => handleInputChange("outstanding_amount", e.target.value)}
                            disabled={demoMode}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Interest Rate (%) *</label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Annual interest rate"
                            value={formData.interest_rate}
                            onChange={(e) => handleInputChange("interest_rate", e.target.value)}
                            disabled={demoMode}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Monthly Payment *</label>
                          <Input
                            type="number"
                            placeholder="EMI amount"
                            value={formData.monthly_payment}
                            onChange={(e) => handleInputChange("monthly_payment", e.target.value)}
                            disabled={demoMode}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Tenure (Months)</label>
                          <Input
                            type="number"
                            placeholder="Total tenure"
                            value={formData.tenure_months}
                            onChange={(e) => handleInputChange("tenure_months", e.target.value)}
                            disabled={demoMode}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Next Due Date</label>
                        <Input
                          type="date"
                          value={formData.next_due_date}
                          onChange={(e) => handleInputChange("next_due_date", e.target.value)}
                          disabled={demoMode}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1" disabled={demoMode}>
                        Back
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={loading || !formData.name || !formData.principal_amount || demoMode}
                        className="flex-1"
                      >
                        {loading ? "Adding..." : "Add Liability"}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
