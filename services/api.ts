import { supabase } from "@/lib/supabase"
import type { DashboardData, Asset, Transaction, Goal } from "@/types"

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No authenticated user")

      // Fetch all data in parallel
      const [{ data: assets }, { data: liabilities }, { data: transactions }, { data: goals }, { data: insights }] =
        await Promise.all([
          supabase.from("assets").select("*").eq("user_id", user.id).eq("is_active", true),
          supabase.from("liabilities").select("*").eq("user_id", user.id).eq("is_active", true),
          supabase
            .from("transactions")
            .select("*")
            .eq("user_id", user.id)
            .order("transaction_date", { ascending: false })
            .limit(10),
          supabase.from("goals").select("*").eq("user_id", user.id).order("priority", { ascending: false }),
          supabase
            .from("insights")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(5),
        ])

      // Calculate totals
      const totalAssets = assets?.reduce((sum, asset) => sum + Number(asset.current_value), 0) || 0
      const totalLiabilities =
        liabilities?.reduce((sum, liability) => sum + Number(liability.outstanding_amount), 0) || 0
      const netWorth = totalAssets - totalLiabilities

      // Calculate asset allocation
      const assetAllocation = assets?.reduce(
        (allocation, asset) => {
          const type = asset.asset_type as keyof typeof allocation
          allocation[type] = (allocation[type] || 0) + Number(asset.current_value)
          return allocation
        },
        {
          stocks: 0,
          mutual_funds: 0,
          fixed_deposits: 0,
          gold: 0,
          crypto: 0,
          real_estate: 0,
          ppf: 0,
          bonds: 0,
        },
      ) || {
        stocks: 0,
        mutual_funds: 0,
        fixed_deposits: 0,
        gold: 0,
        crypto: 0,
        real_estate: 0,
        ppf: 0,
        bonds: 0,
      }

      // Get upcoming dues (next 30 days)
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

      const upcomingDues =
        liabilities
          ?.filter((liability) => liability.next_due_date && new Date(liability.next_due_date) <= thirtyDaysFromNow)
          .map((liability) => ({
            id: liability.id,
            name: liability.name,
            amount: Number(liability.emi_amount || liability.outstanding_amount),
            dueDate: liability.next_due_date!,
            type: liability.liability_type === "credit_card" ? ("credit_card" as const) : ("emi" as const),
            status: new Date(liability.next_due_date!) < new Date() ? ("overdue" as const) : ("pending" as const),
          })) || []

      // Format transactions
      const recentTransactions =
        transactions?.map((transaction) => ({
          id: transaction.id,
          type: transaction.transaction_type as any,
          amount: Number(transaction.amount),
          description: transaction.description || `${transaction.transaction_type} transaction`,
          date: transaction.transaction_date,
          asset: transaction.asset_id ? "Asset" : undefined,
        })) || []

      // Format goals with progress calculation
      const formattedGoals =
        goals?.map((goal) => ({
          id: goal.id,
          name: goal.name,
          description: goal.description,
          target_amount: Number(goal.target_amount),
          current_amount: Number(goal.current_amount),
          target_date: goal.target_date,
          priority: goal.priority as any,
          category: goal.category as any,
          progress: (Number(goal.current_amount) / Number(goal.target_amount)) * 100,
        })) || []

      // Format insights
      const formattedInsights =
        insights?.map((insight) => ({
          id: insight.id,
          title: insight.title,
          message: insight.message,
          type: insight.insight_type as any,
          priority: insight.priority as any,
          isRead: insight.is_read,
          createdAt: insight.created_at,
        })) || []

      return {
        netWorth,
        totalAssets,
        totalLiabilities,
        assetAllocation,
        recentTransactions,
        upcomingDues,
        insights: formattedInsights,
        goals: formattedGoals,
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      throw error
    }
  },
}

