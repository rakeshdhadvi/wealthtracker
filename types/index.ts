export interface DashboardData {
  netWorth: number
  totalAssets: number
  totalLiabilities: number
  assetAllocation: AssetAllocation
  recentTransactions: Transaction[]
  upcomingDues: UpcomingDue[]
  insights: Insight[]
  goals: Goal[]
}

export interface AssetAllocation {
  stocks: number
  mutual_funds: number
  fixed_deposits: number
  gold: number
  crypto: number
  real_estate: number
  ppf: number
  bonds: number
}

export interface Transaction {
  id: string
  type: "buy" | "sell" | "dividend" | "interest" | "payment"
  amount: number
  description: string
  date: string
  asset?: string
}

export interface UpcomingDue {
  id: string
  name: string
  amount: number
  dueDate: string
  type: "emi" | "credit_card" | "insurance"
  status: "pending" | "overdue"
}

export interface Insight {
  id: string
  title: string
  message: string
  type: "alert" | "suggestion" | "achievement" | "warning"
  priority: "low" | "medium" | "high"
  isRead: boolean
  createdAt: string
}

export interface Goal {
  id: string
  name: string
  description?: string | null
  target_amount: number
  current_amount: number
  target_date: string
  priority: "low" | "medium" | "high"
  category: "emergency" | "retirement" | "house" | "education" | "vacation" | "other" | "car" | "wedding" | "child"
  progress: number
}

export interface Asset {
  id: string
  type: string
  name: string
  symbol?: string
  quantity: number
  averagePrice: number
  currentPrice: number
  currentValue: number
  institution?: string
  riskLevel: "low" | "medium" | "high"
}

export interface Liability {
  id: string
  type: string
  name: string
  principalAmount: number
  outstandingAmount: number
  interestRate: number
  emiAmount?: number
  nextDueDate?: string
}
