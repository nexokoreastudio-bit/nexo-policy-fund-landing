import { useMemo, useState } from 'react'
import StickyTopBar from '../components/StickyTopBar'
import LeadModal from '../components/LeadModal'
import Toast from '../components/Toast'
import FloatingMobileCTA from '../components/FloatingMobileCTA'
import Footer from '../sections/Footer'
import { getClientConfig } from '../lib/config'

const rows = [
  { item: 'Android', nexo: 'Android 13', low: 'Android 9' },
  { item: 'RAM', nexo: '16GB', low: '4GB' },
  { item: 'Storage', nexo: '256GB', low: '32GB' },
  { item: 'Touch', nexo: '50포인트', low: '10포인트' },
  { item: '카메라', nexo: '48MP', low: '없음' },
  { item: '마이크', nexo: '8 array', low: '2' },
  { item: '밝기', nexo: '400 nits', low: '250 nits' },
  { item: 'WIFI', nexo: 'WiFi6', low: 'WiFi4' },
]

const nexoPriceByInch: Record<string, number> = {
  '65인치': 3000000,
  '75인치': 3300000,
  '86인치': 4400000,
}

const competitorGroups: Array<{
  name: string
  subtitle: string
  prices: Array<{ inch: '65인치' | '75인치' | '86인치'; price: number | null }>
  specs: Array<{ item: string; nexo: string; competitor: string }>
  score: number
  summary: string
}> = [
  {
    name: '타사 A',
    subtitle: '가격대 유사군',
    prices: [
      { inch: '65인치', price: 2640000 },
      { inch: '75인치', price: 3600000 },
      { inch: '86인치', price: 4080000 },
    ],
    specs: [
      { item: 'OS', nexo: 'Android 13', competitor: '안드로이드 전자칠판 표기' },
      { item: '패널', nexo: '고사양 디스플레이', competitor: 'QLED 표기' },
      { item: 'RAM/저장공간', nexo: '16GB / 256GB', competitor: '미표기' },
      { item: '터치 포인트', nexo: '50포인트', competitor: '미표기' },
      { item: '사후지원', nexo: '운영/업데이트 지원', competitor: '전담 콜센터/원격지원 문구 표기' },
    ],
    score: 78,
    summary: '가격 경쟁력은 있으나 핵심 스펙 미표기 항목이 많아 운영 리스크 확인 필요',
  },
  {
    name: '타사 B',
    subtitle: '가격대 유사군',
    prices: [
      { inch: '65인치', price: null },
      { inch: '75인치', price: 3370000 },
      { inch: '86인치', price: 4450000 },
    ],
    specs: [
      { item: 'OS', nexo: 'Android 13', competitor: '미표기' },
      { item: '화질', nexo: '고사양 디스플레이', competitor: '4K UHD 표기' },
      { item: 'RAM/저장공간', nexo: '16GB / 256GB', competitor: '미표기' },
      { item: '터치 포인트', nexo: '50포인트', competitor: '미표기' },
      { item: 'A/S', nexo: '운영/업데이트 지원', competitor: 'A/S 24개월 무상 표기' },
    ],
    score: 81,
    summary: '75/86 가격은 유사하지만 스펙 공개 범위가 제한적',
  },
  {
    name: '타사 C',
    subtitle: '상위 가격대군',
    prices: [
      { inch: '65인치', price: null },
      { inch: '75인치', price: 4200000 },
      { inch: '86인치', price: 4800000 },
    ],
    specs: [
      { item: 'OS', nexo: 'Android 13', competitor: 'Android 15 표기' },
      { item: 'RAM/저장공간', nexo: '16GB / 256GB', competitor: '16GB / 256GB 표기' },
      { item: '무선연결', nexo: 'WiFi6', competitor: 'WiFi6 + Bluetooth 5.2 표기' },
      { item: '패널/화질', nexo: '고사양 디스플레이', competitor: 'QLED + 4K UHD 표기' },
      { item: '터치 포인트', nexo: '50포인트', competitor: '미표기' },
    ],
    score: 84,
    summary: '고스펙 표기는 우수하지만 가격대가 높아 가성비 구간에서는 부담',
  },
]

