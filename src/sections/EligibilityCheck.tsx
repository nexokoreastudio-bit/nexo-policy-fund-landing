type EligibilityCheckProps = {
  onOpenConsult: () => void
}

function EligibilityCheck({ onOpenConsult }: EligibilityCheckProps) {
  return (
    <section id="eligibility" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-extrabold text-slate-900">1분 자격진단</h2>
      <p className="mt-2 text-sm text-slate-600">아래 조건으로 자격 가능 여부를 빠르게 확인하세요.</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-black text-slate-900">자격 가능성 높음</h3>
          <ul className="mt-3 grid gap-2 text-sm text-slate-700">
            <li>• 정상 영업 중이며 국세/지방세 체납이 없음</li>
            <li>• 기존 스마트상점 수혜 이력이 없거나, 공고상 추가지원 허용 대상임</li>
            <li>• 교육 서비스업: 평균매출액 10억원 이하</li>
            <li>• 교육 서비스업: 상시근로자 5명 미만 (4대보험 가입자 기준)</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-black text-slate-900">추가 확인 필요</h3>
          <ul className="mt-3 grid gap-2 text-sm text-slate-700">
            <li>• 과거 수혜 이력이 있는 경우 (일부 예외 모델 별도 확인)</li>
            <li>• 체납/휴폐업 이슈가 있는 경우</li>
            <li>• 특별 지원 대상(60%) 여부 확인 필요</li>
            <li>• 지원제외업종 해당 여부 및 사업장 유지 조건 확인 필요</li>
            <li className="font-semibold">- 1인 사업자 / 간이과세자 / 장애인 기업</li>
          </ul>
        </article>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a href="#calculator" className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-bold text-white">
          지원금 계산기 바로가기
        </a>
        <button type="button" onClick={onOpenConsult} className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700">
          전문가와 자격 조건 최종 확인하기
        </button>
      </div>
    </section>
  )
}

export default EligibilityCheck
