import type { AppConfig } from '../types/policy'

type FooterProps = {
  config: AppConfig
}

function Footer({ config }: FooterProps) {
  return (
    <footer className="mt-8 border-t border-slate-200 py-8 text-sm text-slate-600">
      <p className="font-semibold text-slate-800">NEXO | 대표번호 1600-6185</p>
      <p className="mt-2">본 페이지는 신청을 대행하지 않으며 안내 목적입니다.</p>
      <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:gap-4">
        <a href={config.official_url} target="_blank" rel="noreferrer" className="text-slate-700 underline underline-offset-4">
          공식 사이트
        </a>
        <a href={config.announce_url} target="_blank" rel="noreferrer" className="text-slate-700 underline underline-offset-4">
          공고/신청 페이지
        </a>
      </div>
    </footer>
  )
}

export default Footer
