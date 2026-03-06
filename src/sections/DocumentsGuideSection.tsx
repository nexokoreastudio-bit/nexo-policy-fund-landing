function DocumentsGuideSection() {
  return (
    <section id="documents-guide" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-extrabold text-slate-900">일반/특별 지원 대상 준비서류 안내</h2>
      <p className="mt-2 text-sm text-slate-600">신청 전 아래 서류를 먼저 준비하면 접수 속도를 크게 줄일 수 있습니다.</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-black text-slate-900">일반 소상공인 (50%)</h3>
          <ul className="mt-3 grid gap-2 text-sm text-slate-700">
            <li>• 사업자등록증</li>
            <li>• 소상공인 확인서</li>
            <li>• 대표자 연락처 및 기본 사업장 정보</li>
            <li>• 설치 장소 확인 자료(매장 정보)</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-black text-slate-900">특별 지원 대상/1인점포 (60%)</h3>
          <ul className="mt-3 grid gap-2 text-sm text-slate-700">
            <li>• 일반 소상공인 서류 일체</li>
            <li>• 간이과세자 증빙(해당 시)</li>
            <li>• 1인 사업장 증빙(해당 시)</li>
            <li>• 장애인/장애인기업 증빙(해당 시)</li>
          </ul>
        </article>
      </div>

      <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
        실제 필요서류는 공고문 기준으로 변동될 수 있으므로 최종 접수 전 반드시 재확인해 주세요.
      </p>
    </section>
  )
}

export default DocumentsGuideSection
