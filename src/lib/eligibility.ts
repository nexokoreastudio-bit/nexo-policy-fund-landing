export type EligibilityInput = {
  businessStatus: 'active' | 'closed'
  taxDelinquent: 'yes' | 'no'
  pastSupport: 'yes' | 'no' | 'unknown'
  industry: 'food' | 'retail' | 'education' | 'service' | 'manufacturing' | 'other' | ''
  employees: number
  revenue?: number
  vulnerable: {
    simpleTaxpayer: boolean
    onePersonBusiness: boolean
    disabledBusiness: boolean
  }
  docReady: boolean
}

export type EligibilityResult = {
  status: 'eligible' | 'conditional' | 'ineligible'
  title: string
  reasons: string[]
  actions: string[]
}

function industryLimit(industry: EligibilityInput['industry']) {
  if (industry === 'food' || industry === 'retail' || industry === 'education' || industry === 'service') {
    return 5
  }
  if (industry === 'manufacturing') {
    return 10
  }
  return 5
}

export function evaluateEligibility(input: EligibilityInput): EligibilityResult {
  const reasons: string[] = []
  const actions: string[] = []

  if (input.businessStatus === 'closed') {
    reasons.push('휴·폐업 상태는 신청이 불가합니다.')
  }
  if (input.taxDelinquent === 'yes') {
    reasons.push('국세/지방세 체납 상태에서는 신청이 불가합니다.')
  }
  if (input.pastSupport === 'yes') {
    reasons.push('과거 스마트상점 일반기술 수혜 이력이 있으면 일반형은 제한될 수 있습니다.')
    actions.push('배리어프리 또는 SaaS형 가능성은 별도 공고 기준 확인이 필요합니다.')
  }

  if (reasons.length > 0) {
    return {
      status: 'ineligible',
      title: '신청 불가 가능성이 높습니다',
      reasons,
      actions: actions.length ? actions : ['정확한 대체 가능 유형을 상담으로 확인해 주세요.'],
    }
  }

  if (input.pastSupport === 'unknown') {
    reasons.push('과거 수혜 여부가 불명확합니다.')
    actions.push('이전 수혜 이력을 먼저 조회한 후 신청 진행을 권장합니다.')
  }

  if (input.industry) {
    const limit = industryLimit(input.industry)
    if (input.employees >= limit) {
      reasons.push(`선택 업종의 소상공인 상시근로자 기준(일반적으로 ${limit}인 미만) 확인이 필요합니다.`)
      actions.push('업종별 기준 충족 여부를 공고문 또는 상담을 통해 재확인해 주세요.')
    }
  }

  const vulnerableChecked =
    input.vulnerable.simpleTaxpayer || input.vulnerable.onePersonBusiness || input.vulnerable.disabledBusiness
  if (vulnerableChecked && !input.docReady) {
    reasons.push('취약계층 증빙서류 준비 가능 여부가 확인되지 않았습니다.')
    actions.push('증빙 발급 가능 여부를 먼저 확인하면 신청 정확도가 올라갑니다.')
  }

  if (reasons.length > 0) {
    return {
      status: 'conditional',
      title: '조건부 가능 상태입니다',
      reasons,
      actions: actions.length ? actions : ['상담을 통해 조건 확인 후 진행해 주세요.'],
    }
  }

  return {
    status: 'eligible',
    title: '신청 가능성이 높습니다',
    reasons: ['입력한 기준에서 주요 제한사항은 확인되지 않았습니다.'],
    actions: ['최종 자격 판단은 공단 기준 및 시스템 확인 결과에 따릅니다.'],
  }
}
