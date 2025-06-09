"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui-system/Button"
import { Typography } from "@/components/ui-system/Typography"
import { goalService } from "@/services/api"
import { useStore } from "@/stores/useStore"
import {
  X,
  Target,
  Home,
  Car,
  GraduationCap,
  Plane,
  Heart,
  Shield,
  Briefcase,
  Baby,
  Calendar,
  DollarSign,
  TrendingUp,
} from "lucide-react"

interface AddGoalModalProps {
  isOpen: boolean
  onClose: () => void
}

const goalTemplates = [
  {
    id: "emergency",
    name: "Emergency Fund",
    icon: Shield,
    description: "Build a safety net for unexpected expenses",
    suggestedAmount: 500000,
    timeframe: 12,
    color: "bg-red-500",
    tips: "Aim for 6-12 months of expenses",
    category: "emergency" as const,
  },
  {
    id: "house",
    name: "Buy a House",
    icon: Home,
    description: "Save for your dream home down payment",
    suggestedAmount: 2000000,
    timeframe: 60,
    color: "bg-blue-500",
    tips: "Consider 20% down payment + registration costs",
    category: "house" as const,
  },
  {
    id: "car",
    name: "Buy a Car",
    icon: Car,
    description: "Purchase your next vehicle",
    suggestedAmount: 800000,
    timeframe: 24,
    color: "bg-green-500",
    tips: "Include insurance and registration costs",
    category: "car" as const,
  },
  {
    id: "education",
    name: "Education Fund",
    icon: GraduationCap,
    description: "Fund higher education or courses",
    suggestedAmount: 1500000,
    timeframe: 48,
    color: "bg-purple-500",
    tips: "Consider inflation in education costs",
    category: "education" as const,
  },
  {
    id: "vacation",
    name: "Dream Vacation",
    icon: Plane,
    description: "Plan your perfect getaway",
    suggestedAmount: 300000,
    timeframe: 18,
    color: "bg-orange-500",
    tips: "Include flights, hotels, and activities",
    category: "vacation" as const,
  },
  {
    id: "wedding",
    name: "Wedding",
    icon: Heart,
    description: "Plan your special day",
    suggestedAmount: 1200000,
    timeframe: 24,
    color: "bg-pink-500",
    tips: "Budget for venue, catering, and photography",
    category: "wedding" as const,
  },
  {
    id: "retirement",
    name: "Retirement Fund",
    icon: Briefcase,
    description: "Secure your golden years",
    suggestedAmount: 10000000,
    timeframe: 240,
    color: "bg-indigo-500",
    tips: "Start early for compound growth",
    category: "retirement" as const,
  },
  {
    id: "child",
    name: "Child's Future",
    icon: Baby,
    description: "Save for your child's education and future",
    suggestedAmount: 2500000,
    timeframe: 180,
    color: "bg-yellow-500",
    tips: "Consider education inflation rates",
    category: "child" as const,
  },
]

