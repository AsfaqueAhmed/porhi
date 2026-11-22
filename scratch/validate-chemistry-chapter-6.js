#!/usr/bin/env node

/**
 * Validation Script for SSC Chemistry Chapter 6
 * (মোলের ধারণা ও রাসায়নিক গণনা / Mole Concept & Chemical Calculation)
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');

const CH6_CONFIG = {
  chapter: 6,
  title: 'মোলের ধারণা ও রাসায়নিক গণনা (Mole Concept & Chemical Calculation)',
  draftDir: 'drafts/chemistry-chapter-6',
  sectionCount: 6,
  pageRange: [109, 141], // 33 pages
  simulationLab: 'apps/api/prisma/sample-simulations/mole-solution-preparation-lab.html',
  topicPrefix: 'top_ssc_chemistry_ch6_',
  seedFiles: {
    curriculum: 'apps/api/prisma/seed-chemistry-chapter-6.ts',
    batch1: 'apps/api/prisma/seed-chemistry-chapter-6-questions.ts',
    batch2: 'apps/api/prisma/seed-chemistry-chapter-6-questions-batch2.ts',
    batch3: 'apps/api/prisma/seed-chemistry-chapter-6-questions-batch3.ts',
  },
};

/**
 * Validate LaTeX math delimiters ($ and $$) and matched braces in any text string.
 */
