import { PrismaClient, ContentStatus } from '@prisma/client';
import { chapter11QuestionsBatch1 } from './seed-chapter-11-questions';
import { chapter11QuestionsBatch2 } from './seed-chapter-11-questions-batch2';
import { chapter11QuestionsBatch3 } from './seed-chapter-11-questions-batch3';

export const chapter11AllQuestions = [
  ...chapter11QuestionsBatch1,
  ...chapter11QuestionsBatch2,
  ...chapter11QuestionsBatch3,
];

async function upsertTopicAndLesson(
  prisma: PrismaClient,
  topicId: string,
  chapterId: string,
  orderIndex: number,
  titleBangla: string,
  lessonId: string,
  lessonData: {
    titleBangla: string;
    learningGoal: string;
    explanation: string;
    interactiveWidgetUrl?: string;
    importantTerms: Array<{ termBangla: string; termEnglish: string; definition: string }>;
    workedExample?: { problem: string; stepByStepSolution: string };
    memoryAid?: string;
    status: ContentStatus;
  },
) {
  await prisma.topic.upsert({
    where: { id: topicId },
    update: { chapterId, orderIndex, titleBangla },
    create: { id: topicId, chapterId, orderIndex, titleBangla },
  });

  const normalizedLessonData = {
    ...lessonData,
    interactiveWidgetUrl: lessonData.interactiveWidgetUrl ?? null,
  };

  await prisma.lesson.upsert({
    where: { id: lessonId },
    update: {
      topicId,
      ...normalizedLessonData,
      version: 1,
    },
    create: {
      id: lessonId,
      topicId,
      ...normalizedLessonData,
      version: 1,
    },
  });
}

