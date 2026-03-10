import type { AppConfig } from '../types/policy'

type FooterProps = {
  config: AppConfig
}

function Footer({ config }: FooterProps) {
  return (
    <footer className="mt-8 rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] px-6 py-8 text-sm text-slate-300 shadow-[0_20px_60px_rgba(4,10,30,0.35)] ring-1 ring-white/5 sm:px-8">
      <p className="font-semibold text-white">NEXO | 전화 032-569-5771~2 / 010-9981-5174</p>
      <p className="mt-1">이메일: nexokorea@gmail.com</p>
      <p className="mt-1">주소: 인천광역시 서구 보듬로158 검단지식산업센터 블루텍제조동 527호, 530호</p>
      <p className="mt-2">본 페이지는 신청을 대행하지 않으며 안내 목적입니다.</p>
      <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:gap-4">
        <a href={config.official_url} target="_blank" rel="noreferrer" className="text-[#79f0ff] underline underline-offset-4">
          공식 사이트
        </a>
        <a href={config.announce_url} target="_blank" rel="noreferrer" className="text-[#ff8bf5] underline underline-offset-4">
          공고/신청 페이지
        </a>
      </div>
    </footer>
  )
}

export default Footer
