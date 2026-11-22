#!/usr/bin/env node

/**
 * Validation Harness for SSC Chemistry Wave 1 (Chapters 1–3)
 *
 * Verifies:
 * 1. Existence and structure of interactive HTML drafts (index, sections, styles, chapter-source, scanned pages).
 * 2. Existence and validity of elevated simulation labs in apps/api/prisma/sample-simulations/.
 * 3. Existence of database seed and question batch files (seed-chemistry-chapter-X.ts, ...-questions.ts, ...-batch2.ts, ...-batch3.ts).
 * 4. Question schema integrity (id, topicId, type, stem/stemBangla, options, explanation, cqRubric).
 * 5. Question counts (>= 72 total per chapter: >= 54 MCQs, >= 18 CQs).
 * 6. MCQ distractor analysis completeness (all 3 incorrect options analyzed).
 * 7. 4-tier CQ rubrics (ka, kha, ga, gha with marks 1, 2, 3, 4 totaling 10).
 * 8. Balanced LaTeX delimiters ($ and $$) and matched braces in questions and drafts.
 *
 * Usage:
 *   node scratch/validate-chemistry-wave-1.js
 *   node scratch/validate-chemistry-wave-1.js --chapter <1|2|3>
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');

// Chapter Configurations for Wave 1
const CHAPTER_CONFIGS = {
  1: {
    chapter: 1,
    title: 'রসায়নের ধারণা (Concepts of Chemistry)',
    draftDir: 'drafts/chemistry-chapter-1',
    sectionCount: 6,
    pageRange: [1, 16],
    simulationLab: 'apps/api/prisma/sample-simulations/lab-safety-hazard-symbols.html',
    topicPrefix: 'top_ssc_chemistry_ch1_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-chemistry-chapter-1.ts',
      batch1: 'apps/api/prisma/seed-chemistry-chapter-1-questions.ts',
      batch2: 'apps/api/prisma/seed-chemistry-chapter-1-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-chemistry-chapter-1-questions-batch3.ts',
    },
  },
  2: {
    chapter: 2,
    title: 'পদার্থের অবস্থা (States of Matter)',
    draftDir: 'drafts/chemistry-chapter-2',
    sectionCount: 6,
    pageRange: [17, 34],
    simulationLab: 'apps/api/prisma/sample-simulations/diffusion-states-of-matter-lab.html',
    topicPrefix: 'top_ssc_chemistry_ch2_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-chemistry-chapter-2.ts',
      batch1: 'apps/api/prisma/seed-chemistry-chapter-2-questions.ts',
      batch2: 'apps/api/prisma/seed-chemistry-chapter-2-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-chemistry-chapter-2-questions-batch3.ts',
    },
  },
  3: {
    chapter: 3,
    title: 'পদার্থের গঠন (Structure of Matter)',
    draftDir: 'drafts/chemistry-chapter-3',
    sectionCount: 8,
    pageRange: [35, 58],
    simulationLab: 'apps/api/prisma/sample-simulations/bohr-atom-electron-config-lab.html',
    topicPrefix: 'top_ssc_chemistry_ch3_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-chemistry-chapter-3.ts',
      batch1: 'apps/api/prisma/seed-chemistry-chapter-3-questions.ts',
      batch2: 'apps/api/prisma/seed-chemistry-chapter-3-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-chemistry-chapter-3-questions-batch3.ts',
    },
  },
};

/**
 * Validate LaTeX math delimiters ($ and $$) and matched braces in any text string.
 */
