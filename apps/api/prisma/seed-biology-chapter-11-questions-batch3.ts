import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter11QuestionsBatch3: QuestionData[] = [
  // -------------------------------------------------------------
  // Topic 11.1: প্রজননের ধারণা ও গুরুত্ব (MCQs 61 - 64)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_61",
    topicId: "top_ssc_biology_ch11_1",
    type: "MCQ",
    stem: "প্রজননের ক্ষেত্রে কোনটি একক জীবের বেঁচে থাকার চেয়ে প্রজাতির অস্তিত্বের জন্য বেশি সত্য?",
    options: [
      { id: "opt_bio_11_61_a", text: "প্রজনন না ঘটলে একক জীবটির তাৎক্ষণিক মৃত্যু ঘটে", isCorrect: false },
      { id: "opt_bio_11_61_b", text: "প্রজনন না ঘটলে একক জীব বেঁচে থাকে কিন্তু সামগ্রিক প্রজাতি বিলুপ্ত হয়ে যায়", isCorrect: true },
      { id: "opt_bio_11_61_c", text: "প্রজনন কেবল এককোষী জীবদের জন্যই প্রযোজ্য", isCorrect: false },
      { id: "opt_bio_11_61_d", text: "প্রজননের ফলে জীবের কোনো নতুন বংশধর জন্মায় না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: প্রজনন না ঘটলে একক জীব বেঁচে থাকে কিন্তু সামগ্রিক প্রজাতি বিলুপ্ত হয়ে যায়।",
      coreConcept: "শ্বসন বা রেচনের মতো প্রজনন একক জীবের তাৎক্ষণিক জীবনধারণের শর্ত নয়। প্রজনন না করেও একটি জীব পূর্ণায়ু বাঁচতে পারে, কিন্তু বংশধর না থাকলে প্রজাতি চিরতরে হারিয়ে যায়।",
      distractorAnalysis: {
        opt_bio_11_61_a: "প্রজনন বন্ধ হলে একক জীবের তাৎক্ষণিক মৃত্যু হয় না।",
        opt_bio_11_61_c: "প্রজনন এককোষী ও বহুকোষী সব জীবের সার্বজনীন বৈশিষ্ট্য।",
        opt_bio_11_61_d: "নতুন বংশধর সৃষ্টিই প্রজননের মূল ফলাফল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 233
      },
      proTipShortcut: "জীবনের জন্য পুষ্টি, প্রজাতির জন্য প্রজনন।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_62",
    topicId: "top_ssc_biology_ch11_1",
    type: "MCQ",
    stem: "অযৌন প্রজনন প্রধানত কোন ধরনের জীবগুলোতে ব্যাপকভাবে দেখা যায়?",
    options: [
      { id: "opt_bio_11_62_a", text: "উন্নত স্তন্যপায়ী প্রাণী", isCorrect: false },
      { id: "opt_bio_11_62_b", text: "নিম্নশ্রেণির জীব, ব্যাকটেরিয়া, শৈবাল ও ছত্রাক", isCorrect: true },
      { id: "opt_bio_11_62_c", text: "পাখি ও সরীসৃপ", isCorrect: false },
      { id: "opt_bio_11_62_d", text: "সকল উন্নত উভচর প্রাণী", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: নিম্নশ্রেণির জীব, ব্যাকটেরিয়া, শৈবাল ও ছত্রাক।",
      coreConcept: "অ্যামাইটোসিস, স্পোর উৎপাদন বা দ্বি-ভাজনের মাধ্যমে অযৌন প্রজনন প্রধানত নিম্নশ্রেণির উদ্ভিদ ও অণুজীবগুলোতে ঘটে।",
      distractorAnalysis: {
        opt_bio_11_62_a: "স্তন্যপায়ী প্রাণীতে কেবল যৌন প্রজনন ঘটে।",
        opt_bio_11_62_c: "পাখি ও সরীসৃপে যৌন প্রজনন বাধ্যতামূলক।",
        opt_bio_11_62_d: "উভচর প্রাণীরা যৌন প্রজননের মাধ্যমে ডিম পাড়ে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 234
      },
      proTipShortcut: "নিম্নশ্রেণির সরল জীবে অযৌন প্রজনন বেশি দেখা যায়।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_63",
    topicId: "top_ssc_biology_ch11_1",
    type: "MCQ",
    stem: "যৌন প্রজননে দুটি হ্যাপ্লয়েড ($n$) গ্যামেটের মিলনের ফলে সৃষ্ট কোষটির প্রকৃতি কী?",
    options: [
      { id: "opt_bio_11_63_a", text: "হ্যাপ্লয়েড ($n$)", isCorrect: false },
      { id: "opt_bio_11_63_b", text: "ডিপ্লয়েড ($2n$) জাইগোট", isCorrect: true },
      { id: "opt_bio_11_63_c", text: "ট্রিপ্লয়েড ($3n$)", isCorrect: false },
      { id: "opt_bio_11_63_d", text: "টেট্রাপ্লয়েড ($4n$)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ডিপ্লয়েড ($2n$) জাইগোট।",
      coreConcept: "পুং গ্যামেট ($n$) ও স্ত্রী গ্যামেট ($n$) মিলিত হয়ে ডিপ্লয়েড ($2n$) জাইগোট তৈরি করে, যা প্রতিটি বহুকোষী জীবের জীবনের প্রথম সূচনা কোষ।",
      distractorAnalysis: {
        opt_bio_11_63_a: "হ্যাপ্লয়েড থাকে কেবল গ্যামেটে।",
        opt_bio_11_63_c: "ট্রিপ্লয়েড হলো আবৃতবীজী উদ্ভিদের শস্য কলা।",
        opt_bio_11_63_d: "স্বাভাবিক যৌন নিষেকের জাইগোট টেট্রাপ্লয়েড হয় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 234
      },
      proTipShortcut: "$1n + 1n = 2n$ জাইগোট।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_64",
    topicId: "top_ssc_biology_ch11_1",
    type: "MCQ",
    stem: "কোন প্রক্রিয়ার কারণে যৌন প্রজননরত প্রজাতির মধ্যে কোটি বছর ধরে নির্দিষ্ট ক্রোমোজোম সংখ্যা অপরিবর্তিত থাকে?",
    options: [
      { id: "opt_bio_11_64_a", text: "গ্যামেট সৃষ্টির সময় মিয়োসিস বিভাজন ও নিষেকের মাধ্যমে দ্বিগুণ হওয়া", isCorrect: true },
      { id: "opt_bio_11_64_b", text: "কেবল অবিরাম মাইটোসিস বিভাজন", isCorrect: false },
      { id: "opt_bio_11_64_c", text: "কোষপ্রাচীর পুরু হয়ে যাওয়া", isCorrect: false },
      { id: "opt_bio_11_64_d", text: "কোষঝিল্লির অভিস্রবণ নিয়ন্ত্রণ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: গ্যামেট সৃষ্টির সময় মিয়োসিস বিভাজন ও নিষেকের মাধ্যমে দ্বিগুণ হওয়া।",
      coreConcept: "মিয়োসিসে জননকোষে ক্রোমোজোম অর্ধেক ($n$) হয় এবং নিষেকের সময় দুই গ্যামেটের মিলনে পুনরায় দ্বিগুণ ($2n$) হয়। এই যুগলবন্দী প্রক্রিয়ায় ক্রোমোজোম সংখ্যা চিরকাল ধ্রুব থাকে।",
      distractorAnalysis: {
        opt_bio_11_64_b: "কেবল মাইটোসিস হলে প্রতি প্রজন্মে ক্রোমোজোম সংখ্যা দ্বিগুণ হয়ে ক্রোমোজোমীয় ভারসাম্য ধ্বংস হতো।",
        opt_bio_11_64_c: "কোষপ্রাচীরের পুরুত্বের সাথে ক্রোমোজোমের সম্পর্ক নেই।",
        opt_bio_11_64_d: "অভিস্রবণ তরল ও দ্রাবক প্রবাহ নিয়ন্ত্রণ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 234
      },
      proTipShortcut: "মিয়োসিস কমায় ($2n \\to n$), নিষেক মেলায় ($n + n \\to 2n$)।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.2: একটি আদর্শ ফুল ও পুষ্পমঞ্জরি (MCQs 65 - 68)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_65",
    topicId: "top_ssc_biology_ch11_2",
    type: "MCQ",
    stem: "সবুজ রঙের বৃতির প্রধান কাজ কোনটি?",
    options: [
      { id: "opt_bio_11_65_a", text: "মকরন্দ তৈরি করে মৌমাছি আকর্ষণ করা", isCorrect: false },
      { id: "opt_bio_11_65_b", text: "কুঁড়ি অবস্থায় ভেতরের স্তবক রক্ষা করা ও সালোকসংশ্লেষণ করা", isCorrect: true },
      { id: "opt_bio_11_65_c", text: "পরাগরেণু গর্ভমুণ্ডে স্থানান্তর করা", isCorrect: false },
      { id: "opt_bio_11_65_d", text: "ফল ও বীজের অঙ্কুরোদগম নিয়ন্ত্রণ করা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কুঁড়ি অবস্থায় ভেতরের স্তবক রক্ষা করা ও সালোকসংশ্লেষণ করা।",
      coreConcept: "বৃতি ফুলের সবচেয়ে বাইরের স্তবক। সবুজ হওয়ায় এটি খাদ্য তৈরি করে এবং কুঁড়ির ভেতরের কোমল অংশগুলোকে রোদ, বৃষ্টি ও পোকামাকড় থেকে রক্ষা করে।",
      distractorAnalysis: {
        opt_bio_11_65_a: "মকরন্দ ও আকর্ষণ দলমণ্ডলের কাজ।",
        opt_bio_11_65_c: "পরাগরেণু স্থানান্তর করে বাহক (পরাগায়ন)।",
        opt_bio_11_65_d: "বীজের অঙ্কুরোদগম বীজের নিজস্ব শারীরবৃত্তীয় ঘটনা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 236
      },
      proTipShortcut: "সবুজ বৃতি = পাহারা ও খাদ্য তৈরি।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_66",
    topicId: "top_ssc_biology_ch11_2",
    type: "MCQ",
    stem: "স্ত্রীস্তবকের কোন অংশটি নিষেকের পর ফলে এবং কোন অংশটি বীজে পরিণত হয়?",
    options: [
      { id: "opt_bio_11_66_a", text: "ডিম্বক ফলে এবং গর্ভাশয় বীজে", isCorrect: false },
      { id: "opt_bio_11_66_b", text: "গর্ভাশয় ফলে এবং ডিম্বক বীজে", isCorrect: true },
      { id: "opt_bio_11_66_c", text: "গর্ভমুণ্ড ফলে এবং গর্ভদণ্ড বীজে", isCorrect: false },
      { id: "opt_bio_11_66_d", text: "পুষ্পাক্ষ ফলে এবং বৃতি বীজে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: গর্ভাশয় ফলে এবং ডিম্বক বীজে।",
      coreConcept: "নিষেকের পর উদ্দীপনার প্রভাবে সম্পূর্ণ গর্ভাশয় ফলে এবং এর ভেতরের ডিম্বকগুলো বীজে পরিণত হয়।",
      distractorAnalysis: {
        opt_bio_11_66_a: "এটি বিপরীত তথ্য।",
        opt_bio_11_66_c: "গর্ভমুণ্ড ও গর্ভদণ্ড নিষেকের পর সাধারণত শুকিয়ে ঝরে যায়।",
        opt_bio_11_66_d: "বৃতি সাধারণত ঝরে পড়ে, কখনো বীজে পরিণত হয় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 236
      },
      proTipShortcut: "মনে রাখো: গ-ফ (গর্ভাশয়=ফল), ডি-বি (ডিম্বক=বীজ)।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_67",
    topicId: "top_ssc_biology_ch11_2",
    type: "MCQ",
    stem: "ধুতুরা ও জবা ফুল কোন ধরনের ফুলের উদাহরণ?",
    options: [
      { id: "opt_bio_11_67_a", text: "সম্পূর্ণ ও উভলিঙ্গ ফুল", isCorrect: true },
      { id: "opt_bio_11_67_b", text: "অসম্পূর্ণ ও একলিঙ্গ ফুল", isCorrect: false },
      { id: "opt_bio_11_67_c", text: "ক্লীব ফুল", isCorrect: false },
      { id: "opt_bio_11_67_d", text: "অসম্পূর্ণ ও ক্লীব ফুল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সম্পূর্ণ ও উভলিঙ্গ ফুল।",
      coreConcept: "ধুতুরা ও জবা ফুলে পুষ্পাক্ষ, বৃতি, দলমণ্ডল, পুংস্তবক ও স্ত্রীস্তবক পাঁচটি স্তবকই উপস্থিত থাকে এবং একই ফুলে পুং ও স্ত্রী দুই স্তবকই থাকে।",
      distractorAnalysis: {
        opt_bio_11_67_b: "লাউ ও কুমড়া হলো অসম্পূর্ণ ও একলিঙ্গ।",
        opt_bio_11_67_c: "ক্লীব ফুলে পুং বা স্ত্রী স্তবক থাকে না।",
        opt_bio_11_67_d: "জবা বা ধুতুরা ক্লীব নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 237
      },
      proTipShortcut: "জবা ও ধুতুরা = সম্পূর্ণ ও উভলিঙ্গ।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_68",
    topicId: "top_ssc_biology_ch11_2",
    type: "MCQ",
    stem: "পুষ্পমঞ্জরি অক্ষের বৃদ্ধি যদি অনির্দিষ্ট হয় এবং পার্শ্বীয় ফুলগুলো ক্রমাগত ফুটতে থাকে তাকে কী বলে?",
    options: [
      { id: "opt_bio_11_68_a", text: "নিয়ত পুষ্পমঞ্জরি (Cymose)", isCorrect: false },
      { id: "opt_bio_11_68_b", text: "অনিয়ত পুষ্পমঞ্জরি (Racemose)", isCorrect: true },
      { id: "opt_bio_11_68_c", text: "একপুষ্পক পুষ্পমঞ্জরি", isCorrect: false },
      { id: "opt_bio_11_68_d", text: "ক্লীব পুষ্পমঞ্জরি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অনিয়ত পুষ্পমঞ্জরি (Racemose)।",
      coreConcept: "অনিয়ত পুষ্পমঞ্জরির শীর্ষমুকুল ক্রমাগত বাড়তে থাকে এবং নিচ থেকে ক্রমান্বয়ে ফুল ফুটতে থাকে (যেমন সরিষা)।",
      distractorAnalysis: {
        opt_bio_11_68_a: "নিয়ত পুষ্পমঞ্জরিতে শীর্ষে ফুল ফুটে বৃদ্ধি বন্ধ হয়ে যায়।",
        opt_bio_11_68_c: "একপুষ্পক কোনো পুষ্পমঞ্জরির প্রধান শ্রেণিবিভাগ নয়।",
        opt_bio_11_68_d: "ক্লীব পুষ্পমঞ্জরি বলতে কোনো বৈজ্ঞানিক প্রকারভেদ নেই।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 237
      },
      proTipShortcut: "অসীম বৃদ্ধি = অনিয়ত (Racemose)।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.3: পরাগায়ন ও রূপতাত্ত্বিক অভিযোজন (MCQs 69 - 72)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_69",
    topicId: "top_ssc_biology_ch11_3",
    type: "MCQ",
    stem: "ধুতুরা ও সরিষা ফুলে সাধারণত কোন ধরনের পরাগায়ন ঘটে?",
    options: [
      { id: "opt_bio_11_69_a", text: "পর-পরাগায়ন", isCorrect: false },
      { id: "opt_bio_11_69_b", text: "স্ব-পরাগায়ন (Self-pollination)", isCorrect: true },
      { id: "opt_bio_11_69_c", text: "পানিপরাগায়ন", isCorrect: false },
      { id: "opt_bio_11_69_d", text: "পাখিপরাগায়ন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: স্ব-পরাগায়ন (Self-pollination)।",
      coreConcept: "ধুতুরা ও সরিষা উভলিঙ্গ ফুল এবং একই ফুলে পুংকেশর ও গর্ভমুণ্ড কাছাকাছি অবস্থান করায় এতে স্ব-পরাগায়ন সম্পন্ন হয়।",
      distractorAnalysis: {
        opt_bio_11_69_a: "পর-পরাগায়ন শিমুল ও পেঁপেতে ঘটে।",
        opt_bio_11_69_c: "পানিপরাগায়ন ঘটে পাতাঝাঁঝিতে।",
        opt_bio_11_69_d: "পাখিপরাগায়ন ঘটে শিমুল ও কদমে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 238
      },
      proTipShortcut: "সরিষা ও ধুতুরা = ক্লাসিক স্ব-পরাগায়ন।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_70",
    topicId: "top_ssc_biology_ch11_3",
    type: "MCQ",
    stem: "বায়ুপরাগী ফুলের পরাগরেণু কেমন হয়?",
    options: [
      { id: "opt_bio_11_70_a", text: "অত্যন্ত ভারী ও আঠালো", isCorrect: false },
      { id: "opt_bio_11_70_b", text: "অসংখ্য, ক্ষুদ্র, শুষ্ক, মসৃণ ও হালকা", isCorrect: true },
      { id: "opt_bio_11_70_c", text: "মোমের পুরু আবরণে ঢাকা", isCorrect: false },
      { id: "opt_bio_11_70_d", text: "কাঁটাযুক্ত ও ঘন রঙিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অসংখ্য, ক্ষুদ্র, শুষ্ক, মসৃণ ও হালকা।",
      coreConcept: "বাতাসে ভর করে দূর-দূরান্তে ভেসে যাওয়ার জন্য বায়ুপরাগী ফুলের পরাগরেণু অত্যন্ত হালকা, শুষ্ক ও মসৃণ হতে হয় (যেমন ধান, ঘাস)।",
      distractorAnalysis: {
        opt_bio_11_70_a: "ভারী ও আঠালো পরাগরেণু পতঙ্গপরাগী ফুলের।",
        opt_bio_11_70_c: "মোমের আবরণ পানিপরাগী ফুলের বৈশিষ্ট্য।",
        opt_bio_11_70_d: "কাঁটাযুক্ত পরাগরেণু পতঙ্গের শরীরে আটকাতে দরকার হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 239
      },
      proTipShortcut: "বাতাসে উড়তে হলে ওজনহীন ও শুষ্ক হতে হবে।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_71",
    topicId: "top_ssc_biology_ch11_3",
    type: "MCQ",
    stem: "কদম ও শিমুল গাছে পরাগায়ন প্রধানত কোন মাধ্যমের সাহায্যে ঘটে?",
    options: [
      { id: "opt_bio_11_71_a", text: "বায়ু", isCorrect: false },
      { id: "opt_bio_11_71_b", text: "পানি", isCorrect: false },
      { id: "opt_bio_11_71_c", text: "প্রাণী (পাখি/বাদুড়)", isCorrect: true },
      { id: "opt_bio_11_71_d", text: "স্বতঃস্ফূর্ত স্ব-সংযোগ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: প্রাণী (পাখি/বাদুড়)।",
      coreConcept: "কদম ও শিমুল ফুলের বড় আকার ও মধুর কারণে বিভিন্ন পাখি ও বাদুড় আকৃষ্ট হয় এবং পরাগায়ন ঘটায়, তাই এরা প্রাণিপরাগী ফুল।",
      distractorAnalysis: {
        opt_bio_11_71_a: "বায়ুপরাগী ফুলে সুবাস ও বড় আকার থাকে না।",
        opt_bio_11_71_b: "পানিপরাগায়ন স্থলজ বৃক্ষে ঘটে না।",
        opt_bio_11_71_d: "শিমুলে পর-পরাগায়ন বাধ্যতামূলক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 239
      },
      proTipShortcut: "কদম ও শিমুল = প্রাণিপরাগী (Ornithophilous)।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_72",
    topicId: "top_ssc_biology_ch11_3",
    type: "MCQ",
    stem: "পর-পরাগায়নের প্রধান অপকারী দিক বা অসুবিধা কোনটি?",
    options: [
      { id: "opt_bio_11_72_a", text: "নতুন কোনো প্রকরণ সৃষ্টি হয় না", isCorrect: false },
      { id: "opt_bio_11_72_b", text: "বাহকের ওপর সম্পূর্ণ নির্ভরতা এবং প্রচুর পরাগরেণুর অপচয় ঘটে", isCorrect: true },
      { id: "opt_bio_11_72_c", text: "রোগপ্রতিরোধ ক্ষমতা বেড়ে যায়", isCorrect: false },
      { id: "opt_bio_11_72_d", text: "গাছের পাতাগুলো শুকিয়ে যায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বাহকের ওপর সম্পূর্ণ নির্ভরতা এবং প্রচুর পরাগরেণুর অপচয় ঘটে।",
      coreConcept: "পর-পরাগায়নে বাতাস বা পতঙ্গ না থাকলে পরাগায়ন ব্যর্থ হতে পারে এবং বাতাসে প্রচুর পরাগরেণু নষ্ট হয়।",
      distractorAnalysis: {
        opt_bio_11_72_a: "পর-পরাগায়নে নতুন প্রকরণ নিশ্চিতভাবেই সৃষ্টি হয়।",
        opt_bio_11_72_c: "রোগপ্রতিরোধ বৃদ্ধি পাওয়া সুবিধা, অসুবিধা নয়।",
        opt_bio_11_72_d: "পাতা শুকানোর সাথে পরাগায়নের সম্পর্ক নেই।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 238
      },
      proTipShortcut: "পর-পরাগায়নের খরচ = প্রচুর অপচয় ও অনিশ্চয়তা।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.4: গ্যামেটোফাইট ও উদ্ভিদের নিষেক (MCQs 73 - 76)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_73",
    topicId: "top_ssc_biology_ch11_4",
    type: "MCQ",
    stem: "পুং গ্যামেটোফাইটের পরাগনালিকার অগ্রভাগে কোন নিউক্লিয়াসটি পথপ্রদর্শক হিসেবে অবস্থান করে?",
    options: [
      { id: "opt_bio_11_73_a", text: "জনন নিউক্লিয়াস", isCorrect: false },
      { id: "opt_bio_11_73_b", text: "নালিকা নিউক্লিয়াস (Tube nucleus)", isCorrect: true },
      { id: "opt_bio_11_73_c", text: "গৌণ নিউক্লিয়াস", isCorrect: false },
      { id: "opt_bio_11_73_d", text: "প্রতিপাদ নিউক্লিয়াস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: নালিকা নিউক্লিয়াস (Tube nucleus)।",
      coreConcept: "পরাগনালিকা বৃদ্ধির সময় এর শীর্ষভাগে নালিকা নিউক্লিয়াস অবস্থান করে এবং গর্ভদণ্ডের মধ্য দিয়ে পথ তৈরি করে এগিয়ে যায়।",
      distractorAnalysis: {
        opt_bio_11_73_a: "জনন নিউক্লিয়াস পেছনে থাকে এবং বিভাজিত হয়ে দুটি শুক্রাণু গঠন করে।",
        opt_bio_11_73_c: "গৌণ নিউক্লিয়াস ডিম্বকের ভ্রূণথলিতে থাকে।",
        opt_bio_11_73_d: "প্রতিপাদ নিউক্লিয়াস ভ্রূণথলির ডিম্বকমূলের দিকে থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 240
      },
      proTipShortcut: "টিউব বা নালির সামনে থাকে নালিকা নিউক্লিয়াস।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_74",
    topicId: "top_ssc_biology_ch11_4",
    type: "MCQ",
    stem: "৮ নিউক্লিয়াসবিশিষ্ট ভ্রূণথলির কেন্দ্রে অবস্থিত ডিপ্লয়েড ($2n$) কোষটির নাম কী?",
    options: [
      { id: "opt_bio_11_74_a", text: "ডিম্বাণু", isCorrect: false },
      { id: "opt_bio_11_74_b", text: "সহকারী কোষ", isCorrect: false },
      { id: "opt_bio_11_74_c", text: "গৌণ বা সেকেন্ডারি নিউক্লিয়াস", isCorrect: true },
      { id: "opt_bio_11_74_d", text: "প্রতিপাদ কোষ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: গৌণ বা সেকেন্ডারি নিউক্লিয়াস।",
      coreConcept: "উভয় মেরু থেকে আসা দুটি হ্যাপ্লয়েড নিউক্লিয়াস কেন্দ্রে মিলিত হয়ে ডিপ্লয়েড ($2n$) গৌণ নিউক্লিয়াস তৈরি করে।",
      distractorAnalysis: {
        opt_bio_11_74_a: "ডিম্বাণু হলো হ্যাপ্লয়েড ($n$) কোষ।",
        opt_bio_11_74_b: "সহকারী কোষ দুটিও হ্যাপ্লয়েড ($n$)।",
        opt_bio_11_74_d: "প্রতিপাদ কোষগুলোও হ্যাপ্লয়েড ($n$)।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 241
      },
      proTipShortcut: "ভ্রূণথলির মাঝে দুটি নিউক্লিয়াস একসাথে = $2n$ গৌণ নিউক্লিয়াস।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_75",
    topicId: "top_ssc_biology_ch11_4",
    type: "MCQ",
    stem: "আবৃতবীজী উদ্ভিদের দ্বিনিষেক প্রক্রিয়ার আবিষ্কার ও বৈশিষ্ট্য কোনটি?",
    options: [
      { id: "opt_bio_11_75_a", text: "একটি পুং গ্যামেট ডিম্বাণুকে এবং অপরটি গৌণ নিউক্লিয়াসকে যুগপৎ নিষিক্ত করে", isCorrect: true },
      { id: "opt_bio_11_75_b", text: "দুটি ডিম্বাণু একসাথে মিলিত হয়", isCorrect: false },
      { id: "opt_bio_11_75_c", text: "কোনো শুক্রাণু ছাড়াই ফল তৈরি হয়", isCorrect: false },
      { id: "opt_bio_11_75_d", text: "পরাগরেণু পানিতে ভেসে নষ্ট হয়ে যায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: একটি পুং গ্যামেট ডিম্বাণুকে এবং অপরটি গৌণ নিউক্লিয়াসকে যুগপৎ নিষিক্ত করে।",
      coreConcept: "একই সাথে দুটি পুং গ্যামেটের দ্বৈত মিলন ঘটে: একটি শুক্রাণু + ডিম্বাণু ⟶ জাইগোট ($2n$), অপর শুক্রাণু + গৌণ নিউক্লিয়াস ⟶ শস্য ($3n$)। একেই দ্বিনিষেক বলে।",
      distractorAnalysis: {
        opt_bio_11_75_b: "দুটি ডিম্বাণু মিলিত হয় না।",
        opt_bio_11_75_c: "শুক্রাণু ছাড়া ফল হওয়াকে পার্থেনোকার্পি বলে, দ্বিনিষেক নয়।",
        opt_bio_11_75_d: "পরাগরেণু নষ্ট হওয়া কোনো নিষেকের অংশ নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 242
      },
      proTipShortcut: "দ্বিনিষেক = জাইগোট ($2n$) + শস্য ($3n$)।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_76",
    topicId: "top_ssc_biology_ch11_4",
    type: "MCQ",
    stem: "একটি ফুলের একাধিক মুক্ত গর্ভাশয় থেকে সৃষ্ট ফলের সমষ্টিকে কী ফল বলে?",
    options: [
      { id: "opt_bio_11_76_a", text: "সরল ফল", isCorrect: false },
      { id: "opt_bio_11_76_b", text: "গুচ্ছ ফল (Aggregate fruit)", isCorrect: true },
      { id: "opt_bio_11_76_c", text: "যৌগিক ফল", isCorrect: false },
      { id: "opt_bio_11_76_d", text: "অপ্রকৃত ফল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: গুচ্ছ ফল (Aggregate fruit)।",
      coreConcept: "একটি ফুলের মুক্ত গর্ভাশয়গুলো পৃথকভাবে ফলে রূপ নিয়ে একটি সাধারণ পুষ্পাক্ষের ওপর গুচ্ছাকারে থাকে (যেমন আতা, শরিফা, চম্পা)।",
      distractorAnalysis: {
        opt_bio_11_76_a: "সরল ফল একটি মাত্র গর্ভাশয় থেকে তৈরি হয় (আম)।",
        opt_bio_11_76_c: "যৌগিক ফল পুরো পুষ্পমঞ্জরি থেকে তৈরি হয় (কাঁঠাল)।",
        opt_bio_11_76_d: "অপ্রকৃত ফল গর্ভাশয় ছাড়া পুষ্পাক্ষ থেকে ফলে রূপ নেয় (আপেল)।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 244
      },
      proTipShortcut: "আতা ও শরিফা = গুচ্ছ ফল।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.5: মানব প্রজননতন্ত্র ও ভ্রূণের বিকাশ (MCQs 77 - 80)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_77",
    topicId: "top_ssc_biology_ch11_5",
    type: "MCQ",
    stem: "পুরুষ প্রজননতন্ত্রে এপিডিডাইমিস থেকে মূত্রজনন নালি পর্যন্ত শুক্রাণু পরিবহন করে কোন নালি?",
    options: [
      { id: "opt_bio_11_77_a", text: "ভাস ডিফারেন্স (Vas deferens)", isCorrect: true },
      { id: "opt_bio_11_77_b", text: "ফ্যালোপিয়ান নালি", isCorrect: false },
      { id: "opt_bio_11_77_c", text: "ইউরেটার", isCorrect: false },
      { id: "opt_bio_11_77_d", text: "পিত্তনালি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ভাস ডিফারেন্স (Vas deferens)।",
      coreConcept: "ভাস ডিফারেন্স বা শুক্রনালি এপিডিডাইমিসের শেষ প্রান্ত থেকে শুরু হয়ে সেমিনাল ভেসিকল ও মূত্রজনন নালির দিকে শুক্রাণু বহন করে।",
      distractorAnalysis: {
        opt_bio_11_77_b: "ফ্যালোপিয়ান নালি স্ত্রীদেহে ডিম্বাণু পরিবহন করে।",
        opt_bio_11_77_c: "ইউরেটার বৃক্ক থেকে মূত্রথলিতে মূত্র বহন করে।",
        opt_bio_11_77_d: "পিত্তনালি যকৃত থেকে পিত্তরস গ্রহণী বা ডুওডেনামে পৌঁছে দেয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 245
      },
      proTipShortcut: "শুক্রনালি = ভাস ডিফারেন্স।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_78",
    topicId: "top_ssc_biology_ch11_5",
    type: "MCQ",
    stem: "স্ত্রীদেহে প্রতি মাসে সাধারণত কয়টি ডিম্বাশয় থেকে কয়টি ডিম্বাণু মুক্ত হয়?",
    options: [
      { id: "opt_bio_11_78_a", text: "উভয় ডিম্বাশয় থেকে একসাথে শত শত", isCorrect: false },
      { id: "opt_bio_11_78_b", text: "যেকোনো একটি ডিম্বাশয় থেকে পর্যায়ক্রমে ১টি ডিম্বাণু", isCorrect: true },
      { id: "opt_bio_11_78_c", text: "৪টি ডিম্বাণু একসাথে", isCorrect: false },
      { id: "opt_bio_11_78_d", text: "বছরে একবার মাত্র", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: যেকোনো একটি ডিম্বাশয় থেকে পর্যায়ক্রমে ১টি ডিম্বাণু।",
      coreConcept: "স্বাভাবিক মানব স্ত্রীদেহে প্রতি মাসে দুটি ডিম্বাশয়ের যেকোনো একটি থেকে পর্যায়ক্রমে একটি পরিণত ডিম্বাণু ডিম্বনালিতে মুক্ত হয়।",
      distractorAnalysis: {
        opt_bio_11_78_a: "মাছের ক্ষেত্রে শত শত ডিম্বাণু মুক্ত হয়, মানুষের ক্ষেত্রে নয়।",
        opt_bio_11_78_c: "সাধারণত একটিই মুক্ত হয় (ব্যতিক্রমী ক্ষেত্রে একাধিক মুক্ত হলে নন-আইডেন্টিকাল যমজ হতে পারে)।",
        opt_bio_11_78_d: "প্রতি ২৮ দিনের চক্রে এটি ঘটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 246
      },
      proTipShortcut: "মানুষের ক্ষেত্রে ১ মাসে ১টি ডিম্বাণু।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_79",
    topicId: "top_ssc_biology_ch11_5",
    type: "MCQ",
    stem: "জাইগোটে ক্লিভেজ বিভাজনের ফলে সৃষ্ট নিরেট কোষপিণ্ডটিকে কী বলা হয়?",
    options: [
      { id: "opt_bio_11_79_a", text: "ব্লাস্টোসিস্ট", isCorrect: false },
      { id: "opt_bio_11_79_b", text: "মরুলা (Morula)", isCorrect: true },
      { id: "opt_bio_11_79_c", text: "গ্যাস্ট্রুলা", isCorrect: false },
      { id: "opt_bio_11_79_d", text: "ফিটাস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মরুলা (Morula)।",
      coreConcept: "জাইগোট বিভাজিত হয়ে ১৬-৩২ কোষের একটি নিরেট গোলকাকার তুত ফলের মতো কোষপিণ্ড গঠন করে, যাকে মরুলা বলে।",
      distractorAnalysis: {
        opt_bio_11_79_a: "ব্লাস্টোসিস্ট ফাঁপা তরলপূর্ণ থলি।",
        opt_bio_11_79_c: "গ্যাস্ট্রুলা পরবর্তী জটিল দশা।",
        opt_bio_11_79_d: "ফিটাস হলো অঙ্গ-প্রত্যঙ্গ দৃশ্যমান ভ্রূণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 247
      },
      proTipShortcut: "মরুলা = নিরেট বল (Solid sphere)।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_80",
    topicId: "top_ssc_biology_ch11_5",
    type: "MCQ",
    stem: "ভ্রূণের নাভির সাথে অমরার সংযোগ স্থাপনকারী নালিটিকে কী বলে?",
    options: [
      { id: "opt_bio_11_80_a", text: "ফ্যালোপিয়ান নালি", isCorrect: false },
      { id: "opt_bio_11_80_b", text: "নাভিবন্ধু বা আম্বিলিকাল কর্ড (Umbilical cord)", isCorrect: true },
      { id: "opt_bio_11_80_c", text: "ভাস ডিফারেন্স", isCorrect: false },
      { id: "opt_bio_11_80_d", text: "লিম্ফ ডাক্ট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: নাভিবন্ধু বা আম্বিলিকাল কর্ড (Umbilical cord)।",
      coreConcept: "নাভিবন্ধুর ভেতরের দুটি ধমনি ও একটি শিরার মাধ্যমে ভ্রূণ অমরার সাথে যুক্ত থাকে এবং রক্ত আদান-প্রদান করে।",
      distractorAnalysis: {
        opt_bio_11_80_a: "ফ্যালোপিয়ান নালি ডিম্বাণু গ্রহণ ও নিষেকের স্থান।",
        opt_bio_11_80_c: "ভাস ডিফারেন্স পুরুষদের শুক্রনালি।",
        opt_bio_11_80_d: "লিম্ফ ডাক্ট লসিকা পরিবহন করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 248
      },
      proTipShortcut: "অমরা + নাভিবন্ধু = ভ্রূণের জীবনরেখা।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // Topic 11.6: প্রজনন স্বাস্থ্য ও যৌনবাহিত রোগ (MCQs 81 - 84)
  // -------------------------------------------------------------
  {
    id: "q_bio_11_81",
    topicId: "top_ssc_biology_ch11_6",
    type: "MCQ",
    stem: "বয়ঃসন্ধিকালে মেয়েদের শারীরিক ও মানসিক পরিবর্তনের জন্য প্রধানত দায়ী কোন হরমোনদ্বয়?",
    options: [
      { id: "opt_bio_11_81_a", text: "ইনসুলিন ও গ্লুকাগন", isCorrect: false },
      { id: "opt_bio_11_81_b", text: "ইস্ট্রোজেন ও প্রোজেস্টেরন", isCorrect: true },
      { id: "opt_bio_11_81_c", text: "টেস্টোস্টেরন ও অ্যাড্রেনালিন", isCorrect: false },
      { id: "opt_bio_11_81_d", text: "থাইরক্সিন ও প্যারাথরমোন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ইস্ট্রোজেন ও প্রোজেস্টেরন।",
      coreConcept: "ডিম্বাশয় থেকে নিঃসৃত ইস্ট্রোজেন ও প্রোজেস্টেরন হরমোন মেয়েদের বয়ঃসন্ধিকালীন শারীরিক বৃদ্ধি, স্তনের বিকাশ ও ঋতুচক্র নিয়ন্ত্রণ করে।",
      distractorAnalysis: {
        opt_bio_11_81_a: "ইনসুলিন ও গ্লুকাগন রক্তে গ্লুকোজের ভারসাম্য বজায় রাখে।",
        opt_bio_11_81_c: "টেস্টোস্টেরন ছেলেদের প্রধান পুরুষ হরমোন।",
        opt_bio_11_81_d: "থাইরক্সিন ও প্যারাথরমোন বিপাক ও ক্যালসিয়াম নিয়ন্ত্রণ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 250
      },
      proTipShortcut: "মেয়েদের হরমোন = ইস্ট্রোজেন ও প্রোজেস্টেরন।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_82",
    topicId: "top_ssc_biology_ch11_6",
    type: "MCQ",
    stem: "এইডস (AIDS) রোগ সম্পর্কে নিচের কোন উক্তিটি ভুল বা কুসংস্কার?",
    options: [
      { id: "opt_bio_11_82_a", text: "আক্রান্ত ব্যক্তির রক্ত নিলে সুস্থ ব্যক্তি এইডসে আক্রান্ত হয়", isCorrect: false },
      { id: "opt_bio_11_82_b", text: "আক্রান্ত গর্ভবতী মা থেকে সন্তানে এইডস সংক্রমিত হতে পারে", isCorrect: false },
      { id: "opt_bio_11_82_c", text: "আক্রান্ত ব্যক্তির সাথে একই গ্লাসে পানি পান করলে বা স্পর্শ করলে এইডস ছড়ায়", isCorrect: true },
      { id: "opt_bio_11_82_d", text: "অনিরাপদ শারীরিক মিলনে এইডস ছড়ায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: আক্রান্ত ব্যক্তির সাথে একই গ্লাসে পানি পান করলে বা স্পর্শ করলে এইডস ছড়ায়।",
      coreConcept: "HIV কেবল রক্ত, যৌন তরল ও মায়ের দুধের মাধ্যমে ছড়ায়। স্পর্শ, কোলাকুলি, খাবার ভাগাভাগি বা একই গ্লাসে পানি পানে HIV কখনোই ছড়ায় না।",
      distractorAnalysis: {
        opt_bio_11_82_a: "রক্ত পরিসঞ্চালনের মাধ্যমে HIV ছড়ায়, এটি সত্য তথ্য।",
        opt_bio_11_82_b: "মা থেকে সন্তানে অমরা ও দুধের মাধ্যমে ছড়ায়, এটিও সত্য।",
        opt_bio_11_82_d: "অনিরাপদ শারীরিক মিলন HIV সংক্রমণের প্রধান পথ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 251
      },
      proTipShortcut: "সামাজিক মেলামেশায় এইডস ছড়ায় না, সচেতনতাই শক্তি।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_83",
    topicId: "top_ssc_biology_ch11_6",
    type: "MCQ",
    stem: "সিফিলিস রোগের তৃতীয় বা অন্তিম পর্যায়ে মানবদেহের কোন অঙ্গগুলো মারাত্মকভাবে ক্ষতিগ্রস্ত হয়?",
    options: [
      { id: "opt_bio_11_83_a", text: "কেবল নখ ও চুল", isCorrect: false },
      { id: "opt_bio_11_83_b", text: "মস্তিষ্ক, হৃৎপিণ্ড, চোখ ও স্নায়ুতন্ত্র", isCorrect: true },
      { id: "opt_bio_11_83_c", text: "কেবল দাঁতের মাড়ি", isCorrect: false },
      { id: "opt_bio_11_83_d", text: "পিত্তথলি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মস্তিষ্ক, হৃৎপিণ্ড, চোখ ও স্নায়ুতন্ত্র।",
      coreConcept: "সিফিলিস চিকিৎসা না করালে Treponema pallidum ব্যাকটেরিয়া মস্তিষ্ক ও হৃৎপিণ্ডের ধমনিতে আক্রমণ করে পক্ষাঘাত, অন্ধত্ব ও উন্মাদনা সৃষ্টি করে।",
      distractorAnalysis: {
        opt_bio_11_83_a: "নখ ও চুল প্রধান ক্ষতির স্থান নয়।",
        opt_bio_11_83_c: "দাঁতের মাড়ির সাথে এর সরাসরি সম্পর্ক নেই।",
        opt_bio_11_83_d: "পিত্তথলি সিফিলিসের প্রধান টার্গেট নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 252
      },
      proTipShortcut: "সিফিলিসের অন্তিম পরিণতি = ব্রেন ও হার্ট ফেইলিউর।"
    },
    difficulty: "HARD",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_84",
    topicId: "top_ssc_biology_ch11_6",
    type: "MCQ",
    stem: "আক্রান্ত মায়ের গনোরিয়ার কারণে জন্ম নেওয়া নবজাতক শিশুর কোন অঙ্গে মারাত্মক প্রদাহ ও ক্ষতি হতে পারে?",
    options: [
      { id: "opt_bio_11_84_a", text: "চোখে তীব্র সংক্রমণ হয়ে অন্ধত্ব হতে পারে", isCorrect: true },
      { id: "opt_bio_11_84_b", text: "কানের পর্দা ফেটে যায়", isCorrect: false },
      { id: "opt_bio_11_84_c", text: "হাতের আঙুল অতিরিক্ত বাড়ে", isCorrect: false },
      { id: "opt_bio_11_84_d", text: "ফুসফুস সঙ্কুচিত হয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: চোখে তীব্র সংক্রমণ হয়ে অন্ধত্ব হতে পারে।",
      coreConcept: "প্রসবের সময় যোনিপথের Neisseria gonorrhoeae ব্যাকটেরিয়া নবজাতকের চোখে সংক্রমণ ঘটায় (অপথালমিয়া নিওনেটোরাম), যার দ্রুত চিকিৎসা না হলে শিশু স্থায়ীভাবে অন্ধ হয়ে যেতে পারে।",
      distractorAnalysis: {
        opt_bio_11_84_b: "কানের পর্দা ফাটার ঘটনা গনোরিয়া সংশ্লিষ্ট নয়।",
        opt_bio_11_84_c: "আঙুলের বৃদ্ধি জেনেটিক ত্রুটির কারণে হতে পারে।",
        opt_bio_11_84_d: "ফুসফুসের সংকোচন শ্বাসকষ্টের সমস্যা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 252
      },
      proTipShortcut: "নবজাতকের চোখের অন্ধত্ব ঠেকাতে মায়ের গনোরিয়া নিরাময় আবশ্যক।"
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------
  // CREATIVE QUESTIONS (CQs 85 - 90) - 1 CQ per topic
  // -------------------------------------------------------------
  {
    id: "q_bio_11_85",
    topicId: "top_ssc_biology_ch11_1",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান শিক্ষক ক্লাসে দুটি চার্ট প্রদর্শন করলেন। ১ম চার্টে দেখানো হলো একটি ব্যাকটেরিয়ার দ্বি-ভাজন এবং স্পোরোজেনেসিসের মাধ্যমে দ্রুত লক্ষ লক্ষ বংশধর তৈরি হচ্ছে। ২য় চার্টে দেখানো হলো দুটি বিপরীত লিঙ্গের জীবের পুং ও স্ত্রী গ্যামেট মিয়োসিস বিভাজনের মাধ্যমে উৎপন্ন হয়ে জাইগোট তৈরি করছে।",
    options: null,
    explanation: {
      directAnswer: "১ম চার্টটি অযৌন প্রজনন এবং ২য় চার্টটি যৌন প্রজনন নির্দেশ করছে।",
      coreConcept: "অযৌন ও যৌন প্রজননের কোষীয় কলাকৌশল এবং জীবজগতের ভারসাম্যে এদের তুলনামূলক প্রয়োজনীয়তা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.১",
        pageNumber: 233
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "দ্বি-ভাজন কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "প্রজনন একক জীবের জীবনরক্ষার চেয়ে প্রজাতির রক্ষার জন্য বেশি জরুরি কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "১ম ও ২য় চার্টের প্রজনন পদ্ধতির মধ্যে তিনটি মৌলিক পার্থক্য সারণির মাধ্যমে উপস্থাপন করা।"
      },
      gha: {
        mark: 4,
        criteria: "জীবজগতে কেবল ১ম চার্টের পদ্ধতি চালু থাকলে এবং ২য় চার্টের পদ্ধতি না থাকলে কী ধরনের পরিবেশীয় বিপর্যয় ঘটত তা বিশ্লেষণ করা।"
      }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_86",
    topicId: "top_ssc_biology_ch11_2",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান ক্লাসে শিক্ষক বোর্ডে একটি আদর্শ ফুলের লম্বচ্ছেদের চিত্র এঁকে এর চারটি প্রধান অংশ $A, B, C, D$ চিহ্নিত করলেন। তিনি বললেন, “$A$ হলো বাইরের সবুজ স্তর, $B$ রঙিন দলমণ্ডল, $C$ হলুদ পরাগরেণুযুক্ত দণ্ড এবং $D$ এর অভ্যন্তরে ডিম্বক অবস্থান করে।”",
    options: null,
    explanation: {
      directAnswer: "$A$ বৃতি, $B$ দলমণ্ডল, $C$ পুংস্তবক এবং $D$ স্ত্রীস্তবক নির্দেশ করছে।",
      coreConcept: "ফুলের স্তবকসমূহের অবস্থান, শারীরবৃত্তীয় কাজ এবং প্রজননে এদের প্রত্যক্ষ ও পরোক্ষ গুরুত্ব।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.২",
        pageNumber: 235
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "বৃত্যংশ কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "$C$ ও $D$ স্তবককে অত্যাবশ্যকীয় স্তবক বলা হয় কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকের $D$ স্তবকটির বিভিন্ন অংশের চিহ্নিত চিত্র অঙ্কনপূর্বক কাজ বর্ণনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "পরাগায়ন ও ফল উৎপাদনে $B$ ও $C$ স্তবকের পারস্পরিক নির্ভরশীলতা মূল্যায়ন করা।"
      }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_87",
    topicId: "top_ssc_biology_ch11_3",
    type: "CQ_CREATIVE",
    stem: "একটি কৃষি খামারে দুটি আলাদা প্লটে সরিষা ও পেঁপে চাষ করা হলো। সরিষা গাছের ফুলগুলোতে কোনো বাহকের উপস্থিতি ছাড়াই প্রচুর বীজ গঠিত হলো। কিন্তু পেঁপে গাছের প্লটে শুধু স্ত্রী ফুলযুক্ত গাছ ছিল এবং আশেপাশে কোনো পুরুষ পেঁপে গাছ বা বাতাস-কীটপতঙ্গ না থাকায় কোনো ফুল থেকেই ফল তৈরি হলো না।",
    options: null,
    explanation: {
      directAnswer: "সরিষায় স্ব-পরাগায়ন নিশ্চিত হওয়ায় বীজ হয়েছে, কিন্তু পেঁপে একলিঙ্গ ও পর-পরাগী হওয়ায় পুরুষ ফুলের অভাবে পরাগায়ন ঘটেনি।",
      coreConcept: "স্ব-পরাগায়ন ও পর-পরাগায়নের নির্ভরশীলতা এবং একলিঙ্গ উদ্ভিদে বাহক ও পুরুষ ফুলের অপরিহার্যতা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৩",
        pageNumber: 238
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "স্ব-পরাগায়ন কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "পেঁপে গাছে পর-পরাগায়ন বাধ্যতামূলক কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "সরিষা ক্ষেতে স্বাভাবিক বীজ উৎপাদনের কারণ স্ব-পরাগায়নের আলোকে আলোচনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "পেঁপে ক্ষেতে ফলন নিশ্চিত করতে এবং উন্নত নতুন জাত পেতে কৃষককে কী পদক্ষেপ গ্রহণ করতে হবে তা বিশ্লেষণ করা।"
      }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_88",
    topicId: "top_ssc_biology_ch11_4",
    type: "CQ_CREATIVE",
    stem: "একটি আবৃতবীজী উদ্ভিদের ডিম্বকে মেগাস্পোরোজেনেসিস প্রক্রিয়ায় ৮ নিউক্লিয়াসবিশিষ্ট ভ্রূণথলি গঠিত হলো। পরাগায়নের পর পরাগনালিকা থেকে আগত দুটি পুং জননকোষের একটি ডিম্বাণুকে এবং অপরটি গৌণ নিউক্লিয়াসকে যুগপৎ নিষিক্ত করল। নিষেকের পর ডিম্বকটি বীজে এবং গর্ভাশয় ফলে রূপ নিল।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে স্ত্রী গ্যামেটোফাইটের উৎপত্তি, দ্বিনিষেক ও ত্রিমিলন এবং ফল-বীজ রূপান্তর বর্ণিত হয়েছে।",
      coreConcept: "আবৃতবীজী উদ্ভিদের দ্বিনিষেকের স্বকীয়তা, ট্রিপ্লয়েড শস্য গঠন এবং নিষেকের পরিণতি।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৪",
        pageNumber: 242
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "ত্রিমিলন (Triple fusion) কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "আবৃতবীজী উদ্ভিদের শস্যকে ট্রিপ্লয়েড ($3n$) বলা হয় কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকের ভ্রূণথলিতে কীভাবে ৮টি নিউক্লিয়াস সুসজ্জিত থাকে তা চিহ্নিত চিত্রসহ বর্ণনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "“উদ্ভিদের দ্বিনিষেক প্রক্রিয়াটি শুধু উদ্ভিদের বংশবিস্তার নয়, মানবজাতির খাদ্য নিরাপত্তার প্রধান উৎস”—উক্তিটির যথার্থতা মূল্যায়ন করা।"
      }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_89",
    topicId: "top_ssc_biology_ch11_5",
    type: "CQ_CREATIVE",
    stem: "ডাক্তার রেশমা সুলতানা একজন গর্ভবতী নারীকে আল্ট্রাসনোগ্রাম রিপোর্ট দেখিয়ে বললেন, “আপনার গর্ভস্থ শিশুটি চমৎকারভাবে বাড়ছে। শিশুটির নাভি থেকে একটি শক্ত রজ্জু আপনার জরায়ুর প্রাচীরে গঠিত অমরা বা গর্ভফুলের সাথে যুক্ত রয়েছে। এই অমরা আপনার রক্ত থেকে অক্সিজেন ও খাবার শিশুকে দিচ্ছে এবং শিশুর বর্জ্য আপনার শরীরে সরিয়ে দিচ্ছে। তবে আপনার ও শিশুর রক্ত কখনো একে অপরের সাথে সরাসরি মেশে না।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে অমরা (Placenta), নাভিবন্ধু এবং রক্ত-অমরা বাধার শারীরবৃত্তীয় ভূমিকা ব্যাখ্যা করা হয়েছে।",
      coreConcept: "ভ্রূণের বৃদ্ধি, অমরার পুষ্টি-শ্বসন-রেচন ও অন্তঃক্ষরা কার্যাবলী এবং নাভিবন্ধুর গঠন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৫",
        pageNumber: 248
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "নাভিবন্ধু (Umbilical cord) কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "অমরা থেকে ক্ষরিত প্রোজেস্টেরন হরমোন গর্ভধারণের জন্য কেন জরুরি তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকের বক্তব্যের আলোকে অমরা কীভাবে ভ্রূণের শ্বসন ও রেচনের দায়িত্ব পালন করে তা বর্ণনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "“মা ও শিশুর রক্ত সরাসরি না মিশে ব্যাপন প্রক্রিয়ায় আদান-প্রদান ভ্রূণের জীবনের জন্য এক অপূর্ব প্রাকৃতিক সুরক্ষা”—যুক্তিসহ বিশ্লেষণ করো।"
      }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_11_90",
    topicId: "top_ssc_biology_ch11_6",
    type: "CQ_CREATIVE",
    stem: "একটি স্বাস্থ্য ক্যাম্পেইনে দুটি পোস্টার প্রদর্শিত হলো। পোস্টার-১ এ লেখা: “একটি মারাত্মক যৌনবাহিত রোগ যাতে মূত্রনালির তীব্র প্রদাহে পুঁজ নির্গত হয় এবং সঠিক সময়ে চিকিৎসা না করলে পুরুষ ও নারী উভয়ের স্থায়ী বন্ধ্যাত্ব ঘটতে পারে।” পোস্টার-২ এ লেখা: “একটি ভাইরাসজনিত মরণব্যাধি যা রক্ত গ্রহণ, অনিয়ন্ত্রিত মিলন বা আক্রান্ত মায়ের মাধ্যমে ছড়ায় এবং দেহের রোগ প্রতিরোধ ক্ষমতাকে সমূলে ধ্বংস করে।”",
    options: null,
    explanation: {
      directAnswer: "পোস্টার-১ গনোরিয়া (Neisseria gonorrhoeae) এবং পোস্টার-২ এইডস (HIV/AIDS) রোগ নির্দেশ করছে।",
      coreConcept: "যৌনবাহিত সংক্রামক রোগের প্যাথোজেন, সংক্রমণ পথ, শারীরিক পরিণতি ও সার্বিক প্রতিকার-প্রতিরোধ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "একাদশ অধ্যায়: জীবের প্রজনন · ১১.৬",
        pageNumber: 251
      }
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "গনোরিয়া সৃষ্টিকারী ব্যাকটেরিয়ার নাম লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "পোস্টার-২ এর রোগটিকে কেন সিনড্রোম (Syndrome) বলা হয় তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "পোস্টার-১ এ বর্ণিত রোগটির বিস্তার ও ভয়াবহ পরিণতির বিবরণ দাও।"
      },
      gha: {
        mark: 4,
        criteria: "পোস্টার-২ এ উল্লেখিত রোগের সংক্রমণ বিস্তার রোধে আমাদের ব্যক্তিগত ও সামাজিক করণীয় বিশ্লেষণ করো।"
      }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  }
];
