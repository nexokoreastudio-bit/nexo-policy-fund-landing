export type AppConfig = {
  policy_year: number
  policy_open: boolean
  official_url: string
  announce_url: string
  support_rate_normal: number
  support_rate_special: number
  support_max_amount: number
}

export type PolicyData = {
  year: number
  updated_at: string | null
  support_types: Array<{ name: string; description?: string }>
  caps: Record<string, number>
  rates: Record<string, number>
  price_table: Array<{ model: string; price: number; note?: string }>
}

export type LeadRecord = {
  created_at: string
  inquiry_type: 'policy_waitlist' | 'consult'
  formData: Record<string, string | boolean>
}
