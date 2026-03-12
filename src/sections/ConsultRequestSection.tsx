import { useEffect, useState, type FormEvent } from 'react'
import { submitLead } from '../lib/lead'
import { mergeAndStoreUtm, type UtmContext } from '../lib/utm'
import type { LeadRecord } from '../types/policy'

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: {
          address: string
          roadAddress: string
          jibunAddress: string
          zonecode: string
          sido: string
          sigungu: string
          bname: string
          buildingName: string
          apartment: 'Y' | 'N'
        }) => void
      }) => {
        open: () => void
      }
    }
  }
}

function loadDaumPostcodeScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.daum?.Postcode) {
      resolve()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-daum-postcode="true"]')
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('postcode script load failed')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.async = true
    script.dataset.daumPostcode = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('postcode script load failed'))
    document.body.appendChild(script)
  })
}

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length < 4) return digits
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

function ConsultRequestSection() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerPhone, setOwnerPhone] = useState('')
  const [managerName, setManagerName] = useState('')
  const [managerPhone, setManagerPhone] = useState('')
  const [sameAsOwner, setSameAsOwner] = useState(false)
  const [address, setAddress] = useState('')
  const [addressDetail, setAddressDetail] = useState('')
  const [consultTime, setConsultTime] = useState('11시~13시')
  const [supportType, setSupportType] = useState<'normal' | 'vulnerable'>('normal')
  const [message, setMessage] = useState('')
  const [agree, setAgree] = useState(false)
  const [utm, setUtm] = useState<UtmContext>({})

  useEffect(() => {
    setUtm(mergeAndStoreUtm(window.location.search))
  }, [])

  useEffect(() => {
    if (!sameAsOwner) return
    setManagerName(ownerName)
    setManagerPhone(ownerPhone)
  }, [sameAsOwner, ownerName, ownerPhone])

  const openAddressSearch = async () => {
    setError('')

    try {
      await loadDaumPostcodeScript()
      new window.daum!.Postcode({
        oncomplete: (data) => {
          const mainAddress = data.roadAddress || data.address || data.jibunAddress
          setAddress(mainAddress)
        },
      }).open()
    } catch {
      setError('주소 검색을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const payload: LeadRecord = {
      created_at: new Date().toISOString(),
      inquiry_type: 'consult',
      formData: {
        name: ownerName,
        phone: ownerPhone,
        businessName,
        manager_name: managerName,
        manager_phone: managerPhone,
        address,
        address_detail: addressDetail,
        region: address,
        consult_time: consultTime,
        support_type: supportType === 'normal' ? '일반지원대상(50%)' : '자부담완화 대상(60%)',
        message,
        agree,
        ...utm,
      },
    }

    try {
      await submitLead(payload)
      setSuccess(true)
      setBusinessName('')
      setOwnerName('')
      setOwnerPhone('')
      setManagerName('')
      setManagerPhone('')
      setSameAsOwner(false)
      setAddress('')
      setAddressDetail('')
      setConsultTime('11시~13시')
      setSupportType('normal')
      setMessage('')
      setAgree(false)
    } catch {
      setError('상담 신청 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="consult-form"
      className="scroll-mt-24 border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8"
    >
      <div className="text-center">
        <span className="inline-flex border border-[#cfdbec] bg-[#eef4fb] px-3 py-2 text-xs font-black tracking-[0.14em] text-[#21457e] sm:px-4 sm:text-base">
          상담 신청
        </span>
        <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">신청 전 궁금한 점이 있으면 상담 신청을 남겨주세요</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 sm:text-lg">
          준비서류, 신청 자격, 설치 일정, 자부담 관련 문의를 순차적으로 안내해드립니다.
        </p>
      </div>

      <form className="mx-auto mt-6 max-w-5xl space-y-4 sm:mt-8 sm:space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-black text-[#21457e]">상호 (필수)</span>
            <input
              required
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              className="border border-[#cfd8e6] bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none transition focus:border-[#21457e]"
              placeholder="상호를 입력해 주세요"
            />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-4 border border-[#dbe6f3] bg-white p-4 sm:space-y-5 sm:p-5">
            <p className="text-lg font-black text-slate-950">대표자 정보</p>

            <label className="grid gap-2">
              <span className="text-sm font-black text-[#21457e]">대표자 성명 (필수)</span>
              <input
                required
                value={ownerName}
                onChange={(event) => setOwnerName(event.target.value)}
                className="border border-[#cfd8e6] bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none transition focus:border-[#21457e]"
                placeholder="대표자 성명을 입력해 주세요"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-black text-[#21457e]">대표자 연락처 (필수)</span>
              <input
                required
                value={ownerPhone}
                onChange={(event) => setOwnerPhone(formatPhoneNumber(event.target.value))}
                className="border border-[#cfd8e6] bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none transition focus:border-[#21457e]"
                placeholder="010-0000-0000"
              />
            </label>
          </div>

          <div className="space-y-4 border border-[#dbe6f3] bg-white p-4 sm:space-y-5 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg font-black text-slate-950">담당자 정보</p>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={sameAsOwner}
                  onChange={(event) => {
                    const checked = event.target.checked
                    setSameAsOwner(checked)
                    if (checked) {
                      setManagerName(ownerName)
                      setManagerPhone(ownerPhone)
                    }
                  }}
                />
                대표자와 동일
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-black text-[#21457e]">담당자 성명 (필수)</span>
              <input
                required
                value={managerName}
                onChange={(event) => setManagerName(event.target.value)}
                className="border border-[#cfd8e6] bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none transition focus:border-[#21457e] disabled:bg-slate-50"
                placeholder="담당자 성명을 입력해 주세요"
                disabled={sameAsOwner}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-black text-[#21457e]">담당자 연락처 (필수)</span>
              <input
                required
                value={managerPhone}
                onChange={(event) => setManagerPhone(formatPhoneNumber(event.target.value))}
                className="border border-[#cfd8e6] bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none transition focus:border-[#21457e] disabled:bg-slate-50"
                placeholder="010-0000-0000"
                disabled={sameAsOwner}
              />
            </label>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-black text-[#21457e]">지원 유형 (필수)</span>
            <select
              value={supportType}
              onChange={(event) => setSupportType(event.target.value as 'normal' | 'vulnerable')}
              className="border border-[#cfd8e6] bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none transition focus:border-[#21457e]"
            >
              <option value="normal">일반지원대상(50%)</option>
              <option value="vulnerable">자부담완화 대상(60%)</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <label className="grid gap-2">
            <span className="text-sm font-black text-[#21457e]">주소 (선택)</span>
            <input
              value={address}
              readOnly
              className="border border-[#cfd8e6] bg-[#f8fbff] px-4 py-3 text-base font-semibold text-slate-900 outline-none"
              placeholder="주소 검색 버튼으로 주소를 입력해 주세요"
            />
          </label>
          <div className="grid gap-2">
            <span className="hidden text-sm font-black text-transparent md:block">주소 검색</span>
            <button
              type="button"
              onClick={openAddressSearch}
              className="w-full border border-[#21457e] bg-[#21457e] px-5 py-3 text-base font-black text-white transition hover:bg-[#183766] md:w-auto"
            >
              주소 검색
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_18rem] md:gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-black text-[#21457e]">상세 주소 (선택)</span>
            <input
              value={addressDetail}
              onChange={(event) => setAddressDetail(event.target.value)}
              className="border border-[#cfd8e6] bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none transition focus:border-[#21457e]"
              placeholder="상세 주소를 입력해 주세요"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-black text-[#21457e]">상담가능 시간 (필수)</span>
            <select
              value={consultTime}
              onChange={(event) => setConsultTime(event.target.value)}
              className="border border-[#cfd8e6] bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none transition focus:border-[#21457e]"
            >
              <option>11시~13시</option>
              <option>13시~15시</option>
              <option>15시~18시</option>
            </select>
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-black text-[#21457e]">추가 문의 내용 (선택)</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-h-[8rem] border border-[#cfd8e6] bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none transition focus:border-[#21457e]"
            placeholder="현재 궁금한 점이나 진행 상황을 입력해 주세요"
          />
        </label>

        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" checked={agree} onChange={(event) => setAgree(event.target.checked)} required />
          개인정보 수집·이용 동의 (필수)
        </label>

        {success ? (
          <p className="border border-[#b7e4c7] bg-[#f3fff6] px-4 py-3 text-sm font-black text-[#2b8a3e]">
            상담 신청이 접수되었습니다. 기존 연동 경로로 순차 확인됩니다.
          </p>
        ) : null}

        {error ? <p className="border border-[#ffc9c9] bg-[#fff5f5] px-4 py-3 text-sm font-black text-[#c92a2a]">{error}</p> : null}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-[#21457e] bg-[#21457e] px-6 py-4 text-lg font-black text-white transition hover:bg-[#183766] disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[16rem] sm:w-auto"
          >
            {loading ? '전송 중...' : '상담신청 보내기'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default ConsultRequestSection
