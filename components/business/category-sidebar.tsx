"use client"

import { Sprout, Factory, Monitor, Beef, LayoutGrid } from "lucide-react"
import { categories } from "@/data/categories"
import { businesses } from "@/data/businesses"
import { cn } from "@/lib/utils"

const categoryIcons: Record<string, React.ElementType> = {
  "agri-tech": Sprout,
  manufacturing: Factory,
  "digital-services": Monitor,
  livestock: Beef,
}

export function CategorySidebar({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (slug: string) => void
}) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Business categories">
      <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Categories
      </h3>

      <button
        onClick={() => onSelect("all")}
        className={cn(
          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          selected === "all"
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="flex-1 text-left">All Categories</span>
        <span className="text-xs tabular-nums">{businesses.length}</span>
      </button>

      {categories.map((cat) => {
        const Icon = categoryIcons[cat.slug] || Sprout
        const count = businesses.filter(
          (b) => b.categorySlug === cat.slug
        ).length

        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.slug)}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              selected === cat.slug
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="flex-1 text-left">{cat.name.split("&")[0].trim()}</span>
            <span className="text-xs tabular-nums">{count}</span>
          </button>
        )
      })}
    </nav>
  )
}
