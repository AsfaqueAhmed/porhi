import { PrismaClient, ContentStatus } from '@prisma/client';

interface SeedQuestionInput {
  id: string;
  topicId: string;
  type: 'MCQ' | 'CQ_CREATIVE';
  stem: string;
  options?: Array<{ id: string; text: string; isCorrect: boolean }>;
  explanation: {
    directAnswer: string;
    coreConcept: string;
    stepDerivation: string;
    distractorAnalysis?: Record<string, string>;
    textbookCitation: {
      bookTitle: string;
      chapterName: string;
      pageNumber: number;
    };
    proTipShortcut?: string;
  };
  cqRubric?: {
    subQuestions: Array<{
      label: string;
      questionText: string;
      marks: number;
      modelAnswer: string;
      markingCriteria: string;
    }>;
  };
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  boardSource: string;
  isVerified: boolean;
}

interface TrackSeedItem {
  subject: {
    id: string;
    code: string;
    nameBangla: string;
    classLevel: string;
    program: string;
    syllabusYear: number;
    isReady: boolean;
  };
  chapter: {
    id: string;
    orderIndex: number;
    titleBangla: string;
  };
  topics: Array<{
    id: string;
    orderIndex: number;
    titleBangla: string;
    lesson: {
      id: string;
      titleBangla: string;
      learningGoal: string;
      explanation: string;
      audioUrl: string;
      audioDurationSeconds: number;
      importantTerms: Array<{ termBangla: string; termEnglish: string; definition: string }>;
      workedExample: { problem: string; stepByStepSolution: string };
      memoryAid: string;
    };
    questions: Omit<SeedQuestionInput, 'topicId'>[];
  }>;
}

