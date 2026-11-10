import { PrismaClient, ContentStatus } from '@prisma/client';
import { chapter2Questions } from './seed-chapter-2-questions';

export { chapter2Questions };

export async function seedChapter2(prisma: PrismaClient) {
  console.log('Seeding Chapter 2: গতি (Motion) topics and lessons...');

  const chapterId = 'chap_ssc_physics_ch2';

  // Cleanup old temporary topics and reassign questions
  await prisma.topic.deleteMany({
    where: { id: '40d9151a-c1b8-4bd6-9643-6c7add7b9302' },
  });
  await prisma.topic.updateMany({
    where: { id: 'top_ssc_physics_motion_eq' },
    data: { orderIndex: 99 },
  });

  // Ensure chapter exists
  await prisma.chapter.upsert({
    where: { id: chapterId },
    update: {
      titleBangla: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
      orderIndex: 2,
      subjectId: 'sub_ssc_physics',
    },
    create: {
      id: chapterId,
      titleBangla: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
      orderIndex: 2,
      subjectId: 'sub_ssc_physics',
    },
  });

  async function upsertTopicAndLesson(
    topicId: string,
    topicTitle: string,
    orderIndex: number,
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
    }
  ) {
    const topic = await prisma.topic.upsert({
      where: { id: topicId },
      update: {
        titleBangla: topicTitle,
        orderIndex,
        chapterId,
      },
      create: {
        id: topicId,
        titleBangla: topicTitle,
        orderIndex,
        chapterId,
      },
    });

    await prisma.lesson.upsert({
      where: { id: lessonId },
      update: {
        topicId: topic.id,
        ...lessonData,
      },
      create: {
        id: lessonId,
        topicId: topic.id,
        ...lessonData,
      },
    });

    console.log(`✓ Seeded ${topicTitle}`);
  }

  // 1. Topic 2.1: স্থিতি এবং গতি
  await upsertTopicAndLesson(
    'top_ssc_physics_ch2_1',
    '২.১ স্থিতি এবং গতি (Rest and Motion)',
    1,
    'les_ssc_physics_ch2_1',
    {
      titleBangla: 'স্থিতি এবং গতি: প্রসঙ্গ কাঠামো ও আপেক্ষিকতা',
      learningGoal:
        'প্রসঙ্গ কাঠামো ও প্রসঙ্গ বিন্দুর ধারণা ব্যাখ্যা করতে পারা এবং মহাবিশ্বের সকল স্থিতি ও গতি কেন আপেক্ষিক তা বাস্তব উদাহরণের সাহায্যে উপলব্ধি করা।',
      explanation: `# স্থিতি এবং গতি (Rest and Motion)

কোনো বস্তু স্থির নাকি গতিশীল—তা বোঝার জন্য সর্বাগ্রে প্রয়োজন একটি **প্রসঙ্গ বিন্দু (Reference Point)** বা **প্রসঙ্গ কাঠামো (Frame of Reference)**।

---

### মূল সংজ্ঞাসমূহ:
- **স্থিতি (Rest):** সময়ের পরিবর্তনের সাথে পারিপার্শ্বিক বা প্রসঙ্গ বিন্দুর সাপেক্ষে কোনো বস্তুর অবস্থানের পরিবর্তন না হওয়াকে স্থিতি বলে।
- **গতি (Motion):** সময়ের পরিবর্তনের সাথে পারিপার্শ্বিক বা প্রসঙ্গ বিন্দুর সাপেক্ষে কোনো বস্তুর অবস্থানের ধারাবাহিক পরিবর্তনকে গতি বলে।
- **প্রসঙ্গ কাঠামো:** যে দৃঢ় বস্তু বা স্থানাঙ্ক ব্যবস্থার ($x, y, z$ অক্ষ) সাপেক্ষে অন্য কোনো বস্তুর অবস্থান বা গতি নির্ণয় করা হয়।

---

### পরম স্থিতি ও পরম গতির আপেক্ষিকতা:
আমরা সাধারণত পৃথিবীপৃষ্ঠকে স্থির বিবেচনা করি। কিন্তু পৃথিবী নিজেই সূর্যের চারদিকে প্রায় $30\\text{ km/s}$ বেগে আবর্তিত হচ্ছে। আবার সূর্যও তার গ্যালাক্সির কেন্দ্রকে ঘিরে ঘুরছে। 

> **পদার্থবিজ্ঞানের মূল সত্য:** মহাবিশ্বে পরমভাবে স্থির কোনো প্রসঙ্গ কাঠামো পাওয়া সম্ভব নয়। তাই মহাবিশ্বের **সকল স্থিতিই আপেক্ষিক, সকল গতিই আপেক্ষিক**।

---

### অবস্থান বর্ণনায় দিকের গুরুত্ব:
কাউকে যদি বলা হয় "স্কুলটি বাড়ি থেকে $১\\text{ km}$ দূরে", তবে সে পৌঁছাতে পারবে না। কিন্তু "বাড়ি থেকে পূর্ব দিকে $১\\text{ km}$" বললে অবস্থান নিশ্চিত হয়। সুতরাং অবস্থান বর্ণনায় প্রসঙ্গ বিন্দুর সাপেক্ষে দূরত্ব ও দিক—উভয়ই সুনির্দিষ্ট করতে হয়।`,
      importantTerms: [
        {
          termBangla: 'স্থিতি',
          termEnglish: 'Rest',
          definition: 'সময়ের সাথে পারিপার্শ্বিকের সাপেক্ষে অবস্থানের পরিবর্তন না ঘটা।',
        },
        {
          termBangla: 'গতি',
          termEnglish: 'Motion',
          definition: 'সময়ের সাথে পারিপার্শ্বিকের সাপেক্ষে অবস্থানের পরিবর্তন ঘটা।',
        },
        {
          termBangla: 'প্রসঙ্গ কাঠামো',
          termEnglish: 'Frame of Reference',
          definition: 'যার সাপেক্ষে কোনো বস্তুর গতি বা স্থিতি পরিমাপ করা হয়।',
        },
      ],
      workedExample: {
        problem:
          'একটি চলন্ত ট্রেনের কামরায় সামনাসামনি বসে থাকা দুই বন্ধু নিজেদের সাপেক্ষে এবং স্টেশনে দাঁড়িয়ে থাকা দর্শকের সাপেক্ষে কী অবস্থায় রয়েছে?',
        stepByStepSolution:
          '১. চলন্ত ট্রেনের সাপেক্ষে দুই বন্ধুর পারস্পরিক দূরত্বের পরিবর্তন হচ্ছে না, তাই নিজেদের সাপেক্ষে তারা স্থির (আপেক্ষিক স্থিতি)।\n২. স্টেশনে দাঁড়িয়ে থাকা দর্শকের সাপেক্ষে ট্রেনের কামরা ও যাত্রীরা সময়ের সাথে অবস্থান পরিবর্তন করছে, তাই দর্শকের সাপেক্ষে তারা গতিশীল (আপেক্ষিক গতি)।\nসিদ্ধান্ত: প্রসঙ্গ কাঠামোর ভিন্নতার কারণে একই বস্তু যুগপৎ স্থির ও গতিশীল প্রতীয়মান হতে পারে।',
      },
      memoryAid:
        '“বিন্দু বদলালে বদলায় পাঠ, স্থিরও চলে যদি খোলো চোখ-বাট!”—প্রসঙ্গ বিন্দু উল্লেখ না করে স্থিতি বা গতি বলা অর্থহীন।',
      status: ContentStatus.PUBLISHED,
    }
  );

  // 2. Topic 2.2: বিভিন্ন প্রকার গতি
  await upsertTopicAndLesson(
    'top_ssc_physics_ch2_2',
    '২.২ বিভিন্ন প্রকার গতি (Different Types of Motion)',
    2,
    'les_ssc_physics_ch2_2',
    {
      titleBangla: 'বিভিন্ন প্রকার গতি: সরলরৈখিক, ঘূর্ণন, চলন, পর্যাবৃত্ত ও স্পন্দন',
      learningGoal:
        'সরলরৈখিক, ঘূর্ণন, চলন, পর্যাবৃত্ত ও স্পন্দন গতির বৈশিষ্ট্য তুলনা করতে পারা এবং বাস্তব জীবনের গতি থেকে ভিন্ন ভিন্ন গতির উপাদান আলাদা করতে পারা।',
      explanation: `# বিভিন্ন প্রকার গতি (Different Types of Motion)

গতিপথ এবং বস্তুর বিভিন্ন অংশের সরণের ধরনের ওপর ভিত্তি করে গতিকে ৫টি প্রধান ভাগে ভাগ করা যায়:

---

### গতির ৫টি প্রধান শ্রেণিবিভাগ:
১. **সরলরৈখিক গতি (Linear Motion):** কোনো বস্তু যখন সোজা সরলরেখা বরাবর চলে। যেমন: সোজা সড়কে গাড়ির গতি, সোজা নিচে ফেলে দেওয়া পাথরের গতি।
২. **ঘূর্ণন গতি (Rotational Motion):** কোনো নির্দিষ্ট বিন্দু বা অক্ষকে কেন্দ্র করে নির্দিষ্ট দূরত্ব বজায় রেখে বৃত্তাকার পথে ঘোরা। যেমন: বৈদ্যুতিক পাখার গতি, ঘড়ির কাঁটার গতি।
৩. **চলন গতি (Translational Motion):** যদি কোনো বস্তুর সকল কণা একই সময়ে একই দিকে সমান দূরত্ব অতিক্রম করে। পথ সরল বা বক্র হতে পারে।
৪. **পর্যাবৃত্ত গতি (Periodic Motion):** নির্দিষ্ট সময় ($T$) পরপর গতিপথের কোনো নির্দিষ্ট বিন্দুকে একই দিক থেকে বারবার অতিক্রম করা। যেমন: ঘড়ির কাঁটা, সূর্যের চারদিকে পৃথিবীর কক্ষপথীয় গতি।
৫. **স্পন্দন গতি (Oscillatory Motion):** পর্যাবৃত্ত গতিসম্পন্ন কোনো কণা যদি পর্যায়কালের অর্ধেক সময় ($T/2$) নির্দিষ্ট দিকে এবং বাকি অর্ধেক সময় ($T/2$) বিপরীত দিকে চলে। যেমন: সরল দোলক, টিউনিং ফর্ক, গিটারের তার।

---

### ঘূর্ণন-চলন গতি (জটিল গতি):
সোজা রাস্তায় চলা সাইকেলের চাকা তার কেন্দ্রীয় অক্ষের সাপেক্ষে ঘোরে (**ঘূর্ণন**) এবং সাইকেলটি পুরো রাস্তা ধরে সামনে এগিয়ে যায় (**চলন**)। ড্রিল মেশিনের কাটাও যুগপৎ ঘোরে এবং ভেতরের দিকে চলে।

> **বিশেষ তথ্য:** সকল স্পন্দন গতিই পর্যাবৃত্ত গতি, কিন্তু সকল পর্যাবৃত্ত গতি স্পন্দন গতি নয়।`,
      importantTerms: [
        {
          termBangla: 'সরলরৈখিক গতি',
          termEnglish: 'Linear Motion',
          definition: 'সরলরেখা বরাবর বস্তুর সোজা গতি।',
        },
        {
          termBangla: 'ঘূর্ণন গতি',
          termEnglish: 'Rotational Motion',
          definition: 'নির্দিষ্ট অক্ষ বা বিন্দুকে কেন্দ্র করে বৃত্তাকার গতি।',
        },
        {
          termBangla: 'পর্যাবৃত্ত গতি',
          termEnglish: 'Periodic Motion',
          definition: 'নির্দিষ্ট সময় পর পর একই বিন্দুকে একই দিক থেকে অতিক্রমকারী গতি।',
        },
        {
          termBangla: 'স্পন্দন গতি',
          termEnglish: 'Oscillatory Motion',
          definition: 'পর্যায়কালের অর্ধেক সময় একদিকে ও বাকি অর্ধেক সময় বিপরীত দিকে চলমান দোলন।',
        },
      ],
      workedExample: {
        problem: 'সিলিং ফ্যানের গতি এবং দেয়াল ঘড়ির পেন্ডুলামের গতির মধ্যে পার্থক্য কী?',
        stepByStepSolution:
          '১. সিলিং ফ্যান নির্দিষ্ট অক্ষের চারদিকে একটানা একই দিকে ঘোরে—এটি ঘূর্ণন গতি ও পর্যাবৃত্ত গতি। কিন্তু এটি দিক বদলায় না বলে স্পন্দন গতি নয়।\n২. দেয়াল ঘড়ির পেন্ডুলাম সাম্যাবস্থার দুই পাশে অর্ধেক সময় একদিকে ও বাকি অর্ধেক সময় উল্টো দিকে দোলে—তাই এটি স্পন্দন গতি (সরল ছন্দিত স্পন্দন)।',
      },
      memoryAid:
        'সোজা চললে সরলরৈখিক, ঘুরলে ঘূর্ণন ভাই। সব কণা সমান চললে তাকেই চলন কই! নির্দিষ্ট সময়ে ফিরলে পর্যাবৃত্ত, আধেক সময় উল্টো দুললে স্পন্দন নাম দাও!',
      status: ContentStatus.PUBLISHED,
    }
  );

  // 3. Topic 2.3: স্কেলার ও ভেক্টর রাশি
  await upsertTopicAndLesson(
    'top_ssc_physics_ch2_3',
    '২.৩ স্কেলার ও ভেক্টর রাশি (Scalar and Vector Quantities)',
    3,
    'les_ssc_physics_ch2_3',
    {
      titleBangla: 'স্কেলার ও ভেক্টর রাশি: মান, দিক ও জ্যামিতিক প্রকাশ',
      learningGoal:
        'স্কেলার ও ভেক্টর রাশির পার্থক্য ব্যাখ্যা করতে পারা, ভেক্টরকে তীরচিহ্ন দিয়ে প্রকাশ করতে পারা এবং সমান ও বিপরীত ভেক্টরের শর্ত নিরূপণ করা।',
      explanation: `# স্কেলার ও ভেক্টর রাশি (Scalar & Vector)

পদার্থবিজ্ঞানে পরিমাপযোগ্য রাশিগুলোর প্রকাশে দিকের প্রয়োজনীয়তার ওপর ভিত্তি করে এদের দুই ভাগে ভাগ করা হয়:

---

### ১. স্কেলার রাশি (Scalar Quantity):
যেসব ভৌত রাশিকে সম্পূর্ণভাবে প্রকাশ করার জন্য **শুধু মান ও একক** যথেষ্ট, কোনো দিকের প্রয়োজন হয় না।
- **উদাহরণ:** ভর ($m$), সময় ($t$), তাপমাত্রা ($T$), দূরত্ব ($d$), দ্রুতি ($v$), কাজ ($W$), ঘনত্ব ($\\\\rho$)।
- **যোগের নিয়ম:** সাধারণ পাটিগণিতের নিয়মে সরাসরি যোগ-বিয়োগ করা যায়। যেমন: $২\\text{ kg} + ৩\\text{ kg} = ৫\\text{ kg}$।

---

### ২. ভেক্টর রাশি (Vector Quantity):
যেসব ভৌত রাশিকে সম্পূর্ণভাবে প্রকাশের জন্য **মান, একক এবং একটি নির্দিষ্ট দিক** থাকা আবশ্যক।
- **উদাহরণ:** সরণ ($\\vec{s}$), বেগ ($\\vec{v}$), ত্বরণ ($\\vec{a}$), বল ($\\vec{F}$), ওজন ($\\vec{W}$), ভরবেগ ($\\vec{p}$)।
- **চিহ্ন ও প্রকাশ:** ভেক্টরকে বোল্ড হরফে $\\mathbf{v}$ অথবা মাথায় তীরচিহ্ন দিয়ে $\\vec{v}$ প্রকাশ করা হয়। ভেক্টরের মানকে $|\\vec{v}|$ বা শুধু $v$ লেখা হয়।
- **সমান ভেক্টর:** মান ও দিক একই হলে $\\vec{A} = \\vec{B}$।
- **বিপরীত ভেক্টর:** মান সমান কিন্তু দিক বিপরীতমুখী হলে $\\vec{A} = -\\vec{B}$।`,
      importantTerms: [
        {
          termBangla: 'স্কেলার রাশি',
          termEnglish: 'Scalar Quantity',
          definition: 'যার কেবল মান ও একক আছে, দিক নেই।',
        },
        {
          termBangla: 'ভেক্টর রাশি',
          termEnglish: 'Vector Quantity',
          definition: 'যার মান, একক এবং নির্দিষ্ট দিক রয়েছে এবং ভেক্টর নিয়মে যোগ হয়।',
        },
        {
          termBangla: 'বিপরীত ভেক্টর',
          termEnglish: 'Negative/Opposite Vector',
          definition: 'সমান মান কিন্তু সম্পূর্ণ বিপরীতমুখী দিকবিশিষ্ট ভেক্টর।',
        },
      ],
      workedExample: {
        problem:
          'কোনো বস্তুর ওপর পূর্ব দিকে $10\\text{ N}$ বল এবং ঠিক একই সময়ে পশ্চিম দিকে $10\\text{ N}$ বল প্রয়োগ করা হলে লব্ধি বল কত?',
        stepByStepSolution:
          '১. পূর্ব দিককে ধনাত্মক ধরলে বল $\\vec{F}_1 = +10\\text{ N}$।\n২. পশ্চিম দিক বিপরীতমুখী হওয়ায় বল $\\vec{F}_2 = -10\\text{ N}$।\n৩. লব্ধি বল $\\vec{F} = \\vec{F}_1 + \\vec{F}_2 = (+10) + (-10) = 0\\text{ N}$।\nউত্তর: বল দুটি পরস্পরকে নিষ্ক্রিয় করে এবং মোট বল শূন্য হয়।',
      },
      memoryAid:
        '“কতটুকু?” জানলেই যথেষ্ট হলে স্কেলার। আর যদি “কতটুকু এবং কোন দিকে?” দুটিই জরুরি হয়, তবেই তা ভেক্টর!',
      status: ContentStatus.PUBLISHED,
    }
  );

  // 4. Topic 2.4: দূরত্ব ও সরণ
  await upsertTopicAndLesson(
    'top_ssc_physics_ch2_4',
    '২.৪ দূরত্ব ও সরণ (Distance and Displacement)',
    4,
    'les_ssc_physics_ch2_4',
    {
      titleBangla: 'দূরত্ব ও সরণ: পথ-দৈর্ঘ্য বনাম সরলরৈখিক দূরত্ব',
      learningGoal:
        'দূরত্ব ও সরণের পার্থক্য ব্যাখ্যা করতে পারা, পিথাগোরাসের উপপাদ্য প্রয়োগ করে সরণ গণনা করা এবং বৃত্তাকার পথে সরণ বিশ্লেষণ করা।',
      explanation: `# দূরত্ব ও সরণ (Distance and Displacement)

কোনো গতিশীল বস্তু এক স্থান থেকে অন্য স্থানে পৌঁছালে তার অবস্থানের রূপান্তরকে দুইভাবে মাপা যায়:

---

### দূরত্ব (Distance, $d$):
বস্তু চলার সময় যে পথ অতিক্রম করে, সেই **পথের মোট দৈর্ঘ্যকে** দূরত্ব বলে।
- এটি **স্কেলার রাশি**।
- এর মান পথের আকৃতির ওপর সম্পূর্ণ নির্ভরশীল।
- SI একক: মিটার ($\\text{m}$), মাত্রা: $[L]$।

---

### সরণ (Displacement, $\\vec{s}$):
আদি অবস্থান থেকে শেষ অবস্থানের দিকে সরাসরি **সরলরৈখিক ন্যূনতম দূরত্বকে** সরণ বলে।
- এটি **ভেক্টর রাশি** (দিক সর্বদা শুরুর বিন্দু হতে শেষ বিন্দুমুখী)।
- পথের বক্রতার ওপর নির্ভর করে না, কেবল শুরুর ও শেষের বিন্দুর ওপর নির্ভর করে।
- SI একক: মিটার ($\\text{m}$), মাত্রা: $[L]$।

---

### মূল গাণিতিক সম্পর্ক:
$$|\\vec{s}| \\le d$$
- যদি বস্তু সরলরেখায় কোনো দিক পরিবর্তন না করে চলে, কেবল তখনই $|\\vec{s}| = d$ হয়।
- যেকোনো বক্রপথে দূরত্ব সর্বদা সরণের চেয়ে বড় ($d > |\\vec{s}|$) হয়।
- পুরো বৃত্ত ঘুরে শুরুর বিন্দুতে ফিরে আসলে অতিক্রান্ত দূরত্ব $d = 2\\pi r$, কিন্তু **সরণ $\\vec{s} = 0$**!`,
      importantTerms: [
        {
          termBangla: 'দূরত্ব',
          termEnglish: 'Distance',
          definition: 'গতিশীল বস্তুর মোট অতিক্রান্ত পথের দৈর্ঘ্য (স্কেলার)।',
        },
        {
          termBangla: 'সরণ',
          termEnglish: 'Displacement',
          definition: 'আদি ও শেষ অবস্থানের মধ্যবর্তী সরলরৈখিক ন্যূনতম দূরত্ব (ভেক্টর)।',
        },
      ],
      workedExample: {
        problem:
          'একজন শিক্ষার্থী উত্তর দিকে $4\\text{ km}$ হেঁটে গেল। এরপর ডানদিকে সমকোণে মোড় নিয়ে পূর্ব দিকে আরও $3\\text{ km}$ গেল। তার অতিক্রান্ত দূরত্ব ও সরণ কত?',
        stepByStepSolution:
          '১. অতিক্রান্ত দূরত্ব $d = 4\\text{ km} + 3\\text{ km} = 7\\text{ km}$।\n২. উত্তর ও পূর্ব দিকের অন্তর্ভুক্ত কোণ $90^\\circ$ হওয়ায় পিথাগোরাসের সূত্রানুসারে:\n$$|\\vec{s}| = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5\\text{ km}$$\nদিক: উত্তর-পূর্ব দিকে।\nউত্তর: দূরত্ব $7\\text{ km}$ এবং সরণ উত্তর-পূর্ব দিকে $5\\text{ km}$।',
      },
      memoryAid:
        'আঁকাবাঁকা পথের মাপ দূরত্ব ভাই, শুরুর থেকে শেষের সোজা তীরেই সরণ পাই!',
      status: ContentStatus.PUBLISHED,
    }
  );

  // 5. Topic 2.5: দ্রুতি ও বেগ
  await upsertTopicAndLesson(
    'top_ssc_physics_ch2_5',
    '২.৫ দ্রুতি ও বেগ (Speed and Velocity)',
    5,
    'les_ssc_physics_ch2_5',
    {
      titleBangla: 'দ্রুতি ও বেগ: গড় ও তাৎক্ষণিক মান, একক ও মাত্রা',
      learningGoal:
        'দ্রুতি ও বেগের সংজ্ঞা, একক ও মাত্রা নিরূপণ করতে পারা, গড় ও তাৎক্ষণিক দ্রুতি/বেগের পার্থক্য ব্যাখ্যা করতে পারা এবং গাণিতিক সমস্যা সমাধান করা।',
      explanation: `# দ্রুতি ও বেগ (Speed and Velocity)

কোনো বস্তু কত দ্রুত চলছে এবং কোন দিকে চলছে—তা পরিমাপের জন্য দ্রুতি ও বেগ ব্যবহৃত হয়:

---

### ১. দ্রুতি (Speed, $v$):
সময়ের সাথে বস্তুর **দূরত্বের পরিবর্তনের হারকে** দ্রুতি বলে।
$$v = \\frac{d}{t} = \\frac{\\text{অতিক্রান্ত দূরত্ব}}{\\text{প্রয়োজনীয় সময়}}$$
- রাশি: **স্কেলার**।
- SI একক: $\\text{m/s}$ বা $\\text{ms}^{-1}$, মাত্রা: $[LT^{-1}]$।
- **গড় দ্রুতি:** $v_{\\text{avg}} = \\frac{\\text{মোট দূরত্ব}}{\\text{মোট সময়}}$।

---

### ২. বেগ (Velocity, $\\vec{v}$):
সময়ের সাথে বস্তুর **সরণের পরিবর্তনের হারকে** বেগ বলে (নির্দিষ্ট দিকে দ্রুতি)।
$$\\vec{v} = \\frac{\\vec{s}}{t} = \\frac{\\text{সরণ}}{\\text{প্রয়োজনীয় সময়}}$$
- রাশি: **ভেক্টর**।
- SI একক: $\\text{m/s}$ বা $\\text{ms}^{-1}$, মাত্রা: $[LT^{-1}]$।
- **গড় বেগ:** $\\vec{v}_{\\text{avg}} = \\frac{\\text{মোট সরণ}}{\\text{মোট সময়}}$।

---

### তাৎক্ষণিক দ্রুতি (Instantaneous Speed):
কোনো অতি ক্ষুদ্র মুহূর্তে বস্তুর দ্রুতিকে তাৎক্ষণিক দ্রুতি বলে। গাড়ির **স্পিডোমিটার (Speedometer)** সবসময় গাড়ির সেই মুহূর্তের তাৎক্ষণিক দ্রুতি নির্দেশ করে।`,
      importantTerms: [
        {
          termBangla: 'দ্রুতি',
          termEnglish: 'Speed',
          definition: 'সময়ের সাথে দূরত্বের পরিবর্তনের হার (স্কেলার)।',
        },
        {
          termBangla: 'বেগ',
          termEnglish: 'Velocity',
          definition: 'সময়ের সাথে নির্দিষ্ট দিকে সরণের পরিবর্তনের হার (ভেক্টর)।',
        },
        {
          termBangla: 'সুষম বেগ',
          termEnglish: 'Uniform Velocity',
          definition: 'গতিকালে বেগের মান ও দিক উভয়ই অপরিবর্তিত থাকা।',
        },
      ],
      workedExample: {
        problem:
          'একটি বাস আঁকাবাঁকা পথে $4000\\text{ m}$ দূরত্ব অতিক্রম করতে $20\\text{ min}$ সময় নেয়। বাসটির সরণ যদি সরলরেখায় $3000\\text{ m}$ পূর্ব দিকে হয়, তবে বাসের গড় দ্রুতি ও গড় বেগ নির্ণয় করো।',
        stepByStepSolution:
          'সময় $t = 20 \\times 60 = 1200\\text{ s}$।\n১. গড় দ্রুতি $v = \\frac{4000\\text{ m}}{1200\\text{ s}} \\approx 3.33\\text{ m/s}$।\n২. গড় বেগ $\\vec{v} = \\frac{3000\\text{ m}}{1200\\text{ s}} = 2.50\\text{ m/s}$ পূর্ব দিকে।\nউত্তর: গড় দ্রুতি $3.33\\text{ m/s}$ এবং গড় বেগ পূর্ব দিকে $2.50\\text{ m/s}$।',
      },
      memoryAid:
        'দূরত্ব থেকে দ্রুতি আসে (দ-এ দ), সরণ থেকে বেগ আসে (স-এ ব)!',
      status: ContentStatus.PUBLISHED,
    }
  );

  // 6. Topic 2.6: ত্বরণ ও মন্দন
  await upsertTopicAndLesson(
    'top_ssc_physics_ch2_6',
    '২.৬ ত্বরণ ও মন্দন (Acceleration and Deceleration)',
    6,
    'les_ssc_physics_ch2_6',
    {
      titleBangla: 'ত্বরণ ও মন্দন: বেগের পরিবর্তনের হার, মাত্রা ও একক',
      learningGoal:
        'ত্বরণ ও মন্দনের সমীকরণ প্রতিপাদন করতে পারা, একক ও মাত্রা বিশ্লেষণ করা এবং ব্রেকিং ও ত্বরণের গাণিতিক হিসাব সম্পন্ন করতে পারা।',
      explanation: `# ত্বরণ ও মন্দন (Acceleration & Deceleration)

কোনো গতিশীল বস্তু সমবেগে চললে তার ত্বরণ শূন্য ($a = 0$)। কিন্তু বস্তুর বেগ বৃদ্ধি বা হ্রাস পেলে সময়ের সাথে বেগের পরিবর্তন ঘটে:

---

### ত্বরণের সংজ্ঞা ও সূত্র:
সময়ের সাথে কোনো বস্তুর অসম বেগের পরিবর্তনের হারকে **ত্বরণ ($a$)** বলে।
$$a = \\frac{v - u}{t}$$
যেখানে:
- $u$ = আদিবেগ (Initial velocity, $\\text{m/s}$)
- $v$ = শেষ বেগ (Final velocity, $\\text{m/s}$)
- $t$ = সময় (Time, $\\text{s}$)
- $a$ = ত্বরণ (Acceleration, $\\text{m/s}^2$)

---

### মাত্রা ও একক:
- **SI একক:** $\\frac{\\text{m/s}}{\\text{s}} = \\text{m/s}^2$ বা $\\text{ms}^{-2}$
- **মাত্রা:** $\\frac{[LT^{-1}]}{[T]} = [LT^{-2}]$

---

### ধনাত্মক ত্বরণ বনাম ঋণাত্মক ত্বরণ (মন্দন):
- **ত্বরণ ($a > 0$):** যখন শেষ বেগ আদিবেগের চেয়ে বড় হয় ($v > u$), অর্থাৎ বেগ বৃদ্ধি পায়।
- **মন্দন ($a < 0$):** যখন শেষ বেগ আদিবেগের চেয়ে ছোট হয় ($v < u$), অর্থাৎ বেগ হ্রাস পায়। একে ঋণাত্মক ত্বরণ বলা হয়।

> **সতর্কতা:** মন্দন বললে আলাদা করে ঋণাত্মক চিহ্ন দিতে হয় না। যেমন: ত্বরণ $-4\\text{ m/s}^2$ মানেই মন্দন $4\\text{ m/s}^2$।`,
      importantTerms: [
        {
          termBangla: 'ত্বরণ',
          termEnglish: 'Acceleration',
          definition: 'সময়ের সাথে বেগের পরিবর্তনের হার ($a = \\frac{v-u}{t}$)।',
        },
        {
          termBangla: 'মন্দন',
          termEnglish: 'Deceleration / Retardation',
          definition: 'সময়ের সাথে বেগ হ্রাসের হার (ঋণাত্মক ত্বরণ)।',
        },
        {
          termBangla: 'সুষম ত্বরণ',
          termEnglish: 'Uniform Acceleration',
          definition: 'নির্দিষ্ট দিকে সর্বদা সমান হারে বেগ বৃদ্ধি পাওয়া।',
        },
      ],
      workedExample: {
        problem:
          'একটি প্রাইভেট কার $20\\text{ m/s}$ আদিবেগে চলছিল। ব্রেক চাপায় গাড়িটি সুষমভাবে ধীর হয়ে $5\\text{ s}$ পর সম্পূর্ণ থেমে গেল। গাড়িটির ত্বরণ ও মন্দন কত?',
        stepByStepSolution:
          'আদিবেগ $u = 20\\text{ m/s}$, শেষ বেগ $v = 0\\text{ m/s}$, সময় $t = 5\\text{ s}$।\n$$a = \\frac{v - u}{t} = \\frac{0 - 20}{5} = -4\\text{ m/s}^2$$\nউত্তর: ত্বরণ $-4\\text{ m/s}^2$ এবং মন্দন $4\\text{ m/s}^2$।',
      },
      memoryAid:
        'এক্সিলারেটরে চাপ দিলে বেগ বাড়ে $\\implies$ ত্বরণ ($a>0$)। ব্রেকে চাপ দিলে বেগ কমে $\\implies$ মন্দন ($a<0$)!',
      status: ContentStatus.PUBLISHED,
    }
  );

  // 7. Topic 2.7: গতির সমীকরণ
  await upsertTopicAndLesson(
    'top_ssc_physics_ch2_7',
    '২.৭ গতির সমীকরণ (Equations of Motion)',
    7,
    'les_ssc_physics_ch2_7',
    {
      titleBangla: 'গতির সমীকরণ: ৪টি মৌলিক সূত্র ও লাইভ কার সিমুলেটর',
      learningGoal:
        'সুষম ত্বরণে সরলরৈখিক গতির ৪টি সমীকরণ প্রতিপাদন করতে পারা, সঠিক সমীকরণ নির্বাচন কৌশল আয়ত্ত করা এবং ইন্টারেক্টিভ ল্যাব দিয়ে গতি যাচাই করা।',
      explanation: `# গতির সমীকরণ (Equations of Motion)

কোনো বস্তু নির্দিষ্ট দিকে **সুষম ত্বরণে ($a$)** সরলরেখা বরাবর গতিশীল থাকলে তার ৫টি চলকের ($u, v, a, t, s$) সম্পর্ককে গতির ৪টি সমীকরণ বলা হয়:

---

### গতির ৪টি মৌলিক সমীকরণ:
১. $v = u + at$ (সরণ $s$ অনুপস্থিত থাকলে)
২. $s = \\frac{u + v}{2} \\times t$ (ত্বরণ $a$ অনুপস্থিত থাকলে)
৩. $s = ut + \\frac{1}{2}at^2$ (শেষ বেগ $v$ অনুপস্থিত থাকলে)
৪. $v^2 = u^2 + 2as$ (সময় $t$ অনুপস্থিত থাকলে)

---

### প্রতিপাদনের সারসংক্ষেপ:
- ত্বরণের সূত্র থেকে: $a = \\frac{v - u}{t} \\implies v = u + at$।
- গড় বেগ $\\bar{v} = \\frac{u + v}{2}$, সরণ $s = \\bar{v}t \\implies s = \\frac{u + v}{2}t$।
- $v = u + at$ বসালে: $s = ut + \\frac{1}{2}at^2$।
- $t = \\frac{v - u}{a}$ বসালে: $v^2 = u^2 + 2as$।

---

### স্থির অবস্থা ($u = 0$) থেকে শুরু করলে:
- $v = at$
- $s = \\frac{1}{2}at^2 \\implies s \\propto t^2$ (অতিক্রান্ত দূরত্ব সময়ের বর্গের সমানুপাতিক!)
- $v^2 = 2as \\implies v \\propto \\sqrt{s}$`,
      interactiveWidgetUrl: '/uploads/interactive/motion-simulator.html',
      importantTerms: [
        {
          termBangla: 'গতির সমীকরণ',
          termEnglish: 'Equations of Motion',
          definition: 'সুষম ত্বরণে গতিশীল বস্তুর আদিবেগ, শেষবেগ, ত্বরণ, সময় ও সরণের সম্পর্কযুক্ত সমীকরণ।',
        },
        {
          termBangla: 'সরণ-সময় সম্পর্ক',
          termEnglish: 'Displacement-Time Relation',
          definition: '$s = ut + \\frac{1}{2}at^2$ সূত্র যেখানে সরণ সময়ের ওপর নির্ভরশীল।',
        },
      ],
      workedExample: {
        problem:
          'একটি স্থির ট্রেন $2\\text{ m/s}^2$ সুষম ত্বরণে চলতে শুরু করল। $5\\text{ s}$ পর ট্রেনের শেষ বেগ ও অতিক্রান্ত দূরত্ব কত?',
        stepByStepSolution:
          'প্রদত্ত: $u = 0\\text{ m/s}$, $a = 2\\text{ m/s}^2$, $t = 5\\text{ s}$।\n১. শেষ বেগ: $v = u + at = 0 + (2 \\times 5) = 10\\text{ m/s}$।\n২. সরণ: $s = ut + \\frac{1}{2}at^2 = 0 + \\frac{1}{2} \\times 2 \\times (5)^2 = 25\\text{ m}$।\nউত্তর: শেষ বেগ $10\\text{ m/s}$ এবং দূরত্ব $25\\text{ m}$।',
      },
      memoryAid:
        'চলক চেনার জাদু:\n• s নেই? $v = u + at$\n• a নেই? $s = \\frac{u+v}{2}t$\n• v নেই? $s = ut + \\frac{1}{2}at^2$\n• t নেই? $v^2 = u^2 + 2as$!',
      status: ContentStatus.PUBLISHED,
    }
  );

  // 8. Topic 2.8: পতনশীল বস্তুর সূত্র ও লেখচিত্র
  await upsertTopicAndLesson(
    'top_ssc_physics_ch2_8',
    '২.৮ পতনশীল বস্তুর সূত্র ও লেখচিত্র (Falling Bodies & Graphs)',
    8,
    'les_ssc_physics_ch2_8',
    {
      titleBangla: 'পতনশীল বস্তুর সূত্র ও গতির লেখচিত্র বিশ্লেষণ',
      learningGoal:
        'গ্যালিলিওর ৩টি সূত্র ব্যাখ্যা করতে পারা, অভিকর্ষজ ত্বরণে মুক্তপতন ও নিক্ষিপ্ত বস্তুর হিসাব করা এবং s-t ও v-t লেখচিত্র বিশ্লেষণ করতে পারা।',
      explanation: `# পতনশীল বস্তুর সূত্র ও লেখচিত্র (Falling Bodies & Graphs)

বিজ্ঞানী গ্যালিলিও বাতাসহীন মাধ্যমে মুক্তভাবে পড়ন্ত বস্তুর জন্য ৩টি সূত্র প্রদান করেন:

---

### গ্যালিলিওর ৩টি সূত্র:
১. **প্রথম সূত্র:** স্থির অবস্থান ও একই উচ্চতা থেকে বিনা বাধায় পড়ন্ত সকল বস্তু সমান সময়ে সমান পথ অতিক্রম করে।
২. **দ্বিতীয় সূত্র:** স্থির অবস্থা থেকে বিনা বাধায় পড়ন্ত বস্তুর নির্দিষ্ট সময়ে প্রাপ্ত বেগ ($v$) ঐ সময়ের ($t$) সমানুপাতিক ($v \\propto t$)।
৩. **তৃতীয় সূত্র:** স্থির অবস্থা থেকে বিনা বাধায় পড়ন্ত বস্তু নির্দিষ্ট সময়ে যে দূরত্ব ($h$) অতিক্রম করে, তা ঐ সময়ের ($t$) বর্গের সমানুপাতিক ($h \\propto t^2$)।

---

### অভিকর্ষজ ত্বরণ ($g = 9.8\\text{ m/s}^2$) সংক্রান্ত সূত্র:
- **নিচে পড়ন্ত বস্তুর ক্ষেত্রে ($a = +g$):**
  - $v = u + gt$
  - $h = ut + \\frac{1}{2}gt^2$
  - $v^2 = u^2 + 2gh$
- **খাড়া উপরে নিক্ষিপ্ত বস্তুর ক্ষেত্রে ($a = -g$):**
  - $v = u - gt$
  - $h = ut - \\frac{1}{2}gt^2$
  - $v^2 = u^2 - 2gh$
  - সর্বোচ্চ উচ্চতা: $H_{\\text{max}} = \\frac{u^2}{2g}$
  - সর্বোচ্চ উচ্চতায় ওঠার সময়: $t_{\\text{rise}} = \\frac{u}{g}$
  - মোট উড্ডয়নকাল: $T = \\frac{2u}{g}$

---

### গতির লেখচিত্র (Motion Graphs):
- **সরণ-সময় ($s-t$) লেখচিত্রের ঢাল (Slope) = বেগ ($v$)**।
- **বেগ-সময় ($v-t$) লেখচিত্রের ঢাল = ত্বরণ ($a$)**।
- **বেগ-সময় ($v-t$) লেখচিত্রের নিচের ক্ষেত্রফল = অতিক্রান্ত দূরত্ব বা সরণ ($s$)**।`,
      importantTerms: [
        {
          termBangla: 'অভিকর্ষজ ত্বরণ',
          termEnglish: 'Gravitational Acceleration',
          definition: 'ভূপৃষ্ঠের কাছাকাছি অভিকর্ষ বলের প্রভাবে পড়ন্ত বস্তুর বেগ বৃদ্ধির হার ($g = 9.8\\text{ m/s}^2$)।',
        },
        {
          termBangla: 'মুক্তপতন',
          termEnglish: 'Free Fall',
          definition: 'কেবলমাত্র মাধ্যাকর্ষণ বলের প্রভাবে বাতাসের বাধা উপেক্ষা করে বস্তুর নিচে পড়া।',
        },
        {
          termBangla: 'উড্ডয়নকাল',
          termEnglish: 'Time of Flight',
          definition: 'নিক্ষিপ্ত বস্তু মোট যে সময় শূন্যে বিচরণ করে ($T = \\frac{2u}{g}$)।',
        },
      ],
      workedExample: {
        problem:
          'একটি পাথর স্থির অবস্থা থেকে মুক্তভাবে পড়ে $3\\text{ s}$ পর মাটিতে স্পর্শ করল। ভবনের উচ্চতা কত এবং মাটিতে স্পর্শের মুহূর্তে বেগ কত? ($g = 9.8\\text{ m/s}^2$)',
        stepByStepSolution:
          'আদিবেগ $u = 0$, $t = 3\\text{ s}$, $g = 9.8\\text{ m/s}^2$।\n১. ভবনের উচ্চতা $h = ut + \\frac{1}{2}gt^2 = 0 + \\frac{1}{2} \\times 9.8 \\times (3)^2 = 44.1\\text{ m}$।\n২. শেষ বেগ $v = u + gt = 0 + (9.8 \\times 3) = 29.4\\text{ m/s}$।\nউত্তর: ভবনের উচ্চতা $44.1\\text{ m}$ এবং স্পর্শের বেগ $29.4\\text{ m/s}$।',
      },
      memoryAid:
        'পড়ন্ত বস্তুর ক্ষেত্রে $h \\propto t^2$:\n১ সেকেন্ডে ১ গুণ পড়লে, ২ সেকেন্ডে ৪ গুণ, আর ৩ সেকেন্ডে ৯ গুণ দূরত্ব পড়বে!',
      status: ContentStatus.PUBLISHED,
    }
  );

  console.log('🎉 Successfully seeded all 8 topics and lessons for Chapter 2: গতি!');

  console.log(`Seeding ${chapter2Questions.length} Chapter 2 MCQs and CQs...`);
  for (const q of chapter2Questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: q as any,
      create: q as any,
    });
  }
  console.log(`✅ Successfully seeded ${chapter2Questions.length} MCQs and CQs for Chapter 2!`);
}

if (require.main === module || process.argv[1]?.includes('seed-chapter-2')) {
  const prisma = new PrismaClient();
  seedChapter2(prisma)
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
