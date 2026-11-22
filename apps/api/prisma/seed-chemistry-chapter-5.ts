import { PrismaClient, ContentStatus } from '@prisma/client';
import { chemistryChapter5QuestionsBatch1 } from './seed-chemistry-chapter-5-questions';
import { chemistryChapter5QuestionsBatch2 } from './seed-chemistry-chapter-5-questions-batch2';
import { chemistryChapter5QuestionsBatch3 } from './seed-chemistry-chapter-5-questions-batch3';

export const sscChemistrySubject = {
  id: 'sub_ssc_chemistry',
  code: 'ssc_chemistry',
  nameBangla: 'রসায়ন',
  classLevel: 'CLASS_9_10',
  program: 'SSC',
  syllabusYear: 2026,
  isReady: true,
};

export const chemistryChapter5AllQuestions = [
  ...chemistryChapter5QuestionsBatch1,
  ...chemistryChapter5QuestionsBatch2,
  ...chemistryChapter5QuestionsBatch3,
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

export async function seedChemistryChapter5(prisma: PrismaClient) {
  console.log('🧪 Seeding SSC Chemistry Chapter 5 (রাসায়নিক বন্ধন / Chemical Bonds)...');

  await prisma.subject.upsert({
    where: { code: sscChemistrySubject.code },
    update: sscChemistrySubject,
    create: sscChemistrySubject,
  });

  const chapter5 = await prisma.chapter.upsert({
    where: { id: 'chap_ssc_chemistry_ch5' },
    update: {
      subjectId: sscChemistrySubject.id,
      orderIndex: 5,
      titleBangla: 'পঞ্চম অধ্যায়: রাসায়নিক বন্ধন (Chemical Bonds)',
    },
    create: {
      id: 'chap_ssc_chemistry_ch5',
      subjectId: sscChemistrySubject.id,
      orderIndex: 5,
      titleBangla: 'পঞ্চম অধ্যায়: রাসায়নিক বন্ধন (Chemical Bonds)',
    },
  });

  const WIDGET_URL = '/uploads/interactive/chemical-bonding-simulator-lab.html';

  // =========================================================================
  // Lesson 5.1: যোজ্যতা ইলেকট্রন ও মৌলের যোজনী
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch5_1',
    chapter5.id,
    1,
    '৫.১ যোজ্যতা ইলেকট্রন ও মৌলের যোজনী (Valence Electrons & Valency)',
    'les_ssc_chemistry_ch5_1',
    {
      titleBangla: 'যোজ্যতা ইলেকট্রন ও মৌলের যোজনীর মৌলিক ধারণা',
      learningGoal: 'পরমাণুর ইলেকট্রন বিন্যাস থেকে যোজ্যতা ইলেকট্রন ও যোজনীর সম্পর্ক ব্যাখ্যা করা এবং ধাতু ও অধাতুর যোজনী নির্ণয় করা।',
      explanation: `
### যোজ্যতা ইলেকট্রন (Valence Electron)
কোনো মৌলের ইলেকট্রন বিন্যাসে তার **সর্ববহিঃস্থ প্রধান শক্তিস্তরে মোট যে কয়টি ইলেকট্রন থাকে**, সেই সংখ্যাকে মৌলটির **যোজ্যতা ইলেকট্রন** বলে।
- যেমন: পটাশিয়াম ($_{19}\\text{K}: 1s^2 2s^2 2p^6 3s^2 3p^6 4s^1$) এর সর্ববহিঃস্থ ৪র্থ স্তরে ১টি ইলেকট্রন থাকায় যোজ্যতা ইলেকট্রন **১**।
- অক্সিজেন ($_{8}\\text{O}: 1s^2 2s^2 2p^4$) এর সর্ববহিঃস্থ ২য় স্তরে মোট $2 + 4 = 6$ টি ইলেকট্রন থাকায় যোজ্যতা ইলেকট্রন **৬**।
- ক্লোরিন ($_{17}\\text{Cl}: 1s^2 2s^2 2p^6 3s^2 3p^5$) এর যোজ্যতা ইলেকট্রন **৭**।

### মৌলের যোজনী বা যোজ্যতা (Valency)
অণু গঠনকালে কোনো মৌলের একটি পরমাণুর সাথে অপর একটি মৌলের পরমাণুর যুক্ত হওয়ার সামর্থ্যকে **যোজনী** বলে।
- রসায়নে হাইড্রোজেন ($H$) বা ক্লোরিন ($Cl$) পরমাণুর যোজনীকে মানদণ্ড হিসেবে **১** ধরা হয়।
- কোনো মৌলের একটি পরমাণু যতগুলো H বা Cl পরমাণুর সাথে যুক্ত হতে পারে, তা-ই সেই মৌলের যোজনী।
  - $\\text{HCl}$ এ Cl-এর যোজনী ১।
  - $\\text{H}_2\\text{O}$ তে O-এর যোজনী ২।
  - $\\text{NH}_3$ তে N-এর যোজনী ৩।
  - $\\text{CH}_4$ তে C-এর যোজনী ৪।

### ধাতু ও অধাতুর যোজনী নির্ধারণ
1. **ধাতুসমূহের ক্ষেত্রে:** যোজ্যতা ইলেকট্রন সংখ্যাই সাধারণত তাদের যোজনী (যেমন $\\text{Na}=1, \\text{Mg}=2, \\text{Al}=3$)।
2. **অধাতুসমূহের ক্ষেত্রে:** যোজনী সাধারণত $8 - (\\text{যোজ্যতা ইলেকট্রন})$। যেমন ক্লোরিনের যোজ্যতা ইলেকট্রন ৭ হলেও যোজনী $8 - 7 = 1$; অক্সিজেনের যোজ্যতা ইলেকট্রন ৬ হলেও যোজনী $8 - 6 = 2$।
      `.trim(),
      interactiveWidgetUrl: WIDGET_URL,
      importantTerms: [
        { termBangla: 'যোজ্যতা ইলেকট্রন', termEnglish: 'Valence Electron', definition: 'পরমাণুর সর্ববহিঃস্থ প্রধান শক্তিস্তরে বিদ্যমান মোট ইলেকট্রন সংখ্যা।' },
        { termBangla: 'যোজনী / যোজ্যতা', termEnglish: 'Valency', definition: 'অণু গঠনকালে কোনো মৌলের অপর পরমাণুর সাথে যুক্ত হওয়ার ক্ষমতা বা হাত সংখ্যা।' },
        { termBangla: 'সর্ববহিঃস্থ স্তর', termEnglish: 'Outermost Shell', definition: 'পরমাণুর ইলেকট্রন বিন্যাসের প্রধান কোয়ান্টাম সংখ্যার (n) সর্বোচ্চ মানবিশিষ্ট কক্ষপথ।' },
      ],
      workedExample: {
        problem: 'ক্লোরিন ($_{17}\\text{Cl}$) পরমাণুর যোজ্যতা ইলেকট্রন ৭ হলেও এর যোজনী ১ কেন?',
        stepByStepSolution: 'ক্লোরিনের বিন্যাস $1s^2 2s^2 2p^6 3s^2 3p^5$। ৩য় স্তরে $2+5=7$ টি ইলেকট্রন থাকায় যোজ্যতা ইলেকট্রন ৭। কিন্তু নিকটতম আর্গনের অষ্টক পূরণ করতে এর মাত্র ১টি ইলেকট্রন প্রয়োজন। তাই এটি ১টি হাইড্রোজেনের সাথে যুক্ত হয়ে HCl গঠন করে। ফলে ক্লোরিনের যোজনী ১।',
      },
      memoryAid: 'ধাতুর যোজনী = সর্ববহিঃস্থ ইলেকট্রন; অধাতুর যোজনী = ৮ বিয়োগ সর্ববহিঃস্থ ইলেকট্রন!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // =========================================================================
  // Lesson 5.2: সুপ্ত যোজনী ও যৌগমূলক
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch5_2',
    chapter5.id,
    2,
    '৫.২ সুপ্ত যোজনী ও যৌগমূলক (Latent/Variable Valency & Radicals)',
    'les_ssc_chemistry_ch5_2',
    {
      titleBangla: 'পরিবর্তনশীল ও সুপ্ত যোজনী, যৌগমূলক এবং রাসায়নিক সংকেত লিখন',
      learningGoal: 'নির্দিষ্ট যৌগে সক্রিয় ও সুপ্ত যোজনী নির্ণয় করা এবং যৌগমূলকের আধান ও যোজনী ব্যবহার করে রাসায়নিক সংকেত গঠন করা।',
      explanation: `
### পরিবর্তনশীল যোজনী (Variable Valency)
কিছু মৌলের একাধিক যোজনী থাকে। যেমন:
- আয়রন ($\\text{Fe}$): ২ ও ৩ (ফেরাস ও ফেরিক)
- কপার ($\\text{Cu}$): ১ ও ২ (কিউপ্রাস ও কিউপ্রিক)
- সালফার ($\\text{S}$): ২, ৪ ও ৬
- ফসফরাস ($\\text{P}$): ৩ ও ৫
- কার্বন ($\\text{C}$): ২ ও ৪

### সক্রিয় ও সুপ্ত যোজনী
- **সর্বোচ্চ যোজনী:** কোনো মৌল সর্বাধিক যে যোজনী প্রদর্শন করতে পারে।
- **সক্রিয় যোজনী:** কোনো নির্দিষ্ট যৌগে মৌলের যে যোজনী কার্যকর থাকে।
- **সুপ্ত যোজনী:** সর্বোচ্চ যোজনী ও সক্রিয় যোজনীর বিয়োগফল।
$$\\text{সুপ্ত যোজনী (Latent Valency)} = \\text{সর্বোচ্চ যোজনী} - \\text{সক্রিয় যোজনী}$$
- $\\text{FeCl}_2$ যৌগে Fe-এর সক্রিয় যোজনী ২, সর্বোচ্চ ৩ $\\rightarrow$ সুপ্ত যোজনী $3 - 2 = 1$।
- $\\text{SO}_2$ যৌগে S-এর সক্রিয় যোজনী ৪, সর্বোচ্চ ৬ $\\rightarrow$ সুপ্ত যোজনী $6 - 4 = 2$।
- $\\text{CO}$ যৌগে C-এর সক্রিয় যোজনী ২, সর্বোচ্চ ৪ $\\rightarrow$ সুপ্ত যোজনী $4 - 2 = 2$।

### যৌগমূলক (Radicals)
একাধিক পরমাণু যুক্ত হয়ে একটি পরমাণু গুচ্ছ গঠন করে যা রাসায়নিক বিক্রিয়ায় একক পরমাণুর মতো আচরণ করে।
- **ধনাত্মক যৌগমূলক:** অ্যামোনিয়াম ($\\text{NH}_4^+$), ফসফোনিয়াম ($\\text{PH}_4^+$) — যোজনী ১।
- **একযোজী ঋণাত্মক মূলক (যোজনী ১):** হাইড্রোক্সাইড ($\\text{OH}^-$), নাইট্রেট ($\\text{NO}_3^-$), বাইকার্বনেট ($\\text{HCO}_3^-$)।
- **দ্বিযোজী ঋণাত্মক মূলক (যোজনী ২):** কার্বনেট ($\\text{CO}_3^{2-}$), সালফেট ($\\text{SO}_4^{2-}$), সালফাইট ($\\text{SO}_3^{2-}$)।
- **ত্রিযোজী ঋণাত্মক মূলক (যোজনী ৩):** ফসফেট ($\\text{PO}_4^{3-}$)।
      `.trim(),
      interactiveWidgetUrl: WIDGET_URL,
      importantTerms: [
        { termBangla: 'পরিবর্তনশীল যোজনী', termEnglish: 'Variable Valency', definition: 'একই মৌল ভিন্ন ভিন্ন যৌগে ভিন্ন যোজনী প্রদর্শন করার ক্ষমতা।' },
        { termBangla: 'সুপ্ত যোজনী', termEnglish: 'Latent Valency', definition: 'কোনো নির্দিষ্ট যৌগে মৌলটির সর্বোচ্চ যোজনী ও সক্রিয় যোজনীর ব্যবধান।' },
        { termBangla: 'যৌগমূলক / র‍্যাডিক্যাল', termEnglish: 'Radical / Polyatomic Ion', definition: 'চার্জযুক্ত পরমাণু গুচ্ছ যা একটি একক পরমাণুর মতো আচরণ করে।' },
      ],
      workedExample: {
        problem: '$\\text{SO}_2$ এবং $\\text{SO}_3$ যৌগে সালফারের সুপ্ত যোজনী নির্ণয় করো।',
        stepByStepSolution: 'সালফারের সর্বোচ্চ যোজনী ৬। SO2 যৌগে ২টি অক্সিজেন পরমাণুর সাথে যুক্ত থাকায় সালফারের সক্রিয় যোজনী ৪; অতএব সুপ্ত যোজনী = ৬ - ৪ = ২। SO3 যৌগে ৩টি অক্সিজেনের সাথে যুক্ত থাকায় সক্রিয় যোজনী ৬; অতএব সুপ্ত যোজনী = ৬ - ৬ = ০।',
      },
      memoryAid: 'যৌগমূলক ছন্দ: ফসফেট তিনে (PO4³⁻), কার্বনেট-সালফেট দুইয়ে (CO3²⁻, SO4²⁻), বাকি সব নাইট্রেট-বাই-হাইড্রোক্সাইড একে!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // =========================================================================
  // Lesson 5.3: অষ্টক ও দুইয়ের নিয়ম এবং নিষ্ক্রিয় গ্যাসের স্থিতিশীলতা
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch5_3',
    chapter5.id,
    3,
    '৫.৩ অষ্টক ও দুইয়ের নিয়ম এবং নিষ্ক্রিয় গ্যাসের স্থিতিশীলতা (Octet & Duet Rule, Inert Gas Stability)',
    'les_ssc_chemistry_ch5_3',
    {
      titleBangla: 'অষ্টক ও দুইয়ের নিয়ম এবং নিষ্ক্রিয় গ্যাসের সুস্থিতি',
      learningGoal: 'নিষ্ক্রিয় গ্যাসের ইলেকট্রন বিন্যাসের স্থিতিশীলতা মূল্যায়ন করা এবং অষ্টক ও দুইয়ের নিয়মের উপযোগিতা ও সীমাবদ্ধতা ব্যাখ্যা করা।',
      explanation: `
### নিষ্ক্রিয় গ্যাসের স্থিতিশীলতা (Inert Gas Stability)
পর্যায় সারণির ১৮ নং গ্রুপের মৌলগুলো (He, Ne, Ar, Kr, Xe, Rn) রাসায়নিকভাবে নিষ্ক্রিয়।
- হিলিয়ামের ১ম শক্তিস্তরে ২টি ইলেকট্রন ($1s^2$) দ্বারা দ্বৈত পূর্ণ থাকে।
- বাকি সকল নিষ্ক্রিয় গ্যাসের সর্ববহিঃস্থ স্তরে ৮টি ইলেকট্রন ($ns^2 np^6$) দ্বারা অষ্টক পূর্ণ থাকে।
- পূর্ণ শক্তিস্তর থাকায় এরা ইলেকট্রন আদান-প্রদান বা শেয়ার করতে চায় না, ফলে পরম স্থিতিশীল থাকে।

### অষ্টক নিয়ম (Octet Rule)
অণু গঠনকালে মৌলসমূহ নিজেদের সর্ববহিঃস্থ স্তরে নিকটতম নিষ্ক্রিয় গ্যাসের ন্যায় **৮টি ইলেকট্রন অর্জনের চেষ্টা করে**। একে অষ্টক নিয়ম বলে।

### দুইয়ের নিয়ম (Duet Rule)
আধুনিক রসায়নে লক্ষ্য করা গেছে যে অণু গঠনে পরমাণুসমূহ সর্ববহিঃস্থ স্তরে **এক বা একাধিক জোড়া ইলেকট্রন শেয়ার বা ধারণ করতে চায়**। একে দুইয়ের নিয়ম বলে।
- যেমন $H_2$ অণুতে ১ জোড়া (২টি) ইলেকট্রন শেয়ার করে হিলিয়ামের দ্বৈত পূর্ণ করে।

### অষ্টক নিয়মের সীমাবদ্ধতা
1. **অষ্টক সংকোচন (Incomplete Octet):** $\\text{BF}_3$ যৌগে বোরনের চারপাশে ৬টি এবং $\\text{BeCl}_2$ যৌগে বেরিলিয়ামের চারপাশে ৪টি ইলেকট্রন থাকে (অষ্টক অপূর্ণ)।
2. **অষ্টক সম্প্রসারণ (Expanded Octet):** $\\text{PCl}_5$ যৌগে ফসফরাসের চারপাশে ১০টি ($5$ জোড়া) এবং $\\text{SF}_6$ যৌগে সালফারের চারপাশে ১২টি ($6$ জোড়া) ইলেকট্রন থাকে।
- দুইয়ের নিয়ম এই সকল যৌগের ইলেকট্রন জোড় সুন্দরভাবে ব্যাখ্যা করতে পারে।
      `.trim(),
      interactiveWidgetUrl: WIDGET_URL,
      importantTerms: [
        { termBangla: 'নিষ্ক্রিয় গ্যাস', termEnglish: 'Inert / Noble Gas', definition: 'গ্রুপ ১৮ এর মৌলসমূহ যাদের সর্ববহিঃস্থ স্তর ইলেকট্রন দ্বারা সম্পূর্ণ পূর্ণ থাকায় রাসায়নিক বিক্রিয়া করে না।' },
        { termBangla: 'অষ্টক নিয়ম', termEnglish: 'Octet Rule', definition: 'যৌগ গঠনকালে সর্ববহিঃস্থ স্তরে ৮টি ইলেকট্রন অর্জনের সাধারণ প্রবণতা।' },
        { termBangla: 'দুইয়ের নিয়ম', termEnglish: 'Duet Rule', definition: 'অণু গঠনকালে পরমাণুসমূহের সর্ববহিঃস্থ স্তরে এক বা একাধিক জোড়া ইলেকট্রন ধারণের সার্বজনীন নিয়ম।' },
      ],
      workedExample: {
        problem: '$\\text{BF}_3$ অণু কীভাবে অষ্টক নিয়মের সীমাবদ্ধতা প্রমাণ করে?',
        stepByStepSolution: 'বোরনের যোজ্যতা ইলেকট্রন ৩টি। ৩টি ফ্লুরিনের সাথে ৩টি ইলেকট্রন শেয়ার করে BF3 অণু গঠন করে। এতে বোরনের সর্ববহিঃস্থ স্তরে মোট ৩ জোড়া অর্থাৎ ৬টি ইলেকট্রন থাকে। ৮টি ইলেকট্রন পূর্ণ না হওয়া সত্ত্বেও BF3 একটি স্থায়ী অণু, যা অষ্টক সংকোচন ও সীমাবদ্ধতা প্রমাণ করে।',
      },
      memoryAid: 'অষ্টক খোঁজে শুধুই আট, দুইয়ের নিয়ম খোঁজে ইলেকট্রন জোড়!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // =========================================================================
  // Lesson 5.4: আয়নিক বন্ধন গঠন ও বৈশিষ্ট্য
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch5_4',
    chapter5.id,
    4,
    '৫.৪ আয়নিক বন্ধন গঠন ও বৈশিষ্ট্য (Ionic Bond Formation & Properties)',
    'les_ssc_chemistry_ch5_4',
    {
      titleBangla: 'আয়নিক বন্ধন গঠন প্রক্রিয়া, স্ফটিক জালিকা ও ভৌত বৈশিষ্ট্য',
      learningGoal: 'ক্যাটায়ন ও অ্যানায়নের স্থির বৈদ্যুতিক আকর্ষণে আয়নিক বন্ধন গঠন এবং এর গলনাঙ্ক, দ্রাব্যতা ও পরিবাহিতা ব্যাখ্যা করা।',
      explanation: `
### আয়নিক বন্ধন (Ionic Bond)
ধাতু তার সর্ববহিঃস্থ স্তরের ইলেকট্রন অধাতুকে সম্পূর্ণভাবে প্রদান করে ধনাত্মক **ক্যাটায়নে** পরিণত হয় এবং অধাতু ইলেকট্রন গ্রহণ করে ঋণাত্মক **অ্যানায়নে** পরিণত হয়। বিপরীতধর্মী এই আয়নসমূহ **স্থির বৈদ্যুতিক আকর্ষণ বল (Electrostatic force)** দ্বারা আবদ্ধ হয়ে যে বন্ধন তৈরি করে, তাকে **আয়নিক বন্ধন** বলে।
$$\\text{Na} \\rightarrow \\text{Na}^+ + e^-$$
$$\\text{Cl} + e^- \\rightarrow \\text{Cl}^-$$
$$\\text{Na}^+ + \\text{Cl}^- \\rightarrow \\text{NaCl}$$

### আয়নিক যৌগের বৈশিষ্ট্য
1. **উচ্চ গলনাঙ্ক ও স্ফুটনাঙ্ক:** ত্রিমাত্রিক ক্রিস্টাল ল্যাটিসে ক্যাটায়ন ও অ্যানায়ন সুদৃঢ়ভাবে আবদ্ধ থাকে (যেমন $\\text{NaCl}$-এর গলনাঙ্ক ৮০১°C, স্ফুটনাঙ্ক ১৪৬৫°C)।
2. **পোলার দ্রাবকে দ্রবণীয়তা:** পানির আংশিক ঋণাত্মক অক্সিজেন ($O^{\\delta-}$) ক্যাটায়নকে এবং আংশিক ধনাত্মক হাইড্রোজেন ($H^{\\delta+}$) অ্যানায়নকে আকর্ষণ করে ল্যাটিস ভেঙে দ্রবীভূত করে।
3. **বিদ্যুৎ পরিবাহিতা:** 
   - **কঠিন অবস্থায়:** আয়নগুলো জালিকায় আবদ্ধ থাকে বলে বিদ্যুৎ অপরিবাহী ($0\\text{ mA}$)।
   - **গলিত বা জলীয় দ্রবণে:** মুক্ত আয়নসমূহ চলাচল করতে পারে বলে তীব্র বিদ্যুৎ পরিবাহী।
4. **ভঙ্গুরতা (Brittleness):** বাহ্যিক চাপ বা আঘাতে আয়নের স্তর পিছলে গেলে সমধর্মী আয়ন মুখোমুখি হয়ে বিকর্ষণ করে স্ফটিক ভেঙে যায়।
      `.trim(),
      interactiveWidgetUrl: WIDGET_URL,
      importantTerms: [
        { termBangla: 'আয়নিক বন্ধন', termEnglish: 'Ionic Bond', definition: 'ধাতু ও অধাতুর মধ্যে ইলেকট্রন আদান-প্রদানের ফলে সৃষ্ট আয়নসমূহের মধ্যকার স্থির বৈদ্যুতিক আকর্ষণ বল।' },
        { termBangla: 'স্ফটিক জালিকা', termEnglish: 'Crystal Lattice', definition: 'আয়নসমূহ দ্বারা গঠিত নিয়মিত ত্রিমাত্রিক জ্যামিতিক বিন্যাস।' },
        { termBangla: 'হাইড্রেশন শক্তি', termEnglish: 'Hydration Energy', definition: 'পানির পোলার অণু কর্তৃক আয়নিক স্ফটিকের আয়নসমূহ আকর্ষিত হওয়ার মাধ্যমে নির্গত শক্তি।' },
      ],
      workedExample: {
        problem: 'কঠিন খাবার লবণ বিদ্যুৎ পরিবহন করে না কিন্তু গলিত বা দ্রবীভূত অবস্থায় চমৎকার পরিবাহী কেন?',
        stepByStepSolution: 'বিদ্যুৎ পরিবহনের জন্য সচল চার্জবাহী কণা প্রয়োজন। কঠিন স্ফটিকে Na+ ও Cl- আয়নগুলো শক্তিশালী ল্যাটিস বলে দৃঢ়ভাবে নির্দিষ্ট অবস্থানে আবদ্ধ থাকে, ফলে কোনো মুক্ত আয়ন থাকে না। কিন্তু জলীয় দ্রবণে বা গলিত অবস্থায় ল্যাটিস ভেঙে আয়নগুলো মুক্তভাবে স্থানান্তরিত হতে পারে, ফলে তড়িৎ পরিবহন সম্পন্ন হয়।',
      },
      memoryAid: 'কঠিনে আয়ন বন্দি (বিদ্যুৎ নেই), পানিতে আয়ন মুক্ত (তীব্র বিদ্যুৎ)!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // =========================================================================
  // Lesson 5.5: সমযোজী বন্ধন গঠন ও বৈশিষ্ট্য
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch5_5',
    chapter5.id,
    5,
    '৫.৫ সমযোজী বন্ধন গঠন ও বৈশিষ্ট্য (Covalent Bond Formation & Properties)',
    'les_ssc_chemistry_ch5_5',
    {
      titleBangla: 'সমযোজী বন্ধন গঠন, মুক্তজোড়-বন্ধনজোড় ও পোলারিটি তত্ত্ব',
      learningGoal: 'দুটি অধাতুর ইলেকট্রন শেয়ারিং, বন্ধনজোড় ও মুক্তজোড় গণনা এবং পানির পোলারিটি ধর্ম বিশ্লেষণ করা।',
      explanation: `
### সমযোজী বন্ধন (Covalent Bond)
দুটি অধাতব পরমাণু তাদের সর্ববহিঃস্থ স্তরের ইলেকট্রন পরস্পরের সাথে সমানভাবে শেয়ারের মাধ্যমে যে রাসায়নিক বন্ধন তৈরি করে, তাকে **সমযোজী বন্ধন** বলে।
- **একক বন্ধন:** ১ জোড়া ইলেকট্রন শেয়ার (যেমন $\\text{H}-\\text{H}, \\text{Cl}-\\text{Cl}, \\text{CH}_4$)।
- **দ্বিবন্ধন:** ২ জোড়া ইলেকট্রন শেয়ার (যেমন $\\text{O}=\\text{O}$)।
- **ত্রিবন্ধন:** ৩ জোড়া ইলেকট্রন শেয়ার (যেমন $\\text{N}\\equiv\\text{N}$)।

### বন্ধনজোড় (Bond Pair) ও মুক্তজোড় (Lone Pair)
- **বন্ধনজোড় (bp):** যে ইলেকট্রন জোড়া দুটি পরমাণুর মাঝে রাসায়নিক বন্ধনে অংশ নেয়।
- **মুক্তজোড় (lp):** যোজ্যতা স্তরে থাকা সত্ত্বেও যে ইলেকট্রন জোড়া বন্ধন তৈরিতে অংশ নেয় না।
  - $\\text{CH}_4$: ৪ জোড়া bp, ০ জোড়া lp।
  - $\\text{NH}_3$: ৩ জোড়া bp, ১ জোড়া lp।
  - $\\text{H}_2\\text{O}$: ২ জোড়া bp, ২ জোড়া lp।

### পোলারিটি (Polarity)
সমযোজী যৌগে পরমাণুদ্বয়ের তড়িৎ ঋণাত্মকতার পার্থক্যের কারণে শেয়ারকৃত ইলেকট্রন মেঘ অধিক তড়িৎ ঋণাত্মক মৌলের দিকে সরে যায়। ফলে আংশিক ঋণাত্মক ($\\delta^-$) ও আংশিক ধনাত্মক ($\\delta^+$) ডাইপোল সৃষ্টি হয়।
- যেমন পানিতে অক্সিজেনের তড়িৎ ঋণাত্মকতা ৩.৫ ও হাইড্রোজেনের ২.১। পার্থক্য ১.৪ হওয়ায় পানি একটি উৎকৃষ্ট পোলার সমযোজী দ্রাবক।
      `.trim(),
      interactiveWidgetUrl: WIDGET_URL,
      importantTerms: [
        { termBangla: 'সমযোজী বন্ধন', termEnglish: 'Covalent Bond', definition: 'দুটি অধাতব পরমাণুর মধ্যে ইলেকট্রন শেয়ারের মাধ্যমে গঠিত রাসায়নিক বন্ধন।' },
        { termBangla: 'বন্ধনজোড় ইলেকট্রন', termEnglish: 'Bond Pair Electrons', definition: 'সমযোজী বন্ধন গঠনে অংশগ্রহণকারী শেয়ারকৃত ইলেকট্রন জোড়া।' },
        { termBangla: 'মুক্তজোড় ইলেকট্রন', termEnglish: 'Lone Pair Electrons', definition: 'যোজ্যতা স্তরে থাকা অবিভাজিত ইলেকট্রন জোড়া যা বন্ধনে জড়ায় না।' },
        { termBangla: 'পোলারিটি', termEnglish: 'Polarity', definition: 'তড়িৎ ঋণাত্মকতার পার্থক্যের কারণে সমযোজী অণুতে আংশিক ধনাত্মক ও ঋণাত্মক প্রান্তের সৃষ্টি।' },
      ],
      workedExample: {
        problem: 'পানির ($\text{H}_2\text{O}$) অণুতে বন্ধনজোড় ও মুক্তজোড় ইলেকট্রন সংখ্যা নির্ধারণ করো।',
        stepByStepSolution: 'অক্সিজেনের সর্ববহিঃস্থ স্তরে ৬টি ইলেকট্রন থাকে। ২টি হাইড্রোজেনের সাথে ২টি একক বন্ধন গঠন করায় বন্ধনজোড় (bp) = ২ জোড়া। অবশিষ্ট থাকে ৪টি ইলেকট্রন, যা ২ জোড়া অবিভাজিত মুক্তজোড় (lp) হিসেবে অবস্থান করে।',
      },
      memoryAid: 'জোড় সংখ্যা মনে রাখো: মিথেনে মুক্তজোড় ০, অ্যামোনিয়াতে ১, পানিতে ২!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // =========================================================================
  // Lesson 5.6: ধাতব বন্ধন ও আন্তঃআণবিক আকর্ষণ বল
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch5_6',
    chapter5.id,
    6,
    '৫.৬ ধাতব বন্ধন ও আন্তঃআণবিক আকর্ষণ বল (Metallic Bond & Intermolecular Forces)',
    'les_ssc_chemistry_ch5_6',
    {
      titleBangla: 'ধাতব বন্ধন, ইলেকট্রন সাগর মডেল ও আন্তঃআণবিক ভ্যান ডার ওয়ালস বল',
      learningGoal: 'ইলেকট্রন সমুদ্র মডেলের সাহায্যে ধাতুর বিদ্যুৎ পরিবাহিতা ও ঘাতসহনীয়তা এবং সমযোজী অণুর ভ্যান ডার ওয়ালস বল ব্যাখ্যা করা।',
      explanation: `
### ধাতব বন্ধন (Metallic Bond)
ধাতব স্ফটিকে পরমাণুসমূহ তাদের যোজ্যতা ইলেকট্রন ত্যাগ করে ধনাত্মক **পারমাণবিক শাঁস (Positive Atomic Cores)** গঠন করে। ত্যাজ্য ইলেকট্রনগুলো নির্দিষ্ট কোনো পরমাণুর সাথে আবদ্ধ না থেকে সম্পূর্ণ স্ফটিকে **সঞ্চরণশীল ইলেকট্রনের সাগর (Sea of Delocalized Electrons)** তৈরি করে।
- এই ধনাত্মক ধাতব আয়ন এবং সঞ্চরণশীল ইলেকট্রনের মধ্যকার পারস্পরিক আকর্ষণ বলই হলো **ধাতব বন্ধন**।

### ধাতব বৈশিষ্ট্যের কারণ
1. **বিদ্যুৎ পরিবাহিতা:** বিভব পার্থক্য দিলে সঞ্চরণশীল ইলেকট্রনগুলো ধনাত্মক প্রান্তের দিকে ছুটে গিয়ে বিদ্যুৎ পরিবহন করে।
2. **তাপ পরিবাহিতা:** মুক্ত ইলেকট্রন দ্রুত তাপশক্তি শীতল প্রান্তে সঞ্চালিত করে।
3. **ঘাতসহনীয়তা ও নমনীয়তা:** আঘাতে ধাতব স্তর স্থানান্তরিত হলেও ইলেকট্রন সাগর বন্ধন অটুট রাখে, ফলে ধাতু ভাঙে না বরং প্রসারিত হয়ে পাতে রূপ নেয়।
4. **ধাতব দ্যুতি:** মুক্ত ইলেকট্রন আপতিত আলোকে প্রতিফলিত করে চকচকে ভাব তৈরি করে।

### আন্তঃআণবিক আকর্ষণ বল (ভ্যান ডার ওয়ালস বল)
সমযোজী অণুসমূহের মধ্যকার পারস্পরিক দুর্বল আকর্ষণ বলকে **ভ্যান ডার ওয়ালস বল** বলে।
- আণবিক ভর বৃদ্ধির সাথে সাথে এই বলের মাত্রা বৃদ্ধি পায়।
- হ্যালোজেন গ্রুপের ধারাবাহিক পরিবর্তন:
  - $\\text{F}_2, \\text{Cl}_2$: আণবিক ভর কম $\\rightarrow$ দুর্বল আকর্ষণ $\\rightarrow$ **গ্যাস**।
  - $\\text{Br}_2$: আণবিক ভর মাঝারি $\\rightarrow$ মাঝারি আকর্ষণ $\\rightarrow$ **তরল**।
  - $\\text{I}_2$: আণবিক ভর বেশি $\\rightarrow$ শক্তিশালী আকর্ষণ $\\rightarrow$ **কঠিন**।
      `.trim(),
      interactiveWidgetUrl: WIDGET_URL,
      importantTerms: [
        { termBangla: 'ধাতব বন্ধন', termEnglish: 'Metallic Bond', definition: 'ধাতব স্ফটিকে ধনাত্মক পারমাণবিক শাঁস এবং সঞ্চরণশীল ইলেকট্রন সাগরের মধ্যবর্তী আকর্ষণ বল।' },
        { termBangla: 'পারমাণবিক শাঁস', termEnglish: 'Atomic Core', definition: 'যোজ্যতা ইলেকট্রন ত্যাগের পর ধাতব পরমাণুর অবশিষ্ট ধনাত্মক অংশ।' },
        { termBangla: 'ঘাতসহনীয়তা', termEnglish: 'Malleability', definition: 'আঘাতে চূর্ণ না হয়ে পাতলা পাতে রূপান্তর হওয়ার ধাতব ধর্ম।' },
        { termBangla: 'ভ্যান ডার ওয়ালস বল', termEnglish: 'Van der Waals Force', definition: 'সমযোজী অণুসমূহের পারস্পরিক দুর্বল আন্তঃআণবিক আকর্ষণ বল।' },
      ],
      workedExample: {
        problem: 'হাতুড়ি দিয়ে আঘাত করলে খাবার লবণের স্ফটিক ভেঙে যায় কিন্তু লোহার পাত প্রসারিত হয় কেন?',
        stepByStepSolution: 'লবণ একটি আয়নিক যৌগ। আঘাতে ল্যাটিসের স্তর পিছলে গেলে সমধর্মী আয়ন (Na+ এর নিচে Na+) মুখোমুখি পড়ে তীব্র বিকর্ষণে ভেঙে চুরমার হয়। পক্ষান্তরে লোহা একটি ধাতব পদার্থ; আঘাতে পারমাণবিক শাঁসের স্তর স্থানান্তরিত হলেও সঞ্চরণশীল ইলেকট্রন সাগর বন্ধন অক্ষুণ্ণ রাখে, ফলে লোহা ভেঙে না গিয়ে প্রসারিত হয়।',
      },
      memoryAid: 'ধাতু বাঁকে কিন্তু ভাঙে না (ঘাতসহ); লবণ ভেঙে চুরমার হয় (ভঙ্গুর)!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // =========================================================================
  // Upsert all 72 verified questions (54 MCQs + 18 CQs)
  // =========================================================================
  console.log(`Inserting/Updating ${chemistryChapter5AllQuestions.length} verified questions for Chemistry Chapter 5...`);
  for (const q of chemistryChapter5AllQuestions) {
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

  const activeTopicIds = [
    'top_ssc_chemistry_ch5_1',
    'top_ssc_chemistry_ch5_2',
    'top_ssc_chemistry_ch5_3',
    'top_ssc_chemistry_ch5_4',
    'top_ssc_chemistry_ch5_5',
    'top_ssc_chemistry_ch5_6',
  ];

  await prisma.lesson.deleteMany({
    where: {
      topic: { chapterId: chapter5.id },
      topicId: { notIn: activeTopicIds },
    },
  });

  await prisma.topic.deleteMany({
    where: {
      chapterId: chapter5.id,
      id: { notIn: activeTopicIds },
    },
  });

  console.log(`✅ SSC Chemistry Chapter 5 seeded (${chemistryChapter5AllQuestions.length} verified questions).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedChemistryChapter5(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Chemistry Chapter 5 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
