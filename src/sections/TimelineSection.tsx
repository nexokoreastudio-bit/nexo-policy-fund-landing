const steps = [
  '스마트상점 홈페이지 로그인/신청',
  '서류검토/서면평가',
  '기술컨설팅(일반/렌탈만)',
  '3자 전자계약',
  '자부담 + VAT 납부(소상공인→기술공급기업)',
  '지급보증보험 제출(SaaS 제외)',
  '설치 진행',
  '완료보고/정산(국비는 공단→기술공급기업)',
  '의무사용 + 현장점검/만족도조사',
]

function TimelineSection() {
  return (
    <section id="timeline" className="mt-6">
      <details className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <summary className="cursor-pointer list-none text-lg font-bold text-slate-900">
          신청 절차
          <span className="ml-2 text-xs font-medium text-slate-500 group-open:hidden">열기</span>
          <span className="ml-2 hidden text-xs font-medium text-slate-500 group-open:inline">닫기</span>
        </summary>
        <div className="mt-5 space-y-3">
          {steps.map((step, index) => (
            <div key={step} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{index + 1}</div>
              <p className="text-sm text-slate-700">{step}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">대리신청 불가, 대표자 본인 신청</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">서류 수정/삭제 어려움</span>
        </div>
      </details>
    </section>
  )
}

export default TimelineSection
