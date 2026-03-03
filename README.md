# NEXO Policy Fund Landing (Step 2)

2026 정책 미공개 상태를 전제로 한 정책자금 안내 랜딩페이지입니다.

## Run

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Policy Gate (`policy_open`)

설정 파일: `src/data/config.json`

```json
{
  "policy_year": 2026,
  "policy_open": false,
  "official_url": "https://www.sbiz.or.kr/smst/index.do",
  "announce_url": "https://ols.semas.or.kr/ols/man/SMAN010M/page.do"
}
```

- `policy_open=false`:
  - 가격표/지원금 계산기 비노출
  - `정책 공개 대기` 패널 + `공지 받기` 중심
- `policy_open=true`:
  - 계산기 섹션 활성화
  - 값은 `src/data/policy.json`에서 읽음

### Env override

로컬 테스트용 오버라이드:

```bash
VITE_NEXO_POLICY_OPEN=true npm run dev
```

## Fill policy data after announcement

파일: `src/data/policy.json`

```json
{
  "year": 2026,
  "updated_at": null,
  "support_types": [],
  "caps": {},
  "rates": {},
  "price_table": []
}
```

- `price_table`: 모델별 단가
- `rates`: `normal`, `vulnerable` 등 지원비율
- `caps`: `general`, `rental`, `saas` 상한

계산기는 이 JSON 값만 사용하며 하드코딩 값을 쓰지 않습니다.

## Lead / Event logs

- 브라우저 fallback 저장:
  - leads: `localStorage.nexo_leads`
  - events: `localStorage.nexo_event_logs`

- Next API 템플릿(향후 전환용):
  - `app/api/lead/route.ts`
  - `data/leads.json`
  - `data/events.log`

## Lead adapter

파일: `src/lib/lead.ts`

- `ApiLeadAdapter`: `/api/lead` POST
- 실패 시 `LocalLeadAdapter` fallback
- 이후 Google Sheets/CRM adapter로 교체 가능
