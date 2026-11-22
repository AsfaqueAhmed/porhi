import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter3QuestionsBatch2: QuestionData[] = [
  // =========================================================================
  // Topic 3.2: ক্রোমোজোম রূপ (V, L, J, I) ও অ্যানাফেজ চলন [top_ssc_biology_ch3_2]
  // =========================================================================
  {
    id: "q_bio_3_29",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "অ্যানাফেজ ধাপে সেন্ট্রোমিয়ার ঠিক মাঝখানে অবস্থান করলে ক্রোমোজোমটি দেখতে ইংরেজি কোন অক্ষরের মতো দেখায়?",
    options: [
      { id: "opt_bio_3_29_a", text: "ইংরেজি V অক্ষরের মতো", isCorrect: true },
      { id: "opt_bio_3_29_b", text: "ইংরেজি L অক্ষরের মতো", isCorrect: false },
      { id: "opt_bio_3_29_c", text: "ইংরেজি J অক্ষরের মতো", isCorrect: false },
      { id: "opt_bio_3_29_d", text: "ইংরেজি I অক্ষরের মতো", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ইংরেজি V অক্ষরের মতো।",
      coreConcept: "সেন্ট্রোমিয়ার ক্রোমোজোমের ঠিক মাঝখানে অবস্থান করলে তাকে মেটাসেন্ট্রিক ক্রোমোজোম বলে। অ্যানাফেজ চলনে সেন্ট্রোমিয়ার মেরুর দিকে এগিয়ে যাওয়ার সময় দুটি সমান বাহু পেছনে বেঁকে গিয়ে ইংরেজি 'V' অক্ষরের রূপ নেয় (পৃষ্ঠা ৫৫)।",
      distractorAnalysis: {
        opt_bio_3_29_b: "L অক্ষরের মতো দেখায় সাব-মেটাসেন্ট্রিক ক্রোমোজোম, যেখানে সেন্ট্রোমিয়ার মাঝখানের কিছুটা পাশে থাকে।",
        opt_bio_3_29_c: "J অক্ষরের মতো দেখায় অ্যাক্রোসেন্ট্রিক ক্রোমোজোম, যেখানে সেন্ট্রোমিয়ার প্রান্তের খুব কাছে থাকে।",
        opt_bio_3_29_d: "I অক্ষরের মতো দেখায় টেলোসেন্ট্রিক ক্রোমোজোম, যেখানে সেন্ট্রোমিয়ার একেবারে শেষ প্রান্তে থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 55
      },
      proTipShortcut: "Meta = মাঝখান = সমান সমান দুই বাহু = ইংরেজি V!"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_30",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "যে ক্রোমোজোমের সেন্ট্রোমিয়ার এক প্রান্তের খুব কাছাকাছি অবস্থিত তাকে কী বলা হয়?",
    options: [
      { id: "opt_bio_3_30_a", text: "মেটাসেন্ট্রিক", isCorrect: false },
      { id: "opt_bio_3_30_b", text: "সাবমেটাসেন্ট্রিক", isCorrect: false },
      { id: "opt_bio_3_30_c", text: "অ্যাক্রোসেন্ট্রিক", isCorrect: true },
      { id: "opt_bio_3_30_d", text: "টেলোসেন্ট্রিক", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: অ্যাক্রোসেন্ট্রিক।",
      coreConcept: "সেন্ট্রোমিয়ার প্রান্তের খুব কাছাকাছি থাকলে তাকে অ্যাক্রোসেন্ট্রিক (Acrocentric) বলে এবং অ্যানাফেজ চলনে এটি ইংরেজি 'J' অক্ষরের মতো দেখায় (পৃষ্ঠা ৫৫)।",
      distractorAnalysis: {
        opt_bio_3_30_a: "মেটাসেন্ট্রিকের সেন্ট্রোমিয়ার ঠিক মাঝখানে থাকে (V)।",
        opt_bio_3_30_b: "সাবমেটাসেন্ট্রিকের সেন্ট্রোমিয়ার মাঝখান থেকে সামান্য একপাশে থাকে (L)।",
        opt_bio_3_30_d: "টেলোসেন্ট্রিকের সেন্ট্রোমিয়ার একেবারে শেষ প্রান্তে থাকে (I)।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 55
      },
      proTipShortcut: "Acro = প্রান্তের নিকটবর্তী = J আকৃতি!"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_31",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "ইংরেজি 'I' বা সোজা দণ্ডের মতো দেখায় নিচের কোন ক্রোমোজোমটি?",
    options: [
      { id: "opt_bio_3_31_a", text: "মেটাসেন্ট্রিক", isCorrect: false },
      { id: "opt_bio_3_31_b", text: "সাবমেটাসেন্ট্রিক", isCorrect: false },
      { id: "opt_bio_3_31_c", text: "অ্যাক্রোসেন্ট্রিক", isCorrect: false },
      { id: "opt_bio_3_31_d", text: "টেলোসেন্ট্রিক", isCorrect: true }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ঘ: টেলোসেন্ট্রিক।",
      coreConcept: "সেন্ট্রোমিয়ার একেবারে ক্রোমোজোমের শেষ প্রান্তে অবস্থিত হলে তাকে টেলোসেন্ট্রিক বলে। অ্যানাফেজে এটি ইংরেজি 'I' বর্ণের মতো দেখায় (পৃষ্ঠা ৫৫)।",
      distractorAnalysis: {
        opt_bio_3_31_a: "মেটাসেন্ট্রিক V আকৃতির।",
        opt_bio_3_31_b: "সাবমেটাসেন্ট্রিক L আকৃতির।",
        opt_bio_3_31_c: "অ্যাক্রোসেন্ট্রিক J আকৃতির।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 55
      },
      proTipShortcut: "Telo = প্রান্ত (Terminal) = সোজা লাঠির মতো I!"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_32",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "অ্যানাফেজ পর্যায়ের শেষের দিকে অপত্য ক্রোমোজোমসমূহের কোন পরিবর্তনটি লক্ষ্য করা যায়?",
    options: [
      { id: "opt_bio_3_32_a", text: "ক্রোমোজোমগুলো স্পিন্ডল যন্ত্রের মেরুপ্রান্তে অবস্থান নেয় এবং দৈর্ঘ্য বৃদ্ধি পায়", isCorrect: true },
      { id: "opt_bio_3_32_b", text: "ক্রোমোজোমগুলো আরও বেশি খাটো ও মোটা হতে থাকে", isCorrect: false },
      { id: "opt_bio_3_32_c", text: "সেন্ট্রোমিয়ার পুনরায় যুক্ত হয়ে যায়", isCorrect: false },
      { id: "opt_bio_3_32_d", text: "নিউক্লিয়ার মেমব্রেন বিলুপ্ত হয়ে যায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ক্রোমোজোমগুলো স্পিন্ডল যন্ত্রের মেরুপ্রান্তে অবস্থান নেয় এবং দৈর্ঘ্য বৃদ্ধি পায়।",
      coreConcept: "অ্যানাফেজ পর্যায়ের শেষের দিকে অপত্য ক্রোমোজোমগুলো স্পিন্ডল যন্ত্রের দুই মেরুপ্রান্তে অবস্থান নেয় এবং ক্রোমোজোমের দৈর্ঘ্য বৃদ্ধি পেতে থাকে (পৃষ্ঠা ৫৫)।",
      distractorAnalysis: {
        opt_bio_3_32_b: "সর্বাধিক মোটা ও খাটো থাকে মেটাফেজে, অ্যানাফেজের শেষে ক্রোমোজোম সরু ও লম্বা হতে শুরু করে।",
        opt_bio_3_32_c: "বিভক্ত সেন্ট্রোমিয়ার আর কখনই পুনরায় যুক্ত হয় না।",
        opt_bio_3_32_d: "নিউক্লিয়ার পর্দা প্রোফেজ-মেটাফেজেই বিলুপ্ত হয়ে গিয়েছিল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 55
      },
      proTipShortcut: "মেরুতে পৌঁছালেই ক্রোমোজোমের সংকোচন শেষ এবং দৈর্ঘ্য বৃদ্ধি শুরু!"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_33",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "অ্যানাফেজে ক্রোমোজোমের মেরুমুখী চলন নিশ্চিত করতে কোন তন্তুর সংকোচন ঘটে?",
    options: [
      { id: "opt_bio_3_33_a", text: "আকর্ষণ তন্তু বা ক্রোমোজোমাল তন্তু", isCorrect: true },
      { id: "opt_bio_3_33_b", text: "অবিচ্ছিন্ন স্পিন্ডল তন্তু", isCorrect: false },
      { id: "opt_bio_3_33_c", text: "সাইটোস্কেলিটন ইন্টারমিডিয়েট ফিলামেন্ট", isCorrect: false },
      { id: "opt_bio_3_33_d", text: "কোষপ্রাচীর মাইক্রোফাইব্রিল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: আকর্ষণ তন্তু বা ক্রোমোজোমাল তন্তু।",
      coreConcept: "সেন্ট্রোমিয়ারের সাথে যুক্ত আকর্ষণ তন্তু সংকুচিত হওয়া এবং সেন্ট্রোমিয়ারের নিজস্ব বিকর্ষণ বলের প্রভাবেই অপত্য ক্রোমোজোম মেরুর দিকে ধাবিত হয়।",
      distractorAnalysis: {
        opt_bio_3_33_b: "অবিচ্ছিন্ন স্পিন্ডল তন্তু মেরু থেকে মেরু পর্যন্ত বিস্তৃত থাকে কিন্তু ক্রোমোজোমকে টানে না।",
        opt_bio_3_33_c: "ইন্টারমিডিয়েট ফিলামেন্ট কোষের দৃঢ়তা দেয়, স্পিন্ডল টানে অংশ নেয় না।",
        opt_bio_3_33_d: "মাইক্রোফাইব্রিল কোষপ্রাচীরের উপাদান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 54
      },
      proTipShortcut: "টাকশন তন্তু টানলে ক্রোমোজোম মেরুর দিকে ছোটে।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_34",
    topicId: "top_ssc_biology_ch3_2",
    type: "MCQ",
    stem: "সাবমেটাসেন্ট্রিক ক্রোমোজোমে বাহু দুটির দৈর্ঘ্য কেমন হয়?",
    options: [
      { id: "opt_bio_3_34_a", text: "উভয় বাহু সম্পূর্ণ সমান", isCorrect: false },
      { id: "opt_bio_3_34_b", text: "একটি বাহু অপরটির চেয়ে কিছুটা দীর্ঘ ও একটি কিছুটা ছোট", isCorrect: true },
      { id: "opt_bio_3_34_c", text: "একটি বাহু নেই বললেই চলে", isCorrect: false },
      { id: "opt_bio_3_34_d", text: "বাহুগুলো বৃত্তাকারে যুক্ত থাকে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: একটি বাহু অপরটির চেয়ে কিছুটা দীর্ঘ ও একটি কিছুটা ছোট।",
      coreConcept: "সাবমেটাসেন্ট্রিক ক্রোমোজোমে সেন্ট্রোমিয়ার মাঝখান থেকে কিছুটা একপাশে সরে থাকায় একটি বাহু সামান্য বড় এবং অপর বাহুটি সামান্য ছোট হয়, যা ইংরেজি L অক্ষরের রূপ দেয়।",
      distractorAnalysis: {
        opt_bio_3_34_a: "সমান বাহু থাকে মেটাসেন্ট্রিকে (V)।",
        opt_bio_3_34_c: "একটি বাহু অতি ক্ষুদ্র থাকে অ্যাক্রোসেন্ট্রিকে (J)।",
        opt_bio_3_34_d: "ব্যাকটেরিয়ার ডিএনএ বৃত্তাকার, প্রকৃত কোষের ক্রোমোজোম নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 55
      },
      proTipShortcut: "Sub-meta = কিছুটা অসম বাহু = L আকৃতি!"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_35",
    topicId: "top_ssc_biology_ch3_2",
    type: "CQ_CREATIVE",
    stem: "শ্রেণিকক্ষে দলগত কাজ করার সময় শিক্ষক শিক্ষার্থীদের রঙিন সুতা দিয়ে ক্রোমোজোমের মেটাফেজ ও অ্যানাফেজ মডেল তৈরি করতে বললেন। সুমাইয়ার দল দুটি সমান সুতার মাঝখানে গিট দিল; কিন্তু তানিয়ার দল এক প্রান্তের খুব কাছে গিট দিল। পরে তারা গিট বরাবর সুতা দুটি আলাদা করে অ্যানাফেজ চলন প্রদর্শন করল।",
    options: null,
    explanation: {
      directAnswer: "সুমাইয়ার দল মেটাসেন্ট্রিক (V) এবং তানিয়ার দল অ্যাক্রোসেন্ট্রিক (J) ক্রোমোজোম মডেল তৈরি করেছে।",
      coreConcept: "পাঠ্যবইয়ের দলগত কাজ অনুসারে সুতার সাহায্যে সেন্ট্রোমিয়ারের অবস্থানভিত্তিক ক্রোমোজোমের ৪টি রূপ নির্মাণ ও বিশ্লেষণ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 56
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "মেটাসেন্ট্রিক ক্রোমোজোম কাকে বলে তা সংজ্ঞা আকারে লেখা।" },
      kha: { mark: 2, criteria: "অ্যানাফেজ চলনে সেন্ট্রোমিয়ার অগ্রগামী থাকে কেন তা বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "সুমাইয়ার দল ও তানিয়ার দলের নির্মিত মডেল দুটির গঠনগত বৈশিষ্ট্য ও ইংরেজি রূপ ছকে তুলনা করা।" },
      gha: { mark: 4, criteria: "পাঠ্যবইয়ের দলগত কাজের আলোকে অ্যানাফেজে ৪ ধরনের ক্রোমোজোম রূপের (V, L, J, I) সচিত্র কার্যপদ্ধতি মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 3.4: অনিয়ন্ত্রিত মাইটোসিস, টিউমার ও ক্যান্সার [top_ssc_biology_ch3_4]
  // =========================================================================
  {
    id: "q_bio_3_36",
    topicId: "top_ssc_biology_ch3_4",
    type: "MCQ",
    stem: "স্বাভাবিক কোষ বিভাজনের অভ্যন্তরীণ নিয়ন্ত্রণ ব্যবস্থা নষ্ট হলে নিচের কোনটি সৃষ্টি হয়?",
    options: [
      { id: "opt_bio_3_36_a", text: "টিউমার", isCorrect: true },
      { id: "opt_bio_3_36_b", text: "জাইগোট", isCorrect: false },
      { id: "opt_bio_3_36_c", text: "পরাগরেণু", isCorrect: false },
      { id: "opt_bio_3_36_d", text: "ক্লোরোপ্লাস্ট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: টিউমার।",
      coreConcept: "কোনো কারণে কোষ বিভাজনের নিয়ন্ত্রণ নষ্ট হয়ে গেলে অস্বাভাবিকভাবে কোষ বিভাজন চলতে থাকে। এর ফলে অস্বাভাবিক স্ফীত কোষপিণ্ড বা টিউমার সৃষ্টি হয় (পৃষ্ঠা ৫৮)।",
      distractorAnalysis: {
        opt_bio_3_36_b: "জাইগোট হলো স্বাভাবিক যৌন জননের ফল।",
        opt_bio_3_36_c: "পরাগরেণু উদ্ভিদের জননকোষ।",
        opt_bio_3_36_d: "ক্লোরোপ্লাস্ট সালোকসংশ্লেষণকারী অঙ্গাণু।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "অনিয়ন্ত্রিত বিভাজন = পিণ্ডাকার কোষপুঞ্জ বা টিউমার!"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_37",
    topicId: "top_ssc_biology_ch3_4",
    type: "MCQ",
    stem: "পাঠ্যবই অনুযায়ী প্রাণঘাতী ক্ষতিকর টিউমারকে কী বলা হয়?",
    options: [
      { id: "opt_bio_3_37_a", text: "ক্যান্সার (Cancer)", isCorrect: true },
      { id: "opt_bio_3_37_b", text: "পলিপ", isCorrect: false },
      { id: "opt_bio_3_37_c", text: "বেনাইন টিউমার", isCorrect: false },
      { id: "opt_bio_3_37_d", text: "সিস্ট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ক্যান্সার (Cancer)।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ৫৮ অনুসারে টিউমার প্রাণঘাতী হলে তাকে ক্যান্সার বলে।",
      distractorAnalysis: {
        opt_bio_3_37_b: "পলিপ হলো শ্লৈষ্মিক ঝিল্লির ছোট নির্দোষ উপবৃদ্ধি।",
        opt_bio_3_37_c: "বেনাইন টিউমার প্রাণঘাতী নয় এবং দেহের অন্যান্য অঙ্গে ছড়ায় না।",
        opt_bio_3_37_d: "সিস্ট হলো তরলপূর্ণ থলি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "প্রাণঘাতী ক্ষতিকর টিউমার = ক্যান্সার!"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_38",
    topicId: "top_ssc_biology_ch3_4",
    type: "MCQ",
    stem: "যেসব রাসায়নিক উপাদান বা বাহ্যিক প্রভাবক জীবকোষে ক্যান্সার সৃষ্টিতে ভূমিকা রাখে তাদের কী বলে?",
    options: [
      { id: "opt_bio_3_38_a", text: "অ্যালার্জেন", isCorrect: false },
      { id: "opt_bio_3_38_b", text: "কার্সিনোজেন (Carcinogen)", isCorrect: true },
      { id: "opt_bio_3_38_c", text: "অ্যান্টিবডি", isCorrect: false },
      { id: "opt_bio_3_38_d", text: "হরমোন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কার্সিনোজেন (Carcinogen)।",
      coreConcept: "ক্যান্সার উৎপাদক পদার্থসমূহকে কার্সিনোজেন বলা হয়। যেমন তামাকের বিষাক্ত টার, আর্সেনিক ও ক্ষতিকর অতিবেগুনি রশ্মি।",
      distractorAnalysis: {
        opt_bio_3_38_a: "অ্যালার্জেন অ্যালার্জি তৈরি করে, সরাসরি ক্যান্সার নয়।",
        opt_bio_3_38_c: "অ্যান্টিবডি রোগ প্রতিরোধে কাজ করে।",
        opt_bio_3_38_d: "হরমোন জৈব রাসায়নিক বার্তাবাহক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "Carcinoma (ক্যান্সার) তৈরি করে = Carcinogen!"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_39",
    topicId: "top_ssc_biology_ch3_4",
    type: "MCQ",
    stem: "ম্যালিগন্যান্ট টিউমারের অন্যতম প্রধান জীবনঘাতী বৈশিষ্ট্য কোনটি?",
    options: [
      { id: "opt_bio_3_39_a", text: "একটি নির্দিষ্ট পর্দা দিয়ে আবৃত থাকে", isCorrect: false },
      { id: "opt_bio_3_39_b", text: "আশপাশের সুস্থ টিস্যুতে আক্রমণ করে ও রক্তপ্রবাহে সারা দেহে ছড়ায়", isCorrect: true },
      { id: "opt_bio_3_39_c", text: "এর কোষে কোনো নিউক্লিয়াস থাকে না", isCorrect: false },
      { id: "opt_bio_3_39_d", text: "কোষ বিভাজনের হার অত্যন্ত ধীরগতির হয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: আশপাশের সুস্থ টিস্যুতে আক্রমণ করে ও রক্তপ্রবাহে সারা দেহে ছড়ায়।",
      coreConcept: "ম্যালিগন্যান্ট টিউমারের কোষগুলো স্বাভাবিক কলা ধ্বংস করে এবং রক্ত বা লসিকার মাধ্যমে অন্যান্য অঙ্গে ছড়িয়ে পড়ে (মেটাস্ট্যাসিস), যা বেনাইন টিউমারে ঘটে না।",
      distractorAnalysis: {
        opt_bio_3_39_a: "নির্দিষ্ট পর্দায় আবৃত থাকা বেনাইন টিউমারের বৈশিষ্ট্য।",
        opt_bio_3_39_c: "ম্যালিগন্যান্ট কোষে বিশৃঙ্খল নিউক্লিয়াস থাকে।",
        opt_bio_3_39_d: "ম্যালিগন্যান্ট টিউমারে কোষ বিভাজনের হার অত্যন্ত দ্রুত ও অস্বাভাবিক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "Malignant = আগ্রাসী, ছড়িয়ে পড়া ক্যান্সার!"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_40",
    topicId: "top_ssc_biology_ch3_4",
    type: "MCQ",
    stem: "নিচের কোন ভাইরাসটি কোষে অনিয়ন্ত্রিত বিভাজন উস্কে দিয়ে জরায়ু-মুখের ক্যান্সার সৃষ্টিতে ভূমিকা রাখে?",
    options: [
      { id: "opt_bio_3_40_a", text: "টিএমভি (TMV)", isCorrect: false },
      { id: "opt_bio_3_40_b", text: "হিউম্যান প্যাপিলোমা ভাইরাস (HPV)", isCorrect: true },
      { id: "opt_bio_3_40_c", text: "টি-২ ফাজ", isCorrect: false },
      { id: "opt_bio_3_40_d", text: "ইনফ্লুয়েঞ্জা ভাইরাস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: হিউম্যান প্যাপিলোমা ভাইরাস (HPV)।",
      coreConcept: "প্যাপিলোমা ভাইরাস মানবদেহের কোষে প্রবেশ করে স্বাভাবিক কোষচক্রের নিয়ন্ত্রণ নষ্ট করে এবং টিউমার ও ক্যান্সার সৃষ্টিতে ভূমিকা রাখে।",
      distractorAnalysis: {
        opt_bio_3_40_a: "টিএমভি হলো তামাকের মোজাইক রোগ সৃষ্টিকারী উদ্ভিদ ভাইরাস।",
        opt_bio_3_40_c: "টি-২ ফাজ ব্যাকটেরিয়া আক্রমণকারী ভাইরাস।",
        opt_bio_3_40_d: "ইনফ্লুয়েঞ্জা ভাইরাস ফ্লু বা সাধারণ সর্দি-কাশি ঘটায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "HPV = Human Papilloma Virus → অনকোজেনিক ভাইরাস!"
    },
    difficulty: "HARD",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_41",
    topicId: "top_ssc_biology_ch3_4",
    type: "MCQ",
    stem: "সূর্যের আলোর কোন ক্ষতিকর উপাদানটি ত্বকের কোষে মিউটেশন ঘটিয়ে ক্যান্সার ঝুঁকি বাড়ায়?",
    options: [
      { id: "opt_bio_3_41_a", text: "দৃশ্যমান লাল আলো", isCorrect: false },
      { id: "opt_bio_3_41_b", text: "অতিবেগুনি রশ্মি (UV rays)", isCorrect: true },
      { id: "opt_bio_3_41_c", text: "অবলোহিত রশ্মি (IR rays)", isCorrect: false },
      { id: "opt_bio_3_41_d", text: "বেতার তরঙ্গ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অতিবেগুনি রশ্মি (UV rays)।",
      coreConcept: "তীব্র অতিবেগুনি রশ্মি ডিএনএ-এর নিউক্লিওটাইড বন্ধনী ভেঙে দিয়ে মিউটেশন ঘটায়, ফলে অনিয়ন্ত্রিত মাইটোসিস সূচিত হয়ে ত্বকের ক্যান্সার হতে পারে।",
      distractorAnalysis: {
        opt_bio_3_41_a: "দৃশ্যমান আলো ক্ষতিকর নয়, সালোকসংশ্লেষণে ব্যবহৃত হয়।",
        opt_bio_3_41_c: "অবলোহিত রশ্মি প্রধানত তাপীয় অনুভূতি সৃষ্টি করে।",
        opt_bio_3_41_d: "বেতার তরঙ্গ কম শক্তির দীর্ঘ তরঙ্গ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "UV rays = ডিএনএ বিকৃতি ও মিউটেশনের কারণ।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_42",
    topicId: "top_ssc_biology_ch3_4",
    type: "MCQ",
    stem: "ধূমপান ও জর্দা সেবনের ফলে ফুসফুস ও মুখের ক্যান্সারের জন্য প্রধানত দায়ী কোনটি?",
    options: [
      { id: "opt_bio_3_42_a", text: "গ্লুকোজ ও শ্বেতসার", isCorrect: false },
      { id: "opt_bio_3_42_b", text: "তামাকের ক্ষতিকর নিকোটিন, টার ও রাসায়নিক বিষ", isCorrect: true },
      { id: "opt_bio_3_42_c", text: "ভিটামিন সি", isCorrect: false },
      { id: "opt_bio_3_42_d", text: "অক্সিজেন গ্যাস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: তামাকের ক্ষতিকর নিকোটিন, টার ও রাসায়নিক বিষ।",
      coreConcept: "তামাকের ধোঁয়ায় বহুবিধ ক্ষতিকর কার্সিনোজেনিক হাইড্রোকার্বন ও টার থাকে যা কোষচক্র নিয়ন্ত্রণকারী জিনকে বিকৃত করে ক্যান্সার সৃষ্টি করে।",
      distractorAnalysis: {
        opt_bio_3_42_a: "গ্লুকোজ ও শ্বেতসার স্বাভাবিক খাদ্য উপাদান।",
        opt_bio_3_42_c: "ভিটামিন সি অ্যান্টিঅক্সিডেন্ট।",
        opt_bio_3_42_d: "অক্সিজেন জীবনধারণের গ্যাস।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "তামাক = শক্তিশালী কার্সিনোজেন।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_43",
    topicId: "top_ssc_biology_ch3_4",
    type: "MCQ",
    stem: "ক্যান্সার কোষের অস্বাভাবিক আচরণের অন্যতম প্রমাণ কোনটি?",
    options: [
      { id: "opt_bio_3_43_a", text: "নির্দিষ্ট আয়ুষ্কাল শেষে কোষগুলো আত্মহত্যা করে (অ্যাপোপটোসিস)", isCorrect: false },
      { id: "opt_bio_3_43_b", text: "কোষগুলো স্বাভাবিক কোষ সংকেত উপেক্ষা করে অবিরাম বিভাজিত হয়", isCorrect: true },
      { id: "opt_bio_3_43_c", text: "এরা কেবল খাদ্য তৈরি করতে পারে", isCorrect: false },
      { id: "opt_bio_3_43_d", text: "এরা স্পিন্ডল তন্তু তৈরি করতে পারে না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কোষগুলো স্বাভাবিক কোষ সংকেত উপেক্ষা করে অবিরাম বিভাজিত হয়।",
      coreConcept: "ক্যান্সার কোষের বিভাজন কোনো জৈবিক নিয়ন্ত্রণের তোয়াক্কা করে না; এরা পুষ্টি শোষণ করে অস্বাভাবিক দ্রুততায় সংখ্যাবৃদ্ধি চালিয়ে যায়।",
      distractorAnalysis: {
        opt_bio_3_43_a: "ক্যান্সার কোষে স্বাভাবিক অ্যাপোপটোসিস (প্রোগ্রামড সেল ডেথ) নষ্ট হয়ে যায়।",
        opt_bio_3_43_c: "প্রাণিকোষে খাদ্য তৈরির ক্ষমতা নেই।",
        opt_bio_3_43_d: "এরা দ্রুত বিভাজনের জন্য স্পিন্ডল যন্ত্র ব্যবহার করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "ক্যান্সার কোষ = নিয়ন্ত্রণহীন অবিরাম বিভাজনকারী অমর কোষ!"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_44",
    topicId: "top_ssc_biology_ch3_4",
    type: "MCQ",
    stem: "নিচের কোন বক্তব্যটি বৈজ্ঞানিকভাবে সঠিক?",
    options: [
      { id: "opt_bio_3_44_a", text: "সব টিউমারই নিশ্চিত ক্যান্সার", isCorrect: false },
      { id: "opt_bio_3_44_b", text: "সব ক্যান্সারই অস্বাভাবিক কোষের উপবৃদ্ধি, কিন্তু সব টিউমার ক্যান্সার নয়", isCorrect: true },
      { id: "opt_bio_3_44_c", text: "টিউমারে কোনো কোষ বিভাজন ঘটে না", isCorrect: false },
      { id: "opt_bio_3_44_d", text: "মাইটোসিস কখনোই অনিয়ন্ত্রিত হতে পারে না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সব ক্যান্সারই অস্বাভাবিক কোষের উপবৃদ্ধি, কিন্তু সব টিউমার ক্যান্সার নয়।",
      coreConcept: "টিউমার বেনাইনও হতে পারে যা ক্ষতিকর নয়। কেবল ম্যালিগন্যান্ট বা প্রাণঘাতী টিউমারকেই ক্যান্সার বলা হয় (পৃষ্ঠা ৫৮)।",
      distractorAnalysis: {
        opt_bio_3_44_a: "বেনাইন টিউমার ক্যান্সার নয়।",
        opt_bio_3_44_c: "টিউমার অনিয়ন্ত্রিত কোষ বিভাজনের মাধ্যমেই গড়ে ওঠে।",
        opt_bio_3_44_d: "মাইটোসিস নিয়ন্ত্রণহীন হয়ে টিউমার ও ক্যান্সার সৃষ্টি করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      },
      proTipShortcut: "টিউমার দুই রকম: বেনাইন (নির্দোষ) ও ম্যালিগন্যান্ট (ক্যান্সার)!"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_45",
    topicId: "top_ssc_biology_ch3_4",
    type: "CQ_CREATIVE",
    stem: "৫০ বছর বয়সী শওকত সাহেব দীর্ঘদিন ধরে নিয়মিত তামাক ও চুন দিয়ে জর্দা সেবন করতেন। সম্প্রতি তার গালে একটি শক্ত মাংসপিণ্ড দেখা দেয় এবং সেটি আশপাশের টিস্যু আক্রমণ করে ঘা সৃষ্টি করে। চিকিৎসক বায়োপসি পরীক্ষার পর জানালেন এটি একটি ক্ষতিকর ম্যালিগন্যান্ট টিউমার।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে তামাকের ক্ষতিকর কার্সিনোজেনের প্রভাবে ম্যালিগন্যান্ট টিউমার তথা ক্যান্সার সৃষ্টির ঘটনা আলোচিত হয়েছে।",
      coreConcept: "অনিয়ন্ত্রিত মাইটোসিস, টিউমারের শ্রেণিবিভাগ এবং কার্সিনোজেনের ভূমিকা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "কার্সিনোজেন কী তা সংজ্ঞা আকারে লেখা।" },
      kha: { mark: 2, criteria: "বেনাইন টিউমার ও ম্যালিগন্যান্ট টিউমারের মধ্যে দুটি প্রধান পার্থক্য ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "শওকত সাহেবের গালে মাংসপিণ্ড সৃষ্টির পেছনের কোষীয় বিভাজন প্রক্রিয়াটি পাঠ্যবইয়ের আলোকে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "“শওকত সাহেবের অসচেতন জীবনযাপনই তার এই প্রাণঘাতী পরিণতির জন্য দায়ী”—বিশ্লেষণমূলক মতামত দেওয়া।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_46",
    topicId: "top_ssc_biology_ch3_4",
    type: "CQ_CREATIVE",
    stem: "পাঠ্যবইয়ের ৬৩ পৃষ্ঠার নমুনা প্রশ্ন: একটি অণুবীক্ষণিক পর্যবেক্ষণে দেখা গেল চিত্র A-তে কোষের ক্রোমোজোম মেরুর দিকে যাচ্ছে এবং চিত্র B-তে একটি ক্ষতস্থান সংলগ্ন অস্বাভাবিক কোষবৃদ্ধি (উপবৃদ্ধি) দেখা যাচ্ছে।",
    options: null,
    explanation: {
      directAnswer: "চিত্র A হলো অ্যানাফেজ পর্যায় এবং চিত্র B হলো অনিয়ন্ত্রিত মাইটোসিসজনিত টিউমার।",
      coreConcept: "স্বাভাবিক মাইটোসিস বনাম অস্বাভাবিক অনিয়ন্ত্রিত কোষ বিভাজনের তুলনা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২ ও নমুনা প্রশ্ন",
        pageNumber: 63
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ইন্টারফেজ কাকে বলে তা লেখা।" },
      kha: { mark: 2, criteria: "মাইটোসিস কেন অবিরত চলতে পারে না—ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "চিত্র A-তে প্রদর্শিত ধাপটির শনাক্তকারী বৈশিষ্ট্য বর্ণনা করা।" },
      gha: { mark: 4, criteria: "চিত্র B-তে প্রদর্শিত উপবৃদ্ধি সৃষ্টির মূল জৈবিক কারণ বিস্তারিত বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "পাঠ্যবই সৃজনশীল ১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 3.5: মিয়োসিস হ্রাসমূলক বিভাজন ও হ্যাপ্লয়েড-ডিপ্লয়েড চক্র [top_ssc_biology_ch3_5]
  // =========================================================================
  {
    id: "q_bio_3_47",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "মিয়োসিস কোষ বিভাজনের একটি সম্পূর্ণ চক্রে নিউক্লিয়াস ও ক্রোমোজোম যথাক্রমে কয়বার করে বিভাজিত হয়?",
    options: [
      { id: "opt_bio_3_47_a", text: "নিউক্লিয়াস একবার, ক্রোমোজোম দুইবার", isCorrect: false },
      { id: "opt_bio_3_47_b", text: "নিউক্লিয়াস দুইবার, ক্রোমোজোম একবার", isCorrect: true },
      { id: "opt_bio_3_47_c", text: "উভয়ই একবার করে", isCorrect: false },
      { id: "opt_bio_3_47_d", text: "উভয়ই দুইবার করে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: নিউক্লিয়াস দুইবার, ক্রোমোজোম একবার।",
      coreConcept: "মিয়োসিসে নিউক্লিয়াস পর পর দুবার বিভক্ত হয় কিন্তু ক্রোমোজোম মাত্র একবার বিভক্ত হয়। ফলে উৎপন্ন ৪টি অপত্য কোষে ক্রোমোজোম সংখ্যা অর্ধেক হয়ে যায় (পৃষ্ঠা ৫৯)।",
      distractorAnalysis: {
        opt_bio_3_47_a: "এটি ভুল ক্রম, নিউক্লিয়াস বেশি বিভক্ত হয়।",
        opt_bio_3_47_c: "উভয়ই একবার বিভাজিত হয় মাইটোসিসে।",
        opt_bio_3_47_d: "উভয়ই দুইবার বিভাজিত হলে ক্রোমোজোম সংখ্যা সমান থেকে যেত, অর্ধেক হতো না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 59
      },
      proTipShortcut: "মিয়োসিস রুল: নিউক্লিয়াস ২ বার, ক্রোমোজোম ১ বার → ফলাফল অর্ধেক (n)!"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_48",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "মিয়োসিস বিভাজনের চূড়ান্ত ফল হিসেবে একটি ডিপ্লয়েড মাতৃকোষ থেকে কয়টি অপত্য কোষ সৃষ্টি হয়?",
    options: [
      { id: "opt_bio_3_48_a", text: "২টি ডিপ্লয়েড কোষ", isCorrect: false },
      { id: "opt_bio_3_48_b", text: "২টি হ্যাপ্লয়েড কোষ", isCorrect: false },
      { id: "opt_bio_3_48_c", text: "৪টি হ্যাপ্লয়েড কোষ", isCorrect: true },
      { id: "opt_bio_3_48_d", text: "৪টি ডিপ্লয়েড কোষ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৪টি হ্যাপ্লয়েড কোষ।",
      coreConcept: "মিয়োসিস বিভাজনে একটি মাতৃকোষ থেকে ৪টি অপত্য কোষ পাওয়া যায়, যেগুলোর প্রতিটিই মাতৃকোষের অর্ধেক সংখ্যক ক্রোমোজোম (n) ধারণ করে (পৃষ্ঠা ৫৯)।",
      distractorAnalysis: {
        opt_bio_3_48_a: "২টি ডিপ্লয়েড কোষ মাইটোসিসে পাওয়া যায়।",
        opt_bio_3_48_b: "প্রথম বিভাজনে ২টি কোষ তৈরি হলেও চূড়ান্তভাবে মোট ৪টি হয়।",
        opt_bio_3_48_d: "অপত্য কোষে ক্রোমোজোম ডিপ্লয়েড থাকে না, হ্যাপ্লয়েড হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 59
      },
      proTipShortcut: "মিয়োসিসের আউটপুট = ৪টি হ্যাপ্লয়েড (n) গ্যামেট!"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_49",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "মিয়োসিস বিভাজনের কোন ধাপে ক্রোমোজোম সংখ্যার প্রকৃত হ্রাস ঘটে?",
    options: [
      { id: "opt_bio_3_49_a", text: "প্রথম বিভাজনে (মিয়োসিস-১)", isCorrect: true },
      { id: "opt_bio_3_49_b", text: "দ্বিতীয় বিভাজনে (মিয়োসিস-২)", isCorrect: false },
      { id: "opt_bio_3_49_c", text: "ইন্টারকাইনেসিসে", isCorrect: false },
      { id: "opt_bio_3_49_d", text: "সাইটোকাইনেসিস-২ এ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রথম বিভাজনে (মিয়োসিস-১)।",
      coreConcept: "প্রথমবারে নিউক্লিয়াসের ক্রোমোজোম সংখ্যায় অর্ধেক হয়ে যায় (হ্রাস বিভাজন)। দ্বিতীয় বিভাজনটি মূলত মাইটোসিসের অনুরূপ সমবিভাজন (পৃষ্ঠা ৫৯-৬০)।",
      distractorAnalysis: {
        opt_bio_3_49_b: "দ্বিতীয় বিভাজন সমবিভাজন, সেখানে ক্রোমোজোম আর কমে না।",
        opt_bio_3_49_c: "ইন্টারকাইনেসিস দুটি বিভাজনের মধ্যবর্তী বিশ্রামকাল।",
        opt_bio_3_49_d: "সাইটোকাইনেসিস সাইটোপ্লাজম বিভাজন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 59
      },
      proTipShortcut: "মিয়োসিস-১ = আসল হ্রাসমূলক বিভাজন (2n → n)!"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_50",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "যদি একটি জীবের দেহকোষে ক্রোমোজোম সংখ্যা ৪ হয় এবং জননকোষ তৈরিতে মিয়োসিস না হতো, তবে জাইগোটে ক্রোমোজোম সংখ্যা কত হতো?",
    options: [
      { id: "opt_bio_3_50_a", text: "২", isCorrect: false },
      { id: "opt_bio_3_50_b", text: "৪", isCorrect: false },
      { id: "opt_bio_3_50_c", text: "৮", isCorrect: true },
      { id: "opt_bio_3_50_d", text: "১৬", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৮।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ৬০-এর উদাহরণ: পুং ও স্ত্রী জননকোষ যদি ৪টি করে ক্রোমোজোম বহন করত, তবে মিলনের ফলে জাইগোটে ক্রোমোজোম সংখ্যা হতো ৪ + ৪ = ৮ (মাতৃজীবের দ্বিগুণ)।",
      distractorAnalysis: {
        opt_bio_3_50_a: "২ হলো হ্যাপ্লয়েড গ্যামেটের ক্রোমোজোম সংখ্যা।",
        opt_bio_3_50_b: "৪ হলো স্বাভাবিক ডিপ্লয়েড জীবের স্বাভাবিক ক্রোমোজোম সংখ্যা।",
        opt_bio_3_50_d: "১৬ হবে তার পরের প্রজন্মে যদি দ্বিগুণ হতে থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 60
      },
      proTipShortcut: "মিয়োসিস না হলে প্রতি প্রজন্মে ক্রোমোজোম দ্বিগুণ হয়ে জীব ধ্বংস হতো!"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_51",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "সপুষ্পক উদ্ভিদের কোন কোন অঙ্গে মিয়োসিস কোষ বিভাজন সংঘটিত হয়?",
    options: [
      { id: "opt_bio_3_51_a", text: "মূল ও কাণ্ডের অগ্রভাগে", isCorrect: false },
      { id: "opt_bio_3_51_b", text: "পরাগধানী ও ডিম্বকে", isCorrect: true },
      { id: "opt_bio_3_51_c", text: "পাতার মেসোফিল কলায়", isCorrect: false },
      { id: "opt_bio_3_51_d", text: "ফলের ত্বকে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: পরাগধানী ও ডিম্বকে।",
      coreConcept: "সপুষ্পক উদ্ভিদের পরাগধানীর মধ্যে পরাগরেণু এবং ডিম্বকের মধ্যে ডিম্বাণু তৈরির সময় জনন মাতৃকোষে মিয়োসিস ঘটে (পৃষ্ঠা ৬০)।",
      distractorAnalysis: {
        opt_bio_3_51_a: "মূল ও কাণ্ডের অগ্রভাগে মাইটোসিস ঘটে।",
        opt_bio_3_51_c: "মেসোফিল কলায় সালোকসংশ্লেষণ ঘটে।",
        opt_bio_3_51_d: "ফলের ত্বক উদ্ভিদের স্থায়ী দেহকোষ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 60
      },
      proTipShortcut: "উদ্ভিদে মিয়োসিস = পুংস্তবকের পরাগধানী ও স্ত্রীস্তবকের ডিম্বক!"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_52",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "উন্নত প্রাণিদেহের কোন অঙ্গগুলোতে মিয়োসিস বিভাজন ঘটে?",
    options: [
      { id: "opt_bio_3_52_a", text: "যকৃত ও বৃক্কে", isCorrect: false },
      { id: "opt_bio_3_52_b", text: "শুক্রাশয় ও ডিম্বাশয়ে", isCorrect: true },
      { id: "opt_bio_3_52_c", text: "হৃৎপিণ্ড ও ফুসফুসে", isCorrect: false },
      { id: "opt_bio_3_52_d", text: "অস্থিমজ্জা ও প্লীহায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: শুক্রাশয় ও ডিম্বাশয়ে।",
      coreConcept: "উন্নত প্রাণিদেহের শুক্রাশয়ে শুক্রাণু এবং ডিম্বাশয়ে ডিম্বাণু তৈরির জনন মাতৃকোষে মিয়োসিস ঘটে (পৃষ্ঠা ৬০)।",
      distractorAnalysis: {
        opt_bio_3_52_a: "যকৃত ও বৃক্ক দেহকোষের অঙ্গ, যেখানে মাইটোসিস ঘটে।",
        opt_bio_3_52_c: "হৃৎপিণ্ড ও ফুসফুসে কেবল দৈহিক কোষ রয়েছে।",
        opt_bio_3_52_d: "অস্থিমজ্জায় রক্তকোষ তৈরির স্টেম সেল মাইটোসিসে বাড়ে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 60
      },
      proTipShortcut: "প্রাণীর জননাঙ্গ = শুক্রাশয় ও ডিম্বাশয়ে মিয়োসিস।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_53",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "ছত্রাক, শৈবাল ও মসজাতীয় হ্যাপ্লয়েড উদ্ভিদের জীবনচক্রে কখন মিয়োসিস ঘটে?",
    options: [
      { id: "opt_bio_3_53_a", text: "গ্যামেট তৈরির পূর্বে", isCorrect: false },
      { id: "opt_bio_3_53_b", text: "ডিপ্লয়েড জাইগোটে হ্যাপ্লয়েড রেণু তৈরির সময়", isCorrect: true },
      { id: "opt_bio_3_53_c", text: "কেবল অঙ্গজ প্রজননে", isCorrect: false },
      { id: "opt_bio_3_53_d", text: "এদের জীবনচক্রে কখনই মিয়োসিস ঘটে না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ডিপ্লয়েড জাইগোটে হ্যাপ্লয়েড রেণু তৈরির সময়।",
      coreConcept: "নিম্নশ্রেণির হ্যাপ্লয়েড উদ্ভিদের ডিপ্লয়েড মাতৃকোষ থেকে যখন হ্যাপ্লয়েড রেণু উৎপন্ন হয়, তখন জাইগোটে এই ধরনের বিভাজন ঘটে (পৃষ্ঠা ৬০)।",
      distractorAnalysis: {
        opt_bio_3_53_a: "এদের প্রধান দেহই হ্যাপ্লয়েড, তাই গ্যামেট মাইটোসিসে তৈরি হয়।",
        opt_bio_3_53_c: "অঙ্গজ প্রজননে মাইটোসিস ঘটে।",
        opt_bio_3_53_d: "যৌন প্রজননকারী সকল জীবেই কোনো না কোনো স্তরে মিয়োসিস ঘটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 60
      },
      proTipShortcut: "হ্যাপ্লয়েড জীবে জাইগোটিক মিয়োসিস ঘটে।"
    },
    difficulty: "HARD",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_54",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "জীবের যৌনজননে ক্রোমোজোম সংখ্যার ধ্রুবতা রক্ষার মূল মেকানিজম কোনটি?",
    options: [
      { id: "opt_bio_3_54_a", text: "মাইটোসিস দ্বারা দেহকোষ বৃদ্ধি", isCorrect: false },
      { id: "opt_bio_3_54_b", text: "মিয়োসিসে গ্যামেটের ক্রোমোজোম অর্ধেক (n) হওয়া এবং নিষেকের পর জাইগোটে তা পুনরায় দ্বিগুণ (2n) হওয়া", isCorrect: true },
      { id: "opt_bio_3_54_c", text: "কোষপ্রাচীর গঠন", isCorrect: false },
      { id: "opt_bio_3_54_d", text: "সাইটোকাইনেসিস সম্পন্ন না হওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মিয়োসিসে গ্যামেটের ক্রোমোজোম অর্ধেক (n) হওয়া এবং নিষেকের পর জাইগোটে তা পুনরায় দ্বিগুণ (2n) হওয়া।",
      coreConcept: "পুং জননকোষ (n) + স্ত্রী জননকোষ (n) = জাইগোট (2n)। মিয়োসিস হয় বলেই প্রতিটি প্রজাতির ক্রোমোজোম সংখ্যা ও বৈশিষ্ট্য বংশপরম্পরায় নির্দিষ্ট থাকে (পৃষ্ঠা ৬০)।",
      distractorAnalysis: {
        opt_bio_3_54_a: "মাইটোসিস কেবল দৈহিক কোষের সংখ্যা বাড়ায়, গ্যামেটের ক্রোমোজোম সংখ্যা নিয়ন্ত্রণ করে না।",
        opt_bio_3_54_c: "কোষপ্রাচীর শারীরিক আবরণ দেয়।",
        opt_bio_3_54_d: "সাইটোকাইনেসিস না হলে বহুনিউক্লিয়াসযুক্ত কোষ তৈরি হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 60
      },
      proTipShortcut: "n + n = 2n চক্র মিয়োসিসের সর্বশ্রেষ্ঠ দান!"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_55",
    topicId: "top_ssc_biology_ch3_5",
    type: "MCQ",
    stem: "মিয়োসিস-২ বিভাজনটিকে নিচের কোনটির সাথে হুবহু তুলনা করা যায়?",
    options: [
      { id: "opt_bio_3_55_a", text: "মাইটোসিস সমীকরণিক বিভাজন", isCorrect: true },
      { id: "opt_bio_3_55_b", text: "অ্যামাইটোসিস প্রত্যক্ষ বিভাজন", isCorrect: false },
      { id: "opt_bio_3_55_c", text: "মিয়োসিস-১ হ্রাস বিভাজন", isCorrect: false },
      { id: "opt_bio_3_55_d", text: "দ্বি-ভাজন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: মাইটোসিস সমীকরণিক বিভাজন।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ৬০ অনুযায়ী: দ্বিতীয় বিভাজনটি মূলত মাইটোসিসের অনুরূপ, অর্থাৎ ক্রোমোজোম সংখ্যার আর কোনো হ্রাস ঘটে না।"
      ,
      distractorAnalysis: {
        opt_bio_3_55_b: "অ্যামাইটোসিসে স্পিন্ডল গঠিত হয় না, কিন্তু মিয়োসিস-২ এ স্পিন্ডল গঠিত হয়।",
        opt_bio_3_55_c: "মিয়োসিস-১ এ ক্রোমোজোম হ্রাস পায়, কিন্তু মিয়োসিস-২ এ ক্রোমোজোম সমান থাকে।",
        opt_bio_3_55_d: "দ্বি-ভাজন ব্যাকটিরিয়ায় ঘটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 60
      },
      proTipShortcut: "মিয়োসিস-২ = হুবহু মাইটোসিস সমবিভাজন।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_56",
    topicId: "top_ssc_biology_ch3_5",
    type: "CQ_CREATIVE",
    stem: "একটি উন্নত সপুষ্পক উদ্ভিদের কাণ্ডের ভাজক কলা এবং ফুলের পরাগধানীর কোষ বিভাজন অণুবীক্ষণে পর্যবেক্ষণ করা হলো। দেখা গেল কাণ্ডের কোষে একটি মাতৃকোষ থেকে সমান ক্রোমোজোমযুক্ত দুটি অপত্য কোষ সৃষ্টি হচ্ছে। কিন্তু পরাগধানীর একটি মাতৃকোষ থেকে অর্ধেক সংখ্যক ক্রোমোজোম বিশিষ্ট চারটি ভিন্ন অপত্য কোষ সৃষ্টি হচ্ছে।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে কাণ্ডের ভাজক কলায় মাইটোসিস এবং ফুলের পরাগধানীতে মিয়োসিস বিভাজন তুলে ধরা হয়েছে।",
      coreConcept: "মাইটোসিস ও মিয়োসিসের তুলনামূলক মেকানিজম এবং জননকোষ উৎপাদনে মিয়োসিসের হ্রাসমূলক রূপ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.৩",
        pageNumber: 59
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "হ্যাপ্লয়েড কোষ বলতে কী বোঝায় তা লেখা।" },
      kha: { mark: 2, criteria: "মিয়োসিসকে হ্রাসমূলক বিভাজন বলা হয় কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে পরাগধানীর কোষে সংঘটিত বিভাজন প্রক্রিয়াটির ধারাবাহিক ধাপসমূহ সংক্ষেপে বর্ণনা করা।" },
      gha: { mark: 4, criteria: "“পরাগধানীতে যদি কাণ্ডের মতো বিভাজন হতো, তবে উদ্ভিদের অস্তিত্ব বিপন্ন হতো”—উক্তিটির যথার্থতা মূল্যায়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_CQ_03",
    topicId: "top_ssc_biology_ch3_2",
    type: "CQ_CREATIVE",
    stem: "অণুবীক্ষণ যন্ত্রে একটি বিভাজনশীল কোষে দেখা গেল অপত্য ক্রোমোজোমগুলো দুই বিপরীত মেরুর দিকে অগ্রসর হচ্ছে। এদের মধ্যে কিছু ক্রোমোজোমের সেন্ট্রোমিয়ার মাঝখানের সামান্য একপাশে থাকায় ইংরেজি L বর্ণের রূপ ধারণ করেছে এবং অন্য কিছু ক্রোমোজোমে সেন্ট্রোমিয়ার একেবারে শেষ প্রান্তে থাকায় ইংরেজি I বর্ণের রূপ ধারণ করেছে।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে অ্যানাফেজ চলনে সাবমেটাসেন্ট্রিক (L) ও টেলোসেন্ট্রিক (I) ক্রোমোজোমের রূপ আলোচিত হয়েছে।",
      coreConcept: "অ্যানাফেজ মেরুমুখী চলনে সেন্ট্রোমিয়ারের অবস্থানের ওপর ভিত্তি করে ক্রোমোজোমের বাহুদ্বয়ের রূপান্তর।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২.১",
        pageNumber: 55
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "টেলোসেন্ট্রিক ক্রোমোজোম কাকে বলে তা সংজ্ঞা আকারে লেখা।" },
      kha: { mark: 2, criteria: "অ্যানাফেজ চলনে সেন্ট্রোমিয়ার কেন সর্বদা মেরুমুখী অগ্রগামী থাকে তা বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে বর্ণিত L ও I রূপের ক্রোমোজোম দুটির বাহুর অনুপাত ও বৈশিষ্ট্য তুলনামূলক ছকে উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "“সেন্ট্রোমিয়ারের অবস্থানই ক্রোমোজোমের অ্যানাফেজীয় রূপ নির্ধারণ করে”—উক্তিটির যথার্থতা মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_3_CQ_04",
    topicId: "top_ssc_biology_ch3_4",
    type: "CQ_CREATIVE",
    stem: "হাসপাতালের ক্যান্সার ইউনিটে ডা. রফিক রোগীদের সচেতন করার জন্য একটি সেমিনারে বললেন, “আমাদের দেহের কোষ বিভাজন অত্যন্ত সুনিয়ন্ত্রিতভাবে ঘটে। কিন্তু ক্ষতিকর কার্সিনোজেন যেমন তামাকের বিষাক্ত টার, অতিরিক্ত এক্স-রে বা তেজস্ক্রিয় বিকিরণ কোষের অভ্যন্তরীণ চেকপয়েন্ট নিয়ন্ত্রণ নষ্ট করে দেয়। ফলে কোষ অনিয়ন্ত্রিতভাবে বিভাজিত হয়ে প্রথমে টিউমার এবং পরবর্তীতে জীবনঘাতী ম্যালিগন্যান্ট ক্যান্সারে রূপ নেয়।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে কার্সিনোজেনের প্রভাবে স্বাভাবিক কোষচক্রের নিয়ন্ত্রণহীনতা ও ক্যান্সার সৃষ্টির মেকানিজম আলোচিত হয়েছে।",
      coreConcept: "অনিয়ন্ত্রিত মাইটোসিস, চেকপয়েন্ট নিয়ন্ত্রণ বিনষ্ট হওয়া এবং কার্সিনোজেনসমূহের জীবনঘাতী প্রভাব।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "তৃতীয় অধ্যায়: কোষ বিভাজন · ৩.২",
        pageNumber: 58
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "টিউমার কাকে বলে তা নির্ভুল লেখা।" },
      kha: { mark: 2, criteria: "সব টিউমারই ক্যান্সার নয় কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে উল্লেখিত কার্সিনোজেনগুলো কীভাবে স্বাভাবিক কোষকে ক্যান্সার কোষে রূপান্তর করে তা বর্ণনা করা।" },
      gha: { mark: 4, criteria: "“সচেতন জীবনযাপন ও ক্ষতিকর কার্সিনোজেন বর্জনই অনিয়ন্ত্রিত কোষ বিভাজন প্রতিরোধের প্রধান উপায়”—বিশ্লেষণমূলক মতামত দেওয়া।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