function validateLatexString(str, contextPath) {
  const errors = [];
  if (typeof str !== 'string' || !str) return errors;

  const clean = str.replace(/\\\$/g, '');

  // 1. Check double dollar $$ balance
  const ddMatches = clean.match(/\$\$/g) || [];
  if (ddMatches.length % 2 !== 0) {
    errors.push(`Unbalanced $$ block math delimiters (${ddMatches.length} found) in ${contextPath}`);
  }

  // Check braces inside $$...$$ blocks
  const blockRegex = /\$\$([\s\S]*?)\$\$/g;
  let match;
  while ((match = blockRegex.exec(clean)) !== null) {
    const math = match[1].replace(/\\\{|\\\}/g, '');
    const openBraces = (math.match(/\{/g) || []).length;
    const closeBraces = (math.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push(`Unmatched curly braces in block math ($$${match[1]}$$): ${openBraces} open vs ${closeBraces} close in ${contextPath}`);
    }
  }

  // Remove valid $$...$$ blocks to isolate single dollar inline math
  const withoutBlocks = clean.replace(/\$\$[\s\S]*?\$\$/g, '');

  // 2. Check single dollar $ balance
  const singleMatches = withoutBlocks.match(/\$/g) || [];
  if (singleMatches.length % 2 !== 0) {
    errors.push(`Unbalanced $ inline math delimiters (${singleMatches.length} found) in ${contextPath}`);
  }

  // Check braces inside $...$ inline math
  const inlineRegex = /\$([^\$]+?)\$/g;
  while ((match = inlineRegex.exec(withoutBlocks)) !== null) {
    const math = match[1].replace(/\\\{|\\\}/g, '');
    const openBraces = (math.match(/\{/g) || []).length;
    const closeBraces = (math.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push(`Unmatched curly braces in inline math ($${match[1]}$): ${openBraces} open vs ${closeBraces} close in ${contextPath}`);
    }
  }

  return errors;
}

/**
 * Validate a single Question object
 */
function validateQuestion(q, idx) {
  const errors = [];
  const qId = q.id || `[question-index-${idx}]`;

  if (!q.id || typeof q.id !== 'string') {
    errors.push(`${qId}: Missing or invalid 'id'`);
  }

  if (!q.topicId || !q.topicId.startsWith('top_ssc_chemistry_ch6_')) {
    errors.push(`${qId}: Invalid topicId '${q.topicId}', must start with top_ssc_chemistry_ch6_`);
  }

  if (q.type !== 'MCQ' && q.type !== 'CQ_CREATIVE') {
    errors.push(`${qId}: Invalid type '${q.type}'. Expected 'MCQ' or 'CQ_CREATIVE'`);
  }

  if (!q.stem || typeof q.stem !== 'string' || q.stem.trim().length === 0) {
    errors.push(`${qId}: Missing or empty 'stem'`);
  }

  if (!q.explanation || typeof q.explanation !== 'object') {
    errors.push(`${qId}: Missing 'explanation' object`);
  } else {
    if (!q.explanation.directAnswer || typeof q.explanation.directAnswer !== 'string') {
      errors.push(`${qId}: explanation.directAnswer missing or empty`);
    }
    if (!q.explanation.coreConcept || typeof q.explanation.coreConcept !== 'string') {
      errors.push(`${qId}: explanation.coreConcept missing or empty`);
    }
  }

  // Type-specific validations
  if (q.type === 'MCQ') {
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`${qId}: MCQ must have exactly 4 options (found ${q.options ? q.options.length : 0})`);
    } else {
      const correctCount = q.options.filter(o => o.isCorrect === true).length;
      if (correctCount !== 1) {
        errors.push(`${qId}: MCQ must have exactly 1 correct option (found ${correctCount})`);
      }

      const optIds = new Set();
      const incorrectIds = [];
      q.options.forEach((opt, oIdx) => {
        if (!opt.id) errors.push(`${qId}: Option ${oIdx} missing id`);
        if (optIds.has(opt.id)) errors.push(`${qId}: Duplicate option id '${opt.id}'`);
        optIds.add(opt.id);
        if (!opt.text || typeof opt.text !== 'string' || opt.text.trim().length === 0) {
          errors.push(`${qId}: Option '${opt.id}' has empty text`);
        }
        if (!opt.isCorrect) incorrectIds.push(opt.id);
      });

      // Distractor analysis check
      if (!q.explanation.distractorAnalysis || typeof q.explanation.distractorAnalysis !== 'object') {
        errors.push(`${qId}: MCQ missing explanation.distractorAnalysis`);
      } else {
        incorrectIds.forEach(incId => {
          const reason = q.explanation.distractorAnalysis[incId];
          if (!reason || typeof reason !== 'string' || reason.trim().length === 0) {
            errors.push(`${qId}: Missing or empty distractorAnalysis for incorrect option '${incId}'`);
          }
        });
      }

      // Non-empty stepDerivation check
      if (!q.explanation.stepDerivation || typeof q.explanation.stepDerivation !== 'string' || q.explanation.stepDerivation.trim().length === 0) {
        errors.push(`${qId}: MCQ explanation.stepDerivation must be non-empty`);
      }
    }
  } else if (q.type === 'CQ_CREATIVE') {
    if (q.options !== null && q.options !== undefined) {
      errors.push(`${qId}: CQ_CREATIVE options must be null`);
    }

    if (!q.cqRubric || typeof q.cqRubric !== 'object') {
      errors.push(`${qId}: CQ_CREATIVE missing cqRubric`);
    } else {
      const tiers = ['ka', 'kha', 'ga', 'gha'];
      const expectedMarks = { ka: 1, kha: 2, ga: 3, gha: 4 };
      tiers.forEach(tier => {
        const item = q.cqRubric[tier];
        if (!item) {
          errors.push(`${qId}: cqRubric missing tier '${tier}'`);
        } else {
          if (item.mark !== expectedMarks[tier]) {
            errors.push(`${qId}: cqRubric.${tier}.mark is ${item.mark}, expected ${expectedMarks[tier]}`);
          }
          if (!item.criteria || typeof item.criteria !== 'string' || item.criteria.trim().length === 0) {
            errors.push(`${qId}: cqRubric.${tier}.criteria is missing or empty`);
          }
        }
      });
    }
  }

  // Check LaTeX in Question fields
  const latexStrings = [
    { str: q.stem, field: 'stem' },
    { str: q.explanation?.directAnswer, field: 'explanation.directAnswer' },
    { str: q.explanation?.coreConcept, field: 'explanation.coreConcept' },
    { str: q.explanation?.stepDerivation, field: 'explanation.stepDerivation' },
  ];

  if (Array.isArray(q.options)) {
    q.options.forEach(o => latexStrings.push({ str: o.text, field: `option(${o.id}).text` }));
  }

  latexStrings.forEach(({ str, field }) => {
    if (str) {
      const lErrors = validateLatexString(str, `${qId} -> ${field}`);
      errors.push(...lErrors);
    }
  });

  return errors;
}

/**
 * Load questions using tsx
 */
