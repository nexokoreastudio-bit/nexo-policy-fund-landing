import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { submitLead } from '../lib/lead'
import { track } from '../lib/track'
import { mergeAndStoreUtm, type UtmContext } from '../lib/utm'
import type { LeadRecord } from '../types/policy'

type LeadModalMode = 'policy_waitlist' | 'consult'

type LeadModalProps = {
  open: boolean
  mode: LeadModalMode
  onClose: () => void
  onSuccess: (mode: LeadModalMode) => void
}

function LeadModal({ open, mode, onClose, onSuccess }: LeadModalProps) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [region, setRegion] = useState('')
  const [interestInch, setInterestInch] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [supportType, setSupportType] = useState<'normal' | 'vulnerable'>('normal')
  const [message, setMessage] = useState('')
  const [agree, setAgree] = useState(false)
  const [utm, setUtm] = useState<UtmContext>({})

  useEffect(() => {
    if (!open) return
    setLoading(false)
    setUtm(mergeAndStoreUtm(window.location.search))
  }, [open, mode])

  if (!open) return null

  const isWaitlist = mode === 'policy_waitlist'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload: LeadRecord = {
      created_at: new Date().toISOString(),
      inquiry_type: mode,
      formData: isWaitlist
        ? {
            name,
            phone,
            email,
            region,
            interestInch,
            tag: 'policy_waitlist',
            agree,
            ...utm,
          }
        : {
            name,
            phone,
            businessName,
            region,
            support_type: supportType === 'normal' ? '일반 소상공인(50%)' : '우대지원 대상(60%)',
            message,
            agree,
            ...utm,
          },
    }

    track('lead_submit', { mode })
    setLoading(true)

    try {
      await submitLead(payload)
      track('lead_success', { mode })
      onSuccess(mode)
      onClose()
    } catch {
      track('lead_error', { mode })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center bg-slate-900/60 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <h3 className="text-2xl font-black text-slate-900">{isWaitlist ? '공지 받기 (정책 공개 알림)' : '상담 신청'}</h3>
        {!isWaitlist ? (
          <p className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
            정부 신청 접수 폼이 아니라 신청 전환을 위한 사전 상담 폼입니다.
          </p>
        ) : null}
        <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
          <input required value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="이름" />
          <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="연락처" />

          {isWaitlist ? (
            <>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="이메일(선택)" />
              <input required value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="지역" />
              <select value={interestInch} onChange={(e) => setInterestInch(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option value="">관심 인치(선택)</option>
                <option value="65">65인치</option>
                <option value="75">75인치</option>
                <option value="86">86인치</option>
              </select>
            </>
          ) : (
            <>
              <input required value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="사업장명" />
              <input required value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="지역" />
              <select
                value={supportType}
                onChange={(e) => setSupportType(e.target.value as 'normal' | 'vulnerable')}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="normal">일반 소상공인(50%)</option>
                <option value="vulnerable">우대지원 대상(60%)</option>
              </select>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-24 rounded-lg border border-slate-300 px-3 py-2 text-sm sm:col-span-2"
                placeholder="현재 어디에서 막히는지 적어주세요. 예: 확인서 발급, 신청 시작, 서류 업로드"
              />
            </>
          )}

          <div className="sm:col-span-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-500">
            유입 추적: {utm.utm_source ?? '-'} / {utm.utm_medium ?? '-'} / {utm.utm_campaign ?? '-'} / {utm.utm_content ?? '-'}
          </div>

          <label className="sm:col-span-2 flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} required />
            개인정보 수집·이용 동의 (필수)
          </label>

          <div className="sm:col-span-2 flex gap-2">
            <button disabled={loading} type="submit" className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">
              {loading ? '전송 중...' : isWaitlist ? '공지 받기 신청' : '상담 신청 보내기'}
            </button>
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700">
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LeadModal
