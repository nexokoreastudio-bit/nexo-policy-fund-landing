import { useEffect, useMemo, useState } from 'react'
import StickyTopBar from '../components/StickyTopBar'
import FloatingMobileCTA from '../components/FloatingMobileCTA'
import LeadModal from '../components/LeadModal'
import Toast from '../components/Toast'
import StepProgressBar from '../components/StepProgressBar'
import Hero from '../sections/Hero'
import SupportComparisonSection from '../sections/SupportComparisonSection'
import ConversionChecklistSection from '../sections/ConversionChecklistSection'
import DocumentsGuideSection from '../sections/DocumentsGuideSection'
import ApplicationJourneySection, { RelatedSitesPanel } from '../sections/ApplicationJourneySection'
import LeadSection from '../sections/LeadSection'
import Footer from '../sections/Footer'
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

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'policy_waitlist' | 'consult'>('consult')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    mergeAndStoreUtm(window.location.search)
  }, [])

  const openWaitlist = () => {
    setModalMode('policy_waitlist')
    setModalOpen(true)
  }

  const openConsult = () => {
    setModalMode('consult')
    setModalOpen(true)
  }

  return (
    <div className="bg-[radial-gradient(circle_at_top,#132a62_0%,#081127_18%,#060b19_42%,#04070f_100%)] text-slate-900">
      {previewBanner ? (
        <div className="bg-slate-100 px-4 py-2 text-center text-xs font-bold text-slate-700 sm:text-sm">{previewBanner}</div>
      ) : null}
      <StickyTopBar policyOpen={config.policy_open} onOpenConsult={openConsult} />
      <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-6 sm:px-6 lg:px-8">
        <Hero config={config} onOpenConsult={openConsult} />
        <StepProgressBar />
        <SupportComparisonSection config={config} policyData={policyData} />
        <RelatedSitesPanel />
        <ConversionChecklistSection onOpenConsult={openConsult} />
        <DocumentsGuideSection />
        <ApplicationJourneySection />
        <LeadSection policyOpen={config.policy_open} onOpenWaitlist={openWaitlist} onOpenConsult={openConsult} />
        <Footer config={config} />
      </main>

      <FloatingMobileCTA policyOpen={config.policy_open} onOpenConsult={openConsult} />
      <LeadModal
        open={modalOpen}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
        onSuccess={(mode) => setToastMessage(mode === 'policy_waitlist' ? '정책 공개 알림 신청이 접수되었습니다.' : '상담 신청이 접수되었습니다.')}
      />
      {toastMessage ? <Toast message={toastMessage} onClose={() => setToastMessage('')} /> : null}
    </div>
  )
}

export default Landing
