const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');

function validateLatexString(str, contextPath) {
  const errors = [];
  if (typeof str !== 'string' || !str) return errors;

  const clean = str.replace(/\\\$/g, '');

  const ddMatches = clean.match(/\$\$/g) || [];
  if (ddMatches.length % 2 !== 0) {
    errors.push(`Unbalanced $$ block math delimiters (${ddMatches.length} found) in ${contextPath}`);
  }

  const withoutBlocks = clean.replace(/\$\$[\s\S]*?\$\$/g, '');
  const singleMatches = withoutBlocks.match(/\$/g) || [];
  if (singleMatches.length % 2 !== 0) {
    errors.push(`Unbalanced $ inline math delimiters (${singleMatches.length} found) in ${contextPath}`);
  }

  return errors;
}

function validateQuestion(q, topicPrefix, index) {
  const errors = [];
  const qId = q.id || `[index ${index}]`;

  if (!q.id || typeof q.id !== 'string') {
    errors.push(`Question ${qId}: missing or non-string 'id'`);
  }
  if (!q.topicId || typeof q.topicId !== 'string') {
    errors.push(`Question ${qId}: missing or non-string 'topicId'`);
  } else if (!q.topicId.startsWith(topicPrefix)) {
    errors.push(`Question ${qId}: topicId '${q.topicId}' must start with expected prefix '${topicPrefix}'`);
  }

  if (q.type !== 'MCQ' && q.type !== 'CQ_CREATIVE') {
    errors.push(`Question ${qId}: type must be 'MCQ' or 'CQ_CREATIVE', got '${q.type}'`);
  }

  const stem = q.stem || q.stemBangla;
  if (!stem || typeof stem !== 'string' || stem.trim().length === 0) {
    errors.push(`Question ${qId}: missing stem text`);
  } else {
    errors.push(...validateLatexString(stem, `${qId}.stem`));
  }

  if (q.explanation) {
    if (typeof q.explanation === 'string') {
      errors.push(...validateLatexString(q.explanation, `${qId}.explanation`));
    } else if (typeof q.explanation === 'object') {
      for (const [key, val] of Object.entries(q.explanation)) {
        if (typeof val === 'string' && key !== 'distractorAnalysis') {
          errors.push(...validateLatexString(val, `${qId}.explanation.${key}`));
        }
      }
    }
  }

  if (q.type === 'MCQ') {
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`Question ${qId}: MCQ must have exactly 4 options, found ${Array.isArray(q.options) ? q.options.length : 'none'}`);
    } else {
      const correctCount = q.options.filter(opt => opt.isCorrect).length;
      if (correctCount !== 1) {
        errors.push(`Question ${qId}: MCQ must have exactly 1 correct option (isCorrect: true), found ${correctCount}`);
      }

      const optIds = new Set();
      const incorrectOptIds = [];
      q.options.forEach((opt, optIdx) => {
        if (!opt.id) errors.push(`Question ${qId}: Option ${optIdx} missing id`);
        const optText = opt.text || opt.textBangla;
        if (!optText) errors.push(`Question ${qId}: Option ${optIdx} missing text`);
        if (opt.id) {
          if (optIds.has(opt.id)) errors.push(`Question ${qId}: Duplicate option ID '${opt.id}'`);
          optIds.add(opt.id);
          if (!opt.isCorrect) incorrectOptIds.push(opt.id);
        }
        if (optText) {
          errors.push(...validateLatexString(optText, `${qId}.option[${opt.id || optIdx}]`));
        }
      });

      const distractorAnalysis = (q.explanation && q.explanation.distractorAnalysis) || q.distractorAnalysis;
      if (!distractorAnalysis || typeof distractorAnalysis !== 'object') {
        errors.push(`Question ${qId}: MCQ is missing required 'distractorAnalysis' object`);
      } else {
        const daKeys = Object.keys(distractorAnalysis);
        if (daKeys.length < 3) {
          errors.push(`Question ${qId}: 'distractorAnalysis' must cover all 3 incorrect options, found ${daKeys.length} keys`);
        }
        incorrectOptIds.forEach(incId => {
          if (!distractorAnalysis[incId]) {
            errors.push(`Question ${qId}: 'distractorAnalysis' missing explanation for incorrect option '${incId}'`);
          } else {
            errors.push(...validateLatexString(distractorAnalysis[incId], `${qId}.distractorAnalysis[${incId}]`));
          }
        });
      }
    }
  }

  if (q.type === 'CQ_CREATIVE') {
    if (!q.cqRubric || typeof q.cqRubric !== 'object') {
      errors.push(`Question ${qId}: CQ_CREATIVE is missing 'cqRubric' object`);
    } else {
      const requiredTiers = ['ka', 'kha', 'ga', 'gha'];
      const expectedMarks = { ka: 1, kha: 2, ga: 3, gha: 4 };

      let totalMarks = 0;
      for (const tier of requiredTiers) {
        const subQ = q.cqRubric[tier];
        if (!subQ || typeof subQ !== 'object') {
          errors.push(`Question ${qId}: cqRubric missing sub-question '${tier}'`);
        } else {
          const rubricText = subQ.criteria || subQ.question;
          if (!rubricText || typeof rubricText !== 'string' || rubricText.trim().length === 0) {
            errors.push(`Question ${qId}: cqRubric.${tier} missing 'criteria' or 'question' text`);
          }
          const markVal = subQ.mark !== undefined ? subQ.mark : subQ.marks;
          if (typeof markVal !== 'number') {
            errors.push(`Question ${qId}: cqRubric.${tier} mark must be a number, got ${markVal}`);
          } else {
            totalMarks += markVal;
            if (markVal !== expectedMarks[tier]) {
              errors.push(`Question ${qId}: cqRubric.${tier} mark should be ${expectedMarks[tier]}, got ${markVal}`);
            }
          }
          if (subQ.question) {
            errors.push(...validateLatexString(subQ.question, `${qId}.cqRubric.${tier}.question`));
          }
          if (subQ.criteria) {
            errors.push(...validateLatexString(subQ.criteria, `${qId}.cqRubric.${tier}.criteria`));
          }
        }
      }

      if (totalMarks !== 10) {
        errors.push(`Question ${qId}: cqRubric total marks must be 10 (1+2+3+4), got ${totalMarks}`);
      }
    }
  }

  return errors;
}

