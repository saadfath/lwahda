# CONTENT_VERIFICATION — TAWḤDA content dataset

Research date: 27 October 2026. All sources below were opened during research unless marked otherwise.

## 1. Sources consulted and what each one supports

| ID | Source | Date | Claims it supports |
|---|---|---|---|
| `royal-office-ar` / `royal-office-fr` / `royal-office-en` | Royal Office statement on maroc.ma (via MAP), three language versions | 2025-11-04 | October 31 is a national holiday each year; named «Aid Al Wahda» / Fête de l'Unité / Unity Day, tied to national unity and territorial integrity; occasion on which the King grants a pardon; link to the "historic turning point" of the national Cause and Security Council Resolution 2797/2025; royal speeches on Throne Day and the opening of Parliament (AR: opening of the legislative year), with the King free to address the nation at other times; Green March 50th-anniversary celebrations proceed without a royal speech |
| `royal-speech-en` | "HM the King Delivers Speech to His Faithful People (Full Text)", maroc.ma | 2025-10-31 | King welcomed the resolution as a pivotal stage / decisive turning point; Morocco to update and detail the autonomy initiative and submit it to the UN; link to the 50th anniversary of the Green March and the 70th of independence |
| `telquel-speech` | TelQuel, full text of the speech (FR) | 2025-10-31 | Confirms the speech was delivered on Friday 31 October 2025, after the Security Council vote; same themes |
| `un-res-2797` | UN Digital Library record of S/RES/2797 (2025) | 2025-10-31 | Adopted at the 10030th meeting on 31 October 2025; vote 11 in favour, 0 against, 3 abstentions; extends MINURSO mandate until 31 October 2026 |
| `asil-minurso` | ASIL, "Security Council Renews MINURSO Mandate" | undated | Resolution emphasises Morocco's 2007 autonomy proposal as basis for talks; proposal presented to the Secretary-General on 11 April 2007 |
| `medias24-council` | Médias24, report of the Government Council of 15 January 2026 | 2026-01-16 | Council met Thursday 15 January; approved draft decrees n° 2.26.14 and n° 2.25.1140 implementing the royal decision; decree titles |
| `hespress-council-en` | Hespress English | undated | Cabinet chaired by PM Aziz Akhannouch approved two draft decrees on Thursday 15 January 2026 |
| `lematin-decrees` | Le Matin | 2026-01-15 | Decree numbers, the decrees they supplement (2.04.426 of 29 Dec 2004; 2.77.169 of 28 Feb 1977), presenting ministers |

Consulted but **not used** as a source for any claim:

- `https://alhoukouma.gov.ma/` — the page fetched is a Government Council news page and does not mention Unity Day, October 31 or Resolution 2797. No claim is attributed to it.
- Yabiladi, Morocco World News, Hespress (AR/FR), Wafir and similar outlets — read only to cross-check; not cited.
- Ministry of Foreign Affairs sites — not consulted; nothing in the content required them.

## 2. Verification status by file / major section

| File / section | Status | Notes |
|---|---|---|
| Observance date (31 Oct each year) and announcement date (4 Nov 2025) | **Verified** | Primary source, three languages |
| Name, pardon, speech occasions, Green March statement | **Verified** | Primary source. Arabic wording is a paraphrase |
| Resolution 2797: date, vote, MINURSO extension | **Verified** | UN Digital Library record |
| Autonomy-plan emphasis and 11 Apr 2007 date | **Verified (secondary)** | ASIL summary only; the resolution text itself was not read |
| Royal speech of 31 Oct 2025 | **Verified** | maroc.ma full text plus TelQuel. maroc.ma page text contains an internal date inconsistency (mentions "October 30"); the date of delivery was fixed from TelQuel and MAP publication date |
| Government Council, 15 Jan 2026, two draft decrees | **Verified (press)** | Three outlets agree. No official communiqué located |
| First observance on 31 Oct 2026 (Saturday) | **Educational explanation** | Calendar inference; labelled "شرح تعليمي / Explication pédagogique" in the text |
| Home page (AR/FR) | **Verified** | Every claim reuses facts above |
| Quiz (10 questions) | **Verified** | Each question has source IDs; each answer is stated in the sources |
| Hero image | **Not sourced** | See section 4 |

