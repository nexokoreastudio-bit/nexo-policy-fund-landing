import Accordion from '../components/Accordion'

const items = [
  { title: 'VAT 별도 (공고 기준)', content: '공고 기준으로 VAT는 지원 대상이 아니며 소상공인 부담입니다. 세부 기준은 변동 가능성이 있습니다.' },
  { title: '국비는 소상공인에게 직접 입금되지 않을 수 있음 (공고 기준)', content: '정산 구조상 공단에서 기술공급기업으로 지급될 수 있습니다. 집행 방식은 공고 기준으로 변동 가능합니다.' },
  { title: '의무사용기간 (공고 기준)', content: '공고 기준 의무기간 미준수 시 불이익이 발생할 수 있으며, 유형별 기간은 변동 가능성이 있습니다.' },
  { title: '휴폐업/이전 시 환수 또는 무상양도 조치 가능', content: '사업장 변동 시 사전 승인 없이 변경하면 제한될 수 있습니다.' },
  { title: '부정행위(페이백/리베이트/대리신청) 금지', content: '적발 시 환수 및 향후 참여 제한 등 제재가 발생할 수 있습니다.' },
]

function RiskSection() {
  return (
    <section id="risks" className="mt-8 rounded-3xl border border-rose-200 bg-rose-50 p-6 shadow-sm sm:p-8">
      <div className="rounded-2xl border border-rose-300 bg-white px-4 py-3">
        <p className="text-sm font-bold text-rose-700">필독</p>
        <p className="mt-1 text-sm text-slate-700">아래 항목은 실제 신청 탈락/환수와 직결될 수 있어 반드시 확인해 주세요.</p>
      </div>
      <h2 className="mt-4 text-2xl font-extrabold text-slate-900">리스크/주의사항</h2>
      <div className="mt-4">
        <Accordion items={items} />
      </div>
    </section>
  )
}

export default RiskSection
