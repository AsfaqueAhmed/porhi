import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter9QuestionsBatch3: QuestionData[] = [
  // ==========================================
  // TOPIC 1: মানবকঙ্কালের পরিচিতি ও ভূমিকা (top_ssc_biology_ch9_1)
  // ==========================================
  {
    id: "q_bio_9_61",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "মানবদেহের কঙ্কালতন্ত্রের অক্ষীয় কঙ্কালে (Axial skeleton) মোট কতটি অস্থি অন্তর্ভুক্ত থাকে?",
    options: [
      { id: "opt_bio_9_61_a", text: "৮০টি", isCorrect: true },
      { id: "opt_bio_9_61_b", text: "১২৬টি", isCorrect: false },
      { id: "opt_bio_9_61_c", text: "২০৬টি", isCorrect: false },
      { id: "opt_bio_9_61_d", text: "৩৩টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ৮০টি।",
      coreConcept: "মানব কঙ্কালের মোট ২০৬টি অস্থির মধ্যে কেন্দ্রীয় অক্ষ বরাবর অবস্থিত করোটি (২৯), মেরুদণ্ড (৩৩) ও বক্ষপিঞ্জর (২৫) মিলিয়ে অক্ষীয় কঙ্কালে ৮০টি অস্থি থাকে।",
      distractorAnalysis: {
        opt_bio_9_61_b: "১২৬টি হলো উপাঙ্গীয় কঙ্কালের (হাত, পা, স্কন্ধ ও শ্রোণিচক্র) অস্থির সংখ্যা।",
        opt_bio_9_61_c: "২০৬টি হলো সম্পূর্ণ মানব কঙ্কালের মোট অস্থির সংখ্যা।",
        opt_bio_9_61_d: "৩৩টি হলো মেরুদণ্ডের কশেরুকার সংখ্যা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১",
        pageNumber: 192
      },
      proTipShortcut: "অক্ষীয় কঙ্কাল = ৮০টি অস্থি; উপাঙ্গীয় কঙ্কাল = ১২৬টি অস্থি।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_62",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "কঙ্কালের বক্ষপিঞ্জরে সুরক্ষিত থাকে এমন দুটি অতীব সংবেদনশীল অভ্যন্তরীণ অঙ্গ কোনটি?",
    options: [
      { id: "opt_bio_9_62_a", text: "মস্তিষ্ক ও সুষুম্নাকাণ্ড", isCorrect: false },
      { id: "opt_bio_9_62_b", text: "হৃৎপিণ্ড ও ফুসফুস", isCorrect: true },
      { id: "opt_bio_9_62_c", text: "যকৃৎ ও অগ্ন্যাশয়", isCorrect: false },
      { id: "opt_bio_9_62_d", text: "পাকস্থলী ও মূত্রথলি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: হৃৎপিণ্ড ও ফুসফুস।",
      coreConcept: "স্টার্নাম ও ১২ জোড়া পরশুকা দ্বারা গঠিত বক্ষপিঞ্জরের নিরাপদ খাঁচার ভেতরে হৃৎপিণ্ড ও ফুসফুস সুরক্ষিত থাকে (পৃষ্ঠা ১৯২)।",
      distractorAnalysis: {
        opt_bio_9_62_a: "মস্তিষ্ক করোটিতে এবং সুষুম্নাকাণ্ড মেরুদণ্ডের কশেরুকা নালিতে সুরক্ষিত থাকে।",
        opt_bio_9_62_c: "যকৃৎ ও অগ্ন্যাশয় উদরগহ্বরে অবস্থান করে।",
        opt_bio_9_62_d: "পাকস্থলী ও মূত্রথলি শ্রোণি ও উদরগহ্বরে থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১",
        pageNumber: 192
      },
      proTipShortcut: "বক্ষপিঞ্জরের ভেতরে = হৃৎপিণ্ড ও ফুসফুস।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_63",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "শিশুর কঙ্কালের অস্থির সংখ্যা পূর্ণবয়স্কদের তুলনায় বেশি থাকার কারণ কী?",
    options: [
      { id: "opt_bio_9_63_a", text: "শিশুর দেহে বেশি মাংসপেশি থাকে", isCorrect: false },
      { id: "opt_bio_9_63_b", text: "শিশুর অনেকগুলো পৃথক অস্থি বয়োবৃদ্ধির সাথে সাথে পরস্পরের সাথে জোড়া লেগে একীভূত হয়", isCorrect: true },
      { id: "opt_bio_9_63_c", text: "শিশুর অস্থির ভেতর কোনো ক্যালসিয়াম থাকে না", isCorrect: false },
      { id: "opt_bio_9_63_d", text: "শিশুর অস্থিগুলো ক্রমাগত ভেঙে ক্ষয়প্রাপ্ত হয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: শিশুর অনেকগুলো পৃথক অস্থি বয়োবৃদ্ধির সাথে সাথে পরস্পরের সাথে জোড়া লেগে একীভূত হয়।",
      coreConcept: "শিশুর কঙ্কালে প্রায় ৩০০টি অস্থি থাকে; বৃদ্ধির সাথে সাথে করোটি, মেরুদণ্ড ও শ্রোণির বহু অস্থি পরস্পরের সাথে জোড়া লেগে পূর্ণবয়স্কে ২০৬টিতে দাঁড়ায়।",
      distractorAnalysis: {
        opt_bio_9_63_a: "পেশির সাথে অস্থির সংখ্যার সম্পর্ক নেই।",
        opt_bio_9_63_c: "শিশুর অস্থিতেও ক্যালসিয়াম থাকে।",
        opt_bio_9_63_d: "অস্থি ভেঙে ক্ষয়প্রাপ্ত হয় না, বরং জোড়া লাগে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১",
        pageNumber: 192
      },
      proTipShortcut: "শিশুর হাড় বৃদ্ধির সাথে সাথে জোড়া লেগে ২০৬টি হয়।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_64",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "মানবদেহের কাঁধের স্কন্ধচক্রে (Pectoral Girdle) অবস্থিত চ্যাপ্টা ডানা সদৃশ অস্থির নাম কী?",
    options: [
      { id: "opt_bio_9_64_a", text: "ক্ল্যাভিকল", isCorrect: false },
      { id: "opt_bio_9_64_b", text: "স্ক্যাপুলা (Scapula)", isCorrect: true },
      { id: "opt_bio_9_64_c", text: "স্টার্নাম", isCorrect: false },
      { id: "opt_bio_9_64_d", text: "ইলিয়াম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: স্ক্যাপুলা (Scapula)।",
      coreConcept: "কাঁধের পেছনের চ্যাপ্টা ত্রিকোণাকার ডানা সদৃশ অস্থি হলো স্ক্যাপুলা এবং সামনের সরু বাঁকানো কলার বোন হলো ক্ল্যাভিকল।",
      distractorAnalysis: {
        opt_bio_9_64_a: "ক্ল্যাভিকল হলো সামনের বাঁকানো সরু বিউটি বোন।",
        opt_bio_9_64_c: "স্টার্নাম বুকের সামনের চ্যাপ্টা টাই আকৃতির অস্থি।",
        opt_bio_9_64_d: "ইলিয়াম শ্রোণিচক্রের নিতম্বাস্থি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · চিত্র ৯.০১",
        pageNumber: 192
      },
      proTipShortcut: "কাঁধের পেছনের চ্যাপ্টা হাড় = স্ক্যাপুলা (Scapula)।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // TOPIC 2: অস্থি ও তরুণাস্থি (top_ssc_biology_ch9_2)
  // ==========================================
  {
    id: "q_bio_9_65",
    topicId: "top_ssc_biology_ch9_2",
    type: "MCQ",
    stem: "পাঠ্যবইয়ের নমুনা প্রশ্ন ১: নিচের কোনটি অস্থির প্রধান বৈশিষ্ট্য?",
    options: [
      { id: "opt_bio_9_65_a", text: "স্থিতিস্থাপক", isCorrect: false },
      { id: "opt_bio_9_65_b", text: "তন্তুময়", isCorrect: false },
      { id: "opt_bio_9_65_c", text: "দৃঢ়", isCorrect: true },
      { id: "opt_bio_9_65_d", text: "নরম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: দৃঢ়।",
      coreConcept: "অস্থি যোজক কলার রূপান্তরিত রূপ এবং এটি দেহের সবচেয়ে দৃঢ় কলা (পাঠ্যবই পৃষ্ঠা ২০১-এর ১ নং বহুনির্বাচনি প্রশ্ন)।",
      distractorAnalysis: {
        opt_bio_9_65_a: "স্থিতিস্থাপকতা তরুণাস্থি বা লিগামেন্টের প্রধান বৈশিষ্ট্য।",
        opt_bio_9_65_b: "তন্তুময় বৈশিষ্ট্য টেনডন বা লিগামেন্টের।",
        opt_bio_9_65_d: "নরম হলো তরুণাস্থি বা সাধারণ যোজক কলার বৈশিষ্ট্য।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · নমুনা প্রশ্ন ১",
        pageNumber: 201
      },
      proTipShortcut: "অস্থি = সবচেয়ে দৃঢ় ও অনমনীয় যোজক কলা।"
    },
    difficulty: "EASY",
    boardSource: "NCTB পাঠ্যবই নমুনা প্রশ্ন ১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_66",
    topicId: "top_ssc_biology_ch9_2",
    type: "MCQ",
    stem: "কানের পিনায় (Ear Pinna) কোন ধরনের স্কেলিটাল যোজক টিস্যু বিদ্যমান?",
    options: [
      { id: "opt_bio_9_66_a", text: "স্পঞ্জি অস্থি", isCorrect: false },
      { id: "opt_bio_9_66_b", text: "স্থিতিস্থাপক তরুণাস্থি", isCorrect: true },
      { id: "opt_bio_9_66_c", text: "ঘন শ্বেততন্তুময় টেনডন", isCorrect: false },
      { id: "opt_bio_9_66_d", text: "নিশ্চল কঙ্কালপেশি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: স্থিতিস্থাপক তরুণাস্থি।",
      coreConcept: "কানের পিনা স্থিতিস্থাপক তরুণাস্থি (Elastic cartilage) দ্বারা গঠিত, যার ফলে এটি দুমড়ে গেলেও ভেঙে যায় না এবং পূর্বের অবস্থানে ফিরে আসে (পৃষ্ঠা ২০৩-এর সংক্ষিপ্ত প্রশ্ন ৩)।",
      distractorAnalysis: {
        opt_bio_9_66_a: "স্পঞ্জি অস্থি থাকলে কান বাঁকানো যেত না।",
        opt_bio_9_66_c: "টেনডন পেশিকে অস্থির সাথে সংযুক্ত করে, পিনা গঠন করে না।",
        opt_bio_9_66_d: "পিনা কোনো পেশিময় অঙ্গ নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      },
      proTipShortcut: "কানের পিনা = তরুণাস্থি (Cartilage)।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_67",
    topicId: "top_ssc_biology_ch9_2",
    type: "MCQ",
    stem: "তরুণাস্থির অভ্যন্তরে রক্তনালি প্রবেশ না করা সত্ত্বেও এটি কীভাবে পুষ্টি উপাদান ও অক্সিজেন গ্রহণ করে?",
    options: [
      { id: "opt_bio_9_67_a", text: "ব্যাপন (Diffusion) প্রক্রিয়ায় পেরিফেরাল পেরিকন্ড্রিয়াম থেকে", isCorrect: true },
      { id: "opt_bio_9_67_b", text: "হেভারসিয়ান ক্যানালের মাধ্যমে সরাসরি রক্তনালি থেকে", isCorrect: false },
      { id: "opt_bio_9_67_c", text: "সরাসরি বায়ুমণ্ডলীয় বাতাস থেকে শোষণ করে", isCorrect: false },
      { id: "opt_bio_9_67_d", text: "অস্থিমজ্জার লোহিত রক্তকণিকা থেকে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ব্যাপন (Diffusion) প্রক্রিয়ায় পেরিফেরাল পেরিকন্ড্রিয়াম থেকে।",
      coreConcept: "তরুণাস্থির ম্যাট্রিক্সে রক্তনালি থাকে না; বাইরের পেরিকন্ড্রিয়াম আবরণীর রক্তজালক থেকে পুষ্টি ও অক্সিজেন ব্যাপন প্রক্রিয়ায় ল্যাকিউনির কোষে পৌঁছায়।",
      distractorAnalysis: {
        opt_bio_9_67_b: "হেভারসিয়ান তন্ত্র অস্থিতে থাকে, তরুণাস্থিতে নয়।",
        opt_bio_9_67_c: "বায়ুমণ্ডলীয় বাতাস থেকে সরাসরি পুষ্টি পাওয়ার সুযোগ নেই।",
        opt_bio_9_67_d: "তরুণাস্থিতে অস্থিমজ্জা থাকে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      },
      proTipShortcut: "তরুণাস্থিতে রক্তনালি নেই -> পুষ্টি পায় ব্যাপনে।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // TOPIC 3: অস্থিসন্ধি (top_ssc_biology_ch9_3)
  // ==========================================
  {
    id: "q_bio_9_68",
    topicId: "top_ssc_biology_ch9_3",
    type: "MCQ",
    stem: "পাঠ্যবইয়ের সংক্ষিপ্ত প্রশ্ন ৪: মানবদেহের কাঁধে (Shoulder) কোন ধরনের অস্থিসন্ধি বিদ্যমান?",
    options: [
      { id: "opt_bio_9_68_a", text: "কবজা সন্ধি", isCorrect: false },
      { id: "opt_bio_9_68_b", text: "বল ও কোটরসন্ধি", isCorrect: true },
      { id: "opt_bio_9_68_c", text: "নিশ্চল অস্থিসন্ধি", isCorrect: false },
      { id: "opt_bio_9_68_d", text: "ঈষৎ সচল সন্ধি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বল ও কোটরসন্ধি।",
      coreConcept: "কাঁধের স্কন্ধসন্ধিতে হিউমেরাসের গোল মাথা স্ক্যাপুলার গ্লেনয়েড কোটরে বসানো থাকে; এটি একটি বল ও কোটরসন্ধি (পৃষ্ঠা ১৯৫ ও ২০৩)।",
      distractorAnalysis: {
        opt_bio_9_68_a: "কবজা সন্ধি কেবল কনুই ও হাঁটুতে থাকে।",
        opt_bio_9_68_c: "নিশ্চল সন্ধি করোটিতে থাকে।",
        opt_bio_9_68_d: "ঈষৎ সচল সন্ধি মেরুদণ্ডে থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 195
      },
      proTipShortcut: "কাঁধ ও উরুসন্ধি = বল ও কোটরসন্ধি (Ball and Socket)।"
    },
    difficulty: "EASY",
    boardSource: "NCTB পাঠ্যবই সংক্ষিপ্ত প্রশ্ন ৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_69",
    topicId: "top_ssc_biology_ch9_3",
    type: "MCQ",
    stem: "একটি সাইনোভিয়াল অস্থিসন্ধি প্রধানত কয়টি স্তরের ক্যাপসুল বা ঝিল্লি দিয়ে সুরক্ষিত থাকে?",
    options: [
      { id: "opt_bio_9_69_a", text: "একটি একক পাতলা ঝিল্লি", isCorrect: false },
      { id: "opt_bio_9_69_b", text: "ভেতরে সাইনোভিয়াল ঝিল্লি ও বাইরে তন্তুময় ঝিল্লি (দ্বিস্তরবিশিষ্ট ক্যাপসুল)", isCorrect: true },
      { id: "opt_bio_9_69_c", text: "চারটি স্বতন্ত্র আবরণী", isCorrect: false },
      { id: "opt_bio_9_69_d", text: "কোনো ক্যাপসুল থাকে না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ভেতরে সাইনোভিয়াল ঝিল্লি ও বাইরে তন্তুময় ঝিল্লি (দ্বিস্তরবিশিষ্ট ক্যাপসুল)।",
      coreConcept: "পাঠ্যবইয়ের চিত্র ৯.০২ অনুযায়ী সাইনোভিয়াল সন্ধির ক্যাপসুল ভেতরে সাইনোভিয়াল ঝিল্লি এবং বাইরে তন্তুময় ঝিল্লি নিয়ে গঠিত।",
      distractorAnalysis: {
        opt_bio_9_69_a: "একক ঝিল্লি নয়, এটি দ্বিস্তরবিশিষ্ট।",
        opt_bio_9_69_c: "চারটি আবরণী থাকে না।",
        opt_bio_9_69_d: "ক্যাপসুল ব্যতীত সাইনোভিয়াল সন্ধি গঠিত হতে পারে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · চিত্র ৯.০২",
        pageNumber: 195
      },
      proTipShortcut: "ক্যাপসুল = ভেতরের সাইনোভিয়াল ঝিল্লি + বাইরের তন্তুময় ঝিল্লি।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_70",
    topicId: "top_ssc_biology_ch9_3",
    type: "MCQ",
    stem: "হাতের আঙুলগুলোর (Phalanges) মধ্যবর্তী অস্থিসন্ধি কোন প্রকারের?",
    options: [
      { id: "opt_bio_9_70_a", text: "বল ও কোটরসন্ধি", isCorrect: false },
      { id: "opt_bio_9_70_b", text: "কবজা সন্ধি (Hinge Joint)", isCorrect: true },
      { id: "opt_bio_9_70_c", text: "নিশ্চল সন্ধি", isCorrect: false },
      { id: "opt_bio_9_70_d", text: "ঈষৎ সচল সন্ধি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কবজা সন্ধি (Hinge Joint)।",
      coreConcept: "আঙুলের পর্বগুলোর মধ্যকার সন্ধি কবজার মতো কেবল একদিকে ভাঁজ ও সোজা করা যায়; তাই এটি কবজা সন্ধি (পৃষ্ঠা ১৯৬)।",
      distractorAnalysis: {
        opt_bio_9_70_a: "আঙুলের পর্বগুলো বল-কোটরের মতো সব দিকে ঘোরে না।",
        opt_bio_9_70_c: "আঙুল নিশ্চল নয়, সহজেই ভাঁজ করা যায়।",
        opt_bio_9_70_d: "ঈষৎ সচল নয়, এটি পূর্ণ সচল কবজা সন্ধি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 196
      },
      proTipShortcut: "কনুই, হাঁটু ও আঙুল = কবজা সন্ধি।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // TOPIC 4: পেশিতন্ত্র ও চলন (top_ssc_biology_ch9_4)
  // ==========================================
  {
    id: "q_bio_9_71",
    topicId: "top_ssc_biology_ch9_4",
    type: "MCQ",
    stem: "পাঠ্যবইয়ের নমুনা বহুনির্বাচনি প্রশ্ন ২: টেনডনের টিস্যু হচ্ছে—\ni. ঘন ও সাদা তন্তুময়\nii. স্থিতিস্থাপকতা বেশি\niii. গুচ্ছাকার ও সমান্তরালে বিন্যস্ত\nনিচের কোনটি সঠিক?",
    options: [
      { id: "opt_bio_9_71_a", text: "i ও ii", isCorrect: false },
      { id: "opt_bio_9_71_b", text: "i ও iii", isCorrect: true },
      { id: "opt_bio_9_71_c", text: "ii ও iii", isCorrect: false },
      { id: "opt_bio_9_71_d", text: "i, ii ও iii", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: i ও iii।",
      coreConcept: "টেনডন ঘন ও সাদা তন্তুময় যোজক টিস্যু দ্বারা গঠিত এবং এর তন্তুগুলো গুচ্ছাকারে সমান্তরালে বিন্যস্ত থাকে। এর স্থিতিস্থাপকতা কম (বেশি নয়) (পাঠ্যবই পৃষ্ঠা ২০১-এর ২ নং প্রশ্ন)।",
      distractorAnalysis: {
        opt_bio_9_71_a: "বিবৃতি ii ভুল, কারণ টেনডনের স্থিতিস্থাপকতা বেশ কম।",
        opt_bio_9_71_c: "বিবৃতি ii ভুল থাকায় গ সঠিক হতে পারে না।",
        opt_bio_9_71_d: "বিবৃতি ii অন্তর্ভুক্ত থাকায় ঘ ভুল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · নমুনা প্রশ্ন ২",
        pageNumber: 201
      },
      proTipShortcut: "টেনডন = সাদা কোলাজেন তন্তু + সমান্তরাল আঁটি + কম স্থিতিস্থাপকতা।"
    },
    difficulty: "MEDIUM",
    boardSource: "NCTB পাঠ্যবই নমুনা প্রশ্ন ২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_72",
    topicId: "top_ssc_biology_ch9_4",
    type: "MCQ",
    stem: "পাঠ্যবইয়ের সংক্ষিপ্ত প্রশ্ন ১: অস্থিবন্ধনী বা লিগামেন্ট কীভাবে কাজ করে?",
    options: [
      { id: "opt_bio_9_72_a", text: "পেশিকে সংকুচিত করে শক্তি তৈরি করে", isCorrect: false },
      { id: "opt_bio_9_72_b", text: "অস্থিগুলোকে আটকে রেখে অঙ্গকে সব দিকে সোজা বা বাঁকা হতে সাহায্য করে এবং স্থানচ্যুতি রোধ করে", isCorrect: true },
      { id: "opt_bio_9_72_c", text: "হাড়ের ভেতরে রক্তকণিকা সরবরাহ করে", isCorrect: false },
      { id: "opt_bio_9_72_d", text: "কেবল ক্যালসিয়াম সঞ্চয় করে রাখে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অস্থিগুলোকে আটকে রেখে অঙ্গকে সব দিকে সোজা বা বাঁকা হতে সাহায্য করে এবং স্থানচ্যুতি রোধ করে।",
      coreConcept: "লিগামেন্ট দরজার কবজার মতো হাড়কে দৃঢ়ভাবে আটকে রাখে যাতে অঙ্গটি সব দিকে সোজা বা বাঁকা হয়ে নড়াচড়া করতে পারে এবং হাড় পিছলে স্থানচ্যুত না হয় (পৃষ্ঠা ১৯৮)।",
      distractorAnalysis: {
        opt_bio_9_72_a: "পেশি শক্তি তৈরি করে, লিগামেন্ট নয়।",
        opt_bio_9_72_c: "রক্তকণিকা অস্থিমজ্জার কাজ।",
        opt_bio_9_72_d: "ক্যালসিয়াম অস্থির ম্যাট্রিক্সে থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.২",
        pageNumber: 198
      },
      proTipShortcut: "লিগামেন্ট = অস্থি সংযোগ ও স্থানচ্যুতি রোধ।"
    },
    difficulty: "EASY",
    boardSource: "NCTB পাঠ্যবই সংক্ষিপ্ত প্রশ্ন ১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_73",
    topicId: "top_ssc_biology_ch9_4",
    type: "MCQ",
    stem: "টেনডনের আঁটিগুচ্ছগুলোকে (Bundles) বাইরে থেকে বেষ্টন করে রাখা ঢিলেঢালা যোজক টিস্যুটির নাম কী?",
    options: [
      { id: "opt_bio_9_73_a", text: "অ্যারিওলার টিস্যু (Areolar Tissue)", isCorrect: true },
      { id: "opt_bio_9_73_b", text: "মেদ টিস্যু (Adipose Tissue)", isCorrect: false },
      { id: "opt_bio_9_73_c", text: "পেরিঅস্টিয়াম", isCorrect: false },
      { id: "opt_bio_9_73_d", text: "হাইড্রেনকাইমা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ্যারিওলার টিস্যু (Areolar Tissue)।",
      coreConcept: "আঁটিগুচ্ছগুলো আবার তন্তুময় টিস্যুগুচ্ছ বা অ্যারিওলার টিস্যু দিয়ে বেষ্টিত হয়ে আরো বড় আঁটিতে শ্রেণিবদ্ধ হয় এবং এর মধ্য দিয়ে রক্তনালি ও স্নায়ু প্রবেশ করে।",
      distractorAnalysis: {
        opt_bio_9_73_b: "মেদ টিস্যু চর্বি সঞ্চয় করে।",
        opt_bio_9_73_c: "পেরিঅস্টিয়াম অস্থির বাইরের আবরণী।",
        opt_bio_9_73_d: "হাইড্রেনকাইমা উদ্ভিদের টিস্যু।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.২",
        pageNumber: 197
      },
      proTipShortcut: "টেনডন বান্ডিলের বেষ্টনী = অ্যারিওলার টিস্যু।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_74",
    topicId: "top_ssc_biology_ch9_4",
    type: "MCQ",
    stem: "টেনডন ছিঁড়ে গেলে সহজে জোড়া লাগতে না পারার অন্যতম কারণ কোনটি?",
    options: [
      { id: "opt_bio_9_74_a", text: "এতে কোনো প্রোটিন তৈরি হয় না", isCorrect: false },
      { id: "opt_bio_9_74_b", text: "এতে রক্ত সরবরাহ ও পুনরুৎপাদন ক্ষমতা তুলনামূলকভাবে অত্যন্ত সীমিত", isCorrect: true },
      { id: "opt_bio_9_74_c", text: "এটি সম্পূর্ণ তরল অবস্থায় থাকে", isCorrect: false },
      { id: "opt_bio_9_74_d", text: "এটি কেবল পানিতে দ্রবণীয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: এতে রক্ত সরবরাহ ও পুনরুৎপাদন ক্ষমতা তুলনামূলকভাবে অত্যন্ত সীমিত।",
      coreConcept: "অস্থি বা পেশির তুলনায় টেনডন অত্যন্ত ঘন ও কম সংবহনশীল হওয়ায় এটি ছিঁড়ে গেলে অত্যন্ত ধীরগতিতে সুস্থ হয় এবং সহজে জোড়া লাগতে চায় না (পৃষ্ঠা ১৯৮)।",
      distractorAnalysis: {
        opt_bio_9_74_a: "টেনডন মূলত কোলাজেন প্রোটিন দিয়ে গঠিত।",
        opt_bio_9_74_c: "টেনডন অত্যন্ত শক্ত ও কঠিন রজ্জু, তরল নয়।",
        opt_bio_9_74_d: "টেনডন পানিতে অদ্রবণীয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.২",
        pageNumber: 198
      },
      proTipShortcut: "টেনডন ক্ষতিগ্রস্ত হলে জোড়া লাগা জটিল ও সময়সাপেক্ষ।"
    },
    difficulty: "HARD",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // TOPIC 5: রোগসমূহ (top_ssc_biology_ch9_5)
  // ==========================================
  {
    id: "q_bio_9_75",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "পাঠ্যবইয়ের নমুনা উদ্দীপক (পৃষ্ঠা ২০২): ৬০ বছরের রাহেলা বেগমের হাত-পায়ের গিঁটে ব্যথা হয়। তিনি কোন রোগে আক্রান্ত?",
    options: [
      { id: "opt_bio_9_75_a", text: "রিউমাটয়েড আর্থ্রাইটিস", isCorrect: true },
      { id: "opt_bio_9_75_b", text: "অস্টিওপোরোসিস", isCorrect: false },
      { id: "opt_bio_9_75_c", text: "রিউমেটিক ফিভার", isCorrect: false },
      { id: "opt_bio_9_75_d", text: "অস্থির যক্ষ্মা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: রিউমাটয়েড আর্থ্রাইটিস।",
      coreConcept: "বৃদ্ধ বয়সে হাত-পায়ের গিঁটে গিঁটে প্রদাহ ও তীব্র ব্যথা হওয়া রিউমাটয়েড আর্থ্রাইটিসের বৈশিষ্ট্য (পাঠ্যবই পৃষ্ঠা ২০২-এর ৩ নং বহুনির্বাচনি প্রশ্ন)।",
      distractorAnalysis: {
        opt_bio_9_75_b: "অস্টিওপোরোসিস হলো ক্যালসিয়াম অভাবে হাড় ভঙ্গুর হওয়ার রোগ।",
        opt_bio_9_75_c: "রিউমেটিক ফিভার অল্পবয়সী ছেলেমেয়েদের হয়।",
        opt_bio_9_75_d: "অস্থির যক্ষ্মা ব্যাকটেরিয়া সংক্রমণজনিত রোগ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · নমুনা প্রশ্ন ৩",
        pageNumber: 202
      },
      proTipShortcut: "বয়স্কদের গিঁটে ব্যথা = রিউমাটয়েড আর্থ্রাইটিস।"
    },
    difficulty: "EASY",
    boardSource: "NCTB পাঠ্যবই নমুনা প্রশ্ন ৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_76",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "পাঠ্যবইয়ের নমুনা প্রশ্ন ৪: হাবিবা বেগমের হাড় ভঙ্গুর হয়ে গেছে (অস্টিওপোরোসিস)। এই রোগটি প্রতিরোধের উপায় হচ্ছে—\ni. ব্যথাযুক্ত স্থানে বরফের সেঁক দেওয়া\nii. নিয়মিত সূর্যের আলোর সংস্পর্শে থাকা\niii. শাকসবজি, ফলমূল, দুধ, ডিম, মাছ ইত্যাদি খাদ্য গ্রহণ\nনিচের কোনটি সঠিক?",
    options: [
      { id: "opt_bio_9_76_a", text: "i ও ii", isCorrect: false },
      { id: "opt_bio_9_76_b", text: "i ও iii", isCorrect: false },
      { id: "opt_bio_9_76_c", text: "ii ও iii", isCorrect: true },
      { id: "opt_bio_9_76_d", text: "i, ii ও iii", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ii ও iii।",
      coreConcept: "অস্টিওপোরোসিস প্রতিরোধে নিয়মিত সূর্যের আলোর সংস্পর্শে থাকা (ভিটামিন ডি তৈরি) এবং ক্যালসিয়াম ও ভিটামিন সমৃদ্ধ সুষম খাদ্য গ্রহণ কার্যকর (পাঠ্যবই পৃষ্ঠা ২০২-এর ৪ নং প্রশ্ন)।",
      distractorAnalysis: {
        opt_bio_9_76_a: "বিবৃতি i ভুল; বরফের সেঁক অস্টিওপোরোসিস প্রতিরোধ করে না।",
        opt_bio_9_76_b: "বিবৃতি i ভুল থাকায় খ সঠিক হতে পারে না।",
        opt_bio_9_76_d: "বিবৃতি i অন্তর্ভুক্ত থাকায় ঘ ভুল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · নমুনা প্রশ্ন ৪",
        pageNumber: 202
      },
      proTipShortcut: "হাড়ের সুরক্ষা = সূর্যালোক + ক্যালসিয়াম খাদ্য (ii ও iii)।"
    },
    difficulty: "MEDIUM",
    boardSource: "NCTB পাঠ্যবই নমুনা প্রশ্ন ৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_77",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "অস্টিওপোরোসিস রোগে অস্থি ভঙ্গুর হওয়ার প্রধান কারণ নিচের কোনটি?",
    options: [
      { id: "opt_bio_9_77_a", text: "অস্থির মধ্যে অতিরিক্ত চর্বি জমা হওয়া", isCorrect: false },
      { id: "opt_bio_9_77_b", text: "অস্থিতে ক্যালসিয়ামের ঘাটতি ও ক্ষয়ের ভারসাম্য নষ্ট হওয়া", isCorrect: true },
      { id: "opt_bio_9_77_c", text: "অস্থির মধ্যে সাইনোভিয়াল রস অতিরিক্ত বৃদ্ধি পাওয়া", isCorrect: false },
      { id: "opt_bio_9_77_d", text: "অস্থির মধ্যে বেশি লোহিত রক্তকণিকা তৈরি হওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অস্থিতে ক্যালসিয়ামের ঘাটতি ও ক্ষয়ের ভারসাম্য নষ্ট হওয়া।",
      coreConcept: "অস্থির পুরাতন অংশ ক্ষয় হতে থাকে এবং নতুন অংশ তৈরি হয়; ক্যালসিয়ামের অভাবে এই ভারসাম্য নষ্ট হলে ক্ষয়ের পাল্লা ভারী হয়ে অস্থি ভঙ্গুর হয়।",
      distractorAnalysis: {
        opt_bio_9_77_a: "চর্বি জমা হওয়ার সাথে অস্থি ভঙ্গুরতার সরাসরি সম্পর্ক নেই।",
        opt_bio_9_77_c: "সাইনোভিয়াল রস অস্থির ভেতরের ঘনত্ব কমায় না।",
        opt_bio_9_77_d: "লোহিত রক্তকণিকা উৎপাদনের সাথে অস্থি ক্ষয়ের নেতিবাচক সম্পর্ক নেই।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 199
      },
      proTipShortcut: "অস্থিক্ষয় = নতুন গঠন অপেক্ষা ক্ষয়ের হার বেশি হওয়া।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_78",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "শিশুদের বাতজ্বর (Rheumatic Fever) প্রতিরোধের প্রাথমিক ও প্রধান উপায় কোনটি?",
    options: [
      { id: "opt_bio_9_78_a", text: "গলাব্যথা বা টনসিল সংক্রমণ দেখা দিলে দ্রুত চিকিৎসকের পরামর্শে পূর্ণ মেয়াদের অ্যান্টিবায়োটিক চিকিৎসা গ্রহণ করা", isCorrect: true },
      { id: "opt_bio_9_78_b", text: "শিশুকে সম্পূর্ণ কায়িক পরিশ্রমহীন রাখা", isCorrect: false },
      { id: "opt_bio_9_78_c", text: "কেবল ক্যালসিয়াম ট্যাবলেট খাওয়ানো", isCorrect: false },
      { id: "opt_bio_9_78_d", text: "অস্থিতে সরাসরি গরম সেঁক দেওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: গলাব্যথা বা টনসিল সংক্রমণ দেখা দিলে দ্রুত চিকিৎসকের পরামর্শে পূর্ণ মেয়াদের অ্যান্টিবায়োটিক চিকিৎসা গ্রহণ করা।",
      coreConcept: "স্ট্রেপ্টোকক্কাস ব্যাকটেরিয়াজনিত গলাব্যথা বা ফ্যারিঞ্জাইটিসের সঠিক ও দ্রুত চিকিৎসা না করালে তা পরবর্তীতে বাতজ্বরে রূপ নিয়ে শিশুর সন্ধি ও হৃৎপিণ্ডের ক্ষতি করে।",
      distractorAnalysis: {
        opt_bio_9_78_b: "শারীরিক পরিশ্রমহীনতা কোনো চিকিৎসা নয়।",
        opt_bio_9_78_c: "বাতজ্বর ক্যালসিয়াম ঘাটতি নয়, এটি ব্যাকটেরিয়া পরবর্তী অটোইমিউন প্রতিক্রিয়া।",
        opt_bio_9_78_d: "গরম সেঁক বাতজ্বরের মূল সংক্রমণ নির্মূল করে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 200
      },
      proTipShortcut: "শিশুর গলাব্যথার দ্রুত চিকিৎসা = বাতজ্বর প্রতিরোধ।"
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_79",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "মস্তিষ্ককে চারিদিক থেকে শক্ত বর্মের মতো আবৃতকারী করোটিকায় (Cranium) মোট কতটি অস্থি থাকে?",
    options: [
      { id: "opt_bio_9_79_a", text: "৮টি", isCorrect: true },
      { id: "opt_bio_9_79_b", text: "১৪টি", isCorrect: false },
      { id: "opt_bio_9_79_c", text: "৬টি", isCorrect: false },
      { id: "opt_bio_9_79_d", text: "২০টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ৮টি।",
      coreConcept: "করোটিকা (Cranium) মোট ৮টি চ্যাপ্টা অস্থি দ্বারা গঠিত (ফ্রন্টাল, প্যারাইটাল ২, টেম্পোরাল ২, অক্সিপিটাল, স্ফেনয়েড ও এথময়েড) যা সিউচার সন্ধি দিয়ে জোড়া লাগানো।",
      distractorAnalysis: {
        opt_bio_9_79_b: "১৪টি হলো মুখমণ্ডলীয় অস্থির সংখ্যা।",
        opt_bio_9_79_c: "৬টি হলো দুই কানের মোট কর্ণাস্থির (ম্যালিয়াস, ইনকাস, স্টেপিস) সংখ্যা।",
        opt_bio_9_79_d: "২০টি ভুল সংখ্যা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১",
        pageNumber: 192
      },
      proTipShortcut: "মাথার করোটিকা = ৮টি অস্থি।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_80",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "মানব মেরুদণ্ডের সর্বপ্রথম কশেরুকাটির নাম কী যার ওপর করোটি স্থাপিত থাকে?",
    options: [
      { id: "opt_bio_9_80_a", text: "অ্যাক্সিস", isCorrect: false },
      { id: "opt_bio_9_80_b", text: "অ্যাটলাস (Atlas)", isCorrect: true },
      { id: "opt_bio_9_80_c", text: "স্যাক্রাম", isCorrect: false },
      { id: "opt_bio_9_80_d", text: "কক্সিস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অ্যাটলাস (Atlas)।",
      coreConcept: "মেরুদণ্ডের ১ম গ্রীবাদেশীয় কশেরুকার নাম অ্যাটলাস (Atlas), যার ওপর মাথা ভর দিয়ে থাকে এবং মাথা হ্যাঁ-না ভঙ্গিতে নাড়াতে সাহায্য করে।",
      distractorAnalysis: {
        opt_bio_9_80_a: "অ্যাক্সিস হলো মেরুদণ্ডের ২য় গ্রীবাদেশীয় কশেরুকা।",
        opt_bio_9_80_c: "স্যাক্রাম হলো কোমরের পেছনের ৫টি কশেরুকার সংহত রূপ।",
        opt_bio_9_80_d: "কক্সিস মেরুদণ্ডের শেষ প্রান্তীয় লেজের মতো ৪টি কশেরুকার সংহত রূপ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১",
        pageNumber: 192
      },
      proTipShortcut: "মেরুদণ্ডের ১ম কশেরুকা = অ্যাটলাস (Atlas)।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_81",
    topicId: "top_ssc_biology_ch9_2",
    type: "MCQ",
    stem: "অস্থির বৃদ্ধির সময় নতুন অস্থি ম্যাট্রিক্স নিঃসরণকারী সক্রিয় কোষগুলোকে কী বলা হয়?",
    options: [
      { id: "opt_bio_9_81_a", text: "অস্টিওব্লাস্ট (Osteoblast)", isCorrect: true },
      { id: "opt_bio_9_81_b", text: "কনড্রোসাইট", isCorrect: false },
      { id: "opt_bio_9_81_c", text: "অস্টিওক্লাস্ট", isCorrect: false },
      { id: "opt_bio_9_81_d", text: "ফাইব্রোব্লাস্ট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অস্টিওব্লাস্ট (Osteoblast)।",
      coreConcept: "অস্থি গঠনকারী সক্রিয় অস্থিকোষ হলো অস্টিওব্লাস্ট; পরিণত কোষকে অস্টিওসাইট এবং ক্ষয়কারী কোষকে অস্টিওক্লাস্ট বলে।",
      distractorAnalysis: {
        opt_bio_9_81_b: "কনড্রোসাইট হলো পরিণত তরুণাস্থিকোষ।",
        opt_bio_9_81_c: "অস্টিওক্লাস্ট হলো অস্থি ক্ষয়কারী কোষ।",
        opt_bio_9_81_d: "ফাইব্রোব্লাস্ট তন্তুময় যোজক কলার কোষ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      },
      proTipShortcut: "ব্লাস্ট = তৈরি করে (Osteoblast); ক্লাস্ট = ক্ষয় করে (Osteoclast)।"
    },
    difficulty: "HARD",
    boardSource: "যশোর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_82",
    topicId: "top_ssc_biology_ch9_3",
    type: "MCQ",
    stem: "সাইনোভিয়াল অস্থিসন্ধির সাইনোভিয়াল রসের ঘনত্ব ও পিচ্ছিলতার জন্য প্রধানত দায়ী উপাদান কোনটি?",
    options: [
      { id: "opt_bio_9_82_a", text: "হায়ালুরোনিক এসিড ও বিশেষ মিউসিন প্রোটিন", isCorrect: true },
      { id: "opt_bio_9_82_b", text: "সোডিয়াম ক্লোরাইডের উচ্চ ঘনত্ব", isCorrect: false },
      { id: "opt_bio_9_82_c", text: "ক্যালসিয়াম কার্বনেট কেলাস", isCorrect: false },
      { id: "opt_bio_9_82_d", text: "কেবল বিশুদ্ধ পানি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: হায়ালুরোনিক এসিড ও বিশেষ মিউসিন প্রোটিন।",
      coreConcept: "সাইনোভিয়াল রসে হায়ালুরোনিক এসিড ও বিশেষ গ্লাইকোপ্রোটিন থাকায় এটি ডিমের সাদা অংশের মতো সান্দ্র ও পিচ্ছিল লুব্রিকেন্ট হিসেবে কাজ করে।",
      distractorAnalysis: {
        opt_bio_9_82_b: "লবণাক্ত দ্রবণ সান্দ্রতা দিতে পারে না।",
        opt_bio_9_82_c: "ক্যালসিয়াম কার্বনেট থাকলে রস খসখসে হয়ে অস্থি কেটে যেত।",
        opt_bio_9_82_d: "বিশুদ্ধ পানির লুব্রিকেশন ক্ষমতা অত্যন্ত সীমিত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 195
      },
      proTipShortcut: "সাইনোভিয়াল ফ্লুইডের পিচ্ছিলতা = হায়ালুরোনিক এসিড ও মিউসিন।"
    },
    difficulty: "HARD",
    boardSource: "রাজশাহী বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_83",
    topicId: "top_ssc_biology_ch9_4",
    type: "MCQ",
    stem: "কঙ্কালপেশির ক্ষুদ্রতম সংকোচনশীল কার্যকরী একক যা আণুবীক্ষণিকভাবে সুস্পষ্ট ডোরাকাটা দেখায়, তাকে কী বলে?",
    options: [
      { id: "opt_bio_9_83_a", text: "সারকোমিয়ার (Sarcomere)", isCorrect: true },
      { id: "opt_bio_9_83_b", text: "ল্যাকিউনি", isCorrect: false },
      { id: "opt_bio_9_83_c", text: "পেরিকন্ড্রিয়াম", isCorrect: false },
      { id: "opt_bio_9_83_d", text: "নিউরন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সারকোমিয়ার (Sarcomere)।",
      coreConcept: "মায়োফাইব্রিলের দুটি Z-রেখার মধ্যবর্তী কার্যকরী সংকোচনশীল একক হলো সারকোমিয়ার, যেখানে অ্যাকটিন ও মায়োসিন ফিলামেন্টের স্লাইডিং ঘটে।",
      distractorAnalysis: {
        opt_bio_9_83_b: "ল্যাকিউনি তরুণাস্থির গহ্বর।",
        opt_bio_9_83_c: "পেরিকন্ড্রিয়াম তরুণাস্থির আবরণী।",
        opt_bio_9_83_d: "নিউরন স্নায়ুতন্ত্রের একক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২",
        pageNumber: 196
      },
      proTipShortcut: "পেশির কার্যকরী সংকোচন একক = সারকোমিয়ার।"
    },
    difficulty: "HARD",
    boardSource: "কুমিল্লা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_84",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "অস্টিওপোরোসিস এবং রিউমাটয়েড আর্থ্রাইটিসের মধ্যে একটি সুনির্দিষ্ট মৌলিক পার্থক্য কোনটি?",
    options: [
      { id: "opt_bio_9_84_a", text: "অস্টিওপোরোসিস অস্থির ক্ষয়জনিত রোগ, আর আর্থ্রাইটিস অস্থিসন্ধির প্রদাহজনিত রোগ", isCorrect: true },
      { id: "opt_bio_9_84_b", text: "উভয় রোগই কেবল শিশুদের আক্রমণ করে", isCorrect: false },
      { id: "opt_bio_9_84_c", text: "অস্টিওপোরোসিসে গিঁট ফুলে যায় এবং আর্থ্রাইটিসে হাড় ফাঁপা হয়", isCorrect: false },
      { id: "opt_bio_9_84_d", text: "উভয় রোগই ভিটামিন সি এর অভাবে সৃষ্টি হয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অস্টিওপোরোসিস অস্থির ক্ষয়জনিত রোগ, আর আর্থ্রাইটিস অস্থিসন্ধির প্রদাহজনিত রোগ।",
      coreConcept: "অস্টিওপোরোসিসে ক্যালসিয়াম কমে সম্পূর্ণ অস্থির ম্যাট্রিক্স ক্ষয়প্রাপ্ত হয়; আর রিউমাটয়েড আর্থ্রাইটিসে প্রধানত অস্থিসন্ধির সাইনোভিয়াল ঝিল্লি ও তরুণাস্থিতে প্রদাহ হয়।",
      distractorAnalysis: {
        opt_bio_9_84_b: "উভয় রোগই প্রধানত বয়স্কদের রোগ।",
        opt_bio_9_84_c: "আর্থ্রাইটিসে গিঁট ফুলে এবং অস্টিওপোরোসিসে হাড় ফাঁপা হয়।",
        opt_bio_9_84_d: "অস্টিওপোরোসিস ক্যালসিয়াম ও ভিটামিন ডি এর অভাবে হয়, ভিটামিন সি এর নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 199
      },
      proTipShortcut: "অস্টিওপোরোসিস = হাড়ের রোগ; আর্থ্রাইটিস = সন্ধির রোগ।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // CREATIVE QUESTIONS (CQ_CREATIVE 13 to 18)
  // ==========================================
  {
    id: "q_bio_9_85",
    topicId: "top_ssc_biology_ch9_3",
    type: "CQ_CREATIVE",
    stem: "পাঠ্যবইয়ের সৃজনশীল প্রশ্ন ১ (পৃষ্ঠা ২০২): ১২ বছরের নীতা অত্যন্ত চঞ্চল প্রকৃতির। সে দিনের অনেকটা সময় দৌড়ঝাঁপ ও খেলাধুলা করে কাটায়। একদিন সে দৌড়াতে গিয়ে পায়ের গোড়ালিতে প্রচণ্ড ব্যথা পায়। ডাক্তারের কাছে গেলে তিনি বলেন, নীতার পায়ের দুটি হাড়ের সংযোগকারী পর্দা ও বন্ধনী ক্ষতিগ্রস্ত হয়েছে।",
    options: null,
    explanation: {
      directAnswer: "অস্থিসন্ধির আঘাত, কবজা সন্ধির ক্রিয়া এবং চলনে স্নায়ু-পেশি-কঙ্কাল সমন্বয়।",
      coreConcept: "গোড়ালির লিগামেন্ট ক্ষতিগ্রস্ত হওয়ায় অস্থি পিছলে ব্যথা সৃষ্টি হয়েছে; চলনে কঙ্কাল ও পেশির পারস্পরিক টান আবশ্যক।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · সৃজনশীল প্রশ্ন ১",
        pageNumber: 202
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "অস্থি কাকে বলে তা পাঠ্যবই অনুসারে সঠিকভাবে সংজ্ঞায়িত করা।" },
      kha: { mark: 2, criteria: "মেরুদণ্ডে বিদ্যমান অস্থিসন্ধির প্রকৃতি (ঈষৎ সচলতা ও তরুণাস্থির ভূমিকা) ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "নীতার আঘাতপ্রাপ্ত গোড়ালির সন্ধিকে দরজার কবজার সাথে তুলনা করা হয় কেন—তা একমুখী চলনের আলোকে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "নীতার উল্লিখিত দৌড়ঝাঁপ কাজের জন্য স্নায়ুতন্ত্র, পেশিতন্ত্র ও কঙ্কালতন্ত্রের সমন্বয় বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "NCTB পাঠ্যবই সৃজনশীল প্রশ্ন ১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_86",
    topicId: "top_ssc_biology_ch9_2",
    type: "CQ_CREATIVE",
    stem: "একটি বৈজ্ঞানিক জার্নালে প্রকাশিত প্রতিবেদনে দেখা গেল, মহাকাশচারীরা দীর্ঘদিন ওজনহীন অবস্থায় মহাকাশ স্টেশনে থাকলে তাদের অস্থির ঘনত্ব দ্রুত হ্রাস পায়, অথচ তরুণাস্থির ওপর এর প্রভাব তুলনামূলক কম। পৃথিবীতে ফিরে আসার পর তাদের বিশেষ ব্যায়াম ও খাদ্যাভ্যাস অনুসরণ করতে হয়।",
    options: null,
    explanation: {
      directAnswer: "যান্ত্রিক চাপ, ক্যালসিয়াম খনিজায়ন এবং অস্থি বনাম তরুণাস্থির শারীরবৃত্ত।",
      coreConcept: "ভারবহন ও যান্ত্রিক চাপ অস্থির ঘনত্ব রক্ষায় উদ্দীপনা যোগায়; তরুণাস্থি কনড্রিন সমৃদ্ধ হওয়ায় এতে প্রভাব ভিন্ন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "তরুণাস্থির কোষ ধারণকারী ল্যাকিউনির সংজ্ঞা লেখা।" },
      kha: { mark: 2, criteria: "অস্থি কীভাবে দেহে খনিজ লবণের সমতা বজায় রাখে তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "মহাকাশচারীদের ক্ষেত্রে অস্থির ঘনত্ব কমার কারণ পাঠ্যবইয়ের অস্থি পুনর্গঠন তত্ত্বের আলোকে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "অস্থি ও তরুণাস্থির অভ্যন্তরীণ গঠন বৈশিষ্ট্যের বৈসাদৃশ্যই তাদের যান্ত্রিক স্থায়িত্বে তারতম্য আনে—বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "উচ্চতর দক্ষতাভিত্তিক মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_87",
    topicId: "top_ssc_biology_ch9_3",
    type: "CQ_CREATIVE",
    stem: "পুতুল তৈরির কারখানায় দেখা গেল, কিছু পুতুলের হাত-পা সব দিকে ঘোরানো যায় এবং কিছু পুতুলের হাত কেবল একদিকে খোলা ও বন্ধ করা যায়। সপ্তম শ্রেণির আরিয়ান তার বাবাকে জিজ্ঞাসা করল, মানুষের দেহেও কি ঠিক এমন বিভিন্ন ধরনের মেকানিজম রয়েছে?",
    options: null,
    explanation: {
      directAnswer: "বল ও কোটরসন্ধি এবং কবজা সন্ধির গঠন ও কর্মপদ্ধতি।",
      coreConcept: "বলের মতো মাথা ও পেয়ালাসদৃশ কোটর বনাম কবজার একমুখী ঘূর্ণন অক্ষ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 195
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "একটি পূর্ণ সচল অস্থিসন্ধির নাম লেখা।" },
      kha: { mark: 2, criteria: "সাইনোভিয়াল অস্থিসন্ধিকে কেন অত্যন্ত কম শক্তিতে নড়াচড়া করানো যায় তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের পুতুলের দুই ধরনের মেকানিজমের সাথে মিল রেখে মানুষের কাঁধ ও কনুই সন্ধির গঠন ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "মানবদেহে যদি সকল সন্ধি কেবল কবজা সন্ধির মতো হতো, তবে স্বাভাবিক দৈনন্দিন কাজকর্মে কী রূপ প্রতিবন্ধকতা সৃষ্টি হতো—মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_88",
    topicId: "top_ssc_biology_ch9_4",
    type: "CQ_CREATIVE",
    stem: "একটি স্বাস্থ্য ম্যাগাজিনে লেখা হলো: “আমাদের হাত নাড়াচাড়া করার ক্ষেত্রে পেশি এবং বন্ধনীর কাজ অনেকটা ক্রেন বা কপিকলের দড়ির মতো। পেশি সংকুচিত হয়ে দড়িসদৃশ শক্তিশালী টেনডনকে টানে এবং টেনডন সরাসরি হাড়কে স্থানান্তরিত করে। কিন্তু হাড়গুলোকে সঠিক সীমার ভেতর বেঁধে রাখতে চারপাশে থাকে স্থিতিস্থাপক লিগামেন্ট।”",
    options: null,
    explanation: {
      directAnswer: "অস্থি-পেশি সংযোগে টেনডন ও লিগামেন্টের মেকানিক্যাল রোল।",
      coreConcept: "টেনডন বল সঞ্চালন করে এবং লিগামেন্ট সন্ধির স্থিতিশীলতা ও অক্ষীয় সীমাবদ্ধতা রক্ষা করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.২",
        pageNumber: 198
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "টেনডন কোন প্রোটিন তন্তু দ্বারা সমৃদ্ধ তা লেখা।" },
      kha: { mark: 2, criteria: "লিগামেন্ট কেন টেনডনের চেয়ে বেশি স্থিতিস্থাপক তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে বর্ণিত ক্রেন কাঠামোর সাথে মিল রেখে মানুষের বাহুর বাইসেপস ও টেনডনের কার্যপ্রণালী চিত্রসহ বর্ণনা করা।" },
      gha: { mark: 4, criteria: "“টেনডন যদি লিগামেন্টের মতো অতিরিক্ত স্থিতিস্থাপক হতো, তবে কার্যকর চলন সম্ভব হতো না”—উক্তিটির যথার্থতা মূল্যায়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "দিনাজপুর বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_89",
    topicId: "top_ssc_biology_ch9_5",
    type: "CQ_CREATIVE",
    stem: "৬৫ বছর বয়সী মি. রফিক দীর্ঘদিন যাবত হাঁপানির চিকিৎসার জন্য স্টেরয়েড ওষুধ সেবন করছেন। সম্প্রতি তাঁর মেরুদণ্ডে তীব্র ব্যথা শুরু হয়েছে এবং সামান্য কাশিতেই পাঁজরের একটি হাড়ে ফ্র্যাকচার ধরা পড়েছে। চিকিৎসক জানালেন, স্টেরয়েড ওষুধের পার্শ্বপ্রতিক্রিয়ায় তাঁর হাড় ফাঁপা ও ভঙ্গুর হয়ে পড়েছে।",
    options: null,
    explanation: {
      directAnswer: "ওষুধজনিত অস্টিওপোরোসিস (Drug-induced osteoporosis)।",
      coreConcept: "স্টেরয়েড ওষুধ অন্ত্রে ক্যালসিয়াম শোষণ কমায় এবং অস্থিকোষের ক্ষয় বৃদ্ধি করে অস্টিওপোরোসিস ঘটায়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 199
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "অস্টিওপোরোসিসের মূল কারণ কী তা লেখা।" },
      kha: { mark: 2, criteria: "অস্টিওপোরোসিসকে কেন নীরব ব্যাধি বলা হয় তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "মি. রফিকের রোগটি ডেক্সা স্ক্যানের মাধ্যমে কীভাবে নিশ্চিত হওয়া যায় তা বর্ণনা করা।" },
      gha: { mark: 4, criteria: "মি. রফিকের মতো বয়স্ক রোগীদের ফ্র্যাকচার প্রতিরোধে খাদ্যাভ্যাস ও জীবনযাত্রার পরিবর্তন সংক্রান্ত ব্যবস্থাপনার সুপারিশ প্রণয়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "বরিশাল বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_90",
    topicId: "top_ssc_biology_ch9_5",
    type: "CQ_CREATIVE",
    stem: "৮ বছর বয়সী আরিয়ান কিছুদিন আগে তীব্র গলাব্যথা ও জ্বরে ভুগেছিল। কয়েক সপ্তাহ পর হঠাৎ তার কনুই, হাঁটু ও গোড়ালির গিঁটে তীব্র ব্যথা ও ফোলা শুরু হয়। পরিবারের সদস্যরা ভেবেছিলেন সাধারণ আঘাত, কিন্তু শিশু বিশেষজ্ঞ পরীক্ষা করে বললেন, এটি রিউমেটিক ফিভার বা বাতজ্বর।",
    options: null,
    explanation: {
      directAnswer: "শিশুদের বাতজ্বর বা রিউমেটিক ফিভার (Rheumatic Fever)।",
      coreConcept: "স্ট্রেপ্টোকক্কাস সংক্রমণের ফলে সৃষ্ট অ্যান্টিবডি অস্থিসন্ধি ও হৃৎপিণ্ডের কপাটিকায় আক্রমণ করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 200
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "বাতজ্বর কোন জীবাণুর সংক্রমণের জটিলতা হিসেবে দেখা দেয় তা লেখা।" },
      kha: { mark: 2, criteria: "বয়স্কদের রিউমাটয়েড আর্থ্রাইটিস ও শিশুদের বাতজ্বরের প্রধান পার্থক্য ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "আরিয়ানের রোগটি কেন সৃষ্টি হলো তার শারীরবৃত্তীয় কার্যকারণ উদ্দীপকের তথ্যের আলোকে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "“শিশুদের যে কোনো গলাব্যথাকে অবহেলা না করাই বাতজ্বর ও হৃদরোগ প্রতিরোধের মূল চাবিকাঠি”—উক্তিটি বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "ময়মনসিংহ বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
