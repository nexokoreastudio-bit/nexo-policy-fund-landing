import type { AppConfig } from '../types/policy'

type HeroProps = {
  config: AppConfig
  onOpenConsult: () => void
}

function Hero({ config: _config, onOpenConsult: _onOpenConsult }: HeroProps) {
  return (
    <section
      id="hero"
      className="mt-2 overflow-hidden border border-[#203562] bg-[radial-gradient(circle_at_top,#10265d_0%,#060d24_58%,#040812_100%)] shadow-[0_24px_70px_rgba(4,10,30,0.45)]"
    >
      <img src="/assets/landing/main_2.png" alt="2026 소상공인 스마트상점 지원사업 메인 배너" className="block w-full" />
    </section>
  )
}

export default Hero
