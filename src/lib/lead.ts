import type { LeadRecord } from '../types/policy'

function toFormName(type: LeadRecord['inquiry_type']) {
  return type === 'policy_waitlist' ? 'nexo_policy_waitlist' : 'nexo_policy_consult'
}

function toFlatFields(payload: LeadRecord) {
  const fields: Record<string, string> = {
    created_at: payload.created_at,
    inquiry_type: payload.inquiry_type,
  }

  Object.entries(payload.formData).forEach(([key, value]) => {
    fields[key] = String(value)
  })

  return fields
}

async function submitToNetlifyForm(payload: LeadRecord) {
  const formName = toFormName(payload.inquiry_type)
  const fields = toFlatFields(payload)
  const body = new URLSearchParams({
    'form-name': formName,
    ...fields,
  })

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!response.ok) {
    throw new Error('netlify form submit failed')
  }
}

async function submitToSheetSync(payload: LeadRecord) {
  await fetch('/.netlify/functions/sync-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

function saveLocalFallback(payload: LeadRecord) {
  const key = 'nexo_leads'
  const prev = localStorage.getItem(key)
  const list = prev ? (JSON.parse(prev) as LeadRecord[]) : []
  list.push(payload)
  localStorage.setItem(key, JSON.stringify(list))
}

export async function submitLead(payload: LeadRecord) {
  try {
    await submitToNetlifyForm(payload)
    await submitToSheetSync(payload)
    return { ok: true, adapter: 'netlify+sheet' as const }
  } catch {
    saveLocalFallback(payload)
    return { ok: true, adapter: 'local' as const }
  }
}
