type LeadSectionProps = {
  policyOpen: boolean
  onOpenWaitlist: () => void
  onOpenConsult: () => void
}

function LeadSection({ policyOpen, onOpenWaitlist, onOpenConsult }: LeadSectionProps) {
  return (
    <section id="lead" className="mt-8 rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10">
      <h2 className="text-3xl font-black">지금 준비하세요</h2>
      <p className="mt-3 text-sm text-slate-200 sm:text-base">공고 전에 준비해두면 접수 시작일에 빠르게 진행할 수 있습니다.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {!policyOpen ? (
          <button type="button" onClick={onOpenWaitlist} className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900">
            공지 받기
          </button>
        ) : (
          <a href="#calculator" className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-slate-900">
            지원금 계산기
          </a>
        )}
        <button type="button" onClick={onOpenConsult} className="rounded-xl border border-white/50 px-5 py-3 text-sm font-bold text-white">
          상담 신청
        </button>
      </div>
      <p className="mt-5 text-sm text-slate-300">연락처: 000-0000-0000 (placeholder)</p>
    </section>
  )
}

export default LeadSection