export const assetService = {
  getAssets: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("No authenticated user")

    const { data, error } = await supabase
      .from("assets")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  createAsset: async (asset: any) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("No authenticated user")

    const { data, error } = await supabase
      .from("assets")
      .insert([{ ...asset, user_id: user.id }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  updateAsset: async (id: string, updates: Partial<Asset>) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("No authenticated user")

    const { data, error } = await supabase
      .from("assets")
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  deleteAsset: async (id: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("No authenticated user")

    const { error } = await supabase.from("assets").update({ is_active: false }).eq("id", id).eq("user_id", user.id)

    if (error) throw error
  },
}

export const goalService = {
  getGoals: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("No authenticated user")

    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", user.id)
      .order("priority", { ascending: false })

    if (error) throw error
    return data
  },

  createGoal: async (goal: Omit<Goal, "id" | "progress">) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("No authenticated user")

    const { data, error } = await supabase
      .from("goals")
      .insert([
        {
          user_id: user.id,
          name: goal.name,
          description: goal.description,
          target_amount: goal.target_amount,
          current_amount: goal.current_amount,
          target_date: goal.target_date,
          priority: goal.priority,
          category: goal.category,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  },

  updateGoal: async (id: string, updates: Partial<Goal>) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("No authenticated user")

    const { data, error } = await supabase
      .from("goals")
      .update({
        name: updates.name,
        description: updates.description,
        target_amount: updates.target_amount,
        current_amount: updates.current_amount,
        target_date: updates.target_date,
        priority: updates.priority,
        category: updates.category,
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  deleteGoal: async (id: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("No authenticated user")

    const { error } = await supabase.from("goals").delete().eq("id", id).eq("user_id", user.id)

    if (error) throw error
  },
}

export const transactionService = {
  getTransactions: async (limit = 50) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("No authenticated user")

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("transaction_date", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  createTransaction: async (transaction: Omit<Transaction, "id">) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("No authenticated user")

    const { data, error } = await supabase
      .from("transactions")
      .insert([{ ...transaction, user_id: user.id }])
      .select()
      .single()

    if (error) throw error
    return data
  },
}

export const liabilityService = {
  async getLiabilities() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("liabilities")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  async createLiability(liability: any) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("liabilities")
      .insert({
        ...liability,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateLiability(id: string, updates: any) {
    const { data, error } = await supabase.from("liabilities").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  async deleteLiability(id: string) {
    const { error } = await supabase.from("liabilities").delete().eq("id", id)

    if (error) throw error
  },
}

// Update existing dashboardService to include liabilities
// Removing the redeclaration by renaming the second instance
export const dashboardServiceUpdated = {
  async getDashboardData() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    // Get assets
    const { data: assets } = await supabase.from("assets").select("*").eq("user_id", user.id)

    // Get liabilities
    const { data: liabilities } = await supabase.from("liabilities").select("*").eq("user_id", user.id)

    // Get goals
    const { data: goals } = await supabase.from("goals").select("*").eq("user_id", user.id)

    // Calculate totals
    const totalAssets = assets?.reduce((sum, asset) => sum + (asset.current_value || 0), 0) || 0
    const totalLiabilities = liabilities?.reduce((sum, liability) => sum + (liability.outstanding_amount || 0), 0) || 0
    const netWorth = totalAssets - totalLiabilities

    // Asset allocation
    const assetAllocation =
      assets?.reduce((acc: any, asset) => {
        const type = asset.asset_type
        acc[type] = (acc[type] || 0) + asset.current_value
        return acc
      }, {}) || {}

    return {
      netWorth,
      totalAssets,
      totalLiabilities,
      assetAllocation,
      goals: goals || [],
      liabilities: liabilities || [],
      recentTransactions: [], // Mock for now
      upcomingDues: liabilities?.filter((l: any) => l.next_due_date).slice(0, 5) || [],
      insights: [
        {
          type: "recommendation",
          title: "Portfolio Diversification",
          description: "Consider diversifying your portfolio across different asset classes",
          priority: "medium",
        },
      ],
    }
  },
}
