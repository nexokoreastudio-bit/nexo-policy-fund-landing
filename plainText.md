프로젝트 목적:
(주)넥소 전자칠판을 "소상공인 정책자금"으로 도입하려는 사업자를 위한 전환형 랜딩페이지를 React + TypeScript + Tailwind 기반 단일 스크롤 페이지로 제작한다.

최종 목표:
1) 지원 일정 알림 신청
2) 무료 상담 / 견적 요청 전환
3) 신청 방법 가이드 제공
4) 일정 공개 시 JSON 수정만으로 업데이트 가능 구조

기술 스택:
- Vite + React + TypeScript
- TailwindCSS
- 외부 API 연결 없음 (폼은 console.log 처리)
- 모바일 퍼스트
- 깔끔한 기업형 UI (화이트 기반, 카드형 섹션, 명확한 CTA)

폴더 구조:

src/
  app/App.tsx
  pages/Landing.tsx
  sections/
    Hero.tsx
    Schedule.tsx
    Eligibility.tsx
    HowToApply.tsx
    Documents.tsx
    Product.tsx
    FAQ.tsx
    CTA.tsx
  components/
    StickyCTA.tsx
    Step.tsx
    Badge.tsx
    Accordion.tsx
  data/
    content.ko.json
    faq.ko.json
  lib/
    format.ts

요구사항 상세:

1) Hero 섹션
- 헤드라인: "소상공인 정책자금으로 넥소 전자칠판 도입하세요"
- 서브텍스트
- CTA 2개 (일정 알림 받기 / 무료 상담 요청)
- 배경은 심플, 텍스트 중심

2) Schedule 섹션
- 공고일 / 접수시작 / 마감 / 발표 / 지원한도 테이블
- "공식 공고 즉시 업데이트 예정" 문구 포함
- 일정 데이터는 content.ko.json에서 불러오기

3) Eligibility 섹션
- 체크리스트 4개 이상
- 30초 셀프체크 UI (업종, 사업기간, 매출구간 select)
- 제출 시 간단 결과 메시지 출력

4) HowToApply 섹션
- 4단계 절차
- Step 컴포넌트로 구현

5) Documents 섹션
- 필요서류 리스트
- "견적서 요청하기" CTA 버튼

6) Product 섹션
- 넥소 전자칠판 핵심 기능 4~6개 카드형 UI
- 신뢰 요소 리스트 포함

7) FAQ 섹션
- faq.ko.json 기반 아코디언 구현

8) CTA 하단 섹션
- "지금 준비하세요" 메시지
- 무료상담 / 일정알림 버튼
- 연락처 placeholder 표시

9) StickyCTA 컴포넌트
- 하단 고정 버튼 2개
- 스크롤 시 항상 표시

10) SEO
- index.html에 title, description, OG 메타 placeholder 추가

11) 데이터 파일 생성
content.ko.json 과 faq.ko.json 파일 생성 후 아래 데이터 삽입:

[content.ko.json]

{
  "meta": {
    "title": "소상공인 정책자금으로 넥소 전자칠판 도입 | (주)넥소",
    "description": "2026년 소상공인 정책자금 지원 안내. 넥소 전자칠판을 정책자금으로 도입하는 방법, 신청 일정, 필요 서류, 절차를 한 페이지에 정리했습니다."
  },
  "hero": {
    "headline": "소상공인 정책자금으로\n넥소 전자칠판 도입하세요",
    "sub": "정책자금 지원 일정 공개 즉시 신청 방법 · 필요 서류 · 견적까지 한 번에 안내합니다.",
    "primaryCta": "지원 일정 알림 받기",
    "secondaryCta": "무료 상담 / 견적 요청"
  },
  "schedule": {
    "title": "2026 소상공인 정책자금 지원 일정",
    "notice": "※ 공식 공고 일정은 발표 즉시 자동 업데이트 예정입니다.",
    "items": [
      { "label": "공고일", "value": "공개 예정" },
      { "label": "접수 시작", "value": "공개 예정" },
      { "label": "접수 마감", "value": "공개 예정" },
      { "label": "결과 발표", "value": "공개 예정" },
      { "label": "지원 한도", "value": "사업 유형별 상이" }
    ]
  },
  "eligibility": {
    "title": "지원 대상 안내",
    "checklist": [
      "소상공인 기본 요건 충족 사업자",
      "정책자금 지원 제한 업종이 아닐 것",
      "최근 연매출 기준 충족",
      "사업자등록 6개월 이상 (유형별 상이)"
    ]
  }
}

[faq.ko.json]

{
  "faq": [
    { "q": "소상공인 정책자금은 누구나 신청 가능한가요?", "a": "요건 충족 여부에 따라 달라집니다." },
    { "q": "전자칠판도 지원 가능합니까?", "a": "지원 유형에 따라 시설·장비 항목으로 신청 가능합니다." },
    { "q": "일정은 언제 공개되나요?", "a": "공식 공고 시 즉시 업데이트됩니다." }
  ]
}

12) format.ts
- 날짜 포맷 함수
- 금액 포맷 함수

13) 실행 확인 후
- npm run dev 실행 안내
- npm run build 안내
- 오류 없이 동작하도록 구성

최종 산출물:
- 모든 파일 생성
- 타입 오류 없음
- Tailwind 적용 완료
- 랜딩페이지 바로 실행 가능 상태