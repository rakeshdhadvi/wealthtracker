"use client"

import { useState } from "react"
import { Container, Section, Grid } from "@/components/ui-system/Layout"
import { Typography } from "@/components/ui-system/Typography"
import { Button } from "@/components/ui-system/Button"
import { Card } from "@/components/ui-system/Card"
import { Input } from "@/components/ui-system/Input"
import { Navigation } from "@/components/ui-system/Navigation"
import { Hero } from "@/components/ui-system/Hero"
import { FeatureCard } from "@/components/ui-system/FeatureCard"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui-system/AnimatedElements"
import { designTokens } from "@/lib/design-tokens"

export default function StyleGuide() {
  const [inputValue, setInputValue] = useState("")

  const navItems = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Services", href: "#" },
    { label: "Contact", href: "#" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Example */}
      <Navigation
        logo={<div className="text-2xl font-bold">Brand</div>}
        items={navItems}
        cta={{ label: "Get Started", href: "#" }}
      />

      {/* Hero Section Example */}
      <Hero
        subtitle="Welcome to"
        title="Your Beautiful App"
        description="Experience the perfect blend of minimal design and powerful functionality. Built with the same elegant aesthetic you love."
        primaryAction={{
          label: "Get Started",
          onClick: () => console.log("Primary action"),
        }}
        secondaryAction={{
          label: "Learn More",
          onClick: () => console.log("Secondary action"),
        }}
        image="/placeholder.svg?height=600&width=600"
        background="gradient"
      />

      {/* Typography Examples */}
      <Section padding="xl" background="white">
        <Container>
          <FadeIn>
            <Typography variant="h2" weight="bold" className="text-center mb-16">
              Typography System
            </Typography>
          </FadeIn>

          <StaggerContainer className="space-y-8">
            <StaggerItem>
              <Typography variant="h1" weight="black">
                Heading 1 - Main Titles
              </Typography>
            </StaggerItem>
            <StaggerItem>
              <Typography variant="h2" weight="bold">
                Heading 2 - Section Titles
              </Typography>
            </StaggerItem>
            <StaggerItem>
              <Typography variant="h3" weight="semibold">
                Heading 3 - Subsections
              </Typography>
            </StaggerItem>
            <StaggerItem>
              <Typography variant="body" color="secondary">
                Body text for paragraphs and general content. This shows how readable text looks in your design system.
              </Typography>
            </StaggerItem>
            <StaggerItem>
              <Typography variant="caption" color="muted">
                Caption text for small details and metadata
              </Typography>
            </StaggerItem>
            <StaggerItem>
              <Typography variant="h3" gradient weight="bold">
                Gradient Text Example
              </Typography>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Button Examples */}
      <Section padding="xl" background="gray">
        <Container>
          <Typography variant="h2" weight="bold" className="text-center mb-16">
            Button Variations
          </Typography>

          <Grid cols={2} gap="lg" className="mb-8">
            <Card padding="lg">
              <Typography variant="h5" weight="semibold" className="mb-4">
                Primary Buttons
              </Typography>
              <div className="space-y-4">
                <Button variant="primary" size="sm">
                  Small Primary
                </Button>
                <Button variant="primary" size="md">
                  Medium Primary
                </Button>
                <Button variant="primary" size="lg">
                  Large Primary
                </Button>
              </div>
            </Card>

            <Card padding="lg">
              <Typography variant="h5" weight="semibold" className="mb-4">
                Secondary Buttons
              </Typography>
              <div className="space-y-4">
                <Button variant="secondary" size="sm">
                  Small Secondary
                </Button>
                <Button variant="outline" size="md">
                  Outline Button
                </Button>
                <Button variant="ghost" size="lg">
                  Ghost Button
                </Button>
              </div>
            </Card>
          </Grid>

          <Card padding="lg">
            <Typography variant="h5" weight="semibold" className="mb-4">
              Button States
            </Typography>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Normal</Button>
              <Button variant="primary" isLoading>
                Loading
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button variant="primary" leftIcon="🚀">
                With Icon
              </Button>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Form Elements */}
      <Section padding="xl" background="white">
        <Container>
          <Typography variant="h2" weight="bold" className="text-center mb-16">
            Form Elements
          </Typography>

          <div className="max-w-2xl mx-auto">
            <Card padding="xl">
              <div className="space-y-6">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Input label="Email Address" type="email" placeholder="your@email.com" leftIcon="📧" />
                <Input label="Password" type="password" placeholder="Enter password" rightIcon="👁️" />
                <Input label="Error Example" placeholder="This field has an error" error="This field is required" />
                <Button variant="primary" className="w-full">
                  Submit Form
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Card Examples */}
      <Section padding="xl" background="gray">
        <Container>
          <Typography variant="h2" weight="bold" className="text-center mb-16">
            Card Variations
          </Typography>

          <Grid cols={3} gap="lg">
            <Card variant="default" padding="lg" hover>
              <Typography variant="h5" weight="semibold" className="mb-2">
                Default Card
              </Typography>
              <Typography variant="body" color="secondary">
                Standard card with shadow and hover effects
              </Typography>
            </Card>

            <Card variant="elevated" padding="lg">
              <Typography variant="h5" weight="semibold" className="mb-2">
                Elevated Card
              </Typography>
              <Typography variant="body" color="secondary">
                Card with stronger shadow for emphasis
              </Typography>
            </Card>

            <Card variant="outlined" padding="lg" hover>
              <Typography variant="h5" weight="semibold" className="mb-2">
                Outlined Card
              </Typography>
              <Typography variant="body" color="secondary">
                Card with border instead of shadow
              </Typography>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Feature Cards */}
      <Section padding="xl" background="white">
        <Container>
          <Typography variant="h2" weight="bold" className="text-center mb-16">
            Feature Cards
          </Typography>

          <Grid cols={3} gap="lg">
            <FeatureCard
              icon="🎨"
              title="Beautiful Design"
              description="Crafted with attention to detail and modern aesthetics"
              action={{ label: "Learn More", onClick: () => {} }}
            />
            <FeatureCard
              icon="⚡"
              title="Fast Performance"
              description="Optimized for speed and smooth user experience"
              action={{ label: "See Benchmarks", onClick: () => {} }}
              variant="highlighted"
            />
            <FeatureCard
              icon="🔧"
              title="Easy to Use"
              description="Intuitive interface that anyone can master quickly"
              action={{ label: "Try Demo", onClick: () => {} }}
            />
          </Grid>
        </Container>
      </Section>

      {/* Color Palette */}
      <Section padding="xl" background="gray">
        <Container>
          <Typography variant="h2" weight="bold" className="text-center mb-16">
            Color Palette
          </Typography>

          <Grid cols={4} gap="md">
            {Object.entries(designTokens.colors.gray).map(([shade, color]) => (
              <Card key={shade} padding="md" className="text-center">
                <div className="w-full h-16 rounded-lg mb-3" style={{ backgroundColor: color }} />
                <Typography variant="caption" weight="medium">
                  Gray {shade}
                </Typography>
                <Typography variant="caption" color="muted">
                  {color}
                </Typography>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </div>
  )
}
