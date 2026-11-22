import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter14QuestionsBatch1: QuestionData[] = [
  // =========================================================================
  // Topic 14.1: জীবপ্রযুক্তির ধারণা, ইতিহাস ও পরিধি (top_ssc_biology_ch14_1)
  // =========================================================================
  {
    id: "q_bio_14_01",
    topicId: "top_ssc_biology_ch14_1",
    type: "MCQ",
    stem: "সর্বপ্রথম কত সালে এবং কোন বিজ্ঞানী 'Biotechnology' (বায়োটেকনোলজি) শব্দটি প্রবর্তন করেন?",
    options: [
      { id: "opt_bio_14_01_a", text: "১৮৬৩ সালে, গ্রেগর জোহান মেন্ডেল", isCorrect: false },
      { id: "opt_bio_14_01_b", text: "১৯১৯ সালে, কার্ল এরেকি", isCorrect: true },
      { id: "opt_bio_14_01_c", text: "১৯৫৩ সালে, জেমস ওয়াটসন", isCorrect: false },
      { id: "opt_bio_14_01_d", text: "১৯৬৪ সালে, জর্জ মোরেল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ১৯১৯ সালে, কার্ল এরেকি।",
      coreConcept: "হাঙ্গেরীয় কৃষি প্রকৌশলী কার্ল এরেকি (Karl Ereky) ১৯১৯ সালে প্রথম Biotechnology শব্দটি প্রবর্তন করেন।",
      distractorAnalysis: {
        opt_bio_14_01_a: "১৮৬৩ সালে মেন্ডেল বংশগতির মৌলিক সূত্র আবিষ্কার করেন।",
        opt_bio_14_01_c: "১৯৫৩ সালে ওয়াটসন ও ক্রিক DNA ডাবল হেলিক্স আবিষ্কার করেন।",
        opt_bio_14_01_d: "১৯৬৪ সালে জর্জ মোরেল অর্কিডের মেরিস্টেম কালচার করেন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.১",
        pageNumber: 307
      },
      proTipShortcut: "মনে রাখো: প্রথম বিশ্বযুদ্ধ শেষ হলো ১৯১৯ সালে, আর কার্ল এরেকি দিলেন Biotechnology শব্দটি।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_02",
    topicId: "top_ssc_biology_ch14_1",
    type: "MCQ",
    stem: "মানবসভ্যতার কত বছর পূর্বে মানুষ গাঁজন (Fermentation) ও চোলাইকরণ প্রযুক্তি রপ্ত করেছিল?",
    options: [
      { id: "opt_bio_14_02_a", text: "প্রায় ১,০০০ বছর পূর্বে", isCorrect: false },
      { id: "opt_bio_14_02_b", text: "প্রায় ৪,০০০ বছর পূর্বে", isCorrect: false },
      { id: "opt_bio_14_02_c", text: "প্রায় ৮,০০০ বছর পূর্বে", isCorrect: true },
      { id: "opt_bio_14_02_d", text: "প্রায় ২০,০০০ বছর পূর্বে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: প্রায় ৮,০০০ বছর পূর্বে।",
      coreConcept: "সনাতন জীবপ্রযুক্তির সূচনা হিসেবে মানুষ প্রায় ৮০০০ বছর আগেই গাঁজন ও চোলাইকরণের প্রযুক্তি আয়ত্ত করেছিল।",
      distractorAnalysis: {
        opt_bio_14_02_a: "১০০০ বছর অনেক আধুনিক সময়কাল।",
        opt_bio_14_02_b: "৪০০০ বছর সিন্ধু বা মেসোপটেমীয় সভ্যতার মধ্যভাগ, গাঁজন তারও আগে শুরু হয়।",
        opt_bio_14_02_d: "২০,০০০ বছর প্রাচীন প্রস্তর যুগ, তখন কৃষিজীবী সভ্যতার গাঁজন শুরু হয়নি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.১",
        pageNumber: 307
      },
      proTipShortcut: "পাঠ্যবইয়ের সংখ্যা সরাসরি মনে রাখো: ৮,০০০ বছর পূর্বের গাঁজন।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_03",
    topicId: "top_ssc_biology_ch14_1",
    type: "MCQ",
    stem: "জীবপ্রযুক্তি (Biotechnology) জীববিজ্ঞানের কোন শাখার অন্তর্গত?",
    options: [
      { id: "opt_bio_14_03_a", text: "মৌলিক বা ভৌত শাখা", isCorrect: false },
      { id: "opt_bio_14_03_b", text: "ফলিত (Applied) শাখা", isCorrect: true },
      { id: "opt_bio_14_03_c", text: "শারীরস্থান শাখা", isCorrect: false },
      { id: "opt_bio_14_03_d", text: "হিস্টোলজি শাখা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ফলিত (Applied) শাখা।",
      coreConcept: "জীববিজ্ঞান সম্পর্কিত মৌলিক জ্ঞানকে মানুষের বাস্তব সমস্যা সমাধানে প্রায়োগিক ব্যবহারের কৌশলই ফলিত বিজ্ঞান বা জীবপ্রযুক্তি।",
      distractorAnalysis: {
        opt_bio_14_03_a: "ভৌত বা মৌলিক শাখায় কেবল প্রাকৃতিক নিয়ম ও তত্ত্ব আলোচনা করা হয়।",
        opt_bio_14_03_c: "শারীরস্থান জীবের অভ্যন্তরীণ অঙ্গের গঠন পর্যালোচনা করে।",
        opt_bio_14_03_d: "হিস্টোলজি হলো টিস্যুর আণুবীক্ষণিক গঠন পাঠ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.১",
        pageNumber: 305
      },
      proTipShortcut: "জীববিজ্ঞান + প্রযুক্তি = ফলিত জীববিজ্ঞান (Applied Biology)।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_04",
    topicId: "top_ssc_biology_ch14_1",
    type: "MCQ",
    stem: "জীববিজ্ঞানে ন্যানোটেকনোলজি (Nanotechnology) প্রয়োগের প্রধান সুফল কোনটি?",
    options: [
      { id: "opt_bio_14_04_a", text: "সুস্থ কোষ ধ্বংস করে রোগ নিরাময় করা", isCorrect: false },
      { id: "opt_bio_14_04_b", text: "সুনির্দিষ্টভাবে ওষুধকে সরাসরি রোগাক্রান্ত কোষে পৌঁছে দেওয়া", isCorrect: true },
      { id: "opt_bio_14_04_c", text: "অটোক্লেভে নির্বীজনের সময় বাড়িয়ে দেওয়া", isCorrect: false },
      { id: "opt_bio_14_04_d", text: "কোষের প্লাজমিড বিনষ্ট করা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সুনির্দিষ্টভাবে ওষুধকে সরাসরি রোগাক্রান্ত কোষে পৌঁছে দেওয়া।",
      coreConcept: "ন্যানোটেকনোলজির মাধ্যমে ওষুধ সুস্থ কোষে কোনো ক্ষতি না করে সরাসরি নির্দিষ্ট লক্ষ্য কোষে পৌঁছে যায়, ফলে পার্শ্বপ্রতিক্রিয়া ছাড়া দ্রুত নিরাময় ঘটে।",
      distractorAnalysis: {
        opt_bio_14_04_a: "সুস্থ কোষ ধ্বংস করা চিকিৎসার উদ্দেশ্য নয়।",
        opt_bio_14_04_c: "অটোক্লেভ হলো টিস্যু কালচারের তাপীয় নির্বীজন প্রক্রিয়া।",
        opt_bio_14_04_d: "ন্যানোটেকনোলজি প্লাজমিড ধ্বংস করে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.১",
        pageNumber: 307
      },
      proTipShortcut: "ন্যানোটেকনোলজি = Targeted Drug Delivery (নির্দিষ্ট কোষে ওষুধ প্রেরণ)।"
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.2: উদ্ভিদ টিস্যু কালচার প্রযুক্তি ও ধাপসমূহ (top_ssc_biology_ch14_2)
  // =========================================================================
  {
    id: "q_bio_14_05",
    topicId: "top_ssc_biology_ch14_2",
    type: "MCQ",
    stem: "উদ্ভিদ কোষের কোন অনন্য বৈশিষ্ট্যের ওপর ভিত্তি করে টিস্যু কালচার প্রযুক্তি প্রতিষ্ঠিত?",
    options: [
      { id: "opt_bio_14_05_a", text: "টটিপোটেন্সি (Totipotency)", isCorrect: true },
      { id: "opt_bio_14_05_b", text: "প্লাজমোলাইসিস (Plasmolysis)", isCorrect: false },
      { id: "opt_bio_14_05_c", text: "অ্যামাইটোসিস (Amitosis)", isCorrect: false },
      { id: "opt_bio_14_05_d", text: "ইমবাইবিশন (Imbibition)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: টটিপোটেন্সি (Totipotency)।",
      coreConcept: "উদ্ভিদের প্রতিটি সজীব কোষে একটি পূর্ণাঙ্গ নতুন উদ্ভিদ সৃষ্টি করার অন্তর্নিহিত ক্ষমতা রয়েছে, যাকে টটিপোটেন্সি বলে।",
      distractorAnalysis: {
        opt_bio_14_05_b: "প্লাজমোলাইসিস হলো বহিঃঅভিস্রবণের ফলে প্রোটোপ্লাজম সংকুচিত হওয়া।",
        opt_bio_14_05_c: "অ্যামাইটোসিস হলো ব্যাকটেরিয়ার প্রত্যক্ষ কোষ বিভাজন।",
        opt_bio_14_05_d: "ইমবাইবিশন হলো কলয়েড জাতীয় শুষ্ক পদার্থ কর্তৃক তরল শোষণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২",
        pageNumber: 307
      },
      proTipShortcut: "Totipotent = Total Potential (পূর্ণাঙ্গ উদ্ভিদ সৃষ্টির সার্বিক সম্ভাবনা)।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_06",
    topicId: "top_ssc_biology_ch14_2",
    type: "MCQ",
    stem: "টিস্যু কালচারের উদ্দেশ্যে মাতৃ উদ্ভিদ থেকে বিচ্ছিন্ন করা যেকোনো নির্বাচিত অংশকে কী বলে?",
    options: [
      { id: "opt_bio_14_06_a", text: "ক্যালাস", isCorrect: false },
      { id: "opt_bio_14_06_b", text: "এক্সপ্ল্যান্ট (Explant)", isCorrect: true },
      { id: "opt_bio_14_06_c", text: "প্লাজমিড", isCorrect: false },
      { id: "opt_bio_14_06_d", text: "অণুচারা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: এক্সপ্ল্যান্ট (Explant)।",
      coreConcept: "টিস্যু কালচারের উদ্দেশ্যে উদ্ভিদের যে কোনো সজীব অংশ (যেমন শীর্ষমুকুল, পাতা, পর্ব ইত্যাদি) পৃথক করে মিডিয়ামে স্থাপন করা হয় তাকে এক্সপ্ল্যান্ট বলে।",
      distractorAnalysis: {
        opt_bio_14_06_a: "ক্যালাস হলো পুষ্টি মাধ্যমে এক্সপ্ল্যান্টের বিভাজনে সৃষ্ট অসংগঠিত টিস্যুমণ্ড।",
        opt_bio_14_06_c: "প্লাজমিড ব্যাকটেরিয়ার অতিরিক্ত বৃত্তাকার DNA।",
        opt_bio_14_06_d: "অণুচারা হলো ক্যালাস থেকে উৎপন্ন ক্ষুদ্র চারাগাছ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২",
        pageNumber: 308
      },
      proTipShortcut: "Explant = Plant part Extracted for culture."
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_07",
    topicId: "top_ssc_biology_ch14_2",
    type: "MCQ",
    stem: "অটোক্লেভ (Autoclave) যন্ত্রে কালচার মিডিয়াম নির্বীজন বা জীবাণুমুক্ত করার সঠিক শর্ত কোনটি?",
    options: [
      { id: "opt_bio_14_07_a", text: "১০০° সে., ১০ lb চাপ, ১০ মিনিট", isCorrect: false },
      { id: "opt_bio_14_07_b", text: "১২১° সে., ১৫ lb চাপ, ২০ মিনিট", isCorrect: true },
      { id: "opt_bio_14_07_c", text: "১৩৫° সে., ২৫ lb চাপ, ৪৫ মিনিট", isCorrect: false },
      { id: "opt_bio_14_07_d", text: "২৫° সে., ১৫ lb চাপ, ৬০ মিনিট", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ১২১° সে., ১৫ lb চাপ, ২০ মিনিট।",
      coreConcept: "অটোক্লেভে ১২১° সেলসিয়াস তাপমাত্রায় এবং ১৫ পাউন্ড/বর্গইঞ্চি চাপে ২০ মিনিট রাখলে সব ধরনের ব্যাকটেরিয়া ও ছত্রাকের স্পোর ধ্বংস হয়ে মাধ্যমটি জীবাণুমুক্ত হয়।",
      distractorAnalysis: {
        opt_bio_14_07_a: "১০০° সেলসিয়াসে ব্যাকটেরিয়ার রেণু বা স্পোর নষ্ট হয় না।",
        opt_bio_14_07_c: "১৩৫° সে. অতিরিক্ত তাপ, এতে পুষ্টি মাধ্যমের ভিটামিন ও হরমোন নষ্ট হয়ে যায়।",
        opt_bio_14_07_d: "২৫° সে. হলো কক্ষ তাপমাত্রা, এতে জীবাণুমুক্তকরণ সম্ভব নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.১",
        pageNumber: 308
      },
      proTipShortcut: "অটোক্লেভ ট্রায়াড মনে রাখো: ১২১°C · ১৫ lb · ২০ মিনিট।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_08",
    topicId: "top_ssc_biology_ch14_2",
    type: "MCQ",
    stem: "টিস্যু কালচারের পুষ্টি মাধ্যমে বারবার কোষ বিভাজনের ফলে সৃষ্ট অবয়বহীন অসংগঠিত টিস্যুপুঞ্জকে কী বলা হয়?",
    options: [
      { id: "opt_bio_14_08_a", text: "ক্যালাস (Callus)", isCorrect: true },
      { id: "opt_bio_14_08_b", text: "বিটপ (Shoot)", isCorrect: false },
      { id: "opt_bio_14_08_c", text: "মাইক্রোটিউবার", isCorrect: false },
      { id: "opt_bio_14_08_d", text: "মূলরোম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ক্যালাস (Callus)।",
      coreConcept: "পুষ্টি মাধ্যমে স্থাপিত এক্সপ্ল্যান্টের কোষ বারবার মাইটোসিস প্রক্রিয়ায় বিভাজিত হয়ে যে অবয়বহীন টিস্যুমণ্ড তৈরি করে তাকে ক্যালাস বলে।",
      distractorAnalysis: {
        opt_bio_14_08_b: "বিটপ হলো কাণ্ড ও পাতার সুগঠিত অংশ।",
        opt_bio_14_08_c: "মাইক্রোটিউবার হলো ল্যাবে উৎপাদিত ক্ষুদ্রাকৃতির আলুগুটি।",
        opt_bio_14_08_d: "মূলরোম উদ্ভিদের মূলের এককোষী রোম।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.১",
        pageNumber: 308
      },
      proTipShortcut: "Callus = Undifferentiated mass of tissue (অবয়বহীন টিস্যুপুঞ্জ)।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.3: কৃষি ও অর্থনীতিতে টিস্যু কালচারের গুরুত্ব (top_ssc_biology_ch14_3)
  // =========================================================================
  {
    id: "q_bio_14_09",
    topicId: "top_ssc_biology_ch14_3",
    type: "MCQ",
    stem: "১৯৫২ সালে বিজ্ঞানী মার্টিন কোন প্রযুক্তির সাহায্যে রোগমুক্ত ডালিয়া ও আলু গাছ উৎপাদন করেন?",
    options: [
      { id: "opt_bio_14_09_a", text: "জিন ক্লোনিং", isCorrect: false },
      { id: "opt_bio_14_09_b", text: "মেরিস্টেম কালচার (Meristem culture)", isCorrect: true },
      { id: "opt_bio_14_09_c", text: "সংকরায়ণ", isCorrect: false },
      { id: "opt_bio_14_09_d", text: "ট্রান্সফরমেশন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মেরিস্টেম কালচার (Meristem culture)।",
      coreConcept: "শীর্ষ বর্ধিষ্ণু মেরিস্টেম অঞ্চল ভাইরাসমুক্ত থাকায় মার্টিন ১৯৫২ সালে মেরিস্টেম কালচার দিয়ে রোগমুক্ত আলু ও ডালিয়া চারা উদ্ভাবন করেন।",
      distractorAnalysis: {
        opt_bio_14_09_a: "জিন ক্লোনিং রিকম্বিন্যান্ট DNA-এর অংশ।",
        opt_bio_14_09_c: "সংকরায়ণে ভাইরাস দূর হয় না।",
        opt_bio_14_09_d: "ট্রান্সফরমেশন হলো ব্যাকটেরিয়ায় প্লাজমিড প্রবেশ করানো।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 310
      },
      proTipShortcut: "মার্টিন (১৯৫২) = মেরিস্টেম কালচার = রোগমুক্ত ডালিয়া ও আলু।"
    },
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Creative Question 1 (Topic 14.1 / 14.2)
  {
    id: "q_bio_14_10",
    topicId: "top_ssc_biology_ch14_2",
    type: "CQ_CREATIVE",
    stem: "কৃষি গবেষণা ইনস্টিটিউটের বিজ্ঞানী ড. মাহফুজ উন্নত জাতের একটি ভাইরাসমুক্ত আলু গাছ থেকে শীর্ষমুকুলের ক্ষুদ্র অংশ কেটে নিলেন। এরপর তিনি উপযুক্ত খনিজ পুষ্টি, ফাইটোহরমোন ও অ্যাগার মিশ্রিত মিডিয়াম প্রস্তুত করে একটি বিশেষ যন্ত্রে ১২১° সেলসিয়াস তাপমাত্রা ও নির্দিষ্ট চাপে নির্বীজন করলেন। নিয়ন্ত্রিত কক্ষে রাখার কয়েক সপ্তাহ পর মিডিয়ামে অবয়বহীন টিস্যুপুঞ্জ সৃষ্টি হলো এবং পরবর্তীতে সেখান থেকে অসংখ্য সতেজ চারা পাওয়া গেল।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে উদ্ভিদ টিস্যু কালচার প্রযুক্তির ধারাবাহিক প্রক্রিয়া এবং মেরিস্টেম এক্সপ্ল্যান্ট ব্যবহারের বৈজ্ঞানিক প্রয়োগ বর্ণিত হয়েছে।",
      coreConcept: "উদ্ভিদ কোষের টটিপোটেন্সি গুণের কারণে ক্ষুদ্র এক্সপ্ল্যান্ট থেকে পুষ্টি মাধ্যমে ক্যালাস ও পরবর্তীতে অণুচারা উৎপাদন সম্ভব।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২ ও ১৪.২.১",
        pageNumber: 307
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: এক্সপ্ল্যান্ট (Explant) কাকে বলে তা নির্ভুলভাবে সংজ্ঞায়িত করলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: উদ্ভিদের শীর্ষমুকুলকে ভাইরাস-মুক্ত চারা উৎপাদনের জন্য আদর্শ বিবেচনা করা হয় কেন তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: উদ্দীপকে ড. মাহফুজ যে বিশেষ যন্ত্র ও নির্দিষ্ট শর্তে নির্বীজন সম্পন্ন করেছিলেন, সেই যন্ত্রের নাম ও সঠিক ৩টি প্যারামিটার উল্লেখপূর্বক কালচার মাধ্যম প্রস্তুতির প্রক্রিয়া বিশ্লেষণে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: আলু চাষে সনাতন পদ্ধতির তুলনায় উদ্দীপকের টিস্যু কালচার প্রযুক্তির মাধ্যমে উৎপাদিত মাইক্রোটিউবার ব্যবহারের অর্থনৈতিক ও কৃষিতাত্ত্বিক গুরুত্ব মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল টেস্ট ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Continuing Topic 14.3 MCQs
  {
    id: "q_bio_14_11",
    topicId: "top_ssc_biology_ch14_3",
    type: "MCQ",
    stem: "১৯৬৪ সালে ফরাসি বিজ্ঞানী জর্জ মোরেল কোন উদ্ভিদের মেরিস্টেম কালচার করে বছরে প্রায় ৪০ হাজার চারা উৎপাদনের পথ দেখান?",
    options: [
      { id: "opt_bio_14_11_a", text: "চন্দ্রমল্লিকা", isCorrect: false },
      { id: "opt_bio_14_11_b", text: "সিম্বিডিয়াম (Cymbidium) অর্কিড", isCorrect: true },
      { id: "opt_bio_14_11_c", text: "জোজোবা", isCorrect: false },
      { id: "opt_bio_14_11_d", text: "তেল পাম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সিম্বিডিয়াম (Cymbidium) অর্কিড।",
      coreConcept: "জর্জ মোরেল (১৯৬৪) অর্কিডের সিম্বিডিয়াম প্রজাতিতে মেরিস্টেম কালচার করে বিপুল সংখ্যক চারা উৎপাদনের সাফল্য দেখান।",
      distractorAnalysis: {
        opt_bio_14_11_a: "চন্দ্রমল্লিকার একটি টুকরা থেকে ৮৮ কোটি চারা হয়, তবে মোরেলের গবেষণা ছিল অর্কিডে।",
        opt_bio_14_11_c: "জোজোবা মরুভূমির তেলের উদ্ভিদ।",
        opt_bio_14_11_d: "তেল পাম মালয়েশিয়ায় টিস্যু কালচার করা হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 310
      },
      proTipShortcut: "জর্জ মোরেল (১৯৬৪) = অর্কিড (Cymbidium) = ৪০,০০০ চারা।"
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_12",
    topicId: "top_ssc_biology_ch14_3",
    type: "MCQ",
    stem: "উড়োজাহাজ ও রকেটের ভারী ইঞ্জিনের লুব্রিকেন্ট হিসেবে শুক্রাণু তিমির (Sperm whale) তেলের একমাত্র কার্যকর উদ্ভিজ্জ বিকল্প কোনটি?",
    options: [
      { id: "opt_bio_14_12_a", text: "পাম অয়েল", isCorrect: false },
      { id: "opt_bio_14_12_b", text: "জোজোবা (Jojoba) তেল", isCorrect: true },
      { id: "opt_bio_14_12_c", text: "সয়াবিন তেল", isCorrect: false },
      { id: "opt_bio_14_12_d", text: "সরিষার তেল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: জোজোবা (Jojoba) তেল।",
      coreConcept: "মরু অঞ্চলের জোজোবা উদ্ভিদের তেল শুক্রাণু তিমির তেলের মতোই চরম তাপমাত্রা ও চাপ সহ্য করতে পারে, যা টিস্যু কালচারের মাধ্যমে দ্রুত বংশবৃদ্ধি করা হচ্ছে।",
      distractorAnalysis: {
        opt_bio_14_12_a: "পাম অয়েল সাধারণ রান্নার ভোজ্যতেল।",
        opt_bio_14_12_c: "সয়াবিন সাধারণ খাদ্যতেল।",
        opt_bio_14_12_d: "সরিষা ইঞ্জিন লুব্রিকেন্ট হিসেবে তিমির তেলের বিকল্প নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 310
      },
      proTipShortcut: "Sperm Whale Oil বিকল্প = মরুভূমির Jojoba উদ্ভিদ।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.4: জিন প্রকৌশল, রিকম্বিন্যান্ট DNA ও GMO (top_ssc_biology_ch14_4)
  // =========================================================================
  {
    id: "q_bio_14_13",
    topicId: "top_ssc_biology_ch14_4",
    type: "MCQ",
    stem: "একটি জীব থেকে একটি নির্দিষ্ট জিন বহনকারী DNA খণ্ড পৃথক করে ভিন্ন জীবে স্থানান্তরের প্রযুক্তিকে কী বলে?",
    options: [
      { id: "opt_bio_14_13_a", text: "টিস্যু কালচার", isCorrect: false },
      { id: "opt_bio_14_13_b", text: "জিন প্রকৌশল (Genetic Engineering)", isCorrect: true },
      { id: "opt_bio_14_13_c", text: "অ্যামাইটোসিস", isCorrect: false },
      { id: "opt_bio_14_13_d", text: "প্লাজমোলাইসিস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: জিন প্রকৌশল (Genetic Engineering)।",
      coreConcept: "কাঙ্ক্ষিত নতুন বৈশিষ্ট্য সৃষ্টির উদ্দেশ্যে কোনো জীবের DNA অণুর কাঙ্ক্ষিত খণ্ড অন্য জীবে স্থানান্তরকে জিন প্রকৌশল বা রিকম্বিন্যান্ট DNA প্রযুক্তি বলে।",
      distractorAnalysis: {
        opt_bio_14_13_a: "টিস্যু কালচারে জিন খণ্ড স্থানান্তর করা হয় না, সম্পূর্ণ কোষ কালচার করা হয়।",
        opt_bio_14_13_c: "অ্যামাইটোসিস সরল কোষ বিভাজন।",
        opt_bio_14_13_d: "প্লাজমোলাইসিস হলো পানি হ্রাসে প্রোটোপ্লাজম সংকোচন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩",
        pageNumber: 311
      },
      proTipShortcut: "নির্দিষ্ট জিন পৃথক + ভিন্ন জীবে স্থানান্তর = জিন প্রকৌশল।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_14",
    topicId: "top_ssc_biology_ch14_4",
    type: "MCQ",
    stem: "কোন জীবটিকে সুনির্দিষ্টভাবে 'ট্রান্সজেনিক জীব' (Transgenic organism) বলা যাবে?",
    options: [
      { id: "opt_bio_14_14_a", text: "তেজস্ক্রিয়তায় নিজস্ব জিনে মিউটেশন ঘটিয়ে উন্নত করা গম", isCorrect: false },
      { id: "opt_bio_14_14_b", text: "ভিন্ন প্রজাতির জীব থেকে বহিরাগত জিন প্রবেশ করানো জীব", isCorrect: true },
      { id: "opt_bio_14_14_c", text: "শাখা কলমের মাধ্যমে তৈরি আমগাছ", isCorrect: false },
      { id: "opt_bio_14_14_d", text: "টিস্যু কালচারের মাধ্যমে ক্লোন করা অর্কিড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ভিন্ন প্রজাতির জীব থেকে বহিরাগত জিন প্রবেশ করানো জীব।",
      coreConcept: "জিনোমে অন্য কোনো প্রজাতি বা প্রকরণ থেকে বহিরাগত নতুন জিন ঢুকিয়ে দেওয়া হলেই কেবল তাকে ট্রান্সজেনিক জীব বলা হয়।",
      distractorAnalysis: {
        opt_bio_14_14_a: "মিউটেশন ঘটানো গম হলো GMO, কিন্তু ট্রান্সজেনিক নয় কারণ এতে বাইরের প্রজাতি নেই।",
        opt_bio_14_14_c: "কলমের গাছ সনাতন অঙ্গজ বংশবৃদ্ধি।",
        opt_bio_14_14_d: "টিস্যু কালচার ক্লোন মাতৃগাছের হুবহু প্রতিরূপ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩",
        pageNumber: 312
      },
      proTipShortcut: "Trans-genic = Across Genus/Species (ভিন্ন প্রজাতি থেকে জিন আনা)।"
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_15",
    topicId: "top_ssc_biology_ch14_4",
    type: "MCQ",
    stem: "প্রচলিত বা সনাতন উদ্ভিদ প্রজননের তুলনায় জিন প্রকৌশলের সবচেয়ে বড় সুবিধা কোনটি?",
    options: [
      { id: "opt_bio_14_15_a", text: "এতে কোনো ল্যাবরেটরি বা রাসায়নিক লাগে না", isCorrect: false },
      { id: "opt_bio_14_15_b", text: "দূরবর্তী প্রজাতির মাঝেও কেবল একটিমাত্র কাঙ্ক্ষিত জিন স্থানান্তর করা যায়", isCorrect: true },
      { id: "opt_bio_14_15_c", text: "এতে প্রচুর অনাকাঙ্ক্ষিত ক্ষতিকর জিন যুক্ত হয়", isCorrect: false },
      { id: "opt_bio_14_15_d", text: "এতে আন্তর্জাতিক কোনো নজরদারি থাকে না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: দূরবর্তী প্রজাতির মাঝেও কেবল একটিমাত্র কাঙ্ক্ষিত জিন স্থানান্তর করা যায়।",
      coreConcept: "সনাতন প্রজননে নিকটাত্মীয় ছাড়া সংকরায়ণ হয় না এবং বহু খারাপ জিন চলে আসে; কিন্তু জিন প্রকৌশলে দূরবর্তী প্রজাতি থেকে নিখুঁতভাবে কেবল কাঙ্ক্ষিত জিনটিই আনা যায়।",
      distractorAnalysis: {
        opt_bio_14_15_a: "জিন প্রকৌশলে অত্যন্ত উন্নত ল্যাব ও এনজাইম লাগে।",
        opt_bio_14_15_c: "অনাকাঙ্ক্ষিত জিন আসা সনাতন প্রজননের ত্রুটি, জিন প্রকৌশলের সুবিধা নয়।",
        opt_bio_14_15_d: "জিন প্রকৌশলে কড়া বায়োসেফটি নজরদারি থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩ ও ১৪.৩.২",
        pageNumber: 315
      },
      proTipShortcut: "জিন প্রকৌশল = শতভাগ সুনির্দিষ্ট কাঙ্ক্ষিত জিন স্থানান্তর।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_16",
    topicId: "top_ssc_biology_ch14_4",
    type: "MCQ",
    stem: "'সকল ট্রান্সজেনিক জীবই GMO, কিন্তু সকল GMO ট্রান্সজেনিক নয়'—উক্তিটির বৈজ্ঞানিক ভিত্তি কী?",
    options: [
      { id: "opt_bio_14_16_a", text: "ট্রান্সজেনিক জীবে কোনো জিনগত পরিবর্তন থাকে না", isCorrect: false },
      { id: "opt_bio_14_16_b", text: "জিনের যেকোনো কৃত্রিম পরিবর্তনই GMO, কিন্তু ট্রান্সজেনিকে ভিন্ন প্রজাতির বহিরাগত জিন থাকা আবশ্যক", isCorrect: true },
      { id: "opt_bio_14_16_c", text: "GMO তৈরি করতে কোনো এনজাইম লাগে না", isCorrect: false },
      { id: "opt_bio_14_16_d", text: "ট্রান্সজেনিক জীব কেবল প্রাণীর ক্ষেত্রেই সম্ভব", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: জিনের যেকোনো কৃত্রিম পরিবর্তনই GMO, কিন্তু ট্রান্সজেনিকে ভিন্ন প্রজাতির বহিরাগত জিন থাকা আবশ্যক।",
      coreConcept: "GMO একটি বৃহত্তর শ্রেণি যার মধ্যে নিজস্ব জিনের মিউটেশনও পড়ে; কিন্তু ট্রান্সজেনিক হতে হলে অবশ্যই অন্য প্রজাতি থেকে বহিরাগত জিন গ্রহণ করতে হয়।",
      distractorAnalysis: {
        opt_bio_14_16_a: "ট্রান্সজেনিক জীবে জিনগত পরিবর্তন সুস্পষ্ট।",
        opt_bio_14_16_c: "GMO তৈরিতে বহু জৈবপ্রযুক্তি কৌশল লাগে।",
        opt_bio_14_16_d: "উদ্ভিদ, অণুজীব ও প্রাণী সবই ট্রান্সজেনিক হতে পারে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩",
        pageNumber: 312
      },
      proTipShortcut: "Transgenic ⊂ GMO (ট্রান্সজেনিক হলো জিএমও-র একটি বিশেষায়িত উপসেট)।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.5: রিকম্বিন্যান্ট DNA তৈরির ধারাবাহিক ধাপ ও প্লাজমিড (top_ssc_biology_ch14_5)
  // =========================================================================
  {
    id: "q_bio_14_17",
    topicId: "top_ssc_biology_ch14_5",
    type: "MCQ",
    stem: "ব্যাকটেরিয়া কোষে বিদ্যমান প্লাজমিড (Plasmid)-এর গঠনগত বৈশিষ্ট্য কোনটি?",
    options: [
      { id: "opt_bio_14_17_a", text: "প্রধান ক্রোমোজোমের সাথে যুক্ত এক-সূত্রক DNA", isCorrect: false },
      { id: "opt_bio_14_17_b", text: "ক্রোমোজোম-বহির্ভূত স্ব-বিভাজনক্ষম অতিরিক্ত বৃত্তাকার দ্বি-সূত্রক DNA", isCorrect: true },
      { id: "opt_bio_14_17_c", text: "নিউক্লিয়াসের ঝিল্লি দ্বারা পরিবেষ্টিত সূত্রাকার RNA", isCorrect: false },
      { id: "opt_bio_14_17_d", text: "মাইটোকন্ড্রিয়ার নিজস্ব রাইবোজোম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ক্রোমোজোম-বহির্ভূত স্ব-বিভাজনক্ষম অতিরিক্ত বৃত্তাকার দ্বি-সূত্রক DNA।",
      coreConcept: "প্লাজমিড হলো ব্যাকটেরিয়ার মূল ক্রোমোজোমের বাইরে অবস্থিত স্ব-প্রতিলিপনক্ষম অতিরিক্ত বৃত্তাকার দ্বিতন্ত্রী DNA অণু।",
      distractorAnalysis: {
        opt_bio_14_17_a: "প্লাজমিড মূল ক্রোমোজোমের বাইরে মুক্তভাবে থাকে এবং এটি দ্বি-সূত্রক।",
        opt_bio_14_17_c: "ব্যাকটেরিয়ায় কোনো নিউক্লিয়ার ঝিল্লি নেই এবং প্লাজমিড হলো DNA, RNA নয়।",
        opt_bio_14_17_d: "ব্যাকটেরিয়ায় মাইটোকন্ড্রিয়া অনুপস্থিত।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১",
        pageNumber: 313
      },
      proTipShortcut: "প্লাজমিড = Extra-chromosomal Circular Double-stranded DNA."
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_18",
    topicId: "top_ssc_biology_ch14_5",
    type: "MCQ",
    stem: "রিকম্বিন্যান্ট DNA তৈরিতে নির্দিষ্ট ক্ষারক অনুক্রমে DNA কাটার জন্য কোন এনজাইমটি 'আণবিক কাঁচি' হিসেবে কাজ করে?",
    options: [
      { id: "opt_bio_14_18_a", text: "DNA লাইগেজ", isCorrect: false },
      { id: "opt_bio_14_18_b", text: "রেস্ট্রিকশন এনজাইম (Restriction enzyme)", isCorrect: true },
      { id: "opt_bio_14_18_c", text: "পেপসিন", isCorrect: false },
      { id: "opt_bio_14_18_d", text: "টায়ালিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: রেস্ট্রিকশন এনজাইম (Restriction enzyme)।",
      coreConcept: "রেস্ট্রিকশন এনজাইম DNA-এর নির্দিষ্ট সিকোয়েন্স চিনে সেখানে কেটে দেয় এবং স্টিকি এন্ড তৈরি করে, তাই একে আণবিক কাঁচি বলে।",
      distractorAnalysis: {
        opt_bio_14_18_a: "DNA লাইগেজ হলো আণবিক আঠা, যা কাটার বদলে জোড়া লাগায়।",
        opt_bio_14_18_c: "পেপসিন পাকস্থলীর আমিষ পরিপাককারী উৎসেচক।",
        opt_bio_14_18_d: "টায়ালিন লালারসের শর্করা পরিপাককারী উৎসেচক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১",
        pageNumber: 313
      },
      proTipShortcut: "কাঁচি = রেস্ট্রিকশন এনজাইম; আঠা = লাইগেজ।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_19",
    topicId: "top_ssc_biology_ch14_5",
    type: "MCQ",
    stem: "কাটা প্লাজমিডের দুই প্রান্তে কাঙ্ক্ষিত জিন জোড়া লাগিয়ে রিকম্বিন্যান্ট DNA প্লাজমিড তৈরিতে কোন এনজাইমটি ব্যবহৃত হয়?",
    options: [
      { id: "opt_bio_14_19_a", text: "DNA লাইগেজ (DNA Ligase)", isCorrect: true },
      { id: "opt_bio_14_19_b", text: "রেস্ট্রিকশন এন্ডোনিউক্লিয়েজ", isCorrect: false },
      { id: "opt_bio_14_19_c", text: "RNA পলিমারেজ", isCorrect: false },
      { id: "opt_bio_14_19_d", text: "লাইপেজ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: DNA লাইগেজ (DNA Ligase)।",
      coreConcept: "DNA লাইগেজ এনজাইম আঠার মতো কাজ করে দাতা DNA খণ্ড ও প্লাজমিডের মাঝে ফসফোডাইএস্টার বন্ধন তৈরি করে এদের স্থায়ীভাবে সংযুক্ত করে।",
      distractorAnalysis: {
        opt_bio_14_19_b: "রেস্ট্রিকশন এন্ডোনিউক্লিয়েজ DNA কাটার কাজ করে।",
        opt_bio_14_19_c: "RNA পলিমারেজ ট্রান্সক্রিপশনে RNA সংশ্লেষ করে।",
        opt_bio_14_19_d: "লাইপেজ চর্বি পরিপাককারী উৎসেচক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১",
        pageNumber: 313
      },
      proTipShortcut: "Ligase = Ligate (জোড়া লাগানো আঠা)।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Creative Question 2 (Topic 14.4 / 14.5)
  {
    id: "q_bio_14_20",
    topicId: "top_ssc_biology_ch14_5",
    type: "CQ_CREATIVE",
    stem: "ডায়াবেটিস রোগীদের চিকিৎসার জন্য গবেষক দল মানব অগ্ন্যাশয় থেকে ইনসুলিন উৎপাদনকারী জিন সংগ্রহ করলেন। এরপর তারা মানুষের অন্ত্রে বসবাসকারী E. coli ব্যাকটেরিয়া থেকে একটি অতিরিক্ত বৃত্তাকার DNA অণু পৃথক করলেন। উভয় DNA-কে একটি বিশেষ আণবিক কাঁচি দিয়ে কেটে পরিপূরক প্রান্ত সৃষ্টি করা হলো এবং পরবর্তীতে জৈব আঠার মাধ্যমে জোড়া লাগিয়ে তৈরি করা হলো এক ধরনের হাইব্রিড DNA অণু। এই নতুন DNA-কে পুনরায় ব্যাকটেরিয়া কোষে প্রবেশ করিয়ে কোটি কোটি প্রতিলিপি প্রস্তুত করা হলো।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে ইনসুলিন জিন ক্লোনিং ও রিকম্বিন্যান্ট DNA তৈরির সম্পূর্ণ বৈজ্ঞানিক ধাপসমূহের সফল প্রয়োগ তুলে ধরা হয়েছে।",
      coreConcept: "রেস্ট্রিকশন এনজাইম, DNA লাইগেজ ও প্লাজমিড ভেক্টর ব্যবহার করে রিকম্বিন্যান্ট DNA গঠন এবং ট্রান্সফরমেশনের মাধ্যমে জিন ক্লোনিং সম্পন্ন হয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১",
        pageNumber: 313
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: প্লাজমিড (Plasmid) কাকে বলে তা সঠিকভাবে লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: রেস্ট্রিকশন এনজাইমকে 'আণবিক কাঁচি' এবং DNA লাইগেজকে 'আণবিক আঠা' বলা হয় কেন তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: উদ্দীপকে উল্লেখিত হাইব্রিড DNA অণু (রিকম্বিন্যান্ট প্লাজমিড) প্রস্তুত করার ধারাবাহিক ধাপসমূহ প্রবাহচিত্রের (Flowchart) মাধ্যমে উপস্থাপন করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: প্রাণী উৎস থেকে সংগৃহীত সনাতন ইনসুলিনের তুলনায় উদ্দীপকে প্রস্তুতকৃত রিকম্বিন্যান্ট ইনসুলিনের চিকিৎসা উপযোগিতা ও শ্রেষ্ঠত্ব মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Continuing Topic 14.5 & 14.6 MCQs
  {
    id: "q_bio_14_21",
    topicId: "top_ssc_biology_ch14_5",
    type: "MCQ",
    stem: "রিকম্বিন্যান্ট প্লাজমিডকে পোষক বা গ্রাহক ব্যাকটেরিয়া কোষে প্রবেশ করানোর পদ্ধতিকে কী বলে?",
    options: [
      { id: "opt_bio_14_21_a", text: "ট্রান্সলেশন", isCorrect: false },
      { id: "opt_bio_14_21_b", text: "ট্রান্সক্রিপশন", isCorrect: false },
      { id: "opt_bio_14_21_c", text: "ট্রান্সফরমেশন (Transformation)", isCorrect: true },
      { id: "opt_bio_14_21_d", text: "ট্রান্সলোকেশন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ট্রান্সফরমেশন (Transformation)।",
      coreConcept: "বহিরাগত রিকম্বিন্যান্ট প্লাজমিড DNA গ্রাহক কোষে (যেমন E. coli) সফলভাবে প্রবেশ করানোর পদ্ধতিকে ট্রান্সফরমেশন বলে।",
      distractorAnalysis: {
        opt_bio_14_21_a: "ট্রান্সলেশন হলো mRNA থেকে প্রোটিন সংশ্লেষণ।",
        opt_bio_14_21_b: "ট্রান্সক্রিপশন হলো DNA থেকে mRNA তৈরি।",
        opt_bio_14_21_d: "ট্রান্সলোকেশন হলো উদ্ভিদে ফ্লোয়েম দিয়ে খাদ্য পরিবহন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.১",
        pageNumber: 313
      },
      proTipShortcut: "প্লাজমিড কোষে প্রবেশ = ট্রান্সফরমেশন (Transformation)।"
    },
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 14.6: কৃষি, চিকিৎসা ও পরিবেশ সুরক্ষায় প্রয়োগ (top_ssc_biology_ch14_6)
  // =========================================================================
  {
    id: "q_bio_14_22",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "বিটি ফসলে (যেমন বিটি তুলা ও বিটি বেগুন) ক্ষতিকর পোকার বিরুদ্ধে বিষাক্ত টক্সিন তৈরির জিনটি কোন অণুজীব থেকে নেওয়া হয়েছে?",
    options: [
      { id: "opt_bio_14_22_a", text: "Escherichia coli", isCorrect: false },
      { id: "opt_bio_14_22_b", text: "Bacillus thuringiensis", isCorrect: true },
      { id: "opt_bio_14_22_c", text: "Pseudomonas aeruginosa", isCorrect: false },
      { id: "opt_bio_14_22_d", text: "Saccharomyces cerevisiae", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: Bacillus thuringiensis।",
      coreConcept: "মাটির ব্যাকটেরিয়া Bacillus thuringiensis (Bt) থেকে ক্রিস্টাল টক্সিন জিন শস্যে স্থানান্তর করায় ফসল নিজে থেকেই পোকা দমন করতে পারে।",
      distractorAnalysis: {
        opt_bio_14_22_a: "E. coli প্রধানত প্লাজমিড বাহক ও ইনসুলিন উৎপাদনে ব্যবহৃত হয়।",
        opt_bio_14_22_c: "Pseudomonas তেল হাইড্রোকার্বন বিনষ্ট করে।",
        opt_bio_14_22_d: "Saccharomyces হলো পাউরুটি ও অ্যালকোহলের ইস্ট ছত্রাক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 315
      },
      proTipShortcut: "Bt = Bacillus thuringiensis।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_23",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "শিশুদের রাতকানা ও অন্ধত্ব দূরীকরণে কোন ভিটামিনের জিন স্থানান্তর করে সোনালি চাল বা 'গোল্ডেন রাইস' উদ্ভাবন করা হয়েছে?",
    options: [
      { id: "opt_bio_14_23_a", text: "ভিটামিন সি", isCorrect: false },
      { id: "opt_bio_14_23_b", text: "ভিটামিন এ (বিটা-ক্যারোটিন)", isCorrect: true },
      { id: "opt_bio_14_23_c", text: "ভিটামিন ডি", isCorrect: false },
      { id: "opt_bio_14_23_d", text: "ভিটামিন কে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ভিটামিন এ (বিটা-ক্যারোটিন)।",
      coreConcept: "সাধারণ চালে বিটা-ক্যারোটিন থাকে না; ড্যাফোডিল ফুল ও ব্যাকটেরিয়ার জিন সংযোজন করে বিটা-ক্যারোটিনযুক্ত সোনালি রঙের চাল বা গোল্ডেন রাইস তৈরি করা হয়েছে।",
      distractorAnalysis: {
        opt_bio_14_23_a: "ভিটামিন সি টক ফলে থাকে, স্কার্ভি রোধ করে।",
        opt_bio_14_23_c: "ভিটামিন ডি রিকেটস রোগ প্রতিরোধ করে।",
        opt_bio_14_23_d: "ভিটামিন কে রক্ত তঞ্চনে সহায়তা করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 316
      },
      proTipShortcut: "গোল্ডেন রাইস = সোনালি বিটা-ক্যারোটিন = ভিটামিন 'এ'।"
    },
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড ২০২৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_24",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "পেট্রোলিয়াম ও সমুদ্রের ক্ষতিকর তেল হাইড্রোকার্বন বিনষ্ট করে পরিবেশ সুরক্ষায় কোন ব্যাকটেরিয়া সফলভাবে ব্যবহৃত হয়?",
    options: [
      { id: "opt_bio_14_24_a", text: "Pseudomonas", isCorrect: true },
      { id: "opt_bio_14_24_b", text: "Rhizobium", isCorrect: false },
      { id: "opt_bio_14_24_c", text: "Lactobacillus", isCorrect: false },
      { id: "opt_bio_14_24_d", text: "Spirulina", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: Pseudomonas।",
      coreConcept: "জিন প্রকৌশলের মাধ্যমে উদ্ভাবিত বিশেষ জাতের Pseudomonas ব্যাকটেরিয়া তেল ও হাইড্রোকার্বন ভেঙে পরিবেশ দূষণমুক্ত করতে পারে।",
      distractorAnalysis: {
        opt_bio_14_24_b: "Rhizobium শুঁটি উদ্ভিদের মূলে নাইট্রোজেন সংবন্ধন করে।",
        opt_bio_14_24_c: "Lactobacillus দুধ থেকে দধি তৈরি করে।",
        opt_bio_14_24_d: "Spirulina হলো প্রোটিন সমৃদ্ধ নীলাভ সবুজ শৈবাল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 317
      },
      proTipShortcut: "তেল খাদক ব্যাকটেরিয়া = Pseudomonas (সিউডোমোনাস)।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // Creative Questions 3, 4, 5, 6
  {
    id: "q_bio_14_25",
    topicId: "top_ssc_biology_ch14_6",
    type: "CQ_CREATIVE",
    stem: "বাংলাদেশের একজন বিশিষ্ট কৃষিবিজ্ঞানী লক্ষ্য করলেন যে দেশের বিস্তীর্ণ উপকূলীয় অঞ্চলে লবণাক্ততার কারণে ধানের ফলন মারাত্মকভাবে হ্রাস পায় এবং স্থানীয় কৃষকরা কীটনাশক ব্যবহারে প্রচুর আর্থিক ক্ষতির শিকার হন। তিনি জীবপ্রযুক্তি প্রয়োগ করে এমন একটি ধানের জাত তৈরি করলেন যা খরা ও লবণাক্ততা সহ্য করতে পারে এবং বিটি জিন সংযোজন করে পোকার আক্রমণ শতভাগ প্রতিরোধ করতে সক্ষম।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে পরিবেশ সহনশীল ট্রান্সজেনিক শস্য উদ্ভাবন ও বিটি প্রযুক্তির প্রয়োগের বাস্তব দৃষ্টান্ত তুলে ধরা হয়েছে।",
      coreConcept: "জিন প্রকৌশলের মাধ্যমে প্রতিকূল পরিবেশ সহনশীলতা ও কীট প্রতিরোধী বৈশিষ্ট্যের সমন্বয় ঘটিয়ে টেকসই কৃষি উন্নয়ন সম্ভব।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 315
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: GMO-এর পূর্ণরূপ সঠিক বানানে লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: বিটি ফসল কীভাবে লেপিডোপটেরা ও কলিওপটেরা পোকাকে প্রতিহত করে তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: উদ্দীপকের বিজ্ঞানীর উদ্ভাবিত ধানে কাঙ্ক্ষিত জিন সংযুক্ত করার জন্য রিকম্বিন্যান্ট DNA কৌশলের প্রয়োজনীয় ধাপগুলো ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: বাংলাদেশের অর্থনৈতিক প্রবৃদ্ধি ও খাদ্য নিরাপত্তা নিশ্চিতকরণে উদ্দীপকের ট্রান্সজেনিক ফসলের ভূমিকা এবং এর সম্ভাব্য বায়োসেফটি ঝুঁকি মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "HARD",
    boardSource: "বোর্ড স্ট্যান্ডার্ড সৃজনশীল ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_26",
    topicId: "top_ssc_biology_ch14_3",
    type: "CQ_CREATIVE",
    stem: "ফুলের নার্সারি মালিক জনাব রফিক আগে কলম পদ্ধতিতে অর্কিডের চারা তৈরি করতেন। কিন্তু এতে বছরে মাত্র অল্প কয়েকটি চারা পাওয়া যেত এবং অনেক চারাই ভাইরাসে আক্রান্ত হয়ে মরে যেত। পরবর্তীতে তিনি একটি কৃষি বিশ্ববিদ্যালয়ের ল্যাব থেকে টিস্যু কালচার পদ্ধতিতে উৎপাদিত সিম্বিডিয়াম অর্কিডের হাজার হাজার অণুচারা সংগ্রহ করে নার্সারিতে রোপণ করলেন এবং আন্তর্জাতিক বাজারে ফুল রপ্তানি করে বিপুল বৈদেশিক মুদ্রা অর্জন করলেন।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে জর্জ মোরেলের অর্কিড টিস্যু কালচার প্রযুক্তির বাণিজ্যিক ও অর্থনৈতিক সফলতার প্রতিফলন ঘটেছে।",
      coreConcept: "মেরিস্টেম কালচারের মাধ্যমে রোগমুক্ত অণুচারা উৎপাদন এবং বাণিজ্যিক ফুল চাষে টিস্যু কালচার বিপ্লব সৃষ্টি করেছে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.২.২",
        pageNumber: 310
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: টটিপোটেন্সি কী তা নির্ভুল লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: টিস্যু কালচার চারাকে মাঠে রোপণের পূর্বে অ্যাক্লাইমেটাইজেশন বা খাপ খাইয়ে নিতে হয় কেন তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: উদ্দীপকে জনাব রফিকের সংগৃহীত অর্কিড চারা তৈরির গবেষণাগারীয় পর্যায়সমূহ (এক্সপ্ল্যান্ট থেকে অণুচারা) ধারাবাহিকভাবে ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: বাংলাদেশের কৃষি অর্থনীতিতে ফুল ও উদ্যানতাত্ত্বিক ফসল উৎপাদনে টিস্যু কালচার পদ্ধতির অপার সম্ভাবনা বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_27",
    topicId: "top_ssc_biology_ch14_6",
    type: "CQ_CREATIVE",
    stem: "বঙ্গোপসাগরে একটি তেলবাহী কার্গো জাহাজ দুর্ঘটনার শিকার হয়ে সাগরে লাখ লাখ গ্যালন অপরিশোধিত জ্বালানি তেল ছড়িয়ে পড়ল। এর ফলে সমুদ্রের জলজ প্রাণী ও উপকূলীয় ম্যানগ্রোভ বন চরম হুমকির মুখে পড়ল। পরিবেশ অধিদপ্তর সংকট নিরসনে রাসায়নিক বিষাক্ত পদার্থ না ছড়িয়ে বিশেষ এক ধরনের বায়ো-ইঞ্জিনিয়ার্ড ব্যাকটেরিয়া সাগরে উন্মুক্ত করল। কয়েক সপ্তাহের মধ্যেই তেল দূষণ নাটকীয়ভাবে হ্রাস পেল।",
    options: null,
    explanation: {
      directAnswer: "উদ্দীপকে সামুদ্রিক তেলদূষণ হ্রাসে রিকম্বিন্যান্ট সিউডোমোনাস (Pseudomonas) ব্যাকটেরিয়ার বায়োরিমিডিয়েশন ক্ষমতা বর্ণিত হয়েছে।",
      coreConcept: "হাইড্রোকার্বন বিনষ্টকারী জিন স্থানান্তরের মাধ্যমে উন্নত সিউডোমোনাস ব্যাকটেরিয়া সমুদ্র ও পরিবেশ সুরক্ষায় অনন্য ভূমিকা পালন করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 317
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: তেল ও হাইড্রোকার্বন বিনষ্টকারী বিশেষ ব্যাকটেরিয়ার বৈজ্ঞানিক নাম সঠিকভাবে লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: ইন্টারফেরন (Interferon) কোন অণুজীব থেকে উৎপন্ন হয় এবং এর চিকিৎসা গুরুত্ব কী তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: উদ্দীপকের বিশেষ ব্যাকটেরিয়াটি পরিবেশের তেল ও হাইড্রোকার্বনকে কীভাবে দূষণমুক্ত করে তার জৈব রাসায়নিক প্রক্রিয়া ব্যাখ্যা করলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: প্রাকৃতিক পরিবেশ রক্ষা ও শিল্পবর্জ্য ব্যবস্থাপনায় জীবপ্রযুক্তির ভূমিকা মূল্যায়নপূর্বক এর জীবনিরাপত্তা (Biosafety) নীতিমালা অনুসরণের গুরুত্ব বিশ্লেষণ করলে ৪ নম্বর।" }
    },
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_28",
    topicId: "top_ssc_biology_ch14_1",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান ক্লাসে শিক্ষক বোর্ডে মানব সভ্যতার দুটি মাইলফলক তুলে ধরলেন:\nঘটনা ১: প্রাচীন মানুষের দ্বারা প্রায় ৮০০০ বছর আগে শুরু হওয়া গাঁজন ও চোলাইকরণ প্রক্রিয়া।\nঘটনা ২: ১৯১৯ সালে কার্ল এরেকি কর্তৃক প্রবর্তিত জীবপ্রযুক্তি এবং সাম্প্রতিক পাটের জীবন রহস্য (জিনোম সিকোয়েন্স) উন্মোচনের বৈজ্ঞানিক সাফল্য।",
    options: null,
    explanation: {
      directAnswer: "সনাতন জৈবপ্রযুক্তি থেকে আধুনিক আণবিক জেনোমিক্স ও বায়োটেকনোলজির ঐতিহাসিক ক্রমবিকাশ উদ্দীপকে প্রতিফলিত হয়েছে।",
      coreConcept: "জীবপ্রযুক্তি প্রাচীন ব্যবহারিক বিদ্যা থেকে আধুনিক আণবিক ফলিত বিজ্ঞানে রূপান্তরিত হয়ে মানবকল্যাণে যুগান্তকারী অবদান রাখছে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.১",
        pageNumber: 305
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "জ্ঞানমূলক: কত সালে এবং কে সর্বপ্রথম DNA ডাবল হেলিক্স মডেল আবিষ্কার করেন তা লিখলে ১ নম্বর।" },
      kha: { mark: 2, criteria: "অনুধাবনমূলক: জীবপ্রযুক্তিকে জীববিজ্ঞানের ফলিত (Applied) শাখা বলা হয় কেন তা ব্যাখ্যা করলে ২ নম্বর।" },
      ga: { mark: 3, criteria: "প্রয়োগমূলক: ঘটনা ১ এবং ঘটনা ২-এর মধ্যকার প্রযুক্তিগত অগ্রগতি ও পার্থক্যের তুলনামূলক বিবরণ দিলে ৩ নম্বর।" },
      gha: { mark: 4, criteria: "উচ্চতর দক্ষতা: বাংলাদেশের পাট জিনোম প্রকল্পের মতো জাতীয় বায়োটেকনোলজি উদ্যোগ দেশের অর্থনীতিতে কী সুদূরপ্রসারী ভূমিকা রাখতে পারে তা মূল্যায়ন করলে ৪ নম্বর।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন ২০২৬",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_29",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "ভেড়ার পশমের (Wool) উৎপাদন ও গুণগত মান বৃদ্ধির জন্য ব্যাকটেরিয়ার কোন দুটি জিন ভেড়ার জিনোমে স্থানান্তর করা হয়েছে?",
    options: [
      { id: "opt_bio_14_29_a", text: "Bt1 ও Bt2 জিন", isCorrect: false },
      { id: "opt_bio_14_29_b", text: "CysE ও CysM জিন", isCorrect: true },
      { id: "opt_bio_14_29_c", text: "ToMV ও TMV জিন", isCorrect: false },
      { id: "opt_bio_14_29_d", text: "LacZ ও TetR জিন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: CysE ও CysM জিন।",
      coreConcept: "ব্যাকটেরিয়ার CysE এবং CysM জিন ভেড়ার জিনোমে স্থানান্তরের মাধ্যমে উন্নত মানের পশম ও পশমের পরিমাণ উল্লেখযোগ্যভাবে বৃদ্ধি করা সম্ভব হয়েছে।",
      distractorAnalysis: {
        opt_bio_14_29_a: "Bt জিন কীটের বিষাক্ত প্রোটিন তৈরির জন্য শস্যে ব্যবহৃত হয়।",
        opt_bio_14_29_c: "ToMV ও TMV হলো উদ্ভিদের ক্ষতিকর ভাইরাস।",
        opt_bio_14_29_d: "LacZ ও TetR হলো প্লাজমিডের মার্কার জিন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 316
      },
      proTipShortcut: "ভেড়ার পশম = CysE + CysM জিন।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_14_30",
    topicId: "top_ssc_biology_ch14_6",
    type: "MCQ",
    stem: "স্যামন মাছের দৈহিক বৃদ্ধি হরমোনের জিন স্থানান্তরের মাধ্যমে দেশি মাগুর ও কার্প মাছের আকার প্রায় কত শতাংশ বৃদ্ধি করা সম্ভব হয়েছে?",
    options: [
      { id: "opt_bio_14_30_a", text: "২০%", isCorrect: false },
      { id: "opt_bio_14_30_b", text: "৪০%", isCorrect: false },
      { id: "opt_bio_14_30_c", text: "৬০%", isCorrect: true },
      { id: "opt_bio_14_30_d", text: "৮০%", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৬০%।",
      coreConcept: "স্যামন মাছের গ্রোথ হরমোন জিন রূপান্তরের ফলে মাগুর, কার্প ও তেলাপিয়া মাছের শারীরিক বৃদ্ধি প্রায় ৬০ ভাগ বাড়ানো সম্ভব হয়েছে।",
      distractorAnalysis: {
        opt_bio_14_30_a: "২০% সাধারণ পুষ্টি বৃদ্ধিতেই হতে পারে।",
        opt_bio_14_30_b: "৪০% সঠিক পাঠ্যবই তথ্য নয়।",
        opt_bio_14_30_d: "৮০% অতিরিক্ত অতিরঞ্জন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্দশ অধ্যায়: জীবপ্রযুক্তি · ১৪.৩.২",
        pageNumber: 316
      },
      proTipShortcut: "স্যামন হরমোন রূপান্তর = মাছের আকার ৬০% বড়।"
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
