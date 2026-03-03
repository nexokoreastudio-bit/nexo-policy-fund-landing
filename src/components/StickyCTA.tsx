function StickyCTA() {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-3">
        <a
          href="#alert"
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          일정 알림 받기
        </a>
        <a
          href="#consult"
          className="rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          무료 상담 요청
        </a>
      </div>
    </aside>
  )
}

export default StickyCTA
