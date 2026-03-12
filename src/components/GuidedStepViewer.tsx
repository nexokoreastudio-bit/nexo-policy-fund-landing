import { useEffect, useState } from 'react'

import type { GuidedStepItem } from '../constants/guidedSteps'
import ImageSlotPlaceholder from './ImageSlotPlaceholder'

type GuidedStepViewerProps = {
  steps: GuidedStepItem[]
  ariaLabel: string
}

function GuidedStepViewer({ steps, ariaLabel }: GuidedStepViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentIndex(0)
  }, [steps])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
      }

      if (event.key === 'ArrowRight') {
        setCurrentIndex((prev) => Math.min(prev + 1, steps.length - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [steps.length])

  const currentStep = steps[currentIndex]
  const progressPercent = ((currentIndex + 1) / steps.length) * 100
  const isFirstStep = currentIndex === 0
  const isLastStep = currentIndex === steps.length - 1

  return (
    <section
      aria-label={ariaLabel}
      className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] text-slate-900 shadow-[0_28px_70px_rgba(4,10,30,0.22)]"
    >
      <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-[#163a83] px-3 py-1 text-xs font-black tracking-[0.16em] text-white">
              STEP {currentStep.stepNumber}
            </span>
            <div>
              <p className="text-sm font-bold text-slate-500">
                {currentIndex + 1} / {steps.length}
              </p>
              <p className="text-lg font-black text-slate-900">{currentStep.subtitle ?? '단계별 안내'}</p>
            </div>
          </div>
          <div className="w-full max-w-sm">
            <div className="h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-[linear-gradient(90deg,#163a83_0%,#2d69ff_100%)] transition-[width] duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="mt-2 text-right text-xs font-semibold text-slate-500">현재 단계 진행률 {Math.round(progressPercent)}%</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 px-5 py-6 sm:px-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div key={currentStep.id} className="space-y-5">
          <div>
            <h3 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{currentStep.title}</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">{currentStep.description}</p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-black text-slate-900">이번 단계에서 할 일</p>
            <ul className="mt-3 grid gap-2">
              {currentStep.bullets.map((bullet) => (
                <li key={bullet} className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-[#dbe6ff] bg-[linear-gradient(180deg,#f5f9ff_0%,#eef4ff_100%)] p-5">
            <p className="text-sm font-black text-[#163a83]">현재 단계에서 할 일</p>
            <ul className="mt-3 grid gap-2">
              {currentStep.actionItems.map((item) => (
                <li key={item} className="rounded-xl border border-white bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {currentStep.caution ? (
            <div className="rounded-[1.5rem] border border-[#ffd5db] bg-[linear-gradient(180deg,#fff7f8_0%,#fff1f3_100%)] px-5 py-4">
              <p className="text-sm font-black text-[#b42339]">주의할 점</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{currentStep.caution}</p>
            </div>
          ) : null}

          {currentStep.ctaLabel && currentStep.ctaHref ? (
            <div className="flex flex-wrap gap-3">
              <a
                href={currentStep.ctaHref}
                target={currentStep.ctaHref.startsWith('http') ? '_blank' : undefined}
                rel={currentStep.ctaHref.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex items-center justify-center rounded-xl bg-[#163a83] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(22,58,131,0.24)]"
              >
                {currentStep.ctaLabel}
              </a>
            </div>
          ) : null}
        </div>

        <div key={`${currentStep.id}-image`} className="space-y-4">
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-sm font-black text-slate-900">화면 예시</p>
            <p className="mt-1 text-sm text-slate-500">오른쪽 이미지를 보면서 왼쪽 안내를 그대로 따라가면 됩니다.</p>
          </div>
          <ImageSlotPlaceholder
            label={currentStep.imageLabel}
            src={currentStep.imageSrc}
            alt={currentStep.imageAlt}
            note={currentStep.imageNote}
            plannedSrc={currentStep.imagePlannedSrc}
            sourceRef={currentStep.imageSourceRef}
            minHeightClassName="min-h-[20rem] sm:min-h-[24rem] xl:min-h-[32rem]"
          />
        </div>
      </div>

      <div className="border-t border-slate-200 px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {steps.map((step, index) => {
              const isActive = index === currentIndex
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`rounded-full px-3 py-2 text-xs font-bold transition-colors sm:text-sm ${
                    isActive ? 'bg-[#163a83] text-white' : 'border border-slate-200 bg-white text-slate-500'
                  }`}
                >
                  {step.stepNumber}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCurrentIndex(0)}
                disabled={isFirstStep}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                처음으로
              </button>
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                disabled={isFirstStep}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                이전 단계
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, steps.length - 1))}
                disabled={isLastStep}
                className="rounded-xl bg-[#163a83] px-4 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(22,58,131,0.24)] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                다음 단계
              </button>
              <button
                type="button"
                onClick={() => setCurrentIndex(steps.length - 1)}
                disabled={isLastStep}
                className="rounded-xl border border-[#dbe6ff] bg-[#eef4ff] px-4 py-3 text-sm font-bold text-[#163a83] disabled:cursor-not-allowed disabled:opacity-40"
              >
                마지막 단계
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GuidedStepViewer
