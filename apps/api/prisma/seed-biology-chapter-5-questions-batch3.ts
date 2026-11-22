import { ContentStatus } from "@prisma/client";
import type { QuestionData } from "./seed-chapter-7-questions";

export const biologyChapter5QuestionsBatch3: QuestionData[] = [
  // -------------------------------------------------------------------------
  // TOPIC 5.5: পরিপাক গ্রন্থি ও তাদের শারীরবৃত্তীয় ভূমিকা (MCQs 49-60, CQs 13-15)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_5_49",
    topicId: "top_ssc_biology_ch5_5",
    type: "MCQ",
    stem: "মানবদেহের সবচেয়ে বড় এবং গুরুত্বপূর্ণ গ্রন্থি কোনটি?",
    options: [
      { id: "opt_bio_5_49_a", text: "অগ্ন্যাশয়", isCorrect: false },
      { id: "opt_bio_5_49_b", text: "যকৃৎ (Liver)", isCorrect: true },
      { id: "opt_bio_5_49_c", text: "থাইরয়েড গ্রন্থি", isCorrect: false },
      { id: "opt_bio_5_49_d", text: "প্যারোটিড গ্রন্থি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: যকৃৎ (Liver)।",
      coreConcept: "যকৃৎ হলো মানবদেহের বৃহত্তম অভ্যন্তরীণ গ্রন্থি; একজন প্রাপ্তবয়স্ক সুস্থ মানুষের যকৃতের ওজন প্রায় ১.২ থেকে ১.৫ কিলোগ্রাম।",
      distractorAnalysis: {
        opt_bio_5_49_a: "অগ্ন্যাশয় দ্বিতীয় বৃহত্তম গ্রন্থি (প্রায় ৬০–১০০ গ্রাম)।",
        opt_bio_5_49_c: "থাইরয়েড বৃহত্তম অন্তঃক্ষরা গ্রন্থি (প্রায় ২৫–৩০ গ্রাম)।",
        opt_bio_5_49_d: "প্যারোটিড হলো সবচেয়ে বড় লালাগ্রন্থি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 116
      },
      proTipShortcut: "দেহের বৃহত্তম অঙ্গ ত্বক; কিন্তু বৃহত্তম গ্রন্থি হলো যকৃৎ।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_50",
    topicId: "top_ssc_biology_ch5_5",
    type: "MCQ",
    stem: "মানবদেহের কোন অঙ্গটিকে বহুবিধ বিপাকীয় ক্রিয়ার জন্য 'জৈব রসায়নাগার' (Organic Chemical Laboratory) বলা হয়?",
    options: [
      { id: "opt_bio_5_50_a", text: "বৃক্ক বা কিডনি", isCorrect: false },
      { id: "opt_bio_5_50_b", text: "যকৃৎ (Liver)", isCorrect: true },
      { id: "opt_bio_5_50_c", text: "হৃৎপিণ্ড", isCorrect: false },
      { id: "opt_bio_5_50_d", text: "প্লীহা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: যকৃৎ (Liver)।",
      coreConcept: "যকৃতে একাধারে গ্লাইকোজেন সঞ্চয়, ডিঅ্যামিনেশন, ইউরিয়া তৈরি, লোহিত কণিকা ভাঙন, পিত্ত উৎপাদন ও বিষাক্ত পদার্থ নিষ্ক্রিয়করণের মতো শত শত জৈব রাসায়নিক বিক্রিয়া ঘটে।",
      distractorAnalysis: {
        opt_bio_5_50_a: "বৃক্ক হলো প্রধান রেচন অঙ্গ যা রক্ত পরিশ্রুত করে মূত্র তৈরি করে।",
        opt_bio_5_50_c: "হৃৎপিণ্ড রক্তসংবহনের পাম্প অঙ্গ।",
        opt_bio_5_50_d: "প্লীহা হলো রক্তের লিম্ফয়েড অঙ্গ ও আরবিসি সঞ্চয়াগার।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 117
      },
      proTipShortcut: "জৈব রসায়নাগার = যকৃৎ (Liver)।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_51",
    topicId: "top_ssc_biology_ch5_5",
    type: "MCQ",
    stem: "যকৃতে অতিরিক্ত গ্লুকোজ কোন প্রক্রিয়ায় এবং কোন রূপে জমা থাকে?",
    options: [
      { id: "opt_bio_5_51_a", text: "গ্লাইকোলাইসিস প্রক্রিয়ায় স্টার্চ রূপে", isCorrect: false },
      { id: "opt_bio_5_51_b", text: "গ্লাইকোজেনেসিস প্রক্রিয়ায় গ্লাইকোজেন রূপে", isCorrect: true },
      { id: "opt_bio_5_51_c", text: "গ্লুকোনওজেনেসিস প্রক্রিয়ায় প্রোটিন রূপে", isCorrect: false },
      { id: "opt_bio_5_51_d", text: "ইমালসিফিকেশন প্রক্রিয়ায় ফ্যাট রূপে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: গ্লাইকোজেনেসিস প্রক্রিয়ায় গ্লাইকোজেন রূপে।",
      coreConcept: "ইনসুলিন হরমোনের উপস্থিতিতে যকৃৎ রক্তের অতিরিক্ত গ্লুকোজকে অদ্রবণীয় পলিস্যাকারাইড গ্লাইকোজেনে রূপান্তর করে জমা রাখে (গ্লাইকোজেনেসিস)।",
      distractorAnalysis: {
        opt_bio_5_51_a: "গ্লাইকোলাইসিস হলো শ্বসনে গ্লুকোজ ভেঙে পাইরুভিক এসিড তৈরি।",
        opt_bio_5_51_c: "গ্লুকোনওজেনেসিস হলো অশর্করা থেকে নতুন গ্লুকোজ তৈরি।",
        opt_bio_5_51_d: "ইমালসিফিকেশন পিত্তলবণ দ্বারা চর্বির রূপান্তর।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 117
      },
      proTipShortcut: "গ্লুকোজ → গ্লাইকোজেন সঞ্চয় = গ্লাইকোজেনেসিস।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_52",
    topicId: "top_ssc_biology_ch5_5",
    type: "MCQ",
    stem: "যকৃতে ডিঅ্যামিনেশনের ফলে সৃষ্ট অত্যন্ত বিষাক্ত অ্যামোনিয়া কোন চক্রের মাধ্যমে কম বিষাক্ত ইউরিয়াতে পরিণত হয়?",
    options: [
      { id: "opt_bio_5_52_a", text: "ক্রেবস চক্র", isCorrect: false },
      { id: "opt_bio_5_52_b", text: "অরনিথিন চক্র (Ornithine cycle)", isCorrect: true },
      { id: "opt_bio_5_52_c", text: "ক্যালভিন চক্র", isCorrect: false },
      { id: "opt_bio_5_52_d", text: "হ্যাচ ও স্ল্যাক চক্র", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অরনিথিন চক্র (Ornithine cycle)।",
      coreConcept: "অ্যামাইনো এসিডের ভাঙনে উৎপন্ন বিষাক্ত গ্যাস অ্যামোনিয়া যকৃতে অরনিথিন চক্রের মাধ্যমে কার্বন ডাই-অক্সাইডের সাথে যুক্ত হয়ে পানিতে দ্রবণীয় কম বিষাক্ত ইউরিয়া গঠন করে।",
      distractorAnalysis: {
        opt_bio_5_52_a: "ক্রেবস চক্র মাইটোকন্ড্রিয়ায় শক্তি উৎপাদনের শ্বসন চক্র।",
        opt_bio_5_52_c: "ক্যালভিন চক্র সালোকসংশ্লেষণের আলোক-নিরপেক্ষ অধ্যায়।",
        opt_bio_5_52_d: "C4 উদ্ভিদের সালোকসংশ্লেষণ চক্র।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 117
      },
      proTipShortcut: "অ্যামোনিয়া → ইউরিয়া = যকৃতের অরনিথিন চক্র।"
    },
    difficulty: "HARD",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_53",
    topicId: "top_ssc_biology_ch5_5",
    type: "MCQ",
    stem: "অগ্ন্যাশয়কে কেন একটি মিশ্র গ্রন্থি (Mixed Gland) বলা হয়?",
    options: [
      { id: "opt_bio_5_53_a", text: "এটি কেবল এনজাইম ক্ষরণ করে", isCorrect: false },
      { id: "opt_bio_5_53_b", text: "এটি নালিযুক্ত বহিঃক্ষরা এবং নালিহীন অন্তঃক্ষরা উভয় অংশ নিয়ে গঠিত", isCorrect: true },
      { id: "opt_bio_5_53_c", text: "এটি যকৃৎ ও পাকস্থলীর মাঝামাঝি অবস্থিত", isCorrect: false },
      { id: "opt_bio_5_53_d", text: "এটি রক্ত ও লসিকা দুটোই বহন করে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বহিঃক্ষরা (এনজাইম) ও অন্তঃক্ষরা (হরমোন) উভয় অংশ বিদ্যমান।",
      coreConcept: "অগ্ন্যাশয় অ্যাসিনাই নালির মাধ্যমে পাচক রস (বহিঃক্ষরা) এবং আইলেটস অব ল্যাঙ্গারহ্যান্স থেকে হরমোন সরাসরি রক্তে (অন্তঃক্ষরা) ক্ষরণ করে বলে এটি মিশ্র গ্রন্থি।",
      distractorAnalysis: {
        opt_bio_5_53_a: "এটি হরমোনও ক্ষরণ করে।",
        opt_bio_5_53_c: "অবস্থানের জন্য মিশ্র গ্রন্থি বলা হয় না; কাজের ধরনের জন্য বলা হয়।",
        opt_bio_5_53_d: "রক্ত-লসিকা পরিবহনের সাথে মিশ্র গ্রন্থির সম্পর্ক নেই।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 118
      },
      proTipShortcut: "এনজাইম + হরমোন ক্ষরণকারী = মিশ্র গ্রন্থি (অগ্ন্যাশয়)।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_54",
    topicId: "top_ssc_biology_ch5_5",
    type: "MCQ",
    stem: "অগ্ন্যাশয়ের আইলেটস অব ল্যাঙ্গারহ্যান্সের বিটা (β) কোষ থেকে কোন হরমোন নিঃসৃত হয়?",
    options: [
      { id: "opt_bio_5_54_a", text: "গ্লুকাগন", isCorrect: false },
      { id: "opt_bio_5_54_b", text: "ইনসুলিন (Insulin)", isCorrect: true },
      { id: "opt_bio_5_54_c", text: "সোমাটোস্ট্যাটিন", isCorrect: false },
      { id: "opt_bio_5_54_d", text: "থাইরক্সিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ইনসুলিন (Insulin)।",
      coreConcept: "বিটা কোষ ইনসুলিন তৈরি করে যা কোষের গ্লুকোজ গ্রহণ বাড়ায় এবং রক্তে গ্লুকোজের মাত্রা কমিয়ে স্বাভাবিক রাখে।",
      distractorAnalysis: {
        opt_bio_5_54_a: "গ্লুকাগন ক্ষরিত হয় আলফা কোষ থেকে।",
        opt_bio_5_54_c: "সোমাটোস্ট্যাটিন ক্ষরিত হয় ডেল্টা কোষ থেকে।",
        opt_bio_5_54_d: "থাইরক্সিন থাইরয়েড গ্রন্থি থেকে নিঃসৃত হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 118
      },
      proTipShortcut: "বিটা কোষ = ইনসুলিন (রক্তে গ্লুকোজ কমায়)।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_55",
    topicId: "top_ssc_biology_ch5_5",
    type: "MCQ",
    stem: "রক্তে গ্লুকোজের মাত্রা স্বাভাবিকের চেয়ে কমে গেলে অগ্ন্যাশয়ের কোন হরমোনটি যকৃতের গ্লাইকোজেনকে ভেঙে গ্লুকোজে পরিণত করে?",
    options: [
      { id: "opt_bio_5_55_a", text: "ইনসুলিন", isCorrect: false },
      { id: "opt_bio_5_55_b", text: "গ্লুকাগন (Glucagon)", isCorrect: true },
      { id: "opt_bio_5_55_c", text: "পেপসিন", isCorrect: false },
      { id: "opt_bio_5_55_d", text: "বিলিরুবিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: গ্লুকাগন (Glucagon)।",
      coreConcept: "আলফা কোষ থেকে নিঃসৃত গ্লুকাগন যকৃতে সঞ্চিত গ্লাইকোজেনকে গ্লুকোজে ভেঙে রক্তে ছেড়ে দেয়, ফলে রক্তের গ্লুকোজ বাড়ে।",
      distractorAnalysis: {
        opt_bio_5_55_a: "ইনসুলিন রক্তের গ্লুকোজ কমায়।",
        opt_bio_5_55_c: "পেপসিন পাচক এনজাইম, হরমোন নয়।",
        opt_bio_5_55_d: "বিলিরুবিন পিত্তরঞ্জক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 118
      },
      proTipShortcut: "ইনসুলিন গ্লুকোজ কমায়, গ্লুকাগন গ্লুকোজ বাড়ায়।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_56",
    topicId: "top_ssc_biology_ch5_5",
    type: "MCQ",
    stem: "ইনসুলিন হরমোনের তীব্র ঘাটতি হলে মানবদেহে কোন দীর্ঘস্থায়ী রোগটি সৃষ্টি হয়?",
    options: [
      { id: "opt_bio_5_56_a", text: "গলগণ্ড", isCorrect: false },
      { id: "opt_bio_5_56_b", text: "বহুমূত্র বা ডায়াবেটিস মেলাইটাস (Diabetes Mellitus)", isCorrect: true },
      { id: "opt_bio_5_56_c", text: "রিকেটস", isCorrect: false },
      { id: "opt_bio_5_56_d", text: "জন্ডিস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বহুমূত্র বা ডায়াবেটিস মেলাইটাস।",
      coreConcept: "ইনসুলিন না থাকলে রক্তে গ্লুকোজ অতিরিক্ত বেড়ে যায় এবং মূত্রের সাথে গ্লুকোজ নির্গত হতে থাকে, একে ডায়াবেটিস মেলাইটাস বলে।",
      distractorAnalysis: {
        opt_bio_5_56_a: "গলগণ্ড আয়োডিনের ঘাটতিতে হয়।",
        opt_bio_5_56_c: "রিকেটস ভিটামিন ডি এর ঘাটতিতে হয়।",
        opt_bio_5_56_d: "জন্ডিস পিত্তরঞ্জক বিলিরুবিন বেড়ে গেলে হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 119
      },
      proTipShortcut: "ইনসুলিন অভাব = ডায়াবেটিস মেলাইটাস।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_57",
    topicId: "top_ssc_biology_ch5_5",
    type: "MCQ",
    stem: "পুরাতন ও ভাঙনপ্রাপ্ত লোহিত রক্তকণিকার হিমোগ্লোবিন ভেঙে যকৃতে কোন হলুদ বর্ণের পিত্তরঞ্জক তৈরি হয়?",
    options: [
      { id: "opt_bio_5_57_a", text: "বিলIVERডিন", isCorrect: false },
      { id: "opt_bio_5_57_b", text: "বিলিরুবিন (Bilirubin)", isCorrect: true },
      { id: "opt_bio_5_57_c", text: "মেলানিন", isCorrect: false },
      { id: "opt_bio_5_57_d", text: "হিমোসায়ানিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বিলিরুবিন (Bilirubin)।",
      coreConcept: "হিমোগ্লোবিনের হিম অংশ ভেঙে হলুদ বর্ণের বিলিরুবিন ও সবুজ বর্ণের বিলিভার্ডিন তৈরি হয়; রক্তে বিলিরুবিন বেড়ে গেলে ত্বক ও চোখ হলুদ হয় (জন্ডিস)।",
      distractorAnalysis: {
        opt_bio_5_57_a: "বিলিভার্ডিন হলো সবুজ বর্ণের পিত্তরঞ্জক।",
        opt_bio_5_57_c: "মেলানিন ত্বকের কালো রঞ্জক।",
        opt_bio_5_57_d: "হিমোসায়ানিন অমেরুদণ্ডীর তামাযুক্ত রক্তরঞ্জক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 117
      },
      proTipShortcut: "বিলিরুবিন = হলুদ রঞ্জক (জন্ডিস নির্দেশক)।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_58",
    topicId: "top_ssc_biology_ch5_5",
    type: "MCQ",
    stem: "পাকস্থলীর প্রাচীরের কোন কোষ থেকে হাইড্রোক্লোরিক এসিড (HCl) ক্ষরিত হয়?",
    options: [
      { id: "opt_bio_5_58_a", text: "চিফ বা পেপটিক কোষ", isCorrect: false },
      { id: "opt_bio_5_58_b", text: "প্যারাইটাল বা অক্সিন্টিক কোষ", isCorrect: true },
      { id: "opt_bio_5_58_c", text: "মিউকাস কোষ", isCorrect: false },
      { id: "opt_bio_5_58_d", text: "বিটা কোষ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: প্যারাইটাল বা অক্সিন্টিক কোষ।",
      coreConcept: "পাকস্থলীর গ্যাস্ট্রিক গ্রন্থির প্যারাইটাল (অক্সিন্টিক) কোষ থেকে তীব্র অম্লীয় HCl নিঃসৃত হয়।",
      distractorAnalysis: {
        opt_bio_5_58_a: "চিফ কোষ থেকে পেপসিনোজেন ও প্রোরেনিন ক্ষরিত হয়।",
        opt_bio_5_58_c: "মিউকাস কোষ ক্ষারীয় পিচ্ছিল শ্লেষ্মা ক্ষরণ করে পাকস্থলীকে রক্ষা করে।",
        opt_bio_5_58_d: "বিটা কোষ অগ্ন্যাশয়ে থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 119
      },
      proTipShortcut: "HCl ক্ষরণকারী = প্যারাইটাল বা অক্সিন্টিক কোষ।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_59",
    topicId: "top_ssc_biology_ch5_5",
    type: "MCQ",
    stem: "যকৃতের চারটি খণ্ডের মধ্যে সবচেয়ে বড় খণ্ডটি কোনটি?",
    options: [
      { id: "opt_bio_5_59_a", text: "বাম খণ্ড", isCorrect: false },
      { id: "opt_bio_5_59_b", text: "ডান খণ্ড (Right lobe)", isCorrect: true },
      { id: "opt_bio_5_59_c", text: "কডেট খণ্ড", isCorrect: false },
      { id: "opt_bio_5_59_d", text: "কোয়াড্রেট খণ্ড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ডান খণ্ড (Right lobe)।",
      coreConcept: "যকৃতের ডান খণ্ডটি অন্যান্য খণ্ডগুলোর চেয়ে অনেক বড় এবং এর নিচেই পিত্তথলি সংযুক্ত থাকে।",
      distractorAnalysis: {
        opt_bio_5_59_a: "বাম খণ্ড অপেক্ষাকৃত ছোট।",
        opt_bio_5_59_c: "কডেট খণ্ড পৃষ্ঠীয় ক্ষুদ্র খণ্ড।",
        opt_bio_5_59_d: "কোয়াড্রেট খণ্ড নিচের চতুষ্কোণাকার অংশ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 116
      },
      proTipShortcut: "যকৃতের ডান খণ্ড = বৃহত্তম।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_60",
    topicId: "top_ssc_biology_ch5_5",
    type: "MCQ",
    stem: "ক্ষুদ্রান্ত্রের প্রাচীরে অবস্থিত আন্ত্রিক গ্রন্থি থেকে ক্ষরিত রসকে কী বলা হয়?",
    options: [
      { id: "opt_bio_5_60_a", text: "গ্যাস্ট্রিক জুস", isCorrect: false },
      { id: "opt_bio_5_60_b", text: "সাক্কাস এন্টেরিকাস (Succus entericus)", isCorrect: true },
      { id: "opt_bio_5_60_c", text: "পিত্তরস", isCorrect: false },
      { id: "opt_bio_5_60_d", text: "ল্যাকটিয়াল রস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সাক্কাস এন্টেরিকাস (Succus entericus)।",
      coreConcept: "ক্ষুদ্রান্ত্রের ক্রিপ্টস অব লিবারকুন ও ব্রুনার্স গ্রন্থি থেকে ক্ষরিত পাচক রসকে শারীরতত্ত্বের ভাষায় সাক্কাস এন্টেরিকাস বা আন্ত্রিক রস বলে।",
      distractorAnalysis: {
        opt_bio_5_60_a: "গ্যাস্ট্রিক জুস পাকস্থলীর ক্ষরণ।",
        opt_bio_5_60_c: "পিত্তরস যকৃতের ক্ষরণ।",
        opt_bio_5_60_d: "ল্যাকটিয়াল হলো শোষিত লসিকার নালি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 119
      },
      proTipShortcut: "আন্ত্রিক রস = Succus entericus।"
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // TOPIC 5.5 CREATIVE QUESTIONS (CQs 13-15)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_5_cq_13",
    topicId: "top_ssc_biology_ch5_5",
    type: "CQ_CREATIVE",
    stem: "জাহিদ সাহেব কিছুদিন ধরে অতিরিক্ত তৃষ্ণা, ঘন ঘন প্রস্রাব এবং দুর্বলতা অনুভব করছেন। রক্ত পরীক্ষায় দেখা গেল তার রক্তে গ্লুকোজের মাত্রা স্বাভাবিকের চেয়ে অনেক বেশি (১৪ mmol/L)। ডাক্তার বললেন, “আপনার একটি বিশেষ পেটের পাতার মতো মিশ্র গ্রন্থির অন্তঃক্ষরা অংশ পর্যাপ্ত হরমোন তৈরি করতে পারছে না। ফলে যকৃতে গ্লুকোজ সঞ্চয় প্রক্রিয়া ব্যাহত হচ্ছে।”",
    options: null,
    explanation: {
      directAnswer: "মিশ্র গ্রন্থিটি হলো অগ্ন্যাশয়, হরমোনটি ইনসুলিন এবং জাহিদ সাহেব ডায়াবেটিস মেলাইটাসে আক্রান্ত।",
      coreConcept: "অগ্ন্যাশয়ের অন্তঃক্ষরা ভূমিকা, ইনসুলিন নিঃসরণ এবং গ্লুকোজ বিপাকে যকৃতের সাথে আন্তঃক্রিয়া।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 118
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "মিশ্র গ্রন্থি কাকে বলে তা লেখা।" },
      kha: { mark: 2, criteria: "ইনসুলিন রক্তে গ্লুকোজের মাত্রা কীভাবে নিয়ন্ত্রণ করে তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে উল্লিখিত গ্রন্থিটির বহিঃক্ষরা অংশের গঠন ও ক্ষরিত এনজাইমের কাজ বর্ণনা করা।" },
      gha: { mark: 4, criteria: "“দেহের অভ্যন্তরীণ পরিবেশের ভারসাম্য রক্ষায় উদ্দীপকের গ্রন্থিটির ভূমিকা অনন্য”—যুক্তিসহ মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_cq_14",
    topicId: "top_ssc_biology_ch5_5",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান ব্যবহারিক ক্লাসে শিক্ষক নবম শ্রেণির শিক্ষার্থীদের একটি চার্ট দেখিয়ে বললেন, “এই ১.৫ কেজি ওজনের অঙ্গটিকে মানবদেহের 'জৈব রসায়নাগার' বলা হয়। এটি একাধারে পরিপাকের জন্য পিত্ত তৈরি করে, রক্তে অতিরিক্ত গ্লুকোজ সংরক্ষণ করে এবং শরীরের বিষাক্ত নাইট্রোজেনঘটিত বর্জ্যকে ইউরিয়াতে রূপান্তর করে। এই অঙ্গটির কাজে বিঘ্ন ঘটলে পুরো শরীর বিষাক্ত হয়ে যায় এবং জন্ডিসের মতো লক্ষণ দেখা দেয়।”",
    options: null,
    explanation: {
      directAnswer: "অঙ্গটি যকৃৎ (Liver), যা গ্লাইকোজেনেসিস, ডিঅ্যামিনেশন ও পিত্তরস তৈরির মূল কেন্দ্র।",
      coreConcept: "যকৃতের বহুবিধ সঞ্চয়ী ও বিপাকীয় ভূমিকা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 116
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "যকৃতের বৃহত্তম খণ্ডটির নাম লেখা।" },
      kha: { mark: 2, criteria: "যকৃৎকে 'জৈব রসায়নাগার' বলার দুটি প্রধান কারণ ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "যকৃতে কীভাবে বিষাক্ত অ্যামোনিয়া ইউরিয়াতে রূপান্তরিত হয় তা সংক্ষেপে বর্ণনা করা।" },
      gha: { mark: 4, criteria: "মানবদেহের শক্তি সঞ্চয় ও বিষাক্ত পদার্থ নিষ্ক্রিয়করণে যকৃতের ভূমিকা বিশদ বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_cq_15",
    topicId: "top_ssc_biology_ch5_5",
    type: "CQ_CREATIVE",
    stem: "পরিপাকতন্ত্রের দুটি প্রধান সহযোগী গ্রন্থি A ও B। A গ্রন্থিটি কোনো পাচক এনজাইম তৈরি না করেও চর্বি পরিপাক ও ক্ষারীয় মাধ্যম সৃষ্টিতে কেন্দ্রীয় ভূমিকা পালন করে। অপরদিকে B গ্রন্থিটি এমন একটি রস ক্ষরণ করে যাতে শর্করা, আমিষ ও চর্বি তিনটিরই পরিপাককারী উৎসেচক বিদ্যমান থাকে।",
    options: null,
    explanation: {
      directAnswer: "A হলো যকৃৎ (পিত্তরস নিঃসরণকারী) এবং B হলো অগ্ন্যাশয় (ট্রিপসিন, অ্যামাইলেজ ও লাইপেস নিঃসরণকারী)।",
      coreConcept: "যকৃৎ ও অগ্ন্যাশয়ের সমন্বিত পাচক ভূমিকা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৫",
        pageNumber: 117
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "পিত্তরস কোথায় জমা থাকে তা উল্লেখ করা।" },
      kha: { mark: 2, criteria: "পিত্তলবণ কীভাবে চর্বি পরিপাকে সাহায্য করে তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "B গ্রন্থি থেকে ক্ষরিত তিনটি প্রধান এনজাইম এবং তাদের পরিপাক বিক্রিয়া ছক আকারে উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "A ও B উভয় গ্রন্থির সুস্থতার ওপর মানবদেহের সামগ্রিক পুষ্টির নির্ভরতা মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // TOPIC 5.6: খাদ্য শোষণ, আত্তীকরণ ও পরিপাকতন্ত্রের রোগসমূহ (MCQs 61-72, CQs 16-18)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_5_61",
    topicId: "top_ssc_biology_ch5_6",
    type: "MCQ",
    stem: "ক্ষুদ্রান্ত্রের ইলিয়াম প্রাচীরে অবস্থিত আঙুলের মতো অভিক্ষেপগুলোকে কী বলে যা খাদ্য শোষণে প্রধান ভূমিকা পালন করে?",
    options: [
      { id: "opt_bio_5_61_a", text: "সিলিয়া", isCorrect: false },
      { id: "opt_bio_5_61_b", text: "ভিলাই (Villi)", isCorrect: true },
      { id: "opt_bio_5_61_c", text: "ফ্ল্যাজেলা", isCorrect: false },
      { id: "opt_bio_5_61_d", text: "ক্রিপ্টস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ভিলাই (Villi)।",
      coreConcept: "ভিলাই হলো ইলিয়ামের মিউকোসা স্তরের প্রবর্ধক যার মাধ্যমে শোষণের ক্ষেত্রফল শতগুণ বৃদ্ধি পায়।",
      distractorAnalysis: {
        opt_bio_5_61_a: "সিলিয়া শ্বাসনালি ও ফেলোপিয়ান নালির চুলের মতো চলনশীল অঙ্গাণু।",
        opt_bio_5_61_c: "ফ্ল্যাজেলা এককোষী জীবের চলন অঙ্গ।",
        opt_bio_5_61_d: "ক্রিপ্টস হলো ভিলাইর গোড়ায় অবস্থিত আন্ত্রিক গ্রন্থির খাঁজ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 120
      },
      proTipShortcut: "ক্ষুদ্রান্ত্রের শোষক আঙুল = ভিলাই (Villi)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_62",
    topicId: "top_ssc_biology_ch5_6",
    type: "MCQ",
    stem: "ভিলাইর কেন্দ্রস্থলে অবস্থিত অন্ধ লসিকা নালিটিকে কী বলা হয় যার মাধ্যমে চর্বি কণা শোষিত হয়?",
    options: [
      { id: "opt_bio_5_62_a", text: "ল্যাকটিয়াল (Lacteal)", isCorrect: true },
      { id: "opt_bio_5_62_b", text: "হেপাটিক পোর্টাল শিরা", isCorrect: false },
      { id: "opt_bio_5_62_c", text: "ক্যারোটিড ধমনি", isCorrect: false },
      { id: "opt_bio_5_62_d", text: "পিত্তনালি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ল্যাকটিয়াল (Lacteal)।",
      coreConcept: "ভিলাইর কেন্দ্রে ল্যাকটিয়াল নামক লসিকা নালি থাকে যা চর্বি পরিপাকের উৎপাদ—ফ্যাটি এসিড ও গ্লিসারল শোষণ করে দুগ্ধের মতো রূপ নেয়।",
      distractorAnalysis: {
        opt_bio_5_62_b: "হেপাটিক পোর্টাল শিরা দিয়ে শর্করা ও অ্যামাইনো এসিড যকৃতে যায়।",
        opt_bio_5_62_c: "ক্যারোটিড ধমনি মস্তিষ্কে রক্ত নেয়।",
        opt_bio_5_62_d: "পিত্তনালি পিত্তরস বহন করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 120
      },
      proTipShortcut: "ভিলাইর লসিকা নালি = ল্যাকটিয়াল = চর্বি শোষণ।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_63",
    topicId: "top_ssc_biology_ch5_6",
    type: "MCQ",
    stem: "সরল শর্করা গ্লুকোজ এবং আমিষের অ্যামাইনো এসিড কোন সংবহন নালির মাধ্যমে প্রথমে যকৃতে পরিবাহিত হয়?",
    options: [
      { id: "opt_bio_5_63_a", text: "বক্ষীয় লসিকা নালি", isCorrect: false },
      { id: "opt_bio_5_63_b", text: "হেপাটিক পোর্টাল শিরা (Hepatic portal vein)", isCorrect: true },
      { id: "opt_bio_5_63_c", text: "ফুসফুসীয় ধমনি", isCorrect: false },
      { id: "opt_bio_5_63_d", text: "রেনাল শিরা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: হেপাটিক পোর্টাল শিরা (Hepatic portal vein)।",
      coreConcept: "ক্ষুদ্রান্ত্রের কৈশিক জালিকা থেকে রক্ত পুষ্টি উপাদান সংগ্রহ করে হেপাটিক পোর্টাল শিরার মাধ্যমে যকৃতে প্রবেশ করে যাতে যকৃৎ তা প্রক্রিয়া ও সঞ্চয় করতে পারে।",
      distractorAnalysis: {
        opt_bio_5_63_a: "বক্ষীয় লসিকা নালি দিয়ে চর্বি সাধারণ সংবহনে যায়।",
        opt_bio_5_63_c: "ফুসফুসীয় ধমনি ফুসফুসে রক্ত নেয়।",
        opt_bio_5_63_d: "রেনাল শিরা কিডনি থেকে রক্ত আনে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 121
      },
      proTipShortcut: "অন্ত্র থেকে যকৃৎ = হেপাটিক পোর্টাল শিরা।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_64",
    topicId: "top_ssc_biology_ch5_6",
    type: "MCQ",
    stem: "শোষিত সরল খাদ্য উপাদান জীবকোষে গৃহীত হয়ে কোষের প্রোটোপ্লাজমে রূপান্তরিত বা অঙ্গীভূত হওয়াকে কী বলে?",
    options: [
      { id: "opt_bio_5_64_a", text: "ইমালসিফিকেশন", isCorrect: false },
      { id: "opt_bio_5_64_b", text: "আত্তীকরণ (Assimilation)", isCorrect: true },
      { id: "opt_bio_5_64_c", text: "নিষ্কাশন", isCorrect: false },
      { id: "opt_bio_5_64_d", text: "পেরিস্টালসিস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: আত্তীকরণ (Assimilation)।",
      coreConcept: "রক্তের মাধ্যমে বাহিত খাদ্য উপাদান কোষের জীবন্ত প্রোটোপ্লাজম ও এনজাইম তৈরিতে একীভূত হওয়ার গঠনমূলক প্রক্রিয়াকে আত্তীকরণ বলে।",
      distractorAnalysis: {
        opt_bio_5_64_a: "ইমালসিফিকেশন চর্বির কণা তৈরি।",
        opt_bio_5_64_c: "নিষ্কাশন বর্জ্য বের করা।",
        opt_bio_5_64_d: "পেরিস্টালসিস পেশির আন্দোলন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 121
      },
      proTipShortcut: "কোষের প্রোটোপ্লাজমে অঙ্গীভূত হওয়া = আত্তীকরণ।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_65",
    topicId: "top_ssc_biology_ch5_6",
    type: "MCQ",
    stem: "বৃহদান্ত্রের মূল শারীরবৃত্তীয় কাজ কোনটি?",
    options: [
      { id: "opt_bio_5_65_a", text: "আমিষ ও চর্বি সম্পূর্ণ পরিপাক করা", isCorrect: false },
      { id: "opt_bio_5_65_b", text: "অপাচ্য তরল মণ্ড থেকে পানি ও প্রয়োজনীয় খনিজ লবণ পুনঃশোষণ", isCorrect: true },
      { id: "opt_bio_5_65_c", text: "পিত্তরস ও অগ্ন্যাশয় রস নিঃসরণ করা", isCorrect: false },
      { id: "opt_bio_5_65_d", text: "ইনসুলিন হরমোন তৈরি করা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অপাচ্য তরল মণ্ড থেকে পানি ও খনিজ লবণ পুনঃশোষণ।",
      coreConcept: "বৃহদান্ত্রে কোনো পাচক এনজাইম নেই; এটি মূলত তরল মণ্ড থেকে জল পুনঃশোষণ করে মল ঘন করে এবং মল সাময়িক ধারণ করে।",
      distractorAnalysis: {
        opt_bio_5_65_a: "পরিপাক ক্ষুদ্রান্ত্রেই শেষ হয়ে যায়।",
        opt_bio_5_65_c: "পিত্তরস ও অগ্ন্যাশয় রস ডিওডেনামে ক্ষরিত হয়।",
        opt_bio_5_65_d: "ইনসুলিন অগ্ন্যাশয় তৈরি করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 121
      },
      proTipShortcut: "বৃহদান্ত্র = পানি পুনঃশোষণ ও মল গঠন।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_66",
    topicId: "top_ssc_biology_ch5_6",
    type: "MCQ",
    stem: "পাকস্থলীতে গ্যাস্ট্রাইটিস এবং পেপটিক আলসার সৃষ্টির জন্য কোন বিশেষ ব্যাকটেরিয়ার সংক্রমণ প্রধানত দায়ী?",
    options: [
      { id: "opt_bio_5_66_a", text: "Escherichia coli", isCorrect: false },
      { id: "opt_bio_5_66_b", text: "Helicobacter pylori", isCorrect: true },
      { id: "opt_bio_5_66_c", text: "Salmonella typhi", isCorrect: false },
      { id: "opt_bio_5_66_d", text: "Vibrio cholerae", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: Helicobacter pylori।",
      coreConcept: "হেলিকোব্যাকটার পাইলোরি ব্যাকটেরিয়া পাকস্থলীর মিউকাস স্তরে বাসা বেঁধে অম্লীয় সুরক্ষাবলয় নষ্ট করে এবং আলসার সৃষ্টি করে।",
      distractorAnalysis: {
        opt_bio_5_66_a: "E. coli অন্ত্রের স্বাভাবিক বাসিন্দা (কিছু স্ট্রেন ডায়রিয়া ঘটায়)।",
        opt_bio_5_66_c: "Salmonella typhi টাইফয়েড জ্বর সৃষ্টি করে।",
        opt_bio_5_66_d: "Vibrio cholerae কলেরা রোগ সৃষ্টি করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 122
      },
      proTipShortcut: "গ্যাস্ট্রাইটিস ও আলসার ব্যাকটেরিয়া = H. pylori।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_67",
    topicId: "top_ssc_biology_ch5_6",
    type: "MCQ",
    stem: "নাভির চারপাশে ব্যথা শুরু হয়ে কয়েক ঘণ্টার মধ্যে তলপেটের ডান পাশে তীব্র ও অসহ্য ব্যথা হওয়া কোন রোগের জরুরি লক্ষণ?",
    options: [
      { id: "opt_bio_5_67_a", text: "গ্যাস্ট্রাইটিস", isCorrect: false },
      { id: "opt_bio_5_67_b", text: "অ্যাপেন্ডিসাইটিস (Appendicitis)", isCorrect: true },
      { id: "opt_bio_5_67_c", text: "পিত্তপাথর", isCorrect: false },
      { id: "opt_bio_5_67_d", text: "কলেরা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অ্যাপেন্ডিসাইটিস (Appendicitis)।",
      coreConcept: "সিকামের অ্যাপেন্ডিক্সে খাদ্য বা কৃমি আটকে পুঁজ ও প্রদাহ হলে তলপেটের ডানপাশে তীব্র ব্যথা (ম্যাকবার্নি পয়েন্ট), বমি ও জ্বর হয়।",
      distractorAnalysis: {
        opt_bio_5_67_a: "গ্যাস্ট্রাইটিসে পেটের উপরিভাগে জ্বালাপোড়া ব্যথা হয়।",
        opt_bio_5_67_c: "পিত্তপাথরের ব্যথা পেটের ডান উপরের অংশে হয় ও কাঁধে ছড়ায়।",
        opt_bio_5_67_d: "কলেরায় চাল ধোয়া পানির মতো পাতলা পায়খানা হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 123
      },
      proTipShortcut: "তলপেটের ডান পাশে তীব্র ব্যথা = অ্যাপেন্ডিসাইটিস।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_68",
    topicId: "top_ssc_biology_ch5_6",
    type: "MCQ",
    stem: "অ্যাপেন্ডিসাইটিস রোগে আক্রান্ত ব্যক্তির একমাত্র জরুরি ও সুনির্দিষ্ট চিকিৎসা কোনটি?",
    options: [
      { id: "opt_bio_5_68_a", text: "কেবল প্যারাসিটামল খেয়ে বিশ্রাম নেওয়া", isCorrect: false },
      { id: "opt_bio_5_68_b", text: "দ্রুত অস্ত্রোপচারের মাধ্যমে অ্যাপেন্ডিক্স কেটে ফেলা (Appendectomy)", isCorrect: true },
      { id: "opt_bio_5_68_c", text: "তৈলাক্ত খাবার বেশি খাওয়া", isCorrect: false },
      { id: "opt_bio_5_68_d", text: "পেটে গরম সেঁক দেওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: দ্রুত অস্ত্রোপচারের মাধ্যমে অ্যাপেন্ডিক্স কেটে ফেলা।",
      coreConcept: "অ্যাপেন্ডিসাইটিস শনাক্ত হলে দ্রুত অস্ত্রোপচার করে অপসারণ না করলে অ্যাপেন্ডিক্স ফেটে পেটের অভ্যন্তরে পেরিটোনাইটিস হয়ে মারাত্মক জীবনহানি ঘটতে পারে।",
      distractorAnalysis: {
        opt_bio_5_68_a: "বিলম্ব করলে অ্যাপেন্ডিক্স ফেটে রোগীর মৃত্যু হতে পারে।",
        opt_bio_5_68_c: "তৈলাক্ত খাবার ক্ষতি আরও বাড়াবে।",
        opt_bio_5_68_d: "গরম সেঁক দিলে প্রদাহ বেড়ে ফেটে যাওয়ার ঝুঁকি বেড়ে যায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 123
      },
      proTipShortcut: "অ্যাপেন্ডিসাইটিস = কালবিলম্ব না করে জরুরি অস্ত্রোপচার।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_69",
    topicId: "top_ssc_biology_ch5_6",
    type: "MCQ",
    stem: "পিত্তথলিতে পাথর বা গলস্টোন (Gallstones) তৈরি হওয়ার প্রধান রাসায়নিক উপাদান কোনটি?",
    options: [
      { id: "opt_bio_5_69_a", text: "অতিরিক্ত কোলেস্টেরল ও ক্যালসিয়াম লবণ", isCorrect: true },
      { id: "opt_bio_5_69_b", text: "আয়রন ও জিংক", isCorrect: false },
      { id: "opt_bio_5_69_c", text: "গ্লুকোজ ও ফ্রুক্টোজ", isCorrect: false },
      { id: "opt_bio_5_69_d", text: "ইউরিক এসিড ও ইউরিয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অতিরিক্ত কোলেস্টেরল ও ক্যালসিয়াম লবণ।",
      coreConcept: "পিত্তরসে কোলেস্টেরলের ঘনত্ব বেড়ে গেলে বা ক্যালসিয়াম ও বিলিরুবিন ঘনীভূত হলে পিত্তথলিতে দানাদার পাথর তৈরি হয়।",
      distractorAnalysis: {
        opt_bio_5_69_b: "আয়রন ও জিংক পিত্তপাথর গঠন করে না।",
        opt_bio_5_69_c: "গ্লুকোজ পানিতে দ্রবণীয় শর্করা।",
        opt_bio_5_69_d: "ইউরিক এসিড বৃক্কে পাথর তৈরি করে, পিত্তথলিতে নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 123
      },
      proTipShortcut: "পিত্তপাথর = কোলেস্টেরল ও ক্যালসিয়াম ঘনীভবন।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_70",
    topicId: "top_ssc_biology_ch5_6",
    type: "MCQ",
    stem: "পেপটিক আলসার তীব্র হলে রোগীর মলের রঙ কেমন হতে পারে?",
    options: [
      { id: "opt_bio_5_70_a", text: "সাদাটে বর্ণের", isCorrect: false },
      { id: "opt_bio_5_70_b", text: "আলকাতরার মতো ঘন কালো বর্ণের (Melena)", isCorrect: true },
      { id: "opt_bio_5_70_c", text: "স্বচ্ছ পানির মতো", isCorrect: false },
      { id: "opt_bio_5_70_d", text: "সবুজ বর্ণের", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: আলকাতরার মতো ঘন কালো বর্ণের।",
      coreConcept: "আলসার থেকে অভ্যন্তরীণ রক্তক্ষরণ হলে লোহিত কণিকার হিমোগ্লোবিন পরিপাক এনজাইম ও ব্যাকটেরিয়ার ক্রিয়ায় জারিত হয়ে আলকাতরার মতো কালো মল উৎপন্ন করে।",
      distractorAnalysis: {
        opt_bio_5_70_a: "সাদা মল পিত্তনালি সম্পূর্ণ অবরুদ্ধ হওয়ার লক্ষণ।",
        opt_bio_5_70_c: "স্বচ্ছ পানির মতো মল কলেরার লক্ষণ।",
        opt_bio_5_70_d: "সবুজ মল অতিরিক্ত পিত্তের দ্রুত ট্রানজিটে হতে পারে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 122
      },
      proTipShortcut: "পাকস্থলীতে রক্তক্ষরণ = কালো মল (মেলেনা)।"
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_71",
    topicId: "top_ssc_biology_ch5_6",
    type: "MCQ",
    stem: "খাদ্য শোষণের কার্যক্ষমতা শতগুণ বৃদ্ধির পেছনে ভিলাইর কোন উপ-গঠনটি মুখ্য ভূমিকা পালন করে?",
    options: [
      { id: "opt_bio_5_71_a", text: "মাইক্রোভিলাই (Microvilli)", isCorrect: true },
      { id: "opt_bio_5_71_b", text: "স্ফিংটার পেশি", isCorrect: false },
      { id: "opt_bio_5_71_c", text: "পেরিটোনিয়াম", isCorrect: false },
      { id: "opt_bio_5_71_d", text: "গ্যাস্ট্রিক পিট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: মাইক্রোভিলাই (Microvilli)।",
      coreConcept: "ভিলাইর এপিথেলিয়াল কোষের উপরিভাগে ব্রাশ বর্ডার সদৃশ হাজার হাজার অণুবীক্ষণিক মাইক্রোভিলাই থাকে যা মোট শোষণ ক্ষেত্রফল প্রায় ২০০ বর্গমিটারে সম্প্রসারিত করে।",
      distractorAnalysis: {
        opt_bio_5_71_b: "স্ফিংটার কপাটিকা যা খাদ্য চলাচল নিয়ন্ত্রণ করে।",
        opt_bio_5_71_c: "পেরিটোনিয়াম উদরগহ্বরের দ্বিস্তরবিশিষ্ট পর্দা।",
        opt_bio_5_71_d: "গ্যাস্ট্রিক পিট পাকস্থলীর রস নিঃসরণের গর্ত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 120
      },
      proTipShortcut: "ভিলাইর ব্রাশ বর্ডার = মাইক্রোভিলাই।"
    },
    difficulty: "HARD",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_72",
    topicId: "top_ssc_biology_ch5_6",
    type: "MCQ",
    stem: "পরিপাকতন্ত্রে পরজীবী হিসেবে বাস করে পুষ্টি শোষণ ও রক্তশূন্যতা সৃষ্টি করে কোন প্রাণী?",
    options: [
      { id: "opt_bio_5_72_a", text: "গোলকৃমি ও সুতাকৃমি", isCorrect: true },
      { id: "opt_bio_5_72_b", text: "অ্যামিবা", isCorrect: false },
      { id: "opt_bio_5_72_c", text: "ম্যালেরিয়া জীবাণু", isCorrect: false },
      { id: "opt_bio_5_72_d", text: "ইস্ট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: গোলকৃমি ও সুতাকৃমি।",
      coreConcept: "গোলকৃমি, বক্রকৃমি ও ফিতাকৃমির মতো অন্ত্রীয় কৃমি খাদ্যসার শোষণ করে পুষ্টিহীনতা, রক্তশূন্যতা ও পেটব্যথা ঘটায়।",
      distractorAnalysis: {
        opt_bio_5_72_b: "অ্যামিবা আমাশয় ঘটায়।",
        opt_bio_5_72_c: "ম্যালেরিয়া জীবাণু রক্তকোষে বাস করে।",
        opt_bio_5_72_d: "ইস্ট এককোষী ছত্রাক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 124
      },
      proTipShortcut: "অন্ত্রের কৃমি = পুষ্টিহীনতা ও রক্তশূন্যতা।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // TOPIC 5.6 CREATIVE QUESTIONS (CQs 16-18)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_5_cq_16",
    topicId: "top_ssc_biology_ch5_6",
    type: "CQ_CREATIVE",
    stem: "তানভীরের বয়স ১৭ বছর। সে প্রায়ই অনিয়মিত সময়ে হোটেল থেকে অতিরিক্ত ঝাল ও তেলমসলাযুক্ত খাবার খায় এবং রাতে দীর্ঘক্ষণ জেগে থাকে। কিছুদিন ধরে তার পেটের উপরিভাগে কামড়ানো ও জ্বালাপোড়া ব্যথা হচ্ছে, বিশেষ করে খালি পেটে ব্যথা প্রচণ্ড বৃদ্ধি পায়। ডাক্তার পরীক্ষা করে বললেন তার পেপটিক আলসার হয়েছে এবং তিনি তাকে নিয়মিত ওষুধ ও নির্দিষ্ট খাদ্যাভ্যাস অনুসরণের কঠোর নির্দেশ দিলেন।",
    options: null,
    explanation: {
      directAnswer: "অনিয়মিত খাদ্যগ্রহণ ও অতিরিক্ত মসলাযুক্ত খাবার খাওয়ার ফলে পাকস্থলী বা ডিওডেনামের মিউকোসা ক্ষয়প্রাপ্ত হয়ে পেপটিক আলসার হয়েছে।",
      coreConcept: "গ্যাস্ট্রাইটিস ও পেপটিক আলসারের কারণ, লক্ষণ, জটিলতা ও প্রতিরোধ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 122
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "পেপটিক আলসার সৃষ্টিকারী ব্যাকটেরিয়ার নাম লেখা।" },
      kha: { mark: 2, criteria: "খালি পেটে আলসারের ব্যথা তীব্র হয় কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "তানভীরের এই রোগ সৃষ্টির পেছনের অনিয়মতান্ত্রিক কারণগুলো উদ্দীপকের আলোকে বর্ণনা করা।" },
      gha: { mark: 4, criteria: "আলসার নিরাময়ে ডাক্তারের পরামর্শ ও খাদ্যাভ্যাস পরিবর্তনের গুরুত্ব বিশদ বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_cq_17",
    topicId: "top_ssc_biology_ch5_6",
    type: "CQ_CREATIVE",
    stem: "মধ্যরাতে হঠাৎ সজলের নাভির চারপাশে মৃদু ব্যথা শুরু হলো। ভোরের দিকে ব্যথা তলপেটের ডান পাশে স্থানান্তরিত হয়ে তীব্র ও অসহ্য আকার ধারণ করলো। সাথে কয়েকবার বমি ও হালকা জ্বর দেখা দিল। সজল পা ভাঁজ করে পেটের কাছে গুটিয়ে রাখলে সামান্য উপশম পেলেও পা সোজা করতে গেলেই যন্ত্রণায় চিৎকার করে উঠছিল। পরিবারের সদস্যরা দেরি না করে তাকে দ্রুত হাসপাতালে নিয়ে গেলে সার্জন জরুরি অস্ত্রোপচারের সিদ্ধান্ত নিলেন।",
    options: null,
    explanation: {
      directAnswer: "সজল অ্যাপেন্ডিসাইটিসে আক্রান্ত হয়েছে এবং জরুরি ভিত্তিতে অ্যাপেন্ডেক্টমি করে অ্যাপেন্ডিক্স কেটে ফেলা প্রয়োজন।",
      coreConcept: "অ্যাপেন্ডিসাইটিসের ক্লাসিক উপসর্গ, জরুরি অস্ত্রোপচারের গুরুত্ব এবং সম্ভাব্য জীবনঘাতী জটিলতা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 123
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "অ্যাপেন্ডিক্স পৌষ্টিকনালির কোন অংশের সাথে যুক্ত থাকে তা লেখা।" },
      kha: { mark: 2, criteria: "অ্যাপেন্ডিসাইটিসের ক্ষেত্রে কালবিলম্ব না করে দ্রুত অস্ত্রোপচার করতে হয় কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে সজলের শারীরিক উপসর্গের সাথে অ্যাপেন্ডিসাইটিসের ক্লিনিকাল লক্ষণের মিল তুলে ধরা।" },
      gha: { mark: 4, criteria: "“অ্যাপেন্ডিসাইটিসকে অবহেলা করলে রোগীর নিশ্চিত জীবনহানি ঘটতে পারে”—উক্তিটি শারীরবৃত্তীয় দৃষ্টিকোণ থেকে মূল্যায়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_5_cq_18",
    topicId: "top_ssc_biology_ch5_6",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান শিক্ষক ক্লাসে প্রজেক্টরে ক্ষুদ্রান্ত্রের অভ্যন্তরীণ স্তরের একটি বিশেষ চিত্র দেখালেন। সেখানে দেখা গেল আঙুলের মতো অসংখ্য সূক্ষ্ম প্রবর্ধক রয়েছে। শিক্ষক বললেন, “এই অংশটি আমাদের পরিপাককৃত পুষ্টি উপাদান শোষণের মূল কেন্দ্র। এর কেন্দ্রে একটি বিশেষ লসিকা নালি থাকে এবং তাকে ঘিরে থাকে রক্তজালিকা। শর্করা ও প্রোটিনের উপাদান রক্তে গেলেও লিপিড বা চর্বির উপাদান যায় এই লসিকা নালির মাধ্যমে।”",
    options: null,
    explanation: {
      directAnswer: "অঙ্গাণুটি ভিলাই (Villi); কেন্দ্রীয় নালিটি ল্যাকটিয়াল এবং চারপাশে রক্তকৈশিক জালিকা বিন্যস্ত।",
      coreConcept: "ভিলাইর গঠন, পুষ্টি উপাদান শোষণের দ্বি-মুখী পথ (রক্তজালক বনাম ল্যাকটিয়াল) এবং আত্তীকরণ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "পঞ্চম অধ্যায়: খাদ্য, পুষ্টি এবং পরিপাক · ৫.৬",
        pageNumber: 120
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ল্যাকটিয়াল (Lacteal) কী তা এক বাক্যে লেখা।" },
      kha: { mark: 2, criteria: "খাদ্য আত্তীকরণ (Assimilation) বলতে কী বোঝায় তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে উল্লিখিত ভিলাইর চিহ্নিত চিত্র বা গঠনগত বর্ণনা উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "শর্করা ও চর্বি শোষণের পথ ভিন্ন হওয়ার শারীরবৃত্তীয় প্রয়োজনীয়তা ও গুরুত্ব বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  }
];
