import { useState } from 'react'
import SupportComparisonSection from './SupportComparisonSection'
import type { AppConfig, PolicyData } from '../types/policy'
import { certificateGeneralSteps, smartStoreApplySteps } from '../constants/guidedSteps'

const documentGroups = [
  {
    title: '60% 자부담완화 대상자 증빙서류',
    accent: '60%',
    accentClassName: 'text-[#ff4b37]',
    panelClassName: 'border-[#f0c8c3] bg-[linear-gradient(180deg,#fff7f5_0%,#fff1ee_100%)]',
    items: [
      '1. 사업자등록증',
      '2. 소상공인 확인서',
      '3. 간판이 포함된 매장사진 [외부] 과 [내부] 사진',
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
      '4-1. 간이과세자(사업자등록증명원) - 국세청 홈텍스 발급',
      '4-2. 1인사업자(건강보험자격득실확인서) - 4대보험 가입자 없는 사업장',
      '4-3. 장애인기업(장애인증명서)',
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
      '2. 소상공인 확인서',
      '3. 간판이 포함된 매장사진 [외부] 과 내부 사진',
    ],
    links: [
      {
        label: '소상공인 확인서',
        href: 'https://sminfo.mss.go.kr/cm/sv/CSV001R0.do',
      },
    ],
    extraLines: ['4대보험 가입 5인미만 기업'],
    highlight: '',
  },
] as const

const specItems = [
  'CPU: Octa-core 2.4GHz',
  'Google Play Store',
  '안드로이드 13.0',
  '16+256G',
  '48MP 화소 AI 카메라',
  '8개의 어레이 마이크',
  '20W*2+20W Subwoofer',
  '400nits 밝기',
  '50 포인트 다중 터치',
  'PD 100W Type-C',
  'Wi-Fi 6',
  'NFC 기능 탑재',
] as const

const processTracks = [
  { id: 'certificate', label: '소상공인확인서 발급절차', steps: certificateGeneralSteps },
  { id: 'apply', label: '스마트상점 신청 절차', steps: smartStoreApplySteps },
] as const

