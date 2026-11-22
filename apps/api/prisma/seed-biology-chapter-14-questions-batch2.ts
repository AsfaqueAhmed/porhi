import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter14QuestionsBatch2: QuestionData[] = [
  // =========================================================================
  // Topic 14.1: জীবপ্রযুক্তির ধারণা ও ইতিহাস (top_ssc_biology_ch14_1)
  // =========================================================================
  {
    id: "q_bio_14_31",
    topicId: "top_ssc_biology_ch14_1",
    type: "MCQ",
    stem: "গ্রেগর জোহান মেন্ডেল কত সালে মটরশুঁটি উদ্ভিদে সংকরায়ণের মাধ্যমে বংশগতির মৌলিক সূত্র আবিষ্কার করেন?",
    options: [
      { id: "opt_bio_14_31_a", text: "১৮৬৩ সালে", isCorrect: true },
      { id: "opt_bio_14_31_b", text: "১৯১৯ সালে", isCorrect: false },
      { id: "opt_bio_14_31_c", text: "১৯৫৩ সালে", isCorrect: false },
      { id: "opt_bio_14_31_d", text: "১৯৬৯ সালে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ১৮৬৩ সালে।",
      coreConcept: "১৮৬৩ সালে গ্রেগর জোহান মেন্ডেল বংশগতির মৌলিক সূত্রগুলো আবিষ্কারের পর থেকে জীবপ্রযুক্তি নতুনরূপে যাত্রা শুরু করে।",
      distractorAnalysis: {
        opt_bio_14_31_b: "১৯১৯ সালে কার্ল এরেকি বায়োটেকনোলজি শব্দটি প্রবর্তন করেন।",
        opt_bio_14_31_c: "১৯৫৩ সালে ওয়াটসন ও ক্রিক DNA মডেল দেন।",
        opt_bio_14_31_d: "১৯৬৯ সালে লোয়ি ও সিকেভিজ কোষের আধুনিক সংজ্ঞা দেন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.১",
        pageNumber: 307
      },
      proTipShortcut: "মেন্ডেলের সূত্র আবিষ্কার = ১৮৬৩ সাল।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_32",
    topicId: "top_ssc_biology_ch14_1",
    type: "MCQ",
    stem: "বাংলাদেশের কোন যুগান্তকারী বৈজ্ঞানিক প্রকল্পে দেশি পাটের জীবন রহস্য (জিনোম সিকোয়েন্স) উন্মোচিত হয়েছে?",
    options: [
      { id: "opt_bio_14_32_a", text: "বাংলাদেশ জুট জিনোম প্রকল্প", isCorrect: true },
      { id: "opt_bio_14_32_b", text: "জাতীয় চা জিনোম প্রকল্প", isCorrect: false },
      { id: "opt_bio_14_32_c", text: "হিউম্যান জিনোম প্রকল্প", isCorrect: false },
      { id: "opt_bio_14_32_d", text: "সোনালি চাল প্রকল্প", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বাংলাদেশ জুট জিনোম প্রকল্প।",
      coreConcept: "বাংলাদেশ জুট জিনোম প্রকল্পের মাধ্যমে বিজ্ঞানী ড. মাকসুদুল আলম ও তার দল পাটের জীবন রহস্য উন্মোচন করে জীবপ্রযুক্তির আন্তর্জাতিক ইতিহাস রচনা করেন।",
      distractorAnalysis: {
        opt_bio_14_32_b: "চা জিনোম প্রকল্পে পাটের গবেষণা ছিল না।",
        opt_bio_14_32_c: "হিউম্যান জিনোম প্রকল্প মানুষের DNA সিকোয়েন্স সংক্রান্ত আন্তর্জাতিক প্রকল্প।",
        opt_bio_14_32_d: "সোনালি চাল প্রকল্প ভিটামিন-এ সমৃদ্ধ ধান তৈরির প্রকল্প।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · অধ্যায় সূচক",
        pageNumber: 305
      },
      proTipShortcut: "পাটের জীবন রহস্য উন্মোচন = বাংলাদেশ জুট জিনোম প্রকল্প।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_33",
    topicId: "top_ssc_biology_ch14_1",
    type: "MCQ",
    stem: "কার্ল এরেকি কোন দেশের কৃষি প্রকৌশলী ছিলেন?",
    options: [
      { id: "opt_bio_14_33_a", text: "জার্মানি", isCorrect: false },
      { id: "opt_bio_14_33_b", text: "হাঙ্গেরি", isCorrect: true },
      { id: "opt_bio_14_33_c", text: "ফ্রান্স", isCorrect: false },
      { id: "opt_bio_14_33_d", text: "ইংল্যান্ড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: হাঙ্গেরি।",
      coreConcept: "কার্ল এরেকি (Karl Ereky) ছিলেন একজন হাঙ্গেরীয় প্রকৌশলী যিনি ১৯১৯ সালে Biotechnology শব্দটি চালু করেন।",
      distractorAnalysis: {
        opt_bio_14_33_a: "জার্মানির বিজ্ঞানী ছিলেন শ্লাইডেন ও শোয়ান।",
        opt_bio_14_33_c: "ফ্রান্সের বিজ্ঞানী ছিলেন জর্জ মোরেল ও লুই পাস্তুর।",
        opt_bio_14_33_d: "ইংল্যান্ডের বিজ্ঞানী ছিলেন রবার্ট হুক ও ওয়াটসন-ক্রিক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.১",
        pageNumber: 307
      },
      proTipShortcut: "Karl Ereky = Hungarian Agricultural Engineer."
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_34",
    topicId: "top_ssc_biology_ch14_1",
    type: "MCQ",
    stem: "প্রাচীন গাঁজন (Fermentation) প্রক্রিয়ায় অণুজীব হিসেবে প্রধানত কোনটির ভূমিকা সবচেয়ে বেশি ছিল?",
    options: [
      { id: "opt_bio_14_34_a", text: "ইস্ট (Yeast)", isCorrect: true },
      { id: "opt_bio_14_34_b", text: "ভাইরাস", isCorrect: false },
      { id: "opt_bio_14_34_c", text: "প্রোটোজোয়া", isCorrect: false },
      { id: "opt_bio_14_34_d", text: "লাইকেন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ইস্ট (Yeast)।",
      coreConcept: "ইস্টের অবাত শ্বসনের ফলে শর্করা ভেঙে অ্যালকোহল ও কার্বন ডাই-অক্সাইড তৈরি হয়, যা প্রাচীনকাল থেকে মদ, রুটি ও বিয়ার তৈরিতে ব্যবহৃত হচ্ছে।",
      distractorAnalysis: {
        opt_bio_14_34_b: "ভাইরাস অকোষীয় পরজীবী, এরা কোনো খাদ্য গাঁজন করতে পারে না।",
        opt_bio_14_34_c: "প্রোটোজোয়া একমুখী এককোষী প্রাণী, গাঁজনে অংশ নেয় না।",
        opt_bio_14_34_d: "লাইকেন শৈবাল ও ছত্রাকের মিথোজীবী রূপ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.১",
        pageNumber: 307
      },
      proTipShortcut: "গাঁজন = ইস্টের অবাত শ্বসন ক্রিয়া।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.2: টিস্যু কালচার প্রযুক্তি ও ধাপসমূহ (top_ssc_biology_ch14_2)
  // =========================================================================
  {
    id: "q_bio_14_35",
    topicId: "top_ssc_biology_ch14_2",
    type: "MCQ",
    stem: "টিস্যু কালচারের পুষ্টি মাধ্যমকে প্রায়-কঠিন (Semi-solid) রূপ দিতে নিচের কোন উপাদানটি মিশিয়ে জমাট বাঁধানো হয়?",
    options: [
      { id: "opt_bio_14_35_a", text: "অ্যাগার (Agar)", isCorrect: true },
      { id: "opt_bio_14_35_b", text: "গ্লুকোজ", isCorrect: false },
      { id: "opt_bio_14_35_c", text: "সেলুলোজ", isCorrect: false },
      { id: "opt_bio_14_35_d", text: "ক্যালসিয়াম কার্বোনেট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ্যাগার (Agar)।",
      coreConcept: "সামুদ্রিক লোহিত শৈবাল থেকে প্রাপ্ত অ্যাগার সঠিক মাত্রায় মিশিয়ে পুষ্টি মাধ্যমকে সেমি-সলিড জেলিতে রূপান্তর করা হয় যাতে এক্সপ্ল্যান্ট স্থিরভাবে দাঁড়িয়ে পুষ্টি নিতে পারে।",
      distractorAnalysis: {
        opt_bio_14_35_b: "গ্লুকোজ বা সুক্রোজ শক্তির উৎস হিসেবে থাকে, জমাট বাঁধানোর জন্য নয়।",
        opt_bio_14_35_c: "সেলুলোজ উদ্ভিদ কোষপ্রাচীর গঠন করে।",
        opt_bio_14_35_d: "ক্যালসিয়াম কার্বোনেট চুনজাতীয় অজৈব পদার্থ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.১",
        pageNumber: 308
      },
      proTipShortcut: "জমাট বাঁধার উপাদান = অ্যাগার (Agar)।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_36",
    topicId: "top_ssc_biology_ch14_2",
    type: "MCQ",
    stem: "টিস্যু কালচারের নিয়ন্ত্রিত কক্ষে উদ্ভিদের স্বাভাবিক বৃদ্ধির জন্য কাম্য তাপমাত্রা সাধারণত কত রাখা হয়?",
    options: [
      { id: "opt_bio_14_36_a", text: "১৫ ± ১° সেলসিয়াস", isCorrect: false },
      { id: "opt_bio_14_36_b", text: "২৫ ± ২° সেলসিয়াস", isCorrect: true },
      { id: "opt_bio_14_36_c", text: "৩৭ ± ১° সেলসিয়াস", isCorrect: false },
      { id: "opt_bio_14_36_d", text: "৫০ ± ২° সেলসিয়াস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ২৫ ± ২° সেলসিয়াস।",
      coreConcept: "টিস্যু কালচারের বৃদ্ধি কক্ষে আলো ও ২৫±২° সেলসিয়াস তাপমাত্রা বজায় রাখা হয় যা উদ্ভিদ কোষের বিভাজনের জন্য সর্বোত্তম।",
      distractorAnalysis: {
        opt_bio_14_36_a: "১৫° সে. অতিরিক্ত শীতল, উদ্ভিদের বৃদ্ধি শ্লথ হয়ে যায়।",
        opt_bio_14_36_c: "৩৭° সে. মানবদেহের তাপমাত্রা ও ব্যাকটেরিয়ার বৃদ্ধির জন্য কাম্য, উদ্ভিদের জন্য ক্ষতিকর।",
        opt_bio_14_36_d: "৫০° সে. তাপমাত্রায় উদ্ভিদ কোষ প্রোটিন জমাট বেঁধে মারা যায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.১",
        pageNumber: 308
      },
      proTipShortcut: "টিস্যু কালচার বৃদ্ধি কক্ষের কাম্য তাপমাত্রা = ২৫ ± ২°C।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_37",
    topicId: "top_ssc_biology_ch14_2",
    type: "MCQ",
    stem: "টিস্যু কালচার প্রক্রিয়ায় ল্যাবরেটরির কাচের পাত্র থেকে চারাকে সরাসরি মাঠে না লাগিয়ে প্রথমে ছোট টবে রেখে অভ্যস্ত করানোর পর্যায়কে কী বলে?",
    options: [
      { id: "opt_bio_14_37_a", text: "ইনোকুলেশন", isCorrect: false },
      { id: "opt_bio_14_37_b", text: "অ্যাক্লাইমেটাইজেশন (Acclimatization)", isCorrect: true },
      { id: "opt_bio_14_37_c", text: "অটোক্লেভিং", isCorrect: false },
      { id: "opt_bio_14_37_d", text: "ট্রান্সফরমেশন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অ্যাক্লাইমেটাইজেশন (Acclimatization)।",
      coreConcept: "নিয়ন্ত্রিত ল্যাবের কোমল চারাকে প্রাকৃতিক আলো ও মাটির পরিবেশের সাথে খাপ খাইয়ে সহনশীল করার প্রক্রিয়াকে অ্যাক্লাইমেটাইজেশন বা হার্ডেনিং বলে।",
      distractorAnalysis: {
        opt_bio_14_37_a: "ইনোকুলেশন হলো মিডিয়ামে টিস্যু বা এক্সপ্ল্যান্ট স্থাপন।",
        opt_bio_14_37_c: "অটোক্লেভিং হলো উচ্চতাপে জীবাণুমুক্তকরণ।",
        opt_bio_14_37_d: "ট্রান্সফরমেশন হলো জিন প্রবেশ করানো।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.১",
        pageNumber: 309
      },
      proTipShortcut: "প্রাকৃতিক পরিবেশে খাপ খাওয়ানো = Acclimatization।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_38",
    topicId: "top_ssc_biology_ch14_2",
    type: "MCQ",
    stem: "টিস্যু কালচার মিডিয়ামে উদ্ভিদের মূল গজানোর জন্য প্রধানত কোন হরমোনের অনুপাত বৃদ্ধি করা হয়?",
    options: [
      { id: "opt_bio_14_38_a", text: "অক্সিন (Auxin)", isCorrect: true },
      { id: "opt_bio_14_38_b", text: "ইথিলিন", isCorrect: false },
      { id: "opt_bio_14_38_c", text: "অ্যাবসিসিক এসিড", isCorrect: false },
      { id: "opt_bio_14_38_d", text: "ফ্লোরিজেন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অক্সিন (Auxin)।",
      coreConcept: "অক্সিন হরমোন উদ্ভিদের মূলের সৃষ্টি ও বৃদ্ধিতে প্রধান উদ্দীপক হিসেবে কাজ করে, তাই মূল উৎপাদক মিডিয়ামে অক্সিনের সঠিক মাত্রা নিশ্চিত করা হয়।",
      distractorAnalysis: {
        opt_bio_14_38_b: "ইথিলিন ফল পাকানোর গ্যাসীয় হরমোন।",
        opt_bio_14_38_c: "অ্যাবসিসিক এসিড বৃদ্ধি রোধক স্ট্রেস হরমোন।",
        opt_bio_14_38_d: "ফ্লোরিজেন ফুল ফোটাতে সাহায্য করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.১",
        pageNumber: 308
      },
      proTipShortcut: "মূল উৎপাদন = অক্সিন হরমোন।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.3: কৃষি ও অর্থনীতিতে টিস্যু কালচারের গুরুত্ব (top_ssc_biology_ch14_3)
  // =========================================================================
  {
    id: "q_bio_14_39",
    topicId: "top_ssc_biology_ch14_3",
    type: "MCQ",
    stem: "থাইল্যান্ড প্রতি বছর টিস্যু কালচারের মাধ্যমে প্রায় কত মিলিয়ন অর্কিডের অণুচারা উৎপাদন ও রপ্তানি করে?",
    options: [
      { id: "opt_bio_14_39_a", text: "১০ মিলিয়ন", isCorrect: false },
      { id: "opt_bio_14_39_b", text: "২৫ মিলিয়ন", isCorrect: false },
      { id: "opt_bio_14_39_c", text: "৫০ মিলিয়ন", isCorrect: true },
      { id: "opt_bio_14_39_d", text: "৮৮ মিলিয়ন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৫০ মিলিয়ন।",
      coreConcept: "থাইল্যান্ড টিস্যু কালচার পদ্ধতির মাধ্যমে এক বছরে প্রায় ৫০ মিলিয়ন (৫ কোটি) অণুচারা উৎপন্ন করে যার অধিকাংশই অর্কিড।",
      distractorAnalysis: {
        opt_bio_14_39_a: "১০ মিলিয়ন ভুল সংখ্যা।",
        opt_bio_14_39_b: "২৫ মিলিয়ন ভুল তথ্য।",
        opt_bio_14_39_d: "৮৮ কোটি হলো চন্দ্রমল্লিকার চারার সম্ভাব্য সংখ্যা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 310
      },
      proTipShortcut: "থাইল্যান্ডের বার্ষিক অর্কিড চারা = ৫০ মিলিয়ন।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Creative Question 3 (Topic 14.2 / 14.3)
  {
    id: "q_bio_14_40",
    topicId: "top_ssc_biology_ch14_3",
    type: "CQ_CREATIVE",
    stem: "একটি কৃষি ফার্মে দেখা গেল আলু চাষে প্রতি বছর লেট ব্লাইট ছত্রাক ও মোজাইক ভাইরাসের আক্রমণে চাষিরা সর্বস্বান্ত হচ্ছেন। ফার্মের কৃষিবিদ টিস্যু কালচার ল্যাবে আলুর শীর্ষ মেরিস্টেম সংগ্রহ করে কৃত্রিম পুষ্টি মিডিয়ামে আবাদ করলেন এবং শত শত রোগমুক্ত ক্ষুদ্রাকার মাইক্রোটিউবার উৎপাদন করলেন। এই মাইক্রোটিউবার সরাসরি বীজ হিসেবে জমিতে রোপণ করে কৃষকরা স্বাভাবিকের চেয়ে তিন গুণ বেশি রোগমুক্ত আলুর বাম্পার ফলন পেলেন।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে আলুর মেরিস্টেম কালচার ও মাইক্রোটিউবার উৎপাদনের সফল প্রায়োগিক দিক প্রতিফলিত হয়েছে।",
      coreConcept: "শীর্ষ মেরিস্টেমে ভাইরাস সংক্রমণ না থাকায় তা থেকে মাইক্রোটিউবার উৎপাদন করে শতভাগ রোগমুক্ত উন্নত আলুবীজ প্রস্তুত করা যায়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 310
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: মাইক্রোটিউবার (Microtuber) কী তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: উদ্ভিদের রোগাক্রান্ত অংশ থাকা সত্ত্বেও মেরিস্টেম কেন রোগমুক্ত থাকে তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: উদ্দীপকে উল্লেখিত কৃষিবিদের মাইক্রোটিউবার তৈরির ল্যাবরেটরি ধাপগুলো ধারাবাহিকভাবে বর্ণনা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: বাংলাদেশের আলু উৎপাদন ও কৃষকদের অর্থনৈতিক সচ্ছলতা আনয়নে সনাতন আলুবীজের তুলনায় মাইক্রোটিউবারের শ্রেষ্ঠত্ব বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড স্ট্যান্ডার্ড ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Continuing Topic 14.3 MCQs
  {
    id: "q_bio_14_41",
    topicId: "top_ssc_biology_ch14_3",
    type: "MCQ",
    stem: "টিস্যু কালচারের মাধ্যমে চন্দ্রমল্লিকার একটিমাত্র অঙ্গজ টুকরা থেকে বছরে প্রায় কতটি চারা উৎপাদন সম্ভব?",
    options: [
      { id: "opt_bio_14_41_a", text: "৪০ হাজার", isCorrect: false },
      { id: "opt_bio_14_41_b", text: "৫০ মিলিয়ন", isCorrect: false },
      { id: "opt_bio_14_41_c", text: "৮৮ কোটি", isCorrect: true },
      { id: "opt_bio_14_41_d", text: "১০০ কোটি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৮৮ কোটি।",
      coreConcept: "চন্দ্রমল্লিকার মতো সৌন্দর্যবর্ধক উদ্ভিদের একটি ক্ষুদ্র উদ্ভিদাংশ থেকে মাইক্রোপ্রোপাগেশন পদ্ধতিতে বছরে ৮৮ কোটি চারা সৃষ্টি করা যায়।",
      distractorAnalysis: {
        opt_bio_14_41_a: "৪০ হাজার হলো সিম্বিডিয়াম অর্কিডের চারা সংখ্যা।",
        opt_bio_14_41_b: "৫০ মিলিয়ন হলো থাইল্যান্ডের বার্ষিক অর্কিড চারা রপ্তানি।",
        opt_bio_14_41_d: "১০০ কোটি ভুল সংখ্যা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 310
      },
      proTipShortcut: "চন্দ্রমল্লিকার অঙ্গজ টুকরা = ৮৮ কোটি চারা।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_42",
    topicId: "top_ssc_biology_ch14_3",
    type: "MCQ",
    stem: "কোন দেশে তেল পাম (Oil Palm)-এর ব্যাপক চারা উৎপাদন ও বংশবৃদ্ধি টিস্যু কালচার পদ্ধতিতে সম্পন্ন করা হয়?",
    options: [
      { id: "opt_bio_14_42_a", text: "মালয়েশিয়া", isCorrect: true },
      { id: "opt_bio_14_42_b", text: "নেপাল", isCorrect: false },
      { id: "opt_bio_14_42_c", text: "ভুটান", isCorrect: false },
      { id: "opt_bio_14_42_d", text: "মালদ্বীপ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: মালয়েশিয়া।",
      coreConcept: "মালয়েশিয়ায় উচ্চ ফলনশীল তেল পাম (Oil Palm)-এর চারা উৎপাদন টিস্যু কালচার পদ্ধতিতে সম্পন্ন করে বৈশ্বিক পাম অয়েল বাজারে শ্রেষ্ঠত্ব অর্জন করেছে।",
      distractorAnalysis: {
        opt_bio_14_42_b: "নেপালে পাম চাষ উপযোগী নয়।",
        opt_bio_14_42_c: "ভুটানে পাম শিল্প নেই।",
        opt_bio_14_42_d: "মালদ্বীপ একটি ক্ষুদ্র দ্বীপরাষ্ট্র, কৃষিভূমি সীমিত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 310
      },
      proTipShortcut: "Oil Palm টিস্যু কালচার = মালয়েশিয়া।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.4: জিন প্রকৌশল ও GMO (top_ssc_biology_ch14_4)
  // =========================================================================
  {
    id: "q_bio_14_43",
    topicId: "top_ssc_biology_ch14_4",
    type: "MCQ",
    stem: "রিকম্বিন্যান্ট DNA অণুকে পোষক অণুজীব কোষে প্রবেশ করিয়ে তার অসংখ্য হুবহু প্রতিলিপি তৈরির বৈজ্ঞানিক প্রক্রিয়াকে কী বলে?",
    options: [
      { id: "opt_bio_14_43_a", text: "জিন ক্লোনিং (Gene cloning)", isCorrect: true },
      { id: "opt_bio_14_43_b", text: "মেরিস্টেম কালচার", isCorrect: false },
      { id: "opt_bio_14_43_c", text: "সাইটোকাইনেসিস", isCorrect: false },
      { id: "opt_bio_14_43_d", text: "প্লাজমোলাইসিস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: জিন ক্লোনিং (Gene cloning)।",
      coreConcept: "রিকম্বিন্যান্ট DNA অণু যখন পোষক কোষে বারবার প্রতিলিপিত হয়ে কোটি কোটি জিন কপি তৈরি করে তখন তাকে জিন ক্লোনিং বলে।",
      distractorAnalysis: {
        opt_bio_14_43_b: "মেরিস্টেম কালচার হলো শীর্ষমুকুল থেকে চারা উৎপাদন।",
        opt_bio_14_43_c: "সাইটোকাইনেসিস হলো সাইটোপ্লাজমের বিভাজন।",
        opt_bio_14_43_d: "প্লাজমোলাইসিস হলো কোষের পানিশূন্যতা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩",
        pageNumber: 311
      },
      proTipShortcut: "কাঙ্ক্ষিত জিনের অসংখ্য প্রতিলিপি = জিন ক্লোনিং।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_44",
    topicId: "top_ssc_biology_ch14_4",
    type: "MCQ",
    stem: "প্রকৃতিতে লক্ষ-কোটি বছর ধরে জিনের প্রাকৃতিক পরিবর্তন ও কৃত্রিম নির্বাচনের মাধ্যমে নতুন বৈশিষ্ট্য সৃষ্টি হওয়ার দীর্ঘমেয়াদি প্রক্রিয়াটিকে কী বলে?",
    options: [
      { id: "opt_bio_14_44_a", text: "জৈব অভিব্যক্তি (Organic Evolution)", isCorrect: true },
      { id: "opt_bio_14_44_b", text: "টিস্যু কালচার", isCorrect: false },
      { id: "opt_bio_14_44_c", text: "অটোক্লেভিং", isCorrect: false },
      { id: "opt_bio_14_44_d", text: "প্লাজমিড রেপ্লিকেশন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: জৈব অভিব্যক্তি (Organic Evolution)।",
      coreConcept: "পাঠ্যবইয়ের ৩১২ পৃষ্ঠা অনুযায়ী প্রকৃতিতেও লক্ষ-কোটি বছর ধরে জিনের পরিবর্তনের অনুরূপ প্রক্রিয়া চলছে যার নাম জৈব অভিব্যক্তি।",
      distractorAnalysis: {
        opt_bio_14_44_b: "টিস্যু কালচার আধুনিক ল্যাবরেটরি প্রযুক্তি।",
        opt_bio_14_44_c: "অটোক্লেভিং তাপীয় নির্বীজন।",
        opt_bio_14_44_d: "প্লাজমিড রেপ্লিকেশন ব্যাকটেরিয়ার নিজস্ব প্রতিলিপন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩",
        pageNumber: 312
      },
      proTipShortcut: "প্রকৃতিতে লক্ষ-কোটি বছরের জিনগত পরিবর্তন = জৈব অভিব্যক্তি।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_45",
    topicId: "top_ssc_biology_ch14_4",
    type: "MCQ",
    stem: "জেনেটিক ইঞ্জিনিয়ারিংয়ের ক্ষেত্রে আন্তর্জাতিক জীবনিরাপত্তা (Biosafety) নীতিমালার প্রধান উদ্দেশ্য কোনটি?",
    options: [
      { id: "opt_bio_14_45_a", text: "জিএমও জীবের সম্ভাব্য বিষাক্ততা ও পরিবেশগত ক্ষতি প্রতিরোধ করা", isCorrect: true },
      { id: "opt_bio_14_45_b", text: "সকল সনাতন কৃষি সম্পূর্ণ বন্ধ করে দেওয়া", isCorrect: false },
      { id: "opt_bio_14_45_c", text: "ল্যাবে রেস্ট্রিকশন এনজাইমের ব্যবহার নিষিদ্ধ করা", isCorrect: false },
      { id: "opt_bio_14_45_d", text: "কেবল প্রাণীতে গবেষণার অনুমতি দেওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: জিএমও জীবের সম্ভাব্য বিষাক্ততা ও পরিবেশগত ক্ষতি প্রতিরোধ করা।",
      coreConcept: "জিএমও যেন মানব স্বাস্থ্যে বিষাক্ততা, অ্যালার্জি বা প্রাকৃতিক বাস্তুতন্ত্রে আগ্রাসী পরিবর্তন না ঘটায় তা তদারক করতেই বায়োসেফটি গাইডলাইন মানা হয়।",
      distractorAnalysis: {
        opt_bio_14_45_b: "সনাতন কৃষি বন্ধ করা জীবনিরাপত্তার লক্ষ্য নয়।",
        opt_bio_14_45_c: "রেস্ট্রিকশন এনজাইম বৈধ বৈজ্ঞানিক হাতিয়ার।",
        opt_bio_14_45_d: "উদ্ভিদ ও প্রাণী উভয়ের সুরক্ষাই এর আওতাভুক্ত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১",
        pageNumber: 313
      },
      proTipShortcut: "Biosafety = পরিবেশ ও মানবস্বাস্থ্যের ঝুঁকি নিরুপণ।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_46",
    topicId: "top_ssc_biology_ch14_4",
    type: "MCQ",
    stem: "জিনের যেকোনো পরিবর্তনের ফলে উৎপন্ন জীবকে সাধারণভাবে কী বলা হয়?",
    options: [
      { id: "opt_bio_14_46_a", text: "GMO (Genetically Modified Organism)", isCorrect: true },
      { id: "opt_bio_14_46_b", text: "কেবল ট্রান্সজেনিক জীব", isCorrect: false },
      { id: "opt_bio_14_46_c", text: "এক্সপ্ল্যান্ট", isCorrect: false },
      { id: "opt_bio_14_46_d", text: "ক্যালাস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: GMO (Genetically Modified Organism)।",
      coreConcept: "জিনের গঠনে মিউটেশন বা অন্য যেকোনো উপায়ে পরিবর্তন ঘটালেই জীবটিকে জেনারেলাইজডভাবে GMO বলা হয়।",
      distractorAnalysis: {
        opt_bio_14_46_b: "বাইরের প্রজাতি না থাকলে তা ট্রান্সজেনিক নয়, কেবল GMO।",
        opt_bio_14_46_c: "এক্সপ্ল্যান্ট টিস্যু কালচারের টিস্যুর টুকরা।",
        opt_bio_14_46_d: "ক্যালাস হলো টিস্যুর অবিভাজিত পিণ্ড।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩",
        pageNumber: 312
      },
      proTipShortcut: "যেকোনো জিনগত পরিবর্তন = GMO।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.5: রিকম্বিন্যান্ট DNA তৈরির ধারাবাহিক ধাপ (top_ssc_biology_ch14_5)
  // =========================================================================
  {
    id: "q_bio_14_47",
    topicId: "top_ssc_biology_ch14_5",
    type: "MCQ",
    stem: "রেস্ট্রিকশন এনজাইম দিয়ে DNA কাটার পর কাটা প্রান্তে যে উন্মুক্ত এক-সূত্রক শিকল সৃষ্টি হয় তাকে কী বলে?",
    options: [
      { id: "opt_bio_14_47_a", text: "স্টিকি এন্ড বা আঠালো প্রান্ত (Sticky ends)", isCorrect: true },
      { id: "opt_bio_14_47_b", text: "ব্লান্ট এন্ড", isCorrect: false },
      { id: "opt_bio_14_47_c", text: "প্লাজমিড প্রান্ত", isCorrect: false },
      { id: "opt_bio_14_47_d", text: "সেন্ট্রোমিয়ার", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: স্টিকি এন্ড বা আঠালো প্রান্ত (Sticky ends)।",
      coreConcept: "রেস্ট্রিকশন এনজাইম DNA-এর উভয় সূত্রে অসমভাবে কেটে অভারহ্যাংগিং আঠালো প্রান্ত তৈরি করে যা পরিপূরক ক্ষারকের সাথে সহজেই হাইড্রোজেন বন্ধন বাঁধতে পারে।",
      distractorAnalysis: {
        opt_bio_14_47_b: "ব্লান্ট এন্ডে কোনো এক-সূত্রক ক্ষারক ঝুলে থাকে না।",
        opt_bio_14_47_c: "প্লাজমিড প্রান্ত কোনো স্বীকৃত পরিভাষা নয়।",
        opt_bio_14_47_d: "সেন্ট্রোমিয়ার ক্রোমোজোমের বাহুর মিলনস্থল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১ (চিত্র ১৪.০২)",
        pageNumber: 314
      },
      proTipShortcut: "কাঁচির কর্তনে সৃষ্ট পরিপূরক প্রান্ত = স্টিকি এন্ড (Sticky ends)।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_48",
    topicId: "top_ssc_biology_ch14_5",
    type: "MCQ",
    stem: "জিন প্রকৌশলে সবচেয়ে বেশি ব্যবহৃত বাহক বা ভেক্টর (Vector) প্লাজমিডটি প্রধানত কোন ব্যাকটেরিয়া থেকে সংগ্রহ করা হয়?",
    options: [
      { id: "opt_bio_14_48_a", text: "Escherichia coli (E. coli)", isCorrect: true },
      { id: "opt_bio_14_48_b", text: "Bacillus thuringiensis", isCorrect: false },
      { id: "opt_bio_14_48_c", text: "Pseudomonas putida", isCorrect: false },
      { id: "opt_bio_14_48_d", text: "Salmonella typhi", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: Escherichia coli (E. coli)।",
      coreConcept: "মানুষের অন্ত্রে বাস করা E. coli ব্যাকটেরিয়ার প্লাজমিডের গঠন ও কার্যপদ্ধতি সবচেয়ে পরিষ্কার জানা থাকায় এটিই প্রধান ভেক্টর হিসেবে ব্যবহৃত হয়।",
      distractorAnalysis: {
        opt_bio_14_48_b: "Bacillus thuringiensis থেকে বিটি জিন নেওয়া হয়।",
        opt_bio_14_48_c: "Pseudomonas তেল দূষণ দূর করে।",
        opt_bio_14_48_d: "Salmonella টাইফয়েড সৃষ্টিকারী ক্ষতিকর জীবাণু।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১",
        pageNumber: 312
      },
      proTipShortcut: "প্লাজমিডের সার্বজনীন উৎস = E. coli।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_49",
    topicId: "top_ssc_biology_ch14_5",
    type: "MCQ",
    stem: "রিকম্বিন্যান্ট DNA তৈরির ধাপগুলোর সঠিক ক্রম কোনটি?",
    options: [
      { id: "opt_bio_14_49_a", text: "DNA পৃথকীকরণ → রেস্ট্রিকশন এনজাইমে কর্তন → লাইগেজে জোড়া লাগানো → ট্রান্সফরমেশন → ক্লোনিং", isCorrect: true },
      { id: "opt_bio_14_49_b", text: "লাইগেজে জোড়া লাগানো → রেস্ট্রিকশন এনজাইমে কর্তন → DNA পৃথকীকরণ → ক্লোনিং", isCorrect: false },
      { id: "opt_bio_14_49_c", text: "ট্রান্সফরমেশন → ক্লোনিং → DNA পৃথকীকরণ → লাইগেজে জোড়া লাগানো", isCorrect: false },
      { id: "opt_bio_14_49_d", text: "রেস্ট্রিকশন এনজাইমে কর্তন → ট্রান্সফরমেশন → DNA পৃথকীকরণ → লাইগেজ সংযোজন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: DNA পৃথকীকরণ → রেস্ট্রিকশন এনজাইমে কর্তন → লাইগেজে জোড়া লাগানো → ট্রান্সফরমেশন → ক্লোনিং।",
      coreConcept: "প্রথমে DNA ও প্লাজমিড বের করতে হবে, তারপর কাঁচি দিয়ে কাটতে হবে, আঠা দিয়ে জোড়া লাগিয়ে রিকম্বিন্যান্ট DNA তৈরি করে ট্রান্সফরমেশন ও ক্লোনিং করতে হয়।",
      distractorAnalysis: {
        opt_bio_14_49_b: "কাটার আগেই জোড়া লাগানো অসম্ভব।",
        opt_bio_14_49_c: "রিকম্বিন্যান্ট DNA তৈরির আগেই ট্রান্সফরমেশন সম্ভব নয়।",
        opt_bio_14_49_d: "DNA আলাদা না করে এনজাইমে কাটা যায় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১ (চিত্র ১৪.০২)",
        pageNumber: 313
      },
      proTipShortcut: "ক্রম: পৃথকীকরণ → কর্তন → জোড়ন → ট্রান্সফরমেশন → ক্লোনিং।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Creative Question 4 (Topic 14.5)
  {
    id: "q_bio_14_50",
    topicId: "top_ssc_biology_ch14_5",
    type: "CQ_CREATIVE",
    stem: "উচ্চতর গবেষণা ল্যাবরেটরিতে জেনেটিক ইঞ্জিনিয়াররা একটি বিশেষ ফসল তৈরির উদ্যোগ নিলেন।\nধাপ ১: কীটপ্রতিরোধী ব্যাকটেরিয়া থেকে ক্রিস্টাল প্রোটিন তৈরির 'Bt জিন' চিহ্নিত ও পৃথক করা হলো।\nধাপ ২: E. coli ব্যাকটেরিয়ার প্লাজমিড DNA এবং Bt জিন উভয়কেই বিশেষ 'X' উৎসেচক দ্বারা কর্তন করা হলো।\nধাপ ৩: 'Y' নামক এনজাইমের সহায়তায় কাটা প্রান্তে ফসফোডাইএস্টার বন্ধন তৈরি করে তৈরি হলো একটি রিকম্বিন্যান্ট প্লাজমিড।\nধাপ ৪: এই প্লাজমিডকে উদ্ভিদের কোষে প্রবেশ করিয়ে তৈরি করা হলো ক্ষতিকর পোকা প্রতিরোধী ট্রান্সজেনিক ফসল।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে এনজাইম X (রেস্ট্রিকশন এনজাইম) এবং এনজাইম Y (DNA লাইগেজ) দ্বারা রিকম্বিন্যান্ট প্লাজমিড তৈরির নিখুঁত কৌশল বিধৃত হয়েছে।",
      coreConcept: "আণবিক কাঁচি রেস্ট্রিকশন ও আণবিক আঠা লাইগেজের সুনির্দিষ্ট ক্রিয়ায় রিকম্বিন্যান্ট DNA প্রযুক্তি কার্যকর হয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১",
        pageNumber: 313
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: প্লাজমিডের স্ব-বিভাজন ক্ষমতা বলতে কী বোঝায় তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: রিকম্বিন্যান্ট DNA তৈরিতে প্লাজমিড ও দাতা DNA উভয়কেই একই রেস্ট্রিকশন এনজাইম দিয়ে কাটার বৈজ্ঞানিক প্রয়োজনীয়তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: উদ্দীপকের এনজাইম 'X' এবং এনজাইম 'Y'-এর ভূমিকা ও কার্যপদ্ধতির তুলনামূলক বিশ্লেষণ করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: কীটনাশকের ক্ষতিকর প্রভাব থেকে পরিবেশ ও জনস্বাস্থ্য রক্ষায় উদ্দীপকে উদ্ভাবিত বিটি ফসলের অর্থনৈতিক ও পরিবেশগত সুবিধা মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল বোর্ড স্ট্যান্ডার্ড ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.6: কৃষি, চিকিৎসা ও পরিবেশ সুরক্ষায় প্রয়োগ (top_ssc_biology_ch14_6)
  // =========================================================================
  {
    id: "q_bio_14_51",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "পেঁপের রিং স্পট ভাইরাস (PRSV) প্রতিরোধী পেঁপের জাত উদ্ভাবনে কোন বৈজ্ঞানিক কৌশলটি প্রয়োগ করা হয়েছে?",
    options: [
      { id: "opt_bio_14_51_a", text: "ভাইরাল কোট প্রোটিন (Coat protein) জিন স্থানান্তর", isCorrect: true },
      { id: "opt_bio_14_51_b", text: "অটোক্লেভে ১২১° সে. তাপ প্রয়োগ", isCorrect: false },
      { id: "opt_bio_14_51_c", text: "গরুর দুধে Protein C জিন সংযোজন", isCorrect: false },
      { id: "opt_bio_14_51_d", text: "স্যামন মাছের গ্রোথ হরমোন স্থানান্তর", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ভাইরাল কোট প্রোটিন (Coat protein) জিন স্থানান্তর।",
      coreConcept: "ভাইরাসের বহিরাবরণী বা কোট প্রোটিনের জিন পেঁপে গাছে রূপান্তরের মাধ্যমে গাছটিতে রিং স্পট ভাইরাসের বিরুদ্ধে প্রতিরোধ ক্ষমতা তৈরি করা হয়েছে।",
      distractorAnalysis: {
        opt_bio_14_51_b: "অটোক্লেভ হলো ল্যাব মিডিয়াম জীবাণুমুক্তকরণের যন্ত্র।",
        opt_bio_14_51_c: "Protein C গাভীর দুধে আমিষ বৃদ্ধির জিন।",
        opt_bio_14_51_d: "স্যামন মাছের হরমোন মাছের বৃদ্ধি বাড়ায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 316
      },
      proTipShortcut: "ভাইরাস প্রতিরোধী ফসল = ভাইরাল Coat Protein জিন।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_52",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "হেপাটাইটিস বি-ভাইরাসের প্রতিষেধক ও ওষুধ 'ইন্টারফেরন' (Interferon) কোন অণুজীবকে রূপান্তরের মাধ্যমে বাণিজ্যিকভাবে উৎপাদন করা হয়?",
    options: [
      { id: "opt_bio_14_52_a", text: "ইস্ট (ছত্রাক)", isCorrect: true },
      { id: "opt_bio_14_52_b", text: "অ্যামিবা", isCorrect: false },
      { id: "opt_bio_14_52_c", text: "প্যারামেসিয়াম", isCorrect: false },
      { id: "opt_bio_14_52_d", text: "স্পাইরোগাইরা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ইস্ট (ছত্রাক)।",
      coreConcept: "জেনেটিক পরিবর্তনের মাধ্যমে ইস্ট (Yeast) নামক এককোষী ছত্রাক থেকে হেপাটাইটিস বি-ভাইরাসের ওষুধ ইন্টারফেরন বাণিজ্যিকভাবে তৈরি হচ্ছে।",
      distractorAnalysis: {
        opt_bio_14_52_b: "অ্যামিবা এককোষী মুক্তজীবী আদ্যপ্রাণী।",
        opt_bio_14_52_c: "প্যারামেসিয়াম সিলিয়াযুক্ত প্রোটোজোয়া।",
        opt_bio_14_52_d: "স্পাইরোগাইরা সর্পিল ক্লোরোপ্লাস্টযুক্ত শৈবাল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 317
      },
      proTipShortcut: "ইন্টারফেরন উৎপাদনকারী অণুজীব = ইস্ট (Yeast)।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_53",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "অস্বাভাবিক খাটো হওয়া বা বামনত্ব (Dwarfism) রোগ নিরাময়ে রিকম্বিন্যান্ট DNA প্রযুক্তিতে কোন উপাদানটি উৎপাদন করা হয়?",
    options: [
      { id: "opt_bio_14_53_a", text: "ইনসুলিন", isCorrect: false },
      { id: "opt_bio_14_53_b", text: "মানব বৃদ্ধির হরমোন (Human Growth Hormone)", isCorrect: true },
      { id: "opt_bio_14_53_c", text: "পেপসিন এনজাইম", isCorrect: false },
      { id: "opt_bio_14_53_d", text: "অক্সিন হরমোন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মানব বৃদ্ধির হরমোন (Human Growth Hormone)।",
      coreConcept: "জেনেটিক্যালি পরিবর্তিত E. coli ও ইস্ট থেকে হিউম্যান গ্রোথ হরমোন তৈরি করে শিশুদের বামনত্ব ও স্বাভাবিক বৃদ্ধির সমস্যা নিরাময় করা হয়।",
      distractorAnalysis: {
        opt_bio_14_53_a: "ইনসুলিন রক্তের গ্লুকোজ কমিয়ে ডায়াবেটিস নিয়ন্ত্রণ করে।",
        opt_bio_14_53_c: "পেপসিন পাকস্থলীর আমিষ পরিপাককারী এনজাইম।",
        opt_bio_14_53_d: "অক্সিন উদ্ভিদের বৃদ্ধির হরমোন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 317
      },
      proTipShortcut: "বামনত্ব (Dwarfism) নিরাময় = হিউম্যান গ্রোথ হরমোন।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_54",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "ক্যান্সার, এইডস ও সংক্রামক জটিল রোগের চিকিৎসায় ব্যবহৃত 'কলোনি উদ্দীপক উপাদান' কোনটি?",
    options: [
      { id: "opt_bio_14_54_a", text: "গ্র্যানুলোসাইট ম্যাক্রোফাজ স্টিমুলেটিং ফ্যাক্টর (GM-CSF)", isCorrect: true },
      { id: "opt_bio_14_54_b", text: "অ্যাগার জেল", isCorrect: false },
      { id: "opt_bio_14_54_c", text: "সাইটোকাইনিন", isCorrect: false },
      { id: "opt_bio_14_54_d", text: "বিটা-ক্যারোটিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: গ্র্যানুলোসাইট ম্যাক্রোফাজ স্টিমুলেটিং ফ্যাক্টর (GM-CSF)।",
      coreConcept: "GM-CSF উপাদানটি শ্বেত রক্তকণিকার কলোনি তৈরি ও বৃদ্ধিকে উদ্দীপিত করে শরীরের রোগপ্রতিরোধ ক্ষমতা বহুগুণ বাড়িয়ে দেয়।",
      distractorAnalysis: {
        opt_bio_14_54_b: "অ্যাগার টিস্যু কালচার জমানোর উপাদান।",
        opt_bio_14_54_c: "সাইটোকাইনিন উদ্ভিদের কোষ বিভাজনের হরমোন।",
        opt_bio_14_54_d: "বিটা-ক্যারোটিন সোনালি চালের ভিটামিন-এ পূর্বসূরি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 317
      },
      proTipShortcut: "কলোনি উদ্দীপক উপাদান = GM-CSF।"
    },
    difficulty: "HARD",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Creative Question 5 (Topic 14.6)
  {
    id: "q_bio_14_55",
    topicId: "top_ssc_biology_ch14_6",
    type: "CQ_CREATIVE",
    stem: "বাংলাদেশে পুষ্টিহীনতা ও রাতকানা রোগে আক্রান্ত শিশুদের হার কমাতে বিজ্ঞানীরা ড্যাফোডিল ফুল ও মাটির ব্যাকটেরিয়ার দুটি জিন ধানের জাত 'BRRI ধান ২৯'-এ সন্নিবেশিত করলেন। এর ফলে চালের রঙ সোনালি হলুদ রূপ ধারণ করল এবং এতে প্রচুর পরিমাণে বিটা-ক্যারোটিন সঞ্চিত হলো। অন্যদিকে ডায়াবেটিস রোগীদের জন্য দেশেই E. coli ব্যাকটেরিয়ার সাহায্যে বাণিজ্যিকভাবে ইনসুলিন উৎপাদনের কারখানা স্থাপন করা হলো।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে ভিটামিন-এ সমৃদ্ধ গোল্ডেন রাইস ও রিকম্বিন্যান্ট মানব ইনসুলিন উৎপাদনের প্রায়োগিক দিক বিশ্লেষণ করা হয়েছে।",
      coreConcept: "জিন প্রকৌশল দ্বারা কৃষিজ পুষ্টিমান সমৃদ্ধকরণ ও জীবনরক্ষাকারী চিকিৎসা উপাদান উৎপাদন সম্ভব হয়েছে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 316
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: সোনালি চাল বা গোল্ডেন রাইস কোন ভিটামিনে সমৃদ্ধ তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: সাধারণ চালে বিটা-ক্যারোটিন কেন থাকে না এবং গোল্ডেন রাইস তা কীভাবে পূরণ করে তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: E. coli ব্যাকটেরিয়ার মাধ্যমে মানবদেহের ইনসুলিন জিন ক্লোনিং ও উৎপাদনের প্রযুক্তিগত ধাপসমূহ ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: বাংলাদেশের জনস্বাস্থ্য উন্নয়ন ও ডায়াবেটিস চিকিৎসায় উদ্দীপকের দুটি জীবপ্রযুক্তি উদ্ভাবনের অর্থনৈতিক ও স্বাস্থ্যগত গুরুত্ব মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড স্ট্যান্ডার্ড ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Creative Question 6 (Topic 14.4 / 14.6)
  {
    id: "q_bio_14_56",
    topicId: "top_ssc_biology_ch14_4",
    type: "CQ_CREATIVE",
    stem: "কৃষি মেলায় দুটি ফসলের প্লট প্রদর্শিত হলো:\nপ্লট P: বিকিরণ প্রয়োগে নিজস্ব জিনে মিউটেশন ঘটিয়ে উদ্ভাবিত স্বল্প জীবনকালের একটি সরিষার জাত।\nপ্লট Q: ক্ষতিকর পোকার হাত থেকে রক্ষা পেতে Bacillus thuringiensis ব্যাকটেরিয়ার ক্রিস্টাল টক্সিন জিন সংযোজিত বিটি বেগুন।\nএকজন দর্শনার্থী দাবি করলেন উভয় ফসলই ট্রান্সজেনিক জীব। কিন্তু মেলায় উপস্থিত জীবপ্রযুক্তিবিদ বললেন, “উভয় ফসল GMO হলেও এদের মধ্যে কেবল একটিই ট্রান্সজেনিক জীব।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে GMO বনাম ট্রান্সজেনিক জীবের সুস্পষ্ট পার্থক্য এবং জীবপ্রযুক্তির সঠিক বৈজ্ঞানিক শ্রেণিবিভাগ তুলে ধরা হয়েছে।",
      coreConcept: "নিজস্ব জিনের মিউটেশনে GMO তৈরি হয়, কিন্তু অন্য প্রজাতি থেকে বহিরাগত জিন প্রবেশ করালেই কেবল তা ট্রান্সজেনিক জীব হয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩ ও ১৪.৩.২",
        pageNumber: 312
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: বিটি (Bt) বেগুনের পূর্ণরূপ বা অর্থ কী তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: প্রচলিত প্রজননে বিষাক্ততা (Toxicity) পরীক্ষা না লাগলেও ট্রান্সজেনিক ফসলে বায়োসেফটি পরীক্ষা বাধ্যতামূলক কেন তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: উদ্দীপকের জীবপ্রযুক্তিবিদের মন্তব্যের যৌক্তিকতা ব্যাখ্যা করে প্লট P এবং প্লট Q-এর মধ্যে বিজ্ঞানসম্মত পার্থক্য উপস্থাপন করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: প্লট Q-এর মতো ট্রান্সজেনিক ফসল চাষের ক্ষেত্রে কৃষক ও ভোক্তাদের সম্ভাব্য ঝুঁকি ও উপকারিতা তুলনামূলকভাবে বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Remaining MCQs
  {
    id: "q_bio_14_57",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "দুগ্ধবতী গরুর দুধে মূল্যবান আমিষের পরিমাণ বৃদ্ধি করার লক্ষ্যে কোন জিনটি স্থানান্তরের ওপর গবেষণা চলছে?",
    options: [
      { id: "opt_bio_14_57_a", text: "Protein C জিন", isCorrect: true },
      { id: "opt_bio_14_57_b", text: "ইনসুলিন জিন", isCorrect: false },
      { id: "opt_bio_14_57_c", text: "Bt জিন", isCorrect: false },
      { id: "opt_bio_14_57_d", text: "CysM জিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: Protein C জিন।",
      coreConcept: "গরুর দুধে মানবদেহের রক্তের জমাট বাঁধা প্রতিরোধকারী গুরুত্বপূর্ণ আমিষ Protein C-এর পরিমাণ বাড়াতে এই জিন স্থানান্তরের ট্রায়াল চলছে।",
      distractorAnalysis: {
        opt_bio_14_57_b: "ইনসুলিন জিন ডায়াবেটিসের জন্য ব্যাকটেরিয়ায় ঢোকানো হয়।",
        opt_bio_14_57_c: "Bt জিন ফসলের পোকা দমনের জিন।",
        opt_bio_14_57_d: "CysM জিন ভেড়ার পশম বৃদ্ধির জিন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 316
      },
      proTipShortcut: "দুধে আমিষ বৃদ্ধি = Protein C জিন।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_58",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "নিচের কোন ফসলটিতে আগাছানাশক সহনশীল (Herbicide tolerant) জিন সফলভাবে স্থানান্তর করা হয়েছে?",
    options: [
      { id: "opt_bio_14_58_a", text: "ক্যানোলা (Canola)", isCorrect: true },
      { id: "opt_bio_14_58_b", text: "দেশি পাট", isCorrect: false },
      { id: "opt_bio_14_58_c", text: "আমগাছ", isCorrect: false },
      { id: "opt_bio_14_58_d", text: "কাঁঠালগাছ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ক্যানোলা (Canola)।",
      coreConcept: "ভুট্টা, তুলা, সয়াবিন ও ক্যানোলা (Canola)-তে আগাছানাশক সহনশীল জিন স্থানান্তর করে আধুনিক কৃষিতে আগাছা দমনের বিপ্লব ঘটানো হয়েছে।",
      distractorAnalysis: {
        opt_bio_14_58_b: "দেশি পাটে জিনোম উন্মোচিত হলেও কমার্শিয়াল আগাছানাশক জাত এখনও প্রচলিত নয়।",
        opt_bio_14_58_c: "আমগাছে আগাছানাশক সহনশীল জিন ঢোকানো হয়নি।",
        opt_bio_14_58_d: "কাঁঠালগাছে কোনো আগাছানাশক ট্রান্সজেনিক জাত নেই।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 316
      },
      proTipShortcut: "আগাছানাশক সহনশীল = সয়াবিন, তুলা, ক্যানোলা (Canola)।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_59",
    topicId: "top_ssc_biology_ch14_3",
    type: "MCQ",
    stem: "কোন ফুলের কোষ সাসপেনশন কালচার থেকে বাণিজ্যিকভাবে উচ্চমূল্যের সুগন্ধি আতর নিষ্কাশন করা হচ্ছে?",
    options: [
      { id: "opt_bio_14_59_a", text: "গোলাপ", isCorrect: false },
      { id: "opt_bio_14_59_b", text: "জুঁই (Jasminum)", isCorrect: true },
      { id: "opt_bio_14_59_c", text: "বেলি", isCorrect: false },
      { id: "opt_bio_14_59_d", text: "রজনীগন্ধা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: জুঁই (Jasminum)।",
      coreConcept: "টিস্যু কালচারের কোষ সাসপেনশন পদ্ধতিতে জুঁই (Jasminum) ফুলের কোষ আবাদ করে সুগন্ধি আতর বাণিজ্যিকভাবে তৈরি করা হচ্ছে।",
      distractorAnalysis: {
        opt_bio_14_59_a: "গোলাপের আতর সনাতন পাতন পদ্ধতিতে বেশি হয়।",
        opt_bio_14_59_c: "বেলি ফুলের বাণিজ্যিক সাসপেনশন কালচার পাঠ্যবইয়ে উল্লিখিত নয়।",
        opt_bio_14_59_d: "রজনীগন্ধার ক্ষেত্রে বাল্ব ব্যবহার করা হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 310
      },
      proTipShortcut: "সাসপেনশন কালচার থেকে সুগন্ধি আতর = জুঁই (Jasminum)।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_60",
    topicId: "top_ssc_biology_ch14_3",
    type: "MCQ",
    stem: "বাংলাদেশে টিস্যু কালচার প্রযুক্তির মাধ্যমে দ্রুত চারা উৎপাদন করা হচ্ছে নিচের কোন ঔষধি উদ্ভিদের?",
    options: [
      { id: "opt_bio_14_60_a", text: "অশ্বগন্ধা ও সর্পগন্ধা", isCorrect: true },
      { id: "opt_bio_14_60_b", text: "বাসক ও তুলসী", isCorrect: false },
      { id: "opt_bio_14_60_c", text: "কালমেঘ ও নিম", isCorrect: false },
      { id: "opt_bio_14_60_d", text: "হরিতকী ও বহেরা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অশ্বগন্ধা ও সর্পগন্ধা।",
      coreConcept: "বিলুপ্তির হাত থেকে বাঁচাতে এবং ফার্মাসিউটিক্যালসের কাঁচামাল জোগাতে বাংলাদেশে অশ্বগন্ধা ও সর্পগন্ধা ঔষধি উদ্ভিদের চারা টিস্যু কালচারের মাধ্যমে ব্যাপকভাবে তৈরি হচ্ছে।",
      distractorAnalysis: {
        opt_bio_14_60_b: "বাসক ও তুলসী সহজে কাণ্ড বা বীজ থেকে জন্মায়।",
        opt_bio_14_60_c: "কালমেঘ ও নিম প্রাকৃতিক বীজ থেকেই সহজে চারা দেয়।",
        opt_bio_14_60_d: "হরিতকী ও বহেরা বৃহৎ বৃক্ষজাতীয় গাছ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 311
      },
      proTipShortcut: "টিস্যু কালচার ঔষধি উদ্ভিদ = অশ্বগন্ধা ও সর্পগন্ধা।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
