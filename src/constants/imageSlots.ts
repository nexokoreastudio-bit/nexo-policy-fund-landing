export type ImageSlot = {
  src?: string
  alt: string
  label: string
  note?: string
  plannedSrc?: string
  sourceRef?: string
}

export const imageSlots = {
  landing: {
    heroVisual: {
      src: undefined,
      alt: '2026 스마트상점 메인 비주얼',
      label: 'Hero Visual Placeholder',
      note: '2026 메인 비주얼 업로드 예정',
      plannedSrc: '/assets/blog/2025-smartstore/hero-2026-main.png',
      sourceRef: '첨부 이미지 기준 신규 2026 메인 비주얼 필요',
    },
    certificateJourney: {
      src: '/assets/extracted/certificate-general-2025/page-03.png',
      alt: '소상공인 확인서 발급 절차 시작 화면',
      label: '확인서 발급 이미지 영역',
      note: '2025 일반 확인서 발급 절차 PDF 원본 페이지',
      plannedSrc: '/assets/extracted/certificate-general-2025/page-03.png',
      sourceRef: '2_개인기업_일반_확인서발급절차(2025) p.3',
    },
    applyJourney: {
      src: '/assets/extracted/incheon-20250521/image7.png',
      alt: '2025 스마트상점 사업신청 시작 화면',
      label: '스마트상점 신청 이미지 영역',
      note: '인천연합회 소상공인 발표자료 원본 이미지 적용',
      plannedSrc: '/assets/extracted/incheon-20250521/image7.png',
      sourceRef: '인천연합회 소상공인 발표자료 20250521 slide 6',
    },
  },
  applyGuide: {
    start: {
      src: '/assets/extracted/incheon-20250521/image7.png',
      alt: '2025 스마트상점 사업신청 시작 화면',
      label: '시작 화면 캡처',
      note: '인천연합회 소상공인 발표자료 원본 이미지 적용',
      plannedSrc: '/assets/extracted/incheon-20250521/image7.png',
      sourceRef: '인천연합회 소상공인 발표자료 20250521 slide 6',
    },
    menu: {
      src: '/assets/extracted/incheon-20250521/image8.JPG',
      alt: '2025 스마트상점 기술 선택 및 넥소 선택 화면',
      label: '기술 선택 캡처',
      note: '인천연합회 소상공인 발표자료 원본 이미지 적용',
      plannedSrc: '/assets/extracted/incheon-20250521/image8.JPG',
      sourceRef: '인천연합회 소상공인 발표자료 20250521 slide 7',
    },
    upload: {
      src: '/assets/extracted/incheon-20250521/image9.JPG',
      alt: '2025 스마트상점 신청서 작성 및 최종제출 화면',
      label: '신청서 작성 캡처',
      note: '인천연합회 소상공인 발표자료 원본 이미지 적용',
      plannedSrc: '/assets/extracted/incheon-20250521/image9.JPG',
      sourceRef: '인천연합회 소상공인 발표자료 20250521 slide 12',
    },
    timeline: {
      src: '/assets/blog/2025-smartstore/manual-2026-tech-supplier-overview-1.png',
      alt: '2026 스마트상점 기술공급기업 홈페이지 단계별 절차 개요',
      label: '진행 일정 요약 이미지',
      note: '2026 기술기업용 절차 매뉴얼 원본 페이지 적용',
      plannedSrc: '/assets/blog/2025-smartstore/manual-2026-tech-supplier-overview-1.png',
      sourceRef: '2026 기술기업용 절차 매뉴얼 p.1',
    },
  },
  certificateGuide: {
    general: [
      {
        src: '/assets/extracted/certificate-general-2025/page-03.png',
        alt: '일반 사업자 확인서 발급 절차 안내 화면',
        label: '일반 사업자 STEP 1 이미지 슬롯',
        note: '2025 일반 확인서 발급 절차 PDF 원본 페이지',
        plannedSrc: '/assets/extracted/certificate-general-2025/page-03.png',
        sourceRef: '2_개인기업_일반_확인서발급절차(2025) p.3',
      },
      {
        src: '/assets/extracted/certificate-general-2025/page-05.png',
        alt: '온라인 자료제출 진입 화면',
        label: '일반 사업자 STEP 2 이미지 슬롯',
        note: '2025 일반 확인서 발급 절차 PDF 원본 페이지',
        plannedSrc: '/assets/extracted/certificate-general-2025/page-05.png',
        sourceRef: '2_개인기업_일반_확인서발급절차(2025) p.5',
      },
      {
        src: '/assets/extracted/certificate-general-2025/page-07.png',
        alt: '사업자 정보 입력 및 약관 동의 화면',
        label: '일반 사업자 STEP 3 이미지 슬롯',
        note: '2025 일반 확인서 발급 절차 PDF 원본 페이지',
        plannedSrc: '/assets/extracted/certificate-general-2025/page-07.png',
        sourceRef: '2_개인기업_일반_확인서발급절차(2025) p.7',
      },
      {
        src: '/assets/extracted/certificate-general-2025/page-15.png',
        alt: '제출자료 조회 화면',
        label: '일반 사업자 STEP 4 이미지 슬롯',
        note: '2025 일반 확인서 발급 절차 PDF 원본 페이지',
        plannedSrc: '/assets/extracted/certificate-general-2025/page-15.png',
        sourceRef: '2_개인기업_일반_확인서발급절차(2025) p.15',
      },
      {
        src: '/assets/extracted/certificate-general-2025/page-17.png',
        alt: '신청서 작성 및 약관 동의 화면',
        label: '일반 사업자 STEP 5 이미지 슬롯',
        note: '2025 일반 확인서 발급 절차 PDF 원본 페이지',
        plannedSrc: '/assets/extracted/certificate-general-2025/page-17.png',
        sourceRef: '2_개인기업_일반_확인서발급절차(2025) p.17',
      },
      {
        src: '/assets/extracted/certificate-general-2025/page-30.png',
        alt: '진행상황 확인 화면',
        label: '일반 사업자 STEP 6 이미지 슬롯',
        note: '2025 일반 확인서 발급 절차 PDF 원본 페이지',
        plannedSrc: '/assets/extracted/certificate-general-2025/page-30.png',
        sourceRef: '2_개인기업_일반_확인서발급절차(2025) p.30',
      },
      {
        src: '/assets/extracted/certificate-general-2025/page-41.png',
        alt: '확인서 출력 화면',
        label: '일반 사업자 STEP 7 이미지 슬롯',
        note: '2025 일반 확인서 발급 절차 PDF 원본 페이지',
        plannedSrc: '/assets/extracted/certificate-general-2025/page-41.png',
        sourceRef: '2_개인기업_일반_확인서발급절차(2025) p.41',
      },
    ],
    startup: [
      {
        src: '/assets/extracted/certificate-startup-2025/page-04.png',
        alt: '창업 기업 확인서 STEP 1 약관 전체동의 및 확인 화면',
        label: '창업 기업 STEP 1 이미지 슬롯',
        note: '2025 창업기업 확인서 발급 절차 PDF 원본 페이지',
        plannedSrc: '/assets/extracted/certificate-startup-2025/page-04.png',
        sourceRef: '3_개인기업_창업기업_확인서발급절차(2025) p.4',
      },
      {
        src: '/assets/extracted/certificate-startup-2025/page-06.png',
        alt: '창업 기업 확인서 STEP 2 매출액 및 상시근로자 입력 화면',
        label: '창업 기업 STEP 2 이미지 슬롯',
        note: '2025 창업기업 확인서 발급 절차 PDF 원본 페이지',
        plannedSrc: '/assets/extracted/certificate-startup-2025/page-06.png',
        sourceRef: '3_개인기업_창업기업_확인서발급절차(2025) p.6',
      },
      {
        src: '/assets/extracted/certificate-startup-2025/page-13.png',
        alt: '창업 기업 확인서 STEP 3 국문확인서 출력 화면',
        label: '창업 기업 STEP 3 이미지 슬롯',
        note: '2025 창업기업 확인서 발급 절차 PDF 원본 페이지',
        plannedSrc: '/assets/extracted/certificate-startup-2025/page-13.png',
        sourceRef: '3_개인기업_창업기업_확인서발급절차(2025) p.13',
      },
    ],
    transition: {
      src: '/assets/blog/2025-smartstore/certificate-to-apply-transition.png',
      alt: '2026 확인서 발급 후 전환 안내 이미지',
      label: '확인서 완료 후 전환 안내 이미지',
      note: '2026 전환 안내 이미지 업로드 예정',
      plannedSrc: '/assets/blog/2025-smartstore/certificate-to-apply-transition.png',
      sourceRef: 'Image #4 참고 또는 신규 요약 그래픽 권장',
    },
  },
} as const
