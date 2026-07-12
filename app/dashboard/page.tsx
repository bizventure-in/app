import type { Metadata } from "next"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Business ecosystem dashboard with category distribution, investment analysis, bookmarks, and recently viewed businesses.",
}

export default function DashboardPage() {
  return <DashboardContent />
}