function loadQuestionsWithTsx(batchRelativePaths) {
  const runnerScript = `
    import { chemistryChapter6QuestionsBatch1 } from './seed-chemistry-chapter-6-questions';
    import { chemistryChapter6QuestionsBatch2 } from './seed-chemistry-chapter-6-questions-batch2';
    import { chemistryChapter6QuestionsBatch3 } from './seed-chemistry-chapter-6-questions-batch3';

    const all = [
      ...chemistryChapter6QuestionsBatch1,
      ...chemistryChapter6QuestionsBatch2,
      ...chemistryChapter6QuestionsBatch3,
    ];
    console.log(JSON.stringify(all));
  `;

  const tmpScriptPath = path.join(REPO_ROOT, 'apps/api/prisma', '_tmp_load_ch6_questions.ts');
  fs.writeFileSync(tmpScriptPath, runnerScript, 'utf8');

  const tsxBin = path.join(REPO_ROOT, 'apps/api/node_modules/.bin/tsx');

  try {
    let res;
    if (fs.existsSync(tsxBin)) {
      res = spawnSync(tsxBin, [tmpScriptPath], {
        cwd: path.join(REPO_ROOT, 'apps/api/prisma'),
        encoding: 'utf8',
        maxBuffer: 50 * 1024 * 1024,
      });
    } else {
      res = spawnSync('npx', ['--prefix', 'apps/api', 'tsx', tmpScriptPath], {
        cwd: path.join(REPO_ROOT, 'apps/api/prisma'),
        encoding: 'utf8',
        maxBuffer: 50 * 1024 * 1024,
      });
    }

    if (res.error) throw res.error;
    if (res.status !== 0) throw new Error(res.stderr || `Exit status ${res.status}`);

    const parsed = JSON.parse(res.stdout.trim());
    return parsed;
  } finally {
    if (fs.existsSync(tmpScriptPath)) {
      fs.unlinkSync(tmpScriptPath);
    }
  }
}

