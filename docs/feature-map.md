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

## T-261017-028: 로딩 중 첫 언어 선택

- `lang-toggle.js`를 지연한 상태에서 EN 또는 한국어를 누른다. 스크립트가 준비되면 마지막 선택이 본문·제목에 반영돼야 한다. 이전에 저장한 언어보다 현재 선택이 우선한다. 저장소를 사용할 수 없어도 현재 페이지 전환은 동작한다.
- 회사 core와 같은 초기화 순서를 유지한다. 두 소스의 함수 일치, 필수 소스 검사와 실제 브라우저의 지연 로드·새로고침 검사를 T-261017-028 근거에 기록한다. 기존 제품 하위 앱과 저장 데이터는 변경하지 않는다.

## T-261024-058: 다크 해제·전부 라이트 + 생김새를 공용 톤 파일에 연결

- 진입점: https://kangdaejong.com/founder/ . `<html data-theme="light">`·`<meta name="color-scheme" content="light">` 로 기기 설정이 다크여도 흰 바탕이다(공용 tokens.css 의 다크 블록은 `data-theme="light"` 가 아닌 문서에만 걸린다).
- 생김새: `renewal.css` 는 px 숫자 없이 `var(--tone-*)`(글자 크기·줄 간격·간격·둥글기·폭)와 공용 부품 `.mb-btn.mb-btn--primary`(버튼)·`.mb-card`(만드는 것·만들며 배운 것·일하는 방식 카드)·`.mb-link`(카드 안 링크·연락 링크)만 쓴다. 칸 나눔(3칸↔1칸, 제목 줄, 색인 줄)은 미디어 쿼리 대신 flex-basis 계산식으로 `--tone-prose-max` 를 기준 삼는다.
- 확인: 390/1440px, 기기 라이트·다크 둘 다에서 바탕이 흰색이고 가로 넘침이 없다. 버튼이 파란 56px 둥근 버튼, 카드가 회색 둥근 면(선 없음), 카드 링크가 파란 밑줄 글 링크다. 공용 톤 파일 값을 바꾸면 이 페이지도 같이 바뀐다.
- 게이트: `node scripts/verify-tone-copies.mjs`(기준선 0 — 직접 숫자가 생기면 실패, 다크 규칙·`--tone-*` 정의 복사는 즉시 실패) 가 `verify-founder-renewal.mjs` 끝에서 함께 돈다. `verify-founder-shared-header.mjs` 가 라이트 고정·버전 없는 studio-page.css 주소·공용 부품 사용을 확인한다.

## T-261025-009: 메일 「주소 복사」

- 진입점: https://kangdaejong.com/founder/ 맨 아래 「연락하기」.
- 조작·기대: 「주소 복사」(글 링크 모양 버튼)를 누르면 클립보드에 `minusbetastudio@gmail.com` 이 들어가고, 화면 아래 토스트 「메일 주소를 복사했어요」(영어 화면 「Email address copied」)가 3초 뒤 사라진다. 버튼은 `data-mb-copy-email` 로 같은 줄의 메일 링크를 가리킨다 — 공개 화면에서는 Cloudflare 가 그 링크를 `/cdn-cgi/l/email-protection#…` 으로 가리므로 두 형태를 모두 찾는다.
- 의존: 복사·토스트 동작과 모양은 회사 홈 공용 파일(`mb-components.js`·`tokens.css`, kangdaejong-com T-261025-009)이 준다. 회사 홈이 먼저 배포돼야 이 버튼이 동작한다.
- 확인: 2026-10-25 제우스 로컬 — 회사 홈 작업 공간의 공용 파일을 끼운 브라우저 점검으로 한국어·영어·가려진 주소 복사를 확인했다(바꾸기 전 index.html 에서는 버튼이 없어 실패). `verify-founder-renewal.mjs`(사전 누락 0·톤 복사 0)·`verify-founder-shared-header.mjs`·`verify-palette-copies.mjs` 통과.
- 미확인: 공개 배포 뒤 실제 화면.
