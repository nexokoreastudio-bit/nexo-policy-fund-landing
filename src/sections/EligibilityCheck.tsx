import { useMemo, useState } from 'react'
import { evaluateEligibility, type EligibilityInput } from '../lib/eligibility'
import { track } from '../lib/track'

function EligibilityCheck() {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(1)
  const [data, setData] = useState<EligibilityInput>({
    businessStatus: 'active',
    taxDelinquent: 'no',
    pastSupport: 'no',
    industry: '',
    employees: 1,
    vulnerable: {
      simpleTaxpayer: false,
      onePersonBusiness: false,
      disabledBusiness: false,
    },
    docReady: false,
  })
  const [showResult, setShowResult] = useState(false)

  const result = useMemo(() => evaluateEligibility(data), [data])

  const stepTitle = ['사업 운영 상태', '세금체납 여부', '과거 수혜 여부', '업종/근로자수', '취약계층/증빙 준비'][step - 1]

  const nextStep = () => {
    if (!started) {
      track('eligibility_start')
      setStarted(true)
    }
    track('eligibility_step_completed', { step })
    setStep((prev) => Math.min(5, prev + 1))
  }

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1))
  }

  const statusClasses =
    result.status === 'eligible'
      ? { box: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700' }
      : result.status === 'conditional'
        ? { box: 'bg-amber-50 border-amber-200', text: 'text-amber-700' }
        : { box: 'bg-rose-50 border-rose-200', text: 'text-rose-700' }

  return (
    <section id="eligibility" className="mt-8 rounded-3xl border-2 border-sky-300 bg-gradient-to-b from-sky-50 to-white p-6 shadow-lg sm:p-8">
      <h2 className="text-2xl font-extrabold text-slate-900">1분 자격진단</h2>
      <p className="mt-2 text-sm text-slate-600">부적합 신청을 줄이고, 필요한 준비를 빠르게 확인할 수 있습니다.</p>
      <p className="mt-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-800">
        교육 서비스업 소상공인 기준: 평균매출액 10억원 이하, 상시근로자 5명 미만
      </p>

      <div className="mt-5 rounded-2xl border-2 border-sky-200 bg-white p-5">
        <p className="text-sm font-bold text-sky-700">Step {step} / 5</p>
        <h3 className="mt-1 text-lg font-black text-slate-900">{stepTitle}</h3>

        <div className="mt-4 grid gap-3">
          {step === 1 ? (
            <select
              value={data.businessStatus}
              onChange={(event) => setData((prev) => ({ ...prev, businessStatus: event.target.value as EligibilityInput['businessStatus'] }))}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="active">정상영업</option>
              <option value="closed">휴폐업</option>
            </select>
          ) : null}

          {step === 2 ? (
            <select
              value={data.taxDelinquent}
              onChange={(event) => setData((prev) => ({ ...prev, taxDelinquent: event.target.value as EligibilityInput['taxDelinquent'] }))}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="no">체납 없음</option>
              <option value="yes">체납 있음</option>
            </select>
          ) : null}

          {step === 3 ? (
            <select
              value={data.pastSupport}
              onChange={(event) => setData((prev) => ({ ...prev, pastSupport: event.target.value as EligibilityInput['pastSupport'] }))}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="no">과거 수혜 없음</option>
              <option value="yes">과거 수혜 있음</option>
              <option value="unknown">모름</option>
            </select>
          ) : null}

          {step === 4 ? (
            <>
              <select
                value={data.industry}
                onChange={(event) => setData((prev) => ({ ...prev, industry: event.target.value as EligibilityInput['industry'] }))}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">업종 선택</option>
                <option value="food">음식점</option>
                <option value="retail">도소매</option>
                <option value="education">교육서비스</option>
                <option value="service">일반서비스</option>
                <option value="manufacturing">제조업</option>
                <option value="other">기타</option>
              </select>
              <input
                type="number"
                min={0}
                value={data.employees}
                onChange={(event) => setData((prev) => ({ ...prev, employees: Number(event.target.value) }))}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="상시근로자 수"
              />
              <input
                type="number"
                min={0}
                value={data.revenue ?? ''}
                onChange={(event) =>
                  setData((prev) => ({ ...prev, revenue: event.target.value ? Number(event.target.value) : undefined }))
                }
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="연매출(선택)"
              />
            </>
          ) : null}

          {step === 5 ? (
            <>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={data.vulnerable.simpleTaxpayer}
                  onChange={(event) =>
                    setData((prev) => ({ ...prev, vulnerable: { ...prev.vulnerable, simpleTaxpayer: event.target.checked } }))
                  }
                />
                간이과세자
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={data.vulnerable.onePersonBusiness}
                  onChange={(event) =>
                    setData((prev) => ({ ...prev, vulnerable: { ...prev.vulnerable, onePersonBusiness: event.target.checked } }))
                  }
                />
                1인 사업장
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={data.vulnerable.disabledBusiness}
                  onChange={(event) =>
                    setData((prev) => ({ ...prev, vulnerable: { ...prev.vulnerable, disabledBusiness: event.target.checked } }))
                  }
                />
                장애인(기업)
              </label>
              <label className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={data.docReady}
                  onChange={(event) => setData((prev) => ({ ...prev, docReady: event.target.checked }))}
                />
                증빙서류 준비 가능
              </label>
            </>
          ) : null}
        </div>

        <div className="mt-5 flex gap-2">
          <button type="button" onClick={prevStep} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
            이전
          </button>
          {step < 5 ? (
            <button type="button" onClick={nextStep} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              다음
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setShowResult(true)
                track('eligibility_result', { status: result.status })
              }}
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white"
            >
              진단 결과 확인
            </button>
          )}
        </div>
      </div>

      {showResult ? (
        <div className={`mt-5 rounded-2xl border p-5 ${statusClasses.box}`}>
          <p className={`text-sm font-bold ${statusClasses.text}`}>
            {result.status === 'eligible' ? '신청 가능' : result.status === 'conditional' ? '조건부 가능' : '신청 불가'}
          </p>
          <h3 className="mt-1 text-xl font-black text-slate-900">{result.title}</h3>
          <ul className="mt-3 grid gap-2">
            {result.reasons.map((reason) => (
              <li key={reason} className="rounded-lg bg-white px-3 py-2 text-sm text-slate-700">
                • {reason}
              </li>
            ))}
          </ul>
          <ul className="mt-3 grid gap-2">
            {result.actions.map((action) => (
              <li key={action} className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                {action}
              </li>
            ))}
          </ul>
          {result.status === 'ineligible' ? (
            <button type="button" className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              문의하기
            </button>
          ) : null}
        </div>
      ) : null}

      <p className="mt-4 text-xs text-slate-500">최종 자격 판단은 공단 기준 및 시스템 확인 결과에 따릅니다.</p>
    </section>
  )
}

export default EligibilityCheck
