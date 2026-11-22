import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter4QuestionsBatch2: QuestionData[] = [
  // -------------------------------------------------------------------------
  // Topic 4.1: জীবনীশক্তি ও ATP-র ভূমিকা (q_bio_4_31 to 36)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_31",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "ATP অণুর ফসফেট বন্ধনে শক্তি জমা থাকার প্রধান কারণ কী?",
    options: [
      { id: "opt_bio_4_31_a", text: "ফসফেটগুলোর ঋণাত্মক চার্জের মধ্যকার পারস্পরিক বিকর্ষণ ও উচ্চশক্তির বন্ধন", isCorrect: true },
      { id: "opt_bio_4_31_b", text: "রাইবোজ সুগারের মিষ্টি স্বাদ", isCorrect: false },
      { id: "opt_bio_4_31_c", text: "এডিনিনের হাইড্রোজেন বন্ধন", isCorrect: false },
      { id: "opt_bio_4_31_d", text: "পানির উপস্থিতি ছাড়া এটি ভাঙতে না পারা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ফসফেটগুলোর ঋণাত্মক চার্জের মধ্যকার পারস্পরিক বিকর্ষণ ও উচ্চশক্তির বন্ধন।",
      coreConcept: "ফসফেট গ্রুপগুলো নেগেটিভ চার্জযুক্ত হওয়ায় পরস্পরের কাছাকাছি থাকতে প্রচুর শক্তি নিয়ে সংলগ্ন থাকে; ফলে প্রান্তীয় বন্ধন ভাঙলে প্রচুর শক্তি মুক্ত হয়।",
      distractorAnalysis: {
        opt_bio_4_31_b: "রাইবোজের স্বাদের সাথে শক্তির সম্পর্ক নেই।",
        opt_bio_4_31_c: "এডিনিনের হাইড্রোজেন বন্ধন ডিএনএ ডাবল হেলিক্সে থাকে, এটি ফসফেটের উচ্চশক্তি বন্ধন নয়।",
        opt_bio_4_31_d: "পানির উপস্থিতি হাইড্রোলাইসিসের মাধ্যম মাত্র।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 65
      }
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_32",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "কোষের একটি অণু থেকে ফসফেট গ্রুপ বিচ্ছিন্ন হয়ে শক্তি মুক্ত হওয়ার প্রক্রিয়াকে কী বলে?",
    options: [
      { id: "opt_bio_4_32_a", text: "অক্সিডেশন", isCorrect: false },
      { id: "opt_bio_4_32_b", text: "ডিফসফোরাইলেশন", isCorrect: true },
      { id: "opt_bio_4_32_c", text: "পলিমারাইজেশন", isCorrect: false },
      { id: "opt_bio_4_32_d", text: "ফটোলাইসিস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ডিফসফোরাইলেশন।",
      coreConcept: "ATP থেকে ফসফেট অপসারিত হয়ে ADP ও মুক্ত শক্তি নির্গত হওয়ার প্রক্রিয়া হলো ডিফসফোরাইলেশন।",
      distractorAnalysis: {
        opt_bio_4_32_a: "অক্সিডেশন হলো ইলেকট্রন বর্জন বা জারণ।",
        opt_bio_4_32_c: "পলিমারাইজেশন হলো ক্ষুদ্র অণু জুড়ে বৃহৎ পলিমার তৈরি।",
        opt_bio_4_32_d: "ফটোলাইসিস হলো আলোর সাহায্যে পানি ভাঙা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 65
      }
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_33",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "এডিনিনের সাথে ১টি ফসফেট ও রাইবোজ সুগার যুক্ত থাকলে উৎপন্ন যৌগকে কী বলা হয়?",
    options: [
      { id: "opt_bio_4_33_a", text: "AMP", isCorrect: true },
      { id: "opt_bio_4_33_b", text: "ADP", isCorrect: false },
      { id: "opt_bio_4_33_c", text: "ATP", isCorrect: false },
      { id: "opt_bio_4_33_d", text: "GTP", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: AMP।",
      coreConcept: "১টি ফসফেট থাকলে Adenosine Monophosphate (AMP), ২টি থাকলে ADP এবং ৩টি থাকলে ATP।",
      distractorAnalysis: {
        opt_bio_4_33_b: "ADP-তে ২টি ফসফেট থাকে।",
        opt_bio_4_33_c: "ATP-তে ৩টি ফসফেট থাকে।",
        opt_bio_4_33_d: "GTP-তে গুয়ানিন ক্ষারক থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 65
      }
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০১৯",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_34",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "ATP চক্র (ATP Cycle) বলতে জীবকোষের কোন অবিরাম প্রক্রিয়াটিকে বোঝায়?",
    options: [
      { id: "opt_bio_4_34_a", text: "কোষের কেন্দ্র থেকে পরিধির দিকে ATP-র ঘূর্ণন", isCorrect: false },
      { id: "opt_bio_4_34_b", text: "ATP ভেঙে ADP হওয়া এবং পুনরায় খাদ্য জারণের শক্তিতে ADP থেকে ATP সৃষ্টি হওয়া", isCorrect: true },
      { id: "opt_bio_4_34_c", text: "কেবল উদ্ভিদের পাতায় ক্লোরোফিলের চক্রাকার রূপান্তর", isCorrect: false },
      { id: "opt_bio_4_34_d", text: "DNA থেকে mRNA তৈরি হওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ATP ভেঙে ADP হওয়া এবং পুনরায় খাদ্য জারণের শক্তিতে ADP থেকে ATP সৃষ্টি হওয়া।",
      coreConcept: "কোষে শক্তি খরচের সময় ATP → ADP + Pi এবং শক্তি সঞ্চয়ের সময় ADP + Pi → ATP রূপান্তর একটি অবিরাম রিচার্জেবল ব্যাটারির মতো চলতে থাকে।",
      distractorAnalysis: {
        opt_bio_4_34_a: "ঘূর্ণন কোনো সাইটোপ্লাজমীয় পরিবহন চক্র নয়।",
        opt_bio_4_34_c: "ক্লোরোফিল রূপান্তর আলাদা বিষয়।",
        opt_bio_4_34_d: "এটি ট্রান্সক্রিপশন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 66
      }
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_35",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "১ মোল ATP আর্দ্রবিশ্লেষিত হলে এসআই (SI) এককে কত কিলোজুল (kJ) শক্তি নির্গত হয়?",
    options: [
      { id: "opt_bio_4_35_a", text: "১৫.২০ kJ", isCorrect: false },
      { id: "opt_bio_4_35_b", text: "২২.৪৫ kJ", isCorrect: false },
      { id: "opt_bio_4_35_c", text: "৩০.৫৫ kJ", isCorrect: true },
      { id: "opt_bio_4_35_d", text: "৪৮.৭৫ kJ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৩০.৫৫ kJ।",
      coreConcept: "১ ক্যালরি = ৪.১৮৪ জুল। সে হিসেবে ৭.৩ কিলোক্যালরি = প্রায় ৩০.৫৫ কিলোজুল (kJ)।",
      distractorAnalysis: {
        opt_bio_4_35_a: "১৫.২০ kJ ভুল মান।",
        opt_bio_4_35_b: "২২.৪৫ kJ ভুল মান।",
        opt_bio_4_35_d: "৪৮.৭৫ kJ ভুল মান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 66
      }
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_36",
    topicId: "top_ssc_biology_ch4_1",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান ক্লাসে শিক্ষক বোর্ডে একটি চিত্র আঁকলেন:\nএডিনোসিন — ⓟ ~ ⓟ ~ ⓟ (যৌগ ক)\nশিক্ষক বললেন, “এই শেষ দুটি বন্ধন হলো উচ্চশক্তিসম্পন্ন জৈব রাসায়নিক বন্ধন। কোষ যখন কোনো জটিল অণু তৈরি করে বা আয়ন শোষণ করে, তখন এই বন্ধনটি ভেঙে গিয়ে প্রয়োজনীয় শক্তি জোগায়। আবার শ্বসনের সময় খাদ্য জারিত হয়ে নির্গত শক্তিতে এটি পুনরায় রিচার্জ হয়।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকের যৌগ 'ক' হলো এটিপি (ATP)।",
      coreConcept: "ATP-এর প্রান্তীয় ফসফেট বন্ধনে শক্তির সঞ্চয়, বিপাকীয় কাজে ভাঙন এবং খাদ্য জারণে পুনরায় তৈরি হওয়া।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 65
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "AMP-র পূর্ণ রূপ সঠিকভাবে লেখা।" },
      kha: { mark: 2, criteria: "ATP-কে কেন কোষের 'রিচার্জেবল ব্যাটারি' বলা যায় তা বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের যৌগ 'ক'-এর রাসায়নিক গঠন উপাদানসমূহ বিশ্লেষণ করা।" },
      gha: { mark: 4, criteria: "কোষের অভ্যন্তরীণ জৈবনিক বিক্রিয়াসমূহ পরিচালনায় যৌগ 'ক'-এর কেন্দ্রীয় ভূমিকার সপক্ষে ৪টি প্রমাণ উপস্থাপন করো।" }
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড সৃজনশীল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // Topic 4.2: সালোকসংশ্লেষণ — দুই পর্যায় (q_bio_4_37 to 42)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_37",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "সালোকসংশ্লেষণ প্রক্রিয়ায় সৌরশক্তি কোন শক্তিতে রূপান্তরিত হয়ে খাদ্য অণুতে আবদ্ধ হয়?",
    options: [
      { id: "opt_bio_4_37_a", text: "যান্ত্রিক শক্তি", isCorrect: false },
      { id: "opt_bio_4_37_b", text: "রাসায়নিক স্থৈতিক শক্তি", isCorrect: true },
      { id: "opt_bio_4_37_c", text: "শব্দ শক্তি", isCorrect: false },
      { id: "opt_bio_4_37_d", text: "নিউক্লীয় শক্তি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: রাসায়নিক স্থৈতিক শক্তি।",
      coreConcept: "সূর্যের আলোক শক্তি ক্লোরোফিল কর্তৃক শোষিত হয়ে রাসায়নিক বন্ধন শক্তিতে রূপান্তরিত হয় এবং শর্করার অণুতে জমা থাকে।",
      distractorAnalysis: {
        opt_bio_4_37_a: "যান্ত্রিক শক্তি পেশি চলনে কাজ করে।",
        opt_bio_4_37_c: "শব্দ শক্তি শ্রবণে কাজ করে।",
        opt_bio_4_37_d: "নিউক্লীয় শক্তি পরমাণুর কেন্দ্রে আবদ্ধ থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 67
      }
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_38",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "স্থলজ উদ্ভিদের চেয়ে জলজ উদ্ভিদে সালোকসংশ্লেষণের হার বেশি হওয়ার কারণ কী?",
    options: [
      { id: "opt_bio_4_38_a", text: "জলজ উদ্ভিদে পাতার সংখ্যা অনেক বেশি", isCorrect: false },
      { id: "opt_bio_4_38_b", text: "পানিতে দ্রবীভূত $CO_2$-এর ঘনত্ব বায়ুমণ্ডলের চেয়ে বেশি", isCorrect: true },
      { id: "opt_bio_4_38_c", text: "পানির নিচে সূর্যালোক তীব্রতর থাকে", isCorrect: false },
      { id: "opt_bio_4_38_d", text: "জলজ উদ্ভিদের কোনো পত্ররন্ধ্র থাকে না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: পানিতে দ্রবীভূত CO₂-এর ঘনত্ব বায়ুমণ্ডলের চেয়ে বেশি।",
      coreConcept: "বায়ুমণ্ডলে কার্বন ডাই-অক্সাইডের ঘনত্ব ০.০৩-০.০৪% হলেও পানিতে দ্রবীভূত CO₂-এর ঘনত্ব প্রায় ০.৩%, যা সালোকসংশ্লেষণের কাঁচামাল বাড়িয়ে দেয়।",
      distractorAnalysis: {
        opt_bio_4_38_a: "পাতার সংখ্যা সব জলজ উদ্ভিদে বেশি থাকে না।",
        opt_bio_4_38_c: "পানির গভীরতায় আলোর তীব্রতা কমে যায়।",
        opt_bio_4_38_d: "পত্ররন্ধ্র অনুপস্থিতি সালোকসংশ্লেষণ বাড়ায় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 67
      }
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_39",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "আলোক নির্ভর পর্যায়ে ক্লোরোফিল অণু সৌর আলোর কোন কণা শোষণ করে উত্তেজিত হয়?",
    options: [
      { id: "opt_bio_4_39_a", text: "নিউট্রন", isCorrect: false },
      { id: "opt_bio_4_39_b", text: "পজিট্রন", isCorrect: false },
      { id: "opt_bio_4_39_c", text: "ফোটন (Photon)", isCorrect: true },
      { id: "opt_bio_4_39_d", text: "মেসন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ফোটন (Photon)।",
      coreConcept: "আলোর শক্তি প্যাকেট বা কোয়ান্টাম হলো ফোটন। ক্লোরোফিল ফোটন কণা শোষণ করে শক্তি গ্রহণ করে এবং ইলেকট্রন স্থানান্তরিত করে।",
      distractorAnalysis: {
        opt_bio_4_39_a: "নিউট্রন পারমাণবিক কণা।",
        opt_bio_4_39_b: "পজিট্রন তেজস্ক্রিয় প্রতিকণা।",
        opt_bio_4_39_d: "মেসন মৌলিক অতিপারমাণবিক কণা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 68
      }
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_40",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "সালোকসংশ্লেষণের আলোক নিরপেক্ষ পর্যায়ে কার্বন ডাই-অক্সাইড ($CO_2$) বিজারিত হওয়ার জন্য প্রয়োজনীয় হাইড্রোজেন সরবরাহ করে কোনটি?",
    options: [
      { id: "opt_bio_4_40_a", text: "গ্লুকোজ", isCorrect: false },
      { id: "opt_bio_4_40_b", text: "$NADPH + H^+$", isCorrect: true },
      { id: "opt_bio_4_40_c", text: "অক্সিজেন", isCorrect: false },
      { id: "opt_bio_4_40_d", text: "ক্লোরোফিল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: NADPH + H⁺।",
      coreConcept: "আলোক নির্ভর পর্যায়ে পানি বিশ্লিষ্ট হয়ে NADP⁺ বিজারিত হয়ে NADPH+H⁺ গঠন করে, যা অন্ধকার পর্যায়ে শর্করা তৈরিতে প্রয়োজনীয় হাইড্রোজেন আয়ন ($H^+$) ও ইলেকট্রন প্রদান করে।",
      distractorAnalysis: {
        opt_bio_4_40_a: "গ্লুকোজ বিক্রিয়ার শেষ উৎপাদ।",
        opt_bio_4_40_c: "অক্সিজেন উপজাত হিসেবে আগেই নির্গত হয়ে গেছে।",
        opt_bio_4_40_d: "ক্লোরোফিল বিক্রিয়া ঘটায় কিন্তু হাইড্রোজেন দাতা নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 69
      }
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_41",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "ক্লোরোপ্লাস্টের তরল ধাত্র বা স্ট্রোমায় (Stroma) নিচের কোন প্রক্রিয়াটি সংঘটিত হয়?",
    options: [
      { id: "opt_bio_4_41_a", text: "পানির ফটোলাইসিস", isCorrect: false },
      { id: "opt_bio_4_41_b", text: "ফটোফসফোরাইলেশন", isCorrect: false },
      { id: "opt_bio_4_41_c", text: "কার্বন বিজারণ বা অন্ধকার পর্যায় (ক্যালভিন চক্র)", isCorrect: true },
      { id: "opt_bio_4_41_d", text: "ক্রেবস চক্র", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: কার্বন বিজারণ বা অন্ধকার পর্যায় (ক্যালভিন চক্র)।",
      coreConcept: "ক্লোরোপ্লাস্টের স্ট্রোমায় রুবিস্কোসহ কার্বন বিজারণের সব এনজাইম দ্রবীভূত থাকে, ফলে অন্ধকার পর্যায় স্ট্রোমায় ঘটে।",
      distractorAnalysis: {
        opt_bio_4_41_a: "পানির ফটোলাইসিস গ্রানা থাইলাকয়েডে ঘটে।",
        opt_bio_4_41_b: "ফটোফসফোরাইলেশন থাইলাকয়েড পর্দায় ঘটে।",
        opt_bio_4_41_d: "ক্রেবস চক্র মাইটোকন্ড্রিয়ায় ঘটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 70
      }
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_42",
    topicId: "top_ssc_biology_ch4_2",
    type: "CQ_CREATIVE",
    stem: "একটি কাচের পাত্রে পানি ও কিছু সতেজ হাইড্রিলা রেখে সূর্যালোকের নিচে রাখা হলো। কিছুক্ষণের মধ্যেই ডালের কাটা মুখ থেকে বুদবুদ উঠতে লাগল। একজন শিক্ষার্থী পাত্রটির ওপর একটি ঘন কালো কাপড় দিয়ে ঢেকে দিল। সাথে সাথেই বুদবুদ নির্গমন বন্ধ হয়ে গেল। কাপড় সরিয়ে আবার আলো ফেললে বুদবুদ পুনরায় শুরু হলো।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে সালোকসংশ্লেষণে আলোর অপরিহার্যতা এবং উপজাত হিসেবে অক্সিজেন নির্গমনের প্রমাণ প্রদর্শিত হয়েছে।",
      coreConcept: "সূর্যালোকের অনুপস্থিতিতে ক্লোরোফিল উত্তেজিত হতে পারে না, ফলে ফটোলাইসিস বন্ধ হয়ে অক্সিজেন উৎপাদন থেমে যায়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২ ও ৪.৩",
        pageNumber: 74
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ফটোলাইসিস কী তা সঠিকভাবে লেখা।" },
      kha: { mark: 2, criteria: "আলোক নিরপেক্ষ পর্যায়কে কেন সম্পূর্ণ অন্ধকার নির্ভর বলা ভুল তা বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "উদ্দীপকে কালো কাপড় দেওয়ার পর বুদবুদ বন্ধ হওয়ার বৈজ্ঞানিক কারণ সালোকসংশ্লেষণের আলোক পর্যায়ের আলোকে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "উক্ত বুদবুদ যে প্রকৃতপক্ষে অক্সিজেন গ্যাস তা ল্যাবরেটরিতে কীভাবে শনাক্ত করবে তার পরীক্ষণ ও রাসায়নিক ভিত্তি বিশ্লেষণ করো।" }
    },
    difficulty: "HARD",
    boardSource: "যশোর বোর্ড সৃজনশীল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // Topic 4.3: C3 ও C4 গতিপথ এবং প্রভাবকসমূহ (q_bio_4_43 to 48)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_43",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "ক্যালভিন চক্রের প্রথম স্থায়ী পদার্থ ৩-ফসফোগ্লিসারিক এসিড (3-PGA) কত কার্বনবিশিষ্ট?",
    options: [
      { id: "opt_bio_4_43_a", text: "২ কার্বনবিশিষ্ট", isCorrect: false },
      { id: "opt_bio_4_43_b", text: "৩ কার্বনবিশিষ্ট", isCorrect: true },
      { id: "opt_bio_4_43_c", text: "৪ কার্বনবিশিষ্ট", isCorrect: false },
      { id: "opt_bio_4_43_d", text: "৫ কার্বনবিশিষ্ট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ৩ কার্বনবিশিষ্ট।",
      coreConcept: "৩-PGA যৌগে ৩টি কার্বন পরমাণু থাকে, তাই এই চক্রের নামকরণ হয়েছে C₃ চক্র।",
      distractorAnalysis: {
        opt_bio_4_43_a: "২ কার্বনবিশিষ্ট যৌগ হলো অ্যাসিটাইল কো-এ বা গ্লাইকোলেট।",
        opt_bio_4_43_c: "৪ কার্বনবিশিষ্ট যৌগ হলো OAA।",
        opt_bio_4_43_d: "৫ কার্বনবিশিষ্ট যৌগ হলো RuBP।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 70
      }
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_44",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "হ্যাচ ও স্ল্যাক গতিপথে প্রথম কার্বন ডাই-অক্সাইড ($CO_2$) গ্রহণকারী ৩-কার্বনবিশিষ্ট পদার্থ কোনটি?",
    options: [
      { id: "opt_bio_4_44_a", text: "ফসফোএনল পাইরুভিক এসিড (PEP)", isCorrect: true },
      { id: "opt_bio_4_44_b", text: "রাইবুলোজ ১,৫-বিসফসফেট (RuBP)", isCorrect: false },
      { id: "opt_bio_4_44_c", text: "পাইরুভিক এসিড", isCorrect: false },
      { id: "opt_bio_4_44_d", text: "ল্যাকটিক এসিড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ফসফোএনল পাইরুভিক এসিড (PEP)।",
      coreConcept: "C₄ চক্রে মেসোফিল কোষে PEP কার্বক্সিলেজ এনজাইমের উপস্থিতিতে PEP যৌগটি CO₂ গ্রহণ করে OAA তৈরি করে।",
      distractorAnalysis: {
        opt_bio_4_44_b: "RuBP হলো C₃ চক্রের CO₂ গ্রাহক।",
        opt_bio_4_44_c: "পাইরুভিক এসিড গ্লাইকোলাইসিসের শেষ উৎপাদ।",
        opt_bio_4_44_d: "ল্যাকটিক এসিড অবাত শ্বসনে তৈরি হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 71
      }
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_45",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "উদ্ভিদের পাতায় কোন অভ্যন্তরীণ রাসায়নিক খনিজ আয়নটি পত্ররন্ধ্র (Stomata) খোলা ও বন্ধ হওয়া নিয়ন্ত্রণ করে?",
    options: [
      { id: "opt_bio_4_45_a", text: "সোডিয়াম ($Na^+$)", isCorrect: false },
      { id: "opt_bio_4_45_b", text: "পটাশিয়াম ($K^+$)", isCorrect: true },
      { id: "opt_bio_4_45_c", text: "আয়রন ($Fe^{2+}$)", isCorrect: false },
      { id: "opt_bio_4_45_d", text: "ক্যালসিয়াম ($Ca^{2+}$)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: পটাশিয়াম (K⁺)।",
      coreConcept: "রক্ষীকোষে (Guard cell) পটাশিয়াম আয়ন ($K^+$) প্রবেশের ফলে অভিস্রবণিক চাপ বাড়ে এবং পানি প্রবেশ করে পত্ররন্ধ্র খুলে যায়।",
      distractorAnalysis: {
        opt_bio_4_45_a: "সোডিয়াম পত্ররন্ধ্র নিয়ন্ত্রণে মূল ভূমিকা রাখে না।",
        opt_bio_4_45_c: "আয়রন সাইটোক্রোমের অংশ।",
        opt_bio_4_45_d: "ক্যালসিয়াম কোষপ্রাচীর গঠনে সহায়তা করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 73
      }
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০১৯",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_46",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "সালোকসংশ্লেষণ প্রক্রিয়ার জন্য ক্ষতিকর এবং বিষাক্ত রাসায়নিক প্রভাবক কোনটি?",
    options: [
      { id: "opt_bio_4_46_a", text: "ক্লোরোফর্ম ও মিথেন গ্যাস", isCorrect: true },
      { id: "opt_bio_4_46_b", text: "নাইট্রোজেন গ্যাস", isCorrect: false },
      { id: "opt_bio_4_46_c", text: "জলীয় বাষ্প", isCorrect: false },
      { id: "opt_bio_4_46_d", text: "অক্সিজেন গ্যাস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ক্লোরোফর্ম ও মিথেন গ্যাস।",
      coreConcept: "বাতাসে ক্লোরোফর্ম, হাইড্রোজেন সালফাইড, মিথেন ইত্যাদি বিষাক্ত গ্যাসের উপস্থিতি সালোকসংশ্লেষণের এনজাইম নিষ্ক্রিয় করে বিক্রিয়া বন্ধ করে দেয়।",
      distractorAnalysis: {
        opt_bio_4_46_b: "নাইট্রোজেন নিষ্ক্রিয় গ্যাস হিসেবে বায়ুমণ্ডলে সর্বাধিক থাকে, বিষাক্ত নয়।",
        opt_bio_4_46_c: "জলীয় বাষ্প আর্দ্রতা বজায় রাখে।",
        opt_bio_4_46_d: "অক্সিজেন সালোকসংশ্লেষণের সাধারণ উপজাত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 73
      }
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_47",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "পাতার কোন বয়সে সালোকসংশ্লেষণের হার সর্বোচ্চ দেখা যায়?",
    options: [
      { id: "opt_bio_4_47_a", text: "একেবারে কচি ও অপরিণত পাতায়", isCorrect: false },
      { id: "opt_bio_4_47_b", text: "পূর্ণবয়স্ক কিন্তু সতেজ মধ্যম বয়সের পাতায়", isCorrect: true },
      { id: "opt_bio_4_47_c", text: "হলুদ হয়ে ঝরে পড়া বয়োবৃদ্ধ পাতায়", isCorrect: false },
      { id: "opt_bio_4_47_d", text: "সব পাতাতেই সর্বদা সমান হার থাকে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: পূর্ণবয়স্ক কিন্তু সতেজ মধ্যম বয়সের পাতায়।",
      coreConcept: "কচি পাতায় ক্লোরোপ্লাস্ট অপরিপক্ব থাকে এবং বয়স্ক পাতায় ক্লোরোফিল নষ্ট হয়ে যায়, তাই মধ্যম বয়সের পাতায় সালোকসংশ্লেষণ হার সর্বোচ্চ।",
      distractorAnalysis: {
        opt_bio_4_47_a: "কচি পাতায় এনজাইম ও ক্লোরোফিল পুরোপুরি গঠিত থাকে না।",
        opt_bio_4_47_c: "বয়স্ক পাতায় ক্লোরোফিল ভেঙে লিউকোপ্লাস্ট বা ক্রোমোপ্লাস্টে রূপ নেয়।",
        opt_bio_4_47_d: "পাতার বয়সভেদে হারে বড় পার্থক্য হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 73
      }
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_48",
    topicId: "top_ssc_biology_ch4_3",
    type: "CQ_CREATIVE",
    stem: "একটি শীতকালীন গ্রিনহাউসে একজন কৃষক দেখলেন তাপমাত্রা ১৫° সে.-এ থাকায় টমেটোর উৎপাদন ধীরগতিতে চলছে। তিনি কৃত্রিম হিটার বসিয়ে তাপমাত্রা ২৮° সে.-এ উন্নীত করলেন এবং সাথে সাথে লাল রঙের এলইডি বাতি স্থাপন করলেন। এতে টমেটোর বৃদ্ধি ও ফলন দ্বিগুণ হয়ে গেল।",
    options: null,
    explanation: {
      directAnswer: "তাপমাত্রা অপটিমাম সীমায় আনা এবং সালোকসংশ্লেষণের অনুকূল লাল আলো সরবরাহ করায় সালোকসংশ্লেষণের হার বৃদ্ধি পেয়েছে।",
      coreConcept: "সালোকসংশ্লেষণের বাহ্যিক প্রভাবক হিসেবে তাপমাত্রা (২২°-৩৫° সে.) ও আলোক বর্ণালির (লাল ও নীল) সক্রিয় প্রভাব।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 72
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "সালোকসংশ্লেষণের অনুকূল তাপমাত্রা কত তা উল্লেখ করা।" },
      kha: { mark: 2, criteria: "বায়ুমণ্ডলে কার্বন ডাই-অক্সাইডের স্বাভাবিক ঘনত্বের চেয়ে গ্রিনহাউসে ঘনত্ব ১% বাড়ালে কী ঘটে ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "কৃষক লাল রঙের বাতি ব্যবহার করায় কীভাবে সালোকসংশ্লেষণের হার ত্বরান্বিত হলো তা আলোক শোষণের ভিত্তিতে উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "যদি কৃষক হিটারের তাপমাত্রা অনিয়ন্ত্রিতভাবে ৫০° সে.-এ বাড়িয়ে দিতেন, তবে ফলনের ওপর কী মারাত্মক প্রভাব পড়ত জীববৈজ্ঞানিকভাবে মূল্যায়ন করো।" }
    },
    difficulty: "HARD",
    boardSource: "রাজশাহী বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // Topic 4.4: শ্বসন — প্রকারভেদ ও অবাত শ্বসন (q_bio_4_49 to 54)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_49",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "সবাত ও অবাত উভয় শ্বসনের প্রথম এবং অভিন্ন পর্যায় কোনটি?",
    options: [
      { id: "opt_bio_4_49_a", text: "গ্লাইকোলাইসিস", isCorrect: true },
      { id: "opt_bio_4_49_b", text: "ক্রেবস চক্র", isCorrect: false },
      { id: "opt_bio_4_49_c", text: "অ্যাসিটাইল কো-এ সৃষ্টি", isCorrect: false },
      { id: "opt_bio_4_49_d", text: "ইলেকট্রন পরিবহন তন্ত্র", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: গ্লাইকোলাইসিস।",
      coreConcept: "গ্লাইকোলাইসিসে কোনো অক্সিজেনের প্রয়োজন হয় না বিধায় এটি সবাত ও অবাত উভয় শ্বসনের অভিন্ন প্রাথমিক ধাপ।",
      distractorAnalysis: {
        opt_bio_4_49_b: "ক্রেবস চক্র কেবল সবাত শ্বসনে ঘটে।",
        opt_bio_4_49_c: "অ্যাসিটাইল কো-এ কেবল সবাত শ্বসনে ঘটে।",
        opt_bio_4_49_d: "ইলেকট্রন পরিবহন তন্ত্র কেবল সবাত শ্বসনে ঘটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 77
      }
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_50",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "দুধ থেকে দই তৈরির সময় ল্যাকটোব্যাসিলাস ব্যাকটেরিয়া কোন ধরণের জৈব রাসায়নিক প্রক্রিয়া ঘটায়?",
    options: [
      { id: "opt_bio_4_50_a", text: "সবাত শ্বসন", isCorrect: false },
      { id: "opt_bio_4_50_b", text: "ল্যাকটিক এসিড গাঁজন (সন্ধান)", isCorrect: true },
      { id: "opt_bio_4_50_c", text: "অ্যালকোহলিক সন্ধান", isCorrect: false },
      { id: "opt_bio_4_50_d", text: "সালোকসংশ্লেষণ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ল্যাকটিক এসিড গাঁজন (সন্ধান)।",
      coreConcept: "ল্যাকটোব্যাসিলাস ব্যাকটেরিয়া দুধের শর্করা ল্যাকটোজকে অবাত শ্বসনে জারিত করে ল্যাকটিক এসিড উৎপন্ন করে যা দুধের প্রোটিন জমিয়ে দই বানায়।",
      distractorAnalysis: {
        opt_bio_4_50_a: "সবাত শ্বসনে কেবল CO₂ ও পানি হয়।",
        opt_bio_4_50_c: "অ্যালকোহলিক সন্ধানে মদ তৈরি হয়।",
        opt_bio_4_50_d: "ব্যাকটেরিয়া এখানে খাদ্য তৈরি করে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 81
      }
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_51",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "অবাত শ্বসনের অ্যালকোহলিক গাঁজনে ১ অণু গ্লুকোজ ভেঙে কত অণু কার্বন ডাই-অক্সাইড ($CO_2$) নির্গত হয়?",
    options: [
      { id: "opt_bio_4_51_a", text: "১ অণু", isCorrect: false },
      { id: "opt_bio_4_51_b", text: "২ অণু", isCorrect: true },
      { id: "opt_bio_4_51_c", text: "৪ অণু", isCorrect: false },
      { id: "opt_bio_4_51_d", text: "৬ অণু", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ২ অণু।",
      coreConcept: "ইস্টের অ্যালকোহলিক গাঁজনের সমীকরণ: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + শক্তি। অর্থাৎ ২ অণু CO₂ উৎপন্ন হয়।",
      distractorAnalysis: {
        opt_bio_4_51_a: "১ অণু ভুল।",
        opt_bio_4_51_c: "৪ অণু ক্রেবস চক্রে উৎপন্ন হয়।",
        opt_bio_4_51_d: "৬ অণু সবাত শ্বসনে উৎপন্ন হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 80
      }
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_52",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "পাটের আঁশ ছাড়াতে পানিতে পাটগাছ পচানোর সময় কোন প্রক্রিয়াটি সাহায্য করে?",
    options: [
      { id: "opt_bio_4_52_a", text: "জীবাণুর অবাত শ্বসন ও সন্ধান", isCorrect: true },
      { id: "opt_bio_4_52_b", text: "উদ্ভিদের বাষ্পমোচন", isCorrect: false },
      { id: "opt_bio_4_52_c", text: "অ্যালকোহল বিশ্লেষণ", isCorrect: false },
      { id: "opt_bio_4_52_d", text: "রাসায়নিক জারণ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: জীবাণুর অবাত শ্বসন ও সন্ধান।",
      coreConcept: "পানিতে নিমজ্জিত পাটের কাণ্ডের পেকটিন ও কোষপ্রাচীর পচাতে অবাত ব্যাকটেরিয়া এনজাইম ক্ষরণ করে আঁশ সহজে আলাদা হতে সাহায্য করে।",
      distractorAnalysis: {
        opt_bio_4_52_b: "বাষ্পমোচন জীবন্ত উদ্ভিদের পাতায় ঘটে।",
        opt_bio_4_52_c: "অ্যালকোহল বিশ্লেষণ নয়।",
        opt_bio_4_52_d: "এটি অণুজীবঘটিত জৈব সন্ধান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 81
      }
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০১৯",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_53",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "ল্যাকটিক এসিড গাঁজনে ১ অণু গ্লুকোজ ভেঙে কত অণু ল্যাকটিক এসিড তৈরি হয়?",
    options: [
      { id: "opt_bio_4_53_a", text: "১ অণু", isCorrect: false },
      { id: "opt_bio_4_53_b", text: "২ অণু", isCorrect: true },
      { id: "opt_bio_4_53_c", text: "৩ অণু", isCorrect: false },
      { id: "opt_bio_4_53_d", text: "৪ অণু", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ২ অণু।",
      coreConcept: "সমীকরণ: C₆H₁₂O₆ → 2C₃H₆O₃ (ল্যাকটিক এসিড) + শক্তি। এখানে ৬ কার্বন বিশিষ্ট গ্লুকোজ ভেঙে দুটি ৩ কার্বন বিশিষ্ট ল্যাকটিক এসিড হয়।",
      distractorAnalysis: {
        opt_bio_4_53_a: "১ অণু নয়, কার্বন ভারসাম্য রক্ষার্থে ২ অণু হবে।",
        opt_bio_4_53_c: "৩ অণু ভুল।",
        opt_bio_4_53_d: "৪ অণু ভুল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 80
      }
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_54",
    topicId: "top_ssc_biology_ch4_4",
    type: "CQ_CREATIVE",
    stem: "একটি পাত্রে চিনির জলীয় দ্রবণে ইস্ট যোগ করে বায়ুরোধী ছিপি দিয়ে আটকে রাখা হলো (পাত্র X)। অপর একটি খোলা পাত্রে অক্সিজেন সমৃদ্ধ পরিবেশে কিছু মাছ রাখা হলো (পাত্র Y)। কয়েক ঘণ্টা পর পাত্র X থেকে বুদবুদ এবং তীব্র ঝাঁঝালো অ্যালকোহলের গন্ধ বের হতে দেখা গেল।",
    options: null,
    explanation: {
      directAnswer: "পাত্র X-এ অবাত শ্বসন (অ্যালকোহলিক সন্ধান) এবং পাত্র Y-এ সবাত শ্বসন নির্দেশিত হয়েছে।",
      coreConcept: "অক্সিজেনের উপস্থিতিতে সবাত শ্বসন বনাম অক্সিজেনের অনুপস্থিতিতে অণুজীব দ্বারা সন্ধান প্রক্রিয়ার তুলনা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 80
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "সন্ধান বা গাঁজন (Fermentation) কী তা সংজ্ঞায়িত করা।" },
      kha: { mark: 2, criteria: "সবাত ও অবাত শ্বসনে উৎপাদিত শক্তির পরিমাণের বিশাল বৈষম্যের কারণ ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "পাত্র X-এ সংঘটিত রাসায়নিক রূপান্তরটি সমীকরণসহ ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "শিল্প ও মানবকল্যাণে পাত্র X-এ ঘটা প্রক্রিয়ার অর্থনৈতিক গুরুত্ব মূল্যায়ন করো।" }
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // Topic 4.5: সবাত শ্বসনের ধাপসমূহ ও শক্তির হিসাব (q_bio_4_55 to 60)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_55",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "গ্লাইকোলাইসিস প্রক্রিয়ায় ১ অণু গ্লুকোজ ভেঙে সর্বশেষে কয় অণু পাইরুভিক এসিড তৈরি হয়?",
    options: [
      { id: "opt_bio_4_55_a", text: "১ অণু", isCorrect: false },
      { id: "opt_bio_4_55_b", text: "২ অণু", isCorrect: true },
      { id: "opt_bio_4_45_c", text: "৩ অণু", isCorrect: false },
      { id: "opt_bio_4_55_d", text: "৪ অণু", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ২ অণু।",
      coreConcept: "৬-কার্বনবিশিষ্ট ১ অণু গ্লুকোজ ($C_6H_{12}O_6$) ভেঙে দুই অণু ৩-কার্বনবিশিষ্ট পাইরুভিক এসিড ($CH_3COCOOH$) উৎপন্ন হয়।",
      distractorAnalysis: {
        opt_bio_4_55_a: "১ অণু ভুল।",
        opt_bio_4_45_c: "পাইরুভিক এসিডে কার্বন সংখ্যা ৩, অণু সংখ্যা নয়।",
        opt_bio_4_55_d: "৪ অণু ভুল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 77
      }
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_56",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "সবাত শ্বসনে পাইরুভিক এসিড থেকে অ্যাসিটাইল কো-এ সৃষ্টির সময় কত অণু কার্বন ডাই-অক্সাইড ($CO_2$) নির্গত হয়?",
    options: [
      { id: "opt_bio_4_56_a", text: "১ অণু", isCorrect: false },
      { id: "opt_bio_4_56_b", text: "২ অণু", isCorrect: true },
      { id: "opt_bio_4_56_c", text: "৪ অণু", isCorrect: false },
      { id: "opt_bio_4_56_d", text: "৬ অণু", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ২ অণু।",
      coreConcept: "প্রতিটি ৩-কার্বন পাইরুভিক এসিড থেকে ১টি করে কার্বন $CO_2$ হিসেবে বের হয়ে ২-কার্বন অ্যাসিটাইল কো-এ হয়। সুতরাং ২ অণু পাইরুভিক এসিড থেকে ২ অণু $CO_2$ বের হয়।",
      distractorAnalysis: {
        opt_bio_4_56_a: "১ অণু পাইরুভিক এসিডের জন্য ১ অণু, কিন্তু ১ অণু গ্লুকোজের ক্ষেত্রে মোট ২ অণু।",
        opt_bio_4_56_c: "৪ অণু ক্রেবস চক্রে বের হয়।",
        opt_bio_4_56_d: "৬ অণু সর্বমোট নির্গত CO₂।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 78
      }
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_57",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "সবাত শ্বসনে ইলেকট্রন প্রবাহ তন্ত্রের মাধ্যমে ১ অণু $FADH_2$ জারিত হলে কয় অণু ATP পাওয়া যায়?",
    options: [
      { id: "opt_bio_4_57_a", text: "১ অণু", isCorrect: false },
      { id: "opt_bio_4_57_b", text: "২ অণু", isCorrect: true },
      { id: "opt_bio_4_57_c", text: "৩ অণু", isCorrect: false },
      { id: "opt_bio_4_57_d", text: "৪ অণু", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ২ অণু।",
      coreConcept: "ইলেকট্রন প্রবাহ তন্ত্রে ১ অণু FADH₂ ইলেকট্রন দান করে কমপ্লেক্স II-তে প্রবেশের ফলে ২ অণু ATP তৈরি করে।",
      distractorAnalysis: {
        opt_bio_4_57_a: "১ অণু GTP-র মান ১টি ATP।",
        opt_bio_4_57_c: "৩ অণু ATP উৎপন্ন হয় ১ অণু NADH+H⁺ থেকে।",
        opt_bio_4_57_d: "৪ অণু ভুল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 79
      }
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_58",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "মাইটোকন্ড্রিয়ার অন্তস্থ ঝিল্লির ক্রিস্টিতে (Cristae) নিচের কোন প্রধান শারীরবৃত্তীয় প্রক্রিয়াটি সংঘটিত হয়?",
    options: [
      { id: "opt_bio_4_58_a", text: "গ্লাইকোলাইসিস", isCorrect: false },
      { id: "opt_bio_4_58_b", text: "ইলেকট্রন প্রবাহ তন্ত্র (ETC)", isCorrect: true },
      { id: "opt_bio_4_58_c", text: "ক্যালভিন চক্র", isCorrect: false },
      { id: "opt_bio_4_58_d", text: "ল্যাকটিক এসিড গাঁজন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ইলেকট্রন প্রবাহ তন্ত্র (ETC)।",
      coreConcept: "মাইটোকন্ড্রিয়ার ক্রিস্টিতে সাইটোক্রোমসহ ইলেকট্রন বাহক প্রোটিন ও ATP সিন্থেসিস এনজাইম সাজানো থাকে যেখানে অক্সিডেটিভ ফসফোরাইলেশন ঘটে।",
      distractorAnalysis: {
        opt_bio_4_58_a: "গ্লাইকোলাইসিস সাইটোপ্লাজমে ঘটে।",
        opt_bio_4_58_c: "ক্যালভিন চক্র ক্লোরোপ্লাস্টের স্ট্রোমায় ঘটে।",
        opt_bio_4_58_d: "ল্যাকটিক এসিড গাঁজন সাইটোপ্লাজমে ঘটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 79
      }
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_59",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "সবাত শ্বসনে উৎপন্ন ৩৮টি ATP-র মধ্যে কেবল গ্লাইকোলাইসিস ধাপ থেকে কতটি ATP পাওয়া যায়?",
    options: [
      { id: "opt_bio_4_59_a", text: "২টি", isCorrect: false },
      { id: "opt_bio_4_59_b", text: "৬টি", isCorrect: false },
      { id: "opt_bio_4_59_c", text: "৮টি", isCorrect: true },
      { id: "opt_bio_4_59_d", text: "২৪টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৮টি।",
      coreConcept: "গ্লাইকোলাইসিসে সরাসরি নিট লাভ ২ ATP এবং ইলেকট্রন প্রবাহে ২ NADH+H⁺ থেকে ৬ ATP, সর্বমোট ৮টি ATP।",
      distractorAnalysis: {
        opt_bio_4_59_a: "২টি হলো সরাসরি সাবস্ট্রেট স্তরের ATP।",
        opt_bio_4_59_b: "৬টি হলো অ্যাসিটাইল কো-এ সৃষ্টি থেকে উৎপাদিত ATP।",
        opt_bio_4_59_d: "২৪টি হলো ক্রেবস চক্র থেকে উৎপাদিত ATP।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 79
      }
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_60",
    topicId: "top_ssc_biology_ch4_5",
    type: "CQ_CREATIVE",
    stem: "একটি ব্যবহারিক ক্লাসে শিক্ষার্থীরা দুটি থার্মোফ্লাস্ক নিল। ফ্লাস্ক-১ এ রাখা হলো সতেজ অঙ্কুরিত ছোলা বীজ এবং ফ্লাস্ক-২ এ রাখা হলো সিদ্ধ করা ও ফরমালিনে ধোয়া ছোলা বীজ। উভয় ফ্লাস্কে থার্মোমিটার স্থাপন করা হলো। ৩ ঘণ্টা পর দেখা গেল ফ্লাস্ক-১ এর তাপমাত্রা ৩০° সে. থেকে বেড়ে ৩৭° সে. হয়েছে, কিন্তু ফ্লাস্ক-২ এর তাপমাত্রা ৩০° সে.-ই রয়ে গেছে।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকটি শ্বসন প্রক্রিয়ায় তাপ নির্গমনের ব্যবহারিক পরীক্ষা নির্দেশ করে।",
      coreConcept: "জীবন্ত অঙ্কুরিত কোষে সবাত শ্বসনের মাধ্যমে রাসায়নিক শক্তি বিমুক্ত হওয়ার সময় তাপ উৎপন্ন হয়; সিদ্ধ বীজে কোষ মারা যাওয়ায় শ্বসন হয় না।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 82
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "সবাত শ্বসনের সংজ্ঞাটি নির্ভুলভাবে লেখা।" },
      kha: { mark: 2, criteria: "ফ্লাস্ক-২ এ সিদ্ধ বীজকে ফরমালিন দিয়ে ধোয়ার বৈজ্ঞানিক উদ্দেশ্য বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "ফ্লাস্ক-১ এ তাপমাত্রা বৃদ্ধি পাওয়ার কারণ সবাত শ্বসনের বিক্রিয়া ও শক্তির রূপান্তরের আলোকে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "উক্ত অঙ্কুরিত ছোলা কোষে ১ অণু গ্লুকোজ জারিত হলে যে ৩৮টি ATP উৎপন্ন হয় তার হিসাব ছক আকারে উপস্থাপন করো।" }
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  }
];
