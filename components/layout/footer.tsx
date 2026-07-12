import Link from "next/link"
import { Sprout } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                <img src="/bizventure-in.png" alt="BizVenture India Ecosystem Logo" className="object-contain" />
              </div>
              <span className="text-lg font-bold text-foreground">
                BizVenture India Ecosystem
              </span> 
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Discover and explore 100+ curated business ideas across agriculture,
              manufacturing, digital services, and livestock sectors. Built for
              aspiring entrepreneurs and changemakers.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Explore</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li><Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link href="/admin" className="hover:text-foreground transition-colors">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Categories</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/categories?category=agri-tech" className="hover:text-foreground transition-colors">Agri-Tech & Smart Farming</Link></li>
              <li><Link href="/categories?category=manufacturing" className="hover:text-foreground transition-colors">Manufacturing & Engineering</Link></li>
              <li><Link href="/categories?category=digital-services" className="hover:text-foreground transition-colors">Digital & Technical Services</Link></li>
              <li><Link href="/categories?category=livestock" className="hover:text-foreground transition-colors">Livestock & Allied</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          {"Built with purpose. \u00A9 "}{new Date().getFullYear()}{" BizVenture India Ecosystem. All rights reserved."}
        </div>
      </div>
    </footer>
  )
}