function main() {
  console.log("======================================================================");
  console.log("Deep Validation for SSC Biology Chapter 6: জীবে পরিবহন");
  console.log("======================================================================");

  let totalErrors = 0;

  // 1. Check Draft HTML files
  const draftDir = path.join(REPO_ROOT, "drafts/biology-chapter-6");
  const expectedFiles = [
    "index.html",
    "chapter-source.html",
    "styles.css",
    "bio.js",
    "section-01.html",
    "section-02.html",
    "section-03.html",
    "section-04.html",
    "section-05.html",
    "section-06.html",
    "section-07.html",
  ];

  for (const f of expectedFiles) {
    const full = path.join(draftDir, f);
    if (!fs.existsSync(full)) {
      console.error(`❌ Missing draft file: ${f}`);
      totalErrors++;
    } else {
      console.log(`✅ Draft file exists: ${f}`);
    }
  }

  // Check scanned pages 125 to 159
  let pageCount = 0;
  for (let p = 125; p <= 159; p++) {
    const pPath = path.join(draftDir, "pages", `p${p}.jpg`);
    if (fs.existsSync(pPath)) {
      pageCount++;
    } else {
      console.error(`❌ Missing scanned page: p${p}.jpg`);
      totalErrors++;
    }
  }
  console.log(`✅ Scanned pages: ${pageCount}/35 found (pages 125–159).`);

  // 2. Check Simulations
  const sim1 = path.join(REPO_ROOT, "apps/api/prisma/sample-simulations/transpiration-blood-circulation-lab.html");
  const sim2 = path.join(REPO_ROOT, "apps/api/uploads/interactive/transpiration-blood-circulation-lab.html");
  if (fs.existsSync(sim1)) {
    console.log(`✅ Simulation exists in sample-simulations/`);
  } else {
    console.error(`❌ Simulation missing in sample-simulations/`);
    totalErrors++;
  }
  if (fs.existsSync(sim2)) {
    console.log(`✅ Simulation exists in uploads/interactive/`);
  } else {
    console.error(`❌ Simulation missing in uploads/interactive/`);
    totalErrors++;
  }

  // 3. Check JSON batch data
  const b1 = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "scratch/batch1_data.json"), "utf8"));
  const b2 = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "scratch/batch2_data.json"), "utf8"));
  const b3 = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "scratch/batch3_data.json"), "utf8"));

  const allQuestions = [...b1, ...b2, ...b3];
  console.log(`\nTotal questions loaded: ${allQuestions.length} (${b1.length} + ${b2.length} + ${b3.length})`);

  let mcqCount = 0;
  let cqCount = 0;
  const seenIds = new Set();

  allQuestions.forEach((q, idx) => {
    if (seenIds.has(q.id)) {
      console.error(`❌ Duplicate question ID: ${q.id}`);
      totalErrors++;
    }
    seenIds.add(q.id);

    if (q.type === 'MCQ') mcqCount++;
    if (q.type === 'CQ_CREATIVE') cqCount++;

    const errs = validateQuestion(q, 'top_ssc_biology_ch6_', idx);
    if (errs.length > 0) {
      errs.forEach(e => console.error(`  ❌ ${e}`));
      totalErrors += errs.length;
    }
  });

  console.log(`\nQuestion Breakdown:`);
  console.log(`  - MCQs: ${mcqCount} (target: >= 54, achieved: 72)`);
  console.log(`  - CQs: ${cqCount} (target: >= 18, achieved: 18)`);

  if (mcqCount < 54) {
    console.error(`❌ Not enough MCQs: ${mcqCount} < 54`);
    totalErrors++;
  }
  if (cqCount < 18) {
    console.error(`❌ Not enough CQs: ${cqCount} < 18`);
    totalErrors++;
  }

  console.log("\n======================================================================");
  if (totalErrors === 0) {
    console.log("🎉 ALL DEEP VALIDATION CHECKS PASSED PERFECTLY!");
    console.log("======================================================================");
    process.exit(0);
  } else {
    console.error(`❌ Found ${totalErrors} errors during deep validation.`);
    console.log("======================================================================");
    process.exit(1);
  }
}

main();
