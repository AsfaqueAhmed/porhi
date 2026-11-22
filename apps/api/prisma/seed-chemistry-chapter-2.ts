import { PrismaClient, ContentStatus } from '@prisma/client';
import { chemistryChapter2QuestionsBatch1 } from './seed-chemistry-chapter-2-questions';
import { chemistryChapter2QuestionsBatch2 } from './seed-chemistry-chapter-2-questions-batch2';
import { chemistryChapter2QuestionsBatch3 } from './seed-chemistry-chapter-2-questions-batch3';

export const sscChemistrySubject = {
  id: 'sub_ssc_chemistry',
  code: 'ssc_chemistry',
  nameBangla: 'রসায়ন',
  classLevel: 'CLASS_9_10',
  program: 'SSC',
  syllabusYear: 2026,
  isReady: true,
};

export const chemistryChapter2AllQuestions = [
  ...chemistryChapter2QuestionsBatch1,
  ...chemistryChapter2QuestionsBatch2,
  ...chemistryChapter2QuestionsBatch3,
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

export async function seedChemistryChapter2(prisma: PrismaClient) {
  console.log('🧪 Seeding SSC Chemistry Chapter 2 (পদার্থের অবস্থা / States of Matter)...');

  await prisma.subject.upsert({
    where: { code: sscChemistrySubject.code },
    update: sscChemistrySubject,
    create: sscChemistrySubject,
  });

  const chapter2 = await prisma.chapter.upsert({
    where: { id: 'chap_ssc_chemistry_ch2' },
    update: {
      subjectId: sscChemistrySubject.id,
      orderIndex: 2,
      titleBangla: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা (States of Matter)',
    },
    create: {
      id: 'chap_ssc_chemistry_ch2',
      subjectId: sscChemistrySubject.id,
      orderIndex: 2,
      titleBangla: 'দ্বিতীয় অধ্যায়: পদার্থের অবস্থা (States of Matter)',
    },
  });

  const INTERACTIVE_URL = '/uploads/interactive/diffusion-states-of-matter-lab.html';

  // -------------------------------------------------------------------------
  // Topic 2.1: পদার্থের অবস্থা (States of Matter)
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch2_1',
    chapter2.id,
    1,
    '২.১ পদার্থের অবস্থা (States of Matter)',
    'les_ssc_chemistry_ch2_1',
    {
      titleBangla: 'পদার্থের তিন ভৌত অবস্থা: কঠিন, তরল ও গ্যাসীয়',
      learningGoal: 'পদার্থের কঠিন, তরল ও গ্যাসীয় অবস্থার মৌলিক বৈশিষ্ট্য, নির্দিষ্ট আকার ও আয়তন, সংকোচনশীলতা এবং আন্তঃআণবিক আকর্ষণ বল ও দূরত্বের সম্পর্ক তুলনা ও ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. পদার্থের ভৌত অবস্থাসমূহ
যার নির্দিষ্ট ভর আছে এবং যা স্থান দখল করে তাকে **পদার্থ** বলে। তাপমাত্রা ও চাপের উপর ভিত্তি করে যেকোনো পদার্থ তিনটি ভৌত অবস্থায় বিরাজ করতে পারে:
1. **কঠিন (Solid):** নির্দিষ্ট আকার এবং নির্দিষ্ট আয়তন উভয়ই রয়েছে। কণাগুলো অত্যন্ত কাছাকাছি ঠাসাঠাসি অবস্থায় সুশৃঙ্খলভাবে থাকে। চাপ দিলে সংকুচিত হয় না।
2. **তরল (Liquid):** নির্দিষ্ট আয়তন আছে কিন্তু নির্দিষ্ট কোনো আকার নেই; যে পাত্রে রাখা হয় সেই পাত্রের আকার ধারণ করে। কণাগুলো কঠিনের চেয়ে কিছুটা দূরে অবস্থান করে এবং পিছলে চলতে পারে। চাপ দিলে প্রায় সংকুচিত হয় না।
3. **গ্যাসীয় (Gas/Vapour):** নির্দিষ্ট আকার বা নির্দিষ্ট আয়তন কোনোটিই নেই। যেকোনো পাত্রে রাখলে তার পুরো আয়তন দখল করে। কণাগুলোর মধ্যবর্তী দূরত্ব অত্যন্ত বেশি এবং চাপ দিলে আয়তন ব্যাপক হ্রাস পায়।

### ২. আন্তঃআণবিক আকর্ষণ বল ও আন্তঃআণবিক দূরত্ব
- পদার্থের ভেতরের কণাগুলো (অণু বা পরমাণু) পরস্পরের প্রতি যে আকর্ষণ বল অনুভব করে তাকে **আন্তঃআণবিক আকর্ষণ বল (Intermolecular Attraction Force)** বলে।
- কণাগুলোর পারস্পরিক ফাঁকা স্থানকে **আন্তঃআণবিক দূরত্ব (Intermolecular Distance)** বলে।
- সম্পর্ক: $\\text{আন্তঃআণবিক বল} \\propto \\frac{1}{\\text{আন্তঃআণবিক দূরত্ব}}$।`,
      interactiveWidgetUrl: INTERACTIVE_URL,
      importantTerms: [
        { termBangla: 'পদার্থ', termEnglish: 'Matter', definition: 'যার ভর আছে, স্থান দখল করে এবং জড়তা রয়েছে।' },
        { termBangla: 'আন্তঃআণবিক আকর্ষণ বল', termEnglish: 'Intermolecular Force', definition: 'পদার্থের ভেতরের পাশাপাশি কণাগুলোর পারস্পরিক আকর্ষণ।' },
        { termBangla: 'আন্তঃআণবিক দূরত্ব', termEnglish: 'Intermolecular Space', definition: 'পদার্থের কণাগুলোর মধ্যবর্তী আপেক্ষিক ব্যবধান।' },
        { termBangla: 'সংকোচনশীলতা', termEnglish: 'Compressibility', definition: 'বাহ্যিক চাপ প্রয়োগে আয়তন হ্রাস করার ধর্ম; গ্যাসে সর্বোচ্চ।' },
      ],
      workedExample: {
        problem: 'একটি ১ লিটার সিলিন্ডারে রক্ষিত নির্দিষ্ট ভরের গ্যাসকে ৫ লিটারের খালি পাত্রে ছেড়ে দিলে তার আয়তন কত হবে এবং কেন?',
        stepByStepSolution: '১. গ্যাসীয় পদার্থের কোনো নির্দিষ্ট আয়তন নেই।\n২. গ্যাসীয় অণুগুলোর আন্তঃআণবিক আকর্ষণ বল প্রায় শূন্য হওয়ায় কণাগুলো অবাধে পাত্রের সর্বত্র ছড়িয়ে পড়ে।\n৩. অতএব গ্যাসটি ৫ লিটার পাত্রের সম্পূর্ণ স্থান দখল করবে এবং এর আয়তন হবে ৫ লিটার।',
      },
      memoryAid: 'কঠিনের আকার-আয়তন পাকা, তরলের আকার পাত্রে ফাঁকা, গ্যাসের সব উড়ে যায় ঢাকা!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 2.2: কণার গতিতত্ত্ব (Kinetic Theory of Particles)
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch2_2',
    chapter2.id,
    2,
    '২.২ কণার গতিতত্ত্ব (Kinetic Theory of Particles)',
    'les_ssc_chemistry_ch2_2',
    {
      titleBangla: 'কণার গতিতত্ত্ব ও তিন অবস্থার আণবিক ব্যাখ্যা',
      learningGoal: 'কণার গতিতত্ত্বের মূল স্বীকার্যসমূহ ব্যাখ্যা করতে পারবে এবং তাপমাত্রার পরিবর্তনে কণার গতিশক্তি ও আন্তঃকণা আকর্ষণ বলের পরিবর্তনের আলোকে তিন অবস্থার রূপান্তর বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. কণার গতিতত্ত্বের মূল স্বীকার্য
সকল পদার্থই অতি ক্ষুদ্র কণা দ্বারা গঠিত। এই কণাগুলোর মধ্যে দুটি প্রধান নিয়ামক কাজ করে:
1. **আন্তঃকণা আকর্ষণ বল:** কণাগুলোকে পরস্পরের কাছে টেনে ধরে রাখতে চায়।
2. **কণার গতিশক্তি ($E_k$):** কণাগুলোকে ইতস্তত ছড়িয়ে দিয়ে দূরে পাঠিয়ে দিতে চায়।
আন্তঃকণা আকর্ষণ বল এবং কণাগুলোর গতিশক্তির মাধ্যমে পদার্থের কঠিন, তরল ও গ্যাসীয় অবস্থা ব্যাখ্যা করার তত্ত্বকে **কণার গতিতত্ত্ব (Kinetic Theory of Particles)** বলে।

### ২. কণার গতিশক্তি ও তাপমাত্রা
- কণার গড় গতিশক্তি কেলভিন তাপমাত্রার সরাসরি সমানুপাতিক: $\\overline{E_k} \\propto T$।
- তাপমাত্রা বাড়লে কণার গতিশক্তি বাড়ে এবং কণাগুলো তীব্র বেগে ছুটোছুটি করে।
- **পরম শূন্য তাপমাত্রা (0 K বা -273.15°C):** যে তাপমাত্রায় তাত্ত্বিকভাবে সকল কণার গতিশক্তি সম্পূর্ণ থেমে যায়।

### ৩. গতিতত্ত্বের সাহায্যে অবস্থার রূপান্তর
- **কঠিন:** আকর্ষণ বল $\\gg$ গতিশক্তি $\\implies$ কণা কেবল নিজ অবস্থানে কাঁপে।
- **তরল:** আকর্ষণ বল $\\approx$ গতিশক্তি $\\implies$ কণাগুলো গড়িয়ে স্থান পরিবর্তন করে।
- **গ্যাসীয়:** গতিশক্তি $\\gg$ আকর্ষণ বল $\\implies$ কণা বাঁধনমুক্ত হয়ে তীব্র বেগে পাত্রের দেয়ালে চাপ দেয়।`,
      interactiveWidgetUrl: INTERACTIVE_URL,
      importantTerms: [
        { termBangla: 'কণার গতিতত্ত্ব', termEnglish: 'Kinetic Theory of Particles', definition: 'আকর্ষণ বল ও গতিশক্তির মিথস্ক্রিয়া দিয়ে পদার্থের অবস্থা ব্যাখ্যার তত্ত্ব।' },
        { termBangla: 'গতিশক্তি', termEnglish: 'Kinetic Energy', definition: 'গতির কারণে কণার অর্জিত শক্তি; কেলভিন তাপমাত্রার সমানুপাতিক।' },
        { termBangla: 'পরম শূন্য তাপমাত্রা', termEnglish: 'Absolute Zero', definition: '0 K বা -273.15°C; যেখানে কণার গতি সম্পূর্ণ স্তব্ধ হয়।' },
      ],
      workedExample: {
        problem: 'আবদ্ধ পাত্রে গ্যাসকে তাপ দিলে ভেতরের চাপ বৃদ্ধি পায় কেন? কণার গতিতত্ত্ব দিয়ে ব্যাখ্যা করো।',
        stepByStepSolution: '১. তাপমাত্রা বাড়ালে গ্যাসের কণাগুলোর গড় গতিশক্তি বৃদ্ধি পায় ($E_k \\propto T$)।\n২. কণাগুলোর বেগ বৃদ্ধি পাওয়ায় তারা আগের চেয়ে অনেক বেশি বল ও সংখ্যায় পাত্রের অভ্যন্তরীণ দেয়ালে আঘাত করে।\n৩. একক ক্ষেত্রফলে প্রযুক্ত এই ঘাত বল বৃদ্ধি পাওয়ায় অভ্যন্তরীণ চাপ বৃদ্ধি পায়।',
      },
      memoryAid: 'তাপে বাড়ে কম্পন, ভাঙে কণার বন্ধন; মুক্ত হলে চারদিকে, গ্যাসে হয় রূপান্তর!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 2.3: ব্যাপন ও নিঃসরণ (Diffusion and Effusion)
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch2_3',
    chapter2.id,
    3,
    '২.৩ ব্যাপন ও নিঃসরণ (Diffusion and Effusion)',
    'les_ssc_chemistry_ch2_3',
    {
      titleBangla: 'ব্যাপন, নিঃসরণ, গ্রাহামের সূত্র ও কাচনলে NH₃-HCl পরীক্ষা',
      learningGoal: 'ব্যাপন ও নিঃসরণের পার্থক্য নিরূপণ করতে পারবে, গ্রাহামের ব্যাপন সূত্র ($r \\propto 1/\\sqrt{M}$) প্রয়োগ করে গ্যাসের ব্যাপন হারের তুলনা করতে পারবে এবং কাচনলে $NH_3$ ও $HCl$ এর ব্যাপন পরীক্ষা বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. ব্যাপন (Diffusion)
কোনো মাধ্যমে কঠিন, তরল বা গ্যাসীয় কণার স্বতঃস্ফূর্ত ও সমানভাবে চারদিকে ছড়িয়ে পড়ার প্রাকৃতিক প্রক্রিয়াকে **ব্যাপন** বলে।
- এটি উচ্চ ঘনমাত্রার স্থান থেকে নিম্ন ঘনমাত্রার দিকে স্বতঃস্ফূর্তভাবে ঘটে।
- তাপমাত্রা বাড়লে কণার গতিশক্তি বৃদ্ধি পাওয়ায় ব্যাপনের হার বাড়ে ($KMnO_4$ গরম পানিতে ঠান্ডা পানির চেয়ে দ্রুত ছড়ায়)।

### ২. নিঃসরণ (Effusion)
সরু ছিদ্রপথে কোনো গ্যাসের অণুগুলোর উচ্চচাপ অঞ্চল থেকে নিম্নচাপ অঞ্চলে সজোরে বেরিয়ে আসার প্রক্রিয়াকে **নিঃসরণ** বলে।
- পাকা কাঁঠালের গন্ধ বা সিলিন্ডার লিক: আগে সরু ছিদ্র দিয়ে নিঃসরণ ঘটে, পরে বাতাসে ব্যাপন ঘটে।

### ৩. গ্রাহামের ব্যাপন সূত্র
স্থির তাপমাত্রা ও চাপে কোনো গ্যাসের ব্যাপন বা নিঃসরণের হার ($r$) তার আণবিক বা মোলার ভরের ($M$) বর্গমূলের ব্যস্তানুপাতিক:
$$\\frac{r_1}{r_2} = \\sqrt{\\frac{M_2}{M_1}}$$
**নোট:** যে গ্যাসের মোলার ভর যত কম (হালকা), তার ব্যাপন হার তত বেশি।

### ৪. কাচনলে গ্যাসীয় ব্যাপন পরীক্ষা ($NH_3$ ও $HCl$)
কাচনলের এক প্রান্তে ঘন $NH_4OH$ ($NH_3$ নির্গত হয়, $M=17$) এবং অন্য প্রান্তে ঘন $HCl$ ($HCl$ নির্গত হয়, $M=36.5$) এর তুলা দিলে:
$$\\frac{r_{NH_3}}{r_{HCl}} = \\sqrt{\\frac{36.5}{17}} \\approx 1.465$$
$NH_3$ হালকা হওয়ায় বেশি দূরত্ব অতিক্রম করে এবং $HCl$ প্রান্তের কাছাকাছি এসে ঘন সাদা ধোঁয়ার বলয় তৈরি করে:
$$NH_3(g) + HCl(g) \\longrightarrow NH_4Cl(s)\\quad (\\text{নিশাদলের সাদা ধোঁয়া})$$`,
      interactiveWidgetUrl: INTERACTIVE_URL,
      importantTerms: [
        { termBangla: 'ব্যাপন', termEnglish: 'Diffusion', definition: 'উচ্চ ঘনমাত্রা থেকে নিম্ন ঘনমাত্রায় কণার স্বতঃস্ফূর্ত সমভাবে বিস্তার।' },
        { termBangla: 'নিঃসরণ', termEnglish: 'Effusion', definition: 'সরু ছিদ্রপথে উচ্চ চাপের অঞ্চল থেকে নিম্ন চাপের অঞ্চলে গ্যাসের সজোরে নির্গমন।' },
        { termBangla: 'গ্রাহামের সূত্র', termEnglish: 'Graham\'s Law', definition: 'গ্যাসের ব্যাপন হার মোলার ভরের বর্গমূলের ব্যস্তানুপাতিক।' },
        { termBangla: 'নিশাদল', termEnglish: 'Ammonium Chloride', definition: 'NH₄Cl; কাচনলে সাদা ধোঁয়া হিসেবে উৎপন্ন ঊর্ধ্বপাতিত কঠিন।' },
      ],
      workedExample: {
        problem: '১০০ সেমি কাচনলের দুই প্রান্তে একই সাথে NH₃ ও HCl প্রবেশ করালে NH₃ প্রান্ত থেকে কত দূরে সাদা ধোঁয়া তৈরি হবে?',
        stepByStepSolution: '১. ধরি NH₃ এর দূরত্ব x cm, তাহলে HCl এর দূরত্ব (100 - x) cm।\n২. দূরত্বের অনুপাত: x / (100 - x) = √(36.5 / 17) = 1.465\n৩. x = 1.465(100 - x) => 2.465x = 146.5 => x ≈ 59.43 cm।\n৪. উত্তর: NH₃ প্রান্ত থেকে ৫৯.৪৩ সেমি দূরে (HCl প্রান্তের কাছাকাছি) সাদা ধোঁয়া গঠিত হবে।',
      },
      memoryAid: 'যার ভর হালকা সে ছোটে আগে, যার ভর ভারী সে পেছনের ভাগে!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 2.4: মোমবাতির জ্বলন ও পদার্থের তিন অবস্থা
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch2_4',
    chapter2.id,
    4,
    '২.৪ মোমবাতির জ্বলন ও পদার্থের তিন অবস্থা (Combustion of Candle)',
    'les_ssc_chemistry_ch2_4',
    {
      titleBangla: 'মোমবাতির জ্বলন, ভৌত-রাসায়নিক পরিবর্তন ও দহন বিক্রিয়া',
      learningGoal: 'মোমবাতির জ্বলনের সময় একই সাথে কঠিন, তরল ও গ্যাসীয় অবস্থার প্রকাশ প্রদর্শন করতে পারবে এবং মোমের গলন (ভৌত) ও দহনের (রাসায়নিক) পার্থক্য সমীকরণসহ ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. মোম কী?
মোম হলো মূলত উচ্চ আণবিক ভরের কঠিন সম্পৃক্ত **হাইড্রোকার্বনের (কার্বন ও হাইড্রোজেনের যৌগ)** একটি মিশ্রণ ($C_n H_{2n+2}$)।

### ২. একসাথে তিন অবস্থার সহাবস্থান
- **কঠিন:** মোমবাতির মূল কাঠামো ও নিচের অংশ কঠিন মোম।
- **তরল:** শিখার তাপে সলতের গোড়ার মোম গলে তরলে রূপ নেয় এবং কৈশিক প্রক্রিয়ায় সলতে বেয়ে উপরে ওঠে।
- **গ্যাসীয়:** শিখার প্রচণ্ড তাপে তরল মোম বাষ্পীভূত হয় এবং সেই গ্যাসীয় বাষ্পই বাতাসের অক্সিজেনের সাথে বিক্রিয়া করে আলো ও তাপ ছড়িয়ে জ্বলে।

### ৩. ভৌত পরিবর্তন বনাম রাসায়নিক পরিবর্তন
- **মোমের গলন ও জমাট বাঁধা:** ভৌত পরিবর্তন (কোনো নতুন পদার্থ সৃষ্টি হয় না, সংযুতি একই থাকে)।
- **মোমের জ্বলন (দহন):** রাসায়নিক পরিবর্তন (অক্সিজেনের সাথে বিক্রিয়ায় নতুন পদার্থ $CO_2$ ও $H_2O$ সৃষ্টি হয় যা থেকে আগের মোম আর পাওয়া যায় না)।

### ৪. মোমের দহন সমীকরণ
$$\\text{হাইড্রোকার্বন (মোম)} + O_2(g) \\xrightarrow{\\text{তাপ}} CO_2(g) + H_2O(g) + \\text{তাপ ও আলোকশক্তি}$$`,
      interactiveWidgetUrl: INTERACTIVE_URL,
      importantTerms: [
        { termBangla: 'হাইড্রোকার্বন', termEnglish: 'Hydrocarbon', definition: 'কার্বন ও হাইড্রোজেন দ্বারা গঠিত জৈব যৌগ (যেমন মোম)।' },
        { termBangla: 'দহন বিক্রিয়া', termEnglish: 'Combustion', definition: 'বাতাসের অক্সিজেনের সাথে তীব্র তাপোৎপাদী বিক্রিয়া।' },
        { termBangla: 'কৈশিক ক্রিয়া', termEnglish: 'Capillary Action', definition: 'সলতের সূক্ষ্ম ফাঁক দিয়ে তরল মোমের স্বয়ংক্রিয়ভাবে উপরে ওঠার ধর্ম।' },
      ],
      workedExample: {
        problem: 'মোমবাতির জ্বলনে একই সাথে ভৌত ও রাসায়নিক পরিবর্তন ঘটে—উক্তিটি প্রমাণ করো।',
        stepByStepSolution: '১. শিখার তাপে কঠিন মোম গলে তরল হয় এবং নিচে পড়ে পুনরায় জমে কঠিন মোম হয়—এটি ভৌত পরিবর্তন কারণ এতে নতুন কোনো অণু তৈরি হয় না।\n২. গলিত মোম বাষ্পীভূত হয়ে বাতাসে অক্সিজেনের সাথে জারিত হয়ে CO₂ ও জলীয় বাষ্পে পরিণত হয়—এটি রাসায়নিক পরিবর্তন কারণ সম্পূর্ণ নতুন পদার্থ গঠিত হয়।\n৩. অতএব মোমবাতির জ্বলনে ভৌত ও রাসায়নিক উভয় পরিবর্তন যুগপৎ সংঘটিত হয়।',
      },
      memoryAid: 'মোমবাতির শরীর কঠিন, গোড়ায় তরল রূপ; শিখায় বাষ্প হয়ে আলো দেয় অপরূপ!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 2.5: গলন ও স্ফুটন (Melting and Boiling)
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch2_5',
    chapter2.id,
    5,
    '২.৫ গলন ও স্ফুটন (Melting and Boiling)',
    'les_ssc_chemistry_ch2_5',
    {
      titleBangla: 'গলনাঙ্ক, স্ফুটনাঙ্ক, সুপ্ততাপ ও বরফের হিটিং কার্ভ বিশ্লেষণ',
      learningGoal: 'গলনাঙ্ক ও স্ফুটনাঙ্কের সংজ্ঞা দিতে পারবে, বরফের তাপ প্রদান ও শীতলীকরণ রেখাচিত্রে সুপ্ততাপের কারণে তাপমাত্রা স্থির থাকার মালভূমি ব্যাখ্যা করতে পারবে এবং অপদ্রব্যের প্রভাব বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. গলনাঙ্ক ও স্ফুটনাঙ্ক
- **গলনাঙ্ক (Melting Point):** ১ atm চাপে যে নির্দিষ্ট তাপমাত্রায় বিশুদ্ধ কঠিন পদার্থ তরলে পরিণত হতে শুরু করে। বিশুদ্ধ বরফের গলনাঙ্ক **০°C (273.15 K)**।
- **স্ফুটনাঙ্ক (Boiling Point):** ১ atm চাপে যে নির্দিষ্ট তাপমাত্রায় বিশুদ্ধ তরল ফুটতে শুরু করে এবং বাষ্পে পরিণত হয়। বিশুদ্ধ পানির স্ফুটনাঙ্ক **১০০°C (373.15 K)**।

### ২. বরফের তাপ প্রদান রেখাচিত্র (Heating Curve)
- **-২০°C থেকে ০°C:** বরফের তাপমাত্রা বৃদ্ধি (কঠিন কণার কম্পন বেগ বাড়ে)।
- **০°C এ অনুভূমিক মালভূমি:** বরফের গলন (গলনের সুপ্ততাপ)। এখানে সরবরাহকৃত তাপ গতিশক্তি না বাড়িয়ে আন্তঃআণবিক আকর্ষণ বল ভাঙতে ব্যয় হয়, তাই তাপমাত্রা স্থির থাকে।
- **০°C থেকে ১০০°C:** তরল পানির তাপমাত্রা বৃদ্ধি।
- **১০০°C এ অনুভূমিক মালভূমি:** পানির স্ফুটন (বাষ্পীভবনের সুপ্ততাপ)। তরলের আকর্ষণ বল সম্পূর্ণ ভেঙে মুক্ত গ্যাসে পরিণত হতে তাপ ব্যয় হয়, তাপমাত্রা স্থির থাকে।
- **১০০°C এর উপরে:** জলীয় বাষ্পের তাপমাত্রা বৃদ্ধি।

### ৩. অপদ্রব্য ও চাপের প্রভাব
- ভেজাল থাকলে কঠিনের গলনাঙ্ক স্বাভাবিকের চেয়ে কমে এবং স্ফুটনাঙ্ক বাড়ে।
- পাহাড়ে চাপ কম থাকায় পানির স্ফুটনাঙ্ক ১০০°C অপেক্ষা কম হয়।
- প্রেসার কুকারে চাপ বাড়িয়ে স্ফুটনাঙ্ক ১২০°C এ উন্নীত করে দ্রুত রান্না সম্পন্ন করা হয়।`,
      interactiveWidgetUrl: INTERACTIVE_URL,
      importantTerms: [
        { termBangla: 'গলনাঙ্ক', termEnglish: 'Melting Point', definition: '১ atm চাপে যে তাপমাত্রায় কঠিন পদার্থ তরলে রূপ নেয় (বরফের ০°C)।' },
        { termBangla: 'স্ফুটনাঙ্ক', termEnglish: 'Boiling Point', definition: '১ atm চাপে যে তাপমাত্রায় তরল ফুটতে শুরু করে বাষ্পে রূপ নেয় (পানির ১০০°C)।' },
        { termBangla: 'সুপ্ততাপ', termEnglish: 'Latent Heat', definition: 'অবস্থার পরিবর্তনের সময় তাপমাত্রা স্থির রেখে গৃহীত বা বর্জিত তাপ।' },
      ],
      workedExample: {
        problem: 'বরফ গলনের সময় তাপ দেওয়া সত্ত্বেও তাপমাত্রা ০°C-এ স্থির থাকে কেন?',
        stepByStepSolution: '১. তাপমাত্রা হলো কণাগুলোর গড় গতিশক্তির বহিঃপ্রকাশ (T ∝ Ek)।\n২. গলনকালে সরবরাহকৃত তাপ কণার গতিশক্তি না বাড়িয়ে কঠিনের শক্তিশালী আন্তঃআণবিক বন্ধন ভাঙতে ব্যয় হয়।\n৩. সম্পূর্ণ বরফ পানিতে পরিণত না হওয়া পর্যন্ত গতিশক্তি অপরিবর্তিত থাকে বলে তাপমাত্রা ০°C-এ স্থির থাকে।',
      },
      memoryAid: 'কঠিন থেকে তরলে ০°C-তে থামে, তরল থেকে গ্যাসে ১০০°C-তে নামে!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 2.6: পাতন ও ঊর্ধ্বপাতন (Distillation and Sublimation)
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch2_6',
    chapter2.id,
    6,
    '২.৬ পাতন ও ঊর্ধ্বপাতন (Distillation and Sublimation)',
    'les_ssc_chemistry_ch2_6',
    {
      titleBangla: 'পাতন, ঊর্ধ্বপাতন, ৬টি ঊর্ধ্বপাতিত পদার্থ ও মিশ্রণ পৃথকীকরণ',
      learningGoal: 'বাষ্পীভবন ও ঘনীভবনের সমন্বয়ে পাতন ব্যাখ্যা করতে পারবে, ঊর্ধ্বপাতনের সংজ্ঞা দিতে পারবে, ৬টি ঊর্ধ্বপাতিত পদার্থের সংকেত লিখতে পারবে এবং ল্যাবে ঊর্ধ্বপাতন দ্বারা মিশ্রণ পৃথকীকরণ বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. পাতন (Distillation)
কোনো তরলকে তাপ দিয়ে বাষ্পে পরিণত করে (বাষ্পীভবন) সেই বাষ্পকে পুনরায় ঠান্ডা করে তরলে রূপান্তরের (ঘনীভবন) সামগ্রিক প্রক্রিয়া হলো পাতন:
$$\\text{পাতন (Distillation)} = \\text{বাষ্পীভবন (Vaporization)} + \\text{ঘনীভবন (Condensation)}$$

### ২. ঊর্ধ্বপাতন (Sublimation)
যে প্রক্রিয়ায় কোনো কঠিন পদার্থকে তাপ দিলে তা তরলে পরিণত না হয়ে সরাসরি বাষ্পে পরিণত হয় এবং বাষ্পকে ঠান্ডা করলে সরাসরি কঠিনে পরিণত হয়:
$$\\text{কঠিন} \\underset{\\text{শীতলীকরণ}}{\\overset{\\text{তাপ}}{\\rightleftharpoons}} \\text{বাষ্প}$$

### ৩. মুখস্থ তালিকা: ৬টি প্রধান ঊর্ধ্বপাতিত পদার্থ
1. **নিশাদল (অ্যামোনিয়াম ক্লোরাইড):** $NH_4Cl$
2. **কর্পূর (Camphor):** $C_{10}H_{16}O$
3. **ন্যাপথালিন (Naphthalene):** $C_{10}H_8$
4. **আয়োডিন (Iodine):** $I_2$ (গাঢ় বেগুনি বাষ্প তৈরি করে)
5. **অ্যালুমিনিয়াম ক্লোরাইড:** $AlCl_3$
6. **শুষ্ক বরফ (Dry Ice):** কঠিন $CO_2$

### ৪. ল্যাবরেটরিতে মিশ্রণ পৃথকীকরণ
চীনা মাটির বেসিনে খাদ্য লবণ ($NaCl$) ও কর্পূর ($C_{10}H_{16}O$) বা নিশাদলের ($NH_4Cl$) মিশ্রণ রেখে উল্টানো ফানেল দিয়ে তাপ দিলে ঊর্ধ্বপাতিত পদার্থ বাষ্প হয়ে ফানেলের ভেতরের শীতল গায়ে কঠিন স্ফটিক হিসেবে জমা হয় এবং লবণ পাত্রের তলায় অবশেষ হিসেবে থেকে যায়।`,
      interactiveWidgetUrl: INTERACTIVE_URL,
      importantTerms: [
        { termBangla: 'পাতন', termEnglish: 'Distillation', definition: 'বাষ্পীভবন ও ঘনীভবনের সমন্বিত পৃথকীকরণ পদ্ধতি।' },
        { termBangla: 'ঊর্ধ্বপাতন', termEnglish: 'Sublimation', definition: 'কঠিন থেকে সরাসরি বাষ্প এবং বাষ্প থেকে সরাসরি কঠিনে রূপান্তর।' },
        { termBangla: 'শুষ্ক বরফ', termEnglish: 'Dry Ice', definition: 'কঠিন কার্বন ডাই-অক্সাইড (CO₂); যা তরল না হয়ে সরাসরি বাষ্প হয়।' },
        { termBangla: 'কর্পূর', termEnglish: 'Camphor', definition: 'C₁₀H₁₆O; তীব্র সুবাসযুক্ত উদ্বায়ী ঊর্ধ্বপাতিত কঠিন।' },
      ],
      workedExample: {
        problem: 'বালু, খাদ্য লবণ ও নিশাদলের কঠিন মিশ্রণ থেকে প্রতিটি উপাদান কীভাবে আলাদা করবে?',
        stepByStepSolution: '১. ১ম ধাপ (ঊর্ধ্বপাতন): মিশ্রণে উল্টানো ফানেল রেখে মৃদু তাপ দিলে নিশাদল (NH₄Cl) বাষ্প হয়ে ফানেলের গায়ে জমা হয়ে আলাদা হয়।\n২. ২য় ধাপ (দ্রবীভবন ও পরিশ্রাবণ): অবশিষ্ট মিশ্রণে পানি যোগ করলে লবণ দ্রবীভূত হয় কিন্তু বালু অদ্রবণীয় থাকে। ফিল্টার কাগজে পরিশ্রাবণ করে বালু পৃথক করা হয়।\n৩. ৩য় ধাপ (বাষ্পীভবন): ফিল্টারকৃত লবণ-পানির দ্রবণকে তাপ দিয়ে পানি বাষ্পীভূত করলে পাত্রের তলায় বিশুদ্ধ খাবার লবণ (NaCl) পাওয়া যায়।',
      },
      memoryAid: 'নিশা ও কর্পূর ন্যাপথালিন মেখে, আয়োডিন এল শুষ্ক বরফ দেখে!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Insert All 72 Questions (54 MCQs + 18 CQs)
  // -------------------------------------------------------------------------
  console.log(`📋 Seeding ${chemistryChapter2AllQuestions.length} verified questions for Chapter 2...`);

  for (const q of chemistryChapter2AllQuestions) {
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
    'top_ssc_chemistry_ch2_1',
    'top_ssc_chemistry_ch2_2',
    'top_ssc_chemistry_ch2_3',
    'top_ssc_chemistry_ch2_4',
    'top_ssc_chemistry_ch2_5',
    'top_ssc_chemistry_ch2_6',
  ];

  await prisma.lesson.deleteMany({
    where: {
      topic: { chapterId: chapter2.id },
      topicId: { notIn: activeTopicIds },
    },
  });

  await prisma.topic.deleteMany({
    where: {
      chapterId: chapter2.id,
      id: { notIn: activeTopicIds },
    },
  });

  console.log(`✅ SSC Chemistry Chapter 2 seeded successfully (${chemistryChapter2AllQuestions.length} verified questions).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedChemistryChapter2(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Chemistry Chapter 2 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
