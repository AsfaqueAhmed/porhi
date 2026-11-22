import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter12QuestionsBatch1: QuestionData[] = [
  {
    id: "q_bio_12_01",
    topicId: "top_ssc_biology_ch12_1",
    type: "MCQ",
    stem: "১৮৭৫ সালে উদ্ভিদ কোষের নিউক্লিয়াসে প্রথম ক্রোমোজোম প্রত্যক্ষ ও আবিষ্কার করেন কোন বিজ্ঞানী?",
    options: [
      {
        id: "opt_bio_12_01_a",
        text: "বিজ্ঞানী স্ট্রাসবার্গার (Strasburger)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_01_b",
        text: "রবার্ট হুক ও কার্ল বেন্ডা",
        isCorrect: false
      },
      {
        id: "opt_bio_12_01_c",
        text: "জেমস ওয়াটসন ও ফ্রান্সিস ক্রিক",
        isCorrect: false
      },
      {
        id: "opt_bio_12_01_d",
        text: "গ্রেগর জোহান মেন্ডেল",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বিজ্ঞানী স্ট্রাসবার্গার (Strasburger)।",
      coreConcept: "১৮৭৫ সালে জার্মান বিজ্ঞানী এডুয়ার্ড স্ট্রাসবার্গার কোষ বিভাজনের সময় নিউক্লিয়াসে সুতার মতো গঠন প্রত্যক্ষ করে ক্রোমোজোম আবিষ্কার করেন।",
      distractorAnalysis: {
        "opt_bio_12_01_b": "রবার্ট হুক ১৬৬৫ সালে কোষ এবং বেন্ডা ১৮৯৮ সালে মাইটোকন্ড্রিয়া নামকরণ করেন।",
        "opt_bio_12_01_c": "ওয়াটসন ও ক্রিক ১৯৫৩ সালে DNA-এর ডাবল হেলিক্স মডেল দেন।",
        "opt_bio_12_01_d": "মেন্ডেল ১৮৬৬ সালে বংশগতির মৌলিক সূত্র প্রকাশ করেন।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 257
      },
      proTipShortcut: "মনে রাখো: ১৮৭৫ = স্ট্রাসবার্গার = ক্রোমোজোম আবিষ্কার।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_02",
    topicId: "top_ssc_biology_ch12_1",
    type: "MCQ",
    stem: "NCTB জীববিজ্ঞান পাঠ্যবই অনুযায়ী একটি সাধারণ ক্রোমোজোমের দৈর্ঘ্য ও প্রস্থের সঠিক বিস্তার কোনটি?",
    options: [
      {
        id: "opt_bio_12_02_a",
        text: "দৈর্ঘ্য ৩.৫–৩০.০ মাইক্রন এবং প্রস্থ ০.২–২.০ মাইক্রন",
        isCorrect: true
      },
      {
        id: "opt_bio_12_02_b",
        text: "দৈর্ঘ্য ০.২–২.০ মাইক্রন এবং প্রস্থ ৩.৫–৩০.০ মাইক্রন",
        isCorrect: false
      },
      {
        id: "opt_bio_12_02_c",
        text: "দৈর্ঘ্য ১০.০–৫০.০ মাইক্রন এবং প্রস্থ ১.০–৫.০ মাইক্রন",
        isCorrect: false
      },
      {
        id: "opt_bio_12_02_d",
        text: "দৈর্ঘ্য ১.০–১০.০ মাইক্রন এবং প্রস্থ ০.০১–০.১ মাইক্রন",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: দৈর্ঘ্য ৩.৫–৩০.০ মাইক্রন এবং প্রস্থ ০.২–২.০ মাইক্রন।",
      coreConcept: "ক্রোমোজোমের দৈর্ঘ্য সাধারণ অবস্থায় ৩.৫ থেকে ৩০.০ মাইক্রন এবং প্রস্থ ০.২ থেকে ২.০ মাইক্রন হয়ে থাকে (১ মাইক্রন = ১/১০০০ মিলিমিটার)।",
      distractorAnalysis: {
        "opt_bio_12_02_b": "দৈর্ঘ্য ও প্রস্থের মান বিপরীত করে দেওয়া হয়েছে।",
        "opt_bio_12_02_c": "এটি ভুল ও অতিরঞ্জিত পরিমাপ।",
        "opt_bio_12_02_d": "এটি ব্যাকটেরিয়ার আকারের সাথে তুলনীয় ক্ষুদ্র মান।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 257
      },
      proTipShortcut: "মনে রাখার কৌশল: দৈর্ঘ্য ৩.৫ থেকে ৩০, আর প্রস্থ ০.২ থেকে ২!"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_03",
    topicId: "top_ssc_biology_ch12_1",
    type: "MCQ",
    stem: "মানুষের একটি স্বাভাবিক দেহকোষে ক্রোমোজোমের সঠিক বণ্টন কোনটি?",
    options: [
      {
        id: "opt_bio_12_03_a",
        text: "৪৪টি অটোজোম এবং ২টা সেক্স ক্রোমোজোম",
        isCorrect: true
      },
      {
        id: "opt_bio_12_03_b",
        text: "৪৬টি অটোজোম এবং ২টা সেক্স ক্রোমোজোম",
        isCorrect: false
      },
      {
        id: "opt_bio_12_03_c",
        text: "২২টি অটোজোম এবং ১টি সেক্স ক্রোমোজোম",
        isCorrect: false
      },
      {
        id: "opt_bio_12_03_d",
        text: "২৩টি অটোজোম এবং ২৩টি সেক্স ক্রোমোজোম",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ৪৪টি অটোজোম এবং ২টা সেক্স ক্রোমোজোম।",
      coreConcept: "মানুষের কোষে ২৩ জোড়া (৪৬টি) ক্রোমোজোমের মধ্যে ২২ জোড়া (৪৪টি) অটোজোম যা দৈহিক লক্ষণ নির্ধারণ করে, এবং ১ জোড়া (২টি) সেক্স ক্রোমোজোম যা লিঙ্গ নির্ধারণ করে।",
      distractorAnalysis: {
        "opt_bio_12_03_b": "এখানে মোট ক্রোমোজোম ৪৮টি দেখানো হয়েছে যা শিম্পাঞ্জির সংখ্যা, মানুষের নয়।",
        "opt_bio_12_03_c": "এটি হ্যাপ্লয়েড জননকোষের (শুক্রাণু বা ডিম্বাণু) ক্রোমোজোম সংখ্যা।",
        "opt_bio_12_03_d": "অটোজোম ও সেক্স ক্রোমোজোম সমান সংখ্যায় থাকে না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.২",
        pageNumber: 265
      },
      proTipShortcut: "মনে রাখো: মানুষ = ৪৪ অটোজোম + ২ সেক্স ক্রোমোজোম = ৪৬টি।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_04",
    topicId: "top_ssc_biology_ch12_1",
    type: "MCQ",
    stem: "জীববিজ্ঞানে বংশগতির 'ভৌত ভিত্তি' (Physical basis of heredity) হিসেবে কোনটি সর্বজনস্বীকৃত?",
    options: [
      {
        id: "opt_bio_12_04_a",
        text: "ক্রোমোজোম",
        isCorrect: true
      },
      {
        id: "opt_bio_12_04_b",
        text: "DNA অণু",
        isCorrect: false
      },
      {
        id: "opt_bio_12_04_c",
        text: "সেন্ট্রোজোম",
        isCorrect: false
      },
      {
        id: "opt_bio_12_04_d",
        text: "রাইবোজোম",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ক্রোমোজোম।",
      coreConcept: "ক্রোমোজোম বংশগতির বৈশিষ্ট্য বহন করে সরাসরি বংশধরদের মধ্যে নিয়ে যায় বলে একে বংশগতির ভৌত ভিত্তি বলা হয়। অপরপক্ষে DNA হলো রাসায়নিক ভিত্তি।",
      distractorAnalysis: {
        "opt_bio_12_04_b": "DNA হলো বংশগতির রাসায়নিক ভিত্তি (Chemical basis)।",
        "opt_bio_12_04_c": "সেন্ট্রোজোম কোষ বিভাজনে মাকুতন্তু তৈরি করে।",
        "opt_bio_12_04_d": "রাইবোজোম প্রোটিন ফ্যাক্টরি হিসেবে কাজ করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 257
      },
      proTipShortcut: "ভৌত ভিত্তি = ক্রোমোজোম; রাসায়নিক ভিত্তি = DNA; কার্যকরী একক = জিন।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_05",
    topicId: "top_ssc_biology_ch12_2",
    type: "MCQ",
    stem: "জেমস ওয়াটসন ও ফ্রান্সিস ক্রিক কত সালে DNA-এর দ্বি-সূত্রক ডাবল হেলিক্স মডেল প্রস্তাব করেন?",
    options: [
      {
        id: "opt_bio_12_05_a",
        text: "১৯৫৩ সালে",
        isCorrect: true
      },
      {
        id: "opt_bio_12_05_b",
        text: "১৯৬২ সালে",
        isCorrect: false
      },
      {
        id: "opt_bio_12_05_c",
        text: "১৮৬৫ সালে",
        isCorrect: false
      },
      {
        id: "opt_bio_12_05_d",
        text: "১৮৭৫ সালে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ১৯৫৩ সালে।",
      coreConcept: "১৯৫৩ সালে ওয়াটসন ও ক্রিক DNA ডাবল হেলিক্স মডেল আবিষ্কার করেন এবং এই বৈপ্লবিক কাজের জন্য ১৯৬২ সালে নোবেল পুরস্কার পান।",
      distractorAnalysis: {
        "opt_bio_12_05_b": "১৯৬২ সালে তাঁরা নোবেল পুরস্কার লাভ করেন।",
        "opt_bio_12_05_c": "১৮৬৫ সালে মেন্ডেল তাঁর বংশগতির গবেষণা উপস্থাপন করেন।",
        "opt_bio_12_05_d": "১৮৭৫ সালে স্ট্রাসবার্গার ক্রোমোজোম আবিষ্কার করেন।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 258
      },
      proTipShortcut: "১৯৫৩ = ডাবল হেলিক্স আবিষ্কার; ১৯৬২ = নোবেল জয়।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_06",
    topicId: "top_ssc_biology_ch12_2",
    type: "MCQ",
    stem: "DNA অণুর ডাবল হেলিক্স কাঠামোর ব্যাস সর্বত্র কত থাকে?",
    options: [
      {
        id: "opt_bio_12_06_a",
        text: "২০ Å (অ্যাংস্ট্রম)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_06_b",
        text: "৩৪ Å (অ্যাংস্ট্রম)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_06_c",
        text: "৩.৪ Å (অ্যাংস্ট্রম)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_06_d",
        text: "১০ Å (অ্যাংস্ট্রম)",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ২০ Å (অ্যাংস্ট্রম)।",
      coreConcept: "DNA ডাবল হেলিক্সের একটি পিউরিনের সাথে একটি পাইরিমিডিন যুক্ত থাকায় হেলিক্সের ব্যাস সর্বত্র সুষমভাবে ২০ Å (বা ২ ন্যানোমিটার) থাকে।",
      distractorAnalysis: {
        "opt_bio_12_06_b": "৩৪ Å হলো হেলিক্সের একটি পূর্ণ প্যাঁচ বা ঘূর্ণনের দৈর্ঘ্য।",
        "opt_bio_12_06_c": "৩.৪ Å হলো পাশাপাশি দুটি নিউক্লিওটাইড জোড়ের মধ্যবর্তী দূরত্ব।",
        "opt_bio_12_06_d": "১০ হলো প্রতি প্যাঁচে অবস্থিত বেস জোড়ের সংখ্যা।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 258
      },
      proTipShortcut: "DNA ডাইমেনশন ট্রিক: ব্যাস ২০ Å, পূর্ণ ঘূর্ণন ৩৪ Å, পরপর দূরত্ব ৩.৪ Å।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_07",
    topicId: "top_ssc_biology_ch12_2",
    type: "MCQ",
    stem: "DNA ডাবল হেলিক্সের একটি পূর্ণ ঘূর্ণনের (One complete turn) দৈর্ঘ্য কত এবং এতে কয়টি নিউক্লিওটাইড থাকে?",
    options: [
      {
        id: "opt_bio_12_07_a",
        text: "দৈর্ঘ্য ৩৪ Å এবং এতে ১০টি নিউক্লিওটাইড জোড়া থাকে",
        isCorrect: true
      },
      {
        id: "opt_bio_12_07_b",
        text: "দৈর্ঘ্য ২০ Å এবং এতে ৩৪টি নিউক্লিওটাইড থাকে",
        isCorrect: false
      },
      {
        id: "opt_bio_12_07_c",
        text: "দৈর্ঘ্য ৩.৪ Å এবং এতে ১টি নিউক্লিওটাইড থাকে",
        isCorrect: false
      },
      {
        id: "opt_bio_12_07_d",
        text: "দৈর্ঘ্য ৩৪ Å এবং এতে ২০টি নিউক্লিওটাইড থাকে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: দৈর্ঘ্য ৩৪ Å এবং এতে ১০টি নিউক্লিওটাইড জোড়া থাকে।",
      coreConcept: "DNA হেলিক্সের প্রতিটি পূর্ণ প্যাঁচের দৈর্ঘ্য ৩৪ Å (৩.৪ nm) এবং একটি পূর্ণ প্যাঁচে ঠিক ১০টি নিউক্লিওটাইড জোড়া (বা মোট ২০টি নিউক্লিওটাইড) বিন্যস্ত থাকে।",
      distractorAnalysis: {
        "opt_bio_12_07_b": "২০ Å হলো ব্যাস, প্যাঁচের দৈর্ঘ্য নয়।",
        "opt_bio_12_07_c": "৩.৪ Å হলো পাশাপাশি দুটি বেসের দূরত্ব।",
        "opt_bio_12_07_d": "যদিও মোট নিউক্লিওটাইড ২০টি কিন্তু জোড় হিসেবে ১০ জোড়া বলা বিধেয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 258
      },
      proTipShortcut: "পূর্ণ ঘূর্ণন = ৩৪ Å = ১০টি বেস পেয়ার।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_08",
    topicId: "top_ssc_biology_ch12_2",
    type: "MCQ",
    stem: "DNA অণুতে অ্যাডেনিন (A) এবং থাইমিন (T) এর মাঝে কয়টি হাইড্রোজেন বন্ধন থাকে?",
    options: [
      {
        id: "opt_bio_12_08_a",
        text: "২টি হাইড্রোজেন বন্ধন (A = T)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_08_b",
        text: "৩টি হাইড্রোজেন বন্ধন (A ≡ T)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_08_c",
        text: "১টি সমযোজী বন্ধন",
        isCorrect: false
      },
      {
        id: "opt_bio_12_08_d",
        text: "৪টি পেপটাইড বন্ধন",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ২টি হাইড্রোজেন বন্ধন (A = T)।",
      coreConcept: "DNA-এর পরিপূরক ক্ষারক জোড় বাঁধার নিয়মানুযায়ী অ্যাডেনিন ও থাইমিন ২টি হাইড্রোজেন বন্ধন দিয়ে যুক্ত থাকে ($A = T$), অপরদিকে গুয়ানিন ও সাইটোসিন ৩টি হাইড্রোজেন বন্ধন দিয়ে যুক্ত থাকে ($G \\equiv C$)।",
      distractorAnalysis: {
        "opt_bio_12_08_b": "৩টি হাইড্রোজেন বন্ধন থাকে গুয়ানিন ও সাইটোসিনের ($G \\equiv C$) মাঝে।",
        "opt_bio_12_08_c": "এদের মাঝে দুর্বল হাইড্রোজেন বন্ধন থাকে, সমযোজী নয়।",
        "opt_bio_12_08_d": "পেপটাইড বন্ধন প্রোটিনে অ্যামাইনো এসিডের মাঝে থাকে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 258
      },
      proTipShortcut: "সহজ মেমরি ট্রিক: A=T (২টি দাগ), G≡C (৩টি দাগ)।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_09",
    topicId: "top_ssc_biology_ch12_2",
    type: "MCQ",
    stem: "DNA অনুলিপনকে 'অর্ধ-রক্ষণশীল' (Semi-conservative) পদ্ধতি বলা হয় কেন?",
    options: [
      {
        id: "opt_bio_12_09_a",
        text: "প্রতিটি নতুন DNA অণুতে একটি পুরাতন মাতৃসূত্র এবং একটি সম্পূর্ণ নতুন সূত্র থাকে",
        isCorrect: true
      },
      {
        id: "opt_bio_12_09_b",
        text: "দুটি নতুন DNA অণুর একটি সম্পূর্ণ পুরাতন এবং অন্যটি সম্পূর্ণ নতুন হয়",
        isCorrect: false
      },
      {
        id: "opt_bio_12_09_c",
        text: "DNA সূত্রের অর্ধেক অংশ নষ্ট হয়ে যায়",
        isCorrect: false
      },
      {
        id: "opt_bio_12_09_d",
        text: "অনুলিপন কেবল অর্ধেক কোষে সম্পন্ন হয়",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রতিটি নতুন DNA অণুতে একটি পুরাতন মাতৃসূত্র এবং একটি সম্পূর্ণ নতুন সূত্র থাকে।",
      coreConcept: "রেপ্লিকেশনের পর সৃষ্ট দুটি অপত্য DNA-এর প্রতিটিতে ৫০% পুরাতন সূত্রক সংরক্ষিত থাকে এবং ৫০% নতুন পরিপূরক সূত্রক সংশ্লেষিত হয় বলে একে অর্ধ-রক্ষণশীল অনুলিপন বলে।",
      distractorAnalysis: {
        "opt_bio_12_09_b": "এটি রক্ষণশীল (Conservative) অনুমানের ব্যাখ্যা, যা প্রমাণিত নয়।",
        "opt_bio_12_09_c": "DNA কোনো অংশ নষ্ট হয় না।",
        "opt_bio_12_09_d": "অনুলিপন প্রতিটি কোষে সমানভাবে সম্পন্ন হয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 264
      },
      proTipShortcut: "অর্ধ-রক্ষণশীল = ১টি পুরাতন স্ট্র্যান্ড + ১টি নতুন স্ট্র্যান্ড।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_10",
    topicId: "top_ssc_biology_ch12_2",
    type: "MCQ",
    stem: "DNA ডাবল হেলিক্সের দুটি সূত্রের বিন্যাস অভিমুখের সঠিক প্রকৃতি কোনটি?",
    options: [
      {
        id: "opt_bio_12_10_a",
        text: "বিপরীতমুখী সমান্তরাল (Antiparallel)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_10_b",
        text: "একইমুখী সমান্তরাল (Parallel)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_10_c",
        text: "পরস্পর লম্বভাবে ছেদকারী",
        isCorrect: false
      },
      {
        id: "opt_bio_12_10_d",
        text: "সম্পূর্ণ এলোমেলো শাখা-প্রশাখাযুক্ত",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বিপরীতমুখী সমান্তরাল (Antiparallel)।",
      coreConcept: "DNA-এর একটি পলিনিউক্লিওটাইড সূত্র ৫' থেকে ৩' অভিমুখে এবং অপর পরিপূরক সূত্রটি ৩' থেকে ৫' অভিমুখে বিপরীতমুখী সমান্তরালভাবে অবস্থান করে।",
      distractorAnalysis: {
        "opt_bio_12_10_b": "একইমুখী সমান্তরাল হলে হাইড্রোজেন বন্ধন সুস্থিত হতে পারে না।",
        "opt_bio_12_10_c": "সূএ দুটি সমান্তরালে সর্পিলাকার পেঁচিয়ে থাকে, লম্বভাবে ছেদ করে না।",
        "opt_bio_12_10_d": "DNA অণু অত্যন্ত নিয়মতান্ত্রিক ও শাখাহীন।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 258
      },
      proTipShortcut: "Antiparallel = 5'->3' এবং 3'->5'।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_11",
    topicId: "top_ssc_biology_ch12_3",
    type: "MCQ",
    stem: "ক্রোমোজোমে প্রতিটি জিনের সুনির্দিষ্ট অবস্থান বা বিন্দুকে কী বলা হয়?",
    options: [
      {
        id: "opt_bio_12_11_a",
        text: "লোকাস (Locus)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_11_b",
        text: "সেন্ট্রোমিয়ার",
        isCorrect: false
      },
      {
        id: "opt_bio_12_11_c",
        text: "স্যাটেলাইট",
        isCorrect: false
      },
      {
        id: "opt_bio_12_11_d",
        text: "টেলোমিয়ার",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: লোকাস (Locus)।",
      coreConcept: "ক্রোমোজোমের যে নির্দিষ্ট স্থানে কোনো বিশেষ জিন অবস্থান করে, তাকে লোকাস বলে। হোমোলোগাস ক্রোমোজোমের একই লোকাসে সংশ্লিষ্ট জিনের অ্যালিলদ্বয় অবস্থান করে।",
      distractorAnalysis: {
        "opt_bio_12_11_b": "সেন্ট্রোমিয়ার হলো ক্রোমোজোমের মুখ্য খাঁজ।",
        "opt_bio_12_11_c": "স্যাটেলাইট হলো গৌণ খাঁজের পরবর্তী ক্রোমোজোম প্রান্ত।",
        "opt_bio_12_11_d": "টেলোমিয়ার হলো ক্রোমোজোমের প্রান্তীয় রক্ষাকারী অংশ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 261
      },
      proTipShortcut: "জিনের বাসা = ক্রোমোজোমের লোকাস।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_12",
    topicId: "top_ssc_biology_ch12_3",
    type: "MCQ",
    stem: "সমসংস্থ ক্রোমোজোমের একই লোকাসে অবস্থিত একই জিনের বিভিন্ন রূপভেদ বা সংস্করণকে কী বলে?",
    options: [
      {
        id: "opt_bio_12_12_a",
        text: "অ্যালিল (Allele)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_12_b",
        text: "প্লাজমিড",
        isCorrect: false
      },
      {
        id: "opt_bio_12_12_c",
        text: "কোডন",
        isCorrect: false
      },
      {
        id: "opt_bio_12_12_d",
        text: "অ্যান্টিজেন",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ্যালিল (Allele)।",
      coreConcept: "হোমোলোগাস ক্রোমোজোমের নির্দিষ্ট লোকাসে অবস্থিত নির্দিষ্ট বৈশিষ্ট্যের একাধিক রূপকে অ্যালিল বলে (যেমন মটরশুঁটির উচ্চতার জন্য T ও t হলো অ্যালিল)।",
      distractorAnalysis: {
        "opt_bio_12_12_b": "প্লাজমিড ব্যাকটেরিয়ার অতিরিক্ত বৃত্তাকার DNA।",
        "opt_bio_12_12_c": "কোডন হলো তিনটি নাইট্রোজেন ক্ষারকের প্রোটিন সংকেত।",
        "opt_bio_12_12_d": "অ্যান্টিজেন প্রতিরোধ ব্যবস্থাকে উদ্দীপিতকারী প্রোটিন।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 262
      },
      proTipShortcut: "একই জিনের বিপরীত রূপ = অ্যালিল (T ও t)।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_13",
    topicId: "top_ssc_biology_ch12_3",
    type: "MCQ",
    stem: "DNA থেকে জিনগত বার্তা আরএনএ-এর মাধ্যমে সাইটোপ্লাজমে এসে কোথায় প্রোটিন সংশ্লেষিত হয়?",
    options: [
      {
        id: "opt_bio_12_13_a",
        text: "সাইটোপ্লাজমের রাইবোজোমে",
        isCorrect: true
      },
      {
        id: "opt_bio_12_13_b",
        text: "মাইটোকন্ড্রিয়ার ম্যাট্রিক্সে",
        isCorrect: false
      },
      {
        id: "opt_bio_12_13_c",
        text: "লাইসোজোমের গহ্বরে",
        isCorrect: false
      },
      {
        id: "opt_bio_12_13_d",
        text: "নিউক্লিওলাসে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সাইটোপ্লাজমের রাইবোজোমে।",
      coreConcept: "mRNA জেনেটিক কোডন বহন করে রাইবোজোমে প্রবেশ করে এবং সেখানে কোডন অনুযায়ী অ্যামাইনো এসিডের পলিমেরাইজেশনের মাধ্যমে প্রোটিন তৈরি হয়।",
      distractorAnalysis: {
        "opt_bio_12_13_b": "মাইটোকন্ড্রিয়া শ্বসন প্রক্রিয়ায় ATP তৈরি করে।",
        "opt_bio_12_13_c": "লাইসোজোম ফ্যাগোসাইটোসিস ও পরিপাক ঘটায়।",
        "opt_bio_12_13_d": "নিউক্লিওলাস রাইবোজোম তৈরির কাঁচামাল যোগায়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 262
      },
      proTipShortcut: "প্রোটিন কারখানা = রাইবোজোম।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_14",
    topicId: "top_ssc_biology_ch12_3",
    type: "MCQ",
    stem: "ডিএনএ টেস্ট (DNA Profiling)-এ আণবিক কাঁচি হিসেবে DNA-কে নির্দিষ্ট স্থানে কাটতে কোন এনজাইম ব্যবহৃত হয়?",
    options: [
      {
        id: "opt_bio_12_14_a",
        text: "রেস্ট্রিকশন এনজাইম (Restriction enzyme)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_14_b",
        text: "ডিএনএ লাইগেজ",
        isCorrect: false
      },
      {
        id: "opt_bio_12_14_c",
        text: "অ্যামাইলেজ",
        isCorrect: false
      },
      {
        id: "opt_bio_12_14_d",
        text: "পেপসিন",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: রেস্ট্রিকশন এনজাইম (Restriction enzyme)।",
      coreConcept: "রেস্ট্রিকশন এনজাইম DNA-এর নির্দিষ্ট নিউক্লিওটাইড অনুক্রম চিনে সেখানে সুনির্দিষ্টভাবে কর্তন করে, তাই একে আণবিক কাঁচি বলা হয়।",
      distractorAnalysis: {
        "opt_bio_12_14_b": "লাইগেজ DNA খণ্ডগুলোকে জোড়া লাগাতে আণবিক আঠা হিসেবে কাজ করে।",
        "opt_bio_12_14_c": "অ্যামাইলেজ শর্করা পরিপাককারী উৎসেচক।",
        "opt_bio_12_14_d": "পেপসিন পাকস্থলীতে প্রোটিন পরিপাক করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 264
      },
      proTipShortcut: "কাটার কাঁচি = রেস্ট্রিকশন; জোড়ার আঠা = লাইগেজ।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_15",
    topicId: "top_ssc_biology_ch12_3",
    type: "MCQ",
    stem: "অতি সামান্য পরিমাণ জৈবিক নমুনা থেকে পলিমারেজ চেইন রিঅ্যাকশন (PCR) পদ্ধতির মূল অবদান কোনটি?",
    options: [
      {
        id: "opt_bio_12_15_a",
        text: "স্বল্প সময়ে DNA-এর কোটি কোটি অনুলিপি তৈরি করা",
        isCorrect: true
      },
      {
        id: "opt_bio_12_15_b",
        text: "DNA অণুকে সম্পূর্ণরূপে ধ্বংস করে ফেলা",
        isCorrect: false
      },
      {
        id: "opt_bio_12_15_c",
        text: "রক্তের লোহিত কণিকা সংখ্যা বৃদ্ধি করা",
        isCorrect: false
      },
      {
        id: "opt_bio_12_15_d",
        text: "কোষের বিভাজন স্থায়ীভাবে বন্ধ করা",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: স্বল্প সময়ে DNA-এর কোটি কোটি অনুলিপি তৈরি করা।",
      coreConcept: "PCR বা Polymerase Chain Reaction প্রযুক্তির মাধ্যমে অপরাধস্থল থেকে সংগৃহীত সূক্ষ্ম এক ফোঁটা রক্ত বা চুলের গোড়া থেকে প্রাপ্ত DNA অণুকে কোটি কোটি গুণ বিবর্ধিত করে নিখুঁত টেস্ট করা সম্ভব হয়।",
      distractorAnalysis: {
        "opt_bio_12_15_b": "PCR অনুলিপি বৃদ্ধি করে, ধ্বংস করে না।",
        "opt_bio_12_15_c": "এটি টেস্ট টিউবে ইন-ভিট্রো DNA অ্যামপ্লিফিকেশন, রক্তকণিকার সাথে সম্পর্ক নেই।",
        "opt_bio_12_15_d": "কোষ বিভাজন বন্ধের কোনো কাজ করে না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 265
      },
      proTipShortcut: "PCR = DNA ফটোকপি মেশিন।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_16",
    topicId: "top_ssc_biology_ch12_4",
    type: "MCQ",
    stem: "মেন্ডেলের মনোহাইব্রিড ক্রসের দ্বিতীয় অপত্য বংশধরে (F2 জনু) ফিনোটাইপিক অনুপাত কোনটি?",
    options: [
      {
        id: "opt_bio_12_16_a",
        text: "৩ : ১ (লম্বা : খাটো)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_16_b",
        text: "১ : ২ : ১",
        isCorrect: false
      },
      {
        id: "opt_bio_12_16_c",
        text: "৯ : ৩ : ৩ : ১",
        isCorrect: false
      },
      {
        id: "opt_bio_12_16_d",
        text: "১ : ১",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ৩ : ১ (লম্বা : খাটো)।",
      coreConcept: "মনোহাইব্রিড ক্রসের F2 জনুতে ফিনোটাইপিক বা বাহ্যিক অনুপাত হয় ৩ ভাগ লম্বা এবং ১ ভাগ খাটো (৭৫% : ২৫%)।",
      distractorAnalysis: {
        "opt_bio_12_16_b": "১ : ২ : ১ হলো F2 জনুর জিনোটাইপিক অনুপাত (TT : Tt : tt)।",
        "opt_bio_12_16_c": "৯ : ৩ : ৩ : ১ হলো ডাইহাইব্রিড ক্রসের F2 ফিনোটাইপ অনুপাত।",
        "opt_bio_12_16_d": "১ : ১ হলো টেস্ট ক্রসের অনুপাত।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 263
      },
      proTipShortcut: "F2 ফিনোটাইপ = ৩ : ১; F2 জিনোটাইপ = ১ : ২ : ১।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_17",
    topicId: "top_ssc_biology_ch12_4",
    type: "MCQ",
    stem: "বিশুদ্ধ লম্বা (TT) এবং বিশুদ্ধ খাটো (tt) মটর গাছের ক্রসে F1 জনুর সকল উদ্ভিদ লম্বা হওয়ার কারণ কী?",
    options: [
      {
        id: "opt_bio_12_17_a",
        text: "লম্বা অ্যালিলটি (T) খাটো অ্যালিলের (t) ওপর সম্পূর্ণ প্রকট",
        isCorrect: true
      },
      {
        id: "opt_bio_12_17_b",
        text: "খাটো অ্যালিলটি সম্পূর্ণ বিনষ্ট হয়ে যায়",
        isCorrect: false
      },
      {
        id: "opt_bio_12_17_c",
        text: "খাটো অ্যালিলটি রূপান্তরিত হয়ে লম্বা হয়ে যায়",
        isCorrect: false
      },
      {
        id: "opt_bio_12_17_d",
        text: "কোষে মিউটেশন ঘটে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: লম্বা অ্যালিলটি (T) খাটো অ্যালিলের (t) ওপর সম্পূর্ণ প্রকট।",
      coreConcept: "হেটারোজাইগাস (Tt) অবস্থায় প্রকট জিন T তার বৈশিষ্ট্য প্রকাশ করে এবং প্রচ্ছন্ন জিন t অপ্রকাশিত বা সুপ্ত অবস্থায় থেকে যায়।",
      distractorAnalysis: {
        "opt_bio_12_17_b": "খাটো জিনটি নষ্ট হয় না, তা অক্ষত অবস্থায় পরবর্তী F2 প্রজন্মে প্রকাশ পায়।",
        "opt_bio_12_17_c": "জিনের কোনো রূপান্তর বা মিশ্রণ ঘটে না।",
        "opt_bio_12_17_d": "এটি স্বাভাবিক মেন্ডেলীয় প্রকটতার ঘটনা, মিউটেশন নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 262
      },
      proTipShortcut: "প্রকট থাকলে প্রচ্ছন্ন ঘুমায়!"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_18",
    topicId: "top_ssc_biology_ch12_5",
    type: "MCQ",
    stem: "সন্তানের লিঙ্গ নির্ধারণে মাতার কোনো ভূমিকা নেই কেন?",
    options: [
      {
        id: "opt_bio_12_18_a",
        text: "মাতা সর্বদা কেবল X ক্রোমোজোমবাহী এক প্রকার ডিম্বাণু উৎপন্ন করেন",
        isCorrect: true
      },
      {
        id: "opt_bio_12_18_b",
        text: "মাতার কোষে কোনো ক্রোমোজোম থাকে না",
        isCorrect: false
      },
      {
        id: "opt_bio_12_18_c",
        text: "মাতা কেবল Y ক্রোমোজোম ডিম্বাণুতে দেন",
        isCorrect: false
      },
      {
        id: "opt_bio_12_18_d",
        text: "মাতার ডিম্বাণু নিষেকের পূর্বে বিনষ্ট হয়ে যায়",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: মাতা সর্বদা কেবল X ক্রোমোজোমবাহী এক প্রকার ডিম্বাণু উৎপন্ন করেন।",
      coreConcept: "নারীদের সেক্স ক্রোমোজোম হলো XX, তাই ডিম্বাশয়ে মিয়োসিস বিভাজনে উৎপন্ন সব ডিম্বাণুতেই একটি করে X ক্রোমোজোম (২২+X) থাকে। অপরদিকে পিতা ৫০% X ও ৫০% Y শুক্রাণু বানান। পিতার Y শুক্রাণু নিষিক্ত করলেই পুত্র এবং X শুক্রাণু নিষিক্ত করলে কন্যা হয়।",
      distractorAnalysis: {
        "opt_bio_12_18_b": "মাতার কোষেও ৪৬টি ক্রোমোজোম থাকে।",
        "opt_bio_12_18_c": "নারীদের কোষে কোনো Y ক্রোমোজোম নেই।",
        "opt_bio_12_18_d": "ডিম্বাণু নিষিক্ত হয়েই ভ্রূণ সৃষ্টি করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.২",
        pageNumber: 266
      },
      proTipShortcut: "মা = কেবল X ডিম্বাণু; পিতা = X অথবা Y শুক্রাণু।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_19",
    topicId: "top_ssc_biology_ch12_5",
    type: "MCQ",
    stem: "মানবদেহে প্রতি গর্ভাবস্থায় পুত্র সন্তান বা কন্যা সন্তান হওয়ার তাত্ত্বিক সম্ভাবনা কত?",
    options: [
      {
        id: "opt_bio_12_19_a",
        text: "৫০% : ৫০% (বা ১ : ১)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_19_b",
        text: "৭৫% : ২৫% (বা ৩ : ১)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_19_c",
        text: "১০০% পুত্র",
        isCorrect: false
      },
      {
        id: "opt_bio_12_19_d",
        text: "৬০% কন্যা ও ৪০% পুত্র",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ৫০% : ৫০% (বা ১ : ১)।",
      coreConcept: "পুরুষদের দেহে সম অনুপাতে ৫০% X বহনকারী এবং ৫০% Y বহনকারী শুক্রাণু তৈরি হয়। ফলে নিষেকের সময় উভয় প্রকার শুক্রাণু দ্বারা ডিম্বাণু নিষিক্ত হওয়ার সম্ভাবনা ৫০% বা ১:১।",
      distractorAnalysis: {
        "opt_bio_12_19_b": "৩:১ হলো মেন্ডেলীয় মনোহাইব্রিড ফিনোটাইপ অনুপাত।",
        "opt_bio_12_19_c": "এমন কোনো পক্ষপাতিত্ব প্রকৃতিতে নেই।",
        "opt_bio_12_19_d": "সম্ভাবনা সর্বদা সমান বা ৫০%।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.২",
        pageNumber: 266
      },
      proTipShortcut: "মুদ্রা টসের মতো লিঙ্গ নির্ধারণের সম্ভাবনা ৫০%।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_20",
    topicId: "top_ssc_biology_ch12_6",
    type: "MCQ",
    stem: "থ্যালাসেমিয়া কোন ধরনের জিনগত বংশগত ব্যাধি?",
    options: [
      {
        id: "opt_bio_12_20_a",
        text: "অটোজোমাল রিসেসিভ (Autosomal recessive) রক্তের রোগ",
        isCorrect: true
      },
      {
        id: "opt_bio_12_20_b",
        text: "সেক্স-লিংকড ডমিন্যান্ট ব্যাধি",
        isCorrect: false
      },
      {
        id: "opt_bio_12_20_c",
        text: "ব্যাকটেরিয়াজনিত সংক্রামক রোগ",
        isCorrect: false
      },
      {
        id: "opt_bio_12_20_d",
        text: "ভিটামিন ঘাটতিজনিত পুষ্টিহীনতা",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অটোজোমাল রিসেসিভ (Autosomal recessive) রক্তের রোগ।",
      coreConcept: "থ্যালাসেমিয়া হলো অটোজোমে অবস্থিত প্রচ্ছন্ন জিনের মিউটেশনজনিত রোগ। মাতা ও পিতা উভয়েই এই জিনের বাহক হলে সন্তানের মধ্যে রোগটি প্রকাশ পায়।",
      distractorAnalysis: {
        "opt_bio_12_20_b": "বর্ণান্ধতা সেক্স-লিংকড রিসেসিভ, থ্যালাসেমিয়া অটোজোমাল।",
        "opt_bio_12_20_c": "এটি কোনো সংক্রামক রোগ নয়, বংশগত রোগ।",
        "opt_bio_12_20_d": "ভিটামিনের অভাবে রক্তশূন্যতা হলেও থ্যালাসেমিয়া জিনগত।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৩",
        pageNumber: 268
      },
      proTipShortcut: "থ্যালাসেমিয়া = অটোজোমাল প্রচ্ছন্ন; বর্ণান্ধতা = সেক্স-লিংকড প্রচ্ছন্ন।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_21",
    topicId: "top_ssc_biology_ch12_6",
    type: "MCQ",
    stem: "লাল-সবুজ বর্ণান্ধতা শনাক্তকরণে ব্যবহৃত রঙিন বিন্দুর সমন্বয়ে তৈরি বিশেষ চার্টটিকে কী বলা হয়?",
    options: [
      {
        id: "opt_bio_12_21_a",
        text: "ইশিহারা চার্ট (Ishihara chart)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_21_b",
        text: "পানেট চার্ট",
        isCorrect: false
      },
      {
        id: "opt_bio_12_21_c",
        text: "স্নেল চার্ট",
        isCorrect: false
      },
      {
        id: "opt_bio_12_21_d",
        text: "হার্ডি-ওয়াইনবার্গ গ্রাফ",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ইশিহারা চার্ট (Ishihara chart)।",
      coreConcept: "জাপানি চক্ষু বিশেষজ্ঞ শিনোবু ইশিহারা ১৯১৭ সালে বর্ণান্ধতা শনাক্তে রঙিন ডট দিয়ে গঠিত প্লেট বা চার্ট তৈরি করেন, যেখানে স্বাভাবিক মানুষ ৭৪ দেখে কিন্তু বর্ণান্ধ ব্যক্তি ২১ দেখে।",
      distractorAnalysis: {
        "opt_bio_12_21_b": "পানেট স্কয়ার জিনোটাইপ নির্ধারণে ব্যবহৃত হয়।",
        "opt_bio_12_21_c": "স্নেল চার্ট সাধারণ দৃষ্টিশক্তি বা ক্ষীণদৃষ্টি পরীক্ষায় ব্যবহৃত হয়।",
        "opt_bio_12_21_d": "এটি পপুলেশন জেনেটিক্সের গাণিতিক মডেল।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৩",
        pageNumber: 267
      },
      proTipShortcut: "বর্ণান্ধতা পরীক্ষা = ইশিহারা চার্ট।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_22",
    topicId: "top_ssc_biology_ch12_6",
    type: "MCQ",
    stem: "পিতা ও মাতা উভয়েই থ্যালাসেমিয়ার বাহক (Rr) হলে, তাঁদের সন্তানের 'থ্যালাসেমিয়া মেজর' আক্রান্ত হওয়ার সম্ভাবনা কত শতাংশ?",
    options: [
      {
        id: "opt_bio_12_22_a",
        text: "২৫% (বা চার ভাগের এক ভাগ)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_22_b",
        text: "৫০% (বা অর্ধেক)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_22_c",
        text: "৭৫%",
        isCorrect: false
      },
      {
        id: "opt_bio_12_22_d",
        text: "১০০%",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ২৫% (বা চার ভাগের এক ভাগ)।",
      coreConcept: "Rr × Rr ক্রসে অপত্যের সম্ভাবনা: ২৫% সুস্থ (RR), ৫০% বাহক (Rr) এবং ২৫% থ্যালাসেমিয়া মেজর আক্রান্ত (rr)।",
      distractorAnalysis: {
        "opt_bio_12_22_b": "৫০% হলো সন্তানের বাহক (Rr) হওয়ার সম্ভাবনা।",
        "opt_bio_12_22_c": "৭৫% হলো সন্তান শারীরিকভাবে বেঁচে থাকার সম্ভাবনা।",
        "opt_bio_12_22_d": "পিতা-মাতা উভয়ই রোগী (rr) হলে কেবল ১০০% আক্রান্ত হয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৩",
        pageNumber: 269
      },
      proTipShortcut: "বাহক × বাহক = ২৫% সুস্থ : ৫০% বাহক : ২৫% আক্রান্ত।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_23",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "১৮৫৯ সালে চার্লস ডারউইনের বিখ্যাত বিবর্তনবাদ সম্পর্কিত গ্রন্থের নাম কী?",
    options: [
      {
        id: "opt_bio_12_23_a",
        text: "On the Origin of Species by Means of Natural Selection",
        isCorrect: true
      },
      {
        id: "opt_bio_12_23_b",
        text: "Philosophie Zoologique",
        isCorrect: false
      },
      {
        id: "opt_bio_12_23_c",
        text: "Systema Naturae",
        isCorrect: false
      },
      {
        id: "opt_bio_12_23_d",
        text: "Genera Plantarum",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: On the Origin of Species by Means of Natural Selection।",
      coreConcept: "১৮৫৯ সালে চার্লস ডারউইন তাঁর গ্যালাপাগোস দ্বীপপুঞ্জের দীর্ঘ গবেষণা ও আলফ্রেড ওয়ালেসের মতামতের ভিত্তিতে এই ঐতিহাসিক গ্রন্থটি প্রকাশ করেন।",
      distractorAnalysis: {
        "opt_bio_12_23_b": "Philosophie Zoologique (১৮০৯) জঁ ব্যাপটিস্ট ল্যামার্কের গ্রন্থ।",
        "opt_bio_12_23_c": "Systema Naturae (১৭৩৫) ক্যারোলাস লিনিয়াসের গ্রন্থ।",
        "opt_bio_12_23_d": "Genera Plantarum বেন্থাম ও হুকারের গ্রন্থ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 273
      },
      proTipShortcut: "১৮৫৯ = ডারউইন = Origin of Species।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_24",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "পাখির ডানা, বাদুড়ের ডানা এবং মানুষের হাত—এরা কোন ধরনের অঙ্গের উদাহরণ?",
    options: [
      {
        id: "opt_bio_12_24_a",
        text: "সমসংস্থ অঙ্গ (Homologous organs)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_24_b",
        text: "সমবৃত্তীয় অঙ্গ (Analogous organs)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_24_c",
        text: "নিষ্ক্রিয় অঙ্গ (Vestigial organs)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_24_d",
        text: "বহিঃকঙ্কাল অঙ্গ",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সমসংস্থ অঙ্গ (Homologous organs)।",
      coreConcept: "যেসব অঙ্গের অভ্যন্তরীণ অস্থির গঠন ও ভ্রূণীয় উৎপত্তি একই কিন্তু বাহ্যিক রূপ ও কাজ আলাদা (উড়া, সাঁতার কাটা বা ধরা), তাদের সমসংস্থ অঙ্গ বলে।",
      distractorAnalysis: {
        "opt_bio_12_24_b": "সমবৃত্তীয় অঙ্গের কাজ এক কিন্তু উৎপত্তি আলাদা (যেমন পতঙ্গের ডানা ও পাখির ডানা)।",
        "opt_bio_12_24_c": "নিষ্ক্রিয় অঙ্গ অপ্রয়োজনীয় হয়ে বিলুপ্তির পথে (যেমন অ্যাপেন্ডিক্স)।",
        "opt_bio_12_24_d": "এগুলো অন্তঃকঙ্কালের অংশ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 277
      },
      proTipShortcut: "সমসংস্থ = উৎপত্তি এক, কাজ ভিন্ন; সমবৃত্তীয় = উৎপত্তি ভিন্ন, কাজ এক।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_25",
    topicId: "top_ssc_biology_ch12_1",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান ক্লাসে শিক্ষক বোর্ডে ক্রোমোজোমের চিত্র এঁকে বললেন, “এটি কোষের নিউক্লিয়াসে অবস্থিত বংশগতির ভৌত ভিত্তি, যা জীবের বৈশিষ্ট্য পিতা-মাতা থেকে সন্তানে বহন করে। এর রাসায়নিক মূল উপাদান হলো একটি দ্বি-সূত্রক সর্পিলাকার নিউক্লিক এসিড, যা জীবের সকল জৈবিক সংকেত ধারণ করে।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে ক্রোমোজোম এবং DNA অণুর ডাবল হেলিক্স গঠনের ওপর গুরুত্বারোপ করা হয়েছে।",
      coreConcept: "বংশগতির ভৌত ভিত্তি ক্রোমোজোম এবং রাসায়নিক ভিত্তি DNA এর গঠন ও কার্যাবলির পারস্পরিক সম্পর্ক।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 257
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "বংশগতি বা হেরিডিটি (Heredity)-এর সংজ্ঞা নির্ভুলভাবে লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "ক্রোমোজোমকে বংশগতির ভৌত ভিত্তি বলা হয় কেন তা দুটি সুস্পষ্ট যুক্তিতে ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকে নির্দেশিত অণুটির (DNA) ওয়াটসন-ক্রিক মডেলের পরিমাপসহ (ব্যাস, প্যাঁচের দৈর্ঘ্য, বেস দূরত্ব) ভৌত গঠন ছক/চিহ্নিত চিত্রের মাধ্যমে উপস্থাপন করা।"
      },
      gha: {
        mark: 4,
        criteria: "জীবদেহের চারিত্রিক বৈশিষ্ট্য অক্ষুণ্ণ রাখতে ক্রোমোজোম ও DNA-এর সমন্বিত ভূমিকা বিশ্লেষণ করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল নমুনা · ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_26",
    topicId: "top_ssc_biology_ch12_2",
    type: "CQ_CREATIVE",
    stem: "পরীক্ষাগারে প্রদর্শিত একটি চার্টে দেখা গেল, একটি মূল DNA অণুর দ্বি-সূত্রক পৃথক হয়ে দুটি নতুন DNA অণু তৈরি করছে। দেখা গেল প্রতিটি অপত্য অণুর অর্ধেক অংশ পুরাতন সূত্র এবং বাকি অর্ধেক অংশ সম্পূর্ণ নতুনভাবে গঠিত। শিক্ষক জানালেন, ১৯৫৬ সালে বিজ্ঞানীদ্বয় এই অনুলিপন পদ্ধতির ধারণা দেন।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকের প্রক্রিয়াটি হলো DNA-এর অর্ধ-রক্ষণশীল অনুলিপন (Semi-conservative Replication)।",
      coreConcept: "DNA ডাবল হেলিক্সের হাইড্রোজেন বন্ড ভেঙে প্রতিটি স্ট্র্যান্ড টেমপ্লেট হিসেবে পরিপূরক নতুন সূত্রক তৈরি করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 264
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "নিউক্লিওটাইড কী দিয়ে গঠিত তা সঠিক উপাদানসহ লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "DNA রেপ্লিকেশনকে অর্ধ-রক্ষণশীল বলা হয় কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকে বর্ণিত অনুলিপন প্রক্রিয়ার মূল ধাপগুলো (হাইড্রোজেন বন্ধন ভাঙা, ছাঁচ তৈরি, পরিপূরক বেস সংযোজন) ক্রমানুসারে ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "কোষ বিভাজন ও বংশগতির তথ্য হুবহু স্থানান্তরে এই অনুলিপন প্রক্রিয়ার নির্ভুলতার অপরিহার্যতা মূল্যায়ন করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল নমুনা · রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_27",
    topicId: "top_ssc_biology_ch12_3",
    type: "CQ_CREATIVE",
    stem: "একটি চাঞ্চল্যকর অপরাধস্থলে ফরেনসিক পুলিশ সামান্য রক্তের দাগ এবং কয়েকটি চুল উদ্ধার করে। পরবর্তীতে ল্যাবরেটরিতে বিশেষ এনজাইম এবং ইলেক্ট্রোফোরেসিসের মাধ্যমে সংগৃহীত নমুনার একটি নির্দিষ্ট ব্যান্ড প্যাটার্ন তৈরি করা হয়। আটককৃত তিন সন্দেহভাজনের নমুনার সাথে তুলনা করে প্রকৃত অপরাধী শনাক্ত করা হয়।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে ফরেনসিক ক্ষেত্রে ডিএনএ ফিঙ্গারপ্রিন্টিং বা ডিএনএ প্রোফাইলিং পদ্ধতির সফল প্রয়োগ দেখানো হয়েছে।",
      coreConcept: "রেস্ট্রিকশন এনজাইম, জেল ইলেক্ট্রোফোরেসিস ও রেডিওঅ্যাকটিভ প্রোব দ্বারা ডিএনএ ব্যান্ডিং প্যাটার্ন বিশ্লেষণ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 264
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "জিন (Gene) কাকে বলে তা নির্ভুলভাবে লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "ডিএনএ কাটার কাজে ব্যবহৃত এনজাইমকে 'আণবিক কাঁচি' বলা হয় কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকের তথ্য অনুযায়ী অপরাধী শনাক্তকরণে ব্যবহৃত ডিএনএ টেস্টের প্রধান ধাপগুলো প্রবাহচিত্রের মাধ্যমে ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "বিচার ব্যবস্থা ও পিতৃত্ব বিরোধ নিষ্পত্তিতে প্রচলিত সাক্ষ্য-প্রমাণের চেয়ে ডিএনএ টেস্ট কেন অধিক নির্ভরযোগ্য তা বিশ্লেষণ করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল নমুনা · চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_28",
    topicId: "top_ssc_biology_ch12_4",
    type: "CQ_CREATIVE",
    stem: "কৃষিবিদ রফিক সাহেব তাঁর খামারে বিশুদ্ধ লম্বা (TT) মটরশুঁটি উদ্ভিদের সাথে বিশুদ্ধ খাটো (tt) মটরশুঁটি উদ্ভিদের কৃত্রিম পরাগায়ন ঘটালেন। প্রথম প্রজন্মে (F1) উৎপন্ন সকল গাছই লম্বা হলো। কিন্তু এই F1 উদ্ভিদের মধ্যে স্ব-পরাগায়ন ঘটিয়ে দ্বিতীয় প্রজন্মে (F2) দেখা গেল খাটো গাছ পুনরায় আত্মপ্রকাশ করেছে।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকটি মেন্ডেলের বিখ্যাত এক-সংকর বা মনোহাইব্রিড ক্রসের নিখুঁত বাস্তব রূপ।",
      coreConcept: "F1 জনুতে প্রচ্ছন্ন জিন সুপ্ত থাকলেও বিনষ্ট হয় না এবং F2 জনুতে ৩:১ অনুপাতে পৃথক হয়ে প্রকাশিত হয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 263
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "বংশগতিবিদ্যার জনকের পুরো নাম ও গবেষণার উদ্ভিদটির বৈজ্ঞানিক নাম লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "মেন্ডেল কেন মিষ্টি মটরশুঁটি উদ্ভিদ বেছে নিয়েছিলেন তার দুটি কারণ ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "পানেট স্কয়ার (Punnett square) ছকের সাহায্যে উদ্দীপকের F2 জনুর ফিনোটাইপিক ও জিনোটাইপিক ফলাফল প্রদর্শন করা।"
      },
      gha: {
        mark: 4,
        criteria: "“F1 জনুতে খাটো বৈশিষ্ট্য প্রকাশিত না হলেও বিনষ্ট হয়নি”—উদ্দীপকের আলোকে উক্তিটির যথার্থতা মূল্যায়ন করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল নমুনা · যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_29",
    topicId: "top_ssc_biology_ch12_5",
    type: "CQ_CREATIVE",
    stem: "জাহিদ-আমেনা দম্পতির পরপর তিনটি কন্যা সন্তান জন্মগ্রহণ করায় জাহিদ সাহেবের পরিবারের লোকজন আমেনা বেগমকে তীব্র অপবাদ ও মানসিক নির্যাতন করছে। একজন শিক্ষিত চিকিৎসক হিসেবে ডা. মাহমুদ পরিবারের সদস্যদের মানবদেহের ক্রোমোজোম ও নিষেকের বৈজ্ঞানিক নিয়ম ব্যাখ্যা করে বোঝালেন।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে মানুষের লিঙ্গ নির্ধারণে মাতার কোনো ভূমিকা না থাকা এবং পিতার শুক্রাণুর ওপর লিঙ্গ নির্ভরতার বৈজ্ঞানিক ব্যাখ্যা তুলে ধরা হয়েছে।",
      coreConcept: "মাতা হোমোগ্যামেটিক (XX) এবং পিতা হেটারোগ্যামেটিক (XY); পিতার Y শুক্রাণুর উপস্থিতিতেই কেবল পুত্র সন্তান জন্ম নেয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.২",
        pageNumber: 266
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "সেক্স ক্রোমোজোম কাকে বলে তা নির্ভুলভাবে লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "পুরুষকে কেন হেটারোগ্যামেটিক বলা হয় তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "পানেট স্কয়ার বা ক্রসিং চার্টের সাহায্যে মানুষের লিঙ্গ নির্ধারণ প্রক্রিয়া উপস্থাপন করা।"
      },
      gha: {
        mark: 4,
        criteria: "ডা. মাহমুদের বক্তব্য বিশ্লেষণ করে দেখাও যে কন্যা সন্তান জন্মের জন্য আমেনা বেগমকে দোষারোপ করা সম্পূর্ণ অবৈজ্ঞানিক ও কুসংস্কার।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল নমুনা · কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_30",
    topicId: "top_ssc_biology_ch12_6",
    type: "CQ_CREATIVE",
    stem: "এক বছর বয়সী আরিয়ান হঠাৎ মারাত্মক ফ্যাকাসে বর্ণ ধারণ করে ও ক্লান্ত হয়ে পড়ে। রক্ত পরীক্ষার পর চিকিৎসক জানালেন আরিয়ানের লোহিত রক্তকণিকা দ্রুত ধ্বংস হচ্ছে এবং সে একটি বংশগত অটোজোমাল রক্তের রোগে আক্রান্ত। পারিবারিক ইতিহাস ঘেঁটে জানা গেল আরিয়ানের বাবা ও মা দুজনেই বাহ্যিকভাবে সম্পূর্ণ সুস্থ হলেও তারা উভয়েই এই রোগের প্রচ্ছন্ন জিনের বাহক ছিলেন।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে আলোচিত রোগটি হলো থ্যালাসেমিয়া (Thalassemia Major)।",
      coreConcept: "পিতা-মাতা উভয়েই অটোজোমাল রিসেসিভ বাহক (Rr) হলে প্রতি গর্ভাবস্থায় ২৫% সন্তানে রোগ প্রকাশ পায়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৩",
        pageNumber: 268
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "থ্যালাসেমিয়ার সংজ্ঞা ও ত্রুটিপূর্ণ প্রোটিন চেইনের নাম লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "থ্যালাসেমিয়া রোগীকে কেন আয়রনসমৃদ্ধ ওষুধ সেবন করতে নিষেধ করা হয় তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "পানেট স্কয়ারের সাহায্যে আরিয়ানের পিতামাতার ক্রসে সন্তানের সুস্থ, বাহক ও আক্রান্ত হওয়ার সম্ভাবনার অনুপাত বের করা।"
      },
      gha: {
        mark: 4,
        criteria: "বাংলাদেশে থ্যালাসেমিয়া প্রতিরোধে বিবাহের পূর্বে রক্ত পরীক্ষা ও জনসচেতনতার গুরুত্ব বিশ্লেষণ করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল নমুনা · দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];
