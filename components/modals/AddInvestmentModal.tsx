"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui-system/Button"
import { Typography } from "@/components/ui-system/Typography"
import { assetService } from "@/services/api"
import { useStore } from "@/stores/useStore"
import {
  X,
  TrendingUp,
  Landmark,
  Home,
  Gem,
  Bitcoin,
  PiggyBank,
  FileText,
  Briefcase,
  DollarSign,
  BarChart3,
  MapPin,
  CreditCard,
  Percent,
  LucideIcon
} from "lucide-react"
import { dashboardService } from "@/services/api"

interface AddInvestmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  demoMode?: boolean
}

interface FieldConfig {
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  icon?: LucideIcon;
  options?: string[];
}

const fieldConfig: Record<string, FieldConfig> = {
  name: { label: "Investment Name", type: "text", required: true, placeholder: "Enter investment name" },
  symbol: { label: "Symbol/Code", type: "text", placeholder: "e.g., RELIANCE, SBIN" },
  quantity: { label: "Quantity", type: "number", required: true, placeholder: "Number of shares" },
  units: { label: "Units", type: "number", required: true, placeholder: "Number of units" },
  averagePrice: {
    label: "Average Price (₹)",
    type: "number",
    required: true,
    placeholder: "Purchase price per share",
    icon: DollarSign,
  },
  currentPrice: {
    label: "Current Price (₹)",
    type: "number",
    placeholder: "Current market price",
    icon: BarChart3,
  },
  nav: {
    label: "Purchase NAV (₹)",
    type: "number",
    required: true,
    placeholder: "NAV at purchase",
    icon: DollarSign,
  },
  currentNav: { label: "Current NAV (₹)", type: "number", placeholder: "Current NAV", icon: BarChart3 },
  principal: {
    label: "Principal Amount (₹)",
    type: "number",
    required: true,
    placeholder: "FD amount",
    icon: DollarSign,
  },
  interestRate: { label: "Interest Rate (%)", type: "number", placeholder: "Annual interest rate", icon: Percent },
  maturityDate: { label: "Maturity Date", type: "date" },
  propertyType: {
    label: "Property Type",
    type: "select",
    options: ["Residential", "Commercial", "Land", "REIT"],
    required: true,
  },
  purchasePrice: {
    label: "Purchase Price (₹)",
    type: "number",
    required: true,
    placeholder: "Property purchase price",
    icon: DollarSign,
  },
  currentValue: {
    label: "Current Value (₹)",
    type: "number",
    placeholder: "Current market value",
    icon: BarChart3,
  },
  location: { label: "Location", type: "text", placeholder: "Property location", icon: MapPin },
  area: { label: "Area (sq ft)", type: "number", placeholder: "Property area" },
  goldType: {
    label: "Gold Type",
    type: "select",
    options: ["Physical Gold", "Gold ETF", "Digital Gold", "Gold Coins"],
    required: true,
  },
  exchange: { label: "Exchange/Platform", type: "text", placeholder: "e.g., WazirX, CoinDCX", icon: CreditCard },
  faceValue: {
    label: "Face Value (₹)",
    type: "number",
    required: true,
    placeholder: "Bond face value",
    icon: DollarSign,
  },
  couponRate: { label: "Coupon Rate (%)", type: "number", placeholder: "Annual coupon rate", icon: Percent },
  accountNumber: { label: "Account Number", type: "text", placeholder: "PPF/EPF account number" },
  currentBalance: {
    label: "Current Balance (₹)",
    type: "number",
    required: true,
    placeholder: "Current balance",
    icon: DollarSign,
  },
  monthlyContribution: {
    label: "Monthly Contribution (₹)",
    type: "number",
    placeholder: "Monthly contribution",
    icon: DollarSign,
  },
  institution: { label: "Institution/Broker", type: "text", placeholder: "e.g., Zerodha, Groww, HDFC Bank" },
}

