# Physics Chapter 12 (3-Topic) Refactor Implementation Plan

1. **Update Frontend Curriculum Metadata**
   - Edit `apps/web/src/lib/curriculum-data.ts` (`chap_ssc_physics_ch12.topics`) to define 3 topics `top_ssc_physics_ch12_1..3` (`orderIndex: 1..3`) matching `12.1`, `12.2`, and `12.3`.
2. **Update Database Seeder (`seed-chapter-12.ts`)**
   - Normalize `interactiveWidgetUrl: lessonData.interactiveWidgetUrl ?? null` in `upsertTopicAndLesson`.
   - Consolidate `les_ssc_physics_ch12_2` to cover `12.2` (`12.2.1` Solenoid, `12.2.2` Electromagnet, `12.2.3` Magnetic Force on Wire & Fleming's Left-Hand Rule, `12.2.4` DC Motor) with `/uploads/interactive/electromagnet-motor-lab.html`.
   - Move `12.3` (Electromagnetic Induction, Generator & Transformer) from `top_ssc_physics_ch12_4` / `les_ssc_physics_ch12_4` to `top_ssc_physics_ch12_3` / `les_ssc_physics_ch12_3` with `/uploads/interactive/induction-transformer-lab.html`.
   - After upserting all 80 questions, delete obsolete `top_ssc_physics_ch12_4` and its lesson so PostgreSQL contains exactly 3 topics for Chapter 12.
3. **Re-map All 80 Verified Questions**
   - Re-map `top_ssc_physics_ch12_3` -> `top_ssc_physics_ch12_2` (37 total for `12.2`) and `top_ssc_physics_ch12_4` -> `top_ssc_physics_ch12_3` (26 total for `12.3`), keeping `12.1` at 17 questions.
4. **Seed & Verify**
   - Verify `drafts/physics-chapter-12/` links, run `pnpm --filter api exec tsx prisma/seed-chapter-12.ts`, confirm PostgreSQL shows `DB topics: 3` and `80` total questions, and run `tsc --noEmit` + `api` and `web` test suites.
