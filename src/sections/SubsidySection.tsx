import { useEffect, useMemo, useState } from 'react'
import policy from '../data/policy.json'
import { formatCurrency, formatDate } from '../lib/format'
import { calculateSubsidy, type SubsidyInput } from '../lib/subsidy'
import { track } from '../lib/track'
import type { PolicyData } from '../types/policy'

type SubsidySectionProps = {
  policyOpen: boolean
  policyYear: number
  policyDataOverride?: PolicyData
}

const policyData = policy as PolicyData
const regionOptions: Array<{ value: string; label: string; type: 'metro' | 'non_metro' | 'island' }> = [
  { value: 'seoul', label: '서울', type: 'metro' },
  { value: 'gyeonggi', label: '경기', type: 'metro' },
  { value: 'incheon', label: '인천', type: 'metro' },
  { value: 'gangwon', label: '강원', type: 'non_metro' },
  { value: 'daejeon', label: '대전', type: 'non_metro' },
  { value: 'sejong', label: '세종', type: 'non_metro' },
  { value: 'chungbuk', label: '충북', type: 'non_metro' },
  { value: 'chungnam', label: '충남', type: 'non_metro' },
  { value: 'gwangju', label: '광주', type: 'non_metro' },
  { value: 'jeonbuk', label: '전북', type: 'non_metro' },
  { value: 'jeonnam', label: '전남', type: 'non_metro' },
  { value: 'daegu', label: '대구', type: 'non_metro' },
  { value: 'gyeongbuk', label: '경북', type: 'non_metro' },
  { value: 'busan', label: '부산', type: 'non_metro' },
  { value: 'ulsan', label: '울산', type: 'non_metro' },
  { value: 'gyeongnam', label: '경남', type: 'non_metro' },
  { value: 'jeju', label: '제주(도서산간)', type: 'island' },
]
const productLinks = [
  {
    label: '65인치',
    desc: '넥소 스마트상점 등록 제품 보기',
    href: 'https://www.sbiz.or.kr/smst/bsns/product/view.do?cmpnSn=1271&prdtSn=3&key=2111306033994&viewType=thumbnail&pageIndex=1&bsnsYrs=2026&sc=CMPN_NM&sw=%EB%84%A5%EC%86%8C&scPrdtTy=A',
  },
  {
    label: '75인치',
    desc: '넥소 스마트상점 등록 제품 보기',
    href: 'https://www.sbiz.or.kr/smst/bsns/product/view.do?cmpnSn=1271&prdtSn=4&key=2111306033994&viewType=thumbnail&pageIndex=1&bsnsYrs=2026&sc=CMPN_NM&sw=%EB%84%A5%EC%86%8C&scPrdtTy=A',
  },
  {
    label: '86인치',
    desc: '넥소 스마트상점 등록 제품 보기',
    href: 'https://www.sbiz.or.kr/smst/bsns/product/view.do?cmpnSn=1271&prdtSn=5&key=2111306033994&viewType=thumbnail&pageIndex=1&bsnsYrs=2026&sc=CMPN_NM&sw=%EB%84%A5%EC%86%8C&scPrdtTy=A',
  },
]

