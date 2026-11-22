import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter13QuestionsBatch2: QuestionData[] = [
  // -------------------------------------------------------------------------
  // Topic 13.3: বাস্তুতন্ত্রে শক্তি প্রবাহ ও ট্রফিক লেভেল (MCQs: q_bio_13_31 to q_bio_13_42)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_13_31",
    topicId: "top_ssc_biology_ch13_3",
    type: "MCQ",
    stem: "সবুজ উদ্ভিদ আপতিত মোট সূর্যালোকের কত শতাংশ সালোকসংশ্লেষণের মাধ্যমে রাসায়নিক শক্তিতে রূপান্তর করতে পারে?",
    options: [
      { id: "opt_bio_13_31_a", text: "১-২%", isCorrect: true },
      { id: "opt_bio_13_31_b", text: "১০%", isCorrect: false },
      { id: "opt_bio_13_31_c", text: "৫০%", isCorrect: false },
      { id: "opt_bio_13_31_d", text: "৮০-৯০%", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ১-২%।",
      coreConcept: "পৃথিবীতে আপতিত মোট সৌরশক্তির মাত্র ১ থেকে ২ শতাংশ সবুজ উদ্ভিদ সালোকসংশ্লেষণ প্রক্রিয়ায় গ্লুকোজ বা শর্করা হিসেবে রাসায়নিক শক্তিতে আবদ্ধ করতে পারে।",
      distractorAnalysis: {
        opt_bio_13_31_b: "১০% হলো এক ট্রফিক স্তর থেকে পরবর্তী ট্রফিক স্তরে খাদ্যশক্তি স্থানান্তরের হার (লিন্ডেম্যানের ১০% সূত্র)।",
        opt_bio_13_31_c: "৫০% সৌরশক্তি প্রতিফলিত ও শোষিত হয়।",
        opt_bio_13_31_d: "৯০% শক্তি প্রতিটি ট্রফিক স্তরে বিপাকীয় তাপে অপচয় হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 291
      },
      proTipShortcut: "উদ্ভিদ আবদ্ধ করে ১-২%; ট্রফিকে স্থানান্তরিত হয় ১০%।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_32",
    topicId: "top_ssc_biology_ch13_3",
    type: "MCQ",
    stem: "বাস্তুতন্ত্রে শক্তি প্রবাহের অন্যতম অপরিবর্তনীয় নিয়ম কোনটি?",
    options: [
      { id: "opt_bio_13_32_a", text: "শক্তির প্রবাহ সর্বদা চক্রাকার", isCorrect: false },
      { id: "opt_bio_13_32_b", text: "শক্তির প্রবাহ সর্বদা একমুখী (Unidirectional)", isCorrect: true },
      { id: "opt_bio_13_32_c", text: "শীর্ষ খাদক থেকে উৎপাদকে শক্তি স্থানান্তরিত হয়", isCorrect: false },
      { id: "opt_bio_13_32_d", text: "বিয়োজকরা পুনরায় শক্তিকে সূর্যে ফেরত পাঠায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: শক্তির প্রবাহ সর্বদা একমুখী (Unidirectional)।",
      coreConcept: "শক্তি সূর্য থেকে উৎপাদক হয়ে ক্রমান্বয়ে খাদকে প্রবাহিত হয় এবং তাপ হিসেবে মহাশূন্যে বিকিরিত হয়; এই শক্তি কখনোই পুনরায় পূর্ববর্তী স্তরে বা সূর্যে ফেরে না।",
      distractorAnalysis: {
        opt_bio_13_32_a: "পুষ্টি উপাদান চক্রাকার, কিন্তু শক্তি প্রবাহ একমুখী।",
        opt_bio_13_32_c: "খাদক থেকে উৎপাদকে শক্তি প্রবাহ কখনোই ঘটে না।",
        opt_bio_13_32_d: "শক্তি কখনোই সূর্যে ফিরে যেতে পারে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 292
      },
      proTipShortcut: "পুষ্টি = চক্রাকার; শক্তি = একমুখী।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_33",
    topicId: "top_ssc_biology_ch13_3",
    type: "MCQ",
    stem: "বাস্তুতন্ত্রের খাদ্য শৃঙ্খলে প্রতি ধাপে আনুমানিক কত শতাংশ শক্তি তাপ ও বিপাকীয় কাজে অপচয় হয়?",
    options: [
      { id: "opt_bio_13_33_a", text: "১০%", isCorrect: false },
      { id: "opt_bio_13_33_b", text: "৫০%", isCorrect: false },
      { id: "opt_bio_13_33_c", text: "৯০%", isCorrect: true },
      { id: "opt_bio_13_33_d", text: "১০০%", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৯০%।",
      coreConcept: "প্রতিটি ট্রফিক স্তরের জীব তার গৃহীত শক্তির প্রায় ৯০% শ্বসন, চলন, তাপ উৎপাদন ও রেচনে ব্যয় করে ফেলে, ফলে পরবর্তী স্তরে সঞ্চিত হয় মাত্র ১০% শক্তি।",
      distractorAnalysis: {
        opt_bio_13_33_a: "১০% হলো পরবর্তী পুষ্টি স্তরে স্থানান্তরিত শক্তির পরিমাণ।",
        opt_bio_13_33_b: "৫০% অপচয় হয় না, অপচয়ের পরিমাণ প্রায় ৯০%।",
        opt_bio_13_33_d: "১০০% অপচয় হলে কোনো জীবই বেঁচে থাকতে পারত না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 292
      },
      proTipShortcut: "অপচয় ৯০% = সঞ্চিত ১০%।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_34",
    topicId: "top_ssc_biology_ch13_3",
    type: "MCQ",
    stem: "যদি একটি খাদ্য শৃঙ্খলে উৎপাদকে ১,০০০ কিলোক্যালরি শক্তি থাকে, তবে ৩য় স্তরের খাদক (T4) কতটুকু শক্তি পাবে?",
    options: [
      { id: "opt_bio_13_34_a", text: "১০০ কিলোক্যালরি", isCorrect: false },
      { id: "opt_bio_13_34_b", text: "১০ কিলোক্যালরি", isCorrect: false },
      { id: "opt_bio_13_34_c", text: "১ কিলোক্যালরি", isCorrect: true },
      { id: "opt_bio_13_34_d", text: "০.১ কিলোক্যালরি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ১ কিলোক্যালরি।",
      coreConcept: "উৎপাদক (T1) = ১০০০ kcal → ১ম স্তরের খাদক (T2) = ১০০ kcal → ২য় স্তরের খাদক (T3) = ১০ kcal → ৩য় স্তরের খাদক (T4) = ১ kcal।",
      distractorAnalysis: {
        opt_bio_13_34_a: "১০০ kcal পায় ১ম স্তরের তৃণভোজী খাদক (T2)।",
        opt_bio_13_34_b: "১০ kcal পায় ২য় স্তরের খাদক (T3)।",
        opt_bio_13_34_d: "০.১ kcal পেত যদি ৪র্থ স্তরের খাদক থাকত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 292
      },
      proTipShortcut: "প্রতি ধাপে এক ঘর দশমিক বামে সরবে: ১০০০ → ১০০ → ১০ → ১।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_35",
    topicId: "top_ssc_biology_ch13_3",
    type: "MCQ",
    stem: "শক্তির পিরামিড (Pyramid of Energy) সর্বদা খাড়া বা সোজা (Upright) হয় কেন?",
    options: [
      { id: "opt_bio_13_35_a", text: "কারণ উচ্চতর পুষ্টি স্তরে শক্তির পরিমাণ ক্রমান্বয়ে বৃদ্ধি পায়", isCorrect: false },
      { id: "opt_bio_13_35_b", text: "কারণ উৎপাদক স্তরে শক্তি সর্বোচ্চ থাকে এবং প্রতিটি পরবর্তী ধাপে শক্তি হ্রাস পায়", isCorrect: true },
      { id: "opt_bio_13_35_c", text: "কারণ এটি কেবল স্থলজ বাস্তুতন্ত্রে প্রযোজ্য", isCorrect: false },
      { id: "opt_bio_13_35_d", text: "কারণ বিয়োজক শক্তি শোষণ করে পিরামিড সোজা রাখে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কারণ উৎপাদক স্তরে শক্তি সর্বোচ্চ থাকে এবং প্রতিটি পরবর্তী ধাপে শক্তি হ্রাস পায়।",
      coreConcept: "শক্তির স্থানান্তর প্রতি ধাপে ৯০% অপচয় হওয়ায় ভিত্তি (উৎপাদক) সর্বদা প্রশস্ত এবং চূড়া (শীর্ষ খাদক) সর্বদা সরু হয়; তাই শক্তির পিরামিড কখনোই উল্টানো হতে পারে না।",
      distractorAnalysis: {
        opt_bio_13_35_a: "উচ্চ স্তরে শক্তি কখনো বাড়ে না, বরং তীব্রভাবে কমে।",
        opt_bio_13_35_c: "এটি জল ও স্থল সকল বাস্তুতন্ত্রেই খাড়া থাকে।",
        opt_bio_13_35_d: "বিয়োজকের ভূমিকার কারণে নয়, ট্রফিক শক্তি হ্রাসের কারণে খাড়া থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 293
      },
      proTipShortcut: "শক্তির পিরামিড = সর্বদা সোজা (Always Upright)।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_36",
    topicId: "top_ssc_biology_ch13_3",
    type: "MCQ",
    stem: "বাস্তুতন্ত্রের খাদ্য শৃঙ্খল সাধারণত ৪ বা ৫ টির বেশি ট্রফিক স্তরে বিস্তৃত হতে পারে না কেন?",
    options: [
      { id: "opt_bio_13_36_a", text: "কারণ চতুর্থ বা পঞ্চম স্তরের পর পরবর্তী জীবকে বাঁচিয়ে রাখার মতো পর্যাপ্ত শক্তি অবশিষ্ট থাকে না", isCorrect: true },
      { id: "opt_bio_13_36_b", text: "কারণ শিকারী প্রাণীদের আয়ু অনেক কম", isCorrect: false },
      { id: "opt_bio_13_36_c", text: "কারণ সূর্যালোক মাটিতে পৌঁছাতে পারে না", isCorrect: false },
      { id: "opt_bio_13_36_d", text: "কারণ বিয়োজকরা শীর্ষ স্তরের খাদকদের আক্রমণ করে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কারণ চতুর্থ বা পঞ্চম স্তরের পর পরবর্তী জীবকে বাঁচিয়ে রাখার মতো পর্যাপ্ত শক্তি অবশিষ্ট থাকে না।",
      coreConcept: "প্রতি ধাপে ৯০% শক্তি বিপাকে নষ্ট হওয়ায় ৪র্থ বা ৫ম স্তরে এসে শক্তির পরিমাণ এতই নগণ্য হয়ে পড়ে যে তা দিয়ে আরও একটি উচ্চতর পুষ্টি স্তর টিকিয়ে রাখা সম্ভব হয় না।",
      distractorAnalysis: {
        opt_bio_13_36_b: "প্রাণীদের আয়ু খাদ্য শৃঙ্খলের দৈর্ঘ্যের কারণ নয়।",
        opt_bio_13_36_c: "সূর্যালোক উদ্ভিদে এসে পড়ে, ওপরের স্তরে নয়।",
        opt_bio_13_36_d: "বিয়োজক কেবল মৃতদেহের ওপর কাজ করে, জীবিত খাদককে আক্রমণ করে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 292
      },
      proTipShortcut: "শক্তি ক্ষয় ৯৯.৯% হয়ে যায় বলেই শৃঙ্খল ছোট হয়।"
    },
    difficulty: "HARD",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_37",
    topicId: "top_ssc_biology_ch13_3",
    type: "MCQ",
    stem: "ট্রফিক স্তরে শক্তি স্থানান্তরের ১০% সূত্রটি (10% Law) কত সালে কে প্রস্তাব করেন?",
    options: [
      { id: "opt_bio_13_37_a", text: "১৯৩৫ সালে এ. জি. ট্যান্সলে", isCorrect: false },
      { id: "opt_bio_13_37_b", text: "১৯৪২ সালে রেমন্ড লিন্ডেম্যান", isCorrect: true },
      { id: "opt_bio_13_37_c", text: "১৮৬৬ সালে আর্নস্ট হেকেল", isCorrect: false },
      { id: "opt_bio_13_37_d", text: "১৯৬৯ সালে হুইটটেকার", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ১৯৪২ সালে রেমন্ড লিন্ডেম্যান।",
      coreConcept: "আমেরিকান বাস্তুবিদ রেমন্ড লিন্ডেম্যান (Raymond Lindeman, 1942) ট্রফিক গতিবিদ্যায় ১০% শক্তি রূপান্তরের যুগান্তকারী সূত্র প্রদান করেন।",
      distractorAnalysis: {
        opt_bio_13_37_a: "১৯৩৫ সালে ট্যান্সলে বাস্তুতন্ত্র শব্দটি প্রস্তাব করেন।",
        opt_bio_13_37_c: "হেকেল বাস্তুবিদ্যার সংজ্ঞা দেন।",
        opt_bio_13_37_d: "হুইটটেকার ৫ রাজ্য শ্রেণিবিন্যাস প্রস্তাব করেন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 292
      },
      proTipShortcut: "Lindeman (1942) = 10% Law।"
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_38",
    topicId: "top_ssc_biology_ch13_3",
    type: "MCQ",
    stem: "বাস্তুতন্ত্রের কোন স্তরে জীবের মোট শুষ্ক ওজন বা বায়োমাস (Biomass) সাধারণত সবচেয়ে বেশি থাকে?",
    options: [
      { id: "opt_bio_13_38_a", text: "শীর্ষ মাংসাশী স্তরে", isCorrect: false },
      { id: "opt_bio_13_38_b", text: "উৎপাদক স্তরে (T1)", isCorrect: true },
      { id: "opt_bio_13_38_c", text: "২য় স্তরের খাদকে", isCorrect: false },
      { id: "opt_bio_13_38_d", text: "কেবল বিয়োজক স্তরে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: উৎপাদক স্তরে (T1)।",
      coreConcept: "স্থলজ বাস্তুতন্ত্রে উৎপাদক সবুজ উদ্ভিদের মোট জৈব ভর বা বায়োমাস অন্যান্য সকল স্তরের সম্মিলিত ভরের তুলনায় বহুগুণ বেশি থাকে।",
      distractorAnalysis: {
        opt_bio_13_38_a: "শীর্ষ মাংসাশী প্রাণীর সংখ্যা ও মোট ভর সবচেয়ে কম থাকে।",
        opt_bio_13_38_c: "২য় স্তরের খাদকের ভর উৎপাদক অপেক্ষা অনেক কম।",
        opt_bio_13_38_d: "বিয়োজকের ভর উৎপাদকের চেয়ে বেশি নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 293
      },
      proTipShortcut: "ভিত্তি বড় = উৎপাদক স্তরে শক্তি ও বায়োমাস সর্বোচ্চ।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_39",
    topicId: "top_ssc_biology_ch13_3",
    type: "MCQ",
    stem: "জীবদেহ থেকে শক্তির অপচয় মূলত কোন শারীরবৃত্তীয় প্রক্রিয়ায় তাপ হিসেবে ঘটে?",
    options: [
      { id: "opt_bio_13_39_a", text: "শ্বসন (Respiration)", isCorrect: true },
      { id: "opt_bio_13_39_b", text: "সালোকসংশ্লেষণ", isCorrect: false },
      { id: "opt_bio_13_39_c", text: "অ্যান্টিবায়োসিস", isCorrect: false },
      { id: "opt_bio_13_39_d", text: "নাইট্রিফিকেশন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: শ্বসন (Respiration)।",
      coreConcept: "সকল সজীব কোষে সংঘটিত শ্বসন প্রক্রিয়ায় গ্লুকোজ জারিত হয়ে এটিপি তৈরি করে এবং বড় একটি অংশ তাপশক্তি হিসেবে পরিবেশে নির্গত হয়।",
      distractorAnalysis: {
        opt_bio_13_39_b: "সালোকসংশ্লেষণ শক্তি গ্রহণ করে, শক্তি অপচয় করে না।",
        opt_bio_13_39_c: "অ্যান্টিবায়োসিস হলো জীবের রাসায়নিক মিথস্ক্রিয়া।",
        opt_bio_13_39_d: "নাইট্রিফিকেশন হলো মাটিতে ব্যাকটেরিয়ার নাইট্রোজেন জারণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 292
      },
      proTipShortcut: "তাপ ক্ষয় = শ্বসন ক্রিয়া।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_40",
    topicId: "top_ssc_biology_ch13_3",
    type: "MCQ",
    stem: "বাস্তুতন্ত্রে শক্তি সংরক্ষণের সূত্র (Thermodynamics) অনুসারে কোনটি সত্য?",
    options: [
      { id: "opt_bio_13_40_a", text: "শক্তি সৃষ্টি বা ধ্বংস হতে পারে", isCorrect: false },
      { id: "opt_bio_13_40_b", text: "শক্তি কেবল এক রূপ থেকে অন্য রূপে রূপান্তরিত হতে পারে", isCorrect: true },
      { id: "opt_bio_13_40_c", text: "খাদকরা কোনো শক্তি ব্যয় ছাড়াই বৃদ্ধি পায়", isCorrect: false },
      { id: "opt_bio_13_40_d", text: "উদ্ভিদ ১০০% সূর্যালোক শক্তিতে রূপান্তর করে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: শক্তি কেবল এক রূপ থেকে অন্য রূপে রূপান্তরিত হতে পারে।",
      coreConcept: "তাপগতিবিদ্যার ১ম সূত্র অনুযায়ী শক্তি ধ্বংস হয় না, সৌর আলোকশক্তি উদ্ভিদে রাসায়নিক স্থিতিশক্তিতে এবং প্রাণীতে তাপ ও যান্ত্রিক শক্তিতে রূপান্তরিত হয়।",
      distractorAnalysis: {
        opt_bio_13_40_a: "শক্তি কখনো সৃষ্টি বা ধ্বংস হয় না।",
        opt_bio_13_40_c: "খাদকরা বিপাকে বিপুল শক্তি ব্যয় করে।",
        opt_bio_13_40_d: "উদ্ভিদ মাত্র ১-২% সৌরশক্তি আবদ্ধ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 291
      },
      proTipShortcut: "সৌরশক্তি → রাসায়নিক শক্তি → তাপশক্তি।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_41",
    topicId: "top_ssc_biology_ch13_3",
    type: "MCQ",
    stem: "কোন পুষ্টি স্তরে শক্তির ঘনত্ব সবচেয়ে কম থাকে?",
    options: [
      { id: "opt_bio_13_41_a", text: "উৎপাদক স্তরে", isCorrect: false },
      { id: "opt_bio_13_41_b", text: "তৃণভোজী স্তরে", isCorrect: false },
      { id: "opt_bio_13_41_c", text: "সর্বোচ্চ বা শীর্ষ খাদক স্তরে", isCorrect: true },
      { id: "opt_bio_13_41_d", text: "সকল স্তরে সমান", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: সর্বোচ্চ বা শীর্ষ খাদক স্তরে।",
      coreConcept: "প্রতি ধাপে ৯০% শক্তি অপচয় হতে হতে শীর্ষ পুষ্টি স্তরে (T4) পৌঁছাতে মোট আদি সৌরশক্তির মাত্র ০.০০১% অবশিষ্ট থাকে, তাই এখানে সঞ্চিত শক্তি সর্বনিম্ন।",
      distractorAnalysis: {
        opt_bio_13_41_a: "উৎপাদকে সঞ্চিত শক্তি সবচেয়ে বেশি থাকে।",
        opt_bio_13_41_b: "তৃণভোজীতে মাংসাশীর চেয়ে অনেক বেশি শক্তি থাকে।",
        opt_bio_13_41_d: "প্রতি স্তরে শক্তির পরিমাণ সমান নয়, ক্রমান্বয়ে কমতে থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 293
      },
      proTipShortcut: "শীর্ষ খাদক = সর্বনিম্ন অবশিষ্ট শক্তি।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_42",
    topicId: "top_ssc_biology_ch13_3",
    type: "MCQ",
    stem: "“ঘাস (১০,০০০ J) → হরিণ (১,০০০ J) → বাঘ (X J)”—এখানে X এর মান কত?",
    options: [
      { id: "opt_bio_13_42_a", text: "১০০ J", isCorrect: true },
      { id: "opt_bio_13_42_b", text: "৫০০ J", isCorrect: false },
      { id: "opt_bio_13_42_c", text: "১০ J", isCorrect: false },
      { id: "opt_bio_13_42_d", text: "১ J", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ১০০ J।",
      coreConcept: "লিন্ডেম্যানের ১০% নীতি অনুযায়ী হরিণের ১,০০০ জুলের মাত্র ১০% অর্থাৎ ১০০ জুল বাঘের দেহে সঞ্চিত হবে ($১,০০০ \times ১০\% = ১০০\text{ J}$)।",
      distractorAnalysis: {
        opt_bio_13_42_b: "৫০% শক্তি স্থানান্তরিত হয় না, মাত্র ১০% হয়।",
        opt_bio_13_42_c: "১০ জুল পেত যদি বাঘের পরে আরও কোনো খাদক থাকত।",
        opt_bio_13_42_d: "১ জুল হলো তার পরবর্তী স্তরের হিসাব।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 292
      },
      proTipShortcut: "১০০০ এর ১০% = ১০০ জুল।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------------------
  // Topic 13.4: পুষ্টি উপাদানের চক্রপ্রবাহ (MCQs: q_bio_13_43 to q_bio_13_54)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_13_43",
    topicId: "top_ssc_biology_ch13_4",
    type: "MCQ",
    stem: "বায়ুমণ্ডলে মুক্ত নাইট্রোজেন ($N_2$) গ্যাসের শতকরা অনুপাত কত?",
    options: [
      { id: "opt_bio_13_43_a", text: "২০.৯%", isCorrect: false },
      { id: "opt_bio_13_43_b", text: "৭৮.০৯%", isCorrect: true },
      { id: "opt_bio_13_43_c", text: "০.০৩%", isCorrect: false },
      { id: "opt_bio_13_43_d", text: "০.৯৩%", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ৭৮.০৯%।",
      coreConcept: "বায়ুমণ্ডলে নাইট্রোজেন গ্যাস সবচেয়ে বেশি থাকে—প্রায় ৭৮.০৯%, তবে কোনো জীবই একে সরাসরি পত্ররন্ধ্র বা শ্বাস দিয়ে গ্রহণ করতে পারে না।",
      distractorAnalysis: {
        opt_bio_13_43_a: "২০.৯% হলো অক্সিজেনের শতকরা পরিমাণ।",
        opt_bio_13_43_c: "০.০৩-০.০৪% হলো কার্বন ডাই-অক্সাইডের পরিমাণ।",
        opt_bio_13_43_d: "০.৯৩% হলো নিষ্ক্রিয় আর্গন গ্যাসের পরিমাণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 296
      },
      proTipShortcut: "N2 = ৭৮.০৯%, O2 = ২০.৯%, CO2 = ০.০৩-০.০৪%।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_44",
    topicId: "top_ssc_biology_ch13_4",
    type: "MCQ",
    stem: "শিম ও ডাল জাতীয় উদ্ভিদের মূলের নডিউলে নাইট্রোজেন সংবন্ধন করে কোন ব্যাকটেরিয়া?",
    options: [
      { id: "opt_bio_13_44_a", text: "Nitrosomonas", isCorrect: false },
      { id: "opt_bio_13_44_b", text: "Rhizobium", isCorrect: true },
      { id: "opt_bio_13_44_c", text: "Pseudomonas", isCorrect: false },
      { id: "opt_bio_13_44_d", text: "Nitrobacter", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: Rhizobium।",
      coreConcept: "রাইজোবিয়াম (Rhizobium) ব্যাকটেরিয়া লেগুমিনাস (শিম জাতীয়) উদ্ভিদের মূলে বাস করে মিথোজীবী হিসেবে বায়ুমণ্ডলীয় নাইট্রোজেন আবদ্ধ করে গাছকে দেয়।",
      distractorAnalysis: {
        opt_bio_13_44_a: "Nitrosomonas অ্যামোনিয়াকে নাইট্রাইটে পরিণত করে।",
        opt_bio_13_44_c: "Pseudomonas মাটির নাইট্রেট ভেঙে বায়ুতে N2 গ্যাস ফেরত পাঠায়।",
        opt_bio_13_44_d: "Nitrobacter নাইট্রাইটকে নাইট্রেটে রূপান্তর করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 296
      },
      proTipShortcut: "Rhizobium = মূলের নডিউল = N2 সংবন্ধন।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_45",
    topicId: "top_ssc_biology_ch13_4",
    type: "MCQ",
    stem: "মাটিতে নাইট্রাইট ($NO_2^-$) লবণকে নাইট্রেটে ($NO_3^-$) জারিত করে কোন ব্যাকটেরিয়া?",
    options: [
      { id: "opt_bio_13_45_a", text: "Nitrosomonas", isCorrect: false },
      { id: "opt_bio_13_45_b", text: "Nitrobacter", isCorrect: true },
      { id: "opt_bio_13_45_c", text: "Pseudomonas", isCorrect: false },
      { id: "opt_bio_13_45_d", text: "Clostridium", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: Nitrobacter।",
      coreConcept: "নাইট্রিফিকেশনের ২য় ধাপে নাইট্রোব্যাকটার (Nitrobacter) ব্যাকটেরিয়া নাইট্রাইটকে জারিত করে নাইট্রেট তৈরি করে, যা উদ্ভিদ সহজে শোষণ করতে পারে।",
      distractorAnalysis: {
        opt_bio_13_45_a: "Nitrosomonas ১ম ধাপে অ্যামোনিয়াকে নাইট্রাইটে রূপান্তর করে।",
        opt_bio_13_45_c: "Pseudomonas হলো ডিনাইট্রিফাইং ব্যাকটেরিয়া।",
        opt_bio_13_45_d: "Clostridium হলো মাটিতে মুক্তজীবী নাইট্রোজেন সংবন্ধনকারী ব্যাকটেরিয়া।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 296
      },
      proTipShortcut: "অ্যামোনিয়া → নাইট্রোসোমোনাস → নাইট্রাইট → নাইট্রোব্যাকটার → নাইট্রেট।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_46",
    topicId: "top_ssc_biology_ch13_4",
    type: "MCQ",
    stem: "ডিনাইট্রিফিকেশন (Denitrification) প্রক্রিয়ার প্রধান কাজ কোনটি?",
    options: [
      { id: "opt_bio_13_46_a", text: "বায়ুর মুক্ত নাইট্রোজেনকে মাটিতে আবদ্ধ করা", isCorrect: false },
      { id: "opt_bio_13_46_b", text: "মাটির নাইট্রেট ভেঙে মুক্ত নাইট্রোজেন গ্যাস হিসেবে বায়ুমণ্ডলে ফিরিয়ে দেওয়া", isCorrect: true },
      { id: "opt_bio_13_46_c", text: "ইউরিয়া সার তৈরি করা", isCorrect: false },
      { id: "opt_bio_13_46_d", text: "উদ্ভিদ কোষে প্রোটিন তৈরি করা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মাটির নাইট্রেট ভেঙে মুক্ত নাইট্রোজেন গ্যাস হিসেবে বায়ুমণ্ডলে ফিরিয়ে দেওয়া।",
      coreConcept: "Pseudomonas এবং Thiobacillus ব্যাকটেরিয়া মাটির অতিরিক্ত নাইট্রেট বিশ্লিষ্ট করে মুক্ত N2 গ্যাসে রূপান্তর করে বাতাসে পাঠিয়ে নাইট্রোজেন চক্র সম্পন্ন করে।",
      distractorAnalysis: {
        opt_bio_13_46_a: "এটি নাইট্রোজেন সংবন্ধনের কাজ।",
        opt_bio_13_46_c: "ইউরিয়া শিল্পকারখানায় রাসায়নিকভাবে তৈরি হয়।",
        opt_bio_13_46_d: "প্রোটিন তৈরি উদ্ভিদের আত্তীকরণ প্রক্রিয়া।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 297
      },
      proTipShortcut: "ডি-নাইট্রিফিকেশন = নাইট্রেট ভেঙে বাতাসে ফেরত।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_47",
    topicId: "top_ssc_biology_ch13_4",
    type: "MCQ",
    stem: "বজ্রপাতের সময় উচ্চ তাপে নাইট্রোজেন ও অক্সিজেন বিক্রিয়া করে কোন গ্যাস উৎপন্ন করে?",
    options: [
      { id: "opt_bio_13_47_a", text: "অ্যামোনিয়া (NH3)", isCorrect: false },
      { id: "opt_bio_13_47_b", text: "নাইট্রিক অক্সাইড (NO)", isCorrect: true },
      { id: "opt_bio_13_47_c", text: "নাইট্রোজেন পেন্টক্সাইড", isCorrect: false },
      { id: "opt_bio_13_47_d", text: "মিথেন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: নাইট্রিক অক্সাইড (NO)।",
      coreConcept: "বিদ্যুৎ ক্ষরণের প্রায় ৩০০০°C তাপে N2 + O2 → 2NO বিক্রিয়া ঘটে, যা পরে জারিত হয়ে NO2 হয় এবং বৃষ্টির পানিতে মিশে এসিড বৃষ্টি হয়ে মাটিতে নাইট্রেট গঠন করে।",
      distractorAnalysis: {
        opt_bio_13_47_a: "অ্যামোনিয়া জীবদেহের পচনে গঠিত হয়।",
        opt_bio_13_47_c: "পেন্টক্সাইড সরাসরি বিদ্যুৎ ক্ষরণে প্রধানত হয় না।",
        opt_bio_13_47_d: "মিথেন একটি হাইড্রোকার্বন গ্যাস।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 296
      },
      proTipShortcut: "বজ্রপাত: N2 + O2 → 2NO।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_48",
    topicId: "top_ssc_biology_ch13_4",
    type: "MCQ",
    stem: "কার্বন চক্রে পরিবেশের বায়ুমণ্ডল থেকে কার্বন ডাই-অক্সাইড গ্যাস অপসারণের একমাত্র প্রধান প্রক্রিয়া কোনটি?",
    options: [
      { id: "opt_bio_13_48_a", text: "সালোকসংশ্লেষণ (Photosynthesis)", isCorrect: true },
      { id: "opt_bio_13_48_b", text: "শ্বসন (Respiration)", isCorrect: false },
      { id: "opt_bio_13_48_c", text: "জীবাশ্ম জ্বালানি দহন", isCorrect: false },
      { id: "opt_bio_13_48_d", text: "আগ্নেয়গিরির অগ্ন্যুৎপাত", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সালোকসংশ্লেষণ (Photosynthesis)।",
      coreConcept: "একমাত্র সবুজ উদ্ভিদই সালোকসংশ্লেষণ প্রক্রিয়ায় বায়ুমণ্ডলের কার্বন ডাই-অক্সাইড গ্রহণ করে জৈব শর্করা হিসেবে আবদ্ধ করে; বাকি সকল প্রক্রিয়া CO2 বাতাসে ফেরত দেয়।",
      distractorAnalysis: {
        opt_bio_13_48_b: "শ্বসনে CO2 বাতাসে নির্গত হয়।",
        opt_bio_13_48_c: "দহনে বিপুল পরিমাণ CO2 বাতাসে ছড়ায়।",
        opt_bio_13_48_d: "অগ্ন্যুৎপাতে ভূগর্ভের CO2 বায়ুমণ্ডলে মুক্ত হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 294
      },
      proTipShortcut: "CO2 শোষণকারী = সালোকসংশ্লেষণ।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_49",
    topicId: "top_ssc_biology_ch13_4",
    type: "MCQ",
    stem: "বায়ুমণ্ডলে কার্বন ডাই-অক্সাইডের স্বাভাবিক শতকরা পরিমাণ কত?",
    options: [
      { id: "opt_bio_13_49_a", text: "০.০৩-০.০৪%", isCorrect: true },
      { id: "opt_bio_13_49_b", text: "০.৩-০.৪%", isCorrect: false },
      { id: "opt_bio_13_49_c", text: "৩.০%", isCorrect: false },
      { id: "opt_bio_13_49_d", text: "২১.০%", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ০.০৩-০.০৪%।",
      coreConcept: "বাতাসে কার্বন ডাই-অক্সাইডের ঘনত্ব প্রায় ০.০৩% থেকে ০.০৪% (৩০০-৪০০ পিপিএম); এটি গ্রিনহাউস গ্যাসের ভূমিকা পালন করে পৃথিবীর গড় তাপমাত্রা সহনীয় রাখে।",
      distractorAnalysis: {
        opt_bio_13_49_b: "০.৩% হলে তীব্র গ্রিনহাউস উত্তাপ সৃষ্টি হতো।",
        opt_bio_13_49_c: "৩% ঘনত্ব জীবের জন্য বিষাক্ত।",
        opt_bio_13_49_d: "২১% হলো অক্সিজেনের মাত্রা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 294
      },
      proTipShortcut: "বাতাসে CO2 = ০.০৩-০.০৪%।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_50",
    topicId: "top_ssc_biology_ch13_4",
    type: "MCQ",
    stem: "মৃত জীবদেহ থেকে অ্যামোনিয়া তৈরির প্রক্রিয়াকে কী বলা হয়?",
    options: [
      { id: "opt_bio_13_50_a", text: "অ্যামোনিফিকেশন (Ammonification)", isCorrect: true },
      { id: "opt_bio_13_50_b", text: "নাইট্রিফিকেশন", isCorrect: false },
      { id: "opt_bio_13_50_c", text: "ডিনাইট্রিফিকেশন", isCorrect: false },
      { id: "opt_bio_13_50_d", text: "আত্তীকরণ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ্যামোনিফিকেশন (Ammonification)।",
      coreConcept: "বিয়োজক ব্যাকটেরিয়া ও ছত্রাক মৃতদেহের প্রোটিন ও নাইট্রোজেনঘটিত বর্জ্য ভেঙে অ্যামোনিয়া বা অ্যামোনিয়াম যৌগ তৈরি করার প্রক্রিয়াকে অ্যামোনিফিকেশন বলে।",
      distractorAnalysis: {
        opt_bio_13_50_b: "অ্যামোনিয়া থেকে নাইট্রেট তৈরি হলো নাইট্রিফিকেশন।",
        opt_bio_13_50_c: "নাইট্রেট থেকে N2 গ্যাস হওয়া হলো ডিনাইট্রিফিকেশন।",
        opt_bio_13_50_d: "উদ্ভিদ দ্বারা পুষ্টি গ্রহণ হলো আত্তীকরণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 296
      },
      proTipShortcut: "মৃত প্রোটিন → অ্যামোনিয়া = অ্যামোনিফিকেশন।"
    },
    difficulty: "MEDIUM",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_51",
    topicId: "top_ssc_biology_ch13_4",
    type: "MCQ",
    stem: "উদ্ভিদ মূলরোমের মাধ্যমে মাটি থেকে নাইট্রোজেন প্রধানত কোন যৌগে শোষণ করে?",
    options: [
      { id: "opt_bio_13_51_a", text: "গ্যাসীয় নাইট্রোজেন (N2)", isCorrect: false },
      { id: "opt_bio_13_51_b", text: "নাইট্রেট লবণ (NO3-)", isCorrect: true },
      { id: "opt_bio_13_51_c", text: "নাইট্রোজেন ডাই-অক্সাইড গ্যাস", isCorrect: false },
      { id: "opt_bio_13_51_d", text: "ইউরিয়া দ্রবণ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: নাইট্রেট লবণ (NO3-)।",
      coreConcept: "উদ্ভিদ মূলরোমের মাধ্যমে পানির সাথে দ্রবীভূত নাইট্রেট আয়ন ($NO_3^-$) এবং কিছু ক্ষেত্রে অ্যামোনিয়াম আয়ন ($NH_4^+$) শোষণ করে প্রোটিন সংশ্লেষণ করে।",
      distractorAnalysis: {
        opt_bio_13_51_a: "গ্যাসীয় N2 উদ্ভিদ সরাসরি শোষণ করতে পারে না।",
        opt_bio_13_51_c: "গ্যাসীয় NO2 মূল দ্বারা শোষিত হয় না।",
        opt_bio_13_51_d: "ইউরিয়া মাটিতে ভেঙে অ্যামোনিয়াম ও নাইট্রেটে পরিণত হলে তা শোষিত হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 296
      },
      proTipShortcut: "উদ্ভিদ শোষণ করে নাইট্রেট (NO3-)।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_52",
    topicId: "top_ssc_biology_ch13_4",
    type: "MCQ",
    stem: "মাটিতে মুক্তজীবী (Free-living) নাইট্রোজেন সংবন্ধনকারী ব্যাকটেরিয়ার উদাহরণ কোনটি?",
    options: [
      { id: "opt_bio_13_52_a", text: "Azotobacter এবং Clostridium", isCorrect: true },
      { id: "opt_bio_13_52_b", text: "Rhizobium", isCorrect: false },
      { id: "opt_bio_13_52_c", text: "Pseudomonas", isCorrect: false },
      { id: "opt_bio_13_52_d", text: "Penicillium", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: Azotobacter এবং Clostridium।",
      coreConcept: "অ্যাজোটোব্যাকটার ও ক্লস্ট্রিডিয়াম কোনো উদ্ভিদের আশ্রয় ছাড়াই সরাসরি মাটির রন্ধ্রে মুক্তভাবে বাস করে নাইট্রোজেন সংবন্ধন করতে পারে।",
      distractorAnalysis: {
        opt_bio_13_52_b: "Rhizobium হলো মিথোজীবী (Symbiotic), মুক্তজীবী নয়।",
        opt_bio_13_52_c: "Pseudomonas ডিনাইট্রিফিকেশন ঘটায়।",
        opt_bio_13_52_d: "Penicillium হলো একটি ছত্রাক যা অ্যান্টিবায়োটিক তৈরি করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 296
      },
      proTipShortcut: "মুক্তজীবী = Azotobacter; মিথোজীবী = Rhizobium।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_53",
    topicId: "top_ssc_biology_ch13_4",
    type: "MCQ",
    stem: "জীবাশ্ম জ্বালানি (Fossil fuel) অতিরিক্ত দহনের ফলে পরিবেশে কোন গ্যাসীয় চক্রের স্বাভাবিক ভারসাম্য বিঘ্নিত হচ্ছে?",
    options: [
      { id: "opt_bio_13_53_a", text: "কার্বন চক্র", isCorrect: true },
      { id: "opt_bio_13_53_b", text: "ফসফরাস চক্র", isCorrect: false },
      { id: "opt_bio_13_53_c", text: "পানি চক্র", isCorrect: false },
      { id: "opt_bio_13_53_d", text: "ক্যালসিয়াম চক্র", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কার্বন চক্র।",
      coreConcept: "ভূগর্ভে আবদ্ধ কয়লা, খনিজ তেল ও গ্যাস পুড়িয়ে বায়ুমণ্ডলে অতিরিক্ত CO2 নির্গমন করায় কার্বন চক্রের ভারসাম্য বিনষ্ট হয়ে বৈশ্বিক উষ্ণায়ন ও জলবায়ু বিপর্যয় ঘটছে।",
      distractorAnalysis: {
        opt_bio_13_53_b: "ফসফরাস চক্র মূলত শিলা ও মাটিতে আবর্তিত হয়।",
        opt_bio_13_53_c: "পানি চক্র বাষ্পীভবন ও বৃষ্টিপাতের ওপর নির্ভরশীল।",
        opt_bio_13_53_d: "ক্যালসিয়াম একটি পাললিক চক্র।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 295
      },
      proTipShortcut: "জীবাশ্ম জ্বালানি = হাইড্রোকার্বন = কার্বন চক্র।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_54",
    topicId: "top_ssc_biology_ch13_4",
    type: "MCQ",
    stem: "ডিনাইট্রিফিকেশনের ফলে মাটিতে নাইট্রোজেনের পরিমাণের ওপর কী প্রভাব পড়ে?",
    options: [
      { id: "opt_bio_13_54_a", text: "মাটিতে নাইট্রোজেনের পরিমাণ বেড়ে বিষাক্ত হয়", isCorrect: false },
      { id: "opt_bio_13_54_b", text: "মাটি থেকে নাইট্রেট হ্রাস পায় এবং বায়ুমণ্ডলে N2 ফেরত যায়", isCorrect: true },
      { id: "opt_bio_13_54_c", text: "মাটি স্থায়ীভাবে বন্ধ্যা হয়ে যায়", isCorrect: false },
      { id: "opt_bio_13_54_d", text: "উদ্ভিদ দ্রুত নাইট্রোজেন শোষণ শুরু করে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মাটি থেকে নাইট্রেট হ্রাস পায় এবং বায়ুমণ্ডলে N2 ফেরত যায়।",
      coreConcept: "ডিনাইট্রিফিকেশনের মাধ্যমে মাটির অতিরিক্ত নাইট্রেট গ্যাসীয় নাইট্রোজেনে রূপান্তরিত হয়ে বায়ুমণ্ডলে ফিরে যায়, যা চক্রাকার সমতা বিধান করে।",
      distractorAnalysis: {
        opt_bio_13_54_a: "নাইট্রোজেন বৃদ্ধি পায় না, বরং হ্রাস পায়।",
        opt_bio_13_54_c: "এটি একটি স্বাভাবিক ভারসাম্য রক্ষাকারী প্রক্রিয়া, বন্ধ্যা করে না।",
        opt_bio_13_54_d: "নাইট্রেট গ্যাস হয়ে উড়ে গেলে উদ্ভিদের গ্রহণযোগ্য নাইট্রেট কমে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 297
      },
      proTipShortcut: "ডিনাইট্রিফিকেশন = মাটি থেকে নাইট্রোজেন বায়ুতে মুক্তি।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------------------
  // Creative Questions (CQs: q_bio_13_55 to q_bio_13_60)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_13_55",
    topicId: "top_ssc_biology_ch13_3",
    type: "CQ_CREATIVE",
    stem: "একটি চার স্তরের খাদ্য শৃঙ্খলে সৌরশক্তি থেকে সবুজ উদ্ভিদ মোট ২০,০০০ জুল শক্তি শোষণ করে সঞ্চয় করল। এই শৃঙ্খলটি হলো:\nসবুজ ঘাস → ঘাসফড়িং → ব্যাঙ → সাপ।\nশিক্ষার্থী রবিন হিসাব করে দেখল যে সাপ পর্যন্ত পৌঁছাতে শক্তির পরিমাণ নাটকীয়ভাবে কমে গেছে। সে ভাবল, খাদ্য শৃঙ্খলটি যদি আরও লম্বা হতো তবে পঞ্চম স্তরের খাদক পর্যাপ্ত শক্তি পেত কি না।",
    options: null,
    explanation: {
      directAnswer: "খাদ্য শৃঙ্খলে লিন্ডেম্যানের ১০% নীতি অনুযায়ী প্রতি ট্রফিক স্তরে ৯০% শক্তি বিপাকীয় তাপে অপচয় ঘটে।",
      coreConcept: "শক্তির একমুখী প্রবাহ এবং প্রতিটি স্তরে ৯০% শক্তি ক্ষয় হওয়ার কারণে উচ্চতর স্তরে শক্তির পরিমাণ অত্যন্ত কমে যায়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 292
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "লিন্ডেম্যানের ১০% নীতিটি লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "বাস্তুতন্ত্রে শক্তির প্রবাহকে কেন একমুখী বলা হয় তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "উদ্দীপকের তথ্য অনুসারে ঘাসফড়িং, ব্যাঙ ও সাপের দেহে সঞ্চিত শক্তির পরিমাণ গাণিতিকভাবে নির্ণয় করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "রবিনের ভাবনানুযায়ী খাদ্য শৃঙ্খল ৪-৫ টির বেশি ট্রফিক স্তরে বিস্তৃত হওয়া কেন অসম্ভব তা শক্তির পিরামিডের আলোকে বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_56",
    topicId: "top_ssc_biology_ch13_3",
    type: "CQ_CREATIVE",
    stem: "শিক্ষক বোর্ডে একটি পিরামিডের চিত্র এঁকে দেখালেন যার ভিত্তিটি খুব চওড়া এবং চূড়াটি অত্যন্ত সূচালো। তিনি বললেন, “বাস্তুতন্ত্রে শক্তির প্রবাহ প্রকাশ করতে এই পিরামিড ব্যবহৃত হয়। সংখ্যা বা বায়োমাসের পিরামিড ক্ষেত্রবিশেষে উল্টানো হলেও শক্তির পিরামিড প্রকৃতিতে সর্বদা এমন খাড়াই থাকে।”",
    options: null,
    explanation: {
      directAnswer: "শক্তির পিরামিড সর্বদা সোজা বা খাড়া (Upright) হওয়ার কারণ প্রতিটি ঊর্ধ্ব স্তরে শক্তির পরিমাণ অপরিহার্যভাবে হ্রাস পায়।",
      coreConcept: "তাপগতিবিদ্যার সূত্র ও ট্রফিক শক্তি অপচয়ের কারণে উৎপাদক স্তরে শক্তি সর্বোচ্চ এবং শীর্ষ স্তরে শক্তি সর্বনিম্ন থাকে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 293
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "শক্তির পিরামিড কাকে বলে তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "উদ্ভিদ আপতিত সৌরশক্তির কতটুকু সালোকসংশ্লেষণে বাঁধে ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "উদ্দীপকের চিত্রটির বিভিন্ন ট্রফিক স্তর চিহ্নিত করে শক্তির বণ্টন ছকে দেখালে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "“শক্তির পিরামিড কখনোই উল্টানো হতে পারে না”—শিক্ষকের এই মন্তব্যের যথার্থতা বৈজ্ঞানিক যুক্তিসহ মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_57",
    topicId: "top_ssc_biology_ch13_3",
    type: "CQ_CREATIVE",
    stem: "একটি বন্যপ্রাণী অভয়ারণ্যে হরিণের তুলনায় বাঘের সংখ্যা খুবই কম। একদল দর্শনার্থী প্রশ্ন করল, “বনে যদি হরিণ হাজার হাজার থাকতে পারে, তবে বাঘের সংখ্যা কেন মাত্র গুটিকয়েক?” গাইড উত্তর দিলেন, “এটি কোনো আকস্মিক ঘটনা নয়, বরং প্রাকৃতিক খাদ্যশৃঙ্খল ও শক্তির রূপান্তরের কঠোর নিয়মের ফল।”",
    options: null,
    explanation: {
      directAnswer: "ট্রফিক স্তরে শক্তি হ্রাসের ফলে শীর্ষ খাদকের জন্য প্রাপ্য শক্তির পরিমাণ খুব কম থাকে, তাই তাদের সংখ্যাও সীমিত হতে বাধ্য।",
      coreConcept: "একটি শীর্ষ মাংসাশী প্রাণীকে বাঁচিয়ে রাখতে বিপুল পরিমাণ তৃণভোজী প্রাণী এবং তার জন্য সুবিশাল উৎপাদক বনভূমির প্রয়োজন হয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৩",
        pageNumber: 292
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ট্রফিক লেভেল কী তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "জীবদেহে শক্তির ৯০% অপচয় কীভাবে ঘটে তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "হরিণ ও বাঘের মধ্যকার পুষ্টিশক্তি স্থানান্তরের প্রক্রিয়াটি উদ্দীপকের তথ্যানুযায়ী ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "গাইডের বক্তব্যের সত্যতা ট্রফিক স্তরের শক্তি রূপান্তর ও শিকারী-শিকার অনুপাতের আলোকে বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_58",
    topicId: "top_ssc_biology_ch13_4",
    type: "CQ_CREATIVE",
    stem: "কৃষিবিদ ড. জামান লক্ষ্য করলেন তার পরীক্ষামূলক খামারের একটি জমিতে দীর্ঘদিন কোনো ডাল বা শিম জাতীয় ফসল চাষ না করায় এবং অতিরিক্ত রাসায়নিক প্রয়োগের ফলে মাটির স্বাভাবিক উর্বরতা কমে গেছে। তিনি জমিতে রাসায়নিক সার প্রয়োগ বন্ধ করে এক মৌসুম মসুর ও ছোলা চাষ করলেন। পরবর্তী মৌসুমে দেখা গেল জমিতে কোনো বাড়তি ইউরিয়া সার ছাড়াই ধানের বাম্পার ফলন হয়েছে।",
    options: null,
    explanation: {
      directAnswer: "লেগুমিনাস উদ্ভিদের মূলের নডিউলে রাইজোবিয়াম ব্যাকটেরিয়ার নাইট্রোজেন সংবন্ধন মাটির উর্বরতা প্রাকৃতিকভাবে পুনরুদ্ধার করেছে।",
      coreConcept: "জৈবিক নাইট্রোজেন সংবন্ধন কৃত্রিম রাসায়নিক সারের বিকল্প হিসেবে পরিবেশবান্ধব উপায়ে মাটিতে নাইট্রেটের জোগান দেয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 296
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "নাইট্রোজেন সংবন্ধন কাকে বলে তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "উদ্ভিদ সরাসরি বায়ুমণ্ডলীয় N2 গ্রহণ করতে পারে না কেন তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "ড. জামানের জমিতে মসুর ও ছোলা চাষ করায় কীভাবে মাটিতে নাইট্রেট যুক্ত হলো তা ব্যাকটেরিয়ার ভূমিকাসহ ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "টেকসই কৃষিব্যবস্থায় নাইট্রোজেন চক্রের জৈবিক ধাপ সংরক্ষণের গুরুত্ব মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_59",
    topicId: "top_ssc_biology_ch13_4",
    type: "CQ_CREATIVE",
    stem: "একটি গবেষণাগারে নাইট্রোজেন চক্রের বিভিন্ন ধাপে সক্রিয় ব্যাকটেরিয়া নিয়ে পরীক্ষা চালানো হচ্ছিল:\n(i) অণুজীব 'X' অ্যামোনিয়াকে নাইট্রাইটে রূপান্তর করে।\n(ii) অণুজীব 'Y' নাইট্রাইটকে নাইট্রেটে জারিত করে।\n(iii) অণুজীব 'Z' মাটির অতিরিক্ত নাইট্রেট ভেঙে বায়ুমণ্ডলে মুক্ত N2 হিসেবে ছেড়ে দেয়।",
    options: null,
    explanation: {
      directAnswer: "X হলো Nitrosomonas, Y হলো Nitrobacter এবং Z হলো Pseudomonas ব্যাকটেরিয়া।",
      coreConcept: "নাইট্রিফিকেশন ও ডিনাইট্রিফিকেশন প্রক্রিয়ায় ব্যাকটেরিয়া নাইট্রোজেন চক্রের গতি বজায় রাখে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 296
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "নাইট্রিফিকেশন কী তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "বজ্রপাতের সময় নাইট্রোজেন সংবন্ধনের বিক্রিয়াগুলো ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "উদ্দীপকের 'X' এবং 'Y' অণুজীবের পরিচয় ও এদের কার্যপদ্ধতি বিশ্লেষণ করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "বাস্তুতন্ত্রের স্বাভাবিক ভারসাম্য রক্ষায় 'Z' অণুজীবটির গুরুত্ব ও অনুপস্থিতির ফলাফল মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "HARD",
    boardSource: "দিনাজপুর বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_13_60",
    topicId: "top_ssc_biology_ch13_4",
    type: "CQ_CREATIVE",
    stem: "শিল্প বিপ্লবের পর থেকে পৃথিবীতে কয়লা, পেট্রোলিয়াম ও প্রাকৃতিক গ্যাসের ব্যবহার বহুগুণ বেড়ে গেছে। একই সাথে অপরিকল্পিত নগরায়ন ও শিল্পকারখানা তৈরির জন্য নির্বিচারে বনাঞ্চল উজাড় করা হচ্ছে। বিজ্ঞানীরা সতর্ক করেছেন যে বায়ুমণ্ডলে কার্বন ডাই-অক্সাইডের ঘনত্ব ০.০৩% থেকে আশঙ্কাজনক হারে বৃদ্ধি পাচ্ছে, যার ফলে মেরু অঞ্চলের বরফ গলে সমুদ্রপৃষ্ঠের উচ্চতা বৃদ্ধি পাচ্ছে।",
    options: null,
    explanation: {
      directAnswer: "জীবাশ্ম জ্বালানি দহন ও বন উজাড়ের কারণে কার্বন চক্রের ভারসাম্য ভেঙে গ্রিনহাউস প্রতিক্রিয়া ও বৈশ্বিক উষ্ণায়ন তীব্রতর হচ্ছে।",
      coreConcept: "সালোকসংশ্লেষণের মাধ্যমে CO2 শোষণ হ্রাস এবং দহনের মাধ্যমে CO2 নির্গমন বৃদ্ধি বৈশ্বিক জলবায়ু সংকট সৃষ্টি করেছে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "ত্রয়োদশ অধ্যায়: জীবের পরিবেশ · ১৩.৪",
        pageNumber: 295
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জৈব-ভূ-রাসায়নিক চক্র কাকে বলে তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "কার্বন ডাই-অক্সাইডকে গ্রিনহাউস গ্যাস বলা হয় কেন তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "উদ্দীপকে বর্ণিত মানবীয় কর্মকাণ্ড কীভাবে কার্বন চক্রের স্বাভাবিক প্রবাহ বিঘ্নিত করছে তা রেখাচিত্র বা বর্ণনায় দেখালে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "কার্বন চক্রের ভারসাম্য ফিরিয়ে এনে পৃথিবীর জীবমণ্ডলকে রক্ষার কার্যকর উপায় বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
