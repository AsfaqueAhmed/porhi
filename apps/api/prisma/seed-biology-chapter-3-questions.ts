import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter3QuestionsBatch1: QuestionData[] = [
  // =========================================================================
  // Topic 3.1: কোষ বিভাজনের ধারণা ও প্রত্যক্ষ বিভাজন [top_ssc_biology_ch3_1]
  // =========================================================================
  {
    id: "q_bio_3_01",
    topicId: "top_ssc_biology_ch3_1",
    type: "MCQ",
    stem: "বহুকোষী প্রতিটি জটিল জীবের জীবন কোন একক কোষটি থেকে সূচিত হয়?",
    options: [
      { id: "opt_bio_3_01_a", text: "শুক্রাণু (Sperm)", isCorrect: false },
      { id: "opt_bio_3_01_b", text: "ডিম্বাণু (Ovum)", isCorrect: false },
      { id: "opt_bio_3_01_c", text: "জাইগোট (Zygote)", isCorrect: true },
      { id: "opt_bio_3_01_d", text: "ভ্রূণমূল (Radicle)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: জাইগোট (Zygote)।",
      coreConcept: "স্ত্রী ও পুং জননকোষের মিলনে সৃষ্ট নিষিক্ত ডিম্বাণু বা জাইগোটই হলো প্রতিটি বহুকোষী জীবের জীবনের প্রথম একক কোষ।",
      distractorAnalysis: {
        opt_bio_3_01_a: "শুক্রাণু হলো পিতা থেকে আগত হ্যাপ্লয়েড জননকোষ, যা এককভাবে সম্পূর্ণ জীবের সূচনা করতে পারে না।",
        opt_bio_3_01_b: "ডিম্বাণু হলো মাতা থেকে আগত হ্যাপ্লয়েড জননকোষ, যা নিষেকের পূর্বে অসম্পূর্ণ।",
        opt_bio_3_01_d: "ভ্রূণমূল হলো জাইগোট বহুবার মাইটোসিসে বিভাজিত হওয়ার পরের একটি বিকাশশীল স্তর।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.১",
        pageNumber: 52
      },
      proTipShortcut: "মনে রাখো: ১টি জাইগোট → বারবার মাইটোসিস → ৩০ ট্রিলিয়ন কোষবিশিষ্ট পূর্ণাঙ্গ মানবদেহ!"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_02",
    topicId: "top_ssc_biology_ch3_1",
    type: "MCQ",
    stem: "কোন প্রক্রিয়াটিকে প্রত্যক্ষ কোষ বিভাজন (Direct Cell Division) বলা হয়?",
    options: [
      { id: "opt_bio_3_02_a", text: "অ্যামাইটোসিস (Amitosis)", isCorrect: true },
      { id: "opt_bio_3_02_b", text: "মাইটোসিস (Mitosis)", isCorrect: false },
      { id: "opt_bio_3_02_c", text: "মিয়োসিস (Meiosis)", isCorrect: false },
      { id: "opt_bio_3_02_d", text: "সাইটোকাইনেসিস (Cytokinesis)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ্যামাইটোসিস (Amitosis)।",
      coreConcept: "যে বিভাজনে কোনো জটিল পর্যায় বা স্পিন্ডল তন্তুর আবির্ভাব ছাড়াই নিউক্লিয়াস সরাসরি ডাম্বেল আকার ধারণ করে মাঝখানে খাঁজ সৃষ্টির মাধ্যমে বিভক্ত হয়, তাকে প্রত্যক্ষ বিভাজন বা অ্যামাইটোসিস বলে।",
      distractorAnalysis: {
        opt_bio_3_02_b: "মাইটোসিস হলো ৫টি ধারাবাহিক পর্যায়বিশিষ্ট সমীকরণিক পরোক্ষ বিভাজন।",
        opt_bio_3_02_c: "মিয়োসিস হলো দুই পর্যায়ের জটিল হ্রাসমূলক বিভাজন।",
        opt_bio_3_02_d: "সাইটোকাইনেসিস হলো সাইটোপ্লাজমের বিভাজন প্রক্রিয়া, স্বতন্ত্র প্রত্যক্ষ বিভাজন নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.১",
        pageNumber: 52
      },
      proTipShortcut: "প্রত্যক্ষ = সরাসরি ডাম্বেল আকৃতি হয়ে নিউক্লিয়াস দ্বিখণ্ডিত হওয়া (অ্যামাইটোসিস)।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_03",
    topicId: "top_ssc_biology_ch3_1",
    type: "MCQ",
    stem: "নিচের কোন জীবটিতে দ্বি-ভাজন বা অ্যামাইটোসিস পদ্ধতিতে বংশবৃদ্ধি ঘটে?",
    options: [
      { id: "opt_bio_3_03_a", text: "আম গাছ", isCorrect: false },
      { id: "opt_bio_3_03_b", text: "মানুষ", isCorrect: false },
      { id: "opt_bio_3_03_c", text: "ব্যাকটেরিয়া", isCorrect: true },
      { id: "opt_bio_3_03_d", text: "ফার্ন উদ্ভিদ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ব্যাকটেরিয়া।",
      coreConcept: "এককোষী আদিকোষী জীব যেমন ব্যাকটেরিয়া, নীলাভ-সবুজ শৈবাল এবং ঈস্টে প্রত্যক্ষ বিভাজন বা দ্বি-ভাজন ঘটে।",
      distractorAnalysis: {
        opt_bio_3_03_a: "আম গাছ একটি উন্নত বহুকোষী সপুষ্পক উদ্ভিদ, যাতে মাইটোসিস ও মিয়োসিস ঘটে।",
        opt_bio_3_03_b: "মানুষ বহুকোষী উন্নত প্রাণী, যাতে দেহকোষে মাইটোসিস ও জননকোষে মিয়োসিস ঘটে।",
        opt_bio_3_03_d: "ফার্ন টেরিডোফাইটা জাতীয় উন্নত উদ্ভিদ, যাতে জটিল কোষ বিভাজন ঘটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.১",
        pageNumber: 52
      },
      proTipShortcut: "ব্যাকটেরিয়া ও প্রোক্যারিওট = দ্বি-ভাজন বা অ্যামাইটোসিস।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_04",
    topicId: "top_ssc_biology_ch3_1",
    type: "MCQ",
    stem: "একটি পূর্ণাঙ্গ মানবদেহে আনুমানিক মোট কতটি কোষ থাকে বলে পাঠ্যবইয়ে উল্লেখ আছে?",
    options: [
      { id: "opt_bio_3_04_a", text: "৩০ লক্ষ", isCorrect: false },
      { id: "opt_bio_3_04_b", text: "৩০ কোটি", isCorrect: false },
      { id: "opt_bio_3_04_c", text: "৩০ বিলিয়ন", isCorrect: false },
      { id: "opt_bio_3_04_d", text: "৩০ ট্রিলিয়ন", isCorrect: true }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ঘ: ৩০ ট্রিলিয়ন।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ৫৮ অনুসারে একজন পূর্ণাঙ্গ মানুষের দেহে আনুমানিক ৩০ ট্রিলিয়ন (30 Trillion বা 3 x 10^13) কোষ থাকে।",
      distractorAnalysis: {
        opt_bio_3_04_a: "৩০ লক্ষ কোষ একটি অতি ক্ষুদ্র কলার সমপরিমাণ।",
        opt_bio_3_04_b: "৩০ কোটি অত্যন্ত নগণ্য সংখ্যা, যা কেবল রক্তের একটি ক্ষুদ্র অংশে বিদ্যমান।",
        opt_bio_3_04_c: "৩০ বিলিয়ন হলো মানব মস্তিষ্কের নিউরনের কাছাকাছি সংখ্যা, কিন্তু সমগ্র দেহের নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "মানবদেহ = ৩০ ট্রিলিয়ন কোষ (Trillion = ১০^১২)!"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_05",
    topicId: "top_ssc_biology_ch3_1",
    type: "MCQ",
    stem: "যদি একটি কোষ প্রতিদিন একবার করে বিভাজিত হয়, তবে জ্যামিতিক হারে বৃদ্ধি পেলে প্রায় কত দিনে মানবদেহের সমপরিমাণ কোষ সৃষ্টি সম্ভব?",
    options: [
      { id: "opt_bio_3_05_a", text: "১০–১৫ দিন", isCorrect: false },
      { id: "opt_bio_3_05_b", text: "৪০–৫০ দিন", isCorrect: true },
      { id: "opt_bio_3_05_c", text: "১০০–১২০ দিন", isCorrect: false },
      { id: "opt_bio_3_05_d", text: "৩৬৫ দিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ৪০–৫০ দিন।",
      coreConcept: "১ থেকে ২, ২ থেকে ৪, ৪ থেকে ৮... এভাবে জ্যামিতিক গুণিতকে বৃদ্ধি পেলে (2^45 ≈ 3.5 x 10^13) মাত্র ৪০-৫০ দিনে ৩০ ট্রিলিয়ন কোষ তৈরি হওয়া সম্ভব (পৃষ্ঠা ৫৮)।",
      distractorAnalysis: {
        opt_bio_3_05_a: "১০-১৫ দিনে মাত্র কয়েক হাজার থেকে কয়েক লক্ষ কোষ তৈরি হতে পারে।",
        opt_bio_3_05_c: "১০০-১২০ দিন অনেক দীর্ঘ সময়, জ্যামিতিক হারে তা অভাবনীয় সংখ্যায় পৌঁছাবে।",
        opt_bio_3_05_d: "৩৬৫ দিন এক বছর, পাঠ্যবইয়ের বৈজ্ঞানিক হিসাব অনুযায়ী ৪০-৫০ দিন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "জ্যামিতিক বৃদ্ধির বিস্ময়: ২^৪৫ ঘাতেই ট্রিলিয়নের ঘরে পৌঁছে যায়!"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_06",
    topicId: "top_ssc_biology_ch3_1",
    type: "MCQ",
    stem: "এককোষী জীবের ক্ষেত্রে কোষ বিভাজনের মূল তাৎপর্য কোনটি?",
    options: [
      { id: "opt_bio_3_06_a", text: "কেবল ক্ষতস্থান পূরণ", isCorrect: false },
      { id: "opt_bio_3_06_b", text: "বংশবৃদ্ধি ও সংখ্যাবৃদ্ধি", isCorrect: true },
      { id: "opt_bio_3_06_c", text: "জটিল অঙ্গ তৈরি করা", isCorrect: false },
      { id: "opt_bio_3_06_d", text: "রক্তকণিকা উৎপাদন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বংশবৃদ্ধি ও সংখ্যাবৃদ্ধি।",
      coreConcept: "এককোষী জীবের কোনো জটিল কলা বা অঙ্গ থাকে না; তাই কোষ বিভাজনের মাধ্যমে সরাসরি একটি জীব থেকে নতুন দুটি অপত্য জীব সৃষ্টির মাধ্যমে প্রজনন ঘটে।",
      distractorAnalysis: {
        opt_bio_3_06_a: "এককোষী জীবে ক্ষতপূরণ বলে কিছু নেই, কোষ বিনষ্ট হলে জীবটিই মারা যায়।",
        opt_bio_3_06_c: "এককোষী জীবের কোনো কলা বা অঙ্গ গঠিত হয় না।",
        opt_bio_3_06_d: "রক্তকণিকা কেবল জটিল মেরুদণ্ডী প্রাণিদেহে বিদ্যমান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.১",
        pageNumber: 50
      },
      proTipShortcut: "এককোষীতে কোষ বিভাজন = সরাসরি বংশবৃদ্ধি!"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_07",
    topicId: "top_ssc_biology_ch3_1",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান শিক্ষক ক্লাসে বললেন, “একটি বিশাল বটগাছ কিংবা মানুষের মতো জটিল বহুকোষী জীবের জীবনের প্রথম সূচনা ঘটে মাত্র একটি কোষ থেকে। আবার এককোষী ব্যাকটেরিয়া কোনো স্পিন্ডল যন্ত্র ছাড়াই সরাসরি দ্বিখণ্ডিত হয়ে বংশবৃদ্ধি করে। কিন্তু বহুকোষী জীবে দেহগঠন ও জননকোষ সৃষ্টির পদ্ধতি সম্পূর্ণ স্বতন্ত্র।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে এককোষী জীবের অ্যামাইটোসিস এবং বহুকোষী জীবের সূচনা কোষ (জাইগোট) ও মাইটোসিস/মিয়োসিসের তাৎপর্য বর্ণিত হয়েছে।",
      coreConcept: "এককোষী ও বহুকোষী জীবে কোষ বিভাজনের রূপভেদ এবং জাইগোট থেকে মাইটোসিস প্রক্রিয়ায় দেহের বৃদ্ধি।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.১",
        pageNumber: 50
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "প্রত্যক্ষ কোষ বিভাজন বা অ্যামাইটোসিস কাকে বলে তা নির্ভুলভাবে লেখা।" },
      kha: { mark: 2, criteria: "জাইগোটকে বহুকোষী জীবনের সূচনা কোষ বলা হয় কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "ব্যাকটেরিয়ার দ্বি-ভাজন ও বহুকোষী জীবের মাইটোসিস বিভাজনের মধ্যে ৩টি সুস্পষ্ট বৈসাদৃশ্য ছকে দেখানো।" },
      gha: { mark: 4, criteria: "“কোষ বিভাজন ছাড়া বহুকোষী জীবের অস্তিত্ব ও বংশরক্ষা অসম্ভব”—উদ্দীপকের আলোকে উক্তিটি বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 3.2: মাইটোসিস ও এর পর্যায়সমূহ [top_ssc_biology_ch3_2]
  // =========================================================================
  {
    id: "q_bio_3_08",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "মাইটোসিস কোষ বিভাজনকে সমীকরণিক বিভাজন (Equational Division) বলার কারণ কী?",
    options: [
      { id: "opt_bio_3_08_a", text: "অপত্য কোষে ক্রোমোজোম সংখ্যা অর্ধেক হয়ে যায়", isCorrect: false },
      { id: "opt_bio_3_08_b", text: "মাতৃকোষ ও অপত্য কোষের ক্রোমোজোম সংখ্যা ও গুণাগুণ হুবহু সমান থাকে", isCorrect: true },
      { id: "opt_bio_3_08_c", text: "নিউক্লিয়াস দুইবার বিভাজিত হয়", isCorrect: false },
      { id: "opt_bio_3_08_d", text: "কেবল জনন মাতৃকোষে ঘটে থাকে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মাতৃকোষ ও অপত্য কোষের ক্রোমোজোম সংখ্যা ও গুণাগুণ হুবহু সমান থাকে।",
      coreConcept: "মাইটোসিসে নিউক্লিয়াস ও ক্রোমোজোম উভয়ই একবার বিভাজিত হয়। ফলে অপত্য কোষে মাতৃকোষের সমান সংখ্যক ক্রোমোজোম ও সমগুণবিশিষ্ট DNA প্রতিরূপ পাওয়া যায়।",
      distractorAnalysis: {
        opt_bio_3_08_a: "ক্রোমোজোম অর্ধেক হওয়া মিয়োসিসের বৈশিষ্ট্য (হ্রাসমূলক বিভাজন)।",
        opt_bio_3_08_c: "নিউক্লিয়াস দুইবার বিভাজিত হওয়া মিয়োসিসের বৈশিষ্ট্য।",
        opt_bio_3_08_d: "মাইটোসিস দেহকোষে ও উদ্ভিদের ভাজক কলায় ঘটে, জননকোষ তৈরিতে নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 52
      },
      proTipShortcut: "সমীকরণিক = সমান সমীকরণ (মাতৃকোষ 2n = অপত্য কোষ 2n)!"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_09",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "কোষ বিভাজন শুরুর পূর্বে নিউক্লিয়াসে প্রয়োজনীয় প্রস্তুতিমূলক কাজ সম্পন্ন হওয়ার পর্যায়কে কী বলে?",
    options: [
      { id: "opt_bio_3_09_a", text: "প্রোফেজ", isCorrect: false },
      { id: "opt_bio_3_09_b", text: "ইন্টারফেজ", isCorrect: true },
      { id: "opt_bio_3_09_c", text: "মেটাকাইনেসিস", isCorrect: false },
      { id: "opt_bio_3_09_d", text: "ডায়াকাইনেসিস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ইন্টারফেজ।",
      coreConcept: "বিভাজন শুরু হওয়ার পূর্বে কোষের নিউক্লিয়াসে কিছু প্রস্তুতিমূলক কাজ সম্পন্ন হয়; এই দশাকে ইন্টারফেজ পর্যায় (Interphase) বলে (পৃষ্ঠা ৫২)।",
      distractorAnalysis: {
        opt_bio_3_09_a: "প্রোফেজ হলো ক্যারিওকাইনেসিসের প্রথম প্রত্যক্ষ বিভাজন পর্যায়।",
        opt_bio_3_09_c: "মেটাকাইনেসিস হলো মেটাফেজে ক্রোমোজোমের বিষুবীয় তলে সজ্জা।",
        opt_bio_3_09_d: "ডায়াকাইনেসিস হলো মিয়োসিস-১ এর প্রোফেজ-১ এর একটি উপপর্যায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 52
      },
      proTipShortcut: "Inter = মধ্যবর্তী প্রস্তুতি দশা (ইন্টারফেজ)!"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_10",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "বর্ণনার সুবিধার জন্য মাইটোসিসের নিউক্লিয়াসের বিভাজনকে (ক্যারিওকাইনেসিস) কয়টি পর্যায়ে ভাগ করা হয়েছে?",
    options: [
      { id: "opt_bio_3_10_a", text: "৩টি", isCorrect: false },
      { id: "opt_bio_3_10_b", text: "৪টি", isCorrect: false },
      { id: "opt_bio_3_10_c", text: "৫টি", isCorrect: true },
      { id: "opt_bio_3_10_d", text: "৬টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৫টি।",
      coreConcept: "মাইটোসিসের ৫টি পর্যায় হলো: প্রোফেজ, প্রো-মেটাফেজ, মেটাফেজ, অ্যানাফেজ এবং টেলোফেজ।",
      distractorAnalysis: {
        opt_bio_3_10_a: "৩টি হলো কোষ বিভাজনের সার্বিক প্রধান ধারা (অ্যামাইটোসিস, মাইটোসিস, মিয়োসিস)।",
        opt_bio_3_10_b: "৪টি নয়, পাঠ্যবইয়ে সুস্পষ্টভাবে ৫টি ধাপ উল্লেখ রয়েছে।",
        opt_bio_3_10_d: "৬টি ধাপ নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 52
      },
      proTipShortcut: "P-PM-M-A-T = প্রোফেজ, প্রো-মেটাফেজ, মেটাফেজ, অ্যানাফেজ, টেলোফেজ (৫টি ধাপ)।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_11",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "মাইটোসিসের কোন পর্যায়ে সেন্ট্রোমিয়ার ব্যতীত ক্রোমোজোম লম্বালম্বি বিভক্ত হয়ে দুটি ক্রোমাটিড গঠন করে?",
    options: [
      { id: "opt_bio_3_11_a", text: "প্রোফেজ", isCorrect: true },
      { id: "opt_bio_3_11_b", text: "মেটাফেজ", isCorrect: false },
      { id: "opt_bio_3_11_c", text: "অ্যানাফেজ", isCorrect: false },
      { id: "opt_bio_3_11_d", text: "টেলোফেজ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রোফেজ।",
      coreConcept: "প্রোফেজ পর্যায়ে প্রতিটি ক্রোমোজোম সেন্ট্রোমিয়ার ব্যতীত লম্বালম্বি দুভাগে বিভক্ত হয়ে দুটি ক্রোমাটিড (Chromatid) উৎপন্ন করে (পৃষ্ঠা ৫৩)।",
      distractorAnalysis: {
        opt_bio_3_11_b: "মেটাফেজে ক্রোমোজোম বিষুবীয় অঞ্চলে আসে এবং সেন্ট্রোমিয়ার বিভাজিত হতে শুরু করে।",
        opt_bio_3_11_c: "অ্যানাফেজে সেন্ট্রোমিয়ার সম্পূর্ণ বিভক্ত হয়ে অপত্য ক্রোমোজোম গঠিত হয়।",
        opt_bio_3_11_d: "টেলোফেজে ক্রোমোজোমের প্যাঁচ খুলে সরু জালিকায় রূপ নেয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 53
      },
      proTipShortcut: "প্রোফেজেই প্রথম দুটি স্পষ্ট ক্রোমাটিড দেখা যায়।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_12",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "স্পিন্ডল যন্ত্রের দুই মেরুর মধ্যবর্তী অঞ্চলকে কী বলা হয়?",
    options: [
      { id: "opt_bio_3_12_a", text: "মেরু অঞ্চল", isCorrect: false },
      { id: "opt_bio_3_12_b", text: "ইকুয়েটর বা বিষুবীয় অঞ্চল", isCorrect: true },
      { id: "opt_bio_3_12_c", text: "সেন্ট্রোমিয়ার", isCorrect: false },
      { id: "opt_bio_3_12_d", text: "ক্রোমোনিমা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ইকুয়েটর বা বিষুবীয় অঞ্চল।",
      coreConcept: "স্পিন্ডল যন্ত্রের দুই মেরুর ঠিক মাঝামাঝি স্থানটিকে ইকুয়েটর (Equator) বা বিষুবীয় অঞ্চল বলা হয় (পৃষ্ঠা ৫৩)।",
      distractorAnalysis: {
        opt_bio_3_12_a: "মেরু অঞ্চল হলো স্পিন্ডল যন্ত্রের দুই প্রান্তবিন্দু।",
        opt_bio_3_12_c: "সেন্ট্রোমিয়ার হলো ক্রোমোজোমের মুখ্য কুঞ্চন অঞ্চল।",
        opt_bio_3_12_d: "ক্রোমোনিমা হলো ক্রোমোজোমের অভ্যন্তরীণ সূক্ষ্ম সূত্র।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 53
      },
      proTipShortcut: "ভূগোলের মতো কোষের কেন্দ্ররেখাও বিষুবরেখা বা ইকুয়েটর!"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_13",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "স্পিন্ডল যন্ত্রের যেসব তন্তুর সাথে ক্রোমোজোমের সেন্ট্রোমিয়ার যুক্ত থাকে তাদের কী বলে?",
    options: [
      { id: "opt_bio_3_13_a", text: "স্পিন্ডল তন্তু", isCorrect: false },
      { id: "opt_bio_3_13_b", text: "আকর্ষণ তন্তু (Traction fibre)", isCorrect: true },
      { id: "opt_bio_3_13_c", text: "অ্যাস্টার তন্তু", isCorrect: false },
      { id: "opt_bio_3_13_d", text: "কোলাজেন তন্তু", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: আকর্ষণ তন্তু (Traction fibre)।",
      coreConcept: "ক্রোমোজোমের সেন্ট্রোমিয়ার স্পিন্ডল যন্ত্রের কিছু নির্দিষ্ট তন্তুর সাথে যুক্ত হয়। এই তন্তুগুলোকে আকর্ষণ তন্তু বা ক্রোমোজোমাল তন্তু বলে (পৃষ্ঠা ৫৪)।",
      distractorAnalysis: {
        opt_bio_3_13_a: "স্পিন্ডল তন্তু হলো মেরু থেকে মেরু পর্যন্ত বিস্তৃত সাধারণ তন্তু।",
        opt_bio_3_13_c: "অ্যাস্টার রশ্মি সেন্ট্রিওলের চারদিক থেকে বিচ্ছুরিত হয়।",
        opt_bio_3_13_d: "কোলাজেন হলো প্রাণিদেহের যোজক কলার প্রোটিন তন্তু।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 54
      },
      proTipShortcut: "ক্রোমোজোমকে টানে বা আকর্ষণ করে = আকর্ষণ তন্তু (Traction fibre)!"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_14",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "প্রো-মেটাফেজ পর্যায়ে প্রাণিকোষের কোন অঙ্গাণু থেকে অ্যাস্টার রশ্মি (Aster rays) বিচ্ছুরিত হয়?",
    options: [
      { id: "opt_bio_3_14_a", text: "মাইটোকন্ড্রিয়া", isCorrect: false },
      { id: "opt_bio_3_14_b", text: "সেন্ট্রিওল (Centriole)", isCorrect: true },
      { id: "opt_bio_3_14_c", text: "লাইসোজোম", isCorrect: false },
      { id: "opt_bio_3_14_d", text: "গলজি বস্তু", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সেন্ট্রিওল (Centriole)।",
      coreConcept: "প্রাণিকোষে পূর্বে বিভক্ত সেন্ট্রিওল দুটি দুই মেরুতে অবস্থান করে এবং সেন্ট্রিওল দুটির চারদিক থেকে আলোক রশ্মির মতো অ্যাস্টার-রে বিচ্ছুরিত হয় (পৃষ্ঠা ৫৪)।",
      distractorAnalysis: {
        opt_bio_3_14_a: "মাইটোকন্ড্রিয়া শক্তি উৎপাদনের কাজ করে, স্পিন্ডল গঠনে অংশ নেয় না।",
        opt_bio_3_14_c: "লাইসোজোম হাইড্রোলাইটিক এনজাইম ধারণ করে।",
        opt_bio_3_14_d: "গলজি বস্তু ক্ষরণকারী অঙ্গাণু।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 54
      },
      proTipShortcut: "প্রাণিকোষে সেন্ট্রিওল → তারার মতো অ্যাস্টার রশ্মি!"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_15",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "মাইটোসিসের কোন পর্যায়ে ক্রোমোজোমসমূহ সর্বাধিক মোটা ও খাটো (Maximum Condensation) দেখায়?",
    options: [
      { id: "opt_bio_3_15_a", text: "প্রোফেজ", isCorrect: false },
      { id: "opt_bio_3_15_b", text: "মেটাফেজ", isCorrect: true },
      { id: "opt_bio_3_15_c", text: "অ্যানাফেজ", isCorrect: false },
      { id: "opt_bio_3_15_d", text: "টেলোফেজ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মেটাফেজ।",
      coreConcept: "মেটাফেজ পর্যায়ে ক্রোমোজোমগুলো বিষুবীয় অঞ্চলে অবস্থান নেয় এবং সর্বাধিক মোটা ও খাটো হয় (পৃষ্ঠা ৫৪)।",
      distractorAnalysis: {
        opt_bio_3_15_a: "প্রোফেজে কেবল সংকুচিত হওয়া শুরু হয়।",
        opt_bio_3_15_c: "অ্যানাফেজে ক্রোমোজোম বিভক্ত হয়ে মেরুর দিকে ছুটতে থাকে।",
        opt_bio_3_15_d: "টেলোফেজে প্যাঁচ খুলে ক্রোমোজোম পুনরায় সরু ও দীর্ঘ হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 54
      },
      proTipShortcut: "M = Maximum Thick & Short = Metaphase!"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_16",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "মেটাফেজ পর্যায়ে ক্রোমোজোমের সেন্ট্রোমিয়ার এবং বাহুদ্বয় কীভাবে অবস্থান করে?",
    options: [
      { id: "opt_bio_3_16_a", text: "সেন্ট্রোমিয়ার মেরুর দিকে এবং বাহুদ্বয় বিষুবীয় অঞ্চলে", isCorrect: false },
      { id: "opt_bio_3_16_b", text: "সেন্ট্রোমিয়ার বিষুবীয় অঞ্চলে এবং বাহুদ্বয় মেরুমুখী", isCorrect: true },
      { id: "opt_bio_3_16_c", text: "উভয়ই মেরু অঞ্চলে সংলগ্ন থাকে", isCorrect: false },
      { id: "opt_bio_3_16_d", text: "সেন্ট্রোমিয়ার ও বাহু এলোমেলোভাবে সাইটোপ্লাজমে ভাসে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সেন্ট্রোমিয়ার বিষুবীয় অঞ্চলে এবং বাহুদ্বয় মেরুমুখী।",
      coreConcept: "মেটাফেজে প্রতিটি ক্রোমোজোমের সেন্ট্রোমিয়ার বিষুবীয় অঞ্চলে এবং বাহু দুটি দুই মেরুমুখী হয়ে অবস্থান নেয় (পৃষ্ঠা ৫৪)।",
      distractorAnalysis: {
        opt_bio_3_16_a: "এটি বিপরীত কথা, সেন্ট্রোমিয়ার কেন্দ্রে বিষুবীয় অঞ্চলে থাকে।",
        opt_bio_3_16_c: "উভয়ই মেরু অঞ্চলে থাকে না।",
        opt_bio_3_16_d: "মেটাফেজে কোনো বিশৃঙ্খলা থাকে না, সুনির্দিষ্ট সারিবদ্ধ বিন্যাস ঘটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 54
      },
      proTipShortcut: "সেন্ট্রোমিয়ার বিষুবীয় লাইনে, বাহুদ্বয় দুই মেরুর দিকে ছড়ানো।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_17",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "মাইটোসিসের কোন ধাপে সেন্ট্রোমিয়ারের পূর্ণ বিভাজন ঘটে এবং দুটি স্বতন্ত্র অপত্য ক্রোমোজোম গঠিত হয়?",
    options: [
      { id: "opt_bio_3_17_a", text: "প্রোফেজ", isCorrect: false },
      { id: "opt_bio_3_17_b", text: "প্রো-মেটাফেজ", isCorrect: false },
      { id: "opt_bio_3_17_c", text: "অ্যানাফেজ", isCorrect: true },
      { id: "opt_bio_3_17_d", text: "টেলোফেজ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: অ্যানাফেজ।",
      coreConcept: "অ্যানাফেজ পর্যায়ে প্রতিটি ক্রোমোজোমের সেন্ট্রোমিয়ার সম্পূর্ণ দুভাগে বিভক্ত হয়ে পড়ে এবং প্রতিটি ক্রোমাটিড একটি করে সেন্ট্রোমিয়ারসহ স্বতন্ত্র অপত্য ক্রোমোজোমে পরিণত হয় (পৃষ্ঠা ৫৪)।",
      distractorAnalysis: {
        opt_bio_3_17_a: "প্রোফেজে সেন্ট্রোমিয়ার অবিভক্ত থাকে।",
        opt_bio_3_17_b: "প্রো-মেটাফেজে স্পিন্ডলে যুক্ত হয়।",
        opt_bio_3_17_d: "টেলোফেজে অপত্য ক্রোমোজোম দুই মেরুতে স্থির হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 54
      },
      proTipShortcut: "সেন্ট্রোমিয়ার দ্বিখণ্ডিত → দুটি নতুন অপত্য ক্রোমোজোম = অ্যানাফেজ!"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_18",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "অ্যানাফেজ ধাপে মেরুমুখী চলনের সময় অপত্য ক্রোমোজোমের কোন অংশটি অগ্রগামী থাকে?",
    options: [
      { id: "opt_bio_3_18_a", text: "ক্রোমাটিড বাহুদ্বয়", isCorrect: false },
      { id: "opt_bio_3_18_b", text: "সেন্ট্রোমিয়ার", isCorrect: true },
      { id: "opt_bio_3_18_c", text: "টেলোমিয়ার প্রান্ত", isCorrect: false },
      { id: "opt_bio_3_18_d", text: "স্যাটেলাইট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সেন্ট্রোমিয়ার।",
      coreConcept: "অপত্য ক্রোমোজোমের মেরু অভিমুখী চলনে সেন্ট্রোমিয়ার সর্বদা অগ্রগামী (Leading) থাকে এবং বাহুদ্বয় অনুগামী (Following) হয় (পৃষ্ঠা ৫৫)।",
      distractorAnalysis: {
        opt_bio_3_18_a: "বাহুদ্বয় পেছনে অনুগামী হিসেবে ঝুলে থাকে।",
        opt_bio_3_18_c: "টেলোমিয়ার হলো বাহুর শেষ প্রান্ত, যা পেছনে থাকে।",
        opt_bio_3_18_d: "স্যাটেলাইট কিছু বিশেষ ক্রোমোজোমের মাথায় থাকে, তা অগ্রগামী নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 55
      },
      proTipShortcut: "গাড়ি টানে ইঞ্জিন (সেন্ট্রোমিয়ার অগ্রগামী), বগিগুলো পেছনে (বাহুদ্বয় অনুগামী)!"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_19",
    topicId: "top_ssc_biology_ch3_2",
    type: "CQ_CREATIVE",
    stem: "একটি পেঁয়াজের মূলের অগ্রভাগের প্রস্থচ্ছেদ অণুবীক্ষণ যন্ত্রে পর্যবেক্ষণ করার সময় তাহসিন দেখল: একটি কোষে ক্রোমোজোমগুলো বিষুবীয় অঞ্চলে সারিবদ্ধ হয়ে অত্যন্ত মোটা ও খাটো রূপ নিয়েছে। পাশের আরেকটি কোষে দেখা গেল ক্রোমোজোমগুলোর সেন্ট্রোমিয়ার দুভাগে ভাগ হয়ে গেছে এবং ইংরেজি V ও L অক্ষরের মতো রূপ নিয়ে দুই বিপরীত মেরুর দিকে অগ্রসর হচ্ছে।",
    options: null,
    explanation: {
      directAnswer: "তাহসিনের পর্যবেক্ষিত প্রথম ধাপটি হলো মেটাফেজ এবং দ্বিতীয় ধাপটি হলো অ্যানাফেজ।",
      coreConcept: "মেটাফেজের মেটাকাইনেসিস ও অ্যানাফেজের মেরুমুখী চলন এবং সেন্ট্রোমিয়ারের অবস্থানভিত্তিক ক্রোমোজোমের রূপ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 54
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "আকর্ষণ তন্তু (Traction fibre) কী তা সংজ্ঞা আকারে লেখা।" },
      kha: { mark: 2, criteria: "মাইটোসিসকে সমীকরণিক বিভাজন বলা হয় কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "তাহসিনের প্রথম পর্যবেক্ষিত ধাপটির (মেটাফেজ) ৩টি প্রধান শনাক্তকারী বৈশিষ্ট্য বর্ণনা করা।" },
      gha: { mark: 4, criteria: "তাহসিনের দ্বিতীয় পর্যবেক্ষিত ধাপে ক্রোমোজোমগুলো কেন ইংরেজি অক্ষরের রূপ নেয় তা চিত্রসহ বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_20",
    topicId: "top_ssc_biology_ch3_2",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান প্রদর্শনীতে রিফাত উদ্ভিদের ভাজক কলায় কোষ বিভাজনের বিভিন্ন পর্যায় দেখানোর জন্য একটি মডেল তৈরি করল। তার মডেলে দেখা গেল একটি ধাপে দুই মেরুর নিকটবর্তী ক্রোমোজোমগুলোকে ঘিরে নতুন নিউক্লিয়ার ঝিল্লি ও নিউক্লিওলাস গঠিত হচ্ছে। শিক্ষক বললেন, “এটি প্রোফেজের ঠিক বিপরীত ধাপ।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে বর্ণিত ধাপটি হলো মাইটোসিসের শেষ পর্যায় বা টেলোফেজ।",
      coreConcept: "টেলোফেজের বৈশিষ্ট্য এবং প্রোফেজের সাথে এর বিপরীতমুখী তুলনামূলক শারীরবৃত্তীয় পরিবর্তন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 55
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ক্যারিওকাইনেসিস কাকে বলে তা নির্ভুল লেখা।" },
      kha: { mark: 2, criteria: "কোষ বিভাজনে ইন্টারফেজের গুরুত্ব সংক্ষেপে ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের ধাপটির (টেলোফেজ) সচিত্র বৈজ্ঞানিক বিবরণ উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "“উদ্দীপকের ধাপটি প্রোফেজের ঠিক বিপরীত”—উক্তিটির যথার্থতা তুলনামূলক ছকের মাধ্যমে বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 3.3: সাইটোকাইনেসিস ও মাইটোসিসের গুরুত্ব [top_ssc_biology_ch3_3]
  // =========================================================================
  {
    id: "q_bio_3_21",
    topicId: "top_ssc_biology_ch3_3",
    type: "MCQ",
    stem: "উদ্ভিদকোষের সাইটোকাইনেসিসের সময় বিষুবীয় অঞ্চলে কোষপ্লেট (Cell Plate) গঠনে কোন অঙ্গাণুটি ভেসিকল জমা করে?",
    options: [
      { id: "opt_bio_3_21_a", text: "মাইটোকন্ড্রিয়া", isCorrect: false },
      { id: "opt_bio_3_21_b", text: "এন্ডোপ্লাজমিক জালিকা ও গলজি বস্তু", isCorrect: true },
      { id: "opt_bio_3_21_c", text: "লাইসোজোম ও রাইবোজোম", isCorrect: false },
      { id: "opt_bio_3_21_d", text: "ক্লোরোপ্লাস্ট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: এন্ডোপ্লাজমিক জালিকা ও গলজি বস্তু।",
      coreConcept: "টেলোফেজ পর্যায়ের শেষে বিষুবীয় তলে এন্ডোপ্লাজমিক জালিকার ক্ষুদ্র অংশগুলো জমা হয় এবং পরে এরা মিলিত হয়ে কোষপ্লেট গঠন করে (পৃষ্ঠা ৫৬)।",
      distractorAnalysis: {
        opt_bio_3_21_a: "মাইটোকন্ড্রিয়া এটিপি সরবরাহ করে, কোষপ্লেটের কাঠামো তৈরি করে না।",
        opt_bio_3_21_c: "লাইসোজোম পাচক থলি এবং রাইবোজোম প্রোটিন ফ্যাক্টরি।",
        opt_bio_3_21_d: "ক্লোরোপ্লাস্ট সালোকসংশ্লেষণ ঘটায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 56
      },
      proTipShortcut: "কোষপ্লেট = ER-এর টুকরা ও গলজি ভেসিকলের মেলবন্ধন!"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_22",
    topicId: "top_ssc_biology_ch3_3",
    type: "MCQ",
    stem: "প্রাণিকোষে সাইটোকাইনেসিস প্রক্রিয়াটি প্রধানত কীভাবে সম্পন্ন হয়?",
    options: [
      { id: "opt_bio_3_22_a", text: "কোষপ্লেট তৈরি হয়ে", isCorrect: false },
      { id: "opt_bio_3_22_b", text: "কোষঝিল্লি ভেতরের দিকে গর্ত বা খাঁজ (Cleavage) সৃষ্টির মাধ্যমে", isCorrect: true },
      { id: "opt_bio_3_22_c", text: "স্পিন্ডল তন্তু স্থায়ী হওয়ার মাধ্যমে", isCorrect: false },
      { id: "opt_bio_3_22_d", text: "কোষপ্রাচীর তৈরির মাধ্যমে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কোষঝিল্লি ভেতরের দিকে গর্ত বা খাঁজ (Cleavage) সৃষ্টির মাধ্যমে।",
      coreConcept: "প্রাণীর ক্ষেত্রে স্পিন্ডল যন্ত্রের বিষুবীয় অঞ্চল বরাবর কোষঝিল্লিটি গর্তের মতো ভেতরের দিকে ঢুকে যায় এবং খাঁজ গভীরতর হয়ে কোষটিকে দুভাগে বিভক্ত করে (পৃষ্ঠা ৫৬)।",
      distractorAnalysis: {
        opt_bio_3_22_a: "কোষপ্লেট গঠন উদ্ভিদকোষের অনন্য বৈশিষ্ট্য (প্রাণিকোষে অনমনীয় প্রাচীর নেই)।",
        opt_bio_3_22_c: "স্পিন্ডল তন্তু সাইটোকাইনেসিসের সময় স্থায়ী হয় না, বরং লুপ্ত হয়।",
        opt_bio_3_22_d: "প্রাণিকোষে কোষপ্রাচীর সম্পূর্ণ অনুপস্থিত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 56
      },
      proTipShortcut: "উদ্ভিদ = কোষপ্লেট; প্রাণী = খাঁজ বা ক্লিভেজ ফারোয়িং!"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_23",
    topicId: "top_ssc_biology_ch3_3",
    type: "MCQ",
    stem: "জীবদেহের কেটে যাওয়া বা আঘাতপ্রাপ্ত স্থানে নতুন কোষ সৃষ্টির মাধ্যমে ক্ষত পূরণ করে কোন বিভাজন?",
    options: [
      { id: "opt_bio_3_23_a", text: "মাইটোসিস", isCorrect: true },
      { id: "opt_bio_3_23_b", text: "মিয়োসিস", isCorrect: false },
      { id: "opt_bio_3_23_c", text: "অ্যামাইটোসিস", isCorrect: false },
      { id: "opt_bio_3_23_d", text: "দ্বি-ভাজন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: মাইটোসিস।",
      coreConcept: "ক্ষতস্থানে নতুন কোষ সৃষ্টির মাধ্যমে জীবদেহের ক্ষতস্থান পূরণ করতে মাইটোসিস অপরিহার্য (পৃষ্ঠা ৫৮)।",
      distractorAnalysis: {
        opt_bio_3_23_b: "মিয়োসিস কেবল জননকোষ সৃষ্টিতে ভূমিকা রাখে, ক্ষত নিরাময়ে নয়।",
        opt_bio_3_23_c: "অ্যামাইটোসিস আদিকোষী জীবে ঘটে।",
        opt_bio_3_23_d: "দ্বি-ভাজন ব্যাকটেরিয়ার বংশবৃদ্ধি প্রক্রিয়া।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "শরীরের ক্ষত মেরামত = মাইটোসিস সমীকরণিক বিভাজন!"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_24",
    topicId: "top_ssc_biology_ch3_3",
    type: "MCQ",
    stem: "মাইটোসিসের কারণে প্রতিটি কোষে কোন উপাদান দুটির মধ্যকার আয়তন ও পরিমাণগত ভারসাম্য রক্ষিত হয়?",
    options: [
      { id: "opt_bio_3_24_a", text: "নিউক্লিয়াস ও সাইটোপ্লাজম", isCorrect: true },
      { id: "opt_bio_3_24_b", text: "মাইটোকন্ড্রিয়া ও ক্লোরোপ্লাস্ট", isCorrect: false },
      { id: "opt_bio_3_24_c", text: "লাইসোজোম ও সেন্ট্রোজোম", isCorrect: false },
      { id: "opt_bio_3_24_d", text: "কোষপ্রাচীর ও কোষঝিল্লি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: নিউক্লিয়াস ও সাইটোপ্লাজম।",
      coreConcept: "মাইটোসিস কোষ বিভাজনের কারণে প্রতিটি কোষের নিউক্লিয়াস এবং সাইটোপ্লাজমের মধ্যকার আয়তন ও পরিমাণগত ভারসাম্য রক্ষিত হয় (পৃষ্ঠা ৫৮)।",
      distractorAnalysis: {
        opt_bio_3_24_b: "মাইটোকন্ড্রিয়া ও ক্লোরোপ্লাস্ট স্বতন্ত্র অঙ্গাণু, পুরো কোষীয় ভারসাম্য নির্দেশ করে না।",
        opt_bio_3_24_c: "লাইসোজোম ও সেন্ট্রোজোম ক্ষুদ্র অঙ্গাণু।",
        opt_bio_3_24_d: "কোষপ্রাচীর ও ঝিল্লি সীমানা নির্ধারণ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "কোষীয় নিউক্লিও-সাইটোপ্লাজমিক অনুপাত মাইটোসিসের মূল চাবিকাঠি।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_25",
    topicId: "top_ssc_biology_ch3_3",
    type: "MCQ",
    stem: "নির্দিষ্ট আয়ুষ্কালবিশিষ্ট জীবকোষ বিনষ্ট হলে কোন প্রক্রিয়ায় নতুন কোষ সৃষ্টি হয়ে সেগুলোর স্থান পূরণ হয়?",
    options: [
      { id: "opt_bio_3_25_a", text: "মিয়োসিস", isCorrect: false },
      { id: "opt_bio_3_25_b", text: "মাইটোসিস", isCorrect: true },
      { id: "opt_bio_3_25_c", text: "অ্যামাইটোসিস", isCorrect: false },
      { id: "opt_bio_3_25_d", text: "স্পোরোজেনেসিস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মাইটোসিস।",
      coreConcept: "কিছু কিছু জীবকোষের আয়ুষ্কাল নির্দিষ্ট (যেমন লোহিত রক্তকণিকা ১২০ দিন); এগুলো বিনষ্ট হলে মাইটোসিসের মাধ্যমেই এদের ঘাটতি পূরণ ঘটে (পৃষ্ঠা ৫৮)।",
      distractorAnalysis: {
        opt_bio_3_25_a: "মিয়োসিস হ্যাপ্লয়েড গ্যামেট তৈরি করে, দেহকোষের ঘাটতি মেটায় না।",
        opt_bio_3_25_c: "অ্যামাইটোসিস বহুকোষী রক্তকণিকা তৈরিতে অংশ নেয় না।",
        opt_bio_3_25_d: "স্পোরোজেনেসিস হলো রেনু উৎপাদন প্রক্রিয়া।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "কোষ ক্ষয়পূরণ ও প্রতিস্থাপন = মাইটোসিস!"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_26",
    topicId: "top_ssc_biology_ch3_3",
    type: "MCQ",
    stem: "সুতা দিয়ে ক্রোমোজোমের মেটাসেন্ট্রিক মডেল তৈরি করতে দুটি সুতার কোন স্থানে গিট দিতে হবে?",
    options: [
      { id: "opt_bio_3_26_a", text: "একেবারে শেষ প্রান্তে", isCorrect: false },
      { id: "opt_bio_3_26_b", text: "উভয়ের দৈর্ঘ্যের ঠিক মাঝখানে", isCorrect: true },
      { id: "opt_bio_3_26_c", text: "এক প্রান্তের কাছাকাছি", isCorrect: false },
      { id: "opt_bio_3_26_d", text: "কোনো গিট দেওয়ার প্রয়োজন নেই", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: উভয়ের দৈর্ঘ্যের ঠিক মাঝখানে।",
      coreConcept: "পাঠ্যবইয়ের ব্যবহারিক দলগত কাজ অনুযায়ী দুটি সমান সুতার ঠিক মাঝখানে গিট দিলে মেটাসেন্ট্রিক ক্রোমোজোমের চার বাহুবিশিষ্ট মডেল পাওয়া যায় (পৃষ্ঠা ৫৬-৫৭)।",
      distractorAnalysis: {
        opt_bio_3_26_a: "একেবারে শেষ প্রান্তে দিলে টেলোসেন্ট্রিক মডেল তৈরি হবে।",
        opt_bio_3_26_c: "এক প্রান্তের কাছাকাছি দিলে অ্যাক্রোসেন্ট্রিক মডেল তৈরি হবে।",
        opt_bio_3_26_d: "গিট না দিলে সেন্ট্রোমিয়ার গঠিত হবে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 56
      },
      proTipShortcut: "মাঝখানে গিট = Meta (মাঝ) = মেটাসেন্ট্রিক!"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_27",
    topicId: "top_ssc_biology_ch3_3",
    type: "MCQ",
    stem: "উদ্ভিদের ক্ষেত্রে কোন অংশে মাইটোসিস সংঘটিত হওয়ার মাধ্যমে উদ্ভিদ দৈর্ঘ্যে ও প্রস্থে বৃদ্ধি পায়?",
    options: [
      { id: "opt_bio_3_27_a", text: "পরিণত কাষ্ঠলে", isCorrect: false },
      { id: "opt_bio_3_27_b", text: "বর্ধনশীল অংশের ভাজক টিস্যুতে", isCorrect: true },
      { id: "opt_bio_3_27_c", text: "মৃত বাকলে", isCorrect: false },
      { id: "opt_bio_3_27_d", text: "পরিণত ফলের শাঁসে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বর্ধনশীল অংশের ভাজক টিস্যুতে।",
      coreConcept: "উদ্ভিদের কাণ্ড ও মূলের অগ্রভাগ, ভ্রূণমুকুল, ভ্রূণমূল ও বর্ধনশীল কচি পাতার ভাজক টিস্যুতে মাইটোসিস বিভাজনের মাধ্যমে উদ্ভিদ বৃদ্ধি পায় (পৃষ্ঠা ৫২)।",
      distractorAnalysis: {
        opt_bio_3_27_a: "পরিণত কাষ্ঠলে মৃত ভেসেল ও ফাইবার থাকে, যা বিভাজিত হয় না।",
        opt_bio_3_27_c: "মৃত বাকল বিভাজনে অক্ষম।",
        opt_bio_3_27_d: "ফলের শাঁস স্থায়ী টিস্যু।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 52
      },
      proTipShortcut: "উদ্ভিদের বৃদ্ধি = শীর্ষস্থ ও পার্শ্বীয় ভাজক টিস্যুর মাইটোসিস!"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_28",
    topicId: "top_ssc_biology_ch3_3",
    type: "CQ_CREATIVE",
    stem: "নাবিল সাইকেল চালাতে গিয়ে পড়ে গিয়ে হাঁটুতে প্রচণ্ড আঘাত পেল এবং বেশ কিছু কোষ ক্ষতিগ্রস্ত হয়ে চামড়া ছড়ে গেল। কিন্তু দুই সপ্তাহের মধ্যেই সেখানে নতুন ত্বক তৈরি হয়ে ক্ষতস্থানটি সম্পূর্ণ নিরাময় হয়ে গেল। জীববিজ্ঞান শিক্ষক তাকে বললেন, “তোমার দেহে সংঘটিত বিশেষ এক কোষ বিভাজন প্রক্রিয়ার কারণেই এই অলৌকিক নিরাময় সম্ভব হয়েছে।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে আঘাতপ্রাপ্ত স্থানে মাইটোসিস কোষ বিভাজনের মাধ্যমে ক্ষতস্থান পূরণের শারীরবৃত্তীয় প্রক্রিয়া তুলে ধরা হয়েছে।",
      coreConcept: "মাইটোসিস কোষ বিভাজনের ভূমিকা, নতুন কোষ উৎপাদন ও জীবদেহের রক্ষণাবেক্ষণ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "সাইটোকাইনেসিস কাকে বলে তা নির্ভুল লেখা।" },
      kha: { mark: 2, criteria: "উদ্ভিদ ও প্রাণিকোষে সাইটোকাইনেসিসের প্রধান পার্থক্যটি ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে নাবিলের আঘাতপ্রাপ্ত ত্বক কীভাবে নিরাময় হলো তা মাইটোসিস প্রক্রিয়ার আলোকে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "“বহুকোষী জীবের দেহ গঠন ও অস্তিত্ব বজায় রাখতে মাইটোসিস অপরিহার্য”—উক্তিটির যথার্থতা মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_CQ_01",
    topicId: "top_ssc_biology_ch3_1",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান ক্লাসে শিক্ষক বোর্ডে দুটি জীবের ছবি দেখিয়ে বললেন, “প্রথম জীবটি হলো এককোষী ব্যাকটেরিয়া, যা কোনো জটিল স্পিন্ডল যন্ত্র ছাড়াই সরাসরি দ্বিখণ্ডিত হয়ে বংশবৃদ্ধি করে। আর দ্বিতীয় চিত্রটি হলো একটি মানব শিশুর, যার প্রায় ৩০ ট্রিলিয়ন কোষের দেহের সূচনা হয়েছিল মাত্র একটি এককোষী নিষিক্ত ডিম্বাণু থেকে।”",
    options: null,
    explanation: {
      directAnswer: "প্রথম জীবটিতে অ্যামাইটোসিস বা দ্বি-ভাজন এবং দ্বিতীয় জীবে জাইগোট থেকে মাইটোসিস বিভাজনে বৃদ্ধি নির্দেশ করা হয়েছে।",
      coreConcept: "এককোষী জীবে প্রত্যক্ষ কোষ বিভাজন এবং বহুকোষী জীবের সূচনা ও দৈহিক বৃদ্ধির মেকানিজম।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.১",
        pageNumber: 52
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "প্রত্যক্ষ বিভাজন বা অ্যামাইটোসিস কাকে বলে তা নির্ভুলভাবে লেখা।" },
      kha: { mark: 2, criteria: "নিষিক্ত ডিম্বাণু বা জাইগোটকে বহুকোষী জীবনের সূচনা কোষ বলার কারণ ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের প্রথম জীবটির বিভাজন প্রক্রিয়ার প্রধান ৩টি বৈশিষ্ট্য ছকে উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "“দ্বিতীয় জীবের পূর্ণাঙ্গ দৈহিক রূপায়ণে কোষের জ্যামিতিক প্রবৃদ্ধি অপরিহার্য”—উক্তিটি বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_CQ_02",
    topicId: "top_ssc_biology_ch3_3",
    type: "CQ_CREATIVE",
    stem: "উদ্ভিদ ও প্রাণিকোষে নিউক্লিয়াসের বিভাজন (ক্যারিওকাইনেসিস) সম্পন্ন হওয়ার পর সাইটোপ্লাজম বিভাজনের জন্য দুটি ভিন্ন দৃশ্য দেখা গেল: চিত্র P-তে দেখা গেল মাঝখানে এন্ডোপ্লাজমিক জালিকা জমা হয়ে শক্ত প্রাচীর গড়ে তুলছে; অন্যদিকে চিত্র Q-তে দেখা গেল কোষঝিল্লি ভেতরমুখী খাঁজ সৃষ্টির মাধ্যমে কোষটিকে দুভাগে ভাগ করছে।",
    options: null,
    explanation: {
      directAnswer: "চিত্র P হলো উদ্ভিদকোষের কোষপ্লেট পদ্ধতি এবং চিত্র Q হলো প্রাণিকোষের ক্লিভেজ খাঁজ পদ্ধতি।",
      coreConcept: "উদ্ভিদ ও প্রাণিকোষে সাইটোকাইনেসিসের কৌশলগত ভিন্নতা ও অঙ্গাণুর ভূমিকা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 56
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "সাইটোকাইনেসিস কাকে বলে তা নির্ভুল লেখা।" },
      kha: { mark: 2, criteria: "উদ্ভিদকোষে কেন প্রাণিকোষের মতো খাঁজ সৃষ্টি হতে পারে না তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "চিত্র P-এর কোষপ্লেট গঠনে এন্ডোপ্লাজমিক জালিকা ও গলজি উপাদানের ভূমিকা বর্ণনা করা।" },
      gha: { mark: 4, criteria: "“চিত্র P ও Q উভয় প্রক্রিয়াই জীবদেহের কোষীয় ভারসাম্য ও বৃদ্ধির জন্য পরিপূরক”—যৌক্তিক মতামত দেওয়া।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
