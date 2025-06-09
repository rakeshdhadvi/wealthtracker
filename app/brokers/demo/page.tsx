"use client"

import { Container, Section } from "@/components/ui-system/Layout"
import { BrokersList } from "@/components/brokers/BrokersList"
import { FadeIn } from "@/components/ui-system/AnimatedElements"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import Link from "next/link"

export default function DemoBrokersPage() {
  return (
    <Section padding="lg" background="gray">
      <Container>
        <FadeIn>
          <div className="text-center py-12 border border-dashed rounded-lg bg-white/5 mb-8">
            <Typography variant="h4" weight="semibold" className="mb-2">
              Preview Broker Connections
            </Typography>
            <Typography variant="body" color="secondary" className="mb-6">
              See how you can seamlessly connect your brokerage accounts to track all your investments in one place. Sign up to link your real accounts!
            </Typography>
            <div className="flex justify-center gap-4">
              <Link href="/signup"><Button variant="primary" size="lg">Get Started Free</Button></Link>
              <Link href="/login"><Button variant="outline" size="lg">Log In</Button></Link>
            </div>
          </div>
        </FadeIn>
        <BrokersList demoMode={true} />
      </Container>
    </Section>
  )
} 