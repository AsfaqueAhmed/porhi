import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter2QuestionsBatch1: QuestionData[] = [
  {
    id: "q_bio_2_01",
    topicId: "top_ssc_biology_ch2_1",
    type: "MCQ",
    stem: "১৯৬৯ সালে কোন বিজ্ঞানীদ্বয় বৈষম্যভেদ্য পর্দা দিয়ে আবৃত এবং অন্য সজীব মাধ্যম ছাড়াই প্রতিরূপ তৈরিতে সক্ষম সত্তাকে কোষ হিসেবে সংজ্ঞায়িত করেন?",
    options: [
      {
            "id": "opt_bio_2_01_a",
            "text": "লোয়ি ও সিকেভিজ",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_01_b",
            "text": "রবার্ট হুক ও কার্ল বেন্ডা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_01_c",
            "text": "আর্নস্ট হেকেল ও অল্টম্যান",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_01_d",
            "text": "মারগুলিস ও হুইটটেকার",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: লোয়ি ও সিকেভিজ।",
      "coreConcept": "লোয়ি (Loewy) এবং সিকেভিজ (Siekevitz) ১৯৬৯ সালে কোষের আধুনিক গ্রহণযোগ্য সংজ্ঞা দেন।",
      "distractorAnalysis": {
            "opt_bio_2_01_b": "রবার্ট হুক ১৬৬৫ সালে কর্ক কোষে প্রথম কোষ প্রত্যক্ষ করেন।",
            "opt_bio_2_01_c": "হেকেল ১৮৬৬ সালে প্লাস্টিড এবং অল্টম্যান ১৮৮৬ সালে মাইটোকন্ড্রিয়া আবিষ্কার করেন।",
            "opt_bio_2_01_d": "হুইটটেকার ও মারগুলিস জীবজগতের ৫ রাজ্য শ্রেণিবিন্যাস দেন।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.১",
            "pageNumber": 19
      },
      "proTipShortcut": "মনে রাখো: ১৯৬৯ সালে মানুষ চাঁদে গেল, আর লোয়ি-সিকেভিজ কোষের আধুনিক সংজ্ঞা দিলেন।"
},
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_02",
    topicId: "top_ssc_biology_ch2_1",
    type: "MCQ",
    stem: "কোষের বৈষম্যভেদ্য পর্দা (Selectively permeable membrane) বলতে কী বোঝায়?",
    options: [
      {
            "id": "opt_bio_2_02_a",
            "text": "যে পর্দা দিয়ে সব ধরনের দ্রাব ও দ্রাবক অবাধে চলাচল করতে পারে",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_02_b",
            "text": "যে পর্দা দিয়ে দ্রাবক চলাচল করতে পারে কিন্তু নির্দিষ্ট কিছু দ্রাব নিয়ন্ত্রিতভাবে প্রবেশ করে",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_02_c",
            "text": "যে পর্দা দিয়ে কোনো অণুই প্রবেশ বা বের হতে পারে না",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_02_d",
            "text": "যে পর্দা কেবল গ্যাসীয় উপাদান পরিবহন করে",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: যে পর্দা দিয়ে দ্রাবক চলাচল করতে পারে কিন্তু নির্দিষ্ট কিছু দ্রাব নিয়ন্ত্রিতভাবে প্রবেশ করে।",
      "coreConcept": "বৈষম্যভেদ্য পর্দা কোষের অভ্যন্তরীণ পরিবেশ রক্ষা করে প্রয়োজনমাফিক উপাদান গ্রহণ ও বর্জন নিয়ন্ত্রণ করে।",
      "distractorAnalysis": {
            "opt_bio_2_02_a": "এটি ভেদ্য (Permeable) পর্দার সংজ্ঞা (যেমন: কোষপ্রাচীর)।",
            "opt_bio_2_02_c": "এটি অভেদ্য (Impermeable) পর্দার সংজ্ঞা (যেমন: পলিথিন, কিউটিকল)।",
            "opt_bio_2_02_d": "বৈষম্যভেদ্য পর্দা কেবল গ্যাসীয় নয়, জলীয় দ্রবণ ও খনিজ লবণ নিয়ন্ত্রণ করে।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.১",
            "pageNumber": 19
      },
      "proTipShortcut": "বৈষম্য = বাছাই করা অনুমতি (Selectively allowed)।"
},
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_03",
    topicId: "top_ssc_biology_ch2_1",
    type: "MCQ",
    stem: "নিউক্লিয়াসের গঠনের ভিত্তিতে জীবকোষকে প্রধানত কয় ভাগে ভাগ করা হয়েছে?",
    options: [
      {
            "id": "opt_bio_2_03_a",
            "text": "২ ভাগে",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_03_b",
            "text": "৩ ভাগে",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_03_c",
            "text": "৪ ভাগে",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_03_d",
            "text": "৫ ভাগে",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: ২ ভাগে।",
      "coreConcept": "নিউক্লিয়াসের গঠনের ওপর ভিত্তি করে কোষ দুই ধরনের: আদিকোষ (Prokaryotic) এবং প্রকৃতকোষ (Eukaryotic)।",
      "distractorAnalysis": {
            "opt_bio_2_03_b": "কাজের ভিত্তিতে প্রকৃত কোষ ২ প্রকার (দেহকোষ ও জননকোষ)।",
            "opt_bio_2_03_c": "টিস্যু প্রধানত চার প্রকার।",
            "opt_bio_2_03_d": "জীবজগত ৫ রাজ্যে বিভক্ত।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.১",
            "pageNumber": 19
      },
      "proTipShortcut": "নিউক্লিয়াস আছে কি নেই? এই ২ অবস্থাই কোষের ২ রূপ।"
},
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_04",
    topicId: "top_ssc_biology_ch2_1",
    type: "MCQ",
    stem: "আদিকোষ বা প্রাককেন্দ্রিক কোষে নিচের কোন সাইটোপ্লাজমীয় অঙ্গাণুটি উপস্থিত থাকে?",
    options: [
      {
            "id": "opt_bio_2_04_a",
            "text": "মাইটোকন্ড্রিয়া",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_04_b",
            "text": "প্লাস্টিড",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_04_c",
            "text": "রাইবোজোম",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_04_d",
            "text": "এন্ডোপ্লাজমিক রেটিকুলাম",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর গ: রাইবোজোম।",
      "coreConcept": "আদিকোষে ঝিল্লিযুক্ত কোনো অঙ্গাণু থাকে না; তবে প্রোটিন সংশ্লেষণের অপরিহার্য ঝিল্লিবিহীন অঙ্গাণু হিসেবে রাইবোজোম উপস্থিত থাকে।",
      "distractorAnalysis": {
            "opt_bio_2_04_a": "মাইটোকন্ড্রিয়া ঝিল্লিযুক্ত অঙ্গাণু, আদিকোষে অনুপস্থিত।",
            "opt_bio_2_04_b": "প্লাস্টিড আদিকোষে থাকে না।",
            "opt_bio_2_04_d": "এন্ডোপ্লাজমিক রেটিকুলাম ঝিল্লিযুক্ত, আদিকোষে অনুপস্থিত।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.১",
            "pageNumber": 19
      },
      "proTipShortcut": "সর্বজনীন প্রোটিন কারখানা = রাইবোজোম (আদি ও প্রকৃত উভয় কোষে থাকে)।"
},
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_05",
    topicId: "top_ssc_biology_ch2_1",
    type: "MCQ",
    stem: "আদিকোষের ক্রোমোজোমে কোন উপাদানটি কেবল উপস্থিত থাকে?",
    options: [
      {
            "id": "opt_bio_2_05_a",
            "text": "কেবল বৃত্তাকার DNA",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_05_b",
            "text": "DNA এবং হিস্টোন প্রোটিন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_05_c",
            "text": "কেবল RNA",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_05_d",
            "text": "DNA এবং সেলুলোজ",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: কেবল বৃত্তাকার DNA।",
      "coreConcept": "আদিকোষের ক্রোমোজোমে হিস্টোন প্রোটিন থাকে না; এতে কেবল নগ্ন বৃত্তাকার DNA সাইটোপ্লাজমে ছড়ানো থাকে।",
      "distractorAnalysis": {
            "opt_bio_2_05_b": "DNA ও হিস্টোন প্রোটিন প্রকৃত কোষের ক্রোমোজোমে থাকে।",
            "opt_bio_2_05_c": "ক্রোমোজোমের মূল বংশগতীয় উপাদান DNA।",
            "opt_bio_2_05_d": "সেলুলোজ কোষপ্রাচীরের উপাদান, ক্রোমোজোমের নয়।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.১",
            "pageNumber": 19
      },
      "proTipShortcut": "আদিকোষের DNA = নগ্ন ও বৃত্তাকার (No histone protein)।"
},
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_06",
    topicId: "top_ssc_biology_ch2_1",
    type: "MCQ",
    stem: "নিচের কোন জীবে আদিকোষ দেখা যায়?",
    options: [
      {
            "id": "opt_bio_2_06_a",
            "text": "অ্যামিবা ও ইস্ট",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_06_b",
            "text": "ব্যাকটেরিয়া ও নীলাভ সবুজ শৈবাল",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_06_c",
            "text": "স্পাইরোগাইরা ও পেনিসিলিয়াম",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_06_d",
            "text": "ম্যালেরিয়া পরজীবী ও ডায়াটম",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: ব্যাকটেরিয়া ও নীলাভ সবুজ শৈবাল।",
      "coreConcept": "ব্যাকটেরিয়া এবং সায়ানোব্যাকটেরিয়া (নীলাভ সবুজ শৈবাল) হলো প্রাককেন্দ্রিক মনেরা রাজ্যের জীব।",
      "distractorAnalysis": {
            "opt_bio_2_06_a": "অ্যামিবা প্রটিস্টা এবং ইস্ট ছত্রাক রাজ্যের সুকেন্দ্রিক জীব।",
            "opt_bio_2_06_c": "স্পাইরোগাইরা শৈবাল এবং পেনিসিলিয়াম ছত্রাক—উভয়ই সুকেন্দ্রিক।",
            "opt_bio_2_06_d": "ম্যালেরিয়া পরজীবী (Plasmodium) সুকেন্দ্রিক প্রোটোজোয়া।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.১",
            "pageNumber": 19
      },
      "proTipShortcut": "মনেরা = আদিকোষী (ব্যাকটেরিয়া + নীলাভ সবুজ শৈবাল)।"
},
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_07",
    topicId: "top_ssc_biology_ch2_1",
    type: "MCQ",
    stem: "বহুকোষী জীবের দৈহিক বৃদ্ধি নিচের কোন কোষের বিভাজনের ফলে ঘটে?",
    options: [
      {
            "id": "opt_bio_2_07_a",
            "text": "দেহকোষ (মাইটোসিস বিভাজনে)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_07_b",
            "text": "জননকোষ (মিয়োসিস বিভাজনে)",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_07_c",
            "text": "শুক্রাণু (অ্যামাইটোসিস বিভাজনে)",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_07_d",
            "text": "ডিম্বাণু (দ্বি-বিভাজনে)",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: দেহকোষ (মাইটোসিস বিভাজনে)।",
      "coreConcept": "দেহকোষ মাইটোসিস পদ্ধতিতে বিভাজিত হয়ে অপত্য কোষ সৃষ্টি করে এবং জীবদেহের অঙ্গ-প্রত্যঙ্গ গঠন ও বৃদ্ধি ঘটায়।",
      "distractorAnalysis": {
            "opt_bio_2_07_b": "জননকোষ প্রজননে অংশ নেয়, দৈহিক বৃদ্ধিতে নয়।",
            "opt_bio_2_07_c": "শুক্রাণু জননকোষ, যা মিয়োসিসে তৈরি হয়।",
            "opt_bio_2_07_d": "ডিম্বাণু প্রজননে ব্যবহৃত হয়।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.১",
            "pageNumber": 19
      },
      "proTipShortcut": "দেহ = মাইটোসিস (সমান ক্রোমোজোমে দৈহিক বৃদ্ধি)।"
},
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_08",
    topicId: "top_ssc_biology_ch2_1",
    type: "MCQ",
    stem: "জনন মাতৃকোষ বিভাজিত হয়ে জননকোষ সৃষ্টির প্রক্রিয়া কোনটি?",
    options: [
      {
            "id": "opt_bio_2_08_a",
            "text": "মাইটোসিস",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_08_b",
            "text": "মিয়োসিস",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_08_c",
            "text": "অ্যামাইটোসিস",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_08_d",
            "text": "কোরকোদ্গম",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: মিয়োসিস।",
      "coreConcept": "মিয়োসিস বিভাজনে ডিপ্লয়েড জনন মাতৃকোষ থেকে হ্যাপ্লয়েড জননকোষ সৃষ্টি হয়, ফলে ক্রোমোজোম সংখ্যা হ্রাস পায়।",
      "distractorAnalysis": {
            "opt_bio_2_08_a": "মাইটোসিসে ক্রোমোজোম সংখ্যা সমান থাকে (দেহকোষে ঘটে)।",
            "opt_bio_2_08_c": "অ্যামাইটোসিস আদি এককোষী জীবের প্রত্যক্ষ বিভাজন।",
            "opt_bio_2_08_d": "কোরকোদ্গম ইস্টের অযৌন প্রজনন পদ্ধতি।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.১",
            "pageNumber": 19
      },
      "proTipShortcut": "জননকোষ = মিয়োসিস = হ্যাপ্লয়েড (অর্ধেক ক্রোমোজোম)।"
},
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_09",
    topicId: "top_ssc_biology_ch2_1",
    type: "MCQ",
    stem: "পুং ও স্ত্রী জননকোষের মিলনের ফলে সৃষ্টি প্রথম ডিপ্লয়েড কোষটিকে কী বলা হয়?",
    options: [
      {
            "id": "opt_bio_2_09_a",
            "text": "মরুলা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_09_b",
            "text": "ব্লাস্টোডার্ম",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_09_c",
            "text": "জাইগোট (Zygote)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_09_d",
            "text": "ভ্রূণমূল",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর গ: জাইগোট (Zygote)।",
      "coreConcept": "পুং ও স্ত্রী গ্যামেট মিলনে তৈরি প্রথম নিষিক্ত কোষ হলো জাইগোট, যা বারবার মাইটোসিসে নতুন জীবদেহ তৈরি করে।",
      "distractorAnalysis": {
            "opt_bio_2_09_a": "মরুলা জাইগোট পরবর্তী বহুকোষী নিরেট বল দশা।",
            "opt_bio_2_09_b": "ব্লাস্টোডার্ম ভ্রূণের কোষস্তর।",
            "opt_bio_2_09_d": "ভ্রূণমূল উদ্ভিদের ভ্রূণের মূল উৎপন্নকারী অংশ।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.১",
            "pageNumber": 20
      },
      "proTipShortcut": "যুগল মিলন = জাইগোট (প্রথম দেহকোষের ভিত্তি)।"
},
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_10",
    topicId: "top_ssc_biology_ch2_1",
    type: "MCQ",
    stem: "নিচের কোন উক্তিটি সত্য?",
    options: [
      {
            "id": "opt_bio_2_10_a",
            "text": "দেহকোষে ক্রোমোজোম সংখ্যা হ্যাপ্লয়েড এবং জননকোষে ডিপ্লয়েড",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_10_b",
            "text": "আদিকোষে ঝিল্লিযুক্ত মাইটোকন্ড্রিয়া ও প্লাস্টিড উপস্থিত থাকে",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_10_c",
            "text": "প্রকৃত কোষের ক্রোমোজোমে DNA ও হিস্টোন প্রোটিন থাকে",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_10_d",
            "text": "সকল প্রকৃত কোষে বিভাজনে অক্ষম একক নিউক্লিয়াস থাকে",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর গ: প্রকৃত কোষের ক্রোমোজোমে DNA ও হিস্টোন প্রোটিন থাকে।",
      "coreConcept": "প্রকৃত কোষের ক্রোমোজোমে রৈখিক DNA অণু হিস্টোন প্রোটিনের সাথে সংযুক্ত হয়ে ক্রোমাটিন জালিকা গঠন করে।",
      "distractorAnalysis": {
            "opt_bio_2_10_a": "দেহকোষ ডিপ্লয়েড (2n) এবং জননকোষ হ্যাপ্লয়েড (n)।",
            "opt_bio_2_10_b": "আদিকোষে ঝিল্লিযুক্ত কোনো অঙ্গাণুই থাকে না।",
            "opt_bio_2_10_d": "পরিণত সিভকোষ ও স্তন্যপায়ী RBC-তে নিউক্লিয়াস থাকে না।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.১",
            "pageNumber": 19
      },
      "proTipShortcut": "প্রকৃত = প্রোটিনযুক্ত (Histone) ক্রোমোজোম।"
},
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_11",
    topicId: "top_ssc_biology_ch2_1",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান ক্লাসে শিক্ষক বোর্ডে দুটি কোষের চিত্র এঁকে বললেন, “A কোষটির কোনো সুগঠিত নিউক্লিয়ার পর্দা নেই এবং ক্রোমোজোমে কেবল DNA রয়েছে। অপরপক্ষে B কোষটিতে দ্বিস্তরবিশিষ্ট নিউক্লিয়ার ঝিল্লি এবং অসংখ্য ঝিল্লিযুক্ত সাইটোপ্লাজমীয় অঙ্গাণু রয়েছে। এই B ধরনের কোষে দেহকোষ ও জননকোষ উভয় রূপই দেখা যায়।”",
    options: null,
    explanation: {
      "directAnswer": "A হলো আদিকোষ (প্রাককেন্দ্রিক) এবং B হলো সুকেন্দ্রিক প্রকৃতকোষ।",
      "coreConcept": "নিউক্লিয়াসের আবরণী ও অঙ্গাণুর উপস্থিতির ওপর ভিত্তি করে জীবজগতের দুই প্রধান কোষীয় রূপ গঠিত।",
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.১",
            "pageNumber": 19
      }
},
    cqRubric: {
      "ka": {
            "mark": 1,
            "criteria": "১৯৬৯ সালে লোয়ি ও সিকেভিজ প্রদত্ত কোষের আধুনিক সংজ্ঞাটি নির্ভুলভাবে লেখা।"
      },
      "kha": {
            "mark": 2,
            "criteria": "জাইগোটকে নতুন বহুকোষী জীবের প্রথম সূচনা কোষ বলা হয় কেন তা ব্যাখ্যা করা।"
      },
      "ga": {
            "mark": 3,
            "criteria": "উদ্দীপকের তথ্যানুযায়ী A ও B কোষের মধ্যে ৫টি সুনির্দিষ্ট গঠনগত পার্থক্য তুলনামূলক ছকে উপস্থাপন করা।"
      },
      "gha": {
            "mark": 4,
            "criteria": "বহুকোষী জীবের অস্তিত্ব রক্ষা ও বংশগতি বজায় রাখতে B কোষের দেহকোষ ও জননকোষের পৃথক ভূমিকা বিশ্লেষণ করা।"
      }
},
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_12",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "উদ্ভিদকোষের কোষপ্রাচীরের প্রধান রাসায়নিক উপাদান কোনটি?",
    options: [
      {
            "id": "opt_bio_2_12_a",
            "text": "সেলুলোজ",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_12_b",
            "text": "কাইটিন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_12_c",
            "text": "গ্লাইকোজেন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_12_d",
            "text": "পেপটিডোগ্লাইকান",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: সেলুলোজ।",
      "coreConcept": "উদ্ভিদের প্রাথমিক ও গৌণ কোষপ্রাচীরের মূল উপাদান হলো সেলুলোজ, সাথে হেমিসেলুলোজ, লিগনিন ও পেকটিন থাকে।",
      "distractorAnalysis": {
            "opt_bio_2_12_b": "ছত্রাকের কোষপ্রাচীর কাইটিন দিয়ে তৈরি।",
            "opt_bio_2_12_c": "গ্লাইকোজেন প্রাণীর সঞ্চিত খাদ্য।",
            "opt_bio_2_12_d": "পেপটিডোগ্লাইকান ব্যাকটেরিয়ার কোষপ্রাচীরে থাকে।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 21
      },
      "proTipShortcut": "গাছপালা = সেলুলোজ দেয়াল।"
},
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_13",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "ছত্রাকের কোষপ্রাচীর নিচের কোন উপাদান দিয়ে গঠিত?",
    options: [
      {
            "id": "opt_bio_2_13_a",
            "text": "সেলুলোজ",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_13_b",
            "text": "কাইটিন",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_13_c",
            "text": "সুবেরিন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_13_d",
            "text": "লিপিড",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: কাইটিন।",
      "coreConcept": "ছত্রাকের কোষপ্রাচীর জটিল নাইট্রোজেনঘটিত পলিস্যাকারাইড কাইটিন (Chitin) দিয়ে গঠিত।",
      "distractorAnalysis": {
            "opt_bio_2_13_a": "সেলুলোজ উদ্ভিদের কোষপ্রাচীর গঠন করে।",
            "opt_bio_2_13_c": "সুবেরিন কর্ক জাতীয় কোষে জমা হয়।",
            "opt_bio_2_13_d": "লিপিড কোষঝিল্লির উপাদান।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 21
      },
      "proTipShortcut": "ছত্রাক = কাইটিন (Chitin)।"
},
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_14",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "পাশাপাশি দুটি উদ্ভিদকোষের মধ্যে সূক্ষ্ম নালির মাধ্যমে সংযোগ রক্ষাকারী কাঠামোকে কী বলে?",
    options: [
      {
            "id": "opt_bio_2_14_a",
            "text": "মাইক্রোভিলাই",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_14_b",
            "text": "প্লাজমোডেজমাটা",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_14_c",
            "text": "কাইনেটোকোর",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_14_d",
            "text": "অক্সিজোম",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: প্লাজমোডেজমাটা।",
      "coreConcept": "কোষপ্রাচীরের কূপ এলাকার আণুবীক্ষণিক নালি বা প্লাজমোডেজমাটা (Plasmodesmata) দিয়ে কোষদ্বয়ের সাইটোপ্লাজমীয় যোগাযোগ ও পানি-খনিজ চলাচল ঘটে।",
      "distractorAnalysis": {
            "opt_bio_2_14_a": "মাইক্রোভিলাই প্রাণিকোষঝিল্লির বাইরের ভাঁজ।",
            "opt_bio_2_14_c": "কাইনেটোকোর সেন্ট্রোমিয়ারে স্পিন্ডল তন্তুর সংযোগস্থল।",
            "opt_bio_2_14_d": "অক্সিজোম মাইটোকন্ড্রিয়ার ক্রিস্টির গায়ে অবস্থিত দানা।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 21
      },
      "proTipShortcut": "প্লাজমোডেজমাটা = উদ্ভিদকোষের সংযোগ সেতু।"
},
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_15",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "উদ্ভিদের গৌণ কোষপ্রাচীর কয়টি স্তরবিশিষ্ট?",
    options: [
      {
            "id": "opt_bio_2_15_a",
            "text": "১টি স্তর",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_15_b",
            "text": "২টি স্তর",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_15_c",
            "text": "৩টি স্তর",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_15_d",
            "text": "৪টি স্তর",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর গ: ৩টি স্তর।",
      "coreConcept": "প্রাথমিক প্রাচীরের ভেতরের দিকে সৃষ্ট গৌণ প্রাচীরটি তিনটি স্তরে বিন্যস্ত থাকে: বহিঃস্তর, মধ্যস্তর এবং অন্তঃস্তর (পৃষ্ঠা ২১, চিত্র ২.০৩)।",
      "distractorAnalysis": {
            "opt_bio_2_15_a": "প্রাথমিক প্রাচীর এক স্তরবিশিষ্ট।",
            "opt_bio_2_15_b": "কোষঝিল্লি দ্বিস্তরবিশিষ্ট।",
            "opt_bio_2_15_d": "গৌণ প্রাচীর ৪ স্তরের নয়।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 21
      },
      "proTipShortcut": "গৌণ প্রাচীর = ৩টি স্তর (বহিঃ, মধ্য, অন্তঃ)।"
},
    difficulty: "HARD",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_16",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "প্রোটোপ্লাজম থেকে নিউক্লিয়াস সরিয়ে নিলে বাকি যে অংশটি থাকে তাকে কী বলে?",
    options: [
      {
            "id": "opt_bio_2_16_a",
            "text": "সাইটোপ্লাজম",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_16_b",
            "text": "নিউক্লিওপ্লাজম",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_16_c",
            "text": "ম্যাট্রিক্স",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_16_d",
            "text": "স্ট্রোমা",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: সাইটোপ্লাজম।",
      "coreConcept": "প্রোটোপ্লাজম = সাইটোপ্লাজম + নিউক্লিয়াস। তাই নিউক্লিয়াস বাদ দিলে সাইটোপ্লাজম অবশিষ্ট থাকে।",
      "distractorAnalysis": {
            "opt_bio_2_16_b": "নিউক্লিওপ্লাজম নিউক্লিয়াসের ভেতরের তরল রস।",
            "opt_bio_2_16_c": "ম্যাট্রিক্স মাইটোকন্ড্রিয়ার তরল ধাত্র।",
            "opt_bio_2_16_d": "স্ট্রোমা ক্লোরোপ্লাস্টের তরল ধাত্র।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 22
      },
      "proTipShortcut": "প্রোটোপ্লাজম - নিউক্লিয়াস = সাইটোপ্লাজম।"
},
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_17",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "প্রাণিকোষের কোষঝিল্লির আঙ্গুলের মতো ভেতরের দিকে বা বাইরের ভাঁজকে কী বলা হয়?",
    options: [
      {
            "id": "opt_bio_2_17_a",
            "text": "ক্রিস্টি",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_17_b",
            "text": "মাইক্রোভিলাই",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_17_c",
            "text": "সিস্টার্নি",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_17_d",
            "text": "গ্রানা",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: মাইক্রোভিলাই।",
      "coreConcept": "প্রাণিকোষে শোষণ তল বাড়ানোর জন্য প্লাজমালেমা ভাঁজ হয়ে মাইক্রোভিলাই (একবচনে মাইক্রোভিলাস) তৈরি করে।",
      "distractorAnalysis": {
            "opt_bio_2_17_a": "ক্রিস্টি হলো মাইটোকন্ড্রিয়ার ভেতরের পর্দার ভাঁজ।",
            "opt_bio_2_17_c": "সিস্টার্নি হলো গলজি বস্তু ও এন্ডোপ্লাজমিক রেটিকুলামের চ্যাপ্টা থলি।",
            "opt_bio_2_17_d": "গ্রানা হলো ক্লোরোপ্লাস্টের থাইলাকয়েডের স্তূপ।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 22
      },
      "proTipShortcut": "কোষঝিল্লির ভাঁজ = মাইক্রোভিলাই।"
},
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_18",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "কোষঝিল্লি প্রধানত কোন দুটি রাসায়নিক উপাদান দিয়ে গঠিত?",
    options: [
      {
            "id": "opt_bio_2_18_a",
            "text": "লিপিড ও প্রোটিন",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_18_b",
            "text": "সেলুলোজ ও পেকটিন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_18_c",
            "text": "কাইটিন ও গ্লাইকোজেন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_18_d",
            "text": "লিগনিন ও সুবেরিন",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: লিপিড ও প্রোটিন।",
      "coreConcept": "কোষঝিল্লি একটি দ্বিস্তরবিশিষ্ট লিপোপ্রোটিন (লিপিড ও প্রোটিন) পর্দা।",
      "distractorAnalysis": {
            "opt_bio_2_18_b": "সেলুলোজ ও পেকটিন উদ্ভিদ কোষপ্রাচীরের উপাদান।",
            "opt_bio_2_18_c": "কাইটিন ছত্রাক প্রাচীরে থাকে।",
            "opt_bio_2_18_d": "লিগনিন ও সুবেরিন কোষপ্রাচীরের গৌণ উপাদান।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 22
      },
      "proTipShortcut": "প্লাজমামেমব্রেন = লিপো-প্রোটিন (লিপিড + প্রোটিন)।"
},
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_19",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "১৮৮৬ সালে রিচার্ড অল্টম্যান মাইটোকন্ড্রিয়া আবিষ্কার করে কী নাম দিয়েছিলেন?",
    options: [
      {
            "id": "opt_bio_2_19_a",
            "text": "মাইটোকন্ড্রিয়া",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_19_b",
            "text": "বায়োব্লাস্ট",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_19_c",
            "text": "ক্লোরোপ্লাস্ট",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_19_d",
            "text": "সেন্ট্রোসোম",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: বায়োব্লাস্ট।",
      "coreConcept": "রিচার্ড অল্টম্যান অঙ্গাণুটি আবিষ্কার করে নাম দেন বায়োব্লাস্ট (Bioblast)। পরবর্তীতে কার্ল বেন্ডা নাম দেন মাইটোকন্ড্রিয়া।",
      "distractorAnalysis": {
            "opt_bio_2_19_a": "মাইটোকন্ড্রিয়া নাম দেন কার্ল বেন্ডা।",
            "opt_bio_2_19_c": "ক্লোরোপ্লাস্ট প্লাস্টিডের শ্রেণি।",
            "opt_bio_2_19_d": "সেন্ট্রোসোম বোভেরি আবিষ্কার করেন।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 22
      },
      "proTipShortcut": "অল্টম্যান = বায়োব্লাস্ট; বেন্ডা = মাইটোকন্ড্রিয়া।"
},
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_20",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "মাইটোকন্ড্রিয়ার ভেতরের স্তরটি আঙুলের মতো ভাঁজ হয়ে যে কাঠামো সৃষ্টি করে তাকে কী বলে?",
    options: [
      {
            "id": "opt_bio_2_20_a",
            "text": "ক্রিস্টি (Cristae)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_20_b",
            "text": "ম্যাট্রিক্স",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_20_c",
            "text": "গ্রানা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_20_d",
            "text": "সিস্টার্নি",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: ক্রিস্টি (Cristae)।",
      "coreConcept": "মাইটোকন্ড্রিয়ার ভেতরের স্তরের ভাঁজগুলোকে ক্রিস্টি বলে, যা পৃষ্ঠদেশের ক্ষেত্রফল বাড়িয়ে এনজাইমের কাজের সুযোগ বাড়ায়।",
      "distractorAnalysis": {
            "opt_bio_2_20_b": "ম্যাট্রিক্স হলো ভেতরে থাকা তরল ধাত্র।",
            "opt_bio_2_20_c": "গ্রানা থাকে ক্লোরোপ্লাস্টে।",
            "opt_bio_2_20_d": "সিস্টার্নি থাকে গলজি বস্তুতে।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 22
      },
      "proTipShortcut": "মাইটোকন্ড্রিয়ার ভাঁজ = ক্রিস্টি।"
},
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_21",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "কোষীয় শ্বসনের কোন গুরুত্বপূর্ণ ধাপটি মাইটোকন্ড্রিয়ার ভেতরে ঘটে এবং সর্বাধিক শক্তি উৎপাদিত হয়?",
    options: [
      {
            "id": "opt_bio_2_21_a",
            "text": "গ্লাইকোলাইসিস",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_21_b",
            "text": "ক্রেবস চক্র",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_21_c",
            "text": "ফার্মেন্টেশন বা গাঁজন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_21_d",
            "text": "সালোকসংশ্লেষণ",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: ক্রেবস চক্র।",
      "coreConcept": "শ্বসনের অত্যন্ত গুরুত্বপূর্ণ ৩য় ধাপ ক্রেবস চক্রের সব এনজাইম মাইটোকন্ড্রিয়ায় থাকে এবং এখানেই সর্বাধিক ATP উৎপাদিত হয়।",
      "distractorAnalysis": {
            "opt_bio_2_21_a": "গ্লাইকোলাইসিস সাইটোপ্লাজমে ঘটে, মাইটোকন্ড্রিয়ায় নয়।",
            "opt_bio_2_21_c": "গাঁজন অবাত শ্বসনের সাইটোপ্লাজমীয় প্রক্রিয়া।",
            "opt_bio_2_21_d": "সালোকসংশ্লেষণ ক্লোরোপ্লাস্টে ঘটে।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 23
      },
      "proTipShortcut": "ক্রেবস চক্র = মাইটোকন্ড্রিয়া = পাওয়ার হাউস।"
},
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_22",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "নিচের কোন সুকেন্দ্রিক প্রোটোজোয়া পরজীবীর কোষে মাইটোকন্ড্রিয়া অনুপস্থিত?",
    options: [
      {
            "id": "opt_bio_2_22_a",
            "text": "Trichomonas এবং Monocercomonoides",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_22_b",
            "text": "Amoeba এবং Euglena",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_22_c",
            "text": "Paramecium এবং Plasmodium",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_22_d",
            "text": "Hydra এবং Planaria",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: Trichomonas এবং Monocercomonoides।",
      "coreConcept": "পাঠ্যবইয়ের পৃষ্ঠা ২৩ অনুযায়ী, কিছু সুকেন্দ্রিক প্রোটোজোয়া যেমন Trichomonas এবং Monocercomonoides-এ মাইটোকন্ড্রিয়া অনুপস্থিত।",
      "distractorAnalysis": {
            "opt_bio_2_22_b": "অ্যামিবা ও ইউগ্লিনায় মাইটোকন্ড্রিয়া বিদ্যমান।",
            "opt_bio_2_22_c": "প্যারামেসিয়াম ও প্লাজমোডিয়ামে মাইটোকন্ড্রিয়া আছে।",
            "opt_bio_2_22_d": "হাইড্রা ও প্ল্যানেরিয়া বহুকোষী প্রাণী, যাদের কোষে মাইটোকন্ড্রিয়া থাকে।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 23
      },
      "proTipShortcut": "মাইটোকন্ড্রিয়াহীন ব্যতিক্রমী প্রোটোজোয়া = Trichomonas।"
},
    difficulty: "HARD",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_23",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "১৮৬৬ সালে কোন বিজ্ঞানী উদ্ভিদকোষের অনন্য অঙ্গাণু প্লাস্টিড আবিষ্কার করেন?",
    options: [
      {
            "id": "opt_bio_2_23_a",
            "text": "কার্ল বেন্ডা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_23_b",
            "text": "আর্নস্ট হেকেল",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_23_c",
            "text": "রবার্ট ব্রাউন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_23_d",
            "text": "ক্যামিলো গলজি",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: আর্নস্ট হেকেল।",
      "coreConcept": "বিজ্ঞানী আর্নস্ট হেকেল ১৮৬৬ সালে উদ্ভিদকোষের প্লাস্টিড আবিষ্কার করেন।",
      "distractorAnalysis": {
            "opt_bio_2_23_a": "কার্ল বেন্ডা মাইটোকন্ড্রিয়া নামকরণ করেন।",
            "opt_bio_2_23_c": "রবার্ট ব্রাউন ১৮৩১ সালে নিউক্লিয়াস আবিষ্কার করেন।",
            "opt_bio_2_23_d": "ক্যামিলো গলজি ১৮৯৮ সালে গলজি বস্তু আবিষ্কার করেন।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 23
      },
      "proTipShortcut": "হেকেল = প্লাস্টিড (১৮৬৬)।"
},
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_24",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "ক্লোরোপ্লাস্টের থাইলাকয়েড থলিগুলোর স্তূপীকৃত অংশকে কী বলা হয়?",
    options: [
      {
            "id": "opt_bio_2_24_a",
            "text": "স্ট্রোমা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_24_b",
            "text": "গ্রানা (Grana)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_24_c",
            "text": "ক্রিস্টি",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_24_d",
            "text": "ম্যাট্রিক্স",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: গ্রানা (Grana)।",
      "coreConcept": "ক্লোরোপ্লাস্টে চ্যাপ্টা থাইলাকয়েডগুলো কয়েনের স্তূপের মতো সজ্জিত থাকে, যাকে গ্রানা (একবচনে গ্রানাম) বলে।",
      "distractorAnalysis": {
            "opt_bio_2_24_a": "স্ট্রোমা হলো ক্লোরোপ্লাস্টের তরল ধাত্র।",
            "opt_bio_2_24_c": "ক্রিস্টি মাইটোকন্ড্রিয়ার ভেতরের পর্দা।",
            "opt_bio_2_24_d": "ম্যাট্রিক্স মাইটোকন্ড্রিয়ার ধাত্র।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 23
      },
      "proTipShortcut": "কয়েনের স্তূপ = গ্রানা (ক্লোরোপ্লাস্টে)।"
},
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_25",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "প্লাস্টিডের স্ট্রোমাতে কোন প্রধান জৈব রাসায়নিক কাজটি সম্পন্ন হয়?",
    options: [
      {
            "id": "opt_bio_2_25_a",
            "text": "সৌরশক্তি শোষণ",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_25_b",
            "text": "উৎসেচকের সহায়তায় শর্করা তৈরি",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_25_c",
            "text": "অক্সিজেন ব্যবহার করে চর্বি দহন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_25_d",
            "text": "প্রোটিনের প্যাকেজিং",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: উৎসেচকের সহায়তায় শর্করা তৈরি।",
      "coreConcept": "স্ট্রোমাতে অবস্থিত উৎসেচক ও আবদ্ধ সৌরশক্তি ব্যবহার করে কার্বন ডাই-অক্সাইড ও পানি থেকে শর্করা সংশ্লেষিত হয়।",
      "distractorAnalysis": {
            "opt_bio_2_25_a": "সৌরশক্তি শোষণ গ্রানার ক্লোরোফিলে ঘটে।",
            "opt_bio_2_25_c": "চর্বি দহন মাইটোকন্ড্রিয়া ও পারঅক্সিজোমে ঘটে।",
            "opt_bio_2_25_d": "প্রোটিন প্যাকেজিং গলজি বস্তুর কাজ।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 23
      },
      "proTipShortcut": "গ্রানা ধরে শক্তি, স্ট্রোমা বানায় রুটি (শর্করা)!"
},
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_26",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "গাজরের মূলে উজ্জ্বল কমলা বর্ণের জন্য প্লাস্টিডের কোন রঞ্জকটি প্রধানত দায়ী?",
    options: [
      {
            "id": "opt_bio_2_26_a",
            "text": "জ্যান্থোফিল",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_26_b",
            "text": "ক্যারোটিন",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_26_c",
            "text": "ফাইকোএরিথ্রিন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_26_d",
            "text": "ফাইকোসায়ানিন",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: ক্যারোটিন।",
      "coreConcept": "ক্যারোটিন কমলা বর্ণের জন্য দায়ী (যেমন: গাজরের মূল ও পাকা পেঁপে)।",
      "distractorAnalysis": {
            "opt_bio_2_26_a": "জ্যান্থোফিল হলুদ রঙের জন্য দায়ী।",
            "opt_bio_2_26_c": "ফাইকোএরিথ্রিন লাল রঙের জন্য দায়ী (লোহিত শৈবালে)।",
            "opt_bio_2_26_d": "ফাইকোসায়ানিন নীল রঙের জন্য দায়ী।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 24
      },
      "proTipShortcut": "Carrot (গাজর) → Carotene (ক্যারোটিন = কমলা)।"
},
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_27",
    topicId: "top_ssc_biology_ch2_2",
    type: "CQ_CREATIVE",
    stem: "জীববিজ্ঞান পরীক্ষাগারে শিক্ষক নবম শ্রেণির শিক্ষার্থীদের দুটি পৃথক অঙ্গাণু স্লাইডে দেখালেন। প্রথম অঙ্গাণুটি দ্বিস্তরবিশিষ্ট ঝিল্লিযুক্ত, যার অভ্যন্তরীণ স্তরটি আঙুলের মতো ভাঁজযুক্ত এবং এর ধাত্রে উৎসেচক সজ্জিত থাকে। দ্বিতীয় অঙ্গাণুটিতে থাইলাকয়েডের স্তূপ (গ্রানা) রয়েছে এবং এটি কেবল উদ্ভিদ কোষেই পাওয়া যায়। শিক্ষক বললেন, “এই অঙ্গাণু দুটি যথাক্রমে কোষের শক্তি উৎপাদন ও খাদ্য সংশ্লেষণের মূল প্রাণকেন্দ্র।”",
    options: null,
    explanation: {
      "directAnswer": "প্রথম অঙ্গাণুটি মাইটোকন্ড্রিয়া এবং দ্বিতীয়টি ক্লোরোপ্লাস্ট।",
      "coreConcept": "উদ্ভিদকোষে শক্তি রূপান্তর ও শক্তি উৎপাদনের দুটি প্রধান অঙ্গাণু হলো ক্লোরোপ্লাস্ট ও মাইটোকন্ড্রিয়া।",
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 22
      }
},
    cqRubric: {
      "ka": {
            "mark": 1,
            "criteria": "ক্রিস্টি (Cristae) কাকে বলে তা সঠিকভাবে লেখা।"
      },
      "kha": {
            "mark": 2,
            "criteria": "মাইটোকন্ড্রিয়াকে কোষের শক্তি উৎপাদন কেন্দ্র বা পাওয়ার হাউস বলা হয় কেন তা ব্যাখ্যা করা।"
      },
      "ga": {
            "mark": 3,
            "criteria": "উদ্দীপকে উল্লিখিত দ্বিতীয় অঙ্গাণুটির (ক্লোরোপ্লাস্ট) চিহ্নিত চিত্রসহ গঠন ব্যাখ্যা করা।"
      },
      "gha": {
            "mark": 4,
            "criteria": "উদ্দীপকের অঙ্গাণু দুটির পারস্পরিক নির্ভরশীলতা জীবজগতের অস্তিত্ব রক্ষার স্বার্থে কতটা জরুরি তা বিশ্লেষণ করা।"
      }
},
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];
