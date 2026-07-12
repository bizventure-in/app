"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BusinessCard } from "@/components/business/business-card"
import { CategorySidebar } from "@/components/business/category-sidebar"
import { businesses } from "@/data/businesses"
import { categories } from "@/data/categories"
import type { InvestmentLevel, ProfitRange } from "@/types/business"

const ITEMS_PER_PAGE = 12

export function CategoriesContent() {
  const searchParams = useSearchParams()

  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "all"
  )
  const [investmentFilter, setInvestmentFilter] = useState<string>("all")
  const [profitFilter, setProfitFilter] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)

  // Sync URL param to state
  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat) setSelectedCategory(cat)
    if (searchParams.get("focus") === "search") {
      document.getElementById("search-input")?.focus()
    }
  }, [searchParams])

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      if (query && !b.name.toLowerCase().includes(query.toLowerCase()) &&
          !b.overview.toLowerCase().includes(query.toLowerCase()) &&
          !b.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
        return false
      if (selectedCategory !== "all" && b.categorySlug !== selectedCategory)
        return false
      if (investmentFilter !== "all" && b.investmentLevel !== investmentFilter)
        return false
      if (profitFilter !== "all" && b.profitRange !== profitFilter) return false
      return true
    })
  }, [query, selectedCategory, investmentFilter, profitFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  const hasFilters =
    selectedCategory !== "all" ||
    investmentFilter !== "all" ||
    profitFilter !== "all" ||
    query !== ""

  function clearFilters() {
    setQuery("")
    setSelectedCategory("all")
    setInvestmentFilter("all")
    setProfitFilter("all")
    setPage(1)
  }

  // Reset page on filter change
  useEffect(() => {
    setPage(1)
  }, [query, selectedCategory, investmentFilter, profitFilter])

  const activeCategoryName =
    selectedCategory === "all"
      ? "All Categories"
      : categories.find((c) => c.slug === selectedCategory)?.name || "All"

  const filterControls = (
    <div className="flex flex-col gap-3">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Investment Level
        </label>
        <Select value={investmentFilter} onValueChange={setInvestmentFilter}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Profit Range
        </label>
        <Select value={profitFilter} onValueChange={setProfitFilter}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ranges</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Very High">Very High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5">
          <X className="h-3.5 w-3.5" />
          Clear all filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Business Ideas
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {filtered.length} businesses found
          {selectedCategory !== "all" && (
            <> in <span className="font-medium text-foreground">{activeCategoryName}</span></>
          )}
        </p>
      </div>

      {/* Search + Filter bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="search-input"
            placeholder="Search businesses by name, description, or tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Desktop filters */}
        <div className="hidden items-center gap-2 sm:flex">
          <Select value={investmentFilter} onValueChange={setInvestmentFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Investment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>

          <Select value={profitFilter} onValueChange={setProfitFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Profit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ranges</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Very High">Very High</SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-muted-foreground">
              <X className="h-3.5 w-3.5" />
              Clear
            </Button>
          )}
        </div>

        {/* Mobile filter button */}
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetTrigger asChild className="sm:hidden">
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasFilters && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
                  Active
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 px-1">{filterControls}</div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active filters */}
      {hasFilters && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="gap-1 pr-1">
              {activeCategoryName}
              <button
                onClick={() => setSelectedCategory("all")}
                className="ml-0.5 rounded-full p-0.5 hover:bg-muted"
                aria-label={`Remove ${activeCategoryName} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {investmentFilter !== "all" && (
            <Badge variant="secondary" className="gap-1 pr-1">
              {investmentFilter} Investment
              <button
                onClick={() => setInvestmentFilter("all")}
                className="ml-0.5 rounded-full p-0.5 hover:bg-muted"
                aria-label="Remove investment filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {profitFilter !== "all" && (
            <Badge variant="secondary" className="gap-1 pr-1">
              {profitFilter} Profit
              <button
                onClick={() => setProfitFilter("all")}
                className="ml-0.5 rounded-full p-0.5 hover:bg-muted"
                aria-label="Remove profit filter"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Layout: Sidebar + Grid */}
      <div className="flex gap-6">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-20">
            <CategorySidebar
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-20 text-center">
              <Search className="mb-3 h-10 w-10 text-muted-foreground/40" />
              <h3 className="text-lg font-semibold text-foreground">
                No businesses found
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
              <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4">
                Clear all filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {paginated.map((b) => (
                  <BusinessCard key={b.id} business={b} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <Button
                          key={p}
                          variant={p === page ? "default" : "ghost"}
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setPage(p)}
                        >
                          {p}
                        </Button>
                      )
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
