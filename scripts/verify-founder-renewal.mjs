import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

const checks = [
  {
    label: "renewed founder hero uses split hero shell",
    ok:
      /<section class="hero"[^>]*aria-labelledby="page-title"/.test(html) &&
      /<div class="hero-inner">/.test(html) &&
      /<h1 id="page-title">강대종<\/h1>/.test(html),
  },
  {
    label: "renewed founder page keeps profile media in first viewport",
    ok:
      /<img class="portrait-image" src="\.\/profile\.jpg" alt="강대종 프로필 사진"/.test(html) &&
      /<img class="namecard-image" src="\.\/namecard\.png" alt="강대종 · 마이너스베타스튜디오 명함"/.test(html),
  },
  {
    label: "renewed founder page has proof strip",
    ok:
      /<section class="proof-strip" aria-label="대표 소개 요약">/.test(html) &&
      /LIVE APPS/.test(html) &&
      /WORKLOG/.test(html) &&
      /OPEN TOOLS/.test(html),
  },
  {
    label: "renewed founder page explains operating loop",
    ok:
      /OPERATING LOOP/.test(html) &&
      /작게 만든다/.test(html) &&
      /계속 본다/.test(html) &&
      /덜어낸다/.test(html),
  },
  {
    label: "renewed founder page links company, products, and worklog",
    ok:
      /href="https:\/\/kangdaejong\.com\/"[^>]*>회사홈/.test(html) &&
      /href="https:\/\/work\.kangdaejong\.com\/products\/"[^>]*>제품 보기/.test(html) &&
      /href="https:\/\/work\.kangdaejong\.com\/worklog\/"[^>]*>작업일지/.test(html),
  },
  {
    label: "renewed founder page keeps shared chrome",
    ok:
      /<script src="https:\/\/kangdaejong\.com\/mb-components\.js" defer><\/script>/.test(html) &&
      /<mb-header active="founder"><\/mb-header>/.test(html) &&
      /<mb-footer><\/mb-footer>/.test(html),
  },
];

const failures = checks.filter((check) => !check.ok);

if (failures.length > 0) {
  console.error("Founder renewal verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure.label}`);
  }
  process.exit(1);
}

console.log("Founder renewal verification passed");
