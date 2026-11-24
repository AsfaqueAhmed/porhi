import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter7QuestionsBatch1: QuestionData[] = [
  {
    id: "q_bio_7_01",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "কাষ্ঠল উদ্ভিদের বাকলে কর্ক ক্যাম্বিয়াম ফেটে যে বিশেষ লেন্স-আকৃতির রন্ধ্র সৃষ্টি হয় তাকে কী বলে?",
    options: [
      {
        id: "opt_bio_7_01_a",
        text: "পত্ররন্ধ্র (Stomata)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_01_b",
        text: "লেন্টিসেল (Lenticels)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_01_c",
        text: "হাইডাথোড (Hydathode)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_01_d",
        text: "কিউটিকল (Cuticle)",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: লেন্টিসেল।",
      coreConcept: "উদ্ভিদের কাণ্ডের গৌণ বৃদ্ধির সময় কর্ক ক্যাম্বিয়ামের কার্যকারিতায় বাকল ফেটে লেন্স আকৃতির রন্ধ্র সৃষ্টি হয়, যাকে লেন্টিসেল বলে।",
      distractorAnalysis: {
        opt_bio_7_01_a: "পত্ররন্ধ্র প্রধানত পাতার ত্বকে দুটি রক্ষীকোষ দ্বারা গঠিত হয়।",
        opt_bio_7_01_c: "হাইডাথোড হলো তরল পানি নির্গমনকারী পানি-পত্ররন্ধ্র।",
        opt_bio_7_01_d: "কিউটিকল হলো এপিডার্মিসের ওপর মোমের মতো কিউটিনের অবিচ্ছিন্ন স্তর।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "মনে রাখো: কাণ্ডের বাকল ফেটে লেন্সের মতো রন্ধ্র = লেন্টিসেল।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_02",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "পত্ররন্ধ্র উন্মুক্ত হওয়ার মূল শারীরবৃত্তীয় কারণ কোনটি?",
    options: [
      {
        id: "opt_bio_7_02_a",
        text: "রক্ষীকোষে পানি প্রবেশ করে স্ফীত (Turgid) হওয়া",
        isCorrect: true
      },
      {
        id: "opt_bio_7_02_b",
        text: "রক্ষীকোষ থেকে পানি নির্গত হয়ে শিথিল (Flaccid) হওয়া",
        isCorrect: false
      },
      {
        id: "opt_bio_7_02_c",
        text: "ক্লোরোপ্লাস্টের কার্যকারিতা নষ্ট হওয়া",
        isCorrect: false
      },
      {
        id: "opt_bio_7_02_d",
        text: "রক্ষীকোষের ভেতরের প্রাচীর প্রসারিত হওয়া",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: রক্ষীকোষে পানি প্রবেশ করে স্ফীত হওয়া।",
      coreConcept: "দিনের বেলা দ্রাব্য শর্করার ফলে রক্ষীকোষে পানি প্রবেশ করে, কোষ স্ফীত হয় এবং বাইরের পাতলা প্রাচীর প্রসারিত হলে ভেতরের পুরু প্রাচীরকে টেনে রন্ধ্র খুলে দেয়।",
      distractorAnalysis: {
        opt_bio_7_02_b: "পানি নির্গত হয়ে শিথিল হলে পত্ররন্ধ্র বন্ধ হয়ে যায়।",
        opt_bio_7_02_c: "ক্লোরোপ্লাস্টের সালোকসংশ্লেষণেই চিনি তৈরি হয়ে রন্ধ্র খোলে।",
        opt_bio_7_02_d: "রক্ষীকোষের ভেতরের প্রাচীর পুরু ও অনমনীয়, বাইরের পাতলা প্রাচীর প্রসারিত হয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "স্ফীতি = রন্ধ্র খোলা, শিথিলতা = রন্ধ্র বন্ধ।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_03",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "দিনের বেলা সবুজ উদ্ভিদে সার্বিকভাবে $CO_2$ শোষণ এবং $O_2$ নির্গমন ঘটে কেন?",
    options: [
      {
        id: "opt_bio_7_03_a",
        text: "দিনের বেলা উদ্ভিদের শ্বসন প্রক্রিয়া সম্পূর্ণ বন্ধ থাকে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_03_b",
        text: "দিনের বেলা সালোকসংশ্লেষণের হার শ্বসনের হারের চেয়ে অনেক বেশি থাকে",
        isCorrect: true
      },
      {
        id: "opt_bio_7_03_c",
        text: "দিনের বেলা কেবল প্রস্বেদন ঘটে কিন্তু কোনো গ্যাস বিনিময় হয় না",
        isCorrect: false
      },
      {
        id: "opt_bio_7_03_d",
        text: "রক্ষীকোষে কেবল অক্সিজেন গ্যাস তৈরি হয়",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: দিনের বেলা সালোকসংশ্লেষণের হার শ্বসনের হারের চেয়ে অনেক বেশি থাকে।",
      coreConcept: "শ্বসন ২৪ ঘণ্টাই চলে। তবে দিনের আলোতে সালোকসংশ্লেষণের হার অনেক বেশি হওয়ায় শ্বসনে উৎপন্ন $CO_2$ নিজেই খরচ হয় এবং পরিবেশ থেকেও অতিরিক্ত $CO_2$ শোষিত হয়।",
      distractorAnalysis: {
        opt_bio_7_03_a: "শ্বসন কখনোই বন্ধ থাকে না, তা সজীব কোষে অবিরাম দিন-রাত চলে।",
        opt_bio_7_03_c: "দিনের বেলায় সবচেয়ে দ্রুত গ্যাসীয় বিনিময় ঘটে।",
        opt_bio_7_03_d: "ক্লোরোপ্লাস্টে খাদ্য তৈরির উপজাত হিসেবে $O_2$ নির্গত হয়, কেবল রক্ষীকোষে নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "দিনের বেলা: সালোকসংশ্লেষণ > শ্বসন।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_04",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "পত্ররন্ধ্রের রক্ষীকোষের গঠনগত বৈশিষ্ট্য কোনটি?",
    options: [
      {
        id: "opt_bio_7_04_a",
        text: "কোনো ক্লোরোপ্লাস্ট বা স্পষ্ট নিউক্লিয়াস থাকে না",
        isCorrect: false
      },
      {
        id: "opt_bio_7_04_b",
        text: "রন্ধ্রমুখী ভেতরের প্রাচীর পুরু এবং এতে ক্লোরোপ্লাস্ট থাকে",
        isCorrect: true
      },
      {
        id: "opt_bio_7_04_c",
        text: "উভয় প্রাচীর সমভাবে পাতলা ও স্থিতিস্থাপক",
        isCorrect: false
      },
      {
        id: "opt_bio_7_04_d",
        text: "কোষ দুটি চতুর্ভুজাকৃতির মৃত কোষ",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: রন্ধ্রমুখী ভেতরের প্রাচীর পুরু এবং এতে ক্লোরোপ্লাস্ট থাকে।",
      coreConcept: "রক্ষীকোষ দুটি সজীব অর্ধচন্দ্রাকৃতির কোষ যার ভেতরের প্রাচীর পুরু, বাইরের প্রাচীর পাতলা এবং প্রচুর ক্লোরোপ্লাস্ট বিদ্যমান।",
      distractorAnalysis: {
        opt_bio_7_04_a: "সাধারণ ত্বকে ক্লোরোপ্লাস্ট না থাকলেও রক্ষীকোষে সুস্পষ্ট ক্লোরোপ্লাস্ট থাকে।",
        opt_bio_7_04_c: "উভয় প্রাচীর সমান নয়, ভেতরের প্রাচীর পুরু ও বাইরের প্রাচীর পাতলা।",
        opt_bio_7_04_d: "রক্ষীকোষ মৃত নয়, অত্যন্ত সংবেদনশীল সজীব কোষ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "রক্ষীকোষ = অর্ধচন্দ্রাকার, ক্লোরোপ্লাস্টযুক্ত, অসম প্রাচীর।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_05",
    topicId: "top_ssc_biology_ch7_1",
    type: "MCQ",
    stem: "উদ্ভিদদেহে পরিবেশের সাথে গ্যাসীয় বিনিময় কোন ভৌত প্রক্রিয়ায় সম্পন্ন হয়?",
    options: [
      {
        id: "opt_bio_7_05_a",
        text: "অভিস্রবণ (Osmosis)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_05_b",
        text: "ব্যাপন (Diffusion)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_05_c",
        text: "ইমবাইবিশন (Imbibition)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_05_d",
        text: "সক্রিয় শোষণ (Active Absorption)",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ব্যাপন।",
      coreConcept: "উদ্ভিদে শ্বসন অঙ্গ বা রক্ত না থাকায় পরিবেশ ও অন্তঃকোষীয় ফাঁকের ঘনত্বের পার্থক্যের ওপর ভিত্তি করে গ্যাসীয় আদান-প্রদান সম্পূর্ণ ব্যাপন প্রক্রিয়ায় ঘটে।",
      distractorAnalysis: {
        opt_bio_7_05_a: "অভিস্রবণ তরল দ্রাবক পানির বৈষম্যভেদ্য পর্দা ভেদ করে চলাচলের প্রক্রিয়া।",
        opt_bio_7_05_c: "ইমবাইবিশন হলো কলয়েড জাতীয় শুষ্ক পদার্থের তরল শোষণের ভৌত প্রক্রিয়া।",
        opt_bio_7_05_d: "সক্রিয় শোষণ শক্তি ব্যয়ে খনিজ লবণ পরিশোষণ প্রক্রিয়া।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
      proTipShortcut: "গ্যাস বিনিময় মানেই ব্যাপন (ঘনত্বের পার্থক্য)।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_06",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "খাদ্য গ্রহণের সময় স্বরযন্ত্রের মুখকে ঢেকে শ্বাসনালিতে খাবার প্রবেশ রোধ করে কোন অঙ্গাণুটি?",
    options: [
      {
        id: "opt_bio_7_06_a",
        text: "ভোকাল কর্ড (Vocal cords)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_06_b",
        text: "স্বরযন্ত্রের ঢাকনা বা এপিগ্লটিস (Epiglottis)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_06_c",
        text: "গলবিল (Pharynx)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_06_d",
        text: "নাসাগলবিল (Nasopharynx)",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: এপিগ্লটিস (Epiglottis)।",
      coreConcept: "স্বরযন্ত্রের উপরিভাগে তরুণাস্থিময় উপজিহ্বা বা এপিগ্লটিস থাকে, যা খাদ্য গিলার সময় স্বরযন্ত্রের মুখ স্বয়ংক্রিয়ভাবে বন্ধ করে দেয়।",
      distractorAnalysis: {
        opt_bio_7_06_a: "ভোকাল কর্ড স্বরযন্ত্রের ভেতরে অবস্থিত শব্দ উৎপাদক পর্দা।",
        opt_bio_7_06_c: "গলবিল হলো মুখ ও খাদ্যনালির সাধারণ সংযোগস্থল।",
        opt_bio_7_06_d: "নাসাগলবিল নাসাপথের পেছনের সংযোগস্থল।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 162
      },
      proTipShortcut: "এপিগ্লটিস = শ্বাসনালির ঢাকনা।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_07",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "মানুষের ট্রাকিয়া বা শ্বাসনালিতে কতটি C-আকৃতির তরুণাস্থি বলয় বিদ্যমান?",
    options: [
      {
        id: "opt_bio_7_07_a",
        text: "১০–১২টি",
        isCorrect: false
      },
      {
        id: "opt_bio_7_07_b",
        text: "১৬–২০টি",
        isCorrect: true
      },
      {
        id: "opt_bio_7_07_c",
        text: "২৪–২৮টি",
        isCorrect: false
      },
      {
        id: "opt_bio_7_07_d",
        text: "৩০–৩২টি",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ১৬–২০টি।",
      coreConcept: "ট্রাকিয়ার প্রাচীরে ১৬ থেকে ২০টি অসম্পূর্ণ C-আকৃতির তরুণাস্থি রিং থাকে যা নালিটিকে কখনোই চুপসে যেতে দেয় না।",
      distractorAnalysis: {
        opt_bio_7_07_a: "১০–১২ সেমি হলো ট্রাকিয়ার দৈর্ঘ্য, বলয়ের সংখ্যা নয়।",
        opt_bio_7_07_c: "২৪–২৮টি কোনো স্বীকৃত শ্বসন তরুণাস্থি সংখ্যা নয়।",
        opt_bio_7_07_d: "মানুষের মেরুদণ্ডে ৩৩টি কশেরুকা থাকে, ট্রাকিয়ায় তরুণাস্থি ১৬–২০টি।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 163
      },
      proTipShortcut: "ট্রাকিয়ার দৈর্ঘ্য ১০-১২ সেমি, বলয় সংখ্যা ১৬-২০টি।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_08",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "মানবদেহের ডান ও বাম ফুসফুসের খণ্ড (Lobes) সংখ্যার ক্ষেত্রে কোনটি সঠিক?",
    options: [
      {
        id: "opt_bio_7_08_a",
        text: "ডান ফুসফুসে ২টি এবং বাম ফুসফুসে ৩টি খণ্ড",
        isCorrect: false
      },
      {
        id: "opt_bio_7_08_b",
        text: "ডান ফুসফুসে ৩টি এবং বাম ফুসফুসে ২টি খণ্ড",
        isCorrect: true
      },
      {
        id: "opt_bio_7_08_c",
        text: "উভয় ফুসফুসেই ৩টি করে খণ্ড",
        isCorrect: false
      },
      {
        id: "opt_bio_7_08_d",
        text: "উভয় ফুসফুসেই ২টি করে খণ্ড",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ডান ফুসফুসে ৩টি এবং বাম ফুসফুসে ২টি খণ্ড।",
      coreConcept: "হৃদপিণ্ড বুকের মাঝখান থেকে সামান্য বাম দিকে অবস্থিত হওয়ায় বাম ফুসফুসটি কিছুটা ছোট এবং ২টি খণ্ডে বিভক্ত, অপরপক্ষে ডান ফুসফুস ৩টি খণ্ডে বিভক্ত।",
      distractorAnalysis: {
        opt_bio_7_08_a: "এটি উল্টো; ডান ফুসফুস বড় তাই ৩টি খণ্ড, বামে ২টি খণ্ড।",
        opt_bio_7_08_c: "বাম ফুসফুসে ৩টি খণ্ড থাকার স্থান সংকুলান হয় না।",
        opt_bio_7_08_d: "ডান ফুসফুসে ৩টি স্বতন্ত্র লোব থাকে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 164
      },
      proTipShortcut: "ডানে ৩, বামে ২ (হার্ট বামে থাকে বলে লোব কম)।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_09",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "ফুসফুসকে আবৃত করে রাখা দ্বিস্তরবিশিষ্ট বিশেষ ঝিল্লির নাম কী?",
    options: [
      {
        id: "opt_bio_7_09_a",
        text: "পেরিকার্ডিয়াম",
        isCorrect: false
      },
      {
        id: "opt_bio_7_09_b",
        text: "প্লুরা (Pleura)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_09_c",
        text: "পেরিটোনিয়াম",
        isCorrect: false
      },
      {
        id: "opt_bio_7_09_d",
        text: "মেনিনজেস",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: প্লুরা (Pleura)।",
      coreConcept: "ফুসফুস দ্বিস্তরবিশিষ্ট প্লুরা পর্দা দিয়ে আবৃত থাকে। এর দুই স্তরের মাঝখানের সেরাস তরল ফুসফুসের ঘর্ষণহীন প্রসারণে সহায়তা করে।",
      distractorAnalysis: {
        opt_bio_7_09_a: "পেরিকার্ডিয়াম হৃদপিণ্ডের দ্বিস্তরবিশিষ্ট আবরণী পর্দা।",
        opt_bio_7_09_c: "পেরিটোনিয়াম পরিপাকতন্ত্র ও উদরগহ্বরের অঙ্গসমূহের আবরণী।",
        opt_bio_7_09_d: "মেনিনজেস মস্তিষ্ক ও সুষুম্নাকাণ্ডের সুরক্ষাকারী ঝিল্লি।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 164
      },
      proTipShortcut: "ফুসফুস = প্লুরা, হৃদপিণ্ড = পেরিকার্ডিয়াম।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_10",
    topicId: "top_ssc_biology_ch7_2",
    type: "MCQ",
    stem: "স্বরযন্ত্রের (Larynx) অভ্যন্তরে অবস্থিত কোন কাঠামোর কম্পনের ফলে মানুষের কণ্ঠস্বর সৃষ্টি হয়?",
    options: [
      {
        id: "opt_bio_7_10_a",
        text: "এপিগ্লটিস",
        isCorrect: false
      },
      {
        id: "opt_bio_7_10_b",
        text: "ভোকাল কর্ড (Vocal cords)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_10_c",
        text: "ট্রাকিয়ার সিলিয়া",
        isCorrect: false
      },
      {
        id: "opt_bio_7_10_d",
        text: "ব্রঙ্কাস",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ভোকাল কর্ড (Vocal cords)।",
      coreConcept: "স্বরযন্ত্রের গহ্বরে দুটি স্থিতিস্থাপক পেশিতন্তুর ঝিল্লি থাকে যাদের ভোকাল কর্ড বলে। ফুসফুস থেকে বাতাস বের হওয়ার সময় এদের স্পন্দনে শব্দ সৃষ্টি হয়।",
      distractorAnalysis: {
        opt_bio_7_10_a: "এপিগ্লটিস হলো খাবার গেলার সময় শ্বাসনালি ঢাকবার ঢাকনা।",
        opt_bio_7_10_c: "ট্রাকিয়ার সিলিয়া ধূলিকণা বের করে দেয়, শব্দ তৈরি করে না।",
        opt_bio_7_10_d: "ব্রঙ্কাস শ্বাসনালি থেকে ফুসফুসে বাতাস প্রবেশের শাখা।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 162
      },
      proTipShortcut: "ভোকাল কর্ড = শব্দ তৈরিকারী তারের মতো পর্দা।"
    },
    difficulty: "EASY",
    boardSource: "ক্যাডেট কলেজ",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_11",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "প্রশ্বাস বা শ্বাসগ্রহণের (Inspiration) সময় মধ্যচ্ছদা বা ডায়াফ্রামের পেশির কী পরিবর্তন ঘটে?",
    options: [
      {
        id: "opt_bio_7_11_a",
        text: "পেশি সংকুচিত হয়ে নিচে নামে এবং সমতল হয়",
        isCorrect: true
      },
      {
        id: "opt_bio_7_11_b",
        text: "পেশি শিথিল হয়ে উপরে ওঠে এবং গম্বুজাকার হয়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_11_c",
        text: "পেশি চিরতরে প্রসারিত হয়ে থাকে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_11_d",
        text: "কোনো পরিবর্তন ঘটে না",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পেশি সংকুচিত হয়ে নিচে নামে এবং সমতল হয়।",
      coreConcept: "প্রশ্বাসের সময় ডায়াফ্রাম পেশি সংকুচিত হয়ে নিচে নেমে সমতল হয় এবং বক্ষগহ্বরের দৈর্ঘ্য বৃদ্ধি করে।",
      distractorAnalysis: {
        opt_bio_7_11_b: "পেশি শিথিল হয়ে উপরে উঠে গম্বুজাকার হওয়া নিঃশ্বাসের সময় ঘটে।",
        opt_bio_7_11_c: "ডায়াফ্রাম প্রতি শ্বাসচক্রেই ছন্দময়ভাবে সংকুচিত ও শিথিল হয়।",
        opt_bio_7_11_d: "ডায়াফ্রামের গতিবিধি ছাড়া স্বাভাবিক শ্বাসক্রিয়া সম্ভব নয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 166
      },
      proTipShortcut: "প্রশ্বাস = ডায়াফ্রাম সংকুচিত ও সমতল (নিচে নামা)।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_12",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "প্রশ্বাসের সময় ফুসফুসের অভ্যন্তরীণ বায়ুর চাপের কী ঘটে?",
    options: [
      {
        id: "opt_bio_7_12_a",
        text: "বায়ুমণ্ডলীয় চাপের চেয়ে কমে যায়",
        isCorrect: true
      },
      {
        id: "opt_bio_7_12_b",
        text: "বায়ুমণ্ডলীয় চাপের চেয়ে অত্যধিক বেড়ে যায়",
        isCorrect: false
      },
      {
        id: "opt_bio_7_12_c",
        text: "বায়ুর চাপ শূন্যে নেমে আসে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_12_d",
        text: "চাপ সর্বদা অপরিবর্তিত থাকে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: বায়ুমণ্ডলীয় চাপের চেয়ে কমে যায়।",
      coreConcept: "বক্ষগহ্বর প্রসারিত হলে ফুসফুসের আয়তন বাড়ে, ফলে বয়েলের সূত্রানুযায়ী ফুসফুসের ভেতরে ঋণাত্মক চাপ সৃষ্টি হয় এবং বাইরের উচ্চচাপের বাতাস ফুসফুসে ঢোকে।",
      distractorAnalysis: {
        opt_bio_7_12_b: "চাপ বেড়ে গেলে বাতাস বাইরে বেরিয়ে যেত (যা নিঃশ্বাসে ঘটে)।",
        opt_bio_7_12_c: "চাপ কখনো শূন্য হয় না, সামান্য ঋণাত্মক (-১ থেকে -৩ mmHg) হয়।",
        opt_bio_7_12_d: "চাপের পার্থক্যের কারণেই বাতাস চলাচল করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 166
      },
      proTipShortcut: "আয়তন বৃদ্ধি → চাপ হ্রাস → বাতাস প্রবেশ।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_13",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "স্বাভাবিক সুস্থ প্রাপ্তবয়স্ক মানুষের বিশ্রামে প্রতি মিনিটে শ্বাসক্রিয়ার হার কত?",
    options: [
      {
        id: "opt_bio_7_13_a",
        text: "৮–১০ বার",
        isCorrect: false
      },
      {
        id: "opt_bio_7_13_b",
        text: "১৪–১৮ বার",
        isCorrect: true
      },
      {
        id: "opt_bio_7_13_c",
        text: "২৫–৩০ বার",
        isCorrect: false
      },
      {
        id: "opt_bio_7_13_d",
        text: "৭২–৮০ বার",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ১৪–১৮ বার।",
      coreConcept: "বিশ্রামে প্রাপ্তবয়স্ক সুস্থ ব্যক্তির শ্বাসক্রিয়ার স্বাভাবিক হার প্রতি মিনিটে ১৪ থেকে ১৮ বার। নবজাতক বা শিশুদের ক্ষেত্রে এ হার বেশি থাকে।",
      distractorAnalysis: {
        opt_bio_7_13_a: "৮–১০ বার অত্যন্ত ধীরগতির অস্বাভাবিক শ্বসন (Bradypnea)।",
        opt_bio_7_13_c: "২৫–৩০ বার তীব্র পরিশ্রম বা জ্বরের সময় শ্বাসক্রিয়ার হার।",
        opt_bio_7_13_d: "৭২–৮০ বার হলো প্রতি মিনিটে স্বাভাবিক হৃদস্পন্দনের হার।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 167
      },
      proTipShortcut: "শ্বাসক্রিয়া = ১৪–১৮ বার/মিনিট; হৃদস্পন্দন = ৭২ বার/মিনিট।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_14",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "নিঃশ্বাস বা শ্বাসত্যাগের (Expiration) প্রক্রিয়া সম্পর্কে কোন উক্তিটি বৈজ্ঞানিকভাবে সঠিক?",
    options: [
      {
        id: "opt_bio_7_14_a",
        text: "এটি একটি সক্রিয় শক্তি ব্যয়কারী প্রক্রিয়া",
        isCorrect: false
      },
      {
        id: "opt_bio_7_14_b",
        text: "ইন্টারকোস্টাল পেশি তীব্র সংকুচিত হয়ে পাঁজরাস্থিকে উপরে তোলে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_14_c",
        text: "ডায়াফ্রাম পেশি শিথিল হয়ে পুনরায় গম্বুজাকৃতি ধারণ করে",
        isCorrect: true
      },
      {
        id: "opt_bio_7_14_d",
        text: "বক্ষগহ্বরের অভ্যন্তরীণ আয়তন বহুগুণ বৃদ্ধি পায়",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ডায়াফ্রাম পেশি শিথিল হয়ে পুনরায় গম্বুজাকৃতি ধারণ করে।",
      coreConcept: "স্বাভাবিক নিঃশ্বাস একটি নিষ্ক্রিয় প্রক্রিয়া। ডায়াফ্রাম ও ইন্টারকোস্টাল পেশি শিথিল হওয়ায় বক্ষপিঞ্জর নেমে আসে ও ফুসফুসের বাতাস বাইরে বেরিয়ে যায়।",
      distractorAnalysis: {
        opt_bio_7_14_a: "স্বাভাবিক নিঃশ্বাস নিষ্ক্রিয়, শক্তি খরচ হয় না।",
        opt_bio_7_14_b: "ইন্টারকোস্টাল পেশির সংকোচন প্রশ্বাসে ঘটে।",
        opt_bio_7_14_d: "নিঃশ্বাসে বক্ষগহ্বরের আয়তন হ্রাস পায়, বৃদ্ধি পায় না।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 167
      },
      proTipShortcut: "নিঃশ্বাস = পেশি শিথিল + গম্বুজাকার ডায়াফ্রাম।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_15",
    topicId: "top_ssc_biology_ch7_3",
    type: "MCQ",
    stem: "শ্বাসক্রিয়ার স্বয়ংক্রিয় নিয়ন্ত্রণ কেন্দ্র মস্তিষ্কের কোন অংশে অবস্থিত?",
    options: [
      {
        id: "opt_bio_7_15_a",
        text: "সেরিব্রাম (Cerebrum)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_15_b",
        text: "মেডুলা অবলংগাটা (Medulla oblongata)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_15_c",
        text: "সেরিবেলাম (Cerebellum)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_15_d",
        text: "থ্যালামাস (Thalamus)",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মেডুলা অবলংগাটা।",
      coreConcept: "মস্তিষ্কের পশ্চাৎ অংশে অবস্থিত মেডুলা অবলংগাটাতে শ্বসন নিয়ন্ত্রক স্নায়ুকেন্দ্র থাকে যা রক্তে কার্বন ডাই-অক্সাইডের ঘনত্বের ওপর নির্ভর করে শ্বাস ছন্দ পরিচালনা করে।",
      distractorAnalysis: {
        opt_bio_7_15_a: "সেরিব্রাম স্মৃতি, চিন্তা ও ঐচ্ছিক কাজ নিয়ন্ত্রণ করে।",
        opt_bio_7_15_c: "সেরিবেলাম দেহের পেশির টান ও ভারসাম্য রক্ষা করে।",
        opt_bio_7_15_d: "থ্যালামাস সংবেদী সংকেতের রিলে স্টেশন হিসেবে কাজ করে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 167
      },
      proTipShortcut: "শ্বসন কেন্দ্র = মেডুলা অবলংগাটা।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_16",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "ফুসফুসের অ্যালভিওলাসের পাতলা প্রাচীর কোন ধরনের এপিথেলিয়াল টিস্যু দ্বারা গঠিত?",
    options: [
      {
        id: "opt_bio_7_16_a",
        text: "স্তম্ভাকার এপিথেলিয়াম (Columnar)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_16_b",
        text: "একস্তরবিশিষ্ট আইশাকার বা স্কোয়ামাস এপিথেলিয়াম (Squamous)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_16_c",
        text: "ঘনকাকার এপিথেলিয়াম (Cuboidal)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_16_d",
        text: "স্তরীভূত এপিথেলিয়াম (Stratified)",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: একস্তরবিশিষ্ট আইশাকার বা স্কোয়ামাস এপিথেলিয়াম।",
      coreConcept: "অ্যালভিওলাসের প্রাচীর অত্যন্ত পাতলা একস্তর চ্যাপ্টা স্কোয়ামাস কোষ দিয়ে তৈরি, যা দ্রুত গ্যাসীয় ব্যাপন ঘটাতে কার্যকর শ্বসন ঝিল্লি গঠন করে।",
      distractorAnalysis: {
        opt_bio_7_16_a: "স্তম্ভাকার এপিথেলিয়াম অন্ত্রের প্রাচীরে ক্ষরণ ও শোষণে থাকে।",
        opt_bio_7_16_c: "ঘনকাকার এপিথেলিয়াম বৃক্কের সংগ্রাহক নালিকায় থাকে।",
        opt_bio_7_16_d: "স্তরীভূত এপিথেলিয়াম ত্বকের উপরিভাগে প্রতিরক্ষায় থাকে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 168
      },
      proTipShortcut: "অ্যালভিওলাস ও বোম্যান্স ক্যাপসুল = স্কোয়ামাস (আইশাকার)।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_17",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "রক্তের মাধ্যমে প্রায় ৯৮% অক্সিজেন কোন রূপে পরিবাহিত হয়?",
    options: [
      {
        id: "opt_bio_7_17_a",
        text: "ভৌত দ্রবণ রূপে রক্তরসে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_17_b",
        text: "কার্বামিনো যৌগ রূপে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_17_c",
        text: "অক্সিহিমোগ্লোবিন ($Hb(O_2)_4$) রূপে",
        isCorrect: true
      },
      {
        id: "opt_bio_7_17_d",
        text: "সোডিয়াম বাইকার্বনেট রূপে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: অক্সিহিমোগ্লোবিন রূপে।",
      coreConcept: "রক্তের লোহিত রক্তকণিকার হিমোগ্লোবিনের সাথে অক্সিজেন যুক্ত হয়ে অস্থায়ী অক্সিহিমোগ্লোবিন যৌগ গঠন করে প্রায় ৯৮% পরিবাহিত হয়; মাত্র ২% রক্তরসে ভৌত দ্রবণ রূপে পরিবাহিত হয়।",
      distractorAnalysis: {
        opt_bio_7_17_a: "রক্তরসে ভৌত দ্রবণ রূপে মাত্র ২% অক্সিজেন বাহিত হয়।",
        opt_bio_7_17_b: "কার্বামিনো যৌগ রূপে কার্বন ডাই-অক্সাইড বাহিত হয়।",
        opt_bio_7_17_d: "সোডিয়াম বাইকার্বনেট রূপে কার্বন ডাই-অক্সাইড পরিবাহিত হয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 169
      },
      proTipShortcut: "অক্সিজেন পরিবহন = ৯৮% অক্সিহিমোগ্লোবিন + ২% ভৌত দ্রবণ।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_18",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "মানবদেহের রক্তে প্রতি অণু হিমোগ্লোবিন সর্বোচ্চ কত অণু অক্সিজেন বহন করতে সক্ষম?",
    options: [
      {
        id: "opt_bio_7_18_a",
        text: "১ অণু",
        isCorrect: false
      },
      {
        id: "opt_bio_7_18_b",
        text: "২ অণু",
        isCorrect: false
      },
      {
        id: "opt_bio_7_18_c",
        text: "৪ অণু",
        isCorrect: true
      },
      {
        id: "opt_bio_7_18_d",
        text: "৮ অণু",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৪ অণু।",
      coreConcept: "হিমোগ্লোবিনের প্রতিটি অণুতে ৪টি হিম বা লৌহ পরমাণু থাকে, যার প্রতিটির সাথে একটি করে অক্সিজেন অণু যুক্ত হয়ে $Hb(O_2)_4$ তৈরি করতে পারে।",
      distractorAnalysis: {
        opt_bio_7_18_a: "মায়োগ্লোবিন পেশিতে ১ অণু অক্সিজেন ধরে, কিন্তু রক্তে হিমোগ্লোবিন ৪টি ধরে।",
        opt_bio_7_18_b: "২ অণু আংশিক সম্পৃক্তি নির্দেশ করে।",
        opt_bio_7_18_d: "হিমোগ্লোবিনে ৮টি পলিপেপটাইড চেইন থাকে না, ৪টি থাকে।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 169
      },
      proTipShortcut: "$$Hb + 4O_2 \\rightleftharpoons Hb(O_2)_4$$"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_19",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "রক্তের মাধ্যমে কার্বন ডাই-অক্সাইড সবচেয়ে বেশি পরিমাণে কোন রূপে ফুসফুসে পরিবাহিত হয়?",
    options: [
      {
        id: "opt_bio_7_19_a",
        text: "কার্বামিনো-হিমোগ্লোবিন রূপে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_19_b",
        text: "কার্বনিক এসিড রূপে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_19_c",
        text: "সোডিয়াম ও পটাসিয়াম বাইকার্বনেট যৌগ রূপে",
        isCorrect: true
      },
      {
        id: "opt_bio_7_19_d",
        text: "কার্বোক্সিহিমোগ্লোবিন রূপে",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: সোডিয়াম ও পটাসিয়াম বাইকার্বনেট যৌগ রূপে।",
      coreConcept: "রক্তে প্রায় ৭৫–৮০% কার্বন ডাই-অক্সাইড রক্তরসে সোডিয়াম বাইকার্বনেট ($NaHCO_3$) এবং লোহিত কণিকায় পটাসিয়াম বাইকার্বনেট ($KHCO_3$) রূপে পরিবাহিত হয়।",
      distractorAnalysis: {
        opt_bio_7_19_a: "কার্বামিনো যৌগ রূপে মাত্র ১০–২০% বাহিত হয়।",
        opt_bio_7_19_b: "ভৌত দ্রবণে কার্বনিক এসিড হিসেবে মাত্র প্রায় ৫% বাহিত হয়।",
        opt_bio_7_19_d: "কার্বোক্সিহিমোগ্লোবিন হলো বিষাক্ত কার্বন মনোক্সাইডের যৌগ।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 169
      },
      proTipShortcut: "$CO_2$ পরিবহনের চ্যাম্পিয়ন: বাইকার্বনেট লবণ ($75-80\\%$)।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_20",
    topicId: "top_ssc_biology_ch7_4",
    type: "MCQ",
    stem: "লোহিত রক্তকণিকায় $CO_2$ ও পানির দ্রুত সংযোগে কার্বনিক এসিড তৈরিতে কোন এনজাইম প্রভাবক হিসেবে কাজ করে?",
    options: [
      {
        id: "opt_bio_7_20_a",
        text: "পেপসিন",
        isCorrect: false
      },
      {
        id: "opt_bio_7_20_b",
        text: "কার্বনিক অ্যানহাইড্রেজ (Carbonic Anhydrase)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_20_c",
        text: "অ্যামাইলেজ",
        isCorrect: false
      },
      {
        id: "opt_bio_7_20_d",
        text: "লাইপেজ",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কার্বনিক অ্যানহাইড্রেজ।",
      coreConcept: "লোহিত রক্তকণিকায় উচ্চ ঘনত্বের কার্বনিক অ্যানহাইড্রেজ এনজাইম থাকে যা $CO_2 + H_2O \\rightleftharpoons H_2CO_3$ বিক্রিয়াকে কয়েক মিলিয়ন গুণ ত্বরান্বিত করে।",
      distractorAnalysis: {
        opt_bio_7_20_a: "পেপসিন পাকস্থলীতে আমিষ পরিপাককারী এনজাইম।",
        opt_bio_7_20_c: "অ্যামাইলেজ শর্করা পরিপাককারী এনজাইম।",
        opt_bio_7_20_d: "লাইপেজ চর্বি পরিপাককারী এনজাইম।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 169
      },
      proTipShortcut: "কার্বনিক অ্যানহাইড্রেজ = রক্তে $CO_2$ থেকে $H_2CO_3$ তৈরির সুপারফাস্ট অনুঘটক।"
    },
    difficulty: "MEDIUM",
    boardSource: "ক্যাডেট কলেজ",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_21",
    topicId: "top_ssc_biology_ch7_5",
    type: "MCQ",
    stem: "হাঁপানি বা অ্যাজমা (Asthma) রোগ সম্পর্কে কোন তথ্যটি সঠিক?",
    options: [
      {
        id: "opt_bio_7_21_a",
        text: "এটি একটি বায়ুবাহিত অত্যন্ত সংক্রামক ছোঁয়াচে রোগ",
        isCorrect: false
      },
      {
        id: "opt_bio_7_21_b",
        text: "এটি অ্যালার্জি ও শ্বাসনালির অতিসংবেদনশীলতাজনিত অসংক্রামক রোগ",
        isCorrect: true
      },
      {
        id: "opt_bio_7_21_c",
        text: "ব্যাকটেরিয়া সংক্রমণের কারণে ফুসফুসে পুঁজ জমে",
        isCorrect: false
      },
      {
        id: "opt_bio_7_21_d",
        text: "অ্যান্টিবায়োটিক খেলেই এ রোগ পুরোপুরি নির্মূল হয়",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: এটি অ্যালার্জি ও শ্বাসনালির অতিসংবেদনশীলতাজনিত অসংক্রামক রোগ।",
      coreConcept: "হাঁপানি কোনো ছোঁয়াচে বা সংক্রামক রোগ নয়। অ্যালার্জেন (ধুলাবালি, রেণু, ধোঁয়া) দ্বারা শ্বাসনালি সংকুচিত হয়ে শ্বাসকষ্ট হয়।",
      distractorAnalysis: {
        opt_bio_7_21_a: "হাঁপানি সংক্রামক নয়, বংশগত বা পরিবেশগত অ্যালার্জিজনিত।",
        opt_bio_7_21_c: "ফুসফুসে পুঁজ জমা নিউমোনিয়ার লক্ষণ।",
        opt_bio_7_21_d: "হাঁপানিতে অ্যান্টিবায়োটিক কার্যকর নয়, ব্রঙ্কোডাইলেটর ইনহেলার উপশম দেয়।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 170
      },
      proTipShortcut: "হাঁপানি = অসংক্রামক অ্যালার্জি।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_22",
    topicId: "top_ssc_biology_ch7_5",
    type: "MCQ",
    stem: "যক্ষ্মা (Tuberculosis) রোগ প্রতিরোধের জন্য শিশুদের কোন প্রতিষেধক টিকা দেওয়া হয়?",
    options: [
      {
        id: "opt_bio_7_22_a",
        text: "ডিপিটি (DPT)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_22_b",
        text: "বিসিজি (BCG)",
        isCorrect: true
      },
      {
        id: "opt_bio_7_22_c",
        text: "এমএমআর (MMR)",
        isCorrect: false
      },
      {
        id: "opt_bio_7_22_d",
        text: "ওপিভি (OPV)",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: বিসিজি (BCG)।",
      coreConcept: "যক্ষ্মা প্রতিরোধে জন্মের পর থেকে ১ বছরের মধ্যে শিশুকে বিসিজি (Bacillus Calmette-Guérin) টিকা দেওয়া বাধ্যতামূলক।",
      distractorAnalysis: {
        opt_bio_7_22_a: "ডিপিটি ডিপথেরিয়া, পার্টুসিস ও টিটেনাসের টিকা।",
        opt_bio_7_22_c: "এমএমআর হাম, মাম্পস ও রুবেলার টিকা।",
        opt_bio_7_22_d: "ওপিভি পোলিও প্রতিরোধের মুখে খাওয়ার টিকা।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 173
      },
      proTipShortcut: "যক্ষ্মার টিকা = বিসিজি (BCG)।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_23",
    topicId: "top_ssc_biology_ch7_5",
    type: "MCQ",
    stem: "নিউমোনিয়া রোগের প্রধান রোগসৃষ্টিকারী ব্যাকটেরিয়ার বৈজ্ঞানিক নাম কোনটি?",
    options: [
      {
        id: "opt_bio_7_23_a",
        text: "Mycobacterium tuberculosis",
        isCorrect: false
      },
      {
        id: "opt_bio_7_23_b",
        text: "Streptococcus pneumoniae",
        isCorrect: true
      },
      {
        id: "opt_bio_7_23_c",
        text: "Salmonella typhi",
        isCorrect: false
      },
      {
        id: "opt_bio_7_23_d",
        text: "Vibrio cholerae",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: Streptococcus pneumoniae।",
      coreConcept: "স্ট্রেপ্টোকক্কাস নিউমোনি (নিউমোকক্কাস) ব্যাকটেরিয়ার আক্রমণে ফুসফুসের অ্যালভিওলাইতে তীব্র প্রদাহ ও শ্লেষ্মা জমে নিউমোনিয়া রোগ হয়।",
      distractorAnalysis: {
        opt_bio_7_23_a: "মাইকোব্যাকটেরিয়াম টিউবারকিউলোসিস হলো যক্ষ্মার জীবাণু।",
        opt_bio_7_23_c: "সালমোনেলা টাইফি হলো টাইফয়েড জ্বরের জীবাণু।",
        opt_bio_7_23_d: "ভিব্রিও কলেরি হলো কলেরা রোগের জীবাণু।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 172
      },
      proTipShortcut: "নিউমোনিয়া = Streptococcus pneumoniae।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_24",
    topicId: "top_ssc_biology_ch7_5",
    type: "MCQ",
    stem: "যক্ষ্মা রোগের চিকিৎসায় স্বাস্থ্যকর্মীর সরাসরি তত্ত্বাবধানে নিয়মিত ওষুধ সেবনের আন্তর্জাতিক পদ্ধতির নাম কী?",
    options: [
      {
        id: "opt_bio_7_24_a",
        text: "ওআরএস (ORS) পদ্ধতি",
        isCorrect: false
      },
      {
        id: "opt_bio_7_24_b",
        text: "ইপিআই (EPI) পদ্ধতি",
        isCorrect: false
      },
      {
        id: "opt_bio_7_24_c",
        text: "ডটস (DOTS) পদ্ধতি",
        isCorrect: true
      },
      {
        id: "opt_bio_7_24_d",
        text: "আইসিইউ (ICU) পদ্ধতি",
        isCorrect: false
      },
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ডটস (DOTS) পদ্ধতি।",
      coreConcept: "DOTS (Directly Observed Treatment, Short-course) পদ্ধতিতে স্বাস্থ্যকর্মীর পর্যবেক্ষণে রোগীকে পূর্ণ মেয়াদে নিয়মিত ওষুধ খাইয়ে যক্ষ্মা নিরাময় করা হয়।",
      distractorAnalysis: {
        opt_bio_7_24_a: "ওআরএস খাবার স্যালাইন পানের মাধ্যমে ডায়রিয়ার পানিশূন্যতা দূর করার পদ্ধতি।",
        opt_bio_7_24_b: "ইপিআই হলো শিশুদের সম্প্রসারিত টিকাদান কর্মসূচি।",
        opt_bio_7_24_d: "আইসিইউ হাসপাতালের নিবিড় পরিচর্যা কেন্দ্র।",
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 173
      },
      proTipShortcut: "যক্ষ্মার ওষুধ সেবন = ডটস (DOTS)।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_25",
    topicId: "top_ssc_biology_ch7_1",
    type: "CQ_CREATIVE",
    stem: "দশম শ্রেণির বিজ্ঞান ক্লাসে শিক্ষক বললেন, “উদ্ভিদের পরিবেশের সাথে গ্যাসীয় বিনিময়ের জন্য দুটি বিশেষ অঙ্গ রয়েছে। একটি অঙ্গ পাতার এপিডার্মিসে অবস্থিত দুটি সংবেদনশীল অর্ধচন্দ্রাকার কোষ দিয়ে গঠিত যা দিনের বেলায় খুলে যায়। অপরটি কাষ্ঠল কাণ্ডের বাকল ফেটে সৃষ্ট স্থায়ী ছিদ্র। এই অঙ্গগুলোর মাধ্যমে ব্যাপন প্রক্রিয়ায় দিন ও রাতে ভিন্ন ভিন্ন অনুপাতে অক্সিজেন ও কার্বন ডাই-অক্সাইডের আদান-প্রদান ঘটে।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকের অঙ্গ দুটি হলো পাতার পত্ররন্ধ্র (স্টোমাটা) এবং কাণ্ডের লেন্টিসেল।",
      coreConcept: "উদ্ভিদে গ্যাসীয় বিনিময়ের শারীরবৃত্তীয় অঙ্গসমূহ ও দিন-রাত্রির গ্যাসীয় গতিপ্রকৃতি।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.১",
        pageNumber: 161
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "লেন্টিসেল কাকে বলে তা সুস্পষ্টভাবে লেখা (কাষ্ঠল কাণ্ডের বাকল ফেটে সৃষ্ট লেন্সের মতো রন্ধ্র)।"
      },
      kha: {
        mark: 2,
        criteria: "দিনের আলোতে পত্ররন্ধ্র কেন উন্মুক্ত হয় তা রক্ষীকোষের অভিস্রবণিক স্ফীতির আলোকে ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকে উল্লিখিত অঙ্গ দুটির (পত্ররন্ধ্র ও লেন্টিসেল) মধ্যে গঠন, অবস্থান ও কার্যপদ্ধতির ৩টি সুনির্দিষ্ট তুলনামূলক পার্থক্য উপস্থাপন করা।"
      },
      gha: {
        mark: 4,
        criteria: "দিন ও রাতের বেলায় উদ্ভিদে গ্যাসীয় বিনিময়ের প্রকৃতির ভিন্নতার কারণ সালোকসংশ্লেষণ ও শ্বসনের পারস্পরিক সম্পর্কের ভিত্তিতে বিশ্লেষণ করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_26",
    topicId: "top_ssc_biology_ch7_2",
    type: "CQ_CREATIVE",
    stem: "মানবদেহের শ্বসনতন্ত্রের একটি চার্টে দেখা গেল স্বরযন্ত্রের নিচ থেকে একটি ১০–১২ সেমি লম্বা নালি বক্ষগহ্বর পর্যন্ত বিস্তৃত। নালিটির গায়ে ১৬–২০টি অর্ধচন্দ্রাকার বলয় আঁকা। বক্ষগহ্বরে নালিটি দুটি শাখায় ভাগ হয়ে হৃদপিণ্ডের দুপাশে অবস্থিত দুটি নরম গোলাপি অঙ্গে প্রবেশ করেছে। যার ডান অংশটি ৩টি লোবে এবং বাম অংশটি ২টি লোবে বিভক্ত।",
    options: null,
    explanation: {
      directAnswer: "চার্টে প্রদর্শিত নালিটি হলো ট্রাকিয়া (শ্বাসনালি) এবং গোলাপি অঙ্গ দুটি হলো ফুসফুস।",
      coreConcept: "মানব শ্বসনতন্ত্রের ট্রাকিয়া, ফুসফুসের লোব বিন্যাস এবং এদের প্রতিরক্ষামূলক গঠন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 163
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "প্লুরা (Pleura) কী তা নির্ভুলভাবে লেখা (ফুসফুসের দ্বিস্তরবিশিষ্ট আবরণী পর্দা)।"
      },
      kha: {
        mark: 2,
        criteria: "ট্রাকিয়ার তরুণাস্থি বলয়গুলো বৃত্তাকার না হয়ে C-আকৃতির হয় কেন তা অন্ননালির প্রসারণের সাপেক্ষে ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "চার্টের নালিটির (ট্রাকিয়া) আণুবীক্ষণিক গঠন ও বায়ু চলাচলে এর ভূমিকা পাঠ্যবইয়ের আলোকে বর্ণনা করা।"
      },
      gha: {
        mark: 4,
        criteria: "বাম ফুসফুস ২টি এবং ডান ফুসফুস ৩টি খণ্ডে বিভক্ত হওয়ার শারীরবৃত্তীয় তাৎপর্য এবং সুরক্ষায় প্লুরার গুরুত্ব বিশ্লেষণ করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_27",
    topicId: "top_ssc_biology_ch7_2",
    type: "CQ_CREATIVE",
    stem: "রাফসান দুপুরে খাওয়ার সময় হঠাৎ হাসাহাসি করে জোরে কথা বলতে গেলে প্রচণ বিষম খায় এবং কাশির দমকে খাবারের কণা নাক-মুখ দিয়ে বেরিয়ে আসে। তার বাবা বললেন, “খাওয়ার সময় শ্বাসনালির ঢাকনাটি সঠিকভাবে কাজ না করায় এই বিপদ ঘটেছে।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকের ঘটনাটি এপিগ্লটিস (উপজিহ্বা) এর কাজ ও খাদ্যনালি-শ্বাসনালির সমন্বয়হীনতার ফল।",
      coreConcept: "এপিগ্লটিস ও ভোকাল কর্ডের গঠন, খাদ্য গেলার প্রক্রিয়া এবং শ্বাসনালির সুরক্ষা কৌশল।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.২",
        pageNumber: 162
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "ভোকাল কর্ডের কাজ কী তা এক বাক্যে লেখা (কণ্ঠস্বর বা ধ্বনি উৎপন্ন করা)।"
      },
      kha: {
        mark: 2,
        criteria: "নাসাপথের মিউকাস ঝিল্লি ও সূক্ষ্ম রোমের প্রতিরক্ষামূলক ভূমিকা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "রাফসানের বিষম খাওয়ার শারীরবৃত্তীয় কারণ এপিগ্লটিসের কার্যপদ্ধতির আলোকে ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "খাদ্য ও বায়ু চলাচলের সাধারণ পথ হওয়া সত্ত্বেও মানব শ্বসনতন্ত্র কীভাবে নিরাপদ থাকে তা বিশ্লেষণ করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_28",
    topicId: "top_ssc_biology_ch7_3",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান মেলায় নবম শ্রেণির শিক্ষার্থীরা একটি প্লাস্টিকের স্বচ্ছ বোতল, একটি Y-নল এবং তিনটি বেলুন দিয়ে মানব শ্বাসক্রিয়ার একটি কার্যক্ষম মডেল তৈরি করল। বোতলের নিচের দিকে প্রসারিত রাবারের শিটটি নিচের দিকে টানলে ভেতরে থাকা দুটি বেলুন ফুলে ওঠে, আর শিটটি ছেড়ে দিলে বেলুন দুটি চুপসে যায়।",
    options: null,
    explanation: {
      directAnswer: "মডেলটিতে রাবারের শিটটি ডায়াফ্রাম, Y-নলটি ট্রাকিয়া ও ব্রঙ্কাস এবং বেলুন দুটি ফুসফুসের প্রতিনিধিত্ব করে।",
      coreConcept: "বক্ষগহ্বরের চাপ-আয়তন পরিবর্তন এবং শ্বাসক্রিয়ার (প্রশ্বাস ও নিঃশ্বাস) ভৌত মেকানিক্স।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৩",
        pageNumber: 166
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "বহিঃশ্বসন কাকে বলে তা সঠিক সংজ্ঞায়িত করা।"
      },
      kha: {
        mark: 2,
        criteria: "স্বাভাবিক নিঃশ্বাসকে কেন মূলত একটি নিষ্ক্রিয় প্রক্রিয়া বলা হয় তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "মডেলটির রাবারের শিট নিচে টানলে ভেতরের বেলুন ফুলে ওঠার কৌশল বয়েলের চাপের সূত্রের আলোকে ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "মানবদেহে প্রশ্বাস ও নিঃশ্বাস পরিচালনায় ডায়াফ্রাম ও পাঁজরাস্থির পেশির যৌথ ভূমিকা বিশ্লেষণ করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_29",
    topicId: "top_ssc_biology_ch7_4",
    type: "CQ_CREATIVE",
    stem: "মানব ফুসফুসে প্রায় ৭০ কোটি আণুবীক্ষণিক বায়ুথলি রয়েছে যাদের মোট ক্ষেত্রফল প্রায় ৭০–৮০ বর্গমিটার। এই বায়ুথলিগুলোকে ঘিরে অসংখ্য রক্ত কৈশিক নালির জাল বিছানো থাকে। এখানে রক্তের হিমোগ্লোবিন পরিবেশের অক্সিজেন গ্রহণ করে এবং রক্তে জমে থাকা বিপাকীয় কার্বন ডাই-অক্সাইড মুক্ত করে দেয়।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে ফুসফুসের অ্যালভিওলাই এবং রক্তে অক্সিজেন ও কার্বন ডাই-অক্সাইড বিনিময়ের কৌশল আলোচিত হয়েছে।",
      coreConcept: "অ্যালভিওলাসের গঠন, শ্বসন ঝিল্লির ব্যাপন ক্ষমতা এবং রক্তে $O_2$ ও $CO_2$ পরিবহনের রাসায়নিক কৌশল।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৪",
        pageNumber: 168
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "অক্সিহিমোগ্লোবিন কী তা লেখা ($Hb$ এর সাথে $O_2$ যুক্ত অস্থায়ী যৌগ)।"
      },
      kha: {
        mark: 2,
        criteria: "অ্যালভিওলাসের প্রাচীর কেন একস্তর চ্যাপ্টা স্কোয়ামাস কোষে তৈরি তা ব্যাপনের প্রেক্ষিতে ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "উদ্দীপকের বায়ুথলি ও কৈশিক নালির মধ্যে আংশিক চাপের পার্থক্যে গ্যাসীয় ব্যাপনের গতিপথ ছক বা সমীকরণসহ ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "রক্তের মাধ্যমে কার্বন ডাই-অক্সাইড ফুসফুসে পৌঁছানোর ৩টি স্বতন্ত্র রূপ রাসায়নিক বিক্রিয়াসহ মূল্যায়ন করা।"
      },
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_7_30",
    topicId: "top_ssc_biology_ch7_5",
    type: "CQ_CREATIVE",
    stem: "করিম সাহেবের (৬৫) একটানা চার সপ্তাহ ধরে কাশি হচ্ছে, কাশির সাথে রক্ত পড়ছে এবং সন্ধ্যায় হালকা জ্বর ও রাতে প্রচুর ঘাম হয়। অপরদিকে তার পাঁচ বছর বয়সী নাতনি শিমুর হঠাৎ ১০৩°F জ্বর, বুকে তীব্র ব্যথা ও শ্বাসকষ্ট শুরু হলে ডাক্তার জানালেন তার ফুসফুসে শ্লেষ্মা ও তরল জমে অ্যালভিওলাই আক্রান্ত হয়েছে।",
    options: null,
    explanation: {
      directAnswer: "করিম সাহেব যক্ষ্মা (Tuberculosis) এবং শিমু নিউমোনিয়া (Pneumonia) রোগে আক্রান্ত।",
      coreConcept: "শ্বাসনালি ও ফুসফুসের সংক্রামক ব্যাকটেরিয়াজনিত রোগসমূহের লক্ষণ, নির্ণয় ও আধুনিক চিকিৎসা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "সপ্তম অধ্যায়: গ্যাসীয় বিনিময় · ৭.৫",
        pageNumber: 172
      },
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: "বিসিজি (BCG) টিকার পূর্ণরূপ নির্ভুলভাবে লেখা (Bacillus Calmette-Guérin)।"
      },
      kha: {
        mark: 2,
        criteria: "হাঁপানি রোগ ছোঁয়াচে বা সংক্রামক নয় কেন তা ব্যাখ্যা করা।"
      },
      ga: {
        mark: 3,
        criteria: "শিমুর রোগের কারণ, জীবাণুর নাম এবং ফুসফুসে এর ক্ষতিকর প্রভাব ব্যাখ্যা করা।"
      },
      gha: {
        mark: 4,
        criteria: "করিম সাহেবের রোগটি নিরাময়ে ডটস (DOTS) পদ্ধতির ভূমিকা এবং কোর্স অসম্পূর্ণ রাখার মারাত্মক পরিণতি বিশ্লেষণ করা।"
      },
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];
