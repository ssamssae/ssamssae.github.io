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
    label: "founder page uses monochrome palette with CTA accent",
    ok:
      /--bg:#ffffff;/.test(html) &&
      /--fg:#111111;/.test(html) &&
      /--accent:#2563eb;/.test(html) &&
      !/#00e5ff|#00b8d4|#ff00aa|#0a0a0a/.test(html),
  },
  {
    label: "founder CTA points work root as 작업장",
    ok:
      /<a class="cta-card reveal" href="https:\/\/work\.kangdaejong\.com\/"[^>]*>/.test(html) &&
      /<div class="cta-title">작업장<\/div>/.test(html) &&
      /제품·작업일지·뉴스레터·인사이트 아카이브/.test(html),
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
