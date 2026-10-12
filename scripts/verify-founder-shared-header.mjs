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
    // T-261012-024: 작업장·회사홈과 같은 톤 — 기본은 라이트, 기기 설정이 다크면 같은 다크 팔레트(#121519).
    label: "founder page follows workshop chrome (light default + device dark)",
    ok:
      /color-scheme:light/.test(css) &&
      /<html lang="ko" data-theme="auto">/.test(html) &&
      /name="theme-color" content="#ffffff"/.test(html) &&
      /name="theme-color" content="#121519" media="\(prefers-color-scheme: dark\)"/.test(html) &&
      /html\[data-theme="auto"\]\{color-scheme:dark;--bg:#121519/.test(css) &&
      /--mb-host-bg:#121519/.test(css) &&
      !/color-scheme:dark/.test(html) &&
      !/#08090A|#7170FF/.test(html + css),
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
