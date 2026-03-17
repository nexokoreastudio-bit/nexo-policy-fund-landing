import { google } from 'googleapis'
import type { Handler } from '@netlify/functions'

type LeadPayload = {
  created_at: string
  inquiry_type: 'policy_waitlist' | 'consult'
  formData: Record<string, string | boolean>
}

const PARTNER_NAME_BY_CODE: Record<string, string> = {
  nexo: 'NEXO',
  seonggongun: '성공운',
  edunplay: '애듀엔플레이(한국기업렌탈)',
  seonghyogyeong: '성효경',
  parksuchang: '박수창',
  gukminlife: '국민생활개선운동본부',
  haeoreum: '해오름',
  aidenglish: '에이드잉글리쉬',
  samyukenglish: '삼육 잉글리쉬',
  lumibookclub: '루미북클럽',
  mathflat: '매쓰플랫',
  bluebooks: '블루북스',
  'yeong-eomall': '영어몰닷컴',
  learningcube: '러닝큐브',
  '27st': '27번가',
  yedam: '예닮',
  hwangseokin: '황석인',
  bookn: '북앤',
  moonchunsik: '문춘식',
  daeyeongedu: '대영교육',
  saessakedu: '새싹교육',
  jiseongedu: '지성교육',
  kidaridaejeon: '키다리대전',
  baeksangit: '백상정보기술',
  gobyeonghyeon: '고병현',
  ulsankidari: '울산키다리',
  choiyunbeom: '최윤범',
  polyacademy: '폴리어학원',
  hansuyeon: '한수연',
  mathpower: '수학의힘',
  gimgwangun: '김광운',
  nalgaedalgi: '날개달기연합',
  otuline: '오투라인',
  '38math': '38수학',
  eminfo: '이엠정보',
  toplusacademy: '토플러스학원',
  utum: '유투엠',
  jongrom: '종로엠',
  capitown: '캐피타운',
  gukpoong2000: '국풍2000',
  grit831: '그릿831',
  neungyul: '능률',
  timeedu: '타임교육',
  gukpul: '국풀',
  woongjin: '웅진',
  alltascience: '올타과학',
  academystartup: '학원창업닷컴',
  encorporation: '이엔코퍼레이션',
  wonuhoe: '원우회',
  isyou: '이즈유',
  haetbit: '햇빛',
  hankyeonga: '한경아',
  academyoa: '학원전자',
  allcunny: '올커니',
  v365: 'v365',
  studymentor: '공부선배',
  summit: '써밋',
  miraeeducoop: '미래교육 협동조합',
  nexo300: '넥소300',
  academyunion: '학원연합회',
  harmony: '하모니',
  snue: '서울교대',
  koreauniv: '고려대학교',
  gimbaekhyeon: '김백현',
  gimmincheol: '김민철',
  jkoa: 'jk oa',
  bluetie: '블루타이',
  johanju: '조한주',
  songmigyeong: '송미경',
  parkjeongmin: '박정민',
  janghyeongtae: '장형태',
  gangyeongsik: '강영식',
  gimdongmyeong: '김동명',
  gimjinhong: '김진홍',
  gimchungeun: '김춘근',
  parkjonggeun: '박종근',
  bangjieun: '방지은',
  yeomchangjun: '염창준',
  yunhyeon: '윤현',
  iseungyeop: '이승엽',
  ihyeonju: '김동명',
  jeonggyeongsik: '정경식',
  susimdal: '수심달',
}

const CONSULT_MAIN_SHEET_TITLE = '상담신청'
const CONSULT_MANAGER_SHEET_TITLE = '상담관리'
const DIRECT_INBOUND_PARTNER_NAME = '직접유입'

function getEnv(name: string, fallback = '') {
  return process.env[name] ?? fallback
}

function toInquiryLabel(type: LeadPayload['inquiry_type']) {
  return type === 'policy_waitlist' ? '공지 알림 신청' : '상담 신청'
}

