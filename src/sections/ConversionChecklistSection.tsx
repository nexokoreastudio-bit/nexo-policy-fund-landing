const checklistItems = [
  {
    title: '지원 대상 여부',
    description: '정상 영업 중인지, 체납이나 지원제외 사유가 없는지 먼저 확인합니다.',
  },
  {
    title: '우대지원 해당 여부',
    description: '장애인 사업주, 간이과세자, 1인 자영업자는 60% 우대 여부를 확인합니다.',
  },
  {
    title: '자부담·부가세 준비',
    description: '자부담금과 부가가치세는 소상공인이 직접 부담하므로 미리 자금 계획을 잡아두는 편이 좋습니다.',
  },
] as const

type ConversionChecklistSectionProps = {
  onOpenConsult: () => void
}

function ConversionChecklistSection({ onOpenConsult }: ConversionChecklistSectionProps) {
  return (
    <section className="mt-8 rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white">신청 전에 이 3가지만 먼저 체크하세요</h2>
          <p className="mt-2 text-sm text-slate-300">신청 전에 자주 확인하는 조건만 간단히 안내합니다.</p>
        </div>
        <button type="button" onClick={onOpenConsult} className="rounded-xl bg-[#79f0ff] px-5 py-3 text-sm font-bold text-[#04101f] shadow-[0_0_24px_rgba(121,240,255,0.35)]">
          막히면 바로 상담
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {checklistItems.map((item, index) => (
          <article key={item.title} className="rounded-[1.5rem] border border-[#284f95] bg-[linear-gradient(180deg,rgba(13,29,69,0.95)_0%,rgba(7,17,41,0.95)_100%)] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#79f0ff]">Check {index + 1}</p>
            <h3 className="mt-2 text-lg font-black text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </article>
        ))}
      </div>

      <p className="mt-5 rounded-xl border border-[#3c2f65] bg-[linear-gradient(135deg,rgba(255,87,221,0.14)_0%,rgba(121,240,255,0.08)_100%)] px-4 py-3 text-sm font-semibold text-[#ffd96a]">
        상담 신청은 정부 신청 접수가 아닙니다. 공고 기준 확인, 우대 여부 확인, 신청 준비 안내를 위한 사전 상담입니다.
      </p>
    </section>
  )
}

export default ConversionChecklistSection
