type ToastProps = {
  message: string
  onClose: () => void
}

function Toast({ message, onClose }: ToastProps) {
  return (
    <div className="fixed right-4 top-4 z-[70] w-[min(92vw,420px)] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
      <p className="text-sm font-semibold text-slate-900">{message}</p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700">
          닫기
        </button>
      </div>
    </div>
  )
}

export default Toast
