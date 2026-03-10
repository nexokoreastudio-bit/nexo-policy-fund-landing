type FloatingMobileCTAProps = {
  policyOpen: boolean
  onOpenConsult: () => void
}

function FloatingMobileCTA({ policyOpen, onOpenConsult }: FloatingMobileCTAProps) {
  const supportHref = policyOpen ? '/#calculator' : '/#support-summary'

  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a href={supportHref} className="rounded-lg border border-slate-300 px-2 py-2 text-center text-xs font-semibold text-slate-700">
          지원금 확인
        </a>
        <a href="/smartstore-apply" className="rounded-lg border border-slate-300 px-2 py-2 text-center text-xs font-semibold text-slate-700">
          신청 가이드
        </a>
        <button type="button" onClick={onOpenConsult} className="rounded-lg bg-slate-900 px-2 py-2 text-xs font-semibold text-white">
          상담 신청
        </button>
      </div>
    </aside>
  )
}

export default FloatingMobileCTA
