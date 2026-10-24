import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

// T-261012-029: 한국어/EN 전환 사전 누락 검사 — 본문 텍스트와 aria-label·alt·title·placeholder 의 한국어가 전부 사전 키여야 한다.
const dictSource = readFileSync(new URL("../i18n-en.js", import.meta.url), "utf8");
const dict = JSON.parse(dictSource.slice(dictSource.indexOf("{"), dictSource.lastIndexOf("}") + 1));
const decode = (s) => s.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
const norm = (s) => decode(s).replace(/\s+/g, " ").trim();
const bodyHtml = html.slice(html.indexOf("<body"), html.lastIndexOf("</body>")).replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
const koreanTexts = bodyHtml.replace(/<[^>]+>/g, "\u0000").split("\u0000").map(norm).filter((text) => /[가-힣]/.test(text));
const koreanAttrs = [...bodyHtml.matchAll(/\s(?:aria-label|alt|title|placeholder)="([^"]*)"/g)].map((match) => norm(match[1])).filter((text) => /[가-힣]/.test(text));
const missingEnglish = [...new Set([...koreanTexts, ...koreanAttrs])].filter((text) => !Object.prototype.hasOwnProperty.call(dict, text));

const checks = [
  {
    label: "founder hero introduces the maker and work direction",
    ok: /id="page-title"/.test(html) && /강대종이에요/.test(html) && /class="f-poster"/.test(html),
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
    label: "founder page links story, work and working approach",
    ok: ['story', 'work', 'approach'].every(id => html.includes(`id="${id}"`) && html.includes(`href="#${id}"`)),
  },
  {
    label: "renewed founder page explains operating loop",
    ok:
      /진행 중인 작업/.test(html) &&
      /작게 만든다/.test(html) &&
      /계속 본다/.test(html) &&
      /덜어낸다/.test(html),
  },
  {
    label: "renewed founder page links company, products, and worklog",
    ok:
      /href="https:\/\/kangdaejong\.com\/"[^>]*>회사홈/.test(html) &&
      /href="https:\/\/kangdaejong\.com\/work\/products\/"/.test(html) &&
      /href="https:\/\/kangdaejong\.com\/work\/worklog\/"[^>]*>작업일지/.test(html),
  },
  {
    label: "renewed founder page keeps shared chrome",
    ok:
      /<script src="https:\/\/kangdaejong\.com\/mb-components\.js" defer><\/script>/.test(html) &&
      /<mb-header active="founder" tone="studio" lang-toggle><\/mb-header>/.test(html) &&
      /<mb-footer tone="studio"><\/mb-footer>/.test(html),
  },
  {
    label: `every Korean string on the page has an English entry in i18n-en.js${missingEnglish.length ? ` (missing ${missingEnglish.length}: ${missingEnglish.slice(0, 3).join(" | ")})` : ""}`,
    ok: koreanTexts.length > 0 && missingEnglish.length === 0,
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
