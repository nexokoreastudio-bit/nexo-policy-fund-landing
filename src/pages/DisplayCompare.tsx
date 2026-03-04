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

function DisplayCompare() {
  const config = useMemo(() => getClientConfig(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

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
                <th className="px-4 py-3 text-sm">넥소</th>
                <th className="px-4 py-3 text-sm">저가형</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.item} className="border-b border-slate-100 last:border-b-0">
                  <th className="bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">{row.item}</th>
                  <td className="px-4 py-3 text-sm font-bold text-sky-700">{row.nexo}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{row.low}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-8 rounded-3xl border border-amber-300 bg-amber-50 p-6">
          <p className="text-sm font-bold text-amber-800">
            정부지원 사업은 2년 의무 사용입니다. 처음부터 좋은 제품을 선택해야 합니다.
          </p>
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
