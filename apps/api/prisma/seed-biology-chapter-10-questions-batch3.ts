import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter10QuestionsBatch3: QuestionData[] = [
  // -------------------------------------------------------------
  // Topic 10.6: মানব অন্তঃক্ষরা গ্রন্থি ও হরমোনসমূহ (Part 2: MCQs 61-70)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_61",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "অগ্ন্যাশয়ের আইলেটস অব ল্যাঙ্গারহ্যানসের কোন কোষ থেকে রক্তে গ্লুকোজ হ্রাসকারী হরমোন 'ইনসুলিন' নিঃসৃত হয়?",
    options: [
      { id: "opt_bio_10_61_a", text: "আলফা কোষ (α-cell)", isCorrect: false },
      { id: "opt_bio_10_61_b", text: "বিটা কোষ (β-cell)", isCorrect: true },
      { id: "opt_bio_10_61_c", text: "ডেল্টা কোষ (δ-cell)", isCorrect: false },
      { id: "opt_bio_10_61_d", text: "অ্যাসিনাস কোষ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বিটা কোষ ($\\beta$-cell)।",
      coreConcept: "অগ্ন্যাশয়ের আইলেটস অব ল্যাঙ্গারহ্যানসের বিটা কোষ ইনসুলিন ক্ষরণ করে রক্তে গ্লুকোজের মাত্রা স্বাভাবিক রাখে।",
      distractorAnalysis: {
        opt_bio_10_61_a: "আলফা কোষ থেকে নিঃসৃত হয় গ্লুকাগন, যা রক্তে গ্লুকোজ বৃদ্ধি করে।",
        opt_bio_10_61_c: "ডেল্টা কোষ সোমাটোস্ট্যাটিন নিঃসৃত করে।",
        opt_bio_10_61_d: "অ্যাসিনাস হলো অগ্ন্যাশয়ের বহিঃক্ষরা অংশ যা পরিপাক রস তৈরি করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 224
      },
      proTipShortcut: "বিটা কোষ = ইনসুলিন (Beta = Insulin); আলফা কোষ = গ্লুকাগন।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_62",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "উপবাস বা অনাহারের সময় রক্তে গ্লুকোজের মাত্রা কমে গেলে যকৃতের গ্লাইকোজেন ভেঙে রক্তে গ্লুকোজ সরবরাহ বৃদ্ধি করে কোন হরমোন?",
    options: [
      { id: "opt_bio_10_62_a", text: "গ্লুকাগন (Glucagon)", isCorrect: true },
      { id: "opt_bio_10_62_b", text: "ইনসুলিন", isCorrect: false },
      { id: "opt_bio_10_62_c", text: "অক্সিটোসিন", isCorrect: false },
      { id: "opt_bio_10_62_d", text: "ক্যালসিটোনিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: গ্লুকাগন (Glucagon)।",
      coreConcept: "অগ্ন্যাশয়ের আলফা কোষ থেকে ক্ষরিত গ্লুকাগন যকৃতে গ্লাইকোজেনোলাইসিস ঘটিয়ে রক্তে গ্লুকোজ বাড়ায়।",
      distractorAnalysis: {
        opt_bio_10_62_b: "ইনসুলিন রক্তে গ্লুকোজ কমায়, বাড়ায় না।",
        opt_bio_10_62_c: "অক্সিটোসিন প্রসবকালে জরায়ু সংকোচন ঘটায়।",
        opt_bio_10_62_d: "ক্যালসিটোনিন রক্তে ক্যালসিয়াম কমায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 224
      },
      proTipShortcut: "গ্লুকোজ গান গায় (বাড়ে) = গ্লুকাগন!"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_63",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "ভয়, তীব্র রাগ, মানসিক উত্তেজনা বা বিপদের মুহূর্তে দেহকে তাৎক্ষণিক আত্মরক্ষায় প্রস্তুতকারী 'Fight or Flight' হরমোন কোনটি?",
    options: [
      { id: "opt_bio_10_63_a", text: "অ্যাড্রেনালিন (Adrenaline / Epinephrine)", isCorrect: true },
      { id: "opt_bio_10_63_b", text: "থাইরক্সিন", isCorrect: false },
      { id: "opt_bio_10_63_c", text: "প্রজেস্টেরন", isCorrect: false },
      { id: "opt_bio_10_63_d", text: "ইনসুলিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ্যাড্রেনালিন (Adrenaline / Epinephrine)।",
      coreConcept: "অ্যাড্রেনাল মেডুলা থেকে ক্ষরিত অ্যাড্রেনালিন দ্রুত হৃৎস্পন্দন, রক্তচাপ ও রক্তে গ্লুকোজ বাড়িয়ে বিপদ মোকাবিলার শক্তি জোগায়।",
      distractorAnalysis: {
        opt_bio_10_63_b: "থাইরক্সিন দীর্ঘমেয়াদী মৌল বিপাক নিয়ন্ত্রণ করে।",
        opt_bio_10_63_c: "প্রজেস্টেরন গর্ভাবস্থা বজায় রাখে।",
        opt_bio_10_63_d: "ইনসুলিন খাবার হজমের পর গ্লুকোজ সঞ্চয় করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 224
      },
      proTipShortcut: "সংকটকালীন / Fight or Flight হরমোন = অ্যাড্রেনালিন।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_64",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "পুরুষের শুক্রাশয় থেকে নিঃসৃত প্রধান যৌন হরমোন কোনটি যা দাড়ি-গোঁফ গজানো ও পেশিবহুল দেহ গঠনে ভূমিকা রাখে?",
    options: [
      { id: "opt_bio_10_64_a", text: "টেস্টোস্টেরন (Testosterone)", isCorrect: true },
      { id: "opt_bio_10_64_b", text: "ইস্ট্রোজেন", isCorrect: false },
      { id: "opt_bio_10_64_c", text: "প্রজেস্টেরন", isCorrect: false },
      { id: "opt_bio_10_64_d", text: "প্রোল্যাকটিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: টেস্টোস্টেরন (Testosterone)।",
      coreConcept: "টেস্টোস্টেরন হলো প্রধান পুরুষ অ্যান্ড্রোজেন যা শুক্রাণু তৈরি ও পুরুষের সেকেন্ডারি যৌন লক্ষণ বিকাশ ঘটায়।",
      distractorAnalysis: {
        opt_bio_10_64_b: "ইস্ট্রোজেন নারীর প্রধান যৌন হরমোন।",
        opt_bio_10_64_c: "প্রজেস্টেরন নারীর ডিম্বাশয় নিঃসৃত গর্ভধারণ হরমোন।",
        opt_bio_10_64_d: "প্রোল্যাকটিন স্তনগ্রন্থিতে দুগ্ধক্ষরণকারী পিটুইটারি হরমোন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 225
      },
      proTipShortcut: "শুক্রাশয়ের হরমোন = টেস্টোস্টেরন।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_65",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "নারীর ডিম্বাশয় থেকে নিঃসৃত কোন হরমোনটি জরায়ুর প্রাচীরকে ভ্রূণ রোপণের উপযোগী করে এবং গর্ভাবস্থাকে সুরক্ষা দেয়?",
    options: [
      { id: "opt_bio_10_65_a", text: "প্রজেস্টেরন (Progesterone)", isCorrect: true },
      { id: "opt_bio_10_65_b", text: "টেস্টোস্টেরন", isCorrect: false },
      { id: "opt_bio_10_65_c", text: "অ্যাড্রেনালিন", isCorrect: false },
      { id: "opt_bio_10_65_d", text: "থাইরক্সিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রজেস্টেরন (Progesterone)।",
      coreConcept: "কর্পাস লুটিয়াম থেকে নিঃসৃত প্রজেস্টেরন অ্যান্ডোমেট্রিয়াম পুরু করে গর্ভধারণ রক্ষা করে।",
      distractorAnalysis: {
        opt_bio_10_65_b: "টেস্টোস্টেরন পুরুষ হরমোন।",
        opt_bio_10_65_c: "অ্যাড্রেনালিন জরুরি অবস্থার হরমোন।",
        opt_bio_10_65_d: "থাইরক্সিন বিপাকীয় হরমোন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 225
      },
      proTipShortcut: "গর্ভাবস্থা রক্ষা = প্রজেস্টেরন (Pregnancy hormone)।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_66",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "সুস্থ মানুষের রক্তে স্বাভাবিক অবস্থায় খালি পেটে গ্লুকোজের পরিমাণ প্রতি লিটারে কত মিলিমোল থাকা বাঞ্ছনীয়?",
    options: [
      { id: "opt_bio_10_66_a", text: "৪.০ থেকে ৬.০ mmol/L", isCorrect: true },
      { id: "opt_bio_10_66_b", text: "৮.০ থেকে ১১.০ mmol/L", isCorrect: false },
      { id: "opt_bio_10_66_c", text: "১.০ থেকে ২.৫ mmol/L", isCorrect: false },
      { id: "opt_bio_10_66_d", text: "১৫.০ থেকে ২০.০ mmol/L", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ৪.০ থেকে ৬.০ mmol/L।",
      coreConcept: "স্বাভাবিক খালি পেটে রক্তের গ্লুকোজ ৪.০–৬.০ মিলিমোল/লিটার এবং খাবার ২ ঘণ্টা পর ৭.৮-এর নিচে থাকা স্বাভাবিক।",
      distractorAnalysis: {
        opt_bio_10_66_b: "৮.০ থেকে ১১.০ হলো ডায়াবেটিস বা ইম্পেয়ার্ড গ্লুকোজের লক্ষণ।",
        opt_bio_10_66_c: "১.০ থেকে ২.৫ মারাত্মক হাইপোগ্লাইসেমিয়া (মারাত্মক ঝুঁকিপূর্ণ)।",
        opt_bio_10_66_d: "১৫.০ থেকে ২০.০ অনিয়ন্ত্রিত জটিল ডায়াবেটিসের মাত্রা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 224
      },
      proTipShortcut: "স্বাভাবিক রক্তে গ্লুকোজ = ৪ থেকে ৬ mmol/L।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_67",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "ইনসুলিন অতিরিক্ত রক্তের গ্লুকোজকে যকৃৎ ও পেশিতে কোন অদ্রবণীয় পলিস্যাকারাইড রূপে সঞ্চয় করায়?",
    options: [
      { id: "opt_bio_10_67_a", text: "গ্লাইকোজেন (Glycogen)", isCorrect: true },
      { id: "opt_bio_10_67_b", text: "স্টার্চ (শ্বেতসার)", isCorrect: false },
      { id: "opt_bio_10_67_c", text: "সেলুলোজ", isCorrect: false },
      { id: "opt_bio_10_67_d", text: "সুক্রোজ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: গ্লাইকোজেন (Glycogen)।",
      coreConcept: "ইনসুলিন গ্লাইকোজেনেসিস প্রক্রিয়ায় অতিরিক্ত গ্লুকোজকে প্রাণীদেহের সঞ্চিত শর্করা গ্লাইকোজেনে রূপান্তর করে।",
      distractorAnalysis: {
        opt_bio_10_67_b: "স্টার্চ উদ্ভিদের সঞ্চিত শর্করা, প্রাণীতে তৈরি হয় না।",
        opt_bio_10_67_c: "সেলুলোজ উদ্ভিদ কোষপ্রাচীর গঠন করে।",
        opt_bio_10_67_d: "সুক্রোজ উদ্ভিদের পরিবহন ডাইস্যাকারাইড।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 224
      },
      proTipShortcut: "প্রাণীদেহের সঞ্চিত গ্লুকোজ = গ্লাইকোজেন।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_68",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "অ্যাড্রেনাল বা সুপ্রারেনাল গ্রন্থি মানবদেহের কোন প্রধান অঙ্গের উপরে টুপির মতো অবস্থান করে?",
    options: [
      { id: "opt_bio_10_68_a", text: "বৃক্ক বা কিডনি (Kidney)", isCorrect: true },
      { id: "opt_bio_10_68_b", text: "যকৃৎ বা লিভার", isCorrect: false },
      { id: "opt_bio_10_68_c", text: "হৃৎপিণ্ড", isCorrect: false },
      { id: "opt_bio_10_68_d", text: "ফুসফুস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বৃক্ক বা কিডনি (Kidney)।",
      coreConcept: "অ্যাড্রেনাল গ্রন্থি দুটি কিডনির উপরের প্রান্তে টুপির মতো অবস্থান করায় একে সুপ্রারেনাল (Suprarenal) গ্রন্থিও বলা হয়।",
      distractorAnalysis: {
        opt_bio_10_68_b: "যকৃৎ পেটের ডানপাশে থাকে, এর উপর সুপ্রারেনাল গ্রন্থি থাকে না।",
        opt_bio_10_68_c: "হৃৎপিণ্ডের ওপর থাইমাস গ্রন্থি থাকে শৈশবে।",
        opt_bio_10_68_d: "ফুসফুসের ওপর কোনো গ্রন্থি থাকে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 224
      },
      proTipShortcut: "রেনাল = কিডনি; সুপ্রারেনাল = কিডনির উপরে অ্যাড্রেনাল।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_69",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "অগ্ন্যাশয়কে কেন একটি 'মিশ্র গ্রন্থি' (Mixed Gland) বলা হয়?",
    options: [
      { id: "opt_bio_10_69_a", text: "এতে নালীযুক্ত এনজাইম ক্ষরণকারী অংশ এবং নালীবিহীন হরমোন ক্ষরণকারী অংশ উভয়ই বিদ্যমান", isCorrect: true },
      { id: "opt_bio_10_69_b", text: "এটি কেবল অম্লীয় ও ক্ষারীয় তরল মিশ্রিত করে বলে", isCorrect: false },
      { id: "opt_bio_10_69_c", text: "এটি রক্ত ও লসিকা দুটোই তৈরি করে বলে", isCorrect: false },
      { id: "opt_bio_10_69_d", text: "এটি মস্তিষ্ক ও সুষুম্নাকাণ্ডের সাথে সরাসরি যুক্ত বলে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: এতে নালীযুক্ত এনজাইম ক্ষরণকারী অংশ এবং নালীবিহীন হরমোন ক্ষরণকারী অংশ উভয়ই বিদ্যমান।",
      coreConcept: "অগ্ন্যাশয়ের অ্যাসিনাস বহিঃক্ষরা (পরিপাক এনজাইম) এবং আইলেটস অব ল্যাঙ্গারহ্যানস অন্তঃক্ষরা (ইনসুলিন-গ্লুকাগন)।",
      distractorAnalysis: {
        opt_bio_10_69_b: "তরল মিশ্রণ দিয়ে মিশ্র গ্রন্থি সংজ্ঞায়িত হয় না।",
        opt_bio_10_69_c: "অগ্ন্যাশয় রক্ত বা লসিকা তৈরি করে না।",
        opt_bio_10_69_d: "অগ্ন্যাশয় স্নায়ুতন্ত্রের সরাসরি অংশ নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 224
      },
      proTipShortcut: "এনজাইম + হরমোন = মিশ্র গ্রন্থি অগ্ন্যাশয়।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_70",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "পিটুইটারি গ্রন্থির পশ্চাৎ খণ্ড থেকে নিঃসৃত কোন হরমোন বৃক্কে পানির পুনঃশোষণ নিয়ন্ত্রণ করে মূত্রের ঘনত্ব বাড়ায়?",
    options: [
      { id: "opt_bio_10_70_a", text: "অ্যান্টি-ডাইইউরেটিক হরমোন (ADH / ভ্যাসোপ্রেসিন)", isCorrect: true },
      { id: "opt_bio_10_70_b", text: "গ্রোথ হরমোন", isCorrect: false },
      { id: "opt_bio_10_70_c", text: "থাইরয়েড উদ্দীপক হরমোন (TSH)", isCorrect: false },
      { id: "opt_bio_10_70_d", text: "ইনসুলিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ্যান্টি-ডাইইউরেটিক হরমোন (ADH / ভ্যাসোপ্রেসিন)।",
      coreConcept: "ADH বা ভ্যাসোপ্রেসিন বৃক্কের সংগ্রাহক নালিকায় পানি পুনঃশোষণ বাড়ায়; এর অভাবে ডায়াবেটিস ইনসিপিডাস (পানিবহুমূত্র) হয়।",
      distractorAnalysis: {
        opt_bio_10_70_b: "গ্রোথ হরমোন হাড় ও পেশির বৃদ্ধি চালায়।",
        opt_bio_10_70_c: "TSH থাইরয়েডকে নিয়ন্ত্রণ করে।",
        opt_bio_10_70_d: "ইনসুলিন অগ্ন্যাশয় থেকে নিঃসৃত হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 222
      },
      proTipShortcut: "পানির পুনঃশোষণ ও অ্যান্টি-ডাইইউরেটিক = ADH।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------
  // Topic 10.6: CQs (Questions 71, 72)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_71",
    topicId: "top_ssc_biology_ch10_6",
    type: "CQ_CREATIVE",
    stem: "একটি বিশেষ গ্রন্থির অন্তঃক্ষরা অংশের আলফা ও বিটা কোষ থেকে দুটি বিপরীতধর্মী হরমোন নিঃসৃত হয়ে মানবদেহের রক্তের গ্লুকোজ মাত্রাকে একটি সুনির্দিষ্ট স্বাভাবিক সীমায় (Homeostasis) আবদ্ধ রাখে। কোনো কারণে বিটা কোষ ক্ষতিগ্রস্ত হলে রক্তের অতিরিক্ত গ্লুকোজ কোষগুলো গ্রহণ করতে পারে না এবং মূত্রের মাধ্যমে তা বাইরে নির্গত হয়।",
    options: null,
    explanation: {
      directAnswer: "গ্রন্থিটি অগ্ন্যাশয় এবং হরমোন দুটি হলো ইনসুলিন ও গ্লুকাগন।",
      coreConcept: "রক্তের গ্লুকোজের নেগেটিভ ফিডব্যাক নিয়ন্ত্রণ ও ডায়াবেটিসের প্যাথোফিজিওলজি।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 224
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "রক্তে খালি পেটে গ্লুকোজের স্বাভাবিক মাত্রা উল্লেখ করা।" },
      kha: { mark: 2, criteria: "অগ্ন্যাশয়কে কেন মিশ্র গ্রন্থি বলা হয় তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের হরমোন দুটি সুস্থ মানুষের দেহে কীভাবে রক্তের গ্লুকোজের ভারসাম্য রক্ষা করে তা ছক বা চিত্রের সাহায্যে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "বিটা কোষ অকেজো হয়ে রক্তে গ্লুকোজ বেড়ে গেলে মানবদেহের বিভিন্ন অঙ্গে কী কী মারাত্মক ক্ষতি হতে পারে তা বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_72",
    topicId: "top_ssc_biology_ch10_6",
    type: "CQ_CREATIVE",
    stem: "রাস্তায় একটি পাগলা কুকুরের মুখোমুখি হয়ে রিয়াদ ভয়ে কাঁপতে লাগল। মুহূর্তে তার হৃৎস্পন্দন তীব্র হলো, চোখের মণি বড় হয়ে গেল এবং সে অস্বাভাবিক দ্রুত দৌড়ে নিরাপদ আশ্রয়ে চলে গেল। বন্ধু সিয়াম বলল, “তোমার বৃক্কের ওপর অবস্থিত একটি বিশেষ গ্রন্থির হরমোন তোমাকে এই জরুরি অবস্থায় শক্তি ও সতর্কতা জুগিয়েছে।”",
    options: null,
    explanation: {
      directAnswer: "গ্রন্থিটি অ্যাড্রেনাল এবং হরমোনটি অ্যাড্রেনালিন।",
      coreConcept: "অ্যাড্রেনালিন জরুরি অবস্থায় Fight or Flight প্রতিক্রিয়া পরিচালনা করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 224
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জরুরি অবস্থার হরমোন কোনটি তা লেখা।" },
      kha: { mark: 2, criteria: "বহিঃক্ষরা ও অন্তঃক্ষরা গ্রন্থির দুটি প্রধান পার্থক্য উল্লেখ করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের সংকটময় মুহূর্তে রিয়াদের দেহে উক্ত হরমোনটি কীভাবে শারীরিক প্রস্তুতি তৈরি করল তা ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "স্নায়ুতন্ত্র ও অন্তঃক্ষরা তন্ত্রের সমন্বিত সহযোগিতায় কীভাবে জীবদেহের দ্রুত আত্মরক্ষা নিশ্চিত হয় তা বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "ক্যাডেট কলেজ মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------
  // Topic 10.7: স্নায়বিক ও হরমোনজনিত ব্যাধি (MCQs 73-86)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_73",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "মস্তিষ্কের সাবস্ট্যানশিয়া নাইগ্রা অঞ্চলে কোন নিউরোট্রান্সমিটার উৎপাদনকারী স্নায়ুকোষ ধ্বংসপ্রাপ্ত হলে পারকিনসন্স রোগ দেখা দেয়?",
    options: [
      { id: "opt_bio_10_73_a", text: "ডোপামিন (Dopamine)", isCorrect: true },
      { id: "opt_bio_10_73_b", text: "অ্যাসিটাইলকোলিন", isCorrect: false },
      { id: "opt_bio_10_73_c", text: "ইনসুলিন", isCorrect: false },
      { id: "opt_bio_10_73_d", text: "থাইরক্সিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ডোপামিন (Dopamine)।",
      coreConcept: "ডোপামিন হ্রাস পেলে মস্তিষ্কের ব্যাসাল গ্যাংলিয়ার পেশি নিয়ন্ত্রণ সমন্বয় হারিয়ে ফেলে এবং পারকিনসন্স রোগ হয়।",
      distractorAnalysis: {
        opt_bio_10_73_b: "অ্যাসিটাইলকোলিন সাধারণ সাইন্যাপটিক উদ্দীপনা পরিবহন করে।",
        opt_bio_10_73_c: "ইনসুলিন রক্তের শর্করা কমায়।",
        opt_bio_10_73_d: "থাইরক্সিন বিপাক নিয়ন্ত্রণ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 226
      },
      proTipShortcut: "পারকিনসন্স = ডোপামিনের অভাব (Dopamine deficiency)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_74",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "বিশ্রামে থাকার সময় হাত ও আঙুলের ছন্দময় কাঁপুনি (Tremor), মাংসপেশি শক্ত হয়ে যাওয়া এবং ধীরগতির পদক্ষেপ কোন রোগের বৈশিষ্ট্য?",
    options: [
      { id: "opt_bio_10_74_a", text: "পারকিনসন্স রোগ (Parkinson's Disease)", isCorrect: true },
      { id: "opt_bio_10_74_b", text: "গলগণ্ড", isCorrect: false },
      { id: "opt_bio_10_74_c", text: "ডায়াবেটিস ইনসিপিডাস", isCorrect: false },
      { id: "opt_bio_10_74_d", text: "অতিকায়ত্ব", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পারকিনসন্স রোগ (Parkinson's Disease)।",
      coreConcept: "পারকিনসন্সের প্রধান চারটি লক্ষণ: কম্পন (Tremor), অনমনীয়তা (Rigidity), মন্থর গতি (Bradykinesia) ও ভঙ্গুর ভারসাম্য।",
      distractorAnalysis: {
        opt_bio_10_74_b: "গলগণ্ডে গলায় থাইরয়েড ফোলে।",
        opt_bio_10_74_c: "ডায়াবেটিস ইনসিপিডাসে অতিরিক্ত পানির তৃষ্ণা ও মূত্রত্যাগ হয়।",
        opt_bio_10_74_d: "অতিকায়ত্বে দেহের অস্বাভাবিক বৃদ্ধি হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 226
      },
      proTipShortcut: "হাত কাঁপা ও পেশি শক্ত হওয়া = পারকিনসন্স।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_75",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "মস্তিষ্কের নিউরনগুলোতে আকস্মিক ও অস্বাভাবিক অতিরিক্ত মাত্রার বৈদ্যুতিক তরঙ্গের (Electrical discharge) সৃষ্টির কারণে কোন রোগটি হয়?",
    options: [
      { id: "opt_bio_10_75_a", text: "এপিলেপসি বা মৃগীরোগ (Epilepsy)", isCorrect: true },
      { id: "opt_bio_10_75_b", text: "গলগণ্ড", isCorrect: false },
      { id: "opt_bio_10_75_c", text: "বামনত্ব", isCorrect: false },
      { id: "opt_bio_10_75_d", text: "টাইপ-২ ডায়াবেটিস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: এপিলেপসি বা মৃগীরোগ (Epilepsy)।",
      coreConcept: "মস্তিষ্কে আকস্মিক বৈদ্যুতিক শর্ট-সার্কিটের মতো অস্বাভাবিক তরঙ্গে চেতনা হারিয়ে খিঁচুনি হওয়া হলো এপিলেপসি।",
      distractorAnalysis: {
        opt_bio_10_75_b: "গলগণ্ড আয়োডিনের অভাবে হয়।",
        opt_bio_10_75_c: "বামনত্ব পিটুইটারির হরমোন ঘাটতি।",
        opt_bio_10_75_d: "টাইপ-২ ডায়াবেটিস ইনসুলিন অকার্যকারিতার বিপাকীয় রোগ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 227
      },
      proTipShortcut: "মস্তিষ্কের বৈদ্যুতিক বিশৃঙ্খলা ও খিঁচুনি = এপিলেপসি।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_76",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "এপিলেপসি বা মৃগীরোগীর হঠাৎ খিঁচুনির আক্রমণ হলে তাৎক্ষণিকভাবে নিচের কোন কাজটি করা উচিত?",
    options: [
      { id: "opt_bio_10_76_a", text: "রোগীকে নিরাপদ উন্মুক্ত স্থানে একপাশে কাত করে শুইয়ে দিতে হবে", isCorrect: true },
      { id: "opt_bio_10_76_b", text: "জোরপূর্বক মুখের ভেতর চামচ বা আঙুল ঢুকিয়ে দিতে হবে", isCorrect: false },
      { id: "opt_bio_10_76_c", text: "জুতো বা চামড়া শুকিয়ে চেতনা ফেরাতে হবে", isCorrect: false },
      { id: "opt_bio_10_76_d", text: "হাত-পা জোর করে চেপে ধরে রাখতে হবে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: রোগীকে নিরাপদ উন্মুক্ত স্থানে একপাশে কাত করে শুইয়ে দিতে হবে।",
      coreConcept: "একপাশে কাত (Lateral recovery position) করে শুইয়ে দিলে মুখের লালা বা ফেনা শ্বাসনালীতে না ঢুকে বাইরে বেরিয়ে আসে।",
      distractorAnalysis: {
        opt_bio_10_76_b: "মুখে কিছু ঢোকালে দাঁত বা শ্বাসনালী ক্ষতিগ্রস্ত হতে পারে।",
        opt_bio_10_76_c: "জুতো শোকানো কুসংস্কার এবং অত্যন্ত ক্ষতিকর।",
        opt_bio_10_76_d: "জোর করে চেপে ধরলে হাড় ভেঙে যেতে পারে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 227
      },
      proTipShortcut: "এপিলেপসি ফার্স্ট এইড = নিরাপদ জায়গা + একপাশে কাত করে শোয়ানো।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_77",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "মস্তিষ্কের রক্তনালীতে রক্ত জমাট বেঁধে (থ্রম্বোসিস) রক্তপ্রবাহ সম্পূর্ণ অবরুদ্ধ হয়ে যে স্ট্রোক ঘটে, তাকে কী বলে?",
    options: [
      { id: "opt_bio_10_77_a", text: "ইস্কেমিক স্ট্রোক (Ischemic Stroke)", isCorrect: true },
      { id: "opt_bio_10_77_b", text: "হেমোরেজিক স্ট্রোক", isCorrect: false },
      { id: "opt_bio_10_77_c", text: "হার্ট অ্যাটাক", isCorrect: false },
      { id: "opt_bio_10_77_d", text: "মায়োকার্ডাইটিস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ইস্কেমিক স্ট্রোক (Ischemic Stroke)।",
      coreConcept: "স্ট্রোকের প্রায় ৮৫% ক্ষেত্রে রক্তনালী বন্ধ হওয়ার কারণে ইস্কেমিক স্ট্রোক ঘটে থাকে।",
      distractorAnalysis: {
        opt_bio_10_77_b: "হেমোরেজিক স্ট্রোকে রক্তনালী ফেটে মস্তিষ্কের ভেতরে রক্তক্ষরণ ঘটে (১৫%)।",
        opt_bio_10_77_c: "হার্ট অ্যাটাক হৃৎপিণ্ডের করোনারি ধমনির অসুখ, মস্তিষ্কের নয়।",
        opt_bio_10_77_d: "মায়োকার্ডাইটিস হৃৎপেশির প্রদাহ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 228
      },
      proTipShortcut: "রক্ত জমাট বেঁধে বন্ধ = ইস্কেমিক স্ট্রোক (৮৫%)।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_78",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "আন্তর্জাতিকভাবে স্ট্রোকের জরুরি লক্ষণ সহজে মনে রাখার সংক্ষিপ্ত রূপ 'FAST'-এর 'S' দ্বারা কী বোঝায়?",
    options: [
      { id: "opt_bio_10_78_a", text: "Speech difficulty (কথা জড়িয়ে যাওয়া বা বলতে না পারা)", isCorrect: true },
      { id: "opt_bio_10_78_b", text: "Sleep apnea (ঘুমের ব্যাঘাত)", isCorrect: false },
      { id: "opt_bio_10_78_c", text: "Skin rashes (ত্বকে ফুসকুড়ি)", isCorrect: false },
      { id: "opt_bio_10_78_d", text: "Stomach pain (পেটে ব্যথা)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: Speech difficulty (কথা জড়িয়ে যাওয়া বা বলতে না পারা)।",
      coreConcept: "FAST হলো Face drooping, Arm weakness, Speech difficulty, Time to call emergency।",
      distractorAnalysis: {
        opt_bio_10_78_b: "Sleep apnea শ্বসনতন্ত্রের রোগ।",
        opt_bio_10_78_c: "ত্বকের ফুসকুড়ি অ্যালার্জির লক্ষণ।",
        opt_bio_10_78_d: "পেটে ব্যথা গ্যাস্ট্রোইনটেস্টাইনাল সমস্যা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 228
      },
      proTipShortcut: "F = Face, A = Arm, S = Speech, T = Time।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_79",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "টাইপ-১ ডায়াবেটিস মেলিটাস (Type 1 Diabetes) কেন হয়?",
    options: [
      { id: "opt_bio_10_79_a", text: "অটোইমিউন প্রতিক্রিয়ায় অগ্ন্যাশয়ের বিটা কোষ ধ্বংস হয়ে ইনসুলিন উৎপাদন সম্পূর্ণ বন্ধ হলে", isCorrect: true },
      { id: "opt_bio_10_79_b", text: "দেহে অতিরিক্ত মাত্রায় ইনসুলিন উৎপন্ন হলে", isCorrect: false },
      { id: "opt_bio_10_79_c", text: "খাবারে ভিটামিন-সি এর অভাব হলে", isCorrect: false },
      { id: "opt_bio_10_79_d", text: "পিটুইটারি গ্রন্থি অপসারিত হলে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অটোইমিউন প্রতিক্রিয়ায় অগ্ন্যাশয়ের বিটা কোষ ধ্বংস হয়ে ইনসুলিন উৎপাদন সম্পূর্ণ বন্ধ হলে।",
      coreConcept: "টাইপ-১ ডায়াবেটিসে দেহে কোনো ইনসুলিন তৈরি হয় না, ফলে রোগীকে জীবন বাঁচাতে আজীবন ইনসুলিন ইনজেকশন নিতে হয়।",
      distractorAnalysis: {
        opt_bio_10_79_b: "অতিরিক্ত ইনসুলিনে হাইপোগ্লাইসেমিয়া হয়, ডায়াবেটিস নয়।",
        opt_bio_10_79_c: "ভিটামিন সি এর অভাবে স্কার্ভি হয়।",
        opt_bio_10_79_d: "পিটুইটারি অপসারণে নানা হরমোনের ত্রুটি হয়, এটি টাইপ-১ ডায়াবেটিসের প্রধান কারণ নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 229
      },
      proTipShortcut: "টাইপ-১ = ইনসুলিন নির্ভর (বিটা কোষ ধ্বংস)।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_80",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "ডায়াবেটিস মেলিটাস কার্যকরভাবে নিয়ন্ত্রণের জন্য প্রচলিত '৩-ডি' (3-D) নীতির তিনটি মূল ভিত্তি কী কী?",
    options: [
      { id: "opt_bio_10_80_a", text: "ডায়েট (Diet), ডিসিপ্লিন (Discipline) ও ডোজ (Dose)", isCorrect: true },
      { id: "opt_bio_10_80_b", text: "ডক্টর (Doctor), ড্রাগ (Drug) ও ডায়েট (Diet)", isCorrect: false },
      { id: "opt_bio_10_80_c", text: "ডিসিপ্লিন (Discipline), ড্রিংক (Drink) ও ড্যান্স (Dance)", isCorrect: false },
      { id: "opt_bio_10_80_d", text: "ডিজিজ (Disease), ডেঞ্জার (Danger) ও ডেথ (Death)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ডায়েট (Diet), ডিসিপ্লিন (Discipline) ও ডোজ (Dose)।",
      coreConcept: "ডায়েট (খাদ্য নিয়ন্ত্রণ), ডিসিপ্লিন (নিয়মিত ব্যায়াম ও সুশৃঙ্খল জীবন) এবং ডোজ (সঠিক মাত্রায় ওষুধ/ইনসুলিন)।",
      distractorAnalysis: {
        opt_bio_10_80_b: "ড্রাগ বা ডক্টর আনুষ্ঠানিক ৩-ডি এর স্বীকৃত অংশ নয়।",
        opt_bio_10_80_c: "ড্রিংক ও ড্যান্স কাল্পনিক বিকল্প।",
        opt_bio_10_80_d: "ডেঞ্জার ও ডেথ হাস্যকর ভুল বিকল্প।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 229
      },
      proTipShortcut: "৩-ডি = Diet + Discipline + Dose।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_81",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "খাবারে কোন খনিজ লবণের অভাবে থাইরয়েড গ্রন্থি ফুলে ঢোল হয়ে গলগণ্ড (Goiter) রোগ সৃষ্টি করে?",
    options: [
      { id: "opt_bio_10_81_a", text: "আয়োডিন (Iodine)", isCorrect: true },
      { id: "opt_bio_10_81_b", text: "সোডিয়াম", isCorrect: false },
      { id: "opt_bio_10_81_c", text: "ক্যালসিয়াম", isCorrect: false },
      { id: "opt_bio_10_81_d", text: "পটাশিয়াম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: আয়োডিন (Iodine)।",
      coreConcept: "আয়োডিনের অভাবে থাইরক্সিন তৈরি ব্যাহত হলে পিটুইটারির TSH হরমোনের প্রভাবে থাইরয়েড গ্রন্থি অস্বাভাবিক স্ফীত হয় (গলগণ্ড)।",
      distractorAnalysis: {
        opt_bio_10_81_b: "সোডিয়াম স্নায়ু সংকেত ও রক্তচাপ রক্ষা করে।",
        opt_bio_10_81_c: "ক্যালসিয়ামের অভাবে রিকেটস ও টিটেনি হয়।",
        opt_bio_10_81_d: "পটাশিয়াম কোষের ভেতরের প্রধান ক্যাটায়ন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 230
      },
      proTipShortcut: "আয়োডিনের অভাব = গলগণ্ড (Goiter)।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_82",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "ডায়াবেটিস রোগীর ক্ষতস্থান সহজে শুকাতে চায় না কেন?",
    options: [
      { id: "opt_bio_10_82_a", text: "রক্তে উচ্চ গ্লুকোজ জীবাণুর বৃদ্ধি বাড়ায় এবং শ্বেতকণিকার রোগ প্রতিরোধ ক্ষমতা হ্রাস পায়", isCorrect: true },
      { id: "opt_bio_10_82_b", text: "লোহিত রক্তকণিকা সম্পূর্ণ ধ্বংস হয়ে যায় বলে", isCorrect: false },
      { id: "opt_bio_10_82_c", text: "দেহে কোনো রক্ত তঞ্চন উপাদান তৈরি হয় না বলে", isCorrect: false },
      { id: "opt_bio_10_82_d", text: "অণুচক্রিকা সব নষ্ট হয়ে যায় বলে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: রক্তে উচ্চ গ্লুকোজ জীবাণুর বৃদ্ধি বাড়ায় এবং শ্বেতকণিকার রোগ প্রতিরোধ ক্ষমতা হ্রাস পায়।",
      coreConcept: "উচ্চ রক্ত শর্করার কারণে রক্তনালীর সূক্ষ্ম সঞ্চালন ব্যাহত হয় এবং ব্যাক্টেরিয়ার বংশবৃদ্ধি দ্রুত ঘটে, ফলে ক্ষত দেরিতে শুকায়।",
      distractorAnalysis: {
        opt_bio_10_82_b: "লোহিত রক্তকণিকা সম্পূর্ণ ধ্বংস হয় না।",
        opt_bio_10_82_c: "রক্ত তঞ্চন উপাদান ফাইব্রিনোজেন স্বাভাবিক থাকে।",
        opt_bio_10_82_d: "অণুচক্রিকা নষ্ট হয় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 229
      },
      proTipShortcut: "উচ্চ গ্লুকোজ = ব্যাক্টেরিয়ার প্রিয় খাবার ও রোগ প্রতিরোধে ধীরগতি।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_83",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "টাইপ-২ ডায়াবেটিস মেলিটাসের প্রধান জৈবিক কারণ কোনটি?",
    options: [
      { id: "opt_bio_10_83_a", text: "ইনসুলিন উৎপন্ন হলেও লক্ষ্য কোষের গ্রাহকগুলো ইনসুলিনের প্রতি যথাযথ সাড়া দেয় না (Insulin Resistance)", isCorrect: true },
      { id: "opt_bio_10_83_b", text: "অগ্ন্যাশয়ের সব বিটা কোষ জন্মের সময়ই অনুপস্থিত থাকে", isCorrect: false },
      { id: "opt_bio_10_83_c", text: "যকৃৎ সম্পূর্ণ বিনষ্ট হয়ে যায় বলে", isCorrect: false },
      { id: "opt_bio_10_83_d", text: "রক্তে হিমোগ্লোবিনের পরিমাণ শূন্যে নেমে আসে বলে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ইনসুলিন উৎপন্ন হলেও লক্ষ্য কোষের গ্রাহকগুলো ইনসুলিনের প্রতি যথাযথ সাড়া দেয় না (Insulin Resistance)।",
      coreConcept: "টাইপ-২ ডায়াবেটিসে ইনসুলিন তৈরি হয় কিন্তু স্থূলতা বা অলসতার দরুন কোষের রিসেপ্টর অকার্যকর হয়ে পড়ে।",
      distractorAnalysis: {
        opt_bio_10_83_b: "এটি টাইপ-১ এর কাছাকাছি তীব্র অসংগতি।",
        opt_bio_10_83_c: "যকৃৎ বিনষ্ট হয় সিরোসিসে।",
        opt_bio_10_83_d: "হিমোগ্লোবিনের সাথে টাইপ-২ ডায়াবেটিসের সম্পর্ক নেই।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 229
      },
      proTipShortcut: "টাইপ-২ = ইনসুলিন রেজিস্ট্যান্স (কোষের সাড়া না দেওয়া)।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_84",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "স্ট্রোক রোগীর জরুরি চিকিৎসায় মস্তিষ্কের অপূরণীয় ক্ষতি রোধ করার জন্য লক্ষণ প্রকাশের পর প্রথম ৩ থেকে ৪.৫ ঘণ্টাকে কী বলা হয়?",
    options: [
      { id: "opt_bio_10_84_a", text: "গোল্ডেন আওয়ার (Golden Hour)", isCorrect: true },
      { id: "opt_bio_10_84_b", text: "সাইলেন্ট পিরিয়ড", isCorrect: false },
      { id: "opt_bio_10_84_c", text: "ল্যাটেন্ট স্টেজ", isCorrect: false },
      { id: "opt_bio_10_84_d", text: "রিফ্লেক্স উইন্ডো", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: গোল্ডেন আওয়ার (Golden Hour)।",
      coreConcept: "স্ট্রোকের প্রথম ৩-৪.৫ ঘণ্টার মধ্যে হাসপাতালে নিলে থ্রম্বোলাইটিক ওষুধ প্রয়োগে জমাট রক্ত গলিয়ে পক্ষাঘাত রোধ করা সম্ভব।",
      distractorAnalysis: {
        opt_bio_10_84_b: "সাইলেন্ট পিরিয়ড নীরব অবস্থা।",
        opt_bio_10_84_c: "ল্যাটেন্ট স্টেজ সুপ্তাবস্থা।",
        opt_bio_10_84_d: "রিফ্লেক্স উইন্ডো কাল্পনিক শব্দ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 228
      },
      proTipShortcut: "স্ট্রোকের জীবন বাঁচানোর সময় = গোল্ডেন আওয়ার (Golden Hour)।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_85",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "পারকিনসন্স রোগের চিকিৎসার ক্ষেত্রে কোনটি সবচেয়ে সঠিক তথ্য?",
    options: [
      { id: "opt_bio_10_85_a", text: "ডোপামিন বৃদ্ধিকারী ওষুধ ও নিয়মিত ফিজিওথেরাপির মাধ্যমে লক্ষণ নিয়ন্ত্রণে রাখা যায়", isCorrect: true },
      { id: "opt_bio_10_85_b", text: "অ্যান্টিবায়োটিক খেলেই রোগটি ৩ দিনে সম্পূর্ণ ভালো হয়ে যায়", isCorrect: false },
      { id: "opt_bio_10_85_c", text: "ইনসুলিন ইনজেকশন দিলে সব স্নায়ু পুনরায় জন্মায়", isCorrect: false },
      { id: "opt_bio_10_85_d", text: "এটি ছোঁয়াচে রোগ তাই রোগীকে আলাদা ঘরে বন্দি রাখতে হয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ডোপামিন বৃদ্ধিকারী ওষুধ ও নিয়মিত ফিজিওথেরাপির মাধ্যমে লক্ষণ নিয়ন্ত্রণে রাখা যায়।",
      coreConcept: "মস্তিষ্কের ক্ষয়িষ্ণু নিউরন পুনরুজ্জীবিত হয় না, তাই ডোপামিন সাপ্লিমেন্ট ও ব্যায়ামই প্রধান ব্যবস্থাপনা।",
      distractorAnalysis: {
        opt_bio_10_85_b: "অ্যান্টিবায়োটিক কেবল ব্যাকটেরিয়াল সংক্রমণে কাজ করে, নিউরন ক্ষয়ে নয়।",
        opt_bio_10_85_c: "ইনসুলিন ডায়াবেটিসের ওষুধ, নিউরন জন্মায় না।",
        opt_bio_10_85_d: "পারকিনসন্স কোনো ছোঁয়াচে রোগ নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 226
      },
      proTipShortcut: "পারকিনসন্স চিকিৎসা = ডোপামিন বাড়ানো + ফিজিওথেরাপি।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_86",
    topicId: "top_ssc_biology_ch10_7",
    type: "MCQ",
    stem: "ডায়াবেটিস রোগীদের ক্ষেত্রে নিচের কোন লক্ষণটি সাধারণত প্রকাশ পায় না?",
    options: [
      { id: "opt_bio_10_86_a", text: "ঘন ঘন অতিরিক্ত প্রস্রাবের বেগ (Polyuria)", isCorrect: false },
      { id: "opt_bio_10_86_b", text: "প্রচণ্ড তৃষ্ণা ও শুষ্ক মুখ (Polydipsia)", isCorrect: false },
      { id: "opt_bio_10_86_c", text: "অস্বাভাবিক অতিদ্রুত শারীরিক বৃদ্ধি ও উচ্চতা বৃদ্ধি", isCorrect: true },
      { id: "opt_bio_10_86_d", text: "পর্যাপ্ত খাদ্য গ্রহণ সত্ত্বেও দ্রুত ওজন হ্রাস ও অবসাদ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: অস্বাভাবিক অতিদ্রুত শারীরিক বৃদ্ধি ও উচ্চতা বৃদ্ধি।",
      coreConcept: "উচ্চতা বৃদ্ধি পিটুইটারির গ্রোথ হরমোনের কাজ, ডায়াবেটিসে উল্টো দুর্বলতা ও ওজন হ্রাস ঘটে।",
      distractorAnalysis: {
        opt_bio_10_86_a: "ঘন ঘন প্রস্রাব ডায়াবেটিসের ক্লাসিক লক্ষণ।",
        opt_bio_10_86_b: "অতিরিক্ত পানির তৃষ্ণা ডায়াবেটিসের সার্বজনীন লক্ষণ।",
        opt_bio_10_86_d: "গ্লুকোজ শক্তিতে রূপান্তর না হওয়ায় ওজন হ্রাস ডায়াবেটিসের প্রধান লক্ষণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 229
      },
      proTipShortcut: "ডায়াবেটিসে ঘন ঘন প্রস্রাব ও ওজন হ্রাস পায়, শরীর লম্বা হয় না!"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------
  // Topic 10.7: CQs (Questions 87, 88, 89, 90)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_87",
    topicId: "top_ssc_biology_ch10_7",
    type: "CQ_CREATIVE",
    stem: "৫৫ বছর বয়সী শওকত সাহেব কয়েক মাস ধরে লক্ষ্য করছেন তাঁর হাত কাঁপছে এবং কোনো কিছু ধরে রাখতে পারছেন না। হাঁটার সময় পা দুটি আড়ষ্ট হয়ে যায় এবং তিনি সামনে ঝুঁকে ছোট ছোট পদক্ষেপে হাঁটেন। অপরদিকে তাঁর সমবয়সী প্রতিবেশী জহির সাহেব হঠাৎ সকালে ঘুম থেকে উঠে দেখলেন তাঁর মুখের ডানপাশ ঝুলে গেছে এবং ডান হাত ও পা অবশ হয়ে নড়াচড়া করতে পারছেন না। চিকিৎসক বললেন, “প্রথম রোগীর সমস্যাটি নিউরোট্রান্সমিটার ক্ষয়জনিত এবং দ্বিতীয় রোগীর সমস্যাটি মস্তিষ্কের রক্তনালীর আকস্মিক দুর্ঘটনার ফলাফল।”",
    options: null,
    explanation: {
      directAnswer: "শওকত সাহেব পারকিনসন্স রোগে এবং জহির সাহেব স্ট্রোকে আক্রান্ত হয়েছেন।",
      coreConcept: "পারকিনসন্স ডোপামিন ক্ষয়জনিত স্নায়বিক ব্যাধি এবং স্ট্রোক মস্তিষ্কের ভাস্কুলার দুর্ঘটনা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 226
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "পারকিনসন্স রোগের জন্য মস্তিষ্কের কোন নিউরোট্রান্সমিটারের ঘাটতি দায়ী তা লেখা।" },
      kha: { mark: 2, criteria: "ইস্কেমিক স্ট্রোক ও হেমোরেজিক স্ট্রোকের মূল পার্থক্য ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের শওকত সাহেবের শারীরিক লক্ষণ ও রোগটির শারীরবৃত্তীয় কারণ বিশ্লেষণ করা।" },
      gha: { mark: 4, criteria: "জহির সাহেবের ক্ষেত্রে স্ট্রোকের 'FAST' নির্দেশিকা প্রয়োগের মাধ্যমে দ্রুত চিকিৎসার প্রয়োজনীয়তা মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_88",
    topicId: "top_ssc_biology_ch10_7",
    type: "CQ_CREATIVE",
    stem: "স্কুল মাঠে খেলার সময় নবম শ্রেণির শিক্ষার্থী ফাহিম হঠাৎ অচেতন হয়ে মাটিতে লুটিয়ে পড়ল। তার সমস্ত শরীর শক্ত হয়ে হাত-পা অনিয়ন্ত্রিতভাবে কাঁপতে লাগল এবং মুখ দিয়ে ফেনা বের হতে থাকল। উপস্থিত কিছু সহপাঠী ভয়ে তাকে বাতাস দিতে লাগল এবং একজন জুতো শোঁকানোর চেষ্টা করল। এ সময় বিজ্ঞান শিক্ষক এসে সবাইকে সরিয়ে দিলেন এবং ফাহিমকে একপাশে কাত করে শুইয়ে দিলেন। কিছুক্ষণ পর খিঁচুনি থামলে ফাহিম ধীরে ধীরে চোখ মেলল।",
    options: null,
    explanation: {
      directAnswer: "ফাহিমের রোগটি হলো এপিলেপসি বা মৃগীরোগ।",
      coreConcept: "মস্তিষ্কের অস্বাভাবিক বৈদ্যুতিক তরঙ্গের কারণে এপিলেপসি ঘটে এবং সঠিক প্রাথমিক চিকিৎসা অত্যন্ত গুরুত্বপূর্ণ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 227
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "মৃগীরোগ বা এপিলেপসি কী তা সংজ্ঞায়িত করা।" },
      kha: { mark: 2, criteria: "মৃগীরোগ কোনো অভিশাপ বা ছোঁয়াচে রোগ নয়—উক্তিটি ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে বিজ্ঞান শিক্ষক কর্তৃক গৃহীত পদক্ষেপটির বৈজ্ঞানিক যৌক্তিকতা বর্ণনা করা।" },
      gha: { mark: 4, criteria: "সহপাঠীদের জুতো শোঁকানোর ভুল পদক্ষেপের ক্ষতিকর দিক এবং সমাজে এ সংক্রান্ত কুসংস্কার দূরীকরণে সচেতনতামূলক পদক্ষেপ মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_89",
    topicId: "top_ssc_biology_ch10_7",
    type: "CQ_CREATIVE",
    stem: "৫০ বছর বয়সী আসলাম সাহেব লক্ষ্য করলেন তিনি প্রচুর খাবার খাওয়া সত্ত্বেও দিন দিন রোগা হয়ে যাচ্ছেন। রাতে ঘন ঘন প্রস্রাবের বেগ হয় এবং পানি খেলেও পিপাসা মেটে না। কিছুদিন আগে পায়ে সামান্য কেটে যাওয়া অংশটি এক মাসেও শুকাচ্ছে না, বরং পুঁজ জমে ক্ষত তৈরি হয়েছে। রক্ত পরীক্ষায় তাঁর খালি পেটে রক্তের গ্লুকোজ পাওয়া গেল ১০.৮ mmol/L। ডাক্তার তাঁকে বললেন, “আপনার রোগটি পুরোপুরি নিরাময়যোগ্য নয়, তবে সুনির্দিষ্ট ৩-ডি নীতি মেনে চললে আপনি সম্পূর্ণ স্বাভাবিক জীবনযাপন করতে পারবেন।”",
    options: null,
    explanation: {
      directAnswer: "রোগটি ডায়াবেটিস মেলিটাস এবং নিয়ন্ত্রণ কৌশল হলো ৩-ডি (Diet, Discipline, Dose)।",
      coreConcept: "ইনসুলিনের ঘাটতিজনিত বিপাকীয় সমস্যা ও ডায়াবেটিসের সামগ্রিক ব্যবস্থাপনা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 229
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ডায়াবেটিস মেলিটাস নিয়ন্ত্রণে '৩-ডি' নীতি কী তা উল্লেখ করা।" },
      kha: { mark: 2, criteria: "ডায়াবেটিস রোগীর ক্ষত দেরিতে শুকানোর শারীরবৃত্তীয় কারণ ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের তথ্যানুযায়ী আসলাম সাহেবের রোগের লক্ষণ ও ইনসুলিন ঘাটতির সম্পর্ক বিশ্লেষণ করা।" },
      gha: { mark: 4, criteria: "আসলাম সাহেবের সুস্থ ও দীর্ঘায়ু জীবনের জন্য ৩-ডি নীতির প্রতিটি উপাদানের বাস্তবিক প্রয়োগ মূল্যায়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_90",
    topicId: "top_ssc_biology_ch10_7",
    type: "CQ_CREATIVE",
    stem: "একটি প্রত্যন্ত পাহাড়ি অঞ্চলের জনগোষ্ঠীর মধ্যে একটি জরিপ চালিয়ে দেখা গেল, সেখানকার বহু মানুষের গলার সামনের থাইরয়েড গ্রন্থি অস্বাভাবিক ফুলে ঢোল হয়ে গেছে। এছাড়া ওই অঞ্চলের নবজাতক ও শিশুদের অনেকের মধ্যেই বুদ্ধিপ্রতিবন্ধিতা ও খর্বাকৃতি শারীরিক গঠন দেখা যায়। জনস্বাস্থ্য বিশেষজ্ঞ দল এসে বললেন, “মাটির ক্ষয়ের কারণে এখানকার খাদ্য ও পানিতে একটি অতি আবশ্যকীয় মাইক্রো-মিনারেলের তীব্র ঘাটতি রয়েছে।”",
    options: null,
    explanation: {
      directAnswer: "খনিজটি আয়োডিন; রোগ দুটি হলো গলগণ্ড (Goiter) এবং ক্রেটিনিজম (Cretinism)।",
      coreConcept: "আয়োডিনের ঘাটতিতে থাইরক্সিন সংশ্লেষ ব্যাহত হওয়া এবং গলগণ্ড ও ক্রেটিনিজমের বিস্তার।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৭",
        pageNumber: 230
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "গলগণ্ড বা গয়টার কোন খনিজের অভাবে হয় তা লেখা।" },
      kha: { mark: 2, criteria: "শিশুদের ক্রেটিনিজম রোগের প্রধান বৈশিষ্ট্য ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের পাহাড়ি অঞ্চলে থাইরয়েড গ্রন্থি ফুলে যাওয়ার প্যাথলজিক্যাল কার্যকারণ (TSH এর ভূমিকা সহ) ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "উক্ত জনগোষ্ঠীর শারীরিক ও মানসিক স্বাস্থ্য রক্ষায় আয়োডিনযুক্ত লবণ ব্যবহারের জাতীয় গুরুত্ব ও কার্যকারিতা মূল্যায়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "ক্যাডেট কলেজ মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
