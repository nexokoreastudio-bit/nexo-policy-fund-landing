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

function toRow(payload: LeadPayload) {
  const base = [payload.created_at, payload.inquiry_type]

  if (payload.inquiry_type === 'policy_waitlist') {
    return [
      ...base,
      String(payload.formData.name ?? ''),
      String(payload.formData.phone ?? ''),
      String(payload.formData.email ?? ''),
      String(payload.formData.region ?? ''),
      String(payload.formData.industry ?? ''),
      String(payload.formData.interestInch ?? ''),
      String(payload.formData.tag ?? ''),
      String(payload.formData.agree ?? ''),
    ]
  }

  return [
    ...base,
    String(payload.formData.name ?? ''),
    String(payload.formData.phone ?? ''),
    String(payload.formData.businessName ?? ''),
    String(payload.formData.region ?? ''),
    String(payload.formData.installEnv ?? ''),
    String(payload.formData.message ?? ''),
    String(payload.formData.agree ?? ''),
  ]
}

async function appendToSheet(payload: LeadPayload) {
  const clientEmail = getEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL')
  const privateKeyRaw = getEnv('GOOGLE_PRIVATE_KEY')

  if (!clientEmail || !privateKeyRaw) {
    throw new Error('google service account env is missing')
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, '\n')
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
