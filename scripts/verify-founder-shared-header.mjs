import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

const css = readFileSync(new URL("../renewal.css", import.meta.url), "utf8");
const checks = [
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
    // T-261013-004: 색(라이트·다크)·폭은 회사홈 공용 원본 하나 — 이 페이지는 그 파일을 읽고, 자체 색 값·theme-color 를 두지 않는다.
    label: "founder page reads the shared company tokens (light default + device dark)",
    ok:
      /<html lang="ko" data-theme="auto">/.test(html) &&
      /<link rel="stylesheet" href="https:\/\/kangdaejong\.com\/brand\/current\/tokens\.css"\/>/.test(html) &&
      html.indexOf("brand/current/tokens.css") < html.indexOf("./renewal.css") &&
      !/name="theme-color"/.test(html) &&
      !/prefers-color-scheme:\s*dark/.test(css) &&
      !/#08090A|#7170FF/.test(html + css),
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
    ok: /href="https:\/\/work\.kangdaejong\.com\/">작업장 둘러보기/.test(html),
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
