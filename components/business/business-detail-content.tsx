import Link from "next/link"
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Rocket,
  GraduationCap,
  Target,
  Tag,
  FileDown,
  Sprout,
  Factory,
  Monitor,
  Beef,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BusinessCard } from "@/components/business/business-card"
import type { Business } from "@/types/business"
import { cn } from "@/lib/utils"

const categoryIcons: Record<string, React.ElementType> = {
  "agri-tech": Sprout,
  manufacturing: Factory,
  "digital-services": Monitor,
  livestock: Beef,
}

const categoryColors: Record<string, string> = {
  "agri-tech":
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  manufacturing:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "digital-services":
    "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  livestock:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
}

const investmentColors: Record<string, string> = {
  Low: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  High: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
}

const profitColors: Record<string, string> = {
  Low: "text-muted-foreground",
  Medium: "text-amber-600 dark:text-amber-400",
  High: "text-emerald-600 dark:text-emerald-400",
  "Very High": "text-primary",
}

interface DetailSection {
  icon: React.ElementType
  title: string
  content: React.ReactNode
}

export function BusinessDetailContent({
  business,
  relatedBusinesses,
}: {
  business: Business
  relatedBusinesses: Business[]
}) {
  const CategoryIcon = categoryIcons[business.categorySlug] || Sprout

  const sections: DetailSection[] = [
    {
      icon: Target,
      title: "Market Opportunity",
      content: (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {business.marketOpportunity}
        </p>
      ),
    },
    {
      icon: GraduationCap,
      title: "Required Skills",
      content: (
        <div className="flex flex-wrap gap-1.5">
          {business.requiredSkills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      icon: AlertTriangle,
      title: "Risk Factors",
      content: (
        <ul className="flex flex-col gap-1.5">
          {business.riskFactors.map((risk) => (
            <li
              key={risk}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
              {risk}
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: Rocket,
      title: "Expansion Potential",
      content: (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {business.expansionPotential}
        </p>
      ),
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href="/categories"
          className="hover:text-foreground transition-colors"
        >
          Categories
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href={`/categories?category=${business.categorySlug}`}
          className="hover:text-foreground transition-colors"
        >
          {business.category}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate font-medium text-foreground">{business.name}</span>
      </nav>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium",
                  categoryColors[business.categorySlug]
                )}
              >
                <CategoryIcon className="h-3.5 w-3.5" />
                {business.category}
              </span>
              <span
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs font-medium",
                  investmentColors[business.investmentLevel]
                )}
              >
                {business.investmentLevel} Investment
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {business.name}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              {business.overview}
            </p>
          </div>

          {/* Key metrics cards */}
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                Investment Range
              </div>
              <p className="mt-2 text-lg font-bold text-foreground">
                {business.investmentRange}
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Profit Margin
              </div>
              <p className="mt-2 text-lg font-bold text-foreground">
                {business.profitMargin}
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Target className="h-4 w-4" />
                Profit Potential
              </div>
              <p
                className={cn(
                  "mt-2 text-lg font-bold",
                  profitColors[business.profitRange]
                )}
              >
                {business.profitRange}
              </p>
            </div>
          </div>

          {/* Detail sections */}
          <div className="flex flex-col gap-6">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <div
                  key={section.title}
                  className="rounded-xl border bg-card p-5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-semibold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  {section.content}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="w-full shrink-0 lg:w-72">
          <div className="sticky top-20 flex flex-col gap-4">
            {/* Government schemes */}
            <div className="rounded-xl border bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  Government Schemes
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {business.governmentSchemes.map((scheme) => (
                  <Badge key={scheme} variant="outline" className="text-xs">
                    {scheme}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {business.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* PDF download (UI only) */}
            <Button variant="outline" className="gap-2 w-full">
              <FileDown className="h-4 w-4" />
              Download Report (PDF)
            </Button>

            {/* Back to list */}
            <Button variant="ghost" asChild className="gap-2 w-full">
              <Link href="/categories">
                <ArrowLeft className="h-4 w-4" />
                Back to all businesses
              </Link>
            </Button>
          </div>
        </aside>
      </div>

      {/* Related businesses */}
      {relatedBusinesses.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground">
            Related Businesses
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedBusinesses.map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
