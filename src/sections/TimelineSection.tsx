import { useState } from 'react'

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
  const [openChecklist, setOpenChecklist] = useState(false)

  return (
    <section id="timeline" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-extrabold text-slate-900">신청 절차 타임라인</h2>
      <div className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <div key={step} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{index + 1}</div>
            <p className="text-sm text-slate-700">{step}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">대리신청 불가, 대표자 본인 신청</span>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">서류 수정/삭제 어려움</span>
      </div>
      <button type="button" onClick={() => setOpenChecklist(true)} className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
        준비서류 체크리스트 보기
      </button>

      {openChecklist ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-black text-slate-900">신청 전 체크리스트</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• 대표자 공동인증서 준비</li>
              <li>• 매장 사진(전면/내부) 확보</li>
              <li>• 연락처/이메일 정확성 확인</li>
              <li>• 취약계층 증빙 발급 가능 여부 확인</li>
            </ul>
            <button type="button" onClick={() => setOpenChecklist(false)} className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
              닫기
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default TimelineSection
