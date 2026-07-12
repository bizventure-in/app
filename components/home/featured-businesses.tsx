import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BusinessCard } from "@/components/business/business-card"
import { businesses } from "@/data/businesses"

export function FeaturedBusinesses() {
  // Pick 8 featured businesses across all categories
  const featured = [
    businesses.find((b) => b.slug === "hydroponic-farming"),
    businesses.find((b) => b.slug === "agricultural-drone-services"),
    businesses.find((b) => b.slug === "paper-bag-manufacturing"),
    businesses.find((b) => b.slug === "handmade-soap-cosmetics"),
    businesses.find((b) => b.slug === "digital-marketing-agency"),
    businesses.find((b) => b.slug === "ev-charging-station"),
    businesses.find((b) => b.slug === "hi-tech-dairy-farm"),
    businesses.find((b) => b.slug === "fish-farming-biofloc"),
  ].filter(Boolean)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
            Featured Business Ideas
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Hand-picked high-potential opportunities from each category.
          </p>
        </div>
        <Button asChild variant="outline" className="gap-1.5">
          <Link href="/categories">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((business) => (
          <BusinessCard key={business!.id} business={business!} />
        ))}
      </div>
    </section>
  )
}
