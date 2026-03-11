import { useEffect, useMemo } from 'react'
import Hero from '../sections/Hero'
import RequirementLandingSections from '../sections/RequirementLandingSections'
import { getClientConfig } from '../lib/config'
import { mergeAndStoreUtm } from '../lib/utm'
import type { AppConfig, PolicyData } from '../types/policy'
import policyDataRaw from '../data/policy.json'

type LandingProps = {
  overrideConfig?: Partial<AppConfig>
  overridePolicyData?: PolicyData
  previewBanner?: string
}

function Landing({ overrideConfig, overridePolicyData, previewBanner }: LandingProps) {
  const config = useMemo(() => ({ ...getClientConfig(), ...(overrideConfig ?? {}) }), [overrideConfig])
  const policyData = (overridePolicyData ?? (policyDataRaw as PolicyData))

  useEffect(() => {
    mergeAndStoreUtm(window.location.search)
  }, [])

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#08142d_0%,#10254f_18%,#eaf1fb_18%,#f6f9fd_58%,#eef3f9_100%)] text-slate-900">
      {previewBanner ? (
        <div className="bg-slate-100 px-4 py-2 text-center text-xs font-bold text-slate-700 sm:text-sm">{previewBanner}</div>
      ) : null}
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Hero config={config} onOpenConsult={() => undefined} />
        <RequirementLandingSections config={config} policyData={policyData} />
      </main>
    </div>
  )
}

export default Landing
