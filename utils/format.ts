/**
 * Format a number as Indian currency (INR)
 * @param value The number to format
 * @returns Formatted string with Indian number system
 */
export function formatCurrency(value: number): string {
  // Use Intl.NumberFormat for consistent formatting
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format a number with Indian number system
 * @param value The number to format
 * @returns Formatted string with Indian number system
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value)
}

/**
 * Format a number as a percentage
 * @param value The number to format
 * @param decimals Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Format a number with a currency symbol but without the currency code
 * @param value The number to format
 * @returns Formatted string with ₹ symbol
 */
export function formatCurrencySymbol(value: number): string {
  return `₹${formatNumber(value)}`
} 