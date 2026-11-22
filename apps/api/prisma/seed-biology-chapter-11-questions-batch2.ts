import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter11QuestionsBatch2: QuestionData[] = [
  // -------------------------------------------------------------
  // Topic 11.1: প্রজননের ধারণা ও গুরুত্ব (MCQs 31 - 34)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_31",
    topicId: "top_ssc_biology_ch11_1",
    type: "MCQ",
    stem: "প্রজননের মৌলিক জৈবিক উদ্দেশ্য নিচের কোনটি?",
    options: [
      { id: "opt_bio_11_31_a", text: "ব্যক্তিগত দেহের ক্ষয়পূরণ করা", isCorrect: false },
      { id: "opt_bio_11_31_b", text: "প্রজাতির ধারাবাহিকতা রক্ষা ও বংশবিস্তার", isCorrect: true },
      { id: "opt_bio_11_31_c", text: "দেহের রক্তচাপ নিয়ন্ত্রণ", isCorrect: false },
      { id: "opt_bio_11_31_d", text: "দেহের এনজাইম উৎপাদন বৃদ্ধি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: প্রজাতির ধারাবাহিকতা রক্ষা ও বংশবিস্তার।",
      coreConcept: "প্রজননের মূল লক্ষ্য হলো প্রজাতিকে বিলুপ্তির হাত থেকে রক্ষা করে পৃথিবীতে এর ধারাবাহিক অস্তিত্ব অক্ষুণ্ণ রাখা।",
      distractorAnalysis: {
        opt_bio_11_31_a: "দেহের ক্ষয়পূরণ করে মাইটোসিস কোষ বিভাজন।",
        opt_bio_11_31_c: "রক্তচাপ নিয়ন্ত্রণ করে সংবহনতন্ত্র ও হরমোন।",
        opt_bio_11_31_d: "এনজাইম সংশ্লেষণ কোষের বিপাকীয় কাজের অংশ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 233
      },
      proTipShortcut: "প্রজনন = প্রজাতির অমরত্ব।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_32",
    topicId: "top_ssc_biology_ch11_1",
    type: "MCQ",
    stem: "কোন ধরনের প্রজননে জিনগত প্রকরণ (Genetic variation) সৃষ্টি হয় না?",
    options: [
      { id: "opt_bio_11_32_a", text: "যৌন প্রজনন", isCorrect: false },
      { id: "opt_bio_11_32_b", text: "অযৌন প্রজনন", isCorrect: true },
      { id: "opt_bio_11_32_c", text: "সংকরায়ন", isCorrect: false },
      { id: "opt_bio_11_32_d", text: "পর-পরাগায়ন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অযৌন প্রজনন।",
      coreConcept: "অযৌন প্রজননে মিয়োসিস ও ক্রসিং ওভার ঘটে না বলে অপত্য জীবে কোনো জিনগত প্রকরণ সৃষ্টি হয় না।",
      distractorAnalysis: {
        opt_bio_11_32_a: "যৌন প্রজননে মিয়োসিসের ফলে প্রচুর জিনগত প্রকরণ সৃষ্টি হয়।",
        opt_bio_11_32_c: "সংকরায়নে দুই ভিন্ন জাতের সংমিশ্রণে নতুন প্রকরণ আসে।",
        opt_bio_11_32_d: "পর-পরাগায়নে দুটি ভিন্ন গাছের মিলন ঘটায় নতুন বৈশিষ্ট্যের সমাবেশ ঘটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 234
      },
      proTipShortcut: "অযৌন প্রজনন মানেই জিনগত কার্বন কপি বা ক্লোন।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_33",
    topicId: "top_ssc_biology_ch11_1",
    type: "MCQ",
    stem: "যৌন প্রজননের সবচেয়ে বড় বিবর্তনীয় গুরুত্ব কোনটি?",
    options: [
      { id: "opt_bio_11_33_a", text: "কম সময়ে লক্ষ লক্ষ বংশধর তৈরি করে", isCorrect: false },
      { id: "opt_bio_11_33_b", text: "কোনো জননকোষের অপচয় ঘটে না", isCorrect: false },
      { id: "opt_bio_11_33_c", text: "নতুন জিনগত বৈচিত্র্য এনে প্রাকৃতিক নির্বাচনে টিকে থাকার সুযোগ বাড়ায়", isCorrect: true },
      { id: "opt_bio_11_33_d", text: "মাতৃজীবের সব রোগ হুবহু বহন করে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: নতুন জিনগত বৈচিত্র্য এনে প্রাকৃতিক নির্বাচনে টিকে থাকার সুযোগ বাড়ায়।",
      coreConcept: "যৌন প্রজননে জিনের পুনর্বিন্যাসের ফলে জীবদেহে এমন সব নতুন বৈশিষ্ট্য তৈরি হয় যা প্রতিকূল পরিবর্তনশীল পরিবেশে জীবকে টিকে থাকতে সহায়তা করে।",
      distractorAnalysis: {
        opt_bio_11_33_a: "কম সময়ে দ্রুত বংশবৃদ্ধি অযৌন প্রজননের সুবিধা।",
        opt_bio_11_33_b: "যৌন প্রজননে প্রচুর জননকোষ অপচয় হয়।",
        opt_bio_11_33_d: "মাতৃজীবের রোগ হুবহু বহন করা কোনো সুবিধা নয়, এটি ক্ষতিকর।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 234
      },
      proTipShortcut: "যৌন প্রজনন = ভ্যারিয়েশন = প্রাকৃতিক নির্বাচনে জয়ের চাবিকাঠি।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_34",
    topicId: "top_ssc_biology_ch11_1",
    type: "MCQ",
    stem: "সপুষ্পক উদ্ভিদের যৌন প্রজননের প্রধান অঙ্গ কোনটি?",
    options: [
      { id: "opt_bio_11_34_a", text: "মূল", isCorrect: false },
      { id: "opt_bio_11_34_b", text: "পাতা", isCorrect: false },
      { id: "opt_bio_11_34_c", text: "ফুল", isCorrect: true },
      { id: "opt_bio_11_34_d", text: "কাণ্ড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ফুল।",
      coreConcept: "ফুল হলো উদ্ভিদের প্রজননের জন্য বিশেষভাবে রূপান্তরিত বিটপ, যা পুং ও স্ত্রী জননকোষ ধারণ করে যৌন প্রজনন সম্পন্ন করে।",
      distractorAnalysis: {
        opt_bio_11_34_a: "মূল পানি ও খনিজ লবণ শোষণ করে এবং গাছকে মাটিতে দৃঢ়ভাবে আটকে রাখে।",
        opt_bio_11_34_b: "পাতা সালোকসংশ্লেষণ প্রক্রিয়ায় খাদ্য তৈরি করে।",
        opt_bio_11_34_d: "কাণ্ড পাতা, ফুল ও ফল বহন করে এবং রস পরিবহন করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 234
      },
      proTipShortcut: "ফুল = উদ্ভিদের প্রধান প্রজনন অঙ্গ।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.2: একটি আদর্শ ফুল ও পুষ্পমঞ্জরি (MCQs 35 - 38)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_35",
    topicId: "top_ssc_biology_ch11_2",
    type: "MCQ",
    stem: "ফুলের বৃত্যংশগুলো (Sepals) যখন সম্পূর্ণ পৃথক অবস্থায় থাকে তখন তাকে কী বলে?",
    options: [
      { id: "opt_bio_11_35_a", text: "যুক্তবৃতি", isCorrect: false },
      { id: "opt_bio_11_35_b", text: "বিযুক্তবৃতি", isCorrect: true },
      { id: "opt_bio_11_35_c", text: "যুক্তদল", isCorrect: false },
      { id: "opt_bio_11_35_d", text: "উপবৃতি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বিযুক্তবৃতি।",
      coreConcept: "বৃতির খণ্ডাংশগুলো যদি পরস্পরের সাথে জোড়া না লেগে আলাদা থাকে তাকে বিযুক্তবৃতি (Polysepalous) বলে (যেমন: সরিষা)। জোড়া থাকলে যুক্তবৃতি (Gamosepalous) বলে (যেমন: জবা, ধুতুরা)।",
      distractorAnalysis: {
        opt_bio_11_35_a: "যুক্তবৃতিতে বৃত্যংশগুলো পরস্পরের সাথে যুক্ত থাকে।",
        opt_bio_11_35_c: "যুক্তদল দলমণ্ডলের পাপড়ি জোড়া লাগলে বলা হয়।",
        opt_bio_11_35_d: "উপবৃতি হলো বৃতির বাইরে থাকা অতিরিক্ত পাতার মতো বৃত্ত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 236
      },
      proTipShortcut: "বিযুক্ত = আলাদা আলাদা (সরিষা)।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_36",
    topicId: "top_ssc_biology_ch11_2",
    type: "MCQ",
    stem: "পুংকেশরের পুংদণ্ডের (Filament) শীর্ষে অবস্থিত স্ফীত থলিকে কী বলে?",
    options: [
      { id: "opt_bio_11_36_a", text: "পরাগধানী (Anther)", isCorrect: true },
      { id: "opt_bio_11_36_b", text: "গর্ভমুণ্ড", isCorrect: false },
      { id: "opt_bio_11_36_c", text: "ডিম্বক", isCorrect: false },
      { id: "opt_bio_11_36_d", text: "যোজনি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পরাগধানী (Anther)।",
      coreConcept: "পুংকেশরের মাথায় থাকা থলির মতো অংশ হলো পরাগধানী যার ভেতরে পরাগরেণু উৎপন্ন ও সঞ্চিত হয়।",
      distractorAnalysis: {
        opt_bio_11_36_b: "গর্ভমুণ্ড হলো স্ত্রীস্তবকের শীর্ষভাগ।",
        opt_bio_11_36_c: "ডিম্বক হলো গর্ভাশয়ের ভেতরের বীজকোষ।",
        opt_bio_11_36_d: "যোজনি হলো পরাগধানীর দুটি খণ্ডকে সংযোগকারী টিস্যু।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 236
      },
      proTipShortcut: "পরাগধানী = পরাগরেণুর ভাণ্ডার।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_37",
    topicId: "top_ssc_biology_ch11_2",
    type: "MCQ",
    stem: "যে ফুলে পুংস্তবক ও স্ত্রীস্তবক কোনোটিই থাকে না, তাকে কী বলা হয়?",
    options: [
      { id: "opt_bio_11_37_a", text: "উভলিঙ্গ ফুল", isCorrect: false },
      { id: "opt_bio_11_37_b", text: "একলিঙ্গ ফুল", isCorrect: false },
      { id: "opt_bio_11_37_c", text: "ক্লীব ফুল (Neuter flower)", isCorrect: true },
      { id: "opt_bio_11_37_d", text: "সম্পূর্ণ ফুল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ক্লীব ফুল (Neuter flower)।",
      coreConcept: "কোনো ফুলে যদি পুং ও স্ত্রী অত্যাবশ্যকীয় কোনো স্তবকই না থাকে, তবে তাকে ক্লীব ফুল বা নিরপেক্ষ ফুল বলে।",
      distractorAnalysis: {
        opt_bio_11_37_a: "উভলিঙ্গ ফুলে দুটি স্তবকই উপস্থিত থাকে।",
        opt_bio_11_37_b: "একলিঙ্গ ফুলে যেকোনো একটি স্তবক উপস্থিত থাকে।",
        opt_bio_11_37_d: "সম্পূর্ণ ফুলে ৫টি স্তবকই বিদ্যমান থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 237
      },
      proTipShortcut: "ক্লীব = কোনো জনন স্তবক নেই।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_38",
    topicId: "top_ssc_biology_ch11_2",
    type: "MCQ",
    stem: "নিয়ত পুষ্পমঞ্জরির (Cymose) ক্ষেত্রে নিচের কোনটি সত্য?",
    options: [
      { id: "opt_bio_11_38_a", text: "মঞ্জরিদণ্ড অবিরত বাড়তে থাকে", isCorrect: false },
      { id: "opt_bio_11_38_b", text: "শীর্ষে ফুল ফোটার কারণে মঞ্জরিদণ্ডের বৃদ্ধি সীমিত হয়ে যায়", isCorrect: true },
      { id: "opt_bio_11_38_c", text: "সরিষা এর প্রধান উদাহরণ", isCorrect: false },
      { id: "opt_bio_11_38_d", text: "কোনো ফুল ফোটে না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: শীর্ষে ফুল ফোটার কারণে মঞ্জরিদণ্ডের বৃদ্ধি সীমিত হয়ে যায়।",
      coreConcept: "নিয়ত পুষ্পমঞ্জরিতে শীর্ষমুকুলটি ফুলে পরিণত হয়ে বৃদ্ধি বন্ধ করে দেয় (যেমন জবা)।",
      distractorAnalysis: {
        opt_bio_11_38_a: "অবিরত বাড়তে থাকা অনিয়ত পুষ্পমঞ্জরির বৈশিষ্ট্য।",
        opt_bio_11_38_c: "সরিষা অনিয়ত পুষ্পমঞ্জরির উদাহরণ।",
        opt_bio_11_38_d: "নিয়ত পুষ্পমঞ্জরিতে অবশ্যই ফুল ফোটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 237
      },
      proTipShortcut: "নিয়ত = বৃদ্ধি নির্দিষ্ট বা নিয়ন্ত্রিত।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.3: পরাগায়ন ও রূপতাত্ত্বিক অভিযোজন (MCQs 39 - 42)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_39",
    topicId: "top_ssc_biology_ch11_3",
    type: "MCQ",
    stem: "পতঙ্গপরাগী ফুলের পরাগরেণু ও গর্ভমুণ্ড আঠালো ও কাঁটাযুক্ত হওয়ার কারণ কী?",
    options: [
      { id: "opt_bio_11_39_a", text: "বাতাসে বেশি দূরত্বে উড়ে যাওয়ার জন্য", isCorrect: false },
      { id: "opt_bio_11_39_b", text: "পতঙ্গের গায়ে ও পায়ে যেন সহজে আটকে যেতে পারে", isCorrect: true },
      { id: "opt_bio_11_39_c", text: "পানির স্রোতে ভেসে থাকার জন্য", isCorrect: false },
      { id: "opt_bio_11_39_d", text: "পাখির ঠোঁট থেকে রক্ষা পেতে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: পতঙ্গের গায়ে ও পায়ে যেন সহজে আটকে যেতে পারে।",
      coreConcept: "আঠালো ও খাঁজকাটা পরাগরেণু ফুল সংগ্রহ করতে আসা মৌমাছি বা প্রজাপতির গায়ে আটকে যায় এবং অন্য ফুলে গিয়ে পরাগায়ন নিশ্চিত করে।",
      distractorAnalysis: {
        opt_bio_11_39_a: "বাতাসে ওড়ার জন্য পরাগরেণু মসৃণ ও হালকা হতে হয়।",
        opt_bio_11_39_c: "পানিতে ভেসে থাকার জন্য মোমের প্রলেপ লাগে।",
        opt_bio_11_39_d: "কাঁটাযুক্ত রূপ আত্মরক্ষার জন্য নয়, বহনের সুবিধার জন্য।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 239
      },
      proTipShortcut: "আঠালো পরাগরেণু = পতঙ্গের পায়ে আঁকড়ে ধরার টেকনিক।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_40",
    topicId: "top_ssc_biology_ch11_3",
    type: "MCQ",
    stem: "নিচের কোন উদ্ভিদে পর-পরাগায়ন (Cross-pollination) ঘটে?",
    options: [
      { id: "opt_bio_11_40_a", text: "সরিষা", isCorrect: false },
      { id: "opt_bio_11_40_b", text: "ধুতুরা", isCorrect: false },
      { id: "opt_bio_11_40_c", text: "পেঁপে", isCorrect: true },
      { id: "opt_bio_11_40_d", text: "টমেটো", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: পেঁপে।",
      coreConcept: "পেঁপে একলিঙ্গ উদ্ভিদ এবং পুরুষ ও স্ত্রী গাছ আলাদা হওয়ায় এতে বাধ্যতামূলকভাবে পর-পরাগায়ন ঘটে। সরিষা ও ধুতুরায় স্ব-পরাগায়ন ঘটে।",
      distractorAnalysis: {
        opt_bio_11_40_a: "সরিষায় স্ব-পরাগায়ন ঘটে।",
        opt_bio_11_40_b: "ধুতুরা উভলিঙ্গ হওয়ায় এতে স্ব-পরাগায়ন প্রধান।",
        opt_bio_11_40_d: "টমেটোতে সাধারণ স্ব-পরাগায়ন হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 238
      },
      proTipShortcut: "পেঁপে ও শিমুল = পর-পরাগায়ন।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_41",
    topicId: "top_ssc_biology_ch11_3",
    type: "MCQ",
    stem: "প্রাণিপরাগী ফুলের প্রধান বৈশিষ্ট্য কোনটি?",
    options: [
      { id: "opt_bio_11_41_a", text: "ফুল আকারে অত্যন্ত ক্ষুদ্র ও বর্ণহীন", isCorrect: false },
      { id: "opt_bio_11_41_b", text: "ফুলগুলো বেশ বড় অথবা আকর্ষণীয় পুষ্পমঞ্জরিতে সজ্জিত থাকে", isCorrect: true },
      { id: "opt_bio_11_41_c", text: "গর্ভমুণ্ড পালকের মতো বাতাসের দোলায় নাচে", isCorrect: false },
      { id: "opt_bio_11_41_d", text: "পানির নিচে ফুল ফোটে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ফুলগুলো বেশ বড় অথবা আকর্ষণীয় পুষ্পমঞ্জরিতে সজ্জিত থাকে।",
      coreConcept: "প্রাণিপরাগী ফুলে (যেমন কদম, শিমুল, কচু) ফুল বড় বা পুষ্পমঞ্জরিতে একত্রিত থাকে যেন দূর থেকে পাখি, বাদুড় বা প্রাণীর চোখে পড়ে।",
      distractorAnalysis: {
        opt_bio_11_41_a: "ক্ষুদ্র ও বর্ণহীন ফুল হলো বায়ুপরাগী ফুল।",
        opt_bio_11_41_c: "পালকের মতো গর্ভমুণ্ড বায়ুপরাগী ধানের বৈশিষ্ট্য।",
        opt_bio_11_41_d: "পানির নিচে ফুল ফোটা পানিপরাগী উদ্ভিদের লক্ষণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 239
      },
      proTipShortcut: "প্রাণিপরাগী = বড় সাইজ ও তীব্র আকর্ষণ (কদম, শিমুল)।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_42",
    topicId: "top_ssc_biology_ch11_3",
    type: "MCQ",
    stem: "ধারাবাহিক স্ব-পরাগায়নের ফলে উদ্ভিদের কী ক্ষতিকর প্রভাব দেখা যায়?",
    options: [
      { id: "opt_bio_11_42_a", text: "নতুন প্রকরণ তৈরি হতে হতে নিয়ন্ত্রণহীন হয়", isCorrect: false },
      { id: "opt_bio_11_42_b", text: "বীজের অঙ্কুরোদগমের হার কমে যায় এবং প্রতিকূল পরিবেশে সহনশীলতা হ্রাস পায়", isCorrect: true },
      { id: "opt_bio_11_42_c", text: "গাছটির পরাগরেণু তৈরি বন্ধ হয়ে যায়", isCorrect: false },
      { id: "opt_bio_11_42_d", text: "গাছের পাতাগুলো দ্রুত ঝরে যায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বীজের অঙ্কুরোদগমের হার কমে যায় এবং প্রতিকূল পরিবেশে সহনশীলতা হ্রাস পায়।",
      coreConcept: "স্ব-পরাগায়নে কোনো নতুন জিনের সমাবেশ না ঘটায় সুপ্ত ক্ষতিকর জিনগুলো প্রকট হয়ে ওঠে, যাকে ইনব্রিডিং ডিপ্রেশন বলে; এতে সহনশীলতা কমে যায়।",
      distractorAnalysis: {
        opt_bio_11_42_a: "স্ব-পরাগায়নে নতুন প্রকরণ আসেই না।",
        opt_bio_11_42_c: "পরাগরেণু তৈরি স্বাভাবিক থাকে।",
        opt_bio_11_42_d: "পাতা ঝরে যাওয়ার সাথে এর সরাসরি সম্পর্ক নেই।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 238
      },
      proTipShortcut: "স্ব-পরাগায়নের দুর্বলতা = জীবনীশক্তি হ্রাস।"
    },
    difficulty: "HARD",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.4: গ্যামেটোফাইট ও উদ্ভিদের নিষেক (MCQs 43 - 46)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_43",
    topicId: "top_ssc_biology_ch11_4",
    type: "MCQ",
    stem: "পরাগরেণুর প্রাচীরের বাইরের শক্ত ও অলংকৃত স্তরটিকে কী বলা হয়?",
    options: [
      { id: "opt_bio_11_43_a", text: "ইনটাইন", isCorrect: false },
      { id: "opt_bio_11_43_b", text: "এক্সাইন", isCorrect: true },
      { id: "opt_bio_11_43_c", text: "টেস্টা", isCorrect: false },
      { id: "opt_bio_11_43_d", text: "টেগমেন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: এক্সাইন।",
      coreConcept: "পরাগরেণুর পুরু ও কিউটিনযুক্ত বহিস্থ স্তরকে এক্সাইন (Exine) বলে এবং ভেতরের পাতলা সেলুলোজ স্তরকে ইনটাইন (Intine) বলে।",
      distractorAnalysis: {
        opt_bio_11_43_a: "ইনটাইন হলো পরাগরেণুর ভেতরের নরম পাতলা ত্বক।",
        opt_bio_11_43_c: "টেস্টা হলো বীজের বহিঃত্বক।",
        opt_bio_11_43_d: "টেগমেন হলো বীজের অন্তঃত্বক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 240
      },
      proTipShortcut: "এক্সাইন = এক্সটারনাল শক্ত স্তর।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_44",
    topicId: "top_ssc_biology_ch11_4",
    type: "MCQ",
    stem: "ডিম্বকে স্ত্রী রেণু মাতৃকোষ থেকে মিয়োসিস বিভাজনে উৎপন্ন ৪টি হ্যাপ্লয়েড মেগাস্পোরের কয়টি টিকে থাকে?",
    options: [
      { id: "opt_bio_11_44_a", text: "১টি", isCorrect: true },
      { id: "opt_bio_11_44_b", text: "২টি", isCorrect: false },
      { id: "opt_bio_11_44_c", text: "৩টি", isCorrect: false },
      { id: "opt_bio_11_44_d", text: "৪টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ১টি।",
      coreConcept: "মিয়োসিসে ৪টি মেগাস্পোর তৈরি হলেও ওপরের ৩টি নষ্ট হয়ে যায় এবং কেবল ১টি সক্রিয় মেগাস্পোর ভ্রূণথলি গঠনে অংশ নেয়।",
      distractorAnalysis: {
        opt_bio_11_44_b: "২টি টিকে থাকে না।",
        opt_bio_11_44_c: "৩টি নষ্ট হয়ে যায়, টিকে থাকে না।",
        opt_bio_11_44_d: "পুং রেণু মাতৃকোষে ৪টি পরাগরেণুর সবকটি টিকে থাকে, কিন্তু স্ত্রী রেণুতে কেবল ১টি টিকে থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 241
      },
      proTipShortcut: "৪টির মধ্যে ৩টি নষ্ট, ১টি সক্রিয় মেগাস্পোর।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_45",
    topicId: "top_ssc_biology_ch11_4",
    type: "MCQ",
    stem: "চালতা ও আপেল কোন প্রকৃতির ফল?",
    options: [
      { id: "opt_bio_11_45_a", text: "প্রকৃত ফল", isCorrect: false },
      { id: "opt_bio_11_45_b", text: "অপ্রকৃত ফল (False fruit)", isCorrect: true },
      { id: "opt_bio_11_45_c", text: "যৌগিক ফল", isCorrect: false },
      { id: "opt_bio_11_45_d", text: "গুচ্ছ ফল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অপ্রকৃত ফল (False fruit)।",
      coreConcept: "যেসব ফলে গর্ভাশয় ছাড়া পুষ্পাক্ষ বা বৃতি ফলে রূপান্তরিত হয় (যেমন আপেল ও চালতায় পুষ্পাক্ষ স্ফীত হয়), তাদের অপ্রকৃত ফল বলে।",
      distractorAnalysis: {
        opt_bio_11_45_a: "আম ও জাম কেবল গর্ভাশয় থেকে তৈরি হয় বলে প্রকৃত ফল।",
        opt_bio_11_45_c: "কাঁঠাল ও আনারস সম্পূর্ণ মঞ্জরি থেকে তৈরি যৌগিক ফল।",
        opt_bio_11_45_d: "আতা ও শরিফা মুক্ত গর্ভাশয় থেকে তৈরি গুচ্ছ ফল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 244
      },
      proTipShortcut: "পুষ্পাক্ষ ফলে রূপ নিলে = অপ্রকৃত ফল (চালতা, আপেল)।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_46",
    topicId: "top_ssc_biology_ch11_4",
    type: "MCQ",
    stem: "সম্পূর্ণ একটি পুষ্পমঞ্জরির সমস্ত ফুল মিলে যখন একক একটি ফলে রূপান্তরিত হয় তখন তাকে কী বলে?",
    options: [
      { id: "opt_bio_11_46_a", text: "সরল ফল", isCorrect: false },
      { id: "opt_bio_11_46_b", text: "গুচ্ছ ফল", isCorrect: false },
      { id: "opt_bio_11_46_c", text: "যৌগিক ফল (Multiple fruit)", isCorrect: true },
      { id: "opt_bio_11_46_d", text: "অপ্রকৃত ফল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: যৌগিক ফল (Multiple fruit)।",
      coreConcept: "একটি পুষ্পমঞ্জরির সবকটি ফুল একত্রে মিশে যখন একটি ফলে পরিণত হয় তাকে যৌগিক ফল বলে (যেমন কাঁঠাল ও আনারস)।",
      distractorAnalysis: {
        opt_bio_11_46_a: "সরল ফল একটি ফুলের একটি গর্ভাশয় থেকে তৈরি হয় (আম)।",
        opt_bio_11_46_b: "গুচ্ছ ফল একটি ফুলের একাধিক মুক্ত গর্ভাশয় থেকে তৈরি হয় (আতা)।",
        opt_bio_11_46_d: "অপ্রকৃত ফল গর্ভাশয় ছাড়া অন্য অংশের রূপান্তর।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 244
      },
      proTipShortcut: "কাঁঠাল ও আনারস = যৌগিক ফল।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.5: মানব প্রজননতন্ত্র ও ভ্রূণের বিকাশ (MCQs 47 - 50)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_47",
    topicId: "top_ssc_biology_ch11_5",
    type: "MCQ",
    stem: "পুরুষের গৌণ যৌন বৈশিষ্ট্যের প্রকাশ ও শুক্রাণু উৎপাদন নিয়ন্ত্রণে প্রধান ভূমিকা পালন করে কোন হরমোন?",
    options: [
      { id: "opt_bio_11_47_a", text: "ইস্ট্রোজেন", isCorrect: false },
      { id: "opt_bio_11_47_b", text: "প্রোজেস্টেরন", isCorrect: false },
      { id: "opt_bio_11_47_c", text: "টেস্টোস্টেরন (Testosterone)", isCorrect: true },
      { id: "opt_bio_11_47_d", text: "ইনসুলিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: টেস্টোস্টেরন (Testosterone)।",
      coreConcept: "শুক্রাশয়ের লেডিগ কোষ থেকে টেস্টোস্টেরন হরমোন নিঃসৃত হয়, যা পুরুষের দাড়ি-গোঁফ ওঠা, কণ্ঠস্বর ভারী হওয়া ও শুক্রাণু তৈরি ত্বরান্বিত করে।",
      distractorAnalysis: {
        opt_bio_11_47_a: "ইস্ট্রোজেন নারীদেহের প্রধান যৌন হরমোন।",
        opt_bio_11_47_b: "প্রোজেস্টেরন গর্ভধারণ বজায় রাখতে সাহায্য করে।",
        opt_bio_11_47_d: "ইনসুলিন রক্তের গ্লুকোজের মাত্রা নিয়ন্ত্রণ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 245
      },
      proTipShortcut: "পুরুষ হরমোন = টেস্টোস্টেরন।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_48",
    topicId: "top_ssc_biology_ch11_5",
    type: "MCQ",
    stem: "শুক্রাশয় থেকে উৎপন্ন শুক্রাণু সাময়িকভাবে কোথায় সঞ্চিত থাকে এবং পরিপক্বতা লাভ করে?",
    options: [
      { id: "opt_bio_11_48_a", text: "মূত্রথলি", isCorrect: false },
      { id: "opt_bio_11_48_b", text: "এপিডিডাইমিস (Epididymis)", isCorrect: true },
      { id: "opt_bio_11_48_c", text: "প্রোস্টেট গ্রন্থি", isCorrect: false },
      { id: "opt_bio_11_48_d", text: "সেমিনাল ভেসিকল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: এপিডিডাইমিস (Epididymis)।",
      coreConcept: "শুক্রাশয়ের উপরে সংলগ্ন প্যাঁচানো নালি এপিডিডাইমিসে শুক্রাণু পুষ্টি পায়, সাঁতার কাটার সক্ষমতা অর্জন করে এবং সাময়িক জমা থাকে।",
      distractorAnalysis: {
        opt_bio_11_48_a: "মূত্রথলিতে মূত্র জমা থাকে।",
        opt_bio_11_48_c: "প্রোস্টেট গ্রন্থি ক্ষারীয় বীর্যরস ক্ষরণ করে।",
        opt_bio_11_48_d: "সেমিনাল ভেসিকল ফ্রুক্টোজসমৃদ্ধ বীর্যরস তৈরি করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 245
      },
      proTipShortcut: "এপিডিডাইমিস = শুক্রাণুর ট্রেনিং সেন্টার ও গোডাউন।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_49",
    topicId: "top_ssc_biology_ch11_5",
    type: "MCQ",
    stem: "জাইগোটের ক্লিভেজ বিভাজনের ফলে সৃষ্ট তরলপূর্ণ ফাঁপা গোলকাকার ভ্রূণীয় রূপটিকে কী বলে?",
    options: [
      { id: "opt_bio_11_49_a", text: "মরুলা", isCorrect: false },
      { id: "opt_bio_11_49_b", text: "ব্লাস্টোসিস্ট (Blastocyst)", isCorrect: true },
      { id: "opt_bio_11_49_c", text: "গ্যাস্ট্রুলা", isCorrect: false },
      { id: "opt_bio_11_49_d", text: "ফিটাস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ব্লাস্টোসিস্ট (Blastocyst)।",
      coreConcept: "মরুলার নিরেট কোষপিণ্ড আরও বিভাজিত হয়ে মাঝে তরলপূর্ণ গহ্বরযুক্ত ফাঁপা থলিতে রূপ নেয়, একে ব্লাস্টোসিস্ট বলে। এটি জরায়ুতে রোপিত হয়।",
      distractorAnalysis: {
        opt_bio_11_49_a: "মরুলা হলো নিরেট বলের মতো ভ্রূণীয় অবস্থা।",
        opt_bio_11_49_c: "গ্যাস্ট্রুলা হলো ত্রিস্তরবিশিষ্ট পরবর্তী ভ্রূণীয় দশা।",
        opt_bio_11_49_d: "ফিটাস হলো গর্ভধারণের ২ মাস পর মানব রূপ পাওয়া ভ্রূণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 247
      },
      proTipShortcut: "মরুলা (নিরেট) ⟶ ব্লাস্টোসিস্ট (ফাঁপা তরলপূর্ণ)।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_50",
    topicId: "top_ssc_biology_ch11_5",
    type: "MCQ",
    stem: "ভ্রূণকে মাতৃদেহের সাথে সংযুক্তকারী বিশেষ অঙ্গ অমরা (Placenta) থেকে নিঃসৃত কোন হরমোন গর্ভধারণ বজায় রাখতে অপরিহার্য?",
    options: [
      { id: "opt_bio_11_50_a", text: "প্রোজেস্টেরন", isCorrect: true },
      { id: "opt_bio_11_50_b", text: "অ্যাড্রেনালিন", isCorrect: false },
      { id: "opt_bio_11_50_c", text: "থাইরক্সিন", isCorrect: false },
      { id: "opt_bio_11_50_d", text: "ইনসুলিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রোজেস্টেরন।",
      coreConcept: "অমরা থেকে প্রচুর প্রোজেস্টেরন ও HCG হরমোন ক্ষরিত হয় যা জরায়ুর প্রাচীরকে শিথিল রেখে গর্ভপাত রোধ করে এবং গর্ভধারণ নিশ্চিত করে।",
      distractorAnalysis: {
        opt_bio_11_50_b: "অ্যাড্রেনালিন হলো আপৎকালীন হরমোন।",
        opt_bio_11_50_c: "থাইরক্সিন বিপাকীয় হার নিয়ন্ত্রণ করে।",
        opt_bio_11_50_d: "ইনসুলিন রক্তের শর্করা নিয়ন্ত্রণ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 248
      },
      proTipShortcut: "প্রোজেস্টেরন = প্রো-জেস্টেশন = প্রেগন্যান্সি রক্ষাকারী হরমোন।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.6: প্রজনন স্বাস্থ্য ও যৌনবাহিত রোগ (MCQs 51 - 54)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_51",
    topicId: "top_ssc_biology_ch11_6",
    type: "MCQ",
    stem: "বয়ঃসন্ধিকালে মেয়েদের দেহে ঋতুস্রাব বা মাসিকের কারণ কী?",
    options: [
      { id: "opt_bio_11_51_a", text: "ডিম্বাণু নিষিক্ত না হওয়ায় জরায়ুর অভ্যন্তরীণ এন্ডোমেট্রিয়াম স্তর ভেঙে রক্ত ও তরল হিসেবে নির্গত হওয়া", isCorrect: true },
      { id: "opt_bio_11_51_b", text: "মূত্রনালিতে ব্যাকটেরিয়ার আক্রমণ", isCorrect: false },
      { id: "opt_bio_11_51_c", text: "রক্তে হিমোগ্লোবিন অতিরিক্ত বেড়ে যাওয়া", isCorrect: false },
      { id: "opt_bio_11_51_d", text: "যকৃতের কোষ ফেটে যাওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ডিম্বাণু নিষিক্ত না হওয়ায় জরায়ুর অভ্যন্তরীণ এন্ডোমেট্রিয়াম স্তর ভেঙে রক্ত ও তরল হিসেবে নির্গত হওয়া।",
      coreConcept: "প্রতি মাসে ডিম্বাণু নিষিক্ত না হলে হরমোনের ঘাটতিতে জরায়ুর পুরু রক্তবাহী স্তর (এন্ডোমেট্রিয়াম) খসে পড়ে ৩-৫ দিন রক্তপাত ঘটায়—একে ঋতুচক্র বলে।",
      distractorAnalysis: {
        opt_bio_11_51_b: "এটি ইউরিনারি ট্র্যাক্ট ইনফেকশন বা ইউটিআই।",
        opt_bio_11_51_c: "হিমোগ্লোবিনের বৃদ্ধির সাথে এর সম্পর্ক নেই।",
        opt_bio_11_51_d: "যকৃতের সাথে এর কোনো শারীরিক সংযোগ নেই।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 250
      },
      proTipShortcut: "অনিষিক্ত ডিম্বাণু + এন্ডোমেট্রিয়ামের ভাঙন = স্বাভাবিক মাসিক।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_52",
    topicId: "top_ssc_biology_ch11_6",
    type: "MCQ",
    stem: "নিচের কোন আচরণটির মাধ্যমে এইচআইভি (HIV) সংক্রমিত হয়?",
    options: [
      { id: "opt_bio_11_52_a", text: "আক্রান্ত ব্যক্তির সাথে কোলাকুলি বা হাত মেলালে", isCorrect: false },
      { id: "opt_bio_11_52_b", text: "আক্রান্ত ব্যক্তির ব্যবহৃত জীবাণুমুক্ত না করা সুঁই বা সিরিঞ্জ ব্যবহার করলে", isCorrect: true },
      { id: "opt_bio_11_52_c", text: "একই সুইমিং পুলে গোসল করলে", isCorrect: false },
      { id: "opt_bio_11_52_d", text: "মশার কামড়ের মাধ্যমে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: আক্রান্ত ব্যক্তির ব্যবহৃত জীবাণুমুক্ত না করা সুঁই বা সিরিঞ্জ ব্যবহার করলে।",
      coreConcept: "রক্ত ও যৌন তরল সরাসরি রক্তের সংস্পর্শে আসলে HIV ছড়ায়। সুঁই বা সিরিঞ্জে লেগে থাকা রক্ত সুস্থ ব্যক্তির রক্তে ভাইরাস ঢুকিয়ে দেয়।",
      distractorAnalysis: {
        opt_bio_11_52_a: "হাত মেলানো বা সামাজিক সংস্পর্শে HIV ছড়ায় না।",
        opt_bio_11_52_c: "পানির মাধ্যমে HIV ছড়াতে পারে না।",
        opt_bio_11_52_d: "মশার পরিপাকতন্ত্রে HIV বাঁচে না, তাই মশার কামড়ে ছড়ায় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 251
      },
      proTipShortcut: "এক সিরিঞ্জ একবারই: রক্তের সংযোগই HIV সংক্রমণের পথ।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_53",
    topicId: "top_ssc_biology_ch11_6",
    type: "MCQ",
    stem: "সিফিলিস রোগের প্রথম পর্যায়ে সৃষ্ট ক্ষতের বিশেষ বৈশিষ্ট্য কোনটি?",
    options: [
      { id: "opt_bio_11_53_a", text: "ক্ষতে অসহ্য ব্যথা ও তীব্র জ্বালা থাকে", isCorrect: false },
      { id: "opt_bio_11_53_b", text: "যৌনাঙ্গে ব্যথাহীন শক্ত ক্ষতের (Chancre) সৃষ্টি হয়", isCorrect: true },
      { id: "opt_bio_11_53_c", text: "রোগীর শরীর নীল হয়ে যায়", isCorrect: false },
      { id: "opt_bio_11_53_d", text: "ক্ষত থেকে প্রচুর সবুজ পুঁজ নির্গত হয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: যৌনাঙ্গে ব্যথাহীন শক্ত ক্ষতের (Chancre) সৃষ্টি হয়।",
      coreConcept: "সিফিলিসের প্রাথমিক পর্যায়ের ক্ষতটিকে শ্যাঙ্কার বলে, যা সম্পূর্ণ ব্যথাহীন কিন্তু অত্যন্ত সংক্রামক। ব্যথা না থাকায় অনেক রোগী এটিকে অবহেলা করে।",
      distractorAnalysis: {
        opt_bio_11_53_a: "সিফিলিসের ক্ষত ব্যথাহীন হয়, ব্যথা থাকে না।",
        opt_bio_11_53_c: "শরীর নীল হওয়া অক্সিজেনের ঘাটতির লক্ষণ।",
        opt_bio_11_53_d: "সবুজ পুঁজ নির্গমন গনোরিয়া রোগের লক্ষণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 252
      },
      proTipShortcut: "শ্যাঙ্কার = ব্যথাহীন ফাঁদ যা সিফিলিসের প্রধান লক্ষণ।"
    },
    difficulty: "HARD",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_54",
    topicId: "top_ssc_biology_ch11_6",
    type: "MCQ",
    stem: "গনোরিয়া (Gonorrhoea) রোগের প্রধান লক্ষণ নিচের কোনটি?",
    options: [
      { id: "opt_bio_11_54_a", text: "চামড়ায় তামার মতো ফুসকুড়ি", isCorrect: false },
      { id: "opt_bio_11_54_b", text: "প্রস্রাবের সময় মূত্রনালিতে তীব্র জ্বালাপোড়া ও হলুদ পুঁজ ক্ষরণ", isCorrect: true },
      { id: "opt_bio_11_54_c", text: "ঘন ঘন শুকনো কাশি ও ওজন দ্রুত হ্রাস", isCorrect: false },
      { id: "opt_bio_11_54_d", text: "চোখ হলুদ হয়ে যাওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: প্রস্রাবের সময় মূত্রনালিতে তীব্র জ্বালাপোড়া ও হলুদ পুঁজ ক্ষরণ।",
      coreConcept: "Neisseria gonorrhoeae ব্যাকটেরিয়া মূত্রজনন নালির শ্লেষ্মাঝিল্লি আক্রমণ করায় তীব্র প্রদাহ সৃষ্টি হয় এবং প্রস্রাবের সময় প্রচণ্ড জ্বালা ও পুঁজ নির্গত হয়।",
      distractorAnalysis: {
        opt_bio_11_54_a: "তামার মতো ফুসকুড়ি সিফিলিসের দ্বিতীয় পর্যায়ের লক্ষণ।",
        opt_bio_11_54_c: "শুকনো কাশি ও ওজন হ্রাস এইডস রোগের লক্ষণ।",
        opt_bio_11_54_d: "চোখ হলুদ হওয়া জন্ডিসের লক্ষণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 252
      },
      proTipShortcut: "গনোরিয়া = প্রস্রাবে তীব্র জ্বালা ও পুঁজ।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // CREATIVE QUESTIONS (CQs 55 - 60) - 1 CQ per topic
  // -------------------------------------------------------------
  {
    id: "q_bio_11_55",
    topicId: "top_ssc_biology_ch11_1",
    type: "CQ_CREATIVE",
    stem: "কৃষি বিজ্ঞানী ড. জামান আলুর টিউবার ও আখের কাণ্ড কেটে জমিতে রোপণ করলেন এবং দেখলেন কয়েক দিনের মধ্যেই অসংখ্য নতুন সুস্থ গাছ গজিয়ে উঠেছে। তবে তিনি লক্ষ্য করলেন, তীব্র খরা ও নতুন ছত্রাকের আক্রমণে এই পুরো ক্ষেতের গাছগুলো একইভাবে ক্ষতিগ্রস্ত হলো। তিনি বললেন, “যদি এই গাছগুলো যৌন জনন প্রক্রিয়ার মাধ্যমে উদ্ভাবিত হতো, তবে কিছু গাছ হয়তো এই আক্রমণ প্রতিরোধ করতে পারত।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে অঙ্গজ প্রজনন (অযৌন) এবং এর পরিবেশীয় সীমাবদ্ধতার সাথে যৌন প্রজননের তুলনামূলক সুবিধা ব্যাখ্যা করা হয়েছে।",
      coreConcept: "অযৌন প্রজননে জিনগত অভিন্নতার কারণে মহামারী ঝুঁকি এবং যৌন প্রজননের জিনগত বৈচিত্র্যের মাধ্যমে বেঁচে থাকার সুবিধা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 234
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "যৌন প্রজনন কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "অযৌন প্রজননে উৎপন্ন অপত্যদের ক্লোন বলা হয় কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকের আলু ও আখের বংশবৃদ্ধির প্রক্রিয়াটি চিহ্নিত করে এর সুবিধা ও অসুবিধা বর্ণনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "“জিনগত বৈচিত্র্যহীনতাই ক্ষেতের সমস্ত গাছ একসাথে ধ্বংসের মূল কারণ”—বিজ্ঞানীর উক্তিটির যথার্থতা মূল্যায়ন করা।"
      }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_56",
    topicId: "top_ssc_biology_ch11_2",
    type: "CQ_CREATIVE",
    stem: "একটি বাগানে দুটি ভিন্ন উদ্ভিদ রোপণ করা হলো। উদ্ভিদ-P এর ফুলে পুষ্পাক্ষ, সবুজ বৃতি, আকর্ষণীয় নীল পাপড়ি, পুংকেশর ও গর্ভাশয় সবই বিদ্যমান। অপরপক্ষে উদ্ভিদ-Q এর কোনো কোনো ফুলে কেবল পুংকেশর থাকে, আবার কোনো ফুলে কেবল গর্ভাশয় থাকে; কোনো ফুলেই দুটি স্তবক একসাথে দেখা যায় না।",
    options: null,
    explanation: {
      directAnswer: "উদ্ভিদ-P একটি সম্পূর্ণ ও উভলিঙ্গ ফুল এবং উদ্ভিদ-Q অসম্পূর্ণ ও একলিঙ্গ ফুল (যেমন লাউ/কুমড়া)।",
      coreConcept: "স্তবকের উপস্থিতি ও অনুপস্থিতির ভিত্তিতে ফুলের শ্রেণিবিন্যাস এবং উদ্ভিদের প্রজননগত প্রভাব।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 237
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "পুষ্পাক্ষের কাজ কী তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "উদ্ভিদ-Q এর ফুলকে অসম্পূর্ণ ফুল বলা হয় কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকের উদ্ভিদ-P এর সাহায্যকারী ও অত্যাবশ্যকীয় স্তবকগুলোর গাঠনিক বিবরণ দাও।"
      },
      gha: {
        mark: 4,
        criteria: "প্রজননের নিশ্চয়তা ও ফল ধারণের ক্ষেত্রে উদ্ভিদ-P এবং উদ্ভিদ-Q এর কার্যকারিতার তুলনামূলক বিশ্লেষণ করো।"
      }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_57",
    topicId: "top_ssc_biology_ch11_3",
    type: "CQ_CREATIVE",
    stem: "একটি বিজ্ঞান মেলায় দুটি আদর্শ মডেল প্রদর্শন করা হলো। প্রথম মডেলে দেখা গেল একটি বড় লাল রঙের জবা ফুল, যার পাপড়ির গোড়ায় মিষ্টি রস রয়েছে এবং আঠালো পরাগরেণু প্রজাপতির ডানায় লেগে আছে। দ্বিতীয় মডেলে দেখা গেল একটি জলাশয়ে স্প্রিংয়ের মতো লম্বা বোঁটাযুক্ত ফুল পানির ওপরে ভেসে আছে এবং কিছু গোল পরাগরেণু পানির তরঙ্গে ভেসে এসে ফুলটিকে স্পর্শ করছে।",
    options: null,
    explanation: {
      directAnswer: "১ম মডেলটি পতঙ্গপরাগী ফুল (জবা) এবং ২য় মডেলটি পানিপরাগী উদ্ভিদ (পাতাঝাঁঝি)।",
      coreConcept: "পরাগায়নের বিভিন্ন মাধ্যম (পতঙ্গ ও পানি) এবং জলজ ও স্থলজ উদ্ভিদের বিশেষ অভিযোজন কৌশল।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 239
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "পর-পরাগায়ন কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "পতঙ্গপরাগী ফুল রঙিন ও সুবাসিত হয় কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "২য় মডেলের উদ্ভিদের পানিপরাগী অভিযোজন কৌশলটি বিস্তারিত আলোচনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "উদ্দীপকের দুটি মডেলের পরাগায়ন মাধ্যমের কার্যকারিতা ও পরিবেশগত তাৎপর্য মূল্যায়ন করা।"
      }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_58",
    topicId: "top_ssc_biology_ch11_4",
    type: "CQ_CREATIVE",
    stem: "আম গাছের ফুল ফোটার পর পরাগায়ন ঘটল। গর্ভমুণ্ডে পরাগরেণু অঙ্কুরিত হয়ে নালিকা তৈরি করল যা গর্ভদণ্ড ভেদ করে ডিম্বকে প্রবেশ করল। সেখানে গিয়ে পরাগনালিকা থেকে দুটি পুং জননকোষ মুক্ত হলো। একটি পুং জননকোষ ডিম্বাণুর সাথে মিলিত হয়ে গঠন করল $X$, এবং অপর পুং জননকোষটি কেন্দ্রীয় গৌণ নিউক্লিয়াসের সাথে মিলিত হয়ে গঠন করল $Y$। কিছু দিন পর গর্ভাশয়টি একটি রসালো সুমিষ্ট আমে পরিণত হলো।",
    options: null,
    explanation: {
      directAnswer: "$X$ হলো ডিপ্লয়েড জাইগোট ($2n$) এবং $Y$ হলো ট্রিপ্লয়েড শস্য ($3n$)।",
      coreConcept: "সপুষ্পক উদ্ভিদের দ্বিনিষেক, ত্রিমিলন এবং ফল ও বীজের বিকাশ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 242
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "প্রকৃত ফল কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "আবৃতবীজী উদ্ভিদের ক্ষেত্রে দ্বিনিষেক কেন অপরিহার্য তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকে উল্লেখিত $X$ ও $Y$ সৃষ্টির প্রক্রিয়া সমীকরণসহ ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "আম একটি প্রকৃত সরল ফল হলেও আনারস বা চালতাকে কেন তা বলা যায় না—যৌক্তিক বিশ্লেষণ করো।"
      }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_59",
    topicId: "top_ssc_biology_ch11_5",
    type: "CQ_CREATIVE",
    stem: "মানব প্রজননের ওপর প্রদর্শিত একটি অ্যানিমেশনে দেখা গেল, ডিম্বাশয় থেকে নির্গত ডিম্বাণু ডিম্বনালিতে শুক্রাণু দ্বারা নিষিক্ত হয়ে একক কোষে পরিণত হলো। এরপর কোষটি দ্রুত বিভাজিত হয়ে মরুলা ও ব্লাস্টোসিস্ট তৈরি করে জরায়ুর প্রাচীরে গেঁথে গেল। কয়েক সপ্তাহ পর জরায়ু প্রাচীরে একটি ডিস্ক আকৃতির লালচে অঙ্গ গড়ে উঠল, যা থেকে একটি নালিকা সোজা ভ্রূণের নাভির সাথে যুক্ত হয়েছে।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে মানবদেহে নিষেক, ক্লিভেজ, রোপণ এবং অমরা ও নাভিবন্ধুর গঠন প্রক্রিয়া তুলে ধরা হয়েছে।",
      coreConcept: "মানব প্রজনন শারীরতত্ত্ব, ব্লাস্টোসিস্ট রোপণ এবং অমরার বহুমুখী ভ্রূণীয় সুরক্ষা কার্যক্রম।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 247
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "মরুলা কী তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "পুরুষের শুক্রাশয় উদরগহ্বরের বাইরে অবস্থান করার শারীরিক প্রয়োজনীয়তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকে বর্ণিত ভ্রূণের বিভাজন থেকে জরায়ুতে রোপণ পর্যন্ত ধাপগুলো ধারাবাহিকভাবে বর্ণনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "গর্ভস্থ ভ্রূণটির শ্বাস-প্রশ্বাস, খাদ্য গ্রহণ ও বর্জ্য নিষ্কাশনে উদ্দীপকের ডিস্ক আকৃতির অঙ্গটির (অমরা) অবদান বিশ্লেষণ করা।"
      }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_60",
    topicId: "top_ssc_biology_ch11_6",
    type: "CQ_CREATIVE",
    stem: "একটি স্বাস্থ্য সচেতনতা সেমিনারে চিকিৎসক বললেন, “বয়ঃসন্ধিকাল হলো মানব জীবনের সবচেয়ে সংবেদনশীল সন্ধিক্ষণ। এ সময় প্রজনন স্বাস্থ্যবিধি সঠিকভাবে না মানলে এবং অনিয়ন্ত্রিত ঝুঁকিপূর্ণ আচরণের কারণে তরুণ সমাজ বিভিন্ন মারাত্মক যৌনবাহিত রোগে আক্রান্ত হতে পারে। এর মধ্যে একটি রোগে মূত্রনালির তীব্র প্রদাহে পুঁজ পড়ে, দ্বিতীয়টিতে ব্যথাহীন ঘা হয় এবং তৃতীয়টিতে সমগ্র শরীরের রোগ প্রতিরোধ ক্ষমতাই ধ্বংস হয়ে যায়।”",
    options: null,
    explanation: {
      directAnswer: "রোগ তিনটি যথাক্রমে গনোরিয়া, সিফিলিস এবং এইডস (AIDS)।",
      coreConcept: "বয়ঃসন্ধিকালীন শারীরিক সচেতনতা, প্রজনন স্বাস্থ্য এবং STDs এর প্রতিকার ও প্রতিরোধ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 250
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "AIDS রোগের পূর্ণ রূপ লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "সিফিলিস রোগের প্রাথমিক ক্ষতকে কেন বিপদজনক ফাঁদ বলা হয় তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকে উল্লেখিত প্রথম ও দ্বিতীয় রোগটির জীবাণুর বৈজ্ঞানিক নাম এবং এদের প্রধান শারীরিক লক্ষণসমূহ আলোচনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "তৃতীয় রোগটির (এইডস) বিস্তার রোধে তরুণদের মধ্যে কী কী সামাজিক ও স্বাস্থ্য সচেতনতা গড়ে তোলা উচিত তা বিশ্লেষণ করা।"
      }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  }
];
