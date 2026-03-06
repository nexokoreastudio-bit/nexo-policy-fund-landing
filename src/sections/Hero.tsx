import { useEffect, useState } from 'react'

type HeroProps = {
  policyOpen: boolean
  onOpenWaitlist: () => void
  onOpenConsult: () => void
}

function Hero({ policyOpen, onOpenWaitlist, onOpenConsult }: HeroProps) {
  const slides = ['/assets/hero/hero-slide-1.png', '/assets/hero/hero-slide-2.png', '/assets/hero/hero-slide-3.png']
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [slides.length])

  return (
    <section id="hero" className="mt-2 overflow-hidden border border-slate-200 bg-white shadow-sm">
      <div className="relative min-h-[460px] px-6 py-10 text-white sm:px-10 sm:py-12 lg:min-h-[520px] lg:py-16">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <img
              key={slide}
              src={slide}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                index === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.62),rgba(0,0,0,0.35)_42%,rgba(0,0,0,0.08))]" />
        <div className="relative z-10 max-w-2xl">
          <p className="inline-flex bg-white/20 px-3 py-1 text-xs font-bold tracking-wide">2026 스마트상점 전자칠판 가이드</p>
          <h1 className="mt-4 text-3xl font-black leading-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.65)] sm:text-5xl">
            내일은 더 쉽게,
            <br />
            도입은 더 가볍게
          </h1>
          <p className="mt-3 max-w-xl text-sm font-medium text-slate-100 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)] sm:text-base">
            스마트상점 정부지원으로 전자칠판 도입 비용을 줄이고, 확인서 발급부터 신청까지 한 번에 준비하세요.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {policyOpen ? (
              <a href="#calculator" className="bg-white px-5 py-2 text-sm font-black text-slate-900">
                자세히 보기
              </a>
            ) : (
              <button type="button" onClick={onOpenWaitlist} className="bg-white px-5 py-2 text-sm font-black text-slate-900">
                공고 알림 신청
              </button>
            )}
            <button
              type="button"
              onClick={onOpenConsult}
              className="border border-white/60 bg-white/10 px-5 py-2 text-sm font-black text-white"
            >
              상담 신청
            </button>
            <a href="#eligibility" className="border border-white/60 bg-white/10 px-5 py-2 text-sm font-black text-white">
              자격 확인
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <span key={`${slide}-dot`} className={`h-2 ${index === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/70'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
