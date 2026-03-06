function TrustSection() {
  return (
    <section className="mt-8 grid gap-4 md:grid-cols-2">
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-extrabold text-slate-900">필수 안내사항</h3>
        <ul className="mt-4 grid gap-2 text-sm text-slate-700">
          <li className="rounded-xl bg-slate-50 px-4 py-3">
            본 사업은 정부지원 사업으로 2년간 의무 사용 기간이 존재합니다. (양도/재판매 금지)
          </li>
          <li className="rounded-xl bg-slate-50 px-4 py-3">
            자부담금 납부 시 고객 보호를 위한 지급보증보험 발급을 넥소에서 도와드립니다.
          </li>
        </ul>
      </article>
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-extrabold text-slate-900">넥소 특별 혜택</h3>
        <ul className="mt-4 grid gap-2 text-sm text-slate-700">
          <li className="rounded-xl bg-slate-50 px-4 py-3">전자칠판 업계 유일 A/S 2년 무상 보장</li>
          <li className="rounded-xl bg-slate-50 px-4 py-3">이동형 스탠드 및 전용 판서 소프트웨어 무상 증정</li>
          <li className="rounded-xl bg-slate-50 px-4 py-3">제휴 하나카드 12개월 무이자 할부 혜택</li>
        </ul>
      </article>
    </section>
  )
}

export default TrustSection
