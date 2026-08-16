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
    // T-260816-006 — 아니키 지시(2026-08-16)로 대표 사진·명함을 공개면에서 내렸다.
    // 종전 검사는 그 둘이 "있어야 한다"고 강제했다. 의도가 뒤집혔으므로 검사도 뒤집는다.
    // ★명함이 사진보다 민감했다 — namecard.png 에 개인 휴대폰번호·사업장 주소가
    //   평문 이미지로 박혀 있었고 공개 URL 로 열려 있었다(얼굴이 없어 사진 축 점검에 안 걸림).
    // 이 검사는 실수로 되살아나는 것을 막는 가드다. 되돌리려면 아니키 재지시가 근거로 필요하다.
    label: "founder page must not expose profile photo or namecard",
    ok:
      !/profile\.jpg/.test(html) &&
      !/namecard\.png/.test(html) &&
      !/class="portrait-image"/.test(html) &&
      !/class="namecard-image"/.test(html),
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
