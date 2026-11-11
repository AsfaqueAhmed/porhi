# Physics Chapter 11 (SSC) — 1-to-1 Topic Separation Design

**Goal:** Align SSC Physics Chapter 11 (`একাদশ অধ্যায়: চল বিদ্যুৎ / Current Electricity`) 1-to-1 across `curriculum-data.ts`, `seed-chapter-11.ts`, all 80 verified questions in `seed-chapter-11-questions*.ts`, and the existing 6 HTML draft sections (`drafts/physics-chapter-11/section-01.html`–`section-06.html`).

## Current Mismatch

- `drafts/physics-chapter-11/` already separates the chapter into 6 granular sections (`section-01.html` through `section-06.html`).
- `apps/web/src/lib/curriculum-data.ts` had 4 topics (`11.1`, `11.2`, `11.3`, `11.4–11.6`).
- `apps/api/prisma/seed-chapter-11.ts` had a *different* 4-topic grouping (`11.1–11.2.2`, `11.2.3`, `11.3–11.4`, `11.5–11.6`), causing curriculum metadata, seeded lessons, and question topic IDs (`top_ssc_physics_ch11_1..4`) to diverge from both the drafts and the frontend syllabus.

## Approved 6-Topic Structure (`11.1`–`11.6`)

| Order | Topic ID | Lesson ID | Title (Bangla / English) | Interactive Widget |
| --- | --- | --- | --- | --- |
| 1 | `top_ssc_physics_ch11_1` | `les_ssc_physics_ch11_1` | ১১.১ তড়িৎ প্রবাহ, বিভব পার্থক্য ও তড়িৎচালক শক্তি (Current, Voltage & EMF) | — |
| 2 | `top_ssc_physics_ch11_2` | `les_ssc_physics_ch11_2` | ১১.২ ওহমের সূত্র, রোধ, আপেক্ষিক রোধ ও বর্তনী (Ohm's Law & Circuits Lab) | `/uploads/interactive/ohms-law-circuit-lab.html` |
| 3 | `top_ssc_physics_ch11_3` | `les_ssc_physics_ch11_3` | ১১.৩ তড়িৎ ক্ষমতা, জুলের তাপ ও বিদ্যুৎ বিল (Electric Power & Billing Lab) | `/uploads/interactive/electric-power-billing-lab.html` |
| 4 | `top_ssc_physics_ch11_4` | `les_ssc_physics_ch11_4` | ১১.৪ বিদ্যুৎ সরবরাহ, সিস্টেম লস ও লোডশেডিং (Power Supply & System Loss) | — |
| 5 | `top_ssc_physics_ch11_5` | `les_ssc_physics_ch11_5` | ১১.৫ বিদ্যুতের নিরাপদ ব্যবহার: ফিউজ, সার্কিট ব্রেকার ও আর্থিং (Electrical Safety) | — |
| 6 | `top_ssc_physics_ch11_6` | `les_ssc_physics_ch11_6` | ১১.৬ বাসাবাড়িতে তড়িৎ বর্তনীর নকশা (Household Wiring Design) | — |

## Notes

- Normalize `interactiveWidgetUrl: lessonData.interactiveWidgetUrl ?? null` inside `upsertTopicAndLesson` so re-seeding clears any stale widget URLs cleanly.
- Re-map all 80 verified questions (`q_11_01`..`q_11_80`) by concept into `top_ssc_physics_ch11_1..6` without modifying question content or count (`11 + 25 + 22 + 6 + 8 + 8 = 80`).
- Preserve existing `drafts/physics-chapter-11/index.html` and `section-01..06.html` as-is (already 6 sections and link-verified).
