export type InvestmentLevel = "Low" | "Medium" | "High"
export type ProfitRange = "Low" | "Medium" | "High" | "Very High"

export type CategorySlug =
  | "agri-tech"
  | "manufacturing"
  | "digital-services"
  | "livestock"

export interface Business {
  id: string
  slug: string
  name: string
  category: string
  categorySlug: CategorySlug
  overview: string
  investmentLevel: InvestmentLevel
  investmentRange: string
  profitMargin: string
  profitRange: ProfitRange
  requiredSkills: string[]
  marketOpportunity: string
  riskFactors: string[]
  expansionPotential: string
  governmentSchemes: string[]
  tags: string[]
  icon: string
}

export interface Category {
  id: string
  slug: CategorySlug
  name: string
  description: string
  icon: string
  color: string
  businessCount: number
}
