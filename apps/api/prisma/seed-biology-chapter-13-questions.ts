import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter13QuestionsBatch1: QuestionData[] = [
  // -------------------------------------------------------------------------
  // Topic 13.1: বাস্তুতন্ত্রের ধারণা ও উপাদানসমূহ (MCQs: q_bio_13_01 to q_bio_13_12)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_13_01",
    topicId: "top_ssc_biology_ch13_1",
    type: "MCQ",
    stem: "১৯৩৫ সালে কোন বাস্তুবিদ সর্বপ্রথম 'Ecosystem' (বাস্তুতন্ত্র) শব্দটি প্রবর্তন করেন?",
    options: [
      { id: "opt_bio_13_01_a", text: "এ. জি. ট্যান্সলে", isCorrect: true },
      { id: "opt_bio_13_01_b", text: "আর্নস্ট হেকেল", isCorrect: false },
      { id: "opt_bio_13_01_c", text: "রেমন্ড লিন্ডেম্যান", isCorrect: false },
      { id: "opt_bio_13_01_d", text: "চার্লস ডারউইন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: এ. জি. ট্যান্সলে।",
      coreConcept: "ব্রিটিশ বাস্তুবিদ এ. জি. ট্যান্সলে (A. G. Tansley) ১৯৩৫ সালে জীব ও জড় পরিবেশের অবিচ্ছেদ্য একককে সংজ্ঞায়িত করতে 'Ecosystem' শব্দটি উদ্ভাবন করেন।",
      distractorAnalysis: {
        opt_bio_13_01_b: "আর্নস্ট হেকেল ১৮৬৬ সালে 'Ecology' (বাস্তুবিদ্যা) শব্দটি প্রথম ব্যবহার করেন।",
        opt_bio_13_01_c: "রেমন্ড লিন্ডেম্যান ১৯৪২ সালে ট্রফিক স্তরে ১০% শক্তি প্রবাহের সূত্র প্রদান করেন।",
        opt_bio_13_01_d: "চার্লস ডারউইন প্রাকৃতিক নির্বাচন দ্বারা জৈব অভিব্যক্তির তত্ত্ব প্রদান করেন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 283
      },
      proTipShortcut: "Ecosystem = Tansley (1935); Ecology = Haeckel (1866)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_02",
    topicId: "top_ssc_biology_ch13_1",
    type: "MCQ",
    stem: "বাস্তুতন্ত্রের অজৈব (Inorganic) উপাদান নিচের কোনটি?",
    options: [
      { id: "opt_bio_13_02_a", text: "হিউমাস", isCorrect: false },
      { id: "opt_bio_13_02_b", text: "ক্যালসিয়াম ও ম্যাগনেসিয়াম লবণ", isCorrect: true },
      { id: "opt_bio_13_02_c", text: "মৃত পাতা ও প্রাণীর কঙ্কাল", isCorrect: false },
      { id: "opt_bio_13_02_d", text: "ইউরিয়া ও প্রোটিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ক্যালসিয়াম ও ম্যাগনেসিয়াম লবণ।",
      coreConcept: "পানি, বায়ুর গ্যাস ও খনিজ উপাদান (নাইট্রোজেন, ক্যালসিয়াম, ম্যাগনেসিয়াম, ফসফরাস) হলো বাস্তুতন্ত্রের অজৈব উপাদান।",
      distractorAnalysis: {
        opt_bio_13_02_a: "হিউমাস হলো মৃত উদ্ভিদ ও প্রাণীর পচনের ফলে গঠিত জৈব পদার্থ।",
        opt_bio_13_02_c: "মৃত জীবদেহাবশেষ হলো জৈব উপাদান।",
        opt_bio_13_02_d: "ইউরিয়া ও প্রোটিন হলো নাইট্রোজেনঘটিত জৈব যৌগ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 284
      },
      proTipShortcut: "জীবদেহাবশেষ বা কার্বন-হাইড্রোজেন শৃঙ্খল = জৈব; খনিজ আয়ন/গ্যাস = অজৈব।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_03",
    topicId: "top_ssc_biology_ch13_1",
    type: "MCQ",
    stem: "পুকুরের বাস্তুতন্ত্রে ড্যাফনিয়া (Daphnia) ও সাইক্লপস (Cyclops) কোন পুষ্টি স্তরের অন্তর্ভুক্ত?",
    options: [
      { id: "opt_bio_13_03_a", text: "উৎপাদক স্তর", isCorrect: false },
      { id: "opt_bio_13_03_b", text: "প্রথম স্তরের খাদক", isCorrect: true },
      { id: "opt_bio_13_03_c", text: "দ্বিতীয় স্তরের খাদক", isCorrect: false },
      { id: "opt_bio_13_03_d", text: "বিয়োজক স্তর", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: প্রথম স্তরের খাদক।",
      coreConcept: "ড্যাফনিয়া ও সাইক্লপস হলো আণুবীক্ষণিক জলজ প্রাণী অর্থাৎ জুপ্ল্যাঙ্কটন, যা ফাইটোপ্ল্যাঙ্কটন খেয়ে বেঁচে থাকে; তাই এরা ১ম স্তরের খাদক (তৃণভোজী)।",
      distractorAnalysis: {
        opt_bio_13_03_a: "ভলভক্স ও স্পাইরোগাইরা হলো উৎপাদক (ফাইটোপ্ল্যাঙ্কটন)।",
        opt_bio_13_03_c: "ছোট মাছ ও ব্যাঙ যারা জুপ্ল্যাঙ্কটন খায় তারা দ্বিতীয় স্তরের খাদক।",
        opt_bio_13_03_d: "পুকুরের তলদেশের কাদার ব্যাকটেরিয়া ও ছত্রাক হলো বিয়োজক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 285
      },
      proTipShortcut: "Daphnia / Cyclops = Zooplankton = ১ম স্তরের খাদক।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_04",
    topicId: "top_ssc_biology_ch13_1",
    type: "MCQ",
    stem: "বাস্তুতন্ত্রের বিয়োজকদের 'রূপান্তরক' (Transformers) বলা হয় কেন?",
    options: [
      { id: "opt_bio_13_04_a", text: "কারণ এরা সৌরশক্তিকে রাসায়নিক শক্তিতে রূপান্তর করে", isCorrect: false },
      { id: "opt_bio_13_04_b", text: "কারণ এরা জটিল জৈব যৌগকে ভেঙে সরল অজৈব পুষ্টিতে রূপান্তর করে পরিবেশে ফিরিয়ে দেয়", isCorrect: true },
      { id: "opt_bio_13_04_c", text: "কারণ এরা এক ট্রফিক লেভেল থেকে অন্য ট্রফিক লেভেলে রূপান্তরিত হয়", isCorrect: false },
      { id: "opt_bio_13_04_d", text: "কারণ এরা অজৈব লবণকে ডিএনএ-তে রূপান্তরিত করে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কারণ এরা জটিল জৈব যৌগকে ভেঙে সরল অজৈব পুষ্টিতে রূপান্তর করে পরিবেশে ফিরিয়ে দেয়।",
      coreConcept: "ব্যাকটেরিয়া ও ছত্রাক মৃত জীবদেহের জটিল প্রোটিন, কার্বোহাইড্রেট ও লিপিডকে সরল খনিজ ও গ্যাসে বিশ্লিষ্ট করে মাটি ও পানিতে ফিরিয়ে দেয়।",
      distractorAnalysis: {
        opt_bio_13_04_a: "সৌরশক্তিকে রাসায়নিক শক্তিতে রূপান্তর করে উৎপাদক (সবুজ উদ্ভিদ)।",
        opt_bio_13_04_c: "জীব রূপান্তরিত হয় না, পুষ্টি উপাদান চক্রাকারে ঘোরে।",
        opt_bio_13_04_d: "অজৈব উপাদান থেকে ডিএনএ সংশ্লেষণ করে জীবিত সজীব কোষ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 284
      },
      proTipShortcut: "বিয়োজক = রূপান্তরক = জটিল জৈব → সরল অজৈব পুষ্টি।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_05",
    topicId: "top_ssc_biology_ch13_1",
    type: "MCQ",
    stem: "পুকুরের বাস্তুতন্ত্রে ফাইটোপ্ল্যাঙ্কটন হিসেবে গণ্য করা হয় নিচের কোনটিকে?",
    options: [
      { id: "opt_bio_13_05_a", text: "ভলভক্স ও ক্ল্যামাইডোমোনাস", isCorrect: true },
      { id: "opt_bio_13_05_b", text: "ড্যাফনিয়া ও রোটিফার", isCorrect: false },
      { id: "opt_bio_13_05_c", text: "হাইড্রিলা ও শাপলা", isCorrect: false },
      { id: "opt_bio_13_05_d", text: "বোয়াল মাছ ও ব্যাঙ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ভলভক্স ও ক্ল্যামাইডোমোনাস।",
      coreConcept: "পানিতে মুক্তভাবে ভাসমান আণুবীক্ষণিক সালোকসংশ্লেষণকারী শৈবালদের ফাইটোপ্ল্যাঙ্কটন বলে (যেমন ভলভক্স, ক্ল্যামাইডোমোনাস)।",
      distractorAnalysis: {
        opt_bio_13_05_b: "ড্যাফনিয়া ও রোটিফার হলো আণুবীক্ষণিক প্রাণী অর্থাৎ জুপ্ল্যাঙ্কটন।",
        opt_bio_13_05_c: "হাইড্রিলা ও শাপলা হলো মূলযুক্ত বৃহৎ জলজ উদ্ভিদ (ম্যাক্রোফাইট), আণুবীক্ষণিক প্লাঙ্কটন নয়।",
        opt_bio_13_05_d: "বোয়াল ও ব্যাঙ হলো যথাক্রমে ৩য় ও ২য় স্তরের মাংসাশী খাদক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 285
      },
      proTipShortcut: "Phyto = উদ্ভিদ (Volvox); Zoo = প্রাণী (Daphnia)।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_06",
    topicId: "top_ssc_biology_ch13_1",
    type: "MCQ",
    stem: "মানুষ খাদ্য গ্রহণের অভ্যাসের ভিত্তিতে বাস্তুতন্ত্রে কোন স্তরের অন্তর্ভুক্ত?",
    options: [
      { id: "opt_bio_13_06_a", text: "কেবলমাত্র প্রথম স্তরের খাদক", isCorrect: false },
      { id: "opt_bio_13_06_b", text: "কেবলমাত্র তৃতীয় স্তরের খাদক", isCorrect: false },
      { id: "opt_bio_13_06_c", text: "সর্বভুক (Omnivore)", isCorrect: true },
      { id: "opt_bio_13_06_d", text: "স্বভোজী উৎপাদক", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: সর্বভুক (Omnivore)।",
      coreConcept: "মানুষ উদ্ভিদজাত খাদ্য (শাকসবজি) খেলে ১ম স্তরের খাদক, আবার খাদক প্রাণী খেলে ২য় বা ৩য় স্তরের খাদক; তাই মানুষ একটি সর্বভুক জীব।",
      distractorAnalysis: {
        opt_bio_13_06_a: "মানুষ মাংস ও মাছও গ্রহণ করে, তাই কেবল ১ম স্তর নয়।",
        opt_bio_13_06_b: "মানুষ উদ্ভিদভোজী খাবারও খায়, তাই কেবল ৩য় স্তর নয়।",
        opt_bio_13_06_d: "মানুষ নিজের খাদ্য নিজে সালোকসংশ্লেষণে সংশ্লেষ করতে পারে না, তাই উৎপাদক নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 285
      },
      proTipShortcut: "মানুষ ও কাক = সর্বভুক (Omnivore)।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_07",
    topicId: "top_ssc_biology_ch13_1",
    type: "MCQ",
    stem: "বাস্তুতন্ত্রের ভৌত (Physical) উপাদান হিসেবে বিবেচিত হয় কোনটি?",
    options: [
      { id: "opt_bio_13_07_a", text: "নাইট্রোজেন ও ফসফরাস লবণ", isCorrect: false },
      { id: "opt_bio_13_07_b", text: "সূর্যালোকের পরিমাণ ও বায়ুর আর্দ্রতা", isCorrect: true },
      { id: "opt_bio_13_07_c", text: "মৃতদেহের পচনশীল প্রোটিন", isCorrect: false },
      { id: "opt_bio_13_07_d", text: "নীলাভ সবুজ শৈবাল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সূর্যালোকের পরিমাণ ও বায়ুর আর্দ্রতা।",
      coreConcept: "সূর্যালোক, তাপমাত্রা, বায়ুর আর্দ্রতা, চাপ ও বায়ুপ্রবাহ হলো বাস্তুতন্ত্রের জলবায়ুগত ভৌত উপাদান।",
      distractorAnalysis: {
        opt_bio_13_07_a: "নাইট্রোজেন ও ফসফরাস হলো রাসায়নিক অজৈব উপাদান।",
        opt_bio_13_07_c: "মৃতদেহের প্রোটিন হলো জৈব উপাদান (হিউমাস)।",
        opt_bio_13_07_d: "নীলাভ সবুজ শৈবাল হলো জীব উপাদান (উৎপাদক)।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 284
      },
      proTipShortcut: "ভৌত = আলো, বাতাস, তাপমাত্রা, আর্দ্রতা।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_08",
    topicId: "top_ssc_biology_ch13_1",
    type: "MCQ",
    stem: "একটি পুকুরে ক্ষতিকর রাসায়নিক বর্জ্য ফেলে বিয়োজক ধ্বংস করে দিলে তাৎক্ষণিকভাবে কী ঘটবে?",
    options: [
      { id: "opt_bio_13_08_a", text: "পুকুরের তলদেশে মৃত দেহাবশেষের স্তূপ জমবে এবং খনিজ পুষ্টি চক্র ব্যাহত হবে", isCorrect: true },
      { id: "opt_bio_13_08_b", text: "ফাইটোপ্ল্যাঙ্কটনের বংশবৃদ্ধি অস্বাভাবিক বেড়ে যাবে", isCorrect: false },
      { id: "opt_bio_13_08_c", text: "ছোট মাছগুলো সরাসরি সৌরশক্তি শোষণ করতে শুরু করবে", isCorrect: false },
      { id: "opt_bio_13_08_d", text: "পুকুরের পানি সম্পূর্ণ অক্সিজেনযুক্ত থাকবে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পুকুরের তলদেশে মৃত দেহাবশেষের স্তূপ জমবে এবং খনিজ পুষ্টি চক্র ব্যাহত হবে।",
      coreConcept: "বিয়োজক না থাকলে মৃতদেহ বিশ্লিষ্ট হবে না, ফলে পানিতে খনিজ লবণ পুনঃপ্রবেশ করবে না এবং পুষ্টির অভাবে সমগ্র বাস্তুতন্ত্র অচল হয়ে পড়বে।",
      distractorAnalysis: {
        opt_bio_13_08_b: "পানিতে খনিজ লবণ না ফিরলে ফাইটোপ্ল্যাঙ্কটন পুষ্টিহীনতায় মারা যাবে।",
        opt_bio_13_08_c: "প্রাণী কখনো সালোকসংশ্লেষণ করতে পারে না।",
        opt_bio_13_08_d: "পচন প্রক্রিয়াহীন জমাট বর্জ্য ও দূষণে দ্রবীভূত অক্সিজেন মারাত্মক কমে যাবে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 285
      },
      proTipShortcut: "বিয়োজক বন্ধ = পুষ্টি চক্র বন্ধ = বর্জ্যের স্তূপ।"
    },
    difficulty: "HARD",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_09",
    topicId: "top_ssc_biology_ch13_1",
    type: "MCQ",
    stem: "পুকুরের বাস্তুতন্ত্রে 'বোয়াল মাছ' কোন স্তরের খাদক হিসেবে অবস্থান করে?",
    options: [
      { id: "opt_bio_13_09_a", text: "প্রথম স্তরের খাদক", isCorrect: false },
      { id: "opt_bio_13_09_b", text: "দ্বিতীয় স্তরের খাদক", isCorrect: false },
      { id: "opt_bio_13_09_c", text: "তৃতীয় বা সর্বোচ্চ স্তরের খাদক", isCorrect: true },
      { id: "opt_bio_13_09_d", text: "স্বভোজী উৎপাদক", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: তৃতীয় বা সর্বোচ্চ স্তরের খাদক।",
      coreConcept: "বোয়াল মাছ অন্যান্য ছোট ও মাঝারি মাংসাশী মাছকে শিকার করে খায়, তাই এটি পুকুরের ৩য় বা শীর্ষ স্তরের খাদক।",
      distractorAnalysis: {
        opt_bio_13_09_a: "১ম স্তরের খাদক হলো জুপ্ল্যাঙ্কটন ও তৃণভোজী কীট।",
        opt_bio_13_09_b: "২য় স্তরের খাদক হলো পুঁটি বা মলা মাছ ও ব্যাঙ যা জুপ্ল্যাঙ্কটন খায়।",
        opt_bio_13_09_d: "উৎপাদক হলো জলজ শৈবাল ও গাছপালা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 286
      },
      proTipShortcut: "বোয়াল / শোল = শিকারী বড় মাছ = ৩য় বা শীর্ষ স্তর।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_10",
    topicId: "top_ssc_biology_ch13_1",
    type: "MCQ",
    stem: "বাস্তুতন্ত্রের সজীব উপাদানের মধ্যে সৌরশক্তিকে রাসায়নিক শক্তিতে রূপান্তর করার একক ক্ষমতা কার রয়েছে?",
    options: [
      { id: "opt_bio_13_10_a", text: "উৎপাদক", isCorrect: true },
      { id: "opt_bio_13_10_b", text: "১ম স্তরের খাদক", isCorrect: false },
      { id: "opt_bio_13_10_c", text: "বিয়োজক", isCorrect: false },
      { id: "opt_bio_13_10_d", text: "শীর্ষ খাদক", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: উৎপাদক।",
      coreConcept: "ক্লোরোফিলযুক্ত সবুজ উদ্ভিদ ও শৈবাল (উৎপাদক) সালোকসংশ্লেষণ প্রক্রিয়ায় সৌরশক্তিকে শর্করাজাতীয় খাদ্যের স্থিতিশক্তিতে রূপান্তর করে।",
      distractorAnalysis: {
        opt_bio_13_10_b: "১ম স্তরের খাদক উৎপাদক খেয়ে পুষ্টি লাভ করে।",
        opt_bio_13_10_c: "বিয়োজক জৈব যৌগ ভেঙে খাদ্য গ্রহণ করে।",
        opt_bio_13_10_d: "শীর্ষ খাদক অন্যান্য প্রাণীকে শিকার করে খাদ্য পায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 284
      },
      proTipShortcut: "সৌরশক্তি আবদ্ধকারী = উৎপাদক।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_11",
    topicId: "top_ssc_biology_ch13_1",
    type: "MCQ",
    stem: "পুকুরের বাস্তুতন্ত্রে নিমজ্জিত (Submerged) জলজ উদ্ভিদের উদাহরণ কোনটি?",
    options: [
      { id: "opt_bio_13_11_a", text: "কচুরিপানা", isCorrect: false },
      { id: "opt_bio_13_11_b", text: "হাইড্রিলা (Hydrilla)", isCorrect: true },
      { id: "opt_bio_13_11_c", text: "পদ্ম", isCorrect: false },
      { id: "opt_bio_13_11_d", text: "টোপাপানা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: হাইড্রিলা (Hydrilla)।",
      coreConcept: "হাইড্রিলা ও ভ্যালিসনেরিয়া সম্পূর্ণ পানির নিচে নিমজ্জিত থেকে উৎপাদক হিসেবে সালোকসংশ্লেষণ চালায় ও জলজ প্রাণীদের অক্সিজেন জোগায়।",
      distractorAnalysis: {
        opt_bio_13_11_a: "কচুরিপানা হলো মুক্ত ভাসমান জলজ উদ্ভিদ।",
        opt_bio_13_11_c: "পদ্ম হলো মূল আবদ্ধ কিন্তু পাতা ও ফুল ভাসমান উদ্ভিদ।",
        opt_bio_13_11_d: "টোপাপানা হলো ক্ষুদ্র ভাসমান উদ্ভিদ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 285
      },
      proTipShortcut: "হাইড্রিলা = নিমজ্জিত উৎপাদক।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_12",
    topicId: "top_ssc_biology_ch13_1",
    type: "MCQ",
    stem: "বাস্তুতন্ত্রের জৈব উপাদান (Organic component) বলতে প্রধানত কাকে বোঝানো হয়?",
    options: [
      { id: "opt_bio_13_12_a", text: "বায়ুমণ্ডলের কার্বন ডাই-অক্সাইড", isCorrect: false },
      { id: "opt_bio_13_12_b", text: "হিউমাস বা মৃত জীবের দেহাবশেষ", isCorrect: true },
      { id: "opt_bio_13_12_c", text: "মাটির দ্রবীভূত অক্সিজেন", isCorrect: false },
      { id: "opt_bio_13_12_d", text: "সূর্যালোকের ফটোন কণা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: হিউমাস বা মৃত জীবের দেহাবশেষ।",
      coreConcept: "উদ্ভিদ ও প্রাণীর মৃতদেহ আংশিক বা সম্পূর্ণ বিশ্লিষ্ট হয়ে মাটিতে যে কালচে জৈব স্তরের সৃষ্টি করে তাকে হিউমাস বলে, যা প্রধান জৈব অজীব উপাদান।",
      distractorAnalysis: {
        opt_bio_13_12_a: "কার্বন ডাই-অক্সাইড হলো অজৈব গ্যাসীয় উপাদান।",
        opt_bio_13_12_c: "অক্সিজেন গ্যাস হলো অজৈব উপাদান।",
        opt_bio_13_12_d: "সূর্যালোক হলো ভৌত উপাদান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 284
      },
      proTipShortcut: "হিউমাস = সারের প্রধান জৈব উপাদান।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------------------
  // Topic 13.2: পুষ্টি স্তর, খাদ্য শৃঙ্খল ও খাদ্য জাল (MCQs: q_bio_13_13 to q_bio_13_24)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_13_13",
    topicId: "top_ssc_biology_ch13_2",
    type: "MCQ",
    stem: "পরজীবী খাদ্য শৃঙ্খলের (Parasitic Food Chain) অন্যতম প্রধান বৈশিষ্ট্য কোনটি?",
    options: [
      { id: "opt_bio_13_13_a", text: "খাদক সর্বদা পোষকের চেয়ে আকারে ক্ষুদ্রতর হয়", isCorrect: true },
      { id: "opt_bio_13_13_b", text: "উৎপাদক থেকে খাদক আকারে ক্রমান্বয়ে বড় হয়", isCorrect: false },
      { id: "opt_bio_13_13_c", text: "এটি কেবল গভীর সমুদ্রে দেখা যায়", isCorrect: false },
      { id: "opt_bio_13_13_d", text: "এতে কোনো পুষ্টি স্থানান্তর ঘটে না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: খাদক সর্বদা পোষকের চেয়ে আকারে ক্ষুদ্রতর হয়।",
      coreConcept: "পরজীবী খাদ্য শৃঙ্খলে পরজীবী জীব পোষকের ওপর নির্ভর করে বাঁচে এবং সাধারণত পোষকের চেয়ে আকারে ছোট হয় (যেমন: মানুষ → মশা/উকুন → ডেঙ্গু ভাইরাস বা পরজীবী)।",
      distractorAnalysis: {
        opt_bio_13_13_b: "উৎপাদক থেকে খাদক বড় হওয়া শিকারজীবী খাদ্য শৃঙ্খলের বৈশিষ্ট্য।",
        opt_bio_13_13_c: "পরজীবী খাদ্য শৃঙ্খল স্থল ও জল উভয় পরিবেশেই ব্যাপকভাবে বিদ্যমান।",
        opt_bio_13_13_d: "পরজীবী পোষকের দেহ থেকে অবিরাম পুষ্টি শোষণ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 288
      },
      proTipShortcut: "পরজীবী শৃঙ্খল: পোষক বড় → পরজীবী খাদক ক্ষুদ্র।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_14",
    topicId: "top_ssc_biology_ch13_2",
    type: "MCQ",
    stem: "নিচের কোন খাদ্য শৃঙ্খলটি সজীব উৎপাদক ছাড়াই সরাসরি শুরু হতে পারে?",
    options: [
      { id: "opt_bio_13_14_a", text: "শিকারজীবী খাদ্য শৃঙ্খল", isCorrect: false },
      { id: "opt_bio_13_14_b", text: "মৃতজীবী খাদ্য শৃঙ্খল", isCorrect: true },
      { id: "opt_bio_13_14_c", text: "তৃণভূমির খাদ্য শৃঙ্খল", isCorrect: false },
      { id: "opt_bio_13_14_d", text: "পুকুরের শিকারজীবী শৃঙ্খল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মৃতজীবী খাদ্য শৃঙ্খল।",
      coreConcept: "মৃতজীবী খাদ্য শৃঙ্খল (Saprophytic Food Chain) সজীব উদ্ভিদের পরিবর্তে মৃত ও পচনশীল জীবদেহাবশেষ থেকে শুরু হয়ে বিয়োজক ও ক্ষুদ্র প্রাণীতে বিস্তৃত হয়।",
      distractorAnalysis: {
        opt_bio_13_14_a: "শিকারজীবী খাদ্য শৃঙ্খল অবশ্যই স্বভোজী সবুজ উৎপাদক থেকে শুরু হতে হয়।",
        opt_bio_13_14_c: "তৃণভূমির শৃঙ্খল ঘাস বা শস্য থেকে শুরু হয়।",
        opt_bio_13_14_d: "পুকুরের শৃঙ্খল ফাইটোপ্ল্যাঙ্কটন বা জলজ উদ্ভিদ থেকে শুরু হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 288
      },
      proTipShortcut: "মৃতদেহাবশেষ → ছত্রাক → কেঁচো = মৃতজীবী শৃঙ্খল।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_15",
    topicId: "top_ssc_biology_ch13_2",
    type: "MCQ",
    stem: "একটি আদর্শ শিকারজীবী খাদ্য শৃঙ্খলের সঠিক ক্রম কোনটি?",
    options: [
      { id: "opt_bio_13_15_a", text: "ঘাস → ব্যাঙ → ঘাসফড়িং → সাপ", isCorrect: false },
      { id: "opt_bio_13_15_b", text: "ঘাস → ঘাসফড়িং → ব্যাঙ → সাপ → বাজপাখি", isCorrect: true },
      { id: "opt_bio_13_15_c", text: "বাজপাখি → সাপ → ব্যাঙ → ঘাসফড়িং → ঘাস", isCorrect: false },
      { id: "opt_bio_13_15_d", text: "ঘাসফড়িং → ঘাস → সাপ → ব্যাঙ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ঘাস → ঘাসফড়িং → ব্যাঙ → সাপ → বাজপাখি।",
      coreConcept: "উৎপাদক (ঘাস) কে খায় ১ম স্তরের তৃণভোজী (ঘাসফড়িং), তাকে খায় ২য় স্তরের মাংসাশী (ব্যাঙ), তাকে খায় ৩য় স্তর (সাপ) এবং সাপকে খায় শীর্ষ খাদক (বাজপাখি)।",
      distractorAnalysis: {
        opt_bio_13_15_a: "ব্যাঙ ঘাস খায় না, ঘাসফড়িং ঘাস খায়।",
        opt_bio_13_15_c: "এটি বিপরীতমুখী ক্রম যা শক্তিপ্রবাহের নিয়মবিরোধী।",
        opt_bio_13_15_d: "উৎপাদক প্রথমে থাকতে হবে, ঘাসফড়িং নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 287
      },
      proTipShortcut: "ঘাস (T1) → ঘাসফড়িং (T2) → ব্যাঙ (T3) → সাপ (T4)।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_16",
    topicId: "top_ssc_biology_ch13_2",
    type: "MCQ",
    stem: "বাস্তুতন্ত্রের ৩য় ট্রফিক লেভেলে (T3) কোন ধরনের প্রাণী অবস্থান করে?",
    options: [
      { id: "opt_bio_13_16_a", text: "সবুজ উৎপাদক", isCorrect: false },
      { id: "opt_bio_13_16_b", text: "১ম স্তরের তৃণভোজী খাদক", isCorrect: false },
      { id: "opt_bio_13_16_c", text: "২য় স্তরের মাংসাশী খাদক", isCorrect: true },
      { id: "opt_bio_13_16_d", text: "কেবলমাত্র বিয়োজক", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ২য় স্তরের মাংসাশী খাদক।",
      coreConcept: "T1 = উৎপাদক; T2 = ১ম স্তরের খাদক (তৃণভোজী); T3 = ২য় স্তরের খাদক (ছোট মাংসাশী যেমন ব্যাঙ, ছোট মাছ)।",
      distractorAnalysis: {
        opt_bio_13_16_a: "সবুজ উৎপাদক হলো ১ম ট্রফিক লেভেল (T1)।",
        opt_bio_13_16_b: "১ম স্তরের খাদক হলো ২য় ট্রফিক লেভেল (T2)।",
        opt_bio_13_16_d: "বিয়োজকরা সরাসরি ট্রফিক শৃঙ্খলের সাধারণ স্তরে না থেকে মৃতদেহ বিশ্লিষ্ট করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 287
      },
      proTipShortcut: "টি-লেভেল = খাদ্য স্তরের সংখ্যা + ১ (T3 = ২য় স্তরের খাদক)।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_17",
    topicId: "top_ssc_biology_ch13_2",
    type: "MCQ",
    stem: "বাস্তুতন্ত্রে খাদ্য জাল (Food Web) তৈরি হওয়ার মূল কারণ কোনটি?",
    options: [
      { id: "opt_bio_13_17_a", text: "একটি জীব সাধারণত একাধিক খাদ্য শৃঙ্খলের সাথে যুক্ত থাকে", isCorrect: true },
      { id: "opt_bio_13_17_b", text: "উৎপাদক ও বিয়োজকের মধ্যে কোনো সংযোগ থাকে না", isCorrect: false },
      { id: "opt_bio_13_17_c", text: "প্রাণীরা কেবল একটি নির্দিষ্ট খাদ্যই সারাজীবন গ্রহণ করে", isCorrect: false },
      { id: "opt_bio_13_17_d", text: "শক্তি প্রবাহ দ্বিমুখী হয়ে যায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: একটি জীব সাধারণত একাধিক খাদ্য শৃঙ্খলের সাথে যুক্ত থাকে।",
      coreConcept: "প্রকৃতিতে কোনো প্রাণীই শুধু এক ধরনের খাদ্যের ওপর নির্ভর করে না; শিকারী বহুবিধ শিকার ধরে এবং শিকার বহু শিকারীর খাদ্য হয়, ফলে বহু শৃঙ্খল জালকের মতো খাদ্যজাল গঠন করে।",
      distractorAnalysis: {
        opt_bio_13_17_b: "উৎপাদক ও বিয়োজকের মধ্যে গভীর পুষ্টি সংযোগ বিদ্যমান।",
        opt_bio_13_17_c: "প্রাণীরা একাধিক খাদ্য খায় বলেই খাদ্যজাল গঠিত হয়।",
        opt_bio_13_17_d: "শক্তি প্রবাহ কখনো দ্বিমুখী হয় না, সর্বদা একমুখী।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 289
      },
      proTipShortcut: "একাধিক খাদ্য শৃঙ্খলের আন্তঃসংযোগ = খাদ্য জাল।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_18",
    topicId: "top_ssc_biology_ch13_2",
    type: "MCQ",
    stem: "খাদ্য জালে কোনো একটি প্রজাতির সংখ্যা কমে গেলে বাস্তুতন্ত্রের ভারসাম্য বজায় থাকার সম্ভাবনা বেশি কেন?",
    options: [
      { id: "opt_bio_13_18_a", text: "কারণ খাদ্য জালে বিকল্প খাদ্যের সংস্থান থাকে", isCorrect: true },
      { id: "opt_bio_13_18_b", text: "কারণ খাদকরা সরাসরি সূর্যের আলো গ্রহণ করতে পারে", isCorrect: false },
      { id: "opt_bio_13_18_c", text: "কারণ বিয়োজক নিজেই উৎপাদকে রূপান্তরিত হয়", isCorrect: false },
      { id: "opt_bio_13_18_d", text: "কারণ খাদ্য জালে কোনো মাংসাশী প্রাণী থাকে না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কারণ খাদ্য জালে বিকল্প খাদ্যের সংস্থান থাকে।",
      coreConcept: "খাদ্য জালে জটিল আন্তঃসম্পর্কের কারণে একটি নির্দিষ্ট শিকারী অন্য শিকার ধরে বাঁচতে পারে, ফলে বাস্তুতন্ত্র হঠাৎ ধসে পড়ে না।",
      distractorAnalysis: {
        opt_bio_13_18_b: "খাদক কখনো সালোকসংশ্লেষণ করতে পারে না।",
        opt_bio_13_18_c: "বিয়োজক কখনো উৎপাদকে রূপান্তরিত হয় না।",
        opt_bio_13_18_d: "খাদ্য জালে বিভিন্ন স্তরের মাংসাশী প্রাণী উপস্থিত থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 290
      },
      proTipShortcut: "খাদ্যজাল = বিকল্প খাদ্য = বাস্তুতন্ত্রের স্থিতিশীলতা।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_19",
    topicId: "top_ssc_biology_ch13_2",
    type: "MCQ",
    stem: "“মানুষ → মশা → ডেঙ্গু ভাইরাস”—এটি কোন ধরনের খাদ্য শৃঙ্খলের উদাহরণ?",
    options: [
      { id: "opt_bio_13_19_a", text: "পরজীবী খাদ্য শৃঙ্খল", isCorrect: true },
      { id: "opt_bio_13_19_b", text: "শিকারজীবী খাদ্য শৃঙ্খল", isCorrect: false },
      { id: "opt_bio_13_19_c", text: "মৃতজীবী খাদ্য শৃঙ্খল", isCorrect: false },
      { id: "opt_bio_13_19_d", text: "জলজ শস্য শৃঙ্খল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পরজীবী খাদ্য শৃঙ্খল।",
      coreConcept: "এখানে মানুষ পোষক, মশা রক্তচোষা পরজীবী এবং ভাইরাস মশার ভেতরের অণুজীব পরজীবী; আকারে বড় পোষক থেকে ক্রমান্বয়ে ক্ষুদ্র পরজীবীর দিকে গেছে।",
      distractorAnalysis: {
        opt_bio_13_19_b: "শিকারজীবী শৃঙ্খলে শিকারী সাধারণত শিকারের চেয়ে আকারে বড় হয়।",
        opt_bio_13_19_c: "মৃতজীবী শৃঙ্খল মৃতদেহ থেকে শুরু হয়।",
        opt_bio_13_19_d: "এতে কোনো জলজ শস্যের ভূমিকা নেই।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 288
      },
      proTipShortcut: "মানুষ → মশা → অণুজীব = পরজীবী শৃঙ্খল।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_20",
    topicId: "top_ssc_biology_ch13_2",
    type: "MCQ",
    stem: "একটি বনে শিকারী বাঘের সংখ্যা আকস্মিকভাবে শূন্যে নেমে আসলে নিচের কোন বিপর্যয়টি ঘটবে?",
    options: [
      { id: "opt_bio_13_20_a", text: "তৃণভোজী হরিণের সংখ্যা অত্যধিক বৃদ্ধি পাবে এবং বনের গাছপালা ধ্বংস হবে", isCorrect: true },
      { id: "opt_bio_13_20_b", text: "বনের সব গাছপালা দ্রুত বৃদ্ধি পেয়ে জঙ্গল ঘন হবে", isCorrect: false },
      { id: "opt_bio_13_20_c", text: "হরিণগুলো সালোকসংশ্লেষণ শুরু করবে", isCorrect: false },
      { id: "opt_bio_13_20_d", text: "বিয়োজকরা বাঘের অভাবে খাদ্য পাবে না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: তৃণভোজী হরিণের সংখ্যা অত্যধিক বৃদ্ধি পাবে এবং বনের গাছপালা ধ্বংস হবে।",
      coreConcept: "শীর্ষ শিকারী বিলুপ্ত হলে তার শিকার তৃণভোজী প্রাণীদের জনসংখ্যা নিয়ন্ত্রণহীনভাবে বেড়ে যায় (Overgrazing), যা বনের উৎপাদক উদ্ভিদকূল ধ্বংস করে।",
      distractorAnalysis: {
        opt_bio_13_20_b: "হরিণের সংখ্যা বেড়ে সব চারা ও পাতা খেয়ে ফেলায় গাছপালা ধ্বংস হবে।",
        opt_bio_13_20_c: "প্রাণী কখনো সালোকসংশ্লেষণ করতে পারে না।",
        opt_bio_13_20_d: "বিয়োজকরা যে কোনো মৃত জৈব পদার্থ পচিয়ে বাঁচে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 289
      },
      proTipShortcut: "শীর্ষ শিকারী শূন্য → তৃণভোজী বিস্ফোরণ → উদ্ভিদ ধ্বংস।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_21",
    topicId: "top_ssc_biology_ch13_2",
    type: "MCQ",
    stem: "খাদ্য শৃঙ্খলে শক্তির প্রবাহ কোন দিক নির্দেশ করে?",
    options: [
      { id: "opt_bio_13_21_a", text: "সর্বোচ্চ খাদক থেকে উৎপাদকের দিকে", isCorrect: false },
      { id: "opt_bio_13_21_b", text: "উৎপাদক থেকে ক্রমান্বয়ে উচ্চতর খাদকের দিকে", isCorrect: true },
      { id: "opt_bio_13_21_c", text: "বিয়োজক থেকে সরাসরি সূর্যে", isCorrect: false },
      { id: "opt_bio_13_21_d", text: "উভয় দিকে সমানভাবে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: উৎপাদক থেকে ক্রমান্বয়ে উচ্চতর খাদকের দিকে।",
      coreConcept: "খাদ্য শৃঙ্খলে পুষ্টি ও শক্তি সর্বদা নিম্ন ট্রফিক স্তর (উৎপাদক) থেকে উচ্চ ট্রফিক স্তরের (খাদক) দিকে একমুখীভাবে প্রবাহিত হয়।",
      distractorAnalysis: {
        opt_bio_13_21_a: "খাদক থেকে উৎপাদকে শক্তি প্রবাহিত হয় না।",
        opt_bio_13_21_c: "শক্তি কখনো সূর্যে ফিরে যায় না।",
        opt_bio_13_21_d: "শক্তির প্রবাহ একমুখী, দ্বিমুখী বা সমান নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 287
      },
      proTipShortcut: "উৎপাদক (T1) → খাদক (T2/T3/T4)।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_22",
    topicId: "top_ssc_biology_ch13_2",
    type: "MCQ",
    stem: "“মৃতদেহ → ছত্রাক → কেঁচো”—এই খাদ্য শৃঙ্খলটির ক্ষেত্রে নিচের কোনটি সঠিক?",
    options: [
      { id: "opt_bio_13_22_a", text: "এটি একটি শিকারজীবী শৃঙ্খল", isCorrect: false },
      { id: "opt_bio_13_22_b", text: "এটি একটি মৃতজীবী খাদ্য শৃঙ্খল", isCorrect: true },
      { id: "opt_bio_13_22_c", text: "এতে ছত্রাক হলো উৎপাদক", isCorrect: false },
      { id: "opt_bio_13_22_d", text: "এতে কোনো জৈব পদার্থের ক্ষয় হয় না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: এটি একটি মৃতজীবী খাদ্য শৃঙ্খল।",
      coreConcept: "মৃত জীবের দেহাবশেষ থেকে শুরু হয়ে পুষ্টি প্রবাহ বিয়োজক ও ক্ষুদ্র অপমার্জক প্রাণীতে অগ্রসর হওয়ায় এটি মৃতজীবী খাদ্য শৃঙ্খল।",
      distractorAnalysis: {
        opt_bio_13_22_a: "শিকারজীবী শৃঙ্খল সজীব উদ্ভিদ থেকে শুরু হয়।",
        opt_bio_13_22_c: "ছত্রাক ক্লোরোফিলবিহীন মৃতভোজী বিয়োজক, উৎপাদক নয়।",
        opt_bio_13_22_d: "এতে জৈব পদার্থ পচে সরল পুষ্টিতে রূপান্তরিত হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 288
      },
      proTipShortcut: "মৃতদেহ থেকে শুরু = মৃতজীবী শৃঙ্খল।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_23",
    topicId: "top_ssc_biology_ch13_2",
    type: "MCQ",
    stem: "একটি খাদ্য শৃঙ্খলে হরিণকে কোন ট্রফিক লেভেলে চিহ্নিত করা হয়?",
    options: [
      { id: "opt_bio_13_23_a", text: "T1 লেভেল", isCorrect: false },
      { id: "opt_bio_13_23_b", text: "T2 লেভেল", isCorrect: true },
      { id: "opt_bio_13_23_c", text: "T3 লেভেল", isCorrect: false },
      { id: "opt_bio_13_23_d", text: "T4 লেভেল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: T2 লেভেল।",
      coreConcept: "হরিণ একটি তৃণভোজী প্রাণী যা সবুজ ঘাস (T1) খেয়ে জীবনধারণ করে, তাই হরিণ ২য় পুষ্টি স্তর বা T2 লেভেলে অবস্থান করে।",
      distractorAnalysis: {
        opt_bio_13_23_a: "T1 হলো উৎপাদক সবুজ উদ্ভিদ।",
        opt_bio_13_23_c: "T3 হলো হরিণ শিকারকারী বাঘ বা চিতাবাঘ (মাংসাশী)।",
        opt_bio_13_23_d: "T4 হলো শীর্ষ খাদক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 287
      },
      proTipShortcut: "তৃণভোজী = T2 (২য় ট্রফিক লেভেল)।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_24",
    topicId: "top_ssc_biology_ch13_2",
    type: "MCQ",
    stem: "খাদ্য শৃঙ্খল ও খাদ্য জালের প্রধান পার্থক্যের ভিত্তি কী?",
    options: [
      { id: "opt_bio_13_24_a", text: "খাদ্য শৃঙ্খল রৈখিক ধারাবাহিকতা আর খাদ্য জাল একাধিক শৃঙ্খলের জালকাকার আন্তঃসংযোগ", isCorrect: true },
      { id: "opt_bio_13_24_b", text: "খাদ্য শৃঙ্খলে উৎপাদক থাকে কিন্তু খাদ্য জালে উৎপাদক থাকে না", isCorrect: false },
      { id: "opt_bio_13_24_c", text: "খাদ্য জাল কেবল গবেষণাগারে তৈরি করা যায়", isCorrect: false },
      { id: "opt_bio_13_24_d", text: "খাদ্য শৃঙ্খল বেশি স্থায়ী ও স্থিতিশীল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: খাদ্য শৃঙ্খল রৈখিক ধারাবাহিকতা আর খাদ্য জাল একাধিক শৃঙ্খলের জালকাকার আন্তঃসংযোগ।",
      coreConcept: "খাদ্য শৃঙ্খল একটি সরল একমাত্রিক রেখা নির্দেশ করে, অন্যদিকে বাস্তুতন্ত্রের বহু খাদ্য শৃঙ্খল পরস্পর জড়িয়ে ত্রিমাত্রিক খাদ্যজাল গঠন করে।",
      distractorAnalysis: {
        opt_bio_13_24_b: "উভয়টিতেই উৎপাদক অপরিহার্য ভিত্তি।",
        opt_bio_13_24_c: "খাদ্যজাল প্রকৃতির প্রতিটি স্বাভাবিক বাস্তুতন্ত্রে সক্রিয় থাকে।",
        opt_bio_13_24_d: "খাদ্য জাল খাদ্য শৃঙ্খলের চেয়ে অনেক বেশি স্থিতিশীল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 289
      },
      proTipShortcut: "শৃঙ্খল = সোজা লাইন; জাল = বহু লাইনের নেটওয়ার্ক।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------------------
  // Creative Questions (CQs: q_bio_13_25 to q_bio_13_30)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_13_25",
    topicId: "top_ssc_biology_ch13_1",
    type: "CQ_CREATIVE",
    stem: "একটি বিদ্যালয়ের জীববিজ্ঞান ল্যাবের পাশে একটি পুরাতন পুকুর রয়েছে। শিক্ষক শিক্ষার্থীদের নিয়ে পুকুরটির পরিবেশ পর্যবেক্ষণ করলেন। শিক্ষার্থীরা দেখতে পেল পুকুরের পানিতে ভাসমান ক্ষুদ্র সবুজ কণা ছাড়াও শাপলা ও হাইড্রিলা রয়েছে। পানির নিচে ঝাঁকে ঝাঁকে ড্যাফনিয়া ও মশার লার্ভা ঘুরে বেড়াচ্ছে, যাদের পুঁটি ও ছোট ব্যাঙ খাচ্ছে। পুকুরটিতে কয়েকটি বড় বোয়াল মাছও রয়েছে এবং তলদেশে রয়েছে কালো কাদার স্তর।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে একটি আদর্শ মিঠা পানির পুকুরের বাস্তুতন্ত্রের অজীব ও জীব উপাদানসমূহের আন্তঃসম্পর্ক প্রতিফলিত হয়েছে।",
      coreConcept: "পুকুরের বাস্তুতন্ত্র উৎপাদক, ১ম, ২য় ও ৩য় স্তরের খাদক এবং তলার বিয়োজক নিয়ে গঠিত একটি স্বয়ংসম্পূর্ণ প্রাকৃতিক বাস্তুতন্ত্র।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 285
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "বাস্তুতন্ত্রের সংজ্ঞা সঠিকভাবে লিখলে ১ নম্বর (এ. জি. ট্যান্সলে, ১৯৩৫)।" },
      kha: { mark: 2, criteria: "পুকুরের বাস্তুতন্ত্রে ফাইটোপ্ল্যাঙ্কটন ও জুপ্ল্যাঙ্কটনের পার্থক্য উদাহরণসহ ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "উদ্দীপকের আলোকে পুকুরের বিভিন্ন স্তরের জীব উপাদানগুলোকে ছক বা ফ্লোচার্ট আকারে বিন্যস্ত করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "পুকুরের তলদেশের কাদার বিয়োজক সম্প্রদায় ধ্বংস হলে পুকুরটির ওপর কী প্রভাব পড়বে তা পুষ্টিচক্রের আলোকে বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_26",
    topicId: "top_ssc_biology_ch13_1",
    type: "CQ_CREATIVE",
    stem: "সীমান্ত একটি কাচের অ্যাকুয়ারিয়ামে কিছু জলজ উদ্ভিদ, পাথর ও পরিষ্কার পানি দিয়ে দুটি ছোট গোল্ডফিশ ছেড়ে দিল। কিন্তু কোনো প্রকার খাবার ও আলোর ব্যবস্থা না করায় কিছুদিন পর গোল্ডফিশ দুটি নিস্তেজ হয়ে পড়ল এবং অ্যাকুয়ারিয়ামের পানি ঘোলাটে হয়ে গেল। তার বড় ভাই এসে সেখানে একটি এয়ার পাম্প, কৃত্রিম আলো এবং ফিল্টার স্থাপন করে পরিমিত খাবার দেওয়া শুরু করলেন।",
    options: null,
    explanation: {
      directAnswer: "অ্যাকুয়ারিয়াম হলো একটি নিয়ন্ত্রিত কৃত্রিম বাস্তুতন্ত্র যেখানে উৎপাদক, খাদক ও ভৌত উপাদান (আলো, অক্সিজেন) ভারসাম্য বজায় রাখতে হয়।",
      coreConcept: "একটি বাস্তুতন্ত্র সক্রিয় থাকতে হলে আলোকশক্তি, অক্সিজেন ও পুষ্টির নিরবচ্ছিন্ন প্রবাহ বজায় রাখা অপরিহার্য।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 283
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "হিউমাস কী তা সঠিকভাবে লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "বাস্তুতন্ত্রে বিয়োজকদের রূপান্তরক বলা হয় কেন তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "উদ্দীপকে সীমান্তের প্রাথমিক অ্যাকুয়ারিয়ামটি কেন একটি স্বয়ংসম্পূর্ণ বাস্তুতন্ত্র হয়ে উঠতে পারেনি তা ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "সীমান্তের ভাইয়ের গৃহীত পদক্ষেপ কীভাবে কৃত্রিম বাস্তুতন্ত্রটির ভারসাম্য ফিরিয়ে আনল তা যুক্তি সহকারে মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_27",
    topicId: "top_ssc_biology_ch13_1",
    type: "CQ_CREATIVE",
    stem: "কৃষক করিম সাহেব তার ধানক্ষেতে অতিরিক্ত রাসায়নিক সার ও উচ্চমাত্রার কীটনাশক প্রয়োগ করলেন। এর ফলে ধানক্ষেতের ক্ষতিকর পোকার সাথে সাথে উপকারী ব্যাঙ, কেঁচো ও মাটির উপকারী ব্যাকটেরিয়া মরে গেল। কিছুদিন পর দেখা গেল ধানগাছের বৃদ্ধি থমকে গেছে এবং মাটির স্বাভাবিক উর্বরতা হ্রাস পেয়েছে।",
    options: null,
    explanation: {
      directAnswer: "কীটনাশক প্রয়োগের ফলে ধানক্ষেতের বাস্তুতন্ত্রের খাদ্য শৃঙ্খল ও পুষ্টিচক্র বিনষ্ট হয়েছে।",
      coreConcept: "অজীব উপাদান ও জীব সম্প্রদায়ের স্বাভাবিক ভারসাম্য ক্ষুণ্ণ হলে বাস্তুতন্ত্রের উৎপাদনশীলতা হ্রাস পায়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.১",
        pageNumber: 284
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "বাস্তুতন্ত্রের অজীব উপাদান কয়টি ভাগে বিভক্ত তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "মানুষকে সর্বভুক প্রাণী বলা হয় কেন তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "করিম সাহেবের জমিতে ব্যাকটেরিয়া ধ্বংস হওয়ায় কীভাবে পুষ্টি উপাদান চক্র ব্যাহত হলো তা বুঝিয়ে লিখলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "ধানক্ষেতের বাস্তুতন্ত্রের ভারসাম্য বজায় রাখতে কীটনাশকের বিকল্প পরিবেশবান্ধব ব্যবস্থার প্রয়োজনীয়তা বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_28",
    topicId: "top_ssc_biology_ch13_2",
    type: "CQ_CREATIVE",
    stem: "নিচে একটি বনভূমির খাদ্য সম্পর্ক লক্ষ্য করো:\n(i) ঘাস → হরিণ → বাঘ\n(ii) ঘাস → ঘাসফড়িং → ব্যাঙ → সাপ → বাজপাখি\n(iii) মৃত জীবদেহ → ছত্রাক → কেঁচো\n(iv) মানুষ → উকুন/মশা → পরজীবী অণুজীব",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে শিকারজীবী, মৃতজীবী ও পরজীবী খাদ্য শৃঙ্খলের বাস্তব দৃষ্টান্ত উপস্থাপন করা হয়েছে।",
      coreConcept: "বাস্তুতন্ত্রে খাদ্যের ধরনের ওপর ভিত্তি করে বিভিন্ন ধারার খাদ্য শৃঙ্খল গড়ে ওঠে যা পরস্পর সম্পর্কযুক্ত।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 288
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ট্রফিক লেভেল বা পুষ্টি স্তর কাকে বলে তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "পরজীবী খাদ্য শৃঙ্খল শিকারজীবী খাদ্য শৃঙ্খল থেকে কেন ভিন্ন তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "উদ্দীপকের (ii) ও (iii) নং খাদ্য শৃঙ্খল দুটির বৈশিষ্ট্যগত তুলনা উপস্থাপন করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উদ্দীপকের খাদ্য শৃঙ্খলগুলো কীভাবে একটি পূর্ণাঙ্গ খাদ্য জালে রূপান্তরিত হতে পারে এবং বাস্তুতন্ত্রের স্থায়িত্ব রক্ষা করে তা বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_29",
    topicId: "top_ssc_biology_ch13_2",
    type: "CQ_CREATIVE",
    stem: "সুন্দরবনের একটি অঞ্চলে চোরাকারবারীদের কারণে বাঘের সংখ্যা উদ্বেগজনক হারে কমে গেল। স্থানীয় বন কর্মকর্তারা লক্ষ্য করলেন পরবর্তী কয়েক বছরে বনে চিত্রা হরিণের সংখ্যা অস্বাভাবিক বৃদ্ধি পেয়েছে। ফলে বনের নতুন গজানো কচি চারাগাছ হরিণ খেয়ে সাবাড় করে ফেলছে এবং নতুন বন সৃষ্টি বাধাগ্রস্ত হচ্ছে।",
    options: null,
    explanation: {
      directAnswer: "শীর্ষ শিকারী হ্রাস পাওয়ায় খাদ্য শৃঙ্খলে ভারসাম্যহীনতা ও ট্রফিক ক্যাসকেড সৃষ্টি হয়েছে।",
      coreConcept: "বাস্তুতন্ত্রে শীর্ষ খাদক শিকারের সংখ্যা নিয়ন্ত্রণ করে সবুজ বনভূমিকে অতিরিক্ত চারণ (Overgrazing) থেকে রক্ষা করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 289
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "খাদ্য শৃঙ্খল কাকে বলে তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "খাদ্য শৃঙ্খলে উৎপাদকের ভূমিকা অপরিসীম কেন তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "সুন্দরবনের উক্ত অঞ্চলের খাদ্য শৃঙ্খলটি ট্রফিক স্তরসহ অঙ্কন বা ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "বনভূমি ও জীববৈচিত্র্য সংরক্ষণে বাঘের উপস্থিতি কেন অপরিহার্য উদ্দীপকের আলোকে তা মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "HARD",
    boardSource: "দিনাজপুর বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_30",
    topicId: "top_ssc_biology_ch13_2",
    type: "CQ_CREATIVE",
    stem: "একটি দ্বীপের ঘাসভূমিতে কেবল ঘাস, খরগোশ ও শিয়াল নিয়ে একটি সরল খাদ্য শৃঙ্খল সক্রিয় ছিল। কোনো এক অজানা ভাইরাসের সংক্রমণে দ্বীপের সকল খরগোশ মারা গেল। ফলে খাদ্যের অভাবে শিয়ালগুলোও বিলুপ্ত হয়ে গেল। পক্ষান্তরে পাশের বড় দ্বীপে খরগোশের পাশাপাশি ইঁদুর, পাখি, ব্যাঙ ও সাপ সমন্বিত একটি জটিল খাদ্যজাল সক্রিয় থাকায় সেখানে খরগোশ মরলেও শিয়াল অন্য প্রাণী খেয়ে টিকে থাকল।",
    options: null,
    explanation: {
      directAnswer: "একক খাদ্য শৃঙ্খলের তুলনায় বহু প্রজাতির সমন্বয়ে গঠিত খাদ্য জাল বাস্তুতন্ত্রের স্থিতিশীলতা বহুগুণ বাড়িয়ে দেয়।",
      coreConcept: "খাদ্য জালে বিকল্প খাদ্য উৎস বিদ্যমান থাকায় একক কোনো প্রজাতির ক্ষতি পুরো বাস্তুতন্ত্রকে ধ্বংস করে না।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.২",
        pageNumber: 290
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "খাদ্য জাল কাকে বলে তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "খাদ্য শৃঙ্খলে খাদক জীবদের আকার শিকারের চেয়ে বড় হয় কেন ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রথম দ্বীপটির বাস্তুতন্ত্র কেন এত দ্রুত ধ্বংসপ্রাপ্ত হলো তা খাদ্য শৃঙ্খলের সীমাবদ্ধতার আলোকে ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "“বাস্তুতন্ত্রের দীর্ঘমেয়াদী টিকে থাকার চাবিকাঠি হলো খাদ্য জাল”—দ্বিতীয় দ্বীপের ঘটনার আলোকে উক্তিটি বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "HARD",
    boardSource: "কুমিল্লা বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
