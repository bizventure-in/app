"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/ui/animated-counter"

const stats = [
  { label: "Business Ideas", value: 100, suffix: "+" },
  { label: "Categories", value: 4 },
  { label: "Govt Schemes", value: 50, suffix: "+" },
  { label: "Industries", value: 20, suffix: "+" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--color-primary)/0.08,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,var(--color-accent)/0.06,transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-6 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Empowering entrepreneurs across India</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Build Your{" "}
            <span className="text-primary">Business Empire</span>{" "}
            with Curated Ideas
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Explore 100+ vetted business opportunities across agriculture,
            manufacturing, digital services, and livestock sectors. From
            low-investment startups to high-growth enterprises.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/categories">
                Explore All Businesses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-xl border bg-card p-4 shadow-sm"
            >
              <span className="text-3xl font-bold text-primary">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix || ""}
                />
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
