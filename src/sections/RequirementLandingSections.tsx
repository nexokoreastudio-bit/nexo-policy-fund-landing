import { useEffect, useState, type ReactNode } from 'react'
import SupportComparisonSection from './SupportComparisonSection'
import type { AppConfig, PolicyData } from '../types/policy'
import { certificateGeneralSteps, smartStoreApplySteps } from '../constants/guidedSteps'

const SHOW_HIDDEN_SECTIONS = false

const documentGroups = [
  {
    title: '60% 자부담완화 대상자 증빙서류',
    accent: '60%',
    accentClassName: 'text-[#ff4b37]',
    panelClassName: 'border-[#f0c8c3] bg-[linear-gradient(180deg,#fff7f5_0%,#fff1ee_100%)]',
    items: [
      '1. 사업자등록증',
      ...(SHOW_HIDDEN_SECTIONS ? (['2. 소상공인 확인서'] as const) : []),
      `${SHOW_HIDDEN_SECTIONS ? '3' : '2'}. 간판이 포함된 매장사진 [외부] 과 [내부] 사진`,
      `${SHOW_HIDDEN_SECTIONS ? '4' : '3'}. 아래 3가지 중 해당 증빙서류 1부`,
    ],
    links: [
      {
        label: '소상공인 확인서',
        href: 'https://sminfo.mss.go.kr/cm/sv/CSV001R0.do',
      },
      {
        label: '간이과세자(사업자등록증명원) - 국세청 홈텍스',
        href: 'https://www.hometax.go.kr/',
      },
      {
        label: '1인사업자(건강보험자격득실확인서) - 건강보험관리공단',
        href: 'https://www.nhis.or.kr/',
      },
      {
        label: '장애인기업(장애인증명서) - 공공구매종합정보',
        href: 'https://www.smpp.go.kr/',
      },
    ],
    extraLines: [
      '간이과세자(사업자등록증명원) - 국세청 홈텍스',
      '1인사업자(건강보험자격득실확인서) - 건강보험관리공단',
      '장애인기업(장애인증명서) - 공공구매종합정보',
    ],
    highlight: '세가지 중 한가지 계층에 해당하시면 지원 됩니다.',
  },
  {
    title: '50% 지원 대상자 증빙서류',
    accent: '50%',
    accentClassName: 'text-[#ff4b37]',
    panelClassName: 'border-[#d9e2ee] bg-[linear-gradient(180deg,#ffffff_0%,#f6f8fb_100%)]',
    items: [
      '1. 사업자등록증',
      ...(SHOW_HIDDEN_SECTIONS ? (['2. 소상공인 확인서'] as const) : []),
      `${SHOW_HIDDEN_SECTIONS ? '3' : '2'}. 간판이 포함된 매장사진 [외부] 과 내부 사진`,
    ],
    links: [
      {
        label: '사업자등록증(사업자등록증명원) - 국세청 홈텍스',
        href: 'https://www.hometax.go.kr/',
      },
      {
        label: '소상공인 확인서',
        href: 'https://sminfo.mss.go.kr/cm/sv/CSV001R0.do',
      },
    ],
    extraLines: [],
    highlight: '',
  },
] as const

const specItems: Array<{
  id: string
  content: ReactNode
  className?: string
}> = [
  { id: 'cpu', content: 'CPU: Octa-core' },
  { id: 'play-store', content: 'Google Play Store' },
  {
    id: 'android',
    content: '안드로이드 13.0 (15.0 Upgrade 가능)',
    className: 'text-[1.1rem] sm:text-[1.35rem]',
  },
  { id: 'storage', content: 'RAM 16G + ROM 256G' },
  { id: 'camera', content: '48MP 화소 AI 카메라', className: 'text-[1.1rem] sm:text-[1.35rem]' },
  { id: 'mic', content: '8개의 어레이 마이크' },
  { id: 'subwoofer', content: '20W*2+20W Subwoofer' },
  { id: 'brightness', content: '400nits 밝기' },
  { id: 'touch', content: '50 포인트 다중 터치' },
  { id: 'type-c', content: 'PD 100W Type-C' },
  { id: 'wifi', content: 'Wi-Fi 6' },
  { id: 'nfc', content: 'NFC 기능 탑재' },
] as const

const processTracks = [
  { id: 'certificate', label: '소상공인확인서 발급절차', steps: certificateGeneralSteps },
  { id: 'apply', label: '스마트상점 신청 절차', steps: smartStoreApplySteps },
] as const

