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

function getHeaders(type: LeadPayload['inquiry_type']) {
  if (type === 'policy_waitlist') {
    return [
      '접수일시',
      '신청유형',
      '이름',
      '연락처',
      '이메일',
      '지역',
      '관심 인치',
      '태그',
      '개인정보 동의',
      '업체코드',
      '업체명',
      '유입 URL',
      '리퍼러',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'UTM Content',
    ]
  }

  return [
    '접수일시',
    '신청유형',
    '대표자 성명',
    '대표자 연락처',
    '상호',
    '담당자 성명',
    '담당자 연락처',
    '주소',
    '상세 주소',
    '상담 가능 시간',
    '지역',
    '지원 유형',
    '추가 문의 내용',
    '개인정보 동의',
    '업체코드',
    '업체명',
    '유입 URL',
    '리퍼러',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'UTM Content',
  ]
}

function toRow(payload: LeadPayload) {
  const base = [payload.created_at, toInquiryLabel(payload.inquiry_type)]
  const partner = [
    String(payload.formData.partner_code ?? ''),
    String(payload.formData.partner_name ?? ''),
    String(payload.formData.entry_url ?? ''),
    String(payload.formData.referrer ?? ''),
  ]
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
      ...partner,
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
    ...partner,
    ...utm,
  ]
}

function sanitizeSheetTitle(value: string) {
  return value
    .replace(/[\[\]\*\/\\\?\:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80)
}

function toSheetRange(sheetTitle: string, range = 'A:Z') {
  const escapedTitle = sheetTitle.replace(/'/g, "''")
  return `'${escapedTitle}'!${range}`
}

async function ensureSheetExists(params: {
  sheets: ReturnType<typeof google.sheets>
  spreadsheetId: string
  title: string
  headers: string[]
}) {
  const { sheets, spreadsheetId, title, headers } = params
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets.properties.title',
  })

  const exists = meta.data.sheets?.some((sheet) => sheet.properties?.title === title)

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title,
              },
            },
          },
        ],
      },
    })
  }

  const headerRange = toSheetRange(title, '1:1')
  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  })

  const hasHeader = Boolean(headerResponse.data.values?.[0]?.length)

  if (!hasHeader) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: headerRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [headers],
      },
    })
  }
}

async function appendRows(params: {
  sheets: ReturnType<typeof google.sheets>
  spreadsheetId: string
  range: string
  values: string[]
}) {
  const { sheets, spreadsheetId, range, values } = params

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [values],
    },
  })
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
  const consultPartnerPrefix = getEnv('CONSULT_PARTNER_SHEET_PREFIX', '업체_')

  const spreadsheetId = payload.inquiry_type === 'policy_waitlist' ? waitlistSheetId : consultSheetId
  const range = payload.inquiry_type === 'policy_waitlist' ? waitlistRange : consultRange
  const row = toRow(payload)

  if (!spreadsheetId) {
    throw new Error('spreadsheet id is missing')
  }

  await appendRows({
    sheets,
    spreadsheetId,
    range,
    values: row,
  })

  if (payload.inquiry_type !== 'consult') return

  const partnerRaw = String(payload.formData.partner_name ?? payload.formData.partner_code ?? '').trim()
  const partnerTitle = sanitizeSheetTitle(partnerRaw)

  if (!partnerTitle) return

  const finalTitle = sanitizeSheetTitle(`${consultPartnerPrefix}${partnerTitle}`) || partnerTitle
  await ensureSheetExists({
    sheets,
    spreadsheetId,
    title: finalTitle,
    headers: getHeaders(payload.inquiry_type),
  })
  await appendRows({
    sheets,
    spreadsheetId,
    range: toSheetRange(finalTitle),
    values: row,
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
