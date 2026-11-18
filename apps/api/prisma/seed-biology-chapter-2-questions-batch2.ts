import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter2QuestionsBatch2: QuestionData[] = [
  {
    id: "q_bio_2_28",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "সূর্যের আলোর সংস্পর্শে এলে নিচের কোন প্লাস্টিডটি ক্লোরোপ্লাস্টে রূপান্তরিত হতে পারে?",
    options: [
      {
            "id": "opt_bio_2_28_a",
            "text": "লিউকোপ্লাস্ট",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_28_b",
            "text": "ক্রোমোপ্লাস্ট",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_28_c",
            "text": "অ্যামাইলোপ্লাস্ট",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_28_d",
            "text": "ইলায়োপ্লাস্ট",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: লিউকোপ্লাস্ট।",
      "coreConcept": "উদ্ভিদের যেসব কোষে সূর্যালোক পৌঁছায় না সেখানে বর্ণহীন লিউকোপ্লাস্ট থাকে; তবে আলো পেলে এরা ক্লোরোপ্লাস্টে রূপান্তরিত হয়।",
      "distractorAnalysis": {
            "opt_bio_2_28_b": "ক্রোমোপ্লাস্ট ইতোমধ্যে রঙিন প্লাস্টিড।",
            "opt_bio_2_28_c": "অ্যামাইলোপ্লাস্ট স্টার্চ সঞ্চয়ী প্লাস্টিড।",
            "opt_bio_2_28_d": "ইলায়োপ্লাস্ট তেল/চর্বি সঞ্চয়ী প্লাস্টিড।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 24
      },
      "proTipShortcut": "আলোর ছোঁয়া পেলে বর্ণহীন লিউকো সবুজ ক্লোরো হয়ে যায়।"
},
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_29",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "কোষের কোন অঙ্গাণু উৎসেচক ও হরমোন ক্ষরণ এবং প্রোটিন প্যাকেজিং ও সঞ্চয়ে প্রধান ভূমিকা পালন করে?",
    options: [
      {
            "id": "opt_bio_2_29_a",
            "text": "গলজি বস্তু (Golgi body)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_29_b",
            "text": "লাইসোজোম",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_29_c",
            "text": "সেন্ট্রোসোম",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_29_d",
            "text": "কোষগহ্বর",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: গলজি বস্তু (Golgi body)।",
      "coreConcept": "গলজি বস্তু সিস্টার্নি ও ভেসিকল নিয়ে গঠিত, যা এনজাইম-হরমোন ক্ষরণ, প্রোটিন প্যাকেজিং ও নিঃসরণে সাহায্য করে।",
      "distractorAnalysis": {
            "opt_bio_2_29_b": "লাইসোজোম পরিপাক ও জীবাণু ভক্ষণে কাজ করে।",
            "opt_bio_2_29_c": "সেন্ট্রোসোম কোষ বিভাজনে সাহায্য করে।",
            "opt_bio_2_29_d": "কোষগহ্বর কোষরস ধারণ করে।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 25
      },
      "proTipShortcut": "প্যাকেজিং ও ক্ষরণ কেন্দ্র = গলজি বস্তু।"
},
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_30",
    topicId: "top_ssc_biology_ch2_2",
    type: "MCQ",
    stem: "অমসৃণ এন্ডোপ্লাজমিক রেটিকুলামের আবরণের গায়ে কোন কণা লেগে থাকে?",
    options: [
      {
            "id": "opt_bio_2_30_a",
            "text": "অক্সিজোম",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_30_b",
            "text": "রাইবোজোম",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_30_c",
            "text": "সেন্ট্রিওল",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_30_d",
            "text": "লাইসোজোম",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: রাইবোজোম।",
      "coreConcept": "অমসৃণ এন্ডোপ্লাজমিক জালিকার গায়ে রাইবোজোম দানা লেগে থাকে, যা প্রোটিন সংশ্লেষণ ও পরিবহনে সহায়তা করে।",
      "distractorAnalysis": {
            "opt_bio_2_30_a": "অক্সিজোম মাইটোকন্ড্রিয়ার ক্রিস্টির গায়ে থাকে।",
            "opt_bio_2_30_c": "সেন্ট্রিওল সেন্ট্রোজোমের ভেতর থাকে।",
            "opt_bio_2_30_d": "লাইসোজোম আলাদা থলিকা।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 25
      },
      "proTipShortcut": "অমসৃণ ER = রাইবোজোম দানাযুক্ত।"
},
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_31",
    topicId: "top_ssc_biology_ch2_2",
    type: "CQ_CREATIVE",
    stem: "উদ্দীপক: নবম শ্রেণির জীববিজ্ঞান পাঠ্যবইয়ের পৃষ্ঠা ৪৯-এর নমুনা সৃজনশীল প্রশ্ন ১ অনুযায়ী নিচের তিনটি কোষীয় অঙ্গাণু পর্যবেক্ষণ করো:\\nM = দুটি পরস্পরের সাথে সমকোণে থাকা ফাঁপা নলাকার সেন্ট্রিওলযুক্ত সেন্ট্রোজোম\\nN = দ্বিস্তরবিশিষ্ট আবরণী ও ক্রিস্টিযুক্ত মাইটোকন্ড্রিয়া\\nP = নিউক্লিয়ার ঝিল্লি, নিউক্লিওলাস ও ক্রোমাটিন তন্তুযুক্ত নিউক্লিয়াস",
    options: null,
    explanation: {
      "directAnswer": "এটি পাঠ্যবই পৃষ্ঠা ৪৯-এর নমুনা সৃজনশীল প্রশ্ন ১। M=সেন্ট্রোজোম, N=মাইটোকন্ড্রিয়া, P=নিউক্লিয়াস।",
      "coreConcept": "কোষীয় অঙ্গাণুর গঠন ও কাজের পারস্পরিক নির্ভরতা।",
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · নমুনা সৃজনশীল ১",
            "pageNumber": 49
      }
},
    cqRubric: {
      "ka": {
            "mark": 1,
            "criteria": "প্লাজমালেমা কাকে বলে তা সঠিকভাবে লেখা (দ্বিস্তরবিশিষ্ট লিপিড-প্রোটিন নির্মিত বৈষম্যভেদ্য কোষঝিল্লি)।"
      },
      "kha": {
            "mark": 2,
            "criteria": "প্লাস্টিডকে বর্ণগঠনকারী অঙ্গাণু বলা হয় কেন তা ক্লোরোফিল ও ক্রোমোপ্লাস্টের রঞ্জকের ভিত্তিতে ব্যাখ্যা করা।"
      },
      "ga": {
            "mark": 3,
            "criteria": "M চিত্রের অঙ্গাণু (সেন্ট্রোজোম/সেন্ট্রিওল) কোষ বিভাজনে স্পিন্ডল ও অ্যাস্টার রে গঠনে কেন গুরুত্বপূর্ণ তা ৩ নম্বরের মানে ব্যাখ্যা করা।"
      },
      "gha": {
            "mark": 4,
            "criteria": "N (মাইটোকন্ড্রিয়া) এর ক্রেবস চক্রে শক্তি উৎপাদন এবং P (নিউক্লিয়াস) এর ক্রোমোজোম ও DNA দ্বারা বংশগতি নিয়ন্ত্রণের ভূমিকা যুক্তিসহ বিশ্লেষণ করা।"
      }
},
    difficulty: "HARD",
    boardSource: "NCTB পাঠ্যবই নমুনা সৃজনশীল ১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_32",
    topicId: "top_ssc_biology_ch2_2",
    type: "CQ_CREATIVE",
    stem: "পরীক্ষাগারে শিক্ষার্থী তামিম একটি কোষীয় অঙ্গাণু পর্যবেক্ষণ করল যা একক ঝিল্লিবিশিষ্ট থলি এবং তীব্র অম্লীয় হাইড্রোলাইটিক উৎসেচকে পূর্ণ। শিক্ষক বললেন, “এই অঙ্গাণুটি কোষের সুরক্ষাকর্মী হিসেবে বহিরাগত জীবাণু হজম করে ধ্বংস করে; তবে কোষটি যদি অক্সিজেন বা খাদ্যের সংকটে পড়ে, তবে এই অঙ্গাণুর প্রাচীর ফেটে কোষের অন্যান্য অঙ্গাণুও বিনষ্ট হয়ে যেতে পারে।”",
    options: null,
    explanation: {
      "directAnswer": "অঙ্গাণুটি হলো লাইসোজোম এবং ঘটনাটি হলো অটোলাইসিস।",
      "coreConcept": "লাইসোজোমের হাইড্রোলাইটিক এনজাইম ও আত্মঘাতী থলিকার ক্রিয়া।",
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.২",
            "pageNumber": 25
      }
},
    cqRubric: {
      "ka": {
            "mark": 1,
            "criteria": "অটোলাইসিস (Autolysis) কাকে বলে তা সঠিকভাবে লেখা।"
      },
      "kha": {
            "mark": 2,
            "criteria": "লাইসোজোমকে কোষের 'আত্মঘাতী থলিকা' বলা হয় কেন তা ব্যাখ্যা করা।"
      },
      "ga": {
            "mark": 3,
            "criteria": "উদ্দীপকে বর্ণিত অঙ্গাণুটির গঠন ও স্বাভাবিক সুরক্ষা সংক্রান্ত কাজ ব্যাখ্যা করা।"
      },
      "gha": {
            "mark": 4,
            "criteria": "দেহে লাইসোজোমের ভারসাম্য নষ্ট হলে কী ধরনের পরিণতি হতে পারে তা বিশ্লেষণ করা।"
      }
},
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_33",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "যে স্থায়ী টিস্যুর প্রতিটি কোষ আকার, আকৃতি ও গঠনের দিক থেকে অভিন্ন তাকে কী বলে?",
    options: [
      {
            "id": "opt_bio_2_33_a",
            "text": "জটিল টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_33_b",
            "text": "সরল টিস্যু",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_33_c",
            "text": "ভাজক টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_33_d",
            "text": "নিঃস্রাবী টিস্যু",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: সরল টিস্যু।",
      "coreConcept": "সরল টিস্যুর সকল কোষ একই রূপ ও বৈশিষ্ট্যের হয় (প্যারেনকাইমা, কোলেনকাইমা ও স্ক্লেরেনকাইমা)।",
      "distractorAnalysis": {
            "opt_bio_2_33_a": "জটিল টিস্যুর কোষগুলো বিভিন্ন ধরনের হয় (যেমন: জাইলেম, ফ্লোয়েম)।",
            "opt_bio_2_33_c": "ভাজক টিস্যু বিভাজনে সক্ষম কোষের সমষ্টি।",
            "opt_bio_2_33_d": "নিঃস্রাবী টিস্যু বিভিন্ন রস নিঃসরণ করে।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 29
      },
      "proTipShortcut": "সব কোষ দেখতে এক = সরল টিস্যু।"
},
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_34",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "প্যারেনকাইমা টিস্যুর কোষগুলোর প্রধান শনাক্তকারী বৈশিষ্ট্য কোনটি?",
    options: [
      {
            "id": "opt_bio_2_34_a",
            "text": "কোষপ্রাচীর লিগনিনযুক্ত অত্যন্ত পুরু এবং কোষ মৃত",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_34_b",
            "text": "কোষগুলো জীবিত, সমব্যাসীয়, পাতলা সেলুলোজ প্রাচীরযুক্ত ও প্রোটোপ্লাজমপূর্ণ",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_34_c",
            "text": "কোষপ্রাচীরের কোণে কেবল পেকটিন জমা হয়ে অসমান পুরু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_34_d",
            "text": "কোষগুলো নলাকার ও প্রোটোপ্লাজমবিহীন",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: কোষগুলো জীবিত, সমব্যাসীয়, পাতলা সেলুলোজ প্রাচীরযুক্ত ও প্রোটোপ্লাজমপূর্ণ।",
      "coreConcept": "প্যারেনকাইমা হলো উদ্ভিদের মৌলিক সজীব টিস্যু, যার কোষে স্পষ্ট নিউক্লিয়াস, সাইটোপ্লাজম ও আন্তঃকোষীয় ফাঁক থাকে।",
      "distractorAnalysis": {
            "opt_bio_2_34_a": "এটি স্ক্লেরেনকাইমা টিস্যুর বৈশিষ্ট্য।",
            "opt_bio_2_34_c": "এটি কোলেনকাইমা টিস্যুর বৈশিষ্ট্য।",
            "opt_bio_2_34_d": "এটি জাইলেম ভেসেলের বৈশিষ্ট্য।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 29
      },
      "proTipShortcut": "প্যারেনকাইমা = নরম, সজীব, সমব্যাসীয় ও সেলুলোজযুক্ত।"
},
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_35",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "প্যারেনকাইমা টিস্যুর কোষে ক্লোরোপ্লাস্ট থাকলে তাকে কী বলা হয়?",
    options: [
      {
            "id": "opt_bio_2_35_a",
            "text": "অ্যারেনকাইমা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_35_b",
            "text": "ক্লোরেনকাইমা",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_35_c",
            "text": "কোলেনকাইমা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_35_d",
            "text": "স্ক্লেরেনকাইমা",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: ক্লোরেনকাইমা।",
      "coreConcept": "পাতার মেসোফিল ও কচি কাণ্ডের যে প্যারেনকাইমাতে ক্লোরোপ্লাস্ট থাকে তাকে ক্লোরেনকাইমা (Chlorenchyma) বলে।",
      "distractorAnalysis": {
            "opt_bio_2_35_a": "অ্যারেনকাইমা হলো বায়ুকুঠুরিযুক্ত প্যারেনকাইমা।",
            "opt_bio_2_35_c": "কোলেনকাইমা আলাদা সরল টিস্যু।",
            "opt_bio_2_35_d": "স্ক্লেরেনকাইমা মৃত যান্ত্রিক টিস্যু।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 29
      },
      "proTipShortcut": "ক্লোরোপ্লাস্ট + প্যারেনকাইমা = ক্লোরেনকাইমা।"
},
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_36",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "কুমড়া ও দণ্ডকলসের কচি ও নমনীয় কাণ্ডে দৃঢ়তা প্রদানকারী টিস্যু কোনটি?",
    options: [
      {
            "id": "opt_bio_2_36_a",
            "text": "প্যারেনকাইমা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_36_b",
            "text": "কোলেনকাইমা",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_36_c",
            "text": "স্ক্লেরাইড",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_36_d",
            "text": "জাইলেম ফাইবার",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: কোলেনকাইমা।",
      "coreConcept": "কোলেনকাইমা কোষে সেলুলোজ ও পেকটিন জমা হয়ে নমনীয় দৃঢ়তা দেয়, যা কুমড়া ও দণ্ডকলসের কাণ্ডে সুস্পষ্ট (পৃষ্ঠা ২৯)।",
      "distractorAnalysis": {
            "opt_bio_2_36_a": "প্যারেনকাইমা খাদ্য তৈরি ও সঞ্চয় করে।",
            "opt_bio_2_36_c": "স্ক্লেরাইড শক্ত স্টোন সেল (বীজত্বকে থাকে)।",
            "opt_bio_2_36_d": "জাইলেম ফাইবার কাষ্ঠল অংশে থাকে।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 29
      },
      "proTipShortcut": "নমনীয় দৃঢ়তা (কুমড়া লতা) = কোলেনকাইমা।"
},
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_37",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "স্ক্লেরেনকাইমা টিস্যুর কোষপ্রাচীর নিচের কোন রাসায়নিক উপাদানটি জমা হয়ে অত্যন্ত শক্ত ও পুরু হয়?",
    options: [
      {
            "id": "opt_bio_2_37_a",
            "text": "লিগনিন",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_37_b",
            "text": "পেকটিন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_37_c",
            "text": "কাইটিন",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_37_d",
            "text": "সুবেরিন",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: লিগনিন।",
      "coreConcept": "স্ক্লেরেনকাইমা কোষের প্রাচীরে লিগনিন জমা হয় এবং পরিণত অবস্থায় প্রোটোপ্লাজম নষ্ট হয়ে কোষগুলো মৃত হয়ে যায়।",
      "distractorAnalysis": {
            "opt_bio_2_37_b": "পেকটিন কোলেনকাইমায় জমা হয়।",
            "opt_bio_2_37_c": "কাইটিন ছত্রাকে থাকে।",
            "opt_bio_2_37_d": "সুবেরিন কর্ক টিস্যুতে থাকে।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 29
      },
      "proTipShortcut": "শক্ত মৃত কোষ = লিগনিনযুক্ত স্ক্লেরেনকাইমা।"
},
    difficulty: "EASY",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_38",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "পাটের আঁশ নিচের কোন ধরনের ফাইবার?",
    options: [
      {
            "id": "opt_bio_2_38_a",
            "text": "সারফেস ফাইবার",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_38_b",
            "text": "বাস্ট ফাইবার (বা ফ্লোয়েম ফাইবার)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_38_c",
            "text": "উড ফাইবার",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_38_d",
            "text": "স্ক্লেরাইড",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: বাস্ট ফাইবার (বা ফ্লোয়েম ফাইবার)।",
      "coreConcept": "উদ্ভিদ অঙ্গের গৌণ বৃদ্ধির সময় ফ্লোয়েমে উৎপন্ন দীর্ঘ স্ক্লেরেনকাইমা তন্তুকে বাস্ট ফাইবার বলে, যার চমৎকার উদাহরণ পাটের আঁশ।",
      "distractorAnalysis": {
            "opt_bio_2_38_a": "সারফেস ফাইবার বীজের উপরিভাগে জন্মায় (যেমন: তুলা)।",
            "opt_bio_2_38_c": "উড ফাইবার জাইলেমে থাকে।",
            "opt_bio_2_38_d": "স্ক্লেরাইড স্টোন সেল (খাটো কোষ)।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 30
      },
      "proTipShortcut": "পাটের আঁশ = বাস্ট ফাইবার (Bast fibre)।"
},
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_39",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "নাশপাতি বা পেয়ারার ত্বক চিবানোর সময় যে দানাদার কড়কড়ে অনুভূতি হয় তা কোন কোষের উপস্থিতির জন্য?",
    options: [
      {
            "id": "opt_bio_2_39_a",
            "text": "বাস্ট ফাইবার",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_39_b",
            "text": "স্ক্লেরাইড বা স্টোন সেল",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_39_c",
            "text": "কোলেনকাইমা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_39_d",
            "text": "ভেসেল",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: স্ক্লেরাইড বা স্টোন সেল।",
      "coreConcept": "স্ক্লেরাইড হলো খাটো, সমব্যাসীয় বা তারকাকার অত্যন্ত শক্ত লিগনিনযুক্ত মৃত কোষ, যা ফল ও বীজত্বকে স্টোন সেল হিসেবে থাকে।",
      "distractorAnalysis": {
            "opt_bio_2_39_a": "বাস্ট ফাইবার লম্বা সূক্ষ্ম সুতার মতো তন্তু।",
            "opt_bio_2_39_c": "কোলেনকাইমা সজীব ও নমনীয় টিস্যু।",
            "opt_bio_2_39_d": "ভেসেল পরিবহন নল।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 30
      },
      "proTipShortcut": "পাথুরে দানা ফলত্বকে = স্টোন সেল / স্ক্লেরাইড।"
},
    difficulty: "MEDIUM",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_40",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "প্রোক্যাম্বিয়াম থেকে সৃষ্ট জাইলেমকে কী বলা হয়?",
    options: [
      {
            "id": "opt_bio_2_40_a",
            "text": "গৌণ জাইলেম",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_40_b",
            "text": "প্রাথমিক জাইলেম",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_40_c",
            "text": "মেটাজাইলেম",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_40_d",
            "text": "বাস্ট ফাইবার",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: প্রাথমিক জাইলেম।",
      "coreConcept": "প্রোক্যাম্বিয়াম থেকে প্রাথমিক জাইলেম সৃষ্টি হয়; প্রাথমিক বৃদ্ধির শেষে ক্যাম্বিয়াম থেকে সেকেন্ডারি বা গৌণ জাইলেম সৃষ্টি হয়।",
      "distractorAnalysis": {
            "opt_bio_2_40_a": "গৌণ জাইলেম ভাস্কুলার ক্যাম্বিয়াম থেকে উৎপন্ন হয়।",
            "opt_bio_2_40_c": "মেটাজাইলেম প্রাথমিক জাইলেমের পরিণত বড় গহ্বরযুক্ত রূপ।",
            "opt_bio_2_40_d": "বাস্ট ফাইবার ফ্লোয়েমের উপাদান।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 30
      },
      "proTipShortcut": "প্রোক্যাম্বিয়াম → প্রাথমিক জাইলেম।"
},
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_41",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "জাইলেম টিস্যুর একমাত্র সজীব উপাদান কোনটি?",
    options: [
      {
            "id": "opt_bio_2_41_a",
            "text": "ট্রাকিড",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_41_b",
            "text": "ভেসেল",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_41_c",
            "text": "জাইলেম প্যারেনকাইমা (উড প্যারেনকাইমা)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_41_d",
            "text": "জাইলেম ফাইবার (উড ফাইবার)",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর গ: জাইলেম প্যারেনকাইমা (উড প্যারেনকাইমা)।",
      "coreConcept": "জাইলেমের ৪টি উপাদানের মধ্যে ট্রাকিড, ভেসেল ও ফাইবার মৃত; কেবল জাইলেম প্যারেনকাইমা সজীব ও খাদ্য সঞ্চয় করে।",
      "distractorAnalysis": {
            "opt_bio_2_41_a": "ট্রাকিড পরিণত অবস্থায় মৃত।",
            "opt_bio_2_41_b": "ভেসেল পরিণত বয়সে মৃত ও প্রোটোপ্লাজমবিহীন নল।",
            "opt_bio_2_41_d": "জাইলেম ফাইবার মৃত স্ক্লেরেনকাইমা।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 31
      },
      "proTipShortcut": "জাইলেমের একমাত্র জীবিত সদস্য = জাইলেম প্যারেনকাইমা।"
},
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_42",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "ট্রাকিডের প্রাচীরে কোন প্রক্রিয়ায় পানি এক কোষ থেকে পার্শ্ববর্তী কোষে চলাচল করে?",
    options: [
      {
            "id": "opt_bio_2_42_a",
            "text": "সক্রিয় শোষণ",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_42_b",
            "text": "জোড়া কূপের (paired pits) মাধ্যমে",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_42_c",
            "text": "সিভপ্লেটের রন্ধ্র দিয়ে",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_42_d",
            "text": "সেন্ট্রিওলের মাধ্যমে",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: জোড়া কূপের (paired pits) মাধ্যমে।",
      "coreConcept": "ট্রাকিডের প্রান্ত সুচালো এবং লিগনিনযুক্ত প্রাচীরে জোড়া কূপ থাকে যার মাধ্যমে তরল পাশাপাশি চলাচল করে (পৃষ্ঠা ৩১)।",
      "distractorAnalysis": {
            "opt_bio_2_42_a": "সক্রিয় শোষণ মূলরোমে আয়ন শোষণের পদ্ধতি।",
            "opt_bio_2_42_c": "সিভপ্লেট ফ্লোয়েম সিভনলে থাকে।",
            "opt_bio_2_42_d": "সেন্ট্রিওল প্রাণী কোষে থাকে।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 31
      },
      "proTipShortcut": "ট্রাকিডে পানি চলে = জোড়া কূপে।"
},
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_43",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "সাধারণত নগ্নবীজী উদ্ভিদে ভেসেল থাকে না। তবে নিচের কোন উন্নত নগ্নবীজীতে প্রাথমিক পর্যায়ের ভেসেল উপস্থিত থাকে?",
    options: [
      {
            "id": "opt_bio_2_43_a",
            "text": "Cycas",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_43_b",
            "text": "Pinus",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_43_c",
            "text": "Gnetum (নিটাম)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_43_d",
            "text": "Ginkgo",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর গ: Gnetum (নিটাম)।",
      "coreConcept": "পাঠ্যবইয়ের পৃষ্ঠা ৩১-এর স্পষ্ট তথ্য: নগ্নবীজী উদ্ভিদের মধ্যে উন্নত উদ্ভিদ নিটামে (Gnetum) প্রাথমিক পর্যায়ের ভেসেল থাকে।",
      "distractorAnalysis": {
            "opt_bio_2_43_a": "সাইকাসে ভেসেল অনুপস্থিত।",
            "opt_bio_2_43_b": "পাইনাসে কেবল ট্রাকিড থাকে, ভেসেল নেই।",
            "opt_bio_2_43_d": "জিঙ্কগোতে ভেসেল নেই।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 31
      },
      "proTipShortcut": "ভেসেলযুক্ত ব্যতিক্রম নগ্নবীজী = নিটাম (Gnetum)।"
},
    difficulty: "HARD",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_44",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "ফ্লোয়েম টিস্যুর কোন উপাদানটি পূর্ণাঙ্গ ও পরিণত অবস্থায় নিউক্লিয়াসবিহীন থাকে?",
    options: [
      {
            "id": "opt_bio_2_44_a",
            "text": "সঙ্গীকোষ",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_44_b",
            "text": "সিভকোষ / সিভনল",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_44_c",
            "text": "ফ্লোয়েম প্যারেনকাইমা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_44_d",
            "text": "বাস্ট ফাইবার",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: সিভকোষ / সিভনল।",
      "coreConcept": "সিভকোষ প্রাথমিক অবস্থায় নিউক্লিয়াসযুক্ত থাকলেও পরিণত বয়সে নিউক্লিয়াস নষ্ট হয়ে যায় এবং পাশের সঙ্গীকোষ এর কাজ নিয়ন্ত্রণ করে।",
      "distractorAnalysis": {
            "opt_bio_2_44_a": "সঙ্গীকোষে সুস্পষ্ট বড় নিউক্লিয়াস থাকে।",
            "opt_bio_2_44_c": "ফ্লোয়েম প্যারেনকাইমায় নিউক্লিয়াস বিদ্যমান।",
            "opt_bio_2_44_d": "বাস্ট ফাইবার সম্পূর্ণ মৃত কোষ।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 32
      },
      "proTipShortcut": "পরিণত সিভনলে নিউক্লিয়াস থাকে না!"
},
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_45",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "ফার্ন ও নগ্নবীজী উদ্ভিদের ফ্লোয়েমে নিচের কোন উপাদানটি অনুপস্থিত থাকে?",
    options: [
      {
            "id": "opt_bio_2_45_a",
            "text": "সিভকোষ",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_45_b",
            "text": "সঙ্গীকোষ",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_45_c",
            "text": "ফ্লোয়েম প্যারেনকাইমা",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_45_d",
            "text": "ট্রাকিড",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: সঙ্গীকোষ।",
      "coreConcept": "ফার্ন ও ব্যক্তবীজী (নগ্নবীজী) উদ্ভিদের ফ্লোয়েমে সঙ্গীকোষ থাকে না; কেবল আবৃতবীজী উদ্ভিদের ফ্লোয়েমে সঙ্গীকোষ উপস্থিত থাকে (পৃষ্ঠা ৩৩)।",
      "distractorAnalysis": {
            "opt_bio_2_45_a": "সিভকোষ ফার্ন ও নগ্নবীজীতে থাকে।",
            "opt_bio_2_45_c": "ফ্লোয়েম প্যারেনকাইমা ফার্ন ও নগ্নবীজীতে থাকে।",
            "opt_bio_2_45_d": "ট্রাকিড জাইলেমের উপাদান।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 33
      },
      "proTipShortcut": "ফার্ন ও নগ্নবীজীর ফ্লোয়েমে সঙ্গীকোষ নেই।"
},
    difficulty: "HARD",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_46",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "একবীজপত্রী উদ্ভিদের ফ্লোয়েম টিস্যুতে নিচের কোনটির উপস্থিতি দেখা যায় না?",
    options: [
      {
            "id": "opt_bio_2_46_a",
            "text": "সিভনল",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_46_b",
            "text": "সঙ্গীকোষ",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_46_c",
            "text": "ফ্লোয়েম প্যারেনকাইমা",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_46_d",
            "text": "বাস্ট ফাইবার",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর গ: ফ্লোয়েম প্যারেনকাইমা।",
      "coreConcept": "পাঠ্যবই পৃষ্ঠা ৩৩-এর তথ্য: একবীজপত্রী উদ্ভিদের ফ্লোয়েম টিস্যুতে ফ্লোয়েম প্যারেনকাইমা থাকে না।",
      "distractorAnalysis": {
            "opt_bio_2_46_a": "সিভনল একবীজপত্রীতে খাদ্য পরিবহনের প্রধান উপাদান।",
            "opt_bio_2_46_b": "সঙ্গীকোষ উপস্থিত থাকে।",
            "opt_bio_2_46_d": "বাস্ট ফাইবার থাকতে পারে।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 33
      },
      "proTipShortcut": "একবীজপত্রীতে ফ্লোয়েম প্যারেনকাইমা থাকে না।"
},
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_47",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "প্রাণিদেহে যে টিস্যু একটি নির্দিষ্ট ভিত্তিপর্দার (Basement membrane) ওপর ঘন সন্নিবেশিত থাকে তাকে কী বলে?",
    options: [
      {
            "id": "opt_bio_2_47_a",
            "text": "আবরণী টিস্যু (Epithelial tissue)",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_47_b",
            "text": "যোজক টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_47_c",
            "text": "পেশি টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_47_d",
            "text": "স্নায়ু টিস্যু",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: আবরণী টিস্যু (Epithelial tissue)।",
      "coreConcept": "আবরণী টিস্যুর কোষগুলো ঘন সন্নিবেশিত থাকে এবং একটি পাতলা ভিত্তিপর্দার ওপর বিন্যস্ত থাকে।",
      "distractorAnalysis": {
            "opt_bio_2_47_b": "যোজক টিস্যুতে কোষ কম কিন্তু মাতৃকা বেশি থাকে।",
            "opt_bio_2_47_c": "পেশি টিস্যু সংকোচন-প্রসারণশীল তন্তুর সমষ্টি।",
            "opt_bio_2_47_d": "স্নায়ু টিস্যু নিউরন নিয়ে গঠিত।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 34
      },
      "proTipShortcut": "ভিত্তিপর্দার ওপর সাজানো = আবরণী টিস্যু।"
},
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_48",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "বৃক্কের বোম্যান্স ক্যাপসুলের প্রাচীরে কোন ধরনের আবরণী টিস্যু দেখা যায়?",
    options: [
      {
            "id": "opt_bio_2_48_a",
            "text": "কিউবয়ডাল আবরণী টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_48_b",
            "text": "কলামনার আবরণী টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_48_c",
            "text": "স্কোয়ামাস (আইঁশাকার) আবরণী টিস্যু",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_48_d",
            "text": "সিউডো-স্ট্র্যাটিফাইড আবরণী টিস্যু",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর গ: স্কোয়ামাস (আইঁশাকার) আবরণী টিস্যু।",
      "coreConcept": "বোম্যান্স ক্যাপসুলের প্রাচীরে মাছের আঁশের মতো চ্যাপ্টা ও পাতলা স্কোয়ামাস আবরণী কোষ থাকে, যা ছাঁকনির কাজ করে।",
      "distractorAnalysis": {
            "opt_bio_2_48_a": "কিউবয়ডাল টিস্যু থাকে সংগ্রাহক নালিকায়।",
            "opt_bio_2_48_b": "কলামনার টিস্যু থাকে অন্ত্রের প্রাচীরে।",
            "opt_bio_2_48_d": "সিউডো-স্ট্র্যাটিফাইড টিস্যু থাকে ট্রাকিয়ায়।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 34
      },
      "proTipShortcut": "বোম্যান্স ক্যাপসুল = স্কোয়ামাস (ছাঁকনি)।"
},
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_49",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "বৃক্কের সংগ্রাহক নালিকায় অবস্থিত ঘনকাকার (দৈর্ঘ্য, প্রস্থ ও উচ্চতা সমান) টিস্যু কোনটি?",
    options: [
      {
            "id": "opt_bio_2_49_a",
            "text": "স্কোয়ামাস টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_49_b",
            "text": "কিউবয়ডাল আবরণী টিস্যু",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_49_c",
            "text": "কলামনার টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_49_d",
            "text": "স্ট্র্যাটিফাইড টিস্যু",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: কিউবয়ডাল আবরণী টিস্যু।",
      "coreConcept": "কিউবয়ডাল কোষগুলো কিউব বা ঘনক আকৃতির এবং সংগ্রাহক নালিকায় পরিশোষণ ও ক্ষরণের কাজ করে (পৃষ্ঠা ৩৪)।",
      "distractorAnalysis": {
            "opt_bio_2_49_a": "স্কোয়ামাস চ্যাপ্টা আঁশের মতো।",
            "opt_bio_2_49_c": "কলামনার স্তম্ভের মতো খাড়া লম্বা।",
            "opt_bio_2_49_d": "স্ট্র্যাটিফাইড বহুস্তরীভূত।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 34
      },
      "proTipShortcut": "সংগ্রাহক নালিকা = কিউবয়ডাল (ঘনকাকার)।"
},
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_50",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "প্রাণীর অন্ত্রের অন্তঃপ্রাচীরে অবস্থিত স্তম্ভের মতো সরু ও লম্বা আবরণী টিস্যু কোনটি?",
    options: [
      {
            "id": "opt_bio_2_50_a",
            "text": "কলামনার আবরণী টিস্যু",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_50_b",
            "text": "স্কোয়ামাস টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_50_c",
            "text": "কিউবয়ডাল টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_50_d",
            "text": "ফাইব্রাস টিস্যু",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: কলামনার আবরণী টিস্যু।",
      "coreConcept": "অন্ত্রের ভেতরের প্রাচীরে কলামনার (স্তম্ভাকার) কোষ থাকে যা পরিপাক রস ক্ষরণ ও খাদ্যরস শোষণে অংশ নেয় (পৃষ্ঠা ৩৫)।",
      "distractorAnalysis": {
            "opt_bio_2_50_b": "স্কোয়ামাস বোম্যান্স ক্যাপসুলে থাকে।",
            "opt_bio_2_50_c": "কিউবয়ডাল সংগ্রাহক নালিকায় থাকে।",
            "opt_bio_2_50_d": "ফাইব্রাস যোজক টিস্যুর রূপ।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 35
      },
      "proTipShortcut": "অন্ত্র প্রাচীর = কলামনার (স্তম্ভাকার শোষণকারী)।"
},
    difficulty: "EASY",
    boardSource: "ময়মনসিংহ বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_51",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "মেরুদণ্ডী প্রাণীদের শ্বাসনালির (ট্রাকিয়া) প্রাচীরে কোন ধরণের আবরণী টিস্যু দেখা যায়?",
    options: [
      {
            "id": "opt_bio_2_51_a",
            "text": "স্ট্র্যাটিফাইড আবরণী টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_51_b",
            "text": "সিউডো-স্ট্র্যাটিফাইড আবরণী টিস্যু",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_51_c",
            "text": "সাধারণ স্কোয়ামাস টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_51_d",
            "text": "ফ্ল্যাজেলাযুক্ত টিস্যু",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর খ: সিউডো-স্ট্র্যাটিফাইড আবরণী টিস্যু।",
      "coreConcept": "ট্রাকিয়ার কোষগুলো একক স্তরে সজ্জিত হলেও এদের বিভিন্ন উচ্চতার কারণে বহুস্তরবিশিষ্ট বা স্তরীভূত মনে হয় (পৃষ্ঠা ৩৫)।",
      "distractorAnalysis": {
            "opt_bio_2_51_a": "স্ট্র্যাটিফাইড ত্বকে থাকে।",
            "opt_bio_2_51_c": "স্কোয়ামাস বোম্যান্স ক্যাপসুলে থাকে।",
            "opt_bio_2_51_d": "ফ্ল্যাজেলাযুক্ত টিস্যু হাইড্রার এন্ডোডার্মে থাকে।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 35
      },
      "proTipShortcut": "ট্রাকিয়া = সিউডো-স্ট্র্যাটিফাইড (মিথ্যা স্তরীভূত)।"
},
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_52",
    topicId: "top_ssc_biology_ch2_3",
    type: "MCQ",
    stem: "হাইড্রার এন্ডোডার্মে খাদ্য গ্রহণের জন্য কোন বিশেষ রূপান্তরিত আবরণী টিস্যু থাকে?",
    options: [
      {
            "id": "opt_bio_2_52_a",
            "text": "ক্ষণপদযুক্ত ও ফ্ল্যাজেলাযুক্ত আবরণী টিস্যু",
            "isCorrect": true
      },
      {
            "id": "opt_bio_2_52_b",
            "text": "কেবল সিলিয়াযুক্ত আবরণী টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_52_c",
            "text": "জনন আবরণী টিস্যু",
            "isCorrect": false
      },
      {
            "id": "opt_bio_2_52_d",
            "text": "স্ট্র্যাটিফাইড টিস্যু",
            "isCorrect": false
      }
],
    explanation: {
      "directAnswer": "সঠিক উত্তর ক: ক্ষণপদযুক্ত ও ফ্ল্যাজেলাযুক্ত আবরণী টিস্যু।",
      "coreConcept": "হাইড্রার গ্যাস্ট্রোডার্মিসের (এন্ডোডার্ম) পুষ্টিকোষগুলো ফ্ল্যাজেলা ও ক্ষণপদ তৈরি করে খাদ্য গ্রহণে সহায়তা করে (পৃষ্ঠা ৩৫)।",
      "distractorAnalysis": {
            "opt_bio_2_52_b": "সিলিয়াযুক্ত টিস্যু মেরুদণ্ডীর শ্বাসনালিতে থাকে।",
            "opt_bio_2_52_c": "জনন আবরণী শুক্রাণু-ডিম্বাণু তৈরি করে।",
            "opt_bio_2_52_d": "স্ট্র্যাটিফাইড ত্বকীয় টিস্যু।"
      },
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 35
      },
      "proTipShortcut": "হাইড্রার পরিপাক = ক্ষণপদ ও ফ্ল্যাজেলাযুক্ত কোষ।"
},
    difficulty: "HARD",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_53",
    topicId: "top_ssc_biology_ch2_3",
    type: "CQ_CREATIVE",
    stem: "উদ্দীপক: নবম শ্রেণির জীববিজ্ঞান বইয়ের পৃষ্ঠা ৪৯-এর নমুনা সৃজনশীল প্রশ্ন ২ অনুযায়ী:\\nM = সিভনল ও সঙ্গীকোষযুক্ত জটিল ফ্লোয়েম টিস্যু\\nX = দ্বি-অবতল লালচে রক্তকোষ (RBC)\\nY = অনিয়মিত আকৃতির নিউক্লিয়াসযুক্ত শ্বেত রক্তকোষ (WBC)\\nZ = একটি অ্যাক্সন ও ডেনড্রনযুক্ত শাখা-প্রশাখাময় স্নায়ুকোষ (নিউরন)",
    options: null,
    explanation: {
      "directAnswer": "এটি পাঠ্যবই পৃষ্ঠা ৪৯-এর নমুনা সৃজনশীল প্রশ্ন ২। M=ফ্লোয়েম টিস্যু, X=লোহিত রক্তকণিকা, Y=শ্বেত রক্তকণিকা, Z=নিউরন।",
      "coreConcept": "উদ্ভিদ ও প্রাণিদেহের জটিল টিস্যুর গঠন ও মানবদেহের শারীরবৃত্তীয় সমন্বয়।",
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · নমুনা সৃজনশীল ২",
            "pageNumber": 49
      }
},
    cqRubric: {
      "ka": {
            "mark": 1,
            "criteria": "পেশি টিস্যু কাকে বলে তা সঠিকভাবে লেখা (ভ্রূণের মেসোডার্ম থেকে উৎপন্ন সংকোচন-প্রসারণক্ষম টিস্যু)।"
      },
      "kha": {
            "mark": 2,
            "criteria": "স্কেলিটাল টিস্যু করোটিকা (Cranium) গঠনের মাধ্যমে কীভাবে মস্তিষ্ককে রক্ষা করে তা ব্যাখ্যা করা।"
      },
      "ga": {
            "mark": 3,
            "criteria": "M চিত্রের টিস্যুটি যে জটিল ফ্লোয়েম টিস্যু তা শনাক্ত করে এর সিভনল ও সঙ্গীকোষের ভূমিকা ব্যাখ্যা করা।"
      },
      "gha": {
            "mark": 4,
            "criteria": "জীবদেহে X (অক্সিজেন পরিবহন), Y (রোগ প্রতিরোধ/জীবাণু ধ্বংস) এবং Z (উদ্দীপনা ও সংকেত পরিবহন) এর সমন্বিত ভূমিকা বিশদ বিশ্লেষণ করা।"
      }
},
    difficulty: "HARD",
    boardSource: "NCTB পাঠ্যবই নমুনা সৃজনশীল ২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_2_54",
    topicId: "top_ssc_biology_ch2_3",
    type: "CQ_CREATIVE",
    stem: "উদ্ভিদবিদ ড. তাহের দুটি উদ্ভিদ টিস্যুর নমুনা বিশ্লেষণ করে দেখলেন: প্রথম টিস্যুটি মৃত কোষের তৈরি এবং এর প্রাচীরে লিগনিন জমা হয়ে গাছের কাণ্ডকে প্রবল ঝড়ে ভেঙে পড়ার হাত থেকে বাঁচায়। দ্বিতীয় টিস্যুটি জীবিত, সমব্যাসীয় ও পাতলা সেলুলোজ প্রাচীরযুক্ত এবং এর কোষে পর্যাপ্ত প্রোটোপ্লাজম ও খাদ্য জমা থাকে।",
    options: null,
    explanation: {
      "directAnswer": "প্রথম টিস্যুটি স্ক্লেরেনকাইমা এবং দ্বিতীয়টি প্যারেনকাইমা টিস্যু।",
      "coreConcept": "উদ্ভিদের সরল স্থায়ী টিস্যুর বৈশিষ্ট্য ও যান্ত্রিক কাজের বিশ্লেষণ।",
      "textbookCitation": {
            "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
            "chapterName": "দ্বিতীয় অধ্যায়: জীবকোষ ও টিস্যু · ২.৩",
            "pageNumber": 29
      }
},
    cqRubric: {
      "ka": {
            "mark": 1,
            "criteria": "ক্লোরেনকাইমা কাকে বলে তা সঠিকভাবে লেখা।"
      },
      "kha": {
            "mark": 2,
            "criteria": "পাটের আঁশকে বাস্ট ফাইবার বলা হয় কেন তা ব্যাখ্যা করা।"
      },
      "ga": {
            "mark": 3,
            "criteria": "উদ্দীপকের প্রথম টিস্যুটির (স্ক্লেরেনকাইমা) দুটি রূপভেদ (ফাইবার ও স্ক্লেরাইড) চিত্র বা গঠনসহ ব্যাখ্যা করা।"
      },
      "gha": {
            "mark": 4,
            "criteria": "উদ্ভিদের সার্বিক জীবন রক্ষায় উদ্দীপকের টিস্যু দুটির পরিপূরক গুরুত্ব বিশ্লেষণ করা।"
      }
},
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল মডেল প্রশ্ন",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];
