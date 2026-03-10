import type { AppConfig, PolicyData } from '../types/policy'

type SupportComparisonSectionProps = {
  config: AppConfig
  policyData: PolicyData
}

const supportCards = [
  {
    title: '우대지원 60%',
    headline: '정부지원금으로 전자칠판 최대 500만원 지원받기',
    rateKey: 'support_rate_special',
    badge: '60% 지원',
    people: '장애인, 간이과세자, 1인 자영업자',
    panelClassName: 'border-[#78b9ff] bg-[linear-gradient(180deg,#1f73ff_0%,#0f58d8_100%)] text-white',
    chipClassName: 'bg-[#ffe36b] text-[#a92f00]',
    tableClassName: 'border-[#81b3ff] bg-white text-slate-900',
  },
  {
    title: '일반지원 50%',
    headline: '정부지원금으로 전자칠판 최대 500만원 지원받기',
    rateKey: 'support_rate_normal',
    badge: '50% 지원',
    people: '일반 소상공인 기본 지원율',
    panelClassName: 'border-[#8ab2ff] bg-[linear-gradient(180deg,#2463d9_0%,#184fb7_100%)] text-white',
    chipClassName: 'bg-[#fff2a8] text-[#c1321f]',
    tableClassName: 'border-[#81b3ff] bg-white text-slate-900',
  },
] as const

const quantities = [1, 2, 3] as const

function formatCurrency(value: number) {
  return `${value.toLocaleString('ko-KR')}원`
}

function formatCompactCurrency(value: number) {
  return value.toLocaleString('ko-KR')
}

