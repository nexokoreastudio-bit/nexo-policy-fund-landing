import { Link, useLocation } from 'react-router-dom'

const steps = [
  { id: 1, label: '1단계', title: '지원금 확인', href: '/#support-summary' },
  { id: 2, label: '2단계', title: '확인서 발급', href: '/certificate-guide' },
  { id: 3, label: '3단계', title: '사업 신청', href: '/smartstore-apply' },
  { id: 4, label: '4단계', title: '진행상황 확인', href: '/smartstore-apply#progress-check' },
  { id: 5, label: '5단계', title: '상담/문의', href: '/#lead' },
] as const

function resolveActiveStep(pathname: string, hash: string) {
  if (pathname === '/certificate-guide') return 2
  if (pathname === '/smartstore-apply') return hash === '#progress-check' ? 4 : 3
  return hash === '#lead' ? 5 : 1
}

function StepProgressBar() {
  const location = useLocation()
  const activeStep = resolveActiveStep(location.pathname, location.hash)

  return (
    <section className="mt-6 rounded-[1.75rem] border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f5f8fc_100%)] p-4 text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-base font-black tracking-tight text-slate-900 sm:text-lg">단계별 진행 안내</h2>
        <p className="text-xs font-semibold text-slate-500 sm:text-sm">현재 보고 있는 단계가 자동으로 강조됩니다.</p>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {steps.map((step) => {
          const isActive = activeStep === step.id
          return (
            <Link
              key={step.id}
              to={step.href}
              className={`min-w-[148px] flex-1 rounded-[1.25rem] border px-4 py-3 transition ${
                isActive
                  ? 'border-[#244a86] bg-[linear-gradient(180deg,#eff5ff_0%,#e0ecff_100%)] shadow-[0_12px_24px_rgba(36,74,134,0.12)]'
                  : 'border-[#dde5f0] bg-white hover:border-[#9bb6dd] hover:bg-[#f8fbff]'
              }`}
            >
              <p className={`text-xs font-black tracking-[0.14em] ${isActive ? 'text-[#244a86]' : 'text-slate-400'}`}>{step.label}</p>
              <p className="mt-2 text-base font-black text-slate-900">{step.title}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default StepProgressBar
