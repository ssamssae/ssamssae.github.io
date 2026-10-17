# ssamssae.github.io

강대종 (DAEJONG KANG) 대표소개 페이지.

Live: https://kangdaejong.com/founder/

## 구성

- 단일 `index.html` — GitHub Pages 로 그대로 서빙
- 공통 `<mb-header>` / `<mb-footer>` 로 회사홈·작업장과 헤더/푸터 통일
- 화이트 + 모노크롬 + 블루 CTA 톤
- Pretendard Variable 폰트 (CDN)
- JS 는 reveal stagger 뿐

## 관련

- `daejong-page` (작업장): https://kangdaejong.com/work/
- 운영 앱 repo: `simple-memo-app`, `hanjul`, `review_radar`

## 수정 사이클

단순 index.html 1장이라 수정 → commit → push 만으로 배포 반영 (GitHub Pages 는 자동 빌드).

[화면 확인 경로](docs/feature-map.md)

## 주소와 검증

GitHub Pages는 대표 소개의 원본을 제공한다. 회사의 기존 workshop-router가 `/founder/`에서 이 원본을 읽는다. `index.html`의 canonical·og:url과 `sitemap.xml`은 새 주소를 사용한다. 공통 사이트맵은 https://kangdaejong.com/sitemap.xml 이다. 기존 founder 루트와 index.html만 새 주소로 영구 이동한다. 같은 호스트의 제품 지원 페이지·app-ads.txt·기존 자산은 유지한다.

[대표 소개 확인 경로](docs/feature-map.md)를 따른다. `node scripts/verify-founder-shared-header.mjs`와 `node scripts/verify-founder-renewal.mjs`가 필수 검사다. main 머지는 기존 GitHub Pages 자동 배포를 일으킨다.
