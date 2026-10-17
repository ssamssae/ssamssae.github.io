# 대표 소개 확인 경로

T-261003-018: 390/1440px에서 공통 헤더·흰/파란 톤·제목34/51px·1000px 본문 폭·모바일 넘침 없음 확인. 소개/만드는 것/만들며 배운 것/일하는 방식 앵커와 작업장 링크 보존. verify-founder-renewal.mjs 및 verify-founder-shared-header.mjs 통과. 공유 이미지는 현재 회사 브랜드 이미지 사용.

T-261012-024: 회사홈·작업장과 같은 톤으로 맞춤 — PC 본문·헤더·푸터 1440px(`--page-max`), 기기 설정이 다크면 같은 다크 팔레트(#121519 바탕·#7aa2ff 강조, `renewal.css` 끝 블록). `<html data-theme="auto">`, 공용 헤더·푸터는 `tone="studio"` 로 `--mb-host-*` 를 상속. 라이트 화면은 리터럴 색을 `var(--토큰, 원래색)` 으로 감싸 그대로. 두 검사 스크립트의 기대값도 이 계약으로 갱신.

T-261012-029: 한국어/EN 전환 버튼 — 공용 헤더 `<mb-header ... lang-toggle>`, 사전 `i18n-en.js`(window.MB_I18N_EN, 114항목 — 공용 헤더·푸터와 앱 이름은 회사홈 i18n-en.json 과 같은 값), 로직 `lang-toggle.js`(kangdaejong-com src/scripts/lang-toggle-core.js 사본 — 고칠 땐 양쪽 같이). `verify-founder-renewal.mjs` 가 본문·aria-label·alt·title·placeholder 의 한국어가 전부 사전에 있는지 검사한다.

## T-261017-024: 회사 도메인 경로로 통일

- 진입점: https://kangdaejong.com/founder/ . 기존 founder 루트와 index.html은 query를 보존한 301이다.
- 조작: 회사 메뉴의 대표 소개 선택 → 본문 표시 → EN 선택 → 새로고침 → 한국어 복귀. 390/1440px와 라이트·다크에서 확인한다.
- 기대: canonical·og:url은 새 주소다. CSS·사전·언어 전환 스크립트는 `/founder/` 아래에서 읽는다. 앵커와 작업장 링크가 동작한다. 통합 사이트맵은 대표 소개 정본을 한 번 포함한다.
- 보존: 기존 founder 호스트의 제품별 지원·개인정보·app-ads.txt와 자산 URL. 삭제된 프로필 사진·명함은 되살리지 않는다.
- 검증 근거: 필수 소스 검사, 회사 라우터 회귀 검사, PR에 연결한 실제 공개 관측. 공개 전환 확인은 배포 뒤에 기록한다.
