import { PrismaClient, ContentStatus } from '@prisma/client';
import { chemistryChapter7QuestionsBatch1 } from './seed-chemistry-chapter-7-questions';
import { chemistryChapter7QuestionsBatch2 } from './seed-chemistry-chapter-7-questions-batch2';
import { chemistryChapter7QuestionsBatch3 } from './seed-chemistry-chapter-7-questions-batch3';

export const sscChemistrySubject = {
  id: 'sub_ssc_chemistry',
  code: 'ssc_chemistry',
  nameBangla: 'রসায়ন',
  classLevel: 'CLASS_9_10',
  program: 'SSC',
  syllabusYear: 2026,
  isReady: true,
};

export const chemistryChapter7AllQuestions = [
  ...chemistryChapter7QuestionsBatch1,
  ...chemistryChapter7QuestionsBatch2,
  ...chemistryChapter7QuestionsBatch3,
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

export async function seedChemistryChapter7(prisma: PrismaClient) {
  console.log('⚗️ Seeding SSC Chemistry Chapter 7 (রাসায়নিক বিক্রিয়া / Chemical Reactions)...');

  await prisma.subject.upsert({
    where: { code: sscChemistrySubject.code },
    update: sscChemistrySubject,
    create: sscChemistrySubject,
  });

  const chapter7 = await prisma.chapter.upsert({
    where: { id: 'chap_ssc_chemistry_ch7' },
    update: {
      subjectId: sscChemistrySubject.id,
      orderIndex: 7,
      titleBangla: 'সপ্তম অধ্যায়: রাসায়নিক বিক্রিয়া (Chemical Reactions)',
    },
    create: {
      id: 'chap_ssc_chemistry_ch7',
      subjectId: sscChemistrySubject.id,
      orderIndex: 7,
      titleBangla: 'সপ্তম অধ্যায়: রাসায়নিক বিক্রিয়া (Chemical Reactions)',
    },
  });

  const widgetUrl = '/uploads/interactive/chemical-reactions-redox-lab.html';

  // -------------------------------------------------------------------------
  // Topic 7.1: পদার্থের ভৌত ও রাসায়নিক পরিবর্তন
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch7_1',
    chapter7.id,
    1,
    '৭.১ পদার্থের ভৌত ও রাসায়নিক পরিবর্তন (Physical & Chemical Change)',
    'les_ssc_chemistry_ch7_1',
    {
      titleBangla: 'পদার্থের ভৌত ও রাসায়নিক পরিবর্তন, মোমবাতির ৩ অবস্থা ও মরিচা',
      learningGoal: 'ভৌত ও রাসায়নিক পরিবর্তনের পার্থক্য আণবিক গঠনের ভিত্তিতে ব্যাখ্যা করতে পারবে, মোমবাতির জ্বলনে কীভাবে উভয় পরিবর্তন যুগপৎ ঘটে তা বিশ্লেষণ করতে পারবে এবং মরিচা গঠনের সমীকরণ ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. ভৌত পরিবর্তন (Physical Change)
যে পরিবর্তনে পদার্থের বাহ্যিক আকার, আকৃতি বা ভৌত অবস্থার পরিবর্তন ঘটে কিন্তু পদার্থের অভ্যন্তরীণ **আণবিক গঠন ও রাসায়নিক ধর্মের কোনো রূপ পরিবর্তন হয় না**, তাকে ভৌত পরিবর্তন বলে।
- **পানির রূপান্তর:** বরফ ($H_2O (s)$) $\\xrightarrow{\\text{তাপ}}$ পানি ($H_2O (l)$) $\\xrightarrow{\\text{তাপ}}$ জলীয় বাষ্প ($H_2O (g)$)। তিন অবস্থাতেই অণুর গাঠনিক সংকেত $H_2O$ অবিকৃত থাকে।

### ২. রাসায়নিক পরিবর্তন (Chemical Change)
যে পরিবর্তনের ফলে মূল পদার্থ তার নিজস্ব সত্ত্বা ও ধর্ম সম্পূর্ণরূপে হারিয়ে সম্পূর্ণ **ভিন্ন ধর্মবিশিষ্ট এক বা একাধিক নতুন পদার্থে** পরিণত হয়, তাকে রাসায়নিক পরিবর্তন বলে।
- **লোহায় মরিচা ধরা:** $4Fe + 3O_2 + 2nH_2O \\longrightarrow 2(Fe_2O_3\\cdot nH_2O)$ (জলযোজিত ফেরিক অক্সাইড)।
- **মোমবাতির জ্বলন (যুগপৎ পরিবর্তন):**
  - মোমের গলন একটি **ভৌত পরিবর্তন** (কঠিন থেকে তরল হয়ে নিচে জমে আবার কঠিন মোম হয়)।
  - মোমের বাষ্পের সাথে বাতাসের অক্সিজেনের দহনে $CO_2$, $H_2O$ ও আলো-তাপ সৃষ্টি হওয়া একটি **রাসায়নিক পরিবর্তন**।`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'ভৌত পরিবর্তন', termEnglish: 'Physical Change', definition: 'পদার্থের অভ্যন্তরীণ আণবিক সংকেত অবিকৃত রেখে কেবল বাহ্যিক ভৌত অবস্থার পরিবর্তন।' },
        { termBangla: 'রাসায়নিক পরিবর্তন', termEnglish: 'Chemical Change', definition: 'পুরাতন বন্ধন ভেঙে সম্পূর্ণ নতুন রাসায়নিক বন্ধন ও ধর্মের পদার্থ সৃষ্টি হওয়া।' },
        { termBangla: 'মরিচা', termEnglish: 'Rust', definition: 'আর্দ্র বাতাসে লোহার ওপর গঠিত জলযোজিত ফেরিক অক্সাইড ($Fe_2O_3\\cdot nH_2O$)।' },
      ],
      workedExample: {
        problem: 'চিনির পানিতে দ্রবণ এবং চিনিকে চামচে নিয়ে অতিরিক্ত উত্তপ্ত করা — কোন প্রক্রিয়াটি কোন পরিবর্তন এবং কেন?',
        stepByStepSolution: '১. পানিতে চিনি দ্রবীভূত করলে চিনির অণু ($C_{12}H_{22}O_{11}$) অক্ষত থাকে এবং পানি বাষ্পীভূত করলে অবিকল চিনি ফেরত পাওয়া যায়, তাই এটি ভৌত পরিবর্তন।\n২. চিনিকে তীব্র উত্তপ্ত করলে পানি বিশ্লিষ্ট হয়ে বাষ্পে পরিণত হয় এবং কালো কার্বন ($C$) অবশেষ হিসেবে পড়ে থাকে ($C_{12}H_{22}O_{11} \\rightarrow 12C + 11H_2O$), যা একটি স্থায়ী রাসায়নিক পরিবর্তন।',
      },
      memoryAid: '“আকার বদলায় ধর্ম না — ভৌত সেতো ভুল না; বন্ধন ভেঙে নতুন গড়ন — সেটাই জেনো রসায়ন!”',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 7.2: রাসায়নিক বিক্রিয়ার শ্রেণিবিভাগ
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch7_2',
    chapter7.id,
    2,
    '৭.২ রাসায়নিক বিক্রিয়ার শ্রেণিবিভাগ (সংযোজন, বিয়োজন, প্রতিস্থাপন, দহন)',
    'les_ssc_chemistry_ch7_2',
    {
      titleBangla: 'দিকের ভিত্তিতে একমুখী-উভমুখী এবং সংযোজন, সংশ্লেষণ, বিয়োজন ও প্রতিস্থাপন বিক্রিয়া',
      learningGoal: 'একমুখী ও উভমুখী বিক্রিয়ার শর্ত, সংযোজন ও সংশ্লেষণের মধ্যকার সূক্ষ্ম পার্থক্য, বিয়োজন ও বিশ্লেষণ তুলনা এবং ধাতুর সক্রিয়তার ভিত্তিতে প্রতিস্থাপন বিক্রিয়া ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. দিকের ভিত্তিতে বিক্রিয়া
- **একমুখী বিক্রিয়া (Irreversible):** বিক্রিয়ক কেবল উৎপাদে পরিণত হয় ($CaCO_3(s) \\xrightarrow{\\Delta} CaO(s) + CO_2(g)\\uparrow$, খোলা পাত্রে)।
- **উভমুখী বিক্রিয়া (Reversible):** সম্মুখমুখী ও পশ্চাৎমুখী উভয় বিক্রিয়াই একই সাথে ঘটে ($N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)$)।

### ২. বিক্রিয়ার মৌলিক প্রকারভেদ
- **সংযোজন বনাম সংশ্লেষণ:**
  - সংযোজন: একাধিক পদার্থ যুক্ত হয়ে একটি উৎপাদ ($FeCl_2 + Cl_2 \\rightarrow 2FeCl_3$)।
  - সংশ্লেষণ: যদি সকল বিক্রিয়কই **মৌলিক পদার্থ** হয় ($2H_2 + O_2 \\rightarrow 2H_2O$)।
  - *“সকল সংশ্লেষণই সংযোজন, কিন্তু সকল সংযোজন সংশ্লেষণ নয়।”*
- **বিয়োজন বনাম বিশ্লেষণ:**
  - বিয়োজন: একটি যৌগ ভেঙে একাধিক মৌল বা যৌগ তৈরি হওয়া ($CaCO_3 \\rightarrow CaO + CO_2$)।
  - বিশ্লেষণ: যৌগ ভেঙে কেবল **মৌলিক পদার্থে** পরিণত হওয়া ($2H_2O \\xrightarrow{\\text{তড়িৎ}} 2H_2 + O_2$)।
- **প্রতিস্থাপন বিক্রিয়া (Displacement):** অধিক সক্রিয় মৌল কম সক্রিয় মৌলকে সরিয়ে দেয় ($Zn + CuSO_4 \\rightarrow ZnSO_4 + Cu\\downarrow$)।
- **দহন বিক্রিয়া (Combustion):** অক্সিজেনের উপস্থিতিতে পুড়িয়ে উপাদানের অক্সাইড ও তাপ-আলো উৎপন্ন করা ($CH_4 + 2O_2 \\rightarrow CO_2 + 2H_2O + \\text{তাপ}$)।`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'সংশ্লেষণ বিক্রিয়া', termEnglish: 'Synthesis Reaction', definition: 'যে সংযোজন বিক্রিয়ায় কেবল মৌলিক পদার্থসমূহ পরস্পরের সাথে যুক্ত হয়ে যৌগ গঠন করে।' },
        { termBangla: 'প্রতিস্থাপন বিক্রিয়া', termEnglish: 'Displacement Reaction', definition: 'অধিক সক্রিয় কোনো মৌল যৌগ থেকে কম সক্রিয় মৌলকে স্থানচ্যুত করে নতুন যৌগ তৈরির বিক্রিয়া।' },
        { termBangla: 'দহন বিক্রিয়া', termEnglish: 'Combustion Reaction', definition: 'বাতাসের অক্সিজেনে কোনো মৌল বা যৌগকে পুড়িয়ে তার অক্সাইড ও তাপশক্তি উৎপাদনের প্রক্রিয়া।' },
      ],
      workedExample: {
        problem: 'কপার ধাতুর তৈরি পাত্রে জিংক সালফেট দ্রবণ রাখা যাবে কি না ব্যাখ্যা করো।',
        stepByStepSolution: 'তড়িৎ রাসায়নিক সক্রিয়তা সারি অনুযায়ী জিংক ($Zn$) কপার ($Cu$) অপেক্ষা অধিক সক্রিয় ($Zn > Cu$)। কপার কম সক্রিয় ধাতু হওয়ায় $ZnSO_4$ দ্রবণ থেকে জিংককে স্থানচ্যুত করতে পারে না ($Cu + ZnSO_4 \\rightarrow \\text{No Reaction}$)। ফলে কোনো রাসায়নিক বিক্রিয়া ঘটে না এবং কপার পাত্র অক্ষত থাকে। তাই নিরাপদে সংরক্ষণ করা যাবে।',
      },
      memoryAid: '“মৌল মৌল মিললে তবেই সংশ্লেষণ কয়, যৌগ থাকলে সংযোজন — সংশ্লেষণ নয়!”',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 7.3: জারণ-বিজারণ (Redox) বিক্রিয়া ও ইলেকট্রন স্থানান্তর
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch7_3',
    chapter7.id,
    3,
    '৭.৩ জারণ-বিজারণ (Redox) বিক্রিয়া ও ইলেকট্রন স্থানান্তর',
    'les_ssc_chemistry_ch7_3',
    {
      titleBangla: 'ইলেকট্রনীয় মতবাদে জারণ-বিজারণ, জারক-বিজারক, যুগপৎ সংঘটন ও নন-রেডক্স বিক্রিয়া',
      learningGoal: 'ইলেকট্রন স্থানান্তর মতবাদে জারণ ও বিজারণ সংজ্ঞায়িত করা, জারক ও বিজারক চিহ্নিত করা, জারণ ও বিজারণ যুগপৎ ঘটে তা সমীকরণ দিয়ে প্রমাণ করা এবং নন-রেডক্স বিক্রিয়াগুলো ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. ইলেকট্রনীয় মতবাদে জারণ ও বিজারণ
- **জারণ (Oxidation):** পরমাণু বা আয়ন কর্তৃক ইলেকট্রন বর্জন ($Na \\rightarrow Na^+ + e^-$)।
- **বিজারণ (Reduction):** পরমাণু বা আয়ন কর্তৃক ইলেকট্রন গ্রহণ ($Cl + e^- \\rightarrow Cl^-$)।
- **জারক (Oxidizing Agent):** যে অন্যকে জারিত করে ও নিজে ইলেকট্রন গ্রহণ করে বিজারিত হয় ($Cl_2, O_2, KMnO_4$)।
- **বিজারক (Reducing Agent):** যে অন্যকে বিজারিত করে ও নিজে ইলেকট্রন ত্যাগ করে জারিত হয় ($Na, Zn, C, H_2$)।

### ২. জারণ-বিজারণ যুগপৎ ঘটে
ইলেকট্রন ত্যাগকারী ছাড়া ইলেকট্রন গ্রহণকারী থাকতে পারে না।
- $Zn + Cu^{2+} \\longrightarrow Zn^{2+} + Cu$
  - জারণ অর্ধ-বিক্রিয়া: $Zn \\longrightarrow Zn^{2+} + 2e^-$ (বিজারক $Zn$)
  - বিজারণ অর্ধ-বিক্রিয়া: $Cu^{2+} + 2e^- \\longrightarrow Cu$ (জারক $Cu^{2+}$)

### ৩. নন-রেডক্স বিক্রিয়াসমূহ
- **প্রশমন বিক্রিয়া:** এসিড + ক্ষার → লবণ + পানি ($H^+ + OH^- \\rightarrow H_2O$)
- **অধঃক্ষেপণ বিক্রিয়া:** $AgNO_3 + NaCl \\rightarrow AgCl(s)\\downarrow + NaNO_3$
- **আর্দ্রবিশ্লেষণ (Hydrolysis):** $SiCl_4 + 4H_2O \\rightarrow Si(OH)_4 + 4HCl$
- **পানিযোজন (Hydration):** $CuSO_4 + 5H_2O \\rightarrow CuSO_4\\cdot 5H_2O$`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'জারণ', termEnglish: 'Oxidation', definition: 'ইলেকট্রন বর্জনের প্রক্রিয়া যার ফলে সংশ্লিষ্ট কণার জারণ সংখ্যা বৃদ্ধি পায়।' },
        { termBangla: 'বিজারণ', termEnglish: 'Reduction', definition: 'ইলেকট্রন গ্রহণের প্রক্রিয়া যার ফলে সংশ্লিষ্ট কণার জারণ সংখ্যা হ্রাস পায়।' },
        { termBangla: 'নন-রেডক্স বিক্রিয়া', termEnglish: 'Non-Redox Reaction', definition: 'যে রাসায়নিক বিক্রিয়ায় কোনো পরমাণুর ইলেকট্রন স্থানান্তর বা জারণ সংখ্যার পরিবর্তন ঘটে না।' },
      ],
      workedExample: {
        problem: '$2FeCl_2 + Cl_2 \\rightarrow 2FeCl_3$ বিক্রিয়াটিতে জারক ও বিজারক শনাক্ত করো।',
        stepByStepSolution: 'বিক্রিয়ায় $Fe^{2+}$ এর জারণ সংখ্যা $+২$ থেকে $+৩$-এ বৃদ্ধি পেয়েছে ($Fe^{2+} \\rightarrow Fe^{3+} + e^-$), অর্থাৎ $FeCl_2$ ইলেকট্রন বর্জন করে জারিত হয়েছে। তাই $FeCl_2$ হলো বিজারক।\nঅপরদিকে ক্লোরিনের জারণ সংখ্যা $০$ থেকে $-১$-এ হ্রাস পেয়েছে ($Cl_2 + 2e^- \\rightarrow 2Cl^-$), অর্থাৎ $Cl_2$ ইলেকট্রন গ্রহণ করে বিজারিত হয়েছে। তাই $Cl_2$ হলো জারক।',
      },
      memoryAid: '“LEO the lion says GER: Lose Electrons = Oxidation, Gain Electrons = Reduction!”',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 7.4: জারণ সংখ্যা নির্ণয়ের নিয়মাবলি
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch7_4',
    chapter7.id,
    4,
    '৭.৪ জারণ সংখ্যা নির্ণয়ের নিয়মাবলি (Rules for Oxidation Numbers)',
    'les_ssc_chemistry_ch7_4',
    {
      titleBangla: 'যোজনী ও জারণ সংখ্যার পার্থক্য, মূল ৮টি নিয়ম, ব্যতিক্রম ও কেন্দ্রীয় পরমাণুর জারণ সংখ্যা',
      learningGoal: 'যোজনী ও জারণ সংখ্যার পার্থক্য নিরূপণ, জারণ সংখ্যা গণনার নিয়মাবলি প্রয়োগ এবং জটিল যৌগ ও মূলকের কেন্দ্রীয় পরমাণুর জারণ সংখ্যা গণনা করতে পারবে।',
      explanation: `### ১. যোজনী বনাম জারণ সংখ্যা
- **যোজনী:** পরমাণুর সংযোগ সামর্থ্য; সর্বদা ধনাত্মক/ঋণাত্মক চিহ্নহীন পূর্ণসংখ্যা (১, ২, ৩...)।
- **জারণ সংখ্যা:** যৌগ গঠনের সময় সৃষ্ট প্রকৃত বা আপাত আধান; অবশ্যই চিহ্নযুক্ত ($+$ বা $-$), শূন্য বা ভগ্নাংশ হতে পারে।

### ২. জারণ সংখ্যা গণনার মূল নিয়মাবলি
১. মুক্ত মৌলের জারণ সংখ্যা সর্বদা **০** ($Na^0, O_2^0, P_4^0, S_8^0$)
২. নিরপেক্ষ যৌগে সকল পরমাণুর মোট জারণ সংখ্যার যোগফল **০**
৩. আধানযুক্ত আয়নে মোট জারণ সংখ্যা তার **চার্জের সমান** ($SO_4^{2-} = -2, NH_4^+ = +1$)
৪. ক্ষার ধাতু (গ্রুপ ১) সর্বদাই **$+1$**, মৃৎক্ষার ধাতু (গ্রুপ ২) সর্বদাই **$+2$**
৫. ধাতব হ্যালাইডে হ্যালোজেন সর্বদা **$-1$**
৬. হাইড্রোজেন সাধারণত **$+1$**, তবে ধাতব হাইড্রাইডে ($NaH, CaH_2$) **$-1$**
৭. অক্সিজেন সাধারণত **$-2$**; পারঅক্সাইডে ($H_2O_2$) **$-1$**; সুপারঅক্সাইডে ($KO_2$) **$-\\frac{1}{2}$**; এবং $OF_2$-তে **$+2$**!`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'জারণ সংখ্যা', termEnglish: 'Oxidation Number', definition: 'যৌগ গঠনের সময় কোনো মৌলের পরমাণু যতগুলো ইলেকট্রন বর্জন বা গ্রহণ করে তার চিহ্নযুক্ত সংখ্যা।' },
        { termBangla: 'পারঅক্সাইড', termEnglish: 'Peroxide', definition: 'যে যৌগে অক্সিজেন-অক্সিজেন একক বন্ধন থাকে এবং অক্সিজেনের জারণ সংখ্যা -১ হয়।' },
        { termBangla: 'সুপারঅক্সাইড', termEnglish: 'Superoxide', definition: 'যে যৌগে অক্সিজেনের জারণ সংখ্যা ভগ্নাংশ (-½) হয় (যেমন $KO_2$)।' },
      ],
      workedExample: {
        problem: '$K_2Cr_2O_7$ যৌগে ক্রোমিয়াম ($Cr$)-এর জারণ সংখ্যা নির্ণয় করো।',
        stepByStepSolution: 'ধরি, $Cr$-এর জারণ সংখ্যা $= x$।\nআমরা জানি, $K = +1$ এবং $O = -2$।\nনিরপেক্ষ যৌগে মোট জারণ সংখ্যা শূন্য:\n$(+1) \\times 2 + (x \\times 2) + (-2) \\times 7 = 0$\n$\\implies 2 + 2x - 14 = 0$\n$\\implies 2x - 12 = 0 \\implies 2x = +12 \\implies x = +6$\nউত্তর: $K_2Cr_2O_7$-এ প্রতিটি ক্রোমিয়ামের জারণ সংখ্যা $+6$।',
      },
      memoryAid: '“চিহ্ন ছাড়া লিখলে মান, জারণ সংখ্যা শূন্য সমান!” (সবসময় চিহ্নসহ লিখতে হবে: +৭ বা -২)।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 7.5: তাপ পরিবর্তনের ভিত্তিতে রাসায়নিক বিক্রিয়া
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch7_5',
    chapter7.id,
    5,
    '৭.৫ তাপ পরিবর্তনের ভিত্তিতে বিক্রিয়া (তাপউৎপাদী ও তাপহারী)',
    'les_ssc_chemistry_ch7_5',
    {
      titleBangla: 'তাপউৎপাদী ও তাপহারী বিক্রিয়া, এনথালপি পরিবর্তন এবং বন্ধন শক্তির হিসাব',
      learningGoal: 'তাপউৎপাদী ও তাপহারী বিক্রিয়ার ভৌত তাৎপর্য, $\\Delta H$ এর ধনাত্মক ও ঋণাত্মক চিহ্নের অর্থ এবং বন্ধন ভাঙা ও গড়ার শক্তির ভিত্তিতে $\\Delta H = B_1 - B_2$ গণনা করতে পারবে।',
      explanation: `### ১. তাপউৎপাদী বিক্রিয়া (Exothermic Reaction)
যে বিক্রিয়ায় তাপশক্তি উৎপন্ন হয়ে পরিবেশে ছড়িয়ে পড়ে এবং বিক্রিয়া পাত্রের তাপমাত্রা বাড়ে।
- এনথালপির পরিবর্তন **$\\Delta H$ ঋণাত্মক ($-$)**।
- **অ্যামোনিয়া তৈরি:** $N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g); \\Delta H = -92 \\text{ kJ/mol}$
- **চুনে পানি যোগ:** $CaO(s) + H_2O(l) \\longrightarrow Ca(OH)_2(aq); \\Delta H = -65.2 \\text{ kJ/mol}$

### ২. তাপহারী বিক্রিয়া (Endothermic Reaction)
যে বিক্রিয়ায় চারপাশের পরিবেশ থেকে তাপ শোষিত হয় এবং পাত্র ঠান্ডা অনুভূত হয়।
- এনথালপির পরিবর্তন **$\\Delta H$ ধনাত্মক ($+$)**।
- **নাইট্রিক অক্সাইড তৈরি:** $N_2(g) + O_2(g) \\rightleftharpoons 2NO(g); \\Delta H = +180 \\text{ kJ/mol}$
- **চুনাপাথর বিয়োজন:** $CaCO_3(s) \\longrightarrow CaO(s) + CO_2(g); \\Delta H = +176 \\text{ kJ/mol}$

### ৩. বন্ধন শক্তি ও এনথালপি পরিবর্তন
- বন্ধন ভাঙতে তাপ **শোষিত** হয় ($B_1$)।
- বন্ধন গড়তে তাপ **বিমুক্ত বা নির্গত** হয় ($B_2$)।
$$\\Delta H = \\Sigma B_1 - \\Sigma B_2$$
- $B_2 > B_1$ হলে $\\Delta H < 0$ (তাপউৎপাদী)
- $B_1 > B_2$ হলে $\\Delta H > 0$ (তাপহারী)`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'বিক্রিয়ার তাপ / এনথালপি পরিবর্তন', termEnglish: 'Enthalpy Change (ΔH)', definition: 'স্থির চাপে কোনো রাসায়নিক বিক্রিয়ায় শোষিত বা নির্গত তাপশক্তির মোট পরিবর্তন।' },
        { termBangla: 'বন্ধন শক্তি', termEnglish: 'Bond Energy', definition: 'এক মোল গ্যাসীয় অণুর নির্দিষ্ট বন্ধন ভেঙে পরমাণুতে পরিণত করতে প্রয়োজনীয় শক্তি।' },
        { termBangla: 'অনুকূল তাপমাত্রা', termEnglish: 'Optimum Temperature', definition: 'যে তাপমাত্রায় উভমুখী বিক্রিয়ায় সন্তোষজনক দ্রুতি ও সর্বোচ্চ উৎপাদ বজায় থাকে।' },
      ],
      workedExample: {
        problem: 'একটি বিক্রিয়ায় পুরাতন বন্ধন ভাঙার শক্তি ২৫০০ kJ এবং নতুন বন্ধন গড়ার শক্তি ২৯৫০ kJ হলে $\\Delta H$ কত এবং এটি কী ধরনের বিক্রিয়া?',
        stepByStepSolution: 'দেওয়া আছে, $B_1 = 2500 \\text{ kJ}$ এবং $B_2 = 2950 \\text{ kJ}$।\nআমরা জানি, $\\Delta H = B_1 - B_2 = 2500 - 2950 = -450 \\text{ kJ}$।\nযেহেতু $\\Delta H$ ঋণাত্মক, তাই বিক্রিয়াটি তাপউৎপাদী।',
      },
      memoryAid: '“ভাঙতে তাপ লাগে (শোষণ), গড়তে তাপ ছাড়ে (নির্গমন)!”',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 7.6: রাসায়নিক সাম্যাবস্থা ও লা-শাতেলিয়ার নীতি
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch7_6',
    chapter7.id,
    6,
    '৭.৬ রাসায়নিক সাম্যাবস্থা ও লা-শাতেলিয়ার নীতি (Equilibrium & Le Chatelier)',
    'les_ssc_chemistry_ch7_6',
    {
      titleBangla: 'উভমুখী বিক্রিয়ায় সাম্যাবস্থার গতিশীল প্রকৃতি, লা-শাতেলিয়ার নীতি ও শিল্পক্ষেত্রে প্রয়োগ',
      learningGoal: 'রাসায়নিক সাম্যাবস্থার গতিশীল রূপ ($r_f = r_b$), লা-শাতেলিয়ার নীতি এবং সাম্যাবস্থায় তাপমাত্রা, চাপ ও ঘনমাত্রার প্রভাব বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. রাসায়নিক সাম্যাবস্থা (Chemical Equilibrium)
উভমুখী বিক্রিয়ায় যে অবস্থায় **সম্মুখমুখী বিক্রিয়ার গতিবেগ ($r_f$) এবং পশ্চাৎমুখী বিক্রিয়ার গতিবেগ ($r_b$) সমান** হয়ে যায়, তাকে রাসায়নিক সাম্যাবস্থা বলে। এটি একটি সম্পূর্ণ **গতিশীল (Dynamic)** অবস্থা—বিক্রিয়া কখনোই থেমে থাকে না।

### ২. লা-শাতেলিয়ার নীতি (Le Chatelier\'s Principle)
“কোনো উভমুখী বিক্রিয়ার সাম্যাবস্থায় কোনো একটি নিয়ামক (তাপমাত্রা, চাপ বা ঘনমাত্রা) পরিবর্তন করলে সাম্যের অবস্থান এমনভাবে পরিবর্তিত হয় যাতে নিয়ামকের পরিবর্তনের ফলাফল **প্রশমিত** হয়।”

- **তাপমাত্রার প্রভাব:**
  - তাপউৎপাদী বিক্রিয়ায়: তাপমাত্রা বাড়ালে সাম্য বামে সরে উৎপাদ কমে; তাপমাত্রা কমালে সাম্য ডানে সরে উৎপাদ বাড়ে।
  - তাপহারী বিক্রিয়ায়: তাপমাত্রা বাড়ালে সাম্য ডানে সরে উৎপাদ বাড়ে।
- **চাপের প্রভাব (গ্যাসীয় বিক্রিয়া):**
  - চাপ বাড়ালে সাম্য কম মোল সংখ্যার দিকে সরে।
  - যদি $\\Delta n = 0$ হয় (উভয় পাশে গ্যাসীয় মোল সংখ্যা সমান), তবে **চাপের কোনো প্রভাব থাকে না** (যেমন: $H_2 + I_2 \\rightleftharpoons 2HI$)।
- **ঘনমাত্রা ও প্রভাবক:** বিক্রিয়ক যোগ করলে সাম্য ডানে সরে। প্রভাবক সাম্যের অবস্থান পরিবর্তন করতে পারে না, কেবল দ্রুত সাম্যাবস্থা অর্জনে সাহায্য করে।

### ৩. হেবার-বস পদ্ধতিতে অ্যামোনিয়া উৎপাদনের অনুকূল শর্ত
- **উচ্চ চাপ:** ২০০ atm (যেহেতু ৪ মোল গ্যাস → ২ মোল গ্যাস)
- **অনুকূল তাপমাত্রা:** $450^\\circ\\text{C}-550^\\circ\\text{C}$
- **প্রভাবক:** $Fe$ চূর্ণ এবং $Mo$ প্রমোটর`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'লা-শাতেলিয়ার নীতি', termEnglish: 'Le Chatelier’s Principle', definition: 'সাম্যাবস্থায় নিয়ামক পরিবর্তনের ফলাফল সিস্টেম স্বয়ংক্রিয়ভাবে প্রশমিত করার মূল নীতি।' },
        { termBangla: 'গতিশীল সাম্যাবস্থা', termEnglish: 'Dynamic Equilibrium', definition: 'আণবিক পর্যায়ে অবিরাম সম্মুখ ও বিপরীত রূপান্তরের সমান দ্রুতিতে চলমান সাম্যাবস্থা।' },
        { termBangla: 'প্রভাবক', termEnglish: 'Catalyst', definition: 'যে পদার্থ বিক্রিয়ার বিকল্প নিম্ন সক্রিয়ণ শক্তিসম্পন্ন পথ তৈরি করে গতি বৃদ্ধি করে কিন্তু নিজে অপরিবর্তিত থাকে।' },
      ],
      workedExample: {
        problem: '$2SO_2(g) + O_2(g) \\rightleftharpoons 2SO_3(g); \\Delta H = -198 \\text{ kJ}$ বিক্রিয়ায় অধিক উৎপাদ পাওয়ার শর্ত ব্যাখ্যা করো।',
        stepByStepSolution: '১. তাপমাত্রার প্রভাব: বিক্রিয়াটি তাপউৎপাদী হওয়ায় লা-শাতেলিয়ার নীতি অনুসারে তাপমাত্রা হ্রাস করলে সাম্য ডানে সরে $SO_3$ উৎপাদন বাড়বে (শিল্পে প্রায় ৪৫০°C বজায় রাখা হয়)।\n২. চাপের প্রভাব: বামে মোট গ্যাস ৩ মোল এবং ডানে ২ মোল। বিক্রিয়ায় আয়তন হ্রাস পায় বলে চাপ বৃদ্ধি করলে সাম্য ডান দিকে সরে $SO_3$ এর উৎপাদন বৃদ্ধি পাবে।',
      },
      memoryAid: '“চাপ বাড়ালে সেদিক ধায়, যেদিকটাতে মোল কমে যায়; দুই পাশে মোল সমান হলে, চাপের প্রভাব উড়ে যায় জলে!”',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Seed Questions (All 72 Questions: 54 MCQs + 18 CQs)
  // -------------------------------------------------------------------------
  console.log(`Seeding ${chemistryChapter7AllQuestions.length} verified questions for Chapter 7...`);

  for (const q of chemistryChapter7AllQuestions) {
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
    'top_ssc_chemistry_ch7_1',
    'top_ssc_chemistry_ch7_2',
    'top_ssc_chemistry_ch7_3',
    'top_ssc_chemistry_ch7_4',
    'top_ssc_chemistry_ch7_5',
    'top_ssc_chemistry_ch7_6',
  ];

  await prisma.lesson.deleteMany({
    where: {
      topic: { chapterId: chapter7.id },
      topicId: { notIn: activeTopicIds },
    },
  });

  await prisma.topic.deleteMany({
    where: {
      chapterId: chapter7.id,
      id: { notIn: activeTopicIds },
    },
  });

  console.log(`✅ SSC Chemistry Chapter 7 seeded successfully (${chemistryChapter7AllQuestions.length} verified questions).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedChemistryChapter7(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Chemistry Chapter 7 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