const evaluationCriteria = [
  {
    category: '도입필요성 및 추진의지',
    points: [
      (
        <span>
          사업장 <span className="bg-[linear-gradient(transparent_58%,#ffb3b3_58%)] px-1 font-black text-slate-950">현황 및 애로사항</span>을 구체적으로 제시하였는지
        </span>
      ),
      (
        <span>
          스마트기술 <span className="bg-[linear-gradient(transparent_58%,#ffb3b3_58%)] px-1 font-black text-slate-950">도입목적</span>이 명확하고 타당한지
        </span>
      ),
      (
        <span>
          스마트기술 도입을 통한 <span className="bg-[linear-gradient(transparent_58%,#ffb3b3_58%)] px-1 font-black text-slate-950">경영효율화 의지</span>가 충분한지
        </span>
      ),
    ],
  },
  {
    category: '실행가능성 및 운영역량',
    points: [
      (
        <span>
          <span className="bg-[linear-gradient(transparent_58%,#ffb3b3_58%)] px-1 font-black text-slate-950">활용계획</span>이 구체적이고 및 실현가능한지
        </span>
      ),
      (
        <span>
          스마트기술을 <span className="bg-[linear-gradient(transparent_58%,#ffb3b3_58%)] px-1 font-black text-slate-950">운영·관리할 수 있는 역량</span>을 가지고 있는지
        </span>
      ),
    ],
  },
  {
    category: '사업이해도 및 참여적정성',
    points: [
      (
        <span>
          <span className="bg-[linear-gradient(transparent_58%,#ffb3b3_58%)] px-1 font-black text-slate-950">지원사업 목적과 주요내용</span>을 이해하고 있는지
        </span>
      ),
      (
        <span>
          <span className="bg-[linear-gradient(transparent_58%,#ffb3b3_58%)] px-1 font-black text-slate-950">의무사용기간 준수, 성과조사</span> 참여에 대해 인지하고 있는지
        </span>
      ),
    ],
  },
  {
    category: '기술적합성',
    points: [
      (
        <span>
          사업장 면적·업종·운영형태에 적합한 <span className="bg-[linear-gradient(transparent_58%,#ffb3b3_58%)] px-1 font-black text-slate-950">기술을 선택</span>하였는지
        </span>
      ),
      (
        <span>
          스마트기술 <span className="bg-[linear-gradient(transparent_58%,#ffb3b3_58%)] px-1 font-black text-slate-950">도입이 가능한</span> 환경을 갖추고 있는지
        </span>
      ),
      (
        <span>
          도입기술이 <span className="bg-[linear-gradient(transparent_58%,#ffb3b3_58%)] px-1 font-black text-slate-950">사업장 문제해결</span>에 기여할 수 있는지
        </span>
      ),
    ],
  },
] as const

const RECRUITMENT_DEADLINE = '2026-04-01T17:00:00+09:00'

const applicationOverviewSteps: Array<{
  step: string
  title: string
  summary: string
  detail: string
  note?: string
  current?: boolean
  compare?: {
    leftLabel: string
    leftValue: string
    rightLabel: string
    rightValue: string
  }
}> = [
  {
    step: '01',
    title: '사업 신청',
    summary: '소상공인 사이트에서 신청',
    detail: '소상공인 사이트에서 공고를 확인하고 신청서를 접수합니다.',
    note: '접수기간: 2026.03.13 ~ 2026.04.01 17:00',
    current: true,
  },
  {
    step: '02',
    title: '소상공인 선정',
    summary: '소상공인 사이트 공지',
    detail: '서면평가와 심사를 거쳐 선정 결과가 개별 통보 됩니다.',
    note: '선정 발표: 2026년 진행 일정에 따라 공지',
  },
  {
    step: '03',
    title: '계약 / 자부담 납부',
    summary: '선정 후 필수 진행 단계',
    detail: '전자계약, 자부담 납부 서류 제출을 진행합니다.',
    compare: {
      leftLabel: '자부담완화 대상',
      leftValue: '자부담 40%',
      rightLabel: '일반지원대상',
      rightValue: '자부담 50%',
    },
  },
  {
    step: '04',
    title: '설치',
    summary: '전자칠판 설치 진행',
    detail: '서류 확인과 일정 조율 후 현장 설치를 진행합니다.',
    note: '설치 기간은 해당 연도 사업 일정에 따라 조정됩니다.',
  },
  {
    step: '05',
    title: '2년 의무사용',
    summary: '위치 변경 불가',
    detail: '설치 후 2년 의무사용 기준을 준수해야 하며 임의 위치 변경은 소상공인 진흥공단에 문의 해 주시기 바랍니다.',
    note: '문의처: 소상공인 진흥공공단 1600-6185',
  },
] as const

function formatRemainingTime(now: Date) {
  const diffMs = new Date(RECRUITMENT_DEADLINE).getTime() - now.getTime()

  if (diffMs <= 0) {
    return {
      days: '마감',
      rest: '됨',
    }
  }

  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = totalSeconds % 60

  return {
    days: `${days}일`,
    rest: `${String(hours).padStart(2, '0')}시간 ${String(minutes).padStart(2, '0')}분 ${String(seconds).padStart(2, '0')}초`,
  }
}

