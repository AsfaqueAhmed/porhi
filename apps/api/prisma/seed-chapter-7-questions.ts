import { ContentStatus } from '@prisma/client';
import { chapter7Batch2Questions } from './seed-chapter-7-questions-batch2';
import { chapter7Batch3Questions } from './seed-chapter-7-questions-batch3';

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
  // Topic 7.1: সরল স্পন্দন গতি (Simple Harmonic Motion) [top_ssc_physics_ch7_1]
  // =========================================================================
  {
    id: 'q_ch7_1_mcq_1',
    topicId: 'top_ssc_physics_ch7_1',
    type: 'MCQ',
    stem: 'সরল স্পন্দন গতিসম্পন্ন কোনো কণার ত্বরণ ও সরণের মধ্যে সম্পর্ক কোনটি?',
    options: [
      { id: 'opt_7_1_1a', text: 'a ∝ x', isCorrect: false },
      { id: 'opt_7_1_1b', text: 'a ∝ -x', isCorrect: true },
      { id: 'opt_7_1_1c', text: 'a ∝ x²', isCorrect: false },
      { id: 'opt_7_1_1d', text: 'a ∝ 1/x', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: a ∝ -x।',
      coreConcept: 'সরল স্পন্দন গতিতে পুনঃস্থাপন বল $F = -kx$ হওয়ায় ত্বরণ $a = -\\frac{k}{m}x$, অর্থাৎ ত্বরণ সরণের সমানুপাতিক এবং সর্বদা সাম্যাবস্থামুখী।',
      distractorAnalysis: {
        opt_7_1_1a: 'বিপরীত দিক নির্দেশক ঋণাত্মক চিহ্নটি অনুপস্থিত।',
        opt_7_1_1c: 'ত্বরণ সরণের বর্গের সমানুপাতিক নয়।',
        opt_7_1_1d: 'ত্বরণ সরণের ব্যস্তানুপাতিক নয়।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'সপ্তম অধ্যায়: তরঙ্গ ও শব্দ',
        pageNumber: 185,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_1_mcq_2',
    topicId: 'top_ssc_physics_ch7_1',
    type: 'MCQ',
    stem: 'সরল স্পন্দন গতিসম্পন্ন কোনো বস্তুর বেগ কোন অবস্থানে সর্বোচ্চ হয়?',
    options: [
      { id: 'opt_7_1_2a', text: 'সর্বোচ্চ বিস্তারের অবস্থানে', isCorrect: false },
      { id: 'opt_7_1_2b', text: 'সাম্যাবস্থানে', isCorrect: true },
      { id: 'opt_7_1_2c', text: 'বিস্তারের অর্ধেক দূরত্বে', isCorrect: false },
      { id: 'opt_7_1_2d', text: 'সর্বত্র বেগ সমান থাকে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: সাম্যাবস্থানে।',
      coreConcept: 'সাম্যাবস্থানে ($x = 0$) বিভবশক্তি শূন্য ও গতিশক্তি সর্বোচ্চ হওয়ায় বেগ সর্বাধিক হয়; প্রান্তবিন্দুতে ($x = \\pm A$) বেগ শূন্য হয়।',
      distractorAnalysis: {
        opt_7_1_2a: 'প্রান্তবিন্দুতে বেগ শূন্য কিন্তু ত্বরণ সর্বোচ্চ।',
        opt_7_1_2c: 'অর্ধেক বিস্তারে বেগ সর্বোচ্চের চেয়ে কম থাকে।',
        opt_7_1_2d: 'সরল স্পন্দনে বেগ প্রতিনিয়ত পরিবর্তিত হয়।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Cumilla Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_1_mcq_3',
    topicId: 'top_ssc_physics_ch7_1',
    type: 'MCQ',
    stem: 'কম্পাঙ্ক ($f$) ও পর্যায়কাল ($T$)-এর সঠিক সম্পর্ক কোনটি?',
    options: [
      { id: 'opt_7_1_3a', text: 'f = T', isCorrect: false },
      { id: 'opt_7_1_3b', text: 'fT = 1', isCorrect: true },
      { id: 'opt_7_1_3c', text: 'f = T²', isCorrect: false },
      { id: 'opt_7_1_3d', text: 'f/T = 1', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: fT = 1।',
      coreConcept: 'কম্পাঙ্ক হলো পর্যায়কালের ব্যস্তানুপাতিক ($f = \\frac{1}{T} \\implies fT = 1$)।',
      distractorAnalysis: {
        opt_7_1_3a: 'কম্পাঙ্ক ও পর্যায়কাল কেবল $1$ মানে সমান হতে পারে, সাধারণত নয়।',
        opt_7_1_3c: 'ভুল গাণিতিক সম্পর্ক।',
        opt_7_1_3d: '$f/T = 1$ হলে $f = T$ বোঝায়, যা ভুল।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_1_mcq_4',
    topicId: 'top_ssc_physics_ch7_1',
    type: 'MCQ',
    stem: 'একটি সেকেন্ড দোলকের কম্পাঙ্ক কত?',
    options: [
      { id: 'opt_7_1_4a', text: '0.5 Hz', isCorrect: true },
      { id: 'opt_7_1_4b', text: '1.0 Hz', isCorrect: false },
      { id: 'opt_7_1_4c', text: '2.0 Hz', isCorrect: false },
      { id: 'opt_7_1_4d', text: '0.25 Hz', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: 0.5 Hz।',
      coreConcept: 'সেকেন্ড দোলকের দোলনকাল $T = 2\\text{ s}$। সুতরাং $f = \\frac{1}{T} = \\frac{1}{2} = 0.5\\text{ Hz}$।',
      distractorAnalysis: {
        opt_7_1_4b: 'অর্ধ-দোলনের সময় $1\\text{ s}$-কে পর্যায়কাল ধরে ভুল করা হয়েছে।',
        opt_7_1_4c: 'এটি পর্যায়কালের মান ($2\\text{ s}$), কম্পাঙ্ক নয়।',
        opt_7_1_4d: 'ভুল ভাগফল।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Sylhet Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_1_mcq_5',
    topicId: 'top_ssc_physics_ch7_1',
    type: 'MCQ',
    stem: 'একটি সরল দোলকের কার্যকর দৈর্ঘ্য 4 গুণ করা হলে দোলনকাল কত গুণ হবে?',
    options: [
      { id: 'opt_7_1_5a', text: '1/2 গুণ', isCorrect: false },
      { id: 'opt_7_1_5b', text: '2 গুণ', isCorrect: true },
      { id: 'opt_7_1_5c', text: '4 গুণ', isCorrect: false },
      { id: 'opt_7_1_5d', text: '16 গুণ', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 2 গুণ।',
      coreConcept: '$T = 2\\pi\\sqrt{\\frac{\\ell}{g}} \\implies T \\propto \\sqrt{\\ell}$।',
      stepDerivation: '$\\frac{T_2}{T_1} = \\sqrt{\\frac{4\\ell_1}{\\ell_1}} = \\sqrt{4} = 2$।',
      distractorAnalysis: {
        opt_7_1_5a: 'ব্যস্তানুপাতিক ধরা হয়েছে।',
        opt_7_1_5c: 'বর্গমূল নেওয়া হয়নি।',
        opt_7_1_5d: 'বর্গ করা হয়েছে, বর্গমূল নয়।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Chattogram Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_1_mcq_6',
    topicId: 'top_ssc_physics_ch7_1',
    type: 'MCQ',
    stem: 'একটি সরল দোলকের ববের ভর 50 g থেকে বাড়িয়ে 100 g করা হলে (দৈর্ঘ্য অপরিবর্তিত রেখে) দোলনকাল—',
    options: [
      { id: 'opt_7_1_6a', text: 'দ্বিগুণ হবে', isCorrect: false },
      { id: 'opt_7_1_6b', text: 'অর্ধেক হবে', isCorrect: false },
      { id: 'opt_7_1_6c', text: 'অপরিবর্তিত থাকবে', isCorrect: true },
      { id: 'opt_7_1_6d', text: '√2 গুণ হবে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: অপরিবর্তিত থাকবে।',
      coreConcept: 'সরল দোলকের দোলনকালের সমীকরণ $T = 2\\pi\\sqrt{\\frac{\\ell}{g}}$-তে ভর ($m$) অনুপস্থিত; তাই ববের ভরের ওপর দোলনকাল নির্ভর করে না।',
      distractorAnalysis: {
        opt_7_1_6a: 'স্প্রিং-ভর ব্যবস্থার সাথে গুলিয়ে ফেলা হয়েছে।',
        opt_7_1_6b: 'ভরের ওপর নির্ভর করে না।',
        opt_7_1_6d: 'স্প্রিংয়ে ভর দ্বিগুণ করলে $\\sqrt{2}$ গুণ হতো, সরল দোলকে নয়।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Jashore Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_1_mcq_7',
    topicId: 'top_ssc_physics_ch7_1',
    type: 'MCQ',
    stem: 'স্প্রিং ধ্রুবকের ($k$) SI একক কোনটি?',
    options: [
      { id: 'opt_7_1_7a', text: 'N·m', isCorrect: false },
      { id: 'opt_7_1_7b', text: 'N/m', isCorrect: true },
      { id: 'opt_7_1_7c', text: 'J/m²', isCorrect: false },
      { id: 'opt_7_1_7d', text: 'kg/s', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: N/m।',
      coreConcept: '$|F| = kx \\implies k = \\frac{F}{x}$ হওয়ায় স্প্রিং ধ্রুবকের SI একক নিউটন প্রতি মিটার ($\\text{N/m}$)।',
      distractorAnalysis: {
        opt_7_1_7a: '$\\text{N}\\cdot\\text{m}$ হলো কাজ বা টর্কের একক।',
        opt_7_1_7c: '$\\text{J/m}^2 = \\text{N/m}$ হলেও প্রচলিত SI প্রকাশ হলো $\\text{N/m}$।',
        opt_7_1_7d: 'ভুল একক।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dinajpur Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_1_mcq_8',
    topicId: 'top_ssc_physics_ch7_1',
    type: 'MCQ',
    stem: '100 N/m স্প্রিং ধ্রুবকবিশিষ্ট একটি স্প্রিংয়ের সাথে 1 kg ভর যুক্ত করে দোলালে এর দোলনকাল কত হবে?',
    options: [
      { id: 'opt_7_1_8a', text: '0.314 s', isCorrect: false },
      { id: 'opt_7_1_8b', text: '0.628 s', isCorrect: true },
      { id: 'opt_7_1_8c', text: '1.256 s', isCorrect: false },
      { id: 'opt_7_1_8d', text: '6.28 s', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 0.628 s।',
      coreConcept: 'স্প্রিং-ভর ব্যবস্থার দোলনকাল $T = 2\\pi\\sqrt{\\frac{m}{k}}$।',
      stepDerivation: '$T = 2\\pi\\sqrt{\\frac{1}{100}} = 2 \\times 3.1416 \\times 0.1 = 0.628\\text{ s}$।',
      distractorAnalysis: {
        opt_7_1_8a: '$\\pi \\times 0.1$ হিসাব করা হয়েছে ($2$ বাদ পড়েছে)।',
        opt_7_1_8c: 'অতিরিক্ত $2$ গুণ করা হয়েছে।',
        opt_7_1_8d: '$k = 1\\text{ N/m}$ ধরে হিসাব করা হয়েছে।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Barishal Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_1_mcq_9',
    topicId: 'top_ssc_physics_ch7_1',
    type: 'MCQ',
    stem: 'সরল স্পন্দন গতির সাম্যাবস্থায় কোনটি শূন্য হয়?',
    options: [
      { id: 'opt_7_1_9a', text: 'বেগ', isCorrect: false },
      { id: 'opt_7_1_9b', text: 'গতিশক্তি', isCorrect: false },
      { id: 'opt_7_1_9c', text: 'পুনঃস্থাপন বল ও ত্বরণ', isCorrect: true },
      { id: 'opt_7_1_9d', text: 'কম্পাঙ্ক', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: পুনঃস্থাপন বল ও ত্বরণ।',
      coreConcept: 'সাম্যাবস্থায় সরণ $x = 0$ হওয়ায় $F = -kx = 0$ এবং $a = 0$।',
      distractorAnalysis: {
        opt_7_1_9a: 'সাম্যাবস্থায় বেগ সর্বোচ্চ।',
        opt_7_1_9b: 'সাম্যাবস্থায় গতিশক্তি সর্বোচ্চ।',
        opt_7_1_9d: 'কম্পাঙ্ক ধ্রুব থাকে।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Mymensingh Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_1_mcq_10',
    topicId: 'top_ssc_physics_ch7_1',
    type: 'MCQ',
    stem: 'একটি সরল দোলকের দোলনকাল $T$। এটি সাম্যাবস্থা থেকে এক প্রান্তে যেতে কত সময় নেবে?',
    options: [
      { id: 'opt_7_1_10a', text: 'T/4', isCorrect: true },
      { id: 'opt_7_1_10b', text: 'T/2', isCorrect: false },
      { id: 'opt_7_1_10c', text: 'T', isCorrect: false },
      { id: 'opt_7_1_10d', text: '3T/4', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: T/4।',
      coreConcept: 'একটি পূর্ণ দোলনে ৪টি সমান অংশ থাকে: সাম্যাবস্থা $\\to$ ডান প্রান্ত $\\to$ সাম্যাবস্থা $\\to$ বাম প্রান্ত $\\to$ সাম্যাবস্থা। তাই প্রতিটি অংশে সময় লাগে $T/4$।',
      distractorAnalysis: {
        opt_7_1_10b: 'এক প্রান্ত থেকে অপর প্রান্তে যেতে $T/2$ সময় লাগে।',
        opt_7_1_10c: 'একটি পূর্ণ দোলনের সময় $T$।',
        opt_7_1_10d: 'তিনটি চতুর্থাংশের সময়।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dhaka Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_1_mcq_16',
    topicId: 'top_ssc_physics_ch7_1',
    type: 'MCQ',
    stem: 'একটি স্প্রিংয়ের বল ধ্রুবক $k = 100\\text{ N/m}$। স্প্রিংটিতে $1\\text{ kg}$ ভর ঝুলিয়ে দুলতে দিলে এর দোলনকাল কত সেকেন্ড হবে?',
    options: [
      { id: 'opt_7_1_16a', text: '$0.314\\text{ s}$', isCorrect: false },
      { id: 'opt_7_1_16b', text: '$0.628\\text{ s}$', isCorrect: true },
      { id: 'opt_7_1_16c', text: '$1.256\\text{ s}$', isCorrect: false },
      { id: 'opt_7_1_16d', text: '$6.28\\text{ s}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: $0.628\\text{ s}$।',
      coreConcept: 'স্প্রিং-ভর ব্যবস্থার দোলনকাল $T = 2\\pi\\sqrt{\\frac{m}{k}}$।',
      stepDerivation:
        'দেওয়া আছে, ভর $m = 1\\text{ kg}$ এবং স্প্রিং ধ্রুবক $k = 100\\text{ N/m}$।\n$$T = 2\\pi\\sqrt{\\frac{1}{100}} = 2\\pi \\times 0.1 = 0.2 \\times 3.1416 \\approx 0.628\\text{ s}$$',
      distractorAnalysis: {
        opt_7_1_16a: 'এখানে $2\\pi$-এর বদলে কেবল $\\pi$ দিয়ে গুণ করা হয়েছে।',
        opt_7_1_16c: 'এটি প্রকৃত মানের দ্বিগুণ ($4\\pi \\times 0.1$)।',
        opt_7_1_16d: 'এখানে $\\sqrt{1/100} = 0.1$ নেওয়ার বদলে $1$ ধরা হয়েছে।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'সপ্তম অধ্যায়: তরঙ্গ ও শব্দ',
        pageNumber: 187,
      },
      proTipShortcut: '$\\sqrt{1/100} = 0.1$ হলে সরাসরি $T = 0.2\\pi \\approx 0.628\\text{ s}$!',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Sylhet Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  // =========================================================================
  // Topic 7.2: তরঙ্গ (Waves) [top_ssc_physics_ch7_2] — Batch 1
  // =========================================================================
  {
    id: 'q_ch7_2_mcq_1',
    topicId: 'top_ssc_physics_ch7_2',
    type: 'MCQ',
    stem: 'নিচের কোনটি অনুপ্রস্থ তরঙ্গের বৈশিষ্ট্য?',
    options: [
      { id: 'opt_7_2_1a', text: 'মাধ্যমের কণা তরঙ্গের দিকে স্পন্দিত হয়', isCorrect: false },
      { id: 'opt_7_2_1b', text: 'সংকোচন ও প্রসারণের মাধ্যমে অগ্রসর হয়', isCorrect: false },
      { id: 'opt_7_2_1c', text: 'মাধ্যমের কণা তরঙ্গ প্রবাহের দিকের সাথে সমকোণে স্পন্দিত হয়', isCorrect: true },
      { id: 'opt_7_2_1d', text: 'বায়ুতে শব্দ একটি অনুপ্রস্থ তরঙ্গ', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: মাধ্যমের কণা তরঙ্গ প্রবাহের দিকের সাথে সমকোণে স্পন্দিত হয়।',
      coreConcept: 'অনুপ্রস্থ তরঙ্গে কণার কম্পন ও তরঙ্গ গতির দিক পরস্পর লম্ব ($90^\\circ$) থাকে এবং তরঙ্গশীর্ষ ও তরঙ্গপাদ গঠিত হয়।',
      distractorAnalysis: {
        opt_7_2_1a: 'এটি অনুদৈর্ঘ্য তরঙ্গের বৈশিষ্ট্য।',
        opt_7_2_1b: 'সংকোচন-প্রসারণ অনুদৈর্ঘ্য তরঙ্গে ঘটে।',
        opt_7_2_1d: 'বায়ুতে শব্দ অনুদৈর্ঘ্য তরঙ্গ।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_2_mcq_2',
    topicId: 'top_ssc_physics_ch7_2',
    type: 'MCQ',
    stem: 'একটি তরঙ্গের কম্পাঙ্ক 50 Hz এবং তরঙ্গদৈর্ঘ্য 4 m হলে তরঙ্গবেগ কত?',
    options: [
      { id: 'opt_7_2_2a', text: '12.5 m/s', isCorrect: false },
      { id: 'opt_7_2_2b', text: '54 m/s', isCorrect: false },
      { id: 'opt_7_2_2c', text: '200 m/s', isCorrect: true },
      { id: 'opt_7_2_2d', text: '400 m/s', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: 200 m/s।',
      coreConcept: '$v = f\\lambda$।',
      stepDerivation: '$v = 50 \\times 4 = 200\\text{ m/s}$।',
      distractorAnalysis: {
        opt_7_2_2a: '$f/\\lambda$ করা হয়েছে।',
        opt_7_2_2b: 'যোগ করা হয়েছে।',
        opt_7_2_2d: 'দ্বিগুণ মান নেওয়া হয়েছে।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_2_mcq_3',
    topicId: 'top_ssc_physics_ch7_2',
    type: 'MCQ',
    stem: 'পরপর দুটি তরঙ্গশীর্ষের মধ্যবর্তী দূরত্ব 2.5 m। তরঙ্গের বেগ 25 m/s হলে পর্যায়কাল কত?',
    options: [
      { id: 'opt_7_2_3a', text: '0.1 s', isCorrect: true },
      { id: 'opt_7_2_3b', text: '0.4 s', isCorrect: false },
      { id: 'opt_7_2_3c', text: '2.5 s', isCorrect: false },
      { id: 'opt_7_2_3d', text: '10 s', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: 0.1 s।',
      coreConcept: '$v = \\frac{\\lambda}{T} \\implies T = \\frac{\\lambda}{v}$।',
      stepDerivation: '$T = \\frac{2.5}{25} = 0.1\\text{ s}$।',
      distractorAnalysis: {
        opt_7_2_3b: 'ভুল ভাগফল।',
        opt_7_2_3c: 'তরঙ্গদৈর্ঘ্যের মান লেখা হয়েছে।',
        opt_7_2_3d: 'এটি কম্পাঙ্ক $f = 10\\text{ Hz}$-এর মান, পর্যায়কাল নয়।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Cumilla Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_2_mcq_4',
    topicId: 'top_ssc_physics_ch7_2',
    type: 'MCQ',
    stem: 'স্প্রিংয়ের সংকোচন ও প্রসারণের মাধ্যমে সৃষ্ট তরঙ্গ কোন ধরনের?',
    options: [
      { id: 'opt_7_2_4a', text: 'অনুপ্রস্থ তরঙ্গ', isCorrect: false },
      { id: 'opt_7_2_4b', text: 'অনুদৈর্ঘ্য তরঙ্গ', isCorrect: true },
      { id: 'opt_7_2_4c', text: 'তড়িৎচুম্বকীয় তরঙ্গ', isCorrect: false },
      { id: 'opt_7_2_4d', text: 'তাপ তরঙ্গ', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: অনুদৈর্ঘ্য তরঙ্গ।',
      coreConcept: 'স্প্রিং বরাবর সংকোচন ও প্রসারণ তরঙ্গ প্রবাহের সমান্তরালে স্পন্দিত হয়ে অগ্রসর হয়।',
      distractorAnalysis: {
        opt_7_2_4a: 'দড়িতে ওপর-নিচে ঝাঁকালে অনুপ্রস্থ হয়, স্প্রিংয়ের সংকোচন-প্রসারণে নয়।',
        opt_7_2_4c: 'স্প্রিংয়ে যান্ত্রিক তরঙ্গ তৈরি হয়।',
        opt_7_2_4d: 'তাপীয় বিকিরণ তড়িৎচুম্বকীয় তরঙ্গ।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Chattogram Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_2_mcq_5',
    topicId: 'top_ssc_physics_ch7_2',
    type: 'MCQ',
    stem: 'একটি তরঙ্গের পর্যায়কাল 0.02 s এবং তরঙ্গদৈর্ঘ্য 0.4 m। এর তরঙ্গবেগ কত?',
    options: [
      { id: 'opt_7_2_5a', text: '8 m/s', isCorrect: false },
      { id: 'opt_7_2_5b', text: '20 m/s', isCorrect: true },
      { id: 'opt_7_2_5c', text: '50 m/s', isCorrect: false },
      { id: 'opt_7_2_5d', text: '0.008 m/s', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 20 m/s।',
      coreConcept: '$v = \\frac{\\lambda}{T}$।',
      stepDerivation: '$v = \\frac{0.4}{0.02} = 20\\text{ m/s}$।',
      distractorAnalysis: {
        opt_7_2_5a: 'ভুল গুণফল।',
        opt_7_2_5c: 'এটি কম্পাঙ্ক $f = 1/0.02 = 50\\text{ Hz}$।',
        opt_7_2_5d: '$\\lambda \\times T$ করা হয়েছে।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Sylhet Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_2_mcq_6',
    topicId: 'top_ssc_physics_ch7_2',
    type: 'MCQ',
    stem: 'তরঙ্গের দুটি কণা "সমদশায়" আছে বলতে কী বোঝায়?',
    options: [
      { id: 'opt_7_2_6a', text: 'তাদের সরণ বিপরীতমুখী', isCorrect: false },
      { id: 'opt_7_2_6b', text: 'তাদের গতির অবস্থা, সরণ ও দিক একই', isCorrect: true },
      { id: 'opt_7_2_6c', text: 'তাদের মধ্যে দূরত্ব λ/2', isCorrect: false },
      { id: 'opt_7_2_6d', text: 'তাদের কম্পাঙ্ক অসমান', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: তাদের গতির অবস্থা, সরণ ও দিক একই।',
      coreConcept: 'একই দশাসম্পন্ন পরপর দুটি কণার (যেমন পরপর দুটি তরঙ্গশীর্ষের) সরণ ও বেগের দিক সর্বদা অভিন্ন হয় এবং তাদের মধ্যবর্তী দূরত্ব $\\lambda$-এর পূর্ণ গুণিতক।',
      distractorAnalysis: {
        opt_7_2_6a: 'সরণ বিপরীতমুখী হলে তারা বিপরীত দশায় ($\\pi$ পার্থক্যে) থাকে।',
        opt_7_2_6c: '$\\lambda/2$ দূরত্ব মানে বিপরীত দশা।',
        opt_7_2_6d: 'একই তরঙ্গের সব কণার কম্পাঙ্ক সমান।',
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Jashore Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_2_mcq_7',
    topicId: 'top_ssc_physics_ch7_2',
    type: 'MCQ',
    stem: 'পুকুরের পানিতে ভাসমান একটি কর্ক 4 সেকেন্ডে 12 বার সম্পূর্ণ ওঠানামা করে। তরঙ্গটির কম্পাঙ্ক কত?',
    options: [
      { id: 'opt_7_2_7a', text: '0.33 Hz', isCorrect: false },
      { id: 'opt_7_2_7b', text: '3 Hz', isCorrect: true },
      { id: 'opt_7_2_7c', text: '4 Hz', isCorrect: false },
      { id: 'opt_7_2_7d', text: '48 Hz', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 3 Hz।',
      coreConcept: 'কম্পাঙ্ক $f = \\frac{\\text{কম্পন সংখ্যা}}{\\text{সময়}}$।',
      stepDerivation: '$f = \\frac{12}{4} = 3\\text{ Hz}$।',
      distractorAnalysis: {
        opt_7_2_7a: 'এটি পর্যায়কাল $T = 4/12 = 0.33\\text{ s}$।',
        opt_7_2_7c: 'সময়ের মান বসানো হয়েছে।',
        opt_7_2_7d: 'গুণ করা হয়েছে।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dinajpur Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_2_mcq_8',
    topicId: 'top_ssc_physics_ch7_2',
    type: 'MCQ',
    stem: 'নিচের কোন ভৌত ঘটনাগুলো তরঙ্গের ক্ষেত্রে ঘটে থাকে?',
    options: [
      { id: 'opt_7_2_8a', text: 'শুধুমাত্র প্রতিফলন', isCorrect: false },
      { id: 'opt_7_2_8b', text: 'শুধুমাত্র প্রতিসরণ', isCorrect: false },
      { id: 'opt_7_2_8c', text: 'প্রতিফলন, প্রতিসরণ ও উপরিপাতন', isCorrect: true },
      { id: 'opt_7_2_8d', text: 'ভর স্থানান্তর ও জারণ', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: প্রতিফলন, প্রতিসরণ ও উপরিপাতন।',
      coreConcept: 'সকল তরঙ্গ প্রতিফলিত হয়, মাধ্যম বদলালে প্রতিসরিত হয় এবং একাধিক তরঙ্গ মিলিত হলে উপরিপাতন ঘটে।',
      distractorAnalysis: {
        opt_7_2_8a: 'প্রতিসরণ ও উপরিপাতনও ঘটে।',
        opt_7_2_8b: 'অসম্পূর্ণ উত্তর।',
        opt_7_2_8d: 'তরঙ্গ ভর স্থানান্তর করে না।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Barishal Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_2_mcq_9',
    topicId: 'top_ssc_physics_ch7_2',
    type: 'MCQ',
    stem: 'কোনো বস্তুর কম্পাঙ্ক 0 Hz থেকে বাড়ানো হলে এবং 100 Hz-এ স্থির রাখলে—',
    options: [
      { id: 'opt_7_2_9a', text: 'শব্দ শোনা যাবে না', isCorrect: false },
      { id: 'opt_7_2_9b', text: 'শ্রাব্য শব্দ উৎপন্ন হবে', isCorrect: true },
      { id: 'opt_7_2_9c', text: 'শব্দোত্তর তরঙ্গ তৈরি হবে', isCorrect: false },
      { id: 'opt_7_2_9d', text: 'তরঙ্গদৈর্ঘ্য শূন্য হবে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: শ্রাব্য শব্দ উৎপন্ন হবে।',
      coreConcept: '$100\\text{ Hz}$ মানুষের শ্রাব্যতার পাল্লা ($20\\text{ Hz}\\text{–}20,000\\text{ Hz}$)-এর মধ্যে অবস্থিত।',
      distractorAnalysis: {
        opt_7_2_9a: '$100\\text{ Hz}$ স্পষ্ট শ্রাব্য শব্দ।',
        opt_7_2_9c: 'শব্দোত্তর হতে $> 20,000\\text{ Hz}$ প্রয়োজন।',
        opt_7_2_9d: '$\\lambda = v/100 > 0$।',
      },
    },
    difficulty: 'EASY',
    boardSource: 'Mymensingh Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  // =========================================================================
  // Creative Questions (CQ) — Batch 1
  // =========================================================================
  {
    id: 'q_ch7_1_cq_1',
    topicId: 'top_ssc_physics_ch7_1',
    type: 'CQ_CREATIVE',
    stem: 'একটি সরল দোলকের কার্যকর দৈর্ঘ্য 1.2 m। ভূপৃষ্ঠে অভিকর্ষজ ত্বরণ g = 9.8 m/s²। দোলকটিকে 10 cm বিস্তারে দোলানো হচ্ছে এবং এর ববের ভর 50 g।',
    options: null,
    explanation: {
      directAnswer: 'গ-এর উত্তর: দোলকটির দোলনকাল 2.20 s এবং কম্পাঙ্ক 0.45 Hz। ঘ-এর উত্তর: দোলকটিকে সেকেন্ড দোলকে পরিণত করতে কার্যকর দৈর্ঘ্য কমিয়ে 0.993 m (প্রায় 0.207 m হ্রাস) করতে হবে।',
      coreConcept: 'সরল দোলকের দোলনকাল $T = 2\\pi\\sqrt{\\frac{\\ell}{g}}$ এবং সেকেন্ড দোলকের শর্ত ($T = 2\\text{ s}$)।',
      stepDerivation: '$T = 2\\pi\\sqrt{\\frac{1.2}{9.8}} \\approx 2.1986\\text{ s} \\approx 2.20\\text{ s}$ এবং $f = \\frac{1}{2.1986} \\approx 0.455\\text{ Hz}$।\nসেকেন্ড দোলকের জন্য $\\ell\' = \\frac{g T\'^2}{4\\pi^2} = \\frac{9.8 \\times 4}{4\\pi^2} \\approx 0.993\\text{ m}$। কমাতে হবে $1.2 - 0.993 = 0.207\\text{ m}$।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'সপ্তম অধ্যায়: তরঙ্গ ও শব্দ',
        pageNumber: 188,
      },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'জ্ঞানমূলক: সরল স্পন্দন গতি বা পর্যায়কালের সঠিক সংজ্ঞায় ১ নম্বর।' },
      kha: { mark: 2, criteria: 'অনুধাবনমূলক: ববের ভর 50 g থেকে 100 g করলে দোলনকাল কেন বদলায় না তা ব্যাখ্যায় ২ নম্বর।' },
      ga: { mark: 3, criteria: 'প্রয়োগমূলক: দোলনকাল ($2.20\\text{ s}$) ও কম্পাঙ্ক ($0.455\\text{ Hz}$) নির্ণয়ে ৩ নম্বর।' },
      gha: { mark: 4, criteria: 'উচ্চতর দক্ষতা: সেকেন্ড দোলক বানানোর জন্য দৈর্ঘ্য $0.207\\text{ m}$ কমাতে হবে তা গাণিতিকভাবে বিশ্লেষণে ৪ নম্বর।' },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch7_2_cq_1',
    topicId: 'top_ssc_physics_ch7_2',
    type: 'CQ_CREATIVE',
    stem: 'একটি পুকুরের পানিতে ভাসমান একটি কাঠের টুকরা 5 সেকেন্ডে 20 বার ওপর-নিচে দোলে। পরপর দুটি ঢেউয়ের শীর্ষের মধ্যবর্তী দূরত্ব 0.45 m।',
    options: null,
    explanation: {
      directAnswer: 'গ-এর উত্তর: তরঙ্গের কম্পাঙ্ক 4 Hz এবং তরঙ্গবেগ 1.8 m/s। ঘ-এর উত্তর: কাঠের টুকরাটি পানির কণার মতো নিজ স্থানে কেবল ওপর-নিচে স্পন্দিত হয় কিন্তু ঢেউয়ের সাথে তীরে সরে যায় না—কারণ তরঙ্গ শক্তি সঞ্চালন করে, মাধ্যমের কণা নয়।',
      coreConcept: 'তরঙ্গ কম্পাঙ্ক $f = \\frac{N}{t}$, তরঙ্গবেগ $v = f\\lambda$ এবং তরঙ্গের শক্তি সঞ্চালন ধর্ম।',
      stepDerivation: '$f = \\frac{20}{5} = 4\\text{ Hz}$, $\\lambda = 0.45\\text{ m}$।\n$v = f\\lambda = 4 \\times 0.45 = 1.8\\text{ m/s}$।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'সপ্তম অধ্যায়: তরঙ্গ ও শব্দ',
        pageNumber: 193,
      },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'জ্ঞানমূলক: তরঙ্গ কাকে বলে তা লেখায় ১ নম্বর।' },
      kha: { mark: 2, criteria: 'অনুধাবনমূলক: যান্ত্রিক ও তড়িৎচুম্বকীয় তরঙ্গের দুটি পার্থক্য লেখায় ২ নম্বর।' },
      ga: { mark: 3, criteria: 'প্রয়োগমূলক: কম্পাঙ্ক $4\\text{ Hz}$ এবং বেগ $1.8\\text{ m/s}$ নির্ণয়ে ৩ নম্বর।' },
      gha: { mark: 4, criteria: 'উচ্চতর দক্ষতা: কাঠের টুকরা তীরে ভেসে না যাওয়ার ভৌত কারণ (অনুপ্রস্থ তরঙ্গের কণার স্পন্দন) বিশ্লেষণে ৪ নম্বর।' },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];

export const chapter7Questions: QuestionData[] = [
  ...batch1Questions,
  ...chapter7Batch2Questions,
  ...chapter7Batch3Questions,
];
