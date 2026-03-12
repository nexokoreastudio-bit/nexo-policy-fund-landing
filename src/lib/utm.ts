const STORAGE_KEY = 'nexo_utm_context'

export type UtmContext = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  partner_code?: string
  partner_name?: string
}

function pickValue(value: string | null, maxLength = 120) {
  if (!value) return undefined
  const next = value.trim()
  return next ? next.slice(0, maxLength) : undefined
}

export function parseUtmFromSearch(search: string): UtmContext {
  const params = new URLSearchParams(search)
  const partnerCode = params.get('partner_code') ?? params.get('partner')
  const partnerName = params.get('partner_name') ?? params.get('academy') ?? params.get('partner_label')

  return {
    utm_source: pickValue(params.get('utm_source')),
    utm_medium: pickValue(params.get('utm_medium')),
    utm_campaign: pickValue(params.get('utm_campaign')),
    utm_content: pickValue(params.get('utm_content')),
    partner_code: pickValue(partnerCode, 80),
    partner_name: pickValue(partnerName, 80),
  }
}

export function getStoredUtm(): UtmContext {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as UtmContext) : {}
  } catch {
    return {}
  }
}

export function mergeAndStoreUtm(search: string): UtmContext {
  const parsed = parseUtmFromSearch(search)
  const prev = getStoredUtm()
  const next = {
    utm_source: parsed.utm_source ?? prev.utm_source,
    utm_medium: parsed.utm_medium ?? prev.utm_medium,
    utm_campaign: parsed.utm_campaign ?? prev.utm_campaign,
    utm_content: parsed.utm_content ?? prev.utm_content,
    partner_code: parsed.partner_code ?? prev.partner_code,
    partner_name: parsed.partner_name ?? prev.partner_name,
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore storage errors
  }

  return next
}