function SubsidySection({ policyOpen, policyYear, policyDataOverride }: SubsidySectionProps) {
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
  const [regionCode, setRegionCode] = useState('seoul')
  const selectedRegion = regionOptions.find((option) => option.value === regionCode) ?? regionOptions[0]
  const regionType = selectedRegion.type

  useEffect(() => {
    if (!policyOpen) return
    track('calc_change', {
      techType: input.techType,
      model: input.model,
      quantity: input.quantity,
      supportRateType: input.supportRateType,
      regionCode,
    })
  }, [input, policyOpen, regionCode])

  const canCalculate = activePolicy.price_table.length > 0 && Object.keys(activePolicy.rates).length > 0

  const result = useMemo(() => {
    if (!canCalculate) return null
    return calculateSubsidy(input, activePolicy)
  }, [activePolicy, canCalculate, input])
  const nonMetroTravelFee = regionType === 'metro' ? 0 : 100000
  const islandTravelFee = regionType === 'island' ? 100000 : 0
  const travelFee = nonMetroTravelFee + islandTravelFee
  const installLaborFee = 0
  const finalAmountWithExtra = (result?.totalBurden ?? 0) + travelFee + installLaborFee

  return (
    <section id="calculator" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-extrabold text-slate-900">지원금 계산기</h2>
      {policyOpen ? (
        <p className="mt-2 text-sm text-slate-600">
          공고 기준 {activePolicy.updated_at ? `(업데이트: ${formatDate(activePolicy.updated_at)})` : '(업데이트 대기)'}
        </p>
      ) : (
        <p className="mt-2 text-sm text-slate-600">현재 {policyYear}년 공고 전 단계이며, 아래 계산은 사전 시뮬레이션 용도입니다.</p>
      )}
      <p className="mt-1 text-xs font-semibold text-slate-500">공고 기준 값이며 변동 가능</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {productLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
          >
            <p className="text-lg font-black text-slate-900">{link.label}</p>
            <p className="mt-1 text-xs font-semibold text-slate-600">{link.desc}</p>
            <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white">
              <img src="/assets/hero/nexo-smartboard.png" alt={`${link.label} 넥소 스마트보드 이미지`} className="h-28 w-full object-cover" />
            </div>
            <p className="mt-3 inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white">공식 페이지 보기</p>
          </a>
        ))}
      </div>

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
            <select value={regionCode} onChange={(event) => setRegionCode(event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
              {regionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={input.supportRateType}
              onChange={(event) =>
                setInput((prev) => ({ ...prev, supportRateType: event.target.value as SubsidyInput['supportRateType'] }))
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="normal">일반 (정부지원 50%)</option>
              <option value="vulnerable">특별 지원 대상 (장애인, 장애인기업, 간이과세자, 1인점포 / 정부지원 60%)</option>
            </select>
          </div>
          <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
            일반/특별 지원 대상 모두 현재 계산은 안내용이며, 실제 공고 시 정확한 할인율이 적용됩니다.
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
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
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
            <li className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-3">
              <p className="text-sm font-semibold text-slate-700">정부지원금(-)</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{formatCurrency(result.supportAmount)}</p>
              <p className="mt-1 text-xs text-slate-600">정부에서 지원되는 금액입니다</p>
            </li>
            <li className="rounded-xl bg-white px-4 py-3">
              <p className="text-sm font-semibold text-slate-600">자부담금</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{formatCurrency(result.ownerBurden)}</p>
              <p className="mt-1 text-xs text-slate-500">실제 결제금액입니다</p>
            </li>
            <li className="rounded-xl bg-white px-4 py-3">
              <p className="text-sm font-semibold text-slate-600">부가세(+)</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{formatCurrency(result.vat)}</p>
              <p className="mt-1 text-xs text-slate-500">부가세는 추후 환급 가능한 금액입니다.</p>
              <p className="mt-1 text-xs font-bold text-red-600">지원금 적용 후 자부담금의 부가세가 아닌, 지원금 적용 전 제품 원공급가액 기준 부가세입니다.</p>
            </li>
            <li className="rounded-xl border-2 border-slate-300 bg-slate-100 px-4 py-3">
              <p className="text-sm font-semibold text-slate-700">최종 입금액</p>
              <p className="mt-1 text-3xl font-black text-slate-900">{formatCurrency(result.totalBurden)}</p>
              <p className="mt-1 text-xs text-slate-600">자부담금 + 부가세 최종 합계</p>
            </li>
          </ul>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-sm font-semibold text-slate-700">추가 비용 안내</p>
            <ul className="mt-2 grid gap-1 text-sm text-slate-600">
              <li>• 선택 지역: {selectedRegion.label}</li>
              <li>• 자동 분류: {regionType === 'metro' ? '수도권' : regionType === 'island' ? '도서산간지역' : '수도권외 지역'}</li>
              <li>• 수도권외 출장비: {nonMetroTravelFee === 100000 ? '100,000원' : '0원'}</li>
              <li>• 도서산간지역 출장비: {islandTravelFee === 100000 ? '100,000원' : '0원'}</li>
              <li>• 설치비 및 인건비: {formatCurrency(installLaborFee)}</li>
            </ul>
          </div>
          <div className="mt-3 rounded-xl border-2 border-slate-300 bg-slate-100 px-4 py-3">
            <p className="text-sm font-semibold text-slate-700">최종 입금 예상액 (출장비 포함)</p>
            <p className="mt-1 text-2xl font-black text-slate-900">{formatCurrency(finalAmountWithExtra)}</p>
          </div>
          {result.capExceeded ? (
            <p className="mt-1 text-sm font-semibold text-slate-600">국비 상한 초과 시 초과분은 소상공인 부담입니다.</p>
          ) : null}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a
              href="/certificate-guide"
              className="rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white"
              onClick={() => track('calc_cta_certificate')}
            >
              소상공인확인서 발급 페이지
            </a>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default SubsidySection
