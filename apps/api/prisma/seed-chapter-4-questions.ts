import { ContentStatus } from '@prisma/client';
import { chapter4Batch2Questions } from './seed-chapter-4-questions-batch2';
import { chapter4Batch3Questions } from './seed-chapter-4-questions-batch3';

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
  } | null;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  boardSource?: string;
  isVerified: boolean;
  status: ContentStatus;
  version: number;
}

const batch1Questions: QuestionData[] = [
  // =========================================================================
  // Topic 4.1: কাজ (Work) [top_ssc_physics_ch4_1]
  // =========================================================================
  {
    id: 'q_ch4_1_mcq_1',
    topicId: 'top_ssc_physics_ch4_1',
    type: 'MCQ',
    stem: 'পদার্থবিজ্ঞানের সংজ্ঞানুযায়ী বল ($F$) এবং সরণের ($s$) মধ্যবর্তী কোণ কত হলে কৃতকাজের মান সর্বোচ্চ ধনাত্মক হবে?',
    options: [
      { id: 'opt_4_1_1a', text: '$\\theta = 0^\\circ$', isCorrect: true },
      { id: 'opt_4_1_1b', text: '$\\theta = 90^\\circ$', isCorrect: false },
      { id: 'opt_4_1_1c', text: '$\\theta = 180^\\circ$', isCorrect: false },
      { id: 'opt_4_1_1d', text: '$\\theta = 45^\\circ$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $\\theta = 0^\\circ$।',
      coreConcept: 'কৃতকাজের সমীকরণ $W = Fs \\cos\\theta$। বল ও সরণ যখন একই সরলরেখা বরাবর একই দিকে ঘটে, তখন $\\theta = 0^\\circ$ এবং $\\cos 0^\\circ = 1$, ফলে কাজের মান সর্বোচ্চ ধনাত্মক ($W = Fs$) হয়।',
      stepDerivation: '$$W = Fs \\cos\\theta$$\nযদি $\\theta = 0^\\circ$ হয়, তবে $\\cos 0^\\circ = 1$ $\\implies W = Fs$ (সর্বোচ্চ ধনাত্মক কাজ)।\nযদি $\\theta = 90^\\circ$ হয়, তবে $\\cos 90^\\circ = 0$ $\\implies W = 0$ (কাজহীন বল)।\nযদি $\\theta = 180^\\circ$ হয়, তবে $\\cos 180^\\circ = -1$ $\\implies W = -Fs$ (সর্বোচ্চ ঋণাত্মক কাজ)।',
      distractorAnalysis: {
        opt_4_1_1b: '$\\theta = 90^\\circ$ হলে $\\cos 90^\\circ = 0$, ফলে কৃতকাজ শূন্য হয় (যেমন কেন্দ্রমুখী বল)।',
        opt_4_1_1c: '$\\theta = 180^\\circ$ হলে কৃতকাজ সর্বোচ্চ ঋণাত্মক হয় (যেমন ঘর্ষণ বলের কাজ)।',
        opt_4_1_1d: '$\\theta = 45^\\circ$ হলে $\\cos 45^\\circ = 0.707$, যা সর্বোচ্চ নয়।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 98,
      },
      proTipShortcut: '$\\theta = 0^\\circ \\implies W_{\\max} = +Fs$ | $\\theta = 90^\\circ \\implies W = 0$ | $\\theta = 180^\\circ \\implies W = -Fs$।',
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_1_mcq_2',
    topicId: 'top_ssc_physics_ch4_1',
    type: 'MCQ',
    stem: 'সূর্যকে কেন্দ্র করে ঘূর্ণায়মান পৃথিবীর ক্ষেত্রে মহাকর্ষ বল দ্বারা কৃতকাজ শূন্য হওয়ার সঠিক বৈজ্ঞানিক কারণ কোনটি?',
    options: [
      { id: 'opt_4_1_2a', text: 'মহাকর্ষ বল ও তাৎক্ষণিক সরণ পরস্পর লম্ব ($90^\\circ$) থাকায়', isCorrect: true },
      { id: 'opt_4_1_2b', text: 'মহাকর্ষ বলের মান মহাশূন্যে শূন্য হওয়ার কারণে', isCorrect: false },
      { id: 'opt_4_1_2c', text: 'পৃথিবীর গতিশক্তি অবিরাম হ্রাস পাওয়ার কারণে', isCorrect: false },
      { id: 'opt_4_1_2d', text: 'মহাশূন্যে ঘর্ষণ বল সর্বোচ্চ থাকায়', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: মহাকর্ষ বল ও তাৎক্ষণিক সরণ পরস্পর লম্ব ($90^\\circ$) থাকায়।',
      coreConcept: 'বৃত্তাকার কক্ষপথে ঘূর্ণনের সময় কেন্দ্রমুখী মহাকর্ষ বল কেন্দ্রের দিকে কাজ করে এবং স্পর্শকীয় সরণ তার সাথে ঠিক $90^\\circ$ কোণে থাকে। $W = Fs \\cos 90^\\circ = 0$।',
      stepDerivation: 'যেহেতু বল ও সরণের মধ্যবর্তী কোণ $\\theta = 90^\\circ$, তাই কৃতকাজ:\n$$W = Fs \\cos 90^\\circ = Fs \\times 0 = 0$$\nতাই কেন্দ্রমুখী বলকে "কাজহীন বল" (Zero-work force) বলা হয়।',
      distractorAnalysis: {
        opt_4_1_2b: 'সূর্য ও পৃথিবীর মধ্যে বিপুল পরিমাণ মহাকর্ষ বল সক্রিয় থাকে, এটি শূন্য নয়।',
        opt_4_1_2c: 'পৃথিবীর গড় গতিশক্তি প্রায় ধ্রুব থাকে।',
        opt_4_1_2d: 'মহাশূন্য শূন্যস্থান হওয়ায় সান্দ্র ঘর্ষণ কার্যত শূন্য।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 99,
      },
      proTipShortcut: 'বৃত্তাকার পথে কেন্দ্রমুখী বল সর্বদা সরণের ওপর লম্ব $\\implies W = 0$ (কাজহীন বল)।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Rajshahi Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_1_mcq_3',
    topicId: 'top_ssc_physics_ch4_1',
    type: 'MCQ',
    stem: 'একজন ব্যক্তি $10\\text{ kg}$ ভরের একটি বাক্স হাতে ধরে সমতল মেঝে বরাবর $15\\text{ m}$ হেঁটে গেলেন। অভিকর্ষ বলের দ্বারা কৃতকাজের মান কত?',
    options: [
      { id: 'opt_4_1_3a', text: '$0\\text{ J}$', isCorrect: true },
      { id: 'opt_4_1_3b', text: '$150\\text{ J}$', isCorrect: false },
      { id: 'opt_4_1_3c', text: '$1470\\text{ J}$', isCorrect: false },
      { id: 'opt_4_1_3d', text: '$98\\text{ J}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $0\\text{ J}$।',
      coreConcept: 'অভিকর্ষ বলের দিক সর্বদা পৃথিবীর কেন্দ্রের দিকে অর্থাৎ উলম্বভাবে নিচের দিকে। মেঝের সমান্তরালে অনুভূমিকভাবে হাঁটার কারণে অভিকর্ষ বল ও সরণের মধ্যবর্তী কোণ $\\theta = 90^\\circ$।',
      stepDerivation: 'এখানে:\nঅভিকর্ষ বল $F = mg = 10 \\times 9.8 = 98\\text{ N}$ (খাড়া নিম্নমুখী)\nসরণ $s = 15\\text{ m}$ (অনুভূমিক)\nবল ও সরণের মধ্যবর্তী কোণ $\\theta = 90^\\circ$\n$$W = Fs \\cos 90^\\circ = 98 \\times 15 \\times 0 = 0\\text{ J}$$',
      distractorAnalysis: {
        opt_4_1_3b: 'এটি ভুল সূত্র $m \\times s$ প্রয়োগ করে প্রাপ্ত।',
        opt_4_1_3c: '$10 \\times 9.8 \\times 15 = 1470\\text{ J}$ হতো যদি বস্তুটিকে খাড়া $15\\text{ m}$ ওপরে তোলা হতো।',
        opt_4_1_3d: 'এটি কেবল বাক্সের ওজন ($mg = 98\\text{ N}$)।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 100,
      },
      proTipShortcut: 'মাথায় বা হাতে বোঝা নিয়ে অনুভূমিক রাস্তায় হাঁটলে অভিকর্ষের বিরুদ্ধে কৃতকাজ সর্বদা $0\\text{ J}$।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Chattogram Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_1_mcq_4',
    topicId: 'top_ssc_physics_ch4_1',
    type: 'MCQ',
    stem: '$50\\text{ kg}$ ভরের একজন শিক্ষার্থী প্রতিটি $15\\text{ cm}$ উচ্চতার ২০টি সিঁড়ি বেয়ে ছাদে উঠল। অভিকর্ষ বলের বিরুদ্ধে তার কৃতকাজ কত? ($g = 9.8\\text{ m/s}^2$)',
    options: [
      { id: 'opt_4_1_4a', text: '$1470\\text{ J}$', isCorrect: true },
      { id: 'opt_4_1_4b', text: '$7350\\text{ J}$', isCorrect: false },
      { id: 'opt_4_1_4c', text: '$1500\\text{ J}$', isCorrect: false },
      { id: 'opt_4_1_4d', text: '$150\\text{ J}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $1470\\text{ J}$।',
      coreConcept: 'সিঁড়ি বেয়ে ওঠার সময় কৃতকাজ শুধুমাত্র উলম্ব উচ্চতার ($h$) ওপর নির্ভর করে। $W = mgh$।',
      stepDerivation: 'মোট সিঁড়ির সংখ্যা $n = 20$\nপ্রতিটি সিঁড়ির উচ্চতা $= 15\\text{ cm} = 0.15\\text{ m}$\nমোট উলম্ব উচ্চতা $h = 20 \\times 0.15 = 3.0\\text{ m}$\nভর $m = 50\\text{ kg}$, $g = 9.8\\text{ m/s}^2$\n$$W = mgh = 50 \\times 9.8 \\times 3.0 = 1470\\text{ J}$$',
      distractorAnalysis: {
        opt_4_1_4b: 'উচ্চতাকে মিটার না বানিয়ে সেন্টিমিটার দিয়ে গুণ করলে ভুল উত্তর $147000$ এর বিভ্রান্তিকর রূপ।',
        opt_4_1_4c: '$g = 10\\text{ m/s}^2$ ধরে হিসাব করলে $1500\\text{ J}$ আসে, কিন্তু স্ট্যান্ডার্ড মান $9.8\\text{ m/s}^2$।',
        opt_4_1_4d: 'একক ও স্কেলিং রূপান্তরের গুরুতর ভুল।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 101,
      },
      proTipShortcut: 'সিঁড়ির মোট উচ্চতা $h = n \\times \\text{ধাপ উচ্চতা (m)}$ এবং কৃতকাজ $W = mgh$।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Cumilla Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_1_mcq_5',
    topicId: 'top_ssc_physics_ch4_1',
    type: 'MCQ',
    stem: 'কাজের মাত্রা সমীকরণ এবং এসআই একক যথাক্রমে কোনটি?',
    options: [
      { id: 'opt_4_1_5a', text: '$[ML^2T^{-2}]$ এবং জুল (J)', isCorrect: true },
      { id: 'opt_4_1_5b', text: '$[MLT^{-2}]$ এবং নিউটন (N)', isCorrect: false },
      { id: 'opt_4_1_5c', text: '$[ML^2T^{-3}]$ এবং ওয়াট (W)', isCorrect: false },
      { id: 'opt_4_1_5d', text: '$[MLT^{-1}]$ এবং নিউটন-সেকেন্ড (N·s)', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $[ML^2T^{-2}]$ এবং জুল (J)।',
      coreConcept: 'কাজ = বল × সরণ। বলের মাত্রা $[MLT^{-2}]$ এবং সরণের মাত্রা $[L]$। সুতরাং কাজের মাত্রা $[MLT^{-2}] \\times [L] = [ML^2T^{-2}]$।',
      stepDerivation: 'কাজ $W = F \\times s$\nএকক: $\\text{N} \\times \\text{m} = \\text{kg}\\cdot\\text{m/s}^2 \\times \\text{m} = \\text{kg}\\cdot\\text{m}^2\\text{s}^{-2} = \\text{Joule (J)}$।\nমাত্রা: $[W] = [F][s] = [MLT^{-2}][L] = [ML^2T^{-2}]$।',
      distractorAnalysis: {
        opt_4_1_5b: 'এটি বলের মাত্রা ($[MLT^{-2}]$) এবং একক (নিউটন)।',
        opt_4_1_5c: 'এটি ক্ষমতার মাত্রা ($[ML^2T^{-3}]$) এবং একক (ওয়াট)।',
        opt_4_1_5d: 'এটি ভরবেগের মাত্রা ($[MLT^{-1}]$) এবং একক (N·s)।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 98,
      },
      proTipShortcut: 'কাজ ও শক্তির মাত্রা হুবহু অভিন্ন: $[ML^2T^{-2}]$, একক জুল ($1\\text{ J} = 1\\text{ N}\\cdot\\text{m}$)।',
    },
    difficulty: 'EASY',
    boardSource: 'Jessore Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_1_cq_1',
    topicId: 'top_ssc_physics_ch4_1',
    type: 'CQ_CREATIVE',
    stem: 'উদ্দীপক: ৫০ কেজি ভরের সাকিব ৩০ কেজি ভরের একটি চালের বস্তা কাঁধে নিয়ে ২৫ সেন্টিমিটার উচ্চতার ২০টি সিঁড়ি বেয়ে ২০ সেকেন্ডে ছাদে উঠল। ছাদে পৌঁছানোর পর সে অনুভূমিক মেঝে বরাবর বস্তাটি কাঁধে নিয়ে ১৫ মিটার হেঁটে একটি কক্ষে রাখল। মেঝেতে বস্তাটি রাখার সময় ঘর্ষণ বল ছিল ১০ নিউটন।\n\nক. কাজ কাকে বলে? [১]\nখ. পৃথিবীর চারদিকে চাঁদের ঘূর্ণনে মহাকর্ষ বল কোনো কাজ করে না কেন? [২]\nগ. সিঁড়ি দিয়ে ছাদে ওঠার সময় সাকিবের মোট কৃতকাজের মান নির্ণয় করো। [৩]\nঘ. ছাদে অনুভূমিকভাবে ১৫ মিটার হাঁটার সময় সাকিব কর্তৃক অভিকর্ষ বল ও ঘর্ষণ বলের বিরুদ্ধে কৃতকাজের গাণিতিক তুলনা করো। [৪]',
    options: null,
    explanation: {
      directAnswer: 'গ. সিঁড়ি বেয়ে ওঠার সময় মোট কৃতকাজ ৩৯২০ জুল। ঘ. অনুভূমিক হাঁটায় অভিকর্ষের বিরুদ্ধে কাজ ০ জুল এবং ঘর্ষণ বলের বিরুদ্ধে কাজ ১৫০ জুল।',
      coreConcept: 'উলম্ব সরণে অভিকর্ষের বিরুদ্ধে কৃতকাজ $W = mgh$ যেখানে মোট ভর সাকিব ও বস্তার ভরের যোগফল। অনুভূমিক সরণে অভিকর্ষ বলের দিক $90^\\circ$ হওয়ায় অভিকর্ষীয় কাজ শূন্য, কিন্তু ঘর্ষণ গতির বিপরীতমুখী ($180^\\circ$) হওয়ায় ঘর্ষণ বলের বিরুদ্ধে কাজ $Fs$।',
      stepDerivation: 'গ. মোট ভর $M = 50\\text{ kg} + 30\\text{ kg} = 80\\text{ kg}$।\nমোট সিঁড়ির উচ্চতা $h = 20 \\times 0.25\\text{ m} = 5.0\\text{ m}$।\nসিঁড়ি বেয়ে ওঠার সময় কৃতকাজ:\n$$W_1 = Mgh = 80 \\times 9.8 \\times 5.0 = 3920\\text{ J}$$\n\nঘ. অনুভূমিক ১৫ মিটার সরণে:\n(i) অভিকর্ষ বলের ক্ষেত্রে: অভিকর্ষ বল উলম্ব নিম্নমুখী, আর সরণ অনুভূমিক। মধ্যবর্তী কোণ $\\theta = 90^\\circ$।\n$$W_{\\text{gravity}} = Fs \\cos 90^\\circ = 80 \\times 9.8 \\times 15 \\times 0 = 0\\text{ J}$$\n(ii) ঘর্ষণ বলের বিরুদ্ধে কৃতকাজ:\nঘর্ষণ বল গতির বিপরীতমুখী ($f_k = 10\\text{ N}$)। ঘর্ষণ বলের বিরুদ্ধে সাকিবের প্রযুক্ত বল $F = 10\\text{ N}$ (গতির অভিমুখে)।\n$$W_{\\text{friction}} = f_k \\times s = 10 \\times 15 = 150\\text{ J}$$\nতুলনা: অভিকর্ষ বলের বিরুদ্ধে কৃতকাজ $0\\text{ J}$, কিন্তু ঘর্ষণ বলের বিরুদ্ধে কৃতকাজ $150\\text{ J}$। অর্থাৎ অনুভূমিক সরণে কেবল ঘর্ষণ বলের বিপক্ষেই শক্তি ব্যয় হয়।',
      distractorAnalysis: undefined,
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 98,
      },
      proTipShortcut: 'সিঁড়িতে $W = (m_1 + m_2)gh$ | অনুভূমিক হাঁটায় অভিকর্ষীয় কাজ $0\\text{ J}$ | ঘর্ষণে কাজ $f \\times s$।',
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'জ্ঞানমূলক (১ নম্বর): বল ও বলের অভিমুখে সরণের উপাংশের গুণফলকে কাজ বলে—সঠিক সংজ্ঞায় পূর্ণ ১ নম্বর।' },
      kha: { mark: 2, criteria: 'অনুধাবনমূলক (২ নম্বর): কেন্দ্রমুখী মহাকর্ষ বল ও সরণের মধ্যবর্তী কোণ ৯০° এবং cos 90° = 0 হওয়ার সম্পর্ক সুস্পষ্ট ব্যাখ্যায় পূর্ণ ২ নম্বর।' },
      ga: { mark: 3, criteria: 'প্রয়োগমূলক (৩ নম্বর): মোট ভর ৮০ কেজি ও উচ্চতা ৫ মিটার বের করে W = Mgh = ৩৯২০ জুল সঠিকভাবে নির্ণয় করলে পূর্ণ ৩ নম্বর।' },
      gha: { mark: 4, criteria: 'উচ্চতর দক্ষতামূলক (৪ নম্বর): অনুভূমিক পথে কোণ ৯০° হেতু অভিকর্ষীয় কাজ শূন্য এবং ঘর্ষণের বিরুদ্ধে কাজ ১৫০ জুল আলাদা হিসাব করে যৌক্তিক তুলনামূলক বিশ্লেষণে পূর্ণ ৪ নম্বর।' },
    },
    difficulty: 'HARD',
    boardSource: 'Dhaka Board 2024 Model',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 4.2: শক্তি ও শক্তির বিভিন্ন রূপ [top_ssc_physics_ch4_2]
  // =========================================================================
  {
    id: 'q_ch4_2_mcq_1',
    topicId: 'top_ssc_physics_ch4_2',
    type: 'MCQ',
    stem: 'কাজ-শক্তি উপপাদ্য (Work-Energy Principle) অনুযায়ী কোনো বস্তুর ওপর প্রযুক্ত নিট বল দ্বারা কৃতকাজ কার সমান?',
    options: [
      { id: 'opt_4_2_1a', text: 'বস্তুর গতিশক্তির পরিবর্তনের সমান ($W = \\Delta E_k$)', isCorrect: true },
      { id: 'opt_4_2_1b', text: 'বস্তুর ভরবেগের পরিবর্তনের সমান ($W = \\Delta p$)', isCorrect: false },
      { id: 'opt_4_2_1c', text: 'বস্তুর ত্বরণের পরিবর্তনের সমান', isCorrect: false },
      { id: 'opt_4_2_1d', text: 'বস্তুর ভরের পরিবর্তনের সমান', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: বস্তুর গতিশক্তির পরিবর্তনের সমান ($W = \\Delta E_k$)।',
      coreConcept: 'কোনো বস্তুর ওপর বাহ্যিক নিট বল প্রয়োগ করলে বস্তুর গতির পরিবর্তন ঘটে। সেই বল দ্বারা কৃতকাজ বস্তুর গতিশক্তির পরিবর্তনের সমান হয়, একে কাজ-শক্তি উপপাদ্য বলে।',
      stepDerivation: '$$W = Fs = (ma)s = m(as)$$\nগতির ৩য় সমীকরণ $v^2 = u^2 + 2as \\implies as = \\frac{v^2 - u^2}{2}$।\n$$W = m \\left( \\frac{v^2 - u^2}{2} \\right) = \\frac{1}{2}mv^2 - \\frac{1}{2}mu^2 = E_{kf} - E_{ki} = \\Delta E_k$$',
      distractorAnalysis: {
        opt_4_2_1b: 'ভরবেগের পরিবর্তন বলের ঘাতের সমান ($J = \\Delta p$), কাজের সমান নয়।',
        opt_4_2_1c: 'ত্বরণ বল ও ভরের অনুপাত ($F/m$), কাজের পরিমাপ নয়।',
        opt_4_2_1d: 'ধ্রুপদী বলবিদ্যায় বস্তুর ভর স্থির থাকে।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 103,
      },
      proTipShortcut: 'কৃতকাজ = গতিশক্তির পরিবর্তন: $W = \\Delta E_k = \\frac{1}{2}m(v^2 - u^2)$।',
    },
    difficulty: 'EASY',
    boardSource: 'Dinajpur Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_2_mcq_2',
    topicId: 'top_ssc_physics_ch4_2',
    type: 'MCQ',
    stem: 'পৃথিবীতে প্রাপ্ত প্রায় সকল প্রকার শক্তির প্রত্যক্ষ বা পরোক্ষ মূল প্রাথমিক উৎস কোনটি?',
    options: [
      { id: 'opt_4_2_2a', text: 'সূর্য (Sun)', isCorrect: true },
      { id: 'opt_4_2_2b', text: 'ভূ-অভ্যন্তরীণ তাপ (Geothermal)', isCorrect: false },
      { id: 'opt_4_2_2c', text: 'কয়লা ও প্রাকৃতিক গ্যাস', isCorrect: false },
      { id: 'opt_4_2_2d', text: 'চাঁদের মহাকর্ষ বল', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: সূর্য (Sun)।',
      coreConcept: 'সৌরশক্তি থেকে সালোকসংশ্লেষণের মাধ্যমে উদ্ভিদ খাদ্য ও জীবাশ্ম জ্বালানি তৈরি করে, বায়ুপ্রবাহ ও বৃষ্টিপাত ঘটায় যা জলবিদ্যুৎ উৎপাদনে ব্যবহৃত হয়। অতএব সূর্যই সকল শক্তির প্রধান উৎস।',
      stepDerivation: 'সূর্য $\\to$ সালোকসংশ্লেষণ $\\to$ উদ্ভিজ্জ পদার্থ $\\to$ ভূগর্ভে চাপ ও তাপে কোটি কোটি বছর পর কয়লা/পেট্রোলিয়াম।\nসূর্য $\\to$ বায়ুমণ্ডলের অসমান উত্তাপ $\\to$ বায়ুপ্রবাহ (বায়ুশক্তি) $\\to$ পানিচক্র $\\to$ বৃষ্টিপাত $\\to$ জলবিদ্যুৎ।',
      distractorAnalysis: {
        opt_4_2_2b: 'ভূ-অভ্যন্তরীণ তাপ একটি সীমিত উৎস, সার্বজনীন মূল উৎস নয়।',
        opt_4_2_2c: 'কয়লা ও গ্যাস পরোক্ষভাবে সূর্যের সঞ্চিত জৈব রাসায়নিক শক্তি।',
        opt_4_2_2d: 'চাঁদের আকর্ষণ কেবল জোয়ার-ভাটার সৃষ্টি করে।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 104,
      },
      proTipShortcut: 'সৌরশক্তিই পৃথিবীর চালিকাশক্তি—জীবাশ্ম, বায়ু, জলবিদ্যুৎ সবেরই আদি উৎস সূর্য।',
    },
    difficulty: 'EASY',
    boardSource: 'Mymensingh Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_2_mcq_3',
    topicId: 'top_ssc_physics_ch4_2',
    type: 'MCQ',
    stem: 'একটি বৈদ্যুতিক হিটার $2000\\text{ W}$ ক্ষমতাসম্পন্ন। হিটারটি ১ ঘণ্টা চললে তা কত জুল তড়িৎ শক্তিকে তাপ শক্তিতে রূপান্তর করবে?',
    options: [
      { id: 'opt_4_2_3a', text: '$7.2 \\times 10^6\\text{ J}$', isCorrect: true },
      { id: 'opt_4_2_3b', text: '$2.0 \\times 10^3\\text{ J}$', isCorrect: false },
      { id: 'opt_4_2_3c', text: '$1.2 \\times 10^5\\text{ J}$', isCorrect: false },
      { id: 'opt_4_2_3d', text: '$3.6 \\times 10^6\\text{ J}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $7.2 \\times 10^6\\text{ J}$।',
      coreConcept: 'ব্যয়িত শক্তি $E = P \\times t$। সময়কে সর্বদা সেকেন্ড এককে রূপান্তর করতে হবে। $1\\text{ hour} = 3600\\text{ s}$।',
      stepDerivation: 'ক্ষমতা $P = 2000\\text{ W}$\nসময় $t = 1\\text{ h} = 3600\\text{ s}$\nব্যয়িত শক্তি:\n$$E = P \\times t = 2000 \\times 3600 = 7,200,000\\text{ J} = 7.2 \\times 10^6\\text{ J} = 7.2\\text{ MJ}$$',
      distractorAnalysis: {
        opt_4_2_3b: 'এটি ১ সেকেন্ডে ব্যয়িত শক্তি ($2000\\text{ J}$)।',
        opt_4_2_3c: 'মিনিট দিয়ে গুণ করলে ($2000 \\times 60 = 1.2 \\times 10^5\\text{ J}$) যা সেকেন্ড এককে হয়নি।',
        opt_4_2_3d: 'এটি $1000\\text{ W}$ এর জন্য মান ($1\\text{ kWh} = 3.6 \\times 10^6\\text{ J}$)।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 105,
      },
      proTipShortcut: '$1\\text{ kWh} = 3.6 \\times 10^6\\text{ J}$। এখানে $2\\text{ kW} \\times 1\\text{ h} = 2\\text{ kWh} = 7.2 \\times 10^6\\text{ J}$।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Sylhet Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_2_mcq_4',
    topicId: 'top_ssc_physics_ch4_2',
    type: 'MCQ',
    stem: 'মাইক্রোফোনে কথা বলার সময় শক্তির কোন রূপান্তরটি সংঘটিত হয়?',
    options: [
      { id: 'opt_4_2_4a', text: 'শব্দ শক্তি থেকে তড়িৎ শক্তিতে', isCorrect: true },
      { id: 'opt_4_2_4b', text: 'তড়িৎ শক্তি থেকে শব্দ শক্তিতে', isCorrect: false },
      { id: 'opt_4_2_4c', text: 'যান্ত্রিক শক্তি থেকে চৌম্বক শক্তিতে', isCorrect: false },
      { id: 'opt_4_2_4d', text: 'আলোক শক্তি থেকে শব্দ শক্তিতে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: শব্দ শক্তি থেকে তড়িৎ শক্তিতে।',
      coreConcept: 'মাইক্রোফোনের ডায়াফ্রামে শব্দ তরঙ্গ আঘাত করলে তা কম্পিত হয় এবং তাড়িতচৌম্বক আবেশ নীতির মাধ্যমে শব্দ সংকেত তড়িৎ সংকেতে রূপান্তরিত হয়।',
      stepDerivation: 'মাইক্রোফোন: শব্দ শক্তি $\\to$ তড়িৎ শক্তি।\nলাউডস্পিকার: তড়িৎ শক্তি $\\to$ শব্দ শক্তি।',
      distractorAnalysis: {
        opt_4_2_4b: 'তড়িৎ শক্তি থেকে শব্দ শক্তিতে রূপান্তর ঘটায় লাউডস্পিকার।',
        opt_4_2_4c: 'ডায়নামো বা জেনারেটর যান্ত্রিক শক্তিকে তড়িৎ শক্তিতে রূপান্তর করে।',
        opt_4_2_4d: 'এটি বাস্তব ডিভাইসের রূপান্তর নয়।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 106,
      },
      proTipShortcut: 'মাইক্রোফোন: শব্দ $\\to$ তড়িৎ | লাউডস্পিকার: তড়িৎ $\\to$ শব্দ।',
    },
    difficulty: 'EASY',
    boardSource: 'Barishal Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_2_mcq_5',
    topicId: 'top_ssc_physics_ch4_2',
    type: 'MCQ',
    stem: 'ড্রাইসেল বা ব্যাটারিতে রাসায়নিক বিক্রিয়ার মাধ্যমে শক্তি কোন রূপে সঞ্চিত ও রূপান্তরিত হয়?',
    options: [
      { id: 'opt_4_2_5a', text: 'রাসায়নিক শক্তি তড়িৎ শক্তিতে রূপান্তরিত হয়', isCorrect: true },
      { id: 'opt_4_2_5b', text: 'পারমাণবিক শক্তি আলোক শক্তিতে রূপান্তরিত হয়', isCorrect: false },
      { id: 'opt_4_2_5c', text: 'গতিশক্তি চৌম্বক শক্তিতে রূপান্তরিত হয়', isCorrect: false },
      { id: 'opt_4_2_5d', text: 'শব্দ শক্তি তাপ শক্তিতে রূপান্তরিত হয়', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: রাসায়নিক শক্তি তড়িৎ শক্তিতে রূপান্তরিত হয়।',
      coreConcept: 'ড্রাইসেলের অ্যানোড ও ক্যাথোডের মাঝে রাসায়নিক বিক্রিয়া ঘটে ইলেকট্রন প্রবাহ সৃষ্টি করে, অর্থাৎ সঞ্চিত রাসায়নিক শক্তি তড়িৎ শক্তিতে রূপান্তরিত হয়।',
      stepDerivation: 'ড্রাইসেল / ব্যাটারি: রাসায়নিক শক্তি $\\to$ তড়িৎ শক্তি।\nইলেকট্রোপ্লেটিং বা ব্যাটারি চার্জিং: তড়িৎ শক্তি $\\to$ রাসায়নিক শক্তি।',
      distractorAnalysis: {
        opt_4_2_5b: 'পারমাণবিক বিদ্যুৎকেন্দ্রে নিউক্লীয় শক্তি রূপান্তরিত হয়।',
        opt_4_2_5c: 'তড়িৎ মোটরে তড়িৎ শক্তি যান্ত্রিক শক্তিতে রূপান্তরিত হয়।',
        opt_4_2_5d: 'এটি ড্রাইসেলের কার্যপ্রণালী নয়।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 107,
      },
      proTipShortcut: 'ব্যাটারি ছাড়লে রাসায়নিক $\\to$ তড়িৎ; চার্জ দিলে তড়িৎ $\\to$ রাসায়নিক।',
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_2_cq_1',
    topicId: 'top_ssc_physics_ch4_2',
    type: 'CQ_CREATIVE',
    stem: 'উদ্দীপক: একটি পাহাড়ি নদী থেকে প্রতি সেকেন্ডে ২০০০ কেজি পানি ৫০ মিটার উঁচু জলপ্রপাত বেয়ে নিচে টারবাইনের ব্লেডে আছড়ে পড়ছে। এই জলবিদ্যুৎ কেন্দ্রের জেনারেটর যান্ত্রিক শক্তিকে তড়িৎ শক্তিতে রূপান্তর করে স্থানীয় গ্রিডে সরবরাহ করে। একটি সৌরবিদ্যুৎ কেন্দ্রও একই এলাকায় দিনে গড়ে ৮ ঘণ্টা কাজ করে সমপরিমাণ দৈনিক শক্তি সরবরাহ করতে পারে।\n\nক. কাজ-শক্তি উপপাদ্যটি বিবৃত করো। [১]\nখ. জীবাশ্ম জ্বালানিকে কেন সূর্যের পরোক্ষ শক্তি বলা হয়? [২]\nগ. জলপ্রপাত থেকে প্রতি সেকেন্ডে উৎপাদিত সর্বাধিক তাত্ত্বিক শক্তির পরিমাণ জুল এককে নির্ণয় করো। [৩]\nঘ. উদ্দীপকে উল্লিখিত জলবিদ্যুৎ ও সৌরবিদ্যুৎ উভয়ই নবায়নযোগ্য হওয়া সত্ত্বেও এদের পরিবেশগত প্রভাব ও নির্ভরযোগ্যতার তুলনামূলক বিশ্লেষণ করো। [৪]',
    options: null,
    explanation: {
      directAnswer: 'গ. প্রতি সেকেন্ডে উৎপাদিত সর্বাধিক তাত্ত্বিক শক্তি ৯৮০ কিলোজুল ($9.8 \\times 10^5\\text{ J}$)। ঘ. সৌরশক্তি পরিবেশবান্ধব কিন্তু সূর্যালোকের ওপর নির্ভরশীল; জলবিদ্যুৎ অবিরত বিদ্যুৎ দেয় কিন্তু বাঁধের কারণে নদীভাঙন ও প্রতিবেশে প্রভাব ফেলে।',
      coreConcept: 'উচ্চতা থেকে পড়ন্ত পানির বিভবশক্তি ($E_p = mgh$) গতিশক্তিতে এবং পরবর্তীতে টারবাইন ও জেনারেটরের মাধ্যমে তড়িৎ শক্তিতে রূপান্তরিত হয়।',
      stepDerivation: 'গ. প্রতি সেকেন্ডে পানির ভর $m = 2000\\text{ kg}$।\nপতনের উচ্চতা $h = 50\\text{ m}$।\nপ্রতি সেকেন্ডে ব্যয়িত বিভবশক্তি:\n$$E = mgh = 2000 \\times 9.8 \\times 50 = 980,000\\text{ J} = 9.8 \\times 10^5\\text{ J} = 980\\text{ kJ}$$\nসুতরাং প্রতি সেকেন্ডে সর্বাধিক তাত্ত্বিক শক্তির পরিমাণ $9.8 \\times 10^5\\text{ J}$।\n\nঘ. তুলনামূলক পরিবেশগত ও কারিগরি বিশ্লেষণ:\n(১) জলবিদ্যুৎ:\n- ইতিবাচক: ২৪ ঘণ্টা একটানা বেসলোড বিদ্যুৎ দিতে পারে এবং কোনো গ্রিনহাউস গ্যাস নির্গমন করে না।\n- নেতিবাচক: নদী শাসন ও বাঁধ নির্মাণের ফলে উজানে বিপুল এলাকা প্লাবিত হয়, মাছের প্রজনন ব্যাহত হয় এবং ভাটি অঞ্চলে পলল জমে বাস্তুতন্ত্রের ক্ষতি হয়।\n(২) সৌরবিদ্যুৎ:\n- ইতিবাচক: স্থানীয় প্রতিবেশে কোনো বিরূপ প্রভাব ফেলে না, নীরব এবং কোনো চলমান যন্ত্রাংশ নেই।\n- নেতিবাচক: রাতে ও মেঘলা দিনে বিদ্যুৎ উৎপাদন বন্ধ থাকে, ফলে ব্যাটারি স্টোরেজ প্রয়োজন যা ব্যয়বহুল।\nসিদ্ধান্ত: পরিবেশগত ভারসাম্যের বিচারে সৌরবিদ্যুৎ এগিয়ে থাকলেও সার্বক্ষণিক নির্ভরযোগ্যতায় জলবিদ্যুৎ অধিক কার্যকর।',
      distractorAnalysis: undefined,
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 104,
      },
      proTipShortcut: 'পড়ন্ত পানির শক্তি $E = mgh$ | সৌরশক্তি দূষণমুক্ত কিন্তু সবিরাম; জলবিদ্যুৎ সার্বক্ষণিক কিন্তু বাস্তুতান্ত্রিক ঝুঁকিযুক্ত।',
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'জ্ঞানমূলক (১ নম্বর): কোনো বস্তুর ওপর প্রযুক্ত নিট বল দ্বারা কৃতকাজ তার গতিশক্তির পরিবর্তনের সমান—সঠিক বিবৃতি দিলে পূর্ণ ১ নম্বর।' },
      kha: { mark: 2, criteria: 'অনুধাবনমূলক (২ নম্বর): উদ্ভিদের সালোকসংশ্লেষণ থেকে জৈব ভর তৈরি ও কোটি বছর চাপে কয়লা-তেলে রূপান্তরের ধারাবাহিক ব্যাখ্যায় পূর্ণ ২ নম্বর।' },
      ga: { mark: 3, criteria: 'প্রয়োগমূলক (৩ নম্বর): E = mgh = ২০০০ × ৯.৮ × ৫০ = ৯৮০,০০০ জুল সঠিকভাবে নির্ণয় করলে পূর্ণ ৩ নম্বর।' },
      gha: { mark: 4, criteria: 'উচ্চতর দক্ষতামূলক (৪ নম্বর): কার্বন নির্গমন, নদী বাঁধের প্রতিবেশগত প্রভাব এবং আবহাওয়া নির্ভরতার যৌক্তিক তুলনামূলক বিশ্লেষণে পূর্ণ ৪ নম্বর।' },
    },
    difficulty: 'HARD',
    boardSource: 'Chattogram Board 2024 Model',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 4.3: গতিশক্তি ও বিভবশক্তি [top_ssc_physics_ch4_3]
  // =========================================================================
  {
    id: 'q_ch4_3_mcq_1',
    topicId: 'top_ssc_physics_ch4_3',
    type: 'MCQ',
    stem: 'কোনো গতিশীল বস্তুর বেগ ৩ গুণ বৃদ্ধি করা হলে তার গতিশক্তি কত গুণ বৃদ্ধি পাবে?',
    options: [
      { id: 'opt_4_3_1a', text: '৯ গুণ', isCorrect: true },
      { id: 'opt_4_3_1b', text: '৩ গুণ', isCorrect: false },
      { id: 'opt_4_3_1c', text: '৬ গুণ', isCorrect: false },
      { id: 'opt_4_3_1d', text: '২৭ গুণ', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: ৯ গুণ।',
      coreConcept: 'গতিশক্তি বেগের বর্গের সমানুপাতিক ($E_k \\propto v^2$)। অতএব বেগ ৩ গুণ হলে গতিশক্তি $3^2 = 9$ গুণ হবে।',
      stepDerivation: 'আদি গতিশক্তি $E_{k1} = \\frac{1}{2}mv^2$\nনতুন বেগ $v\' = 3v$\nনতুন গতিশক্তি $E_{k2} = \\frac{1}{2}m(3v)^2 = \\frac{1}{2}m(9v^2) = 9 \\times \\left( \\frac{1}{2}mv^2 \\right) = 9E_{k1}$',
      distractorAnalysis: {
        opt_4_3_1b: 'ভরবেগ বেগের সমানুপাতিক ($p \\propto v$), তাই ভরবেগ ৩ গুণ হতো।',
        opt_4_3_1c: 'বর্গের জায়গায় ২ দিয়ে গুণ করার বিভ্রান্তি।',
        opt_4_3_1d: 'ঘন ($3^3$) করার ভুল।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 108,
      },
      proTipShortcut: '$E_k \\propto v^2 \\implies v$ দ্বিগুণ হলে $E_k$ ৪ গুণ, $v$ ৩ গুণ হলে $E_k$ ৯ গুণ।',
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_3_mcq_2',
    topicId: 'top_ssc_physics_ch4_3',
    type: 'MCQ',
    stem: 'একটি বস্তুর ভর $m$ এবং রৈখিক ভরবেগ $p$ হলে তার গতিশক্তি ($E_k$) প্রকাশের সঠিক সমীকরণ কোনটি?',
    options: [
      { id: 'opt_4_3_2a', text: '$E_k = \\frac{p^2}{2m}$', isCorrect: true },
      { id: 'opt_4_3_2b', text: '$E_k = \\frac{p}{2m}$', isCorrect: false },
      { id: 'opt_4_3_2c', text: '$E_k = \\frac{2p^2}{m}$', isCorrect: false },
      { id: 'opt_4_3_2d', text: '$E_k = 2mp^2$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $E_k = \\frac{p^2}{2m}$।',
      coreConcept: 'ভরবেগ $p = mv \\implies v = \\frac{p}{m}$। গতিশক্তির সূত্রে বেগের মান বসালে $E_k = \\frac{p^2}{2m}$ পাওয়া যায়।',
      stepDerivation: '$$E_k = \\frac{1}{2}mv^2 = \\frac{1}{2}m \\left(\\frac{p}{m}\\right)^2 = \\frac{1}{2}m \\frac{p^2}{m^2} = \\frac{p^2}{2m}$$',
      distractorAnalysis: {
        opt_4_3_2b: 'ভরবেগের বর্গ বাদ দেওয়ার ভুল।',
        opt_4_3_2c: 'ভগ্নাংশের ২ উল্টে দেওয়ার ভুল।',
        opt_4_3_2d: 'মাত্রা সমীকরণগতভাবে অসঙ্গত।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 109,
      },
      proTipShortcut: 'ভরবেগ ও গতিশক্তির গোল্ডেন ফর্মুলা: $E_k = \\frac{p^2}{2m} \\iff p = \\sqrt{2mE_k}$।',
    },
    difficulty: 'EASY',
    boardSource: 'Cumilla Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_3_mcq_3',
    topicId: 'top_ssc_physics_ch4_3',
    type: 'MCQ',
    stem: 'সমান গতিশক্তিসম্পন্ন একটি হালকা বস্তু ($m_1$) এবং একটি ভারী বস্তুর ($m_2 > m_1$) মধ্যে কার ভরবেগ বেশি হবে?',
    options: [
      { id: 'opt_4_3_3a', text: 'ভারী বস্তুর ভরবেগ বেশি হবে', isCorrect: true },
      { id: 'opt_4_3_3b', text: 'হালকা বস্তুর ভরবেগ বেশি হবে', isCorrect: false },
      { id: 'opt_4_3_3c', text: 'উভয়ের ভরবেগ সমান হবে', isCorrect: false },
      { id: 'opt_4_3_3d', text: 'কোনোটির ভরবেগ থাকবে না', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: ভারী বস্তুর ভরবেগ বেশি হবে।',
      coreConcept: '$p = \\sqrt{2mE_k}$। যেহেতু গতিশক্তি $E_k$ ধ্রুবক, তাই $p \\propto \\sqrt{m}$। যার ভর বেশি তার ভরবেগও বেশি।',
      stepDerivation: '$$p = \\sqrt{2mE_k}$$\nযেহেতু $E_k$ সমান:\n$$\\frac{p_2}{p_1} = \\sqrt{\\frac{m_2}{m_1}}$$\nযেহেতু $m_2 > m_1$, তাই $p_2 > p_1$। সুতরাং ভারী বস্তুর ভরবেগ নিশ্চিতভাবেই বেশি।',
      distractorAnalysis: {
        opt_4_3_3b: 'যদি ভরবেগ সমান হতো, তবে হালকা বস্তুর গতিশক্তি বেশি হতো।',
        opt_4_3_3c: 'ভরের পার্থক্যের কারণে ভরবেগ সমান হতে পারে না।',
        opt_4_3_3d: 'গতিশক্তি থাকায় উভয়েরই অশূন্য ভরবেগ থাকবে।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 110,
      },
      proTipShortcut: 'গতিশক্তি সমান হলে $p \\propto \\sqrt{m}$ (ভারীর ভরবেগ বেশি)। ভরবেগ সমান হলে $E_k \\propto 1/m$ (হালকার গতিশক্তি বেশি)।',
    },
    difficulty: 'HARD',
    boardSource: 'Rajshahi Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_3_mcq_4',
    topicId: 'top_ssc_physics_ch4_3',
    type: 'MCQ',
    stem: 'একটি স্প্রিংয়ের স্প্রিং ধ্রুবক $k = 400\\text{ N/m}$। স্প্রিংটিকে স্বাভাবিক অবস্থা থেকে $0.1\\text{ m}$ সংকুচিত করলে এতে কত বিভবশক্তি সঞ্চিত হবে?',
    options: [
      { id: 'opt_4_3_4a', text: '$2.0\\text{ J}$', isCorrect: true },
      { id: 'opt_4_3_4b', text: '$4.0\\text{ J}$', isCorrect: false },
      { id: 'opt_4_3_4c', text: '$20\\text{ J}$', isCorrect: false },
      { id: 'opt_4_3_4d', text: '$40\\text{ J}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $2.0\\text{ J}$।',
      coreConcept: 'স্প্রিংয়ের স্থিতিস্থাপক বিভবশক্তি $E_p = \\frac{1}{2}kx^2$।',
      stepDerivation: 'স্প্রিং ধ্রুবক $k = 400\\text{ N/m}$\nসংকোচন $x = 0.1\\text{ m}$\n$$E_p = \\frac{1}{2}kx^2 = \\frac{1}{2} \\times 400 \\times (0.1)^2 = 200 \\times 0.01 = 2.0\\text{ J}$$',
      distractorAnalysis: {
        opt_4_3_4b: 'হাফ বাদ দিয়ে $kx^2$ করলে $4.0\\text{ J}$ আসে।',
        opt_4_3_4c: 'বর্গ না করে $\\frac{1}{2}kx$ করলে $20\\text{ J}$ আসে।',
        opt_4_3_4d: 'শুধুমাত্র $kx$ হিসাব করার ভুল।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 111,
      },
      proTipShortcut: 'স্প্রিং শক্তি: $E_p = \\frac{1}{2}kx^2$। হাফ ও বর্গের ভুল যেন না হয়!',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Jessore Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_3_mcq_5',
    topicId: 'top_ssc_physics_ch4_3',
    type: 'MCQ',
    stem: '$1200\\text{ kg}$ ভরের একটি প্রাইভেট কারের বেগ $20\\text{ m/s}$ থেকে বৃদ্ধি করে $40\\text{ m/s}$ করতে মোট কত কাজ করতে হবে?',
    options: [
      { id: 'opt_4_3_5a', text: '$7.2 \\times 10^5\\text{ J}$ ($720\\text{ kJ}$)', isCorrect: true },
      { id: 'opt_4_3_5b', text: '$2.4 \\times 10^5\\text{ J}$ ($240\\text{ kJ}$)', isCorrect: false },
      { id: 'opt_4_3_5c', text: '$9.6 \\times 10^5\\text{ J}$ ($960\\text{ kJ}$)', isCorrect: false },
      { id: 'opt_4_3_5d', text: '$4.8 \\times 10^5\\text{ J}$ ($480\\text{ kJ}$)', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $7.2 \\times 10^5\\text{ J}$ ($720\\text{ kJ}$)।',
      coreConcept: 'কাজ-শক্তি উপপাদ্য অনুসারে কৃতকাজ গতিশক্তির পরিবর্তনের সমান: $W = \\Delta E_k = \\frac{1}{2}m(v^2 - u^2)$।',
      stepDerivation: 'আদি গতিশক্তি $E_{k1} = \\frac{1}{2} \\times 1200 \\times 20^2 = 600 \\times 400 = 240,000\\text{ J} = 240\\text{ kJ}$\nশেষ গতিশক্তি $E_{k2} = \\frac{1}{2} \\times 1200 \\times 40^2 = 600 \\times 1600 = 960,000\\text{ J} = 960\\text{ kJ}$\n$$W = E_{k2} - E_{k1} = 960\\text{ kJ} - 240\\text{ kJ} = 720\\text{ kJ} = 7.2 \\times 10^5\\text{ J}$$',
      distractorAnalysis: {
        opt_4_3_5b: 'এটি শুধুমাত্র আদি গতিশক্তি ($240\\text{ kJ}$)।',
        opt_4_3_5c: 'এটি শুধুমাত্র শেষ গতিশক্তি ($960\\text{ kJ}$)।',
        opt_4_3_5d: 'বেগের পরিবর্তন $(40-20)^2$ দিয়ে ভুল হিসাব করার ফলাফল।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 108,
      },
      proTipShortcut: '$W = \\frac{1}{2}m(v^2 - u^2) \\ne \\frac{1}{2}m(v - u)^2$! বেগের বর্গের বিয়োগফল নিতে হবে।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dhaka Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_3_mcq_6',
    topicId: 'top_ssc_physics_ch4_3',
    type: 'MCQ',
    stem: 'ধনুক টেনে তীর ছোঁড়ার সময় শক্তির রূপান্তর নিচের কোন ক্রমটি অনুসরণ করে?',
    options: [
      { id: 'opt_4_3_6a', text: 'পেশিজ শক্তি $\\to$ স্থিতিস্থাপক বিভবশক্তি $\\to$ তীরের গতিশক্তি', isCorrect: true },
      { id: 'opt_4_3_6b', text: 'গতিশক্তি $\\to$ রাসায়নিক শক্তি $\\to$ তাপ শক্তি', isCorrect: false },
      { id: 'opt_4_3_6c', text: 'বিভবশক্তি $\\to$ তড়িৎ শক্তি $\\to$ শব্দ শক্তি', isCorrect: false },
      { id: 'opt_4_3_6d', text: 'আলোক শক্তি $\\to$ গতিশক্তি $\\to$ বিভবশক্তি', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: পেশিজ শক্তি $\\to$ স্থিতিস্থাপক বিভবশক্তি $\\to$ তীরের গতিশক্তি।',
      coreConcept: 'তীরন্দাজ হাতের পেশিজ শক্তি প্রয়োগ করে ধনুকের ছিলার আকৃতি বিকৃত করে, যা ধনুকে স্থিতিস্থাপক বিভবশক্তি হিসেবে জমা হয়। ছিলা ছেড়ে দিলে সেই বিভবশক্তি তীরের তীব্র গতিশক্তিতে রূপান্তরিত হয়।',
      stepDerivation: 'হাতের পেশিজ কাজ $\\implies$ ধনুকের স্থিতিস্থাপক বিভবশক্তি ($E_p = \\frac{1}{2}kx^2$) $\\implies$ তীরের রৈখিক গতিশক্তি ($E_k = \\frac{1}{2}mv^2$)।',
      distractorAnalysis: {
        opt_4_3_6b: 'তীর ছোঁড়ার সময় রাসায়নিক শক্তি তৈরি হয় না।',
        opt_4_3_6c: 'এখানে তড়িৎ শক্তির কোনো সংযোগ নেই।',
        opt_4_3_6d: 'আলোক শক্তি থেকে শুরু হয় না।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 111,
      },
      proTipShortcut: 'টানলে বিভবশক্তি জমা হয়, ছাড়লে গতিশক্তিতে ছোটে।',
    },
    difficulty: 'EASY',
    boardSource: 'Barishal Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_3_cq_1',
    topicId: 'top_ssc_physics_ch4_3',
    type: 'CQ_CREATIVE',
    stem: 'উদ্দীপক: একটি খেলনা পিস্তলের স্প্রিংয়ের স্প্রিং ধ্রুবক $k = ৮০০\\text{ N/m}$। স্প্রিংটিকে ৫ সেন্টিমিটার সংকুচিত করে তার মুখে ২০ গ্রাম ভরের একটি প্লাস্টিকের গুলি রেখে পিস্তলের ট্রিগার চাপ দেওয়া হলো। গুলিটি অনুভূমিকভাবে বের হয়ে সমতলে ছুটে গেল।\n\nক. বিভবশক্তি কাকে বলে? [১]\nখ. কোনো গতিশীল বস্তুর গতিশক্তি কখনো ঋণাত্মক হতে পারে কি? ব্যাখ্যা করো। [২]\nগ. সংকুচিত অবস্থায় স্প্রিংটিতে সঞ্চিত বিভবশক্তির পরিমাণ নির্ণয় করো। [৩]\nঘ. শক্তি সংরক্ষণের ভিত্তিতে ট্রিগার চাপার পর পিস্তল থেকে গুলিটি কত বেগে নির্গত হবে গাণিতিকভাবে বিশ্লেষণ করো (বায়ুর বাধা উপেক্ষা করো)। [৪]',
    options: null,
    explanation: {
      directAnswer: 'গ. স্প্রিংটিতে সঞ্চিত বিভবশক্তি ১ জুল। ঘ. গুলিটি ১০ মিটার/সেকেন্ড বেগে নির্গত হবে।',
      coreConcept: 'স্প্রিং সংকুচিত করলে স্থিতিস্থাপক বিভবশক্তি $E_p = \\frac{1}{2}kx^2$ সঞ্চিত হয়। ট্রিগার ছাড়লে শক্তির সংরক্ষণ নীতি অনুযায়ী এই সম্পূর্ণ বিভবশক্তি গুলির গতিশক্তিতে ($E_k = \\frac{1}{2}mv^2$) রূপান্তরিত হয়।',
      stepDerivation: 'গ. স্প্রিং ধ্রুবক $k = 800\\text{ N/m}$।\nসংকোচন $x = 5\\text{ cm} = 0.05\\text{ m}$।\nস্প্রিংটিতে সঞ্চিত বিভবশক্তি:\n$$E_p = \\frac{1}{2}kx^2 = \\frac{1}{2} \\times 800 \\times (0.05)^2 = 400 \\times 0.0025 = 1.0\\text{ J}$$\n\nঘ. গুলির ভর $m = 20\\text{ g} = 0.02\\text{ kg}$।\nশক্তির সংরক্ষণশীলতা নীতি অনুসারে, স্প্রিংয়ের সঞ্চিত বিভবশক্তি গুলির গতিশক্তিতে রূপান্তরিত হবে:\n$$E_k = E_p$$\n$$\\frac{1}{2}mv^2 = 1.0$$\n$$v^2 = \\frac{2 \\times 1.0}{m} = \\frac{2.0}{0.02} = 100$$\n$$v = \\sqrt{100} = 10\\text{ m/s}$$\nসুতরাং গুলিটি $10\\text{ m/s}$ বেগে পিস্তল থেকে নির্গত হবে।',
      distractorAnalysis: undefined,
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 111,
      },
      proTipShortcut: 'স্প্রিং বিভবশক্তি = গতিশক্তি $\\implies \\frac{1}{2}kx^2 = \\frac{1}{2}mv^2 \\implies v = x\\sqrt{\\frac{k}{m}}$।',
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'জ্ঞানমূলক (১ নম্বর): স্বাভাবিক অবস্থান বা অবস্থা পরিবর্তনের জন্য বস্তু কাজ করার যে সামর্থ্য অর্জন করে তাকে বিভবশক্তি বলে—সঠিক সংজ্ঞায় পূর্ণ ১ নম্বর।' },
      kha: { mark: 2, criteria: 'অনুধাবনমূলক (২ নম্বর): ভর সর্বদা ধনাত্মক এবং বেগের বর্গ (v²) সর্বদা অঋণাত্মক হওয়ায় গতিশক্তি Ek = ½mv² কখনোই ঋণাত্মক হতে পারে না—যৌক্তিক ব্যাখ্যায় পূর্ণ ২ নম্বর।' },
      ga: { mark: 3, criteria: 'প্রয়োগমূলক (৩ নম্বর): সংকুচিত দৈর্ঘ্যকে মিটারে নিয়ে Ep = ½ kx² = ১.০ জুল সঠিকভাবে নির্ণয় করলে পূর্ণ ৩ নম্বর।' },
      gha: { mark: 4, criteria: 'উচ্চতর দক্ষতামূলক (৪ নম্বর): শক্তির সংরক্ষণশীলতা সমীকরণ ½mv² = Ep স্থাপন করে গুলির বেগ v = ১০ মি/সে সঠিকভাবে প্রতিপাদন ও যুক্তিসহ বিশ্লেষণে পূর্ণ ৪ নম্বর।' },
    },
    difficulty: 'HARD',
    boardSource: 'Dinajpur Board 2024 Model',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 4.4: শক্তির নিত্যতা ও রূপান্তর [top_ssc_physics_ch4_4]
  // =========================================================================
  {
    id: 'q_ch4_4_mcq_1',
    topicId: 'top_ssc_physics_ch4_4',
    type: 'MCQ',
    stem: '$40\\text{ m}$ উঁচু স্থান থেকে একটি বস্তুকে মুক্তভাবে নিচে ছেড়ে দেওয়া হলো। ভূমি থেকে কত উচ্চতায় বস্তুটির গতিশক্তি বিভবশক্তির সমান হবে?',
    options: [
      { id: 'opt_4_4_1a', text: '$20\\text{ m}$', isCorrect: true },
      { id: 'opt_4_4_1b', text: '$10\\text{ m}$', isCorrect: false },
      { id: 'opt_4_4_1c', text: '$30\\text{ m}$', isCorrect: false },
      { id: 'opt_4_4_1d', text: '$15\\text{ m}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $20\\text{ m}$।',
      coreConcept: 'মুক্ত পতনে শীর্ষবিন্দুর মোট শক্তি $E = mgH$। ভূমি থেকে $h$ উচ্চতায় গতিশক্তি $E_k = mg(H - h)$ এবং বিভবশক্তি $E_p = mgh$। $E_k = E_p \\implies h = H/2$।',
      stepDerivation: '$$E_k = E_p$$\n$$mg(H - h) = mgh$$\n$$H - h = h \\implies 2h = H \\implies h = \\frac{H}{2}$$\nএখানে $H = 40\\text{ m}$ $\\implies h = \\frac{40}{2} = 20\\text{ m}$।',
      distractorAnalysis: {
        opt_4_4_1b: '$H/4 = 10\\text{ m}$ হতো যদি গতিশক্তি বিভবশক্তির ৩ গুণ হতো।',
        opt_4_4_1c: '$3H/4 = 30\\text{ m}$ হতো যদি বিভবশক্তি গতিশক্তির ৩ গুণ হতো।',
        opt_4_4_1d: 'অসঠিক অনুপাত।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 112,
      },
      proTipShortcut: '$E_k = E_p$ হবে ঠিক মাঝামাঝি উচ্চতায়: $h = \\frac{H}{2} = \\frac{40}{2} = 20\\text{ m}$।',
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_4_mcq_2',
    topicId: 'top_ssc_physics_ch4_4',
    type: 'MCQ',
    stem: '$60\\text{ m}$ উচ্চতা থেকে একটি পাথর খসে পড়ল। ভূমি থেকে কত উচ্চতায় এর গতিশক্তি বিভবশক্তির দ্বিগুণ ($E_k = 2E_p$) হবে?',
    options: [
      { id: 'opt_4_4_2a', text: '$20\\text{ m}$', isCorrect: true },
      { id: 'opt_4_4_2b', text: '$40\\text{ m}$', isCorrect: false },
      { id: 'opt_4_4_2c', text: '$30\\text{ m}$', isCorrect: false },
      { id: 'opt_4_4_2d', text: '$15\\text{ m}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $20\\text{ m}$।',
      coreConcept: 'যদি $E_k = n E_p$ হয়, তবে ভূমি থেকে উচ্চতা $h = \\frac{H}{n + 1}$। এখানে $n = 2$ এবং $H = 60\\text{ m}$।',
      stepDerivation: 'ভূমি থেকে উচ্চতা $h$ হলে পতন দূরত্ব $x = H - h$।\n$$E_k = mg(H - h), \\quad E_p = mgh$$\nশর্তানুসারে:\n$$mg(H - h) = 2(mgh)$$\n$$H - h = 2h \\implies 3h = H \\implies h = \\frac{H}{3}$$\n$$h = \\frac{60\\text{ m}}{3} = 20\\text{ m}$$',
      distractorAnalysis: {
        opt_4_4_2b: '$40\\text{ m}$ হলো শীর্ষ থেকে পতনের দূরত্ব ($x = 60 - 20 = 40\\text{ m}$), ভূমি থেকে উচ্চতা নয়।',
        opt_4_4_2c: '$30\\text{ m}$ মাঝামাঝি বিন্দু যেখানে $E_k = E_p$।',
        opt_4_4_2d: '$15\\text{ m}$ হলো $H/4$ ($E_k = 3E_p$ এর শর্ত)।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 113,
      },
      proTipShortcut: 'ম্যাজিক ফর্মুলা: $E_k = n E_p \\implies h = \\frac{H}{n + 1}$। এখানে $h = \\frac{60}{2 + 1} = 20\\text{ m}$।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Cumilla Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_4_mcq_3',
    topicId: 'top_ssc_physics_ch4_4',
    type: 'MCQ',
    stem: 'মুক্তভাবে পড়ন্ত কোনো বস্তুর ক্ষেত্রে নিচের কোন লেখচিত্রটি মোট যান্ত্রিক শক্তির ($E$) সাথে সময়ের ($t$) সঠিক সম্পর্ক নির্দেশ করে?',
    options: [
      { id: 'opt_4_4_3a', text: 'সময় অক্ষের সমান্তরাল সরলরেখা ($E = \\text{constant}$)', isCorrect: true },
      { id: 'opt_4_4_3b', text: 'মূলবিন্দুগামী ঊর্ধ্বমুখী সরলরেখা', isCorrect: false },
      { id: 'opt_4_4_3c', text: 'মূলবিন্দুগামী অধিবৃত্তাকার বক্ররেখা', isCorrect: false },
      { id: 'opt_4_4_3d', text: 'নিচের দিকে নেমে যাওয়া নিম্নমুখী সরলরেখা', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: সময় অক্ষের সমান্তরাল সরলরেখা ($E = \\text{constant}$)।',
      coreConcept: 'শক্তির নিত্যতা নীতি অনুসারে বায়ুর বাধা না থাকলে মুক্ত পতনে প্রতি মুহূর্তে বিভবশক্তি গতিশক্তিতে রূপান্তরিত হলেও মোট শক্তি ($E = E_k + E_p$) সবসময় ধ্রুবক থাকে।',
      stepDerivation: 'যেহেতু পতনের প্রতিটি মুহূর্তে $E_k + E_p = mgH = \\text{ধ্রুবক}$, তাই সময়ের সাথে মোট শক্তির কোনো পরিবর্তন ঘটে না। ফলে $E$-$t$ লেখচিত্রটি একটি অনুভূমিক সরলরেখা হবে।',
      distractorAnalysis: {
        opt_4_4_3b: 'এটি বেগ বনাম সময় ($v$-$t$) লেখচিত্রের রূপ।',
        opt_4_4_3c: 'এটি গতিশক্তি বনাম বেগ বা সরণ বনাম সময়ের বক্ররেখা।',
        opt_4_4_3d: 'বিভবশক্তি উচ্চতা হ্রাসের সাথে সাথে কমলেও মোট শক্তি কমে না।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 114,
      },
      proTipShortcut: 'শক্তির নিত্যতা $\\implies$ মোট শক্তি লেখচিত্র সর্বদা সময় বা উচ্চতা অক্ষের সমান্তরাল! ঢাল = ০।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Sylhet Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_4_mcq_4',
    topicId: 'top_ssc_physics_ch4_4',
    type: 'MCQ',
    stem: '$2\\text{ kg}$ ভরের একটি পাথর $50\\text{ m}$ উঁচু দালানের ছাদ থেকে নিচে ফেলে দেওয়া হলো। ভূমি স্পর্শ করার ঠিক পূর্বমুহূর্তে পাথরটির গতিশক্তি কত হবে? ($g = 9.8\\text{ m/s}^2$)',
    options: [
      { id: 'opt_4_4_4a', text: '$980\\text{ J}$', isCorrect: true },
      { id: 'opt_4_4_4b', text: '$490\\text{ J}$', isCorrect: false },
      { id: 'opt_4_4_4c', text: '$1960\\text{ J}$', isCorrect: false },
      { id: 'opt_4_4_4d', text: '$100\\text{ J}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $980\\text{ J}$।',
      coreConcept: 'ভূমি স্পর্শের ঠিক পূর্বমুহূর্তে উচ্চতা $h \\to 0$, ফলে বিভবশক্তি সম্পূর্ণ শূন্য হয়ে যায় এবং শীর্ষের আদি বিভবশক্তি পুরোটাই গতিশক্তিতে রূপান্তরিত হয়। $E_k = mgH$।',
      stepDerivation: '$$E_{k(\\text{ground})} = E_{p(\\text{top})} = mgH$$\n$$E_k = 2 \\times 9.8 \\times 50 = 980\\text{ J}$$',
      distractorAnalysis: {
        opt_4_4_4b: 'ভর অর্ধেক ($1\\text{ kg}$) ধরলে $490\\text{ J}$ আসে।',
        opt_4_4_4c: 'ভর দ্বিগুণ করার ভুল।',
        opt_4_4_4d: 'শুধুমাত্র $2 \\times 50 = 100$ ($g$ বাদ দেওয়া)।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 113,
      },
      proTipShortcut: 'ভূমিতে গতিশক্তি = শীর্ষে বিভবশক্তি: $E_k = mgH = 2 \\times 9.8 \\times 50 = 980\\text{ J}$।',
    },
    difficulty: 'EASY',
    boardSource: 'Jessore Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_4_mcq_5',
    topicId: 'top_ssc_physics_ch4_4',
    type: 'MCQ',
    stem: 'সরল দোলকের ক্ষেত্রে সর্বোচ্চ বিস্তারে ও সাম্যাবস্থানে শক্তির কোন কোন রূপ বিদ্যমান থাকে?',
    options: [
      { id: 'opt_4_4_5a', text: 'সর্বোচ্চ বিস্তারে সম্পূর্ণ বিভবশক্তি এবং সাম্যাবস্থানে সম্পূর্ণ গতিশক্তি', isCorrect: true },
      { id: 'opt_4_4_5b', text: 'সর্বোচ্চ বিস্তারে সম্পূর্ণ গতিশক্তি এবং সাম্যাবস্থানে সম্পূর্ণ বিভবশক্তি', isCorrect: false },
      { id: 'opt_4_4_5c', text: 'উভয় অবস্থানেই কেবল গতিশক্তি থাকে', isCorrect: false },
      { id: 'opt_4_4_5d', text: 'উভয় অবস্থানেই শক্তি শূন্য থাকে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: সর্বোচ্চ বিস্তারে সম্পূর্ণ বিভবশক্তি এবং সাম্যাবস্থানে সম্পূর্ণ গতিশক্তি।',
      coreConcept: 'সর্বোচ্চ বিস্তারে বব ক্ষণিকের জন্য স্থির হয় ($v = 0$), কিন্তু উচ্চতা সর্বাধিক থাকায় শক্তি পুরোপুরি বিভবশক্তি। সাম্যাবস্থানে উচ্চতা সর্বনিম্ন কিন্তু বেগ সর্বোচ্চ থাকায় শক্তি পুরোপুরি গতিশক্তি।',
      stepDerivation: 'বিস্তার বিন্দু ($A, B$): বেগ $v = 0 \\implies E_k = 0$, উচ্চতা সর্বোচ্চ $\\implies E = E_p = mgh$।\nসাম্যাবস্থা ($O$): উচ্চতা $h = 0 \\implies E_p = 0$, বেগ সর্বোচ্চ $\\implies E = E_k = \\frac{1}{2}mv_{\\max}^2$।\nমধ্যবর্তী যেকোনো বিন্দুতে: $E = E_k + E_p = \\text{ধ্রুবক}$।',
      distractorAnalysis: {
        opt_4_4_5b: 'বাস্তব অবস্থার বিপরীত বর্ণনা।',
        opt_4_4_5c: 'সর্বোচ্চ বিস্তারে বব ক্ষণিকের জন্য থামে, বেগ থাকে না।',
        opt_4_4_5d: 'দোলনকালে শক্তি কখনোই শূন্য হয় না।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 115,
      },
      proTipShortcut: 'দোলক শীর্ষে $\\implies$ বিভবশক্তি চূড়ায় | দোলক মাঝে $\\implies$ গতিশক্তি চূড়ায়।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Rajshahi Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_4_mcq_6',
    topicId: 'top_ssc_physics_ch4_4',
    type: 'MCQ',
    stem: 'একটি বস্তু খাড়া ওপরের দিকে নিক্ষেপ করা হলো। নিক্ষেপের মুহূর্তে এর গতিশক্তি $400\\text{ J}$ হলে সর্বোচ্চ উচ্চতায় এর বিভবশক্তি কত হবে? (বায়ুর ঘর্ষণ নগণ্য)',
    options: [
      { id: 'opt_4_4_6a', text: '$400\\text{ J}$', isCorrect: true },
      { id: 'opt_4_4_6b', text: '$0\\text{ J}$', isCorrect: false },
      { id: 'opt_4_4_6c', text: '$200\\text{ J}$', isCorrect: false },
      { id: 'opt_4_4_6d', text: '$800\\text{ J}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $400\\text{ J}$।',
      coreConcept: 'নিক্ষেপের মুহূর্তে বস্তুটির সমস্ত শক্তি ছিল গতিশক্তি ($400\\text{ J}$)। সর্বোচ্চ উচ্চতায় বেগ শূন্য হওয়ায় সম্পূর্ণ গতিশক্তি বিভবশক্তিতে রূপান্তরিত হয়।',
      stepDerivation: 'নিক্ষেপের মুহূর্তে মোট শক্তি $E = E_k + E_p = 400 + 0 = 400\\text{ J}$।\nসর্বোচ্চ উচ্চতায় বেগ $v = 0 \\implies E_k = 0$।\nশক্তির নিত্যতা নীতি অনুসারে:\n$$E_{\\text{top}} = E_{\\text{bottom}} \\implies E_p + 0 = 400\\text{ J} \\implies E_p = 400\\text{ J}$$',
      distractorAnalysis: {
        opt_4_4_6b: 'সর্বোচ্চ উচ্চতায় গতিশক্তি শূন্য হয়, বিভবশক্তি নয়।',
        opt_4_4_6c: 'অর্ধেক উচ্চতায় বিভবশক্তি $200\\text{ J}$ হতো।',
        opt_4_4_6d: 'শক্তি সৃষ্টি হতে পারে না, দ্বিগুণ হওয়া অসম্ভব।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 113,
      },
      proTipShortcut: 'সর্বোচ্চ উচ্চতায় বিভবশক্তি = ভূমিতে নিক্ষেপের গতিশক্তি ($E_p = E_k = 400\\text{ J}$)।',
    },
    difficulty: 'EASY',
    boardSource: 'Chittagong Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch4_4_cq_1',
    topicId: 'top_ssc_physics_ch4_4',
    type: 'CQ_CREATIVE',
    stem: 'উদ্দীপক: ৬০ মিটার উঁচু একটি বহুতল ভবনের ছাদ (A বিন্দু) থেকে ৫ কেজি ভরের একটি ভারী গোলক কোনো আদিবেগ ছাড়া মুক্তভাবে ছেড়ে দেওয়া হলো। গোলকটি নিচে পড়ার সময় ছাদ থেকে ২০ মিটার নিচে B বিন্দু এবং ভূমি স্পর্শের ঠিক পূর্বে C বিন্দু অতিক্রম করে।\n\nক. শক্তির নিত্যতা সূত্রটি লেখো। [১]\nখ. কোনো পড়ন্ত বস্তুর বেগ দ্বিগুণ হলে তার গতিশক্তি চারগুণ হয় কেন? [২]\nগ. B বিন্দুতে গোলকটির গতিশক্তি ও বিভবশক্তির মান নির্ণয় করো। [৩]\nঘ. উদ্দীপকের আলোকে A, B এবং C বিন্দুতে গোলকটির মোট যান্ত্রিক শক্তি সংরক্ষিত থাকে কি না গাণিতিক বিশ্লেষণের মাধ্যমে প্রমাণ করো। [৪]',
    options: null,
    explanation: {
      directAnswer: 'গ. B বিন্দুতে গতিশক্তি ৯৮০ জুল এবং বিভবশক্তি ১৯৬০ জুল। ঘ. A, B এবং C প্রতিটি বিন্দুতেই মোট যান্ত্রিক শক্তি ২৯৪০ জুল, অর্থাৎ শক্তি সম্পূর্ণরূপে সংরক্ষিত থাকে।',
      coreConcept: 'মুক্ত পতনে মোট যান্ত্রিক শক্তি $E = E_k + E_p = mgH$ সর্বদা ধ্রুব থাকে। উচ্চতা হ্রাসের সাথে সাথে বিভবশক্তি সমপরিমাণ গতিশক্তিতে রূপান্তরিত হয়।',
      stepDerivation: 'গ. ভর $m = 5\\text{ kg}$, মোট উচ্চতা $H = 60\\text{ m}$।\nB বিন্দু ছাদ থেকে $x = 20\\text{ m}$ নিচে, অর্থাৎ ভূমি থেকে উচ্চতা $h_B = 60 - 20 = 40\\text{ m}$।\n(i) B বিন্দুতে বিভবশক্তি:\n$$E_{pB} = mgh_B = 5 \\times 9.8 \\times 40 = 1960\\text{ J}$$\n(ii) B বিন্দুতে গতিশক্তি:\nপতনের জন্য $v_B^2 = 2gx = 2 \\times 9.8 \\times 20 = 392\\text{ m}^2/\\text{s}^2$।\n$$E_{kB} = \\frac{1}{2}mv_B^2 = \\frac{1}{2} \\times 5 \\times 392 = 980\\text{ J}$$\n\nঘ. তিনটি বিন্দুতে মোট যান্ত্রিক শক্তি বিশ্লেষণ:\n১. A বিন্দুতে (শীর্ষে $h_A = 60\\text{ m}, v_A = 0$):\n$$E_{pA} = mgh_A = 5 \\times 9.8 \\times 60 = 2940\\text{ J}$$\n$$E_{kA} = 0\\text{ J}$$\n$$E_A = E_{pA} + E_{kA} = 2940 + 0 = 2940\\text{ J}$$\n\n২. B বিন্দুতে ($h_B = 40\\text{ m}, x = 20\\text{ m}$):\n$$E_{pB} = 1960\\text{ J}, \\quad E_{kB} = 980\\text{ J}$$\n$$E_B = E_{pB} + E_{kB} = 1960 + 980 = 2940\\text{ J}$$\n\n৩. C বিন্দুতে (ভূমিতে $h_C = 0, x = 60\\text{ m}$):\n$$E_{pC} = 0\\text{ J}$$\n$$v_C^2 = 2gH = 2 \\times 9.8 \\times 60 = 1176\\text{ m}^2/\\text{s}^2$$\n$$E_{kC} = \\frac{1}{2} \\times 5 \\times 1176 = 2940\\text{ J}$$\n$$E_C = E_{pC} + E_{kC} = 0 + 2940 = 2940\\text{ J}$$\n\nযেহেতু $E_A = E_B = E_C = 2940\\text{ J}$, সুতরাং মুক্ত পতনের প্রতিটি অবস্থানেই যান্ত্রিক শক্তি অপরিবর্তিত থাকে এবং শক্তির নিত্যতা সূত্র সম্পূর্ণরূপে পালিত হয়।',
      distractorAnalysis: undefined,
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
        pageNumber: 112,
      },
      proTipShortcut: 'পড়ন্ত বস্তুর ক্ষেত্রে $E_A = E_B = E_C = mgH$। যে বিন্দুই নিক, মোট শক্তি সর্বদা ২৯৪০ জুল হবে।',
    },
    cqRubric: {
      ka: { mark: 1, criteria: 'জ্ঞানমূলক (১ নম্বর): শক্তির সৃষ্টি বা বিনাশ নেই, কেবল এক রূপ থেকে অন্য রূপে পরিবর্তিত হতে পারে—সঠিক সূত্রে পূর্ণ ১ নম্বর।' },
      kha: { mark: 2, criteria: 'অনুধাবনমূলক (২ নম্বর): Ek = ½mv² সূত্রে গতিশক্তি বেগের বর্গের সমানুপাতিক (Ek ∝ v²) তা গাণিতিকভাবে দেখিয়ে ৪ গুণ হওয়ার ব্যাখ্যায় পূর্ণ ২ নম্বর।' },
      ga: { mark: 3, criteria: 'প্রয়োগমূলক (৩ নম্বর): B বিন্দুতে Ep = ১৯৬০ জুল এবং Ek = ৯৮০ জুল নির্ভুল সূত্রে নির্ণয় করলে পূর্ণ ৩ নম্বর।' },
      gha: { mark: 4, criteria: 'উচ্চতর দক্ষতামূলক (৪ নম্বর): A, B ও C তিনটি বিন্দুতেই পৃথকভাবে মোট শক্তি ২৯৪০ জুল হিসাব করে EA = EB = EC সমান দেখিয়ে নীতি যাচাইয়ে পূর্ণ ৪ নম্বর।' },
    },
    difficulty: 'HARD',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];

export const chapter4Questions: QuestionData[] = [
  ...batch1Questions,
  ...chapter4Batch2Questions,
  ...chapter4Batch3Questions,
];
