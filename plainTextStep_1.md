# Cursor CLI Prompt (copy/paste)

You are a senior full-stack engineer + conversion-focused UX designer.
Build a production-ready landing page for NEXO electronic smartboard (전자칠판) 신청 가이드 for 2025 Smart Store (스마트상점 기술보급사업) applicants.

Goal:
- Maximize conversion to 상담 신청/문의 (lead capture)
- Reduce customer confusion and unqualified leads by adding an eligibility pre-check + subsidy calculator + mandatory policy notices.
- Provide a clear step-by-step application guide based on official policy flow.

Tech requirements:
- Use Next.js 14 (App Router) + TypeScript + Tailwind CSS.
- Use shadcn/ui components (Button, Card, Tabs, Accordion, Input, Select, Checkbox, Dialog, Badge, Separator, Toast).
- No external DB required; store leads in a local JSON file under /data/leads.json for now (append-only). Provide a switchable adapter interface so we can later connect Google Sheets or CRM API.
- Include basic analytics events via a simple abstraction (track(eventName, payload)) that currently logs to console and writes to /data/events.log; later replaceable with GA4.
- Make it responsive and mobile-first.
- Korean copy, clear and concise.

Project structure:
- /app/page.tsx (main)
- /app/api/lead/route.ts (POST lead)
- /lib/track.ts (tracking helper)
- /lib/eligibility.ts (eligibility logic)
- /lib/subsidy.ts (calculator)
- /data/leads.json (create)
- /data/events.log (create)
- /components/sections/* (split sections)
- /components/ui/* (shadcn)
- /public/ (placeholder images)

Landing page UI wireframe (single page with anchored sections):
1) Sticky top bar:
   - Left: NEXO logo text (no image required)
   - Right CTA buttons: "1분 자격진단" (scroll), "지원금 계산기" (scroll), "상담 신청" (open modal)

2) Hero section:
   - Headline: "정부지원으로 전자칠판 도입, 최대 500만원까지"
   - Subheadline: "신청 조건·자부담·VAT·절차를 한 페이지에서 정리했습니다."
   - Primary CTA: "내가 신청 가능한지 확인하기"
   - Secondary CTA: "지원금 얼마나 나오는지 계산"
   - Trust badges: "대리신청 불가", "VAT 별도", "의무사용 2년(일반형)" shown as badges
   - A small “주의사항” link opens modal with key policy notices.

3) Section A: 1분 자격진단 (Eligibility pre-check) [high priority]
   - A card wizard UI (stepper):
     Step 1: 사업 운영 상태 (정상영업 / 휴폐업)
     Step 2: 세금체납 여부 (국세/지방세 체납 여부)
     Step 3: 과거 스마트상점 수혜 여부 (있음/없음/모름)
     Step 4: 업종 선택 (dropdown) + 상시근로자 수 (number) + 연매출 (optional number)
     Step 5: 취약계층 해당 여부 체크 (간이과세자/1인사업장/장애인(기업)) + “증빙서류 준비 가능” 체크
   - Output status:
     - "신청 가능" (green)
     - "조건부 가능" (yellow) with reasons and recommended actions
     - "신청 불가" (red) with reasons and “문의하기” CTA
   - Always show disclaimer: "최종 자격 판단은 공단 기준 및 시스템 확인 결과에 따릅니다."
   - Track events: eligibility_start, eligibility_step_completed, eligibility_result

Eligibility rules (implement in /lib/eligibility.ts):
- If 휴폐업 => ineligible
- If 세금체납 => ineligible
- If 과거 스마트상점 수혜 있음 => ineligible for 일반 기술 (but keep message: “배리어프리/SaaS는 가능할 수 있음 - 공고 확인 필요”)
- Otherwise eligible.
- If "모름" inputs => conditional with guidance.
- For "소상공인 기준" do not hard-reject (since complex); show conditional if employee count >= 5 for 음식/소매/교육 etc; if user selects 업종 and employees >= limit, flag as conditional "소상공인 기준 확인 필요".

4) Section B: 지원금 계산기 (Subsidy calculator) [high priority]
   - Inputs:
     - 기술유형: "일반형(구매)" (default) / "렌탈형" / "SaaS형" (include but note NEXO is for 전자칠판 = 일반형/사이니지 category; still show tabs)
     - 모델/인치: 65 / 75 / 86
     - 수량: 1~5
     - 지원비율: 일반(70% 가정) / 취약(80% 가정) with tooltip: 취약계층 증빙 필요
     - VAT 포함 표시 토글 (default ON)
     - 결제방식: 계좌이체 / (일반형만) 제휴카드(하나) / (렌탈형만) 자동이체
   - Outputs:
     - 공급가액(부가세 제외), 국비지원금(상한 적용), 자부담금, 부가세(총액의 10%), 소상공인 총 부담금
     - "국비 상한 초과 시 초과분은 소상공인 부담" 문구
     - 하나카드 선택 시: 무이자 2~12개월 월 납부액 계산
   - Use sample price table:
     65인치 3,000,000 / 75인치 3,300,000 / 86인치 4,400,000 (판매가)
     Treat these as 공급가액(부가세 제외) for calculator.
   - Track events: calc_open, calc_change, calc_result

Note: The official documents mention 일반형 최대 500만원, 렌탈형 연 350만원, SaaS 연 30만원. Implement caps:
- 일반형 cap 5,000,000
- 렌탈형 cap 3,500,000 per year
- SaaS cap 300,000 per year
Also show: "VAT는 소상공인 전액 부담" notice.

5) Section C: 신청 절차 타임라인 (visual)
   - Timeline steps:
     1) 스마트상점 홈페이지 로그인/신청
     2) 서류검토/서면평가
     3) 기술컨설팅(일반/렌탈만)
     4) 3자 전자계약
     5) 자부담 + VAT 납부(소상공인→기술공급기업)
     6) 지급보증보험 제출(SaaS 제외)
     7) 설치 진행
     8) 완료보고/정산(국비는 공단→기술공급기업)
     9) 의무사용 + 현장점검/만족도조사
   - Add mini callouts:
     - "대리신청 불가"
     - "서류 수정/삭제 어려움"
   - CTA: "신청 화면 따라하기" button opens a Dialog with a simple checklist of what to prepare.

6) Section D: 준비서류/체크리스트
   - Checklist with downloadable placeholders (no real downloads needed, just UI):
     - 매장 전면/내부 사진
     - 취약계층 증빙(간이과세자/1인/장애인)
     - 대표자 연락처(문자/이메일 정확히)
     - (선정 후) 지급보증보험
   - Include note: "취약계층 증빙은 신청 마감일 기준 1개월 이내 발급 권장"

7) Section E: 리스크/주의사항 (must-read)
   - Accordion:
     - VAT 별도
     - 국비는 소상공인에게 입금되지 않음
     - 의무사용기간(일반 2년 / 렌탈 1년씩 / SaaS 6개월씩)
     - 휴폐업/이전 시 환수/무상양도 등 조치 가능
     - 부정행위(페이백/리베이트/대리신청) 금지
   - Include a prominent warning box.

8) Section F: FAQ (conversion support)
   - At least 10 questions:
     - 누가 신청 가능?
     - 신청 기간/마감?
     - 자부담+VAT 어떻게 내나?
     - 취약계층 80% 조건?
     - 보증보험 꼭 필요?
     - 설치비 추가 발생?
     - 기존 수혜자는?
     - 상담하면 대리신청 해주나? (답: 불가, 가이드만)
     - 국비는 어디로 지급?
     - 설치 후 위치 변경 가능?
   - Track faq_open

9) Section G: 상담 신청 (Lead form) [primary conversion]
   - Form fields:
     - 이름
     - 연락처
     - 이메일(선택)
     - 사업장명
     - 지역/주소(구/동 단위)
     - 희망 인치/수량
     - 희망 설치 방식(벽부착/이동형)
     - 신청 상태(신청 전/신청 완료/선정 대기/선정 완료)
     - 문의 내용(선택)
     - 개인정보 수집·이용 동의 체크(필수)
   - Submit => POST /api/lead
   - Success => Toast + "신청 링크로 이동" 버튼 (opens official application URL in new tab placeholder string)
   - Track lead_submit, lead_success, lead_error

10) Footer:
   - Company info (NEXO, phone placeholder)
   - Disclaimers: "본 페이지는 신청을 대행하지 않으며 안내 목적입니다."

Copy requirements:
- Avoid overclaiming. Use “예상”, “가이드”, “공고 기준” 표현.
- Explicitly state: "대리신청 불가".

Accessibility:
- Proper labels, focus states, contrast.

Deliverables:
- Working Next.js app with the above sections and logic.
- Provide README with:
  - install/run commands
  - how to change price table and caps
  - where leads/events logs are stored
  - how to swap lead storage adapter.

Also:
- Add anchor navigation with smooth scroll.
- Add floating mobile CTA bar at bottom: "자격진단" / "계산기" / "상담신청".

Start now. Create files, implement UI, logic, and API route. Ensure it runs.