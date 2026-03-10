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
    <section className="mt-6 rounded-[1.75rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-4 text-white shadow-[0_18px_40px_rgba(4,10,30,0.32)] ring-1 ring-white/5 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-base font-black tracking-tight text-white sm:text-lg">단계별 진행 안내</h2>
        <p className="text-xs font-semibold text-slate-300 sm:text-sm">현재 진행 중인 단계가 자동으로 강조됩니다.</p>
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
                  ? 'border-[#79f0ff] bg-[rgba(121,240,255,0.14)] shadow-[0_0_24px_rgba(121,240,255,0.18)]'
                  : 'border-white/10 bg-[rgba(255,255,255,0.04)] hover:border-[#79f0ff]/40 hover:bg-[rgba(121,240,255,0.08)]'
              }`}
            >
              <p className={`text-xs font-black tracking-[0.14em] ${isActive ? 'text-[#79f0ff]' : 'text-slate-400'}`}>{step.label}</p>
              <p className="mt-2 text-base font-black text-white">{step.title}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default StepProgressBar
