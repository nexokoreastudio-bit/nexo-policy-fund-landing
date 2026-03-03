type NoticeModalProps = {
  open: boolean
  onClose: () => void
}

function NoticeModal({ open, onClose }: NoticeModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 px-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
        <h3 className="text-xl font-black text-slate-900">주요 주의사항</h3>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>• 대리신청은 불가하며 대표자 본인 신청이 원칙입니다.</li>
          <li>• VAT는 소상공인 부담입니다.</li>
          <li>• 의무사용 기간 내 임의 변경 시 제한이 발생할 수 있습니다.</li>
        </ul>
        <button type="button" onClick={onClose} className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">
          확인
        </button>
      </div>
    </div>
  )
}

export default NoticeModal
