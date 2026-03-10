const STORAGE_KEY = 'nexo_utm_context'

const allowedSource = new Set(['sms', 'kakao', 'blog', 'academy_union', 'organic'])
const allowedMedium = new Set(['text', 'social', 'referral'])
const allowedCampaign = new Set(['2026_smartstore_launch'])
const allowedContent = new Set(['hero', 'form', 'guide', 'partner_name'])

export type UtmContext = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
}

function pickAllowed(value: string | null, allowed: Set<string>) {
  if (!value) return undefined
  return allowed.has(value) ? value : undefined
}

export function parseUtmFromSearch(search: string): UtmContext {
  const params = new URLSearchParams(search)

  return {
    utm_source: pickAllowed(params.get('utm_source'), allowedSource),
    utm_medium: pickAllowed(params.get('utm_medium'), allowedMedium),
    utm_campaign: pickAllowed(params.get('utm_campaign'), allowedCampaign),
    utm_content: pickAllowed(params.get('utm_content'), allowedContent),
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
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore storage errors
  }

  return next
}
