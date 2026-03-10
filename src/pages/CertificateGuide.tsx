import { useMemo, useState } from 'react'
import StickyTopBar from '../components/StickyTopBar'
import LeadModal from '../components/LeadModal'
import Toast from '../components/Toast'
import FloatingMobileCTA from '../components/FloatingMobileCTA'
import StepProgressBar from '../components/StepProgressBar'
import Footer from '../sections/Footer'
import Hero from '../sections/Hero'
import { getClientConfig } from '../lib/config'
import guideDataRaw from '../data/certificate-guide.ko.json'
import ImageSlotPlaceholder from '../components/ImageSlotPlaceholder'
import { imageSlots } from '../constants/imageSlots'
import type { CertificateGuideData, CertificateTrackKey } from '../types/certificate'

const guideData = guideDataRaw as CertificateGuideData
const trackKeys: CertificateTrackKey[] = ['general', 'startup']

function CertificateGuide() {
  const config = useMemo(() => getClientConfig(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [selectedTrack, setSelectedTrack] = useState<CertificateTrackKey>('general')
  const activeTrack = guideData[selectedTrack]
  const activeSlots = selectedTrack === 'general' ? imageSlots.certificateGuide.general : imageSlots.certificateGuide.startup

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
              const track = guideData[trackKey]
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
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
          <h2 className="text-2xl font-black text-white">이 페이지에서 확인할 내용</h2>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[#284f95] bg-[linear-gradient(180deg,rgba(13,29,69,0.95)_0%,rgba(7,17,41,0.95)_100%)] p-5">
              <p className="text-sm font-bold text-white">1. 어디서 발급하는지</p>
              <p className="mt-2 text-sm text-slate-300">SMINFO 또는 해당 발급 시스템 진입 화면</p>
            </div>
            <div className="rounded-[1.5rem] border border-[#284f95] bg-[linear-gradient(180deg,rgba(13,29,69,0.95)_0%,rgba(7,17,41,0.95)_100%)] p-5">
              <p className="text-sm font-bold text-white">2. 어떤 순서로 진행하는지</p>
              <p className="mt-2 text-sm text-slate-300">가입, 정보 입력, 자료 제출, 진행 확인, 출력</p>
            </div>
            <div className="rounded-[1.5rem] border border-[#284f95] bg-[linear-gradient(180deg,rgba(13,29,69,0.95)_0%,rgba(7,17,41,0.95)_100%)] p-5">
              <p className="text-sm font-bold text-white">3. 어디서 막히는지</p>
              <p className="mt-2 text-sm text-slate-300">자료 제출, 사업자 정보 입력, 출력 직전 단계</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5">
          {activeTrack.steps.map((step, stepIndex) => (
            <article
              key={`${selectedTrack}-${step.title}`}
              className="rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#79f0ff] px-3 py-1 text-xs font-bold text-[#04101f]">STEP {stepIndex + 1}</span>
                    <h2 className="text-xl font-black text-white">{step.title}</h2>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{step.desc}</p>
                  {step.tip ? (
                    <p className="mt-4 rounded-xl border border-[#2e5fb4] bg-[rgba(121,240,255,0.08)] px-4 py-3 text-sm font-semibold text-[#79f0ff]">
                      {step.tip}
                    </p>
                  ) : null}
                  {selectedTrack === 'general' && stepIndex === 0 ? (
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <a
                        href="https://sminfo.mss.go.kr/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-xl bg-[#79f0ff] px-4 py-3 text-sm font-bold text-[#04101f]"
                      >
                        소상공인 확인서 발급 바로가기
                      </a>
                      <a
                        href="https://sminfo.mss.go.kr/cm/sv/CSV001R9.do"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-xl border border-[#ff8bf5]/40 bg-[rgba(255,139,245,0.08)] px-4 py-3 text-sm font-bold text-[#ff8bf5]"
                      >
                        지역별 문의처 확인
                      </a>
                    </div>
                  ) : null}
                </div>
                <ImageSlotPlaceholder
                  label={activeSlots[stepIndex]?.label ?? `${selectedTrack} STEP ${stepIndex + 1} 이미지 슬롯`}
                  src={activeSlots[stepIndex]?.src}
                  alt={activeSlots[stepIndex]?.alt}
                  note={activeSlots[stepIndex]?.note}
                  plannedSrc={activeSlots[stepIndex]?.plannedSrc}
                  sourceRef={activeSlots[stepIndex]?.sourceRef}
                  minHeightClassName="min-h-[28rem] xl:min-h-[36rem]"
                />
              </div>
            </article>
          ))}
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
