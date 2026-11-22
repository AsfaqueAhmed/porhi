import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter11QuestionsBatch1: QuestionData[] = [
  // -------------------------------------------------------------
  // Topic 11.1: প্রজননের ধারণা ও গুরুত্ব (MCQs 01 - 04)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_01",
    topicId: "top_ssc_biology_ch11_1",
    type: "MCQ",
    stem: "যে শারীরবৃত্তীয় প্রক্রিয়ার মাধ্যমে জীব নিজের অনুরূপ নতুন বংশধর সৃষ্টি করে বংশধারা টিকিয়ে রাখে, তাকে কী বলে?",
    options: [
      { id: "opt_bio_11_01_a", text: "শ্বসন", isCorrect: false },
      { id: "opt_bio_11_01_b", text: "প্রজনন", isCorrect: true },
      { id: "opt_bio_11_01_c", text: "রেচন", isCorrect: false },
      { id: "opt_bio_11_01_d", text: "অভিস্রবণ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: প্রজনন।",
      coreConcept: "প্রজনন (Reproduction) হলো জীবের সেই অনন্য জৈবিক প্রক্রিয়া যার মাধ্যমে জীব নিজ প্রজাতিকে বিলুপ্তির হাত থেকে রক্ষা করে বংশধারা বজায় রাখে।",
      distractorAnalysis: {
        opt_bio_11_01_a: "শ্বসন হলো খাদ্য জারিত করে জৈবশক্তি (ATP) উৎপাদনের প্রক্রিয়া।",
        opt_bio_11_01_c: "রেচন হলো নাইট্রোজেনঘটিত বিপাকীয় বর্জ্য পদার্থ দেহ থেকে নিষ্কাশন প্রক্রিয়া।",
        opt_bio_11_01_d: "অভিস্রবণ হলো বৈষম্যভেদ্য পর্দার মধ্য দিয়ে দ্রাবকের উচ্চ ঘনত্ব থেকে নিম্ন ঘনত্বের দিকে গমন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 233
      },
      proTipShortcut: "প্রজনন জীবের একক অস্তিত্বের চেয়ে প্রজাতির দীর্ঘমেয়াদী অস্তিত্বের জন্য অপরিহার্য।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_02",
    topicId: "top_ssc_biology_ch11_1",
    type: "MCQ",
    stem: "অযৌন প্রজননের মাধ্যমে সৃষ্ট নতুন বংশধরের প্রধান বৈশিষ্ট্য কোনটি?",
    options: [
      { id: "opt_bio_11_02_a", text: "নতুন জিনগত প্রকরণ সৃষ্টি হয়", isCorrect: false },
      { id: "opt_bio_11_02_b", text: "অপত্য জীব হুবহু জনিতৃর অনুরূপ (ক্লোন) হয়", isCorrect: true },
      { id: "opt_bio_11_02_c", text: "প্রতিকূল পরিবেশে টিকে থাকার ক্ষমতা বহুগুণ বাড়ে", isCorrect: false },
      { id: "opt_bio_11_02_d", text: "শুক্রাণু ও ডিম্বাণুর মিলন আবশ্যক", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অপত্য জীব হুবহু জনিতৃর অনুরূপ (ক্লোন) হয়।",
      coreConcept: "অযৌন প্রজননে গ্যামেটের মিলন ও ক্রসিং ওভার না ঘটায় অপত্য জীব জিনগতভাবে মাতৃজীবের হুবহু অনুরূপ হয়।",
      distractorAnalysis: {
        opt_bio_11_02_a: "নতুন জিনগত প্রকরণ কেবল যৌন প্রজননে মিয়োসিস বিভাজনের ফলে ঘটে।",
        opt_bio_11_02_c: "জিনগত বৈচিত্র্য না থাকায় অযৌন বংশধরের পরিবেশীয় সহনশীলতা ও অভিযোজন ক্ষমতা কম থাকে।",
        opt_bio_11_02_d: "শুক্রাণু ও ডিম্বাণুর মিলন যৌন প্রজননের বৈশিষ্ট্য, অযৌন প্রজননে কোনো গ্যামেট লাগে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 234
      },
      proTipShortcut: "অযৌন প্রজনন = নো গ্যামেট = নো ভ্যারিয়েশন = হুবহু ক্লোন।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_03",
    topicId: "top_ssc_biology_ch11_1",
    type: "MCQ",
    stem: "যৌন প্রজননে কোন কোষ বিভাজনটি ক্রোমোজোম সংখ্যা ধ্রুব রাখতে সাহায্য করে?",
    options: [
      { id: "opt_bio_11_03_a", text: "অ্যামাইটোসিস", isCorrect: false },
      { id: "opt_bio_11_03_b", text: "মাইটোসিস", isCorrect: false },
      { id: "opt_bio_11_03_c", text: "মিয়োসিস", isCorrect: true },
      { id: "opt_bio_11_03_d", text: "দ্বি-ভাজন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: মিয়োসিস।",
      coreConcept: "মিয়োসিস বিভাজনে জনন মাতৃকোষ ($2n$) থেকে হ্যাপ্লয়েড ($n$) জননকোষ তৈরি হয়। ফলে নিষেকের পর জাইগোটে পুনরায় প্রজাতির সুনির্দিষ্ট ডিপ্লয়েড ($2n$) ক্রোমোজোম সংখ্যা পুনঃপ্রতিষ্ঠিত হয়।",
      distractorAnalysis: {
        opt_bio_11_03_a: "অ্যামাইটোসিস প্রত্যক্ষ কোষ বিভাজন যা ব্যাকটেরিয়ায় দেখা যায়।",
        opt_bio_11_03_b: "মাইটোসিস সমীকরণিক বিভাজন, যা ক্রোমোজোম সংখ্যা অর্ধেক করে না।",
        opt_bio_11_03_d: "দ্বি-ভাজন হলো এককোষী জীবের অযৌন বিভাজন পদ্ধতি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 234
      },
      proTipShortcut: "মিয়োসিস জননকোষে ক্রোমোজোম অর্ধেক না করলে প্রতি প্রজন্মে ক্রোমোজোম দ্বিগুণ হয়ে যেত!"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_04",
    topicId: "top_ssc_biology_ch11_1",
    type: "MCQ",
    stem: "প্রজননের মাধ্যমে প্রজাতির বিলুপ্তি রোধের প্রধান বৈজ্ঞানিক কারণ কোনটি?",
    options: [
      { id: "opt_bio_11_04_a", text: "একক জীবের ব্যক্তিগত আয়ুষ্কাল বৃদ্ধি পায়", isCorrect: false },
      { id: "opt_bio_11_04_b", text: "মৃত্যুর ফলে শূন্য হওয়া সদস্য সংখ্যা নতুন অপত্য সৃষ্টির মাধ্যমে পূরণ হয়", isCorrect: true },
      { id: "opt_bio_11_04_c", text: "কোষের বিপাকীয় ক্রিয়া পুরোপুরি বন্ধ হয়ে যায়", isCorrect: false },
      { id: "opt_bio_11_04_d", text: "দেহের সমস্ত অ্যান্টিবডি অপত্যে অবিকৃত থাকে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মৃত্যুর ফলে শূন্য হওয়া সদস্য সংখ্যা নতুন অপত্য সৃষ্টির মাধ্যমে পূরণ হয়।",
      coreConcept: "সকল জীব মরণশীল। প্রজনন প্রক্রিয়ায় নতুন সন্তান জন্ম না নিলে একপর্যায়ে পুরো প্রজাতির সব সদস্য মারা গিয়ে প্রজাতিটি পৃথিবী থেকে বিলুপ্ত হয়ে যেত।",
      distractorAnalysis: {
        opt_bio_11_04_a: "প্রজনন একক জীবের আয়ু বৃদ্ধি করে না, বরং প্রজাতির বিস্তার ঘটায়।",
        opt_bio_11_04_c: "কোষের বিপাকীয় ক্রিয়া বন্ধ হলে জীবের মৃত্যু ঘটে।",
        opt_bio_11_04_d: "অ্যান্টিবডির উপস্থিতি প্রজাতি রক্ষার একমাত্র শর্ত নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 233
      },
      proTipShortcut: "ব্যক্তির মৃত্যু অনিবার্য, কিন্তু প্রজননের মাধ্যমে প্রজাতি অমর।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.2: একটি আদর্শ ফুল ও পুষ্পমঞ্জরি (MCQs 05 - 08)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_05",
    topicId: "top_ssc_biology_ch11_2",
    type: "MCQ",
    stem: "একটি আদর্শ ফুলের প্রজননের জন্য সরাসরি অত্যাবশ্যকীয় স্তবক কোন দুটি?",
    options: [
      { id: "opt_bio_11_05_a", text: "বৃতি ও দলমণ্ডল", isCorrect: false },
      { id: "opt_bio_11_05_b", text: "পুষ্পাক্ষ ও বৃতি", isCorrect: false },
      { id: "opt_bio_11_05_c", text: "পুংস্তবক ও স্ত্রীস্তবক", isCorrect: true },
      { id: "opt_bio_11_05_d", text: "দলমণ্ডল ও পুংস্তবক", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: পুংস্তবক ও স্ত্রীস্তবক।",
      coreConcept: "পুংস্তবক (পরাগরেণু উৎপাদনকারী) এবং স্ত্রীস্তবক (ডিম্বাণু ধারণকারী) সরাসরি জননকোষ তৈরি ও নিষেকের মাধ্যমে নতুন বংশধর সৃষ্টি করে বিধায় এদের অত্যাবশ্যকীয় স্তবক বলে।",
      distractorAnalysis: {
        opt_bio_11_05_a: "বৃতি ও দলমণ্ডল হলো সাহায্যকারী স্তবক (Accessory whorls)।",
        opt_bio_11_05_b: "পুষ্পাক্ষ হলো ফুল ধারণকারী অক্ষ এবং বৃতি বাইরের রক্ষাকারী আবরণ।",
        opt_bio_11_05_d: "দলমণ্ডল পরাগায়নে সাহায্য করে, তবে সরাসরি জননকোষ উৎপাদন করে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 235
      },
      proTipShortcut: "অত্যাবশ্যকীয় = যাদের ছাড়া প্রজনন একেবারেই অসম্ভব (পুং ও স্ত্রী স্তবক)।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_06",
    topicId: "top_ssc_biology_ch11_2",
    type: "MCQ",
    stem: "স্ত্রীস্তবকের গর্ভপত্রের সবচেয়ে স্ফীত নিচের অংশটির নাম কী যার ভেতরে ডিম্বক অবস্থান করে?",
    options: [
      { id: "opt_bio_11_06_a", text: "গর্ভদণ্ড", isCorrect: false },
      { id: "opt_bio_11_06_b", text: "গর্ভাশয়", isCorrect: true },
      { id: "opt_bio_11_06_c", text: "গর্ভমুণ্ড", isCorrect: false },
      { id: "opt_bio_11_06_d", text: "পুষ্পাক্ষ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: গর্ভাশয়।",
      coreConcept: "গর্ভপত্র তিনটি অংশে গঠিত: গোড়ার স্ফীত অংশ গর্ভাশয় (Ovary), মাঝে সরু গর্ভদণ্ড (Style) এবং মাথায় আঠালো গর্ভমুণ্ড (Stigma)। গর্ভাশয়ে ডিম্বক সাজানো থাকে।",
      distractorAnalysis: {
        opt_bio_11_06_a: "গর্ভদণ্ড হলো গর্ভাশয় ও গর্ভমুণ্ডের সংযোগকারী সরু নলাকার অংশ।",
        opt_bio_11_06_c: "গর্ভমুণ্ড হলো স্ত্রীস্তবকের শীর্ষস্থ আঠালো অংশ যা পরাগরেণু গ্রহণ করে।",
        opt_bio_11_06_d: "পুষ্পাক্ষ হলো বোঁটার ওপরের স্ফীত অংশ যার ওপর ফুলের সমস্ত স্তবক সজ্জিত থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 236
      },
      proTipShortcut: "গর্ভাশয় = Ovary = ডিম্বকের সুরক্ষিত ঘর।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_07",
    topicId: "top_ssc_biology_ch11_2",
    type: "MCQ",
    stem: "লাউ ও কুমড়ার ফুল কোন প্রকৃতির?",
    options: [
      { id: "opt_bio_11_07_a", text: "সম্পূর্ণ ও উভলিঙ্গ ফুল", isCorrect: false },
      { id: "opt_bio_11_07_b", text: "অসম্পূর্ণ ও একলিঙ্গ ফুল", isCorrect: true },
      { id: "opt_bio_11_07_c", text: "ক্লীব ফুল", isCorrect: false },
      { id: "opt_bio_11_07_d", text: "সম্পূর্ণ ও ক্লীব ফুল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অসম্পূর্ণ ও একলিঙ্গ ফুল।",
      coreConcept: "লাউ ও কুমড়া ফুলে পুংস্তবক ও স্ত্রীস্তবকের যেকোনো একটি উপস্থিত থাকে (হয় পুরুষ ফুল নতুবা স্ত্রী ফুল)। ফলে এতে ৫টি স্তবক সম্পূর্ণ থাকে না, তাই এটি অসম্পূর্ণ ও একলিঙ্গ ফুল।",
      distractorAnalysis: {
        opt_bio_11_07_a: "জবা ও ধুতুরা হলো সম্পূর্ণ ও উভলিঙ্গ ফুল।",
        opt_bio_11_07_c: "ক্লীব ফুলে কোনো পুং বা স্ত্রী স্তবকই থাকে না।",
        opt_bio_11_07_d: "ক্লীব ফুল কখনো সম্পূর্ণ ফুল হতে পারে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 237
      },
      proTipShortcut: "লাউ-কুমড়ায় আলাদা পুরুষ ও স্ত্রী ফুল ফোটে = একলিঙ্গ ও অসম্পূর্ণ।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_08",
    topicId: "top_ssc_biology_ch11_2",
    type: "MCQ",
    stem: "অনিয়ত পুষ্পমঞ্জরির (Racemose inflorescence) প্রধান বৈশিষ্ট্য কোনটি?",
    options: [
      { id: "opt_bio_11_08_a", text: "মঞ্জরিদণ্ডের শীর্ষে ফুল ফুটে বৃদ্ধি থেমে যায়", isCorrect: false },
      { id: "opt_bio_11_08_b", text: "মঞ্জরিদণ্ডের বৃদ্ধি অসীম এবং নিচ থেকে ফুল ফোটা শুরু হয়", isCorrect: true },
      { id: "opt_bio_11_08_c", text: "একটি মাত্র ফুল উৎপন্ন হয়", isCorrect: false },
      { id: "opt_bio_11_08_d", text: "কোনো ফুলই ফোটে না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মঞ্জরিদণ্ডের বৃদ্ধি অসীম এবং নিচ থেকে ফুল ফোটা শুরু হয়।",
      coreConcept: "অনিয়ত পুষ্পমঞ্জরিতে (যেমন সরিষা) শীর্ষমুকুলটি ক্রমাগত বাড়তে থাকে এবং পার্শ্বীয় ফুলগুলো ক্রমান্বয়ে ফুটতে থাকে।",
      distractorAnalysis: {
        opt_bio_11_08_a: "শীর্ষে ফুল ফুটে বৃদ্ধি থেমে যাওয়া নিয়ত (Cymose) পুষ্পমঞ্জরির বৈশিষ্ট্য।",
        opt_bio_11_08_c: "পুষ্পমঞ্জরি মানেই একাধিক ফুলের নির্দিষ্ট সজ্জারীতি।",
        opt_bio_11_08_d: "ফুল ফোটা পুষ্পমঞ্জরির প্রধান কাজ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 237
      },
      proTipShortcut: "অনিয়ত = যার বৃদ্ধি নিয়ন্ত্রিত নয় বা চলতেই থাকে (সরিষা)।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.3: পরাগায়ন ও রূপতাত্ত্বিক অভিযোজন (MCQs 09 - 12)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_09",
    topicId: "top_ssc_biology_ch11_3",
    type: "MCQ",
    stem: "স্ব-পরাগায়নের ক্ষেত্রে নিচের কোন তথ্যটি সঠিক?",
    options: [
      { id: "opt_bio_11_09_a", text: "নতুন বৈশিষ্ট্যের জিনগত সংমিশ্রণ ঘটে", isCorrect: false },
      { id: "opt_bio_11_09_b", text: "প্রজাতির বৈশিষ্ট্যের বিশুদ্ধতা সংরক্ষিত থাকে", isCorrect: true },
      { id: "opt_bio_11_09_c", text: "প্রচুর পরাগরেণুর অপচয় ঘটে", isCorrect: false },
      { id: "opt_bio_11_09_d", text: "উন্নত ও অধিক রোগপ্রতিরোধী নতুন জাত তৈরি হয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: প্রজাতির বৈশিষ্ট্যের বিশুদ্ধতা সংরক্ষিত থাকে।",
      coreConcept: "স্ব-পরাগায়নে একই ফুল বা একই গাছের ফুলের মধ্যে পরাগায়ন ঘটায় বাইরে থেকে কোনো নতুন জিন প্রবেশ করতে পারে না, ফলে জনিতৃর বৈশিষ্ট্য হুবহু সংরক্ষিত থাকে।",
      distractorAnalysis: {
        opt_bio_11_09_a: "নতুন বৈশিষ্ট্যের সংমিশ্রণ কেবল পর-পরাগায়নে ঘটে।",
        opt_bio_11_09_c: "স্ব-পরাগায়নে পরাগরেণুর অপচয় অত্যন্ত কম হয়।",
        opt_bio_11_09_d: "স্ব-পরাগায়নে ক্রমাগত বংশবৃদ্ধিতে বীজের অঙ্কুরোদগম ক্ষমতা ও সহনশীলতা উল্টো হ্রাস পায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 238
      },
      proTipShortcut: "স্ব-পরাগায়ন = নো এক্সটারনাল জিন = বিশুদ্ধতা বজায় থাকে।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_10",
    topicId: "top_ssc_biology_ch11_3",
    type: "MCQ",
    stem: "বায়ুপরাগী ফুলের অন্যতম প্রধান বৈশিষ্ট্য কোনটি?",
    options: [
      { id: "opt_bio_11_10_a", text: "ফুল সুবাসিত ও প্রচুর মিষ্টি মকরন্দযুক্ত", isCorrect: false },
      { id: "opt_bio_11_10_b", text: "গর্ভমুণ্ড আঠালো, শাখান্বিত ও পালকের মতো", isCorrect: true },
      { id: "opt_bio_11_10_c", text: "পাপড়িগুলো আকারে খুব বড় ও গাঢ় রঙিন", isCorrect: false },
      { id: "opt_bio_11_10_d", text: "পরাগরেণু ভারী ও চটচটে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: গর্ভমুণ্ড আঠালো, শাখান্বিত ও পালকের মতো।",
      coreConcept: "বায়ুপরাগী ফুলে (যেমন ধান) গর্ভমুণ্ড পালকের মতো বিস্তৃত থাকে যাতে বাতাসে ভাসমান অতি হালকা পরাগরেণুগুলো সহজে জালে আটকা পড়ে।",
      distractorAnalysis: {
        opt_bio_11_10_a: "সুবাস ও মকরন্দ পতঙ্গপরাগী ফুলের বৈশিষ্ট্য।",
        opt_bio_11_10_c: "বায়ুপরাগী ফুলের পাপড়ি ক্ষুদ্র, বর্ণহীন ও অপ্রদর্শনী হয়।",
        opt_bio_11_10_d: "বায়ুপরাগী ফুলের পরাগরেণু শুষ্ক, মসৃণ ও অত্যন্ত হালকা হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 239
      },
      proTipShortcut: "বাতাস থেকে পরাগরেণু ছাঁকতে পালকের মতো গর্ভমুণ্ড দরকার।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_11",
    topicId: "top_ssc_biology_ch11_3",
    type: "MCQ",
    stem: "পাতাঝাঁঝি (Vallisneria) উদ্ভিদের পরাগায়ন কোন মাধ্যমে ঘটে এবং স্ত্রীপুষ্পের বোঁটা কেমন হয়?",
    options: [
      { id: "opt_bio_11_11_a", text: "পতঙ্গবাহিত; বোঁটা কাঁটাযুক্ত", isCorrect: false },
      { id: "opt_bio_11_11_b", text: "পানিবাহিত; বোঁটা দীর্ঘ ও প্যাঁচানো", isCorrect: true },
      { id: "opt_bio_11_11_c", text: "বায়ুবাহিত; বোঁটা খর্বাকার", isCorrect: false },
      { id: "opt_bio_11_11_d", text: "পাখিবাহিত; বোঁটা শক্ত ও কাঠের মতো", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: পানিবাহিত; বোঁটা দীর্ঘ ও প্যাঁচানো।",
      coreConcept: "পাতাঝাঁঝি একটি পানিপরাগী উদ্ভিদ। এর স্ত্রীপুষ্পের লম্বা প্যাঁচানো বোঁটা সোজা হয়ে ফুলকে পানির উপরিভাগে নিয়ে আসে যাতে ভাসমান পুংপুষ্পের পরাগরেণু গ্রহণ করতে পারে।",
      distractorAnalysis: {
        opt_bio_11_11_a: "পাতাঝাঁঝি সম্পূর্ণ জলজ পরিবেশে প্রজনন সম্পন্ন করে, পতঙ্গ দরকার হয় না।",
        opt_bio_11_11_c: "বায়ুপরাগী উদ্ভিদের বোঁটা লম্বা স্প্রিংয়ের মতো পানির উপরে ওঠে না।",
        opt_bio_11_11_d: "পাখিবাহিত পরাগায়ন শিমুল বা কদমের মতো গাছে দেখা যায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 239
      },
      proTipShortcut: "পাতাঝাঁঝি = স্প্রিং বোঁটা + জলীয় মিলন।"
    },
    difficulty: "HARD",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_12",
    topicId: "top_ssc_biology_ch11_3",
    type: "MCQ",
    stem: "পর-পরাগায়নের ক্ষেত্রে প্রজাতির টিকে থাকার জন্য সবচেয়ে গুরুত্বপূর্ণ সুবিধা কোনটি?",
    options: [
      { id: "opt_bio_11_12_a", text: "কোনো বাহক প্রয়োজন হয় না", isCorrect: false },
      { id: "opt_bio_11_12_b", text: "নতুন জিনগত প্রকরণ ও অধিক রোগপ্রতিরোধ ক্ষমতা সৃষ্টি হয়", isCorrect: true },
      { id: "opt_bio_11_12_c", text: "পরাগরেণুর অপচয় শূন্যের কোঠায় নেমে আসে", isCorrect: false },
      { id: "opt_bio_11_12_d", text: "গাছগুলোর আকার ছোট হয়ে যায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: নতুন জিনগত প্রকরণ ও অধিক রোগপ্রতিরোধ ক্ষমতা সৃষ্টি হয়।",
      coreConcept: "পর-পরাগায়নে দুটি ভিন্ন উদ্ভিদের বৈশিষ্ট্য একত্রিত হওয়ায় জিনগত প্রকরণ আসে, ফলে উৎপন্ন বীজগুলো অধিক জীবনীশক্তিসম্পন্ন হয় এবং বৈরী পরিবেশ সহ্য করতে পারে।",
      distractorAnalysis: {
        opt_bio_11_12_a: "পর-পরাগায়ন বাহক ছাড়া একেবারেই অসম্ভব।",
        opt_bio_11_12_c: "পর-পরাগায়নে প্রচুর পরাগরেণু অপচয় হয়।",
        opt_bio_11_12_d: "গাছের আকার ছোট হওয়া কোনো বৈজ্ঞানিক সুবিধা নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 238
      },
      proTipShortcut: "ক্রস পলিনেশন = হাইব্রিড ভিগর ও উন্নত প্রতিরোধ ক্ষমতা।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.4: গ্যামেটোফাইট ও উদ্ভিদের নিষেক (MCQs 13 - 16)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_13",
    topicId: "top_ssc_biology_ch11_4",
    type: "MCQ",
    stem: "পরাগরেণুর ভেতরের জনন নিউক্লিয়াসটি মাইটোসিস বিভাজনে কয়টি পুং জননকোষ বা শুক্রাণু তৈরি করে?",
    options: [
      { id: "opt_bio_11_13_a", text: "১টি", isCorrect: false },
      { id: "opt_bio_11_13_b", text: "২টি", isCorrect: true },
      { id: "opt_bio_11_13_c", text: "৩টি", isCorrect: false },
      { id: "opt_bio_11_13_d", text: "৪টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ২টি।",
      coreConcept: "পরাগরেণুর জনন নিউক্লিয়াস বিভাজিত হয়ে দুটি পুং গ্যামেট তৈরি করে, যা পরবর্তীতে পরাগনালিকার মাধ্যমে দ্বিনিষেক সম্পন্ন করতে ভ্রূণথলিতে যায়।",
      distractorAnalysis: {
        opt_bio_11_13_a: "একটি নয়, দুটি পুং গ্যামেট উৎপন্ন হয়।",
        opt_bio_11_13_c: "৩টি কোষ স্ত্রী গ্যামেটোফাইটের প্রতিপাদ কোষে থাকে।",
        opt_bio_11_13_d: "৪টি পরাগরেণু তৈরি হয় রেণু মাতৃকোষের মিয়োসিসে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 240
      },
      proTipShortcut: "দ্বিনিষেকের জন্য ২টি শুক্রাণু প্রয়োজন।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_14",
    topicId: "top_ssc_biology_ch11_4",
    type: "MCQ",
    stem: "৮ নিউক্লিয়াসবিশিষ্ট ভ্রূণথলিতে ডিম্বকরন্ধ্রের দিকে অবস্থিত গর্ভযন্ত্রের (Egg apparatus) অংশ নয় কোনটি?",
    options: [
      { id: "opt_bio_11_14_a", text: "ডিম্বাণু", isCorrect: false },
      { id: "opt_bio_11_14_b", text: "সহকারী কোষ", isCorrect: false },
      { id: "opt_bio_11_14_c", text: "প্রতিপাদ কোষ", isCorrect: true },
      { id: "opt_bio_11_14_d", text: "সিনার্জীডস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: প্রতিপাদ কোষ।",
      coreConcept: "গর্ভযন্ত্র তৈরি হয় ডিম্বকরন্ধ্রের দিকে অবস্থিত ১টি ডিম্বাণু ও ২টি সহকারী কোষ (সিনার্জীডস) নিয়ে। অপরপক্ষে প্রতিপাদ কোষ থাকে বিপরীত মেরুতে (ডিম্বকমূলের দিকে)।",
      distractorAnalysis: {
        opt_bio_11_14_a: "ডিম্বাণু গর্ভযন্ত্রের প্রধান কেন্দ্রীয় কোষ।",
        opt_bio_11_14_b: "সহকারী কোষ দুটি গর্ভযন্ত্রের অবিচ্ছেদ্য অংশ।",
        opt_bio_11_14_d: "সিনার্জীডস হলো সহকারী কোষের ইংরেজি প্রতিশব্দ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 241
      },
      proTipShortcut: "গর্ভযন্ত্র = ১ ডিম্বাণু + ২ সহকারী কোষ।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_15",
    topicId: "top_ssc_biology_ch11_4",
    type: "MCQ",
    stem: "আবৃতবীজী উদ্ভিদের দ্বিনিষেকে পুং গ্যামেট ($n$) ও গৌণ নিউক্লিয়াসের ($2n$) মিলনে কী উৎপন্ন হয়?",
    options: [
      { id: "opt_bio_11_15_a", text: "ডিপ্লয়েড জাইগোট ($2n$)", isCorrect: false },
      { id: "opt_bio_11_15_b", text: "ট্রিপ্লয়েড শস্য ($3n$ Endosperm)", isCorrect: true },
      { id: "opt_bio_11_15_c", text: "হ্যাপ্লয়েড রেণু ($n$)", isCorrect: false },
      { id: "opt_bio_11_15_d", text: "টেট্রাপ্লয়েড ভ্রূণ ($4n$)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ট্রিপ্লয়েড শস্য ($3n$ Endosperm)।",
      coreConcept: "একটি পুং গ্যামেট ($n$) এবং ডিপ্লয়েড গৌণ নিউক্লিয়াসের ($2n$) মিলনকে ত্রিমিলন (Triple fusion) বলে, যা থেকে ট্রিপ্লয়েড ($3n$) শস্য উৎপন্ন হয়।",
      distractorAnalysis: {
        opt_bio_11_15_a: "ডিপ্লয়েড জাইগোট উৎপন্ন হয় পুং গ্যামেট ($n$) ও ডিম্বাণুর ($n$) মিলনে।",
        opt_bio_11_15_c: "রেণু কোনো মিলনের ফলে উৎপন্ন হয় না, মিয়োসিসের ফল।",
        opt_bio_11_15_d: "স্বাভাবিক নিষেকের ফলে কোনো $4n$ ভ্রূণ সৃষ্টি হয় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 242
      },
      proTipShortcut: "$1n + 2n = 3n$ এন্ডোস্পার্ম বা শস্য।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_16",
    topicId: "top_ssc_biology_ch11_4",
    type: "MCQ",
    stem: "নিষেকের পর ফুলের ডিম্বকটি কীসে রূপান্তরিত হয়?",
    options: [
      { id: "opt_bio_11_16_a", text: "ফল", isCorrect: false },
      { id: "opt_bio_11_16_b", text: "বীজ", isCorrect: true },
      { id: "opt_bio_11_16_c", text: "ফলত্বক", isCorrect: false },
      { id: "opt_bio_11_16_d", text: "পুষ্পাক্ষ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বীজ।",
      coreConcept: "নিষেক-পরবর্তী পরিবর্তনের ফলে পুরো গর্ভাশয় ফলে এবং ভেতরের ডিম্বকটি বীজে রূপান্তরিত হয়।",
      distractorAnalysis: {
        opt_bio_11_16_a: "গর্ভাশয় রূপান্তরিত হয়ে ফলে পরিণত হয়।",
        opt_bio_11_16_c: "গর্ভাশয়ের প্রাচীর পরিবর্তিত হয়ে ফলত্বক গঠন করে।",
        opt_bio_11_16_d: "পুষ্পাক্ষ নিষেকের অংশ নয়, ফলের গোড়ার অক্ষ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 243
      },
      proTipShortcut: "গর্ভাশয় = ফল, ডিম্বক = বীজ।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.5: মানব প্রজননতন্ত্র ও ভ্রূণের বিকাশ (MCQs 17 - 20)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_17",
    topicId: "top_ssc_biology_ch11_5",
    type: "MCQ",
    stem: "মানবদেহে শুক্রাশয় উদরগহ্বরের বাইরে স্ক্রোটাম বা অণ্ডথলিতে অবস্থান করে কেন?",
    options: [
      { id: "opt_bio_11_17_a", text: "দেহের তাপমাত্রা থেকে ১–৩° সেলসিয়াস কম তাপমাত্রা বজায় রেখে শুক্রাণু উৎপাদন নিশ্চিত করতে", isCorrect: true },
      { id: "opt_bio_11_17_b", text: "দেহের তাপমাত্রা বৃদ্ধি করতে", isCorrect: false },
      { id: "opt_bio_11_17_c", text: "রক্তচাপ স্বাভাবিক রাখতে", isCorrect: false },
      { id: "opt_bio_11_17_d", text: "মূত্রথলিকে সুরক্ষা দিতে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: দেহের তাপমাত্রা থেকে ১–৩° সেলসিয়াস কম তাপমাত্রা বজায় রেখে শুক্রাণু উৎপাদন নিশ্চিত করতে।",
      coreConcept: "শুক্রাণু তৈরির জন্য স্বাভাবিক শারীরিক তাপমাত্রার চেয়ে কিছুটা কম তাপমাত্রা প্রয়োজন হয়, তাই শুক্রাশয় দেহের বাইরে স্ক্রোটামে থাকে।",
      distractorAnalysis: {
        opt_bio_11_17_b: "তাপমাত্রা বৃদ্ধি শুক্রাণুর বেঁচে থাকার জন্য ক্ষতিকর।",
        opt_bio_11_17_c: "স্ক্রোটামের অবস্থানের সাথে শারীরিক রক্তচাপের সম্পর্ক নেই।",
        opt_bio_11_17_d: "মূত্রথলি উদরগহ্বরের ভেতরে সুরক্ষিত থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 245
      },
      proTipShortcut: "স্ক্রোটাম = প্রাকৃতিক কুলার (Cooler) যা শুক্রাণুকে সক্রিয় রাখে।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_18",
    topicId: "top_ssc_biology_ch11_5",
    type: "MCQ",
    stem: "স্ত্রীদেহে ডিম্বাণুর সাথে শুক্রাণুর নিষেক সাধারণত কোথায় সম্পন্ন হয়?",
    options: [
      { id: "opt_bio_11_18_a", text: "ডিম্বাশয়ে", isCorrect: false },
      { id: "opt_bio_11_18_b", text: "ফ্যালোপিয়ান নালির অ্যাম্পুলায়", isCorrect: true },
      { id: "opt_bio_11_18_c", text: "জরায়ুর এন্ডোমেট্রিয়ামে", isCorrect: false },
      { id: "opt_bio_11_18_d", text: "যোনিপথে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ফ্যালোপিয়ান নালির অ্যাম্পুলায়।",
      coreConcept: "ডিম্বাশয় থেকে মুক্ত ডিম্বাণু ফ্যালোপিয়ান নালিতে আসে এবং এর অ্যাম্পুলা অংশে শুক্রাণু দ্বারা নিষিক্ত হয়।",
      distractorAnalysis: {
        opt_bio_11_18_a: "ডিম্বাশয় ডিম্বাণু উৎপাদন করে, সেখানে নিষেক ঘটে না।",
        opt_bio_11_18_c: "জরায়ুর এন্ডোমেট্রিয়ামে নিষিক্ত ভ্রূণ বা ব্লাস্টোসিস্ট রোপিত (Implanted) হয়।",
        opt_bio_11_18_d: "যোনিপথ হলো সঙ্গম ও প্রসব নালি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 247
      },
      proTipShortcut: "নিষেক ফ্যালোপিয়ান নালিতে ঘটে, আর রোপণ জরায়ুতে ঘটে।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_19",
    topicId: "top_ssc_biology_ch11_5",
    type: "MCQ",
    stem: "জরায়ুর প্রাচীরে ব্লাস্টোসিস্ট গেঁথে যাওয়াকে কী বলা হয়?",
    options: [
      { id: "opt_bio_11_19_a", text: "ক্লিভেজ", isCorrect: false },
      { id: "opt_bio_11_19_b", text: "রোপণ (Implantation)", isCorrect: true },
      { id: "opt_bio_11_19_c", text: "মরুলা", isCorrect: false },
      { id: "opt_bio_11_19_d", text: "প্রসব", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: রোপণ (Implantation)।",
      coreConcept: "নিষেকের প্রায় ৬ষ্ঠ-৭ম দিনে বিভাজিত ব্লাস্টোসিস্ট জরায়ুর অভ্যন্তরীণ স্তর এন্ডোমেট্রিয়ামে সংস্থাপিত হয়, একে ইমপ্লান্টেশন বা রোপণ বলে।",
      distractorAnalysis: {
        opt_bio_11_19_a: "ক্লিভেজ হলো জাইগোটের দ্রুত মাইটোসিস বিভাজন।",
        opt_bio_11_19_c: "মরুলা হলো ক্লিভেজের ফলে সৃষ্ট নিরেট কোষপিণ্ড।",
        opt_bio_11_19_d: "প্রসব হলো গর্ভকাল শেষে শিশুর জন্ম নেওয়ার প্রক্রিয়া।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 247
      },
      proTipShortcut: "ইমপ্লান্টেশন = জরায়ু প্রাচীরে ভ্রূণ নোঙর ফেলা।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_20",
    topicId: "top_ssc_biology_ch11_5",
    type: "MCQ",
    stem: "অমরা (Placenta) সম্পর্কে নিচের কোন তথ্যটি চিকিৎসাবিজ্ঞান অনুযায়ী সঠিক?",
    options: [
      { id: "opt_bio_11_20_a", text: "মায়ের রক্ত সরাসরি ভ্রূণের রক্তনালিতে অবাধে প্রবাহিত হয়", isCorrect: false },
      { id: "opt_bio_11_20_b", text: "মা ও ভ্রূণের রক্তের সংযোগ ঘটলেও রক্ত কখনো সরাসরি মেশে না; ব্যাপনে পুষ্টি ও গ্যাস বিনিময় হয়", isCorrect: true },
      { id: "opt_bio_11_20_c", text: "অমরা কোনো হরমোন তৈরি করতে পারে না", isCorrect: false },
      { id: "opt_bio_11_20_d", text: "অমরা শুধু প্রসবের সময় জরায়ুর মুখ খোলার কাজ করে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মা ও ভ্রূণের রক্তের সংযোগ ঘটলেও রক্ত কখনো সরাসরি মেশে না; ব্যাপনে পুষ্টি ও গ্যাস বিনিময় হয়।",
      coreConcept: "অমরা বা গর্ভফুলে একটি রক্ত-অমরা বাধা (Placental barrier) থাকে। ফলে মা ও ভ্রূণের রক্ত সরাসরি না মিশে কেবল ব্যাপন প্রক্রিয়ায় পুষ্টি, গ্যাস ও বর্জ্য আদান-প্রদান করে।",
      distractorAnalysis: {
        opt_bio_11_20_a: "রক্ত সরাসরি মিশলে ভিন্ন রক্তগ্রুপের কারণে ভ্রূণের মৃত্যু হতে পারত।",
        opt_bio_11_20_c: "অমরা অন্তঃক্ষরা গ্রন্থির মতো প্রোজেস্টেরন ও HCG হরমোন ক্ষরণ করে।",
        opt_bio_11_20_d: "অমরার মূল কাজ গর্ভকালীন পুষ্টি, শ্বসন ও রেচন বজায় রাখা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 248
      },
      proTipShortcut: "নো ডিরেক্ট মিক্সিং: অমরা হলো একটি বৈষম্যভেদ্য জৈবিক ফিল্টার।"
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.6: প্রজনন স্বাস্থ্য ও যৌনবাহিত রোগ (MCQs 21 - 24)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_21",
    topicId: "top_ssc_biology_ch11_6",
    type: "MCQ",
    stem: "বিশ্ব স্বাস্থ্য সংস্থার (WHO) মতে মানুষের বয়ঃসন্ধিকালের বয়সসীমা কত বছর?",
    options: [
      { id: "opt_bio_11_21_a", text: "৫ থেকে ১০ বছর", isCorrect: false },
      { id: "opt_bio_11_21_b", text: "১০ থেকে ১৯ বছর", isCorrect: true },
      { id: "opt_bio_11_21_c", text: "১৮ থেকে ২৫ বছর", isCorrect: false },
      { id: "opt_bio_11_21_d", text: "২৫ থেকে ৩৫ বছর", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ১০ থেকে ১৯ বছর।",
      coreConcept: "বিশ্ব স্বাস্থ্য সংস্থা (WHO) ১০ থেকে ১৯ বছর বয়সসীমাকে বয়ঃসন্ধিকাল (Adolescence / Puberty) হিসেবে সংজ্ঞায়িত করেছে।",
      distractorAnalysis: {
        opt_bio_11_21_a: "৫ থেকে ১০ বছর বাল্যকাল।",
        opt_bio_11_21_c: "১৮ থেকে ২৫ বছর তরুণ বা প্রাপ্তবয়স্ক অবস্থা।",
        opt_bio_11_21_d: "২৫ থেকে ৩৫ বছর পূর্ণ যৌবন ও কর্মজীবন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 250
      },
      proTipShortcut: "বয়ঃসন্ধিকাল = টিনএজ সময়কাল (১০-১৯ বছর)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_22",
    topicId: "top_ssc_biology_ch11_6",
    type: "MCQ",
    stem: "এইডস (AIDS) রোগ সৃষ্টিকারী HIV ভাইরাস মূলত মানবদেহের কোন অংশকে ধ্বংস করে?",
    options: [
      { id: "opt_bio_11_22_a", text: "লোহিত রক্তকণিকা (RBC)", isCorrect: false },
      { id: "opt_bio_11_22_b", text: "রোগপ্রতিরোধকারী শ্বেত রক্তকণিকা (T-লিম্ফোসাইট)", isCorrect: true },
      { id: "opt_bio_11_22_c", text: "অনুচক্রিকা (Platelet)", isCorrect: false },
      { id: "opt_bio_11_22_d", text: "যকৃতের কোষ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: রোগপ্রতিরোধকারী শ্বেত রক্তকণিকা (T-লিম্ফোসাইট)।",
      coreConcept: "HIV মানবদেহের রোগপ্রতিরোধক T-সহকারী লিম্ফোসাইট আক্রমণ ও ধ্বংস করে সমগ্র প্রতিরোধ ব্যবস্থা দুর্বল করে দেয়, ফলে রোগী অতি সাধারণ অসুখেও মৃত্যুমুখে পতিত হয়।",
      distractorAnalysis: {
        opt_bio_11_22_a: "লোহিত রক্তকণিকা ধ্বংস করে ম্যালেরিয়া জীবাণু।",
        opt_bio_11_22_c: "অনুচক্রিকা কমায় ডেঙ্গু ভাইরাস।",
        opt_bio_11_22_d: "যকৃতের কোষে প্রদাহ ঘটায় হেপাটাইটিস ভাইরাস।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 251
      },
      proTipShortcut: "এইচআইভি শরীরের প্রতিরক্ষা বাহিনীকে (T-কোষ) সমূলে ধ্বংস করে।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_23",
    topicId: "top_ssc_biology_ch11_6",
    type: "MCQ",
    stem: "সিফিলিস (Syphilis) রোগের জন্য দায়ী জীবাণুর নাম কী?",
    options: [
      { id: "opt_bio_11_23_a", text: "Neisseria gonorrhoeae", isCorrect: false },
      { id: "opt_bio_11_23_b", text: "Treponema pallidum", isCorrect: true },
      { id: "opt_bio_11_23_c", text: "Salmonella typhi", isCorrect: false },
      { id: "opt_bio_11_23_d", text: "Vibrio cholerae", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: Treponema pallidum।",
      coreConcept: "Treponema pallidum নামক স্পাইরোকেট জাতীয় ব্যাকটেরিয়ার সংক্রমণে সিফিলিস রোগ হয়, যার প্রথম লক্ষণ যৌনাঙ্গে ব্যথাহীন ক্ষতের (Chancre) সৃষ্টি।",
      distractorAnalysis: {
        opt_bio_11_23_a: "Neisseria gonorrhoeae হলো গনোরিয়া রোগের জীবাণু।",
        opt_bio_11_23_c: "Salmonella typhi টাইফয়েড রোগের জীবাণু।",
        opt_bio_11_23_d: "Vibrio cholerae কলেরা রোগের জীবাণু।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 252
      },
      proTipShortcut: "সিফিলিস = Treponema pallidum।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_24",
    topicId: "top_ssc_biology_ch11_6",
    type: "MCQ",
    stem: "গনোরিয়া রোগ সময়মতো চিকিৎসা না করালে নারী ও পুরুষ উভয়ের ক্ষেত্রে কী মারাত্মক জটিলতা দেখা দেয়?",
    options: [
      { id: "opt_bio_11_24_a", text: "স্থায়ী বন্ধ্যাত্ব (Infertility)", isCorrect: true },
      { id: "opt_bio_11_24_b", text: "হৃদরোগ", isCorrect: false },
      { id: "opt_bio_11_24_c", text: "রক্তশূন্যতা", isCorrect: false },
      { id: "opt_bio_11_24_d", text: "গলগণ্ড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: স্থায়ী বন্ধ্যাত্ব (Infertility)।",
      coreConcept: "গনোরিয়ায় মূত্রজনন নালি ও ডিম্বনালিতে দীর্ঘমেয়াদী প্রদাহ ও ক্ষত সৃষ্টি হয়ে জনন নালি বন্ধ হয়ে যায়, ফলে স্থায়ী বন্ধ্যাত্ব ঘটে।",
      distractorAnalysis: {
        opt_bio_11_24_b: "সিফিলিসের শেষ পর্যায়ে হৃদযন্ত্র আক্রান্ত হয়।",
        opt_bio_11_24_c: "রক্তশূন্যতা আয়রনের অভাবে হয়।",
        opt_bio_11_24_d: "গলগণ্ড আয়োডিনের ঘাটতিজনিত রোগ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 252
      },
      proTipShortcut: "গনোরিয়া অবহেলা করলে প্রজনন ক্ষমতা চিরতরে নষ্ট হয়ে যায়।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // CREATIVE QUESTIONS (CQs 25 - 30) - 1 CQ per topic
  // -------------------------------------------------------------
  {
    id: "q_bio_11_25",
    topicId: "top_ssc_biology_ch11_1",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান ক্লাসে শিক্ষক বললেন, “জীবজগতের কোটি কোটি প্রজাতির দীর্ঘ স্থায়িত্বের পেছনে দুটি ভিন্ন প্রজনন কৌশল কার্যকর রয়েছে। কৌশল-A পদ্ধতিতে অপত্য জীবের মধ্যে কোনো নতুন রূপ বা প্রকরণ দেখা যায় না, পক্ষান্তরে কৌশল-B পদ্ধতিতে ভিন্ন দুটি জননকোষের মিলনে সৃষ্ট জীব পরিবর্তিত পরিবেশের সাথে চমৎকারভাবে খাপ খাইয়ে নিতে পারে।”",
    options: null,
    explanation: {
      directAnswer: "কৌশল-A হলো অযৌন প্রজনন এবং কৌশল-B হলো যৌন প্রজনন।",
      coreConcept: "অযৌন ও যৌন প্রজননের পার্থক্যের ভিত্তি হলো গ্যামেটের সংশ্লিষ্টতা এবং জিনগত প্রকরণ সৃষ্টির ক্ষমতা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 233
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "প্রজনন কাকে বলে তার সঠিক সংজ্ঞা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "ব্যক্তির মৃত্যুর পরেও প্রজাতির বিলুপ্তি রোধে প্রজননের প্রয়োজনীয়তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকের A ও B কৌশলদ্বয়ের মধ্যে জননকোষ, বিভাজন ও বৈশিষ্ট্যের নিরিখে তুলনামূলক পার্থক্য ছক আকারে উপস্থাপন করা।"
      },
      gha: {
        mark: 4,
        criteria: "পরিবর্তনশীল বৈরী পরিবেশে জীবের অভিযোজন ও বিবর্তনীয় অগ্রগতিতে B কৌশলের ভূমিকা মূল্যায়ন করা।"
      }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_26",
    topicId: "top_ssc_biology_ch11_2",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান ল্যাবরেটরিতে রফিক জবা ফুলের বিভিন্ন স্তবক আলাদা করে টেবিলের ওপর সাজাল। সে দেখল বাইরে সবুজ পাতার মতো কিছু অংশ আছে, তার ভেতরে লাল রঙের পাঁচটি পাপড়ি, অসংখ্য হলুদ থলিযুক্ত পুংকেশর এবং মাঝখানে একটি লম্বা দণ্ড যার গোড়া ফোলা ও মাথায় পাঁচটি আঠালো অংশ রয়েছে।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে জবা ফুলের পুষ্পাক্ষ, বৃতি, দলমণ্ডল, পুংস্তবক ও স্ত্রীস্তবকের ব্যবচ্ছেদ বর্ণনা করা হয়েছে।",
      coreConcept: "একটি আদর্শ ফুলের পাঁচটি স্তবকের গাঠনিক বিন্যাস এবং প্রজননে এদের প্রত্যক্ষ ও পরোক্ষ ভূমিকা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 235
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "সম্পূর্ণ ফুল কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "পুংস্তবক ও স্ত্রীস্তবককে অত্যাবশ্যকীয় স্তবক বলা হয় কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকে উল্লেখিত স্ত্রীস্তবকের তিনটি অংশের নাম চিহ্নিত করে এদের কাজ বর্ণনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "গাছটিতে যদি রঙিন পাপড়ি না থাকত, তবে প্রজনন প্রক্রিয়ায় কী ধরনের সংকট তৈরি হতো তা বিশ্লেষণ করা।"
      }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_27",
    topicId: "top_ssc_biology_ch11_3",
    type: "CQ_CREATIVE",
    stem: "কৃষিবিদ হাবিব লক্ষ্য করলেন তার সরিষা ক্ষেতে প্রচুর মৌমাছি ও প্রজাপতি উড়ে বেড়ায় এবং সরিষা ফুলে একই ফুলের পরাগরেণু গর্ভমুণ্ডে পতিত হয়ে বীজ তৈরি হয়। অন্যদিকে পাশের ধানক্ষেতে তিনি দেখলেন ধানের ফুলগুলো খুবই ছোট, গন্ধহীন ও বর্ণহীন, কিন্তু তাদের গর্ভমুণ্ড পালকের মতো বাতাসের দোলায় কাঁপছে।",
    options: null,
    explanation: {
      directAnswer: "সরিষায় স্ব-পরাগায়ন ও পতঙ্গপরাগী অভিযোজন এবং ধানে পর-পরাগায়ন ও বায়ুপরাগী অভিযোজন ঘটেছে।",
      coreConcept: "পরাগায়নের বিভিন্ন মাধ্যম (পতঙ্গ ও বায়ু) এবং তাদের উপযোগী রূপতাত্ত্বিক অভিযোজনের তাৎপর্য।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 238
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "পরাগায়ন কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "ধানের গর্ভমুণ্ড পালকের মতো হয় কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "সরিষা ফুলের পরাগায়ন কৌশল এবং এর সাথে সংশ্লিষ্ট পতঙ্গপরাগী অভিযোজন বৈশিষ্ট্য আলোচনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "নতুন জাত উদ্ভাবন ও উন্নত বীজ প্রাপ্তির ক্ষেত্রে উদ্দীপকের দুই উদ্ভিদে ঘটা পরাগায়নের আপেক্ষিক সুবিধা-অসুবিধা বিশ্লেষণ করা।"
      }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_28",
    topicId: "top_ssc_biology_ch11_4",
    type: "CQ_CREATIVE",
    stem: "সপুষ্পক উদ্ভিদের ডিম্বকে একটি স্ত্রী রেণু মাতৃকোষ থেকে মিয়োসিস বিভাজনের মাধ্যমে ৮ নিউক্লিয়াসবিশিষ্ট একটি থলি তৈরি হয়। পরাগরেণু থেকে উৎপন্ন দুটি শুক্রাণুর একটি ডিম্বাণুকে এবং অপরটি কেন্দ্রীয় নিউক্লিয়াসকে যুগপৎ নিষিক্ত করে। নিষেকের পর ডিম্বকটি সম্পূর্ণ ফলে ও বীজে রূপান্তরিত হয়।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকটিতে মেগাগ্যামেটোজেনেসিস, আবৃতবীজী উদ্ভিদের দ্বিনিষেক এবং ফল-বীজ রূপান্তরের প্রক্রিয়া তুলে ধরা হয়েছে।",
      coreConcept: "৮ নিউক্লিয়াসবিশিষ্ট ভ্রূণথলির গঠন, ত্রিমিলন এবং ট্রিপ্লয়েড শস্য কোষের সৃষ্টি।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 241
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "দ্বিনিষেক কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "আবৃতবীজী উদ্ভিদের শস্যকে ট্রিপ্লয়েড ($3n$) বলা হয় কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকের ৮ নিউক্লিয়াসবিশিষ্ট থলিটির (ভ্রূণথলি) বিভিন্ন অংশের বিন্যাস চিত্রসহ বর্ণনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "নিষেকের পরিণতিতে ডিম্বক ও গর্ভাশয়ের প্রতিটি অংশের কী রূপান্তর ঘটে তা সারণির মাধ্যমে উপস্থাপনপূর্বক মূল্যায়ন করা।"
      }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_29",
    topicId: "top_ssc_biology_ch11_5",
    type: "CQ_CREATIVE",
    stem: "গর্ভবতী সুমাইয়া বেগমের গর্ভধারণের ৩য় মাসে আল্ট্রাসনোগ্রাম করে ডাক্তার দেখলেন ভ্রূণটি জরায়ুতে সুসংগঠিতভাবে যুক্ত রয়েছে। ডাক্তার বুঝিয়ে বললেন, “মায়ের জরায়ুর প্রাচীর ও ভ্রূণকলার সমন্বয়ে একটি বিশেষ অঙ্গ গঠিত হয়েছে যা নাভিবন্ধুর মাধ্যমে শিশুকে মায়ের সাথে যুক্ত রেখেছে। এই অঙ্গটি ভ্রূণের পুষ্টি, শ্বাসকার্য ও বর্জ্য অপসারণের দায়িত্ব একাই পালন করছে।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে বর্ণিত বিশেষ সংযোগকারী অঙ্গটি হলো অমরা বা গর্ভফুল (Placenta)।",
      coreConcept: "অমরার গঠন, কার্যপ্রণালী এবং ভ্রূণের জৈবিক সুরক্ষায় এর অপরিহার্য ভূমিকা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 248
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "রোপণ বা ইমপ্লান্টেশন কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "মা ও ভ্রূণের রক্ত কখনোই সরাসরি মেশে না কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকে বর্ণিত অঙ্গটির (অমরা) উৎপত্তি ও গঠন প্রক্রিয়া বর্ণনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "“অমরা একই সাথে ভ্রূণের পরিপাকতন্ত্র, শ্বসনতন্ত্র, রেচনতন্ত্র ও অন্তঃক্ষরা গ্রন্থির বিকল্প হিসেবে কাজ করে”—উক্তিটির যথার্থতা মূল্যায়ন করা।"
      }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_30",
    topicId: "top_ssc_biology_ch11_6",
    type: "CQ_CREATIVE",
    stem: "হাসপাতালের চর্ম ও যৌন বিভাগে দুজন রোগী এলেন। রোগী-X এর যৌনাঙ্গে একটি ব্যথাহীন শক্ত ক্ষতের সৃষ্টি হয়েছে এবং চামড়ায় লালচে ফুসকুড়ি দেখা যাচ্ছে। অপরদিকে রোগী-Y দীর্ঘদিন ধরে অনবরত শুষ্ক কাশি, অস্বাভাবিক জ্বর ও দ্রুত শরীরের ওজন হ্রাসে ভুগছেন; রক্ত পরীক্ষায় দেখা গেল তার রক্তে রোগপ্রতিরোধকারী শ্বেত রক্তকণিকার সংখ্যা আশঙ্কাজনকভাবে কমে গেছে।",
    options: null,
    explanation: {
      directAnswer: "রোগী-X সিফিলিস (Treponema pallidum) এবং রোগী-Y এইডস (HIV/AIDS) রোগে আক্রান্ত।",
      coreConcept: "যৌনবাহিত সংক্রামক রোগসমূহের কারণ, লক্ষণ, সংক্রমণ পথ ও স্বাস্থ্যবিধিসম্মত প্রতিরোধ ব্যবস্থা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 251
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "WHO প্রদত্ত প্রজনন স্বাস্থ্যের সংজ্ঞাটি লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "এইচআইভি পজিটিভ রোগীর সাথে হাত মেলালে বা একই থালায় খেলে এইডস ছড়ায় না কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "রোগী-X এর রোগের নাম ও ক্ষতিকর জীবাণুটির বৈজ্ঞানিক নাম উল্লেখপূর্বক এর শারীরিক পরিণতি বর্ণনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "রোগী-Y যে রোগে আক্রান্ত তার সংক্রমণ পথসমূহ বিশ্লেষণ করে সমাজ থেকে এটি প্রতিরোধের কার্যকর উপায় প্রস্তাব করা।"
      }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  }
];
