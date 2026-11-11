import { ContentStatus } from '@prisma/client';
import { chapter9Batch2Questions } from './seed-chapter-9-questions-batch2';
import { chapter9Batch3Questions } from './seed-chapter-9-questions-batch3';

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
  // Topic 9.1: আলোর প্রতিসরণ ও স্নেলের সূত্র [top_ssc_physics_ch9_1]
  // =========================================================================
  {
    id: 'q_ch9_1_mcq_1',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'MCQ',
    stem: 'আলোকরশ্মি আলোকীয়ভাবে হালকা মাধ্যম থেকে ঘন মাধ্যমে তির্যকভাবে প্রবেশ করলে প্রতিসরিত রশ্মি কোন দিকে বেঁকে যায়?',
    options: [
      { id: 'opt_9_1_1a', text: 'অভিলম্ব থেকে দূরে সরে যায়', isCorrect: false },
      { id: 'opt_9_1_1b', text: 'অভিলম্বের দিকে বেঁকে যায়', isCorrect: true },
      { id: 'opt_9_1_1c', text: 'একই সরলরেখায় সোজা চলে যায়', isCorrect: false },
      { id: 'opt_9_1_1d', text: 'বিভেদতল ঘেঁষে চলে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: অভিলম্বের দিকে বেঁকে যায়।',
      coreConcept: 'ঘন মাধ্যমে আলোর বেগ কমে যায় বলে রশ্মি অভিলম্বের দিকে ঝুঁকে পড়ে ($r < i$)।',
      distractorAnalysis: {
        opt_9_1_1a: 'ঘন থেকে হালকা মাধ্যমে গেলে অভিলম্ব থেকে দূরে সরে যায়।',
        opt_9_1_1c: 'কেবল লম্বভাবে ($i = 0^\\circ$) আপতিত হলেই সোজা যায়।',
        opt_9_1_1d: 'ঘন থেকে হালকা মাধ্যমে ঠিক সংকট কোণে পড়লে বিভেদতল ঘেঁষে চলে।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB)',
        chapterName: 'নবম অধ্যায়: আলোর প্রতিসরণ',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_1_mcq_2',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'MCQ',
    stem: 'আলোকরশ্মি এক স্বচ্ছ মাধ্যম থেকে অন্য স্বচ্ছ মাধ্যমে প্রবেশ করলে কোন রাশিটি কখনোই পরিবর্তিত হয় না?',
    options: [
      { id: 'opt_9_1_2a', text: 'আলোর বেগ (v)', isCorrect: false },
      { id: 'opt_9_1_2b', text: 'তরঙ্গদৈর্ঘ্য (λ)', isCorrect: false },
      { id: 'opt_9_1_2c', text: 'কম্পাঙ্ক (f)', isCorrect: true },
      { id: 'opt_9_1_2d', text: 'চলার দিক', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: কম্পাঙ্ক (f)।',
      coreConcept: 'আলোর কম্পাঙ্ক কেবল আলোর উৎসের ওপর নির্ভর করে; মাধ্যম পরিবর্তনে বেগ ও তরঙ্গদৈর্ঘ্য একই অনুপাতে পরিবর্তিত হয় কিন্তু কম্পাঙ্ক অপরিবর্তিত থাকে।',
      distractorAnalysis: {
        opt_9_1_2a: 'বেগ $v = c/n$ অনুযায়ী পরিবর্তিত হয়।',
        opt_9_1_2b: 'তরঙ্গদৈর্ঘ্য $\\lambda = \\lambda_0 / n$ অনুযায়ী পরিবর্তিত হয়।',
        opt_9_1_2d: 'তির্যক আপতনে চলার দিক পরিবর্তিত হয়।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_1_mcq_3',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'MCQ',
    stem: 'পানির প্রতিসরণাঙ্ক 1.33 হলে পানিতে আলোর বেগ কত? ($c = 3 \\times 10^8\\text{ m/s}$)',
    options: [
      { id: 'opt_9_1_3a', text: '3.99 × 10⁸ m/s', isCorrect: false },
      { id: 'opt_9_1_3b', text: '2.26 × 10⁸ m/s', isCorrect: true },
      { id: 'opt_9_1_3c', text: '2.00 × 10⁸ m/s', isCorrect: false },
      { id: 'opt_9_1_3d', text: '1.24 × 10⁸ m/s', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 2.26 × 10⁸ m/s।',
      coreConcept: '$v = \\frac{c}{n} = \\frac{3 \\times 10^8}{1.33} \\approx 2.26 \\times 10^8\\text{ m/s}$।',
      distractorAnalysis: {
        opt_9_1_3a: 'শূন্য মাধ্যমে আলোর বেগের চেয়ে কোনো মাধ্যমে বেগ বেশি হতে পারে না।',
        opt_9_1_3c: '$2.00 \\times 10^8\\text{ m/s}$ হলো কাচে ($n=1.5$) আলোর বেগ।',
        opt_9_1_3d: '$1.24 \\times 10^8\\text{ m/s}$ হলো হীরকে ($n=2.42$) আলোর বেগ।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Cumilla Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_1_mcq_4',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'MCQ',
    stem: 'নিচের কোনটি স্নেলের সূত্রের গাণিতিক রূপ?',
    options: [
      { id: 'opt_9_1_4a', text: 'n₁ cos i = n₂ cos r', isCorrect: false },
      { id: 'opt_9_1_4b', text: 'n₁ sin i = n₂ sin r', isCorrect: true },
      { id: 'opt_9_1_4c', text: 'n₁ tan i = n₂ tan r', isCorrect: false },
      { id: 'opt_9_1_4d', text: 'n₁/n₂ = sin i / sin r', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: n₁ sin i = n₂ sin r।',
      coreConcept: 'দুটি নির্দিষ্ট মাধ্যম এবং নির্দিষ্ট বর্ণের আলোর জন্য প্রথম মাধ্যমে আপতন কোণের সাইন ও দ্বিতীয় মাধ্যমে প্রতিসরণ কোণের সাইনের অনুপাত ধ্রুবক: $\\frac{\\sin i}{\\sin r} = \\frac{n_2}{n_1} \\implies n_1 \\sin i = n_2 \\sin r$।',
      distractorAnalysis: {
        opt_9_1_4a: 'cosine নয়, sine-এর অনুপাত ধ্রুবক।',
        opt_9_1_4c: 'tangent নয়।',
        opt_9_1_4d: 'অনুপাতটি উল্টে দেওয়া হয়েছে ($n_2/n_1 = \\sin i / \\sin r$)।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'All Boards 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_1_mcq_5',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'MCQ',
    stem: 'পানিতে আংশিক ডোবানো একটি সোজা লাঠি ওপর থেকে তির্যকভাবে দেখলে ভাঙা বা বাঁকা মনে হয় কেন?',
    options: [
      { id: 'opt_9_1_5a', text: 'আলোর প্রতিফলনের কারণে', isCorrect: false },
      { id: 'opt_9_1_5b', text: 'আলোর প্রতিসরণের কারণে', isCorrect: true },
      { id: 'opt_9_1_5c', text: 'আলোর বিচ্ছুরণের কারণে', isCorrect: false },
      { id: 'opt_9_1_5d', text: 'আলোর ব্যতিচারের কারণে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: আলোর প্রতিসরণের কারণে।',
      coreConcept: 'পানির ভেতরের অংশ থেকে আসা আলো পানি-বায়ু বিভেদতলে অভিলম্ব থেকে দূরে বেঁকে চোখে আসে, ফলে ডোবানো অংশটি প্রকৃত অবস্থানের চেয়ে কিছুটা ওপরে মনে হয়।',
      distractorAnalysis: {
        opt_9_1_5a: 'পৃষ্ঠের ওপর প্রতিবিম্ব গঠনে প্রতিফলন ভূমিকা রাখে, কিন্তু লাঠি বাঁকা দেখানো প্রতিসরণের ফল।',
        opt_9_1_5c: 'বিচ্ছুরণে সাতটি রং আলাদা হয়।',
        opt_9_1_5d: 'ব্যতিচার তরঙ্গের উপরিপাতনজনিত ঘটনা।',
      },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_1_mcq_6',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'MCQ',
    stem: 'বায়ু থেকে একটি আলোকরশ্মি $45^\\circ$ আপতন কোণে একটি মাধ্যমের ওপর পড়ে $30^\\circ$ কোণে প্রতিসরিত হলে ওই মাধ্যমের প্রতিসরণাঙ্ক কত?',
    options: [
      { id: 'opt_9_1_6a', text: '0.707', isCorrect: false },
      { id: 'opt_9_1_6b', text: '1.414', isCorrect: true },
      { id: 'opt_9_1_6c', text: '1.500', isCorrect: false },
      { id: 'opt_9_1_6d', text: '1.732', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 1.414।',
      coreConcept: '$n = \\frac{\\sin i}{\\sin r} = \\frac{\\sin 45^\\circ}{\\sin 30^\\circ} = \\frac{1/\\sqrt{2}}{1/2} = \\sqrt{2} \\approx 1.414$।',
      distractorAnalysis: {
        opt_9_1_6a: '$\\sin 30^\\circ / \\sin 45^\\circ$ করলে $1/\\sqrt{2} = 0.707$ আসে; পরম প্রতিসরণাঙ্ক $1$-এর কম হতে পারে না।',
        opt_9_1_6c: 'ক্রাউন কাচের সাধারণ মান।',
        opt_9_1_6d: '$\\sqrt{3}$-এর মান।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Sylhet Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_1_mcq_7',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'MCQ',
    stem: 'পানির ঘনত্ব $1000\\text{ kg/m}^3$ ($n = 1.33$) এবং কেরোসিনের ঘনত্ব $800\\text{ kg/m}^3$ ($n = 1.44$)। আলো পানি থেকে কেরোসিনে প্রবেশ করলে কোনটি ঘটবে?',
    options: [
      { id: 'opt_9_1_7a', text: 'কেরোসিন ভর-ঘনত্বে হালকা বলে আলো অভিলম্ব থেকে দূরে সরবে', isCorrect: false },
      { id: 'opt_9_1_7b', text: 'কেরোসিনের আলোকীয় ঘনত্ব বেশি বলে আলো অভিলম্বের দিকে বাঁকবে', isCorrect: true },
      { id: 'opt_9_1_7c', text: 'আলোর বেগ বৃদ্ধি পাবে', isCorrect: false },
      { id: 'opt_9_1_7d', text: 'পূর্ণ অভ্যন্তরীণ প্রতিফলন ঘটতে পারে না কখনোই—কারণ দুটিই তরল', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: কেরোসিনের আলোকীয় ঘনত্ব বেশি বলে আলো অভিলম্বের দিকে বাঁকবে।',
      coreConcept: 'আলোর প্রতিসরণ ভর-ঘনত্বের ওপর নয়, <strong>আলোকীয় ঘনত্ব</strong> (প্রতিসরণাঙ্ক $n$)-এর ওপর নির্ভরশীল। $n_{\\text{kerosene}} = 1.44 > n_{\\text{water}} = 1.33$।',
      distractorAnalysis: {
        opt_9_1_7a: 'ভর-ঘনত্ব দিয়ে আলোর বাঁক নির্ণয় করা ভুল।',
        opt_9_1_7c: '$n$ বেশি হওয়ায় কেরোসিনে বেগ কমবে।',
        opt_9_1_7d: 'কেরোসিন থেকে পানিতে গেলে TIR সম্ভব।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Chattogram Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_1_mcq_8',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'MCQ',
    stem: 'ঘন মাধ্যমের ভেতরের কোনো বস্তুকে ওপরের হালকা মাধ্যম থেকে দেখলে এর প্রতিবিম্ব কোথায় দেখা যাবে?',
    options: [
      { id: 'opt_9_1_8a', text: 'উপরের দিকে উঠে আসবে', isCorrect: true },
      { id: 'opt_9_1_8b', text: 'নিচের দিকে সরে যাবে', isCorrect: false },
      { id: 'opt_9_1_8c', text: 'একই জায়গায় থাকবে', isCorrect: false },
      { id: 'opt_9_1_8d', text: 'অদৃশ্য হয়ে যাবে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: উপরের দিকে উঠে আসবে।',
      coreConcept: 'পাঠ্যবইয়ের পৃষ্ঠা ২৬৭ প্রশ্ন ১ অনুযায়ী ঘন থেকে হালকা মাধ্যমে আলো বেরোনোর সময় অভিলম্ব থেকে দূরে সরে যায় বলে প্রতিবিম্ব প্রকৃত অবস্থানের চেয়ে ওপরে উঠে আসে।',
      distractorAnalysis: {
        opt_9_1_8b: 'হালকা মাধ্যমের বস্তুকে ঘন মাধ্যম থেকে দেখলে ওপরে/দূরে সরে যায়, এখানে ঘনের বস্তুকে হালকা থেকে দেখা হচ্ছে।',
        opt_9_1_8c: 'লম্বালম্বি তলে প্রতিসরণ ও আপাত গভীরতা $d/n < d$।',
        opt_9_1_8d: 'অদৃশ্য হয় কেবল TIR ঘটলে।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB)',
        chapterName: 'নবম অধ্যায়: আলোর প্রতিসরণ',
        pageNumber: 267,
      },
    },
    difficulty: 'EASY',
    boardSource: 'NCTB Page 267 Sample MCQ',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_1_mcq_9',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'MCQ',
    stem: 'একটি আলোকরশ্মি বায়ু থেকে কাচে $i = 40^\\circ$ কোণে আপতিত হয়ে $r = 25^\\circ$ কোণে প্রতিসরিত হলে রশ্মিটির বিচ্যুতি কোণ ($\\delta$) কত?',
    options: [
      { id: 'opt_9_1_9a', text: '15°', isCorrect: true },
      { id: 'opt_9_1_9b', text: '25°', isCorrect: false },
      { id: 'opt_9_1_9c', text: '65°', isCorrect: false },
      { id: 'opt_9_1_9d', text: '115°', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: 15°।',
      coreConcept: 'প্রতিসরণের ফলে আলোকরশ্মি তার মূল গতিপথ থেকে $|i - r|$ কোণে বেঁকে যায়, অর্থাৎ $\\delta = 40^\\circ - 25^\\circ = 15^\\circ$।',
      distractorAnalysis: {
        opt_9_1_9b: '$25^\\circ$ হলো প্রতিসরণ কোণ, বিচ্যুতি নয়।',
        opt_9_1_9c: 'যোগফল নেওয়া ভুল।',
        opt_9_1_9d: 'সম্পূরক কোণ নয়।',
      },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_1_mcq_10',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'MCQ',
    stem: 'একটি মাধ্যমের প্রতিসরণাঙ্ক 1.5 এবং অন্য একটি মাধ্যমের প্রতিসরণাঙ্ক 2.0। উভয় মাধ্যমে আলোর বেগের অনুপাত ($v_1 : v_2$) কত?',
    options: [
      { id: 'opt_9_1_10a', text: '3 : 4', isCorrect: false },
      { id: 'opt_9_1_10b', text: '4 : 3', isCorrect: true },
      { id: 'opt_9_1_10c', text: '1 : 1.5', isCorrect: false },
      { id: 'opt_9_1_10d', text: '2 : 3', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 4 : 3।',
      coreConcept: 'মাধ্যমে আলোর বেগ প্রতিসরণাঙ্কের ব্যস্তানুপাতিক ($v \\propto 1/n$)। তাই $\\frac{v_1}{v_2} = \\frac{n_2}{n_1} = \\frac{2.0}{1.5} = \\frac{4}{3}$।',
      distractorAnalysis: {
        opt_9_1_10a: '$3 : 4$ হলো $n_1 : n_2$-এর অনুপাত, বেগের ব্যস্ত সম্পর্ক উপেক্ষিত।',
        opt_9_1_10c: 'অসম সম্পর্ক।',
        opt_9_1_10d: 'ভুল সরলীকরণ।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Jessore Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_1_mcq_17',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'MCQ',
    stem: 'পানির পরম প্রতিসরণাঙ্ক 1.33 এবং প্রকৃত গভীরতা 2 m। পুকুরের ওপরে দাঁড়িয়ে তাকালে পুকুরের গভীরতা কত বলে মনে হবে?',
    options: [
      { id: 'opt_9_1_17a', text: '2.66 m', isCorrect: false },
      { id: 'opt_9_1_17b', text: '1.50 m', isCorrect: true },
      { id: 'opt_9_1_17c', text: '1.33 m', isCorrect: false },
      { id: 'opt_9_1_17d', text: '0.67 m', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 1.50 m।',
      coreConcept: 'আপাত গভীরতা $= \\frac{\\text{প্রকৃত গভীরতা}}{n} = \\frac{2}{1.33} \\approx 1.50\\text{ m}$।',
      distractorAnalysis: {
        opt_9_1_17a: 'গুণ করলে প্রকৃতের চেয়ে বেশি হয়ে যায়, যা অসম্ভব।',
        opt_9_1_17c: '$n$-এর মানটি সরাসরি বসানো হয়েছে।',
        opt_9_1_17d: '$2 - 1.33$ বিয়োগ করার ভুল।',
      },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_1_mcq_18',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'MCQ',
    stem: 'আপেক্ষিক প্রতিসরণাঙ্কের ক্ষেত্রে নিচের কোন সম্পর্কটি সঠিক?',
    options: [
      { id: 'opt_9_1_18a', text: '₁n₂ × ₂n₁ = 0', isCorrect: false },
      { id: 'opt_9_1_18b', text: '₁n₂ × ₂n₁ = 1', isCorrect: true },
      { id: 'opt_9_1_18c', text: '₁n₂ + ₂n₁ = 1', isCorrect: false },
      { id: 'opt_9_1_18d', text: '₁n₂ = ₂n₁', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: ₁n₂ × ₂n₁ = 1।',
      coreConcept: 'আলোর প্রত্যাবর্তন নীতি (Principle of Reversibility) অনুযায়ী ${}_1n_2 = \\frac{1}{{}_2n_1}$, অর্থাৎ ${}_1n_2 \\times {}_2n_1 = 1$।',
      distractorAnalysis: {
        opt_9_1_18a: 'গুণফল শূন্য নয়, ১ হয়।',
        opt_9_1_18c: 'যোগফল নয়, গুণফল ১।',
        opt_9_1_18d: 'পরস্পর ব্যস্তানুপাতিক, সমান নয় (যদি না $n_1 = n_2$)।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dinajpur Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 9.2: পূর্ণ অভ্যন্তরীণ প্রতিফলন ও সংকট কোণ [top_ssc_physics_ch9_2]
  // =========================================================================
  {
    id: 'q_ch9_2_mcq_1',
    topicId: 'top_ssc_physics_ch9_2',
    type: 'MCQ',
    stem: 'পূর্ণ অভ্যন্তরীণ প্রতিফলন (Total Internal Reflection) ঘটার অন্যতম শর্ত কোনটি?',
    options: [
      { id: 'opt_9_2_1a', text: 'আলোকে হালকা থেকে ঘন মাধ্যমে যেতে হবে', isCorrect: false },
      { id: 'opt_9_2_1b', text: 'আলোকে ঘন থেকে হালকা মাধ্যমে যেতে হবে এবং আপতন কোণ সংকট কোণের চেয়ে বড় হতে হবে', isCorrect: true },
      { id: 'opt_9_2_1c', text: 'আপতন কোণ সংকট কোণের চেয়ে ছোট হতে হবে', isCorrect: false },
      { id: 'opt_9_2_1d', text: 'আপতন কোণ $0^\\circ$ হতে হবে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: আলোকে ঘন থেকে হালকা মাধ্যমে যেতে হবে এবং আপতন কোণ সংকট কোণের চেয়ে বড় হতে হবে।',
      coreConcept: 'পূর্ণ অভ্যন্তরীণ প্রতিফলনের দুটি শর্তই আবশ্যক: (১) $n_1 > n_2$, (২) $i > \\theta_c$।',
      distractorAnalysis: {
        opt_9_2_1a: 'হালকা থেকে ঘনে কখনো TIR হয় না।',
        opt_9_2_1c: '$i < \\theta_c$ হলে সাধারণ প্রতিসরণ ঘটে।',
        opt_9_2_1d: 'লম্ব আপতনে আলো সোজা বের হয়ে যায়।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_2_mcq_2',
    topicId: 'top_ssc_physics_ch9_2',
    type: 'MCQ',
    stem: 'বায়ু সাপেক্ষে কাচের প্রতিসরণাঙ্ক 1.5 হলে কাচ থেকে বায়ুতে যাওয়ার সময় সংকট কোণ প্রায় কত?',
    options: [
      { id: 'opt_9_2_2a', text: '24.4°', isCorrect: false },
      { id: 'opt_9_2_2b', text: '41.8°', isCorrect: true },
      { id: 'opt_9_2_2c', text: '48.8°', isCorrect: false },
      { id: 'opt_9_2_2d', text: '60.0°', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 41.8°।',
      coreConcept: '$\\sin \\theta_c = \\frac{1}{1.5} = 0.6667 \\implies \\theta_c = \\sin^{-1}(0.6667) \\approx 41.8^\\circ$।',
      distractorAnalysis: {
        opt_9_2_2a: '$24.4^\\circ$ হলো হীরকের সংকট কোণ।',
        opt_9_2_2c: '$48.8^\\circ$ হলো পানির সংকট কোণ।',
        opt_9_2_2d: 'ভুল মান।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_2_mcq_3',
    topicId: 'top_ssc_physics_ch9_2',
    type: 'MCQ',
    stem: 'সংকট কোণে (Critical Angle) আপতিত আলোকরশ্মির ক্ষেত্রে প্রতিসরণ কোণের মান কত হয়?',
    options: [
      { id: 'opt_9_2_3a', text: '0°', isCorrect: false },
      { id: 'opt_9_2_3b', text: '45°', isCorrect: false },
      { id: 'opt_9_2_3c', text: '90°', isCorrect: true },
      { id: 'opt_9_2_3d', text: '180°', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: 90°।',
      coreConcept: 'সংজ্ঞা অনুযায়ী ঘন মাধ্যমে আপতন কোণ $\\theta_c$ হলে হালকা মাধ্যমে প্রতিসরণ কোণ ঠিক $90^\\circ$ হয়।',
      distractorAnalysis: {
        opt_9_2_3a: 'লম্ব আপতনে প্রতিসরণ কোণ $0^\\circ$।',
        opt_9_2_3b: '৪৫ ডিগ্রি নয়।',
        opt_9_2_3d: 'বিভেদতলের কোণ নয়, অভিলম্বের সাথে $90^\\circ$।',
      },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_2_mcq_4',
    topicId: 'top_ssc_physics_ch9_2',
    type: 'MCQ',
    stem: 'অপটিক্যাল ফাইবারের ভেতরের কোর ও বাইরের আবরণ (ক্ল্যাডিং)-এর প্রতিসরণাঙ্কের সম্পর্ক কী?',
    options: [
      { id: 'opt_9_2_4a', text: 'কোরের প্রতিসরণাঙ্ক > ক্ল্যাডিংয়ের প্রতিসরণাঙ্ক', isCorrect: true },
      { id: 'opt_9_2_4b', text: 'কোরের প্রতিসরণাঙ্ক < ক্ল্যাডিংয়ের প্রতিসরণাঙ্ক', isCorrect: false },
      { id: 'opt_9_2_4c', text: 'উভয়ের প্রতিসরণাঙ্ক সমান', isCorrect: false },
      { id: 'opt_9_2_4d', text: 'ক্ল্যাডিং ধাতব অস্বচ্ছ পাত', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: কোরের প্রতিসরণাঙ্ক > ক্ল্যাডিংয়ের প্রতিসরণাঙ্ক।',
      coreConcept: 'আলোক-সংকেতকে কোরের ভেতর বারবার পূর্ণ অভ্যন্তরীণ প্রতিফলনের মাধ্যমে ধরে রাখতে হলে কোরকে অবশ্যই ক্ল্যাডিংয়ের চেয়ে আলোকীয়ভাবে ঘন হতে হবে ($n_{\\text{core}} > n_{\\text{cladding}}$)।',
      distractorAnalysis: {
        opt_9_2_4b: 'কোর হালকা হলে TIR ঘটবে না, আলো বাইরে বেরিয়ে যাবে।',
        opt_9_2_4c: 'সমান হলে কোনো প্রতিসরণ/প্রতিফলনই ঘটবে না।',
        opt_9_2_4d: 'উভয়ই স্বচ্ছ কাচ বা প্লাস্টিক পদার্থ।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Cumilla Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_2_mcq_5',
    topicId: 'top_ssc_physics_ch9_2',
    type: 'MCQ',
    stem: 'চিকিৎসাশাস্ত্রে মানবদেহের অভ্যন্তরের অঙ্গপ্রত্যঙ্গ পর্যবেক্ষণের জন্য ব্যবহৃত এন্ডোস্কোপ (Endoscope) আলোর কোন ঘটনার ওপর ভিত্তি করে কাজ করে?',
    options: [
      { id: 'opt_9_2_5a', text: 'ব্যাপ্ত প্রতিফলন', isCorrect: false },
      { id: 'opt_9_2_5b', text: 'পূর্ণ অভ্যন্তরীণ প্রতিফলন', isCorrect: true },
      { id: 'opt_9_2_5c', text: 'আলোর বিচ্ছুরণ', isCorrect: false },
      { id: 'opt_9_2_5d', text: 'অপবর্তন', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: পূর্ণ অভ্যন্তরীণ প্রতিফলন।',
      coreConcept: 'এন্ডোস্কোপে হাজার হাজার সরু অপটিক্যাল ফাইবার বান্ডল ব্যবহার করা হয়, যেখানে পূর্ণ অভ্যন্তরীণ প্রতিফলনের মাধ্যমে আলো ও চিত্র প্রবাহিত হয়।',
      distractorAnalysis: {
        opt_9_2_5a: 'ব্যাপ্ত প্রতিফলন ছবি নষ্ট করে দেয়।',
        opt_9_2_5c: 'বিচ্ছুরণ নয়।',
        opt_9_2_5d: 'অপবর্তন কিনারায় বেঁকে যাওয়া।',
      },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_2_mcq_6',
    topicId: 'top_ssc_physics_ch9_2',
    type: 'MCQ',
    stem: 'একটি মাধ্যমের পরম প্রতিসরণাঙ্ক $\\sqrt{2}$। বায়ুর সাপেক্ষে ওই মাধ্যমের সংকট কোণ কত?',
    options: [
      { id: 'opt_9_2_6a', text: '30°', isCorrect: false },
      { id: 'opt_9_2_6b', text: '45°', isCorrect: true },
      { id: 'opt_9_2_6c', text: '60°', isCorrect: false },
      { id: 'opt_9_2_6d', text: '90°', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 45°।',
      coreConcept: '$\\sin \\theta_c = \\frac{1}{n} = \\frac{1}{\\sqrt{2}} \\implies \\theta_c = 45^\\circ$।',
      distractorAnalysis: {
        opt_9_2_6a: '$30^\\circ$ হতো যদি $n = 2$ হতো।',
        opt_9_2_6c: '$60^\\circ$ হতো যদি $n = 2/\\sqrt{3}$ হতো।',
        opt_9_2_6d: '$90^\\circ$ হলে $n = 1$ হতে হতো।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Sylhet Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_2_mcq_7',
    topicId: 'top_ssc_physics_ch9_2',
    type: 'MCQ',
    stem: 'একটি কাচের স্ল্যাবের সংকট কোণ $42^\\circ$। কাচ থেকে বায়ুতে যাওয়ার সময় $45^\\circ$ কোণে আপতিত রশ্মি কী করবে?',
    options: [
      { id: 'opt_9_2_7a', text: 'বায়ুতে প্রতিসরিত হবে', isCorrect: false },
      { id: 'opt_9_2_7b', text: 'কাচের ভেতরেই ৪৫° কোণে পূর্ণ অভ্যন্তরীণ প্রতিফলিত হবে', isCorrect: true },
      { id: 'opt_9_2_7c', text: 'বিভেদতল বরাবর চলবে', isCorrect: false },
      { id: 'opt_9_2_7d', text: 'কাচ কর্তৃক সম্পূর্ণ শোষিত হবে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: কাচের ভেতরেই ৪৫° কোণে পূর্ণ অভ্যন্তরীণ প্রতিফলিত হবে।',
      coreConcept: 'আপতন কোণ $45^\\circ > \\theta_c (42^\\circ)$ এবং রশ্মি ঘন কাচ থেকে হালকা বায়ুর দিকে যাচ্ছে, তাই প্রতিফলনের সূত্র মেনে $\\theta_r = 45^\\circ$ কোণে পূর্ণ অভ্যন্তরীণ প্রতিফলন ঘটবে।',
      distractorAnalysis: {
        opt_9_2_7a: '$42^\\circ$-এর কম হলে বায়ুতে যেত।',
        opt_9_2_7c: 'ঠিক $42^\\circ$ হলে বিভেদতল বরাবর যেত।',
        opt_9_2_7d: 'পূর্ণ অভ্যন্তরীণ প্রতিফলনে শক্তি শোষণ প্রায় শূন্য।',
      },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_2_mcq_8',
    topicId: 'top_ssc_physics_ch9_2',
    type: 'MCQ',
    stem: 'হীরকের সংকট কোণ এত কম ($24.4^\\circ$) হওয়ার কারণ কী?',
    options: [
      { id: 'opt_9_2_8a', text: 'হীরকে আলোর বেগ অনেক বেশি', isCorrect: false },
      { id: 'opt_9_2_8b', text: 'হীরকের প্রতিসরণাঙ্ক অনেক বেশি ($2.42$)', isCorrect: true },
      { id: 'opt_9_2_8c', text: 'হীরক একটি ধাতব পদার্থ', isCorrect: false },
      { id: 'opt_9_2_8d', text: 'হীরকের পৃষ্ঠ অমসৃণ', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: হীরকের প্রতিসরণাঙ্ক অনেক বেশি (2.42)।',
      coreConcept: '$\\sin \\theta_c = \\frac{1}{n}$ অনুযায়ী $n$ যত বড় হয়, $\\theta_c$ তত ছোট হয়। হীরকের $n = 2.42$ সর্বোচ্চগুলোর একটি, তাই সংকট কোণ মাত্র $24.4^\\circ$।',
      distractorAnalysis: {
        opt_9_2_8a: 'প্রতিসরণাঙ্ক বেশি হওয়ায় হীরকে আলোর বেগ বেশ কম ($1.24\\times 10^8\\text{ m/s}$)।',
        opt_9_2_8c: 'হীরক কার্বনের অধাতব কেলাস।',
        opt_9_2_8d: 'কাটা হীরকের প্রতিটি তল মসৃণ পলিশ করা।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dinajpur Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_2_mcq_9',
    topicId: 'top_ssc_physics_ch9_2',
    type: 'MCQ',
    stem: 'সাধারণ দর্পণের তুলনায় পূর্ণ অভ্যন্তরীণ প্রতিফলনের মাধ্যমে প্রতিফলনের প্রধান সুবিধা কী?',
    options: [
      { id: 'opt_9_2_9a', text: 'প্রায় ১০০% আলোক শক্তি প্রতিফলিত হয় ও কোনো গৌণ প্রতিবিম্ব তৈরি হয় না', isCorrect: true },
      { id: 'opt_9_2_9b', text: 'দর্পণের চেয়ে এতে আলোর বেগ দ্বিগুণ হয়', isCorrect: false },
      { id: 'opt_9_2_9c', text: 'যেকোনো আপতন কোণে ($0^\\circ$ সহ) এটি ঘটে', isCorrect: false },
      { id: 'opt_9_2_9d', text: 'এতে রঙের বিচ্ছুরণ বেশি হয়', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: প্রায় ১০০% আলোক শক্তি প্রতিফলিত হয় ও কোনো গৌণ প্রতিবিম্ব তৈরি হয় না।',
      coreConcept: 'সাধারণ রূপার প্রলেপযুক্ত দর্পণে কাচের সামনে ও পেছনের তল থেকে গৌণ ছবি এবং কিছু শোষণ ঘটে; কিন্তু TIR-এ প্রায় ১০০% আলো প্রতিফলিত হয়ে উজ্জ্বলতম ছবি দেয়।',
      distractorAnalysis: {
        opt_9_2_9b: 'আলোর বেগ দ্বিগুণ হয় না।',
        opt_9_2_9c: 'কেবল $i > \\theta_c$ হলেই ঘটে।',
        opt_9_2_9d: 'উত্তম প্রতিফলনে বর্ণবিচ্ছুরণ কাম্য নয়।',
      },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_2_mcq_10',
    topicId: 'top_ssc_physics_ch9_2',
    type: 'MCQ',
    stem: 'একটি তরল থেকে বায়ুতে যাওয়ার সময় সংকট কোণ $30^\\circ$। তরলটির ভেতরে আলোর বেগ কত?',
    options: [
      { id: 'opt_9_2_10a', text: '1.5 × 10⁸ m/s', isCorrect: true },
      { id: 'opt_9_2_10b', text: '2.0 × 10⁸ m/s', isCorrect: false },
      { id: 'opt_9_2_10c', text: '3.0 × 10⁸ m/s', isCorrect: false },
      { id: 'opt_9_2_10d', text: '6.0 × 10⁸ m/s', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: 1.5 × 10⁸ m/s।',
      coreConcept: '$n = \\frac{1}{\\sin 30^\\circ} = 2.0$। অতএব $v = \\frac{c}{n} = \\frac{3 \\times 10^8}{2.0} = 1.5 \\times 10^8\\text{ m/s}$।',
      distractorAnalysis: {
        opt_9_2_10b: 'এটি $n = 1.5$-এর জন্য বেগ।',
        opt_9_2_10c: 'এটি শূন্য মাধ্যমে আলোর বেগ।',
        opt_9_2_10d: '$c$-এর চেয়ে বেশি হতে পারে না।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Barishal Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_2_mcq_17',
    topicId: 'top_ssc_physics_ch9_2',
    type: 'MCQ',
    stem: 'গ্লিসারিন ($n = 1.47$) ও পানি ($n = 1.33$)-র বিভেদতলে আলো গ্লিসারিন থেকে পানিতে গেলে সংকট কোণ কীভাবে নির্ণীত হবে?',
    options: [
      { id: 'opt_9_2_17a', text: 'sin θc = 1.47 / 1.33', isCorrect: false },
      { id: 'opt_9_2_17b', text: 'sin θc = 1.33 / 1.47', isCorrect: true },
      { id: 'opt_9_2_17c', text: 'sin θc = 1 / 1.47', isCorrect: false },
      { id: 'opt_9_2_17d', text: 'sin θc = 1.47 × 1.33', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: sin θc = 1.33 / 1.47।',
      coreConcept: '$\\sin \\theta_c = \\frac{n_{\\text{light}}}{n_{\\text{dense}}} = \\frac{1.33}{1.47} \\approx 0.905 \\implies \\theta_c \\approx 64.8^\\circ$।',
      distractorAnalysis: {
        opt_9_2_17a: '$\\sin \\theta_c > 1$ অসম্ভব।',
        opt_9_2_17c: 'দ্বিতীয় মাধ্যম বায়ু নয়, পানি।',
        opt_9_2_17d: 'গুণফল নয়, অনুপাত।',
      },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Batch 1 Creative Questions (CQ_CREATIVE)
  // =========================================================================
  {
    id: 'q_ch9_1_cq_1',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'CQ_CREATIVE',
    stem: 'বায়ু মাধ্যম থেকে একটি আলোকরশ্মি $45^\\circ$ আপতন কোণে $X$ নামক একটি স্বচ্ছ তরল মাধ্যমে প্রবেশ করে $30^\\circ$ কোণে প্রতিসরিত হলো। শূন্যস্থানে আলোর বেগ $3 \\times 10^8\\text{ m/s}$।\n(ক) আলোর প্রতিসরণ কাকে বলে?\n(খ) লম্বভাবে আপতিত আলোকরশ্মির ক্ষেত্রে প্রতিসরণ কোণ $0^\\circ$ হলেও একে প্রতিসরণ বলা যাবে কি—ব্যাখ্যা করো।\n(গ) $X$ মাধ্যমের প্রতিসরণাঙ্ক এবং ওই মাধ্যমে আলোর বেগ নির্ণয় করো।\n(ঘ) যদি $X$ মাধ্যম থেকে $1.50$ প্রতিসরণাঙ্কের একটি কাচফলকে রশ্মিটিকে প্রবেশ করানো হয়, তবে কাচফলকে প্রতিসরিত রশ্মি অভিলম্বের দিকে ঝুঁকবে নাকি দূরে সরে যাবে—গাণিতিক হিসাবসহ বিশ্লেষণ করো।',
    options: null,
    explanation: {
      directAnswer: 'সমাধান সারাংশ: $n_X = \\frac{\\sin 45^\\circ}{\\sin 30^\\circ} = \\sqrt{2} \\approx 1.414$; $v_X = \\frac{3 \\times 10^8}{1.414} \\approx 2.12 \\times 10^8\\text{ m/s}$। যেহেতু $n_{\\text{glass}} (1.50) > n_X (1.414)$, কাচে প্রবেশের সময় আলোর বেগ আরও কমবে ($2.00 \\times 10^8\\text{ m/s}$) ও রশ্মি অভিলম্বের দিকে ঝুঁকবে।',
      coreConcept: 'স্নেলের সূত্র প্রয়োগে প্রতিসরণাঙ্ক ও বেগ নির্ণয় এবং দুই মাধ্যমের আলোকীয় ঘনত্বের তুলনা।',
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'তির্যকভাবে এক স্বচ্ছ মাধ্যম হতে অন্য স্বচ্ছ মাধ্যমে গেলে বিভেদতলে দিক পরিবর্তনের ঘটনাকে আলোর প্রতিসরণ বলে।' },
      kha: { mark: 2, criteria: 'লম্ব আপতনে দিক বদলায় না কিন্তু আলোর বেগ ও তরঙ্গদৈর্ঘ্য ঠিকই পরিবর্তিত হয়—তাই বেগ পরিবর্তনের নীতি অনুসারে তা প্রতিসরণের বিশেষ ক্ষেত্র।' },
      ga: { mark: 3, criteria: '$n_X = \\sqrt{2} \\approx 1.414$ এবং $v_X \\approx 2.12 \\times 10^8\\text{ m/s}$ সঠিকভাবে নির্ণয়।' },
      gha: { mark: 4, criteria: '$n_g (1.50) > n_X (1.414)$ প্রমাণ করে স্নেলের সূত্রে $r_g < i_X$ দেখিয়ে অভিলম্বের দিকে বাঁকার সিদ্ধান্ত।' },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dhaka Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_1_cq_3',
    topicId: 'top_ssc_physics_ch9_1',
    type: 'CQ_CREATIVE',
    stem: 'নিলয় একটি খালি কাচের পাত্রের তলায় একটি পয়সা রাখল এবং দূর থেকে পয়সাটি ঠিক দৃষ্টির আড়ালে যাওয়া পর্যন্ত চোখ সরিয়ে স্থির থাকল। এরপর পাত্রটিতে $n = 1.33$ প্রতিসরণাঙ্কের পানি ঢালতেই সে পয়সাটি আবার স্পষ্ট দেখতে পেল। পানির প্রকৃত উচ্চতা $26.6\\text{ cm}$।\n(ক) বিচ্যুতি কোণ কাকে বলে?\n(খ) কোনো স্বচ্ছ মাধ্যমের পরম প্রতিসরণাঙ্ক কখনো ১-এর কম হতে পারে না কেন?\n(গ) ওপর থেকে লম্বভাবে দেখলে পয়সাটি কত cm ওপরে উঠেছে বলে মনে হবে?\n(ঘ) পানি ঢালার পর পয়সাটি নিলয়ের চোখে কীভাবে দৃশ্যমান হলো তা আলোর প্রতিসরণের রশ্মিচিত্রসহ বিশ্লেষণ করো।',
    options: null,
    explanation: {
      directAnswer: 'সমাধান সারাংশ: আপাত গভীরতা $= \\frac{26.6}{1.33} = 20\\text{ cm}$। অতএব ওপরে উঠেছে মনে হবে $= 26.6 - 20 = 6.6\\text{ cm}$। পানি ঢালার পর পয়সা থেকে আসা রশ্মি পানি-বায়ু বিভেদতলে অভিলম্ব থেকে দূরে বেঁকে নিলয়ের চোখে পৌঁছায়।',
      coreConcept: 'প্রকৃত ও আপাত গভীরতার পার্থক্য এবং লুকানো মুদ্রা দৃশ্যমান হওয়ার রশ্মিচিত্র।',
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'আপতিত রশ্মির অভিমুখ ও প্রতিসরিত রশ্মির মধ্যবর্তী কোণ $\\delta = |i - r|$।' },
      kha: { mark: 2, criteria: 'শূন্য মাধ্যমের চেয়ে অন্য কোনো মাধ্যমে আলোর বেগ বেশি হতে পারে না বলে $n = c/v \\ge 1$।' },
      ga: { mark: 3, criteria: 'আপাত গভীরতা $20\\text{ cm}$ এবং উত্থান $= 26.6 - 20 = 6.6\\text{ cm}$ নির্ণয়।' },
      gha: { mark: 4, criteria: 'পাত্রের কিনারার বাধা পেরিয়ে পানি-বায়ু তলে অভিলম্ব থেকে দূরে সরে চোখে পৌঁছানোর রশ্মিচিত্র ও আপাত অবস্থানের ব্যাখ্যা।' },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_2_cq_1',
    topicId: 'top_ssc_physics_ch9_2',
    type: 'CQ_CREATIVE',
    stem: 'একটি কাচের অপটিক্যাল ফাইবারের ভেতরের কোরের প্রতিসরণাঙ্ক $1.62$ এবং বাইরের আবরণ (ক্ল্যাডিং)-এর প্রতিসরণাঙ্ক $1.44$। একটি লেজার সংকেত কোরের অক্ষের সাথে সমান্তরাল নয় বরং বিভেদতলে $72^\\circ$ আপতন কোণে আপতিত হলো।\n(ক) পূর্ণ অভ্যন্তরীণ প্রতিফলন কাকে বলে?\n(খ) তপ্ত গ্রীষ্মের দুপুরে পাকা রাস্তাকে দূর থেকে জলে ভেজা মনে হয় কেন?\n(গ) কোর ও ক্ল্যাডিংয়ের বিভেদতলে আলোর সংকট কোণ নির্ণয় করো এবং উদ্দীপকের সংকেতটির ভাগ্যে কী ঘটবে নির্ণয় করো।\n(ঘ) বর্তমান ইন্টারনেট ও চিকিৎসা ব্যবস্থায় তামার তারের পরিবর্তে অপটিক্যাল ফাইবার কেন এত জনপ্রিয়—আলোকীয় নীতির আলোকে চারটি যুক্তি দাও।',
    options: null,
    explanation: {
      directAnswer: 'সমাধান সারাংশ: $\\sin \\theta_c = \\frac{1.44}{1.62} = 0.8889 \\implies \\theta_c \\approx 62.73^\\circ$। যেহেতু আপতন কোণ $72^\\circ > 62.73^\\circ$, তাই বিভেদতলে **পূর্ণ অভ্যন্তরীণ প্রতিফলন (TIR)** ঘটবে এবং আলোক-সংকেত কোনো ক্ষয় ছাড়াই ফাইবার দিয়ে এগোবে।',
      coreConcept: 'অপটিক্যাল ফাইবারের সংকট কোণ নির্ণয় ও ব্যবহারিক গুরুত্ব।',
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'ঘন হতে হালকা মাধ্যমে সংকট কোণের বেশি কোণে পড়লে সম্পূর্ণ আলো প্রথম মাধ্যমে ফিরে আসা।' },
      kha: { mark: 2, criteria: 'তপ্ত রাস্তার কাছের বায়ু হালকা ও ওপরের বায়ু ঘন হওয়ায় আকাশের আলোর মরীচিকা / TIR-এর ব্যাখ্যা।' },
      ga: { mark: 3, criteria: '$\\theta_c \\approx 62.73^\\circ$ এবং $72^\\circ > 62.73^\\circ$ হওয়ায় পূর্ণ অভ্যন্তরীণ প্রতিফলনের সিদ্ধান্ত।' },
      gha: { mark: 4, criteria: 'TIR-এ নিম্ন সংকেত ক্ষয়, উচ্চ ব্যান্ডউইথ (আলোর গতি), তড়িৎচৌম্বকীয় ব্যাঘাতহীনতা এবং নমনীয়তা (এন্ডোস্কোপি) বিশ্লেষণ।' },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Sylhet Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch9_2_cq_3',
    topicId: 'top_ssc_physics_ch9_2',
    type: 'CQ_CREATIVE',
    stem: 'একটি অ্যাকুয়ারিয়ামের তলদেশে থাকা আলোর উৎস থেকে নির্গত আলোকরশ্মি পানির ($n = 1.33$) উপরিভাগে বায়ু মাধ্যমে পৌঁছাচ্ছে। অ্যাকুয়ারিয়ামের পানির গভীরতা $60\\text{ cm}$।\n(ক) আপেক্ষিক প্রতিসরণাঙ্ক কাকে বলে?\n(খ) সমকোণী প্রতিফলক প্রিজম সাধারণ কাচ দর্পণের চেয়ে উত্তম কেন?\n(গ) পানি ও বায়ু মাধ্যমের সংকট কোণ কত এবং পানির উপরিভাগে কত ব্যাসার্ধের বৃত্তাকার অংশ দিয়ে আলো বাইরে বের হতে পারবে?\n(ঘ) পানির পরিবর্তে অ্যাকুয়ারিয়ামে গ্লিসারিন ($n = 1.47$) ব্যবহার করলে ওই বৃত্তাকার আলোকিত ক্ষেত্রফল বাড়বে নাকি কমবে তা গাণিতিকভাবে বিশ্লেষণ করো।',
    options: null,
    explanation: {
      directAnswer: 'সমাধান সারাংশ: $\\theta_c = \\sin^{-1}(1/1.33) \\approx 48.75^\\circ$। বৃত্তের ব্যাসার্ধ $r = h \\tan \\theta_c = 60 \\times \\tan(48.75^\\circ) \\approx 60 \\times 1.14 = 68.4\\text{ cm}$। গ্লিসারিন ($n=1.47$) দিলে $\\theta_c = \\sin^{-1}(1/1.47) \\approx 42.86^\\circ$, ফলে ব্যাসার্ধ $r = 60 \\times \\tan(42.86^\\circ) \\approx 55.7\\text{ cm}$—অর্থাৎ ক্ষেত্রফল **কমে যাবে**।',
      coreConcept: 'স্নেল উইন্ডো ($r = h \\tan \\theta_c = \\frac{h}{\\sqrt{n^2 - 1}}$) ও $n$ বৃদ্ধিতে $\\theta_c$ হ্রাসের সম্পর্ক।',
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'এক স্বচ্ছ মাধ্যম হতে অন্য স্বচ্ছ মাধ্যমে প্রতিসরণে আপতন ও প্রতিসরণ কোণের সাইনের অনুপাত।' },
      kha: { mark: 2, criteria: 'প্রিজমে TIR-এ ১০০% আলো প্রতিফলিত হয়, গৌণ প্রতিবিম্ব থাকে না ও পারা নষ্ট হওয়ার ভয় থাকে না।' },
      ga: { mark: 3, criteria: '$\\theta_c \\approx 48.75^\\circ$ এবং জ্যামিতি দিয়ে $r = h \\tan \\theta_c \\approx 68.4\\text{ cm}$ নির্ণয়।' },
      gha: { mark: 4, criteria: 'গ্লিসারিনের ক্ষেত্রে $\\theta_c \\approx 42.86^\\circ$ ও $r \\approx 55.7\\text{ cm}$ হিসাব করে ক্ষেত্রফল কমে যাওয়ার সঠিক প্রমাণ।' },
    },
    difficulty: 'HARD',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];

export const chapter9Questions: QuestionData[] = [
  ...batch1Questions,
  ...chapter9Batch2Questions,
  ...chapter9Batch3Questions,
];
