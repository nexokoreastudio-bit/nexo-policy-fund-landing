import { useEffect, useMemo, useState } from 'react'
import Hero from '../sections/Hero'
import RequirementLandingSections from '../sections/RequirementLandingSections'
import ConsultRequestSection from '../sections/ConsultRequestSection'
import StickyTopBar from '../components/StickyTopBar'
import FloatingMobileCTA from '../components/FloatingMobileCTA'
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
  const [popupOpen, setPopupOpen] = useState(false)

  const scrollToConsultForm = () => {
    document.getElementById('consult-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    mergeAndStoreUtm(window.location.search)
  }, [])

  useEffect(() => {
    const storageKey = 'nexo_no_proxy_popup_hidden_until'
    const hiddenUntil = window.localStorage.getItem(storageKey)

    if (!hiddenUntil || Number(hiddenUntil) < Date.now()) {
      setPopupOpen(true)
    }
  }, [])

  const closePopup = () => {
    setPopupOpen(false)
  }

  const hidePopupForOneDay = () => {
    const hiddenUntil = Date.now() + 24 * 60 * 60 * 1000
    window.localStorage.setItem('nexo_no_proxy_popup_hidden_until', String(hiddenUntil))
    setPopupOpen(false)
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#08142d_0%,#10254f_18%,#eaf1fb_18%,#f6f9fd_58%,#eef3f9_100%)] text-slate-900">
      {popupOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(3,8,20,0.7)] px-4 py-6">
          <div
            className="relative w-full max-w-[30rem] border border-[#d6e2f2] bg-white p-3 shadow-[0_28px_80px_rgba(0,0,0,0.35)] sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-label="대납행위 금지 안내 팝업"
          >
            <button
              type="button"
              onClick={closePopup}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7e3f4] bg-white text-lg font-black text-slate-600 transition hover:border-[#21457e] hover:text-[#21457e]"
              aria-label="팝업 닫기"
            >
              ×
            </button>

            <div className="overflow-hidden border border-[#d7e3f4] bg-[#f8fbff]">
              <img
                src="/assets/landing/no-proxy-popup.png"
                alt="대납행위 금지 안내"
                className="block w-full"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={hidePopupForOneDay}
                className="inline-flex items-center justify-center border border-[#21457e] bg-white px-4 py-2 text-sm font-black text-[#21457e] transition hover:bg-[#eef4fb]"
              >
                오늘 하루 보지 않기
              </button>
              <button
                type="button"
                onClick={closePopup}
                className="inline-flex items-center justify-center bg-[#21457e] px-4 py-2 text-sm font-black text-white transition hover:bg-[#173a73]"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <StickyTopBar policyOpen={config.policy_open} onOpenConsult={scrollToConsultForm} />
      {previewBanner ? (
        <div className="bg-slate-100 px-4 py-2 text-center text-xs font-bold text-slate-700 sm:text-sm">{previewBanner}</div>
      ) : null}
      <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 sm:pb-16 lg:px-8">
        <Hero config={config} onOpenConsult={() => undefined} />
        <RequirementLandingSections config={config} policyData={policyData} />
        <div className="mt-8">
          <ConsultRequestSection />
        </div>
      </main>
      <FloatingMobileCTA policyOpen={config.policy_open} onOpenConsult={scrollToConsultForm} />
    </div>
  )
}

export default Landing