export async function seedChapter11(prisma: PrismaClient) {
  console.log('🔌 Seeding Chapter 11 (চল বিদ্যুৎ / Current Electricity)...');

  const chapter11 = await prisma.chapter.upsert({
    where: { id: 'chap_ssc_physics_ch11' },
    update: {
      subjectId: 'sub_ssc_physics',
      orderIndex: 11,
      titleBangla: 'একাদশ অধ্যায়: চল বিদ্যুৎ (Current Electricity)',
    },
    create: {
      id: 'chap_ssc_physics_ch11',
      subjectId: 'sub_ssc_physics',
      orderIndex: 11,
      titleBangla: 'একাদশ অধ্যায়: চল বিদ্যুৎ (Current Electricity)',
    },
  });

  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch11_1',
    chapter11.id,
    1,
    '১১.১ তড়িৎ প্রবাহ, বিভব পার্থক্য ও তড়িৎচালক শক্তি (Current, Voltage & EMF)',
    'les_ssc_physics_ch11_1',
    {
      titleBangla: 'তড়িৎ প্রবাহ, বিভব পার্থক্য, তড়িৎচালক শক্তি ও প্রবাহের দিক',
      learningGoal: 'তড়িৎ প্রবাহ ($I = Q/t$), ইলেকট্রনের প্রবাহ বনাম প্রচলিত প্রবাহের দিক, বিভব পার্থক্য ($V$) ও তড়িৎচালক শক্তি ($E = I(R+r)$) এবং পরিবাহী-অপরিবাহী-অর্ধপরিবাহীর পার্থক্য ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. তড়িৎ প্রবাহ ও চার্জের হার
- একক সময়ে পরিবাহীর যেকোনো প্রস্থচ্ছেদ দিয়ে প্রবাহিত চার্জকে তড়িৎ প্রবাহ বলে (একক অ্যাম্পিয়ার $\\text{A}$): $$I = \\frac{Q}{t}$$
- ধাতব তারে মুক্ত ইলেকট্রন ঋণাত্মক ($-$) প্রান্ত থেকে ধনাত্মক ($+$) প্রান্তে যায়; কিন্তু প্রচলিত প্রবাহের দিক ধরা হয় ধনাত্মক ($+$) থেকে ঋণাত্মক ($-$) প্রান্তের দিকে।

### ২. বিভব পার্থক্য, তড়িৎচালক শক্তি ও পরিমাপ
- **তড়িৎচালক শক্তি ($E$):** উৎস বা ব্যাটারি প্রতি একক ধনাত্মক আধানকে সম্পূর্ণ বর্তনী ঘুরিয়ে আনতে যে শক্তি সরবরাহ করে। অভ্যন্তরীণ রোধ $r$ থাকলে প্রান্তীয় বিভব $V = E - Ir$।
- **পরিবহন ও পরিমাপ:** মুক্ত ইলেকট্রনের উপস্থিতির ওপর নির্ভর করে পদার্থ পরিবাহী (তামা, রুপা), অর্ধপরিবাহী (সিলিকন, জার্মেনিয়াম) ও অপরিবাহী (প্লাস্টিক, রাবার) হয়।`,
      importantTerms: [
        { termBangla: 'তড়িৎ প্রবাহ', termEnglish: 'Electric Current', definition: 'একক সময়ে পরিবাহীর প্রস্থচ্ছেদ অতিক্রমকারী আধানের পরিমাণ (I = Q/t); একক অ্যাম্পিয়ার (A)।' },
        { termBangla: 'তড়িৎচালক শক্তি', termEnglish: 'Electromotive Force (EMF)', definition: 'কোষ বা ব্যাটারি কর্তৃক প্রতি একক চার্জকে সম্পূর্ণ বর্তনী প্রদক্ষিণ করাতে প্রদত্ত শক্তি (E = W/Q); একক ভোল্ট (V)।' },
        { termBangla: 'অভ্যন্তরীণ রোধ', termEnglish: 'Internal Resistance (r)', definition: 'ব্যাটারির অভ্যন্তরে তড়িৎ প্রবাহে সৃষ্ট বাধা, যার কারণে প্রবাহ চলাকালে প্রান্তীয় বিভব V = E − Ir হয়।' },
      ],
      workedExample: {
        problem: 'একটি $12\\,\\text{V}$ তড়িৎচালক শক্তি ও $0.5\\,\\Omega$ অভ্যন্তরীণ রোধবিশিষ্ট ব্যাটারির সাথে $5.5\\,\\Omega$ বাহ্যিক রোধ যুক্ত করলে বর্তনীর প্রবাহ ও প্রান্তীয় বিভব পার্থক্য কত?',
        stepByStepSolution: 'মোট প্রবাহ $I = \\dfrac{E}{R + r} = \\dfrac{12}{5.5 + 0.5} = 2\\,\\text{A}$ এবং প্রান্তীয় বিভব $V = IR = 2 \\times 5.5 = 11\\,\\text{V}$ (অভ্যন্তরীণ বিভব পতন $Ir = 1\\,\\text{V}$)।',
      },
      memoryAid: 'বর্তনীতে অ্যামিটার সবসময় শ্রেণিতে (নিম্ন রোধ) এবং ভোল্টমিটার সবসময় সমান্তরালে (অতি উচ্চ রোধ) যুক্ত করতে হয়!',
      status: ContentStatus.PUBLISHED,
    },
  );

  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch11_2',
    chapter11.id,
    2,
    '১১.২ ওহমের সূত্র, রোধ, আপেক্ষিক রোধ ও বর্তনী (Ohm Law & Circuits Lab)',
    'les_ssc_physics_ch11_2',
    {
      titleBangla: 'ওহমের সূত্র, আপেক্ষিক রোধ এবং শ্রেণি ও সমান্তরাল বর্তনী বিশ্লেষণ',
      learningGoal: 'ওহমের সূত্র ($V = IR$), রোধ ও আপেক্ষিক রোধ ($R = \\rho L/A$), তার টেনে দৈর্ঘ্য বাড়ানোর প্রভাব এবং শ্রেণি ($R_s$) ও সমান্তরাল ($R_p$) বর্তনীর তুল্য রোধ ও শাখা প্রবাহ হিসাব করতে পারবে।',
      explanation: `### ১. ওহমের সূত্র ও আপেক্ষিক রোধ
- তাপমাত্রা স্থির থাকলে পরিবাহীর প্রবাহ দুই প্রান্তের বিভব পার্থক্যের সমানুপাতিক: $V = IR$।
- পরিবাহীর রোধ $R = \\rho \\dfrac{L}{A}$, যেখানে $\\rho$ উপাদানের আপেক্ষিক রোধ (একক $\\Omega\\cdot\\text{m}$)। তারকে সমান আয়তনে টেনে দৈর্ঘ্য $n$ গুণ করলে নতুন রোধ $R' = n^2 R$ হয়।

### ২. শ্রেণি ও সমান্তরাল সংযোগ
- **শ্রেণি সংযোগ (Series):** তুল্য রোধ $R_s = R_1 + R_2 + \\dots$; প্রতিটি রোধে **একই প্রবাহ $I$** থাকে, বিভব ভাগ হয় ($V = V_1 + V_2$)।
- **সমান্তরাল সংযোগ (Parallel):** তুল্য রোধ $\\dfrac{1}{R_p} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dots$; প্রতিটি শাখায় **একই বিভব $V$** থাকে, প্রবাহ ভাগ হয় ($I = I_1 + I_2$) এবং তুল্য রোধ ক্ষুদ্রতম রোধের চেয়েও কম হয়।`,
      interactiveWidgetUrl: '/uploads/interactive/ohms-law-circuit-lab.html',
      importantTerms: [
        { termBangla: 'ওহমের সূত্র', termEnglish: "Ohm's Law", definition: 'তাপমাত্রা স্থির থাকলে পরিবাহীর তড়িৎ প্রবাহ বিভব পার্থক্যের সমানুপাতিক (V = IR)।' },
        { termBangla: 'আপেক্ষিক রোধ', termEnglish: 'Resistivity (ρ)', definition: 'উপাদানের স্বকীয় ধর্ম (R = ρL/A); দৈর্ঘ্য বা প্রস্থচ্ছেদ বদলালেও উপাদান ও তাপমাত্রা স্থির থাকলে ρ অপরিবর্তিত থাকে।' },
        { termBangla: 'তুল্য রোধ', termEnglish: 'Equivalent Resistance', definition: 'একাধিক রোধের সম্মিলিত কার্যকর রোধ: শ্রেণিতে যোগ হয়, সমান্তরালে ব্যস্তানুপাতিক যোগফল হয়।' },
      ],
      workedExample: {
        problem: '$3\\,\\Omega$ ও $6\\,\\Omega$ সমান্তরালে যুক্ত করে তার সাথে শ্রেণিতে $2\\,\\Omega$ রোধ ও $12\\,\\text{V}$ ব্যাটারি দিলে মোট প্রবাহ কত?',
        stepByStepSolution: '$R_p = (3 \\times 6)/(3 + 6) = 2\\,\\Omega \\implies R_{\\text{eq}} = 2 + 2 = 4\\,\\Omega \\implies I = 12/4 = 3\\,\\text{A}$।',
      },
      memoryAid: 'শ্রেণিতে I এক (Series = Same Current), সমান্তরালে V এক (Parallel = Same Voltage); আর তার টেনে n গুণ করলে R হয় n² গুণ!',
      status: ContentStatus.PUBLISHED,
    },
  );

  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch11_3',
    chapter11.id,
    3,
    '১১.৩ তড়িৎ ক্ষমতা, জুলের তাপ ও বিদ্যুৎ বিল (Electric Power & Billing Lab)',
    'les_ssc_physics_ch11_3',
    {
      titleBangla: 'তড়িৎ ক্ষমতা, জুলের তাপীয় ক্রিয়া ও কিলোওয়াট-ঘণ্টা বিদ্যুৎ বিল',
      learningGoal: 'তড়িৎ ক্ষমতা ($P = VI = I^2R = V^2/R$), জুলের তাপীয় সূত্র ($H = I^2Rt$), বাল্বের উজ্জ্বলতা তুলনা এবং বাণিজ্যিক ইউনিটে ($\\text{kWh}$) মাসিক বিদ্যুৎ বিল হিসাব করতে পারবে।',
      explanation: `### ১. তড়িৎ ক্ষমতা ও জুলের তাপীয় ক্রিয়া
- প্রতি সেকেন্ডে ব্যয়িত তড়িৎ শক্তিকে তড়িৎ ক্ষমতা বলে (একক ওয়াট $\\text{W}$): $$P = VI = I^2R = \\frac{V^2}{R}$$
- রোধক তারে প্রবাহের ফলে উৎপন্ন তাপ $H = Pt = VIt = I^2Rt$। ইস্ত্রি বা হিটারে উচ্চ রোধ ও উচ্চ গলনাঙ্কের নাইক্রোম তার ব্যবহৃত হয়।

### ২. বাণিজ্যিক ইউনিট ও মাসিক বিদ্যুৎ বিল
- $1\\,\\text{kWh} = 1000\\,\\text{W} \\times 3600\\,\\text{s} = 3.6 \\times 10^6\\,\\text{J}$ (১ ইউনিট)।
- মাসিক ব্যয়িত ইউনিট $= \\dfrac{\\text{ক্ষমতা (W)} \\times \\text{দৈনিক ঘণ্টা} \\times \\text{দিন}}{1000}$। ইনক্যান্ডিসেন্ট বাল্বের তুলনায় LED বাতি অনেক কম শক্তিতে বেশি আলো দেয়।`,
      interactiveWidgetUrl: '/uploads/interactive/electric-power-billing-lab.html',
      importantTerms: [
        { termBangla: 'তড়িৎ ক্ষমতা', termEnglish: 'Electric Power', definition: 'প্রতি সেকেন্ডে বৈদ্যুতিক শক্তি ব্যয়ের হার (P = VI = I²R = V²/R); একক ওয়াট (W)।' },
        { termBangla: 'জুলের তাপীয় ক্রিয়া', termEnglish: 'Joule Heating', definition: 'রোধকের মধ্য দিয়ে প্রবাহ চললে তাপ উৎপন্ন হওয়ার ঘটনা (H = I²Rt)।' },
        { termBangla: 'কিলোওয়াট-ঘণ্টা', termEnglish: 'Kilowatt-hour (Unit)', definition: '১ ইউনিট বিদ্যুৎ শক্তি = 3.6 × 10⁶ J।' },
      ],
      workedExample: {
        problem: '$60\\,\\text{W}$ বাতি প্রতিদিন $5\\,\\text{h}$ জ্বললে ৩০ দিনে কত ইউনিট খরচ হবে?',
        stepByStepSolution: 'ব্যয়িত শক্তি $= \\dfrac{60 \\times 5 \\times 30}{1000} = 9\\,\\text{kWh}$ (৯ ইউনিট)।',
      },
      memoryAid: 'বাল্বের গায়ে লেখা ওয়াট রেটিং ভোল্টেজ ঠিক থাকলে প্রযোজ্য—সমান্তরালে বেশি ওয়াটের বাল্ব বেশি উজ্জ্বল, কিন্তু শ্রেণিতে কম ওয়াটের (বেশি রোধের) বাল্ব বেশি উজ্জ্বল হয়!',
      status: ContentStatus.PUBLISHED,
    },
  );

  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch11_4',
    chapter11.id,
    4,
    '১১.৪ বিদ্যুৎ সরবরাহ, সিস্টেম লস ও লোডশেডিং (Power Supply & System Loss)',
    'les_ssc_physics_ch11_4',
    {
      titleBangla: 'বিদ্যুৎ উৎপাদন, উচ্চ বিভবে সঞ্চালন, সিস্টেম লস ও লোডশেডিং',
      learningGoal: 'উচ্চ বিভবে বিদ্যুৎ সঞ্চালনে কেন সিস্টেম লস ($P_{\\text{loss}} = I^2R$) কমে যায়, স্টেপ-আপ ও স্টেপ-ডাউন ট্রান্সফরমারের ভূমিকা এবং লোডশেডিংয়ের কারণ বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. বিদ্যুৎ সঞ্চালন ও সিস্টেম লস
- উৎপাদন কেন্দ্র থেকে দূরবর্তী শহরে তার দিয়ে $P$ ক্ষমতা $V$ বিভবে পাঠালে লাইনের প্রবাহ $I = \\dfrac{P}{V}$।
- তারের রোধ $R_{\\text{line}}$ হলে তাপ হিসেবে সিস্টেম লস: $$P_{\\text{loss}} = I^2R_{\\text{line}} = \\left(\\frac{P}{V}\\right)^2 R_{\\text{line}}$$
- বিভব $n$ গুণ বাড়ালে প্রবাহ $n$ গুণ কমে এবং সিস্টেম লস **$n^2$ গুণ** কমে যায়! তাই স্টেপ-আপ ট্রান্সফরমার দিয়ে $132\\,\\text{kV}$ বা $230\\,\\text{kV}$ উচ্চ বিভবে বিদ্যুৎ পাঠানো হয় এবং গ্রাহক পর্যায়ে স্টেপ-ডাউন ট্রান্সফরমার দিয়ে $220\\,\\text{V}$ করা হয়।

### ২. লোডশেডিং
- পিক আওয়ারে বিদ্যুতের চাহিদা উৎপাদনের চেয়ে বেশি হলে জাতীয় গ্রিডকে স্থিতিশীল ও ওভারলোডমুক্ত রাখতে পর্যায়ক্রমে এলাকাভিত্তিক সরবরাহ বন্ধ রাখাকে লোডশেডিং বলে।`,
      importantTerms: [
        { termBangla: 'সিস্টেম লস', termEnglish: 'System Loss', definition: 'সঞ্চালন তারের রোধে তাপ হিসেবে শক্তির অপচয় (P_loss = I²R) এবং অন্যান্য অবৈধ অপচয়।' },
        { termBangla: 'স্টেপ-আপ ও স্টেপ-ডাউন', termEnglish: 'Step-Up & Step-Down', definition: 'সঞ্চালনের শুরুতে বিভব বাড়িয়ে প্রবাহ কমানো হয় (স্টেপ-আপ) এবং ব্যবহারের আগে ২২০ V-এ নামানো হয় (স্টেপ-ডাউন)।' },
        { termBangla: 'লোডশেডিং', termEnglish: 'Load Shedding', definition: 'উৎপাদন ঘাটতির সময় গ্রিড রক্ষার্থে পরিকল্পিতভাবে নির্দিষ্ট এলাকায় বিদ্যুৎ সরবরাহ সাময়িক বন্ধ রাখা।' },
      ],
      workedExample: {
        problem: '$10\\,\\Omega$ রোধের সঞ্চালন তার দিয়ে $50\\,\\text{kW}$ ক্ষমতা $10\\,\\text{kV}$ বিভবে পাঠালে সিস্টেম লস কত ওয়াট হবে?',
        stepByStepSolution: 'প্রবাহ $I = \\dfrac{P}{V} = \\dfrac{50{,}000}{10{,}000} = 5\\,\\text{A}$। অতএব সিস্টেম লস $P_{\\text{loss}} = I^2R = 5^2 \\times 10 = 250\\,\\text{W}$।',
      },
      memoryAid: 'উচ্চ বিভব মানে কম প্রবাহ—আর প্রবাহ অর্ধেক হলে I²R সিস্টেম লস চার ভাগের এক ভাগে নেমে আসে!',
      status: ContentStatus.PUBLISHED,
    },
  );

  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch11_5',
    chapter11.id,
    5,
    '১১.৫ বিদ্যুতের নিরাপদ ব্যবহার: ফিউজ, সার্কিট ব্রেকার ও আর্থিং (Electrical Safety)',
    'les_ssc_physics_ch11_5',
    {
      titleBangla: 'ফিউজ, সার্কিট ব্রেকার (MCB), ওভারলোডিং, শর্ট সার্কিট ও নিরাপদ ব্যবহার',
      learningGoal: 'বৈদ্যুতিক শক, ওভারলোডিং ও শর্ট সার্কিট প্রতিরোধে সঠিক রেটিংয়ের ফিউজ, মিনিয়েচার সার্কিট ব্রেকার (MCB) এবং নিরাপত্তামূলক সতর্কতার কার্যপ্রণালি ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. ফিউজ ও সার্কিট ব্রেকার (MCB)
- **ফিউজ:** কম গলনাঙ্কের টিন ও সিসার সংকরের পাতলা তার। নির্ধারিত মাত্রার চেয়ে বেশি প্রবাহ গেলে তাপ উৎপন্ন হয়ে গলে যায় এবং বর্তনী ছিন্ন করে। ফিউজের বদলে মোটা তামার তার বসালে তা না গলে আগুন লাগতে পারে।
- **সার্কিট ব্রেকার (MCB):** অতিরিক্ত প্রবাহে স্বয়ংক্রিয়ভাবে সুইচ ট্রিপ করে সংযোগ বিচ্ছিন্ন করে; ত্রুটি ঠিক করে সহজেই রিসেট করা যায়।

### ২. ওভারলোডিং, শর্ট সার্কিট ও সতর্কতা
- **শর্ট সার্কিট:** লাইভ ও নিউট্রাল তার সরাসরি পরস্পর স্পর্শ করলে অতি অল্প রোধে বিপুল প্রবাহ প্রবাহিত হয়।
- **ওভারলোডিং:** এক সকেট বা মাল্টিপ্লাগে অনেক ভারী যন্ত্র চালালে তার গরম হয়ে অগ্নিকাণ্ড ঘটতে পারে।
- **ব্যক্তিগত সুরক্ষা:** ভেজা হাতে কখনো সুইচ বা যন্ত্র স্পর্শ করা যাবে না, কারণ ভেজা ত্বকের রোধ অনেক কমে যাওয়ায় মারাত্মক শক লাগতে পারে।`,
      importantTerms: [
        { termBangla: 'ফিউজ', termEnglish: 'Electric Fuse', definition: 'কম গলনাঙ্কবিশিষ্ট টিন-সিসা সংকরের তার যা অতিরিক্ত প্রবাহে গলে গিয়ে বর্তনী রক্ষা করে।' },
        { termBangla: 'মিনিয়েচার সার্কিট ব্রেকার', termEnglish: 'Miniature Circuit Breaker (MCB)', definition: 'অতিরিক্ত প্রবাহ বা শর্ট সার্কিটে স্বয়ংক্রিয়ভাবে লাইন বিচ্ছিন্নকারী রিসেটেবল সুরক্ষা যন্ত্র।' },
        { termBangla: 'শর্ট সার্কিট ও ওভারলোডিং', termEnglish: 'Short Circuit & Overloading', definition: 'লাইভ-নিউট্রাল সরাসরি স্পর্শ হলে শর্ট সার্কিট এবং সীমার বেশি যন্ত্র যুক্ত করলে ওভারলোডিং ঘটে।' },
      ],
      workedExample: {
        problem: '$220\\,\\text{V}$ লাইনে একটি $1320\\,\\text{W}$ হিটারের জন্য কোন রেটিংয়ের ফিউজ সবচেয়ে উপযুক্ত ($5\\,\\text{A}, 6\\,\\text{A}, 8\\,\\text{A}, 30\\,\\text{A}$)?',
        stepByStepSolution: 'স্বাভাবিক প্রবাহ $I = P/V = 1320/220 = 6\\,\\text{A}$। ফিউজের মান স্বাভাবিক প্রবাহের চেয়ে সামান্য বেশি হতে হয়—$5\\,\\text{A}$ বা $6\\,\\text{A}$ চালানো মাত্রই পুড়ে যাবে, আর $30\\,\\text{A}$ সুরক্ষা দেবে না; তাই $8\\,\\text{A}$ সবচেয়ে নিরাপদ।',
      },
      memoryAid: 'ফিউজের রেটিং = স্বাভাবিক প্রবাহের চেয়ে সামান্য বেশি! কখনো মোটা তামার তার দিয়ে ফিউজ বানাবে না।',
      status: ContentStatus.PUBLISHED,
    },
  );

  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch11_6',
    chapter11.id,
    6,
    '১১.৬ বাসাবাড়িতে তড়িৎ বর্তনীর নকশা (Household Wiring Design)',
    'les_ssc_physics_ch11_6',
    {
      titleBangla: 'লাইভ, নিউট্রাল ও আর্থ তার, সমান্তরাল ওয়্যারিং এবং আলাদা সার্কিট নকশা',
      learningGoal: 'গৃহস্থালি বর্তনীতে লাইভ-নিউট্রাল-আর্থ তারের রং ও কাজ, সুইচ ও ফিউজ লাইভ তারে বসানোর কারণ, থ্রি-পিন প্লাগ এবং বাতি-পাখা ও ভারী যন্ত্রের জন্য পৃথক সমান্তরাল সার্কিট নকশা ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. তিনটি তারের পরিচয় ও সুইচের অবস্থান
- **লাইভ তার (লাল/বাদামি):** $220\\,\\text{V}$ বিভব বহন করে; **সুইচ ও ফিউজ সর্বদা লাইভ তারে** বসানো হয়। নিউট্রালে সুইচ দিলে সুইচ বন্ধ থাকা সত্ত্বেও যন্ত্রটি $220\\,\\text{V}$ বিভবে থেকে যায়।
- **নিউট্রাল তার (কালো/নীল):** প্রবাহকে উৎসে ফিরিয়ে নিয়ে বর্তনী সম্পূর্ণ করে (প্রায় $0\\,\\text{V}$)।
- **আর্থ তার (সবুজ/সবুজ-হলুদ):** ধাতব খোলসের লিকেজ প্রবাহকে নিরাপদে মাটিতে পাঠিয়ে শক রোধ করে; থ্রি-পিন প্লাগের **উপরের মোটা ও লম্বা পিনটি** আর্থ পিন।

### ২. বাসাবাড়ির সমান্তরাল ওয়্যারিং ও পৃথক সার্কিট
- ঘরের সব বাতি, পাখা ও সকেট **সমান্তরালে** যুক্ত থাকে যাতে প্রতিটি পূর্ণ $220\\,\\text{V}$ পায় ও স্বাধীনভাবে চালানো যায়।
- বাতি-পাখার সার্কিটে সাধারণত $5\\,\\text{A}$ ফিউজ থাকে; আর এসি, গিজার বা ইলেকট্রিক ওভেনের মতো ভারী যন্ত্রের জন্য মোটা তার ও $15\\,\\text{A}$/$30\\,\\text{A}$ রেটিংয়ের আলাদা সার্কিট ও ব্রেকার ব্যবহার করা হয়।`,
      importantTerms: [
        { termBangla: 'লাইভ ও নিউট্রাল তার', termEnglish: 'Live & Neutral Wires', definition: 'লাইভ উচ্চ বিভব আনে (এতে সুইচ ও ফিউজ থাকে), আর নিউট্রাল বর্তনী সম্পূর্ণ করে।' },
        { termBangla: 'আর্থ তার ও আর্থ পিন', termEnglish: 'Earth Wire & Top Pin', definition: 'থ্রি-পিন প্লাগের উপরের মোটা পিনটি যন্ত্রের ধাতব বডিকে মাটির সাথে যুক্ত করে শক রোধ করে।' },
        { termBangla: 'পৃথক পাওয়ার সার্কিট', termEnglish: 'Dedicated Power Circuit', definition: 'উচ্চ ক্ষমতার এসি বা ওভেনের জন্য মোটা তার ও উচ্চ রেটিংয়ের আলাদা সার্কিট।' },
      ],
      workedExample: {
        problem: 'একটি বাসায় সুইচ বন্ধ করার পরও বাল্ব হোল্ডারে হাত দিলে শক লাগল—ওয়্যারিংয়ে কী ভুল হয়েছিল এবং কেন?',
        stepByStepSolution: 'সুইচটি লাইভ তারের বদলে ভুলবশত **নিউট্রাল তারে** যুক্ত করা হয়েছিল। ফলে সুইচ বন্ধ করলেও বাল্ব হোল্ডার লাইভ তারের মাধ্যমে সরাসরি $220\\,\\text{V}$ বিভবের সাথে যুক্ত ছিল।',
      },
      memoryAid: 'লাইভ তারেই সবসময় সুইচ ও ফিউজ; ঘরের সব যন্ত্র সমান্তরালে; আর থ্রি-পিনের উপরের মোটা পিনটাই আর্থিং!',
      status: ContentStatus.PUBLISHED,
    },
  );

  for (const q of chapter11AllQuestions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {
        topicId: q.topicId,
        type: q.type,
        stem: q.stem,
        options: q.options ?? undefined,
        explanation: q.explanation,
        cqRubric: q.cqRubric ?? undefined,
        difficulty: q.difficulty,
        boardSource: q.boardSource ?? null,
        isVerified: q.isVerified,
        status: q.status,
        version: q.version,
      },
      create: {
        id: q.id,
        topicId: q.topicId,
        type: q.type,
        stem: q.stem,
        options: q.options ?? undefined,
        explanation: q.explanation,
        cqRubric: q.cqRubric ?? undefined,
        difficulty: q.difficulty,
        boardSource: q.boardSource ?? null,
        isVerified: q.isVerified,
        status: q.status,
        version: q.version,
      },
    });
  }

  console.log(`✅ Chapter 11 seeded (${chapter11AllQuestions.length} verified questions).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedChapter11(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Chapter 11 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
