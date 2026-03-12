import GuidedStepViewer from '../components/GuidedStepViewer'
import { landingGuidedSteps } from '../constants/guidedSteps'

type LandingGuidedFlowSectionProps = {
  onOpenConsult: () => void
}

const summaryCards = [
  {
    title: '먼저 볼 것',
    description: '지원 대상 여부와 대표자 본인 신청 가능 여부부터 확인합니다.',
  },
  {
    title: '미리 준비할 것',
    description: '기본 사업자 정보, 확인서 발급 자료, 신청서에 넣을 활용 계획을 정리합니다.',
  },
  {
    title: '막히는 지점',
    description: '확인서 발급, 서류 누락, 최종 제출 여부 확인 단계에서 가장 자주 멈춥니다.',
  },
] as const

function LandingGuidedFlowSection({ onOpenConsult }: LandingGuidedFlowSectionProps) {
  return (
    <section id="journey" className="mt-8">
      <div className="rounded-[2rem] border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f3f7fc_100%)] p-6 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[#ccd9eb] bg-[#eef4fb] px-3 py-1 text-xs font-black tracking-[0.16em] text-[#244a86]">
              GUIDED FLOW
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">한눈에 보고 그대로 따라가는 신청 절차로 정리했습니다.</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600 sm:text-base">
              자격 확인부터 확인서 발급, 사업 신청, 진행상황 확인까지 한 번에 이어서 볼 수 있게 메인 플로우를 단계형 안내로 정리했습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenConsult}
            className="rounded-xl bg-[#244a86] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(36,74,134,0.18)]"
          >
            막히면 바로 상담
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {summaryCards.map((card) => (
            <article key={card.title} className="rounded-[1.5rem] border border-[#dbe5f2] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
              <h3 className="text-lg font-black text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <GuidedStepViewer steps={landingGuidedSteps} ariaLabel="메인 페이지 단계별 신청 안내" />
      </div>
    </section>
  )
}

export default LandingGuidedFlowSection
