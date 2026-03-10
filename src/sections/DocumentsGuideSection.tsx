function DocumentsGuideSection() {
  return (
    <section
      id="documents-guide"
      className="mt-8 rounded-[2rem] border border-[#4b71c6] bg-[linear-gradient(135deg,rgba(18,34,78,0.98)_0%,rgba(22,42,96,0.95)_100%)] p-6 text-white shadow-[0_20px_60px_rgba(4,10,30,0.38)] ring-1 ring-white/5 sm:p-8"
    >
      <h2 className="text-2xl font-extrabold text-white">준비서류 빠른 확인</h2>
      <p className="mt-2 text-sm text-slate-300">신청 전에 어떤 서류를 준비해야 하는지부터 구분하면 접수 속도가 빨라집니다.</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <article className="rounded-[1.5rem] border border-[#284f95] bg-[linear-gradient(180deg,rgba(13,29,69,0.95)_0%,rgba(7,17,41,0.95)_100%)] p-5">
          <h3 className="text-lg font-black text-white">일반 소상공인 (50%)</h3>
          <ul className="mt-3 grid gap-2 text-sm text-slate-200">
            <li>• 신청서 및 자가진단표 작성</li>
            <li>• 매장 사진 업로드</li>
            <li>• 개인정보 수집·이용·제공 동의</li>
            <li>• 마이데이터 제공 동의</li>
            <li>• 대표자 명의로 홈페이지 회원가입 및 신청</li>
          </ul>
        </article>

        <article className="rounded-[1.5rem] border border-[#5a418c] bg-[linear-gradient(180deg,rgba(31,24,64,0.98)_0%,rgba(14,15,38,0.96)_100%)] p-5">
          <h3 className="text-lg font-black text-[#ff8bf5]">우대지원 대상 (60%)</h3>
          <ul className="mt-3 grid gap-2 text-sm text-slate-200">
            <li>• 일반 소상공인 서류 일체</li>
            <li>• 장애인 사업주: 장애인기업 확인서 또는 장애인증명서</li>
            <li>• 간이과세자: 사업자등록증명원</li>
            <li>• 1인 자영업자: 건강보험자격득실확인서</li>
            <li>• 해당 증빙서류 제출 시 우대지원 검토</li>
          </ul>
        </article>
      </div>

      <p className="mt-4 rounded-xl border border-[#284f95] bg-[rgba(8,17,40,0.7)] px-3 py-2 text-xs font-semibold text-slate-300">
        실제 필요서류는 공고문 기준으로 변동될 수 있으므로 최종 접수 전 반드시 재확인해 주세요.
      </p>
      <p className="mt-2 text-xs font-semibold text-slate-400">공고문 기준으로 보완서류 요청이 있을 수 있으므로 신청 후 안내도 반드시 확인해 주세요.</p>
    </section>
  )
}

export default DocumentsGuideSection
