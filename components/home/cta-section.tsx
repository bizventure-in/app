import Link from "next/link"
import { ArrowRight, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="border-t bg-gradient-to-b from-primary/5 to-background">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
            Ready to Start Your Entrepreneurial Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Browse our complete database of 100+ business ideas, compare investment
            levels, and find the perfect opportunity for your skills and budget.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/categories">
                Browse All Ideas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/dashboard">
                <BarChart3 className="h-4 w-4" />
                Open Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
