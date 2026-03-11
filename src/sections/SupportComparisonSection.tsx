import type { AppConfig, PolicyData } from '../types/policy'

type SupportComparisonSectionProps = {
  config: AppConfig
  policyData: PolicyData
}

function SupportComparisonSection({ config: _config, policyData: _policyData }: SupportComparisonSectionProps) {
  return (
    <section id="support-summary" className="space-y-6">
      <div className="border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fd_100%)] px-6 py-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:px-8">
        <p className="text-sm font-black tracking-[0.16em] text-[#21457e]">SUPPORT TABLE</p>
        <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          정부지원금으로 전자칠판 <span className="text-[#ff3b30]">최대500만원</span> 지원받기
        </h2>
      </div>

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
