export interface Plan {
  id: number
  name: string
  description: string
  price: string
  period: "month" | "year"
  validity: number
  total: number
  cost: string
  icon: string
  badge: string | null
  highlighted: number
  features: string[]
  created_at: string
}
