import { ContentStatus } from '@prisma/client';
import type { QuestionData } from './seed-chapter-7-questions';

export const biologyChapter4QuestionsBatch3: QuestionData[] = [
  // -------------------------------------------------------------------------
  // Topic 4.1: জীবনীশক্তি ও ATP-র ভূমিকা (q_bio_4_61 to 66)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_61",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "ATP অণুর প্রতিটি ফসফেট মূলকের সাথে অন্য ফসফেট মূলক কোন ধরনের বন্ধন দ্বারা যুক্ত থাকে?",
    options: [
      { id: "opt_bio_4_61_a", text: "পেপটাইড বন্ধন", isCorrect: false },
      { id: "opt_bio_4_61_b", text: "উচ্চশক্তিসম্পন্ন ফসফোঅ্যানহাইড্রাইড বন্ধন", isCorrect: true },
      { id: "opt_bio_4_61_c", text: "গ্লাইকোসিডিক বন্ধন", isCorrect: false },
      { id: "opt_bio_4_61_d", text: "আয়নিক বন্ধন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: উচ্চশক্তিসম্পন্ন ফসফোঅ্যানহাইড্রাইড বন্ধন।",
      coreConcept: "ফসফেট মূলকগুলোর মধ্যকার অ্যানহাইড্রাইড বন্ধন (Phosphoanhydride bond) প্রচুর শক্তি ধারণ করে, যা ভাঙলে প্রায় ৭.৩ kcal শক্তি বিমুক্ত হয়।",
      distractorAnalysis: {
        opt_bio_4_61_a: "পেপটাইড বন্ধন অ্যামাইনো এসিডের মধ্যে প্রোটিনে থাকে।",
        opt_bio_4_61_c: "গ্লাইকোসিডিক বন্ধন শর্করার মনোস্যাকারাইড যুক্ত করে।",
        opt_bio_4_61_d: "আয়নিক বন্ধন অজৈব লবণে থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 65
      }
    },
    difficulty: "HARD",
    boardSource: "ক্যাডেট কলেজ মডেল ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_62",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "একটি সজীব কোষে শক্তি সঞ্চয়ের সময় কোন রূপান্তরটি সঠিক?",
    options: [
      { id: "opt_bio_4_62_a", text: "$ATP + H_2O \rightarrow ADP + P_i$", isCorrect: false },
      { id: "opt_bio_4_62_b", text: "$ADP + P_i + \text{শক্তি} \rightarrow ATP$", isCorrect: true },
      { id: "opt_bio_4_62_c", text: "$AMP \rightarrow \text{এডিনিন} + \text{রাইবোজ}$", isCorrect: false },
      { id: "opt_bio_4_62_d", text: "$ATP \rightarrow AMP + \text{শক্তি}$", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ADP + Pi + শক্তি → ATP।",
      coreConcept: "শক্তি সঞ্চয় মানে ফসফোরাইলেশন—খাদ্য জারণ বা সূর্যালোকের শক্তি ব্যবহার করে ADP-এর সাথে ফসফেট জুড়ে ATP তৈরি হওয়া।",
      distractorAnalysis: {
        opt_bio_4_62_a: "এটি শক্তি খরচের (ডিফসফোরাইলেশন) বিক্রিয়া।",
        opt_bio_4_62_c: "এটি নিউক্লিওসাইড ভাঙন।",
        opt_bio_4_62_d: "এটি অস্বাভাবিক সরাসরি ভাঙন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 65
      }
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_63",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "জীবদেহের স্নায়বিক উদ্দীপনা পরিবহন এবং বৃক্কে সক্রিয় আয়ন শোষণে কোন রাসায়নিক শক্তি সরাসরি ব্যবহৃত হয়?",
    options: [
      { id: "opt_bio_4_63_a", text: "গ্লুকোজের স্থৈতিক শক্তি", isCorrect: false },
      { id: "opt_bio_4_63_b", text: "ATP অণুর ফসফেট ভাঙার শক্তি", isCorrect: true },
      { id: "opt_bio_4_63_c", text: "সূর্যের আলোক শক্তি", isCorrect: false },
      { id: "opt_bio_4_63_d", text: "লিপিডের শক্তি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ATP অণুর ফসফেট ভাঙার শক্তি।",
      coreConcept: "কোষের সোডিয়াম-পটাশিয়াম পাম্প এবং সক্রিয় পরিবহন সরাসরি ATP-র আর্দ্রবিশ্লেষণ থেকে শক্তি গ্রহণ করে।",
      distractorAnalysis: {
        opt_bio_4_63_a: "গ্লুকোজ সরাসরি পাম্পে ব্যবহৃত হয় না, প্রথমে ATP তৈরি করতে হয়।",
        opt_bio_4_63_c: "সূর্যের আলো প্রাণিকোষে সরাসরি ব্যবহার অযোগ্য।",
        opt_bio_4_63_d: "লিপিড সঞ্চিত রূপ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 66
      }
    },
    difficulty: "MEDIUM",
    boardSource: "ঢাকা বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_64",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "কোন উক্তিটি ATP সম্পর্কে সম্পূর্ণ সত্য?",
    options: [
      { id: "opt_bio_4_64_a", text: "ATP কেবল উদ্ভিদ কোষে তৈরি হয়, প্রাণিদেহে নয়", isCorrect: false },
      { id: "opt_bio_4_64_b", text: "ATP একটি নিউক্লিওসাইড ট্রাইফসফেট যৌগ যা সকল সজীব কোষে শক্তির সঞ্চয়ক ও বাহক", isCorrect: true },
      { id: "opt_bio_4_64_c", text: "ATP ভেঙে গেলে কখনো পুনরায় তৈরি হতে পারে না", isCorrect: false },
      { id: "opt_bio_4_64_d", text: "ATP তৈরি হতে কোনো বহিঃস্থ শক্তির প্রয়োজন হয় না", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ATP একটি নিউক্লিওসাইড ট্রাইফসফেট যৌগ যা সকল সজীব কোষে শক্তির সঞ্চয়ক ও বাহক।",
      coreConcept: "উদ্ভিদ ও প্রাণী উভয় জীবকোষেই ATP তৈরি ও খরচ হয় সার্বজনীন শক্তি মুদ্রা হিসেবে।",
      distractorAnalysis: {
        opt_bio_4_64_a: "প্রাণিকোষের মাইটোকন্ড্রিয়াতেও বিপুল ATP উৎপন্ন হয়।",
        opt_bio_4_64_c: "ADP থেকে অনবরত ATP রিচার্জ হয়।",
        opt_bio_4_64_d: "ফসফোরাইলেশনে শক্তি আবশ্যক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 65
      }
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_65",
    topicId: "top_ssc_biology_ch4_1",
    type: "MCQ",
    stem: "জীবকোষে খাদ্য জারণের মাধ্যমে শক্তি মুক্ত হওয়া কোন বিক্রিয়া পরিবারের অন্তর্ভুক্ত?",
    options: [
      { id: "opt_bio_4_65_a", text: "তাপহারী ও সংশ্লেষণমূলক", isCorrect: false },
      { id: "opt_bio_4_65_b", text: "জারণ-বিজারণ (Redox) ও তাপোৎপাদী", isCorrect: true },
      { id: "opt_bio_4_65_c", text: "আলোক সংযোজন", isCorrect: false },
      { id: "opt_bio_4_65_d", text: "পলিমার গঠন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: জারণ-বিজারণ (Redox) ও তাপোৎপাদী।",
      coreConcept: "খাদ্য জারণে গ্লুকোজ জারিত হয়ে কার্বন ডাই-অক্সাইড তৈরি করে এবং অক্সিজেন বিজারিত হয়ে পানি তৈরি করে; একই সাথে শক্তি নির্গত হয়।",
      distractorAnalysis: {
        opt_bio_4_65_a: "তাপহারী হলো সালোকসংশ্লেষণ।",
        opt_bio_4_65_c: "আলোক সংযোজন কেবল উদ্ভিদের সালোকসংশ্লেষণে ঘটে।",
        opt_bio_4_65_d: "শ্বসন জটিল অণুকে ভাঙে, পলিমার গড়ে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 64
      }
    },
    difficulty: "HARD",
    boardSource: "দিনাজপুর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_66",
    topicId: "top_ssc_biology_ch4_1",
    type: "CQ_CREATIVE",
    stem: "ল্যাবে দুটি দ্রবণ প্রস্তুত করা হলো। দ্রবণ A-তে আছে এডিনিন ও রাইবোজ সুগার। দ্রবণ B-তে দ্রবণ A-এর সাথে ফসফোরিক এসিড যোগ করে বিশেষ এনজাইমের উপস্থিতিতে শক্তি প্রয়োগ করা হলো। ফলে ট্রাইফসফেট সমৃদ্ধ এক বিশেষ রাসায়নিক যৌগ তৈরি হলো যা পেশির সংকোচনে প্রয়োগ করলে দ্রুত পেশি কেঁপে ওঠে।",
    options: null,
    explanation: {
      directAnswer: "দ্রবণ A নির্দেশ করছে এডিনোসিন এবং দ্রবণ B নির্দেশ করছে ATP।",
      coreConcept: "এডিনিন ও রাইবোজ থেকে এডিনোসিন এবং ফসফোরাইলেশনের মাধ্যমে ATP সৃষ্টি ও পেশি সংকোচনে এর মেকানিক্যাল ব্যবহার।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.১",
        pageNumber: 65
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "ATP অণুতে নাইট্রোজেনাস বেস কোনটি তা লেখা।" },
      kha: { mark: 2, criteria: "এডিনোসিন ও এটিপি-র মধ্যে মূল পার্থক্য বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের দ্রবণ B-তে ঘটে যাওয়া ফসফোরাইলেশন প্রক্রিয়াটি সমীকরণসহ উপস্থাপন করা।" },
      gha: { mark: 4, criteria: "পেশি সংকোচন ও মানবদেহের সক্রিয় পরিবহনে দ্রবণ B-এর যৌগের অপরিহার্যতা যুক্তিসহ বিশ্লেষণ করো।" }
    },
    difficulty: "HARD",
    boardSource: "কুমিল্লা বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // Topic 4.2: সালোকসংশ্লেষণ — দুই পর্যায় (q_bio_4_67 to 72)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_67",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "সালোকসংশ্লেষণ বিক্রিয়াটি প্রকৃতপক্ষে কোন ধরনের রাসায়নিক প্রক্রিয়া?",
    options: [
      { id: "opt_bio_4_67_a", text: "শুধুমাত্র একটি প্রতিস্থাপন বিক্রিয়া", isCorrect: false },
      { id: "opt_bio_4_67_b", text: "একটি জারণ-বিজারণ (Redox) প্রক্রিয়া", isCorrect: true },
      { id: "opt_bio_4_67_c", text: "একটি দহন বিক্রিয়া", isCorrect: false },
      { id: "opt_bio_4_67_d", text: "একটি অপচিতিমূলক ক্ষয়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: একটি জারণ-বিজারণ (Redox) প্রক্রিয়া।",
      coreConcept: "সালোকসংশ্লেষণে পানি ($H_2O$) জারিত হয়ে অক্সিজেন ($O_2$) তৈরি করে এবং কার্বন ডাই-অক্সাইড ($CO_2$) বিজারিত হয়ে গ্লুকোজ তৈরি করে।",
      distractorAnalysis: {
        opt_bio_4_67_a: "এটি সরল প্রতিস্থাপন নয়, জটিল বহুস্তরীয় রেডক্স।",
        opt_bio_4_67_c: "দহনে আলো ও তাপ নির্গত হয়ে শক্তি হারায়।",
        opt_bio_4_67_d: "সালোকসংশ্লেষণ উপচিতিমূলক (Anabolic)।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 67
      }
    },
    difficulty: "HARD",
    boardSource: "বরিশাল বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_68",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "সালোকসংশ্লেষণের আলোক পর্যায়ে উৎপন্ন ইলেকট্রন ($e^-$) কোন যৌগকে বিজারিত করে?",
    options: [
      { id: "opt_bio_4_68_a", text: "গ্লুকোজকে", isCorrect: false },
      { id: "opt_bio_4_68_b", text: "$NADP^+$ কে", isCorrect: true },
      { id: "opt_bio_4_68_c", text: "পানিকে", isCorrect: false },
      { id: "opt_bio_4_68_d", text: "অক্সিজেনকে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: NADP⁺ কে।",
      coreConcept: "পানি থেকে বিমুক্ত ইলেকট্রন ও প্রোটন গ্রহণ করে NADP⁺ বিজারিত হয়ে উচ্চশক্তির NADPH + H⁺ তৈরি করে।",
      distractorAnalysis: {
        opt_bio_4_68_a: "গ্লুকোজ অন্ধকার পর্যায়ে উৎপন্ন হয়।",
        opt_bio_4_68_c: "পানি জারিত হয়ে ইলেকট্রন দান করে।",
        opt_bio_4_68_d: "অক্সিজেন ইলেকট্রন ত্যাগ করার পর গ্যাস হিসেবে বের হয়ে যায়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 69
      }
    },
    difficulty: "MEDIUM",
    boardSource: "চট্টগ্রাম বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_69",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "সালোকসংশ্লেষণের সামগ্রিক বিক্রিয়ায় উপজাত (By-product) হিসেবে কোন দুটি পদার্থ উৎপন্ন হয়?",
    options: [
      { id: "opt_bio_4_69_a", text: "কার্বন ডাই-অক্সাইড ও আলো", isCorrect: false },
      { id: "opt_bio_4_69_b", text: "পানি ($H_2O$) এবং অক্সিজেন ($O_2$)", isCorrect: true },
      { id: "opt_bio_4_69_c", text: "ল্যাকটিক এসিড ও নাইট্রোজেন", isCorrect: false },
      { id: "opt_bio_4_69_d", text: "মিথেন ও হাইড্রোজেন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: পানি (H₂O) এবং অক্সিজেন (O₂)।",
      coreConcept: "সমীকরণ অনুযায়ী প্রধান উৎপাদ গ্লুকোজ ($C_6H_{12}O_6$) এবং উপজাত হিসেবে ৬ অণু পানি ও ৬ অণু অক্সিজেন উৎপন্ন হয়।",
      distractorAnalysis: {
        opt_bio_4_69_a: "CO₂ হলো বিক্রিয়ক কাঁচামাল।",
        opt_bio_4_69_c: "ল্যাকটিক এসিড অবাত শ্বসনে হয়।",
        opt_bio_4_69_d: "মিথেন ও হাইড্রোজেন জৈব গ্যাসে থাকে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 67
      }
    },
    difficulty: "EASY",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_70",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "পাতার কোন টিস্যুর কোষে সর্বাধিক পরিমাণ ক্লোরোপ্লাস্ট অবস্থান করায় সালোকসংশ্লেষণ সবচেয়ে বেশি হয়?",
    options: [
      { id: "opt_bio_4_70_a", text: "উর্ধ্বত্বক", isCorrect: false },
      { id: "opt_bio_4_70_b", text: "মেসোফিল টিস্যু (Mesophyll tissue)", isCorrect: true },
      { id: "opt_bio_4_70_c", text: "জাইলেম ভেসেল", isCorrect: false },
      { id: "opt_bio_4_70_d", text: "ফ্লোয়েম সিভনল", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মেসোফিল টিস্যু (Mesophyll tissue)।",
      coreConcept: "পাতার উর্ধ্বত্বক ও নিম্নত্বকের মধ্যবর্তী মেসোফিল প্যারেনকাইমায় প্রচুর ক্লোরোপ্লাস্ট থাকায় এটি সালোকসংশ্লেষণের মূল কেন্দ্র।",
      distractorAnalysis: {
        opt_bio_4_70_a: "ত্বকীয় কোষে সাধারণত ক্লোরোপ্লাস্ট থাকে না (রক্ষীকোষ ছাড়া)।",
        opt_bio_4_70_c: "জাইলেম ভেসেল মৃত পরিবহন নালী।",
        opt_bio_4_70_d: "সিভনল খাদ্য পরিবহন করে, তৈরি করে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 67
      }
    },
    difficulty: "EASY",
    boardSource: "দিনাজপুর বোর্ড ২০২০",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_71",
    topicId: "top_ssc_biology_ch4_2",
    type: "MCQ",
    stem: "আলোক নির্ভর পর্যায়ে ক্লোরোফিল কর্তৃক আলোক শক্তি শোষণের সঠিক ক্রম কোনটি?",
    options: [
      { id: "opt_bio_4_71_a", text: "ফোটন শোষণ → ক্লোরোফিল সক্রিয়করণ → ইলেকট্রন নির্গমন → ফটোফসফোরাইলেশন", isCorrect: true },
      { id: "opt_bio_4_71_b", text: "ফটোফসফোরাইলেশন → ফোটন শোষণ → গ্লুকোজ তৈরি", isCorrect: false },
      { id: "opt_bio_4_71_c", text: "অক্সিজেন শোষণ → ক্লোরোফিল উত্তেজিত → পানি তৈরি", isCorrect: false },
      { id: "opt_bio_4_71_d", text: "ক্যালভিন চক্র → ফটোলাইসিস → ফোটন শোষণ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ফোটন শোষণ → ক্লোরোফিল সক্রিয়করণ → ইলেকট্রন নির্গমন → ফটোফসফোরাইলেশন।",
      coreConcept: "ক্লোরোফিল ফোটন কণা শোষণ করে উত্তেজিত হয়, উচ্চশক্তির ইলেকট্রন বিমুক্ত করে এবং ইলেকট্রন প্রবাহের মাধ্যমে ATP উৎপন্ন করে।",
      distractorAnalysis: {
        opt_bio_4_71_b: "ফোটন শোষণ ছাড়া ফটোফসফোরাইলেশন শুরু হতে পারে না।",
        opt_bio_4_71_c: "সালোকসংশ্লেষণে অক্সিজেন শোষিত হয় না বরং নির্গত হয়।",
        opt_bio_4_71_d: "ক্যালভিন চক্র সবার শেষে ঘটে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 68
      }
    },
    difficulty: "HARD",
    boardSource: "রাজশাহী বোর্ড ২০১৯",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_72",
    topicId: "top_ssc_biology_ch4_2",
    type: "CQ_CREATIVE",
    stem: "একটি সতেজ টবের গাছকে ২৪ ঘণ্টা সম্পূর্ণ অন্ধকার ঘরে রাখা হলো (গাছ M)। এরপর তার একটি পাতার মাঝামাঝি অংশে কালো কাগজ ক্লিপ দিয়ে আটকে দিয়ে গাছটিকে ৬ ঘণ্টা উজ্জ্বল সূর্যালোকিত স্থানে রাখা হলো। পাতাটি ছিঁড়ে অ্যালকোহলে ফুটিয়ে ক্লোরোফিল মুক্ত করার পর আয়োডিন দ্রবণে ডোবানো হলো। দেখা গেল কালো কাগজের অংশের রঙ বাদামি রয়ে গেছে, কিন্তু অনাবৃত অংশ গাড় নীল-কালো বর্ণ ধারণ করেছে।",
    options: null,
    explanation: {
      directAnswer: "পরীক্ষাটি প্রমাণ করে সালোকসংশ্লেষণে শর্করা তৈরির জন্য আলো অপরিহার্য।",
      coreConcept: "আলোর উপস্থিতিতে শ্বেতসার বা স্টার্চ তৈরি হয়ে আয়োডিনের সাথে গাঢ় নীল বর্ণ দেখায়; অন্ধকারে শ্বেতসার তৈরি না হওয়ায় আয়োডিন বিক্রিয়া দেয় না।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.২",
        pageNumber: 74
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "সালোকসংশ্লেষণের সাধারণ সমীকরণটি নির্ভুল লেখা।" },
      kha: { mark: 2, criteria: "পরীক্ষার শুরুতে গাছটিকে ২৪ ঘণ্টা সম্পূর্ণ অন্ধকারে রাখার বৈজ্ঞানিক কারণ বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের পাতার অনাবৃত অংশে কেন আয়োডিন দ্রবণ নীল বর্ণ দেখাল তা শ্বেতসার সংশ্লেষণের আলোকে ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "যদি পৃথিবীতে সূর্যালোক পৌঁছানো স্থায়ীভাবে বন্ধ হয়ে যায়, তবে সমগ্র জীবজগতে কী বিপর্যয় ঘটবে তা মূল্যায়ন করো।" }
    },
    difficulty: "HARD",
    boardSource: "ময়মনসিংহ বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // Topic 4.3: C3 ও C4 গতিপথ এবং প্রভাবকসমূহ (q_bio_4_73 to 78)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_73",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "ক্যালভিন চক্র বা $C_3$ গতিপথ আবিষ্কারের জন্য মেলভিন ক্যালভিন কত সালে নোবেল পুরস্কার লাভ করেন?",
    options: [
      { id: "opt_bio_4_73_a", text: "১৯৫৩ সালে", isCorrect: false },
      { id: "opt_bio_4_73_b", text: "১৯৬১ সালে", isCorrect: true },
      { id: "opt_bio_4_73_c", text: "১৯৬৬ সালে", isCorrect: false },
      { id: "opt_bio_4_73_d", text: "১৯৬৯ সালে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ১৯৬১ সালে।",
      coreConcept: "মেলভিন ক্যালভিন তেজস্ক্রিয় কার্বন আইসোটোপ ($^{14}C$) ব্যবহার করে ক্লোরেল্লা শৈবালে কার্বন বিজারণ চক্র আবিষ্কার করে ১৯৬১ সালে নোবেল পুরস্কার পান।",
      distractorAnalysis: {
        opt_bio_4_73_a: "১৯৫৩ সালে হ্যান্স ক্রেবস ক্রেবস চক্রের জন্য নোবেল পান।",
        opt_bio_4_73_c: "১৯৬৬ সালে হ্যাচ ও স্ল্যাক C₄ চক্র আবিষ্কার করেন।",
        opt_bio_4_73_d: "১৯৬৯ সালে লোয়ি ও সিকেভিজ কোষের আধুনিক সংজ্ঞা দেন।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 70
      }
    },
    difficulty: "MEDIUM",
    boardSource: "সিলেট বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_74",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "বায়ুমণ্ডলে কার্বন ডাই-অক্সাইডের স্বাভাবিক ঘনত্ব কত?",
    options: [
      { id: "opt_bio_4_74_a", text: "০.০৩% – ০.০৪%", isCorrect: true },
      { id: "opt_bio_4_74_b", text: "০.৩% – ০.৪%", isCorrect: false },
      { id: "opt_bio_4_74_c", text: "১.০% – ২.০%", isCorrect: false },
      { id: "opt_bio_4_74_d", text: "২০.৯%", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: ০.০৩% – ০.০৪%।",
      coreConcept: "বায়ুতে CO₂-এর পরিমাণ মাত্র ০.০৩% থেকে ০.০৪% (প্রায় ৩০০-৪০০ ppm), যা উদ্ভিদের কাম্য মাত্রার (১%) চেয়ে অনেক কম।",
      distractorAnalysis: {
        opt_bio_4_74_b: "০.৩% হলো পানিতে দ্রবীভূত CO₂-এর পরিমাণ।",
        opt_bio_4_74_c: "১.০% উদ্ভিদের জন্য সর্বোচ্চ অনুকূল মাত্রা।",
        opt_bio_4_74_d: "২০.৯% হলো বায়ুর অক্সিজেন মাত্রা।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 72
      }
    },
    difficulty: "EASY",
    boardSource: "যশোর বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_75",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "নিচের কোন তরঙ্গদৈর্ঘ্যের আলোতে ক্লোরোফিল কর্তৃক আলোক শোষণ ও সালোকসংশ্লেষণের হার সর্বোচ্চ হয়?",
    options: [
      { id: "opt_bio_4_75_a", text: "৫০০ nm থেকে ৫৫০ nm (সবুজ আলো)", isCorrect: false },
      { id: "opt_bio_4_75_b", text: "৪০০ nm থেকে ৪৮০ nm এবং ৬৮০ nm (নীল ও লাল আলো)", isCorrect: true },
      { id: "opt_bio_4_75_c", text: "৭৫০ nm থেকে ৮৫০ nm (অবলোহিত আলো)", isCorrect: false },
      { id: "opt_bio_4_75_d", text: "২০০ nm থেকে ৩০০ nm (অতিবেগুনি আলো)", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ৪০০ nm থেকে ৪৮০ nm এবং ৬৮০ nm (নীল ও লাল আলো)।",
      coreConcept: "দৃশ্যমান বর্ণালির নীল (৪০০-৪৮০ nm) ও লাল (৬৮০ nm) আলোতে সালোকসংশ্লেষণের কার্যবর্ণালি (Action spectrum) সর্বোচ্চ চূড়া প্রদর্শন করে।",
      distractorAnalysis: {
        opt_bio_4_75_a: "সবুজ আলো প্রায় শোষিতই হয় না।",
        opt_bio_4_75_c: "অবলোহিত আলো দৃশ্যমান নয়।",
        opt_bio_4_75_d: "অতিবেগুনি আলো কোষের ক্ষতি করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 72
      }
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_76",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "পাতার কোষে প্রস্তুতকৃত শর্করা যদি দ্রুত ফ্লোয়েম দিয়ে পরিবাহিত না হয়ে পাতায় জমা হতে থাকে, তবে সালোকসংশ্লেষণের হারের কী পরিবর্তন ঘটে?",
    options: [
      { id: "opt_bio_4_76_a", text: "সালোকসংশ্লেষণের হার দ্রুত বৃদ্ধি পায়", isCorrect: false },
      { id: "opt_bio_4_76_b", text: "সালোকসংশ্লেষণের হার কমে যায়", isCorrect: true },
      { id: "opt_bio_4_76_c", text: "হারের কোনো পরিবর্তন হয় না", isCorrect: false },
      { id: "opt_bio_4_76_d", text: "উদ্ভিদ তাৎক্ষণিকভাবে মরে যায়", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: সালোকসংশ্লেষণের হার কমে যায়।",
      coreConcept: "অভ্যন্তরীণ প্রভাবক হিসেবে শর্করার আধিক্য ফিডব্যাক ইনহিবিশনের মাধ্যমে সালোকসংশ্লেষণের উৎসেচকগুলোকে শ্লথ করে দেয়, ফলে হার হ্রাস পায়।",
      distractorAnalysis: {
        opt_bio_4_76_a: "উৎপাদ জমা হলে বিক্রিয়া শ্লথ হয়, বাড়ে না।",
        opt_bio_4_76_c: "উৎপাদের ঘনত্বের প্রভাব অনস্বীকার্য।",
        opt_bio_4_76_d: "তাৎক্ষণিক মৃত্যু ঘটে না।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 73
      }
    },
    difficulty: "MEDIUM",
    boardSource: "দিনাজপুর বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_77",
    topicId: "top_ssc_biology_ch4_3",
    type: "MCQ",
    stem: "সবুজ উদ্ভিদের সালোকসংশ্লেষণ বন্ধ হয়ে গেলে বায়ুমণ্ডলে কোন গ্যাসটির মারাত্মক বৃদ্ধি ঘটবে?",
    options: [
      { id: "opt_bio_4_77_a", text: "অক্সিজেন", isCorrect: false },
      { id: "opt_bio_4_77_b", text: "কার্বন ডাই-অক্সাইড", isCorrect: true },
      { id: "opt_bio_4_77_c", text: "হিলিয়াম", isCorrect: false },
      { id: "opt_bio_4_77_d", text: "ওজোন", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: কার্বন ডাই-অক্সাইড।",
      coreConcept: "জীবের শ্বসন ও জীবাশ্ম জ্বালানি দহনে উৎপন্ন বিপুল CO₂ শোষণ করার একমাত্র প্রাকৃতিক মাধ্যম হলো সালোকসংশ্লেষণ। এটি বন্ধ হলে গ্রিনহাউস গ্যাস CO₂ দ্রুত বেড়ে যাবে।",
      distractorAnalysis: {
        opt_bio_4_77_a: "অক্সিজেনের মাত্রা আশঙ্কাজনকভাবে কমে যাবে।",
        opt_bio_4_77_c: "হিলিয়াম নিষ্ক্রিয় গ্যাস।",
        opt_bio_4_77_d: "অক্সিজেন না থাকলে ওজোনস্তরও ধ্বংস হবে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 73
      }
    },
    difficulty: "EASY",
    boardSource: "বরিশাল বোর্ড ২০১৯",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_78",
    topicId: "top_ssc_biology_ch4_3",
    type: "CQ_CREATIVE",
    stem: "একটি কাচের ফানেলের ভেতর সতেজ হাইড্রিলা রেখে বিকারে পানি দেওয়া হলো। ফানেলের মুখে একটি টেস্টটিউব উল্টো করে রাখা হলো। টেস্টটিউবে বুদবুদ জমতে থাকায় পানি নিচে নেমে এল। দ্রবণটিতে সামান্য সোডিয়াম বাইকার্বনেট ($NaHCO_3$) যোগ করায় বুদবুদের সংখ্যা প্রতি মিনিটে ৩০ থেকে বেড়ে ৬০টিতে পৌঁছাল।",
    options: null,
    explanation: {
      directAnswer: "হাইড্রিলা উদ্ভিদের সালোকসংশ্লেষণে অক্সিজেন নির্গমনের পরীক্ষা এবং CO₂ বৃদ্ধিতে হারের ত্বরণ নির্দেশিত হয়েছে।",
      coreConcept: "সোডিয়াম বাইকার্বনেট পানিতে দ্রবীভূত হয়ে CO₂ গ্যাসের সরবরাহ বাড়িয়ে দেয়, যা সালোকসংশ্লেষণের গতি দ্বিগুণ করে দেয়।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৩",
        pageNumber: 75
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "হাইড্রিলা উদ্ভিদের সালোকসংশ্লেষণ পরীক্ষায় ফানেলের নলের মুখ পানিতে ডুবিয়ে রাখার কারণ কী তা লেখা।" },
      kha: { mark: 2, criteria: "পানিতে সোডিয়াম বাইকার্বনেট ($NaHCO_3$) যোগ করলে বুদবুদ বাড়ার বৈজ্ঞানিক কারণ বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "টেস্টটিউবে সঞ্চিত গ্যাসটি যে অক্সিজেন তা পরীক্ষার মাধ্যমে কীভাবে নিশ্চিত হওয়া যায় ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "যদি বিকারটিকে একটি বরফ শীতল পানিতে (৫° সে.) স্থানান্তর করা হয় তবে বুদবুদের সংখ্যার ওপর কী পরিবর্তন ঘটবে তা প্রভাবকের আলোকে মূল্যায়ন করো।" }
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // Topic 4.4: শ্বসন — প্রকারভেদ ও অবাত শ্বসন (q_bio_4_79 to 84)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_79",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "অবাত শ্বসনের ল্যাকটিক এসিড সন্ধান প্রক্রিয়ায় নিচের কোন গ্যাসটি আদৌ উৎপন্ন হয় না?",
    options: [
      { id: "opt_bio_4_79_a", text: "কার্বন ডাই-অক্সাইড ($CO_2$)", isCorrect: true },
      { id: "opt_bio_4_79_b", text: "ল্যাকটিক এসিড", isCorrect: false },
      { id: "opt_bio_4_79_c", text: "ATP", isCorrect: false },
      { id: "opt_bio_4_79_d", text: "তাপশক্তি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: কার্বন ডাই-অক্সাইড (CO₂)।",
      coreConcept: "ল্যাকটিক এসিড গাঁজনে গ্লুকোজ (৬ কার্বন) সরাসরি দুই অণু ল্যাকটিক এসিডে (৩ কার্বন) বিজারিত হয়; কোনো কার্বন বিমুক্ত হয় না বিধায় এখানে কোনো CO₂ তৈরি হয় না।",
      distractorAnalysis: {
        opt_bio_4_79_b: "ল্যাকটিক এসিড মূল উৎপাদ।",
        opt_bio_4_79_c: "২ অণু ATP উৎপন্ন হয়।",
        opt_bio_4_79_d: "তাপশক্তি সামান্য নির্গত হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 80
      }
    },
    difficulty: "HARD",
    boardSource: "ক্যাডেট কলেজ মডেল ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_80",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "সবাত শ্বসনে ১ অণু গ্লুকোজ জারিত হলে কত কিলোক্যালরি (kcal) শক্তি বিমুক্ত হয়?",
    options: [
      { id: "opt_bio_4_80_a", text: "৫০ kcal", isCorrect: false },
      { id: "opt_bio_4_80_b", text: "১৮০ kcal", isCorrect: false },
      { id: "opt_bio_4_80_c", text: "৬৮৬ kcal", isCorrect: true },
      { id: "opt_bio_4_80_d", text: "১২৫০ kcal", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর গ: ৬৮৬ kcal।",
      coreConcept: "সবাত শ্বসনে ৩৮টি ATP উৎপাদনের মাধ্যমে মোট প্রায় ৬৮৬ কিলোক্যালরি (বা ২৮৭২ কিলোজুল) শক্তি বিমুক্ত হয়।",
      distractorAnalysis: {
        opt_bio_4_80_a: "৫০ kcal অবাত শ্বসনে উৎপন্ন হয়।",
        opt_bio_4_80_b: "১৮০ kcal ভুল মান।",
        opt_bio_4_80_d: "১২৫০ kcal ভুল মান।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 76
      }
    },
    difficulty: "EASY",
    boardSource: "কুমিল্লা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_81",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "ফল বা শর্করার দ্রবণ থেকে ভিনেগার (অ্যাসিটিক এসিড) তৈরিতে কোন ব্যাকটেরিয়া ভূমিকা রাখে?",
    options: [
      { id: "opt_bio_4_81_a", text: "অ্যাসিটোব্যাকটার (Acetobacter)", isCorrect: true },
      { id: "opt_bio_4_81_b", text: "ল্যাকটোব্যাসিলাস", isCorrect: false },
      { id: "opt_bio_4_81_c", text: "ই কোলাই", isCorrect: false },
      { id: "opt_bio_4_81_d", text: "রাইজোবিয়াম", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অ্যাসিটোব্যাকটার (Acetobacter)।",
      coreConcept: "ইস্ট দ্বারা তৈরি অ্যালকোহলকে অ্যাসিটোব্যাকটার ব্যাকটেরিয়া জারিত করে এসিটিক এসিড বা ভিনেগারে পরিণত করে।",
      distractorAnalysis: {
        opt_bio_4_81_b: "ল্যাকটোব্যাসিলাস দই তৈরি করে।",
        opt_bio_4_81_c: "ই কোলাই মানব অন্ত্রে থাকে।",
        opt_bio_4_81_d: "রাইজোবিয়াম নাইট্রোজেন সংবন্ধন করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 81
      }
    },
    difficulty: "MEDIUM",
    boardSource: "যশোর বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_82",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "চা ও তামাক প্রক্রিয়াজাতকরণ বা কিউরিং (Curing)-এ জীবাণুর কোন জৈবনিক প্রক্রিয়াটি ব্যবহৃত হয়?",
    options: [
      { id: "opt_bio_4_82_a", text: "অবাত সন্ধান ও গ্লাইকোলাইসিস", isCorrect: true },
      { id: "opt_bio_4_82_b", text: "সালোকসংশ্লেষণ", isCorrect: false },
      { id: "opt_bio_4_82_c", text: "প্রস্বেদন", isCorrect: false },
      { id: "opt_bio_4_82_d", text: "অভিস্রবণ", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: অবাত সন্ধান ও গ্লাইকোলাইসিস।",
      coreConcept: "চা ও তামাক পাতায় বিশেষ সুগন্ধ ও স্বাদ আনয়নের জন্য ব্যাকটেরিয়ার নিয়ন্ত্রিত সন্ধান ঘটানো হয়।",
      distractorAnalysis: {
        opt_bio_4_82_b: "মৃত পাতায় সালোকসংশ্লেষণ হয় না।",
        opt_bio_4_82_c: "প্রস্বেদন সজীব উদ্ভিদের পানির বাষ্পমোচন।",
        opt_bio_4_82_d: "অভিস্রবণ পানির ব্যাপন রূপ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 81
      }
    },
    difficulty: "MEDIUM",
    boardSource: "রাজশাহী বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_83",
    topicId: "top_ssc_biology_ch4_4",
    type: "MCQ",
    stem: "অবাত শ্বসনে পাইরুভিক এসিড সম্পূর্ণ জারিত না হওয়ার মূল বৈজ্ঞানিক কারণ কী?",
    options: [
      { id: "opt_bio_4_83_a", text: "কোষে গ্লুকোজের ঘাটতি থাকা", isCorrect: false },
      { id: "opt_bio_4_83_b", text: "মুক্ত অক্সিজেনের অনুপস্থিতি এবং ইলেকট্রন গ্রাহক হিসেবে অক্সিজেনের অভাব", isCorrect: true },
      { id: "opt_bio_4_83_c", text: "কোষের তাপমাত্রা অত্যন্ত কম থাকা", isCorrect: false },
      { id: "opt_bio_4_83_d", text: "কোষপ্রাচীর অতি পুরু হওয়া", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: মুক্ত অক্সিজেনের অনুপস্থিতি এবং ইলেকট্রন গ্রাহক হিসেবে অক্সিজেনের অভাব।",
      coreConcept: "অক্সিজেন না থাকলে ইলেকট্রন পরিবহন তন্ত্র চলতে পারে না এবং ক্রেবস চক্রের এনজাইমগুলো সক্রিয় হতে পারে না।",
      distractorAnalysis: {
        opt_bio_4_83_a: "গ্লুকোজ উপস্থিত থাকে।",
        opt_bio_4_83_c: "তাপমাত্রা স্বাভাবিক থাকলেও অবাত শ্বসন ঘটে।",
        opt_bio_4_83_d: "কোষপ্রাচীরের সাথে এর সম্পর্ক নেই।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 80
      }
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_84",
    topicId: "top_ssc_biology_ch4_4",
    type: "CQ_CREATIVE",
    stem: "একটি পাত্রে চিনির দ্রবণ ও ইস্ট মিশিয়ে নল দিয়ে একটি চুনের পানির টেস্টটিউবের সাথে যুক্ত করা হলো। কিছুক্ষণ পর দেখা গেল দ্রবণ থেকে গ্যাস নির্গত হয়ে চুনের পানিকে ঘোলা করল। একই সময়ে অপর একটি টেস্টটিউবে দুধ রেখে তাতে এক চামচ টক দই মেশানো হলো এবং কয়েক ঘণ্টা পর পুরো দুধ দইয়ে রূপান্তরিত হলো কিন্তু কোনো গ্যাস বের হলো না।",
    options: null,
    explanation: {
      directAnswer: "প্রথম পরীক্ষাটি ইস্টের অ্যালকোহলিক গাঁজন (CO₂ নির্গমন) এবং দ্বিতীয়টি ল্যাকটোব্যাসিলাসের ল্যাকটিক এসিড গাঁজন (গ্যাস নির্গমনহীন)।",
      coreConcept: "অবাত শ্বসনের দুই প্রধান রূপভেদের রাসায়নিক সমীকরণ এবং উৎপাদ পার্থক্যের তুলনামূলক আলোচনা।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৪",
        pageNumber: 80
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "চুনের পানি ঘোলাকারী গ্যাসটির নাম কী তা লেখা।" },
      kha: { mark: 2, criteria: "দ্বিতীয় পরীক্ষায় কোনো গ্যাস নির্গত না হওয়ার কারণ সমীকরণসহ বুঝিয়ে লেখা।" },
      ga: { mark: 3, criteria: "প্রথম পরীক্ষার রাসায়নিক বিক্রিয়াটি সমীকরণসহ ব্যাখ্যা করা।" },
      gha: { mark: 4, criteria: "খাদ্য ও পানীয় শিল্পে উদ্দীপকের উভয় প্রক্রিয়ার ব্যবহারিক প্রয়োজনীয়তা বিশ্লেষণ করো।" }
    },
    difficulty: "HARD",
    boardSource: "চট্টগ্রাম বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },

  // -------------------------------------------------------------------------
  // Topic 4.5: সবাত শ্বসনের ধাপসমূহ ও শক্তির হিসাব (q_bio_4_85 to 90)
  // -------------------------------------------------------------------------
  {
    id: "q_bio_4_85",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "গ্লাইকোলাইসিস পর্যায়টি আবিষ্কারক তিন বিজ্ঞানীর নামের আদ্যক্ষর অনুসারে কোন পথ নামে পরিচিত?",
    options: [
      { id: "opt_bio_4_85_a", text: "EMP পাথওয়ে (Embden-Meyerhof-Parnas pathway)", isCorrect: true },
      { id: "opt_bio_4_85_b", text: "TCA সাইকেল", isCorrect: false },
      { id: "opt_bio_4_85_c", text: "হিল বিক্রিয়া", isCorrect: false },
      { id: "opt_bio_4_85_d", text: "রুবিস্কো পাথওয়ে", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর ক: EMP পাথওয়ে (Embden-Meyerhof-Parnas pathway)।",
      coreConcept: "জার্মান বিজ্ঞানী গুস্তাভ এমবডেন, অটো মেয়ারহফ এবং জ্যাকুব পারনাস ১৯৩০-এর দশকে গ্লাইকোলাইসিসের পূর্ণ ধাপ আবিষ্কার করেন।",
      distractorAnalysis: {
        opt_bio_4_85_b: "TCA সাইকেল হলো ক্রেবস চক্র।",
        opt_bio_4_85_c: "হিল বিক্রিয়া হলো পানির ফটোলাইসিস।",
        opt_bio_4_85_d: "রুবিস্কো এনজাইম C₃ চক্রে কাজ করে।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 77
      }
    },
    difficulty: "HARD",
    boardSource: "ঢাকা বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_86",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "সবাত শ্বসনে অ্যাসিটাইল কো-এ সৃষ্টি ধাপে মোট কয় অণু $NADH + H^+$ উৎপন্ন হয়?",
    options: [
      { id: "opt_bio_4_86_a", text: "১ অণু", isCorrect: false },
      { id: "opt_bio_4_86_b", text: "২ অণু", isCorrect: true },
      { id: "opt_bio_4_86_c", text: "৪ অণু", isCorrect: false },
      { id: "opt_bio_4_86_d", text: "৬ অণু", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ২ অণু।",
      coreConcept: "গ্লাইকোলাইসিসে তৈরি ২ অণু পাইরুভিক এসিড জারিত হয়ে ২ অণু অ্যাসিটাইল কো-এ তৈরি করে এবং একই সাথে ২ অণু NADH + H⁺ উৎপন্ন হয়।",
      distractorAnalysis: {
        opt_bio_4_86_a: "১ অণু হলো ১ পাইরুভিক এসিডের ক্ষেত্রে।",
        opt_bio_4_86_c: "৪ অণু ভুল মান।",
        opt_bio_4_86_d: "৬ অণু ক্রেবস চক্রে তৈরি হয়।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 78
      }
    },
    difficulty: "EASY",
    boardSource: "রাজশাহী বোর্ড ২০২৩",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_87",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "সবাত শ্বসনের ক্রেবস চক্রে ১ অণু গ্লুকোজের জন্য মোট কয় অণু কার্বন ডাই-অক্সাইড ($CO_2$) নির্গত হয়?",
    options: [
      { id: "opt_bio_4_87_a", text: "২ অণু", isCorrect: false },
      { id: "opt_bio_4_87_b", text: "৪ অণু", isCorrect: true },
      { id: "opt_bio_4_87_c", text: "৬ অণু", isCorrect: false },
      { id: "opt_bio_4_87_d", text: "৮ অণু", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ৪ অণু।",
      coreConcept: "প্রতিটি অ্যাসিটাইল কো-এ চক্রে জারিত হয়ে ২টি করে CO₂ দেয়। সুতরাং ২ অণু অ্যাসিটাইল কো-এ থেকে মোট ৪ অণু CO₂ নির্গত হয়। (অন্য ২টি অ্যাসিটাইল কো-এ তৈরির ধাপে নির্গত হয়, মোট ৬টি)।",
      distractorAnalysis: {
        opt_bio_4_87_a: "২ অণু অ্যাসিটাইল কো-এ সৃষ্টি ধাপে নির্গত হয়।",
        opt_bio_4_87_c: "৬ অণু হলো সর্বমোট নির্গত CO₂।",
        opt_bio_4_87_d: "৮ অণু ভুল।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 79
      }
    },
    difficulty: "HARD",
    boardSource: "যশোর বোর্ড ২০২১",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_88",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "সবাত শ্বসনে ইলেকট্রন প্রবাহ তন্ত্রে ইলেকট্রনের সর্বশেষ গ্রাহক (Terminal Electron Acceptor) কোনটি?",
    options: [
      { id: "opt_bio_4_88_a", text: "কার্বন ডাই-অক্সাইড", isCorrect: false },
      { id: "opt_bio_4_88_b", text: "আণবিক অক্সিজেন ($O_2$)", isCorrect: true },
      { id: "opt_bio_4_88_c", text: "সাইটোক্রোম", isCorrect: false },
      { id: "opt_bio_4_88_d", text: "পানি", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: আণবিক অক্সিজেন (O₂)।",
      coreConcept: "ইলেকট্রন পরিবহন চেইনের শেষে অক্সিজেন ইলেকট্রন ও প্রোটন গ্রহণ করে পানি ($H_2O$) গঠন করে। তাই অক্সিজেন হলো চূড়ান্ত ইলেকট্রন গ্রহীতা।",
      distractorAnalysis: {
        opt_bio_4_88_a: "CO₂ একটি বর্জ্য উৎপাদ হিসেবে বের হয়ে যায়।",
        opt_bio_4_88_c: "সাইটোক্রোম অন্তর্বর্তী ইলেকট্রন বাহক।",
        opt_bio_4_88_d: "পানি হলো বিক্রিয়ার উৎপাদ।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 79
      }
    },
    difficulty: "HARD",
    boardSource: "দিনাজপুর বোর্ড ২০২২",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_89",
    topicId: "top_ssc_biology_ch4_5",
    type: "MCQ",
    stem: "শ্বসন প্রক্রিয়ার সর্বোত্তম অনুকূল তাপমাত্রা কত?",
    options: [
      { id: "opt_bio_4_89_a", text: "০° সে. থেকে ১০° সে.", isCorrect: false },
      { id: "opt_bio_4_89_b", text: "২০° সে. থেকে ৪৫° সে.", isCorrect: true },
      { id: "opt_bio_4_89_c", text: "৫০° সে. থেকে ৬০° সে.", isCorrect: false },
      { id: "opt_bio_4_89_d", text: "৭০° সে. থেকে ৮০° সে.", isCorrect: false }
    ],
    explanation: {
      directAnswer: "সঠিক উত্তর খ: ২০° সে. থেকে ৪৫° সে.।",
      coreConcept: "পাঠ্যবই অনুযায়ী শ্বসনের অনুকূল তাপমাত্রা ২০°–৪৫° সেলসিয়াস। ৪৫° সে.-এর উপরে এনজাইম নষ্ট হয়ে শ্বসন হার দ্রুত কমে যায়।",
      distractorAnalysis: {
        opt_bio_4_89_a: "০°-১০° সে. তাপমাত্রায় এনজাইম নিষ্ক্রিয় থাকে।",
        opt_bio_4_89_c: "৫০°-৬০° সে. তাপমাত্রায় প্রোটিন নষ্ট হয়ে জীবকোষ মারা যায়।",
        opt_bio_4_89_d: "৭০°-৮০° সে. অত্যন্ত ধ্বংসাত্মক।"
      },
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 81
      }
    },
    difficulty: "MEDIUM",
    boardSource: "কুমিল্লা বোর্ড ২০১৯",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  },
  {
    id: "q_bio_4_90",
    topicId: "top_ssc_biology_ch4_5",
    type: "CQ_CREATIVE",
    stem: "একটি সারণিতে সবাত শ্বসনের দুটি পর্যায়ের হিসাব দেখানো হলো:\nপর্যায় ১ (সাইটোপ্লাজম): ১ গ্লুকোজ → ২ পাইরুভিক এসিড + নিট ২ ATP + ২ NADH\nপর্যায় ২ (মাইটোকন্ড্রিয়া): ক্রেবস চক্র ও ইলেকট্রন প্রবাহ → ২৪ ATP।\nশিক্ষক বললেন, “এই পুরো প্রক্রিয়ায় ইলেকট্রন বাহক হিসেবে সাইটোক্রোমগুলো ক্রিস্টিতে কাজ করে এবং মোট ৩৮টি ATP শক্তি উৎপাদন নিশ্চিত করে।”",
    options: null,
    explanation: {
      directAnswer: "পর্যায় ১ হলো গ্লাইকোলাইসিস এবং পর্যায় ২ হলো ক্রেবস চক্র ও ইলেকট্রন প্রবাহ তন্ত্র।",
      coreConcept: "সবাত শ্বসনে মাইটোকন্ড্রিয়ার কেন্দ্রীয় ভূমিকা এবং সাইটোপ্লাজম ও মাইটোকন্ড্রিয়ায় সংঘটিত ধাপগুলোর শক্তির নিখুঁত সমীকরণ।",
      textbookCitation: {
        bookTitle: "জীববিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)",
        chapterName: "চতুর্থ অধ্যায়: জীবনীশক্তি · ৪.৫",
        pageNumber: 79
      }
    },
    cqRubric: {
      ka: { mark: 1, criteria: "অক্সিডেটিভ ফসফোরাইলেশন কী তা লেখা।" },
      kha: { mark: 2, criteria: "সবাত শ্বসনে ইলেকট্রনের চূড়ান্ত গ্রাহক হিসেবে অক্সিজেনের ভূমিকা ব্যাখ্যা করা।" },
      ga: { mark: 3, criteria: "উদ্দীপকের পর্যায়-১ ও পর্যায়-২ এর মোট ৩৮টি ATP-র একটি নিখুঁত ব্যালেন্স শিট তৈরি করা।" },
      gha: { mark: 4, criteria: "মাইটোকন্ড্রিয়ার ক্রিস্টি ক্ষতিগ্রস্ত হলে কোষে ATP উৎপাদনে কী বিপর্যয় ঘটবে তা মূল্যায়ন করো।" }
    },
    difficulty: "HARD",
    boardSource: "বরিশাল বোর্ড সৃজনশীল মডেল",
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1
  }
];
