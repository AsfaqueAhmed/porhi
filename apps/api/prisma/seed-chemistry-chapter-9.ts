import { PrismaClient, ContentStatus } from '@prisma/client';
import { chemistryChapter9QuestionsBatch1 } from './seed-chemistry-chapter-9-questions';
import { chemistryChapter9QuestionsBatch2 } from './seed-chemistry-chapter-9-questions-batch2';
import { chemistryChapter9QuestionsBatch3 } from './seed-chemistry-chapter-9-questions-batch3';

export const sscChemistrySubject = {
  id: 'sub_ssc_chemistry',
  code: 'ssc_chemistry',
  nameBangla: 'রসায়ন',
  classLevel: 'CLASS_9_10',
  syllabusYear: 2026,
  isReady: true,
};

export const chemistryChapter9AllQuestions = [
  ...chemistryChapter9QuestionsBatch1,
  ...chemistryChapter9QuestionsBatch2,
  ...chemistryChapter9QuestionsBatch3,
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

export async function seedChemistryChapter9(prisma: PrismaClient) {
  console.log('🧪 Seeding SSC Chemistry Chapter 9 (এসিড-ক্ষারক সমতা / Acid-Base Equilibrium)...');

  await prisma.subject.upsert({
    where: { code: sscChemistrySubject.code },
    update: sscChemistrySubject,
    create: sscChemistrySubject,
  });

  const chapter9 = await prisma.chapter.upsert({
    where: { id: 'chap_ssc_chemistry_ch9' },
    update: {
      subjectId: sscChemistrySubject.id,
      orderIndex: 9,
      titleBangla: 'নবম অধ্যায়: এসিড-ক্ষারক সমতা (Acid-Base Equilibrium)',
    },
    create: {
      id: 'chap_ssc_chemistry_ch9',
      subjectId: sscChemistrySubject.id,
      orderIndex: 9,
      titleBangla: 'নবম অধ্যায়: এসিড-ক্ষারক সমতা (Acid-Base Equilibrium)',
    },
  });

  const SIMULATION_URL = '/uploads/interactive/acid-base-titration-ph-lab.html';

  // -------------------------------------------------------------------------
  // Topic 9.1: এসিড ও ক্ষারকের সাধারণ বৈশিষ্ট্য
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch9_1',
    chapter9.id,
    1,
    '৯.১ এসিড ও ক্ষারকের সাধারণ বৈশিষ্ট্য',
    'les_ssc_chemistry_ch9_1',
    {
      titleBangla: 'এসিড ও ক্ষারকের বৈশিষ্ট্য এবং সাধারণ বিক্রিয়াসমূহ',
      learningGoal:
        'এসিড ও ক্ষারকের সংজ্ঞাগত বৈশিষ্ট্য, লিটমাস পরীক্ষা, ধাতুর সাথে H₂ গ্যাস এবং কার্বনেটের সাথে CO₂ গ্যাস উৎপাদন ও "সকল ক্ষারই ক্ষারক, কিন্তু সকল ক্ষারক ক্ষার নয়" এর রাসায়নিক যুক্তি বিশ্লেষণ।',
      explanation: `
### এসিডের সাধারণ বৈশিষ্ট্য (General Properties of Acids)
এসিড হলো এমন যৌগ যা জলীয় দ্রবণে হাইড্রোজেন আয়ন ($H^+$) দান করে। 
1. **স্বাদ ও স্পর্শ:** এসিড সাধারণত টক স্বাদযুক্ত।
2. **লিটমাসের বর্ণবদল:** এসিডের জলীয় দ্রবণ নীল লিটমাসকে লাল করে (**অ-নী-লা**)।
3. **সক্রিয় ধাতুর সাথে বিক্রিয়া:** ম্যাগনেসিয়াম ($Mg$), জিংক ($Zn$), আয়রন ($Fe$) প্রভৃতি সক্রিয় ধাতুর সাথে লঘু এসিড তীব্রভাবে বিক্রিয়া করে ধাতব লবণ ও **হাইড্রোজেন গ্যাস ($H_2$)** উৎপন্ন করে:
$$Zn(s) + 2HCl(aq) \\longrightarrow ZnCl_2(aq) + H_2(g)\\uparrow$$
$$Mg(s) + H_2SO_4(aq) \\longrightarrow MgSO_4(aq) + H_2(g)\\uparrow$$
4. **ধাতু কার্বনেটের সাথে বিক্রিয়া:** ধাতব কার্বনেট ও বাইকার্বনেটের সাথে এসিডের বিক্রিয়ায় লবণ, পানি ও **কার্বন ডাই-অক্সাইড গ্যাস ($CO_2$)** নির্গত হয়:
$$CaCO_3(s) + 2HCl(aq) \\longrightarrow CaCl_2(aq) + H_2O(l) + CO_2(g)\\uparrow$$
উৎপন্ন $CO_2$ গ্যাস পরিষ্কার চুনের পানিতে চালনা করলে অদ্রবণীয় ক্যালসিয়াম কার্বনেটের সাদা অধঃক্ষেপ পড়ে পানি ঘোলা হয়:
$$CO_2(g) + Ca(OH)_2(aq) \\longrightarrow CaCO_3(s)\\downarrow + H_2O(l)$$

### ক্ষারকের বৈশিষ্ট্য এবং ক্ষার বনাম ক্ষারক (Bases and Alkalis)
ক্ষারক হলো ধাতব অক্সাইড বা হাইড্রোক্সাইড যৌগ যা এসিডকে প্রশমিত করে লবণ ও পানি উৎপন্ন করে ($NaOH, KOH, CaO, Fe(OH)_3$)।
1. **স্বাদ ও স্পর্শ:** ক্ষারক কটু স্বাদযুক্ত এবং সাবানের মতো পিচ্ছিল।
2. **লিটমাস পরীক্ষা:** ক্ষারক লাল লিটমাসকে নীল করে (**ক্ষা-লা-নী**)।
3. **ক্ষার বনাম ক্ষারক অনুধাবন:** যেসব ক্ষারক **পানিতে সম্পূর্ণ দ্রবণীয়**, কেবল তাদেরই **ক্ষার (Alkali)** বলে। যেমন—$NaOH, KOH$ ক্ষারক ও ক্ষার উভয়ই। কিন্তু $Fe(OH)_3, Al(OH)_3$ পানিতে অদ্রবণীয় হওয়ায় এরা শুধুই ক্ষারক, ক্ষার নয়। তাই বলা হয়: *"সকল ক্ষারই ক্ষারক, কিন্তু সকল ক্ষারক ক্ষার নয়।"*
      `.trim(),
      interactiveWidgetUrl: SIMULATION_URL,
      importantTerms: [
        {
          termBangla: 'এসিড (অম্ল)',
          termEnglish: 'Acid',
          definition: 'যে যৌগ জলীয় দ্রবণে হাইড্রোজেন আয়ন (H⁺) দেয় এবং নীল লিটমাসকে লাল করে।',
        },
        {
          termBangla: 'ক্ষারক',
          termEnglish: 'Base',
          definition: 'ধাতু বা অধাতব মূলকের অক্সাইড ও হাইড্রোক্সাইড যা এসিডের সাথে বিক্রিয়ায় লবণ ও পানি উৎপন্ন করে।',
        },
        {
          termBangla: 'ক্ষার',
          termEnglish: 'Alkali',
          definition: 'পানিতে দ্রবণীয় ক্ষারক যা জলীয় দ্রবণে হাইড্রোক্সাইড আয়ন (OH⁻) ত্যাগ করে।',
        },
      ],
      workedExample: {
        problem: 'ডিমের খোসায় লঘু হাইড্রোক্লোরিক এসিড যোগ করলে গ্যাস নির্গত হয় কেন?',
        stepByStepSolution:
          'ডিমের খোসার মূল উপাদান ক্যালসিয়াম কার্বনেট (CaCO₃)। এতে লঘু HCl যোগ করলে বিক্রিয়া ঘটে: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑। নির্গত গ্যাসটি হলো কার্বন ডাই-অক্সাইড (CO₂), যা চুনের পানিকে দুধের মতো ঘোলা করে।',
      },
      memoryAid: 'মনে রাখার ছন্দ: "অ-নী-লা" (অম্ল নীলকে লাল করে) বনাম "ক্ষা-লা-নী" (ক্ষারক লালকে নীল করে)।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 9.2: তীব্র ও দুর্বল এসিড এবং ক্ষারক
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch9_2',
    chapter9.id,
    2,
    '৯.২ তীব্র ও দুর্বল এসিড এবং ক্ষারক',
    'les_ssc_chemistry_ch9_2',
    {
      titleBangla: 'আয়নন মাত্রা ও তীব্র বনাম দুর্বল এসিড-ক্ষারক',
      learningGoal:
        'বিয়োজন মাত্রা (α) এর ভিত্তিতে তীব্র এসিড (HCl, HNO₃, H₂SO₄) ও দুর্বল এসিড (CH₃COOH, H₂CO₃) এবং তীব্র ক্ষারক (NaOH) ও দুর্বল ক্ষারকের (NH₄OH, Mg(OH)₂) আণবিক ও তড়িৎ পরিবাহিতার তুলনা।',
      explanation: `
### বিয়োজন মাত্রা বা আয়নন মাত্রা (Degree of Ionization, $\\alpha$)
পানিতে এসিড বা ক্ষারক কতটুকু আয়নিত হচ্ছে তার পরিমাপকে বিয়োজন মাত্রা বলে:
$$\\alpha = \\frac{\\text{বিয়োজিত অণুর সংখ্যা}}{\\text{মোট দ্রবীভূত অণুর সংখ্যা}}$$

### তীব্র এসিড (Strong Acids)
যেসব এসিড জলীয় দ্রবণে প্রায় ১০০% আয়নিত হয় ($\\alpha \\approx 1$), তাদের তীব্র এসিড বলে। এদের সমীকরণে একমুখী তীর ($\\rightarrow$) ব্যবহৃত হয়:
$$HCl(aq) \\longrightarrow H^+(aq) + Cl^-(aq)$$
$$H_2SO_4(aq) \\longrightarrow 2H^+(aq) + SO_4^{2-}(aq)$$
$$HNO_3(aq) \\longrightarrow H^+(aq) + NO_3^-(aq)$$

### দুর্বল এসিড (Weak Acids)
যেসব এসিড জলীয় দ্রবণে খুব সামান্য (সাধারণত ৫% এর কম) আয়নিত হয় ($\\alpha \\ll 1$), তাদের দুর্বল এসিড বলে। এদের সমীকরণে উভমুখী তীর ($\\rightleftharpoons$) ব্যবহৃত হয়:
$$CH_3COOH(aq) \\rightleftharpoons CH_3COO^-(aq) + H^+(aq)$$
$$H_2CO_3(aq) \\rightleftharpoons H^+(aq) + HCO_3^-(aq)$$

### তড়িৎ পরিবাহিতা তুলনা
তীব্র এসিড/ক্ষারক দ্রবণে মুক্ত আয়নের সংখ্যা বিপুল থাকে, ফলে বৈদ্যুতিক বাতি অত্যন্ত উজ্জ্বল শিখায় জ্বলে। পক্ষান্তরে দুর্বল এসিড/ক্ষারকে মুক্ত আয়নের সংখ্যা নগণ্য হওয়ায় বাতি টিমটিম করে মৃদু আলো দেয়।
      `.trim(),
      interactiveWidgetUrl: SIMULATION_URL,
      importantTerms: [
        {
          termBangla: 'আয়নন মাত্রা',
          termEnglish: 'Degree of Ionization',
          definition: 'দ্রবীভূত মোট এসিড বা ক্ষারক অণুর যে ভগ্নাংশ জলীয় দ্রবণে আয়নে বিয়োজিত হয়।',
        },
        {
          termBangla: 'তীব্র এসিড',
          termEnglish: 'Strong Acid',
          definition: 'জলীয় দ্রবণে সম্পূর্ণরূপে আয়নিত হয়ে সর্বোচ্চ পরিমাণ H⁺ মুক্তকারী এসিড।',
        },
        {
          termBangla: 'দুর্বল এসিড',
          termEnglish: 'Weak Acid',
          definition: 'জলীয় দ্রবণে আংশিক আয়নিত হয়ে সাম্যাবস্থা সৃষ্টিকারী এসিড।',
        },
      ],
      workedExample: {
        problem: '0.1 M HCl এবং 0.1 M CH₃COOH এর মধ্যে কোনটিতে বিদ্যুৎ পরিবাহিতা বেশি হবে?',
        stepByStepSolution:
          '0.1 M HCl তীব্র এসিড হওয়ায় ১০০% বিয়োজিত হয়ে দ্রবণে [H⁺] = 0.1 M মুক্ত আয়ন দেয়। পক্ষান্তরে 0.1 M CH₃COOH মাত্র ৪% বিয়োজিত হয়ে [H⁺] = 0.004 M দেয়। মুক্ত আয়নের ঘনত্ব বেশি থাকায় HCl দ্রবণে বিদ্যুৎ পরিবাহিতা প্রায় ২৫ গুণ বেশি হবে।',
      },
      memoryAid: 'খনিজ ৩ ভাই (HCl, HNO₃, H₂SO₄) শতভাগ মুক্ত তীব্র ভাই; জৈব এসিডে কার্বন থাকলেই আয়ননের গতি মৃদু হয়!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 9.3: নির্দেশক ও বর্ণ পরিবর্তন
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch9_3',
    chapter9.id,
    3,
    '৯.৩ নির্দেশক ও বর্ণ পরিবর্তন',
    'les_ssc_chemistry_ch9_3',
    {
      titleBangla: 'এসিড-ক্ষারক নির্দেশক ও সার্বজনীন নির্দেশকের বর্ণালি',
      learningGoal:
        'সাধারণ নির্দেশক (লিটমাস, মিথাইল অরেঞ্জ, ফেনলফথ্যালিন) এর বর্ণ পরিবর্তন পরিসর, নির্দেশকের মূলনীতি এবং সার্বজনীন নির্দেশক ও pH পেপার ব্যবহারের কৌশল।',
      explanation: `
### এসিড-ক্ষারক নির্দেশক (Indicators)
যেসব মৃদু জৈব এসিড ($HIn$) বা ক্ষারক নিজেদের বর্ণ পরিবর্তনের মাধ্যমে দ্রবণের অম্লত্ব, ক্ষারত্ব বা প্রশমনের সমাপ্তি বিন্দু চিহ্নিত করে, তাদের নির্দেশক বলে:
$$HIn(aq) \\text{ (অম্লীয় বর্ণ)} \\rightleftharpoons H^+(aq) + In^-(aq) \\text{ (ক্ষারীয় বর্ণ)}$$

### প্রধান নির্দেশকসমূহের বর্ণ পরিবর্তন ও pH পরিসর
1. **লিটমাস:** এসিডে লাল, ক্ষারকে নীল (pH ৫.০–৮.০, নিরপেক্ষ বেগুনি)।
2. **মিথাইল অরেঞ্জ:** এসিডে লালচে-গোলাপি, ক্ষারকে হলুদ (pH ৩.১–৪.৪, রূপান্তর বিন্দুতে কমলা)।
3. **মিথাইল রেড:** এসিডে লাল, ক্ষারকে হলুদ (pH ৪.২–৬.৩)।
4. **ফেনলফথ্যালিন:** এসিড ও প্রশমে বর্ণহীন, ক্ষারকে স্থায়ী গোলাপি (pH ৮.২–১০.০)।
5. **ব্রোমোথাইমল ব্লু:** এসিডে হলুদ, ক্ষারকে নীল, নিরপেক্ষ বিন্দুতে সবুজ (pH ৬.০–৭.৬)।

### সার্বজনীন নির্দেশক (Universal Indicator) ও pH পেপার
সার্বজনীন নির্দেশক হলো কয়েকটি নির্দেশকের সুষম মিশ্রণ, যা pH ১ থেকে ১৪ পর্যন্ত রংধনুর মতো ক্রমান্বয়ে সুনির্দিষ্ট বর্ণ দেখায়:
- pH ১–২: গাঢ় লাল (তীব্র অম্লীয়)
- pH ৩–৫: কমলা / হলুদ (মৃদু অম্লীয়)
- pH ৭: সবুজ (নিরপেক্ষ / প্রশম)
- pH ৮–১০: নীল (মৃদু ক্ষারীয়)
- pH ১১–১৪: বেগুনি (তীব্র ক্ষারীয়)
pH পেপার হলো এই সার্বজনীন নির্দেশকে ভেজানো স্ট্রিপ, যা দ্রবণে ডুবিয়ে সাথে থাকা চার্টের সাথে মিলিয়ে তাৎক্ষণিক pH জানা যায়।
      `.trim(),
      interactiveWidgetUrl: SIMULATION_URL,
      importantTerms: [
        {
          termBangla: 'নির্দেশক',
          termEnglish: 'Indicator',
          definition: 'যে রাসায়নিক পদার্থ নিজস্ব বর্ণ পরিবর্তনের মাধ্যমে বিক্রিয়ার সমাপ্তি বিন্দু প্রদর্শন করে।',
        },
        {
          termBangla: 'সার্বজনীন নির্দেশক',
          termEnglish: 'Universal Indicator',
          definition: 'বিভিন্ন নির্দেশকের মিশ্রণ যা pH ১ থেকে ১৪ স্কেলের প্রতিটি মানের জন্য ভিন্ন রঙ দেখায়।',
        },
        {
          termBangla: 'সমাপ্তি বিন্দু',
          termEnglish: 'End Point',
          definition: 'টাইট্রেশনের যে বিন্দুতে নির্দেশকের স্থায়ী বর্ণ পরিবর্তন ঘটে।',
        },
      ],
      workedExample: {
        problem: 'একটি দ্রবণে ফেনলফথ্যালিন যোগ করলে বর্ণহীন থাকে কিন্তু মিথাইল অরেঞ্জে লাল হয়—দ্রবণের pH সীমা কত?',
        stepByStepSolution:
          'ফেনলফথ্যালিন বর্ণহীন থাকা মানে pH < ৮.২। আবার মিথাইল অরেঞ্জ লাল বর্ণ দেখানোর অর্থ হলো pH < ৩.১। উভয় তথ্যের সমন্বয়ে নিশ্চিত হওয়া যায় যে দ্রবণটি একটি তীব্র অম্লীয় দ্রবণ এবং এর pH মান ৩.১ এর নিচে।',
      },
      memoryAid: 'ফেনলফথ্যালিন শর্টকাট: "ব-গো" (এসিডে বর্ণহীন, ক্ষারকে গোলাপি)।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 9.4: pH স্কেল ও মানবদেহ/কৃষিতে pH-এর গুরুত্ব
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch9_4',
    chapter9.id,
    4,
    '৯.৪ pH স্কেল ও মানবদেহ/কৃষিতে pH-এর গুরুত্ব',
    'les_ssc_chemistry_ch9_4',
    {
      titleBangla: 'গাণিতিক pH স্কেল ও জীবজগত/কৃষিতে এর কঠোর নিয়ন্ত্রণ',
      learningGoal:
        'pH ও pOH এর গাণিতিক হিসাব, পানির Kw সমীকরণ, রক্তের স্বাভাবিক pH ৭.৪, পাকস্থলী ও ত্বকের অ্যাসিড ম্যান্টল এবং কৃষিজমিতে মাটির অম্লত্ব নিরসনে চুনের ভূমিকা।',
      explanation: `
### pH স্কেলের গাণিতিক মূলনীতি (Sørensen, 1909)
কোনো দ্রবণে উপস্থিত হাইড্রোজেন আয়নের মোলার ঘনমাত্রার ঋণাত্মক লগারিদমকে pH বলে:
$$pH = -\\log_{10}[H^+] \\quad \\text{এবং} \\quad pOH = -\\log_{10}[OH^-]$$
$$25^\\circ\\text{C-এ বিশুদ্ধ পানির } K_w = [H^+][OH^-] = 1.0 \\times 10^{-14} \\implies pH + pOH = 14$$
- $pH < 7$: অম্লীয় দ্রবণ
- $pH = 7$: নিরপেক্ষ দ্রবণ
- $pH > 7$: ক্ষারীয় দ্রবণ
*লগারিদমিক তাৎপর্য:* প্রতি ১ একক pH হ্রাসে দ্রবণের $[H^+]$ ঘনমাত্রা **১০ গুণ বৃদ্ধি পায়**!

### মানবদেহে pH এর অপরিসীম ভূমিকা
1. **রক্ত (Blood):** রক্তের স্বাভাবিক pH **৭.৩৫–৭.৪৫** (গড় ৭.৪০)। বাফার সিস্টেম দ্বারা নিয়ন্ত্রিত এই মান ০.৫ এর বেশি উঠানামা করলেই মানুষের অবধারিত মৃত্যু ঘটে।
2. **পাকস্থলী (Stomach):** গ্যাস্ট্রিক রসে নিঃসৃত $HCl$-এর কারণে পাকস্থলীর pH **১.০–২.০** থাকে। এটি পেপসিন এনজাইম সক্রিয় করে এবং খাবারের ক্ষতিকর ব্যাকটেরিয়া ধ্বংস করে।
3. **ত্বক (Skin):** ত্বকের উপরিভাগে ঘাম ও তেলের অ্যাসিড ম্যান্টলের কারণে স্বাভাবিক pH **৪.৫–৫.৫** থাকে, যা ছত্রাক ও জীবাণু সংক্রমণ ঠেকায়।

### কৃষিক্ষেত্রে মাটির pH নিয়ন্ত্রণ
ফসলের স্বাভাবিক বৃদ্ধির জন্য মাটির আদর্শ pH হলো **৬.০ থেকে ৮.০**।
- **অম্লীয় মাটি ($pH < 6$):** জমিতে পুষ্টি শোষণে বিঘ্ন ঘটে। প্রতিকারে জমিতে ক্ষারকীয় পদার্থ **চুন ($CaO, Ca(OH)_2, CaCO_3$)** প্রয়োগ করে অম্লত্ব কমানো হয়।
- **ক্ষারীয় মাটি ($pH > 8$):** অণুপুষ্টির ঘাটতি দেখা দিলে জমিতে অম্লধর্মী সার যেমন **অ্যামোনিয়াম সালফেট [$(NH_4)_2SO_4$]** বা জিপসাম প্রয়োগ করা হয়।
      `.trim(),
      interactiveWidgetUrl: SIMULATION_URL,
      importantTerms: [
        {
          termBangla: 'pH স্কেল',
          termEnglish: 'pH Scale',
          definition: 'হাইড্রোজেন আয়নের ঘনমাত্রার ঋণাত্মক লগারিদম মান যা ০ থেকে ১৪ স্কেলে অম্লত্ব ও ক্ষারত্ব মাপে।',
        },
        {
          termBangla: 'বাফার দ্রবণ',
          termEnglish: 'Buffer Solution',
          definition: 'যে দ্রবণে সামান্য এসিড বা ক্ষার যোগ করলেও pH মান প্রায় অপরিবর্তিত থাকে।',
        },
        {
          termBangla: 'অ্যাসিড ম্যান্টল',
          termEnglish: 'Acid Mantle',
          definition: 'ত্বকের উপরিভাগের ঈষৎ অম্লীয় (pH ৪.৫–৫.৫) প্রাকৃতিক জীবাণুরোধী সুরক্ষা স্তর।',
        },
      ],
      workedExample: {
        problem: '0.005 M H₂SO₄ দ্রবণের pH মান কত?',
        stepByStepSolution:
          'H₂SO₄ তীব্র দ্বি-ক্ষারকীয় এসিড: H₂SO₄ → 2H⁺ + SO₄²⁻। সুতরাং [H⁺] = 2 × 0.005 M = 0.01 M = 10⁻² M। অতএব, pH = -log₁₀[H⁺] = -log₁₀(10⁻²) = 2.00।',
      },
      memoryAid: 'শরীরের ৩ সোনালী pH: রক্ত ৭.৪, পাকস্থলী ১-২, ত্বক ৫.৫!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 9.5: প্রশমন বিক্রিয়া ও ব্যবহারিক প্রয়োগ
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch9_5',
    chapter9.id,
    5,
    '৯.৫ প্রশমন বিক্রিয়া ও ব্যবহারিক প্রয়োগ',
    'les_ssc_chemistry_ch9_5',
    {
      titleBangla: 'প্রশমন বিক্রিয়া, টাইট্রেশন ও দৈনন্দিন জীবনে রসায়ন',
      learningGoal:
        'প্রশমন বিক্রিয়ার প্রকৃত আয়নিক সমীকরণ (H⁺ + OH⁻ → H₂O), স্থির প্রশমন তাপ (ΔH = -57.34 kJ), ব্যুরেট টাইট্রেশনের গাণিতিক সমাধান এবং অ্যান্টাসিড, টুথপেস্ট ও ETP-তে প্রশমনের অপরিহার্য ভূমিকা।',
      explanation: `
### প্রশমন বিক্রিয়া ও ধ্রুব প্রশমন তাপ
এসিড ও ক্ষারকের পূর্ণ বিক্রিয়ায় অম্লত্ব ও ক্ষারত্ব বিলুপ্ত হয়ে লবণ ও পানি উৎপন্ন হওয়ার প্রক্রিয়াকে প্রশমন বলে:
$$HCl(aq) + NaOH(aq) \\longrightarrow NaCl(aq) + H_2O(l)$$
দর্শক আয়ন বাদ দিলে যেকোনো তীব্র এসিড ও তীব্র ক্ষারকের প্রকৃত বিক্রিয়া:
$$H^+(aq) + OH^-(aq) \\longrightarrow H_2O(l) \\quad \\Delta H = -57.34\\text{ kJ/mol}$$
যেহেতু সর্বদা ১ মোল পানি গঠিত হয়, তাই তীব্র এসিড ও ক্ষারকের প্রশমন তাপ সর্বদা ধ্রুবক থাকে।

### এসিড-ক্ষার টাইট্রেশন (Titration)
প্রমাণ দ্রবণের সাহায্যে অজানা ঘনমাত্রার এসিড বা ক্ষারকের ঘনমাত্রা নির্ণয় পদ্ধতি:
$$\\frac{V_A \\times S_A}{a} = \\frac{V_B \\times S_B}{b}$$

### প্রাত্যহিক জীবনে প্রশমনের প্রয়োগ
1. **অ্যান্টাসিড (Antacid):** পাকস্থলীর অতিরিক্ত $HCl$ প্রশমিত করতে মৃদু ক্ষারক ম্যাগনেসিয়াম হাইড্রোক্সাইড [$Mg(OH)_2$] ও অ্যালুমিনিয়াম হাইড্রোক্সাইড [$Al(OH)_3$] খাওয়া হয়।
2. **টুথপেস্ট:** মুখের ব্যাকটেরিয়ার তৈরি এসিড দাঁতের এনামেল ক্ষয় করে। ক্ষারকীয় টুথপেস্ট এসিড প্রশমিত করে দাঁত রক্ষা করে।
3. **মৌমাছি ও বোলতার কামড়:** মৌমাছির হুলে অম্লীয় ফর্মিক এসিড ($HCOOH$) থাকে, যা চুন বা খাবার সোডা দিয়ে প্রশমিত হয়। বোলতার বিষ ক্ষারকীয় হওয়ায় এতে অম্লধর্মী ভিনেগার দিতে হয়।
4. **শিল্প বর্জ্য শোধন (ETP):** কারখানার অম্লীয় তরল বর্জ্যে চুন মিশিয়ে pH নিরপেক্ষ (৭.০) করে নদীতে নিষ্কাশন করা হয়।
      `.trim(),
      interactiveWidgetUrl: SIMULATION_URL,
      importantTerms: [
        {
          termBangla: 'প্রশমন তাপ',
          termEnglish: 'Heat of Neutralization',
          definition: 'নির্দিষ্ট তাপমাত্রায় ১ মোল এসিড ও ১ মোল ক্ষারকের বিক্রিয়ায় ১ মোল পানি তৈরিতে নির্গত তাপ (-57.34 kJ)।',
        },
        {
          termBangla: 'টাইট্রেশন',
          termEnglish: 'Titration',
          definition: 'প্রমাণ দ্রবণের সাহায্যে অজানা দ্রবণের ঘনমাত্রা নির্ণয়ের আয়তনিক রাসায়নিক পরীক্ষা।',
        },
        {
          termBangla: 'ETP',
          termEnglish: 'Effluent Treatment Plant',
          definition: 'শিল্প বর্জ্য শোধনাগার যেখানে এসিড-ক্ষার প্রশমনের মাধ্যমে দূষিত পানিকে পরিবেশবান্ধব করা হয়।',
        },
      ],
      workedExample: {
        problem: '20 mL 0.1 M HCl দ্রবণকে প্রশমিত করতে কত আয়তন 0.2 M NaOH প্রয়োজন?',
        stepByStepSolution:
          'HCl + NaOH → NaCl + H₂O। সমীকরণে a = 1, b = 1। সুতরাং VA × SA = VB × SB ⇒ 20 mL × 0.1 M = VB × 0.2 M ⇒ VB = (20 × 0.1) / 0.2 = 10.0 mL। অতএব ১০ mL ক্ষারক প্রয়োজন।',
      },
      memoryAid: 'মৌমাছি হুলে এসিড বিষ (দাও চুন); বোলতার বিষে ক্ষার (দাও ভিনেগার)!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 9.6: এসিড বৃষ্টি, ক্ষতিকর প্রভাব ও পানির খরতা
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch9_6',
    chapter9.id,
    6,
    '৯.৬ এসিড বৃষ্টি, ক্ষতিকর প্রভাব ও পানির খরতা',
    'les_ssc_chemistry_ch9_6',
    {
      titleBangla: 'এসিড বৃষ্টি, স্টোন ক্যান্সার ও খর পানি দূরীকরণ প্রযুক্তি',
      learningGoal:
        'এসিড বৃষ্টির রাসায়নিক সমীকরণ, মার্বেল পাথরে স্টোন ক্যান্সার, খর পানি বনাম মৃদু পানি এবং স্ফুটন ও সোডা পদ্ধতিতে অস্থায়ী ও স্থায়ী খরতা দূরীকরণ।',
      explanation: `
### এসিড বৃষ্টি (Acid Rain)
বৃষ্টির পানির স্বাভাবিক pH প্রায় ৫.৬। কিন্তু বায়ুমণ্ডলে কয়লা ও তেলের ধোঁয়া থেকে নির্গত সালফার ডাই-অক্সাইড ($SO_2$) ও নাইট্রোজেন ডাই-অক্সাইড ($NO_2$) বৃষ্টির পানির সাথে বিক্রিয়ায় সালফিউরিক ও নাইট্রিক এসিড তৈরি করে পানির pH ৫.৬ এর নিচে নামিয়ে দিলে তাকে এসিড বৃষ্টি বলে:
$$2SO_2(g) + O_2(g) + 2H_2O(l) \\longrightarrow 2H_2SO_4(aq)$$
$$4NO_2(g) + O_2(g) + 2H_2O(l) \\longrightarrow 4HNO_3(aq)$$

### মার্বেল পাথরের ক্ষয় (স্টোন ক্যান্সার)
তাজমহলসহ মার্বেল সৌধের $CaCO_3$ এসিড বৃষ্টির সালফিউরিক এসিড দ্বারা ক্ষয়প্রাপ্ত হয়ে জিপসামে রূপ নেয় ও খসখসে হলুদ হয়:
$$CaCO_3(s) + H_2SO_4(aq) \\longrightarrow CaSO_4(s) + H_2O(l) + CO_2(g)\\uparrow$$

### পানির খরতা (Hardness of Water)
পানিতে $Ca^{2+}, Mg^{2+}, Fe^{2+}$ আয়নের উপস্থিতিতে সাবান সহজে ফেনা না দিয়ে ছিবড়া ফেললে তাকে খর পানি বলে।
1. **অস্থায়ী খরতা:** ক্যালসিয়াম ও ম্যাগনেসিয়াম বাইকার্বনেট [$Ca(HCO_3)_2$] এর কারণে সৃষ্ট। **কেবল পানি ফুটালেই দূর হয়:**
$$Ca(HCO_3)_2(aq) \\xrightarrow{\\Delta} CaCO_3(s)\\downarrow + H_2O(l) + CO_2(g)\\uparrow$$
2. **স্থায়ী খরতা:** ক্যালসিয়াম ও ম্যাগনেসিয়ামের ক্লোরাইড ও সালফেট লবণ ($CaCl_2, MgSO_4$) দ্বারা সৃষ্ট। সাধারণ স্ফুটনে দূর হয় না। **কাপড় কাঁচা সোডা ($Na_2CO_3$) বা পারমুটিট (Zeolite) পদ্ধতিতে দূর করা হয়:**
$$CaCl_2(aq) + Na_2CO_3(aq) \\longrightarrow CaCO_3(s)\\downarrow + 2NaCl(aq)$$
      `.trim(),
      interactiveWidgetUrl: SIMULATION_URL,
      importantTerms: [
        {
          termBangla: 'এসিড বৃষ্টি',
          termEnglish: 'Acid Rain',
          definition: 'বায়ুমণ্ডলের SO₂ ও NO₂ দ্বারা সৃষ্ট যে বৃষ্টির পানির pH ৫.৬ এর নিচে নেমে পরিবেশের ক্ষতি করে।',
        },
        {
          termBangla: 'স্টোন ক্যান্সার',
          termEnglish: 'Stone Cancer',
          definition: 'এসিড বৃষ্টির কারণে মার্বেল পাথরের স্থাপত্যের ক্ষয় ও বিবর্ণ হয়ে যাওয়া।',
        },
        {
          termBangla: 'অস্থায়ী খরতা',
          termEnglish: 'Temporary Hardness',
          definition: 'পানিতে দ্রবীভূত বাইকার্বনেট লবণের কারণে সৃষ্ট খরতা যা কেবল পানি ফুটিয়ে দূর করা যায়।',
        },
      ],
      workedExample: {
        problem: 'পানির স্থায়ী খরতা দূর করতে সোডা পদ্ধতি কীভাবে কাজ করে সমীকরণসহ লেখো।',
        stepByStepSolution:
          'স্থায়ী খর পানিতে থাকা CaCl₂ বা MgSO₄ লবণে কাপড় কাঁচা সোডা (Na₂CO₃) যোগ করলে অদ্রবণীয় ক্যালসিয়াম কার্বনেট বা ম্যাগনেসিয়াম কার্বনেটের কঠিন তলানি পড়ে: CaCl₂ + Na₂CO₃ → CaCO₃↓ + 2NaCl। তলানি ছেঁকে ফেললে পানি মৃদু হয়।',
      },
      memoryAid: 'বাইকার্বনেট মানেই অস্থায়ী (ফুটালেই বাই বাই); ক্লোরাইড-সালফেট স্থায়ী (সোডা ছাড়া নাড়ে না)!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Seed Questions (Batch 1, 2, 3)
  // -------------------------------------------------------------------------
  console.log(`📝 Upserting ${chemistryChapter9AllQuestions.length} verified questions for Chapter 9...`);

  for (const q of chemistryChapter9AllQuestions) {
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
    'top_ssc_chemistry_ch9_1',
    'top_ssc_chemistry_ch9_2',
    'top_ssc_chemistry_ch9_3',
    'top_ssc_chemistry_ch9_4',
    'top_ssc_chemistry_ch9_5',
    'top_ssc_chemistry_ch9_6',
  ];

  await prisma.lesson.deleteMany({
    where: {
      topic: { chapterId: chapter9.id },
      topicId: { notIn: activeTopicIds },
    },
  });

  await prisma.topic.deleteMany({
    where: {
      chapterId: chapter9.id,
      id: { notIn: activeTopicIds },
    },
  });

  console.log(`✅ SSC Chemistry Chapter 9 seeded successfully (${chemistryChapter9AllQuestions.length} verified questions).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedChemistryChapter9(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Chemistry Chapter 9 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
