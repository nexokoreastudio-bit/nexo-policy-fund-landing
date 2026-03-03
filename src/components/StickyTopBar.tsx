type StickyTopBarProps = {
  policyOpen: boolean
  onOpenWaitlist: () => void
  onOpenConsult: () => void
}

function StickyTopBar({ policyOpen, onOpenWaitlist, onOpenConsult }: StickyTopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#hero" className="text-lg font-black tracking-tight text-slate-900">
          NEXO
        </a>
        <nav className="hidden items-center gap-2 sm:flex">
          <a href="#eligibility" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            1분 자격진단
          </a>
          {policyOpen ? (
            <a href="#calculator" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              지원금 계산기
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenWaitlist}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              공지 받기
            </button>
          )}
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
