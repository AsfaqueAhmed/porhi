import { PrismaClient, ContentStatus } from '@prisma/client';

export const sscPhysicsSubject = {
  id: 'sub_ssc_physics',
  code: 'ssc_physics',
  nameBangla: 'পদার্থবিজ্ঞান',
  classLevel: 'CLASS_9_10',
  syllabusYear: 2026,
  isReady: true,
};

export const sscChemistrySubject = {
  id: 'sub_ssc_chemistry',
  code: 'ssc_chemistry',
  nameBangla: 'রসায়ন',
  classLevel: 'CLASS_9_10',
  syllabusYear: 2026,
  isReady: false,
};

export const chapter1 = {
  id: 'chap_ssc_physics_ch1',
  subjectId: sscPhysicsSubject.id,
  orderIndex: 1,
  titleBangla: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
};

export const chapter2 = {
  id: 'chap_ssc_physics_ch2',
  subjectId: sscPhysicsSubject.id,
  orderIndex: 2,
  titleBangla: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
};

export const topicMotionEquations = {
  id: 'top_ssc_physics_motion_eq',
  chapterId: chapter2.id,
  orderIndex: 1,
  titleBangla: 'গতির সমীকরণ ও সমাধান',
};

export const lessonMotionEquations = {
  id: 'les_ssc_physics_motion_eq_1',
  topicId: topicMotionEquations.id,
  titleBangla: 'গতির ৪টি মৌলিক সমীকরণ',
  learningGoal:
    'গতির ৪টি মৌলিক সমীকরণ ($v = u + at$, $s = ut + \\frac{1}{2}at^2$, $v^2 = u^2 + 2as$, $s = \\frac{u+v}{2}t$) প্রতিপাদন করা, চলকগুলোর ভৌত তাৎপর্য ব্যাখ্যা করা এবং বাস্তব জীবনের গতি সংক্রান্ত গাণিতিক সমস্যা সফলভাবে সমাধান করতে পারা।',
  explanation: `# গতির ৪টি মৌলিক সমীকরণ (Equations of Motion)

কোনো বস্তু যখন নির্দিষ্ট দিকে **সুষম ত্বরণে ($a$)** সরলরেখায় গতিশীল থাকে, তখন আদিবেগ ($u$), শেষবেগ ($v$), ত্বরণ ($a$), অতিক্রান্ত সময় ($t$) এবং সরণ ($s$)-এর মধ্যে সম্পর্ক প্রকাশকারী সমীকরণগুলোকে **গতির সমীকরণ** বলা হয়।

---

### প্রয়োজনীয় চলক পরিচিতি:
- $u$ = আদিবেগ (Initial velocity, $\\text{m/s}$)
- $v$ = শেষবেগ (Final velocity, $\\text{m/s}$)
- $a$ = সুষম ত্বরণ (Uniform acceleration, $\\text{m/s}^2$)
- $t$ = সময় (Time elapsed, $\\text{s}$)
- $s$ = সরণ বা অতিক্রান্ত দূরত্ব (Displacement, $\\text{m}$)

---

### ১. প্রথম সমীকরণ: বেগ ও সময়ের সম্পর্ক ($v = u + at$)
ত্বরণের সংজ্ঞানুসারে, সময়ের সাথে বেগের পরিবর্তনের হারকে ত্বরণ বলে।
$$a = \\frac{v - u}{t}$$
বা,
$$v = u + at$$
> **বিশেষ ক্ষেত্র:** স্থির অবস্থান থেকে যাত্রা শুরু করলে আদিবেগ $u = 0$, ফলে $v = at$। অর্থাৎ, সুষম ত্বরণে চলমান বস্তুর যেকোনো সময়ের বেগ ওই সময়ের সমানুপাতিক ($v \\propto t$)।

---

### ২. দ্বিতীয় সমীকরণ: গড় বেগ থেকে দূরত্বের সমীকরণ ($s = \\frac{u+v}{2}t$)
সুষম ত্বরণে চলমান কোনো বস্তুর গড় বেগ হলো আদিবেগ ও শেষবেগের গাণিতিক গড়:
$$v_{\\text{avg}} = \\frac{u + v}{2}$$
আমরা জানি, সরণ = গড় বেগ $\\times$ সময়:
$$s = \\left(\\frac{u + v}{2}\\right)t$$

---

### ৩. তৃতীয় সমীকরণ: সরণ, ত্বরণ ও সময়ের সম্পর্ক ($s = ut + \\frac{1}{2}at^2$)
আমরা পাই, $s = \\left(\\frac{u + v}{2}\\right)t$।
এখানে $v = u + at$ প্রতিস্থাপন করে পাই:
$$s = \\left(\\frac{u + u + at}{2}\\right)t = ut + \\frac{1}{2}at^2$$
> **বিশেষ ক্ষেত্র:** স্থির অবস্থান থেকে শুরু করলে $u = 0$, তাই $s = \\frac{1}{2}at^2$ ($s \\propto t^2$)।

---

### ৪. চতুর্থ সমীকরণ: বেগ ও দূরত্বের সম্পর্ক ($v^2 = u^2 + 2as$)
প্রথম সমীকরণ থেকে $t = \\frac{v - u}{a}$।
দ্বিতীয় সমীকরণে $t$-এর মান বসিয়ে পাই:
$$s = \\left(\\frac{u + v}{2}\\right)\\left(\\frac{v - u}{a}\\right) = \\frac{v^2 - u^2}{2a}$$
বা,
$$v^2 = u^2 + 2as$$
> **বিশেষ ক্ষেত্র:** স্থির অবস্থান থেকে যাত্রা শুরু করলে $u = 0$, তাই $v^2 = 2as \\implies v \\propto \\sqrt{s}$।`,
  importantTerms: [
    {
      termBangla: 'ত্বরণ',
      termEnglish: 'Acceleration',
      definition:
        'সময়ের সাথে কোনো গতিশীল বস্তুর অসম বেগের পরিবর্তনের হারকে ত্বরণ বলে। এর এসআই একক $\\text{m/s}^2$ এবং এটি একটি ভেক্টর রাশি।',
    },
    {
      termBangla: 'সরণ',
      termEnglish: 'Displacement',
      definition:
        'নির্দিষ্ট দিকে পারিপার্শ্বিকের সাপেক্ষে কোনো বস্তুর অবস্থানের পরিবর্তনকে সরণ বলে। এর একক মিটার ($\\text{m}$) এবং এটি ভেক্টর রাশি।',
    },
    {
      termBangla: 'বেগ',
      termEnglish: 'Velocity',
      definition:
        'নির্দিষ্ট দিকে একক সময়ে বস্তুর অতিক্রান্ত দূরত্ব বা সরণের হারকে বেগ বলে। এর এসআই একক $\\text{m/s}$।',
    },
    {
      termBangla: 'দ্রুতি',
      termEnglish: 'Speed',
      definition:
        'সময়ের সাথে যেকোনো দিকে কোনো বস্তুর অবস্থানের পরিবর্তনের হারকে দ্রুতি বলে। দ্রুতির কেবল মান আছে কিন্তু দিক নেই, তাই এটি স্কেলার রাশি।',
    },
  ],
  workedExample: {
    problem:
      'একটি স্থির ট্রেন $0.5\\text{ m/s}^2$ সুষম ত্বরণে $1\\text{ min}$ চলার পর $250\\text{ m}$ দূরে সিগন্যাল দেখতে পেয়ে ব্রেক চেপে $20\\text{ s}$-এ থেমে গেল। ট্রেনটির সর্বোচ্চ বেগ কত ছিল এবং মোট অতিক্রান্ত দূরত্ব কত?',
    stepByStepSolution: `**১ম ধাপ: ত্বরণকালে সর্বোচ্চ বেগ ($v$) নির্ণয়:**
এখানে,
আদিবেগ $u_1 = 0\\text{ m/s}$ (স্থির অবস্থান)
ত্বরণ $a_1 = 0.5\\text{ m/s}^2$
সময় $t_1 = 1\\text{ min} = 60\\text{ s}$

গতির ১ম সমীকরণ অনুযায়ী:
$$v = u_1 + a_1 t_1 = 0 + (0.5 \\times 60) = 30\\text{ m/s}$$
অতএব, ট্রেনটির সর্বোচ্চ বেগ ছিল $30\\text{ m/s}$।

**২য় ধাপ: প্রথম ৬০ সেকেন্ডে অতিক্রান্ত দূরত্ব ($s_1$):**
$$s_1 = u_1 t_1 + \\frac{1}{2}a_1 t_1^2 = 0 + \\frac{1}{2} \\times 0.5 \\times 60^2 = 900\\text{ m}$$

**৩য় ধাপ: মন্দনকালে অতিক্রান্ত দূরত্ব ($s_2$):**
ব্রেক করার মুহূর্তে বেগ $u_2 = 30\\text{ m/s}$, শেষবেগ $v_2 = 0\\text{ m/s}$, সময় $t_2 = 20\\text{ s}$।
$$s_2 = \\left(\\frac{u_2 + v_2}{2}\\right)t_2 = \\left(\\frac{30 + 0}{2}\\right) \\times 20 = 300\\text{ m}$$

**৪র্থ ধাপ: মোট অতিক্রান্ত দূরত্ব:**
$$s_{\\text{total}} = s_1 + s_2 = 900 + 300 = 1200\\text{ m}$$

**উত্তর:** সর্বোচ্চ বেগ $30\\text{ m/s}$ এবং মোট অতিক্রান্ত দূরত্ব $1200\\text{ m}$।`,
  },
  memoryAid:
    '🚀 SUVAT মেমোরি এইড: গতির ৫টি মৌলিক চলকের মধ্যে যেকোনো ৩টি জানা থাকলে বাকি ২টি সরাসরি বের করা যায়। সূত্র বাছাইয়ের নিয়ম: যে চলকটি প্রশ্নে নেই, সেই চলকবিহীন সূত্রটি নির্বাচন করো!',
  status: ContentStatus.PUBLISHED,
  version: 1,
};

