import { useMemo, useState } from 'react'
import StickyTopBar from '../components/StickyTopBar'
import LeadModal from '../components/LeadModal'
import Toast from '../components/Toast'
import FloatingMobileCTA from '../components/FloatingMobileCTA'
import Footer from '../sections/Footer'
import { getClientConfig } from '../lib/config'

const timeline = ['신청', '선정', '계약', '설치', '2년 의무 사용']

const steps = [
  { title: 'Step 1. 소상공인 확인서 발급', desc: '확인서 발급 후 신청 준비를 완료합니다.' },
  { title: 'Step 2. 스마트상점 신청', desc: '공고문 기준으로 신청서 및 서류를 제출합니다.' },
  { title: 'Step 3. 선정', desc: '평가/심사 결과에 따라 선정 여부가 결정됩니다.' },
  { title: 'Step 4. 계약', desc: '공급기업/기관/수요자 간 절차에 따라 계약을 진행합니다.' },
  { title: 'Step 5. 설치', desc: '설치 완료 후 의무사용 기간(2년)을 준수합니다.' },
]

function SmartStoreApply() {
  const config = useMemo(() => getClientConfig(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  return (
    <div className="bg-slate-50 text-slate-900">
      <StickyTopBar policyOpen={config.policy_open} onOpenConsult={() => setModalOpen(true)} />
      <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">스마트상점 신청 방법</h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {timeline.map((item) => (
              <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {steps.map((step) => (
            <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-900">{step.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-900">자주 묻는 질문</h2>
          <ul className="mt-4 grid gap-2 text-sm text-slate-700">
            <li className="rounded-xl bg-slate-50 px-4 py-3">Q. 신청하면 모두 선정되나요? - 아니요, 평가 기준에 따라 결과가 달라집니다.</li>
            <li className="rounded-xl bg-slate-50 px-4 py-3">Q. 대리신청이 가능한가요? - 불가하며 대표자 본인 신청이 원칙입니다.</li>
          </ul>
        </section>

        <section className="mt-8 rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10">
          <h2 className="text-2xl font-black">신청 준비가 막히면 상담으로 빠르게 해결하세요</h2>
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

export default SmartStoreApply
