import type { PolicyData } from '../types/policy'

export type TechType = 'general' | 'rental' | 'saas'
export type SupportRateType = 'normal' | 'vulnerable'

export type SubsidyInput = {
  techType: TechType
  model: string
  quantity: number
  supportRateType: SupportRateType
  vatIncluded: boolean
  paymentMethod: 'bank' | 'card' | 'autopay'
  installments: number
}

export type SubsidyResult = {
  supplyAmount: number
  supportAmount: number
  ownerBurden: number
  vat: number
  totalBurden: number
  capExceeded: boolean
  monthlyInstallment: number | null
}

export function calculateSubsidy(input: SubsidyInput, policy: PolicyData): SubsidyResult {
  const unit = policy.price_table.find((item) => item.model === input.model)?.price ?? 0
  const supplyAmount = unit * input.quantity

  const rawRate = policy.rates[input.supportRateType]
  const rate = typeof rawRate === 'number' ? rawRate : 0
  const rawSupport = Math.floor(supplyAmount * rate)

  const rawCap = policy.caps[input.techType]
  const cap = typeof rawCap === 'number' ? rawCap : Number.MAX_SAFE_INTEGER
  const supportAmount = Math.min(rawSupport, cap)

  const ownerBurden = Math.max(0, supplyAmount - supportAmount)
  const vat = Math.floor(supplyAmount * 0.1)
  const totalBurden = input.vatIncluded ? ownerBurden + vat : ownerBurden
  const capExceeded = rawSupport > cap

  let monthlyInstallment: number | null = null
  if (input.paymentMethod === 'card' && input.installments > 0) {
    monthlyInstallment = Math.ceil(totalBurden / input.installments)
  }

  return {
    supplyAmount,
    supportAmount,
    ownerBurden,
    vat,
    totalBurden,
    capExceeded,
    monthlyInstallment,
  }
}
