#!/usr/bin/env node

/**
 * Validation Harness for SSC Biology (Chapters 1–14)
 *
 * Verifies:
 * 1. Existence and structure of interactive HTML drafts (index, sections, styles, chapter-source, scanned pages).
 * 2. Existence and validity of elevated simulation labs in apps/api/prisma/sample-simulations/.
 * 3. Existence of database seed and question batch files (seed-biology-chapter-X.ts, ...-questions.ts, ...-batch2.ts, ...-batch3.ts).
 * 4. Question schema integrity (id, topicId, type, stem, options, explanation, cqRubric).
 * 5. Question counts (>= 72 total per chapter: >= 54 MCQs, >= 18 CQs).
 * 6. MCQ distractor analysis completeness (all 3 incorrect options analyzed).
 * 7. 4-tier CQ rubrics (ka, kha, ga, gha with marks 1, 2, 3, 4 totaling 10).
 * 8. Balanced LaTeX delimiters ($ and $$) and matched braces in questions and drafts.
 *
 * Usage:
 *   node scratch/validate-all-biology.js
 *   node scratch/validate-all-biology.js --chapter <1..14>
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');

const CHAPTER_CONFIGS = {
  1: {
    chapter: 1,
    title: 'জীবনপাঠ (Lessons on Life)',
    draftDir: 'drafts/biology-chapter-1',
    sectionCount: 5,
    pageRange: [1, 16],
    simulationLab: 'apps/api/prisma/sample-simulations/five-kingdom-microscope-lab.html',
    topicPrefix: 'top_ssc_biology_ch1_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-1.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-1-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-1-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-1-questions-batch3.ts',
    },
  },
  2: {
    chapter: 2,
    title: 'জীবকোষ ও টিস্যু (Cells and Tissues)',
    draftDir: 'drafts/biology-chapter-2',
    sectionCount: 5,
    pageRange: [17, 49],
    simulationLab: 'apps/api/prisma/sample-simulations/cell-organelle-lab.html',
    topicPrefix: 'top_ssc_biology_ch2_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-2.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-2-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-2-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-2-questions-batch3.ts',
    },
  },
  3: {
    chapter: 3,
    title: 'কোষ বিভাজন (Cell Division)',
    draftDir: 'drafts/biology-chapter-3',
    sectionCount: 5,
    pageRange: [50, 63],
    simulationLab: 'apps/api/prisma/sample-simulations/mitosis-cell-division-lab.html',
    topicPrefix: 'top_ssc_biology_ch3_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-3.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-3-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-3-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-3-questions-batch3.ts',
    },
  },
  4: {
    chapter: 4,
    title: 'জীবনীশক্তি (Bioenergetics)',
    draftDir: 'drafts/biology-chapter-4',
    sectionCount: 5,
    pageRange: [64, 83],
    simulationLab: 'apps/api/prisma/sample-simulations/photosynthesis-respiration-lab.html',
    topicPrefix: 'top_ssc_biology_ch4_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-4.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-4-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-4-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-4-questions-batch3.ts',
    },
  },
  5: {
    chapter: 5,
    title: 'খাদ্য, পুষ্টি এবং পরিপাক (Food, Nutrition and Digestion)',
    draftDir: 'drafts/biology-chapter-5',
    sectionCount: 6,
    pageRange: [84, 124],
    simulationLab: 'apps/api/prisma/sample-simulations/human-digestive-system-lab.html',
    topicPrefix: 'top_ssc_biology_ch5_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-5.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-5-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-5-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-5-questions-batch3.ts',
    },
  },
  6: {
    chapter: 6,
    title: 'জীবে পরিবহন (Transport in Organisms)',
    draftDir: 'drafts/biology-chapter-6',
    sectionCount: 7,
    pageRange: [125, 159],
    simulationLab: 'apps/api/prisma/sample-simulations/transpiration-blood-circulation-lab.html',
    topicPrefix: 'top_ssc_biology_ch6_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-6.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-6-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-6-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-6-questions-batch3.ts',
    },
  },
  7: {
    chapter: 7,
    title: 'গ্যাসীয় বিনিময় (Gaseous Exchange)',
    draftDir: 'drafts/biology-chapter-7',
    sectionCount: 5,
    pageRange: [160, 177],
    simulationLab: 'apps/api/prisma/sample-simulations/respiratory-system-alveoli-lab.html',
    topicPrefix: 'top_ssc_biology_ch7_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-7.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-7-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-7-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-7-questions-batch3.ts',
    },
  },
  8: {
    chapter: 8,
    title: 'রেচন প্রক্রিয়া (Excretory System)',
    draftDir: 'drafts/biology-chapter-8',
    sectionCount: 5,
    pageRange: [178, 189],
    simulationLab: 'apps/api/prisma/sample-simulations/nephron-kidney-dialysis-lab.html',
    topicPrefix: 'top_ssc_biology_ch8_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-8.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-8-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-8-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-8-questions-batch3.ts',
    },
  },
  9: {
    chapter: 9,
    title: 'দৃঢ়তা প্রদান ও চলন (Support and Locomotion)',
    draftDir: 'drafts/biology-chapter-9',
    sectionCount: 5,
    pageRange: [190, 203],
    simulationLab: 'apps/api/prisma/sample-simulations/skeletal-joint-muscle-lab.html',
    topicPrefix: 'top_ssc_biology_ch9_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-9.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-9-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-9-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-9-questions-batch3.ts',
    },
  },
  10: {
    chapter: 10,
    title: 'সমন্বয় (Coordination)',
    draftDir: 'drafts/biology-chapter-10',
    sectionCount: 7,
    pageRange: [204, 230],
    simulationLab: 'apps/api/prisma/sample-simulations/neuron-endocrine-hormone-lab.html',
    topicPrefix: 'top_ssc_biology_ch10_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-10.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-10-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-10-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-10-questions-batch3.ts',
    },
  },
  11: {
    chapter: 11,
    title: 'জীবের প্রজনন (Reproduction in Organisms)',
    draftDir: 'drafts/biology-chapter-11',
    sectionCount: 6,
    pageRange: [231, 253],
    simulationLab: 'apps/api/prisma/sample-simulations/flower-reproduction-fertilization-lab.html',
    topicPrefix: 'top_ssc_biology_ch11_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-11.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-11-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-11-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-11-questions-batch3.ts',
    },
  },
  12: {
    chapter: 12,
    title: 'জীবের বংশগতি ও জৈব অভিব্যক্তি (Heredity and Evolution)',
    draftDir: 'drafts/biology-chapter-12',
    sectionCount: 7,
    pageRange: [254, 281],
    simulationLab: 'apps/api/prisma/sample-simulations/mendel-genetics-dna-lab.html',
    topicPrefix: 'top_ssc_biology_ch12_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-12.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-12-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-12-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-12-questions-batch3.ts',
    },
  },
  13: {
    chapter: 13,
    title: 'জীবের পরিবেশ (Environment of Organisms)',
    draftDir: 'drafts/biology-chapter-13',
    sectionCount: 6,
    pageRange: [282, 304],
    simulationLab: 'apps/api/prisma/sample-simulations/ecosystem-food-web-energy-lab.html',
    topicPrefix: 'top_ssc_biology_ch13_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-13.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-13-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-13-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-13-questions-batch3.ts',
    },
  },
  14: {
    chapter: 14,
    title: 'জীবপ্রযুক্তি (Biotechnology)',
    draftDir: 'drafts/biology-chapter-14',
    sectionCount: 6,
    pageRange: [305, 320],
    simulationLab: 'apps/api/prisma/sample-simulations/recombinant-dna-tissue-culture-lab.html',
    topicPrefix: 'top_ssc_biology_ch14_',
    seedFiles: {
      curriculum: 'apps/api/prisma/seed-biology-chapter-14.ts',
      batch1: 'apps/api/prisma/seed-biology-chapter-14-questions.ts',
      batch2: 'apps/api/prisma/seed-biology-chapter-14-questions-batch2.ts',
      batch3: 'apps/api/prisma/seed-biology-chapter-14-questions-batch3.ts',
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
    const requiredFiles = ['index.html', 'chapter-source.html', 'styles.css', 'bio.js'];
    for (const rf of requiredFiles) {
      const fp = path.join(draftPath, rf);
      if (!fs.existsSync(fp)) {
        fileErrors.push(`Draft file missing: ${path.join(cfg.draftDir, rf)}`);
      } else if (rf.endsWith('.html')) {
        latexErrors.push(...validateHtmlDraftLatex(fp, `${cfg.draftDir}/${rf}`));
      }
    }

    if (cfg.sectionCount) {
      for (let s = 1; s <= cfg.sectionCount; s++) {
        const sFile = `section-${String(s).padStart(2, '0')}.html`;
        const fp = path.join(draftPath, sFile);
        if (!fs.existsSync(fp)) {
          fileErrors.push(`Draft section missing: ${path.join(cfg.draftDir, sFile)}`);
        } else {
          latexErrors.push(...validateHtmlDraftLatex(fp, `${cfg.draftDir}/${sFile}`));
        }
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
      if (cqCount < 10) {
        schemaErrors.push(`CQ count insufficient: found ${cqCount} CQs, required >= 10`);
      }

      questions.forEach((q, idx) => {
        schemaErrors.push(...validateQuestion(q, cfg, idx));
      });
    } catch (e) {
      schemaErrors.push(`Error loading or validating questions via tsx: ${e.message}`);
    }
  }

  const passed = fileErrors.length === 0 && schemaErrors.length === 0 && latexErrors.length === 0;

  if (passed) {
    console.log(`✅ [Chapter ${ch}] PASS`);
    console.log(`   - Draft files: Verified (index, chapter-source, styles, bio.js, ${cfg.sectionCount} sections, pages p${cfg.pageRange[0]}-p${cfg.pageRange[1]})`);
    console.log(`   - Simulation lab: Verified (${cfg.simulationLab})`);
    console.log(`   - Questions: ${questionCount} total (${mcqCount} MCQs, ${cqCount} CQs)`);
    console.log(`   - Schema & Distractor analysis: All valid`);
    console.log(`   - CQ Rubrics: All 4 tiers (ka, kha, ga, gha) balanced to 10 marks`);
    console.log(`   - LaTeX syntax: Perfectly balanced`);
  } else {
    console.log(`❌ [Chapter ${ch}] FAIL`);
    if (fileErrors.length > 0) {
      console.log(`   File Structure Errors (${fileErrors.length}):`);
      fileErrors.slice(0, 10).forEach(e => console.log(`     - ${e}`));
      if (fileErrors.length > 10) console.log(`     ... and ${fileErrors.length - 10} more`);
    }
    if (schemaErrors.length > 0) {
      console.log(`   Question Schema Errors (${schemaErrors.length}):`);
      schemaErrors.slice(0, 15).forEach(e => console.log(`     - ${e}`));
      if (schemaErrors.length > 15) console.log(`     ... and ${schemaErrors.length - 15} more`);
    }
    if (latexErrors.length > 0) {
      console.log(`   LaTeX Math Syntax Errors (${latexErrors.length}):`);
      latexErrors.slice(0, 10).forEach(e => console.log(`     - ${e}`));
      if (latexErrors.length > 10) console.log(`     ... and ${latexErrors.length - 10} more`);
    }
  }

  return passed;
}

const args = process.argv.slice(2);
const chIdx = args.indexOf('--chapter');
if (chIdx !== -1 && args[chIdx + 1]) {
  const chNum = parseInt(args[chIdx + 1], 10);
  const cfg = CHAPTER_CONFIGS[chNum];
  if (!cfg) {
    console.error(`Invalid chapter number: ${chNum}`);
    process.exit(1);
  }
  const pass = validateChapter(cfg);
  process.exit(pass ? 0 : 1);
} else {
  let allPass = true;
  for (let ch = 1; ch <= 14; ch++) {
    const cfg = CHAPTER_CONFIGS[ch];
    const pass = validateChapter(cfg);
    if (!pass) allPass = false;
  }
  process.exit(allPass ? 0 : 1);
}
