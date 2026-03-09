function SmallBusinessCriteriaSection() {
  return (
    <section id="smallbiz-criteria" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-extrabold text-slate-900">소상공인 기준표 (공고 요약)</h2>
      <p className="mt-2 text-sm text-slate-600">2026 모집공고 참고5 기준 요약입니다. 최종 판단은 공고문 원문 기준으로 확인해 주세요.</p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full border-collapse text-left">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-4 py-3 text-sm">구분</th>
              <th className="px-4 py-3 text-sm">기준</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">상시근로자 기준</td>
              <td className="px-4 py-3 text-sm text-slate-700">
                광업·제조업·건설업·운수업: 10명 미만 / 그 외 업종: 5명 미만 (4대보험 가입자 기준)
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">교육 서비스업</td>
              <td className="px-4 py-3 text-sm text-slate-700">평균매출액 10억원 이하 + 상시근로자 5명 미만</td>
            </tr>
            <tr>
              <td className="bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">업종별 매출액 기준</td>
              <td className="px-4 py-3 text-sm text-slate-700">업종 코드별로 상이(공고문 참고5 “소상공인 확인 기준(매출액, 상시근로자)” 확인 필요)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default SmallBusinessCriteriaSection
