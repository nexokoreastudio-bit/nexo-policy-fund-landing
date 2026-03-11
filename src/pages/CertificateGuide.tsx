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
import { certificateGeneralSteps, certificateStartupSteps } from '../constants/guidedSteps'
import type { CertificateTrackKey } from '../types/certificate'

const trackKeys: CertificateTrackKey[] = ['general', 'startup']
const trackContent = {
  general: {
    label: '일반 사업자',
    description: '기존 사업자라면 자료 제출부터 출력까지 7단계만 차례대로 따라가면 됩니다.',
    helper: '자료 제출과 신청서 작성 단계가 핵심입니다.',
    steps: certificateGeneralSteps,
  },
  startup: {
    label: '창업 기업',
    description: '창업 기업은 비교적 짧은 3단계 절차로 진행할 수 있습니다.',
    helper: '회원가입 후 신청서 작성과 즉시 출력 흐름을 확인하세요.',
    steps: certificateStartupSteps,
  },
} as const

function CertificateGuide() {
  const config = useMemo(() => getClientConfig(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [selectedTrack, setSelectedTrack] = useState<CertificateTrackKey>('general')
  const activeTrack = trackContent[selectedTrack]

  return (
    <div className="bg-[radial-gradient(circle_at_top,#132a62_0%,#081127_18%,#060b19_42%,#04070f_100%)] text-slate-900">
      <StickyTopBar policyOpen={config.policy_open} onOpenConsult={() => setModalOpen(true)} />
      <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-6 sm:px-6 lg:px-8">
        <Hero config={config} onOpenConsult={() => setModalOpen(true)} />
        <StepProgressBar />
        <section className="mt-6 rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">소상공인 확인서 발급 가이드</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            소상공인 확인서 발급이 필요한 경우를 대비해 절차를 정리한 안내 페이지입니다. 신청 과정에서 확인서나 보완서류가 필요할 때 바로 확인할 수 있습니다.
          </p>
          <p className="mt-3 rounded-xl border border-[#2e5fb4] bg-[rgba(121,240,255,0.08)] px-4 py-3 text-sm font-semibold text-[#79f0ff]">
            공고 기준과 마이데이터 확인 결과에 따라 보완서류가 필요할 수 있으니 발급 방법을 미리 알아두면 편합니다.
          </p>
          <div className="mt-4 rounded-[1.5rem] border border-[#2e5fb4] bg-[linear-gradient(180deg,rgba(13,29,69,0.95)_0%,rgba(7,17,41,0.95)_100%)] p-4">
            <p className="text-sm font-black text-white">확인서 발급 사이트 URL</p>
            <a
              href="https://sminfo.mss.go.kr/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block break-all text-sm font-bold text-[#79f0ff]"
            >
              https://sminfo.mss.go.kr/
            </a>
          </div>
          <div className="mt-4 grid gap-5 rounded-[1.5rem] border border-[#2e5fb4] bg-[linear-gradient(135deg,rgba(10,27,62,0.98)_0%,rgba(8,17,40,0.95)_100%)] px-5 py-5 shadow-[0_18px_36px_rgba(4,10,30,0.28)] lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <div className="flex h-full flex-col justify-center">
              <span className="inline-flex w-fit rounded-full border border-[#79f0ff]/25 bg-[rgba(121,240,255,0.08)] px-3 py-1 text-xs font-black tracking-[0.16em] text-[#79f0ff]">
                HELP DESK
              </span>
              <p className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">확인서 진행 중 막히면 지역별 문의처를 먼저 확인하세요.</p>
              <p className="mt-3 text-sm font-semibold text-slate-300 sm:text-base">
                지방중소벤처기업청 전화번호와 주소를 조회할 수 있는 페이지입니다. 지역마다 번호가 달라 바로 확인하는 편이 가장 빠릅니다.
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl border border-[#79f0ff]/20 bg-[rgba(121,240,255,0.08)] px-4 py-3 text-sm font-semibold text-slate-100">
                  지역별 전화번호 확인
                </div>
                <div className="rounded-xl border border-[#ff8bf5]/20 bg-[rgba(255,139,245,0.08)] px-4 py-3 text-sm font-semibold text-slate-100">
                  발급 문의처 바로 이동
                </div>
              </div>
              <a
                href="https://sminfo.mss.go.kr/cm/sv/CSV001R9.do"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#79f0ff] px-5 py-3 text-sm font-bold text-[#04101f] shadow-[0_0_24px_rgba(121,240,255,0.35)]"
              >
                문의처 확인하기
              </a>
            </div>
            <a
              href="https://sminfo.mss.go.kr/cm/sv/CSV001R9.do"
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-[1.25rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(24,43,95,0.92)_0%,rgba(16,29,67,0.96)_100%)] p-4 shadow-[0_18px_36px_rgba(4,10,30,0.24)]"
            >
              <img
                src="/assets/landing/info.png"
                alt="중소기업확인서 발급 절차 및 문의처 안내 이미지"
                className="block h-auto w-full rounded-lg transition duration-200 group-hover:scale-[1.01] group-hover:opacity-90"
              />
              <div className="pointer-events-none absolute inset-4 flex items-center justify-center rounded-lg bg-slate-950/0 transition duration-200 group-hover:bg-slate-950/45">
                <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-black text-white opacity-0 backdrop-blur-sm transition duration-200 group-hover:opacity-100">
                  문의처로 이동
                </span>
              </div>
            </a>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-4 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-6">
          <div className="grid grid-cols-2 gap-2">
            {trackKeys.map((trackKey) => {
              const track = trackContent[trackKey]
              const isActive = selectedTrack === trackKey
              return (
                <button
                  key={trackKey}
                  type="button"
                  onClick={() => setSelectedTrack(trackKey)}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                    isActive ? 'bg-[#79f0ff] text-[#04101f]' : 'bg-[rgba(121,240,255,0.08)] text-slate-200'
                  }`}
                >
                  {track.label}
                </button>
              )
            })}
          </div>
          <p className="mt-3 text-sm text-slate-300">{activeTrack.description}</p>
          <p className="mt-2 text-sm font-semibold text-[#79f0ff]">{activeTrack.helper}</p>
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">한 단계씩 따라가는 발급 흐름</h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-300">
                긴 설명을 스크롤로 읽지 않아도 됩니다. 현재 단계에서 해야 할 일과 화면 예시를 함께 보면서 왼쪽에서 오른쪽으로 차례대로 따라가면 됩니다.
              </p>
            </div>
            <div className="rounded-2xl border border-[#2e5fb4] bg-[rgba(121,240,255,0.08)] px-4 py-3 text-sm font-semibold text-[#79f0ff]">
              좌우 화살표 또는 하단 단계 버튼으로 바로 이동
            </div>
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[#284f95] bg-[linear-gradient(180deg,rgba(13,29,69,0.95)_0%,rgba(7,17,41,0.95)_100%)] p-5">
              <p className="text-sm font-bold text-white">1. 어디서 시작하는지</p>
              <p className="mt-2 text-sm text-slate-300">발급 사이트 접속과 현재 트랙 확인</p>
            </div>
            <div className="rounded-[1.5rem] border border-[#284f95] bg-[linear-gradient(180deg,rgba(13,29,69,0.95)_0%,rgba(7,17,41,0.95)_100%)] p-5">
              <p className="text-sm font-bold text-white">2. 어떤 순서로 진행하는지</p>
              <p className="mt-2 text-sm text-slate-300">한 단계씩 넘기며 자료 제출, 신청, 출력 진행</p>
            </div>
            <div className="rounded-[1.5rem] border border-[#284f95] bg-[linear-gradient(180deg,rgba(13,29,69,0.95)_0%,rgba(7,17,41,0.95)_100%)] p-5">
              <p className="text-sm font-bold text-white">3. 지금 무엇을 해야 하는지</p>
              <p className="mt-2 text-sm text-slate-300">메뉴, 준비물, 주의사항을 현재 단계 카드로 안내</p>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <GuidedStepViewer steps={activeTrack.steps} ariaLabel={`${activeTrack.label} 확인서 발급 단계별 안내`} />
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
            <h2 className="text-2xl font-black text-white">막히면 바로 확인할 곳</h2>
            <p className="mt-3 text-sm text-slate-300">
              발급 중 인증, 자료 제출, 출력 단계에서 막히면 지역별 문의처를 먼저 확인하는 편이 가장 빠릅니다.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#2e5fb4] bg-[rgba(121,240,255,0.08)] px-4 py-4 text-sm font-semibold text-slate-100">
                인증 또는 자료 제출 오류 확인
              </div>
              <div className="rounded-2xl border border-[#ff8bf5]/20 bg-[rgba(255,139,245,0.08)] px-4 py-4 text-sm font-semibold text-slate-100">
                지역별 문의처 바로 이동
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://sminfo.mss.go.kr/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#79f0ff] px-5 py-3 text-sm font-bold text-[#04101f]"
              >
                발급 사이트 열기
              </a>
              <a
                href="https://sminfo.mss.go.kr/cm/sv/CSV001R9.do"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-[#ff8bf5]/40 bg-[rgba(255,139,245,0.08)] px-5 py-3 text-sm font-bold text-[#ff8bf5]"
              >
                지역별 문의처 확인
              </a>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
            <h2 className="text-2xl font-black text-white">이런 분에게 맞습니다</h2>
            <div className="mt-4 grid gap-3">
              <p className="rounded-2xl border border-[#284f95] bg-[rgba(121,240,255,0.08)] px-4 py-4 text-sm font-semibold text-slate-100">
                확인서 발급이 처음이라 화면 순서를 한 번에 보기 어려운 분
              </p>
              <p className="rounded-2xl border border-[#284f95] bg-[rgba(121,240,255,0.08)] px-4 py-4 text-sm font-semibold text-slate-100">
                자료 제출과 신청서 작성 중 어디서 막히는지 미리 알고 싶은 분
              </p>
              <p className="rounded-2xl border border-[#284f95] bg-[rgba(121,240,255,0.08)] px-4 py-4 text-sm font-semibold text-slate-100">
                스마트상점 신청 전에 확인서를 빠르게 준비하려는 분
              </p>
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <h2 className="mt-2 text-2xl font-black text-white">확인서 발급 후 다음 단계</h2>
              <p className="mt-3 text-sm text-slate-300">
                확인서 또는 보완서류 준비가 끝나면 스마트상점 신청 가이드 페이지로 이동해 제품 선택과 서류 업로드 단계로 진행하면 됩니다.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href="/smartstore-apply" className="rounded-xl bg-[#ff8bf5] px-4 py-3 text-center text-sm font-bold text-[#1a0b24]">
                  스마트상점 신청 가이드 보기
                </a>
                <button type="button" onClick={() => setModalOpen(true)} className="rounded-xl border border-[#79f0ff]/40 bg-[rgba(121,240,255,0.08)] px-4 py-3 text-sm font-bold text-white">
                  발급 전 상담 신청
                </button>
              </div>
            </div>
            <ImageSlotPlaceholder
              label={imageSlots.certificateGuide.transition.label}
              src={imageSlots.certificateGuide.transition.src}
              alt={imageSlots.certificateGuide.transition.alt}
              note={imageSlots.certificateGuide.transition.note}
              plannedSrc={imageSlots.certificateGuide.transition.plannedSrc}
              sourceRef={imageSlots.certificateGuide.transition.sourceRef}
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

export default CertificateGuide
