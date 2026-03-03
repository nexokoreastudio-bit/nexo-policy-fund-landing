# Cursor CLI Prompt (copy/paste)
# v2: 2026 정책 미공개 대응(가격/계산기 비노출 & 정책 공개 시 활성화)

You are a senior full-stack engineer + conversion-focused UX designer.
Build a production-ready landing page for NEXO electronic smartboard (전자칠판) policy-funding guide.
IMPORTANT: 2026 support policy is NOT 공개 yet, so do NOT show any prices, subsidy rates, caps, or calculator outputs as definitive.
Instead:
- Hide/disable pricing and subsidy calculator until admin toggles “policy_open=true”.
- Before policy opens, the page must focus on: eligibility pre-check (non-price), 신청 절차 안내, 준비서류 체크리스트, 리스크/주의사항, and lead capture (공지 받기/상담 신청).

Tech:
- Next.js 14 (App Router) + TypeScript + Tailwind.
- shadcn/ui components.
- Lead storage: /data/leads.json append-only via /app/api/lead/route.ts
- Events log: /data/events.log via /lib/track.ts

Policy gating (critical):
- Create /data/config.json with:
  {
    "policy_year": 2026,
    "policy_open": false,
    "official_url": "https://www.sbiz.or.kr/smst/index.do",
    "announce_url": "https://ols.semas.or.kr/ols/man/SMAN010M/page.do"
  }
- Create /lib/config.ts to load this JSON server-side (fs). Provide safe defaults if missing.
- UI behavior:
  - If policy_open=false:
    - Do NOT render price tables
    - Do NOT render subsidy calculator
    - Replace calculator section with “정책 공개 대기” content + CTA to “공지 받기” (lead form prefilled with tag=policy_waitlist)
  - If policy_open=true:
    - Render calculator and optional price table
    - Calculator inputs/logic read from /data/policy.json (not hardcoded)
- Create /data/policy.json template (empty placeholders) to be filled later:
  {
    "year": 2026,
    "updated_at": null,
    "support_types": [],
    "caps": {},
    "rates": {},
    "price_table": []
  }
- Provide an Admin-only dev shortcut:
  - If process.env.NEXO_POLICY_OPEN === "true", override config policy_open to true (for local testing)

UI / Wireframe (single page):
1) Sticky top bar
   - CTA: "1분 자격진단" (scroll)
   - CTA: if policy_open=false => "공지 받기" (open modal)
          if policy_open=true  => "지원금 계산기" (scroll)
   - CTA: "상담 신청" (open modal)

2) Hero
   - Headline: "2026 전자칠판 정책자금, 공고 나오면 가장 빠르게 안내합니다"
   - Sub: "신청 조건/절차/준비서류를 미리 준비해 두면 공고 즉시 신청 가능합니다."
   - Primary CTA:
     - policy_open=false => "공지 받기(알림 신청)"
     - policy_open=true  => "지원금 계산기"
   - Badges: "대리신청 불가", "VAT 별도(공고 기준)", "의무사용(공고 기준)"

3) Section A: 1분 자격진단 (non-price)
   - Wizard/stepper:
     Step: 정상영업 여부, 세금체납 여부, 과거 수혜 여부, 업종/근로자수(조건부 안내), 취약계층 해당여부(서류 준비 안내)
   - Output: 신청 가능/조건부/불가 + 이유
   - Include disclaimer: "최종 자격은 공단 시스템 확인 결과에 따릅니다."
   - Track: eligibility_start, eligibility_result

4) Section B:
   - If policy_open=false => “정책 공개 대기 패널”
     - Content:
       - "현재 2026년도 공고/지원금액/비율은 미공개 상태입니다."
       - "공고 공개 즉시: 지원금 계산기/예상 부담금/신청 링크 업데이트"
     - CTA buttons:
       - "공지 받기" (opens lead modal, tag=policy_waitlist)
       - "신청 절차 미리 보기" (scroll to timeline)
   - If policy_open=true => “지원금 계산기”
     - All calculator values must read from /data/policy.json (no hardcoding)
     - Show “updated_at” timestamp and “공고 기준” label.

5) Section C: 신청 절차 타임라인 (공고 기반 일반 흐름)
   - 신청 → 평가/선정 → (컨설팅) → 계약 → 자부담 납부 → (보증보험) → 설치 → 정산 → 의무사용/점검
   - Must clearly state: "대리신청 불가, 대표자 본인 신청"
   - CTA: "준비서류 체크리스트 보기"

6) Section D: 준비서류 체크리스트
   - 매장 사진(전면/내부), 대표자 연락처 정확히, (취약계층) 증빙서류, (선정 후) 보증보험 등
   - Provide “내 준비상태 저장” as a local-only checklist (localStorage)

7) Section E: 리스크/주의사항
   - Accordion:
     - VAT 별도(공고 기준)
     - 국비는 소상공인에게 입금되지 않을 수 있음(공고 기준)
     - 의무사용기간(공고 기준)
     - 부정행위 금지(페이백/리베이트/대리신청)
   - Keep language: “공고 기준”, “변동 가능”

8) Section F: FAQ (policy-open에 따라 답변 문구 분기)
   - If policy_open=false: "2026 공고 공개 후 확정 안내" 문구 포함
   - If policy_open=true: policy.json 값으로 답변에 숫자 노출 가능

9) Section G: Lead capture modal (two modes)
   - Mode 1: 공지 받기(정책 공개 알림)
     Fields: 이름, 연락처, 이메일(선택), 지역, 업종(선택), 관심 인치(선택), 개인정보 동의(필수)
     Hidden: inquiry_type="policy_waitlist"
   - Mode 2: 상담 신청
     Fields: 이름, 연락처, 사업장명, 지역, 설치환경, 문의내용, 개인정보 동의(필수)
     Hidden: inquiry_type="consult"
   - POST /api/lead stores {created_at, inquiry_type, formData}
   - Track: lead_submit, lead_success, lead_error

Footer:
- NEXO company info placeholders
- Disclaimer: "본 페이지는 신청을 대행하지 않으며 안내 목적입니다."
- Links: official_url, announce_url

Deliverables:
- All files created and app runs.
- README includes:
  - How to toggle policy_open (config.json or env)
  - How to fill /data/policy.json when 2026 policy is announced
  - How calculator reads policy.json
  - Where leads/events logs are stored

Start now and implement the full app.