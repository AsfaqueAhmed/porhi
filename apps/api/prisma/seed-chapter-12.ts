import { PrismaClient, ContentStatus } from '@prisma/client';
import { chapter12QuestionsBatch1 } from './seed-chapter-12-questions';
import { chapter12QuestionsBatch2 } from './seed-chapter-12-questions-batch2';
import { chapter12QuestionsBatch3 } from './seed-chapter-12-questions-batch3';

export const chapter12AllQuestions = [
  ...chapter12QuestionsBatch1,
  ...chapter12QuestionsBatch2,
  ...chapter12QuestionsBatch3,
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

  await prisma.lesson.upsert({
    where: { id: lessonId },
    update: {
      topicId,
      ...lessonData,
      version: 1,
    },
    create: {
      id: lessonId,
      topicId,
      ...lessonData,
      version: 1,
    },
  });
}

export async function seedChapter12(prisma: PrismaClient) {
  console.log('🧲 Seeding Chapter 12 (বিদ্যুতের চৌম্বক ক্রিয়া / Magnetic Effects of Current)...');

  const chapter12 = await prisma.chapter.upsert({
    where: { id: 'chap_ssc_physics_ch12' },
    update: {
      subjectId: 'sub_ssc_physics',
      orderIndex: 12,
      titleBangla: 'দ্বাদশ অধ্যায়: বিদ্যুতের চৌম্বক ক্রিয়া (Magnetic Effects of Current)',
    },
    create: {
      id: 'chap_ssc_physics_ch12',
      subjectId: 'sub_ssc_physics',
      orderIndex: 12,
      titleBangla: 'দ্বাদশ অধ্যায়: বিদ্যুতের চৌম্বক ক্রিয়া (Magnetic Effects of Current)',
    },
  });

  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch12_1',
    chapter12.id,
    1,
    '১২.১ চুম্বক, চৌম্বক ক্ষেত্র ও বলরেখা (Magnet, Field & Field Lines)',
    'les_ssc_physics_ch12_1',
    {
      titleBangla: 'চুম্বক, মেরু ধর্ম, ভূ-চুম্বকত্ব ও চৌম্বক বলরেখা',
      learningGoal: 'চুম্বকের উত্তর-দক্ষিণ মেরুর আকর্ষণ-বিকর্ষণ ধর্ম, প্রকৃত পরীক্ষা হিসেবে বিকর্ষণ, ভূ-চৌম্বক ক্ষেত্র এবং চৌম্বক বলরেখার বৈশিষ্ট্য ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. চুম্বক ও মেরু ধর্ম
- যে বস্তু লোহা, নিকেল ও কোবাল্টকে আকর্ষণ করে এবং মুক্তভাবে ঝোলালে উত্তর-দক্ষিণ দিক নির্দেশ করে, তাকে **চুম্বক** বলে।
- বিপরীত মেরু ($N \\leftrightarrow S$) পরস্পরকে আকর্ষণ করে এবং সমমেরু ($N \\leftrightarrow N$, $S \\leftrightarrow S$) পরস্পরকে বিকর্ষণ করে।
- প্রকৃতিতে একক মেরু থাকে না—চুম্বক ভাঙলেও প্রতিটি খণ্ডে $N$ ও $S$ মেরু থাকে।

### ২. চৌম্বক বলরেখা
- চুম্বকের বাইরে বলরেখা $N$ থেকে $S$ মেরুতে এবং ভেতরে $S$ থেকে $N$ মেরুতে গিয়ে বদ্ধ লুপ তৈরি করে। দুটি বলরেখা কখনোই পরস্পরকে ছেদ করে না।`,
      importantTerms: [
        { termBangla: 'চৌম্বক ক্ষেত্র', termEnglish: 'Magnetic Field', definition: 'চুম্বকের চারপাশে যে অঞ্চলে এর আকর্ষণ বা বিকর্ষণ বল অনুভূত হয়।' },
        { termBangla: 'চৌম্বক বলরেখা', termEnglish: 'Magnetic Field Lines', definition: 'বাইরে N থেকে S মুখী কাল্পনিক বক্ররেখা যা ক্ষেত্রের দিক ও ঘনত্ব প্রাবল্য নির্দেশ করে।' },
      ],
      workedExample: {
        problem: 'দুটি দেখতে একই রকম লোহার দণ্ডের মধ্যে কোনটি চুম্বক তা কীভাবে বিকর্ষণ ছাড়াও কেবল স্পর্শ করে বোঝা যাবে?',
        stepByStepSolution: 'একটি দণ্ডের প্রান্ত অপরটির ঠিক মাঝখানে (নিরপেক্ষ অঞ্চলে) ছোঁয়ালে কেবল চুম্বকের প্রান্তই অপর দণ্ডের মাঝখানকে প্রবলভাবে আকর্ষণ করবে; সাধারণ লোহার প্রান্ত চুম্বকের মাঝখানে প্রায় কোনো আকর্ষণ অনুভব করবে না।',
      },
      memoryAid: 'চুম্বক চেনার সেরা কষ্টিপাথর হলো বিকর্ষণ (লোহাকেও চুম্বক আকর্ষণ করে, কিন্তু বিকর্ষণ শুধু চুম্বকই করে)!',
      status: ContentStatus.PUBLISHED,
    },
  );

  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch12_2',
    chapter12.id,
    2,
    '১২.২.১–১২.২.২ সলিনয়েড ও তড়িৎচুম্বক (Solenoid & Electromagnet)',
    'les_ssc_physics_ch12_2',
    {
      titleBangla: 'ওয়েরস্টেডের পরীক্ষা, ডানহস্ত গ্রিপ নিয়ম, সলিনয়েড ও তড়িৎচুম্বক',
      learningGoal: 'বিদ্যুৎপ্রবাহের ফলে সৃষ্ট চৌম্বক ক্ষেত্রের দিক নির্ণয় (ডানহস্ত গ্রিপ নিয়ম) এবং নরম লোহার কোর ব্যবহার করে শক্তিশালী তড়িৎচুম্বক তৈরির কৌশল বর্ণনা করতে পারবে।',
      explanation: `### ১. ওয়েরস্টেডের পরীক্ষা ও ডানহস্ত নিয়ম
- তড়িৎবাহী সোজা তারের চারপাশে সমকেন্দ্রিক বৃত্তাকার চৌম্বক ক্ষেত্র তৈরি হয়।
- ডান হাতের বৃদ্ধাঙ্গুলি প্রবাহের দিকে রাখলে বাঁকানো আঙুলগুলো বলরেখার দিক নির্দেশ করে।

### ২. সলিনয়েড ও তড়িৎচুম্বক
- অনেক পাকের কুণ্ডলীকে **সলিনয়েড** বলে; এর ভেতর **নরম লোহার কোর** ঢোকালে প্রবল অস্থায়ী **তড়িৎচুম্বক** তৈরি হয়।
- পাকসংখ্যা ($N$) বাড়ালে, প্রবাহ ($I$) বাড়ালে এবং নরম লোহার কোর দিলে চুম্বকত্ব বহুগুণ বাড়ে।`,
      interactiveWidgetUrl: '/uploads/interactive/electromagnet-motor-lab.html',
      importantTerms: [
        { termBangla: 'সলিনয়েড', termEnglish: 'Solenoid', definition: 'তারকে স্প্রিংয়ের মতো বহু পাকে পেঁচিয়ে তৈরি কুণ্ডলী যার চৌম্বক ক্ষেত্র দণ্ড চুম্বকের মতো।' },
        { termBangla: 'তড়িৎচুম্বক', termEnglish: 'Electromagnet', definition: 'সলিনয়েডের ভেতরে নরম লোহার কোর প্রবেশ করিয়ে তৈরি নিয়ন্ত্রণযোগ্য অস্থায়ী চুম্বক।' },
      ],
      workedExample: {
        problem: 'বৈদ্যুতিক ঘণ্টা ও স্ক্র্যাপ ক্রেনে স্টিলের বদলে নরম লোহার কোর ব্যবহার করা হয় কেন?',
        stepByStepSolution: 'কারণ সুইচ বন্ধ করার সাথে সাথেই নরম লোহা তার চুম্বকত্ব দ্রুত হারিয়ে ফেলে; স্টিল ব্যবহার করলে তা স্থায়ী চুম্বকে পরিণত হয়ে যেত এবং লোহা ছাড়ত না।',
      },
      memoryAid: 'তড়িৎচুম্বক শক্তির ৩ চাবি: বেশি পাক (N), বেশি প্রবাহ (I), আর ভেতরে নরম লোহা (Soft Iron)!',
      status: ContentStatus.PUBLISHED,
    },
  );

  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch12_3',
    chapter12.id,
    3,
    '১২.২.৩–১২.২.৪ বিদ্যুৎবাহী তারে বল ও DC মোটর (Magnetic Force & DC Motor Lab)',
    'les_ssc_physics_ch12_3',
    {
      titleBangla: 'চৌম্বক ক্ষেত্রে বিদ্যুৎবাহী তারে বল, ফ্লেমিংয়ের বামহস্ত নিয়ম ও DC মোটর',
      learningGoal: 'ফ্লেমিংয়ের বামহস্ত নিয়মে তারের ওপর ক্রিয়াশীল বলের ($F = BIL\\sin\\theta$) দিক নির্ণয় এবং কমিউটেটরসহ DC মোটরের অবিরাম ঘূর্ণন ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. তারের ওপর বল ও ফ্লেমিংয়ের বামহস্ত নিয়ম
- চৌম্বক ক্ষেত্রে ($B$) রাখা $L$ দৈর্ঘ্যের তারে $I$ প্রবাহ চললে ক্রিয়াশীল বল: $$F = B I L \\sin\\theta$$
- বাম হাতের তর্জনী (ক্ষেত্র $N \\to S$), মধ্যমা (প্রবাহ) ও বৃদ্ধাঙ্গুলি (বল) পরস্পর সমকোণে থাকলে বলের দিক পাওয়া যায়।

### ২. DC মোটর ও কমিউটেটর
- মোটর **তড়িৎ শক্তিকে যান্ত্রিক শক্তিতে** রূপান্তর করে।
- **স্প্লিট-রিং কমিউটেটর** প্রতি $180^\\circ$ ঘূর্ণনের পর কুণ্ডলীর প্রবাহ উল্টে দেয় বলেই আর্মেচার একই দিকে অবিরাম ঘুরতে থাকে।`,
      interactiveWidgetUrl: '/uploads/interactive/electromagnet-motor-lab.html',
      importantTerms: [
        { termBangla: 'ফ্লেমিংয়ের বামহস্ত নিয়ম', termEnglish: "Fleming's Left-Hand Rule", definition: 'চৌম্বক ক্ষেত্রে তড়িৎবাহী তারের ওপর ক্রিয়াশীল বল বা গতির দিক নির্ণয়ের নিয়ম।' },
        { termBangla: 'কমিউটেটর', termEnglish: 'Split-Ring Commutator', definition: 'DC মোটরে প্রতি অর্ধ-আবর্তনে কুণ্ডলীর প্রবাহের দিক পরিবর্তনকারী খণ্ডিত তামার রিং।' },
      ],
      workedExample: {
        problem: '$0.6\\,\\text{T}$ চৌম্বক ক্ষেত্রে লম্বভাবে স্থাপিত $0.5\\,\\text{m}$ দীর্ঘ তারে $4\\,\\text{A}$ প্রবাহ চললে বল কত?',
        stepByStepSolution: '$F = BIL\\sin 90^\\circ = 0.6 \\times 4 \\times 0.5 \\times 1 = 1.2\\,\\text{N}$।',
      },
      memoryAid: 'বাম হাত = মোটর (বিদ্যুৎ থেকে বল); ডান হাত = জেনারেটর (ঘূর্ণন থেকে বিদ্যুৎ)!',
      status: ContentStatus.PUBLISHED,
    },
  );

  await upsertTopicAndLesson(
    prisma,
    'top_ssc_physics_ch12_4',
    chapter12.id,
    4,
    '১২.৩ তড়িৎচৌম্বকীয় আবেশ, জেনারেটর ও ট্রান্সফরমার (Induction, Generator & Transformer Lab)',
    'les_ssc_physics_ch12_4',
    {
      titleBangla: 'ফ্যারাডের তড়িৎচৌম্বকীয় আবেশ, জেনারেটর ও আরোহী-অবরোহী ট্রান্সফরমার',
      learningGoal: 'চৌম্বক ফ্লাক্স পরিবর্তনের মাধ্যমে আবিষ্ট তড়িৎপ্রবাহ (আবেশ), AC/DC জেনারেটর এবং আদর্শ ট্রান্সফরমারের সমীকরণ ($V_s/V_p = N_s/N_p = I_p/I_s$) প্রয়োগ করতে পারবে।',
      explanation: `### ১. তড়িৎচৌম্বকীয় আবেশ ও জেনারেটর
- কুণ্ডলী ও চুম্বকের আপেক্ষিক গতিতে চৌম্বক ফ্লাক্স বদলালে কুণ্ডলীতে ভোল্টেজ ও প্রবাহ আবিষ্ট হয় (ফ্যারাডে, ১৮৩১)।
- জেনারেটর **যান্ত্রিক শক্তিকে তড়িৎ শক্তিতে** রূপান্তর করে (AC জেনারেটরে স্লিপ রিং, DC জেনারেটরে কমিউটেটর)।

### ২. ট্রান্সফরমার (Transformer)
- পারস্পরিক আবেশের নীতিতে কেবল **AC** ভোল্টেজ বাড়ায় (আরোহী: $N_s > N_p$) বা কমায় (অবরোহী: $N_s < N_p$): $$\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}$$
- শক্তির নিত্যতা থেকে আদর্শ ট্রান্সফরমারে ইনপুট ও আউটপুট ক্ষমতা সমান থাকে ($V_p I_p = V_s I_s$)।`,
      interactiveWidgetUrl: '/uploads/interactive/induction-transformer-lab.html',
      importantTerms: [
        { termBangla: 'তড়িৎচৌম্বকীয় আবেশ', termEnglish: 'Electromagnetic Induction', definition: 'পরিবর্তনশীল চৌম্বক ক্ষেত্র দ্বারা কুণ্ডলীতে বিভব ও প্রবাহ সৃষ্টি হওয়ার ঘটনা।' },
        { termBangla: 'ট্রান্সফরমার', termEnglish: 'Transformer', definition: 'AC ভোল্টেজকে প্রয়োজনমতো বৃদ্ধি (আরোহী) বা হ্রাস (অবরোহী) করার যন্ত্র।' },
      ],
      workedExample: {
        problem: 'একটি ট্রান্সফরমারের মুখ্য পাক $400$ ও গৌণ পাক $1200$। মুখ্য কুণ্ডলীতে $220\\,\\text{V}$ ও $3\\,\\text{A}$ দিলে গৌণ ভোল্টেজ ও প্রবাহ কত?',
        stepByStepSolution: '$V_s = \\dfrac{1200}{400} \\times 220 = 660\\,\\text{V}$ এবং $I_s = \\dfrac{V_p I_p}{V_s} = \\dfrac{220 \\times 3}{660} = 1\\,\\text{A}$।',
      },
      memoryAid: 'ট্রান্সফরমার কেবল AC-তে চলে — স্থির DC দিলে ফ্লাক্স বদলায় না বলে সেকেন্ডারি ভোল্টেজ ০ V থাকে!',
      status: ContentStatus.PUBLISHED,
    },
  );

  for (const q of chapter12AllQuestions) {
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

  console.log(`✅ Chapter 12 seeded (${chapter12AllQuestions.length} verified questions).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedChapter12(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Chapter 12 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
