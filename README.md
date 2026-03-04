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

## Netlify Forms + Google Sheets 동시 연동

현재 폼 전송은 아래 순서로 동작합니다.

1. Netlify Forms 저장  
2. Netlify Function(`/.netlify/functions/sync-lead`) 호출  
3. Google Sheets 행 추가  
4. 실패 시 브라우저 fallback 저장(`localStorage.nexo_leads`)

### Netlify Forms 확인 위치

- Netlify Dashboard -> Site -> `Forms`
- 폼명:
  - `nexo_policy_waitlist` (공지 받기)
  - `nexo_policy_consult` (상담 신청)

### Google Sheets 연결 준비

1. Google Cloud 서비스 계정 생성
2. Google Sheets API 활성화
3. 서비스 계정 이메일을 아래 2개 시트에 편집자로 공유
   - 상담신청 시트: `1W_LyImnYkP4fsOZgfQsAFw8xTP1j2cZM7b3A-ohK0bA`
   - 공고알림 시트: `1ux89Z0g4oMex_bD_28Gd8Vo5Bv4IZjh2BfCIpVJrXEI`
4. Netlify 환경변수 설정

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=...@....iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=\"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n\"
CONSULT_SHEET_ID=1W_LyImnYkP4fsOZgfQsAFw8xTP1j2cZM7b3A-ohK0bA
WAITLIST_SHEET_ID=1ux89Z0g4oMex_bD_28Gd8Vo5Bv4IZjh2BfCIpVJrXEI
CONSULT_SHEET_RANGE=A:Z
WAITLIST_SHEET_RANGE=A:Z
```

5. Netlify 재배포

### 로컬 fallback 로그

- leads: `localStorage.nexo_leads`
- events: `localStorage.nexo_event_logs`

## Lead adapter

파일: `src/lib/lead.ts`

- Netlify Forms POST + Sheets sync 함수 호출
- 실패 시 localStorage fallback
