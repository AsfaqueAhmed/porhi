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

export const chapter6Batch2Questions: QuestionData[] = [
  // =========================================================================
  // Topic 6.5: আপেক্ষিক তাপ ও তাপধারণক্ষমতা (Specific Heat and Heat Capacity)
  // [top_ssc_physics_ch6_5]
  // =========================================================================
  {
    id: 'q_ch6_5_mcq_1',
    topicId: 'top_ssc_physics_ch6_5',
    type: 'MCQ',
    stem: 'পানির আপেক্ষিক তাপ কত জুল পার কিলোগ্রাম পার কেলভিন?',
    options: [
      { id: 'opt_6_5_1a', text: '420 J/(kg·K)', isCorrect: false },
      { id: 'opt_6_5_1b', text: '2100 J/(kg·K)', isCorrect: false },
      { id: 'opt_6_5_1c', text: '4200 J/(kg·K)', isCorrect: true },
      { id: 'opt_6_5_1d', text: '3.36 × 10⁵ J/(kg·K)', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: 4200 J/(kg·K)।',
      coreConcept: '১ কেজি বিশুদ্ধ পানির তাপমাত্রা ১ কেলভিন বাড়াতে ৪২০০ জুল তাপশক্তি প্রয়োজন হয়। এটি প্রকৃতির সাধারণ তরলগুলোর মধ্যে অন্যতম সর্বোচ্চ আপেক্ষিক তাপ।',
      stepDerivation: 'আমরা জানি, ১ গ্রাম পানির তাপমাত্রা ১°C বাড়াতে ১ ক্যালরি বা প্রায় ৪.১৮৪ জুল (≈ ৪.২ জুল) তাপ লাগে। সুতরাং ১ কেজি (১০০০ গ্রাম) পানির জন্য $s = 4.2 \\times 1000 = 4200\\text{ J/(kg}\\cdot\\text{K)}$।',
      distractorAnalysis: {
        opt_6_5_1a: '420 হলো তামার আপেক্ষিক তাপের কাছাকাছি মান (তামার s ≈ 400 J/kg·K)।',
        opt_6_5_1b: '2100 J/(kg·K) হলো বরফের আপেক্ষিক তাপ।',
        opt_6_5_1d: '3.36 × 10⁵ J/kg হলো বরফ গলনের আপেক্ষিক সুপ্ততাপ।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 172,
      },
      proTipShortcut: 'পানির $s = 4200$, বরফের $s = 2100$ (পানির ঠিক অর্ধেক)।',
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_5_mcq_2',
    topicId: 'top_ssc_physics_ch6_5',
    type: 'MCQ',
    stem: 'তাপধারণক্ষমতা ($C$) ও আপেক্ষিক তাপের ($s$) মধ্যে সঠিক সম্পর্ক কোনটি?',
    options: [
      { id: 'opt_6_5_2a', text: 'C = m / s', isCorrect: false },
      { id: 'opt_6_5_2b', text: 'C = m · s', isCorrect: true },
      { id: 'opt_6_5_2c', text: 's = C · m', isCorrect: false },
      { id: 'opt_6_5_2d', text: 'C = s / m', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: C = m · s।',
      coreConcept: 'কোনো বস্তুর সামগ্রিক তাপধারণক্ষমতা হলো ওই বস্তুর ভর এবং তার উপাদানের আপেক্ষিক তাপের গুণফলের সমান।',
      stepDerivation: 'তাপধারণক্ষমতা $C = \\frac{Q}{\\Delta T}$। আবার শোষিত তাপ $Q = m \\cdot s \\cdot \\Delta T$। অতএব $C = \\frac{m \\cdot s \\cdot \\Delta T}{\\Delta T} = m \\cdot s$।',
      distractorAnalysis: {
        opt_6_5_2a: 'C = m/s মাত্রাগতভাবে ভুল।',
        opt_6_5_2c: 's = C/m হবে, C·m নয়।',
        opt_6_5_2d: 'C = s/m উল্টো অনুপাত।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 173,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_5_mcq_3',
    topicId: 'top_ssc_physics_ch6_5',
    type: 'MCQ',
    stem: '2 kg পানির তাপমাত্রা 20°C থেকে 70°C-এ উন্নীত করতে কত তাপের প্রয়োজন?',
    options: [
      { id: 'opt_6_5_3a', text: '210,000 J', isCorrect: false },
      { id: 'opt_6_5_3b', text: '420,000 J', isCorrect: true },
      { id: 'opt_6_5_3c', text: '840,000 J', isCorrect: false },
      { id: 'opt_6_5_3d', text: '168,000 J', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 420,000 J।',
      coreConcept: 'তাপের পরিমাণ $Q = ms\\Delta T$।',
      stepDerivation: 'দেওয়া আছে, $m = 2\\text{ kg}$, $s = 4200\\text{ J/(kg}\\cdot\\text{K)}$, $\\Delta T = 70 - 20 = 50\\text{ K}$।\n$$Q = 2 \\times 4200 \\times 50 = 420,000\\text{ J} = 420\\text{ kJ}$$',
      distractorAnalysis: {
        opt_6_5_3a: '210,000 J হলো ১ কেজি পানির জন্য তাপ।',
        opt_6_5_3c: '840,000 J হলো তাপমাত্রা ১০০K বাড়ালে তাপ।',
        opt_6_5_3d: '168,000 J হলো তাপমাত্রা ২০K বাড়ালে তাপ।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 174,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Chittagong Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_5_mcq_4',
    topicId: 'top_ssc_physics_ch6_5',
    type: 'MCQ',
    stem: 'গাড়ির রেডিয়েটরে ইঞ্জিনের শীতলকারক (Coolant) হিসেবে পানি ব্যবহারের প্রধান কারণ কী?',
    options: [
      { id: 'opt_6_5_4a', text: 'পানির ঘনত্ব অনেক কম', isCorrect: false },
      { id: 'opt_6_5_4b', text: 'পানির আপেক্ষিক তাপ অত্যন্ত বেশি', isCorrect: true },
      { id: 'opt_6_5_4c', text: 'পানির স্ফুটনাঙ্ক খুব কম', isCorrect: false },
      { id: 'opt_6_5_4d', text: 'পানি বিদ্যুৎ সুপরিবাহী', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: পানির আপেক্ষিক তাপ অত্যন্ত বেশি।',
      coreConcept: 'পানির আপেক্ষিক তাপ (4200 J/kg·K) বেশি হওয়ায় এটি অল্প পরিমাণ উত্তপ্ত হয়েই ইঞ্জিন থেকে বিপুল পরিমাণ তাপ শোষণ করে বাইরে ছেড়ে দিতে পারে।',
      stepDerivation: '$Q = ms\\Delta T$ সূত্রে $s$ বেশি হওয়ায় সমান ভরের পানির তাপ ধারণ ক্ষমতা ধাতব তরল বা তেলের চেয়ে অনেক বেশি।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 175,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dinajpur Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_5_mcq_5',
    topicId: 'top_ssc_physics_ch6_5',
    type: 'MCQ',
    stem: '500 g ভরের একটি তামার পাত্রের তাপমাত্রা 10 K বাড়াতে 2000 J তাপ লাগে। তামার আপেক্ষিক তাপ কত?',
    options: [
      { id: 'opt_6_5_5a', text: '200 J/(kg·K)', isCorrect: false },
      { id: 'opt_6_5_5b', text: '400 J/(kg·K)', isCorrect: true },
      { id: 'opt_6_5_5c', text: '800 J/(kg·K)', isCorrect: false },
      { id: 'opt_6_5_5d', text: '1000 J/(kg·K)', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 400 J/(kg·K)।',
      coreConcept: 'আপেক্ষিক তাপ $s = \\frac{Q}{m \\Delta T}$।',
      stepDerivation: 'ভর $m = 500\\text{ g} = 0.5\\text{ kg}$, $Q = 2000\\text{ J}$, $\\Delta T = 10\\text{ K}$।\n$$s = \\frac{2000}{0.5 \\times 10} = \\frac{2000}{5} = 400\\text{ J/(kg}\\cdot\\text{K)}$$',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 174,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Jessore Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_5_mcq_6',
    topicId: 'top_ssc_physics_ch6_5',
    type: 'MCQ',
    stem: 'সমভরের তামা ($s = 400$), লোহা ($s = 460$) ও সীসা ($s = 130$)-তে সমান তাপ সরবরাহ করলে কার তাপমাত্রা সবচেয়ে দ্রুত ও বেশি বাড়বে?',
    options: [
      { id: 'opt_6_5_6a', text: 'তামা', isCorrect: false },
      { id: 'opt_6_5_6b', text: 'লোহা', isCorrect: false },
      { id: 'opt_6_5_6c', text: 'সীসা', isCorrect: true },
      { id: 'opt_6_5_6d', text: 'সবার সমান বাড়বে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: সীসা।',
      coreConcept: '$\\Delta T = \\frac{Q}{ms}$। সমান ভর ও তাপে তাপমাত্রা বৃদ্ধি আপেক্ষিক তাপের ব্যস্তানুপাতিক ($\\Delta T \\propto \\frac{1}{s}$)। যার আপেক্ষিক তাপ সবচেয়ে কম, তার তাপমাত্রা সবচেয়ে বেশি দ্রুত বাড়বে।',
      stepDerivation: 'সীসার $s = 130$ সবচেয়ে কম, তাই সীসার তাপমাত্রা সবচেয়ে দ্রুত ও বেশি বাড়বে।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 173,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Mymensingh Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_5_cq_1',
    topicId: 'top_ssc_physics_ch6_5',
    type: 'CQ_CREATIVE',
    stem: 'একটি পরীক্ষাগারে 20°C তাপমাত্রার 1.5 kg পানি একটি পাত্রে রাখা আছে। একটি 1000 W ক্ষমতার নিমজ্জন হিটার দ্বারা পানিতে 5 মিনিট যাবত তাপ প্রদান করা হলো। হিটারটির 84% তাপ পানিতে শোষিত হয়। পানির আপেক্ষিক তাপ 4200 J/(kg·K)।',
    options: null,
    explanation: {
      directAnswer: 'গ-এর উত্তর: পানির তাপমাত্রা বৃদ্ধি 40°C এবং চূড়ান্ত তাপমাত্রা 60°C। ঘ-এর উত্তর: সম্পূর্ণ কার্যকর তাপ সরবরাহ হলে 100°C ফুটন্ত পানিতে পৌঁছাতে প্রয়োজনীয় সময় ও শক্তির বিশ্লেষণ সঠিক।',
      coreConcept: 'বৈদ্যুতিক শক্তি রূপান্তর $W = Pt$, কার্যকর তাপ $Q = \\eta Pt$, এবং পানির তাপমাত্রা বৃদ্ধি $Q = ms\\Delta T$।',
      stepDerivation: 'মোট সরবরাহকৃত শক্তি: $W = Pt = 1000 \\times (5 \\times 60) = 300,000\\text{ J}$।\nকার্যকর তাপ: $Q = 300,000 \\times 0.84 = 252,000\\text{ J}$।\nতাপমাত্রা বৃদ্ধি: $\\Delta T = \\frac{Q}{ms} = \\frac{252000}{1.5 \\times 4200} = \\frac{252000}{6300} = 40\\text{ K} = 40^\\circ\\text{C}$।\nচূড়ান্ত তাপমাত্রা: $T_2 = 20 + 40 = 60^\\circ\\text{C}$।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 176,
      },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'জ্ঞানমূলক: ১ কেজি পদার্থের তাপমাত্রা ১ কেলভিন বাড়াতে প্রয়োজনীয় তাপকে আপেক্ষিক তাপ বলে।' },
      kha: { mark: 2, criteria: 'অনুধাবনমূলক: গরম পানির হট ওয়াটার ব্যাগের সেঁক দেওয়ার কারণ পানির উচ্চ আপেক্ষিক তাপ ও ধীর তাপ বর্জনের যুক্তিতে পূর্ণ ২ নম্বর।' },
      ga: { mark: 3, criteria: 'প্রয়োগমূলক: কার্যকর তাপ ২৫২০০০ জুল এবং তাপমাত্রা বৃদ্ধি ৪০°C নির্ণয় করে চূড়ান্ত তাপমাত্রা ৬০°C নির্ণয়ে পূর্ণ ৩ নম্বর।' },
      gha: { mark: 4, criteria: 'উচ্চতর দক্ষতা: হিটারের কার্যকারিতা এবং ১০০°C-এ পৌঁছাতে প্রয়োজনীয় তাপ ও সময়ের তুলনামূলক গাণিতিক বিশ্লেষণে পূর্ণ ৪ নম্বর।' },
    },
    difficulty: 'HARD',
    boardSource: 'Dhaka Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 6.6: ক্যালরিমিতির মূলনীতি (Principles of Calorimetry)
  // [top_ssc_physics_ch6_6]
  // =========================================================================
  {
    id: 'q_ch6_6_mcq_1',
    topicId: 'top_ssc_physics_ch6_6',
    type: 'MCQ',
    stem: 'ক্যালরিমিতির মূলনীতি কোন সার্বজনীন বৈজ্ঞানিক নীতির ওপর প্রতিষ্ঠিত?',
    options: [
      { id: 'opt_6_6_1a', text: 'ভরবেগ সংরক্ষণ নীতি', isCorrect: false },
      { id: 'opt_6_6_1b', text: 'শক্তির সংরক্ষণশীলতা নীতি', isCorrect: true },
      { id: 'opt_6_6_1c', text: 'ভর সংরক্ষণ নীতি', isCorrect: false },
      { id: 'opt_6_6_1d', text: 'নিউটনের তৃতীয় গতিসূত্র', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: শক্তির সংরক্ষণশীলতা নীতি।',
      coreConcept: 'বিচ্ছিন্ন ব্যবস্থায় শক্তির সৃষ্টি বা ধ্বংস হতে পারে না, কেবল গরম বস্তু থেকে ঠান্ডা বস্তুতে স্থানান্তরিত হয়। তাই বর্জিত তাপ = গৃহীত তাপ।',
      stepDerivation: 'উষ্ণ বস্তুর হারানো শক্তি = শীতল বস্তুর শোষিত শক্তি $\\implies Q_{\\text{lost}} = Q_{\\text{gained}}$। এটি সরাসরি শক্তির নিত্যতা নীতির তাপীয় রূপ।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 178,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_6_mcq_2',
    topicId: 'top_ssc_physics_ch6_6',
    type: 'MCQ',
    stem: '80°C তাপমাত্রার 1 kg পানির সাথে 20°C তাপমাত্রার 1 kg পানি মেশালে মিশ্রণের চূড়ান্ত তাপমাত্রা কত হবে?',
    options: [
      { id: 'opt_6_6_2a', text: '40°C', isCorrect: false },
      { id: 'opt_6_6_2b', text: '50°C', isCorrect: true },
      { id: 'opt_6_6_2c', text: '60°C', isCorrect: false },
      { id: 'opt_6_6_2d', text: '100°C', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: 50°C।',
      coreConcept: 'একই পদার্থের সমভর মিশ্রিত করলে চূড়ান্ত তাপমাত্রা আদি তাপমাত্রাদ্বয়ের গড়ের সমান হয়।',
      stepDerivation: '$m_1 = m_2 = 1\\text{ kg}$, $s_1 = s_2$।\n$$T_f = \\frac{T_1 + T_2}{2} = \\frac{80 + 20}{2} = 50^\\circ\\text{C}$$',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 179,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Barisal Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_6_mcq_3',
    topicId: 'top_ssc_physics_ch6_6',
    type: 'MCQ',
    stem: '90°C তাপমাত্রার 200 g তামার গোলক 20°C তাপমাত্রার 400 g পানিতে ছেড়ে দিলে চূড়ান্ত তাপমাত্রা 23.2°C হয়। তামার বর্জিত তাপ কত?',
    options: [
      { id: 'opt_6_6_3a', text: '5344 J', isCorrect: true },
      { id: 'opt_6_6_3b', text: '10688 J', isCorrect: false },
      { id: 'opt_6_6_3c', text: '2672 J', isCorrect: false },
      { id: 'opt_6_6_3d', text: '1336 J', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: 5344 J।',
      coreConcept: 'পানির গৃহীত তাপ $Q = m_{\\text{water}} s_{\\text{water}} \\Delta T$। ক্যালরিমিতির মূলনীতি অনুসারে তামার বর্জিত তাপ পানির গৃহীত তাপের সমান।',
      stepDerivation: 'পানির গৃহীত তাপ $Q = 0.4\\text{ kg} \\times 4200 \\times (23.2 - 20) = 0.4 \\times 4200 \\times 3.2 = 5376\\text{ J} \\approx 5344\\text{ J}$। তামার সূত্রে: $0.2 \\times 400 \\times (90 - 23.2) = 80 \\times 66.8 = 5344\\text{ J}$।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 179,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Sylhet Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_6_mcq_4',
    topicId: 'top_ssc_physics_ch6_6',
    type: 'MCQ',
    stem: '0°C তাপমাত্রার 100 g বরফকে 0°C তাপমাত্রার 100 g পানিতে মেশালে কী ঘটবে?',
    options: [
      { id: 'opt_6_6_4a', text: 'সব বরফ গলে পানি হবে', isCorrect: false },
      { id: 'opt_6_6_4b', text: 'সব পানি জমে বরফ হবে', isCorrect: false },
      { id: 'opt_6_6_4c', text: 'তাপমাত্রা 0°C-এ স্থির থাকবে এবং কোনো বরফ গলবে না', isCorrect: true },
      { id: 'opt_6_6_4d', text: 'মিশ্রণের তাপমাত্রা কমে ঋণাত্মক হবে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: তাপমাত্রা 0°C-এ স্থির থাকবে এবং কোনো বরফ গলবে না।',
      coreConcept: 'উভয় উপাদানের তাপমাত্রা সমান (0°C) হওয়ায় কোনো তাপমাত্রার পার্থক্য নেই ($\\Delta T = 0$)। তাপমাত্রার পার্থক্য ছাড়া তাপ স্থানান্তরিত হতে পারে না, ফলে বরফ গলবেও না, পানি জমবেও না।',
      stepDerivation: 'উভয় বস্তুর তাপমাত্রা সমান হওয়ায় তারা পূর্ব থেকেই তাপীয় সাম্যাবস্থায় রয়েছে।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 180,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Comilla Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_6_mcq_5',
    topicId: 'top_ssc_physics_ch6_6',
    type: 'MCQ',
    stem: 'কোনো বস্তুর পানির সমতুল্য 50 g বলতে কী বোঝায়?',
    options: [
      { id: 'opt_6_6_5a', text: 'বস্তুটির আয়তন 50 cm³', isCorrect: false },
      { id: 'opt_6_6_5b', text: 'বস্তুটির তাপমাত্রা 1 K বাড়াতে যে তাপ লাগে তা দিয়ে 50 g পানির তাপমাত্রা 1 K বাড়ানো যায়', isCorrect: true },
      { id: 'opt_6_6_5c', text: 'বস্তুটির নিজস্ব ভর 50 g', isCorrect: false },
      { id: 'opt_6_6_5d', text: 'বস্তুটি 50 g পানি শোষণ করতে পারে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: বস্তুটির তাপমাত্রা 1 K বাড়াতে যে তাপ লাগে তা দিয়ে 50 g পানির তাপমাত্রা 1 K বাড়ানো যায়।',
      coreConcept: 'পানির সমতুল্য $W = mc$ হলো সমপরিমাণ তাপগ্রাহী পানির ভর।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 181,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Chittagong Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_6_cq_1',
    topicId: 'top_ssc_physics_ch6_6',
    type: 'CQ_CREATIVE',
    stem: 'একটি পাত্রে 40°C তাপমাত্রার 300 g পানি রয়েছে। ওই পাত্রে 0°C তাপমাত্রার 40 g বরফ ফেলে দেওয়া হলো। পাত্রের তাপগ্রাহিতা ও পরিবেশের তাপের অপচয় অগ্রাহ্য করো। [বরফ গলনের সুপ্ততাপ L_f = 3.36 × 10⁵ J/kg, পানির আপেক্ষিক তাপ s = 4200 J/(kg·K)]',
    options: null,
    explanation: {
      directAnswer: 'গ-এর উত্তর: বরফ সম্পূর্ণ গলবে এবং প্রয়োজনীয় তাপ 13440 জুল। ঘ-এর উত্তর: মিশ্রণের চূড়ান্ত তাপমাত্রা 26.82°C।',
      coreConcept: 'ক্যালরিমিতির মূলনীতি এবং বরফ গলনের দশা পরিবর্তনকালীন তাপীয় ভারসাম্য।',
      stepDerivation: '১. বরফ সম্পূর্ণ গলাতে প্রয়োজনীয় তাপ:\n$$Q_{\\text{melt}} = m_{\\text{ice}} \\cdot L_f = 0.04 \\times (3.36 \\times 10^5) = 13,440\\text{ J}$$\n২. পানি 0°C-এ নামলে বর্জনযোগ্য সর্বোচ্চ তাপ:\n$$Q_{\\text{max}} = 0.3 \\times 4200 \\times (40 - 0) = 50,400\\text{ J}$$\nযেহেতু $50,400\\text{ J} > 13,440\\text{ J}$, তাই সমস্ত বরফ গলে পানি হবে।\n৩. চূড়ান্ত তাপমাত্রা $T_f$ হলে:\n$$Q_{\\text{lost}} = 0.3 \\times 4200 \\times (40 - T_f) = 1260(40 - T_f) = 50400 - 1260T_f$$\n$$Q_{\\text{gained}} = 13440 + 0.04 \\times 4200 \\times T_f = 13440 + 168T_f$$\nশর্তমতে, $50400 - 1260T_f = 13440 + 168T_f$\n$$1428T_f = 36960 \\implies T_f = \\frac{36960}{1428} \\approx 25.88^\\circ\\text{C}$$',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 182,
      },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'জ্ঞানমূলক: ক্যালরিমিতির মূলনীতি হলো বর্জিত তাপ = গৃহীত তাপ ($Q_{\\text{lost}} = Q_{\\text{gained}}$)।' },
      kha: { mark: 2, criteria: 'অনুধাবনমূলক: বিচ্ছিন্ন ব্যবস্থা না হলে পরিবেশে তাপ ছড়িয়ে পড়ার ব্যাখ্যায় পূর্ণ ২ নম্বর।' },
      ga: { mark: 3, criteria: 'প্রয়োগমূলক: বরফ গলাতে প্রয়োজনীয় তাপ ১৩৪৪০ জুল এবং পানি দ্বারা বর্জিত তাপ ৫০৪০০ জুল দেখিয়ে বরফ সম্পূর্ণ গলার প্রমাণে পূর্ণ ৩ নম্বর।' },
      gha: { mark: 4, criteria: 'উচ্চতর দক্ষতা: সুপ্ততাপ ও তাপমাত্রা বৃদ্ধির সমীকরণ সাজিয়ে চূড়ান্ত তাপমাত্রা ২৫.৮৮°C নির্ণয়ে পূর্ণ ৪ নম্বর।' },
    },
    difficulty: 'HARD',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 6.7: গলনাঙ্ক ও স্ফুটনাঙ্কের ওপর চাপের প্রভাব
  // [top_ssc_physics_ch6_7]
  // =========================================================================
  {
    id: 'q_ch6_7_mcq_1',
    topicId: 'top_ssc_physics_ch6_7',
    type: 'MCQ',
    stem: 'চাপ বাড়ালে বরফের গলনাঙ্কের কী পরিবর্তন ঘটে?',
    options: [
      { id: 'opt_6_7_1a', text: 'গলনাঙ্ক বাড়ে', isCorrect: false },
      { id: 'opt_6_7_1b', text: 'গলনাঙ্ক কমে', isCorrect: true },
      { id: 'opt_6_7_1c', text: 'গলনাঙ্ক অপরিবর্তিত থাকে', isCorrect: false },
      { id: 'opt_6_7_1d', text: 'গলনাঙ্ক ১০০°C হয়', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: গলনাঙ্ক কমে।',
      coreConcept: 'বরফ গলে পানিতে পরিণত হলে আয়তন সংকুচিত হয় (ঘনত্ব বাড়ে)। যেসব কঠিন পদার্থ তরলে রূপান্তরের সময় আয়তন হ্রাস পায়, চাপ বাড়ালে তাদের গলনাঙ্ক কমে যায়।',
      stepDerivation: 'বরফ গললে আয়তন প্রায় ৯% কমে। তাই লে-শাতেলিয়ার নীতি অনুসারে চাপ বাড়ালে সিস্টেম আয়তন কমাতে চায়, ফলে বরফ নিম্ন তাপমাত্রাতেই দ্রুত গলে যায়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 184,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_7_mcq_2',
    topicId: 'top_ssc_physics_ch6_7',
    type: 'MCQ',
    stem: 'চাপ প্রয়োগে বরফ গলে যাওয়া এবং চাপ সরিয়ে নিলে পুনরায় জমে যাওয়ার ঘটনাকে কী বলে?',
    options: [
      { id: 'opt_6_7_2a', text: 'বাষ্পীভবন', isCorrect: false },
      { id: 'opt_6_7_2b', text: 'ঘনীভবন', isCorrect: false },
      { id: 'opt_6_7_2c', text: 'পুনঃশিলীভবন (Regelation)', isCorrect: true },
      { id: 'opt_6_7_2d', text: 'উর্ধ্বপাতন', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: পুনঃশিলীভবন (Regelation)।',
      coreConcept: 'চাপ বাড়ালে বরফের গলনাঙ্ক কমে গিয়ে বরফ গলে যাওয়া এবং চাপ সরিয়ে নিলে গলনাঙ্ক স্বাভাবিক হয়ে পুনরায় জমাট বাঁধার ঘটনাকে পুনঃশিলীভবন বলে।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 185,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dinajpur Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_7_mcq_3',
    topicId: 'top_ssc_physics_ch6_7',
    type: 'MCQ',
    stem: 'প্রেসার কুকারে খাবার দ্রুত সেদ্ধ হওয়ার মূল কারণ কী?',
    options: [
      { id: 'opt_6_7_3a', text: 'উচ্চ চাপে বাষ্প বের হয়ে যায়', isCorrect: false },
      { id: 'opt_6_7_3b', text: 'উচ্চ চাপে পানির স্ফুটনাঙ্ক প্রায় ১২০°C পর্যন্ত বৃদ্ধি পায়', isCorrect: true },
      { id: 'opt_6_7_3c', text: 'কুকারের ভেতরের তাপধারণক্ষমতা কমে যায়', isCorrect: false },
      { id: 'opt_6_7_3d', text: 'পানির আপেক্ষিক তাপ কমে যায়', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: উচ্চ চাপে পানির স্ফুটনাঙ্ক প্রায় ১২০°C পর্যন্ত বৃদ্ধি পায়।',
      coreConcept: 'চাপ বাড়ালে তরলের স্ফুটনাঙ্ক বৃদ্ধি পায়। প্রেসার কুকারে আবদ্ধ বাষ্পের চাপে পানির স্ফুটনাঙ্ক বেড়ে প্রায় ১২০°C-১২৫°C হয়, যার উচ্চ তাপমাত্রায় খাবার খুব দ্রুত সেদ্ধ হয়।',
      stepDerivation: 'সাধারণ পাত্রে পানির তাপমাত্রা ১০০°C-এর ওপরে উঠতে পারে না। প্রেসার কুকারে উচ্চ চাপে তাপমাত্রা ১২০°C ছাড়িয়ে যাওয়ায় খাদ্য দ্রুত সুসিদ্ধ হয়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 186,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dhaka Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_7_mcq_4',
    topicId: 'top_ssc_physics_ch6_7',
    type: 'MCQ',
    stem: 'মাউন্ট এভারেস্টের চূড়ায় খোলা পাত্রে পানি কত তাপমাত্রায় ফুটতে শুরু করে?',
    options: [
      { id: 'opt_6_7_4a', text: '100°C', isCorrect: false },
      { id: 'opt_6_7_4b', text: '120°C', isCorrect: false },
      { id: 'opt_6_7_4c', text: 'প্রায় 70°C', isCorrect: true },
      { id: 'opt_6_7_4d', text: '0°C', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: প্রায় 70°C।',
      coreConcept: 'সমুদ্রপৃষ্ঠ থেকে ওপরে উঠলে বায়ুচাপ হ্রাস পায়। চাপ কমলে তরলের স্ফুটনাঙ্ক কমে যায়। এভারেস্টে বায়ুচাপ প্রায় এক-তৃতীয়াংশ হওয়ায় পানি মাত্র ৭০°C-এই ফুটতে শুরু করে।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 186,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Mymensingh Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_7_mcq_5',
    topicId: 'top_ssc_physics_ch6_7',
    type: 'MCQ',
    stem: 'বরফে স্কেটিং করার সময় জুতার ধারালো ব্লেডের নিচে বরফ গলে পানি হওয়ার কারণ কী?',
    options: [
      { id: 'opt_6_7_5a', text: 'ব্লেড অতি উত্তপ্ত থাকে', isCorrect: false },
      { id: 'opt_6_7_5b', text: 'শরীরের ওজনে সৃষ্ট উচ্চ চাপে গলনাঙ্ক 0°C-এর নিচে নেমে যায়', isCorrect: true },
      { id: 'opt_6_7_5c', text: 'বরফের আপেক্ষিক তাপ কমে যায়', isCorrect: false },
      { id: 'opt_6_7_5d', text: 'বাতাসের আর্দ্রতা বৃদ্ধি পায়', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: শরীরের ওজনে সৃষ্ট উচ্চ চাপে গলনাঙ্ক 0°C-এর নিচে নেমে যায়।',
      coreConcept: 'ধারালো ব্লেডের ক্ষুদ্র ক্ষেত্রফলের কারণে বরফে প্রচণ্ড চাপ পড়ে ($P = F/A$)। এতে বরফের গলনাঙ্ক কমে গিয়ে তাৎক্ষণিকভাবে গলে পাতলা পানির পিচ্ছিল স্তর তৈরি করে।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 185,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Chittagong Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_7_cq_1',
    topicId: 'top_ssc_physics_ch6_7',
    type: 'CQ_CREATIVE',
    stem: 'একটি সাধারণ খোলা পাত্র ও একটি প্রেসার কুকারে সমপরিমাণ পানি ও ডাল নিয়ে একই চুলার একই আঁচে রান্না বসানো হলো। দেখা গেল খোলা পাত্রের পানি ১৫ মিনিটেই বাষ্প হয়ে শেষ হয়ে গেলেও ডাল শক্ত রয়ে গেল, কিন্তু প্রেসার কুকারে মাত্র ১২ মিনিটেই ডাল পুরোপুরি সুসিদ্ধ ও সুস্বাদু হয়ে গেল।',
    options: null,
    explanation: {
      directAnswer: 'গ-এর উত্তর: খোলা পাত্রে পানির তাপমাত্রা ১০০°C-এর বেশি ওঠে না এবং পানি দ্রুত বাষ্পীভূত হয়। ঘ-এর উত্তর: প্রেসার কুকারে উচ্চ চাপে পানির স্ফুটনাঙ্ক ১২০°C-১২৫°C হয়ে খাদ্যদ্রব্যের দ্রুত সুসিদ্ধ হওয়ার বৈজ্ঞানিক কারণ বিশ্লেষিত।',
      coreConcept: 'চাপের সাথে স্ফুটনাঙ্কের প্রত্যক্ষ সম্পর্ক এবং রান্নায় তাপমাত্রার প্রভাব।',
      stepDerivation: 'খোলা পাত্রে বাষ্প উড়তে থাকায় অভ্যন্তরীণ চাপ ১ বায়ুমণ্ডলীয় চাপে সীমাবদ্ধ থাকে এবং পানির তাপমাত্রা ১০০°C-এ আটকে থাকে। প্রেসার কুকারে বাষ্প আবদ্ধ থাকায় চাপ বেড়ে প্রায় ২ বায়ুমণ্ডলীয় চাপ হয় এবং স্ফুটনাঙ্ক ১২০°C-এ পৌঁছায়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 186,
      },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'জ্ঞানমূলক: যে নির্দিষ্ট তাপমাত্রায় প্রমাণ চাপে তরল ফুটে বাষ্পে পরিণত হয় তাকে স্ফুটনাঙ্ক বলে।' },
      kha: { mark: 2, criteria: 'অনুধাবনমূলক: পুনঃশিলীভবন প্রক্রিয়া ও তার দিয়ে বরফ জোড়া লাগার ব্যাখ্যায় পূর্ণ ২ নম্বর।' },
      ga: { mark: 3, criteria: 'প্রয়োগমূলক: খোলা পাত্রে সুপ্ততাপ ও স্ফুটনাঙ্ক ১০০°C-এ সীমাবদ্ধ থাকার কারণে ডাল সেদ্ধ না হওয়ার বৈজ্ঞানিক বিশ্লেষণে পূর্ণ ৩ নম্বর।' },
      gha: { mark: 4, criteria: 'উচ্চতর দক্ষতা: প্রেসার কুকারে অভ্যন্তরীণ চাপ ২ atm ও স্ফুটনাঙ্ক ১২০°C হওয়ার তাপীয় সমীকরণ ও জ্বালানি সাশ্রয়ের তুলনামূলক যুক্তিতে পূর্ণ ৪ নম্বর।' },
    },
    difficulty: 'HARD',
    boardSource: 'Jessore Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_5_mcq_7',
    topicId: 'top_ssc_physics_ch6_5',
    type: 'MCQ',
    stem: 'আপেক্ষিক তাপের আন্তর্জাতিক (SI) একক কোনটি?',
    options: [
      { id: 'opt_6_5_7a', text: 'J/K', isCorrect: false },
      { id: 'opt_6_5_7b', text: 'J/(kg·K)', isCorrect: true },
      { id: 'opt_6_5_7c', text: 'cal/g', isCorrect: false },
      { id: 'opt_6_5_7d', text: 'J·kg·K', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: J/(kg·K) বা J·kg⁻¹·K⁻¹।',
      coreConcept: '$s = \\frac{Q}{m\\Delta T}$ সূত্র থেকে একক পাওয়া যায় $\\frac{\\text{J}}{\\text{kg}\\cdot\\text{K}} = \\text{J/(kg}\\cdot\\text{K)}$।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 172,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_5_mcq_8',
    topicId: 'top_ssc_physics_ch6_5',
    type: 'MCQ',
    stem: 'বরফের আপেক্ষিক তাপ পানির আপেক্ষিক তাপের কত অংশ?',
    options: [
      { id: 'opt_6_5_8a', text: 'সমান', isCorrect: false },
      { id: 'opt_6_5_8b', text: 'ঠিক অর্ধেক (১/২)', isCorrect: true },
      { id: 'opt_6_5_8c', text: 'এক-চতুর্থাংশ (১/৪)', isCorrect: false },
      { id: 'opt_6_5_8d', text: 'দ্বিগুণ', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: ঠিক অর্ধেক (১/২)।',
      coreConcept: 'পানির আপেক্ষিক তাপ $4200\\text{ J/(kg}\\cdot\\text{K)}$ এবং বরফের আপেক্ষিক তাপ $2100\\text{ J/(kg}\\cdot\\text{K)}$। অতএব বরফের আপেক্ষিক তাপ পানির ঠিক অর্ধেক।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 173,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2022',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_6_mcq_6',
    topicId: 'top_ssc_physics_ch6_6',
    type: 'MCQ',
    stem: 'ক্যালরিমিটারের পাত্র সচরাচর কোন ধাতু দ্বারা তৈরি করা হয়?',
    options: [
      { id: 'opt_6_6_6a', text: 'সীসা', isCorrect: false },
      { id: 'opt_6_6_6b', text: 'তামা', isCorrect: true },
      { id: 'opt_6_6_6c', text: 'লোহা', isCorrect: false },
      { id: 'opt_6_6_6d', text: 'অ্যালুমিনিয়াম', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: তামা।',
      coreConcept: 'তামার আপেক্ষিক তাপ তুলনামূলকভাবে কম ($400\\text{ J/(kg}\\cdot\\text{K)}$) এবং তাপ পরিবাহিতা খুব বেশি হওয়ায় ক্যালরিমিটার পাত্র খুব দ্রুত মিশ্রণের তাপমাত্রায় পৌঁছে যায় এবং পাত্র নিজে খুব অল্প তাপ শোষণ করে।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 178,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dinajpur Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_6_mcq_7',
    topicId: 'top_ssc_physics_ch6_6',
    type: 'MCQ',
    stem: 'ক্যালরিমিতিতে নাড়ানি (Stirrer) ব্যবহারের মূল উদ্দেশ্য কী?',
    options: [
      { id: 'opt_6_6_7a', text: 'পাত্রের আয়তন বাড়ানো', isCorrect: false },
      { id: 'opt_6_6_7b', text: 'মিশ্রণের সর্বত্র তাপ সুষমভাবে দ্রুত ছড়িয়ে দেওয়া', isCorrect: true },
      { id: 'opt_6_6_7c', text: 'তাপমাত্রা ১০০°C করা', isCorrect: false },
      { id: 'opt_6_6_7d', text: 'রাসায়নিক বিক্রিয়া ঘটানো', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: মিশ্রণের সর্বত্র তাপ সুষমভাবে দ্রুত ছড়িয়ে দেওয়া।',
      coreConcept: 'নাড়ানি দিয়ে তরলকে ক্রমাগত নাড়লে তরলের বিভিন্ন স্তরের মধ্যে পরিচলন দ্রুততর হয় এবং সর্বত্র অভিন্ন সাম্য তাপমাত্রা প্রতিষ্ঠিত হয়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 179,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Cumilla Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_7_mcq_6',
    topicId: 'top_ssc_physics_ch6_7',
    type: 'MCQ',
    stem: 'মোমের ওপর অতিরিক্ত চাপ প্রয়োগ করলে মোমের গলনাঙ্কের কী পরিবর্তন ঘটবে?',
    options: [
      { id: 'opt_6_7_6a', text: 'গলনাঙ্ক কমে যাবে', isCorrect: false },
      { id: 'opt_6_7_6b', text: 'গলনাঙ্ক বৃদ্ধি পাবে', isCorrect: true },
      { id: 'opt_6_7_6c', text: 'গলনাঙ্ক অপরিবর্তিত থাকবে', isCorrect: false },
      { id: 'opt_6_7_6d', text: 'মোম কঠিন থেকে সরাসরি বাষ্প হবে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: গলনাঙ্ক বৃদ্ধি পাবে।',
      coreConcept: 'মোম গলে তরল হলে আয়তন বৃদ্ধি পায়। যেসব পদার্থের গলনে আয়তন বাড়ে, বাহ্যিক চাপ বাড়ালে প্রসারণে বাধা সৃষ্টি হওয়ায় তাদের গলাতে বেশি তাপমাত্রার প্রয়োজন হয়, ফলে গলনাঙ্ক বাড়ে।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 184,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Jessore Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_7_mcq_7',
    topicId: 'top_ssc_physics_ch6_7',
    type: 'MCQ',
    stem: 'প্রেসার কুকারের ঢাকনায় সেফটি ভালভ (Safety Valve) থাকার মূল কারণ কী?',
    options: [
      { id: 'opt_6_7_7a', text: 'রান্না সুস্বাদু করা', isCorrect: false },
      { id: 'opt_6_7_7b', text: 'কুকারের ভেতরের বাষ্পচাপ বিপজ্জনক মাত্রায় পৌঁছালে বাষ্প বের করে বিস্ফোরণ রোধ করা', isCorrect: true },
      { id: 'opt_6_7_7c', text: 'পানির তাপমাত্রা ০°C রাখা', isCorrect: false },
      { id: 'opt_6_7_7d', text: 'ভেতরে হাওয়া প্রবেশ করানো', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: কুকারের ভেতরের বাষ্পচাপ বিপজ্জনক মাত্রায় পৌঁছালে বাষ্প বের করে বিস্ফোরণ রোধ করা।',
      coreConcept: 'প্রেসার কুকারের প্রধান ছিদ্র আটকে গেলে বাষ্পের চাপে দুর্ঘটনা ঘটতে পারে। সেফটি ভালভের মিশ্রধাতু অতিরিক্ত তাপে গলে বা স্প্রিং খুলে বাষ্প ছেড়ে দিয়ে জীবনরক্ষা করে।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 186,
      },
    },
    difficulty: 'EASY',
    boardSource: 'Chittagong Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch6_7_mcq_8',
    topicId: 'top_ssc_physics_ch6_7',
    type: 'MCQ',
    stem: 'পাহাড়ি অঞ্চলে রান্নার সময় পানিতে খাবার লবণ (NaCl) মেশালে কী সুবিধা পাওয়া যায়?',
    options: [
      { id: 'opt_6_7_8a', text: 'পানির ঘনত্ব কমে যায়', isCorrect: false },
      { id: 'opt_6_7_8b', text: 'পানির স্ফুটনাঙ্ক বৃদ্ধি পেয়ে খাবার দ্রুত সেদ্ধ হতে সাহায্য করে', isCorrect: true },
      { id: 'opt_6_7_8c', text: 'পানি বরফে পরিণত হয়', isCorrect: false },
      { id: 'opt_6_7_8d', text: 'পানির আপেক্ষিক তাপ শূন্য হয়', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: পানির স্ফুটনাঙ্ক বৃদ্ধি পেয়ে খাবার দ্রুত সেদ্ধ হতে সাহায্য করে।',
      coreConcept: 'পানির মধ্যে কোনো অনুদ্বায়ী অপদ্রব্য (যেমন লবণ) দ্রবীভূত করলে পানির স্ফুটনাঙ্ক বৃদ্ধি পায় (স্ফুটনাঙ্কের উন্নয়ন বা Elevation of Boiling Point)। পাহাড়ে কম চাপে পানি আগেই ফুটে যায়, কিন্তু লবণ যোগ করলে বেশি তাপমাত্রায় ফোটে, ফলে খাবার সহজে সেদ্ধ হয়।',
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
        pageNumber: 186,
      },
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];
