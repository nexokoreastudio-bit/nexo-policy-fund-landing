type LeadSectionProps = {
  policyOpen: boolean
  onOpenWaitlist: () => void
  onOpenConsult: () => void
}

function LeadSection({ policyOpen, onOpenWaitlist, onOpenConsult }: LeadSectionProps) {
  return (
    <section
      id="lead"
      className="mt-8 rounded-[2rem] border border-[#d7e3f4] bg-[linear-gradient(180deg,#173761_0%,#1f467c_100%)] px-6 py-10 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:px-10"
    >
      <h2 className="mt-2 text-3xl font-black tracking-tight">지원사업 신청 전환 상담</h2>
      <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
        확인서 발급, 사업 신청, 서류 업로드 단계에서 막히는 부분이 있으면 바로 상담으로 연결해드립니다.
      </p>
      <p className="mt-3 rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm font-semibold text-[#e7edf6]">
        상담 신청은 정부 신청 접수가 아니라 사전 안내 및 진행 상담입니다.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold text-slate-100">확인서 발급 전 상담</div>
        <div className="rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold text-slate-100">사업 신청 시작 전 상담</div>
        <div className="rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold text-slate-100">업로드 위치 확인 상담</div>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {!policyOpen ? (
          <button type="button" onClick={onOpenWaitlist} className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#173761] shadow-[0_14px_28px_rgba(15,23,42,0.18)]">
            공지 받기
          </button>
        ) : (
          <a href="#support-summary" className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#173761] shadow-[0_14px_28px_rgba(15,23,42,0.18)]">
            지원금 다시 확인하기
          </a>
        )}
        <button type="button" onClick={onOpenConsult} className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white">
          상담 신청
        </button>
      </div>
      <div className="mt-5 text-sm text-slate-300">
        <p className="font-semibold text-white">막히는 구간: 확인서 발급, 사업 신청 시작, 서류 업로드 위치</p>
        <p>전화: 032-569-5771~2 / 010-9981-5174</p>
        <p className="mt-1">이메일: nexokorea@gmail.com</p>
        <p className="mt-1">주소: 인천광역시 서구 보듬로158 검단지식산업센터 블루텍제조동 527호, 530호</p>
      </div>
    </section>
  )
}

export default LeadSection