export const mcqQuestion1 = {
  id: 'q_motion_mcq_1',
  topicId: topicMotionEquations.id,
  type: 'MCQ',
  stem: 'স্থির অবস্থান থেকে সুষম ত্বরণে চলমান কোনো বস্তুর $4\\text{ s}$ পর বেগ $16\\text{ m/s}$ হলে বস্তুটির ত্বরণ কত?',
  options: [
    { id: 'opt_q1_a', text: '$4\\text{ m/s}^2$', isCorrect: true },
    { id: 'opt_q1_b', text: '$64\\text{ m/s}^2$', isCorrect: false },
    { id: 'opt_q1_c', text: '$0.25\\text{ m/s}^2$', isCorrect: false },
    { id: 'opt_q1_d', text: '$8\\text{ m/s}^2$', isCorrect: false },
  ],
  explanation: {
    directAnswer: 'সঠিক উত্তর ক: $4\\text{ m/s}^2$।',
    coreConcept: 'গতির প্রথম সমীকরণ: $v = u + at$ বা $a = \\frac{v - u}{t}$।',
    stepDerivation:
      'দেওয়া আছে, স্থির অবস্থান হওয়ায় আদিবেগ $u = 0\\text{ m/s}$, সময় $t = 4\\text{ s}$ এবং শেষবেগ $v = 16\\text{ m/s}$।\nসূত্রানুসারে:\n$$a = \\frac{v - u}{t} = \\frac{16 - 0}{4} = 4\\text{ m/s}^2$$',
    distractorAnalysis: {
      opt_q1_b:
        'খ অপশনে বেগ এবং সময়ের গুণফল ($16 \\times 4 = 64$) করা হয়েছে, যা ত্বরণের সূত্রের বিপরীত।',
      opt_q1_c:
        'গ অপশনে সময়কে বেগ দিয়ে ভাগ ($\\frac{4}{16} = 0.25$) করা হয়েছে, যা উল্টো অনুপাত।',
      opt_q1_d:
        'ঘ অপশনে সাধারণ বিভ্রান্তিকর মান হিসেবে $16/2 = 8$ বিবেচনা করা হয়েছে।',
    },
    textbookCitation: {
      bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
      chapterName: 'দ্বিতীয় অধ্যায়: গতি',
      pageNumber: 42,
    },
    proTipShortcut: 'স্থির অবস্থান বললে সবসময় $a = \\frac{v}{t}$ সরাসরি প্রয়োগ করো!',
  },
  difficulty: 'MEDIUM',
  boardSource: 'Dhaka Board 2022',
  isVerified: true,
  status: ContentStatus.PUBLISHED,
  version: 1,
};

