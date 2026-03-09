import Accordion from '../components/Accordion'

const items = [
  { title: 'VAT 별도 (공고 기준)', content: '공고 기준으로 VAT는 지원 대상이 아니며 소상공인 부담입니다. 세부 기준은 변동 가능성이 있습니다.' },
  { title: '과거 스마트상점 수혜 이력 보유 시 신청 제한 가능', content: '발표자료 기준으로 과거 수혜 이력이 있으면 신청이 제한될 수 있습니다. 최종 기준은 해당 연도 공고문을 확인해 주세요.' },
  { title: '지원 제외업종/휴폐업/체납 상태는 신청 불가', content: '공고문 기준 지원 제외업종, 신청기간 중 휴폐업, 국세/지방세 체납 상태는 신청이 제한됩니다.' },
  { title: '국비는 소상공인에게 직접 입금되지 않을 수 있음 (공고 기준)', content: '정산 구조상 공단에서 기술공급기업으로 지급될 수 있습니다. 집행 방식은 공고 기준으로 변동 가능합니다.' },
  { title: '의무사용기간 (공고 기준)', content: '공고 기준 의무기간 미준수 시 불이익이 발생할 수 있으며, 유형별 기간은 변동 가능성이 있습니다.' },
  { title: '휴폐업/이전 시 환수 또는 무상양도 조치 가능', content: '사업장 변동 시 사전 승인 없이 변경하면 제한될 수 있습니다.' },
  { title: '부정행위(페이백/리베이트/대리신청) 금지', content: '적발 시 환수 및 향후 참여 제한 등 제재가 발생할 수 있습니다.' },
]

function RiskSection() {
  return (
    <section id="risks" className="mt-6">
      <details className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <summary className="cursor-pointer list-none text-lg font-bold text-slate-900">
          리스크/주의사항
          <span className="ml-2 text-xs font-medium text-slate-500 group-open:hidden">열기</span>
          <span className="ml-2 hidden text-xs font-medium text-slate-500 group-open:inline">닫기</span>
        </summary>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-sm font-bold text-slate-700">필독</p>
          <p className="mt-1 text-sm text-slate-700">아래 항목은 실제 신청 탈락/환수와 직결될 수 있어 반드시 확인해 주세요.</p>
        </div>
        <div className="mt-4">
          <Accordion items={items} />
        </div>
      </details>
    </section>
  )
}

export default RiskSection
