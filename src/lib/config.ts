import rawConfig from '../data/config.json'
import type { AppConfig } from '../types/policy'

const defaults: AppConfig = {
  policy_year: 2026,
  policy_open: false,
  official_url: 'https://www.sbiz.or.kr/smst/index.do',
  announce_url: 'https://ols.semas.or.kr/ols/man/SMAN010M/page.do',
}

function parseOverrideValue() {
  const viteEnv = import.meta.env.VITE_NEXO_POLICY_OPEN
  const processEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
    ?.NEXO_POLICY_OPEN

  return viteEnv ?? processEnv
}

export function getClientConfig(): AppConfig {
  const merged = { ...defaults, ...(rawConfig as Partial<AppConfig>) }
  const override = parseOverrideValue()
  if (override === 'true') {
    merged.policy_open = true
  }
  if (override === 'false') {
    merged.policy_open = false
  }
  return merged
}
