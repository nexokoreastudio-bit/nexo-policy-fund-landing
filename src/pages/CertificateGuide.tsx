import { useEffect, useMemo, useState } from 'react'
import StickyTopBar from '../components/StickyTopBar'
import LeadModal from '../components/LeadModal'
import Toast from '../components/Toast'
import FloatingMobileCTA from '../components/FloatingMobileCTA'
import Footer from '../sections/Footer'
import { getClientConfig } from '../lib/config'
import guideDataRaw from '../data/certificate-guide.ko.json'
import type { CertificateGuideData, CertificateTrackKey } from '../types/certificate'

const guideData = guideDataRaw as CertificateGuideData
const trackKeys: CertificateTrackKey[] = ['general', 'startup']

function CertificateGuide() {
  const config = useMemo(() => getClientConfig(), [])
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [selectedTrack, setSelectedTrack] = useState<CertificateTrackKey>('general')
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})
  const [lightbox, setLightbox] = useState<{ stepIndex: number; imageIndex: number } | null>(null)
  const activeTrack = guideData[selectedTrack]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!lightbox) return
      const step = activeTrack.steps[lightbox.stepIndex]
      const lastImageIndex = step.images.length - 1
      if (event.key === 'Escape') setLightbox(null)
      if (event.key === 'ArrowLeft') {
        setLightbox((prev) => (prev ? { ...prev, imageIndex: prev.imageIndex === 0 ? lastImageIndex : prev.imageIndex - 1 } : prev))
      }
      if (event.key === 'ArrowRight') {
        setLightbox((prev) => (prev ? { ...prev, imageIndex: prev.imageIndex === lastImageIndex ? 0 : prev.imageIndex + 1 } : prev))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeTrack.steps, lightbox])

  return (
    <div className="bg-slate-50 text-slate-900">
      <StickyTopBar policyOpen={config.policy_open} onOpenConsult={() => setModalOpen(true)} />
      <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-6 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">소상공인 확인서 발급 방법 (3분이면 끝납니다)</h1>
          <p className="mt-3 text-sm text-slate-600">아래 순서대로 진행하면 신청 준비 시간을 크게 줄일 수 있습니다.</p>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid grid-cols-2 gap-2">
            {trackKeys.map((trackKey) => {
              const track = guideData[trackKey]
              const isActive = selectedTrack === trackKey
              return (
                <button
                  key={trackKey}
                  type="button"
                  onClick={() => {
                    setSelectedTrack(trackKey)
                    setLightbox(null)
                  }}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                    isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {track.label}
                </button>
              )
            })}
          </div>
          <p className="mt-3 text-sm text-slate-600">{activeTrack.description}</p>
        </section>

        <section className="mt-6 grid gap-5">
          {activeTrack.steps.map((step, stepIndex) => (
            <article key={`${selectedTrack}-${step.title}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">STEP {stepIndex + 1}</span>
                  <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">{step.title}</h2>
                </div>
                <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
              </div>

              {step.tip ? (
                <div className="mx-5 mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 sm:mx-6">
                  {step.tip}
                </div>
              ) : null}

              <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-5 sm:px-6">
                {step.images.map((imagePath, imageIndex) => {
                  const imageKey = `${selectedTrack}-${stepIndex}-${imagePath}`
                  const isFailed = failedImages[imageKey]
                  return (
                    <div key={imageKey} className="min-w-[min(84vw,29rem)] snap-start sm:min-w-[29rem]">
                      {isFailed ? (
                        <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400 sm:h-80">
                          스크린샷 준비 중
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setLightbox({ stepIndex, imageIndex })}
                          className="block w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-950"
                        >
                          <img
                            src={imagePath}
                            alt={`${step.title} 화면 ${imageIndex + 1}`}
                            className="h-72 w-full object-contain sm:h-80"
                            loading="lazy"
                            onError={() => setFailedImages((prev) => ({ ...prev, [imageKey]: true }))}
                          />
                        </button>
                      )}
                      <p className="mt-2 text-center text-xs font-medium text-slate-500">
                        화면 {imageIndex + 1}/{step.images.length}
                      </p>
                    </div>
                  )
                })}
              </div>

              {selectedTrack === 'general' && stepIndex === 0 ? (
                <a
                  href="https://sminfo.mss.go.kr/er/er/EER009R0.do"
                  target="_blank"
                  rel="noreferrer"
                  className="mx-5 mb-5 inline-flex rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white sm:mx-6"
                >
                  소상공인 확인서 발급 바로가기
                </a>
              ) : null}
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10">
          <h2 className="text-2xl font-black">확인서 발급이 어려우신가요? 넥소에서 무료로 도와드립니다</h2>
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
      {lightbox ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-slate-900"
            onClick={(event) => event.stopPropagation()}
            role="presentation"
          >
            <img
              src={activeTrack.steps[lightbox.stepIndex].images[lightbox.imageIndex]}
              alt={`${activeTrack.steps[lightbox.stepIndex].title} 확대 이미지`}
              className="max-h-[82vh] w-full object-contain"
            />
            <button
              type="button"
              onClick={() =>
                setLightbox((prev) =>
                  prev
                    ? {
                        ...prev,
                        imageIndex:
                          prev.imageIndex === 0 ? activeTrack.steps[prev.stepIndex].images.length - 1 : prev.imageIndex - 1,
                      }
                    : prev,
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-bold text-slate-900"
              aria-label="이전 이미지"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() =>
                setLightbox((prev) =>
                  prev
                    ? {
                        ...prev,
                        imageIndex:
                          prev.imageIndex === activeTrack.steps[prev.stepIndex].images.length - 1 ? 0 : prev.imageIndex + 1,
                      }
                    : prev,
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-bold text-slate-900"
              aria-label="다음 이미지"
            >
              →
            </button>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-2 text-sm font-bold text-slate-900"
              aria-label="닫기"
            >
              X
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CertificateGuide
