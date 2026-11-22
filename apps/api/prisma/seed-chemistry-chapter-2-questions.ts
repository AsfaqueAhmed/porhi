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
    stepDerivation: string;
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
  };
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  boardSource?: string | null;
  isVerified: boolean;
  status: ContentStatus;
  version: number;
}

const BOOK = 'রসায়ন (নবম-দশম শ্রেণি, NCTB 2026)';

export const chemistryChapter2QuestionsBatch1: QuestionData[] = [
  // =========================================================================
  // Topic 2.1: পদার্থের অবস্থা [top_ssc_chemistry_ch2_1] (9 MCQs + 3 CQs)
  // =========================================================================
  {
    id: 'q_chem_2_01',
    topicId: 'top_ssc_chemistry_ch2_1',
    type: 'MCQ',
    stem: 'কোন ভৌত অবস্থায় পদার্থের নির্দিষ্ট আয়তন থাকে কিন্তু নির্দিষ্ট আকার থাকে না?',
    options: [
      { id: 'opt_chem_2_01_a', text: 'কঠিন', isCorrect: false },
      { id: 'opt_chem_2_01_b', text: 'তরল', isCorrect: true },
      { id: 'opt_chem_2_01_c', text: 'গ্যাসীয়', isCorrect: false },
      { id: 'opt_chem_2_01_d', text: 'প্লাজমা', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: তরল।',
      coreConcept: 'তরল পদার্থের কণাগুলোর মধ্যে আকর্ষণ বল মাঝারি মানের থাকে, ফলে এরা নির্দিষ্ট আয়তন বজায় রাখে কিন্তু পাত্রের আকার ধারণ করে।',
      stepDerivation: '১. কঠিনের নির্দিষ্ট আকার ও আয়তন উভয়ই আছে।\n২. তরলের নির্দিষ্ট আয়তন আছে কিন্তু আকার নেই (যে পাত্রে রাখা হয় তার আকার নেয়)।\n৩. গ্যাসের আকার বা আয়তন কোনোটিই নির্দিষ্ট নয়। সুতরাং সঠিক উত্তর তরল অবস্থা।',
      distractorAnalysis: {
        opt_chem_2_01_a: 'কঠিন পদার্থের নির্দিষ্ট আকার ও আয়তন উভয়ই বিদ্যমান।',
        opt_chem_2_01_c: 'গ্যাসীয় পদার্থের নির্দিষ্ট আকার ও নির্দিষ্ট আয়তন কোনোটিই নেই।',
        opt_chem_2_01_d: 'প্লাজমা হলো আয়নিত গ্যাসীয় অবস্থা, যার নির্দিষ্ট আকার বা আয়তন নেই।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.১', pageNumber: 19 },
      proTipShortcut: 'তরল = আকার পাত্রের মতো, আয়তন সুনির্দিষ্ট।',
    },
    difficulty: 'EASY',
    boardSource: 'ঢাকা বোর্ড ২০২৪',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_02',
    topicId: 'top_ssc_chemistry_ch2_1',
    type: 'MCQ',
    stem: 'পদার্থের কোন অবস্থায় আন্তঃআণবিক আকর্ষণ বল সর্বোচ্চ এবং আন্তঃআণবিক দূরত্ব সর্বনিম্ন?',
    options: [
      { id: 'opt_chem_2_02_a', text: 'কঠিন', isCorrect: true },
      { id: 'opt_chem_2_02_b', text: 'তরল', isCorrect: false },
      { id: 'opt_chem_2_02_c', text: 'গ্যাসীয়', isCorrect: false },
      { id: 'opt_chem_2_02_d', text: 'বাষ্প', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: কঠিন।',
      coreConcept: 'কঠিন অবস্থায় কণাগুলো খুব কাছাকাছি ঠাসাঠাসি অবস্থায় থাকে, তাই আকর্ষণ বল সর্বাধিক ও পারস্পরিক দূরত্ব সর্বনিম্ন হয়।',
      stepDerivation: 'আন্তঃআণবিক বল আন্তঃআণবিক দূরত্বের ব্যস্তানুপাতিক। কঠিন অবস্থায় কণাগুলো পরস্পরের সবচেয়ে নিকটে থাকায় আন্তঃআণবিক দূরত্ব সর্বনিম্ন এবং আকর্ষণ বল সর্বোচ্চ হয়।',
      distractorAnalysis: {
        opt_chem_2_02_b: 'তরল অবস্থায় আন্তঃআণবিক বল কঠিন অপেক্ষা কম এবং দূরত্ব বেশি।',
        opt_chem_2_02_c: 'গ্যাসীয় অবস্থায় আন্তঃআণবিক দূরত্ব সর্বাধিক এবং আকর্ষণ বল প্রায় শূন্য।',
        opt_chem_2_02_d: 'বাষ্প হলো গ্যাসীয় অবস্থা, যার আকর্ষণ বল অতি দুর্বল।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.১', pageNumber: 19 },
    },
    difficulty: 'EASY',
    boardSource: 'রাজশাহী বোর্ড ২০২৩',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_03',
    topicId: 'top_ssc_chemistry_ch2_1',
    type: 'MCQ',
    stem: 'বাহ্যিক চাপ প্রয়োগ করলে পদার্থের কোন অবস্থার আয়তন সবচেয়ে বেশি সংকুচিত হয়?',
    options: [
      { id: 'opt_chem_2_03_a', text: 'কঠিন', isCorrect: false },
      { id: 'opt_chem_2_03_b', text: 'তরল', isCorrect: false },
      { id: 'opt_chem_2_03_c', text: 'গ্যাসীয়', isCorrect: true },
      { id: 'opt_chem_2_03_d', text: 'কঠিন ও তরল উভয়ই', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: গ্যাসীয়।',
      coreConcept: 'গ্যাসীয় পদার্থের কণাগুলোর মধ্যে প্রচুর ফাঁকা স্থান (আন্তঃআণবিক দূরত্ব) থাকে, ফলে চাপ দিলে কণাগুলো সহজে কাছে চলে আসে।',
      stepDerivation: 'গ্যাসীয় কণাগুলোর মধ্যবর্তী ফাঁকা স্থান কঠিন ও তরলের তুলনায় হাজার গুণ বেশি হওয়ায় গ্যাসীয় পদার্থের সংকোচনশীলতা (Compressibility) সর্বাধিক।',
      distractorAnalysis: {
        opt_chem_2_03_a: 'কঠিন পদার্থ অনমনীয় ও প্রায় অসংকোচনশীল।',
        opt_chem_2_03_b: 'তরল পদার্থকে উচ্চ চাপে সামান্যও সংকুচিত করা কঠিন (প্রায় অসংকোচনশীল)।',
        opt_chem_2_03_d: 'কঠিন ও তরলের আন্তঃআণবিক ফাঁকা স্থান খুবই কম হওয়ায় চাপ দিলে আয়তন উল্লেখযোগ্যভাবে কমে না।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.১', pageNumber: 19 },
    },
    difficulty: 'EASY',
    boardSource: 'যশোর বোর্ড ২০২২',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_04',
    topicId: 'top_ssc_chemistry_ch2_1',
    type: 'MCQ',
    stem: 'আন্তঃআণবিক বল ও আন্তঃআণবিক দূরত্বের মধ্যে সম্পর্কটি কী?',
    options: [
      { id: 'opt_chem_2_04_a', text: 'সমানুপাতিক', isCorrect: false },
      { id: 'opt_chem_2_04_b', text: 'ব্যস্তানুপাতিক', isCorrect: true },
      { id: 'opt_chem_2_04_c', text: 'বর্গের সমানুপাতিক', isCorrect: false },
      { id: 'opt_chem_2_04_d', text: 'সম্পর্কহীন', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: ব্যস্তানুপাতিক।',
      coreConcept: 'কণাগুলো যত দূরে সরে যায় (দূরত্ব বাড়ে), তাদের মধ্যকার পারস্পরিক আকর্ষণ বল তত দ্রুত হ্রাস পায়।',
      stepDerivation: 'আন্তঃআণবিক আকর্ষণ বল কণাগুলোর মধ্যবর্তী দূরত্বের ব্যস্তানুপাতিক ($F \propto 1/d^n$); দূরত্ব বাড়লে আকর্ষণ বল কমে এবং দূরত্ব কমলে আকর্ষণ বল বাড়ে।',
      distractorAnalysis: {
        opt_chem_2_04_a: 'সমানুপাতিক হলে দূরত্ব বাড়লে আকর্ষণও বাড়ত, যা বাস্তবসম্মত নয়।',
        opt_chem_2_04_c: 'বর্গের সমানুপাতিক নয়, দূরত্বের সাথে বল হ্রাস পায়।',
        opt_chem_2_04_d: 'দূরত্ব ও আকর্ষণ বল গভীরভাবে পরস্পর সম্পর্কযুক্ত।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.১', pageNumber: 19 },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_05',
    topicId: 'top_ssc_chemistry_ch2_1',
    type: 'MCQ',
    stem: 'একটি বদ্ধ পাত্রে রাখা নির্দিষ্ট পরিমাণ গ্যাস সম্পূর্ণ পাত্রের আয়তন দখল করে কেন?',
    options: [
      { id: 'opt_chem_2_05_a', text: 'কণাগুলোর ভর অতি নগণ্য বলে', isCorrect: false },
      { id: 'opt_chem_2_05_b', text: 'কণাগুলোর মধ্যে কোনো আন্তঃআণবিক আকর্ষণ বল প্রায় থাকে না বলে', isCorrect: true },
      { id: 'opt_chem_2_05_c', text: 'কণাগুলোর আকার খুব বড় বলে', isCorrect: false },
      { id: 'opt_chem_2_05_d', text: 'কণাগুলো স্থির অবস্থায় অবস্থান করে বলে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: কণাগুলোর মধ্যে কোনো আন্তঃআণবিক আকর্ষণ বল প্রায় থাকে না বলে।',
      coreConcept: 'গ্যাসীয় কণাগুলোর পারস্পরিক আকর্ষণ বল প্রায় শূন্য থাকায় এবং উচ্চ গতিশক্তি থাকায় তারা মুক্তভাবে ছড়িয়ে পুরো পাত্রের আয়তন দখল করে।',
      stepDerivation: 'গ্যাসের অণুগুলোর গতিশক্তি তাদের অতি নগণ্য আকর্ষণ বলের চেয়ে অনেক বেশি শক্তিশালী। ফলে অণুগুলো একে অপরের দ্বারা আবদ্ধ না থেকে পাত্রের সর্বত্র ছড়িয়ে পড়ে।',
      distractorAnalysis: {
        opt_chem_2_05_a: 'ভর নগণ্য হওয়া পাত্রের আয়তন দখলের সরাসরি কারণ নয়।',
        opt_chem_2_05_c: 'গ্যাসীয় কণার আকার অণুবীক্ষণিক অতি ক্ষুদ্র।',
        opt_chem_2_05_d: 'গ্যাসের কণা কখনোই স্থির থাকে না, অত্যন্ত দ্রুত গতিতে ছুটে চলে।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.১', pageNumber: 19 },
    },
    difficulty: 'MEDIUM',
    boardSource: 'কুমিল্লা বোর্ড ২০২৩',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_06',
    topicId: 'top_ssc_chemistry_ch2_1',
    type: 'MCQ',
    stem: 'কোন পদার্থটির ক্ষেত্রে কণাগুলোর অবস্থান পরিবর্তন করার ক্ষমতা নেই, কেবল নিজ স্থানে কাঁপতে পারে?',
    options: [
      { id: 'opt_chem_2_06_a', text: 'অক্সিজেন', isCorrect: false },
      { id: 'opt_chem_2_06_b', text: 'পানি', isCorrect: false },
      { id: 'opt_chem_2_06_c', text: 'সোডিয়াম ক্লোরাইড', isCorrect: true },
      { id: 'opt_chem_2_06_d', text: 'নাইট্রোজেন', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: সোডিয়াম ক্লোরাইড।',
      coreConcept: 'সোডিয়াম ক্লোরাইড ($NaCl$) একটি কঠিন কেলাসাকার পদার্থ; কঠিনের কণাগুলো নিজ অবস্থানে কেবল কম্পন করতে পারে।',
      stepDerivation: 'কঠিন পদার্থের কণাগুলো সুদৃঢ় আকর্ষণ বল দ্বারা আবদ্ধ থাকায় স্থান পরিবর্তন করতে পারে না। $NaCl$ কঠিন, কিন্তু $O_2$ ও $N_2$ গ্যাস এবং পানি তরল।',
      distractorAnalysis: {
        opt_chem_2_06_a: 'অক্সিজেন গ্যাসীয়, এর কণাগুলো দ্রুত স্থান পরিবর্তন করে।',
        opt_chem_2_06_b: 'পানি তরল, এর কণাগুলো একটি অপরের উপর দিয়ে প্রবাহিত হতে পারে।',
        opt_chem_2_06_d: 'নাইট্রোজেন গ্যাসীয়, কণাগুলো মুক্ত গতিশীল।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.১', pageNumber: 19 },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_07',
    topicId: 'top_ssc_chemistry_ch2_1',
    type: 'MCQ',
    stem: 'পানিকে বরফে পরিণত করলে কণাগুলোর সজ্জা ও দূরত্বের কী পরিবর্তন ঘটে?',
    options: [
      { id: 'opt_chem_2_07_a', text: 'কণাগুলো এলোমেলো হয়ে যায় ও দূরত্ব কমে', isCorrect: false },
      { id: 'opt_chem_2_07_b', text: 'কণাগুলো সুনির্দিষ্ট কেলাস কাঠামো গঠন করে এবং দৃঢ়ভাবে আবদ্ধ হয়', isCorrect: true },
      { id: 'opt_chem_2_07_c', text: 'কণাগুলোর গতিশক্তি বেড়ে যায়', isCorrect: false },
      { id: 'opt_chem_2_07_d', text: 'আন্তঃআণবিক আকর্ষণ বল সম্পূর্ণ বিনষ্ট হয়', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: কণাগুলো সুনির্দিষ্ট কেলাস কাঠামো গঠন করে এবং দৃঢ়ভাবে আবদ্ধ হয়।',
      coreConcept: 'তরল পানি জমে বরফ হলে কণাগুলোর গতিশক্তি হ্রাস পায় এবং তারা হাইড্রোজেন বন্ধনের মাধ্যমে সুনির্দিষ্ট হেক্সাগোনাল কেলাস তৈরি করে।',
      stepDerivation: 'শীতলীকরণের ফলে তাপশক্তি নির্গত হয়ে কণার বেগ কমে যায় এবং আন্তঃআণবিক বলের প্রভাবে কণাগুলো নিয়মিত জ্যামিতিক কেলাসে সজ্জিত হয়।',
      distractorAnalysis: {
        opt_chem_2_07_a: 'কঠিন বরফে কণাগুলো সুশৃঙ্খল থাকে, এলোমেলো নয়।',
        opt_chem_2_07_c: 'তাপমাত্রা কমার ফলে গতিশক্তি হ্রাস পায়, বাড়ে না।',
        opt_chem_2_07_d: 'আকর্ষণ বল বিনষ্ট হয় না, বরং অত্যন্ত সুদৃঢ় হয়।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.১', pageNumber: 19 },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_08',
    topicId: 'top_ssc_chemistry_ch2_1',
    type: 'MCQ',
    stem: 'কঠিন, তরল ও গ্যাসীয় পদার্থের প্রসারণশীলতার সঠিক ঊর্ধ্বক্রম কোনটি?',
    options: [
      { id: 'opt_chem_2_08_a', text: 'কঠিন < তরল < গ্যাসীয়', isCorrect: true },
      { id: 'opt_chem_2_08_b', text: 'গ্যাসীয় < তরল < কঠিন', isCorrect: false },
      { id: 'opt_chem_2_08_c', text: 'তরল < কঠিন < গ্যাসীয়', isCorrect: false },
      { id: 'opt_chem_2_08_d', text: 'কঠিন < গ্যাসীয় < তরল', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: কঠিন < তরল < গ্যাসীয়।',
      coreConcept: 'তাপ প্রয়োগে কণাগুলোর প্রসারণ সবচেয়ে কম ঘটে কঠিনে এবং সবচেয়ে বেশি ঘটে গ্যাসে।',
      stepDerivation: 'কঠিনের আকর্ষণ বল সর্বোচ্চ হওয়ায় প্রসারণ সর্বনিম্ন। তরলে মাঝারি এবং গ্যাসে কণাগুলো বাঁধনমুক্ত হওয়ায় সমপরিমাণ তাপ প্রয়োগে গ্যাসের প্রসারণ সর্বাধিক হয়।',
      distractorAnalysis: {
        opt_chem_2_08_b: 'এটি নিম্নক্রম (Descending order), ঊর্ধ্বক্রম নয়।',
        opt_chem_2_08_c: 'কঠিনের প্রসারণ তরলের চেয়ে কম, বেশি নয়।',
        opt_chem_2_08_d: 'গ্যাসের প্রসারণ তরলের চেয়ে বেশি।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.১', pageNumber: 19 },
    },
    difficulty: 'HARD',
    boardSource: 'দিনাজপুর বোর্ড ২০২৪',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_09',
    topicId: 'top_ssc_chemistry_ch2_1',
    type: 'MCQ',
    stem: 'একটি ৫০ মিলি তরলকে ১০০ মিলি পাত্রে রাখলে এর আয়তন কত হবে?',
    options: [
      { id: 'opt_chem_2_09_a', text: '১০০ মিলি', isCorrect: false },
      { id: 'opt_chem_2_09_b', text: '৫০ মিলি', isCorrect: true },
      { id: 'opt_chem_2_09_c', text: '৭৫ মিলি', isCorrect: false },
      { id: 'opt_chem_2_09_d', text: '১৫০ মিলি', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: ৫০ মিলি।',
      coreConcept: 'তরল পদার্থের নির্দিষ্ট আয়তন থাকে; পাত্র বড় হলেও তরলের আয়তন বাড়ে না।',
      stepDerivation: 'তরল পদার্থের কণাগুলোর আন্তঃআণবিক আকর্ষণ বল কণাগুলোকে একত্রিত রাখে, ফলে বড় পাত্রে রাখলেও তার আয়তন অপরিবর্তিত (৫০ মিলি) থাকে।',
      distractorAnalysis: {
        opt_chem_2_09_a: 'গ্যাসীয় পদার্থ হলে পাত্রের সম্পূর্ণ আয়তন (১০০ মিলি) দখল করত, তরল নয়।',
        opt_chem_2_09_c: 'আয়তন ইচ্ছামতো বৃদ্ধি পায় না।',
        opt_chem_2_09_d: 'কোনো অতিরিক্ত তরল যোগ করা হয়নি।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.১', pageNumber: 19 },
      proTipShortcut: 'তরলের আয়তন নির্দিষ্ট, গ্যাস হলে পুরো পাত্র দখল করত।',
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------------------
  // Topic 2.1: Creative Questions (CQs) [3 Authentic CQs]
  // -------------------------------------------------------------------------
  {
    id: 'q_chem_2_10',
    topicId: 'top_ssc_chemistry_ch2_1',
    type: 'CQ_CREATIVE',
    stem: 'রসায়ন গবেষণাগারে শিক্ষক তিনটি সিলিন্ডারে একই পদার্থের তিনটি ভিন্ন ভৌত রূপ P, Q ও R রাখলেন। P রূপের সুনির্দিষ্ট জ্যামিতিক আকার ও আয়তন আছে এবং চাপ প্রয়োগে সংকুচিত হয় না। Q রূপের নির্দিষ্ট আয়তন থাকলেও নির্দিষ্ট আকার নেই। R রূপের নির্দিষ্ট আকার বা আয়তন কোনোটিই নেই এবং সামান্য চাপ প্রয়োগেই আয়তন ব্যাপক হ্রাস পায়।',
    options: null,
    explanation: {
      directAnswer: 'P কঠিন, Q তরল এবং R গ্যাসীয় অবস্থা নির্দেশ করে। কণার আন্তঃআণবিক আকর্ষণ বল ও দূরত্বের পার্থক্যের কারণেই এদের ধর্মের এমন ভিন্নতা পরিলক্ষিত হয়।',
      coreConcept: 'আন্তঃআণবিক আকর্ষণ বল ও দূরত্বের ভিত্তিতে পদার্থের তিন ভৌত অবস্থার স্বরূপ ও ধর্মের বিশ্লেষণ।',
      stepDerivation: 'ক: পদার্থের সংজ্ঞা। খ: তরলের অসংকোচনশীলতার কারণ। গ: উদ্দীপকের P ও Q এর আন্তঃআণবিক বল ও দূরত্বের তুলনামূলক আলোচনা। ঘ: R এর সংকোচনশীলতার গতিতাত্ত্বিক বিশ্লেষণ।',
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.১', pageNumber: 19 },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'পদার্থ কাকে বলে তার সঠিক সংজ্ঞা লেখা (যার নির্দিষ্ট ভর আছে এবং স্থান দখল করে তাকে পদার্থ বলে)।' },
      kha: { mark: 2, criteria: 'তরল পদার্থকে চাপ দিয়ে সংকুচিত করা যায় না কেন—আন্তঃআণবিক দূরত্বের স্বল্পতার আলোকে যৌক্তিকভাবে ব্যাখ্যা করা।' },
      ga: { mark: 3, criteria: 'উদ্দীপকের P (কঠিন) ও Q (তরল) নমুনার আকার, আয়তন, আন্তঃআণবিক আকর্ষণ বল ও দূরত্বের তুলনামূলক বৈশিষ্ট্য ছক বা প্যারায় উপস্থাপন করা।' },
      gha: { mark: 4, criteria: 'উদ্দীপকের R (গ্যাসীয়) নমুনাটির নির্দিষ্ট আয়তন না থাকা এবং অত্যধিক সংকোচনশীল হওয়ার কারণ কণার মুক্ত চলাচল ও বিশালাকার শূন্যস্থানের ভিত্তিতে গাণিতিক ও বৈজ্ঞানিক যুক্তিসহ বিশ্লেষণ করা।' },
    },
    difficulty: 'MEDIUM',
    boardSource: 'ঢাকা বোর্ড ২০২৩ মডেল সৃজনশীল',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_11',
    topicId: 'top_ssc_chemistry_ch2_1',
    type: 'CQ_CREATIVE',
    stem: 'একটি কাচের সিরিঞ্জের অগ্রভাগ বন্ধ করে তাতে সমআয়তনের তিনটি উপাদান নেওয়া হলো: সিরিঞ্জ-১ এ মার্বেলের গুঁড়া, সিরিঞ্জ-২ এ পানি এবং সিরিঞ্জ-৩ এ বাতাস। পিস্টনে সমপরিমাণ চাপ প্রয়োগ করে দেখা গেল কেবল সিরিঞ্জ-৩ এর পিস্টনটি উল্লেখযোগ্য দূরত্বে ভেতরে প্রবেশ করল, কিন্তু বাকি দুটিতে কোনো পরিবর্তন দেখা গেল না।',
    options: null,
    explanation: {
      directAnswer: 'সিরিঞ্জ-১ কঠিন, সিরিঞ্জ-২ তরল এবং সিরিঞ্জ-৩ গ্যাসীয় পদার্থ ধারণ করে। গ্যাসের কণাগুলোর মাঝে অত্যধিক আন্তঃআণবিক ফাঁকা স্থান থাকায় কেবল গ্যাসীয় অবস্থাই উল্লেখযোগ্য সংকোচনশীলতা প্রদর্শন করে।',
      coreConcept: 'চাপের প্রভাবে তিন অবস্থার আয়তন পরিবর্তন ও সংকোচনশীলতার পরীক্ষামূলক প্রমাণ।',
      stepDerivation: 'ক: আন্তঃআণবিক দূরত্ব কী। খ: নির্দিষ্ট আয়তন থাকা সত্ত্বেও তরলের আকার নির্দিষ্ট নয় কেন। গ: সিরিঞ্জ-১ ও সিরিঞ্জ-২ এর পিস্টন ভেতরে না ঢোকার কারণ ব্যাখ্যা। ঘ: সিরিঞ্জ-৩ এর ফলাফলের আলোকে গ্যাসীয় পদার্থের বৈশিষ্ট্য বিশ্লেষণ।',
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.১', pageNumber: 19 },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'আন্তঃআণবিক দূরত্ব কাকে বলে তা নির্ভুলভাবে লেখা (পদার্থের কণাগুলোর মধ্যবর্তী দূরত্বকে আন্তঃআণবিক দূরত্ব বলে)।' },
      kha: { mark: 2, criteria: 'তরল পদার্থের নির্দিষ্ট আকার না থাকার পেছনের দুর্বল আকর্ষণ বল ও কণার স্থান পরিবর্তনের সামর্থ্য ব্যাখ্যা করা।' },
      ga: { mark: 3, criteria: 'মার্বেল গুঁড়া (কঠিন) ও পানি (তরল)-র কণাগুলো অত্যন্ত কাছাকাছি ঠাসাঠাসি থাকায় চাপ দিয়ে সংকুচিত না হওয়ার কারণ ব্যাখ্যা করা।' },
      gha: { mark: 4, criteria: 'সিরিঞ্জ-৩ এ বাতাসের কণাগুলোর মধ্যবর্তী ফাঁকা স্থান, দুর্বলতম আকর্ষণ বল এবং উচ্চ সংকোচনশীলতার বিজ্ঞানসম্মত বিশ্লেষণ সম্পন্ন করা।' },
    },
    difficulty: 'MEDIUM',
    boardSource: 'চট্টগ্রাম বোর্ড ২০২৪',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_12',
    topicId: 'top_ssc_chemistry_ch2_1',
    type: 'CQ_CREATIVE',
    stem: 'একটি ধাতব সিলিন্ডারে উচ্চ চাপে ২০ লিটার অক্সিজেন গ্যাস ভরে রাখা হলো। ভাল্ব খুলে সম্পূর্ণ গ্যাসকে একটি বড় খালি কক্ষে ছেড়ে দিলে গ্যাসটি মুহূর্তেই পুরো কক্ষে ছড়িয়ে পড়ে কক্ষের সমআয়তন ধারণ করল। কক্ষের তাপমাত্রা ছিল ২৫°C।',
    options: null,
    explanation: {
      directAnswer: 'উচ্চ চাপে সিলিন্ডারে গ্যাসের কণাগুলো খুব কাছাকাছি ছিল। মুক্ত পরিবেশে ছেড়ে দেওয়ায় কণাগুলোর গতিশক্তির কারণে তারা বাধাহীনভাবে চারদিকে ছড়িয়ে পড়ে পুরো কক্ষের আয়তন দখল করে।',
      coreConcept: 'চাপের অপসারণে গ্যাসের সম্প্রসারণ ও পাত্রের পূর্ণ আয়তন দখলের ভৌত নীতি।',
      stepDerivation: 'ক: সংকোচনশীলতা কী। খ: তাপমাত্রা বাড়লে আন্তঃআণবিক দূরত্বের কী পরিবর্তন ঘটে। গ: সিলিন্ডারে গ্যাসটিকে সংকুচিত অবস্থায় রাখার প্রক্রিয়া ব্যাখ্যা। ঘ: কক্ষের পুরো আয়তন দখল করার পেছনের আন্তঃআণবিক বলের ভূমিকা বিশ্লেষণ।',
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.১', pageNumber: 19 },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'সংকোচনশীলতার সঠিক সংজ্ঞা প্রদান।' },
      kha: { mark: 2, criteria: 'তাপমাত্রা বৃদ্ধির ফলে কণার গতিশক্তি বেড়ে কীভাবে আন্তঃআণবিক দূরত্ব বৃদ্ধি পায় তা ব্যাখ্যা করা।' },
      ga: { mark: 3, criteria: '২০ লিটার সিলিন্ডারে উচ্চ চাপ প্রয়োগ করে গ্যাসের কণাগুলোকে কাছাকাছি এনে তরলীকরণ বা সংকুচিত করার কৌশল ব্যাখ্যা।' },
      gha: { mark: 4, criteria: 'গ্যাসীয় কণার আন্তঃআণবিক আকর্ষণ বল নগণ্য হওয়া এবং উচ্চ গতিশক্তির দরুন পুরো কক্ষের আয়তন দখলের বিজ্ঞানসম্মত মূল্যায়ন।' },
    },
    difficulty: 'HARD',
    boardSource: 'সিলেট বোর্ড ২০২২',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 2.2: কণার গতিতত্ত্ব [top_ssc_chemistry_ch2_2] (9 MCQs + 3 CQs)
  // =========================================================================
  {
    id: 'q_chem_2_13',
    topicId: 'top_ssc_chemistry_ch2_2',
    type: 'MCQ',
    stem: 'কণার গতিতত্ত্বের মূল ভিত্তি কোন দুটি ধর্মের ওপর প্রতিষ্ঠিত?',
    options: [
      { id: 'opt_chem_2_13_a', text: 'কণার ভর ও বিদ্যুৎ পরিবাহিতা', isCorrect: false },
      { id: 'opt_chem_2_13_b', text: 'আন্তঃকণা আকর্ষণ বল ও কণার গতিশক্তি', isCorrect: true },
      { id: 'opt_chem_2_13_c', text: 'কণার দ্রাব্যতা ও প্রতিসরাঙ্ক', isCorrect: false },
      { id: 'opt_chem_2_13_d', text: 'চৌম্বক ধর্ম ও আণবিক ভর', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: আন্তঃকণা আকর্ষণ বল ও কণার গতিশক্তি।',
      coreConcept: 'কণার গতিতত্ত্ব পদার্থের কণাগুলোর মধ্যকার পারস্পরিক আকর্ষণ বল এবং তাদের গতিশক্তির মিথস্ক্রিয়া দিয়ে সকল অবস্থা ব্যাখ্যা করে।',
      stepDerivation: 'কণার গতিতত্ত্বের মৌলিক স্বীকার্য অনুসারে কণাগুলোর গতিশক্তি তাদের দূরে নিতে চায় এবং আকর্ষণ বল তাদের কাছে ধরে রাখতে চায়। এই দুই ধর্মের ভারসাম্যই পদার্থের অবস্থা নির্ধারণ করে।',
      distractorAnalysis: {
        opt_chem_2_13_a: 'বিদ্যুৎ পরিবাহিতা গতিতত্ত্বের মৌলিক ভিত্তি নয়।',
        opt_chem_2_13_c: 'দ্রাব্যতা ও প্রতিসরাঙ্ক আলো ও দ্রবণের ধর্ম।',
        opt_chem_2_13_d: 'চৌম্বক ধর্ম গতিতত্ত্বের অংশ নয়।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.২', pageNumber: 20 },
      proTipShortcut: 'গতিতত্ত্ব = আকর্ষণ বল + গতিশক্তি।',
    },
    difficulty: 'EASY',
    boardSource: 'বরিশাল বোর্ড ২০২৪',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_14',
    topicId: 'top_ssc_chemistry_ch2_2',
    type: 'MCQ',
    stem: 'তাপমাত্রা বৃদ্ধি করলে পদার্থের কণাগুলোর গতিশক্তির কী পরিবর্তন ঘটে?',
    options: [
      { id: 'opt_chem_2_14_a', text: 'হ্রাস পায়', isCorrect: false },
      { id: 'opt_chem_2_14_b', text: 'অপরিবর্তিত থাকে', isCorrect: false },
      { id: 'opt_chem_2_14_c', text: 'বৃদ্ধি পায়', isCorrect: true },
      { id: 'opt_chem_2_14_d', text: 'প্রথমে কমে পরে বাড়ে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: বৃদ্ধি পায়।',
      coreConcept: 'তাপমাত্রা হলো কণাগুলোর গড় গতিশক্তির প্রত্যক্ষ পরিমাপ ($E_k \propto T$); তাপমাত্রা বাড়ালে গতিশক্তি বৃদ্ধি পায়।',
      stepDerivation: 'তাপ সরবরাহ করলে কণাগুলো সেই তাপশক্তি শোষণ করে গতিশক্তিতে রূপান্তরিত করে, ফলে তাদের কম্পন বা সরলরৈখিক বেগ বৃদ্ধি পায়।',
      distractorAnalysis: {
        opt_chem_2_14_a: 'তাপমাত্রা কমালে গতিশক্তি হ্রাস পায়, বাড়ালে নয়।',
        opt_chem_2_14_b: 'গতিশক্তি তাপমাত্রার ওপর সম্পূর্ণ নির্ভরশীল, স্থির থাকে না।',
        opt_chem_2_14_d: 'তাপমাত্রা বৃদ্ধির সাথে গতিশক্তি সরাসরি বৃদ্ধি পায়।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.২', pageNumber: 20 },
    },
    difficulty: 'EASY',
    boardSource: 'ঢাকা বোর্ড ২০২৩',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_15',
    topicId: 'top_ssc_chemistry_ch2_2',
    type: 'MCQ',
    stem: 'কঠিন পদার্থের কণাগুলো তাপ গ্রহণ করলে তাদের গতির প্রকৃতি কেমন হয়?',
    options: [
      { id: 'opt_chem_2_15_a', text: 'সম্পূর্ণ মুক্ত হয়ে পাত্র ছেড়ে চলে যায়', isCorrect: false },
      { id: 'opt_chem_2_15_b', text: 'নিজ অবস্থানে দাঁড়িয়ে কম্পনের মাত্রা বাড়িয়ে দেয়', isCorrect: true },
      { id: 'opt_chem_2_15_c', text: 'সম্পূর্ণ স্থির হয়ে যায়', isCorrect: false },
      { id: 'opt_chem_2_15_d', text: 'ঘূর্ণন গতি বন্ধ হয়ে যায়', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: নিজ অবস্থানে দাঁড়িয়ে কম্পনের মাত্রা বাড়িয়ে দেয়।',
      coreConcept: 'কঠিনে আন্তঃআণবিক আকর্ষণ বল প্রবল থাকায় কণাগুলো স্থান ত্যাগ করতে পারে না, কেবল তাদের নিজস্ব অবস্থানের দুই পাশে দ্রুত কাঁপতে থাকে।',
      stepDerivation: 'কঠিনে তাপ দিলে কণাগুলোর কম্পন শক্তি বৃদ্ধি পায়। গলনাঙ্কে না পৌঁছানো পর্যন্ত কণাগুলো নিজ অবস্থানেই কম্পিত হতে থাকে।',
      distractorAnalysis: {
        opt_chem_2_15_a: 'এটি গ্যাসীয় অবস্থার ক্ষেত্রে ঘটে।',
        opt_chem_2_15_c: 'তাপ দিলে গতি বাড়ে, স্থির হয় না।',
        opt_chem_2_15_d: 'কঠিনে মূলত কম্পন গতি দেখা যায়, যা তাপ দিলে বাড়ে।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.২', pageNumber: 20 },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_16',
    topicId: 'top_ssc_chemistry_ch2_2',
    type: 'MCQ',
    stem: 'কোন অবস্থায় কণাগুলোর গতিশক্তি তাদের আন্তঃআণবিক আকর্ষণ বলকে সম্পূর্ণরূপে অতিক্রম করে ফেলে?',
    options: [
      { id: 'opt_chem_2_16_a', text: 'কঠিন', isCorrect: false },
      { id: 'opt_chem_2_16_b', text: 'তরল', isCorrect: false },
      { id: 'opt_chem_2_16_c', text: 'গ্যাসীয়', isCorrect: true },
      { id: 'opt_chem_2_16_d', text: 'গলন সাম্যাবস্থা', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: গ্যাসীয়।',
      coreConcept: 'গ্যাসীয় অবস্থায় কণাগুলোর গতিশক্তি আকর্ষণ বলের চেয়ে এত বেশি হয় যে কণাগুলো সম্পূর্ণরূপে পরস্পর থেকে বিচ্ছিন্ন হয়ে যায়।',
      stepDerivation: 'বাষ্পীভবনের সময় সরবরাহকৃত তাপ কণার আকর্ষণ বল সম্পূর্ণ ভেঙে দেয়, ফলে গতিশক্তি প্রাধান্য পেয়ে গ্যাসীয় অবস্থার সৃষ্টি করে।',
      distractorAnalysis: {
        opt_chem_2_16_a: 'কঠিনে আকর্ষণ বল গতিশক্তির চেয়ে অনেক বেশি শক্তিশালী।',
        opt_chem_2_16_b: 'তরলে আকর্ষণ বল ও গতিশক্তি প্রায় কাছাকাছি থাকে।',
        opt_chem_2_16_d: 'গলন সাম্যাবস্থায় আকর্ষণ বল আংশিক ভাঙতে থাকে।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.২', pageNumber: 21 },
    },
    difficulty: 'MEDIUM',
    boardSource: 'ময়মনসিংহ বোর্ড ২০২৪',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_17',
    topicId: 'top_ssc_chemistry_ch2_2',
    type: 'MCQ',
    stem: 'গ্যাসীয় পদার্থ পাত্রের দেয়ালে চাপ সৃষ্টি করে কেন?',
    options: [
      { id: 'opt_chem_2_17_a', text: 'কণাগুলোর ওজন পাত্রের তলায় ভর করে বলে', isCorrect: false },
      { id: 'opt_chem_2_17_b', text: 'কণাগুলো অবিরাম দ্রুত গতিতে পাত্রের দেয়ালে সংঘর্ষে লিপ্ত হয় বলে', isCorrect: true },
      { id: 'opt_chem_2_17_c', text: 'কণাগুলোর মধ্যে মহাকর্ষ বল কাজ করে বলে', isCorrect: false },
      { id: 'opt_chem_2_17_d', text: 'পাত্রের দেয়াল গ্যাসীয় কণাগুলোকে আকর্ষণ করে বলে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: কণাগুলো অবিরাম দ্রুত গতিতে পাত্রের দেয়ালে সংঘর্ষে লিপ্ত হয় বলে।',
      coreConcept: 'কণার গতিতত্ত্ব অনুসারে কণাগুলোর দেয়ালের সাথে স্থিতিস্থাপক সংঘর্ষের ফলে প্রতি একক ক্ষেত্রফলে যে বল প্রযুক্ত হয় তাই গ্যাসের চাপ।',
      stepDerivation: 'গ্যাসের অণুগুলো এলোমেলোভাবে তীব্র বেগে ছুটে চলে এবং পাত্রের দেয়ালের সাথে অবিরাম ধাক্কা খায়। এই সংঘর্ষের লব্ধি বলই হলো গ্যাসীয় চাপ ($P = F/A$)।',
      distractorAnalysis: {
        opt_chem_2_17_a: 'গ্যাসের চাপ কেবল তলায় নয়, পাত্রের চারপাশের দেয়ালে সমভাবে কাজ করে।',
        opt_chem_2_17_c: 'আণবিক স্তরে মহাকর্ষ বল অতি নগণ্য।',
        opt_chem_2_17_d: 'পাত্রের দেয়ালের আকর্ষণ বল গ্যাসের চাপের কারণ নয়।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.২', pageNumber: 21 },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_18',
    topicId: 'top_ssc_chemistry_ch2_2',
    type: 'MCQ',
    stem: 'পরম শূন্য তাপমাত্রা (Absolute Zero) কোনটি?',
    options: [
      { id: 'opt_chem_2_18_a', text: '০°C', isCorrect: false },
      { id: 'opt_chem_2_18_b', text: '-১০০°C', isCorrect: false },
      { id: 'opt_chem_2_18_c', text: '-২৭৩.১৫°C বা ০ K', isCorrect: true },
      { id: 'opt_chem_2_18_d', text: '২৭৩.১৫ K', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর গ: -২৭৩.১৫°C বা ০ K।',
      coreConcept: 'যে তাপমাত্রায় তাত্ত্বিকভাবে সকল পদার্থের কণার গতিশক্তি ও তাপীয় কম্পন সম্পূর্ণ থেমে যায় তাকে পরম শূন্য তাপমাত্রা বলে।',
      stepDerivation: 'কেলভিন স্কেলের শূন্য বিন্দু $0\text{ K} = -273.15^\circ\text{C}$। এই তাপমাত্রায় কণার গতিশক্তি $E_k = \frac{3}{2}kT = 0$ হয়।',
      distractorAnalysis: {
        opt_chem_2_18_a: '০°C হলো বরফের গলনাঙ্ক (২৭৩.১৫ K)।',
        opt_chem_2_18_b: '-১০০°C পরম শূন্য নয়।',
        opt_chem_2_18_d: '২৭৩.১৫ K হলো ০°C।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.২', pageNumber: 21 },
    },
    difficulty: 'EASY',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_19',
    topicId: 'top_ssc_chemistry_ch2_2',
    type: 'MCQ',
    stem: 'তরলকে ঠান্ডা করে কঠিনে রূপান্তর করার প্রক্রিয়ায় কণার গতিতত্ত্ব অনুযায়ী কী ঘটে?',
    options: [
      { id: 'opt_chem_2_19_a', text: 'গতিশক্তি কমে যায় এবং আন্তঃকণা আকর্ষণ বল কণাগুলোকে নির্দিষ্ট অবস্থানে বেঁধে ফেলে', isCorrect: true },
      { id: 'opt_chem_2_19_b', text: 'গতিশক্তি বেড়ে যায় এবং কণাগুলো দূরে চলে যায়', isCorrect: false },
      { id: 'opt_chem_2_19_c', text: 'কণাগুলোর আকার ছোট হয়ে যায়', isCorrect: false },
      { id: 'opt_chem_2_19_d', text: 'আন্তঃআণবিক আকর্ষণ বল সম্পূর্ণ বিলুপ্ত হয়', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: গতিশক্তি কমে যায় এবং আন্তঃকণা আকর্ষণ বল কণাগুলোকে নির্দিষ্ট অবস্থানে বেঁধে ফেলে।',
      coreConcept: 'শীতলীকরণে তাপ নির্গত হওয়ায় কণার বেগ হ্রাস পায় এবং আকর্ষণ বল বিজয়ী হয়ে তাদের কেলাসাকার কঠিনে রূপান্তর করে।',
      stepDerivation: 'তাপমাত্রা কমালে $E_k$ কমে। ফলে কণাগুলো আর পরস্পরের বাঁধন ছিন্ন করতে পারে না এবং সুনির্দিষ্ট স্থানে আটকে যায়।',
      distractorAnalysis: {
        opt_chem_2_19_b: 'গতিশক্তি বাড়ে উত্তপ্ত করলে, ঠান্ডা করলে নয়।',
        opt_chem_2_19_c: 'কণার আকার পরিবর্তন হয় না, কেবল পারস্পরিক দূরত্ব কমে।',
        opt_chem_2_19_d: 'আকর্ষণ বল বৃদ্ধি পায়, বিলুপ্ত হয় না।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.২', pageNumber: 21 },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_20',
    topicId: 'top_ssc_chemistry_ch2_2',
    type: 'MCQ',
    stem: 'একটি আবদ্ধ পাত্রে রক্ষিত গ্যাসের তাপমাত্রা দ্বিগুণ (কেলভিন স্কেলে) করা হলে কণার গড় গতিশক্তি কত গুণ হবে?',
    options: [
      { id: 'opt_chem_2_20_a', text: 'অর্ধেক হবে', isCorrect: false },
      { id: 'opt_chem_2_20_b', text: 'দ্বিগুণ হবে', isCorrect: true },
      { id: 'opt_chem_2_20_c', text: 'চারগুণ হবে', isCorrect: false },
      { id: 'opt_chem_2_20_d', text: 'অপরিবর্তিত থাকবে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর খ: দ্বিগুণ হবে।',
      coreConcept: 'কণার গতিতত্ত্ব অনুসারে কণার গড় গতিশক্তি কেলভিন তাপমাত্রার সরাসরি সমানুপাতিক ($E_k \propto T$)।',
      stepDerivation: 'যেহেতু $\overline{E_k} = \frac{3}{2}kT$, তাই কেলভিন তাপমাত্রা $T$ দ্বিগুণ ($2T$) হলে গড় গতিশক্তিও ঠিক দ্বিগুণ হবে।',
      distractorAnalysis: {
        opt_chem_2_20_a: 'তাপমাত্রা দ্বিগুণ করলে গতিশক্তি কমে না, বাড়ে।',
        opt_chem_2_20_c: 'গতিশক্তি বেগের বর্গের সমানুপাতিক কিন্তু তাপমাত্রার প্রথম ঘাতের সমানুপাতিক।',
        opt_chem_2_20_d: 'তাপমাত্রা বাড়লে গতিশক্তি অবশ্যই পরিবর্তিত হবে।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.২', pageNumber: 20 },
    },
    difficulty: 'HARD',
    boardSource: 'কুমিল্লা বোর্ড ২০২৪',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_21',
    topicId: 'top_ssc_chemistry_ch2_2',
    type: 'MCQ',
    stem: 'কণার গতিতত্ত্বের সাহায্যে ব্যাখ্যা করা যায়—\ni. পদার্থের তিন অবস্থার রূপান্তর\nii. গ্যাসের চাপ ও তাপমাত্রা সম্পর্ক\niii. পরমাণুর নিউক্লিয়াসের তেজস্ক্রিয় ভাঙন\nনিচের কোনটি সঠিক?',
    options: [
      { id: 'opt_chem_2_21_a', text: 'i ও ii', isCorrect: true },
      { id: 'opt_chem_2_21_b', text: 'i ও iii', isCorrect: false },
      { id: 'opt_chem_2_21_c', text: 'ii ও iii', isCorrect: false },
      { id: 'opt_chem_2_21_d', text: 'i, ii ও iii', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: i ও ii।',
      coreConcept: 'কণার গতিতত্ত্ব অণু-পরমাণুর গতি ও আকর্ষণের মাধ্যমে ভৌত অবস্থা ও গ্যাসের ধর্ম ব্যাখ্যা করে; নিউক্লিয় বিক্রিয়া বা তেজস্ক্রিয়তা এর অন্তর্ভুক্ত নয়।',
      stepDerivation: '১. কঠিন, তরল ও গ্যাসের দশা রূপান্তর গতিতত্ত্ব দিয়ে ব্যাখ্যা করা যায় (i সত্য)।\n২. তাপমাত্রা বাড়লে পাত্রের দেয়ালে চাপ বাড়ে এটি গতিতত্ত্বের সরাসরি সিদ্ধান্ত (ii সত্য)।\n৩. তেজস্ক্রিয় ভাঙন হলো নিউক্লিয়ার পদার্থবিজ্ঞানের বিষয় (iii মিথ্যা)। সুতরাং সঠিক উত্তর i ও ii।',
      distractorAnalysis: {
        opt_chem_2_21_b: 'iii ভুল কারণ তেজস্ক্রিয়তা নিউক্লিয় ঘটনা।',
        opt_chem_2_21_c: 'i অবশ্যই সঠিক ব্যাখ্যা।',
        opt_chem_2_21_d: 'iii অন্তর্ভুক্ত হতে পারে না।',
      },
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.২', pageNumber: 20 },
    },
    difficulty: 'MEDIUM',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------------------
  // Topic 2.2: Creative Questions (CQs) [3 Authentic CQs]
  // -------------------------------------------------------------------------
  {
    id: 'q_chem_2_22',
    topicId: 'top_ssc_chemistry_ch2_2',
    type: 'CQ_CREATIVE',
    stem: 'নবম শ্রেণির বিজ্ঞানের ক্লাসে শিক্ষক ব্ল্যাকবোর্ডে একটি বন্ধ সিলিন্ডারের চিত্র আঁকলেন যার মধ্যে কিছু গ্যাস কণা তীব্র বেগে পাত্রের দেয়ালে আঘাত করছে। তিনি বললেন, "সিলিন্ডারের নিচে বার্নার দিয়ে তাপ দেওয়া হলো।" এর কিছুক্ষণ পর দেখা গেল সিলিন্ডারে যুক্ত প্রেসার গেজে গ্যাসের চাপের মান দ্রুত বৃদ্ধি পেল।',
    options: null,
    explanation: {
      directAnswer: 'তাপমাত্রা বৃদ্ধির ফলে গ্যাস কণাগুলোর গড় গতিশক্তি বৃদ্ধি পায় এবং পাত্রের দেয়ালে প্রতি সেকেন্ডে সংঘর্ষের সংখ্যা ও ঘাত বেড়ে যাওয়ায় চাপ বৃদ্ধি পায়।',
      coreConcept: 'কণার গতিতত্ত্বের সাহায্যে গ্যাসের চাপ ও তাপমাত্রার সম্পর্কের ব্যাখ্যা।',
      stepDerivation: 'ক: কণার গতিতত্ত্বের সংজ্ঞা। খ: কঠিনের কণাগুলো নিজ অবস্থানে কাঁপে কেন। গ: উদ্দীপকের সিলিন্ডারে তাপ দিলে কণার গতির কী পরিবর্তন ঘটে তা বিশ্লেষণ। ঘ: প্রেসার গেজে চাপ বৃদ্ধির কারণ কণার গতিতত্ত্বের মূল স্বীকার্যের আলোকে গাণিতিক যুক্তি দিয়ে মূল্যায়ন।',
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.২', pageNumber: 20 },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'কণার গতিতত্ত্ব কাকে বলে তা সঠিকভাবে লেখা।' },
      kha: { mark: 2, criteria: 'কঠিন পদার্থের সুদৃঢ় আকর্ষণ বলের কারণে কণাগুলো স্থান ত্যাগ না করে কেন কেবল নিজ অবস্থানে কাঁপে তা ব্যাখ্যা করা।' },
      ga: { mark: 3, criteria: 'উদ্দীপকে সিলিন্ডারে তাপ দেওয়ার পর কণাগুলোর তাপশক্তি শোষণ, গতিশক্তি ও বেগ বৃদ্ধির প্রক্রিয়া গতিতত্ত্বের আলোকে উপস্থাপন করা।' },
      gha: { mark: 4, criteria: 'কণার গড় গতিশক্তি বৃদ্ধি ($E_k \propto T$) এবং পাত্রের দেয়ালে প্রতি সেকেন্ডে সংঘর্ষের তীব্রতা ও সংখ্যা বেড়ে চাপ বৃদ্ধির কারণ বিজ্ঞানসম্মতভাবে বিশ্লেষণ করা।' },
    },
    difficulty: 'MEDIUM',
    boardSource: 'যশোর বোর্ড ২০২৪ মডেল সৃজনশীল',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_23',
    topicId: 'top_ssc_chemistry_ch2_2',
    type: 'CQ_CREATIVE',
    stem: 'একটি কাচের পাত্রে একখণ্ড কঠিন পদার্থ A নিয়ে উত্তপ্ত করা হলো। A পদার্থটি প্রথমে তরল B তে এবং পরবর্তীতে গ্যাস C তে রূপান্তরিত হলো। পাত্রের ঢাকনাটি হালকা থাকায় C দশায় পৌঁছানোর পর ঢাকনাটি উপরের দিকে ছিটকে গেল।',
    options: null,
    explanation: {
      directAnswer: 'A (কঠিন) থেকে B (তরল) এবং B থেকে C (গ্যাস) রূপান্তরে কণার গতিশক্তি বৃদ্ধি ও আকর্ষণ বলের ক্রমহ্রাস ঘটে। গ্যাসীয় দশায় কণাগুলোর তীব্র গতি ও দেয়ালে অবিরাম সংঘর্ষ ঢাকনাকে ঠেলে ফেলে দেয়।',
      coreConcept: 'কণার গতিতত্ত্বের আলোকে কঠিন থেকে তরল ও গ্যাসীয় রূপান্তর এবং চাপের প্রকাশ।',
      stepDerivation: 'ক: গতিশক্তি কী। খ: পরম শূন্য তাপমাত্রায় কণার আচরণ ব্যাখ্যা। গ: A থেকে B তে রূপান্তরের সময় আণবিক সজ্জার পরিবর্তন ব্যাখ্যা। ঘ: C দশায় ঢাকনা ছিটকে যাওয়ার কারণ কণার গতি ও চাপের ভিত্তিতে বিশ্লেষণ।',
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.২', pageNumber: 21 },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'গতিশক্তির সংজ্ঞা নির্ভুলভাবে লেখা।' },
      kha: { mark: 2, criteria: 'পরম শূন্য তাপমাত্রায় (0 K) কণার গতিশক্তি শূন্য হয়ে যাওয়ার বৈজ্ঞানিক তাৎপর্য ব্যাখ্যা করা।' },
      ga: { mark: 3, criteria: 'A (কঠিন) তাপে গলে B (তরল) হওয়ার সময় আন্তঃকণা আকর্ষণ বল আংশিক শিথিল হওয়া ও কণার স্থান পরিবর্তনের সামর্থ্যের আণবিক ব্যাখ্যা দেওয়া।' },
      gha: { mark: 4, criteria: 'C (গ্যাসীয়) দশায় কণাগুলোর আকর্ষণ বল সম্পূর্ণ ছিন্ন হওয়া, দ্রুত বিশৃঙ্খল গতি এবং ঢাকনার অভ্যন্তরীণ পৃষ্ঠে প্রচণ্ড সংঘর্ষের লব্ধি বলের কারণে ঢাকনা ছিটকে যাওয়ার কারণ বিশ্লেষণ করা।' },
    },
    difficulty: 'MEDIUM',
    boardSource: 'দিনাজপুর বোর্ড ২০২৩',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_chem_2_24',
    topicId: 'top_ssc_chemistry_ch2_2',
    type: 'CQ_CREATIVE',
    stem: 'দুইটি একই আকারের গোলতলী ফ্লাস্ক X ও Y নেওয়া হলো। X ফ্লাস্কে সাধারণ তাপমাত্রায় (২৫°C) কিছু বায়ু আবদ্ধ আছে এবং Y ফ্লাস্কে উত্তপ্ত অবস্থায় (৮০°C) সমপরিমাণ বায়ু আবদ্ধ আছে। উভয় ফ্লাস্কের মুখে একই আকারের দুটি বেলুন বেঁধে দেওয়া হলো। দেখা গেল Y ফ্লাস্কের বেলুনটি X ফ্লাস্কের বেলুনের চেয়ে অনেক বেশি স্ফীত হয়েছে।',
    options: null,
    explanation: {
      directAnswer: 'উচ্চ তাপমাত্রায় (৮০°C) Y ফ্লাস্কের গ্যাস কণাগুলোর গতিশক্তি বেশি থাকায় তারা বেশি বেগে ছড়িয়ে বেলুনের ভেতরের গায়ে বেশি চাপ দেয়, ফলে বেলুনটি বেশি স্ফীত হয়।',
      coreConcept: 'তাপমাত্রার প্রভাবে কণার গতিশক্তি ও প্রসারণশীলতার পরীক্ষামূলক তুলনা।',
      stepDerivation: 'ক: আন্তঃকণা আকর্ষণ বল কী। খ: গ্যাসীয় পদার্থের নির্দিষ্ট আয়তন নেই কেন। গ: X ও Y ফ্লাস্কের কণাগুলোর গতিশক্তির তুলনা। ঘ: Y ফ্লাস্কের বেলুনটি অধিক স্ফীত হওয়ার কারণ গতিতত্ত্বের স্বীকার্যের আলোকে বিশ্লেষণ।',
      textbookCitation: { bookTitle: BOOK, chapterName: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা · ২.২', pageNumber: 20 },
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'আন্তঃকণা আকর্ষণ বলের সঠিক সংজ্ঞা প্রদান।' },
      kha: { mark: 2, criteria: 'গ্যাসীয় কণার দুর্বলতম আকর্ষণ ও উচ্চ গতিশক্তির দরুন নির্দিষ্ট আয়তন না থাকার কারণ ব্যাখ্যা করা।' },
      ga: { mark: 3, criteria: '২৫°C বনাম ৮০°C তাপমাত্রায় কণাগুলোর গড় গতিশক্তির ($E_k \propto T$) তাত্ত্বিক তুলনা উপস্থাপন করা।' },
      gha: { mark: 4, criteria: 'Y ফ্লাস্কে তাপমাত্রা বেশি হওয়ায় কণাগুলোর তীব্র বেগ, বেশি প্রসারণ এবং বেলুনের অভ্যন্তরীণ দেওয়ালে বর্ধিত চাপের কারণে অধিক স্ফীত হওয়ার বিজ্ঞানসম্মত বিশ্লেষণ করা।' },
    },
    difficulty: 'HARD',
    boardSource: 'রাজশাহী বোর্ড ২০২৪',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];
