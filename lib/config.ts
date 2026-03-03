import fs from 'node:fs'
import path from 'node:path'

type Config = {
  policy_year: number
  policy_open: boolean
  official_url: string
  announce_url: string
}

const defaults: Config = {
  policy_year: 2026,
  policy_open: false,
  official_url: 'https://www.sbiz.or.kr/smst/index.do',
  announce_url: 'https://ols.semas.or.kr/ols/man/SMAN010M/page.do',
}

export function loadConfig(): Config {
  const filePath = path.join(process.cwd(), 'data', 'config.json')
  let parsed: Partial<Config> = {}

  try {
    parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Partial<Config>
  } catch {
    parsed = {}
  }

  const merged = { ...defaults, ...parsed }
  if (process.env.NEXO_POLICY_OPEN === 'true') {
    merged.policy_open = true
  }

  return merged
}
