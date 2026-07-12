import type { Category } from "@/types/business"

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Agri-Tech & Smart Farming",
    slug: "agri-tech",
    description:
      "Innovative agricultural technologies and modern farming solutions for sustainable growth.",
    icon: "Sprout",
    color: "emerald",
    businessCount: 25,
  },
  {
    id: "cat-2",
    name: "Manufacturing & Engineering",
    slug: "manufacturing",
    description:
      "Small-scale manufacturing and engineering units with high demand and steady returns.",
    icon: "Factory",
    color: "blue",
    businessCount: 25,
  },
  {
    id: "cat-3",
    name: "Digital & Technical Services",
    slug: "digital-services",
    description:
      "Technology-driven service businesses for the digital economy and modern workforce.",
    icon: "Monitor",
    color: "cyan",
    businessCount: 25,
  },
  {
    id: "cat-4",
    name: "Livestock & Allied",
    slug: "livestock",
    description:
      "Animal husbandry and allied businesses with consistent market demand.",
    icon: "Beef",
    color: "amber",
    businessCount: 25,
  },
]

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getCategoryColor(color: string) {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/20" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/20" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-500/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/20" },
  }
  return colors[color] || colors.emerald
}
