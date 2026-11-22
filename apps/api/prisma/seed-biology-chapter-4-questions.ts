import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter4QuestionsBatch1: QuestionData[] = [
  // -------------------------------------------------------------------------
  // Topic 4.1: জীবনীশক্তি ও ATP-র ভূমিকা (q_bio_4_01 to 06)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_01",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "ATP-এর প্রান্তীয় ফসফেট বন্ধন আর্দ্রবিশ্লেষিত হলে প্রতি মোল থেকে কত কিলোক্যালরি শক্তি বিমুক্ত হয়?",
    options: [
      { id: "opt_bio_4_01_a", text: "৫.৩ kcal", isCorrect: false },
      { id: "opt_bio_4_01_b", text: "৭.৩ kcal", isCorrect: true },
      { id: "opt_bio_4_01_c", text: "৯.৩ kcal", isCorrect: false },
      { id: "opt_bio_4_01_d", text: "১২.৫ kcal", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ৭.৩ kcal।",
      coreConcept: "ATP-এর প্রান্তীয় ফসফেটের উচ্চশক্তি সম্পন্ন বন্ধন ভেঙে ADP ও অজৈব ফসফেট তৈরি হলে ৭.৩ কিলোক্যালরি (৩০.৫৫ কিলোজুল) শক্তি বিমুক্ত হয়।",
      distractorAnalysis: {
        opt_bio_4_01_a: "৫.৩ kcal কোনো স্বীকৃত মান নয়।",
        opt_bio_4_01_c: "৯.৩ kcal ফ্যাট জারণের প্রতি গ্রামের শক্তির কাছাকাছি মান, ATP-র নয়।",
        opt_bio_4_01_d: "১২.৫ kcal মাত্রাতিরিক্ত উচ্চ মান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 66
      },
      proTipShortcut: "মনে রাখো: ATP-র শক্তি লাকি সেভেন পয়েন্ট থ্রি (7.3 kcal = 30.55 kJ)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_02",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "এডিনিন নামক নাইট্রোজেনঘটিত ক্ষারকের সাথে ৫-কার্বনবিশিষ্ট রাইবোজ সুগার যুক্ত হয়ে কোন যৌগটি গঠন করে?",
    options: [
      { id: "opt_bio_4_02_a", text: "এডিনোসিন", isCorrect: true },
      { id: "opt_bio_4_02_b", text: "এডিনাইলিক এসিড", isCorrect: false },
      { id: "opt_bio_4_02_c", text: "গুয়ানিন", isCorrect: false },
      { id: "opt_bio_4_02_d", text: "এটিপি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: এডিনোসিন।",
      coreConcept: "নাইট্রোজেনাস ক্ষারক এডিনিন এবং ৫-কার্বনবিশিষ্ট রাইবোজ সুগার যুক্ত হয়ে তৈরি হয় নিউক্লিওসাইড এডিনোসিন। এর সাথে ফসফেট যুক্ত হলে নিউক্লিওটাইড তৈরি হয়।",
      distractorAnalysis: {
        opt_bio_4_02_b: "এডিনোসিনের সাথে ফসফেট যুক্ত হলে এডিনাইলিক এসিড (AMP) গঠিত হয়।",
        opt_bio_4_02_c: "গুয়ানিন হলো একটি ভিন্ন নাইট্রোজেনঘটিত ক্ষারক।",
        opt_bio_4_02_d: "এডিনোসিনের সাথে ৩টি ফসফেট গ্রুপ যুক্ত হলে ATP গঠিত হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 65
      }
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_03",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "ADP-এর সাথে অজৈব ফসফেট ($P_i$) যুক্ত হয়ে ATP তৈরির জৈব রাসায়নিক প্রক্রিয়াকে কী বলে?",
    options: [
      { id: "opt_bio_4_03_a", text: "ডিফসফোরাইলেশন", isCorrect: false },
      { id: "opt_bio_4_03_b", text: "ফসফোরাইলেশন", isCorrect: true },
      { id: "opt_bio_4_03_c", text: "কার্বক্সিলেশন", isCorrect: false },
      { id: "opt_bio_4_03_d", text: "ডিকার্বক্সিলেশন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ফসফোরাইলেশন।",
      coreConcept: "বহিঃস্থ শক্তি প্রয়োগ করে কোনো যৌগের সাথে ফসফেট যুক্ত করার প্রক্রিয়াকে ফসফোরাইলেশন বলে। বিপরীত প্রক্রিয়াটি ডিফসফোরাইলেশন।",
      distractorAnalysis: {
        opt_bio_4_03_a: "ডিফসফোরাইলেশন হলো ফসফেট অপসারিত হওয়া।",
        opt_bio_4_03_c: "কার্বক্সিলেশন হলো CO₂ যুক্ত হওয়া।",
        opt_bio_4_03_d: "ডিকার্বক্সিলেশন হলো CO₂ নির্গত হওয়া।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 65
      }
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_04",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "ATP-কে কেন কোষের জৈব মুদ্রা বা শক্তি মুদ্রা (Biological Coin / Energy Currency) বলা হয়?",
    options: [
      { id: "opt_bio_4_04_a", text: "এটি কোষে স্থায়ীভাবে অপরিবর্তিত থাকে", isCorrect: false },
      { id: "opt_bio_4_04_b", text: "এটি সব ধরনের খাদ্য উপাদান তৈরিতে সরাসরি দ্রাবক হিসেবে কাজ করে", isCorrect: false },
      { id: "opt_bio_4_04_c", text: "এটি শক্তি সঞ্চয় করে রাখে এবং যেকোনো জৈবনিক কাজে সরাসরি শক্তি লেনদেনের মাধ্যম হিসেবে কাজ করে", isCorrect: true },
      { id: "opt_bio_4_04_d", text: "এটি কেবল কোষঝিল্লির গঠন তৈরিতে অংশ নেয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: এটি শক্তি সঞ্চয় করে রাখে এবং যেকোনো জৈবনিক কাজে সরাসরি শক্তি লেনদেনের মাধ্যম হিসেবে কাজ করে।",
      coreConcept: "টাকা যেমন পকেটে রেখে যেকোনো প্রয়োজনে খরচ করা যায়, তেমনই কোষ খাদ্য জারণের শক্তি ATP-তে জমা রাখে এবং যে কোনো বিক্রিয়ায় তাৎক্ষণিক খরচ করে।",
      distractorAnalysis: {
        opt_bio_4_04_a: "ATP অপরিবর্তিত থাকে না, অনবরত ভেঙে ADP ও তৈরি হয়ে ATP-তে পরিণত হয় (ATP cycle)।",
        opt_bio_4_04_b: "পানি হলো সার্বজনীন দ্রাবক, ATP নয়।",
        opt_bio_4_04_d: "কোষঝিল্লি মূলত ফসফোলিপিড ও প্রোটিন দিয়ে গঠিত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 66
      }
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_05",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "জীবদেহের শক্তি উৎপাদন, রূপান্তর এবং ব্যবহারের সার্বিক জৈবনিক প্রক্রিয়াকে জীববিজ্ঞানের কোন শাখায় আলোচনা করা হয়?",
    options: [
      { id: "opt_bio_4_05_a", text: "বায়োইনফরমেটিক্স", isCorrect: false },
      { id: "opt_bio_4_05_b", text: "বায়োএনার্জেটিক্স (জীবনীশক্তি)", isCorrect: true },
      { id: "opt_bio_4_05_c", text: "বায়োমেট্রিক্স", isCorrect: false },
      { id: "opt_bio_4_05_d", text: "বায়োটেকনোলজি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বায়োএনার্জেটিক্স (জীবনীশক্তি)।",
      coreConcept: "Bioenergetics হলো জীবপদার্থবিজ্ঞান ও শারীরতত্ত্বের সমন্বয়ে গঠিত শাখা যা জীবকোষের শক্তি রূপান্তর নিয়ে কাজ করে।",
      distractorAnalysis: {
        opt_bio_4_05_a: "বায়োইনফরমেটিক্স হলো জৈব তথ্য প্রক্রিয়াকরণ।",
        opt_bio_4_05_c: "বায়োমেট্রিক্স হলো জীবের শারীরিক বৈশিষ্ট্য পরিমাপ।",
        opt_bio_4_05_d: "বায়োটেকনোলজি হলো প্রযুক্তিগত জীবপ্রয়োগ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 64
      }
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০১৯",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_06",
    topicId: "top_ssc_biology_ch4_1",
    type: "CQ_CREATIVE",
    stem: "সাদিয়া লক্ষ্য করল তার ছোট ভাই ফুটবল খেলে এসে ক্লান্ত হয়ে হাঁপাচ্ছে। শিক্ষক বললেন, “আমাদের দেহের পেশি কোষ সচল রাখতে প্রতি মুহূর্তে এক বিশেষ রিচার্জেবল জৈব মুদ্রার ভাঙন ও গঠন ঘটে। ১ মোল এই অণু ভেঙে প্রায় ৭.৩ কিলোক্যালরি শক্তি মেলে যা খেলোয়াড়কে গতিশক্তি জোগায়।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকের অণুটি হলো ATP (Adenosine Triphosphate)।",
      coreConcept: "ATP-এর প্রান্তীয় ফসফেট বন্ধন ভেঙে শক্তি উৎপন্ন হওয়া এবং খাদ্য জারণের শক্তিতে পুনরায় ADP রিচার্জ হয়ে ATP-তে পরিণত হওয়ার অবিরাম চক্র।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 65
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জীবনীশক্তি (Bioenergetics) কী তা সঠিকভাবে লেখা।" },
      kha: { mark: 2, criteria: "ফসফোরাইলেশন ও ডিফসফোরাইলেশনের মধ্যকার মৌলিক পার্থক্য সমীকরণসহ ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে নির্দেশিত অণুটিকে কেন জীবদেহের 'শক্তি মুদ্রা' বা 'জৈব মুদ্রা' বলা হয় তা ৩টি যুক্তিসহ উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "উক্ত অণুর চক্রাকার পুনরুৎপাদন (ATP Cycle) বাধাগ্রস্ত হলে মানবদেহের স্বাভাবিক জৈবনিক কাজে কী বিপর্যয় ঘটবে তা মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // Topic 4.2: সালোকসংশ্লেষণ — আলোক ও আলোক নিরপেক্ষ পর্যায় (q_bio_4_07 to 12)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_07",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "সালোকসংশ্লেষণের সামগ্রিক রাসায়নিক সমীকরণে ১ অণু গ্লুকোজ তৈরির জন্য কত অণু পানি ($H_2O$) প্রয়োজন হয়?",
    options: [
      { id: "opt_bio_4_07_a", text: "৬ অণু", isCorrect: false },
      { id: "opt_bio_4_07_b", text: "১২ অণু", isCorrect: true },
      { id: "opt_bio_4_07_c", text: "১৮ অণু", isCorrect: false },
      { id: "opt_bio_4_07_d", text: "২৪ অণু", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ১২ অণু।",
      coreConcept: "সালোকসংশ্লেষণের পূর্ণ সমীকরণ: 6CO₂ + 12H₂O + আলো → C₆H₁₂O₆ + 6H₂O + 6O₂। অর্থাৎ ১২ অণু পানি বিক্রিয়ক হিসেবে প্রবেশ করে এবং ৬ অণু পানি উপজাত হিসেবে উৎপন্ন হয়।",
      distractorAnalysis: {
        opt_bio_4_07_a: "৬ অণু হলো উৎপাদ হিসেবে তৈরি পানির সংখ্যা বা CO₂-এর অণু সংখ্যা।",
        opt_bio_4_07_c: "১৮ অণু কোনো সঠিক বিক্রিয়ক সংখ্যা নয়।",
        opt_bio_4_07_d: "২৪ অণু ভুল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 67
      }
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_08",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "কোন বিজ্ঞানী ১৯০৫ সালে সালোকসংশ্লেষণ প্রক্রিয়াকে আলোক নির্ভর ও আলোক নিরপেক্ষ—এই দুটি পর্যায়ে বিভক্ত করেন?",
    options: [
      { id: "opt_bio_4_08_a", text: "মেলভিন ক্যালভিন", isCorrect: false },
      { id: "opt_bio_4_08_b", text: "এফ. এফ. ব্ল্যাকম্যান", isCorrect: true },
      { id: "opt_bio_4_08_c", text: "হ্যান্স ক্রেবস", isCorrect: false },
      { id: "opt_bio_4_08_d", text: "এম. ডি. হ্যাচ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: এফ. এফ. ব্ল্যাকম্যান।",
      coreConcept: "ব্রিটিশ উদ্ভিদ শারীরতত্ত্ববিদ ব্ল্যাকম্যান (Blackman) ১৯০৫ সালে সালোকসংশ্লেষণের আলোক ও অন্ধকার পর্যায় চিহ্নিত করেন।",
      distractorAnalysis: {
        opt_bio_4_08_a: "ক্যালভিন C₃ চক্র আবিষ্কার করেন।",
        opt_bio_4_08_c: "হ্যান্স ক্রেবস শ্বসনের ক্রেবস চক্র আবিষ্কার করেন।",
        opt_bio_4_08_d: "হ্যাচ ও স্ল্যাক C₄ গতিপথ আবিষ্কার করেন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 68
      }
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_09",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "সালোকসংশ্লেষণের আলোক নির্ভর পর্যায়ে পানির ফটোলাইসিসের ফলে কোনটি উৎপন্ন হয়?",
    options: [
      { id: "opt_bio_4_09_a", text: "কেবল গ্লুকোজ ও কার্বন ডাই-অক্সাইড", isCorrect: false },
      { id: "opt_bio_4_09_b", text: "হাইড্রোজেন আয়ন ($H^+$), ইলেকট্রন ($e^-$) ও অক্সিজেন ($O_2$)", isCorrect: true },
      { id: "opt_bio_4_09_c", text: "ল্যাকটিক এসিড ও পানি", isCorrect: false },
      { id: "opt_bio_4_09_d", text: "পাইরুভিক এসিড ও ATP", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: হাইড্রোজেন আয়ন (H⁺), ইলেকট্রন (e⁻) ও অক্সিজেন (O₂)।",
      coreConcept: "সূর্যালোক ও ক্লোরোফিলের সহায়তায় পানি বিশ্লিষ্ট হওয়ার প্রক্রিয়াকে ফটোলাইসিস বলে: 2H₂O → 4H⁺ + 4e⁻ + O₂।",
      distractorAnalysis: {
        opt_bio_4_09_a: "গ্লুকোজ অন্ধকার পর্যায়ে উৎপন্ন হয়।",
        opt_bio_4_09_c: "ল্যাকটিক এসিড অবাত শ্বসনে তৈরি হয়।",
        opt_bio_4_09_d: "পাইরুভিক এসিড গ্লাইকোলাইসিসে তৈরি হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 69
      }
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_10",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "ক্লোরোপ্লাস্টের কোন নির্দিষ্ট অংশে সালোকসংশ্লেষণের 'আলোক নির্ভর পর্যায়' সংঘটিত হয়?",
    options: [
      { id: "opt_bio_4_10_a", text: "স্ট্রোমায় (Stroma)", isCorrect: false },
      { id: "opt_bio_4_10_b", text: "থাইলাকয়েড পর্দায় (Thylakoid membrane)", isCorrect: true },
      { id: "opt_bio_4_10_c", text: "বহিঃঝিল্লিতে", isCorrect: false },
      { id: "opt_bio_4_10_d", text: "মাইটোকন্ড্রিয়া ম্যাট্রিক্সে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: থাইলাকয়েড পর্দায় (Thylakoid membrane)।",
      coreConcept: "থাইলাকয়েড পর্দায় ক্লোরোফিল অণু ও ফটোসিস্টেমগুলো সন্নিবেশিত থাকে যা সৌর ফোটন শোষণ করে আলোক বিক্রিয়া সম্পন্ন করে।",
      distractorAnalysis: {
        opt_bio_4_10_a: "স্ট্রোমায় অন্ধকার পর্যায় বা ক্যালভিন চক্র ঘটে।",
        opt_bio_4_10_c: "বহিঃঝিল্লি কেবল সীমানা রক্ষা করে।",
        opt_bio_4_10_d: "মাইটোকন্ড্রিয়ায় শ্বসন ঘটে, সালোকসংশ্লেষণ নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 68
      }
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_11",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "সালোকসংশ্লেষণের আলোক পর্যায়ে উৎপন্ন কোন যৌগ দুটিকে একত্রে 'আত্মীকরণ শক্তি' (Assimilatory Power) বলা হয়?",
    options: [
      { id: "opt_bio_4_11_a", text: "ATP এবং ADP", isCorrect: false },
      { id: "opt_bio_4_11_b", text: "ATP এবং $NADPH + H^+$", isCorrect: true },
      { id: "opt_bio_4_11_c", text: "$NADP^+$ এবং গ্লুকোজ", isCorrect: false },
      { id: "opt_bio_4_11_d", text: "পানি এবং অক্সিজেন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ATP এবং NADPH + H⁺।",
      coreConcept: "আলোক বিক্রিয়ায় সৃষ্ট ATP রাসায়নিক শক্তি যোগায় এবং NADPH+H⁺ বিজারক হিসেবে অন্ধকার পর্যায়ে CO₂ বিজারণ ঘটিয়ে শর্করা তৈরি করে বিধায় এদের আত্মীকরণ শক্তি বলে।",
      distractorAnalysis: {
        opt_bio_4_11_a: "ADP হলো নিম্নশক্তির যৌগ।",
        opt_bio_4_11_c: "NADP⁺ হলো জারিত রূপ।",
        opt_bio_4_11_d: "পানি বিক্রিয়ক এবং অক্সিজেন উপজাত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 69
      }
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_12",
    topicId: "top_ssc_biology_ch4_2",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান ল্যাবে শিক্ষক একটি বিকারে সবুজ শৈবাল রেখে তার ওপর আলো ফেললেন। শিক্ষার্থীরা দেখল দ্রবণ থেকে অবিরাম গ্যাসের বুদবুদ উঠছে। শিক্ষক বললেন, “এই বিক্রিয়ার প্রথম পর্যায়টি ক্লোরোপ্লাস্টের ঝিল্লিতে সূর্যালোকের সাহায্যে সম্পন্ন হয়, যেখানে পানি ভেঙে একটি অপরিহার্য গ্যাস বায়ুমণ্ডলে মুক্ত হয় এবং উচ্চশক্তির দুটি যৌগ উৎপন্ন হয়।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে সালোকসংশ্লেষণের আলোক নির্ভর পর্যায় ও পানির ফটোলাইসিস ইঙ্গিত করা হয়েছে।",
      coreConcept: "থাইলাকয়েডে পানির ফটোলাইসিস এবং ফটোফসফোরাইলেশন ও NADP⁺ বিজারণের মাধ্যমে আত্মীকরণ শক্তি তৈরি।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 68
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ফটোফসফোরাইলেশন (Photophosphorylation) কী তা নির্ভুল লেখা।" },
      kha: { mark: 2, criteria: "সালোকসংশ্লেষণে নির্গত অক্সিজেনের মূল উৎস যে পানি তা বৈজ্ঞানিক পরীক্ষার উদ্ধৃতি দিয়ে বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের বুদবুদ নির্গমনকারী প্রথম পর্যায়ের রাসায়নিক ধাপসমূহ প্রবাহচিত্রের সাহায্যে উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "উক্ত পর্যায়ে উৎপন্ন 'আত্মীকরণ শক্তি' অনুপস্থিত থাকলে উদ্ভিদে শর্করা সংশ্লেষণ অসম্ভব হতো—বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড সৃজনশীল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // Topic 4.3: C3 ও C4 গতিপথ এবং প্রভাবকসমূহ (q_bio_4_13 to 18)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_13",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "ক্যালভিন চক্র বা $C_3$ গতিপথে কার্বন ডাই-অক্সাইড ($CO_2$) গ্রহণকারী প্রথম উপাদান কোনটি?",
    options: [
      { id: "opt_bio_4_13_a", text: "ফসফোএনল পাইরুভিক এসিড (PEP)", isCorrect: false },
      { id: "opt_bio_4_13_b", text: "রাইবুলোজ ১,৫-বিসফসফেট (RuBP)", isCorrect: true },
      { id: "opt_bio_4_13_c", text: "অক্সালোঅ্যাসিটিক এসিড (OAA)", isCorrect: false },
      { id: "opt_bio_4_13_d", text: "৩-ফসফোগ্লিসারিক এসিড (3-PGA)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: রাইবুলোজ ১,৫-বিসফসফেট (RuBP)।",
      coreConcept: "৫-কার্বনবিশিষ্ট RuBP পরিবেশের CO₂ গ্যাস গ্রহণ করে রুবিস্কো এনজাইমের সহায়তায় অস্থায়ী কিটো এসিড তৈরি করে যা দ্রুত ভেঙে ৩-PGA তে পরিণত হয়।",
      distractorAnalysis: {
        opt_bio_4_13_a: "PEP হলো C₄ চক্রের প্রথম CO₂ গ্রাহক।",
        opt_bio_4_13_c: "OAA হলো C₄ চক্রের প্রথম স্থায়ী উৎপাদ।",
        opt_bio_4_13_d: "৩-PGA হলো C₃ চক্রের প্রথম স্থায়ী উৎপাদ, গ্রাহক নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 70
      }
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_14",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "হ্যাচ ও স্ল্যাক চক্র বা $C_4$ গতিপথের প্রথম স্থায়ী পদার্থ কোনটি?",
    options: [
      { id: "opt_bio_4_14_a", text: "৩-ফসফোগ্লিসারিক এসিড (3-PGA)", isCorrect: false },
      { id: "opt_bio_4_14_b", text: "অক্সালোঅ্যাসিটিক এসিড (OAA)", isCorrect: true },
      { id: "opt_bio_4_14_c", text: "সাইট্রিক এসিড", isCorrect: false },
      { id: "opt_bio_4_14_d", text: "ম্যালিক এসিড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অক্সালোঅ্যাসিটিক এসিড (OAA)।",
      coreConcept: "C₄ উদ্ভিদে প্রথম স্থায়ী যৌগ ৪-কার্বনবিশিষ্ট অক্সালোঅ্যাসিটিক এসিড (Oxaloacetic acid)।",
      distractorAnalysis: {
        opt_bio_4_14_a: "৩-PGA হলো ৩-কার্বনবিশিষ্ট C₃ চক্রের প্রথম স্থায়ী উৎপাদ।",
        opt_bio_4_14_c: "সাইট্রিক এসিড ক্রেবস চক্রের উৎপাদ।",
        opt_bio_4_14_d: "ম্যালিক এসিড OAA বিজারিত হয়ে পরবর্তী ধাপে উৎপন্ন হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 71
      }
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_15",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "নিচের কোন উদ্ভিদে হ্যাচ ও স্ল্যাক চক্র ($C_4$ গতিপথ) সংঘটিত হয়?",
    options: [
      { id: "opt_bio_4_15_a", text: "ধান ও গম", isCorrect: false },
      { id: "opt_bio_4_15_b", text: "ভুট্টা ও আখ", isCorrect: true },
      { id: "opt_bio_4_15_c", text: "আম ও জাম", isCorrect: false },
      { id: "opt_bio_4_15_d", text: "পাট ও সরিষা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ভুট্টা ও আখ।",
      coreConcept: "ভুট্টা, আখ, বিভিন্ন প্রজাতির ঘাস এবং আমারান্থাস হলো আদর্শ C₄ উদ্ভিদ যেখানে উচ্চ তাপমাত্রা ও আলোতেও সালোকসংশ্লেষণের হার বেশি থাকে।",
      distractorAnalysis: {
        opt_bio_4_15_a: "ধান ও গম C₃ উদ্ভিদ।",
        opt_bio_4_15_c: "আম ও জাম C₃ উদ্ভিদ।",
        opt_bio_4_15_d: "পাট ও সরিষা C₃ উদ্ভিদ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 71
      }
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_16",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "সালোকসংশ্লেষণ প্রক্রিয়ার জন্য উপযুক্ত বা পরিমিত অনুকূল তাপমাত্রা কত?",
    options: [
      { id: "opt_bio_4_16_a", text: "১০° সে. থেকে ১৫° সে.", isCorrect: false },
      { id: "opt_bio_4_16_b", text: "২২° সে. থেকে ৩৫° সে.", isCorrect: true },
      { id: "opt_bio_4_16_c", text: "৪০° সে. থেকে ৫০° সে.", isCorrect: false },
      { id: "opt_bio_4_16_d", text: "৫০° সে. থেকে ৬০° সে.", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ২২° সে. থেকে ৩৫° সে.।",
      coreConcept: "এনজাইমের সর্বোত্তম সক্রিয়তার জন্য সালোকসংশ্লেষণের অপটিমাম তাপমাত্রা হলো ২২°–৩৫° সেলসিয়াস।",
      distractorAnalysis: {
        opt_bio_4_16_a: "১০°-১৫° সে. তাপমাত্রায় এনজাইমের গতি কমে বিক্রিয়া শ্লথ হয়।",
        opt_bio_4_16_c: "৪০° সে.-এর উপরে এনজাইম নষ্ট (denature) হতে শুরু করে।",
        opt_bio_4_16_d: "৫০°-৬০° সে. তাপমাত্রায় প্রোটোপ্লাজম জমাট বেঁধে জীব মারা যায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 72
      }
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_17",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "ক্লোরোফিল অণুর গঠন উপাদান হিসেবে নিচের কোন খনিজ উপাদানটি অপরিহার্য?",
    options: [
      { id: "opt_bio_4_17_a", text: "ক্যালসিয়াম", isCorrect: false },
      { id: "opt_bio_4_17_b", text: "ম্যাগনেসিয়াম", isCorrect: true },
      { id: "opt_bio_4_17_c", text: "সোডিয়াম", isCorrect: false },
      { id: "opt_bio_4_17_d", text: "ক্লোরিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ম্যাগনেসিয়াম।",
      coreConcept: "ক্লোরোফিল অণুর পরফিরিন বলয়ের কেন্দ্রে ম্যাগনেসিয়াম ($Mg^{2+}$) থাকে এবং নাইট্রোজেন এর চারপাশে যুক্ত থাকে।",
      distractorAnalysis: {
        opt_bio_4_17_a: "ক্যালসিয়াম মধ্যপর্দা তৈরিতে ব্যবহৃত হয়।",
        opt_bio_4_17_c: "সোডিয়াম উদ্ভিদের জন্য অপরিহার্য মুখ্য উপাদান নয়।",
        opt_bio_4_17_d: "ক্লোরিন পানির ফটোলাইসিসে প্রভাব ফেলে কিন্তু ক্লোরোফিলের কেন্দ্রে থাকে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 72
      }
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_18",
    topicId: "top_ssc_biology_ch4_3",
    type: "CQ_CREATIVE",
    stem: "কৃষি গবেষণা ইনস্টিটিউটের একজন বিজ্ঞানী লক্ষ্য করলেন, গ্রীষ্মের প্রখর রোদে ও উচ্চ তাপমাত্রায় ধান গাছের ফলন কমে গেলেও ভুট্টার জমিতে সালোকসংশ্লেষণের হার দারুণ বৃদ্ধি পায় এবং ভুট্টার পাতা বেশি পরিমাণে শর্করা জমা করে। ধান গাছে প্রথম উৎপন্ন স্থায়ী পদার্থ ৩ কার্বনের হলেও ভুট্টায় তা ৪ কার্বনবিশিষ্ট।",
    options: null,
    explanation: {
      directAnswer: "ধান হলো C₃ উদ্ভিদ এবং ভুট্টা হলো C₄ উদ্ভিদ।",
      coreConcept: "C₄ উদ্ভিদে ফটোরেস্পিরেশন না থাকায় এবং PEP কার্বক্সিলেজ উচ্চ দক্ষতাসম্পন্ন হওয়ায় প্রখর রোদ ও গরমেও C₄ উদ্ভিদ বেশি কার্যকর।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 71
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "C₃ উদ্ভিদ কাকে বলে তা নির্ভুল লেখা।" },
      kha: { mark: 2, criteria: "সালোকসংশ্লেষণে লাল ও নীল আলোতে হার বেশি কিন্তু সবুজ আলোতে কম কেন ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে উল্লিখিত ধান ও ভুট্টার মধ্যে কার্বন বিজারণ গতিপথের ৩টি মূল পার্থক্য ছকে লিখ।" },
      gha: { mark: 4, criteria: "জলবায়ু পরিবর্তনের বৈশ্বিক উষ্ণায়নে C₃ উদ্ভিদের তুলনায় C₄ উদ্ভিদের খাদ্য নিরাপত্তা নিশ্চিত করার সক্ষমতা বিশ্লেষণ করো।" }
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // Topic 4.4: শ্বসন — প্রকারভেদ ও অবাত শ্বসন (q_bio_4_19 to 24)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_19",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "শ্বসন প্রক্রিয়াকে জীবদেহের একটি অপচিতিমূলক (Catabolic) প্রক্রিয়া বলা হয় কেন?",
    options: [
      { id: "opt_bio_4_19_a", text: "এতে সরল উপাদান যুক্ত হয়ে জটিল খাদ্য তৈরি হয়", isCorrect: false },
      { id: "opt_bio_4_19_b", text: "এতে জটিল খাদ্য জারিত ও বিশ্লিষ্ট হয়ে সরল অণুতে পরিণত হয় এবং শুষ্ক ওজন হ্রাস পায়", isCorrect: true },
      { id: "opt_bio_4_19_c", text: "এতে কেবল সূর্যালোক শোষিত হয়", isCorrect: false },
      { id: "opt_bio_4_19_d", text: "এতে কোনো শক্তি উৎপন্ন হয় না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: এতে জটিল খাদ্য জারিত ও বিশ্লিষ্ট হয়ে সরল অণুতে পরিণত হয় এবং শুষ্ক ওজন হ্রাস পায়।",
      coreConcept: "যে জৈবনিক বিক্রিয়ায় দেহের সঞ্চিত জটিল পদার্থ ভেঙে ওজন কমে যায় তাকে অপচিতিমূলক (destructive/catabolic) প্রক্রিয়া বলে।",
      distractorAnalysis: {
        opt_bio_4_19_a: "এটি উপচিতিমূলক বা অ্যানাবলিক প্রক্রিয়ার সংজ্ঞা (যেমন: সালোকসংশ্লেষণ)।",
        opt_bio_4_19_c: "শ্বসনে আলো শোষিত হয় না।",
        opt_bio_4_19_d: "শ্বসনে বিপুল ATP শক্তি উৎপন্ন হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 76
      }
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_20",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "অবাত শ্বসনে ১ অণু গ্লুকোজের অসম্পূর্ণ জারণের ফলে নিট কত অণু ATP তৈরি হয়?",
    options: [
      { id: "opt_bio_4_20_a", text: "২টি", isCorrect: true },
      { id: "opt_bio_4_20_b", text: "৪টি", isCorrect: false },
      { id: "opt_bio_4_20_c", text: "৩৬টি", isCorrect: false },
      { id: "opt_bio_4_20_d", text: "৩৮টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ২টি।",
      coreConcept: "অবাত শ্বসনে মাইটোকন্ড্রিয়া ও অক্সিজেনের অনুপস্থিতিতে ইলেকট্রন পরিবহন তন্ত্র চলে না, ফলে গ্লাইকোলাইসিসে সৃষ্ট নিট ২ অণু ATP-ই একমাত্র শক্তি উৎপাদ।",
      distractorAnalysis: {
        opt_bio_4_20_b: "৪টি হলো মোট উৎপন্ন ATP (যার ২টি গ্লাইকোলাইসিসে প্রারম্ভে খরচ হয়)।",
        opt_bio_4_20_c: "৩৬টি আধুনিক সবাত শ্বসনের মান হিসেবে ধরা হয়।",
        opt_bio_4_20_d: "৩৮টি হলো সবাত শ্বসনের পূর্ণ উৎপাদ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 80
      }
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_21",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "ইস্ট কোষে অবাত শ্বসনের ফলে পাইরুভিক এসিড বিজারিত হয়ে কোনটি উৎপন্ন হয়?",
    options: [
      { id: "opt_bio_4_21_a", text: "ল্যাকটিক এসিড ও পানি", isCorrect: false },
      { id: "opt_bio_4_21_b", text: "ইথাইল অ্যালকোহল ও কার্বন ডাই-অক্সাইড", isCorrect: true },
      { id: "opt_bio_4_21_c", text: "মিথাইল অ্যালকোহল ও অক্সিজেন", isCorrect: false },
      { id: "opt_bio_4_21_d", text: "অক্সালোঅ্যাসিটিক এসিড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ইথাইল অ্যালকোহল ও কার্বন ডাই-অক্সাইড।",
      coreConcept: "ইস্টের অ্যালকোহলিক গাঁজনে সমীকরণ: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + শক্তি (২ ATP)।",
      distractorAnalysis: {
        opt_bio_4_21_a: "ল্যাকটিক এসিড ব্যাকটেরিয়া ও মানুষের পেশিতে তৈরি হয়।",
        opt_bio_4_21_c: "মিথাইল অ্যালকোহল বিষাক্ত, তা শ্বসনে উৎপন্ন হয় না।",
        opt_bio_4_21_d: "অক্সালোঅ্যাসিটিক এসিড C₄ চক্রের যৌগ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 80
      }
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_22",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "তীব্র শারীরিক ব্যায়াম বা দ্রুত দৌড়ের সময় মানবদেহের পেশিকোষে কোন এসিড জমা হয়ে পেশি ক্লান্ত হয়?",
    options: [
      { id: "opt_bio_4_22_a", text: "ম্যালিক এসিড", isCorrect: false },
      { id: "opt_bio_4_22_b", text: "সাইট্রিক এসিড", isCorrect: false },
      { id: "opt_bio_4_22_c", text: "ল্যাকটিক এসিড", isCorrect: true },
      { id: "opt_bio_4_22_d", text: "অক্সালিক এসিড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ল্যাকটিক এসিড।",
      coreConcept: "অক্সিজেনের সাময়িক ঘাটতিতে পেশিকোষে অবাত শ্বসন ঘটে এবং ল্যাকটিক এসিড ($C_3H_6O_3$) সঞ্চিত হয়ে পেশি অবসাদ ও ব্যথা তৈরি করে।",
      distractorAnalysis: {
        opt_bio_4_22_a: "ম্যালিক এসিড উদ্ভিদে পাওয়া যায়।",
        opt_bio_4_22_b: "সাইট্রিক এসিড লেবুজাতীয় ফলে ও ক্রেবস চক্রে থাকে।",
        opt_bio_4_22_d: "অক্সালিক এসিড কচু বা পালং শাকে থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 80
      }
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_23",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "বেকারি শিল্পে পাউরুটি নরম, ফাঁপা ও ছিদ্রযুক্ত করতে নিচের কোন অণুজীবটির সন্ধান বা অবাত শ্বসন প্রক্রিয়া কাজে লাগানো হয়?",
    options: [
      { id: "opt_bio_4_23_a", text: "পেনিসিলিয়াম ছত্রাক", isCorrect: false },
      { id: "opt_bio_4_23_b", text: "ইস্ট (Yeast)", isCorrect: true },
      { id: "opt_bio_4_23_c", text: "অ্যাগারিকাস", isCorrect: false },
      { id: "opt_bio_4_23_d", text: "স্পাইরোগাইরা শৈবাল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ইস্ট (Yeast)।",
      coreConcept: "ইস্ট ময়দার চিনির অবাত সন্ধান ঘটিয়ে CO₂ গ্যাস তৈরি করে। উত্তাপে এই গ্যাস বের হওয়ার সময় পাউরুটিকে ফুলিয়ে নরম ও ফাঁপা করে তোলে।",
      distractorAnalysis: {
        opt_bio_4_23_a: "পেনিসিলিয়াম থেকে অ্যান্টিবায়োটিক পেনিসিলিন পাওয়া যায়।",
        opt_bio_4_23_c: "অ্যাগারিকাস হলো মাশরুম।",
        opt_bio_4_23_d: "স্পাইরোগাইরা হলো জলজ শৈবাল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 81
      }
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_24",
    topicId: "top_ssc_biology_ch4_4",
    type: "CQ_CREATIVE",
    stem: "একটি বেকারিতে ময়দা, চিনি ও উষ্ণ পানিতে বিশেষ পাউডার (ইস্ট) মিশিয়ে খামির তৈরি করে ঢাকনা দিয়ে রাখা হলো। ১ ঘণ্টা পর খামিরটি ফুলে দ্বিগুণ আয়তন ধারণ করল। একই সময়ে একজন শ্রমিক ভারী বস্তা টানার পর হাত-পায়ের পেশিতে তীব্র ব্যথায় বসে পড়লেন।",
    options: null,
    explanation: {
      directAnswer: "খামির ফোলা হলো ইস্টের অবাত শ্বসনে CO₂ তৈরি এবং শ্রমিকের পেশি ব্যথা হলো অক্সিজেনের অভাবে ল্যাকটিক এসিড জমা হওয়া।",
      coreConcept: "অবাত শ্বসনের দুই প্রধান রূপ: ইস্টের অ্যালকোহলিক গাঁজন এবং পেশিকোষের ল্যাকটিক এসিড গাঁজন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 80
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "অবাত শ্বসন কাকে বলে তা নির্ভুল লেখা।" },
      kha: { mark: 2, criteria: "সবাত ও অবাত শ্বসনে উৎপন্ন শক্তির পরিমাণের আকাশ-পাতাল পার্থক্যের কারণ ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের বেকারির খামির ফুলে ওঠার পেছনের রাসায়নিক প্রক্রিয়া সমীকরণসহ বর্ণনা করা।" },
      gha: { mark: 4, criteria: "উদ্দীপকের শ্রমিকের পেশিতে যে প্রক্রিয়া ঘটেছে তা বিশ্রামের পর কীভাবে স্বাভাবিক হয় শারীরবৃত্তীয়ভাবে বিশ্লেষণ করো।" }
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড সৃজনশীল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // Topic 4.5: সবাত শ্বসনের ধাপসমূহ ও শক্তির হিসাব (q_bio_4_25 to 30)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_25",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "সবাত শ্বসনের কোন ধাপটিতে কোনো মুক্ত অক্সিজেনের প্রয়োজন হয় না এবং এটি সাইটোপ্লাজমে সংঘটিত হয়?",
    options: [
      { id: "opt_bio_4_25_a", text: "গ্লাইকোলাইসিস", isCorrect: true },
      { id: "opt_bio_4_25_b", text: "অ্যাসিটাইল কো-এ সৃষ্টি", isCorrect: false },
      { id: "opt_bio_4_25_c", text: "ক্রেবস চক্র", isCorrect: false },
      { id: "opt_bio_4_25_d", text: "ইলেকট্রন প্রবাহ তন্ত্র", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: গ্লাইকোলাইসিস।",
      coreConcept: "গ্লাইকোলাইসিস সবাত ও অবাত উভয় শ্বসনের সাধারণ প্রথম ধাপ, যা সাইটোপ্লাজমে অক্সিজেন ছাড়াই সম্পন্ন হয়।",
      distractorAnalysis: {
        opt_bio_4_25_b: "অ্যাসিটাইল কো-এ সাইটোপ্লাজম ও মাইটোকন্ড্রিয়া সংযোগস্থলে ঘটে।",
        opt_bio_4_25_c: "ক্রেবস চক্র মাইটোকন্ড্রিয়ার ম্যাট্রিক্সে ঘটে।",
        opt_bio_4_25_d: "ইলেকট্রন প্রবাহ তন্ত্রে সরাসরি অক্সিজেনের প্রয়োজন হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 77
      }
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_26",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "সবাত শ্বসনে ক্রেবস চক্রটি কোষের কোন অংশে সংঘটিত হয়?",
    options: [
      { id: "opt_bio_4_26_a", text: "সাইটোপ্লাজমে", isCorrect: false },
      { id: "opt_bio_4_26_b", text: "মাইটোকন্ড্রিয়ার ম্যাট্রিক্সে (Matrix)", isCorrect: true },
      { id: "opt_bio_4_26_c", text: "ক্লোরোপ্লাস্টের গ্রানায়", isCorrect: false },
      { id: "opt_bio_4_26_d", text: "নিউক্লিওলাসে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মাইটোকন্ড্রিয়ার ম্যাট্রিক্সে (Matrix)।",
      coreConcept: "ক্রেবস চক্রের যাবতীয় ডিকার্বক্সিলেশন ও ডিহাইড্রোজিনেশন বিক্রিয়া মাইটোকন্ড্রিয়ার অভ্যন্তরীণ তরল ধাত্র বা ম্যাট্রিক্সে ঘটে।",
      distractorAnalysis: {
        opt_bio_4_26_a: "সাইটোপ্লাজমে গ্লাইকোলাইসিস ঘটে।",
        opt_bio_4_26_c: "গ্রানায় আলোক বিক্রিয়া ঘটে।",
        opt_bio_4_26_d: "নিউক্লিওলাসে রাইবোজোম তৈরি হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 78
      }
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_27",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "সবাত শ্বসনে ইলেকট্রন প্রবাহ তন্ত্রের মাধ্যমে ১ অণু বিজারিত $NADH + H^+$ জারিত হলে কত অণু ATP তৈরি হয়?",
    options: [
      { id: "opt_bio_4_27_a", text: "১ অণু", isCorrect: false },
      { id: "opt_bio_4_27_b", text: "২ অণু", isCorrect: false },
      { id: "opt_bio_4_27_c", text: "৩ অণু", isCorrect: true },
      { id: "opt_bio_4_27_d", text: "৪ অণু", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৩ অণু।",
      coreConcept: "NCTB পাঠ্যবই অনুযায়ী ইলেকট্রন প্রবাহ তন্ত্রে ১ অণু NADH+H⁺ থেকে ৩টি ATP এবং ১ অণু FADH₂ থেকে ২টি ATP পাওয়া যায়।",
      distractorAnalysis: {
        opt_bio_4_27_a: "১টি ATP হলো ১টি GTP-র মান।",
        opt_bio_4_27_b: "২টি ATP হলো ১টি FADH₂-এর সমতুল্য।",
        opt_bio_4_27_d: "৪ অণু ভুল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 79
      }
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_28",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "১ অণু গ্লুকোজ সবাত শ্বসনে সম্পূর্ণরূপে জারিত হলে ক্রেবস চক্র থেকে সরাসরি ও পরোক্ষভাবে সর্বমোট কতটি ATP পাওয়া যায়?",
    options: [
      { id: "opt_bio_4_28_a", text: "৮টি", isCorrect: false },
      { id: "opt_bio_4_28_b", text: "৬টি", isCorrect: false },
      { id: "opt_bio_4_28_c", text: "২৪টি", isCorrect: true },
      { id: "opt_bio_4_28_d", text: "৩৮টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ২৪টি।",
      coreConcept: "ক্রেবস চক্রে তৈরি হয়: ২ GTP (= ২ ATP) + ৬ NADH (= ১৮ ATP) + ২ FADH₂ (= ৪ ATP) = মোট ২৪টি ATP।",
      distractorAnalysis: {
        opt_bio_4_28_a: "৮টি ATP আসে গ্লাইকোলাইসিস থেকে।",
        opt_bio_4_28_b: "৬টি ATP আসে অ্যাসিটাইল কো-এ সৃষ্টি থেকে।",
        opt_bio_4_28_d: "৩৮টি হলো সবাত শ্বসনের সর্বমোট ATP।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 79
      }
    },
    difficulty: "HARD",
    boardSource: "যশোর বোর্ড ২০১৯",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_29",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "অঙ্কুরিত ছোলা বীজের শ্বসন পরীক্ষায় জীবন্ত বীজের ফ্লাস্কে রাখা থার্মোমিটারের পারদ স্তম্ভ উপরে ওঠে কেন?",
    options: [
      { id: "opt_bio_4_29_a", text: "বীজ পানি শোষণ করে ফুলে ওঠায়", isCorrect: false },
      { id: "opt_bio_4_29_b", text: "সবাত শ্বসনে খাদ্য জারণের শক্তি তাপ হিসেবে নির্গত হওয়ায়", isCorrect: true },
      { id: "opt_bio_4_29_c", text: "বাতাস থেকে অক্সিজেন দ্রুত প্রবেশ করায়", isCorrect: false },
      { id: "opt_bio_4_29_d", text: "ফ্লাস্কের কাচ তাপ শোষণ করায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সবাত শ্বসনে খাদ্য জারণের শক্তি তাপ হিসেবে নির্গত হওয়ায়।",
      coreConcept: "শ্বসন একটি তাপোৎপাদী জৈব-রাসায়নিক প্রক্রিয়া। উৎপন্ন রাসায়নিক শক্তির একটি বড় অংশ তাপশক্তি হিসেবে পরিবেশে নির্গত হয়, যা পারদ স্তম্ভকে প্রসারিত করে।",
      distractorAnalysis: {
        opt_bio_4_29_a: "পানি শোষণ তাপ বাড়ায় না।",
        opt_bio_4_29_c: "অক্সিজেন তাপ বৃদ্ধি করে না।",
        opt_bio_4_29_d: "থার্মোফ্লাস্ক তাপ অপরিবাহী।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 82
      }
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_30",
    topicId: "top_ssc_biology_ch4_5",
    type: "CQ_CREATIVE",
    stem: "শিক্ষক বোর্ডে একটি ছক আঁকলেন:\nধাপ X (সাইটোপ্লাজম): গ্লুকোজ → ২ অণু যৌগ P + নিট ২টি ATP + ২ অণু Q\nধাপ Y (মাইটোকন্ড্রিয়া): ২ অণু P → অ্যাসিটাইল কো-এ → ক্রেবস চক্র → ২৪টি ATP।\nশিক্ষক বললেন, “এই সার্বিক প্রক্রিয়ায় মোট ৩৮টি ATP ও ৬৮৬ কিলোক্যালরি শক্তি বিমুক্ত হয় যা জীবদেহকে সজীব রাখে।”",
    options: null,
    explanation: {
      directAnswer: "ধাপ X হলো গ্লাইকোলাইসিস, যৌগ P হলো পাইরুভিক এসিড এবং যৌগ Q হলো NADH + H⁺।",
      coreConcept: "সবাত শ্বসনের ধারাবাহিক ধাপসমূহ এবং ১ অণু গ্লুকোজ থেকে ৩৮টি ATP উৎপাদনের সামগ্রিক হিসাব।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 78
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "গ্লাইকোলাইসিস কী তা সঠিকভাবে লেখা।" },
      kha: { mark: 2, criteria: "ক্রেবস চক্রকে কেন সাইট্রিক এসিড চক্র বলা হয় ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের ধাপ X ও ধাপ Y-তে উৎপন্ন মোট ৩৮টি ATP-র একটি পূর্ণাঙ্গ ব্যালেন্স শিট ছক তৈরি করা।" },
      gha: { mark: 4, criteria: "যদি কোষে মাইটোকন্ড্রিয়া অনুপস্থিত থাকত, তবে উদ্দীপকের বিক্রিয়ায় উৎপাদিত শক্তির ওপর কী চরম প্রভাব পড়ত তা বিশ্লেষণ করো।" }
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  }
];