const investmentCategories = [
  {
    id: "stocks",
    name: "Stocks",
    icon: TrendingUp,
    description: "Individual company shares",
    color: "bg-blue-500",
    riskLevel: "high",
    examples: ["Reliance", "TCS", "HDFC Bank", "Infosys"],
    fields: ["name", "symbol", "quantity", "averagePrice", "currentPrice", "institution"],
  },
  {
    id: "mutual_funds",
    name: "Mutual Funds",
    icon: Briefcase,
    description: "Professionally managed portfolios",
    color: "bg-green-500",
    riskLevel: "medium",
    examples: ["SBI Bluechip", "HDFC Top 100", "Axis Long Term"],
    fields: ["name", "symbol", "units", "nav", "currentNav", "institution"],
  },
  {
    id: "fixed_deposits",
    name: "Fixed Deposits",
    icon: PiggyBank,
    description: "Guaranteed returns with banks",
    color: "bg-orange-500",
    riskLevel: "low",
    examples: ["SBI FD", "HDFC FD", "ICICI FD"],
    fields: ["name", "principal", "interestRate", "maturityDate", "institution"],
  },
  {
    id: "real_estate",
    name: "Real Estate",
    icon: Home,
    description: "Property investments",
    color: "bg-purple-500",
    riskLevel: "medium",
    examples: ["Residential", "Commercial", "REITs"],
    fields: ["name", "propertyType", "purchasePrice", "currentValue", "location", "area"],
  },
  {
    id: "gold",
    name: "Gold",
    icon: Gem,
    description: "Physical gold and gold ETFs",
    color: "bg-yellow-500",
    riskLevel: "medium",
    examples: ["Gold ETF", "Digital Gold", "Physical Gold"],
    fields: ["name", "goldType", "quantity", "averagePrice", "currentPrice", "institution"],
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    icon: Bitcoin,
    description: "Digital currencies",
    color: "bg-indigo-500",
    riskLevel: "high",
    examples: ["Bitcoin", "Ethereum", "Other Altcoins"],
    fields: ["name", "symbol", "quantity", "averagePrice", "currentPrice", "exchange"],
  },
  {
    id: "bonds",
    name: "Bonds",
    icon: FileText,
    description: "Government and corporate bonds",
    color: "bg-red-500",
    riskLevel: "low",
    examples: ["Government Bonds", "Corporate Bonds", "Tax-free Bonds"],
    fields: ["name", "faceValue", "couponRate", "maturityDate", "currentPrice", "institution"],
  },
  {
    id: "ppf",
    name: "PPF/EPF",
    icon: Landmark,
    description: "Provident fund investments",
    color: "bg-teal-500",
    riskLevel: "low",
    examples: ["PPF", "EPF", "VPF"],
    fields: ["name", "accountNumber", "currentBalance", "monthlyContribution", "institution"],
  },
]

const popularStocks = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2580 },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3567 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1678 },
  { symbol: "INFY", name: "Infosys", price: 1456 },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 945 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1234 },
]

const popularMutualFunds = [
  { name: "SBI Bluechip Fund", nav: 85.5, category: "Large Cap" },
  { name: "HDFC Top 100 Fund", nav: 92.3, category: "Large Cap" },
  { name: "Axis Long Term Equity", nav: 67.8, category: "ELSS" },
  { name: "Mirae Asset Large Cap", nav: 78.9, category: "Large Cap" },
]

