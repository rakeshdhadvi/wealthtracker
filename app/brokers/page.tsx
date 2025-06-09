"use client"

import { Container, Section } from "@/components/ui-system/Layout"
import { BrokersList } from "@/components/brokers/BrokersList"
import { useAuth } from "@/hooks/useAuth"
import DemoBrokersPage from "./demo/page"

export default function BrokersPage() {
  const { user } = useAuth()

  if (!user) {
    return <DemoBrokersPage />
  }

  return (
    <Section padding="lg" background="gray">
      <Container>
        <BrokersList demoMode={false} />
      </Container>
    </Section>
  )
}
