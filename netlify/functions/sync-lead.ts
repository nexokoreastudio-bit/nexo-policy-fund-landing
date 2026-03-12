import { google } from 'googleapis'
import type { Handler } from '@netlify/functions'

type LeadPayload = {
  created_at: string
  inquiry_type: 'policy_waitlist' | 'consult'
  formData: Record<string, string | boolean>
}

function getEnv(name: string, fallback = '') {
  return process.env[name] ?? fallback
}

function toInquiryLabel(type: LeadPayload['inquiry_type']) {
  return type === 'policy_waitlist' ? '공지 알림 신청' : '상담 신청'
}

function toRow(payload: LeadPayload) {
  const base = [payload.created_at, toInquiryLabel(payload.inquiry_type)]
  const utm = [
    String(payload.formData.utm_source ?? ''),
    String(payload.formData.utm_medium ?? ''),
    String(payload.formData.utm_campaign ?? ''),
    String(payload.formData.utm_content ?? ''),
  ]

  if (payload.inquiry_type === 'policy_waitlist') {
    return [
      ...base,
      String(payload.formData.name ?? ''),
      String(payload.formData.phone ?? ''),
      String(payload.formData.email ?? ''),
      String(payload.formData.region ?? ''),
      String(payload.formData.interestInch ?? ''),
      String(payload.formData.tag ?? ''),
      String(payload.formData.agree ?? ''),
      ...utm,
    ]
  }

  return [
    ...base,
    String(payload.formData.name ?? ''),
    String(payload.formData.phone ?? ''),
    String(payload.formData.businessName ?? ''),
    String(payload.formData.manager_name ?? ''),
    String(payload.formData.manager_phone ?? ''),
    String(payload.formData.address ?? ''),
    String(payload.formData.address_detail ?? ''),
    String(payload.formData.consult_time ?? ''),
    String(payload.formData.region ?? ''),
    String(payload.formData.support_type ?? ''),
    String(payload.formData.message ?? ''),
    String(payload.formData.agree ?? ''),
    ...utm,
  ]
}

async function appendToSheet(payload: LeadPayload) {
  const clientEmail = getEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL')
  const privateKeyRaw = getEnv('GOOGLE_PRIVATE_KEY')

  if (!clientEmail || !privateKeyRaw) {
    throw new Error('google service account env is missing')
  }

  const privateKey = privateKeyRaw.replace(/^"|"$/g, '').replace(/\\n/g, '\n')
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const waitlistSheetId = getEnv('WAITLIST_SHEET_ID', '1ux89Z0g4oMex_bD_28Gd8Vo5Bv4IZjh2BfCIpVJrXEI')
  const consultSheetId = getEnv('CONSULT_SHEET_ID', '1W_LyImnYkP4fsOZgfQsAFw8xTP1j2cZM7b3A-ohK0bA')
  const waitlistRange = getEnv('WAITLIST_SHEET_RANGE', 'A:Z')
  const consultRange = getEnv('CONSULT_SHEET_RANGE', 'A:Z')

  const spreadsheetId = payload.inquiry_type === 'policy_waitlist' ? waitlistSheetId : consultSheetId
  const range = payload.inquiry_type === 'policy_waitlist' ? waitlistRange : consultRange

  if (!spreadsheetId) {
    throw new Error('spreadsheet id is missing')
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [toRow(payload)],
    },
  })
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, message: 'Method not allowed' }),
    }
  }

  try {
    const payload = JSON.parse(event.body ?? '{}') as LeadPayload
    await appendToSheet(payload)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    }
  } catch (error) {
    console.error('[sync-lead] failed', {
      message: error instanceof Error ? error.message : 'unknown',
      hasClientEmail: Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL),
      hasPrivateKey: Boolean(process.env.GOOGLE_PRIVATE_KEY),
      hasConsultSheetId: Boolean(process.env.CONSULT_SHEET_ID),
      hasWaitlistSheetId: Boolean(process.env.WAITLIST_SHEET_ID),
    })

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: false,
        message: error instanceof Error ? error.message : 'unknown error',
      }),
    }
  }
}
