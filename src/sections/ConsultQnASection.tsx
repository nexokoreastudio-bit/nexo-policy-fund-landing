import type { ReactNode } from 'react'
import Accordion from '../components/Accordion'

function Emphasis({ children }: { children: ReactNode }) {
  return <span className="font-black text-[#21457e]">{children}</span>
}

function Point({ children }: { children: ReactNode }) {
  return <span className="font-black text-[#d62828]">{children}</span>
}

const qnaItems = [
  {
    title: '1. 누가 지원할 수 있나요?',
    content: (
      <>
        <Emphasis>소상공인기본법 제2조에 따른 소상공인</Emphasis>으로, 신청일 현재 정상 영업 중인 점포라면
        <Emphasis> 전자칠판 일반형 신청</Emphasis>이 가능합니다. 개인·법인 모두 가능하지만 <Emphasis>소상공인확인서 발급</Emphasis>이
        가능해야 하며, <Point>지원제외 업종 · 비영리 · 휴폐업 · 세금체납</Point> 등 지원제외 요건에 해당하면 신청할 수 없습니다.
      </>
    ),
  },
  {
    title: '2. 사업신청은 어떻게 진행하나요?',
    content: (
      <>
        <Emphasis>스마트상점 기술보급사업 홈페이지</Emphasis>에서 <Emphasis>일반형 공고</Emphasis>를 선택해 신청합니다. 전용 홈페이지
        접속 후 <Emphasis>소상공인 로그인</Emphasis>, 회원가입 또는 기존 계정 로그인, 일반형 모집공고 선택, <Emphasis>사업 신청 버튼 클릭</Emphasis>,
        신청서 작성과 서류 첨부 순서로 진행하면 됩니다.
      </>
    ),
  },
  {
    title: '3. 프랜차이즈 가맹점이나 직영점도 신청 가능한가요?',
    content: (
      <>
        가능합니다. 가맹점은 <Emphasis>사업자등록증 기준 소상공인</Emphasis>이면 일반형 신청이 가능하고, 직영점도
        <Emphasis> 소상공인확인서 발급</Emphasis>이 가능하면 신청 가능합니다.
      </>
    ),
  },
  {
    title: '4. 이미 스마트상점 지원을 받은 적이 있어도 다시 신청할 수 있나요?',
    content: (
      <>
        원칙적으로는 <Point>중복지원이 제한</Point>됩니다. 이미 스마트상점 기술보급사업으로 일반형, 렌탈형, 경험형, 상생형, 패키지형 등을
        지원받았다면 <Emphasis>일반형 전자칠판 신청</Emphasis>은 제한될 수 있습니다. 중복 여부는 <Emphasis>대표자 주민등록번호</Emphasis>나
        <Emphasis> 사업자등록번호</Emphasis> 중 하나라도 일치하면 판단됩니다.
      </>
    ),
  },
  {
    title: '5. 일반형 전자칠판은 얼마까지 지원되나요?',
    content: (
      <>
        일반형은 공급가액 기준으로 지원금이 산정되며, <Point>2026년 기준 최대 500만원</Point> 한도 내에서 지원됩니다. 실제 지원금은
        공고 기준과 공급가액에 따라 달라지며, <Emphasis>정부지원 비율</Emphasis>과 <Emphasis>지원 한도</Emphasis> 중 더 작은 금액이 적용됩니다.
      </>
    ),
  },
  {
    title: '6. 자부담금 완화 대상은 어떤 경우에 해당하나요?',
    content: (
      <>
        <Emphasis>간이과세자</Emphasis>, <Emphasis>1인 사업장</Emphasis>, <Emphasis>장애인기업</Emphasis> 중 한 가지에 해당하면
        자부담금 완화 대상에 해당할 수 있습니다. <Point>2026년 기준 최대 60%까지 지원</Point>되며, 세부 적용 여부는
        <Emphasis> 공고문 기준</Emphasis>으로 확인해야 합니다.
      </>
    ),
  },
  {
    title: '7. 자부담금은 어떻게 납부하고, 못 내면 어떻게 되나요?',
    content: (
      <>
        <Emphasis>자부담금은 신청자 본인 명의 통장</Emphasis>에서 계좌이체하거나 제휴카드 등 정해진 방식으로 납부해야 합니다.
        <Point>무통장입금, 간편결제는 불가</Point>합니다. 자부담금이 납부되지 않으면 <Point>계약이 취소</Point>될 수 있으며,
        계좌이체인 경우 <Emphasis>이체확인증 제출</Emphasis>이 필요할 수 있습니다.
      </>
    ),
  },
  {
    title: '8. 전자칠판 설치 후 꼭 사용해야 하는 기간이 있나요?',
    content: (
      <>
        있습니다. 정부지원을 통해 도입된 일반형 전자칠판은 <Emphasis>의무사용기간 동안 반드시 사용</Emphasis>해야 합니다. 일반형 기준으로는
        <Point>2년 의무사용</Point>이 기본이며, 의무사용기간 내 <Point>무단 처분이나 목적 외 사용은 불가</Point>합니다.
      </>
    ),
  },
  {
    title: '9. 전자칠판 설치를 위한 공사비도 지원되나요?',
    content: (
      <>
        아니요. <Emphasis>전자칠판 도입 자체만 지원 대상</Emphasis>입니다. 천장공사, 전기공사, 벽면 보강, 추가 설치 공사 등
        <Point>기술 외 부수비용은 별도 부담</Point>해야 합니다.
      </>
    ),
  },
  {
    title: '10. 전자칠판은 어디서 확인하고 선택하나요?',
    content: (
      <>
        <Emphasis>스마트상점 홈페이지</Emphasis>에서 기술공급기업과 기술현황을 확인한 뒤 <Emphasis>일반형 전자칠판</Emphasis>을 선택해야
        합니다. <Point>홈페이지에 등록된 기술만 신청 가능</Point>하며, 없는 기술은 지원되지 않습니다.
      </>
    ),
  },
  {
    title: '11. 궁금한 사항은 어디에 문의하면 되나요?',
    content: (
      <>
        스마트상점 기술보급사업 대표번호 <Point>1600-6185</Point>로 문의하면 됩니다. 원활한 상담을 위해
        <Emphasis> 모집공고문을 먼저 확인</Emphasis>한 뒤 문의하는 것이 좋습니다.
      </>
    ),
  },
]

function ConsultQnASection() {
  return (
    <section
      id="consult-qna"
      className="mt-8 border border-[#d7e3f4] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-8"
    >
      <div className="text-center">
        <span className="inline-flex border border-[#cfdbec] bg-[#eef4fb] px-3 py-2 text-xs font-black tracking-[0.14em] text-[#21457e] sm:px-4 sm:text-base">
          QnA
        </span>
        <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
          지원사업 신청 전 핵심만 확인하세요
        </h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 sm:text-lg">
          신청 자격, 지원금, 자부담금, 의무사용기간처럼 꼭 확인해야 하는 내용을 먼저 읽어보시면 신청 흐름을 훨씬 쉽게 이해하실 수 있습니다.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-5xl sm:mt-8">
        <Accordion items={qnaItems} />
      </div>
    </section>
  )
}

export default ConsultQnASection
