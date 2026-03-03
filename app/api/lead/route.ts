import fs from 'node:fs'
import path from 'node:path'
import { appendEventLog } from '../../../lib/track'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const filePath = path.join(process.cwd(), 'data', 'leads.json')

    let list: unknown[] = []
    try {
      list = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as unknown[]
    } catch {
      list = []
    }

    list.push(body)
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf-8')
    appendEventLog('lead_success', { inquiry_type: body.inquiry_type })

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    appendEventLog('lead_error', { message: error instanceof Error ? error.message : 'unknown' })
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
