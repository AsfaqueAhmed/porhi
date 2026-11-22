import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter6QuestionsBatch1: QuestionData[] = [
  {
    "id": "q_bio_6_01",
    "topicId": "top_ssc_biology_ch6_1",
    "type": "MCQ",
    "stem": "কলয়েডধর্মী শুষ্ক বা আধা-শুষ্ক পদার্থ কর্তৃক তরল পদার্থ শোষণের প্রক্রিয়াকে কী বলে?",
    "options": [
      {
        "id": "opt_bio_6_01_a",
        "text": "ইমবাইবিশন",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_01_b",
        "text": "ব্যাপন",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_01_c",
        "text": "অভিস্রবণ",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_01_d",
        "text": "প্রস্বেদন",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: ইমবাইবিশন।",
      "coreConcept": "সেলুলোজ, স্টার্চ ও জিলাটিনের মতো হাইড্রোফিলিক কলয়েডীয় পদার্থ পানি চুষে নেয়, যাকে ইমবাইবিশন বলে।",
      "distractorAnalysis": {
        "opt_bio_6_01_b": "ব্যাপন হলো উচ্চ ঘনত্ব থেকে নিম্ন ঘনত্বে অণুর স্বতঃস্ফূর্ত ব্যাপন।",
        "opt_bio_6_01_c": "অভিস্রবণের জন্য বৈষম্যভেদ্য পর্দা ও দুটি ভিন্ন ঘনত্বের দ্রবণ প্রয়োজন।",
        "opt_bio_6_01_d": "প্রস্বেদন হলো উদ্ভিদের বায়বীয় অঙ্গ দিয়ে বাষ্পাকারে পানি বের হওয়া।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 125
      }
    },
    "difficulty": "EASY",
    "boardSource": "ঢাকা বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_02",
    "topicId": "top_ssc_biology_ch6_1",
    "type": "MCQ",
    "stem": "উদ্ভিদ মাটি থেকে মূলত কোন ধরনের পানি মূলরোমের সাহায্যে শোষণ করে?",
    "options": [
      {
        "id": "opt_bio_6_02_a",
        "text": "কৈশিক পানি",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_02_b",
        "text": "ভূগর্ভস্থ গভীর পানি",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_02_c",
        "text": "মহাকর্ষীয় নিষ্কাশিত পানি",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_02_d",
        "text": "রাসায়নিকভাবে যুক্ত পানি",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: কৈশিক পানি।",
      "coreConcept": "মাটির কণাগুলোর মধ্যবর্তী সূক্ষ্ম রন্ধ্রে আটকে থাকা কৈশিক পানিই (Capillary water) মূলরোম দ্বারা শোষিত হয়।",
      "distractorAnalysis": {
        "opt_bio_6_02_b": "ভূগর্ভস্থ গভীর পানি সাধারণ মূলের নাগালের বাইরে থাকে।",
        "opt_bio_6_02_c": "মহাকর্ষীয় পানি মাটির নিচে চুইয়ে চলে যায়, উদ্ভিদ তা পায় না।",
        "opt_bio_6_02_d": "রাসায়নিকভাবে যুক্ত পানি মাটির খনিজের সাথে আবদ্ধ থাকে।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 127
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "রাজশাহী বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_03",
    "topicId": "top_ssc_biology_ch6_1",
    "type": "MCQ",
    "stem": "উদ্ভিদকোষের কোন অংশটি অভিস্রবণ প্রক্রিয়ায় বৈষম্যভেদ্য পর্দা (Selectively permeable) হিসেবে কাজ করে?",
    "options": [
      {
        "id": "opt_bio_6_03_a",
        "text": "প্লাজমামেমব্রেন বা কোষঝিল্লি",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_03_b",
        "text": "সেলুলোজ নির্মিত কোষপ্রাচীর",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_03_c",
        "text": "কিউটিকল স্তর",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_03_d",
        "text": "নিউক্লিওলাস",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: প্লাজমামেমব্রেন বা কোষঝিল্লি।",
      "coreConcept": "প্লাজমামেমব্রেন কেবল দ্রাবক অণুকে প্রবেশ করতে দেয় কিন্তু দ্রাব অণু প্রবেশে বাধা দেয়।",
      "distractorAnalysis": {
        "opt_bio_6_03_b": "সেলুলোজ কোষপ্রাচীর সম্পূর্ণ ভেদ্য পর্দা।",
        "opt_bio_6_03_c": "কিউটিকল স্তর পানি ও গ্যাসের জন্য অভেদ্য।",
        "opt_bio_6_03_d": "নিউক্লিওলাস নিউক্লিয়াসের ভেতরে অবস্থিত অঙ্গাণু।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 126
      }
    },
    "difficulty": "EASY",
    "boardSource": "চট্টগ্রাম বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_04",
    "topicId": "top_ssc_biology_ch6_1",
    "type": "MCQ",
    "stem": "উদ্ভিদ কোষে পানি প্রবেশের পর কোষপ্রাচীরে সৃষ্ট বিপরীত চাপকে কী বলা হয়?",
    "options": [
      {
        "id": "opt_bio_6_04_a",
        "text": "প্রাচীর চাপ (Wall pressure)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_04_b",
        "text": "ব্যাপন চাপ ঘাটতি",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_04_c",
        "text": "বায়ুমণ্ডলীয় চাপ",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_04_d",
        "text": "ইমবাইবিশন চাপ",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: প্রাচীর চাপ।",
      "coreConcept": "অন্তঃঅভিস্রবণে কোষ স্ফীত হলে প্রোটোপ্লাজম প্রাচীরে রসস্ফীতি চাপ দেয় এবং প্রাচীর ভেতরের দিকে প্রাচীর চাপ সৃষ্টি করে।",
      "distractorAnalysis": {
        "opt_bio_6_04_b": "ব্যাপন চাপ ঘাটতি হলো বিশুদ্ধ দ্রাবক ও দ্রবণের ব্যাপন চাপের পার্থক্য।",
        "opt_bio_6_04_c": "বায়ুমণ্ডলীয় চাপ বহিঃপরিবেশের বায়ুর ওজনজনিত চাপ।",
        "opt_bio_6_04_d": "ইমবাইবিশন চাপ কলয়েড কর্তৃক পানি শোষণে সৃষ্ট চাপ।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 127
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "কুমিল্লা বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_05",
    "topicId": "top_ssc_biology_ch6_1",
    "type": "MCQ",
    "stem": "উদ্ভিদে খনিজ লবণ সক্রিয় শোষণের (Active absorption) ক্ষেত্রে কোন মতবাদটি সুপরিচিত?",
    "options": [
      {
        "id": "opt_bio_6_05_a",
        "text": "সাইটোক্রোম পাম্প বা লুন্ডেগড় মতবাদ",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_05_b",
        "text": "ডিক্সন ও জলির মতবাদ",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_05_c",
        "text": "মুঞ্চের চাপ-প্রবাহ মতবাদ",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_05_d",
        "text": "ডারউইনের প্রাকৃতিক নির্বাচন মতবাদ",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: সাইটোক্রোম পাম্প বা লুন্ডেগড় মতবাদ।",
      "coreConcept": "বিজ্ঞানী লুন্ডেগড় ও বার্স্ট্রম অ্যানায়ন সক্রিয় শোষণে সাইটোক্রোম পাম্প মতবাদ প্রস্তাব করেন।",
      "distractorAnalysis": {
        "opt_bio_6_05_b": "ডিক্সন ও জলির মতবাদ রসের উৎস্রোত সম্পর্কিত।",
        "opt_bio_6_05_c": "মুঞ্চের মতবাদ ফ্লোয়েমে খাদ্য পরিবহন সম্পর্কিত।",
        "opt_bio_6_05_d": "ডারউইনের মতবাদ জৈব অভিব্যক্তির তত্ত্ব।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 129
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "যশোর বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_06",
    "topicId": "top_ssc_biology_ch6_1",
    "type": "MCQ",
    "stem": "উদ্ভিদ কোন রূপে মাটি থেকে নাইট্রোজেন সবচেয়ে বেশি শোষণ করে?",
    "options": [
      {
        "id": "opt_bio_6_06_a",
        "text": "নাইট্রেট আয়ন ($NO_3^-$)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_06_b",
        "text": "আণবিক নাইট্রোজেন গ্যাস ($N_2$)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_06_c",
        "text": "নাইট্রাইট আয়ন ($NO_2^-$)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_06_d",
        "text": "ইউরিয়া যৌগ",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: নাইট্রেট আয়ন।",
      "coreConcept": "উদ্ভিদ মাটি থেকে প্রধানত নাইট্রেট ($NO_3^-$) এবং কিছু ক্ষেত্রে অ্যামোনিয়াম ($NH_4^+$) আয়ন শোষণ করে।",
      "distractorAnalysis": {
        "opt_bio_6_06_b": "উদ্ভিদ সরাসরি বাতাস থেকে $N_2$ গ্যাস গ্রহণ করতে পারে না।",
        "opt_bio_6_06_c": "নাইট্রাইট আয়ন উদ্ভিদের জন্য বিষাক্ত ও কম স্থিতিশীল।",
        "opt_bio_6_06_d": "ইউরিয়া সরাসরি মূলরোম দ্বারা খুব কম শোষিত হয়, মাটিতে ভেঙে আয়ন হয়।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 129
      }
    },
    "difficulty": "HARD",
    "boardSource": "দিনাজপুর বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_07",
    "topicId": "top_ssc_biology_ch6_1",
    "type": "MCQ",
    "stem": "কোষপ্রাচীর ও কোষান্তর্বর্তী স্থানের মধ্য দিয়ে পানির পরিবহন পথকে কী বলা হয়?",
    "options": [
      {
        "id": "opt_bio_6_07_a",
        "text": "অ্যাপোপ্লাস্ট পথ (Apoplast pathway)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_07_b",
        "text": "সিমপ্লাস্ট পথ (Symplast pathway)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_07_c",
        "text": "ভ্যাকুওলার পথ",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_07_d",
        "text": "প্লাজমোডেসমাটা পথ",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: অ্যাপোপ্লাস্ট পথ।",
      "coreConcept": "নির্জীব কোষপ্রাচীর ও আন্তঃকোষীয় ফাঁক দিয়ে পানির অবাধ চলাচলকে অ্যাপোপ্লাস্ট বলে।",
      "distractorAnalysis": {
        "opt_bio_6_07_b": "সিমপ্লাস্ট পথ সজীব প্রোটোপ্লাজমের মধ্য দিয়ে ঘটে।",
        "opt_bio_6_07_c": "ভ্যাকুওলার পথে পানি সরাসরি কোষগহ্বরে প্রবেশ করে।",
        "opt_bio_6_07_d": "প্লাজমোডেসমাটা সিমপ্লাস্ট পথের সাইটোপ্লাজমীয় সংযোগ।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 128
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সিলেট বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_08",
    "topicId": "top_ssc_biology_ch6_1",
    "type": "MCQ",
    "stem": "কোন অঙ্গাণুর মাধ্যমে পাশাপাশি দুটি উদ্ভিদ কোষের সাইটোপ্লাজম সরাসরি যুক্ত থাকে?",
    "options": [
      {
        "id": "opt_bio_6_08_a",
        "text": "প্লাজমোডেসমাটা (Plasmodesmata)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_08_b",
        "text": "মাইটোকন্ড্রিয়া",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_08_c",
        "text": "লাইসোজোম",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_08_d",
        "text": "টোনোপ্লাস্ট",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: প্লাজমোডেসমাটা।",
      "coreConcept": "দুটি সংলগ্ন উদ্ভিদ কোষের কোষপ্রাচীরের সূক্ষ্ম ছিদ্র দিয়ে সাইটোপ্লাজমীয় সংযোগকে প্লাজমোডেসমাটা বলে।",
      "distractorAnalysis": {
        "opt_bio_6_08_b": "মাইটোকন্ড্রিয়া কোষের শ্বসন ও শক্তি উৎপাদন অঙ্গাণু।",
        "opt_bio_6_08_c": "লাইসোজোম হাইড্রোলাইটিক এনজাইম ধারণকারী অঙ্গাণু।",
        "opt_bio_6_08_d": "টোনোপ্লাস্ট হলো কোষগহ্বরকে আবৃতকারী পর্দা।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 128
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "ময়মনসিংহ বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_09",
    "topicId": "top_ssc_biology_ch6_2",
    "type": "MCQ",
    "stem": "উদ্ভিদের মোট প্রস্বেদনের শতকরা কত ভাগ পত্ররন্ধ্রের (Stomata) মাধ্যমে ঘটে?",
    "options": [
      {
        "id": "opt_bio_6_09_a",
        "text": "৯০% থেকে ৯৫%",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_09_b",
        "text": "৫০% থেকে ৬০%",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_09_c",
        "text": "১০% থেকে ২০%",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_09_d",
        "text": "১% থেকে ৩%",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: ৯০% থেকে ৯৫%।",
      "coreConcept": "উদ্ভিদের অধিকাংশ বাষ্পমোচন পাতার পত্ররন্ধ্রের মাধ্যমেই নিয়ন্ত্রিত ও সম্পন্ন হয়।",
      "distractorAnalysis": {
        "opt_bio_6_09_b": "৫০-৬০% অনেক কম মান, পত্ররন্ধ্রীয় প্রস্বেদন এর চেয়ে অনেক বেশি।",
        "opt_bio_6_09_c": "১০-২০% ত্বকীয় বা কিউটিকুলার প্রস্বেদনের চেয়ে বেশি কিন্তু পত্ররন্ধ্রের নয়।",
        "opt_bio_6_09_d": "১-৩% লেন্টিকুলার ও কিউটিকুলার প্রস্বেদনের পরিসীমা।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 132
      }
    },
    "difficulty": "EASY",
    "boardSource": "ঢাকা বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_10",
    "topicId": "top_ssc_biology_ch6_2",
    "type": "MCQ",
    "stem": "বিজ্ঞানী কার্টিস প্রস্বেদনকে কী নামে অভিহিত করেছিলেন?",
    "options": [
      {
        "id": "opt_bio_6_10_a",
        "text": "প্রয়োজনীয় অমঙ্গল (A Necessary Evil)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_10_b",
        "text": "জীবনের তরল (Fluid of Life)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_10_c",
        "text": "শারীরবৃত্তীয় আশীর্বাদ",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_10_d",
        "text": "জৈব রাসায়নিক দুর্ঘটনা",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: প্রয়োজনীয় অমঙ্গল।",
      "coreConcept": "কার্টিস ১৯২৬ সালে প্রস্বেদনকে প্রয়োজনীয় অথচ ক্ষতিকর বিবেচনা করে 'Necessary Evil' বলেন।",
      "distractorAnalysis": {
        "opt_bio_6_10_b": "'জীবনের তরল' পানিকে বলা হয়।",
        "opt_bio_6_10_c": "শারীরবৃত্তীয় আশীর্বাদ প্রস্বেদনের প্রচলিত বৈজ্ঞানিক নাম নয়।",
        "opt_bio_6_10_d": "প্রস্বেদন কোনো দুর্ঘটনা নয়, নিয়ন্ত্রিত প্রক্রিয়া।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 135
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "বরিশাল বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_11",
    "topicId": "top_ssc_biology_ch6_2",
    "type": "MCQ",
    "stem": "দিনের বেলা পত্ররন্ধ্র উন্মুক্ত হওয়ার মূল শারীরবৃত্তীয় কারণ কোনটি?",
    "options": [
      {
        "id": "opt_bio_6_11_a",
        "text": "রক্ষীকোষে $K^+$ আয়ন প্রবেশ ও রসস্ফীতি চাপ বৃদ্ধি",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_11_b",
        "text": "রক্ষীকোষ থেকে পানি বাইরে বের হয়ে যাওয়া",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_11_c",
        "text": "পাতার কিউটিকল গলে যাওয়া",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_11_d",
        "text": "ক্লোরোফিল বিনষ্ট হওয়া",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: রক্ষীকোষে $K^+$ আয়ন প্রবেশ ও রসস্ফীতি চাপ বৃদ্ধি।",
      "coreConcept": "আলোর উপস্থিতিতে সক্রিয় $K^+$ পাম্প চালু হয়ে অভিস্রবণিক ঘনত্ব বাড়ায়, পানি রক্ষীকোষে ঢুকে রন্ধ্র খোলে।",
      "distractorAnalysis": {
        "opt_bio_6_11_b": "পানি বের হয়ে গেলে রক্ষীকোষ শিথিল হয় ও রন্ধ্র বন্ধ হয়ে যায়।",
        "opt_bio_6_11_c": "কিউটিকল গলে যাওয়া কোনো জৈবিক প্রক্রিয়া নয়।",
        "opt_bio_6_11_d": "ক্লোরোফিল বিনষ্ট হলে পাতা খাদ্য তৈরি করতে পারে না।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 133
      }
    },
    "difficulty": "EASY",
    "boardSource": "চট্টগ্রাম বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_12",
    "topicId": "top_ssc_biology_ch6_2",
    "type": "MCQ",
    "stem": "বায়ুমণ্ডলের আপেক্ষিক আর্দ্রতা বৃদ্ধি পেলে প্রস্বেদনের হারের কী পরিবর্তন ঘটে?",
    "options": [
      {
        "id": "opt_bio_6_12_a",
        "text": "প্রস্বেদনের হার হ্রাস পায়",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_12_b",
        "text": "প্রস্বেদনের হার বৃদ্ধি পায়",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_12_c",
        "text": "প্রস্বেদন পুরোপুরি বন্ধ হয়",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_12_d",
        "text": "কোনো প্রভাব পড়ে না",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: প্রস্বেদনের হার হ্রাস পায়।",
      "coreConcept": "বাতাসে জলীয় বাষ্প বেশি থাকলে পাতার মেসোফিল ও বায়ুমণ্ডলের ব্যাপন চাপ ঘাটতি কমে যায়, ফলে প্রস্বেদন হ্রাস পায়।",
      "distractorAnalysis": {
        "opt_bio_6_12_b": "শুষ্ক বাতাসেই প্রস্বেদন বাড়ে, আর্দ্র বাতাসে নয়।",
        "opt_bio_6_12_c": "প্রস্বেদন সম্পূর্ণ বন্ধ হয় না, কেবল হার কমে।",
        "opt_bio_6_12_d": "আর্দ্রতা প্রস্বেদনের একটি অন্যতম প্রধান নিয়ন্ত্রক।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 134
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "রাজশাহী বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_13",
    "topicId": "top_ssc_biology_ch6_2",
    "type": "MCQ",
    "stem": "কাষ্ঠল উদ্ভিদের বাকল ফেটে সৃষ্ট লেন্স আকৃতির রন্ধ্রকে কী বলা হয়?",
    "options": [
      {
        "id": "opt_bio_6_13_a",
        "text": "লেন্টিসেল (Lenticel)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_13_b",
        "text": "স্টোমাটা",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_13_c",
        "text": "হাইড্যাথোড",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_13_d",
        "text": "ভেসেল",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: লেন্টিসেল।",
      "coreConcept": "গৌণ বৃদ্ধির সময় কাণ্ডের কর্ক টিস্যু ফেটে যে রন্ধ্র তৈরি হয় তাকে লেন্টিসেল বলে, যা দিয়ে ১% প্রস্বেদন ঘটে।",
      "distractorAnalysis": {
        "opt_bio_6_13_b": "স্টোমাটা প্রধানত কচি পাতা ও কচি কান্ডে থাকে।",
        "opt_bio_6_13_c": "হাইড্যাথোড পানি মোচন বা গুটেশন অঙ্গ।",
        "opt_bio_6_13_d": "ভেসেল হলো জাইলেমের সংবহন নালী।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 132
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "যশোর বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_14",
    "topicId": "top_ssc_biology_ch6_2",
    "type": "MCQ",
    "stem": "পানি শোষণের তুলনায় প্রস্বেদনের হার বেশি হলে উদ্ভিদের যে ঢলে পড়া অবস্থা হয় তাকে কী বলে?",
    "options": [
      {
        "id": "opt_bio_6_14_a",
        "text": "উইল্টিং বা নেতিয়ে পড়া (Wilting)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_14_b",
        "text": "গুটেশন (Guttation)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_14_c",
        "text": "ইটিঅলেশন (Etiolation)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_14_d",
        "text": "ক্লোরোসিস (Chlorosis)",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: উইল্টিং বা নেতিয়ে পড়া।",
      "coreConcept": "কোষের রসস্ফীতি নষ্ট হয়ে গাছ হেলে বা নেতিয়ে পড়াকে উইল্টিং বলে, যা দীর্ঘস্থায়ী হলে গাছ মারা যায়।",
      "distractorAnalysis": {
        "opt_bio_6_14_b": "গুটেশন হলো তরল আকারে পানি বের হওয়া।",
        "opt_bio_6_14_c": "ইটিঅলেশন হলো আলোর অভাবে উদ্ভিদের ফ্যাকাশে হওয়া।",
        "opt_bio_6_14_d": "ক্লোরোসিস হলো খনিজের অভাবে পাতা হলুদ হওয়া।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 135
      }
    },
    "difficulty": "HARD",
    "boardSource": "দিনাজপুর বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_15",
    "topicId": "top_ssc_biology_ch6_2",
    "type": "MCQ",
    "stem": "মরুজ উদ্ভিদে (Xerophytes) প্রস্বেদন রোধে পাতার পৃষ্ঠে কিসের পুরু আবরণ থাকে?",
    "options": [
      {
        "id": "opt_bio_6_15_a",
        "text": "কিউটিকল ও মোমের স্তর",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_15_b",
        "text": "স্টার্চ স্তর",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_15_c",
        "text": "পেপটিন স্তর",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_15_d",
        "text": "হিমোগ্লোবিন স্তর",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: কিউটিকল ও মোমের স্তর।",
      "coreConcept": "মরুজ উদ্ভিদের কিউটিকুলার স্তর অত্যন্ত পুরু হওয়ায় পানি বাষ্পীভবনে বাধা সৃষ্টি করে।",
      "distractorAnalysis": {
        "opt_bio_6_15_b": "স্টার্চ কোষাভ্যন্তরে সঞ্চিত খাদ্য।",
        "opt_bio_6_15_c": "পেপটিন মধ্যপর্দায় থাকে।",
        "opt_bio_6_15_d": "হিমোগ্লোবিন প্রাণীর রক্তে থাকে, উদ্ভিদে নয়।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 134
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "কুমিল্লা বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_16",
    "topicId": "top_ssc_biology_ch6_2",
    "type": "MCQ",
    "stem": "কোন রঙের আলোতে পত্ররন্ধ্র সবচেয়ে দ্রুত ও সক্রিয়ভাবে উন্মুক্ত হয়?",
    "options": [
      {
        "id": "opt_bio_6_16_a",
        "text": "নীল ও লাল আলো",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_16_b",
        "text": "সবুজ আলো",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_16_c",
        "text": "অবলোহিত আলো",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_16_d",
        "text": "হলুদ আলো",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: নীল ও লাল আলো।",
      "coreConcept": "নীল আলো ফোটোট্রপিন রিসেপ্টর উদ্দীপিত করে এবং লাল আলো সালোকসংশ্লেষণ বাড়িয়ে পত্ররন্ধ্র খোলে।",
      "distractorAnalysis": {
        "opt_bio_6_16_b": "সবুজ আলো ক্লোরোফিল প্রতিফলিত করে, কার্যকর নয়।",
        "opt_bio_6_16_c": "অবলোহিত আলো উত্তাপ দেয় কিন্তু ফোটোরিসেপ্টর জাগায় না।",
        "opt_bio_6_16_d": "হলুদ আলোর কার্যকারিতা তুলনামূলক কম।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 134
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সিলেট বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_17",
    "topicId": "top_ssc_biology_ch6_3",
    "type": "MCQ",
    "stem": "উদ্ভিদের মূল থেকে পাতা পর্যন্ত পানি ও খনিজ লবণের ঊর্ধ্বমুখী পরিবহনকে কী বলা হয়?",
    "options": [
      {
        "id": "opt_bio_6_17_a",
        "text": "রসের উৎস্রোত (Ascent of sap)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_17_b",
        "text": "খাদ্য পরিবহন",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_17_c",
        "text": "ইমবাইবিশন",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_17_d",
        "text": "বহিঃঅভিস্রবণ",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: রসের উৎস্রোত।",
      "coreConcept": "জাইলেম বাহিকা দিয়ে মাটি থেকে পাতায় কোষরসের অভিকর্ষের বিপরীতে ওঠাকে রসের উৎস্রোত বলে।",
      "distractorAnalysis": {
        "opt_bio_6_17_b": "খাদ্য পরিবহন ফ্লোয়েম দিয়ে ঘটে এবং তা বহুমুখী।",
        "opt_bio_6_17_c": "ইমবাইবিশন কেবল তরল শোষণ প্রক্রিয়া।",
        "opt_bio_6_17_d": "বহিঃঅভিস্রবণে কোষ থেকে পানি বের হয়ে যায়।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 136
      }
    },
    "difficulty": "EASY",
    "boardSource": "ঢাকা বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_18",
    "topicId": "top_ssc_biology_ch6_3",
    "type": "MCQ",
    "stem": "১৮৯৪ সালে রসের উৎস্রোতের জন্য 'সংসক্তি-টান মতবাদ' (Cohesion-Tension theory) কে প্রস্তাব করেন?",
    "options": [
      {
        "id": "opt_bio_6_18_a",
        "text": "ডিক্সন ও জলি",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_18_b",
        "text": "আর্নস্ট মুঞ্চ",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_18_c",
        "text": "রবার্ট হুক",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_18_d",
        "text": "জগদীশ চন্দ্র বসু",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: ডিক্সন ও জলি।",
      "coreConcept": "বিজ্ঞানী এইচ. এইচ. ডিক্সন এবং জে. জলি ১৮৯৪ সালে পানির অণুর সংসক্তি ও প্রস্বেদন টান তত্ত্ব দেন।",
      "distractorAnalysis": {
        "opt_bio_6_18_b": "আর্নস্ট মুঞ্চ ফ্লোয়েমে খাদ্য পরিবহনের প্রেশার-ফ্লো হাইপোথিসিস দেন।",
        "opt_bio_6_18_c": "রবার্ট হুক কোষ আবিষ্কার করেন।",
        "opt_bio_6_18_d": "জগদীশ চন্দ্র বসু উদ্ভিদের সংবেদনশীলতা ও পালসেশন মতবাদ দেন।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 137
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "রাজশাহী বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_19",
    "topicId": "top_ssc_biology_ch6_3",
    "type": "MCQ",
    "stem": "পানির অণুগুলোর পরস্পরের সাথে হাইড্রোজেন বন্ধন দ্বারা সংযুক্ত থাকার আকর্ষণকে কী বলে?",
    "options": [
      {
        "id": "opt_bio_6_19_a",
        "text": "সংসক্তি বল (Cohesion)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_19_b",
        "text": "আসক্তি বল (Adhesion)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_19_c",
        "text": "মহাকর্ষ বল",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_19_d",
        "text": "ঘর্ষণ বল",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: সংসক্তি বল।",
      "coreConcept": "একই পদার্থের অণুগুলোর পারস্পরিক আকর্ষণ হলো সংসক্তি (Cohesion), যা পানির অবিচ্ছিন্ন স্তম্ভ টিকিয়ে রাখে।",
      "distractorAnalysis": {
        "opt_bio_6_19_b": "ভিন্ন পদার্থের (পানি ও জাইলেম প্রাচীর) আকর্ষণ হলো আসক্তি (Adhesion)।",
        "opt_bio_6_19_c": "মহাকর্ষ বল পানিকে নিচের দিকে টানে।",
        "opt_bio_6_19_d": "ঘর্ষণ বল নালীতে প্রবাহে মৃদু বাধা দেয়।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 137
      }
    },
    "difficulty": "EASY",
    "boardSource": "চট্টগ্রাম বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_20",
    "topicId": "top_ssc_biology_ch6_3",
    "type": "MCQ",
    "stem": "ফ্লোয়েম টিস্যুর কোন উপাদানটি প্রস্তুতকৃত খাদ্য পরিবহনের মূল নালী হিসেবে কাজ করে?",
    "options": [
      {
        "id": "opt_bio_6_20_a",
        "text": "সিভনল (Sieve tube)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_20_b",
        "text": "ভেসেল",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_20_c",
        "text": "ট্রাকিড",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_20_d",
        "text": "জাইলেম ফাইবার",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: সিভনল।",
      "coreConcept": "ফ্লোয়েমের সিভনলের প্রান্তপ্রাচীরে সিভপ্লেট থাকে যা দিয়ে দ্রবীভূত জৈব খাদ্য বিভিন্ন অঙ্গে পরিবাহিত হয়।",
      "distractorAnalysis": {
        "opt_bio_6_20_b": "ভেসেল জাইলেমের মৃত পানি পরিবাহী কোষ।",
        "opt_bio_6_20_c": "ট্রাকিড জাইলেমের উপাদান।",
        "opt_bio_6_20_d": "জাইলেম ফাইবার উদ্ভিদে যান্ত্রিক দৃঢ়তা দেয়।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 138
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "বরিশাল বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_21",
    "topicId": "top_ssc_biology_ch6_3",
    "type": "MCQ",
    "stem": "মুঞ্চের খাদ্য পরিবহন তত্ত্বে খাদ্য গ্রহণকারী বা সঞ্চয়কারী মূল ও কন্দকে কী বলা হয়?",
    "options": [
      {
        "id": "opt_bio_6_21_a",
        "text": "সিংক বা গন্তব্য (Sink)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_21_b",
        "text": "উৎস (Source)",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_21_c",
        "text": "চ্যানেল",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_21_d",
        "text": "পাম্প",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: সিংক বা গন্তব্য।",
      "coreConcept": "পাতা হলো খাদ্য উৎপাদনের উৎস (Source) এবং খাদ্য ব্যবহারকারী অঙ্গ হলো সিংক (Sink)।",
      "distractorAnalysis": {
        "opt_bio_6_21_b": "পাতা হলো উৎস (Source)।",
        "opt_bio_6_21_c": "চ্যানেল হলো ফ্লোয়েম নালিপথ।",
        "opt_bio_6_21_d": "পাম্প হলো বিপাকীয় লোডিং মেকানিজম।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 138
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "যশোর বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_22",
    "topicId": "top_ssc_biology_ch6_3",
    "type": "MCQ",
    "stem": "ফ্লোয়েমে দ্রবীভূত খাদ্য পরিবাহিত হওয়ার সময় কোন প্রধান রাসায়নিক অণুরূপে পরিবাহিত হয়?",
    "options": [
      {
        "id": "opt_bio_6_22_a",
        "text": "সুক্রোজ (Sucrose)",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_22_b",
        "text": "অদ্রবণীয় স্টার্চ",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_22_c",
        "text": "সেলুলোজ",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_22_d",
        "text": "গ্লাইকোজেন",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: সুক্রোজ।",
      "coreConcept": "সালোকসংশ্লেষণে গ্লুকোজ তৈরি হলেও পরিবহনের জন্য তা স্থিতিশীল ডাইস্যাকারাইড সুক্রোজে রূপান্তরিত হয়।",
      "distractorAnalysis": {
        "opt_bio_6_22_b": "স্টার্চ অদ্রবণীয়, তাই সরাসরি ফ্লোয়েমে পরিবাহিত হতে পারে না।",
        "opt_bio_6_22_c": "সেলুলোজ কোষপ্রাচীরের প্রধান উপাদান।",
        "opt_bio_6_22_d": "গ্লাইকোজেন প্রাণিদেহের সঞ্চিত খাদ্য।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 138
      }
    },
    "difficulty": "HARD",
    "boardSource": "দিনাজপুর বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_23",
    "topicId": "top_ssc_biology_ch6_3",
    "type": "MCQ",
    "stem": "পেপেরোমিয়া উদ্ভিদের কান্ড রঙিন পানিতে ডুবিয়ে রাখলে কাণ্ডের কোন টিস্যুটি রঞ্জিত হয়?",
    "options": [
      {
        "id": "opt_bio_6_23_a",
        "text": "জাইলেম টিস্যু",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_23_b",
        "text": "ফ্লোয়েম টিস্যু",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_23_c",
        "text": "কর্টেক্স টিস্যু",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_23_d",
        "text": "এপিডার্মিস",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: জাইলেম টিস্যু।",
      "coreConcept": "রঙিন দ্রবণ পরীক্ষা প্রমাণ করে যে পানি ও দ্রবীভূত উপাদান কেবল জাইলেম নালী দিয়েই পাতায় ওঠে।",
      "distractorAnalysis": {
        "opt_bio_6_23_b": "ফ্লোয়েম খাদ্য পরিবহন করে, পানি পরিবহন নয়।",
        "opt_bio_6_23_c": "কর্টেক্স প্রাথমিক স্তরে থাকে, প্রধান সংবহনকারী নয়।",
        "opt_bio_6_23_d": "এপিডার্মিস বহিরাবরণ তৈরি করে।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 139
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "কুমিল্লা বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_24",
    "topicId": "top_ssc_biology_ch6_3",
    "type": "MCQ",
    "stem": "উদ্ভিদে রসের উৎস্রোত নিরবচ্ছিন্ন থাকার জন্য নিচের কোন বলত্রয় যৌথভাবে কার্যকর থাকে?",
    "options": [
      {
        "id": "opt_bio_6_24_a",
        "text": "সংসক্তি বল, আসক্তি বল ও প্রস্বেদন টান",
        "isCorrect": true
      },
      {
        "id": "opt_bio_6_24_b",
        "text": "অভিকর্ষ বল, চৌম্বক বল ও ঘর্ষণ বল",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_24_c",
        "text": "স্থির তড়িৎ বল, পৃষ্ঠটান ও নিউক্লীয় বল",
        "isCorrect": false
      },
      {
        "id": "opt_bio_6_24_d",
        "text": "প্লবতা বল, সান্দ্রতা বল ও কেন্দ্রাতিগ বল",
        "isCorrect": false
      }
    ],
    "explanation": {
      "directAnswer": "সঠিক উত্তর ক: সংসক্তি বল, আসক্তি বল ও প্রস্বেদন টান।",
      "coreConcept": "ডিক্সন-জলির মতে এই তিনটি বলের পারস্পরিক ক্রিয়ায় জাইলেম নালীতে অবিচ্ছিন্ন জলস্তম্ভ অক্ষুণ্ণ থাকে।",
      "distractorAnalysis": {
        "opt_bio_6_24_b": "চৌম্বক বল উদ্ভিদের পানির পরিবহনে কার্যকর নয়।",
        "opt_bio_6_24_c": "নিউক্লীয় বল পরমাণুর অভ্যন্তরে কাজ করে।",
        "opt_bio_6_24_d": "কেন্দ্রাতিগ বল ঘূর্ণনশীল সিস্টেমে কাজ করে।"
      },
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 137
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "ময়মনসিংহ বোর্ড",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_25",
    "topicId": "top_ssc_biology_ch6_1",
    "type": "CQ_CREATIVE",
    "stem": "রাকিব পরীক্ষাগারে শুকনো কিসমিস পানিতে রেখে দেখল সেগুলো ফুলে উঠেছে। শিক্ষক বললেন, “উদ্ভিদও একইভাবে মাটির কণার ফাঁক থেকে বিশেষ ভৌত প্রক্রিয়ায় পানি ও আয়ন শোষণ করে জীবিত থাকে।”",
    "options": null,
    "explanation": {
      "directAnswer": "কিসমিসের স্ফীতি অভিস্রবণের চমৎকার উদাহরণ এবং উদ্ভিদের শোষণ পদ্ধতি এতে সুস্পষ্ট হয়।",
      "coreConcept": "ইমবাইবিশন ও অন্তঃঅভিস্রবণের মাধ্যমে কোষের পানি গ্রহণ।",
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 126
      }
    },
    "cqRubric": {
      "ka": {
        "mark": 1,
        "criteria": "সঠিক সংজ্ঞা ও জ্ঞানমূলক উত্তর: ইমবাইবিশন কী?"
      },
      "kha": {
        "mark": 2,
        "criteria": "যথাযথ অনুধাবন ও ব্যাখ্যা: উদ্ভিদের ক্ষেত্রে পানিকে 'জীবনের তরল' বলা হয় কেন?"
      },
      "ga": {
        "mark": 3,
        "criteria": "উদ্দীপকের সাথে সংশ্লিষ্ট প্রয়োগমূলক বিশ্লেষণ: উদ্দীপকে কিসমিস ফুলে ওঠার পেছনের প্রক্রিয়াটি বৈজ্ঞানিক যুক্তিসহ ব্যাখ্যা করো।"
      },
      "gha": {
        "mark": 4,
        "criteria": "উচ্চতর চিন্তন দক্ষতা ও যৌক্তিক মূল্যায়ন: উদ্ভিদদেহের সজীবতা রক্ষায় খনিজ লবণ শোষণে সক্রিয় শোষণের ভূমিকা বিশ্লেষণ করো।"
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সৃজনশীল বোর্ড প্রশ্ন",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_26",
    "topicId": "top_ssc_biology_ch6_1",
    "type": "CQ_CREATIVE",
    "stem": "সালমা একটি টেস্টটিউবে লবণাক্ত পানি নিয়ে তাতে তাজা রোদেলা পাতা রাখল। কিছুক্ষণ পর দেখা গেল পাতাটির কোষগুলো সংকুচিত হয়ে গেছে। শিক্ষক বললেন, “কোষের ভেতরের রস ও বাইরের পরিবেশের ঘনত্বের পার্থক্যের কারণেই এমনটি ঘটেছে।”",
    "options": null,
    "explanation": {
      "directAnswer": "লবণাক্ত দ্রবণে বহিঃঅভিস্রবণের ফলে উদ্ভিদ কোষে প্লাজমোলাইসিস ঘটে।",
      "coreConcept": "হাইপারটনিক দ্রবণে প্লাজমোলাইসিস ও বৈষম্যভেদ্য পর্দার ভূমিকা।",
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 127
      }
    },
    "cqRubric": {
      "ka": {
        "mark": 1,
        "criteria": "সঠিক সংজ্ঞা ও জ্ঞানমূলক উত্তর: বৈষম্যভেদ্য পর্দা কী?"
      },
      "kha": {
        "mark": 2,
        "criteria": "যথাযথ অনুধাবন ও ব্যাখ্যা: কৈশিক পানি বলতে কী বোঝায়?"
      },
      "ga": {
        "mark": 3,
        "criteria": "উদ্দীপকের সাথে সংশ্লিষ্ট প্রয়োগমূলক বিশ্লেষণ: উদ্দীপকে পাতাটির সংকুচিত হওয়ার পেছনের জৈবিক প্রক্রিয়াটি ব্যাখ্যা করো।"
      },
      "gha": {
        "mark": 4,
        "criteria": "উচ্চতর চিন্তন দক্ষতা ও যৌক্তিক মূল্যায়ন: উদ্ভিদের জীবনে অভিস্রবণ ও প্লাজমোলাইসিসের তাৎপর্য মূল্যায়ন করো।"
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সৃজনশীল বোর্ড প্রশ্ন",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_27",
    "topicId": "top_ssc_biology_ch6_2",
    "type": "CQ_CREATIVE",
    "stem": "একটি টবে লাগানো সতেজ চারা গাছের কয়েকটি পাতাসহ ডাল পলিথিন ব্যাগ দিয়ে বেঁধে রোদে রাখা হলো। দুই ঘণ্টা পর পলিথিনের ভেতরে ক্ষুদ্র ক্ষুদ্র পানির বিন্দু জমা হতে দেখা গেল। শিক্ষক বললেন, “এটি উদ্ভিদের একটি গুরুত্বপূর্ণ শারীরবৃত্তীয় প্রক্রিয়া।”",
    "options": null,
    "explanation": {
      "directAnswer": "পলিথিন ব্যাগ বেলজার পরীক্ষার মাধ্যমে উদ্ভিদের প্রস্বেদন বা বাষ্পমোচন প্রমাণিত হয়।",
      "coreConcept": "পত্ররন্ধ্রীয় প্রস্বেদন ও বায়ুমণ্ডলে জলীয় বাষ্প নির্গমন।",
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 132
      }
    },
    "cqRubric": {
      "ka": {
        "mark": 1,
        "criteria": "সঠিক সংজ্ঞা ও জ্ঞানমূলক উত্তর: প্রস্বেদন কাকে বলে?"
      },
      "kha": {
        "mark": 2,
        "criteria": "যথাযথ অনুধাবন ও ব্যাখ্যা: লেন্টিসেল ও স্টোমাটার মধ্যে দুটি সুস্পষ্ট পার্থক্য লেখো।"
      },
      "ga": {
        "mark": 3,
        "criteria": "উদ্দীপকের সাথে সংশ্লিষ্ট প্রয়োগমূলক বিশ্লেষণ: উদ্দীপকের পরীক্ষায় পলিথিনের গায়ে পানির বিন্দু জমার প্রক্রিয়াটি ব্যাখ্যা করো।"
      },
      "gha": {
        "mark": 4,
        "criteria": "উচ্চতর চিন্তন দক্ষতা ও যৌক্তিক মূল্যায়ন: উক্ত শারীরবৃত্তীয় প্রক্রিয়াটি উদ্ভিদের বেঁচে থাকার জন্য কেন অত্যাবশ্যক তা বিশ্লেষণ করো।"
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সৃজনশীল বোর্ড প্রশ্ন",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_28",
    "topicId": "top_ssc_biology_ch6_2",
    "type": "CQ_CREATIVE",
    "stem": "গ্রীষ্মের এক তপ্ত দুপুরে দেখা গেল বাগানের চারা গাছগুলো নুয়ে পড়েছে। কিন্তু বিকেলে রোদের তীব্রতা কমার সাথে সাথে সেগুলো আবার সতেজ ও খাড়া হয়ে উঠল। শিক্ষক বললেন, “একটি বিশেষ শারীরবৃত্তীয় প্রক্রিয়াকে বিজ্ঞানী কার্টিস 'প্রয়োজনীয় অমঙ্গল' বলেছিলেন।”",
    "options": null,
    "explanation": {
      "directAnswer": "অতিরিক্ত বাষ্পমোচনে রসস্ফীতি হারিয়ে গাছ নেতিয়ে পড়ে (উইল্টিং), যা বিকেলে আবার পুনরুদ্ধার হয়।",
      "coreConcept": "প্রস্বেদনের হার বনাম পানি শোষণ হারের ভারসাম্য ও উইল্টিং।",
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 135
      }
    },
    "cqRubric": {
      "ka": {
        "mark": 1,
        "criteria": "সঠিক সংজ্ঞা ও জ্ঞানমূলক উত্তর: উইল্টিং (Wilting) কী?"
      },
      "kha": {
        "mark": 2,
        "criteria": "যথাযথ অনুধাবন ও ব্যাখ্যা: আপেক্ষিক আর্দ্রতা বাড়লে প্রস্বেদন হ্রাস পায় কেন?"
      },
      "ga": {
        "mark": 3,
        "criteria": "উদ্দীপকের সাথে সংশ্লিষ্ট প্রয়োগমূলক বিশ্লেষণ: উদ্দীপকের গাছটি দুপুরে নুয়ে পড়া এবং বিকেলে খাড়া হওয়ার কারণ ব্যাখ্যা করো।"
      },
      "gha": {
        "mark": 4,
        "criteria": "উচ্চতর চিন্তন দক্ষতা ও যৌক্তিক মূল্যায়ন: কার্টিস প্রস্বেদনকে 'প্রয়োজনীয় অমঙ্গল' কেন বলেছিলেন—উদ্দীপকের আলোকে বিশ্লেষণ করো।"
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সৃজনশীল বোর্ড প্রশ্ন",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_29",
    "topicId": "top_ssc_biology_ch6_3",
    "type": "CQ_CREATIVE",
    "stem": "উঁচু বৃক্ষের চূড়ায় কীভাবে পানি পৌঁছায় তা বোঝাতে শিক্ষক ব্ল্যাকবোর্ডে ডিক্সন ও জলির মতবাদের চিত্র আঁকলেন। তিনি বললেন, “পানির অণুগুলোর নিজস্ব বল এবং পাতার বাষ্পমোচন টান মিলে শত ফুট উঁচুতে পানি তুলে দেয়।”",
    "options": null,
    "explanation": {
      "directAnswer": "রসের উৎস্রোত ব্যাখ্যায় ডিক্সন-জলির সংসক্তি-টান মতবাদ সর্বজনস্বীকৃত।",
      "coreConcept": "জাইলেম নালী, প্রস্বেদন টান ও সংসক্তি বলের যৌথ ভূমিকা।",
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 137
      }
    },
    "cqRubric": {
      "ka": {
        "mark": 1,
        "criteria": "সঠিক সংজ্ঞা ও জ্ঞানমূলক উত্তর: রসের উৎস্রোত কী?"
      },
      "kha": {
        "mark": 2,
        "criteria": "যথাযথ অনুধাবন ও ব্যাখ্যা: সংসক্তি বল ও আসক্তি বলের মধ্যে পার্থক্য লেখো।"
      },
      "ga": {
        "mark": 3,
        "criteria": "উদ্দীপকের সাথে সংশ্লিষ্ট প্রয়োগমূলক বিশ্লেষণ: উদ্দীপকে উল্লিখিত তত্ত্বে কীভাবে অবিচ্ছিন্ন জলস্তম্ভ তৈরি হয় তা ব্যাখ্যা করো।"
      },
      "gha": {
        "mark": 4,
        "criteria": "উচ্চতর চিন্তন দক্ষতা ও যৌক্তিক মূল্যায়ন: উদ্ভিদের পরিবহন ব্যবস্থার মূল পথ হিসেবে জাইলেম টিস্যুর গুরুত্ব মূল্যায়ন করো।"
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সৃজনশীল বোর্ড প্রশ্ন",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  },
  {
    "id": "q_bio_6_30",
    "topicId": "top_ssc_biology_ch6_3",
    "type": "CQ_CREATIVE",
    "stem": "একটি পেপেরোমিয়া গাছের ডাল লাল কালির দ্রবণে এবং একটি কাণ্ডের বাকল রিং আকারে কেটে রেখে দেখা গেল বিশেষ একটি টিস্যু দিয়ে খাদ্য নিচে নামছে কিন্তু অন্যটি দিয়ে পানি উপরে উঠছে। শিক্ষক বললেন, “উদ্ভিদে দ্বিমুখী পরিবহন পৃথক টিস্যুর মাধ্যমে নিয়ন্ত্রিত হয়।”",
    "options": null,
    "explanation": {
      "directAnswer": "জাইলেম দিয়ে পানি ঊর্ধ্বমুখী এবং ফ্লোয়েম দিয়ে দ্রবীভূত খাদ্য নিম্নে ও পার্শ্বে পরিবাহিত হয়।",
      "coreConcept": "জাইলেম বনাম ফ্লোয়েম পরিবহন এবং মুঞ্চের চাপ-প্রবাহ মতবাদ।",
      "textbookCitation": {
        "bookTitle": "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        "chapterName": "ষষ্ঠ অধ্যায়: জীবে পরিবহন",
        "pageNumber": 138
      }
    },
    "cqRubric": {
      "ka": {
        "mark": 1,
        "criteria": "সঠিক সংজ্ঞা ও জ্ঞানমূলক উত্তর: সিভপ্লেট কী?"
      },
      "kha": {
        "mark": 2,
        "criteria": "যথাযথ অনুধাবন ও ব্যাখ্যা: ফ্লোয়েমে খাদ্য মূলত সুক্রোজ হিসেবে পরিবাহিত হয় কেন?"
      },
      "ga": {
        "mark": 3,
        "criteria": "উদ্দীপকের সাথে সংশ্লিষ্ট প্রয়োগমূলক বিশ্লেষণ: উদ্দীপকে বাকল কাটার পরও গাছটির খাদ্য পরিবহন কীভাবে প্রভাবিত হয় তা ব্যাখ্যা করো।"
      },
      "gha": {
        "mark": 4,
        "criteria": "উচ্চতর চিন্তন দক্ষতা ও যৌক্তিক মূল্যায়ন: মুঞ্চের চাপ-প্রবাহ মতবাদের আলোকে পাতায় তৈরি খাদ্যের বিভিন্ন অঙ্গে বণ্টন বিশ্লেষণ করো।"
      }
    },
    "difficulty": "MEDIUM",
    "boardSource": "সৃজনশীল বোর্ড প্রশ্ন",
    "isVerified": true,
    status: ContentStatus.PUBLISHED,
    "version": 1
  }
];
