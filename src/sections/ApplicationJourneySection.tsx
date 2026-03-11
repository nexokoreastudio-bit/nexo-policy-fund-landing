import { GUIDE_TRANSITION_COPY } from '../constants/landing'
import { imageSlots, type ImageSlot } from '../constants/imageSlots'
import ImageSlotPlaceholder from '../components/ImageSlotPlaceholder'

const certificateSteps = [
  '소상공인 확인 가능 여부 확인',
  '필요 시 확인서 발급 또는 보완서류 준비',
  '우대지원 대상 증빙서류 확인',
  '대표자 명의 신청 준비 완료',
]

const smartStoreSteps = [
  '스마트상점 사이트 접속',
  '전자칠판 제품 선택',
  '신청 기본정보 입력',
  '필수 서류 업로드',
  '제출 후 선정 결과 확인',
]

function PlaceholderPanel({ slot }: { slot: ImageSlot }) {
  return (
    <ImageSlotPlaceholder
      label={slot.label}
      src={slot.src}
      alt={slot.alt}
      minHeightClassName="min-h-72 xl:min-h-[22rem]"
      note={slot.note}
      plannedSrc={slot.plannedSrc}
      sourceRef={slot.sourceRef}
    />
  )
}

function StepList({ steps, accentClass }: { steps: string[]; accentClass: string }) {
  return (
    <ol className="grid gap-3">
      {steps.map((step, index) => (
        <li key={step} className="flex gap-3 rounded-2xl border border-white/70 bg-white px-4 py-4 shadow-sm">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white ${accentClass}`}>
            {index + 1}
          </span>
          <p className="pt-2 text-sm font-semibold text-slate-800">{step}</p>
        </li>
      ))}
    </ol>
  )
}

export function RelatedSitesPanel() {
  return (
    <div className="mt-8 mb-6 rounded-[2rem] border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] p-5 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6">
      <h2 className="text-2xl font-black tracking-tight text-slate-950">관련 사이트와 문의처</h2>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <a
          href="https://sminfo.mss.go.kr/"
          target="_blank"
          rel="noreferrer"
          className="rounded-[1.25rem] border border-[#d9e6f7] bg-white px-4 py-4 transition hover:shadow-md"
        >
          <p className="text-sm font-black text-slate-900">소상공인 확인서 발급 사이트</p>
          <p className="mt-2 break-all text-sm font-semibold text-[#244a86]">https://sminfo.mss.go.kr/</p>
        </a>
        <a
          href="https://www.sbiz.or.kr/smst/index.do"
          target="_blank"
          rel="noreferrer"
          className="rounded-[1.25rem] border border-[#d9e6f7] bg-white px-4 py-4 transition hover:shadow-md"
        >
          <p className="text-sm font-black text-slate-900">스마트상점 신청 사이트</p>
          <p className="mt-2 break-all text-sm font-semibold text-[#244a86]">https://www.sbiz.or.kr/smst/index.do</p>
        </a>
      </div>
      <div className="mt-4 grid gap-5 rounded-[1.5rem] border border-[#d9e6f7] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fd_100%)] px-5 py-5 shadow-[0_18px_36px_rgba(15,23,42,0.06)] lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="flex h-full flex-col justify-center">
          <span className="inline-flex w-fit rounded-full border border-[#ccd9eb] bg-[#eef4fb] px-3 py-1 text-xs font-black tracking-[0.16em] text-[#244a86]">
            HELP DESK
          </span>
          <p className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">진행 중 막히면 지역별 문의처를 먼저 확인하세요.</p>
          <p className="mt-3 text-sm font-semibold text-slate-600 sm:text-base">
            지방중소벤처기업청 전화번호와 주소를 조회할 수 있는 페이지입니다. 지역마다 번호가 달라 바로 확인하는 편이 가장 빠릅니다.
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-[#dde5f0] bg-white px-4 py-3 text-sm font-semibold text-slate-700">
              지역별 전화번호 확인
            </div>
            <div className="rounded-xl border border-[#dde5f0] bg-white px-4 py-3 text-sm font-semibold text-slate-700">
              발급 문의처 바로 이동
            </div>
          </div>
          <a
            href="https://sminfo.mss.go.kr/cm/sv/CSV001R9.do"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#244a86] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(36,74,134,0.18)]"
          >
            문의처 확인하기
          </a>
        </div>
        <a
          href="https://sminfo.mss.go.kr/cm/sv/CSV001R9.do"
          target="_blank"
          rel="noreferrer"
          className="group relative block overflow-hidden rounded-[1.25rem] border border-[#d9e6f7] bg-white p-4 shadow-[0_18px_36px_rgba(15,23,42,0.06)]"
        >
          <img
            src="/assets/landing/info.png"
            alt="중소기업확인서 발급 절차 및 문의처 안내 이미지"
            className="block h-auto w-full rounded-lg transition duration-200 group-hover:scale-[1.01] group-hover:opacity-90"
          />
          <div className="pointer-events-none absolute inset-4 flex items-center justify-center rounded-lg bg-slate-950/0 transition duration-200 group-hover:bg-slate-950/18">
            <span className="rounded-full border border-white/60 bg-white/88 px-4 py-2 text-sm font-black text-slate-900 opacity-0 backdrop-blur-sm transition duration-200 group-hover:opacity-100">
              문의처로 이동
            </span>
          </div>
        </a>
      </div>
    </div>
  )
}

function ApplicationJourneySection() {
  return (
    <section id="journey" className="mt-8">
      <div className="rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-white">신청 전 자격 확인</h2>
            <p className="mt-3 text-sm text-slate-300">소상공인 확인 가능 여부와 우대지원 증빙을 먼저 확인하면 신청 단계에서 덜 막힙니다.</p>
            <div className="mt-6">
              <StepList steps={certificateSteps} accentClass="bg-amber-700" />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="/certificate-guide" className="rounded-xl bg-[#79f0ff] px-5 py-3 text-center text-sm font-bold text-[#04101f]">
                확인서 발급 가이드 보기
              </a>
              <a href="#lead" className="rounded-xl border border-[#79f0ff]/40 px-5 py-3 text-center text-sm font-bold text-white">
                자격 상담 신청
              </a>
            </div>
          </div>
          <PlaceholderPanel slot={imageSlots.landing.certificateJourney} />
        </div>
      </div>

      <div className="px-4 py-6 text-center">
        <p className="text-lg font-black text-white sm:text-xl">{GUIDE_TRANSITION_COPY}</p>
      </div>

      <div className="rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <PlaceholderPanel slot={imageSlots.landing.applyJourney} />
          <div>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-white">스마트상점 사업 신청</h2>
            <p className="mt-3 text-sm text-slate-300">대표자 본인 명의로 제품 선택, 정보 입력, 서류 업로드 순서로 온라인 신청을 진행합니다.</p>
            <div className="mt-6">
              <StepList steps={smartStoreSteps} accentClass="bg-sky-700" />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="/smartstore-apply" className="rounded-xl bg-[#ff8bf5] px-5 py-3 text-center text-sm font-bold text-[#1a0b24]">
                사업 신청 가이드 보기
              </a>
              <a href="#lead" className="rounded-xl border border-[#ff8bf5]/40 px-5 py-3 text-center text-sm font-bold text-white">
                신청 전 상담 신청
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApplicationJourneySection
