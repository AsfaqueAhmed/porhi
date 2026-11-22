import { PrismaClient, ContentStatus } from '@prisma/client';
import { chemistryChapter6QuestionsBatch1 } from './seed-chemistry-chapter-6-questions';
import { chemistryChapter6QuestionsBatch2 } from './seed-chemistry-chapter-6-questions-batch2';
import { chemistryChapter6QuestionsBatch3 } from './seed-chemistry-chapter-6-questions-batch3';

export const sscChemistrySubject = {
  id: 'sub_ssc_chemistry',
  code: 'ssc_chemistry',
  nameBangla: 'রসায়ন',
  classLevel: 'CLASS_9_10',
  program: 'SSC',
  syllabusYear: 2026,
  isReady: true,
};

export const chemistryChapter6AllQuestions = [
  ...chemistryChapter6QuestionsBatch1,
  ...chemistryChapter6QuestionsBatch2,
  ...chemistryChapter6QuestionsBatch3,
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

export async function seedChemistryChapter6(prisma: PrismaClient) {
  console.log('⚗️ Seeding SSC Chemistry Chapter 6 (মোলের ধারণা ও রাসায়নিক গণনা / Mole Concept & Chemical Calculation)...');

  await prisma.subject.upsert({
    where: { code: sscChemistrySubject.code },
    update: sscChemistrySubject,
    create: sscChemistrySubject,
  });

  const chapter6 = await prisma.chapter.upsert({
    where: { id: 'chap_ssc_chemistry_ch6' },
    update: {
      subjectId: sscChemistrySubject.id,
      orderIndex: 6,
      titleBangla: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা (Mole Concept & Chemical Calculation)',
    },
    create: {
      id: 'chap_ssc_chemistry_ch6',
      subjectId: sscChemistrySubject.id,
      orderIndex: 6,
      titleBangla: 'ষষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা (Mole Concept & Chemical Calculation)',
    },
  });

  const widgetUrl = '/uploads/interactive/mole-solution-preparation-lab.html';

  // -------------------------------------------------------------------------
  // Topic 6.1: মোলের ধারণা ও অ্যাভোগেড্রো সংখ্যা
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch6_1',
    chapter6.id,
    1,
    '৬.১ মোলের ধারণা ও অ্যাভোগেড্রো সংখ্যা (Mole Concept & Avogadro\'s Number)',
    'les_ssc_chemistry_ch6_1',
    {
      titleBangla: 'মোলের ধারণা, অ্যাভোগেড্রো সংখ্যা ও কণার সংখ্যা গণনা',
      learningGoal: 'মোলের বৈজ্ঞানিক সংজ্ঞা ($N_A = 6.02 \\times 10^{23}$) এবং প্রদত্ত ভর বা কণার সংখ্যা থেকে মোল সংখ্যা ($n = \\frac{W}{M} = \\frac{N}{N_A}$) সফলভাবে গণনা করতে পারবে।',
      explanation: `### ১. মোল কী? (Concept of Mole)
ব্যবহারিক জীবনে আমরা যেমন ১২টি বস্তুকে ১ ডজন বা ২০টি বস্তুকে ১ কুড়ি বলি, তেমনি পরমাণু, অণু বা আয়নের মতো অতি আণুবীক্ষণিক কণা গণনার জন্য রসায়নবিদরা **মোল (Mole)** এককটি ব্যবহার করেন।
- **সংজ্ঞা:** রাসায়নিক পদার্থের যে পরিমাণের মধ্যে $6.02 \\times 10^{23}$ টি পরমাণু, অণু বা আয়ন থাকে, তাকে ঐ পদার্থের **এক মোল** বলা হয়।

### ২. অ্যাভোগেড্রো সংখ্যা (Avogadro's Number)
ইতালীয় বিজ্ঞানী আমাদেও অ্যাভোগেড্রো (Amedeo Avogadro)-এর নামানুসারে এই সার্বজনীন ধ্রুবক সংখ্যাটিকে **অ্যাভোগেড্রো সংখ্যা** ($N_A$) বলা হয়:
$$N_A = 6.02 \\times 10^{23} \\text{ বা } 6.023 \\times 10^{23}$$
- $1\\text{ mol C} = 12\\text{ g Carbon} = 6.02 \\times 10^{23}$ টি $\\text{C}$ পরমাণু।
- $1\\text{ mol } \\text{H}_2\\text{O} = 18\\text{ g Water} = 6.02 \\times 10^{23}$ টি $\\text{H}_2\\text{O}$ অণু।
- $1\\text{ mol } \\text{NaCl} = 58.5\\text{ g} = 6.02 \\times 10^{23}$ টি $\\text{Na}^+$ ও $6.02 \\times 10^{23}$ টি $\\text{Cl}^-$ আয়ন।

### ৩. মোলের মৌলিক গাণিতিক সূত্র
কোনো পদার্থের ভর $W$ গ্রাম, মোলার ভর $M$ গ্রাম/মোল এবং মোট কণার সংখ্যা $N$ হলে:
$$n = \\frac{W}{M} = \\frac{N}{N_A}$$`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'মোল', termEnglish: 'Mole', definition: 'পদার্থের পরিমাণের এসআই (SI) একক। এতে ঠিক $6.02 \\times 10^{23}$ টি নির্দিষ্ট উপাদান কণা থাকে।' },
        { termBangla: 'অ্যাভোগেড্রো সংখ্যা', termEnglish: 'Avogadro\'s Number', definition: '$6.02 \\times 10^{23}$; যেকোনো পদার্থের ১ মোলে উপস্থিত পরমাণু, অণু বা আয়নের ধ্রুব সংখ্যা।' },
        { termBangla: 'কণার সংখ্যা', termEnglish: 'Number of Particles', definition: 'প্রদত্ত নমুনায় উপস্থিত অণু বা পরমাণুর প্রকৃত মোট সংখ্যা ($N = n \\times N_A$)।' },
      ],
      workedExample: {
        problem: '$5\\text{ g } \\text{H}_2\\text{O}$-তে কত মোল পানি আছে এবং এতে মোট পানির অণুর সংখ্যা কত?',
        stepByStepSolution: '১. পানির আণবিক ভর $M = (1 \\times 2) + 16 = 18\\text{ g/mol}$।\n২. মোল সংখ্যা $n = \\frac{W}{M} = \\frac{5}{18} \\approx 0.278\\text{ mol}$।\n৩. অণুর সংখ্যা $N = n \\times N_A = 0.278 \\times 6.02 \\times 10^{23} \\approx 1.67 \\times 10^{23}$ টি পানির অণু।',
      },
      memoryAid: '“এক মোলেতেই অ্যাভোগেড্রো, দশের মাথায় তেইশ সাজাও; গ্রামে নিলে মোলার ভর, অণুর সংখ্যা খুঁজে নাও!”',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 6.2: মোলার ভর ও আণবিক ভর গণনা
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch6_2',
    chapter6.id,
    2,
    '৬.২ মোলার ভর ও আণবিক ভর গণনা (Molar Mass & Molecular Mass Calculation)',
    'les_ssc_chemistry_ch6_2',
    {
      titleBangla: 'পারমাণবিক ভর থেকে যৌগের আণবিক ভর ও মোলার ভর নির্ণয়',
      learningGoal: 'যেকোনো সরল বা কেলাসিত জটিল রাসায়নিক যৌগের আণবিক ভর এবং গ্রাম আণবিক ভর/মোলার ভর ($g/mol$) নির্ভুলভাবে হিসাব করতে পারবে।',
      explanation: `### ১. আণবিক ভর নির্ণয়ের নিয়ম (Rules of Calculation)
কোনো যৌগের সংকেতে বিদ্যমান প্রতিটি মৌলের আপেক্ষিক পারমাণবিক ভরকে তার পরমাণু সংখ্যা দিয়ে গুণ করে সবগুলো মান যোগ করলে যৌগটির আপেক্ষিক আণবিক ভর পাওয়া যায়।
- **মোলার ভর (Molar Mass):** কোনো পদার্থের ১ মোলের ভরকে গ্রামে প্রকাশ করলে তাকে তার মোলার ভর বলে (একক: $g/mol$)।
- **আপেক্ষিক আণবিক ভর বনাম মোলার ভর:** আপেক্ষিক আণবিক ভর এককহীন একটি অনুপাত, কিন্তু মোলার ভরের একক গ্রাম/মোল ($g/mol$)।

### ২. গুরুত্বপূর্ণ যৌগের মোলার ভর হিসাব
- **পানি ($\\text{H}_2\\text{O}$):** $(1 \\times 2) + 16 = 18\\text{ g/mol}$
- **সালফিউরিক অ্যাসিড ($\\text{H}_2\\text{SO}_4$):** $(1 \\times 2) + 32 + (16 \\times 4) = 98\\text{ g/mol}$
- **সোডিয়াম কার্বনেট ($\\text{Na}_2\\text{CO}_3$):** $(23 \\times 2) + 12 + (16 \\times 3) = 106\\text{ g/mol}$
- **তুঁতে ($\\text{CuSO}_4 \\cdot 5\\text{H}_2\\text{O}$):** $63.5 + 32 + (16 \\times 4) + 5 \\times 18 = 159.5 + 90 = 249.5\\text{ g/mol}$
- **অ্যালুমিনিয়াম সালফেট [$\\text{Al}_2(\\text{SO}_4)_3$]:** $(27 \\times 2) + 3 \\times [32 + (16 \\times 4)] = 54 + (3 \\times 96) = 342\\text{ g/mol}$`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'আণবিক ভর', termEnglish: 'Molecular Mass', definition: 'যৌগের অণুতে উপস্থিত প্রতিটি মৌলের পরমাণুর পারমাণবিক ভরের সমষ্টি (এককহীন সংখ্যা)।' },
        { termBangla: 'মোলার ভর', termEnglish: 'Molar Mass', definition: '১ মোল বা $6.02 \\times 10^{23}$ টি অণু বা পরমাণুর ভর, যার একক $g/mol$।' },
        { termBangla: 'কেলাস পানি', termEnglish: 'Water of Crystallization', definition: 'লবণের কেলাসের সাথে যুক্ত নির্দিষ্ট সংখ্যক পানির অণু (যেমন তুঁতেতে $5\\text{H}_2\\text{O}$)।' },
      ],
      workedExample: {
        problem: 'তুঁতে বা কপার সালফেট পেন্টাহাইড্রেট ($\\text{CuSO}_4 \\cdot 5\\text{H}_2\\text{O}$)-এর আণবিক ভর কত? এবং $50\\text{ g}$ তুঁতেতে কত মোল যৌগ বিদ্যমান?',
        stepByStepSolution: '১. $\\text{CuSO}_4 = 63.5 + 32 + 64 = 159.5$।\n২. $5\\text{H}_2\\text{O} = 5 \\times 18 = 90$।\n৩. মোট আণবিক ভর $M = 159.5 + 90 = 249.5$ (মোলার ভর $249.5\\text{ g/mol}$)।\n৪. মোল সংখ্যা $n = \\frac{W}{M} = \\frac{50}{249.5} \\approx 0.2004\\text{ mol}$।',
      },
      memoryAid: 'কেলাস পানিতে ডট ($\cdot$) চিহ্ন দেখে গুণ করবে না, ডটের পরের পানির ভর সবসময় মূল লবণের ভরের সাথে যোগ করতে হবে!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 6.3: গ্যাসের মোলার আয়তন ও আদর্শ তাপমাত্রা-চাপ (STP)
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch6_3',
    chapter6.id,
    3,
    '৬.৩ গ্যাসের মোলার আয়তন ও আদর্শ তাপমাত্রা-চাপ (STP) (Molar Volume of Gas & STP)',
    'les_ssc_chemistry_ch6_3',
    {
      titleBangla: 'গ্যাসের মোলার আয়তন, STP এবং সমন্বিত মোলের সেতু সূত্র',
      learningGoal: 'STP-তে যেকোনো গ্যাসের মোলার আয়তন ($22.4\\text{ L/mol}$) প্রয়োগ করে ভর, মোল, কণার সংখ্যা ও আয়তনের মধ্যে সমন্বিত রূপান্তর সমাধান করতে পারবে।',
      explanation: `### ১. আদর্শ তাপমাত্রা ও চাপ (STP)
- **প্রমাণ তাপমাত্রা:** $0^\\circ\\text{C}$ বা $273.15\\text{ K}$ (হিসাবে $273\\text{ K}$)।
- **প্রমাণ চাপ:** $1\\text{ atm} = 760\\text{ mmHg} = 101.325\\text{ kPa}$।

### ২. গ্যাসের মোলার আয়তন (Molar Volume)
নির্দিষ্ট তাপমাত্রা ও চাপে যেকোনো গ্যাসীয় পদার্থের **১ মোল** যে আয়তন দখল করে, তাকে ঐ গ্যাসের **মোলার আয়তন** বলে।
$$\\text{STP-তে যেকোনো গ্যাসের মোলার আয়তন } V_m = 22.4\\text{ L/mol (বা } 22.4\\text{ dm}^3/\\text{mol)}$$
অ্যাভোগেড্রোর প্রকল্প অনুযায়ী: সমতাপমাত্রা ও চাপে সমআয়তনের সকল গ্যাসে সমান সংখ্যক অণু থাকে। তাই গ্যাস যা-ই হোক না কেন, ১ মোলের আয়তন সর্বদা $22.4\\text{ L}$।

### ৩. মহা-সমন্বিত মোলের সূত্র (Unified Mole Formula)
$$n = \\frac{W}{M} = \\frac{V}{22.4} = \\frac{N}{N_A}$$
যেখানে $W$ = ভর (g), $M$ = মোলার ভর (g/mol), $V$ = STP-তে আয়তন (L), এবং $N$ = কণার সংখ্যা।`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'STP (প্রমাণ অবস্থা)', termEnglish: 'Standard Temperature and Pressure', definition: '$0^\\circ\\text{C}$ তাপমাত্রা এবং $1\\text{ atm}$ চাপকে আদর্শ বা প্রমাণ অবস্থা বলা হয়।' },
        { termBangla: 'গ্যাসের মোলার আয়তন', termEnglish: 'Molar Volume of Gas', definition: 'STP-তে ১ মোল যেকোনো গ্যাসীয় পদার্থ যে আয়তন দখল করে ($22.4\\text{ L}$)।' },
        { termBangla: 'অ্যাভোগেড্রোর প্রকল্প', termEnglish: 'Avogadro\'s Hypothesis', definition: 'একই তাপমাত্রা ও চাপে সমআয়তন সকল গ্যাসে সমান সংখ্যক অণু থাকে।' },
      ],
      workedExample: {
        problem: 'STP-তে $11.2\\text{ L } \\text{CO}_2$ গ্যাসে কত মোল গ্যাস আছে এবং এর ভর কত গ্রাম?',
        stepByStepSolution: '১. $\\text{CO}_2$-এর মোলার ভর $M = 12 + 32 = 44\\text{ g/mol}$।\n২. মোল সংখ্যা $n = \\frac{V}{22.4} = \\frac{11.2}{22.4} = 0.5\\text{ mol}$।\n৩. ভর $W = n \\times M = 0.5 \\times 44 = 22\\text{ g}$।',
      },
      memoryAid: '“জিরো ডিগ্রি এক অ্যাটমোসফিয়ার, বাইশ দশমিক চার লিটার গ্যাসের ঘর!” তরলের ক্ষেত্রে কিন্তু ২২.৪ লিটার প্রযোজ্য নয়।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 6.4: মোলার দ্রবণ ও ঘনমাত্রা নির্ণয়
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch6_4',
    chapter6.id,
    4,
    '৬.৪ মোলার দ্রবণ ও ঘনমাত্রা নির্ণয় (Molar Solution & Concentration Calculation)',
    'les_ssc_chemistry_ch6_4',
    {
      titleBangla: 'মোলার দ্রবণ, মোলারিটি, প্রমাণ দ্রবণ প্রস্তুতি ও লঘুকরণ',
      learningGoal: 'মোলারিটির সংজ্ঞা ও প্রকারভেদ (সেমি-, ডেসি-, সেন্টিমোলার) দিয়ে দ্রবণ প্রস্তুতির সূত্র ($W = \\frac{SMV}{1000}$) এবং লঘুকরণ সূত্র ($S_1V_1 = S_2V_2$) প্রয়োগ করতে পারবে।',
      explanation: `### ১. মোলার দ্রবণ ও মোলারিটি (Molarity)
নির্দিষ্ট তাপমাত্রায় ১ লিটার ($1000\\text{ mL}$) দ্রবণের মধ্যে ১ মোল দ্রব দ্রবীভূত থাকলে তাকে **১ মোলার দ্রবণ (1 M)** বলে। আর প্রতি লিটার দ্রবণে দ্রবীভূত দ্রবের মোল সংখ্যাকে ঐ দ্রবণের **মোলারিটি ($S$)** বলে।
- **মোলার দ্রবণ:** $1.0\\text{ M}$
- **সেমিমোলার দ্রবণ:** $0.5\\text{ M}$
- **ডেসিমোলার দ্রবণ:** $0.1\\text{ M}$ (আদর্শ প্রমাণ দ্রবণ)
- **সেন্টিমোলার দ্রবণ:** $0.01\\text{ M}$

### ২. দ্রবণ প্রস্তুতির মৌলিক গাণিতিক সূত্র
$$W = \\frac{S \\cdot M \\cdot V}{1000} \\iff S = \\frac{1000 \\cdot W}{M \\cdot V}$$
এখানে, $W$ = প্রয়োজনীয় দ্রবের ভর (g), $S$ = মোলার ঘনমাত্রা (M), $M$ = মোলার ভর (g/mol), $V$ = পরিমাপক ফ্লাস্কের আয়তন (mL)।

### ৩. দ্রবণ লঘুকরণ সূত্র (Dilution Formula)
স্টক দ্রবণে অতিরিক্ত পানি যোগ করে লঘু করলে দ্রবের মোল সংখ্যা অপরিবর্তিত থাকে ($n_1 = n_2$):
$$S_1 V_1 = S_2 V_2$$`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'মোলারিটি ($S$)', termEnglish: 'Molarity', definition: '১ লিটার দ্রবণে দ্রবীভূত দ্রবের মোল সংখ্যা (একক: $\\text{mol/L}$ বা $\\text{M}$)।' },
        { termBangla: 'প্রমাণ দ্রবণ', termEnglish: 'Standard Solution', definition: 'যে দ্রবণের ঘনমাত্রা সঠিকভাবে সুনির্দিষ্ট ও জানা থাকে (যেমন $0.1\\text{ M } \\text{Na}_2\\text{CO}_3$)।' },
        { termBangla: 'ডেসিমোলার দ্রবণ', termEnglish: 'Decimolar Solution', definition: 'যে দ্রবণের ঘনমাত্রা ঠিক $0.1\\text{ M}$।' },
        { termBangla: 'মাপক ফ্লাস্ক', termEnglish: 'Volumetric Flask', definition: 'গলায় সরু বৃত্তাকার দাগ কাটা বিশেষ কাচের ফ্লাস্ক যা প্রমাণ দ্রবণ তৈরিতে ব্যবহৃত হয়।' },
      ],
      workedExample: {
        problem: '$250\\text{ mL}$ মাপক ফ্লাস্কে $0.2\\text{ M } \\text{Na}_2\\text{CO}_3$ দ্রবণ তৈরি করতে কত গ্রাম সোডিয়াম কার্বনেট প্রয়োজন?',
        stepByStepSolution: '১. $\\text{Na}_2\\text{CO}_3$-এর আণবিক ভর $M = 106\\text{ g/mol}$।\n২. $V = 250\\text{ mL}$, $S = 0.2\\text{ M}$।\n৩. $W = \\frac{S \\cdot M \\cdot V}{1000} = \\frac{0.2 \\times 106 \\times 250}{1000} = \\frac{5300}{1000} = 5.30\\text{ g}$।',
      },
      memoryAid: 'উপসর্গ ক্লু: সেমি মানে ০.৫, ডেসি মানে ০.১, সেন্টি মানে ০.০১। মিলিলিটার থাকলে ১০০০ দিয়ে ভাগ!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 6.5: শতকরা সংযুতি, স্থূল সংকেত ও আণবিক সংকেত
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch6_5',
    chapter6.id,
    5,
    '৬.৫ শতকরা সংযুতি, স্থূল সংকেত ও আণবিক সংকেত (Percentage Composition, Empirical & Molecular Formula)',
    'les_ssc_chemistry_ch6_5',
    {
      titleBangla: 'মৌলের শতকরা সংযুতি, স্থূল সংকেত এবং বাষ্প ঘনত্ব থেকে আণবিক সংকেত',
      learningGoal: 'যৌগের শতকরা সংযুতি নির্ণয় করে ৪টি সুনির্দিষ্ট ধাপের মাধ্যমে স্থূল সংকেত এবং বাষ্প ঘনত্ব ($M = 2D$) থেকে আণবিক সংকেত বের করতে পারবে।',
      explanation: `### ১. শতকরা সংযুতি (Percentage Composition)
যৌগের ১০০ ভাগে কোনো মৌলের ভরভিত্তিক উপস্থিতির অনুপাত:
$$\\text{মৌলের শতকরা সংযুতি} = \\frac{\\text{মৌলের পারমাণবিক ভর} \\times \\text{পরমাণুর সংখ্যা}}{\\text{যৌগের আণবিক ভর}} \\times 100\\%$$

### ২. স্থূল সংকেত নির্ণয়ের ৪টি ধাপ (Empirical Formula)
১. মৌলগুলোর শতকরা পরিমাণকে নিজ নিজ পারমাণবিক ভর দিয়ে ভাগ করা।
২. ক্ষুদ্রতম ভাগফল দিয়ে প্রতিটি ভাগফলকে পুনরায় ভাগ করে পরমাণুর সরল অনুপাত বের করা।
৩. ভগ্নাংশ থাকলে উপযুক্ত পূর্ণসংখ্যা দিয়ে গুণ করে পূর্ণসংখ্যায় নেওয়া।
৪. মৌলের প্রতীকের নিচে অনুপাত বসিয়ে স্থূল সংকেত লেখা।

### ৩. আণবিক সংকেত প্রতিষ্ঠা (Molecular Formula)
$$\\text{আণবিক সংকেত} = (\\text{স্থূল সংকেত})_n \\quad \\text{যেখানে, } n = \\frac{\\text{আণবিক ভর}}{\\text{স্থূল সংকেত ভর}}$$
বাষ্প ঘনত্ব ($D$) দেওয়া থাকলে:
$$\\text{আণবিক ভর } (M) = 2 \\times \\text{বাষ্প ঘনত্ব } (D)$$`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'শতকরা সংযুতি', termEnglish: 'Percentage Composition', definition: 'যৌগের ১০০ ভাগে কোনো নির্দিষ্ট উপাদান মৌলের উপস্থিতির শতকরা ভর।' },
        { termBangla: 'স্থূল সংকেত', termEnglish: 'Empirical Formula', definition: 'অণুতে বিদ্যমান উপাদান মৌলগুলোর পরমাণুর সরলতম পূর্ণসংখ্যার অনুপাত।' },
        { termBangla: 'আণবিক সংকেত', termEnglish: 'Molecular Formula', definition: 'অণুর উপাদান মৌলগুলোর প্রতিটি পরমাণুর প্রকৃত সংখ্যা নির্দেশক সংকেত।' },
        { termBangla: 'বাষ্প ঘনত্ব ($D$)', termEnglish: 'Vapor Density', definition: 'একই তাপমাত্রা ও চাপে কোনো গ্যাসের ভর সমআয়তন হাইড্রোজেন গ্যাসের ভরের অনুপাত ($M = 2D$)।' },
      ],
      workedExample: {
        problem: 'একটি যৌগে $\\text{C} = 40\\%$, $\\text{H} = 6.67\\%$, $\\text{O} = 53.33\\%$ এবং বাষ্প ঘনত্ব $30$ হলে আণবিক সংকেত কী?',
        stepByStepSolution: '১. ভাগফল: $\\text{C} = 40/12 = 3.33$, $\\text{H} = 6.67/1 = 6.67$, $\\text{O} = 53.33/16 = 3.33$।\n২. অনুপাত: $\\text{C}:\\text{H}:\\text{O} = 1:2:1 \\implies$ স্থূল সংকেত $\\text{CH}_2\\text{O}$।\n৩. আণবিক ভর $M = 2 \\times 30 = 60$।\n৪. স্থূল ভর $= 12+2+16 = 30 \\implies n = 60/30 = 2$।\n৫. আণবিক সংকেত $= (\\text{CH}_2\\text{O})_2 = \\text{C}_2\\text{H}_4\\text{O}_2$ (ইথানয়িক অ্যাসিড)।',
      },
      memoryAid: '“শতকরাতে ভর দিয়ে ভাগ, ছোটটা দিয়ে সবার ডাক; পূর্ণসংখ্যায় অনুপাত মেপে, সংকেত লেখো ছক কেটে!”',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 6.6: স্টয়কিওমেট্রি, লিমিটিং বিক্রিয়ক ও উৎপাদের শতকরা পরিমাণ
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch6_6',
    chapter6.id,
    6,
    '৬.৬ স্টয়কিওমেট্রি, লিমিটিং বিক্রিয়ক ও উৎপাদের শতকরা পরিমাণ (Stoichiometry, Limiting Reactant & Percentage Yield)',
    'les_ssc_chemistry_ch6_6',
    {
      titleBangla: 'স্টয়কিওমেট্রি, লিমিটিং বিক্রিয়ক এবং উৎপাদের শতকরা পরিমাণ (% Yield)',
      learningGoal: 'বিক্রিয়ার সমতাকৃত সমীকরণ থেকে মোলার অনুপাত বের করে লিমিটিং বিক্রিয়ক শনাক্ত এবং তাত্ত্বিক ও শতকরা উৎপাদ ($\\% \\text{ Yield}$) নির্ণয় করতে পারবে।',
      explanation: `### ১. স্টয়কিওমেট্রি (Stoichiometry)
রসায়নের যে শাখায় সমতাকৃত সমীকরণ থেকে বিক্রিয়ক ও উৎপাদের পরিমাণের (মোল, ভর, আয়তন) পারস্পরিক অনুপাত হিসাব করা হয়, তাকে **স্টয়কিওমেট্রি** বলে।

### ২. লিমিটিং বিক্রিয়ক (Limiting Reactant)
রাসায়নিক বিক্রিয়ায় যে বিক্রিয়কটি সবার আগে সম্পূর্ণরূপে নিঃশেষ হয়ে যায়, তাকে **লিমিটিং বিক্রিয়ক** বলে।
- **মূলনীতি:** উৎপাদ কতটুকু তৈরি হবে তা সর্বদা **লিমিটিং বিক্রিয়কের পরিমাণের ওপর নির্ভর করে**।
- যে বিক্রিয়কটি অবশিষ্ট থেকে যায় তাকে **অতিরিক্ত বা উদ্বৃত্ত বিক্রিয়ক** বলে।

### ৩. উৎপাদের শতকরা পরিমাণ (% Yield)
সমীকরণ থেকে প্রাপ্ত সর্বোচ্চ সম্ভাব্য উৎপাদ হলো **তাত্ত্বিক উৎপাদ (Theoretical Yield)**। আর ল্যাবরেটরিতে বাস্তবে যা পাওয়া যায় তা হলো **প্রকৃত উৎপাদ (Actual Yield)**।
$$\\% \\text{ Yield} = \\frac{\\text{প্রকৃত উৎপাদ}}{\\text{তাত্ত্বিক উৎপাদ}} \\times 100\\%$$
শিল্পক্ষেত্রে অপদ্রব্য, উভমুখী বিক্রিয়া ও যান্ত্রিক অপচয়ের কারণে শতকরা ফলন প্রায়ই শতভাগের চেয়ে কম হয়।`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'স্টয়কিওমেট্রি', termEnglish: 'Stoichiometry', definition: 'রাসায়নিক বিক্রিয়ার বিক্রিয়ক ও উৎপাদের পরিমাণগত আনুপাতিক সম্পর্কের বিজ্ঞান।' },
        { termBangla: 'লিমিটিং বিক্রিয়ক', termEnglish: 'Limiting Reactant', definition: 'বিক্রিয়ায় যে বিক্রিয়কটি সবার আগে শেষ হয়ে গিয়ে বিক্রিয়া থামিয়ে দেয়।' },
        { termBangla: 'তাত্ত্বিক উৎপাদ', termEnglish: 'Theoretical Yield', definition: 'সমতাকৃত সমীকরণ থেকে গণনাকৃত সর্বোচ্চ সম্ভাব্য উৎপাদের পরিমাণ।' },
        { termBangla: 'শতকরা উৎপাদ', termEnglish: 'Percentage Yield', definition: 'তাত্ত্বিক উৎপাদের তুলনায় বাস্তবে কত শতাংশ উৎপাদ পাওয়া গেল তার শতকরা হার।' },
      ],
      workedExample: {
        problem: '$4.8\\text{ g } \\text{Mg}$ ধাতুর সাথে $100\\text{ g } \\text{HCl}$ যোগ করলে কোনটি লিমিটিং বিক্রিয়ক এবং কত গ্রাম $\\text{MgCl}_2$ উৎপন্ন হবে?',
        stepByStepSolution: '১. $\\text{Mg} + 2\\text{HCl} \\rightarrow \\text{MgCl}_2 + \\text{H}_2$।\n২. $n_{\\text{Mg}} = 4.8 / 24.3 = 0.1975\\text{ mol}$। $n_{\\text{HCl}} = 100 / 36.5 = 2.74\\text{ mol}$।\n৩. $0.1975\\text{ mol Mg}$-এর জন্য প্রয়োজন মাত্র $0.395\\text{ mol HCl}$। সুতরাং $\\text{Mg}$ আগে শেষ হয়ে যাবে $\\implies \\text{Mg}$ লিমিটিং বিক্রিয়ক।\n৪. তাত্ত্বিক $\\text{MgCl}_2 = 0.1975 \\times 95.3 \\approx 18.82\\text{ g}$।',
      },
      memoryAid: 'চা বানানোর মতো: দুধ শেষ তো চা বানানোও শেষ! দুধই হলো লিমিটিং বিক্রিয়ক।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Upsert all 72 Questions
  // -------------------------------------------------------------------------
  console.log(`📝 Upserting ${chemistryChapter6AllQuestions.length} questions for Chapter 6...`);

  for (const q of chemistryChapter6AllQuestions) {
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
    'top_ssc_chemistry_ch6_1',
    'top_ssc_chemistry_ch6_2',
    'top_ssc_chemistry_ch6_3',
    'top_ssc_chemistry_ch6_4',
    'top_ssc_chemistry_ch6_5',
    'top_ssc_chemistry_ch6_6',
  ];

  await prisma.lesson.deleteMany({
    where: {
      topic: { chapterId: chapter6.id },
      topicId: { notIn: activeTopicIds },
    },
  });

  await prisma.topic.deleteMany({
    where: {
      chapterId: chapter6.id,
      id: { notIn: activeTopicIds },
    },
  });

  console.log(`✅ SSC Chemistry Chapter 6 seeded (${chemistryChapter6AllQuestions.length} verified questions).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedChemistryChapter6(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Chemistry Chapter 6 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
