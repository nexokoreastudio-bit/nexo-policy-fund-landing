import fs from 'node:fs'
import path from 'node:path'

export function appendEventLog(event: string, data?: unknown) {
  const logPath = path.join(process.cwd(), 'data', 'events.log')
  const line = `${new Date().toISOString()}\t${event}\t${JSON.stringify(data ?? {})}\n`
  fs.appendFileSync(logPath, line, 'utf-8')
}
