"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui-system/Card"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { Link2, Check } from "lucide-react"

interface BrokerConnectCardProps {
  name: string
  logo: string
  description: string
  isConnected: boolean
  onConnect: () => void
  demoMode?: boolean
}

export function BrokerConnectCard({ name, logo, description, isConnected, onConnect, demoMode }: BrokerConnectCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = () => {
    if (demoMode) return;
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      onConnect()
      setIsLoading(false)
    }, 1500)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card variant="default" padding="lg" className="h-full flex flex-col">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
            <img src={logo || "/placeholder.svg"} alt={name} className="w-8 h-8" />
          </div>
          <div>
            <Typography variant="h5" weight="bold">
              {name}
            </Typography>
            {isConnected && (
              <div className="flex items-center text-green-600 text-sm">
                <Check className="w-4 h-4 mr-1" />
                <span>Connected</span>
              </div>
            )}
          </div>
        </div>

        <Typography variant="body" color="muted" className="mb-6 flex-grow">
          {description}
        </Typography>

        {isConnected ? (
          <div className="flex justify-between">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
              Disconnect
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            onClick={handleConnect}
            isLoading={isLoading}
            leftIcon={<Link2 className="w-4 h-4" />}
            disabled={demoMode}
          >
            Connect Account
          </Button>
        )}
      </Card>
    </motion.div>
  )
}
