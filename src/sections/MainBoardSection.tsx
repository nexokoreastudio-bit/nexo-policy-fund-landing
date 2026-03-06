import { useEffect, useState } from 'react'

type MainBoardSectionProps = {
  policyOpen: boolean
  onOpenWaitlist: () => void
}

const quickMenus = [
  { label: '지원금 계산', href: '/#calculator' },
  { label: '확인서 발급', href: '/certificate-guide' },
  { label: '스마트상점 신청', href: '/smartstore-apply' },
  { label: '전자칠판 비교', href: '/display-compare' },
] as const

const popupItems = [
  {
    title: '2026 스마트상점 기술보급사업',
    desc: '공고 일정과 지원요건을 먼저 확인하세요',
    href: '/smartstore-apply',
    label: '사업 신청 흐름 보기',
    theme: 'from-blue-500 via-sky-500 to-cyan-400',
  },
  {
    title: '소상공인 확인서 발급 가이드',
    desc: '일반/창업 트랙별 절차를 이미지로 빠르게 확인',
    href: '/certificate-guide',
    label: '확인서 발급 방법 보기',
    theme: 'from-pink-500 via-rose-400 to-orange-300',
  },
  {
    title: '전자칠판 비교 리포트',
    desc: '가격·스펙·운영안정성 비교로 선택 기준 정리',
    href: '/display-compare',
    label: '비교 페이지 바로가기',
    theme: 'from-indigo-600 via-blue-600 to-sky-500',
  },
] as const

function MainBoardSection({ policyOpen, onOpenWaitlist }: MainBoardSectionProps) {
  const [activePopup, setActivePopup] = useState(0)
  const popupCount = popupItems.length

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePopup((prev) => (prev + 1) % popupCount)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [popupCount])

  const goPrev = () => setActivePopup((prev) => (prev - 1 + popupCount) % popupCount)
  const goNext = () => setActivePopup((prev) => (prev + 1) % popupCount)

  return (
    <section className="mt-6 space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-slate-900">사업신청</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">신청 상태 안내</span>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            {policyOpen ? (
              <>
                <p className="text-sm font-semibold text-slate-700">현재 신청 가능한 지원금 계산 및 신청 준비를 진행할 수 있습니다.</p>
                <p className="mt-2 text-xs text-slate-500">공고/요건은 변동될 수 있으므로 신청 전 최신 공지를 확인해 주세요.</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <a href="#calculator" className="rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white">
                    지원금 계산기 바로가기
                  </a>
                  <a href="/smartstore-apply" className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-sm font-bold text-slate-700">
                    스마트상점 신청 절차
                  </a>
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center sm:px-6">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-lg font-black text-white">!</div>
                <p className="mt-4 text-3xl font-black text-slate-900">현재 진행하는 사업공고가 없습니다.</p>
                <p className="mt-3 text-lg font-semibold text-slate-600">보다 나은 서비스 제공을 위해 준비중에 있습니다.</p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                  <button type="button" onClick={onOpenWaitlist} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">
                    공고 즉시 알림 신청
                  </button>
                  <a href="/smartstore-apply" className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-sm font-bold text-slate-700">
                    스마트상점 신청 절차
                  </a>
                </div>
              </div>
            )}
          </div>
          {!policyOpen ? null : (
            <div className="mt-3 text-xs font-semibold text-slate-500">
              공고 미진행 시에는 대기 안내로 자동 전환됩니다.
            </div>
          )}
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-slate-900">POPUPZONE</h2>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
              <span className="text-xs font-black text-blue-600">{String(activePopup + 1).padStart(2, '0')}</span>
              <span className="text-xs font-bold text-slate-500">/ {String(popupCount).padStart(2, '0')}</span>
              <button type="button" onClick={goPrev} className="ml-1 rounded-full px-1 text-slate-700" aria-label="이전 팝업">
                ‹
              </button>
              <button type="button" onClick={goNext} className="rounded-full px-1 text-slate-700" aria-label="다음 팝업">
                ›
              </button>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-200">
              {popupItems.map((item, index) => (
                <a
                  key={item.title}
                  href={item.href}
                  className={`absolute inset-0 flex h-full w-full flex-col justify-between bg-gradient-to-br p-5 text-white transition-opacity duration-500 ${
                    item.theme
                  } ${index === activePopup ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                >
                  <div>
                    <p className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold">NEXO POPUP</p>
                    <h3 className="mt-3 text-2xl font-black leading-tight">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-white/90">{item.desc}</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="rounded-lg bg-white/90 px-3 py-2 text-xs font-black text-slate-900">{item.label}</span>
                    <div className="flex items-center gap-1.5">
                      {popupItems.map((dot, dotIndex) => (
                        <span
                          key={`${dot.title}-dot`}
                          className={`h-1.5 rounded-full ${dotIndex === activePopup ? 'w-5 bg-white' : 'w-1.5 bg-white/70'}`}
                        />
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </article>
      </div>

      <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {quickMenus.map((menu) => (
            <a
              key={menu.label}
              href={menu.href}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-white"
            >
              <span>{menu.label}</span>
              <span aria-hidden className="text-slate-400">
                +
              </span>
            </a>
          ))}
        </div>
      </article>
    </section>
  )
}

export default MainBoardSection
