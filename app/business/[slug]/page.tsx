import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { businesses } from "@/data/businesses"
import { BusinessDetailContent } from "@/components/business/business-detail-content"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const business = businesses.find((b) => b.slug === slug)
  if (!business) return { title: "Not Found" }

  return {
    title: business.name,
    description: business.overview,
  }
}

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }))
}

export default async function BusinessDetailPage({ params }: Props) {
  const { slug } = await params
  const business = businesses.find((b) => b.slug === slug)
  if (!business) notFound()

  const relatedBusinesses = businesses
    .filter((b) => b.categorySlug === business.categorySlug && b.id !== business.id)
    .slice(0, 4)

  return (
    <BusinessDetailContent
      business={business}
      relatedBusinesses={relatedBusinesses}
    />
  )
}