function ProcessSliderSection() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [stepIndexByTrack, setStepIndexByTrack] = useState<Record<string, number>>({
    certificate: 0,
    apply: 0,
  })
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const currentTrack = processTracks[trackIndex]
  const currentStepIndex = stepIndexByTrack[currentTrack.id] ?? 0
  const currentStep = currentTrack.steps[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === currentTrack.steps.length - 1

  const updateStepIndex = (nextIndex: number) => {
    setStepIndexByTrack((prev) => ({
      ...prev,
      [currentTrack.id]: nextIndex,
    }))
  }

  return (
    <>
      <section className="border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex border border-[#cfdbec] bg-[#eef4fb] px-3 py-1 text-xs font-black tracking-[0.16em] text-[#21457e]">
              신청 절차
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">화면을 보면서 단계별로 그대로 따라가면 됩니다.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {processTracks.map((track, index) => {
              const isActive = index === trackIndex
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setTrackIndex(index)}
                  className={`px-4 py-3 text-sm font-black transition ${
                    isActive ? 'bg-[#21457e] text-white' : 'border border-[#cfdbec] bg-white text-[#21457e]'
                  }`}
                >
                  {track.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-3">
            {currentTrack.steps.map((step, index) => {
              const isActive = index === currentStepIndex
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => updateStepIndex(index)}
                  className={`block w-full border px-4 py-4 text-left shadow-[0_12px_24px_rgba(15,23,42,0.04)] transition ${
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
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="block w-full border border-[#dbe6f3] bg-white p-4 text-left shadow-[0_12px_24px_rgba(15,23,42,0.04)] transition hover:border-[#7aa7e6]"
            >
              <img src={currentStep.imageSrc} alt={currentStep.imageAlt} className="block w-full" />
              <p className="mt-3 text-right text-xs font-bold tracking-[0.12em] text-[#21457e]">이미지 클릭 시 크게 보기</p>
            </button>

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
                <div className="flex gap-2">
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

                {currentStep.ctaLabel && currentStep.ctaHref ? (
                  <a
                    href={currentStep.ctaHref}
                    target={currentStep.ctaHref.startsWith('http') ? '_blank' : undefined}
                    rel={currentStep.ctaHref.startsWith('http') ? 'noreferrer' : undefined}
                    className="border border-[#cfdbec] bg-[#eef4fb] px-4 py-3 text-sm font-bold text-[#21457e]"
                  >
                    {currentStep.ctaLabel}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxOpen && currentStep.imageSrc ? (
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

type RequirementLandingSectionsProps = {
  config: AppConfig
  policyData: PolicyData
}

function RequirementLandingSections({ config, policyData }: RequirementLandingSectionsProps) {
  return (
    <div className="mt-8 space-y-8">
      <section className="border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <div>
          <span className="inline-flex border border-[#cfdbec] bg-[#eef4fb] px-3 py-1 text-xs font-black tracking-[0.16em] text-[#21457e]">
            모집 안내
          </span>
          <div className="mt-4 border border-[#dbe6f3] bg-[#f7faff] px-5 py-5">
            <p className="text-xl font-black leading-8 text-slate-950 sm:text-2xl">
              2026년 스마트상점 기술보급사업 참여 소상공인 모집공고
            </p>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <article className="border border-[#dbe6f3] bg-white p-5 shadow-[0_12px_24px_rgba(15,23,42,0.04)]">
              <p className="text-sm font-black tracking-[0.14em] text-[#21457e]">목적</p>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-800 sm:text-base">
                (목적) 소비•유통환경의 비대면•디지털화에 따라 소상공인 사업장에 스마트기술 도입 지원을 통해 소상공인의 경쟁력 제고
              </p>
              <p className="mt-3 border-t border-[#e7edf5] pt-3 text-sm leading-6 text-slate-600">
                * 소상공인이 사업장 운영을 더 쉽고 효율적으로 할 수 있게 도와주는 배리어프리 키오스크, 서빙로봇, 사이니지 등 디지털전환 기술
              </p>
            </article>

            <article className="border border-[#dbe6f3] bg-white p-5 shadow-[0_12px_24px_rgba(15,23,42,0.04)]">
              <p className="text-sm font-black tracking-[0.14em] text-[#21457e]">지원대상</p>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-800 sm:text-base">
                (지원대상) 「소상공인기본법』 제2조에 따른 소상공인으로, 신청일 현재 정상적으로 영업 중인 점포
              </p>
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
                에서 소상공인확인서 발급 가능한 점포
              </p>
            </article>
          </div>

          <div className="mt-4 border border-[#dbe6f3] bg-white p-6 shadow-[0_14px_32px_rgba(15,23,42,0.05)] sm:p-8">
            <div className="space-y-5 text-base font-bold leading-8 text-slate-900 sm:text-[1.05rem]">
              <div>
                <p>모집내용.</p>
                <p>소상공인의 디지털 전환및 스마트기술 지원을 통한 경쟁력 제고를 위해 정부에서 스마트기술 보급을 지원합니다.</p>
              </div>
              <p>공급가액: 최대 60% 지원[ 500만원]</p>
              <p>모집기간: 2026년 3월 13일(금) 10:00 ~ 4월 1일(수) 17:00까지</p>
              <p>
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
          </div>
        </div>
      </section>

      <section className="border border-[#0f4d8b] bg-[linear-gradient(135deg,#0b4d87_0%,#063866_100%)] p-6 text-white shadow-[0_20px_50px_rgba(5,22,45,0.22)] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-3xl font-black tracking-tight sm:text-4xl">NEXO 전자칠판 스펙 안내</p>
            <p className="mt-2 text-sm font-semibold text-sky-100 sm:text-base">주요사양</p>
          </div>
          <div className="border border-[#5eb8ee] bg-white px-5 py-2 text-2xl font-black tracking-tight text-[#1783cc]">
            65&quot;&nbsp;&nbsp;75&quot;&nbsp;&nbsp;86&quot;
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="border border-[#1897e5] bg-[rgba(4,29,58,0.35)] p-5">
            <img src="/assets/requirements-2026/nexo-digital.png" alt="NEXO 전자칠판 이미지" className="block w-full" />
            <p className="mt-5 text-center text-4xl font-black tracking-tight text-white sm:text-5xl">16+256G</p>
            <p className="mx-auto mt-6 max-w-2xl text-center text-base font-semibold leading-9 text-sky-50 sm:px-8 sm:text-[1.08rem]">
              작년 스마트상점 전국 학원장님들이 가장 많이
              <br />
              선택해 주셨던 주식회사 넥소의 전자칠판이
              <br />
              2026년에도 소상공인 스마트상점
              <br />
              기술 공급기업에 선정되었습니다.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {specItems.map((item) => (
              <div
                key={item}
                className="flex min-h-[92px] items-center justify-center border border-[#1897e5] bg-[rgba(11,98,167,0.22)] px-4 py-4 text-center text-2xl font-semibold tracking-tight text-white"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SupportComparisonSection config={config} policyData={policyData} />

      <section className="border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fd_100%)] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <span className="inline-flex border border-[#cfdbec] bg-[#eef4fb] px-3 py-1 text-xs font-black tracking-[0.16em] text-[#21457e]">
          준비 서류
        </span>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">신청 전 미리 준비할 서류</h2>

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

              {group.extraLines ? (
                <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm font-semibold leading-6 text-slate-700">
                  {group.extraLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 grid gap-2">
                {group.links.map((link) => (
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

              {group.highlight ? (
                <p className="mt-5 border-t border-slate-200 pt-4 text-lg font-black text-[#ff2e8a]">{group.highlight}</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <article>
          <span className="inline-flex border border-[#cfdbec] bg-[#eef4fb] px-3 py-1 text-xs font-black tracking-[0.16em] text-[#21457e]">
            신청 조건
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">소상공인 기준과 신청 조건</h2>

          <div className="mt-5 border border-[#dbe6f3] bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.04)]">
            <img src="/assets/requirements-2026/eligibility-table.png" alt="소상공인 기준과 신청 조건 표" className="block w-full" />
          </div>

          <ul className="mt-5 grid gap-3">
            <li className="border border-[#dbe6f3] bg-white px-4 py-3 text-sm font-semibold text-slate-700">소기업이면서 상시근로자 5인 미만 기준을 먼저 확인합니다.</li>
            <li className="border border-[#dbe6f3] bg-white px-4 py-3 text-sm font-semibold text-slate-700">업종별 매출 기준과 기존 수혜 이력 여부를 함께 확인합니다.</li>
          </ul>
        </article>
      </section>

      <ProcessSliderSection />

    </div>
  )
}

export default RequirementLandingSections
