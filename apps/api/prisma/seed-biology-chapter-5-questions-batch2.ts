import { ContentStatus } from "@prisma/client";
import type { QuestionData } from "./seed-chapter-7-questions";

export const biologyChapter5QuestionsBatch2: QuestionData[] = [
  // -------------------------------------------------------------------------
  // TOPIC 5.3: পুষ্টির অভাবজনিত রোগ, বিএমআই ও বিএমআর (MCQs 25-36, CQs 07-09)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_5_25",
    topicId: "top_ssc_biology_ch5_3",
    type: "MCQ",
    stem: "দাঁতের মাড়ি ফুলে নরম হয়ে রক্ত পড়া ও দাঁতের গোড়া আলগা হওয়া কোন ভিটামিনের অভাবজনিত লক্ষণ?",
    options: [
      { id: "opt_bio_5_25_a", text: "ভিটামিন A", isCorrect: false },
      { id: "opt_bio_5_25_b", text: "ভিটামিন B", isCorrect: false },
      { id: "opt_bio_5_25_c", text: "ভিটামিন C", isCorrect: true },
      { id: "opt_bio_5_25_d", text: "ভিটামিন D", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ভিটামিন C।",
      coreConcept: "ভিটামিন C (অ্যাসকরবিক এসিড) যোজক কলার কোলাজেন প্রোটিন তৈরিতে অপরিহার্য; এর অভাবে স্কার্ভি (Scurvy) রোগ হয় যাতে মাড়ি থেকে রক্ত পড়ে।",
      distractorAnalysis: {
        opt_bio_5_25_a: "ভিটামিন A এর অভাবে রাতকানা ও জেরোফথ্যালমিয়া হয়।",
        opt_bio_5_25_b: "ভিটামিন B এর অভাবে বেরিবেরি ও মুখে ঘা হয়।",
        opt_bio_5_25_d: "ভিটামিন D এর অভাবে রিকেটস রোগ হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 100
      },
      proTipShortcut: "ভিটামিন C = স্কার্ভি = মাড়ি থেকে রক্ত পড়া।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_26",
    topicId: "top_ssc_biology_ch5_3",
    type: "MCQ",
    stem: "শিশুদের পায়ের হাড় ধনুকের মতো বেঁকে যাওয়া (Bow legs) কোন রোগের প্রধান লক্ষণ?",
    options: [
      { id: "opt_bio_5_26_a", text: "রিকেটস (Rickets)", isCorrect: true },
      { id: "opt_bio_5_26_b", text: "স্কার্ভি", isCorrect: false },
      { id: "opt_bio_5_26_c", text: "গলগণ্ড", isCorrect: false },
      { id: "opt_bio_5_26_d", text: "জেরোফথ্যালমিয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: রিকেটস (Rickets)।",
      coreConcept: "ভিটামিন D ও ক্যালসিয়ামের অভাবে শিশুদের অস্থিতে খনিজ জমা হতে পারে না, ফলে দেহের ভারে পায়ের হাড় বেঁকে ধনুকাকৃতি হয়।",
      distractorAnalysis: {
        opt_bio_5_26_b: "স্কার্ভি হলো মাড়ির রোগ।",
        opt_bio_5_26_c: "গলগণ্ড থাইরয়েড গ্রন্থির স্ফীতি।",
        opt_bio_5_26_d: "জেরোফথ্যালমিয়া চোখের কর্নিয়ার অন্ধত্ব।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 100
      },
      proTipShortcut: "ভিটামিন D ও ক্যালসিয়াম ঘাটতি = শিশুর রিকেটস।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_27",
    topicId: "top_ssc_biology_ch5_3",
    type: "MCQ",
    stem: "খাবারে আয়োডিনের অভাবে গলার থাইরয়েড গ্রন্থি ফুলে বড় হয়ে যাওয়াকে কী বলা হয়?",
    options: [
      { id: "opt_bio_5_27_a", text: "অ্যানিমিয়া", isCorrect: false },
      { id: "opt_bio_5_27_b", text: "গলগণ্ড বা ঘ্যাগ (Goitre)", isCorrect: true },
      { id: "opt_bio_5_27_c", text: "রিকেটস", isCorrect: false },
      { id: "opt_bio_5_27_d", text: "বেরিবেরি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: গলগণ্ড বা ঘ্যাগ (Goitre)।",
      coreConcept: "থাইরয়েড গ্রন্থি থেকে থাইরক্সিন হরমোন তৈরির জন্য আয়োডিন অপরিহার্য; আয়োডিন কমে গেলে গ্রন্থিটি অতিরিক্ত উদ্দীপিত হয়ে ফুলে ওঠে।",
      distractorAnalysis: {
        opt_bio_5_27_a: "অ্যানিমিয়া হলো রক্তের হিমোগ্লোবিন কমে যাওয়া (লৌহের ঘাটতি)।",
        opt_bio_5_27_c: "রিকেটস হাড়ের সমস্যা।",
        opt_bio_5_27_d: "বেরিবেরি ভিটামিন B1 এর ঘাটতি রোগ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 101
      },
      proTipShortcut: "আয়োডিন = থাইরয়েড গ্রন্থি = গলগণ্ড।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_28",
    topicId: "top_ssc_biology_ch5_3",
    type: "MCQ",
    stem: "শিশুদের শারীরিক ও মানসিক বিকাশ চরমভাবে বাধাগ্রস্ত হয়ে জড়বুদ্ধিসম্পন্ন বামন রূপ নেওয়া কোনটির লক্ষণ?",
    options: [
      { id: "opt_bio_5_28_a", text: "ক্রেটিনিজম (Cretinism)", isCorrect: true },
      { id: "opt_bio_5_28_b", text: "স্কার্ভি", isCorrect: false },
      { id: "opt_bio_5_28_c", text: "রাতকানা", isCorrect: false },
      { id: "opt_bio_5_28_d", text: "অস্টিওপোরোসিস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ক্রেটিনিজম (Cretinism)।",
      coreConcept: "শৈশবে তীব্র আয়োডিন ঘাটতিতে থাইরয়েড হরমোন নিঃসরণ ব্যাহত হয়ে ক্রেটিনিজম রোগ হয় যাতে শারীরিক বৃদ্ধি ও বুদ্ধিবৃত্তি দুটোই মারাত্মক ক্ষতিগ্রস্ত হয়।",
      distractorAnalysis: {
        opt_bio_5_28_b: "স্কার্ভি রক্তক্ষরণ রোগ।",
        opt_bio_5_28_c: "রাতকানা চোখের রোগ।",
        opt_bio_5_28_d: "অস্টিওপোরোসিস বয়স্কদের হাড় ভঙ্গুর হওয়ার রোগ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 101
      },
      proTipShortcut: "শিশুদের আয়োডিন ঘাটতি = ক্রেটিনিজম (বামন ও বুদ্ধিহীন)।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_29",
    topicId: "top_ssc_biology_ch5_3",
    type: "MCQ",
    stem: "রক্তশূন্যতা বা অ্যানিমিয়া (Anemia) মূলত খাদ্যে কোন খনিজের দীর্ঘস্থায়ী ঘাটতিতে ঘটে?",
    options: [
      { id: "opt_bio_5_29_a", text: "লৌহ বা আয়রন (Fe)", isCorrect: true },
      { id: "opt_bio_5_29_b", text: "ক্যালসিয়াম (Ca)", isCorrect: false },
      { id: "opt_bio_5_29_c", text: "ম্যাগনেসিয়াম (Mg)", isCorrect: false },
      { id: "opt_bio_5_29_d", text: "পটাশিয়াম (K)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: লৌহ বা আয়রন (Fe)।",
      coreConcept: "লোহিত রক্তকণিকার হিমোগ্লোবিন তৈরির প্রধান উপাদান লৌহ; এর ঘাটতিতে রক্তে হিমোগ্লোবিন কমে অ্যানিমিয়া দেখা দেয়।",
      distractorAnalysis: {
        opt_bio_5_29_b: "ক্যালসিয়াম হাড় ও দাঁতের মূল উপাদান।",
        opt_bio_5_29_c: "ম্যাগনেসিয়াম এনজাইম সক্রিয়ক।",
        opt_bio_5_29_d: "পটাশিয়াম কোষের তরল ভারসাম্য রক্ষা করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 102
      },
      proTipShortcut: "Fe ঘাটতি = হিমোগ্লোবিন হ্রাস = রক্তশূন্যতা।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_30",
    topicId: "top_ssc_biology_ch5_3",
    type: "MCQ",
    stem: "বডি মাস ইনডেক্স (BMI) নির্ণয়ের সঠিক গাণিতিক সূত্র কোনটি?",
    options: [
      { id: "opt_bio_5_30_a", text: "ওজন (কেজি) ÷ উচ্চতা (মিটার)", isCorrect: false },
      { id: "opt_bio_5_30_b", text: "ওজন (কেজি) ÷ [উচ্চতা (মিটার)]²", isCorrect: true },
      { id: "opt_bio_5_30_c", text: "[উচ্চতা (মিটার)]² ÷ ওজন (কেজি)", isCorrect: false },
      { id: "opt_bio_5_30_d", text: "ওজন (গ্রাম) ÷ উচ্চতা (সেমি)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ওজন (কেজি) ÷ [উচ্চতা (মিটার)]²।",
      coreConcept: "BMI হলো ব্যক্তির শারীরিক ওজন (কিলোগ্রামে) এবং তার উচ্চতার (মিটারে) বর্গের অনুপাত।",
      distractorAnalysis: {
        opt_bio_5_30_a: "উচ্চতাকে বর্গ করা হয়নি, তাই ভুল।",
        opt_bio_5_30_c: "অনুপাতটি বিপরীত হয়ে গেছে।",
        opt_bio_5_30_d: "একক কিলোগ্রাম ও মিটারে হতে হবে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 105
      },
      proTipShortcut: "BMI = kg / m²।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_31",
    topicId: "top_ssc_biology_ch5_3",
    type: "MCQ",
    stem: "বিশ্ব স্বাস্থ্য সংস্থা (WHO) ও NCTB মানদণ্ড অনুযায়ী সুস্বাস্থ্যের স্বাভাবিক বা আদর্শ BMI পরিসীমা কত?",
    options: [
      { id: "opt_bio_5_31_a", text: "১৫.০ – ১৮.৪", isCorrect: false },
      { id: "opt_bio_5_31_b", text: "১৮.৫ – ২৪.৯", isCorrect: true },
      { id: "opt_bio_5_31_c", text: "২৫.০ – ২৯.৯", isCorrect: false },
      { id: "opt_bio_5_31_d", text: "৩০.০ – ৩৪.৯", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ১৮.৫ – ২৪.৯।",
      coreConcept: "BMI ১৮.৫ এর নিচে কম ওজন, ১৮.৫–২৪.৯ স্বাভাবিক সুস্বাস্থ্য, ২৫.০–২৯.৯ অতিরিক্ত ওজন এবং ৩০.০ বা বেশি হলে স্থূলতা নির্দেশ করে।",
      distractorAnalysis: {
        opt_bio_5_31_a: "এটি কম ওজন বা আন্ডারওয়েটের মান।",
        opt_bio_5_31_c: "এটি ওভারওয়েট বা অতিরিক্ত ওজনের মান।",
        opt_bio_5_31_d: "এটি প্রথম শ্রেণির স্থূলতার মান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 105
      },
      proTipShortcut: "আদর্শ স্বাস্থ্য BMI = ১৮.৫ থেকে ২৪.৯।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_32",
    topicId: "top_ssc_biology_ch5_3",
    type: "MCQ",
    stem: "এক কিশোরের ওজন ৪৮ কেজি এবং উচ্চতা ১৫০ সেমি (১.৫ মিটার)। তার BMI কত?",
    options: [
      { id: "opt_bio_5_32_a", text: "১৮.০", isCorrect: false },
      { id: "opt_bio_5_32_b", text: "২১.৩৩", isCorrect: true },
      { id: "opt_bio_5_32_c", text: "২৪.০", isCorrect: false },
      { id: "opt_bio_5_32_d", text: "২৬.৬৭", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ২১.৩৩।",
      coreConcept: "BMI = ৪৮ ÷ (১.৫ × ১.৫) = ৪৮ ÷ ২.২৫ = ২১.৩৩ kg/m²।",
      distractorAnalysis: {
        opt_bio_5_32_a: "গণনায় ভুল।",
        opt_bio_5_32_c: "গণনায় ভুল।",
        opt_bio_5_32_d: "৪৮ ÷ ১.৮ দিয়ে ভাগ করলে এমন আসতে পারে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 107
      },
      proTipShortcut: "৪৮ / ২.২৫ = ২১.৩৩ (আদর্শ মানের অন্তর্ভুক্ত)।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_33",
    topicId: "top_ssc_biology_ch5_3",
    type: "MCQ",
    stem: "সম্পূর্ণ বিশ্রামরত অবস্থায় মানবদেহের মৌলিক জীবনধারা বজায় রাখতে ন্যূনতম যে শক্তি খরচ হয় তাকে কী বলে?",
    options: [
      { id: "opt_bio_5_33_a", text: "BMI", isCorrect: false },
      { id: "opt_bio_5_33_b", text: "BMR (Basal Metabolic Rate)", isCorrect: true },
      { id: "opt_bio_5_33_c", text: "ATP", isCorrect: false },
      { id: "opt_bio_5_33_d", text: "ক্যালরি ইনডেক্স", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: BMR (Basal Metabolic Rate)।",
      coreConcept: "মৌল বিপাকীয় হার বা BMR হলো জাগ্রত কিন্তু পূর্ণ বিশ্রামরত অবস্থায় অঙ্গাণুসমূহের কাজ চালু রাখতে প্রয়োজনীয় ন্যূনতম শক্তির মান।",
      distractorAnalysis: {
        opt_bio_5_33_a: "BMI হলো দেহের ওজন ও উচ্চতার অনুপাত।",
        opt_bio_5_33_c: "ATP হলো জৈব রাসায়নিক শক্তির অণু।",
        opt_bio_5_33_d: "ক্যালরি ইনডেক্স কোনো প্রমিত শারীরবৃত্তীয় পদ নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 106
      },
      proTipShortcut: "বিশ্রামে ন্যূনতম শক্তি খরচ = BMR।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_34",
    topicId: "top_ssc_biology_ch5_3",
    type: "MCQ",
    stem: "হ্যারিস-বেনেডিক্ট সমীকরণ অনুযায়ী নারীদের BMR নির্ণয়ের সঠিক সূত্র কোনটি?",
    options: [
      { id: "opt_bio_5_34_a", text: "BMR = ৬৬ + (১৩.৭ × W) + (৫ × H) - (৬.৮ × A)", isCorrect: false },
      { id: "opt_bio_5_34_b", text: "BMR = ৬৫৫ + (৯.৬ × W) + (১.৮ × H) - (৪.৭ × A)", isCorrect: true },
      { id: "opt_bio_5_34_c", text: "BMR = ৬৫৫ + (১৩.৭ × W) + (১.৮ × H) - (৬.৮ × A)", isCorrect: false },
      { id: "opt_bio_5_34_d", text: "BMR = ৬৬ + (৯.৬ × W) + (৫ × H) - (৪.৭ × A)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: BMR = ৬৫৫ + (৯.৬ × W) + (১.৮ × H) - (৪.৭ × A)।",
      coreConcept: "নারীদের ক্ষেত্রে প্রাথমিক ধ্রুবক ৬৫৫, ওজনের গুণক ৯.৬, উচ্চতার ১.৮ এবং বয়সের ৪.৭।",
      distractorAnalysis: {
        opt_bio_5_34_a: "এটি পুরুষদের BMR সূত্র।",
        opt_bio_5_34_c: "পুরুষ ও নারীর সূত্রের মিশ্রণে তৈরি ভুল সমীকরণ।",
        opt_bio_5_34_d: "ভুল সমীকরণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 106
      },
      proTipShortcut: "পুরুষ: ৬৬ দিয়ে শুরু; নারী: ৬৫৫ দিয়ে শুরু।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_35",
    topicId: "top_ssc_biology_ch5_3",
    type: "MCQ",
    stem: "একজন ব্যক্তির BMR ১৪০০ কিলোক্যালরি। তিনি সপ্তাহে ৩-৫ দিন মাঝারি ধরনের পরিশ্রম বা খেলাধুলা করেন (গুণক ১.৫৫)। তার দৈনিক ক্যালরি চাহিদা কত?",
    options: [
      { id: "opt_bio_5_35_a", text: "১৬৮০ kcal", isCorrect: false },
      { id: "opt_bio_5_35_b", text: "১৯২৫ kcal", isCorrect: false },
      { id: "opt_bio_5_35_c", text: "২১৭০ kcal", isCorrect: true },
      { id: "opt_bio_5_35_d", text: "২৪১৫ kcal", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ২১৭০ kcal।",
      coreConcept: "দৈনিক শক্তির চাহিদা = BMR × ১.৫৫ = ১৪০০ × ১.৫৫ = ২১৭০ kcal।",
      distractorAnalysis: {
        opt_bio_5_35_a: "১৪০০ × ১.২ = ১৬৮০ (পরিশ্রমহীন ব্যক্তির চাহিদা)।",
        opt_bio_5_35_b: "১৪০০ × ১.৩৭৫ = ১৯২৫ (হালকা পরিশ্রমীর চাহিদা)।",
        opt_bio_5_35_d: "১৪০০ × ১.৭২৫ = ২৪১৫ (কঠোর পরিশ্রমীর চাহিদা)।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 107
      },
      proTipShortcut: "দৈনিক ক্যালরি = BMR × সক্রিয়তার গুণক।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_36",
    topicId: "top_ssc_biology_ch5_3",
    type: "MCQ",
    stem: "কোনো ব্যক্তির BMI মান ৩২.৫ হলে তিনি কোন শ্রেণিতে অন্তর্ভুক্ত হবেন?",
    options: [
      { id: "opt_bio_5_36_a", text: "স্বাভাবিক ওজন", isCorrect: false },
      { id: "opt_bio_5_36_b", text: "অতিরিক্ত ওজন (Overweight)", isCorrect: false },
      { id: "opt_bio_5_36_c", text: "প্রথম শ্রেণির স্থূলতা (Class I Obese)", isCorrect: true },
      { id: "opt_bio_5_36_d", text: "চরম স্থূলতা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: প্রথম শ্রেণির স্থূলতা (Class I Obese)।",
      coreConcept: "WHO মানদণ্ড অনুযায়ী BMI ৩০.০ থেকে ৩৪.৯ পর্যন্ত হলো প্রথম শ্রেণির স্থূলতা।",
      distractorAnalysis: {
        opt_bio_5_36_a: "১৮.৫–২৪.৯ হলো স্বাভাবিক ওজন।",
        opt_bio_5_36_b: "২৫.০–২৯.৯ হলো অতিরিক্ত ওজন।",
        opt_bio_5_36_d: "৪০.০ এর বেশি হলো চরম স্থূলতা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 105
      },
      proTipShortcut: "৩০ থেকে ৩৪.৯ = প্রথম শ্রেণির স্থূলতা।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // TOPIC 5.3 CREATIVE QUESTIONS (CQs 07-09)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_5_cq_07",
    topicId: "top_ssc_biology_ch5_3",
    type: "CQ_CREATIVE",
    stem: "সাদাফের বয়স ১৬ বছর, উচ্চতা ১.৬০ মিটার এবং ওজন ৮০ কেজি। সে নিয়মিত ব্যায়াম করে না এবং অধিকাংশ সময় কম্পিউটার গেম খেলে সময় কাটায়। তার দাঁতের মাড়ি প্রায়ই ফুলে যায় এবং সামান্য চাপ লাগলেই রক্ত পড়ে। অপরদিকে তার ছোট ভাই আবিরের পায়ের হাড় ধনুকের মতো বাঁকা এবং হাঁটুর জোড়াগুলো অস্বাভাবিক ফোলা। ডাক্তার সাহেব বললেন সাদাফের ওজন অতিরিক্ত ও নির্দিষ্ট ভিটামিনের ঘাটতি রয়েছে এবং আবির ভিটামিন ডি-এর অভাবে ভুগছে।",
    options: null,
    explanation: {
      directAnswer: "সাদাফের BMI ৩১.২৫ (স্থূলতা) এবং স্কার্ভি রোগ হয়েছে; আবিরের রিকেটস রোগ হয়েছে।",
      coreConcept: "ভিটামিন ঘাটতিজনিত রোগ (স্কার্ভি ও রিকেটস) এবং BMI মূল্যায়ন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 100
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "BMI এর পূর্ণরূপ ও সংজ্ঞা লেখা।" },
      kha: { mark: 2, criteria: "ভিটামিন সি কেন নিয়মিত প্রতিদিন খাদ্য তালিকায় রাখা জরুরি তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "সাদাফের BMI নির্ণয় করে তার স্বাস্থ্যগত অবস্থান ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "সাদাফ ও আবিরের সমস্যা প্রতিকারে সুষম খাদ্য ও জীবনযাত্রার পরিবর্তন সংক্রান্ত পরামর্শ বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_cq_08",
    topicId: "top_ssc_biology_ch5_3",
    type: "CQ_CREATIVE",
    stem: "উত্তরবঙ্গের একটি প্রত্যন্ত পাহাড়ি অঞ্চলে দেখা গেল বহু মানুষের গলার সামনের অংশ অস্বাভাবিক ফুলে গেছে। বিশেষ করে শিশু ও মহিলাদের মধ্যে এই সমস্যা প্রকট। চিকিৎসকদের একটি দল সেখানে গিয়ে দেখতে পেলেন তারা সাধারণ খোলা লবণ ব্যবহার করেন এবং স্থানীয় মাটিতে আয়োডিনের তীব্র অভাব রয়েছে। কিছু শিশুর শারীরিক বৃদ্ধি থেমে গেছে এবং তারা বুদ্ধিপ্রতিবন্ধীর মতো আচরণ করছে।",
    options: null,
    explanation: {
      directAnswer: "স্থানীয় বাসিন্দারা আয়োডিনের অভাবে গলগণ্ড বা ঘ্যাগ এবং শিশুরা ক্রেটিনিজম রোগে আক্রান্ত।",
      coreConcept: "খাদ্যে আয়োডিনের ঘাটতি এবং থাইরয়েড গ্রন্থির হরমোন সংকটের ফলাফল।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 101
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "গলগণ্ড রোগের জন্য দায়ী প্রধান খনিজ উপাদানের নাম লেখা।" },
      kha: { mark: 2, criteria: "শিশুদের ক্ষেত্রে ক্রেটিনিজম রোগ কীভাবে সৃষ্টি হয় তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে উল্লিখিত এলাকায় গলগণ্ড রোগ ছড়িয়ে পড়ার কারণ বিশদভাবে তুলে ধরা।" },
      gha: { mark: 4, criteria: "জনস্বার্থে ওই এলাকার মানুষের রোগ প্রতিরোধে সরকারি ও ব্যক্তিগত পর্যায়ে কী কী পদক্ষেপ নেওয়া যায় তা মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_cq_09",
    topicId: "top_ssc_biology_ch5_3",
    type: "CQ_CREATIVE",
    stem: "রাহাত সাহেব একজন ব্যাংকার। তার বয়স ৪০ বছর, ওজন ৭০ কেজি এবং উচ্চতা ১৭০ সেমি। তিনি সম্পূর্ণ পরিশ্রমহীন বসে থাকা জীবনযাপন করেন (সক্রিয়তার গুণক ১.২)। তার স্ত্রী শায়লা বেগম (বয়স ৩৫ বছর, ওজন ৬০ কেজি, উচ্চতা ১৬০ সেমি) প্রতিদিন ঘরে প্রচুর কাজ করেন এবং সপ্তাহে ৪ দিন ব্যায়াম করেন (সক্রিয়তার গুণক ১.৫৫)। তারা দুজনেই নিজেদের দৈনিক ক্যালরি চাহিদা ও সুস্বাস্থ্যের ভারসাম্য জানতে চাইলেন।",
    options: null,
    explanation: {
      directAnswer: "হ্যারিস-বেনেডিক্ট সূত্র প্রয়োগ করে উভয়ের BMR ও দৈনিক ক্যালরি চাহিদা নির্ণয় এবং BMI গণনা।",
      coreConcept: "BMR ও দৈনন্দিন শারীরিক পরিশ্রমের ওপর ভিত্তি করে ক্যালরি ব্যবস্থাপনার গুরুত্ব।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৩",
        pageNumber: 106
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "BMR কী তা নির্ভুলভাবে সংজ্ঞায়িত করা।" },
      kha: { mark: 2, criteria: "দৈনন্দিন পরিশ্রমের তারতম্য কীভাবে ক্যালরি চাহিদাকে প্রভাবিত করে তা বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "রাহাত সাহেবের BMR এবং তার দৈনিক প্রয়োজনীয় ক্যালরি হিসাব করা।" },
      gha: { mark: 4, criteria: "উভয়ের BMI নির্ণয়পূর্বক তাদের ওজনের স্বাস্থ্যগত অবস্থা ও খাদ্য ব্যবস্থাপনার তুলনা বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // TOPIC 5.4: মানব পরিপাকতন্ত্র ও খাদ্য পরিপাক ক্রিয়া (MCQs 37-48, CQs 10-12)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_5_37",
    topicId: "top_ssc_biology_ch5_4",
    type: "MCQ",
    stem: "পূর্ণবয়স্ক মানুষের একটি চোয়ালে মোট পেষণ বা মোলার (Molar) দাঁত কয়টি থাকে?",
    options: [
      { id: "opt_bio_5_37_a", text: "৪টি", isCorrect: false },
      { id: "opt_bio_5_37_b", text: "৬টি", isCorrect: true },
      { id: "opt_bio_5_37_c", text: "৮টি", isCorrect: false },
      { id: "opt_bio_5_37_d", text: "১২টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ৬টি।",
      coreConcept: "মানুষের প্রতি চোয়ালে ৩+৩ = ৬টি পেষণ দাঁত থাকে (উভয় চোয়ালে মোট ১২টি যার মধ্যে ৪টি আক্কেল দাঁত)।",
      distractorAnalysis: {
        opt_bio_5_37_a: "৪টি হলো প্রতি চোয়ালে প্রিমোলার বা ইনসিজর দাঁতের সংখ্যা।",
        opt_bio_5_37_c: "৮টি হলো উভয় চোয়ালে মোট প্রিমোলারের সংখ্যা।",
        opt_bio_5_37_d: "১২টি হলো উভয় চোয়ালে মোট মোলার দাঁতের সংখ্যা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 111
      },
      proTipShortcut: "প্রতি চোয়ালে মোলার = ৬টি; উভয় চোয়াল মিলে = ১২টি।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_38",
    topicId: "top_ssc_biology_ch5_4",
    type: "MCQ",
    stem: "মানবদেহের দাঁতের সবচেয়ে কঠিন ও মজবুত বহিরাবরণী স্তরের নাম কী?",
    options: [
      { id: "opt_bio_5_38_a", text: "ডেনটিন", isCorrect: false },
      { id: "opt_bio_5_38_b", text: "দন্তমজ্জা (Pulp)", isCorrect: false },
      { id: "opt_bio_5_38_c", text: "এনামেল (Enamel)", isCorrect: true },
      { id: "opt_bio_5_38_d", text: "সিমেন্ট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: এনামেল (Enamel)।",
      coreConcept: "দাঁতের মুকুটের ওপর অবস্থিত এনামেল হলো মানবদেহের সবচেয়ে শক্ত ও খনিজসমৃদ্ধ পদার্থ (ক্যালসিয়াম ফসফেট ও এপাটাইট নির্মিত)।",
      distractorAnalysis: {
        opt_bio_5_38_a: "ডেনটিন এনামেলের নিচে অবস্থিত প্রধান স্তর।",
        opt_bio_5_38_b: "দন্তমজ্জা রক্তজালক ও স্নায়ুযুক্ত নরম অংশ।",
        opt_bio_5_38_d: "সিমেন্ট দাঁতের মূলকে চোয়ালের অস্থির সাথে আটকে রাখে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 111
      },
      proTipShortcut: "দেহের সবচেয়ে শক্ত পদার্থ = দাঁতের এনামেল।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_39",
    topicId: "top_ssc_biology_ch5_4",
    type: "MCQ",
    stem: "লালারসে উপস্থিত টায়ালিন (স্যালাইভারি অ্যামাইলেজ) এনজাইম কোন খাদ্যকে মল্টোজে পরিণত করে?",
    options: [
      { id: "opt_bio_5_39_a", text: "কাঁচা সেলুলোজ", isCorrect: false },
      { id: "opt_bio_5_39_b", text: "সিদ্ধ শ্বেতসার বা স্টার্চ", isCorrect: true },
      { id: "opt_bio_5_39_c", text: "আমিষ বা প্রোটিন", isCorrect: false },
      { id: "opt_bio_5_39_d", text: "চর্বি বা ফ্যাট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সিদ্ধ শ্বেতসার বা স্টার্চ।",
      coreConcept: "টায়ালিন কেবল সিদ্ধ বা রান্না করা শ্বেতসারকে আংশিক ভেঙে মল্টোজে পরিণত করতে পারে।",
      distractorAnalysis: {
        opt_bio_5_39_a: "মানুষের দেহে সেলুলোজ পরিপাককারী সেলুলেজ এনজাইম নেই।",
        opt_bio_5_39_c: "মুখে আমিষ পরিপাক হয় না।",
        opt_bio_5_39_d: "মুখে চর্বি পরিপাককারী কোনো এনজাইম সক্রিয় থাকে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 112
      },
      proTipShortcut: "টায়ালিন = সিদ্ধ স্টার্চ → মল্টোজ।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_40",
    topicId: "top_ssc_biology_ch5_4",
    type: "MCQ",
    stem: "পৌষ্টিকনালির প্রাচীরের ছন্দোময় সংকোচন ও প্রসারণের ফলে খাদ্যবস্তুর নিচের দিকে নামাকে কী বলে?",
    options: [
      { id: "opt_bio_5_40_a", text: "অসমোসিস", isCorrect: false },
      { id: "opt_bio_5_40_b", text: "পেরিস্টালসিস (Peristalsis)", isCorrect: true },
      { id: "opt_bio_5_40_c", text: "ইমালসিফিকেশন", isCorrect: false },
      { id: "opt_bio_5_40_d", text: "ডিঅ্যামিনেশন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: পেরিস্টালসিস (Peristalsis)।",
      coreConcept: "অন্ননালি থেকে শুরু করে বৃহদান্ত্র পর্যন্ত পৌষ্টিকনালির পেশিস্তরের ঢেউখেলানো চলনকে পেরিস্টালসিস বলে।",
      distractorAnalysis: {
        opt_bio_5_40_a: "অসমোসিস হলো অভিস্রবণ।",
        opt_bio_5_40_c: "ইমালসিফিকেশন হলো পিত্তলবণ দ্বারা চর্বির কণা তৈরি।",
        opt_bio_5_40_d: "ডিঅ্যামিনেশন হলো অ্যামাইনো এসিডের রূপান্তর।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 112
      },
      proTipShortcut: "খাদ্যনালির পেশির ঢেউ = পেরিস্টালসিস।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_41",
    topicId: "top_ssc_biology_ch5_4",
    type: "MCQ",
    stem: "পাকস্থলীতে খাদ্য চূর্ণবিচূর্ণ হয়ে যে অম্লীয় ঘন অর্ধপাচিত খাদ্যমণ্ড তৈরি হয় তাকে কী বলে?",
    options: [
      { id: "opt_bio_5_41_a", text: "বোলুস (Bolus)", isCorrect: false },
      { id: "opt_bio_5_41_b", text: "কাইম বা মণ্ড (Chyme)", isCorrect: true },
      { id: "opt_bio_5_41_c", text: "কাইল (Chyle)", isCorrect: false },
      { id: "opt_bio_5_41_d", text: "পেপটোন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কাইম বা মণ্ড (Chyme)।",
      coreConcept: "পাকস্থলীর পেশির মন্থন ও গ্যাস্ট্রিক জুসের ক্রিয়ায় খাদ্য ঘন স্যুপ বা লেই সদৃশ কাইমে পরিণত হয়।",
      distractorAnalysis: {
        opt_bio_5_41_a: "বোলুস হলো মুখবিবরে চিবানো খাদ্যপিণ্ড যা গিলে ফেলা হয়।",
        opt_bio_5_41_c: "কাইল হলো ক্ষুদ্রান্ত্রের ক্ষারীয় তরল খাদ্যসার।",
        opt_bio_5_41_d: "পেপটোন হলো আংশিক পরিপাককৃত আমিষ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 113
      },
      proTipShortcut: "পাকস্থলীর খাদ্যমণ্ড = Chyme (কাইম)।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_42",
    topicId: "top_ssc_biology_ch5_4",
    type: "MCQ",
    stem: "পাকস্থলীর গ্যাস্ট্রিক জুসের হাইড্রোক্লোরিক এসিডের (HCl) প্রধান শারীরবৃত্তীয় কাজ কোনটি?",
    options: [
      { id: "opt_bio_5_42_a", text: "চর্বিকে ফ্যাটি এসিডে পরিণত করা", isCorrect: false },
      { id: "opt_bio_5_42_b", text: "নিষ্ক্রিয় পেপসিনোজেনকে সক্রিয় পেপসিনে রূপান্তর ও জীবাণু ধ্বংস", isCorrect: true },
      { id: "opt_bio_5_42_c", text: "স্টার্চকে সরাসরি গ্লুকোজে ভাঙা", isCorrect: false },
      { id: "opt_bio_5_42_d", text: "পিত্তথলি থেকে পিত্তরস নিঃসরণ বন্ধ করা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: নিষ্ক্রিয় পেপসিনোজেনকে সক্রিয় পেপসিনে রূপান্তর ও জীবাণু ধ্বংস।",
      coreConcept: "HCl অম্লীয় মাধ্যম (pH প্রায় ২) তৈরি করে পেপসিনোজেনকে সক্রিয় পেপসিনে রূপান্তর করে এবং খাদ্যের ব্যাকটেরিয়া ধ্বংস করে।",
      distractorAnalysis: {
        opt_bio_5_42_a: "চর্বি পরিপাকে লাইপেস দরকার, HCl নয়।",
        opt_bio_5_42_c: "স্টার্চ পরিপাকে অ্যামাইলেজ দরকার; অম্লীয় মাধ্যমে অ্যামাইলেজ কাজ করতে পারে না।",
        opt_bio_5_42_d: "অম্লীয় কাইম বরং ডিওডেনামে হরমোন ক্ষরণের মাধ্যমে পিত্ত নিঃসরণ বাড়ায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 113
      },
      proTipShortcut: "HCl = নিষ্ক্রিয় পেপসিনোজেন → সক্রিয় পেপসিন।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_43",
    topicId: "top_ssc_biology_ch5_4",
    type: "MCQ",
    stem: "পাকস্থলীতে সক্রিয় পেপসিন এনজাইম জটিল আমিষ বা প্রোটিনকে ভেঙে কোন সরলতর যৌগে পরিণত করে?",
    options: [
      { id: "opt_bio_5_43_a", text: "অ্যামাইনো এসিড", isCorrect: false },
      { id: "opt_bio_5_43_b", text: "প্রোটিওজ ও পেপটন", isCorrect: true },
      { id: "opt_bio_5_43_c", text: "গ্লুকোজ ও ফ্রুক্টোজ", isCorrect: false },
      { id: "opt_bio_5_43_d", text: "ফ্যাটি এসিড ও গ্লিসারল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: প্রোটিওজ ও পেপটন।",
      coreConcept: "পেপসিন প্রোটিনকে সরাসরি একক অ্যামাইনো এসিডে ভাঙে না; এটি মধ্যবর্তী পেপটাইড শিকল—প্রোটিওজ ও পেপটনে পরিণত করে।",
      distractorAnalysis: {
        opt_bio_5_43_a: "অ্যামাইনো এসিড ক্ষুদ্রান্ত্রে আন্ত্রিক পেপটিডেজের ক্রিয়ায় উৎপন্ন হয়।",
        opt_bio_5_43_c: "গ্লুকোজ ও ফ্রুক্টোজ শর্করার উৎপাদ।",
        opt_bio_5_43_d: "ফ্যাটি এসিড চর্বির উৎপাদ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 113
      },
      proTipShortcut: "পাকস্থলীর পেপসিন: প্রোটিন → প্রোটিওজ + পেপটন।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_44",
    topicId: "top_ssc_biology_ch5_4",
    type: "MCQ",
    stem: "শিশুদের পাকস্থলীতে দুগ্ধ প্রোটিন কেসিনকে জমাট বাঁধিয়ে প্যারাকেসিনে রূপান্তর করে কোন উৎসেচক?",
    options: [
      { id: "opt_bio_5_44_a", text: "টায়ালিন", isCorrect: false },
      { id: "opt_bio_5_44_b", text: "রেনিন (Rennin)", isCorrect: true },
      { id: "opt_bio_5_44_c", text: "ট্রিপসিন", isCorrect: false },
      { id: "opt_bio_5_44_d", text: "লাইপেস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: রেনিন (Rennin)।",
      coreConcept: "রেনিন এনজাইম তরল দুধের কেসিনকে জমাট বাঁধিয়ে দইয়ের মতো প্যারাকেসিনে রূপান্তর করে যাতে পেপসিন তার ওপর সহজে কাজ করতে পারে।",
      distractorAnalysis: {
        opt_bio_5_44_a: "টায়ালিন লালারসের শর্করা এনজাইম।",
        opt_bio_5_44_c: "ট্রিপসিন অগ্ন্যাশয় রসের আমিষ এনজাইম।",
        opt_bio_5_44_d: "লাইপেস স্নেহ পরিপাককারী এনজাইম।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 114
      },
      proTipShortcut: "রেনিন = দুধের কেসিন জমাট বাঁধা।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_45",
    topicId: "top_ssc_biology_ch5_4",
    type: "MCQ",
    stem: "ক্ষুদ্রান্ত্রের প্রথম ‘U’ আকৃতির অংশটির নাম কী?",
    options: [
      { id: "opt_bio_5_45_a", text: "ডিওডেনাম (Duodenum)", isCorrect: true },
      { id: "opt_bio_5_45_b", text: "জেজুনাম", isCorrect: false },
      { id: "opt_bio_5_45_c", text: "ইলিয়াম", isCorrect: false },
      { id: "opt_bio_5_45_d", text: "সিকাম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ডিওডেনাম (Duodenum)।",
      coreConcept: "ক্ষুদ্রান্ত্রের তিনটি অংশ: ডিওডেনাম (প্রথম U-আকৃতির অংশ), জেজুনাম (মধ্যবর্তী অংশ) এবং ইলিয়াম (সর্বশেষ দীর্ঘ অংশ)।",
      distractorAnalysis: {
        opt_bio_5_45_b: "জেজুনাম দ্বিতীয় অংশ।",
        opt_bio_5_45_c: "ইলিয়াম তৃতীয় ও সবচেয়ে দীর্ঘ অংশ।",
        opt_bio_5_45_d: "সিকাম হলো বৃহদান্ত্রের সূচনা অংশ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 114
      },
      proTipShortcut: "ক্ষুদ্রান্ত্র = ডিওডেনাম → জেজুনাম → ইলিয়াম (DJI)।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_46",
    topicId: "top_ssc_biology_ch5_4",
    type: "MCQ",
    stem: "অগ্ন্যাশয় রসে উপস্থিত কোন এনজাইমটি ক্ষারীয় মাধ্যমে প্রোটিন ও পেপটনকে ভেঙে সরল পেপটাইডে পরিণত করে?",
    options: [
      { id: "opt_bio_5_46_a", text: "পেপসিন", isCorrect: false },
      { id: "opt_bio_5_46_b", text: "ট্রিপসিন (Trypsin)", isCorrect: true },
      { id: "opt_bio_5_46_c", text: "টায়ালিন", isCorrect: false },
      { id: "opt_bio_5_46_d", text: "ল্যাকটেজ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ট্রিপসিন (Trypsin)।",
      coreConcept: "ট্রিপসিন অগ্ন্যাশয় রসে ক্ষরিত হয় এবং ক্ষুদ্রান্ত্রের ক্ষারীয় পরিবেশে পেপটন ও প্রোটিওজকে ক্ষুদ্র পেপটাইডে বিশ্লিষ্ট করে।",
      distractorAnalysis: {
        opt_bio_5_46_a: "পেপসিন অম্লীয় মাধ্যমে পাকস্থলীতে কাজ করে।",
        opt_bio_5_46_c: "টায়ালিন মুখের শর্করা এনজাইম।",
        opt_bio_5_46_d: "ল্যাকটেজ দুধের চিনি ল্যাকটোজ পরিপাক করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 115
      },
      proTipShortcut: "পাকস্থলীর অম্লীয় পেপসিন; ক্ষুদ্রান্ত্রের ক্ষারীয় ট্রিপসিন।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_47",
    topicId: "top_ssc_biology_ch5_4",
    type: "MCQ",
    stem: "স্নেহ বা চর্বি পরিপাকের ফলে সর্বশেষ কোন সরল উপাদানদ্বয় উৎপন্ন হয়?",
    options: [
      { id: "opt_bio_5_47_a", text: "গ্লুকোজ ও অ্যামাইনো এসিড", isCorrect: false },
      { id: "opt_bio_5_47_b", text: "ফ্যাটি এসিড ও গ্লিসারল", isCorrect: true },
      { id: "opt_bio_5_47_c", text: "ফ্রুক্টোজ ও ল্যাকটোজ", isCorrect: false },
      { id: "opt_bio_5_47_d", text: "পেপটন ও পলিপেপটাইড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ফ্যাটি এসিড ও গ্লিসারল।",
      coreConcept: "লাইপেস এনজাইম চর্বির এস্টার বন্ধন ভেঙে ১ অণু গ্লিসারল এবং ৩ অণু ফ্যাটি এসিড তৈরি করে যা কোষে শোষণযোগ্য।",
      distractorAnalysis: {
        opt_bio_5_47_a: "গ্লুকোজ শর্করা থেকে এবং অ্যামাইনো এসিড আমিষ থেকে উৎপন্ন হয়।",
        opt_bio_5_47_c: "ফ্রুক্টোজ ও ল্যাকটোজ শর্করার রূপ।",
        opt_bio_5_47_d: "পেপটন আমিষের অন্তর্বর্তী উৎপাদ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 115
      },
      proTipShortcut: "চর্বি → ফ্যাটি এসিড + গ্লিসারল।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_48",
    topicId: "top_ssc_biology_ch5_4",
    type: "MCQ",
    stem: "পাকস্থলীতে শর্করা এবং চর্বি জাতীয় খাদ্যের কোনো রাসায়নিক পরিপাক ঘটে না কেন?",
    options: [
      { id: "opt_bio_5_48_a", text: "পাকস্থলীতে কোনো এনজাইমই নিঃসৃত হয় না", isCorrect: false },
      { id: "opt_bio_5_48_b", text: "পাকস্থলীর গ্যাস্ট্রিক জুসে শর্করা ও চর্বি পরিপাককারী উপযুক্ত এনজাইম থাকে না এবং এর তীব্র অম্লীয় পরিবেশ লালা অ্যামাইলেজকে নিষ্ক্রিয় করে দেয়", isCorrect: true },
      { id: "opt_bio_5_48_c", text: "খাদ্য পাকস্থলীতে একেবারেই অবস্থান করে না", isCorrect: false },
      { id: "opt_bio_5_48_d", text: "পাকস্থলী কেবল পানি শোষণ করতে পারে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: উপযুক্ত এনজাইম অনুপস্থিতি এবং HCl এর অম্লীয়তায় লালা এনজাইমের নিষ্ক্রিয়তা।",
      coreConcept: "গ্যাস্ট্রিক জুসে মূলত প্রোটিওলাইটিক পেপসিন থাকে; লালারসের টায়ালিন HCl এর তীব্র অম্লীয় মাধ্যমে (pH ২) নিষ্ক্রিয় হয়ে যায় এবং পাকস্থলীতে কোনো অ্যামাইলেজ বা সক্রিয় লাইপেস থাকে না।",
      distractorAnalysis: {
        opt_bio_5_48_a: "পেপসিন ও রেনিনের মতো প্রোটিন এনজাইম নিঃসৃত হয়।",
        opt_bio_5_48_c: "খাদ্য ২ থেকে ৪ ঘণ্টা পাকস্থলীতে অবস্থান করে।",
        opt_bio_5_48_d: "পাকস্থলীতে মূলত প্রোটিন পরিপাক ঘটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 113
      },
      proTipShortcut: "পাকস্থলী কেবল আমিষের প্রাথমিক পরিপাকাগার।"
    },
    difficulty: "HARD",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // TOPIC 5.4 CREATIVE QUESTIONS (CQs 10-12)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_5_cq_10",
    topicId: "top_ssc_biology_ch5_4",
    type: "CQ_CREATIVE",
    stem: "রাকিব দুপুরের খাবারে ভাত, ডিম ও আলুভর্তা খেলো। খাদ্যনালির বিভিন্ন অংশে এই খাদ্য উপাদানগুলোর রাসায়নিক পরিবর্তনের বিবরণ শিক্ষক বোর্ডে একটি প্রবাহচিত্রের মাধ্যমে দেখালেন। শিক্ষক বললেন, “মুখবিবরে ভাতের আংশিক পরিবর্তন ঘটলেও ডিমের রাসায়নিক পরিবর্তন শুরু হয় পাকস্থলীতে। এরপর ক্ষুদ্রান্ত্রে অগ্ন্যাশয় রস ও পিত্তরসের উপস্থিতিতে সব ধরনের খাদ্যের পূর্ণাঙ্গ পরিপাক সম্পন্ন হয়।”",
    options: null,
    explanation: {
      directAnswer: "মুখে শর্করা (ভাত), পাকস্থলীতে প্রোটিন (ডিম) এবং ক্ষুদ্রান্ত্রে শর্করা, প্রোটিন ও ফ্যাট তিনটিরই পূর্ণাঙ্গ পরিপাক ঘটে।",
      coreConcept: "পৌষ্টিকনালির বিভিন্ন অংশে খাদ্য উপাদানের সুনির্দিষ্ট ও সুশৃঙ্খল রাসায়নিক পরিপাক ক্রিয়া।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 112
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "মানুষের দন্তসংকেতটি নির্ভুলভাবে লেখা।" },
      kha: { mark: 2, criteria: "পেরিস্টালসিস চলন খাদ্য পরিবহনে কীভাবে ভূমিকা রাখে তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "রাকিবের গৃহীত ডিমের প্রোটিন কীভাবে পাকস্থলীতে পরিপাক হয় তা এনজাইম ও এসিডের প্রতিক্রিয়াসহ বর্ণনা করা।" },
      gha: { mark: 4, criteria: "“ক্ষুদ্রান্ত্রই হলো খাদ্য পরিপাকের প্রধান ও চূড়ান্ত কেন্দ্র”—উদ্দীপকের আলোকে বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_cq_11",
    topicId: "top_ssc_biology_ch5_4",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান ক্লাসে শিক্ষক নবম শ্রেণির শিক্ষার্থীদের মানবদেহের পরিপাকতন্ত্রের মডেল দেখিয়ে বললেন, “এই J আকৃতির অঙ্গটিতে এমন একটি এসিড তৈরি হয় যা অনেক ধাতুকেও ক্ষয় করতে সক্ষম। কিন্তু অঙ্গটির নিজস্ব প্রাচীরের মিউকাস স্তর একে সুরক্ষিত রাখে। অঙ্গটি থেকে তৈরি হওয়া অম্লীয় খাদ্যমণ্ড যখন ক্ষুদ্রান্ত্রে প্রবেশ করে, তখন দুটি বিশেষ গ্রন্থির ক্ষরণ এসে অম্লতা প্রশমিত করে এবং নতুন একদল এনজাইমের কাজের ক্ষেত্র প্রস্তুত করে।”",
    options: null,
    explanation: {
      directAnswer: "অঙ্গটি পাকস্থলী, ক্ষরিত অ্যাসিড হলো HCl এবং দুটি গ্রন্থি হলো যকৃৎ ও অগ্ন্যাশয়।",
      coreConcept: "পাকস্থলীর অম্লীয় পরিবেশ, কাইম গঠন এবং ডিওডেনামে ক্ষারীয় রসে খাদ্য পরিপাক রূপান্তর।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 113
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "কাইম (Chyme) কী তা সংজ্ঞায়িত করা।" },
      kha: { mark: 2, criteria: "তীব্র অম্লীয় HCl থাকা সত্ত্বেও পাকস্থলীর প্রাচীর নিজে হজম হয় না কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "পাকস্থলীতে খাদ্য চূর্ণবিচূর্ণ ও রাসায়নিক পরিবর্তনের প্রক্রিয়া বর্ণনা করা।" },
      gha: { mark: 4, criteria: "উদ্দীপকে উল্লিখিত গ্রন্থি দুটির নিঃসৃত রসের ভূমিকা কীভাবে পরিপাক প্রক্রিয়াকে সফল করে তা বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_cq_12",
    topicId: "top_ssc_biology_ch5_4",
    type: "CQ_CREATIVE",
    stem: "আসিফ একটি তেল-চর্বিযুক্ত মোগলাই পরোটা খাওয়ার পর জীববিজ্ঞান শিক্ষককে জিজ্ঞাসা করলো, “স্যার, পরোটার তেলটুকু তো মুখে বা পাকস্থলীতে পরিপাক হলো না, এটি আসলে শরীরের কোথায় এবং কীভাবে পরিপাক হয়?” শিক্ষক বললেন, “তেল পরিপাকের জন্য প্রথমে পিত্তরসের মাধ্যমে চর্বির ইমালসিফিকেশন জরুরি, এরপর অগ্ন্যাশয় ও আন্ত্রিক রসের লাইপেস এনজাইম একে বিশ্লিষ্ট করে দুটি নির্দিষ্ট শোষণযোগ্য সরল অণুতে রূপান্তর করে।”",
    options: null,
    explanation: {
      directAnswer: "চর্বির পরিপাক ক্ষুদ্রান্ত্রে সম্পন্ন হয়; পিত্তলবণে ইমালসিফিকেশন ঘটে এবং লাইপেস চর্বিকে ফ্যাটি এসিড ও গ্লিসারলে ভাঙে।",
      coreConcept: "লিপিড পরিপাকে পিত্তলবণ ও লাইপেসের সুনির্দিষ্ট শারীরবৃত্তীয় সমন্বয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৪",
        pageNumber: 115
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "চর্বির ইমালসিফিকেশন কাকে বলে তা লেখা।" },
      kha: { mark: 2, criteria: "পিত্তরসে কোনো এনজাইম না থাকা সত্ত্বেও এটি পরিপাকের জন্য অপরিহার্য কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "ক্ষুদ্রান্ত্রে আসিফের গৃহীত চর্বিজাতীয় খাদ্যের রাসায়নিক পরিপাক সমীকরণসহ ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "যদি কোনো কারণে পিত্তনালি বন্ধ হয়ে যায়, তবে চর্বি পরিপাক ও শোষণে কী ধরনের বিপর্যয় ঘটবে তা মূল্যায়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  }
];