function SupportComparisonSection({ config, policyData }: SupportComparisonSectionProps) {
  const cardExamples = supportCards.map((card) => {
    const rate =
      card.rateKey === 'support_rate_normal' ? config.support_rate_normal : config.support_rate_special

    return {
      ...card,
      rate,
      examples: policyData.price_table.map((item) => {
        const quantityRows = quantities.map((quantity) => {
          const totalPrice = item.price * quantity
          const supportAmount = Math.min(Math.round(totalPrice * rate), config.support_max_amount)
          const ownerAmount = totalPrice - supportAmount

          return {
            quantity,
            totalPrice,
            supportAmount,
            ownerAmount,
          }
        })

        return {
          model: item.model,
          productPrice: item.price,
          quantityRows,
        }
      }),
    }
  })

  return (
    <section
      id="support-summary"
      className="relative mt-6 rounded-[2.5rem] border border-[#4b71c6] bg-[linear-gradient(180deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_34%,rgba(16,30,68,0.98)_100%)] p-6 shadow-[0_24px_80px_rgba(4,10,30,0.42)] ring-1 ring-white/5 sm:mt-8 sm:p-8 lg:p-10"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">지원금이 얼마인지 먼저 확인하세요</h2>
          <p className="mt-2 max-w-3xl text-sm font-semibold text-slate-300 sm:text-base">
            전자칠판 구입형 기준으로 일반 50%와 우대지원 60%의 정부지원금, 자부담, 부가세 별도 구조를 한 화면에서 바로 비교할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-[#79f0ff]/30 bg-[rgba(121,240,255,0.12)] px-4 py-2 text-sm font-black text-[#79f0ff]">우대지원 60%</span>
          <span className="rounded-full border border-[#ffe36b]/30 bg-[rgba(255,227,107,0.12)] px-4 py-2 text-sm font-black text-[#ffe36b]">최대 지원 {formatCurrency(config.support_max_amount)}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-6">
        {cardExamples.map((card) => (
          <article key={card.title} className={`overflow-hidden rounded-[2rem] border-[3px] shadow-[0_24px_60px_rgba(15,23,42,0.14)] ${card.panelClassName}`}>
            <div className="relative px-6 pb-6 pt-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="max-w-xl">
                    <p className="text-[1.5rem] font-black leading-[1.08] tracking-tight text-white/92 sm:text-[1.9rem] lg:text-[2.2rem]">
                      정부지원금으로 전자칠판
                    </p>
                    <p className="mt-1 text-[2.4rem] font-black leading-[0.98] tracking-tight text-[#ffe36b] drop-shadow-[0_0_18px_rgba(255,227,107,0.28)] sm:text-[3.2rem] lg:text-[4rem]">
                      최대 500만원
                      <br />
                      지원받기
                    </p>
                  </div>
                  <div className="mt-4 h-px w-full max-w-md bg-white/35" />
                  <p className="mt-4 text-base font-bold text-white/90 sm:text-lg">{card.people}</p>
                </div>
                <div className="shrink-0 rounded-[1.9rem] border-4 border-[#ffd154] bg-white px-6 py-5 shadow-[0_16px_34px_rgba(0,0,0,0.18)]">
                  <p className="text-center text-5xl font-black leading-none tracking-tight text-[#ff4a24] sm:text-6xl lg:text-7xl">
                    {Math.round(card.rate * 100)}%
                  </p>
                  <p className="mt-2 text-center text-lg font-black leading-none text-[#ff8e1a] sm:text-xl">지원</p>
                  <p className="mt-1 text-center text-base font-black text-[#c63b19] sm:text-lg">VAT 별도</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {card.examples.map((example) => (
                  <div key={`${card.title}-${example.model}`} className={`rounded-[1.5rem] border-2 p-3 shadow-sm ${card.tableClassName}`}>
                    <div className="rounded-[1rem] bg-[linear-gradient(180deg,#2f80ff_0%,#0d60e4_100%)] px-4 py-3 text-white">
                      <div className="space-y-2">
                        <p className="text-2xl font-black leading-none">{example.model}</p>
                        <p className="text-2xl font-black leading-none">{formatCompactCurrency(example.productPrice)}원</p>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm font-black">
                        <div className="rounded-md bg-white/12 px-2 py-2 text-center">정부지원금 {Math.round(card.rate * 100)}%</div>
                        <div className="rounded-md bg-white/12 px-2 py-2 text-center">자부담 {100 - Math.round(card.rate * 100)}%</div>
                      </div>
                    </div>

                    <div className="mt-3 overflow-hidden rounded-[1rem] border border-slate-200">
                      <div className="grid grid-cols-[72px_minmax(0,1fr)_minmax(0,1fr)] gap-2 bg-slate-50 px-3 py-3 text-xs font-black tracking-[0.04em] text-slate-500">
                        <span>수량</span>
                        <span>정부지원금</span>
                        <span>자부담</span>
                      </div>
                      {example.quantityRows.map((row, index) => (
                        <div
                          key={`${example.model}-${row.quantity}`}
                          className={`grid grid-cols-[72px_minmax(0,1fr)_minmax(0,1fr)] items-stretch gap-2 px-3 py-3 ${index !== 0 ? 'border-t border-slate-100' : ''}`}
                        >
                          <div className="flex items-center justify-center rounded-xl bg-slate-100 text-lg font-black text-slate-700">{row.quantity}대</div>
                          <div className="min-w-0 rounded-xl bg-emerald-50 px-3 py-3">
                            <p className="text-[11px] font-black text-emerald-700">정부지원금</p>
                            <p className="mt-1 break-keep text-lg font-black leading-none tracking-tight text-emerald-900 sm:text-xl">{formatCompactCurrency(row.supportAmount)}</p>
                          </div>
                          <div className="min-w-0 rounded-xl bg-slate-100 px-3 py-3">
                            <p className="text-[11px] font-black text-slate-600">자부담</p>
                            <p className="mt-1 break-keep text-lg font-black leading-none tracking-tight text-slate-900 sm:text-xl">{formatCompactCurrency(row.ownerAmount)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="rounded-[1.5rem] border-2 border-white/70 bg-[#ff3a2c] p-3 text-center text-white shadow-sm">
                  <div className="rounded-[1rem] bg-[rgba(255,255,255,0.08)] px-4 py-3">
                    <p className="text-4xl font-black tracking-tight">무상지원</p>
                  </div>
                  <div className="mt-3 overflow-hidden rounded-[1rem] border border-white/20 bg-white/10">
                    <p className="px-4 py-5 text-2xl font-black">판서 S/W</p>
                    <p className="border-t border-white/20 px-4 py-5 text-2xl font-black">설치비</p>
                    <p className="border-t border-white/20 px-4 py-5 text-2xl font-black">A/S 2년 보장</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-lg font-bold text-white/90">{card.title}</p>
                <span className={`rounded-full px-5 py-2 text-base font-black shadow-sm ${card.chipClassName}`}>{card.badge}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SupportComparisonSection
