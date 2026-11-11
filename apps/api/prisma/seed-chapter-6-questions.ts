import { ContentStatus } from '@prisma/client';
import { chapter6Batch2Questions } from './seed-chapter-6-questions-batch2';
import { chapter6Batch3Questions } from './seed-chapter-6-questions-batch3';

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

const batch1Questions: QuestionData[] = [
  // =========================================================================
  // Topic 6.1: তাপ ও তাপমাত্রা (Heat and Temperature) [top_ssc_physics_ch6_1]
  // =========================================================================
  {
    id: 'q_ch6_1_mcq_1',
    topicId: 'top_ssc_physics_ch6_1',
    type: 'MCQ',
    stem: 'তাপের আন্তর্জাতিক (SI) একক কোনটি?',
    options: [
      { id: 'opt_6_1_1a', text: 'কেলভিন (K)', isCorrect: false },
      { id: 'opt_6_1_1b', text: 'ক্যালরি (cal)', isCorrect: false },
      { id: 'opt_6_1_1c', text: 'জুল (J)', isCorrect: true },
      { id: 'opt_6_1_1d', text: 'ওয়াট (W)', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: জুল (J)।',
      coreConcept: 'তাপ এক প্রকার শক্তি। সকল প্রকার শক্তি ও কাজের আন্তর্জাতিক (SI) একক হলো জুল (J)।',
      stepDerivation: 'তাপ হলো তাপমাত্রার পার্থক্যের কারণে স্থানান্তরিত শক্তি। শক্তি কাজের সমতুল্য হওয়ায় এর একক জুল ($1\\text{ J} = 1\\text{ N}\\cdot\\text{m} = 1\\text{ kg}\\cdot\\text{m}^2/\\text{s}^2$)।',
      distractorAnalysis: {
        opt_6_1_1a: 'কেলভিন হলো তাপমাত্রার SI একক, তাপের নয়।',
        opt_6_1_1b: 'ক্যালরি হলো তাপের ঐতিহ্যবাহী বা ব্যবহারিক একক ($1\\text{ cal} \\approx 4.2\\text{ J}$), কিন্তু SI একক নয়।',
        opt_6_1_1d: 'ওয়াট হলো ক্ষমতার একক (কাজ করার হার)।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 156,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_1_mcq_2',
    topicId: 'top_ssc_physics_ch6_1',
    type: 'MCQ',
    stem: 'আণবিক গতিতত্ত্ব অনুসারে বস্তুর তাপমাত্রা মূলত কীসের পরিমাপ?',
    options: [
      { id: 'opt_6_1_2a', text: 'অণুগুলোর মোট শক্তির সমষ্টি', isCorrect: false },
      { id: 'opt_6_1_2b', text: 'অণুগুলোর বিশৃঙ্খল গতির গড় গতিশক্তি', isCorrect: true },
      { id: 'opt_6_1_2c', text: 'আন্তঃআণবিক আকর্ষণ বল', isCorrect: false },
      { id: 'opt_6_1_2d', text: 'বস্তুর সামগ্রিক ভর', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: অণুগুলোর বিশৃঙ্খল গতির গড় গতিশক্তি।',
      coreConcept: 'তাপমাত্রা পদার্থের অণুগুলোর গড় গতিশক্তির সমানুপাতিক ($\\bar{E}_k = \\frac{3}{2} k_B T \\implies \\bar{E}_k \\propto T$)।',
      stepDerivation: 'পদার্থের অণুগুলোর গতিশক্তি যত বৃদ্ধি পায়, তাপমাত্রা তত বাড়ে। এটি মোট শক্তির ওপর নয়, কণার গড় গতিশক্তির ওপর নির্ভরশীল।',
      distractorAnalysis: {
        opt_6_1_2a: 'অণুগুলোর মোট শক্তি হলো অভ্যন্তরীণ শক্তি, যা বস্তুর ভরের ওপরও নির্ভর করে।',
        opt_6_1_2c: 'আন্তঃআণবিক আকর্ষণ বল হলো স্থিতিশক্তির উৎস।',
        opt_6_1_2d: 'তাপমাত্রা ভরের ওপর নির্ভর করে না; এটি একটি ইনটেনসিভ (Intensive) রাশি।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 157,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_1_mcq_3',
    topicId: 'top_ssc_physics_ch6_1',
    type: 'MCQ',
    stem: 'দুটি ভিন্ন বস্তুর তাপীয় সংস্পর্শে তাপপ্রবাহের দিক কোনটির ওপর নির্ভর করে?',
    options: [
      { id: 'opt_6_1_3a', text: 'বস্তু দুটির মোট অভ্যন্তরীণ শক্তি', isCorrect: false },
      { id: 'opt_6_1_3b', text: 'বস্তু দুটির নিজস্ব ভর', isCorrect: false },
      { id: 'opt_6_1_3c', text: 'বস্তু দুটির তাপমাত্রা', isCorrect: true },
      { id: 'opt_6_1_3d', text: 'বস্তু দুটির আয়তন', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: বস্তু দুটির তাপমাত্রা।',
      coreConcept: 'তাপ সর্বদা স্বতঃস্ফূর্তভাবে উচ্চ তাপমাত্রার বস্তু থেকে নিম্ন তাপমাত্রার বস্তুতে প্রবাহিত হয়, মোট শক্তি বা ভরের ওপর তা নির্ভর করে না।',
      stepDerivation: 'যেমন একটি বড় বরফ হ্রদের মোট অভ্যন্তরীণ শক্তি জ্বলন্ত দেশলাই কাঠি অপেক্ষা কোটি গুণ বেশি হলেও কাঠি হ্রদে ফেললে তাপ কাঠি থেকে হ্রদের পানিতেই যায়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 158,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Chittagong Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_1_mcq_4',
    topicId: 'top_ssc_physics_ch6_1',
    type: 'MCQ',
    stem: '১ ক্যালরি তাপ প্রায় কত জুলের সমান?',
    options: [
      { id: 'opt_6_1_4a', text: '0.24 J', isCorrect: false },
      { id: 'opt_6_1_4b', text: '4.2 J', isCorrect: true },
      { id: 'opt_6_1_4c', text: '4200 J', isCorrect: false },
      { id: 'opt_6_1_4d', text: '1000 J', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 4.2 J।',
      coreConcept: '$1\\text{ cal} \\approx 4.184\\text{ J} \\approx 4.2\\text{ J}$। অপরদিকে $1\\text{ J} \\approx 0.24\\text{ cal}$।',
      stepDerivation: '১ গ্রাম বিশুদ্ধ পানির তাপমাত্রা ১°C বৃদ্ধি করতে ৪.১৮৪ জুল কাজের সমতুল্য তাপশক্তির প্রয়োজন হয়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 157,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Comilla Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_1_cq_1',
    topicId: 'top_ssc_physics_ch6_1',
    type: 'CQ_CREATIVE',
    stem: 'একটি পাত্র A-তে 20°C তাপমাত্রার 4 kg পানি এবং পাত্র B-তে 80°C তাপমাত্রার 200 g পানি রয়েছে। দুটি পাত্রের পানিকে একটি তাপীয় পরিবাহী নল দিয়ে যুক্ত করা হলো। পানির আপেক্ষিক তাপ 4200 J/(kg·K)।',
    options: null,
    explanation: {
      directAnswer: 'গ-এর উত্তর: পাত্র A-তে মোট অভ্যন্তরীণ শক্তি পাত্র B অপেক্ষা অনেক বেশি। ঘ-এর উত্তর: তাপ পাত্র B থেকে পাত্র A-তে প্রবাহিত হবে কারণ পাত্র B-এর তাপমাত্রা বেশি।',
      coreConcept: 'অভ্যন্তরীণ শক্তি এবং তাপপ্রবাহের নিয়ামক (তাপমাত্রা বনাম মোট শক্তি)।',
      stepDerivation: 'কণার গড় গতিশক্তি $\\bar{E}_k \\propto T$। মোট শক্তি $U \\propto msT$। পাত্র A-তে $m_A T_A = 4 \\times 293.15 = 1172.6$ এবং পাত্র B-তে $m_B T_B = 0.2 \\times 353.15 = 70.63$। ফলে পাত্র A-এর মোট অভ্যন্তরীণ শক্তি প্রায় ১৬.৬ গুণ বেশি। তবে তাপমাত্রার পার্থক্যে $T_B (80^\\circ\\text{C}) > T_A (20^\\circ\\text{C})$ হওয়ায় তাপ B থেকে A-তে প্রবাহিত হবে।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 158,
      },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'জ্ঞানমূলক: তাপমাত্রার পার্থক্যের কারণে স্থানান্তরিত শক্তিকে তাপ বলে।' },
      kha: { mark: 2, criteria: 'অনুধাবনমূলক: তাপীয় সাম্যাবস্থায় দুটি বস্তুর তাপমাত্রা সমান হয়ে নিট তাপ বিনিময় শূন্য হওয়ার ব্যাখ্যায় পূর্ণ ২ নম্বর।' },
      ga: { mark: 3, criteria: 'প্রয়োগমূলক: ভর ও তাপমাত্রার গুণফল দেখিয়ে পাত্র A-এর অভ্যন্তরীণ শক্তি পাত্র B অপেক্ষা বেশি তা গাণিতিকভাবে প্রমাণে পূর্ণ ৩ নম্বর।' },
      gha: { mark: 4, criteria: 'উচ্চতর দক্ষতা: মোট শক্তি বেশি হওয়া সত্ত্বেও তাপপ্রবাহের দিক কেন তাপমাত্রা দ্বারা নির্ধারিত হয় তার তাত্ত্বিক ও বাস্তবিক বিশ্লেষণে পূর্ণ ৪ নম্বর।' },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 6.2: তাপমাত্রিক ধর্ম ও স্কেল [top_ssc_physics_ch6_2]
  // =========================================================================
  {
    id: 'q_ch6_2_mcq_1',
    topicId: 'top_ssc_physics_ch6_2',
    type: 'MCQ',
    stem: 'কোন তাপমাত্রায় সেলসিয়াস ও ফারেনহাইট স্কেলে পাঠ অভিন্ন হয়?',
    options: [
      { id: 'opt_6_2_1a', text: '0°', isCorrect: false },
      { id: 'opt_6_2_1b', text: '40°', isCorrect: false },
      { id: 'opt_6_2_1c', text: '-40°', isCorrect: true },
      { id: 'opt_6_2_1d', text: '-273°', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: -40°।',
      coreConcept: '$\\frac{C}{5} = \\frac{F-32}{9}$ সূত্রে $C = F = x$ বসালে $x = -40$ পাওয়া যায়।',
      stepDerivation: '$$\\frac{x}{5} = \\frac{x-32}{9} \\implies 9x = 5x - 160 \\implies 4x = -160 \\implies x = -40$$ অর্থাৎ $-40^\\circ\\text{C} = -40^\\circ\\text{F}$।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 161,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dinajpur Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_2_mcq_2',
    topicId: 'top_ssc_physics_ch6_2',
    type: 'MCQ',
    stem: 'সুস্থ মানবদেহের স্বাভাবিক তাপমাত্রা 98.4°F হলে সেলসিয়াস স্কেলে তা কত?',
    options: [
      { id: 'opt_6_2_2a', text: '35.0°C', isCorrect: false },
      { id: 'opt_6_2_2b', text: '36.89°C', isCorrect: true },
      { id: 'opt_6_2_2c', text: '38.4°C', isCorrect: false },
      { id: 'opt_6_2_2d', text: '40.0°C', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 36.89°C (প্রায় 37°C)।',
      coreConcept: '$\\frac{C}{5} = \\frac{F-32}{9}$।',
      stepDerivation: '$$\\frac{C}{5} = \\frac{98.4 - 32}{9} = \\frac{66.4}{9} \\approx 7.378 \\implies C = 7.378 \\times 5 = 36.89^\\circ\\text{C}$$',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 162,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Rajshahi Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_2_mcq_3',
    topicId: 'top_ssc_physics_ch6_2',
    type: 'MCQ',
    stem: 'রোধ থার্মোমিটারে কোন তাপমাত্রিক ধর্ম ব্যবহার করা হয়?',
    options: [
      { id: 'opt_6_2_3a', text: 'তরলের আয়তন প্রসারণ', isCorrect: false },
      { id: 'opt_6_2_3b', text: 'ধাতব তারের বৈদ্যুতিক রোধ', isCorrect: true },
      { id: 'opt_6_2_3c', text: 'আবদ্ধ গ্যাসের চাপ', isCorrect: false },
      { id: 'opt_6_2_3d', text: 'তাপীয় তড়িৎচালক বল', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: ধাতব তারের বৈদ্যুতিক রোধ।',
      coreConcept: 'প্লাটিনাম রোধ থার্মোমিটারে তাপমাত্রার সাথে ধাতুর বৈদ্যুতিক রোধের সুষম পরিবর্তন ($R_T = R_0(1+\\alpha T)$) ব্যবহার করে তাপমাত্রা মাপা হয়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 160,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Jessore Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_2_mcq_4',
    topicId: 'top_ssc_physics_ch6_2',
    type: 'MCQ',
    stem: 'একটি ত্রুটিপূর্ণ থার্মোমিটার বরফে 4°C এবং বাষ্পে 96°C পাঠ দেয়। থার্মোমিটারটি 50°C পাঠ দিলে প্রকৃত তাপমাত্রা কত?',
    options: [
      { id: 'opt_6_2_4a', text: '46°C', isCorrect: false },
      { id: 'opt_6_2_4b', text: '50°C', isCorrect: true },
      { id: 'opt_6_2_4c', text: '54°C', isCorrect: false },
      { id: 'opt_6_2_4d', text: '52°C', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 50°C।',
      coreConcept: 'ত্রুটিপূর্ণ থার্মোমিটারের ক্ষেত্রে $\\frac{X - X_i}{X_s - X_i} = \\frac{C}{100}$।',
      stepDerivation: '$$\\frac{50 - 4}{96 - 4} = \\frac{C}{100} \\implies \\frac{46}{92} = \\frac{C}{100} \\implies \\frac{1}{2} = \\frac{C}{100} \\implies C = 50^\\circ\\text{C}$$',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 162,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Barisal Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_2_cq_1',
    topicId: 'top_ssc_physics_ch6_2',
    type: 'CQ_CREATIVE',
    stem: 'একটি বিশেষ থার্মোমিটারে বরফবিন্দুকে 10°X এবং বাষ্পবিন্দুকে 130°X দ্বারা চিহ্নিত করা হয়েছে। কোনো একদিন আবহাওয়া দপ্তর জানাল ওই শহরের তাপমাত্রা 40°C।',
    options: null,
    explanation: {
      directAnswer: 'গ-এর উত্তর: ওই থার্মোমিটারে তাপমাত্রা হবে 58°X। ঘ-এর উত্তর: -40° তাপমাত্রায় স্কেলদ্বয়ের তুলনামূলক বিশ্লেষণ নিখুঁত।',
      coreConcept: 'অজানা স্কেলের সাথে সেলসিয়াস স্কেলের রূপান্তর সূত্র: $\\frac{X - X_i}{X_s - X_i} = \\frac{C - 0}{100 - 0}$।',
      stepDerivation: 'মৌলিক ব্যবধান = $130 - 10 = 120$ ভাগ।\n$$\\frac{X - 10}{120} = \\frac{40}{100} = 0.4$$\n$$X - 10 = 0.4 \\times 120 = 48 \\implies X = 58^\\circ\\text{X}$$',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 163,
      },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'জ্ঞানমূলক: তাপমাত্রা পরিমাপের জন্য ব্যবহৃত প্রমাণ তাপমাত্রাকে স্থিরবিন্দু বলে।' },
      kha: { mark: 2, criteria: 'অনুধাবনমূলক: থার্মোমিটারে পারদ ব্যবহারের সুবিধার বর্ণনায় পূর্ণ ২ নম্বর।' },
      ga: { mark: 3, criteria: 'প্রয়োগমূলক: সঠিক সূত্রে মান বসিয়ে ওই থার্মোমিটারের পাঠ ৫৮°X নির্ণয়ে পূর্ণ ৩ নম্বর।' },
      gha: { mark: 4, criteria: 'উচ্চতর দক্ষতা: যেকোনো তাপমাত্রায় X স্কেল এবং ফারেনহাইট স্কেলের সম্পর্ক গাণিতিকভাবে প্রতিপাদনে পূর্ণ ৪ নম্বর।' },
    },
    difficulty: 'HARD',
    boardSource: 'Chittagong Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 6.3: পদার্থের তাপীয় প্রসারণ [top_ssc_physics_ch6_3]
  // =========================================================================
  {
    id: 'q_ch6_3_mcq_1',
    topicId: 'top_ssc_physics_ch6_3',
    type: 'MCQ',
    stem: 'কঠিন পদার্থের দৈর্ঘ্য প্রসারণ সহগ (α), ক্ষেত্র প্রসারণ সহগ (β) এবং আয়তন প্রসারণ সহগের (γ) মধ্যে সঠিক সম্পর্ক কোনটি?',
    options: [
      { id: 'opt_6_3_1a', text: 'α = 2β = 3γ', isCorrect: false },
      { id: 'opt_6_3_1b', text: 'α/1 = β/2 = γ/3', isCorrect: true },
      { id: 'opt_6_3_1c', text: 'α = β = γ', isCorrect: false },
      { id: 'opt_6_3_1d', text: 'γ = 2β = 3α', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: α/1 = β/2 = γ/3।',
      coreConcept: 'ক্ষেত্র প্রসারণ সহগ দৈর্ঘ্য প্রসারণ সহগের প্রায় দ্বিগুণ ($\\beta \\approx 2\\alpha$) এবং আয়তন প্রসারণ সহগ দৈর্ঘ্য প্রসারণ সহগের প্রায় তিনগুণ ($\\gamma \\approx 3\\alpha$)।',
      stepDerivation: '$$\\beta = 2\\alpha \\implies \\alpha = \\frac{\\beta}{2}$$ এবং $$\\gamma = 3\\alpha \\implies \\alpha = \\frac{\\gamma}{3}$$ অতএব $$\\frac{\\alpha}{1} = \\frac{\\beta}{2} = \\frac{\\gamma}{3}$$',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 165,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_3_mcq_2',
    topicId: 'top_ssc_physics_ch6_3',
    type: 'MCQ',
    stem: '20 m দৈর্ঘ্যের একটি তামার তারের তাপমাত্রা 50 K বাড়ালে এর দৈর্ঘ্য কতটুকু বাড়বে? (তামার α = 16.7 × 10⁻⁶ K⁻¹)',
    options: [
      { id: 'opt_6_3_2a', text: '0.0167 m', isCorrect: true },
      { id: 'opt_6_3_2b', text: '0.167 m', isCorrect: false },
      { id: 'opt_6_3_2c', text: '0.00167 m', isCorrect: false },
      { id: 'opt_6_3_2d', text: '1.67 m', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: 0.0167 m (বা 16.7 mm)।',
      coreConcept: '$\\Delta L = L_1 \\cdot \\alpha \\cdot \\Delta T$।',
      stepDerivation: '$$\\Delta L = 20 \\times (16.7 \\times 10^{-6}) \\times 50 = 1000 \\times 16.7 \\times 10^{-6} = 1.67 \\times 10^{-2}\\text{ m} = 0.0167\\text{ m}$$',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 166,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Rajshahi Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_3_mcq_3',
    topicId: 'top_ssc_physics_ch6_3',
    type: 'MCQ',
    stem: 'কত তাপমাত্রায় পানির ঘনত্ব সর্বোচ্চ (1000 kg/m³)?',
    options: [
      { id: 'opt_6_3_3a', text: '0°C', isCorrect: false },
      { id: 'opt_6_3_3b', text: '4°C', isCorrect: true },
      { id: 'opt_6_3_3c', text: '100°C', isCorrect: false },
      { id: 'opt_6_3_3d', text: '-4°C', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 4°C।',
      coreConcept: 'পানির ব্যতিক্রমী প্রসারণের কারণে 0°C থেকে 4°C পর্যন্ত উত্তপ্ত করলে আয়তন সংকুচিত হয়ে 4°C-এ সর্বনিম্ন হয় এবং ঘনত্ব সর্বোচ্চ (1000 kg/m³) পৌঁছায়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 167,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dinajpur Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_3_mcq_4',
    topicId: 'top_ssc_physics_ch6_3',
    type: 'MCQ',
    stem: 'তরলের প্রকৃত প্রসারণ (γ_r) ও আপাত প্রসারণের (γ_a) মধ্যে সঠিক সম্পর্ক কোনটি? (γ_g হলো পাত্রের প্রসারণ সহগ)',
    options: [
      { id: 'opt_6_3_4a', text: 'γ_r = γ_a - γ_g', isCorrect: false },
      { id: 'opt_6_3_4b', text: 'γ_r = γ_a + γ_g', isCorrect: true },
      { id: 'opt_6_3_4c', text: 'γ_a = γ_r + γ_g', isCorrect: false },
      { id: 'opt_6_3_4d', text: 'γ_r = γ_a × γ_g', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: γ_r = γ_a + γ_g।',
      coreConcept: 'তরলকে পাত্রে রেখে উত্তপ্ত করলে পাত্রের প্রসারণ ঘটে। তরলের প্রকৃত প্রসারণ হলো দৃশ্যমান আপাত প্রসারণ এবং পাত্রের প্রসারণের যোগফলের সমান।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 167,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Sylhet Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_3_cq_1',
    topicId: 'top_ssc_physics_ch6_3',
    type: 'CQ_CREATIVE',
    stem: 'রেললাইনের দুটি ইস্পাতের পাতের দৈর্ঘ্য 20°C তাপমাত্রায় 50 m। গ্রীষ্মকালে ওই অঞ্চলের তাপমাত্রা বেড়ে 55°C পর্যন্ত হতে পারে। ইস্পাতের দৈর্ঘ্য প্রসারণ সহগ α = 11 × 10⁻⁶ K⁻¹। রেলওয়ে প্রকৌশলী দুটি পাতের সংযোগস্থলে 1.5 cm ফাঁকা জায়গা রাখলেন।',
    options: null,
    explanation: {
      directAnswer: 'গ-এর উত্তর: পাতের দৈর্ঘ্য বৃদ্ধি পাবে 0.01925 m বা 1.925 cm। ঘ-এর উত্তর: রাখা ফাঁকা জায়গা (1.5 cm) প্রসারণ (1.925 cm) অপেক্ষা কম হওয়ায় লাইন বেঁকে দুর্ঘটনা ঘটার আশঙ্কা রয়েছে।',
      coreConcept: 'কঠিনের দৈর্ঘ্য প্রসারণ $\\Delta L = L_1 \\alpha \\Delta T$ এবং বাস্তব প্রকৌশলগত ঝুঁকি বিশ্লেষণ।',
      stepDerivation: 'আদি দৈর্ঘ্য $L_1 = 50\\text{ m}$, $\\Delta T = 55 - 20 = 35\\text{ K}$, $\\alpha = 11 \\times 10^{-6}\\text{ K}^{-1}$।\n$$\\Delta L = 50 \\times (11 \\times 10^{-6}) \\times 35 = 0.01925\\text{ m} = 1.925\\text{ cm}$$\nপ্রকৌশলী ফাঁকা রেখেছেন $1.5\\text{ cm}$। যেহেতু $1.925\\text{ cm} > 1.5\\text{ cm}$, তাই গ্রীষ্মকালে দুটি পাত পরস্পরের গায়ে প্রচণ্ড চাপ প্রয়োগ করবে এবং লাইন বেঁকে যেতে পারে।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 168,
      },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'জ্ঞানমূলক: ১ মিটার দৈর্ঘ্যের দণ্ডের তাপমাত্রা ১ কেলভিন বাড়ালে যে দৈর্ঘ্য বৃদ্ধি পায় তাকে দৈর্ঘ্য প্রসারণ সহগ বলে।' },
      kha: { mark: 2, criteria: 'অনুধাবনমূলক: পানির ব্যতিক্রমী প্রসারণ ও ৪°C-এ জলজ প্রাণীর বেঁচে থাকার বৈজ্ঞানিক ব্যাখ্যায় পূর্ণ ২ নম্বর।' },
      ga: { mark: 3, criteria: 'প্রয়োগমূলক: সঠিক সূত্রে মান বসিয়ে দৈর্ঘ্য বৃদ্ধি ১.৯২৫ সেমি নির্ভুলভাবে নির্ণয়ে পূর্ণ ৩ নম্বর।' },
      gha: { mark: 4, criteria: 'উচ্চতর দক্ষতা: ১.৯২৫ সেমি > ১.৫ সেমি দেখিয়ে লাইন বেঁকে যাওয়ার ঝুঁকি ও প্রকৌশলগত সিদ্ধান্তের ত্রুটি প্রমাণে পূর্ণ ৪ নম্বর।' },
    },
    difficulty: 'HARD',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 6.4: অবস্থার পরিবর্তন ও সুপ্ততাপ [top_ssc_physics_ch6_4]
  // =========================================================================
  {
    id: 'q_ch6_4_mcq_1',
    topicId: 'top_ssc_physics_ch6_4',
    type: 'MCQ',
    stem: 'বরফ গলনের আপেক্ষিক সুপ্ততাপের (L_f) মান কত?',
    options: [
      { id: 'opt_6_4_1a', text: '4200 J/kg', isCorrect: false },
      { id: 'opt_6_4_1b', text: '3.36 × 10⁵ J/kg', isCorrect: true },
      { id: 'opt_6_4_1c', text: '2.26 × 10⁶ J/kg', isCorrect: false },
      { id: 'opt_6_4_1d', text: '3.36 × 10³ J/kg', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 3.36 × 10⁵ J/kg।',
      coreConcept: '0°C তাপমাত্রার ১ কেজি বরফকে তাপমাত্রা বৃদ্ধি না করে সম্পূর্ণ 0°C তাপমাত্রার পানিতে রূপান্তর করতে ৩৩৬,০০০ জুল তাপের প্রয়োজন হয়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 169,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_4_mcq_2',
    topicId: 'top_ssc_physics_ch6_4',
    type: 'MCQ',
    stem: 'পানির বাষ্পীভবনের আপেক্ষিক সুপ্ততাপ (L_v) কত?',
    options: [
      { id: 'opt_6_4_2a', text: '3.36 × 10⁵ J/kg', isCorrect: false },
      { id: 'opt_6_4_2b', text: '2.26 × 10⁶ J/kg', isCorrect: true },
      { id: 'opt_6_4_2c', text: '4200 J/kg', isCorrect: false },
      { id: 'opt_6_4_2d', text: '2.26 × 10⁵ J/kg', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 2.26 × 10⁶ J/kg (বা 2.26 × 10⁶ J·kg⁻¹)।',
      coreConcept: '১০০°C তাপমাত্রার ১ কেজি ফুটন্ত পানিকে ১০০°C তাপমাত্রার বাষ্পে পরিণত করতে ২২,৬০,০০০ জুল তাপশক্তির প্রয়োজন হয়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 170,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Jessore Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_4_mcq_3',
    topicId: 'top_ssc_physics_ch6_4',
    type: 'MCQ',
    stem: 'অবস্থার পরিবর্তনের সময় পদার্থে তাপ দেওয়া সত্ত্বেও তাপমাত্রা বাড়ে না কেন?',
    options: [
      { id: 'opt_6_4_3a', text: 'অণুগুলোর গতিশক্তি শূন্য হয়ে যায়', isCorrect: false },
      { id: 'opt_6_4_3b', text: 'তাপশক্তি আন্তঃআণবিক বন্ধন ভাঙতে ব্যয় হয়', isCorrect: true },
      { id: 'opt_6_4_3c', text: 'তাপশক্তি মহাশূন্যে বিকিরিত হয়', isCorrect: false },
      { id: 'opt_6_4_3d', text: 'পদার্থের ভর বৃদ্ধি পায়', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: তাপশক্তি আন্তঃআণবিক বন্ধন ভাঙতে ব্যয় হয়।',
      coreConcept: 'তাপমাত্রা অণুর গড় গতিশক্তির সমানুপাতিক। দশান্তরের সময় শোষিত তাপ অণুর গতি না বাড়িয়ে আন্তঃআণবিক বন্ধন শিথিল করতে ব্যয় হওয়ায় তাপমাত্রা অপরিবর্তিত থাকে।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 170,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dinajpur Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_4_mcq_4',
    topicId: 'top_ssc_physics_ch6_4',
    type: 'MCQ',
    stem: 'বাষ্পীভবনের কারণে পরিবেশ শীতল হওয়ার বৈজ্ঞানিক কারণ কী?',
    options: [
      { id: 'opt_6_4_4a', text: 'বাষ্প ঠান্ডা বাতাস শোষণ করে', isCorrect: false },
      { id: 'opt_6_4_4b', text: 'সর্বোচ্চ গতিশক্তির অণুগুলো উড়ে যাওয়ায় অবশিষ্ট তরলের গড় গতিশক্তি কমে যায়', isCorrect: true },
      { id: 'opt_6_4_4c', text: 'তরলের ভর বৃদ্ধি পায়', isCorrect: false },
      { id: 'opt_6_4_4d', text: 'তরলের ঘনত্ব বৃদ্ধি পায়', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: সর্বোচ্চ গতিশক্তির অণুগুলো উড়ে যাওয়ায় অবশিষ্ট তরলের গড় গতিশক্তি কমে যায়।',
      coreConcept: 'দ্রুতগতির অণু বাষ্পীভূত হয়ে বের হলে তরলে থাকা অণুগুলোর গড় গতিশক্তি কমে যায়। তাপমাত্রা গড় গতিশক্তির নির্দেশক হওয়ায় তাপমাত্রা হ্রাস পেয়ে শীতলতা তৈরি হয়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 171,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dhaka Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_4_cq_1',
    topicId: 'top_ssc_physics_ch6_4',
    type: 'CQ_CREATIVE',
    stem: 'একটি বীকারে 0°C তাপমাত্রার 250 g বরফ নিয়ে একটি বার্নারের সাহায্যে সুষম হারে তাপ দেওয়া শুরু হলো। 10 মিনিট পর দেখা গেল সমস্ত বরফ গলে 0°C তাপমাত্রার পানিতে রূপান্তরিত হয়েছে। তাপ সরবরাহ অব্যাহত রাখায় আরও 12.5 মিনিট পর পানি ফুটতে শুরু করল। [L_f = 3.36 × 10⁵ J/kg, s = 4200 J/(kg·K)]',
    options: null,
    explanation: {
      directAnswer: 'গ-এর উত্তর: বরফ গলাতে শোষিত সুপ্ততাপ 84,000 জুল। ঘ-এর উত্তর: পানিকে 100°C-এ নিতে প্রয়োজনীয় তাপ 105,000 জুল এবং বার্নারের তাপ সরবরাহের হারের তুলনামূলক বিশ্লেষণ সম্পূর্ণ সঠিক।',
      coreConcept: 'সুপ্ততাপের সমীকরণ $Q = mL_f$ এবং তাপমাত্রার পরিবর্তনে তাপ $Q = ms\\Delta T$।',
      stepDerivation: '১. বরফ গলনে তাপ: $Q_1 = m L_f = 0.25 \\times (3.36 \\times 10^5) = 84,000\\text{ J}$।\n১০ মিনিটে সরবরাহ হলে প্রতি সেকেন্ডে তাপ: $P = \\frac{84000}{600\\text{ s}} = 140\\text{ W}$।\n২. পানিকে 0°C থেকে 100°C-এ নিতে তাপ: $Q_2 = 0.25 \\times 4200 \\times 100 = 105,000\\text{ J}$।\nসময় লাগার কথা: $t = \\frac{105000}{140} = 750\\text{ s} = 12.5\\text{ মিনিট}$। এটি উদ্দীপকের সাথে হুবহু মিলে যায়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 171,
      },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'জ্ঞানমূলক: তাপমাত্রা অপরিবর্তিত রেখে একক ভরের কঠিনকে তরলে রূপান্তরের তাপকে গলনের সুপ্ততাপ বলে।' },
      kha: { mark: 2, criteria: 'অনুধাবনমূলক: ১০০°C পানির চেয়ে ১০০°C বাষ্পে বেশি পোড়ার কারণ বাষ্পীভবনের বিপুল সুপ্ততাপ মুক্তির ব্যাখ্যায় পূর্ণ ২ নম্বর।' },
      ga: { mark: 3, criteria: 'প্রয়োগমূলক: সঠিক সূত্রে মান বসিয়ে বরফ গলনে ৮৪,০০০ জুল তাপ নির্ণয়ে পূর্ণ ৩ নম্বর।' },
      gha: { mark: 4, criteria: 'উচ্চতর দক্ষতা: বার্নারের ক্ষমতা ১৪০ ওয়াট এবং ১২.৫ মিনিটে ১০৫,০০০ জুল তাপ হিসেব করে উদ্দীপকের সত্যতা যাচাইয়ে পূর্ণ ৪ নম্বর।' },
    },
    difficulty: 'HARD',
    boardSource: 'Rajshahi Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_1_mcq_5',
    topicId: 'top_ssc_physics_ch6_1',
    type: 'MCQ',
    stem: 'তাপের মাত্রা সমীকরণ কোনটি?',
    options: [
      { id: 'opt_6_1_5a', text: '[MLT⁻²]', isCorrect: false },
      { id: 'opt_6_1_5b', text: '[ML²T⁻²]', isCorrect: true },
      { id: 'opt_6_1_5c', text: '[ML²T⁻³]', isCorrect: false },
      { id: 'opt_6_1_5d', text: '[ML⁻¹T⁻²]', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: [ML²T⁻²]।',
      coreConcept: 'তাপ এক প্রকার শক্তি বা কাজ। কাজের মাত্রা বল × সরণ = [MLT⁻²] × [L] = [ML²T⁻²]।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 156,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Jessore Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_2_mcq_5',
    topicId: 'top_ssc_physics_ch6_2',
    type: 'MCQ',
    stem: 'থার্মোমিটারের স্কেলে 50°C তাপমাত্রা ফারেনহাইট স্কেলে কত?',
    options: [
      { id: 'opt_6_2_5a', text: '90°F', isCorrect: false },
      { id: 'opt_6_2_5b', text: '122°F', isCorrect: true },
      { id: 'opt_6_2_5c', text: '100°F', isCorrect: false },
      { id: 'opt_6_2_5d', text: '142°F', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 122°F।',
      coreConcept: '$\\frac{C}{5} = \\frac{F-32}{9} \\implies F = \\frac{9}{5}C + 32$।',
      stepDerivation: '$$F = \\frac{9}{5}(50) + 32 = 90 + 32 = 122^\\circ\\text{F}$$',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 161,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Cumilla Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_2_mcq_6',
    topicId: 'top_ssc_physics_ch6_2',
    type: 'MCQ',
    stem: 'মানবদেহের জ্বর পরিমাপে ব্যবহৃত ক্লিনিক্যাল থার্মোমিটারের সচরাচর দাগাঙ্কন কত থেকে কত ফারেনহাইট থাকে?',
    options: [
      { id: 'opt_6_2_6a', text: '32°F থেকে 212°F', isCorrect: false },
      { id: 'opt_6_2_6b', text: '95°F থেকে 110°F', isCorrect: true },
      { id: 'opt_6_2_6c', text: '0°F থেকে 100°F', isCorrect: false },
      { id: 'opt_6_2_6d', text: '90°F থেকে 105°F', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 95°F থেকে 110°F।',
      coreConcept: 'জীবিত মানুষের দেহের তাপমাত্রা সাধারণত ৯৫°F-এর নিচে বা ১১০°F-এর ওপরে যায় না, তাই ক্লিনিক্যাল থার্মোমিটার এই নির্দিষ্ট সীমার মধ্যে দাগাঙ্কিত থাকে।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 162,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dinajpur Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_3_mcq_5',
    topicId: 'top_ssc_physics_ch6_3',
    type: 'MCQ',
    stem: 'একটি দ্বি-ধাতব পাত (Bimetallic strip) তামা ও লোহা দিয়ে তৈরি। উত্তপ্ত করলে পাতটি কোন দিকে বাঁকবে?',
    options: [
      { id: 'opt_6_3_5a', text: 'লোহার দিকে (লোহা ভেতরের বক্রতলে থাকবে)', isCorrect: true },
      { id: 'opt_6_3_5b', text: 'তামার দিকে (তামা ভেতরের বক্রতলে থাকবে)', isCorrect: false },
      { id: 'opt_6_3_5c', text: 'একদম সোজা থাকবে', isCorrect: false },
      { id: 'opt_6_3_5d', text: 'মুহূর্তে গলে যাবে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: লোহার দিকে (লোহা ভেতরের বক্রতলে থাকবে)।',
      coreConcept: 'তামার দৈর্ঘ্য প্রসারণ সহগ (16.7 × 10⁻⁶ K⁻¹) লোহার (12 × 10⁻⁶ K⁻¹) চেয়ে বেশি। ফলে তামা বেশি প্রসারিত হয়ে বাইরের উত্তল পৃষ্ঠ গঠন করে এবং লোহা কম প্রসারিত হয়ে ভেতরের অবতল পৃষ্ঠে থাকে।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 166,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dhaka Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_4_mcq_5',
    topicId: 'top_ssc_physics_ch6_4',
    type: 'MCQ',
    stem: 'জলীয় বাষ্প ঘনীভূত হয়ে তরল পানিতে পরিণত হওয়ার সময় তাপের কী ঘটে?',
    options: [
      { id: 'opt_6_4_5a', text: 'সুপ্ততাপ শোষিত হয়', isCorrect: false },
      { id: 'opt_6_4_5b', text: 'সুপ্ততাপ বর্জিত হয়', isCorrect: true },
      { id: 'opt_6_4_5c', text: 'কোনো তাপ আদান-প্রদান হয় না', isCorrect: false },
      { id: 'opt_6_4_5d', text: 'তাপমাত্রা হঠাৎ বৃদ্ধি পায়', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: সুপ্ততাপ বর্জিত হয়।',
      coreConcept: 'বাষ্পীভবনে তরল সুপ্ততাপ শোষণ করে বাষ্প হয়। উল্টোভাবে ঘনীভবনে বাষ্প ঠিক সমপরিমাণ সুপ্ততাপ (Lv = 2.26 × 10⁶ J/kg) পরিবেশে বর্জন করে তরলে রূপ নেয়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 170,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Mymensingh Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_4_mcq_6',
    topicId: 'top_ssc_physics_ch6_4',
    type: 'MCQ',
    stem: 'বাষ্পায়নের হার নিচের কোনটির ওপর নির্ভর করে না?',
    options: [
      { id: 'opt_6_4_6a', text: 'উন্মুক্ত পৃষ্ঠের ক্ষেত্রফল', isCorrect: false },
      { id: 'opt_6_4_6b', text: 'বাতাসের আর্দ্রতা', isCorrect: false },
      { id: 'opt_6_4_6c', text: 'তরলের বর্ণ বা পাত্রের রং', isCorrect: true },
      { id: 'opt_6_4_6d', text: 'তরল ও পরিবেশের তাপমাত্রা', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: তরলের বর্ণ বা পাত্রের রং।',
      coreConcept: 'বাষ্পায়নের হার পৃষ্ঠের ক্ষেত্রফল, তাপমাত্রা, আর্দ্রতা, বায়ুপ্রবাহ, তরলের প্রকৃতি ও বায়ুমণ্ডলীয় চাপের ওপর নির্ভর করে; তরলের বর্ণ বা পাত্রের রঙের ওপর নয়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 171,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Barisal Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];

export const chapter6Questions: QuestionData[] = [
  ...batch1Questions,
  ...chapter6Batch2Questions,
  ...chapter6Batch3Questions,
];
