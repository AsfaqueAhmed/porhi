import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter6QuestionsBatch2: QuestionData[] = [
  {
    "id": "q_bio_6_31",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "MCQ",
    "stem": "পূর্ণাঙ্গ সুস্থ মানবদেহে মোট রক্তের পরিমাণ কত লিটার?",
    "options": [
      {
        "id": "opt_bio_6_31_a",
        "text": "প্রায় ৫ থেকে ৬ লিটার",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_31_b",
        "text": "প্রায় ২ থেকে ৩ লিটার",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_31_c",
        "text": "প্রায় ৮ থেকে ১০ লিটার",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_31_d",
        "text": "প্রায় ১২ থেকে ১৪ লিটার",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: প্রায় ৫ থেকে ৬ লিটার।",
      "coreConcept": "প্রাপ্তবয়স্ক মানুষের দেহে মোট ওজনের প্রায় ৮% অর্থাৎ গড়ে ৫-৬ লিটার রক্ত থাকে।",
      "distractorAnalysis": {
        "opt_bio_6_31_b": "২-৩ লিটার শিশুদের ক্ষেত্রে হতে পারে, পূর্ণাঙ্গের নয়।",
        "opt_bio_6_31_c": "৮-১০ লিটার অত্যধিক পরিমাণ।",
        "opt_bio_6_31_d": "১২-১৪ লিটার স্বাভাবিক রক্তের পরিমাণের দ্বিগুণেরও বেশি।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 140
      }
    },
    "difficulty": "EASY",
    "boardSource": "ঢাকা বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_32",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "MCQ",
    "stem": "রক্তের স্বাভাবিক pH মাত্রা কোন ধরনের?",
    "options": [
      {
        "id": "opt_bio_6_32_a",
        "text": "ঈষৎ ক্ষারীয় (৭.৩৫ - ৭.৪৫)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_32_b",
        "text": "তীব্র অম্লীয় (৪.৫ - ৫.৫)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_32_c",
        "text": "সম্পূর্ণ নিরপেক্ষ (৭.০)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_32_d",
        "text": "তীব্র ক্ষারীয় (৯.০ - ১০.০)",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: ঈষৎ ক্ষারীয় (৭.৩৫ - ৭.৪৫)।",
      "coreConcept": "মানুষের রক্ত সামান্য ক্ষারধর্মী, এর স্বাভাবিক বাফারযুক্ত pH পরিসীমা ৭.৩৫ থেকে ৭.৪৫।",
      "distractorAnalysis": {
        "opt_bio_6_32_b": "রক্তের pH তীব্র অম্লীয় হলে অ্যাসিডোসিস হয়ে মানুষ মারা যাবে।",
        "opt_bio_6_32_c": "রক্ত ঠিক ৭.০ নিরপেক্ষ নয়, কিছুটা ক্ষারীয়।",
        "opt_bio_6_32_d": "তীব্র ক্ষারীয় অবস্থায় রক্ত সংবহন সম্ভব নয়।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 140
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "রাজশাহী বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_33",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "MCQ",
    "stem": "রক্তে রক্তরস (প্লাজমা) ও রক্তকণিকার শতকরা অনুপাত কত?",
    "options": [
      {
        "id": "opt_bio_6_33_a",
        "text": "৫৫% রক্তরস এবং ৪৫% রক্তকণিকা",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_33_b",
        "text": "৪৫% রক্তরস এবং ৫৫% রক্তকণিকা",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_33_c",
        "text": "৭০% রক্তরস এবং ৩০% রক্তকণিকা",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_33_d",
        "text": "৮০% রক্তরস এবং ২০% রক্তকণিকা",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: ৫৫% রক্তরস এবং ৪৫% রক্তকণিকা।",
      "coreConcept": "সেন্ট্রিফিউজ করলে দেখা যায় মোট রক্তের প্রায় ৫৫% প্লাজমা তরল এবং ৪৫% রক্তকণিকা অবক্ষেপ।",
      "distractorAnalysis": {
        "opt_bio_6_33_b": "রক্তকণিকা কখনো ৫৫% থাকে না স্বাভাবিক অবস্থায়।",
        "opt_bio_6_33_c": "৭০% প্লাজমা অতিরিক্ত তরলীকরণ বোঝায়।",
        "opt_bio_6_33_d": "৮০% প্লাজমা স্বাভাবিক অনুপাত নয়।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 140
      }
    },
    "difficulty": "EASY",
    "boardSource": "চট্টগ্রাম বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_34",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "MCQ",
    "stem": "মানবদেহে পরিণত লোহিত রক্তকণিকার (RBC) গড় আয়ু কত দিন?",
    "options": [
      {
        "id": "opt_bio_6_34_a",
        "text": "প্রায় ১২০ দিন",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_34_b",
        "text": "প্রায় ১৫ দিন",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_34_c",
        "text": "প্রায় ৫ দিন",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_34_d",
        "text": "প্রায় ৩৬৫ দিন",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: প্রায় ১২০ দিন।",
      "coreConcept": "অস্থিমজ্জায় উৎপন্ন লোহিত রক্তকণিকা প্রায় ৪ মাস (১২০ দিন) বাঁচে এবং পরে যকৃৎ ও প্লীহায় বিনষ্ট হয়।",
      "distractorAnalysis": {
        "opt_bio_6_34_b": "১-১৫ দিন হলো শ্বেত রক্তকণিকার গড় আয়ু।",
        "opt_bio_6_34_c": "৫-১০ দিন হলো অণুচক্রিকার গড় আয়ু।",
        "opt_bio_6_34_d": "৩৬৫ দিন কোনো রক্তকণিকার আয়ু নয়।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 142
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "কুমিল্লা বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_35",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "MCQ",
    "stem": "নিচের কোন রক্তকণিকায় পরিণত অবস্থায় কোনো নিউক্লিয়াস থাকে না?",
    "options": [
      {
        "id": "opt_bio_6_35_a",
        "text": "লোহিত রক্তকণিকা ও অণুচক্রিকা",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_35_b",
        "text": "শ্বেত রক্তকণিকা ও নিউট্রোফিল",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_35_c",
        "text": "লিম্ফোসাইট ও মনোসাইট",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_35_d",
        "text": "ইওসিনোফিল ও বেসোফিল",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: লোহিত রক্তকণিকা ও অণুচক্রিকা।",
      "coreConcept": "স্তন্যপায়ীদের পরিণত RBC দ্বি-অবতল ও নিউক্লিয়াসবিহীন এবং অণুচক্রিকাও কোষীয় খণ্ডায়ন হওয়ায় নিউক্লিয়াসহীন।",
      "distractorAnalysis": {
        "opt_bio_6_35_b": "শ্বেত রক্তকণিকা ও নিউট্রোফিলে স্পষ্ট নিউক্লিয়াস থাকে।",
        "opt_bio_6_35_c": "লিম্ফোসাইট ও মনোসাইটে বৃহৎ নিউক্লিয়াস থাকে।",
        "opt_bio_6_35_d": "ইওসিনোফিল ও বেসোফিলে খণ্ডিত নিউক্লিয়াস বিদ্যমান।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 142
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "যশোর বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_36",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "MCQ",
    "stem": "শ্বেত রক্তকণিকার কোন কোষটি রক্তনালীর ভেতরে রক্ত জমাট বাঁধা রোধে হেপারিন ক্ষরণ করে?",
    "options": [
      {
        "id": "opt_bio_6_36_a",
        "text": "বেসোফিল (Basophil)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_36_b",
        "text": "নিউট্রোফিল",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_36_c",
        "text": "ইওসিনোফিল",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_36_d",
        "text": "লিম্ফোসাইট",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: বেসোফিল।",
      "coreConcept": "বেসোফিল হেপারিন ক্ষরণ করে রক্তকে তরল রাখে এবং অ্যালার্জিতে হিস্টামিন নিঃসরণ করে।",
      "distractorAnalysis": {
        "opt_bio_6_36_b": "নিউট্রোফিল ফ্যাগোসাইটোসিসে জীবাণু ভক্ষণ করে।",
        "opt_bio_6_36_c": "ইওসিনোফিল পরজীবী কৃমি ও অ্যালার্জি প্রতিরোধ করে।",
        "opt_bio_6_36_d": "লিম্ফোসাইট অ্যান্টিবডি প্রস্তুত করে।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 143
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "বরিশাল বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_37",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "MCQ",
    "stem": "অস্থিমজ্জার কোন বৃহদাকার কোষের সাইটোপ্লাজমীয় বিভাজন থেকে অণুচক্রিকা (Platelet) তৈরি হয়?",
    "options": [
      {
        "id": "opt_bio_6_37_a",
        "text": "মেগাক্যারিওসাইট (Megakaryocyte)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_37_b",
        "text": "অস্টিওসাইট",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_37_c",
        "text": "কন্ড্রোসাইট",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_37_d",
        "text": "হেপাটোসাইট",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: মেগাক্যারিওসাইট।",
      "coreConcept": "লাল অস্থিমজ্জার মেগাক্যারিওসাইটের খণ্ডায়ন থেকেই অণুচক্রিকা বা থ্রম্বোসাইট গঠিত হয়।",
      "distractorAnalysis": {
        "opt_bio_6_37_b": "অস্টিওসাইট হলো অস্থির সুগঠিত কোষ।",
        "opt_bio_6_37_c": "কন্ড্রোসাইট তরুণাস্থির কোষ।",
        "opt_bio_6_37_d": "হেপাটোসাইট যকৃতের প্রধান কার্যকারী কোষ।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 143
      }
    },
    "difficulty": "HARD",
    "boardSource": "দিনাজপুর বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_38",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "MCQ",
    "stem": "রক্ত তঞ্চন প্রক্রিয়ায় নিষ্ক্রিয় প্রোথ্রম্বিনকে সক্রিয় থ্রম্বিনে রূপান্তর করে কোন আয়ন?",
    "options": [
      {
        "id": "opt_bio_6_38_a",
        "text": "ক্যালসিয়াম আয়ন ($Ca^{2+}$)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_38_b",
        "text": "সোডিয়াম আয়ন ($Na^+$)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_38_c",
        "text": "লৌহ আয়ন ($Fe^{2+}$)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_38_d",
        "text": "পটাসিয়াম আয়ন ($K^+$)",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: ক্যালসিয়াম আয়ন ($Ca^{2+}$)।",
      "coreConcept": "থ্রম্বোপ্লাস্টিনের উপস্থিতিতে ক্যালসিয়াম আয়ন প্রোথ্রম্বিনকে দ্রুত সক্রিয় এনজাইম থ্রম্বিনে রূপান্তরিত করে।",
      "distractorAnalysis": {
        "opt_bio_6_38_b": "সোডিয়াম আয়ন অসমোটিক চাপ নিয়ন্ত্রণ করে।",
        "opt_bio_6_38_c": "লৌহ আয়ন হিমোগ্লোবিনের অপরিহার্য উপাদান।",
        "opt_bio_6_38_d": "পটাসিয়াম আয়ন কোষীয় বিভব রক্ষা করে।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 144
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সিলেট বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_39",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "MCQ",
    "stem": "রক্ত তঞ্চনকালে দ্রবণীয় ফাইব্রিনোজেনকে অদ্রবণীয় কোন জালকে রূপান্তর করা হয়?",
    "options": [
      {
        "id": "opt_bio_6_39_a",
        "text": "ফাইব্রিন (Fibrin) জালক",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_39_b",
        "text": "গ্লোবিউলিন জালক",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_39_c",
        "text": "অ্যালবুমিন জালক",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_39_d",
        "text": "কলাজেন তন্তু",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: ফাইব্রিন জালক।",
      "coreConcept": "থ্রম্বিন এনজাইম ফাইব্রিনোজেনকে সুতার মতো অদ্রবণীয় ফাইব্রিনে পরিণত করে যা রক্তকণিকাকে আটকে ক্লট বানায়।",
      "distractorAnalysis": {
        "opt_bio_6_39_b": "গ্লোবিউলিন অ্যান্টিবডি তৈরিতে যুক্ত প্লাজমা প্রোটিন।",
        "opt_bio_6_39_c": "অ্যালবুমিন কলয়েডীয় চাপ ধরে রাখে।",
        "opt_bio_6_39_d": "কলাজেন যোজক কলার যান্ত্রিক তন্তু।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 144
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "ময়মনসিংহ বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_40",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "MCQ",
    "stem": "রক্ত জমাট বাঁধার পর ক্লট সংকুচিত হয়ে নির্গত হালকা হলুদ রঙের স্বচ্ছ তরলকে কী বলে?",
    "options": [
      {
        "id": "opt_bio_6_40_a",
        "text": "সিরাম (Serum)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_40_b",
        "text": "প্লাজমা",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_40_c",
        "text": "লসিকা",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_40_d",
        "text": "হিমোলিম্ফ",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: সিরাম।",
      "coreConcept": "সিরাম হলো ফাইব্রিনোজেন ও রক্তকণিকাবিহীন প্লাজমা তরল।",
      "distractorAnalysis": {
        "opt_bio_6_40_b": "প্লাজমাতে ফাইব্রিনোজেন অটুট থাকে, সিরামে থাকে না।",
        "opt_bio_6_40_c": "লসিকা হলো টিস্যু স্পেসে জমা আন্তঃকোষীয় তরল।",
        "opt_bio_6_40_d": "হিমোলিম্ফ সন্ধিপদী প্রাণীদের রক্ত ও লসিকার মিশ্রণ।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 144
      }
    },
    "difficulty": "EASY",
    "boardSource": "ঢাকা বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_41",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "MCQ",
    "stem": "মানবদেহে রোগ প্রতিরোধকারী সুনির্দিষ্ট অ্যান্টিবডি তৈরি করে কোন রক্তকণিকা?",
    "options": [
      {
        "id": "opt_bio_6_41_a",
        "text": "লিম্ফোসাইট (Lymphocyte)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_41_b",
        "text": "লোহিত কণিকা",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_41_c",
        "text": "অণুচক্রিকা",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_41_d",
        "text": "ইওসিনোফিল",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: লিম্ফোসাইট।",
      "coreConcept": "অদানাদার শ্বেতকণিকা লিম্ফোসাইট জীবাণু ধ্বংসে অ্যান্টিবডি তৈরি করে দীর্ঘমেয়াদী অনাক্রম্যতা দেয়।",
      "distractorAnalysis": {
        "opt_bio_6_41_b": "লোহিত কণিকা গ্যাস পরিবহন করে, অ্যান্টিবডি তৈরি করে না।",
        "opt_bio_6_41_c": "অণুচক্রিকা রক্ত জমাট বাঁধায় অংশ নেয়।",
        "opt_bio_6_41_d": "ইওসিনোফিল অ্যালার্জি ও কৃমি দমনে অংশ নেয়।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 143
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "রাজশাহী বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_42",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "MCQ",
    "stem": "লসিকা (Lymph) তন্ত্রের মূল শারীরবৃত্তীয় কাজের অন্তর্ভুক্ত কোনটি?",
    "options": [
      {
        "id": "opt_bio_6_42_a",
        "text": "অন্ত্র থেকে স্নেহ বা চর্বি শোষণ ও দেহের প্রতিরোধ ব্যবস্থা রক্ষা",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_42_b",
        "text": "সরাসরি ইউরিন তৈরি করা",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_42_c",
        "text": "হাড়ের ঘনত্ব বৃদ্ধি করা",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_42_d",
        "text": "দাঁতের এনামেল তৈরি করা",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: অন্ত্র থেকে স্নেহ বা চর্বি শোষণ ও দেহের প্রতিরোধ ব্যবস্থা রক্ষা।",
      "coreConcept": "ক্ষুদ্রান্ত্রের ল্যাকটিয়েল নালী দিয়ে চর্বি শোষণ এবং লিম্ফোসাইট পরিবহনে লসিকা তন্ত্র প্রধান মাধ্যম।",
      "distractorAnalysis": {
        "opt_bio_6_42_b": "কিডনি রক্ত ছেঁকে মূত্র তৈরি করে, লসিকা তন্ত্র নয়।",
        "opt_bio_6_42_c": "হাড়ের বৃদ্ধি ওস্টেওব্লাস্ট কোষ দ্বারা নিয়ন্ত্রিত।",
        "opt_bio_6_42_d": "দাঁতের এনামেল অ্যামিলোব্লাস্ট কোষ তৈরি করে।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 145
      }
    },
    "difficulty": "EASY",
    "boardSource": "চট্টগ্রাম বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_43",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "MCQ",
    "stem": "১৯০০ সালে কোন বিজ্ঞানী মানুষের রক্তের ABO গ্রুপ পদ্ধতি আবিষ্কার করেন?",
    "options": [
      {
        "id": "opt_bio_6_43_a",
        "text": "কার্ল ল্যান্ডস্টাইনার (Karl Landsteiner)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_43_b",
        "text": "উইলিয়াম হার্ভে",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_43_c",
        "text": "আলেকজান্ডার ফ্লেমিং",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_43_d",
        "text": "এডওয়ার্ড জেনার",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: কার্ল ল্যান্ডস্টাইনার।",
      "coreConcept": "বিজ্ঞানী কার্ল ল্যান্ডস্টাইনার লোহিত কণিকায় অ্যান্টিজেন আবিষ্কার করে ABO গ্রুপ পদ্ধতির ভিত্তি স্থাপন করেন।",
      "distractorAnalysis": {
        "opt_bio_6_43_b": "উইলিয়াম হার্ভে রক্ত সংবহন প্রক্রিয়া আবিষ্কার করেন।",
        "opt_bio_6_43_c": "আলেকজান্ডার ফ্লেমিং পেনিসিলিন আবিষ্কার করেন।",
        "opt_bio_6_43_d": "এডওয়ার্ড জেনার গুটিবসন্তের টিকা আবিষ্কার করেন।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 146
      }
    },
    "difficulty": "EASY",
    "boardSource": "ঢাকা বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_44",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "MCQ",
    "stem": "কোন রক্তের গ্রুপের রক্তরসে anti-a কিংবা anti-b কোনো ধরনের অ্যান্টিবডিই থাকে না?",
    "options": [
      {
        "id": "opt_bio_6_44_a",
        "text": "গ্রুপ AB",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_44_b",
        "text": "গ্রুপ O",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_44_c",
        "text": "গ্রুপ A",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_44_d",
        "text": "গ্রুপ B",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: গ্রুপ AB।",
      "coreConcept": "AB গ্রুপের লোহিত কণিকায় A ও B উভয় অ্যান্টিজেন থাকে, ফলে রক্তরসে কোনো অ্যান্টিবডি থাকে না।",
      "distractorAnalysis": {
        "opt_bio_6_44_b": "গ্রুপ O-তে anti-a এবং anti-b দুটি অ্যান্টিবডিই উপস্থিত থাকে।",
        "opt_bio_6_44_c": "গ্রুপ A-তে anti-b অ্যান্টিবডি থাকে।",
        "opt_bio_6_44_d": "গ্রুপ B-তে anti-a অ্যান্টিবডি থাকে।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 146
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "কুমিল্লা বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_45",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "MCQ",
    "stem": "কোন রক্তের গ্রুপের লোহিত রক্তকণিকায় কোনো ধরনের অ্যান্টিজেন (A বা B) থাকে না?",
    "options": [
      {
        "id": "opt_bio_6_45_a",
        "text": "গ্রুপ O",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_45_b",
        "text": "গ্রুপ AB",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_45_c",
        "text": "গ্রুপ A",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_45_d",
        "text": "গ্রুপ B",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: গ্রুপ O।",
      "coreConcept": "O গ্রুপের রক্তে কোনো A বা B অ্যান্টিজেন নেই, তাই একে যে কাউকে দিলে অ্যান্টিজেন বিক্রিয়া হয় না।",
      "distractorAnalysis": {
        "opt_bio_6_45_b": "AB গ্রুপে উভয় অ্যান্টিজেনই থাকে।",
        "opt_bio_6_45_c": "A গ্রুপে অ্যান্টিজেন A থাকে।",
        "opt_bio_6_45_d": "B গ্রুপে অ্যান্টিজেন B থাকে।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 146
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "যশোর বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_46",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "MCQ",
    "stem": "প্রকৃত সর্বজনীন রক্তদাতা (Universal Donor) নিচের কোন রক্তের গ্রুপ?",
    "options": [
      {
        "id": "opt_bio_6_46_a",
        "text": "O নেগেটিভ ($O^-$)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_46_b",
        "text": "O পজিটিভ ($O^+$)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_46_c",
        "text": "AB পজিটিভ ($AB^+$)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_46_d",
        "text": "A নেগেটিভ ($A^-$)",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: O নেগেটিভ ($O^-$)।",
      "coreConcept": "$O^-$ গ্রুপে A, B বা Rh কোনো অ্যান্টিজেনই না থাকায় এটি যেকোনো রোগীকে নিরাপদে দেওয়া যায়।",
      "distractorAnalysis": {
        "opt_bio_6_46_b": "$O^+$ রক্তে Rh অ্যান্টিজেন থাকায় $Rh^-$ রোগীকে দেওয়া বিপজ্জনক।",
        "opt_bio_6_46_c": "$AB^+$ হলো সার্বজনীন গ্রহীতা, দাতা নয়।",
        "opt_bio_6_46_d": "$A^-$ রক্তে অ্যান্টিজেন A থাকে।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 147
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "বরিশাল বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_47",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "MCQ",
    "stem": "প্রকৃত সার্বজনীন গ্রহীতা (Universal Recipient) নিচের কোন রক্তের গ্রুপ?",
    "options": [
      {
        "id": "opt_bio_6_47_a",
        "text": "AB পজিটিভ ($AB^+$)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_47_b",
        "text": "AB নেগেটিভ ($AB^-$)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_47_c",
        "text": "O পজিটিভ ($O^+$)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_47_d",
        "text": "B পজিটিভ ($B^+$)",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: AB পজিটিভ ($AB^+$)।",
      "coreConcept": "$AB^+$ রক্তের প্লাজমায় anti-a, anti-b বা anti-Rh কোনো অ্যান্টিবডি না থাকায় সব রক্ত গ্রহণ করতে পারে।",
      "distractorAnalysis": {
        "opt_bio_6_47_b": "$AB^-$ গ্রহীতা $Rh^+$ রক্ত গ্রহণ করলে জটিলতা হতে পারে।",
        "opt_bio_6_47_c": "$O^+$ কেবল O গ্রুপের রক্ত গ্রহণ করতে পারে।",
        "opt_bio_6_47_d": "$B^+$ রক্ত কেবল B ও O রক্ত নিতে পারে।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 147
      }
    },
    "difficulty": "HARD",
    "boardSource": "দিনাজপুর বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_48",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "MCQ",
    "stem": "Rh ফ্যাক্টরের নামকরণ কোন প্রাণীর নামানুসারে করা হয়েছে?",
    "options": [
      {
        "id": "opt_bio_6_48_a",
        "text": "রেসাস বানর (Rhesus monkey)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_48_b",
        "text": "শিম্পাঞ্জি",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_48_c",
        "text": "গরিলা",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_48_d",
        "text": "গিনিপিগ",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: রেসাস বানর।",
      "coreConcept": "রেসাস বানরের (Macaca mulatta) লোহিত কণিকায় প্রথম আবিষ্কৃত হওয়ায় একে Rh ফ্যাক্টর বলা হয়।",
      "distractorAnalysis": {
        "opt_bio_6_48_b": "শিম্পাঞ্জির নামে Rh নামকরণ হয়নি।",
        "opt_bio_6_48_c": "গরিলার নামে নয়।",
        "opt_bio_6_48_d": "গিনিপিগ পরীক্ষাগারে ব্যবহৃত হলেও Rh নামকরণ রেসাস বানর থেকে এসেছে।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 147
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সিলেট বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_49",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "MCQ",
    "stem": "গর্ভকালীন এরিথ্রোব্লাস্টোসিস ফিটালিস জটিলতা কখন সৃষ্টির ঝুঁকি তৈরি হয়?",
    "options": [
      {
        "id": "opt_bio_6_49_a",
        "text": "মা $Rh^-$ এবং পিতা $Rh^+$ হলে",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_49_b",
        "text": "মা $Rh^+$ এবং পিতা $Rh^-$ হলে",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_49_c",
        "text": "পিতা ও মাতা উভয়েই $Rh^+$ হলে",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_49_d",
        "text": "পিতা ও মাতা উভয়েই $Rh^-$ হলে",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: মা $Rh^-$ এবং পিতা $Rh^+$ হলে।",
      "coreConcept": "মা $Rh^-$ হলে গর্ভস্থ $Rh^+$ সন্তানের রক্তের কারণে মায়ের দেহে অ্যান্টিবডি তৈরি হয়ে দ্বিতীয় সন্তানকে ক্ষতিগ্রস্ত করে।",
      "distractorAnalysis": {
        "opt_bio_6_49_b": "মা $Rh^+$ হলে ভ্রূণ যাই হোক মায়ের দেহে কোনো ক্ষতিকর অ্যান্টিবডি তৈরি হয় না।",
        "opt_bio_6_49_c": "উভয়েই $Rh^+$ হলে কোনো Rh অসঙ্গতি নেই।",
        "opt_bio_6_49_d": "উভয়েই $Rh^-$ হলে সন্তানও $Rh^-$ হবে, কোনো জটিলতা নেই।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 147
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "ময়মনসিংহ বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_50",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "MCQ",
    "stem": "বেমানান বা ভুল গ্রুপের রক্ত সঞ্চালন করলে লোহিত রক্তকণিকা জমাট বাঁধার প্রক্রিয়াকে কী বলে?",
    "options": [
      {
        "id": "opt_bio_6_50_a",
        "text": "অ্যাগ্লুটিনেশন (Agglutination)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_50_b",
        "text": "প্লাজমোলাইসিস",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_50_c",
        "text": "ইমবাইবিশন",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_50_d",
        "text": "হিমোফিলিয়া",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: অ্যাগ্লুটিনেশন।",
      "coreConcept": "অ্যান্টিজেন ও সদৃশ অ্যান্টিবডির পারস্পরিক বিক্রিয়ায় লোহিত রক্তকণিকা পুঞ্জীভূত হয়ে জমাট বাঁধে।",
      "distractorAnalysis": {
        "opt_bio_6_50_b": "প্লাজমোলাইসিস উদ্ভিদ কোষে পানি হ্রাসে প্রোটোপ্লাজম সংকোচন।",
        "opt_bio_6_50_c": "ইমবাইবিশন কলয়েড কর্তৃক পানি শোষণ।",
        "opt_bio_6_50_d": "হিমোফিলিয়া বংশগত রক্ত জমাট না বাঁধার রোগ।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 146
      }
    },
    "difficulty": "EASY",
    "boardSource": "ঢাকা বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_51",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "MCQ",
    "stem": "রক্ত পরিসঞ্চালনের পূর্বে দাতা ও গ্রহীতার রক্তের কোন পরীক্ষাটি বাধ্যতামূলক?",
    "options": [
      {
        "id": "opt_bio_6_51_a",
        "text": "ক্রস-ম্যাচিং ও স্ক্রিনিং টেস্ট",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_51_b",
        "text": "ইসিজি টেস্ট",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_51_c",
        "text": "এন্ডোস্কোপি",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_51_d",
        "text": "বায়োপসি",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: ক্রস-ম্যাচিং ও স্ক্রিনিং টেস্ট।",
      "coreConcept": "রক্তের গ্রুপ সামঞ্জস্য এবং হেপাটাইটিস, HIV ও সিফিলিস জীবাণুমুক্ত কিনা তা নিশ্চিত করতে এ পরীক্ষা জরুরি।",
      "distractorAnalysis": {
        "opt_bio_6_51_b": "ইসিজি হৃদপিণ্ডের বৈদ্যুতিক কার্যকলাপ রেকর্ড করে।",
        "opt_bio_6_51_c": "এন্ডোস্কোপি পরিপাকনালীর ভেতরের দৃশ্য দেখার পরীক্ষা।",
        "opt_bio_6_51_d": "বায়োপসি টিউমার বা ক্যান্সারের টিস্যু পরীক্ষা।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 148
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "রাজশাহী বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_52",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "MCQ",
    "stem": "B গ্রুপের কোনো রোগী নিচের কোন গ্রুপের রক্ত নিরাপদে গ্রহণ করতে পারবে?",
    "options": [
      {
        "id": "opt_bio_6_52_a",
        "text": "B এবং O গ্রুপ",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_52_b",
        "text": "A এবং AB গ্রুপ",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_52_c",
        "text": "কেবল AB গ্রুপ",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_52_d",
        "text": "A এবং B গ্রুপ",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: B এবং O গ্রুপ।",
      "coreConcept": "B গ্রুপের প্লাজমায় anti-a অ্যান্টিবডি থাকায় A বা AB রক্ত দিলে ক্ল্যাম্পিং হবে, তাই B ও O রক্ত নিতে পারবে।",
      "distractorAnalysis": {
        "opt_bio_6_52_b": "A এবং AB রক্তে অ্যান্টিজেন A থাকে যা গ্রহীতার anti-a দ্বারা আক্রান্ত হবে।",
        "opt_bio_6_52_c": "AB গ্রুপ থেকে B গ্রুপ রক্ত নিতে পারে না।",
        "opt_bio_6_52_d": "A গ্রুপের রক্ত B রোগীর জন্য ক্ষতিকর।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 146
      }
    },
    "difficulty": "EASY",
    "boardSource": "চট্টগ্রাম বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_53",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "MCQ",
    "stem": "প্রথম $Rh^+$ সন্তান প্রসবের কত ঘণ্টার মধ্যে $Rh^-$ মাকে Anti-D ইনজেকশন দিতে হয়?",
    "options": [
      {
        "id": "opt_bio_6_53_a",
        "text": "৭২ ঘণ্টার মধ্যে",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_53_b",
        "text": "৩০ দিনের মধ্যে",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_53_c",
        "text": "৬ মাস পর",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_53_d",
        "text": "২৪ বছর পর",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: ৭২ ঘণ্টার মধ্যে।",
      "coreConcept": "প্রসবের ৭২ ঘণ্টার মধ্যে Anti-D গামা গ্লোবিউলিন দিলে মায়ের প্রতিরোধ ব্যবস্থা স্থায়ী অ্যান্টিবডি তৈরির আগেই ভ্রূণের Rh কোষ নিষ্ক্রিয় হয়।",
      "distractorAnalysis": {
        "opt_bio_6_53_b": "৩০ দিন অনেক দেরি, ততদিনে মায়ের দেহে অ্যান্টিবডি তৈরি হয়ে যাবে।",
        "opt_bio_6_53_c": "৬ মাস পর কোনো কাজ করবে না।",
        "opt_bio_6_53_d": "২৪ বছর অবান্তর সময়কাল।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 147
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "কুমিল্লা বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_54",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "MCQ",
    "stem": "স্বেচ্ছায় রক্তদানের ক্ষেত্রে একজন সুস্থ প্রাপ্তবয়স্ক ব্যক্তির ন্যূনতম বয়স কত হতে হয়?",
    "options": [
      {
        "id": "opt_bio_6_54_a",
        "text": "১৮ বছর (এবং ওজন ৪৫-৫০ কেজির বেশি)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_54_b",
        "text": "১০ বছর",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_54_c",
        "text": "১২ বছর",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_54_d",
        "text": "২৫ বছর",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: ১৮ বছর (এবং ওজন ৪৫-৫০ কেজির বেশি)।",
      "coreConcept": "১৮ থেকে ৬০ বছর বয়সী যেকোনো সুস্থ প্রাপ্তবয়স্ক প্রতি ৪ মাস পর পর নিরাপদে এক ব্যাগ রক্ত দিতে পারে।",
      "distractorAnalysis": {
        "opt_bio_6_54_b": "১০ বছর অপ্রাপ্তবয়স্ক শিশু, রক্তদানের উপযুক্ত নয়।",
        "opt_bio_6_54_c": "১২ বছর বয়সে শারীরিক গঠন অপরিপক্ক থাকে।",
        "opt_bio_6_54_d": "২৫ বছর আবশ্যক নয়, ১৮ বছর থেকেই রক্তদান আইনসিদ্ধ ও নিরাপদ।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 148
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "যশোর বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_55",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "CQ_CREATIVE",
    "stem": "নিলয় রক্ত পরীক্ষায় দেখল তার প্রতি ঘন মিলিমিটার রক্তে লোহিত রক্তকণিকার সংখ্যা মাত্র ৩৫ লক্ষ এবং হিমোগ্লোবিন ৮ গ্রাম/ডেসিলিটার। সে প্রায়ই দুর্বলতা ও শ্বাসকষ্ট অনুভব করে। ডাক্তার তাকে আয়রন ও পুষ্টিকর খাবার খেতে বললেন।",
    "options": null,
    "explanation": {
      "directAnswer": "অ্যানিমিয়া বা রক্তস্বল্পতা হলে RBC ও হিমোগ্লোবিন কমে দেহের টিস্যুতে অক্সিজেন পরিবহন বিঘ্নিত হয়।",
      "coreConcept": "লোহিত রক্তকণিকা, হিমোগ্লোবিনের গঠন ও অক্সিজেন পরিবহন।",
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 142
      }
    },
    "cqRubric": {
      "ka": {
        "mark": 1,
        "criteria": "সঠিক জ্ঞানমূলক উত্তর: হিমোগ্লোবিন কী?"
      },
      "kha": {
        "mark": 2,
        "criteria": "যথাযথ অনুধাবন ও ব্যাখ্যা: পরিণত মানুষের লোহিত রক্তকণিকায় নিউক্লিয়াস থাকে না কেন?"
      },
      "ga": {
        "mark": 3,
        "criteria": "উদ্দীপকের সাথে সংশ্লিষ্ট প্রয়োগমূলক বিশ্লেষণ: নিলয়ের রক্ত পরীক্ষার ফলাফলের ভিত্তিতে তার অসুস্থতার কারণ ব্যাখ্যা করো।"
      },
      "gha": {
        "mark": 4,
        "criteria": "উচ্চতর চিন্তন দক্ষতা ও যৌক্তিক মূল্যায়ন: নিলয়কে সুস্থ করে তুলতে ডাক্তারের পরামর্শের জৈবিক গুরুত্ব বিশ্লেষণ করো।"
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সৃজনশীল বোর্ড প্রশ্ন",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_56",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "CQ_CREATIVE",
    "stem": "সাদিকের আঙুল কেটে গিয়ে ক্ষতের সৃষ্টি হলে কিছুদিন পর সেখানে সামান্য পুঁজ জমল এবং ক্ষতটি শুকিয়ে গেল। শিক্ষক বললেন, “আমাদের রক্তের শ্বেত রক্তকণিকা দেহের ভ্রাম্যমাণ পুলিশ বাহিনীর মতো কাজ করে ক্ষতস্থানে জীবাণু ধ্বংস করেছে।”",
    "options": null,
    "explanation": {
      "directAnswer": "শ্বেত রক্তকণিকা ফ্যাগোসাইটোসিস ও অ্যান্টিবডি তৈরির মাধ্যমে ক্ষতস্থানের সংক্রমণ প্রতিরোধ করে।",
      "coreConcept": "শ্বেত রক্তকণিকার প্রকারভেদ ও দেহের অনাক্রম্যতা রক্ষা।",
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 143
      }
    },
    "cqRubric": {
      "ka": {
        "mark": 1,
        "criteria": "সঠিক জ্ঞানমূলক উত্তর: ফ্যাগোসাইটোসিস কাকে বলে?"
      },
      "kha": {
        "mark": 2,
        "criteria": "যথাযথ অনুধাবন ও ব্যাখ্যা: বেসোফিলকে কেন রক্তের প্রাকৃতিক অ্যান্টি-কোয়াগুল্যান্ট রক্ষক বলা হয়?"
      },
      "ga": {
        "mark": 3,
        "criteria": "উদ্দীপকের সাথে সংশ্লিষ্ট প্রয়োগমূলক বিশ্লেষণ: উদ্দীপকের ক্ষতে সাদিকের দেহের শ্বেত রক্তকণিকা কীভাবে জীবাণু প্রতিরোধ করল ব্যাখ্যা করো।"
      },
      "gha": {
        "mark": 4,
        "criteria": "উচ্চতর চিন্তন দক্ষতা ও যৌক্তিক মূল্যায়ন: মানবদেহের প্রতিরক্ষা বলয় তৈরিতে শ্বেতকণিকার বিভিন্ন রূপের তুলনামূলক ভূমিকা মূল্যায়ন করো।"
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সৃজনশীল বোর্ড প্রশ্ন",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_57",
    "topicId": "top_ssc_biology_ch6_4",
    "type": "CQ_CREATIVE",
    "stem": "একটি সড়ক দুর্ঘটনায় আহত পথচারীর হাত কেটে রক্তপাত হচ্ছিল। প্রাথমিক চিকিৎসায় ক্ষতস্থান চেপে ধরার কিছুক্ষণ পর রক্ত জমাট বেঁধে রক্তপাত বন্ধ হলো। ডাক্তার বললেন, “রক্তের অণুচক্রিকা ও প্লাজমা প্রোটিনের ধারাবাহিক রাসায়নিক বিক্রিয়ার ফলেই জীবন রক্ষা পেয়েছে।”",
    "options": null,
    "explanation": {
      "directAnswer": "রক্ত তঞ্চন প্রক্রিয়ায় থ্রম্বোপ্লাস্টিন, ক্যালসিয়াম আয়ন, থ্রম্বিন ও ফাইব্রিন জালক রক্তপাত বন্ধ করে।",
      "coreConcept": "রক্ত তঞ্চন ক্যাস্কেড ও অণুচক্রিকার সক্রিয় ভূমিকা।",
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 144
      }
    },
    "cqRubric": {
      "ka": {
        "mark": 1,
        "criteria": "সঠিক জ্ঞানমূলক উত্তর: রক্ত তঞ্চন কী?"
      },
      "kha": {
        "mark": 2,
        "criteria": "যথাযথ অনুধাবন ও ব্যাখ্যা: সিরাম ও রক্তরসের মধ্যে দুটি প্রধান পার্থক্য লেখো।"
      },
      "ga": {
        "mark": 3,
        "criteria": "উদ্দীপকের সাথে সংশ্লিষ্ট প্রয়োগমূলক বিশ্লেষণ: উদ্দীপকে ক্ষতস্থানে রক্ত জমাট বাঁধার ধারাবাহিক ধাপগুলো সমীকরণসহ ব্যাখ্যা করো।"
      },
      "gha": {
        "mark": 4,
        "criteria": "উচ্চতর চিন্তন দক্ষতা ও যৌক্তিক মূল্যায়ন: অণুচক্রিকার সংখ্যা স্বাভাবিকের চেয়ে উল্লেখযোগ্যভাবে কমে গেলে কী কী প্রাণঘাতী ঝুঁকি সৃষ্টি হতে পারে বিশ্লেষণ করো।"
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সৃজনশীল বোর্ড প্রশ্ন",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_58",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "CQ_CREATIVE",
    "stem": "জরুরি অপারেশনের জন্য রক্তের প্রয়োজনে তানভীরের রক্ত পরীক্ষা করে দেখা গেল তার রক্তরসে anti-b অ্যান্টিবডি রয়েছে এবং লোহিত কণিকায় অ্যান্টিজেন A রয়েছে। তার বন্ধু কবিরের রক্তে কোনো ধরনের অ্যান্টিজেনই পাওয়া যায়নি।",
    "options": null,
    "explanation": {
      "directAnswer": "তানভীরের রক্তের গ্রুপ A এবং কবিরের রক্তের গ্রুপ O।",
      "coreConcept": "ABO রক্ত গ্রুপে অ্যান্টিজেন ও অ্যান্টিবডির বণ্টন এবং সামঞ্জস্য।",
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 146
      }
    },
    "cqRubric": {
      "ka": {
        "mark": 1,
        "criteria": "সঠিক জ্ঞানমূলক উত্তর: রক্তের গ্রুপ কে আবিষ্কার করেন?"
      },
      "kha": {
        "mark": 2,
        "criteria": "যথাযথ অনুধাবন ও ব্যাখ্যা: AB গ্রুপের রক্তকে সার্বজনীন গ্রহীতা বলা হয় কেন?"
      },
      "ga": {
        "mark": 3,
        "criteria": "উদ্দীপকের সাথে সংশ্লিষ্ট প্রয়োগমূলক বিশ্লেষণ: উদ্দীপকের তথ্যানুযায়ী তানভীর ও কবিরের রক্তের গ্রুপ নির্ণয়পূর্বক ব্যাখ্যা করো।"
      },
      "gha": {
        "mark": 4,
        "criteria": "উচ্চতর চিন্তন দক্ষতা ও যৌক্তিক মূল্যায়ন: কবিরের রক্ত তানভীরকে নিরাপদে দেওয়া সম্ভব কি না—যৌক্তিক বিজ্ঞানসম্মত বিশ্লেষণ দাও।"
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সৃজনশীল বোর্ড প্রশ্ন",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_59",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "CQ_CREATIVE",
    "stem": "রিফাতের রক্তের গ্রুপ $Rh^+$ এবং তার স্ত্রীর রক্তের গ্রুপ $Rh^-$। তাদের প্রথম সন্তান সম্পূর্ণ সুস্থভাবে জন্ম নিলেও দ্বিতীয় সন্তান গর্ভধারণের পর ডাক্তার তাদের বিশেষ সতর্কতামূলক ইনজেকশন নেওয়ার পরামর্শ দেন এবং বললেন, “গর্ভস্থ সন্তানের রক্তকণিকা ধ্বংসের ঝুঁকি রয়েছে।”",
    "options": null,
    "explanation": {
      "directAnswer": "Rh অসঙ্গতির কারণে দ্বিতীয় গর্ভাবস্থায় এরিথ্রোব্লাস্টোসিস ফিটালিস সৃষ্টির ঝুঁকি থাকে।",
      "coreConcept": "Rh ফ্যাক্টরের জিনগত অসঙ্গতি ও এরিথ্রোব্লাস্টোসিস ফিটালিস।",
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 147
      }
    },
    "cqRubric": {
      "ka": {
        "mark": 1,
        "criteria": "সঠিক জ্ঞানমূলক উত্তর: Rh ফ্যাক্টর কী?"
      },
      "kha": {
        "mark": 2,
        "criteria": "যথাযথ অনুধাবন ও ব্যাখ্যা: অ্যাগ্লুটিনেশন বলতে কী বোঝায়?"
      },
      "ga": {
        "mark": 3,
        "criteria": "উদ্দীপকের সাথে সংশ্লিষ্ট প্রয়োগমূলক বিশ্লেষণ: উদ্দীপকে দ্বিতীয় সন্তানের ক্ষেত্রে সম্ভাব্য বিপদের কারণ বৈজ্ঞানিকভাবে ব্যাখ্যা করো।"
      },
      "gha": {
        "mark": 4,
        "criteria": "উচ্চতর চিন্তন দক্ষতা ও যৌক্তিক মূল্যায়ন: উক্ত ঝুঁকি এড়াতে আধুনিক চিকিৎসা বিজ্ঞানের ভূমিকা ও সচেতনতা মূল্যায়ন করো।"
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সৃজনশীল বোর্ড প্রশ্ন",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_60",
    "topicId": "top_ssc_biology_ch6_5",
    "type": "CQ_CREATIVE",
    "stem": "হাসপাতালে এক মুমূর্ষু রোগীকে তাৎক্ষণিকভাবে রক্ত দিতে গিয়ে ডাক্তার বললেন, “রক্তের গ্রুপ জানা থাকলেও ক্রস-ম্যাচিং ও স্ক্রিনিং টেস্ট ছাড়া এক ফোঁটা রক্তও সঞ্চালন করা চরম ঝুঁকিপূর্ণ।”",
    "options": null,
    "explanation": {
      "directAnswer": "রক্ত সঞ্চালনের পূর্বে ক্রস-ম্যাচিং এবং সংক্রামক ব্যাধি স্ক্রিনিং জীবন বাঁচানোর অপরিহার্য শর্ত।",
      "coreConcept": "রক্ত পরিসঞ্চালনের সতর্কতা ও নিরাপত্তা প্রোটোকল।",
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 148
      }
    },
    "cqRubric": {
      "ka": {
        "mark": 1,
        "criteria": "সঠিক জ্ঞানমূলক উত্তর: সার্বজনীন রক্তদাতা কাকে বলে?"
      },
      "kha": {
        "mark": 2,
        "criteria": "যথাযথ অনুধাবন ও ব্যাখ্যা: ভুল রক্ত সঞ্চালন রোগীর মৃত্যুর কারণ হতে পারে কেন?"
      },
      "ga": {
        "mark": 3,
        "criteria": "উদ্দীপকের সাথে সংশ্লিষ্ট প্রয়োগমূলক বিশ্লেষণ: উদ্দীপকে ডাক্তারের উল্লিখিত ক্রস-ম্যাচিং পরীক্ষার তাৎপর্য ব্যাখ্যা করো।"
      },
      "gha": {
        "mark": 4,
        "criteria": "উচ্চতর চিন্তন দক্ষতা ও যৌক্তিক মূল্যায়ন: একজন সচেতন নাগরিক হিসেবে নিরাপদ রক্তদান ও গ্রহণের সামাজিক দায়িত্ব বিশ্লেষণ করো।"
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সৃজনশীল বোর্ড প্রশ্ন",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  }
];
