import { useMemo, useState } from 'react'
import StickyTopBar from '../components/StickyTopBar'
import LeadModal from '../components/LeadModal'
import Toast from '../components/Toast'
import FloatingMobileCTA from '../components/FloatingMobileCTA'
import Footer from '../sections/Footer'
import { getClientConfig } from '../lib/config'

const flow = ['확인서 발급 완료', '스마트상점 신청', '선정/계약', '설치/의무사용']

const steps = [
  {
    title: 'STEP 1. 확인서 발급 완료 확인',
    desc: '유효한 소상공인 확인서가 준비되어 있어야 신청이 원활합니다.',
    action: '확인서 유효기간/기업정보를 먼저 확인하세요.',
  },
  {
    title: 'STEP 2. 스마트상점 사이트에서 제품 선택 후 신청',
    desc: '넥소 등록 제품(65/75/86인치) 중 희망 모델을 선택하고 신청서를 제출합니다.',
    action: '대표자 본인으로 신청하고, 연락처/이메일을 정확히 입력하세요.',
  },
  {
    title: 'STEP 3. 선정 결과 확인 및 계약 진행',
    desc: '심사 결과에 따라 선정 여부가 결정되며, 선정 시 계약/자부담 납부 절차가 진행됩니다.',
    action: '보증보험 등 필수 안내를 확인하고 누락 없이 처리하세요.',
  },
  {
    title: 'STEP 4. 설치 완료 및 2년 의무사용',
    desc: '설치 후 의무사용 기간 동안 기준을 준수해야 합니다.',
    action: '양도/재판매 금지 등 의무사항을 반드시 지켜주세요.',
  },
]

const productLinks = [
  {
    label: '65인치',
    price: '3,000,000원',
    href: 'https://www.sbiz.or.kr/smst/bsns/product/view.do?cmpnSn=1271&prdtSn=3&key=2111306033994&viewType=thumbnail&pageIndex=1&bsnsYrs=2026&sc=CMPN_NM&sw=%EB%84%A5%EC%86%8C&scPrdtTy=A',
  },
  {
    label: '75인치',
    price: '3,300,000원',
    href: 'https://www.sbiz.or.kr/smst/bsns/product/view.do?cmpnSn=1271&prdtSn=4&key=2111306033994&viewType=thumbnail&pageIndex=1&bsnsYrs=2026&sc=CMPN_NM&sw=%EB%84%A5%EC%86%8C&scPrdtTy=A',
  },
  {
    label: '86인치',
    price: '4,400,000원',
    href: 'https://www.sbiz.or.kr/smst/bsns/product/view.do?cmpnSn=1271&prdtSn=5&key=2111306033994&viewType=thumbnail&pageIndex=1&bsnsYrs=2026&sc=CMPN_NM&sw=%EB%84%A5%EC%86%8C&scPrdtTy=A',
  },
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
          <p className="mt-3 text-sm text-slate-600">소상공인 확인서 발급을 끝낸 뒤, 아래 순서대로 진행하면 신청 흐름이 명확해집니다.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {flow.map((item) => (
              <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4">
          {steps.map((step) => (
            <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-900">{step.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
              <p className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">{step.action}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-900">넥소 스마트상점 등록 제품 바로가기</h2>
          <p className="mt-2 text-sm text-slate-600">모델별 상세 페이지에서 제품 정보 확인 후 바로 신청할 수 있습니다.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {productLinks.map((product) => (
              <a
                key={product.label}
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
              >
                <p className="text-lg font-black text-slate-900">{product.label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">등록가 {product.price}</p>
                <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <img src="/assets/hero/nexo-smartboard.png" alt={`${product.label} 넥소 스마트보드 이미지`} className="h-28 w-full object-cover" />
                </div>
                <p className="mt-3 inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white">
                  스마트상점 페이지 이동
                </p>
              </a>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <a href="/certificate-guide" className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-bold text-slate-700">
              소상공인 확인서 발급 가이드 보기
            </a>
            <button type="button" onClick={() => setModalOpen(true)} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">
              상담 신청
            </button>
          </div>
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
