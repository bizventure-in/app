import type { Metadata } from "next"
import { AdminContent } from "@/components/admin/admin-content"

export const metadata: Metadata = {
  title: "Admin Panel",
  description:
    "Admin panel for managing businesses, categories, and tags in the BizVenture India Ecosystem.",
}

export default function AdminPage() {
  return <AdminContent />
}
