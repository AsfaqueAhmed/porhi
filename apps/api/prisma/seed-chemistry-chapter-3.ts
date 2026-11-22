import { PrismaClient, ContentStatus } from '@prisma/client';
import { chemistryChapter3QuestionsBatch1 } from './seed-chemistry-chapter-3-questions';
import { chemistryChapter3QuestionsBatch2 } from './seed-chemistry-chapter-3-questions-batch2';
import { chemistryChapter3QuestionsBatch3 } from './seed-chemistry-chapter-3-questions-batch3';

export const sscChemistrySubject = {
  id: 'sub_ssc_chemistry',
  code: 'ssc_chemistry',
  nameBangla: 'রসায়ন',
  classLevel: 'CLASS_9_10',
  program: 'SSC',
  syllabusYear: 2026,
  isReady: true,
};

export const chemistryChapter3AllQuestions = [
  ...chemistryChapter3QuestionsBatch1,
  ...chemistryChapter3QuestionsBatch2,
  ...chemistryChapter3QuestionsBatch3,
];

const INTERACTIVE_WIDGET_URL = '/uploads/interactive/bohr-atom-electron-config-lab.html';

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

export async function seedChemistryChapter3(prisma: PrismaClient) {
  console.log('⚗️ Seeding SSC Chemistry Chapter 3 (পদার্থের গঠন / Structure of Matter)...');

  await prisma.subject.upsert({
    where: { code: sscChemistrySubject.code },
    update: sscChemistrySubject,
    create: sscChemistrySubject,
  });

  const chapter3 = await prisma.chapter.upsert({
    where: { id: 'chap_ssc_chemistry_ch3' },
    update: {
      subjectId: sscChemistrySubject.id,
      orderIndex: 3,
      titleBangla: 'তৃতীয় অধ্যায়: পদার্থের গঠন (Structure of Matter)',
    },
    create: {
      id: 'chap_ssc_chemistry_ch3',
      subjectId: sscChemistrySubject.id,
      orderIndex: 3,
      titleBangla: 'তৃতীয় অধ্যায়: পদার্থের গঠন (Structure of Matter)',
    },
  });

  // -------------------------------------------------------------------------
  // Topic 3.1: মৌলিক ও যৌগিক পদার্থ
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch3_1',
    chapter3.id,
    1,
    '৩.১ মৌলিক ও যৌগিক পদার্থ (Elements and Compounds)',
    'les_ssc_chemistry_ch3_1',
    {
      titleBangla: 'মৌলিক ও যৌগিক পদার্থের ধারণা, আবিষ্কৃত ১১৮টি মৌল ও ধর্মের রূপান্তর',
      learningGoal: 'মৌলিক ও যৌগিক পদার্থের সংজ্ঞা, আবিষ্কৃত ১১৮টি মৌলের প্রকৃতি (৯৮টি প্রাকৃতিক, ২০টি কৃত্রিম) এবং যৌগের ধর্ম কেন উপাদান মৌল থেকে সম্পূর্ণ আলাদা তা ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. মৌলিক ও যৌগিক পদার্থ (Elements and Compounds)
- **মৌলিক পদার্থ (Element):** যে সকল পদার্থকে রাসায়নিকভাবে ভাঙলে বা বিশ্লেষণ করলে সেই পদার্থ ছাড়া অন্য কোনো নতুন ধর্মের পদার্থ পাওয়া যায় না, তাদেরকে মৌলিক পদার্থ বলে (যেমন: সোনা $\\text{Au}$, তামা $\\text{Cu}$, লোহা $\\text{Fe}$, অক্সিজেন $\\text{O}_2$)।
- **যৌগিক পদার্থ (Compound):** যে সকল পদার্থকে রাসায়নিকভাবে ভাঙলে দুই বা ততোধিক ভিন্ন মৌলিক পদার্থ পাওয়া যায়, তাদেরকে যৌগিক পদার্থ বলে (যেমন: পানি $\\text{H}_2\\text{O}$, খাবার লবণ $\\text{NaCl}$, ক্যালসিয়াম কার্বনেট $\\text{CaCO}_3$)।

### ২. আবিষ্কৃত মৌলের সংখ্যা ও প্রকৃতি
- বর্তমানে সর্বমোট **১১৮টি** মৌল আবিষ্কৃত হয়েছে।
- এর মধ্যে **৯৮টি মৌল** প্রকৃতিতে পাওয়া যায় (মানবদেহে ২৬টি ভিন্ন মৌল রয়েছে)।
- অবশিষ্ট **২০টি মৌল** গবেষণাগারে কৃত্রিমভাবে প্রস্তুত করা হয়েছে।

### ৩. উপাদান মৌল ও যৌগের ধর্মের ভিন্নতা
- যৌগিক পদার্থের ধর্ম তার উপাদান মৌলসমূহের ধর্ম থেকে সম্পূর্ণ আলাদা।
- **পানির উদাহরণ:** হাইড্রোজেন ($\\text{H}_2$) নিজে জ্বলে (দাহ্য) এবং অক্সিজেন ($\\text{O}_2$) জ্বলতে সাহায্য করে (দহন সহায়ক); কিন্তু উভয়ের রাসায়নিক সংযোগে উৎপন্ন পানি ($\\text{H}_2\\text{O}$) নিজে জ্বলে না, বরং আগুন নেভাতে সাহায্য করে।
$$2\\text{H}_2\\text{O(l)} \\xrightarrow{\\text{তড়িৎ বিশ্লেষণ}} 2\\text{H}_2\\text{(g)} + \\text{O}_2\\text{(g)}$$`,
      interactiveWidgetUrl: INTERACTIVE_WIDGET_URL,
      importantTerms: [
        { termBangla: 'মৌলিক পদার্থ', termEnglish: 'Element', definition: 'একই ধরনের পরমাণু দ্বারা গঠিত পদার্থ যা ভাঙলে নতুন কোনো পদার্থ পাওয়া যায় না।' },
        { termBangla: 'যৌগিক পদার্থ', termEnglish: 'Compound', definition: 'নির্দিষ্ট ভরের অনুপাতে একাধিক ভিন্ন মৌলের রাসায়নিক মিলনে গঠিত নতুন ধর্মের পদার্থ।' },
        { termBangla: 'কৃত্রিম মৌল', termEnglish: 'Synthetic Element', definition: 'গবেষণাগারে নিউক্লিয়ার বিক্রিয়ার মাধ্যমে প্রস্তুতকৃত ২০টি মৌল।' },
      ],
      workedExample: {
        problem: 'পানি একটি যৌগিক পদার্থ কিন্তু হাইড্রোজেন একটি মৌলিক পদার্থ কেন? (অনুধাবনমূলক প্রশ্ন)',
        stepByStepSolution: '১. পানিকে তড়িৎ বিশ্লেষণ করলে দুটি সম্পূর্ণ ভিন্ন গ্যাস—হাইড্রোজেন ও অক্সিজেন পাওয়া যায়; একাধিক মৌল পাওয়ায় পানি একটি যৌগিক পদার্থ।\n২. নির্গত হাইড্রোজেন গ্যাসকে রাসায়নিকভাবে ভাঙলে হাইড্রোজেন ব্যতীত অন্য কোনো পদার্থ পাওয়া যায় না; তাই হাইড্রোজেন একটি মৌলিক পদার্থ।',
      },
      memoryAid: 'মনে রাখার ছন্দ: "আবিষ্কৃত মোট একশো আঠারো, আটানব্বই প্রকৃতিতে বাকি কুড়ি ল্যাবে করো!"',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 3.2: পরমাণু ও অণু
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch3_2',
    chapter3.id,
    2,
    '৩.২ পরমাণু ও অণু (Atoms and Molecules)',
    'les_ssc_chemistry_ch3_2',
    {
      titleBangla: 'পরমাণু ও অণুর ধারণা, মৌলিক অণু বনাম যৌগিক অণু',
      learningGoal: 'পরমাণু ও অণুর পার্থক্য, অণুর স্বাধীন অস্তিত্ব, রাসায়নিক সক্রিয়তা এবং মৌলিক অণু (যেমন $\\text{O}_2, \\text{P}_4, \\text{S}_8$) ও যৌগিক অণুর গঠন ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. পরমাণু (Atom)
- মৌলিক পদার্থের ক্ষুদ্রতম কণা যার মধ্যে ওই মৌলের সমস্ত বৈশিষ্ট্য বিদ্যমান থাকে এবং যা রাসায়নিক বিক্রিয়ায় সরাসরি অংশগ্রহণ করে, তাকে **পরমাণু** বলে।
- ১৮০৩ সালে জন ডাল্টন আধুনিক পরমাণুবাদ প্রকাশ করেন।
- নিষ্ক্রিয় গ্যাস ব্যতীত কোনো পরমাণু সাধারণত মুক্ত বা স্বাধীনভাবে থাকতে পারে না।

### ২. অণু (Molecule)
- দুই বা ততোধিক পরমাণু রাসায়নিক বন্ধনের মাধ্যমে পরস্পরের সাথে যুক্ত হয়ে যে ক্ষুদ্রতম স্বাধীন কণা সৃষ্টি করে, তাকে **অণু** বলে।
- **মৌলিক অণু:** একই মৌলের একাধিক পরমাণু দিয়ে গঠিত (যেমন: $\\text{O}_2$, $\\text{N}_2$, ওজোন $\\text{O}_3$, ফসফরাস $\\text{P}_4$, সালফার $\\text{S}_8$)।
- **যৌগিক অণু:** ভিন্ন ভিন্ন মৌলের পরমাণু দিয়ে গঠিত (যেমন: পানি $\\text{H}_2\\text{O}$, মিথেন $\\text{CH}_4$, সালফিউরিক এসিড $\\text{H}_2\\text{SO}_4$)।

### ৩. 2N বনাম N₂ এর পার্থক্য
- $\\text{2N}$ বলতে দুটি পৃথক, স্বাধীন ও বন্ধনহীন নাইট্রোজেন **পরমাণু** বোঝায়।
- $\\text{N}_2$ বলতে নাইট্রোজেনের একটি স্থিতিশীল দ্বি-পরমাণুক **অণু** বোঝায় যেখানে দুটি পরমাণু সমযোজী বন্ধনে আবদ্ধ।`,
      interactiveWidgetUrl: INTERACTIVE_WIDGET_URL,
      importantTerms: [
        { termBangla: 'পরমাণু', termEnglish: 'Atom', definition: 'মৌলিক পদার্থের ক্ষুদ্রতম কণা যা রাসায়নিক বিক্রিয়ায় সরাসরি অংশ নেয়।' },
        { termBangla: 'অণু', termEnglish: 'Molecule', definition: 'পদার্থের ক্ষুদ্রতম কণা যার স্বাধীন ও মুক্ত অস্তিত্ব বজায় থাকে।' },
        { termBangla: 'মৌলিক অণু', termEnglish: 'Elemental Molecule', definition: 'একই মৌলের পরমাণু দিয়ে গঠিত স্বাধীন অণু, যেমন $\\text{P}_4$ বা $\\text{S}_8$।' },
      ],
      workedExample: {
        problem: 'সালফারের একটি অণুতে কতটি পরমাণু থাকে এবং এর সংকেত কী?',
        stepByStepSolution: 'সালফার সাধারণ তাপমাত্রায় আট-পরমাণুক বলয় গঠন করে থাকে।\nঅতএব এর একটি অণুতে ৮টি সালফার পরমাণু থাকে এবং এর আণবিক সংকেত হলো $\\text{S}_8$।',
      },
      memoryAid: 'পরমাণু বিক্রিয়াতে অংশ নেয় সরাসরি, অণু বাঁচে মুক্ত বেশে স্বাধীন সত্ত্বা ধরি!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 3.3: মৌলের প্রতীক ও সংকেত
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch3_3',
    chapter3.id,
    3,
    '৩.৩ মৌলের প্রতীক ও সংকেত (Symbols and Formulas)',
    'les_ssc_chemistry_ch3_3',
    {
      titleBangla: 'প্রতীক লেখার আন্তর্জাতিক ৩টি নিয়ম, ১১টি ল্যাটিন নাম ও সংকেত',
      learningGoal: 'মৌলের প্রতীক লেখার ৩টি আন্তর্জাতিক নিয়ম, ১১টি ঐতিহাসিক ল্যাটিন নাম (যেমন $\\text{Na, K, Fe, Cu, Ag, Au, Pb, Sn, Sb, Hg, W}$) এবং রাসায়নিক সংকেতের সঠিক রূপ উপস্থাপন করতে পারবে।',
      explanation: `### ১. প্রতীক লেখার আন্তর্জাতিক ৩টি নিয়ম
1. **নিয়ম ১ (ইংরেজি নামের ১ম বর্ণ):** মৌলের ইংরেজি নামের প্রথম অক্ষর বড় হাতের (Capital letter) লিখে প্রকাশ করা হয়। যেমন: Hydrogen $\\rightarrow \\text{H}$, Oxygen $\\rightarrow \\text{O}$, Carbon $\\rightarrow \\text{C}$।
2. **নিয়ম ২ (দুই বর্ণের প্রতীক):** প্রথম অক্ষর একাধিক মৌলে মিলে গেলে ১ম টি বড় হাতের এবং অন্য একটি উচ্চারিত বর্ণ ছোট হাতের (Small letter) যোগ করা হয়। যেমন: Carbon ($\\text{C}$), Calcium ($\\text{Ca}$), Chlorine ($\\text{Cl}$), Cobalt ($\\text{Co}$)।
3. **নিয়ম ৩ (ল্যাটিন নাম থেকে প্রতীক):** কিছু মৌলের প্রতীক তাদের প্রাচীন ল্যাটিন বা জার্মান নাম থেকে গ্রহণ করা হয়েছে।

### ২. পাঠ্যবইয়ের ১১টি গুরুত্বপূর্ণ ল্যাটিন নাম ও প্রতীক
- সোডিয়াম (Sodium) $\\rightarrow$ **Natrium (Na)**
- কপার (Copper) $\\rightarrow$ **Cuprum (Cu)**
- পটাশিয়াম (Potassium) $\\rightarrow$ **Kalium (K)**
- আয়রন (Iron) $\\rightarrow$ **Ferrum (Fe)**
- সিলভার (Silver) $\\rightarrow$ **Argentum (Ag)**
- গোল্ড (Gold) $\\rightarrow$ **Aurum (Au)**
- লেড (Lead) $\\rightarrow$ **Plumbum (Pb)**
- টিন (Tin) $\\rightarrow$ **Stannum (Sn)**
- অ্যান্টিমনি (Antimony) $\\rightarrow$ **Stibium (Sb)**
- মার্কারি (Mercury) $\\rightarrow$ **Hydrargyrum (Hg)**
- টাংস্টেন (Tungsten) $\\rightarrow$ **Wolfram (W)**`,
      interactiveWidgetUrl: INTERACTIVE_WIDGET_URL,
      importantTerms: [
        { termBangla: 'প্রতীক', termEnglish: 'Symbol', definition: 'মৌলের ইংরেজি বা ল্যাটিন পুরো নামের আন্তর্জাতিক সংক্ষিপ্ত প্রকাশ।' },
        { termBangla: 'সংকেত', termEnglish: 'Formula', definition: 'মৌল বা যৌগের অণুতে উপস্থিত পরমাণুর সংখ্যা ও অনুপাতের সংক্ষিপ্ত রূপ।' },
        { termBangla: 'ল্যাটিন নাম', termEnglish: 'Latin Name', definition: 'প্রাচীন বৈজ্ঞানিক ভাষা ল্যাটিন থেকে গৃহীত মৌলের ঐতিহ্যবাহী নাম।' },
      ],
      workedExample: {
        problem: 'Co এবং CO এর মধ্যে পার্থক্য কী? (অনুধাবনমূলক প্রশ্ন)',
        stepByStepSolution: '১. Co হলো কোবাল্ট ধাতুর প্রতীক; এতে প্রথম অক্ষর C বড় হাতের এবং দ্বিতীয় অক্ষর o ছোট হাতের হওয়ায় এটি একটি একক মৌলিক পদার্থ।\n২. পক্ষান্তরে CO হলো কার্বন মনোক্সাইড যৌগের সংকেত; এতে C ও O উভয়ই বড় হাতের অক্ষর হওয়ায় এটি কার্বন ও অক্সিজেনের সংযোগে গঠিত বিষাক্ত গ্যাসীয় যৌগ।',
      },
      memoryAid: 'ল্যাটিন ছন্দ: "ন্যাট্রিয়ামে সোডিয়াম Na, ক্যাভিয়াম নয় পটাশিয়াম K; কিউপ্রামে কপার Cu, ফেরামে আয়রন Fe; আর্জেন্টামে রূপা Ag, অরামে সোনা Au!"',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 3.4: পরমাণুর ভেতরের কণা
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch3_4',
    chapter3.id,
    4,
    '৩.৪ পরমাণুর ভেতরের কণা: ইলেকট্রন, প্রোটন ও নিউট্রন (Subatomic Particles)',
    'les_ssc_chemistry_ch3_4',
    {
      titleBangla: 'ইলেকট্রন, প্রোটন ও নিউট্রনের প্রকৃত ভর, আধান ও চার্জ নিরপেক্ষতা',
      learningGoal: 'পরমাণুর ৩টি স্থায়ী মূল কণিকার আবিষ্কারক, গ্রাম ও কিলোগ্রাম এককে প্রকৃত ভর, কুলম্ব এককে আধান এবং পরমাণুর সামগ্রিক চার্জ নিরপেক্ষতা নির্ভুলভাবে ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. পরমাণুর ৩টি স্থায়ী মূল কণিকা
পরমাণুর কেন্দ্রস্থ নিউক্লিয়াসে থাকে প্রোটন ও নিউট্রন এবং চারপাশের কক্ষপথে আবর্তিত হয় ইলেকট্রন।

| কণিকা | প্রতীক | আবিষ্কারক | প্রকৃত আধান (Coulomb) | আপেক্ষিক আধান | প্রকৃত ভর ($g$ ও $kg$) | আপেক্ষিক ভর |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ইলেকট্রন** | $e^-$ | জে জে থমসন (১৮৯৭) | $-1.60 \\times 10^{-19}\\text{ C}$ | $-1$ | $9.11 \\times 10^{-28}\\text{ g}$ ($9.11 \\times 10^{-31}\\text{ kg}$) | $0$ ($\\frac{1}{1840}$) |
| **প্রোটন** | $p$ | আর্নেস্ট রাদারফোর্ড | $+1.60 \\times 10^{-19}\\text{ C}$ | $+1$ | $1.673 \\times 10^{-24}\\text{ g}$ ($1.673 \\times 10^{-27}\\text{ kg}$) | $1$ |
| **নিউট্রন** | $n$ | জেমস চ্যাডউইক (১৯৩২) | $0\\text{ C}$ | $0$ | $1.675 \\times 10^{-24}\\text{ g}$ ($1.675 \\times 10^{-27}\\text{ kg}$) | $1$ |

### ২. গুরুত্বপূর্ণ বিষয়সমূহ
- **ইলেকট্রনের ভর নগণ্য:** প্রোটনের ভর ইলেকট্রনের প্রায় ১৮৪০ গুণ। তাই সামগ্রিক ভর গণনায় ইলেকট্রনের ভরকে শূন্য ধরা হয়।
- **নিউট্রনহীন পরমাণু:** সাধারণ হাইড্রোজেন (প্রোটিয়াম, $^1_1\\text{H}$)-এ কোনো নিউট্রন থাকে না ($N = 1 - 1 = 0$)।
- **চার্জ নিরপেক্ষতা:** পরমাণুর নিউক্লিয়াসে যতটি ধনাত্মক প্রোটন থাকে, নিউক্লিয়াসের বাইরে সমসংখ্যক ঋণাত্মক ইলেকট্রন থাকায় মোট আধান শূন্য হয়।`,
      interactiveWidgetUrl: INTERACTIVE_WIDGET_URL,
      importantTerms: [
        { termBangla: 'ইলেকট্রন', termEnglish: 'Electron', definition: 'পরমাণুর কক্ষপথে ঘূর্ণায়মান ঋণাত্মক চার্জযুক্ত কণা (ভর $9.11 \\times 10^{-28}\\text{ g}$)।' },
        { termBangla: 'প্রোটন', termEnglish: 'Proton', definition: 'নিউক্লিয়াসে অবস্থিত ধনাত্মক চার্জযুক্ত কণা (চার্জ $+1.60 \\times 10^{-19}\\text{ C}$)।' },
        { termBangla: 'নিউট্রন', termEnglish: 'Neutron', definition: 'নিউক্লিয়াসে অবস্থিত চার্জহীন নিরপেক্ষ কণা (ভর $1.675 \\times 10^{-24}\\text{ g}$)।' },
      ],
      workedExample: {
        problem: 'পরমাণু সামগ্রিকভাবে বিদ্যুৎ নিরপেক্ষ কেন?',
        stepByStepSolution: '১. একটি নিরপেক্ষ পরমাণুতে ধনাত্মক প্রোটন সংখ্যা ও ঋণাত্মক ইলেকট্রন সংখ্যা সমান থাকে।\n২. একটি প্রোটনের আধান ($+1.60 \\times 10^{-19}\\text{ C}$) এবং একটি ইলেকট্রনের আধান ($-1.60 \\times 10^{-19}\\text{ C}$) মানে সমান কিন্তু বিপরীতমুখী।\n৩. এদের সম্মিলিত চার্জের যোগফল শূন্য হওয়ায় পরমাণু সামগ্রিকভাবে বিদ্যুৎ নিরপেক্ষ।',
      },
      memoryAid: 'আবিষ্কারকের শর্টকাট PEN-RTC: Proton → Rutherford, Electron → Thomson, Neutron → Chadwick!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 3.5: পারমাণবিক সংখ্যা, ভর সংখ্যা ও আপেক্ষিক পারমাণবিক ভর
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch3_5',
    chapter3.id,
    5,
    '৩.৫ পারমাণবিক সংখ্যা, ভর সংখ্যা ও আপেক্ষিক পারমাণবিক ভর (Atomic Mass & Numbers)',
    'les_ssc_chemistry_ch3_5',
    {
      titleBangla: 'পারমাণবিক সংখ্যা ($Z$), ভর সংখ্যা ($A$), কার্বন-১২ স্কেল ও আপেক্ষিক ভর গণনা',
      learningGoal: 'পারমাণবিক সংখ্যা ও ভর সংখ্যা থেকে কণিকাসমূহ গণনা, কার্বন-১২ প্রমিত স্কেল ($1.66 \\times 10^{-24}\\text{ g}$) এবং শতকরা প্রাচুর্য থেকে ক্লোরিন ও কপারের আপেক্ষিক ভর নির্ণয় করতে পারবে।',
      explanation: `### ১. পারমাণবিক সংখ্যা ($Z$) ও ভর সংখ্যা ($A$)
- **পারমাণবিক সংখ্যা ($Z$):** কোনো মৌলের পরমাণুর নিউক্লিয়াসে বিদ্যমান প্রোটন সংখ্যাকে পারমাণবিক সংখ্যা বলে।
- **ভর সংখ্যা ($A$):** নিউক্লিয়াসে প্রোটন ও নিউট্রন সংখ্যার যোগফল ($A = Z + N \\implies N = A - Z$)।
- মৌলের প্রকাশ প্রতীক: $^{A}_{Z}\\text{X}^{m\\pm}$ (যেমন: $^{23}_{11}\\text{Na}$, $^{27}_{13}\\text{Al}^{3+}$)।

### ২. আপেক্ষিক পারমাণবিক ভর ($A_r$) ও কার্বন-১২ স্কেল
$$\\text{আপেক্ষিক পারমাণবিক ভর } (A_r) = \\frac{\\text{মৌলের একটি পরমাণুর প্রকৃত ভর}}{\\text{একটি কার্বন-১২ আইসোটোপের ভরের } \\frac{1}{12} \\text{ অংশ}}$$
- কার্বন-১২ আইসোটোপের ভরের $\\frac{1}{12}$ অংশ = $1.66 \\times 10^{-24}\\text{ g} = 1.66 \\times 10^{-27}\\text{ kg}$।
- দুটি সমজাতীয় ভরের অনুপাত হওয়ায় আপেক্ষিক পারমাণবিক ভরের **কোনো একক নেই**।

### ৩. শতকরা প্রাচুর্য থেকে আপেক্ষিক ভর নির্ণয়ের সমীকরণ
$$A_r = \\frac{(m \\times p) + (n \\times q)}{100}$$
- **ক্লোরিন (Cl):** $^{35}\\text{Cl}$ (৭৫%) ও $^{37}\\text{Cl}$ (২৫%) $\\implies A_r = \\frac{35 \\times 75 + 37 \\times 25}{100} = \\mathbf{35.5}$
- **কপার (Cu):** $^{63}\\text{Cu}$ (৬৯.১৫%) ও $^{65}\\text{Cu}$ (৩০.৮৫%) $\\implies A_r = \\mathbf{63.5}$`,
      interactiveWidgetUrl: INTERACTIVE_WIDGET_URL,
      importantTerms: [
        { termBangla: 'পারমাণবিক সংখ্যা', termEnglish: 'Atomic Number (Z)', definition: 'পরমাণুর নিউক্লিয়াসে উপস্থিত প্রোটন সংখ্যা যা মৌলের মৌলিক পরিচয়।' },
        { termBangla: 'ভর সংখ্যা', termEnglish: 'Mass Number (A)', definition: 'নিউক্লিয়াসের প্রোটন ও নিউট্রনের সমষ্টি ($A = Z + N$)।' },
        { termBangla: 'কার্বন-১২ স্কেল', termEnglish: 'Carbon-12 Scale', definition: 'পারমাণবিক ভর পরিমাপের আন্তর্জাতিক ভিত্তি ($1.66 \\times 10^{-24}\\text{ g}$)।' },
      ],
      workedExample: {
        problem: 'প্রকৃতিতে ক্লোরিনের দুটি আইসোটোপ ³⁵Cl ও ³⁷Cl এর প্রাচুর্য যথাক্রমে ৭৫% ও ২৫% হলে এর গড় আপেক্ষিক ভর কত?',
        stepByStepSolution: 'আমরা জানি,\nAr = (35 × 75 + 37 × 25) / 100\n= (2625 + 925) / 100\n= 3550 / 100\n= 35.5 (উত্তর)।',
      },
      memoryAid: 'ভর সংখ্যা A থাকে উপরে, পারমাণবিক সংখ্যা Z থাকে নিচে; A থেকে Z বিয়োগ দিলে নিউট্রন সংখ্যা হাসে!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 3.6: আইসোটোপ ও তেজস্ক্রিয় আইসোটোপের ব্যবহার
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch3_6',
    chapter3.id,
    6,
    '৩.৬ আইসোটোপ ও তেজস্ক্রিয় আইসোটোপের ব্যবহার (Isotopes & Uses)',
    'les_ssc_chemistry_ch3_6',
    {
      titleBangla: 'আইসোটোপের বৈশিষ্ট্য এবং চিকিৎসা, কৃষি, খাদ্য ও বয়সনিরূপণে তেজস্ক্রিয় আইসোটোপ',
      learningGoal: 'আইসোটোপের সংজ্ঞা, হাইড্রোজেনের ৩টি আইসোটোপের গঠন এবং মানবকল্যাণে $^{131}\\text{I}, ^{60}\\text{Co}, ^{32}\\text{P}, ^{99m}\\text{Tc}, ^{14}\\text{C}$ এর ব্যবহার ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. আইসোটোপের সংজ্ঞা ও হাইড্রোজেনের ৩টি রূপ
যেসব পরমাণুর **প্রোটন সংখ্যা সমান** কিন্তু **ভর সংখ্যা ও নিউট্রন সংখ্যা ভিন্ন**, তাদেরকে পরস্পরের **আইসোটোপ** বলে।
- **প্রোটিয়াম ($^1_1\\text{H}$):** ১টি প্রোটন, ০টি নিউট্রন (সাধারণ হাইড্রোজেন)।
- **ডিউটেরিয়াম ($^2_1\\text{H}$ বা $\\text{D}$):** ১টি প্রোটন, ১টি নিউট্রন (ভারী পানি $\\text{D}_2\\text{O}$ গঠনে)।
- **ট্রিটিয়াম ($^3_1\\text{H}$ বা $\\text{T}$):** ১টি প্রোটন, ২টি নিউট্রন (তেজস্ক্রিয় আইসোটোপ)।

### ২. চিকিৎসাক্ষেত্রে তেজস্ক্রিয় আইসোটোপের ব্যবহার (পরীক্ষায় সর্বাধিক গুরুত্বপূর্ণ)
- **আয়োডিন-১৩১ ($^{131}\\text{I}$):** থাইরয়েড গ্রন্থির গলগণ্ড ও থাইরয়েড ক্যান্সার চিকিৎসায়।
- **কোবাল্ট-৬০ ($^{60}\\text{Co}$):** শক্তিশালী গামা ($\\gamma$) রশ্মি দ্বারা ক্যান্সার ও টিউমার কোষ ধ্বংসে।
- **ফসফরাস-৩২ ($^{32}\\text{P}$):** রক্তের ক্যান্সার বা লিউকেমিয়া (Leukemia) নিরাময়ে।
- **টেকনেশিয়াম-৯৯এম ($^{99m}\\text{Tc}$):** ব্রেন টিউমার ও মস্তিষ্কের রক্ত সঞ্চালন স্ক্যানিংয়ে।

### ৩. কৃষি, খাদ্য সংরক্ষণ ও জীবাশ্মের বয়স নির্ণয়
- **কৃষিতে:** ফসলে ফসফেট সারের শোষণ মাত্রা ও কার্যকারিতা মূল্যায়নে $^{32}\\text{P}$ ট্রেসার হিসেবে ব্যবহৃত হয়।
- **খাদ্য সংরক্ষণ:** $^{60}\\text{Co}$ এর গামা রশ্মি দিয়ে ব্যাকটেরিয়া ধ্বংস করে খাদ্য সতেজ রাখা হয়।
- **কার্বন ডেটিং ($^{14}\\text{C}$):** তেজস্ক্রিয় কার্বন-১৪ ক্ষয়ের মাত্রা মেপে প্রাচীন জীবাশ্ম ও প্রত্নতাত্ত্বিক নমুনার বয়স নির্ধারণ করা হয়।`,
      interactiveWidgetUrl: INTERACTIVE_WIDGET_URL,
      importantTerms: [
        { termBangla: 'আইসোটোপ', termEnglish: 'Isotope', definition: 'প্রোটন সংখ্যা সমান কিন্তু ভর সংখ্যা ও নিউট্রন সংখ্যা ভিন্ন এমন পরমাণু।' },
        { termBangla: 'কার্বন ডেটিং', termEnglish: 'Carbon Dating', definition: 'তেজস্ক্রিয় $^{14}\\text{C}$ এর ক্ষয়ের মাধ্যমে জীবাশ্মের বয়স পরিমাপ পদ্ধতি।' },
        { termBangla: 'ট্রেসার', termEnglish: 'Tracer', definition: 'শরীরে বা উদ্ভিদে কোনো প্রক্রিয়ার গতিপথ শনাক্ত করতে ব্যবহৃত তেজস্ক্রিয় পদার্থ।' },
      ],
      workedExample: {
        problem: 'ক্যান্সার চিকিৎসায় কোবাল্ট-৬০ কীভাবে কাজ করে? (অনুধাবনমূলক প্রশ্ন)',
        stepByStepSolution: '১. কোবাল্ট-৬০ ($^{60}\\text{Co}$) একটি তেজস্ক্রিয় আইসোটোপ যা উচ্চভেদী ও শক্তিশালী গামা ($\\gamma$) রশ্মি বিকিরণ করে।\n২. ক্যান্সার আক্রান্ত টিউমারে এই গামা রশ্মি সুনির্দিষ্টভাবে নিক্ষেপ করা হলে তা টিউমার কোষের ডিএনএ ভেঙে কোষগুলোকে ধ্বংস করে দেয়।',
      },
      memoryAid: 'চিকিৎসা ছন্দ: "আয়োডিনে থাইরয়েড, কোবাল্টে টিউমার শেষ; ফসফরাসে লিউকেমিয়া, টেকনেশিয়ামে স্ক্যান বেশ!"',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 3.7: পরমাণুর মডেল: রাদারফোর্ড ও বোর পরমাণু মডেল
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch3_7',
    chapter3.id,
    7,
    '৩.৭ পরমাণুর মডেল: রাদারফোর্ড ও বোর পরমাণু মডেল (Atomic Models)',
    'les_ssc_chemistry_ch3_7',
    {
      titleBangla: 'রাদারফোর্ডের আলফা বিচ্ছুরণ পরীক্ষা, সৌর মডেলের ত্রুটি ও বোর কোয়ান্টাম স্বীকার্য',
      learningGoal: 'রাদারফোর্ডের আলফা কণা বিচ্ছুরণ পরীক্ষা, ম্যাক্সওয়েল তত্ত্বের সীমাবদ্ধতা, বোর পরমাণু মডেলের ৩টি স্বীকার্য ($mvr = \\frac{nh}{2\\pi}$, $\\Delta E = h\\nu$) এবং সাফল্য ও সীমাবদ্ধতা বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. রাদারফোর্ডের আলফা কণা বিচ্ছুরণ পরীক্ষা (১৯১১)
- **উপকরণ:** আলফা কণা ($^4_2\\text{He}^{2+}$), $0.0004\\text{ cm}$ পুরু সোনার পাত, এবং জিঙ্ক সালফাইড ($\\text{ZnS}$) প্রতিপ্রভা পর্দা।
- **পর্যবেক্ষণ:** ৯৯% আলফা কণা পাত ভেদ করে সোজা চলে যায়, অল্প কিছু কণা বেঁকে যায় এবং প্রায় ২০ হাজারের মধ্যে ১টি কণা সোজা ১৮০° কোণে উল্টো ফিরে আসে।
- **সিদ্ধান্ত:** পরমাণুর অধিকাংশ স্থান ফাঁকা; কেন্দ্রে সমগ্র ধনাত্মক চার্জ ও ভর পুঞ্জীভূত থাকে—যার নাম **নিউক্লিয়াস**। নিউক্লিয়াসের চারদিকে গ্রহের মতো ইলেকট্রন ঘোরে (সৌর মডেল)।
- **সীমাবদ্ধতা:** ম্যাক্সওয়েলের তত্ত্ব অনুযায়ী চার্জযুক্ত ইলেকট্রন ঘূর্ণনের সময় ক্রমাগত শক্তি বিকিরণ করে নিউক্লিয়াসে পতিত হওয়ার কথা; চার্জহীন গ্রহের সাথে চার্জযুক্ত কণার তুলনা সঠিক নয়; বর্ণালীর কোনো ব্যাখ্যা নেই।

### ২. বোর পরমাণু মডেল (১৯১৩) ও ৩টি মৌলিক স্বীকার্য
1. **স্থির শক্তিস্তর (অরবিট):** নিউক্লিয়াসের চারদিকে কতগুলো নির্দিষ্ট অনুমোদিত বৃত্তাকার কক্ষপথে ইলেকট্রন ঘোরে ($n = 1, 2, 3...$ বা K, L, M, N)। ঘোরার সময় শক্তি শোষণ বা বিকিরণ হয় না।
2. **কৌণিক ভরবেগ:**
   $$mvr = \\frac{nh}{2\\pi}$$
   ($h = 6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$)
3. **শক্তির শোষণ, বিকিরণ ও বর্ণালী:** ইলেকট্রন এক শক্তিস্তর থেকে অন্য স্তরে লাফ দিলে ফোটন শোষণ বা বিকিরণ করে:
   $$\\Delta E = E_2 - E_1 = h\\nu = \\frac{hc}{\\lambda}$$

### ৩. বোর মডেলের সাফল্য ও সীমাবদ্ধতা
- **সাফল্য:** পরমাণুর সামগ্রিক স্থায়িত্ব ও হাইড্রোজেনের রেখা বর্ণালী সফলভাবে ব্যাখ্যা করে।
- **সীমাবদ্ধতা:** একাধিক ইলেকট্রনবিশিষ্ট পরমাণুর বর্ণালী, জিম্যান প্রভাব (চৌম্বক ক্ষেত্রে রেখা বিভাজন) ও স্টার্ক প্রভাব ব্যাখ্যা করতে পারে না।`,
      interactiveWidgetUrl: INTERACTIVE_WIDGET_URL,
      importantTerms: [
        { termBangla: 'আলফা কণা', termEnglish: 'Alpha Particle', definition: 'তীব্র গতিসম্পন্ন দ্বি-ধনাত্মক চার্জযুক্ত হিলিয়াম নিউক্লিয়াস ($^4_2\\text{He}^{2+}$)।' },
        { termBangla: 'স্থির শক্তিস্তর', termEnglish: 'Bohr Orbit', definition: 'নিউক্লিয়াসের চারদিকে নির্দিষ্ট বৃত্তাকার পথ যেখানে আবর্তনের সময় ইলেকট্রন শক্তি বিকিরণ করে না।' },
        { termBangla: 'জিম্যান প্রভাব', termEnglish: 'Zeeman Effect', definition: 'চৌম্বক ক্ষেত্রের প্রভাবে পারমাণবিক বর্ণালী রেখার সূক্ষ্ম বিভাজন।' },
      ],
      workedExample: {
        problem: '৩য় প্রধান শক্তিস্তরে (n = 3) আবর্তনশীল ইলেকট্রনের কৌণিক ভরবেগ কত?',
        stepByStepSolution: 'বোর মডেলের ২য় স্বীকার্যানুসারে কৌণিক ভরবেগ mvr = nh / 2π।\nএখানে n = 3 বসিয়ে পাই:\nmvr = 3h / 2π = 1.5h / π (উত্তর)।',
      },
      memoryAid: 'মডেলের সারসংক্ষেপ: রাদারফোর্ড দেখাল মাঝে নিউক্লিয়াস ফাঁকা পরমাণুর কোল; বোর এনে দিল স্থির অরবিট শোষণ-বিকিরণের শক্তিস্তর বোল!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 3.8: শক্তিস্তরে ইলেকট্রন বিন্যাস
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch3_8',
    chapter3.id,
    8,
    '৩.৮ শক্তিস্তরে ইলেকট্রন বিন্যাস: বোর ও আউফবাউ নীতি (Electron Configuration)',
    'les_ssc_chemistry_ch3_8',
    {
      titleBangla: 'প্রধান শক্তিস্তর ($2n^2$), উপশক্তিস্তর ($s, p, d, f$), আউফবাউ নীতি ও Cr, Cu এর ব্যতিক্রমী বিন্যাস',
      learningGoal: 'প্রধান শক্তিস্তরে ধারণক্ষমতা ($2n^2$), উপশক্তিস্তরে ধারণক্ষমতা ($2(2l+1)$), আউফবাউ নীতি ও $(n+l)$ নিয়মে পটাশিয়ামের ১৯তম ইলেকট্রন কেন $4s$-এ যায় এবং ক্রোমিয়াম ও কপারের ব্যতিক্রমী বিন্যাস ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. প্রধান শক্তিস্তর ও উপশক্তিস্তরে ইলেকট্রন ধারণক্ষমতা
- প্রধান শক্তিস্তরে ধারণক্ষমতা = $2n^2$ ($K=2, L=8, M=18, N=32$)।
- উপশক্তিস্তরে ধারণক্ষমতা = $2(2l + 1)$:
  - $s$ অরবিটাল ($l = 0$): $2$টি
  - $p$ অরবিটাল ($l = 1$): $6$টি
  - $d$ অরবিটাল ($l = 2$): $10$টি
  - $f$ অরবিটাল ($l = 3$): $14$টি

### ২. আউফবাউ নীতি (Aufbau Principle) ও $(n+l)$ নিয়ম
ইলেকট্রন প্রথমে সর্বনিম্ন শক্তির অরবিটালে প্রবেশ করে এবং তা পূর্ণ করে ক্রমান্বয়ে উচ্চশক্তির অরবিটালে গমন করে। শক্তি নির্ধারিত হয় $(n + l)$ দ্বারা:
- যার $(n + l)$ মান কম তার শক্তি কম; সমান হলে যার $n$ ছোট তার শক্তি কম।
$$\\text{অরবিটাল শক্তিক্রম: } 1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p \\dots$$

### ৩. পটাশিয়ামের ১৯তম ইলেকট্রন ($4s$ বনাম $3d$)
- $4s$ অরবিটালের জন্য: $n + l = 4 + 0 = \\mathbf{4}$
- $3d$ অরবিটালের জন্য: $n + l = 3 + 2 = \\mathbf{5}$
যেহেতু $4s$ এর শক্তি $3d$ অপেক্ষা কম, তাই ১৯তম ইলেকট্রন $3d$-তে না গিয়ে $4s$-এ যায়:
$$\\text{K}(19): 1s^2 2s^2 2p^6 3s^2 3p^6 4s^1$$

### ৪. ক্রোমিয়াম ($\text{Cr}$) ও কপার ($\text{Cu}$) এর ব্যতিক্রমী সুস্থিতি
সমশক্তি সম্পন্ন অরবিটালসমূহ অর্ধপূর্ণ ($d^5$) অথবা সম্পূর্ণ পূর্ণ ($d^{10}$) অবস্থায় সর্বাধিক প্রতিসম ও অধিক সুস্থিত (Stable) হয়:
- **ক্রোমিয়াম (Cr-24):** $1s^2 2s^2 2p^6 3s^2 3p^6 \\mathbf{3d^5 4s^1}$ (অর্ধপূর্ণ $d^5$ স্থিতিশীলতা)
- **কপার (Cu-29):** $1s^2 2s^2 2p^6 3s^2 3p^6 \\mathbf{3d^{10} 4s^1}$ (সম্পূর্ণ পূর্ণ $d^{10}$ স্থিতিশীলতা)`,
      interactiveWidgetUrl: INTERACTIVE_WIDGET_URL,
      importantTerms: [
        { termBangla: 'আউফবাউ নীতি', termEnglish: 'Aufbau Principle', definition: 'ইলেকট্রন প্রথমে সর্বনিম্ন শক্তির অরবিটালে প্রবেশ করে ক্রমান্বয়ে উচ্চশক্তির অরবিটালে যাওয়ার নিয়ম।' },
        { termBangla: 'উপশক্তিস্তর', termEnglish: 'Subshell / Orbital', definition: 'প্রধান শক্তিস্তরের অভ্যন্তরে ইলেকট্রন প্রাপ্তির সর্বাধিক সম্ভাবনাময় অঞ্চল ($s, p, d, f$)।' },
        { termBangla: 'অর্ধপূর্ণ অরবিটাল', termEnglish: 'Half-filled Orbital', definition: 'উপশক্তিস্তরে ধারণক্ষমতার অর্ধেক ইলেকট্রন থাকা ($d^5$), যা অধিক সুস্থিতি প্রদান করে।' },
      ],
      workedExample: {
        problem: 'ক্যালসিয়ামের (Ca-20) ইলেকট্রন বিন্যাস আউফবাউ নীতি অনুযায়ী লিখো।',
        stepByStepSolution: 'Ca-এর পারমাণবিক সংখ্যা ২০। এর প্রথম ১৮টি ইলেকট্রন 1s² 2s² 2p⁶ 3s² 3p⁶ বিন্যাস লাভ করে।\nঅবশিষ্ট ২টি ইলেকট্রনের জন্য 4s (মান ৪) এর শক্তি 3d (মান ৫) অপেক্ষা কম হওয়ায় ইলেকট্রনদ্বয় 4s-এ প্রবেশ করে।\nসুতরাং ক্যালসিয়ামের ইলেকট্রন বিন্যাস: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² (শেল আকারে: ২, ৮, ৮, ২)।',
      },
      memoryAid: 'আউফবাউ ছন্দ: "শোন শোন প্রিয়া শোন, প্রিয়া শোন ডিপিএস করো!" আর ক্রোমিয়াম-কপারে 4s থেকে ১টি নিয়ে d অর্ধপূর্ণ (d⁵) বা পূর্ণ (d¹⁰) হয়!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Upsert all 72 questions (54 MCQs + 18 CQs)
  // -------------------------------------------------------------------------
  console.log(`📋 Seeding ${chemistryChapter3AllQuestions.length} verified questions for Chapter 3...`);

  for (const q of chemistryChapter3AllQuestions) {
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
    'top_ssc_chemistry_ch3_1',
    'top_ssc_chemistry_ch3_2',
    'top_ssc_chemistry_ch3_3',
    'top_ssc_chemistry_ch3_4',
    'top_ssc_chemistry_ch3_5',
    'top_ssc_chemistry_ch3_6',
    'top_ssc_chemistry_ch3_7',
    'top_ssc_chemistry_ch3_8',
  ];

  await prisma.lesson.deleteMany({
    where: {
      topic: { chapterId: chapter3.id },
      topicId: { notIn: activeTopicIds },
    },
  });

  await prisma.topic.deleteMany({
    where: {
      chapterId: chapter3.id,
      id: { notIn: activeTopicIds },
    },
  });

  console.log(`✅ SSC Chemistry Chapter 3 seeded (${chemistryChapter3AllQuestions.length} verified questions).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedChemistryChapter3(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Chemistry Chapter 3 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
