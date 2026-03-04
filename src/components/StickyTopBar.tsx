type StickyTopBarProps = {
  policyOpen: boolean
  onOpenConsult: () => void
}

function StickyTopBar({ policyOpen, onOpenConsult }: StickyTopBarProps) {
  const supportHref = policyOpen ? '/#calculator' : '/#eligibility'

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="text-lg font-black tracking-tight text-slate-900">
          NEXO
        </a>
        <nav className="hidden items-center gap-2 sm:flex">
          <a href={supportHref} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            지원금 안내
          </a>
          <a href="/certificate-guide" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            소상공인 확인서 발급
          </a>
          <a href="/smartstore-apply" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            스마트상점 신청 방법
          </a>
          <a href="/display-compare" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            전자칠판 비교
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
