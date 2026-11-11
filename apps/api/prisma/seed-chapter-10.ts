import { PrismaClient, ContentStatus } from '@prisma/client';
import { chapter10QuestionsBatch1 } from './seed-chapter-10-questions';
import { chapter10QuestionsBatch2 } from './seed-chapter-10-questions-batch2';
import { chapter10QuestionsBatch3 } from './seed-chapter-10-questions-batch3';

export const chapter10AllQuestions = [
  ...chapter10QuestionsBatch1,
  ...chapter10QuestionsBatch2,
  ...chapter10QuestionsBatch3,
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

  const normalizedLesson = {
    ...lessonData,
    interactiveWidgetUrl: lessonData.interactiveWidgetUrl ?? null,
  };

  await prisma.lesson.upsert({
    where: { id: lessonId },
    update: {
      topicId,
      ...normalizedLesson,
      version: 1,
    },
    create: {
      id: lessonId,
      topicId,
      ...normalizedLesson,
      version: 1,
    },
  });
}

export async function seedChapter10(prisma: PrismaClient) {
  console.log('⚡ Seeding Chapter 10 (স্থির বিদ্যুৎ / Static Electricity)...');

  const chapter10 = await prisma.chapter.upsert({
    where: { id: 'chap_ssc_physics_ch10' },
    update: {
      subjectId: 'sub_ssc_physics',
      orderIndex: 10,
      titleBangla: 'দশম অধ্যায়: স্থির বিদ্যুৎ (Static Electricity)',
    },
    create: {
      id: 'chap_ssc_physics_ch10',
      subjectId: 'sub_ssc_physics',
      orderIndex: 10,
      titleBangla: 'দশম অধ্যায়: স্থির বিদ্যুৎ (Static Electricity)',
    },
  });

  // =========================================================================
  // 10.1 আধান বা চার্জ (Electric Charge)
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch10_1',
    chapter10.id,
    1,
    '১০.১ আধান বা চার্জ (Electric Charge)',
    'les_ssc_physics_ch10_1',
    {
      titleBangla: 'বৈদ্যুতিক আধান, কোয়ান্টায়ন ($Q = ne$) ও আধানের নিত্যতা',
      learningGoal:
        'পরমাণুতে প্রোটন-ইলেকট্রন, আধানের কোয়ান্টায়ন ($Q = \\pm ne$), আধানের নিত্যতা সূত্র এবং পরিবাহী, অন্তরক ও অর্ধপরিবাহীর পার্থক্য ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. বৈদ্যুতিক আধানের মৌলিক ধারণা
- পদার্থের মৌলিক কণিকা প্রোটনের আধান $+e = +1.6 \\times 10^{-19}\\,\\text{C}$ এবং ইলেকট্রনের আধান $-e = -1.6 \\times 10^{-19}\\,\\text{C}$ (SI একক: কুলম্ব $\\text{C}$)।
- কোনো বস্তুতে **ইলেকট্রনের ঘাটতি** হলে বস্তুটি ধনাত্মক ($+$) এবং **অতিরিক্ত ইলেকট্রন** এলে ঋণাত্মক ($-$) চার্জিত হয়। প্রোটন নিউক্লিয়াসে আবদ্ধ থাকায় স্থানান্তরিত হয় না।

### ২. আধানের কোয়ান্টায়ন ও নিত্যতা
- **কোয়ান্টায়ন:** প্রকৃতিতে যেকোনো মুক্ত আধান মৌলিক আধান $e$-এর পূর্ণসংখ্যা গুণিতক: $$Q = \\pm ne \\quad (n = 1, 2, 3, \\dots)$$
- **নিত্যতা:** আধান সৃষ্টি বা ধ্বংস হয় না; কেবল এক বস্তু থেকে অন্য বস্তুতে স্থানান্তরিত হয়।`,
      interactiveWidgetUrl: null,
      importantTerms: [
        {
          termBangla: 'আধানের কোয়ান্টায়ন',
          termEnglish: 'Charge Quantization',
          definition: 'যেকোনো মুক্ত আধান মৌলিক আধান e = 1.6 × 10⁻¹⁹ C-এর পূর্ণসংখ্যা গুণিতক (Q = ±ne)।',
        },
        {
          termBangla: 'আধানের নিত্যতা',
          termEnglish: 'Conservation of Charge',
          definition: 'বিচ্ছিন্ন ব্যবস্থায় মোট আধান সর্বদা ধ্রুব থাকে।',
        },
        {
          termBangla: 'পরিবাহী ও অন্তরক',
          termEnglish: 'Conductor & Insulator',
          definition: 'মুক্ত ইলেকট্রন থাকলে পরিবাহী (তামা, লোহা); না থাকলে অন্তরক (কাচ, প্লাস্টিক, শুকনো কাঠ)।',
        },
      ],
      workedExample: {
        problem: 'কোনো পরিবাহীতে $-1\\,\\text{C}$ আধান তৈরি করতে হলে বাইরে থেকে কতটি অতিরিক্ত ইলেকট্রন দিতে হবে?',
        stepByStepSolution:
          'কোয়ান্টায়নের সূত্র $Q = ne$ থেকে $n = \\dfrac{Q}{e} = \\dfrac{1}{1.6 \\times 10^{-19}} = 6.25 \\times 10^{18}$ টি ইলেকট্রন।',
      },
      memoryAid: 'কঠিন বস্তুতে ধনাত্মক চার্জ মানে প্রোটন আসা নয়—বরং ইলেকট্রন চলে যাওয়া! আর আধানের ক্ষুদ্রতম মুক্ত প্যাকেট হলো $e = 1.6 \\times 10^{-19}\\,\\text{C}$।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // =========================================================================
  // 10.2 ঘর্ষণে স্থির বিদ্যুৎ তৈরি (Static Electricity due to Friction)
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch10_2',
    chapter10.id,
    2,
    '১০.২ ঘর্ষণে স্থির বিদ্যুৎ তৈরি (Static Electricity due to Friction)',
    'les_ssc_physics_ch10_2',
    {
      titleBangla: 'ঘর্ষণের মাধ্যমে আধান সৃষ্টি ও শীতকালে স্থির বিদ্যুতের প্রভাব',
      learningGoal:
        'ঘর্ষণের ফলে ইলেকট্রন আসক্তির পার্থক্যে কীভাবে দুটি বস্তু সমান ও বিপরীত আধানে চার্জিত হয়, পরিচিত ঘর্ষণ জোড়া এবং শুষ্ক আবহাওয়ায় এর তীব্রতা ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. ঘর্ষণে স্থির বিদ্যুৎ সৃষ্টির কারণ
- দুটি ভিন্ন অন্তরক বস্তুকে পরস্পর ঘষলে যেটির ইলেকট্রন আসক্তি কম, তার পৃষ্ঠ থেকে মুক্ত বা শিথিল ইলেকট্রন অন্য বস্তুতে চলে যায়। ফলে একটি বস্তু ধনাত্মক ($+$) ও অপরটি সমপরিমাণ ঋণাত্মক ($-$) চার্জ লাভ করে।

### ২. পাঠ্যবইয়ের পরিচিত ঘর্ষণ জোড়া
- **কাচ দণ্ড + রেশমি কাপড় (Silk):** কাচ **ধনাত্মক ($+$)** ও রেশম **ঋণাত্মক ($-$)** হয়।
- **প্লাস্টিক/ইবোনাইট দণ্ড + পশমি কাপড় (Flannel):** প্লাস্টিক/ইবোনাইট **ঋণাত্মক ($-$)** ও পশম **ধনাত্মক ($+$)** হয়।

### ৩. বাস্তব ঘটনা ও আবহাওয়ার প্রভাব
- শুষ্ক চুল আঁচড়ানো প্লাস্টিকের চিরুনি কাগজের টুকরোতে বিপরীত আধান আবিষ্ট করে তা আকর্ষণ করে।
- বর্ষাকালের আর্দ্র বাতাস জলীয়বাষ্পের কারণে সামান্য পরিবাহী হওয়ায় চার্জ দ্রুত ক্ষয় হয়ে যায়; কিন্তু **শীতকালের শুষ্ক বাতাস** ভালো অন্তরক হওয়ায় স্থির বিদ্যুৎ দীর্ঘক্ষণ স্থায়ী হয়।`,
      interactiveWidgetUrl: null,
      importantTerms: [
        {
          termBangla: 'ইলেকট্রন আসক্তি',
          termEnglish: 'Electron Affinity',
          definition: 'ইলেকট্রন ধরে রাখার প্রবণতা; ঘর্ষণে বেশি আসক্তির বস্তুটি ইলেকট্রন গ্রহণ করে ঋণাত্মক হয়।',
        },
        {
          termBangla: 'ঘর্ষণ তড়িৎ',
          termEnglish: 'Triboelectric Charging',
          definition: 'দুটি ভিন্ন বস্তুকে ঘষলে ইলেকট্রন স্থানান্তরের মাধ্যমে সমান ও বিপরীত আধান সৃষ্টি।',
        },
      ],
      workedExample: {
        problem: 'শীতের সকালে প্লাস্টিকের চিরুনি দিয়ে শুষ্ক চুল আঁচড়ানোর পর চিরুনিটি ছোট নিরপেক্ষ কাগজের টুকরোকে আকর্ষণ করে কেন?',
        stepByStepSolution:
          'ঘর্ষণে চিরুনিটি ঋণাত্মক আধানে চার্জিত হয়। কাগজের টুকরোর কাছে ধরলে কাগজের নিকটপ্রান্তে ধনাত্মক ও দূরপ্রান্তে ঋণাত্মক আধান আবিষ্ট হয়। নিকটবর্তী বিপরীত আধানের আকর্ষণ বল দূরবর্তী বিকর্ষণের চেয়ে বেশি হওয়ায় কাগজ চিরুনিতে আকৃষ্ট হয়।',
      },
      memoryAid: 'কাচ-রেশমে কাচ হবে প্লাস ($+$), প্লাস্টিক-পশমে প্লাস্টিক মাইনাস ($-$); শুকনো শীতে স্থির বিদ্যুৎ দেখায় তার কারসাজ!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // =========================================================================
  // 10.3 বৈদ্যুতিক আবেশ ও ইলেকট্রোস্কোপ (Induction & Electroscope)
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch10_3',
    chapter10.id,
    3,
    '১০.৩ বৈদ্যুতিক আবেশ ও ইলেকট্রোস্কোপ (Induction & Electroscope)',
    'les_ssc_physics_ch10_3',
    {
      titleBangla: 'বৈদ্যুতিক আবেশ প্রক্রিয়া ও স্বর্ণপাত ইলেকট্রোস্কোপ',
      learningGoal:
        'স্পর্শ ছাড়াই আবেশ প্রক্রিয়ায় নিরপেক্ষ পরিবাহীকে স্থায়ীভাবে চার্জিত করার ৪টি ধাপ এবং স্বর্ণপাত ইলেকট্রোস্কোপ দিয়ে আধানের অস্তিত্ব ও প্রকৃতি (চিহ্ন) নির্ণয় করতে পারবে।',
      explanation: `### ১. বৈদ্যুতিক আবেশ (Electrical Induction)
স্পর্শ না করিয়ে চার্জিত বস্তু (আবেশী) কাছে এনে নিরপেক্ষ পরিবাহীর নিকটপ্রান্তে বিপরীত ও দূরপ্রান্তে সমধর্মী আধান আলাদা করার প্রক্রিয়াই বৈদ্যুতিক আবেশ।
- **স্থায়ী চার্জিংয়ের ৪ ধাপ:** (১) চার্জিত দণ্ড কাছে আনা, (২) দূরপ্রান্ত ভূ-সংযুক্ত (Earth) করা, (৩) **দণ্ড সরানোর আগেই** আর্থিং সংযোগ বিচ্ছিন্ন করা, (৪) আবেশী দণ্ড সরিয়ে নেওয়া $\\rightarrow$ পরিবাহীটি দণ্ডের **বিপরীত আধানে** চার্জিত থাকে।

### ২. স্বর্ণপাত তড়িৎবীক্ষণ যন্ত্র (Gold-Leaf Electroscope)
- পাতলা **স্বর্ণপাত** নমনীয় ও অত্যন্ত হালকা হওয়ায় সামান্য আধানেও বেশি ফাঁক দেখায়।
- চার্জিত ইলেকট্রোস্কোপের চাকতির কাছে কোনো বস্তু আনলে পাতের ফাঁক **বেড়ে যাওয়া** হলো বস্তুটিতে **সমধর্মী আধান থাকার ১০০% নিশ্চিত প্রমাণ** (কারণ ফাঁক কমতে থাকা বস্তু বিপরীত চার্জিত বা নিরপেক্ষ—উভয় কারণেই হতে পারে)।`,
      interactiveWidgetUrl: null,
      importantTerms: [
        {
          termBangla: 'বৈদ্যুতিক আবেশ',
          termEnglish: 'Electrical Induction',
          definition: 'স্পর্শ ছাড়া চার্জিত বস্তুর প্রভাবে নিরপেক্ষ পরিবাহীতে বিপরীত ও সমধর্মী আধানের বিভাজন।',
        },
        {
          termBangla: 'ইলেকট্রোস্কোপ',
          termEnglish: 'Electroscope',
          definition: 'স্বর্ণপাতের সাহায্যে কোনো বস্তুতে আধানের উপস্থিতি ও প্রকৃতি (চিহ্ন) শনাক্তকারী যন্ত্র।',
        },
      ],
      workedExample: {
        problem: 'আবেশ প্রক্রিয়ায় একটি নিরপেক্ষ ধাতব গোলককে স্থায়ীভাবে ধনাত্মক চার্জিত করতে হলে কী ধরনের আবেশী দণ্ড আনতে হবে এবং ভূ-সংযোগ কখন বিচ্ছিন্ন করতে হবে?',
        stepByStepSolution:
          'বিপরীত অর্থাৎ একটি **ঋণাত্মক চার্জিত** আবেশী দণ্ড কাছে আনতে হবে। গোলকের মুক্ত প্রান্ত আর্থিং করলে ঋণাত্মক ইলেকট্রন মাটিতে চলে যাবে; এরপর **আবেশী দণ্ড সরানোর আগেই** আর্থিং বিচ্ছিন্ন করতে হবে যাতে গোলকটি স্থায়ীভাবে ধনাত্মক থাকে।',
      },
      memoryAid: 'আবেশে মেলে বিপরীত চার্জ, আর্থিং কাটো দণ্ডের আগে; ইলেকট্রোস্কোপে পাতের ফাঁক বাড়া হলো সমআধানের নিশ্চিত ভাগে!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // =========================================================================
  // 10.4 বৈদ্যুতিক বল ও কুলম্বের সূত্র (Coulomb's Law)
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch10_4',
    chapter10.id,
    4,
    '১০.৪ বৈদ্যুতিক বল ও কুলম্বের সূত্র (Coulomb Law Lab)',
    'les_ssc_physics_ch10_4',
    {
      titleBangla: 'কুলম্বের সূত্র, মাধ্যমের প্রভাব ও আধান বণ্টন',
      learningGoal:
        'কুলম্বের সূত্র ($F = k\\frac{|q_1 q_2|}{r^2}$) ব্যবহার করে বিন্দু আধানের মধ্যবর্তী বল, দূরত্ব ও পরাবৈদ্যুতিক ধ্রুবকের ($\kappa$) প্রভাব এবং দুটি গোলক স্পর্শের পর বল গণনা করতে পারবে।',
      explanation: `### ১. কুলম্বের সূত্র (Coulomb's Law)
দুটি স্থির বিন্দু আধান $q_1$ ও $q_2$-এর মধ্যবর্তী দূরত্ব $r$ হলে পারস্পরিক আকর্ষণ বা বিকর্ষণ বল:
$$F = k\\frac{|q_1 q_2|}{r^2} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{|q_1 q_2|}{r^2}$$
- শূন্যস্থান বা বায়ু মাধ্যমে $k \\approx 9 \\times 10^9\\,\\text{N}\\cdot\\text{m}^2/\\text{C}^2$।
- **দূরত্বের প্রভাব:** দূরত্ব $n$ গুণ হলে বল $\\frac{1}{n^2}$ গুণ হয় (দূরত্ব অর্ধেক করলে বল ৪ গুণ)।
- **মাধ্যমের প্রভাব:** পরাবৈদ্যুতিক ধ্রুবক $\\kappa$ বিশিষ্ট মাধ্যমে রাখলে বল কমে $F_m = \\dfrac{F_{\\text{air}}}{\\kappa}$ হয়।
- **স্পর্শ ও বণ্টন:** অভিন্ন দুটি গোলকে $q_1, q_2$ আধান থাকলে স্পর্শের পর প্রত্যেকে $q' = \\dfrac{q_1 + q_2}{2}$ আধান লাভ করে।`,
      interactiveWidgetUrl: '/uploads/interactive/coulomb-electrostatics-lab.html',
      importantTerms: [
        {
          termBangla: 'কুলম্বের ধ্রুবক ($k$)',
          termEnglish: 'Coulomb Constant',
          definition: 'শূন্যস্থান বা বায়ু মাধ্যমে এর মান 9 × 10⁹ N·m²/C²।',
        },
        {
          termBangla: 'পরাবৈদ্যুতিক ধ্রুবক ($\\kappa$)',
          termEnglish: 'Dielectric Constant',
          definition: 'মাধ্যমে আধান দুটির বল শূন্যস্থানের তুলনায় যতগুণ কমে যায় (F_m = F/κ); পানির জন্য κ ≈ 80।',
        },
      ],
      workedExample: {
        problem: 'শূন্যস্থানে $+2\\,\\mu\\text{C}$ ও $-3\\,\\mu\\text{C}$ আধান $30\\,\\text{cm}$ দূরে থাকলে মধ্যকার বল কত?',
        stepByStepSolution:
          '$r = 0.30\\,\\text{m}$। $$F = \\dfrac{9 \\times 10^9 \\times (2 \\times 10^{-6})(3 \\times 10^{-6})}{(0.30)^2} = \\dfrac{0.054}{0.09} = 0.60\\,\\text{N}$$ (আকর্ষণমূলক)।',
      },
      memoryAid: 'সূত্রে বসানোর আগে $\\mu\\text{C}$ ($10^{-6}$) কে $\\text{C}$-তে ও $\\text{cm}$ ($10^{-2}$) কে $\\text{m}$-এ নিতে ভুলবে না!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // =========================================================================
  // 10.5 তড়িৎ ক্ষেত্র ও বলরেখা (Electric Field & Field Lines)
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch10_5',
    chapter10.id,
    5,
    '১০.৫ তড়িৎ ক্ষেত্র ও বলরেখা (Electric Field & Field Lines)',
    'les_ssc_physics_ch10_5',
    {
      titleBangla: 'তড়িৎ ক্ষেত্র প্রাবল্য, নিরপেক্ষ বিন্দু ও তড়িৎ বলরেখা',
      learningGoal:
        'তড়িৎ ক্ষেত্র প্রাবল্য ($E = F/q = k\\frac{|Q|}{r^2}$), বল ও প্রাবল্যের দিক সম্পর্ক ($\\vec{F} = q\\vec{E}$) এবং তড়িৎ বলরেখার বৈশিষ্ট্য ও দুই আধানের মাঝে নিরপেক্ষ বিন্দু নির্ণয় করতে পারবে।',
      explanation: `### ১. তড়িৎ ক্ষেত্র প্রাবল্য (Electric Field Intensity)
তড়িৎ ক্ষেত্রের কোনো বিন্দুতে $+1\\,\\text{C}$ আধান স্থাপন করলে সেটি যে বল অনুভব করে, তাকে তড়িৎ প্রাবল্য বলে:
$$E = \\frac{F}{q}, \\qquad E = k\\frac{|Q|}{r^2}$$
- প্রাবল্য একটি **ভেক্টর রাশি**, SI একক **$\\text{N/C}$** (বা $\\text{V/m}$)।
- ধনাত্মক আধান ক্ষেত্রের **দিকে** এবং ঋণাত্মক আধান (যেমন ইলেকট্রন) ক্ষেত্রের **বিপরীত দিকে** বল অনুভব করে।
- ফাঁপা পরিবাহী গোলকের পৃষ্ঠে আধান থাকলে তার **অভ্যন্তরে প্রাবল্য শূন্য ($E = 0$)**।

### ২. তড়িৎ বলরেখা (Electric Field Lines)
- বলরেখা **ধনাত্মক ($+$) আধান থেকে বের হয়ে ঋণাত্মক ($-$) আধানে** প্রবেশ করে।
- দুটি বলরেখা **কখনোই পরস্পরকে ছেদ করে না** এবং পরিবাহীর পৃষ্ঠে লম্বভাবে বের হয় বা ঢোকে।`,
      interactiveWidgetUrl: null,
      importantTerms: [
        {
          termBangla: 'তড়িৎ প্রাবল্য ($E$)',
          termEnglish: 'Electric Field Intensity',
          definition: 'কোনো বিন্দুতে একক ধনাত্মক আধানের ওপর ক্রিয়াশীল বল (E = F/q); এটি ভেক্টর রাশি।',
        },
        {
          termBangla: 'তড়িৎ বলরেখা',
          termEnglish: 'Electric Field Lines',
          definition: 'তড়িৎ ক্ষেত্রের দিক নির্দেশক কাল্পনিক রেখা যা পরস্পরকে কখনো ছেদ করে না।',
        },
      ],
      workedExample: {
        problem: 'শূন্যস্থানে $+4\\,\\mu\\text{C}$ বিন্দু আধান থেকে $20\\,\\text{cm}$ দূরে তড়িৎ ক্ষেত্র প্রাবল্য কত?',
        stepByStepSolution:
          '$r = 0.20\\,\\text{m}$। $$E = \\dfrac{9 \\times 10^9 \\times 4 \\times 10^{-6}}{(0.20)^2} = \\dfrac{3.6 \\times 10^4}{0.04} = 9 \\times 10^5\\,\\text{N/C}$$',
      },
      memoryAid: 'বিন্দুতে প্রাবল্য $E = F/q$: $+q$ যাবে ক্ষেত্রের দিকে, ইলেকট্রন ($-e$) যাবে ঠিক বিপরীতে; দুটি বলরেখা ছেদ করে না কোনো মতেই!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // =========================================================================
  // 10.6 তড়িৎ বিভব ও বিভব পার্থক্য (Electric Potential)
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch10_6',
    chapter10.id,
    6,
    '১০.৬ তড়িৎ বিভব ও বিভব পার্থক্য (Electric Potential & Difference)',
    'les_ssc_physics_ch10_6',
    {
      titleBangla: 'তড়িৎ বিভব, বিভব পার্থক্য, পৃথিবীর বিভব ও কৃতকাজ',
      learningGoal:
        'তড়িৎ বিভব ($V = W/q = kQ/r$) ও সুষম ক্ষেত্র ($\\Delta V = Ed$) বুঝতে পারবে এবং বিভব পার্থক্যে কৃতকাজ ($W = q\\Delta V$) ও মুক্ত ইলেকট্রনের প্রবাহের দিক নির্ণয় করতে পারবে।',
      explanation: `### ১. তড়িৎ বিভব ও বিভব পার্থক্য
অসীম থেকে $+1\\,\\text{C}$ ধনাত্মক আধানকে তড়িৎ ক্ষেত্রের কোনো বিন্দুতে আনতে কৃতকাজই **তড়িৎ বিভব**:
$$V = \\frac{W}{q}, \\qquad V = k\\frac{Q}{r}, \\qquad \\Delta V = E d$$
- বিভব একটি **স্কেলার রাশি**, SI একক **ভোল্ট ($\\text{V} = \\text{J/C}$)**।
- দুটি বিন্দুর বিভব পার্থক্য $\\Delta V$ হলে $q$ আধান সরাতে কৃতকাজ $W = q \\Delta V$।

### ২. পৃথিবীর বিভব ও চার্জ প্রবাহের দিক
- পৃথিবীর আকার বিশাল হওয়ায় এর বিভবকে **শূন্য ($0\\,\\text{V}$)** ধরা হয়।
- দুটি পরিবাহী তার দিয়ে যুক্ত করলে **মুক্ত ইলেকট্রন নিম্ন বিভব থেকে উচ্চ বিভবের** দিকে (অর্থাৎ প্রচলিত প্রবাহের বিপরীত দিকে) প্রবাহিত হয়ে বিভব সমান না হওয়া পর্যন্ত চলতে থাকে।`,
      interactiveWidgetUrl: null,
      importantTerms: [
        {
          termBangla: 'তড়িৎ বিভব ($V$)',
          termEnglish: 'Electric Potential',
          definition: 'অসীম থেকে +1 C আধান আনতে কৃতকাজ (V = W/q); এটি স্কেলার রাশি, একক ভোল্ট।',
        },
        {
          termBangla: 'পৃথিবীর বিভব',
          termEnglish: 'Earth Potential',
          definition: 'পৃথিবীকে শূন্য (0 V) বিভবের আধার হিসেবে ধরা হয়; আর্থিংয়ে চার্জ মাটির সাথে বিনিময় হয়।',
        },
      ],
      workedExample: {
        problem: 'একটি $5\\,\\mu\\text{C}$ আধানকে $200\\,\\text{V}$ বিভবের বিন্দু থেকে $500\\,\\text{V}$ বিভবের বিন্দুতে নিতে কৃতকাজ কত?',
        stepByStepSolution:
          'বিভব পার্থক্য $\\Delta V = 500 - 200 = 300\\,\\text{V}$।\nকৃতকাজ $W = q\\Delta V = (5 \\times 10^{-6}) \\times 300 = 1.5 \\times 10^{-3}\\,\\text{J}$।',
      },
      memoryAid: 'প্রাবল্য $E \\propto 1/r^2$ কিন্তু বিভব $V \\propto 1/r$! মুক্ত ইলেকট্রন দৌড়ায় নিম্ন বিভব থেকে উচ্চ বিভবের পানে!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // =========================================================================
  // 10.7 ধারক ও সঞ্চিত শক্তি (Capacitor & Stored Energy)
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch10_7',
    chapter10.id,
    7,
    '১০.৭ ধারক ও সঞ্চিত শক্তি (Capacitor & Stored Energy Lab)',
    'les_ssc_physics_ch10_7',
    {
      titleBangla: 'ধারক, ধারকত্ব ($C = Q/V$), সমান্তরাল পাত ধারক ও সঞ্চিত শক্তি',
      learningGoal:
        'ধারক ও ধারকত্ব ($C = Q/V$), সমান্তরাল পাত ধারকের ধারকত্ব ($C = \\kappa\\varepsilon_0 A/d$) এবং চার্জিত ধারকে সঞ্চিত শক্তি ($U = \\frac{1}{2}CV^2 = \\frac{1}{2}QV = \\frac{Q^2}{2C}$) হিসাব করতে পারবে।',
      explanation: `### ১. ধারক ও ধারকত্ব (Capacitor & Capacitance)
যেকোনো দুটি পরিবাহী পাতের মাঝখানে অন্তরক বা পরাবৈদ্যুতিক মাধ্যম রেখে আধান ও শক্তি সঞ্চয়ের যান্ত্রিক ব্যবস্থাকে **ধারক (Capacitor)** বলে।
- কোনো ধারকের বিভব $1\\,\\text{V}$ বাড়াতে প্রয়োজনীয় আধানই ধারকত্ব:
$$C = \\frac{Q}{V} \\quad (\\text{SI একক: ফ্যারাড } \\text{F};\\; 1\\,\\mu\\text{F} = 10^{-6}\\,\\text{F})$$
- **সমান্তরাল পাত ধারক:** $C = \\kappa\\varepsilon_0 \\dfrac{A}{d}$ — পাতের ক্ষেত্রফল $A$ বাড়ালে, দূরত্ব $d$ কমালে বা পরাবৈদ্যুতিক পদার্থ ($\kappa > 1$) দিলে ধারকত্ব বাড়ে।

### ২. ধারকে সঞ্চিত বৈদ্যুতিক শক্তি
$$U = \\frac{1}{2}QV = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C}$$
ব্যাটারি যুক্ত রেখে বিভব দ্বিগুণ করলে সঞ্চিত শক্তি $V^2$ অনুযায়ী **৪ গুণ** হয়।`,
      interactiveWidgetUrl: '/uploads/interactive/potential-capacitor-lab.html',
      importantTerms: [
        {
          termBangla: 'ধারকত্ব ($C$)',
          termEnglish: 'Capacitance',
          definition: 'একক বিভব বৃদ্ধিতে সঞ্চিত আধান (C = Q/V); একক ফ্যারাড (F)।',
        },
        {
          termBangla: 'সঞ্চিত শক্তি ($U$)',
          termEnglish: 'Stored Electrostatic Energy',
          definition: 'চার্জিত ধারকে সঞ্চিত শক্তি U = ½CV² = ½QV = Q²/(2C)।',
        },
      ],
      workedExample: {
        problem: 'একটি $20\\,\\mu\\text{F}$ ধারকে $10\\,\\text{V}$ বিভব পার্থক্য দিলে সঞ্চিত আধান ও শক্তি কত?',
        stepByStepSolution:
          '$Q = CV = (20 \\times 10^{-6}) \\times 10 = 200\\,\\mu\\text{C}$; এবং $U = \\frac{1}{2}CV^2 = \\frac{1}{2} \\times 20 \\times 10^{-6} \\times 100 = 10^{-3}\\,\\text{J} = 1\\,\\text{mJ}$।',
      },
      memoryAid: 'পাত বাড়াও বা দূরত্ব কমাও কিংবা ডাই-ইলেকট্রিক দাও—ধারকত্ব $C$ বাড়ে সবখানে; বিভব দ্বিগুণ করলে শক্তি $U$ বাড়ে চার গুণে!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // =========================================================================
  // 10.8 স্থির বিদ্যুতের ব্যবহার ও নিরাপত্তা (Uses & Safety)
  // =========================================================================
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch10_8',
    chapter10.id,
    8,
    '১০.৮ স্থির বিদ্যুতের ব্যবহার ও নিরাপত্তা (Uses of Static Electricity & Safety)',
    'les_ssc_physics_ch10_8',
    {
      titleBangla: 'ফটোকপি, ভ্যান ডি গ্রাফ, রং স্প্রে, বজ্রনিরোধক ও আর্থিং নিরাপত্তা',
      learningGoal:
        'স্থির বিদ্যুতের আধুনিক প্রযুক্তিগত প্রয়োগ (ফটোকপি মেশিন, ভ্যান ডি গ্রাফ জেনারেটর, স্থির বৈদ্যুতিক রং স্প্রে) এবং জ্বালানি ট্রাক, বিমান, ইলেকট্রনিক্স ESD ও বজ্রপাতের হাত থেকে সুরক্ষার কৌশল ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. উপকারী প্রযুক্তিগত প্রয়োগ
- **ফটোকপি মেশিন:** সেলেনিয়াম ড্রামের চার্জিত অংশে বিপরীত আকর্ষণে গুঁড়া কালি (টোনার) লেগে হুবহু প্রতিলিপি তৈরি হয়।
- **ভ্যান ডি গ্রাফ জেনারেটর:** চলন্ত বেল্ট দিয়ে ফাঁপা ধাতব গোলকের **বাইরের পৃষ্ঠে** চার্জ জমা করে লক্ষ লক্ষ ভোল্ট বিভব তৈরি করা হয়।
- **স্থির বৈদ্যুতিক রং স্প্রে:** একই চিহ্নের চার্জে রঙের কণা চারদিকে সমভাবে ছড়িয়ে পড়ে এবং ভূ-সংযুক্ত ধাতব গাড়িতে আকৃষ্ট হয়ে রঙের অপচয় ~৯০% কমায়।

### ২. বিপদ ও আর্থিং নিরাপত্তা
- **জ্বালানি ট্রাক ও বিমান:** ঘর্ষণে জমে থাকা আধান স্ফুলিঙ্গ সৃষ্টি করতে পারে; তাই ধাতব শিকল বা আর্থিং তার দিয়ে চার্জ মাটিতে পাঠানো হয়।
- **ইলেকট্রনিক্স (ESD):** মাইক্রোচিপ রক্ষায় অ্যান্টি-স্ট্যাটিক রিস্ট স্ট্র্যাপ ব্যবহার করা হয়।
- **বজ্রনিরোধক:** উঁচু ভবনের ছাদে **সুচালো** তামার দণ্ড মোটা তারের সাহায্যে গভীর মাটিতে যুক্ত থাকে যাতে বজ্রাঘাত নিরাপদে মাটিতে চলে যায়।`,
      interactiveWidgetUrl: null,
      importantTerms: [
        {
          termBangla: 'ফটোকপি টোনার',
          termEnglish: 'Photocopier Toner',
          definition: 'সেলেনিয়াম ড্রামের চার্জিত অংশে বিপরীত আকর্ষণে লেগে যাওয়া সূক্ষ্ম কালো গুঁড়া কালি।',
        },
        {
          termBangla: 'বজ্রনিরোধক দণ্ড',
          termEnglish: 'Lightning Arrester',
          definition: 'সুচালো তামার দণ্ড ও ভূ-সংযুক্ত মোটা তামার পাতের মাধ্যমে বজ্রাঘাত নিরাপদে মাটিতে পাঠানো।',
        },
        {
          termBangla: 'আর্থিং ও ESD সুরক্ষা',
          termEnglish: 'Earthing & ESD Protection',
          definition: 'জ্বালানি ট্রাক বা মাইক্রোচিপ মেরামতে অতিরিক্ত স্থির আধান মাটিতে পাঠিয়ে স্ফুলিঙ্গ রোধ।',
        },
      ],
      workedExample: {
        problem: 'উড়োজাহাজ বা পেট্রোলবাহী ট্রাকে জ্বালানি ভরার আগে অবশ্যই আর্থিং তার সংযুক্ত করতে হয় কেন?',
        stepByStepSolution:
          'বাতাস বা টায়ারের ঘর্ষণে যানবাহনে বিপুল স্থির আধান জমে থাকে। আর্থিং না করলে নোজেল স্পর্শের মুহূর্তে সৃষ্ট স্ফুলিঙ্গ (Spark) দাহ্য জ্বালানির বাষ্পে বিস্ফোরণ ঘটাতে পারে।',
      },
      memoryAid: 'বজ্রঝড়ে খোলা মাঠে বা উঁচু গাছের নিচে কখনোই দাঁড়াবে না; জানালা বন্ধ করা ধাতব গাড়ির ভেতর বা বজ্রনিরোধকযুক্ত পাকা ভবনে অবস্থান করবে।',
      status: ContentStatus.PUBLISHED,
    },
  );

  for (const q of chapter10AllQuestions) {
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

  console.log(`✅ Chapter 10 seeded (${chapter10AllQuestions.length} verified questions).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedChapter10(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Chapter 10 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
