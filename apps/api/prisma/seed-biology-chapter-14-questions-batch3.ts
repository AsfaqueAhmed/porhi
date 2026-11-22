import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter14QuestionsBatch3: QuestionData[] = [
  // =========================================================================
  // Topic 14.1: জীবপ্রযুক্তির ধারণা ও ইতিহাস (top_ssc_biology_ch14_1)
  // =========================================================================
  {
    id: "q_bio_14_61",
    topicId: "top_ssc_biology_ch14_1",
    type: "MCQ",
    stem: "ওয়াটসন ও ক্রিক কত সালে DNA ডাবল হেলিক্স (Double Helix) মডেল আবিষ্কার করেন যা আধুনিক জীবপ্রযুক্তির মূল ভিত্তি গড়ে দেয়?",
    options: [
      { id: "opt_bio_14_61_a", text: "১৮৬৩ সালে", isCorrect: false },
      { id: "opt_bio_14_61_b", text: "১৯১৯ সালে", isCorrect: false },
      { id: "opt_bio_14_61_c", text: "১৯৫৩ সালে", isCorrect: true },
      { id: "opt_bio_14_61_d", text: "১৯৬৯ সালে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ১৯৫৩ সালে।",
      coreConcept: "১৯৫৩ সালে জেমস ওয়াটসন এবং ফ্রান্সিস ক্রিক DNA-এর দ্বি-সূত্রক সর্পিল গঠন আবিষ্কার করে আণবিক জীববিজ্ঞানের ভিত্তি স্থাপন করেন।",
      distractorAnalysis: {
        opt_bio_14_61_a: "১৮৬৩ সালে মেন্ডেল সূত্র আবিষ্কার করেন।",
        opt_bio_14_61_b: "১৯১৯ সালে কার্ল এরেকি বায়োটেকনোলজি শব্দ দেন।",
        opt_bio_14_61_d: "১৯৬৯ সালে লোয়ি-সিকেভিজ আধুনিক কোষের সংজ্ঞা দেন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.১",
        pageNumber: 307
      },
      proTipShortcut: "Watson & Crick DNA Helix = ১৯৫৩ সাল।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_62",
    topicId: "top_ssc_biology_ch14_1",
    type: "MCQ",
    stem: "জীবপ্রযুক্তি (Biotechnology) শব্দটির 'Technology' অংশের অর্থ কী?",
    options: [
      { id: "opt_bio_14_62_a", text: "জীব সংক্রান্ত জ্ঞান", isCorrect: false },
      { id: "opt_bio_14_62_b", text: "ব্যবহারিক প্রয়োগের কৌশল বা প্রযুক্তি", isCorrect: true },
      { id: "opt_bio_14_62_c", text: "অঙ্গাণুর রাসায়নিক গঠন", isCorrect: false },
      { id: "opt_bio_14_62_d", text: "কোষের বিভাজন পদ্ধতি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ব্যবহারিক প্রয়োগের কৌশল বা প্রযুক্তি।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ৩০৭ অনুসারে, Biology শব্দের অর্থ জীব সম্পর্কিত বিশেষ জ্ঞান এবং Technology শব্দের অর্থ প্রযুক্তি বা প্রায়োগিক কৌশল।",
      distractorAnalysis: {
        opt_bio_14_62_a: "জীব সংক্রান্ত বিশেষ জ্ঞান হলো Biology।",
        opt_bio_14_62_c: "অঙ্গাণুর রাসায়নিক গঠন হলো বায়োকেমিস্ট্রি।",
        opt_bio_14_62_d: "কোষের বিভাজন পদ্ধতি হলো সাইটোলজি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.১",
        pageNumber: 307
      },
      proTipShortcut: "Bio = জীব; Technology = ব্যবহারিক প্রযুক্তি।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_63",
    topicId: "top_ssc_biology_ch14_1",
    type: "MCQ",
    stem: "বর্তমানে কৃষির সামগ্রিক উৎপাদনশীলতা ও গুণগত মান বাড়াতে প্রধানত কোন দুটি জীবপ্রযুক্তিগত পদ্ধতি সর্বাধিক ব্যবহৃত হচ্ছে?",
    options: [
      { id: "opt_bio_14_63_a", text: "টিস্যু কালচার ও জিন প্রকৌশল", isCorrect: true },
      { id: "opt_bio_14_63_b", text: "গাঁজন ও পাতন", isCorrect: false },
      { id: "opt_bio_14_63_c", text: "অঙ্গজ কলম ও জোড়কলম", isCorrect: false },
      { id: "opt_bio_14_63_d", text: "প্লাজমোলাইসিস ও ডিফিউশন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: টিস্যু কালচার ও জিন প্রকৌশল।",
      coreConcept: "আধুনিক জীবপ্রযুক্তির দুটি মূল স্তম্ভ হলো উদ্ভিদ টিস্যু কালচার (Tissue culture) এবং জিন প্রকৌশল (Genetic engineering)।",
      distractorAnalysis: {
        opt_bio_14_63_b: "গাঁজন ও পাতন সনাতন প্রাচীন পদ্ধতি।",
        opt_bio_14_63_c: "কলম ও জোড়কলম সনাতন উদ্যানতাত্ত্বিক পদ্ধতি।",
        opt_bio_14_63_d: "প্লাজমোলাইসিস ও ডিফিউশন কোষের সাধারণ ভৌত প্রক্রিয়া।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.১",
        pageNumber: 307
      },
      proTipShortcut: "আধুনিক জীবপ্রযুক্তির জোড়া স্তম্ভ = টিস্যু কালচার + জিন প্রকৌশল।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_64",
    topicId: "top_ssc_biology_ch14_1",
    type: "MCQ",
    stem: "জীবপ্রযুক্তির অগ্রগতিতে পাটের জীবন রহস্য উন্মোচনের ফলে বাংলাদেশের কোন অর্থনৈতিক ক্ষেত্রটি সবচেয়ে বেশি উপকৃত হবে?",
    options: [
      { id: "opt_bio_14_64_a", text: "পাট আঁশের সূক্ষ্মতা, রোগপ্রতিরোধ ক্ষমতা ও বহুমুখী পাটজাত পণ্যের বিকাশ", isCorrect: true },
      { id: "opt_bio_14_64_b", text: "রাসায়নিক সারের ব্যবহার দ্বিগুণ করা", isCorrect: false },
      { id: "opt_bio_14_64_c", text: "পাটবীজ রোপণ বন্ধ করে দেওয়া", isCorrect: false },
      { id: "opt_bio_14_64_d", text: "কেবল বিদেশি পাটের ওপর নির্ভরতা বৃদ্ধি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পাট আঁশের সূক্ষ্মতা, রোগপ্রতিরোধ ক্ষমতা ও বহুমুখী পাটজাত পণ্যের বিকাশ।",
      coreConcept: "পাটের জিনোম জানার ফলে রোগবালাই প্রতিরোধী ও উন্নত নরম উজ্জ্বল আঁশযুক্ত পাটের জাত উদ্ভাবন দ্রুততর হয়েছে।",
      distractorAnalysis: {
        opt_bio_14_64_b: "জীবপ্রযুক্তির লক্ষ্য সারের অপচয় কমানো, দ্বিগুণ করা নয়।",
        opt_bio_14_64_c: "বীজ রোপণ বন্ধ করা নয়, উন্নত বীজ তৈরিই লক্ষ্য।",
        opt_bio_14_64_d: "দেশি পাটের জাত উন্নয়নই ছিল প্রকল্পের প্রধান লক্ষ্য।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · অধ্যায় সূচক",
        pageNumber: 305
      },
      proTipShortcut: "জুট জিনোম = আঁশের মান ও রোগপ্রতিরোধ উন্নয়ন।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.2: টিস্যু কালচার প্রযুক্তি ও ধাপসমূহ (top_ssc_biology_ch14_2)
  // =========================================================================
  {
    id: "q_bio_14_65",
    topicId: "top_ssc_biology_ch14_2",
    type: "MCQ",
    stem: "টিস্যু কালচারের ক্ষেত্রে উদ্ভিদের কোন অংশটিকে সাধারণত এক্সপ্ল্যান্ট হিসেবে নির্বাচন করা সবচেয়ে লাভজনক ও ভাইরাসমুক্ত হয়?",
    options: [
      { id: "opt_bio_14_65_a", text: "পুরোনো কাণ্ডের বাকল", isCorrect: false },
      { id: "opt_bio_14_65_b", text: "শীর্ষ বর্ধিষ্ণু মুকুল বা মেরিস্টেম অঞ্চল", isCorrect: true },
      { id: "opt_bio_14_65_c", text: "শুকনো ঝরে পড়া পাতা", isCorrect: false },
      { id: "opt_bio_14_65_d", text: "পরিপক্ব কাষ্ঠল জাইলেম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: শীর্ষ বর্ধিষ্ণু মুকুল বা মেরিস্টেম অঞ্চল।",
      coreConcept: "শীর্ষ বর্ধিষ্ণু মুকুলের কোষগুলো দ্রুত বিভাজনশীল এবং এতে কোনো পরিবহন কলা না থাকায় ভাইরাস বা রোগজীবাণু থাকে না।",
      distractorAnalysis: {
        opt_bio_14_65_a: "বাকলের কোষ মৃত স্ক্লেরেনকাইমা বা কর্ক, এরা বিভাজিত হতে পারে না।",
        opt_bio_14_65_c: "শুকনো পাতা মৃত কোষ ধারণ করে।",
        opt_bio_14_65_d: "কাষ্ঠল জাইলেম মূলত মৃত ট্রাকিড ও ভেসেল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.১",
        pageNumber: 308
      },
      proTipShortcut: "আদর্শ এক্সপ্ল্যান্ট = শীর্ষ বা পার্শ্বমুকুলের মেরিস্টেম।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_66",
    topicId: "top_ssc_biology_ch14_2",
    type: "MCQ",
    stem: "টিস্যু কালচার পুষ্টি মাধ্যমে উদ্ভিদের মূল ও বিটপ সৃষ্টির ভারসাম্য রক্ষা করতে কোন দুটি ফাইটোহরমোনের সুষম অনুপাত প্রয়োজন?",
    options: [
      { id: "opt_bio_14_66_a", text: "অক্সিন ও সাইটোকাইনিন", isCorrect: true },
      { id: "opt_bio_14_66_b", text: "ইথিলিন ও অ্যাবসিসিক এসিড", isCorrect: false },
      { id: "opt_bio_14_66_c", text: "ইনসুলিন ও গ্লুকাগন", isCorrect: false },
      { id: "opt_bio_14_66_d", text: "পেপসিন ও ট্রিপসিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অক্সিন ও সাইটোকাইনিন।",
      coreConcept: "অক্সিন ও সাইটোকাইনিনের নির্দিষ্ট অনুপাত ক্যালাস থেকে বিটপ (পাতা-কাণ্ড) এবং পরবর্তীতে শেকড় বা মূল উৎপাদনে উদ্দীপক হিসেবে কাজ করে।",
      distractorAnalysis: {
        opt_bio_14_66_b: "ইথিলিন ও এবিএ উদ্ভিদের বৃদ্ধি রোধ করে পাতা ঝরায়।",
        opt_bio_14_66_c: "ইনসুলিন ও গ্লুকাগন মানব অগ্ন্যাশয়ের প্রাণী হরমোন।",
        opt_bio_14_66_d: "পেপসিন ও ট্রিপসিন পরিপাককারী এনজাইম।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.১",
        pageNumber: 308
      },
      proTipShortcut: "টিস্যু কালচার ফাইটোহরমোন = অক্সিন + সাইটোকাইনিন।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_67",
    topicId: "top_ssc_biology_ch14_2",
    type: "MCQ",
    stem: "টিস্যু কালচার মিডিয়ামে শক্তির প্রধান উৎস হিসেবে নিচের কোন কার্বোহাইড্রেটটি যোগ করা হয়?",
    options: [
      { id: "opt_bio_14_67_a", text: "সুক্রোজ", isCorrect: true },
      { id: "opt_bio_14_67_b", text: "সেলুলোজ", isCorrect: false },
      { id: "opt_bio_14_67_c", text: "কাইটিন", isCorrect: false },
      { id: "opt_bio_14_67_d", text: "গ্লাইকোজেন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সুক্রোজ।",
      coreConcept: "ল্যাবে টেস্টটিউবের মধ্যে কোষ ফটোসিন্থেসিস করতে পারে না, তাই বাইরে থেকে তৈরি শক্তির উৎস হিসেবে সুক্রোজ সঠিক মাত্রায় মেশানো হয়।",
      distractorAnalysis: {
        opt_bio_14_67_b: "সেলুলোজ জটিল অদ্রবণীয় পলিস্যাকারাইড যা কোষ সহজে শোষণ করতে পারে না।",
        opt_bio_14_67_c: "কাইটিন ছত্রাক কোষপ্রাচীর ও পোকামাকড়ের খোলসে থাকে।",
        opt_bio_14_67_d: "গ্লাইকোজেন প্রাণীদেহের সঞ্চিত খাদ্য।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.১",
        pageNumber: 308
      },
      proTipShortcut: "টিস্যু কালচার মিডিয়ামের শর্করা = সুক্রোজ (Sucrose)।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_68",
    topicId: "top_ssc_biology_ch14_2",
    type: "MCQ",
    stem: "মাঠপর্যায়ে রোপণের আগে টিস্যু কালচারের চারাগুলোর শেকড় থেকে কোন উপাদানটি পানিতে ধুয়ে ফেলা বাধ্যতামূলক?",
    options: [
      { id: "opt_bio_14_68_a", text: "অ্যাগার (Agar)", isCorrect: true },
      { id: "opt_bio_14_68_b", text: "ক্লোরোফিল", isCorrect: false },
      { id: "opt_bio_14_68_c", text: "পানিগ্রাহী কিউটিকল", isCorrect: false },
      { id: "opt_bio_14_68_d", text: "জাইলেম ফাইবার", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ্যাগার (Agar)।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ৩০৯ অনুযায়ী, মূলযুক্ত চারাগুলোকে সতর্কতার সাথে পানিতে ধুয়ে সম্পূর্ণ অ্যাগারমুক্ত করে মাটিতে রোপণ করা হয়, যাতে ছত্রাকের আক্রমণ না ঘটে।",
      distractorAnalysis: {
        opt_bio_14_68_b: "ক্লোরোফিল পাতার ভেতর থাকে, ধোয়ার প্রশ্নই ওঠে না।",
        opt_bio_14_68_c: "কিউটিকল উদ্ভিদের মোমের স্তর।",
        opt_bio_14_68_d: "জাইলেম ফাইবার উদ্ভিদের অভ্যন্তরীণ পরিবহন কলা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.১",
        pageNumber: 309
      },
      proTipShortcut: "টবে লাগানোর আগে শিকড় ধোয়া = অ্যাগারমুক্তকরণ।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Creative Question 7 (Topic 14.1 / 14.2)
  {
    id: "q_bio_14_69",
    topicId: "top_ssc_biology_ch14_2",
    type: "CQ_CREATIVE",
    stem: "উদ্ভিদবিজ্ঞানের ল্যাবরেটরিতে শিক্ষক শিক্ষার্থীদের দুটি পাত্র দেখালেন:\nপাত্র M: একটি টেস্টটিউবে সেমি-সলিড পুষ্টি মাধ্যমে রাখা একটি অসংগঠিত নরম সবুজ টিস্যুপুঞ্জ।\nপাত্র N: অন্য একটি টেস্টটিউবে মূল উৎপাদনকারী হরমোনযুক্ত তরল মাধ্যমে গজিয়ে ওঠা পাতা ও শেকড়যুক্ত পূর্ণাঙ্গ চারা।\nশিক্ষক বললেন, “M হলো এক্সপ্ল্যান্টের বিভাজনের প্রাথমিক রূপ এবং N হলো তার থেকে সৃষ্ট রূপান্তরিত রূপ।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে পাত্র M নির্দেশ করে ক্যালাস (Callus) এবং পাত্র N নির্দেশ করে অণুচারা (Plantlet)।",
      coreConcept: "টটিপোটেন্ট কোষের প্রভাবে পুষ্টি মাধ্যমে প্রথমে ক্যালাস সৃষ্টি হয় এবং হরমোনের তারতম্যে তা থেকে অণুচারা সৃষ্টি হয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.১",
        pageNumber: 308
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: ক্যালাস (Callus) কাকে বলে তা সঠিকভাবে লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: পাত্র M-এর পুষ্টি মাধ্যমে অ্যাগার (Agar) ব্যবহারের বৈজ্ঞানিক প্রয়োজনীয়তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: উদ্দীপকের পাত্র M থেকে কীভাবে পাত্র N-এর অবস্থায় রূপান্তর ঘটানো হয় তার ধারাবাহিক বৈজ্ঞানিক ধাপ বর্ণনা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: পাত্র N-এর চারাগুলোকে ল্যাব থেকে সরাসরি উন্মুক্ত মাঠে না লাগিয়ে টবে রেখে হার্ডেনিং বা অ্যাক্লাইমেটাইজেশন করার অপরিহার্যতা বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড স্ট্যান্ডার্ড ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.3: কৃষি ও অর্থনীতিতে টিস্যু কালচার (top_ssc_biology_ch14_3)
  // =========================================================================
  {
    id: "q_bio_14_70",
    topicId: "top_ssc_biology_ch14_3",
    type: "MCQ",
    stem: "যেসব উদ্ভিদের বীজে কোনো ভ্রূণপোষক শস্যকলা থাকে না, তাদের বংশবৃদ্ধিতে কোন বিশেষ টিস্যু কালচার পদ্ধতি প্রয়োগ করা হয়?",
    options: [
      { id: "opt_bio_14_70_a", text: "ভ্রূণ কালচার (Embryo culture)", isCorrect: true },
      { id: "opt_bio_14_70_b", text: "পরাগরেণু কালচার", isCorrect: false },
      { id: "opt_bio_14_70_c", text: "প্লাজমিড কাটিং", isCorrect: false },
      { id: "opt_bio_14_70_d", text: "ট্রান্সফরমেশন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ভ্রূণ কালচার (Embryo culture)।",
      coreConcept: "শস্যকলাবিহীন অপরিপক্ব বা দুর্বল ভ্রূণকে সরাসরি পুষ্টি মিডিয়ামে আবাদ করে চারা তৈরির পদ্ধতিকে ভ্রূণ কালচার বলে।",
      distractorAnalysis: {
        opt_bio_14_70_b: "পরাগরেণু কালচারে হ্যাপ্লয়েড চারা তৈরি হয়।",
        opt_bio_14_70_c: "প্লাজমিড কাটিং রিকম্বিন্যান্ট DNA-এর ধাপ।",
        opt_bio_14_70_d: "ট্রান্সফরমেশন ব্যাকটেরিয়ায় জিন ঢোকানোর কৌশল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 310
      },
      proTipShortcut: "শস্যকলাহীন বীজ = ভ্রূণ কালচার (Embryo culture)।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_71",
    topicId: "top_ssc_biology_ch14_3",
    type: "MCQ",
    stem: "আলুর মাইক্রোটিউবার (Microtuber)-এর প্রধান বৈশিষ্ট্য কোনটি?",
    options: [
      { id: "opt_bio_14_71_a", text: "এটি সম্পূর্ণ ভাইরাস ও রোগমুক্ত ক্ষুদ্র আলুগুটি যা সরাসরি জমিতে রোপণ করা যায়", isCorrect: true },
      { id: "opt_bio_14_71_b", text: "এটি বিষাক্ত হওয়ায় খাওয়া নিষেধ", isCorrect: false },
      { id: "opt_bio_14_71_c", text: "এটি কেবল পানিতেই রোপণ করতে হয়", isCorrect: false },
      { id: "opt_bio_14_71_d", text: "এটি থেকে কোনো গাছ তৈরি হয় না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: এটি সম্পূর্ণ ভাইরাস ও রোগমুক্ত ক্ষুদ্র আলুগুটি যা সরাসরি জমিতে রোপণ করা যায়।",
      coreConcept: "ল্যাবে টিস্যু কালচারে উৎপাদিত মাইক্রোটিউবার সম্পূর্ণ রোগমুক্ত হওয়ায় কৃষকরা এটি সরাসরি রোপণ করে শতভাগ সুস্থ আলুর ফসল পায়।",
      distractorAnalysis: {
        opt_bio_14_71_b: "মাইক্রোটিউবার বিষাক্ত নয়, এটি নিখুঁত ভোজ্য আলুর উন্নত রূপ।",
        opt_bio_14_71_c: "মাইক্রোটিউবার সাধারণ মাটিতেই রোপণ করা হয়।",
        opt_bio_14_71_d: "এটি থেকেই সতেজ নতুন আলু গাছ জন্মায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 311
      },
      proTipShortcut: "মাইক্রোটিউবার = রোগমুক্ত ল্যাবরেটরি আলুবীজ।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_72",
    topicId: "top_ssc_biology_ch14_3",
    type: "MCQ",
    stem: "মরু অঞ্চলের জোজোবা (Jojoba) উদ্ভিদ প্রাকৃতিক পরিবেশে প্রধানত কোন কোন অঞ্চলে জন্মায়?",
    options: [
      { id: "opt_bio_14_72_a", text: "অ্যারিজোনা ও ক্যালিফোর্নিয়ার মরুভূমি", isCorrect: true },
      { id: "opt_bio_14_72_b", text: "আমাজনের বৃষ্টিবন", isCorrect: false },
      { id: "opt_bio_14_72_c", text: "সাইবেরিয়ার তুন্দ্রা অঞ্চল", isCorrect: false },
      { id: "opt_bio_14_72_d", text: "সুন্দরবনের ম্যানগ্রোভ বন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ্যারিজোনা ও ক্যালিফোর্নিয়ার মরুভূমি।",
      coreConcept: "পাঠ্যবইয়ের ৩১১ পৃষ্ঠা অনুযায়ী জোজোবা যুক্তরাষ্ট্রের অ্যারিজোনা ও ক্যালিফোর্নিয়ার বিশেষ মরুভূমি পরিবেশ ছাড়া প্রাকৃতিকভাবে জন্মায় না।",
      distractorAnalysis: {
        opt_bio_14_72_b: "আমাজন চরম আর্দ্র বৃষ্টিবন।",
        opt_bio_14_72_c: "সাইবেরিয়া চরম শীতল বরফাচ্ছাদিত অঞ্চল।",
        opt_bio_14_72_d: "সুন্দরবন লবণাক্ত জোয়ার-ভাটার বন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 311
      },
      proTipShortcut: "জোজোবা আবাসস্থল = Arizona & California desert।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Creative Question 8 (Topic 14.3 / 14.4)
  {
    id: "q_bio_14_73",
    topicId: "top_ssc_biology_ch14_3",
    type: "CQ_CREATIVE",
    stem: "রকেট ও সুপারসনিক জেট বিমানের ইঞ্জিনে অতিউচ্চ তাপসহনশীল পিচ্ছিলকারক তেল হিসেবে পূর্বে তিমি মাছ নিধন করে শুক্রাণু তিমির তেল সংগ্রহ করা হতো। এর ফলে তিমি চরমভাবে বিপন্ন হয়ে পড়ে। বিজ্ঞানীরা ক্যালিফোর্নিয়ার মরুভূমির বিশেষ এক উদ্ভিদ 'Z' চিহ্নিত করলেন যার তেল হুবহু তিমির তেলের মতো কার্যকর। তবে প্রাকৃতিক উপায়ে এর বংশবৃদ্ধি অত্যন্ত ধীরগতির হওয়ায় তারা টিস্যু কালচার প্রয়োগ করে স্বল্প সময়ে লাখ লাখ চারা তৈরি করলেন এবং এটি ভারতের জলবায়ুতেও খাপ খাইয়ে চাষোপযোগী করে তুললেন।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকের উদ্ভিদ 'Z' হলো জোজোবা (Jojoba) যা বন্যপ্রাণী সংরক্ষণ ও শিল্প ক্ষেত্রে টিস্যু কালচারের অনন্য সফলতাকে নির্দেশ করে।",
      coreConcept: "মরু উদ্ভিদের টিস্যু কালচার মাইক্রোপ্রোপাগেশন পরিবেশ ও শিল্পে টেকসই বিকল্প সরবরাহ করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 311
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: উদ্দীপকে নির্দেশিত উদ্ভিদ 'Z'-এর নাম সঠিকভাবে লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: প্রাকৃতিক বংশবৃদ্ধির সীমাবদ্ধতা সত্ত্বেও টিস্যু কালচার কীভাবে এই উদ্ভিদের বংশবৃদ্ধি ত্বরান্বিত করেছে তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: পরীক্ষাগারে উদ্দীপকের উদ্ভিদটির এক্সপ্ল্যান্ট থেকে চারা উৎপাদনের ধারাবাহিক পর্যায়সমূহ ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: বিপন্ন বন্যপ্রাণী (তিমি) সুরক্ষা এবং বৈশ্বিক এভিয়েশন প্রযুক্তিতে উদ্দীপকের জীবপ্রযুক্তি প্রয়োগের ভূমিকা বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.4: জিন প্রকৌশল ও GMO (top_ssc_biology_ch14_4)
  // =========================================================================
  {
    id: "q_bio_14_74",
    topicId: "top_ssc_biology_ch14_4",
    type: "MCQ",
    stem: "জিন প্রকৌশল বা জেনেটিক ইঞ্জিনিয়ারিংয়ের সবচেয়ে আধুনিক ও প্রচলিত নামটি নিচের কোনটি?",
    options: [
      { id: "opt_bio_14_74_a", text: "রিকম্বিন্যান্ট DNA প্রযুক্তি (Recombinant DNA Technology)", isCorrect: true },
      { id: "opt_bio_14_74_b", text: "মেরিস্টেম কালচার প্রযুক্তি", isCorrect: false },
      { id: "opt_bio_14_74_c", text: "হাইব্রিডাইজেশন পদ্ধতি", isCorrect: false },
      { id: "opt_bio_14_74_d", text: "সাইটোপ্লাজমিক ইনহেরিটেন্স", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: রিকম্বিন্যান্ট DNA প্রযুক্তি (Recombinant DNA Technology)।",
      coreConcept: "জিন প্রকৌশল মূলত রিকম্বিন্যান্ট DNA তৈরি ও জিন স্থানান্তরের ওপর নির্ভরশীল হওয়ায় একে রিকম্বিন্যান্ট DNA প্রযুক্তিও বলা হয়।",
      distractorAnalysis: {
        opt_bio_14_74_b: "মেরিস্টেম কালচার টিস্যু কালচারের শাখা।",
        opt_bio_14_74_c: "হাইব্রিডাইজেশন হলো সাধারণ সংকরায়ণ।",
        opt_bio_14_74_d: "সাইটোপ্লাজমিক ইনহেরিটেন্স হলো নিউক্লিয়াস-বহির্ভূত বংশগতি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩",
        pageNumber: 311
      },
      proTipShortcut: "জেনেটিক ইঞ্জিনিয়ারিং = রিকম্বিন্যান্ট DNA প্রযুক্তি।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_75",
    topicId: "top_ssc_biology_ch14_4",
    type: "MCQ",
    stem: "প্রচলিত উদ্ভিদ প্রজননে কোন সীমাবদ্ধতাটি সবচেয়ে বেশি লক্ষ্য করা যায়?",
    options: [
      { id: "opt_bio_14_75_a", text: "কাঙ্ক্ষিত জিনের সাথে অনাকাঙ্ক্ষিত ক্ষতিকর জিনও চলে আসে এবং অনেক বছর সময় লাগে", isCorrect: true },
      { id: "opt_bio_14_75_b", text: "এতে কোনো প্রজাতি রক্ষা পায় না", isCorrect: false },
      { id: "opt_bio_14_75_c", text: "এতে আন্তর্জাতিক চুক্তি মানতে হয়", isCorrect: false },
      { id: "opt_bio_14_75_d", text: "এতে রেস্ট্রিকশন এনজাইমের অভাব ঘটে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কাঙ্ক্ষিত জিনের সাথে অনাকাঙ্ক্ষিত ক্ষতিকর জিনও চলে আসে এবং অনেক বছর সময় লাগে।",
      coreConcept: "সনাতন সংকরায়ণে বংশ পরম্পরায় অপ্রয়োজনীয় ক্ষতিকর জিন যুক্ত হয়ে যায় যা দূর করা কষ্টসাধ্য ও দীর্ঘ সময়সাপেক্ষ।",
      distractorAnalysis: {
        opt_bio_14_75_b: "প্রচলিত প্রজননে প্রজাতি অক্ষুণ্ণ থাকে।",
        opt_bio_14_75_c: "প্রচলিত কৃষিতে আন্তর্জাতিক বায়োসেফটি চুক্তি লাগে না।",
        opt_bio_14_75_d: "সনাতন প্রজননে রেস্ট্রিকশন এনজাইমের ব্যবহারই হয় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩ ও ১৪.৩.২",
        pageNumber: 315
      },
      proTipShortcut: "প্রচলিত প্রজননের দুর্বলতা = অনাকাঙ্ক্ষিত জিন + দীর্ঘ সময়।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_76",
    topicId: "top_ssc_biology_ch14_4",
    type: "MCQ",
    stem: "একজন বিজ্ঞানী তেজস্ক্রিয় গামা রশ্মি প্রয়োগ করে ধানের নিজস্ব জিনে মিউটেশন ঘটিয়ে একটি খাটো জাত তৈরি করলেন। জীবপ্রযুক্তির পরিভাষায় এই ধানটি কী?",
    options: [
      { id: "opt_bio_14_76_a", text: "এটি একটি GMO, তবে ট্রান্সজেনিক নয়", isCorrect: true },
      { id: "opt_bio_14_76_b", text: "এটি একটি ট্রান্সজেনিক জীব, কিন্তু GMO নয়", isCorrect: false },
      { id: "opt_bio_14_76_c", text: "এটি GMO বা ট্রান্সজেনিক কোনোটিই নয়", isCorrect: false },
      { id: "opt_bio_14_76_d", text: "এটি একটি প্লাজমিড ক্লোন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: এটি একটি GMO, তবে ট্রান্সজেনিক নয়।",
      coreConcept: "জিনের কৃত্রিম পরিবর্তনে GMO হয়, তবে বাইরে থেকে কোনো ভিন্ন প্রজাতির নতুন জিন না ঢোকানোয় এটি ট্রান্সজেনিক নয়।",
      distractorAnalysis: {
        opt_bio_14_76_b: "বাইরের প্রজাতি না থাকলে ট্রান্সজেনিক হতে পারে না।",
        opt_bio_14_76_c: "যেহেতু জিনে কৃত্রিম মিউটেশন হয়েছে, এটি অবশ্যই GMO।",
        opt_bio_14_76_d: "উদ্ভিদ নিজে প্লাজমিড ক্লোন নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩",
        pageNumber: 312
      },
      proTipShortcut: "নিজস্ব জিনে মিউটেশন = GMO, তবে নন-ট্রান্সজেনিক।"
    },
    difficulty: "HARD",
    boardSource: "দিনাজপুর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.5: রিকম্বিন্যান্ট DNA তৈরির ধারাবাহিক ধাপ (top_ssc_biology_ch14_5)
  // =========================================================================
  {
    id: "q_bio_14_77",
    topicId: "top_ssc_biology_ch14_5",
    type: "MCQ",
    stem: "প্লাজমিড DNA এবং দাতা DNA উভয়কেই একই রেস্ট্রিকশন এনজাইম দিয়ে কাটার প্রধান বৈজ্ঞানিক কারণ কী?",
    options: [
      { id: "opt_bio_14_77_a", text: "যাতে উভয়ের কাটা প্রান্তে পরস্পরের পরিপূরক এক-সূত্রক আঠালো মুখ (Sticky ends) সৃষ্টি হয়", isCorrect: true },
      { id: "opt_bio_14_77_b", text: "যাতে ব্যাকটেরিয়ার কোষপ্রাচীর শক্ত হয়", isCorrect: false },
      { id: "opt_bio_14_77_c", text: "যাতে লাইগেজ এনজাইম নিষ্ক্রিয় হয়ে যায়", isCorrect: false },
      { id: "opt_bio_14_77_d", text: "যাতে প্লাজমিডটি সোজা রৈখিক সুতায় পরিণত না হয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: যাতে উভয়ের কাটা প্রান্তে পরস্পরের পরিপূরক এক-সূত্রক আঠালো মুখ (Sticky ends) সৃষ্টি হয়।",
      coreConcept: "একই রেস্ট্রিকশন এনজাইম নির্দিষ্ট নিউক্লিওটাইড ক্ষারক ক্রমানুসারে কেটে পরিপূরক স্টিকি প্রান্ত তৈরি করে যা লাইগেজ দিয়ে সহজে জোড়া লাগে।",
      distractorAnalysis: {
        opt_bio_14_77_b: "এনজাইম DNA কাটে, কোষপ্রাচীর শক্ত করে না।",
        opt_bio_14_77_c: "লাইগেজ সক্রিয় রাখার জন্যই পরিপূরক প্রান্ত দরকার।",
        opt_bio_14_77_d: "প্লাজমিড কাটার পর সাময়িকভাবে রৈখিক রূপ নেয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১ (চিত্র ১৪.০২)",
        pageNumber: 313
      },
      proTipShortcut: "একই রেস্ট্রিকশন এনজাইম = পরিপূরক স্টিকি প্রান্ত সৃষ্টি।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_78",
    topicId: "top_ssc_biology_ch14_5",
    type: "MCQ",
    stem: "DNA অণুর নির্দিষ্ট ক্ষারক অনুক্রম চিনে কেটে নেওয়ার ক্ষেত্রে রেস্ট্রিকশন এনজাইমের এই সুনির্দিষ্ট অঞ্চলটিকে কী বলা হয়?",
    options: [
      { id: "opt_bio_14_78_a", text: "রেস্ট্রিকশন সাইট (Restriction site)", isCorrect: true },
      { id: "opt_bio_14_78_b", text: "ক্যালাস সাইট", isCorrect: false },
      { id: "opt_bio_14_78_c", text: "এক্সপ্ল্যান্ট সাইট", isCorrect: false },
      { id: "opt_bio_14_78_d", text: "টটিপোটেন্ট অঞ্চল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: রেস্ট্রিকশন সাইট (Restriction site)।",
      coreConcept: "রেস্ট্রিকশন এনজাইম ৪ থেকে ৮ ক্ষারক জোড়বিশিষ্ট প্যালিন্ড্রোমিক সিকোয়েন্স চিনে কাটে, যাকে রেস্ট্রিকশন সাইট বলে।",
      distractorAnalysis: {
        opt_bio_14_78_b: "ক্যালাস হলো টিস্যু কালচারের টিস্যুপুঞ্জ।",
        opt_bio_14_78_c: "এক্সপ্ল্যান্ট হলো কালচারের উদ্ভিদ খণ্ড।",
        opt_bio_14_78_d: "টটিপোটেন্ট কোষের একটি জীবতাত্ত্বিক বৈশিষ্ট্য।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১",
        pageNumber: 313
      },
      proTipShortcut: "কাটার সুনির্দিষ্ট স্থান = রেস্ট্রিকশন সাইট।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_79",
    topicId: "top_ssc_biology_ch14_5",
    type: "MCQ",
    stem: "একটি রিকম্বিন্যান্ট প্লাজমিড DNA-তে নিচের কোন উপাদানগুলো উপস্থিত থাকে?",
    options: [
      { id: "opt_bio_14_79_a", text: "ব্যাকটেরিয়ার মূল প্লাজমিড অংশ + দাতার কাঙ্ক্ষিত জিন খণ্ড", isCorrect: true },
      { id: "opt_bio_14_79_b", text: "কেবল উদ্ভিদের সেলুলোজ তন্তু", isCorrect: false },
      { id: "opt_bio_14_79_c", text: "ব্যাকটেরিয়ার ক্রোমোজোম + রাইবোজোম", isCorrect: false },
      { id: "opt_bio_14_79_d", text: "অ্যাগার জেল + ভিটামিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ব্যাকটেরিয়ার মূল প্লাজমিড অংশ + দাতার কাঙ্ক্ষিত জিন খণ্ড।",
      coreConcept: "কাটা প্লাজমিডের সাথে দাতার কাঙ্ক্ষিত জিনটি DNA লাইগেজ দিয়ে যুক্ত করলেই যৌথভাবে তৈরি হয় রিকম্বিন্যান্ট প্লাজমিড।",
      distractorAnalysis: {
        opt_bio_14_79_b: "সেলুলোজ কোষপ্রাচীর তৈরি করে, DNA নয়।",
        opt_bio_14_79_c: "প্লাজমিড প্রধান ক্রোমোজোম থেকে আলাদা।",
        opt_bio_14_79_d: "অ্যাগার টিস্যু কালচার মিডিয়ামের উপাদান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১",
        pageNumber: 313
      },
      proTipShortcut: "রিকম্বিন্যান্ট প্লাজমিড = প্লাজমিড ভেক্টর + কাঙ্ক্ষিত জিন।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Creative Question 9 (Topic 14.5 / 14.6)
  {
    id: "q_bio_14_80",
    topicId: "top_ssc_biology_ch14_5",
    type: "CQ_CREATIVE",
    stem: "উন্নত ল্যাবরেটরিতে শিক্ষক বোর্ডে চিত্র ১৪.০২-এর একটি রেখাচিত্র এঁকে বললেন, “এখানে দাতা কোষ ও E. coli ব্যাকটেরিয়া থেকে সংগৃহীত দুটি বৃত্তাকার ও সূত্রাকার DNA অণুকে এনজাইম-১ দ্বারা কেটে পরিপূরক প্রান্ত সৃষ্টি করা হয়। এরপর এনজাইম-২ দ্বারা এদের সংযুক্ত করে যে নতুন সংকর অণু তৈরি হয় তাকে একটি রাসায়নিক প্রক্রিয়ায় গ্রাহক কোষে প্রবেশ করানো হয়। এর ফলে সৃষ্টি হয় কাঙ্ক্ষিত প্রোটিন উৎপাদনকারী ট্রান্সজেনিক ব্যাকটেরিয়া।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে রিকম্বিন্যান্ট DNA প্রযুক্তির মূল ধাপ, এনজাইম-১ (রেস্ট্রিকশন) এবং এনজাইম-২ (লাইগেজ)-এর সুনির্দিষ্ট ভূমিকা বিশ্লেষিত হয়েছে।",
      coreConcept: "এনজাইম-১ ও এনজাইম-২ এর সমন্বিত ক্রিয়ায় রিকম্বিন্যান্ট DNA প্লাজমিড সৃষ্টি এবং ট্রান্সফরমেশনের মাধ্যমে জীবপ্রযুক্তির শিল্প উৎপাদন ঘটে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১ (চিত্র ১৪.০২)",
        pageNumber: 314
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: ট্রান্সফরমেশন (Transformation) কী তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: প্লাজমিডকে কেন জেনেটিক ইঞ্জিনিয়ারিংয়ের আদর্শ 'বাহক' (Vector) বলা হয় তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: উদ্দীপকে উল্লেখিত এনজাইম-১ ও এনজাইম-২-এর নাম এবং এদের কার্যপদ্ধতি চিত্রসহ ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: উদ্দীপকের পদ্ধতিতে প্রস্তুতকৃত ট্রান্সজেনিক ব্যাকটেরিয়া ব্যবহার করে বাণিজ্যিক ওষুধ (যেমন ইনসুলিন বা গ্রোথ হরমোন) উৎপাদনের সম্ভাব্যতা ও গুরুত্ব মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড স্ট্যান্ডার্ড ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.6: কৃষি, চিকিৎসা ও পরিবেশ সুরক্ষায় প্রয়োগ (top_ssc_biology_ch14_6)
  // =========================================================================
  {
    id: "q_bio_14_81",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "বিটি (Bt) ফসলের ক্রিস্টাল প্রোটিন পোকার কোন তন্ত্রে ছিদ্র সৃষ্টি করে পোকাকে মেরে ফেলে?",
    options: [
      { id: "opt_bio_14_81_a", text: "পাকস্থলী ও মধ্য-অন্ত্র (Midgut)", isCorrect: true },
      { id: "opt_bio_14_81_b", text: "স্নায়ুতন্ত্র", isCorrect: false },
      { id: "opt_bio_14_81_c", text: "শ্বসনতন্ত্র (ট্রাকিয়া)", isCorrect: false },
      { id: "opt_bio_14_81_d", text: "রচনতন্ত্র (ম্যালপিজিয়ান নালিকা)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পাকস্থলী ও মধ্য-অন্ত্র (Midgut)।",
      coreConcept: "পোকা বিটি গাছের পাতা খেলে ক্ষারীয় অন্ত্রে ক্রিস্টাল টক্সিন সক্রিয় হয়ে মধ্য-অন্ত্রের কোষে ছিদ্র তৈরি করে, ফলে পোকা অনাহারে মারা যায়।",
      distractorAnalysis: {
        opt_bio_14_81_b: "রাসায়নিক কীটনাশক অনেক সময় স্নায়ুতন্ত্রে আক্রমণ করে, কিন্তু বিটি প্রোটিন অন্ত্রে কাজ করে।",
        opt_bio_14_81_c: "শ্বসনতন্ত্রে গ্যাসীয় বিষাক্ততা ঘটে।",
        opt_bio_14_81_d: "ম্যালপিজিয়ান নালিকা রেচনের সাথে যুক্ত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 315
      },
      proTipShortcut: "Bt টক্সিনের লক্ষ্যস্থল = পোকার ক্ষারীয় অন্ত্র (Midgut)।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_82",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "আলুর মারাত্মক 'লেট ব্লাইট' (Late blight) রোগটি কোন ধরনের অণুজীবের আক্রমণে ঘটে থাকে?",
    options: [
      { id: "opt_bio_14_82_a", text: "ছত্রাক (Fungus)", isCorrect: true },
      { id: "opt_bio_14_82_b", text: "ভাইরাস", isCorrect: false },
      { id: "opt_bio_14_82_c", text: "ব্যাকটেরিয়া", isCorrect: false },
      { id: "opt_bio_14_82_d", text: "কৃমি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ছত্রাক (Fungus)।",
      coreConcept: "পাঠ্যবইয়ের ৩১৬ পৃষ্ঠা অনুযায়ী, লেট ব্লাইট ছত্রাক প্রতিরোধী জিন স্থানান্তরের মাধ্যমে লেট ব্লাইট প্রতিরোধী আলুর জাত উদ্ভাবনের গবেষণা চলছে।",
      distractorAnalysis: {
        opt_bio_14_82_b: "আলুর মোজাইক রোগ ভাইরাসে হয়, লেট ব্লাইট ছত্রাকে।",
        opt_bio_14_82_c: "ব্যাকটেরিয়াল উইল্ট ব্যাকটেরিয়া ঘটিত রোগ।",
        opt_bio_14_82_d: "কৃমি বা নেমাটোড মূলের গিট তৈরি করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 316
      },
      proTipShortcut: "আলুর লেট ব্লাইট = ছত্রাকঘটিত মারাত্মক রোগ।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_83",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "টমেটো মোজাইক ভাইরাস (ToMV) এবং টোব্যাকো মোজাইক ভাইরাস (TMV) প্রতিরোধী জাত তৈরিতে কোন জিনটি স্থানান্তর করা হয়?",
    options: [
      { id: "opt_bio_14_83_a", text: "ভাইরাল কোট প্রোটিন (Coat Protein) জিন", isCorrect: true },
      { id: "opt_bio_14_83_b", text: "ইনসুলিন জিন", isCorrect: false },
      { id: "opt_bio_14_83_c", text: "Protein C জিন", isCorrect: false },
      { id: "opt_bio_14_83_d", text: "রেস্ট্রিকশন জিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ভাইরাল কোট প্রোটিন (Coat Protein) জিন।",
      coreConcept: "ভাইরাসের বহিরাবরণী বা কোট প্রোটিনের জিন স্থানান্তর করে উদ্ভিদে ভাইরাস প্রতিরোধী ক্ষমতা সঞ্চার করা হয়।",
      distractorAnalysis: {
        opt_bio_14_83_b: "ইনসুলিন মানব ডায়াবেটিসের উপাদান।",
        opt_bio_14_83_c: "Protein C গাভীর দুধের প্রোটিন বৃদ্ধির জিন।",
        opt_bio_14_83_d: "রেস্ট্রিকশন জিন DNA কাটার এনজাইম কোড করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 315
      },
      proTipShortcut: "ToMV ও TMV প্রতিরোধ = ভাইরাল Coat Protein জিন।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_84",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "ধানের পুষ্টিমান উন্নয়নের জন্য বিটা-ক্যারোটিন ছাড়াও ধানে রক্তস্বল্পতা রোধে কোন খনিজ উপাদানটি সংযুক্ত করার প্রচেষ্টা চলছে?",
    options: [
      { id: "opt_bio_14_84_a", text: "লৌহ বা আয়রন (Iron)", isCorrect: true },
      { id: "opt_bio_14_84_b", text: "সোডিয়াম", isCorrect: false },
      { id: "opt_bio_14_84_c", text: "লেড বা সিসা", isCorrect: false },
      { id: "opt_bio_14_84_d", text: "আয়োডিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: লৌহ বা আয়রন (Iron)।",
      coreConcept: "পাঠ্যবইয়ের ৩১৬ পৃষ্ঠা অনুযায়ী রক্তস্বল্পতা দূর করতে ধানে লৌহ বা আয়রন যোগ করার জিন প্রকৌশল প্রচেষ্টা অব্যাহত রয়েছে।",
      distractorAnalysis: {
        opt_bio_14_84_b: "সোডিয়াম অতিরিক্ত গ্রহণ উচ্চ রক্তচাপ ঘটায়।",
        opt_bio_14_84_c: "সিসা একটি মারাত্মক বিষাক্ত ভারী ধাতু।",
        opt_bio_14_84_d: "আয়োডিন গলগণ্ড প্রতিরোধ করে, রক্তস্বল্পতা নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 316
      },
      proTipShortcut: "ধানে রক্তস্বল্পতা রোধে সংযোজিত খনিজ = আয়রন (Iron)।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Creative Question 10 (Topic 14.6)
  {
    id: "q_bio_14_85",
    topicId: "top_ssc_biology_ch14_6",
    type: "CQ_CREATIVE",
    stem: "একটি আন্তর্জাতিক পরিবেশ সম্মেলনের সেমিনারে দুটি গবেষণাপত্র উপস্থাপিত হলো:\nগবেষণাপত্র ১: কয়লাখনি ও পেট্রোলিয়াম শোধনাগারের বিষাক্ত অপরিশোধিত হাইড্রোকার্বনযুক্ত বর্জ্য বিশেষ জিন প্রকৌশলকৃত ব্যাকটেরিয়া ব্যবহার করে পরিবেশবান্ধব উপাদানে রূপান্তর।\nগবেষণাপত্র ২: ভেড়ার মাংস ও পশম শিল্পের উন্নয়নে হিউম্যান গ্রোথ হরমোন এবং ব্যাকটেরিয়ার দুটি বিশেষ জিন (CysE ও CysM) স্থানান্তরের মাধ্যমে উন্নত ট্রান্সজেনিক ভেড়া উৎপাদন।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে পরিবেশ সুরক্ষায় সিউডোমোনাস ব্যাকটেরিয়ার ভূমিকা এবং প্রাণীদেহে জিন স্থানান্তরের অর্থনৈতিক প্রয়োগ তুলে ধরা হয়েছে।",
      coreConcept: "পরিবেশ দূষণ রোধে মাইক্রোবায়াল জেনেটিক্স এবং প্রাণীসম্পদের প্রবৃদ্ধি বৃদ্ধিতে জেনেটিক ইঞ্জিনিয়ারিং অনন্য দৃষ্টান্ত।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 316
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: গবেষণাপত্র ১-এ ব্যবহৃত হাইড্রোকার্বন বিনষ্টকারী ব্যাকটেরিয়ার নাম লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: ভেড়ার জিনোমে CysE ও CysM জিন স্থানান্তরের সুনির্দিষ্ট উদ্দেশ্য কী তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: গবেষণাপত্র ১-এর ব্যাকটেরিয়াটি কীভাবে ক্ষতিকর হাইড্রোকার্বন ও তেল খেয়ে পরিবেশ দূষণমুক্ত করে তা ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: গবেষণাপত্র ২-এর মতো প্রাণী জেনেটিক রূপান্তরের বৈশ্বিক প্রয়োজনীয়তা এবং এর নৈতিক ও বায়োসেফটি দিক মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল বোর্ড স্ট্যান্ডার্ড ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Creative Question 11 (Topic 14.2 / 14.6)
  {
    id: "q_bio_14_86",
    topicId: "top_ssc_biology_ch14_2",
    type: "CQ_CREATIVE",
    stem: "কৃষি সম্প্রসারণ কর্মকর্তা জনাব আরিফ কৃষকদের উদ্বুদ্ধ করতে দুটি আধুনিক জীবপ্রযুক্তিগত সাফল্য তুলে ধরলেন:\nপদ্ধতি ক: রোগমুক্ত কলা ও আলুর চারা উৎপাদনে নিয়ন্ত্রিত ল্যাবে কাচের পাত্রে ১২১° সেলসিয়াস তাপমাত্রায় নির্বীজিত মিডিয়ামে ক্যালাস ও অণুচারা উৎপাদন।\nপদ্ধতি খ: কোনো প্রকার বিষাক্ত কীটনাশক স্প্রে ছাড়াই পোকার আক্রমণ প্রতিরোধে সক্ষম এমন বেগুন গাছ তৈরি যাতে একটি মাটির ব্যাকটেরিয়ার কীটনাশক জিন সন্নিবেশিত রয়েছে।",
    options: null,
    explanation: {
      directAnswer: "পদ্ধতি ক হলো টিস্যু কালচার (মেরিস্টেম কালচার) এবং পদ্ধতি খ হলো জিন প্রকৌশলের মাধ্যমে উদ্ভাবিত বিটি বেগুন (Bt Brinjal)।",
      coreConcept: "টিস্যু কালচার রোগমুক্ত চারা জোগায় এবং জিন প্রকৌশল পোকা-প্রতিরোধী ট্রান্সজেনিক ফসল উপহার দেয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২ ও ১৪.৩.২",
        pageNumber: 308
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: টিস্যু কালচার প্রক্রিয়ায় এক্সপ্ল্যান্ট বলতে কী বোঝায় তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: পদ্ধতি খ-এর বেগুন গাছ খেলে মানুষ বা অন্যান্য স্তন্যপায়ী প্রাণীর কোনো বিষক্রিয়া হয় না কেন তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: উদ্দীপকের পদ্ধতি ক-এর মাধ্যমে ল্যাবরেটরিতে রোগমুক্ত চারা উৎপাদনের প্রতিটি ধাপ ধারাবাহিকভাবে ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: বাংলাদেশে কৃষকদের স্বাস্থ্যরক্ষা ও পরিবেশের ভারসাম্য রক্ষায় পদ্ধতি ক এবং পদ্ধতি খ-এর সমন্বিত অবদান মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Creative Question 12 (Comprehensive Board Review CQ)
  {
    id: "q_bio_14_87",
    topicId: "top_ssc_biology_ch14_6",
    type: "CQ_CREATIVE",
    stem: "হাসপাতালে ভর্তি একজন ডায়াবেটিস রোগী চিকিৎসকের কাছে জানতে চাইলেন, “আজকাল যে ইনসুলিন ইনজেকশন দেওয়া হয় তা কোথা থেকে আসে?” চিকিৎসক বললেন, “পূর্বে কসাইখানা থেকে গরু ও শূকরের অগ্ন্যাশয় থেকে ইনসুলিন নিষ্কাশন করা হতো যা বহু রোগীর শরীরে তীব্র অ্যালার্জি করত। কিন্তু বর্তমানে জীবপ্রযুক্তির কল্যাণে মানবদেহের ইনসুলিন তৈরির নিখুঁত জিনটি নিরীহ E. coli ব্যাকটেরিয়া ও ইস্ট কোষে প্রবেশ করিয়ে ফার্মেন্টারে শতভাগ খাঁটি হিউম্যান ইনসুলিন তৈরি করা হয়।”",
    options: null,
    explanation: {
      directAnswer: "রিকম্বিন্যান্ট DNA প্রযুক্তির মাধ্যমে মানব ইনসুলিন উৎপাদনের বৈপ্লবিক চিকিৎসা সাফল্য উদ্দীপকে বর্ণিত হয়েছে।",
      coreConcept: "ব্যাকটেরিয়াল প্লাজমিড ভেক্টর ও জিন ক্লোনিং ব্যবহার করে খাঁটি মানব ইনসুলিন উৎপাদন চিকিৎসাবিজ্ঞানের সর্বশ্রেষ্ঠ অর্জন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১ ও ১৪.৩.২",
        pageNumber: 317
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: বায়োটেকনোলজি শব্দটি কোন সালে প্রথম প্রবর্তিত হয় তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: পশুর অগ্ন্যাশয় থেকে প্রাপ্ত সনাতন ইনসুলিনের তুলনায় রিকম্বিন্যান্ট ইনসুলিন কেন অধিক নিরাপদ তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: E. coli ব্যাকটেরিয়ার সহায়তায় মানব ইনসুলিন জিন রিকম্বিন্যান্ট প্লাজমিডে সংযুক্ত করার পদ্ধতি চিত্রসহ বিশ্লেষণ করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: ডায়াবেটিস ছাড়াও মানবকল্যাণে অন্যান্য জটিল রোগ নিরাময়ে জেনেটিক ইঞ্জিনিয়ারিংয়ের বিস্তৃত ভূমিকা মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "বোর্ড স্ট্যান্ডার্ড মডেল প্রশ্ন ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Final 3 MCQs
  {
    id: "q_bio_14_88",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "কোন দুটি অণুজীবকে জেনেটিক্যালি পরিবর্তন করে মানবদেহের ইনসুলিন বাণিজ্যিকভাবে উৎপাদন করা হয়?",
    options: [
      { id: "opt_bio_14_88_a", text: "Escherichia coli ব্যাকটেরিয়া এবং ইস্ট (Yeast) ছত্রাক", isCorrect: true },
      { id: "opt_bio_14_88_b", text: "Pseudomonas এবং Penicillium", isCorrect: false },
      { id: "opt_bio_14_88_c", text: "Bacillus এবং Agaricus", isCorrect: false },
      { id: "opt_bio_14_88_d", text: "Amoeba এবং Euglena", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: Escherichia coli ব্যাকটেরিয়া এবং ইস্ট (Yeast) ছত্রাক।",
      coreConcept: "পাঠ্যবইয়ের ৩১৭ পৃষ্ঠা অনুযায়ী, মানবদেহের ইনসুলিন তৈরির জিন ব্যবহার করে জেনেটিকভাবে পরিবর্তিত E. coli ব্যাকটেরিয়া এবং ইস্ট থেকে বাণিজ্যিকভাবে খাঁটি ইনসুলিন তৈরি হচ্ছে।",
      distractorAnalysis: {
        opt_bio_14_88_b: "Pseudomonas তেল নষ্ট করে, Penicillium পেনিসিলিন অ্যান্টিবায়োটিক দেয়।",
        opt_bio_14_88_c: "Agaricus খাবার মাশরুম।",
        opt_bio_14_88_d: "Amoeba ও Euglena মুক্তজীবী প্রোটোজোয়া।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 317
      },
      proTipShortcut: "রিকম্বিন্যান্ট ইনসুলিন কারখানা = E. coli ব্যাকটেরিয়া ও ইস্ট।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_89",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "মৎস্য উন্নয়নে দ্রুত বর্ধনশীল স্যামন মাছের বৃদ্ধি হরমোনের জিন স্থানান্তরের মাধ্যমে নিচের কোন কোন মাছের আকার প্রায় ৬০% বড় করা সম্ভব হয়েছে?",
    options: [
      { id: "opt_bio_14_89_a", text: "মাগুর, কমন কার্প, লইট্যা ও তেলাপিয়া", isCorrect: true },
      { id: "opt_bio_14_89_b", text: "রুই, কাতলা ও মৃগেল কেবল", isCorrect: false },
      { id: "opt_bio_14_89_c", text: "চিংড়ি ও কাঁকড়া", isCorrect: false },
      { id: "opt_bio_14_89_d", text: "ইলিশ ও রূপচাঁদা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: মাগুর, কমন কার্প, লইট্যা ও তেলাপিয়া।",
      coreConcept: "পাঠ্যবইয়ের ৩১৬ পৃষ্ঠা অনুসারে স্যামন মাছের গ্রোথ হরমোন জিন রূপান্তরের ফলে মাগুর, কমন কার্প, লইট্যা ও তেলাপিয়া মাছের আকার প্রায় ৬০% বড় হয়েছে।",
      distractorAnalysis: {
        opt_bio_14_89_b: "রুই-কাতলার ক্ষেত্রে পাঠ্যবইয়ে এই নির্দিষ্ট তথ্য নেই।",
        opt_bio_14_89_c: "চিংড়ি ও কাঁকড়া ক্রাস্টাশিয়া পর্বের আর্থ্রোপোডা।",
        opt_bio_14_89_d: "ইলিশ সামুদ্রিক মাছ, যা কৃত্রিমভাবে এভাবে চাষ হয় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 316
      },
      proTipShortcut: "স্যামন গ্রোথ হরমোন প্রাপক = মাগুর, কার্প, লইট্যা ও তেলাপিয়া।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_90",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "আন্তর্জাতিক বায়োসেফটি বা জীবনিরাপত্তা নীতিমালায় জিএমও (GMO) ফসলের ক্ষেত্রে নিচের কোন পরীক্ষাটি সর্বাধিক গুরুত্বের সাথে বিবেচনা করা হয়?",
    options: [
      { id: "opt_bio_14_90_a", text: "বিষাক্ততা (Toxicity) ও সম্ভাব্য অ্যালার্জি সৃষ্টি পরীক্ষা", isCorrect: true },
      { id: "opt_bio_14_90_b", text: "ফলের সুন্দর রঙের পরীক্ষা", isCorrect: false },
      { id: "opt_bio_14_90_c", text: "গাছের কাণ্ড কত মোটা হলো তা মাপা", isCorrect: false },
      { id: "opt_bio_14_90_d", text: "পাতা কতটা মিষ্টি তার পরীক্ষা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বিষাক্ততা (Toxicity) ও সম্ভাব্য অ্যালার্জি সৃষ্টি পরীক্ষা।",
      coreConcept: "পাঠ্যবইয়ের ৩১৫ পৃষ্ঠা অনুযায়ী, জিএমও উদ্ভিদে কোনো অনাকাঙ্ক্ষিত বিষাক্ততা (Toxicity) বা ক্ষতিকর উপাদান তৈরি হচ্ছে কি না তা আন্তর্জাতিক বায়োসেফটি নিয়মে কঠোরভাবে পরীক্ষা করা হয়।",
      distractorAnalysis: {
        opt_bio_14_90_b: "ফলের রঙ কোনো নিরাপত্তা ঝুঁকি নয়।",
        opt_bio_14_90_c: "কাণ্ডের স্থূলতা জীবনিরাপত্তার বিষয় নয়।",
        opt_bio_14_90_d: "পাতার স্বাদ জীবনিরাপত্তা মানদণ্ড নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩ ও ১৪.৩.২",
        pageNumber: 315
      },
      proTipShortcut: "Biosafety 핵심 = Toxicity & Allergenicity Testing।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
