import { PrismaClient, ContentStatus } from '@prisma/client';
import { chemistryChapter8QuestionsBatch1 } from './seed-chemistry-chapter-8-questions';
import { chemistryChapter8QuestionsBatch2 } from './seed-chemistry-chapter-8-questions-batch2';
import { chemistryChapter8QuestionsBatch3 } from './seed-chemistry-chapter-8-questions-batch3';

export const sscChemistrySubject = {
  id: 'sub_ssc_chemistry',
  code: 'ssc_chemistry',
  nameBangla: 'রসায়ন',
  classLevel: 'CLASS_9_10',
  program: 'SSC',
  syllabusYear: 2026,
  isReady: true,
};

export const chemistryChapter8AllQuestions = [
  ...chemistryChapter8QuestionsBatch1,
  ...chemistryChapter8QuestionsBatch2,
  ...chemistryChapter8QuestionsBatch3,
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
    interactiveWidgetUrl?: string | null;
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

export async function seedChemistryChapter8(prisma: PrismaClient) {
  console.log('⚡ Seeding SSC Chemistry Chapter 8 (রসায়ন ও শক্তি / Chemistry and Energy)...');

  await prisma.subject.upsert({
    where: { code: sscChemistrySubject.code },
    update: sscChemistrySubject,
    create: sscChemistrySubject,
  });

  const chapterId = 'chap_ssc_chemistry_ch8';
  const chapter8 = await prisma.chapter.upsert({
    where: { id: chapterId },
    update: {
      subjectId: sscChemistrySubject.id,
      orderIndex: 8,
      titleBangla: 'অষ্টম অধ্যায়: রসায়ন ও শক্তি (Chemistry and Energy)',
    },
    create: {
      id: chapterId,
      subjectId: sscChemistrySubject.id,
      orderIndex: 8,
      titleBangla: 'অষ্টম অধ্যায়: রসায়ন ও শক্তি (Chemistry and Energy)',
    },
  });

  const widgetUrl = '/uploads/interactive/electrochemical-galvanic-cell-lab.html';

  // -------------------------------------------------------------------------
  // Topic 8.1: রাসায়নিক শক্তি ও শক্তির রূপান্তর
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch8_1',
    chapter8.id,
    1,
    '৮.১ রাসায়নিক শক্তি ও শক্তির রূপান্তর (Chemical Energy & Energy Transformation)',
    'les_ssc_chemistry_ch8_1',
    {
      titleBangla: 'রাসায়নিক শক্তি ও বিভিন্ন শক্তিতে এর রূপান্তর',
      learningGoal: 'রাসায়নিক শক্তির উৎস হিসেবে বন্ধন ও আন্তঃআণবিক শক্তির ভূমিকা এবং তাপ, আলো, বিদ্যুৎ ও যান্ত্রিক শক্তিতে এর রূপান্তর বিশ্লেষণ করা।',
      explanation: `পদার্থের অভ্যন্তরীণ পরমাণুসমূহের মধ্যকার আকর্ষণ বল (বন্ধন শক্তি) এবং অণুসমূহের পারস্পরিক আকর্ষণ বল (আন্তঃআণবিক শক্তি)-এর কারণে যে শক্তি সুপ্ত থাকে তাকে **রাসায়নিক শক্তি** বলে।

১. **বন্ধন শক্তি বনাম আন্তঃআণবিক শক্তি:**
   - পরমাণুগুলোর সমযোজী বা আয়নীয় আকর্ষণ বল হলো বন্ধন শক্তি। বন্ধন ভাঙতে সর্বদা শক্তি বা তাপ শোষণ করতে হয় (তাপহারী); অপরপক্ষে নতুন বন্ধন গঠনের সময় শক্তি পরিবেশে নির্গত হয় (তাপোৎপাদী)।
   - সমযোজী অণুগুলোর মধ্যকার তুলনামূলক দুর্বল ভ্যান ডার ওয়ালস আকর্ষণ হলো আন্তঃআণবিক শক্তি।

২. **রাসায়নিক শক্তির বহুমুখী রূপান্তর:**
   - **তাপ ও আলোক শক্তিতে রূপান্তর:** প্রাকৃতিক গ্যাস (মিথেন) বা মোমবাতির দহন:
     $$\\text{CH}_4(\\text{g}) + 2\\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g}) + 2\\text{H}_2\\text{O}(\\text{l}) + \\text{তাপ} + \\text{আলো}$$
   - **বিদ্যুৎ শক্তিতে রূপান্তর:** গ্যালভানিক কোষ বা ড্রাই সেলে রেডক্স বিক্রিয়ার মাধ্যমে রাসায়নিক শক্তি সরাসরি বিদ্যুৎ প্রবাহ সৃষ্টি করে।
   - **যান্ত্রিক শক্তিতে রূপান্তর:** মোটরগাড়ি ও বাসের অন্তর্দহন ইঞ্জিনে পেট্রোল/ডিজেলের দহনে উৎপন্ন গ্যাসীয় প্রসারণ পিস্টনকে সচল করে যান্ত্রিক শক্তি উৎপাদন করে।
   - **শব্দ ও আলোক শক্তিতে রূপান্তর:** আতশবাজির গানপাউডার ও ধাতব লবণের তীব্র দহনে বর্ণিল আলো ও প্রচণ্ড শব্দ শক্তি উৎপন্ন হয়।

৩. **পরিবেশগত প্রভাব:** অতিরিক্ত জীবাশ্ম জ্বালানির দহনে নির্গত $CO_2$ বায়ুমণ্ডলে গ্রিনহাউস প্রভাব বাড়িয়ে বৈশ্বিক উষ্ণায়ন ত্বরান্বিত করে।`,
      importantTerms: [
        { termBangla: 'রাসায়নিক শক্তি', termEnglish: 'Chemical Energy', definition: 'পদার্থের অণু ও পরমাণুর মধ্যে স্থিতিশক্তি বা আকর্ষণ বলেরূপে সঞ্চিত মোট অভ্যন্তরীণ শক্তি।' },
        { termBangla: 'বন্ধন শক্তি', termEnglish: 'Bond Energy', definition: 'গ্যাসীয় অবস্থায় কোনো যৌগের এক মোল নির্দিষ্ট বন্ধন ভেঙে পরমাণুগুলোকে পৃথক করতে প্রয়োজনীয় শক্তি।' },
        { termBangla: 'আন্তঃআণবিক শক্তি', termEnglish: 'Intermolecular Force', definition: 'সমযোজী যৌগের একটি অণুর সাথে পার্শ্ববর্তী অপর অণুর মধ্যকার দুর্বল আকর্ষণ বল।' },
        { termBangla: 'শক্তির রূপান্তর', termEnglish: 'Energy Transformation', definition: 'রাসায়নিক বিক্রিয়ার মাধ্যমে রাসায়নিক শক্তির তাপ, আলো, বিদ্যুৎ বা যান্ত্রিক শক্তিতে পরিবর্তিত হওয়া।' },
      ],
      workedExample: {
        problem: 'মোমবাতির প্রজ্বলনে ভৌত ও রাসায়নিক পরিবর্তনের সাথে সাথে শক্তির কোন কোন রূপান্তর ঘটে?',
        stepByStepSolution: `১. সলতের তাপে কঠিন মোম গলে তরলে এবং তরল মোম কৈশিক নালিকা বেয়ে উপরে উঠে বাষ্পে পরিণত হয়—এটি ভৌত পরিবর্তন।
২. বাষ্পীভূত হাইড্রোকার্বন বাতাসের অক্সিজেনের সাথে বিক্রিয়া করে $CO_2$ ও জলীয় বাষ্প তৈরি করে—এটি রাসায়নিক পরিবর্তন।
৩. এখানে মোমের হাইড্রোকার্বনে সঞ্চিত রাসায়নিক শক্তি জারিত হয়ে মূলত তাপ শক্তি ও আলোক শক্তিতে রূপান্তরিত হয়।`,
      },
      memoryAid: 'রাসায়নিক রূপান্তর চতুষ্টয়: "তা-আ-বি-য" → তাপ, আলো, বিদ্যুৎ ও যান্ত্রিক শক্তি।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 8.2: বন্ধন শক্তি ও বিক্রিয়া তাপ হিসাব (ডেল্টা এইচ)
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch8_2',
    chapter8.id,
    2,
    '৮.২ বন্ধন শক্তি ও বিক্রিয়া তাপ হিসাব (ডেল্টা এইচ) (Bond Energy & Reaction Heat)',
    'les_ssc_chemistry_ch8_2',
    {
      titleBangla: 'বন্ধন শক্তি এবং বিক্রিয়া তাপ (ΔH) গণনার নিখুঁত পদ্ধতি',
      learningGoal: 'প্রমাণ বন্ধন শক্তির মান ব্যবহার করে তাপোৎপাদী ও তাপহারী বিক্রিয়ার জন্য বিক্রিয়া তাপ (ΔH = B1 - B2) নির্ণয় করতে পারা।',
      explanation: `যেকোনো রাসায়নিক বিক্রিয়ায় বিক্রিয়ক অণুগুলোর পুরাতন বন্ধন ভাঙন এবং উৎপাদ অণুগুলোর নতুন বন্ধন গঠন সম্পন্ন হয়।

১. **বিক্রিয়া তাপের সমীকরণ:**
   $$\\Delta H = B_1 - B_2$$
   $$\\Delta H = \\Sigma (\\text{বিক্রিয়কের মোট বন্ধন ভাঙার শক্তি}) - \\Sigma (\\text{উৎপাদের মোট বন্ধন গড়ার শক্তি})$$

২. **তাপীয় প্রকৃতি নির্ধারণ:**
   - **তাপোৎপাদী বিক্রিয়া (Exothermic):** $B_2 > B_1$ হলে $\\Delta H < 0$ (ঋণাত্মক)। পরিবেশে তাপ নির্গত হয় এবং পাত্রের তাপমাত্রা বৃদ্ধি পায়।
   - **তাপহারী বিক্রিয়া (Endothermic):** $B_1 > B_2$ হলে $\\Delta H > 0$ (ধনাত্মক)। পরিবেশ থেকে তাপ শোষিত হয় এবং পাত্র ঠাণ্ডা অনুভূত হয়।

৩. **প্রমাণ বন্ধন শক্তি মান (NCTB ছক):**
   - $C-H: 414\\text{ kJ/mol}$, $Cl-Cl: 244\\text{ kJ/mol}$, $C-Cl: 326\\text{ kJ/mol}$, $H-Cl: 431\\text{ kJ/mol}$
   - $O-H: 464\\text{ kJ/mol}$, $O=O: 498\\text{ kJ/mol}$, $C=O: 745\\text{ kJ/mol}$ (বা $CO_2$-তে $814$)
   - $C-C: 344\\text{ kJ/mol}$, $H-H: 436\\text{ kJ/mol}$, $N\\equiv N: 946\\text{ kJ/mol}$, $N-H: 391\\text{ kJ/mol}$`,
      importantTerms: [
        { termBangla: 'বিক্রিয়া তাপ', termEnglish: 'Heat of Reaction (ΔH)', definition: 'কোনো রাসায়নিক বিক্রিয়ায় উৎপাদের মোট এনথালপি ও বিক্রিয়কের মোট এনথালপির ব্যবধান।' },
        { termBangla: 'তাপোৎপাদী বিক্রিয়া', termEnglish: 'Exothermic Reaction', definition: 'যে বিক্রিয়ায় তাপ উৎপন্ন হয় এবং ΔH এর মান ঋণাত্মক (-) হয়।' },
        { termBangla: 'তাপহারী বিক্রিয়া', termEnglish: 'Endothermic Reaction', definition: 'যে বিক্রিয়ায় তাপ শোষিত হয় এবং ΔH এর মান ধনাত্মক (+) হয়।' },
      ],
      workedExample: {
        problem: 'সূর্যালোকের উপস্থিতিতে মিথেনের ক্লোরিনেশন বিক্রিয়ায় ΔH এর মান কত? CH4 + Cl2 → CH3Cl + HCl',
        stepByStepSolution: `১. বিক্রিয়কে ভাঙা বন্ধন: ১টি C-H (414 kJ) ও ১টি Cl-Cl (244 kJ)।
   প্রয়োজনীয় শক্তি, $B_1 = 414 + 244 = 658\\text{ kJ}$।
২. উৎপাদে গড়া বন্ধন: ১টি C-Cl (326 kJ) ও ১টি H-Cl (431 kJ)।
   নির্গত শক্তি, $B_2 = 326 + 431 = 757\\text{ kJ}$।
৩. বিক্রিয়া তাপ, $\\Delta H = B_1 - B_2 = 658 - 757 = -99\\text{ kJ/mol}$।
৪. মন্তব্য: $\\Delta H$ ঋণাত্মক হওয়ায় বিক্রিয়াটি তাপোৎপাদী।`,
      },
      memoryAid: 'সূত্র মনে রাখো: বন্ধন শক্তিতে বিক্রিয়ক বিয়োগ উৎপাদ (B1 - B2)। বন্ধন গড়া বড় হলে তাপোৎপাদী (ΔH < 0)।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 8.3: তড়িৎ রাসায়নিক কোষ ও তড়িৎ বিশ্লেষ্য
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch8_3',
    chapter8.id,
    3,
    '৮.৩ তড়িৎ রাসায়নিক কোষ ও তড়িৎ বিশ্লেষ্য (Electrochemical Cells & Electrolytes)',
    'les_ssc_chemistry_ch8_3',
    {
      titleBangla: 'তড়িৎ পরিবাহী, তড়িৎ বিশ্লেষ্যের শ্রেণিবিভাগ ও তড়িৎদ্বার নীতি',
      learningGoal: 'ইলেকট্রনীয় পরিবাহী ও তড়িৎ বিশ্লেষ্যের পার্থক্য এবং অ্যানোড (জারণ) ও ক্যাথোড (বিজারণ)-এর মৌলিক কার্যপ্রণালী আয়ত্ত করা।',
      explanation: `বিদ্যুৎ পরিবহনের পদ্ধতির ভিত্তিতে পদার্থ দুই প্রকার:
১. **ইলেকট্রনীয় / ধাতব পরিবাহী:** মুক্ত ইলেকট্রন সঞ্চালনের মাধ্যমে তড়িৎ পরিবাহিত হয়। কোনো স্থায়ী রাসায়নিক পরিবর্তন ঘটে না (যেমন তামা, অ্যালুমিনিয়াম, লোহা, গ্রাফাইট)।
২. **তড়িৎ বিশ্লেষ্য পরিবাহী:** গলিত বা জলীয় দ্রবণে ধনাত্মক ও ঋণাত্মক মুক্ত আয়নের মাধ্যমে বিদ্যুৎ প্রবাহিত হয় এবং উপাদানগুলোর স্থায়ী রাসায়নিক পরিবর্তন ও রেডক্স বিক্রিয়া ঘটে।

**তড়িৎ বিশ্লেষ্যের প্রকারভেদ:**
- **তীব্র তড়িৎ বিশ্লেষ্য:** জলীয় দ্রবণে প্রায় শতভাগ আয়নিত হয় (যেমন: $NaCl, HCl, H_2SO_4, NaOH$)।
- **মৃদু তড়িৎ বিশ্লেষ্য:** দ্রবণে আংশিক বা সামান্য আয়নিত হয় (যেমন: $CH_3COOH, NH_4OH, H_2CO_3$)।
- **তড়িৎ অবিশ্লেষ্য:** আয়ন সৃষ্টি করে না এবং বিদ্যুৎ অপরিবাহী (যেমন: চিনি, গ্লুকোজ, ইউরিয়া, ইথানল)।

**তড়িৎদ্বার (Electrodes):**
- **অ্যানোড (Anode):** যে তড়িৎদ্বারে সর্বদা **জারণ (Oxidation)** ঘটে অর্থাৎ ইলেকট্রন ত্যাগ সম্পন্ন হয়। তড়িৎ বিশ্লেষ্য কোষে এটি ধনাত্মক ($+$), গ্যালভানিক কোষে ঋণাত্মক ($-$) মেরু।
- **ক্যাথোড (Cathode):** যে তড়িৎদ্বারে সর্বদা **বিজারণ (Reduction)** ঘটে অর্থাৎ ইলেকট্রন গ্রহণ সম্পন্ন হয়। তড়িৎ বিশ্লেষ্য কোষে এটি ঋণাত্মক ($-$), গ্যালভানিক কোষে ধনাত্মক ($+$) মেরু।

**গলিত $NaCl$-এর তড়িৎ বিশ্লেষণ:**
- অ্যানোডে (জারণ): $2\\text{Cl}^-(\\text{l}) \\rightarrow \\text{Cl}_2(\\text{g}) + 2\\text{e}^-$ (ক্লোরিন গ্যাস নির্গমন)
- ক্যাথোডে (বিজারণ): $2\\text{Na}^+(\\text{l}) + 2\\text{e}^- \\rightarrow 2\\text{Na}(\\text{l})$ (ধাতব সোডিয়াম সঞ্চয়ন)`,
      importantTerms: [
        { termBangla: 'তড়িৎ বিশ্লেষ্য', termEnglish: 'Electrolyte', definition: 'যেসব পদার্থ গলিত বা দ্রবীভূত অবস্থায় আয়নের চলাচলের মাধ্যমে বিদ্যুৎ পরিবহন করে ও রাসায়নিকভাবে বিশ্লিষ্ট হয়।' },
        { termBangla: 'অ্যানোড', termEnglish: 'Anode', definition: 'তড়িৎ রাসায়নিক কোষের যে তড়িৎদ্বারে জারণ (ইলেকট্রন বর্জন) বিক্রিয়া সংঘটিত হয়।' },
        { termBangla: 'ক্যাথোড', termEnglish: 'Cathode', definition: 'তড়িৎ রাসায়নিক কোষের যে তড়িৎদ্বারে বিজারণ (ইলেকট্রন গ্রহণ) বিক্রিয়া সংঘটিত হয়।' },
      ],
      workedExample: {
        problem: 'গলিত সোডিয়াম ক্লোরাইডে তড়িৎ বিশ্লেষণে কীভাবে সোডিয়াম ধাতু ও ক্লোরিন গ্যাস পাওয়া যায় সমীকরণসহ দেখাও।',
        stepByStepSolution: `১. বিয়োজন: $NaCl(l) \\rightarrow Na^+ + Cl^-$।
২. ঋণাত্মক ক্লোরাইড আয়ন ধনাত্মক অ্যানোডে যায় এবং ইলেকট্রন ত্যাগ করে জারিত হয়: $2Cl^- \\rightarrow Cl_2(g) + 2e^-$।
৩. ধনাত্মক সোডিয়াম আয়ন ঋণাত্মক ক্যাথোডে যায় এবং ইলেকট্রন গ্রহণ করে বিজারিত হয়: $2Na^+ + 2e^- \\rightarrow 2Na(l)$।
৪. সামগ্রিক সমীকরণ: $2NaCl(l) \\xrightarrow{\\text{Electricity}} 2Na(l) + Cl_2(g)$।`,
      },
      memoryAid: 'গোল্ডেন নেমোনিক: An-Ox (অ্যানোডে জারণ) এবং Red-Cat (ক্যাথোডে বিজারণ)। ক্যাটায়ন যায় ক্যাথোডে, অ্যানায়ন যায় অ্যানোডে।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 8.4: তড়িৎ বিশ্লেষণ ও তড়িৎ লেপন (ইলেক্ট্রোপ্লেটিং)
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch8_4',
    chapter8.id,
    4,
    '৮.৪ তড়িৎ বিশ্লেষণ ও তড়িৎ লেপন (ইলেক্ট্রোপ্লেটিং) (Electrolysis & Electroplating)',
    'les_ssc_chemistry_ch8_4',
    {
      titleBangla: 'আয়নের অগ্রাধিকার ক্রম, ক্লোর-অ্যালকালি পদ্ধতি ও তড়িৎ লেপন',
      learningGoal: 'আয়নের চার্জমুক্তির ক্রম, ব্রাইন বিশ্লেষণ পদ্ধতি এবং তড়িৎ লেপনের শর্ত ও বিক্রিয়াসমূহ ব্যাখ্যা করতে পারা।',
      interactiveWidgetUrl: widgetUrl,
      explanation: `জলীয় দ্রবণে একাধিক আয়ন উপস্থিত থাকলে তিনটি নিয়ামকের ওপর ভিত্তি করে আয়ন চার্জমুক্ত হয়:
১. **তড়িৎ রাসায়নিক শ্রেণিতে আয়নের অবস্থান:** যে আয়ন সক্রিয়তা সিরিজে নিচে সে সহজে ইলেকট্রন আদান-প্রদান করে আগে চার্জমুক্ত হয়।
   - ক্যাটায়ন ক্রম: $K^+ < Ca^{2+} < Na^+ < Mg^{2+} < Al^{3+} < Zn^{2+} < Fe^{2+} < Pb^{2+} < \\mathbf{H}^+ < \\mathbf{Cu}^{2+} < \\mathbf{Ag}^+ < \\mathbf{Au}^{3+}$
   - অ্যানায়ন ক্রম: $NO_3^- < SO_4^{2-} < Cl^- < Br^- < I^- < \\mathbf{OH}^-$
২. **আয়নের ঘনমাত্রার প্রভাব:** সিরিজে উপরে থাকা সত্ত্বেও কোনো আয়নের আপেক্ষিক ঘনমাত্রা অত্যধিক হলে তা আগে চার্জমুক্ত হতে পারে।

**ব্রাইন (গাঢ় $NaCl$ দ্রবণ)-এর তড়িৎ বিশ্লেষণ (ক্লোর-অ্যালকালি পদ্ধতি):**
- ক্যাথোডে: $Na^+$ ও $H^+$ এর মধ্যে $H^+$ নিচে থাকায়: $2H^+ + 2e^- \\rightarrow H_2(g) \\uparrow$
- অ্যানোডে: $Cl^-$ এর উচ্চ ঘনমাত্রার কারণে $OH^-$ এর বদলে: $2Cl^- \\rightarrow Cl_2(g) \\uparrow + 2e^-$
- দ্রবণে অবশিষ্ট $Na^+$ ও $OH^-$ যুক্ত হয়ে কস্টিক সোডা ($NaOH$) গঠন করে।

**তড়িৎ লেপন (ইলেক্ট্রোপ্লেটিং):**
তড়িৎ বিশ্লেষণের মাধ্যমে অধিক সক্রিয় বা ক্ষয়প্রবণ ধাতুর তৈরি বস্তুর ওপর কম সক্রিয় ধাতুর মসৃণ ও আকর্ষণীয় প্রলেপ দেওয়াকে তড়িৎ লেপন বলে।
- **অ্যানোড (+):** যে ধাতুর প্রলেপ দিতে হবে তার খাঁটি দণ্ড (যেমন: $Ni, Ag, Cu$)।
- **ক্যাথোড (−):** যে বস্তুর ওপর প্রলেপ দিতে হবে (যেমন: লোহার চামচ, চাবি)।
- **তড়িৎবিশ্লেষ্য দ্রবণ:** প্রলেপকারী ধাতুর দ্রবণীয় লবণ (যেমন: $NiSO_4, AgNO_3$)।`,
      importantTerms: [
        { termBangla: 'ব্রাইন', termEnglish: 'Brine', definition: 'সোডিয়াম ক্লোরাইডের (NaCl) গাঢ় সম্পৃক্ত জলীয় দ্রবণ।' },
        { termBangla: 'তড়িৎ লেপন', termEnglish: 'Electroplating', definition: 'তড়িৎ বিশ্লেষণের সাহায্যে একটি ধাতুর ওপর অন্য কোনো কম সক্রিয় ধাতুর প্রলেপ দেওয়ার প্রযুক্তি।' },
        { termBangla: 'ক্লোর-অ্যালকালি পদ্ধতি', termEnglish: 'Chlor-Alkali Process', definition: 'ব্রাইনের তড়িৎ বিশ্লেষণে একই সাথে ক্লোরিন গ্যাস, হাইড্রোজেন গ্যাস ও কস্টিক সোডা (NaOH) উৎপাদনের শিল্প পদ্ধতি।' },
      ],
      workedExample: {
        problem: 'একটি তামার চামচে সিলভারের (রূপা) প্রলেপ দিতে অ্যানোড, ক্যাথোড ও তড়িৎবিশ্লেষ্য দ্রবণ নির্বাচন করে বিক্রিয়া দেখাও।',
        stepByStepSolution: `১. অ্যানোড (+): খাঁটি সিলভার ($Ag$) পাত।
২. ক্যাথোড (−): পরিষ্কার তামার চামচ।
৩. দ্রবণ: সিলভার নাইট্রেট ($AgNO_3$) দ্রবণ।
৪. অ্যানোড বিক্রিয়া: $Ag(s) \\rightarrow Ag^+(aq) + e^-$ (সিলভার দণ্ড ক্ষয়ে দ্রবণে আয়ন যোগ করে)।
৫. ক্যাথোড বিক্রিয়া: $Ag^+(aq) + e^- \\rightarrow Ag(s)$ (রূপার আয়ন চামচের গায়ে জমা হয়ে চকচকে আস্তরণ দেয়)।`,
      },
      memoryAid: 'তড়িৎ লেপনের সূত্র: "বস্তু ক্যাথোডে, ধাতু অ্যানোডে"। যে ধাতু চকচক করবে সে অ্যানোড, যার গায়ে লাগবে সে ক্যাথোড।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 8.5: গ্যালভানিক কোষ ও ড্যানিয়েল সেল
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch8_5',
    chapter8.id,
    5,
    '৮.৫ গ্যালভানিক কোষ ও ড্যানিয়েল সেল (Galvanic Cell & Daniell Cell)',
    'les_ssc_chemistry_ch8_5',
    {
      titleBangla: 'গ্যালভানিক কোষের গঠন, ড্যানিয়েল সেল ও লবণ সেতুর ভূমিকা',
      learningGoal: 'ড্যানিয়েল সেলের গঠন, অর্ধকোষ বিক্রিয়াসমূহ, প্রমাণ সেল বিভব (১.১০ ভোল্ট) এবং লবণ সেতুর অপরিহার্যতা ব্যাখ্যা করা।',
      interactiveWidgetUrl: widgetUrl,
      explanation: `যে কোষে স্বতঃস্ফূর্ত রাসায়নিক বিক্রিয়া ঘটিয়ে রাসায়নিক শক্তিকে সরাসরি বিদ্যুৎ শক্তিতে রূপান্তর করা হয় তাকে **গ্যালভানিক কোষ** বলে।

১. **ড্যানিয়েল সেলের গঠন ও অর্ধকোষ বিক্রিয়াসমূহ:**
   - **জিংক অ্যানোড অর্ধকোষ (−):** $1.0\\text{ M } ZnSO_4$ দ্রবণে জিংক ($Zn$) দণ্ড নিমজ্জিত।
     $$\\text{অ্যানোড জারণ: } \\text{Zn}(\\text{s}) \\rightarrow \\text{Zn}^{2+}(\\text{aq}) + 2\\text{e}^-$$
     জিংক পরমাণু জারিত হয়ে দ্রবণে চলে যায়, ফলে জিংক অ্যানোডের ভর হ্রাস পায়।
   - **কপার ক্যাথোড অর্ধকোষ (+):** $1.0\\text{ M } CuSO_4$ দ্রবণে কপার ($Cu$) দণ্ড নিমজ্জিত।
     $$\\text{ক্যাথোড বিজারণ: } \\text{Cu}^{2+}(\\text{aq}) + 2\\text{e}^- \\rightarrow \\text{Cu}(\\text{s})$$
     দ্রবণ থেকে কপার আয়ন ইলেকট্রন নিয়ে ধাতুরূপে জমা হয়, ফলে কপার ক্যাথোডের ভর বৃদ্ধি পায়।
   - **সার্বিক কোষ বিক্রিয়া ও প্রমাণ বিভব:**
     $$\\text{Zn}(\\text{s}) + \\text{Cu}^{2+}(\\text{aq}) \\rightarrow \\text{Zn}^{2+}(\\text{aq}) + \\text{Cu}(\\text{s})$$
     $$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{Zn}/\\text{Zn}^{2+}} + E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}} = 0.76\\text{ V} + 0.34\\text{ V} = \\mathbf{1.10\\text{ V}}$$

২. **লবণ সেতুর (Salt Bridge) ভূমিকা:**
   - লবণ সেতু ($KCl$ বা $KNO_3$ জেলিযুক্ত U-নল) দুটি অর্ধকোষের দ্রবণকে সংযোগ করে অভ্যন্তরীণ বর্তনী পূর্ণ করে।
   - জিংক পাত্রে অতিরিক্ত $Zn^{2+}$ প্রশমিত করতে লবণ সেতু থেকে $Cl^-$ আয়ন আসে; কপার পাত্রে অতিরিক্ত $SO_4^{2-}$ প্রশমিত করতে $K^+$ আয়ন যায়। এর ফলে তড়িৎ নিরপেক্ষতা বজায় থাকে। লবণ সেতু সরিয়ে নিলে কোষ তৎক্ষণাৎ বন্ধ হয়ে যায়।`,
      importantTerms: [
        { termBangla: 'গ্যালভানিক কোষ', termEnglish: 'Galvanic Cell', definition: 'যে তড়িৎ রাসায়নিক কোষে স্বতঃস্ফূর্ত রেডক্স বিক্রিয়ার মাধ্যমে রাসায়নিক শক্তি বিদ্যুৎ শক্তিতে রূপান্তরিত হয়।' },
        { termBangla: 'ড্যানিয়েল সেল', termEnglish: 'Daniell Cell', definition: 'জিংক অ্যানোড ও কপার ক্যাথোড বিশিষ্ট ১.১০ ভোল্ট বিভবসম্পন্ন একটি সুনির্দিষ্ট গ্যালভানিক কোষ।' },
        { termBangla: 'লবণ সেতু', termEnglish: 'Salt Bridge', definition: 'অ্যাগার-অ্যাগার জেল ও নিষ্ক্রিয় লবণের দ্রবণ দ্বারা পূর্ণ একটি উল্টানো U-নল যা অর্ধকোষদ্বয়ের তড়িৎ নিরপেক্ষতা রক্ষা করে।' },
      ],
      workedExample: {
        problem: 'ড্যানিয়েল সেলের বহির্বর্তনীতে ইলেকট্রন ও তড়িৎপ্রবাহের দিক এবং তড়িৎদ্বারের ভরের পরিবর্তন ব্যাখ্যা করো।',
        stepByStepSolution: `১. ইলেকট্রন প্রবাহ: বহির্বর্তনীর পরিবাহী তার দিয়ে জিংক অ্যানোড (-) থেকে কপার ক্যাথোড (+)-এর দিকে প্রবাহিত হয়।
২. প্রচলিত তড়িৎ প্রবাহ: ইলেকট্রন প্রবাহের বিপরীত দিকে অর্থাৎ কপার ক্যাথোড (+) থেকে জিংক অ্যানোড (-)-এর দিকে ঘটে।
৩. জিংক অ্যানোডের ভর হ্রাস পায় ($Zn \\rightarrow Zn^{2+} + 2e^-$)।
৪. কপার ক্যাথোডের ভর বৃদ্ধি পায় ($Cu^{2+} + 2e^- \\rightarrow Cu$)।`,
      },
      memoryAid: 'ইলেকট্রন যায় Zn থেকে Cu (বর্ণানুক্রমিক Z → C)। লবণ সেতুতে ক্যাটায়ন (K+) যায় ক্যাথোড পাত্রে, অ্যানায়ন (Cl-) যায় অ্যানোড পাত্রে।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 8.6: ড্রাই সেল (লেকল্যান্স সেল) ও ব্যাটারির ব্যবহার
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch8_6',
    chapter8.id,
    6,
    '৮.৬ ড্রাই সেল (লেকল্যান্স সেল) ও ব্যাটারির ব্যবহার (Dry Cell & Batteries)',
    'les_ssc_chemistry_ch8_6',
    {
      titleBangla: 'শুষ্ক কোষ (ড্রাই সেল), লেড সঞ্চয়ী ব্যাটারি ও পরিবেশ সুরক্ষা',
      learningGoal: 'ড্রাই সেলের গঠন ও বিক্রিয়া, লেড-এসিড ব্যাটারির কার্যপদ্ধতি এবং ব্যবহৃত ব্যাটারির পরিবেশ দূষণ ও রিসাইক্লিং নীতি জানা।',
      interactiveWidgetUrl: widgetUrl,
      explanation: `ড্রাই সেল হলো লেকল্যান্স সেলের একটি আধুনিক, তরলহীন ও সহজে বহনযোগ্য সংস্করণ।

১. **ড্রাই সেলের গঠন:**
   - **অ্যানোড (−):** বাইরের ফাঁপা জিংক বা দস্তার সিলিন্ডার পাত্র।
   - **ক্যাথোড (+):** মাঝখানে উল্লম্বভাবে স্থাপিত কার্বন বা গ্রাফাইট দণ্ড (শীর্ষে পিতলের টুপিযুক্ত)।
   - **তড়িৎবিশ্লেষ্য পেস্ট:** অ্যামোনিয়াম ক্লোরাইড ($NH_4Cl$), জিংক ক্লোরাইড ($ZnCl_2$), ম্যাঙ্গানিজ ডাই-অক্সাইড ($MnO_2$), পানি ও স্টার্চের ঘন লেই।

২. **রাসায়নিক বিক্রিয়াসমূহ:**
   $$\\textbf{অ্যানোড জারণ: } \\text{Zn}(\\text{s}) \\rightarrow \\text{Zn}^{2+}(\\text{aq}) + 2\\text{e}^-$$
   $$\\textbf{ক্যাথোড বিজারণ: } 2\\text{MnO}_2(\\text{s}) + 2\\text{NH}_4^+(\\text{aq}) + 2\\text{e}^- \\rightarrow \\text{Mn}_2\\text{O}_3(\\text{s}) + 2\\text{NH}_3(\\text{g}) + \\text{H}_2\\text{O}(\\text{l})$$
   - $MnO_2$ পোলারাইজেশন দূর করে এবং উৎপন্ন $NH_3$ গ্যাস $Zn^{2+}$ এর সাথে জটিল আয়ন $[Zn(NH_3)_4]^{2+}$ গঠন করায় কোষ ফুলে ফেটে যায় না।
   - একটি আদর্শ ড্রাই সেলের বিভব প্রায় **১.৫ ভোল্ট ($1.5\\text{ V}$)**।

৩. **অন্যান্য আধুনিক ব্যাটারি:**
   - **লেড-এসিড সঞ্চয়ী ব্যাটারি:** মোটরগাড়ি ও আইপিএস-এ ব্যবহৃত হয়। স্পঞ্জ লেড ($Pb$) অ্যানোড, $PbO_2$ ক্যাথোড এবং পাতলা $H_2SO_4$ দ্রবণ তড়িৎবিশ্লেষ্য। ৬টি সেল যুক্ত করে ১২ ভোল্ট ব্যাটারি তৈরি হয়। এটি রিচার্জেবল (গৌণ কোষ)।
   - **লিথিয়াম-আয়ন ব্যাটারি:** স্মার্টফোন ও ল্যাপটপে ব্যবহৃত অত্যন্ত হালকা ও উচ্চ ভোল্টেজ ($3.7\\text{ V}$) সম্পন্ন রিচার্জেবল ব্যাটারি।

৪. **পরিবেশ দূষণ ও রিসাইক্লিং:** ব্যবহৃত ব্যাটারির সীসা ($Pb$), ক্যাডমিয়াম ($Cd$) ও পারদ ($Hg$) মারাত্মক ভারী ধাতু যা মাটি-পানি দূষিত করে ক্যান্সার ও কিডনি বিকল করতে পারে। তাই উপযুক্ত রিসাইক্লিং অপরিহার্য।`,
      importantTerms: [
        { termBangla: 'ড্রাই সেল (শুষ্ক কোষ)', termEnglish: 'Dry Cell', definition: 'তরলহীন পেস্ট ও জিংক-কার্বন তড়িৎদ্বার বিশিষ্ট ১.৫ ভোল্টের সহজে বহনযোগ্য প্রাথমিক তড়িৎ রাসায়নিক কোষ।' },
        { termBangla: 'লেড-এসিড ব্যাটারি', termEnglish: 'Lead-Acid Battery', definition: 'লেড ও সালফিউরিক এসিড ভিত্তিক মোটরগাড়িতে ব্যবহৃত রিচার্জেবল গৌণ ব্যাটারি।' },
        { termBangla: 'লিথিয়াম-আয়ন ব্যাটারি', termEnglish: 'Lithium-ion Battery', definition: 'লিথিয়াম আয়ন স্থানান্তরের মাধ্যমে পরিচালিত আধুনিক উচ্চ কর্মক্ষম হালকা রিচার্জেবল ব্যাটারি।' },
        { termBangla: 'ডিপোলারাইজার', termEnglish: 'Depolarizer', definition: 'যে রাসায়নিক পদার্থ কোষে উৎপন্ন হাইড্রোজেন গ্যাস জারিত করে অভ্যন্তরীণ রোধ কম রাখে (যেমন ড্রাই সেলে MnO2)।' },
      ],
      workedExample: {
        problem: 'ড্রাই সেলে উৎপন্ন অ্যামোনিয়া গ্যাস জমে ব্যাটারি যাতে ফেটে না যায়, সেজন্য রসায়নাগারে কী সুরক্ষাব্যবস্থা থাকে?',
        stepByStepSolution: `ক্যাথোড বিক্রিয়ায় উৎপন্ন গ্যাসীয় অ্যামোনিয়া ($NH_3$) কোষের পেস্টে থাকা জিংক আয়ন ($Zn^{2+}$) এবং ক্লোরাইড আয়ন ($Cl^-$)-এর সাথে তাৎক্ষণিকভাবে বিক্রিয়া করে দ্রবণীয় জটিল আয়ন গঠন করে:
$$Zn^{2+} + 4NH_3 + 2Cl^- \\rightarrow [Zn(NH_3)_4]Cl_2$$
ফলে কোষে কোনো মুক্ত গ্যাসীয় চাপ তৈরি হতে পারে না এবং ব্যাটারি অক্ষত থাকে।`,
      },
      memoryAid: 'ড্রাই সেল বিভব ১.৫ ভোল্ট। লেড ব্যাটারি ৬ সেল × ২ ভোল্ট = ১২ ভোল্ট। পেস্ট উপাদান: অ্যামোনিয়াম ক্লোরাইড + জিংক ক্লোরাইড + ম্যাঙ্গানিজ ডাই-অক্সাইড।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Upsert all 72 Questions (54 MCQs + 18 CQs)
  // -------------------------------------------------------------------------
  console.log(`Seeding ${chemistryChapter8AllQuestions.length} verified questions for Chapter 8...`);

  for (const q of chemistryChapter8AllQuestions) {
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
    'top_ssc_chemistry_ch8_1',
    'top_ssc_chemistry_ch8_2',
    'top_ssc_chemistry_ch8_3',
    'top_ssc_chemistry_ch8_4',
    'top_ssc_chemistry_ch8_5',
    'top_ssc_chemistry_ch8_6',
  ];

  await prisma.lesson.deleteMany({
    where: {
      topic: { chapterId: chapter8.id },
      topicId: { notIn: activeTopicIds },
    },
  });

  await prisma.topic.deleteMany({
    where: {
      chapterId: chapter8.id,
      id: { notIn: activeTopicIds },
    },
  });

  console.log(`✅ SSC Chemistry Chapter 8 seeded successfully (${chemistryChapter8AllQuestions.length} verified questions).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedChemistryChapter8(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Chemistry Chapter 8 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
