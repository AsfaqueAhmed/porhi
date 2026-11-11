# Physics Chapter 12 (SSC) — 3-Topic Separation Design

**Goal:** Align SSC Physics Chapter 12 (`দ্বাদশ অধ্যায়: বিদ্যুতের চৌম্বক ক্রিয়া / Magnetic Effects of Current`) 1-to-1 into **3 topics (`12.1`–`12.3`)** across `curriculum-data.ts`, `seed-chapter-12.ts`, all 80 verified questions (`seed-chapter-12-questions*.ts`), and the 3 draft HTML sections (`drafts/physics-chapter-12/section-01.html`–`section-03.html`).

## Current Mismatch

- `drafts/physics-chapter-12/` organizes Chapter 12 into the 3 textbook main sections (`12.1` in `section-01.html`, `12.2` in `section-02.html`, and `12.3` in `section-03.html`).
- `curriculum-data.ts` and `seed-chapter-12.ts` had 4 topics (`12.1`, `12.2.1–12.2.2`, `12.2.3–12.2.4`, `12.3`), splitting `12.2` across two topics while giving `12.3` the ID `ch12_4`.

## Approved 3-Topic Structure (`12.1`–`12.3`)

| Order | Topic ID | Lesson ID | Title (Bangla / English) | Interactive Widget |
| --- | --- | --- | --- | --- |
| 1 | `top_ssc_physics_ch12_1` | `les_ssc_physics_ch12_1` | ১২.১ চুম্বক, চৌম্বক ক্ষেত্র ও বলরেখা (Magnet, Field & Field Lines) | — |
| 2 | `top_ssc_physics_ch12_2` | `les_ssc_physics_ch12_2` | ১২.২ বিদ্যুতের চৌম্বক ক্রিয়া, তড়িৎচুম্বক ও DC মোটর (Electromagnetism & DC Motor Lab) | `/uploads/interactive/electromagnet-motor-lab.html` |
| 3 | `top_ssc_physics_ch12_3` | `les_ssc_physics_ch12_3` | ১২.৩ তড়িৎচৌম্বকীয় আবেশ, জেনারেটর ও ট্রান্সফরমার (Induction, Generator & Transformer Lab) | `/uploads/interactive/induction-transformer-lab.html` |

## Notes

- Normalize `interactiveWidgetUrl: lessonData.interactiveWidgetUrl ?? null` in `upsertTopicAndLesson`.
- Upsert all 80 questions (`17 + 37 + 26 = 80`) before removing stale `les_ssc_physics_ch12_4` / `top_ssc_physics_ch12_4` rows from PostgreSQL so no foreign key violation occurs.
- Preserve existing `drafts/physics-chapter-12/index.html` and `section-01..03.html`.