function DisplayCompare() {
  const config = useMemo(() => getClientConfig(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const money = useMemo(() => new Intl.NumberFormat('ko-KR'), [])

  const formatMoney = (value: number) => `${money.format(value)}원`

  return (
    <div className="bg-slate-50 text-slate-900">
      <StickyTopBar policyOpen={config.policy_open} onOpenConsult={() => setModalOpen(true)} />
      <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">왜 어떤 전자칠판은 200만원일까요?</h1>
          <p className="mt-3 text-sm font-semibold text-slate-600">가격이 싼 이유에는 반드시 이유가 있습니다</p>
        </section>

        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-4 py-3 text-sm">항목</th>
                <th className="bg-blue-700 px-4 py-3 text-sm">넥소</th>
                <th className="bg-slate-700 px-4 py-3 text-sm">타사 저가형</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.item} className="border-b border-slate-100 last:border-b-0">
                  <th className="bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">{row.item}</th>
                  <td className="bg-blue-50 px-4 py-3 text-sm font-bold text-blue-900">{row.nexo}</td>
                  <td className="bg-slate-50 px-4 py-3 text-sm text-slate-700">{row.low}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-bold text-slate-700">
            정부지원 사업은 2년 의무 사용입니다. 처음부터 좋은 제품을 선택해야 합니다.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-900">넥소 가격대 기준 타사 비교</h2>
          <p className="mt-2 text-sm text-slate-600">기준일: 2026-03-06, 스마트상점 등록가(VAT별도) 공개값 기준</p>
          <div className="mt-5 rounded-2xl border-2 border-slate-300 bg-slate-50 p-5">
            <p className="text-sm font-bold text-slate-700">가성비 종합 결론</p>
            <p className="mt-1 text-2xl font-black text-slate-900">넥소가 가격-스펙-운영안정성의 균형이 가장 우수한 구간</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-4">
              <div className="rounded-xl bg-blue-700 px-3 py-2 text-white">
                <p className="text-xs font-semibold">넥소 종합점수</p>
                <p className="text-xl font-black">92점</p>
              </div>
              {competitorGroups.map((group) => (
                <div key={`score-${group.name}`} className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <p className="text-xs font-semibold text-slate-600">{group.name}</p>
                  <p className="text-xl font-black text-slate-800">{group.score}점</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-500">
              산정 기준: 가격(40) + 스펙 공개/성능(40) + 운영/사후지원 명확성(20)
            </p>
          </div>
          <div className="mt-5 grid gap-4">
            {competitorGroups.map((group) => (
              <article key={group.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-lg font-black text-slate-900">{group.name}</h3>
                <p className="mt-1 text-xs font-semibold text-slate-500">{group.subtitle}</p>
                <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <table className="w-full table-fixed border-collapse text-left">
                    <colgroup>
                      <col className="w-[18%]" />
                      <col className="w-[28%]" />
                      <col className="w-[28%]" />
                      <col className="w-[26%]" />
                    </colgroup>
                    <thead className="bg-slate-900 text-white">
                      <tr>
                        <th className="px-3 py-2 text-xs">인치</th>
                        <th className="bg-blue-700 px-3 py-2 text-right text-xs">넥소</th>
                        <th className="bg-slate-700 px-3 py-2 text-right text-xs">타사</th>
                        <th className="px-3 py-2 text-right text-xs">가격 차이</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.prices.map((row) => {
                        const nexo = nexoPriceByInch[row.inch]
                        if (!row.price) {
                          return (
                            <tr key={`${group.name}-${row.inch}`} className="border-b border-slate-100 last:border-b-0">
                              <td className="bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">{row.inch}</td>
                              <td className="bg-blue-50 px-3 py-2 text-right text-xs font-bold text-blue-900">{formatMoney(nexo)}</td>
                              <td className="bg-slate-50 px-3 py-2 text-right text-xs text-slate-600">미등록/미확인</td>
                              <td className="px-3 py-2 text-right text-xs text-slate-500">-</td>
                            </tr>
                          )
                        }
                        const diff = row.price - nexo
                        const diffText = diff === 0 ? '동일' : `${diff > 0 ? '+' : ''}${money.format(diff)}원`
                        return (
                          <tr key={`${group.name}-${row.inch}`} className="border-b border-slate-100 last:border-b-0">
                            <td className="bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">{row.inch}</td>
                            <td className="bg-blue-50 px-3 py-2 text-right text-xs font-bold text-blue-900">{formatMoney(nexo)}</td>
                            <td className="bg-slate-50 px-3 py-2 text-right text-xs text-slate-700">{formatMoney(row.price)}</td>
                            <td className={`px-3 py-2 text-right text-xs font-semibold ${diff > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>{diffText}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <table className="w-full table-fixed border-collapse text-left">
                    <colgroup>
                      <col className="w-[24%]" />
                      <col className="w-[38%]" />
                      <col className="w-[38%]" />
                    </colgroup>
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-3 py-2 text-xs font-bold text-slate-700">스펙 항목</th>
                        <th className="bg-blue-100 px-3 py-2 text-xs font-bold text-blue-900">넥소</th>
                        <th className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">{group.name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.specs.map((spec) => (
                        <tr key={`${group.name}-${spec.item}`} className="border-b border-slate-100 last:border-b-0">
                          <td className="bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">{spec.item}</td>
                          <td className="bg-blue-50 px-3 py-2 text-xs font-bold text-blue-900">{spec.nexo}</td>
                          <td className="bg-white px-3 py-2 text-xs text-slate-700">{spec.competitor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">{group.summary}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-slate-300 bg-slate-100 p-4">
            <h3 className="text-sm font-black text-slate-900">넥소 가성비 포인트</h3>
            <ul className="mt-2 grid gap-1 text-sm text-slate-700">
              <li>• 75/86인치 구간에서 유사 경쟁사 대비 과도하게 높지 않은 가격대 유지</li>
              <li>• 고사양 스펙(16GB RAM, 256GB, 50포인트 터치, WiFi6)으로 운영 안정성 확보</li>
              <li>• 정부지원 사업 특성상 초기 가격 + 2년 운영 리스크까지 함께 보는 것이 유리</li>
            </ul>
          </div>
          <p className="mt-4 text-xs font-semibold text-slate-500">
            출처: 스마트상점 2026 등록 제품 상세페이지(업체명 비공개 비교 방식 적용)
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a href="/smartstore-apply" className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-bold text-slate-700">
              스마트상점 신청 절차 보기
            </a>
            <button type="button" onClick={() => setModalOpen(true)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">
              우리 매장 기준 추천 받기
            </button>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10">
          <h2 className="text-2xl font-black">넥소 스펙으로 안정적인 2년 운영을 준비하세요</h2>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900"
          >
            상담 신청
          </button>
        </section>

        <Footer config={config} />
      </main>

      <FloatingMobileCTA policyOpen={config.policy_open} onOpenConsult={() => setModalOpen(true)} />
      <LeadModal
        open={modalOpen}
        mode="consult"
        onClose={() => setModalOpen(false)}
        onSuccess={() => setToastMessage('상담 신청이 접수되었습니다.')}
      />
      {toastMessage ? <Toast message={toastMessage} onClose={() => setToastMessage('')} /> : null}
    </div>
  )
}

export default DisplayCompare