export function AddGoalModal({ isOpen, onClose }: AddGoalModalProps) {
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof goalTemplates)[0] | null>(null)
  const [customGoal, setCustomGoal] = useState({
    name: "",
    description: "",
    targetAmount: "",
    targetDate: "",
    priority: "medium" as "low" | "medium" | "high",
    category: "other" as
      | "emergency"
      | "retirement"
      | "house"
      | "education"
      | "vacation"
      | "other"
      | "car"
      | "wedding"
      | "child",
  })
  const [loading, setLoading] = useState(false)
  const { dashboardData, setDashboardData } = useStore()

  const handleTemplateSelect = (template: (typeof goalTemplates)[0]) => {
    setSelectedTemplate(template)
    const targetDate = new Date()
    targetDate.setMonth(targetDate.getMonth() + template.timeframe)

    setCustomGoal({
      name: template.name,
      description: template.description,
      targetAmount: template.suggestedAmount.toString(),
      targetDate: targetDate.toISOString().split("T")[0],
      priority: template.category === "emergency" ? "high" : "medium",
      category: template.category,
    })
    setStep(2)
  }

  const handleCustomGoal = () => {
    setSelectedTemplate(null)
    setCustomGoal({
      name: "",
      description: "",
      targetAmount: "",
      targetDate: "",
      priority: "medium",
      category: "other",
    })
    setStep(2)
  }

  const handleSubmit = async () => {
    if (!customGoal.name || !customGoal.targetAmount || !customGoal.targetDate) {
      alert("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      const newGoal = await goalService.createGoal({
        name: customGoal.name,
        description: customGoal.description || null,
        target_amount: Number.parseInt(customGoal.targetAmount),
        current_amount: 0,
        target_date: customGoal.targetDate,
        priority: customGoal.priority,
        category: customGoal.category,
      })

      // Refresh dashboard data
      if (dashboardData) {
        const formattedGoal = {
          id: newGoal.id,
          name: newGoal.name,
          description: newGoal.description,
          targetAmount: Number(newGoal.target_amount),
          currentAmount: Number(newGoal.current_amount),
          targetDate: newGoal.target_date,
          priority: newGoal.priority,
          category: newGoal.category,
          progress: 0,
        }
        setDashboardData({
          ...dashboardData,
          goals: [...dashboardData.goals, formattedGoal],
        })
      }

      onClose()
      setStep(1)
      setSelectedTemplate(null)
      setCustomGoal({
        name: "",
        description: "",
        targetAmount: "",
        targetDate: "",
        priority: "medium",
        category: "other",
      })
    } catch (error) {
      console.error("Error creating goal:", error)
      alert("Failed to create goal. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-start justify-center pt-20 pb-4 px-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full min-h-fit"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "calc(100vh - 4rem)" }}
          >
            <div className="max-h-full overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <Typography variant="h4" weight="bold">
                      {step === 1 ? "Create Financial Goal" : "Goal Details"}
                    </Typography>
                    <Typography variant="body" color="secondary" className="text-sm">
                      {step === 1 ? "Choose a template or create custom goal" : "Customize your goal"}
                    </Typography>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Step 1: Template Selection */}
              {step === 1 && (
                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {goalTemplates.map((template) => (
                      <motion.button
                        key={template.id}
                        onClick={() => handleTemplateSelect(template)}
                        className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all text-left group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-10 h-10 ${template.color} rounded-lg flex items-center justify-center`}>
                            <template.icon className="w-5 h-5 text-white" />
                          </div>
                          <Typography variant="h5" weight="bold">
                            {template.name}
                          </Typography>
                        </div>
                        <Typography variant="body" color="secondary" className="text-sm mb-3">
                          {template.description}
                        </Typography>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Suggested Amount:</span>
                            <span className="font-medium">{formatCurrency(template.suggestedAmount)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Timeframe:</span>
                            <span className="font-medium">{Math.round(template.timeframe / 12)} years</span>
                          </div>
                        </div>
                        <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <Typography variant="caption" className="text-blue-600 dark:text-blue-400">
                            💡 {template.tips}
                          </Typography>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <motion.button
                      onClick={handleCustomGoal}
                      className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <Typography variant="h5" weight="bold">
                            Create Custom Goal
                          </Typography>
                          <Typography variant="body" color="secondary" className="text-sm">
                            Set your own financial target
                          </Typography>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Step 2: Goal Details */}
              {step === 2 && (
                <div className="p-6">
                  {selectedTemplate && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`w-8 h-8 ${selectedTemplate.color} rounded-lg flex items-center justify-center`}
                        >
                          <selectedTemplate.icon className="w-4 h-4 text-white" />
                        </div>
                        <Typography variant="h5" weight="bold">
                          {selectedTemplate.name} Template
                        </Typography>
                      </div>
                      <Typography variant="body" color="secondary" className="text-sm">
                        You can customize all the details below
                      </Typography>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Goal Name *</label>
                        <input
                          type="text"
                          value={customGoal.name}
                          onChange={(e) => setCustomGoal({ ...customGoal, name: e.target.value })}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter goal name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          value={customGoal.description}
                          onChange={(e) => setCustomGoal({ ...customGoal, description: e.target.value })}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                          placeholder="Describe your goal"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          value={customGoal.category}
                          onChange={(e) =>
                            setCustomGoal({
                              ...customGoal,
                              category: e.target.value as typeof customGoal.category,
                            })
                          }
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="emergency">Emergency Fund</option>
                          <option value="house">House Purchase</option>
                          <option value="car">Car Purchase</option>
                          <option value="education">Education</option>
                          <option value="vacation">Vacation</option>
                          <option value="wedding">Wedding</option>
                          <option value="retirement">Retirement</option>
                          <option value="child">Child's Future</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Priority</label>
                        <select
                          value={customGoal.priority}
                          onChange={(e) =>
                            setCustomGoal({ ...customGoal, priority: e.target.value as "low" | "medium" | "high" })
                          }
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Target Amount (₹) *</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={customGoal.targetAmount}
                            onChange={(e) => setCustomGoal({ ...customGoal, targetAmount: e.target.value })}
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter target amount"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Target Date *</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="date"
                            value={customGoal.targetDate}
                            onChange={(e) => setCustomGoal({ ...customGoal, targetDate: e.target.value })}
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {customGoal.targetAmount && customGoal.targetDate && (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <Typography variant="body" weight="bold" className="text-green-700 dark:text-green-400">
                              Smart Insights
                            </Typography>
                          </div>
                          <Typography variant="caption" className="text-green-600 dark:text-green-400">
                            To reach ₹{Number.parseInt(customGoal.targetAmount).toLocaleString()}, you need to save
                            approximately ₹
                            {Math.round(
                              Number.parseInt(customGoal.targetAmount) /
                                Math.max(
                                  1,
                                  Math.ceil(
                                    (new Date(customGoal.targetDate).getTime() - new Date().getTime()) /
                                      (1000 * 60 * 60 * 24 * 30),
                                  ),
                                ),
                            ).toLocaleString()}{" "}
                            per month.
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back to Templates
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                      {loading ? "Creating Goal..." : "Create Goal"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