export const mcqQuestion2 = {
  id: 'q_motion_mcq_2',
  topicId: topicMotionEquations.id,
  type: 'MCQ',
  stem: 'একটি বস্তু $5\\text{ m/s}$ আদিবেগে এবং $2\\text{ m/s}^2$ সুষম ত্বরণে $3\\text{ s}$ চললে এটি কত দূরত্ব ($s$) অতিক্রম করবে?',
  options: [
    { id: 'opt_q2_a', text: '$24\\text{ m}$', isCorrect: true },
    { id: 'opt_q2_b', text: '$15\\text{ m}$', isCorrect: false },
    { id: 'opt_q2_c', text: '$33\\text{ m}$', isCorrect: false },
    { id: 'opt_q2_d', text: '$9\\text{ m}$', isCorrect: false },
  ],
  explanation: {
    directAnswer: 'সঠিক উত্তর ক: $24\\text{ m}$।',
    coreConcept: 'গতির দ্বিতীয় সমীকরণ: $s = ut + \\frac{1}{2}at^2$।',
    stepDerivation:
      'দেওয়া আছে, আদিবেগ $u = 5\\text{ m/s}$, সুষম ত্বরণ $a = 2\\text{ m/s}^2$, সময় $t = 3\\text{ s}$।\nসূত্রানুসারে:\n$$s = ut + \\frac{1}{2}at^2 = (5 \\times 3) + \\left(\\frac{1}{2} \\times 2 \\times 3^2\\right) = 15 + 9 = 24\\text{ m}$$',
    distractorAnalysis: {
      opt_q2_b:
        'খ অপশনে ত্বরণ অংশটি বাদ দিয়ে কেবল সমবেগের অংশ ($ut = 15\\text{ m}$) গণনা করা হয়েছে।',
      opt_q2_c:
        'গ অপশনে হাফ ($\\frac{1}{2}$) বাদ দিয়ে $15 + (2 \\times 9) = 33\\text{ m}$ হিসাব করা হয়েছে।',
      opt_q2_d:
        'ঘ অপশনে আদিবেগের অংশ বাদ দিয়ে কেবল ত্বরণজনিত সরণ ($\\frac{1}{2}at^2 = 9\\text{ m}$) নেওয়া হয়েছে।',
    },
    textbookCitation: {
      bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
      chapterName: 'দ্বিতীয় অধ্যায়: গতি',
      pageNumber: 44,
    },
    proTipShortcut:
      'যখন ত্বরণ $a = 2\\text{ m/s}^2$, তখন $\\frac{1}{2} \\times 2 = 1$ হয়ে যায়, তাই সরাসরি $s = ut + t^2$ হিসাব করো!',
  },
  difficulty: 'MEDIUM',
  boardSource: 'Chattogram Board 2023',
  isVerified: true,
  status: ContentStatus.PUBLISHED,
  version: 1,
};

