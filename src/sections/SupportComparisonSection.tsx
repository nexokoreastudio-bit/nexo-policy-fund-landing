import type { AppConfig, PolicyData } from '../types/policy'

type SupportComparisonSectionProps = {
  config: AppConfig
  policyData: PolicyData
}

function SupportComparisonSection({ config: _config, policyData: _policyData }: SupportComparisonSectionProps) {
  return (
    <section id="support-summary" className="space-y-6">
      <div className="border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fd_100%)] p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6">
        <img src="/assets/requirements-2026/support-60.png" alt="지원금 60퍼센트 표" className="block w-full" />
      </div>

      <div className="border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fd_100%)] p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6">
        <img src="/assets/requirements-2026/support-50.png" alt="지원금 50퍼센트 표" className="block w-full" />
      </div>
    </section>
  )
}

export default SupportComparisonSection
