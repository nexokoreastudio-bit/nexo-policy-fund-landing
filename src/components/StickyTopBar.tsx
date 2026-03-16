type StickyTopBarProps = {
  policyOpen: boolean
  onOpenApplyGuide?: () => void
  onOpenConsult: () => void
}

function StickyTopBar({ policyOpen: _policyOpen, onOpenApplyGuide, onOpenConsult }: StickyTopBarProps) {
  const homeHref = '/#home-top'
  const supportHref = typeof window === 'undefined' ? '/#support-summary' : `/${window.location.search}#support-summary`

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3 text-slate-900">
          <div className="hidden items-center gap-2 sm:flex">
            <img src="/assets/landing/nexo_logo_black.png" alt="넥소 블랙 로고" className="h-7 w-auto object-contain" />
          </div>
          <span className="text-sm font-black tracking-tight sm:text-lg">
            <span className="sm:hidden">넥소 스마트상점</span>
            <span className="hidden sm:inline">넥소 스마트상점 지원사업</span>
          </span>
        </a>
        <nav className="hidden items-center gap-2 sm:flex">
          <a href={homeHref} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            홈
          </a>
          {onOpenApplyGuide ? (
            <button
              type="button"
              onClick={onOpenApplyGuide}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              신청절차보기
            </button>
          ) : null}
          <a href={supportHref} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            지원금 확인
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
