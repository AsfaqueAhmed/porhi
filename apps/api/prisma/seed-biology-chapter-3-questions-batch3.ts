import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter3QuestionsBatch3: QuestionData[] = [
  // =========================================================================
  // Topic 3.3: ক্ষত নিরাময়, কোষের আয়ুষ্কাল ও সাইটোকাইনেসিস [top_ssc_biology_ch3_3]
  // =========================================================================
  {
    id: "q_bio_3_57",
    topicId: "top_ssc_biology_ch3_3",
    type: "MCQ",
    stem: "মানবদেহের লোহিত রক্তকণিকা (Red Blood Cell) ধ্বংসপ্রাপ্ত হওয়ার পর কোন বিভাজনের মাধ্যমে প্রতিনিয়ত নতুন রক্তকোষ তৈরি হয়?",
    options: [
      { id: "opt_bio_3_57_a", text: "মাইটোসিস", isCorrect: true },
      { id: "opt_bio_3_57_b", text: "মিয়োসিস", isCorrect: false },
      { id: "opt_bio_3_57_c", text: "অ্যামাইটোসিস", isCorrect: false },
      { id: "opt_bio_3_57_d", text: "দ্বি-ভাজন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: মাইটোসিস।",
      coreConcept: "লোহিত রক্তকণিকার গড় আয়ু প্রায় ১২০ দিন। বিনষ্ট হওয়া কোষগুলোর শূন্যস্থান পূরণে অস্থিমজ্জার স্টেম কোষে নিয়মিত মাইটোসিস বিভাজন ঘটে (পৃষ্ঠা ৫৮)।",
      distractorAnalysis: {
        opt_bio_3_57_b: "মিয়োসিস কেবল শুক্রাণু ও ডিম্বাণু তৈরিতে ঘটে, রক্তকোষে নয়।",
        opt_bio_3_57_c: "অ্যামাইটোসিস ব্যাকটেরিয়ায় ঘটে।",
        opt_bio_3_57_d: "দ্বি-ভাজন আদিকোষীর বিভাজন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "রক্তকোষের নিয়মিত প্রতিস্থাপন = মাইটোসিস!"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_58",
    topicId: "top_ssc_biology_ch3_3",
    type: "MCQ",
    stem: "সাইটোকাইনেসিস না ঘটে যদি কেবল বারবার ক্যারিওকাইনেসিস সম্পন্ন হয়, তবে নিচের কোনটি ঘটবে?",
    options: [
      { id: "opt_bio_3_58_a", text: "একটি বহুনিউক্লিয়াসবিশিষ্ট (Coenocytic) অস্বাভাবিক কোষ সৃষ্টি হবে", isCorrect: true },
      { id: "opt_bio_3_58_b", text: "কোষটি অবিলম্বে মারা যাবে", isCorrect: false },
      { id: "opt_bio_3_58_c", text: "ক্রোমোজোম সংখ্যা অর্ধেক হয়ে যাবে", isCorrect: false },
      { id: "opt_bio_3_58_d", text: "কোষের নিউক্লিয়াস ধ্বংস হয়ে যাবে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: একটি বহুনিউক্লিয়াসবিশিষ্ট (Coenocytic) অস্বাভাবিক কোষ সৃষ্টি হবে।",
      coreConcept: "নিউক্লিয়াস বিভাজিত হওয়ার পর যদি সাইটোপ্লাজম বিভক্ত না হয়, তবে একটিমাত্র কোষের সাইটোপ্লাজমে একাধিক নিউক্লিয়াস পুঞ্জীভূত হয়ে সিনোসাইটিক অবস্থা তৈরি হয়।",
      distractorAnalysis: {
        opt_bio_3_58_b: "কোষটি তৎক্ষণাৎ মারা যায় না, বরং বহুনিউক্লিয়াসযুক্ত হয়ে বেঁচে থাকতে পারে।",
        opt_bio_3_58_c: "ক্রোমোজোম সংখ্যা কমে না।",
        opt_bio_3_58_d: "নিউক্লিয়াস ধ্বংস হয় না, সংখ্যায় বাড়ে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 56
      },
      proTipShortcut: "শুধু নিউক্লিয়াস বিভাজন + নো সাইটোকাইনেসিস = বহুনিউক্লিয়াসবিশিষ্ট কোষ!"
    },
    difficulty: "HARD",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_59",
    topicId: "top_ssc_biology_ch3_3",
    type: "MCQ",
    stem: "উদ্ভিদকোষের কোষপ্লেট পরবর্তীতে কোনটিতে রূপান্তরিত হয়?",
    options: [
      { id: "opt_bio_3_59_a", text: "কোষপ্রাচীর ও মধ্যপর্দায়", isCorrect: true },
      { id: "opt_bio_3_59_b", text: "প্লাজমামেমব্রেনে", isCorrect: false },
      { id: "opt_bio_3_59_c", text: "নিউক্লিয়ার মেমব্রেনে", isCorrect: false },
      { id: "opt_bio_3_59_d", text: "টোনোপ্লাস্টে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কোষপ্রাচীর ও মধ্যপর্দায়।",
      coreConcept: "কোষপ্লেটের ওপর সেলুলোজ, হেমি-সেলুলোজ ও পেকটিন জমা হয়ে স্থায়ী দৃঢ় কোষপ্রাচীর এবং দুটি অপত্য কোষের মাঝে মধ্যপর্দা সৃষ্টি করে (পৃষ্ঠা ৫৬)।",
      distractorAnalysis: {
        opt_bio_3_59_b: "প্লাজমামেমব্রেন কোষপ্রাচীরের নিচে অবস্থান করে।",
        opt_bio_3_59_c: "নিউক্লিয়ার পর্দা নিউক্লিয়াসকে ঘেরে।",
        opt_bio_3_59_d: "টোনোপ্লাস্ট হলো কোষগহ্বরের আবরণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 56
      },
      proTipShortcut: "কোষপ্লেট = নতুন কোষপ্রাচীরের ভিত্তিপ্রস্তর!"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_60",
    topicId: "top_ssc_biology_ch3_3",
    type: "MCQ",
    stem: "সুতা দিয়ে ক্রোমোজোম মডেল নির্মাণের ক্ষেত্রে গিটটি কিসের প্রতীক হিসেবে কাজ করে?",
    options: [
      { id: "opt_bio_3_60_a", text: "সেন্ট্রোমিয়ার", isCorrect: true },
      { id: "opt_bio_3_60_b", text: "স্যাটেলাইট", isCorrect: false },
      { id: "opt_bio_3_60_c", text: "টেলোমিয়ার", isCorrect: false },
      { id: "opt_bio_3_60_d", text: "ক্রোমাটিড বাহু", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সেন্ট্রোমিয়ার।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ৫৬-এর দলগত কাজে সুস্পষ্টভাবে বলা হয়েছে: 'এমনভাবে গিট দাও যাতে গিটটি হবে সেন্ট্রোমিয়ারের মডেল।'",
      distractorAnalysis: {
        opt_bio_3_60_b: "স্যাটেলাইট হলো ক্রোমোজোমের গৌণ কুঞ্চনের পরের অংশ।",
        opt_bio_3_60_c: "টেলোমিয়ার হলো প্রান্তভাগ।",
        opt_bio_3_60_d: "সুতার বিস্তৃত অংশগুলো ক্রোমাটিড বাহু নির্দেশ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 56
      },
      proTipShortcut: "সুতার গিট = সেন্ট্রোমিয়ার!"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_61",
    topicId: "top_ssc_biology_ch3_3",
    type: "MCQ",
    stem: "প্রাণিকোষে সাইটোকাইনেসিসের সময় কোন অঞ্চল বরাবর খাঁজ তৈরি হয়?",
    options: [
      { id: "opt_bio_3_61_a", text: "স্পিন্ডল যন্ত্রের দুই মেরু বরাবর", isCorrect: false },
      { id: "opt_bio_3_61_b", text: "স্পিন্ডল যন্ত্রের বিষুবীয় অঞ্চল বরাবর", isCorrect: true },
      { id: "opt_bio_3_61_c", text: "নিউক্লিওলাসের কাছাকাছি", isCorrect: false },
      { id: "opt_bio_3_61_d", text: "সেন্ট্রিওলের ঠিক ওপর", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: স্পিন্ডল যন্ত্রের বিষুবীয় অঞ্চল বরাবর।",
      coreConcept: "প্রাণীর ক্ষেত্রে স্পিন্ডল যন্ত্রের বিষুবীয় অঞ্চল বরাবর কোষঝিল্লিটি গর্তের মতো ভেতরের দিকে ঢুকে যায় (পৃষ্ঠা ৫৬)।",
      distractorAnalysis: {
        opt_bio_3_61_a: "মেরু বরাবর খাঁজ ঢুকলে কোষ লম্বালম্বি চিড়ে যেত, বিষুবীয় তলে খাঁজ তৈরি হয়।",
        opt_bio_3_61_c: "নিউক্লিওলাস নিউক্লিয়াসের ভেতরে থাকে।",
        opt_bio_3_61_d: "সেন্ট্রিওল মেরুতে অবস্থান করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 56
      },
      proTipShortcut: "খাঁজ কাটে ঠিক কোমর বা বিষুবীয় অঞ্চলে।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_62",
    topicId: "top_ssc_biology_ch3_3",
    type: "MCQ",
    stem: "মাইটোসিস কোষ বিভাজনের কারণে জীবদেহের কোনটি অক্ষুণ্ণ থাকে?",
    options: [
      { id: "opt_bio_3_62_a", text: "গুণগত বৈশিষ্ট্যের স্থিতিশীলতা", isCorrect: true },
      { id: "opt_bio_3_62_b", text: "ক্রোমোজোম সংখ্যা হ্রাস পাওয়া", isCorrect: false },
      { id: "opt_bio_3_62_c", text: "জিনের ব্যাপক রূপান্তর", isCorrect: false },
      { id: "opt_bio_3_62_d", text: "ক্রোমোজোম সংখ্যা দ্বিগুণ হওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: গুণগত বৈশিষ্ট্যের স্থিতিশীলতা।",
      coreConcept: "মাইটোসিসের ফলে একই ধরনের কোষের উৎপত্তি হওয়ায় জীবজগতের গুণগত বৈশিষ্ট্যের স্থিতিশীলতা বজায় থাকে (পৃষ্ঠা ৫৮)।",
      distractorAnalysis: {
        opt_bio_3_62_b: "ক্রোমোজোম হ্রাস পাওয়া মিয়োসিসের বৈশিষ্ট্য।",
        opt_bio_3_62_c: "জিনের রূপান্তর বা ক্রসিং ওভার মিয়োসিসে ঘটে।",
        opt_bio_3_62_d: "ক্রোমোজোম দ্বিগুণ হওয়া কোনো স্বাভাবিক বিভাজনের নিয়মিত কাজ নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "মাইটোসিস = জিনগত ক্লোন ও গুণগত স্থিতিশীলতা।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_63",
    topicId: "top_ssc_biology_ch3_3",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান ক্লাসে শিক্ষক বোর্ডে দুটি চিত্র আঁকলেন: চিত্র ১-এ দেখানো হয়েছে টেলোফেজের পর একটি উদ্ভিদকোষের মাঝখানে ক্ষুদ্র ভেসিকল মিলে আড়াআড়ি শক্ত দেয়াল তৈরি করছে। চিত্র ২-এ দেখানো হয়েছে একটি প্রাণিকোষের প্লাজমামেমব্রেন দুই পাশ থেকে গর্তের মতো ভেতরের দিকে খাঁজ তৈরি করে কোষটিকে দুভাগে ভাগ করছে।",
    options: null,
    explanation: {
      directAnswer: "চিত্র ১ হলো উদ্ভিদকোষের কোষপ্লেট পদ্ধতি এবং চিত্র ২ হলো প্রাণিকোষের ক্লিভেজ খাঁজ পদ্ধতিতে সাইটোকাইনেসিস।",
      coreConcept: "উদ্ভিদ ও প্রাণিকোষের সাইটোকাইনেসিসের কাঠামোগত মেকানিজম এবং অঙ্গাণুর ভূমিকা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 56
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "সাইটোকাইনেসিস কাকে বলে তা নির্ভুল লেখা।" },
      kha: { mark: 2, criteria: "উদ্ভিদকোষে কেন খাঁজ সৃষ্টির মাধ্যমে সাইটোকাইনেসিস হতে পারে না তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "চিত্র ১-এ কোষপ্লেট গঠনে এন্ডোপ্লাজমিক জালিকার ভূমিকা বর্ণনা করা।" },
      gha: { mark: 4, criteria: "“চিত্র ১ ও চিত্র ২ উভয়ের উদ্দেশ্য এক হলেও কৌশল ভিন্ন”—বিশ্লেষণপূর্বক যৌক্তিক মতামত দেওয়া।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 3.5: জেনোপাস ব্যাঙের পলিপ্লয়েডি, আলু ও জেনেটিক বৈচিত্র্য [top_ssc_biology_ch3_5]
  // =========================================================================
  {
    id: "q_bio_3_64",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "আফ্রিকান নখরযুক্ত ব্যাঙের কোন প্রজাতিটির সম্পূর্ণ ক্রোমোজোম সেট দ্বিগুণ হয়ে Xenopus laevis প্রজাতির উৎপত্তি হয়েছে?",
    options: [
      { id: "opt_bio_3_64_a", text: "Xenopus tropicalis", isCorrect: true },
      { id: "opt_bio_3_64_b", text: "Rana tigrina", isCorrect: false },
      { id: "opt_bio_3_64_c", text: "Bufo melanostictus", isCorrect: false },
      { id: "opt_bio_3_64_d", text: "Hyla versicolor", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: Xenopus tropicalis।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ৬১ অনুসারে: ব্যাঙের একটি প্রজাতি Xenopus tropicalis-এর সম্পূর্ণ ক্রোমোজোম সেট দ্বিগুণ হয়ে Xenopus laevis প্রজাতির উৎপত্তি ঘটেছে।",
      distractorAnalysis: {
        opt_bio_3_64_b: "Rana tigrina হলো কোলা ব্যাঙের পুরোনো বৈজ্ঞানিক নাম।",
        opt_bio_3_64_c: "Bufo melanostictus হলো সাধারণ কুনো ব্যাঙ।",
        opt_bio_3_64_d: "Hyla হলো গেছো ব্যাঙ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 61
      },
      proTipShortcut: "Tropicalis (ছোট আদি) দ্বিগুণ হয়ে তৈরি হয়েছে Laevis (বড় নতুন)!"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_65",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "উদ্ভিদ জগতের কোন পরিচিত খাদ্য ফসলে ক্রোমোজোম সেট দ্বিগুণ হওয়ার প্রাকৃতিক ঘটনা নিয়মিত দেখা যায়?",
    options: [
      { id: "opt_bio_3_65_a", text: "আলু (Potato)", isCorrect: true },
      { id: "opt_bio_3_65_b", text: "সরিষা", isCorrect: false },
      { id: "opt_bio_3_65_c", text: "মটরশুঁটি", isCorrect: false },
      { id: "opt_bio_3_65_d", text: "পাট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: আলু (Potato)।",
      coreConcept: "প্ল্যান্টি রাজ্যের বিভিন্ন সদস্যের (যেমন আলু) দেহকোষে ক্রোমোজোম সেট বৃদ্ধি একটি স্বাভাবিক ঘটনা, যার ফলে ফলন ও আকার তুলনামূলক বড় হয় (পৃষ্ঠা ৬১)।",
      distractorAnalysis: {
        opt_bio_3_65_b: "সরিষা স্বাভাবিক ডিপ্লয়েড তেলবীজ।",
        opt_bio_3_65_c: "মটরশুঁটি মেন্ডেলের ডিপ্লয়েড গবেষণার উদ্ভিদ।",
        opt_bio_3_65_d: "পাট স্বাভাবিক আঁশ উৎপাদনকারী উদ্ভিদ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 61
      },
      proTipShortcut: "বড় আকারের পুষ্টিকর আলু = ক্রোমোজোম সেট বৃদ্ধির অনন্য দৃষ্টান্ত!"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_66",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "যৌন প্রজননকারী জীবে জিনগত বৈচিত্র্য (Genetic Diversity) সৃষ্টির মূল চালিকাশক্তি কোনটি?",
    options: [
      { id: "opt_bio_3_66_a", text: "মাইটোসিসে অপত্য কোষ তৈরি", isCorrect: false },
      { id: "opt_bio_3_66_b", text: "মিয়োসিসের মাধ্যমে জিনের পুনর্বিন্যাস", isCorrect: true },
      { id: "opt_bio_3_66_c", text: "অ্যামাইটোসিস বিভাজন", isCorrect: false },
      { id: "opt_bio_3_66_d", text: "সাইটোকাইনেসিসের ক্লিভেজ খাঁজ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মিয়োসিসের মাধ্যমে জিনের পুনর্বিন্যাস।",
      coreConcept: "যৌন জনন করে এমন সকল জীবে মিয়োসিসের মাধ্যমে জিনের পুনর্বিন্যাস হয়ে জিনগত বৈচিত্র্য সৃষ্টি হয়ে থাকে (পৃষ্ঠা ৬১)।",
      distractorAnalysis: {
        opt_bio_3_66_a: "মাইটোসিস হুবহু ক্লোন কোষ তৈরি করে, বৈচিত্র্য আনে না।",
        opt_bio_3_66_c: "অ্যামাইটোসিস প্রত্যক্ষ বিভাজন, নতুন জিনগত সমাহার দেয় না।",
        opt_bio_3_66_d: "ক্লিভেজ খাঁজ কেবল সাইটোপ্লাজম আলাদা করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 61
      },
      proTipShortcut: "মিয়োসিস = জিনের পুনর্বিন্যাস = জীবজগতের বৈচিত্র্য!"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_67",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "প্রকৃতিতে কোনো জীব প্রজাতির পরিবর্তিত পরিবেশে খাপ খাইয়ে টিকে থাকার সম্ভাবনা কিসের ওপর নির্ভর করে?",
    options: [
      { id: "opt_bio_3_67_a", text: "সদস্যদের জিনগত বৈচিত্র্যের প্রাচুর্যের ওপর", isCorrect: true },
      { id: "opt_bio_3_67_b", text: "কেবল কোষের আকারের ওপর", isCorrect: false },
      { id: "opt_bio_3_67_c", text: "কোষপ্রাচীরের পুরুত্বের ওপর", isCorrect: false },
      { id: "opt_bio_3_67_d", text: "জীবের বয়সের ওপর", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সদস্যদের জিনগত বৈচিত্র্যের প্রাচুর্যের ওপর।",
      coreConcept: "কোনো প্রজাতির টিকে থাকা মূলত নির্ভর করে তার সদস্য জীবের মধ্যে কতটা বৈচিত্র্য আছে। বৈচিত্র্য বেশি থাকলে প্রতিকূল পরিবেশে বেঁচে থাকার সম্ভাবনা বাড়ে (পৃষ্ঠা ৬১)।",
      distractorAnalysis: {
        opt_bio_3_67_b: "কোষের আকার অভিযোজনের মূল নিয়ামক নয়।",
        opt_bio_3_67_c: "কোষপ্রাচীর কেবল উদ্ভিদে থাকে, প্রাণীতে নেই।",
        opt_bio_3_67_d: "জীবের বয়স প্রজাতিগত টিকে থাকা নির্ধারণ করে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 61
      },
      proTipShortcut: "বেশি বৈচিত্র্য = বেশি অভিযোজন ক্ষমতা ও টিকে থাকা!"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_68",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "যদি কোনো প্রজাতির জীবের মধ্যে জিনগত বৈচিত্র্য খুব কম থাকে, তবে বড় কোনো পরিবেশ বিপর্যয়ে কী ঘটতে পারে?",
    options: [
      { id: "opt_bio_3_68_a", text: "প্রজাতিটি রাতারাতি আরও শক্তিশালী হবে", isCorrect: false },
      { id: "opt_bio_3_68_b", text: "খাপ খাওয়ানোর বৈশিষ্ট্যের অভাবে পুরো প্রজাতিটিই বিলুপ্ত হয়ে যেতে পারে", isCorrect: true },
      { id: "opt_bio_3_68_c", text: "সবাই অমর হয়ে যাবে", isCorrect: false },
      { id: "opt_bio_3_68_d", text: "কোষের ক্রোমোজোম দ্বিগুণ হয়ে যাবে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: খাপ খাওয়ানোর বৈশিষ্ট্যের অভাবে পুরো প্রজাতিটিই বিলুপ্ত হয়ে যেতে পারে।",
      coreConcept: "বৈচিত্র্য কম থাকলে নতুন কোনো প্রতিকূল পরিবেশে খাপ খাওয়ানোর মতো প্রতিরোধী বৈশিষ্ট্য কারও মধ্যেই থাকবে না, ফলে পুরো প্রজাতি বিলুপ্ত হয়ে যেতে পারে (পৃষ্ঠা ৬১)।",
      distractorAnalysis: {
        opt_bio_3_68_a: "বৈচিত্র্যহীন প্রজাতি পরিবেশ পরিবর্তনের মুখে দুর্বল ও ঝুঁকিপূর্ণ হয়।",
        opt_bio_3_68_c: "কোনো জীবই প্রাকৃতিক নিয়মে অমর নয়।",
        opt_bio_3_68_d: "বিপর্যয়ে ক্রোমোজোম আপনাআপনি দ্বিগুণ হয় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 61
      },
      proTipShortcut: "বৈচিত্র্যহীনতা = বিলুপ্তির ফাঁদ!"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_69",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "জীবের টিকে থাকার ক্ষেত্রে বিশেষ সুবিধা দেয় বলেই কোন বিভাজন প্রক্রিয়াটি বিবর্তিত হয়ে জীবজগতে নিজের স্থান করে নিয়েছে?",
    options: [
      { id: "opt_bio_3_69_a", text: "অ্যামাইটোসিস", isCorrect: false },
      { id: "opt_bio_3_69_b", text: "মিয়োসিস বিভাজন", isCorrect: true },
      { id: "opt_bio_3_69_c", text: "দ্বি-ভাজন", isCorrect: false },
      { id: "opt_bio_3_69_d", text: "মুকলোদগম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মিয়োসিস বিভাজন।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ৬১-এর শেষ লাইন: 'জীবের টিকে থাকার ক্ষেত্রে বিশেষ সুবিধা দেয় বলেই মিয়োসিস বিভাজন বিবর্তিত হয়ে জীবজগতে নিজের স্থান করে নিয়েছে।'",
      distractorAnalysis: {
        opt_bio_3_69_a: "অ্যামাইটোসিস আদিম সরল প্রক্রিয়া।",
        opt_bio_3_69_c: "দ্বি-ভাজন ব্যাকটেরিয়ার দ্রুত বংশবৃদ্ধি রূপ।",
        opt_bio_3_69_d: "মুকলোদগম ঈস্ট ও হাইড্রার অযৌন রূপ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 61
      },
      proTipShortcut: "বিবর্তনের অন্যতম শ্রেষ্ঠ উপহার = মিয়োসিস!"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_70",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "মানবদেহের শুক্রাণু ও ডিম্বাণুতে ক্রোমোজোম সংখ্যা যথাক্রমে কতটি?",
    options: [
      { id: "opt_bio_3_70_a", text: "২৩টি ও ২৩টি", isCorrect: true },
      { id: "opt_bio_3_70_b", text: "৪৬টি ও ৪৬টি", isCorrect: false },
      { id: "opt_bio_3_70_c", text: "২৩ জোড়া ও ২৩ জোড়া", isCorrect: false },
      { id: "opt_bio_3_70_d", text: "৪৪টি ও ২টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ২৩টি ও ২৩টি।",
      coreConcept: "মানুষের দেহকোষে ক্রোমোজোম সংখ্যা ৪৬টি (২৩ জোড়া বা 2n)। মিয়োসিসের ফলে জননকোষে (শুক্রাণু ও ডিম্বাণু) ক্রোমোজোম সংখ্যা অর্ধেক অর্থাৎ ২৩টি (হ্যাপ্লয়েড বা n) হয়।",
      distractorAnalysis: {
        opt_bio_3_70_b: "৪৬টি হলো দেহকোষের ক্রোমোজোম সংখ্যা।",
        opt_bio_3_70_c: "২৩ জোড়া মানে ৪৬টি, যা জননকোষে থাকে না।",
        opt_bio_3_70_d: "৪৪টি অটোজোম ও ২টি সেক্স ক্রোমোজোম দেহকোষের বিন্যাস।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 60
      },
      proTipShortcut: "মানুষের গ্যামেট = হ্যাপ্লয়েড ২৩টি ক্রোমোজোম!"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_71",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "মিয়োসিস-১ এর অ্যানাফেজ-১ এ কোনটির পৃথকীকরণ ঘটে?",
    options: [
      { id: "opt_bio_3_71_a", text: "হোমোলোগাস ক্রোমোজোম জোড়া", isCorrect: true },
      { id: "opt_bio_3_71_b", text: "সেন্ট্রোমিয়ার দ্বিখণ্ডিত হয়ে সিস্টার ক্রোমাটিড", isCorrect: false },
      { id: "opt_bio_3_71_c", text: "কেবল নিউক্লিওলাস", isCorrect: false },
      { id: "opt_bio_3_71_d", text: "কোষপ্রাচীর", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: হোমোলোগাস ক্রোমোজোম জোড়া।",
      coreConcept: "মিয়োসিস-১ এ হোমোলোগাস (সমসংস্থ) ক্রোমোজোম দুটি আলাদা হয়ে দুই মেরুতে যায়, সেন্ট্রোমিয়ার বিভাজিত হয় না। ফলে ক্রোমোজোম সংখ্যা অর্ধেক হয়ে যায়।",
      distractorAnalysis: {
        opt_bio_3_71_b: "সেন্ট্রোমিয়ার দ্বিখণ্ডিত হয়ে সিস্টার ক্রোমাটিড আলাদা হয় মিয়োসিস-২ ও মাইটোসিসে।",
        opt_bio_3_71_c: "নিউক্লিওলাস অ্যানাফেজে থাকে না।",
        opt_bio_3_71_d: "কোষপ্রাচীর সাইটোকাইনেসিসে সংশ্লিষ্ট।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 59
      },
      proTipShortcut: "মিয়োসিস-১ = জোড়া ক্রোমোজোমের পৃথকীকরণ (হ্রাস)!"
    },
    difficulty: "HARD",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_72",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "মিয়োসিস না ঘটলে যৌন প্রজননকারী জীবের ক্ষেত্রে কোন দুর্যোগটি ঘটত?",
    options: [
      { id: "opt_bio_3_72_a", text: "প্রতি প্রজন্মে ক্রোমোজোম সংখ্যা দ্বিগুণ হতে হতে জীবদেহের ভারসাম্য নষ্ট হতো", isCorrect: true },
      { id: "opt_bio_3_72_b", text: "জীবের বয়স বাড়ত না", isCorrect: false },
      { id: "opt_bio_3_72_c", text: "সবাই অমর হয়ে যেত", isCorrect: false },
      { id: "opt_bio_3_72_d", text: "সালোকসংশ্লেষণ বন্ধ হয়ে যেত", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রতি প্রজন্মে ক্রোমোজোম সংখ্যা দ্বিগুণ হতে হতে জীবদেহের ভারসাম্য নষ্ট হতো।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ৬০ অনুযায়ী: ক্রোমোজোম সংখ্যা বংশপরম্পরায় দ্বিগুণ হতে থাকলে বংশধরদের মধ্যে আমূল রূপান্তর ঘটে স্বাভাবিক প্রজাতির অস্তিত্ব ধ্বংস হয়ে যেত।",
      distractorAnalysis: {
        opt_bio_3_72_b: "বয়স বাড়ার সাথে মিয়োসিসের সরাসরি সমীকরণ নেই।",
        opt_bio_3_72_c: "জীব অমর হতে পারত না।",
        opt_bio_3_72_d: "সালোকসংশ্লেষণ উদ্ভিদের স্বতন্ত্র শারীরবৃত্তীয় কাজ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 60
      },
      proTipShortcut: "মিয়োসিস = প্রজাতির ক্রোমোজোমের পরম রক্ষাকবচ!"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_73",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "হ্যাপ্লয়েড (n) এবং ডিপ্লয়েড (2n) অবস্থার সঠিক সম্পর্ক কোনটি?",
    options: [
      { id: "opt_bio_3_73_a", text: "শুক্রাণু (n) + ডিম্বাণু (n) = জাইগোট (2n)", isCorrect: true },
      { id: "opt_bio_3_73_b", text: "শুক্রাণু (2n) + ডিম্বাণু (2n) = জাইগোট (2n)", isCorrect: false },
      { id: "opt_bio_3_73_c", text: "শুক্রাণু (n) + ডিম্বাণু (2n) = জাইগোট (n)", isCorrect: false },
      { id: "opt_bio_3_73_d", text: "জাইগোট (n) থেকে দেহকোষ (2n)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: শুক্রাণু (n) + ডিম্বাণু (n) = জাইগোট (2n)।",
      coreConcept: "দুটি হ্যাপ্লয়েড (n) গ্যামেটের মিলনের মাধ্যমে ডিপ্লয়েড (2n) জাইগোট তৈরি হয় (পৃষ্ঠা ৬০)।",
      distractorAnalysis: {
        opt_bio_3_73_b: "জননকোষ ডিপ্লয়েড থাকে না।",
        opt_bio_3_73_c: "অসম সেটের মিলন অস্বাভাবিক।",
        opt_bio_3_73_d: "জাইগোট সর্বদা ডিপ্লয়েড (2n)।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 60
      },
      proTipShortcut: "n + n = 2n জীববিজ্ঞানের সর্বজনীন যৌন সূত্র!"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_74",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "আলুর মতো উদ্ভিদের ফলন বৃদ্ধিতে মানুষ কেন পলিপ্লয়েড (ক্রোমোজোম সেট বৃদ্ধিপ্রাপ্ত) জাত নির্বাচন করে?",
    options: [
      { id: "opt_bio_3_74_a", text: "এরা আকারে তুলনামূলক বড় ও খাদ্য চাহিদা মেটাতে সহায়ক হয়", isCorrect: true },
      { id: "opt_bio_3_74_b", text: "এদের কোনো পানির প্রয়োজন হয় না", isCorrect: false },
      { id: "opt_bio_3_74_c", text: "এদের কোনো দিন রোগবালাই হয় না", isCorrect: false },
      { id: "opt_bio_3_74_d", text: "এরা আলো ছাড়াই বাঁচতে পারে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: এরা আকারে তুলনামূলক বড় ও খাদ্য চাহিদা মেটাতে সহায়ক হয়।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ৬১ অনুসারে: আমরা ইচ্ছাকৃতভাবে খাদ্য হিসেবে ব্যবহারের জন্য উদ্ভিদের এই জাত বেছে নিই, কারণ তা আকারে তুলনামূলক বড় হয় এবং খাদ্য চাহিদা মেটায়।",
      distractorAnalysis: {
        opt_bio_3_74_b: "উদ্ভিদ মাত্রই পানির প্রয়োজন রয়েছে।",
        opt_bio_3_74_c: "রোগবালাই সম্পূর্ণরূপে মুক্ত থাকে না।",
        opt_bio_3_74_d: "আলু গাছ সবুজ হওয়ায় আলোর প্রয়োজন অনস্বীকার্য।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 61
      },
      proTipShortcut: "পলিপ্লয়েডি = ফল ও কন্দের বৃহৎ আকার ও উচ্চ উৎপাদন!"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_75",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "নিচের কোন উক্তিটি মিয়োসিস কোষ বিভাজনের ক্ষেত্রে মিথ্যা?",
    options: [
      { id: "opt_bio_3_75_a", text: "অপত্য কোষে ক্রোমোজোম সংখ্যা অর্ধেক হয়", isCorrect: false },
      { id: "opt_bio_3_75_b", text: "একটি মাতৃকোষ থেকে ৪টি হ্যাপ্লয়েড কোষ উৎপন্ন হয়", isCorrect: false },
      { id: "opt_bio_3_75_c", text: "দেহকোষের সংখ্যাবৃদ্ধির জন্য এই বিভাজন অপরিহার্য", isCorrect: true },
      { id: "opt_bio_3_75_d", text: "জিনের পুনর্বিন্যাস ঘটিয়ে বৈচিত্র্য সৃষ্টি করে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: দেহকোষের সংখ্যাবৃদ্ধির জন্য এই বিভাজন অপরিহার্য।",
      coreConcept: "দেহকোষের সংখ্যাবৃদ্ধি ও ক্ষত নিরাময় মাইটোসিসের কাজ; মিয়োসিসের কাজ জননকোষ তৈরি ও প্রজাতির ক্রোমোজোম সংখ্যা বজায় রাখা।",
      distractorAnalysis: {
        opt_bio_3_75_a: "ক্রোমোজোম অর্ধেক হওয়া মিয়োসিসের সত্য তথ্য।",
        opt_bio_3_75_b: "৪টি হ্যাপ্লয়েড কোষ তৈরি হওয়া মিয়োসিসের সত্য তথ্য।",
        opt_bio_3_75_d: "জিনের পুনর্বিন্যাস মিয়োসিসের সত্য তথ্য।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 59
      },
      proTipShortcut: "দেহকোষ বৃদ্ধি = মাইটোসিস (মিয়োসিস নয়)!"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_76",
    topicId: "top_ssc_biology_ch3_5",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান সাময়িকীতে প্রকাশিত একটি প্রবন্ধে জাবিন পড়ল: আফ্রিকা মহাদেশের একদল বিজ্ঞানী গবেষণা করে দেখেছেন আদিম ব্যাঙ Xenopus tropicalis-এর দেহকোষে নির্দিষ্ট ক্রোমোজোম থাকলেও তাদের থেকেই ক্রোমোজোম সেট দ্বিগুণ হয়ে আকারে বড় নতুন প্রজাতি Xenopus laevis-এর উদ্ভব ঘটেছে। আবার যৌন প্রজননকারী সকল জীবে মিয়োসিস বিভাজনের ফলেই সন্তান-সন্ততির মধ্যে নতুন বৈশিষ্ট্যের বৈচিত্র্য পরিলক্ষিত হয়।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে ক্রোমোজোম সেট দ্বিগুণ হয়ে নতুন প্রজাতির উদ্ভব (Xenopus) এবং মিয়োসিসের জিনগত বৈচিত্র্যের গুরুত্ব আলোচনা করা হয়েছে।",
      coreConcept: "পলিপ্লয়েডি দ্বারা প্রজাতি সৃষ্টি এবং মিয়োসিস দ্বারা জেনেটিক রিকম্বিনেশন ও অভিযোজন ক্ষমতা বৃদ্ধি।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 61
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জিনগত বৈচিত্র্য (Genetic Diversity) কাকে বলে তা লেখা।" },
      kha: { mark: 2, criteria: "মিয়োসিসকে কেন হ্রাসমূলক বিভাজন বলা হয় তা সংক্ষেপে ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের Xenopus ব্যাঙের প্রজাতির বিবর্তন প্রক্রিয়াটি পাঠ্যবইয়ের আলোকে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "“প্রতিকূল পরিবর্তিত পরিবেশে জীব প্রজাতির টিকে থাকার চাবিকাঠি হলো মিয়োসিস”—উক্তিটি উদ্দীপকের আলোকে মূল্যায়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_77",
    topicId: "top_ssc_biology_ch3_5",
    type: "CQ_CREATIVE",
    stem: "বংশগতিবিদ ড. হাসান একটি সপুষ্পক উদ্ভিদের পরাগরেণু উৎপাদনকারী কোষ এবং মূলের অগ্রভাগের কোষ নিয়ে গবেষণা করছিলেন। তিনি দেখলেন প্রথম ধরনের কোষে ক্রোমোজোম সংখ্যা ২৩ হলেও দ্বিতীয় ধরনের কোষে ক্রোমোজোম সংখ্যা ৪৬।",
    options: null,
    explanation: {
      directAnswer: "পরাগরেণু উৎপাদনকারী কোষে মিয়োসিসের কারণে n=২৩ এবং মূলের কোষে মাইটোসিসের কারণে 2n=৪৬।",
      coreConcept: "হ্যাপ্লয়েড গ্যামেট ও ডিপ্লয়েড দেহকোষের বিভাজন পার্থক্য এবং ক্রোমোজোম সমতা রক্ষা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 60
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ডিপ্লয়েড কোষের সংজ্ঞা লেখা।" },
      kha: { mark: 2, criteria: "মিয়োসিস-২ কে কেন মাইটোসিসের অনুরূপ বলা হয়—ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "ড. হাসানের পর্যবেক্ষিত দুটি ভিন্ন কোষে ক্রোমোজোম সংখ্যার তারতম্যের কারণ সচিত্র ছকে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "উদ্ভিদটির বংশবৃদ্ধি ও প্রজাতির ক্রোমোজোম সমতা রক্ষায় উক্ত দুই বিভাজনের সমন্বিত ভূমিকা বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Textbook Exercise Questions (পৃষ্ঠা ৬২–৬৩) [top_ssc_biology_ch3_2 / ch3_5]
  // =========================================================================
  {
    id: "q_bio_3_78",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "পাঠ্যবই পৃষ্ঠা ৬২ (নমুনা প্রশ্ন ১): মাইটোসিস কোষ বিভাজনের কোন ধাপে নিউক্লিয়াস আকারে বড় হয়?",
    options: [
      { id: "opt_bio_3_78_a", text: "প্রোফেজ", isCorrect: true },
      { id: "opt_bio_3_78_b", text: "মেটাফেজ", isCorrect: false },
      { id: "opt_bio_3_78_c", text: "অ্যানাফেজ", isCorrect: false },
      { id: "opt_bio_3_78_d", text: "টেলোফেজ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রোফেজ।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ৫৩ ও ৬২ অনুসারে: প্রোফেজ হলো মাইটোসিসের প্রথম পর্যায়, এ পর্যায়ে কোষের নিউক্লিয়াস আকারে বড় হয়।",
      distractorAnalysis: {
        opt_bio_3_78_b: "মেটাফেজে নিউক্লিয়াস সম্পূর্ণ বিলুপ্ত থাকে।",
        opt_bio_3_78_c: "অ্যানাফেজে কোনো সুনির্দিষ্ট নিউক্লিয়াস থাকে না।",
        opt_bio_3_78_d: "টেলোফেজে দুটি ছোট অপত্য নিউক্লিয়াস নতুন তৈরি হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 62
      },
      proTipShortcut: "প্রোফেজ = নিউক্লিয়াস আকারে সবচেয়ে বড় হয়!"
    },
    difficulty: "EASY",
    boardSource: "পাঠ্যবই নমুনা প্রশ্ন ১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_79",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "পাঠ্যবই পৃষ্ঠা ৬২ (নমুনা প্রশ্ন ২): মিয়োসিস কোষ বিভাজনে—\ni. ক্রোমোজোম সংখ্যার পরিবর্তন ঘটে\nii. হ্যাপ্লয়েড সংখ্যক গ্যামেট তৈরি হয়\niii. জীবের দৈহিক বৃদ্ধি ঘটে\nনিচের কোনটি সঠিক?",
    options: [
      { id: "opt_bio_3_79_a", text: "i ও ii", isCorrect: true },
      { id: "opt_bio_3_79_b", text: "i ও iii", isCorrect: false },
      { id: "opt_bio_3_79_c", text: "ii ও iii", isCorrect: false },
      { id: "opt_bio_3_79_d", text: "i, ii ও iii", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: i ও ii।",
      coreConcept: "মিয়োসিসে ক্রোমোজোম হ্রাস পেয়ে অর্ধেক হয় এবং হ্যাপ্লয়েড গ্যামেট তৈরি হয়। কিন্তু জীবের দৈহিক বৃদ্ধি ঘটে মাইটোসিসের মাধ্যমে (iii ভুল)।",
      distractorAnalysis: {
        opt_bio_3_79_b: "iii ভুল কারণ দৈহিক বৃদ্ধি মাইটোসিসের কাজ।",
        opt_bio_3_79_c: "iii ভুল থাকায় এটি গ্রহণযোগ্য নয়।",
        opt_bio_3_79_d: "iii ভুল থাকায় সবকটি সঠিক নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 62
      },
      proTipShortcut: "দৈহিক বৃদ্ধি = মাইটোসিস; গ্যামেট = মিয়োসিস।"
    },
    difficulty: "MEDIUM",
    boardSource: "পাঠ্যবই নমুনা প্রশ্ন ২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_80",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "পাঠ্যবই পৃষ্ঠা ৬২ (নমুনা প্রশ্ন ৩): চিত্র-A তে ১টি মাতৃকোষ থেকে ২টি অপত্য কোষ তৈরি দেখানো হয়েছে। A চিত্রের কোষ বিভাজনে—\ni. মাতৃকোষ ও নতুন সৃষ্ট কোষ সমগুণ সম্পন্ন থাকে\nii. নতুন কোষে ক্রোমোজোম সংখ্যা মাতৃকোষের অর্ধেক থাকে\niii. ক্রোমোজোম মাত্র একবার বিভাজিত হয়\nনিচের কোনটি সঠিক?",
    options: [
      { id: "opt_bio_3_80_a", text: "i ও ii", isCorrect: false },
      { id: "opt_bio_3_80_b", text: "i ও iii", isCorrect: true },
      { id: "opt_bio_3_80_c", text: "ii ও iii", isCorrect: false },
      { id: "opt_bio_3_80_d", text: "i, ii ও iii", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: i ও iii।",
      coreConcept: "চিত্র A নির্দেশ করে মাইটোসিস কোষ বিভাজন। মাইটোসিসে মাতৃকোষ ও অপত্য কোষ সমগুণসম্পন্ন থাকে এবং ক্রোমোজোম একবার বিভাজিত হয়। ক্রোমোজোম অর্ধেক থাকে না (ii ভুল)।",
      distractorAnalysis: {
        opt_bio_3_80_a: "ii ভুল কারণ ক্রোমোজোম মাইটোসিসে অর্ধেক হয় না।",
        opt_bio_3_80_c: "ii ভুল।",
        opt_bio_3_80_d: "ii ভুল থাকায় i, ii ও iii সঠিক নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২ ও নমুনা প্রশ্ন",
        pageNumber: 62
      },
      proTipShortcut: "চিত্র A = মাইটোসিস = ১টি থেকে ২টি সমগুণ কোষ!"
    },
    difficulty: "MEDIUM",
    boardSource: "পাঠ্যবই নমুনা প্রশ্ন ৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_81",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "পাঠ্যবই পৃষ্ঠা ৬৩ (নমুনা প্রশ্ন ৪): B চিত্রের বিভাজন (১টি কোষ থেকে ৪টি অপত্য কোষ সৃষ্টি) A চিত্রের বিভাজন (মাইটোসিস) থেকে ব্যতিক্রম, কারণ—",
    options: [
      { id: "opt_bio_3_81_a", text: "B তে নিউক্লিয়াসের বিভাজন একবার হলেও A তে দুইবার ঘটে", isCorrect: false },
      { id: "opt_bio_3_81_b", text: "B জীবের গুণগত স্থিতিশীলতা বজায় রাখলেও A বৈচিত্র্য সৃষ্টি করে", isCorrect: false },
      { id: "opt_bio_3_81_c", text: "B দেহকোষে সংঘটিত হলেও A জনন মাতৃকোষে সংঘটিত হয়", isCorrect: false },
      { id: "opt_bio_3_81_d", text: "B তে সৃষ্ট অপত্য কোষের ক্রোমোজোম সংখ্যা A এর অর্ধেক", isCorrect: true }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ঘ: B তে সৃষ্ট অপত্য কোষের ক্রোমোজোম সংখ্যা A এর অর্ধেক।",
      coreConcept: "B নির্দেশ করে মিয়োসিস বিভাজন যেখানে ৪টি হ্যাপ্লয়েড (n) কোষ উৎপন্ন হয়। ফলে B এর ক্রোমোজোম সংখ্যা মাইটোসিসে সৃষ্ট A এর (2n) অর্ধেক হয়।",
      distractorAnalysis: {
        opt_bio_3_81_a: "ভুল, B তে (মিয়োসিস) নিউক্লিয়াস দুবার বিভক্ত হয়।",
        opt_bio_3_81_b: "ভুল, B (মিয়োসিস) বৈচিত্র্য আনে এবং A স্থিতিশীলতা রক্ষা করে।",
        opt_bio_3_81_c: "ভুল, B জনন মাতৃকোষে ঘটে এবং A দেহকোষে ঘটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩ ও নমুনা প্রশ্ন",
        pageNumber: 63
      },
      proTipShortcut: "B (মিয়োসিস) এর ক্রোমোজোম = A (মাইটোসিস) এর ক্রোমোজোমের অর্ধেক!"
    },
    difficulty: "MEDIUM",
    boardSource: "পাঠ্যবই নমুনা প্রশ্ন ৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_82",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "মাইটোসিসের প্রোফেজে ক্রোমোজোমগুলো কুন্ডলিত অবস্থায় থাকার কারণে কোনটি ঘটে?",
    options: [
      { id: "opt_bio_3_82_a", text: "এদের সংখ্যা সুস্পষ্টভাবে গণনা করা যায় না", isCorrect: true },
      { id: "opt_bio_3_82_b", text: "এরা সাথে সাথে নষ্ট হয়ে যায়", isCorrect: false },
      { id: "opt_bio_3_82_c", text: "এরা কোষ থেকে বের হয়ে যায়", isCorrect: false },
      { id: "opt_bio_3_82_d", text: "এদের সেন্ট্রোমিয়ার অদৃশ্য হয়ে যায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: এদের সংখ্যা সুস্পষ্টভাবে গণনা করা যায় না।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ৫৩ অনুসারে: 'ক্রোমোজোমগুলো কুন্ডলিত অবস্থায় থাকায় এদের সংখ্যা গণনা করা যায় না।' মেটাফেজে এসে এদের সুস্পষ্ট গণনা সম্ভব হয়।",
      distractorAnalysis: {
        opt_bio_3_82_b: "ক্রোমোজোম নষ্ট হয় না।",
        opt_bio_3_82_c: "নিউক্লিয়াসের ভেতর আবদ্ধ থাকে।",
        opt_bio_3_82_d: "সেন্ট্রোমিয়ার অক্ষত থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 53
      },
      proTipShortcut: "কুন্ডলিত থাকে বলে প্রোফেজে ক্রোমোজোম গোনা অসম্ভব!"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_83",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "টেলোফেজ দশার ক্ষেত্রে কোনটি ঘটে না?",
    options: [
      { id: "opt_bio_3_83_a", text: "নিউক্লিওলাসের পুনর্গঠন ঘটে", isCorrect: false },
      { id: "opt_bio_3_83_b", text: "নিউক্লিয়ার মেমব্রেন পুনরায় গঠিত হয়", isCorrect: false },
      { id: "opt_bio_3_83_c", text: "স্পিন্ডল তন্তু আরও দৃঢ় ও স্থায়ী হয়", isCorrect: true },
      { id: "opt_bio_3_83_d", text: "ক্রোমোজোমগুলো লম্বা ও সরু হতে থাকে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: স্পিন্ডল তন্তু আরও দৃঢ় ও স্থায়ী হয়।",
      coreConcept: "টেলোফেজ পর্যায়ে স্পিন্ডল যন্ত্রের কাঠামো ধীরে ধীরে ভেঙে পড়ে এবং এর তন্তুগুলো ক্রমান্বয়ে অদৃশ্য হয়ে যায় (পৃষ্ঠা ৫৬)।",
      distractorAnalysis: {
        opt_bio_3_83_a: "নিউক্লিওলাসের পুনর্গঠন সত্য ঘটনা।",
        opt_bio_3_83_b: "নিউক্লিয়ার মেমব্রেন সৃষ্টি সত্য ঘটনা।",
        opt_bio_3_83_d: "ক্রোমোজোম লম্বা ও সরু হওয়া সত্য ঘটনা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 56
      },
      proTipShortcut: "টেলোফেজে স্পিন্ডল যন্ত্র ভেঙে গুঁড়িয়ে বিলুপ্ত হয়ে যায়।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_84",
    topicId: "top_ssc_biology_ch3_5",
    type: "CQ_CREATIVE",
    stem: "একটি স্বনামধন্য কৃষি গবেষণা কেন্দ্রে বিজ্ঞানীরা উন্নত জাতের আলু ও গম উদ্ভাবন করতে গিয়ে কৃত্রিমভাবে এদের ক্রোমোজোম সেট দ্বিগুণ করলেন। এর ফলে দেখা গেল উদ্ভাবিত আলুর কন্দ ও গমের শীষ সাধারণ জাতের চেয়ে প্রায় দ্বিগুণ পুষ্ট ও বড় হয়েছে। কৃষিবিদরা জানালেন, “প্রকৃতিতে জেনোপাস ব্যাঙের মধ্যেও এরূপ ক্রোমোজোম সেট বৃদ্ধির মাধ্যমে নতুন প্রজাতির আবির্ভাব ঘটেছে।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে পলিপ্লয়েডি প্রক্রিয়ার মাধ্যমে ক্রোমোজোম সেট দ্বিগুণ করে শস্যের আকার বৃদ্ধি এবং জেনোপাস ব্যাঙের বিবর্তনের সম্পর্ক দেখানো হয়েছে।",
      coreConcept: "ক্রোমোজোম সংখ্যা দ্বিগুণ হয়ে নতুন প্রজাতির উদ্ভব এবং খাদ্য উৎপাদনে এর প্রয়োগ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 61
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "মিয়োসিস কোষ বিভাজন কোথায় ঘটে তা সুনির্দিষ্টভাবে লেখা।" },
      kha: { mark: 2, criteria: "জননকোষ কেন সর্বদা হ্যাপ্লয়েড প্রকৃতির হয় তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে বর্ণিত কৃষিশস্যে ক্রোমোজোম সেট বৃদ্ধির উপযোগিতা পাঠ্যবইয়ের তথ্যানুযায়ী ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "“প্রকৃতিতে ক্রোমোজোম সেটের দ্বিগুণ রূপান্তর নতুন প্রজাতির উদ্ভব ও জীববৈচিত্র্য সুরক্ষায় অনুঘটক”—জেনোপাস ব্যাঙের আলোকে বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_CQ_05",
    topicId: "top_ssc_biology_ch3_5",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান গবেষক ড. জামিল দুটি ভিন্ন জাতের আলু নিয়ে পরীক্ষা করলেন। প্রথম জাতটির দেহকোষে সাধারণ সংখ্যক ক্রোমোজোম বিদ্যমান, যার কন্দ আকারে মাঝারি। দ্বিতীয় জাতটিতে ক্রোমোজোম সেট সম্পূর্ণ দ্বিগুণ হয়ে নতুন পলিপ্লয়েড জাত সৃষ্টি হয়েছে, যার কন্দ আকারে প্রায় দ্বিগুণ এবং উৎপাদন ক্ষমতা অনেক বেশি। তিনি জানালেন, “প্রাণীজগতের ব্যাঙের প্রজাতিতেও এইরূপ ক্রোমোজোম সেট দ্বিগুণ হওয়ার প্রাকৃতিক প্রমাণ রয়েছে।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে পলিপ্লয়েডি দ্বারা আলুর ফলন বৃদ্ধি এবং জেনোপাস ব্যাঙের (Xenopus tropicalis থেকে Xenopus laevis) বিবর্তন আলোচনা করা হয়েছে।",
      coreConcept: "ক্রোমোজোম সেট দ্বিগুণ হওয়া (পলিপ্লয়েডি), খাদ্য চাহিদা পূরণে এর উপযোগিতা এবং প্রজাতি সৃষ্টির মেকানিজম।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 61
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "পলিপ্লয়েডি কাকে বলে তা সংজ্ঞা আকারে লেখা।" },
      kha: { mark: 2, criteria: "উন্নত জাতের আলুতে ক্রোমোজোম সেট বৃদ্ধি কৃষিতে কেন সুবিধাজনক তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের আলোকে জেনোপাস ব্যাঙের প্রজাতি সৃষ্টির উদাহরণটি পাঠ্যবইয়ের তথ্যানুযায়ী ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "“ক্রোমোজোম সেটের রূপান্তর নতুন প্রজাতি সৃষ্টি ও জীববৈচিত্র্য সুরক্ষায় অনন্য নিয়ামক”—বিশ্লেষণমূলক মূল্যায়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_CQ_06",
    topicId: "top_ssc_biology_ch3_5",
    type: "CQ_CREATIVE",
    stem: "যৌন প্রজননকারী জীবের ক্ষেত্রে দেখা যায় পিতা ও মাতা উভয়ের দেহকোষে ৪৬টি করে ক্রোমোজোম রয়েছে। কিন্তু তাদের মিলনে সৃষ্ট সন্তানের দেহকোষেও অবিকল ৪৬টি ক্রোমোজোমই পাওয়া যায়। অন্যদিকে একই পিতা-মাতার তিন সন্তানের মুখের গড়ন ও চুল ভিন্ন রূপ ধারণ করেছে।",
    options: null,
    explanation: {
      directAnswer: "মিয়োসিস বিভাজনের ফলে গ্যামেটে ক্রোমোজোম সংখ্যা হ্রাস পেয়ে ২৩ হওয়া এবং ক্রসিং ওভারের ফলে জিনের পুনর্বিন্যাসে বৈচিত্র্য সৃষ্টি নির্দেশ করা হয়েছে।",
      coreConcept: "মিয়োসিসের মাধ্যমে প্রজাতির ক্রোমোজোম সংখ্যা ধ্রুব রাখা এবং জেনেটিক বৈচিত্র্য নিশ্চিতকরণ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 60
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জিনগত বৈচিত্র্য (Genetic Diversity) কাকে বলে তা লেখা।" },
      kha: { mark: 2, criteria: "জনন মাতৃকোষে কেন মাইটোসিসের বদলে মিয়োসিস ঘটে তা বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে পিতা-মাতার সমান ক্রোমোজোম কীভাবে সন্তানে সংরক্ষিত হলো তা গাণিতিক সমীকরণসহ উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "“একই পিতা-মাতার সন্তানদের মধ্যে ভিন্নতার মূল কারণ হলো মিয়োসিস”—উক্তিটির যথার্থতা মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
