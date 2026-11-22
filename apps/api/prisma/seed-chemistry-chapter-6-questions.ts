import { ContentStatus } from '@prisma/client';

export interface QuestionData {
  id: string;
  topicId: string;
  type: 'MCQ' | 'CQ_CREATIVE';
  stem: string;
  options: Array<{ id: string; text: string; isCorrect: boolean }> | null;
  explanation: {
    directAnswer: string;
    coreConcept: string;
    stepDerivation?: string;
    distractorAnalysis?: Record<string, string>;
    textbookCitation?: {
      bookTitle: string;
      chapterName: string;
      pageNumber?: number;
    };
    proTipShortcut?: string;
  };
  cqRubric?: {
    ka: { mark: number; criteria: string };
    kha: { mark: number; criteria: string };
    ga: { mark: number; criteria: string };
    gha: { mark: number; criteria: string };
  } | null;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  boardSource?: string;
  isVerified: boolean;
  status: ContentStatus;
  version: number;
}

const BOOK = 'রসায়ন (নবম-দশম শ্রেণি, NCTB 2026)';

export const chemistryChapter6QuestionsBatch1: QuestionData[] = [
  // =========================================================================
  // Topic 6.1: মোলের ধারণা ও অ্যাভোগেড্রো সংখ্যা [top_ssc_chemistry_ch6_1]
  // 9 MCQs + 3 CQs = 12 Questions
  // =========================================================================
  {
    id: 'q_chem_6_1_01',
    topicId: 'top_ssc_chemistry_ch6_1',
    type: 'MCQ',
    stem: 'রাসায়নিক পদার্থ পরিমাপের আন্তর্জাতিক (SI) একক কোনটি?',
    options: [
      { id: 'opt_chem_6_1_01_a', text: 'গ্রাম (g)', isCorrect: false },
      { id: 'opt_chem_6_1_01_b', text: 'মোল (mol)', isCorrect: true },
      { id: 'opt_chem_6_1_01_c', text: 'কিলোগ্রাম (kg)', isCorrect: false },
      { id: 'opt_chem_6_1_01_d', text: 'অ্যাভোগেড্রো', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: মোল (mol)।',
      coreConcept: 'আন্তর্জাতিক একক পদ্ধতিতে (SI) পদার্থের পরিমাণের (Amount of substance) একক হলো মোল।',
      stepDerivation: 'আন্তর্জাতিক পরিমাপ পদ্ধতিতে ৭টি মৌলিক এককের মধ্যে পদার্থের পরিমাণের একক হিসেবে মোলকে (প্রতীক: mol) সংজ্ঞায়িত করা হয়েছে। ১ মোলে ঠিক $6.02 \\times 10^{23}$ টি নির্দিষ্ট কণা থাকে।',
      distractorAnalysis: {
        opt_chem_6_1_01_a: 'গ্রাম হলো ভরের ছোট একক, পদার্থের পরিমাণের এসআই একক নয়।',
        opt_chem_6_1_01_c: 'কিলোগ্রাম হলো ভরের এসআই একক, পদার্থের পরিমাণের নয়।',
        opt_chem_6_1_01_d: 'অ্যাভোগেড্রো একজন বিজ্ঞানীর নাম এবং একটি ধ্রুবক সংখ্যা, কোনো একক নয়।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.১', pageNumber: 111 },
      proTipShortcut: 'মনে রাখো: ভর মাপার এসআই একক কিলোগ্রাম, কিন্তু পদার্থের রাসায়নিক পরিমাণ মাপার একক মোল।',
    },
    difficulty: 'EASY',
    boardSource: 'ঢাকা বোর্ড ২০১৯',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_1_02',
    topicId: 'top_ssc_chemistry_ch6_1',
    type: 'MCQ',
    stem: 'অ্যাভোগেড্রো সংখ্যার আদর্শ মান কোনটি?',
    options: [
      { id: 'opt_chem_6_1_02_a', text: '$6.02 \\times 10^{22}$', isCorrect: false },
      { id: 'opt_chem_6_1_02_b', text: '$6.02 \\times 10^{23}$', isCorrect: true },
      { id: 'opt_chem_6_1_02_c', text: '$6.02 \\times 10^{-23}$', isCorrect: false },
      { id: 'opt_chem_6_1_02_d', text: '$3.01 \\times 10^{23}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: $6.02 \\times 10^{23}$।',
      coreConcept: 'যেকোনো পদার্থের ১ মোলে উপস্থিত পরমাণু, অণু বা আয়নের সংখ্যা ধ্রুব এবং তা $6.02 \\times 10^{23}$ বা $6.023 \\times 10^{23}$।',
      stepDerivation: 'অ্যাভোগেড্রো ধ্রুবকের মান $N_A = 6.02214076 \\times 10^{23} \\text{ mol}^{-1}$। মাধ্যমিক পাঠ্যবই অনুযায়ী এর আসন্ন মান $6.02 \\times 10^{23}$ বা $6.023 \\times 10^{23}$ ধরা হয়।',
      distractorAnalysis: {
        opt_chem_6_1_02_a: 'এখানে সূচক ২২ দেওয়া আছে, যা ১০ গুণ কম।',
        opt_chem_6_1_02_c: 'এখানে সূচক ঋণাত্মক (-২৩) দেওয়া হয়েছে, যা একটি পরমাণুর ভরের ক্রম নির্দেশ করে, মোট সংখ্যা নয়।',
        opt_chem_6_1_02_d: 'এটি হলো ০.৫ মোলের কণার সংখ্যা ($6.02 \\times 10^{23} \\div 2$)।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.১', pageNumber: 111 },
      proTipShortcut: 'অ্যাভোগেড্রো মানেই ধনাত্মক তেইশ ($10^{23}$)।',
    },
    difficulty: 'EASY',
    boardSource: 'রাজশাহী বোর্ড ২০২০',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_1_03',
    topicId: 'top_ssc_chemistry_ch6_1',
    type: 'MCQ',
    stem: '$1\\text{ mol } \\text{H}_2\\text{SO}_4$ অ্যাসিডে মোট পরমাণুর সংখ্যা কতটি?',
    options: [
      { id: 'opt_chem_6_1_03_a', text: '$6.02 \\times 10^{23}$ টি', isCorrect: false },
      { id: 'opt_chem_6_1_03_b', text: '$1.806 \\times 10^{24}$ টি', isCorrect: false },
      { id: 'opt_chem_6_1_03_c', text: '$4.214 \\times 10^{24}$ টি', isCorrect: true },
      { id: 'opt_chem_6_1_03_d', text: '$7.000 \\times 10^{23}$ টি', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: $4.214 \\times 10^{24}$ টি।',
      coreConcept: 'একটি অণুতে বিদ্যমান মোট পরমাণুর সংখ্যা দিয়ে অ্যাভোগেড্রো সংখ্যাকে গুণ করতে হয়।',
      stepDerivation: '১টি $\\text{H}_2\\text{SO}_4$ অণুতে মোট পরমাণু $= 2(\\text{H}) + 1(\\text{S}) + 4(\\text{O}) = 7$ টি।\\n$1\\text{ mol } \\text{H}_2\\text{SO}_4$-এ অণুর সংখ্যা $= 6.02 \\times 10^{23}$ টি।\\nঅতএব মোট পরমাণুর সংখ্যা $= 7 \\times 6.02 \\times 10^{23} = 4.214 \\times 10^{24}$ টি।',
      distractorAnalysis: {
        opt_chem_6_1_03_a: 'এটি কেবল অণুর সংখ্যা, পরমাণুর সংখ্যা নয়।',
        opt_chem_6_1_03_b: 'এটি ৩টি পরমাণু বিশিষ্ট অণুর ক্ষেত্রে হতো (যেমন পানির পরমাণু সংখ্যা)।',
        opt_chem_6_1_03_d: '৭ দিয়ে ভুলভাবে সূচক ছাড়া গুণ করা হয়েছে।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.১', pageNumber: 112 },
      proTipShortcut: 'মোট পরমাণু = (অণুর পরমাণুর সংখ্যা) $\\times n \\times N_A$।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'কুমিল্লা বোর্ড ২০২১',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_1_04',
    topicId: 'top_ssc_chemistry_ch6_1',
    type: 'MCQ',
    stem: '$1\\text{ g}$ পানিতে কতটি পানির অণু বিদ্যমান?',
    options: [
      { id: 'opt_chem_6_1_04_a', text: '$3.34 \\times 10^{22}$ টি', isCorrect: true },
      { id: 'opt_chem_6_1_04_b', text: '$6.02 \\times 10^{23}$ টি', isCorrect: false },
      { id: 'opt_chem_6_1_04_c', text: '$1.08 \\times 10^{25}$ টি', isCorrect: false },
      { id: 'opt_chem_6_1_04_d', text: '$1.80 \\times 10^{23}$ টি', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $3.34 \\times 10^{22}$ টি।',
      coreConcept: 'প্রদত্ত ভরকে মোলার ভর দিয়ে ভাগ করে মোল নির্ণয় করে অ্যাভোগেড্রো সংখ্যা দিয়ে গুণ করতে হয়।',
      stepDerivation: 'পানির মোলার ভর $M = 18\\text{ g/mol}$।\\n$1\\text{ g}$ পানিতে মোল সংখ্যা $n = \\frac{1}{18}\\text{ mol}$।\\nঅণুর সংখ্যা $N = n \\times N_A = \\frac{1}{18} \\times 6.02 \\times 10^{23} \\approx 3.344 \\times 10^{22}$ টি।',
      distractorAnalysis: {
        opt_chem_6_1_04_b: 'এটি ১৮ গ্রাম (১ মোল) পানিতে থাকা অণুর সংখ্যা।',
        opt_chem_6_1_04_c: 'এটি ভাগ করার পরিবর্তে ১৮ দিয়ে গুণ করার ভুল ফলাফল।',
        opt_chem_6_1_04_d: 'এটি ভুল গণনা থেকে প্রাপ্ত মান।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.১', pageNumber: 113 },
      proTipShortcut: '$N = \\frac{W}{M} \\times N_A$ সূত্রে মান বসাও।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'যশোর বোর্ড ২০২০',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_1_05',
    topicId: 'top_ssc_chemistry_ch6_1',
    type: 'MCQ',
    stem: '১টি কার্বন-১২ ($^{12}\\text{C}$) পরমাণুর প্রকৃত ভর কত গ্রাম?',
    options: [
      { id: 'opt_chem_6_1_05_a', text: '$1.993 \\times 10^{-23}\\text{ g}$', isCorrect: true },
      { id: 'opt_chem_6_1_05_b', text: '$1.66 \\times 10^{-24}\\text{ g}$', isCorrect: false },
      { id: 'opt_chem_6_1_05_c', text: '$12.00\\text{ g}$', isCorrect: false },
      { id: 'opt_chem_6_1_05_d', text: '$6.02 \\times 10^{-23}\\text{ g}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $1.993 \\times 10^{-23}\\text{ g}$।',
      coreConcept: '১ মোল বা ১২ গ্রাম কার্বনে $6.02 \\times 10^{23}$ টি পরমাণু থাকে; তাই ১২ কে $N_A$ দিয়ে ভাগ করলে ১টি পরমাণুর ভর পাওয়া যায়।',
      stepDerivation: '১টি কার্বন পরমাণুর ভর $= \\frac{\\text{মোলার ভর}}{N_A} = \\frac{12\\text{ g}}{6.023 \\times 10^{23}} \\approx 1.9926 \\times 10^{-23}\\text{ g}$।',
      distractorAnalysis: {
        opt_chem_6_1_05_b: 'এটি হলো ১ amu বা কার্বন পরমাণুর ভরের ১/১২ অংশ ($1.66 \\times 10^{-24}\\text{ g}$)।',
        opt_chem_6_1_05_c: 'এটি ১ মোলের সামগ্রিক ভর, ১টি একক পরমাণুর ভর নয়।',
        opt_chem_6_1_05_d: 'অ্যাভোগেড্রো সংখ্যার সাথে বিভ্রান্ত হওয়া ভুল মান।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.১', pageNumber: 112 },
      proTipShortcut: 'একটি একক পরমাণুর ভর = পারমাণবিক ভর $\\div 6.02 \\times 10^{23}$।',
    },
    difficulty: 'HARD',
    boardSource: 'চট্টগ্রাম বোর্ড ২০২২',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_1_06',
    topicId: 'top_ssc_chemistry_ch6_1',
    type: 'MCQ',
    stem: '$5\\text{ mol } \\text{CO}_2$ গ্যাসে কতটি কার্বন ডাই-অক্সাইড অণু আছে?',
    options: [
      { id: 'opt_chem_6_1_06_a', text: '$1.204 \\times 10^{24}$ টি', isCorrect: false },
      { id: 'opt_chem_6_1_06_b', text: '$3.01 \\times 10^{24}$ টি', isCorrect: true },
      { id: 'opt_chem_6_1_06_c', text: '$6.02 \\times 10^{23}$ টি', isCorrect: false },
      { id: 'opt_chem_6_1_06_d', text: '$3.01 \\times 10^{23}$ টি', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: $3.01 \\times 10^{24}$ টি।',
      coreConcept: 'অণুর সংখ্যা $N = n \\times N_A$।',
      stepDerivation: '$N = 5\\text{ mol} \\times 6.02 \\times 10^{23}\\text{ mol}^{-1} = 30.1 \\times 10^{23} = 3.01 \\times 10^{24}$ টি।',
      distractorAnalysis: {
        opt_chem_6_1_06_a: 'এটি ২ মোলের অণুর সংখ্যা ($2 \\times 6.02 \\times 10^{23}$)।',
        opt_chem_6_1_06_c: 'এটি ১ মোলের অণুর সংখ্যা।',
        opt_chem_6_1_06_d: 'এখানে সূচক ২৩ রাখা হয়েছে, যা দশমিক স্থানান্তরের ভুলের কারণে হয়েছে।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.১', pageNumber: 112 },
      proTipShortcut: '$5 \\times 6 \\approx 30 \\implies 3.01 \\times 10^{24}$।',
    },
    difficulty: 'EASY',
    boardSource: 'বরিশাল বোর্ড ২০১৯',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_1_07',
    topicId: 'top_ssc_chemistry_ch6_1',
    type: 'MCQ',
    stem: '$1\\text{ mol } \\text{NaCl}$-এ মোট কতটি আয়ন থাকে?',
    options: [
      { id: 'opt_chem_6_1_07_a', text: '$6.02 \\times 10^{23}$ টি', isCorrect: false },
      { id: 'opt_chem_6_1_07_b', text: '$1.204 \\times 10^{24}$ টি', isCorrect: true },
      { id: 'opt_chem_6_1_07_c', text: '$3.01 \\times 10^{23}$ টি', isCorrect: false },
      { id: 'opt_chem_6_1_07_d', text: '$2.408 \\times 10^{24}$ টি', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: $1.204 \\times 10^{24}$ টি।',
      coreConcept: 'প্রতিটি $\\text{NaCl}$ সংকেত এককে ১টি $\\text{Na}^+$ ও ১টি $\\text{Cl}^-$ মিলে মোট ২টি আয়ন থাকে।',
      stepDerivation: '১ মোল $\\text{NaCl}$-এ $\\text{Na}^+$ আয়ন $= 6.02 \\times 10^{23}$ টি এবং $\\text{Cl}^-$ আয়ন $= 6.02 \\times 10^{23}$ টি।\\nমোট আয়ন সংখ্যা $= 2 \\times 6.02 \\times 10^{23} = 1.204 \\times 10^{24}$ টি।',
      distractorAnalysis: {
        opt_chem_6_1_07_a: 'এটি কেবল সোডিয়াম বা কেবল ক্লোরাইড ক্যাটায়ন/অ্যানায়নের সংখ্যা, মোট আয়ন নয়।',
        opt_chem_6_1_07_c: 'এটি ০.৫ মোলের একটি আয়নের সংখ্যা।',
        opt_chem_6_1_07_d: 'এটি ৪ দিয়ে গুণ করার ভুল হিসাব।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.১', pageNumber: 112 },
      proTipShortcut: 'আয়নীয় যৌগে মোট আয়ন = সংকেতে থাকা ক্যাটায়ন ও অ্যানায়নের যোগফল $\\times n \\times N_A$।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'দিনাজপুর বোর্ড ২০২১',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_1_08',
    topicId: 'top_ssc_chemistry_ch6_1',
    type: 'MCQ',
    stem: '$3.01 \\times 10^{23}$ টি নাইট্রোজেন অণু ($\text{N}_2$) সমান কত মোল?',
    options: [
      { id: 'opt_chem_6_1_08_a', text: '$0.5\\text{ mol}$', isCorrect: true },
      { id: 'opt_chem_6_1_08_b', text: '$1.0\\text{ mol}$', isCorrect: false },
      { id: 'opt_chem_6_1_08_c', text: '$2.0\\text{ mol}$', isCorrect: false },
      { id: 'opt_chem_6_1_08_d', text: '$0.25\\text{ mol}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $0.5\\text{ mol}$।',
      coreConcept: 'কণার সংখ্যাকে অ্যাভোগেড্রো সংখ্যা দিয়ে ভাগ করলে মোল সংখ্যা পাওয়া যায় ($n = \\frac{N}{N_A}$)।',
      stepDerivation: '$$n = \\frac{N}{N_A} = \\frac{3.01 \\times 10^{23}}{6.02 \\times 10^{23}} = 0.5\\text{ mol}$$',
      distractorAnalysis: {
        opt_chem_6_1_08_b: '১ মোলে $6.02 \\times 10^{23}$ টি অণু থাকে।',
        opt_chem_6_1_08_c: 'এটি গুণ করার ভুল ফলাফল।',
        opt_chem_6_1_08_d: 'এটি ০.৫ এর অর্ধেক।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.১', pageNumber: 113 },
      proTipShortcut: '৩.০১ হলো ৬.০২-এর ঠিক অর্ধেক, তাই মোল হবে ০.৫।',
    },
    difficulty: 'EASY',
    boardSource: 'সিলেট বোর্ড ২০২০',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_1_09',
    topicId: 'top_ssc_chemistry_ch6_1',
    type: 'MCQ',
    stem: '$44\\text{ g } \\text{CO}_2$ এবং $32\\text{ g } \\text{O}_2$-এর মধ্যে নিচের কোন বক্তব্যটি সঠিক?',
    options: [
      { id: 'opt_chem_6_1_09_a', text: 'উভয় নমুনায় পরমাণুর সংখ্যা সমান', isCorrect: false },
      { id: 'opt_chem_6_1_09_b', text: 'উভয় নমুনায় অণুর সংখ্যা সমান', isCorrect: true },
      { id: 'opt_chem_6_1_09_c', text: 'উভয় নমুনার ভর অসমান হওয়ায় অণুর সংখ্যা ভিন্ন', isCorrect: false },
      { id: 'opt_chem_6_1_09_d', text: 'অক্সিজেন নমুনায় বেশি অণু রয়েছে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: উভয় নমুনায় অণুর সংখ্যা সমান।',
      coreConcept: 'উভয় গ্যাসই তাদের নিজ নিজ ১ মোলার ভরের সমান হওয়ায় উভয়েই ঠিক ১ মোল ($6.02 \\times 10^{23}$ টি) অণু রয়েছে।',
      stepDerivation: '$\\text{CO}_2$-এর মোলার ভর $44\\text{ g/mol} \\implies n = \\frac{44}{44} = 1\\text{ mol}$।\\n$\\text{O}_2$-এর মোলার ভর $32\\text{ g/mol} \\implies n = \\frac{32}{32} = 1\\text{ mol}$।\\nযেহেতু উভয়েরই মোল সংখ্যা ১, তাই উভয় নমুনায় ঠিক $6.02 \\times 10^{23}$ টি অণু রয়েছে।',
      distractorAnalysis: {
        opt_chem_6_1_09_a: '$\\text{CO}_2$-এ প্রতি অণুতে ৩টি পরমাণু ($3 \\times N_A$) কিন্তু $\\text{O}_2$-এ ২টি ($2 \\times N_A$), তাই পরমাণুর সংখ্যা সমান নয়।',
        opt_chem_6_1_09_c: 'বিভিন্ন পদার্থের মোলার ভর আলাদা হওয়ায় সমান মোলের ভর ভিন্ন হলেও অণুর সংখ্যা সমান হয়।',
        opt_chem_6_1_09_d: 'উভয়েই অণুর সংখ্যা সমান।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.১', pageNumber: 113 },
      proTipShortcut: '১ মোলার ভর নেওয়া মানেই ঠিক ১ মোল ($N_A$ সংখ্যক) অণু নেওয়া।',
    },
    difficulty: 'HARD',
    boardSource: 'ঢাকা বোর্ড ২০২১',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------------------
  // CQs for Topic 6.1: মোলের ধারণা ও অ্যাভোগেড্রো সংখ্যা (3 CQs)
  // -------------------------------------------------------------------------
  {
    id: 'q_chem_6_1_10',
    topicId: 'top_ssc_chemistry_ch6_1',
    type: 'CQ_CREATIVE',
    stem: 'রসায়ন পরীক্ষাগারে শিক্ষক দুটি টেস্টটিউব দেখালেন। টেস্টটিউব ‘A’-তে $18\\text{ g } \\text{H}_2\\text{O}$ এবং টেস্টটিউব ‘B’-তে $18\\text{ g } \\text{C}_6\\text{H}_{12}\\text{O}_6$ (গ্লুকোজ) রয়েছে। রবিন দাবি করল, যেহেতু উভয়ের ভর সমান ($18\\text{ g}$), তাই উভয় পাত্রে মোট কণার সংখ্যাও সমান।',
    options: null,
    explanation: {
      directAnswer: 'রবিনের দাবি সঠিক নয়; কারণ ভর সমান হলেও তাদের মোলার ভর ভিন্ন হওয়ায় মোল সংখ্যা ও অণুর সংখ্যা ভিন্ন হবে।',
      coreConcept: 'অণুর সংখ্যা ভরের ওপর সরাসরি নির্ভর করে না, বরং মোলার ভর ও মোল সংখ্যার ওপর নির্ভর করে ($N = \\frac{W}{M} \\times N_A$)।',
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.১', pageNumber: 111 },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'মোল কাকে বলে তার সঠিক সংজ্ঞা লেখা (রাসায়নিক পদার্থের যে পরিমাণে $6.02 \\times 10^{23}$ টি কণা থাকে)।' },
      kha: { mark: 2, criteria: 'অ্যাভোগেড্রো সংখ্যাকে সার্বজনীন ধ্রুবক কেন বলা হয় তা উপযুক্ত কারণসহ ব্যাখ্যা করা।' },
      ga: { mark: 3, criteria: 'টেস্টটিউব A ও B-তে থাকা অণুর সংখ্যা যথাক্রমে $6.02 \\times 10^{23}$ টি এবং $6.02 \\times 10^{22}$ টি সঠিকভাবে গণনা করে দেখানো।' },
      gha: { mark: 4, criteria: 'উভয় পাত্রের অণুর সংখ্যা ও পরমাণুর সংখ্যার তুলনামূলক গাণিতিক বিশ্লেষণ করে রবিনের যুক্তির অযৌক্তিকতা প্রমাণ করা।' },
    },
    difficulty: 'MEDIUM',
    boardSource: 'সৃজনশীল মডেল প্রশ্ন (বোর্ড মান)',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_1_11',
    topicId: 'top_ssc_chemistry_ch6_1',
    type: 'CQ_CREATIVE',
    stem: 'একটি বায়ুশূন্য ফ্লাস্কে $4.4\\text{ g } \\text{CO}_2$ গ্যাস প্রবেশ করানো হলো। ফ্লাস্কের তাপমাত্রা ও চাপ অপরিবর্তিত রাখা হলো। অন্য একটি সিলিন্ডারে $3.01 \\times 10^{23}$ টি $\\text{CH}_4$ (মিথেন) অণু সংরক্ষিত আছে।',
    options: null,
    explanation: {
      directAnswer: '$\\text{CO}_2$ গ্যাসের মোল সংখ্যা $0.1\\text{ mol}$ এবং মিথেন গ্যাসের মোল সংখ্যা $0.5\\text{ mol}$।',
      coreConcept: 'ভর ও কণার সংখ্যা থেকে মোল রূপান্তর এবং তুলনামূলক বিশ্লেষণ।',
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.১', pageNumber: 112 },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'অ্যাভোগেড্রো সংখ্যার মান ($6.02 \\times 10^{23}$) সঠিকভাবে লেখা।' },
      kha: { mark: 2, criteria: '১টি পানির অণুর ভর কত গ্রাম তা সমীকরণসহ ব্যাখ্যা করা।' },
      ga: { mark: 3, criteria: 'ফ্লাস্কে রক্ষিত $\\text{CO}_2$ গ্যাসে মোট কতটি কার্বন ও কতটি অক্সিজেন পরমাণু আছে তা নিখুঁতভাবে গণনা করা।' },
      gha: { mark: 4, criteria: 'ফ্লাস্কের $\\text{CO}_2$ এবং সিলিন্ডারের $\\text{CH}_4$-এর মধ্যে কোনটিতে পরমাণুর সংখ্যা বেশি হবে তা গাণিতিকভাবে বিশ্লেষণ করা।' },
    },
    difficulty: 'HARD',
    boardSource: 'দিনাজপুর বোর্ড মডেল প্রশ্ন',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_1_12',
    topicId: 'top_ssc_chemistry_ch6_1',
    type: 'CQ_CREATIVE',
    stem: 'একজন ফার্মাসিউটিক্যাল রসায়নবিদ একটি ওষুধে $0.05\\text{ mol } \\text{NaCl}$ এবং $0.02\\text{ mol } \\text{CaCl}_2$ লবণ পানিতে মিশিয়ে একটি স্যালাইন দ্রবণ প্রস্তুত করলেন।',
    options: null,
    explanation: {
      directAnswer: 'স্যালাইনে মোট ক্লোরাইড ($Cl^-$) আয়নের সংখ্যা $5.418 \\times 10^{22}$ টি।',
      coreConcept: 'আয়নীয় যৌগের মোল সংখ্যা থেকে নির্দিষ্ট আয়ন এবং মোট আয়নের সংখ্যা গণনা।',
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.১', pageNumber: 112 },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'গ্রাম-পরমাণু কাকে বলে তা স্পষ্টভাবে লেখা।' },
      kha: { mark: 2, criteria: 'আয়নীয় যৌগের ক্ষেত্রে আণবিক ভরের চেয়ে সংকেত ভর বলা বেশি যুক্তিযুক্ত কেন তা ব্যাখ্যা করা।' },
      ga: { mark: 3, criteria: 'স্যালাইনে মিশ্রিত $\\text{NaCl}$-এর ভর গ্রামে গণনা করা ($2.925\\text{ g}$)।' },
      gha: { mark: 4, criteria: 'উক্ত স্যালাইনে উপস্থিত মোট ক্যাটায়ন ও অ্যানায়নের সংখ্যা পৃথকভাবে ও একত্রে নিখুঁত গাণিতিক যুক্তিসহ বিশ্লেষণ করা।' },
    },
    difficulty: 'HARD',
    boardSource: 'কুমিল্লা বোর্ড মডেল প্রশ্ন',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 6.2: মোলার ভর ও আণবিক ভর গণনা [top_ssc_chemistry_ch6_2]
  // 9 MCQs + 3 CQs = 12 Questions
  // =========================================================================
  {
    id: 'q_chem_6_2_01',
    topicId: 'top_ssc_chemistry_ch6_2',
    type: 'MCQ',
    stem: 'সালফিউরিক অ্যাসিড ($\text{H}_2\text{SO}_4$)-এর আণবিক ভর কত?',
    options: [
      { id: 'opt_chem_6_2_01_a', text: '49', isCorrect: false },
      { id: 'opt_chem_6_2_01_b', text: '98', isCorrect: true },
      { id: 'opt_chem_6_2_01_c', text: '98 g', isCorrect: false },
      { id: 'opt_chem_6_2_01_d', text: '106', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 98।',
      coreConcept: 'আপেক্ষিক আণবিক ভর একটি অনুপাত, যার কোনো একক থাকে না।',
      stepDerivation: '$\\text{H}_2\\text{SO}_4$-এর আণবিক ভর $= (1 \\times 2) + 32 + (16 \\times 4) = 2 + 32 + 64 = 98$।',
      distractorAnalysis: {
        opt_chem_6_2_01_a: 'এটি তুল্য ভর ($98 \\div 2$), আণবিক ভর নয়।',
        opt_chem_6_2_01_c: 'আণবিক ভরের সাথে গ্রাম একক যুক্ত করলে তা মোলার ভর হয়ে যায়; আপেক্ষিক আণবিক ভর এককহীন।',
        opt_chem_6_2_01_d: 'এটি সোডিয়াম কার্বনেটের আণবিক ভর।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.২', pageNumber: 114 },
      proTipShortcut: 'আণবিক ভর এককহীন সংখ্যা, আর মোলার ভরের একক g/mol বা g।',
    },
    difficulty: 'EASY',
    boardSource: 'ঢাকা বোর্ড ২০২০',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_2_02',
    topicId: 'top_ssc_chemistry_ch6_2',
    type: 'MCQ',
    stem: 'তুঁতে বা কপার সালফেট পেন্টাহাইড্রেট ($\text{CuSO}_4 \cdot 5\text{H}_2\text{O}$)-এর আণবিক ভর কত? (Cu = 63.5, S = 32, O = 16, H = 1)',
    options: [
      { id: 'opt_chem_6_2_02_a', text: '159.5', isCorrect: false },
      { id: 'opt_chem_6_2_02_b', text: '249.5', isCorrect: true },
      { id: 'opt_chem_6_2_02_c', text: '177.5', isCorrect: false },
      { id: 'opt_chem_6_2_02_d', text: '250.0', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 249.5।',
      coreConcept: 'কেলাসিত যৌগে ডট চিহ্নের পরের কেলাস পানির ভর মূল অনার্দ্র যৌগের ভরের সাথে যোগ করতে হয়।',
      stepDerivation: '$\\text{CuSO}_4 = 63.5 + 32 + (16 \\times 4) = 159.5$।\\n$5\\text{H}_2\\text{O} = 5 \\times [(1 \\times 2) + 16] = 5 \\times 18 = 90$।\\nমোট আণবিক ভর $= 159.5 + 90 = 249.5$।',
      distractorAnalysis: {
        opt_chem_6_2_02_a: 'এটি কেবল অনার্দ্র কপার সালফেটের ভর, কেলাস পানি বাদ দেওয়া হয়েছে।',
        opt_chem_6_2_02_c: 'এটি মাত্র ১ অণু পানি যোগ করার ভুল হিসাব।',
        opt_chem_6_2_02_d: 'কপারের ভর ৬৪ ধরে আসন্ন করা ভুল মান।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.২', pageNumber: 115 },
      proTipShortcut: 'তুঁতে = অনার্দ্র $\\text{CuSO}_4$ (১৫৯.৫) + ৫ অণু পানি (৯০) = ২৪৯.৫।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'চট্টগ্রাম বোর্ড ২০১৯',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_2_03',
    topicId: 'top_ssc_chemistry_ch6_2',
    type: 'MCQ',
    stem: 'নিচের কোন যৌগটির আণবিক ভর ১০৬?',
    options: [
      { id: 'opt_chem_6_2_03_a', text: '$\\text{NaHCO}_3$', isCorrect: false },
      { id: 'opt_chem_6_2_03_b', text: '$\\text{Na}_2\\text{CO}_3$', isCorrect: true },
      { id: 'opt_chem_6_2_03_c', text: '$\\text{CaCO}_3$', isCorrect: false },
      { id: 'opt_chem_6_2_03_d', text: '$\\text{K}_2\\text{CO}_3$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: $\\text{Na}_2\\text{CO}_3$।',
      coreConcept: 'সোডিয়াম কার্বনেটের উপাদান মৌলসমূহের পারমাণবিক ভরের যোগফল ১০৬।',
      stepDerivation: '$\\text{Na}_2\\text{CO}_3 = (23 \\times 2) + 12 + (16 \\times 3) = 46 + 12 + 48 = 106$।',
      distractorAnalysis: {
        opt_chem_6_2_03_a: '$\\text{NaHCO}_3 = 23 + 1 + 12 + 48 = 84$।',
        opt_chem_6_2_03_c: '$\\text{CaCO}_3 = 40 + 12 + 48 = 100$।',
        opt_chem_6_2_03_d: '$\\text{K}_2\\text{CO}_3 = (39 \\times 2) + 12 + 48 = 138$।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.২', pageNumber: 115 },
      proTipShortcut: 'সোডা অ্যাশ বা কাপড় কাচার সোডার নির্জল রূপ $\\text{Na}_2\\text{CO}_3 = 106$।',
    },
    difficulty: 'EASY',
    boardSource: 'যশোর বোর্ড ২০২১',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_2_04',
    topicId: 'top_ssc_chemistry_ch6_2',
    type: 'MCQ',
    stem: 'গ্লুকোজের ($\text{C}_6\text{H}_{12}\text{O}_6$) ১টি অণুর ভর কত গ্রাম?',
    options: [
      { id: 'opt_chem_6_2_04_a', text: '$180\\text{ g}$', isCorrect: false },
      { id: 'opt_chem_6_2_04_b', text: '$2.99 \\times 10^{-22}\\text{ g}$', isCorrect: true },
      { id: 'opt_chem_6_2_04_c', text: '$1.08 \\times 10^{26}\\text{ g}$', isCorrect: false },
      { id: 'opt_chem_6_2_04_d', text: '$5.55 \\times 10^{-3}\\text{ g}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: $2.99 \\times 10^{-22}\\text{ g}$।',
      coreConcept: '১টি অণুর ভর $= \\frac{\\text{মোলার ভর}}{N_A}$।',
      stepDerivation: 'গ্লুকোজের আণবিক ভর $M = (12 \\times 6) + (1 \\times 12) + (16 \\times 6) = 72 + 12 + 96 = 180\\text{ g/mol}$।\\n১টি অণুর ভর $= \\frac{180}{6.02 \\times 10^{23}} \\approx 2.99 \\times 10^{-22}\\text{ g}$।',
      distractorAnalysis: {
        opt_chem_6_2_04_a: 'এটি ১ মোলের ভর, ১টি একক অণুর ভর নয়।',
        opt_chem_6_2_04_c: 'এটি ভাগ করার বদলে গুণ করার ফলে প্রাপ্ত সম্পূর্ণ অবাস্তব মান।',
        opt_chem_6_2_04_d: 'এটি ১ গ্রামকে ১৮০ দিয়ে ভাগ করার মান (মোল সংখ্যা)।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.২', pageNumber: 116 },
      proTipShortcut: 'একটি অণুর ভর সর্বদা অতি ক্ষুদ্র ($10^{-22}$ থেকে $10^{-23}\\text{ g}$) ক্রমের হবে।',
    },
    difficulty: 'HARD',
    boardSource: 'বরিশাল বোর্ড ২০২০',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_2_05',
    topicId: 'top_ssc_chemistry_ch6_2',
    type: 'MCQ',
    stem: 'অ্যালুমিনিয়াম সালফেট [$\text{Al}_2(\text{SO}_4)_3$]-এর আণবিক ভর কত? (Al = 27, S = 32, O = 16)',
    options: [
      { id: 'opt_chem_6_2_05_a', text: '150', isCorrect: false },
      { id: 'opt_chem_6_2_05_b', text: '342', isCorrect: true },
      { id: 'opt_chem_6_2_05_c', text: '278', isCorrect: false },
      { id: 'opt_chem_6_2_05_d', text: '315', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 342।',
      coreConcept: 'বন্ধনীযুক্ত মূলকের ভর বের করে বাইরের সাবস্ক্রিপ্ট দিয়ে গুণ করতে হয়।',
      stepDerivation: '$\\text{Al}_2(\\text{SO}_4)_3 = (27 \\times 2) + 3 \\times [32 + (16 \\times 4)] = 54 + 3 \\times [32 + 64] = 54 + (3 \\times 96) = 54 + 288 = 342$।',
      distractorAnalysis: {
        opt_chem_6_2_05_a: 'এটি সালফেট মূলককে ৩ দিয়ে গুণ না করার ভুল হিসাব।',
        opt_chem_6_2_05_c: 'এটি অ্যালুমিনিয়ামকে ১টি ধরে গণনার ভুল।',
        opt_chem_6_2_05_d: 'ভুল পারমাণবিক ভর ব্যবহারের ফলাফল।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.২', pageNumber: 115 },
      proTipShortcut: '$\\text{SO}_4 = 96$; ৩টি সালফেট $= 288$; আর ২টি $\\text{Al} = 54$; যোগফল $342$।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'রাজশাহী বোর্ড ২০১৯',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_2_06',
    topicId: 'top_ssc_chemistry_ch6_2',
    type: 'MCQ',
    stem: '$0.25\\text{ mol } \\text{CaCO}_3$-এর ভর কত গ্রাম?',
    options: [
      { id: 'opt_chem_6_2_06_a', text: '$100\\text{ g}$', isCorrect: false },
      { id: 'opt_chem_6_2_06_b', text: '$50\\text{ g}$', isCorrect: false },
      { id: 'opt_chem_6_2_06_c', text: '$25\\text{ g}$', isCorrect: true },
      { id: 'opt_chem_6_2_06_d', text: '$12.5\\text{ g}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: $25\\text{ g}$।',
      coreConcept: 'ভর $W = n \\times M$।',
      stepDerivation: '$\\text{CaCO}_3$-এর আণবিক ভর $M = 40 + 12 + (16 \\times 3) = 100\\text{ g/mol}$।\\nভর $W = 0.25\\text{ mol} \\times 100\\text{ g/mol} = 25\\text{ g}$।',
      distractorAnalysis: {
        opt_chem_6_2_06_a: 'এটি ১ মোলের ভর।',
        opt_chem_6_2_06_b: 'এটি ০.৫ মোলের ভর।',
        opt_chem_6_2_06_d: 'এটি ০.১২৫ মোলের ভর।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.২', pageNumber: 116 },
      proTipShortcut: '১০০-এর ০.২৫ অংশ মানে চার ভাগের এক ভাগ = ২৫ গ্রাম।',
    },
    difficulty: 'EASY',
    boardSource: 'দিনাজপুর বোর্ড ২০২০',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_2_07',
    topicId: 'top_ssc_chemistry_ch6_2',
    type: 'MCQ',
    stem: 'কোন মৌলটির ১ গ্রাম-পরমাণুর ভর ৩২ গ্রাম?',
    options: [
      { id: 'opt_chem_6_2_07_a', text: 'অক্সিজেন', isCorrect: false },
      { id: 'opt_chem_6_2_07_b', text: 'সালফার', isCorrect: true },
      { id: 'opt_chem_6_2_07_c', text: 'ফসফরাস', isCorrect: false },
      { id: 'opt_chem_6_2_07_d', text: 'ক্লোরিন', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: সালফার।',
      coreConcept: 'মৌলিক পদার্থের পারমাণবিক ভরকে গ্রামে প্রকাশ করলে তাকে ১ গ্রাম-পরমাণু বলে।',
      stepDerivation: 'সালফারের পারমাণবিক ভর ৩২, তাই সালফারের ১ গ্রাম-পরমাণু $= 32\\text{ g}$।',
      distractorAnalysis: {
        opt_chem_6_2_07_a: 'অক্সিজেনের ১ গ্রাম-পরমাণু ১৬ গ্রাম; তবে ১ গ্রাম-অণু ($\text{O}_2$) ৩২ গ্রাম। প্রশ্নে গ্রাম-পরমাণু বলা হয়েছে।',
        opt_chem_6_2_07_c: 'ফসফরাসের পারমাণবিক ভর ৩১।',
        opt_chem_6_2_07_d: 'ক্লোরিনের পারমাণবিক ভর ৩৫.৫।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.২', pageNumber: 114 },
      proTipShortcut: 'ফাঁদ সতর্কতা: গ্রাম-পরমাণু বললে পারমাণবিক ভর (S = 32), আর গ্রাম-অণু বললে আণবিক ভর ($\text{O}_2 = 32$)।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'সিলেট বোর্ড ২০২১',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_2_08',
    topicId: 'top_ssc_chemistry_ch6_2',
    type: 'MCQ',
    stem: 'নাইট্রিক অ্যাসিডের ($\text{HNO}_3$) মোলার ভর কত?',
    options: [
      { id: 'opt_chem_6_2_08_a', text: '$63\\text{ g/mol}$', isCorrect: true },
      { id: 'opt_chem_6_2_08_b', text: '$47\\text{ g/mol}$', isCorrect: false },
      { id: 'opt_chem_6_2_08_c', text: '$63$', isCorrect: false },
      { id: 'opt_chem_6_2_08_d', text: '$84\\text{ g/mol}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $63\\text{ g/mol}$।',
      coreConcept: 'মোলার ভরের একক g/mol এবং $\\text{HNO}_3$-এর আণবিক ভর ৬৩।',
      stepDerivation: '$\\text{HNO}_3 = 1 + 14 + (16 \\times 3) = 15 + 48 = 63\\text{ g/mol}$।',
      distractorAnalysis: {
        opt_chem_6_2_08_b: 'নাইট্রোজেনের পারমাণবিক ভর ভুল গণনার ফলাফল।',
        opt_chem_6_2_08_c: 'এটি আপেক্ষিক আণবিক ভর (এককহীন), কিন্তু প্রশ্নে মোলার ভর চেয়েছে যার একক g/mol।',
        opt_chem_6_2_08_d: 'ভুল যোগফল।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.২', pageNumber: 115 },
      proTipShortcut: 'মোলার ভর চাইলেই একক g/mol সহ উত্তর খুঁজবে।',
    },
    difficulty: 'EASY',
    boardSource: 'কুমিল্লা বোর্ড ২০১৯',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_2_09',
    topicId: 'top_ssc_chemistry_ch6_2',
    type: 'MCQ',
    stem: 'সমান ভরের কোন গ্যাসটিতে অণুর সংখ্যা সবচেয়ে বেশি থাকবে?',
    options: [
      { id: 'opt_chem_6_2_09_a', text: '$\\text{H}_2$', isCorrect: true },
      { id: 'opt_chem_6_2_09_b', text: '$\\text{CH}_4$', isCorrect: false },
      { id: 'opt_chem_6_2_09_c', text: '$\\text{O}_2$', isCorrect: false },
      { id: 'opt_chem_6_2_09_d', text: '$\\text{CO}_2$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $\\text{H}_2$।',
      coreConcept: 'অণুর সংখ্যা $N = \\frac{W}{M} \\times N_A$; ভর সমান হলে যার আণবিক ভর ($M$) সবচেয়ে কম, তার মোল ও অণুর সংখ্যা সবচেয়ে বেশি হবে।',
      stepDerivation: '$\\text{H}_2$-এর $M=2$, $\\text{CH}_4$-এর $M=16$, $\\text{O}_2$-এর $M=32$, $\\text{CO}_2$-এর $M=44$।\\nযেহেতু হাইড্রোজেন গ্যাসের মোলার ভর সবচেয়ে কম ($2\\text{ g/mol}$), তাই একই ভরে এর মোল সংখ্যা ও অণুর সংখ্যা সর্বোচ্চ হবে।',
      distractorAnalysis: {
        opt_chem_6_2_09_b: 'মিথেনের মোলার ভর ১৬, যা হাইড্রোজেনের চেয়ে ৮ গুণ বেশি।',
        opt_chem_6_2_09_c: 'অক্সিজেনের মোলার ভর ৩২, ফলে এর অণুর সংখ্যা ১৬ গুণ কম হবে।',
        opt_chem_6_2_09_d: 'কার্বন ডাই-অক্সাইডের ভর সবচেয়ে বেশি হওয়ায় এর অণুর সংখ্যা সবচেয়ে কম হবে।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.২', pageNumber: 116 },
      proTipShortcut: 'স্থির ভরে: কণার সংখ্যা $\\propto \\frac{1}{\\text{মোলার ভর}}$ (হালকা গ্যাসে বেশি অণু)।',
    },
    difficulty: 'HARD',
    boardSource: 'ঢাকা বোর্ড ২০২২',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------------------
  // CQs for Topic 6.2: মোলার ভর ও আণবিক ভর গণনা (3 CQs)
  // -------------------------------------------------------------------------
  {
    id: 'q_chem_6_2_10',
    topicId: 'top_ssc_chemistry_ch6_2',
    type: 'CQ_CREATIVE',
    stem: 'ল্যাবরেটরিতে শিক্ষক তিনটি কাচের পাত্রে তিনটি যৌগ রাখলেন: ১ম পাত্রে $49\\text{ g } \\text{H}_2\\text{SO}_4$, ২য় পাত্রে $24.95\\text{ g } \\text{CuSO}_4 \\cdot 5\\text{H}_2\\text{O}$ এবং ৩য় পাত্রে $53\\text{ g } \\text{Na}_2\\text{CO}_3$।',
    options: null,
    explanation: {
      directAnswer: '১ম পাত্রে $0.5\\text{ mol}$, ২য় পাত্রে $0.1\\text{ mol}$ এবং ৩য় পাত্রে $0.5\\text{ mol}$ যৌগ রয়েছে।',
      coreConcept: 'বিভিন্ন ধরনের যৌগ (অ্যাসিড, কেলাসিত লবণ, অজৈব লবণ)-এর আণবিক ভর ও মোল গণনা।',
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.২', pageNumber: 114 },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'মোলার ভরের সংজ্ঞা ও একক ($g/mol$) সঠিকভাবে লেখা।' },
      kha: { mark: 2, criteria: 'তুঁতে উত্তপ্ত করলে নীল বর্ণ থেকে সাদা বর্ণ ধারণ করে কেন তা সমীকরণসহ ব্যাখ্যা করা।' },
      ga: { mark: 3, criteria: '২য় পাত্রে রক্ষিত তুঁতের মোলার ভর এবং এতে উপস্থিত কেলাস পানির ভর গণনা করা।' },
      gha: { mark: 4, criteria: '১ম ও ৩য় পাত্রের নমুনাদ্বয়ের মোল সংখ্যা এবং মোট পরমাণুর সংখ্যা তুলনামূলক বিশ্লেষণ করা।' },
    },
    difficulty: 'MEDIUM',
    boardSource: 'চট্টগ্রাম বোর্ড মডেল প্রশ্ন',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_2_11',
    topicId: 'top_ssc_chemistry_ch6_2',
    type: 'CQ_CREATIVE',
    stem: 'একটি অজ্ঞাত গ্যাসীয় হাইড্রোকার্বনে কার্বন ও হাইড্রোজেনের পরমাণুর সংখ্যার অনুপাত $1:2$। উক্ত যৌগের একটি অণুর ভর $4.65 \\times 10^{-23}\\text{ g}$।',
    options: null,
    explanation: {
      directAnswer: 'যৌগটির আণবিক ভর $28\\text{ g/mol}$ এবং সংকেত ইথিন ($\\text{C}_2\\text{H}_4$)।',
      coreConcept: 'একটি অণুর ভর থেকে মোলার ভর নির্ণয় এবং আণবিক সংকেত প্রতিষ্ঠা।',
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.২', pageNumber: 116 },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'আণবিক ভর কাকে বলে তা সংজ্ঞায়িত করা।' },
      kha: { mark: 2, criteria: 'আপেক্ষিক পারমাণবিক ভর এককহীন কেন তা বুঝিয়ে লেখা।' },
      ga: { mark: 3, criteria: 'অজ্ঞাত হাইড্রোকার্বনটির মোলার ভর ($28\\text{ g/mol}$) নিখুঁতভাবে গণনা করে দেখানো।' },
      gha: { mark: 4, criteria: 'যৌগটির স্থূল সংকেত ($\\text{CH}_2$) থেকে আণবিক সংকেত ($\\text{C}_2\\text{H}_4$) প্রতিষ্ঠা ও যৌগের প্রকৃতি বিশ্লেষণ করা।' },
    },
    difficulty: 'HARD',
    boardSource: 'যশোর বোর্ড মডেল প্রশ্ন',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_6_2_12',
    topicId: 'top_ssc_chemistry_ch6_2',
    type: 'CQ_CREATIVE',
    stem: 'শ্রেণিকক্ষে শিক্ষক ব্ল্যাকবোর্ডে দুটি রাসায়নিক সংকেত লিখলেন: (P) $\\text{FeSO}_4 \\cdot 7\\text{H}_2\\text{O}$ (গ্রিন ভিট্রিওল) এবং (Q) $\\text{Al}_2(\\text{SO}_4)_3$।',
    options: null,
    explanation: {
      directAnswer: 'গ্রিন ভিট্রিওলের আণবিক ভর $278$ এবং অ্যালুমিনিয়াম সালফেটের আণবিক ভর $342$।',
      coreConcept: 'জটিল কেলাসিত লবণ ও বহুপারমাণবিক আয়নযুক্ত লবণের মোলার ভর নির্ণয় ও রূপান্তর।',
      textbookCitation: { bookTitle: BOOK, chapterName: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা · ৬.২', pageNumber: 115 },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'সংকেত ভর কাকে বলে তা লেখা।' },
      kha: { mark: 2, criteria: 'কেলাস পানি কাকে বলে এবং এটি যৌগের ভরের সাথে কীভাবে যুক্ত থাকে তা ব্যাখ্যা করা।' },
      ga: { mark: 3, criteria: 'উভয় যৌগের আণবিক ভর ধাপে ধাপে গণনা করে দেখানো (Fe=56, Al=27, S=32, O=16, H=1)।' },
      gha: { mark: 4, criteria: 'উভয় যৌগের ১০০ গ্রাম নমুনায় কোনটিতে সালফারের ভর বেশি থাকবে তা গাণিতিক যুক্তিসহ প্রমাণ করা।' },
    },
    difficulty: 'HARD',
    boardSource: 'রাজশাহী বোর্ড মডেল প্রশ্ন',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];