const PHASE2_TRACK_SEEDS: TrackSeedItem[] = [
  {
    subject: {
      id: 'sub_class8_science',
      code: 'class8_science',
      nameBangla: 'অষ্টম শ্রেণির বিজ্ঞান',
      classLevel: 'CLASS_6_8',
      program: 'CLASS_6_8',
      syllabusYear: 2026,
      isReady: true,
    },
    chapter: {
      id: 'chap_c8_sci_1',
      orderIndex: 1,
      titleBangla: 'পৃথিবী ও মহাকর্ষ',
    },
    topics: [
      {
        id: 'top_c8_sci_1_1',
        orderIndex: 1,
        titleBangla: 'মহাকর্ষ ও অভিকর্ষজ ত্বরণ (Gravity & g)',
        lesson: {
          id: 'les_c8_sci_1_1',
          titleBangla: 'মহাকর্ষ বল ও অভিকর্ষজ ত্বরণ পরিচিতি',
          learningGoal: 'মহাকর্ষ ও অভিকর্ষের পার্থক্য এবং g-এর মান স্থানভেদে কেন পরিবর্তিত হয় তা ব্যাখ্যা করতে পারা।',
          explanation:
            'বিশ্বের যেকোনো দুটি বস্তুর মধ্যকার আকর্ষণ বলকে **মহাকর্ষ** বলে। এর মধ্যে একটি বস্তু পৃথিবী হলে সেই আকর্ষণকে **অভিকর্ষ** বলে।\n\nঅভিকর্ষ বলের প্রভাবে মুক্তভাবে পড়ন্ত বস্তুর বেগ বৃদ্ধির হারকে অভিকর্ষজ ত্বরণ ($g$) বলে:\n\n$$g = \\frac{GM}{R^2}$$\n\n- মেরু অঞ্চলে পৃথিবীর ব্যাসার্ধ $R$ কম হওয়ায় $g$-এর মান সর্বাধিক ($9.83\\ \\text{m/s}^2$)।\n- বিষুব অঞ্চলে $R$ বেশি হওয়ায় $g$ তুলনামূলক কম ($9.78\\ \\text{m/s}^2$)।\n- আদর্শ মান ধরা হয় $9.8\\ \\text{m/s}^2$।',
          audioUrl: '/audio/lesson-intro.wav',
          audioDurationSeconds: 95,
          importantTerms: [
            { termBangla: 'মহাকর্ষ', termEnglish: 'Gravitation', definition: 'মহাবিশ্বের যেকোনো দুটি ভরের মধ্যবর্তী আকর্ষণ বল।' },
            { termBangla: 'অভিকর্ষজ ত্বরণ', termEnglish: 'Acceleration due to gravity', definition: 'অভিকর্ষের প্রভাবে ভূপৃষ্ঠে মুক্তভাবে পড়া বস্তুর প্রতি সেকেন্ডে বেগ বৃদ্ধি।' },
          ],
          workedExample: {
            problem: 'ভূপৃষ্ঠে ৫ কেজি ভরের একটি বস্তুর ওজন কত হবে? ($g = 9.8\\ \\text{m/s}^2$)',
            stepByStepSolution: '১. আমরা জানি, ওজন $W = mg$।\n২. এখানে ভর $m = 5\\ \\text{kg}$ এবং $g = 9.8\\ \\text{m/s}^2$।\n৩. $W = 5 \\times 9.8 = 49\\ \\text{N}$।',
          },
          memoryAid: 'ভর ($m$) সর্বত্র সমান থাকে, কিন্তু ওজন ($W = mg$) স্থানভেদে $g$-এর সাথে বদলায়।',
        },
        questions: [
          {
            id: 'q_c8_sci_dhaka_2023_1',
            type: 'MCQ',
            stem: 'ভূপৃষ্ঠের কোন স্থানে অভিকর্ষজ ত্বরণ $g$-এর মান সবচেয়ে বেশি?',
            options: [
              { id: 'opt_1', text: 'বিষুব অঞ্চলে', isCorrect: false },
              { id: 'opt_2', text: 'মেরু অঞ্চলে', isCorrect: true },
              { id: 'opt_3', text: 'পৃথিবীর কেন্দ্রে', isCorrect: false },
              { id: 'opt_4', text: 'পাহাড়ের চূড়ায়', isCorrect: false },
            ],
            explanation: {
              directAnswer: 'মেরু অঞ্চলে',
              coreConcept: '$g = GM / R^2$; পৃথিবীর ব্যাসার্ধ $R$ কমলে $g$ বাড়ে।',
              stepDerivation: 'পৃথিবী মেরু অঞ্চলে কিছুটা চাপা হওয়ায় সেখানে $R$ সর্বনিম্ন, ফলে $g \\approx 9.83\\ \\text{m/s}^2$ (সর্বোচ্চ)।',
              distractorAnalysis: {
                opt_1: 'বিষুব অঞ্চলে $R$ সবচেয়ে বেশি, তাই $g$ কম।',
                opt_3: 'পৃথিবীর কেন্দ্রে $g = 0$।',
              },
              textbookCitation: { bookTitle: 'অষ্টম শ্রেণি বিজ্ঞান (NCTB)', chapterName: 'পৃথিবী ও মহাকর্ষ', pageNumber: 68 },
              proTipShortcut: 'ব্যাসার্ধ কম -> g বেশি -> মেরুতে g সর্বোচ্চ।',
            },
            difficulty: 'EASY',
            boardSource: 'Dhaka Board 2023',
            isVerified: true,
          },
          {
            id: 'q_c8_sci_raj_2022_2',
            type: 'MCQ',
            stem: '১০ কেজি ভরের কোনো বস্তুকে চাঁদে নিয়ে গেলে তার ভর কত হবে?',
            options: [
              { id: 'opt_1', text: '১.৬ কেজি', isCorrect: false },
              { id: 'opt_2', text: '১০ কেজি', isCorrect: true },
              { id: 'opt_3', text: '৬০ কেজি', isCorrect: false },
              { id: 'opt_4', text: '০ কেজি', isCorrect: false },
            ],
            explanation: {
              directAnswer: '১০ কেজি',
              coreConcept: 'বস্তুতে পদার্থের মোট পরিমাণই ভর, যা মহাবিশ্বের সর্বত্র অপরিবর্তিত থাকে।',
              stepDerivation: 'চাঁদে $g$ পৃথিবীর ১/৬ গুণ হওয়ায় ওজন কমে, কিন্তু ভর $m = 10\\ \\text{kg}$-ই থাকবে।',
              textbookCitation: { bookTitle: 'অষ্টম শ্রেণি বিজ্ঞান (NCTB)', chapterName: 'পৃথিবী ও মহাকর্ষ', pageNumber: 71 },
            },
            difficulty: 'EASY',
            boardSource: 'Rajshahi Board 2022',
            isVerified: true,
          },
        ],
      },
    ],
  },
  {
    subject: {
      id: 'sub_ssc_chemistry',
      code: 'ssc_chemistry',
      nameBangla: 'রসায়ন',
      classLevel: 'CLASS_9_10',
      program: 'SSC',
      syllabusYear: 2026,
      isReady: true,
    },
    chapter: {
      id: 'chap_ssc_chem_3',
      orderIndex: 1,
      titleBangla: 'পদার্থের গঠন ও মোলের ধারণা',
    },
    topics: [
      {
        id: 'top_ssc_chem_3_1',
        orderIndex: 1,
        titleBangla: 'পরমাণুর ইলেকট্রন বিন্যাস ও যোজনী',
        lesson: {
          id: 'les_ssc_chem_3_1',
          titleBangla: 'শক্তিস্তর, উপশক্তিস্তর ও যোজনী নির্ণয়',
          learningGoal: 'বোর মডেল ও আউফবাউ নীতি অনুসারে মৌলের ইলেকট্রন বিন্যাস এবং যোজনী নির্ণয় করতে পারা।',
          explanation:
            'পরমাণুর নিউক্লিয়াসকে কেন্দ্র করে ইলেকট্রন নির্দিষ্ট শক্তিস্তরে ($n = 1, 2, 3, \\dots$) আবর্তন করে। প্রতিটি শক্তিস্তরে সর্বোচ্চ ইলেকট্রন ধারণক্ষমতা $2n^2$।\n\n- $K$ শেল ($n=1$): সর্বোচ্চ ২টি\n- $L$ শেল ($n=2$): সর্বোচ্চ ৮টি\n- $M$ শেল ($n=3$): সর্বোচ্চ ১৮টি\n\nআউফবাউ নীতি অনুসারে $3d$-এর আগে $4s$ অরবিটাল পূর্ণ হয়, কারণ $(n+l)$ নিয়মে $4s = 4+0 = 4 < 3d = 3+2 = 5$।',
          audioUrl: '/audio/lesson-intro.wav',
          audioDurationSeconds: 110,
          importantTerms: [
            { termBangla: 'আউফবাউ নীতি', termEnglish: 'Aufbau Principle', definition: 'ইলেকট্রন সর্বনিম্ন শক্তির অরবিটাল থেকে পর্যায়ক্রমে উচ্চশক্তির অরবিটালে প্রবেশ করে।' },
            { termBangla: 'পারমাণবিক সংখ্যা', termEnglish: 'Atomic Number (Z)', definition: 'পরমাণুর নিউক্লিয়াসে উপস্থিত প্রোটন সংখ্যা।' },
          ],
          workedExample: {
            problem: 'পটাশিয়াম ($K, Z=19$)-এর সর্বশেষ ইলেকট্রন $3d$-তে না গিয়ে $4s$-এ যায় কেন?',
            stepByStepSolution: '$(n+l)$ নিয়মে $3d$ অরবিটালের জন্য $3+2=5$ এবং $4s$-এর জন্য $4+0=4$। $4s$-এর শক্তি কম হওয়ায় ১৯তম ইলেকট্রনটি $4s^1$ অরবিটালে যায়।',
          },
          memoryAid: 'শক্তি ক্রম: $1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p$',
        },
        questions: [
          {
            id: 'q_ssc_chem_ctg_2024_1',
            type: 'MCQ',
            stem: '$\\text{Cr}$ ($Z=24$)-এর সঠিক ইলেকট্রন বিন্যাস কোনটি?',
            options: [
              { id: 'opt_1', text: '$[\\text{Ar}]\\ 3d^4 4s^2$', isCorrect: false },
              { id: 'opt_2', text: '$[\\text{Ar}]\\ 3d^5 4s^1$', isCorrect: true },
              { id: 'opt_3', text: '$[\\text{Ar}]\\ 3d^6 4s^0$', isCorrect: false },
              { id: 'opt_4', text: '$[\\text{Ar}]\\ 3d^3 4s^2 4p^1$', isCorrect: false },
            ],
            explanation: {
              directAnswer: '$[\\text{Ar}]\\ 3d^5 4s^1$',
              coreConcept: 'অর্ধপূর্ণ ($d^5$) এবং পূর্ণ ($d^{10}$) অরবিটাল অতিরিক্ত স্থিতিশীলতা প্রদান করে।',
              stepDerivation: 'সাধারণ বিন্যাস $[\\text{Ar}]3d^44s^2$ হওয়ার কথা থাকলেও $4s$ থেকে একটি ইলেকট্রন $3d$-তে গিয়ে $3d^5 4s^1$ স্থিতিশীল বিন্যাস গঠন করে।',
              textbookCitation: { bookTitle: 'এসএসসি রসায়ন (NCTB)', chapterName: 'পদার্থের গঠন', pageNumber: 54 },
            },
            difficulty: 'MEDIUM',
            boardSource: 'Chattogram Board 2024',
            isVerified: true,
          },
          {
            id: 'q_ssc_chem_dhk_2020_2',
            type: 'MCQ',
            stem: 'কোন শক্তিস্তরে সর্বোচ্চ ১৮টি ইলেকট্রন থাকতে পারে?',
            options: [
              { id: 'opt_1', text: '$K$ শেল', isCorrect: false },
              { id: 'opt_2', text: '$L$ শেল', isCorrect: false },
              { id: 'opt_3', text: '$M$ শেল', isCorrect: true },
              { id: 'opt_4', text: '$N$ শেল', isCorrect: false },
            ],
            explanation: {
              directAnswer: '$M$ শেল',
              coreConcept: 'সর্বোচ্চ ইলেকট্রন সংখ্যা = $2n^2$।',
              stepDerivation: '$M$ শেলের জন্য $n=3$, সুতরাং $2 \\times 3^2 = 18$।',
              textbookCitation: { bookTitle: 'এসএসসি রসায়ন (NCTB)', chapterName: 'পদার্থের গঠন', pageNumber: 49 },
            },
            difficulty: 'EASY',
            boardSource: 'Dhaka Board 2020',
            isVerified: true,
          },
        ],
      },
    ],
  },
  {
    subject: {
      id: 'sub_hsc_physics_1',
      code: 'hsc_physics_1',
      nameBangla: 'HSC পদার্থবিজ্ঞান ১ম পত্র',
      classLevel: 'CLASS_11_12',
      program: 'HSC',
      syllabusYear: 2026,
      isReady: true,
    },
    chapter: {
      id: 'chap_hsc_phy1_2',
      orderIndex: 1,
      titleBangla: 'ভেক্টর (Vectors)',
    },
    topics: [
      {
        id: 'top_hsc_phy1_2_1',
        orderIndex: 1,
        titleBangla: 'ভেক্টর বিভাজন ও ডট/ক্রস গুণন',
        lesson: {
          id: 'les_hsc_phy1_2_1',
          titleBangla: 'ভেক্টরের স্কেলার (ডট) ও ভেক্টর (ক্রস) গুণন',
          learningGoal: 'দুটি ভেক্টরের মধ্যবর্তী কোণ নির্ণয়, লম্ব হওয়ার শর্ত এবং ক্ষেত্রফল হিসাব করতে ডট ও ক্রস গুণন প্রয়োগ করা।',
          explanation:
            'দুটি ভেক্টর $\\vec{A}$ এবং $\\vec{B}$-এর মধ্যবর্তী কোণ $\\theta$ হলে:\n\n1. **ডট (স্কেলার) গুণন:** $\\vec{A} \\cdot \\vec{B} = AB\\cos\\theta$। দুটি অশূন্য ভেক্টর পরস্পর লম্ব হলে $\\vec{A} \\cdot \\vec{B} = 0$।\n2. **ক্রস (ভেক্টর) গুণন:** $|\\vec{A} \\times \\vec{B}| = AB\\sin\\theta$। এর মান দুটি ভেক্টর দ্বারা গঠিত সামান্তরিকের ক্ষেত্রফল নির্দেশ করে।',
          audioUrl: '/audio/lesson-intro.wav',
          audioDurationSeconds: 120,
          importantTerms: [
            { termBangla: 'লম্ব ভেক্টর শর্ত', termEnglish: 'Orthogonality Condition', definition: 'দুটি ভেক্টরের ডট গুণফল শূন্য হলে তারা পরস্পর ৯০° কোণে থাকে।' },
            { termBangla: 'একক ভেক্টর', termEnglish: 'Unit Vector', definition: 'যে ভেক্টরের মান ১ এবং নির্দিষ্ট দিক রয়েছে।' },
          ],
          workedExample: {
            problem: '$\\vec{A} = 2\\hat{i} + m\\hat{j} - 3\\hat{k}$ এবং $\\vec{B} = 4\\hat{i} - 2\\hat{j} + 2\\hat{k}$ পরস্পর লম্ব হলে $m$-এর মান কত?',
            stepByStepSolution: '$\\vec{A} \\cdot \\vec{B} = 0 \\implies (2)(4) + m(-2) + (-3)(2) = 0 \\implies 8 - 2m - 6 = 0 \\implies 2m = 2 \\implies m = 1$।',
          },
          memoryAid: 'ডট গুণন -> $\\cos\\theta$ (লম্ব হলে ০) | ক্রস গুণন -> $\\sin\\theta$ (সমান্তরাল হলে ০)।',
        },
        questions: [
          {
            id: 'q_hsc_phy1_dhk_2024_1',
            type: 'MCQ',
            stem: '$\\vec{A} = 3\\hat{i} - 2\\hat{j} + \\hat{k}$ এবং $\\vec{B} = 2\\hat{i} + m\\hat{j} - 2\\hat{k}$ পরস্পর লম্ব হলে $m$-এর মান কত?',
            options: [
              { id: 'opt_1', text: '1', isCorrect: false },
              { id: 'opt_2', text: '2', isCorrect: true },
              { id: 'opt_3', text: '4', isCorrect: false },
              { id: 'opt_4', text: '-2', isCorrect: false },
            ],
            explanation: {
              directAnswer: '2',
              coreConcept: 'লম্ব ভেক্টরের ডট গুণন শূন্য হয়: $\\vec{A}\\cdot\\vec{B} = A_xB_x + A_yB_y + A_zB_z = 0$।',
              stepDerivation: '$3(2) + (-2)(m) + 1(-2) = 0 \\implies 6 - 2m - 2 = 0 \\implies 2m = 4 \\implies m = 2$।',
              textbookCitation: { bookTitle: 'HSC পদার্থবিজ্ঞান ১ম পত্র', chapterName: 'ভেক্টর', pageNumber: 46 },
            },
            difficulty: 'MEDIUM',
            boardSource: 'Dhaka Board 2024',
            isVerified: true,
          },
          {
            id: 'q_hsc_phy1_syl_2023_2',
            type: 'CQ_CREATIVE',
            stem: 'একটি নদীর প্রস্থ ২ কি.মি. এবং স্রোতের বেগ $3\\ \\text{km/h}$। একজন মাঝি $6\\ \\text{km/h}$ বেগে নৌকা চালাতে পারেন।',
            cqRubric: {
              subQuestions: [
                {
                  label: 'ক',
                  questionText: 'একক ভেক্টর কাকে বলে?',
                  marks: 1,
                  modelAnswer: 'যে ভেক্টর রাশির মান একক বা ১ এবং নির্দিষ্ট দিক আছে তাকে একক ভেক্টর বলে।',
                  markingCriteria: 'সঠিক সংজ্ঞা লিখলে ১ নম্বর।',
                },
                {
                  label: 'গ',
                  questionText: 'মাঝি সর্বনিম্ন কত সময়ে নদী পার হতে পারবেন?',
                  marks: 3,
                  modelAnswer: 'সর্বনিম্ন সময়ের জন্য স্রোতের সাথে $90^\\circ$ কোণে রওনা দিতে হবে: $t = d / v = 2 / 6 = 0.333\\ \\text{h} = 20\\ \\text{min}$।',
                  markingCriteria: 'সূত্র (১), মান বসানো (১), সঠিক এককসহ উত্তর (১)।',
                },
              ],
            },
            explanation: {
              directAnswer: 'সর্বনিম্ন সময় ২০ মিনিট',
              coreConcept: 'সর্বনিম্ন সময়ে নদী পার হতে নৌকা প্রস্থ বরাবর ($\\alpha = 90^\\circ$) চালাতে হয়।',
              stepDerivation: '$t_{\\min} = \\frac{d}{v\\sin 90^\\circ} = \\frac{2}{6} \\text{ h} = 20\\text{ মিনিট}$।',
              textbookCitation: { bookTitle: 'HSC পদার্থবিজ্ঞান ১ম পত্র', chapterName: 'ভেক্টর', pageNumber: 39 },
            },
            difficulty: 'MEDIUM',
            boardSource: 'Sylhet Board 2023',
            isVerified: true,
          },
        ],
      },
    ],
  },
  {
    subject: {
      id: 'sub_admission_physics',
      code: 'admission_ka_physics',
      nameBangla: 'বিশ্ববিদ্যালয় ভর্তি: ক-ইউনিট পদার্থবিজ্ঞান',
      classLevel: 'ADMISSION',
      program: 'ADMISSION',
      syllabusYear: 2026,
      isReady: true,
    },
    chapter: {
      id: 'chap_adm_phy_1',
      orderIndex: 1,
      titleBangla: 'গতিবিদ্যা ও প্রাস (Admission Fast Track)',
    },
    topics: [
      {
        id: 'top_adm_phy_1_1',
        orderIndex: 1,
        titleBangla: 'প্রাস ও সর্বাধিক পাল্লার শর্টকাট কৌশল',
        lesson: {
          id: 'les_adm_phy_1_1',
          titleBangla: 'প্রাসের গতি: ঢাবি ও বুয়েট ভর্তি শর্টকাট',
          learningGoal: 'ক্যালকুলেটর ছাড়াই প্রাসের পাল্লা, সর্বাধিক উচ্চতা এবং বিচরণকাল অনুপাত সংক্রান্ত ভর্তি প্রশ্ন ৩০ সেকেন্ডে সমাধান করা।',
          explanation:
            'প্রাসের নিক্ষেপণ বেগ $v_0$ এবং কোণ $\\theta_0$ হলে:\n\n- **সর্বাধিক উচ্চতা:** $H = \\frac{v_0^2 \\sin^2\\theta_0}{2g}$\n- **অনুভূমিক পাল্লা:** $R = \\frac{v_0^2 \\sin 2\\theta_0}{g}$\n- **ভর্তি শর্টকাট:** $R_{\\max} = 4H$ যখন $\\theta_0 = 45^\\circ$ এবং $\\frac{H}{R} = \\frac{\\tan\\theta_0}{4}$।',
          audioUrl: '/audio/lesson-intro.wav',
          audioDurationSeconds: 105,
          importantTerms: [
            { termBangla: 'সর্বাধিক পাল্লা', termEnglish: 'Maximum Range', definition: '৪৫° কোণে নিক্ষেপ করলে অনুভূমিক দূরত্ব সর্বাধিক হয়।' },
          ],
          workedExample: {
            problem: 'একটি প্রাসের সর্বাধিক অনুভূমিক পাল্লা ৮০ মিটার হলে ওই অবস্থায় সর্বাধিক উচ্চতা কত?',
            stepByStepSolution: '$R_{\\max} = 4H \\implies H = R_{\\max}/4 = 80/4 = 20\\ \\text{m}$ (২ সেকেন্ডে সমাধান)।',
          },
          memoryAid: '৪৫° কোণে $R_{\\max} = 4H$ এবং অনুপাত সূত্র $\\tan\\theta = 4H/R$।',
        },
        questions: [
          {
            id: 'q_adm_phy_2024_1',
            type: 'MCQ',
            stem: 'একটি প্রাসের সর্বাধিক অনুভূমিক পাল্লা $100\\ \\text{m}$ হলে ওই প্রাসটি সর্বাধিক কত উচ্চতায় উঠবে?',
            options: [
              { id: 'opt_1', text: '$20\\ \\text{m}$', isCorrect: false },
              { id: 'opt_2', text: '$25\\ \\text{m}$', isCorrect: true },
              { id: 'opt_3', text: '$50\\ \\text{m}$', isCorrect: false },
              { id: 'opt_4', text: '$400\\ \\text{m}$', isCorrect: false },
            ],
            explanation: {
              directAnswer: '$25\\ \\text{m}$',
              coreConcept: '$\\theta = 45^\\circ$ কোণে $H = R_{\\max}/4$।',
              stepDerivation: '$H = 100 / 4 = 25\\ \\text{m}$।',
              textbookCitation: { bookTitle: 'ভর্তি সহায়িকা ক-ইউনিট', chapterName: 'দ্বিমাত্রিক গতি', pageNumber: 18 },
              proTipShortcut: 'সরাসরি ৪ দিয়ে ভাগ করুন: 100 / 4 = 25।',
            },
            difficulty: 'MEDIUM',
            boardSource: 'All Boards 2024',
            isVerified: true,
          },
        ],
      },
    ],
  },
  {
    subject: {
      id: 'sub_bcs_preliminary',
      code: 'bcs_preliminary',
      nameBangla: 'BCS প্রিলিমিনারি: সাধারণ বিজ্ঞান ও বাংলাদেশ',
      classLevel: 'BCS',
      program: 'BCS',
      syllabusYear: 2026,
      isReady: true,
    },
    chapter: {
      id: 'chap_bcs_1',
      orderIndex: 1,
      titleBangla: 'দৈনন্দিন বিজ্ঞান ও পরিবেশ',
    },
    topics: [
      {
        id: 'top_bcs_1_1',
        orderIndex: 1,
        titleBangla: 'তাপ, আলো, শব্দ ও বায়ুমণ্ডলের স্তর',
        lesson: {
          id: 'les_bcs_1_1',
          titleBangla: 'BCS প্রিলিমিনারি হাই-ইল্ড দৈনন্দিন বিজ্ঞান',
          learningGoal: 'BCS প্রিলিমিনারিতে বারবার আসা বায়ুমণ্ডল, শব্দ ও আলোর ধর্ম সংক্রান্ত তথ্যগুলো দ্রুত মনে রাখা।',
          explanation:
            '1. **বায়ুমণ্ডলের স্তরসমূহ:** ট্রপোমণ্ডল (বৃষ্টি-মেঘ ঘটে), স্ট্রাটোমণ্ডল (ওজোন স্তর অবস্থিত), মেসোমণ্ডল, তাপমণ্ডল।\n2. **আলোর প্রতিসরণ ও পূর্ণ অভ্যন্তরীণ প্রতিফলন:** হীরকের উজ্জ্বলতা, মরীচিকা ও অপটিক্যাল ফাইবারে পূর্ণ অভ্যন্তরীণ প্রতিফলন কাজ করে।\n3. **শব্দের বেগ:** কঠিন মাধ্যমে সবচেয়ে বেশি, বায়বীয় মাধ্যমে সবচেয়ে কম, এবং শূন্য মাধ্যমে শব্দ চলে না।',
          audioUrl: '/audio/lesson-intro.wav',
          audioDurationSeconds: 90,
          importantTerms: [
            { termBangla: 'ওজোন স্তর', termEnglish: 'Ozone Layer', definition: 'স্ট্রাটোমণ্ডলে অবস্থিত স্তর যা সূর্যের ক্ষতিকর অতিবেগুনি রশ্মি শোষণ করে।' },
          ],
          workedExample: {
            problem: 'অপটিক্যাল ফাইবারে আলোর কোন ধর্ম ব্যবহৃত হয়?',
            stepByStepSolution: 'পূর্ণ অভ্যন্তরীণ প্রতিফলন (Total Internal Reflection) ধর্মের ফলে আলো ন্যূনতম ক্ষয়ে দীর্ঘ দূরত্ব অতিক্রম করে।',
          },
          memoryAid: 'বায়ুমণ্ডল ক্রম: ট্র-স্ট্র-মে-তা (ট্রপো -> স্ট্রাটো -> মেসো -> তাপ)।',
        },
        questions: [
          {
            id: 'q_bcs_sci_2024_1',
            type: 'MCQ',
            stem: 'বায়ুমণ্ডলের কোন স্তরে ওজোন স্তর অবস্থিত?',
            options: [
              { id: 'opt_1', text: 'ট্রপোমণ্ডল', isCorrect: false },
              { id: 'opt_2', text: 'স্ট্রাটোমণ্ডল', isCorrect: true },
              { id: 'opt_3', text: 'মেসোমণ্ডল', isCorrect: false },
              { id: 'opt_4', text: 'আয়নমণ্ডল', isCorrect: false },
            ],
            explanation: {
              directAnswer: 'স্ট্রাটোমণ্ডল',
              coreConcept: 'ভূপৃষ্ঠ থেকে প্রায় ১৫–৫০ কি.মি. উচ্চতায় স্ট্রাটোমণ্ডলে ওজোন গ্যাস ঘনীভূত থাকে।',
              stepDerivation: 'স্ট্রাটোমণ্ডলের ওজোন ($O_3$) সূর্যের অতিবেগুনি রশ্মি (UV) প্রতিহত করে।',
              textbookCitation: { bookTitle: 'BCS সাধারণ বিজ্ঞান সংকলন', chapterName: 'বায়ুমণ্ডল ও পরিবেশ', pageNumber: 12 },
            },
            difficulty: 'EASY',
            boardSource: 'All Boards 2024',
            isVerified: true,
          },
        ],
      },
    ],
  },
];

