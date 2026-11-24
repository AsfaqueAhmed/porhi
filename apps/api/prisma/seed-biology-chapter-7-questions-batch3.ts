import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter7QuestionsBatch3: QuestionData[] = [
  {
    id: "q_bio_7_61",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "নিচের কোন উদ্ভিদে লেন্টিসেল অনুপস্থিত থাকে?",
    options: [
      {
        id: "opt_bio_7_61_a",
        text: "আম গাছ",
        isCorrect: false
      },
      {
        id: "opt_bio_7_61_b",
        text: "জাম গাছ",
        isCorrect: false
      },
      {
        id: "opt_bio_7_61_c",
        text: "ধান বা ঘাসজাতীয় একবীজপত্রী বিরুৎ উদ্ভিদ",
        isCorrect: true
      },
      {
        id: "opt_bio_7_61_d",
        text: "মেহগনি গাছ",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ধান বা ঘাসজাতীয় একবীজপত্রী বিরুৎ উদ্ভিদ।",
      coreConcept: "লেন্টিসেল কেবল পরিণত কাষ্ঠল উদ্ভিদের কাণ্ডে গৌণ বৃদ্ধির সময় কর্ক ক্যাম্বিয়াম ফেটে সৃষ্টি হয়; বিরুৎ বা একবীজপত্রী কাণ্ডে লেন্টিসেল গঠিত হয় না।",
      distractorAnalysis: {
        opt_bio_7_61_a: "আম একটি বহুবর্ষজীবী কাষ্ঠল উদ্ভিদ যাতে প্রচুর লেন্টিসেল থাকে।",
        opt_bio_7_61_b: "জাম গাছে স্পষ্ট লেন্টিসেল থাকে।",
        opt_bio_7_61_d: "মেহগনি বৃক্ষে পুরু বাকল ও লেন্টিসেল বিদ্যমান।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "লেন্টিসেল থাকে কাষ্ঠল বৃক্ষে, ঘাস বা বিরুৎ উদ্ভিদে নেই।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_62",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "পত্ররন্ধ্রের রক্ষীকোষের ভেতরের অবতল প্রাচীর পুরু হওয়ার মূল শারীরবৃত্তীয় তাৎপর্য কোনটি?",
    options: [
      {
        id: "opt_bio_7_62_a",
        text: "কোষ দুটি স্ফীত হলে রন্ধ্রটি সহজে উন্মুক্ত হয়",
        isCorrect: true
      },
      {
        id: "opt_bio_7_62_b",
        text: "কোষ দুটিকে চিরতরে বন্ধ রাখে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_62_c",
        text: "পানি বাষ্পীভবন পুরোপুরি বন্ধ করে দেয়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_62_d",
        text: "ক্লোরোপ্লাস্টকে সুরক্ষিত রাখে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কোষ দুটি স্ফীত হলে রন্ধ্রটি সহজে উন্মুক্ত হয়।",
      coreConcept: "পানি প্রবেশে পাতলা বাইরের প্রাচীর বাইরে প্রসারিত হয়, ফলে পুরু ভেতরের প্রাচীরটি বাইরের দিকে টান খেয়ে বেঁকে যায় এবং মাঝখানের রন্ধ্রটি খুলে যায়।",
      distractorAnalysis: {
        opt_bio_7_62_b: "রন্ধ্র চিরতরে বন্ধ থাকে না, আলোতে নিয়মিত খোলে।",
        opt_bio_7_62_c: "রন্ধ্র খোলাই হয় প্রস্বেদন ও গ্যাস বিনিময়ের সুবিধার্থে।",
        opt_bio_7_62_d: "ক্লোরোপ্লাস্টের সুরক্ষায় প্রাচীরের অসম পুরুত্ব সরাসরি সংশ্লিষ্ট নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "অসম প্রাচীর পুরুত্বই পত্ররন্ধ্র খোলার মূল যান্ত্রিক চাবিকাঠি।"
    },
    difficulty: "HARD",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_63",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "সম্পূর্ণ নিমজ্জিত জলজ উদ্ভিদের ক্ষেত্রে গ্যাসীয় বিনিময় কীভাবে ঘটে?",
    options: [
      {
        id: "opt_bio_7_63_a",
        text: "কেবল কাণ্ডের লেন্টিসেল দ্বারা",
        isCorrect: false
      },
      {
        id: "opt_bio_7_63_b",
        text: "দেহের বহিত্বকের মাধ্যমে সরাসরি পানিতে দ্রবীভূত গ্যাসের ব্যাপন প্রক্রিয়ায়",
        isCorrect: true
      },
      {
        id: "opt_bio_7_63_c",
        text: "উন্মুক্ত পত্ররন্ধ্রের মাধ্যমে বাতাসের সাথে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_63_d",
        text: "কোনো গ্যাসীয় বিনিময় ঘটে না",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: দেহের বহিত্বকের মাধ্যমে সরাসরি পানিতে দ্রবীভূত গ্যাসের ব্যাপন প্রক্রিয়ায়।",
      coreConcept: "নিমজ্জিত উদ্ভিদে কিউটিকল ও কার্যকরী পত্ররন্ধ্র থাকে না; এদের পাতলা বহিত্বকীয় কোষের মাধ্যমে পানিতে দ্রবীভূত $O_2$ ও $CO_2$-এর ব্যাপন ঘটে।",
      distractorAnalysis: {
        opt_bio_7_63_a: "জলজ উদ্ভিদে কাষ্ঠল কাণ্ড ও লেন্টিসেল থাকে না।",
        opt_bio_7_63_c: "নিমজ্জিত উদ্ভিদে কার্যকরী পত্ররন্ধ্র থাকে না।",
        opt_bio_7_63_d: "সব সজীব উদ্ভিদেরই বেঁচে থাকার জন্য গ্যাসীয় বিনিময় অপরিহার্য।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "নিমজ্জিত জলজ উদ্ভিদ = বহিত্বক দিয়ে ব্যাপন।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_64",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "উদ্ভিদের মেসোফিল কোষে বায়ুমণ্ডল থেকে গ্যাস প্রবেশের গতিমুখ মূলত কিসের ওপর নির্ভর করে?",
    options: [
      {
        id: "opt_bio_7_64_a",
        text: "মাটির খনিজ লবণের ঘনত্বের ওপর",
        isCorrect: false
      },
      {
        id: "opt_bio_7_64_b",
        text: "বায়ুমণ্ডল ও অন্তঃকোষীয় ফাঁকের সংশ্লিষ্ট গ্যাসের ঘনত্বের পার্থক্যের ওপর",
        isCorrect: true
      },
      {
        id: "opt_bio_7_64_c",
        text: "উদ্ভিদের উচ্চতার ওপর",
        isCorrect: false
      },
      {
        id: "opt_bio_7_64_d",
        text: "মূলরোমের দৈর্ঘ্যের ওপর",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বায়ুমণ্ডল ও অন্তঃকোষীয় ফাঁকের সংশ্লিষ্ট গ্যাসের ঘনত্বের পার্থক্যের ওপর।",
      coreConcept: "ব্যাপন সর্বদা উচ্চ ঘনত্বের স্থান থেকে নিম্ন ঘনত্বের স্থানে ঘটে। পাতা বা বায়ুমণ্ডলে যে গ্যাসের ঘনত্ব বেশি থাকে, তা কম ঘনত্বের অঞ্চলের দিকে ব্যাপিত হয়।",
      distractorAnalysis: {
        opt_bio_7_64_a: "খনিজ লবণ মূল দিয়ে গৃহীত হয়, পাতার গ্যাস ব্যাপন নির্ধারণ করে না।",
        opt_bio_7_64_c: "উদ্ভিদের উচ্চতা ব্যাপনের দিক নিয়ন্ত্রণ করে না।",
        opt_bio_7_64_d: "মূলরোম মাটির সাথে সম্পর্কিত, পাতার মেসোফিলের সাথে নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "ব্যাপনের দিক = উচ্চ ঘনত্ব → নিম্ন ঘনত্ব।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_65",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "স্থলজ বিষমপৃষ্ঠ (Dorsiventral) পাতার ক্ষেত্রে পত্ররন্ধ্র প্রধানত কোথায় বেশি থাকে?",
    options: [
      {
        id: "opt_bio_7_65_a",
        text: "পাতার ঊর্ধ্বত্বকে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_65_b",
        text: "পাতার নিম্নত্বকে",
        isCorrect: true
      },
      {
        id: "opt_bio_7_65_c",
        text: "পাতার বোঁটায়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_65_d",
        text: "পত্রশীর্ষে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: পাতার নিম্নত্বকে।",
      coreConcept: "অধিকাংশ দ্বিবীজপত্রী বিষমপৃষ্ঠ পাতার নিম্নত্বকে প্রচুর পত্ররন্ধ্র থাকে, যা অতিরিক্ত প্রস্বেদন রোধ করে কার্যকর গ্যাসীয় বিনিময় নিশ্চিত করে।",
      distractorAnalysis: {
        opt_bio_7_65_a: "ভাসমান জলজ পাতার ঊর্ধ্বত্বকে থাকে, বিষমপৃষ্ঠ স্থলজ পাতার নিম্নত্বকে বেশি থাকে।",
        opt_bio_7_65_c: "পাতার বোঁটায় পত্ররন্ধ্র নগণ্য।",
        opt_bio_7_65_d: "পত্রশীর্ষে হাইডাথোড থাকতে পারে, পত্ররন্ধ্র বেশি থাকে নিম্নত্বকে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "স্থলজ পাতা = নিম্নত্বকে বেশি পত্ররন্ধ্র (প্রস্বেদন বাঁচাতে)।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_66",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "স্বরযন্ত্রের (Larynx) উপরিভাগে অবস্থিত তরুণাস্থিময় উপজিহ্বা বা ঢাকনাকে কী বলে?",
    options: [
      {
        id: "opt_bio_7_66_a",
        text: "গলবিল",
        isCorrect: false
      },
      {
        id: "opt_bio_7_66_b",
        text: "এপিগ্লটিস (Epiglottis)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_66_c",
        text: "ভোকাল কর্ড",
        isCorrect: false
      },
      {
        id: "opt_bio_7_66_d",
        text: "ইউভুলা",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: এপিগ্লটিস (Epiglottis)।",
      coreConcept: "এপিগ্লটিস হলো একটি স্থিতিস্থাপক তরুণাস্থিময় উপজিহ্বা যা খাদ্য গিলার সময় স্বরযন্ত্রের প্রবেশমুখ ঢেকে রাখে।",
      distractorAnalysis: {
        opt_bio_7_66_a: "গলবিল হলো মুখগহ্বরের পেছনের নালি।",
        opt_bio_7_66_c: "ভোকাল কর্ড স্বরযন্ত্রের ভেতরের শব্দ উৎপাদক পর্দা।",
        opt_bio_7_66_d: "ইউভুলা হলো কোমল তালুর পেছনে ঝুলন্ত আলজিহ্বা।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 162
      },
      proTipShortcut: "স্বরযন্ত্রের ঢাকনা = এপিগ্লটিস।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_67",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "ফুসফুসের অভ্যন্তরে ব্রঙ্কাস বারবার সূক্ষ্ম শাখায় বিভক্ত হয়ে যে জটিল বৃক্ষের মতো কাঠামো গঠন করে তাকে কী বলে?",
    options: [
      {
        id: "opt_bio_7_67_a",
        text: "ব্রঙ্কিয়াল ট্রি (Bronchial tree)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_67_b",
        text: "ট্রাকিয়াল রিং",
        isCorrect: false
      },
      {
        id: "opt_bio_7_67_c",
        text: "মেসেন্টারি",
        isCorrect: false
      },
      {
        id: "opt_bio_7_67_d",
        text: "লিম্ফ্যাটিক ডাক্ট",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ব্রঙ্কিয়াল ট্রি (Bronchial tree)।",
      coreConcept: "ফুসফুসে ব্রঙ্কাস ক্রমান্বয়ে সেকেন্ডারি, টারশিয়ারি ব্রঙ্কাস ও অসংখ্য ব্রঙ্কিওলে বিভক্ত হয়ে উল্টানো গাছের ডালপালার মতো বিন্যাস তৈরি করে, যাকে ব্রঙ্কিয়াল ট্রি বলে।",
      distractorAnalysis: {
        opt_bio_7_67_b: "ট্রাকিয়াল রিং ট্রাকিয়ার C-আকৃতির তরুণাস্থি বলয়।",
        opt_bio_7_67_c: "মেসেন্টারি অন্ত্রকে ঝুলিয়ে রাখা পর্দা।",
        opt_bio_7_67_d: "লিম্ফ্যাটিক ডাক্ট লসিকাতন্ত্রের নালি।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 163
      },
      proTipShortcut: "ব্রঙ্কাসের ডালপালা = ব্রঙ্কিয়াল ট্রি।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_68",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "ডান ফুসফুসে মোট কতটি সেকেন্ডারি ব্রঙ্কাস প্রবেশ করে?",
    options: [
      {
        id: "opt_bio_7_68_a",
        text: "১টি",
        isCorrect: false
      },
      {
        id: "opt_bio_7_68_b",
        text: "২টি",
        isCorrect: false
      },
      {
        id: "opt_bio_7_68_c",
        text: "৩টি",
        isCorrect: true
      },
      {
        id: "opt_bio_7_68_d",
        text: "৪টি",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৩টি।",
      coreConcept: "ডান ফুসফুস ৩টি লোবে বিভক্ত হওয়ায় ডান ব্রঙ্কাসও ৩টি সেকেন্ডারি বা লোবার ব্রঙ্কাসে বিভক্ত হয়ে প্রতিটি লোবে একটি করে প্রবেশ করে।",
      distractorAnalysis: {
        opt_bio_7_68_a: "১টি হলো প্রাথমিক ডান প্রধান ব্রঙ্কাস।",
        opt_bio_7_68_b: "বাম ফুসফুসে ২টি লোব থাকায় সেখানে ২টি সেকেন্ডারি ব্রঙ্কাস প্রবেশ করে।",
        opt_bio_7_68_d: "মানুষের ফুসফুসে ৪টি লোব বিশিষ্ট ব্রঙ্কাস থাকে না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 164
      },
      proTipShortcut: "ডান ফুসফুসে ৩ লোব → ৩টি শাখা ব্রঙ্কাস।"
    },
    difficulty: "HARD",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_69",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "মানবদেহের মধ্যচ্ছদা বা ডায়াফ্রামের সংকোচন নিয়ন্ত্রণকারী স্নায়ুর নাম কী?",
    options: [
      {
        id: "opt_bio_7_69_a",
        text: "ভেগাস স্নায়ু",
        isCorrect: false
      },
      {
        id: "opt_bio_7_69_b",
        text: "ফ্রেনিক স্নায়ু (Phrenic nerve)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_69_c",
        text: "অপটিক স্নায়ু",
        isCorrect: false
      },
      {
        id: "opt_bio_7_69_d",
        text: "অডিটরি স্নায়ু",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ফ্রেনিক স্নায়ু (Phrenic nerve)।",
      coreConcept: "সুপ্রিম কশেরুকা অঞ্চল থেকে নির্গত ফ্রেনিক স্নায়ু ডায়াফ্রামের পেশিকে উদ্দীপনা যোগায়, যার ফলে প্রশ্বাসে ডায়াফ্রাম সংকুচিত হয়।",
      distractorAnalysis: {
        opt_bio_7_69_a: "ভেগাস স্নায়ু হৃদস্পন্দন ও পরিপাকতন্ত্রে সংকেত পাঠায়।",
        opt_bio_7_69_c: "অপটিক স্নায়ু দৃষ্টির সংবেদী স্নায়ু।",
        opt_bio_7_69_d: "অডিটরি স্নায়ু শ্রবণ ও ভারসাম্যের স্নায়ু।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 164
      },
      proTipShortcut: "ডায়াফ্রাম পেশির স্নায়ু = ফ্রেনিক স্নায়ু।"
    },
    difficulty: "HARD",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_70",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "ট্রাকিয়ার ভেতরের সিলিয়াযুক্ত আবরণী কলার প্রধান কাজ কোনটি?",
    options: [
      {
        id: "opt_bio_7_70_a",
        text: "শব্দ বা ধ্বনি তৈরি করা",
        isCorrect: false
      },
      {
        id: "opt_bio_7_70_b",
        text: "শ্লেষ্মা ও ধূলিকণাকে গলবিলের দিকে ওপরের মুখে ঠেলে দেওয়া",
        isCorrect: true
      },
      {
        id: "opt_bio_7_70_c",
        text: "অক্সিজেন ব্যাপিত করা",
        isCorrect: false
      },
      {
        id: "opt_bio_7_70_d",
        text: "হিমোগ্লোবিন সংশ্লেষণ করা",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: শ্লেষ্মা ও ধূলিকণাকে গলবিলের দিকে ওপরের মুখে ঠেলে দেওয়া।",
      coreConcept: "ট্রাকিয়ার সিলিয়াগুলো অনবরত ওপরের দিকে ছন্দময় স্পন্দনে কাঁপতে থাকে, ফলে শ্লেষ্মায় আটকানো ধূলিকণা গলবিলে চলে আসে এবং মানুষ কাশির মাধ্যমে তা বের করে দেয়।",
      distractorAnalysis: {
        opt_bio_7_70_a: "ধ্বনি তৈরি করে ল্যারিংসের ভোকাল কর্ড।",
        opt_bio_7_70_c: "অক্সিজেন ব্যাপিত হয় ফুসফুসের অ্যালভিওলাইতে।",
        opt_bio_7_70_d: "হিমোগ্লোবিন তৈরি হয় অস্থিমজ্জার লোহিত কণিকায়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 163
      },
      proTipShortcut: "ট্রাকিয়ার সিলিয়া = শ্বাসনালির ঝাড়ুদার।"
    },
    difficulty: "MEDIUM",
    boardSource: "ক্যাডেট কলেজ",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_71",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "স্বাভাবিক সুস্থ মানুষের নিঃশ্বাস বা শ্বাসত্যাগের সময় ইন্টারকোস্টাল পেশির অবস্থা কেমন থাকে?",
    options: [
      {
        id: "opt_bio_7_71_a",
        text: "তীব্র সংকুচিত থাকে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_71_b",
        text: "শিথিল বা রিলাক্সড অবস্থায় ফিরে আসে",
        isCorrect: true
      },
      {
        id: "opt_bio_7_71_c",
        text: "স্পন্দিত হতে থাকে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_71_d",
        text: "পেশিটি অবশ হয়ে ছিঁড়ে যায়",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: শিথিল বা রিলাক্সড অবস্থায় ফিরে আসে।",
      coreConcept: "স্বাভাবিক নিঃশ্বাস একটি প্যাসিভ বা নিষ্ক্রিয় প্রক্রিয়া; ইন্টারকোস্টাল পেশি শিথিল হলে পাঁজরাস্থি নিজস্ব ওজনে নিচে নেমে আসে।",
      distractorAnalysis: {
        opt_bio_7_71_a: "পেশি সংকোচন প্রশ্বাসের সময় ঘটে।",
        opt_bio_7_71_c: "পেশি অবিরাম স্পন্দিত হয় না, ছন্দময়ভাবে শিথিল হয়।",
        opt_bio_7_71_d: "পেশি অক্ষত থাকে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 167
      },
      proTipShortcut: "নিঃশ্বাস = পেশির রিলাক্সেশন (শিথিলতা)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_72",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "উচ্চ পর্বতশৃঙ্গে উঠলে পর্বতারোহীদের শ্বাসকষ্ট ও শ্বাসক্রিয়ার হার দ্রুত বৃদ্ধির প্রধান কারণ কোনটি?",
    options: [
      {
        id: "opt_bio_7_72_a",
        text: "বায়ুর তাপমাত্রা খুব বেশি থাকা",
        isCorrect: false
      },
      {
        id: "opt_bio_7_72_b",
        text: "উচ্চতায় বায়ুর চাপ ও অক্সিজেনের আংশিক চাপ ($pO_2$) উল্লেখযোগ্যভাবে হ্রাস পাওয়া",
        isCorrect: true
      },
      {
        id: "opt_bio_7_72_c",
        text: "ফুসফুস সংকুচিত হয়ে নষ্ট হয়ে যাওয়া",
        isCorrect: false
      },
      {
        id: "opt_bio_7_72_d",
        text: "রক্ত চলাচল বন্ধ হয়ে যাওয়া",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: উচ্চতায় বায়ুর চাপ ও অক্সিজেনের আংশিক চাপ ($pO_2$) উল্লেখযোগ্যভাবে হ্রাস পাওয়া।",
      coreConcept: "উচ্চতায় বায়ুমণ্ডল পাতলা হওয়ায় বাতাসের সামগ্রিক চাপ ও অক্সিজেনের আংশিক চাপ কমে যায়। ফলে রক্তে অক্সিজেন ব্যাপন কমে হাইপোক্সিয়া সৃষ্টি হয় এবং শ্বাস দ্রুত হয়।",
      distractorAnalysis: {
        opt_bio_7_72_a: "পাহাড়ে তাপমাত্রা অনেক কম থাকে (ঠাণ্ডা), বেশি নয়।",
        opt_bio_7_72_c: "ফুসফুস নষ্ট হয় না, কম অক্সিজেনে কাজ করতে হিমশিম খায়।",
        opt_bio_7_72_d: "রক্ত চলাচল সচল থাকে, বরং হার্টবিট বেড়ে যায়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 166
      },
      proTipShortcut: "উচ্চতা বৃদ্ধি → বায়ুর চাপ হ্রাস → $pO_2$ হ্রাস → শ্বাসকষ্ট।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_73",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "রক্তের কোন উপাদানের ঘনত্বের প্রতি মস্তিষ্কের শ্বসনকেন্দ্র (মেডুলা) সবচেয়ে বেশি সংবেদনশীল?",
    options: [
      {
        id: "opt_bio_7_73_a",
        text: "অক্সিজেন ($O_2$)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_73_b",
        text: "কার্বন ডাই-অক্সাইড ($CO_2$) ও হাইড্রোজেন আয়ন ($H^+$)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_73_c",
        text: "নাইট্রোজেন গ্যাস",
        isCorrect: false
      },
      {
        id: "opt_bio_7_73_d",
        text: "গ্লুকোজের মাত্রা",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কার্বন ডাই-অক্সাইড ($CO_2$) ও হাইড্রোজেন আয়ন ($H^+$)।",
      coreConcept: "রক্তে $CO_2$ ও $H^+$ আয়ন বাড়লে রক্ত অম্লীয় হয়। মেডুলার কেমোরিসেপ্টর এই পরিবর্তনের প্রতি অত্যন্ত সংবেদনশীল হওয়ায় তাৎক্ষণিক শ্বাসক্রিয়ার হার বাড়িয়ে $CO_2$ বের করে দেয়।",
      distractorAnalysis: {
        opt_bio_7_73_a: "অক্সিজেনের প্রতি সংবেদনশীলতা অপেক্ষাকৃত গৌণ।",
        opt_bio_7_73_c: "নাইট্রোজেন গ্যাস রক্তে নিষ্ক্রিয় থাকে।",
        opt_bio_7_73_d: "গ্লুকোজ নিয়ন্ত্রণ করে অগ্ন্যাশয়ের ইনসুলিন।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 167
      },
      proTipShortcut: "শ্বাসক্রিয়ার প্রধান তাগিদদাতা = রক্তে $CO_2$ এর বৃদ্ধি।"
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_74",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "বিশ্রামরত অবস্থায় সুস্থ নবজাতক শিশুর প্রতি মিনিটে স্বাভাবিক শ্বাসক্রিয়ার হার প্রায় কত?",
    options: [
      {
        id: "opt_bio_7_74_a",
        text: "১০–১২ বার",
        isCorrect: false
      },
      {
        id: "opt_bio_7_74_b",
        text: "১৪–১৮ বার",
        isCorrect: false
      },
      {
        id: "opt_bio_7_74_c",
        text: "৩০–৪০ বার",
        isCorrect: true
      },
      {
        id: "opt_bio_7_74_d",
        text: "৮০–৯০ বার",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৩০–৪০ বার।",
      coreConcept: "শিশুদের দেহের বিপাকীয় হার প্রাপ্তবয়স্কদের চেয়ে বেশি এবং ফুসফুস ছোট হওয়ায় তাদের প্রতি মিনিটে শ্বাসক্রিয়ার স্বাভাবিক হার প্রায় ৩০ থেকে ৪০ বার।",
      distractorAnalysis: {
        opt_bio_7_74_a: "১০–১২ বার প্রাপ্তবয়স্কদেরও নিচের অস্বাভাবিক হার।",
        opt_bio_7_74_b: "১৪–১৮ বার সুস্থ প্রাপ্তবয়স্ক মানুষের হার।",
        opt_bio_7_74_d: "৮০–৯০ বার মারাত্মক বিপন্ন শ্বাসকষ্ট নির্দেশ করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 167
      },
      proTipShortcut: "শ্বাসহার: প্রাপ্তবয়স্ক = ১৪–১৮ বার, শিশু = ৩০–৪০ বার।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_75",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "পানিতে ডোবা ব্যক্তিকে কৃত্রিম শ্বাসপ্রশ্বাস (মুখে মুখ লাগিয়ে বাতাস দেওয়া) দিলে রোগী কতটুকু অক্সিজেন পায়?",
    options: [
      {
        id: "opt_bio_7_75_a",
        text: "০% অক্সিজেন (কেবল বিষাক্ত $CO_2$)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_75_b",
        text: "প্রায় ১৬% অক্সিজেন (যা জীবন বাঁচাতে পর্যাপ্ত)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_75_c",
        text: "১০০% বিশুদ্ধ অক্সিজেন",
        isCorrect: false
      },
      {
        id: "opt_bio_7_75_d",
        text: "৫০% অক্সিজেন",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: প্রায় ১৬% অক্সিজেন (যা জীবন বাঁচাতে পর্যাপ্ত)।",
      coreConcept: "মানুষের নিঃশ্বাসের বাতাসে প্রায় ১৬% অক্সিজেন অবশিষ্ট থাকে। তাই উদ্ধারকারীর নিঃশ্বাসের বাতাস রোগীর ফুসফুসে প্রবেশ করালে তা রক্তের হিমোগ্লোবিনকে বাঁচিয়ে রাখতে যথেষ্ট।",
      distractorAnalysis: {
        opt_bio_7_75_a: "নিঃশ্বাসে অক্সিজেন শূন্য হয় না, মাত্র ৫% খরচ হয়ে ১৬% অক্ষত থাকে।",
        opt_bio_7_75_c: "১০০% অক্সিজেন কেবল মেডিকেল সিলিন্ডারে থাকে।",
        opt_bio_7_75_d: "নিঃশ্বাসে ৫০% অক্সিজেন থাকার সুযোগ নেই।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 167
      },
      proTipShortcut: "নিঃশ্বাসের বাতাস ফেলে দেওয়া নয়, এতে ১৬% মূল্যবান $O_2$ থাকে!"
    },
    difficulty: "HARD",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_76",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "প্রাপ্তবয়স্ক একজন সুস্থ মানুষের উভয় ফুসফুসের অ্যালভিওলাই সমূহের সম্মিলিত মোট ব্যাপন ক্ষেত্রফল প্রায় কত?",
    options: [
      {
        id: "opt_bio_7_76_a",
        text: "১–২ বর্গমিটার",
        isCorrect: false
      },
      {
        id: "opt_bio_7_76_b",
        text: "১০–১৫ বর্গমিটার",
        isCorrect: false
      },
      {
        id: "opt_bio_7_76_c",
        text: "৭০–৮০ বর্গমিটার (একটি টেনিস কোর্টের সমান)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_76_d",
        text: "৫০০ বর্গমিটার",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৭০–৮০ বর্গমিটার।",
      coreConcept: "উভয় ফুসফুসের প্রায় ৭০ কোটি অ্যালভিওলাই একসাথে বিছিয়ে দিলে এর তল দাঁড়ায় প্রায় ৭০–৮০ বর্গমিটার, যা মানবদেহের ত্বকের ক্ষেত্রফলের প্রায় ৪০ গুণ।",
      distractorAnalysis: {
        opt_bio_7_76_a: "১.৫–২ বর্গমিটার মানুষের বহিত্বকের ক্ষেত্রফল।",
        opt_bio_7_76_b: "১০–১৫ বর্গমিটার অ্যালভিওলাইয়ের তুলনায় অত্যন্ত কম।",
        opt_bio_7_76_d: "৫০০ বর্গমিটার অবাস্তব অত্যধিক মান।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 168
      },
      proTipShortcut: "অ্যালভিওলাই ক্ষেত্রফল = ৭০–৮০ বর্গমিটার (বিশাল ব্যাপন তল)।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_77",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "অ্যালভিওলাস ও রক্ত কৈশিক নালির মধ্যকার ব্যাপন ঝিল্লির বেধ অত্যন্ত পাতলা হওয়ায় গ্যাসীয় বিনিময়ে কী সুবিধা হয়?",
    options: [
      {
        id: "opt_bio_7_77_a",
        text: "অত্যন্ত দ্রুত ও বাধাহীনভাবে $O_2$ ও $CO_2$ এর ব্যাপন সম্পন্ন হয়",
        isCorrect: true
      },
      {
        id: "opt_bio_7_77_b",
        text: "রক্তের লোহিত কণিকা অ্যালভিওলাসের বাতাসে বেরিয়ে আসে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_77_c",
        text: "গ্যাস বিনিময় বন্ধ হয়ে যায়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_77_d",
        text: "ফুসফুস ভারী হয়ে যায়",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অত্যন্ত দ্রুত ও বাধাহীনভাবে $O_2$ ও $CO_2$ এর ব্যাপন সম্পন্ন হয়।",
      coreConcept: "শ্বসন ঝিল্লি মাত্র ০.২ থেকে ০.৫ মাইক্রোমিটার পাতলা হওয়ায় গ্যাসীয় অণুগুলো এক সেকেন্ডের ভগ্নাংশের মধ্যে ব্যাপিত হয়ে রক্ত ও বাতাসের ভারসাম্য রক্ষা করে।",
      distractorAnalysis: {
        opt_bio_7_77_b: "সুস্থ শ্বসন ঝিল্লি ভেদ করে রক্তকণিকা বের হয় না।",
        opt_bio_7_77_c: "ঝিল্লি পাতলা হলে ব্যাপন ত্বরান্বিত হয়, বন্ধ হয় না।",
        opt_bio_7_77_d: "ঝিল্লি পাতলা হলে ফুসফুস হালকা ও স্থিতিস্থাপক থাকে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 168
      },
      proTipShortcut: "পাতলা ঝিল্লি = সুপার ফাস্ট ব্যাপন।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_78",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "১০০ মিলিলিটার সুস্থ ধমনি রক্তে স্বাভাবিক হিমোগ্লোবিন সর্বোচ্চ প্রায় কতটুকু অক্সিজেন বহন করতে পারে?",
    options: [
      {
        id: "opt_bio_7_78_a",
        text: "২ মিলিলিটার",
        isCorrect: false
      },
      {
        id: "opt_bio_7_78_b",
        text: "১৯–২০ মিলিলিটার",
        isCorrect: true
      },
      {
        id: "opt_bio_7_78_c",
        text: "৫০ মিলিলিটার",
        isCorrect: false
      },
      {
        id: "opt_bio_7_78_d",
        text: "১০০ মিলিলিটার",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ১৯–২০ মিলিলিটার।",
      coreConcept: "১০০ মিলি রক্তে প্রায় ১৫ গ্রাম হিমোগ্লোবিন থাকে। প্রতি গ্রাম হিমোগ্লোবিন ১.৩৪ মিলি $O_2$ বাঁধে, ফলে মোট প্রায় ১৯–২০ মিলি অক্সিজেন পরিবাহিত হয়।",
      distractorAnalysis: {
        opt_bio_7_78_a: "২ মিলি হলো ভৌত দ্রবণের সামান্য অংশ।",
        opt_bio_7_78_c: "৫০ মিলি স্বাভাবিক রক্তের ক্ষমতার বাইরে।",
        opt_bio_7_78_d: "১০০ মিলি রক্তে ১০০ মিলি গ্যাস থাকা শারীরবৃত্তীয়ভাবে অসম্ভব।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 169
      },
      proTipShortcut: "১০০ মিলি রক্ত $\\approx$ ২০ মিলি $O_2$ বাহক।"
    },
    difficulty: "HARD",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_79",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "টিস্যু কোষে গিয়ে অক্সিহিমোগ্লোবিন বিয়োজিত হয়ে মুক্ত অক্সিজেন ত্যাগ করার মূল উদ্দীপক কোনটি?",
    options: [
      {
        id: "opt_bio_7_79_a",
        text: "কোষে অক্সিজেনের নিম্ন আংশিক চাপ ($pO_2$) এবং উচ্চ কার্বন ডাই-অক্সাইড ঘনত্ব",
        isCorrect: true
      },
      {
        id: "opt_bio_7_79_b",
        text: "কোষের অতিরিক্ত শীতল তাপমাত্রা",
        isCorrect: false
      },
      {
        id: "opt_bio_7_79_c",
        text: "কোষে রক্ত প্রবাহ বন্ধ হওয়া",
        isCorrect: false
      },
      {
        id: "opt_bio_7_79_d",
        text: "কোষে পানি না থাকা",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কোষে অক্সিজেনের নিম্ন আংশিক চাপ ($pO_2$) এবং উচ্চ কার্বন ডাই-অক্সাইড ঘনত্ব।",
      coreConcept: "কোষে বিপাকের কারণে $pO_2$ খুব কম ($\u0007pprox 40\\text{ mmHg}$) এবং $pCO_2$ বেশি ($\u0007pprox 45\\text{ mmHg}$) থাকে, ফলে অক্সিহিমোগ্লোবিন ভেঙে গিয়ে কোষে অক্সিজেন ছেড়ে দেয়।",
      distractorAnalysis: {
        opt_bio_7_79_b: "তাপমাত্রা বৃদ্ধি বরং অক্সিজেন ছাড়তে সাহায্য করে।",
        opt_bio_7_79_c: "রক্ত প্রবাহ সচল থাকে।",
        opt_bio_7_79_d: "কোষ সর্বদা জলীয় মাধ্যমে সক্রিয় থাকে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 169
      },
      proTipShortcut: "কোষে কম $pO_2$ → অক্সিহিমোগ্লোবিন বিয়োজন → অক্সিজেন সরবরাহ।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_80",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "ফুসফুসের রক্তে পৌঁছানোর পর বাইকার্বনেট লবণ থেকে কীভাবে $CO_2$ গ্যাস মুক্ত হয়?",
    options: [
      {
        id: "opt_bio_7_80_a",
        text: "কার্বনিক অ্যানহাইড্রেজের প্রভাবে বিপরীতমুখী বিক্রিয়ায় কার্বনিক এসিড ভেঙে $CO_2$ ও পানিতে পরিণত হয়",
        isCorrect: true
      },
      {
        id: "opt_bio_7_80_b",
        text: "রক্ত জমাট বেঁধে যায়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_80_c",
        text: "সোডিয়াম আয়ন ধ্বংস হয়ে যায়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_80_d",
        text: "হিমোগ্লোবিন অ্যাসিডে পুড়ে যায়",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কার্বনিক অ্যানহাইড্রেজের প্রভাবে বিপরীতমুখী বিক্রিয়ায় কার্বনিক এসিড ভেঙে $CO_2$ ও পানিতে পরিণত হয়।",
      coreConcept: "ফুসফুসে $pCO_2$ কম থাকায় $H^+ + HCO_3^- \\rightleftharpoons H_2CO_3 \\rightleftharpoons H_2O + CO_2$ বিক্রিয়াটি বাম থেকে ডানে ঘটে এবং মুক্ত $CO_2$ অ্যালভিওলাসে ব্যাপিত হয়।",
      distractorAnalysis: {
        opt_bio_7_80_b: "রক্ত জমাট বাঁধলে ফুসফুসীয় এমবোলিজম হয়ে রোগী মারা যাবে।",
        opt_bio_7_80_c: "সোডিয়াম আয়ন মুক্ত হয়ে বাফার হিসেবে রক্তে থাকে।",
        opt_bio_7_80_d: "হিমোগ্লোবিন স্বাভাবিক থাকে ও পুনরায় $O_2$ বাঁধে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 169
      },
      proTipShortcut: "ফুসফুসে: বাইকার্বনেট → $H_2CO_3$ → $CO_2$ (নিঃশ্বাসে ত্যাগ)।"
    },
    difficulty: "HARD",
    boardSource: "ক্যাডেট কলেজ",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_81",
    topicId: "top_ssc_biology_ch7_5",
    type: "MCQ",
    stem: "হাঁপানি (Asthma) রোগীর তাৎক্ষণিক তীব্র শ্বাসকষ্ট দূর করতে ব্যবহৃত ইনহেলারে কোন ধরনের ওষুধ থাকে?",
    options: [
      {
        id: "opt_bio_7_81_a",
        text: "ব্রঙ্কোডাইলেটর (যা সংকুচিত শ্বাসনালির মসৃণ পেশিকে শিথিল করে পথ প্রশস্ত করে)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_81_b",
        text: "উচ্চমাত্রার ঘুমের ওষুধ",
        isCorrect: false
      },
      {
        id: "opt_bio_7_81_c",
        text: "অ্যান্টিবায়োটিক পাউডার",
        isCorrect: false
      },
      {
        id: "opt_bio_7_81_d",
        text: "প্যারাসিটামল দ্রবণ",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ব্রঙ্কোডাইলেটর।",
      coreConcept: "ইনহেলারের ব্রঙ্কোডাইলেটর ওষুধ (যেমন সালবিউটামল) সরাসরি ফুসফুসে পৌঁছে কয়েক মিনিটের মধ্যে স্প্যাজম হওয়া পেশিকে প্রসারিত করে শ্বাসপ্রশ্বাস স্বাভাবিক করে।",
      distractorAnalysis: {
        opt_bio_7_81_b: "ঘুমের ওষুধ শ্বাসকেন্দ্রকে আরও নিস্তেজ করে মৃত্যুঝুঁকি বাড়াবে।",
        opt_bio_7_81_c: "অ্যান্টিবায়োটিক অ্যালার্জি চিকিৎসায় কাজ করে না।",
        opt_bio_7_81_d: "প্যারাসিটামল জ্বর ও ব্যথা কমায়, শ্বাসনালি খোলে না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 170
      },
      proTipShortcut: "ইনহেলার = ব্রঙ্কোডাইলেটর (শ্বাসনালি প্রসারক)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_82",
    topicId: "top_ssc_biology_ch7_5",
    type: "MCQ",
    stem: "নিচের কোন রোগটি বায়ুবাহিত ড্রপলেটের মাধ্যমে সরাসরি এক ব্যক্তি থেকে অন্য ব্যক্তিতে সংক্রমিত হতে পারে?",
    options: [
      {
        id: "opt_bio_7_82_a",
        text: "হাঁপানি বা অ্যাজমা",
        isCorrect: false
      },
      {
        id: "opt_bio_7_82_b",
        text: "যক্ষ্মা (Tuberculosis)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_82_c",
        text: "ফুসফুসের ক্যান্সার",
        isCorrect: false
      },
      {
        id: "opt_bio_7_82_d",
        text: "ধূমপানজনিত কাশি",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: যক্ষ্মা (Tuberculosis)।",
      coreConcept: "যক্ষ্মা একটি অত্যন্ত সংক্রামক ব্যাকটেরিয়াজনিত রোগ। রোগীর হাঁচি, কাশি বা থুতুর ড্রপলেট বাতাসে ভেসে অন্য ব্যক্তির শ্বাসনালিতে গিয়ে আক্রমণ করে।",
      distractorAnalysis: {
        opt_bio_7_82_a: "হাঁপানি সংক্রামক নয়, অ্যালার্জিজনিত।",
        opt_bio_7_82_c: "ক্যান্সার কোনো ছোঁয়াচে বা জীবাণুঘটিত রোগ নয়।",
        opt_bio_7_82_d: "ধূমপায়ী কাশি ব্যক্তিগত বদভ্যাসের ফল।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 173
      },
      proTipShortcut: "যক্ষ্মা = বায়ুবাহিত সংক্রামক ব্যাকটেরিয়া।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_83",
    topicId: "top_ssc_biology_ch7_5",
    type: "MCQ",
    stem: "ফুসফুসের ক্যান্সারের প্রাথমিক নির্ণয় ও শনাক্তকরণে কোন পরীক্ষাটি সর্বাধিক প্রচলিত?",
    options: [
      {
        id: "opt_bio_7_83_a",
        text: "বুকের এক্স-রে ও সিটি স্ক্যান",
        isCorrect: true
      },
      {
        id: "opt_bio_7_83_b",
        text: "রক্তের গ্লুকোজ পরীক্ষা",
        isCorrect: false
      },
      {
        id: "opt_bio_7_83_c",
        text: "ইসিজি (ECG)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_83_d",
        text: "মূত্রের রুটিন পরীক্ষা",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বুকের এক্স-রে ও সিটি স্ক্যান।",
      coreConcept: "বুকের এক্স-রে ও কম্পিউটেড টমোগ্রাফি (CT Scan) এর মাধ্যমে ফুসফুসে অনিয়ন্ত্রিত টিউমার বা লিশন শনাক্ত করা হয়। বায়োপসি করে ম্যালিগন্যান্সি নিশ্চিত করা হয়।",
      distractorAnalysis: {
        opt_bio_7_83_b: "রক্তের গ্লুকোজ ডায়াবেটিসের পরীক্ষা।",
        opt_bio_7_83_c: "ইসিজি হৃদপিণ্ডের বৈদ্যুতিক তরঙ্গের পরীক্ষা।",
        opt_bio_7_83_d: "মূত্র পরীক্ষা বৃক্কের কার্যকারিতা দেখে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 174
      },
      proTipShortcut: "ফুসফুসের টিউমার নির্ণয় = বুকের এক্স-রে ও সিটি স্ক্যান।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_84",
    topicId: "top_ssc_biology_ch7_5",
    type: "MCQ",
    stem: "শিশুদের যক্ষ্মা প্রতিরোধে বিসিজি (BCG) টিকা শরীরের কোন অংশে প্রয়োগ করা হয়?",
    options: [
      {
        id: "opt_bio_7_84_a",
        text: "বাম বাহুর উপরিভাগের চামড়ায় (ইন্ট্রাডার্মাল)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_84_b",
        text: "মুখে খাওয়ার তরল হিসেবে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_84_c",
        text: "পায়ের গোড়ালির মাংসে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_84_d",
        text: "পেটের ত্বকের নিচে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বাম বাহুর উপরিভাগের চামড়ায় (ইন্ট্রাডার্মাল)।",
      coreConcept: "বিসিজি টিকা জন্মের পর নবজাতকের বাম বাহুর উপরিভাগের চামড়ার মধ্যে (Intradermal) দেওয়া হয়। কয়েক সপ্তাহ পর সেখানে একটি ছোট দাগ বা ক্ষত চিহ্ন সৃষ্টি হয় যা স্থায়ী থাকে।",
      distractorAnalysis: {
        opt_bio_7_84_b: "মুখে খাওয়ার টিকা হলো পোলিও ও রোটাভাইরাস।",
        opt_bio_7_84_c: "পায়ের মাংসে বিসিজি দেওয়া হয় না।",
        opt_bio_7_84_d: "পেটের ত্বকে রেবিস বা ইনসুলিন দেওয়া হতে পারে, বিসিজি নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 173
      },
      proTipShortcut: "বিসিজি টিকা = বাম বাহুর চামড়ায়।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_85",
    topicId: "top_ssc_biology_ch7_1",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞানীগণ লক্ষ্য করলেন মরুজ উদ্ভিদে দিনের বেলা প্রস্বেদন কমাতে পত্ররন্ধ্র গহ্বরের গভীরে নিমজ্জিত থাকে এবং রাতের বেলায় গ্যাসীয় বিনিময় সম্পন্ন হয়। অপরদিকে জলজ পদ্ম বা শাপলা গাছের পাতার কেবল উপরিভাগে পত্ররন্ধ্র থাকে এবং নিম্নত্বকে কোনো রন্ধ্র থাকে না।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকটিতে বিভিন্ন পরিবেশীয় অভিযোজনের সাপেক্ষে উদ্ভিদের পত্ররন্ধ্রের অবস্থান ও গ্যাসীয় বিনিময়ের কৌশল নির্দেশ করা হয়েছে।",
      coreConcept: "মরুজ উদ্ভিদ (নিমজ্জিত রন্ধ্র) বনাম জলজ উদ্ভিদে পত্ররন্ধ্রের গঠন ও অভিযোজন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "রক্ষীকোষে উপস্থিত প্রধান প্লাস্টিডের নাম কী তা লেখা (ক্লোরোপ্লাস্ট)।"
      },
      kha: {
        mark: 2,
        criteria: "কচি কাণ্ড বনাম পরিণত কাষ্ঠল কাণ্ডের গ্যাসীয় বিনিময়ের পার্থক্যের কারণ ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "মরুজ উদ্ভিদে নিমজ্জিত পত্ররন্ধ্র কীভাবে পানি সংরক্ষণ ও গ্যাসীয় বিনিময়ের ভারসাম্য রক্ষা করে তা ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "জলজ ভাসমান পাতায় কেবল উপরিভাগে পত্ররন্ধ্র থাকার পরিবেশীয় উপযোগিতা বিশ্লেষণ করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_86",
    topicId: "top_ssc_biology_ch7_2",
    type: "CQ_CREATIVE",
    stem: "একটি সড়ক দুর্ঘটনায় মারাত্মক আহত এক ব্যক্তির গলায় তীব্র আঘাত লাগায় তার স্বরতন্ত্রী (ভোকাল কর্ড) ক্ষতিগ্রস্ত হয় এবং তিনি আর কথা বলতে পারছিলেন না। ডাক্তার জানালেন তার শ্বাসনালির উপরিভাগের তরুণাস্থি বক্সটি ক্ষতিগ্রস্ত হলেও ভাগ্যক্রমে নিচের C-আকৃতির তরুণাস্থিময় নালিটি অক্ষত থাকায় ফুসফুসে বাতাস চলাচল বন্ধ হয়নি।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে স্বরযন্ত্র (ল্যারিংস), ভোকাল কর্ডের ভূমিকা এবং ট্রাকিয়ার C-রিংয়ের গঠন ও গুরুত্ব আলোচিত হয়েছে।",
      coreConcept: "স্বরযন্ত্রে ধ্বনি উৎপাদন মেকানিক্স এবং শ্বাসনালির গঠনগত দৃঢ়তা ও সুরক্ষা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 162
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "স্বরযন্ত্র বা ল্যারিংসের প্রধান তরুণাস্থিময় অংশের নাম কী তা লেখা।"
      },
      kha: {
        mark: 2,
        criteria: "ভোকাল কর্ড কীভাবে শব্দ বা স্বর উৎপন্ন করে তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "আহত ব্যক্তির শ্বাসনালি অক্ষত থেকে কীভাবে তার জীবন রক্ষা করল তা তরুণাস্থি বলয়ের বৈশিষ্ট্যের আলোকে ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "মানব শ্বসনতন্ত্রে নাসারন্ধ্র থেকে ব্রঙ্কাস পর্যন্ত বায়ুপথের ফিল্টারিং ও প্রতিরক্ষামূলক কৌশল বিশ্লেষণ করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_87",
    topicId: "top_ssc_biology_ch7_3",
    type: "CQ_CREATIVE",
    stem: "একটি মেডিকেল জরুরি মহড়ায় দেখানো হলো—বিদ্যুৎস্পৃষ্ট হয়ে শ্বাসক্রিয়া বন্ধ হয়ে যাওয়া এক রোগীকে অবিলম্বে মেঝেতে চিৎ করে শুইয়ে বুকের মাঝখানে নির্দিষ্ট ছন্দে চাপ দেওয়া হচ্ছে (কার্ডিয়াক কম্প্রেশন) এবং মুখে মুখ লাগিয়ে ফু দিয়ে বাতাস দেওয়া হচ্ছে। দুই মিনিট পর রোগীর ডায়াফ্রাম স্বতঃস্ফূর্তভাবে ওঠানামা শুরু করে এবং তিনি স্বাভাবিক শ্বাস ফিরে পান।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকটিতে কৃত্রিম শ্বাসপ্রশ্বাস (CPR) এবং শ্বাসক্রিয়া পুনরুদ্ধারে ডায়াফ্রামের কার্যপদ্ধতি নির্দেশ করা হয়েছে।",
      coreConcept: "শ্বাসক্রিয়া মেকানিক্স, বক্ষগহ্বরের কৃত্রিম চাপ সৃষ্টি এবং মস্তিষ্কের মেডুলা অবলংগাটার ভূমিকা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 166
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "ডায়াফ্রাম কী তা সংজ্ঞায়িত করা (বক্ষ ও উদরগহ্বরের বিভাজক পেশিময় পর্দা)।"
      },
      kha: {
        mark: 2,
        criteria: "মানুষের নিঃশ্বাসের বাতাসে কেন যথেষ্ট অক্সিজেন (১৬%) থাকে তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "মুখে ফু দিয়ে বাতাস প্রবেশ করানোর সময় রোগীর বক্ষগহ্বর ও ফুসফুসে কী ধরনের মেকানিক্স ঘটে তা ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "স্বাভাবিক শ্বাসক্রিয়া পুনরায় চালু করতে ডায়াফ্রাম ও রক্তে গ্যাসের আংশিক চাপের প্রভাব মূল্যায়ন করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_88",
    topicId: "top_ssc_biology_ch7_4",
    type: "CQ_CREATIVE",
    stem: "রক্ত পরীক্ষার রিপোর্টে দেখা গেল আনিস সাহেবের হিমোগ্লোবিনের মাত্রা মাত্র ৭ g/dL (স্বাভাবিক মান ১৩–১৫ g/dL)। তিনি সামান্য হাঁটাহাঁটি করলেই চরম ক্লান্ত হয়ে পড়েন এবং ঘন ঘন দীর্ঘশ্বাস নিতে থাকেন। ডাক্তার তাকে আয়রন সমৃদ্ধ খাদ্য এবং চিকিৎসা ব্যবস্থাপত্র দিয়ে বললেন, “হিমোগ্লোবিন কমে যাওয়ায় আপনার কোষগুলোতে প্রয়োজনীয় জ্বালানি পুড়তে পারছে না।”",
    options: null,
    explanation: {
      directAnswer: "আনিস সাহেব রক্তশূন্যতা বা অ্যানিমিয়ায় ভুগছেন, যা তার রক্তের অক্সিজেন পরিবহন ক্ষমতা মারাত্মক হ্রাস করেছে।",
      coreConcept: "অক্সিজেন পরিবহনে হিমোগ্লোবিনের অপরিহার্যতা, অক্সিহিমোগ্লোবিন গঠন এবং শারীরিক ক্লান্তি।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 169
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "অক্সিহিমোগ্লোবিনের রাসায়নিক সমীকরণটি লেখ ($Hb + 4O_2 \\rightleftharpoons Hb(O_2)_4$)।"
      },
      kha: {
        mark: 2,
        criteria: "রক্তে কার্বামিনো-প্রোটিন কীভাবে গঠিত হয় তা সমীকরণসহ ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "আনিস সাহেবের ঘন ঘন দীর্ঘশ্বাস নেওয়া এবং দ্রুত ক্লান্ত হওয়ার শারীরবৃত্তীয় কারণ হিমোগ্লোবিনের কাজের ভিত্তিতে ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "মানবদেহে কার্বন ডাই-অক্সাইড পরিবহনে লোহিত কণিকা ও রক্তরসের সম্মিলিত ভূমিকা সমীকরণসহ বিশ্লেষণ করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_89",
    topicId: "top_ssc_biology_ch7_5",
    type: "CQ_CREATIVE",
    stem: "দশম শ্রেণির শিক্ষার্থী সোহেল ফুলের বাগানে বেড়াতে গিয়ে পরাগরেণুর সংস্পর্শে আসামাত্রই তার তীব্র কাশি ও শ্বাসকষ্ট শুরু হলো। তার বুক থেকে বাঁশির মতো সাঁই সাঁই শব্দ হচ্ছিল এবং সে বসে সামনের দিকে ঝুঁকে শ্বাস নিতে বাধ্য হলো। সহপাঠী দ্রুত তার পকেট থেকে ইনহেলার বের করে দিতেই সোহেল মুখে দুটি পাফ নিল এবং কিছুক্ষণ পর তার শ্বাসপ্রশ্বাস স্বাভাবিক হলো।",
    options: null,
    explanation: {
      directAnswer: "সোহেল হাঁপানি বা অ্যাজমা (Asthma) রোগে আক্রান্ত এবং ইনহেলারটি ছিল একটি ব্রঙ্কোডাইলেটর।",
      coreConcept: "হাঁপানি রোগের কারণ (অ্যালার্জেন), লক্ষণ (বাঁশির শব্দ/হুইজিং), ইনহেলারের কার্যকারিতা ও সচেতনতা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 170
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "অ্যালার্জেন কাকে বলে তা এক বাক্যে লেখা (অ্যালার্জি সৃষ্টিকারী বস্তু)।"
      },
      kha: {
        mark: 2,
        criteria: "হাঁপানি রোগীকে ধূলিবালি ও পরাগরেণু এড়িয়ে চলতে বলা হয় কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "সোহেলের শ্বাসকষ্টের সময় শ্বাসনালির অভ্যন্তরে কী পরিবর্তন ঘটেছিল তা প্যাথলজির আলোকে ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "ইনহেলারের ব্রঙ্কোডাইলেটর কীভাবে সোহেলকে তাৎক্ষণিক উপশম দিল এবং এ রোগের দীর্ঘমেয়াদী প্রতিরোধ ব্যবস্থা মূল্যায়ন করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_90",
    topicId: "top_ssc_biology_ch7_5",
    type: "CQ_CREATIVE",
    stem: "হাসপাতালের বক্ষব্যাধি বিভাগে দুজন রোগী ভর্তি হলেন:<br>রোগী-১: বয়স ৩৫, গত এক মাস ধরে কাশির সাথে রক্ত পড়ছে, সন্ধ্যায় জ্বর ও রাতে শরীর ঘেমে যায়। কফ পরীক্ষায় এসিড-ফাস্ট ব্যাসিলাস পাওয়া গেছে।<br>রোগী-২: বয়স ৬০, দীর্ঘ ৪০ বছরের ধূমপায়ী, কয়েক মাস ধরে অবিরাম শুকনো কাশি, দ্রুত ১৫ কেজি ওজন কমেছে, কফে রক্ত ও কণ্ঠস্বর কর্কশ। এক্স-রেতে ফুসফুসে ম্যালিগন্যান্ট ছায়া দেখা গেছে।",
    options: null,
    explanation: {
      directAnswer: "রোগী-১ যক্ষ্মা (Tuberculosis) এবং রোগী-২ ফুসফুসের ক্যান্সার (Lung Cancer) রোগে আক্রান্ত।",
      coreConcept: "যক্ষ্মা বনাম ফুসফুসের ক্যান্সারের কারণ, লক্ষণ, ডটস চিকিৎসা পদ্ধতি এবং তামাকের ভয়াবহতা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 173
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "ডটস (DOTS) এর পূর্ণরূপ লেখ (Directly Observed Treatment, Short-course)।"
      },
      kha: {
        mark: 2,
        criteria: "যক্ষ্মা চিকিৎসায় ওষুধের ডোজ মাঝপথে বন্ধ করলে কী মারাত্মক পরিণতি হয় তা ব্যাখ্যা করা (MDR-TB)।"
      },
      ga: {
        mark: 3,
        criteria: "রোগী-১ এর রোগ নির্ণয়, জীবাণুর বৈজ্ঞানিক নাম এবং সরকারের ডটস কর্মসূচির মাধ্যমে নিরাময় কৌশল ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "রোগী-২ এর মারাত্মক ব্যাধির জন্য ধূমপানের দায়বদ্ধতা তামাকের ক্ষতিকর রাসায়নিক উপাদানের আলোকে তুলনামূলক বিশ্লেষণ করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];
