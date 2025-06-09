export const formatCurrency = (amount: number, currency = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-IN").format(num)
}

export const formatPercentage = (value: number, decimals = 1) => {
  return `${value.toFixed(decimals)}%`
}

export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  return new Date(date).toLocaleDateString("en-IN", { ...defaultOptions, ...options })
}

export const formatRelativeTime = (date: string | Date) => {
  const now = new Date()
  const targetDate = new Date(date)
  const diffTime = targetDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Tomorrow"
  if (diffDays === -1) return "Yesterday"
  if (diffDays < 0) return `${Math.abs(diffDays)} days ago`
  if (diffDays < 7) return `In ${diffDays} days`
  if (diffDays < 30) return `In ${Math.ceil(diffDays / 7)} weeks`
  if (diffDays < 365) return `In ${Math.ceil(diffDays / 30)} months`
  return `In ${Math.ceil(diffDays / 365)} years`
}

export const formatCompactNumber = (num: number) => {
  if (num >= 10000000) {
    // 1 crore
    return `₹${(num / 10000000).toFixed(1)}Cr`
  }
  if (num >= 100000) {
    // 1 lakh
    return `₹${(num / 100000).toFixed(1)}L`
  }
  if (num >= 1000) {
    // 1 thousand
    return `₹${(num / 1000).toFixed(1)}K`
  }
  return formatCurrency(num)
}
