type HeroProps = {
  policyOpen: boolean
  onOpenWaitlist: () => void
  onOpenConsult: () => void
}

function Hero({ policyOpen, onOpenWaitlist, onOpenConsult }: HeroProps) {
  return (
    <section id="hero" className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 px-6 py-14 text-white shadow-xl sm:px-10">
      <h1 className="text-3xl font-black leading-tight sm:text-5xl">
        2026 전자칠판 정책자금,
        <br />
        공고와 동시에 신청 기회를 가장 먼저 잡으세요
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
        신청 조건/절차/준비서류를 미리 준비해 두면 공고 즉시 신청 가능합니다.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        {policyOpen ? (
          <a href="#calculator" className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-slate-900">
            지원금 계산기
          </a>
        ) : (
          <button type="button" onClick={onOpenWaitlist} className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-slate-900">
            공지 받기(알림 신청)
          </button>
        )}
        <a href="#eligibility" className="rounded-xl border border-white/40 px-5 py-3 text-center text-sm font-bold text-white">
          1분 자격진단 시작
        </a>
        <button type="button" onClick={onOpenConsult} className="rounded-xl border border-emerald-300 bg-emerald-500/20 px-5 py-3 text-sm font-bold text-emerald-100">
          상담 신청
        </button>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">대리신청 불가</span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">VAT 별도(공고 기준)</span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">의무사용(공고 기준)</span>
      </div>
    </section>
  )
}

export default Hero
