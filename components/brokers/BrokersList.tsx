"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Typography } from "@/components/ui-system/Typography"
import { BrokerConnectCard } from "./BrokerConnectCard"

// Mock brokers data
const brokersData = [
  {
    id: "1",
    name: "Zerodha",
    logo: "/placeholder.svg?height=50&width=50",
    description:
      "Connect your Zerodha Kite account to automatically import your stocks, mutual funds, and F&O positions.",
    isConnected: false,
  },
  {
    id: "2",
    name: "Groww",
    logo: "/placeholder.svg?height=50&width=50",
    description: "Import your stocks and mutual fund investments from Groww to track your complete portfolio.",
    isConnected: true,
  },
  {
    id: "3",
    name: "Upstox",
    logo: "/placeholder.svg?height=50&width=50",
    description: "Connect Upstox to import your equity, commodity, and currency investments.",
    isConnected: false,
  },
  {
    id: "4",
    name: "Angel One",
    logo: "/placeholder.svg?height=50&width=50",
    description: "Import your Angel One portfolio including stocks, mutual funds, and other investments.",
    isConnected: false,
  },
  {
    id: "5",
    name: "ICICI Direct",
    logo: "/placeholder.svg?height=50&width=50",
    description: "Connect your ICICI Direct account to track stocks, mutual funds, and fixed income investments.",
    isConnected: false,
  },
  {
    id: "6",
    name: "5Paisa",
    logo: "/placeholder.svg?height=50&width=50",
    description: "Import your 5Paisa portfolio to track all your investments in one place.",
    isConnected: false,
  },
]

interface BrokersListProps {
  demoMode: boolean;
}

export function BrokersList({ demoMode }: BrokersListProps) {
  const [brokers, setBrokers] = useState(brokersData)

  const handleConnect = (id: string) => {
    if (demoMode) return; // Disable connection in demo mode
    setBrokers(brokers.map((broker) => (broker.id === id ? { ...broker, isConnected: true } : broker)))
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Typography variant="h3" weight="bold" className="mb-2">
          Connect Your Brokers
        </Typography>
        <Typography variant="body" color="muted">
          Link your brokerage accounts to automatically import and track all your investments in one place.
        </Typography>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brokers.map((broker) => (
          <BrokerConnectCard
            key={broker.id}
            name={broker.name}
            logo={broker.logo}
            description={broker.description}
            isConnected={broker.isConnected}
            onConnect={() => handleConnect(broker.id)}
            demoMode={demoMode}
          />
        ))}
      </div>
    </div>
  )
}
