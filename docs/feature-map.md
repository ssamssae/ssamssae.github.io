# 대표 소개 확인 경로

T-261003-018: 390/1440px에서 공통 헤더·흰/파란 톤·제목34/51px·1000px 본문 폭·모바일 넘침 없음 확인. 소개/만드는 것/만들며 배운 것/일하는 방식 앵커와 작업장 링크 보존. verify-founder-renewal.mjs 및 verify-founder-shared-header.mjs 통과. 공유 이미지는 현재 회사 브랜드 이미지 사용.

T-261012-024: 회사홈·작업장과 같은 톤으로 맞춤 — PC 본문·헤더·푸터 1440px(`--page-max`), 기기 설정이 다크면 같은 다크 팔레트(#121519 바탕·#7aa2ff 강조, `renewal.css` 끝 블록). `<html data-theme="auto">`, 공용 헤더·푸터는 `tone="studio"` 로 `--mb-host-*` 를 상속. 라이트 화면은 리터럴 색을 `var(--토큰, 원래색)` 으로 감싸 그대로. 두 검사 스크립트의 기대값도 이 계약으로 갱신.

T-261012-029: 한국어/EN 전환 버튼 — 공용 헤더 `<mb-header ... lang-toggle>`, 사전 `i18n-en.js`(window.MB_I18N_EN, 114항목 — 공용 헤더·푸터와 앱 이름은 회사홈 i18n-en.json 과 같은 값), 로직 `lang-toggle.js`(kangdaejong-com src/scripts/lang-toggle-core.js 사본 — 고칠 땐 양쪽 같이). `verify-founder-renewal.mjs` 가 본문·aria-label·alt·title·placeholder 의 한국어가 전부 사전에 있는지 검사한다.