function main() {
  console.log(`\n======================================================================`);
  console.log(`SSC Chemistry Chapter 6 (মোলের ধারণা ও রাসায়নিক গণনা) Validation`);
  console.log(`======================================================================\n`);

  const fileErrors = [];
  const latexErrors = [];
  const schemaErrors = [];

  // 1. Simulation Lab Check
  const simPath = path.join(REPO_ROOT, CH6_CONFIG.simulationLab);
  if (!fs.existsSync(simPath)) {
    fileErrors.push(`Simulation lab missing: ${CH6_CONFIG.simulationLab}`);
  } else {
    const simContent = fs.readFileSync(simPath, 'utf8');
    // Check NO external runtime scripts
    const externalScriptMatches = simContent.match(/<script[^>]+src=["']http[^"']+["'][^>]*>/gi);
    if (externalScriptMatches) {
      fileErrors.push(`Simulation lab contains external runtime scripts: ${externalScriptMatches.join(', ')}`);
    }
    // Check key features
    if (!simContent.includes('Volumetric Flask') && !simContent.includes('মাপক ফ্লাস্ক')) {
      fileErrors.push('Simulation lab missing volumetric flask concept');
    }
    if (!simContent.includes('Dilution') && !simContent.includes('লঘুকরণ')) {
      fileErrors.push('Simulation lab missing dilution calculator');
    }
    if (!simContent.includes('Limiting') && !simContent.includes('লিমিটিং')) {
      fileErrors.push('Simulation lab missing limiting reactant simulator');
    }
    console.log(`- Simulation Lab:  ✅ Passed (${CH6_CONFIG.simulationLab})`);
  }

  // 2. Drafts & Scanned Pages Check
  const draftPath = path.join(REPO_ROOT, CH6_CONFIG.draftDir);
  const stylesPath = path.join(draftPath, 'styles.css');
  const indexPath = path.join(draftPath, 'index.html');
  const sourcePath = path.join(draftPath, 'chapter-source.html');

  if (!fs.existsSync(stylesPath)) fileErrors.push(`styles.css missing in ${CH6_CONFIG.draftDir}`);
  if (!fs.existsSync(indexPath)) fileErrors.push(`index.html missing in ${CH6_CONFIG.draftDir}`);
  if (!fs.existsSync(sourcePath)) fileErrors.push(`chapter-source.html missing in ${CH6_CONFIG.draftDir}`);

  // Check 33 pages in pages/
  const [pStart, pEnd] = CH6_CONFIG.pageRange;
  let missingPages = 0;
  for (let p = pStart; p <= pEnd; p++) {
    const pPath = path.join(draftPath, 'pages', `p${p}.jpg`);
    if (!fs.existsSync(pPath)) {
      missingPages++;
    }
  }
  if (missingPages > 0) {
    fileErrors.push(`${missingPages} scanned pages missing in ${CH6_CONFIG.draftDir}/pages/`);
  }

  // Check 6 sections
  for (let s = 1; s <= CH6_CONFIG.sectionCount; s++) {
    const sName = `section-0${s}.html`;
    const sPath = path.join(draftPath, sName);
    if (!fs.existsSync(sPath)) {
      fileErrors.push(`Section file missing: ${sName}`);
    } else {
      const content = fs.readFileSync(sPath, 'utf8');
      const requiredSnippets = [
        { name: 'learning goals (.goal)', match: 'goal' },
        { name: 'term cards (.term)', match: 'term' },
        { name: 'worked example (.worked)', match: 'worked' },
        { name: 'memory aid (.memory)', match: 'memory' },
        { name: 'self check (.check)', match: 'check' },
        { name: 'simulation lab embed (.lab)', match: 'lab' },
      ];
      requiredSnippets.forEach(req => {
        if (!content.includes(req.match)) {
          fileErrors.push(`${sName} missing required pedagogical component: ${req.name}`);
        }
      });

      // LaTeX validation in section
      const lErrors = validateLatexString(content, sName);
      latexErrors.push(...lErrors);
    }
  }
  console.log(`- Drafts & Pages:  ${fileErrors.length === 0 ? '✅ Passed' : '❌ Failed (' + fileErrors.length + ' errors)'}`);

  // 3. Database Seed Files & Schema Checks
  const seedFiles = CH6_CONFIG.seedFiles;
  for (const [key, relPath] of Object.entries(seedFiles)) {
    const fullPath = path.join(REPO_ROOT, relPath);
    if (!fs.existsSync(fullPath)) {
      fileErrors.push(`Seed file missing: ${relPath}`);
    }
  }

  let questions = [];
  try {
    questions = loadQuestionsWithTsx([seedFiles.batch1, seedFiles.batch2, seedFiles.batch3]);
  } catch (err) {
    schemaErrors.push(`Failed to load questions: ${err.message}`);
  }

  const questionCount = questions.length;
  const mcqCount = questions.filter(q => q.type === 'MCQ').length;
  const cqCount = questions.filter(q => q.type === 'CQ_CREATIVE').length;

  if (questionCount !== 72) {
    schemaErrors.push(`Expected exactly 72 questions, found ${questionCount}`);
  }
  if (mcqCount !== 54) {
    schemaErrors.push(`Expected exactly 54 MCQs, found ${mcqCount}`);
  }
  if (cqCount !== 18) {
    schemaErrors.push(`Expected exactly 18 CQs, found ${cqCount}`);
  }

  // Validate each question
  questions.forEach((q, idx) => {
    const qErrors = validateQuestion(q, idx);
    schemaErrors.push(...qErrors);
  });

  console.log(`- Database Seeds:  ${schemaErrors.length === 0 ? '✅ Passed' : '❌ Failed (' + schemaErrors.length + ' errors)'}`);
  console.log(`- Questions:       ${questionCount} Total (${mcqCount} MCQs, ${cqCount} CQs) - ${schemaErrors.length === 0 ? '✅ Passed' : '❌ Failed'}`);
  console.log(`- LaTeX Balance:   ${latexErrors.length === 0 ? '✅ Passed' : '❌ ' + latexErrors.length + ' Delimiter Errors'}`);

  const totalErrors = [...fileErrors, ...schemaErrors, ...latexErrors];
  if (totalErrors.length > 0) {
    console.log(`\n❌ Validation failed with ${totalErrors.length} errors:`);
    totalErrors.slice(0, 30).forEach(err => console.log(`  ❌ ${err}`));
    if (totalErrors.length > 30) {
      console.log(`  ... and ${totalErrors.length - 30} more errors`);
    }
    process.exit(1);
  } else {
    console.log(`\n======================================================================`);
    console.log(`🎉 SSC Chemistry Chapter 6 complete validation passed with 100% success!`);
    console.log(`======================================================================\n`);
    process.exit(0);
  }
}

main();