function resolveCreatedAt(payload: LeadPayload) {
  const baseDate = payload.created_at ? new Date(payload.created_at) : new Date()
  const safeDate = Number.isNaN(baseDate.getTime()) ? new Date() : baseDate

  const formatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return formatter.format(safeDate).replace('-', '/').replace('-', '/')
}

function resolvePartnerCode(payload: LeadPayload) {
  return String(payload.formData.partner_code ?? '').trim()
}

function resolvePartnerName(payload: LeadPayload) {
  const partnerCode = resolvePartnerCode(payload)
  const mappedName = PARTNER_NAME_BY_CODE[partnerCode]
  if (mappedName) return mappedName

  const rawName = String(payload.formData.partner_name ?? '').trim()
  if (rawName) return rawName

  return PARTNER_NAME_BY_CODE[partnerCode] ?? (partnerCode || DIRECT_INBOUND_PARTNER_NAME)
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

function getConsultManagerHeaders() {
  return [
    '접수일시',
    '업체명',
    '업체코드',
    '상호',
    '대표자 성명',
    '대표자 연락처',
    '담당자 성명',
    '담당자 연락처',
    '지역',
    '지원 유형',
    '추가 문의 내용',
    '상담 담당자',
    '상담 상태',
    '상담 시작',
    '상담 완료',
    '스마트상점 신청 여부',
    '재확인 필요',
    '상담 메모',
  ]
}

function toRow(payload: LeadPayload) {
  const createdAt = resolveCreatedAt(payload)
  const base = [createdAt, toInquiryLabel(payload.inquiry_type)]
  const partnerCode = resolvePartnerCode(payload)
  const partnerName = resolvePartnerName(payload)
  const partner = [
    partnerCode,
    partnerName,
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

function toConsultManagerRow(payload: LeadPayload) {
  if (payload.inquiry_type !== 'consult') return null

  return [
    resolveCreatedAt(payload),
    resolvePartnerName(payload),
    resolvePartnerCode(payload),
    String(payload.formData.businessName ?? ''),
    String(payload.formData.name ?? ''),
    String(payload.formData.phone ?? ''),
    String(payload.formData.manager_name ?? ''),
    String(payload.formData.manager_phone ?? ''),
    String(payload.formData.region ?? ''),
    String(payload.formData.support_type ?? ''),
    String(payload.formData.message ?? ''),
    '',
    '미진행',
    false,
    false,
    '미확인',
    false,
    '',
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

  return sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [values],
    },
  })
}

function parseUpdatedRowNumber(updatedRange: string | null | undefined) {
  if (!updatedRange) return null
  const match = updatedRange.match(/![A-Z]+(\d+):[A-Z]+(\d+)$/)
  if (!match) return null
  return Number(match[1] ?? match[2])
}

async function setupConsultManagerRow(params: {
  sheets: ReturnType<typeof google.sheets>
  spreadsheetId: string
  sheetTitle: string
  rowNumber: number
}) {
  const { sheets, spreadsheetId, sheetTitle, rowNumber } = params
  const sheetMeta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: 'sheets.properties(sheetId,title)',
  })

  const targetSheet = sheetMeta.data.sheets?.find((sheet) => sheet.properties?.title === sheetTitle)
  const sheetId = targetSheet?.properties?.sheetId
  if (sheetId == null) return

  const rowIndex = rowNumber - 1

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          setDataValidation: {
            range: {
              sheetId,
              startRowIndex: rowIndex,
              endRowIndex: rowIndex + 1,
              startColumnIndex: 11,
              endColumnIndex: 12,
            },
            rule: {
              condition: {
                type: 'ONE_OF_LIST',
                values: [{ userEnteredValue: '상담1' }, { userEnteredValue: '상담2' }, { userEnteredValue: '상담3' }],
              },
              strict: true,
              showCustomUi: true,
            },
          },
        },
        {
          setDataValidation: {
            range: {
              sheetId,
              startRowIndex: rowIndex,
              endRowIndex: rowIndex + 1,
              startColumnIndex: 12,
              endColumnIndex: 13,
            },
            rule: {
              condition: {
                type: 'ONE_OF_LIST',
                values: [{ userEnteredValue: '미진행' }, { userEnteredValue: '진행중' }, { userEnteredValue: '상담완료' }],
              },
              strict: true,
              showCustomUi: true,
            },
          },
        },
        {
          setDataValidation: {
            range: {
              sheetId,
              startRowIndex: rowIndex,
              endRowIndex: rowIndex + 1,
              startColumnIndex: 15,
              endColumnIndex: 16,
            },
            rule: {
              condition: {
                type: 'ONE_OF_LIST',
                values: [
                  { userEnteredValue: '미확인' },
                  { userEnteredValue: '신청완료' },
                  { userEnteredValue: '신청예정' },
                  { userEnteredValue: '해당없음' },
                ],
              },
              strict: true,
              showCustomUi: true,
            },
          },
        },
        {
          setDataValidation: {
            range: {
              sheetId,
              startRowIndex: rowIndex,
              endRowIndex: rowIndex + 1,
              startColumnIndex: 13,
              endColumnIndex: 14,
            },
            rule: {
              condition: { type: 'BOOLEAN' },
              strict: true,
              showCustomUi: true,
            },
          },
        },
        {
          setDataValidation: {
            range: {
              sheetId,
              startRowIndex: rowIndex,
              endRowIndex: rowIndex + 1,
              startColumnIndex: 14,
              endColumnIndex: 15,
            },
            rule: {
              condition: { type: 'BOOLEAN' },
              strict: true,
              showCustomUi: true,
            },
          },
        },
        {
          setDataValidation: {
            range: {
              sheetId,
              startRowIndex: rowIndex,
              endRowIndex: rowIndex + 1,
              startColumnIndex: 16,
              endColumnIndex: 17,
            },
            rule: {
              condition: { type: 'BOOLEAN' },
              strict: true,
              showCustomUi: true,
            },
          },
        },
      ],
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

  if (payload.inquiry_type === 'consult') {
    await ensureSheetExists({
      sheets,
      spreadsheetId,
      title: CONSULT_MAIN_SHEET_TITLE,
      headers: getHeaders(payload.inquiry_type),
    })

    await appendRows({
      sheets,
      spreadsheetId,
      range: toSheetRange(CONSULT_MAIN_SHEET_TITLE),
      values: row,
    })
  } else {
    await appendRows({
      sheets,
      spreadsheetId,
      range,
      values: row,
    })
  }

  if (payload.inquiry_type !== 'consult') return

  await ensureSheetExists({
    sheets,
    spreadsheetId,
    title: CONSULT_MANAGER_SHEET_TITLE,
    headers: getConsultManagerHeaders(),
  })

  const consultManagerRow = toConsultManagerRow(payload)
  if (consultManagerRow) {
    const appendResponse = await appendRows({
      sheets,
      spreadsheetId,
      range: toSheetRange(CONSULT_MANAGER_SHEET_TITLE),
      values: consultManagerRow,
    })

    const updatedRange = appendResponse.data.updates?.updatedRange
    const rowNumber = parseUpdatedRowNumber(updatedRange)
    if (rowNumber) {
      await setupConsultManagerRow({
        sheets,
        spreadsheetId,
        sheetTitle: CONSULT_MANAGER_SHEET_TITLE,
        rowNumber,
      })
    }
  }

  const partnerRaw = resolvePartnerName(payload)
  const partnerTitle = sanitizeSheetTitle(partnerRaw)

  if (!partnerTitle) return

  const finalTitle =
    sanitizeSheetTitle(
      partnerTitle.startsWith(consultPartnerPrefix) ? partnerTitle : `${consultPartnerPrefix}${partnerTitle}`,
    ) || partnerTitle
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
