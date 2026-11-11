import { ContentStatus } from '@prisma/client';
import { chapter8Batch2Questions } from './seed-chapter-8-questions-batch2';
import { chapter8Batch3Questions } from './seed-chapter-8-questions-batch3';

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
  // Sections 8.1–8.2: Nature of Light & Reflection Laws [top_ssc_physics_ch8_1, ch8_2]
  // =========================================================================
  {
    id: 'q_ch8_1_mcq_1',
    topicId: 'top_ssc_physics_ch8_1',
    type: 'MCQ',
    stem: 'আলো মূলত এক ধরনের কী?',
    options: [
      { id: 'opt_8_1_1a', text: 'যান্ত্রিক অনুদৈর্ঘ্য তরঙ্গ', isCorrect: false },
      { id: 'opt_8_1_1b', text: 'তাড়িতচৌম্বক অনুপ্রস্থ তরঙ্গ', isCorrect: true },
      { id: 'opt_8_1_1c', text: 'শব্দ তরঙ্গ', isCorrect: false },
      { id: 'opt_8_1_1d', text: 'স্থির তরঙ্গ', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: তাড়িতচৌম্বক অনুপ্রস্থ তরঙ্গ।',
      coreConcept: 'আলো একটি তাড়িতচৌম্বক তরঙ্গ (Electromagnetic Wave), যা তড়িৎ ও চৌম্বক ক্ষেত্রের কম্পনের মাধ্যমে শূন্য মাধ্যমেও সঞ্চালিত হতে পারে এবং এটি অনুপ্রস্থ প্রকৃতির।',
      distractorAnalysis: {
        opt_8_1_1a: 'যান্ত্রিক তরঙ্গ সঞ্চালনের জন্য মাধ্যম প্রয়োজন হয়, যেমন শব্দ।',
        opt_8_1_1c: 'শব্দ একটি অনুদৈর্ঘ্য যান্ত্রিক তরঙ্গ।',
        opt_8_1_1d: 'আলো একটি চলমান অগ্রগামী তরঙ্গ।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB)',
        chapterName: 'অষ্টম অধ্যায়: আলোর প্রতিফলন',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_1_mcq_2',
    topicId: 'top_ssc_physics_ch8_1',
    type: 'MCQ',
    stem: 'শূন্য মাধ্যমে আলোর বেগ কত?',
    options: [
      { id: 'opt_8_1_2a', text: '3 × 10⁶ m/s', isCorrect: false },
      { id: 'opt_8_1_2b', text: '3 × 10⁸ m/s', isCorrect: true },
      { id: 'opt_8_1_2c', text: '3 × 10¹⁰ m/s', isCorrect: false },
      { id: 'opt_8_1_2d', text: '340 m/s', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 3 × 10⁸ m/s।',
      coreConcept: 'শূন্য মাধ্যমে আলোর বেগ $c \\approx 3 \\times 10^8\\text{ m/s}$ ($299,792,458\\text{ m/s}$)।',
      distractorAnalysis: {
        opt_8_1_2a: 'ঘাত $10^6$ নয়, $10^8$।',
        opt_8_1_2c: '$3 \\times 10^{10}$ হলো $\\text{cm/s}$ এককে, $\\text{m/s}$ এককে নয়।',
        opt_8_1_2d: '$340\\text{ m/s}$ শব্দের বেগের কাছাকাছি মান।',
      },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_1_mcq_3',
    topicId: 'top_ssc_physics_ch8_1',
    type: 'MCQ',
    stem: 'মানুষের চোখ দৃশ্যমান আলোর কোন তরঙ্গদৈর্ঘ্যের পাল্লায় সংবেদনশীল?',
    options: [
      { id: 'opt_8_1_3a', text: '100 nm – 300 nm', isCorrect: false },
      { id: 'opt_8_1_3b', text: '400 nm – 700 nm', isCorrect: true },
      { id: 'opt_8_1_3c', text: '800 nm – 1200 nm', isCorrect: false },
      { id: 'opt_8_1_3d', text: '1 mm – 1 m', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 400 nm – 700 nm।',
      coreConcept: 'সমগ্র তাড়িতচৌম্বক বর্ণালির কেবল $400\\text{ nm}$ (বেগুনি) থেকে $700\\text{ nm}$ (লাল) পর্যন্ত তরঙ্গদৈর্ঘ্যের অংশই আমাদের চোখে দর্শনের অনুভূতি জাগায়।',
      distractorAnalysis: {
        opt_8_1_3a: 'এটি অতিবেগুনি (UV) রশ্মির অঞ্চল।',
        opt_8_1_3c: 'এটি অবলোহিত (Infrared) রশ্মির অঞ্চল।',
        opt_8_1_3d: 'এটি মাইক্রোওয়েভ ও বেতার তরঙ্গের অঞ্চল।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_1_mcq_4',
    topicId: 'top_ssc_physics_ch8_2',
    type: 'MCQ',
    stem: 'আলোর প্রতিফলনের দ্বিতীয় সূত্র অনুযায়ী কোনটি সর্বদা সত্য?',
    options: [
      { id: 'opt_8_1_4a', text: 'আপতন কোণ > প্রতিফলন কোণ', isCorrect: false },
      { id: 'opt_8_1_4b', text: 'আপতন কোণ = প্রতিফলন কোণ', isCorrect: true },
      { id: 'opt_8_1_4c', text: 'আপতন কোণ + প্রতিফলন কোণ = 90°', isCorrect: false },
      { id: 'opt_8_1_4d', text: 'প্রতিফলন কোণ সর্বদা 45°', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: আপতন কোণ = প্রতিফলন কোণ।',
      coreConcept: 'আলোর প্রতিফলনের দ্বিতীয় সূত্রানুসারে আপতন কোণ ($\\theta_i$) ও প্রতিফলন কোণ ($\\theta_r$) সর্বদা পরস্পর সমান।',
      distractorAnalysis: {
        opt_8_1_4a: 'প্রতিফলনে কোণ দুটি সমান হয়, ছোট বা বড় নয় (তা প্রতিসরণে ঘটে)।',
        opt_8_1_4c: 'তাদের যোগফল কেবল $\\theta_i = 45^\\circ$ হলে $90^\\circ$ হয়, সর্বদা নয়।',
        opt_8_1_4d: 'প্রতিফলন কোণ আপতন কোণের মানের ওপর নির্ভর করে পরিবর্তিত হয়।',
      },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_1_mcq_5',
    topicId: 'top_ssc_physics_ch8_2',
    type: 'MCQ',
    stem: 'একটি আলোকরশ্মি কোনো সমতল দর্পণে অভিলম্বের সাথে 42° কোণে আপতিত হলে, আপতিত রশ্মি ও প্রতিফলিত রশ্মির মধ্যবর্তী কোণ কত?',
    options: [
      { id: 'opt_8_1_5a', text: '42°', isCorrect: false },
      { id: 'opt_8_1_5b', text: '48°', isCorrect: false },
      { id: 'opt_8_1_5c', text: '84°', isCorrect: true },
      { id: 'opt_8_1_5d', text: '96°', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: 84°।',
      coreConcept: 'আপতিত ও প্রতিফলিত রশ্মির মধ্যবর্তী কোণ $= \\theta_i + \\theta_r = 2\\theta_i$।',
      stepDerivation: '$$\\theta_i + \\theta_r = 42^\\circ + 42^\\circ = 84^\\circ$$',
      distractorAnalysis: {
        opt_8_1_5a: 'এটি কেবল প্রতিফলন কোণের মান।',
        opt_8_1_5b: '$90^\\circ - 42^\\circ = 48^\\circ$ হলো গ্ল্যান্সিং কোণ।',
        opt_8_1_5d: '$2 \\times 48^\\circ = 96^\\circ$ ভুল গণনা।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Cumilla Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_1_mcq_6',
    topicId: 'top_ssc_physics_ch8_2',
    type: 'MCQ',
    stem: 'একটি আলোকরশ্মি কোনো সমতল দর্পণের ওপর লম্বভাবে আপতিত হলে প্রতিফলন কোণের মান কত হবে?',
    options: [
      { id: 'opt_8_1_6a', text: '0°', isCorrect: true },
      { id: 'opt_8_1_6b', text: '45°', isCorrect: false },
      { id: 'opt_8_1_6c', text: '90°', isCorrect: false },
      { id: 'opt_8_1_6d', text: '180°', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: 0°।',
      coreConcept: 'রশ্মি পৃষ্ঠের ওপর লম্বভাবে পড়া মানে এটি অভিলম্বের সাথে $0^\\circ$ কোণ তৈরি করে ($\\theta_i = 0^\\circ$), তাই $\\theta_r = 0^\\circ$ হয়ে একই পথে ফিরে আসে।',
      distractorAnalysis: {
        opt_8_1_6b: 'লম্ব আপতনে $45^\\circ$ হয় না।',
        opt_8_1_6c: 'সবচেয়ে সাধারণ ভুল—দর্পণের তলের সাথে কোণ $90^\\circ$ হলেও অভিলম্বের সাথে $0^\\circ$।',
        opt_8_1_6d: 'বিপরীত দিকে যাওয়ার কোণ $180^\\circ$ হলেও প্রতিফলন কোণ $0^\\circ$।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Sylhet Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_1_mcq_7',
    topicId: 'top_ssc_physics_ch8_2',
    type: 'MCQ',
    stem: 'বইয়ের পাতা বা ঘরের দেয়াল আমাদের চারপাশের সব অবস্থান থেকে দেখা যায় কোন ধরনের প্রতিফলনের কারণে?',
    options: [
      { id: 'opt_8_1_7a', text: 'নিয়মিত প্রতিফলন', isCorrect: false },
      { id: 'opt_8_1_7b', text: 'ব্যাপ্ত বা অনিয়মিত প্রতিফলন', isCorrect: true },
      { id: 'opt_8_1_7c', text: 'পূর্ণ অভ্যন্তরীণ প্রতিফলন', isCorrect: false },
      { id: 'opt_8_1_7d', text: 'আলোর বিচ্ছুরণ', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: ব্যাপ্ত বা অনিয়মিত প্রতিফলন।',
      coreConcept: 'অমসৃণ পৃষ্ঠে আপতিত আলো ব্যাপ্ত প্রতিফলনের (Diffuse Reflection) মাধ্যমে চারদিকে ছড়িয়ে পড়ে বলেই সব দিক থেকে বস্তুটি দেখা যায় ও চোখ ধাঁধায় না।',
      distractorAnalysis: {
        opt_8_1_7a: 'নিয়মিত প্রতিফলনে আলো কেবল নির্দিষ্ট দিকে যায়, প্রতিবিম্ব তৈরি করে।',
        opt_8_1_7c: 'পূর্ণ অভ্যন্তরীণ প্রতিফলন ঘন থেকে হালকা মাধ্যমে প্রতিসরণের সীমাবদ্ধ ক্ষেত্র।',
        opt_8_1_7d: 'বিচ্ছুরণ সাদা আলোর ৭টি বর্ণে বিভক্ত হওয়া।',
      },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_1_mcq_8',
    topicId: 'top_ssc_physics_ch8_2',
    type: 'MCQ',
    stem: 'একটি আলোকরশ্মি আপতিত ও প্রতিফলিত রশ্মির মধ্যবর্তী কোণ 120° হলে, আপতিত রশ্মিটি দর্পণের তলের সাথে কত কোণ উৎপন্ন করে?',
    options: [
      { id: 'opt_8_1_8a', text: '30°', isCorrect: true },
      { id: 'opt_8_1_8b', text: '60°', isCorrect: false },
      { id: 'opt_8_1_8c', text: '90°', isCorrect: false },
      { id: 'opt_8_1_8d', text: '120°', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: 30°।',
      coreConcept: '$\\theta_i + \\theta_r = 120^\\circ$ ও $\\theta_i = \\theta_r$ হওয়ায় $\\theta_i = 60^\\circ$। অতএব দর্পণের তলের সাথে গ্ল্যান্সিং কোণ $= 90^\\circ - 60^\\circ = 30^\\circ$।',
      distractorAnalysis: {
        opt_8_1_8b: '$60^\\circ$ হলো অভিলম্বের সাথে আপতন কোণ, তলের সাথে নয়।',
        opt_8_1_8c: 'অভিলম্ব ও তলের কোণ $90^\\circ$।',
        opt_8_1_8d: 'দুই রশ্মির মধ্যবর্তী কোণ দেওয়া আছে।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Jessore Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_1_mcq_9',
    topicId: 'top_ssc_physics_ch8_3',
    type: 'MCQ',
    stem: 'দর্পণের এক পাশে সিলভার ও অন্য পাশে লাল রঙের প্রলেপ দেওয়ার প্রক্রিয়াকে কী বলে?',
    options: [
      { id: 'opt_8_1_9a', text: 'প্রলেপন বা পারা লাগানো (Silvering)', isCorrect: true },
      { id: 'opt_8_1_9b', text: 'গ্যালভানাইজিং', isCorrect: false },
      { id: 'opt_8_1_9c', text: 'বিচ্ছুরণ', isCorrect: false },
      { id: 'opt_8_1_9d', text: 'পোলারাইজেশন', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: প্রলেপন বা পারা লাগানো (Silvering)।',
      coreConcept: 'স্বচ্ছ কাচের এক পৃষ্ঠে রূপা বা অ্যালুমিনিয়ামের পাতলা প্রলেপ দিয়ে প্রতিফলক পৃষ্ঠ তৈরি করার প্রক্রিয়াকে পারা লাগানো বা Silvering বলে।',
      distractorAnalysis: {
        opt_8_1_9b: 'গ্যালভানাইজিং লোহাকে মরিচা থেকে বাঁচাতে দস্তার প্রলেপ দেওয়া।',
        opt_8_1_9c: 'বিচ্ছুরণ আলোর বর্ণ বিভাজন।',
        opt_8_1_9d: 'পোলারাইজেশন আলোক কম্পনের সমবর্তন।',
      },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_1_mcq_10',
    topicId: 'top_ssc_physics_ch8_2',
    type: 'MCQ',
    stem: 'ব্যাপ্ত প্রতিফলনের ক্ষেত্রে কোনটি সঠিক?',
    options: [
      { id: 'opt_8_1_10a', text: 'প্রতিফলনের কোনো সূত্রই এখানে পালিত হয় না', isCorrect: false },
      { id: 'opt_8_1_10b', text: 'প্রতিটি বিন্দুতে $\\theta_i = \\theta_r$ পালিত হয় কিন্তু অভিলম্ব ভিন্নমুখী', isCorrect: true },
      { id: 'opt_8_1_10c', text: 'প্রতিফলিত রশ্মিগুলো পরস্পর সমান্তরাল থাকে', isCorrect: false },
      { id: 'opt_8_1_10d', text: 'এটি অত্যন্ত ঝকঝকে ও স্পষ্ট প্রতিবিম্ব তৈরি করে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: প্রতিটি বিন্দুতে $\\theta_i = \\theta_r$ পালিত হয় কিন্তু অভিলম্ব ভিন্নমুখী।',
      coreConcept: 'ব্যাপ্ত প্রতিফলন প্রতিফলনের সূত্র লঙ্ঘন করে না; বরং পৃষ্ঠের অমসৃণতার কারণে প্রতিটি ক্ষুদ্র বিন্দুতে অভিলম্বের দিক ভিন্ন হওয়ায় রশ্মি বিভিন্ন দিকে ছড়িয়ে যায়।',
      distractorAnalysis: {
        opt_8_1_10a: 'সূত্র সব বিন্দুতেই কঠোরভাবে মানা হয়।',
        opt_8_1_10c: 'সমান্তরাল থাকে কেবল নিয়মিত প্রতিফলনে।',
        opt_8_1_10d: 'ব্যাপ্ত প্রতিফলনে কোনো স্পষ্ট প্রতিবিম্ব তৈরি হয় না।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dinajpur Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_1_mcq_17',
    topicId: 'top_ssc_physics_ch8_2',
    type: 'MCQ',
    stem: 'বায়ু থেকে একটি আলোকরশ্মি দর্পণে আপতিত হয়ে প্রতিফলিত হলো। কোন কোন রাশি এই ঘটনায় একই সমতলে অবস্থান করে?',
    options: [
      { id: 'opt_8_1_17a', text: 'আপতিত রশ্মি, প্রতিফলিত রশ্মি ও অভিলম্ব', isCorrect: true },
      { id: 'opt_8_1_17b', text: 'কেবল আপতিত রশ্মি ও দর্পণের তল', isCorrect: false },
      { id: 'opt_8_1_17c', text: 'প্রতিসরিত রশ্মি ও অভিলম্ব', isCorrect: false },
      { id: 'opt_8_1_17d', text: 'আপতিত রশ্মি ও ফোকাস তল', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: আপতিত রশ্মি, প্রতিফলিত রশ্মি ও অভিলম্ব।',
      coreConcept: 'আলোর প্রতিফলনের প্রথম সূত্রানুযায়ী আপতিত রশ্মি, প্রতিফলিত রশ্মি এবং আপতন বিন্দুতে অঙ্কিত অভিলম্ব একই সমতলে অবস্থান করে।',
      distractorAnalysis: {
        opt_8_1_17b: 'দর্পণের তল অভিলম্বের সমতলের সাথে লম্ব।',
        opt_8_1_17c: 'দর্পণে প্রতিসরণ ঘটে না।',
        opt_8_1_17d: 'প্রথম সূত্রে ফোকাস তলের উল্লেখ নেই।',
      },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_1_mcq_18',
    topicId: 'top_ssc_physics_ch8_1',
    type: 'MCQ',
    stem: 'একটি আলোক তরঙ্গের কম্পাঙ্ক $6 \\times 10^{14}\\text{ Hz}$ হলে এর তরঙ্গদৈর্ঘ্য কত? ($c = 3 \\times 10^8\\text{ m/s}$)',
    options: [
      { id: 'opt_8_1_18a', text: '400 nm', isCorrect: false },
      { id: 'opt_8_1_18b', text: '500 nm', isCorrect: true },
      { id: 'opt_8_1_18c', text: '600 nm', isCorrect: false },
      { id: 'opt_8_1_18d', text: '700 nm', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 500 nm।',
      coreConcept: '$\\lambda = \\frac{c}{f} = \\frac{3 \\times 10^8}{6 \\times 10^{14}} = 0.5 \\times 10^{-6}\\text{ m} = 500 \\times 10^{-9}\\text{ m} = 500\\text{ nm}$।',
      distractorAnalysis: {
        opt_8_1_18a: '$400\\text{ nm}$-এর জন্য কম্পাঙ্ক $7.5 \\times 10^{14}\\text{ Hz}$।',
        opt_8_1_18c: '$600\\text{ nm}$-এর জন্য কম্পাঙ্ক $5 \\times 10^{14}\\text{ Hz}$।',
        opt_8_1_18d: '$700\\text{ nm}$-এর জন্য কম্পাঙ্ক $4.29 \\times 10^{14}\\text{ Hz}$।',
      },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Sections 8.3–8.4: Mirrors, Plane Mirrors & Spherical Geometry [top_ssc_physics_ch8_3, ch8_4]
  // =========================================================================
  {
    id: 'q_ch8_2_mcq_1',
    topicId: 'top_ssc_physics_ch8_3',
    type: 'MCQ',
    stem: 'কোন ধরনের প্রতিবিম্বকে পর্দায় ফেলা যায় না?',
    options: [
      { id: 'opt_8_2_1a', text: 'বাস্তব প্রতিবিম্ব', isCorrect: false },
      { id: 'opt_8_2_1b', text: 'অবাস্তব প্রতিবিম্ব', isCorrect: true },
      { id: 'opt_8_2_1c', text: 'সিনেমার পর্দার প্রতিবিম্ব', isCorrect: false },
      { id: 'opt_8_2_1d', text: 'অবতল দর্পণে সৃষ্ট উল্টো প্রতিবিম্ব', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: অবাস্তব প্রতিবিম্ব।',
      coreConcept: 'অবাস্তব প্রতিবিম্বে আলোকরশ্মিগুলো প্রকৃতপক্ষে মিলিত হয় না, বরং কোনো বিন্দু থেকে অপসৃত হচ্ছে বলে মনে হয়—তাই একে পর্দায় ধারণ করা যায় না।',
      distractorAnalysis: {
        opt_8_2_1a: 'বাস্তব প্রতিবিম্বকে পর্দায় ফেলা যায়।',
        opt_8_2_1c: 'সিনেমার পর্দার ছবি বাস্তব প্রতিবিম্ব।',
        opt_8_2_1d: 'উল্টো প্রতিবিম্ব বাস্তব হয় ও পর্দায় ফেলা যায়।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_2_mcq_2',
    topicId: 'top_ssc_physics_ch8_3',
    type: 'MCQ',
    stem: 'একটি সমতল দর্পণ থেকে 1.2 m সামনে একটি বস্তু রাখা হলে, বস্তু ও তার প্রতিবিম্বের মধ্যবর্তী দূরত্ব কত হবে?',
    options: [
      { id: 'opt_8_2_2a', text: '0.6 m', isCorrect: false },
      { id: 'opt_8_2_2b', text: '1.2 m', isCorrect: false },
      { id: 'opt_8_2_2c', text: '2.4 m', isCorrect: true },
      { id: 'opt_8_2_2d', text: '3.6 m', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: 2.4 m।',
      coreConcept: 'সমতল দর্পণ থেকে বস্তু ও প্রতিবিম্বের দূরত্ব সমান ($1.2\\text{ m}$ সামনে এবং $1.2\\text{ m}$ পেছনে), তাই মধ্যবর্তী দূরত্ব $= 1.2 + 1.2 = 2.4\\text{ m}$।',
      distractorAnalysis: {
        opt_8_2_2a: 'অর্ধেক করার কোনো সূত্র নেই।',
        opt_8_2_2b: '$1.2\\text{ m}$ হলো দর্পণ থেকে প্রতিবিম্বের দূরত্ব, বস্তু থেকে নয়।',
        opt_8_2_2d: 'তিনগুণ নয়, দ্বিগুণ হবে।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_2_mcq_3',
    topicId: 'top_ssc_physics_ch8_3',
    type: 'MCQ',
    stem: '1.70 m উচ্চতার একজন মানুষ একটি খাড়া সমতল আয়নায় তাঁর পূর্ণাঙ্গ প্রতিবিম্ব দেখতে চাইলে আয়নাটির দৈর্ঘ্য কমপক্ষে কত হতে হবে?',
    options: [
      { id: 'opt_8_2_3a', text: '0.425 m', isCorrect: false },
      { id: 'opt_8_2_3b', text: '0.85 m', isCorrect: true },
      { id: 'opt_8_2_3c', text: '1.70 m', isCorrect: false },
      { id: 'opt_8_2_3d', text: '3.40 m', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 0.85 m।',
      coreConcept: 'পূর্ণাঙ্গ প্রতিবিম্ব দেখতে প্রয়োজনীয় সমতল দর্পণের ন্যূনতম দৈর্ঘ্য ব্যক্তির উচ্চতার অর্ধেক: $L_{\\min} = \\frac{H}{2} = \\frac{1.70}{2} = 0.85\\text{ m}$।',
      distractorAnalysis: {
        opt_8_2_3a: 'এক-চতুর্থাংশ নয়, অর্ধেক প্রয়োজন।',
        opt_8_2_3c: 'সম্পূর্ণ উচ্চতার দর্পণের প্রয়োজন হয় না।',
        opt_8_2_3d: 'দ্বিগুণ উচ্চতা ভুল ধারণা।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Cumilla Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_2_mcq_4',
    topicId: 'top_ssc_physics_ch8_3',
    type: 'MCQ',
    stem: 'সমতল দর্পণের সামনে লেখা "b" অক্ষরটিকে দর্পণে কীরূপ দেখাবে?',
    options: [
      { id: 'opt_8_2_4a', text: 'p', isCorrect: false },
      { id: 'opt_8_2_4b', text: 'd', isCorrect: true },
      { id: 'opt_8_2_4c', text: 'q', isCorrect: false },
      { id: 'opt_8_2_4d', text: 'b', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: d।',
      coreConcept: 'পার্শ্বীয় পরিবর্তনের (Lateral Inversion) কারণে প্রতিবিম্বের ওপর-নিচ অপরিবর্তিত থাকে কিন্তু ডান ও বাম দিক উল্টে যায়; তাই "b" দেখায় "d"-এর মতো।',
      distractorAnalysis: {
        opt_8_2_4a: '"p" ঘটে ওপর-নিচ উল্টে গেলে।',
        opt_8_2_4c: '"q" ঘটে ওপর-নিচ এবং ডান-বাম উভয় উল্টে গেলে।',
        opt_8_2_4d: 'A, H, M, O, T-এর মতো অক্ষর প্রতিসম বলে অপরিবর্তিত থাকে, কিন্তু "b" থাকে না।',
      },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_2_mcq_5',
    topicId: 'top_ssc_physics_ch8_4',
    type: 'MCQ',
    stem: 'একটি গোলীয় দর্পণের বক্রতার ব্যাসার্ধ R এবং ফোকাস দূরত্ব f-এর মধ্যে সম্পর্ক কোনটি?',
    options: [
      { id: 'opt_8_2_5a', text: 'f = 2R', isCorrect: false },
      { id: 'opt_8_2_5b', text: 'f = R/2', isCorrect: true },
      { id: 'opt_8_2_5c', text: 'f = R', isCorrect: false },
      { id: 'opt_8_2_5d', text: 'f = R/4', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: f = R/2।',
      coreConcept: 'ক্ষুদ্র উন্মেষের গোলীয় দর্পণের প্রধান ফোকাস $F$ ঠিক মেরু $P$ ও বক্রতার কেন্দ্র $C$-এর মধ্যবিন্দুতে অবস্থিত, অর্থাৎ $f = \\frac{R}{2}$।',
      distractorAnalysis: {
        opt_8_2_5a: 'সঠিক সম্পর্ক হলো $R = 2f$, $f = 2R$ নয়।',
        opt_8_2_5c: 'ফোকাস দূরত্ব বক্রতার ব্যাসার্ধের সমান নয়।',
        opt_8_2_5d: 'ব্যাসের সাথে সম্পর্ক $f = D/4$, কিন্তু ব্যাসার্ধের সাথে $R/2$।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'All Boards 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_2_mcq_6',
    topicId: 'top_ssc_physics_ch8_4',
    type: 'MCQ',
    stem: 'একটি অবতল দর্পণের বক্রতার ব্যাসার্ধ 36 cm হলে এর ফোকাস দূরত্ব কত?',
    options: [
      { id: 'opt_8_2_6a', text: '9 cm', isCorrect: false },
      { id: 'opt_8_2_6b', text: '18 cm', isCorrect: true },
      { id: 'opt_8_2_6c', text: '36 cm', isCorrect: false },
      { id: 'opt_8_2_6d', text: '72 cm', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 18 cm।',
      coreConcept: '$f = \\frac{R}{2} = \\frac{36}{2} = 18\\text{ cm}$।',
      distractorAnalysis: {
        opt_8_2_6a: '৪ দিয়ে ভাগ করার ভুল।',
        opt_8_2_6c: '$36\\text{ cm}$ হলো বক্রতার ব্যাসার্ধ।',
        opt_8_2_6d: 'গুণ করা হয়েছে ভাগ করার বদলে।',
      },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_2_mcq_7',
    topicId: 'top_ssc_physics_ch8_4',
    type: 'MCQ',
    stem: 'গোলীয় দর্পণের প্রতিফলক পৃষ্ঠের মধ্যবিন্দুকে কী বলা হয়?',
    options: [
      { id: 'opt_8_2_7a', text: 'বক্রতার কেন্দ্র (C)', isCorrect: false },
      { id: 'opt_8_2_7b', text: 'মেরু (P)', isCorrect: true },
      { id: 'opt_8_2_7c', text: 'প্রধান ফোকাস (F)', isCorrect: false },
      { id: 'opt_8_2_7d', text: 'উন্মেষ (Aperture)', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: মেরু (P)।',
      coreConcept: 'গোলীয় দর্পণের প্রতিফলক তলের জ্যামিতিক মধ্যবিন্দুই হলো মেরু বা Pole ($P$), যেখান থেকে সকল দূরত্ব পরিমাপ করা হয়।',
      distractorAnalysis: {
        opt_8_2_7a: 'বক্রতার কেন্দ্র $C$ দর্পণের পৃষ্ঠে নয়, কল্পিত গোলকের কেন্দ্রে থাকে।',
        opt_8_2_7c: 'প্রধান ফোকাস $F$ হলো প্রধান অক্ষের ওপর একটি বিন্দু।',
        opt_8_2_7d: 'উন্মেষ হলো প্রতিফলক পৃষ্ঠের দুই প্রান্তের রৈখিক ব্যবধান।',
      },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_2_mcq_8',
    topicId: 'top_ssc_physics_ch8_4',
    type: 'MCQ',
    stem: 'কোন ধরনের দর্পণের ফোকাস দূরত্ব অসীম?',
    options: [
      { id: 'opt_8_2_8a', text: 'অবতল দর্পণ', isCorrect: false },
      { id: 'opt_8_2_8b', text: 'উত্তল দর্পণ', isCorrect: false },
      { id: 'opt_8_2_8c', text: 'সমতল দর্পণ', isCorrect: true },
      { id: 'opt_8_2_8d', text: 'অভিসারী দর্পণ', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: সমতল দর্পণ।',
      coreConcept: 'সমতল দর্পণকে অসীম বক্রতার ব্যাসার্ধবিশিষ্ট ($R = \\infty$) একটি গোলকের ক্ষুদ্র অংশ হিসেবে বিবেচনা করা হয়, তাই $f = R/2 = \\infty$।',
      distractorAnalysis: {
        opt_8_2_8a: 'অবতল দর্পণের ফোকাস দূরত্ব সসীম ও ধনাত্মক।',
        opt_8_2_8b: 'উত্তল দর্পণের ফোকাস দূরত্ব সসীম ও ঋণাত্মক।',
        opt_8_2_8d: 'অবতল দর্পণেরই অপর নাম অভিসারী দর্পণ।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Barishal Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_2_mcq_9',
    topicId: 'top_ssc_physics_ch8_4',
    type: 'MCQ',
    stem: 'প্রধান ফোকাসের মধ্য দিয়ে এবং প্রধান অক্ষের সাথে লম্বভাবে কল্পিত সমতলকে কী বলে?',
    options: [
      { id: 'opt_8_2_9a', text: 'গৌণ অক্ষ', isCorrect: false },
      { id: 'opt_8_2_9b', text: 'ফোকাস তল (Focal Plane)', isCorrect: true },
      { id: 'opt_8_2_9c', text: 'উন্মেষ তল', isCorrect: false },
      { id: 'opt_8_2_9d', text: 'আপতন তল', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: ফোকাস তল (Focal Plane)।',
      coreConcept: 'গৌণ অক্ষের সমান্তরাল (কিন্তু প্রধান অক্ষের সাথে আনত) সমান্তরাল আলোকরশ্মিগুচ্ছ প্রতিফলনের পর এই ফোকাস তলের একটি নির্দিষ্ট বিন্দুতে মিলিত হয়।',
      distractorAnalysis: {
        opt_8_2_9a: 'গৌণ অক্ষ হলো $C$ ও মেরু ছাড়া দর্পণের অন্য বিন্দু সংযোগকারী সরলরেখা।',
        opt_8_2_9c: 'এটি উন্মেষের প্রচলিত সংজ্ঞা নয়।',
        opt_8_2_9d: 'আপতন তল প্রতিফলন রশ্মিগুলোর সমতল।',
      },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_2_mcq_10',
    topicId: 'top_ssc_physics_ch8_3',
    type: 'MCQ',
    stem: 'সমান্তরাল দুটি সমতল দর্পণের মাঝখানে কোনো বস্তু রাখলে মোট কয়টি প্রতিবিম্ব সৃষ্টি হয়?',
    options: [
      { id: 'opt_8_2_10a', text: '১ টি', isCorrect: false },
      { id: 'opt_8_2_10b', text: '২ টি', isCorrect: false },
      { id: 'opt_8_2_10c', text: '৪ টি', isCorrect: false },
      { id: 'opt_8_2_10d', text: 'অসংখ্য', isCorrect: true },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ঘ: অসংখ্য।',
      coreConcept: 'দর্পণ দুটি সমান্তরাল হলে তাদের মধ্যবর্তী কোণ $\\theta = 0^\\circ$, ফলে $n = \\frac{360^\\circ}{0^\\circ} - 1 = \\infty$ (বারবার প্রতিফলনের কারণে অসংখ্য প্রতিবিম্ব)।',
      distractorAnalysis: {
        opt_8_2_10a: 'একটি দর্পণ থাকলে ১টি হতো।',
        opt_8_2_10b: 'প্রতিবিম্বগুলো আবার অপর দর্পণের জন্য লক্ষ্যবস্তু হিসেবে কাজ করে।',
        opt_8_2_10c: '$72^\\circ$ কোণে রাখলে ৪টি হতে পারে।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Mymensingh Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_2_mcq_16',
    topicId: 'top_ssc_physics_ch8_3',
    type: 'MCQ',
    stem: 'ইংরেজি বর্ণমালার নিচের কোন অক্ষরগুলোর সমতল দর্পণে পার্শ্বীয় পরিবর্তন হলেও দেখতে একই রকম থাকে?',
    options: [
      { id: 'opt_8_2_16a', text: 'B, C, D, E', isCorrect: false },
      { id: 'opt_8_2_16b', text: 'A, H, M, O', isCorrect: true },
      { id: 'opt_8_2_16c', text: 'F, G, J, L', isCorrect: false },
      { id: 'opt_8_2_16d', text: 'P, Q, R, S', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: A, H, M, O।',
      coreConcept: 'উল্লম্ব অক্ষের সাপেক্ষে প্রতিসম (Vertically Symmetric) বর্ণগুলো (A, H, I, M, O, T, U, V, W, X, Y) ডান-বাম উল্টে গেলেও একই আকৃতির থাকে।',
      distractorAnalysis: {
        opt_8_2_16a: 'এগুলো অনুভূমিক প্রতিসম, কিন্তু ডান-বাম উল্টে গেলে পরিবর্তন স্পষ্ট দেখা যায়।',
        opt_8_2_16c: 'এগুলো অপ্রতিসম, তাই প্রতিবিম্বে উল্টে যায়।',
        opt_8_2_16d: 'এগুলোর কোনোটিই উল্লম্ব প্রতিসম নয়।',
      },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Batch 1 Creative Questions (CQ_CREATIVE)
  // =========================================================================
  {
    id: 'q_ch8_1_cq_1',
    topicId: 'top_ssc_physics_ch8_1',
    type: 'CQ_CREATIVE',
    stem: 'দৃশ্যমান বর্ণালির একটি লাল রঙের লেজার রশ্মি ($\\lambda = 650\\text{ nm}$) শূন্য মাধ্যম থেকে এসে একটি মসৃণ সমতল দর্পণের তলের সাথে $30^\\circ$ কোণে আপতিত হলো।\n(ক) আলোর প্রতিফলন কাকে বলে?\n(খ) আলোর কম্পাঙ্ক মাধ্যমের পরিবর্তনের সাথে পরিবর্তিত হয় না কেন?\n(গ) লেজার রশ্মিটির কম্পাঙ্ক এবং দর্পণে প্রতিফলন কোণ নির্ণয় করো।\n(ঘ) মসৃণ সমতল দর্পণটির পরিবর্তে একটি সাদা অমসৃণ কাগজ রাখলে প্রতিফলনের সূত্র পালিত হবে কি না এবং আমরা পৃষ্ঠটিতে লেজারের স্পষ্ট প্রতিবিম্ব দেখব কি না তা যুক্তিসহ বিশ্লেষণ করো।',
    options: null,
    explanation: {
      directAnswer: 'সমাধান সারাংশ: $f = c/\\lambda = (3 \\times 10^8)/(6.5 \\times 10^{-7}) \\approx 4.62 \\times 10^{14}\\text{ Hz}$। গ্ল্যান্সিং কোণ $30^\\circ$ হওয়ায় $\\theta_i = \\theta_r = 90^\\circ - 30^\\circ = 60^\\circ$। অমসৃণ কাগজেও প্রতিটি বিন্দুতে $\\theta_i = \\theta_r$ মানা হয় (ব্যাপ্ত প্রতিফলন), তবে অভিলম্ব ভিন্নমুখী হওয়ায় স্পষ্ট প্রতিবিম্ব গঠিত হয় না।',
      coreConcept: 'আলোর তরঙ্গ সমীকরণ, গ্ল্যান্সিং কোণ থেকে আপতন কোণ নির্ণয় এবং নিয়মিত ও ব্যাপ্ত প্রতিফলনের তুলনা।',
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'কোনো মাধ্যমে চলমান আলো অন্য মাধ্যমের বিভেদতলে বাধা পেয়ে আগের মাধ্যমে ফিরে আসার ঘটনাকে প্রতিফলন বলে।' },
      kha: { mark: 2, criteria: 'কম্পাঙ্ক কেবল আলোর উৎসের ওপর নির্ভর করে, মাধ্যমের ওপর নয়—মাধ্যম বদলালে বেগ ও তরঙ্গদৈর্ঘ্য আনুপাতিকভাবে বদলায়।' },
      ga: { mark: 3, criteria: '$f \\approx 4.62 \\times 10^{14}\\text{ Hz}$ এবং $\\theta_r = 90^\\circ - 30^\\circ = 60^\\circ$ সঠিকভাবে নির্ণয়।' },
      gha: { mark: 4, criteria: 'অমসৃণ কাগজে ব্যাপ্ত প্রতিফলনের কারণে প্রতিটি ক্ষুদ্র বিন্দুতে প্রতিফলন সূত্র মানলেও সমান্তরাল রশ্মি ছড়িয়ে পড়ে বলে প্রতিবিম্ব তৈরি হয় না—এ যুক্তি প্রদান।' },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dhaka Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_1_cq_3',
    topicId: 'top_ssc_physics_ch8_8',
    type: 'CQ_CREATIVE',
    stem: 'একটি সাবমেরিনের ভেতর থেকে সমুদ্রপৃষ্ঠের ওপরের জাহাজ দেখার জন্য দুটি সমতল দর্পণকে $45^\\circ$ কোণে স্থাপন করে একটি পেরিস্কোপ তৈরি করা হলো। ওপরের জাহাজ থেকে অনুভূমিক আলোকরশ্মি দর্পণ-১ এ আপতিত হয়ে দর্পণ-২ এ প্রতিফলিত হয়।\n(ক) নিয়মিত প্রতিফলন কাকে বলে?\n(খ) কোনো পৃষ্ঠে আলোর প্রতিফলন ১০০% হয় না কেন?\n(গ) পেরিস্কোপের প্রথম দর্পণে আপতন কোণ ও মোট বিচ্যুতি কোণ নির্ণয় করো এবং রশ্মিচিত্র আঁকো।\n(ঘ) পেরিস্কোপে সমতল দর্পণের পরিবর্তে সমকোণী প্রতিফলক প্রিজম ব্যবহার করলে প্রতিবিম্বের উজ্জ্বলতায় কী ধরনের সুবিধা পাওয়া যাবে তা বিশ্লেষণ করো।',
    options: null,
    explanation: {
      directAnswer: 'সমাধান সারাংশ: অনুভূমিক রশ্মি $45^\\circ$ আনত দর্পণে $\\theta_i = 45^\\circ$ কোণে পড়ে, $\\theta_r = 45^\\circ$ কোণে বের হয়—ফলে প্রথম দর্পণে রশ্মি $90^\\circ$ বিচ্যুত হয়। সমতল দর্পণের পরিবর্তে প্রিজম ব্যবহার করলে পূর্ণ অভ্যন্তরীণ প্রতিফলনের কারণে প্রায় ১০০% আলো প্রতিফলিত হয়ে উজ্জ্বল ছবি পাওয়া যায় (দ্বৈত প্রতিফলনও থাকে না)।',
      coreConcept: 'পেরিস্কোপের কার্যপ্রণালি, আলোকরশ্মির বিচ্যুতি ও প্রতিফলক দর্পণ বনাম প্রিজম।',
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'মসৃণ পৃষ্ঠে সমান্তরাল রশ্মিগুচ্ছ প্রতিফলনের পরও সমান্তরাল থাকলে তাকে নিয়মিত প্রতিফলন বলে।' },
      kha: { mark: 2, criteria: 'আপতিত আলোর একটি অংশ প্রতিফলক পৃষ্ঠ কর্তৃক শোষিত বা প্রতিসরিত হয় বলে ১০০% প্রতিফলন ঘটে না।' },
      ga: { mark: 3, criteria: '$\\theta_i = \\theta_r = 45^\\circ$, বিচ্যুতি $= 90^\\circ$ নির্ণয় এবং সুস্পষ্ট রশ্মিচিত্র অঙ্কন।' },
      gha: { mark: 4, criteria: 'কাচের পুরুত্বের কারণে সমতল দর্পণে গৌণ অস্পষ্ট প্রতিবিম্ব ও শোষণ ক্ষতি হয়, কিন্তু প্রিজমে পূর্ণ অভ্যন্তরীণ প্রতিফলনে উজ্জ্বল ও নিখুঁত প্রতিবিম্ব মেলে—ব্যাখ্যা।' },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_2_cq_1',
    topicId: 'top_ssc_physics_ch8_3',
    type: 'CQ_CREATIVE',
    stem: 'আরিফ একটি খাড়া সমতল আয়নার সামনে 2 m দূরে দাঁড়িয়ে আছে। সে লক্ষ্য করল আয়নার একদম সামনে রাখলেও তার বাম হাত প্রতিবিম্বে ডান হাত মনে হচ্ছে। আরিফের হাতের ঘড়িটি ঠিক 4:15 সময় দেখাচ্ছে।\n(ক) দর্পণ কাকে বলে?\n(খ) সমতল দর্পণে গঠিত প্রতিবিম্বকে অবাস্তব বলা হয় কেন?\n(গ) আরিফ ও তার প্রতিবিম্বের মধ্যবর্তী দূরত্ব কত এবং আয়নায় তার হাতঘড়িতে কয়টা বাজতে দেখা যাবে?\n(ঘ) আরিফ যদি আয়না থেকে 1 m পেছনে সরে যায়, তবে তার প্রতিবিম্বের দূরত্ব, আকার ও সময়ের ওপর কী প্রভাব পড়বে তা বিশ্লেষণ করো।',
    options: null,
    explanation: {
      directAnswer: 'সমাধান সারাংশ: মধ্যবর্তী দূরত্ব $= 2 + 2 = 4\\text{ m}$। প্রতিবিম্বে ঘড়ির সময় $= 11:60 - 4:15 = 7:45$। ১ m পেছনে সরলে নতুন দূরত্ব $3\\text{ m}$, ফলে প্রতিবিম্ব থেকে আরিফের দূরত্ব হবে $6\\text{ m}$, তবে প্রতিবিম্বের আকার সমানই থাকবে।',
      coreConcept: 'সমতল দর্পণে প্রতিবিম্বের দূরত্ব, আকার এবং পার্শ্বীয় পরিবর্তনজনিত ঘড়ির সময় নির্ণয়।',
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'যে মসৃণ তলে আলোর নিয়মিত প্রতিফলন ঘটে তাকে দর্পণ বলে।' },
      kha: { mark: 2, criteria: 'প্রতিফলিত রশ্মিগুলো প্রকৃতপক্ষে মিলিত হয় না, বরং দর্পণের পেছনের কোনো বিন্দু থেকে আসছে বলে মনে হয়।' },
      ga: { mark: 3, criteria: 'বস্তু ও প্রতিবিম্বের মধ্যবর্তী দূরত্ব $4\\text{ m}$ এবং ঘড়ির প্রতিফলিত সময় $7:45$ নির্ণয়।' },
      gha: { mark: 4, criteria: 'আয়না থেকে দূরত্ব $3\\text{ m}$ হলে ব্যবধান $6\\text{ m}$ হবে, কিন্তু সমতল দর্পণে বিবর্ধন সর্বদা $+1$ হওয়ায় আকার অপরিবর্তিত থাকে।' },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch8_2_cq_3',
    topicId: 'top_ssc_physics_ch8_4',
    type: 'CQ_CREATIVE',
    stem: 'দুটি গোলীয় দর্পণ A ও B-এর বক্রতার ব্যাসার্ধ যথাক্রমে 24 cm ও 30 cm। দর্পণ A-এর উত্তল পৃষ্ঠে এবং দর্পণ B-এর অবতল পৃষ্ঠে পারা লাগানো আছে।\n(ক) গোলীয় দর্পণের প্রধান অক্ষ কাকে বলে?\n(খ) কোনো গোলীয় দর্পণের উন্মেষ খুব বড় হলে প্রতিবিম্বের কী সমস্যা দেখা দেয়?\n(গ) দর্পণ A ও B কোন প্রকৃতির দর্পণ শনাক্ত করো এবং চিহ্নসহ এদের ফোকাস দূরত্ব নির্ণয় করো।\n(ঘ) দুটি দর্পণের প্রধান অক্ষ বরাবর সমান্তরাল আলোকরশ্মিগুচ্ছ ফেললে রশ্মিগুলোর গতিপথে যে পার্থক্য দেখা যাবে তা রশ্মিচিত্র এঁকে তুলনা করো।',
    options: null,
    explanation: {
      directAnswer: 'সমাধান সারাংশ: A-এর উত্তল পৃষ্ঠে পারা লাগানো অর্থাৎ ভেতরের অবতল পৃষ্ঠটি প্রতিফলক → **A হলো অবতল দর্পণ ($f_A = +12\\text{ cm}$)**। B-এর অবতল পৃষ্ঠে পারা লাগানো অর্থাৎ বাইরের উত্তল পৃষ্ঠটি প্রতিফলক → **B হলো উত্তল দর্পণ ($f_B = -15\\text{ cm}$)**।',
      coreConcept: 'গোলীয় দর্পণের প্রলেপের অবস্থান দেখে প্রকৃতি শনাক্তকরণ, ফোকাস দূরত্ব এবং অভিসারী ও অপসারী আচরণ।',
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'গোলীয় দর্পণের মেরু ও বক্রতার কেন্দ্র দিয়ে অতিক্রমকারী সরলরেখাকে প্রধান অক্ষ বলে।' },
      kha: { mark: 2, criteria: 'উন্মেষ বড় হলে প্রান্তীয় রশ্মিগুলো প্রধান ফোকাসে না মিশে গোলীয় অপেরণ (Spherical Aberration) সৃষ্টি করে ও প্রতিবিম্ব ঝাপসা হয়।' },
      ga: { mark: 3, criteria: 'পারা লাগানোর দিক বিবেচনায় A অবতল ($f_A = +12\\text{ cm}$) এবং B উত্তল ($f_B = -15\\text{ cm}$) নির্ণয়।' },
      gha: { mark: 4, criteria: 'অবতল দর্পণে সমান্তরাল রশ্মি বাস্তব ফোকাস $F$-এ অভিসারী হয় এবং উত্তল দর্পণে পেছনের অবাস্তব ফোকাস থেকে অপসারী হয়—নিখুঁত রশ্মিচিত্রসহ তুলনা।' },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dinajpur Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];

export const chapter8Questions: QuestionData[] = [
  ...batch1Questions,
  ...chapter8Batch2Questions,
  ...chapter8Batch3Questions,
];
