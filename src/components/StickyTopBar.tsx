type StickyTopBarProps = {
  policyOpen: boolean
  onOpenConsult: () => void
}

function StickyTopBar({ policyOpen, onOpenConsult }: StickyTopBarProps) {
  const supportHref = policyOpen ? '/#calculator' : '/#support-summary'

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3 text-slate-900">
          <div className="hidden items-center gap-2 sm:flex">
            <img src="/assets/landing/logo_1.png" alt="넥소 로고" className="h-7 w-auto object-contain" />
            <img src="/assets/landing/logo_2.png" alt="스마트상점 로고" className="h-7 w-auto object-contain opacity-90" />
            <img src="/assets/landing/nexo_logo_black.png" alt="넥소 블랙 로고" className="h-7 w-auto object-contain" />
          </div>
          <span className="text-base font-black tracking-tight sm:text-lg">넥소 스마트상점 지원사업</span>
        </a>
        <nav className="hidden items-center gap-2 sm:flex">
          <a href={supportHref} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            지원금 확인
          </a>
          <a href="/certificate-guide" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            확인서 발급
          </a>
          <a href="/smartstore-apply" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            사업 신청
          </a>
          <button
            type="button"
            onClick={onOpenConsult}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            상담 신청
          </button>
        </nav>
      </div>
    </header>
  )
}

export default StickyTopBar
