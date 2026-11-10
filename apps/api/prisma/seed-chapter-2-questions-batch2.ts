import { ContentStatus } from '@prisma/client';
import { QuestionData } from './seed-chapter-2-questions';

export const chapter2Batch2Questions: QuestionData[] = [
  // =========================================================================
  // Topic 2.5: দ্রুতি ও বেগ (Speed and Velocity) [top_ssc_physics_ch2_5]
  // =========================================================================
  {
    id: 'q_ch2_5_mcq_1',
    topicId: 'top_ssc_physics_ch2_5',
    type: 'MCQ',
    stem: '$54\\text{ km/h}$ দ্রুতিকে আন্তর্জাতিক একক পদ্ধতিতে (SI Unit) রূপান্তর করলে কত হবে?',
    options: [
      { id: 'opt_2_5_1a', text: '$15\\text{ m/s}$', isCorrect: true },
      { id: 'opt_2_5_1b', text: '$20\\text{ m/s}$', isCorrect: false },
      { id: 'opt_2_5_1c', text: '$10\\text{ m/s}$', isCorrect: false },
      { id: 'opt_2_5_1d', text: '$5.4\\text{ m/s}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $15\\text{ m/s}$।',
      coreConcept: '$\\text{km/h}$ থেকে $\\text{m/s}$-এ রূপান্তর করতে $\\frac{5}{18}$ দিয়ে গুণ বা $3.6$ দিয়ে ভাগ করতে হয়।',
      stepDerivation: '$$54\\text{ km/h} = 54 \\times \\frac{1000\\text{ m}}{3600\\text{ s}} = 54 \\times \\frac{5}{18} = 3 \\times 5 = 15\\text{ m/s}$$',
      distractorAnalysis: {
        opt_2_5_1b: '$20\\text{ m/s}$ হলো $72\\text{ km/h}$ এর মান।',
        opt_2_5_1c: '$10\\text{ m/s}$ হলো $36\\text{ km/h}$ এর মান।',
        opt_2_5_1d: '১০ দিয়ে ভাগ করার ভুল পদ্ধতি।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 41,
      },
      proTipShortcut: 'দ্রুত ট্রিক: $\\text{km/h} \\times \\frac{5}{18} = \\text{m/s}$। যেমন $54 \\times \\frac{5}{18} = 15\\text{ m/s}$।',
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_5_mcq_2',
    topicId: 'top_ssc_physics_ch2_5',
    type: 'MCQ',
    stem: 'একটি গাড়ি যাত্রাপথের প্রথম অর্ধেক দূরত্ব $40\\text{ km/h}$ এবং দ্বিতীয় অর্ধেক দূরত্ব $60\\text{ km/h}$ দ্রুতিতে অতিক্রম করলে গাড়িটির গড় দ্রুতি কত?',
    options: [
      { id: 'opt_2_5_2a', text: '$48\\text{ km/h}$', isCorrect: true },
      { id: 'opt_2_5_2b', text: '$50\\text{ km/h}$', isCorrect: false },
      { id: 'opt_2_5_2c', text: '$52\\text{ km/h}$', isCorrect: false },
      { id: 'opt_2_5_2d', text: '$45\\text{ km/h}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $48\\text{ km/h}$।',
      coreConcept: 'দূরত্ব সমান হলে গড় দ্রুতি সাধারণ পাটিগণিতীয় গড় নয়, বরং বিপরীতীয় গড় (Harmonic Mean): $v_{\\text{avg}} = \\frac{2v_1 v_2}{v_1 + v_2}$।',
      stepDerivation: 'ধরি মোট দূরত্ব $2s$। প্রথম $s$ পথ অতিক্রমের সময় $t_1 = \\frac{s}{40}$ এবং দ্বিতীয় $s$ পথ অতিক্রমের সময় $t_2 = \\frac{s}{60}$।\nমোট সময় $t = t_1 + t_2 = \\frac{s}{40} + \\frac{s}{60} = \\frac{3s + 2s}{120} = \\frac{5s}{120} = \\frac{s}{24}$।\nগড় দ্রুতি:\n$$v_{\\text{avg}} = \\frac{\\text{মোট দূরত্ব}}{\\text{মোট সময়}} = \\frac{2s}{s/24} = 2 \\times 24 = 48\\text{ km/h}$$',
      distractorAnalysis: {
        opt_2_5_2b: '$50\\text{ km/h}$ হলো সরল পাটিগণিতীয় গড় $\\frac{40+60}{2}$, যা পদার্থবিজ্ঞানের জন্য ভুল। সময় অসমান হওয়ায় এটি খাটে না।',
        opt_2_5_2c: 'ভুল গণনা।',
        opt_2_5_2d: 'বিভ্রান্তিকর অনুমান।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 41,
      },
      proTipShortcut: 'সমান দূরত্বের শর্টকাট: $v = \\frac{2 v_1 v_2}{v_1 + v_2} = \\frac{2 \\times 40 \\times 60}{100} = 48\\text{ km/h}$।',
    },
    difficulty: 'HARD',
    boardSource: 'Rajshahi Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_5_mcq_3',
    topicId: 'top_ssc_physics_ch2_5',
    type: 'MCQ',
    stem: 'সমদ্রুতিতে চলমান কোনো বস্তুর বেগ পরিবর্তনশীল হতে পারে কি না?',
    options: [
      { id: 'opt_2_5_3a', text: 'হ্যাঁ, যদি বস্তুটি বৃত্তাকার বা বক্রপথে চলে তবে দিক পরিবর্তনের কারণে বেগ পরিবর্তিত হবে', isCorrect: true },
      { id: 'opt_2_5_3b', text: 'না, দ্রুতি একই থাকলে বেগ কখনই পরিবর্তিত হতে পারে না', isCorrect: false },
      { id: 'opt_2_5_3c', text: 'হ্যাঁ, শুধুমাত্র ভর পরিবর্তিত হলে', isCorrect: false },
      { id: 'opt_2_5_3d', text: 'না, এটি পদার্থবিজ্ঞানের নিয়মের পরিপন্থী', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: হ্যাঁ, বক্রপথে দিক পরিবর্তনের কারণে বেগ পরিবর্তিত হবে।',
      coreConcept: 'বেগ একটি ভেক্টর রাশি। বেগের মান (দ্রুতি) স্থির থাকা সত্ত্বেও কেবল দিক পরিবর্তনের কারণেই বেগ পরিবর্তিত হতে পারে।',
      stepDerivation: 'যেমন ফ্যানের ব্লেডের প্রান্তবিন্দু সমদ্রুতিতে ঘুরলেও প্রতি মুহূর্তে তার গতির দিক স্পর্শক বরাবর পরিবর্তিত হয়। বেগের পরিবর্তন মানেই সেখানে ত্বরণ বিদ্যমান (কেন্দ্রমুখী ত্বরণ $a_c = \\frac{v^2}{r}$)। তাই সমদ্রুতি সত্ত্বেও বেগ পরিবর্তনশীল হতে পারে।',
      distractorAnalysis: {
        opt_2_5_3b: 'দ্রুতি স্থির হলেও দিক বদলালে বেগ বদলায়, তাই এটি ভুল।',
        opt_2_5_3c: 'ভরের সাথে বেগের সংজ্ঞাগত পরিবর্তনের সম্পর্ক নেই।',
        opt_2_5_3d: 'এটি পদার্থবিজ্ঞানের প্রতিষ্ঠিত নীতি।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 42,
      },
      proTipShortcut: 'সমদ্রুতিতে বৃত্তাকার গতি = সুষম দ্রুতি কিন্তু অসম বেগ (ত্বরণযুক্ত গতি)।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Cumilla Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_5_mcq_4',
    topicId: 'top_ssc_physics_ch2_5',
    type: 'MCQ',
    stem: 'বেগের মাত্রা সমীকরণ কোনটি?',
    options: [
      { id: 'opt_2_5_4a', text: '$[LT^{-1}]$', isCorrect: true },
      { id: 'opt_2_5_4b', text: '$[LT^{-2}]$', isCorrect: false },
      { id: 'opt_2_5_4c', text: '$[MLT^{-1}]$', isCorrect: false },
      { id: 'opt_2_5_4d', text: '$[L^2T^{-1}]$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $[LT^{-1}]$।',
      coreConcept: 'বেগ হলো সময়ের সাথে সরণের পরিবর্তনের হার: $v = \\frac{s}{t}$।',
      stepDerivation: 'সরণের মাত্রা $[s] = L$ এবং সময়ের মাত্রা $[t] = T$।\nঅতএব বেগের মাত্রা:\n$$[v] = \\frac{[s]}{[t]} = \\frac{L}{T} = LT^{-1}$$',
      distractorAnalysis: {
        opt_2_5_4b: '$[LT^{-2}]$ হলো ত্বরণের মাত্রা।',
        opt_2_5_4c: '$[MLT^{-1}]$ হলো ভরবেগের মাত্রা।',
        opt_2_5_4d: 'ভুল ক্ষেত্রফলের হার।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 41,
      },
      proTipShortcut: 'বেগ ও দ্রুতি উভয়ের মাত্রাই $[LT^{-1}]$ এবং একক $\\text{m/s}$।',
    },
    difficulty: 'EASY',
    boardSource: 'Jashore Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_5_mcq_5',
    topicId: 'top_ssc_physics_ch2_5',
    type: 'MCQ',
    stem: 'একটি বন্দুকের গুলি একটি কাঠের তক্তার ভেতরে $3\\text{ cm}$ প্রবেশ করার পর এর বেগ অর্ধেক হয়ে গেল। তক্তার ভেতরে গুলিটি আর কতটুকু পথ প্রবেশ করতে পারবে?',
    options: [
      { id: 'opt_2_5_5a', text: '$1\\text{ cm}$', isCorrect: true },
      { id: 'opt_2_5_5b', text: '$3\\text{ cm}$', isCorrect: false },
      { id: 'opt_2_5_5c', text: '$1.5\\text{ cm}$', isCorrect: false },
      { id: 'opt_2_5_5d', text: '$0.75\\text{ cm}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $1\\text{ cm}$।',
      coreConcept: 'গতির তৃতীয় সমীকরণ $v^2 = u^2 - 2as$ থেকে গুলি থেমে যাওয়ার দূরত্ব নির্ণয় করা যায়।',
      stepDerivation: 'আদিবেগ $u$, $s_1 = 3\\text{ cm}$ দূরত্ব পর বেগ $v_1 = \\frac{u}{2}$।\n$$(\\frac{u}{2})^2 = u^2 - 2as_1 \\implies \\frac{u^2}{4} = u^2 - 2a(3) \\implies 6a = \\frac{3u^2}{4} \\implies a = \\frac{u^2}{8}$$\nএখন ধরি আরও $s_2$ পথ গিয়ে গুলি সম্পূর্ণ থেমে যাবে ($v_2 = 0$): \n$$0^2 = (\\frac{u}{2})^2 - 2a s_2 \\implies \\frac{u^2}{4} = 2 \\times (\\frac{u^2}{8}) \\times s_2 \\implies \\frac{u^2}{4} = \\frac{u^2}{4} s_2 \\implies s_2 = 1\\text{ cm}$$',
      distractorAnalysis: {
        opt_2_5_5b: 'বেগ অর্ধেক হওয়া মানে গতিশক্তি তিন-চতুর্থাংশ হারানো, ফলে দূরত্ব সমান হবে না।',
        opt_2_5_5c: '$1.5\\text{ cm}$ সরল রৈখিক অনুমানে ভুল হিসাব।',
        opt_2_5_5d: 'ভুল ভগ্নাংশ।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 46,
      },
      proTipShortcut: 'বেগ অর্ধেক ($\\\\frac{1}{2}$) হলে বাকি দূরত্ব $= \\frac{\\text{অতিক্রান্ত দূরত্ব}}{3} = \\frac{3}{3} = 1\\text{ cm}$!',
    },
    difficulty: 'HARD',
    boardSource: 'Dhaka Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_5_cq_1',
    topicId: 'top_ssc_physics_ch2_5',
    type: 'CQ_CREATIVE',
    stem: 'একটি আন্তঃজেলা এক্সপ্রেস বাস ঢাকা থেকে চট্টগ্রামের উদ্দেশ্যে রওয়ানা হলো। যাত্রাপথের প্রথম $120\\text{ km}$ বাসটি যানজটের কারণে $40\\text{ km/h}$ সমদ্রুতিতে অতিক্রম করল। পরবর্তী $180\\text{ km}$ ফাঁকা মহাসড়ক পেয়ে বাসটি $90\\text{ km/h}$ সমদ্রুতিতে চলল। বাসের একজন যাত্রী হিসাব করে দাবি করলেন যে পুরো ৩০০ কিমি যাত্রায় বাসটির গড় দ্রুতি ছিল $(40 + 90)/2 = 65\\text{ km/h}$।',
    options: null,
    explanation: {
      directAnswer: 'দ্রুতি, গড় দ্রুতি ও সময় ভিত্তিক সৃজনশীল প্রশ্নটির পুঙ্খানুপুঙ্খ গাণিতিক ব্যাখ্যা নিচে দেওয়া হলো।',
      coreConcept: 'গড় দ্রুতির প্রকৃত সংজ্ঞা ($v = \\text{মোট দূরত্ব}/\\text{মোট সময়}$), পাটিগণিতীয় গড়ের বিভ্রান্তি ও ভৌত তাৎপর্য।',
      stepDerivation: `ক. জ্ঞানমূলক উত্তর:
কোনো গতিশীল বস্তুর মোট অতিক্রান্ত দূরত্বকে ঐ দূরত্ব অতিক্রম করতে প্রয়োজনীয় মোট সময় দ্বারা ভাগ করলে যে মান পাওয়া যায় তাকে গড় দ্রুতি (Average Speed) বলে।

খ. অনুধাবনমূলক উত্তর:
১. দ্রুতি স্কেলার রাশি (কেবল মান আছে), কিন্তু বেগ ভেক্টর রাশি (মান ও নির্দিষ্ট দিক উভয়ই আছে)।
২. দ্রুতি হলো মোট দূরত্বের পরিবর্তনের হার, কিন্তু বেগ হলো নির্দিষ্ট দিকে সরণের পরিবর্তনের হার। কোনো গতিশীল বস্তুর গড় দ্রুতি কখনো শূন্য হতে পারে না, কিন্তু নির্দিষ্ট বিন্দুতে ফিরে আসলে গড় বেগ শূন্য হতে পারে।

গ. প্রয়োগমূলক উত্তর:
বাসটির সমগ্র যাত্রার মোট সময় ও প্রকৃত গড় দ্রুতি নির্ণয়:
১ম অংশের দূরত্ব $s_1 = 120\\text{ km}$, দ্রুতি $v_1 = 40\\text{ km/h}$।
১ম অংশের সময়:
$$t_1 = \\frac{s_1}{v_1} = \\frac{120\\text{ km}}{40\\text{ km/h}} = 3\\text{ h}$$

২য় অংশের দূরত্ব $s_2 = 180\\text{ km}$, দ্রুতি $v_2 = 90\\text{ km/h}$।
২য় অংশের সময়:
$$t_2 = \\frac{s_2}{v_2} = \\frac{180\\text{ km}}{90\\text{ km/h}} = 2\\text{ h}$$

মোট অতিক্রান্ত দূরত্ব $s = s_1 + s_2 = 120 + 180 = 300\\text{ km}$।
মোট ব্যয়িত সময় $t = t_1 + t_2 = 3 + 2 = 5\\text{ h}$।
প্রকৃত গড় দ্রুতি:
$$v_{\\text{avg}} = \\frac{s}{t} = \\frac{300\\text{ km}}{5\\text{ h}} = 60\\text{ km/h}$$

ঘ. উচ্চতর দক্ষতামূলক উত্তর:
যাত্রীর দাবির মূল্যায়ন:
যাত্রী দাবি করেছিলেন গড় দ্রুতি হবে দ্রুতিদ্বয়ের সরল পাটিগণিতীয় গড়:
$$v_{\\text{claimed}} = \\frac{40 + 90}{2} = 65\\text{ km/h}$$
কিন্তু আমাদের পদার্থবৈজ্ঞানিক হিসাব অনুযায়ী প্রকৃত গড় দ্রুতি বের হয়েছে $60\\text{ km/h}$।

পার্থক্য ও বৈজ্ঞানিক কারণ:
পাটিগণিতীয় গড় কেবল তখনই সত্য হতো যদি বাসটি উভয় দ্রুতিতে সমান সময় ($t_1 = t_2$) চলত।
কিন্তু উদ্দীপকে বাসটি $40\\text{ km/h}$ ধীরগতিতে চলেছে ৩ ঘণ্টা এবং $90\\text{ km/h}$ দ্রুতগতিতে চলেছে মাত্র ২ ঘণ্টা।
যেহেতু বাসটি কম দ্রুতিতে বেশি সময় ধরে ($৩\\text{ h} > ২\\text{ h}$) চলেছে, তাই চূড়ান্ত গড় দ্রুতিটি কম দ্রুতির দিকে ঝুঁকে পড়েছে ($60\\text{ km/h}$)।
অতএব যাত্রীর দাবিটি গাণিতিক ও পদার্থবৈজ্ঞানিকভাবে ভুল এবং প্রকৃত গড় দ্রুতি হবে $60\\text{ km/h}$।`,
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 41,
      },
      proTipShortcut: 'গড় দ্রুতি $= \\frac{s_1 + s_2}{t_1 + t_2} = \\frac{120 + 180}{3 + 2} = \\frac{300}{5} = 60\\text{ km/h}$।',
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: 'জ্ঞানমূলক (১ নম্বর): গড় দ্রুতির সঠিক সংজ্ঞা লিখলে পূর্ণ ১ নম্বর।',
      },
      kha: {
        mark: 2,
        criteria: 'অনুধাবনমূলক (২ নম্বর): দ্রুতি ও বেগের দুটি পার্থক্য (স্কেলার/ভেক্টর ও শূন্য হওয়া) লিখলে পূর্ণ ২ নম্বর।',
      },
      ga: {
        mark: 3,
        criteria: 'প্রয়োগমূলক (৩ নম্বর): সময় $t_1 = 3\\text{ h}$, $t_2 = 2\\text{ h}$ এবং প্রকৃত গড় দ্রুতি $60\\text{ km/h}$ সঠিকভাবে নির্ণয় করলে পূর্ণ ৩ নম্বর।',
      },
      gha: {
        mark: 4,
        criteria: 'উচ্চতর দক্ষতামূলক (৪ নম্বর): সময়ের ভিন্নতার কারণে কেন পাটিগণিতীয় গড় ($65$) খাটে না তা যুক্তি দিয়ে যাত্রীর দাবি ভুল প্রমাণ করলে পূর্ণ ৪ নম্বর।',
      },
    },
    difficulty: 'HARD',
    boardSource: 'Dhaka Board 2024 Model Question',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_5_cq_2',
    topicId: 'top_ssc_physics_ch2_5',
    type: 'CQ_CREATIVE',
    stem: 'একটি ড্রোন সমতল ভূমির ওপর দিয়ে পূর্ব দিকে সোজা $20\\text{ s}$ ধরে চলল। এর অবস্থানের উপাত্তে দেখা গেল প্রথম $10\\text{ s}$-এ ড্রোনটি $150\\text{ m}$ পথ অতিক্রম করে এবং পরবর্তী $10\\text{ s}$-এ একই দিকে আরও $250\\text{ m}$ অতিক্রম করে। অপরদিকে একটি খেলনা গাড়ি $14\\text{ m}$ ব্যাসার্ধের বৃত্তাকার ট্র্যাকে প্রতি $20\\text{ s}$-এ সম্পূর্ণ এক চক্কর সমদ্রুতিতে ঘুরছে।',
    options: null,
    explanation: {
      directAnswer: 'সুষম বেগ বনাম সমদ্রুতির বৃত্তাকার গতির সৃজনশীল প্রশ্নটির পুঙ্খানুপুঙ্খ ব্যাখ্যা নিচে দেওয়া হলো।',
      coreConcept: 'সুষম বেগ, অসম বেগ, তাৎক্ষণিক দ্রুতি ও বৃত্তাকার পথে কেন্দ্রমুখী ত্বরণ।',
      stepDerivation: `ক. জ্ঞানমূলক উত্তর:
যদি কোনো গতিশীল বস্তুর গতির মান এবং দিক উভয়েই সময়ের সাথে সর্বদা অপরিবর্তিত থাকে, তবে সেই বস্তুর বেগকে সুষম বেগ (Uniform Velocity) বলে।

খ. অনুধাবনমূলক উত্তর:
গড় বেগ হলো একটি নির্দিষ্ট সময় ব্যবধানে মোট সরণ ও মোট সময়ের অনুপাত ($v_{\\text{avg}} = \\frac{\\Delta s}{\\Delta t}$)। কিন্তু সময় ব্যবধান যদি অত্যন্ত ক্ষুদ্র বা শূন্যের কাছাকাছি হয় ($\\Delta t \\rightarrow 0$), তখন যে কোনো বিশেষ মুহূর্তের বেগকে তাৎক্ষণিক বেগ বলে ($v = \\lim_{\\Delta t \\rightarrow 0} \\frac{\\Delta s}{\\Delta t}$)। সুষম বেগের ক্ষেত্রে তাৎক্ষণিক বেগ ও গড় বেগ হুবহু সমান থাকে।

গ. প্রয়োগমূলক উত্তর:
ড্রোনটির প্রথম ও দ্বিতীয় অংশের বেগ বিশ্লেষণ:
১ম অংশের সময় $t_1 = 10\\text{ s}$, সরণ $s_1 = 150\\text{ m}$।
১ম অংশের বেগ:
$$v_1 = \\frac{s_1}{t_1} = \\frac{150\\text{ m}}{10\\text{ s}} = 15\\text{ m/s}$$
২য় অংশের সময় $t_2 = 10\\text{ s}$, সরণ $s_2 = 250\\text{ m}$।
২য় অংশের বেগ:
$$v_2 = \\frac{s_2}{t_2} = \\frac{250\\text{ m}}{10\\text{ s}} = 25\\text{ m/s}$$
যেহেতু $v_1 \\neq v_2$ ($15\\text{ m/s} \\neq 25\\text{ m/s}$), তাই ড্রোনটি সুষম বেগে চলছে না; এটি অসম বেগে বা ত্বরণযুক্ত গতিতে চলছে।

ঘ. উচ্চতর দক্ষতামূলক উত্তর:
খেলনা গাড়িটির গতি বিশ্লেষণ:
বৃত্তাকার ট্র্যাকের ব্যাসার্ধ $r = 14\\text{ m}$, পর্যায়কাল $T = 20\\text{ s}$।
১. খেলনা গাড়ির দ্রুতি:
$$v = \\frac{2\\pi r}{T} = \\frac{2 \\times \\frac{22}{7} \\times 14}{20} = \\frac{88}{20} = 4.4\\text{ m/s}$$
যেহেতু বৃত্তাকার পরিধি বরাবর প্রতি সেকেন্ডে গাড়ির অতিক্রান্ত পথ সমান ($4.4\\text{ m/s}$), তাই গাড়িটি সুষম দ্রুতিতে চলছে।

২. খেলনা গাড়ির বেগ:
বেগ একটি ভেক্টর রাশি। বৃত্তাকার পথে ঘোরার সময় বৃত্তের প্রতিটি বিন্দুতে বেগের দিক হয় ঐ বিন্দুর স্পর্শক বরাবর।
ফলে দ্রুতির মান $4.4\\text{ m/s}$ স্থির থাকা সত্ত্বেও প্রতি মুহূর্তে দিক পরিবর্তিত হচ্ছে।
এছাড়া পূর্ণ এক চক্কর শেষে গাড়িটির সরণ $s = 0$ হওয়ায় পূর্ণ চক্করে এর গড় বেগ শূন্য:
$$\\vec{v}_{\\text{avg}} = \\frac{0\\text{ m}}{20\\text{ s}} = 0\\text{ m/s}$$
সিদ্ধান্ত:
ড্রোনটি সরলরেখায় চলার পরও বেগের মান পরিবর্তনের কারণে অসম বেগে চলছে, অন্যদিকে খেলনা গাড়িটি বেগের মান ধ্রুব থাকা সত্ত্বেও দিক পরিবর্তনের কারণে অসম বেগে চলছে। এই তুলনামূলক বিশ্লেষণ বেগের ভেক্টর প্রকৃতির সত্যতা সুপ্রতিষ্ঠিত করে।`,
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 42,
      },
      proTipShortcut: 'বৃত্তাকার পথে দ্রুতি $= \\frac{2\\pi r}{T} = 4.4\\text{ m/s}$; কিন্তু এক চক্করে সরণ $= 0$ হওয়ায় গড় বেগ $= 0$।',
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: 'জ্ঞানমূলক (১ নম্বর): সুষম বেগের সঠিক সংজ্ঞা লিখলে পূর্ণ ১ নম্বর।',
      },
      kha: {
        mark: 2,
        criteria: 'অনুধাবনমূলক (২ নম্বর): তাৎক্ষণিক বেগ ও গড় বেগের সম্পর্ক সীমাস্ত মানের ($\\Delta t \\rightarrow 0$) ভিত্তিতে ব্যাখ্যা করলে পূর্ণ ২ নম্বর।',
      },
      ga: {
        mark: 3,
        criteria: 'প্রয়োগমূলক (৩ নম্বর): ড্রোনের ১ম ও ২য় অংশের বেগ ($15\\text{ m/s}$ ও $25\\text{ m/s}$) বের করে অসম বেগ দেখালে পূর্ণ ৩ নম্বর।',
      },
      gha: {
        mark: 4,
        criteria: 'উচ্চতর দক্ষতামূলক (৪ নম্বর): খেলনা গাড়ির দ্রুতি ($4.4\\text{ m/s}$) এবং স্পর্শকীয় দিক পরিবর্তনের কারণে বেগ কেন অসম তা মূল্যায়ন করলে পূর্ণ ৪ নম্বর।',
      },
    },
    difficulty: 'HARD',
    boardSource: 'Cumilla Board 2024 Model Question',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 2.6: ত্বরণ ও মন্দন (Acceleration and Deceleration) [top_ssc_physics_ch2_6]
  // =========================================================================
  {
    id: 'q_ch2_6_mcq_1',
    topicId: 'top_ssc_physics_ch2_6',
    type: 'MCQ',
    stem: 'স্থির অবস্থান থেকে সুষম ত্বরণে চলা একটি ট্রেনের বেগ $5\\text{ s}$ পর $20\\text{ m/s}$ হলে এর ত্বরণ কত?',
    options: [
      { id: 'opt_2_6_1a', text: '$4\\text{ m/s}^2$', isCorrect: true },
      { id: 'opt_2_6_1b', text: '$100\\text{ m/s}^2$', isCorrect: false },
      { id: 'opt_2_6_1c', text: '$0.25\\text{ m/s}^2$', isCorrect: false },
      { id: 'opt_2_6_1d', text: '$15\\text{ m/s}^2$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $4\\text{ m/s}^2$।',
      coreConcept: 'ত্বরণ $a = \\frac{v - u}{t}$। স্থির অবস্থান থেকে যাত্রা শুরু করায় আদিবেগ $u = 0$।',
      stepDerivation: 'দেওয়া আছে, আদিবেগ $u = 0\\text{ m/s}$, শেষ বেগ $v = 20\\text{ m/s}$, সময় $t = 5\\text{ s}$।\nত্বরণ:\n$$a = \\frac{v - u}{t} = \\frac{20 - 0}{5} = 4\\text{ m/s}^2$$',
      distractorAnalysis: {
        opt_2_6_1b: '$20 \\times 5 = 100$ ভুল গুণফল।',
        opt_2_6_1c: '$5/20 = 0.25$ উল্টো ভাগ।',
        opt_2_6_1d: '$20 - 5 = 15$ ভুল বিয়োগ।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 42,
      },
      proTipShortcut: 'স্থির অবস্থান বললে সরাসরি $a = \\frac{v}{t} = \\frac{20}{5} = 4\\text{ m/s}^2$।',
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_6_mcq_2',
    topicId: 'top_ssc_physics_ch2_6',
    type: 'MCQ',
    stem: '$30\\text{ m/s}$ বেগে গতিশীল একটি গাড়িতে ব্রেক প্রয়োগ করায় গাড়িটি $6\\text{ s}$ পর সম্পূর্ণ থেমে গেল। গাড়িটির মন্দন কত?',
    options: [
      { id: 'opt_2_6_2a', text: '$5\\text{ m/s}^2$', isCorrect: true },
      { id: 'opt_2_6_2b', text: '$-5\\text{ m/s}^2$', isCorrect: false },
      { id: 'opt_2_6_2c', text: '$180\\text{ m/s}^2$', isCorrect: false },
      { id: 'opt_2_6_2d', text: '$0.2\\text{ m/s}^2$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $5\\text{ m/s}^2$।',
      coreConcept: 'ত্বরণ ঋণাত্মক হলে তাকে মন্দন বলে। "মন্দন" শব্দটি বললে স্বয়ংক্রিয়ভাবে ঋণাত্মক চিহ্ন অন্তর্নিহিত থাকে, তাই আলাদা মাইনাস দিতে হয় না।',
      stepDerivation: 'আদিবেগ $u = 30\\text{ m/s}$, শেষ বেগ $v = 0\\text{ m/s}$, সময় $t = 6\\text{ s}$।\nত্বরণ $a = \\frac{v - u}{t} = \\frac{0 - 30}{6} = -5\\text{ m/s}^2$।\nঅতএব মন্দন $= -(-5) = 5\\text{ m/s}^2$।',
      distractorAnalysis: {
        opt_2_6_2b: 'যদি প্রশ্ন বলত "ত্বরণ কত?", তখন উত্তর হতো $-5\\text{ m/s}^2$। কিন্তু "মন্দন" বললে উত্তর ধনাত্মক $5\\text{ m/s}^2$ হয়।',
        opt_2_6_2c: '$30 \\times 6 = 180$ ভুল গুণফল।',
        opt_2_6_2d: 'উল্টো ভাগফল।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 43,
      },
      proTipShortcut: 'সতর্কতা: ত্বরণ $=-5\\text{ m/s}^2$; কিন্তু মন্দন $=+5\\text{ m/s}^2$!',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Rajshahi Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_6_mcq_3',
    topicId: 'top_ssc_physics_ch2_6',
    type: 'MCQ',
    stem: 'কোনো গতিশীল বস্তুর বেগ কোনো মুহূর্তে শূন্য ($v = 0$) হওয়া সত্ত্বেও ঐ মুহূর্তে বস্তুটির ত্বরণ অশূন্য বা কার্যকর থাকতে পারে কি?',
    options: [
      { id: 'opt_2_6_3a', text: 'হ্যাঁ, খাড়া উপরের দিকে নিক্ষিপ্ত বস্তুর সর্বোচ্চ বিন্দুতে বেগ শূন্য হলেও অভিকর্ষজ ত্বরণ $9.8\\text{ m/s}^2$ নিচের দিকে কার্যকর থাকে', isCorrect: true },
      { id: 'opt_2_6_3b', text: 'না, বেগ শূন্য হলে ত্বরণ সবসময় বাধ্যতামূলকভাবে শূন্য হবে', isCorrect: false },
      { id: 'opt_2_6_3c', text: 'হ্যাঁ, শুধুমাত্র চাঁদের তলে এটি সম্ভব', isCorrect: false },
      { id: 'opt_2_6_3d', text: 'না, এটি নিউটনের প্রথম সূত্রের পরিপন্থী', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: হ্যাঁ, সর্বোচ্চ বিন্দুতে বেগ শূন্য হলেও অভিকর্ষজ ত্বরণ কার্যকর থাকে।',
      coreConcept: 'ত্বরণ হলো বেগের পরিবর্তনের হার, শুধু বেগের মান নয়। কোনো মুহূর্তে বেগ শূন্য হলেও বেগের পরিবর্তনের হার উপস্থিত থাকতে পারে।',
      stepDerivation: 'একটি পাথরকে খাড়া উপরে ছুড়ে দিলে সর্বোচ্চ বিন্দুতে এক মুহূর্তের জন্য থেমে যায় ($v = 0$)। কিন্তু ঐ মুহূর্তেও পৃথিবীর অভিকর্ষ বল পাথরটিকে নিচের দিকে টানতে থাকে। ফলে ঐ বিন্দুতে ত্বরণ থাকে $g = 9.8\\text{ m/s}^2$ নিচের দিকে, যার কারণে পাথরটি অবিলম্বে নিচের দিকে নামতে শুরু করে।',
      distractorAnalysis: {
        opt_2_6_3b: 'বেগ শূন্য হলে সমবেগ নয়, তাই ত্বরণ শূন্য হওয়া বাধ্যতামূলক নয়।',
        opt_2_6_3c: 'পৃথিবীসহ সকল গ্রহেই এটি ঘটে।',
        opt_2_6_3d: 'নিউটনের সূত্রের সাথে এর কোনো বিরোধ নেই।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 43,
      },
      proTipShortcut: 'খাড়া নিক্ষেপে সর্বোচ্চ বিন্দুতে: $v = 0$, কিন্তু $a = -g = -9.8\\text{ m/s}^2$!',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Dinajpur Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_6_mcq_4',
    topicId: 'top_ssc_physics_ch2_6',
    type: 'MCQ',
    stem: 'ত্বরণের মাত্রা সমীকরণ কোনটি?',
    options: [
      { id: 'opt_2_6_4a', text: '$[LT^{-2}]$', isCorrect: true },
      { id: 'opt_2_6_4b', text: '$[LT^{-1}]$', isCorrect: false },
      { id: 'opt_2_6_4c', text: '$[MLT^{-2}]$', isCorrect: false },
      { id: 'opt_2_6_4d', text: '$[L^2T^{-2}]$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $[LT^{-2}]$।',
      coreConcept: 'ত্বরণ $a = \\frac{\\text{বেগ}}{\\text{সময়}}$।',
      stepDerivation: 'বেগের মাত্রা $[v] = LT^{-1}$ এবং সময়ের মাত্রা $[t] = T$।\nঅতএব ত্বরণের মাত্রা:\n$$[a] = \\frac{[v]}{[t]} = \\frac{LT^{-1}}{T} = LT^{-2}$$',
      distractorAnalysis: {
        opt_2_6_4b: '$[LT^{-1}]$ হলো বেগের মাত্রা।',
        opt_2_6_4c: '$[MLT^{-2}]$ হলো বলের মাত্রা।',
        opt_2_6_4d: 'ভুল সূচক গণনা।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 43,
      },
      proTipShortcut: 'ত্বরণ ও মন্দন উভয়ের মাত্রা $[LT^{-2}]$ এবং SI একক $\\text{m/s}^2$।',
    },
    difficulty: 'EASY',
    boardSource: 'Sylhet Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_6_mcq_5',
    topicId: 'top_ssc_physics_ch2_6',
    type: 'MCQ',
    stem: 'কোনো গতিশীল বস্তুর বেগ প্রতি সেকেন্ডে সমান হারে বৃদ্ধি পেলে সেই ত্বরণকে কী বলে?',
    options: [
      { id: 'opt_2_6_5a', text: 'সুষম ত্বরণ (Uniform Acceleration)', isCorrect: true },
      { id: 'opt_2_6_5b', text: 'অসম ত্বরণ', isCorrect: false },
      { id: 'opt_2_6_5c', text: 'তাৎক্ষণিক মন্দন', isCorrect: false },
      { id: 'opt_2_6_5d', text: 'কেন্দ্রাতিক ত্বরণ', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: সুষম ত্বরণ (Uniform Acceleration)।',
      coreConcept: 'সময়ের সাথে যদি কোনো বস্তুর বেগ বৃদ্ধির হার সর্বদা সমান থাকে, তবে তাকে সুষম ত্বরণ বলে। যেমন মুক্তভাবে পড়ন্ত বস্তুর অভিকর্ষজ ত্বরণ।',
      stepDerivation: 'যদি প্রতি সেকেন্ডে বেগ সমান পরিমাণ (যেমন প্রতি সেকেন্ডে $9.8\\text{ m/s}$ করে) বাড়ে, তবে ত্বরণের মান ধ্রুব থাকে। এটিই সুষম ত্বরণের সংজ্ঞা।',
      distractorAnalysis: {
        opt_2_6_5b: 'অসম ত্বরণে বেগ বৃদ্ধির হার প্রতি সেকেন্ডে ভিন্ন হয়।',
        opt_2_6_5c: 'মন্দন মানে বেগ হ্রাস পাওয়া, বৃদ্ধি নয়।',
        opt_2_6_5d: 'কেন্দ্রাতিক ত্বরণ বৃত্তাকার গতির রূপ।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 42,
      },
      proTipShortcut: 'বেগ বৃদ্ধির হার ধ্রুব = সুষম ত্বরণ ($a = \\text{constant}$)।',
    },
    difficulty: 'EASY',
    boardSource: 'Jashore Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_6_cq_1',
    topicId: 'top_ssc_physics_ch2_6',
    type: 'CQ_CREATIVE',
    stem: '$72\\text{ km/h}$ বেগে চলন্ত একটি প্রাইভেট কারের চালক তার সামনে $56\\text{ m}$ দূরে রাস্তার ওপর একজন পথচারীকে দাঁড়িয়ে থাকতে দেখলেন। চালকের প্রতিক্রিয়া সময় (Reaction time) ছিল $0.5\\text{ s}$। প্রতিক্রিয়া সময় পার হওয়ার পর তিনি কড়া ব্রেক চেপে গাড়িটিতে $5\\text{ m/s}^2$ সুষম মন্দন সৃষ্টি করলেন।',
    options: null,
    explanation: {
      directAnswer: 'ত্বরণ, মন্দন ও প্রতিক্রিয়া সময় সম্পর্কিত সৃজনশীল প্রশ্নটির পুঙ্খানুপুঙ্খ সমাধান নিচে দেওয়া হলো।',
      coreConcept: 'প্রতিক্রিয়া সময়ে সমবেগে অতিক্রান্ত দূরত্ব, মন্দনে থামার দূরত্ব ও নিরাপত্তা দূরত্ব বিশ্লেষণ।',
      stepDerivation: `ক. জ্ঞানমূলক উত্তর:
সময়ের সাথে কোনো গতিশীল বস্তুর বেগ হ্রাসের হারকে মন্দন (Deceleration বা Retardation) বলে।

খ. অনুধাবনমূলক উত্তর:
মন্দন মূলত ঋণাত্মক ত্বরণ। আমরা জানি ত্বরণ $a = \\frac{v - u}{t}$। কোনো বস্তুর বেগ যদি কমতে থাকে, তবে শেষ বেগ ($v$) আদিবেগের ($u$) চেয়ে ছোট হয় ($v < u$)। ফলে লবের মান $(v - u)$ ঋণাত্মক হয়ে যায়, যার কারণে ত্বরণের মান ঋণাত্মক আসে। এই ঋণাত্মক ত্বরণকেই ধনাত্মক শব্দে 'মন্দন' হিসেবে অভিহিত করা হয়।

গ. প্রয়োগমূলক উত্তর:
প্রতিক্রিয়া সময়ে গাড়িটির অতিক্রান্ত দূরত্ব নির্ণয়:
গাড়ির আদিবেগ $u = 72\\text{ km/h} = 72 \\times \\frac{5}{18} = 20\\text{ m/s}$।
প্রতিক্রিয়া সময় (Reaction time) $t_r = 0.5\\text{ s}$।
যেহেতু প্রতিক্রিয়া সময়ে চালক কেবল সিদ্ধান্ত নেন কিন্তু ব্রেক চাপেন না, তাই এই সময়ে গাড়িটি পূর্বের আদিবেগেই সমবেগে চলতে থাকে।
অতএব প্রতিক্রিয়া সময়ে অতিক্রান্ত দূরত্ব:
$$s_1 = u \\times t_r = 20\\text{ m/s} \\times 0.5\\text{ s} = 10\\text{ m}$$
প্রতিক্রিয়া সময়ে গাড়িটি $10\\text{ m}$ দূরত্ব অতিক্রম করে।

ঘ. উচ্চতর দক্ষতামূলক উত্তর:
পথচারী দুর্ঘটনার হাত থেকে রক্ষা পাবে কি না তা গাণিতিকভাবে যাচাই:
ব্রেক চাপার পর গাড়িটির ক্ষেত্রে:
আদিবেগ $u = 20\\text{ m/s}$
মন্দন $a = 5\\text{ m/s}^2$ (অর্থাৎ ত্বরণ $=-5\\text{ m/s}^2$)
গাড়ি থেমে যাওয়ার কারণে শেষ বেগ $v = 0\\text{ m/s}$।
ব্রেক চাপার পর থামার জন্য অতিক্রান্ত দূরত্ব $s_2$ হলে:
$$v^2 = u^2 - 2a s_2$$
$$0^2 = 20^2 - 2(5) s_2$$
$$10 s_2 = 400 \\implies s_2 = \\frac{400}{10} = 40\\text{ m}$$

গাড়িটির থামার মোট প্রয়োজনীয় দূরত্ব:
$$s_{\\text{total}} = s_1 + s_2 = 10\\text{ m} + 40\\text{ m} = 50\\text{ m}$$

সিদ্ধান্ত:
পথচারীটি চালকের অবস্থান থেকে $56\\text{ m}$ দূরে দাঁড়িয়ে ছিলেন।
গাড়িটি ব্রেক কষে পুরোপুরি থেমে যেতে মোট $50\\text{ m}$ পথ অতিক্রম করে।
যেহেতু মোট অতিক্রান্ত দূরত্ব পথচারীর দূরত্বের চেয়ে কম ($50\\text{ m} < 56\\text{ m}$):
পথচারীর সামনে আরও $56 - 50 = 6\\text{ m}$ বাকি থাকতেই গাড়িটি নিরাপদে থেমে যাবে।
অতএব পথচারীটি কোনো দুর্ঘটনার শিকার হবে না এবং সম্পূর্ণ অক্ষত থাকবে।`,
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 44,
      },
      proTipShortcut: 'মোট দূরত্ব $= (u \\times t_r) + \\frac{u^2}{2a} = (20 \\times 0.5) + \\frac{400}{10} = 10 + 40 = 50\\text{ m} < 56\\text{ m}$।',
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: 'জ্ঞানমূলক (১ নম্বর): মন্দনের সঠিক সংজ্ঞা লিখলে পূর্ণ ১ নম্বর।',
      },
      kha: {
        mark: 2,
        criteria: 'অনুধাবনমূলক (২ নম্বর): বেগ হ্রাসের কারণে ত্বরণের ঋণাত্মক মানই কেন মন্দন তা ব্যাখ্যা করলে পূর্ণ ২ নম্বর।',
      },
      ga: {
        mark: 3,
        criteria: 'প্রয়োগমূলক (৩ নম্বর): বেগকে $20\\text{ m/s}$-এ রূপান্তর করে প্রতিক্রিয়া সময়ের দূরত্ব $10\\text{ m}$ বের করলে পূর্ণ ৩ নম্বর।',
      },
      gha: {
        mark: 4,
        criteria: 'উচ্চতর দক্ষতামূলক (৪ নম্বর): ব্রেকিং দূরত্ব $40\\text{ m}$, মোট দূরত্ব $50\\text{ m}$ বের করে $56\\text{ m}$-এর সাথে তুলনাপূর্বক পথচারীর নিরাপত্তার সিদ্ধান্ত দিলে পূর্ণ ৪ নম্বর।',
      },
    },
    difficulty: 'HARD',
    boardSource: 'Barishal Board 2024 Model Question',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_6_cq_2',
    topicId: 'top_ssc_physics_ch2_6',
    type: 'CQ_CREATIVE',
    stem: 'একটি পরীক্ষামূলক মডেল রকেট ভূমি থেকে স্থির অবস্থা থেকে যাত্রা শুরু করে প্রথম $10\\text{ s}$ ধরে $8\\text{ m/s}^2$ সুষম ত্বরণে খাড়া উপরের দিকে উঠল। এই সময়ে রকেটের সমস্ত জ্বালানি সম্পূর্ণ নিঃশেষ হয়ে গেল। এরপর রকেটটি কেবল মহাকর্ষীয় বলের প্রভাবে আরও কিছুদূর উপরে উঠে সর্বোচ্চ বিন্দুতে পৌঁছাল এবং পরিশেষে মুক্তভাবে ভূমিতে ফিরে আসল। ($g = 9.8\\text{ m/s}^2$, বাতাসের বাধা উপেক্ষা করা হলো)।',
    options: null,
    explanation: {
      directAnswer: 'ত্বরণ ও অভিকর্ষজ মন্দন বিষয়ক রকেটের গতিশীলতার সৃজনশীল প্রশ্নটির পুঙ্খানুপুঙ্খ সমাধান নিচে দেওয়া হলো।',
      coreConcept: 'সুষম ত্বরণে আরোহণ, জ্বালানিহীন অবস্থায় অভিকর্ষজ মন্দনে সর্বোচ্চ উচ্চতা লাভ এবং মুক্ত পতনের মোট সময়।',
      stepDerivation: `ক. জ্ঞানমূলক উত্তর:
সময়ের সাথে কোনো বস্তুর বেগ বৃদ্ধির হার সর্বদা সমান থাকলে তাকে সুষম ত্বরণ (Uniform Acceleration) বলে।

খ. অনুধাবনমূলক উত্তর:
অভিকর্ষজ ত্বরণ নির্ভর করে পৃথিবীর কেন্দ্র থেকে দূরত্বের ওপর ($g = \\frac{GM}{R^2}$)। পৃথিবী সম্পূর্ণ গোলাকার নয়, বরং উত্তর-দক্ষিণে সামান্য চাপা এবং বিষুবীয় অঞ্চলে কিছুটা স্ফীত। ফলে বিষুবীয় অঞ্চলে পৃথিবীর ব্যাসার্ধ ($R$) সবচেয়ে বেশি হওয়ায় $g$-এর মান সর্বনিম্ন ($9.78\\text{ m/s}^2$) এবং মেরু অঞ্চলে ব্যাসার্ধ সর্বনিম্ন হওয়ায় $g$-এর মান সর্বোচ্চ ($9.83\\text{ m/s}^2$) হয়। এছাড়া ভূপৃষ্ঠ থেকে যত উপরে বা গভীরে যাওয়া যায়, $g$-এর মান তত হ্রাস পায়।

গ. প্রয়োগমূলক উত্তর:
জ্বালানি শেষ হওয়ার মুহূর্তে রকেটের বেগ ও অতিক্রান্ত উচ্চতা নির্ণয়:
আদিবেগ $u_1 = 0\\text{ m/s}$
ত্বরণ $a = 8\\text{ m/s}^2$
সময় $t_1 = 10\\text{ s}$
১. জ্বালানি শেষের বেগ ($v_1$):
$$v_1 = u_1 + a t_1 = 0 + (8 \\times 10) = 80\\text{ m/s}$$
২. প্রথম ১০ সেকেন্ডে অর্জিত উচ্চতা ($h_1$):
$$h_1 = u_1 t_1 + \\frac{1}{2} a t_1^2 = 0 + \\frac{1}{2} \\times 8 \\times (10)^2 = 4 \\times 100 = 400\\text{ m}$$
জ্বালানি শেষের মুহূর্তে রকেটের বেগ ছিল $80\\text{ m/s}$ এবং এটি মাটি থেকে $400\\text{ m}$ উচ্চতায় ছিল।

ঘ. উচ্চতর দক্ষতামূলক উত্তর:
জ্বালানি শেষ হওয়ার পর সর্বোচ্চ উচ্চতা লাভ ও ভূমিতে পতনের বিশ্লেষণ:
জ্বালানি শেষের পর রকেটের আদিবেগ $u_2 = v_1 = 80\\text{ m/s}$।
এখানে ত্বরণ নেই, বরং অভিকর্ষের বিপরীতে মন্দন $g = 9.8\\text{ m/s}^2$ কাজ করবে। সর্বোচ্চ বিন্দুতে বেগ $v_2 = 0\\text{ m/s}$।
১. অতিরিক্ত উচ্চতা ($h_2$):
$$v_2^2 = u_2^2 - 2g h_2$$
$$0 = 80^2 - 2(9.8) h_2 \\implies 19.6 h_2 = 6400 \\implies h_2 = \\frac{6400}{19.6} \\approx 326.53\\text{ m}$$
অতএব ভূমি থেকে রকেটের সর্বোচ্চ উচ্চতা:
$$H_{\\text{max}} = h_1 + h_2 = 400 + 326.53 = 726.53\\text{ m}$$

২. সর্বোচ্চ বিন্দুতে পৌঁছাতে অতিরিক্ত সময় ($t_2$):
$$v_2 = u_2 - g t_2 \\implies 0 = 80 - 9.8 t_2 \\implies t_2 = \\frac{80}{9.8} \\approx 8.16\\text{ s}$$
সর্বোচ্চ বিন্দুতে পৌঁছানোর মোট সময় $= t_1 + t_2 = 10 + 8.16 = 18.16\\text{ s}$।

৩. সর্বোচ্চ বিন্দু ($726.53\\text{ m}$) থেকে ভূমিতে পড়ার সময় ($t_3$):
সর্বোচ্চ বিন্দুতে আদিবেগ $0$।
$$H_{\\text{max}} = \\frac{1}{2} g t_3^2 \\implies 726.53 = \\frac{1}{2} \\times 9.8 \\times t_3^2 = 4.9 t_3^2$$
$$t_3^2 = \\frac{726.53}{4.9} \\approx 148.27 \\implies t_3 = \\sqrt{148.27} \\approx 12.18\\text{ s}$$

অতএব যাত্রা শুরুর পর থেকে ভূমিতে পড়ার মোট সময়:
$$T_{\\text{total}} = t_1 + t_2 + t_3 = 10 + 8.16 + 12.18 = 30.34\\text{ s}$$
সিদ্ধান্ত:
রকেটটি ভূমি থেকে সর্বোচ্চ $726.53\\text{ m}$ উচ্চতায় উঠবে এবং যাত্রা শুরুর মোট $30.34\\text{ s}$ পর পুনরায় ভূমিতে আছড়ে পড়বে।`,
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 47,
      },
      proTipShortcut: 'রকেটের অঙ্ক দুই ভাগে ভাগ করতে হয়: জ্বালানিকাল ($a=8$) এবং জ্বালানিহীনকাল ($a=-g=-9.8$)।',
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: 'জ্ঞানমূলক (১ নম্বর): সুষম ত্বরণের সঠিক সংজ্ঞা লিখলে পূর্ণ ১ নম্বর।',
      },
      kha: {
        mark: 2,
        criteria: 'অনুধাবনমূলক (২ নম্বর): পৃথিবীর আকার ও দূরত্বের ওপর $g$-এর মানের পরিবর্তনের কারণ লিখলে পূর্ণ ২ নম্বর।',
      },
      ga: {
        mark: 3,
        criteria: 'প্রয়োগমূলক (৩ নম্বর): জ্বালানি শেষের মুহূর্তে বেগ $80\\text{ m/s}$ এবং উচ্চতা $400\\text{ m}$ সঠিকভাবে বের করলে পূর্ণ ৩ নম্বর।',
      },
      gha: {
        mark: 4,
        criteria: 'উচ্চতর দক্ষতামূলক (৪ নম্বর): সর্বোচ্চ উচ্চতা ($726.53\\text{ m}$) ও ভূমিতে পড়ার মোট সময় ($30.34\\text{ s}$) গাণিতিক ধাপে নিখুঁতভাবে বের করলে পূর্ণ ৪ নম্বর।',
      },
    },
    difficulty: 'HARD',
    boardSource: 'Dhaka Board 2024 Model Question',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 2.7: গতির সমীকরণ (Equations of Motion) [top_ssc_physics_ch2_7]
  // =========================================================================
  {
    id: 'q_ch2_7_mcq_1',
    topicId: 'top_ssc_physics_ch2_7',
    type: 'MCQ',
    stem: 'একটি গাড়ি $10\\text{ m/s}$ আদিবেগে যাত্রা করে $2\\text{ m/s}^2$ সুষম ত্বরণে $5\\text{ s}$ চললে গাড়িটির শেষ বেগ কত হবে?',
    options: [
      { id: 'opt_2_7_1a', text: '$20\\text{ m/s}$', isCorrect: true },
      { id: 'opt_2_7_1b', text: '$25\\text{ m/s}$', isCorrect: false },
      { id: 'opt_2_7_1c', text: '$15\\text{ m/s}$', isCorrect: false },
      { id: 'opt_2_7_1d', text: '$30\\text{ m/s}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $20\\text{ m/s}$।',
      coreConcept: 'গতির প্রথম সমীকরণ: $v = u + at$।',
      stepDerivation: 'দেওয়া আছে, আদিবেগ $u = 10\\text{ m/s}$, ত্বরণ $a = 2\\text{ m/s}^2$, সময় $t = 5\\text{ s}$।\n$$v = u + at = 10 + (2 \\times 5) = 10 + 10 = 20\\text{ m/s}$$',
      distractorAnalysis: {
        opt_2_7_1b: '$10 + (2 \\times 5) + 5$ ইত্যাদি ভুল হিসাব।',
        opt_2_7_1c: 'ত্বরণ ও সময় যোগ করে আদিবেগে যোগ করার ভুল।',
        opt_2_7_1d: 'ভুল গুণফল।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 42,
      },
      proTipShortcut: '$v = u + at = 10 + 10 = 20\\text{ m/s}$।',
    },
    difficulty: 'EASY',
    boardSource: 'Cumilla Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_7_mcq_2',
    topicId: 'top_ssc_physics_ch2_7',
    type: 'MCQ',
    stem: 'স্থির অবস্থান থেকে সুষম ত্বরণে চলমান কোনো বস্তু প্রথম সেকেন্ডে ($১\\text{ s}$) $2\\text{ m}$ পথ অতিক্রম করলে, দ্বিতীয় সেকেন্ডে ($২$-তম সেকেন্ডে) বস্তুটি কত দূরত্ব অতিক্রম করবে?',
    options: [
      { id: 'opt_2_7_2a', text: '$6\\text{ m}$', isCorrect: true },
      { id: 'opt_2_7_2b', text: '$4\\text{ m}$', isCorrect: false },
      { id: 'opt_2_7_2c', text: '$8\\text{ m}$', isCorrect: false },
      { id: 'opt_2_7_2d', text: '$2\\text{ m}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $6\\text{ m}$।',
      coreConcept: '$t$-তম সেকেন্ডে অতিক্রান্ত দূরত্ব $s_t = u + \\frac{1}{2}a(2t - 1)$ অথবা প্রথম ২ সেকেন্ডের দূরত্ব থেকে ১ম সেকেন্ডের দূরত্ব বিয়োগ।',
      stepDerivation: 'স্থির অবস্থান হওয়ায় $u = 0$। প্রথম ১ সেকেন্ডে দূরত্ব $s_1 = \\frac{1}{2} a (1)^2 = 2\\text{ m} \\implies a = 4\\text{ m/s}^2$।\nপ্রথম ২ সেকেন্ডে মোট দূরত্ব $s_2 = \\frac{1}{2} a (2)^2 = \\frac{1}{2} \\times 4 \\times 4 = 8\\text{ m}$।\nঅতএব কেবল ২য় সেকেন্ডে অতিক্রান্ত দূরত্ব:\n$$\\Delta s = s_2 - s_1 = 8\\text{ m} - 2\\text{ m} = 6\\text{ m}$$\n(অথবা সূত্রে: $s_t = 0 + \\frac{1}{2} \\times 4 \\times (2 \\times 2 - 1) = 2 \\times 3 = 6\\text{ m}$)।',
      distractorAnalysis: {
        opt_2_7_2b: '$4\\text{ m}$ ত্বরণের মান, দূরত্বের নয়।',
        opt_2_7_2c: '$8\\text{ m}$ হলো প্রথম দুই সেকেন্ডে অতিক্রান্ত মোট দূরত্ব, শুধু দ্বিতীয় সেকেন্ডে নয়।',
        opt_2_7_2d: 'সমবেগ হলে প্রতি সেকেন্ডে ২ মি হতো, কিন্তু ত্বরণে দূরত্ব প্রতি সেকেন্ডে বাড়ে।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 45,
      },
      proTipShortcut: 'স্থির থেকে অনুপাত সর্বদা বিজোড় সংখ্যার অনুপাত: ১ : ৩ : ৫ : ৭! ১ম সেকেন্ডে ২ হলে ২য় সেকেন্ডে $২ \\times ৩ = ৬\\text{ m}$!',
    },
    difficulty: 'HARD',
    boardSource: 'Rajshahi Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_7_mcq_3',
    topicId: 'top_ssc_physics_ch2_7',
    type: 'MCQ',
    stem: 'একটি বস্তু $u$ আদিবেগে $a$ সুষম ত্বরণে চললে এর $t$-তম সেকেন্ডে (যেমন ৫ম বা ৮ম সেকেন্ডে) অতিক্রান্ত দূরত্বের সঠিক গাণিতিক সূত্র কোনটি?',
    options: [
      { id: 'opt_2_7_3a', text: '$s_t = u + \\frac{1}{2}a(2t - 1)$', isCorrect: true },
      { id: 'opt_2_7_3b', text: '$s_t = ut + \\frac{1}{2}at^2$', isCorrect: false },
      { id: 'opt_2_7_3c', text: '$s_t = u + at$', isCorrect: false },
      { id: 'opt_2_7_3d', text: '$s_t = \\frac{u+v}{2}t$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $s_t = u + \\frac{1}{2}a(2t - 1)$।',
      coreConcept: '$t$-তম সেকেন্ডের দূরত্ব হলো $t$ সেকেন্ডের অতিক্রান্ত মোট দূরত্ব এবং $(t-1)$ সেকেন্ডের মোট দূরত্বের বিয়োগফল।',
      stepDerivation: '$$s_t = s(t) - s(t-1) = [ut + \\frac{1}{2}at^2] - [u(t-1) + \\frac{1}{2}a(t-1)^2]$$\n$$= ut + \\frac{1}{2}at^2 - ut + u - \\frac{1}{2}a(t^2 - 2t + 1) = u + \\frac{1}{2}a(2t - 1)$$',
      distractorAnalysis: {
        opt_2_7_3b: 'এটি মোট $t$ সেকেন্ডে অতিক্রান্ত দূরত্বের সাধারণ সমীকরণ।',
        opt_2_7_3c: 'এটি শেষ বেগের সমীকরণ।',
        opt_2_7_3d: 'এটি গড় বেগের মাধ্যমে দূরত্বের সমীকরণ।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 45,
      },
      proTipShortcut: '$t$-তম সেকেন্ডের সূত্র: $s_t = u + \\frac{1}{2}a(2t - 1)$।',
    },
    difficulty: 'MEDIUM',
    boardSource: 'Jashore Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_7_mcq_4',
    topicId: 'top_ssc_physics_ch2_7',
    type: 'MCQ',
    stem: 'স্থির অবস্থান থেকে সুষম ত্বরণে চলমান কোনো বস্তুর অতিক্রান্ত দূরত্ব ($s$) সময়ের ($t$) সাথে কীভাবে সম্পর্কিত?',
    options: [
      { id: 'opt_2_7_4a', text: '$s \\propto t^2$ (দূরত্ব সময়ের বর্গের সমানুপাতিক)', isCorrect: true },
      { id: 'opt_2_7_4b', text: '$s \\propto t$', isCorrect: false },
      { id: 'opt_2_7_4c', text: '$s \\propto \\sqrt{t}$', isCorrect: false },
      { id: 'opt_2_7_4d', text: '$s \\propto \\frac{1}{t}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $s \\propto t^2$।',
      coreConcept: 'গতির সমীকরণ $s = ut + \\frac{1}{2}at^2$-এ আদিবেগ $u = 0$ এবং ত্বরণ $a$ ধ্রুব হলে $s \\propto t^2$ হয়।',
      stepDerivation: 'স্থির অবস্থান থেকে সুষম ত্বরণে চললে:\n$$s = 0 + \\frac{1}{2}at^2 = (\\frac{1}{2}a) t^2$$\nযেহেতু $\\frac{1}{2}a$ একটি ধ্রুবক, তাই $s \\propto t^2$। এর অর্থ সময় ২ গুণ বাড়লে দূরত্ব ৪ গুণ বাড়বে, সময় ৩ গুণ বাড়লে দূরত্ব ৯ গুণ বাড়বে।',
      distractorAnalysis: {
        opt_2_7_4b: 'সমবেগে চললে $s \\propto t$ হয় ($s = vt$)।',
        opt_2_7_4c: 'ভুল বর্গমূল অনুপাত।',
        opt_2_7_4d: 'দূরত্ব সময়ের ব্যস্তানুপাতিক হতে পারে না।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 44,
      },
      proTipShortcut: 'স্থির থেকে সুষম ত্বরণ: বেগ সময়ের সমানুপাতিক ($v \\propto t$), দূরত্ব সময়ের বর্গের সমানুপাতিক ($s \\propto t^2$)।',
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_7_mcq_5',
    topicId: 'top_ssc_physics_ch2_7',
    type: 'MCQ',
    stem: 'গতির চারটি মৌলিক সমীকরণের মধ্যে কোন সমীকরণটিতে সময়ের ($t$) কোনো প্রত্যক্ষ উল্লেখ থাকে না?',
    options: [
      { id: 'opt_2_7_5a', text: '$v^2 = u^2 + 2as$', isCorrect: true },
      { id: 'opt_2_7_5b', text: '$v = u + at$', isCorrect: false },
      { id: 'opt_2_7_5c', text: '$s = ut + \\frac{1}{2}at^2$', isCorrect: false },
      { id: 'opt_2_7_5d', text: '$s = \\frac{u+v}{2}t$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $v^2 = u^2 + 2as$।',
      coreConcept: 'যেসব গাণিতিক সমস্যায় সময় ($t$) দেওয়া থাকে না এবং সময় বের করার দরকার হয় না, সেখানে সরাসরি $v^2 = u^2 + 2as$ সূত্র ব্যবহার করা হয়।',
      stepDerivation: 'প্রথম সমীকরণ $v = u + at$ থেকে $t = \\frac{v - u}{a}$ মান নিয়ে দ্বিতীয় সমীকরণ $s = (\\frac{u+v}{2})t$-এ বসালে সময় অপসারিত হয়ে $v^2 = u^2 + 2as$ প্রতিপাদিত হয়।',
      distractorAnalysis: {
        opt_2_7_5b: 'এই সমীকরণটিতে সরাসরি সময় চলক $t$ উপস্থিত রয়েছে।',
        opt_2_7_5c: 'এই সমীকরণটিতে সরাসরি সময় চলক $t$ উপস্থিত রয়েছে।',
        opt_2_7_5d: 'এই সমীকরণটিতে সরাসরি সময় চলক $t$ উপস্থিত রয়েছে।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 44,
      },
      proTipShortcut: 'সময় অনুপস্থিত? চোখ বন্ধ করে $v^2 = u^2 + 2as$ বেছে নাও!',
    },
    difficulty: 'EASY',
    boardSource: 'Chattogram Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_7_cq_1',
    topicId: 'top_ssc_physics_ch2_7',
    type: 'CQ_CREATIVE',
    stem: 'একটি বাস স্থির অবস্থান থেকে $2\\text{ m/s}^2$ সুষম ত্বরণে চলা শুরু করল। ঠিক একই মুহূর্তে বাসের $100\\text{ m}$ পেছন থেকে একটি প্রাইভেট কার $25\\text{ m/s}$ সমবেগে একই অভিমুখে যাত্রা শুরু করল। প্রাইভেট কারের চালক ও বাসের যাত্রীদের মধ্যে কে কাকে কখন অতিক্রম করবে তা নিয়ে কৌতূহল সৃষ্টি হলো।',
    options: null,
    explanation: {
      directAnswer: 'গতির সমীকরণ ও মিলিত হওয়ার সৃজনশীল প্রশ্নটির পুঙ্খানুপুঙ্খ গাণিতিক সমাধান নিচে দেওয়া হলো।',
      coreConcept: 'সুষম ত্বরণ বনাম সমবেগে পশ্চাদ্ধাবন, দ্বিঘাত সমীকরণ সমাধান এবং মিলিত হওয়ার দ্বৈত মুহূর্ত বিশ্লেষণ।',
      stepDerivation: `ক. জ্ঞানমূলক উত্তর:
সময়ের সাথে কোনো বস্তুর বেগের পরিবর্তনের হারকে ত্বরণ বলে এবং এর একক হলো $\\text{m/s}^2$।

খ. অনুধাবনমূলক উত্তর:
আমরা জানি ত্বরণ হলো $a = \\frac{v - u}{t}$। যদি কোনো বস্তু সমবেগে চলে, তবে সময়ের সাথে তার আদিবেগ ও শেষ বেগ সর্বদা সমান থাকে ($v = u$)।
ফলে বেগের পরিবর্তন $(v - u) = 0$ হয়।
অতএব ত্বরণ $a = \\frac{0}{t} = 0$। একারণে সমবেগে চলমান কোনো বস্তুর ত্বরণ সর্বদা শূন্য হয়।

গ. প্রয়োগমূলক উত্তর:
প্রাইভেট কারটি বাসটিকে প্রথমবার কখন অতিক্রম করবে তা নির্ণয়:
ধরি যাত্রা শুরুর $t$ সেকেন্ড পর প্রাইভেট কার বাসটিকে অতিক্রম করবে।
বাসের আদিবেগ $u_b = 0$, ত্বরণ $a = 2\\text{ m/s}^2$।
$t$ সেকেন্ডে বাসের অতিক্রান্ত দূরত্ব:
$$s_b = u_b t + \\frac{1}{2} a t^2 = 0 + \\frac{1}{2} \\times 2 \\times t^2 = t^2$$

প্রাইভেট কারের বেগ $v_c = 25\\text{ m/s}$ (সমবেগ)।
$t$ সেকেন্ডে প্রাইভেট কারের অতিক্রান্ত দূরত্ব:
$$s_c = v_c \\times t = 25t$$

যেহেতু বাসটি প্রাইভেট কারের $100\\text{ m}$ সামনে ছিল, তাই প্রাইভেট কারটি বাসকে ধরতে হলে শর্তমতে:
$$s_c = s_b + 100$$
$$25t = t^2 + 100$$
$$t^2 - 25t + 100 = 0$$
উৎপাদকে বিশ্লেষণ করি:
$$t^2 - 20t - 5t + 100 = 0$$
$$t(t - 20) - 5(t - 20) = 0$$
$$(t - 5)(t - 20) = 0$$
সুতরাং $t = 5\\text{ s}$ অথবা $t = 20\\text{ s}$।
অতএব প্রাইভেট কারটি যাত্রা শুরুর মাত্র $5\\text{ s}$ পরেই বাসটিকে প্রথমবারের মতো অতিক্রম করবে।

ঘ. উচ্চতর দক্ষতামূলক উত্তর:
যাত্রাপথে উভয় যান পরস্পরকে কতবার অতিক্রম করবে তার পূর্ণাঙ্গ মূল্যায়ন:
সমীকরণের দুটি বাস্তব ও ধনাত্মক সমাধান বের হয়েছে: $t = 5\\text{ s}$ এবং $t = 20\\text{ s}$।
এর ভৌত তাৎপর্য নিচে বিশ্লেষণ করা হলো:

১. প্রথম অতিক্রম ($t = 5\\text{ s}$):
প্রথম ৫ সেকেন্ডে বাসের অর্জিত বেগ মাত্র $v = 0 + (2 \\times 5) = 10\\text{ m/s}$।
যেহেতু প্রাইভেট কারের বেগ $25\\text{ m/s}$, যা বাসের বেগের চেয়ে বেশি, তাই $t = 5\\text{ s}$-এ প্রাইভেট কারটি বাসের $100\\text{ m}$ পেছনের ব্যবধান ঘুচিয়ে বাসটিকে অতিক্রম করে সামনে চলে যাবে।

২. দ্বিতীয় অতিক্রম ($t = 20\\text{ s}$):
বাসটি সুষম ত্বরণে ($2\\text{ m/s}^2$) চলায় এর বেগ প্রতি সেকেন্ডে বাড়তে থাকে।
$t = 12.5\\text{ s}$ সময়ে বাসের বেগ প্রাইভেট কারের সমান ($25\\text{ m/s}$) হয় এবং এরপর বাসের বেগ প্রাইভেট কারের বেগকে ছাড়িয়ে যায়।
$t = 20\\text{ s}$ সময়ে বাসের বেগ দাঁড়ায় $v = 0 + (2 \\times 20) = 40\\text{ m/s}$।
এই উচ্চবেগের কারণে পিছন থেকে দ্রুত ছুটে এসে বাসটি এবার প্রাইভেট কারকে অতিক্রম করে চিরতরে সামনে চলে যাবে।

সিদ্ধান্ত:
যাত্রাপথে প্রাইভেট কার ও বাস পরস্পরকে মোট **২ বার** অতিক্রম করবে। প্রথমবার $5\\text{ s}$ সময়ে কারটি বাসকে সামনে ফেলে এগিয়ে যাবে এবং দ্বিতীয়বার $20\\text{ s}$ সময়ে বাসটি কারকে অতিক্রম করে সামনে চলে যাবে।`,
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 45,
      },
      proTipShortcut: '$t^2 - 25t + 100 = 0 \\implies t = 5\\text{ s}$ ও $20\\text{ s}$। মোট ২ বার অতিক্রম ঘটবে।',
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: 'জ্ঞানমূলক (১ নম্বর): ত্বরণের সংজ্ঞা ও একক লিখলে পূর্ণ ১ নম্বর।',
      },
      kha: {
        mark: 2,
        criteria: 'অনুধাবনমূলক (২ নম্বর): সমবেগে বেগের পরিবর্তন শূন্য হওয়ায় ত্বরণ কেন শূন্য হয় তা ব্যাখ্যা করলে পূর্ণ ২ নম্বর।',
      },
      ga: {
        mark: 3,
        criteria: 'প্রয়োগমূলক (৩ নম্বর): দ্বিঘাত সমীকরণ গঠন করে প্রথম অতিক্রমের সময় $5\\text{ s}$ বের করলে পূর্ণ ৩ নম্বর।',
      },
      gha: {
        mark: 4,
        criteria: 'উচ্চতর দক্ষতামূলক (৪ নম্বর): $t = 5\\text{ s}$ ও $t = 20\\text{ s}$-এ বেগের তারতম্য বিশ্লেষণ করে মোট ২ বার অতিক্রমের সিদ্ধান্ত প্রমাণ করলে পূর্ণ ৪ নম্বর।',
      },
    },
    difficulty: 'HARD',
    boardSource: 'Dhaka Board 2024 Model Question',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_7_cq_2',
    topicId: 'top_ssc_physics_ch2_7',
    type: 'CQ_CREATIVE',
    stem: 'একটি ট্রেন স্টেশন $A$ থেকে স্থির অবস্থা থেকে ছেড়ে $0.5\\text{ m/s}^2$ সুষম ত্বরণে $1\\text{ min}$ চলার পর পরবর্তী $2\\text{ min}$ সমবেগে চলে। এরপর পরবর্তী স্টেশন $B$-তে থামার জন্য চালক ব্রেক কষে $1.0\\text{ m/s}^2$ সুষম মন্দনে ট্রেনটিকে থামিয়ে দেন।',
    options: null,
    explanation: {
      directAnswer: 'গতির তিন ধাপের দূরত্ব ও বেগ-সময় লেখচিত্রের সৃজনশীল প্রশ্নটির পুঙ্খানুপুঙ্খ সমাধান নিচে দেওয়া হলো।',
      coreConcept: 'ত্বরণ, সমবেগ ও মন্দনের ত্রি-পর্যায়ী গতি এবং বেগ-সময় লেখচিত্রের ক্ষেত্রফল দিয়ে দূরত্ব নির্ণয়।',
      stepDerivation: `ক. জ্ঞানমূলক উত্তর:
কোনো গতিশীল বস্তু যে বেগ নিয়ে তার গতি বা পর্যবেক্ষণ শুরু করে তাকে ঐ বস্তুর আদিবেগ (Initial Velocity) বলে।

খ. অনুধাবনমূলক উত্তর:
$v^2 = u^2 + 2as$ সমীকরণটিতে বস্তুর আদিবেগ ($u$), শেষ বেগ ($v$), ত্বরণ ($a$) এবং অতিক্রান্ত দূরত্ব ($s$)-এর সম্পর্ক নির্দেশ করা হয়েছে। $v = u + at$ এবং $s = (\\frac{u+v}{2})t$ সমীকরণ দুটি থেকে অপনয়ন পদ্ধতিতে সময় $t$-কে অপসারণ করে এই সমীকরণটি প্রতিপাদন করা হয়। তাই এই সূত্রে সময়ের কোনো প্রত্যক্ষ উল্লেখ নেই।

গ. প্রয়োগমূলক উত্তর:
১ম মিনিটে অর্জিত সর্বোচ্চ বেগ এবং মন্দনকালের সময় নির্ণয়:
১ম পর্যায়ের জন্য:
আদিবেগ $u_1 = 0\\text{ m/s}$
ত্বরণ $a_1 = 0.5\\text{ m/s}^2$
সময় $t_1 = 1\\text{ min} = 60\\text{ s}$
সর্বোচ্চ বেগ ($v_{\\text{max}}$):
$$v_{\\text{max}} = u_1 + a_1 t_1 = 0 + (0.5 \\times 60) = 30\\text{ m/s}$$

৩য় পর্যায় (মন্দনকাল):
আদিবেগ $u_3 = v_{\\text{max}} = 30\\text{ m/s}$
মন্দন $a_3 = 1.0\\text{ m/s}^2$ (ত্বরণ $=-1.0\\text{ m/s}^2$)
শেষ বেগ $v_3 = 0\\text{ m/s}$।
মন্দনকালের সময় ($t_3$):
$$v_3 = u_3 - a_3 t_3 \\implies 0 = 30 - 1.0 t_3 \\implies t_3 = 30\\text{ s}$$
অতএব ১ম মিনিটে অর্জিত সর্বোচ্চ বেগ $30\\text{ m/s}$ এবং মন্দনকালের সময় $30\\text{ s}$।

ঘ. উচ্চতর দক্ষতামূলক উত্তর:
দুই স্টেশনের মধ্যবর্তী মোট দূরত্ব নির্ণয় ও লেখচিত্রীয় যাচাই:

১. গাণিতিক পদ্ধতিতে ৩টি ধাপের দূরত্বের হিসাব:
- ১ম ধাপ (ত্বরণকাল, $60\\text{ s}$):
$$s_1 = u_1 t_1 + \\frac{1}{2} a_1 t_1^2 = 0 + \\frac{1}{2} \\times 0.5 \\times 60^2 = 0.25 \\times 3600 = 900\\text{ m}$$
- ২য় ধাপ (সমবেগকাল, $t_2 = 2\\text{ min} = 120\\text{ s}$, সমবেগ $30\\text{ m/s}$):
$$s_2 = v_{\\text{max}} \\times t_2 = 30 \\times 120 = 3600\\text{ m}$$
- ৩য় ধাপ (মন্দনকাল, $t_3 = 30\\text{ s}$):
$$s_3 = \\frac{u_3 + v_3}{2} \\times t_3 = \\frac{30 + 0}{2} \\times 30 = 15 \\times 30 = 450\\text{ m}$$
মোট দূরত্ব:
$$S = s_1 + s_2 + s_3 = 900 + 3600 + 450 = 4950\\text{ m} = 4.95\\text{ km}$$

২. বেগ-সময় ($v-t$) লেখচিত্রের ক্ষেত্রফল দিয়ে যাচাই:
বেগ-সময় লেখচিত্রে সময় অক্ষের সাথে লেখচিত্রটি একটি ট্রাপিজিয়াম তৈরি করে:
- ট্রাপিজিয়ামের সমান্তরাল বাহুদ্বয়ের দৈর্ঘ্য:
নিচের বাহু (মোট সময়) $T = 60 + 120 + 30 = 210\\text{ s}$।
উপরের সমান্তরাল বাহু (সমবেগের সময়) $t_2 = 120\\text{ s}$।
- লম্ব উচ্চতা (সর্বোচ্চ বেগ) $h = 30\\text{ m/s}$।
ট্রাপিজিয়ামের ক্ষেত্রফল:
$$\\text{ক্ষেত্রফল} = \\frac{1}{2} \\times (\\text{সমান্তরাল বাহুদ্বয়ের যোগফল}) \\times \\text{উচ্চতা}$$
$$\\text{ক্ষেত্রফল} = \\frac{1}{2} \\times (210 + 120) \\times 30 = \\frac{1}{2} \\times 330 \\times 30 = 330 \\times 15 = 4950\\text{ m}$$

সিদ্ধান্ত:
দেখা যাচ্ছে যে গাণিতিক সূত্রে প্রাপ্ত মোট দূরত্ব $4950\\text{ m}$ এবং $v-t$ লেখচিত্রের ক্ষেত্রফল $4950\\text{ m}$ হুবহু এক ও অভিন্ন। অতএব দুই স্টেশনের মধ্যবর্তী দূরত্ব $4.95\\text{ km}$।`,
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 46,
      },
      proTipShortcut: 'ট্রাপিজিয়াম ক্ষেত্রফল $= \\frac{210 + 120}{2} \\times 30 = 4950\\text{ m}$!',
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: 'জ্ঞানমূলক (১ নম্বর): আদিবেগের সঠিক সংজ্ঞা লিখলে পূর্ণ ১ নম্বর।',
      },
      kha: {
        mark: 2,
        criteria: 'অনুধাবনমূলক (২ নম্বর): সমীকরণটিতে সময় অপনয়নের প্রক্রিয়া ব্যাখ্যা করলে পূর্ণ ২ নম্বর।',
      },
      ga: {
        mark: 3,
        criteria: 'প্রয়োগমূলক (৩ নম্বর): সর্বোচ্চ বেগ ($30\\text{ m/s}$) ও মন্দনকালের সময় ($30\\text{ s}$) সঠিকভাবে নির্ণয় করলে পূর্ণ ৩ নম্বর।',
      },
      gha: {
        mark: 4,
        criteria: 'উচ্চতর দক্ষতামূলক (৪ নম্বর): তিন ধাপের মোট দূরত্ব ($4950\\text{ m}$) এবং ট্রাপিজিয়ামের ক্ষেত্রফলের সাহায্যে সত্যতা প্রমাণ করলে পূর্ণ ৪ নম্বর।',
      },
    },
    difficulty: 'HARD',
    boardSource: 'Rajshahi Board 2024 Model Question',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },

  // =========================================================================
  // Topic 2.8: পতনশীল বস্তুর সূত্র ও লেখচিত্র (Falling Bodies & Graphs) [top_ssc_physics_ch2_8]
  // =========================================================================
  {
    id: 'q_ch2_8_mcq_1',
    topicId: 'top_ssc_physics_ch2_8',
    type: 'MCQ',
    stem: 'গ্যালিলিওর পড়ন্ত বস্তুর দ্বিতীয় সূত্র অনুযায়ী মুক্তভাবে পড়ন্ত কোনো বস্তুর নির্দিষ্ট সময়ে প্রাপ্ত বেগ ($v$) ঐ সময়ের ($t$) সাথে কীভাবে সম্পর্কিত?',
    options: [
      { id: 'opt_2_8_1a', text: '$v \\propto t$ (বেগ সময়ের সমানুপাতিক)', isCorrect: true },
      { id: 'opt_2_8_1b', text: '$v \\propto t^2$', isCorrect: false },
      { id: 'opt_2_8_1c', text: '$v \\propto \\sqrt{t}$', isCorrect: false },
      { id: 'opt_2_8_1d', text: '$v \\propto \\frac{1}{t}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $v \\propto t$।',
      coreConcept: 'স্থির অবস্থান থেকে বিনা বাধায় পড়ন্ত বস্তুর নির্দিষ্ট সময়ে প্রাপ্ত বেগ ঐ সময়ের সমানুপাতিক।',
      stepDerivation: 'পড়ন্ত বস্তুর ক্ষেত্রে $v = u + gt$। আদিবেগ $u = 0$ এবং $g$ ধ্রুবক হওয়ায় সরাসরি $v \\propto t$। এর অর্থ সময় দ্বিগুণ হলে বেগ দ্বিগুণ হবে।',
      distractorAnalysis: {
        opt_2_8_1b: '$h \\propto t^2$ হলো পড়ন্ত বস্তুর তৃতীয় সূত্র (অতিক্রান্ত দূরত্বের সূত্র), বেগের নয়।',
        opt_2_8_1c: 'ভুল বর্গমূল সম্পর্ক।',
        opt_2_8_1d: 'ব্যস্তানুপাতিক সম্পর্ক অসম্ভব।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 48,
      },
      proTipShortcut: 'পড়ন্ত বস্তুর সূত্র: ২য় সূত্র $\\implies v \\propto t$; ৩য় সূত্র $\\implies h \\propto t^2$।',
    },
    difficulty: 'EASY',
    boardSource: 'Dhaka Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_8_mcq_2',
    topicId: 'top_ssc_physics_ch2_8',
    type: 'MCQ',
    stem: 'একটি বস্তুকে $49\\text{ m/s}$ বেগে খাড়া উপরের দিকে নিক্ষেপ করা হলে বস্তুটি কতক্ষণ পর পুনরায় মাটিতে ফিরে আসবে? ($g = 9.8\\text{ m/s}^2$)',
    options: [
      { id: 'opt_2_8_2a', text: '$10\\text{ s}$', isCorrect: true },
      { id: 'opt_2_8_2b', text: '$5\\text{ s}$', isCorrect: false },
      { id: 'opt_2_8_2c', text: '$9.8\\text{ s}$', isCorrect: false },
      { id: 'opt_2_8_2d', text: '$20\\text{ s}$', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: $10\\text{ s}$।',
      coreConcept: 'খাড়া নিক্ষিপ্ত বস্তুর বিচরণকাল বা মোট উড্ডয়নকাল $T = \\frac{2u}{g}$।',
      stepDerivation: 'দেওয়া আছে, আদিবেগ $u = 49\\text{ m/s}$, অভিকর্ষজ ত্বরণ $g = 9.8\\text{ m/s}^2$।\nসর্বোচ্চ উচ্চতায় ওঠার সময় $t = \\frac{u}{g} = \\frac{49}{9.8} = 5\\text{ s}$।\nনামার সময়ও হুবহু সমান ($5\\text{ s}$)।\nঅতএব মোট বিচরণকাল:\n$$T = \\frac{2u}{g} = \\frac{2 \\times 49}{9.8} = \\frac{98}{9.8} = 10\\text{ s}$$',
      distractorAnalysis: {
        opt_2_8_2b: '$5\\text{ s}$ হলো কেবল সর্বোচ্চ উচ্চতায় ওঠার সময়, মাটিতে ফেরার মোট সময় নয়।',
        opt_2_8_2c: '$9.8\\text{ s}$ ত্বরণের মানের সাথে বিভ্রান্তি।',
        opt_2_8_2d: 'দ্বিগুণ করার ভুল গণনা।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 49,
      },
      proTipShortcut: 'মোট উড্ডয়নকাল $T = \\frac{2u}{g} = \\frac{2 \\times 49}{9.8} = 10\\text{ s}$।',
    },
    difficulty: 'EASY',
    boardSource: 'Rajshahi Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_8_mcq_3',
    topicId: 'top_ssc_physics_ch2_8',
    type: 'MCQ',
    stem: 'বেগ-সময় ($v-t$) লেখচিত্রের যেকোনো অংশের রেখা এবং সময় অক্ষের মধ্যবর্তী আবদ্ধ ক্ষেত্রফল কোন ভৌত রাশি প্রকাশ করে?',
    options: [
      { id: 'opt_2_8_3a', text: 'অতিক্রান্ত দূরত্ব বা সরণ ($s$)', isCorrect: true },
      { id: 'opt_2_8_3b', text: 'ত্বরণ ($a$)', isCorrect: false },
      { id: 'opt_2_8_3c', text: 'বল ($F$)', isCorrect: false },
      { id: 'opt_2_8_3d', text: 'ক্ষমতা ($P$)', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: অতিক্রান্ত দূরত্ব বা সরণ।',
      coreConcept: 'বেগ ও সময়ের গুণফল হলো দূরত্ব ($s = v \\times t$); ফলে $v-t$ গ্রাফের নিচের ক্ষেত্রফল দূরত্ব নির্দেশ করে।',
      stepDerivation: 'লেখচিত্রে $y$-অক্ষে বেগ ($v$) এবং $x$-অক্ষে সময় ($t$) থাকে। এই দুই অক্ষের সীমাবদ্ধ ক্ষেত্রফল হলো $\\text{ক্ষেত্রফল} = \\int v dt = s$ (অতিক্রান্ত দূরত্ব)। অপরদিকে লেখচিত্রের ঢাল নির্দেশ করে ত্বরণ ($a = \\frac{dv}{dt}$)।',
      distractorAnalysis: {
        opt_2_8_3b: 'ত্বরণ হলো $v-t$ লেখচিত্রের ঢাল (Slope), ক্ষেত্রফল নয়।',
        opt_2_8_3c: 'বল ভর ও ত্বরণের গুণফল।',
        opt_2_8_3d: 'ক্ষমতা কাজের হার।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 50,
      },
      proTipShortcut: '$v-t$ লেখচিত্র: ঢাল = ত্বরণ ($a$), ক্ষেত্রফল = দূরত্ব ($s$)।',
    },
    difficulty: 'EASY',
    boardSource: 'Cumilla Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_8_mcq_4',
    topicId: 'top_ssc_physics_ch2_8',
    type: 'MCQ',
    stem: 'সরণ-সময় ($s-t$) লেখচিত্র একটি মূলবিন্দুগামী সোজা সরলরেখা হলে বস্তুটি কোন গতিতে চলছে?',
    options: [
      { id: 'opt_2_8_4a', text: 'সুষম বেগে (Uniform Velocity)', isCorrect: true },
      { id: 'opt_2_8_4b', text: 'সুষম ত্বরণে', isCorrect: false },
      { id: 'opt_2_8_4c', text: 'স্থির অবস্থায়', isCorrect: false },
      { id: 'opt_2_8_4d', text: 'সুষম মন্দনে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: সুষম বেগে (Uniform Velocity)।',
      coreConcept: '$s-t$ লেখচিত্রের ঢাল হলো বেগ ($\\frac{s}{t} = v$)। সরলরেখার ঢাল ধ্রুব থাকায় বস্তুটি সুষম বেগে চলে।',
      stepDerivation: 'যেহেতু লেখচিত্রটি একটি মূলবিন্দুগামী সোজা সরলরেখা ($s = vt$), তাই এর প্রতিটি বিন্দুতে ঢালের মান নির্দিষ্ট। ঢাল যেহেতু বেগ নির্দেশ করে, তাই বেগ ধ্রুব বা সুষম। সুষম ত্বরণ হলে লেখচিত্রটি অধিবৃত্তীয় বক্ররেখা হতো।',
      distractorAnalysis: {
        opt_2_8_4b: 'সুষম ত্বরণ হলে $s \\propto t^2$ হওয়ায় বক্ররেখা (প্যারাবোলা) হতো।',
        opt_2_8_4c: 'স্থির থাকলে সময় অক্ষের সমান্তরাল অনুভূমিক রেখা হতো।',
        opt_2_8_4d: 'মন্দন হলে ঢাল ক্রমশ হ্রাস পেত।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 50,
      },
      proTipShortcut: '$s-t$ গ্রাফ সোজা লাইন $\\implies$ সুষম বেগ; $s-t$ গ্রাফ বাঁকা $\\implies$ ত্বরণ।',
    },
    difficulty: 'EASY',
    boardSource: 'Dinajpur Board 2024',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_8_mcq_5',
    topicId: 'top_ssc_physics_ch2_8',
    type: 'MCQ',
    stem: 'একটি সম্পূর্ণ বায়ুশূন্য কাচ নলের ভেতর একই উচ্চতা থেকে একটি ভারী ধাতব মুদ্রা এবং একটি হালকা পাখির পালক একসাথে ছেড়ে দেওয়া হলে কোনটি আগে নলের তলায় পৌঁছাবে?',
    options: [
      { id: 'opt_2_8_5a', text: 'উভয়ই ঠিক একই সাথে তলায় পৌঁছাবে', isCorrect: true },
      { id: 'opt_2_8_5b', text: 'ভারী মুদ্রাটি আগে পৌঁছাবে', isCorrect: false },
      { id: 'opt_2_8_5c', text: 'হালকা পালকটি আগে পৌঁছাবে', isCorrect: false },
      { id: 'opt_2_8_5d', text: 'কোনোটিই নিচে নামবে না, ভাসবে', isCorrect: false },
    ],
    explanation: {
      directAnswer: 'সঠিক উত্তর ক: উভয়ই ঠিক একই সাথে তলায় পৌঁছাবে।',
      coreConcept: 'গ্যালিলিওর ১ম সূত্র: বায়ুর বাধা না থাকলে সকল বস্তু সমান সময়ে সমান পথ অতিক্রম করে, কারণ অভিকর্ষজ ত্বরণ $g$ ভরের ওপর নির্ভর করে না।',
      stepDerivation: 'অভিকর্ষজ ত্বরণ $g = \\frac{GM}{R^2}$। এখানে কোথাও বস্তুর ভর ($m$) নেই। ফলে হালকা বা ভারী সকল বস্তুই সমান ত্বরণে ($9.8\\text{ m/s}^2$) নিচে পড়ে। সাধারণ বাতাসে পালকের ক্ষেত্রফল বেশি থাকায় বাতাসের ঊর্ধ্বমুখী প্লবতা ও বাধা পালককে ধীর করে দেয়, কিন্তু বায়ুশূন্য নলে কোনো বাধা না থাকায় মুদ্রা ও পালক একই সাথে নিচে পড়ে।',
      distractorAnalysis: {
        opt_2_8_5b: 'বাতাস থাকলে মুদ্রা আগে পড়ত, কিন্তু বায়ুশূন্য স্থানে নয়।',
        opt_2_8_5c: 'পালক আগে পড়ার কোনো বৈজ্ঞানিক কারণ নেই।',
        opt_2_8_5d: 'অভিকর্ষ বল উপস্থিত থাকায় অবশ্যই নিচে নামবে।',
      },
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 48,
      },
      proTipShortcut: 'বায়ুশূন্য স্থান $\\implies$ ওজন/ভর কোনো বিষয় নয়, সবাই একসাথে পড়বে!',
    },
    difficulty: 'EASY',
    boardSource: 'Barishal Board 2023',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_8_cq_1',
    topicId: 'top_ssc_physics_ch2_8',
    type: 'CQ_CREATIVE',
    stem: 'একটি বহুতল ভবনের ছাদ ($h = 78.4\\text{ m}$) থেকে সিয়াম একটি টেনিস বল মুক্তভাবে নিচে ছেড়ে দিল। ঠিক একই মুহূর্তে নিচ থেকে ফাহিম অপর একটি টেনিস বলকে $39.2\\text{ m/s}$ বেগে সোজা খাড়া উপরের দিকে নিক্ষেপ করল। বল দুটি একই উল্লম্ব রেখায় গতিশীল ছিল। ($g = 9.8\\text{ m/s}^2$, বাতাসের বাধা অগ্রাহ্য করা হলো)।',
    options: null,
    explanation: {
      directAnswer: 'পড়ন্ত ও নিক্ষিপ্ত বস্তুর মিলন সম্পর্কিত সৃজনশীল প্রশ্নটির পুঙ্খানুপুঙ্খ সমাধান নিচে দেওয়া হলো।',
      coreConcept: 'মুক্ত পতন, খাড়া নিক্ষেপ, আপেক্ষিক গতি এবং বলদ্বয়ের মিলন মুহূর্তের উচ্চতা ও বেগ বিশ্লেষণ।',
      stepDerivation: `ক. জ্ঞানমূলক উত্তর:
গ্যালিলিওর পড়ন্ত বস্তুর ৩য় সূত্র: স্থির অবস্থান থেকে বিনা বাধায় পড়ন্ত বস্তু নির্দিষ্ট সময়ে যে দূরত্ব অতিক্রম করে, তা ঐ সময়ের বর্গের সমানুপাতিক ($h \\propto t^2$)।

খ. অনুধাবনমূলক উত্তর:
সাধারণ বায়ুমণ্ডলে একটি ভারী লোহার বল এবং হালকা কাগজের টুকরা একসাথে ফেললে বাতাসের সান্দ্রতা বল ও ঊর্ধ্বমুখী প্লবতা কাজ করে। কাগজের ঘনত্ব কম ও ক্ষেত্রফল বেশি হওয়ায় বাতাসের বাধা কাগজের ওজনের প্রায় সমান হয়ে যায়, ফলে কাগজ ধীরে ধীরে পড়ে। কিন্তু লোহার বলের ক্ষেত্রে বাতাসের বাধা তার ওজনের তুলনায় নগণ্য হওয়ায় তা দ্রুত পড়ে। বায়ুশূন্য স্থানে বাতাসের বাধা না থাকায় উভয়ই একসাথে পড়ে।

গ. প্রয়োগমূলক উত্তর:
বল দুটি কখন বাতাসে একে অপরকে অতিক্রম করবে তা নির্ণয়:
ধরি যাত্রা শুরুর $t$ সেকেন্ড পর বল দুটি পরস্পরকে অতিক্রম করবে।
ভবনের মোট উচ্চতা $H = 78.4\\text{ m}$।
১. ১ম বলের ক্ষেত্রে (উপর থেকে মুক্ত পতন):
আদিবেগ $u_1 = 0$।
$t$ সময়ে অতিক্রান্ত নিম্নমুখী দূরত্ব:
$$h_1 = \\frac{1}{2} g t^2 = \\frac{1}{2} \\times 9.8 \\times t^2 = 4.9 t^2$$

২. ২য় বলের ক্ষেত্রে (নিচ থেকে খাড়া নিক্ষেপ):
আদিবেগ $u_2 = 39.2\\text{ m/s}$।
$t$ সময়ে অতিক্রান্ত ঊর্ধ্বমুখী উচ্চতা:
$$h_2 = u_2 t - \\frac{1}{2} g t^2 = 39.2 t - 4.9 t^2$$

শর্তমতে, উভয় বলের দূরত্বের যোগফল ভবনের মোট উচ্চতার সমান হবে:
$$h_1 + h_2 = H$$
$$(4.9 t^2) + (39.2 t - 4.9 t^2) = 78.4$$
$$39.2 t = 78.4 \\implies t = \\frac{78.4}{39.2} = 2\\text{ s}$$
অতএব বল দুটি যাত্রা শুরুর ঠিক $2\\text{ s}$ পর বাতাসে একে অপরকে অতিক্রম করবে।

ঘ. উচ্চতর দক্ষতামূলক উত্তর:
মিলন মুহূর্তে ভূমি থেকে উচ্চতা এবং বেগের তুলনামূলক সম্পর্ক বিশ্লেষণ:

১. ভূমি থেকে উচ্চতা:
২য় বলটি নিচ থেকে যে উচ্চতায় ওঠে সেটাই ভূমি থেকে মিলনস্থলের উচ্চতা:
$$h_2 = 39.2(2) - 4.9(2)^2 = 78.4 - 19.6 = 58.8\\text{ m}$$
(অথবা ১ম বলের সাপেক্ষে: $78.4 - h_1 = 78.4 - 4.9(4) = 78.4 - 19.6 = 58.8\\text{ m}$)।
সুতরাং বল দুটি ভূমি থেকে $58.8\\text{ m}$ উচ্চতায় মিলিত হবে।

২. মিলন মুহূর্তে বল দুটির বেগ:
- ১ম বলের বেগ (নিম্নমুখী):
$$v_1 = u_1 + gt = 0 + (9.8 \\times 2) = 19.6\\text{ m/s}$$
- ২য় বলের বেগ (ঊর্ধ্বমুখী):
$$v_2 = u_2 - gt = 39.2 - (9.8 \\times 2) = 39.2 - 19.6 = 19.6\\text{ m/s}$$

তুলনামূলক মূল্যায়ন:
আশ্চর্যের বিষয় হলো, মিলন মুহূর্তে ১ম বলের নিম্নমুখী বেগ ($19.6\\text{ m/s}$) এবং ২য় বলের ঊর্ধ্বমুখী বেগ ($19.6\\text{ m/s}$) এর মান হুবহু সমান!
এর কারণ হলো ফাহিমের বলটি নিক্ষেপের বেগ ($39.2\\text{ m/s}$) ছিল সিয়ামের বলের ২ সেকেন্ডে অর্জিত বেগের দ্বিগুণ।
উভয় বলের বেগ সমান হলেও তাদের গতির অভিমুখ বিপরীতমুখী হওয়ায় মিলন মুহূর্তে তাদের আপেক্ষিক বেগ হবে $19.6 - (-19.6) = 39.2\\text{ m/s}$।`,
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 49,
      },
      proTipShortcut: 'সরাসরি শর্টকাট সময়: $t = \\frac{H}{u} = \\frac{78.4}{39.2} = 2\\text{ s}$! মিলন উচ্চতা $= 58.8\\text{ m}$।',
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: 'জ্ঞানমূলক (১ নম্বর): গ্যালিলিওর ৩য় সূত্রের সঠিক বিবৃতি লিখলে পূর্ণ ১ নম্বর।',
      },
      kha: {
        mark: 2,
        criteria: 'অনুধাবনমূলক (২ নম্বর): বাতাসে সান্দ্র বল ও প্লবতার কারণে কাগজের ধীরগতির কারণ লিখলে পূর্ণ ২ নম্বর।',
      },
      ga: {
        mark: 3,
        criteria: 'প্রয়োগমূলক (৩ নম্বর): সমীকরণ গঠন করে অতিক্রমের সময় $t = 2\\text{ s}$ সঠিকভাবে বের করলে পূর্ণ ৩ নম্বর।',
      },
      gha: {
        mark: 4,
        criteria: 'উচ্চতর দক্ষতামূলক (৪ নম্বর): ভূমি থেকে উচ্চতা ($58.8\\text{ m}$) ও উভয় বলের বেগ সমান ($19.6\\text{ m/s}$) হওয়ার তুলনামূলক সম্পর্ক বিশ্লেষণ করলে পূর্ণ ৪ নম্বর।',
      },
    },
    difficulty: 'HARD',
    boardSource: 'Dhaka Board 2024 Model Question',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
  {
    id: 'q_ch2_8_cq_2',
    topicId: 'top_ssc_physics_ch2_8',
    type: 'CQ_CREATIVE',
    stem: 'একটি পরীক্ষামূলক বৈদ্যুতিক গাড়ির গতিবেগ পর্যবেক্ষণের উপাত্ত নিচের ছকে দেওয়া হলো:\n\n| সময় $t\\text{ (s)}$ | $0$ | $5$ | $10$ | $15$ | $20$ | $25$ |\n| :--- | :---: | :---: | :---: | :---: | :---: | :---: |\n| বেগ $v\\text{ (m/s)}$ | $0$ | $10$ | $20$ | $20$ | $10$ | $0$ |\n\nগাড়িটি সরলরেখায় চলছিল। একজন গবেষক ছকের উপাত্ত দিয়ে একটি বেগ-সময় ($v-t$) লেখচিত্র তৈরি করলেন।',
    options: null,
    explanation: {
      directAnswer: 'বেগ-সময় লেখচিত্র, ঢাল ও ক্ষেত্রফল ভিত্তিক সৃজনশীল প্রশ্নটির পুঙ্খানুপুঙ্খ গাণিতিক ব্যাখ্যা নিচে দেওয়া হলো।',
      coreConcept: 'বেগ-সময় লেখচিত্রের ঢাল থেকে ত্বরণ ও মন্দন এবং ক্ষেত্রফল থেকে দূরত্বের সমাকলন।',
      stepDerivation: `ক. জ্ঞানমূলক উত্তর:
বেগ-সময় ($v-t$) লেখচিত্রের যেকোনো বিন্দুর স্পর্শকের ঢাল (Slope) ঐ বস্তুর ত্বরণ (Acceleration) নির্দেশ করে।

খ. অনুধাবনমূলক উত্তর:
সুষম ত্বরণে চলমান বস্তুর ক্ষেত্রে অতিক্রান্ত দূরত্ব সময়ের বর্গের সমানুপাতিক ($s = \\frac{1}{2}at^2 \\implies s \\propto t^2$)।
এখানে সময়ের প্রথম ঘাতের তুলনায় দূরত্বের বৃদ্ধি দ্বিগুণ সূচকীয় হারে বাড়ে (যেমন ১ সেকেন্ডে ১ গুণ, ২ সেকেন্ডে ৪ গুণ, ৩ সেকেন্ডে ৯ গুণ)।
যেহেতু দূরত্ব ও সময় রৈখিকভাবে বাড়ে না, তাই $s-t$ লেখচিত্রটি সরলরেখা না হয়ে মূলবিন্দুগামী একটি প্যারাবলিক ঊর্ধ্বমুখী বক্ররেখা হয়।

গ. প্রয়োগমূলক উত্তর:
প্রথম $10\\text{ s}$-এ ত্বরণ এবং শেষ $10\\text{ s}$-এ মন্দন নির্ণয়:
১. প্রথম ১০ সেকেন্ডের ত্বরণ ($t = 0$ থেকে $t = 10\\text{ s}$):
আদিবেগ $u_1 = 0\\text{ m/s}$, শেষ বেগ $v_1 = 20\\text{ m/s}$।
$$a_1 = \\frac{v_1 - u_1}{t} = \\frac{20 - 0}{10} = 2\\text{ m/s}^2$$
প্রথম ১০ সেকেন্ডে গাড়িটির সুষম ত্বরণ $2\\text{ m/s}^2$।

২. শেষ ১০ সেকেন্ডের মন্দন ($t = 15$ থেকে $t = 25\\text{ s}$):
আদিবেগ $u_2 = 20\\text{ m/s}$, শেষ বেগ $v_2 = 0\\text{ m/s}$, সময় $\\Delta t = 25 - 15 = 10\\text{ s}$।
ত্বরণ:
$$a_2 = \\frac{v_2 - u_2}{\\Delta t} = \\frac{0 - 20}{10} = -2\\text{ m/s}^2$$
অতএব মন্দন $= -(-2) = 2\\text{ m/s}^2$।

ঘ. উচ্চতর দক্ষতামূলক উত্তর:
বেগ-সময় লেখচিত্রের জ্যামিতিক ক্ষেত্রফলের সাহায্যে গাড়ির মোট অতিক্রান্ত দূরত্ব নির্ণয়:
লেখচিত্রটি তিনটি সুস্পষ্ট অংশে বিভক্ত:
১. প্রথম অংশ ($0$ থেকে $10\\text{ s}$): ত্রিভুজাকার অংশ ($OAB$) যেখানে সুষম ত্বরণ $2\\text{ m/s}^2$।
$$\\text{ক্ষেত্রফল } A_1 = \\frac{1}{2} \\times \\text{ভূমি} \\times \\text{উচ্চতা} = \\frac{1}{2} \\times 10 \\times 20 = 100\\text{ m}$$

২. দ্বিতীয় অংশ ($10$ থেকে $15\\text{ s}$): আয়তাকার অংশ ($BCDE$) যেখানে সমবেগ $20\\text{ m/s}$ (সময় $= 15 - 10 = 5\\text{ s}$)।
$$\\text{ক্ষেত্রফল } A_2 = \\text{দৈর্ঘ্য} \\times \\text{প্রস্থ} = 5 \\times 20 = 100\\text{ m}$$

৩. তৃতীয় অংশ ($15$ থেকে $25\\text{ s}$): ত্রিভুজাকার অংশ যেখানে সুষম মন্দন (সময় $= 25 - 15 = 10\\text{ s}$)।
$$\\text{ক্ষেত্রফল } A_3 = \\frac{1}{2} \\times \\text{ভূমি} \\times \\text{উচ্চতা} = \\frac{1}{2} \\times 10 \\times 20 = 100\\text{ m}$$

অথবা সমগ্র লেখচিত্রটিকে একটি একক ট্রাপিজিয়াম হিসেবে গণ্য করলে:
- সমান্তরাল নিচের বাহু $= 25\\text{ s}$
- সমান্তরাল উপরের বাহু (সমবেগের কাল) $= 15 - 10 = 5\\text{ s}$
- লম্ব উচ্চতা (সর্বোচ্চ বেগ) $= 20\\text{ m/s}$
মোট অতিক্রান্ত দূরত্ব:
$$S = \\frac{1}{2} \\times (25 + 5) \\times 20 = \\frac{1}{2} \\times 30 \\times 20 = 300\\text{ m}$$
(পৃথক অংশের যোগফলেও: $100 + 100 + 100 = 300\\text{ m}$)।

সিদ্ধান্ত:
ছকের উপাত্ত বিশ্লেষণ ও বেগ-সময় লেখচিত্রের ক্ষেত্রফল পরিমাপের মাধ্যমে সন্দেহাতীতভাবে প্রমাণিত হয় যে গাড়িটির মোট অতিক্রান্ত দূরত্ব ঠিক $300\\text{ m}$। লেখচিত্রের জ্যামিতিক পদ্ধতি জটিল গতিশীল বস্তুর দূরত্ব নির্ণয়ে অত্যন্ত কার্যকর ও নির্ভুল।`,
      textbookCitation: {
        bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
        chapterName: 'দ্বিতীয় অধ্যায়: গতি',
        pageNumber: 51,
      },
      proTipShortcut: 'ট্রাপিজিয়াম ক্ষেত্রফল $= \\frac{25 + 5}{2} \\times 20 = 300\\text{ m}$।',
    },
    cqRubric: {
      ka: {
        mark: 1,
        criteria: 'জ্ঞানমূলক (১ নম্বর): $v-t$ লেখচিত্রের ঢাল ত্বরণ নির্দেশ করে—লিখলে পূর্ণ ১ নম্বর।',
      },
      kha: {
        mark: 2,
        criteria: 'অনুধাবনমূলক (২ নম্বর): $s \\propto t^2$ সমীকরণের কারণে $s-t$ লেখচিত্র কেন বক্ররেখা হয় তা লিখলে পূর্ণ ২ নম্বর।',
      },
      ga: {
        mark: 3,
        criteria: 'প্রয়োগমূলক (৩ নম্বর): ত্বরণ ($2\\text{ m/s}^2$) এবং মন্দন ($2\\text{ m/s}^2$) নিখুঁতভাবে বের করলে পূর্ণ ৩ নম্বর।',
      },
      gha: {
        mark: 4,
        criteria: 'উচ্চতর দক্ষতামূলক (৪ নম্বর): $v-t$ লেখচিত্রের জ্যামিতিক ট্রাপিজিয়াম ক্ষেত্রফলের সাহায্যে মোট দূরত্ব $300\\text{ m}$ প্রমাণ করলে পূর্ণ ৪ নম্বর।',
      },
    },
    difficulty: 'HARD',
    boardSource: 'Chittagong Board 2024 Model Question',
    isVerified: true,
    status: ContentStatus.PUBLISHED,
    version: 1,
  },
];
