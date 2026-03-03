type FloatingMobileCTAProps = {
  policyOpen: boolean
  onOpenWaitlist: () => void
  onOpenConsult: () => void
}

function FloatingMobileCTA({ policyOpen, onOpenWaitlist, onOpenConsult }: FloatingMobileCTAProps) {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a href="#eligibility" className="rounded-lg border border-slate-300 px-2 py-2 text-center text-xs font-semibold text-slate-700">
          자격진단
        </a>
        {policyOpen ? (
          <a href="#calculator" className="rounded-lg border border-slate-300 px-2 py-2 text-center text-xs font-semibold text-slate-700">
            계산기
          </a>
        ) : (
          <button type="button" onClick={onOpenWaitlist} className="rounded-lg border border-slate-300 px-2 py-2 text-xs font-semibold text-slate-700">
            공지받기
          </button>
        )}
        <button type="button" onClick={onOpenConsult} className="rounded-lg bg-slate-900 px-2 py-2 text-xs font-semibold text-white">
          상담신청
        </button>
      </div>
    </aside>
  )
}

export default FloatingMobileCTA
