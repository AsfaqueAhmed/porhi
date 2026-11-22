import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter10QuestionsBatch1: QuestionData[] = [
  // -------------------------------------------------------------
  // Topic 10.1: উদ্ভিদে সমন্বয় ও ফাইটোহরমোন (MCQs 01-08)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_01",
    topicId: "top_ssc_biology_ch10_1",
    type: "MCQ",
    stem: "১৮৮০ সালে চার্লস ডারউইন ক্যানারি ঘাসের ভ্রূণমুকুল আবরণীতে আলোর প্রতি বক্রবৃদ্ধি পর্যবেক্ষণ করে কোন ফাইটোহরমোনের উপস্থিতি প্রথম প্রত্যক্ষ করেন?",
    options: [
      { id: "opt_bio_10_01_a", text: "অক্সিন (Auxin)", isCorrect: true },
      { id: "opt_bio_10_1_b", text: "জিবেরেলিন (Gibberellin)", isCorrect: false },
      { id: "opt_bio_10_01_c", text: "সাইটোকাইনিন (Cytokinin)", isCorrect: false },
      { id: "opt_bio_10_01_d", text: "অ্যাবসিসিক অ্যাসিড (ABA)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অক্সিন (Auxin)।",
      coreConcept: "চার্লস ডারউইন ১৮৮০ সালে উদ্ভিদের ভ্রূণমুকুল আবরণীতে আলোর দিকে বক্রবৃদ্ধি দেখে অক্সিনের উপস্থিতি প্রমাণ করেন।",
      distractorAnalysis: {
        opt_bio_10_1_b: "জিবেরেলিন ১৯২৬ সালে জাপানি বিজ্ঞানী কুরোসাওয়া ধানের বাকানি রোগ সৃষ্টিকারী ছত্রাকে আবিষ্কার করেন।",
        opt_bio_10_01_c: "সাইটোকাইনিন নারকেলের দুধ ও ভুট্টার শস্যে পাওয়া যায়, যা কোষ বিভাজন ত্বরান্বিত করে।",
        opt_bio_10_01_d: "অ্যাবসিসিক অ্যাসিড হলো বৃদ্ধিরোধক স্ট্রেস হরমোন যা স্টোমাটা বন্ধ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.১",
        pageNumber: 205
      },
      proTipShortcut: "মনে রাখো: ডারউইন লক্ষ্য করেছিলেন ক্যানারি ঘাসে প্রথম আলোর অভিমুখী অক্সিন।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_02",
    topicId: "top_ssc_biology_ch10_1",
    type: "MCQ",
    stem: "উদ্ভিদের একমাত্র গ্যাসীয় ফাইটোহরমোন কোনটি যা কৃত্রিম ও প্রাকৃতিকভাবে ফল পাকাতে সাহায্য করে?",
    options: [
      { id: "opt_bio_10_02_a", text: "ইথিলিন (Ethylene)", isCorrect: true },
      { id: "opt_bio_10_02_b", text: "অক্সিন (Auxin)", isCorrect: false },
      { id: "opt_bio_10_02_c", text: "জিবেরেলিন (Gibberellin)", isCorrect: false },
      { id: "opt_bio_10_02_d", text: "ফ্লোরিজেন (Florigen)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ইথিলিন (Ethylene)।",
      coreConcept: "ইথিলিন ($C_2H_4$) হলো উদ্ভিদদেহে উৎপন্ন একমাত্র গ্যাসীয় ফাইটোহরমোন যা ফল পাকাতে ও ঝরে পড়া ত্বরান্বিত করে।",
      distractorAnalysis: {
        opt_bio_10_02_b: "অক্সিন তরল জৈব অ্যাসিড (ইন্ডোল অ্যাসিটিক অ্যাসিড), গ্যাসীয় নয়।",
        opt_bio_10_02_c: "জিবেরেলিন টারপিনয়েড জাতীয় কঠিন জৈব যৌগ যা সুপ্তাবস্থা ভাঙে।",
        opt_bio_10_02_d: "ফ্লোরিজেন পাতায় তৈরি কাল্পনিক হরমোন যা ফুল ফোটায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.১",
        pageNumber: 206
      },
      proTipShortcut: "বোর্ড পরীক্ষার অতি প্রিয় প্রশ্ন: একমাত্র গ্যাসীয় ফাইটোহরমোন হলো ইথিলিন।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_03",
    topicId: "top_ssc_biology_ch10_1",
    type: "MCQ",
    stem: "কোন ফাইটোহরমোনের প্রভাবে উদ্ভিদের কাণ্ডের পর্বমধ্য (Internode) দ্রুত দীর্ঘায়িত হয়ে খাটো উদ্ভিদ অস্বাভাবিক লম্বা হয়?",
    options: [
      { id: "opt_bio_10_03_a", text: "সাইটোকাইনিন", isCorrect: false },
      { id: "opt_bio_10_03_b", text: "জিবেরেলিন", isCorrect: true },
      { id: "opt_bio_10_03_c", text: "অ্যাবসিসিক অ্যাসিড", isCorrect: false },
      { id: "opt_bio_10_03_d", text: "ভার্নালিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: জিবেরেলিন।",
      coreConcept: "জিবেরেলিন উদ্ভিদের পর্বমধ্যের দৈর্ঘ্য বৃদ্ধি করে খাটো উদ্ভিদকে দ্রুত লম্বা করে এবং বীজের সুপ্তাবস্থা দূর করে।",
      distractorAnalysis: {
        opt_bio_10_03_a: "সাইটোকাইনিন কোষ বিভাজন দ্রুত করে এবং অঙ্গের বার্ধক্য পিছিয়ে দেয়।",
        opt_bio_10_03_c: "অ্যাবসিসিক অ্যাসিড উল্টো বৃদ্ধি থামিয়ে দেয় এবং সুপ্তাবস্থা বাড়ায়।",
        opt_bio_10_03_d: "ভার্নালিন শৈত্য উদ্দীপনায় ফুল ফোটাতে সাহায্য করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.১",
        pageNumber: 206
      },
      proTipShortcut: "মনে রাখো: জিবেরেলিন = পর্বমধ্য বড় করে খাটো গাছকে জিরাফ বানায়!"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_04",
    topicId: "top_ssc_biology_ch10_1",
    type: "MCQ",
    stem: "খরার সময় উদ্ভিদের পানির অপচয় রোধে স্টোমাটা (পত্ররন্ধ্র) বন্ধ করে কোন হরমোন স্ট্রেস রেসপন্স তৈরি করে?",
    options: [
      { id: "opt_bio_10_04_a", text: "অ্যাবসিসিক অ্যাসিড (ABA)", isCorrect: true },
      { id: "opt_bio_10_04_b", text: "অক্সিন", isCorrect: false },
      { id: "opt_bio_10_04_c", text: "সাইটোকাইনিন", isCorrect: false },
      { id: "opt_bio_10_04_d", text: "ইথিলিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ্যাবসিসিক অ্যাসিড (ABA)।",
      coreConcept: "অ্যাবসিসিক অ্যাসিডকে উদ্ভিদের স্ট্রেস হরমোন বলা হয়; এটি পানির সংকটে রন্ধ্র বন্ধ করে প্রস্বেদন কমায়।",
      distractorAnalysis: {
        opt_bio_10_04_b: "অক্সিন বৃদ্ধি ত্বরান্বিত করে ও কাণ্ডের বক্রচলন ঘটায়।",
        opt_bio_10_04_c: "সাইটোকাইনিন কোষ বিভাজন বাড়ায় ও বার্ধক্য রোধ করে।",
        opt_bio_10_04_d: "ইথিলিন গ্যাসীয় আকারে ফল পাকানো ও পাতা মোচনে ভূমিকা রাখে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.১",
        pageNumber: 206
      },
      proTipShortcut: "স্ট্রেস ও খরা = অ্যাবসিসিক অ্যাসিড (ABA)।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_05",
    topicId: "top_ssc_biology_ch10_1",
    type: "MCQ",
    stem: "উদ্ভিদের টিস্যু কালচার প্রযুক্তিতে কোষ বিভাজন (Cytokinesis) উৎসাহিত করতে এবং পাতার বার্ধক্য বিলম্বিত করতে কোনটি ব্যবহৃত হয়?",
    options: [
      { id: "opt_bio_10_05_a", text: "অক্সিন", isCorrect: false },
      { id: "opt_bio_10_05_b", text: "সাইটোকাইনিন", isCorrect: true },
      { id: "opt_bio_10_05_c", text: "ইথিলিন", isCorrect: false },
      { id: "opt_bio_10_05_d", text: "অ্যাবসিসিক অ্যাসিড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সাইটোকাইনিন।",
      coreConcept: "সাইটোকাইনিন কোষ বিভাজনকে তীব্র করে এবং ক্লোরোফিল দীর্ঘস্থায়ী রেখে বার্ধক্য পেছায়।",
      distractorAnalysis: {
        opt_bio_10_05_a: "অক্সিন মূলের সৃষ্টি ও কোষের প্রসারণ বাড়ায় কিন্তু সাইটোকাইনেসিসের প্রধান উদ্দীপক নয়।",
        opt_bio_10_05_c: "ইথিলিন ফল পাকায় ও দ্রুত পাতা ঝরায়।",
        opt_bio_10_05_d: "অ্যাবসিসিক অ্যাসিড বৃদ্ধি রোধ করে সুপ্তাবস্থা সৃষ্টি করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.১",
        pageNumber: 206
      },
      proTipShortcut: "সাইটো = কোষ বিভাজন (Cytokinesis) এবং সবুজ সতেজ রাখা।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_06",
    topicId: "top_ssc_biology_ch10_1",
    type: "MCQ",
    stem: "উদ্ভিদের পাতায় উৎপন্ন হয়ে বর্ধনশীল শীর্ষমুকুলে পরিবাহিত হয়ে পুষ্প প্রস্ফুটনে উদ্দীপনা জোগায় কোন হরমোন?",
    options: [
      { id: "opt_bio_10_06_a", text: "ফ্লোরিজেন (Florigen)", isCorrect: true },
      { id: "opt_bio_10_06_b", text: "ইথিলিন", isCorrect: false },
      { id: "opt_bio_10_06_c", text: "অক্সিন", isCorrect: false },
      { id: "opt_bio_10_06_d", text: "সাইটোকাইনিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ফ্লোরিজেন (Florigen)।",
      coreConcept: "ফ্লোরিজেন একটি অনুমিত ফাইটোহরমোন যা পাতায় আলোক উদ্দীপনায় তৈরি হয়ে শীর্ষমুকুলে ফুল ফোটায়।",
      distractorAnalysis: {
        opt_bio_10_06_b: "ইথিলিন ফল পাকানোর হরমোন।",
        opt_bio_10_06_c: "অক্সিন কান্ডের শীর্ষ ও মূলের বৃদ্ধিতে কাজ করে।",
        opt_bio_10_06_d: "সাইটোকাইনিন কোষ বিভাজনে কাজ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.১",
        pageNumber: 207
      },
      proTipShortcut: "Flower = Florigen (ফুল ফোটাতে ফ্লোরিজেন)।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_07",
    topicId: "top_ssc_biology_ch10_1",
    type: "MCQ",
    stem: "শাখা কলমে দ্রুত মূল গজাতে এবং ক্ষতস্থান নিরাময়ে নিচের কোনটির প্রয়োগ সবচেয়ে ফলপ্রসূ?",
    options: [
      { id: "opt_bio_10_07_a", text: "কৃত্রিম অক্সিন (IBA / NAA)", isCorrect: true },
      { id: "opt_bio_10_07_b", text: "অ্যাবসিসিক অ্যাসিড", isCorrect: false },
      { id: "opt_bio_10_07_c", text: "ইথিলিন গ্যাস", isCorrect: false },
      { id: "opt_bio_10_07_d", text: "ফ্লোরিজেন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কৃত্রিম অক্সিন (IBA / NAA)।",
      coreConcept: "অক্সিন শাখা কলমের গোড়ায় দ্রুত অস্থানিক মূল গজাতে এবং ক্ষত নিরাময়ে ব্যাপকভাবে ব্যবহৃত হয়।",
      distractorAnalysis: {
        opt_bio_10_07_b: "অ্যাবসিসিক অ্যাসিড মূলের বৃদ্ধি দমন করে সুপ্তাবস্থা বাড়াবে।",
        opt_bio_10_07_c: "ইথিলিন পাতা ও কুঁড়ি ঝরিয়ে দেবে।",
        opt_bio_10_07_d: "ফ্লোরিজেন কেবল ফুল ফোটাতে ভূমিকা রাখে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.১",
        pageNumber: 207
      },
      proTipShortcut: "কলমে মূল গজানো = অক্সিন হরমোন।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_08",
    topicId: "top_ssc_biology_ch10_1",
    type: "MCQ",
    stem: "কোন বিজ্ঞানীদ্বয় প্রমাণ করেন যে ফাইটোহরমোন অত্যন্ত লঘু ঘনত্বে উদ্ভিদের শারীরবৃত্তীয় কার্যক্রম পরিচালনা করে?",
    options: [
      { id: "opt_bio_10_08_a", text: "থিম্যান ও ওয়েন্ট (Thimann & Went)", isCorrect: true },
      { id: "opt_bio_10_08_b", text: "রবার্ট হুক ও লিউয়েনহুক", isCorrect: false },
      { id: "opt_bio_10_08_c", text: "ওয়াটসন ও ক্রিক", isCorrect: false },
      { id: "opt_bio_10_08_d", text: "মারগুলিস ও হুইটটেকার", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: থিম্যান ও ওয়েন্ট (Thimann & Went)।",
      coreConcept: "থিম্যান ও ওয়েন্ট ফাইটোহরমোনের প্রভাব ও জৈব রাসায়নিক ক্রিয়া বিশদভাবে প্রতিপাদন করেন।",
      distractorAnalysis: {
        opt_bio_10_08_b: "রবার্ট হুক কোষ এবং লিউয়েনহুক অণুজীব আবিষ্কার করেন।",
        opt_bio_10_08_c: "ওয়াটসন ও ক্রিক DNA-এর দ্বি-সূত্রক গঠন মডেল দেন।",
        opt_bio_10_08_d: "হুইটটেকার ও মারগুলিস ৫ রাজ্য শ্রেণিবিন্যাস দেন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.১",
        pageNumber: 205
      },
      proTipShortcut: "ফাইটোহরমোনের আধুনিক গবেষণা = থিম্যান ও ওয়েন্ট।"
    },
    difficulty: "HARD",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------
  // Topic 10.1: CQs (Questions 09, 10)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_09",
    topicId: "top_ssc_biology_ch10_1",
    type: "CQ_CREATIVE",
    stem: "কৃষি গবেষণাগারে বৈজ্ঞানিক কর্মকর্তা দুটি ভিন্ন টবের চারা উদ্ভিদের ওপর দুটি রাসায়নিক পদার্থ 'P' ও 'Q' স্প্রে করলেন। কয়েকদিন পর দেখা গেল, 'P' প্রয়োগকৃত খাটো উদ্ভিদটির কাণ্ডের পর্বমধ্য অস্বাভাবিক লম্বা হয়ে গেছে এবং সুপ্ত বীজ দ্রুত অঙ্কুরিত হয়েছে। অপরদিকে 'Q' প্রয়োগকৃত ফলগুলো সময়ের পূর্বেই চমৎকারভাবে পেকে সুবাস ছড়াচ্ছে।",
    options: null,
    explanation: {
      directAnswer: "'P' হলো জিবেরেলিন এবং 'Q' হলো ইথিলিন।",
      coreConcept: "উদ্ভিদের পর্বমধ্যের বৃদ্ধি ও বীজের সুপ্তাবস্থা ভাঙতে জিবেরেলিন এবং ফল পাকাতে গ্যাসীয় ইথিলিন কাজ করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.১",
        pageNumber: 206
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ফাইটোহরমোন কাকে বলে তা নির্ভুলভাবে লেখা।" },
      kha: { mark: 2, criteria: "অ্যাবসিসিক অ্যাসিডকে কেন উদ্ভিদের স্ট্রেস হরমোন বলা হয় তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের 'P' হরমোনটির বৈশিষ্ট্য ও শারীরবৃত্তীয় কার্যপ্রণালী পাঠ্যবইয়ের আলোকে বর্ণনা করা।" },
      gha: { mark: 4, criteria: "আধুনিক বাণিজ্যিক কৃষিতে উদ্দীপকের 'Q' হরমোনটির অর্থনৈতিক গুরুত্ব ও অপব্যবহার রোধের উপায় বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_10",
    topicId: "top_ssc_biology_ch10_1",
    type: "CQ_CREATIVE",
    stem: "দশম শ্রেণির শিক্ষার্থী তামিম লক্ষ্য করল তার বাগানের একটি ডালিয়া গাছে শীতের শুরুতে প্রচুর ফুল ফুটলেও একই বাগানের চন্দ্রমল্লিকা গাছে আলো কমানোর পর ফুল আসল। তামিম শিক্ষককে জিজ্ঞেস করলে শিক্ষক বললেন, “উদ্ভিদের ফুল ফোটা ও সমন্বয়ে কেবল হরমোন নয়, নির্দিষ্ট আলো-আঁধারের দৈর্ঘ্য ও একটি বিশেষ ফাইটোহরমোন সম্মিলিতভাবে কাজ করে।”",
    options: null,
    explanation: {
      directAnswer: "পাতায় উৎপন্ন ফ্লোরিজেন ও ফটোপিরিয়ডিজম এর জন্য দায়ী।",
      coreConcept: "আলোকব্যাপ্তির ওপর ভিত্তি করে পাতায় ফ্লোরিজেন সংশ্লেষিত হয়ে মুকুলে সঞ্চালিত হয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.১",
        pageNumber: 207
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ফ্লোরিজেন কী তা এক বাক্যে স্পষ্ট লেখা।" },
      kha: { mark: 2, criteria: "চার্লস ডারউইন কীভাবে অক্সিনের উপস্থিতি আবিষ্কার করেছিলেন সংক্ষেপে ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের ডালিয়া উদ্ভিদে ফুল ফোটায় ফ্লোরিজেনের সঞ্চালন পথ ও ভূমিকা উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "উদ্ভিদে সমন্বয় সাধনে বৃদ্ধিবর্ধক ও বৃদ্ধিরোধক ফাইটোহরমোনের ভারসাম্যের তাৎপর্য মূল্যায়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "ক্যাডেট কলেজ মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------
  // Topic 10.2: উদ্ভিদের চলন ও আলো-অভিকর্ষীয় প্রভাব (MCQs 11-16)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_11",
    topicId: "top_ssc_biology_ch10_2",
    type: "MCQ",
    stem: "উদ্ভিদের কাণ্ডের অগ্রভাগ সূর্যালোকের উৎসের দিকে বক্রভাবে বৃদ্ধি পাওয়াকে কোন ধরনের চলন বলে?",
    options: [
      { id: "opt_bio_10_11_a", text: "অনুকূল আলোকমুখী (পজিটিভ ফটোট্রপিক)", isCorrect: true },
      { id: "opt_bio_10_11_b", text: "প্রতিকূল আলোকমুখী (নেগেটিভ ফটোট্রপিক)", isCorrect: false },
      { id: "opt_bio_10_11_c", text: "অনুকূল অভিকর্ষমুখী (পজিটিভ জিওট্রপিক)", isCorrect: false },
      { id: "opt_bio_10_11_d", text: "কেমোট্রপিক চলন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অনুকূল আলোকমুখী (পজিটিভ ফটোট্রপিক)।",
      coreConcept: "কাণ্ড আলোর দিকে বাড়ে বলে তা পজিটিভ ফটোট্রপিক; মূল আলোর বিপরীতে বাড়ে বলে নেগেটিভ ফটোট্রপিক।",
      distractorAnalysis: {
        opt_bio_10_11_b: "উদ্ভিদের মূল হলো নেগেটিভ ফটোট্রপিক কারণ তা আলো থেকে দূরে মাটির গভীরে যায়।",
        opt_bio_10_11_c: "পজিটিভ জিওট্রপিক চলন প্রদর্শন করে মূল, কাণ্ড নয়।",
        opt_bio_10_11_d: "কেমোট্রপিক চলন রাসায়নিক উদ্দীপকের প্রভাবে ঘটে (যেমন পরাগনালিকা)।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.২",
        pageNumber: 208
      },
      proTipShortcut: "কাণ্ড আলোর দিকে যায় = পজিটিভ ফটোট্রপিক।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_12",
    topicId: "top_ssc_biology_ch10_2",
    type: "MCQ",
    stem: "একটি চারাগাছের টব মাটিতে আনুভূমিকভাবে শুইয়ে রাখলেও কয়েকদিন পর মূল মাটির নিচের দিকে বেঁকে প্রবেশ করে। এটি কোন চলনের নিদর্শন?",
    options: [
      { id: "opt_bio_10_12_a", text: "পজিটিভ গ্র্যাভিট্রপিজম (অনুকূল অভিকর্ষীয় চলন)", isCorrect: true },
      { id: "opt_bio_10_12_b", text: "নেগেটিভ গ্র্যাভিট্রপিজম", isCorrect: false },
      { id: "opt_bio_10_12_c", text: "সিসমোন্যাস্টিক চলন", isCorrect: false },
      { id: "opt_bio_10_12_d", text: "কেমোট্রপিক চলন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পজিটিভ গ্র্যাভিট্রপিজম (অনুকূল অভিকর্ষীয় চলন)।",
      coreConcept: "মূল পৃথিবীর অভিকর্ষ বলের অনুকূলে বৃদ্ধি পায়, তাই এটি পজিটিভ জিওট্রপিক বা গ্র্যাভিট্রপিক চলন।",
      distractorAnalysis: {
        opt_bio_10_12_b: "কাণ্ড অভিকর্ষের বিপরীতে উপরের দিকে ওঠে, তাই কাণ্ড হলো নেগেটিভ জিওট্রপিক।",
        opt_bio_10_12_c: "সিসমোন্যাস্টিক চলন লজ্জাবতী পাতায় স্পর্শে ঘটে।",
        opt_bio_10_12_d: "কেমোট্রপিজম রাসায়নিক উদ্দীপকের সাপেক্ষে চলন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.২",
        pageNumber: 209
      },
      proTipShortcut: "মূল নিচের দিকে যায় = পজিটিভ গ্র্যাভিট্রপিজম।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_13",
    topicId: "top_ssc_biology_ch10_2",
    type: "MCQ",
    stem: "পরাগায়নের পর পরাগনালিকা গর্ভমুণ্ড ও গর্ভদণ্ড ভেদ করে ডিম্বকের রাসায়নিক পদার্থের আকর্ষণে অগ্রসর হওয়া কোন চলন?",
    options: [
      { id: "opt_bio_10_13_a", text: "ফটোট্রপিজম", isCorrect: false },
      { id: "opt_bio_10_13_b", text: "কেমোট্রপিজম (Chemotropism)", isCorrect: true },
      { id: "opt_bio_10_13_c", text: "গ্র্যাভিট্রপিজম", isCorrect: false },
      { id: "opt_bio_10_13_d", text: "হাইড্রোট্রপিজম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কেমোট্রপিজম (Chemotropism)।",
      coreConcept: "ডিম্বাশয় ও ডিম্বক থেকে নিঃসৃত রাসায়নিক পদার্থের (চিনির দ্রবণ বা বিশেষ প্রোটিন) আকর্ষণে পরাগনালিকা ধাবিত হওয়া হলো কেমোট্রপিক চলন।",
      distractorAnalysis: {
        opt_bio_10_13_a: "ফটোট্রপিজম আলোর প্রতি সাড়া দেয়।",
        opt_bio_10_13_c: "গ্র্যাভিট্রপিজম অভিকর্ষের প্রতি সাড়া দেয়।",
        opt_bio_10_13_d: "হাইড্রোট্রপিজম পানির উৎসের প্রতি সাড়া দেয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.২",
        pageNumber: 209
      },
      proTipShortcut: "পরাগনালিকার গতি = কেমোট্রপিজম (কেমিক্যাল আকর্ষণ)।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_14",
    topicId: "top_ssc_biology_ch10_2",
    type: "MCQ",
    stem: "নিচের কোন উদ্ভিদটি 'ছোট দিনের উদ্ভিদ' (Short-Day Plant) যার পুষ্পায়নের জন্য দৈনিক ৮–১২ ঘণ্টা আলো প্রয়োজন?",
    options: [
      { id: "opt_bio_10_14_a", text: "চন্দ্রমল্লিকা (Chrysanthemum)", isCorrect: true },
      { id: "opt_bio_10_14_b", text: "লেটুস (Lettuce)", isCorrect: false },
      { id: "opt_bio_10_14_c", text: "পালং শাক (Spinach)", isCorrect: false },
      { id: "opt_bio_10_14_d", text: "টমেটো (Tomato)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: চন্দ্রমল্লিকা (Chrysanthemum)।",
      coreConcept: "চন্দ্রমল্লিকা ও ডালিয়া ছোট দিনের উদ্ভিদ যা শীতকালে কম দৈর্ঘ্যের আলোতে ফুল ফোটায়।",
      distractorAnalysis: {
        opt_bio_10_14_b: "লেটুস দীর্ঘ দিনের উদ্ভিদ (১২ ঘণ্টার বেশি আলো দরকার)।",
        opt_bio_10_14_c: "পালং শাক দীর্ঘ দিনের উদ্ভিদ।",
        opt_bio_10_14_d: "টমেটো দিবস-নিরপেক্ষ উদ্ভিদ (Day-neutral)।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.২",
        pageNumber: 209
      },
      proTipShortcut: "শীতের ফুল (চন্দ্রমল্লিকা, ডালিয়া) = ছোট দিনের উদ্ভিদ।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_15",
    topicId: "top_ssc_biology_ch10_2",
    type: "MCQ",
    stem: "ফটোট্রপিক চলনের সময় কান্ডের অগ্রভাগে উৎপন্ন অক্সিন আলোর উপস্থিতিতে কোন অংশে বেশি ঘনমাত্রায় জমা হয়?",
    options: [
      { id: "opt_bio_10_15_a", text: "আলোকিত পাশে", isCorrect: false },
      { id: "opt_bio_10_15_b", text: "বিপরীত অন্ধকার বা ছায়াযুক্ত পাশে", isCorrect: true },
      { id: "opt_bio_10_15_c", text: "মূলের ডগায়", isCorrect: false },
      { id: "opt_bio_10_15_d", text: "পত্ররন্ধ্রে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বিপরীত অন্ধকার বা ছায়াযুক্ত পাশে।",
      coreConcept: "অক্সিন আলোবিমুখ; আলো একপাশ থেকে পড়লে তা অন্ধকার পাশে চলে যায় এবং সেখানকার কোষের দ্রুত প্রসারণ ঘটিয়ে ডালটিকে আলোর দিকে বাঁকায়।",
      distractorAnalysis: {
        opt_bio_10_15_a: "আলোকিত পাশে অক্সিন দ্রুত নিষ্ক্রিয় হয় বা কমে যায়।",
        opt_bio_10_15_c: "মূলের ডগায় কাণ্ডের শীর্ষের অক্সিন দ্রুত সঞ্চিত হয়ে ফটোট্রপিজম ঘটায় না।",
        opt_bio_10_15_d: "পত্ররন্ধ্রে অক্সিন নয়, স্টোমাটা খোলা-বন্ধ নিয়ন্ত্রণ করে ABA ও পটাশিয়াম।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.২",
        pageNumber: 208
      },
      proTipShortcut: "অক্সিন আলো ভয় পায়, তাই ছায়ার পাশে জমে কোষ লম্বা করে!"
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_16",
    topicId: "top_ssc_biology_ch10_2",
    type: "MCQ",
    stem: "দিবস-নিরপেক্ষ উদ্ভিদের (Day-neutral Plant) ক্ষেত্রে কোনটি সত্য?",
    options: [
      { id: "opt_bio_10_16_a", text: "ফুল ফোটার জন্য নির্দিষ্ট আলোককাল অপরিহার্য নয়", isCorrect: true },
      { id: "opt_bio_10_16_b", text: "দৈনিক ১৬ ঘণ্টার বেশি আলো ছাড়া ফুল ফুটবে না", isCorrect: false },
      { id: "opt_bio_10_16_c", text: "অন্ধকার সময় ব্যাহত হলে পুষ্পায়ন বন্ধ থাকে", isCorrect: false },
      { id: "opt_bio_10_16_d", text: "এরা কেবল শীতকালের ক্ষুদ্র দিনে ফুল ফোটায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ফুল ফোটার জন্য নির্দিষ্ট আলোককাল অপরিহার্য নয়।",
      coreConcept: "দিবস-নিরপেক্ষ উদ্ভিদ (যেমন শসা, টমেটো, সূর্যমুখী) নির্দিষ্ট বয়োবৃদ্ধিতে স্বতঃস্ফূর্তভাবে ফুল ফোটায়, আলোর দৈর্ঘ্য এখানে বাধা নয়।",
      distractorAnalysis: {
        opt_bio_10_16_b: "এটি দীর্ঘ দিনের উদ্ভিদের বৈশিষ্ট্য।",
        opt_bio_10_16_c: "এটি ছোট দিনের উদ্ভিদের বৈশিষ্ট্য যাদের অবিচ্ছিন্ন অন্ধকার লাগে।",
        opt_bio_10_16_d: "শীতকালে ছোট দিনের উদ্ভিদ ফোটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.২",
        pageNumber: 209
      },
      proTipShortcut: "দিবস-নিরপেক্ষ = আলোর সময় নিয়ে কোনো বাছবিচার নেই (টমেটো, শসা)।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------
  // Topic 10.2: CQs (Questions 17, 18)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_17",
    topicId: "top_ssc_biology_ch10_2",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান প্রদর্শনীর জন্য রাফি একটি আবদ্ধ কাঠের বাক্সের একপাশে একটি ছোট ছিদ্র রেখে ভেতরে একটি টবে রোপিত কচি সূর্যমুখী চারা রাখল। কয়েকদিন পর বাক্সের ঢাকনা খুলে দেখা গেল চারাটির কাণ্ডটি বাঁকা হয়ে ছিদ্রের আলোর দিকে ঝুঁকে গেছে। রাফির বন্ধু বলল, “এভাবে আলো ছাড়াও পৃথিবীর টান ও পানির খোঁজে উদ্ভিদের অঙ্গের ভিন্নমুখী চলন ঘটে থাকে।”",
    options: null,
    explanation: {
      directAnswer: "আলোর দিকে কাণ্ডের বৃদ্ধি হলো পজিটিভ ফটোট্রপিজম।",
      coreConcept: "একপার্শ্বীয় আলোতে অক্সিন অসমভাবে বণ্টিত হয়ে ফটোট্রপিক বক্রচলন ঘটায়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.২",
        pageNumber: 208
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ট্রপিক চলন বা অনুচলন কাকে বলে তা লেখা।" },
      kha: { mark: 2, criteria: "উদ্ভিদের কাণ্ড ও মূলের জিওট্রপিক চলনের পার্থক্য নিরূপণ করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের সূর্যমুখী চারার কাণ্ডটি আলোর দিকে বেঁকে যাওয়ার কারণ কোষীয় ও হরমোনীয় পর্যায়ে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "উদ্ভিদের বেঁচে থাকা ও পুষ্টি আহরণে ট্রপিক চলনসমূহের (আলো, অভিকর্ষ ও পানি) সম্মিলিত গুরুত্ব বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_18",
    topicId: "top_ssc_biology_ch10_2",
    type: "CQ_CREATIVE",
    stem: "একটি কৃষি ফার্মে গ্রিনহাউসে তিন ধরনের ফসলের চাষ করা হচ্ছে: ফসল X (দৈনিক ৮ ঘণ্টা আলো পায়), ফসল Y (দৈনিক ১৪ ঘণ্টা আলো পায়) এবং ফসল Z (যেকোনো দৈর্ঘ্যের আলো পেলেও সমানভাবে বাড়ে)। দেখা গেল, শীতের দিনে ফসল X সফলভাবে ফুল ও ফল ধারণ করলেও ফসল Y-এ কোনো ফুল ফুটছে না।",
    options: null,
    explanation: {
      directAnswer: "ফসল X হলো ছোট দিনের উদ্ভিদ, Y হলো দীর্ঘ দিনের উদ্ভিদ, Z হলো দিবস-নিরপেক্ষ উদ্ভিদ।",
      coreConcept: "আলোকব্যাপ্তি (Photoperiodism) উদ্ভিদের প্রজনন ও পুষ্পধারণের সময়কাল নিয়ন্ত্রণ করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.২",
        pageNumber: 209
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ফটোপিরিয়ডিজম বা আলোকব্যাপ্তি কাকে বলে তা সংজ্ঞায়িত করা।" },
      kha: { mark: 2, criteria: "লজ্জাবতী উদ্ভিদের পাতার চলন কেন ট্রপিক চলন নয় তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের ফসল X, Y এবং Z-এর আলোক সংবেদনশীলতার শ্রেণিবিভাগ কারণসহ বর্ণনা করা।" },
      gha: { mark: 4, criteria: "কৃষিক্ষেত্রে সারা বছর অফ-সিজন ফল ও সবজি উৎপাদনে আলোকব্যাপ্তি নিয়ন্ত্রণের প্রয়োগিক সম্ভাবনা মূল্যায়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------
  // Topic 10.3: মানব স্নায়ুতন্ত্র, নিউরনের গঠন ও সাইন্যাপস (MCQs 19-28)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_19",
    topicId: "top_ssc_biology_ch10_3",
    type: "MCQ",
    stem: "স্নায়ুতন্ত্রের গঠনগত ও কার্যকরী মৌলিক একক কোনটি?",
    options: [
      { id: "opt_bio_10_19_a", text: "নিউরন (Neuron)", isCorrect: true },
      { id: "opt_bio_10_19_b", text: "নেফ্রন (Nephron)", isCorrect: false },
      { id: "opt_bio_10_19_c", text: "সাইন্যাপস (Synapse)", isCorrect: false },
      { id: "opt_bio_10_19_d", text: "মায়েলিন শিথ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: নিউরন (Neuron)।",
      coreConcept: "নিউরন হলো স্নায়ুতন্ত্রের গঠন ও কাজের একক; মানবদেহে প্রায় ১০০ বিলিয়ন নিউরন থাকে।",
      distractorAnalysis: {
        opt_bio_10_19_b: "নেফ্রন হলো বৃক্কের (কিডনির) গঠন ও কাজের একক (অধ্যায় ৮)।",
        opt_bio_10_19_c: "সাইন্যাপস হলো দুটি নিউরনের মধ্যবর্তী সংযোগস্থল।",
        opt_bio_10_19_d: "মায়েলিন শিথ হলো অ্যাক্সনের চর্বিজাতীয় আবরণী।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৩",
        pageNumber: 210
      },
      proTipShortcut: "বিভ্রান্ত হবেন না: স্নায়ুর একক নিউরন, কিডনির একক নেফ্রন!"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_20",
    topicId: "top_ssc_biology_ch10_3",
    type: "MCQ",
    stem: "মানবদেহের পরিণত স্নায়ুকোষ বা নিউরন কেন মাইটোসিস কোষ বিভাজনে অংশ নিতে পারে না?",
    options: [
      { id: "opt_bio_10_20_a", text: "নিউক্লিয়াস অনুপস্থিত থাকার কারণে", isCorrect: false },
      { id: "opt_bio_10_20_b", text: "কোষদেহের সেন্ট্রিওল নিষ্ক্রিয় বা অকার্যকর থাকে বলে", isCorrect: true },
      { id: "opt_bio_10_20_c", text: "মাইটোকন্ড্রিয়া না থাকার কারণে", isCorrect: false },
      { id: "opt_bio_10_20_d", text: "কোষপ্রাচীর অত্যন্ত পুরু হওয়ায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কোষদেহের সেন্ট্রিওল নিষ্ক্রিয় বা অকার্যকর থাকে বলে।",
      coreConcept: "কোষ বিভাজনের জন্য স্পিন্ডল তন্তু গঠনকারী সেন্ট্রিওল অপরিহার্য; নিউরনের সেন্ট্রিওল নিষ্ক্রিয় থাকায় এটি বিভাজিত হয় না।",
      distractorAnalysis: {
        opt_bio_10_20_a: "নিউরনে একটি স্পষ্ট ও বৃহৎ নিউক্লিয়াস বিদ্যমান।",
        opt_bio_10_20_c: "নিউরনে বিপাকীয় শক্তির জন্য প্রচুর মাইটোকন্ড্রিয়া থাকে।",
        opt_bio_10_20_d: "প্রাণিকোষে (নিউরনে) কোষপ্রাচীর থাকেই না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৩",
        pageNumber: 210
      },
      proTipShortcut: "নিউরন অমর কিন্তু অনুর্বর—সেন্ট্রিওল নিষ্ক্রিয়!"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_21",
    topicId: "top_ssc_biology_ch10_3",
    type: "MCQ",
    stem: "একটি আদর্শ নিউরনের কোষদেহের চারপাশ থেকে সৃষ্ট ক্ষুদ্র ও শাখান্বিত প্রবর্ধক যা উদ্দীপনা গ্রহণ করে কোষদেহে আনে, তাকে কী বলে?",
    options: [
      { id: "opt_bio_10_21_a", text: "অ্যাক্সন (Axon)", isCorrect: false },
      { id: "opt_bio_10_21_b", text: "ডেনড্রাইট (Dendrite)", isCorrect: true },
      { id: "opt_bio_10_21_c", text: "মায়েলিন শিথ", isCorrect: false },
      { id: "opt_bio_10_21_d", text: "সাইন্যাপটিক নব", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ডেনড্রাইট (Dendrite)।",
      coreConcept: "ডেনড্রাইট কোষদেহের দিকে সংকেত বহন করে (অভিমুখী বা Centripetal); অ্যাক্সন কোষদেহ থেকে দূরে সংকেত নেয়।",
      distractorAnalysis: {
        opt_bio_10_21_a: "অ্যাক্সন হলো একক দীর্ঘ তন্তু যা সংকেত দূরে পাঠায়।",
        opt_bio_10_21_c: "মায়েলিন শিথ হলো অ্যাক্সনের অন্তরণ আবরণী।",
        opt_bio_10_21_d: "সাইন্যাপটিক নব অ্যাক্সন প্রান্তের স্ফীত অংশ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৩",
        pageNumber: 211
      },
      proTipShortcut: "ডেনড্রাইট আনে (Inward), অ্যাক্সন নেয় (Outward)।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_22",
    topicId: "top_ssc_biology_ch10_3",
    type: "MCQ",
    stem: "অ্যাক্সনের মায়েলিন শিথের নির্দিষ্ট ব্যবধানে অবস্থিত অনাবৃত খাঁজ বা বিরতিকে কী বলা হয়?",
    options: [
      { id: "opt_bio_10_22_a", text: "রেনভিয়ারের পর্ব (Node of Ranvier)", isCorrect: true },
      { id: "opt_bio_10_22_b", text: "অ্যাক্সন হিলক", isCorrect: false },
      { id: "opt_bio_10_22_c", text: "নিসল দানা", isCorrect: false },
      { id: "opt_bio_10_22_d", text: "সাইন্যাপটিক ক্লেফট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: রেনভিয়ারের পর্ব (Node of Ranvier)।",
      coreConcept: "রেনভিয়ারের পর্বে মায়েলিন থাকে না, ফলে স্নায়ু উদ্দীপনা লাফিয়ে লাফিয়ে অত্যন্ত দ্রুত গতিতে চলে।",
      distractorAnalysis: {
        opt_bio_10_22_b: "অ্যাক্সন হিলক হলো কোষদেহের যেখান থেকে অ্যাক্সনের উৎপত্তি হয়।",
        opt_bio_10_22_c: "নিসল দানা কোষদেহে প্রোটিন সংশ্লেষণকারী সাইটোপ্লাজমীয় উপাদান।",
        opt_bio_10_22_d: "সাইন্যাপটিক ক্লেফট হলো দুটি নিউরনের মধ্যবর্তী অতি ক্ষুদ্র ফাঁকা স্থান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৩",
        pageNumber: 211
      },
      proTipShortcut: "মায়েলিনের খাঁজ = রেনভিয়ারের পর্ব।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_23",
    topicId: "top_ssc_biology_ch10_3",
    type: "MCQ",
    stem: "দুটি নিউরনের মধ্যবর্তী কার্যকরী সংযোগস্থলকে কী বলে যেখানে রাসায়নিক সংকেত পরিবাহিত হয়?",
    options: [
      { id: "opt_bio_10_23_a", text: "সাইন্যাপস (Synapse)", isCorrect: true },
      { id: "opt_bio_10_23_b", text: "মেনিনজেস", isCorrect: false },
      { id: "opt_bio_10_23_c", text: "কর্পাস ক্যালোসাম", isCorrect: false },
      { id: "opt_bio_10_23_d", text: "সেন্ট্রোসোম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সাইন্যাপস (Synapse)।",
      coreConcept: "প্রথম নিউরনের অ্যাক্সন ও পরবর্তী নিউরনের ডেনড্রাইটের সংযোগস্থল হলো সাইন্যাপস।",
      distractorAnalysis: {
        opt_bio_10_23_b: "মেনিনজেস হলো মস্তিষ্কের ত্রিস্তরীয় আবরণী।",
        opt_bio_10_23_c: "কর্পাস ক্যালোসাম গুরুমস্তিষ্কের দুই গোলার্ধকে যুক্ত করে।",
        opt_bio_10_23_d: "সেন্ট্রোসোম কোষ অঙ্গাণু।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৩",
        pageNumber: 211
      },
      proTipShortcut: "নিউরনের মিলনমেলা = সাইন্যাপস।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_24",
    topicId: "top_ssc_biology_ch10_3",
    type: "MCQ",
    stem: "সাইন্যাপসে স্নায়ু তাড়না পরিবহনের জন্য দায়ী প্রধান রাসায়নিক নিউরোট্রান্সমিটার কোনটি?",
    options: [
      { id: "opt_bio_10_24_a", text: "অ্যাসিটাইলকোলিন (Acetylcholine)", isCorrect: true },
      { id: "opt_bio_10_24_b", text: "হিমোগ্লোবিন", isCorrect: false },
      { id: "opt_bio_10_24_c", text: "পেপসিন", isCorrect: false },
      { id: "opt_bio_10_24_d", text: "ইনসুলিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ্যাসিটাইলকোলিন (Acetylcholine)।",
      coreConcept: "অ্যাক্সনের ভেসিকল থেকে অ্যাসিটাইলকোলিন নিঃসৃত হয়ে সাইন্যাপটিক ফাঁকা স্থানে ব্যাপিত হয়ে পরবর্তী কোষে সংকেত পাঠায়।",
      distractorAnalysis: {
        opt_bio_10_24_b: "হিমোগ্লোবিন রক্তের লোহিত কণিকায় অক্সিজেন পরিবহনকারী প্রোটিন।",
        opt_bio_10_24_c: "পেপসিন পাকস্থলীর প্রোটিন পরিপাককারী এনজাইম।",
        opt_bio_10_24_d: "ইনসুলিন অগ্ন্যাশয় নিঃসৃত হরমোন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৩",
        pageNumber: 212
      },
      proTipShortcut: "স্নায়ুর রাসায়নিক বার্তা প্রেরক = অ্যাসিটাইলকোলিন।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_25",
    topicId: "top_ssc_biology_ch10_3",
    type: "MCQ",
    stem: "সাইন্যাপসের মধ্য দিয়ে স্নায়ু তাড়না সর্বদা একমুখী (Unidirectional) প্রবাহিত হওয়ার কারণ কী?",
    options: [
      { id: "opt_bio_10_25_a", text: "নিউরোট্রান্সমিটার কেবল অ্যাক্সন প্রান্তেই থাকে, ডেনড্রাইটে নয়", isCorrect: true },
      { id: "opt_bio_10_25_b", text: "ডেনড্রাইটের দৈর্ঘ্য অ্যাক্সনের চেয়ে অনেক কম বলে", isCorrect: false },
      { id: "opt_bio_10_25_c", text: "মস্তিষ্ক সংকেতটিকে পেছন দিক থেকে টান দেয় বলে", isCorrect: false },
      { id: "opt_bio_10_25_d", text: "মায়েলিন শিথ উল্টো প্রবাহ আটকে দেয় বলে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: নিউরোট্রান্সমিটার কেবল অ্যাক্সন প্রান্তেই থাকে, ডেনড্রাইটে নয়।",
      coreConcept: "অ্যাক্সন বোতামে রাসায়নিক ভেসিকল থাকে এবং ডেনড্রাইটে গ্রাহক রিসেপ্টর থাকে, তাই সংকেত উল্টো দিকে যেতে পারে না।",
      distractorAnalysis: {
        opt_bio_10_25_b: "দৈর্ঘ্যের সাথে একমুখিতার কোনো শারীরবৃত্তীয় সম্পর্ক নেই।",
        opt_bio_10_25_c: "মস্তিষ্কের টান দেওয়ার দাবি সম্পূর্ণ অযৌক্তিক।",
        opt_bio_10_25_d: "মায়েলিন শিথ অন্তরণ দেয়, সাইন্যাপসে মায়েলিন থাকেই না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৩",
        pageNumber: 212
      },
      proTipShortcut: "অ্যাক্সন বোতামেই ভেসিকল থাকে, তাই সংকেত সর্বদা ওয়ান-ওয়ে (One-way)!"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_26",
    topicId: "top_ssc_biology_ch10_3",
    type: "MCQ",
    stem: "মানবদেহে মস্তিষ্ক থেকে কত জোড়া করোটি স্নায়ু (Cranial nerves) উৎপন্ন হয়?",
    options: [
      { id: "opt_bio_10_26_a", text: "১০ জোড়া", isCorrect: false },
      { id: "opt_bio_10_26_b", text: "১২ জোড়া", isCorrect: true },
      { id: "opt_bio_10_26_c", text: "৩১ জোড়া", isCorrect: false },
      { id: "opt_bio_10_26_d", text: "৩৩ জোড়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ১২ জোড়া।",
      coreConcept: "মস্তিষ্ক থেকে ১২ জোড়া করোটি স্নায়ু এবং সুষুম্নাকাণ্ড থেকে ৩১ জোড়া সুষুম্না স্নায়ু উৎপন্ন হয়।",
      distractorAnalysis: {
        opt_bio_10_26_a: "ব্যাঙ ও মাছে ১০ জোড়া করোটি স্নায়ু থাকে, মানুষে ১২ জোড়া।",
        opt_bio_10_26_c: "৩১ জোড়া হলো সুষুম্না স্নায়ু (Spinal nerves)।",
        opt_bio_10_26_d: "৩৩টি হলো মানুষের কশেরুকা (Vertebrae), স্নায়ু নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৩",
        pageNumber: 213
      },
      proTipShortcut: "করোটি স্নায়ু ১২ জোড়া (২৪টি), সুষুম্না স্নায়ু ৩১ জোড়া (৬২টি)।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_27",
    topicId: "top_ssc_biology_ch10_3",
    type: "MCQ",
    stem: "সুষুম্নাকাণ্ড (Spinal cord) থেকে মানবদেহের বিভিন্ন অংশে কত জোড়া সুষুম্না স্নায়ু বিস্তৃত হয়?",
    options: [
      { id: "opt_bio_10_27_a", text: "১২ জোড়া", isCorrect: false },
      { id: "opt_bio_10_27_b", text: "৩১ জোড়া", isCorrect: true },
      { id: "opt_bio_10_27_c", text: "২৩ জোড়া", isCorrect: false },
      { id: "opt_bio_10_27_d", text: "৪৬ জোড়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ৩১ জোড়া।",
      coreConcept: "সুষুম্নাকাণ্ড থেকে ৩১ জোড়া সুষুম্না স্নায়ু বের হয়ে সারা দেহে সংবেদী ও মোটর সংকেত বহন করে।",
      distractorAnalysis: {
        opt_bio_10_27_a: "১২ জোড়া হলো করোটি স্নায়ু।",
        opt_bio_10_27_c: "২৩ জোড়া মানুষের ক্রোমোজোম সংখ্যা।",
        opt_bio_10_27_d: "৪৬টি মোট ক্রোমোজোম।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৩",
        pageNumber: 213
      },
      proTipShortcut: "সুষুম্না স্নায়ু ৩১ জোড়া।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_28",
    topicId: "top_ssc_biology_ch10_3",
    type: "MCQ",
    stem: "দেহের অভ্যন্তরীণ অনৈচ্ছিক অঙ্গসমূহ যেমন হৃৎপিণ্ডের ছন্দ, খাদ্যনালীর পেরিস্টালসিস ও রক্তনালীর ব্যাস নিয়ন্ত্রণ করে স্নায়ুতন্ত্রের কোন অংশ?",
    options: [
      { id: "opt_bio_10_28_a", text: "কেন্দ্রীয় স্নায়ুতন্ত্র", isCorrect: false },
      { id: "opt_bio_10_28_b", text: "ঐচ্ছিক স্নায়ুতন্ত্র", isCorrect: false },
      { id: "opt_bio_10_28_c", text: "স্বয়ংক্রিয় স্নায়ুতন্ত্র (Autonomic Nervous System)", isCorrect: true },
      { id: "opt_bio_10_28_d", text: "করোটি স্নায়ু ২য় জোড়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: স্বয়ংক্রিয় স্নায়ুতন্ত্র (Autonomic Nervous System)।",
      coreConcept: "স্বয়ংক্রিয় স্নায়ুতন্ত্র (সমবেদী ও পরা-সমবেদী) অনৈচ্ছিক অঙ্গসমূহের অভ্যন্তরীণ ভারসাম্য রক্ষা করে।",
      distractorAnalysis: {
        opt_bio_10_28_a: "কেন্দ্রীয় স্নায়ুতন্ত্র মূলত মস্তিষ্ক ও সুষুম্নাকাণ্ড নিয়ে গঠিত।",
        opt_bio_10_28_b: "ঐচ্ছিক স্নায়ুতন্ত্র কঙ্কাল পেশির ইচ্ছাধীন সঞ্চালন চালায়।",
        opt_bio_10_28_d: "২য় জোড়া করোটি স্নায়ু হলো অপটিক স্নায়ু যা দর্শনের কাজ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৩",
        pageNumber: 213
      },
      proTipShortcut: "অনৈচ্ছিক অভ্যন্তরীণ অঙ্গ = স্বয়ংক্রিয় (Autonomic) স্নায়ুতন্ত্র।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------
  // Topic 10.3: CQs (Questions 29, 30)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_29",
    topicId: "top_ssc_biology_ch10_3",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান ক্লাসে শিক্ষক স্লাইডে একটি কোষ দেখিয়ে বললেন, “এই বিশেষ কোষটি মানবদেহের দীর্ঘতম কোষ হলেও এতে সেন্ট্রিওল অকার্যকর থাকায় এটি কখনো বিভাজিত হতে পারে না। এর দেহ থেকে নির্গত একটি দীর্ঘ তন্তুর চারদিকে চর্বিজাতীয় স্তরের মাঝে মাঝে খাঁজ রয়েছে যা সংকেত লম্ফমান সঞ্চালনে সাহায্য করে।”",
    options: null,
    explanation: {
      directAnswer: "কোষটি হলো নিউরন বা স্নায়ুকোষ।",
      coreConcept: "নিউরনের গঠন, সেন্ট্রিওলের নিষ্ক্রিয়তা এবং মায়েলিনযুক্ত রেনভিয়ারের পর্ব সংকেত পরিবহনে কাজ করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৩",
        pageNumber: 210
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "নিউরন কাকে বলে তা স্পষ্টভাবে সংজ্ঞায়িত করা।" },
      kha: { mark: 2, criteria: "ডেনড্রাইট ও অ্যাক্সনের মধ্যে দুটি সুস্পষ্ট গঠনগত পার্থক্য লেখা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে উল্লিখিত কোষটির চিহ্নিত চিত্র এঁকে বিভিন্ন অংশ চিহ্নিত করা।" },
      gha: { mark: 4, criteria: "স্নায়ুতন্তুতে মায়েলিন শিথ ও রেনভিয়ারের পর্ব উপস্থিত থাকার শারীরবৃত্তীয় গুরুত্ব বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_30",
    topicId: "top_ssc_biology_ch10_3",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞানাগারে দুটি পাশাপাশি নিউরনের ইলেকট্রন মাইক্রোগ্রাফ পর্যবেক্ষণকালে দেখা গেল, প্রথম নিউরনের শেষ প্রান্তের গোলাকার থলিগুলো থেকে এক ধরনের তরল রাসায়নিক পদার্থ নিঃসৃত হয়ে ক্ষুদ্র ফাঁকা স্থান অতিক্রম করে পরবর্তী নিউরনের শাখায় প্রবেশ করছে। শিক্ষক বললেন, “এই বিশেষ সংযোগস্থলটির কারণেই মানব স্নায়ুতন্ত্রে বার্তা কখনো উল্টো পথে ফিরে আসে না।”",
    options: null,
    explanation: {
      directAnswer: "সংযোগস্থলটি হলো সাইন্যাপস এবং রাসায়নিকটি অ্যাসিটাইলকোলিন।",
      coreConcept: "সাইন্যাপসে নিউরোট্রান্সমিটারের একমুখী নিঃসরণ স্নায়ু উদ্দীপনার নির্দিষ্ট পথ অক্ষুণ্ণ রাখে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৩",
        pageNumber: 211
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "সাইন্যাপস কী তা নির্ভুলভাবে লেখা।" },
      kha: { mark: 2, criteria: "নিউরোট্রান্সমিটার বলতে কী বোঝায় উদাহরণসহ ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের সংযোগস্থলে স্নায়ু উদ্দীপনা পরিবহনের কৌশল ধারাবাহিকভাবে বর্ণনা করা।" },
      gha: { mark: 4, criteria: "“সাইন্যাপস একটি জৈবিক একমুখী ভালভ (One-way valve)”—উক্তিটির যথার্থতা মূল্যায়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "ক্যাডেট কলেজ মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