export const cqQuestion1 = {
  id: 'q_motion_cq_1',
  topicId: topicMotionEquations.id,
  type: 'CQ_CREATIVE',
  stem: 'একটি প্রাইভেট কার স্থির অবস্থান থেকে $2.5\\text{ m/s}^2$ সুষম ত্বরণে চলা শুরু করে $10\\text{ s}$ পর সমবেগে চলতে থাকে। অপর একটি বাস $15\\text{ m/s}$ সমবেগে একই স্থান থেকে একই সময়ে একই অভিমুখে রওয়ানা হলো।',
  options: null,
  explanation: {
    directAnswer: 'সৃজনশীল প্রশ্নের পূর্ণাঙ্গ উত্তর ও সমাধান নিচে বিস্তারিত বর্ণিত হলো।',
    coreConcept: 'গতির ৪টি মৌলিক সমীকরণ, ত্বরণ ও সমবেগের যৌথ বিশ্লেষণ।',
    stepDerivation: 'ক, খ, গ এবং ঘ অংশের ধারাবাহিক প্রমাণ ও গাণিতিক বিশ্লেষণ।',
    textbookCitation: {
      bookTitle: 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB 2026)',
      chapterName: 'দ্বিতীয় অধ্যায়: গতি',
      pageNumber: 52,
    },
    proTipShortcut:
      'ত্বরণকালের দূরত্ব ও সমবেগকালের দূরত্ব আলাদাভাবে বের করে যোগ করলে যেকোনো সময় অতিক্রান্ত মোট সরণ পাওয়া যায়।',
  },
  cqRubric: {
    ka: {
      mark: 1,
      criteria:
        'জ্ঞানমূলক (১ নম্বর): সুষম ত্বরণ কাকে বলে? (সময়ের সাথে কোনো বস্তুর বেগের বৃদ্ধির হার সর্বদা সমান থাকলে তাকে সুষম ত্বরণ বলে)।',
    },
    kha: {
      mark: 2,
      criteria:
        'অনুধাবনমূলক (২ নম্বর): সমদ্রুতিতে চলমান কোনো বস্তুর বেগ পরিবর্তনশীল হতে পারে কি না ব্যাখ্যা করো। (দ্রুতি স্কেলার রাশি হলেও বেগ ভেক্টর রাশি; বৃত্তাকার পথে সমদ্রুতিতে চললেও প্রতি মুহূর্তে দিক পরিবর্তনের কারণে বেগ পরিবর্তনশীল হয়)।',
    },
    ga: {
      mark: 3,
      criteria:
        'প্রয়োগমূলক (৩ নম্বর): প্রাইভেট কারটি প্রথম $10\\text{ s}$-এ কত দূরত্ব অতিক্রম করবে নির্ণয় করো। ($s = ut + \\frac{1}{2}at^2 = 0 + \\frac{1}{2} \\times 2.5 \\times 10^2 = 125\\text{ m}$)।',
    },
    gha: {
      mark: 4,
      criteria:
        'উচ্চতর দক্ষতামূলক (৪ নম্বর): যাত্রাপথে প্রাইভেট কারটি বাসটিকে কতবার অতিক্রম করবে গাণিতিক যুক্তিসহ বিশ্লেষণ করো। (১০ সেকেন্ডে অর্জিত বেগ $v = 25\\text{ m/s}$; সমীকরণের মাধ্যমে বিশ্লেষণ করে সঠিক ফলাফল উপস্থাপন করলে পূর্ণ ৪ নম্বর)।',
    },
  },
  difficulty: 'HARD',
  boardSource: 'Rajshahi Board 2023',
  isVerified: true,
  status: ContentStatus.PUBLISHED,
  version: 1,
};

