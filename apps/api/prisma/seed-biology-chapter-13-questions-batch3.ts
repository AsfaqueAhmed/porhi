import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter13QuestionsBatch3: QuestionData[] = [
  // -------------------------------------------------------------------------
  // Topic 13.5: সহাবস্থান ও আন্তঃক্রিয়া (MCQs: q_bio_13_61 to q_bio_13_72)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_13_61",
    topicId: "top_ssc_biology_ch13_5",
    type: "MCQ",
    stem: "লাইকেন (Lichen) জীবদেহে কোন দুটি ভিন্ন জীবের মিউচুয়ালিজম বা মিথোজীবিতা দেখা যায়?",
    options: [
      { id: "opt_bio_13_61_a", text: "শৈবাল ও ছত্রাক", isCorrect: true },
      { id: "opt_bio_13_61_b", text: "ব্যাকটেরিয়া ও ভাইরাস", isCorrect: false },
      { id: "opt_bio_13_61_c", text: "ফার্ন ও মস", isCorrect: false },
      { id: "opt_bio_13_61_d", text: "ছত্রাক ও প্রোটোজোয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: শৈবাল ও ছত্রাক।",
      coreConcept: "লাইকেনে শৈবাল সালোকসংশ্লেষণের মাধ্যমে শর্করা খাদ্য প্রস্তুত করে এবং ছত্রাক পরিবেশ থেকে পানি ও খনিজ লবণ শোষণ করে শৈবালকে সুরক্ষা ও আশ্রয় দেয়।",
      distractorAnalysis: {
        opt_bio_13_61_b: "ব্যাকটেরিয়া ও ভাইরাসের মধ্যে কোনো সিম্বায়োটিক লাইকেন গঠিত হয় না।",
        opt_bio_13_61_c: "ফার্ন ও মস পৃথক অপুষ্পক উদ্ভিদ শ্রেণি।",
        opt_bio_13_61_d: "লাইকেনে শৈবাল ও ছত্রাকের মিলন ঘটে, প্রোটোজোয়ার নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 298
      },
      proTipShortcut: "Lichen = Algae (খাদ্য) + Fungi (আশ্রয় ও পানি)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_62",
    topicId: "top_ssc_biology_ch13_5",
    type: "MCQ",
    stem: "কমেনসালিজম (Commensalism) সম্পর্কের ক্ষেত্রে নিচের কোনটি সঠিক?",
    options: [
      { id: "opt_bio_13_62_a", text: "উভয় জীবই পরস্পর উপকৃত হয়", isCorrect: false },
      { id: "opt_bio_13_62_b", text: "একটি জীব উপকৃত হয় কিন্তু অপরটি উপকৃত বা ক্ষতিগ্রস্ত কোনোটিই হয় না", isCorrect: true },
      { id: "opt_bio_13_62_c", text: "একটি জীব অপর জীবকে হত্যা করে খায়", isCorrect: false },
      { id: "opt_bio_13_62_d", text: "উভয় জীবই মারাত্মকভাবে ক্ষতিগ্রস্ত হয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: একটি জীব উপকৃত হয় কিন্তু অপরটি উপকৃত বা ক্ষতিগ্রস্ত কোনোটিই হয় না।",
      coreConcept: "কমেনসালিজমে সহযোগী জীবের একজন পুষ্টি বা আশ্রয়ের সুবিধা পায় (+), কিন্তু অন্যজন কোনো লাভ বা ক্ষতির সম্মুখীন না হয়ে নিরপেক্ষ থাকে (০)।",
      distractorAnalysis: {
        opt_bio_13_62_a: "উভয়ে উপকৃত হওয়া হলো মিউচুয়ালিজম (+, +)।",
        opt_bio_13_62_c: "অন্য জীবকে হত্যা করে খাওয়া হলো শিকারী আচরণ (Predation)।",
        opt_bio_13_62_d: "উভয়ে ক্ষতিগ্রস্ত হওয়া হলো প্রতিযোগিতা (Competition, -, -)।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 298
      },
      proTipShortcut: "মিউচুয়ালিজম (+, +); কমেনসালিজম (+, ০)।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_63",
    topicId: "top_ssc_biology_ch13_5",
    type: "MCQ",
    stem: "বড় বৃক্ষের ডালে আশ্রয় নেওয়া রাস্না বা পরাশ্রয়ী অর্কিড (Epiphytic orchid) কোন সম্পর্কের উদাহরণ?",
    options: [
      { id: "opt_bio_13_63_a", text: "মিউচুয়ালিজম", isCorrect: false },
      { id: "opt_bio_13_63_b", text: "কমেনসালিজম", isCorrect: true },
      { id: "opt_bio_13_63_c", text: "পরজীবিতা", isCorrect: false },
      { id: "opt_bio_13_63_d", text: "অ্যান্টিবায়োসিস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কমেনসালিজম।",
      coreConcept: "রাস্না কেবল আশ্রয়ের জন্য গাছের ডালে থাকে এবং ভেলামেন মূলের সাহায্যে বায়ুমণ্ডল থেকে বাষ্প টানে; এটি গাছের কোনো ক্ষতি বা লাভ করে না, তাই এটি কমেনসালিজম।",
      distractorAnalysis: {
        opt_bio_13_63_a: "পোষক গাছ রাস্না থেকে কোনো উপকার পায় না, তাই মিউচুয়ালিজম নয়।",
        opt_bio_13_63_c: "রাস্না গাছ থেকে খাদ্য চুষে নেয় না, তাই পরজীবিতা নয়।",
        opt_bio_13_63_d: "রাস্না কোনো বিষাক্ত পদার্থ ছড়ায় না, তাই অ্যান্টিবায়োসিস নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 298
      },
      proTipShortcut: "রাস্না/অর্কিড = পরাশ্রয়ী = কমেনসালিজম।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_64",
    topicId: "top_ssc_biology_ch13_5",
    type: "MCQ",
    stem: "স্বর্ণলতা (Cuscuta) কোন বিশেষ অঙ্গের মাধ্যমে পোষক উদ্ভিদের কাণ্ড থেকে খাদ্য শোষণ করে?",
    options: [
      { id: "opt_bio_13_64_a", text: "ভেলামেন (Velamen)", isCorrect: false },
      { id: "opt_bio_13_64_b", text: "হোস্টোরিয়াম (Haustorium)", isCorrect: true },
      { id: "opt_bio_13_64_c", text: "রাইজোম", isCorrect: false },
      { id: "opt_bio_13_64_d", text: "স্টোলন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: হোস্টোরিয়াম (Haustorium)।",
      coreConcept: "স্বর্ণলতা ক্লোরোফিলবিহীন পরজীবী উদ্ভিদ যা পোষকের কাণ্ডে হোস্টোরিয়াম নামক চোষক মূল প্রবেশ করিয়ে সরাসরি ফ্লোয়েম থেকে প্রস্তুতকৃত খাদ্য শোষণ করে।",
      distractorAnalysis: {
        opt_bio_13_64_a: "ভেলামেন হলো অর্কিডের বায়বীয় মূলের স্পঞ্জসদৃশ পানিগ্রাহী কলা।",
        opt_bio_13_64_c: "রাইজোম হলো আদার ভূ-নিম্নস্থ রূপান্তরিত কাণ্ড।",
        opt_bio_13_64_d: "স্টোলন হলো কচুর ধাবক বা রূপান্তরিত কাণ্ড।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 299
      },
      proTipShortcut: "স্বর্ণলতা + চোষক অঙ্গ = Haustorium (হোস্টোরিয়াম)।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_65",
    topicId: "top_ssc_biology_ch13_5",
    type: "MCQ",
    stem: "পেনিসিলিয়াম (Penicillium notatum) ছত্রাক নিঃসৃত অ্যান্টিবায়োটিকের প্রভাবে ব্যাকটেরিয়ার বৃদ্ধি রোধ হওয়া কোন ধরণের মিথস্ক্রিয়া?",
    options: [
      { id: "opt_bio_13_65_a", text: "কমেনসালিজম", isCorrect: false },
      { id: "opt_bio_13_65_b", text: "অ্যান্টিবায়োসিস (Antibiosis)", isCorrect: true },
      { id: "opt_bio_13_65_c", text: "মিউচুয়ালিজম", isCorrect: false },
      { id: "opt_bio_13_65_d", text: "প্রতিযোগিতা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: অ্যান্টিবায়োসিস (Antibiosis)।",
      coreConcept: "একটি জীব কর্তৃক পরিবেশে নিঃসৃত রাসায়নিক জৈব পদার্থের কারণে যখন অপর কোনো জীবের বৃদ্ধি বা অস্তিত্ব বিনষ্ট হয়, তখন তাকে অ্যান্টিবায়োসিস বলে।",
      distractorAnalysis: {
        opt_bio_13_65_a: "কমেনসালিজমে কেউ ক্ষতিগ্রস্ত হয় না।",
        opt_bio_13_65_c: "মিউচুয়ালিজমে উভয় জীব উপকৃত হয়।",
        opt_bio_13_65_d: "প্রতিযোগিতায় খাদ্য বা বাসস্থানের জন্য লড়াই হয়, রাসায়নিক বিষক্রিয়া নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 299
      },
      proTipShortcut: "ছত্রাক নিঃসৃত অ্যান্টিবায়োটিক দ্বারা ব্যাকটেরিয়া ধ্বংস = Antibiosis।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_66",
    topicId: "top_ssc_biology_ch13_5",
    type: "MCQ",
    stem: "একই প্রজাতির সদস্যদের মধ্যে যখন খাদ্য ও বাসস্থানের জন্য লড়াই হয়, তখন তাকে কী বলে?",
    options: [
      { id: "opt_bio_13_66_a", text: "অন্তঃপ্রজাতিক প্রতিযোগিতা (Intraspecific)", isCorrect: true },
      { id: "opt_bio_13_66_b", text: "আন্তঃপ্রজাতিক প্রতিযোগিতা (Interspecific)", isCorrect: false },
      { id: "opt_bio_13_66_c", text: "পরজীবিতা", isCorrect: false },
      { id: "opt_bio_13_66_d", text: "মিউচুয়ালিজম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অন্তঃপ্রজাতিক প্রতিযোগিতা (Intraspecific)।",
      coreConcept: "একই প্রজাতির বিভিন্ন সদস্যের মধ্যকার পারস্পরিক সংগ্রামকে অন্তঃপ্রজাতিক (Intraspecific) প্রতিযোগিতা বলে (যেমন এক বনের দুই বাঘের লড়াই)।",
      distractorAnalysis: {
        opt_bio_13_66_b: "ভিন্ন প্রজাতির সদস্যদের মধ্যকার সংগ্রাম হলো আন্তঃপ্রজাতিক (Interspecific)।",
        opt_bio_13_66_c: "পরজীবিতায় পোষকের ক্ষতি করে পরজীবী বাঁচে।",
        opt_bio_13_66_d: "মিউচুয়ালিজমে সহযোগিতামূলক সম্পর্ক থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 299
      },
      proTipShortcut: "একই প্রজাতি = অন্তঃ (Intra); ভিন্ন প্রজাতি = আন্তঃ (Inter)।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_67",
    topicId: "top_ssc_biology_ch13_5",
    type: "MCQ",
    stem: "মানুষের অন্ত্রে বসবাসকারী Escherichia coli ব্যাকটেরিয়ার সাথে মানুষের সম্পর্কটি কী?",
    options: [
      { id: "opt_bio_13_67_a", text: "পরজীবিতা", isCorrect: false },
      { id: "opt_bio_13_67_b", text: "মিউচুয়ালিজম", isCorrect: true },
      { id: "opt_bio_13_67_c", text: "অ্যান্টিবায়োসিস", isCorrect: false },
      { id: "opt_bio_13_67_d", text: "কমেনসালিজম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মিউচুয়ালিজম।",
      coreConcept: "ই. কোলাই মানুষের অন্ত্রে খাদ্য ও আশ্রয় পায় এবং বিনিময়ে মানুষের জন্য রক্ত জমাট বাঁধার প্রয়োজনীয় ভিটামিন 'কে' ও ভিটামিন 'বি১২' তৈরি করে দেয়; তাই উভয়ই উপকৃত হয়।",
      distractorAnalysis: {
        opt_bio_13_67_a: "স্বাভাবিক ই. কোলাই ক্ষতি করে না বরং ভিটামিন জোগায়, তাই পরজীবী নয়।",
        opt_bio_13_67_c: "এতে কোনো অ্যান্টিবায়োসিস ঘটে না।",
        opt_bio_13_67_d: "মানুষও ভিটামিন পেয়ে উপকৃত হয়, তাই কেবল কমেনসালিজম নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 298
      },
      proTipShortcut: "E. coli অন্ত্রে খাদ্য পায় + ভিটামিন কে দেয় = Mutualism।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_68",
    topicId: "top_ssc_biology_ch13_5",
    type: "MCQ",
    stem: "স্বর্ণলতা ও পোষক গাছের সম্পর্কের ক্ষেত্রে চিহ্নরূপ কোনটি প্রযোজ্য?",
    options: [
      { id: "opt_bio_13_68_a", text: "(+, +)", isCorrect: false },
      { id: "opt_bio_13_68_b", text: "(+, 0)", isCorrect: false },
      { id: "opt_bio_13_68_c", text: "(+, -)", isCorrect: true },
      { id: "opt_bio_13_68_d", text: "(-, -)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: (+, -)।",
      coreConcept: "স্বর্ণলতা পুষ্টি শোষণ করে লাভবান হয় (+) এবং পোষক গাছ দুর্বল হয়ে মারাত্মক ক্ষতিগ্রস্ত বা মৃত হয় (-); তাই এটি পরজীবিতা (+, -)।",
      distractorAnalysis: {
        opt_bio_13_68_a: "(+, +) হলো মিউচুয়ালিজম।",
        opt_bio_13_68_b: "(+, ০) হলো কমেনসালিজম।",
        opt_bio_13_68_d: "(-, -) হলো প্রতিযোগিতা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 299
      },
      proTipShortcut: "পরজীবিতা = (+, -)।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_69",
    topicId: "top_ssc_biology_ch13_5",
    type: "MCQ",
    stem: "রোহিণী বা আরোহী লতা বড় কাষ্ঠল গাছকে অবলম্বন করে বেঁচে থাকে—এটি কোন মিথস্ক্রিয়ার উদাহরণ?",
    options: [
      { id: "opt_bio_13_69_a", text: "কমেনসালিজম", isCorrect: true },
      { id: "opt_bio_13_69_b", text: "পরজীবিতা", isCorrect: false },
      { id: "opt_bio_13_69_c", text: "অ্যান্টিবায়োসিস", isCorrect: false },
      { id: "opt_bio_13_69_d", text: "মিউচুয়ালিজম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কমেনসালিজম।",
      coreConcept: "রোহিণী গাছকে আশ্রয় করে ওপরে উঠে সূর্যালোক পায় কিন্তু গাছের কোনো খাদ্য চুষে নেয় না বা ক্ষতি করে না, তাই এটি কমেনসালিজম।",
      distractorAnalysis: {
        opt_bio_13_69_b: "গাছের কোনো ক্ষতি না করায় পরজীবিতা নয়।",
        opt_bio_13_69_c: "কোনো বিষাক্ত ক্ষরণ না থাকায় অ্যান্টিবায়োসিস নয়।",
        opt_bio_13_69_d: "গাছের কোনো প্রত্যক্ষ লাভ না হওয়ায় মিউচুয়ালিজম নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 298
      },
      proTipShortcut: "রোহিণী লতা = কমেনসালিজম।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_70",
    topicId: "top_ssc_biology_ch13_5",
    type: "MCQ",
    stem: "মৌমাছি ও ফুলের মধ্যকার সম্পর্ককে মিউচুয়ালিজম বলা হয় কেন?",
    options: [
      { id: "opt_bio_13_70_a", text: "কারণ মৌমাছি মধু পায় এবং ফুলের পরাগায়ন নিশ্চিত হয়", isCorrect: true },
      { id: "opt_bio_13_70_b", text: "কারণ মৌমাছি ফুলকে খেয়ে ফেলে", isCorrect: false },
      { id: "opt_bio_13_70_c", text: "কারণ ফুল মৌমাছিকে ধ্বংস করে দেয়", isCorrect: false },
      { id: "opt_bio_13_70_d", text: "কারণ এতে কোনো পক্ষই উপকৃত হয় না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কারণ মৌমাছি মধু পায় এবং ফুলের পরাগায়ন নিশ্চিত হয়।",
      coreConcept: "মৌমাছি মিষ্টি নেকটার খাদ্য হিসেবে পায় এবং ফুল তার বংশবৃদ্ধির জন্য অপরিহার্য পরাগায়ন সুবিধা পায়, ফলে উভয়ে উপকৃত হয়।",
      distractorAnalysis: {
        opt_bio_13_70_b: "মৌমাছি ফুল খায় না, কেবল মধু সংগ্রহ করে।",
        opt_bio_13_70_c: "ফুল কোনো শিকারী ফাঁদ নয় (কীটভুক উদ্ভিদ ব্যতীত)।",
        opt_bio_13_70_d: "উভয় পক্ষই ব্যাপকভাবে উপকৃত হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 298
      },
      proTipShortcut: "মৌমাছি + ফুল = পরাগায়ন + মধু = Mutualism (+, +)।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_71",
    topicId: "top_ssc_biology_ch13_5",
    type: "MCQ",
    stem: "অন্তঃপরজীবী (Endoparasite) প্রাণীর উদাহরণ নিচের কোনটি?",
    options: [
      { id: "opt_bio_13_71_a", text: "মাথার উকুন", isCorrect: false },
      { id: "opt_bio_13_71_b", text: "জোঁক", isCorrect: false },
      { id: "opt_bio_13_71_c", text: "মানুষের অন্ত্রের গোলকৃমি", isCorrect: true },
      { id: "opt_bio_13_71_d", text: "ছাড়পোকা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: মানুষের অন্ত্রের গোলকৃমি।",
      coreConcept: "গোলকৃমি ও ফিতাকৃমি পোষক দেহের অভ্যন্তরীণ অঙ্গ বা অন্ত্রে বাস করে খাদ্য শোষণ করে, তাই এরা অন্তঃপরজীবী (Endoparasite)।",
      distractorAnalysis: {
        opt_bio_13_71_a: "উকুন হলো ত্বকের বাইরে বাস করা বহিঃপরজীবী (Ectoparasite)।",
        opt_bio_13_71_b: "জোঁক ত্বকের বাইরে রক্ত চোষে, তাই বহিঃপরজীবী।",
        opt_bio_13_71_d: "ছাড়পোকা বহিঃপরজীবী।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 299
      },
      proTipShortcut: "ভেতরে বাস করে = অন্তঃপরজীবী (কৃমি)।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_72",
    topicId: "top_ssc_biology_ch13_5",
    type: "MCQ",
    stem: "১৯২৮ সালে কোন বিজ্ঞানী Penicillium ছত্রাক থেকে পেনিসিলিন অ্যান্টিবায়োটিক আবিষ্কার করেন?",
    options: [
      { id: "opt_bio_13_72_a", text: "আলেকজান্ডার ফ্লেমিং", isCorrect: true },
      { id: "opt_bio_13_72_b", text: "লুই পাস্তুর", isCorrect: false },
      { id: "opt_bio_13_72_c", text: "রবার্ট হুক", isCorrect: false },
      { id: "opt_bio_13_72_d", text: "এডওয়ার্ড জেনার", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: আলেকজান্ডার ফ্লেমিং।",
      coreConcept: "স্যার আলেকজান্ডার ফ্লেমিং ১৯২৮ সালে কালচার প্লেটে দেখতে পান যে Penicillium notatum ছত্রাকের চারপাশে স্ট্যাফাইলোকক্কাস ব্যাকটেরিয়া ধ্বংস হয়ে গেছে, যা অ্যান্টিবায়োসিসের শ্রেষ্ঠ আবিষ্কার।",
      distractorAnalysis: {
        opt_bio_13_72_b: "লুই পাস্তুর অ্যানথ্রাক্স ও জলাতঙ্কের টিকা আবিষ্কার করেন।",
        opt_bio_13_72_c: "রবার্ট হুক ১৬৬৫ সালে প্রথম কোষ পর্যবেক্ষণ করেন।",
        opt_bio_13_72_d: "এডওয়ার্ড জেনার গুটিবসন্তের টিকা আবিষ্কার করেন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 299
      },
      proTipShortcut: "Penicillin = Alexander Fleming (1928)।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------------------
  // Topic 13.6: জীববৈচিত্র্য ও পরিবেশ সংরক্ষণ (MCQs: q_bio_13_73 to q_bio_13_84)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_13_73",
    topicId: "top_ssc_biology_ch13_6",
    type: "MCQ",
    stem: "জীববৈচিত্র্য (Biodiversity) মূলত কয়টি স্তরে বিভক্ত?",
    options: [
      { id: "opt_bio_13_73_a", text: "২টি স্তরে", isCorrect: false },
      { id: "opt_bio_13_73_b", text: "৩টি স্তরে (জিনগত, প্রজাতি ও বাস্তুতান্ত্রিক)", isCorrect: true },
      { id: "opt_bio_13_73_c", text: "৫টি স্তরে", isCorrect: false },
      { id: "opt_bio_13_73_d", text: "১০টি স্তরে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ৩টি স্তরে (জিনগত, প্রজাতি ও বাস্তুতান্ত্রিক)।",
      coreConcept: "জীববৈচিত্র্য ৩টি প্রধান স্তরে বিন্যস্ত: ১. জিনগত বৈচিত্র্য (Genetic), ২. প্রজাতি বৈচিত্র্য (Species), এবং ৩. বাস্তুতান্ত্রিক বৈচিত্র্য (Ecosystem Diversity)।",
      distractorAnalysis: {
        opt_bio_13_73_a: "২টি স্তর নয়, ৩টি সুনির্দিষ্ট স্তর রয়েছে।",
        opt_bio_13_73_c: "৫টি স্তর হলো হুইটটেকারের জীবজগতের রাজ্য।",
        opt_bio_13_73_d: "১০টি স্তর অবৈজ্ঞানিক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 301
      },
      proTipShortcut: "জীববৈচিত্র্য = জিনগত + প্রজাতি + বাস্তুতান্ত্রিক।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_74",
    topicId: "top_ssc_biology_ch13_6",
    type: "MCQ",
    stem: "একই ধানের প্রজাতির হাজারো ভিন্ন জাত (যেমন বালাম, চিনিগুঁড়া, ব্রি ধান) কোন বৈচিত্র্যের বহিঃপ্রকাশ?",
    options: [
      { id: "opt_bio_13_74_a", text: "জিনগত বৈচিত্র্য (Genetic Diversity)", isCorrect: true },
      { id: "opt_bio_13_74_b", text: "প্রজাতি বৈচিত্র্য", isCorrect: false },
      { id: "opt_bio_13_74_c", text: "বাস্তুতান্ত্রিক বৈচিত্র্য", isCorrect: false },
      { id: "opt_bio_13_74_d", text: "ভৌগোলিক বৈচিত্র্য", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: জিনগত বৈচিত্র্য (Genetic Diversity)।",
      coreConcept: "একই প্রজাতির সদস্যদের ভেতরের ডিএনএ বা অ্যালিলের ভিন্নতার কারণে যে বৈচিত্র্য সৃষ্টি হয় তাকে জিনগত বৈচিত্র্য বলে।",
      distractorAnalysis: {
        opt_bio_13_74_b: "প্রজাতি বৈচিত্র্য হলো ভিন্ন ভিন্ন প্রজাতির উপস্থিতি (যেমন ধান ও গম)।",
        opt_bio_13_74_c: "বাস্তুতান্ত্রিক বৈচিত্র্য হলো বন ও জলাভূমির মধ্যকার পার্থক্য।",
        opt_bio_13_74_d: "ভৌগোলিক বৈচিত্র্য জলবায়ুগত অবস্থান নির্দেশ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 301
      },
      proTipShortcut: "একই প্রজাতির ভেতরের রূপভেদ = জিনগত বৈচিত্র্য।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_75",
    topicId: "top_ssc_biology_ch13_6",
    type: "MCQ",
    stem: "ইন-সিটু (In-situ) সংরক্ষণ পদ্ধতির মূল বৈশিষ্ট্য কোনটি?",
    options: [
      { id: "opt_bio_13_75_a", text: "জীবকে তার প্রাকৃতিক নিজস্ব আবাসস্থলে রেখে সংরক্ষণ করা", isCorrect: true },
      { id: "opt_bio_13_75_b", text: "জীবকে ল্যাবরেটরিতে তরল নাইট্রোজেনে হিমায়িত করা", isCorrect: false },
      { id: "opt_bio_13_75_c", text: "গাছপালাকে বোটানিক্যাল গার্ডেনে টবে রাখা", isCorrect: false },
      { id: "opt_bio_13_75_d", text: "প্রাণীকে চিড়িয়াখানায় খাঁচায় আটকে বংশবৃদ্ধি করা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: জীবকে তার প্রাকৃতিক নিজস্ব আবাসস্থলে রেখে সংরক্ষণ করা।",
      coreConcept: "ইন-সিটু সংরক্ষণ হলো কোনো জীবকে তার প্রাকৃতিক পরিবেশে রেখে পুরো বাস্তুতন্ত্রসহ সুরক্ষা দেওয়া (যেমন সুন্দরবন বা জাতীয় উদ্যান)।",
      distractorAnalysis: {
        opt_bio_13_75_b: "তরল নাইট্রোজেনে সংরক্ষণ হলো এক্স-সিটু ক্রায়োপ্রিজারভেশন।",
        opt_bio_13_75_c: "বোটানিক্যাল গার্ডেন হলো এক্স-সিটু সংরক্ষণ।",
        opt_bio_13_75_d: "চিড়িয়াখানা হলো এক্স-সিটু সংরক্ষণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 303
      },
      proTipShortcut: "ইন-সিটু = নিজ গৃহে সংরক্ষণ; এক্স-সিটু = বাইরে নিয়ে সংরক্ষণ।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_76",
    topicId: "top_ssc_biology_ch13_6",
    type: "MCQ",
    stem: "নিচের কোনটি এক্স-সিটু (Ex-situ) সংরক্ষণের উদাহরণ?",
    options: [
      { id: "opt_bio_13_76_a", text: "ভাওয়াল জাতীয় উদ্যান", isCorrect: false },
      { id: "opt_bio_13_76_b", text: "সুন্দরবন বন্যপ্রাণী অভয়ারণ্য", isCorrect: false },
      { id: "opt_bio_13_76_c", text: "মিরপুর জাতীয় উদ্ভিদ উদ্যান (বোটানিক্যাল গার্ডেন)", isCorrect: true },
      { id: "opt_bio_13_76_d", text: "টাঙ্গুয়ার হাওড় রামসার সাইট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: মিরপুর জাতীয় উদ্ভিদ উদ্যান (বোটানিক্যাল গার্ডেন)।",
      coreConcept: "বোটানিক্যাল গার্ডেন, চিড়িয়াখানা, জিন ব্যাংক ও বীজ ব্যাংক হলো প্রাকৃতিক আবাসস্থলের বাইরে কৃত্রিম অনুকূল স্থানে সংরক্ষণ অর্থাৎ এক্স-সিটু সংরক্ষণ।",
      distractorAnalysis: {
        opt_bio_13_76_a: "জাতীয় উদ্যান হলো ইন-সিটু সংরক্ষণ।",
        opt_bio_13_76_b: "বন্যপ্রাণী অভয়ারণ্য হলো ইন-সিটু সংরক্ষণ।",
        opt_bio_13_76_d: "রামসার জলাভূমি হলো ইন-সিটু সংরক্ষণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 303
      },
      proTipShortcut: "বোটানিক্যাল গার্ডেন ও চিড়িয়াখানা = Ex-situ।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_77",
    topicId: "top_ssc_biology_ch13_6",
    type: "MCQ",
    stem: "আন্তর্জাতিকভাবে স্বীকৃত জলাভূমি সংক্রান্ত 'রামসার কনভেনশন' (Ramsar Site) অনুযায়ী বাংলাদেশের কোন দুটি স্থান তালিকাভুক্ত?",
    options: [
      { id: "opt_bio_13_77_a", text: "সুন্দরবন ও টাঙ্গুয়ার হাওড়", isCorrect: true },
      { id: "opt_bio_13_77_b", text: "কাপ্তাই হ্রদ ও চলনবিল", isCorrect: false },
      { id: "opt_bio_13_77_c", text: "কুয়াকাটা ও সেন্টমার্টিন", isCorrect: false },
      { id: "opt_bio_13_77_d", text: "লাউয়াছড়া ও মধুপুর বন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সুন্দরবন ও টাঙ্গুয়ার হাওড়।",
      coreConcept: "১৯৭২ সালে সুন্দরবন এবং ২০০০ সালে সুনামগঞ্জের টাঙ্গুয়ার হাওড় আন্তর্জাতিক রামসার জলাভূমি সাইট হিসেবে স্বীকৃতি লাভ করে।",
      distractorAnalysis: {
        opt_bio_13_77_b: "চলনবিল ও কাপ্তাই গুরুত্বপূর্ণ জলাশয় হলেও রামসার সাইট নয়।",
        opt_bio_13_77_c: "সেন্টমার্টিন প্রবাল দ্বীপ ও ইকোলজিক্যালি ক্রিটিক্যাল এরিয়া।",
        opt_bio_13_77_d: "লাউয়াছড়া ও মধুপুর হলো জাতীয় উদ্যান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 303
      },
      proTipShortcut: "বাংলাদেশের রামসার সাইট = সুন্দরবন + টাঙ্গুয়ার হাওড়।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_78",
    topicId: "top_ssc_biology_ch13_6",
    type: "MCQ",
    stem: "ক্রায়োপ্রিজারভেশন (Cryopreservation) পদ্ধতিতে কত তাপমাত্রায় কোষ ও টিস্যু সংরক্ষণ করা হয়?",
    options: [
      { id: "opt_bio_13_78_a", text: "০°C", isCorrect: false },
      { id: "opt_bio_13_78_b", text: "-২০°C", isCorrect: false },
      { id: "opt_bio_13_78_c", text: "-৭০°C", isCorrect: false },
      { id: "opt_bio_13_78_d", text: "-১৯৬°C", isCorrect: true }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ঘ: -১৯৬°C।",
      coreConcept: "তরল নাইট্রোজেনের স্ফুটনাঙ্ক -১৯৬°C তাপমাত্রায় শুক্রাণু, ডিম্বাণু, ভ্রূণ বা উদ্ভিদের টিস্যু এক্স-সিটু সংরক্ষণ করে দীর্ঘকাল বাঁচিয়ে রাখা যায়।",
      distractorAnalysis: {
        opt_bio_13_78_a: "০°C হলো পানির হিমাঙ্ক।",
        opt_bio_13_78_b: "-২০°C সাধারণ ফ্রিজারের তাপমাত্রা।",
        opt_bio_13_78_c: "-৭০°C ড্রাই আইসের কাছাকাছি তাপমাত্রা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 303
      },
      proTipShortcut: "তরল নাইট্রোজেন = -১৯৬°C = ক্রায়োপ্রিজারভেশন।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_79",
    topicId: "top_ssc_biology_ch13_6",
    type: "MCQ",
    stem: "উপকূলীয় অঞ্চলে ঘূর্ণিঝড় ও জলোচ্ছ্বাসের ধ্বংসলীলা থেকে বাংলাদেশকে প্রাকৃতিক প্রাচীর হিসেবে রক্ষা করে কোনটি?",
    options: [
      { id: "opt_bio_13_79_a", text: "মধুপুর শালবন", isCorrect: false },
      { id: "opt_bio_13_79_b", text: "সুন্দরবনের ম্যানগ্রোভ বন", isCorrect: true },
      { id: "opt_bio_13_79_c", text: "ভাওয়াল জাতীয় উদ্যান", isCorrect: false },
      { id: "opt_bio_13_79_d", text: "হাকালুকি হাওড়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সুন্দরবনের ম্যানগ্রোভ বন।",
      coreConcept: "সুন্দরবনের নিবিড় শ্বাসমূলীয় গাছপালা (সুন্দরী, গেওয়া, কেওড়া) সামুদ্রিক ঘূর্ণিঝড়ের তীব্র বায়ুপ্রবাহ ও জলোচ্ছ্বাসের আঘাত শোষণ করে জনপদ রক্ষা করে।",
      distractorAnalysis: {
        opt_bio_13_79_a: "মধুপুর শালবন দেশের মধ্যাঞ্চলে অবস্থিত।",
        opt_bio_13_79_c: "ভাওয়াল উদ্যান গাজীপুরে অবস্থিত।",
        opt_bio_13_79_d: "হাকালুকি হাওড় উত্তর-পূর্বাঞ্চলে অবস্থিত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 302
      },
      proTipShortcut: "প্রাকৃতিক দুর্যোগের ঢাল = সুন্দরবন ম্যানগ্রোভ বন।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_80",
    topicId: "top_ssc_biology_ch13_6",
    type: "MCQ",
    stem: "জীববৈচিত্র্য হ্রাসের সবচেয়ে মারাত্মক ও প্রধান কারণ কোনটি?",
    options: [
      { id: "opt_bio_13_80_a", text: "প্রাকৃতিক আবাসস্থল ধ্বংস ও খণ্ডবিখণ্ডকরণ (Habitat loss)", isCorrect: true },
      { id: "opt_bio_13_80_b", text: "মাঝে মাঝে ঝড়-বৃষ্টি হওয়া", isCorrect: false },
      { id: "opt_bio_13_80_c", text: "প্রাণীদের প্রাকৃতিক বার্ধক্য", isCorrect: false },
      { id: "opt_bio_13_80_d", text: "উদ্ভিদের পাতা ঝরে যাওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রাকৃতিক আবাসস্থল ধ্বংস ও খণ্ডবিখণ্ডকরণ (Habitat loss)।",
      coreConcept: "বন উজাড়, জলাশয় ভরাট ও নগরায়নের কারণে বন্যপ্রাণীদের খাদ্য ও আশ্রয়ের প্রাকৃতিক বাসস্থান নষ্ট হয়ে যাওয়াই বিলুপ্তির প্রধান কারণ।",
      distractorAnalysis: {
        opt_bio_13_80_b: "ঝড়-বৃষ্টি স্বাভাবিক প্রাকৃতিক চক্র।",
        opt_bio_13_80_c: "বার্ধক্য একক জীবের বিষয়, প্রজাতি বিলুপ্তির নয়।",
        opt_bio_13_80_d: "পাতা ঝরা উদ্ভিদের স্বাভাবিক শারীরবৃত্তীয় আচরণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 302
      },
      proTipShortcut: "বিলুপ্তির শীর্ষ কারণ = Habitat Destruction।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_81",
    topicId: "top_ssc_biology_ch13_6",
    type: "MCQ",
    stem: "ম্যালেরিয়া রোগের প্রতিষেধক 'কুইনাইন' কোন ঔষধি উদ্ভিদ থেকে তৈরি হয়?",
    options: [
      { id: "opt_bio_13_81_a", text: "সর্পগন্ধা", isCorrect: false },
      { id: "opt_bio_13_81_b", text: "সিনকোনা (Cinchona)", isCorrect: true },
      { id: "opt_bio_13_81_c", text: "কালমেঘ", isCorrect: false },
      { id: "opt_bio_13_81_d", text: "বাসক", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সিনকোনা (Cinchona)।",
      coreConcept: "সিনকোনা গাছের বাকল থেকে নিষ্কাশিত অ্যালকালয়েড 'কুইনাইন' বিশ্বজুড়ে ম্যালেরিয়া চিকিৎসার প্রধান ওষুধ হিসেবে জীববৈচিত্র্যের অমূল্য অর্থনৈতিক মূল্য নির্দেশ করে।",
      distractorAnalysis: {
        opt_bio_13_81_a: "সর্পগন্ধা থেকে উচ্চ রক্তচাপের ওষুধ রেসারপিন পাওয়া যায়।",
        opt_bio_13_81_c: "কালমেঘ যকৃতের চিকিৎসায় ব্যবহৃত হয়।",
        opt_bio_13_81_d: "বাসক কফ ও কাশির উপশমে ব্যবহৃত হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 302
      },
      proTipShortcut: "কুইনাইন = সিনকোনা গাছ।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_82",
    topicId: "top_ssc_biology_ch13_6",
    type: "MCQ",
    stem: "বন্যপ্রাণী সংরক্ষণে 'জাতীয় উদ্যান' (National Park) ঘোষণার প্রধান উদ্দেশ্য কোনটি?",
    options: [
      { id: "opt_bio_13_82_a", text: "প্রাকৃতিক সৌন্দর্য, বন্যপ্রাণী ও ঐতিহাসিক পরিবেশ সংরক্ষণ এবং নিয়ন্ত্রিত বিনোদন", isCorrect: true },
      { id: "opt_bio_13_82_b", text: "গাছ কেটে কাঠ বিক্রি করা", isCorrect: false },
      { id: "opt_bio_13_82_c", text: "বাণিজ্যিক কারখানা স্থাপন করা", isCorrect: false },
      { id: "opt_bio_13_82_d", text: "উন্মুক্ত শিকারের অনুমোদন দেওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রাকৃতিক সৌন্দর্য, বন্যপ্রাণী ও ঐতিহাসিক পরিবেশ সংরক্ষণ এবং নিয়ন্ত্রিত বিনোদন।",
      coreConcept: "জাতীয় উদ্যান সরকারিভাবে সংরক্ষিত সুবিশাল বনাঞ্চল যেখানে উদ্ভিদ ও প্রাণীর প্রাকৃতিক বিচরণ অক্ষুণ্ণ রেখে শিক্ষা ও পরিবেশবান্ধব পর্যটনের সুযোগ থাকে।",
      distractorAnalysis: {
        opt_bio_13_82_b: "জাতীয় উদ্যানে গাছ কাটা সম্পূর্ণ নিষিদ্ধ।",
        opt_bio_13_82_c: "শিল্প কারখানা স্থাপন আইনত দণ্ডনীয়।",
        opt_bio_13_82_d: "শিকার করা সম্পূর্ণ নিষিদ্ধ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 303
      },
      proTipShortcut: "National Park = প্রাকৃতিক পরিবেশ ও বন্যপ্রাণীর আইনগত সুরক্ষা।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_83",
    topicId: "top_ssc_biology_ch13_6",
    type: "MCQ",
    stem: "বিদেশি আগ্রাসী প্রজাতি (Invasive species) স্থানীয় বাস্তুতন্ত্রের ক্ষতি করে কীভাবে?",
    options: [
      { id: "opt_bio_13_83_a", text: "দেশীয় প্রজাতির খাদ্য ও বাসস্থান দখল করে তাদের বিলুপ্তির মুখে ঠেলে দেয়", isCorrect: true },
      { id: "opt_bio_13_83_b", text: "মাটিতে নাইট্রোজেনের পরিমাণ হঠাৎ শূন্য করে দেয়", isCorrect: false },
      { id: "opt_bio_13_83_c", text: "সৌরশক্তির তাপমাত্রা কমিয়ে দেয়", isCorrect: false },
      { id: "opt_bio_13_83_d", text: "বাতাসের সব অক্সিজেন খেয়ে ফেলে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: দেশীয় প্রজাতির খাদ্য ও বাসস্থান দখল করে তাদের বিলুপ্তির মুখে ঠেলে দেয়।",
      coreConcept: "আগ্রাসী প্রজাতি (যেমন কচুরিপানা বা আফ্রিকান মাগুর) দ্রুত বংশবৃদ্ধি করে স্থানীয় প্রজাতির পুষ্টি ও স্থান দখল করে পরিবেশের বৈচিত্র্য হ্রাস করে।",
      distractorAnalysis: {
        opt_bio_13_83_b: "মাটির নাইট্রোজেন শূন্য করে না।",
        opt_bio_13_83_c: "সূর্যের আলোতে প্রভাব ফেলে না।",
        opt_bio_13_83_d: "বাতাসের অক্সিজেন নিঃশেষ করার ক্ষমতা নেই।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 302
      },
      proTipShortcut: "Invasive species = দেশীয় প্রজাতির হুমকি।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_84",
    topicId: "top_ssc_biology_ch13_6",
    type: "MCQ",
    stem: "একটি বনের সমগ্র বাস্তুতান্ত্রিক বৈচিত্র্য সংরক্ষণে সবচেয়ে কার্যকর পদ্ধতি কোনটি?",
    options: [
      { id: "opt_bio_13_84_a", text: "ইন-সিটু সংরক্ষণ (In-situ)", isCorrect: true },
      { id: "opt_bio_13_84_b", text: "এক্স-সিটু সংরক্ষণ (Ex-situ)", isCorrect: false },
      { id: "opt_bio_13_84_c", text: "কেবল বীজ ব্যাংকে বীজ রাখা", isCorrect: false },
      { id: "opt_bio_13_84_d", text: "কেবল চিড়িয়াখানায় প্রাণী রাখা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ইন-সিটু সংরক্ষণ (In-situ)।",
      coreConcept: "ইন-সিটু পদ্ধতিতে পুরো প্রাকৃতিক বাসস্থানের সকল উদ্ভিদ, প্রাণী ও অণুজীব একসাথে প্রাকৃতিক খাদ্যজালে সুরক্ষিত থাকে, যা কৃত্রিমভাবে সম্ভব নয়।",
      distractorAnalysis: {
        opt_bio_13_84_b: "এক্স-সিটু পদ্ধতিতে কেবল নির্দিষ্ট কয়েকটি বিপন্ন জীব সংরক্ষণ সম্ভব, সমগ্র বাস্তুতন্ত্র নয়।",
        opt_bio_13_84_c: "বীজ ব্যাংক কেবল উদ্ভিদের প্রজনন উপাদান রাখে।",
        opt_bio_13_84_d: "চিড়িয়াখানা কৃত্রিম খাঁচায় সীমিত সংখ্যক প্রাণী রাখে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 303
      },
      proTipShortcut: "সমগ্র বাস্তুতন্ত্র সংরক্ষণ = ইন-সিটু।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------------------
  // Creative Questions (CQs: q_bio_13_85 to q_bio_13_90)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_13_85",
    topicId: "top_ssc_biology_ch13_5",
    type: "CQ_CREATIVE",
    stem: "অনন্যা বাড়ির বাগানে একটি আম গাছের ডালে সুন্দর ফুলসহ রাস্না (অর্কিড) বেড়ে উঠতে দেখল। আম গাছটির কোনো ক্ষতি না হলেও অর্কিডটি সতেজ ছিল। কিন্তু পাশের একটি কুল গাছে সে দেখল হলুদ রঙের সুতার মতো স্বর্ণলতা সম্পূর্ণ গাছটিকে জড়িয়ে রেখেছে এবং গাছটির পাতা শুকিয়ে যাচ্ছে।",
    options: null,
    explanation: {
      directAnswer: "রাস্না হলো কমেনসালিজমের দৃষ্টান্ত এবং স্বর্ণলতা হলো পরজীবিতার দৃষ্টান্ত।",
      coreConcept: "ধনাত্মক মিথস্ক্রিয়ায় কেউ ক্ষতিগ্রস্ত হয় না, কিন্তু ঋণাত্মক মিথস্ক্রিয়ায় পোষক জীব মারাত্মকভাবে ক্ষতিগ্রস্ত হয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 298
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "মিথস্ক্রিয়া বা আন্তঃক্রিয়া কাকে বলে তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "স্বর্ণলতা ক্লোরোফিলবিহীন হওয়ায় কীভাবে বাঁচে ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "উদ্দীপকের আম গাছ ও রাস্না উদ্ভিদের মধ্যকার সম্পর্কের ধরন বৈশিষ্ট্যসহ ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "রাস্না ও স্বর্ণলতার জীবনধারণ পদ্ধতির তুলনামূলক বিশ্লেষণ করে কেন একটি ধনাত্মক ও অন্যটি ঋণাত্মক তা মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_86",
    topicId: "top_ssc_biology_ch13_5",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান প্রদর্শনীর একটি স্টলে দুটি জীবন্ত নমুনা রাখা হয়েছে:\nনমুনা A: পাথরের ওপর জন্মানো লাইকেন (শৈবাল ও ছত্রাকের মিলন)।\nনমুনা B: একটি পেট্রিডিশে কালচার করা Penicillium ছত্রাক, যার আশেপাশে ব্যাকটেরিয়ার কোনো কলোনি নেই।",
    options: null,
    explanation: {
      directAnswer: "নমুনা A হলো মিউচুয়ালিজম এবং নমুনা B হলো অ্যান্টিবায়োসিস।",
      coreConcept: "মিউচুয়ালিজমে উভয় জীব পরস্পরকে সহায়তা করে বাঁচে, পক্ষান্তরে অ্যান্টিবায়োসিসে একটি জীবের ক্ষরণে অপর জীব নিশ্চিহ্ন হয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 298
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "অ্যান্টিবায়োসিস কাকে বলে তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "লাইকেনকে উদ্ভিদের প্রথম অগ্রগামী প্রজাতি (Pioneer) বলা হয় কেন ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "নমুনা A-তে শৈবাল ও ছত্রাক কীভাবে একে অপরের ওপর নির্ভরশীল তা ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "নমুনা B-এর বৈজ্ঞানিক তাৎপর্য চিকিৎসা বিজ্ঞানের যুগান্তকারী আবিষ্কারের সাথে সম্পর্কযুক্ত করে বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_87",
    topicId: "top_ssc_biology_ch13_5",
    type: "CQ_CREATIVE",
    stem: "একটি বন্য অঞ্চলে খরার কারণে পানির জলাশয় কমে গেল। দেখা গেল অবশিষ্ট একমাত্র জলাশয়ের পানি পানের জন্য চিতাবাঘ ও হায়েনার দল মুখোমুখি অবস্থানে লড়াই করছে। অন্যদিকে একই জলাশয়ের পাশে একটি শিমুল গাছে মৌমাছি ফুলের মধু খাচ্ছে এবং ফুলের পরাগায়ন ঘটাচ্ছে।",
    options: null,
    explanation: {
      directAnswer: "চিতাবাঘ ও হায়েনার লড়াই হলো আন্তঃপ্রজাতিক প্রতিযোগিতা এবং মৌমাছি ও ফুলের সম্পর্ক হলো মিউচুয়ালিজম।",
      coreConcept: "সীমিত সম্পদের জন্য প্রতিযোগিতা জীবের ক্ষতি ঘটায়, পক্ষান্তরে সহযোগিতামূলক মিথস্ক্রিয়া জীবন টিকিয়ে রাখতে সাহায্য করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৫",
        pageNumber: 299
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "কমেনসালিজমের সংজ্ঞা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অন্তঃপ্রজাতিক ও আন্তঃপ্রজাতিক প্রতিযোগিতার মূল পার্থক্য ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "উদ্দীপকে মৌমাছি ও ফুলের সহাবস্থানের মিথস্ক্রিয়াটির গুরুত্ব ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "প্রাকৃতিক সম্পদে সংকট দেখা দিলে জীব সম্প্রদায়ের আন্তঃক্রিয়ায় কী ধরণের রূপান্তর ঘটে তা মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_88",
    topicId: "top_ssc_biology_ch13_6",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান ক্লাসে শিক্ষক বললেন, “বাংলাদেশের সুন্দরবন কেবল রয়েল বেঙ্গল টাইগার ও চিত্রা হরিণের আবাসস্থলই নয়, বরং এটি বঙ্গোপসাগরের প্রলয়ঙ্করী ঘূর্ণিঝড় ও জলোচ্ছ্বাস থেকে দেশকে রক্ষা করে। সম্প্রতি অতিরিক্ত বৃক্ষ নিধন ও শিকারের কারণে সুন্দরবনের বাস্তুতন্ত্র সংকটের মুখে পড়েছে। তাই সরকার সুন্দরবনকে অভয়ারণ্য এবং রামসার সাইট ঘোষণা করে বিশেষ সুরক্ষার ব্যবস্থা করেছে।”",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে জীববৈচিত্র্যের পরিবেশগত মূল্য এবং ইন-সিটু সংরক্ষণের বাস্তব দৃষ্টান্ত তুলে ধরা হয়েছে।",
      coreConcept: "প্রাকৃতিক ম্যানগ্রোভ বাস্তুতন্ত্র উপকূলীয় রক্ষাকবচ এবং ইন-সিটু সংরক্ষণ জীববৈচিত্র্য রক্ষার শ্রেষ্ঠ উপায়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 302
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জীববৈচিত্র্য কাকে বলে তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "রামসার সাইট কী এবং কেন ঘোষণা করা হয় তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "সুন্দরবন কীভাবে প্রাকৃতিক দুর্যোগ থেকে উপকূল রক্ষা করে উদ্দীপকের আলোকে ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "সুন্দরবনের জীববৈচিত্র্য রক্ষায় ইন-সিটু সংরক্ষণের কার্যকারিতা ও প্রয়োজনীয় পদক্ষেপ বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_89",
    topicId: "top_ssc_biology_ch13_6",
    type: "CQ_CREATIVE",
    stem: "একটি বিপন্ন প্রজাতির কচ্ছপ প্রাকৃতিক নদী ও জলাশয় দূষণের কারণে বিলুপ্তির মুখে পড়ল। বিজ্ঞানীরা কচ্ছপগুলোর কয়েকটি ডিম ও পূর্ণাঙ্গ সদস্য সংগ্রহ করে বিশেষ গবেষণা কেন্দ্রের কৃত্রিম হ্যাচারিতে এনে কৃত্রিম তাপমাত্রা ও খাবার দিয়ে বাচ্চা ফুটিয়ে বড় করলেন। পরবর্তীতে এদের সংখ্যা বৃদ্ধি পেলে আবার প্রাকৃতিক নদীতে অবমুক্ত করা হলো।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে এক্স-সিটু সংরক্ষণের মাধ্যমে বিপন্ন প্রজাতি রক্ষা করে পুনরায় ইন-সিটু পরিবেশে পুনর্বাসনের প্রক্রিয়া বর্ণিত হয়েছে।",
      coreConcept: "এক্স-সিটু সংরক্ষণ সংকটকালীন সময়ে প্রজাতির বিলুপ্তি রোধে জরুরি ভূমিকা পালন করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 303
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "এক্স-সিটু সংরক্ষণ কাকে বলে তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "ক্রায়োপ্রিজারভেশন কেন একটি গুরুত্বপূর্ণ সংরক্ষণ কৌশল তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "উদ্দীপকে বিজ্ঞানীদের গৃহীত কৃত্রিম হ্যাচারি পদ্ধতিটি কোন ধরনের সংরক্ষণ তা বুঝিয়ে লিখলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "“বিপন্ন প্রজাতি রক্ষায় ইন-সিটু ও এক্স-সিটু উভয় পদ্ধতিই পরস্পরের পরিপূরক”—উক্তিটির যথার্থতা মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "HARD",
    boardSource: "দিনাজপুর বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_90",
    topicId: "top_ssc_biology_ch13_6",
    type: "CQ_CREATIVE",
    stem: "বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI) দেশের বিভিন্ন প্রান্ত থেকে ধানের সহস্রাধিক জাত সংগ্রহ করে জিন ব্যাংকে ও ল্যাবে সংরক্ষণ করেছে। বিজ্ঞানীরা এর মধ্য থেকে কিছু জাতের জিন কাজে লাগিয়ে লবণাক্ততা-সহনশীল ও খরা-সহনশীল নতুন জাতের ব্রি ধান উদ্ভাবন করেছেন, যা জলবায়ু পরিবর্তনের ঝুঁকিতে থাকা উপকূলীয় এলাকায় কৃষকদের খাদ্য নিরাপত্তা দিচ্ছে।",
    options: null,
    explanation: {
      directAnswer: "জিনগত বৈচিত্র্য সংরক্ষণ এবং জিন ব্যাংকের সহায়তায় ফসলের টেকসই জাত উন্নয়ন মানবজাতির খাদ্য নিরাপত্তার মূল ভিত্তি।",
      coreConcept: "জিনগত বৈচিত্র্য প্রতিকূল পরিবেশে টিকে থাকার সক্ষমতা তৈরি করে এবং এক্স-সিটু জিন ব্যাংক ভবিষ্যৎ প্রজননের উৎস হিসেবে কাজ করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৬",
        pageNumber: 301
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জিনগত বৈচিত্র্য কাকে বলে তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "প্রজাতি বৈচিত্র্য ও বাস্তুতান্ত্রিক বৈচিত্র্যের পার্থক্য ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "উদ্দীপকে ব্রি বিজ্ঞানীদের জিন ব্যাংক ব্যবহারের প্রক্রিয়াটি কোন ধরণের সংরক্ষণ এবং কেন তা ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "জলবায়ু পরিবর্তন ও ভবিষ্যতের খাদ্য সংকট মোকাবেলায় জীববৈচিত্র্য সংরক্ষণের ভূমিকা বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
