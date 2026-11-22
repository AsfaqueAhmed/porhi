import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter7QuestionsBatch2: QuestionData[] = [
  {
    id: "q_bio_7_31",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "রাতের বেলা ঘন গাছপালায় ঘেরা ঘরে বা গাছের নিচে ঘুমালে মানুষের শ্বাসকষ্ট হতে পারে কেন?",
    options: [
      {
        id: "opt_bio_7_31_a",
        text: "উদ্ভিদ রাতে বিষাক্ত মিথেন গ্যাস তৈরি করে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_31_b",
        text: "রাতে সালোকসংশ্লেষণ বন্ধ থাকায় উদ্ভিদ কেবল অক্সিজেন শোষণ ও কার্বন ডাই-অক্সাইড ত্যাগ করে",
        isCorrect: true
      },
      {
        id: "opt_bio_7_31_c",
        text: "রাতে উদ্ভিদের পত্ররন্ধ্র দিয়ে অতিরিক্ত পানি বাষ্পীভূত হয়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_31_d",
        text: "রাতে উদ্ভিদের ক্লোরোপ্লাস্ট সম্পূর্ণ ধ্বংস হয়ে যায়",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: রাতে সালোকসংশ্লেষণ বন্ধ থাকায় উদ্ভিদ কেবল অক্সিজেন শোষণ ও কার্বন ডাই-অক্সাইড ত্যাগ করে।",
      coreConcept: "সালোকসংশ্লেষণের জন্য আলো প্রয়োজন যা রাতে থাকে না। কিন্তু শ্বসন প্রক্রিয়া রাতেও অব্যাহত থাকে, ফলে উদ্ভিদ অক্সিজেন গ্রহণ ও কার্বন ডাই-অক্সাইড নির্গমন করে।",
      distractorAnalysis: {
        opt_bio_7_31_a: "উদ্ভিদ স্বাভাবিক শ্বসনে মিথেন তৈরি করে না, $CO_2$ উৎপন্ন করে।",
        opt_bio_7_31_c: "রাতে পত্ররন্ধ্র বন্ধ থাকায় প্রস্বেদন প্রায় বন্ধ থাকে।",
        opt_bio_7_31_d: "ক্লোরোপ্লাস্ট অক্ষত থাকে, কেবল আলোর অভাবে অন্ধকার দশার কাজ চলে না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "রাতে: আলো নেই $\\rightarrow$ সালোকসংশ্লেষণ নেই $\\rightarrow$ শুধু শ্বসন ($O_2$ শোষণ, $CO_2$ নির্গমন)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_32",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "পত্ররন্ধ্রের রক্ষীকোষের স্ফীতি ও শিথিলতা মূলত কোনটির ওপর নির্ভরশীল?",
    options: [
      {
        id: "opt_bio_7_32_a",
        text: "কোষে পানির প্রবেশ ও নির্গমন (অন্তঃঅভিস্রবণ ও বহিঃঅভিস্রবণ)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_32_b",
        text: "কেবল পাতার কিউটিকলের পুরুত্ব",
        isCorrect: false
      },
      {
        id: "opt_bio_7_32_c",
        text: "জাইলেমের ট্রাকিডের ব্যাস",
        isCorrect: false
      },
      {
        id: "opt_bio_7_32_d",
        text: "মূলরোমের সংখ্যা",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কোষে পানির প্রবেশ ও নির্গমন।",
      coreConcept: "রক্ষীকোষে চিনি বা দ্রাব্য ঘনত্ব বাড়লে পানি প্রবেশ করে স্ফীত হয় এবং রন্ধ্র খোলে; পানি বেরিয়ে গেলে কোষ শিথিল হয়ে রন্ধ্র বন্ধ হয়।",
      distractorAnalysis: {
        opt_bio_7_32_b: "কিউটিকল বাষ্পীভবন কমায়, রক্ষীকোষের তাৎক্ষণিক চলন নিয়ন্ত্রণ করে না।",
        opt_bio_7_32_c: "ট্রাকিড পানি পরিবহনের পথ, রন্ধ্র নিয়ন্ত্রক নয়।",
        opt_bio_7_32_d: "মূলরোম মাটি থেকে পানি শোষণ করে, রন্ধ্রের স্ফীতির সরাসরি নিয়ন্ত্রক নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "রক্ষীকোষে পানি প্রবেশ = স্ফীতি = রন্ধ্র উন্মুক্ত।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_33",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "কাষ্ঠল উদ্ভিদের লেন্টিসেল সম্পর্কে কোন উক্তিটি সত্য?",
    options: [
      {
        id: "opt_bio_7_33_a",
        text: "এটি রাতে বন্ধ থাকে এবং দিনে খোলে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_33_b",
        text: "এটি কাণ্ডের বাকলে অবস্থিত একটি স্থায়ী খোলা ছিদ্র",
        isCorrect: true
      },
      {
        id: "opt_bio_7_33_c",
        text: "এতে একজোড়া অর্ধচন্দ্রাকার রক্ষীকোষ থাকে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_33_d",
        text: "এটি কেবল একবীজপত্রী বিরুৎ উদ্ভিদে দেখা যায়",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: এটি কাণ্ডের বাকলে অবস্থিত একটি স্থায়ী খোলা ছিদ্র।",
      coreConcept: "লেন্টিসেলের কোনো রক্ষীকোষ নেই, ফলে এটি দিন-রাত সর্বদা উন্মুক্ত থাকে এবং এর মাধ্যমে মৃদু গ্যাসীয় ব্যাপন ও প্রস্বেদন ঘটে।",
      distractorAnalysis: {
        opt_bio_7_33_a: "লেন্টিসেল সর্বদা খোলা থাকে, বন্ধ হতে পারে না।",
        opt_bio_7_33_c: "রক্ষীকোষ কেবল পত্ররন্ধ্রে থাকে, লেন্টিসেলে থাকে না।",
        opt_bio_7_33_d: "লেন্টিসেল পরিণত কাষ্ঠল দ্বিবীজপত্রী উদ্ভিদে তৈরি হয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "লেন্টিসেল = কাণ্ডের স্থায়ী খোলা রন্ধ্র (রক্ষীকোষহীন)।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_34",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "পাতার সাধারণ এপিডার্মিস কোষে নিচের কোন অঙ্গাণুটি অনুপস্থিত হলেও রক্ষীকোষে সুস্পষ্টভাবে বিদ্যমান?",
    options: [
      {
        id: "opt_bio_7_34_a",
        text: "কোষপ্রাচীর",
        isCorrect: false
      },
      {
        id: "opt_bio_7_34_b",
        text: "মাইটোকন্ড্রিয়া",
        isCorrect: false
      },
      {
        id: "opt_bio_7_34_c",
        text: "ক্লোরোপ্লাস্ট",
        isCorrect: true
      },
      {
        id: "opt_bio_7_34_d",
        text: "কোষঝিল্লি",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ক্লোরোপ্লাস্ট।",
      coreConcept: "পাতার বহিত্বকীয় কোষে বর্ণহীন প্লাস্টিড থাকলেও সবুজ ক্লোরোপ্লাস্ট থাকে না; কিন্তু রক্ষীকোষে প্রচুর ক্লোরোপ্লাস্ট থাকে যা খাদ্য ও চিনি তৈরি করে রন্ধ্র খোলে।",
      distractorAnalysis: {
        opt_bio_7_34_a: "সকল উদ্ভিদকোষেই সেলুলোজ নির্মিত কোষপ্রাচীর থাকে।",
        opt_bio_7_34_b: "সব সজীব উদ্ভিদকোষেই মাইটোকন্ড্রিয়া থাকে।",
        opt_bio_7_34_d: "কোষঝিল্লি প্রতিটি সজীব প্রোটোপ্লাজমকে ঘিরে রাখে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "রক্ষীকোষের বিশেষ অস্ত্র = ক্লোরোপ্লাস্ট।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_35",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "ভোরবেলা ও গোধূলির মৃদু আলোতে উদ্ভিদে গ্যাসীয় বিনিময়ের ক্ষেত্রে কোনটি ঘটে?",
    options: [
      {
        id: "opt_bio_7_35_a",
        text: "সালোকসংশ্লেষণ ও শ্বসনের গ্যাস বিনিময় হার প্রায় সমান থাকে",
        isCorrect: true
      },
      {
        id: "opt_bio_7_35_b",
        text: "উদ্ভিদ কেবল অতিরিক্ত অক্সিজেন বাইরে ত্যাগ করে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_35_c",
        text: "উদ্ভিদ কেবল কার্বন ডাই-অক্সাইড গ্রহণ করে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_35_d",
        text: "শ্বসন প্রক্রিয়া পুরোপুরি বন্ধ থাকে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সালোকসংশ্লেষণ ও শ্বসনের গ্যাস বিনিময় হার প্রায় সমান থাকে।",
      coreConcept: "ভোর ও গোধূলিতে আলোর তীব্রতা কম থাকায় সালোকসংশ্লেষণের হার শ্বসনের হারের সমান হয় (ক্ষতিপূরণ বিন্দু), ফলে নেট গ্যাসীয় বিনিময় শূন্যের কাছাকাছি হয়।",
      distractorAnalysis: {
        opt_bio_7_35_b: "মৃদু আলোতে সালোকসংশ্লেষণের অতিরিক্ত $O_2$ তৈরি হয় না।",
        opt_bio_7_35_c: "শ্বসনে উৎপন্ন $CO_2$ নিজেই সালোকসংশ্লেষণে ব্যবহৃত হয়।",
        opt_bio_7_35_d: "শ্বসন দিন-রাত সর্বদা চলে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "ভোর ও গোধূলি = সালোকসংশ্লেষণ হার $\\approx$ শ্বসন হার।"
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_36",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "নাসাপথের ভেতরের প্রাচীরে অবস্থিত কোন উপাদানটি প্রশ্বাসের বায়ুর সাথে আসা ধূলিকণা ও জীবাণু আটকে দেয়?",
    options: [
      {
        id: "opt_bio_7_36_a",
        text: "সূক্ষ্ম রোম এবং মিউকাস ক্ষরণকারী সিলিয়াযুক্ত ঝিল্লি",
        isCorrect: true
      },
      {
        id: "opt_bio_7_36_b",
        text: "অস্থি নির্মিত কঠিন আবরণ",
        isCorrect: false
      },
      {
        id: "opt_bio_7_36_c",
        text: "শ্বেতকণিকার প্লাটিলেট",
        isCorrect: false
      },
      {
        id: "opt_bio_7_36_d",
        text: "হিমোগ্লোবিন কণা",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সূক্ষ্ম রোম এবং মিউকাস ক্ষরণকারী সিলিয়াযুক্ত ঝিল্লি।",
      coreConcept: "নাসাপথের রোম এবং মিউকাস বাতাসকে ছেঁকে পরিষ্কার করে এবং সিলিয়া অবাঞ্ছিত কণাকে বাইরের দিকে ঠেলে দেয়।",
      distractorAnalysis: {
        opt_bio_7_36_b: "অস্থি কেবল নাসাপথের কাঠামো তৈরি করে, ছাঁকনের কাজ করে না।",
        opt_bio_7_36_c: "প্লাটিলেট রক্ত জমাট বাঁধায় অংশ নেয়।",
        opt_bio_7_36_d: "হিমোগ্লোবিন রক্তের লোহিত কণিকায় অক্সিজেন পরিবহন করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 162
      },
      proTipShortcut: "নাসাপথ = প্রাকৃতিক এয়ার ফিল্টার (রোম + মিউকাস)।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_37",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "খাদ্য ও বায়ু চলাচলের সাধারণ সংযোগস্থল কোনটি?",
    options: [
      {
        id: "opt_bio_7_37_a",
        text: "গলবিল (Pharynx)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_37_b",
        text: "ট্রাকিয়া (Trachea)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_37_c",
        text: "ব্রঙ্কাস (Bronchus)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_37_d",
        text: "অ্যালভিওলাস (Alveolus)",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: গলবিল (Pharynx)।",
      coreConcept: "গলবিল হলো মুখগহ্বর ও নাসাপথের পেছনে অবস্থিত সাধারণ পথ যা দিয়ে খাদ্য অন্ননালিতে এবং বায়ু শ্বাসনালিতে যায়।",
      distractorAnalysis: {
        opt_bio_7_37_b: "ট্রাকিয়া কেবল বায়ু পরিবহনের পথ।",
        opt_bio_7_37_c: "ব্রঙ্কাস ফুসফুসে বাতাস পৌঁছে দেয়।",
        opt_bio_7_37_d: "অ্যালভিওলাস ফুসফুসের গ্যাস বিনিময়কারী থলি।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 162
      },
      proTipShortcut: "খাদ্য ও বাতাসের জংশন = গলবিল।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_38",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "ট্রাকিয়ার তরুণাস্থি বলয়গুলো পেছনের অংশে অসম্পূর্ণ বা C-আকৃতির হওয়ার প্রধান শারীরবৃত্তীয় সুবিধা কী?",
    options: [
      {
        id: "opt_bio_7_38_a",
        text: "পেছনের অন্ননালি দিয়ে খাদ্যের লোকমা সহজে নেমে যেতে পারে",
        isCorrect: true
      },
      {
        id: "opt_bio_7_38_b",
        text: "ফুসফুস সহজে ওঠানামা করতে পারে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_38_c",
        text: "ভোকাল কর্ড সহজে স্পন্দিত হতে পারে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_38_d",
        text: "রক্ত চলাচল বৃদ্ধি পায়",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পেছনের অন্ননালি দিয়ে খাদ্যের লোকমা সহজে নেমে যেতে পারে।",
      coreConcept: "ট্রাকিয়ার ঠিক পেছনে অন্ননালি থাকে। পেছনের অংশ নরম পেশি দিয়ে গঠিত হওয়ায় খাবার গিলার সময় অন্ননালি প্রসারিত হতে পারে কিন্তু শ্বাসনালি চুপসে যায় না।",
      distractorAnalysis: {
        opt_bio_7_38_b: "ফুসফুস বক্ষগহ্বরে থাকে, ট্রাকিয়ার তরুণাস্থির সাথে সরাসরি ওঠানামা করে না।",
        opt_bio_7_38_c: "ভোকাল কর্ড স্বরযন্ত্রে থাকে, ট্রাকিয়ার রিংয়ের সাথে সম্পর্কিত নয়।",
        opt_bio_7_38_d: "রক্ত চলাচলের সাথে তরুণাস্থির C-আকৃতির সংযোগ নেই।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 163
      },
      proTipShortcut: "ট্রাকিয়ার পেছনে অন্ননালি $\\rightarrow$ প্রসারণের জন্য C-রিং।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_39",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "প্লুরা পর্দার দুই স্তরের মধ্যবর্তী তরলের নাম কী এবং এর কাজ কী?",
    options: [
      {
        id: "opt_bio_7_39_a",
        text: "সেরাস রস; ফুসফুস ও বক্ষপ্রাচীরের মধ্যবর্তী ঘর্ষণ কমায়",
        isCorrect: true
      },
      {
        id: "opt_bio_7_39_b",
        text: "সাইনোভিয়াল রস; অস্থিসন্ধিকে পিচ্ছিল করে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_39_c",
        text: "সেরিব্রোস্পাইনাল ফ্লুইড; মস্তিষ্ককে পুষ্টি দেয়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_39_d",
        text: "পিত্তরস; চর্বি পরিপাক করে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সেরাস রস; ফুসফুস ও বক্ষপ্রাচীরের মধ্যবর্তী ঘর্ষণ কমায়।",
      coreConcept: "প্লুরার দুই স্তরের মাঝে সেরাস ফ্লুইড থাকে যা শ্বাসপ্রশ্বাসের সময় ফুসফুস ও বক্ষপিঞ্জরের ঘর্ষণ রোধ করে।",
      distractorAnalysis: {
        opt_bio_7_39_b: "সাইনোভিয়াল রস সাইনোভিয়াল অস্থিসন্ধিতে থাকে।",
        opt_bio_7_39_c: "সেরিব্রোস্পাইনাল ফ্লুইড (CSF) মস্তিষ্ক ও সুষুম্নাকাণ্ডে থাকে।",
        opt_bio_7_39_d: "পিত্তরস যকৃত তৈরি করে এবং পিত্তথলিতে থাকে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 164
      },
      proTipShortcut: "প্লুরা রস = সেরাস রস = ফুসফুসের ঘর্ষণনাশক।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_40",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "মানুষের বাম ফুসফুসে খণ্ড বা লোব সংখ্যা ২টি হওয়ার শারীরবৃত্তীয় কারণ কোনটি?",
    options: [
      {
        id: "opt_bio_7_40_a",
        text: "বক্ষগহ্বরে হৃদপিণ্ডের বামমুখী অবস্থানের জন্য স্থান সংকুলান করা",
        isCorrect: true
      },
      {
        id: "opt_bio_7_40_b",
        text: "বাম ফুসফুস কম অক্সিজেন গ্রহণ করে বলে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_40_c",
        text: "বাম ফুসফুসে কোনো অ্যালভিওলাই থাকে না",
        isCorrect: false
      },
      {
        id: "opt_bio_7_40_d",
        text: "বাম ব্রঙ্কাস শাখাহীন থাকে বলে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বক্ষগহ্বরে হৃদপিণ্ডের বামমুখী অবস্থানের জন্য স্থান সংকুলান করা।",
      coreConcept: "হৃদপিণ্ড বুকের মাঝখানে থেকে কিছুটা বাম দিকে হেলে অবস্থান করায় বাম ফুসফুসের জন্য জায়গা কম থাকে, ফলে এটি মাত্র ২টি লোবে গঠিত হয়।",
      distractorAnalysis: {
        opt_bio_7_40_b: "উভয় ফুসফুসই সক্রিয়ভাবে গ্যাসীয় বিনিময় করে।",
        opt_bio_7_40_c: "বাম ফুসফুসে কোটি কোটি অ্যালভিওলাই থাকে।",
        opt_bio_7_40_d: "বাম ব্রঙ্কাস ২টি শাখায় বিভক্ত হয়ে লোবদ্বয়ে প্রবেশ করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 164
      },
      proTipShortcut: "বাম ফুসফুস ছোট = কারণ সেখানে হার্ট থাকে।"
    },
    difficulty: "EASY",
    boardSource: "ক্যাডেট কলেজ",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_41",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "প্রশ্বাস বা শ্বাসগ্রহণের সময় বক্ষপিঞ্জরের পাঁজরাস্থিসমূহ কোন দিকে সঞ্চালিত হয়?",
    options: [
      {
        id: "opt_bio_7_41_a",
        text: "নিচের ও ভেতরের দিকে নেমে আসে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_41_b",
        text: "উপরের ও বাইরের দিকে উত্থিত হয়",
        isCorrect: true
      },
      {
        id: "opt_bio_7_41_c",
        text: "একপাশে বাঁকা হয়ে যায়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_41_d",
        text: "স্থির অবস্থায় অনড় থাকে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: উপরের ও বাইরের দিকে উত্থিত হয়।",
      coreConcept: "ইন্টারকোস্টাল পেশির সংকোচনে পাঁজরাস্থি ও স্টার্নাম উপরের এবং বাইরের দিকে ওঠে, যা বক্ষগহ্বরের পার্শ্বীয় ও অগ্র-পশ্চাৎ ব্যাস বৃদ্ধি করে।",
      distractorAnalysis: {
        opt_bio_7_41_a: "নিচের ও ভেতরের দিকে নেমে আসা নিঃশ্বাসে ঘটে।",
        opt_bio_7_41_c: "পাঁজরাস্থি সুষমভাবে উভয়পাশে একই সাথে ওঠে।",
        opt_bio_7_41_d: "শ্বাসক্রিয়ায় পাঁজরাস্থি অবিরাম ওঠানামা করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 166
      },
      proTipShortcut: "প্রশ্বাস: পাঁজর উপরে ও বাইরে $\\rightarrow$ বুক ফুলে ওঠে।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_42",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "শ্বাসক্রিয়ায় বক্ষগহ্বরের উলম্ব (Vertical) ব্যাস বৃদ্ধির প্রধান চালিকাশক্তি কোনটি?",
    options: [
      {
        id: "opt_bio_7_42_a",
        text: "ফুসফুসের সংকোচন",
        isCorrect: false
      },
      {
        id: "opt_bio_7_42_b",
        text: "ডায়াফ্রামের পেশির সংকোচন ও সমতল হওয়া",
        isCorrect: true
      },
      {
        id: "opt_bio_7_42_c",
        text: "অন্ননালির সংকোচন",
        isCorrect: false
      },
      {
        id: "opt_bio_7_42_d",
        text: "ল্যারিংসের ওঠানামা",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ডায়াফ্রামের পেশির সংকোচন ও সমতল হওয়া।",
      coreConcept: "ডায়াফ্রামের পেশি সংকুচিত হয়ে উদরের দিকে নেমে গেলে বক্ষগহ্বরের দৈর্ঘ্য বা উলম্ব ব্যাস সর্বাধিক বৃদ্ধি পায়।",
      distractorAnalysis: {
        opt_bio_7_42_a: "ফুসফুস নিজস্ব পেশি দিয়ে প্রসারিত হতে পারে না।",
        opt_bio_7_42_c: "অন্ননালি পরিপাক নালি, শ্বাসক্রিয়া চালনা করে না।",
        opt_bio_7_42_d: "ল্যারিংসের ওঠানামা শব্দ ও খাদ্য গিলতে সাহায্য করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 166
      },
      proTipShortcut: "উলম্ব ব্যাস বৃদ্ধি = ডায়াফ্রামের অবদান।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_43",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "তীব্র শারীরিক পরিশ্রম বা দৌড়ানোর পর শ্বাসক্রিয়ার হার দ্রুত বৃদ্ধি পায় কেন?",
    options: [
      {
        id: "opt_bio_7_43_a",
        text: "পেশিকোষে অক্সিজেনের চাহিদা বাড়ে এবং রক্তে কার্বন ডাই-অক্সাইড বৃদ্ধি পায়",
        isCorrect: true
      },
      {
        id: "opt_bio_7_43_b",
        text: "ফুসফুসের আকার ছোট হয়ে যায়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_43_c",
        text: "ডায়াফ্রাম পুরোপুরি অবশ হয়ে পড়ে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_43_d",
        text: "রক্তের হিমোগ্লোবিন নষ্ট হয়ে যায়",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পেশিকোষে অক্সিজেনের চাহিদা বাড়ে এবং রক্তে কার্বন ডাই-অক্সাইড বৃদ্ধি পায়।",
      coreConcept: "অধিক পরিশ্রমের সময় পেশিকোষে শ্বসন বেড়ে যায়, ফলে প্রচুর $CO_2$ রক্তে মেশে। রক্তে $CO_2$ বাড়লে মস্তিষ্কের মেডুলা অবলংগাটা উদ্দীপিত হয়ে শ্বাসক্রিয়ার হার বাড়িয়ে দেয়।",
      distractorAnalysis: {
        opt_bio_7_43_b: "ফুসফুসের আকার ছোট হয় না, বরং গভীর শ্বাস নেয়।",
        opt_bio_7_43_c: "ডায়াফ্রাম আরও দ্রুত সংকুচিত ও শিথিল হয়।",
        opt_bio_7_43_d: "হিমোগ্লোবিন অক্ষত থাকে এবং দ্রুত অক্সিজেন সরবরাহ করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 167
      },
      proTipShortcut: "রক্তে $CO_2$ বৃদ্ধি $\\rightarrow$ মেডুলা উদ্দীপনা $\\rightarrow$ দ্রুত শ্বাস।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_44",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "মানুষের নিঃশ্বাসে নির্গত বাতাসে কার্বন ডাই-অক্সাইডের স্বাভাবিক শতকরা পরিমাণ প্রায় কত?",
    options: [
      {
        id: "opt_bio_7_44_a",
        text: "০.০৪%",
        isCorrect: false
      },
      {
        id: "opt_bio_7_44_b",
        text: "৪%",
        isCorrect: true
      },
      {
        id: "opt_bio_7_44_c",
        text: "১৬%",
        isCorrect: false
      },
      {
        id: "opt_bio_7_44_d",
        text: "২১%",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ৪%।",
      coreConcept: "প্রশ্বাসের বাতাসে $CO_2$ থাকে মাত্র প্রায় ০.০৪%, কিন্তু ফুসফুসে গ্যাসীয় বিনিময়ের ফলে নিঃশ্বাসের বাতাসে $CO_2$-এর পরিমাণ বেড়ে প্রায় ৪% (প্রায় ১০০ গুণ) হয়।",
      distractorAnalysis: {
        opt_bio_7_44_a: "০.০৪% হলো বায়ুমণ্ডলের বা প্রশ্বাসের বাতাসের $CO_2$ হার।",
        opt_bio_7_44_c: "১৬% হলো নিঃশ্বাসের বাতাসে অবশিষ্ট অক্সিজেনের পরিমাণ।",
        opt_bio_7_44_d: "২১% হলো বায়ুমণ্ডলের বা প্রশ্বাসের বাতাসের অক্সিজেনের পরিমাণ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 167
      },
      proTipShortcut: "$CO_2$: প্রশ্বাসে ০.০৪%, নিঃশ্বাসে ৪%। $O_2$: প্রশ্বাসে ২১%, নিঃশ্বাসে ১৬%।"
    },
    difficulty: "HARD",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_45",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "বয়েলের সূত্রানুযায়ী তাপমাত্রা স্থির থাকলে ফুসফুসে বাতাস প্রবেশের সঠিক ভৌত মেকানিজম কোনটি?",
    options: [
      {
        id: "opt_bio_7_45_a",
        text: "বক্ষগহ্বরের আয়তন বৃদ্ধি পেলে ফুসফুসের অভ্যন্তরীণ বায়ুর চাপ হ্রাস পায়",
        isCorrect: true
      },
      {
        id: "opt_bio_7_45_b",
        text: "বক্ষগহ্বরের আয়তন বৃদ্ধি পেলে ফুসফুসের অভ্যন্তরীণ বায়ুর চাপ বৃদ্ধি পায়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_45_c",
        text: "ফুসফুসের চাপ সর্বদা বায়ুমণ্ডলীয় চাপের চেয়ে বেশি থাকে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_45_d",
        text: "চাপ ও আয়তনের মাঝে কোনো সম্পর্ক নেই",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বক্ষগহ্বরের আয়তন বৃদ্ধি পেলে ফুসফুসের অভ্যন্তরীণ বায়ুর চাপ হ্রাস পায়।",
      coreConcept: "গ্যাসের ক্ষেত্রে $P \\propto 1/V$। বক্ষগহ্বর প্রসারিত হলে ফুসফুসের ভেতরের চাপ ঋণাত্মক হয়, ফলে বাইরে থেকে বাতাস ভেতরে প্রবেশ করে।",
      distractorAnalysis: {
        opt_bio_7_45_b: "আয়তন বাড়লে চাপ কমে, বৃদ্ধি পায় না।",
        opt_bio_7_45_c: "চাপ বায়ুমণ্ডলের চেয়ে কম হলেই কেবল বাতাস ঢুকতে পারে।",
        opt_bio_7_45_d: "শ্বাসক্রিয়া সম্পূর্ণ চাপ-আয়তনের ব্যস্তানুপাতিক নীতির ওপর প্রতিষ্ঠিত।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 166
      },
      proTipShortcut: "আয়তন বাড়ে $\\rightarrow$ চাপ কমে $\\rightarrow$ বাতাস ঢোকে (প্রশ্বাস)।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_46",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "অ্যালভিওলাসের বায়ুতে অক্সিজেনের আংশিক চাপ ($pO_2$) কত থাকে?",
    options: [
      {
        id: "opt_bio_7_46_a",
        text: "৪০ mmHg",
        isCorrect: false
      },
      {
        id: "opt_bio_7_46_b",
        text: "৪৫ mmHg",
        isCorrect: false
      },
      {
        id: "opt_bio_7_46_c",
        text: "১০৪ mmHg",
        isCorrect: true
      },
      {
        id: "opt_bio_7_46_d",
        text: "১৬০ mmHg",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ১০৪ mmHg।",
      coreConcept: "অ্যালভিওলাসের বায়ুতে অক্সিজেনের আংশিক চাপ থাকে প্রায় ১০৪ mmHg এবং ফুসফুসীয় কৈশিক নালির রক্তে থাকে ৪০ mmHg। এই চাপের পার্থক্যে অক্সিজেন ব্যাপিত হয়ে রক্তে আসে।",
      distractorAnalysis: {
        opt_bio_7_46_a: "৪০ mmHg হলো অনক্সিজেনযুক্ত রক্তে $pO_2$ এবং অ্যালভিওলাসে $pCO_2$।",
        opt_bio_7_46_b: "৪৫ mmHg হলো কৈশিক নালির রক্তে কার্বন ডাই-অক্সাইডের আংশিক চাপ ($pCO_2$)।",
        opt_bio_7_46_d: "১৬০ mmHg হলো উন্মুক্ত বায়ুমণ্ডলে অক্সিজেনের আংশিক চাপ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 168
      },
      proTipShortcut: "অ্যালভিওলাসে $pO_2 = 104\\text{ mmHg}$, রক্তে $pO_2 = 40\\text{ mmHg}$।"
    },
    difficulty: "HARD",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_47",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "হিমোগ্লোবিনের সাথে অক্সিজেনের সংযোজন কোন ধরণের বন্ধন নির্দেশ করে?",
    options: [
      {
        id: "opt_bio_7_47_a",
        text: "অত্যন্ত দৃঢ় স্থায়ী সমযোজী বন্ধন",
        isCorrect: false
      },
      {
        id: "opt_bio_7_47_b",
        text: "শিথিল ও উভমুখী অস্থায়ী রাসায়নিক বন্ধন",
        isCorrect: true
      },
      {
        id: "opt_bio_7_47_c",
        text: "শক্তিশালী আয়নিক বন্ধন",
        isCorrect: false
      },
      {
        id: "opt_bio_7_47_d",
        text: "স্থায়ী ধাতব বন্ধন",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: শিথিল ও উভমুখী অস্থায়ী রাসায়নিক বন্ধন।",
      coreConcept: "$Hb + 4O_2 \\rightleftharpoons Hb(O_2)_4$ একটি উভমুখী শিথিল বিক্রিয়া, যাতে ফুসফুসে অক্সিজেন যুক্ত হয় এবং কোষে গিয়ে সহজেই বিয়োজিত হয়ে মুক্ত হতে পারে।",
      distractorAnalysis: {
        opt_bio_7_47_a: "স্থায়ী হলে কোষে গিয়ে অক্সিজেন মুক্ত হতে পারত না (যেমন $CO$ এর ক্ষেত্রে হয়)।",
        opt_bio_7_47_c: "এটি কোনো স্থির-তড়িৎ আয়নিক বন্ধন নয়।",
        opt_bio_7_47_d: "ধাতব বন্ধন ধাতব ক্লাসে থাকে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 169
      },
      proTipShortcut: "অক্সিহিমোগ্লোবিন = উভমুখী ও অস্থায়ী যৌগ।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_48",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "রক্তের রক্তরসে (Plasma) কার্বন ডাই-অক্সাইড প্রধানত কোন বাইকার্বনেট লবণ হিসেবে পরিবাহিত হয়?",
    options: [
      {
        id: "opt_bio_7_48_a",
        text: "সোডিয়াম বাইকার্বনেট ($NaHCO_3$)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_48_b",
        text: "পটাসিয়াম বাইকার্বনেট ($KHCO_3$)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_48_c",
        text: "ক্যালসিয়াম বাইকার্বনেট",
        isCorrect: false
      },
      {
        id: "opt_bio_7_48_d",
        text: "অ্যামোনিয়াম বাইকার্বনেট",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সোডিয়াম বাইকার্বনেট ($NaHCO_3$)।",
      coreConcept: "রক্তরসে সোডিয়াম আয়নের ঘনত্ব বেশি থাকায় বাইকার্বনেট আয়ন সোডিয়ামের সাথে যুক্ত হয়ে সোডিয়াম বাইকার্বনেট গঠন করে।",
      distractorAnalysis: {
        opt_bio_7_48_b: "পটাসিয়াম বাইকার্বনেট লোহিত রক্তকণিকার অভ্যন্তরে গঠিত হয়।",
        opt_bio_7_48_c: "রক্তে ক্যালসিয়াম বাইকার্বনেট প্রধান বাহক নয়।",
        opt_bio_7_48_d: "অ্যামোনিয়াম বাইকার্বনেট রক্তে তৈরি হয় না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 169
      },
      proTipShortcut: "প্লাজমা = সোডিয়াম বাইকার্বনেট ($NaHCO_3$); লোহিত কণিকা = পটাসিয়াম বাইকার্বনেট ($KHCO_3$)।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_49",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "লোহিত রক্তকণিকার (RBC) অভ্যন্তরে কার্বন ডাই-অক্সাইড প্রধানত কোন বাইকার্বনেট লবণ হিসেবে বাহিত হয়?",
    options: [
      {
        id: "opt_bio_7_49_a",
        text: "সোডিয়াম বাইকার্বনেট",
        isCorrect: false
      },
      {
        id: "opt_bio_7_49_b",
        text: "পটাসিয়াম বাইকার্বনেট ($KHCO_3$)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_49_c",
        text: "ম্যাগনেসিয়াম বাইকার্বনেট",
        isCorrect: false
      },
      {
        id: "opt_bio_7_49_d",
        text: "আয়রন বাইকার্বনেট",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: পটাসিয়াম বাইকার্বনেট ($KHCO_3$)।",
      coreConcept: "লোহিত রক্তকণিকার ভেতরে পটাসিয়াম আয়নের ঘনত্ব বেশি থাকে, ফলে উৎপন্ন বাইকার্বনেট আয়ন পটাসিয়ামের সাথে যুক্ত হয়ে $KHCO_3$ তৈরি করে।",
      distractorAnalysis: {
        opt_bio_7_49_a: "সোডিয়াম বাইকার্বনেট রক্তরসে (প্লাজমায়) তৈরি হয়।",
        opt_bio_7_49_c: "ম্যাগনেসিয়াম বাইকার্বনেট রক্তে প্রধান গ্যাস বাহক নয়।",
        opt_bio_7_49_d: "আয়রন হিমোগ্লোবিনে থাকে কিন্তু আয়রন বাইকার্বনেট গঠিত হয় না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 169
      },
      proTipShortcut: "লোহিত কণিকায় K বেশি $\\rightarrow$ $KHCO_3$।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_50",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "কার্বামিনো-হিমোগ্লোবিন তৈরিতে কার্বন ডাই-অক্সাইড হিমোগ্লোবিনের কোন অংশের সাথে সরাসরি যুক্ত হয়?",
    options: [
      {
        id: "opt_bio_7_50_a",
        text: "লৌহ বা হিম অংশের সাথে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_50_b",
        text: "গ্লোবিন প্রোটিনের অ্যামিনো ($-NH_2$) গ্রুপের সাথে",
        isCorrect: true
      },
      {
        id: "opt_bio_7_50_c",
        text: "কার্বোক্সিল গ্রুপের সাথে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_50_d",
        text: "ফসফেট গ্রুপের সাথে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: গ্লোবিন প্রোটিনের অ্যামিনো ($-NH_2$) গ্রুপের সাথে।",
      coreConcept: "$Hb-NH_2 + CO_2 \\rightleftharpoons Hb-NHCOOH$; কার্বন ডাই-অক্সাইড প্রোটিনের মুক্ত অ্যামিনো গ্রুপের সাথে যুক্ত হয়ে কার্বামিনো যৌগ গঠন করে।",
      distractorAnalysis: {
        opt_bio_7_50_a: "অক্সিজেন যুক্ত হয় লৌহ বা হিম অংশের সাথে।",
        opt_bio_7_50_c: "কার্বোক্সিল গ্রুপের সাথে $CO_2$ যুক্ত হয় না।",
        opt_bio_7_50_d: "হিমোগ্লোবিনে কোনো ফসফেট গ্রুপ গ্যাস বাহক হিসেবে থাকে না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 169
      },
      proTipShortcut: "অক্সিজেন ধরে হিম (Fe), কার্বন ডাই-অক্সাইড ধরে গ্লোবিন ($-NH_2$)।"
    },
    difficulty: "HARD",
    boardSource: "ক্যাডেট কলেজ",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_51",
    topicId: "top_ssc_biology_ch7_5",
    type: "MCQ",
    stem: "ব্রঙ্কাইটিস (Bronchitis) রোগের প্রধান রোগলক্ষণ কোনটি?",
    options: [
      {
        id: "opt_bio_7_51_a",
        text: "একটানা কাশি, বুকে ব্যথা এবং কাশির সাথে প্রচুর কফ বা শ্লেষ্মা নির্গমন",
        isCorrect: true
      },
      {
        id: "opt_bio_7_51_b",
        text: "শরীরে লাল লাল ফুসকুড়ি ওঠা",
        isCorrect: false
      },
      {
        id: "opt_bio_7_51_c",
        text: "হাঁটু ও কনুইয়ের অস্থিসন্ধি ফুলে যাওয়া",
        isCorrect: false
      },
      {
        id: "opt_bio_7_51_d",
        text: "রক্তচাপ মারাত্মকভাবে হ্রাস পাওয়া",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: একটানা কাশি, বুকে ব্যথা এবং কাশির সাথে প্রচুর কফ বা শ্লেষ্মা নির্গমন।",
      coreConcept: "ব্রঙ্কাসের ভেতরের মিউকাস ঝিল্লির প্রদাহই হলো ব্রঙ্কাইটিস। ধূমপান ও ধুলাবালির কারণে অতিরিক্ত কফ তৈরি হয় এবং বুকে অস্বস্তি হয়।",
      distractorAnalysis: {
        opt_bio_7_51_b: "লাল ফুসকুড়ি হাম বা চর্মরোগের লক্ষণ।",
        opt_bio_7_51_c: "অস্থিসন্ধি ফুলে যাওয়া বাতজ্বর বা আর্থ্রাইটিসের লক্ষণ।",
        opt_bio_7_51_d: "রক্তচাপ হ্রাস শ্বাসনালির প্রদাহের সরাসরি লক্ষণ নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 171
      },
      proTipShortcut: "ব্রঙ্কাইটিস = ব্রঙ্কাসের প্রদাহ + কফযুক্ত কাশি।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_52",
    topicId: "top_ssc_biology_ch7_5",
    type: "MCQ",
    stem: "নিউমোনিয়া রোগে আক্রান্ত রোগীর ফুসফুসে শারীরবৃত্তীয় কী পরিবর্তন ঘটে?",
    options: [
      {
        id: "opt_bio_7_52_a",
        text: "ফুসফুসের অ্যালভিওলাই তরল, পুঁজ ও শ্লেষ্মায় পূর্ণ হয়ে গ্যাস বিনিময় বাধাগ্রস্ত হয়",
        isCorrect: true
      },
      {
        id: "opt_bio_7_52_b",
        text: "ফুসফুসের রক্তনালি পুরোপুরি ছিঁড়ে যায়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_52_c",
        text: "প্লুরা পর্দা শুকিয়ে কাঠ হয়ে যায়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_52_d",
        text: "ট্রাকিয়ার তরুণাস্থি রিংগুলো গলে যায়",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ফুসফুসের অ্যালভিওলাই তরল, পুঁজ ও শ্লেষ্মায় পূর্ণ হয়ে গ্যাস বিনিময় বাধাগ্রস্ত হয়।",
      coreConcept: "স্ট্রেপ্টোকক্কাস নিউমোনি ব্যাকটেরিয়ার সংক্রমণে অ্যালভিওলাসে প্রদাহজনিত তরল জমে যায়, ফলে বায়ু ধারণ ক্ষমতা কমে গিয়ে তীব্র শ্বাসকষ্ট ও সায়ানোসিস হয়।",
      distractorAnalysis: {
        opt_bio_7_52_b: "রক্তনালি ছিঁড়ে যাওয়া মারাত্মক আঘাতে হতে পারে, নিউমোনিয়ার স্বাভাবিক প্রক্রিয়া নয়।",
        opt_bio_7_52_c: "প্লুরাতে তরল জমতে পারে (প্লুরিসি), শুকিয়ে কাঠ হয় না।",
        opt_bio_7_52_d: "তরুণাস্থি গলে যায় না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 172
      },
      proTipShortcut: "নিউমোনিয়া = অ্যালভিওলাই তরল ও পুঁজে পূর্ণ।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_53",
    topicId: "top_ssc_biology_ch7_5",
    type: "MCQ",
    stem: "যক্ষ্মা (Tuberculosis) নির্ণয়ে রোগীর কফে কোন ধরনের দণ্ডাকৃতির ব্যাকটেরিয়া শনাক্ত করা হয়?",
    options: [
      {
        id: "opt_bio_7_53_a",
        text: "এসিড-ফাস্ট ব্যাসিলাস (AFB)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_53_b",
        text: "গ্রাম-নেগেটিভ স্পাইরিলাম",
        isCorrect: false
      },
      {
        id: "opt_bio_7_53_c",
        text: "স্টেফাইলোকক্কাস",
        isCorrect: false
      },
      {
        id: "opt_bio_7_53_d",
        text: "ভিব্রিও কমা আকৃতির ব্যাকটেরিয়া",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: এসিড-ফাস্ট ব্যাসিলাস (AFB)।",
      coreConcept: "মাইকোব্যাকটেরিয়াম টিউবারকিউলোসিস একটি এসিড-ফাস্ট ব্যাসিলাস (দণ্ডাকৃতির) ব্যাকটেরিয়া। কফের AFB স্টেইনিং করে এটি মাইক্রোস্কোপে শনাক্ত করা হয়।",
      distractorAnalysis: {
        opt_bio_7_53_b: "স্পাইরিলাম পেঁচানো ব্যাকটেরিয়া (যেমন সিফিলিসের জীবাণু)।",
        opt_bio_7_53_c: "স্টেফাইলোকক্কাস গোল গোল গুচ্ছাকারের ত্বক সংক্রমণের ব্যাকটেরিয়া।",
        opt_bio_7_53_d: "ভিব্রিও কলেরার কমা আকৃতির ব্যাকটেরিয়া।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 173
      },
      proTipShortcut: "যক্ষ্মার কফ পরীক্ষা = AFB টেস্ট।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_54",
    topicId: "top_ssc_biology_ch7_5",
    type: "MCQ",
    stem: "ফুসফুসের ক্যান্সারের প্রধান কারণ হিসেবে তামাক ও সিগারেটের ধোঁয়ায় থাকা কোন উপাদানটি সবচেয়ে বিপজ্জনক?",
    options: [
      {
        id: "opt_bio_7_54_a",
        text: "আলকাতরা (Tar), বেনজোপাইরিনসহ ৫০টির বেশি কার্সিনোজেন",
        isCorrect: true
      },
      {
        id: "opt_bio_7_54_b",
        text: "অক্সিজেন ও নাইট্রোজেন গ্যাস",
        isCorrect: false
      },
      {
        id: "opt_bio_7_54_c",
        text: "জলীয় বাষ্প ও সুগন্ধি তেল",
        isCorrect: false
      },
      {
        id: "opt_bio_7_54_d",
        text: "ভিটামিন ও খনিজ লবণ",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: আলকাতরা (Tar), বেনজোপাইরিনসহ ৫০টির বেশি কার্সিনোজেন।",
      coreConcept: "তামাকের ধোঁয়ায় উপস্থিত ক্যান্সার সৃষ্টিকারী কার্সিনোজেনসমূহ ফুসফুসের এপিথেলিয়াল কোষের DNA ক্ষতিগ্রস্ত করে অনিয়ন্ত্রিত কোষ বিভাজন ঘটায়।",
      distractorAnalysis: {
        opt_bio_7_54_b: "অক্সিজেন ও নাইট্রোজেন স্বাভাবিক বায়ুর উপাদান।",
        opt_bio_7_54_c: "সুগন্ধি তেল ক্যান্সার সৃষ্টিকারী প্রধান এজেন্ট নয়।",
        opt_bio_7_54_d: "সিগারেটের ধোঁয়ায় কোনো পুষ্টিকর ভিটামিন থাকে না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 174
      },
      proTipShortcut: "তামাকের ধোঁয়া = মারাত্মক কার্সিনোজেন $\\rightarrow$ ফুসফুসের ক্যান্সার।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_55",
    topicId: "top_ssc_biology_ch7_1",
    type: "CQ_CREATIVE",
    stem: "অনন্যা একটি কাঁচের জারে একটি সতেজ টবযুক্ত গাছ রেখে মুখটি বায়ুরোধী কর্ক দিয়ে বন্ধ করে ২৪ ঘণ্টা পর্যবেক্ষণ করল। সে লক্ষ্য করল দুপুর ১২টায় জারের বায়ুতে অক্সিজেনের মাত্রা বৃদ্ধি পেয়েছে, কিন্তু মধ্যরাত ২টায় পরীক্ষা করে দেখল জারের বায়ুতে অক্সিজেনের ঘনত্ব কমে গিয়ে কার্বন ডাই-অক্সাইডের ঘনত্ব বৃদ্ধি পেয়েছে।",
    options: null,
    explanation: {
      directAnswer: "অনন্যার পর্যবেক্ষণটি উদ্ভিদের সালোকসংশ্লেষণ ও শ্বসনের দিন-রাতের গ্যাস বিনিময় ভারসাম্য নির্দেশ করে।",
      coreConcept: "উদ্ভিদে আলোর উপস্থিতিতে সালোকসংশ্লেষণ ও শ্বসনের তুলনামূলক হার এবং অন্ধকার দশায় গ্যাস বিনিময়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "স্টোমাটা বা পত্ররন্ধ্র কী তা সংজ্ঞায়িত করা।"
      },
      kha: {
        mark: 2,
        criteria: "উদ্ভিদের গ্যাসীয় বিনিময়ে ব্যাপন প্রক্রিয়ার ভূমিকা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "দুপুর ১২টায় জারের বায়ুতে অক্সিজেনের মাত্রা বৃদ্ধি পাওয়ার কারণ সমীকরণসহ ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "মধ্যরাতে জারের গ্যাসীয় পরিবর্তনের শারীরবৃত্তীয় কারণ বিশ্লেষণ করে পরিবেশ রক্ষায় উদ্ভিদের গুরুত্ব মূল্যায়ন করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_56",
    topicId: "top_ssc_biology_ch7_2",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান পরীক্ষাগারে শিক্ষক মডেল দেখিয়ে বললেন, “শ্বসনতন্ত্রের 'P' অঙ্গটি স্বরযন্ত্র থেকে বক্ষগহ্বর পর্যন্ত বিস্তৃত এবং এর দেয়ালে বিশেষ তরুণাস্থি রিং রয়েছে যা বায়ুহীন অবস্থাতেও নালিকে উন্মুক্ত রাখে। এটি বক্ষগহ্বরে দুটি শাখায় ভাগ হয়ে হৃদপিণ্ডের দুপাশে অবস্থিত 'Q' অঙ্গে প্রবেশ করেছে। 'Q' অঙ্গটির কার্যকরী একক কোটি কোটি বায়ুথলি দ্বারা গঠিত।”",
    options: null,
    explanation: {
      directAnswer: "'P' অঙ্গটি হলো শ্বাসনালি বা ট্রাকিয়া এবং 'Q' অঙ্গটি হলো ফুসফুস (অ্যালভিওলাই সমৃদ্ধ)।",
      coreConcept: "মানব শ্বাসনালির গঠন, তরুণাস্থি রিংয়ের কাজ এবং ফুসফুসের আণুবীক্ষণিক গঠন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 163
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "ট্রাকিয়ায় কয়টি তরুণাস্থি বলয় থাকে তা লেখা (১৬–২০টি)।"
      },
      kha: {
        mark: 2,
        criteria: "ফুসফুসকে সুরক্ষাকারী দ্বিস্তরবিশিষ্ট প্লুরা পর্দার গুরুত্ব ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকে উল্লিখিত 'P' অঙ্গটির গঠন ও বায়ু পরিবহনে এর উপযোগিতা বর্ণনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "'Q' অঙ্গের গঠনগত একক কীভাবে গ্যাস বিনিময়ে বিশাল পৃষ্ঠতল নিশ্চিত করে তা বিশ্লেষণ করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_57",
    topicId: "top_ssc_biology_ch7_3",
    type: "CQ_CREATIVE",
    stem: "একজন অ্যাথলেট ১০০ মিটার স্প্রিন্ট শেষ করার পর দ্রুত ও গভীরভাবে হাঁপাতে লাগলেন। এসময় তার বুকের পাঁজরাস্থিগুলো খুব দ্রুত ওঠানামা করছিল এবং পেট ও বুকের মধ্যবর্তী বিভাজক পর্দাটি তীব্রভাবে সংকুচিত ও শিথিল হচ্ছিল। কিছুক্ষণ বিশ্রামের পর তার শ্বাসপ্রশ্বাসের ছন্দ পুনরায় স্বাভাবিক (মিনিটে ১৬ বার) হয়ে এল।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকটিতে শারীরিক পরিশ্রমের সময় শ্বাসক্রিয়ার হার বৃদ্ধি এবং ডায়াফ্রাম ও ইন্টারকোস্টাল পেশির মেকানিক্স বর্ণনা করা হয়েছে।",
      coreConcept: "শ্বাসক্রিয়া নিয়ন্ত্রণকারী স্নায়ুকেন্দ্র এবং ডায়াফ্রাম ও পর্শুকার পেশির চাপ-আয়তন পরিবর্তন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 166
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "প্রাপ্তবয়স্ক সুস্থ মানুষের স্বাভাবিক শ্বাসক্রিয়ার হার কত তা লেখা (১৪–১৮ বার/মিনিট)।"
      },
      kha: {
        mark: 2,
        criteria: "প্রশ্বাসের সময় ফুসফুসে কেন বাতাস প্রবেশ করে তা চাপের পার্থক্যের ভিত্তিতে ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "স্প্রিন্ট শেষে অ্যাথলেটের বুক ও পেটের মধ্যবর্তী পর্দাটির (ডায়াফ্রাম) ক্রিয়াশীলতা ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "অ্যাথলেটের শ্বাসক্রিয়ার হার দ্রুত বৃদ্ধি ও পরবর্তীতে স্বাভাবিকে ফিরে আসায় মেডুলা অবলংগাটার ভূমিকা বিশ্লেষণ করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_58",
    topicId: "top_ssc_biology_ch7_4",
    type: "CQ_CREATIVE",
    stem: "উদ্দীপকে দুটি চিত্র দেওয়া হলো:<br>চিত্র-X: ফুসফুসের একটি অ্যালভিওলাস এবং সংলগ্ন কৈশিক নালিতে গ্যাসের আদান-প্রদান ($pO_2 = 104\\text{ mmHg}$ এবং $pCO_2 = 40\\text{ mmHg}$)।<br>চিত্র-Y: রক্তরসে সোডিয়াম বাইকার্বনেট ও লোহিত কণিকায় অক্সিহিমোগ্লোবিনের পরিবহন প্রক্রিয়া।",
    options: null,
    explanation: {
      directAnswer: "চিত্র-X হলো অ্যালভিওলাই-কৈশিক জালিকার ব্যাপন তল এবং চিত্র-Y হলো রক্তে গ্যাসীয় পরিবহন।",
      coreConcept: "আংশিক চাপের পার্থক্যে গ্যাসীয় ব্যাপন এবং রক্তে $O_2$ ও $CO_2$ পরিবহনের জৈব-রাসায়নিক রূপসমূহ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 168
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "শ্বসন ঝিল্লি (Respiratory membrane) কী তা সংজ্ঞায়িত করা।"
      },
      kha: {
        mark: 2,
        criteria: "অক্সিজেন পরিবহনে হিমোগ্লোবিনের ভূমিকা কেন অপরিহার্য তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "চিত্র-X এর তথ্যানুযায়ী আংশিক চাপের পার্থক্যে গ্যাসীয় ব্যাপনের গতিপথ ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "রক্তের মাধ্যমে কার্বন ডাই-অক্সাইড ফুসফুসে পরিবহনের বিভিন্ন কৌশল চিত্র-Y এর আলোকে মূল্যায়ন করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_59",
    topicId: "top_ssc_biology_ch7_4",
    type: "CQ_CREATIVE",
    stem: "বদ্ধ ঘরে কয়লার চুলা জ্বালিয়ে ঘুমানোর কারণে একটি পরিবারের সবাই সকালে নিস্তেজ ও সংজ্ঞাহীন অবস্থায় উদ্ধার হলো। হাসপাতালে চিকিৎসক জানালেন, বাতাসে অক্সিজেনের অভাব এবং বিষাক্ত কার্বন মনোক্সাইড ($CO$) গ্যাসের কারণে তাদের রক্তে হিমোগ্লোবিনের কার্যকারিতা নষ্ট হয়ে এই মর্মান্তিক ঘটনা ঘটেছে।",
    options: null,
    explanation: {
      directAnswer: "কার্বন মনোক্সাইডের সাথে হিমোগ্লোবিনের তীব্র আসক্তি এবং কার্বোক্সিহিমোগ্লোবিন গঠনের বিষক্রিয়া।",
      coreConcept: "হিমোগ্লোবিনের অক্সিজেন পরিবহন মেকানিক্স বনাম বিষাক্ত গ্যাসের সাথে অপরিবর্তনীয় বিক্রিয়া।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 169
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "অক্সিহিমোগ্লোবিনের রাসায়নিক সংকেত বা সমীকরণ লেখা ($Hb(O_2)_4$)।"
      },
      kha: {
        mark: 2,
        criteria: "রক্তরসে ভৌত দ্রবণ রূপে কেন মাত্র সামান্য (২%) অক্সিজেন বাহিত হয় তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "স্বাভাবিক অবস্থায় হিমোগ্লোবিন কীভাবে দেহকোষে অক্সিজেন সরবরাহ করে তা বর্ণনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "কয়লার ধোঁয়ায় থাকা কার্বন মনোক্সাইড কেন মানুষের মৃত্যুর কারণ হলো তা হিমোগ্লোবিনের আসক্তির প্রেক্ষিতে বিশ্লেষণ করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_60",
    topicId: "top_ssc_biology_ch7_5",
    type: "CQ_CREATIVE",
    stem: "জনাব রফিক (৫৫) বিগত ৩০ বছর ধরে দৈনিক ২০টি করে সিগারেট খান। সম্প্রতি তার দীর্ঘদিনের কাশি সারছে না, কফে রক্ত যাচ্ছে, ওজন দ্রুত হ্রাস পেয়েছে এবং কণ্ঠস্বর কর্কশ হয়ে গেছে। এক্স-রে ও ব্রঙ্কোস্কোপি করে ডাক্তার তার ডান ফুসফুসে অনিয়ন্ত্রিত ম্যালিগন্যান্ট কোষের বিস্তার দেখতে পেলেন।",
    options: null,
    explanation: {
      directAnswer: "জনাব রফিক ধূমপানজনিত কারণে ফুসফুসের ক্যান্সারে (Lung Cancer) আক্রান্ত হয়েছেন।",
      coreConcept: "ধূমপানের ক্ষতিকর রাসায়নিক উপাদান (কার্সিনোজেন), ফুসফুসের ক্যান্সার ও ব্রঙ্কাইটিসের লক্ষণ ও প্রতিকার।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 174
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "কার্সিনোজেন কাকে বলে তা সঠিক সংজ্ঞায়িত করা (ক্যান্সার সৃষ্টিকারী উপাদান)।"
      },
      kha: {
        mark: 2,
        criteria: "ব্রঙ্কাইটিস রোগের প্রধান কারণসমূহ ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "জনাব রফিকের শারীরিক লক্ষণসমূহ কোন রোগের নির্দেশক তা উদ্দীপকের তথ্যের আলোকে শনাক্ত ও ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "ধূমপান কীভাবে ফুসফুসের গঠন ও স্বাভাবিক গ্যাসীয় বিনিময় ক্ষমতা ধ্বংস করে তা পাঠ্যবইয়ের আলোকে বিশ্লেষণ করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];