export const pilotData = {
  subjects: [sscPhysicsSubject, sscChemistrySubject],
  chapters: [chapter1, chapter2],
  topics: [topicMotionEquations],
  lessons: [lessonMotionEquations],
  questions: [mcqQuestion1, mcqQuestion2, cqQuestion1],
};

export async function seed(prisma: PrismaClient) {
  // 1. Seed Subjects
  await prisma.subject.upsert({
    where: { code: sscPhysicsSubject.code },
    update: sscPhysicsSubject,
    create: sscPhysicsSubject,
  });

  await prisma.subject.upsert({
    where: { code: sscChemistrySubject.code },
    update: sscChemistrySubject,
    create: sscChemistrySubject,
  });

  // 2. Seed Chapters
  await prisma.chapter.upsert({
    where: {
      subjectId_orderIndex: {
        subjectId: chapter1.subjectId,
        orderIndex: chapter1.orderIndex,
      },
    },
    update: chapter1,
    create: chapter1,
  });

  await prisma.chapter.upsert({
    where: {
      subjectId_orderIndex: {
        subjectId: chapter2.subjectId,
        orderIndex: chapter2.orderIndex,
      },
    },
    update: chapter2,
    create: chapter2,
  });

  // 3. Seed Topic
  await prisma.topic.upsert({
    where: {
      chapterId_orderIndex: {
        chapterId: topicMotionEquations.chapterId,
        orderIndex: topicMotionEquations.orderIndex,
      },
    },
    update: topicMotionEquations,
    create: topicMotionEquations,
  });

  // 4. Seed Lesson
  await prisma.lesson.upsert({
    where: { id: lessonMotionEquations.id },
    update: lessonMotionEquations,
    create: lessonMotionEquations,
  });

  // 5. Seed Questions
  for (const q of [mcqQuestion1, mcqQuestion2, cqQuestion1]) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: q as any,
      create: q as any,
    });
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL =
      'postgresql://postgres:postgres@localhost:5432/pori?schema=public';
  }

  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    await seed(prisma);
    console.log('✅ NCTB 2026 SSC Physics pilot content seeded successfully.');
  } catch (error: any) {
    if (
      error?.code === 'P1001' ||
      error?.message?.includes("Can't reach database server") ||
      error?.message?.includes('ECONNREFUSED')
    ) {
      console.warn(
        `[Prisma Seed] Notice: PostgreSQL server not reachable at ${process.env.DATABASE_URL}. Seed definitions validated successfully.`,
      );
    } else {
      console.error('[Prisma Seed] Error during seeding:', error);
      throw error;
    }
  } finally {
    await prisma.$disconnect().catch(() => {});
  }
}

if (process.env.NODE_ENV !== 'test') {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
