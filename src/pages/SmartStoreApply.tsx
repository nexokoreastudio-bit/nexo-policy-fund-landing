import { useMemo, useState } from 'react'
import StickyTopBar from '../components/StickyTopBar'
import LeadModal from '../components/LeadModal'
import Toast from '../components/Toast'
import FloatingMobileCTA from '../components/FloatingMobileCTA'
import StepProgressBar from '../components/StepProgressBar'
import GuidedStepViewer from '../components/GuidedStepViewer'
import Footer from '../sections/Footer'
import Hero from '../sections/Hero'
import { getClientConfig } from '../lib/config'
import ImageSlotPlaceholder from '../components/ImageSlotPlaceholder'
import { imageSlots } from '../constants/imageSlots'
import { smartStoreApplySteps } from '../constants/guidedSteps'

const applyFlow = ['자격 확인', '사이트 접속', '기술 선택', '신청서 작성', '제출 후 확인']

const cautionImage = {
  src: '/assets/extracted/incheon-20250521/image11.png',
  alt: '스마트상점 기술보급사업 부당개입 금지 안내',
}

const cautionPoints = [
  '대표자 본인이 직접 신청해야 하며 대리신청은 불가합니다.',
  '접수된 서류는 수정 또는 삭제가 어려우므로 제출 전에 한 번 더 확인하는 편이 안전합니다.',
  '매장 사진, 우대지원 증빙, 신청서 내용을 미리 준비하면 접수가 훨씬 수월합니다.',
] as const

