"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui-system/Card"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { TrendingUp, TrendingDown, Plus, Search, Star, StarOff } from "lucide-react"

// Mock data
const stocksData = [
  {
    id: "1",
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: 2456.75,
    change: 1.25,
    volume: 2500000,
    favorite: true,
  },
  {
    id: "2",
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3567.8,
    change: -0.45,
    volume: 1200000,
    favorite: true,
  },
  {
    id: "3",
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    price: 1678.3,
    change: 0.85,
    volume: 1800000,
    favorite: true,
  },
  {
    id: "4",
    symbol: "INFY",
    name: "Infosys Ltd",
    price: 1456.2,
    change: -1.15,
    volume: 1500000,
    favorite: false,
  },
  {
    id: "5",
    symbol: "ICICIBANK",
    name: "ICICI Bank Ltd",
    price: 945.6,
    change: 0.65,
    volume: 1300000,
    favorite: false,
  },
]

export function StockWatchlist() {
  const [stocks, setStocks] = useState(stocksData)
  const [searchQuery, setSearchQuery] = useState("")
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatVolume = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(2)} Cr`
    }
    if (value >= 100000) {
      return `${(value / 100000).toFixed(2)} L`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} K`
    }
    return value.toString()
  }

  const toggleFavorite = (id: string) => {
    setStocks(stocks.map((stock) => (stock.id === id ? { ...stock, favorite: !stock.favorite } : stock)))
  }

  const filteredStocks = stocks.filter((stock) => {
    const matchesSearch =
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())

    if (showOnlyFavorites) {
      return matchesSearch && stock.favorite
    }

    return matchesSearch
  })

  return (
    <Card variant="default" padding="lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <Typography variant="h4" weight="bold">
          Stock Watchlist
        </Typography>

        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`p-2 rounded-lg border ${
              showOnlyFavorites ? "border-blue-200 bg-blue-50 text-blue-600" : "border-gray-200 bg-white text-gray-600"
            }`}
          >
            <Star className="h-4 w-4" />
          </button>

          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Add Stock
          </Button>
        </div>
      </div>

      {/* Stocks table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volume
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStocks.map((stock, index) => (
              <motion.tr
                key={stock.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <button onClick={() => toggleFavorite(stock.id)} className="mr-2">
                      {stock.favorite ? (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ) : (
                        <StarOff className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    <span className="font-medium text-gray-900">{stock.symbol}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{stock.name}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                  {formatCurrency(stock.price)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                  <div
                    className={`flex items-center justify-end ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change}%
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                  {formatVolume(stock.volume)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                  <Button variant="outline" size="sm">
                    Trade
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStocks.length === 0 && (
        <div className="text-center py-8">
          <Typography variant="body" color="muted">
            No stocks found. Try a different search or add new stocks to your watchlist.
          </Typography>
        </div>
      )}
    </Card>
  )
}
