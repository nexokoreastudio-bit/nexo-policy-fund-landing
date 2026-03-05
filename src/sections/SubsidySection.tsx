import { useEffect, useMemo, useState } from 'react'
import policy from '../data/policy.json'
import { formatCurrency, formatDate } from '../lib/format'
import { calculateSubsidy, type SubsidyInput } from '../lib/subsidy'
import { track } from '../lib/track'
import type { PolicyData } from '../types/policy'

type SubsidySectionProps = {
  policyOpen: boolean
  policyYear: number
  onOpenWaitlist: () => void
  onOpenConsult: () => void
  policyDataOverride?: PolicyData
}

const policyData = policy as PolicyData

function SubsidySection({ policyOpen, policyYear, onOpenWaitlist, onOpenConsult, policyDataOverride }: SubsidySectionProps) {
  const activePolicy = policyDataOverride ?? policyData
  const availableModels = activePolicy.price_table.map((item) => item.model)

  const [input, setInput] = useState<SubsidyInput>({
    techType: 'general',
    model: availableModels[0] ?? '',
    quantity: 1,
    supportRateType: 'normal',
    vatIncluded: true,
    paymentMethod: 'bank',
    installments: 12,
  })
  const [calculated, setCalculated] = useState(false)

  useEffect(() => {
    if (!policyOpen) return
    track('calc_change', {
      techType: input.techType,
      model: input.model,
      quantity: input.quantity,
      supportRateType: input.supportRateType,
    })
  }, [input, policyOpen])

  const canCalculate = activePolicy.price_table.length > 0 && Object.keys(activePolicy.rates).length > 0

  const result = useMemo(() => {
    if (!canCalculate) return null
    return calculateSubsidy(input, activePolicy)
  }, [activePolicy, canCalculate, input])

  if (!policyOpen) {
    return (
      <section id="policy-panel" className="mt-8 rounded-3xl border-2 border-sky-300 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-extrabold text-slate-900">정책 공개 대기</h2>
        <p className="mt-3 text-sm text-slate-700">현재 {policyYear}년도 공고/지원금액/비율은 미공개 상태입니다.</p>
        <p className="mt-2 text-sm text-slate-700">공고 공개 즉시: 지원금 계산기/예상 부담금/신청 링크를 업데이트합니다.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onOpenWaitlist} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white">
            공지 받기
          </button>
          <a href="#timeline" className="rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-700">
            신청 절차 미리 보기
          </a>
        </div>
      </section>
    )
  }

  return (
    <section id="calculator" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-extrabold text-slate-900">지원금 계산기</h2>
      <p className="mt-2 text-sm text-slate-600">
        공고 기준 {activePolicy.updated_at ? `(업데이트: ${formatDate(activePolicy.updated_at)})` : '(업데이트 대기)'}
      </p>
      <p className="mt-1 text-xs font-semibold text-amber-700">공고 기준 값이며 변동 가능</p>

      {canCalculate ? (
        <div className="mt-5 grid gap-4 rounded-2xl border border-slate-200 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">일반형</div>

            <select
              value={input.model}
              onChange={(event) => setInput((prev) => ({ ...prev, model: event.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              {activePolicy.price_table.map((item) => (
                <option key={item.model} value={item.model}>
                  {item.model}
                </option>
              ))}
            </select>

            <input
              type="number"
              min={1}
              max={5}
              value={input.quantity}
              onChange={(event) => setInput((prev) => ({ ...prev, quantity: Number(event.target.value) || 1 }))}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />

            <select
              value={input.supportRateType}
              onChange={(event) =>
                setInput((prev) => ({ ...prev, supportRateType: event.target.value as SubsidyInput['supportRateType'] }))
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="normal">일반 (정부지원 50%)</option>
              <option value="vulnerable">취약 (장애인, 장애인기업, 간이과세자, 1인점포 / 정부지원 80%)</option>
            </select>
          </div>
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">
            일반/취약 모두 현재 계산은 안내용이며, 실제 공고 시 정확한 할인율이 적용됩니다.
          </p>

          <button
            type="button"
            onClick={() => {
              setCalculated(true)
              track('calc_result', { supportRateType: input.supportRateType, model: input.model })
            }}
            className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
          >
            계산하기
          </button>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
          `data/policy.json`에 `price_table`, `rates`, `caps` 값을 채우면 계산기가 활성화됩니다.
        </div>
      )}

      {calculated && result ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <ul className="grid gap-3 text-slate-700">
            <li className="rounded-xl bg-white px-4 py-3">
              <p className="text-sm font-semibold text-slate-600">공급가액(부가세 제외)</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{formatCurrency(result.supplyAmount)}</p>
              <p className="mt-1 text-xs text-slate-500">제품 가격 합계입니다</p>
            </li>
            <li className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-sm font-semibold text-emerald-800">국비지원금(상한 적용)</p>
              <p className="mt-1 text-2xl font-black text-emerald-700">{formatCurrency(result.supportAmount)}</p>
              <p className="mt-1 text-xs text-emerald-700">정부에서 지원되는 금액입니다</p>
            </li>
            <li className="rounded-xl bg-white px-4 py-3">
              <p className="text-sm font-semibold text-slate-600">자부담금</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{formatCurrency(result.ownerBurden)}</p>
              <p className="mt-1 text-xs text-slate-500">실제 결제금액입니다</p>
            </li>
            <li className="rounded-xl bg-white px-4 py-3">
              <p className="text-sm font-semibold text-slate-600">부가세(10%)</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{formatCurrency(result.vat)}</p>
              <p className="mt-1 text-xs text-slate-500">소상공인 전액 부담입니다</p>
            </li>
            <li className="rounded-xl border-2 border-sky-300 bg-sky-50 px-4 py-3">
              <p className="text-sm font-semibold text-sky-800">소상공인 총 부담금</p>
              <p className="mt-1 text-3xl font-black text-sky-900">{formatCurrency(result.totalBurden)}</p>
              <p className="mt-1 text-xs text-sky-700">자부담금 + 부가세 최종 합계</p>
            </li>
          </ul>
          <p className="mt-3 text-sm font-semibold text-rose-700">VAT는 소상공인 전액 부담입니다.</p>
          {result.capExceeded ? (
            <p className="mt-1 text-sm font-semibold text-amber-700">국비 상한 초과 시 초과분은 소상공인 부담입니다.</p>
          ) : null}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a
              href="/certificate-guide"
              className="rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white"
              onClick={() => track('calc_cta_certificate')}
            >
              소상공인확인서 발급 페이지
            </a>
            <button
              type="button"
              onClick={() => {
                track('calc_cta_consult')
                onOpenConsult()
              }}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-800"
            >
              상담 신청
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default SubsidySection
