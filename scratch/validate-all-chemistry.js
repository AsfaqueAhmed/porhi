#!/usr/bin/env node

/**
 * Validation Harness for SSC Chemistry (Chapters 1–12)
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
 *   node scratch/validate-all-chemistry.js
 *   node scratch/validate-all-chemistry.js --chapter <1..12>
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');

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
  4: {
    chapter: 4,
    title: 'পর্যায় সারণি (Periodic Table)',
    draftDir: 'drafts/chemistry-chapter-4',
    sectionCount: 6,
    pageRange: [59, 81],
    simulationLab: 'apps/api/prisma/sample-simulations/periodic-trends-interactive-lab.html',
    topicPrefix: 'top_ssc_chemistry_ch4_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-chemistry-chapter-4.ts',
      batch1: 'apps/api/prisma/seed-chemistry-chapter-4-questions.ts',
      batch2: 'apps/api/prisma/seed-chemistry-chapter-4-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-chemistry-chapter-4-questions-batch3.ts',
    },
  },
  5: {
    chapter: 5,
    title: 'রাসায়নিক বন্ধন (Chemical Bond)',
    draftDir: 'drafts/chemistry-chapter-5',
    sectionCount: 6,
    pageRange: [82, 108],
    simulationLab: 'apps/api/prisma/sample-simulations/chemical-bonding-simulator-lab.html',
    topicPrefix: 'top_ssc_chemistry_ch5_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-chemistry-chapter-5.ts',
      batch1: 'apps/api/prisma/seed-chemistry-chapter-5-questions.ts',
      batch2: 'apps/api/prisma/seed-chemistry-chapter-5-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-chemistry-chapter-5-questions-batch3.ts',
    },
  },
  6: {
    chapter: 6,
    title: 'মোলের ধারণা ও রাসায়নিক গণনা (Concept of Mole and Chemical Calculation)',
    draftDir: 'drafts/chemistry-chapter-6',
    sectionCount: 6,
    pageRange: [109, 141],
    simulationLab: 'apps/api/prisma/sample-simulations/mole-solution-preparation-lab.html',
    topicPrefix: 'top_ssc_chemistry_ch6_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-chemistry-chapter-6.ts',
      batch1: 'apps/api/prisma/seed-chemistry-chapter-6-questions.ts',
      batch2: 'apps/api/prisma/seed-chemistry-chapter-6-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-chemistry-chapter-6-questions-batch3.ts',
    },
  },
  7: {
    chapter: 7,
    title: 'রাসায়নিক বিক্রিয়া (Chemical Reactions)',
    draftDir: 'drafts/chemistry-chapter-7',
    sectionCount: 6,
    pageRange: [142, 167],
    simulationLab: 'apps/api/prisma/sample-simulations/chemical-reactions-redox-lab.html',
    topicPrefix: 'top_ssc_chemistry_ch7_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-chemistry-chapter-7.ts',
      batch1: 'apps/api/prisma/seed-chemistry-chapter-7-questions.ts',
      batch2: 'apps/api/prisma/seed-chemistry-chapter-7-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-chemistry-chapter-7-questions-batch3.ts',
    },
  },
  8: {
    chapter: 8,
    title: 'রসায়ন ও শক্তি (Chemistry and Energy)',
    draftDir: 'drafts/chemistry-chapter-8',
    sectionCount: 6,
    pageRange: [168, 205],
    simulationLab: 'apps/api/prisma/sample-simulations/electrochemical-galvanic-cell-lab.html',
    topicPrefix: 'top_ssc_chemistry_ch8_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-chemistry-chapter-8.ts',
      batch1: 'apps/api/prisma/seed-chemistry-chapter-8-questions.ts',
      batch2: 'apps/api/prisma/seed-chemistry-chapter-8-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-chemistry-chapter-8-questions-batch3.ts',
    },
  },
  9: {
    chapter: 9,
    title: 'এসিড-ক্ষারক সমতা (Acid-Base Equilibrium)',
    draftDir: 'drafts/chemistry-chapter-9',
    sectionCount: 6,
    pageRange: [206, 232],
    simulationLab: 'apps/api/prisma/sample-simulations/acid-base-titration-ph-lab.html',
    topicPrefix: 'top_ssc_chemistry_ch9_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-chemistry-chapter-9.ts',
      batch1: 'apps/api/prisma/seed-chemistry-chapter-9-questions.ts',
      batch2: 'apps/api/prisma/seed-chemistry-chapter-9-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-chemistry-chapter-9-questions-batch3.ts',
    },
  },
  10: {
    chapter: 10,
    title: 'খনিজ সম্পদ: ধাতু-অধাতু (Mineral Resources: Metals and Non-metals)',
    draftDir: 'drafts/chemistry-chapter-10',
    sectionCount: 6,
    pageRange: [233, 261],
    simulationLab: 'apps/api/prisma/sample-simulations/metal-reactivity-corrosion-lab.html',
    topicPrefix: 'top_ssc_chemistry_ch10_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-chemistry-chapter-10.ts',
      batch1: 'apps/api/prisma/seed-chemistry-chapter-10-questions.ts',
      batch2: 'apps/api/prisma/seed-chemistry-chapter-10-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-chemistry-chapter-10-questions-batch3.ts',
    },
  },
  11: {
    chapter: 11,
    title: 'খনিজ সম্পদ: জীবাশ্ম (Mineral Resources: Fossils)',
    draftDir: 'drafts/chemistry-chapter-11',
    sectionCount: 6,
    pageRange: [262, 287],
    simulationLab: 'apps/api/prisma/sample-simulations/hydrocarbon-functional-groups-lab.html',
    topicPrefix: 'top_ssc_chemistry_ch11_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-chemistry-chapter-11.ts',
      batch1: 'apps/api/prisma/seed-chemistry-chapter-11-questions.ts',
      batch2: 'apps/api/prisma/seed-chemistry-chapter-11-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-chemistry-chapter-11-questions-batch3.ts',
    },
  },
  12: {
    chapter: 12,
    title: 'আমাদের জীবনে রসায়ন (Chemistry in Our Lives)',
    draftDir: 'drafts/chemistry-chapter-12',
    sectionCount: 6,
    pageRange: [288, 308],
    simulationLab: 'apps/api/prisma/sample-simulations/chemistry-in-daily-life-lab.html',
    topicPrefix: 'top_ssc_chemistry_ch12_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-chemistry-chapter-12.ts',
      batch1: 'apps/api/prisma/seed-chemistry-chapter-12-questions.ts',
      batch2: 'apps/api/prisma/seed-chemistry-chapter-12-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-chemistry-chapter-12-questions-batch3.ts',
    },
  },
};

function validateLatexString(str, contextPath) {
  const errors = [];
  if (typeof str !== 'string' || !str) return errors;

  const clean = str.replace(/\\\$/g, '');

  const ddMatches = clean.match(/\$\$/g) || [];
  if (ddMatches.length % 2 !== 0) {
    errors.push(`Unbalanced $$ block math delimiters (${ddMatches.length} found) in ${contextPath}`);
  }

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

  const withoutBlocks = clean.replace(/\$\$[\s\S]*?\$\$/g, '');

  const singleMatches = withoutBlocks.match(/\$/g) || [];
  if (singleMatches.length % 2 !== 0) {
    errors.push(`Unbalanced $ inline math delimiters (${singleMatches.length} found) in ${contextPath}`);
  }

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

function validateHtmlDraftLatex(filePath, relativePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');

  const clean = content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  return validateLatexString(clean, relativePath);
}

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

function validateQuestion(q, chapterConfig, index) {
  const errors = [];
  const qId = q.id || `[index ${index}]`;

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
    errors.push(`Question ${qId}: missing stem or stemBangla text`);
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
  if (stem && typeof stem === 'string') {
    errors.push(...validateLatexString(stem, `${qId}.stem`));
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
        if (!optText) errors.push(`Question ${qId}: Option ${optIdx} missing text or textBangla`);
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
          if (subQ.answer) {
            errors.push(...validateLatexString(subQ.answer, `${qId}.cqRubric.${tier}.answer`));
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

function validateChapter(cfg) {
  const ch = cfg.chapter;
  console.log(`\n----------------------------------------------------------------------`);
  console.log(`[Chapter ${ch}] Validating: ${cfg.title}`);
  console.log(`----------------------------------------------------------------------`);

  const fileErrors = [];
  const schemaErrors = [];
  const latexErrors = [];

  const draftPath = path.join(REPO_ROOT, cfg.draftDir);
  if (!fs.existsSync(draftPath)) {
    fileErrors.push(`Draft directory missing: ${cfg.draftDir}`);
  } else {
    const requiredFiles = ['index.html', 'chapter-source.html', 'styles.css', 'chem.js'];
    for (const rf of requiredFiles) {
      const fp = path.join(draftPath, rf);
      if (!fs.existsSync(fp)) {
        fileErrors.push(`Draft file missing: ${path.join(cfg.draftDir, rf)}`);
      } else if (rf.endsWith('.html')) {
        latexErrors.push(...validateHtmlDraftLatex(fp, `${cfg.draftDir}/${rf}`));
      }
    }

    for (let s = 1; s <= cfg.sectionCount; s++) {
      const sFile = `section-${String(s).padStart(2, '0')}.html`;
      const fp = path.join(draftPath, sFile);
      if (!fs.existsSync(fp)) {
        fileErrors.push(`Draft section missing: ${path.join(cfg.draftDir, sFile)}`);
      } else {
        latexErrors.push(...validateHtmlDraftLatex(fp, `${cfg.draftDir}/${sFile}`));
      }
    }

    const pagesDir = path.join(draftPath, 'pages');
    if (!fs.existsSync(pagesDir)) {
      fileErrors.push(`Pages directory missing: ${path.join(cfg.draftDir, 'pages')}`);
    } else {
      const [startPage, endPage] = cfg.pageRange;
      for (let p = startPage; p <= endPage; p++) {
        const pageFile = path.join(pagesDir, `p${p}.jpg`);
        if (!fs.existsSync(pageFile)) {
          fileErrors.push(`Scanned page image missing: ${path.join(cfg.draftDir, 'pages', `p${p}.jpg`)}`);
        }
      }
    }
  }

  const simPath = path.join(REPO_ROOT, cfg.simulationLab);
  if (!fs.existsSync(simPath)) {
    fileErrors.push(`Simulation lab file missing: ${cfg.simulationLab}`);
  } else {
    const simContent = fs.readFileSync(simPath, 'utf-8');
    if (!simContent.includes('<!DOCTYPE html>') && !simContent.includes('<html')) {
      fileErrors.push(`Simulation lab is not valid HTML: ${cfg.simulationLab}`);
    }
  }

  let allSeedFilesExist = true;
  for (const [key, relPath] of Object.entries(cfg.seedFiles)) {
    const fp = path.join(REPO_ROOT, relPath);
    if (!fs.existsSync(fp)) {
      fileErrors.push(`Seed file missing (${key}): ${relPath}`);
      allSeedFilesExist = false;
    }
  }

  let questionCount = 0;
  let mcqCount = 0;
  let cqCount = 0;

  if (allSeedFilesExist) {
    try {
      const batchPaths = [
        path.join(REPO_ROOT, cfg.seedFiles.batch1),
        path.join(REPO_ROOT, cfg.seedFiles.batch2),
        path.join(REPO_ROOT, cfg.seedFiles.batch3),
      ];
      const rawQuestions = loadQuestionsWithTsx(batchPaths);

      const questionMap = new Map();
      rawQuestions.forEach((q, idx) => {
        if (q && q.id) {
          if (questionMap.has(q.id)) {
            schemaErrors.push(`Duplicate question ID detected: '${q.id}'`);
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

      if (questionCount < 72) {
        schemaErrors.push(`Question count insufficient: found ${questionCount} total, required >= 72`);
      }
      if (mcqCount < 54) {
        schemaErrors.push(`MCQ count insufficient: found ${mcqCount} MCQs, required >= 54`);
      }
      if (cqCount < 18) {
        schemaErrors.push(`CQ count insufficient: found ${cqCount} CQs, required >= 18`);
      }

      questions.forEach((q, idx) => {
        const qErrors = validateQuestion(q, cfg, idx);
        schemaErrors.push(...qErrors);
      });

    } catch (e) {
      schemaErrors.push(`Failed to load or parse questions: ${e.message}`);
    }
  }

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

function main() {
  const args = process.argv.slice(2);
  let targetChapters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--chapter' || args[i] === '-c') {
      const val = parseInt(args[i + 1], 10);
      if (val < 1 || val > 12) {
        console.error(`\n❌ Error: Invalid chapter '${args[i + 1]}'. Expected 1 to 12.`);
        process.exitCode = 1;
        return;
      }
      targetChapters = [val];
      i++;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Usage: node scratch/validate-all-chemistry.js [options]

Options:
  --chapter, -c <1..12>  Validate only the specified chapter (1 to 12)
  --help, -h             Show this help message
`);
      process.exitCode = 0;
      return;
    }
  }

  console.log(`\n======================================================================`);
  console.log(`SSC Chemistry (Chapters 1–12) Full Verification Harness`);
  console.log(`Target Chapters: ${targetChapters.join(', ')}`);
  console.log(`======================================================================`);

  const results = [];
  for (const chNum of targetChapters) {
    const cfg = CHAPTER_CONFIGS[chNum];
    results.push(validateChapter(cfg));
  }

  console.log(`\n======================================================================`);
  console.log(`SSC Chemistry Overall Summary`);
  console.log(`======================================================================`);

  let allPassed = true;
  let totalQuestionsAll = 0;
  let totalMCQAll = 0;
  let totalCQAll = 0;

  for (const r of results) {
    const status = r.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`Chapter ${r.chapter}: ${status} (${r.errors.length} errors, ${r.stats.questionCount} questions)`);
    totalQuestionsAll += r.stats.questionCount;
    totalMCQAll += r.stats.mcqCount;
    totalCQAll += r.stats.cqCount;
    if (!r.passed) allPassed = false;
  }

  console.log(`----------------------------------------------------------------------`);
  console.log(`Grand Total Questions: ${totalQuestionsAll} (${totalMCQAll} MCQs, ${totalCQAll} CQs across ${results.length} chapters)`);
  console.log(`======================================================================`);
  if (allPassed) {
    console.log(`🎉 All SSC Chemistry validation checks passed successfully!`);
    process.exitCode = 0;
  } else {
    console.log(`❌ SSC Chemistry validation failed. Review the errors above.`);
    process.exitCode = 1;
  }
}

main();
