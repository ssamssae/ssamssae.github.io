import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

const css = readFileSync(new URL("../renewal.css", import.meta.url), "utf8");
const checks = [
  {
    label: "founder canonical, social URL and source sitemap use the company path",
    ok:
      /<link rel="canonical" href="https:\/\/kangdaejong\.com\/founder\/"\/>/.test(html) &&
      /<meta property="og:url" content="https:\/\/kangdaejong\.com\/founder\/"\/>/.test(html) &&
      !html.includes('https://founder.kangdaejong.com/') &&
      !html.includes('https://work.kangdaejong.com/') &&
      readFileSync(new URL('../sitemap.xml',import.meta.url),'utf8').match(/<loc>([^<]+)<\/loc>/g)?.join('') === '<loc>https://kangdaejong.com/founder/</loc>',
  },
  {
    label: "founder page consumes shared header from kangdaejong.com",
    ok: /<script src="https:\/\/kangdaejong\.com\/mb-components\.js" defer><\/script>/.test(html),
  },
  {
    label: "founder page marks founder nav active (studio tone follows host palette T-261012-024, KO/EN toggle T-261012-029)",
    ok: /<mb-header active="founder" tone="studio" lang-toggle><\/mb-header>/.test(html),
  },
  {
    label: "founder page keeps representative title copy",
    ok:
      /<title>강대종 · 마이너스베타스튜디오 대표<\/title>/.test(html) &&
      /<meta property="og:title" content="강대종 · 마이너스베타스튜디오 대표"\/>/.test(html),
  },
  {
    // T-261013-004: 색·폭은 회사홈 공용 원본 하나 — 이 페이지는 그 파일을 읽고, 자체 색 값·theme-color 를 두지 않는다.
    // T-261024-058: 공개 사이트는 전부 라이트 — data-theme="light"·color-scheme 메타 light 로 고정한다. 공용 페이지 스타일은
    //   버전 꼬리표 없는 고정 주소(캐시가 max-age=0 재검증)로 읽는다. 다크 규칙·직접 숫자·--tone-* 정의 복사는 scripts/verify-tone-copies.mjs 가 막는다.
    label: "founder page reads the shared company tokens and is fixed to light (T-261024-058)",
    ok:
      /<html lang="ko" data-theme="light">/.test(html) &&
      /<meta name="color-scheme" content="light"\/>/.test(html) &&
      /<link rel="stylesheet" href="https:\/\/kangdaejong\.com\/brand\/current\/tokens\.css"\/>/.test(html) &&
      /<link rel="stylesheet" href="https:\/\/kangdaejong\.com\/studio-page\.css"\/>/.test(html) &&
      html.indexOf("brand/current/tokens.css") < html.indexOf("./renewal.css") &&
      !/name="theme-color"/.test(html) &&
      !/prefers-color-scheme:\s*dark/.test(css) &&
      !/#08090A|#7170FF/.test(html + css),
  },
  {
    // T-261024-058: 버튼·카드·글 링크는 공용 부품(.mb-btn·.mb-card·.mb-link)으로 만든다 — 자체 .r-button 모양·카드 숫자로 되돌리지 않는다.
    label: "founder page builds buttons, cards and text links from the shared parts (.mb-btn/.mb-card/.mb-link)",
    ok:
      /<a class="mb-btn mb-btn--primary" href="https:\/\/kangdaejong\.com\/work\/">작업장 둘러보기/.test(html) &&
      (html.match(/class="mb-card"/g) || []).length >= 6 &&
      /<a class="mb-link" href="mailto:minusbetastudio@gmail\.com">/.test(html) &&
      !/class="r-button"/.test(html) &&
      !/\.r-button/.test(css),
  },
  {
    // T-261012-041: 공용 카드는 버전 없는 고정 주소 하나만 쓴다 — 카드 그림은 회사홈에서만 바꾸고 여기는 고칠 곳이 없다.
    label: "founder share card uses the fixed company card address without a version",
    ok:
      /<meta property="og:image" content="https:\/\/kangdaejong\.com\/brand\/current\/social\.png"\/>/.test(html) &&
      /<meta name="twitter:image" content="https:\/\/kangdaejong\.com\/brand\/current\/social\.png"\/>/.test(html) &&
      !/social\.png\?/.test(html),
  },
  {
    label: "founder CTA points work root as workspace",
    ok: /href="https:\/\/kangdaejong\.com\/work\/">작업장 둘러보기/.test(html),
  },
  {
    label: "founder page no longer labels work root as 작업일지",
    ok: !/<div class="cta-title">작업일지<\/div>/.test(html),
  },
  {
    // T-261012-029: 한국어/EN 전환 — 사전(i18n-en.js)을 전환 스크립트(lang-toggle.js)보다 먼저 읽어야 한다.
    label: "founder page loads its KO/EN dictionary before the toggle script",
    ok: /<script src="\.\/i18n-en\.js" defer><\/script>\s*<script src="\.\/lang-toggle\.js" defer><\/script>/.test(html),
  },
];

const failures = checks.filter((check) => !check.ok);

if (failures.length > 0) {
  console.error("Founder shared header verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure.label}`);
  }
  process.exit(1);
}

console.log("Founder shared header verification passed");
