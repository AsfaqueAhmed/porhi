import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter9QuestionsBatch2: QuestionData[] = [
  // ==========================================
  // TOPIC 1: মানবকঙ্কালের পরিচিতি ও ভূমিকা (top_ssc_biology_ch9_1)
  // ==========================================
  {
    id: "q_bio_9_31",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "মানবদেহের দীর্ঘতম এবং সবচেয়ে ভারী অস্থির নাম কী?",
    options: [
      { id: "opt_bio_9_31_a", text: "হিউমেরাস", isCorrect: false },
      { id: "opt_bio_9_31_b", text: "টিবিয়া", isCorrect: false },
      { id: "opt_bio_9_31_c", text: "ফিমার (Femur)", isCorrect: true },
      { id: "opt_bio_9_31_d", text: "স্টার্নাম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ফিমার (Femur)।",
      coreConcept: "উরু বা থাই অঞ্চলে অবস্থিত ফিমার হলো মানবদেহের দীর্ঘতম, বৃহত্তম ও সবচেয়ে শক্তিশালী অস্থি।",
      distractorAnalysis: {
        opt_bio_9_31_a: "হিউমেরাস ঊর্ধ্বাঙ্গের সবচেয়ে দীর্ঘ অস্থি, তবে ফিমারের চেয়ে ছোট।",
        opt_bio_9_31_b: "টিবিয়া পায়ের প্রধান ভারবাহী অস্থি, তবে ফিমারের নিচে থাকে।",
        opt_bio_9_31_d: "স্টার্নাম বুকের মাঝের চ্যাপ্টা অস্থি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · চিত্র ৯.০১",
        pageNumber: 192
      },
      proTipShortcut: "দেহের দীর্ঘতম হাড় = ঊরুর ফিমার (Femur)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_32",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "মানবদেহের বক্ষপিঞ্জরে স্টার্নামের সাথে যুক্ত পরশুকার (Ribs) মোট সংখ্যা কত?",
    options: [
      { id: "opt_bio_9_32_a", text: "১২টি", isCorrect: false },
      { id: "opt_bio_9_32_b", text: "২৪টি", isCorrect: true },
      { id: "opt_bio_9_32_c", text: "৩৩টি", isCorrect: false },
      { id: "opt_bio_9_32_d", text: "১৪টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ২৪টি।",
      coreConcept: "বক্ষপিঞ্জরে ১২ জোড়া অর্থাৎ মোট ২৪টি পরশুকা বক্ষগহ্বর ঘিরে খাঁচা তৈরি করে।",
      distractorAnalysis: {
        opt_bio_9_32_a: "১২ জোড়া পরশুকা থাকে, মোট সংখ্যা ২৪টি।",
        opt_bio_9_32_c: "৩৩টি হলো মেরুদণ্ডের কশেরুকার সংখ্যা।",
        opt_bio_9_32_d: "১৪টি হলো মুখমণ্ডলীয় অস্থির সংখ্যা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · চিত্র ৯.০১",
        pageNumber: 192
      },
      proTipShortcut: "পরশুকা ১২ জোড়া = ২৪টি।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_33",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "হাঁটুর অস্থিসন্ধিকে সম্মুখ আঘাত থেকে রক্ষা করে নিচের কোন ছোট সিসাময়েড অস্থি?",
    options: [
      { id: "opt_bio_9_33_a", text: "প্যাটেলা (Patella)", isCorrect: true },
      { id: "opt_bio_9_33_b", text: "ফ্যালাঞ্জেস", isCorrect: false },
      { id: "opt_bio_9_33_c", text: "কার্পাল", isCorrect: false },
      { id: "opt_bio_9_33_d", text: "স্ক্যাপুলা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্যাটেলা (Patella)।",
      coreConcept: "হাঁটুর সামনের বাটির মতো গোলাকার অস্থিকে প্যাটেলা (নি-ক্যাপ) বলা হয়, যা হাঁটু সন্ধির সুরক্ষায় কাজ করে।",
      distractorAnalysis: {
        opt_bio_9_33_b: "ফ্যালাঞ্জেস হলো আঙুলের ছোট ছোট অস্থি।",
        opt_bio_9_33_c: "কার্পাল হলো হাতের কবজির ৮টি ছোট অস্থি।",
        opt_bio_9_33_d: "স্ক্যাপুলা হলো কাঁধের পেছনের চ্যাপ্টা ডানা সদৃশ অস্থি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · চিত্র ৯.০১",
        pageNumber: 192
      },
      proTipShortcut: "হাঁটুর বাটি অস্থি = প্যাটেলা।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_34",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "অগ্রবাহুতে (Forearm) পাশাপাশি অবস্থানকারী দুটি অস্থির নাম কী কী?",
    options: [
      { id: "opt_bio_9_34_a", text: "হিউমেরাস ও ফিমার", isCorrect: false },
      { id: "opt_bio_9_34_b", text: "রেডিয়াস ও আলনা", isCorrect: true },
      { id: "opt_bio_9_34_c", text: "টিবিয়া ও ফিবুলা", isCorrect: false },
      { id: "opt_bio_9_34_d", text: "টার্সাল ও মেটাটার্সাল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: রেডিয়াস ও আলনা।",
      coreConcept: "হাতের কনুই থেকে কবজি পর্যন্ত অগ্রবাহুর দুটি সমান্তরাল অস্থি হলো রেডিয়াস (বৃদ্ধাঙ্গুলির দিকে) ও আলনা (কনিষ্ঠাঙ্গুলির দিকে)।",
      distractorAnalysis: {
        opt_bio_9_34_a: "হিউমেরাস ও ফিমার যথাক্রমে বাহু ও ঊরুর একক দীর্ঘ অস্থি।",
        opt_bio_9_34_c: "টিবিয়া ও ফিবুলা পায়ের নিম্নাংশের দুটি অস্থি।",
        opt_bio_9_34_d: "টার্সাল ও মেটাটার্সাল পায়ের পাতার অস্থি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · চিত্র ৯.০১",
        pageNumber: 192
      },
      proTipShortcut: "হাতে রেডিয়াস-আলনা; পায়ে টিবিয়া-ফিবুলা।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_35",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "মানবদেহের শ্রোণিচক্র (Pelvic Girdle) কোন প্রধান অস্থিগুলোর সমন্বয়ে গঠিত?",
    options: [
      { id: "opt_bio_9_35_a", text: "স্ক্যাপুলা ও ক্ল্যাভিকল", isCorrect: false },
      { id: "opt_bio_9_35_b", text: "স্টার্নাম ও পরশুকা", isCorrect: false },
      { id: "opt_bio_9_35_c", text: "ইলিয়াম, ইসচিয়াম ও পিউবিস", isCorrect: true },
      { id: "opt_bio_9_35_d", text: "ম্যাক্সিলা ও ম্যান্ডিবল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ইলিয়াম, ইসচিয়াম ও পিউবিস।",
      coreConcept: "শ্রোণিচক্র প্রতিটি পাশে ইলিয়াম, ইসচিয়াম ও পিউবিস একীভূত হয়ে নিতম্বাস্থি তৈরি করে এবং পেছনের স্যাক্রাম ও কক্সিসের সাথে যুক্ত থাকে।",
      distractorAnalysis: {
        opt_bio_9_35_a: "স্ক্যাপুলা ও ক্ল্যাভিকল হলো বক্ষঅস্থিচক্রের (Pectoral Girdle) উপাদান।",
        opt_bio_9_35_b: "স্টার্নাম ও পরশুকা বক্ষপিঞ্জরের উপাদান।",
        opt_bio_9_35_d: "ম্যাক্সিলা ও ম্যান্ডিবল চোয়ালের অস্থি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · চিত্র ৯.০১",
        pageNumber: 192
      },
      proTipShortcut: "শ্রোণিচক্রের ত্রয়ী = ইলিয়াম + ইসচিয়াম + পিউবিস।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // TOPIC 2: অস্থি ও তরুণাস্থির গঠন (top_ssc_biology_ch9_2)
  // ==========================================
  {
    id: "q_bio_9_36",
    topicId: "top_ssc_biology_ch9_2",
    type: "MCQ",
    stem: "অস্থিতে শতকরা কত ভাগ পানি থাকে?",
    options: [
      { id: "opt_bio_9_36_a", text: "১০-২০ ভাগ", isCorrect: false },
      { id: "opt_bio_9_36_b", text: "৪০-৫০ ভাগ", isCorrect: true },
      { id: "opt_bio_9_36_c", text: "৭০-৮০ ভাগ", isCorrect: false },
      { id: "opt_bio_9_36_d", text: "৯০-৯৫ ভাগ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ৪০-৫০ ভাগ।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ১৯৪ অনুযায়ী অস্থিতে প্রায় ৪০-৫০ ভাগ পানি থাকে।",
      distractorAnalysis: {
        opt_bio_9_36_a: "১০-২০ ভাগ পানি থাকে দাঁতের এনামেলে।",
        opt_bio_9_36_c: "৭০-৮০ ভাগ পানি থাকে সাধারণ কোমল নরম টিস্যুতে।",
        opt_bio_9_36_d: "৯০-৯৫ ভাগ পানি থাকে রক্তরসে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      },
      proTipShortcut: "অস্থিতে পানি = ৪০ থেকে ৫০ শতাংশ।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_37",
    topicId: "top_ssc_biology_ch9_2",
    type: "MCQ",
    stem: "অস্থির অজৈব উপাদানের প্রধান খনিজ যৌগ কোনটি?",
    options: [
      { id: "opt_bio_9_37_a", text: "ক্যালসিয়াম ফসফেট", isCorrect: true },
      { id: "opt_bio_9_37_b", text: "সোডিয়াম ক্লোরাইড", isCorrect: false },
      { id: "opt_bio_9_37_c", text: "পটাশিয়াম সালফেট", isCorrect: false },
      { id: "opt_bio_9_37_d", text: "ম্যাগনেসিয়াম নাইট্রেট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ক্যালসিয়াম ফসফেট।",
      coreConcept: "অস্থির অজৈব অংশের ৮০% এরও বেশি হলো ক্যালসিয়াম ফসফেট এবং ক্যালসিয়াম কার্বনেট যৌগ, যা অস্থিকে পাথর সদৃশ কাঠিন্য দেয়।",
      distractorAnalysis: {
        opt_bio_9_37_b: "সোডিয়াম ক্লোরাইড প্রধানত দেহরসে দ্রবীভূত ইলেক্ট্রোলাইট হিসেবে থাকে।",
        opt_bio_9_37_c: "পটাশিয়াম সালফেট গৌণ উপাদান।",
        opt_bio_9_37_d: "ম্যাগনেসিয়াম নাইট্রেট জৈব টিস্যুতে এ রূপে থাকে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      },
      proTipShortcut: "হাড়ের মূল শক্ত উপাদান = ক্যালসিয়াম ফসফেট।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_38",
    topicId: "top_ssc_biology_ch9_2",
    type: "MCQ",
    stem: "শ্বাসনালি (Trachea) যাতে স্বাভাবিক শ্বাস-প্রশ্বাসে কখনো চুপসে না যায়, সেজন্য এর প্রাচীরে কোন ধরনের কলা বিদ্যমান?",
    options: [
      { id: "opt_bio_9_38_a", text: "কঠিন অস্থি", isCorrect: false },
      { id: "opt_bio_9_38_b", text: "স্থিতিস্থাপক তরুণাস্থি বলয়", isCorrect: true },
      { id: "opt_bio_9_38_c", text: "ঐচ্ছিক কঙ্কাল পেশি", isCorrect: false },
      { id: "opt_bio_9_38_d", text: "অ্যারেনকাইমা টিস্যু", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: স্থিতিস্থাপক তরুণাস্থি বলয়।",
      coreConcept: "শ্বাসনালির প্রাচীরে 'C' আকৃতির তরুণাস্থি বলয় বিদ্যমান, যা নালিটিকে খোলা রেখে অবিরত বায়ু চলাচলে সহায়তা করে।",
      distractorAnalysis: {
        opt_bio_9_38_a: "কঠিন অস্থি থাকলে শ্বাসনালি অনমনীয় হয়ে যেত এবং ঘাড় ঘোরানো অসম্ভব হতো।",
        opt_bio_9_38_c: "ঐচ্ছিক পেশি শ্বাসনালির উন্মুক্ততা নিশ্চিত করতে পারে না।",
        opt_bio_9_38_d: "অ্যারেনকাইমা হলো জলজ উদ্ভিদের বায়ুকুঠুরিপূর্ণ টিস্যু।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      },
      proTipShortcut: "শ্বাসনালির খোলা পাইপ = তরুণাস্থি (Cartilage) এর কাজ।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_39",
    topicId: "top_ssc_biology_ch9_2",
    type: "MCQ",
    stem: "কানের পিনা (Pinna) ও নাকের অগ্রভাগে তরুণাস্থি থাকার প্রধান সুবিধা কোনটি?",
    options: [
      { id: "opt_bio_9_39_a", text: "লোহিত রক্তকণিকা তৈরি করা", isCorrect: false },
      { id: "opt_bio_9_39_b", text: "অঙ্গকে নমনীয় রাখা ও আঘাত পেলে না ভেঙে পূর্বাবস্থায় ফেরা", isCorrect: true },
      { id: "opt_bio_9_39_c", text: "ক্যালসিয়াম নিঃসরণ করে রক্ত জমাট বাঁধা", isCorrect: false },
      { id: "opt_bio_9_39_d", text: "দেহের সম্পূর্ণ ভার একাই বহন করা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অঙ্গকে নমনীয় রাখা ও আঘাত পেলে না ভেঙে পূর্বাবস্থায় ফেরা।",
      coreConcept: "তরুণাস্থি স্থিতিস্থাপক হওয়ায় কানের পিনা বা নাক দুমড়ে-মুচড়ে গেলেও ভেঙে যায় না এবং সহজে পূর্বাবস্থায় ফিরে আসে।",
      distractorAnalysis: {
        opt_bio_9_39_a: "লোহিত রক্তকণিকা অস্থিমজ্জায় তৈরি হয়, পিনায় নয়।",
        opt_bio_9_39_c: "তরুণাস্থি ক্যালসিয়াম নিঃসরণ করে না।",
        opt_bio_9_39_d: "পিনা বা নাক দেহের ভার বহন করে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      },
      proTipShortcut: "তরুণাস্থি = নমনীয় স্থিতিস্থাপক কুশন।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // TOPIC 3: অস্থিসন্ধি ও সাইনোভিয়াল সন্ধি (top_ssc_biology_ch9_3)
  // ==========================================
  {
    id: "q_bio_9_40",
    topicId: "top_ssc_biology_ch9_3",
    type: "MCQ",
    stem: "দুইয়ের অধিক অস্থির সংযোগে গঠিত সাইনোভিয়াল অস্থিসন্ধিকে কী বলা হয়?",
    options: [
      { id: "opt_bio_9_40_a", text: "সরল সাইনোভিয়াল অস্থিসন্ধি", isCorrect: false },
      { id: "opt_bio_9_40_b", text: "জটিল সাইনোভিয়াল অস্থিসন্ধি", isCorrect: true },
      { id: "opt_bio_9_40_c", text: "নিশ্চল অস্থিসন্ধি", isCorrect: false },
      { id: "opt_bio_9_40_d", text: "সিউচার সন্ধি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: জটিল সাইনোভিয়াল অস্থিসন্ধি।",
      coreConcept: "একটি অস্থিসন্ধিতে দুটি মাত্র অস্থির সংযোগ হলে সরল এবং যখন দুইয়ের অধিক অস্থি মিলিত হয় তখন জটিল সাইনোভিয়াল অস্থিসন্ধি বলে (যেমন হাঁটু সন্ধি)।",
      distractorAnalysis: {
        opt_bio_9_40_a: "সরল সাইনোভিয়াল সন্ধি কেবল দুটি অস্থির সংযোগে গঠিত হয়।",
        opt_bio_9_40_c: "নিশ্চল সন্ধি সাইনোভিয়াল নয়, এটি অনড়।",
        opt_bio_9_40_d: "সিউচার সন্ধি করোটির খাঁজকাটা নিশ্চল সন্ধি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 195
      },
      proTipShortcut: "২ অস্থি = সরল; >২ অস্থি = জটিল সাইনোভিয়াল।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_41",
    topicId: "top_ssc_biology_ch9_3",
    type: "MCQ",
    stem: "মেরুদণ্ডের কশেরুকাগুলোর মধ্যকার অস্থিসন্ধি কোন প্রকারের?",
    options: [
      { id: "opt_bio_9_41_a", text: "নিশ্চল অস্থিসন্ধি", isCorrect: false },
      { id: "opt_bio_9_41_b", text: "ঈষৎ সচল অস্থিসন্ধি (Slightly Movable)", isCorrect: true },
      { id: "opt_bio_9_41_c", text: "বল ও কোটরসন্ধি", isCorrect: false },
      { id: "opt_bio_9_41_d", text: "কবজা সন্ধি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ঈষৎ সচল অস্থিসন্ধি (Slightly Movable)।",
      coreConcept: "মেরুদণ্ডের কশেরুকাগুলোর সন্ধি সামান্য নাড়াচাড়া করতে পারে বিধায় আমরা দেহকে সামনে, পেছনে ও পাশে বাঁকাতে পারি। এটি ঈষৎ সচল সন্ধি।",
      distractorAnalysis: {
        opt_bio_9_41_a: "নিশ্চল সন্ধি একেবারেই নাড়ানো যায় না।",
        opt_bio_9_41_c: "বল ও কোটরসন্ধি কাঁধ ও উরুর সম্পূর্ণ সচল সন্ধি।",
        opt_bio_9_41_d: "কবজা সন্ধি কনুই ও হাঁটুর সন্ধি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 195
      },
      proTipShortcut: "মেরুদণ্ড ঈষৎ নড়ে = ঈষৎ সচল সন্ধি।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_42",
    topicId: "top_ssc_biology_ch9_3",
    type: "MCQ",
    stem: "বল ও কোটরসন্ধির একটি প্রধান বৈশিষ্ট্য কোনটি?",
    options: [
      { id: "opt_bio_9_42_a", text: "কেবল একটি নির্দিষ্ট সমতলে নড়াচড়া করা", isCorrect: false },
      { id: "opt_bio_9_42_b", text: "অস্থি অনড় থাকা ও কোনো চলন না হওয়া", isCorrect: false },
      { id: "opt_bio_9_42_c", text: "অস্থিকে সকল দিকে বাঁকানো, পাশে চালনা বা ঘোরানো সম্ভবপর হওয়া", isCorrect: true },
      { id: "opt_bio_9_42_d", text: "তরুণাস্থি ও সাইনোভিয়াল রস অনুপস্থিত থাকা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: অস্থিকে সকল দিকে বাঁকানো, পাশে চালনা বা ঘোরানো সম্ভবপর হওয়া।",
      coreConcept: "বল ও কোটরসন্ধিতে গোল মাথা কোটরে বসানো থাকায় এটি সকল দিকে প্রায় ৩৬০ ডিগ্রি পরিসরে নড়াচড়া করতে পারে।",
      distractorAnalysis: {
        opt_bio_9_42_a: "এক সমতলে নড়াচড়া কবজা সন্ধির বৈশিষ্ট্য।",
        opt_bio_9_42_b: "অনড় থাকা নিশ্চল সন্ধির বৈশিষ্ট্য।",
        opt_bio_9_42_d: "বল ও কোটরসন্ধি আদর্শ সাইনোভিয়াল সন্ধি, এতে রস ও তরুণাস্থি বিদ্যমান থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 195
      },
      proTipShortcut: "বল ও কোটর = বহুমুখী ৩ডি সঞ্চালন।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // TOPIC 4: পেশিতন্ত্র ও চলন (top_ssc_biology_ch9_4)
  // ==========================================
  {
    id: "q_bio_9_43",
    topicId: "top_ssc_biology_ch9_4",
    type: "MCQ",
    stem: "হাতের কনুই সোজা (Extension) করার সময় কোন ঘটনাটি ঘটে?",
    options: [
      { id: "opt_bio_9_43_a", text: "বাইসেপস সংকুচিত হয় এবং ট্রাইসেপস শিথিল হয়", isCorrect: false },
      { id: "opt_bio_9_43_b", text: "ট্রাইসেপস সংকুচিত হয় এবং বাইসেপস শিথিল হয়", isCorrect: true },
      { id: "opt_bio_9_43_c", text: "উভয় পেশি একসাথে সংকুচিত হয়ে যায়", isCorrect: false },
      { id: "opt_bio_9_43_d", text: "রেডিয়াস ও আলনা হিউমেরাসের দিকে উঠে আসে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ট্রাইসেপস সংকুচিত হয় এবং বাইসেপস শিথিল হয়।",
      coreConcept: "কনুই সোজা করতে ট্রাইসেপস পেশি সংকুচিত হয়ে আলনাকে টেনে সোজা করে হিউমেরাসের সাথে এক সরলরেখায় নিয়ে আসে, এ সময় বাইসেপস শিথিল থাকে।",
      distractorAnalysis: {
        opt_bio_9_43_a: "এটি কনুই বাঁকা (Flexion) করার সময় ঘটে।",
        opt_bio_9_43_c: "উভয় পেশি একসাথে সংকুচিত হয় না।",
        opt_bio_9_43_d: "রেডিয়াস-আলনা হিউমেরাসের কাছে আসে হাত বাঁকার সময়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.১",
        pageNumber: 197
      },
      proTipShortcut: "সোজা হাত = ট্রাইসেপস সক্রিয় ও সংকুচিত।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_44",
    topicId: "top_ssc_biology_ch9_4",
    type: "MCQ",
    stem: "টেনডন ছিঁড়ে যাওয়ার সম্ভাবনা কম থাকার বৈজ্ঞানিক কারণ কী?",
    options: [
      { id: "opt_bio_9_44_a", text: "এটি অত্যন্ত নরম ও পানিযুক্ত", isCorrect: false },
      { id: "opt_bio_9_44_b", text: "এটি শ্বেত কোলাজেন তন্তুর অত্যন্ত সুদৃঢ় সমান্তরাল আঁটি দিয়ে গঠিত", isCorrect: true },
      { id: "opt_bio_9_44_c", text: "এটি পীতবর্ণের ইলাস্টিক তন্তু দিয়ে গঠিত", isCorrect: false },
      { id: "opt_bio_9_44_d", text: "এতে কোনো প্রোটিন তন্তু থাকে না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: এটি শ্বেত কোলাজেন তন্তুর অত্যন্ত সুদৃঢ় সমান্তরাল আঁটি দিয়ে গঠিত।",
      coreConcept: "টেনডনের ম্যাট্রিক্সে শাখা-প্রশাখাবিহীন শ্বেততন্তু গুচ্ছাকারে সমান্তরালে বিন্যস্ত থাকে এবং চাপটানের (tensile strength) বিরুদ্ধে প্রচণ্ড যান্ত্রিক প্রতিরোধ গড়ে তোলে।",
      distractorAnalysis: {
        opt_bio_9_44_a: "টেনডন অত্যন্ত শক্ত ও ঘন, নরম নয়।",
        opt_bio_9_44_c: "পীত ইলাস্টিক তন্তু লিগামেন্টে থাকে।",
        opt_bio_9_44_d: "কোলাজেন নামক শক্তিশালী প্রোটিন তন্তু দিয়ে টেনডন গঠিত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.২",
        pageNumber: 198
      },
      proTipShortcut: "টেনডনের শক্তি = সমান্তরাল শ্বেত কোলাজেন আঁটি।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_45",
    topicId: "top_ssc_biology_ch9_4",
    type: "MCQ",
    stem: "লিগামেন্ট বা অস্থিবন্ধনী মূলত কোন প্রোটিন তন্তু সমৃদ্ধ হওয়ায় অত্যন্ত স্থিতিস্থাপক?",
    options: [
      { id: "opt_bio_9_45_a", text: "ওসিন", isCorrect: false },
      { id: "opt_bio_9_45_b", text: "ইলাস্টিন (Elastin)", isCorrect: true },
      { id: "opt_bio_9_45_c", text: "কেরাটিন", isCorrect: false },
      { id: "opt_bio_9_45_d", text: "হিমোগ্লোবিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ইলাস্টিন (Elastin)।",
      coreConcept: "লিগামেন্টে পীতবর্ণের স্থিতিস্থাপক তন্তুর সংখ্যা বেশি থাকে এবং এই ইলাস্টিক তন্তুগুলো ইলাস্টিন নামক প্রোটিন দিয়ে গঠিত।",
      distractorAnalysis: {
        opt_bio_9_45_a: "ওসিন অস্থির ম্যাট্রিক্সের প্রোটিন।",
        opt_bio_9_45_c: "কেরাটিন নখ ও চুলের প্রোটিন।",
        opt_bio_9_45_d: "হিমোগ্লোবিন লোহিত রক্তকণিকার প্রোটিন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.২",
        pageNumber: 198
      },
      proTipShortcut: "লিগামেন্টের স্থিতিস্থাপকতা = ইলাস্টিন প্রোটিন।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_46",
    topicId: "top_ssc_biology_ch9_4",
    type: "MCQ",
    stem: "জরুরি পরিস্থিতিতে দ্রুত শক্তি জোগাতে মানবদেহের কঙ্কালপেশিতে কোন পদার্থ সঞ্চিত থাকে?",
    options: [
      { id: "opt_bio_9_46_a", text: "গ্লাইকোজেন", isCorrect: true },
      { id: "opt_bio_9_46_b", text: "সেলুলোজ", isCorrect: false },
      { id: "opt_bio_9_46_c", text: "স্টার্চ বা শ্বেতসার", isCorrect: false },
      { id: "opt_bio_9_46_d", text: "ইউরিক এসিড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: গ্লাইকোজেন।",
      coreConcept: "পেশিতে গ্লাইকোজেন সঞ্চিত থাকে যা ভবিষ্যতে জরুরি প্রয়োজনে দ্রুত গ্লুকোজে রূপান্তরিত হয়ে শক্তির উৎস হিসেবে কাজ করে।",
      distractorAnalysis: {
        opt_bio_9_46_b: "সেলুলোজ উদ্ভিদের কোষপ্রাচীরের উপাদান।",
        opt_bio_9_46_c: "স্টার্চ উদ্ভিদের প্রধান সঞ্চিত খাদ্য।",
        opt_bio_9_46_d: "ইউরিক এসিড নাইট্রোজেনঘটিত রেচন বর্জ্য।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২",
        pageNumber: 196
      },
      proTipShortcut: "পেশির শক্তি ভাণ্ডার = গ্লাইকোজেন।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // TOPIC 5: রোগসমূহ (top_ssc_biology_ch9_5)
  // ==========================================
  {
    id: "q_bio_9_47",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "অস্টিওপোরোসিস রোগের ক্ষেত্রে নিচের কোন লক্ষণটি সাধারণত দেখা যায় না?",
    options: [
      { id: "opt_bio_9_47_a", text: "অস্থি ভঙ্গুর হয়ে যাওয়া", isCorrect: false },
      { id: "opt_bio_9_47_b", text: "পেশির শক্তি কমে যাওয়া", isCorrect: false },
      { id: "opt_bio_9_47_c", text: "অস্থির ঘনত্ব ও পুরুত্ব বেড়ে যাওয়া", isCorrect: true },
      { id: "opt_bio_9_47_d", text: "পিঠের পেছনের অংশে ব্যথা অনুভব হওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: অস্থির ঘনত্ব ও পুরুত্ব বেড়ে যাওয়া।",
      coreConcept: "অস্টিওপোরোসিসে অস্থির খনিজ কমে অস্থির ঘনত্ব ও পুরুত্ব হ্রাস পায় (বাড়ে না)।",
      distractorAnalysis: {
        opt_bio_9_47_a: "অস্থি ভঙ্গুর হওয়া অস্টিওপোরোসিসের মূল লক্ষণ।",
        opt_bio_9_47_b: "পেশির শক্তি হ্রাস পাওয়া এই রোগের লক্ষণ।",
        opt_bio_9_47_d: "পিঠের পেছনে ও হাড়ে ব্যথা অনুভব হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 199
      },
      proTipShortcut: "অস্টিওপোরোসিস = ঘনত্ব হ্রাস (কখনোই বৃদ্ধি নয়)।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_48",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "অস্টিওপোরোসিস প্রতিরোধে খাদ্যতালিকায় নিচের কোন ধরনের খাবার অগ্রাধিকার দেওয়া উচিত?",
    options: [
      { id: "opt_bio_9_48_a", text: "ননিতোলা দুধ, সয়াদ্রব্য ও সবুজ শাকসবজি", isCorrect: true },
      { id: "opt_bio_9_48_b", text: "চর্বিযুক্ত অতিরিক্ত ভাজা মাংস", isCorrect: false },
      { id: "opt_bio_9_48_c", text: "অতিরিক্ত কোমল পানীয় ও চা-কফি", isCorrect: false },
      { id: "opt_bio_9_48_d", text: "কেবল বিশুদ্ধ পরিশোধিত চিনি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ননিতোলা দুধ, সয়াদ্রব্য ও সবুজ শাকসবজি।",
      coreConcept: "ননিতোলা দুধ ও দুগ্ধজাত খাদ্য, কমলার রস, সবুজ শাকসবজি এবং সয়াদ্রব্য ক্যালসিয়াম সমৃদ্ধ হওয়ায় হাড়ের সুরক্ষায় সহায়ক।",
      distractorAnalysis: {
        opt_bio_9_48_b: "অতিরিক্ত চর্বিযুক্ত খাবার ক্যালসিয়াম শোষণে বাধা দিতে পারে।",
        opt_bio_9_48_c: "কোমল পানীয়ের ফসফরিক এসিড ও ক্যাফেইন হাড় থেকে ক্যালসিয়াম ক্ষয় বাড়ায়।",
        opt_bio_9_48_d: "চিনিতে কোনো প্রয়োজনীয় খনিজ লবণ থাকে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 199
      },
      proTipShortcut: "হাড়ের পুষ্টি = দুধ, শাকসবজি ও ক্যালসিয়াম।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_49",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "রিউমাটয়েড আর্থ্রাইটিস রোগটি মূলত দেহের কোন অংশে আক্রমণ করে?",
    options: [
      { id: "opt_bio_9_49_a", text: "অস্থিসন্ধি বা বিভিন্ন অঙ্গের গিঁটে", isCorrect: true },
      { id: "opt_bio_9_49_b", text: "বৃক্কের নেফ্রনে", isCorrect: false },
      { id: "opt_bio_9_49_c", text: "ফুসফুসের অ্যালভিওলাইয়ে", isCorrect: false },
      { id: "opt_bio_9_49_d", text: "চোখের রেটিনায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অস্থিসন্ধি বা বিভিন্ন অঙ্গের গিঁটে।",
      coreConcept: "আর্থ্রাইটিস হলো অস্থিসন্ধির প্রদাহজনিত ব্যাধি; এতে গিঁটে গিঁটে ব্যথা ও প্রদাহ হয়ে সন্ধি শক্ত হয়ে যায়।",
      distractorAnalysis: {
        opt_bio_9_49_b: "বৃক্কে প্রদাহ হলো নেফ্রাইটিস।",
        opt_bio_9_49_c: "ফুসফুসের প্রদাহ হলো নিউমোনিয়া।",
        opt_bio_9_49_d: "রেটিনার ক্ষতি হলো রেটিনোপ্যাথি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 200
      },
      proTipShortcut: "আর্থ্রাইটিস (Arthritis) = অস্থিসন্ধির প্রদাহ।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_50",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "বাতের ব্যথায় আক্রান্ত রোগীদের ক্ষেত্রে কোন ধরনের জীবনযাপন ক্ষতিকর?",
    options: [
      { id: "opt_bio_9_50_a", text: "চিকিৎসকের পরামর্শে হালকা ব্যায়াম করা", isCorrect: false },
      { id: "opt_bio_9_50_b", text: "অতিরিক্ত শারীরিক পরিশ্রম ও ভারী বোঝা বহন করা", isCorrect: true },
      { id: "opt_bio_9_50_c", text: "সুষম ও আঁশযুক্ত খাদ্য গ্রহণ করা", isCorrect: false },
      { id: "opt_bio_9_50_d", text: "যন্ত্রণাদায়ক গিঁটে কুসুম গরম সেঁক দেওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অতিরিক্ত শারীরিক পরিশ্রম ও ভারী বোঝা বহন করা।",
      coreConcept: "অতিরিক্ত পরিশ্রম ও ভারী কাজ প্রদাহগ্রস্ত অস্থিসন্ধির ওপর তীব্র চাপ ফেলে এবং ক্ষতি বৃদ্ধি করে।",
      distractorAnalysis: {
        opt_bio_9_50_a: "হালকা ব্যায়াম সন্ধির নমনীয়তা ঠিক রাখতে উপকারী।",
        opt_bio_9_50_c: "সুষম খাদ্য সামগ্রিক স্বাস্থ্যের জন্য প্রয়োজনীয়।",
        opt_bio_9_50_d: "কুসুম গরম সেঁক রক্ত চলাচল বাড়িয়ে ব্যথা উপশমে সাহায্য করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 200
      },
      proTipShortcut: "বাতের রোগী ভারী কাজ এড়িয়ে চলবে।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_51",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "কোন ধরনের ওষুধ দীর্ঘদিন সেবনের ফলে অস্থিক্ষয় ত্বরান্বিত হয়ে অস্টিওপোরোসিসের আশঙ্কা বাড়ে?",
    options: [
      { id: "opt_bio_9_51_a", text: "প্যারাসিটামল", isCorrect: false },
      { id: "opt_bio_9_51_b", text: "স্টেরয়েডযুক্ত ওষুধ (Steroids)", isCorrect: true },
      { id: "opt_bio_9_51_c", text: "অ্যান্টাসিড", isCorrect: false },
      { id: "opt_bio_9_51_d", text: "ভিটামিন সি সাপ্লিমেন্ট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: স্টেরয়েডযুক্ত ওষুধ (Steroids)।",
      coreConcept: "যেসব ব্যক্তি দীর্ঘদিন যাবত স্টেরয়েডযুক্ত ওষুধ সেবন করেন, তাদের অস্টিওপোরোসিস হওয়ার আশঙ্কা অনেক বেশি থাকে (পৃষ্ঠা ১৯৯)।",
      distractorAnalysis: {
        opt_bio_9_51_a: "প্যারাসিটামল স্বল্পমেয়াদি সাধারণ ব্যথানাশক।",
        opt_bio_9_51_c: "অ্যান্টাসিড পাকস্থলীর এসিডিটি কমায়।",
        opt_bio_9_51_d: "ভিটামিন সি রোগ প্রতিরোধ ক্ষমতা বাড়ায় ও কোলাজেন তৈরিতে সাহায্য করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 199
      },
      proTipShortcut: "দীর্ঘমেয়াদি স্টেরয়েড সেবন = হাড়ের ক্যালসিয়াম ক্ষয়।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_52",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "অস্টিওপোরোসিসের প্রাথমিক পর্যায়ে উপসর্গ বুঝতে না পারার প্রধান কারণ কোনটি?",
    options: [
      { id: "opt_bio_9_52_a", text: "এটি সম্পূর্ণ রক্তে দ্রবীভূত থাকে", isCorrect: false },
      { id: "opt_bio_9_52_b", text: "অস্থির ক্ষয় নীরবে ঘটে এবং প্রাথমিক অবস্থায় তেমন দৃশ্যমান উপসর্গ দেয় না", isCorrect: true },
      { id: "opt_bio_9_52_c", text: "রোগটি কেবল মস্তিষ্কের স্নায়ুকে আক্রমণ করে", isCorrect: false },
      { id: "opt_bio_9_52_d", text: "রোগটি কোনো ধরনের ক্যালসিয়াম ঘাটতি তৈরি করে না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অস্থির ক্ষয় নীরবে ঘটে এবং প্রাথমিক অবস্থায় তেমন দৃশ্যমান উপসর্গ দেয় না।",
      coreConcept: "অস্টিওপোরোসিসকে নিরব ঘাতক বলা হয় কারণ প্রাথমিক অবস্থায় তেমন কোনো লক্ষণ দেখা যায় না, হঠাৎ সামান্য আঘাতেই হাড় ভেঙে যাওয়ার পর রোগটি ধরা পড়ে।",
      distractorAnalysis: {
        opt_bio_9_52_a: "হাড় রক্তে দ্রবীভূত হওয়ার প্রশ্নই আসে না।",
        opt_bio_9_52_c: "এটি কঙ্কালতন্ত্রের রোগ, মস্তিষ্কের নয়।",
        opt_bio_9_52_d: "এটি ক্যালসিয়াম ঘাটতির ফলেই সৃষ্টি হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 199
      },
      proTipShortcut: "অস্টিওপোরোসিসের প্রাথমিক অবস্থা = নীরব ও লক্ষণহীন।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_53",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "একজন প্রবীণ নারী চিকিৎসকের কাছে গিয়ে জানালেন সকালে ঘুম থেকে ওঠার পর তাঁর হাতের আঙুল ও হাঁটুর গিঁট প্রচণ্ড শক্ত হয়ে থাকে ও নড়ানো যায় না। তিনি কোন রোগে আক্রান্ত হতে পারেন?",
    options: [
      { id: "opt_bio_9_53_a", text: "অস্টিওপোরোসিস", isCorrect: false },
      { id: "opt_bio_9_53_b", text: "রিউমাটয়েড আর্থ্রাইটিস", isCorrect: true },
      { id: "opt_bio_9_53_c", text: "বাতজ্বর", isCorrect: false },
      { id: "opt_bio_9_53_d", text: "পোলিও", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: রিউমাটয়েড আর্থ্রাইটিস।",
      coreConcept: "অস্থিসন্ধিগুলো শক্ত হয়ে যাওয়া, নাড়াতে নিদারুণ কষ্ট হওয়া এবং গিঁট ফুলে যাওয়া রিউমাটয়েড আর্থ্রাইটিসের বৈশিষ্ট্যমূলক লক্ষণ।",
      distractorAnalysis: {
        opt_bio_9_53_a: "অস্টিওপোরোসিসে হাড় ভঙ্গুর হয় কিন্তু সকালে গিঁটের আড়ষ্টতা থাকে না।",
        opt_bio_9_53_c: "বাতজ্বর সাধারণত শিশুদের গলায় স্ট্রেপ্টোকক্কাস সংক্রমণের পর হয়।",
        opt_bio_9_53_d: "পোলিও ভাইরাসজনিত পক্ষাঘাত রোগ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 200
      },
      proTipShortcut: "সকালে গিঁট শক্ত ও আড়ষ্ট = রিউমাটয়েড আর্থ্রাইটিস।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_54",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "অস্থির সুস্থতা রক্ষায় এবং অস্টিওপোরোসিস প্রতিরোধে নিয়মিত কোন অভ্যাসটি গড়ে তোলা আবশ্যক?",
    options: [
      { id: "opt_bio_9_54_a", text: "সারাদিন সম্পূর্ণ বিশ্রামে থাকা", isCorrect: false },
      { id: "opt_bio_9_54_b", text: "নিয়মিত পরিমিত ব্যায়াম করা ও সূর্যালোক গ্রহণ", isCorrect: true },
      { id: "opt_bio_9_54_c", text: "কেবল ব্যথানাশক ওষুধ খেয়ে সক্রিয় থাকা", isCorrect: false },
      { id: "opt_bio_9_54_d", text: "শাকসবজি ও ফলমূল বর্জন করা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: নিয়মিত পরিমিত ব্যায়াম করা ও সূর্যালোক গ্রহণ।",
      coreConcept: "নিয়মিত শারীরিক ব্যায়াম অস্থির ওপর চাপ দিয়ে খনিজ শোষণ বাড়ায় এবং সূর্যালোক ত্বকে ভিটামিন ডি তৈরি করে ক্যালসিয়াম শোষণে সাহায্য করে।",
      distractorAnalysis: {
        opt_bio_9_54_a: "অলস জীবনযাপন হাড়ের ক্ষয় বহুগুণ বৃদ্ধি করে।",
        opt_bio_9_54_c: "ব্যথানাশক ওষুধ রোগ প্রতিরোধ করে না, কেবল সাময়িক উপশম দেয়।",
        opt_bio_9_54_d: "শাকসবজি ও ফলমূলে প্রচুর ক্যালসিয়াম ও অ্যান্টিঅক্সিডেন্ট থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 200
      },
      proTipShortcut: "মজবুত হাড় = নিয়মিত শরীরচর্চা + সূর্যালোক।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // CREATIVE QUESTIONS (CQ_CREATIVE 7 to 12)
  // ==========================================
  {
    id: "q_bio_9_55",
    topicId: "top_ssc_biology_ch9_1",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান প্রদর্শনীতে কঙ্কালতন্ত্রের দুটি বিভাগ প্রদর্শন করা হলো: অংশ A হলো করোটি, মেরুদণ্ড ও বক্ষপিঞ্জর সমন্বিত অক্ষ বরাবর অংশ এবং অংশ B হলো হাত, পা, স্কন্ধ ও শ্রোণির অস্থিচক্র। প্রদর্শক বললেন, “অংশ A আমাদের প্রাণ ধারণকারী অঙ্গ রক্ষা করে আর অংশ B আমাদের স্থান পরিবর্তন নিশ্চিত করে।”",
    options: null,
    explanation: {
      directAnswer: "অংশ A হলো অক্ষীয় কঙ্কাল এবং অংশ B হলো উপাঙ্গীয় কঙ্কাল।",
      coreConcept: "অক্ষীয় কঙ্কাল দেহের সুরক্ষায় এবং উপাঙ্গীয় কঙ্কাল দৈহিক চলনে ভূমিকা রাখে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১",
        pageNumber: 192
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "উপাঙ্গীয় কঙ্কালে মোট কতটি অস্থি থাকে তা সংখ্যায় লেখা।" },
      kha: { mark: 2, criteria: "ম্যান্ডিবলকে করোটির অন্যান্য অস্থির চেয়ে স্বতন্ত্র বলা হয় কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের অংশ A কীভাবে সুষুম্নাকাণ্ড ও হৃৎপিণ্ডকে সুরক্ষিত রাখে—গঠনসহ ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "“মানবদেহের স্বাভাবিক চলন মূলত অংশ B এর অস্থির সাথে পেশিতন্ত্রের যৌথ সমন্বয়ের ফল”—উক্তিটির যথার্থতা মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_56",
    topicId: "top_ssc_biology_ch9_2",
    type: "CQ_CREATIVE",
    stem: "দশম শ্রেণির শিক্ষার্থী তামিম লক্ষ্য করল, তীব্র রোদে বাইরে খেলতে যাওয়া তার সহপাঠীদের তুলনায় যারা সারাদিন বদ্ধ ফ্ল্যাটে ভিডিও গেম খেলে, তাদের হাড়ের শক্তি তুলনামূলক কম। শিক্ষক ক্লাসে জানালেন, অস্থি গঠনের জন্য ক্যালসিয়ামের পাশাপাশি ত্বকে এক বিশেষ ভিটামিন সংশ্লেষিত হওয়া অত্যন্ত জরুরি।",
    options: null,
    explanation: {
      directAnswer: "সূর্যালোকের প্রভাবে ত্বকে ভিটামিন ডি সংশ্লেষণ ও ক্যালসিয়াম শোষণ।",
      coreConcept: "ত্বকের কোলেস্টেরল থেকে ভিটামিন ডি সংশ্লেষিত হয়ে অন্ত্রে ক্যালসিয়াম ও ফসফরাস শোষণ নিয়ন্ত্রণ করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "অস্থিতে অজৈব যৌগের শতকরা হার কত তা লেখা।" },
      kha: { mark: 2, criteria: "তরুণাস্থির চারপাশের পেরিকন্ড্রিয়ামের গুরুত্ব ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "তামিমের পর্যবেক্ষণ অনুযায়ী সূর্যালোক কীভাবে অস্থি শক্তিশালী করতে ভূমিকা রাখে তা রাসায়নিকভাবে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "অস্থি এবং তরুণাস্থির মধ্যকার যান্ত্রিক ক্ষমতার বৈসাদৃশ্য মানবদেহের বিভিন্ন অঙ্গের কার্যকারিতার ওপর কী প্রভাব ফেলে—বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_57",
    topicId: "top_ssc_biology_ch9_3",
    type: "CQ_CREATIVE",
    stem: "একজন অর্থোপেডিক সার্জন এক্স-রে দেখে রোগীকে বললেন, “আপনার হাঁটু সন্ধির সাইনোভিয়াল রস শুকিয়ে যাওয়ায় দুটি অস্থির তরুণাস্থিময় প্রান্তের মাঝে সরাসরি ঘর্ষণ হচ্ছে। ফলে আপনি হাঁটতে গেলে প্রচণ্ড ব্যথা অনুভব করছেন।”",
    options: null,
    explanation: {
      directAnswer: "সাইনোভিয়াল অস্থিসন্ধির শারীরবৃত্তীয় গঠন ও ঘর্ষণরোধী ক্রিয়া।",
      coreConcept: "সাইনোভিয়াল রস ও আর্টিকুলার কার্টিলেজ যৌথভাবে সন্ধির ক্ষয় রোধ করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 195
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "সাইনোভিয়াল রস কী তা সংজ্ঞায়িত করা।" },
      kha: { mark: 2, criteria: "সরল ও জটিল সাইনোভিয়াল সন্ধির মধ্যে পার্থক্য ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের আলোকে একটি আদর্শ সাইনোভিয়াল অস্থিসন্ধির প্রধান প্রধান অংশগুলোর বিবরণ দেওয়া।" },
      gha: { mark: 4, criteria: "সাইনোভিয়াল সন্ধিতে সাইনোভিয়াল রসের উপস্থিতি কীভাবে পেশিশক্তি সাশ্রয় করে তা বৈজ্ঞানিকভাবে বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_58",
    topicId: "top_ssc_biology_ch9_4",
    type: "CQ_CREATIVE",
    stem: "রোবট তৈরির একটি কর্মশালায় শিক্ষার্থীরা দেখতে পেল, রোবটের বাহু ভাজ ও সোজা করতে বিপরীতমুখী দুটি মোটর পর্যায়ক্রমে টান প্রয়োগ করে। প্রশিক্ষক বললেন, “মানুষের বাহুতেও ঠিক একইভাবে বাইসেপস ও ট্রাইসেপস পেশি কাজ করে।”",
    options: null,
    explanation: {
      directAnswer: "অ্যান্টাগনিস্টিক পেশি ক্রিয়া এবং বায়োমেকানিক্স।",
      coreConcept: "পেশি কেবল সংকোচন করতে পারে, তাই বিপরীতমুখী পেশিজোড় চলন নিয়ন্ত্রণ করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.১",
        pageNumber: 197
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "বাইসেপস পেশি কোন অস্থির সাথে টেনডন দ্বারা যুক্ত থাকে তা লেখা।" },
      kha: { mark: 2, criteria: "টেনডন পেশির সারকোলেমায় কীভাবে সংযুক্ত থাকে তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের রোবটের কার্যক্রমের সাথে মিল রেখে মানুষের কনুই সোজা করার প্রক্রিয়া বর্ণনা করা।" },
      gha: { mark: 4, criteria: "“পেশিতন্ত্র ছাড়া কঙ্কালতন্ত্র নিথর কাঠামোর মতোই নিষ্ক্রিয়”—উক্তিটির যথার্থতা মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_59",
    topicId: "top_ssc_biology_ch9_4",
    type: "CQ_CREATIVE",
    stem: "ব্যাডমিন্টন খেলার সময় হঠাৎ জাম্প করতে গিয়ে সোহানের পায়ের পেছনের অ্যাকিলিস টেনডনে তীব্র টান পড়ে এবং অন্যদিকে রাসেলের হাঁটুর লিগামেন্ট মচকে যায়। চিকিৎসক দুজনের চিকিৎসায় ভিন্ন ধরনের নির্দেশনা দিলেন।",
    options: null,
    explanation: {
      directAnswer: "টেনডন ও লিগামেন্টের আঘাত ও গঠনগত পার্থক্য।",
      coreConcept: "টেনডন শ্বেত তন্তুময় এবং অস্থিতিস্থাপক; লিগামেন্ট পীত তন্তুময় এবং স্থিতিস্থাপক।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.২",
        pageNumber: 198
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "টেনডনে কোন ধরনের টিস্যু থাকে তা লেখা।" },
      kha: { mark: 2, criteria: "টেনডন সহজে জোড়া লাগে না কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "সোহান ও রাসেলের আঘাতপ্রাপ্ত অংশ দুটির গঠনগত বৈশিষ্ট্য তুলনামূলক ছকে উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "হাড়ের স্বাভাবিক বিন্যাস ও অঙ্গের সুরক্ষা বজায় রাখতে লিগামেন্টের ভূমিকা বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "কুমিল্লা বোর্ড মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_60",
    topicId: "top_ssc_biology_ch9_5",
    type: "CQ_CREATIVE",
    stem: "একটি স্বাস্থ্য সচেতনতা শিবিরে চিকিৎসক বললেন, “আমাদের এলাকায় বয়স্ক নারীদের মেনোপজের পর অস্টিওপোরোসিস নামক অস্থির ক্ষয়রোগের প্রাদুর্ভাব বৃদ্ধি পাচ্ছে। অথচ কৈশোর ও যৌবনকাল থেকেই নিয়মিত সুষম খাদ্য এবং ক্যালসিয়াম গ্রহণ করলে এ রোগ বহুলাংশে প্রতিরোধ করা সম্ভব।”",
    options: null,
    explanation: {
      directAnswer: "অস্টিওপোরোসিসের কারণ, ঝুঁকি এবং প্রতিরোধমূলক ব্যবস্থাপনা।",
      coreConcept: "ক্যালসিয়াম ও ইস্ট্রোজেন ঘাটতিতে হাড়ের ফাঁপা হওয়া এবং খাদ্যাভ্যাস ও ব্যায়ামের ভূমিকা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 199
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "অস্টিওপোরোসিস রোগ শনাক্তকারী পরীক্ষার নাম লেখা।" },
      kha: { mark: 2, criteria: "বাতের ব্যথায় কুসুম গরম সেঁক দেওয়া কেন উপকারী তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে উল্লিখিত রোগটি প্রতিরোধে ৫০ বছরোর্ধ্ব নারীদের দৈনিক ক্যালসিয়াম চাহিদা ও খাদ্যতালিকা বর্ণনা করা।" },
      gha: { mark: 4, criteria: "“সামাজিক সচেতনতা ও খাদ্যাভ্যাস পরিবর্তনই পারে অস্টিওপোরোসিসের ঝুঁকি নির্মূল করতে”—বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
