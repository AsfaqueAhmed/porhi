import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter12QuestionsBatch2: QuestionData[] = [
  {
    id: "q_bio_12_31",
    topicId: "top_ssc_biology_ch12_1",
    type: "MCQ",
    stem: "কোন ভাইরাসে DNA অনুপস্থিত এবং কেবল RNA-ই বংশগতির ধারক ও বাহক হিসেবে কাজ করে?",
    options: [
      {
        id: "opt_bio_12_31_a",
        text: "TMV (Tobacco Mosaic Virus)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_31_b",
        text: "T2 ব্যাকটেরিওফাজ",
        isCorrect: false
      },
      {
        id: "opt_bio_12_31_c",
        text: "হেপাটাইটিস বি ভাইরাস",
        isCorrect: false
      },
      {
        id: "opt_bio_12_31_d",
        text: "ভ্যাক্সিনিয়া ভাইরাস",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: TMV (Tobacco Mosaic Virus)।",
      coreConcept: "অধিকাংশ জীবে DNA বংশগতি বস্তু হলেও কিছু উদ্ভিজ্জ ভাইরাস যেমন TMV-তে DNA থাকে না; কেবল RNA বংশগতির তথ্য স্থানান্তর করে।",
      distractorAnalysis: {
        "opt_bio_12_31_b": "T2 ব্যাকটেরিওফাজে দ্বি-সূত্রক DNA থাকে।",
        "opt_bio_12_31_c": "হেপাটাইটিস বি ভাইরাসে আংশিক দ্বি-সূত্রক DNA থাকে।",
        "opt_bio_12_31_d": "ভ্যাক্সিনিয়া একটি বৃহৎ DNA ভাইরাস।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 261
      },
      proTipShortcut: "TMV = তামাকের মোজাইক ভাইরাস = RNA বংশগতি বস্তু।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_32",
    topicId: "top_ssc_biology_ch12_1",
    type: "MCQ",
    stem: "RNA অণুর নাইট্রোজেনঘটিত ক্ষারকে DNA-এর কোন ক্ষারকটির পরিবর্তে ইউরাসিল (U) থাকে?",
    options: [
      {
        id: "opt_bio_12_32_a",
        text: "থাইমিন (T)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_32_b",
        text: "অ্যাডেনিন (A)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_32_c",
        text: "গুয়ানিন (G)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_32_d",
        text: "সাইটোসিন (C)",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: থাইমিন (T)।",
      coreConcept: "RNA-তে অ্যাডেনিন, গুয়ানিন ও সাইটোসিন থাকে, কিন্তু পাইরিমিডিন ক্ষারক থাইমিনের (T) স্থলে ইউরাসিল (U) উপস্থিত থাকে।",
      distractorAnalysis: {
        "opt_bio_12_32_b": "অ্যাডেনিন DNA ও RNA উভয়তেই বিদ্যমান।",
        "opt_bio_12_32_c": "গুয়ানিন উভয় নিউক্লিক এসিডেই উপস্থিত।",
        "opt_bio_12_32_d": "সাইটোসিন উভয় নিউক্লিক এসিডেই থাকে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 261
      },
      proTipShortcut: "RNA-তে T নেই, আছে U!"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_33",
    topicId: "top_ssc_biology_ch12_2",
    type: "MCQ",
    stem: "DNA অণুর একটি নিউক্লিওটাইডের তিনটি মৌলিক গঠন উপাদান কী কী?",
    options: [
      {
        id: "opt_bio_12_33_a",
        text: "৫-কার্বন ডিঅক্সিরাইবোজ শর্করা, অজৈব ফসফেট ও নাইট্রোজেন ক্ষারক",
        isCorrect: true
      },
      {
        id: "opt_bio_12_33_b",
        text: "৬-কার্বন গ্লুকোজ, ফ্যাটি এসিড ও অ্যামাইনো এসিড",
        isCorrect: false
      },
      {
        id: "opt_bio_12_33_c",
        text: "রাইবোজ শর্করা, সালফার ও নাইট্রোজেন ক্ষারক",
        isCorrect: false
      },
      {
        id: "opt_bio_12_33_d",
        text: "লিপিড, গ্লিসারল ও ফসফরিক এসিড",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ৫-কার্বন ডিঅক্সিরাইবোজ শর্করা, অজৈব ফসফেট ও নাইট্রোজেন ক্ষারক।",
      coreConcept: "একটি পেন্টোজ শর্করা, একটি ফসফেট অণু এবং একটি নাইট্রোজেনঘটিত ক্ষারক (পিউরিন বা পাইরিমিডিন) মিলে একটি পূর্ণাঙ্গ নিউক্লিওটাইড একক গঠিত হয়।",
      distractorAnalysis: {
        "opt_bio_12_33_b": "গ্লুকোজ ও ফ্যাটি এসিড কার্বোহাইড্রেট ও লিপিডের একক, নিউক্লিক এসিডের নয়।",
        "opt_bio_12_33_c": "রাইবোজ শর্করা RNA-তে থাকে এবং DNA-তে সালফার থাকে না।",
        "opt_bio_12_33_d": "লিপিড ও গ্লিসারল স্নেহজাতীয় পদার্থের উপাদান।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 258
      },
      proTipShortcut: "নিউক্লিওটাইড = সুগার + ফসফেট + বেস।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_34",
    topicId: "top_ssc_biology_ch12_2",
    type: "MCQ",
    stem: "DNA অণুর নাইট্রোজেন ক্ষারকগুলোর মধ্যে কোন দুটি পিউরিন (Purine) জাতীয় ক্ষারক?",
    options: [
      {
        id: "opt_bio_12_34_a",
        text: "অ্যাডেনিন (A) ও গুয়ানিন (G)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_34_b",
        text: "সাইটোসিন (C) ও থাইমিন (T)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_34_c",
        text: "থাইমিন (T) ও ইউরাসিল (U)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_34_d",
        text: "অ্যাডেনিন (A) ও সাইটোসিন (C)",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ্যাডেনিন (A) ও গুয়ানিন (G)।",
      coreConcept: "দ্বি-বলয়বিশিষ্ট বৃহৎ নাইট্রোজেন ক্ষারকদের পিউরিন বলে; DNA-তে এরা হলো অ্যাডেনিন ও গুয়ানিন (A ও G)।",
      distractorAnalysis: {
        "opt_bio_12_34_b": "সাইটোসিন ও থাইমিন হলো একক-বলয়বিশিষ্ট পাইরিমিডিন।",
        "opt_bio_12_34_c": "থাইমিন ও ইউরাসিল উভয়ই পাইরিমিডিন।",
        "opt_bio_12_34_d": "সাইটোসিন পাইরিমিডিন, পিউরিন নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 258
      },
      proTipShortcut: "পিউরিন = AG (Pure As Gold)!"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_35",
    topicId: "top_ssc_biology_ch12_2",
    type: "MCQ",
    stem: "DNA ডাবল হেলিক্সের বাইরের দিকের মূল অক্ষ বা ব্যাকবোন কোন দুটি উপাদান দিয়ে তৈরি?",
    options: [
      {
        id: "opt_bio_12_35_a",
        text: "পর পর সুগার এবং ফসফেট",
        isCorrect: true
      },
      {
        id: "opt_bio_12_35_b",
        text: "কেবল নাইট্রোজেন বেস",
        isCorrect: false
      },
      {
        id: "opt_bio_12_35_c",
        text: "লিপিড ও প্রোটিন",
        isCorrect: false
      },
      {
        id: "opt_bio_12_35_d",
        text: "সেলুলোজ ও কাইটিন",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পর পর সুগার এবং ফসফেট।",
      coreConcept: "DNA অণুর বাইরের দিকের দণ্ড দুটি পর পর সুগার এবং ফসফেট দিয়ে গঠিত এবং ভিতরের দিকে নাইট্রোজেন ক্ষারকগুলো শায়িতভাবে অবস্থান করে সিঁড়ির ধাপ গঠন করে।",
      distractorAnalysis: {
        "opt_bio_12_35_b": "নাইট্রোজেন বেসগুলো হেলিক্সের ভেতরের দিকে থাকে।",
        "opt_bio_12_35_c": "লিপিড ও প্রোটিন কোষঝিল্লির উপাদান।",
        "opt_bio_12_35_d": "সেলুলোজ উদ্ভিদ কোষপ্রাচীরের উপাদান।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 258
      },
      proTipShortcut: "রেলিং = সুগার-ফসফেট; সিঁড়ির ধাপ = বেস পেয়ার।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_36",
    topicId: "top_ssc_biology_ch12_2",
    type: "MCQ",
    stem: "এক্স-রে ক্রিস্টালোগ্রাফির মাধ্যমে DNA অণুর অত্যন্ত নিখুঁত ছায়াচিত্র তুলে ডাবল হেলিক্স মডেল আবিষ্কারে পথ প্রদর্শক ছিলেন কোন বিজ্ঞানী?",
    options: [
      {
        id: "opt_bio_12_36_a",
        text: "রোজালিন্ড ফ্র্যাঙ্কলিন (Rosalind Franklin)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_36_b",
        text: "রবার্ট ব্রাউন",
        isCorrect: false
      },
      {
        id: "opt_bio_12_36_c",
        text: "মারগুলিস",
        isCorrect: false
      },
      {
        id: "opt_bio_12_36_d",
        text: "অ্যান্টনি ভন লিউয়েনহুক",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: রোজালিন্ড ফ্র্যাঙ্কলিন (Rosalind Franklin)।",
      coreConcept: "ব্রিটিশ রসায়নবিদ রোজালিন্ড ফ্র্যাঙ্কলিন এক্স-রে অপবর্তন ছবি 'Photo 51' তুলেছিলেন, যা বিশ্লেষণ করে ওয়াটসন ও ক্রিক DNA-এর সর্পিলাকার গঠন আবিষ্কার করেন।",
      distractorAnalysis: {
        "opt_bio_12_36_b": "রবার্ট ব্রাউন ১৮৩১ সালে নিউক্লিয়াস আবিষ্কার করেন।",
        "opt_bio_12_36_c": "মারগুলিস ১৯৭৪ সালে জীবজগতের ৫ রাজ্য শ্রেণিবিন্যাস পরিমার্জন করেন।",
        "opt_bio_12_36_d": "লিউয়েনহুক প্রথম সজীব কোষ ও ব্যাকটেরিয়া প্রত্যক্ষ করেন।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 261
      },
      proTipShortcut: "DNA এক্স-রে ছবি = রোজালিন্ড ফ্র্যাঙ্কলিন।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_37",
    topicId: "top_ssc_biology_ch12_3",
    type: "MCQ",
    stem: "জেনেটিক বার্তা অনুযায়ী পলিপেপটাইড শৃঙ্খল গঠনে তিনটি নাইট্রোজেন ক্ষারকের সমাবেশকে কী বলা হয়?",
    options: [
      {
        id: "opt_bio_12_37_a",
        text: "ট্রিপলেট কোডন (Triplet Codon)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_37_b",
        text: "অ্যান্টিকোয়ার্ক",
        isCorrect: false
      },
      {
        id: "opt_bio_12_37_c",
        text: "প্লাজমিড",
        isCorrect: false
      },
      {
        id: "opt_bio_12_37_d",
        text: "সেন্ট্রোসোম",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ট্রিপলেট কোডন (Triplet Codon)।",
      coreConcept: "mRNA-তে অবস্থিত পরপর ৩টি নাইট্রোজেন বেসকে একত্রে একটি ট্রিপলেট কোডন বলে, যা প্রোটিন সংশ্লেষণের সময় একটি নির্দিষ্ট অ্যামাইনো এসিডকে নির্দেশ করে।",
      distractorAnalysis: {
        "opt_bio_12_37_b": "অ্যান্টিকোয়ার্ক পদার্থবিজ্ঞানের কণা।",
        "opt_bio_12_37_c": "প্লাজমিড ব্যাকটেরিয়ার স্ব-বিভাজনক্ষম অতিরিক্ত DNA।",
        "opt_bio_12_37_d": "সেন্ট্রোসোম কোষ বিভাজনের অঙ্গাণু।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 262
      },
      proTipShortcut: "৩টি ক্ষারক = ১টি ট্রিপলেট কোডন = ১টি অ্যামাইনো এসিড।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_38",
    topicId: "top_ssc_biology_ch12_3",
    type: "MCQ",
    stem: "ডিএনএ টেস্টে বিভিন্ন দৈর্ঘ্যের DNA খণ্ডগুলোকে আলাদা করতে ব্যবহৃত জেলটির নাম কী?",
    options: [
      {
        id: "opt_bio_12_38_a",
        text: "এগারোজ বা পলিঅ্যাক্রিলামাইড জেল",
        isCorrect: true
      },
      {
        id: "opt_bio_12_38_b",
        text: "সিলিকা জেল",
        isCorrect: false
      },
      {
        id: "opt_bio_12_38_c",
        text: "পেট্রোলিয়াম জেলি",
        isCorrect: false
      },
      {
        id: "opt_bio_12_38_d",
        text: "অ্যালুমিনিয়াম হাইড্রক্সাইড জেল",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: এগারোজ বা পলিঅ্যাক্রিলামাইড জেল।",
      coreConcept: "ইলেক্ট্রোফোরেসিস পদ্ধতিতে এগারোজ বা পলিঅ্যাক্রিলামাইড জেলের সূক্ষ্ম ছাঁকনির ভেতর দিয়ে বৈদ্যুতিক চার্জের প্রভাবে DNA খণ্ডগুলো তাদের আণবিক দৈর্ঘ্য অনুযায়ী পৃথক ব্যান্ড তৈরি করে।",
      distractorAnalysis: {
        "opt_bio_12_38_b": "সিলিকা জেল আর্দ্রতা শোষণকারী রাসায়নিক।",
        "opt_bio_12_38_c": "পেট্রোলিয়াম জেলি প্রসাধন সামগ্রী।",
        "opt_bio_12_38_d": "অ্যালুমিনিয়াম হাইড্রক্সাইড অ্যান্টাসিড জাতীয় ঔষধ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 264
      },
      proTipShortcut: "DNA জেল ইলেক্ট্রোফোরেসিস = এগারোজ জেল।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_39",
    topicId: "top_ssc_biology_ch12_4",
    type: "MCQ",
    stem: "গ্রেগর জোহান মেন্ডেল তাঁর বংশগতি গবেষণায় মটরশুঁটি উদ্ভিদের কয় জোড়া বিপরীতধর্মী বৈশিষ্ট্য নিয়ে কাজ করেছিলেন?",
    options: [
      {
        id: "opt_bio_12_39_a",
        text: "৭ জোড়া",
        isCorrect: true
      },
      {
        id: "opt_bio_12_39_b",
        text: "১৪ জোড়া",
        isCorrect: false
      },
      {
        id: "opt_bio_12_39_c",
        text: "৩ জোড়া",
        isCorrect: false
      },
      {
        id: "opt_bio_12_39_d",
        text: "২৩ জোড়া",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ৭ জোড়া।",
      coreConcept: "মেন্ডেল মটরশুঁটি উদ্ভিদের কাণ্ডের দৈর্ঘ্য, বীজের আকার, বীজের বর্ণ, ফুলের বর্ণ ইত্যাদি ৭ জোড়া (মোট ১৪টি) বিপরীত বৈশিষ্ট্য বেছে নিয়েছিলেন।",
      distractorAnalysis: {
        "opt_bio_12_39_b": "মোট বৈশিষ্ট্য ১৪টি, কিন্তু জোড় হিসেবে ৭ জোড়া।",
        "opt_bio_12_39_c": "৩ জোড়া ভুল সংখ্যা।",
        "opt_bio_12_39_d": "২৩ জোড়া মানুষের ক্রোমোজোম সংখ্যা।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 262
      },
      proTipShortcut: "মেন্ডেলের লাকি সেভেন = ৭ জোড়া বিপরীত লক্ষণ।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_40",
    topicId: "top_ssc_biology_ch12_4",
    type: "MCQ",
    stem: "একটি সংকর লম্বা (Tt) মটর গাছের সাথে বিশুদ্ধ খাটো (tt) মটর গাছের সংকরায়ণে অপত্য উদ্ভিদের ফিনোটাইপ অনুপাত কী হবে?",
    options: [
      {
        id: "opt_bio_12_40_a",
        text: "১ : ১ (৫০% লম্বা ও ৫০% খাটো)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_40_b",
        text: "৩ : ১",
        isCorrect: false
      },
      {
        id: "opt_bio_12_40_c",
        text: "১০০% লম্বা",
        isCorrect: false
      },
      {
        id: "opt_bio_12_40_d",
        text: "১০০% খাটো",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ১ : ১ (৫০% লম্বা ও ৫০% খাটো)।",
      coreConcept: "Tt × tt ক্রসে গ্যামেট টি ও টি এর মিলনে ৫০% Tt (লম্বা) এবং ৫০% tt (খাটো) উৎপন্ন হয়। একে টেস্ট ক্রস অনুপাত (১:১) বলে।",
      distractorAnalysis: {
        "opt_bio_12_40_b": "৩:১ অনুপাত কেবল Tt × Tt স্ব-পরাগায়নে পাওয়া যায়।",
        "opt_bio_12_40_c": "১০০% লম্বা পাওয়া যায় TT × tt ক্রসে।",
        "opt_bio_12_40_d": "১০০% খাটো পাওয়া যায় কেবল tt × tt ক্রসে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 263
      },
      proTipShortcut: "হেটারোজাইগাস × হোমোজাইগাস রিসেসিভ = ১ : ১ টেস্ট ক্রস।"
    },
    difficulty: "HARD",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_41",
    topicId: "top_ssc_biology_ch12_5",
    type: "MCQ",
    stem: "মানবদেহে পুরুষের শুক্রাণু সৃষ্টির সময় মিয়োসিস বিভাজনে Y ক্রোমোজোমবাহী শুক্রাণুর অনুপাত কত থাকে?",
    options: [
      {
        id: "opt_bio_12_41_a",
        text: "৫০% (বা মোট শুক্রাণুর অর্ধেক)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_41_b",
        text: "১০০%",
        isCorrect: false
      },
      {
        id: "opt_bio_12_41_c",
        text: "২৫%",
        isCorrect: false
      },
      {
        id: "opt_bio_12_41_d",
        text: "০%",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ৫০% (বা মোট শুক্রাণুর অর্ধেক)।",
      coreConcept: "পুরুষের জনন মাতৃকোষে XY ক্রোমোজোম থাকে। মিয়োসিস বিভাজনে ক্রোমোজোম জোড়া পৃথক হয়ে ঠিক অর্ধেক (৫০%) শুক্রাণুতে X এবং বাকি অর্ধেক (৫০%) শুক্রাণুতে Y ক্রোমোজোম স্থানান্তরিত হয়।",
      distractorAnalysis: {
        "opt_bio_12_41_b": "১০০% শুক্রাণুতে Y থাকলে কখনোই কন্যা সন্তান হতো না।",
        "opt_bio_12_41_c": "মিয়োসিসে দুটি ক্রোমোজোম সমান অনুপাতে বণ্টিত হয়, ২৫% নয়।",
        "opt_bio_12_41_d": "পুরুষ অবশ্যই Y ক্রোমোজোম তৈরি করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.২",
        pageNumber: 265
      },
      proTipShortcut: "শুক্রাণু অনুপাত: X শুক্রাণু : Y শুক্রাণু = ৫০% : ৫০%।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_42",
    topicId: "top_ssc_biology_ch12_5",
    type: "MCQ",
    stem: "নারীর ডিম্বাশয়ে উৎপন্ন ডিম্বাণুর ক্রোমোজোম রূপ কোনটি?",
    options: [
      {
        id: "opt_bio_12_42_a",
        text: "২২টি অটোজোম + ১টি X ক্রোমোজোম",
        isCorrect: true
      },
      {
        id: "opt_bio_12_42_b",
        text: "২২টি অটোজোম + ১টি Y ক্রোমোজোম",
        isCorrect: false
      },
      {
        id: "opt_bio_12_42_c",
        text: "৪৪টি অটোজোম + ২টি X ক্রোমোজোম",
        isCorrect: false
      },
      {
        id: "opt_bio_12_42_d",
        text: "২৩টি অটোজোম + ১টি X ক্রোমোজোম",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ২২টি অটোজোম + ১টি X ক্রোমোজোম।",
      coreConcept: "ডিম্বাণু হলো একটি হ্যাপ্লয়েড ($n$) কোষ। নারীর দেহকোষে থাকা ৪৪টি অটোজোম ও ২টি X ক্রোমোজোম মায়োসিস বিভাজনে হ্রাস পেয়ে প্রতি ডিম্বাণুতে ২২টি অটোজোম ও ১টি X ক্রোমোজোম যুক্ত হয়।",
      distractorAnalysis: {
        "opt_bio_12_42_b": "নারীদের দেহে কোনো Y ক্রোমোজোম নেই।",
        "opt_bio_12_42_c": "এটি ডিপ্লয়েড দেহকোষের গঠন, জননকোষের নয়।",
        "opt_bio_12_42_d": "অটোজোম সংখ্যা হ্রাস পেয়ে ২২টি হয়, ২৩টি নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.২",
        pageNumber: 265
      },
      proTipShortcut: "ডিম্বাণু = ২২ অটোজোম + ১টি X ক্রোমোজোম = ২৩টি।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_43",
    topicId: "top_ssc_biology_ch12_6",
    type: "MCQ",
    stem: "সেক্স-লিংকড বর্ণান্ধতার জন্য দায়ী মিউট্যান্ট জিনটি মানবদেহের কোন ক্রোমোজোমে অবস্থিত?",
    options: [
      {
        id: "opt_bio_12_43_a",
        text: "X ক্রোমোজোমে",
        isCorrect: true
      },
      {
        id: "opt_bio_12_43_b",
        text: "Y ক্রোমোজোমে",
        isCorrect: false
      },
      {
        id: "opt_bio_12_43_c",
        text: "২১ নং অটোজোমে",
        isCorrect: false
      },
      {
        id: "opt_bio_12_43_d",
        text: "মাইটোকন্ড্রিয়াল প্লাজমিডে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: X ক্রোমোজোমে।",
      coreConcept: "বর্ণান্ধতা হলো একটি X-লিংকড প্রচ্ছন্ন রোগ। এই জিনটি X ক্রোমোজোমের নন-হোমোলোগাস অঞ্চলে অবস্থিত।",
      distractorAnalysis: {
        "opt_bio_12_43_b": "Y ক্রোমোজোম আকারে খুব ছোট এবং এতে এই জিন থাকে না।",
        "opt_bio_12_43_c": "২১ নং ক্রোমোজোমের ট্রাইসোমিতে ডাউন সিনড্রোম হয়।",
        "opt_bio_12_43_d": "মানব কোষে প্লাজমিড থাকে না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৩",
        pageNumber: 267
      },
      proTipShortcut: "বর্ণান্ধতা জিন থাকে X ক্রোমোজোমে।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_44",
    topicId: "top_ssc_biology_ch12_6",
    type: "MCQ",
    stem: "বিটা থ্যালাসেমিয়া রোগটি মানবদেহের কোন প্রোটিনের উৎপাদন ত্রুটির কারণে ঘটে?",
    options: [
      {
        id: "opt_bio_12_44_a",
        text: "হিমোগ্লোবিনের বিটা-গ্লোবুলিন প্রোটিন",
        isCorrect: true
      },
      {
        id: "opt_bio_12_44_b",
        text: "পেশির মায়োসিন প্রোটিন",
        isCorrect: false
      },
      {
        id: "opt_bio_12_44_c",
        text: "চুলের কেরাটিন প্রোটিন",
        isCorrect: false
      },
      {
        id: "opt_bio_12_44_d",
        text: "রক্তরসের অ্যালবুমিন",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: হিমোগ্লোবিনের বিটা-গ্লোবুলিন প্রোটিন।",
      coreConcept: "লোহিত রক্তকণিকার হিমোগ্লোবিন আলফা ও বিটা গ্লোবুলিন দিয়ে তৈরি। বিটা-গ্লোবুলিন তৈরির জিন নষ্ট বা ব্যাহত হলে বিটা থ্যালাসেমিয়া বা কুলির থ্যালাসেমিয়া দেখা দেয়।",
      distractorAnalysis: {
        "opt_bio_12_44_b": "মায়োসিন পেশি সংকোচনের প্রোটিন।",
        "opt_bio_12_44_c": "কেরাটিন চুল ও নখের গাঠনিক প্রোটিন।",
        "opt_bio_12_44_d": "অ্যালবুমিন রক্তের অসমোটিক চাপ বজায় রাখে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৩",
        pageNumber: 269
      },
      proTipShortcut: "বিটা থ্যালাসেমিয়া = $\\beta$-গ্লোবুলিন চেইন নষ্ট।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_45",
    topicId: "top_ssc_biology_ch12_6",
    type: "MCQ",
    stem: "থ্যালাসেমিয়া রোগীদের নিয়মিত রক্ত গ্রহণজনিত কারণে শরীরে অতিরিক্ত আয়রন জমলে কোন গুরুত্বপূর্ণ অঙ্গটি অকেজো হয়ে যেতে পারে?",
    options: [
      {
        id: "opt_bio_12_45_a",
        text: "যকৃৎ (Liver) এবং অগ্ন্যাশয়",
        isCorrect: true
      },
      {
        id: "opt_bio_12_45_b",
        text: "ফুসফুসের অ্যালভিওলাই",
        isCorrect: false
      },
      {
        id: "opt_bio_12_45_c",
        text: "চোখের কর্নিয়া",
        isCorrect: false
      },
      {
        id: "opt_bio_12_45_d",
        text: "মধ্যকর্ণের অস্থি",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: যকৃৎ (Liver) এবং অগ্ন্যাশয়।",
      coreConcept: "বারবার রক্ত সঞ্চালনের ফলে শরীরে অতিরিক্ত আয়রন জমে যকৃৎ নষ্ট হয়ে জন্ডিস এবং অগ্ন্যাশয় ক্ষতিগ্রস্ত হয়ে ডায়াবেটিসের মতো মারাত্মক জটিলতা দেখা দেয়।",
      distractorAnalysis: {
        "opt_bio_12_45_b": "ফুসফুস সরাসরি আয়রন জমার প্রধান স্থান নয়।",
        "opt_bio_12_45_c": "চোখের কর্নিয়া রক্তবাহিকাহীন স্বচ্ছ কলা।",
        "opt_bio_12_45_d": "মধ্যকর্ণে আয়রন জমে ক্ষতি হয় না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৩",
        pageNumber: 270
      },
      proTipShortcut: "অতিরিক্ত আয়রন জমে = লিভার জন্ডিস + অগ্ন্যাশয় ডায়াবেটিস।"
    },
    difficulty: "HARD",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_46",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "বিজ্ঞানীদের ধারণা অনুযায়ী আদিম পৃথিবীতে প্রাণের প্রথম সূচনা হয়েছিল কোথায়?",
    options: [
      {
        id: "opt_bio_12_46_a",
        text: "সমুদ্রের উষ্ণ পানিতে",
        isCorrect: true
      },
      {
        id: "opt_bio_12_46_b",
        text: "উচ্চ পর্বতের চূড়ায়",
        isCorrect: false
      },
      {
        id: "opt_bio_12_46_c",
        text: "মরুভূমির বালুকাবেলায়",
        isCorrect: false
      },
      {
        id: "opt_bio_12_46_d",
        text: "গাছের ডালে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সমুদ্রের উষ্ণ পানিতে।",
      coreConcept: "পৃথিবী শীতল হওয়ার পর মেঘ থেকে বৃষ্টির পানিতে সৃষ্টি হওয়া আদিম সমুদ্রের পানিতে রাসায়নিক বিবর্তনের মাধ্যমে প্রথম নিউক্লিওপ্রোটিন ও আদি সজীব কোষের সূচনা ঘটে।",
      distractorAnalysis: {
        "opt_bio_12_46_b": "পর্বতের চূড়ায় অতিবেগুনি বিকিরণ অত্যন্ত ক্ষতিকর ছিল।",
        "opt_bio_12_46_c": "মরুভূমিতে পানির অভাবে জৈব দ্রবণ গঠিত হতে পারেনি।",
        "opt_bio_12_46_d": "তখন স্থলজ গাছপালার কোনো অস্তিত্বই ছিল না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 270
      },
      proTipShortcut: "জীবনের আদি সূতিকাগার = সমুদ্রের পানি।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_47",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "একটি স্ত্রী স্যামন মাছ প্রজনন ঋতুতে প্রায় কত কোটি ডিম পাড়ে?",
    options: [
      {
        id: "opt_bio_12_47_a",
        text: "প্রায় ৩ কোটি",
        isCorrect: true
      },
      {
        id: "opt_bio_12_47_b",
        text: "প্রায় ১ লাখ",
        isCorrect: false
      },
      {
        id: "opt_bio_12_47_c",
        text: "প্রায় ১০ হাজার",
        isCorrect: false
      },
      {
        id: "opt_bio_12_47_d",
        text: "প্রায় ৫০ কোটি",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রায় ৩ কোটি।",
      coreConcept: "ডারউইন তাঁর অত্যধিক হারে বংশবৃদ্ধির উদাহরণ হিসেবে উল্লেখ করেন যে একটি স্ত্রী স্যামন মাছ প্রজনন ঋতুতে প্রায় ৩ কোটি ডিম পাড়ে।",
      distractorAnalysis: {
        "opt_bio_12_47_b": "১ লাখ সাধারণ মাছের ডিমের সংখ্যা।",
        "opt_bio_12_47_c": "১০ হাজার কম সংখ্যা।",
        "opt_bio_12_47_d": "৫০ কোটি অবাস্তব অতিরঞ্জন।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 274
      },
      proTipShortcut: "স্যামন মাছ = ৩ কোটি ডিম।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_48",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "একই প্রজাতির সদস্যদের মধ্যে সীমিত খাদ্য ও বাসস্থানের জন্য যে লড়াই হয়, ডারউইনের মতে তাকে কী বলে?",
    options: [
      {
        id: "opt_bio_12_48_a",
        text: "অন্তঃপ্রজাতিক সংগ্রাম (Intraspecific struggle)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_48_b",
        text: "আন্তঃপ্রজাতিক সংগ্রাম (Interspecific struggle)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_48_c",
        text: "পরিবেশের সাথে সংগ্রাম",
        isCorrect: false
      },
      {
        id: "opt_bio_12_48_d",
        text: "রাসায়নিক সংগ্রাম",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অন্তঃপ্রজাতিক সংগ্রাম (Intraspecific struggle)।",
      coreConcept: "একই প্রজাতির সদস্যদের খাদ্য ও বাসস্থানের চাহিদা হুবহু এক হওয়ায় তাদের নিজেদের মধ্যকার প্রতিযোগিতা অত্যন্ত তীব্র হয়; একে অন্তঃপ্রজাতিক সংগ্রাম বলে।",
      distractorAnalysis: {
        "opt_bio_12_48_b": "ভিন্ন ভিন্ন প্রজাতির মধ্যে লড়াই হলো আন্তঃপ্রজাতিক (যেমন ব্যাঙ ও সাপ)।",
        "opt_bio_12_48_c": "খরা, বন্যা, ঝড় ইত্যাদি প্রতিকূলতার বিরুদ্ধে লড়াই হলো পরিবেশীয় সংগ্রাম।",
        "opt_bio_12_48_d": "এটি জীববিজ্ঞানের কোনো স্বীকৃত সংগ্রাম নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 274
      },
      proTipShortcut: "একই প্রজাতি = অন্তঃপ্রজাতিক; ভিন্ন প্রজাতি = আন্তঃপ্রজাতিক।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_49",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "পতঙ্গের ডানা এবং বাদুড়ের ডানা—এদেরকে সমবৃত্তীয় অঙ্গ (Analogous organs) বলা হয় কেন?",
    options: [
      {
        id: "opt_bio_12_49_a",
        text: "উভয়ের কাজ একই (উড়া) কিন্তু গঠন ও ভ্রূণীয় উৎপত্তি সম্পূর্ণ ভিন্ন",
        isCorrect: true
      },
      {
        id: "opt_bio_12_49_b",
        text: "উভয়ের অস্থির বিন্যাস হুবহু একরকম",
        isCorrect: false
      },
      {
        id: "opt_bio_12_49_c",
        text: "উভয়ই নিষ্ক্রিয় অঙ্গ হিসেবে অবস্থান করে",
        isCorrect: false
      },
      {
        id: "opt_bio_12_49_d",
        text: "উভয়ই মেরুদণ্ডী প্রাণীর অঙ্গ",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: উভয়ের কাজ একই (উড়া) কিন্তু গঠন ও ভ্রূণীয় উৎপত্তি সম্পূর্ণ ভিন্ন।",
      coreConcept: "পতঙ্গের ডানা কাইটিনময় উপাঙ্গ যা ত্বকীয় স্ফীতি থেকে তৈরি এবং এতে কোনো হাড় নেই; কিন্তু বাদুড়ের ডানায় হিউমেরাস, রেডিয়াস ও আঙ্গুলের হাড় থাকে। কাজ এক হলেও উৎপত্তি আলাদা হওয়ায় এরা সমবৃত্তীয়।",
      distractorAnalysis: {
        "opt_bio_12_49_b": "অস্থির বিন্যাস সমসংস্থ অঙ্গে এক থাকে, সমবৃত্তীয়তে নয়।",
        "opt_bio_12_49_c": "উভয় ডানা সক্রিয়ভাবে উড়তে ব্যবহৃত হয়।",
        "opt_bio_12_49_d": "পতঙ্গ অমেরুদণ্ডী এবং বাদুড় মেরুদণ্ডী স্তন্যপায়ী প্রাণী।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 277
      },
      proTipShortcut: "সমবৃত্তীয় = বৃত্ত বা কাজ এক, উৎস ভিন্ন।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_50",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "প্রাণিজগতে কোটি কোটি বছর ধরে রূপান্তরহীনভাবে টিকে থাকা একটি বিখ্যাত 'জীবিত জীবাশ্ম' (Living Fossil) কোনটি?",
    options: [
      {
        id: "opt_bio_12_50_a",
        text: "লিমুলাস বা রাজকাঁকড়া (Limulus)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_50_b",
        text: "রয়েল বেঙ্গল টাইগার",
        isCorrect: false
      },
      {
        id: "opt_bio_12_50_c",
        text: "আর্কিওপটেরিক্স",
        isCorrect: false
      },
      {
        id: "opt_bio_12_50_d",
        text: "ডাইনোসর",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: লিমুলাস বা রাজকাঁকড়া (Limulus)।",
      coreConcept: "লিমুলাস বা রাজকাঁকড়া প্রায় ৩০ কোটি বছর আগে ট্রাইলোবাইটের সমসাময়িক হলেও তাদের সহচর সকল প্রজাতি বিলুপ্ত হয়ে গেছে, কিন্তু লিমুলাস আজও অপরিবর্তিত রূপ নিয়ে বেঁচে আছে।",
      distractorAnalysis: {
        "opt_bio_12_50_b": "বাঘ আধুনিক স্তন্যপায়ী প্রাণী।",
        "opt_bio_12_50_c": "আর্কিওপটেরিক্স সম্পূর্ণ বিলুপ্ত ফসিল সংযোগকারী জীব।",
        "opt_bio_12_50_d": "ডাইনোসর কোটি বছর আগেই বিলুপ্ত হয়ে গেছে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 277
      },
      proTipShortcut: "জীবিত জীবাশ্ম প্রাণী = লিমুলাস (রাজকাঁকড়া)।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_51",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "জৈব অভিব্যক্তি সংক্রান্ত ধারণাকে কাজে লাগিয়ে মশা দমনে বিজ্ঞানীরা কোন আধুনিক পরিবেশবান্ধব প্রযুক্তি ব্যবহার করছেন?",
    options: [
      {
        id: "opt_bio_12_51_a",
        text: "জেনেটিক্যালি পরিবর্তিত বন্ধ্যা পুরুষ মশা উন্মুক্তকরণ",
        isCorrect: true
      },
      {
        id: "opt_bio_12_51_b",
        text: "পানিতে বিষাক্ত রাসায়নিক কীটনাশক ছিটানো",
        isCorrect: false
      },
      {
        id: "opt_bio_12_51_c",
        text: "সকল স্ত্রী মশার ডানা কেটে ফেলা",
        isCorrect: false
      },
      {
        id: "opt_bio_12_51_d",
        text: "মশার ডিম ফুটিয়ে মেরে ফেলা",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: জেনেটিক্যালি পরিবর্তিত বন্ধ্যা পুরুষ মশা উন্মুক্তকরণ।",
      coreConcept: "জেনেটিক ইঞ্জিনিয়ারিং-এর মাধ্যমে বন্ধ্যা পুরুষ মশা তৈরি করে প্রকৃতিতে ছেড়ে দিলে স্ত্রী মশার সাথে তাদের মিলনে কোনো কার্যকর ডিম ফোটে না, ফলে কোনো বিষাক্ত কীটনাশক প্রয়োগ ছাড়াই পরবর্তী প্রজন্মে মশার সংখ্যা শূন্যের কোঠায় নেমে আসে।",
      distractorAnalysis: {
        "opt_bio_12_51_b": "রাসায়নিক কীটনাশক প্রয়োগে মশা দ্রুত কীটনাশক-প্রতিরোধী হয়ে ওঠে এবং পরিবেশ দূষিত হয়।",
        "opt_bio_12_51_c": "প্রকৃতিতে কোটি কোটি মশার ডানা কাটা অসম্ভব।",
        "opt_bio_12_51_d": "এটি অবৈজ্ঞানিক ও অকার্যকর।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 278
      },
      proTipShortcut: "মশা দমন জেনেটিক্স = বন্ধ্যা পুরুষ মশা প্রযুক্তি।"
    },
    difficulty: "HARD",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_52",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "জৈব অভিব্যক্তির আধুনিক সংজ্ঞা অনুযায়ী কার্টিস ও বার্নস (১৯৮৯) বিবর্তনকে কীভাবে সংজ্ঞায়িত করেছেন?",
    options: [
      {
        id: "opt_bio_12_52_a",
        text: "প্রজন্ম থেকে প্রজন্মে নির্দিষ্ট এলাকার পপুলেশনে অ্যালিল ফ্রিকোয়েন্সির ধারাবাহিক পরিবর্তন",
        isCorrect: true
      },
      {
        id: "opt_bio_12_52_b",
        text: "একক জীবের তাৎক্ষণিক আকৃতি বদলানো",
        isCorrect: false
      },
      {
        id: "opt_bio_12_52_c",
        text: "সব জীবের একসাথে রূপান্তর",
        isCorrect: false
      },
      {
        id: "opt_bio_12_52_d",
        text: "কেবল প্রাণীদের স্থান ত্যাগ করে অন্য দেশে যাওয়া",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রজন্ম থেকে প্রজন্মে নির্দিষ্ট এলাকার পপুলেশনে অ্যালিল ফ্রিকোয়েন্সির ধারাবাহিক পরিবর্তন।",
      coreConcept: "১৯৮৯ সালে বিজ্ঞানী কার্টিস ও বার্নস আধুনিক পপুলেশন জেনেটিক্সের আলোকে স্পষ্ট করেন যে বিবর্তন একক ব্যক্তিতে নয়, বরং প্রজন্মান্তরে পপুলেশনে অ্যালিল ফ্রিকোয়েন্সির পরিবর্তনের মাধ্যমে ঘটে।",
      distractorAnalysis: {
        "opt_bio_12_52_b": "একক জীবের ব্যক্তিগত পরিবর্তন বিবর্তন নয়।",
        "opt_bio_12_52_c": "বিবর্তন মন্থর ও দীর্ঘমেয়াদি প্রক্রিয়া, একসাথে সব জীব রূপান্তর হয় না।",
        "opt_bio_12_52_d": "স্থান ত্যাগ হলো মাইগ্রেশন, বিবর্তন নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 271
      },
      proTipShortcut: "আধুনিক অভিব্যক্তি = অ্যালিল ফ্রিকোয়েন্সির পরিবর্তন।"
    },
    difficulty: "HARD",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_53",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "চার্লস ডারউইনের সমসাময়িক কোন ব্রিটিশ প্রকৃতিবিজ্ঞানী স্বাধীনভাবে প্রাকৃতিক নির্বাচনের অনুরূপ তত্ত্বে উপনীত হন?",
    options: [
      {
        id: "opt_bio_12_53_a",
        text: "আলফ্রেড রাসেল ওয়ালেস (Alfred Russel Wallace)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_53_b",
        text: "জঁ ব্যাপটিস্ট ল্যামার্ক",
        isCorrect: false
      },
      {
        id: "opt_bio_12_53_c",
        text: "লুই পাস্তুর",
        isCorrect: false
      },
      {
        id: "opt_bio_12_53_d",
        text: "টমাস ম্যালথাস",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: আলফ্রেড রাসেল ওয়ালেস (Alfred Russel Wallace)।",
      coreConcept: "ব্রিটিশ বিজ্ঞানী আলফ্রেড রাসেল ওয়ালেস মালয় দ্বীপপুঞ্জে গবেষণা চালিয়ে ডারউইনের স্বাধীন সমসাময়িক হিসেবে হুবহু একই প্রাকৃতিক নির্বাচন মতবাদ প্রণয়ন করেছিলেন।",
      distractorAnalysis: {
        "opt_bio_12_53_b": "ল্যামার্ক ১৮০৯ সালে অঙ্গের ব্যবহার ও অর্জিত বৈশিষ্ট্যের তত্ত্ব দেন।",
        "opt_bio_12_53_c": "লুই পাস্তুর অণুজীববিজ্ঞান ও পাস্তুরায়ন আবিষ্কার করেন।",
        "opt_bio_12_53_d": "ম্যালথাস জনসংখ্যার জ্যামিতিক বৃদ্ধির অর্থনীতিবিদ ছিলেন।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 273
      },
      proTipShortcut: "ডারউইন + ওয়ালেস = প্রাকৃতিক নির্বাচন যুগল।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_54",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "আদিম পৃথিবীর বায়ুমণ্ডলে প্রচুর পরিমাণে মিথেন ও অ্যামোনিয়ার উপস্থিতি থেকে কীভাবে জটিল জৈব অণু উৎপন্ন হয়েছিল?",
    options: [
      {
        id: "opt_bio_12_54_a",
        text: "বজ্রপাত ও অতিবেগুনি রশ্মির উচ্চ শক্তির প্রভাবে",
        isCorrect: true
      },
      {
        id: "opt_bio_12_54_b",
        text: "মাইটোকন্ড্রিয়ার ক্রেবস চক্র দ্বারা",
        isCorrect: false
      },
      {
        id: "opt_bio_12_54_c",
        text: "সবুজ পাতার সালোকসংশ্লেষণ দ্বারা",
        isCorrect: false
      },
      {
        id: "opt_bio_12_54_d",
        text: "চৌম্বক ক্ষেত্রের আকর্ষণে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বজ্রপাত ও অতিবেগুনি রশ্মির উচ্চ শক্তির প্রভাবে।",
      coreConcept: "আদিম পৃথিবীতে ওজোন স্তর না থাকায় সরাসরি আসা অতিবেগুনি রশ্মি এবং অগ্ন্যুৎপাত ও বিদ্যুৎপাতের তীব্র তাপে সরল গ্যাসগুলো বিক্রিয়া করে অ্যামাইনো এসিড ও নিউক্লিক এসিড তৈরি করে।",
      distractorAnalysis: {
        "opt_bio_12_54_b": "তখন কোনো মাইটোকন্ড্রিয়া বা কোষই ছিল না।",
        "opt_bio_12_54_c": "ক্লোরোফিলযুক্ত সবুজ উদ্ভিদ তখনো সৃষ্টি হয়নি।",
        "opt_bio_12_54_d": "চৌম্বক ক্ষেত্র রাসায়নিক বন্ধন তৈরি করে না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 271
      },
      proTipShortcut: "আদি শক্তি = বজ্রপাত + অতিবেগুনি (UV) রশ্মি।"
    },
    difficulty: "HARD",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_55",
    topicId: "top_ssc_biology_ch12_6",
    type: "CQ_CREATIVE",
    stem: "ইঞ্জিনিয়ারিং ভর্তি পরীক্ষার মেডিকেল টেস্টে সুমাইয়া ও তার ভাই সোহান অংশ নিল। টেস্টে চিকিৎসক একটি রঙিন বিন্দুযুক্ত চার্ট দেখিয়ে সংখ্যা পড়তে বললেন। সুমাইয়া সহজে '৭৪' পড়লেও সোহান সেখানে '২১' পড়ল। চিকিৎসক জানালেন, সোহান লাল-সবুজ বর্ণান্ধতায় আক্রান্ত। তবে তাদের মা-বাবা দুজনের কেউই চোখে দেখার সমস্যায় ভোগেন না।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে সেক্স-লিংকড রিসেসিভ বর্ণান্ধতার সঞ্চারণ এবং ইশিহারা চার্টের প্রয়োগ তুলে ধরা হয়েছে।",
      coreConcept: "মা স্বাভাবিক দৃষ্টিসম্পন্ন কিন্তু বর্ণান্ধতার জিন বহনকারী বাহক (X'X) হওয়ায় সোহানের আক্রান্ত হওয়া এবং সুমাইয়ার বাহক বা সুস্থ থাকার সম্ভাবনা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৩",
        pageNumber: 267
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "ইশিহারা চার্ট (Ishihara chart) কী তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "পুরুষদের তুলনায় নারীরা বর্ণান্ধতায় কম আক্রান্ত হয় কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "পানেট স্কয়ারের সাহায্যে সোহানের পিতা ও মাতার সম্ভাব্য জিনোটাইপ এবং সন্তানদের মধ্যে বর্ণান্ধতার সঞ্চারণ ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "সুমাইয়ার ভবিষ্যৎ পুত্র সন্তানের বর্ণান্ধ হওয়ার ঝুঁকি বিশ্লেষণ করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল নমুনা · ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_56",
    topicId: "top_ssc_biology_ch12_7",
    type: "CQ_CREATIVE",
    stem: "প্রকৃতিবিদ চার্লস ডারউইন লক্ষ্য করলেন, একটি স্যামন মাছ প্রজনন ঋতুতে প্রায় তিন কোটি ডিম পাড়ে। যদি সব ডিম ফুটে পোনা হতো এবং সবাই বেঁচে থাকত, তবে অল্প দিনেই পুরো সমুদ্র স্যামন মাছে ভরে যেত। কিন্তু বাস্তবে তা ঘটে না। প্রকৃতিতে বিভিন্ন প্রতিকূলতার কারণে মাত্র গুটিকয়েক স্যামন পূর্ণাঙ্গ বয়সে পৌঁছাতে পারে।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে ডারউইনের প্রাকৃতিক নির্বাচন তত্ত্বের 'অত্যধিক হারে বংশবৃদ্ধি' এবং 'অস্তিত্বের জন্য সংগ্রাম' আলোচিত হয়েছে।",
      coreConcept: "সীমিত বাসস্থান ও খাদ্যের কারণে আন্তঃপ্রজাতিক, অন্তঃপ্রজাতিক ও পরিবেশীয় সংগ্রাম পপুলেশনের সংখ্যা নিয়ন্ত্রণে রাখে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 274
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "জৈব অভিব্যক্তি (Evolution) কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "ডারউইনের মতে 'অন্তঃপ্রজাতিক সংগ্রাম' কেন সবচেয়ে তীব্র হয় তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকে উল্লিখিত স্যামন মাছের জীবনসংগ্রামের তিনটি পর্যায় ডারউইনবাদের আলোকে ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "“অনুকূল প্রকরণ ও প্রাকৃতিক নির্বাচনই নতুন প্রজাতির উৎপত্তির মূল চালিকাশক্তি”—ডারউইনের তত্ত্বের আলোকে উক্তিটির যথার্থতা মূল্যায়ন করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল নমুনা · চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_57",
    topicId: "top_ssc_biology_ch12_7",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান ল্যাবরেটরিতে শিক্ষক শিক্ষার্থীদের দুটি নমুনা দেখালেন—নমুনা-A হলো মানুষের হাত, পাখির ডানা ও তিমির ফ্লিপারের কঙ্কাল; নমুনা-B হলো পাখির ডানা ও প্রজাপতির ডানা। শিক্ষক বললেন, “এই অঙ্গগুলোর গঠন ও কাজ পর্যালোচনা করলে জৈব অভিব্যক্তির চমৎকার প্রমাণ পাওয়া যায়।”",
    options: null,
    explanation: {
      directAnswer: "নমুনা-A হলো সমসংস্থ অঙ্গ (Homologous organs) এবং নমুনা-B হলো সমবৃত্তীয় অঙ্গ (Analogous organs)।",
      coreConcept: "অভ্যন্তরীণ কঙ্কাল ও ভ্রূণীয় উৎপত্তির সাদৃশ্য বিবর্তনিক সাধারণ পূর্বপুরুষকে সমর্থন করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 277
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "সমসংস্থ অঙ্গের সংজ্ঞা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "লিমুলাসকে কেন 'জীবিত জীবাশ্ম' বলা হয় তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকের নমুনা-A এর অঙ্গগুলোর অস্থির বিন্যাসের মিল ও কাজের ভিন্নতা ছক আকারে ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "জৈব অভিব্যক্তি ও সাধারণ পূর্বপুরুষের উপস্থিতির সপক্ষে নমুনা-A ও নমুনা-B এর ভূমিকা তুলনামূলকভাবে বিশ্লেষণ করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল নমুনা · রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_58",
    topicId: "top_ssc_biology_ch12_7",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞানীগণ গবেষণা করে দেখেছেন, প্রায় ২৬০ কোটি বছর পূর্বে পৃথিবীর আদিম উত্তপ্ত বায়ুমণ্ডলে মিথেন, অ্যামোনিয়া, হাইড্রোজেন ও জলীয় বাষ্পের প্রাচুর্য থাকলেও কোনো মুক্ত অক্সিজেন গ্যাস ছিল না। তীব্র বজ্রপাত ও অতিবেগুনি রশ্মির প্রভাবে অজৈব পদার্থ থেকে জটিল প্রোটিন অণু তৈরি হয় এবং ক্রমান্বয়ে জীবনের উদ্ভব ঘটে।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে জীবনের রাসায়নিক বিবর্তন (Chemical Evolution) এবং আদিম পৃথিবীতে প্রাণের সূচনার ইতিহাস আলোচিত হয়েছে।",
      coreConcept: "মুক্ত অক্সিজেনবিহীন বিজারক বায়ুমণ্ডলে সরল গ্যাস থেকে জৈব অণু ও নিউক্লিওপ্রোটিনের স্বতঃস্ফূর্ত গঠন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 271
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "জীবাশ্ম (Fossil) সর্বপ্রথম কোন শতাব্দীতে কে আবিষ্কার করেন তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "আদিম বায়ুমণ্ডলে কেন মুক্ত অক্সিজেন গ্যাস ছিল না তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "আদিম গ্যাসগুলো থেকে ধাপে ধাপে বহুকোষী সজীব সত্তা সৃষ্টির রাসায়নিক পর্যায়ক্রমিক প্রবাহচিত্র উপস্থাপন করা।"
      },
      gha: {
        mark: 4,
        criteria: "“সালোকসংশ্লেষণকারী এককোষী শৈবালের আবির্ভাবই সবাত শ্বসনকারী উন্নত বহুকোষী প্রাণিকুল সৃষ্টির পথ উন্মোচন করেছিল”—উক্তিটির যথার্থতা বিশ্লেষণ করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল নমুনা · কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_59",
    topicId: "top_ssc_biology_ch12_3",
    type: "CQ_CREATIVE",
    stem: "কোষের মাস্টার অণু হিসেবে পরিচিত DNA-এর মধ্যে নির্দিষ্ট নাইট্রোজেন ক্ষারক অনুক্রমে জীবের সকল তথ্য সংরক্ষিত থাকে। কোষের কার্যসম্পাদনের জন্য এই বার্তাটি প্রথমে আরএনএ অনুলিপির মাধ্যমে সাইটোপ্লাজমে আসে এবং পরবর্তীতে রাইবোজোমের সহায়তায় নির্দিষ্ট প্রোটিন হিসেবে রূপ লাভ করে বৈশিষ্ট্য প্রকাশ করে।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে আণবিক জীববিজ্ঞানের কেন্দ্রীয় প্রত্যয় বা সেন্ট্রাল ডগমা (Central Dogma: DNA -> RNA -> Protein) তুলে ধরা হয়েছে।",
      coreConcept: "ট্রান্সক্রিপশনের মাধ্যমে mRNA তৈরি এবং ট্রান্সলেশনের মাধ্যমে ট্রিপলেট কোডন অনুযায়ী প্রোটিন সংশ্লেষণ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 262
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "ট্রিপলেট কোডন কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "সুকেন্দ্রিক কোষে প্রোটিন সংশ্লেষণের পর এন্ডোপ্লাজমিক রেটিকুলাম ও গলজি বডির ভূমিকা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকে নির্দেশিত জৈবিক তথ্য প্রবাহের মূল ধাপগুলো ছকের মাধ্যমে ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "“DNA সরাসরি কাজ না করে প্রোটিন তৈরির মাধ্যমেই জীবের গঠন থেকে আচরণ পর্যন্ত সবকিছু নিয়ন্ত্রণ করে”—বিশ্লেষণমূলক মূল্যায়ন করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল নমুনা · দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_60",
    topicId: "top_ssc_biology_ch12_4",
    type: "CQ_CREATIVE",
    stem: "একটি খামারে কৃষক রহিম মিয়া দুটি কালো রঙের সংকর গিনিপিগের (Bb) মধ্যে ক্রস ঘটিয়ে ৪টি বাচ্চা পেলেন। আশ্চর্যের বিষয় হলো বাচ্চার মধ্যে ৩টি কালো হলেও ১টি বাচ্চা সম্পূর্ণ সাদা রঙের জন্মাল। তিনি বুঝতে পারলেন না পিতা-মাতা কালো হওয়া সত্ত্বেও সাদা বাচ্চা কীভাবে এলো।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে হেটারোজাইগাস মনোহাইব্রিড ক্রসের ৩:১ ফিনোটাইপিক অনুপাতের বাস্তব দৃষ্টান্ত দেখানো হয়েছে।",
      coreConcept: "কালো বর্ণ (B) প্রকট এবং সাদা বর্ণ (b) প্রচ্ছন্ন হওয়ায় সংকর কালো পিতামাতা (Bb) থেকে হোমোজাইগাস রিসেসিভ সাদা সন্তান (bb) জন্ম লাভ করেছে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 263
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "অ্যালিল (Allele) কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "হোমোজাইগাস ও হেটারোজাইগাস অবস্থার মধ্যে পার্থক্য ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "পানেট স্কয়ারের সাহায্যে রহিম মিয়ার গিনিপিগের ক্রসের ফিনোটাইপিক ও জিনোটাইপিক বিশ্লেষণ প্রদর্শন করা।"
      },
      gha: {
        mark: 4,
        criteria: "রহিম মিয়ার বিস্ময়ের বৈজ্ঞানিক কারণ মেন্ডেলের পৃথকীকরণ সূত্রের আলোকে ব্যাখ্যা করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল নমুনা · যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];
