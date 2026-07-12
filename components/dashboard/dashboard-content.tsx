"use client"

import { useMemo } from "react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  Sprout,
  Factory,
  Monitor,
  Beef,
  TrendingUp,
  DollarSign,
  LayoutGrid,
  Bookmark,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { businesses } from "@/data/businesses"
import { categories } from "@/data/categories"
import Link from "next/link"
import { useState } from "react"
import type { Business } from "@/types/business"

const COLORS = {
  "agri-tech": "#10b981",
  manufacturing: "#3b82f6",
  "digital-services": "#06b6d4",
  livestock: "#f59e0b",
}

const investmentColors = {
  Low: "#10b981",
  Medium: "#f59e0b",
  High: "#ef4444",
}

const categoryIcons: Record<string, React.ElementType> = {
  "agri-tech": Sprout,
  manufacturing: Factory,
  "digital-services": Monitor,
  livestock: Beef,
}

export function DashboardContent() {
  const [investFilter, setInvestFilter] = useState("all")

  const filteredBusinesses = useMemo(() => {
    if (investFilter === "all") return businesses
    return businesses.filter((b) => b.investmentLevel === investFilter)
  }, [investFilter])

  // Category distribution data
  const categoryData = categories.map((cat) => ({
    name: cat.name.split("&")[0].trim(),
    fullName: cat.name,
    count: filteredBusinesses.filter((b) => b.categorySlug === cat.slug).length,
    color: COLORS[cat.slug as keyof typeof COLORS],
  }))

  // Investment distribution
  const investmentData = [
    {
      name: "Low",
      count: filteredBusinesses.filter((b) => b.investmentLevel === "Low").length,
      color: investmentColors.Low,
    },
    {
      name: "Medium",
      count: filteredBusinesses.filter((b) => b.investmentLevel === "Medium").length,
      color: investmentColors.Medium,
    },
    {
      name: "High",
      count: filteredBusinesses.filter((b) => b.investmentLevel === "High").length,
      color: investmentColors.High,
    },
  ]

  // Profit distribution
  const profitData = ["Low", "Medium", "High", "Very High"].map((level) => ({
    name: level,
    count: filteredBusinesses.filter((b) => b.profitRange === level).length,
  }))

  // Bookmarked businesses (mock)
  const [bookmarked, setBookmarked] = useState<string[]>([
    "hydroponic-farming",
    "digital-marketing-agency",
    "hi-tech-dairy-farm",
  ])

  const bookmarkedBusinesses = businesses.filter((b) =>
    bookmarked.includes(b.slug)
  )

  // Recently viewed (mock)
  const recentlyViewed = businesses.slice(0, 5)

  function toggleBookmark(slug: string) {
    setBookmarked((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of all business ideas in the ecosystem.
          </p>
        </div>
        <Select value={investFilter} onValueChange={setInvestFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by investment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Investment Levels</SelectItem>
            <SelectItem value="Low">Low Investment</SelectItem>
            <SelectItem value="Medium">Medium Investment</SelectItem>
            <SelectItem value="High">High Investment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={LayoutGrid}
          label="Total Businesses"
          value={filteredBusinesses.length}
        />
        <StatCard
          icon={DollarSign}
          label="Low Investment"
          value={filteredBusinesses.filter((b) => b.investmentLevel === "Low").length}
        />
        <StatCard
          icon={TrendingUp}
          label="High Profit"
          value={
            filteredBusinesses.filter(
              (b) => b.profitRange === "High" || b.profitRange === "Very High"
            ).length
          }
        />
        <StatCard
          icon={Bookmark}
          label="Bookmarked"
          value={bookmarkedBusinesses.length}
        />
      </div>

      {/* Charts row */}
      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        {/* Category distribution chart */}
        <div className="rounded-xl border bg-card p-5">
          <h2 className="mb-4 text-sm font-semibold text-foreground">
            Category Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  className="fill-muted-foreground"
                />
                <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Investment pie chart */}
        <div className="rounded-xl border bg-card p-5">
          <h2 className="mb-4 text-sm font-semibold text-foreground">
            Investment Level Breakdown
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={investmentData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={2}
                  label={({ name, count }) => `${name}: ${count}`}
                  labelLine={false}
                >
                  {investmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  formatter={(value) => (
                    <span className="text-xs text-muted-foreground">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Profit distribution */}
      <div className="mb-8 rounded-xl border bg-card p-5">
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          Profit Range Distribution
        </h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={profitData} layout="vertical" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 11 }}
                width={70}
                className="fill-muted-foreground"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row: Bookmarks + Recently Viewed */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Bookmarked */}
        <div className="rounded-xl border bg-card p-5">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Bookmark className="h-4 w-4 text-primary" />
            Saved Businesses
          </h2>
          {bookmarkedBusinesses.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No bookmarked businesses yet.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {bookmarkedBusinesses.map((b) => (
                <BookmarkItem
                  key={b.id}
                  business={b}
                  onRemove={() => toggleBookmark(b.slug)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recently viewed */}
        <div className="rounded-xl border bg-card p-5">
          <h2 className="mb-4 text-sm font-semibold text-foreground">
            Recently Viewed
          </h2>
          <div className="flex flex-col gap-2">
            {recentlyViewed.map((b) => {
              const Icon = categoryIcons[b.categorySlug] || Sprout
              return (
                <Link
                  key={b.id}
                  href={`/business/${b.slug}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="flex-1 truncate font-medium text-foreground">
                    {b.name}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    {b.investmentLevel}
                  </Badge>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: number
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
    </div>
  )
}

function BookmarkItem({
  business,
  onRemove,
}: {
  business: Business
  onRemove: () => void
}) {
  const Icon = categoryIcons[business.categorySlug] || Sprout

  return (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-secondary">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <Link
        href={`/business/${business.slug}`}
        className="flex-1 truncate text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        {business.name}
      </Link>
      <Badge variant="secondary" className="text-[10px]">
        {business.profitMargin}
      </Badge>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0"
        onClick={onRemove}
        aria-label={`Remove ${business.name} from bookmarks`}
      >
        <Bookmark className="h-3.5 w-3.5 fill-primary text-primary" />
      </Button>
    </div>
  )
}
