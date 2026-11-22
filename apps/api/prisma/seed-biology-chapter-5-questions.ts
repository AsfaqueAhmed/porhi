import { ContentStatus } from "@prisma/client";
import type { QuestionData } from "./seed-chapter-7-questions";

export const biologyChapter5QuestionsBatch1: QuestionData[] = [
  // -------------------------------------------------------------------------
  // TOPIC 5.1: উদ্ভিদের খনিজ পুষ্টি ও অভাবজনিত লক্ষণ (MCQs 01-12, CQs 01-03)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_5_01",
    topicId: "top_ssc_biology_ch5_1",
    type: "MCQ",
    stem: "উদ্ভিদের স্বাভাবিক বৃদ্ধির জন্য কতটি অজৈব খনিজ উপাদান অত্যাবশ্যকীয় (Essential elements)?",
    options: [
      { id: "opt_bio_5_01_a", text: "১০টি", isCorrect: false },
      { id: "opt_bio_5_01_b", text: "১৬টি", isCorrect: true },
      { id: "opt_bio_5_01_c", text: "২০টি", isCorrect: false },
      { id: "opt_bio_5_01_d", text: "৬০টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ১৬টি।",
      coreConcept: "উদ্ভিদদেহে প্রায় ৬০টি অজৈব মৌল পাওয়া গেলেও কেবল ১৬টি উপাদান তাদের স্বাভাবিক জীবনচক্র ও বৃদ্ধির জন্য একান্ত অপরিহার্য।",
      distractorAnalysis: {
        opt_bio_5_01_a: "১০টি হলো ম্যাক্রোনিউট্রিয়েন্ট বা প্রধান পুষ্টি উপাদান।",
        opt_bio_5_01_c: "২০টি হলো প্রোটিন গঠনকারী প্রাকৃতিক অ্যামাইনো এসিডের সংখ্যা।",
        opt_bio_5_01_d: "৬০টি হলো উদ্ভিদদেহে শনাক্তকৃত মোট অজৈব উপাদানের আনুমানিক সংখ্যা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 84
      },
      proTipShortcut: "মনে রাখো: ৬০টির মধ্যে ১৬টি অত্যাবশ্যকীয় (১০টি ম্যাক্রো + ৬টি মাইক্রো)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_02",
    topicId: "top_ssc_biology_ch5_1",
    type: "MCQ",
    stem: "নিচের কোন গ্রুপটির সবকটি উপাদানই উদ্ভিদের ম্যাক্রোনিউট্রিয়েন্ট (Macronutrients)?",
    options: [
      { id: "opt_bio_5_02_a", text: "N, P, K, Ca, Mg, S, Fe, C, H, O", isCorrect: true },
      { id: "opt_bio_5_02_b", text: "Zn, B, Mo, Cu, Mn, Cl", isCorrect: false },
      { id: "opt_bio_5_02_c", text: "N, P, K, Zn, Mn, Mo", isCorrect: false },
      { id: "opt_bio_5_02_d", text: "Ca, Mg, Fe, Cu, Cl, B", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: N, P, K, Ca, Mg, S, Fe, C, H, O।",
      coreConcept: "উদ্ভিদের স্বাভাবিক বৃদ্ধির জন্য বেশি পরিমাণে প্রয়োজনীয় ১০টি উপাদানকে ম্যাক্রোনিউট্রিয়েন্ট বলা হয়।",
      distractorAnalysis: {
        opt_bio_5_02_b: "এই ৬টি উপাদান হলো মাইক্রোনিউট্রিয়েন্ট (অল্প মাত্রায় প্রয়োজনীয়)।",
        opt_bio_5_02_c: "Zn, Mn, Mo মাইক্রো উপাদান, ফলে পুরো গ্রুপ ম্যাক্রো নয়।",
        opt_bio_5_02_d: "Cu, Cl, B হলো মাইক্রো উপাদান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 85
      },
      proTipShortcut: "ছন্দ: Mg K Cafe for Nice CHO (১০টি ম্যাক্রো উপাদান)।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_03",
    topicId: "top_ssc_biology_ch5_1",
    type: "MCQ",
    stem: "ক্লোরোফিল অণুর কেন্দ্রিয় পরমাণু হিসেবে কোন খনিজ আয়নটি বিদ্যমান?",
    options: [
      { id: "opt_bio_5_03_a", text: "লৌহ (Fe²⁺)", isCorrect: false },
      { id: "opt_bio_5_03_b", text: "ম্যাগনেসিয়াম (Mg²⁺)", isCorrect: true },
      { id: "opt_bio_5_03_c", text: "ক্যালসিয়াম (Ca²⁺)", isCorrect: false },
      { id: "opt_bio_5_03_d", text: "পটাশিয়াম (K⁺)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ম্যাগনেসিয়াম (Mg²⁺)।",
      coreConcept: "সবুজ বর্ণকণিকা ক্লোরোফিলের পোরফাইরিন বলয়ের কেন্দ্রস্থলে ম্যাগনেসিয়াম পরমাণু অবস্থান করে।",
      distractorAnalysis: {
        opt_bio_5_03_a: "লৌহ সাইটোক্রোম ও হিমোগ্লোবিনের কেন্দ্রে থাকে এবং ক্লোরোফিল সংশ্লেষে অনুঘটক হিসেবে কাজ করে।",
        opt_bio_5_03_c: "ক্যালসিয়াম কোষপ্রাচীরের মধ্যপর্দা গঠন করে।",
        opt_bio_5_03_d: "পটাশিয়াম কোষের অভিস্রবণ ও পত্ররন্ধ্র খোলা-বন্ধ নিয়ন্ত্রণ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 86
      },
      proTipShortcut: "রক্তের হিমোগ্লোবিনে থাকে Fe, আর উদ্ভিদের ক্লোরোফিলে থাকে Mg।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_04",
    topicId: "top_ssc_biology_ch5_1",
    type: "MCQ",
    stem: "মাটিতে নাইট্রোজেনের ঘাটতি হলে উদ্ভিদের পাতায় কোন লক্ষণটি প্রকাশ পায়?",
    options: [
      { id: "opt_bio_5_04_a", text: "পাতা বেগুনি বা তামাটে বর্ণ ধারণ করে", isCorrect: false },
      { id: "opt_bio_5_04_b", text: "পাতার ক্লোরোফিল নষ্ট হয়ে হলুদ হয়ে যায় (ক্লোরোসিস)", isCorrect: true },
      { id: "opt_bio_5_04_c", text: "পাতার কিনারা পুড়ে যাওয়ার মতো বাদামি হয়", isCorrect: false },
      { id: "opt_bio_5_04_d", text: "কচি পাতা কুঁকড়ে যায় ও বোঁটা ফেটে যায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ক্লোরোফিল নষ্ট হয়ে পাতা হলুদ হয়ে যায় (ক্লোরোসিস)।",
      coreConcept: "নাইট্রোজেনের অভাবে ক্লোরোফিল সৃষ্টিতে বিঘ্ন ঘটে, ফলে পাতা সবুজ থেকে হলুদ বর্ণ ধারণ করে (ক্লোরোসিস); এটি প্রথমে বয়স্ক পাতায় দেখা যায়।",
      distractorAnalysis: {
        opt_bio_5_04_a: "পাতা বেগুনি বা তামাটে হওয়া ফসফরাসের (P) অভাবজনিত লক্ষণ।",
        opt_bio_5_04_c: "পাতার কিনারা পুড়ে যাওয়ার মতো বাদামি হওয়া পটাশিয়ামের (K) অভাবজনিত লক্ষণ।",
        opt_bio_5_04_d: "পাতা কুঁকড়ে যাওয়া ও কান্ড ফেটে যাওয়া বোরন ও ক্যালসিয়ামের অভাবজনিত লক্ষণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 87
      },
      proTipShortcut: "N = ক্লোরোসিস (হলুদ পাতা); P = Purple/তামাটে পাতা; K = কিনারা পোড়া বাদামি।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_05",
    topicId: "top_ssc_biology_ch5_1",
    type: "MCQ",
    stem: "ফসফরাসের (P) অভাবে উদ্ভিদের পাতায় বিশেষ কোন পরিবর্তন লক্ষ্য করা যায়?",
    options: [
      { id: "opt_bio_5_05_a", text: "পাতা বেগুনি, নীলচে সবুজ বা তামাটে বর্ণ ধারণ করে", isCorrect: true },
      { id: "opt_bio_5_05_b", text: "পাতার প্রধান শিরাগুলো সাদা হয়ে যায়", isCorrect: false },
      { id: "opt_bio_5_05_c", text: "পাতার বোঁটায় ডাই-ব্যাক রোগ হয়", isCorrect: false },
      { id: "opt_bio_5_05_d", text: "পাতার আকার দ্বিগুণ বৃদ্ধি পায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পাতা বেগুনি, নীলচে সবুজ বা তামাটে বর্ণ ধারণ করে।",
      coreConcept: "ফসফরাসের অভাবে পাতার ক্লোরোফিল কমে গিয়ে অ্যান্থোসায়ানিন রঞ্জক বৃদ্ধি পাওয়ায় পাতা বেগুনি বা তামাটে হয় এবং উদ্ভিদের বৃদ্ধি থমকে যায়।",
      distractorAnalysis: {
        opt_bio_5_05_b: "শিরা সাদা হওয়া আয়রনের ঘাটতির চরম রূপ।",
        opt_bio_5_05_c: "ডাই-ব্যাক রোগ হয় সালফারের অভাবে।",
        opt_bio_5_05_d: "ঘাটতিজনিত কারণে উদ্ভিদের অঙ্গ কখনই অতিরিক্ত বৃদ্ধি পায় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 88
      },
      proTipShortcut: "P ফর Phosphorus, P ফর Purple (বেগুনি) ও তামাটে পাতা।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_06",
    topicId: "top_ssc_biology_ch5_1",
    type: "MCQ",
    stem: "পাতার শীর্ষ ও কিনারা হলুদ হয়ে পরে বাদামি বা পুড়ে যাওয়ার মতো বর্ণ (Marginal scorch) হয় কোন উপাদানের অভাবে?",
    options: [
      { id: "opt_bio_5_06_a", text: "পটাশিয়াম (K)", isCorrect: true },
      { id: "opt_bio_5_06_b", text: "ম্যাগনেসিয়াম (Mg)", isCorrect: false },
      { id: "opt_bio_5_06_c", text: "লৌহ (Fe)", isCorrect: false },
      { id: "opt_bio_5_06_d", text: "নাইট্রোজেন (N)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পটাশিয়াম (K)।",
      coreConcept: "পটাশিয়ামের ঘাটতিতে পাতার প্রান্তিক কোষগুলো পানিশূন্য হয়ে মারা যায়, ফলে পাতার কিনারা ও শীর্ষ বাদামি পুড়ে যাওয়ার মতো রূপ নেয় এবং শীর্ষ মুকুল নষ্ট হয়।",
      distractorAnalysis: {
        opt_bio_5_06_b: "ম্যাগনেসিয়ামের অভাবে আন্তঃশিরা ক্লোরোসিস দেখা যায়।",
        opt_bio_5_06_c: "লৌহের অভাবে কচি পাতায় ক্লোরোসিস হয়।",
        opt_bio_5_06_d: "নাইট্রোজেনের অভাবে সমগ্র পাতা সমানভাবে হলুদ হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 88
      },
      proTipShortcut: "পটাশিয়াম = পাতার কিনারা পোড়া বাদামি (Marginal necrosis)।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_07",
    topicId: "top_ssc_biology_ch5_1",
    type: "MCQ",
    stem: "উদ্ভিদের কাণ্ডের ডগা শুকিয়ে মরে যাওয়া বা ডাই-ব্যাক (Die-back) রোগ হয় কোনটির অভাবে?",
    options: [
      { id: "opt_bio_5_07_a", text: "সালফার (S)", isCorrect: true },
      { id: "opt_bio_5_07_b", text: "ফসফরাস (P)", isCorrect: false },
      { id: "opt_bio_5_07_c", text: "ক্যালসিয়াম (Ca)", isCorrect: false },
      { id: "opt_bio_5_07_d", text: "দস্তা (Zn)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সালফার (S)।",
      coreConcept: "সালফারের অভাবে উদ্ভিদের প্রোটিন গঠন বাধাগ্রস্ত হয়, কচি পাতা হলুদ হয় এবং কান্ডের ডগা শুকিয়ে মারা যায়, যাকে ডাই-ব্যাক রোগ বলে।",
      distractorAnalysis: {
        opt_bio_5_07_b: "ফসফরাস অভাবে পাতা বেগুনি হয়।",
        opt_bio_5_07_c: "ক্যালসিয়াম অভাবে কচি পাতা কুঁকড়ে যায়।",
        opt_bio_5_07_d: "দস্তার অভাবে পাতায় খর্বাকৃতি লিটল লিফ রোগ হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 89
      },
      proTipShortcut: "সালফার (S) = Shoot Die-back (ডগার মৃত্যু)।"
    },
    difficulty: "HARD",
    boardSource: "কুমিল্লা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_08",
    topicId: "top_ssc_biology_ch5_1",
    type: "MCQ",
    stem: "কচি পাতার বৃদ্ধি ব্যাহত হওয়া, পাতা বিকৃত হওয়া এবং কান্ড ফেটে যাওয়া কোন উপাদানের ঘাটতি নির্দেশ করে?",
    options: [
      { id: "opt_bio_5_08_a", text: "বোরন (B)", isCorrect: true },
      { id: "opt_bio_5_08_b", text: "ক্লোরিন (Cl)", isCorrect: false },
      { id: "opt_bio_5_08_c", text: "পটাশিয়াম (K)", isCorrect: false },
      { id: "opt_bio_5_08_d", text: "নাইট্রোজেন (N)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বোরন (B)।",
      coreConcept: "বোরন চিনি পরিবহন ও কোষপ্রাচীর গঠন নিয়ন্ত্রণ করে; এর অভাবে কচি পাতার গঠন বিকৃত হয় এবং কাণ্ড ফেটে যায়।",
      distractorAnalysis: {
        opt_bio_5_08_b: "ক্লোরিন সালোকসংশ্লেষণে পানি বিশ্লিষ্টকরণে অংশ নেয়।",
        opt_bio_5_08_c: "পটাশিয়াম পত্ররন্ধ্র নিয়ন্ত্রণ করে।",
        opt_bio_5_08_d: "নাইট্রোজেন সার্বিক দৈহিক বৃদ্ধি নিয়ন্ত্রণ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 89
      },
      proTipShortcut: "বোরন (B) = বিকৃত পাতা ও কান্ড ফেটে যাওয়া।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_09",
    topicId: "top_ssc_biology_ch5_1",
    type: "MCQ",
    stem: "উদ্ভিদ মাটি থেকে নাইট্রোজেন কোন আয়ন রূপে সর্বাধিক শোষণ করে?",
    options: [
      { id: "opt_bio_5_09_a", text: "নাইট্রেট (NO₃⁻) ও অ্যামোনিয়াম (NH₄⁺)", isCorrect: true },
      { id: "opt_bio_5_09_b", text: "নাইট্রাইট (NO₂⁻)", isCorrect: false },
      { id: "opt_bio_5_09_c", text: "আণবিক নাইট্রোজেন গ্যাস (N₂)", isCorrect: false },
      { id: "opt_bio_5_09_d", text: "নাইট্রাস অক্সাইড (N₂O)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: নাইট্রেট (NO₃⁻) ও অ্যামোনিয়াম (NH₄⁺)।",
      coreConcept: "উদ্ভিদ বাতাস থেকে সরাসরি N₂ গ্যাস নিতে পারে না; মাটিস্থ দ্রবণ থেকে নাইট্রেট অ্যানায়ন ও অ্যামোনিয়াম ক্যাটায়ন রূপে মূল দিয়ে গ্রহণ করে।",
      distractorAnalysis: {
        opt_bio_5_09_b: "নাইট্রাইট উদ্ভিদের জন্য ক্ষতিকর বা মধ্যবর্তী রূপ।",
        opt_bio_5_09_c: "উদ্ভিদ সরাসরি বায়বীয় নাইট্রোজেন শোষণ করতে পারে না (লেগিউম জাতীয় মূলের নডিউলে ব্যাকটেরিয়া এটি সংবন্ধন করে)।",
        opt_bio_5_09_d: "নাইট্রাস অক্সাইড একটি গ্রিনহাউস গ্যাস, পুষ্টি উপাদান নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 86
      },
      proTipShortcut: "উদ্ভিদের নাইট্রোজেন গ্রহণ = NO₃⁻ এবং NH₄⁺ আয়ন।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_10",
    topicId: "top_ssc_biology_ch5_1",
    type: "MCQ",
    stem: "কোষপ্রাচীরের মধ্যপর্দা (Middle lamella) গঠনে ক্যালসিয়াম কোন যৌগ হিসেবে অবস্থান করে?",
    options: [
      { id: "opt_bio_5_10_a", text: "ক্যালসিয়াম পেকটেট", isCorrect: true },
      { id: "opt_bio_5_10_b", text: "ক্যালসিয়াম কার্বনেট", isCorrect: false },
      { id: "opt_bio_5_10_c", text: "ক্যালসিয়াম অক্সালেট", isCorrect: false },
      { id: "opt_bio_5_10_d", text: "ক্যালসিয়াম সালফেট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ক্যালসিয়াম পেকটেট।",
      coreConcept: "উদ্ভিদ কোষের প্রাথমিক মধ্যপর্দা পেকটিক অ্যাসিড ও ক্যালসিয়াম যুক্ত হয়ে ক্যালসিয়াম পেকটেট হিসেবে সিমেন্টের মতো দৃঢ়তা দেয়।",
      distractorAnalysis: {
        opt_bio_5_10_b: "ক্যালসিয়াম কার্বনেট প্রাণীর খোলস ও চুনাপাথরে থাকে।",
        opt_bio_5_10_c: "ক্যালসিয়াম অক্সালেট কচু শাকে রেফাইড হিসেবে থাকে।",
        opt_bio_5_10_d: "ক্যালসিয়াম সালফেট হলো জিপসাম।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 87
      },
      proTipShortcut: "কোষপ্রাচীর মধ্যপর্দা = ক্যালসিয়াম ও ম্যাগনেসিয়াম পেকটেট।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_11",
    topicId: "top_ssc_biology_ch5_1",
    type: "MCQ",
    stem: "লৌহের (Fe) অভাবে উদ্ভিদের পাতায় কোন বিশেষ বৈশিষ্ট্যের ক্লোরোসিস দেখা দেয়?",
    options: [
      { id: "opt_bio_5_11_a", text: "প্রথমে কচি পাতা হলুদ হয় কিন্তু প্রধান শিরাগুলো সবুজ থাকে", isCorrect: true },
      { id: "opt_bio_5_11_b", text: "প্রথমে বয়স্ক পাতা হলুদ হয়ে ঝরে পড়ে", isCorrect: false },
      { id: "opt_bio_5_11_c", text: "পাতার ডগায় কালো ছোপ পড়ে", isCorrect: false },
      { id: "opt_bio_5_11_d", text: "পাতার উপরিভাগ সম্পূর্ণ নীলচে বেগুনি হয়ে যায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রথমে কচি পাতা হলুদ হয় কিন্তু প্রধান শিরাগুলো সবুজ থাকে।",
      coreConcept: "লৌহ একটি অচল (immobile) মৌল; ফলে এর অভাবে নতুন বা কচি পাতায় ক্লোরোফিল তৈরি ব্যাহত হয়, কিন্তু শিরাগুলো সাময়িক সবুজ থাকে।",
      distractorAnalysis: {
        opt_bio_5_11_b: "বয়স্ক পাতা আগে হলুদ হওয়া সচল নাইট্রোজেনের ঘাটতি লক্ষণ।",
        opt_bio_5_11_c: "কালো ছোপ সাধারণত ছত্রাকের আক্রমণে হয়।",
        opt_bio_5_11_d: "নীলচে বেগুনি রঙ ফসফরাস ঘাটতিতে হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 88
      },
      proTipShortcut: "N অভাব = পুরোনো পাতা হলুদ; Fe অভাব = কচি পাতা হলুদ (শিরা সবুজ)।"
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_12",
    topicId: "top_ssc_biology_ch5_1",
    type: "MCQ",
    stem: "উদ্ভিদের পত্ররন্ধ্র (Stomata) খোলা ও বন্ধ হওয়া নিয়ন্ত্রণ করে কোন খনিজ আয়ন?",
    options: [
      { id: "opt_bio_5_12_a", text: "পটাশিয়াম আয়ন (K⁺)", isCorrect: true },
      { id: "opt_bio_5_12_b", text: "সোডিয়াম আয়ন (Na⁺)", isCorrect: false },
      { id: "opt_bio_5_12_c", text: "সালফেট আয়ন (SO₄²⁻)", isCorrect: false },
      { id: "opt_bio_5_12_d", text: "বোরন আয়ন (BO₃³⁻)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পটাশিয়াম আয়ন (K⁺)।",
      coreConcept: "রক্ষীকোষে K⁺ আয়নের প্রবেশ ও নির্গমন অভিস্রবণিক চাপ পরিবর্তন করে পত্ররন্ধ্র খোলা ও বন্ধ নিয়ন্ত্রণ করে।",
      distractorAnalysis: {
        opt_bio_5_12_b: "উদ্ভিদের ক্ষেত্রে সোডিয়াম অত্যাবশ্যকীয় প্রধান আয়ন নয়।",
        opt_bio_5_12_c: "সালফেট সালফারযুক্ত অ্যামাইনো এসিডের উপাদান।",
        opt_bio_5_12_d: "বোরন পরাগনালির বৃদ্ধি নিয়ন্ত্রণ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 87
      },
      proTipShortcut: "K⁺ পাম্প থিওরি = পত্ররন্ধ্র খোলা-বন্ধ।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // TOPIC 5.1 CREATIVE QUESTIONS (CQs 01-03)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_5_cq_01",
    topicId: "top_ssc_biology_ch5_1",
    type: "CQ_CREATIVE",
    stem: "কৃষক জামিল সাহেব লক্ষ্য করলেন তার টমেটো ক্ষেতের নিচের দিকের বয়স্ক পাতাগুলো সম্পূর্ণ হলুদ হয়ে যাচ্ছে এবং গাছের সামগ্রিক বৃদ্ধি থমকে গেছে। অপরদিকে তার প্রতিবেশী কাশেম সাহেবের জমিতে টমেটো গাছের কাণ্ডের ডগা শুকিয়ে মরে যাচ্ছে এবং কচি পাতার ডগা বিকৃত হয়ে ফেটে যাচ্ছে। উপজেলা কৃষি কর্মকর্তা পরীক্ষা করে বললেন উভয় জমিতে নির্দিষ্ট দুটি অত্যাবশ্যকীয় পুষ্টি উপাদানের তীব্র ঘাটতি রয়েছে।",
    options: null,
    explanation: {
      directAnswer: "জামিল সাহেবের জমিতে নাইট্রোজেনের (N) এবং কাশেম সাহেবের জমিতে সালফার (S) ও বোরনের (B) ঘাটতি বিদ্যমান।",
      coreConcept: "অত্যাবশ্যকীয় পুষ্টি উপাদানের অভাব উদ্ভিদের বিশেষ বিশেষ অঙ্গে সুস্পষ্ট রোগলক্ষণ তৈরি করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 86
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "উদ্ভিদের ম্যাক্রো উপাদান কাকে বলে তা নির্ভুলভাবে লেখা।" },
      kha: { mark: 2, criteria: "ম্যাগনেসিয়ামকে উদ্ভিদের জন্য অত্যন্ত গুরুত্বপূর্ণ খনিজ উপাদান বলা হয় কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "জামিল সাহেবের জমির উদ্ভিদে যে রোগলক্ষণ প্রকাশ পেয়েছে তার কারণ ও উদ্ভিদের ওপর প্রভাব ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "কাশেম সাহেবের জমির সমস্যা নিরসনে কৃষি কর্মকর্তার পরামর্শের যৌক্তিকতা ও প্রতিকারমূলক পদক্ষেপ মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_cq_02",
    topicId: "top_ssc_biology_ch5_1",
    type: "CQ_CREATIVE",
    stem: "নবম শ্রেণির বিজ্ঞান ল্যাবরেটরিতে শিক্ষক তিনটি টবে একই বয়সের মরিচ গাছ রোপণ করলেন। টব-১ এ সকল পুষ্টি সমৃদ্ধ সুষম দ্রবণ দেওয়া হলো। টব-২ এর দ্রবণে পটাশিয়াম অনুপস্থিত রাখা হলো এবং টব-৩ এর দ্রবণে ফসফরাস বাদ রাখা হলো। কিছুদিন পর দেখা গেল টব-২ এর মরিচ গাছের পাতার কিনারা ও শীর্ষ পুড়ে যাওয়ার মতো বাদামি হয়ে গেছে। অপরদিকে টব-৩ এর উদ্ভিদের পাতা নীলচে-বেগুনি ও তামাটে বর্ণ ধারণ করে অকালে ঝরে পড়ছে।",
    options: null,
    explanation: {
      directAnswer: "টব-২ তে পটাশিয়াম ঘাটতিতে মার্জিনাল নেক্রোসিস এবং টব-৩ তে ফসফরাস ঘাটতিতে বেগুনি-তামাটে পাতা ও ফল ঝরা ঘটেছে।",
      coreConcept: "পটাশিয়াম ও ফসফরাসের পৃথক অভাবজনিত লক্ষণ উদ্ভিদের অঙ্গসংস্থানে স্পষ্টভাবে প্রতিফলিত হয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 88
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ক্লোরোসিস (Chlorosis) কি তা এক বাক্যে লেখা।" },
      kha: { mark: 2, criteria: "উদ্ভিদ কীভাবে মাটি থেকে খনিজ লবণ শোষণ করে তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "টব-২ এর উদ্ভিদের অস্বাভাবিকতার কারণ ও শারীরবৃত্তীয় ব্যাখ্যা উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "টব-৩ এর উদ্ভিদে দৃশ্যমান পরিবর্তনের পেছনে ফসফরাসের ভূমিকা এবং এর অর্থনৈতিক ক্ষতি বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_cq_03",
    topicId: "top_ssc_biology_ch5_1",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞানী আর্নন ও স্টাউট উদ্ভিদের পুষ্টি গবেষণায় ১৬টি উপাদানকে অত্যাবশ্যকীয় হিসেবে চিহ্নিত করেছেন। শিক্ষক ক্লাসে বললেন, “এই ১৬টি উপাদানের মধ্যে একটি উপাদান বাদ পড়লে উদ্ভিদ তার জীবনচক্র সম্পূর্ণ করতে পারে না এবং কোনো একটির অভাব অন্য কোনো উপাদান দ্বারা পূরণ করা অসম্ভব। বায়ুমণ্ডল থেকে কেবল ২টি উপাদান এবং বাকি ১৪টি মাটি থেকে আয়ন হিসেবে শোষিত হয়।”",
    options: null,
    explanation: {
      directAnswer: "১৬টি উপাদানের মধ্যে C ও O বাতাস থেকে এবং বাকি উপাদান মাটি থেকে মূলরোমের সাহায্যে গৃহীত হয়।",
      coreConcept: "অত্যাবশ্যকীয় পুষ্টি উপাদানের অনন্যতা এবং মাটি ও বায়বীয় উৎসের বিভাজন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.১",
        pageNumber: 84
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "উদ্ভিদের মাইক্রো উপাদান কয়টি তা উল্লেখ করা।" },
      kha: { mark: 2, criteria: "বায়ুমণ্ডল থেকে উদ্ভিদ কোন দুটি উপাদান সরাসরি গ্রহণ করে তা বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে উল্লিখিত উপাদানসমূহকে অত্যাবশ্যকীয় বলার শর্ত ৩টি বিস্তারিত আলোচনা করা।" },
      gha: { mark: 4, criteria: "“ম্যাক্রো ও মাইক্রো উভয় প্রকার উপাদানই উদ্ভিদের বেঁচে থাকার জন্য সমগুরুত্বপূর্ণ”—উক্তিটির যথার্থতা মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // TOPIC 5.2: প্রাণীর খাদ্য ও পুষ্টি উপাদান, আদর্শ খাদ্য পিরামিড (MCQs 13-24, CQs 04-06)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_5_13",
    topicId: "top_ssc_biology_ch5_2",
    type: "MCQ",
    stem: "প্রতি গ্রাম চর্বি বা স্নেহ পদার্থ সম্পূর্ণ জারণে মানবদেহে কত কিলোক্যালরি শক্তি উৎপন্ন হয়?",
    options: [
      { id: "opt_bio_5_13_a", text: "৪ কিলোক্যালরি", isCorrect: false },
      { id: "opt_bio_5_13_b", text: "৭ কিলোক্যালরি", isCorrect: false },
      { id: "opt_bio_5_13_c", text: "৯ কিলোক্যালরি", isCorrect: true },
      { id: "opt_bio_5_13_d", text: "১৭ কিলোক্যালরি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৯ কিলোক্যালরি।",
      coreConcept: "১ গ্রাম স্নেহ/চর্বি জারণে ৯.০–৯.৩ kcal (প্রায় ৩৮–৩৯.২ kJ) শক্তি উৎপন্ন হয়, যা শর্করা বা আমিষের দ্বিগুণেরও বেশি।",
      distractorAnalysis: {
        opt_bio_5_13_a: "৪ kcal হলো প্রতি গ্রাম শর্করা ও আমিষের শক্তিমূল্য।",
        opt_bio_5_13_b: "৭ kcal হলো প্রতি গ্রাম অ্যালকোহলের শক্তিমূল্য।",
        opt_bio_5_13_d: "১৭ kJ হলো ১ গ্রাম শর্করা বা প্রোটিনের কিলোজুল মান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 94
      },
      proTipShortcut: "শর্করা = ৪ kcal, আমিষ = ৪ kcal, চর্বি = ৯ kcal।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_14",
    topicId: "top_ssc_biology_ch5_2",
    type: "MCQ",
    stem: "প্রাপ্তবয়স্ক মানুষের দেহে খাদ্য থেকে গ্রহণীয় অত্যাবশ্যকীয় অ্যামাইনো এসিডের সংখ্যা কয়টি?",
    options: [
      { id: "opt_bio_5_14_a", text: "৬টি", isCorrect: false },
      { id: "opt_bio_5_14_b", text: "৮টি", isCorrect: true },
      { id: "opt_bio_5_14_c", text: "১০টি", isCorrect: false },
      { id: "opt_bio_5_14_d", text: "২০টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ৮টি।",
      coreConcept: "প্রকৃতিতে প্রাপ্ত ২০টি অ্যামাইনো এসিডের মধ্যে প্রাপ্তবয়স্কদের ৮টি এবং শিশুদের ১০টি অ্যামাইনো এসিড দেহ তৈরি করতে পারে না, খাদ্য থেকে নিতে হয়।",
      distractorAnalysis: {
        opt_bio_5_14_a: "৬টি হলো খাদ্যের প্রধান উপাদানের সংখ্যা।",
        opt_bio_5_14_c: "১০টি হলো শিশুদের ক্ষেত্রে অত্যাবশ্যকীয় অ্যামাইনো এসিডের সংখ্যা।",
        opt_bio_5_14_d: "২০টি হলো মোট প্রাকৃতিক প্রোটিন গঠনকারী অ্যামাইনো এসিডের সংখ্যা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 93
      },
      proTipShortcut: "অত্যাবশ্যকীয় অ্যামাইনো এসিড: প্রাপ্তবয়স্ক ৮টি, শিশু ১০টি।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_15",
    topicId: "top_ssc_biology_ch5_2",
    type: "MCQ",
    stem: "নিচের কোনটি পানিতে দ্রবণীয় ভিটামিন?",
    options: [
      { id: "opt_bio_5_15_a", text: "ভিটামিন A", isCorrect: false },
      { id: "opt_bio_5_15_b", text: "ভিটামিন D", isCorrect: false },
      { id: "opt_bio_5_15_c", text: "ভিটামিন C", isCorrect: true },
      { id: "opt_bio_5_15_d", text: "ভিটামিন K", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ভিটামিন C।",
      coreConcept: "ভিটামিন B-কমপ্লেক্স ও ভিটামিন C হলো পানিতে দ্রবণীয়; অপরদিকে ভিটামিন A, D, E, K হলো স্নেহ বা চর্বিতে দ্রবণীয়।",
      distractorAnalysis: {
        opt_bio_5_15_a: "ভিটামিন A চর্বিতে দ্রবণীয়।",
        opt_bio_5_15_b: "ভিটামিন D চর্বিতে দ্রবণীয়।",
        opt_bio_5_15_d: "ভিটামিন K চর্বিতে দ্রবণীয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 95
      },
      proTipShortcut: "পানিতে দ্রবণীয়: B ও C; চর্বিতে দ্রবণীয়: ADEK।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_16",
    topicId: "top_ssc_biology_ch5_2",
    type: "MCQ",
    stem: "উদ্ভিদজাত খাবারের অপাচ্য সেলুলোজ তন্তুকে পুষ্টিবিজ্ঞানের ভাষায় কী বলা হয়?",
    options: [
      { id: "opt_bio_5_16_a", text: "পেপটোন", isCorrect: false },
      { id: "opt_bio_5_16_b", text: "রাফেজ (Roughage)", isCorrect: true },
      { id: "opt_bio_5_16_c", text: "কাইম", isCorrect: false },
      { id: "opt_bio_5_16_d", text: "গ্লাইকোজেন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: রাফেজ (Roughage)।",
      coreConcept: "ফলমূল, শাকসবজি ও খাদ্যশস্যের অপাচ্য আঁশকে রাফেজ বলে যা পানি ধরে রেখে মলের পরিমাণ বাড়ায় ও কোষ্ঠকাঠিন্য প্রতিরোধ করে।",
      distractorAnalysis: {
        opt_bio_5_16_a: "পেপটোন হলো আংশিক পরিপাককৃত আমিষের রূপ।",
        opt_bio_5_16_c: "কাইম হলো পাকস্থলীর অর্ধপাচিত অম্লীয় খাদ্যমণ্ড।",
        opt_bio_5_16_d: "গ্লাইকোজেন হলো প্রাণীর যকৃতে সঞ্চিত পলিস্যাকারাইড।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 97
      },
      proTipShortcut: "সেলুলোজ আঁশ = রাফেজ = কোষ্ঠকাঠিন্য দূরকারী।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_17",
    topicId: "top_ssc_biology_ch5_2",
    type: "MCQ",
    stem: "আদর্শ খাদ্য পিরামিডের (Balanced Food Pyramid) সবচেয়ে নিচের প্রশস্ত ভিত্তি স্তরে কোন খাদ্য উপাদান থাকে?",
    options: [
      { id: "opt_bio_5_17_a", text: "তেল ও ঘি (স্নেহ)", isCorrect: false },
      { id: "opt_bio_5_17_b", text: "মাছ ও মাংস (আমিষ)", isCorrect: false },
      { id: "opt_bio_5_17_c", text: "ভাত, রুটি ও আলু (শর্করা)", isCorrect: true },
      { id: "opt_bio_5_17_d", text: "শাকসবজি ও ফলমূল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ভাত, রুটি ও আলু (শর্করা)।",
      coreConcept: "খাদ্য পিরামিডের সবচেয়ে নিচের ভিত্তি স্তরে থাকে শর্করা, যা দৈনিক আহারের সর্বাধিক অংশ (৫০–৬০%) পূরণ করা উচিত।",
      distractorAnalysis: {
        opt_bio_5_17_a: "তেল ও চর্বি থাকে পিরামিডের শীর্ষ স্তরে (সবচেয়ে কম পরিমাণ)।",
        opt_bio_5_17_b: "মাছ ও মাংস থাকে তৃতীয় স্তরে (পরিমিত পরিমাণ)।",
        opt_bio_5_17_d: "শাকসবজি ও ফলমূল থাকে দ্বিতীয় স্তরে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 98
      },
      proTipShortcut: "পিরামিডের তলা = শর্করা; চুড়া = তেল-চর্বি।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_18",
    topicId: "top_ssc_biology_ch5_2",
    type: "MCQ",
    stem: "নিচের কোন খাদ্যে প্রথম শ্রেণির প্রোটিন (উচ্চ জৈবমূল্যসম্পন্ন) বিদ্যমান?",
    options: [
      { id: "opt_bio_5_18_a", text: "মসুর ডাল", isCorrect: false },
      { id: "opt_bio_5_18_b", text: "ডিম ও দুধ", isCorrect: true },
      { id: "opt_bio_5_18_c", text: "চিনাবাদাম", isCorrect: false },
      { id: "opt_bio_5_18_d", text: "গম ও ভুট্টা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ডিম ও দুধ।",
      coreConcept: "ডিম ও দুধে সবকটি অপরিহার্য অ্যামাইনো এসিড সঠিক অনুপাতে বিদ্যমান থাকায় এগুলোকে প্রথম শ্রেণির প্রোটিন বলা হয়।",
      distractorAnalysis: {
        opt_bio_5_18_a: "ডালে মেথিওনিনের ঘাটতি থাকায় এটি দ্বিতীয় শ্রেণির প্রোটিন।",
        opt_bio_5_18_c: "বাদাম উদ্ভিজ্জ হওয়ায় দ্বিতীয় শ্রেণির প্রোটিন।",
        opt_bio_5_18_d: "গমে লাইসিন কম থাকায় দ্বিতীয় শ্রেণির প্রোটিন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 93
      },
      proTipShortcut: "প্রাণিজ প্রোটিন (ডিম, দুধ, মাছ, মাংস) = প্রথম শ্রেণির প্রোটিন।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_19",
    topicId: "top_ssc_biology_ch5_2",
    type: "MCQ",
    stem: "দুধের শর্করাকে কী বলা হয়?",
    options: [
      { id: "opt_bio_5_19_a", text: "সুক্রোজ", isCorrect: false },
      { id: "opt_bio_5_19_b", text: "ল্যাকটোজ", isCorrect: true },
      { id: "opt_bio_5_19_c", text: "ফ্রুক্টোজ", isCorrect: false },
      { id: "opt_bio_5_19_d", text: "মল্টোজ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ল্যাকটোজ।",
      coreConcept: "ল্যাকটোজ হলো দুধের ডাইস্যাকারাইড যা গ্লুকোজ ও গ্যালাকটোজের সমন্বয়ে গঠিত।",
      distractorAnalysis: {
        opt_bio_5_19_a: "সুক্রোজ হলো আখের চিনি (গ্লুকোজ + ফ্রুক্টোজ)।",
        opt_bio_5_19_c: "ফ্রুক্টোজ হলো ফলের মিষ্টি চিনি (মনোস্যাকারাইড)।",
        opt_bio_5_19_d: "মল্টোজ হলো অঙ্কুরিত বীজের চিনি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 92
      },
      proTipShortcut: "ল্যাকটিক / ল্যাকটোজ = দুধ সম্পর্কিত।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_20",
    topicId: "top_ssc_biology_ch5_2",
    type: "MCQ",
    stem: "উদ্ভিদ কোষে অতিরিক্ত গ্লুকোজ কোন পলিস্যাকারাইড রূপে সঞ্চিত থাকে?",
    options: [
      { id: "opt_bio_5_20_a", text: "গ্লাইকোজেন", isCorrect: false },
      { id: "opt_bio_5_20_b", text: "শ্বেতসার বা স্টার্চ", isCorrect: true },
      { id: "opt_bio_5_20_c", text: "কাইটিন", isCorrect: false },
      { id: "opt_bio_5_20_d", text: "পেপটিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: শ্বেতসার বা স্টার্চ।",
      coreConcept: "উদ্ভিদের প্রধান সঞ্চিত খাদ্য হলো শ্বেতসার বা স্টার্চ; অপরদিকে প্রাণিদেহে সঞ্চিত খাদ্য হলো গ্লাইকোজেন।",
      distractorAnalysis: {
        opt_bio_5_20_a: "গ্লাইকোজেন প্রাণী ও ছত্রাকের সঞ্চিত খাদ্য।",
        opt_bio_5_20_c: "কাইটিন ছত্রাকের প্রাচীর ও আর্থ্রোপোডার বহিঃকঙ্কালে থাকে।",
        opt_bio_5_20_d: "পেপটিন ফলের জেলিতে ব্যবহৃত উপাদান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 92
      },
      proTipShortcut: "উদ্ভিদে সঞ্চিত = স্টার্চ; প্রাণীতে সঞ্চিত = গ্লাইকোজেন।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_21",
    topicId: "top_ssc_biology_ch5_2",
    type: "MCQ",
    stem: "কোষ্ঠকাঠিন্য (Constipation) দূরীকরণ এবং কোলন ক্যানসারের ঝুঁকি কমাতে কোনটি সবচেয়ে বেশি কার্যকরী?",
    options: [
      { id: "opt_bio_5_21_a", text: "অতিরিক্ত প্রাণিজ প্রোটিন", isCorrect: false },
      { id: "opt_bio_5_21_b", text: "খাদ্য আঁশ বা রাফেজযুক্ত শাকসবজি", isCorrect: true },
      { id: "opt_bio_5_21_c", text: "সম্পৃক্ত চর্বি ও মাখন", isCorrect: false },
      { id: "opt_bio_5_21_d", text: "পরিশোধিত চিনি ও মিষ্টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: খাদ্য আঁশ বা রাফেজযুক্ত শাকসবজি।",
      coreConcept: "রাফেজ মলের আয়তন বাড়িয়ে অন্ত্রের পেরিস্টালসিস উদ্দীপিত করে এবং অন্ত্র থেকে ক্ষতিকর বিষাক্ত পদার্থ নিষ্কাশনে সহায়তা করে।",
      distractorAnalysis: {
        opt_bio_5_21_a: "অতিরিক্ত লাল মাংস কোলন ক্যানসারের ঝুঁকি বাড়ায়।",
        opt_bio_5_21_c: "সম্পৃক্ত চর্বি কোষ্ঠকাঠিন্য বাড়াতে পারে।",
        opt_bio_5_21_d: "পরিশোধিত চিনিতে কোনো খাদ্য আঁশ থাকে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 97
      },
      proTipShortcut: "রাফেজ = অপাচ্য সেলুলোজ = সহজ মলত্যাগ ও স্বাস্থ্যবান কোলন।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_22",
    topicId: "top_ssc_biology_ch5_2",
    type: "MCQ",
    stem: "কোন ভিটামিনের অভাবে মানবদেহে রক্ত তঞ্চন (Blood clotting) ব্যাহত হয় এবং অতিরিক্ত রক্তক্ষরণ ঘটে?",
    options: [
      { id: "opt_bio_5_22_a", text: "ভিটামিন A", isCorrect: false },
      { id: "opt_bio_5_22_b", text: "ভিটামিন E", isCorrect: false },
      { id: "opt_bio_5_22_c", text: "ভিটামিন K", isCorrect: true },
      { id: "opt_bio_5_22_d", text: "ভিটামিন D", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ভিটামিন K।",
      coreConcept: "যকৃতে রক্ত জমাট বাঁধার প্রয়োজনীয় প্রোটিন (প্রোথ্রম্বিন) তৈরিতে ভিটামিন K অপরিহার্য কো-ফ্যাক্টর হিসেবে কাজ করে।",
      distractorAnalysis: {
        opt_bio_5_22_a: "ভিটামিন A দৃষ্টিশক্তি ও এপিথেলিয়াল কলা রক্ষা করে।",
        opt_bio_5_22_b: "ভিটামিন E অ্যান্টিঅক্সিডেন্ট ও প্রজনন স্বাস্থ্য রক্ষা করে।",
        opt_bio_5_22_d: "ভিটামিন D ক্যালসিয়াম শোষণ ও হাড়ের বিকাশ ঘটায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 96
      },
      proTipShortcut: "K ফর Koagulation (রক্ত জমাট বাঁধা)।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_23",
    topicId: "top_ssc_biology_ch5_2",
    type: "MCQ",
    stem: "একজন পূর্ণবয়স্ক ব্যক্তির জন্য খাদ্যের মোট ক্যালরির শতকরা কত ভাগ শর্করা থেকে আসা উচিত?",
    options: [
      { id: "opt_bio_5_23_a", text: "১০ – ১৫%", isCorrect: false },
      { id: "opt_bio_5_23_b", text: "২০ – ২৫%", isCorrect: false },
      { id: "opt_bio_5_23_c", text: "৫০ – ৬০%", isCorrect: true },
      { id: "opt_bio_5_23_d", text: "৮০ – ৯০%", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৫০ – ৬০%।",
      coreConcept: "দৈনিক সুষম খাদ্যে ৫০–৬০% শক্তি শর্করা থেকে, ২০–২৫% চর্বি থেকে এবং ১৫–২০% আমিষ থেকে গ্রহণ করা আদর্শ।",
      distractorAnalysis: {
        opt_bio_5_23_a: "১০–১৫% হলো আমিষের প্রস্তাবিত শতকরা হার।",
        opt_bio_5_23_b: "২০–২৫% হলো স্নেহের প্রস্তাবিত শতকরা হার।",
        opt_bio_5_23_d: "৮০–৯০% অতিরিক্ত শর্করা যা স্থূলতার ঝুঁকি তৈরি করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 98
      },
      proTipShortcut: "সুষম খাদ্যের সিংহভাগ (৫০-৬০%) শক্তি আসে শর্করা থেকে।"
    },
    difficulty: "HARD",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_24",
    topicId: "top_ssc_biology_ch5_2",
    type: "MCQ",
    stem: "চাল ও ডাল একসাথে রান্না করে খেলে (যেমন খিচুড়ি) কী সুবিধা পাওয়া যায়?",
    options: [
      { id: "opt_bio_5_24_a", text: "শর্করার পরিমাণ শূন্য হয়ে যায়", isCorrect: false },
      { id: "opt_bio_5_24_b", text: "প্রথম শ্রেণির প্রোটিনের সমমানের সবকটি অত্যাবশ্যকীয় অ্যামাইনো এসিড পাওয়া যায়", isCorrect: true },
      { id: "opt_bio_5_24_c", text: "স্নেহের ক্যালরি মান চারগুণ বৃদ্ধি পায়", isCorrect: false },
      { id: "opt_bio_5_24_d", text: "ভিটামিন সি এর পরিমাণ সর্বাধিক হয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: প্রথম শ্রেণির প্রোটিনের সমমানের সবকটি অত্যাবশ্যকীয় অ্যামাইনো এসিড পাওয়া যায়।",
      coreConcept: "চালে লাইসিন কম কিন্তু মেথিওনিন বেশি, আর ডালে মেথিওনিন কম কিন্তু লাইসিন বেশি; দুটি একসাথে খেলে পরস্পরের পরিপূরক হয়ে সম্পূর্ণ প্রোটিন তৈরি করে।",
      distractorAnalysis: {
        opt_bio_5_24_a: "চাল প্রধান শর্করা উৎস, তাই শর্করা শূন্য হওয়ার সুযোগ নেই।",
        opt_bio_5_24_c: "স্নেহের প্রতি গ্রাম ৯ ক্যালরি স্থির থাকে।",
        opt_bio_5_24_d: "উত্তাপে রান্নার কারণে ভিটামিন সি প্রায় নষ্ট হয়ে যায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 94
      },
      proTipShortcut: "চাল + ডাল = সম্পূর্ণ পরিপূরক প্রোটিন।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // TOPIC 5.2 CREATIVE QUESTIONS (CQs 04-06)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_5_cq_04",
    topicId: "top_ssc_biology_ch5_2",
    type: "CQ_CREATIVE",
    stem: "দশম শ্রেণির শিক্ষার্থী রিয়াদ প্রতিদিন টিফিনে বার্গার, ফ্রেঞ্চ ফ্রাই ও কোমল পানীয় খেতে পছন্দ করে। সে ভাত, শাকসবজি ও ফলমূল একেবারেই খেতে চায় না। কয়েক মাস পর সে ক্রমাগত কোষ্ঠকাঠিন্য, পেটে ভারী অনুভূতি ও দ্রুত ক্লান্ত হয়ে পড়ার সমস্যায় আক্রান্ত হলো। পুষ্টিবিদ তাকে খাদ্যের উপাদান পরিবর্তন করতে বললেন এবং তাকে একটি চার স্তরবিশিষ্ট খাদ্য পিরামিড দেখিয়ে সঠিক খাদ্যাভ্যাস গড়ে তোলার পরামর্শ দিলেন।",
    options: null,
    explanation: {
      directAnswer: "রিয়াদ অতিরিক্ত ফাস্টফুড (চর্বি ও প্রক্রিয়াজাত শর্করা) খাওয়ায় এবং খাদ্য আঁশ (রাফেজ) বর্জন করায় কোষ্ঠকাঠিন্যে ভুগছে।",
      coreConcept: "সুষম খাদ্যের প্রয়োজনীয়তা এবং খাদ্য আঁশের অভাবজনিত সমস্যা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 97
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "রাফেজ (Roughage) বলতে কী বোঝায় তা লেখা।" },
      kha: { mark: 2, criteria: "চর্বিকে সর্বাধিক শক্তি উৎপাদনকারী উপাদান বলা হয় কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে উল্লিখিত খাদ্য পিরামিডের স্তরভিত্তিক গঠন ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "রিয়াদের বর্তমান শারীরিক সমস্যা সমাধানে পুষ্টিবিদের পরামর্শের গুরুত্ব বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_cq_05",
    topicId: "top_ssc_biology_ch5_2",
    type: "CQ_CREATIVE",
    stem: "ডাক্তার সাহেব এক সেমিনারে বললেন, “আমাদের দৈনন্দিন খাবারে প্রধান ৩টি শক্তি উৎপাদক জৈব উপাদান রয়েছে। প্রথম উপাদানটি আমাদের প্রধান দৈনন্দিন জ্বালানি, দ্বিতীয় উপাদানটি দৈহিক বৃদ্ধি ও ক্ষয়পূরণ ঘটায় এবং তৃতীয় উপাদানটি ত্বকের নিচে স্তর গঠন করে তাপ ধরে রাখে। তবে দ্বিতীয় উপাদানটিতে এমন কিছু অ্যামাইনো এসিড থাকে যা আমাদের দেহ নিজে তৈরি করতে পারে না।”",
    options: null,
    explanation: {
      directAnswer: "উপাদান তিনটি যথাক্রমে শর্করা (কার্বোহাইড্রেট), আমিষ (প্রোটিন) এবং স্নেহ (লিপিড)।",
      coreConcept: "খাদ্যের প্রধান তিনটি জৈব উপাদানের শক্তিমূল্য ও অপরিহার্য অ্যামাইনো এসিডের তাৎপর্য।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 91
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "১ গ্রাম আমিষ থেকে কত শক্তি পাওয়া যায় তা উল্লেখ করা।" },
      kha: { mark: 2, criteria: "অপরিহার্য অ্যামাইনো এসিড বলতে কী বোঝায় তা বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের দ্বিতীয় উপাদানটির উৎস ও শ্রেণিবিন্যাস আলোচনা করা।" },
      gha: { mark: 4, criteria: "দেহের শারীরবৃত্তীয় সুরক্ষায় প্রথম ও তৃতীয় উপাদানের ভারসাম্যপূর্ণ উপস্থিতির ভূমিকা মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_cq_06",
    topicId: "top_ssc_biology_ch5_2",
    type: "CQ_CREATIVE",
    stem: "একটি পুষ্টি জরিপে দেখা গেল গ্রামের অধিকাংশ দরিদ্র পরিবারে কেবল ভাত এবং সামান্য ভর্তা দিয়ে আহার সম্পন্ন করা হয়; দুধ বা ডিম খুব কম খাওয়া হয়। তবে বয়স্ক ব্যক্তিরা চালের সাথে ডাল মিশিয়ে খিচুড়ি খাওয়ার অভ্যাস রেখেছেন। জরিপকারী কর্মকর্তা মন্তব্য করলেন, “শুধুমাত্র ভাত খেলে শরীরে প্রোটিনের পুষ্টিমূল্য মারাত্মকভাবে অপূর্ণ থাকে, কিন্তু খিচুড়ির মতো মিশ্র খাদ্যে সেই পুষ্টিঘাটতি অনেকটাই দূর হয়।”",
    options: null,
    explanation: {
      directAnswer: "ভাত দ্বিতীয় শ্রেণির প্রোটিন হলেও চাল ও ডালের অ্যামাইনো এসিডের পরিপূরকতার কারণে খিচুড়িতে প্রথম শ্রেণির প্রোটিনের গুণ পাওয়া যায়।",
      coreConcept: "পরিপূরক প্রোটিন এবং অত্যাবশ্যকীয় অ্যামাইনো এসিডের সঠিক সমন্বয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.২",
        pageNumber: 93
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "দুধের শর্করার নাম কী তা লেখা।" },
      kha: { mark: 2, criteria: "প্রথম শ্রেণি ও দ্বিতীয় শ্রেণির প্রোটিনের মধ্যে পার্থক্য কী তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের আলোকে শুধুমাত্র ভাত খাওয়ার ফলে শরীরে কী পুষ্টিগত ঘাটতি তৈরি হয় তা বর্ণনা করা।" },
      gha: { mark: 4, criteria: "“চাল ও ডালের সমন্বয় দরিদ্র জনগোষ্ঠীর প্রোটিন চাহিদা পূরণে এক অনন্য উদ্ভাবন”—উক্তিটি বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  }
];
