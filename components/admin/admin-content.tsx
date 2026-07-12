"use client"

import { useState } from "react"
import {
  Plus,
  Pencil,
  LayoutGrid,
  Tag,
  Trash2,
  Search,
  Sprout,
  Factory,
  Monitor,
  Beef,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { businesses } from "@/data/businesses"
import { categories } from "@/data/categories"
import { cn } from "@/lib/utils"

const categoryIcons: Record<string, React.ElementType> = {
  "agri-tech": Sprout,
  manufacturing: Factory,
  "digital-services": Monitor,
  livestock: Beef,
}

export function AdminContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("businesses")

  const filteredBusinesses = businesses.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Collect all unique tags
  const allTags = Array.from(new Set(businesses.flatMap((b) => b.tags))).sort()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Admin Panel
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage businesses, categories, and tags. (UI preview only)
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="businesses" className="gap-1.5">
            <Pencil className="h-3.5 w-3.5" />
            Businesses
          </TabsTrigger>
          <TabsTrigger value="add" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Add New
          </TabsTrigger>
          <TabsTrigger value="categories" className="gap-1.5">
            <LayoutGrid className="h-3.5 w-3.5" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="tags" className="gap-1.5">
            <Tag className="h-3.5 w-3.5" />
            Tags
          </TabsTrigger>
        </TabsList>

        {/* ---- Businesses Tab ---- */}
        <TabsContent value="businesses">
          <div className="rounded-xl border bg-card">
            <div className="flex items-center gap-3 border-b p-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search businesses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => setActiveTab("add")}
              >
                <Plus className="h-3.5 w-3.5" />
                Add Business
              </Button>
            </div>

            <div className="divide-y">
              {filteredBusinesses.slice(0, 20).map((b) => {
                const Icon = categoryIcons[b.categorySlug] || Sprout
                return (
                  <div
                    key={b.id}
                    className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-secondary/50"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {b.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {b.category}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[10px]",
                        b.investmentLevel === "Low" &&
                          "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                        b.investmentLevel === "Medium" &&
                          "bg-amber-500/10 text-amber-700 dark:text-amber-400",
                        b.investmentLevel === "High" &&
                          "bg-red-500/10 text-red-700 dark:text-red-400"
                      )}
                    >
                      {b.investmentLevel}
                    </Badge>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-3.5 w-3.5" />
                            <span className="sr-only">Edit {b.name}</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Edit: {b.name}</DialogTitle>
                          </DialogHeader>
                          <EditBusinessForm business={b} />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Delete {b.name}</span>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredBusinesses.length > 20 && (
              <div className="border-t p-3 text-center text-xs text-muted-foreground">
                Showing 20 of {filteredBusinesses.length} businesses
              </div>
            )}
          </div>
        </TabsContent>

        {/* ---- Add Business Tab ---- */}
        <TabsContent value="add">
          <div className="rounded-xl border bg-card p-6">
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Add New Business
            </h2>
            <AddBusinessForm />
          </div>
        </TabsContent>

        {/* ---- Categories Tab ---- */}
        <TabsContent value="categories">
          <div className="rounded-xl border bg-card">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-sm font-semibold text-foreground">
                Category Manager
              </h2>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Add Category
              </Button>
            </div>
            <div className="divide-y">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat.slug] || Sprout
                const count = businesses.filter(
                  (b) => b.categorySlug === cat.slug
                ).length
                return (
                  <div
                    key={cat.id}
                    className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-secondary/50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-secondary">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {cat.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {cat.description}
                      </p>
                    </div>
                    <Badge variant="secondary">{count} businesses</Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="sr-only">Edit {cat.name}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Delete {cat.name}</span>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </TabsContent>

        {/* ---- Tags Tab ---- */}
        <TabsContent value="tags">
          <div className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                Tag Manager ({allTags.length} tags)
              </h2>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Add Tag
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const count = businesses.filter((b) =>
                  b.tags.includes(tag)
                ).length
                return (
                  <div
                    key={tag}
                    className="group flex items-center gap-1 rounded-lg border bg-secondary px-3 py-1.5 text-sm transition-colors hover:bg-muted"
                  >
                    <span className="text-foreground">{tag}</span>
                    <span className="text-xs text-muted-foreground">({count})</span>
                    <button
                      className="ml-1 hidden rounded p-0.5 hover:bg-destructive/10 group-hover:block"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AddBusinessForm() {
  return (
    <form
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="sm:col-span-2">
        <Label htmlFor="name">Business Name</Label>
        <Input id="name" placeholder="e.g., Hydroponic Farming" className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="investment">Investment Level</Label>
        <Select>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="investment-range">Investment Range</Label>
        <Input
          id="investment-range"
          placeholder="e.g., 5-15 Lakhs"
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="profit-margin">Profit Margin</Label>
        <Input
          id="profit-margin"
          placeholder="e.g., 40-60%"
          className="mt-1.5"
        />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="overview">Overview</Label>
        <Textarea
          id="overview"
          placeholder="Business description..."
          className="mt-1.5"
          rows={3}
        />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="market">Market Opportunity</Label>
        <Textarea
          id="market"
          placeholder="Describe the market opportunity..."
          className="mt-1.5"
          rows={2}
        />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          placeholder="e.g., organic, farming, technology"
          className="mt-1.5"
        />
      </div>
      <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
        <Button variant="outline">Cancel</Button>
        <Button>Add Business</Button>
      </div>
    </form>
  )
}

function EditBusinessForm({ business }: { business: typeof businesses[0] }) {
  return (
    <form
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="sm:col-span-2">
        <Label htmlFor="edit-name">Business Name</Label>
        <Input
          id="edit-name"
          defaultValue={business.name}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="edit-category">Category</Label>
        <Select defaultValue={business.categorySlug}>
          <SelectTrigger className="mt-1.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="edit-investment">Investment Level</Label>
        <Select defaultValue={business.investmentLevel}>
          <SelectTrigger className="mt-1.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="edit-overview">Overview</Label>
        <Textarea
          id="edit-overview"
          defaultValue={business.overview}
          className="mt-1.5"
          rows={3}
        />
      </div>
      <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </form>
  )
}