function SmartStoreApply() {
  const config = useMemo(() => getClientConfig(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  return (
    <div className="bg-[radial-gradient(circle_at_top,#132a62_0%,#081127_18%,#060b19_42%,#04070f_100%)] text-slate-900">
      <StickyTopBar policyOpen={config.policy_open} onOpenConsult={() => setModalOpen(true)} />
      <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-6 sm:px-6 lg:px-8">
        <Hero config={config} onOpenConsult={() => setModalOpen(true)} />
        <StepProgressBar />
        <section className="mt-6 rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">스마트상점 사업 신청 가이드</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            스마트상점 신청 절차를 공고 기준에 맞춰 정리한 안내 페이지입니다. 대표자 본인 신청, 메뉴 선택, 신청서 작성, 서류 업로드 순서를 한 번에 확인할 수 있습니다.
          </p>
          <div className="mt-4 rounded-[1.5rem] border border-[#4e3c85] bg-[linear-gradient(180deg,rgba(31,24,64,0.98)_0%,rgba(14,15,38,0.96)_100%)] p-4">
            <p className="text-sm font-black text-white">스마트상점 신청 사이트 URL</p>
            <a
              href="https://www.sbiz.or.kr/smst/index.do"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block break-all text-sm font-bold text-[#ff8bf5]"
            >
              https://www.sbiz.or.kr/smst/index.do
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {applyFlow.map((item) => (
              <span key={item} className="rounded-full border border-[#79f0ff]/30 bg-[rgba(121,240,255,0.08)] px-3 py-1 text-xs font-semibold text-[#79f0ff]">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section id="progress-check" className="mt-6 rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">신청 전에 먼저 확인할 것</h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-300">
                아래 단계 뷰어에서는 화면 한 장과 해야 할 일만 집중해서 볼 수 있습니다. 복잡한 긴 설명 대신 신청 흐름을 순서대로 따라가면 됩니다.
              </p>
            </div>
            <div className="rounded-2xl border border-[#2e5fb4] bg-[rgba(121,240,255,0.08)] px-4 py-3 text-sm font-semibold text-[#79f0ff]">
              데스크톱은 좌우 보기, 모바일은 위아래 보기로 자동 전환
            </div>
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[#284f95] bg-[linear-gradient(180deg,rgba(13,29,69,0.95)_0%,rgba(7,17,41,0.95)_100%)] p-5">
              <p className="text-sm font-bold text-white">1. 어디서 시작하는지</p>
              <p className="mt-2 text-sm text-slate-300">대표자 명의 로그인과 공고 선택</p>
            </div>
            <div className="rounded-[1.5rem] border border-[#284f95] bg-[linear-gradient(180deg,rgba(13,29,69,0.95)_0%,rgba(7,17,41,0.95)_100%)] p-5">
              <p className="text-sm font-bold text-white">2. 어떤 메뉴를 클릭하는지</p>
              <p className="mt-2 text-sm text-slate-300">전자칠판 선택, 넥소 모델 확인, 희망순위 입력</p>
            </div>
            <div className="rounded-[1.5rem] border border-[#284f95] bg-[linear-gradient(180deg,rgba(13,29,69,0.95)_0%,rgba(7,17,41,0.95)_100%)] p-5">
              <p className="text-sm font-bold text-white">3. 신청서를 어떻게 작성하는지</p>
              <p className="mt-2 text-sm text-slate-300">업체소개, 지원동기, 활용계획 입력 후 최종제출</p>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <GuidedStepViewer steps={smartStoreApplySteps} ariaLabel="스마트상점 신청 단계별 안내" />
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
          <h2 className="text-2xl font-black text-white">자주 막히는 지점</h2>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <ImageSlotPlaceholder
              label="부당개입 금지 안내"
              src={cautionImage.src}
              alt={cautionImage.alt}
              minHeightClassName="min-h-72"
            />
            <div className="grid gap-3">
              {cautionPoints.map((point) => (
                <p key={point} className="rounded-xl border border-[#4e3c85] bg-[rgba(255,139,245,0.08)] px-4 py-3 text-sm font-semibold text-slate-200">
                  {point}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
            <h2 className="text-2xl font-black text-white">신청 전에 준비하면 좋은 것</h2>
            <div className="mt-4 grid gap-3">
              <p className="rounded-2xl border border-[#284f95] bg-[rgba(121,240,255,0.08)] px-4 py-4 text-sm font-semibold text-slate-100">
                대표자 본인 계정과 로그인 정보
              </p>
              <p className="rounded-2xl border border-[#284f95] bg-[rgba(121,240,255,0.08)] px-4 py-4 text-sm font-semibold text-slate-100">
                업체소개, 지원동기, 활용계획 문안
              </p>
              <p className="rounded-2xl border border-[#284f95] bg-[rgba(121,240,255,0.08)] px-4 py-4 text-sm font-semibold text-slate-100">
                매장 사진, 우대지원 증빙 등 첨부 서류
              </p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
            <h2 className="text-2xl font-black text-white">이 흐름으로 보면 쉬운 이유</h2>
            <div className="mt-4 grid gap-3">
              <p className="rounded-2xl border border-[#4e3c85] bg-[rgba(255,139,245,0.08)] px-4 py-4 text-sm font-semibold text-slate-100">
                어디서 시작하는지 바로 보입니다.
              </p>
              <p className="rounded-2xl border border-[#4e3c85] bg-[rgba(255,139,245,0.08)] px-4 py-4 text-sm font-semibold text-slate-100">
                현재 단계에서 눌러야 할 메뉴와 준비물을 한 번에 확인할 수 있습니다.
              </p>
              <p className="rounded-2xl border border-[#4e3c85] bg-[rgba(255,139,245,0.08)] px-4 py-4 text-sm font-semibold text-slate-100">
                다음 단계가 명확해서 긴 스크롤 설명보다 덜 복잡합니다.
              </p>
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <h2 className="mt-2 text-2xl font-black text-white">선정 이후 진행 흐름</h2>
              <p className="mt-3 text-sm text-slate-300">
                2026 기술기업용 홈페이지 절차 기준으로 기술신청 확인, 계약체결, 대금요청, 현장점검 및 정산 흐름을 한 화면에서 확인할 수 있습니다.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href="/certificate-guide" className="rounded-xl border border-[#79f0ff]/40 bg-[rgba(121,240,255,0.08)] px-4 py-3 text-center text-sm font-bold text-white">
                  확인서 발급 가이드 보기
                </a>
                <button type="button" onClick={() => setModalOpen(true)} className="rounded-xl bg-[#ff8bf5] px-4 py-3 text-sm font-bold text-[#1a0b24]">
                  신청 전 상담 신청
                </button>
              </div>
            </div>
            <ImageSlotPlaceholder
              label={imageSlots.applyGuide.timeline.label}
              src={imageSlots.applyGuide.timeline.src}
              alt={imageSlots.applyGuide.timeline.alt}
              note={imageSlots.applyGuide.timeline.note}
              plannedSrc={imageSlots.applyGuide.timeline.plannedSrc}
              sourceRef={imageSlots.applyGuide.timeline.sourceRef}
              minHeightClassName="min-h-72 xl:min-h-[24rem]"
            />
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
