import type { Metadata } from "next"
import { Suspense } from "react"
import { CategoriesContent } from "@/components/business/categories-content"

export const metadata: Metadata = {
  title: "Browse Business Ideas",
  description:
    "Explore 100+ business ideas across agriculture, manufacturing, digital services, and livestock sectors. Filter by investment level, profit range, and category.",
}

export default function CategoriesPage() {
  return (
    <Suspense>
      <CategoriesContent />
    </Suspense>
  )
}
