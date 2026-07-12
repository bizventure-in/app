import Link from "next/link"
import { Sprout, Factory, Monitor, Beef, ArrowRight } from "lucide-react"
import { categories } from "@/data/categories"
import { getCategoryColor } from "@/data/categories"
import { cn } from "@/lib/utils"

const categoryIcons: Record<string, React.ElementType> = {
  "agri-tech": Sprout,
  manufacturing: Factory,
  "digital-services": Monitor,
  livestock: Beef,
}

export function CategoryCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
          Explore by Category
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Four high-growth sectors with 25+ business ideas each, tailored for
          rural and urban entrepreneurs alike.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => {
          const Icon = categoryIcons[cat.slug] || Sprout
          const colors = getCategoryColor(cat.color)

          return (
            <Link
              key={cat.id}
              href={`/categories?category=${cat.slug}`}
              className="group relative flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg border",
                  colors.bg,
                  colors.border
                )}
              >
                <Icon className={cn("h-6 w-6", colors.text)} />
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between pt-2 border-t border-border/50">
                <span className="text-sm font-medium text-foreground">
                  {cat.businessCount} ideas
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
