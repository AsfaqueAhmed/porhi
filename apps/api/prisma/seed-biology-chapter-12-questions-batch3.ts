import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter12QuestionsBatch3: QuestionData[] = [
  {
    id: "q_bio_12_61",
    topicId: "top_ssc_biology_ch12_1",
    type: "MCQ",
    stem: "ক্রোমোজোমের সেন্ট্রোমিয়ারের উভয় পাশের অংশকে কী নামে অভিহিত করা হয়?",
    options: [
      {
        id: "opt_bio_12_61_a",
        text: "ক্রোমোজোম বাহু (Chromosome arm)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_61_b",
        text: "স্যাটেলাইট",
        isCorrect: false
      },
      {
        id: "opt_bio_12_61_c",
        text: "নিউক্লিওলাস",
        isCorrect: false
      },
      {
        id: "opt_bio_12_61_d",
        text: "টেলোমিয়ার",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ক্রোমোজোম বাহু (Chromosome arm)।",
      coreConcept: "সেন্ট্রোমিয়ার বা মুখ্য খাঁজের দুপাশে প্রসারিত ক্রোমাটিড অংশগুলোকে ক্রোমোজোম বাহু বলা হয়।",
      distractorAnalysis: {
        "opt_bio_12_61_b": "স্যাটেলাইট হলো গৌণ খাঁজের পরবর্তী গোলাকার প্রান্তভাগ।",
        "opt_bio_12_61_c": "নিউক্লিওলাস নিউক্লিয়াসের গোলাকার ঘন অংশ।",
        "opt_bio_12_61_d": "টেলোমিয়ার হলো ক্রোমোজোমের প্রান্তভাগ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 257
      },
      proTipShortcut: "সেন্ট্রোমিয়ারের দুই পাশের ডাল = বাহু (Arm)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_62",
    topicId: "top_ssc_biology_ch12_1",
    type: "MCQ",
    stem: "জীবজগতে বিভিন্ন প্রজাতির কোষে ডিপ্লয়েড ক্রোমোজোম সংখ্যার সঠিক বিস্তার কোনটি?",
    options: [
      {
        id: "opt_bio_12_62_a",
        text: "২ থেকে ১৬০০ পর্যন্ত",
        isCorrect: true
      },
      {
        id: "opt_bio_12_62_b",
        text: "১০ থেকে ১০০ পর্যন্ত",
        isCorrect: false
      },
      {
        id: "opt_bio_12_62_c",
        text: "৪৬ থেকে ৯২ পর্যন্ত",
        isCorrect: false
      },
      {
        id: "opt_bio_12_62_d",
        text: "১ থেকে ৫০০ পর্যন্ত",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ২ থেকে ১৬০০ পর্যন্ত।",
      coreConcept: "প্রজাতির বৈশিষ্ট্যভেদে ডিপ্লয়েড কোষে ক্রোমোজোম সংখ্যা সর্বনিম্ন ২ (যেমন গোলকৃমি এস্কারিস) থেকে সর্বোচ্চ ১৬০০ (যেমন রেডিওলারিয়া প্রোটোজোয়া বা ফার্ন ওফিউগ্লোসাম) পর্যন্ত হতে পারে।",
      distractorAnalysis: {
        "opt_bio_12_62_b": "এটি একটি সংকীর্ণ ভুল সীমা।",
        "opt_bio_12_62_c": "৪৬ মানুষের ক্রোমোজোম সংখ্যা, সামগ্রিক বিস্তার নয়।",
        "opt_bio_12_62_d": "ডিপ্লয়েড সংখ্যা সর্বদা জোড় হয়, ১ হতে পারে না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 257
      },
      proTipShortcut: "ক্রোমোজোম বিস্তার = ২ থেকে ১৬০০।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_63",
    topicId: "top_ssc_biology_ch12_2",
    type: "MCQ",
    stem: "একটি DNA অণুর ডাবল হেলিক্সে মোট ২০টি নিউক্লিওটাইড জোড় (২০ bp) থাকলে তার অক্ষীয় দৈর্ঘ্য কত হবে?",
    options: [
      {
        id: "opt_bio_12_63_a",
        text: "৬৮ Å (অ্যাংস্ট্রম)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_63_b",
        text: "৩৪ Å (অ্যাংস্ট্রম)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_63_c",
        text: "২০ Å (অ্যাংস্ট্রম)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_63_d",
        text: "৩.৪ Å (অ্যাংস্ট্রম)",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ৬৮ Å (অ্যাংস্ট্রম)।",
      coreConcept: "DNA হেলিক্সে প্রতি ১০টি বেস পেয়ারের দৈর্ঘ্য ৩৪ Å। সুতরাং ২০টি বেস পেয়ারের দৈর্ঘ্য হবে $২ \\times ৩৪ = ৬৮$ Å (বা $২০ \\times ৩.৪ = ৬৮$ Å)।",
      distractorAnalysis: {
        "opt_bio_12_63_b": "৩৪ Å হলো ১০টি বেস পেয়ারের দৈর্ঘ্য।",
        "opt_bio_12_63_c": "২০ Å হলো ডাবল হেলিক্সের ব্যাস।",
        "opt_bio_12_63_d": "৩.৪ Å হলো একটিমাত্র ধাপের দূরত্ব।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 258
      },
      proTipShortcut: "দৈর্ঘ্য = বেস পেয়ার সংখ্যা $\\times$ ৩.৪ Å।"
    },
    difficulty: "HARD",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_64",
    topicId: "top_ssc_biology_ch12_2",
    type: "MCQ",
    stem: "চার্জাফের নীতি (Chargaff's Rule) অনুযায়ী একটি দ্বি-সূত্রক DNA অণুতে ৩০% অ্যাডেনিন (A) থাকলে সাইটোসিনের (C) শতকরা পরিমাণ কত হবে?",
    options: [
      {
        id: "opt_bio_12_64_a",
        text: "২০%",
        isCorrect: true
      },
      {
        id: "opt_bio_12_64_b",
        text: "৩০%",
        isCorrect: false
      },
      {
        id: "opt_bio_12_64_c",
        text: "৪০%",
        isCorrect: false
      },
      {
        id: "opt_bio_12_64_d",
        text: "৫০%",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ২০%।",
      coreConcept: "চার্জাফের নিয়মে $A = T$ এবং $G = C$। যদি $A = ৩০\\%$ হয় তবে $T = ৩০\\%$। ফলে $A + T = ৬০\\%$। অবশিষ্ট $৪০\\%$ হবে $G + C$। যেহেতু $G = C$, তাই সাইটোসিন $C = ৪০\\% \\div ২ = ২০\\%$।",
      distractorAnalysis: {
        "opt_bio_12_64_b": "৩০% হলো থাইমিনের (T) শতকরা হার।",
        "opt_bio_12_64_c": "৪০% হলো গুয়ানিন ও সাইটোসিনের যৌথ পরিমাণ (G+C)।",
        "opt_bio_12_64_d": "৫০% হলো মোট পিউরিন বা পাইরিমিডিনের হার।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 258
      },
      proTipShortcut: "%A=%T এবং %G=%C; চারটির যোগফল ১০০%।"
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_65",
    topicId: "top_ssc_biology_ch12_2",
    type: "MCQ",
    stem: "DNA প্রতিলিপনের সময় মাতৃসূত্রের মধ্যকার হাইড্রোজেন বন্ধন ভেঙে উন্মুক্ত করতে কোন এনজাইম মুখ্য ভূমিকা রাখে?",
    options: [
      {
        id: "opt_bio_12_65_a",
        text: "হেলিকোজ (Helicase)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_65_b",
        text: "ডিএনএ লাইগেজ",
        isCorrect: false
      },
      {
        id: "opt_bio_12_65_c",
        text: "ট্রিপসিন",
        isCorrect: false
      },
      {
        id: "opt_bio_12_65_d",
        text: "লাইপেজ",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: হেলিকোজ (Helicase)।",
      coreConcept: "হেলিকোজ এনজাইম DNA ডাবল হেলিক্সের ক্ষারকগুলোর মধ্যবর্তী হাইড্রোজেন বন্ধন ছিন্ন করে দুটি সূত্রককে জিপারের মতো খুলে দেয়।",
      distractorAnalysis: {
        "opt_bio_12_65_b": "লাইগেজ এনজাইম ফাঁক জোড়া লাগাতে কাজ করে।",
        "opt_bio_12_65_c": "ট্রিপসিন অগ্ন্যাশয় রসে প্রোটিন পরিপাক করে।",
        "opt_bio_12_65_d": "লাইপেজ স্নেহ পদার্থ পরিপাক করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 264
      },
      proTipShortcut: "হেলিক্স খোলে = হেলিকোজ।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_66",
    topicId: "top_ssc_biology_ch12_3",
    type: "MCQ",
    stem: "১৯৮৪ সালে ডিএনএ ফিঙ্গারপ্রিন্টিং (DNA Fingerprinting) প্রযুক্তি প্রথম আবিষ্কার করেন কোন ব্রিটিশ জিনবিজ্ঞানী?",
    options: [
      {
        id: "opt_bio_12_66_a",
        text: "স্যার অ্যালেক জেফ্রিস (Sir Alec Jeffreys)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_66_b",
        text: "রবার্ট হুক",
        isCorrect: false
      },
      {
        id: "opt_bio_12_66_c",
        text: "গ্রেগর মেন্ডেল",
        isCorrect: false
      },
      {
        id: "opt_bio_12_66_d",
        text: "চার্লস ডারউইন",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: স্যার অ্যালেক জেফ্রিস (Sir Alec Jeffreys)।",
      coreConcept: "১৯৮৪ সালে ব্রিটিশ জেনেটিসিস্ট স্যার অ্যালেক জেফ্রিস লিচেস্টার বিশ্ববিদ্যালয়ে প্রথম ডিএনএ প্রোফাইলিং বা ফিঙ্গারপ্রিন্টিং আবিষ্কার করেন।",
      distractorAnalysis: {
        "opt_bio_12_66_b": "রবার্ট হুক কোষের আবিষ্কারক।",
        "opt_bio_12_66_c": "মেন্ডেল মটর উদ্ভিদে বংশগতি সূত্র আবিষ্কার করেন।",
        "opt_bio_12_66_d": "ডারউইন প্রাকৃতিক নির্বাচন মতবাদ দেন।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 264
      },
      proTipShortcut: "DNA ফিঙ্গারপ্রিন্টিং এর জনক = অ্যালেক জেফ্রিস (১৯৮৪)।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_67",
    topicId: "top_ssc_biology_ch12_3",
    type: "MCQ",
    stem: "ডিএনএ টেস্টের সময় নাইট্রোসেলুলোজ কাগজের ব্যান্ডগুলোর সাথে সম্পূরক জোড় বাঁধতে তেজস্ক্রিয় আইসোটোপযুক্ত একক সূত্রককে কী বলা হয়?",
    options: [
      {
        id: "opt_bio_12_67_a",
        text: "ডিএনএ প্রোব (DNA Probe)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_67_b",
        text: "প্লাজমিড ভেক্টর",
        isCorrect: false
      },
      {
        id: "opt_bio_12_67_c",
        text: "প্রাইমার আরএনএ",
        isCorrect: false
      },
      {
        id: "opt_bio_12_67_d",
        text: "অ্যান্টিবডি",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ডিএনএ প্রোব (DNA Probe)।",
      coreConcept: "তেজস্ক্রিয় আইসোটোপ চিহ্নিত ক্ষুদ্র একক সূত্রক DNA-কে প্রোব বলে, যা সুনির্দিষ্ট পরিপূরক সিকোয়েন্সের সাথে হাইব্রিডাইজেশন ঘটিয়ে ব্যান্ডিং দৃশ্যমান করে।",
      distractorAnalysis: {
        "opt_bio_12_67_b": "প্লাজমিড জিন ক্লোনিংয়ে বাহক হিসেবে কাজ করে।",
        "opt_bio_12_67_c": "প্রাইমার DNA রেপ্লিকেশন শুরুর সূচক।",
        "opt_bio_12_67_d": "অ্যান্টিবডি প্রোটিন যা রোগ প্রতিরোধে কাজ করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 264
      },
      proTipShortcut: "ব্যান্ড খোঁজার মার্কার = DNA প্রোব।"
    },
    difficulty: "HARD",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_68",
    topicId: "top_ssc_biology_ch12_4",
    type: "MCQ",
    stem: "মেন্ডেলের প্রথম সূত্রের সর্বজনবিদিত নাম কোনটি?",
    options: [
      {
        id: "opt_bio_12_68_a",
        text: "পৃথকীকরণ সূত্র (Law of Segregation)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_68_b",
        text: "স্বাধীন সঞ্চারণের সূত্র (Law of Independent Assortment)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_68_c",
        text: "প্রাকৃতিক নির্বাচন সূত্র",
        isCorrect: false
      },
      {
        id: "opt_bio_12_68_d",
        text: "ব্যবহার ও অব্যবহারের সূত্র",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পৃথকীকরণ সূত্র (Law of Segregation)।",
      coreConcept: "জননকোষ সৃষ্টির সময় বিপরীত বৈশিষ্ট্যের উপাদানগুলো একত্রে থাকলেও কখনো মিশ্রিত হয় না, বরং পরস্পর থেকে পৃথক হয়ে ভিন্ন ভিন্ন গ্যামেটে প্রবেশ করে; একে পৃথকীকরণ সূত্র বলে।",
      distractorAnalysis: {
        "opt_bio_12_68_b": "স্বাধীন সঞ্চারণের সূত্র হলো মেন্ডেলের দ্বিতীয় সূত্র (ডাইহাইব্রিড ক্রসের ৯:৩:৩:১)।",
        "opt_bio_12_68_c": "প্রাকৃতিক নির্বাচন ডারউইনের তত্ত্ব।",
        "opt_bio_12_68_d": "ব্যবহার ও অব্যবহার ল্যামার্কের মতবাদ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 263
      },
      proTipShortcut: "মেন্ডেল ১ম সূত্র = পৃথকীকরণ সূত্র (৩:১ অনুপাত)।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_69",
    topicId: "top_ssc_biology_ch12_4",
    type: "MCQ",
    stem: "দুটি হেটারোজাইগাস সংকর লম্বা (Tt) মটর উদ্ভিদের ক্রসে হোমোজাইগাস উদ্ভিদের মোট অনুপাত কত হবে?",
    options: [
      {
        id: "opt_bio_12_69_a",
        text: "৫০% (বিশুদ্ধ লম্বা TT ২৫% এবং বিশুদ্ধ খাটো tt ২৫%)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_69_b",
        text: "৭৫%",
        isCorrect: false
      },
      {
        id: "opt_bio_12_69_c",
        text: "১০০%",
        isCorrect: false
      },
      {
        id: "opt_bio_12_69_d",
        text: "২৫%",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ৫০% (বিশুদ্ধ লম্বা TT ২৫% এবং বিশুদ্ধ খাটো tt ২৫%)।",
      coreConcept: "Tt × Tt ক্রসের জিনোটাইপ হলো ১ TT : ২ Tt : ১ tt। এখানে TT এবং tt উভয়ই হোমোজাইগাস (১+১ = ২ ভাগ অর্থাৎ ৫০%) এবং Tt হলো হেটারোজাইগাস (২ ভাগ অর্থাৎ ৫০%)।",
      distractorAnalysis: {
        "opt_bio_12_69_b": "৭৫% হলো ফিনোটাইপে লম্বা উদ্ভিদের অনুপাত।",
        "opt_bio_12_69_c": "সকল সন্তান হোমোজাইগাস নয়।",
        "opt_bio_12_69_d": "২৫% শুধু বিশুদ্ধ লম্বার একক হার।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 263
      },
      proTipShortcut: "হোমোজাইগাস = TT (২৫%) + tt (২৫%) = ৫০%।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_70",
    topicId: "top_ssc_biology_ch12_5",
    type: "MCQ",
    stem: "মানুষের লিঙ্গ নির্ধারণে ওয়াই (Y) ক্রোমোজোম এক্স (X) ক্রোমোজোমের তুলনায় গঠনে কেমন?",
    options: [
      {
        id: "opt_bio_12_70_a",
        text: "আকারে কিছুটা ছোট এবং অল্প জিনযুক্ত",
        isCorrect: true
      },
      {
        id: "opt_bio_12_70_b",
        text: "আকারে দ্বিগুণ বড় ও ভারী",
        isCorrect: false
      },
      {
        id: "opt_bio_12_70_c",
        text: "সম্পূর্ণ গোলাকার রিং-এর মতো",
        isCorrect: false
      },
      {
        id: "opt_bio_12_70_d",
        text: "উভয় ক্রোমোজোম হুবহু একরকম",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: আকারে কিছুটা ছোট এবং অল্প জিনযুক্ত।",
      coreConcept: "পাঠ্যবইয়ের তথ্যমতে X এবং Y উভয় ক্রোমোজোমই লম্বা রডের মতো হলেও Y ক্রোমোজোমটি X ক্রোমোজোমের তুলনায় কিছুটা ছোট এবং এতে জিনের সংখ্যা অনেক কম থাকে।",
      distractorAnalysis: {
        "opt_bio_12_70_b": "Y ক্রোমোজোম বড় নয়, বরং ছোট।",
        "opt_bio_12_70_c": "এটি রৈখিক দণ্ডের মতো, বৃত্তাকার নয়।",
        "opt_bio_12_70_d": "X ও Y আকারে ও জিন বিন্যাসে ভিন্ন।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.২",
        pageNumber: 265
      },
      proTipShortcut: "Y ক্রোমোজোম X-এর চেয়ে কিছুটা ছোট।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_71",
    topicId: "top_ssc_biology_ch12_6",
    type: "MCQ",
    stem: "আলফা থ্যালাসেমিয়া প্রধানত পৃথিবীর কোন ভৌগোলিক অঞ্চলের জনগোষ্ঠীর মাঝে তুলনামূলক বেশি দেখা যায়?",
    options: [
      {
        id: "opt_bio_12_71_a",
        text: "দক্ষিণ-পূর্ব এশিয়া, মধ্যপ্রাচ্য, চীন ও আফ্রিকা",
        isCorrect: true
      },
      {
        id: "opt_bio_12_71_b",
        text: "কেবল উত্তর মেরু ও সাইবেরিয়া",
        isCorrect: false
      },
      {
        id: "opt_bio_12_71_c",
        text: "কেবলমাত্র অস্ট্রেলিয়া",
        isCorrect: false
      },
      {
        id: "opt_bio_12_71_d",
        text: "কেবলমাত্র স্ক্যান্ডিনেভিয়ান দেশসমূহ",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: দক্ষিণ-পূর্ব এশিয়া, মধ্যপ্রাচ্য, চীন ও আফ্রিকা।",
      coreConcept: "পাঠ্যবই অনুযায়ী আলফা থ্যালাসেমিয়া রোগটি দক্ষিণ-পূর্ব এশিয়া, মধ্যপ্রাচ্য, চীন ও আফ্রিকার জনগোষ্ঠীর মাঝে বেশি পরিলক্ষিত হয়।",
      distractorAnalysis: {
        "opt_bio_12_71_b": "মেরু অঞ্চলে থ্যালাসেমিয়ার প্রকোপ নেই।",
        "opt_bio_12_71_c": "অস্ট্রেলিয়ায় এটি বিরল।",
        "opt_bio_12_71_d": "স্ক্যান্ডিনেভিয়ান অঞ্চলে এটি প্রচলিত নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৩",
        pageNumber: 269
      },
      proTipShortcut: "আলফা থ্যালাসেমিয়া = দক্ষিণ-পূর্ব এশিয়া ও মধ্যপ্রাচ্য।"
    },
    difficulty: "HARD",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_72",
    topicId: "top_ssc_biology_ch12_6",
    type: "MCQ",
    stem: "বাত রোগের জন্য দীর্ঘদিন কোন ওষুধটি সেবনের পার্শ্বপ্রতিক্রিয়ায় চোখের আলোক-সংবেদী পিগমেন্ট নষ্ট হয়ে বর্ণান্ধতা হতে পারে?",
    options: [
      {
        id: "opt_bio_12_72_a",
        text: "হাইড্রক্সি-ক্লোরোকুইন (Hydroxychloroquine)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_72_b",
        text: "অ্যামোক্সিসিলিন",
        isCorrect: false
      },
      {
        id: "opt_bio_12_72_c",
        text: "প্যারাসিটামল",
        isCorrect: false
      },
      {
        id: "opt_bio_12_72_d",
        text: "সিপ্রোফ্লক্সাসিন",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: হাইড্রক্সি-ক্লোরোকুইন (Hydroxychloroquine)।",
      coreConcept: "বংশগতি ছাড়াও বাত রোগের চিকিৎসায় ব্যবহৃত হাইড্রক্সি-ক্লোরোকুইন চোখের রেটিনার স্নায়ুকোষের রঞ্জক কণা বিনষ্ট করে বর্ণান্ধতা ঘটাতে পারে।",
      distractorAnalysis: {
        "opt_bio_12_72_b": "অ্যামোক্সিসিলিন সাধারণ অ্যান্টিবায়োটিক।",
        "opt_bio_12_72_c": "প্যারাসিটামল জ্বর ও ব্যথানাশক।",
        "opt_bio_12_72_d": "সিপ্রোফ্লক্সাসিন অ্যান্টিবায়োটিক।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৩",
        pageNumber: 267
      },
      proTipShortcut: "বাত রোগের ঔষধ পার্শ্বপ্রতিক্রিয়া = হাইড্রক্সি-ক্লোরোকুইন।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_73",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "খ্রিস্টপূর্ব পঞ্চম শতাব্দীতে সর্বপ্রথম জীবাশ্ম (Fossil) আবিষ্কার করে প্রমাণ করেন জীবদেহের আকার অপরিবর্তনীয় নয়—কোন গ্রিক মনীষী?",
    options: [
      {
        id: "opt_bio_12_73_a",
        text: "বিজ্ঞানী জেনোফেন (Xenophanes)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_73_b",
        text: "দার্শনিক সক্রেটিস",
        isCorrect: false
      },
      {
        id: "opt_bio_12_73_c",
        text: "আর্কিমিডিস",
        isCorrect: false
      },
      {
        id: "opt_bio_12_73_d",
        text: "পিথাগোরাস",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বিজ্ঞানী জেনোফেন (Xenophanes)।",
      coreConcept: "খ্রিস্টপূর্ব ৫ম শতাব্দীতে গ্রিক দার্শনিক ও বিজ্ঞানী জেনোফেন পর্বতের শিলাস্তরে সামুদ্রিক প্রাণীর জীবাশ্ম প্রত্যক্ষ করে প্রথম প্রমাণ করেন যে অতীত ও বর্তমানের জীবে পরিবর্তন ঘটেছে।",
      distractorAnalysis: {
        "opt_bio_12_73_b": "সক্রেটিস নীতিশাস্ত্র ও দর্শনের পথিকৃৎ।",
        "opt_bio_12_73_c": "আর্কিমিডিস প্লবতা ও লিভারের নীতি দেন।",
        "opt_bio_12_73_d": "পিথাগোরাস গণিতবিদ ছিলেন।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 270
      },
      proTipShortcut: "খ্রিস্টপূর্ব ৫ম শতাব্দী = জেনোফেন = প্রথম জীবাশ্ম আবিষ্কার।"
    },
    difficulty: "HARD",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_74",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "জীববিজ্ঞানে সর্বপ্রথম 'ইভোলিউশন' (Evolution) শব্দটি কে ব্যবহার করেন?",
    options: [
      {
        id: "opt_bio_12_74_a",
        text: "হার্বার্ট স্পেনসার (Herbert Spencer)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_74_b",
        text: "চার্লস ডারউইন",
        isCorrect: false
      },
      {
        id: "opt_bio_12_74_c",
        text: "জঁ ব্যাপটিস্ট ল্যামার্ক",
        isCorrect: false
      },
      {
        id: "opt_bio_12_74_d",
        text: "গ্রেগর মেন্ডেল",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: হার্বার্ট স্পেনসার (Herbert Spencer)।",
      coreConcept: "ইংরেজ দার্শনিক ও শিক্ষাবিদ হার্বার্ট স্পেনসার প্রথম জীবজগতে ক্রমবিকাশ ও রূপান্তর বোঝাতে 'ইভোলিউশন' কথাটি ব্যবহার করেন।",
      distractorAnalysis: {
        "opt_bio_12_74_b": "চার্লস ডারউইনকে বিবর্তনের জনক বলা হয়, তবে শব্দটি প্রথম স্পেনসার আনেন।",
        "opt_bio_12_74_c": "ল্যামার্ক অর্জিত বৈশিষ্ট্যের তত্ত্ব দেন।",
        "opt_bio_12_74_d": "মেন্ডেল জেনেটিক্স নিয়ে কাজ করেন।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 271
      },
      proTipShortcut: "ইভোলিউশন শব্দ = হার্বার্ট স্পেনসার; বিবর্তন তত্ত্ব = চার্লস ডারউইন।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_75",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "উদ্ভিদজগতে বহু কোটি বছর ধরে রূপান্তরহীনভাবে টিকে থাকা অন্যতম 'জীবিত জীবাশ্ম' (Living fossil) কোনটি?",
    options: [
      {
        id: "opt_bio_12_75_a",
        text: "গিংকো বাইলোবা (Ginkgo biloba)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_75_b",
        text: "আমগাছ (Mangifera indica)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_75_c",
        text: "ধানগাছ (Oryza sativa)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_75_d",
        text: "জবাফুল (Hibiscus rosa-sinensis)",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: গিংকো বাইলোবা (Ginkgo biloba)।",
      coreConcept: "নগ্নবীজী উদ্ভিদ গিংকো বাইলোবা মেসোজোয়িক যুগের বৈশিষ্ট্য বজায় রেখে কোনো উল্লেখযোগ্য পরিবর্তন ছাড়াই আজও পৃথিবীতে বেঁচে আছে।",
      distractorAnalysis: {
        "opt_bio_12_75_b": "আম আধুনিক আবৃতবীজী দ্বিবীজপত্রী উদ্ভিদ।",
        "opt_bio_12_75_c": "ধান আধুনিক একবীজপত্রী ঘাসগোত্রীয় শস্য।",
        "opt_bio_12_75_d": "জবা আধুনিক মালভেসি গোত্রের উদ্ভিদ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 277
      },
      proTipShortcut: "উদ্ভিদ জীবিত জীবাশ্ম = গিংকো বাইলোবা।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_76",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "মানবদেহের নিচের কোন অংশটি একটি লুপ্তপ্রায় বা নিষ্ক্রিয় অঙ্গ (Vestigial organ) হিসেবে বিবেচিত?",
    options: [
      {
        id: "opt_bio_12_76_a",
        text: "চোখের তৃতীয় অক্ষিপত্র বা উপপল্লব এবং কক্সিক্স",
        isCorrect: true
      },
      {
        id: "opt_bio_12_76_b",
        text: "বাম নিলয় ও মহাধমনি",
        isCorrect: false
      },
      {
        id: "opt_bio_12_76_c",
        text: "যকৃৎ ও পিত্তথলি",
        isCorrect: false
      },
      {
        id: "opt_bio_12_76_d",
        text: "হাতের বুড়ো আঙুল",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: চোখের তৃতীয় অক্ষিপত্র বা উপপল্লব এবং কক্সিক্স।",
      coreConcept: "মানবদেহের চোখের কোণে অবস্থিত উপপল্লব (নিকটিটেটিং পর্দা), লেজের কশেরুকার অবশিষ্টাংশ কক্সিক্স এবং সিকামের অ্যাপেন্ডিক্স হলো বিবর্তনের ফলে সৃষ্ট নিষ্ক্রিয় অঙ্গ।",
      distractorAnalysis: {
        "opt_bio_12_76_b": "বাম নিলয় ও মহাধমনি রক্ত সংবহনের প্রধান কার্যকরী অঙ্গ।",
        "opt_bio_12_76_c": "যকৃৎ পরিপাকের সর্ববৃহৎ সচল গ্রন্থি।",
        "opt_bio_12_76_d": "বুড়ো আঙুল মানুষের স্পর্শ ও আঁকড়ে ধরার অনন্য সক্রিয় অঙ্গ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 277
      },
      proTipShortcut: "নিষ্ক্রিয় অঙ্গ = উপপল্লব, কক্সিক্স, অ্যাপেন্ডিক্স।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_77",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "ডারউইনের দৃষ্টিতে নতুন প্রজাতির উৎপত্তির অন্যতম কারণ হিসেবে কোন প্রক্রিয়াটিকে আধুনিক জিনবিজ্ঞানীরা চিহ্নিত করেছেন?",
    options: [
      {
        id: "opt_bio_12_77_a",
        text: "মূল পপুলেশন থেকে ভৌগোলিক বিচ্ছিন্নতা (Isolation), সংকরায়ণ ও পলিপ্লয়েডি",
        isCorrect: true
      },
      {
        id: "opt_bio_12_77_b",
        text: "শুধুমাত্র অতিরিক্ত খাদ্য গ্রহণ",
        isCorrect: false
      },
      {
        id: "opt_bio_12_77_c",
        text: "সব প্রাণীর একসাথে ঘুমিয়ে থাকা",
        isCorrect: false
      },
      {
        id: "opt_bio_12_77_d",
        text: "সূর্যের আলোর অনুপস্থিতি",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: মূল পপুলেশন থেকে ভৌগোলিক বিচ্ছিন্নতা (Isolation), সংকরায়ণ ও পলিপ্লয়েডি।",
      coreConcept: "পাঠ্যবই অনুযায়ী আধুনিক বংশগতিবিদ ও শ্রেণিবিন্যাসবিদদের মতে ৩টি প্রধান উপায়ে নতুন প্রজাতির সৃষ্টি হতে পারে: পপুলেশন থেকে বিচ্ছিন্নতা, সংকরায়ণ এবং কোষে ক্রোমোজোম সংখ্যা বৃদ্ধি বা পলিপ্লয়েডি।",
      distractorAnalysis: {
        "opt_bio_12_77_b": "অতিরিক্ত খাদ্য স্থূলতা তৈরি করে, নতুন প্রজাতি নয়।",
        "opt_bio_12_77_c": "এটি হাস্যকর অবৈজ্ঞানিক বিকল্প।",
        "opt_bio_12_77_d": "সূর্যের আলো ছাড়া সবাত সবুজ উদ্ভিদ বাঁচতে পারে না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 275
      },
      proTipShortcut: "নতুন প্রজাতি = বিচ্ছিন্নতা + সংকরায়ন + পলিপ্লয়েডি।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_78",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "ডারউইনের তত্ত্বের বাইরে শুধুমাত্র পরিযান (Migration) বা জেনেটিক ড্রিফটের মাধ্যমে অ্যালিল ফ্রিকোয়েন্সির পরিবর্তনকে কী বলে?",
    options: [
      {
        id: "opt_bio_12_78_a",
        text: "অ-ডারউইনীয় জৈব অভিব্যক্তি (Non-Darwinian evolution)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_78_b",
        text: "ল্যামার্কের অর্জিত বৈশিষ্ট্য",
        isCorrect: false
      },
      {
        id: "opt_bio_12_78_c",
        text: "কৃত্রিম পরাগায়ন",
        isCorrect: false
      },
      {
        id: "opt_bio_12_78_d",
        text: "অঙ্গজ প্রজনন",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ-ডারউইনীয় জৈব অভিব্যক্তি (Non-Darwinian evolution)।",
      coreConcept: "প্রাকৃতিক নির্বাচন ছাড়া শুধু মিউটেশন ও পরিযানের (Migration) মাধ্যমে জিনপুলে অ্যালিলের আকস্মিক পরিবর্তন ঘটাকে অ-ডারউইনীয় জৈব অভিব্যক্তি বলা হয়। যেমন ফ্লু ভাইরাসের প্রাদুর্ভাব।",
      distractorAnalysis: {
        "opt_bio_12_78_b": "ল্যামার্ক অঙ্গের ব্যবহারের ভিত্তিতে ব্যাখ্যা দেন।",
        "opt_bio_12_78_c": "কৃত্রিম পরাগায়ন মানুষের নিয়ন্ত্রণে প্রজনন।",
        "opt_bio_12_78_d": "অঙ্গজ প্রজনন ক্লোন তৈরি করে, বৈচিত্র্য নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 276
      },
      proTipShortcut: "নির্বাচন ছাড়া মাইগ্রেশন পরিবর্তন = Non-Darwinian Evolution।"
    },
    difficulty: "HARD",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_79",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "ডারউইনের প্রাকৃতিক নির্বাচন তত্ত্বের কোন প্রতিপাদ্যটিকে সবচেয়ে বেশি গুরুত্বপূর্ণ ভিত্তি হিসেবে গণ্য করা হয়?",
    options: [
      {
        id: "opt_bio_12_79_a",
        text: "অনুকূল প্রকরণযুক্ত জীবের প্রাকৃতিক নির্বাচন ও টিকে থাকা",
        isCorrect: true
      },
      {
        id: "opt_bio_12_79_b",
        text: "সকল জীবের অবাধে বেঁচে থাকা",
        isCorrect: false
      },
      {
        id: "opt_bio_12_79_c",
        text: "প্রকৃতির সকল জীবের সমান আকার ধারণ",
        isCorrect: false
      },
      {
        id: "opt_bio_12_79_d",
        text: "খাদ্যের পরিমাণ অপরিমিত বৃদ্ধি পাওয়া",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অনুকূল প্রকরণযুক্ত জীবের প্রাকৃতিক নির্বাচন ও টিকে থাকা।",
      coreConcept: "ডারউইন তত্ত্বের সবচেয়ে গুরুত্বপূর্ণ ভিত্তি হলো প্রাকৃতিক নির্বাচন—যেখানে পরিবর্তিত পরিবেশে খাপ খাইয়ে অনুকূল প্রকরণযুক্ত জীব টিকে থাকে এবং বংশবৃদ্ধি করে।",
      distractorAnalysis: {
        "opt_bio_12_79_b": "অবাধ বৃদ্ধি ঘটলে সম্পদ নিঃশেষিত হয়ে ধ্বংস নেমে আসে।",
        "opt_bio_12_79_c": "প্রকৃতিতে সর্বত্র প্রকরণ বিদ্যমান, সমরূপ নয়।",
        "opt_bio_12_79_d": "খাদ্য ও স্থান সর্বদা সীমাবদ্ধ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 274
      },
      proTipShortcut: "যোগ্যতমের জয় = প্রাকৃতিক নির্বাচন।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_80",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "জৈব অভিব্যক্তি ঘটার প্রধান তিনটি আবশ্যিক শর্ত কী কী?",
    options: [
      {
        id: "opt_bio_12_80_a",
        text: "বৈচিত্র্য (Variation), নির্বাচন (Selection) এবং বংশগতি (Heredity)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_80_b",
        text: "আলো, বাতাস এবং পানি",
        isCorrect: false
      },
      {
        id: "opt_bio_12_80_c",
        text: "উচ্চ তাপমাত্রা, নিম্ন চাপ ও ক্ষার",
        isCorrect: false
      },
      {
        id: "opt_bio_12_80_d",
        text: "মাইটোসিস, প্রোটিন ও স্নেহ",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বৈচিত্র্য (Variation), নির্বাচন (Selection) এবং বংশগতি (Heredity)।",
      coreConcept: "পাঠ্যবইয়ের তথ্যমতে জৈব অভিব্যক্তি ঘটার জন্য ৩টি শর্ত আবশ্যক—পপুলেশনে বৈচিত্র্য থাকতে হবে, পরিবেশ কর্তৃক যোগ্য বৈশিষ্ট্য নির্বাচিত হতে হবে এবং নির্বাচিত বৈশিষ্ট্য পরবর্তী প্রজন্মে বংশগতির নিয়মে সঞ্চারিত হতে হবে।",
      distractorAnalysis: {
        "opt_bio_12_80_b": "এগুলো ভৌত পরিবেশের উপাদান।",
        "opt_bio_12_80_c": "এগুলো অজৈব রাসায়নিক অবস্থা।",
        "opt_bio_12_80_d": "এগুলো কোষীয় উপাদান।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 276
      },
      proTipShortcut: "অভিব্যক্তির ট্রায়াঙ্গেল = বৈচিত্র্য + নির্বাচন + বংশগতি।"
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_81",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "সিল মাছের অগ্রপদ ও ঘোড়ার অগ্রপদ—এরা পরস্পরের কোন ধরনের অঙ্গ?",
    options: [
      {
        id: "opt_bio_12_81_a",
        text: "সমসংস্থ অঙ্গ (Homologous organs)",
        isCorrect: true
      },
      {
        id: "opt_bio_12_81_b",
        text: "সমবৃত্তীয় অঙ্গ (Analogous organs)",
        isCorrect: false
      },
      {
        id: "opt_bio_12_81_c",
        text: "নিষ্ক্রিয় অঙ্গ",
        isCorrect: false
      },
      {
        id: "opt_bio_12_81_d",
        text: "বহিঃকঙ্কাল",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সমসংস্থ অঙ্গ (Homologous organs)।",
      coreConcept: "সিলের অগ্রপদ সাঁতার কাটার ফ্লিপার এবং ঘোড়ার অগ্রপদ দ্রুত দৌড়ানোর পা হিসেবে কাজ করলেও উভয়ের অন্তর্কঙ্কালের হিউমেরাস, রেডিয়াস-আলনা, কার্পাল ও ফ্যালাঞ্জেস একই মৌল বিন্যাসে গঠিত।",
      distractorAnalysis: {
        "opt_bio_12_81_b": "সমবৃত্তীয় অঙ্গে অন্তর্কঙ্কালের বিন্যাস সম্পূর্ণ আলাদা হয়।",
        "opt_bio_12_81_c": "উভয় প্রাণীতেই এই পদগুলো অত্যন্ত সক্রিয় ও কার্যকর।",
        "opt_bio_12_81_d": "এগুলো অন্তঃকঙ্কালের অংশ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 277
      },
      proTipShortcut: "সিলের ফ্লিপার ও ঘোড়ার পা = সমসংস্থ অঙ্গ।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_82",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "বিবর্তনিক সংযোগকারী জীব (Connecting link) হিসেবে পরিচিত হাঁসঠুঁটি প্লাটিপাস (Platypus) কোন দুটি শ্রেণির মধ্যবর্তী বৈশিষ্ট্য বহন করে?",
    options: [
      {
        id: "opt_bio_12_82_a",
        text: "সরীসৃপ ও স্তন্যপায়ী",
        isCorrect: true
      },
      {
        id: "opt_bio_12_82_b",
        text: "মাছ ও উভচর",
        isCorrect: false
      },
      {
        id: "opt_bio_12_82_c",
        text: "পাখি ও মাছ",
        isCorrect: false
      },
      {
        id: "opt_bio_12_82_d",
        text: "উভচর ও সরীসৃপ",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সরীসৃপ ও স্তন্যপায়ী।",
      coreConcept: "প্লাটিপাস সরীসৃপের মতো ডিম পাড়ে কিন্তু স্তন্যপায়ীর মতো শাবককে মাতৃদুগ্ধ পান করায়। এটি সরীসৃপ থেকে স্তন্যপায়ীর বিবর্তনের সংযোগকারী জীব।",
      distractorAnalysis: {
        "opt_bio_12_82_b": "মাছ ও উভচরের সংযোগকারী হলো লাংফিশ বা ডায়াপনোই।",
        "opt_bio_12_82_c": "পাখি ও মাছের সরাসরি সংযোগ নেই।",
        "opt_bio_12_82_d": "উভচর ও সরীসৃপের মাঝে রয়েছে সাইমোরিয়া।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 277
      },
      proTipShortcut: "প্লাটিপাস = সরীসৃপ + স্তন্যপায়ীর সংযোগকারী জীব।"
    },
    difficulty: "HARD",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_83",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "আদিম পৃথিবীতে নিউক্লিওপ্রোটিন অণুগুলোর কোন বৈশিষ্ট্যটি অর্জনের মাধ্যমে প্রাণের সূত্রপাত ঘটেছিল?",
    options: [
      {
        id: "opt_bio_12_83_a",
        text: "নিজেদের অবিকল প্রতিরূপ বা অনুলিপি (Replication) গঠনের ক্ষমতা",
        isCorrect: true
      },
      {
        id: "opt_bio_12_83_b",
        text: "বাতাসে উড়ে চলার ক্ষমতা",
        isCorrect: false
      },
      {
        id: "opt_bio_12_83_c",
        text: "পানির ওপর ভেসে থাকার ক্ষমতা",
        isCorrect: false
      },
      {
        id: "opt_bio_12_83_d",
        text: "তাপমাত্রাকে শূন্য ডিগ্রিতে নামিয়ে আনা",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: নিজেদের অবিকল প্রতিরূপ বা অনুলিপি (Replication) গঠনের ক্ষমতা।",
      coreConcept: "নিউক্লিওপ্রোটিন অণুগুলো যখন নিজেদের অনুরূপ রেপ্লিকা তৈরির স্ব-প্রজননশীল ক্ষমতা অর্জন করে, তখনই নির্জীব রাসায়নিক পর্যায় থেকে সজীব সত্তার উদ্ভব ঘটে।",
      distractorAnalysis: {
        "opt_bio_12_83_b": "উড়ে চলা প্রাণের মৌলিক শর্ত নয়।",
        "opt_bio_12_83_c": "ভেসে থাকা সাধারণ ভৌত ঘটনা।",
        "opt_bio_12_83_d": "তাপমাত্রা নিয়ন্ত্রণের কোনো সম্পর্ক নেই।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 272
      },
      proTipShortcut: "প্রাণের মূল চাবিকাঠি = স্ব-অনুলিপন (Replication) ক্ষমতা।"
    },
    difficulty: "HARD",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_84",
    topicId: "top_ssc_biology_ch12_7",
    type: "MCQ",
    stem: "বর্তমানে কৃষিক্ষেত্রে অধিক ফলনশীল নতুন ফসলের জাত উদ্ভাবনে কৃষকরা বংশগতির কোন মূলনীতিটির অনুকরণ করে আসছেন?",
    options: [
      {
        id: "opt_bio_12_84_a",
        text: "প্রাকৃতিক নির্বাচনের নীতি প্রয়োগ করে কৃত্রিমভাবে কাঙ্ক্ষিত বীজের প্রজনন",
        isCorrect: true
      },
      {
        id: "opt_bio_12_84_b",
        text: "আদিম গ্যাসের মতো বায়ুমণ্ডল তৈরি করা",
        isCorrect: false
      },
      {
        id: "opt_bio_12_84_c",
        text: "ফসলের মাঠে অতিবেগুনি রশ্মি নিক্ষেপ করা",
        isCorrect: false
      },
      {
        id: "opt_bio_12_84_d",
        text: "সকল গাছকে সমান উচ্চতায় ছেঁটে ফেলা",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রাকৃতিক নির্বাচনের নীতি প্রয়োগ করে কৃত্রিমভাবে কাঙ্ক্ষিত বীজের প্রজনন।",
      coreConcept: "কৃষকরা সেরা মানের শস্যদানা আলাদা রেখে পরবর্তী মৌসুমে রোপণ করার মাধ্যমে প্রাকৃতিক নির্বাচনের অনুকরণে কৃত্রিম নির্বাচন ও প্রজনন ঘটিয়ে নতুন উন্নত জাত উদ্ভাবন করে আসছেন।",
      distractorAnalysis: {
        "opt_bio_12_84_b": "আদিম গ্যাস প্রয়োগে শস্য মারা যাবে।",
        "opt_bio_12_84_c": "অতিবেগুনি রশ্মি ক্ষতিকর মিউটেশন ঘটিয়ে গাছ ধ্বংস করবে।",
        "opt_bio_12_84_d": "ছেঁটে ফেলা কোনো জেনেটিক নির্বাচন নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 278
      },
      proTipShortcut: "কৃষিতে জাত উন্নয়ন = কৃত্রিম নির্বাচন।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_85",
    topicId: "top_ssc_biology_ch12_2",
    type: "CQ_CREATIVE",
    stem: "পরীক্ষাগারে একটি নতুন আবিষ্কৃত ব্যাকটেরিওফাজের DNA বিশ্লেষণ করে দেখা গেল তাতে ২০০০টি নিউক্লিওটাইড জোড়া রয়েছে এবং মোট নাইট্রোজেন ক্ষারকের ২৮% হলো অ্যাডেনিন। শিক্ষক জানালেন, এই অণুটি ওয়াটসন ও ক্রিকের দ্বি-সূত্রক মডেলের সমস্ত ভৌত পরিমাপ হুবহু মেনে চলে।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে চার্জাফের বেস পেয়ারিং নিয়ম এবং ওয়াটসন-ক্রিক DNA ডাবল হেলিক্সের গাণিতিক পরিমাপ তুলে ধরা হয়েছে।",
      coreConcept: "A=T এবং G=C নিয়মে অন্যান্য ক্ষারকের সংখ্যা এবং ৩.৪ Å দূরত্বের ভিত্তিতে মোট দৈর্ঘ্য নির্ণয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 258
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "DNA ডাবল হেলিক্সের ব্যাস কত তা অ্যাংস্ট্রম এককে লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "DNA সূত্র দুটিকে কেন 'Antiparallel' বলা হয় তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকের তথ্য অনুযায়ী DNA অণুটিতে গুয়ানিন ও সাইটোসিনের শতকরা হার এবং মোট ক্ষারক সংখ্যা গাণিতিকভাবে বের করা।"
      },
      gha: {
        mark: 4,
        criteria: "উদ্দীপকের DNA অণুটির পূর্ণ দৈর্ঘ্য (Å এককে) এবং এতে বিদ্যমান পূর্ণ ঘূর্ণনের (pitch) সংখ্যা গণনা করে গঠনটির স্থিতিশীলতা বিশ্লেষণ করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল নমুনা · ক্যাডেট কলেজ",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_86",
    topicId: "top_ssc_biology_ch12_6",
    type: "CQ_CREATIVE",
    stem: "বিবাহের পূর্বে সুজন ও মিতা স্বাস্থ্য পরীক্ষার অংশ হিসেবে থ্যালাসেমিয়া স্ক্রিনিং টেস্ট করাল। রিপোর্টে দেখা গেল সুজন বিটা থ্যালাসেমিয়ার বাহক কিন্তু মিতা সম্পূর্ণ সুস্থ। চিকিৎসক তাঁদের বিয়ের অনুমোদন দিয়ে বললেন, “যদি মিতাও বাহক হতো, তবে আপনাদের ভবিষ্যৎ সন্তানের জন্য মারাত্মক ঝুঁকি তৈরি হতো।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে প্রি-মেরিটাল থ্যালাসেমিয়া স্ক্রিনিং এবং পিতা-মাতার একজন বাহক ও অপরজন সুস্থ হলে সন্তানের ঝুঁকিহীনতার চিত্র তুলে ধরা হয়েছে।",
      coreConcept: "Rr × RR ক্রসে ৫০% সন্তান সুস্থ এবং ৫০% বাহক হলেও কোনো সন্তানই থ্যালাসেমিয়া মেজর রোগে আক্রান্ত হয় না।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৩",
        pageNumber: 269
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "কুলির থ্যালাসেমিয়া কোন প্রোটিনের অভাবে হয় তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "নিকটাত্মীয়ের মধ্যে বিবাহে থ্যালাসেমিয়া আক্রান্ত সন্তান জন্মের আশঙ্কা বাড়ে কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "পানেট স্কয়ারের সাহায্যে সুজন ও মিতার ভবিষ্যৎ সন্তানদের থ্যালাসেমিয়া পরিস্থিতির সম্ভাবনা বিশ্লেষণ করা।"
      },
      gha: {
        mark: 4,
        criteria: "চিকিৎসকের সতর্কবার্তার আলোকে “উভয় দম্পতি বাহক হলে সন্তানের জন্য ঝুঁকি মারাত্মক”—পানেট স্কয়ার দ্বারা উক্তিটির সত্যতা প্রমাণ করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল নমুনা · ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_87",
    topicId: "top_ssc_biology_ch12_5",
    type: "CQ_CREATIVE",
    stem: "মানবদেহের ক্রোমোজোম চার্টে দেখা গেল মোট ২৩ জোড়া ক্রোমোজোমের মধ্যে ২২ জোড়া ক্রোমোজোম নারী ও পুরুষে অভিন্ন, কিন্তু ২৩তম জোড়াটি পুরুষে অসম রূপী (XY) এবং নারীতে সম রূপী (XX)। এই ২৩তম জোড়াই নিষেকের সময় জাইগোটের ভবিষ্যৎ লিঙ্গ রূপরেখা চূড়ান্ত করে।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে অটোজোম বনাম সেক্স ক্রোমোজোমের কার্যগত পার্থক্য এবং XX-XY ক্রোমোজোমাল লিঙ্গ নির্ধারণ কৌশল ব্যাখ্যা করা হয়েছে।",
      coreConcept: "জননকোষ সৃষ্টির সময় হোমোগ্যামেটিক ডিম্বাণুর সাথে হেটারোগ্যামেটিক শুক্রাণুর মিলনে সমসম্ভাব্যতায় লিঙ্গ নির্ধারিত হয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.২",
        pageNumber: 265
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "অটোজোম কাকে বলে তা নির্ভুলভাবে লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "Y ক্রোমোজোমকে কেন পুরুষত্বের প্রধান নির্ধারক বলা হয় তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকের তথ্যানুযায়ী গ্যামেট সৃষ্টি থেকে জাইগোট গঠন পর্যন্ত লিঙ্গ নির্ধারণের সম্পূর্ণ ক্রসিং ছক আঁকা।"
      },
      gha: {
        mark: 4,
        criteria: "“সন্তান ছেলে বা মেয়ে হওয়া একটি সম্পূর্ণ প্রাকৃতিক সমসম্ভাব্য ঘটনা”—পরিসংখ্যানগত যুক্তি দিয়ে উক্তিটি মূল্যায়ন করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল নমুনা · রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_88",
    topicId: "top_ssc_biology_ch12_7",
    type: "CQ_CREATIVE",
    stem: "গালাপাগোস দ্বীপপুঞ্জ ভ্রমণের সময় চার্লস ডারউইন লক্ষ্য করলেন, মূল ভূখণ্ড থেকে বিচ্ছিন্ন বিভিন্ন দ্বীপে ফিঞ্চ পাখির ঠোঁটের আকৃতি ভিন্ন ভিন্ন খাদ্যের সাথে খাপ খাইয়ে বিবর্তিত হয়েছে। তিনি পরবর্তীতে সিদ্ধান্তে আসেন যে প্রকৃতিতে প্রতিকূল পরিবেশের সাথে যেসব প্রাণী খাপ খাওয়াতে পারে, তারাই টিকে থাকে এবং বংশবৃদ্ধি করে।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে ডারউইনের গালাপাগোস ফিঞ্চের অভিযোজনিক বিস্তার এবং যোগ্যতমের জয় (Survival of the fittest) আলোচিত হয়েছে।",
      coreConcept: "ভৌগোলিক বিচ্ছিন্নতা ও খাদ্যাভ্যাসের ভিন্নতার কারণে প্রকরণ পুঞ্জীভূত হয়ে নতুন উপপ্রজাতির উদ্ভব ঘটে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 273
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "ডারউইন কোন দ্বীপে দীর্ঘ পর্যবেক্ষণ চালিয়েছিলেন তার নাম লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "ডারউইনের মতে 'প্রকরণ বা পরিবৃত্তি' কী তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "ফিঞ্চ পাখির ঠোঁটের রূপান্তরের আলোকে 'যোগ্যতমের জয়' ধারণাটি উদ্দীপকের প্রেক্ষিতে ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "প্রাকৃতিক নির্বাচন কীভাবে নতুন প্রজাতির সৃষ্টি করে তা ডারউইনের তত্ত্বের ক্রমানুসারে বিশ্লেষণ করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল নমুনা · চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_89",
    topicId: "top_ssc_biology_ch12_7",
    type: "CQ_CREATIVE",
    stem: "ভূগর্ভের শিলাস্তরে সংরক্ষিত একটি প্রাণীর প্রস্তরীভূত কাঠামো প্রত্যক্ষ করে প্রত্নতাত্ত্বিকরা দেখলেন এতে সরীসৃপের মতো দাঁত ও লেজ রয়েছে, আবার পাখির মতো ডানা ও পালক রয়েছে। অন্যদিকে সমুদ্রে প্রাপ্ত রাজকাঁকড়া লাখ লাখ বছর ধরে কোনো দৈহিক পরিবর্তন ছাড়াই স্বরূপে টিকে রয়েছে।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে আর্কিওপটেরিক্স নামক সংযোগকারী জীবাশ্ম (Connecting link fossil) এবং রাজকাঁকড়া নামক জীবিত জীবাশ্মের (Living fossil) দৃষ্টান্ত তুলে ধরা হয়েছে।",
      coreConcept: "জীবাশ্ম অতীত প্রাণের চাক্ষুষ দলিল এবং জীবিত জীবাশ্ম প্রাকৃতিক নির্বাচনে অপরিবর্তিত সফলতার নিদর্শন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.৪",
        pageNumber: 277
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "জীবাশ্ম (Fossil) কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "উদ্ভিদজগতে জীবিত জীবাশ্মের উদাহরণসহ সংজ্ঞা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকে প্রথম প্রাণীর বৈশিষ্ট্যগুলো কীভাবে সরীসৃপ ও পাখির বিবর্তনীয় সংযোগ নির্দেশ করে তা ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "জৈব অভিব্যক্তির ঐতিহাসিক সত্যতা প্রমাণে জীবাশ্ম ও জীবিত জীবাশ্মের ভূমিকা তুলনামূলকভাবে বিশ্লেষণ করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল নমুনা · কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_12_90",
    topicId: "top_ssc_biology_ch12_4",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান শিক্ষক ক্লাসে বললেন, “মেন্ডেলের মনোহাইব্রিড ক্রস শুধু মটর গাছেই নয়, প্রাণিজগতের যে কোনো একজোড়া বিপরীত বৈশিষ্ট্যের ক্রস বিশ্লেষণেও প্রযোজ্য।” তিনি শিক্ষার্থীদের একটি হোমোজাইগাস কালো লোমযুক্ত গিনিপিগের (BB) সাথে হোমোজাইগাস সাদা লোমযুক্ত গিনিপিগের (bb) সংকরায়ণ করতে বললেন।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে মেন্ডেলের মনোহাইব্রিড ক্রস ও পৃথকীকরণ সূত্রের সার্বজনীনতা প্রদর্শন করা হয়েছে।",
      coreConcept: "F1 জনুতে হেটারোজাইগাস সংকর কালো (Bb) তৈরি হওয়া এবং F2 জনুতে ৩:১ অনুপাতে কালো ও সাদা অপত্যের পৃথকীকরণ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দ্বাদশ অধ্যায়: জীবের বংশগতি ও জৈব অভিব্যক্তি · ১২.১",
        pageNumber: 263
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "প্রকট বৈশিষ্ট্য (Dominant trait) কাকে বলে তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "জিনোটাইপ ও ফিনোটাইপের মধ্যকার মূল পার্থক্য ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "পানেট স্কয়ার ছকের সাহায্যে F1 ও F2 জনুর জিনোটাইপিক ও ফিনোটাইপিক অনুপাত নির্ণয় করা।"
      },
      gha: {
        mark: 4,
        criteria: "“মেন্ডেলের সূত্র জীবজগতে বংশগতির ধারা বোঝার একটি মৌলিক ভিত্তি”—উদ্দীপকের ক্রসের প্রেক্ষিতে উক্তিটি মূল্যায়ন করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল নমুনা · দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];