function validateLatexString(str, contextPath) {
  const errors = [];
  if (typeof str !== 'string' || !str) return errors;

  // Remove escaped dollar signs (\$ is an escaped character, not a delimiter)
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
 * Validate LaTeX delimiters in HTML draft files (stripping script & style blocks).
 */
function validateHtmlDraftLatex(filePath, relativePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');

  // Strip script, style, and HTML comments before checking math delimiters
  const clean = content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  return validateLatexString(clean, relativePath);
}

/**
 * Loads question objects from TypeScript files using tsx in a child process.
 */
function loadQuestionsWithTsx(batchFiles) {
  const tsxBin = path.join(REPO_ROOT, 'apps/api/node_modules/.bin/tsx');
  const code = `
    import { pathToFileURL } from 'url';
    import path from 'path';

    function extractQuestionsFromExports(mod) {
      const sources = [mod, mod?.default, mod?.['module.exports']].filter(Boolean);
      const seenArrays = new Set();
      const found = [];
      for (const src of sources) {
        if (typeof src === 'object') {
          for (const val of Object.values(src)) {
            if (Array.isArray(val)) {
              if (seenArrays.has(val)) continue;
              seenArrays.add(val);
              for (const item of val) {
                if (item && typeof item === 'object' && item.id && item.type) {
                  found.push(item);
                }
              }
            }
          }
        }
      }
      return found;
    }

    async function main() {
      const files = ${JSON.stringify(batchFiles)};
      const questions = [];
      for (const f of files) {
        try {
          const mod = await import(pathToFileURL(f).href);
          questions.push(...extractQuestionsFromExports(mod));
        } catch (e) {
          console.error('FAILED_IMPORT:' + f + ':' + e.message);
        }
      }
      console.log('__VALIDATOR_DATA_START__' + JSON.stringify(questions) + '__VALIDATOR_DATA_END__');
    }
    main();
  `;

  let res;
  if (fs.existsSync(tsxBin)) {
    res = spawnSync(tsxBin, ['-e', code], {
      cwd: path.join(REPO_ROOT, 'apps/api'),
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024,
    });
  } else {
    res = spawnSync('npx', ['--prefix', 'apps/api', 'tsx', '-e', code], {
      cwd: path.join(REPO_ROOT, 'apps/api'),
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024,
    });
  }

  if (res.error) {
    throw new Error(`Failed to execute tsx: ${res.error.message}`);
  }

  if (res.stderr && res.stderr.includes('FAILED_IMPORT:')) {
    const importErrors = res.stderr
      .split('\n')
      .filter(line => line.includes('FAILED_IMPORT:'))
      .join('\n');
    throw new Error(`Import errors encountered in tsx sub-process:\n${importErrors}`);
  }

  const stdout = res.stdout || '';
  const startIdx = stdout.indexOf('__VALIDATOR_DATA_START__');
  const endIdx = stdout.indexOf('__VALIDATOR_DATA_END__');
  if (startIdx === -1 || endIdx === -1) {
    const stderr = res.stderr || '';
    throw new Error(`Failed to extract question data. stdout: ${stdout.slice(0, 300)}, stderr: ${stderr.slice(0, 300)}`);
  }

  const jsonStr = stdout.slice(startIdx + '__VALIDATOR_DATA_START__'.length, endIdx);
  return JSON.parse(jsonStr);
}

/**
 * Validates a single question against poRi schema, distractor analysis, rubrics, and LaTeX delimiters.
 */
function validateQuestion(q, chapterConfig, index) {
  const errors = [];
  const qId = q.id || `[index ${index}]`;

  // 1. Basic schema verification
  if (!q.id || typeof q.id !== 'string') {
    errors.push(`Question ${qId}: missing or non-string 'id'`);
  }
  if (!q.topicId || typeof q.topicId !== 'string') {
    errors.push(`Question ${qId}: missing or non-string 'topicId'`);
  } else if (!q.topicId.startsWith(chapterConfig.topicPrefix)) {
    errors.push(`Question ${qId}: topicId '${q.topicId}' must start with expected chapter prefix '${chapterConfig.topicPrefix}'`);
  }

  if (q.type !== 'MCQ' && q.type !== 'CQ_CREATIVE') {
    errors.push(`Question ${qId}: type must be 'MCQ' or 'CQ_CREATIVE', got '${q.type}'`);
  }

  const stem = q.stem || q.stemBangla;
  if (!stem || typeof stem !== 'string' || stem.trim().length === 0) {
    errors.push(`Question ${qId}: missing or empty 'stem' / 'stemBangla'`);
  } else {
    errors.push(...validateLatexString(stem, `${qId}.stem`));
  }

  // 2. MCQ specific validation
  if (q.type === 'MCQ') {
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`Question ${qId}: MCQ must have exactly 4 options, found ${q.options ? q.options.length : 0}`);
    } else {
      let correctCount = 0;
      const incorrectOptIds = [];
      q.options.forEach((opt, optIdx) => {
        if (!opt || typeof opt !== 'object') {
          errors.push(`Question ${qId}: option [${optIdx}] is invalid`);
          return;
        }
        if (!opt.id || typeof opt.id !== 'string') {
          errors.push(`Question ${qId}: option [${optIdx}] missing or non-string 'id'`);
        }
        if (!opt.text || typeof opt.text !== 'string' || opt.text.trim().length === 0) {
          errors.push(`Question ${qId}: option [${optIdx}] missing or empty 'text'`);
        } else {
          errors.push(...validateLatexString(opt.text, `${qId}.options[${opt.id || optIdx}].text`));
        }
        if (opt.isCorrect === true) {
          correctCount++;
        } else {
          incorrectOptIds.push(opt.id);
        }
      });

      if (correctCount !== 1) {
        errors.push(`Question ${qId}: MCQ must have exactly 1 correct option, found ${correctCount}`);
      }

      // Distractor analysis validation
      if (!q.explanation || typeof q.explanation !== 'object') {
        errors.push(`Question ${qId}: MCQ missing 'explanation' object`);
      } else {
        if (!q.explanation.directAnswer || typeof q.explanation.directAnswer !== 'string') {
          errors.push(`Question ${qId}: explanation missing non-empty 'directAnswer'`);
        } else {
          errors.push(...validateLatexString(q.explanation.directAnswer, `${qId}.explanation.directAnswer`));
        }

        if (!q.explanation.coreConcept || typeof q.explanation.coreConcept !== 'string') {
          errors.push(`Question ${qId}: explanation missing non-empty 'coreConcept'`);
        } else {
          errors.push(...validateLatexString(q.explanation.coreConcept, `${qId}.explanation.coreConcept`));
        }

        if (!q.explanation.stepDerivation || typeof q.explanation.stepDerivation !== 'string' || q.explanation.stepDerivation.trim().length === 0) {
          errors.push(`Question ${qId}: explanation missing non-empty 'stepDerivation'`);
        } else {
          errors.push(...validateLatexString(q.explanation.stepDerivation, `${qId}.explanation.stepDerivation`));
        }
        if (q.explanation.proTipShortcut) {
          errors.push(...validateLatexString(q.explanation.proTipShortcut, `${qId}.explanation.proTipShortcut`));
        }

        const dist = q.explanation.distractorAnalysis;
        if (!dist || typeof dist !== 'object' || Object.keys(dist).length < 3) {
          errors.push(`Question ${qId}: distractorAnalysis missing or incomplete (must analyze all 3 incorrect options, found ${dist ? Object.keys(dist).length : 0})`);
        } else {
          for (const incId of incorrectOptIds) {
            if (!dist[incId] || typeof dist[incId] !== 'string' || dist[incId].trim().length === 0) {
              errors.push(`Question ${qId}: distractorAnalysis missing explanation for incorrect option '${incId}'`);
            }
          }
          for (const [key, val] of Object.entries(dist)) {
            if (!val || typeof val !== 'string' || val.trim().length === 0) {
              errors.push(`Question ${qId}: distractorAnalysis for '${key}' is empty`);
            } else {
              errors.push(...validateLatexString(val, `${qId}.explanation.distractorAnalysis[${key}]`));
            }
          }
        }
      }
    }
  }

  // 3. CQ specific validation
  if (q.type === 'CQ_CREATIVE') {
    if (q.options !== null && q.options !== undefined) {
      errors.push(`Question ${qId}: CQ_CREATIVE 'options' must be null or undefined`);
    }

    if (!q.cqRubric || typeof q.cqRubric !== 'object') {
      errors.push(`Question ${qId}: CQ missing 'cqRubric' object`);
    } else {
      const tiers = [
        { key: 'ka', expectedMark: 1 },
        { key: 'kha', expectedMark: 2 },
        { key: 'ga', expectedMark: 3 },
        { key: 'gha', expectedMark: 4 },
      ];

      let rubricTotal = 0;
      for (const tier of tiers) {
        const item = q.cqRubric[tier.key];
        if (!item || typeof item !== 'object') {
          errors.push(`Question ${qId}: cqRubric missing tier '${tier.key}'`);
        } else {
          if (typeof item.mark !== 'number' || item.mark !== tier.expectedMark) {
            errors.push(`Question ${qId}: cqRubric.${tier.key}.mark must be ${tier.expectedMark}, got ${item.mark}`);
          }
          rubricTotal += (typeof item.mark === 'number' ? item.mark : 0);
          if (!item.criteria || typeof item.criteria !== 'string' || item.criteria.trim().length === 0) {
            errors.push(`Question ${qId}: cqRubric.${tier.key} missing non-empty 'criteria'`);
          } else {
            errors.push(...validateLatexString(item.criteria, `${qId}.cqRubric.${tier.key}.criteria`));
          }
        }
      }

      if (rubricTotal !== 10) {
        errors.push(`Question ${qId}: cqRubric total marks must equal 10 (1+2+3+4), got ${rubricTotal}`);
      }
    }

    if (q.explanation && typeof q.explanation === 'object') {
      if (q.explanation.directAnswer) {
        errors.push(...validateLatexString(q.explanation.directAnswer, `${qId}.explanation.directAnswer`));
      }
      if (q.explanation.coreConcept) {
        errors.push(...validateLatexString(q.explanation.coreConcept, `${qId}.explanation.coreConcept`));
      }
    }
  }

  return errors;
}

