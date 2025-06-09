"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui-system/Card"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { Target, Plus, Calendar, TrendingUp, Edit, Trash2, MoreVertical } from "lucide-react"
import type { Goal } from "@/types"
import { useState } from "react"
import { AddGoalModal } from "@/components/modals/AddGoalModal"
import { goalService } from "@/services/api"
import { useStore } from "@/stores/useStore"

interface GoalsProgressProps {
  goals: Goal[]
  demo?: boolean
}

export function GoalsProgress({ goals, demo }: GoalsProgressProps) {
  const [showAddGoalModal, setShowAddGoalModal] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { setDashboardData, dashboardData } = useStore()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-orange-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "emergency":
        return "🚨"
      case "retirement":
        return "🏖️"
      case "house":
        return "🏠"
      case "education":
        return "🎓"
      case "vacation":
        return "✈️"
      case "car":
        return "🚗"
      case "wedding":
        return "💒"
      case "child":
        return "👶"
      default:
        return "🎯"
    }
  }

  const handleDeleteGoal = async (goalId: string) => {
    if (!confirm("Are you sure you want to delete this goal?")) return

    try {
      await goalService.deleteGoal(goalId)

      // Update dashboard data immediately
      if (dashboardData) {
        const updatedGoals = dashboardData.goals.filter((goal) => goal.id !== goalId)
        setDashboardData({
          ...dashboardData,
          goals: updatedGoals,
        })
      }

      setActiveDropdown(null)
    } catch (error) {
      console.error("Error deleting goal:", error)
      alert("Failed to delete goal. Please try again.")
    }
  }

  const handleEditGoal = (goalId: string) => {
    // For now, just show an alert. You can implement edit modal later
    alert("Edit functionality coming soon!")
    setActiveDropdown(null)
  }

  const handleUpdateProgress = async (goalId: string, newAmount: number) => {
    try {
      const goal = goals.find((g) => g.id === goalId)
      if (!goal) return

      await goalService.updateGoal(goalId, {
        ...goal,
        current_amount: newAmount,
      })

      // Update dashboard data immediately
      if (dashboardData) {
        const updatedGoals = dashboardData.goals.map((g) =>
          g.id === goalId ? { ...g, current_amount: newAmount, progress: (newAmount / g.target_amount) * 100 } : g,
        )
        setDashboardData({
          ...dashboardData,
          goals: updatedGoals,
        })
      }
    } catch (error) {
      console.error("Error updating goal progress:", error)
      alert("Failed to update goal progress. Please try again.")
    }
  }

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h4" weight="bold">
          Financial Goals
        </Typography>
        <Button
          variant="primary"
          size="sm"
          onClick={demo ? undefined : () => setShowAddGoalModal(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          disabled={demo}
        >
          Add Goal
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all relative"
          >
            {/* Dropdown Menu */}
            {!demo && (
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setActiveDropdown(activeDropdown === goal.id ? null : goal.id)}
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-600 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {activeDropdown === goal.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 top-10 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-2 z-10 min-w-[120px]"
                >
                  <button
                    onClick={() => handleEditGoal(goal.id)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </motion.div>
              )}
            </div>
            )}

            <div className="flex items-center justify-between mb-4 pr-8">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
                <Typography variant="body" weight="bold">
                  {goal.name}
                </Typography>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-600 ${getPriorityColor(goal.priority)}`}
              >
                {goal.priority}
              </span>
            </div>

            {goal.description && (
              <Typography variant="caption" color="muted" className="mb-4">
                {goal.description}
              </Typography>
            )}

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Typography variant="caption" color="secondary">
                  Progress
                </Typography>
                <Typography variant="caption" weight="bold" className="text-blue-600">
                  {goal.progress.toFixed(1)}%
                </Typography>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(goal.progress, 100)}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <Typography variant="caption" color="muted">
                  Current
                </Typography>
                <Typography variant="caption" weight="medium">
                  {formatCurrency(goal.current_amount)}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="caption" color="muted">
                  Target
                </Typography>
                <Typography variant="caption" weight="medium">
                  {formatCurrency(goal.target_amount)}
                </Typography>
              </div>
            </div>

            {/* Quick Progress Update */}
            <div className="mb-4">
              <Typography variant="caption" color="muted" className="mb-2 block">
                Quick Update Progress
              </Typography>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateProgress(goal.id, goal.current_amount + 1000)}
                  className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  +₹1K
                </button>
                <button
                  onClick={() => handleUpdateProgress(goal.id, goal.current_amount + 5000)}
                  className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  +₹5K
                </button>
                <button
                  onClick={() => handleUpdateProgress(goal.id, goal.current_amount + 10000)}
                  className="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  +₹10K
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <Typography variant="caption">{formatDate(goal.target_date)}</Typography>
              </div>
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {goals.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <Typography variant="h5" weight="medium" className="mb-2">
            No Goals Set Yet
          </Typography>
          <Typography variant="body" color="muted" className="mb-6">
            Start by setting your first financial goal to track your progress
          </Typography>
          <Button variant="primary" onClick={() => setShowAddGoalModal(true)}>
            Create Your First Goal
          </Button>
        </motion.div>
      )}

      <AddGoalModal
        isOpen={showAddGoalModal}
        onClose={() => setShowAddGoalModal(false)}
        onSuccess={() => {
          // Refresh dashboard data after adding goal
          window.location.reload()
        }}
      />
    </Card>
  )
}