export async function seedPhase2(prisma: PrismaClient): Promise<void> {
  // 1. Ensure SSC Physics stays marked as SSC and normalize pilot audio + 2020/2025 verified board questions
  await prisma.subject.updateMany({
    where: { id: 'sub_ssc_physics' },
    data: { program: 'SSC' },
  });

  const sscPhysicsFirstTopic = await prisma.topic.findFirst({
    where: { chapter: { subjectId: 'sub_ssc_physics' } },
    orderBy: [{ chapter: { orderIndex: 'asc' } }, { orderIndex: 'asc' }],
    select: { id: true },
  });

  if (sscPhysicsFirstTopic) {
    await prisma.lesson.updateMany({
      where: { topicId: sscPhysicsFirstTopic.id },
      data: {
        audioUrl: '/audio/lesson-intro.wav',
        audioDurationSeconds: 100,
      },
    });

    const physicsBackfillQuestions: SeedQuestionInput[] = [
      {
        id: 'q_phase2_phy_dhk_2020',
        topicId: sscPhysicsFirstTopic.id,
        type: 'MCQ',
        stem: 'নিচের কোনটি মৌলিক ভৌত রাশি নয়?',
        options: [
          { id: 'opt_1', text: 'দৈর্ঘ্য', isCorrect: false },
          { id: 'opt_2', text: 'তড়িৎ প্রবাহ', isCorrect: false },
          { id: 'opt_3', text: 'বেগ', isCorrect: true },
          { id: 'opt_4', text: 'দীপন তীব্রতা', isCorrect: false },
        ],
        explanation: {
          directAnswer: 'বেগ',
          coreConcept: 'দৈর্ঘ্য ও সময়ের অনুপাত থেকে বেগ গঠিত হওয়ায় এটি লব্ধ রাশি।',
          stepDerivation: '$v = s / t$ — মৌলিক ৭টি রাশির বাইরে থাকায় বেগ একটি লব্ধ রাশি।',
          textbookCitation: { bookTitle: 'এসএসসি পদার্থবিজ্ঞান (NCTB)', chapterName: 'ভৌত রাশি এবং পরিমাপ', pageNumber: 14 },
        },
        difficulty: 'EASY',
        boardSource: 'Dhaka Board 2020',
        isVerified: true,
      },
      {
        id: 'q_phase2_phy_raj_2025',
        topicId: sscPhysicsFirstTopic.id,
        type: 'MCQ',
        stem: 'একটি স্ক্রু গজের বৃত্তাকার স্কেলের ভাগ সংখ্যা ৫০ এবং পিচ $0.5\\ \\text{mm}$ হলে লঘিষ্ঠ গণন (LC) কত?',
        options: [
          { id: 'opt_1', text: '$0.1\\ \\text{mm}$', isCorrect: false },
          { id: 'opt_2', text: '$0.01\\ \\text{mm}$', isCorrect: true },
          { id: 'opt_3', text: '$0.02\\ \\text{mm}$', isCorrect: false },
          { id: 'opt_4', text: '$0.005\\ \\text{mm}$', isCorrect: false },
        ],
        explanation: {
          directAnswer: '$0.01\\ \\text{mm}$',
          coreConcept: 'লঘিষ্ঠ গণন = পিচ / বৃত্তাকার স্কেলের মোট ভাগ সংখ্যা।',
          stepDerivation: '$LC = \\frac{0.5}{50} = 0.01\\ \\text{mm}$।',
          textbookCitation: { bookTitle: 'এসএসসি পদার্থবিজ্ঞান (NCTB)', chapterName: 'ভৌত রাশি এবং পরিমাপ', pageNumber: 23 },
        },
        difficulty: 'MEDIUM',
        boardSource: 'Rajshahi Board 2025',
        isVerified: true,
      },
      {
        id: 'q_phase2_phy_ctg_2024',
        topicId: sscPhysicsFirstTopic.id,
        type: 'MCQ',
        stem: 'ভার্নিয়ার স্কেলে প্রধান স্কেলের ক্ষুদ্রতম ১ ভাগ $1\\ \\text{mm}$ এবং ভার্নিয়ারের ১০ ভাগ প্রধান স্কেলের ৯ ভাগের সমান হলে ভার্নিয়ার ধ্রুবক কত?',
        options: [
          { id: 'opt_1', text: '$0.01\\ \\text{cm}$', isCorrect: true },
          { id: 'opt_2', text: '$0.1\\ \\text{cm}$', isCorrect: false },
          { id: 'opt_3', text: '$0.05\\ \\text{mm}$', isCorrect: false },
          { id: 'opt_4', text: '$1\\ \\text{mm}$', isCorrect: false },
        ],
        explanation: {
          directAnswer: '$0.01\\ \\text{cm}$',
          coreConcept: 'ভার্নিয়ার ধ্রুবক $VC = s / n$।',
          stepDerivation: '$VC = \\frac{1\\ \\text{mm}}{10} = 0.1\\ \\text{mm} = 0.01\\ \\text{cm}$।',
          textbookCitation: { bookTitle: 'এসএসসি পদার্থবিজ্ঞান (NCTB)', chapterName: 'ভৌত রাশি এবং পরিমাপ', pageNumber: 21 },
        },
        difficulty: 'MEDIUM',
        boardSource: 'Chattogram Board 2024',
        isVerified: true,
      },
    ];

    for (const q of physicsBackfillQuestions) {
      await prisma.question.upsert({
        where: { id: q.id },
        update: {
          topicId: q.topicId,
          type: q.type,
          stem: q.stem,
          options: q.options ?? undefined,
          explanation: q.explanation,
          cqRubric: q.cqRubric ?? undefined,
          difficulty: q.difficulty,
          boardSource: q.boardSource,
          isVerified: q.isVerified,
          status: ContentStatus.PUBLISHED,
        },
        create: {
          id: q.id,
          topicId: q.topicId,
          type: q.type,
          stem: q.stem,
          options: q.options ?? undefined,
          explanation: q.explanation,
          cqRubric: q.cqRubric ?? undefined,
          difficulty: q.difficulty,
          boardSource: q.boardSource,
          isVerified: q.isVerified,
          status: ContentStatus.PUBLISHED,
          version: 1,
        },
      });
    }
  }

  // 2. Seed all Phase 2 expanded program tracks & questions cleanly
  for (const track of PHASE2_TRACK_SEEDS) {
    const subject = await prisma.subject.upsert({
      where: { code: track.subject.code },
      update: {
        nameBangla: track.subject.nameBangla,
        classLevel: track.subject.classLevel,
        program: track.subject.program,
        syllabusYear: track.subject.syllabusYear,
        isReady: track.subject.isReady,
      },
      create: track.subject,
    });

    const chapter = await prisma.chapter.upsert({
      where: {
        subjectId_orderIndex: {
          subjectId: subject.id,
          orderIndex: track.chapter.orderIndex,
        },
      },
      update: {
        titleBangla: track.chapter.titleBangla,
      },
      create: {
        id: track.chapter.id,
        subjectId: subject.id,
        orderIndex: track.chapter.orderIndex,
        titleBangla: track.chapter.titleBangla,
      },
    });

    for (const topicSeed of track.topics) {
      const topic = await prisma.topic.upsert({
        where: {
          chapterId_orderIndex: {
            chapterId: chapter.id,
            orderIndex: topicSeed.orderIndex,
          },
        },
        update: {
          titleBangla: topicSeed.titleBangla,
        },
        create: {
          id: topicSeed.id,
          chapterId: chapter.id,
          orderIndex: topicSeed.orderIndex,
          titleBangla: topicSeed.titleBangla,
        },
      });

      await prisma.lesson.upsert({
        where: { id: topicSeed.lesson.id },
        update: {
          topicId: topic.id,
          titleBangla: topicSeed.lesson.titleBangla,
          learningGoal: topicSeed.lesson.learningGoal,
          explanation: topicSeed.lesson.explanation,
          audioUrl: topicSeed.lesson.audioUrl,
          audioDurationSeconds: topicSeed.lesson.audioDurationSeconds,
          importantTerms: topicSeed.lesson.importantTerms,
          workedExample: topicSeed.lesson.workedExample,
          memoryAid: topicSeed.lesson.memoryAid,
          status: ContentStatus.PUBLISHED,
        },
        create: {
          id: topicSeed.lesson.id,
          topicId: topic.id,
          titleBangla: topicSeed.lesson.titleBangla,
          learningGoal: topicSeed.lesson.learningGoal,
          explanation: topicSeed.lesson.explanation,
          audioUrl: topicSeed.lesson.audioUrl,
          audioDurationSeconds: topicSeed.lesson.audioDurationSeconds,
          importantTerms: topicSeed.lesson.importantTerms,
          workedExample: topicSeed.lesson.workedExample,
          memoryAid: topicSeed.lesson.memoryAid,
          status: ContentStatus.PUBLISHED,
          version: 1,
        },
      });

      for (const q of topicSeed.questions) {
        await prisma.question.upsert({
          where: { id: q.id },
          update: {
            topicId: topic.id,
            type: q.type,
            stem: q.stem,
            options: q.options ?? undefined,
            explanation: q.explanation,
            cqRubric: q.cqRubric ?? undefined,
            difficulty: q.difficulty,
            boardSource: q.boardSource,
            isVerified: q.isVerified,
            status: ContentStatus.PUBLISHED,
          },
          create: {
            id: q.id,
            topicId: topic.id,
            type: q.type,
            stem: q.stem,
            options: q.options ?? undefined,
            explanation: q.explanation,
            cqRubric: q.cqRubric ?? undefined,
            difficulty: q.difficulty,
            boardSource: q.boardSource,
            isVerified: q.isVerified,
            status: ContentStatus.PUBLISHED,
            version: 1,
          },
        });
      }
    }
  }
}
