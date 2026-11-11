# Physics Chapter 11 Topic Separation Implementation Plan

1. **Update Frontend Curriculum Metadata**
   - Edit `apps/web/src/lib/curriculum-data.ts` (`chap_ssc_physics_ch11.topics`) to define all 6 granular topics `top_ssc_physics_ch11_1..6` (`orderIndex: 1..6`).
2. **Update Database Seeder (`seed-chapter-11.ts`)**
   - Normalize `interactiveWidgetUrl: lessonData.interactiveWidgetUrl ?? null` in `upsertTopicAndLesson`.
   - Split the 4 merged lessons into 6 dedicated topic + lesson pairs (`11.1`–`11.6`), keeping `/uploads/interactive/ohms-law-circuit-lab.html` on `les_ssc_physics_ch11_2` and `/uploads/interactive/electric-power-billing-lab.html` on `les_ssc_physics_ch11_3`.
3. **Re-map All 80 Verified Questions**
   - Update `topicId` across `seed-chapter-11-questions.ts`, `seed-chapter-11-questions-batch2.ts`, and `seed-chapter-11-questions-batch3.ts` (`11.1`: 11, `11.2`: 25, `11.3`: 22, `11.4`: 6, `11.5`: 8, `11.6`: 8).
4. **Seed & Verify**
   - Run `pnpm --filter api exec tsx prisma/seed-chapter-11.ts` and inspect live PostgreSQL counts for `chap_ssc_physics_ch11`.
   - Run `pnpm --filter api exec tsc --noEmit`, `pnpm --filter web exec tsc --noEmit`, `pnpm --filter api test`, and `pnpm --filter web test`.
