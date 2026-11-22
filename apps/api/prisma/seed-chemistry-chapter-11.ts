import { PrismaClient, ContentStatus } from '@prisma/client';
import { chemistryChapter11QuestionsBatch1 } from './seed-chemistry-chapter-11-questions';
import { chemistryChapter11QuestionsBatch2 } from './seed-chemistry-chapter-11-questions-batch2';
import { chemistryChapter11QuestionsBatch3 } from './seed-chemistry-chapter-11-questions-batch3';

export const sscChemistrySubject = {
  id: 'sub_ssc_chemistry',
  code: 'ssc_chemistry',
  nameBangla: 'রসায়ন',
  classLevel: 'CLASS_9_10',
  program: 'SSC',
  syllabusYear: 2026,
  isReady: true,
};

export const chemistryChapter11AllQuestions = [
  ...chemistryChapter11QuestionsBatch1,
  ...chemistryChapter11QuestionsBatch2,
  ...chemistryChapter11QuestionsBatch3,
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

export async function seedChemistryChapter11(prisma: PrismaClient) {
  console.log('🧪 Seeding SSC Chemistry Chapter 11 (খনিজ সম্পদ: জীবাশ্ম / Mineral Resources: Fossils)...');

  await prisma.subject.upsert({
    where: { code: sscChemistrySubject.code },
    update: sscChemistrySubject,
    create: sscChemistrySubject,
  });

  const chapter11 = await prisma.chapter.upsert({
    where: { id: 'chap_ssc_chemistry_ch11' },
    update: {
      subjectId: sscChemistrySubject.id,
      orderIndex: 11,
      titleBangla: 'একাদশ অধ্যায়: খনিজ সম্পদ: জীবাশ্ম (Mineral Resources: Fossils)',
    },
    create: {
      id: 'chap_ssc_chemistry_ch11',
      subjectId: sscChemistrySubject.id,
      orderIndex: 11,
      titleBangla: 'একাদশ অধ্যায়: খনিজ সম্পদ: জীবাশ্ম (Mineral Resources: Fossils)',
    },
  });

  // -------------------------------------------------------------------------
  // Topic 11.1: জীবাশ্ম জ্বালানি ও পেট্রোলিয়ামের আংশিক পাতন
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch11_1',
    chapter11.id,
    1,
    '১১.১ জীবাশ্ম জ্বালানি ও পেট্রোলিয়ামের আংশিক পাতন (Fossil Fuels & Fractional Distillation)',
    'les_ssc_chemistry_ch11_1',
    {
      titleBangla: 'জীবাশ্ম জ্বালানির উৎপত্তি, প্রাকৃতিক গ্যাসের শতকরা সংযুক্তি ও আংশিক পাতনের ৭টি ভগ্নাংশ',
      learningGoal: 'কয়লা, খনিজ তেল ও প্রাকৃতিক গ্যাসের উৎপত্তি, বাংলাদেশের প্রাকৃতিক গ্যাসে মিথেনের ৯৯.৯% প্রাপ্যতা এবং পেট্রোলিয়ামের আংশিক পাতনে ৭টি ভগ্নাংশের স্ফুটনাঙ্ক পরিসীমা ও ব্যবহার নির্ভুলভাবে ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. জীবাশ্ম জ্বালানির উৎপত্তি ও ত্রয়ী
- শত শত মিলিয়ন বছর পূর্বে মৃত উদ্ভিদ ও সামুদ্রিক প্রাণীর দেহাবশেষ ভূগর্ভের উচ্চ তাপ, চাপ ও অক্সিজেনের অনুপস্থিতিতে দীর্ঘস্থায়ী রূপান্তরের মাধ্যমে **জীবাশ্ম জ্বালানি (Fossil Fuel)** উৎপন্ন করে।
- **কয়লা:** প্রায় ২৫০–৩৫০ মিলিয়ন বছর আগের গভীর বনাঞ্চলের গাছপালা ভূগর্ভে চাপা পড়ে তৈরি হয়েছে।
- **পেট্রোলিয়াম ও প্রাকৃতিক গ্যাস:** মূলত সামুদ্রিক প্লাঙ্কটন, অতিক্ষুদ্র উদ্ভিদ ও প্রাণী মাটির নিচে বালু ও পলির স্তরে চাপা পড়ে ব্যাকটেরিয়ার ক্রিয়া এবং ভূগর্ভস্থ তাপে পেট্রোলিয়াম ও গ্যাসে রূপান্তরিত হয়।
- পেট্রোলিয়াম হলো বিভিন্ন স্ফুটনাঙ্কের হাইড্রোকার্বনের একটি জটিল ও সান্দ্র তরল মিশ্রণ। ভূগর্ভ থেকে উত্তোলিত এই রূপকে বলা হয় **অপরিশোধিত তেল বা ক্রুড অয়েল (Crude Oil)**।

### ২. প্রাকৃতিক গ্যাসের শতকরা সংযুক্তি
| উপাদান | সাধারণ প্রাকৃতিক গ্যাস | বাংলাদেশের প্রাকৃতিক গ্যাস |
| :--- | :--- | :--- |
| **মিথেন ($\\mathrm{CH_4}$)** | ৮০% – ৯০% | **৯৯.৯%** (অত্যন্ত বিশুদ্ধ ও গন্ধহীন) |
| **ইথেন ($\\mathrm{C_2H_6}$)** | ~৭% | অতি সামান্য |
| **প্রোপেন ($\\mathrm{C_3H_8}$)** | ~৩% | অতি সামান্য |
| **বিউটেন ও অন্যান্য** | ~১% | অতি সামান্য |

### ৩. পেট্রোলিয়ামের আংশিক পাতন কলাম (Fractional Distillation Column)
ক্রুড অয়েলকে ফার্নেসে প্রায় **৪০০° সে.** তাপমাত্রায় উত্তপ্ত করে আংশিক পাতন কলামে প্রবেশ করানো হয়। স্ফুটনাঙ্কের পার্থক্যের ভিত্তিতে ৭টি প্রধান ভগ্নাংশে পৃথক করা হয়:
1. **পেট্রোলিয়াম গ্যাস (০° – ২০°C, $\\mathrm{C_1 - C_4}$):** ২% — চাপ প্রয়োগে তরল করে এলপিজি (LPG) সিলিন্ডার গ্যাসে ব্যবহৃত হয়।
2. **পেট্রোল বা গ্যাসোলিন (২১° – ৭০°C, $\\mathrm{C_5 - C_8}$):** ৫% — হালকা মোটরগাড়ির প্রধান জ্বালানি।
3. **ন্যাপথা (৭১° – ১২০°C, $\\mathrm{C_7 - C_{14}}$):** ১০% — পেট্রোকেমিক্যাল শিল্পে দ্রাবক, প্লাস্টিক ও সার তৈরির কাঁচামাল।
4. **কেরোসিন (১২১° – ১৭০°C, $\\mathrm{C_{11} - C_{16}}$):** ১৩% — জেট বিমানের বিশেষ জ্বালানি (Aviation fuel) ও স্টোভ।
5. **ডিজেল তেল (১৭১° – ২৭০°C, $\\mathrm{C_{17} - C_{20}}$):** ১৯% — ভারী যানবাহন (বাস, ট্রাক, ট্রেন, জাহাজ) ও জেনারেটরের জ্বালানি।
6. **লুব্রিকেটিং তেল ও মোম (২৭১° – ৩৪০°C, $\\mathrm{C_{20} - C_{30}}$):** ৩৩% — ইঞ্জিনের ঘর্ষণরোধক লুব্রিকেন্ট (১৭%) এবং ভেসলিন ও মোমবাতি (১৬%)।
7. **বিটুমিন বা পিচ (> ৩৪০°C, $\\mathrm{C_{30+}}$):** ১৮% — তলদেশের চটচটে কালো অবশেষ; রাস্তা পাকা করার কার্পেটিংয়ে ব্যবহৃত।`,
      interactiveWidgetUrl: '/uploads/interactive/hydrocarbon-functional-groups-lab.html',
      importantTerms: [
        { termBangla: 'জীবাশ্ম জ্বালানি', termEnglish: 'Fossil Fuel', definition: 'ভূগর্ভের উচ্চ তাপ ও চাপে রূপান্তরিত মৃত জীবদেহাবশেষজাত জ্বালানি (কয়লা, পেট্রোলিয়াম, প্রাকৃতিক গ্যাস)।' },
        { termBangla: 'আংশিক পাতন', termEnglish: 'Fractional Distillation', definition: 'স্ফুটনাঙ্কের পার্থক্যের ওপর ভিত্তি করে তরল মিশ্রণের উপাদানসমূহকে পৃথক করার ভৌত প্রক্রিয়া।' },
        { termBangla: 'সিএনজি ও এলপিজি', termEnglish: 'CNG & LPG', definition: 'CNG হলো উচ্চ চাপে সংকুচিত মিথেন (প্রাকৃতিক গ্যাস) এবং LPG হলো চাপ প্রয়োগে তরলীকৃত প্রোপেন ও বিউটেন।' },
      ],
      workedExample: {
        problem: 'পেট্রোলিয়ামের আংশিক পাতন কলামে কেরোসিন ভগ্নাংশটি কেন ডিজেলের চেয়ে উপরে সংগৃহীত হয়? (অনুধাবন প্রশ্ন)',
        stepByStepSolution: '১. আংশিক পাতন কলামের তলদেশে তাপমাত্রা সবচেয়ে বেশি (৪০০°C) এবং শীর্ষভাগে তাপমাত্রা সবচেয়ে কম (<২০°C) থাকে।\n২. কেরোসিনের স্ফুটনাঙ্ক পরিসীমা হলো ১২১°–১৭০° সে. (C₁₁–C₁₆), অন্যদিকে ডিজেল তেলের স্ফুটনাঙ্ক পরিসীমা ১৭১°–২৭০° সে. (C₁₇–C₂₀)।\n৩. কেরোসিনের কার্বন শৃঙ্খল ছোট এবং স্ফুটনাঙ্ক তুলনামূলকভাবে কম হওয়ায় এর বাষ্প কলামের অপেক্ষাকৃত উঁচুতে উঠে ঘনীভূত হয়।',
      },
      memoryAid: 'আংশিক পাতনের ছন্দ “প্যাঁ-পে-ন্যা-কে-ডি-লু-পি”: পেট্রোলিয়াম গ্যাস (০-২০°C) ➔ পেট্রোল (২১-৭০°C) ➔ ন্যাপথা (৭১-১২০°C) ➔ কেরোসিন (১২১-১৭০°C) ➔ ডিজেল (১৭১-২৭০°C) ➔ লুব্রিকেন্ট (২৭১-৩৪০°C) ➔ পিচ (>৩৪০°C)!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 11.2: হাইড্রোকার্বনের শ্রেণিবিভাগ
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch11_2',
    chapter11.id,
    2,
    '১১.২ হাইড্রোকার্বনের শ্রেণিবিভাগ (Classification of Hydrocarbons)',
    'les_ssc_chemistry_ch11_2',
    {
      titleBangla: 'অ্যালিফ্যাটিক, অ্যারোমেটিক, সমগোত্রীয় শ্রেণি ও কার্যকরী মূলকের শ্রেণিবিভাগ',
      learningGoal: 'মুক্তশিকল ও বদ্ধশিকল (অ্যালিসাইক্লিক), সম্পৃক্ত ও অসম্পৃক্ত হাইড্রোকার্বন, বেনজিন ও ন্যাপথালিনের অ্যারোমেটিক গঠন এবং প্রধান সমগোত্রীয় শ্রেণির কার্যকরী মূলক নির্ভুলভাবে লিখতে পারবে।',
      explanation: `### ১. হাইড্রোকার্বনের মৌলিক সংজ্ঞা ও শ্রেণিবিভাগ
- শুধু **কার্বন (C)** এবং **হাইড্রোজেন (H)** দ্বারা গঠিত দ্বিমৌল জৈব যৌগকে **হাইড্রোকার্বন** বলে।
- প্রধান দুটি শাখা:
  1. **অ্যালিফ্যাটিক (Aliphatic):** গ্রিক *aleiphar* (চর্বি) থেকে এসেছে। এরা চর্বিজাত যৌগ।
  2. **অ্যারোমেটিক (Aromatic):** গ্রিক *aroma* (সুগন্ধ) থেকে এসেছে। সমতলীয় একান্তর দ্বিবন্ধনযুক্ত রিং যৌগ (বেনজিন $\\mathrm{C_6H_6}$, ন্যাপথালিন $\\mathrm{C_{10}H_8}$)।

### ২. অ্যালিফ্যাটিক হাইড্রোকার্বনের শাখা
- **মুক্তশিকল (Acyclic):** দুই প্রান্তের কার্বন মুক্ত থাকে।
  - *সম্পৃক্ত (অ্যালকেন):* কার্বন-কার্বন একক বন্ধন ($\\mathrm{C-C}$), সাধারণ সংকেত $\\mathrm{C_n H_{2n+2}}$। যেমন: প্রোপেন ($\\mathrm{CH_3-CH_2-CH_3}$)।
  - *অসম্পৃক্ত:*
    - **অ্যালকিন:** কার্বন-কার্বন দ্বিবন্ধন ($\\mathrm{C=C}$), সংকেত $\\mathrm{C_n H_{2n}}$। যেমন: ইথিন ($\\mathrm{CH_2=CH_2}$)।
    - **অ্যালকাইন:** কার্বন-কার্বন ত্রিবন্ধন ($\\mathrm{C\\equiv C}$), সংকেত $\\mathrm{C_n H_{2n-2}}$। যেমন: ইথাইন ($\\mathrm{CH\\equiv CH}$)।
- **বদ্ধশিকল বা অ্যালিসাইক্লিক (Alicyclic):** প্রান্তীয় কার্বন যুক্ত হয়ে রিং গঠন করে। যেমন: সাইক্লোপ্রোপেন ($\\mathrm{C_3H_6}$), সাইক্লোবিউটেন ($\\mathrm{C_4H_8}$)।

### ৩. সমগোত্রীয় শ্রেণি ও কার্যকরী মূলক
- **সমগোত্রীয় শ্রেণি (Homologous Series):** একই সাধারণ সংকেত ও কার্যকরী মূলকবিশিষ্ট এবং ধারাবাহিক সদস্যদের আণবিক সংকেতে একটি **মিথিলিন মূলকের ($-\\mathrm{CH_2}-$, ভর ১৪)** পার্থক্য বিদ্যমান এমন যৌগ পরিবার।
- **প্রধান কার্যকরী মূলক:**
  - অ্যালকেন: $\\mathrm{C-C}$
  - অ্যালকিন: $\\mathrm{C=C}$
  - অ্যালকাইন: $\\mathrm{C\\equiv C}$
  - অ্যালকোহল: $-\\mathrm{OH}$ (হাইড্রক্সিল মূলক)
  - অ্যালডিহাইড: $-\\mathrm{CHO}$ (অ্যালডিহাইড মূলক)
  - কিটোন: $>\\mathrm{C=O}$ (কার্বনিল মূলক)
  - জৈব এসিড: $-\\mathrm{COOH}$ (কার্বক্সিল মূলক)`,
      interactiveWidgetUrl: '/uploads/interactive/hydrocarbon-functional-groups-lab.html',
      importantTerms: [
        { termBangla: 'অ্যালিফ্যাটিক বনাম অ্যারোমেটিক', termEnglish: 'Aliphatic vs Aromatic', definition: 'চর্বিজাত মুক্ত/বদ্ধশিকল যৌগ হলো অ্যালিফ্যাটিক; আর সুগন্ধযুক্ত একান্তর দ্বিবন্ধনবিশিষ্ট সমতলীয় বলয়াকার যৌগ হলো অ্যারোমেটিক।' },
        { termBangla: 'সমগোত্রীয় শ্রেণি', termEnglish: 'Homologous Series', definition: 'একই সাধারণ সংকেত ও কার্যকরী মূলকবিশিষ্ট যৌগশ্রেণি, যার পাশাপাশি দুই সদস্যে –CH₂– (ভর ১৪) পার্থক্য থাকে।' },
        { termBangla: 'কার্যকরী মূলক', termEnglish: 'Functional Group', definition: 'জৈব যৌগের অণুতে উপস্থিত যে পরমাণু বা মূলক তার প্রধান রাসায়নিক ধর্ম নিয়ন্ত্রণ ও নির্ধারণ করে।' },
      ],
      workedExample: {
        problem: 'সাইক্লোপ্রোপেনের আণবিক সংকেত C₃H₆ হওয়া সত্ত্বেও এটি কেন অ্যালকিন নয়? (অনুধাবন প্রশ্ন)',
        stepByStepSolution: '১. অ্যালকিনের প্রধান শনাক্তকারী বৈশিষ্ট্য হলো এতে অন্তত একটি কার্বন-কার্বন দ্বিবন্ধন (C=C) থাকতে হবে।\n২. সাইক্লোপ্রোপেনে (C₃H₆) ৩টি কার্বন পরমাণু একক বন্ধন (C–C) দ্বারা পরস্পরের সাথে যুক্ত হয়ে একটি বদ্ধ রিং গঠন করে।\n৩. কোনো দ্বিবন্ধন না থাকায় এবং কেবল একক বন্ধন বিদ্যমান থাকায় এটি একটি সম্পৃক্ত অ্যালিসাইক্লিক হাইড্রোকার্বন, অ্যালকিন নয়।',
      },
      memoryAid: 'হাইড্রোজেনের হিসেব: অ্যালকেন = কার্বনের দ্বিগুণের চেয়ে ২ বেশি (+২); অ্যালকিন = ঠিক দ্বিগুণ (×২); অ্যালকাইন = দ্বিগুণের চেয়ে ২ কম (–২)!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 11.3: সম্পৃক্ত হাইড্রোকার্বন (অ্যালকেন) প্রস্তুতি ও রাসায়নিক ধর্ম
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch11_3',
    chapter11.id,
    3,
    '১১.৩ সম্পৃক্ত হাইড্রোকার্বন (অ্যালকেন) প্রস্তুতি ও ধর্ম (Alkanes: Preparation & Reactions)',
    'les_ssc_chemistry_ch11_3',
    {
      titleBangla: 'ডিকার্বক্সিলেশন, হাইড্রোজেনেশন, প্যারাফিন আসক্তিহীনতা ও ৪-ধাপ ক্লোরিনেশন',
      learningGoal: 'সোডালাইম দ্বারা ডিকার্বক্সিলেশন বিক্রিয়ায় ১ কার্বন হ্রাসের নিয়ম, নিকেল প্রভাবকে হাইড্রোজেনেশন এবং সূর্যালোকের উপস্থিতিতে মিথেনের ৪-ধাপের মুক্তমূলক ক্লোরিনেশন প্রতিস্থাপন বিক্রিয়া লিখতে পারবে।',
      explanation: `### ১. অ্যালকেন প্রস্তুতি
1. **ডিকার্বক্সিলেশন বিক্রিয়া (Decarboxylation Reaction):**
   - ফ্যাটি এসিডের সোডিয়াম লবণকে সোডালাইম ($\\mathrm{NaOH + CaO}$) সহ তীব্র উত্তপ্ত করলে এক কার্বন কম বিশিষ্ট অ্যালকেন উৎপন্ন হয়:
   $$\\mathrm{CH_3COONa + NaOH \\xrightarrow{CaO, \\Delta} CH_4 + Na_2CO_3}$$
   $$\\mathrm{CH_3CH_2COONa + NaOH \\xrightarrow{CaO, \\Delta} CH_3-CH_3 + Na_2CO_3}$$
   - **নীতি:** বিক্রিয়কের কার্বক্সিল মূলকটি সোডিয়াম কার্বনেট ($\\mathrm{Na_2CO_3}$) হিসেবে বের হয়ে যাওয়ায় উৎপাদে সর্বদা ১টি কার্বন কম থাকে।
2. **অসম্পৃক্ত হাইড্রোকার্বন থেকে হাইড্রোজেনেশন:**
   - নিকেল (Ni) চূর্ণ প্রভাবকের উপস্থিতিতে ১৮০°–২০০° সে. তাপমাত্রায় অ্যালকিন ও অ্যালকাইনে হাইড্রোজেন যুক্ত হয়:
   $$\\mathrm{CH_2=CH_2 + H_2 \\xrightarrow{Ni, 180-200^\\circ C} CH_3-CH_3}$$
   $$\\mathrm{CH\\equiv CH + 2H_2 \\xrightarrow{Ni, 180-200^\\circ C} CH_3-CH_3}$$

### ২. অ্যালকেনের প্যারাফিন ধর্ম (আসক্তিহীনতা)
- ল্যাটিন *Parum* (স্বল্প) + *Affinis* (আসক্তি) মিলে **Paraffin** গঠিত হয়েছে।
- অ্যালকেনে কেবল শক্তিশালী অপোলার সিগমা ($\\sigma$) বন্ধন থাকে। কোনো পাই বন্ধন বা মুক্ত ইলেকট্রন না থাকায় সাধারণ তাপমাত্রায় এরা এসিড, ক্ষার বা জারকের সাথে কোনো বিক্রিয়া করে না।

### ৩. ক্লোরিনেশন প্রতিস্থাপন বিক্রিয়া (Chlorination of Methane)
বিক্ষিপ্ত সূর্যালোক বা অতিবেগুনি (UV) আলোর উপস্থিতিতে মিথেনের ৪টি হাইড্রোজেন পরমাণু ধাপে ধাপে ক্লোরিন দ্বারা প্রতিস্থাপিত হয়:
1. $\\mathrm{CH_4 + Cl_2 \\xrightarrow{h\\nu} CH_3Cl (ক্লোরোমিথেন) + HCl}$
2. $\\mathrm{CH_3Cl + Cl_2 \\xrightarrow{h\\nu} CH_2Cl_2 (ডাইক্লোরোমিথেন - পেইন্ট দ্রাবক) + HCl}$
3. $\\mathrm{CH_2Cl_2 + Cl_2 \\xrightarrow{h\\nu} CHCl_3 (ট্রাইক্লোরোমিথেন / ক্লোরোফর্ম - চেতনানাশক) + HCl}$
4. $\\mathrm{CHCl_3 + Cl_2 \\xrightarrow{h\\nu} CCl_4 (টেট্রাক্লোরোমিথেন / ড্রাইওয়াশ দ্রাবক ও অগ্নিনির্বাপক) + HCl}$

*সতর্কতা:* তীব্র প্রত্যক্ষ সূর্যালোক দিলে বিস্ফোরণ ঘটে কার্বন চূর্ণ ও HCl উৎপন্ন হয়: $\\mathrm{CH_4 + 2Cl_2 \\rightarrow C + 4HCl}$।

### ৪. দহন বিক্রিয়া
$$\\mathrm{CH_4 + 2O_2 \\rightarrow CO_2 + 2H_2O + তাপ শক্তি (890\\text{ kJ/mol})}$$`,
      interactiveWidgetUrl: '/uploads/interactive/hydrocarbon-functional-groups-lab.html',
      importantTerms: [
        { termBangla: 'সোডালাইম', termEnglish: 'Soda-lime', definition: 'সোডিয়াম হাইড্রোক্সাইড (NaOH) এবং ক্যালসিয়াম অক্সাইডের (CaO) শুষ্ক কঠিন মিশ্রণ যা ডিকার্বক্সিলেশনে ব্যবহৃত হয়।' },
        { termBangla: 'প্যারাফিন', termEnglish: 'Paraffin', definition: 'ল্যাটিন parum (স্বল্প) + affinis (আসক্তি) থেকে উদ্ভূত অ্যালকেনের বিশেষ নাম, যা এদের রাসায়নিক নিষ্ক্রিয়তা নির্দেশ করে।' },
        { termBangla: 'ক্লোরোফর্ম ও পায়রিন', termEnglish: 'Chloroform & Pyrene', definition: 'CHCl₃ হলো চেতনানাশক ক্লোরোফর্ম এবং CCl₄ হলো ড্রাইওয়াশ ও অগ্নিনির্বাপক হিসেবে ব্যবহৃত পায়রিন।' },
      ],
      workedExample: {
        problem: 'সোডিয়াম বিউটানয়েট থেকে সোডালাইমের সাহায্যে কীভাবে অ্যালকেন প্রস্তুত করবে? সমীকরণসহ লেখো।',
        stepByStepSolution: '১. সোডিয়াম বিউটানয়েটের সংকেত: CH₃–CH₂–CH₂–COONa (৪টি কার্বন পরমাণু)।\n২. সোডালাইম (NaOH + CaO) সহ উত্তপ্ত করলে ডিকার্বক্সিলেশনে ১টি কার্বন অপসারিত হয়ে ৩ কার্বনের প্রোপেন গ্যাস উৎপন্ন হয়:\nCH₃CH₂CH₂COONa + NaOH ➔ [CaO, তাপ] ➔ CH₃CH₂CH₃ (প্রোপেন) + Na₂CO₃।',
      },
      memoryAid: 'ডিকার্বক্সিলেশন ছন্দ: “সোডা আর চুন, কমায় কার্বন একটা গুণ!” ইথানয়েট দিলে মিথেন, প্রোপানয়েট দিলে ইথেন, বিউটানয়েট দিলে প্রোপেন!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 11.4: অসম্পৃক্ত হাইড্রোকার্বন (অ্যালকিন ও অ্যালকাইন)
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch11_4',
    chapter11.id,
    4,
    '১১.৪ অসম্পৃক্ত হাইড্রোকার্বন (অ্যালকিন ও অ্যালকাইন) (Alkenes & Alkynes)',
    'les_ssc_chemistry_ch11_4',
    {
      titleBangla: 'অ্যালকিন ও অ্যালকাইন প্রস্তুতি, ব্রোমিন পরীক্ষা, বেয়ার পরীক্ষা ও পানি সংযোজন',
      learningGoal: 'ইথানলের নির্জলাকরণ, ব্রোমিন পানি ও ক্ষারীয় KMnO₄ দ্বারা অসম্পৃক্ততা শনাক্তকরণ এবং ২০% H₂SO₄ ও ২% HgSO₄ প্রভাবকে ইথাইনে পানি সংযোজনে ইথান্যাল তৈরির মেকানিজম ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. অ্যালকিন প্রস্তুতি
1. **ইথানলের নির্জলাকরণ (Dehydration):**
   অতিরিক্ত গাঢ় সালফিউরিক এসিড সহ ইথানলকে ১৬০°–১৭০°C তাপমাত্রায় উত্তপ্ত করলে পানি অপসারিত হয়ে ইথিন তৈরি হয়:
   $$\\mathrm{CH_3-CH_2-OH \\xrightarrow{conc. H_2SO_4, 160-170^\\circ C} CH_2=CH_2 + H_2O}$$
2. **অ্যালকাইল হ্যালাইড থেকে অপনয়ন:**
   $$\\mathrm{CH_3-CH_2-Cl + KOH (alc) \\xrightarrow{\\Delta} CH_2=CH_2 + KCl + H_2O}$$

### ২. অসম্পৃক্ততার শনাক্তকারী পরীক্ষা (Tests for Unsaturation)
1. **ব্রোমিন পানি পরীক্ষা (Bromine Water Test):**
   ইথিনের সাথে লালচে বাদামি ব্রোমিন পানি যোগ করলে পাই বন্ধন ভেঙে বর্ণহীন ১,২-ডাইব্রোমোইথেন তৈরি হয়:
   $$\\mathrm{CH_2=CH_2 + Br_2 (লালচে বাদামি) \\rightarrow CH_2Br-CH_2Br (বর্ণহীন)}$$
2. **বেয়ার পরীক্ষা (Baeyer's Test):**
   ক্ষারীয় পটাসিয়াম পারম্যাঙ্গানেট ($\\mathrm{KMnO_4 + NaOH}$) দ্রবণ চালনা করলে গোলাপী/বেগুনী বর্ণ দূর হয়ে বর্ণহীন **ইথিলিন গ্লাইকল** ও বাদামি $\\mathrm{MnO_2}$ অধঃক্ষেপ পড়ে:
   $$\\mathrm{CH_2=CH_2 + [O] + H_2O \\xrightarrow{KMnO_4 + NaOH} CH_2OH-CH_2OH (ইথিলিন গ্লাইকল) + MnO_2\\downarrow}$$

### ৩. অ্যালকাইন প্রস্তুতি ও অনন্য পানি সংযোজন বিক্রিয়া
- **ক্যালসিয়াম কার্বাইড থেকে ইথাইন:**
  $$\\mathrm{CaC_2 + 2H_2O \\rightarrow CH\\equiv CH + Ca(OH)_2}$$
- **অ্যালকাইনের পানি সংযোজন (ইথান্যাল প্রস্তুতি):**
  ৮০°C তাপমাত্রায় ২০% $\\mathrm{H_2SO_4}$ এবং ২% $\\mathrm{HgSO_4}$ এর মধ্য দিয়ে ইথাইন চালনা করলে পুনর্বিন্যাসের মাধ্যমে **ইথান্যাল (অ্যাসিটালডিহাইড)** তৈরি হয়:
  $$\\mathrm{CH\\equiv CH + H_2O \\xrightarrow{20\\% H_2SO_4, 2\\% HgSO_4, 80^\\circ C} [CH_2=CH-OH] \\xrightarrow{পুনর্বিন্যাস} CH_3-CHO}$$`,
      interactiveWidgetUrl: '/uploads/interactive/hydrocarbon-functional-groups-lab.html',
      importantTerms: [
        { termBangla: 'ব্রোমিন পানি পরীক্ষা', termEnglish: 'Bromine Water Test', definition: 'দ্বিবন্ধন বা ত্রিবন্ধনের উপস্থিতিতে লালচে বাদামি Br₂ দ্রবণ বর্ণহীন হয়ে যাওয়ার মাধ্যমে অসম্পৃক্ততা প্রমাণের পরীক্ষা।' },
        { termBangla: 'বেয়ার পরীক্ষা', termEnglish: 'Baeyer\'s Test', definition: 'ক্ষারীয় KMnO₄ দ্রবণের বেগুনী বর্ণ বিনষ্ট করে ডাইঅল ও বাদামি MnO₂ অধঃক্ষেপ তৈরির জারণ পরীক্ষা।' },
        { termBangla: 'ইথিলিন গ্লাইকল', termEnglish: 'Ethylene Glycol', definition: 'ইথেন-১,২-ডাইঅল (CH₂OH–CH₂OH), যা বেয়ার পরীক্ষায় উৎপন্ন বর্ণহীন মিষ্টি স্বাদযুক্ত অ্যান্টিফ্রিজ উপাদান।' },
      ],
      workedExample: {
        problem: 'রাসায়নিক পরীক্ষার সাহায্যে কীভাবে প্রোপেন ও প্রোপিনের মধ্যে পার্থক্য করবে? (বোর্ড প্রশ্ন)',
        stepByStepSolution: '১. পরীক্ষা: ব্রোমিন পানি পরীক্ষা।\n২. প্রোপিনে লালচে বাদামি ব্রোমিন পানি যোগ করলে দ্বিবন্ধন ভেঙে বর্ণহীন ১,২-ডাইব্রোমোপ্রোপেন উৎপন্ন হয় এবং দ্রবণের লাল বর্ণ তাৎক্ষণিকভাবে দূরীভূত হয়:\nCH₃–CH=CH₂ + Br₂ ➔ CH₃–CHBr–CH₂Br (বর্ণহীন)।\n৩. অপরপক্ষে প্রোপেন সম্পৃক্ত হওয়ায় সাধারণ অবস্থায় ব্রোমিন পানির সাথে বিক্রিয়া করে না এবং লালচে বাদামি বর্ণ অপরিবর্তিত থাকে।',
      },
      memoryAid: 'অসম্পৃক্ততার দুই পরীক্ষা ছন্দ: “ব্রোমিন লাল, বেয়ার গোলাপী—অসম্পৃক্ত পেলেই ধুয়ে মুছে বর্ণহীন করে দিই!”',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 11.5: অ্যালকোহল, অ্যালডিহাইড ও জৈব এসিড
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch11_5',
    chapter11.id,
    5,
    '১১.৫ অ্যালকোহল, অ্যালডিহাইড ও জৈব এসিড (Alcohols, Aldehydes & Carboxylic Acids)',
    'les_ssc_chemistry_ch11_5',
    {
      titleBangla: 'জারণ ধারাবাহিকতা, গাঁজন, রেকটিফাইড ও মেথিলেটেড স্পিরিট, ফরমালিন ও ভিনেগার',
      learningGoal: 'অ্যালকোহল থেকে জারণের মাধ্যমে অ্যালডিহাইড ও ফ্যাটি এসিড প্রস্তুতি, ফরমালিন (৪০%) ও ভিনেগারের (৪–১০%) শতকরা মাত্রা এবং খাদ্য সংরক্ষণে ভিনেগারের ভূমিকা বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. মাস্টার জারণ শৃঙ্খল (The Oxidation Chain)
$$\\mathrm{অ্যালকোহল \\xrightarrow{[O]} অ্যালডিহাইড \\xrightarrow{[O]} কার্বক্সিলিক এসিড}$$
- জারক মিশ্রণ: পটাসিয়াম ডাইক্রোমেট ও গাঢ় সালফিউরিক এসিড ($\\mathrm{K_2Cr_2O_7 + H_2SO_4}$) যা জায়মান অক্সিজেন [O] যোগান দেয়।
  $$\\mathrm{CH_3CH_2OH + [O] \\rightarrow CH_3CHO (ইথান্যাল) + H_2O}$$
  $$\\mathrm{CH_3CHO + [O] \\rightarrow CH_3COOH (ইথানয়িক এসিড)}$$

### ২. অ্যালকোহল ও স্পিরিট
- **গাঁজন (Fermentation):** ইস্টের জাইমেজ এনজাইম দ্বারা গ্লুকোজ থেকে ইথানল তৈরি:
  $$\\mathrm{C_6H_{12}O_6 \\xrightarrow{জাইমেজ} 2C_2H_5OH + 2CO_2}$$
- **রেকটিফাইড স্পিরিট:** ৯৫.৬% ইথানল এবং ৪.৪% পানির সমস্ফুটন মিশ্রণ (স্ফুটনাঙ্ক ৭৮.১°C)।
- **মেথিলেটেড স্পিরিট:** রেকটিফাইড স্পিরিটে ৫–১০% বিষাক্ত মিথানল, পিরিডিন মিশিয়ে পানের অযোগ্য করে প্রস্তুত করা কাঠের বার্নিশ ও স্পিরিট ল্যাম্পের তরল।

### ৩. ফরমালিন (Formalin)
- মিথান্যাল বা ফরমালডিহাইডের (HCHO) **৪০% (বা ৩০%–৪০%) জলীয় দ্রবণকে** ফরমালিন বলে।
- **ব্যবহার:** গবেষণাগারে মৃত জীবদেহ ও অঙ্গ-প্রত্যঙ্গ পচনরোধে।
- **অপব্যবহার:** মাছ বা মাংসে মেশালে মানবদেহের লিভার, কিডনি নষ্ট ও ক্যান্সার হয়।

### ৪. ভিনেগার (Vinegar) ও খাদ্য সংরক্ষণ
- ইথানয়িক এসিডের **৪% থেকে ১০% জলীয় দ্রবণকে** ভিনেগার বা সিরকা বলে।
- **সংরক্ষণ কৌশল:** ভিনেগারের $\\mathrm{CH_3COOH}$ খাদ্যে হাইড্রোজেন আয়ন ($\\mathrm{H^+}$) মুক্ত করে pH মান কমায় (অম্লীয় পরিবেশ)। ফলে ব্যাক্টেরিয়ার প্রোটিন বিকৃত হয়ে মারা যায় এবং খাদ্য পচন থেকে রক্ষা পায়।`,
      interactiveWidgetUrl: '/uploads/interactive/hydrocarbon-functional-groups-lab.html',
      importantTerms: [
        { termBangla: 'ফরমালিন', termEnglish: 'Formalin', definition: 'ফরমালডিহাইডের (HCHO) ৩০% থেকে ৪০% জলীয় দ্রবণ যা জীবদেহের নমুনা সংরক্ষণে ব্যবহৃত শক্তিশালী জীবাণুনাশক।' },
        { termBangla: 'ভিনেগার', termEnglish: 'Vinegar', definition: 'ইথানয়িক এসিডের (CH₃COOH) ৪% থেকে ১০% জলীয় দ্রবণ যা খাদ্য সংরক্ষণে ব্যবহৃত হয়।' },
        { termBangla: 'রেকটিফাইড স্পিরিট', termEnglish: 'Rectified Spirit', definition: '৯৫.৬% ইথানল ও ৪.৪% পানির সমস্ফুটন মিশ্রণ যার স্ফুটনাঙ্ক ৭৮.১° সে.।' },
      ],
      workedExample: {
        problem: 'ভিনেগার কীভাবে খাদ্যদ্রব্য নষ্ট হওয়া থেকে রক্ষা করে? ব্যাখ্যা করো। (অনুধাবন প্রশ্ন)',
        stepByStepSolution: '১. ভিনেগার হলো ৪%–১০% ইথানয়িক এসিডের জলীয় দ্রবণ।\n২. খাদ্যে ভিনেগার মেশালে এটি বিয়োজিত হয়ে H⁺ আয়ন মুক্ত করে খাদ্যের pH মান দ্রুত ৪.৫ এর নিচে নামিয়ে আনে।\n৩. এই অম্লীয় পরিবেশে ক্ষতিকর ব্যাকটেরিয়া ও ছত্রাকের এনজাইম বিকৃত হয়ে ধ্বংস হয়ে যায়, ফলে ব্যাকটেরিয়া বংশবৃদ্ধি করতে পারে না এবং খাদ্য দীর্ঘদিন ভালো থাকে।',
      },
      memoryAid: 'শতকরা অনুপাতের ছন্দ: “ভিনেগার চার থেকে দশ (৪-১০%), ফরমালিন চল্লিশে বস (৪০%), আর রেকটিফাইড পঁচানব্বই পয়েন্ট ছয় (৯৫.৬%)!”',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 11.6: পলিমারকরণ বিক্রিয়া ও প্লাস্টিক দূষণ
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch11_6',
    chapter11.id,
    6,
    '১১.৬ পলিমারকরণ বিক্রিয়া ও প্লাস্টিক দূষণ (Polymerization & Plastic Hazards)',
    'les_ssc_chemistry_ch11_6',
    {
      titleBangla: 'সংযোজন ও ঘনীভবন পলিমার (পলিথিন, পিভিসি, টেফলন, নাইলন ৬:৬), প্লাস্টিক দূষণ ও ৩R নীতি',
      learningGoal: 'সংযোজন ও ঘনীভবন পলিমারকরণের পার্থক্য, পলিথিন, পিভিসি, টেফলন ও নাইলন ৬:৬ প্রস্তুতি, প্লাস্টিকের অপচনশীলতা ও ৩R নীতিসহ সবুজ বিকল্প মূল্যায়ন করতে পারবে।',
      explanation: `### ১. পলিমারকরণের প্রকারভেদ
1. **সংযোজন পলিমারকরণ (Addition Polymerization):**
   কোনো ক্ষুদ্র অণু অপসারিত না হয়ে শুধুমাত্র দ্বিবন্ধন খুলে মনোমারগুলো সরাসরি যুক্ত হয়।
   - **পলিথিন:** $n\\,\\mathrm{CH_2=CH_2} \\xrightarrow{1000\\text{ atm}, 200^\\circ C, O_2} -[\\mathrm{CH_2-CH_2}]_n-$
   - **পলিপ্রোপিন:** $n\\,\\mathrm{CH_2=CH(CH_3)} \\xrightarrow{140\\text{ atm}, 120^\\circ C, TiCl_4} -[\\mathrm{CH_2-CH(CH_3)}]_n-$
   - **পিভিসি (PVC):** $n\\,\\mathrm{CH_2=CHCl} \\xrightarrow{পারঅক্সাইড} -[\\mathrm{CH_2-CHCl}]_n-$ (পানির পাইপ, তারের কভার)
   - **টেফলন (PTFE):** $n\\,\\mathrm{CF_2=CF_2} \\xrightarrow{চাপ, প্রভাবক} -[\\mathrm{CF_2-CF_2}]_n-$ (নন-স্টিক ফ্রাইপ্যান কোটিং)

2. **ঘনীভবন পলিমারকরণ (Condensation Polymerization):**
   মনোমারগুলো যুক্ত হওয়ার সময় ক্ষুদ্র অণু (যেমন $\\mathrm{H_2O}$) অপসারিত হয়।
   - **নাইলন ৬:৬:** এডিপিক এসিড ও হেক্সামিথিলিন ডাইঅ্যামিনের ঘনীভবনে পানি মুক্ত করে উৎপন্ন হয়:
   $$n\\,\\mathrm{HOOC(CH_2)_4COOH} + n\\,\\mathrm{H_2N(CH_2)_6NH_2} \\rightarrow -[\\mathrm{CO(CH_2)_4CONH(CH_2)_6NH}]_n- + 2n\\,\\mathrm{H_2O}$$
   *(উভয় মনোমারেই ৬টি করে কার্বন থাকায় নাম নাইলন ৬:৬)*

### ২. প্লাস্টিক ও পরিবেশ দূষণ
- **অপচনশীলতা:** প্রকৃতির ব্যাকটেরিয়া বা অণুজীবের কাছে প্লাস্টিকের কৃত্রিম পলিমার শৃঙ্খল ভাঙার উপযোগী কোনো এনজাইম নেই।
- **জলাবদ্ধতা:** ড্রেন ও নর্দমায় আটকে পানি নিষ্কাশন বন্ধ করে দেয়।
- **বিষাক্ত গ্যাস:** প্লাস্টিক বর্জ্য আগুনে পোড়ালে বিষাক্ত **ডাইঅক্সিন (Dioxin), হাইড্রোজেন সায়ানাইড (HCN)** ও কার্বন মনোক্সাইড নির্গত হয় যা মানবদেহে ক্যান্সার সৃষ্টি করে।

### ৩. সমাধান: ৩R নীতি ও সবুজ ভবিষ্যৎ
- **৩R নীতি:** Reduce (ব্যবহার কমানো) ➔ Reuse (পুনঃব্যবহার) ➔ Recycle (পুনর্ব্যবহার)।
- **বায়োপ্লাস্টিক (Biodegradable Plastics):** ভুট্টার স্টার্চ বা উদ্ভিদজাত সেলুলোজ থেকে তৈরি প্লাস্টিক যা প্রাকৃতিকভাবে কয়েক মাসের মধ্যে মাটিতে পচে মিশে যায়। বাংলাদেশের বিজ্ঞানীদের উদ্ভাবিত পাটজাত **সোনালী ব্যাগ** এর অন্যতম উৎকৃষ্ট উদাহরণ।`,
      interactiveWidgetUrl: '/uploads/interactive/hydrocarbon-functional-groups-lab.html',
      importantTerms: [
        { termBangla: 'সংযোজন বনাম ঘনীভবন পলিমার', termEnglish: 'Addition vs Condensation', definition: 'ক্ষুদ্র অণু অপসারিত না হয়ে যুক্ত হলে সংযোজন; আর পানি বা ক্ষুদ্র অণু অপসারিত হয়ে অ্যামাইড/এস্টার বন্ধন গড়লে ঘনীভবন।' },
        { termBangla: 'পিভিসি ও টেফলন', termEnglish: 'PVC & Teflon', definition: 'পিভিসি তৈরি হয় ভিনাইল ক্লোরাইড থেকে (পাইপ ও তারের নিরোধক); আর টেফলন তৈরি হয় টেট্রাফ্লুরোইথিন থেকে (নন-স্টিক প্যান)।' },
        { termBangla: '৩R নীতি ও বায়োপ্লাস্টিক', termEnglish: '3R & Biodegradable Plastic', definition: 'Reduce, Reuse, Recycle নীতি এবং উদ্ভিজ্জ স্টার্চজাত পচনশীল প্লাস্টিক যা পরিবেশকে প্লাস্টিক বর্জ্য থেকে রক্ষা করে।' },
      ],
      workedExample: {
        problem: 'পলিথিন এবং নাইলন ৬:৬-এর পলিমারকরণ বিক্রিয়ার মূল বৈসাদৃশ্য ব্যাখ্যা করো। (অনুধাবন প্রশ্ন)',
        stepByStepSolution: '১. পলিথিন তৈরিতে বহুসংখ্যক ইথিন মনোমারের দ্বিবন্ধন ভেঙে সরাসরি পরস্পরের সাথে যুক্ত হয়, কোনো ক্ষুদ্র অণু অপসারিত হয় না—এটি সংযোজন পলিমার।\n২. নাইলন ৬:৬ তৈরিতে এডিপিক এসিড ও হেক্সামিথিলিন ডাইঅ্যামিনের সংযোগস্থলে অ্যামাইড বন্ধন (-CONH-) গঠনের সময় ক্ষুদ্র পানির অণু (H₂O) মুক্ত হয়—এটি ঘনীভবন পলিমার।',
      },
      memoryAid: 'পলিমার ছন্দ: “সংযোজনে কিছু হারায় না ভাই, ঘনীভবনে পানি ঝরে যায়!” আর নাইলন ৬:৬ মানেই “ছয় কার্বনের এসিড + ছয় কার্বনের অ্যামিন”!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Upsert All 72 Verified Questions
  // -------------------------------------------------------------------------
  console.log(`📦 Upserting ${chemistryChapter11AllQuestions.length} SSC Chemistry Chapter 11 questions...`);

  for (const q of chemistryChapter11AllQuestions) {
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
    'top_ssc_chemistry_ch11_1',
    'top_ssc_chemistry_ch11_2',
    'top_ssc_chemistry_ch11_3',
    'top_ssc_chemistry_ch11_4',
    'top_ssc_chemistry_ch11_5',
    'top_ssc_chemistry_ch11_6',
  ];

  await prisma.lesson.deleteMany({
    where: {
      topic: { chapterId: chapter11.id },
      topicId: { notIn: activeTopicIds },
    },
  });

  await prisma.topic.deleteMany({
    where: {
      chapterId: chapter11.id,
      id: { notIn: activeTopicIds },
    },
  });

  console.log(`✅ SSC Chemistry Chapter 11 seeded (${chemistryChapter11AllQuestions.length} verified questions).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedChemistryChapter11(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Chemistry Chapter 11 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
