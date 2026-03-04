import { useMemo, useState } from 'react'
import StickyTopBar from '../components/StickyTopBar'
import FloatingMobileCTA from '../components/FloatingMobileCTA'
import LeadModal from '../components/LeadModal'
import Toast from '../components/Toast'
import Hero from '../sections/Hero'
import EligibilityCheck from '../sections/EligibilityCheck'
import SubsidySection from '../sections/SubsidySection'
import TimelineSection from '../sections/TimelineSection'
import DocumentsChecklist from '../sections/DocumentsChecklist'
import RiskSection from '../sections/RiskSection'
import FAQSection from '../sections/FAQSection'
import LeadSection from '../sections/LeadSection'
import Footer from '../sections/Footer'
import { getClientConfig } from '../lib/config'
import type { AppConfig, PolicyData } from '../types/policy'

type LandingProps = {
  overrideConfig?: Partial<AppConfig>
  overridePolicyData?: PolicyData
  previewBanner?: string
}

function Landing({ overrideConfig, overridePolicyData, previewBanner }: LandingProps) {
  const config = useMemo(() => ({ ...getClientConfig(), ...(overrideConfig ?? {}) }), [overrideConfig])

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'policy_waitlist' | 'consult'>('consult')
  const [toastMessage, setToastMessage] = useState('')

  const openWaitlist = () => {
    setModalMode('policy_waitlist')
    setModalOpen(true)
  }

  const openConsult = () => {
    setModalMode('consult')
    setModalOpen(true)
  }

  return (
    <div className="bg-slate-50 text-slate-900">
      {previewBanner ? (
        <div className="bg-amber-100 px-4 py-2 text-center text-xs font-bold text-amber-800 sm:text-sm">{previewBanner}</div>
      ) : null}
      <StickyTopBar policyOpen={config.policy_open} onOpenConsult={openConsult} />
      <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-6 sm:px-6 lg:px-8">
        <Hero policyOpen={config.policy_open} onOpenWaitlist={openWaitlist} onOpenConsult={openConsult} />
        <EligibilityCheck />
        <SubsidySection
          policyOpen={config.policy_open}
          policyYear={config.policy_year}
          onOpenWaitlist={openWaitlist}
          policyDataOverride={overridePolicyData}
        />
        <TimelineSection />
        <DocumentsChecklist />
        <RiskSection />
        <FAQSection policyOpen={config.policy_open} />
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
