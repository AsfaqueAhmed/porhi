import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter10QuestionsBatch2: QuestionData[] = [
  // -------------------------------------------------------------
  // Topic 10.4: মানব মস্তিষ্ক ও তার বিভিন্ন অংশ (MCQs 31-40)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_31",
    topicId: "top_ssc_biology_ch10_4",
    type: "MCQ",
    stem: "প্রাপ্তবয়স্ক একজন সুস্থ মানুষের মস্তিষ্কের স্বাভাবিক ওজন প্রায় কত?",
    options: [
      { id: "opt_bio_10_31_a", text: "প্রায় ৫০০ গ্রাম", isCorrect: false },
      { id: "opt_bio_10_31_b", text: "প্রায় ১.৩৬ কেজি (বা ১.৪০ কেজি)", isCorrect: true },
      { id: "opt_bio_10_31_c", text: "প্রায় ২.৫০ কেজি", isCorrect: false },
      { id: "opt_bio_10_31_d", text: "প্রায় ৩.০০ কেজি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: প্রায় ১.৩৬ কেজি (বা ১.৪০ কেজি)।",
      coreConcept: "প্রাপ্তবয়স্ক মানুষের মস্তিষ্কের ওজন প্রায় ১.৩৬ কেজি এবং আয়তন প্রায় ১৫০০ ঘন সেন্টিমিটার।",
      distractorAnalysis: {
        opt_bio_10_31_a: "৫০০ গ্রাম মানুষের মস্তিষ্কের ওজনের এক-তৃতীয়াংশের চেয়েও কম।",
        opt_bio_10_31_c: "২.৫০ কেজি মানবদেহের যকৃতের (লিভারের) চেয়েও ভারী, যা অস্বাভাবিক।",
        opt_bio_10_31_d: "৩.০০ কেজি কোনো স্বাভাবিক মানুষের মস্তিষ্কের ওজন হতে পারে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৪",
        pageNumber: 214
      },
      proTipShortcut: "মস্তিষ্কের ওজন মনে রাখো: ১.৩৬ কেজি।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_32",
    topicId: "top_ssc_biology_ch10_4",
    type: "MCQ",
    stem: "মানব মস্তিষ্ক ত্রিস্তরবিশিষ্ট যে বিশেষ পর্দা দ্বারা আবৃত ও সুরক্ষিত থাকে, তার নাম কী?",
    options: [
      { id: "opt_bio_10_32_a", text: "মেনিনজেস (Meninges)", isCorrect: true },
      { id: "opt_bio_10_32_b", text: "পেরিকার্ডিয়াম", isCorrect: false },
      { id: "opt_bio_10_32_c", text: "প্লুরা", isCorrect: false },
      { id: "opt_bio_10_32_d", text: "পেরিটোনিয়াম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: মেনিনজেস (Meninges)।",
      coreConcept: "মস্তিষ্ক ও সুষুম্নাকাণ্ড মেনিনজেস ঝিল্লি (ডুরা, অ্যারাকনয়েড ও পিয়া ম্যাটার) দিয়ে সুরক্ষিত থাকে।",
      distractorAnalysis: {
        opt_bio_10_32_b: "পেরিকার্ডিয়াম হলো হৃৎপিণ্ডের দ্বিস্তরবিশিষ্ট আবরণী পর্দা।",
        opt_bio_10_32_c: "প্লুরা হলো ফুসফুসের আবরণী পর্দা।",
        opt_bio_10_32_d: "পেরিটোনিয়াম হলো উদর গহ্বরের অভ্যন্তরীণ আবরণী।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৪",
        pageNumber: 214
      },
      proTipShortcut: "মস্তিষ্কের বডিগার্ড ঝিল্লি = মেনিনজেস।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_33",
    topicId: "top_ssc_biology_ch10_4",
    type: "MCQ",
    stem: "চিন্তা, বুদ্ধি, স্মৃতি, কল্পনা এবং মানুষের ঐচ্ছিক পেশির সঞ্চালনের প্রধান নিয়ন্ত্রণ কেন্দ্র কোনটি?",
    options: [
      { id: "opt_bio_10_33_a", text: "সেরিব্রাম বা গুরুমস্তিষ্ক (Cerebrum)", isCorrect: true },
      { id: "opt_bio_10_33_b", text: "সেরেবেলাম বা লঘুমস্তিষ্ক", isCorrect: false },
      { id: "opt_bio_10_33_c", text: "মেডুলা অবলংগাটা", isCorrect: false },
      { id: "opt_bio_10_33_d", text: "পনস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সেরিব্রাম বা গুরুমস্তিষ্ক (Cerebrum)।",
      coreConcept: "সেরিব্রাম মস্তিষ্কের সবচেয়ে বড় অংশ (৮০%) যা সকল উচ্চতর মানসিক ও সচেতন বুদ্ধিবৃত্তিক কাজ নিয়ন্ত্রণ করে।",
      distractorAnalysis: {
        opt_bio_10_33_b: "সেরেবেলাম কেবল পেশির ভারসাম্য ও হাঁটার সমন্বয় রাখে, চিন্তা করে না।",
        opt_bio_10_33_c: "মেডুলা অনৈচ্ছিক হার্টবিট ও শ্বাসক্রিয়া চালায়।",
        opt_bio_10_33_d: "পনস মধ্যমস্তিষ্ক ও মেডুলার যোজক সেতু।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৪",
        pageNumber: 215
      },
      proTipShortcut: "জ্ঞান, বুদ্ধি ও স্মৃতি = গুরুমস্তিষ্ক (Cerebrum)।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_34",
    topicId: "top_ssc_biology_ch10_4",
    type: "MCQ",
    stem: "সেরিব্রামের ডান ও বাম দুটি সেরিব্রাল হেমিস্ফিয়ার যে শক্ত স্নায়ুতন্তুগুচ্ছ দিয়ে পরস্পরের সাথে যুক্ত থাকে, তাকে কী বলে?",
    options: [
      { id: "opt_bio_10_34_a", text: "ভার্মিস (Vermis)", isCorrect: false },
      { id: "opt_bio_10_34_b", text: "কর্পাস ক্যালোসাম (Corpus callosum)", isCorrect: true },
      { id: "opt_bio_10_34_c", text: "মায়েলিন শিথ", isCorrect: false },
      { id: "opt_bio_10_34_d", text: "অ্যাক্সন হিলক", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কর্পাস ক্যালোসাম (Corpus callosum)।",
      coreConcept: "কর্পাস ক্যালোসাম হলো গুরুমস্তিষ্কের দুই গোলার্ধকে সংযুক্তকারী পুরু স্নায়ুতন্তুর যোজক ব্যান্ড।",
      distractorAnalysis: {
        opt_bio_10_34_a: "ভার্মিস হলো লঘুমস্তিষ্কের (সেরেবেলামের) দুই অংশকে যুক্তকারী যোজক।",
        opt_bio_10_34_c: "মায়েলিন শিথ একক অ্যাক্সনের চর্বি স্তর।",
        opt_bio_10_34_d: "অ্যাক্সন হিলক নিউরনের কোষদেহের প্রারম্ভিক অংশ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৪",
        pageNumber: 215
      },
      proTipShortcut: "সেরিব্রামের সেতু = কর্পাস ক্যালোসাম; সেরেবেলামের সেতু = ভার্মিস।"
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_35",
    topicId: "top_ssc_biology_ch10_4",
    type: "MCQ",
    stem: "ঘ্রাণ ব্যতীত সকল সংবেদী স্নায়ুর সংকেত গ্রহণ করে গুরুমস্তিষ্কে প্রেরক 'রিলে স্টেশন' (Relay Station) হিসেবে কাজ করে মস্তিষ্কের কোন অংশ?",
    options: [
      { id: "opt_bio_10_35_a", text: "থ্যালামাস (Thalamus)", isCorrect: true },
      { id: "opt_bio_10_35_b", text: "হাইপোথ্যালামাস", isCorrect: false },
      { id: "opt_bio_10_35_c", text: "সেরেবেলাম", isCorrect: false },
      { id: "opt_bio_10_35_d", text: "পনস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: থ্যালামাস (Thalamus)।",
      coreConcept: "থ্যালামাস স্পর্শ, চাপ, যন্ত্রণা ও তাপমাত্রার সংকেত সমন্বয় করে সেরিব্রামে পাঠায়, তাই এটি রিলে স্টেশন।",
      distractorAnalysis: {
        opt_bio_10_35_b: "হাইপোথ্যালামাস শরীরের তাপমাত্রা, ক্ষুধা, তৃষ্ণা নিয়ন্ত্রণ ও হরমোন সমন্বয় করে।",
        opt_bio_10_35_c: "সেরেবেলাম ভারসাম্য রক্ষা করে।",
        opt_bio_10_35_d: "পনস মধ্যমস্তিষ্ক ও মেডুলার সংযোগকারী।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৪",
        pageNumber: 216
      },
      proTipShortcut: "স্নায়ু সংকেতের ট্রাফিক পুলিশ / রিলে স্টেশন = থ্যালামাস।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_36",
    topicId: "top_ssc_biology_ch10_4",
    type: "MCQ",
    stem: "মানবদেহের অভ্যন্তরীণ তাপমাত্রা, ক্ষুধা, তৃষ্ণা, ঘুম এবং পিটুইটারি গ্রন্থির ক্ষরণ নিয়ন্ত্রণ করে মস্তিষ্কের কোন অঞ্চল?",
    options: [
      { id: "opt_bio_10_36_a", text: "হাইপোথ্যালামাস (Hypothalamus)", isCorrect: true },
      { id: "opt_bio_10_36_b", text: "থ্যালামাস", isCorrect: false },
      { id: "opt_bio_10_36_c", text: "মধ্যমস্তিষ্ক", isCorrect: false },
      { id: "opt_bio_10_36_d", text: "মেডুলা", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: হাইপোথ্যালামাস (Hypothalamus)।",
      coreConcept: "হাইপোথ্যালামাস দেহের থার্মোস্ট্যাট হিসেবে তাপমাত্রা ঠিক রাখে এবং পিটুইটারিকে নিয়ন্ত্রণ করে।",
      distractorAnalysis: {
        opt_bio_10_36_b: "থ্যালামাস সংবেদী সংকেত রিলে করে।",
        opt_bio_10_36_c: "মধ্যমস্তিষ্ক দর্শন ও শ্রবণ প্রতিবর্ত নিয়ন্ত্রণ করে।",
        opt_bio_10_36_d: "মেডুলা হূদস্পন্দন ও শ্বাসক্রিয়া পরিচালনা করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৪",
        pageNumber: 216
      },
      proTipShortcut: "তাপমাত্রা, ক্ষুধা, তৃষ্ণা = হাইপোথ্যালামাস।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_37",
    topicId: "top_ssc_biology_ch10_4",
    type: "MCQ",
    stem: "হাঁটা, দৌড়ানো, সাইকেল চালানো বা দাঁড়ানোর সময় মানুষের দেহের পেশির টান ও শারীরিক ভারসাম্য রক্ষা করে কোন অংশ?",
    options: [
      { id: "opt_bio_10_37_a", text: "সেরেবেলাম বা লঘুমস্তিষ্ক (Cerebellum)", isCorrect: true },
      { id: "opt_bio_10_37_b", text: "সেরিব্রাম বা গুরুমস্তিষ্ক", isCorrect: false },
      { id: "opt_bio_10_37_c", text: "মেডুলা অবলংগাটা", isCorrect: false },
      { id: "opt_bio_10_37_d", text: "থ্যালামাস", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সেরেবেলাম বা লঘুমস্তিষ্ক (Cerebellum)।",
      coreConcept: "সেরেবেলাম কঙ্কাল পেশির টানটান অবস্থা ও সংবেদনশীল ভারসাম্য সমন্বয় করে সোজা রাখে।",
      distractorAnalysis: {
        opt_bio_10_37_b: "সেরিব্রাম চলার ইচ্ছা তৈরি করে, কিন্তু সুষম ভারসাম্য নিয়ন্ত্রণ করে সেরেবেলাম।",
        opt_bio_10_37_c: "মেডুলা ফুসফুস ও হৃৎপিণ্ড চালায়।",
        opt_bio_10_37_d: "থ্যালামাস সংবেদী সংকেত পাঠায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৪",
        pageNumber: 217
      },
      proTipShortcut: "শরীরের ভারসাম্য ও ব্যালেন্স = সেরেবেলাম (Cerebellum)।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_38",
    topicId: "top_ssc_biology_ch10_4",
    type: "MCQ",
    stem: "মানবদেহের অনৈচ্ছিক অত্যাবশ্যকীয় ক্রিয়া যেমন হূদস্পন্দন, শ্বাসপ্রশ্বাস, রক্তচাপ, খাদ্য গিলন ও বমি নিয়ন্ত্রণ করে মস্তিষ্কের কোন অংশ?",
    options: [
      { id: "opt_bio_10_38_a", text: "মেডুলা অবলংগাটা বা সুষুম্না শীর্ষক", isCorrect: true },
      { id: "opt_bio_10_38_b", text: "সেরিব্রাম", isCorrect: false },
      { id: "opt_bio_10_38_c", text: "থ্যালামাস", isCorrect: false },
      { id: "opt_bio_10_38_d", text: "কর্পাস ক্যালোসাম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: মেডুলা অবলংগাটা বা সুষুম্না শীর্ষক।",
      coreConcept: "মেডুলা অবলংগাটা হলো মস্তিষ্কের বোঁটাসদৃশ অঞ্চল যা জীবনের মৌলিক কার্ডিও-রেসপিরেটরি ও ভেজিটেটিভ কাজ নিয়ন্ত্রণ করে।",
      distractorAnalysis: {
        opt_bio_10_38_b: "সেরিব্রাম ঐচ্ছিক চিন্তাশক্তি নিয়ন্ত্রণ করে।",
        opt_bio_10_38_c: "থ্যালামাস সংবেদী সংকেত রিলে করে।",
        opt_bio_10_38_d: "কর্পাস ক্যালোসাম মস্তিষ্কের দুই গোলার্ধকে যুক্ত করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৪",
        pageNumber: 217
      },
      proTipShortcut: "হৃদস্পন্দন ও শ্বাসক্রিয়া = মেডুলা অবলংগাটা (এতে আঘাত লাগলে মৃত্যু ঘটে)।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_39",
    topicId: "top_ssc_biology_ch10_4",
    type: "MCQ",
    stem: "মস্তিষ্ক ও সুষুম্নাকাণ্ডের মধ্যে গঠনগত ধূসর পদার্থ (Gray Matter) ও শ্বেত পদার্থের (White Matter) বিন্যাসের পার্থক্য কোনটি?",
    options: [
      { id: "opt_bio_10_39_a", text: "মস্তিষ্কে বাইরে গ্রে ম্যাটার ও ভেতরে হোয়াইট ম্যাটার; সুষুম্নাকাণ্ডে বাইরে হোয়াইট ও ভেতরে গ্রে ম্যাটার", isCorrect: true },
      { id: "opt_bio_10_39_b", text: "উভয় অঙ্গে বাইরে হোয়াইট ম্যাটার ও ভেতরে গ্রে ম্যাটার থাকে", isCorrect: false },
      { id: "opt_bio_10_39_c", text: "উভয় অঙ্গে বাইরে গ্রে ম্যাটার ও ভেতরে হোয়াইট ম্যাটার থাকে", isCorrect: false },
      { id: "opt_bio_10_39_d", text: "মস্তিষ্কে কেবল গ্রে ম্যাটার থাকে এবং সুষুম্নাকাণ্ডে কেবল হোয়াইট ম্যাটার থাকে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: মস্তিষ্কে বাইরে গ্রে ম্যাটার ও ভেতরে হোয়াইট ম্যাটার; সুষুম্নাকাণ্ডে বাইরে হোয়াইট ও ভেতরে গ্রে ম্যাটার।",
      coreConcept: "মস্তিষ্কের কর্টেক্সে কোষদেহ বাইরে থাকায় তা ধূসর, কিন্তু সুষুম্নাকাণ্ডে কোষদেহ ভেতরে H-আকৃতিতে সাজানো থাকে।",
      distractorAnalysis: {
        opt_bio_10_39_b: "মস্তিষ্কের পৃষ্ঠদেশ হোয়াইট নয়, গ্রে ম্যাটার।",
        opt_bio_10_39_c: "সুষুম্নাকাণ্ডের পৃষ্ঠদেশ গ্রে নয়, মায়েলিনযুক্ত তন্তুর কারণে সাদা।",
        opt_bio_10_39_d: "উভয় অঙ্গেই গ্রে ও হোয়াইট উভয় পদার্থই বিদ্যমান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৪",
        pageNumber: 218
      },
      proTipShortcut: "মস্তিষ্কে গ্রে বাইরে (Brain: Grey outside); সুষুম্নাকাণ্ডে গ্রে ভেতরে (Spine: Grey inside)।"
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_40",
    topicId: "top_ssc_biology_ch10_4",
    type: "MCQ",
    stem: "চোখের তারা বা পিউপিলের সংকোচন-প্রসারণ এবং অক্ষিগোলকের নড়াচড়ার মতো দৃষ্টি ও শ্রবণ প্রতিবর্ত নিয়ন্ত্রণ করে মস্তিষ্কের কোন অংশ?",
    options: [
      { id: "opt_bio_10_40_a", text: "মধ্যমস্তিষ্ক (Midbrain)", isCorrect: true },
      { id: "opt_bio_10_40_b", text: "সেরিব্রাম", isCorrect: false },
      { id: "opt_bio_10_40_c", text: "মেডুলা", isCorrect: false },
      { id: "opt_bio_10_40_d", text: "সুষুম্নাকাণ্ড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: মধ্যমস্তিষ্ক (Midbrain)।",
      coreConcept: "মধ্যমস্তিষ্কে দৃষ্টি ও শ্রবণ সংক্রান্ত সংকেত রিফ্লেক্স হিসেবে সমন্বিত হয়।",
      distractorAnalysis: {
        opt_bio_10_40_b: "সেরিব্রাম দর্শন অনুভূতি উপলব্ধি করে, কিন্তু দ্রুত পিউপিল প্রতিবর্ত মধ্যমস্তিষ্ক চালায়।",
        opt_bio_10_40_c: "মেডুলা অনৈচ্ছিক অভ্যন্তরীণ অঙ্গ নিয়ন্ত্রণ করে।",
        opt_bio_10_40_d: "সুষুম্নাকাণ্ড নিম্নাঙ্গের প্রতিবর্ত পরিচালনা করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৪",
        pageNumber: 216
      },
      proTipShortcut: "চোখ ও কানের দ্রুত প্রতিবর্ত = মধ্যমস্তিষ্ক।"
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------
  // Topic 10.4: CQs (Questions 41, 42)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_41",
    topicId: "top_ssc_biology_ch10_4",
    type: "CQ_CREATIVE",
    stem: "মহাসড়কে মোটরসাইকেল দুর্ঘটনায় হেলমেটবিহীন একজন চালকের মাথার পেছনের নিচের দিকে প্রচণ্ড আঘাত লাগল। হাসপাতালে নেওয়ার পর দেখা গেল তাঁর চেতনা অক্ষুণ্ণ রয়েছে এবং তিনি কথা বলতে পারছেন, কিন্তু উঠে দাঁড়াতে গেলে পা টলে পড়ে যাচ্ছেন এবং সোজা হয়ে হাঁটতে পারছেন না। চিকিৎসক সিটি স্ক্যান দেখে বললেন, “ভাগ্য ভালো যে তাঁর শ্বাস ও হৃদস্পন্দন কেন্দ্র অক্ষত আছে, কেবল শরীরের ভারসাম্য রক্ষার কেন্দ্রটি ক্ষতিগ্রস্ত হয়েছে।”",
    options: null,
    explanation: {
      directAnswer: "ভারসাম্য কেন্দ্রটি হলো সেরেবেলাম এবং অক্ষত কেন্দ্রটি হলো মেডুলা অবলংগাটা।",
      coreConcept: "সেরেবেলাম কঙ্কাল পেশির সমন্বয় ও ভারসাম্য নিয়ন্ত্রণ করে, আর মেডুলা প্রাণরক্ষাকারী অনৈচ্ছিক ক্রিয়া চালায়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৪",
        pageNumber: 217
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "মেনিনজেস পর্দা কী তা নির্ভুলভাবে লেখা।" },
      kha: { mark: 2, criteria: "মস্তিষ্কের সেরিব্রোস্পাইনাল ফ্লুইড (CSF)-এর দুটি প্রধান শারীরবৃত্তীয় কাজ ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের চালকটির সোজা হয়ে হাঁটতে না পারার শারীরবৃত্তীয় কারণ মস্তিষ্কের সংশ্লিষ্ট অংশের গঠন ও কাজের আলোকে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "“মেডুলা অবলংগাটা ক্ষতিগ্রস্ত হলে চালকটির তাৎক্ষণিক মৃত্যু ঘটত”—চিকিৎসকের এই বক্তব্যের সত্যতা যুক্তি সহকারে বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_42",
    topicId: "top_ssc_biology_ch10_4",
    type: "CQ_CREATIVE",
    stem: "মানব মস্তিষ্কের গঠন আলোচনা করতে গিয়ে শিক্ষক ব্ল্যাকবোর্ডে একটি মানব মস্তিষ্কের লম্বচ্ছেদের নকশা এঁকে তিনটি অংশ চিহ্নিত করলেন: 'X' হলো সবচেয়ে বড় ভাঁজযুক্ত অংশ যা ডান ও বাঁ দুটি গোলার্ধে বিভক্ত, 'Y' হলো সংবেদী স্নায়ুর প্রধান রিলে স্টেশন এবং 'Z' হলো মেরুদণ্ডের দিকে প্রসারিত বোঁটাসদৃশ অঞ্চল যা শ্বাসপ্রশ্বাস নিয়ন্ত্রণ করে।",
    options: null,
    explanation: {
      directAnswer: "X হলো সেরিব্রাম, Y হলো থ্যালামাস এবং Z হলো মেডুলা অবলংগাটা।",
      coreConcept: "মস্তিষ্কের বিভিন্ন অংশের গঠন ও স্বতন্ত্র শারীরবৃত্তীয় দায়িত্ব বিভাজন।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৪",
        pageNumber: 215
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "কর্পাস ক্যালোসাম কী তা এক বাক্যে লেখা।" },
      kha: { mark: 2, criteria: "মস্তিষ্ক ও সুষুম্নাকাণ্ডের মধ্যে ধূসর ও শ্বেত পদার্থের বিন্যাসের অমিল ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের 'X' অংশটির গঠন ও মানুষের বুদ্ধিবৃত্তিক জীবনে এর ভূমিকা বর্ণনা করা।" },
      gha: { mark: 4, criteria: "মানুষের দৈনন্দিন অস্তিত্ব রক্ষায় 'Y' ও 'Z' অংশ দুটির অপরিহার্যতা তুলনামূলক বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "ক্যাডেট কলেজ মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------
  // Topic 10.5: প্রতিবর্ত ক্রিয়া ও প্রতিবর্ত চাপ (MCQs 43-52)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_43",
    topicId: "top_ssc_biology_ch10_5",
    type: "MCQ",
    stem: "যেসব তাৎক্ষণিক অনৈচ্ছিক স্বয়ংক্রিয় প্রতিক্রিয়া মস্তিষ্কের পূর্বচিন্তা ছাড়াই সুষুম্নাকাণ্ড দ্বারা পরিচালিত হয়, তাকে কী বলে?",
    options: [
      { id: "opt_bio_10_43_a", text: "প্রতিবর্ত ক্রিয়া (Reflex Action)", isCorrect: true },
      { id: "opt_bio_10_43_b", text: "ঐচ্ছিক ক্রিয়া", isCorrect: false },
      { id: "opt_bio_10_43_c", text: "ফটোট্রপিক চলন", isCorrect: false },
      { id: "opt_bio_10_43_d", text: "হরমোন ফিডব্যাক", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রতিবর্ত ক্রিয়া (Reflex Action)।",
      coreConcept: "প্রতিবর্ত ক্রিয়া হলো আত্মরক্ষামূলক দ্রুত স্বয়ংক্রিয় প্রতিক্রিয়া যার প্রধান কেন্দ্র সুষুম্নাকাণ্ড।",
      distractorAnalysis: {
        opt_bio_10_43_b: "ঐচ্ছিক ক্রিয়া মস্তিষ্কের চিন্তা ও ইচ্ছানুযায়ী ধীরে সম্পন্ন হয়।",
        opt_bio_10_43_c: "ফটোট্রপিক চলন উদ্ভিদের আলোর দিকে বৃদ্ধি।",
        opt_bio_10_43_d: "হরমোন ফিডব্যাক রাসায়নিক বিপাকীয় নিয়ন্ত্রণ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৫",
        pageNumber: 219
      },
      proTipShortcut: "তাৎক্ষণিক অনৈচ্ছিক সুষুম্নাকাণ্ডের ক্রিয়া = প্রতিবর্ত ক্রিয়া।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_44",
    topicId: "top_ssc_biology_ch10_5",
    type: "MCQ",
    stem: "একটি আদর্শ প্রতিবর্ত চাপের (Reflex Arc) মৌলিক উপাদানের সংখ্যা কয়টি?",
    options: [
      { id: "opt_bio_10_44_a", text: "৩টি", isCorrect: false },
      { id: "opt_bio_10_44_b", text: "৫টি", isCorrect: true },
      { id: "opt_bio_10_44_c", text: "৭টি", isCorrect: false },
      { id: "opt_bio_10_44_d", text: "৯টি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ৫টি।",
      coreConcept: "প্রতিবর্ত চাপের ৫টি উপাদান: গ্রাহক, সংবেদী নিউরন, ইন্টারনিউরন (স্নায়ুকেন্দ্র), মোটর নিউরন এবং কারক অঙ্গ।",
      distractorAnalysis: {
        opt_bio_10_44_a: "৩টি নয়; কেবল সেন্সরি, সেন্ট্রাল ও মোটর ধরলে গ্রাহক ও কারক বাদ পড়ে যায়।",
        opt_bio_10_44_c: "৭টি উপাদান নয়।",
        opt_bio_10_44_d: "৯টি উপাদান নয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৫",
        pageNumber: 220
      },
      proTipShortcut: "প্রতিবর্ত চাপের ৫টি স্তম্ভ (গ-অ-সং-মো-কা)।"
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_45",
    topicId: "top_ssc_biology_ch10_5",
    type: "MCQ",
    stem: "প্রতিবর্ত চাপে গ্রাহক অঙ্গ থেকে সংবেদী স্নায়ু তাড়না সুষুম্নাকাণ্ডে বহন করে নিয়ে যায় কোন নিউরন?",
    options: [
      { id: "opt_bio_10_45_a", text: "অনুভূতিবাহী বা সংবেদী নিউরন (Sensory Neuron)", isCorrect: true },
      { id: "opt_bio_10_45_b", text: "আজ্ঞাবাহী নিউরন (Motor Neuron)", isCorrect: false },
      { id: "opt_bio_10_45_c", text: "কারক পেশি", isCorrect: false },
      { id: "opt_bio_10_45_d", text: "সোয়ান কোষ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অনুভূতিবাহী বা সংবেদী নিউরন (Sensory Neuron)।",
      coreConcept: "সংবেদী বা অ্যাফারেন্ট নিউরন গ্রাহক অঙ্গ থেকে কেন্দ্রীয় স্নায়ুতন্ত্রের দিকে উদ্দীপনা বহন করে।",
      distractorAnalysis: {
        opt_bio_10_45_b: "আজ্ঞাবাহী বা মোটর নিউরন কেন্দ্রীয় স্নায়ুতন্ত্র থেকে পেশিতে নির্দেশ নেয়।",
        opt_bio_10_45_c: "কারক পেশি নির্দেশ কার্যকর করে সংকুচিত হয়।",
        opt_bio_10_45_d: "সোয়ান কোষ মায়েলিন তৈরি করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৫",
        pageNumber: 220
      },
      proTipShortcut: "গ্রাহক থেকে সুষুম্নাকাণ্ডে আনে = সংবেদী নিউরন।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_46",
    topicId: "top_ssc_biology_ch10_5",
    type: "MCQ",
    stem: "প্রতিবর্ত ক্রিয়ায় সুষুম্নাকাণ্ডের নির্দেশ পেয়ে অঙ্গটিকে তাৎক্ষণিকভাবে বিপদ থেকে সরিয়ে আনে কোন অংশ?",
    options: [
      { id: "opt_bio_10_46_a", text: "কারক অঙ্গ (Effector - যেমন কঙ্কাল পেশি)", isCorrect: true },
      { id: "opt_bio_10_46_b", text: "গ্রাহক অঙ্গ (Receptor)", isCorrect: false },
      { id: "opt_bio_10_46_c", text: "সংবেদী নিউরন", isCorrect: false },
      { id: "opt_bio_10_46_d", text: "কর্পাস ক্যালোসাম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কারক অঙ্গ (Effector - যেমন কঙ্কাল পেশি)।",
      coreConcept: "মোটর নিউরনের সংকেত পেয়ে কারক অঙ্গ (সাধারণত পেশি বা গ্রন্থি) সংকুচিত হয়ে অঙ্গ প্রত্যাহার করে।",
      distractorAnalysis: {
        opt_bio_10_46_b: "গ্রাহক অঙ্গ উদ্দীপনা গ্রহণ করে মাত্র।",
        opt_bio_10_46_c: "সংবেদী নিউরন উদ্দীপনা বহন করে কেন্দ্রে নেয়।",
        opt_bio_10_46_d: "কর্পাস ক্যালোসাম মস্তিষ্কের যোজক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৫",
        pageNumber: 220
      },
      proTipShortcut: "কাজ সম্পাদন করে হাত সরায় = কারক পেশি (Effector)।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_47",
    topicId: "top_ssc_biology_ch10_5",
    type: "MCQ",
    stem: "আগুনে হাত লাগলে মানুষ হাত সরিয়ে নেওয়ার 'পরে' তীব্র যন্ত্রণা অনুভব করে কেন?",
    options: [
      { id: "opt_bio_10_47_a", text: "সুষুম্নাকাণ্ড তাৎক্ষণিক হাত সরায়, কিন্তু সংবেদী সংকেত মস্তিষ্কে পৌঁছাতে সামান্য বিলম্ব হয়", isCorrect: true },
      { id: "opt_bio_10_47_b", text: "মস্তিষ্ক প্রথম অবস্থায় সম্পূর্ণ ঘুমিয়ে থাকে বলে", isCorrect: false },
      { id: "opt_bio_10_47_c", text: "হাতে ব্যথা পাওয়ার মতো কোনো রিসেপ্টর থাকে না বলে", isCorrect: false },
      { id: "opt_bio_10_47_d", text: "মোটর নিউরন সংকেত বহন করে মস্তিষ্কে নিয়ে যায় বলে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: সুষুম্নাকাণ্ড তাৎক্ষণিক হাত সরায়, কিন্তু সংবেদী সংকেত মস্তিষ্কে পৌঁছাতে সামান্য বিলম্ব হয়।",
      coreConcept: "রিফ্লেক্স আর্ক সুষুম্নাকাণ্ডেই সম্পন্ন হয়, আর সমান্তরাল সংকেত মস্তিষ্কের কর্টেক্সে দেরিতে পৌঁছে ব্যথা তৈরি করে।",
      distractorAnalysis: {
        opt_bio_10_47_b: "জাগ্রত অবস্থায় মস্তিষ্ক ঘুমিয়ে থাকে না।",
        opt_bio_10_47_c: "ত্বকে প্রচুর পেইন রিসেপ্টর থাকে।",
        opt_bio_10_47_d: "মোটর নিউরন মস্তিষ্ক থেকে পেশির দিকে যায়, মস্তিষ্কে যায় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৫",
        pageNumber: 220
      },
      proTipShortcut: "আগে হাত সরে জীবন বাঁচে, পরে মস্তিষ্ক ব্যথা টের পায়।"
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_48",
    topicId: "top_ssc_biology_ch10_5",
    type: "MCQ",
    stem: "সংবেদী নিউরন সুষুম্নাকাণ্ডের কোন মূল (Root) দিয়ে ধূসর পদার্থে প্রবেশ করে?",
    options: [
      { id: "opt_bio_10_48_a", text: "পৃষ্ঠীয় মূল বা ডরসাল রুট (Dorsal root)", isCorrect: true },
      { id: "opt_bio_10_48_b", text: "সম্মুখ মূল বা ভেন্ট্রাল রুট (Ventral root)", isCorrect: false },
      { id: "opt_bio_10_48_c", text: "সেন্ট্রাল ক্যানাল দিয়ে", isCorrect: false },
      { id: "opt_bio_10_48_d", text: "মেনিনজেস পর্দা ভেদ না করে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পৃষ্ঠীয় মূল বা ডরসাল রুট (Dorsal root)।",
      coreConcept: "সংবেদী স্নায়ুতন্তু সর্বদা সুষুম্নাকাণ্ডের পৃষ্ঠীয় মূল (Dorsal root) দিয়ে প্রবেশ করে এবং মোটর তন্তু সম্মুখ মূল দিয়ে বের হয়।",
      distractorAnalysis: {
        opt_bio_10_48_b: "সম্মুখ বা ভেন্ট্রাল রুট দিয়ে মোটর নিউরন পেশির দিকে বের হয়।",
        opt_bio_10_48_c: "সেন্ট্রাল ক্যানাল হলো নালী যা CSF বহন করে।",
        opt_bio_10_48_d: "মেনিনজেস পর্দা সুষুম্নাকাণ্ডের উপর দিয়েই ঢাকা থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৫",
        pageNumber: 220
      },
      proTipShortcut: "Sensory = Dorsal (পৃষ্ঠীয়); Motor = Ventral (সম্মুখ)।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_49",
    topicId: "top_ssc_biology_ch10_5",
    type: "MCQ",
    stem: "প্রতিবর্ত চাপের কেন্দ্রে সংবেদী নিউরন এবং মোটর নিউরনের মধ্যে সমন্বয় সাধনকারী নিউরনটিকে কী বলে?",
    options: [
      { id: "opt_bio_10_49_a", text: "ইন্টারনিউরন বা সংযোগকারী নিউরন (Relay neuron)", isCorrect: true },
      { id: "opt_bio_10_49_b", text: "গ্রাহক নিউরন", isCorrect: false },
      { id: "opt_bio_10_49_c", text: "মায়েলিন কোষ", isCorrect: false },
      { id: "opt_bio_10_49_d", text: "সোয়ান নিউরন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ইন্টারনিউরন বা সংযোগকারী নিউরন (Relay neuron)।",
      coreConcept: "ইন্টারনিউরন সুষুম্নাকাণ্ডের ধূসর পদার্থে অবস্থান করে এবং সংবেদী সংকেত মোটর নিউরনে স্থানান্তর করে।",
      distractorAnalysis: {
        opt_bio_10_49_b: "গ্রাহক থাকে ত্বকে বা ইন্দ্রিয় অঙ্গে।",
        opt_bio_10_49_c: "মায়েলিন কোনো নিউরন নয়, চর্বিজাতীয় আবরণ।",
        opt_bio_10_49_d: "সোয়ান কোষ নিউরোগ্লিয়ার অংশ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৫",
        pageNumber: 220
      },
      proTipShortcut: "মাঝের ব্রিজ = ইন্টারনিউরন (Interneuron)।"
    },
    difficulty: "EASY",
    boardSource: "সিলেট বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_50",
    topicId: "top_ssc_biology_ch10_5",
    type: "MCQ",
    stem: "ডাক্তাররা রোগীর স্নায়ুতন্ত্রের সুস্থতা পরীক্ষার জন্য হাঁটুতে রবার হাতুড়ি দিয়ে আঘাত করে যে প্রতিক্রিয়া পর্যবেক্ষণ করেন, তাকে কী বলে?",
    options: [
      { id: "opt_bio_10_50_a", text: "হাঁটু ঝাঁকুনি প্রতিবর্ত (Knee-jerk Reflex)", isCorrect: true },
      { id: "opt_bio_10_50_b", text: "হেমোরেজিক স্ট্রোক", isCorrect: false },
      { id: "opt_bio_10_50_c", text: "পারকিনসন্স কম্পন", isCorrect: false },
      { id: "opt_bio_10_50_d", text: "এপিলেপ্টিক সিজার", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: হাঁটু ঝাঁকুনি প্রতিবর্ত (Knee-jerk Reflex)।",
      coreConcept: "হাঁটুর প্যাটেলায় টোকা দিলে কোয়াড্রিসেপস পেশি প্রসারিত হয়ে রিফ্লেক্স আর্ক সক্রিয় করে পা ছিটকে সামনে ছুড়ে দেয়।",
      distractorAnalysis: {
        opt_bio_10_50_b: "হেমোরেজিক স্ট্রোক মস্তিষ্কে রক্তক্ষরণ।",
        opt_bio_10_50_c: "পারকিনসন্স কম্পন বার্ধক্যের ক্ষয়জনিত রোগ।",
        opt_bio_10_50_d: "এপিলেপ্টিক সিজার মৃগীরোগের খিঁচুনি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৫",
        pageNumber: 219
      },
      proTipShortcut: "হাঁটুতে টোকা দিলে পা নড়ে = নি-জার্ক রিফ্লেক্স।"
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_51",
    topicId: "top_ssc_biology_ch10_5",
    type: "MCQ",
    stem: "চোখের সামনে হঠাৎ তীব্র ধূলিকণা বা তীব্র আলো পড়লে নিমেষে চোখের পাতা বন্ধ হয়ে যাওয়া কোন ধরনের প্রতিক্রিয়া?",
    options: [
      { id: "opt_bio_10_51_a", text: "প্রতিরক্ষামূলক প্রতিবর্ত ক্রিয়া (Protective Reflex)", isCorrect: true },
      { id: "opt_bio_10_51_b", text: "ঐচ্ছিক ক্রিয়া", isCorrect: false },
      { id: "opt_bio_10_51_c", text: "জ্ঞানীয় স্মৃতিচারণ", isCorrect: false },
      { id: "opt_bio_10_51_d", text: "হরমোন প্রতিক্রিয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: প্রতিরক্ষামূলক প্রতিবর্ত ক্রিয়া (Protective Reflex)।",
      coreConcept: "অক্ষিগোলক ও কর্নিয়াকে আঘাত থেকে রক্ষা করতে চোখের পাতা প্রতিবর্ত চাপে তাৎক্ষণিক বন্ধ হয়ে যায়।",
      distractorAnalysis: {
        opt_bio_10_51_b: "এটি চিন্তা করে বন্ধ করা হয় না, ফলে এটি অনৈচ্ছিক প্রতিবর্ত ক্রিয়া।",
        opt_bio_10_51_c: "এতে কোনো স্মৃতিচারণ জড়িত নয়।",
        opt_bio_10_51_d: "হরমোন ধীরগতির, চোখের পাতা বন্ধ হয় কয়েক মিলি-সেকেন্ডে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৫",
        pageNumber: 219
      },
      proTipShortcut: "চোখের পলক ফেলা = কর্নিয়াল রিফ্লেক্স।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_52",
    topicId: "top_ssc_biology_ch10_5",
    type: "MCQ",
    stem: "যদি কোনো ব্যক্তির সুষুম্নাকাণ্ডের ভেন্ট্রাল রুট (সম্মুখ মূল) সম্পূর্ণ কেটে যায়, তবে তার ক্ষেত্রে কী ঘটবে?",
    options: [
      { id: "opt_bio_10_52_a", text: "অনুভূতি থাকবে কিন্তু পেশি নাড়িয়ে অঙ্গ সরাতে পারবে না", isCorrect: true },
      { id: "opt_bio_10_52_b", text: "ব্যথা অনুভব করবে না কিন্তু পেশি স্বাভাবিক কাজ করবে", isCorrect: false },
      { id: "opt_bio_10_52_c", text: "অনুভূতি ও সঞ্চালন উভয়ই অক্ষত থাকবে", isCorrect: false },
      { id: "opt_bio_10_52_d", text: "মস্তিষ্ক অবিলম্বে কাজ করা বন্ধ করে দেবে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অনুভূতি থাকবে কিন্তু পেশি নাড়িয়ে অঙ্গ সরাতে পারবে না।",
      coreConcept: "ভেন্ট্রাল রুট মোটর নিউরন বহন করে; এটি নষ্ট হলে সংবেদন অক্ষত থাকলেও মোটর চালনা নষ্ট হয়ে প্যারালাইসিস হয়।",
      distractorAnalysis: {
        opt_bio_10_52_b: "ব্যথা অনুভব বন্ধ হয় ডরসাল রুট ক্ষতিগ্রস্ত হলে।",
        opt_bio_10_52_c: "ভেন্ট্রাল রুট কেটে গেলে মোটর ক্রিয়া অক্ষত থাকা অসম্ভব।",
        opt_bio_10_52_d: "সুষুম্নাকাণ্ডের মূল কাটলে মস্তিষ্কের সব কাজ বন্ধ হয় না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৫",
        pageNumber: 220
      },
      proTipShortcut: "মোটর নষ্ট = নড়াচড়া বন্ধ; সেন্সরি নষ্ট = অনুভূতি বন্ধ।"
    },
    difficulty: "HARD",
    boardSource: "রাজশাহী বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------
  // Topic 10.5: CQs (Questions 53, 54)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_53",
    topicId: "top_ssc_biology_ch10_5",
    type: "CQ_CREATIVE",
    stem: "রান্নাঘরে কাজের সময় অসাবধানতাবশত তিশার হাত একটি ফুটন্ত গরম লোহার কড়াইতে স্পর্শ করল। এক পলকে তিশা হাতটি ঝটকা দিয়ে সরিয়ে নিল। তবে হাত সরানোর ঠিক কয়েক সেকেন্ড পর সে পুড়ে যাওয়ার তীব্র জ্বালাপোড়া ও যন্ত্রণা অনুভব করল এবং কেঁদে উঠল।",
    options: null,
    explanation: {
      directAnswer: "এটি প্রতিরক্ষামূলক প্রতিবর্ত ক্রিয়া যা সুষুম্নাকাণ্ড দ্বারা পরিচালিত।",
      coreConcept: "প্রতিবর্ত চাপে পেশি তাৎক্ষণিক হাত সরিয়ে অঙ্গহানি বাঁচায় এবং পরে মস্তিষ্কে সংকেত গিয়ে ব্যথা তৈরি করে।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৫",
        pageNumber: 219
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "প্রতিবর্ত ক্রিয়া কাকে বলে তা লেখা।" },
      kha: { mark: 2, criteria: "প্রতিবর্ত চাপের পাঁচটি মৌলিক উপাদানের নাম ক্রমানুসারে উল্লেখ করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের আলোকে তিশার হাত তাৎক্ষণিক কড়াই থেকে সরে যাওয়ার স্নায়বিক সঞ্চালন পথ ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "“হাত আগে সরে যায় কিন্তু ব্যথা পরে অনুভূত হয়”—শারীরবৃত্তীয় কার্যকৌশলের আলোকে উক্তিটি বিশ্লেষণ করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_54",
    topicId: "top_ssc_biology_ch10_5",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান ক্লাসে শিক্ষক প্রতিবর্ত চাপের একটি প্রবাহচিত্র বোর্ডে এঁকে দেখালেন: [উদ্দীপক: পেরেক] → [অংশ ১] → [অংশ ২] → [সুষুম্নাকাণ্ড] → [অংশ ৩] → [অংশ ৪: পেশি সংকোচন ও পা উত্তোলন]। তিনি শিক্ষার্থীদের বললেন, “এই প্রতিবর্ত চাপের কোনো একটি উপাদান নিষ্ক্রিয় হলে মানবদেহের স্বাভাবিক আত্মরক্ষা ব্যবস্থা ভেঙে পড়ে।”",
    options: null,
    explanation: {
      directAnswer: "অংশ ১: ত্বক/গ্রাহক, অংশ ২: সেন্সরি নিউরন, অংশ ৩: মোটর নিউরন, অংশ ৪: কারক পেশি।",
      coreConcept: "প্রতিবর্ত চাপের ধারাবাহিকতা এবং স্বয়ংক্রিয় অঙ্গ সুরক্ষায় এর ভূমিকা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৫",
        pageNumber: 220
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "কারক অঙ্গ (Effector) কী তা এক বাক্যে লেখা।" },
      kha: { mark: 2, criteria: "হাঁটু ঝাঁকুনি বা নি-জার্ক পরীক্ষার উদ্দেশ্য ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের প্রবাহচিত্রের 'অংশ ১', 'অংশ ২' এবং 'অংশ ৩'-এর সুনির্দিষ্ট গঠনগত ও শারীরবৃত্তীয় দায়িত্ব বর্ণনা করা।" },
      gha: { mark: 4, criteria: "যদি উদ্দীপকের 'অংশ ২' অকেজো হয়ে যায় তবে মানবদেহে কী প্রতিক্রিয়া ঘটবে তা যুক্তি সহ মূল্যায়ন করা।" }
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------
  // Topic 10.6: মানব অন্তঃক্ষরা গ্রন্থি ও হরমোনসমূহ (Part 1: MCQs 55-58)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_55",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "মানবদেহের কোন অন্তঃক্ষরা গ্রন্থিকে 'মাস্টার গ্ল্যান্ড' বা 'প্রভু গ্রন্থি' বলা হয়?",
    options: [
      { id: "opt_bio_10_55_a", text: "পিটুইটারি গ্রন্থি (Pituitary Gland)", isCorrect: true },
      { id: "opt_bio_10_55_b", text: "থাইরয়েড গ্রন্থি", isCorrect: false },
      { id: "opt_bio_10_55_c", text: "অ্যাড্রেনাল গ্রন্থি", isCorrect: false },
      { id: "opt_bio_10_55_d", text: "অগ্ন্যাশয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: পিটুইটারি গ্রন্থি (Pituitary Gland)।",
      coreConcept: "পিটুইটারি গ্রন্থি সর্বাধিক সংখ্যক হরমোন নিঃসরণ করে এবং থাইরয়েড, অ্যাড্রেনাল ও গোনাডের কাজ নিয়ন্ত্রণ করে বলে একে প্রভু গ্রন্থি বলে।",
      distractorAnalysis: {
        opt_bio_10_55_b: "থাইরয়েড বিপাক নিয়ন্ত্রণ করে, অন্যান্য গ্রন্থি নিয়ন্ত্রণ করে না।",
        opt_bio_10_55_c: "অ্যাড্রেনাল সংকটকালীন হরমোন ক্ষরণ করে।",
        opt_bio_10_55_d: "অগ্ন্যাশয় একটি মিশ্র গ্রন্থি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 222
      },
      proTipShortcut: "প্রভু গ্রন্থি / মাস্টার গ্ল্যান্ড = পিটুইটারি।"
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_56",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "শৈশবে পিটুইটারি গ্রন্থি থেকে গ্রোথ হরমোন (GH) অতিমাত্রায় নিঃসৃত হলে কোন শারীরিক অসংগতি সৃষ্টি হয়?",
    options: [
      { id: "opt_bio_10_56_a", text: "অতিকায়ত্ব (Gigantism)", isCorrect: true },
      { id: "opt_bio_10_56_b", text: "বামনত্ব (Dwarfism)", isCorrect: false },
      { id: "opt_bio_10_56_c", text: "ক্রেটিনিজম", isCorrect: false },
      { id: "opt_bio_10_56_d", text: "গলগণ্ড", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অতিকায়ত্ব (Gigantism)।",
      coreConcept: "শৈশবে অস্থি বৃদ্ধির সময় গ্রোথ হরমোন বেশি ক্ষরিত হলে শরীর ৭-৮ ফুট পর্যন্ত অস্বাভাবিক লম্বা হয়ে যায় (জায়গান্টিজম)।",
      distractorAnalysis: {
        opt_bio_10_56_b: "গ্রোথ হরমোন কম ক্ষরিত হলে বামনত্ব (Dwarfism) ঘটে।",
        opt_bio_10_56_c: "ক্রেটিনিজম থাইরক্সিনের অভাবে শিশুদের ঘটে।",
        opt_bio_10_56_d: "গলগণ্ড খাবারে আয়োডিনের অভাবে থাইরয়েড গ্রন্থির বৃদ্ধি।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 222
      },
      proTipShortcut: "GH বেশি = জায়গান্টিজম (অতিকায়ত্ব); GH কম = বামনত্ব।"
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_57",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "দেহের মৌলিক বিপাকীয় হার (BMR) নিয়ন্ত্রণকারী থাইরক্সিন হরমোন সংশ্লেষণের জন্য নিচের কোন উপাদানটি অপরিহার্য?",
    options: [
      { id: "opt_bio_10_57_a", text: "আয়োডিন (Iodine)", isCorrect: true },
      { id: "opt_bio_10_57_b", text: "আয়রন (লৌহ)", isCorrect: false },
      { id: "opt_bio_10_57_c", text: "ক্যালসিয়াম", isCorrect: false },
      { id: "opt_bio_10_57_d", text: "জিঙ্ক", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: আয়োডিন (Iodine)।",
      coreConcept: "থাইরয়েড গ্রন্থি রক্ত থেকে আয়োডিন গ্রহণ করে ট্রাই-আয়োডোথাইরোনিন ($T_3$) ও থাইরক্সিন ($T_4$) তৈরি করে।",
      distractorAnalysis: {
        opt_bio_10_57_b: "আয়রন রক্তের হিমোগ্লোবিন তৈরির মূল খনিজ।",
        opt_bio_10_57_c: "ক্যালসিয়াম অস্থি গঠন ও পেশি সংকোচনের খনিজ।",
        opt_bio_10_57_d: "জিঙ্ক এনজাইম সক্রিয়তায় কাজ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 223
      },
      proTipShortcut: "থাইরক্সিন = আয়োডিনযুক্ত হরমোন।"
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_58",
    topicId: "top_ssc_biology_ch10_6",
    type: "MCQ",
    stem: "শিশুদের শৈশবে থাইরয়েড গ্রন্থির থাইরক্সিন হরমোনের মারাত্মক ঘাটতি হলে বুদ্ধিপ্রতিবন্ধিতা ও খর্বাকৃতির যে রোগ হয়, তার নাম কী?",
    options: [
      { id: "opt_bio_10_58_a", text: "ক্রেটিনিজম (Cretinism)", isCorrect: true },
      { id: "opt_bio_10_58_b", text: "ডায়াবেটিস মেলিটাস", isCorrect: false },
      { id: "opt_bio_10_58_c", text: "টিটেনি (Tetany)", isCorrect: false },
      { id: "opt_bio_10_58_d", text: "অ্যাক্রোমেগালি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ক্রেটিনিজম (Cretinism)।",
      coreConcept: "থাইরক্সিন মস্তিষ্কের বিকাশ ও স্নায়ুকোষের বৃদ্ধি ঘটায়; শৈশবে এর অভাবে জড়বুদ্ধিতা ও বামনত্বযুক্ত ক্রেটিনিজম হয়।",
      distractorAnalysis: {
        opt_bio_10_58_b: "ডায়াবেটিস ইনসুলিনের ঘাটতিতে হয়।",
        opt_bio_10_58_c: "টিটেনি প্যারাথরমোনের অভাবে রক্তে ক্যালসিয়াম কমে পেশির খিঁচুনি।",
        opt_bio_10_58_d: "অ্যাক্রোমেগালি প্রাপ্তবয়স্কদের অতিরিক্ত GH ক্ষরণে হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 223
      },
      proTipShortcut: "শিশুদের থাইরক্সিনের অভাব = ক্রেটিনিজম (Cretinism)।"
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // -------------------------------------------------------------
  // Topic 10.6: CQs (Questions 59, 60)
  // -------------------------------------------------------------
  {
    id: "q_bio_10_59",
    topicId: "top_ssc_biology_ch10_6",
    type: "CQ_CREATIVE",
    stem: "হাসপাতালের এন্ডোক্রাইনোলজি বিভাগে একজন ১৫ বছর বয়সী কিশোরকে নিয়ে আসা হলো যার শারীরিক বৃদ্ধি থেমে গিয়ে ৪ বছরের শিশুর মতো খাটো রয়ে গেছে। অপরদিকে একজন ৪০ বছর বয়সী নারীর গলার নিচের অংশ অস্বাভাবিক স্ফীত হয়ে ঝুলে পড়েছে। চিকিৎসক পরীক্ষা করে বললেন, “প্রথম রোগীর সমস্যাটি মস্তিষ্কের নিচের একটি মাস্টার গ্ল্যান্ডের ত্রুটি এবং দ্বিতীয় রোগীর সমস্যাটি একটি বিপাকীয় গ্রন্থিতে প্রয়োজনীয় খনিজের ঘাটতিজনিত কারণে হয়েছে।”",
    options: null,
    explanation: {
      directAnswer: "প্রথম রোগী পিটুইটারির গ্রোথ হরমোনের অভাবে বামনত্বে এবং দ্বিতীয় রোগী থাইরয়েডে আয়োডিনের অভাবে গলগণ্ডে ভুগছেন।",
      coreConcept: "পিটুইটারি ও থাইরয়েড গ্রন্থির হরমোন নিঃসরণ এবং শারীরিক বিকাশ ও বিপাকের উপর এদের প্রভাব।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 222
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "অন্তঃক্ষরা বা অনাল গ্রন্থি কাকে বলে তা লেখা।" },
      kha: { mark: 2, criteria: "পিটুইটারি গ্রন্থিকে কেন প্রভু গ্রন্থি বলা হয় তা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের কিশোরটির খর্বাকৃতির পেছনে দায়ী গ্রন্থি ও হরমোনের শারীরবৃত্তীয় ভূমিকা বিশ্লেষণ করা।" },
      gha: { mark: 4, criteria: "উদ্দীপকের নারীটির রোগ প্রতিরোধে আয়োডিনযুক্ত লবণের জৈবিক গুরুত্ব মূল্যায়ন করা।" }
    },
    difficulty: "MEDIUM",
    boardSource: "সৃজনশীল বোর্ড মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: "q_bio_10_60",
    topicId: "top_ssc_biology_ch10_6",
    type: "CQ_CREATIVE",
    stem: "বিজ্ঞান প্রদর্শনীর সেমিনারে একজন পুষ্টিবিদ বললেন, “আমাদের দেহের রক্তে ক্যালসিয়াম ও ফসফরাসের সূক্ষ্ম ভারসাম্য রক্ষা এবং মৌল বিপাকীয় হার (BMR) ঠিক রাখা অত্যন্ত জরুরি। গলার শ্বাসনালীর সামনে ও পেছনে অবস্থিত দুটি ভিন্ন অন্তঃক্ষরা গ্রন্থি পরস্পরের সাথে সমন্বয় করে আমাদের পেশি, হাড় ও বিপাকীয় স্বাস্থ্য সুদৃঢ় রাখে।”",
    options: null,
    explanation: {
      directAnswer: "গ্রন্থি দুটি হলো থাইরয়েড (থাইরক্সিন ও ক্যালসিটোনিন) এবং প্যারাথাইরয়েড (প্যারাথরমোন)।",
      coreConcept: "থাইরয়েড ও প্যারাথাইরয়েড গ্রন্থির হরমোনীয় কার্যক্রম এবং রক্তে ক্যালসিয়াম আয়ন নিয়ন্ত্রণ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "দশম অধ্যায়: সমন্বয় · ১০.৬",
        pageNumber: 223
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "প্যারাথরমোন কোন গ্রন্থি থেকে নিঃসৃত হয় তা লেখা।" },
      kha: { mark: 2, criteria: "শিশুদের ক্রেটিনিজম রোগের প্রধান দুটি লক্ষণ উল্লেখ করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের আলোচিত গ্রন্থি দুটি কীভাবে রক্তে ক্যালসিয়ামের ভারসাম্য বজায় রাখে তা বর্ণনা করা।" },
      gha: { mark: 4, criteria: "মানবদেহের স্বাভাবিক শারীরিক ও মানসিক বিকাশে থাইরক্সিন হরমোনের বহুমুখী তাৎপর্য বিশ্লেষণ করা।" }
    },
    difficulty: "HARD",
    boardSource: "ক্যাডেট কলেজ মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  }
];
