import { PrismaClient, ContentStatus } from '@prisma/client';
import { chemistryChapter12QuestionsBatch1 } from './seed-chemistry-chapter-12-questions';
import { chemistryChapter12QuestionsBatch2 } from './seed-chemistry-chapter-12-questions-batch2';
import { chemistryChapter12QuestionsBatch3 } from './seed-chemistry-chapter-12-questions-batch3';

export const sscChemistrySubject = {
  id: 'sub_ssc_chemistry',
  code: 'ssc_chemistry',
  nameBangla: 'রসায়ন',
  classLevel: 'CLASS_9_10',
  program: 'SSC',
  syllabusYear: 2026,
  isReady: true,
};

export const chemistryChapter12AllQuestions = [
  ...chemistryChapter12QuestionsBatch1,
  ...chemistryChapter12QuestionsBatch2,
  ...chemistryChapter12QuestionsBatch3,
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

export async function seedChemistryChapter12(prisma: PrismaClient) {
  console.log('🧪 Seeding SSC Chemistry Chapter 12 (আমাদের জীবনে রসায়ন / Chemistry in Our Lives)...');

  await prisma.subject.upsert({
    where: { code: sscChemistrySubject.code },
    update: sscChemistrySubject,
    create: sscChemistrySubject,
  });

  const chapter12 = await prisma.chapter.upsert({
    where: { id: 'chap_ssc_chemistry_ch12' },
    update: {
      subjectId: sscChemistrySubject.id,
      orderIndex: 12,
      titleBangla: 'দ্বাদশ অধ্যায়: আমাদের জীবনে রসায়ন (Chemistry in Our Lives)',
    },
    create: {
      id: 'chap_ssc_chemistry_ch12',
      subjectId: sscChemistrySubject.id,
      orderIndex: 12,
      titleBangla: 'দ্বাদশ অধ্যায়: আমাদের জীবনে রসায়ন (Chemistry in Our Lives)',
    },
  });

  const widgetUrl = '/uploads/interactive/chemistry-in-daily-life-lab.html';

  // -------------------------------------------------------------------------
  // Topic 12.1: গৃহস্থালির রসায়ন
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch12_1',
    chapter12.id,
    1,
    '১২.১ গৃহস্থালির রসায়ন (খাবার লবণ, বেকিং পাউডার, ভিনেগার ও কোমল পানীয়)',
    'les_ssc_chemistry_ch12_1',
    {
      titleBangla: 'গৃহস্থালির রসায়ন (Household Chemistry)',
      learningGoal: 'খাবার লবণ (NaCl), বেকিং পাউডার, খাবার সোডা, ভিনেগার এবং কোমল পানীয়ের রাসায়নিক প্রস্তুতি, বিক্রিয়া ও খাদ্য সংরক্ষণের কৌশল ব্যাখ্যা করতে পারা।',
      explanation: `গৃহস্থালিতে ব্যবহৃত বিভিন্ন রাসায়নিক দ্রব্যের বিজ্ঞানভিত্তিক বিশ্লেষণ:
1. **খাবার লবণ ($NaCl$):** সমুদ্রের পানি আটকে শুকিয়ে সল্টবেডে অপরিশোধিত লবণ পাওয়া যায়। সম্পৃক্ত লবণের দ্রবণে $HCl$ গ্যাস চালনা করলে সাধারণ আয়ন ($Cl^-$) প্রভাবে বিশুদ্ধ $NaCl$ কেলাসিত হয়। গলগণ্ড রোগ প্রতিরোধে লবণে $KIO_3$ বা $KI$ মেশানো হয়।
2. **খাবার সোডা ও বেকিং পাউডার:**
   - খাবার সোডা হলো সোডিয়াম বাইকার্বনেট ($NaHCO_3$):
     $$NH_3 + CO_2 + H_2O \\rightarrow NH_4HCO_3$$
     $$NH_4HCO_3 + NaCl \\rightarrow NaHCO_3\\downarrow + NH_4Cl$$
   - উত্তপ্ত করলে: $2NaHCO_3 \\xrightarrow{\\Delta} Na_2CO_3 + H_2O + CO_2\\uparrow$
   - বেকিং পাউডারে খাবার সোডার সাথে টার্টারিক এসিড ($C_4H_6O_6$) মেশানো থাকে। টার্টারিক এসিড ক্ষারীয় $Na_2CO_3$-কে প্রশমিত করে তিক্ততা দূর করে এবং প্রচুর $CO_2$ গ্যাস তৈরি করে কেক ও পাউরুটিকে ফাঁপা ও নরম করে তোলে।
3. **ভিনেগার ($CH_3COOH$):** ইথানয়িক এসিডের ৪–১০% জলীয় দ্রবণ।
   $$CH_3CH_2OH + O_2 \\xrightarrow{\\text{Acetobacter}} CH_3COOH + H_2O$$
   এটি খাদ্যের pH কমিয়ে (< ৪.৫) অণুজীবের বৃদ্ধি প্রতিহত করে খাদ্য সংরক্ষণ করে।
4. **কোমল পানীয়:** উচ্চ চাপে পানিতে দ্রবীভূত $CO_2$ গ্যাস ($H_2CO_3$)। ছিপি খুললে চাপ কমে গ্যাস বুদবুদ আকারে বের হয়ে আসে।`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'খাবার লবণ', termEnglish: 'Table Salt', definition: 'সোডিয়াম ক্লোরাইড (NaCl); স্বাদবর্ধক ও শারীরবৃত্তীয় ইলেক্ট্রোলাইট।' },
        { termBangla: 'খাবার সোডা', termEnglish: 'Baking Soda', definition: 'সোডিয়াম হাইড্রোজেন কার্বনেট (NaHCO₃)।' },
        { termBangla: 'বেকিং পাউডার', termEnglish: 'Baking Powder', definition: 'খাবার সোডা ও টার্টারিক এসিডের শুষ্ক মিশ্রণ যা উত্তাপে CO₂ তৈরি করে কেক ফোলায়।' },
        { termBangla: 'ভিনেগার', termEnglish: 'Vinegar', definition: 'ইথানয়িক এসিডের ৪–১০% জলীয় দ্রবণ।' },
      ],
      workedExample: {
        problem: 'কেক বানানোর সময় কেবল খাবার সোডা ব্যবহার করলে কী অসুবিধা দেখা দেয় এবং টার্টারিক এসিড কীভাবে তা সমাধান করে?',
        stepByStepSolution: '১. খাবার সোডা উত্তাপে বিয়োজিত হয়ে ক্ষারীয় সোডিয়াম কার্বনেট (Na₂CO₃) উৎপন্ন করে: 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂↑।\\n২. Na₂CO₃ ক্ষারধর্মী হওয়ায় কেকের স্বাদ তিতা বা কটু হয়ে যায়।\\n৩. টার্টারিক এসিড যোগ করলে ক্ষারটি প্রশমিত হয়ে বর্ণহীন ও স্বাদহীন সোডিয়াম টার্টারেট লবণে পরিণত হয় এবং অতিরিক্ত CO₂ গ্যাস নির্গত হয়ে কেককে মিষ্টি, স্পঞ্জি ও নরম করে তোলে।',
      },
      memoryAid: 'সোডা একা তিতা ক্ষার, টার্টারিক দিলে কেক মিষ্টি স্পঞ্জি চমৎকার! ভিনেগার ৪ থেকে ১০ পার্সেন্ট অম্ল দ্রবণ।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 12.2: পরিষ্কার-পরিচ্ছন্নতার সামগ্রী
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch12_2',
    chapter12.id,
    2,
    '১২.২ পরিষ্কার-পরিচ্ছন্নতার সামগ্রী (টয়লেট ক্লিনার, সাবান, ডিটারজেন্ট ও ব্লিচিং পাউডার)',
    'les_ssc_chemistry_ch12_2',
    {
      titleBangla: 'পরিষ্কার-পরিচ্ছন্নতার সামগ্রী (Cleaning Agents)',
      learningGoal: 'টয়লেট ক্লিনার, ব্লিচিং পাউডার, সাবান (স্যাপোনিফিকেশন) এবং ডিটারজেন্টের রাসায়নিক প্রস্তুতি ও পরিষ্কারের কৌশল বিশ্লেষণ করতে পারা।',
      explanation: `প্রাত্যহিক জীবনে ব্যবহৃত পরিষ্কারক সামগ্রী:
1. **টয়লেট ক্লিনার:** প্রধান সক্রিয় উপাদান ক্ষারীয় কস্টিক সোডা ($NaOH$) এবং সোডিয়াম হাইপোক্লোরাইট ($NaOCl$)। $NaOH$ কমোডের চর্বি ও প্রোটিন ময়লাকে আর্দ্রবিশ্লেষিত করে দ্রবীভূত সাবানে পরিণত করে।
2. **ব্লিচিং পাউডার [$Ca(OCl)Cl$]:**
   - $40^\\circ C$ তাপমাত্রায় কলিচুনের ওপর ক্লোরিন গ্যাস চালনা করে তৈরি হয়:
     $$Ca(OH)_2 + Cl_2 \\xrightarrow{40^\\circ C} Ca(OCl)Cl + H_2O$$
   - বিরঞ্জন ও জীবাণুনাশক ক্রিয়া: পানির উপস্থিতিতে জায়মান অক্সিজেন ($[O]$) উৎপন্ন করে:
     $$Ca(OCl)Cl + H_2O \\rightarrow CaCl_2 + Ca(OH)_2 + 2HClO$$
     $$HClO \\rightarrow HCl + [O] \\text{ (জায়মান অক্সিজেন)}$$
     রঙিন যৌগ $+ [O] \\rightarrow$ বর্ণহীন যৌগ; জীবাণু $+ [O] \\rightarrow$ মৃত জীবাণু।
3. **সাবান (স্যাপোনিফিকেশন):** উচ্চতর ফ্যাটি এসিডের সোডিয়াম বা পটাসিয়াম লবণ।
   $$\\text{তেল/চর্বি (ট্রাইগ্লিসারাইড)} + 3NaOH \\xrightarrow{\\Delta} \\text{গ্লিসারিন} + 3\\text{সোডিয়াম স্টিয়ারেট (সাবান)}$$
   সম্পৃক্ত $NaCl$ যোগ করে সাবানকে ভাসিয়ে আলাদা করাকে **সল্টিং আউট** বলে। $KOH$ ব্যবহারে নরম গোসলের সাবান তৈরি হয়।
4. **ডিটারজেন্ট:** লরাইল অ্যালকোহলের সাথে গাঢ় $H_2SO_4$ বিক্রিয়ায় লরাইল হাইড্রোজেন সালফেট উৎপন্ন করে $NaOH$ দ্বারা প্রশমিত করলে **সোডিয়াম লরাইল সালফেট** ডিটারজেন্ট তৈরি হয়।`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'ব্লিচিং পাউডার', termEnglish: 'Bleaching Powder', definition: 'ক্যালসিয়াম ক্লোরো-হাইপোক্লোরাইট [Ca(OCl)Cl]; শক্তিশালী বিরঞ্জক ও জীবাণুনাশক।' },
        { termBangla: 'স্যাপোনিফিকেশন', termEnglish: 'Saponification', definition: 'তেল বা চর্বির ক্ষারীয় আর্দ্রবিশ্লেষণের মাধ্যমে সাবান ও উপজাত গ্লিসারিন তৈরির প্রক্রিয়া।' },
        { termBangla: 'সল্টিং আউট', termEnglish: 'Salting Out', definition: 'সাধারণ আয়ন প্রভাবে NaCl যোগ করে সাবানের দ্রাব্যতা কমিয়ে কেক আকারে আলাদা করার কৌশল।' },
        { termBangla: 'ডিটারজেন্ট', termEnglish: 'Detergent', definition: 'পেট্রোলিয়াম হাইড্রোকার্বন থেকে প্রস্তুত সিন্থেটিক সারফ্যাক্ট্যান্ট (যেমন সোডিয়াম লরাইল সালফেট)।' },
      ],
      workedExample: {
        problem: 'ব্লিচিং পাউডার প্রস্তুতিতে তাপমাত্রা ৪০ ডিগ্রি সেলসিয়াসের বেশি হলে কী ক্ষতি হবে?',
        stepByStepSolution: 'ব্লিচিং পাউডার তৈরির সুনির্দিষ্ট তাপমাত্রা ৪০°C। তাপমাত্রা এর বেশি হলে ক্লোরিনের সাথে বিক্রিয়ায় ক্যালসিয়াম ক্লোরেট [Ca(ClO₃)₂] উৎপন্ন হয়ে যায়। ফলে মূল ব্লিচিং পাউডারের উৎপাদন মারাত্মক ব্যাহত হয় এবং জীবাণু ধ্বংস ও বিরঞ্জন ক্ষমতা নষ্ট হয়ে যায়।',
      },
      memoryAid: '৪০°C এ ব্লিচিং পাউডার, জায়মান অক্সিজেনে দাগ ও জীবাণু সাফ! NaOH দিলে শক্ত সাবান, KOH দিলে নরম গোসল।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 12.3: সাবান ও ডিটারজেন্টের ময়লা পরিষ্কারের কৌশল
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch12_3',
    chapter12.id,
    3,
    '১২.৩ সাবান ও ডিটারজেন্টের ময়লা পরিষ্কারের কৌশল (Mechanism of Cleaning Dirt)',
    'les_ssc_chemistry_ch12_3',
    {
      titleBangla: 'ময়লা পরিষ্কারের আণবিক কৌশল ও মাইসেল (Cleaning Mechanism & Micelle)',
      learningGoal: 'সাবান-ডিটারজেন্ট অণুর দ্বি-ধর্মী গঠন (হাইড্রোফোবিক ও হাইড্রোফিলিক), মাইসেল গঠন এবং খর পানিতে সাবানের অকার্যকারিতা বনাম ডিটারজেন্টের শ্রেষ্ঠত্ব ব্যাখ্যা করতে পারা।',
      explanation: `সাবান ও ডিটারজেন্টের ময়লা পরিষ্কারের বৈজ্ঞানিক কৌশল:
1. **অণুর দ্বি-ধর্মী গঠন:**
   - **হাইড্রোফোবিক লেজ (অপোলার):** দীর্ঘ হাইড্রোকার্বন শৃঙ্খল ($-C_{17}H_{35}$)। এটি পানি-বিকর্ষী কিন্তু তেল-আকর্ষী।
   - **হাইড্রোফিলিক মাথা (পোলার):** আয়নিত প্রান্ত ($-COO^-Na^+$ বা $-SO_3^-Na^+$)। এটি পানি-আকর্ষী।
2. **মাইসেল (Micelle) গঠন:**
   পানিতে সাবান বা ডিটারজেন্ট যোগ করলে অপোলার লেজগুলো কাপড়ের তৈলাক্ত গ্রিজের ভেতর দ্রবীভূত হয়ে যায় এবং পোলার মাথাগুলো বাইরের পানিতে অবস্থান নেয়। এভাবে তেলের ফোঁটার চারপাশে শত শত অণু মিলে একটি গোলকাকার গুচ্ছ গঠন করে যাকে **মাইসেল** বলে। সমধর্মী ঋণাত্মক আধানের বিকর্ষণে এরা পুনরায় একত্রিত হতে পারে না। পানি নাড়াচাড়া করলে মাইসেল ময়লাসহ কাপড় থেকে আলগা হয়ে পানিতে প্রলম্বিত হয় এবং ধুয়ে চলে যায়।
3. **খর পানিতে আচরণ:**
   - খর পানিতে $Ca^{2+}$ ও $Mg^{2+}$ আয়ন থাকে।
   - সাবান বিক্রিয়া করে অদ্রবণীয় সাদা আঠালো অধঃক্ষেপ বা **স্কাম (Scum)** তৈরি করে অপচয় হয়:
     $$2C_{17}H_{35}COONa + Ca^{2+} \\rightarrow (C_{17}H_{35}COO)_2Ca\\downarrow + 2Na^+$$
   - কিন্তু ডিটারজেন্টের ক্যালসিয়াম ও ম্যাগনেসিয়াম লবণ পানিতে সম্পূর্ণ দ্রবণীয় হওয়ায় ডিটারজেন্ট খর পানিতেও দারুণ ফেনা তৈরি করে এবং নিখুঁত পরিষ্কার করে।`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'হাইড্রোফোবিক', termEnglish: 'Hydrophobic', definition: 'পানি-বিকর্ষী কিন্তু তেল ও চর্বির প্রতি তীব্র আকর্ষণযুক্ত অপোলার অংশ।' },
        { termBangla: 'হাইড্রোফিলিক', termEnglish: 'Hydrophilic', definition: 'পানি-আকর্ষী পোলার আয়নীয় প্রান্ত যা পানির সাথে হাইড্রোজেন ও আয়ন-ডাইপোল বন্ধন গড়ে তোলে।' },
        { termBangla: 'মাইসেল', termEnglish: 'Micelle', definition: 'তৈলাক্ত ময়লাকে আবদ্ধ করে গঠিত সাবান/ডিটারজেন্ট অণুর আণুবীক্ষণিক গোলাকার গুচ্ছ।' },
        { termBangla: 'স্কাম', termEnglish: 'Scum', definition: 'খর পানির ক্যালসিয়াম ও ম্যাগনেসিয়াম আয়নের সাথে সাবানের বিক্রিয়ায় উৎপন্ন অদ্রবণীয় আঠালো ছিবড়া।' },
      ],
      workedExample: {
        problem: 'নলকূপের পানিতে কাপড় কাচতে গিয়ে সাবান ঘষলে ফেনা হয় না কিন্তু ডিটারজেন্ট দিলে ফেনা হয় কেন?',
        stepByStepSolution: '১. নলকূপের পানিতে Ca²⁺ ও Mg²⁺ আয়ন থাকায় এটি খর পানি।\\n২. সাবানের সোডিয়াম স্টিয়ারেট খর পানির ক্যালসিয়ামের সাথে বিক্রিয়া করে অদ্রবণীয় ক্যালসিয়াম স্টিয়ারেট [(C₁₇H₃₅COO)₂Ca] বা স্কাম তৈরি করে। যতক্ষণ ক্যালসিয়াম আয়ন অবশিষ্ট থাকে ততক্ষণ কোনো ফেনা হয় না।\\n৩. পক্ষান্তরে, ডিটারজেন্টের ক্যালসিয়াম লবণ [(R-OSO₃)₂Ca] পানিতে সম্পূর্ণ দ্রবণীয়। কোনো অদ্রবণীয় তলানি না পড়ে ডিটারজেন্ট মুক্ত থাকে এবং খর পানিতেও স্বাভাবিকভাবে ফেনা তৈরি করে কাপড় পরিষ্কার করে।',
      },
      memoryAid: 'লেজ ঢোকে ময়লায়, মাথা থাকে জলে—মাইসেল বেঁধে ময়লা ভাসে পানির ঘূর্ণন তলে! খর পানিতে সাবান হারে, ডিটারজেন্ট বাজি মারে!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 12.4: কৃষিকাজে ব্যবহৃত রাসায়নিক দ্রব্য
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch12_4',
    chapter12.id,
    4,
    '১২.৪ কৃষিকাজে ব্যবহৃত রাসায়নিক দ্রব্য (ইউরিয়া, টিএসপি, ডিএপি ও বালাইনাশক)',
    'les_ssc_chemistry_ch12_4',
    {
      titleBangla: 'কৃষিকাজে রাসায়নিক সার ও বালাইনাশক (Agrochemicals)',
      learningGoal: 'ইউরিয়া, টিএসপি, ডিএপি, এমপি ও জিপসাম সারের রাসায়নিক প্রস্তুতি ও উদ্ভিদের পুষ্টিতে ভূমিকা এবং বালাইনাশকের পরিমিত ব্যবহার ব্যাখ্যা করতে পারা।',
      explanation: `কৃষিকাজে ব্যবহৃত প্রধান রাসায়নিক সার ও বালাইনাশক:
1. **ইউরিয়া সার [$CO(NH_2)_2$]:** উদ্ভিদের প্রধান নাইট্রোজেন পুষ্টির উৎস (শতকরা প্রায় ৪৬.৬% $N$)। উদ্ভিদের দৈহিক বৃদ্ধি ও ক্লোরোফিল সংশ্লেষণে অপরিহার্য।
   $$2NH_3 + CO_2 \\xrightarrow{180-200^\\circ C, 150-200\\text{ atm}} NH_2COONH_4 \\rightarrow NH_2CONH_2 + H_2O$$
   মাটিতে ব্যাক্টেরিয়ার ইউরিয়েজ এনজাইমের সহায়তায় ইউরিয়া আর্দ্রবিশ্লেষিত হয়ে $NH_4^+$ ও $NO_3^-$ আয়নে পরিণত হয়।
2. **টিএসপি সার (ট্রিপল সুপার ফসফেট):** সংকেত $Ca(H_2PO_4)_2\\cdot H_2O$। ফসফরাসের উৎস। উদ্ভিদের শিকড় বিস্তার, কাণ্ড মজবুত করা ও ফুল-ফল ধারণে আবশ্যক।
   $$Ca_3(PO_4)_2 + 4H_3PO_4 + 3H_2O \\longrightarrow 3[Ca(H_2PO_4)_2\\cdot H_2O]$$
3. **ডিএপি সার:** সংকেত $(NH_4)_2HPO_4$। একাধারে নাইট্রোজেন ও ফসফরাস উভয়ই সরবরাহ করে।
4. **এমপি (MOP):** পটাশিয়াম ক্লোরাইড ($KCl$)। পটাশিয়াম উদ্ভিদের খরা ও রোগ প্রতিরোধ ক্ষমতা বাড়ায়।
5. **জিপসাম:** সংকেত $CaSO_4\\cdot 2H_2O$। ক্যালসিয়াম ও সালফার সরবরাহ করে ডাল ও তৈলবীজের ফলন বাড়ায়।
6. **বালাইনাশক ও আইপিএম:** অতিরিক্ত কীটনাশক মিত্রকীট মৌমাছি ও কেঁচো ধ্বংস করে, মাটির উর্বরতা কমায় এবং পানিতে মিশে মাছ ধ্বংস করে। আইপিএম (সমন্বিত বালাই দমন) পদ্ধতিতে প্রাকৃতিক জৈবিক উপায়ে ক্ষতিকর পোকা নিয়ন্ত্রণ পরিবেশবান্ধব সমাধান।`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'ইউরিয়া সার', termEnglish: 'Urea Fertilizer', definition: 'CO(NH₂)₂; নাইট্রোজেনের প্রধান উৎস (৪৬.৬% N) যা পাতা ও কাণ্ডের অঙ্গজ বৃদ্ধি ঘটায়।' },
        { termBangla: 'টিএসপি সার', termEnglish: 'Triple Super Phosphate', definition: 'Ca(H₂PO₄)₂·H₂O; দ্রবণীয় ফসফরাস সার যা শিকড় বিস্তার ও ফুল-ফল ধারণ করায়।' },
        { termBangla: 'ডিএপি সার', termEnglish: 'Diammonium Phosphate', definition: '(NH₄)₂HPO₄; নাইট্রোজেন ও ফসফরাস উভয় সরবরাহকারী দ্বৈত পুষ্টির সার।' },
        { termBangla: 'আইপিএম', termEnglish: 'IPM', definition: 'Integrated Pest Management বা সমন্বিত বালাই দমন; রাসায়নিক বিষ এড়িয়ে পরিবেশবান্ধব পোকা দমন।' },
      ],
      workedExample: {
        problem: 'ইউরিয়া সারে নাইট্রোজেনের শতকরা সংযুতি নির্ণয় করো।',
        stepByStepSolution: 'ইউরিয়ার সংকেত: CO(NH₂)₂।\\nআণবিক ভর = ১২ + ১৬ + (১৪ × ২) + (১ × ৪) = ৬০ g/mol।\\nনাইট্রোজেনের মোট ভর = ১৪ × ২ = ২৮ g।\\nশতকরা সংযুতি %N = (২৮ / ৬০) × ১০০% = ৪৬.৬৭%।',
      },
      memoryAid: 'ইউরিয়ায় নাইট্রোজেন বৃদ্ধি করে পাতা, টিএসপিতে ফসফরাস মজবুত শিকড়ের খাতা, এমপিতে পটাশিয়াম রোগবালাই তাড়ায় যথা!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 12.5: শিল্প বর্জ্য ও পরিবেশ দূষণ
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch12_5',
    chapter12.id,
    5,
    '১২.৫ শিল্প বর্জ্য ও পরিবেশ দূষণ (Industrial Waste & Pollution)',
    'les_ssc_chemistry_ch12_5',
    {
      titleBangla: 'শিল্প বর্জ্য ও পরিবেশ দূষণ (Industrial Waste & Pollution)',
      learningGoal: 'ভারী ধাতু দূষণ, বায়োঅ্যাকুমুলেশন, এসিড বৃষ্টি, ইউট্রোফিকেশন, BOD, COD এবং ইটিপি (ETP) ব্যবস্থা বিশ্লেষণ করতে পারা।',
      explanation: `শিল্প কলকারখানার অপরিশোধিত বর্জ্য পরিবেশ ও জনস্বাস্থ্যের জন্য চরম হুমকি:
1. **ভারী ধাতু দূষণ ও বায়োঅ্যাকুমুলেশন:**
   - **পারদ ($Hg$):** জলজ মাছের মাধ্যমে মানবদেহে ঢুকে স্নায়ুতন্ত্র বিকল ও অন্ধত্ব সৃষ্টি করে (মিনামাটা রোগ)।
   - **সীসা ($Pb$):** মস্তিষ্কের বিকাশ বাধাগ্রস্ত করে এবং রক্তশূন্যতা সৃষ্টি করে।
   - **ক্যাডমিয়াম ($Cd$):** হাড় ভঙ্গুর ও তীব্র যন্ত্রণাদায়ক করে (ইতাই-ইতাই রোগ)।
   - **ক্রোমিয়াম ($Cr$):** ট্যানারি বর্জ্য থেকে ছড়ায়, ক্যান্সার ও চর্মরোগের কারণ।
2. **এসিড বৃষ্টি:** কলকারখানা ও কয়লার ধোঁয়া থেকে নির্গত $SO_2$ ও $NO_2$ বৃষ্টির পানির সাথে বিক্রিয়া করে $H_2SO_4$ ও $HNO_3$ উৎপন্ন করে:
   $$2SO_2 + O_2 + 2H_2O \\longrightarrow 2H_2SO_4$$
   $$4NO_2 + O_2 + 2H_2O \\longrightarrow 4HNO_3$$
   বৃষ্টির pH ৩.৫-৪.৫ এ নেমে আসে। মার্বেল পাথর ক্ষয়ে যায় (মার্বেল ক্যান্সার): $CaCO_3 + H_2SO_4 \\rightarrow CaSO_4 + H_2O + CO_2\\uparrow$।
3. **ইউট্রোফিকেশন ও অ্যালগাল ব্লুম:** জমিতে অতিরিক্ত ফসফেট ও নাইট্রেট সার জলাশয়ে পড়ে শৈবালের অতিবৃদ্ধি ঘটায়। শৈবাল পচানোর সময় ব্যাক্টেরিয়ার বিপুল দ্রবীভূত অক্সিজেন ($DO$) খরচের কারণে পানিতে অক্সিজেন শূন্য হয়ে মাছের মৃত্যু ঘটে।
4. **BOD ও COD:** BOD হলো জৈব বর্জ্য পচাতে ব্যাক্টেরিয়ার প্রয়োজনীয় অক্সিজেন এবং COD হলো সব বর্জ্য রাসায়নিকভাবে জারিত করতে প্রয়োজনীয় অক্সিজেন। BOD বেশি মানে পানি অধিক দূষিত। সর্বদা $\\text{COD} \\ge \\text{BOD}$।
5. **ইটিপি (ETP - Effluent Treatment Plant):** তরল বর্জ্য শোধনাগার যেখানে ভৌত ছাঁকন, রাসায়নিক প্রশমন ও কোয়াগুলেশন এবং জৈবিক ব্যাক্টেরিয়াল বিয়োজনের মাধ্যমে দূষণমুক্ত করে পানি নদীতে ফেলা হয়।`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'বায়োঅ্যাকুমুলেশন', termEnglish: 'Bioaccumulation', definition: 'খাদ্য শৃঙ্খলের প্রতিটি স্তরে অপচনশীল ভারী ধাতু জমা হয়ে ঘনমাত্রা বহুগুণ বৃদ্ধি পাওয়ার প্রক্রিয়া।' },
        { termBangla: 'এসিড বৃষ্টি', termEnglish: 'Acid Rain', definition: 'SO₂ ও NO₂ গ্যাস বৃষ্টির পানিতে দ্রবীভূত হয়ে সৃষ্ট অম্লীয় বৃষ্টিপাত (pH < ৫.৬)।' },
        { termBangla: 'ইউট্রোফিকেশন', termEnglish: 'Eutrophication', definition: 'অতিরিক্ত পুষ্টির কারণে জলাশয়ে শৈবালের অতিবৃদ্ধি ও দ্রবীভূত অক্সিজেন হ্রাসের পরিবেশ সংকট।' },
        { termBangla: 'ইটিপি', termEnglish: 'ETP', definition: 'Effluent Treatment Plant; কারখানার তরল বর্জ্য শোধন করার বিশেষ আধুনিক কারখানা ব্যবস্থা।' },
      ],
      workedExample: {
        problem: 'একটি নদীর পানির BOD পাওয়া গেল ১৫০ mg/L। এই পানিতে মাছ বাঁচতে পারছে না কেন এবং এর সমাধান কী?',
        stepByStepSolution: 'স্বাভাবিক পরিষ্কার নদীর পানির BOD হলো ১–৩ mg/L। ১৫০ mg/L এর অর্থ পানিতে বিপুল পরিমাণ পচনশীল জৈব বর্জ্য রয়েছে। এই বর্জ্য পচাতে ব্যাক্টেরিয়া পানিতে দ্রবীভূত অক্সিজেন (DO) সম্পূর্ণ খরচ করে ফেলেছে। ফলে অক্সিজেনের অভাবে মাছ দমবন্ধ হয়ে মারা যাচ্ছে। সমাধান: পার্শ্ববর্তী কারখানাগুলোতে কার্যকর ইটিপি (ETP) স্থাপন করে বর্জ্যের BOD মাত্রা নিরাপদ সীমার নিচে (< ৫০ mg/L) নামিয়ে এনে তবেই পানি নিষ্কাশন করতে হবে।',
      },
      memoryAid: 'পারদে মিনামাটা, ক্যাডমিয়ামে ইতাই-ইতাই, ক্রোমিয়ামে ট্যানারি দূষণ! এসিড বৃষ্টিতে মার্বেল ক্যান্সার, ইউট্রোফিকেশনে শৈবাল মন্থন!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 12.6: রাসায়নিক দ্রব্যের নিরাপদ ব্যবহার ও সতর্কতা
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_chemistry_ch12_6',
    chapter12.id,
    6,
    '১২.৬ রাসায়নিক দ্রব্যের নিরাপদ ব্যবহার ও সতর্কতা (Hazard Symbols & Safety)',
    'les_ssc_chemistry_ch12_6',
    {
      titleBangla: 'রাসায়নিক দ্রব্যের নিরাপদ ব্যবহার ও জনস্বাস্থ্য (Chemical Safety & Hazards)',
      learningGoal: 'আন্তর্জাতিক হ্যাজার্ড প্রতীক, ল্যাবরেটরির ব্যক্তিগত সুরক্ষা (PPE), খাদ্য সংরক্ষণে ফরমালিন ও কার্বাইডের অপব্যবহার এবং নিরাপদ প্রিজারভেটিভস এর গুরুত্ব বিশ্লেষণ করতে পারা।',
      explanation: `রাসায়নিক দ্রব্যের ঝুঁকি ও নিরাপদ ব্যবহার নীতিমালা:
1. **ল্যাবরেটরি সুরক্ষা (PPE):** রাসায়নিক নিয়ে কাজের সময় এপ্রন, সেফটি গগলস, হ্যান্ড গ্লাভস ও মাস্ক ব্যবহার বাধ্যতামূলক। বিষাক্ত গ্যাস তৈরিতে ফিউম হুড (Fume hood) ব্যবহার করতে হয়।
2. **এসিড লঘুকরণ সতর্কতা:** কখনো এসিডের পাত্রে পানি ঢালতে নেই। সর্বদা **পানির পাত্রে ধীরে ধীরে ফোঁটায় ফোঁটায় এসিড ঢেলে অবিরাম নাড়তে হয়**।
3. **আন্তর্জাতিক হ্যাজার্ড প্রতীক (GHS):**
   - বিস্ফোরক (বোমা ফাটার চিত্র) — টিএনটি, পারঅক্সাইড।
   - দাহ্য পদার্থ (শিখা) — অ্যালকোহল, পেট্রোলিয়াম।
   - জারক (বৃত্তের ওপর শিখা) — $KMnO_4, H_2O_2$।
   - বিষাক্ত (খুলি ও আড়াআড়ি হাড়) — সায়ানাইড, পারদ, আর্সেনিক।
   - ক্ষয়কারী (হাত ও পাত্রে তরল পড়ার চিত্র) — গাঢ় $H_2SO_4$, গাঢ় $NaOH$।
4. **খাদ্যে ক্ষতিকর রাসায়নিকের অপব্যবহার:**
   - **ফরমালিন:** ফরমালডিহাইডের ($HCHO$) ৩০–৪০% জলীয় দ্রবণ। প্রোটিন জমাট বাঁধিয়ে জীবাণু ধ্বংস করে। মাছ-দুধে অবৈধ ব্যবহারে লিভার-কিডনি ধ্বংস ও ক্যান্সার হয়।
   - **ক্যালসিয়াম কার্বাইড ($CaC_2$):** কাঁচা ফল কৃত্রিমভাবে পাকাতে অবৈধ ব্যবহার। উৎপন্ন এসিটিলিন গ্যাস ($C_2H_2$) ও কার্বাইডে থাকা আর্সেনিক স্নায়বিক বিকলতা ও ক্যান্সার ঘটায়।
   - **কাপড়ের রং:** টেক্সটাইল ডাই খাবারে মেশালে মারাত্মক ক্যান্সার হয়।
5. **নিরাপদ অনুমোদিত প্রিজারভেটিভস:**
   - প্রাকৃতিক: খাবার লবণ (প্লাজমোলাইসিস ঘটিয়ে জীবাণু ধ্বংস), চিনি, ভিনেগার।
   - অনুমোদিত রাসায়নিক: সোডিয়াম বেনজোয়েট ($C_6H_5COONa$ - মাত্রা < ০.১%) ও পটাশিয়াম মেটাবাইসালফাইট।`,
      interactiveWidgetUrl: widgetUrl,
      importantTerms: [
        { termBangla: 'ফরমালিন', termEnglish: 'Formalin', definition: 'মিথান্যালের (HCHO) ৩০–৪০% জলীয় দ্রবণ; জীবদেহের নমুনা সংরক্ষক, খাবারে মারাত্মক বিষ।' },
        { termBangla: 'ক্যালসিয়াম কার্বাইড', termEnglish: 'Calcium Carbide', definition: 'CaC₂; পানির সাথে বিক্রিয়ায় এসিটিলিন তৈরি করে ফল কৃত্রিমভাবে পাকায়।' },
        { termBangla: 'হ্যাজার্ড প্রতীক', termEnglish: 'Hazard Symbol', definition: 'রাসায়নিক দ্রব্যের পাত্রে আঁকা আন্তর্জাতিক বিপদ সংকেত চিত্র।' },
        { termBangla: 'সোডিয়াম বেনজোয়েট', termEnglish: 'Sodium Benzoate', definition: 'C₆H₅COONa; নির্দিষ্ট অনুমোদিত মাত্রায় নিরাপদ খাদ্য সংরক্ষক প্রিজারভেটিভ।' },
      ],
      workedExample: {
        problem: 'মাছে ফরমালিন স্প্রে করলে ব্যাক্টেরিয়া ধ্বংস হয় কেন এবং এটি মানুষের শরীরের জন্য কেন মারাত্মক ক্ষতিকর?',
        stepByStepSolution: '১. ফরমালিন হলো মিথান্যালের ৩০–৪০% দ্রবণ। ব্যাক্টেরিয়ার অপরিহার্য প্রোটিন এনজাইমের সাথে ফরমালিনের মিথান্যাল অণু বিক্রিয়া করে ক্রস-লিঙ্কিংয়ের মাধ্যমে প্রোটিনকে শক্ত ও জমাট বাঁধিয়ে ফেলে। ফলে ব্যাক্টেরিয়ার বিপাক ক্রিয়া বন্ধ হয়ে তা মারা যায়।\\n২. মানুষ যখন ফরমালিনযুক্ত মাছ খায়, তখন ফরমালিন মানুষের পাকস্থলী, যকৃৎ ও কিডনির সুস্থ কোষের প্রোটিন ও ডিএনএ-কেও একইভাবে নষ্ট করে। ফলে পাকস্থলীতে ঘা, লিভার সিরোসিস, কিডনি বিকল ও প্রাণঘাতী ক্যান্সার সৃষ্টি হয়।',
      },
      memoryAid: 'পানির মাঝে এসিড ঢালো ফোঁটায় ফোঁটায় ধীরে, এসিডে পানি ঢাললে বিপদ মুখে ফিরে! ফরমালিন মৃতদেহের জন্য, পেটে দিলে বিষ!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Upsert all 72 verified questions
  // -------------------------------------------------------------------------
  console.log(`📝 Upserting ${chemistryChapter12AllQuestions.length} verified questions for Chapter 12...`);

  for (const q of chemistryChapter12AllQuestions) {
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
    'top_ssc_chemistry_ch12_1',
    'top_ssc_chemistry_ch12_2',
    'top_ssc_chemistry_ch12_3',
    'top_ssc_chemistry_ch12_4',
    'top_ssc_chemistry_ch12_5',
    'top_ssc_chemistry_ch12_6',
  ];

  await prisma.lesson.deleteMany({
    where: {
      topic: { chapterId: chapter12.id },
      topicId: { notIn: activeTopicIds },
    },
  });

  await prisma.topic.deleteMany({
    where: {
      chapterId: chapter12.id,
      id: { notIn: activeTopicIds },
    },
  });

  console.log(`✅ SSC Chemistry Chapter 12 seeded successfully (${chemistryChapter12AllQuestions.length} questions, 6 topics, 6 lessons).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedChemistryChapter12(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Chemistry Chapter 12 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