## 3. Unresolved issues (`needs_verification`)

1. **Publication of the decrees.** Whether decrees n° 2.26.14 and n° 2.25.1140 were finally adopted and published in the Bulletin officiel, and their entry-into-force date, could not be verified. The SGG Bulletin officiel site refused automated access (robots.txt), so no issue was read. A TelQuel headline says the Council "adopte définitivement", but the article body describes *projets de décret*; the content therefore says "approved two draft decrees" and makes no claim about paid-holiday status or entry into force. Check the Bulletin officiel (sgg.gov.ma) before adding any such claim.
2. **Resolution text.** The full text of S/RES/2797 was not read. The autonomy-plan wording rests on the ASIL summary and is attributed to it.
3. **Source metadata gaps.** `asil-minurso` and `hespress-council-en` have `publishedAt: null` because no publication date was visible. Titles of `asil-minurso`, `medias24-council` and `lematin-decrees` were taken from page content / URL slugs and should be checked against the live pages.
4. **Arabic renderings of decree titles and of the Royal Office statement** were translated from French/English reports and an English-language summary of the Arabic text. A native-speaker review against the original Arabic text is recommended, especially the phrases for «jours fériés chômés… services concédés» and the sentence on the meaning attributed to the occasion.
5. **Arabic month names.** The Moroccan forms «نونبر» and «دجنبر» are used, matching the official Arabic statement. Change if you prefer «نوفمبر/ديسمبر».
6. **Green March date (6 Nov 1975) and participant numbers** were deliberately left out: no official source was successfully opened for them.
7. **UN Digital Library URL** uses the `?ln=es` interface variant that was fetched; the metadata is in English. Swap to `?ln=en` if desired.

## 4. Image data

No image was downloaded or licensed. `hero.image.src`, `credit`, `sourceUrl` are `null`, `license` is `"needs_verification"` and `status` is `"pending_asset"`. The file provides Arabic and French alt text, a description of the intended visual (the Moroccan national flag against a clear sky, with free space for text) and a suggested filename (`hero-unity-day-moroccan-flag.jpg`). Wikimedia Commons could not be reached from the research tools, so no licence could be checked. Your frontend should handle `src: null` (render a fallback background).

## 5. Checks actually executed

A validation script was run (Python 3, `validate.py`, kept outside the repository). It passed with these checks:

- all 5 JSON files parse; no empty strings;
- AR and FR files have identical structure; section, timeline, key-fact, highlight and source IDs, dates, source IDs and URLs match across languages;
- IDs are unique within each collection; every `sourceIds` entry resolves to the manifest; no unused sources;
- all timeline dates are valid ISO dates and chronological; weekdays asserted: 2025-10-31 Friday, 2025-11-04 Tuesday, 2026-01-15 Thursday, 2026-10-31 Saturday;
- quiz: exactly 10 questions `q01`–`q10`, four options `a`–`d` each, distinct option text, source IDs present, no answer/explanation keys in `quiz.questions.json`;
- the SQL seed's question IDs, option IDs and source IDs match the quiz JSON exactly.

The SQL seed was also executed on a throwaway PostgreSQL 16 instance against the assumed `answer_keys` schema, run twice: 10 rows, no duplicates, all columns populated.

**Not executed:** no check against your real Supabase schema (the schema was assumed), no RTL rendering test, no spell-check or grammar-check tool for Arabic or French (the text was proofread by the author only).

## 6. Security note

Correct answers and explanations exist only in `supabase/seed/quiz-answers.sql`. Keep that file out of `src/` and `public/`, enable RLS on `answer_keys` with no policy for `anon`/`authenticated`, and grade through a server-side function.
