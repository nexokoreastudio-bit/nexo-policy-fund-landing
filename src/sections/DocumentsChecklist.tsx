import { useEffect, useState } from 'react'

const checklistItems = [
  '매장 전면/내부 사진',
  '우대지원 증빙(간이과세자/1인 자영업자/장애인 사업주)',
  '대표자 연락처(문자/이메일 정확히)',
  '(선정 후) 지급보증보험',
]

function DocumentsChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nexo_doc_checklist')
      if (saved) {
        setChecked(JSON.parse(saved) as Record<string, boolean>)
      }
    } catch {
      // ignore
    }
  }, [])

  const toggle = (item: string, value: boolean) => {
    const next = { ...checked, [item]: value }
    setChecked(next)
    localStorage.setItem('nexo_doc_checklist', JSON.stringify(next))
  }

  return (
    <section id="documents" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-extrabold text-slate-900">준비서류 체크리스트</h2>
      <p className="mt-2 text-sm text-slate-600">우대지원 증빙서류는 신청 전에 최신본으로 준비해 두는 편이 안전합니다.</p>
      <ul className="mt-4 space-y-2">
        {checklistItems.map((item) => (
          <li key={item} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={Boolean(checked[item])} onChange={(event) => toggle(item, event.target.checked)} />
              {item}
            </label>
            <span className="text-xs text-slate-400">준비 여부 체크</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm font-semibold text-sky-700">내 준비상태 저장: 브라우저 로컬 저장소에 저장됩니다.</p>
    </section>
  )
}

export default DocumentsChecklist
