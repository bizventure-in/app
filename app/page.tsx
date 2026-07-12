import { HeroSection } from "@/components/home/hero-section"
import { CategoryCards } from "@/components/home/category-cards"
import { FeaturedBusinesses } from "@/components/home/featured-businesses"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryCards />
      <FeaturedBusinesses />
      <CTASection />
    </>
  )
}
