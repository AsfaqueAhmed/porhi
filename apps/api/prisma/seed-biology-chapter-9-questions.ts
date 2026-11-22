import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter9QuestionsBatch1: QuestionData[] = [
  // ==========================================
  // TOPIC 1: মানবকঙ্কালের পরিচিতি ও ভূমিকা (top_ssc_biology_ch9_1)
  // ==========================================
  {
    id: "q_bio_9_01",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "একজন পূর্ণবয়স্ক সুস্থ মানুষের কঙ্কালে মোট কতটি অস্থি থাকে?",
    options: [
      { id: "opt_bio_9_01_a", text: "২০৬টি", isCorrect: true },
      { id: "opt_bio_9_01_b", text: "৩০০টি", isCorrect: false },
      { id: "opt_bio_9_01_c", text: "১২৬টি", isCorrect: false },
      { id: "opt_bio_9_01_d", text: "৮০টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ২০৬টি।",
      coreConcept: "পূর্ণবয়স্ক মানুষের কঙ্কাল লম্বা, ছোট, চ্যাপ্টা ও অসম আকৃতির মোট ২০৬টি অস্থি দিয়ে গঠিত।",
      distractorAnalysis: {
        opt_bio_9_01_b: "শিশুর কঙ্কালে অস্থি সংখ্যা প্রায় ৩০০টি থাকে, যা পরবর্তীতে পরস্পরের সাথে জোড়া লেগে কমে যায়।",
        opt_bio_9_01_c: "১২৬টি হলো উপাঙ্গীয় কঙ্কালের (হাত, পা ও অস্থিচক্র) মোট অস্থির সংখ্যা।",
        opt_bio_9_01_d: "৮০টি হলো কেন্দ্রীয় অক্ষীয় কঙ্কালের (করোটি, মেরুদণ্ড ও বক্ষপিঞ্জর) অস্থির সংখ্যা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১",
        pageNumber: 192
      },
      proTipShortcut: "মনে রাখো: পূর্ণবয়স্কে ২০৬, আর অক্ষে ৮০ এবং উপাঙ্গে ১২৬ (৮০ + ১২৬ = ২০৬)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_02",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "নিচের কোনটি মানবদেহের বহিঃকঙ্কালের (Exoskeleton) অন্তর্ভুক্ত?",
    options: [
      { id: "opt_bio_9_02_a", text: "হিউমেরাস ও ফিমার", isCorrect: false },
      { id: "opt_bio_9_02_b", text: "নখ, চুল ও লোম", isCorrect: true },
      { id: "opt_bio_9_02_c", text: "স্টার্নাম ও পরশুকা", isCorrect: false },
      { id: "opt_bio_9_02_d", text: "কানের তরুণাস্থি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: নখ, চুল ও লোম।",
      coreConcept: "কঙ্কালের যে অংশগুলো দেহের বাইরে অবস্থান করে এবং দৃশ্যমান, তাকে বহিঃকঙ্কাল বলে; যেমন নখ, চুল ও লোম।",
      distractorAnalysis: {
        opt_bio_9_02_a: "হিউমেরাস ও ফিমার হলো অন্তঃকঙ্কালের দীর্ঘ অস্থি।",
        opt_bio_9_02_c: "স্টার্নাম ও পরশুকা বক্ষপিঞ্জরের অভ্যন্তরীণ অন্তঃকঙ্কালীয় অস্থি।",
        opt_bio_9_02_d: "কানের তরুণাস্থি অন্তঃকঙ্কালের অংশ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১",
        pageNumber: 193
      },
      proTipShortcut: "বাইরে যা দেখা যায় ও কাটা যায় (নখ, চুল) = বহিঃকঙ্কাল।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_03",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "মানবদেহের লোহিত রক্তকণিকা (Red Blood Cell) প্রধানত কঙ্কালের কোন অংশ থেকে উৎপন্ন হয়?",
    options: [
      { id: "opt_bio_9_03_a", text: "পেরিঅস্টিয়াম আবরণী", isCorrect: false },
      { id: "opt_bio_9_03_b", text: "অস্থিমজ্জা (Bone Marrow)", isCorrect: true },
      { id: "opt_bio_9_03_c", text: "তরুণাস্থির ল্যাকিউনি", isCorrect: false },
      { id: "opt_bio_9_03_d", text: "সাইনোভিয়াল গহ্বর", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অস্থিমজ্জা (Bone Marrow)।",
      coreConcept: "দীর্ঘ অস্থির অভ্যন্তরে থাকা লাল অস্থিমজ্জা থেকে প্রতিনিয়ত লোহিত রক্তকণিকা উৎপন্ন হয়।",
      distractorAnalysis: {
        opt_bio_9_03_a: "পেরিঅস্টিয়াম হলো অস্থির বহিঃস্থ তন্তুময় আবরণী।",
        opt_bio_9_03_c: "ল্যাকিউনি হলো তরুণাস্থির ভেতরের গহ্বর যা কনড্রোসাইট ধারণ করে।",
        opt_bio_9_03_d: "সাইনোভিয়াল গহ্বর অস্থিসন্ধিতে সাইনোভিয়াল রস ধারণ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.১",
        pageNumber: 193
      },
      proTipShortcut: "রক্তকণিকার জন্মশালা = অস্থির ভেতরের মজ্জা (Bone marrow)।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_04",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "মানবদেহের মেরুদণ্ড কতটি কশেরুকা (Vertebrae) নিয়ে গঠিত?",
    options: [
      { id: "opt_bio_9_04_a", text: "১২টি", isCorrect: false },
      { id: "opt_bio_9_04_b", text: "২৪টি", isCorrect: false },
      { id: "opt_bio_9_04_c", text: "৩৩টি", isCorrect: true },
      { id: "opt_bio_9_04_d", text: "২০৬টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৩৩টি।",
      coreConcept: "মানব মেরুদণ্ড পরপর সাজানো ৩৩টি কশেরুকার সমন্বয়ে গঠিত, যার ভেতর দিয়ে সুষুম্নাকাণ্ড নিরাপদে অবস্থান করে।",
      distractorAnalysis: {
        opt_bio_9_04_a: "১২টি হলো বক্ষদেশীয় কশেরুকা বা ১২ জোড়া পরশুকা।",
        opt_bio_9_04_b: "২৪টি হলো মোট পরশুকার (রিবস) সংখ্যা।",
        opt_bio_9_04_d: "২০৬টি হলো সম্পূর্ণ কঙ্কালের মোট অস্থির সংখ্যা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · চিত্র ৯.০১",
        pageNumber: 192
      },
      proTipShortcut: "মেরুদণ্ডের কশেরুকা সংখ্যা = ৩৩টি।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_05",
    topicId: "top_ssc_biology_ch9_1",
    type: "MCQ",
    stem: "মুখমণ্ডলের একমাত্র নাড়াচাড়া করা যায় এমন অস্থি কোনটি?",
    options: [
      { id: "opt_bio_9_05_a", text: "ম্যাক্সিলা", isCorrect: false },
      { id: "opt_bio_9_05_b", text: "ম্যান্ডিবল", isCorrect: true },
      { id: "opt_bio_9_05_c", text: "স্টার্নাম", isCorrect: false },
      { id: "opt_bio_9_05_d", text: "ক্ল্যাভিকল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ম্যান্ডিবল।",
      coreConcept: "ম্যান্ডিবল হলো নিচের চোয়ালের অস্থি যা চর্বণ ও কথা বলার সুবিধার্থে সচল ও নাড়াচাড়া করা যায়।",
      distractorAnalysis: {
        opt_bio_9_05_a: "ম্যাক্সিলা হলো উপরের চোয়ালের অনড় অস্থি।",
        opt_bio_9_05_c: "স্টার্নাম হলো বুকের সামনের চ্যাপ্টা অস্থি।",
        opt_bio_9_05_d: "ক্ল্যাভিকল হলো বক্ষঅস্থিচক্রের কণ্ঠাস্থি বা বিউটি বোন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · চিত্র ৯.০১",
        pageNumber: 192
      },
      proTipShortcut: "মুখের নিচের চোয়াল যা নড়ে = ম্যান্ডিবল (Mandible)।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // TOPIC 2: অস্থি ও তরুণাস্থির গঠন (top_ssc_biology_ch9_2)
  // ==========================================
  {
    id: "q_bio_9_06",
    topicId: "top_ssc_biology_ch9_2",
    type: "MCQ",
    stem: "জীবিত অস্থিকোষের কঠিন অংশের কত শতাংশ অজৈব যৌগ দ্বারা গঠিত?",
    options: [
      { id: "opt_bio_9_06_a", text: "৪০%", isCorrect: false },
      { id: "opt_bio_9_06_b", text: "৫০%", isCorrect: false },
      { id: "opt_bio_9_06_c", text: "৬০%", isCorrect: true },
      { id: "opt_bio_9_06_d", text: "৭০%", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৬০%।",
      coreConcept: "জীবিত অস্থিকোষে ৪০% জৈব এবং ৬০% অজৈব যৌগিক পদার্থ নিয়ে গঠিত।",
      distractorAnalysis: {
        opt_bio_9_06_a: "৪০% হলো অস্থির জৈব যৌগের পরিমাণ।",
        opt_bio_9_06_b: "৫০% হলো অস্থির পানির সর্বোচ্চ শতকরা হার (৪০-৫০ ভাগ)।",
        opt_bio_9_06_d: "৭০% ভুল তথ্য, পাঠ্যবইয়ে ৬০% অজৈব উল্লেখ আছে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      },
      proTipShortcut: "অস্থির কঠিন অংশ: জৈব ৪০% : অজৈব ৬০%।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_07",
    topicId: "top_ssc_biology_ch9_2",
    type: "MCQ",
    stem: "তরুণাস্থির কোষগুলো থেকে নিঃসৃত শক্ত, ঈষদচ্ছ ও হালকা নীল বর্ণের রাসায়নিক বস্তুর নাম কী?",
    options: [
      { id: "opt_bio_9_07_a", text: "ওসিন (Ossein)", isCorrect: false },
      { id: "opt_bio_9_07_b", text: "কনড্রিন (Chondrin)", isCorrect: true },
      { id: "opt_bio_9_07_c", text: "ইলাস্টিন (Elastin)", isCorrect: false },
      { id: "opt_bio_9_07_d", text: "কেরাটিন (Keratin)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কনড্রিন (Chondrin)।",
      coreConcept: "তরুণাস্থি কোষগুলো থেকে কনড্রিন নামক রাসায়নিক বস্তু বের হয় এবং এর বর্ণ হালকা নীল হয়।",
      distractorAnalysis: {
        opt_bio_9_07_a: "ওসিন হলো অস্থির ম্যাট্রিক্সে থাকা জৈব প্রোটিন।",
        opt_bio_9_07_c: "ইলাস্টিন হলো লিগামেন্টের পীতবর্ণের স্থিতিস্থাপক তন্তুর প্রোটিন।",
        opt_bio_9_07_d: "কেরাটিন নখ ও চুলে বিদ্যমান প্রোটিন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      },
      proTipShortcut: "তরুণাস্থি (Cartilage) এর ম্যাট্রিক্স = কনড্রিন (Chondrin)।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_08",
    topicId: "top_ssc_biology_ch9_2",
    type: "MCQ",
    stem: "তরুণাস্থির বহির্ভাগে আবৃত তন্তুময় যোজক কলার আবরণের নাম কী?",
    options: [
      { id: "opt_bio_9_08_a", text: "পেরিঅস্টিয়াম", isCorrect: false },
      { id: "opt_bio_9_08_b", text: "পেরিকন্ড্রিয়াম", isCorrect: true },
      { id: "opt_bio_9_08_c", text: "সারকোলেমা", isCorrect: false },
      { id: "opt_bio_9_08_d", text: "পেরিকার্ডিয়াম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: পেরিকন্ড্রিয়াম।",
      coreConcept: "সব তরুণাস্থি একটি তন্তুময় যোজক কলা নির্মিত আবরণী দিয়ে পরিবেষ্টিত থাকে, যাকে পেরিকন্ড্রিয়াম বলে।",
      distractorAnalysis: {
        opt_bio_9_08_a: "পেরিঅস্টিয়াম হলো অস্থির বহিঃআবরণ।",
        opt_bio_9_08_c: "সারকোলেমা হলো পেশিতন্তুর ঝিল্লি।",
        opt_bio_9_08_d: "পেরিকার্ডিয়াম হলো হৃৎপিণ্ডের দ্বিস্তরবিশিষ্ট পর্দা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      },
      proTipShortcut: "অস্থির আবরণী = পেরিঅস্টিয়াম; তরুণাস্থির আবরণী = পেরিকন্ড্রিয়াম।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_09",
    topicId: "top_ssc_biology_ch9_2",
    type: "MCQ",
    stem: "ত্বকে সূর্যের আলোর অতিবেগুনি রশ্মির সাহায্যে কোন উপাদানটি ভিটামিন ডি-তে রূপান্তরিত হয়?",
    options: [
      { id: "opt_bio_9_09_a", text: "গ্লুকোজ", isCorrect: false },
      { id: "opt_bio_9_09_b", text: "কোলেস্টেরল", isCorrect: true },
      { id: "opt_bio_9_09_c", text: "মেলানিন", isCorrect: false },
      { id: "opt_bio_9_09_d", text: "হিমোগ্লোবিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কোলেস্টেরল।",
      coreConcept: "সূর্যের আলো ত্বকে অবস্থিত কোলেস্টেরলের এমন রাসায়নিক পরিবর্তন ঘটায়, যা যকৃৎ এবং বৃক্কে ধারাবাহিক পরিবর্তনের পর ভিটামিন D সংশ্লেষণ করে।",
      distractorAnalysis: {
        opt_bio_9_09_a: "গ্লুকোজ কোষীয় শ্বসনে শক্তি উৎপাদনে ভাঙে।",
        opt_bio_9_09_c: "মেলানিন ত্বকের বর্ণ নির্ধারণকারী রঞ্জক পদার্থ।",
        opt_bio_9_09_d: "হিমোগ্লোবিন রক্তরসে অক্সিজেন পরিবহনকারী প্রোটিন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      },
      proTipShortcut: "ত্বকের কোলেস্টেরল + রোদ = ভিটামিন ডি।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_10",
    topicId: "top_ssc_biology_ch9_2",
    type: "MCQ",
    stem: "কনড্রিনের মাঝে বিদ্যমান তরলপূর্ণ ক্ষুদ্র গহ্বরগুলোকে কী বলা হয়?",
    options: [
      { id: "opt_bio_9_10_a", text: "হেভারসিয়ান নালি", isCorrect: false },
      { id: "opt_bio_9_10_b", text: "ক্যাপসুল বা ল্যাকিউনি", isCorrect: true },
      { id: "opt_bio_9_10_c", text: "সাইনোভিয়াল গহ্বর", isCorrect: false },
      { id: "opt_bio_9_10_d", text: "মজ্জা গহ্বর", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ক্যাপসুল বা ল্যাকিউনি।",
      coreConcept: "কনড্রিনের মাঝে যে গহ্বরগুলো দেখা যায়, সেগুলোকে ক্যাপসুল বা ল্যাকিউনি (Lacunae) বলে। এর ভেতর কনড্রোব্লাস্ট বা কনড্রোসাইট থাকে।",
      distractorAnalysis: {
        opt_bio_9_10_a: "হেভারসিয়ান নালি অস্থির সূক্ষ্ম গঠনে রক্তনালি বহন করে।",
        opt_bio_9_10_c: "সাইনোভিয়াল গহ্বর অস্থিসন্ধির দুটি অস্থির মধ্যবর্তী ফাঁকা স্থান।",
        opt_bio_9_10_d: "মজ্জা গহ্বর দীর্ঘ অস্থির কেন্দ্রে মজ্জা ধারণ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      },
      proTipShortcut: "তরুণাস্থির কোষঘর = ল্যাকিউনি (Lacunae)।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // TOPIC 3: অস্থিসন্ধি ও সাইনোভিয়াল সন্ধি (top_ssc_biology_ch9_3)
  // ==========================================
  {
    id: "q_bio_9_11",
    topicId: "top_ssc_biology_ch9_3",
    type: "MCQ",
    stem: "নিচের কোন অস্থিসন্ধিটি সম্পূর্ণ নিশ্চল (Fixed Joint)?",
    options: [
      { id: "opt_bio_9_11_a", text: "করোটিকা অস্থিসন্ধি", isCorrect: true },
      { id: "opt_bio_9_11_b", text: "মেরুদণ্ডের কশেরুকা সন্ধি", isCorrect: false },
      { id: "opt_bio_9_11_c", text: "কনুইয়ের সন্ধি", isCorrect: false },
      { id: "opt_bio_9_11_d", text: "উরুসন্ধি (Hip joint)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: করোটিকা অস্থিসন্ধি।",
      coreConcept: "করোটিকা অস্থিসন্ধি অনড়, অর্থাৎ কোনোভাবেই নাড়ানো যায় না; তাই এটি নিশ্চল অস্থিসন্ধি।",
      distractorAnalysis: {
        opt_bio_9_11_b: "মেরুদণ্ডের কশেরুকা সন্ধি হলো ঈষৎ সচল সন্ধি।",
        opt_bio_9_11_c: "কনুইয়ের সন্ধি হলো পূর্ণ সচল কবজা সন্ধি।",
        opt_bio_9_11_d: "উরুসন্ধি হলো পূর্ণ সচল বল ও কোটরসন্ধি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 195
      },
      proTipShortcut: "খুলির করোটিকা সন্ধি অনড় = নিশ্চল সন্ধি।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_12",
    topicId: "top_ssc_biology_ch9_3",
    type: "MCQ",
    stem: "সাইনোভিয়াল অস্থিসন্ধিতে তরুণাস্থি এবং সাইনোভিয়াল রসের প্রধান শারীরবৃত্তীয় ভূমিকা কোনটি?",
    options: [
      { id: "opt_bio_9_12_a", text: "অস্থিতে রক্ত উৎপাদন বৃদ্ধি করা", isCorrect: false },
      { id: "opt_bio_9_12_b", text: "অস্থিতে ঘর্ষণ ও ক্ষয় হ্রাস করে কম শক্তিতে নড়াচড়া সহজ করা", isCorrect: true },
      { id: "opt_bio_9_12_c", text: "ক্যালসিয়াম নিঃসরণ করে অস্থি ধ্বংস করা", isCorrect: false },
      { id: "opt_bio_9_12_d", text: "পেশিকে অস্থির সাথে স্থায়ীভাবে জোড়া লাগানো", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অস্থিতে ঘর্ষণ ও ক্ষয় হ্রাস করে কম শক্তিতে নড়াচড়া সহজ করা।",
      coreConcept: "অস্থিসন্ধিতে সাইনোভিয়াল রস ও তরুণাস্থি থাকায় অস্থিতে অস্থিতে ঘর্ষণ ও ক্ষয় হ্রাস পায় এবং নড়াচড়ায় কম শক্তি ব্যয় হয়।",
      distractorAnalysis: {
        opt_bio_9_12_a: "রক্ত উৎপাদন অস্থিমজ্জার কাজ, সাইনোভিয়াল রসের নয়।",
        opt_bio_9_12_c: "ক্যালসিয়াম নিঃসরণ সন্ধির কাজ নয়।",
        opt_bio_9_12_d: "পেশিকে অস্থির সাথে জোড়া লাগায় টেনডন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 195
      },
      proTipShortcut: "সাইনোভিয়াল রস = লুব্রিকেন্ট (ঘর্ষণরোধী পিচ্ছিল রস)।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_13",
    topicId: "top_ssc_biology_ch9_3",
    type: "MCQ",
    stem: "কাঁধের স্কন্ধসন্ধি এবং নিতম্বের উরুসন্ধি কোন ধরনের সাইনোভিয়াল সন্ধির উদাহরণ?",
    options: [
      { id: "opt_bio_9_13_a", text: "কবজা সন্ধি (Hinge Joint)", isCorrect: false },
      { id: "opt_bio_9_13_b", text: "বল ও কোটরসন্ধি (Ball and Socket Joint)", isCorrect: true },
      { id: "opt_bio_9_13_c", text: "নিশ্চল অস্থিসন্ধি (Fixed Joint)", isCorrect: false },
      { id: "opt_bio_9_13_d", text: "ঈষৎ সচল সন্ধি (Slightly Movable)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বল ও কোটরসন্ধি (Ball and Socket Joint)।",
      coreConcept: "বল ও কোটরসন্ধিতে একটি অস্থির মাথার মতো গোল অংশ অন্য অস্থির কোটরে নিবিষ্ট থাকে; যেমন কাঁধ ও উরুসন্ধি।",
      distractorAnalysis: {
        opt_bio_9_13_a: "কবজা সন্ধি হলো কনুই ও হাঁটু।",
        opt_bio_9_13_c: "নিশ্চল সন্ধি হলো করোটি।",
        opt_bio_9_13_d: "ঈষৎ সচল সন্ধি হলো মেরুদণ্ড।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 195
      },
      proTipShortcut: "কাঁধ ও উরুসন্ধি সব দিকে ঘোরে = বল ও কোটরসন্ধি।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_14",
    topicId: "top_ssc_biology_ch9_3",
    type: "MCQ",
    stem: "হাতের কনুই এবং পায়ের জানু বা হাঁটুতে কোন ধরনের অস্থিসন্ধি দেখা যায়?",
    options: [
      { id: "opt_bio_9_14_a", text: "বল ও কোটরসন্ধি", isCorrect: false },
      { id: "opt_bio_9_14_b", text: "কবজা সন্ধি", isCorrect: true },
      { id: "opt_bio_9_14_c", text: "সিউচার সন্ধি", isCorrect: false },
      { id: "opt_bio_9_14_d", text: "পিভট সন্ধি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কবজা সন্ধি।",
      coreConcept: "দরজার পাল্লার মতো কেবল একদিকে নাড়ানো যায় এমন সন্ধি হলো কবজা সন্ধি; যেমন কনুই ও হাঁটু।",
      distractorAnalysis: {
        opt_bio_9_14_a: "বল ও কোটরসন্ধি সব দিকে ঘোরানো যায়।",
        opt_bio_9_14_c: "সিউচার সন্ধি অনড় থাকে।",
        opt_bio_9_14_d: "পিভট সন্ধি অক্ষ বরাবর ঘোরে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 196
      },
      proTipShortcut: "দরজার কবজা = কনুই ও হাঁটু (একদিকে চলন)।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // TOPIC 4: পেশিতন্ত্র ও অস্থি-পেশির ক্রিয়া (top_ssc_biology_ch9_4)
  // ==========================================
  {
    id: "q_bio_9_15",
    topicId: "top_ssc_biology_ch9_4",
    type: "MCQ",
    stem: "মানুষের বাহুর কনুই বাঁকা (Flexion) করতে নিচের কোন পেশিজোড়ের ক্রিয়া ঘটে?",
    options: [
      { id: "opt_bio_9_15_a", text: "বাইসেপস সংকুচিত ও ট্রাইসেপস শিথিল হয়", isCorrect: true },
      { id: "opt_bio_9_15_b", text: "ট্রাইসেপস সংকুচিত ও বাইসেপস শিথিল হয়", isCorrect: false },
      { id: "opt_bio_9_15_c", text: "উভয় পেশি একসাথে সংকুচিত হয়", isCorrect: false },
      { id: "opt_bio_9_15_d", text: "উভয় পেশি একসাথে সম্পূর্ণ প্রসারিত হয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বাইসেপস সংকুচিত ও ট্রাইসেপস শিথিল হয়।",
      coreConcept: "কনুই বাঁকা করতে ইচ্ছাধীন স্নায়ুর তাড়নায় বাইসেপস পেশি সংকুচিত হয় এবং ট্রাইসেপস পেশি শিথিল হয়ে প্রসারিত হয়। ফলে রেডিয়াস ও আলনা হিউমেরাসের কাছে আসে।",
      distractorAnalysis: {
        opt_bio_9_15_b: "ট্রাইসেপস সংকুচিত ও বাইসেপস শিথিল হলে কনুই সোজা (Extension) হয়।",
        opt_bio_9_15_c: "উভয় পেশি একসাথে সংকুচিত হলে অঙ্গ অবশ বা লক হয়ে যাবে।",
        opt_bio_9_15_d: "উভয় পেশি শিথিল থাকলে কোনো যান্ত্রিক টান সৃষ্টি হয় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.১",
        pageNumber: 197
      },
      proTipShortcut: "কনুই বাঁকা = বাইসেপস টানটান সংকুচিত; কনুই সোজা = ট্রাইসেপস টানটান সংকুচিত।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_16",
    topicId: "top_ssc_biology_ch9_4",
    type: "MCQ",
    stem: "মাংসপেশির প্রান্তভাগ শক্ত রজ্জুর মতো হয়ে অস্থির গায়ের সাথে সংযুক্তকারী অংশের নাম কী?",
    options: [
      { id: "opt_bio_9_16_a", text: "লিগামেন্ট", isCorrect: false },
      { id: "opt_bio_9_16_b", text: "টেনডন", isCorrect: true },
      { id: "opt_bio_9_16_c", text: "পেরিঅস্টিয়াম", isCorrect: false },
      { id: "opt_bio_9_16_d", text: "ল্যাকিউনি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: টেনডন।",
      coreConcept: "মাংসপেশির প্রান্তভাগ দড়ি বা রজ্জুর মতো শক্ত হয়ে অস্থির গায়ের সাথে সংযুক্ত হয়, এই শক্ত প্রান্তকে টেনডন (Tendon) বলে।",
      distractorAnalysis: {
        opt_bio_9_16_a: "লিগামেন্ট একটি অস্থির সাথে অন্য অস্থিকে সংযুক্ত করে।",
        opt_bio_9_16_c: "পেরিঅস্টিয়াম হলো অস্থির বাইরের পর্দা।",
        opt_bio_9_16_d: "ল্যাকিউনি হলো তরুণাস্থির কোষ প্রকোষ্ঠ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.২",
        pageNumber: 197
      },
      proTipShortcut: "পেশি + অস্থি = টেনডন (Tendon); অস্থি + অস্থি = লিগামেন্ট (Ligament)।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_17",
    topicId: "top_ssc_biology_ch9_4",
    type: "MCQ",
    stem: "টেনডন ও লিগামেন্টের প্রধান গঠনগত পার্থক্যের ক্ষেত্রে কোনটি সঠিক?",
    options: [
      { id: "opt_bio_9_17_a", text: "টেনডন শাখান্বিত জালকাকার কিন্তু লিগামেন্ট সমান্তরাল বান্ডিল", isCorrect: false },
      { id: "opt_bio_9_17_b", text: "টেনডনের স্থিতিস্থাপকতা বেশি কিন্তু লিগামেন্টের স্থিতিস্থাপকতা নগণ্য", isCorrect: false },
      { id: "opt_bio_9_17_c", text: "টেনডনে ঘন শ্বেততন্তু থাকে এবং লিগামেন্টে পীত স্থিতিস্থাপক তন্তু বেশি থাকে", isCorrect: true },
      { id: "opt_bio_9_17_d", text: "টেনডন অস্থির সাথে অস্থি জোড়া লাগায় আর লিগামেন্ট পেশির সাথে অস্থি জোড়া লাগায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: টেনডনে ঘন শ্বেততন্তু থাকে এবং লিগামেন্টে পীত স্থিতিস্থাপক তন্তু বেশি থাকে।",
      coreConcept: "টেনডন ঘন শ্বেত তন্তুময় যোজক টিস্যু দ্বারা গঠিত এবং এর স্থিতিস্থাপকতা কম; লিগামেন্টে পীতবর্ণের স্থিতিস্থাপক তন্তুর সংখ্যা বেশি থাকায় এর স্থিতিস্থাপকতা বেশি।",
      distractorAnalysis: {
        opt_bio_9_17_a: "টেনডন সমান্তরাল আঁটি বা বান্ডিল তৈরি করে, লিগামেন্ট জালকের মতো ছড়ানো।",
        opt_bio_9_17_b: "উল্টো বলা হয়েছে; টেনডন অস্থিতিস্থাপক, লিগামেন্ট বেশি স্থিতিস্থাপক।",
        opt_bio_9_17_d: "টেনডন পেশি-অস্থি সংযোগ করে এবং লিগামেন্ট অস্থি-অস্থি সংযোগ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.২",
        pageNumber: 198
      },
      proTipShortcut: "টেনডন = শ্বেত কোলাজেন (দৃঢ়); লিগামেন্ট = পীত ইলাস্টিন (স্থিতিস্থাপক)।"
    },
    difficulty: "HARD",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_18",
    topicId: "top_ssc_biology_ch9_4",
    type: "MCQ",
    stem: "টেনডন তন্তুগুলো পেশিতন্তুর কোন অংশের সাথে অবিচ্ছেদ্যভাবে সংযোজিত থাকে?",
    options: [
      { id: "opt_bio_9_18_a", text: "সারকোলেমা", isCorrect: true },
      { id: "opt_bio_9_18_b", text: "মাইটোকন্ড্রিয়া", isCorrect: false },
      { id: "opt_bio_9_18_c", text: "মায়োফাইব্রিল", isCorrect: false },
      { id: "opt_bio_9_18_d", text: "পেরিঅস্টিয়াম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সারকোলেমা।",
      coreConcept: "পেশি এবং টেনডনের সংযোগস্থলে টেনডন তন্তুগুলো পেশিতন্তুর সারকোলেমায় (Sarcolemma) সংযোজিত হয়।",
      distractorAnalysis: {
        opt_bio_9_18_b: "মাইটোকন্ড্রিয়া পেশির শক্তি উৎপাদনকারী অঙ্গাণু।",
        opt_bio_9_18_c: "মায়োফাইব্রিল পেশিতন্তুর ভেতরের সংকোচনশীল তন্তু।",
        opt_bio_9_18_d: "পেরিঅস্টিয়াম হলো অস্থির আবরণী, পেশিতন্তুর নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.২",
        pageNumber: 198
      },
      proTipShortcut: "পেশির ঝিল্লি সারকোলেমাতেই টেনডন তন্তু আটকে থাকে।"
    },
    difficulty: "HARD",
    boardSource: "সিলেট বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // TOPIC 5: কঙ্কাল ও পেশি সংক্রান্ত রোগসমূহ (top_ssc_biology_ch9_5)
  // ==========================================
  {
    id: "q_bio_9_19",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "অস্টিওপোরোসিস (Osteoporosis) প্রধানত কোন খনিজের অভাবজনিত রোগ?",
    options: [
      { id: "opt_bio_9_19_a", text: "আয়োডিন", isCorrect: false },
      { id: "opt_bio_9_19_b", text: "ক্যালসিয়াম", isCorrect: true },
      { id: "opt_bio_9_19_c", text: "লৌহ", isCorrect: false },
      { id: "opt_bio_9_19_d", text: "সোডিয়াম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ক্যালসিয়াম।",
      coreConcept: "অস্টিওপোরোসিস ক্যালসিয়ামের অভাবজনিত একটি রোগ, যাতে অস্থির ঘনত্ব কমে হাড় ভঙ্গুর হয়ে যায়।",
      distractorAnalysis: {
        opt_bio_9_19_a: "আয়োডিনের অভাবে গলগণ্ড রোগ হয়।",
        opt_bio_9_19_c: "লৌহের অভাবে রক্তশূন্যতা বা অ্যানিমিয়া হয়।",
        opt_bio_9_19_d: "সোডিয়ামের ঘাটতিতে স্নায়বিক ও ইলেক্ট্রোলাইট ভারসাম্যহীনতা ঘটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 199
      },
      proTipShortcut: "অস্টিওপোরোসিস = হাড়ের ক্যালসিয়াম কমে ছিদ্রযুক্ত হওয়া।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_20",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "পঞ্চাশোর্ধ্ব পুরুষ ও নারীদের অস্টিওপোরোসিস প্রতিরোধে দৈনিক কত মিলিগ্রাম ক্যালসিয়াম গ্রহণ করা বাঞ্ছনীয়?",
    options: [
      { id: "opt_bio_9_20_a", text: "৫০০ মিলিগ্রাম", isCorrect: false },
      { id: "opt_bio_9_20_b", text: "৮০০ মিলিগ্রাম", isCorrect: false },
      { id: "opt_bio_9_20_c", text: "১২০০ মিলিগ্রাম", isCorrect: true },
      { id: "opt_bio_9_20_d", text: "২০০০ মিলিগ্রাম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ১২০০ মিলিগ্রাম।",
      coreConcept: "পাঠ্যবইয়ের পৃষ্ঠা ১৯৯ অনুযায়ী পঞ্চাশোর্ধ্ব পুরুষ ও নারীদের দৈনিক ১২০০ মিলিগ্রাম (বা চিকিৎসক নির্দেশিত) ক্যালসিয়াম গ্রহণ করা প্রয়োজন।",
      distractorAnalysis: {
        opt_bio_9_20_a: "৫০০ মিলিগ্রাম শিশুদের সাধারণ চাহিদার কাছাকাছি।",
        opt_bio_9_20_b: "৮০০ মিলিগ্রাম প্রাপ্তবয়স্কদের স্বাভাবিক বেসলাইন মান।",
        opt_bio_9_20_d: "২০০০ মিলিগ্রাম অতিরিক্ত মাত্রা যা কিডনিতে পাথরের ঝুঁকি বাড়াতে পারে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 199
      },
      proTipShortcut: "৫০+ বয়সীদের ক্যালসিয়াম লক্ষ্যমাত্রা = দৈনিক ১২০০ মিলিগ্রাম।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_21",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "অস্থির খনিজ পদার্থের ঘনত্ব মেপে অস্টিওপোরোসিস রোগ শনাক্ত করতে কোন পরীক্ষা/যন্ত্র ব্যবহৃত হয়?",
    options: [
      { id: "opt_bio_9_21_a", text: "ইসিজি (ECG)", isCorrect: false },
      { id: "opt_bio_9_21_b", text: "ঘনত্বমাপক যন্ত্র (Bone Densitometer / DEXA)", isCorrect: true },
      { id: "opt_bio_9_21_c", text: "এন্ডোস্কোপি", isCorrect: false },
      { id: "opt_bio_9_21_d", text: "স্ফিগমোম্যানোমিটার", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ঘনত্বমাপক যন্ত্র (Bone Densitometer / DEXA)।",
      coreConcept: "ঘনত্বমাপক যন্ত্রের সাহায্যে অস্থির খনিজ পদার্থের পরিমাণ নির্ণয় করে অস্টিওপোরোসিস রোগ শনাক্ত করা হয়।",
      distractorAnalysis: {
        opt_bio_9_21_a: "ইসিজি হৃৎপিণ্ডের বৈদ্যুতিক সক্রিয়তা পরিমাপ করে।",
        opt_bio_9_21_c: "এন্ডোস্কোপি ফাঁপা অঙ্গের অভ্যন্তরীণ দৃশ্য দেখার পরীক্ষা।",
        opt_bio_9_21_d: "স্ফিগমোম্যানোমিটার রক্তচাপ মাপার যন্ত্র।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 199
      },
      proTipShortcut: "অস্থির খনিজ পরিমাপ = ঘনত্বমাপক যন্ত্র (DEXA)।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_22",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "কম বয়সী ছেলেমেয়েদের অস্থিসন্ধিতে বা গিঁটে ব্যথা হওয়া কোন রোগের প্রধান লক্ষণ হতে পারে?",
    options: [
      { id: "opt_bio_9_22_a", text: "অস্টিওপোরোসিস", isCorrect: false },
      { id: "opt_bio_9_22_b", text: "বাতজ্বর (Rheumatic Fever)", isCorrect: true },
      { id: "opt_bio_9_22_c", text: "রিকেটস", isCorrect: false },
      { id: "opt_bio_9_22_d", text: "স্কার্ভি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বাতজ্বর (Rheumatic Fever)।",
      coreConcept: "কম বয়সী ছেলেমেয়েদের বেলায় গিঁটে ব্যথা বা যন্ত্রণা হওয়া রিউমেটিক ফিভার বা বাতজ্বর রোগের লক্ষণ হতে পারে (পাঠ্যবই পৃষ্ঠা ২০০)।",
      distractorAnalysis: {
        opt_bio_9_22_a: "অস্টিওপোরোসিস প্রধানত বয়স্কদের রোগ।",
        opt_bio_9_22_c: "রিকেটস ভিটামিন ডি এর অভাবে শিশুদের হাড় বাঁকা হওয়ার রোগ।",
        opt_bio_9_22_d: "স্কার্ভি ভিটামিন সি এর অভাবে মাড়ি থেকে রক্ত পড়ার রোগ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 200
      },
      proTipShortcut: "অল্পবয়সীদের গিঁটে ব্যথা = বাতজ্বর (Rheumatic fever)।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_23",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "রিউমাটয়েড আর্থ্রাইটিস রোগীর যন্ত্রণাদায়ক গিঁটের ব্যথা উপশমে নিচের কোন ব্যবস্থাটি সহায়ক?",
    options: [
      { id: "opt_bio_9_23_a", text: "বরফের তীব্র ঠাণ্ডা পানি ঢালা", isCorrect: false },
      { id: "opt_bio_9_23_b", text: "যন্ত্রণাদায়ক গিঁটের ওপর কুসুম গরম সেঁক নেওয়া", isCorrect: true },
      { id: "opt_bio_9_23_c", text: "ভারী ওজন উত্তোলন ও দীর্ঘক্ষণ দৌড়ানো", isCorrect: false },
      { id: "opt_bio_9_23_d", text: "ক্যালসিয়াম জাতীয় খাদ্য বর্জন করা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: যন্ত্রণাদায়ক গিঁটের ওপর কুসুম গরম সেঁক নেওয়া।",
      coreConcept: "যন্ত্রণাদায়ক গিঁটের ওপর কুসুম গরম সেঁক নিলে রক্ত চলাচল বাড়ে এবং অস্থিসন্ধির আড়ষ্টতা ও ব্যথা উপশম হয়।",
      distractorAnalysis: {
        opt_bio_9_23_a: "তীব্র বরফ সেঁক রক্তনালি সংকুচিত করে সন্ধির আড়ষ্টতা বাড়িয়ে দিতে পারে।",
        opt_bio_9_23_c: "ভারী কাজ বা ওজন উত্তোলন বাতের রোগীর গিঁটকে আরও ক্ষতিগ্রস্ত করে।",
        opt_bio_9_23_d: "ক্যালসিয়াম বর্জন করলে হাড় আরও দুর্বল হয়ে পড়বে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 200
      },
      proTipShortcut: "বাতের গিঁটে আরাম পেতে = কুসুম গরম সেঁক।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_24",
    topicId: "top_ssc_biology_ch9_5",
    type: "MCQ",
    stem: "নারীদের কোন শারীরিক পরিবর্তনের পর ইস্ট্রোজেনের অভাবে অস্থির ঘনত্ব ও পুরুত্ব দ্রুত হ্রাস পায়?",
    options: [
      { id: "opt_bio_9_24_a", text: "বয়ঃসন্ধিকাল", isCorrect: false },
      { id: "opt_bio_9_24_b", text: "মেনোপজ (রজঃনিবৃত্তি)", isCorrect: true },
      { id: "opt_bio_9_24_c", text: "ঋতুস্রাব শুরুর সময়", isCorrect: false },
      { id: "opt_bio_9_24_d", text: "গর্ভধারণের প্রথম মাস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মেনোপজ (রজঃনিবৃত্তি)।",
      coreConcept: "নারীদের মেনোপজ অর্থাৎ চিরতরে মাসিক বন্ধ হয়ে যাওয়ার পর ইস্ট্রোজেন হরমোনের অভাবে অস্থির ঘনত্ব ও পুরুত্ব দ্রুত কমতে থাকে।",
      distractorAnalysis: {
        opt_bio_9_24_a: "বয়ঃসন্ধিকালে হাড়ের বৃদ্ধি ঘটে।",
        opt_bio_9_24_c: "ঋতুস্রাব শুরুর সময় হাড় মজবুত গঠনের প্রক্রিয়ায় থাকে।",
        opt_bio_9_24_d: "গর্ভকালীন সময়ে হরমোনীয় পরিবর্তন ঘটলেও মেনোপজের মতো স্থায়ী হাড় ক্ষয় হয় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 199
      },
      proTipShortcut: "মেনোপজ পরবর্তী নারী = অস্টিওপোরোসিসের সর্বোচ্চ ঝুঁকিতে।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // ==========================================
  // CREATIVE QUESTIONS (CQ_CREATIVE 1 to 6)
  // ==========================================
  {
    id: "q_bio_9_25",
    topicId: "top_ssc_biology_ch9_1",
    type: "CQ_CREATIVE",
    stem: "শ্রেণিকক্ষে জীববিজ্ঞান শিক্ষক মানবদেহের কঙ্কাল মডেল প্রদর্শন করে বললেন, “আমাদের দেহ ২০৬টি অস্থির সুদৃঢ় কাঠামো দ্বারা গঠিত। এর কেন্দ্রীয় অংশে করোটি, মেরুদণ্ড ও বক্ষপিঞ্জর মস্তিষ্ক, সুষুম্নাকাণ্ড ও হৃৎপিণ্ডকে সুরক্ষিত রাখে। অপরদিকে উপাঙ্গীয় অংশ আমাদের নানাবিধ অঙ্গ সঞ্চালন ও চলাচলে প্রত্যক্ষভাবে সহায়তা করে।”",
    options: null,
    explanation: {
      directAnswer: "কঙ্কালতন্ত্রের দ্বৈত বিভাজন (অক্ষীয় ও উপাঙ্গীয় কঙ্কাল) এবং গুরুত্বপূর্ণ অঙ্গ সংরক্ষণ।",
      coreConcept: "কঙ্কাল কাঠামো অভ্যন্তরীণ কোমল অঙ্গের বর্ম এবং লোকোমোশনের সক্রিয় মেকানিক্যাল ফ্রেম হিসেবে কাজ করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১",
        pageNumber: 192
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "কঙ্কালতন্ত্র কাকে বলে তা পাঠ্যবই অনুসারে নির্ভুলভাবে লেখা।" },
      kha: { mark: 2, criteria: "বহিঃকঙ্কাল ও অন্তঃকঙ্কালের মধ্যে দুটি সুনির্দিষ্ট উদাহরণসহ পার্থক্য ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে উল্লিখিত কেন্দ্রীয় অক্ষীয় কঙ্কালের প্রধান তিনটি অংশের গঠন ও সুরক্ষিত অঙ্গের বর্ণনা দেওয়া।" },
      gha: { mark: 4, criteria: "“কঙ্কালতন্ত্র কেবল কাঠামো গঠনই করে না, বরং রক্ত উৎপাদন ও খনিজ সঞ্চয়েও অপরিহার্য”—উক্তিটি বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_26",
    topicId: "top_ssc_biology_ch9_2",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান ল্যাবে নবম শ্রেণির শিক্ষার্থীরা দুটি নমুনা টিস্যু পর্যবেক্ষণ করল। নমুনা X হলো অত্যন্ত দৃঢ় ও অনমনীয়, যার ম্যাট্রিক্সে প্রচুর ক্যালসিয়াম ও ফসফরাস লবণ বিদ্যমান। নমুনা Y হলো কিছুটা নরম ও স্থিতিস্থাপক, যার বহির্ভাগে পেরিকন্ড্রিয়াম আবরণী এবং ম্যাট্রিক্সে কনড্রিন রয়েছে।",
    options: null,
    explanation: {
      directAnswer: "নমুনা X হলো অস্থি এবং নমুনা Y হলো তরুণাস্থি।",
      coreConcept: "অস্থি ও তরুণাস্থি উভয়ই যোজক কলার রূপান্তরিত রূপ হলেও তাদের ম্যাট্রিক্স ও দৃঢ়তায় সুনির্দিষ্ট পার্থক্য রয়েছে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 194
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "কনড্রিন কী তা এক বাক্যে নির্ভুলভাবে লেখা।" },
      kha: { mark: 2, criteria: "সূর্যের আলো কীভাবে অস্থি গঠনে সাহায্য করে তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের নমুনা X এবং Y এর মধ্যে ৫টি সুনির্দিষ্ট গঠনগত পার্থক্য তুলনামূলক ছকে উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "মানবদেহে নমুনা Y এর উপস্থিতি কেন অত্যাবশ্যকীয়—বিভিন্ন অঙ্গের অবস্থানের আলোকে তা বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_27",
    topicId: "top_ssc_biology_ch9_3",
    type: "CQ_CREATIVE",
    stem: "নাফিস ফুটবল খেলতে গিয়ে লক্ষ্য করল, সে তার পা সকল দিকে ঘোরাতে পারলেও হাঁটুর নিচের অংশ কেবল সামনের দিকে সোজা ও পেছনের দিকে ভাঁজ করতে পারে। বিজ্ঞান শিক্ষক তাকে জানালেন, মানবদেহে বিভিন্ন অস্থিসন্ধির গঠনগত বৈচিত্র্যের কারণেই চলনের পরিসরে এই পার্থক্য ঘটে।",
    options: null,
    explanation: {
      directAnswer: "উরুসন্ধি বল ও কোটরসন্ধি এবং হাঁটু কবজা সন্ধি।",
      coreConcept: "বল ও কোটরসন্ধিতে ত্রিমাত্রিক বহুমুখী চলন এবং কবজা সন্ধিতে একমুখী দ্বিমাত্রিক চলন ঘটে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.১.২",
        pageNumber: 195
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "অস্থিসন্ধি কাকে বলে তা সংজ্ঞা আকারে লেখা।" },
      kha: { mark: 2, criteria: "করোটিকার অস্থিসন্ধিকে নিশ্চল বলা হয় কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "নাফিসের উল্লিখিত দুই ধরনের অস্থিসন্ধির গাঠনিক মেকানিজম তুলনা করা।" },
      gha: { mark: 4, criteria: "একটি আদর্শ সাইনোভিয়াল সন্ধির বিভিন্ন অংশের ভূমিকা এবং সাইনোভিয়াল রসের গুরুত্ব বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_28",
    topicId: "top_ssc_biology_ch9_4",
    type: "CQ_CREATIVE",
    stem: "সৃজন ডাম্বেল নিয়ে ব্যায়াম করার সময় খেয়াল করল, যখন সে হাত ভাঁজ করে ডাম্বেল বুকের কাছে আনে তখন বাহুর উপরের সম্মুখ পেশি ফুলে ওঠে। আবার যখন হাত নিচের দিকে সোজা করে, তখন পেছনের দিকের পেশি টানটান হয় এবং আগের পেশিটি নরম হয়ে যায়।",
    options: null,
    explanation: {
      directAnswer: "বাইসেপস ও ট্রাইসেপস পেশির অ্যান্টাগনিস্টিক বা বিপরীতমুখী ক্রিয়া।",
      coreConcept: "পেশি কেবল টানতে পারে, ধাক্কা দিতে পারে না; তাই জোড়ায় জোড়ায় বিপরীতমুখী পেশি কঙ্কাল নাড়াতে কাজ করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.১",
        pageNumber: 197
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "অ্যান্টাগনিস্টিক পেশি বলতে কী বোঝায় তা লেখা।" },
      kha: { mark: 2, criteria: "পেশি কেন কখনোই ধাক্কা দিতে পারে না তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে বর্ণিত সৃজনের হাত ভাঁজ ও সোজা করার শারীরবৃত্তীয় প্রক্রিয়া চিহ্নিত চিত্রসহ ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "হাড়ের সাথে পেশির দৃঢ় সংযোগে টেনডনের গঠনগত ভূমিকা বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "যশোর বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_29",
    topicId: "top_ssc_biology_ch9_4",
    type: "CQ_CREATIVE",
    stem: "ক্রীড়াবিদ অনিক দৌড়াতে গিয়ে পায়ের গোড়ালিতে তীব্র মোচড় খেল। চিকিৎসক পরীক্ষা করে বললেন, “তোমার একটি অস্থির সাথে অন্য অস্থির সংযোগকারী স্থিতিস্থাপক লিগামেন্ট ক্ষতিগ্রস্ত হয়েছে, তবে সৌভাগ্যবশত পেশির সাথে অস্থির সংযোগকারী অস্থিতিস্থাপক টেনডনটি অক্ষত রয়েছে।”",
    options: null,
    explanation: {
      directAnswer: "লিগামেন্ট ও টেনডনের গঠন ও কার্যকরী ভূমিকা।",
      coreConcept: "টেনডন পেশি-অস্থি সংযোগকারী কোলাজেন তন্তু এবং লিগামেন্ট অস্থি-অস্থি সংযোগকারী ইলাস্টিন তন্তু।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.২.২",
        pageNumber: 198
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "লিগামেন্ট কী তা এক বাক্যে লেখা।" },
      kha: { mark: 2, criteria: "টেনডনের স্থিতিস্থাপকতা কম হওয়া শারীরবৃত্তীয়ভাবে কেন সুবিধাজনক তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "ডাক্তারের বক্তব্যের আলোকে টেনডন ও লিগামেন্টের ৪টি সুস্পষ্ট পার্থক্য ছকে উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "চলন ও দেহের ভারবহনে লিগামেন্ট ক্ষতিগ্রস্ত হলে কী রূপ জটিলতা দেখা দেয়—বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_9_30",
    topicId: "top_ssc_biology_ch9_5",
    type: "CQ_CREATIVE",
    stem: "৫৫ বছর বয়সী ফাতেমা বেগম প্রায়ই পিঠে ও কোমরে তীব্র ব্যথা অনুভব করেন। সম্প্রতি বাথরুমে সামান্য পিছলে পড়ে যাওয়ায় তাঁর কোমরের হাড় ভেঙে যায়। অন্যদিকে তাঁর বড় বোন ৬০ বছর বয়সী সালেহা বেগমের হাতের ও পায়ের বিভিন্ন গিঁট ফুলে গেছে এবং সকালে ঘুম থেকে উঠলে গিঁট শক্ত হয়ে তীব্র যন্ত্রণা করে।",
    options: null,
    explanation: {
      directAnswer: "ফাতেমা বেগম অস্টিওপোরোসিস এবং সালেহা বেগম রিউমাটয়েড আর্থ্রাইটিসে আক্রান্ত।",
      coreConcept: "ক্যালসিয়াম ঘাটতিজনিত অস্থিক্ষয় হলো অস্টিওপোরোসিস এবং অস্থিসন্ধির প্রদাহজনিত রোগ হলো আর্থ্রাইটিস।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "নবম অধ্যায়: দৃঢ়তা প্রদান ও চলন · ৯.৩",
        pageNumber: 199
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "অস্টিওপোরোসিস কাকে বলে তা লেখা।" },
      kha: { mark: 2, criteria: "মেনোপজের পর নারীদের হাড় দ্রুত ক্ষয়প্রাপ্ত হয় কেন তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "ফাতেমা বেগমের রোগটি কীভাবে নির্ণয় করা যায় এবং তাঁর খাদ্যতালিকায় কী কী পরিবর্তন আনা প্রয়োজন তা বর্ণনা করা।" },
      gha: { mark: 4, criteria: "সালেহা বেগমের রোগের লক্ষণ ও কষ্ট লাঘবে করণীয় প্রতিরোধমূলক ব্যবস্থার মূল্যায়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
