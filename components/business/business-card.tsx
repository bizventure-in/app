import Link from "next/link"
import {
  Sprout,
  Factory,
  Monitor,
  Beef,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Business } from "@/types/business"
import { cn } from "@/lib/utils"

const categoryIcons: Record<string, React.ElementType> = {
  "agri-tech": Sprout,
  "manufacturing": Factory,
  "digital-services": Monitor,
  "livestock": Beef,
}

const categoryColors: Record<string, string> = {
  "agri-tech": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "manufacturing": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "digital-services": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  "livestock": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
}

const investmentColors: Record<string, string> = {
  Low: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Medium: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  High: "bg-red-500/10 text-red-700 dark:text-red-400",
}

export function BusinessCard({ business }: { business: Business }) {
  const CategoryIcon = categoryIcons[business.categorySlug] || Sprout

  return (
    <Link
      href={`/business/${business.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Category + Investment */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
              categoryColors[business.categorySlug]
            )}
          >
            <CategoryIcon className="h-3 w-3" />
            {business.category.split(" ")[0]}
          </span>
          <span
            className={cn(
              "rounded-md px-2 py-0.5 text-xs font-medium",
              investmentColors[business.investmentLevel]
            )}
          >
            {business.investmentLevel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors text-balance">
          {business.name}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {business.overview}
        </p>

        {/* Stats row */}
        <div className="mt-auto flex items-center gap-4 pt-3 border-t border-border/50">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium text-foreground">{business.profitMargin}</span>
            <span>profit</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {business.investmentRange}
          </div>
          <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {business.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-[10px] px-1.5 py-0 font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  )
}