export function AddInvestmentModal({ isOpen, onClose, onSuccess, demoMode }: AddInvestmentModalProps) {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<(typeof investmentCategories)[0] | null>(null)
  const [investmentData, setInvestmentData] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const { dashboardData, setDashboardData } = useStore()

  const handleCategorySelect = (category: (typeof investmentCategories)[0]) => {
    setSelectedCategory(category)
    setInvestmentData({
      type: category.id,
    })
    setStep(2)
  }

  const handleQuickSelect = (item: any) => {
    if (selectedCategory?.id === "stocks") {
      setInvestmentData({
        ...investmentData,
        name: item.name,
        symbol: item.symbol,
        currentPrice: item.price.toString(),
        averagePrice: item.price.toString(),
      })
    } else if (selectedCategory?.id === "mutual_funds") {
      setInvestmentData({
        ...investmentData,
        name: item.name,
        symbol: item.name.replace(/\s+/g, "").toUpperCase(),
        currentNav: item.nav.toString(),
        nav: item.nav.toString(),
      })
    }
  }

  const calculateCurrentValue = () => {
    if (!selectedCategory) return 0

    switch (selectedCategory.id) {
      case "stocks":
        return (
          Number.parseFloat(investmentData.quantity || "0") *
          Number.parseFloat(investmentData.currentPrice || investmentData.averagePrice || "0")
        )
      case "mutual_funds":
        return (
          Number.parseFloat(investmentData.units || "0") *
          Number.parseFloat(investmentData.currentNav || investmentData.nav || "0")
        )
      case "fixed_deposits":
        return Number.parseFloat(investmentData.principal || "0")
      case "real_estate":
        return Number.parseFloat(investmentData.currentValue || investmentData.purchasePrice || "0")
      case "gold":
        return (
          Number.parseFloat(investmentData.quantity || "0") *
          Number.parseFloat(investmentData.currentPrice || investmentData.averagePrice || "0")
        )
      case "crypto":
        return (
          Number.parseFloat(investmentData.quantity || "0") *
          Number.parseFloat(investmentData.currentPrice || investmentData.averagePrice || "0")
        )
      case "bonds":
        return Number.parseFloat(investmentData.currentPrice || investmentData.faceValue || "0")
      case "ppf":
        return Number.parseFloat(investmentData.currentBalance || "0")
      default:
        return 0
    }
  }

  const handleSubmit = async () => {
    if (demoMode) {
      onClose();
      return;
    }

    if (!selectedCategory) return

    setLoading(true)
    try {
      const asset_type = selectedCategory.id
      const payload: Record<string, any> = {
        asset_type,
        name: investmentData.name,
        institution: investmentData.institution || "",
        quantity: parseFloat(investmentData.quantity || investmentData.units || investmentData.goldType === "Physical Gold" ? "0" : "1"),
        average_price: parseFloat(investmentData.averagePrice || investmentData.nav || investmentData.principal || investmentData.purchasePrice || investmentData.faceValue || "0"),
        current_price: parseFloat(investmentData.currentPrice || investmentData.currentNav || investmentData.currentValue || investmentData.averagePrice || investmentData.nav || investmentData.principal || investmentData.purchasePrice || investmentData.faceValue || "0"),
        current_value: calculateCurrentValue(),
        symbol: investmentData.symbol || selectedCategory.id.toUpperCase(),
        risk_level: selectedCategory.riskLevel,
        metadata: {
          ...investmentData,
        },
      }

      delete payload.metadata.name;
      delete payload.metadata.institution;
      delete payload.metadata.quantity;
      delete payload.metadata.units;
      delete payload.metadata.averagePrice;
      delete payload.metadata.currentPrice;
      delete payload.metadata.nav;
      delete payload.metadata.currentNav;
      delete payload.metadata.principal;
      delete payload.metadata.purchasePrice;
      delete payload.metadata.currentValue;
      delete payload.metadata.symbol;
      delete payload.metadata.riskLevel;

      await assetService.createAsset(payload)
      onSuccess?.()
      onClose()
      const dashboardData = await dashboardService.getDashboardData()
      setDashboardData(dashboardData)
    } catch (error) {
      console.error("Error adding investment:", error)
      alert("Failed to add investment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setSelectedCategory(null)
    setInvestmentData({})
  }

  const renderField = (fieldName: keyof typeof fieldConfig) => {
    const config = fieldConfig[fieldName]
    if (!config) return null

    if (config.type === "select") {
    return (
        <div key={fieldName as string}>
        <label className="block text-sm font-medium mb-2">
            {config.label} {Boolean(config.required) && <span className="text-red-500">*</span>}
        </label>
          <select
            value={investmentData[fieldName] || ""}
            onChange={(e) => setInvestmentData({ ...investmentData, [fieldName]: e.target.value })}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={Boolean(config.required)}
          >
            <option value="">Select {config.label}</option>
            {config.options?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )
    } else {
      const Icon = config.icon
      return (
        <div key={fieldName as string}>
          <label className="block text-sm font-medium mb-2">
            {config.label} {Boolean(config.required) && <span className="text-red-500">*</span>}
          </label>
          <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />}
            <input
              type={config.type}
              value={investmentData[fieldName] || ""}
              onChange={(e) => setInvestmentData({ ...investmentData, [fieldName]: e.target.value })}
              className={`w-full ${Icon ? "pl-10" : "pl-3"} pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder={config.placeholder || ""}
              required={Boolean(config.required)}
              step={config.type === "number" ? "0.01" : undefined}
            />
          </div>
      </div>
    )
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600 bg-green-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "high":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
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
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <Typography variant="h4" weight="bold">
                      {step === 1 ? "Add Investment" : "Investment Details"}
                    </Typography>
                    <Typography variant="body" color="secondary" className="text-sm">
                      {step === 1 ? "Choose investment category" : `Enter ${selectedCategory?.name} details`}
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

              {/* Step 1: Category Selection */}
              {step === 1 && (
                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {investmentCategories.map((category) => (
                      <motion.button
                        key={category.id}
                        onClick={() => handleCategorySelect(category)}
                        className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg text-left hover:shadow-lg transition-shadow duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mb-4`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <Typography variant="h5" weight="bold" className="mb-1">
                          {category.name}
                        </Typography>
                        <Typography variant="body" color="secondary" className="text-sm mb-3">
                          {category.description}
                        </Typography>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(category.riskLevel)}`}>
                          {category.riskLevel.charAt(0).toUpperCase() + category.riskLevel.slice(1)} Risk
                              </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Investment Details Form */}
              {step === 2 && selectedCategory && (
                <div className="p-6">
                  <Typography variant="h5" weight="semibold" className="mb-4">
                    Enter {selectedCategory.name} Details
                      </Typography>

                  {(selectedCategory.id === "stocks" && popularStocks.length > 0) || (selectedCategory.id === "mutual_funds" && popularMutualFunds.length > 0) ? (
                    <div className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <Typography variant="body" weight="semibold" className="mb-3">Quick Select from Popular {selectedCategory.id === "stocks" ? "Stocks" : "Mutual Funds"}</Typography>
                      <div className="flex flex-wrap gap-2">
                        {(selectedCategory.id === "stocks" ? popularStocks : popularMutualFunds).map((item) => (
                          <Button key={item.name} variant="outline" size="sm" onClick={() => handleQuickSelect(item)}>
                            {item.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {selectedCategory.fields.map((fieldName) => renderField(fieldName as keyof typeof fieldConfig))}
                  </div>

                  {demoMode && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg">
                      <Typography variant="body" weight="semibold" className="mb-2">Preview Mode</Typography>
                      <Typography variant="body" className="text-sm">
                        In preview mode, your investment data will not be saved. Please sign up or log in to add real investments.
                        </Typography>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back to Categories
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading || (demoMode && !selectedCategory)}>
                      {loading ? "Adding..." : (demoMode ? "Continue (Preview)" : "Add Investment")}
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
