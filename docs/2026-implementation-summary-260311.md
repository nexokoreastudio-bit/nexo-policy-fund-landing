# 2026 랜딩 구현 정리

## 기준
- 작성일: 2026-03-11
- 프로젝트: `nexo-policy-fund-landing`
- 목적: 지금까지 반영된 메인/확인서/사업신청 페이지 리뉴얼 내용을 빠르게 확인하기 위한 구현 요약

## 전체 방향
- 2025 블로그형 모집 구조에서 2026 랜딩형 구조로 전환
- 메인 첫 화면에서 `지원율`, `최대 지원금`, `지원금 비교`를 바로 보여주는 방향으로 개편
- `확인서 발급`과 `사업 신청`을 분리된 사용자 흐름으로 정리
- 실제 원본 자료 기반 이미지로 절차 가이드를 교체
- 메인/확인서/사업신청 페이지의 톤을 공통 비주얼에 맞춰 통일

## 공통 UI 변경
- 상단 메뉴바 문구를 `넥소 스마트상점 지원사업`으로 변경
- 상단 메뉴바는 흰색 배경으로 고정
- 상단 메뉴바 로고는 `nexo_logo_black.png`만 남김
- 메인 히어로 배너를 공통 비주얼로 사용
- 히어로 아래 공통 `단계별 진행 안내` 바 추가
- 단계는 `1단계 지원금 확인 / 2단계 확인서 발급 / 3단계 사업 신청 / 4단계 진행상황 확인 / 5단계 상담/문의`
- 메인/확인서 발급/사업 신청 페이지에서 현재 단계가 자동 강조되도록 적용

## 메인 페이지
- 메인 배너 이미지를 최신 파일로 교체
  - 현재 파일: `public/assets/landing/main_2.png`
  - 현재 원본 크기: `1366 x 768`
- 메인 순서 정리
  - 히어로
  - 단계 진행 바
  - 지원금 확인 섹션
  - 관련 사이트 바로가기
  - 신청 전 체크
  - 준비서류
  - 자격/신청 절차
  - 상담 섹션
- `지원금 확인` 섹션을 전단형 비교판 구조로 재구성
  - `우대지원 60%` / `일반지원 50%`
  - 65/75/86인치 모델별 금액 표시
  - 수량별 `정부지원금 / 자부담` 표시
  - `무상지원` 카드 분리
  - `최대 500만원 지원받기` 카피 강조
  - `60% / 50%` 배지 확대
- `관련 사이트 바로가기` 섹션을 지원금 확인 아래로 이동
- `관련 사이트 바로가기` 안에 다음 요소 반영
  - 소상공인 확인서 발급 사이트 링크
  - 스마트상점 신청 사이트 링크
  - 지역별 문의처 이동 안내 카드
  - 문의처 안내 이미지 `info.png`
  - 이미지 hover 시 `문의처로 이동` 오버레이 표시
  - 이미지 클릭 시 문의처 링크로 이동

## 확인서 발급 페이지
- 메인 히어로 배너 동일 적용
- 공통 단계 진행 바 적용
- 메인과 같은 색감으로 톤 통일
- 상단 안내 영역에 다음 내용 반영
  - 확인서 발급 사이트 URL
  - 지역별 문의처 확인 카드
  - 메인과 동일한 문의처 안내 2단 카드 구조 적용
  - 문의처 안내 이미지 클릭 이동 기능 적용
- 일반 사업자 탭
  - 2025 일반 확인서 발급 PDF 원본 페이지 기준 이미지 적용
- 창업 기업 탭
  - `3_개인기업_창업기업_확인서발급절차(2025).pdf` 분석 후 이미지 분리
  - 현재 매칭
    - STEP 1: `page-04.png` 약관 전체동의/확인
    - STEP 2: `page-06.png` 신청서 입력
    - STEP 3: `page-13.png` 국문확인서 출력

## 사업 신청 페이지
- 메인 히어로 배너 동일 적용
- 공통 단계 진행 바 적용
- 메인과 같은 색감으로 톤 통일
- 사업 신청 절차를 3단계 구조로 정리
  - STEP 1 어디서 시작하는지
  - STEP 2 어떤 메뉴를 클릭하는지
  - STEP 3 신청서를 어떻게 작성하는지
- `진행상황 확인` 섹션에 `progress-check` 앵커 부여
  - 공통 단계 바 `4단계` 클릭 시 여기로 이동
- `자주 막히는 지점` 섹션에 부당개입 금지 원본 이미지 추가
- `인천연합회 소상공인 발표자료 20250521.pptx` 기준 이미지 반영
  - 시작 화면
  - 넥소 선택/서비스 신청
  - 신청서 작성/최종제출

## 반영된 주요 원본 자료
- 2026 모집공고 PDF
- 2025 소상공인 신청 매뉴얼 PDF
- 2026 기술기업용 절차 매뉴얼 PDF
- 2025 일반 사업자 확인서 발급 절차 PDF
- 2025 창업기업 확인서 발급 절차 PDF
- 인천연합회 소상공인 발표자료 20250521 PPTX
- Google Drive 내 2026 배너/로고/안내 이미지 자산

## 주요 생성/수정 파일
- 공통 컴포넌트
  - `src/components/StickyTopBar.tsx`
  - `src/components/StepProgressBar.tsx`
  - `src/components/ImageSlotPlaceholder.tsx`
- 메인
  - `src/pages/Landing.tsx`
  - `src/sections/Hero.tsx`
  - `src/sections/SupportComparisonSection.tsx`
  - `src/sections/ApplicationJourneySection.tsx`
  - `src/sections/ConversionChecklistSection.tsx`
  - `src/sections/DocumentsGuideSection.tsx`
  - `src/sections/LeadSection.tsx`
  - `src/sections/Footer.tsx`
- 상세 페이지
  - `src/pages/CertificateGuide.tsx`
  - `src/pages/SmartStoreApply.tsx`
- 데이터/상수
  - `src/constants/imageSlots.ts`
  - `src/constants/landing.ts`
  - `src/lib/utm.ts`
  - `netlify/functions/sync-lead.ts`

## 자산 위치
- 메인/로고
  - `public/assets/landing/`
- 일반 확인서 분리 이미지
  - `public/assets/extracted/certificate-general-2025/`
- 창업기업 확인서 분리 이미지
  - `public/assets/extracted/certificate-startup-2025/`
- 인천연합회 발표자료 분리 이미지
  - `public/assets/extracted/incheon-20250521/`

## 현재 상태
- `npm run build` 통과 기준으로 작업 진행
- `main` 브랜치에 커밋/푸시 완료 이력 있음
  - 커밋: `443ee5e`
  - 메시지: `Revamp 2026 landing and guide flows`

## 현재 주의점
- 작업 중 생성된 임시 폴더와 문서는 일부 미추적 상태일 수 있음
  - 예: `tmp/`, `tmp_transcribe/`, `.venv_transcribe/`, 일부 `docs/`
- 대용량 추출 이미지가 많이 포함되어 있어 자산 정리는 별도 판단 필요
- 단계 진행 바는 현재 `페이지/해시 기준 활성화` 구조이며, 세부 단계까지 자동 연동하는 구조는 아님