/**
 * Validate a single chapter
 */
function validateChapter(cfg) {
  const ch = cfg.chapter;
  console.log(`\n======================================================================`);
  console.log(`Checking Chapter ${ch}: ${cfg.title}`);
  console.log(`======================================================================`);

  const fileErrors = [];
  const schemaErrors = [];
  const latexErrors = [];

  // A. Validate Draft Files
  const draftDir = path.join(REPO_ROOT, cfg.draftDir);
  const requiredDraftFiles = ['index.html', 'chapter-source.html', 'styles.css'];
  for (let s = 1; s <= cfg.sectionCount; s++) {
    const sPadded = String(s).padStart(2, '0');
    requiredDraftFiles.push(`section-${sPadded}.html`);
  }

  if (!fs.existsSync(draftDir)) {
    fileErrors.push(`Draft directory missing: ${cfg.draftDir}`);
  } else {
    for (const df of requiredDraftFiles) {
      const fullPath = path.join(draftDir, df);
      if (!fs.existsSync(fullPath)) {
        fileErrors.push(`Draft file missing: ${path.join(cfg.draftDir, df)}`);
      } else {
        const stats = fs.statSync(fullPath);
        if (stats.size < 50) {
          fileErrors.push(`Draft file is empty or too small: ${path.join(cfg.draftDir, df)} (${stats.size} bytes)`);
        }
        if (df.endsWith('.html')) {
          latexErrors.push(...validateHtmlDraftLatex(fullPath, `${cfg.draftDir}/${df}`));
        }
      }
    }

    // Validate scanned textbook pages
    const pagesDir = path.join(draftDir, 'pages');
    if (!fs.existsSync(pagesDir)) {
      fileErrors.push(`Scanned pages directory missing: ${path.join(cfg.draftDir, 'pages')}`);
    } else {
      const [startP, endP] = cfg.pageRange;
      let missingPages = 0;
      for (let p = startP; p <= endP; p++) {
        const pagePath = path.join(pagesDir, `p${p}.jpg`);
        if (!fs.existsSync(pagePath) || fs.statSync(pagePath).size < 1000) {
          missingPages++;
        }
      }
      if (missingPages > 0) {
        fileErrors.push(`Missing or invalid scanned pages: ${missingPages} of ${endP - startP + 1} pages missing in ${cfg.draftDir}/pages/`);
      }
    }
  }

  // B. Validate Simulation Lab
  const labPath = path.join(REPO_ROOT, cfg.simulationLab);
  if (!fs.existsSync(labPath)) {
    fileErrors.push(`Simulation lab file missing: ${cfg.simulationLab}`);
  } else {
    const stats = fs.statSync(labPath);
    if (stats.size < 500) {
      fileErrors.push(`Simulation lab file is empty or too small: ${cfg.simulationLab} (${stats.size} bytes)`);
    } else {
      const labContent = fs.readFileSync(labPath, 'utf-8');
      if (!labContent.includes('<!DOCTYPE html>') && !labContent.includes('<html')) {
        fileErrors.push(`Simulation lab is missing standard HTML structure: ${cfg.simulationLab}`);
      }
      if (!labContent.includes('<script') && !labContent.includes('<svg') && !labContent.includes('<canvas')) {
        fileErrors.push(`Simulation lab appears non-interactive (missing <script>, <canvas>, or <svg>): ${cfg.simulationLab}`);
      }
    }
  }

  // C. Validate Database Seed and Question Files
  const seedFiles = cfg.seedFiles;
  let allSeedFilesExist = true;
  for (const [key, relPath] of Object.entries(seedFiles)) {
    const fullPath = path.join(REPO_ROOT, relPath);
    if (!fs.existsSync(fullPath)) {
      fileErrors.push(`Seed file missing [${key}]: ${relPath}`);
      allSeedFilesExist = false;
    } else {
      const stats = fs.statSync(fullPath);
      if (stats.size < 50) {
        fileErrors.push(`Seed file is empty or too small [${key}]: ${relPath}`);
        allSeedFilesExist = false;
      }
    }
  }

  // D. Validate Question Schema, Counts, and Content
  let questionCount = 0;
  let mcqCount = 0;
  let cqCount = 0;

  if (allSeedFilesExist) {
    const batchList = [
      path.join(REPO_ROOT, seedFiles.batch1),
      path.join(REPO_ROOT, seedFiles.batch2),
      path.join(REPO_ROOT, seedFiles.batch3),
    ];

    try {
      const rawQuestions = loadQuestionsWithTsx(batchList);
      const questionMap = new Map();

      rawQuestions.forEach((q, idx) => {
        if (q && q.id) {
          if (questionMap.has(q.id)) {
            schemaErrors.push(`Duplicate question id found: '${q.id}'`);
          }
          questionMap.set(q.id, q);
        } else {
          schemaErrors.push(`Question at raw index ${idx} is missing an 'id'`);
        }
      });

      const questions = Array.from(questionMap.values());
      questionCount = questions.length;
      mcqCount = questions.filter(q => q.type === 'MCQ').length;
      cqCount = questions.filter(q => q.type === 'CQ_CREATIVE').length;

      // Count checks (>= 72 total, >= 54 MCQs, >= 18 CQs)
      if (questionCount < 72) {
        schemaErrors.push(`Question count insufficient: found ${questionCount} total, required >= 72`);
      }
      if (mcqCount < 54) {
        schemaErrors.push(`MCQ count insufficient: found ${mcqCount} MCQs, required >= 54`);
      }
      if (cqCount < 18) {
        schemaErrors.push(`CQ count insufficient: found ${cqCount} CQs, required >= 18`);
      }

      // Validate each question
      questions.forEach((q, idx) => {
        const qErrors = validateQuestion(q, cfg, idx);
        schemaErrors.push(...qErrors);
      });

    } catch (e) {
      schemaErrors.push(`Failed to load or parse questions: ${e.message}`);
    }
  }

  // Print Chapter Results
  console.log(`- Drafts & Pages:  ${fileErrors.filter(e => e.includes('Draft') || e.includes('pages')).length === 0 ? '✅ Passed' : '❌ Failed'}`);
  console.log(`- Simulation Lab:  ${fileErrors.filter(e => e.includes('Simulation')).length === 0 ? '✅ Passed' : '❌ Failed'}`);
  console.log(`- Database Seeds:  ${fileErrors.filter(e => e.includes('Seed file')).length === 0 ? '✅ Passed' : '❌ Failed'}`);
  console.log(`- Questions:       ${questionCount} Total (${mcqCount} MCQs, ${cqCount} CQs) - ${schemaErrors.length === 0 && questionCount >= 72 ? '✅ Passed' : '❌ ' + (allSeedFilesExist ? 'Failed' : 'Files Missing')}`);
  console.log(`- LaTeX Balance:   ${latexErrors.length === 0 ? '✅ Passed' : '❌ ' + latexErrors.length + ' Delimiter Errors'}`);

  const totalErrors = [...fileErrors, ...schemaErrors, ...latexErrors];
  if (totalErrors.length > 0) {
    console.log(`\nIssues detected in Chapter ${ch} (${totalErrors.length}):`);
    totalErrors.slice(0, 20).forEach(err => console.log(`  ❌ ${err}`));
    if (totalErrors.length > 20) {
      console.log(`  ... and ${totalErrors.length - 20} more errors`);
    }
  }

  return {
    chapter: ch,
    passed: totalErrors.length === 0,
    errors: totalErrors,
    stats: { questionCount, mcqCount, cqCount },
  };
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  let targetChapters = [1, 2, 3];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--chapter' || args[i] === '-c') {
      const val = parseInt(args[i + 1], 10);
      if (![1, 2, 3].includes(val)) {
        console.error(`\n❌ Error: Invalid chapter '${args[i + 1]}'. Expected 1, 2, or 3.`);
        process.exitCode = 1;
        return;
      }
      targetChapters = [val];
      i++;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Usage: node scratch/validate-chemistry-wave-1.js [options]

Options:
  --chapter, -c <1|2|3>  Validate only the specified chapter (1, 2, or 3)
  --help, -h             Show this help message
`);
      process.exitCode = 0;
      return;
    }
  }

  console.log(`\n======================================================================`);
  console.log(`SSC Chemistry Wave 1 (Chapters 1–3) Verification Harness`);
  console.log(`Target Chapters: ${targetChapters.join(', ')}`);
  console.log(`======================================================================`);

  const results = [];
  for (const chNum of targetChapters) {
    const cfg = CHAPTER_CONFIGS[chNum];
    results.push(validateChapter(cfg));
  }

  console.log(`\n======================================================================`);
  console.log(`Wave 1 Overall Summary`);
  console.log(`======================================================================`);

  let allPassed = true;
  for (const r of results) {
    const status = r.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`Chapter ${r.chapter}: ${status} (${r.errors.length} errors, ${r.stats.questionCount} questions)`);
    if (!r.passed) allPassed = false;
  }

  console.log(`======================================================================`);
  if (allPassed) {
    console.log(`🎉 All Wave 1 validation checks passed successfully!`);
    process.exitCode = 0;
  } else {
    console.log(`❌ Wave 1 validation failed. Review the errors above.`);
    process.exitCode = 1;
  }
}

main();
