import Landing from './Landing'
import demoPolicy from '../data/policy.demo.json'
import type { PolicyData } from '../types/policy'

function AnnouncePreview() {
  return (
    <Landing
      overrideConfig={{ policy_open: true }}
      overridePolicyData={demoPolicy as PolicyData}
      previewBanner="대표이사 시연용: 공고 공개 시점 화면 미리보기 (/announce-preview)"
    />
  )
}

export default AnnouncePreview