function ProcessSliderSection() {
  const visibleTracks = SHOW_HIDDEN_SECTIONS ? processTracks : processTracks.filter((track) => track.id !== 'certificate')
  const [trackIndex, setTrackIndex] = useState(0)
  const [stepIndexByTrack, setStepIndexByTrack] = useState<Record<string, number>>({
    certificate: 0,
    apply: 0,
  })
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const safeTrackIndex = Math.min(trackIndex, visibleTracks.length - 1)
  const currentTrack = visibleTracks[safeTrackIndex]
  const currentStepIndex = stepIndexByTrack[currentTrack.id] ?? 0
  const currentStep = currentTrack.steps[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === currentTrack.steps.length - 1
  const isNoAnnouncementPreview = currentTrack.id === 'apply' && currentStep.id === 'apply-start'

  const updateStepIndex = (nextIndex: number) => {
    setStepIndexByTrack((prev) => ({
      ...prev,
      [currentTrack.id]: nextIndex,
    }))
  }

  return (
    <>
      <section className="border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="mb-6 border border-[#bfd7f7] bg-[linear-gradient(180deg,#eef6ff_0%,#f8fbff_100%)] px-4 py-4 text-center shadow-[0_12px_24px_rgba(15,23,42,0.05)] sm:mb-8 sm:px-6 sm:py-5">
          <p className="text-[1.2rem] font-black leading-8 text-[#d62828] sm:text-[2rem] sm:leading-[3rem]">
            모든 서류가 준비 되셨으면 스마트상점 신청을 시작하겠습니다.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 sm:gap-5">
            <span className="text-[2rem] font-black leading-none tracking-[-0.18em] text-[#ff3b30] sm:text-[3rem]">
              &gt;&gt;&gt;
            </span>
            <a
              href="https://www.sbiz.or.kr/smst/index.do"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center border border-[#21457e] bg-[#21457e] px-5 py-3 text-sm font-black text-white transition hover:bg-[#173a73] sm:text-base"
            >
              소상공인스마트상점 신청 바로가기
            </a>
            <span className="text-[2rem] font-black leading-none tracking-[-0.18em] text-[#ff3b30] sm:text-[3rem]">
              &lt;&lt;&lt;
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex border border-[#cfdbec] bg-[#eef4fb] px-3 py-2 text-xs font-black tracking-[0.14em] text-[#21457e] sm:px-4 sm:text-base">
              신청 절차
            </span>
            <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
              화면을 보면서 단계별로 그대로 따라가면 됩니다.
            </h2>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {visibleTracks.map((track, index) => {
              const isActive = index === safeTrackIndex
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setTrackIndex(index)}
                  className={`w-full px-4 py-3 text-sm font-black transition sm:w-auto ${
                    isActive ? 'bg-[#21457e] text-white' : 'border border-[#cfdbec] bg-white text-[#21457e]'
                  }`}
                >
                  {track.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-3">
            {currentTrack.steps.map((step, index) => {
              const isActive = index === currentStepIndex
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => updateStepIndex(index)}
                  className={`block w-full border px-4 py-3 text-left shadow-[0_12px_24px_rgba(15,23,42,0.04)] transition sm:px-5 sm:py-4 ${
                    isActive ? 'border-[#7aa7e6] bg-[#eef5ff]' : 'border-[#dbe6f3] bg-white'
                  }`}
                >
                  <p className="text-xs font-black tracking-[0.14em] text-[#21457e]">STEP {step.stepNumber}</p>
                  <p className="mt-2 text-sm font-bold leading-6 text-slate-900 sm:text-base">{step.title}</p>
                </button>
              )
            })}
          </div>

          <div className="space-y-4">
            {isNoAnnouncementPreview ? (
              <div className="block w-full border border-[#dbe6f3] bg-white p-6 text-left shadow-[0_12px_24px_rgba(15,23,42,0.04)]">
                <div className="flex min-h-[18rem] flex-col items-center justify-center border border-[#e7edf5] bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_100%)] px-5 py-8 text-center sm:min-h-[24rem] sm:px-6 sm:py-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2b63c7] text-3xl font-black text-white shadow-[0_10px_24px_rgba(43,99,199,0.25)]">
                    !
                  </div>
                  <p className="mt-6 text-[1.3rem] font-black tracking-tight text-[#173a73] sm:text-[2.4rem]">3월13일(금) 10시 신청접수 시작합니다.</p>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="block w-full border border-[#dbe6f3] bg-white p-4 text-left shadow-[0_12px_24px_rgba(15,23,42,0.04)] transition hover:border-[#7aa7e6]"
              >
                <img src={currentStep.imageSrc} alt={currentStep.imageAlt} className="block w-full" />
                <p className="mt-3 text-right text-xs font-bold tracking-[0.12em] text-[#21457e]">이미지 클릭 시 크게 보기</p>
              </button>
            )}

            <div className="border border-[#dbe6f3] bg-white p-5 shadow-[0_12px_24px_rgba(15,23,42,0.04)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-black tracking-[0.14em] text-[#21457e]">
                    {currentTrack.label} / {currentStepIndex + 1}단계
                  </p>
                  <p className="mt-2 text-lg font-black text-slate-950 sm:text-xl">{currentStep.title}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{currentStep.description}</p>
                </div>
                <div className="border border-[#cfdbec] bg-[#eef4fb] px-4 py-3 text-center">
                  <p className="text-xs font-black tracking-[0.14em] text-[#21457e]">진행도</p>
                  <p className="mt-1 text-xl font-black text-[#21457e]">
                    {currentStepIndex + 1}/{currentTrack.steps.length}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                {currentStep.actionItems.map((item) => (
                  <div key={item} className="border border-[#dbe6f3] bg-[#f8fbff] px-4 py-3 text-sm font-semibold text-slate-700">
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="grid gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={() => updateStepIndex(Math.max(currentStepIndex - 1, 0))}
                    disabled={isFirstStep}
                    className="border border-[#cfdbec] bg-white px-4 py-3 text-sm font-bold text-[#21457e] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    이전 단계
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStepIndex(Math.min(currentStepIndex + 1, currentTrack.steps.length - 1))}
                    disabled={isLastStep}
                    className="bg-[#21457e] px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    다음 단계
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxOpen && currentStep.imageSrc && !isNoAnnouncementPreview ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6"
          onClick={() => setLightboxOpen(false)}
          role="presentation"
        >
          <div className="relative max-h-full w-full max-w-6xl" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-0 top-[-3rem] border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-white backdrop-blur-sm"
            >
              닫기
            </button>
            <div className="max-h-[85vh] overflow-auto border border-white/10 bg-white p-4">
              <img src={currentStep.imageSrc} alt={currentStep.imageAlt} className="block w-full" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

function ApplicationOverviewSection() {
  return (
      <section className="border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="text-center">
        <span className="inline-flex border border-[#cfdbec] bg-[#eef4fb] px-3 py-2 text-xs font-black tracking-[0.14em] text-[#21457e] sm:px-4 sm:text-base">
          진행 흐름
        </span>
        <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">신청부터 선정, 설치까지 한눈에 보는 진행 절차</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 sm:text-lg">
          소상공인이 실제로 거치게 되는 핵심 단계만 추려서 쉽게 정리했습니다.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-6 xl:gap-5">
        {applicationOverviewSteps.map((item, index) => (
          <article
            key={item.step}
            className={`relative border p-5 shadow-[0_12px_24px_rgba(15,23,42,0.04)] ${
              item.current
                ? 'border-[#ffd76a] bg-[linear-gradient(180deg,#fffef1_0%,#fff6cf_100%)] shadow-[0_18px_34px_rgba(196,145,0,0.12)]'
                : 'border-[#dbe6f3] bg-white'
            } ${index < 3 ? 'xl:col-span-2' : 'xl:col-span-3'}`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-black text-white ${
                  item.current ? 'bg-[#f59f00]' : 'bg-[#21457e]'
                }`}
              >
                {item.step}
              </span>
              {index !== applicationOverviewSteps.length - 1 ? (
                <span className="hidden text-2xl font-black text-[#9ab2d5] xl:block">→</span>
              ) : null}
            </div>
            {item.current ? (
              <p className="mt-4 text-xs font-black tracking-[0.14em] text-[#9c6500]">현재 진행 단계</p>
            ) : null}
            <h3 className="mt-5 text-[1.3rem] font-black leading-tight text-slate-950 sm:text-[1.45rem]">{item.title}</h3>
            <p className="mt-3 text-base font-black text-[#21457e] sm:text-lg">{item.summary}</p>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-700 sm:text-base">{item.detail}</p>
            <div className="mt-5 border-t border-[#e7edf5] pt-4 text-sm font-bold leading-6 text-slate-600">
              {item.compare ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-[#ffe0a6] bg-[linear-gradient(180deg,#fffaf0_0%,#fff3d9_100%)] px-3 py-3 text-center">
                    <p className="text-xs font-black tracking-[0.08em] text-[#9c6500]">{item.compare.leftLabel}</p>
                    <p className="mt-1 text-lg font-black text-slate-950">{item.compare.leftValue}</p>
                  </div>
                  <div className="border border-[#dbe6f3] bg-[#f8fbff] px-3 py-3 text-center">
                    <p className="text-xs font-black tracking-[0.08em] text-[#21457e]">{item.compare.rightLabel}</p>
                    <p className="mt-1 text-lg font-black text-slate-950">{item.compare.rightValue}</p>
                  </div>
                </div>
              ) : (
                item.note
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

type RequirementLandingSectionsProps = {
  config: AppConfig
  policyData: PolicyData
}

function RequirementLandingSections({ config, policyData }: RequirementLandingSectionsProps) {
  const [referenceOpen, setReferenceOpen] = useState(false)
  const [evaluationGuideOpen, setEvaluationGuideOpen] = useState(false)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-8">
      <section className="border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <div>
          <span className="inline-flex border border-[#cfdbec] bg-[#eef4fb] px-3 py-2 text-xs font-black tracking-[0.14em] text-[#21457e] sm:px-4 sm:text-base">
            모집 안내
          </span>
          <div className="mt-4 border-2 border-[#c5d3e6] bg-white p-4 shadow-[0_14px_32px_rgba(15,23,42,0.05)] sm:p-8">
            <div className="border border-[#dbe6f3] bg-[#fbfcff] p-4 sm:p-6">
              <p className="text-[1.5rem] font-black leading-tight tracking-tight text-slate-950 sm:text-[2.35rem]">
                2026년 스마트상점 기술보급사업 참여 소상공인 모집공고
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:items-stretch">
                <article className="min-h-[11rem] border border-[#8e5cff] bg-white px-4 py-4 sm:px-6 sm:py-5">
                  <p className="text-[1.05rem] font-black tracking-[0.08em] text-[#21457e] sm:text-[1.55rem]">목적</p>
                  <p className="mt-4 text-base font-semibold leading-8 text-slate-800 sm:text-[1.45rem] sm:leading-[3rem]">
                    (목적) 소비•유통환경의 비대면•디지털화에 따라 <span className="font-black text-[#d62828]">소상공인</span> 사업장에 스마트기술 도입 지원을 통해 <span className="font-black text-[#d62828]">소상공인</span>의 경쟁력 제고
                  </p>
                </article>

                <article className="min-h-[11rem] border border-[#8e5cff] bg-white px-4 py-4 sm:px-6 sm:py-5">
                  <p className="text-[1.05rem] font-black tracking-[0.08em] text-[#21457e] sm:text-[1.55rem]">지원대상</p>
                  <p className="mt-4 text-base font-semibold leading-8 tracking-tight text-slate-800 sm:text-[1.45rem] sm:leading-[3rem]">
                    (지원대상) 「<span className="font-black text-[#1e63d6]">소상공인</span>기본법』 제2조에 따른
                    <br />
                    <span className="font-black text-[#1e63d6]">소상공인</span>으로, 신청일 현재 정상적으로 영업 중인 점포
                  </p>
                  {SHOW_HIDDEN_SECTIONS ? (
                    <p className="mt-3 border-t border-[#e7edf5] pt-3 text-sm leading-6 text-slate-600">
                      *{' '}
                      <a
                        href="https://sminfo.mss.go.kr/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-black text-[#1e63d6] underline underline-offset-4"
                      >
                        중소기업현황정보시스템(sminfo.mss.go.kr)
                      </a>
                      에서 <span className="font-black text-[#d62828]">소상공인확인서</span> 발급 가능한 점포
                    </p>
                  ) : null}
                </article>
              </div>

              <div className="mt-8 border-t border-[#e5ebf3] pt-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                  <p className="text-[1rem] font-black leading-8 text-[#e03131] sm:text-[1.45rem]">
                    ※ 소상공인기준:
                  </p>
                  <button
                    type="button"
                    onClick={() => setReferenceOpen(true)}
                    className="inline-flex items-center justify-center border border-[#b9cbe6] bg-[linear-gradient(180deg,#f8fbff_0%,#e9f1fb_100%)] px-4 py-3 text-base font-black text-[#21457e] shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition hover:border-[#7aa7e6] hover:bg-[#f3f8ff] sm:px-5 sm:text-lg"
                  >
                    소상공인 확인 기준표 보기
                  </button>
                  <p className="text-sm font-semibold leading-6 text-slate-600 sm:text-base">
                    클릭해서 소상공인 해당 여부를 바로 확인하세요
                  </p>
                </div>
                <div className="mt-4 border border-[#f3b4b4] bg-[linear-gradient(180deg,#fff8f8_0%,#fff1f1_100%)] px-5 py-4">
                  <p className="text-sm font-black tracking-[0.08em] text-[#b42318] sm:text-base">
                    소상공인 부합 여부 확인 조건
                  </p>
                  <p className="mt-2 text-[1.05rem] font-black leading-tight tracking-tight text-[#e03131] sm:text-[1.9rem] sm:leading-[2.7rem]">
                    교육/서비스업, 5인미만(4대보험가입자), 15억이하(연매출)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border border-[#cfdbec] bg-[linear-gradient(180deg,#fcfdff_0%,#f5f8fc_100%)] p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:p-8">
              <div className="space-y-5 text-base font-bold leading-8 text-slate-900 sm:text-[1.05rem]">
                <div className="text-center">
                  <div className="mx-auto inline-flex border border-[#cfdbec] bg-[#eef4fb] px-5 py-3 text-[1rem] font-black tracking-[0.08em] text-[#21457e] shadow-[0_8px_18px_rgba(15,23,42,0.05)] sm:text-[1.45rem]">
                    -모집내용-
                  </div>
                  <p>
                    <span className="bg-[linear-gradient(transparent_58%,#fff29a_58%)] px-2 text-[1.1rem] font-black leading-8 sm:text-[1.95rem] sm:leading-[3.4rem]">
                      소상공인의 디지털 전환및 스마트기술 지원을 통한 경쟁력 제고를 위해
                      <br />
                      정부에서 스마트기술 보급을 지원합니다.
                    </span>
                  </p>
                </div>
                <p className="text-center text-[1.15rem] font-black tracking-tight text-slate-950 sm:text-[2rem]">
                  공급가액: 최대 <span className="text-[#e03131]">60%</span> 지원[ <span className="text-[#e03131]">500만원</span>]
                </p>
                <div className="grid gap-4 border border-[#ead98b] bg-[linear-gradient(180deg,#fffef2_0%,#fff8cf_100%)] px-4 py-4 sm:px-5 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <p className="text-sm font-black tracking-[0.08em] text-[#7a5d00] sm:text-base">마감 전 빠른 신청 권장</p>
                    <p className="mt-1 text-base font-black leading-8 text-slate-950 sm:text-[1.2rem]">
                      모집기간:{' '}
                      <span className="bg-[linear-gradient(transparent_58%,#fff29a_58%)] px-1">
                        2026년 3월 13일(금) 10:00 ~ 4월 1일(수) 17:00까지
                      </span>
                    </p>
                  </div>
                  <div className="border border-[#ead98b] bg-white/70 px-4 py-3 text-left lg:min-w-[17rem]">
                    <p className="text-sm font-black tracking-[0.08em] text-[#7a5d00]">마감까지</p>
                    <p className="mt-1 text-base font-black tracking-tight text-slate-950 sm:text-xl">
                      <span className="text-[#d62828]">{formatRemainingTime(now).days}</span>{' '}
                      <span>{formatRemainingTime(now).rest}</span>
                    </p>
                  </div>
                </div>
                <p className="text-center text-[1.05rem] leading-8 sm:text-[1.65rem]">
                  신청방법:{' '}
                  <a
                    href="https://www.sbiz.or.kr/smst/index.do"
                    target="_blank"
                    rel="noreferrer"
                    className="font-black text-[#1e63d6] underline underline-offset-4"
                  >
                    스마트상점홈페이지 접수(www.sbiz.or.kr/smst/index.do)
                  </a>
                </p>
              </div>

              <div className="mt-8 border border-[#cfdbec] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] p-4 sm:p-5">
                <div className="relative">
                  <img src="/assets/requirements-2026/no-announcement-guide.png" alt="스마트사업신청 사업공고 및 부당개입금지 안내" className="block w-full" />
                  <a
                    href="https://www.sbiz.or.kr/smst/bbs/view.do?bbsSn=5727&key=2111306039167&maxList=10&pageIndex=1&sc=&sw=&recordCountPerPage=10"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="부당개입 금지 안내 바로가기"
                    className="absolute right-[4.5%] top-[4%] block h-[82%] w-[37%]"
                  />
                </div>
              </div>
            </div>
          </div>

          {SHOW_HIDDEN_SECTIONS ? (
            <a
              href="https://sminfo.mss.go.kr/cm/sv/CSV001R9.do"
              target="_blank"
              rel="noreferrer"
              className="mt-4 block border border-[#dbe6f3] bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.04)] transition hover:border-[#7aa7e6]"
            >
              <div className="mb-4 border border-[#cfdbec] bg-[#eef4fb] px-4 py-3 text-sm font-black text-[#21457e] sm:text-base">
                신청서 작성중 문제발생시 관련 기업청 전화로 문의(클릭시 관련 기업청 연락처 확인가능)
              </div>
              <img src="/assets/requirements-2026/regional-contact-guide.png" alt="지방중소벤처기업청 전화번호 안내" className="block w-full" />
              <p className="mt-3 text-right text-xs font-bold tracking-[0.12em] text-[#21457e]">이미지 클릭 시 지역 문의처 페이지 이동</p>
            </a>
          ) : null}
        </div>
      </section>

      <section className="border border-[#0f4d8b] bg-[linear-gradient(135deg,#0b4d87_0%,#063866_100%)] p-4 text-white shadow-[0_20px_50px_rgba(5,22,45,0.22)] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-2xl font-black tracking-tight sm:text-4xl">NEXO 전자칠판 스펙 안내</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-semibold sm:text-base">
              <p className="text-sky-100">주요사양</p>
              <a
                href="https://nexokorea.co.kr/product.html"
                target="_blank"
                rel="noreferrer"
                className="cta-flash inline-flex items-center border border-[#8fd0ff] bg-white px-4 py-2 text-sm font-black text-[#0b4d87] transition hover:bg-sky-100"
              >
                제품상세보기 CLICK
              </a>
            </div>
          </div>
          <div className="border border-[#5eb8ee] bg-white px-4 py-2 text-xl font-black tracking-tight text-[#1783cc] sm:px-5 sm:text-2xl">
            65&quot;&nbsp;&nbsp;75&quot;&nbsp;&nbsp;86&quot;
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="border border-[#1897e5] bg-[rgba(4,29,58,0.35)] p-4 sm:p-5">
            <img src="/assets/requirements-2026/nexo-digital.png" alt="NEXO 전자칠판 이미지" className="block w-full" />
            <p className="mt-5 text-center text-[1.45rem] font-black tracking-tight text-white sm:text-[2.8rem]">RAM 16G + ROM 256G</p>
            <div className="mx-auto mt-6 max-w-3xl text-center text-sky-50">
              <div className="mx-auto max-w-[34rem] border border-[#49b8ff] bg-[linear-gradient(180deg,rgba(7,52,96,0.88)_0%,rgba(5,37,72,0.72)_100%)] px-4 py-5 shadow-[0_0_0_1px_rgba(73,184,255,0.15),0_18px_36px_rgba(2,16,33,0.28)] sm:px-6 sm:py-6">
                <p className="text-[1.9rem] font-black leading-none tracking-tight text-[#dff5ff] sm:text-[3.5rem]">
                  NEXO
                </p>
                <p className="mt-3 text-[1.15rem] font-black leading-none tracking-[0.08em] text-[#dff5ff] sm:text-[2rem]">
                  ALL-IN-ONE
                </p>
                <p className="mt-4 text-[1rem] font-black leading-none tracking-[0.12em] text-white sm:text-[1.6rem]">
                  SMART SOLUTION
                </p>
              </div>
              <p className="mt-4 text-[0.95rem] font-semibold leading-7 text-sky-50 sm:text-[1.3rem] sm:leading-[2.5rem]">사후 관리까지 책임지는 믿음직한 파트너입니다.</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {specItems.map((item) => (
              <div
                key={item.id}
                className={`flex min-h-[84px] items-center justify-center border border-[#1897e5] bg-[rgba(11,98,167,0.22)] px-3 py-4 text-center text-lg font-semibold tracking-tight text-white sm:min-h-[92px] sm:px-4 sm:text-2xl ${item.className ?? ''}`}
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SupportComparisonSection config={config} policyData={policyData} />

      <section className="border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fd_100%)] p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <span className="inline-flex border border-[#cfdbec] bg-[#eef4fb] px-3 py-2 text-xs font-black tracking-[0.14em] text-[#21457e] sm:px-4 sm:text-base">
          준비 서류
        </span>
        <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">신청 전 미리 준비할 서류</h2>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {documentGroups.map((group) => (
            <article key={group.title} className={`border p-6 shadow-[0_14px_28px_rgba(15,23,42,0.06)] ${group.panelClassName}`}>
              <h3 className="text-[1.7rem] font-black leading-tight text-slate-950">
                <span className={group.accentClassName}>{group.accent}</span>{' '}
                {group.title.replace(`${group.accent} `, '')}
              </h3>

              <ul className="mt-5 grid gap-3">
                {group.items.map((item) => (
                  <li key={item} className="border border-slate-200 bg-white px-4 py-3 text-base font-bold text-slate-800">
                    {item}
                  </li>
                ))}
              </ul>

              {group.highlight ? (
                <p className="mt-5 border-t border-slate-200 pt-4 text-lg font-black text-[#ff2e8a]">{group.highlight}</p>
              ) : null}

              {group.extraLines.length > 0 ? (
                <div className="mt-4 space-y-2 border-l-4 border-[#f3b4b4] bg-white/70 px-4 py-4 text-sm font-semibold leading-6 text-slate-700">
                  {group.extraLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 grid gap-2">
                {group.links
                  .filter((link) => SHOW_HIDDEN_SECTIONS || link.label !== '소상공인 확인서')
                  .map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[#b7cff2] bg-[#eef5ff] px-4 py-3 text-sm font-black text-[#145fc9] underline underline-offset-4 transition hover:bg-[#e4efff]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

            </article>
          ))}
        </div>
      </section>

      <section className="border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <article>
          <h2 className="text-center text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">소상공인 선정평가 기준</h2>

          <div className="mx-auto mt-5 max-w-[72rem] border border-[#dbe6f3] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] px-5 py-5 text-center shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:px-6">
            <p className="text-[1.08rem] font-black leading-8 text-slate-900 sm:text-[1.2rem]">
              (서면평가) 서류검토 적격자를 대상으로
              <br />
              <span className="text-[#d62828]">도입필요성 및 추진의지</span>, <span className="text-[#d62828]">실행가능성 및 운영역량</span>,{' '}
              <span className="text-[#d62828]">사업이해도 및 참여적정성</span>, <span className="text-[#d62828]">기술 적합성</span>을 평가
            </p>
            <p className="mt-3 text-base font-semibold leading-8 text-slate-700 sm:text-[1.05rem]">
              * 신청 기술별로 개별평가가 진행되어
              <br />
              <span className="font-black text-[#d62828]">신청한 기술 전체가 선정되지 않을 수 있으며, 신청수량과 최종 선정수량은 달라질 수 있음</span>
            </p>
            <p className="mt-2 text-base font-semibold leading-8 text-slate-700 sm:text-[1.05rem]">
              (예: 전자칠판 2대 사이니지 1대 신청 → 평가를 통해 전자칠판 1대 선정)
            </p>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setEvaluationGuideOpen(true)}
                className="inline-flex items-center justify-center border border-[#cfdbec] bg-[#eef4fb] px-5 py-3 text-base font-black text-[#21457e] shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition hover:border-[#7aa7e6]"
              >
                서면평가 문서보기
              </button>
            </div>
          </div>

          <div className="mx-auto mt-5 max-w-[72rem] overflow-hidden border border-[#dbe6f3] bg-white shadow-[0_12px_24px_rgba(15,23,42,0.04)]">
            <div className="grid border-b border-[#dbe6f3] bg-[#eef4fb] text-center text-[#173a73] md:grid-cols-[0.34fr_0.66fr]">
              <div className="border-b border-[#dbe6f3] px-5 py-5 text-[1.35rem] font-black md:border-b-0 md:border-r md:text-[1.55rem]">평가항목</div>
              <div className="px-5 py-5 text-[1.35rem] font-black md:text-[1.55rem]">세부 평가내용</div>
            </div>

            {evaluationCriteria.map((item, index) => (
              <div
                key={item.category}
                className={`grid md:grid-cols-[0.34fr_0.66fr] ${
                  index !== evaluationCriteria.length - 1 ? 'border-b border-[#dbe6f3]' : ''
                }`}
              >
                <div className="flex items-center justify-center border-b border-[#eef2f7] bg-[#f8fbff] px-5 py-5 text-center text-lg font-black text-slate-900 md:border-b-0 md:border-r">
                  {item.category}
                </div>
                <div className="px-5 py-5">
                  <ul className="grid gap-2 justify-items-center">
                    {item.points.map((point, pointIndex) => (
                      <li key={`${item.category}-${pointIndex}`} className="flex max-w-3xl items-start justify-center gap-2 text-center text-sm font-semibold leading-7 text-slate-700 sm:text-base">
                        <span className="mt-[0.45rem] block h-1.5 w-1.5 flex-none rounded-full bg-[#21457e]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <ProcessSliderSection />
      <ApplicationOverviewSection />
      </div>

      {referenceOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6"
          onClick={() => setReferenceOpen(false)}
          role="presentation"
        >
          <div className="relative max-h-full w-full max-w-5xl" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
            <button
              type="button"
              onClick={() => setReferenceOpen(false)}
              className="absolute right-0 top-[-3rem] border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-white backdrop-blur-sm"
            >
              닫기
            </button>
            <div className="max-h-[85vh] overflow-auto border border-white/10 bg-white p-4">
              <img src="/assets/requirements-2026/eligibility-reference.png" alt="소상공인 확인 기준표" className="block w-full" />
            </div>
          </div>
        </div>
      ) : null}

      {evaluationGuideOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6"
          onClick={() => setEvaluationGuideOpen(false)}
          role="presentation"
        >
          <div className="relative max-h-full w-full max-w-5xl" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
            <button
              type="button"
              onClick={() => setEvaluationGuideOpen(false)}
              className="absolute right-0 top-[-3rem] border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-white backdrop-blur-sm"
            >
              닫기
            </button>
            <div className="max-h-[85vh] overflow-auto border border-white/10 bg-white p-4">
              <img src="/assets/requirements-2026/evaluation-guide.png" alt="서면평가 내용 안내" className="block w-full" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default RequirementLandingSections
