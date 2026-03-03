import type { LeadRecord } from '../types/policy'

type LeadStorageAdapter = {
  save: (payload: LeadRecord) => Promise<void>
}

class ApiLeadAdapter implements LeadStorageAdapter {
  async save(payload: LeadRecord) {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('failed to submit lead')
    }
  }
}

class LocalLeadAdapter implements LeadStorageAdapter {
  async save(payload: LeadRecord) {
    const key = 'nexo_leads'
    const prev = localStorage.getItem(key)
    const list = prev ? (JSON.parse(prev) as LeadRecord[]) : []
    list.push(payload)
    localStorage.setItem(key, JSON.stringify(list))
  }
}

export async function submitLead(payload: LeadRecord) {
  const primary = new ApiLeadAdapter()
  const fallback = new LocalLeadAdapter()

  try {
    await primary.save(payload)
    return { ok: true, adapter: 'api' as const }
  } catch {
    await fallback.save(payload)
    return { ok: true, adapter: 'local' as const }
  }
}
