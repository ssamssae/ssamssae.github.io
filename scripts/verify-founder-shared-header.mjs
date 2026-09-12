import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

const checks = [
  {
    label: "founder page consumes shared header from kangdaejong.com",
    ok: /<script src="https:\/\/kangdaejong\.com\/mb-components\.js" defer><\/script>/.test(html),
  },
  {
    label: "founder page marks founder nav active",
    ok: /<mb-header active="founder"><\/mb-header>/.test(html),
  },
  {
    label: "founder page keeps representative title copy",
    ok:
      /<title>강대종 · 마이너스베타스튜디오 대표<\/title>/.test(html) &&
      /<meta property="og:title" content="강대종 · 마이너스베타스튜디오 대표"\/>/.test(html),
  },
  {
    label: "founder page uses workshop light chrome",
    ok:
      /color-scheme:light/.test(html) &&
      /name="theme-color" content="#f7f6f2"/.test(html) &&
      !/#08090A|#7170FF|color-scheme:dark/.test(html),
  },
  {
    label: "founder CTA points work root as 작업장",
    ok:
      /<a href="https:\/\/work\.kangdaejong\.com\/">\s*<span>WORKSPACE<\/span>\s*<strong>제품, 작업일지, 뉴스레터 허브<\/strong>\s*<em>작업장 →<\/em>\s*<\/a>/.test(html),
  },
  {
    label: "founder page no longer labels work root as 작업일지",
    ok: !/<div class="cta-title">작업일지<\/div>/.test(html),
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
