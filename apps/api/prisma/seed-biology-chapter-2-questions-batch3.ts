import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter2QuestionsBatch3: QuestionData[] = [
  {
    id: "q_bio_2_55",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "মানুষের নাক ও কানের পিনা নিচের কোন স্কেলিটাল টিস্যু দিয়ে গঠিত?",
    options: [
      {
            "id": "opt_bio_2_55_a",
            "text": "দৃঢ় অস্থি",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_55_b",
            "text": "কোমলাস্থি (Cartilage)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_55_c",
            "text": "ফাইব্রাস টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_55_d",
            "text": "কোলেনকাইমা",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: কোমলাস্থি (Cartilage)।",
      "coreConcept": "কোমলাস্থি হলো এক ধরনের স্থিতিস্থাপক ও নমনীয় স্কেলিটাল যোজক টিস্যু, যা নাক ও কানের পিনায় থাকে (পৃষ্ঠা ৩৬)।",
      "distractorAnalysis": {
            "opt_bio_2_55_a": "অস্থি অনমনীয় ও ক্যালসিয়ামযুক্ত দৃঢ় টিস্যু।",
            "opt_bio_2_55_c": "ফাইব্রাস টিস্যু ত্বকের নিচে থাকে।",
            "opt_bio_2_55_d": "কোলেনকাইমা উদ্ভিদ টিস্যু।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 36
      },
      "proTipShortcut": "নাক ও কান = নমনীয় কোমলাস্থি।"
},
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_56",
    topicId: "top_ssc_biology_ch2_3",
    type: "CQ_CREATIVE",
    stem: "মানবদেহের তিনটি ভিন্ন ধরনের পেশির বৈশিষ্ট্য নিয়ে ক্লাসে আলোচনা হচ্ছিল। ১ম পেশিটি অস্থির সাথে যুক্ত, রৈখিক এবং ইচ্ছানুযায়ী সংকুচিত হয়। ২য় পেশিটি মাকু আকৃতির এবং পাকস্থলী ও রক্তনালির প্রাচীরে অনৈচ্ছিক কাজ করে। ৩য় পেশিটি নলাকার ও শাখান্বিত এবং এতে বিশেষ ইন্টারক্যালেটেড ডিস্ক রয়েছে যা মৃত্যুর পূর্ব পর্যন্ত বিরতিহীনভাবে স্পন্দিত হয়।",
    options: null,
    explanation: {
      "directAnswer": "পেশি তিনটি হলো যথাক্রমে ঐচ্ছিক কঙ্কাল পেশি, মসৃণ অনৈচ্ছিক পেশি এবং কার্ডিয়াক হৃৎপেশি।",
      "coreConcept": "মানবদেহের পেশি টিস্যুর শ্রেণিবিভাগ ও কার্ডিয়াক পেশির ইন্টারক্যালেটেড ডিস্ক।",
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 38
      }
},
    cqRubric: {
      "ka": {
            "mark": 1,
            "criteria": "ইন্টারক্যালেটেড ডিস্ক (Intercalated disc) কী তা সঠিকভাবে লেখা।"
      },
      "kha": {
            "mark": 2,
            "criteria": "নিউরন কেন কখনো বিভাজিত হয় না তা ব্যাখ্যা করা (সক্রিয় সেন্ট্রিওল অনুপস্থিত)।"
      },
      "ga": {
            "mark": 3,
            "criteria": "১ম ও ২য় পেশির মধ্যে তুলনামূলক পার্থক্য চিহ্নিত চিত্র বা ছকের মাধ্যমে উপস্থাপন করা।"
      },
      "gha": {
            "mark": 4,
            "criteria": "৩য় পেশিটির (হৃৎপেশি) গঠন ও কাজ কীভাবে মানুষের জীবনকে নিরবচ্ছিন্ন সচল রাখে তা বিশ্লেষণ করা।"
      }
},
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_57",
    topicId: "top_ssc_biology_ch2_4",
    type: "MCQ",
    stem: "জীবদেহের অভ্যন্তরীণ অঙ্গসমূহ (যেমন: হৃৎপিণ্ড, ফুসফুস, বৃক্ক) নিয়ে জীববিজ্ঞানের যে শাখায় আলোচনা করা হয় তাকে কী বলে?",
    options: [
      {
            "id": "opt_bio_2_57_a",
            "text": "বহিঃঅঙ্গসংস্থান",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_57_b",
            "text": "অন্তঃঅঙ্গসংস্থান বা অ্যানাটমি (Anatomy)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_57_c",
            "text": "হিস্টোলজি",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_57_d",
            "text": "এমব্রায়োলজি",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: অন্তঃঅঙ্গসংস্থান বা অ্যানাটমি (Anatomy)।",
      "coreConcept": "দেহের অভ্যন্তরীণ অঙ্গসমূহ ব্যবচ্ছেদ করে গঠন বিশদ আলোচনা হলো অন্তঃঅঙ্গসংস্থান বা Anatomy (পৃষ্ঠা ৪০)।",
      "distractorAnalysis": {
            "opt_bio_2_57_a": "বহিঃঅঙ্গসংস্থান বাহ্যিক গঠন আলোচনা করে।",
            "opt_bio_2_57_c": "হিস্টোলজি টিস্যুর আণুবীক্ষণিক গঠন আলোচনা করে।",
            "opt_bio_2_57_d": "এমব্রায়োলজি ভ্রূণতত্ত্ব।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৪",
            "pageNumber": 40
      },
      "proTipShortcut": "ভেতরের অঙ্গ = অন্তঃঅঙ্গসংস্থান (Anatomy)।"
},
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_58",
    topicId: "top_ssc_biology_ch2_4",
    type: "MCQ",
    stem: "মানুষের পৌষ্টিক নালির সঠিক ক্রম কোনটি?",
    options: [
      {
            "id": "opt_bio_2_58_a",
            "text": "মুখছিদ্র → গলবিল → অন্ননালি → পাকস্থলী → ক্ষুদ্রান্ত্র → বৃহদন্ত্র → পায়ু",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_58_b",
            "text": "মুখছিদ্র → অন্ননালি → গলবিল → বৃহদন্ত্র → পাকস্থলী → পায়ু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_58_c",
            "text": "মুখছিদ্র → পাকস্থলী → গলবিল → ডিওডেনাম → ইলিয়াম → পায়ু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_58_d",
            "text": "মুখছিদ্র → গলবিল → শ্বাসনালি → পাকস্থলী → পায়ু",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: মুখছিদ্র → গলবিল → অন্ননালি → পাকস্থলী → ক্ষুদ্রান্ত্র → বৃহদন্ত্র → পায়ু।",
      "coreConcept": "পৌষ্টিক নালি মুখছিদ্র থেকে শুরু হয়ে পায়ুছিদ্র পর্যন্ত বিস্তৃত অবিচ্ছিন্ন পরিপাক পথ।",
      "distractorAnalysis": {
            "opt_bio_2_58_b": "গলবিল অন্ননালির আগে থাকে।",
            "opt_bio_2_58_c": "অন্ননালি পাকস্থলীর আগে অবস্থিত।",
            "opt_bio_2_58_d": "শ্বাসনালি শ্বসনতন্ত্রের অংশ।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৪",
            "pageNumber": 40
      },
      "proTipShortcut": "মুখ → গলবিল → অন্ননালি → পাকস্থলী → অন্ত্র।"
},
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_59",
    topicId: "top_ssc_biology_ch2_4",
    type: "MCQ",
    stem: "নিচের কোন তিনটি পরিপাকতন্ত্রের প্রধান পৌষ্টিক গ্রন্থি?",
    options: [
      {
            "id": "opt_bio_2_59_a",
            "text": "লালাগ্রন্থি, যকৃৎ ও অগ্ন্যাশয়",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_59_b",
            "text": "থাইরয়েড, পিটুইটারি ও সুপ্রারেনাল",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_59_c",
            "text": "বৃক্ক, প্লীহা ও হৃৎপিণ্ড",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_59_d",
            "text": "লালাগ্রন্থি, থাইরয়েড ও যকৃৎ",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: লালাগ্রন্থি, যকৃৎ ও অগ্ন্যাশয়।",
      "coreConcept": "এই তিনটি গ্রন্থি থেকে পরিপাক রস ক্ষরিত হয়ে পৌষ্টিক নালিতে খাদ্য পরিপাকে সহায়তা করে (পৃষ্ঠা ৪০)।",
      "distractorAnalysis": {
            "opt_bio_2_59_b": "এগুলো অন্তঃক্ষরা গ্রন্থি।",
            "opt_bio_2_59_c": "বৃক্ক রেচন অঙ্গ, হৃৎপিণ্ড রক্তসংবহনের অঙ্গ।",
            "opt_bio_2_59_d": "থাইরয়েড অন্তঃক্ষরা গ্রন্থি।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৪",
            "pageNumber": 40
      },
      "proTipShortcut": "পৌষ্টিক ৩ গ্রন্থি = লালাগ্রন্থি + যকৃৎ + অগ্ন্যাশয়।"
},
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_60",
    topicId: "top_ssc_biology_ch2_4",
    type: "MCQ",
    stem: "ফুসফুসের যে ক্ষুদ্রাতিক্ষুদ্র বায়ুথলিতে রক্ত ও বায়ুর মধ্যে গ্যাস বিনিময় ঘটে তাকে কী বলে?",
    options: [
      {
            "id": "opt_bio_2_60_a",
            "text": "ব্রঙ্কাস",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_60_b",
            "text": "ব্রঙ্কিওল",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_60_c",
            "text": "অ্যালভিওলাই (Alveoli)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_60_d",
            "text": "ল্যারিংস",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর গ: অ্যালভিওলাই (Alveoli)।",
      "coreConcept": "ফুসফুসের কার্যকরী একক হলো অ্যালভিওলাই, যার অতি পাতলা প্রাচীরে কৈশিকজালিকায় অক্সিজেন ও কার্বন ডাই-অক্সাইড বিনিময় ঘটে।",
      "distractorAnalysis": {
            "opt_bio_2_60_a": "ব্রঙ্কাস ট্রাকিয়ার প্রাথমিক শাখা।",
            "opt_bio_2_60_b": "ব্রঙ্কিওল ব্রঙ্কাসের সূক্ষ্ম প্রান্তশাখা।",
            "opt_bio_2_60_d": "ল্যারিংস স্বরযন্ত্র।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৪",
            "pageNumber": 40
      },
      "proTipShortcut": "গ্যাস বিনিময়ের থলি = অ্যালভিওলাই।"
},
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_61",
    topicId: "top_ssc_biology_ch2_4",
    type: "MCQ",
    stem: "মানবদেহের রেচনতন্ত্র নিচের কোন অঙ্গগুলোর সমন্বয়ে গঠিত?",
    options: [
      {
            "id": "opt_bio_2_61_a",
            "text": "একজোড়া বৃক্ক, একজোড়া ইউরেটার, একটি মূত্রথলি ও একটি মূত্রনালি",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_61_b",
            "text": "একটি বৃক্ক, দুটি মূত্রথলি ও দুটি ইউরেটার",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_61_c",
            "text": "একজোড়া ফুসফুস ও একজোড়া বৃক্ক",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_61_d",
            "text": "একজোড়া বৃক্ক, যকৃৎ ও মূত্রনালি",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: একজোড়া বৃক্ক, একজোড়া ইউরেটার, একটি মূত্রথলি ও একটি মূত্রনালি।",
      "coreConcept": "রেচনতন্ত্রের উপাদান সংখ্যা: ২ বৃক্ক + ২ ইউরেটার + ১ মূত্রথলি + ১ মূত্রনালি (ইউরেথ্রা) (পৃষ্ঠা ৪১)।",
      "distractorAnalysis": {
            "opt_bio_2_61_b": "বৃক্ক একজোড়া এবং মূত্রথলি একটি।",
            "opt_bio_2_61_c": "ফুসফুস শ্বসন অঙ্গ।",
            "opt_bio_2_61_d": "যকৃৎ পরিপাক গ্রন্থি।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৪",
            "pageNumber": 41
      },
      "proTipShortcut": "রেচনতন্ত্র = ২ বৃক্ক, ২ ইউরেটার, ১ থলি, ১ নালি।"
},
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_62",
    topicId: "top_ssc_biology_ch2_4",
    type: "MCQ",
    stem: "অন্তঃক্ষরা বা নালীহীন গ্রন্থি থেকে নিঃসৃত রসকে কী বলা হয়?",
    options: [
      {
            "id": "opt_bio_2_62_a",
            "text": "উৎসেচক বা এনজাইম",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_62_b",
            "text": "হরমোন (Hormone)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_62_c",
            "text": "লসিকা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_62_d",
            "text": "পিত্তরস",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: হরমোন (Hormone)।",
      "coreConcept": "অন্তঃক্ষরা গ্রন্থির কোনো নালি নেই; এ থেকে নিঃসৃত রাসায়নিক বার্তাবাহক হরমোন সরাসরি রক্তে মিশে কাজ করে।",
      "distractorAnalysis": {
            "opt_bio_2_62_a": "বহিঃক্ষরা গ্রন্থি থেকে নালির মাধ্যমে এনজাইম ক্ষরিত হয়।",
            "opt_bio_2_62_c": "লসিকা আন্তঃকোষীয় তরল।",
            "opt_bio_2_62_d": "পিত্তরস যকৃৎ থেকে ক্ষরিত পরিপাক রস।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৪",
            "pageNumber": 42
      },
      "proTipShortcut": "নালীহীন অন্তঃক্ষরা = হরমোন।"
},
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_63",
    topicId: "top_ssc_biology_ch2_4",
    type: "MCQ",
    stem: "অগ্ন্যাশয়ে অবস্থিত কোন অংশটি অন্তঃক্ষরা গ্রন্থি হিসেবে কাজ করে ইনসুলিন হরমোন নিঃসরণ করে?",
    options: [
      {
            "id": "opt_bio_2_63_a",
            "text": "বোম্যান্স ক্যাপসুল",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_63_b",
            "text": "আইলেটস অব ল্যাঙ্গারহ্যান্স",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_63_c",
            "text": "থাইরয়েড",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_63_d",
            "text": "সুপ্রারেনাল",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: আইলেটস অব ল্যাঙ্গারহ্যান্স।",
      "coreConcept": "অগ্ন্যাশয়ের আইলেটস অব ল্যাঙ্গারহ্যান্স একটি অন্তঃক্ষরা অংশ যা ইনসুলিন ও গ্লুকাগন হরমোন নিঃসরণ করে রক্তের গ্লুকোজ নিয়ন্ত্রণ করে।",
      "distractorAnalysis": {
            "opt_bio_2_63_a": "বোম্যান্স ক্যাপসুল বৃক্কে থাকে।",
            "opt_bio_2_63_c": "থাইরয়েড গলায় অবস্থিত আলাদা গ্রন্থি।",
            "opt_bio_2_63_d": "সুপ্রারেনাল বৃক্কের উপরে থাকে।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৪",
            "pageNumber": 42
      },
      "proTipShortcut": "অগ্ন্যাশয়ের হরমোন দ্বীপ = আইলেটস অব ল্যাঙ্গারহ্যান্স।"
},
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_64",
    topicId: "top_ssc_biology_ch2_4",
    type: "MCQ",
    stem: "সুপ্রারেনাল (অ্যাড্রেনাল) গ্রন্থি মানবদেহের কোথায় অবস্থিত?",
    options: [
      {
            "id": "opt_bio_2_64_a",
            "text": "মস্তিষ্কের গোড়ায়",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_64_b",
            "text": "গলার শ্বাসনালির দুপাশে",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_64_c",
            "text": "প্রতিটি বৃক্কের শীর্ষভাগে",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_64_d",
            "text": "পাকস্থলীর পেছনে",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর গ: প্রতিটি বৃক্কের শীর্ষভাগে।",
      "coreConcept": "Supra (উপরে) + Renal (বৃক্কীয়) = বৃক্কের ওপরে টুপির মতো অবস্থিত অ্যাড্রেনাল গ্রন্থি (পৃষ্ঠা ৪২)।",
      "distractorAnalysis": {
            "opt_bio_2_64_a": "মস্তিষ্কে থাকে পিটুইটারি গ্রন্থি।",
            "opt_bio_2_64_b": "গলায় থাকে থাইরয়েড ও প্যারাথাইরয়েড।",
            "opt_bio_2_64_d": "পাকস্থলীর পেছনে থাকে অগ্ন্যাশয়।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৪",
            "pageNumber": 42
      },
      "proTipShortcut": "সুপ্রারেনাল = বৃক্কের উপরের টুপি।"
},
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_65",
    topicId: "top_ssc_biology_ch2_4",
    type: "MCQ",
    stem: "মানবদেহের ত্বকতন্ত্রের প্রধান শারীরবৃত্তীয় কাজ কোনটি?",
    options: [
      {
            "id": "opt_bio_2_65_a",
            "text": "খাদ্য থেকে পুষ্টি শোষণ করা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_65_b",
            "text": "বাইরের আঘাত ও জীবাণু থেকে রক্ষা এবং দেহের জলীয় অংশ সংরক্ষণ",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_65_c",
            "text": "রক্তের মাধ্যমে অক্সিজেন বহন করা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_65_d",
            "text": "ইউরিয়া উৎপাদন করা",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: বাইরের আঘাত ও জীবাণু থেকে রক্ষা এবং দেহের জলীয় অংশ সংরক্ষণ।",
      "coreConcept": "ত্বক দেহকে বাইরের ক্ষতিকর প্রভাব থেকে রক্ষা করে এবং পানিশূন্যতা রোধ করে (পৃষ্ঠা ৪২)।",
      "distractorAnalysis": {
            "opt_bio_2_65_a": "পরিপাকতন্ত্রের কাজ।",
            "opt_bio_2_65_c": "রক্তসংবহনতন্ত্রের কাজ।",
            "opt_bio_2_65_d": "যকৃতে ইউরিয়া তৈরি হয়।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৪",
            "pageNumber": 42
      },
      "proTipShortcut": "ত্বক = সুরক্ষার দেওয়াল ও পানির ঢাল।"
},
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_66",
    topicId: "top_ssc_biology_ch2_4",
    type: "MCQ",
    stem: "নিচের কোন তন্ত্রটি দেহের অনৈচ্ছিক পেশির কার্যকারিতা নিয়ন্ত্রণ করে?",
    options: [
      {
            "id": "opt_bio_2_66_a",
            "text": "স্বয়ংক্রিয় স্নায়ুতন্ত্র (Autonomic nervous system)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_66_b",
            "text": "ঐচ্ছিক স্নায়ুতন্ত্র",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_66_c",
            "text": "ত্বকতন্ত্র",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_66_d",
            "text": "কঙ্কালতন্ত্র",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: স্বয়ংক্রিয় স্নায়ুতন্ত্র (Autonomic nervous system)।",
      "coreConcept": "স্নায়ুতন্ত্রের স্বয়ংক্রিয় অংশটি মানুষের ইচ্ছার বাইরে থাকা অনৈচ্ছিক পেশি ও অঙ্গসমূহের কাজ নিয়ন্ত্রণ করে (পৃষ্ঠা ৪০)।",
      "distractorAnalysis": {
            "opt_bio_2_66_b": "ঐচ্ছিক স্নায়ু কঙ্কালপেশি নিয়ন্ত্রণ করে।",
            "opt_bio_2_66_c": "ত্বকতন্ত্র আচ্ছাদন দেয়।",
            "opt_bio_2_66_d": "কঙ্কালতন্ত্র কাঠামো দেয়।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৪",
            "pageNumber": 40
      },
      "proTipShortcut": "অনৈচ্ছিক পেশি নিয়ন্ত্রণ = স্বয়ংক্রিয় স্নায়ুতন্ত্র।"
},
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_67",
    topicId: "top_ssc_biology_ch2_4",
    type: "CQ_CREATIVE",
    stem: "দশম শ্রেণির শিক্ষার্থী সিয়াম খেয়াল করল, তীব্র গরমে অতিরিক্ত ঘাম হলেও তার মূত্রের পরিমাণ স্বাভাবিকের চেয়ে অনেক কমে যায় এবং মূত্র গাঢ় হলুদ হয়। শিক্ষক বললেন, “আমাদের দেহের রেচনতন্ত্র এবং অন্তঃক্ষরা গ্রন্থিতন্ত্রের সমন্বিত হরমোন ক্ষরণের ফলেই দেহে পানির ভারসাম্য রক্ষিত হয়।”",
    options: null,
    explanation: {
      "directAnswer": "রেচনতন্ত্র ও পিটুইটারি থেকে ক্ষরিত হরমোনের সমন্বয়ে অসমোরেগুলেশন ঘটে।",
      "coreConcept": "রেচনতন্ত্রের বৃক্ক এবং অন্তঃক্ষরা গ্রন্থিতন্ত্রের সমন্বিত শারীরিক কাজ।",
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৪",
            "pageNumber": 41
      }
},
    cqRubric: {
      "ka": {
            "mark": 1,
            "criteria": "রেচন প্রক্রিয়া কাকে বলে তা সঠিকভাবে লেখা।"
      },
      "kha": {
            "mark": 2,
            "criteria": "থাইরয়েডকে কেন অন্তঃক্ষরা গ্রন্থি বলা হয় তা ব্যাখ্যা করা।"
      },
      "ga": {
            "mark": 3,
            "criteria": "মানবদেহের রেচনতন্ত্রের প্রধান চারটি অঙ্গের নাম ও চিহ্নিত সরল রেখাচিত্র উপস্থাপন করা।"
      },
      "gha": {
            "mark": 4,
            "criteria": "দেহে পানির ভারসাম্য রক্ষায় রেচনতন্ত্র ও অন্তঃক্ষরা গ্রন্থির যৌথ ভূমিকা বিশ্লেষণ করা।"
      }
},
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_68",
    topicId: "top_ssc_biology_ch2_4",
    type: "CQ_CREATIVE",
    stem: "একটি বিজ্ঞানের সেমিনারে আলোচনা হচ্ছিল, “মানবদেহের কোনো একটি তন্ত্র এককভাবে জীবন টিকিয়ে রাখতে পারে না। যেমন: খাদ্য গ্রহণের পর তা রক্তে পৌঁছাতে পরিপাকতন্ত্র লাগে, কিন্তু সেই খাদ্য থেকে শক্তি অবমুক্ত করতে শ্বসনতন্ত্রের বাতাস প্রয়োজন হয়।”",
    options: null,
    explanation: {
      "directAnswer": "পরিপাকতন্ত্র ও শ্বসনতন্ত্রের পারস্পরিক সমন্বয়ে জৈব শক্তি ATP তৈরি হয়।",
      "coreConcept": "পরিপাক ও শ্বসনতন্ত্রের মিথস্ক্রিয়ায় কোষীয় শ্বসন পরিচালনা।",
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৪",
            "pageNumber": 40
      }
},
    cqRubric: {
      "ka": {
            "mark": 1,
            "criteria": "অ্যালভিওলাই কী তা সঠিকভাবে লেখা।"
      },
      "kha": {
            "mark": 2,
            "criteria": "যকৃৎকে পরিপাক গ্রন্থি বলার কারণ ব্যাখ্যা করা।"
      },
      "ga": {
            "mark": 3,
            "criteria": "মানুষের শ্বসনতন্ত্রের বিভিন্ন অংশ ক্রমানুসারে নাসারন্ধ্র থেকে ফুসফুস পর্যন্ত বর্ণনা করা।"
      },
      "gha": {
            "mark": 4,
            "criteria": "কোষের শক্তি উৎপাদনে পরিপাকতন্ত্র ও শ্বসনতন্ত্রের অপরিহার্য সমন্বয় বিশ্লেষণ করা।"
      }
},
    difficulty: "HARD",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_69",
    topicId: "top_ssc_biology_ch2_5",
    type: "MCQ",
    stem: "যৌগিক অণুবীক্ষণ যন্ত্রে মোট বিবর্ধন নির্ণয়ের সঠিক সূত্র কোনটি?",
    options: [
      {
            "id": "opt_bio_2_69_a",
            "text": "মোট বিবর্ধন = আইপিসের বিবর্ধন ক্ষমতা + অবজেক্টিভের বিবর্ধন ক্ষমতা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_69_b",
            "text": "মোট বিবর্ধন = আইপিসের বিবর্ধন ক্ষমতা × অবজেক্টিভের বিবর্ধন ক্ষমতা",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_69_c",
            "text": "মোট বিবর্ধন = অবজেক্টিভের বিবর্ধন ক্ষমতা ÷ আইপিসের বিবর্ধন ক্ষমতা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_69_d",
            "text": "মোট বিবর্ধন = কোর্স অ্যাডজাস্টমেন্ট × ফাইন অ্যাডজাস্টমেন্ট",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: মোট বিবর্ধন = আইপিসের বিবর্ধন ক্ষমতা × অবজেক্টিভের বিবর্ধন ক্ষমতা।",
      "coreConcept": "মোট বিবর্ধন হলো উভয় লেন্সের বিবর্ধনের গুণফল (যেমন: 10x × 40x = 400x) (পৃষ্ঠা ৪৪)।",
      "distractorAnalysis": {
            "opt_bio_2_69_a": "বিবর্ধন যোগ হয় না, গুণ হয়।",
            "opt_bio_2_69_c": "ভাগ হয় না।",
            "opt_bio_2_69_d": "অ্যাডজাস্টমেন্ট নব ফোকাস করার স্ক্রু, বিবর্ধক লেন্স নয়।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৫",
            "pageNumber": 44
      },
      "proTipShortcut": "মোট বিবর্ধন = Eyepiece × Objective।"
},
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_70",
    topicId: "top_ssc_biology_ch2_5",
    type: "MCQ",
    stem: "একটি যৌগিক অণুবীক্ষণ যন্ত্রের আইপিস 12x এবং অবজেক্টিভ 40x হলে নমুনাটি তার প্রকৃত আকারের চেয়ে কত গুণ বড় দেখাবে?",
    options: [
      {
            "id": "opt_bio_2_70_a",
            "text": "৫২ গুণ",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_70_b",
            "text": "৪৮০ গুণ",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_70_c",
            "text": "৪০০ গুণ",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_70_d",
            "text": "১২০ গুণ",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: ৪৮০ গুণ।",
      "coreConcept": "মোট বিবর্ধন = ১২ × ৪০ = ৪৮০ গুণ।",
      "distractorAnalysis": {
            "opt_bio_2_70_a": "১২ + ৪০ = ৫২ (ভুল যোগ)।",
            "opt_bio_2_70_c": "১০ × ৪০ = ৪০০ গুণ (১০x আইপিসের জন্য প্রযোজ্য)।",
            "opt_bio_2_70_d": "১২ × ১০ = ১২০ গুণ।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৫",
            "pageNumber": 44
      },
      "proTipShortcut": "১২ × ৪০ = ৪৮০ গুণ।"
},
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_71",
    topicId: "top_ssc_biology_ch2_5",
    type: "MCQ",
    stem: "যৌগিক অণুবীক্ষণে স্লাইডকে নিখুঁত ও অত্যন্ত স্পষ্ট ফোকাসে আনতে নিচের কোনটি ব্যবহৃত হয়?",
    options: [
      {
            "id": "opt_bio_2_71_a",
            "text": "কোর্স অ্যাডজাস্টমেন্ট নব",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_71_b",
            "text": "ফাইন অ্যাডজাস্টমেন্ট নব",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_71_c",
            "text": "ডায়াফ্রাম স্ক্রু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_71_d",
            "text": "নোজপিস",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: ফাইন অ্যাডজাস্টমেন্ট নব।",
      "coreConcept": "ফাইন নব সামান্য ঘোরালে স্টেজ অতি সূক্ষ্মভাবে নড়ে এবং ঝাপসা ভাব কেটে নিখুঁত স্পষ্ট ফোকাস তৈরি হয় (পৃষ্ঠা ৪৪)।",
      "distractorAnalysis": {
            "opt_bio_2_71_a": "কোর্স নব দ্রুত ও স্থূল ফোকাস করার জন্য ব্যবহৃত হয়।",
            "opt_bio_2_71_c": "ডায়াফ্রাম স্ক্রু আলোর পরিমাণ নিয়ন্ত্রণ করে।",
            "opt_bio_2_71_d": "নোজপিস অবজেক্টিভ ঘোরানোর চাকা।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৫",
            "pageNumber": 44
      },
      "proTipShortcut": "নিখুঁত স্পষ্টতা = ফাইন অ্যাডজাস্টমেন্ট।"
},
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_72",
    topicId: "top_ssc_biology_ch2_5",
    type: "MCQ",
    stem: "আলোক অণুবীক্ষণ যন্ত্রে কত ন্যানোমিটারের (nm) চেয়ে ছোট বস্তুকে ফোকাস করা সম্ভব নয়?",
    options: [
      {
            "id": "opt_bio_2_72_a",
            "text": "৫০ nm",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_72_b",
            "text": "১০০ nm",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_72_c",
            "text": "২০০ nm",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_72_d",
            "text": "৪০০ nm",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর গ: ২০০ nm।",
      "coreConcept": "দৃশ্যমান আলোর তরঙ্গদৈর্ঘ্য ৪০০–৭০০ nm হওয়ায় এর অর্ধেকের নিচে অর্থাৎ ২০০ nm-এর চেয়ে ক্ষুদ্র বস্তুকে আলোক অণুবীক্ষণে স্পষ্ট করা যায় না (পৃষ্ঠা ৪৬)।",
      "distractorAnalysis": {
            "opt_bio_2_72_a": "৫০ nm কেবল ইলেকট্রন অণুবীক্ষণে দৃশ্যমান।",
            "opt_bio_2_72_b": "১০০ nm আলোক অণুবীক্ষণের সীমার বাইরে।",
            "opt_bio_2_72_d": "৪০০ nm দৃশ্যমান আলোর সর্বনিম্ন তরঙ্গদৈর্ঘ্য।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৫",
            "pageNumber": 46
      },
      "proTipShortcut": "আলোক অণুবীক্ষণের বিভেদন সীমা = ২০০ nm।"
},
    difficulty: "HARD",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_73",
    topicId: "top_ssc_biology_ch2_5",
    type: "MCQ",
    stem: "ইলেকট্রন অণুবীক্ষণ যন্ত্রে কাচের লেন্সের পরিবর্তে কী ব্যবহৃত হয়?",
    options: [
      {
            "id": "opt_bio_2_73_a",
            "text": "প্লাস্টিক লেন্স",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_73_b",
            "text": "শক্তিশালী তড়িৎচুম্বক (Electromagnet)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_73_c",
            "text": "অবতল দর্পণ",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_73_d",
            "text": "প্রিজম ব্যবস্থা",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: শক্তিশালী তড়িৎচুম্বক (Electromagnet)।",
      "coreConcept": "ইলেকট্রন স্রোত কাচ ভেদ করতে পারে না; শক্তিশালী তড়িৎচুম্বকের চৌম্বক ক্ষেত্র ইলেকট্রন রশ্মির গতিপথ বাঁকিয়ে ফোকাস তৈরি করে (পৃষ্ঠা ৪৬)।",
      "distractorAnalysis": {
            "opt_bio_2_73_a": "প্লাস্টিক লেন্স অপটিক্যাল লেন্সে রূপান্তর করতে পারে না।",
            "opt_bio_2_73_c": "অবতল দর্পণ আলোক অণুবীক্ষণে আলো প্রতিফলিত করে।",
            "opt_bio_2_73_d": "প্রিজম বর্ণালি বিশ্লেষণে ব্যবহৃত হয়।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৫",
            "pageNumber": 46
      },
      "proTipShortcut": "ইলেকট্রন লেন্স = তড়িৎচুম্বক লেন্স।"
},
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_74",
    topicId: "top_ssc_biology_ch2_5",
    type: "MCQ",
    stem: "পেঁয়াজের ত্বক কোষ পর্যবেক্ষণের সময় কোন রঞ্জক পদার্থটি ব্যবহার করা হয়?",
    options: [
      {
            "id": "opt_bio_2_74_a",
            "text": "মিথাইলিন ব্লু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_74_b",
            "text": "স্যাফ্রানিন দ্রবণ (Safranin)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_74_c",
            "text": "ফেনল রেড",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_74_d",
            "text": "ব্রোমোথাইমল ব্লু",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: স্যাফ্রানিন দ্রবণ (Safranin)।",
      "coreConcept": "স্যাফ্রানিন দিয়ে পেঁয়াজের শল্কপত্রের কোষপ্রাচীর ও নিউক্লিয়াস লালচে গোলাপি রঙে রঞ্জিত করা হয় (পৃষ্ঠা ৪৬–৪৭)।",
      "distractorAnalysis": {
            "opt_bio_2_74_a": "মিথাইলিন ব্লু গালের আবরণী কোষ রঞ্জনে ব্যবহৃত হয়।",
            "opt_bio_2_74_c": "ফেনল রেড pH নির্দেশক।",
            "opt_bio_2_74_d": "ব্রোমোথাইমল ব্লু অম্ল-ক্ষার নির্দেশক।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৫",
            "pageNumber": 46
      },
      "proTipShortcut": "পেঁয়াজ কোষ = স্যাফ্রানিন (Safranin)।"
},
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_75",
    topicId: "top_ssc_biology_ch2_5",
    type: "MCQ",
    stem: "গালের ভেতরের আবরণী কোষ পর্যবেক্ষণে নিচের কোন স্টেইনটি (stain) ব্যবহৃত হয়?",
    options: [
      {
            "id": "opt_bio_2_75_a",
            "text": "স্যাফ্রানিন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_75_b",
            "text": "মিথাইলিন ব্লু (Methylene blue)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_75_c",
            "text": "ইওসিন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_75_d",
            "text": "আয়োডিন",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: মিথাইলিন ব্লু (Methylene blue)।",
      "coreConcept": "মিথাইলিন ব্লু গালের আবরণী কোষে যোগ করে ২-৩ মিনিট রাখলে কোষের কেন্দ্রস্থ নিউক্লিয়াস নীল রঙে রঞ্জিত হয় (পৃষ্ঠা ৪৭)।",
      "distractorAnalysis": {
            "opt_bio_2_75_a": "স্যাফ্রানিন পেঁয়াজ কোষে ব্যবহৃত হয়।",
            "opt_bio_2_75_c": "ইওসিন সাইটোপ্লাজমীয় কাউন্টারস্টেইন।",
            "opt_bio_2_75_d": "আয়োডিন শ্বেতসার পরীক্ষায় ব্যবহৃত হয়।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৫",
            "pageNumber": 47
      },
      "proTipShortcut": "গালের ভেতরের কোষ = মিথাইলিন ব্লু।"
},
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_76",
    topicId: "top_ssc_biology_ch2_5",
    type: "MCQ",
    stem: "পেঁয়াজের ত্বক কোষে নিউক্লিয়াসটি কোষের একপাশে অবস্থান করার কারণ কী?",
    options: [
      {
            "id": "opt_bio_2_76_a",
            "text": "কোষপ্রাচীর অতি পুরু হওয়ার কারণে",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_76_b",
            "text": "কোষের কেন্দ্রে একটি বৃহৎ কোষগহ্বর থাকার কারণে",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_76_c",
            "text": "প্লাস্টিড অনুপস্থিত থাকার জন্য",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_76_d",
            "text": "সেন্ট্রোজোমের চাপের কারণে",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: কোষের কেন্দ্রে একটি বৃহৎ কোষগহ্বর থাকার কারণে।",
      "coreConcept": "উদ্ভিদকোষের কেন্দ্রে বিশাল আকারের কোষগহ্বর সৃষ্টি হওয়ায় সাইটোপ্লাজম ও নিউক্লিয়াস পরিধির দিকে চেপে যায় (পৃষ্ঠা ৪৭)।",
      "distractorAnalysis": {
            "opt_bio_2_76_a": "কোষপ্রাচীর পরিধিতে থাকে, কিন্তু নিউক্লিয়াস সরানোর কারণ নয়।",
            "opt_bio_2_76_c": "প্লাস্টিডের সাথে নিউক্লিয়াসের অবস্থানের সম্পর্ক নেই।",
            "opt_bio_2_76_d": "উদ্ভিদকোষে সেন্ট্রোজোম সাধারণত থাকে না।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৫",
            "pageNumber": 47
      },
      "proTipShortcut": "উদ্ভিদকোষের নিউক্লিয়াস পরিধিতে = বড় গহ্বরের ধাক্কায়।"
},
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_77",
    topicId: "top_ssc_biology_ch2_5",
    type: "MCQ",
    stem: "লাইসোজোমের কাজ কোনটি? [NCTB পাঠ্যবই নমুনা বহুনির্বাচনি প্রশ্ন ১]",
    options: [
      {
            "id": "opt_bio_2_77_a",
            "text": "খাদ্য তৈরি",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_77_b",
            "text": "শক্তি উৎপাদন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_77_c",
            "text": "জীবাণু ভক্ষণ",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_77_d",
            "text": "প্রোটিন সংশ্লেষণ",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর গ: জীবাণু ভক্ষণ।",
      "coreConcept": "পাঠ্যবইয়ের পৃষ্ঠা ৪৮-এর নমুনা বহুনির্বাচনি প্রশ্ন ১। লাইসোজোম ফ্যাগোসাইটোসিস প্রক্রিয়ায় রোগজীবাণু ভক্ষণ করে জীবদেহকে রক্ষা করে।",
      "distractorAnalysis": {
            "opt_bio_2_77_a": "খাদ্য তৈরি ক্লোরোপ্লাস্টের কাজ।",
            "opt_bio_2_77_b": "শক্তি উৎপাদন মাইটোকন্ড্রিয়ার কাজ।",
            "opt_bio_2_77_d": "প্রোটিন সংশ্লেষণ রাইবোজোমের কাজ।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · নমুনা বহুনির্বাচনি ১",
            "pageNumber": 48
      },
      "proTipShortcut": "লাইসোজোম = জীবাণু ধ্বংসকারী রক্ষক।"
},
    difficulty: "EASY",
    boardSource: "NCTB পাঠ্যবই নমুনা প্রশ্ন ১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_78",
    topicId: "top_ssc_biology_ch2_5",
    type: "MCQ",
    stem: "অ্যামিবা একটি প্রাণিকোষ, কারণ এর—\\ni. সুসংগঠিত কেন্দ্রিকা রয়েছে\\nii. বর্ণগঠনকারী কণিকা আছে\\niii. কোষঝিল্লি উপস্থিত\\nনিচের কোনটি সঠিক? [NCTB পাঠ্যবই নমুনা বহুনির্বাচনি প্রশ্ন ২]",
    options: [
      {
            "id": "opt_bio_2_78_a",
            "text": "i ও ii",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_78_b",
            "text": "i ও iii",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_78_c",
            "text": "ii ও iii",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_78_d",
            "text": "i, ii ও iii",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: i ও iii।",
      "coreConcept": "অ্যামিবায় সুসংগঠিত নিউক্লিয়াস ও প্লাজমালেমা থাকে, কিন্তু বর্ণগঠনকারী প্লাস্টিড থাকে না (পৃষ্ঠা ৪৮)।",
      "distractorAnalysis": {
            "opt_bio_2_78_a": "ii ভুল কারণ প্রাণিকোষে বর্ণগঠনকারী প্লাস্টিড থাকে না।",
            "opt_bio_2_78_c": "ii অন্তর্ভুক্ত থাকায় ভুল।",
            "opt_bio_2_78_d": "ii ভুল থাকায় ঘ সঠিক নয়।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · নমুনা বহুনির্বাচনি ২",
            "pageNumber": 48
      },
      "proTipShortcut": "প্রাণিকোষ = নো প্লাস্টিড (No plastid)!"
},
    difficulty: "MEDIUM",
    boardSource: "NCTB পাঠ্যবই নমুনা প্রশ্ন ২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_79",
    topicId: "top_ssc_biology_ch2_5",
    type: "CQ_CREATIVE",
    stem: "রিয়াসাত গ্রামের বাড়িতে যাওয়ার সময় দেখল একজন লোক খালের পাড়ে বসে পাট থেকে আঁশ ছাড়াচ্ছে। সে পরে আরও লক্ষ্য করল, পানিতে অনেক কচুরিপানা স্বাভাবিকভাবে ভেসে রয়েছে। [NCTB পাঠ্যবই নমুনা উদ্দীপক, পৃষ্ঠা ৪৮]",
    options: null,
    explanation: {
      "directAnswer": "পাটের আঁশ বাস্ট ফাইবার (স্ক্লেরেনকাইমা) এবং কচুরিপানা অ্যারেনকাইমা (প্যারেনকাইমা)।",
      "coreConcept": "উদ্ভিদের সরল ও যান্ত্রিক টিস্যুর অভিযোজনিক গুরুত্ব।",
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · পৃষ্ঠা ৪৮",
            "pageNumber": 48
      }
},
    cqRubric: {
      "ka": {
            "mark": 1,
            "criteria": "বাস্ট ফাইবার কী তা সঠিকভাবে লেখা (উদ্ভিদের গৌণ ফ্লোয়েম থেকে উৎপন্ন স্ক্লেরেনকাইমা তন্তু)।"
      },
      "kha": {
            "mark": 2,
            "criteria": "কোন টিস্যু জলজ উদ্ভিদকে পানিতে ভেসে থাকতে সাহায্য করে এবং কেন তা ব্যাখ্যা করা (বায়ুকুঠুরিযুক্ত অ্যারেনকাইমা)।"
      },
      "ga": {
            "mark": 3,
            "criteria": "উদ্দীপকের পাট থেকে ছাড়ানো অংশের টিস্যুটির (স্ক্লেরেনকাইমা বাস্ট ফাইবার) গঠনগত বৈশিষ্ট্য ৩ নম্বরের মানে ব্যাখ্যা করা।"
      },
      "gha": {
            "mark": 4,
            "criteria": "উদ্দীপকে উল্লিখিত কচুরিপানার পানিতে ভেসে থাকার সাথে তার অন্তঃকোষীয় গঠনের অভিযোজনিক গুরুত্ব বিশ্লেষণ করা।"
      }
},
    difficulty: "MEDIUM",
    boardSource: "NCTB পাঠ্যবই উদ্দীপক ৩ ও ৪",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_80",
    topicId: "top_ssc_biology_ch2_5",
    type: "CQ_CREATIVE",
    stem: "ব্যবহারিক ক্লাসে সামিয়া শিক্ষক নির্দেশিত পদ্ধতিতে পেঁয়াজের শল্কপত্র থেকে পাতলা ত্বক নিয়ে স্যাফ্রানিন রঞ্জকে রঞ্জিত করল এবং স্লাইডটি যৌগিক অণুবীক্ষণ যন্ত্রে ১০ গুণ আইপিস ও ৪০ গুণ অবজেক্টিভ লেন্সের নিচে স্থাপন করল। সে সুস্পষ্ট কোষপ্রাচীরযুক্ত আয়তাকার কোষ দেখতে পেল। এরপর সে নিজের মুখের ভেতরের আবরণী কোষ নিয়ে মিথাইলিন ব্লু দিয়ে স্লাইড তৈরি করে পর্যবেক্ষণ করল।",
    options: null,
    explanation: {
      "directAnswer": "ব্যবহারিক পেঁয়াজ কোষ ও গালের আবরণী কোষের অণুবীক্ষণিক পর্যবেক্ষণ ও তুলনামূলক বিশ্লেষণ।",
      "coreConcept": "উদ্ভিদ ও প্রাণিকোষের অণুবীক্ষণিক দৃশ্যমান পার্থক্য এবং স্টেইনিং কৌশল।",
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৫",
            "pageNumber": 46
      }
},
    cqRubric: {
      "ka": {
            "mark": 1,
            "criteria": "স্টেইনিং (Staining) কাকে বলে তা সঠিকভাবে লেখা।"
      },
      "kha": {
            "mark": 2,
            "criteria": "যৌগিক অণুবীক্ষণে কোর্স অ্যাডজাস্টমেন্ট ও ফাইন অ্যাডজাস্টমেন্টের কাজের পার্থক্য ব্যাখ্যা করা।"
      },
      "ga": {
            "mark": 3,
            "criteria": "সামিয়া তার প্রথম স্লাইডে নমুনাটি মোট কত গুণ বিবর্ধিত দেখল তা সূত্রের সাহায্যে নির্ণয় করে পেঁয়াজ কোষের ৩টি শনাক্তকারী বৈশিষ্ট্য লেখা।"
      },
      "gha": {
            "mark": 4,
            "criteria": "সামিয়ার পর্যবেক্ষিত পেঁয়াজ কোষ ও মুখের আবরণী কোষের মধ্যে চিহ্নিত চিত্র ও গঠনগত ৪টি মৌলিক পার্থক্য তুলনামূলক বিশ্লেষণ করা।"
      }
},
    difficulty: "MEDIUM",
    boardSource: "ব্যবহারিক সৃজনশীল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];
