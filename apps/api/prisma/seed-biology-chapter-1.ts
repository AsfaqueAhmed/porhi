import { PrismaClient, ContentStatus } from '@prisma/client';
import { biologyChapter1QuestionsBatch1 } from './seed-biology-chapter-1-questions';
import { biologyChapter1QuestionsBatch2 } from './seed-biology-chapter-1-questions-batch2';
import { biologyChapter1QuestionsBatch3 } from './seed-biology-chapter-1-questions-batch3';

export const sscBiologySubject = {
  id: 'sub_ssc_biology',
  code: 'ssc_biology',
  nameBangla: 'জীববিজ্ঞান',
  classLevel: 'CLASS_9_10',
  program: 'SSC',
  syllabusYear: 2026,
  isReady: true,
};

export const biologyChapter1AllQuestions = [
  ...biologyChapter1QuestionsBatch1,
  ...biologyChapter1QuestionsBatch2,
  ...biologyChapter1QuestionsBatch3,
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

export async function seedBiologyChapter1(prisma: PrismaClient) {
  console.log('🧬 Seeding SSC Biology Chapter 1 (জীবনপাঠ / Lessons on Life)...');

  await prisma.subject.upsert({
    where: { code: sscBiologySubject.code },
    update: sscBiologySubject,
    create: sscBiologySubject,
  });

  const chapter1 = await prisma.chapter.upsert({
    where: { id: 'chap_ssc_biology_ch1' },
    update: {
      subjectId: sscBiologySubject.id,
      orderIndex: 1,
      titleBangla: 'প্রথম অধ্যায়: জীবনপাঠ (Lessons on Life)',
    },
    create: {
      id: 'chap_ssc_biology_ch1',
      subjectId: sscBiologySubject.id,
      orderIndex: 1,
      titleBangla: 'প্রথম অধ্যায়: জীবনপাঠ (Lessons on Life)',
    },
  });

  // -------------------------------------------------------------------------
  // Topic 1.1: জীববিজ্ঞানের ধারণা
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_biology_ch1_1',
    chapter1.id,
    1,
    '১.১ জীববিজ্ঞানের ধারণা (Concept of Biology)',
    'les_ssc_biology_ch1_1',
    {
      titleBangla: 'জীববিজ্ঞানের ধারণা, ভৌতবিজ্ঞানের সাথে সম্পর্ক ও ইতিহাস',
      learningGoal: 'Biology শব্দের উৎপত্তি (bios + logos), জড় উপাদানের জটিল সমাবেশে নতুন গুণের উদ্ভব (পানির উদাহরণ), বর্তমান শতকের ৩টি চ্যালেঞ্জ এবং প্রাচীন ৫ সভ্যতায় জীববিজ্ঞান চর্চার ইতিহাস মুখস্থ ও ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. বর্তমান শতকের ৩টি বড় চ্যালেঞ্জ (মুখস্থ পয়েন্ট)
- **(১) খাদ্য উৎপাদন**, **(২) চিকিৎসাশাস্ত্রের উন্নয়ন** এবং **(৩) বিরূপ পরিবেশে জীবনের অস্তিত্ব রক্ষা** — এই তিন ক্ষেত্রেই জীববিজ্ঞানের ভূমিকা অপরিসীম।

### ২. জীব বনাম জড় এবং “নতুন গুণের উদ্ভব”
- মোটা দাগে যাদের জীবন আছে তারা **জীব**, আর যাদের জীবন নেই তারা **জড়**। কিন্তু বিজ্ঞানের সূক্ষ্ম বিচারে জড়ের শেষ আর জীবনের শুরু কোথায় তা অনেক সময় বলা মুশকিল।
- জীবনের ভিত্তিমূলে কাজ করে **পদার্থবিজ্ঞান ও রসায়নের** সেই একই নিয়ম যা জড়জগৎকেও নিয়ন্ত্রণ করে। তাই জীবজগৎ বুঝতে ভৌতবিজ্ঞানের জ্ঞান জরুরি।
- **তবুও জীববিজ্ঞান আলাদাভাবে পড়া জরুরি কেন?** জীবন হলো অনেকগুলো জড়ের এমন জটিল সমাবেশ, যেখানে জটিলতার কারণে **নতুন কিছু গুণের উদ্ভব** ঘটে।
  - **পানির উদাহরণ:** হাইড্রোজেন ও অক্সিজেনের নির্দিষ্ট আনুপাতিক সংযোগে পানি তৈরি হয়, যার বৈশিষ্ট্য হাইড্রোজেন বা অক্সিজেন কোনোটার মতোই হয় না। তেমনি জড় গাঠনিক উপাদানের সুনির্দিষ্ট সন্নিবেশে তৈরি জীবে এমন নতুন বৈশিষ্ট্য উদ্ভব হয় যা জড় উপাদানে ছিল না।

### ৩. Biology শব্দের উৎপত্তি ও প্রাচীন চর্চা
- গ্রিক শব্দ **bios (জীবন)** + **logos (জ্ঞান)** = **Biology (জীববিজ্ঞান)**।
- **চিকিৎসা ও কৃষিসংক্রান্ত** গুরুত্বের কারণে আদিকাল থেকেই **গ্রিস, মিশর, মধ্যপ্রাচ্য, ভারতবর্ষ ও চীন**—এই ৫ অঞ্চলের সভ্যতায় জীববিজ্ঞান চর্চা হয়েছে।`,
      importantTerms: [
        { termBangla: 'জীববিজ্ঞান', termEnglish: 'Biology', definition: 'গ্রিক bios (জীবন) ও logos (জ্ঞান) থেকে গঠিত বিজ্ঞানের যে শাখায় জীবজগৎ ও জীবনের বৈশিষ্ট্য আলোচিত হয়।' },
        { termBangla: 'ভৌতবিজ্ঞান', termEnglish: 'Physical Sciences', definition: 'পদার্থবিজ্ঞান ও রসায়ন—যার নিয়ম জড়জগৎ ও জীবজগৎ উভয়ের ভিত্তিমূলে কাজ করে।' },
        { termBangla: 'প্রাচীন ৫ সভ্যতা', termEnglish: 'Ancient Civilizations', definition: 'গ্রিস, মিশর, মধ্যপ্রাচ্য, ভারতবর্ষ ও চীন—যেখানে চিকিৎসা ও কৃষির প্রয়োজনে আদিকাল থেকে জীববিজ্ঞান চর্চা হয়েছে।' },
      ],
      workedExample: {
        problem: '“ভৌতবিজ্ঞান জানলে আলাদা করে জীববিজ্ঞান পাঠ নিষ্প্রয়োজন”—কেন এই ধারণাটি ভুল? (অনুধাবন প্রশ্ন)',
        stepByStepSolution: '১. জীবদেহ জড় উপাদানে গঠিত এবং পদার্থবিজ্ঞান-রসায়নের নিয়ম মানে।\n২. তবুও হাইড্রোজেন ও অক্সিজেন মিলে যেমন সম্পূর্ণ নতুন ধর্মের পানি তৈরি হয়, তেমনি জড় উপাদানের জটিল সন্নিবেশে জীবে এমন নতুন বৈশিষ্ট্যের উদ্ভব ঘটে যা জড় উপাদানে ছিল না।\n৩. এই নতুন বৈশিষ্ট্যগুলো (জীবন) বুঝতে আলাদা করে জীববিজ্ঞান পড়া অপরিহার্য।',
      },
      memoryAid: 'প্রাচীন ৫ সভ্যতার ছন্দ “গ্রি-মি-ম-ভা-চী”: গ্রিস · মিশর · মধ্যপ্রাচ্য · ভারতবর্ষ · চীন। আর ৩ চ্যালেঞ্জ: খা (খাদ্য) · চি (চিকিৎসা) · বি (বিরূপ পরিবেশ)!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 1.2: জীববিজ্ঞানের শাখাসমূহ
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_biology_ch1_2',
    chapter1.id,
    2,
    '১.২ জীববিজ্ঞানের শাখাসমূহ (Branches of Biology)',
    'les_ssc_biology_ch1_2',
    {
      titleBangla: 'ভৌত (১১টি) ও ফলিত (১৭টি) জীববিজ্ঞানের শাখা — গ্রুপ ও শব্দমূল কৌশল',
      learningGoal: 'ভৌত (তাত্ত্বিক) ১১টি ও ফলিত (প্রায়োগিক) ১৭টি শাখার নাম, ইংরেজি পরিভাষা, আলোচ্য বিষয় এবং পরীক্ষার বিভ্রান্তিকর জোড়াগুলো (যেমন বংশগতিবিদ্যা বনাম জিনপ্রযুক্তি) নির্ভুলভাবে মনে রাখতে পারবে।',
      explanation: `### ১. কেন কেবল উদ্ভিদবিজ্ঞান ও প্রাণিবিজ্ঞান যথেষ্ট নয়?
- **ব্যাকটেরিয়ার** মতো অনেক জীব উদ্ভিদ বা প্রাণী কোনোটিই নয়।
- উদ্ভিদ, প্রাণী, ব্যাকটেরিয়া, ছত্রাক ও ভাইরাসের **সাধারণ বৈশিষ্ট্য** একসাথে বিশ্লেষণ করতে ধরনভিত্তিক শাখা কার্যকর নয়।
- তাই জীববিজ্ঞানকে দুটি প্রধান ভাগে ভাগ করা হয়েছে: **ভৌত/মৌলিক শাখা** (তাত্ত্বিক ভিত্তি প্রধান) এবং **ফলিত শাখা** (প্রয়োগের দিক বড়)।

### ২. ভৌত জীববিজ্ঞান — ১১টি শাখা (৪টি স্মৃতি-গ্রুপে মুখস্থ করো)
| স্মৃতি-গ্রুপ | শাখাসমূহ (বাংলা ও ইংরেজি) | এক-শব্দের ক্লু |
| :--- | :--- | :--- |
| **গঠন (৪টি)** | অঙ্গসংস্থান (Morphology: বহিঃ ও অন্তঃ), হিস্টোলজি (Histology), কোষবিদ্যা (Cytology), ভ্রূণবিদ্যা (Embryology) | দেহ · টিস্যু · কোষ · ভ্রূণ |
| **কাজ (২টি)** | শারীরবিদ্যা (Physiology), এন্ডোক্রাইনোলজি (Endocrinology) | শ্বসন-রেচন-সালোকসংশ্লেষণ · হরমোন |
| **বংশ-ইতিহাস (২টি)** | বংশগতিবিদ্যা (Genetics), বিবর্তনবিদ্যা (Evolution) | জিন · ক্রমবিকাশ |
| **বাইরের জগৎ (৩টি)** | শ্রেণিবিন্যাসবিদ্যা (Taxonomy), বাস্তুবিদ্যা (Ecology), জীবভূগোল (Biogeography) | শ্রেণিবিন্যাস · পরিবেশ-সম্পর্ক · ভৌগোলিক বিস্তার |

### ৩. ফলিত জীববিজ্ঞান — ১৭টি শাখা (৪টি স্মৃতি-গ্রুপে মুখস্থ করো)
- **মাঠ-পানি-বন (৬টি):** মৎস্যবিজ্ঞান (Fisheries), কৃষিবিজ্ঞান (Agriculture), বনবিজ্ঞান (Forestry), বন্য প্রাণিবিদ্যা (Wildlife), সামুদ্রিক জীববিজ্ঞান (Marine Biology), পরিবেশবিজ্ঞান (Environmental Science)।
- **রোগ-ক্ষুদ্রজীব-ওষুধ (৫টি):** চিকিৎসাবিজ্ঞান (Medical Science), ফার্মেসি (Pharmacy), অণুজীববিজ্ঞান (Microbiology — ভাইরাস, ব্যাকটেরিয়া, আণুবীক্ষণিক ছত্রাক), পরজীবীবিদ্যা (Parasitology), কীটতত্ত্ব (Entomology — কীটপতঙ্গ)।
- **প্রযুক্তি-তথ্য-রসায়ন (৫টি):** জিনপ্রযুক্তি (Genetic Engineering), জীবপ্রযুক্তি (Biotechnology), প্রাণরসায়ন (Biochemistry), জীবপরিসংখ্যানবিদ্যা (Biostatistics), বায়োইনফরমেটিকস (Bioinformatics — কম্পিউটারনির্ভর তথ্য, যেমন ক্যান্সার বিশ্লেষণ)।
- **অতীত (১টি):** জীবাশ্মবিজ্ঞান (Palaeontology — প্রাগৈতিহাসিক জীব ও জীবাশ্ম)।

### ৪. পরীক্ষার সবচেয়ে বড় ৫টি ফাঁদ জোড়া (ভৌত ↔ ফলিত)
- **বংশগতিবিদ্যা (ভৌত)** ↔ **জিনপ্রযুক্তি (ফলিত)**
- **বাস্তুবিদ্যা (ভৌত)** ↔ **পরিবেশবিজ্ঞান (ফলিত)**
- **শারীরবিদ্যা (ভৌত)** ↔ **প্রাণরসায়ন (ফলিত)**
- **বিবর্তনবিদ্যা (ভৌত)** ↔ **জীবাশ্মবিজ্ঞান (ফলিত)**
- **কোষবিদ্যা = কোষ** ↔ **হিস্টোলজি = টিস্যু** (উভয়ই ভৌত)`,
      importantTerms: [
        { termBangla: 'হিস্টোলজি ও কোষবিদ্যা', termEnglish: 'Histology & Cytology', definition: 'হিস্টোলজিতে টিস্যু এবং কোষবিদ্যায় (Cytology) কোষের গঠন, কাজ ও বিভাজন আলোচিত হয় (উভয়ই ভৌত শাখা)।' },
        { termBangla: 'এন্ডোক্রাইনোলজি', termEnglish: 'Endocrinology', definition: 'জীবদেহে হরমোনের কার্যকারিতা বিষয়ক ভৌত জীববিজ্ঞানের শাখা।' },
        { termBangla: 'এন্টোমোলজি', termEnglish: 'Entomology', definition: 'কীটপতঙ্গের জীবন, উপকারিতা, অপকারিতা, ক্ষয়ক্ষতি ও দমন বিষয়ক ফলিত শাখা।' },
        { termBangla: 'বায়োইনফরমেটিকস', termEnglish: 'Bioinformatics', definition: 'কম্পিউটার প্রযুক্তিনির্ভর জীববিজ্ঞানভিত্তিক তথ্য (যেমন ক্যান্সার বিশ্লেষণ) সম্পর্কিত ফলিত শাখা।' },
      ],
      workedExample: {
        problem: 'মৎস্যবিজ্ঞান এবং বংশগতিবিদ্যা জীববিজ্ঞানের কোন কোন শাখার অন্তর্ভুক্ত? ব্যাখ্যা করো।',
        stepByStepSolution: '১. মৎস্যবিজ্ঞান (Fisheries) ফলিত জীববিজ্ঞানের অন্তর্ভুক্ত—কারণ এখানে মাছ উৎপাদন, ব্যবস্থাপনা ও সংরক্ষণের প্রায়োগিক দিকটি বড়।\n২. বংশগতিবিদ্যা (Genetics) ভৌত জীববিজ্ঞানের অন্তর্ভুক্ত—কারণ এখানে জিন ও বংশগতিধারার তাত্ত্বিক ভিত্তি অনুসন্ধানই মুখ্য।',
      },
      memoryAid: 'মোট ২৮ শাখা = ১১ ভৌত (a–k) + ১৭ ফলিত (a–q)। মনে রাখো: Cyto = কোষ, Histo = টিস্যু, Entomo = কীট, Palaeo = প্রাচীন জীবাশ্ম, Endo-crine = হরমোন!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 1.3: জীবের শ্রেণিবিন্যাস ও জীবজগৎ (+ Interactive Lab)
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_biology_ch1_3',
    chapter1.id,
    3,
    '১.৩ জীবের শ্রেণিবিন্যাস ও জীবজগৎ (Classification & Five-Kingdom Lab)',
    'les_ssc_biology_ch1_3',
    {
      titleBangla: 'শ্রেণিবিন্যাসের উদ্দেশ্য, বিজ্ঞানী-সাল টাইমলাইন ও ৫ রাজ্যের তুলনামূলক ছক',
      learningGoal: 'লিনিয়াস, হুইটেকার (1969), মারগুলিস (1974) ও কেভলিয়ার-স্মিথ (2004)-এর অবদান এবং মনেরা, প্রোটিস্টা, ফানজাই, প্ল্যানটি ও অ্যানিমেলিয়ার শনাক্তকারী বৈশিষ্ট্য ও উদাহরণ নির্ভুলভাবে মনে রাখতে পারবে।',
      explanation: `### ১. প্রজাতির সংখ্যা ও শ্রেণিবিন্যাসের উদ্দেশ্য
- বর্ণিত উদ্ভিদ প্রজাতি ≈ **৪ লক্ষ**, প্রাণী প্রজাতি ≈ **১৩ লক্ষ** এবং ভবিষ্যতে মোট ≈ **১ কোটি** প্রজাতি হতে পারে।
- **লক্ষ্য:** বিশাল ও বৈচিত্র্যময় জীবজগৎকে **সহজে, অল্প পরিশ্রমে ও অল্প সময়ে** সঠিকভাবে জানা।
- **পরীক্ষার ফাঁদ (বইয়ের ২ নং MCQ):** শ্রেণিবিন্যাসের উদ্দেশ্য হলো পূর্ণাঙ্গ জ্ঞানকে **সংক্ষিপ্তভাবে** উপস্থাপন করা (*বিস্তারিতভাবে নয়!*)।

### ২. বিজ্ঞানী ও সাল টাইমলাইন (অবশ্যই মুখস্থ)
- **ক্যারোলাস লিনিয়াস (1707–1778):** সুইডিশ প্রকৃতিবিদ; **1735** সালে আপসালা বিশ্ববিদ্যালয় থেকে চিকিৎসায় ডিগ্রি ও অ্যানাটমির অধ্যাপক হন। জীবজগৎকে **২ জগতে** (উদ্ভিদজগৎ ও প্রাণিজগৎ) ভাগ করেন।
- **আর. এইচ. হুইটেকার (1969):** DNA/RNA, কোষের বৈশিষ্ট্য, কোষসংখ্যা ও খাদ্যাভ্যাসের ভিত্তিতে **৫ রাজ্য (Five Kingdom)** প্রস্তাব করেন।
- **মারগুলিস (1974):** **২টি সুপার কিংডম** (প্রোক্যারিওটা ও ইউক্যারিওটা) ও তার অধীনে ৫টি রাজ্য সাজান।
- **টমাস কেভলিয়ার-স্মিথ (2004, অক্সফোর্ড):** প্রোটিস্টাকে **প্রোটোজোয়া** ও **ক্রোমিস্টা** দুই ভাগে ভাগ করেন এবং মনেরাকে **ব্যাকটেরিয়া রাজ্য** নাম দিয়ে মোট **৬টি রাজ্য** করেন।

### ৩. ৫ রাজ্যের তুলনামূলক মুখস্থ ছক (এক-লাইনের পাসপোর্ট)
| রাজ্য (সুপার কিংডম) | নিউক্লিয়াস ও কোষ | খাদ্যগ্রহণ ও প্রাচীর | জনন ও ভ্রূণ | উদাহরণ |
| :--- | :--- | :--- | :--- | :--- |
| **১. মনেরা** (প্রোক্যারিওটা) | আদিকোষ; নিউক্লিয়ার পর্দা-নিউক্লিওলাস-প্লাস্টিড-মাইটোকন্ড্রিয়া নেই, **রাইবোজোম আছে** | প্রধানত শোষণ; কেউ কেউ সালোকসংশ্লেষণ | দ্বিবিভাজন | ব্যাকটেরিয়া, নীলাভ সবুজ শৈবাল (*Nostoc*) |
| **২. প্রোটিস্টা** (ইউক্যারিওটা) | সুগঠিত নিউক্লিয়াস (DNA, RNA, প্রোটিন) ও সব অঙ্গাণু | শোষণ বা সালোকসংশ্লেষণ | মাইটোসিস (অযৌন), কনজুগেশন (যৌন); **ভ্রূণ হয় না** | অ্যামিবা, প্যারামেসিয়াম, ডায়াটম ও শৈবাল |
| **৩. ফানজাই** (ইউক্যারিওটা) | সুগঠিত নিউক্লিয়াস; এককোষী বা **মাইসেলিয়াম** | **কাইটিন** কোষপ্রাচীর; ক্লোরোপ্লাস্ট নেই; শোষণ (মৃতজীবী/পরজীবী) | হ্যাপ্লয়েড স্পোর | ইস্ট, *Penicillium*, মাশরুম |
| **৪. প্ল্যানটি** (ইউক্যারিওটা) | সুগঠিত নিউক্লিয়াস; উন্নত টিস্যুতন্ত্র | সালোকসংশ্লেষণকারী সবুজ উদ্ভিদ | **অ্যানাইসোগ্যামাস** যৌন জনন; ভ্রূণ → ডিপ্লয়েড | সবুজ উদ্ভিদ (কাঁঠাল গাছ) |
| **৫. অ্যানিমেলিয়া** (ইউক্যারিওটা) | বহুকোষী; জটিল টিস্যুতন্ত্র; **কোষপ্রাচীর-প্লাস্টিড-কোষগহ্বর নেই** | হেটেরোট্রফিক (পরভোজী) ও খাদ্য গলাধঃকরণ | প্রধানত যৌন; হ্যাপ্লয়েড গ্যামেট; **ভ্রূণীয় স্তর** | প্রোটোজোয়া ছাড়া সব অমেরুদণ্ডী ও মেরুদণ্ডী প্রাণী |`,
      interactiveWidgetUrl: '/uploads/interactive/five-kingdom-microscope-lab.html',
      importantTerms: [
        { termBangla: 'প্রোক্যারিওটা ও ইউক্যারিওটা', termEnglish: 'Prokaryota & Eukaryota', definition: 'মারগুলিস (1974) প্রদত্ত ২টি সুপার কিংডম: আদিকোষী (মনেরা) ও প্রকৃতকোষী (বাকি ৪ রাজ্য)।' },
        { termBangla: 'মাইসেলিয়াম ও কাইটিন', termEnglish: 'Mycelium & Chitin', definition: 'ফানজাইয়ের সরু সুতার মতো দেহগঠনকে মাইসেলিয়াম এবং এদের কোষপ্রাচীরের উপাদানকে কাইটিন বলে।' },
        { termBangla: 'অ্যানাইসোগ্যামাস জনন', termEnglish: 'Anisogamous Reproduction', definition: 'প্ল্যানটি রাজ্যে আকার-আকৃতি বা শারীরবৃত্তীয় পার্থক্যবিশিষ্ট ভিন্নধর্মী দুটি গ্যামেটের মিলন।' },
      ],
      workedExample: {
        problem: 'মাশরুম (ফানজাই) ও সবুজ গাছ (প্ল্যানটি)-এর মধ্যে কোনটি অধিক উন্নত? যুক্তি দাও। (পাঠ্যবই সৃজনশীল ঘ)',
        stepByStepSolution: 'সবুজ গাছ (প্ল্যানটি) অধিক উন্নত। কারণ:\n১. প্ল্যানটিতে উন্নত টিস্যুতন্ত্র আছে; ফানজাই মাইসেলিয়ামনির্ভর।\n২. প্ল্যানটিতে ক্লোরোপ্লাস্ট থাকায় নিজেই খাদ্য তৈরি করে; ফানজাই ক্লোরোপ্লাস্টহীন ও পরনির্ভর শোষণকারী।\n৩. প্ল্যানটিতে ভ্রূণ সৃষ্টি হয়ে ডিপ্লয়েড পর্যায় শুরু হয় ও যৌন জনন অ্যানাইসোগ্যামাস; ফানজাই হ্যাপ্লয়েড স্পোরে বংশবৃদ্ধি করে।',
      },
      memoryAid: 'সাল-ক্রম মনে রাখো: 1969 (হুইটেকার-৫ রাজ্য) → 1974 (মারগুলিস-২ সুপার কিংডম) → 2004 (কেভলিয়ার-স্মিথ-৬ রাজ্য)। আর মনে রাখো: প্রোটিস্টায় ভ্রূণ হয় না, ফানজাইয়ে কাইটিন, অ্যানিমেলিয়ায় কোষপ্রাচীর-প্লাস্টিড-গহ্বর ৩টিই নেই!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 1.4: শ্রেণিবিন্যাসের বিভিন্ন ধাপ
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_biology_ch1_4',
    chapter1.id,
    4,
    '১.৪ শ্রেণিবিন্যাসের বিভিন্ন ধাপ (Taxonomic Ranks & Nested Hierarchy)',
    'les_ssc_biology_ch1_4',
    {
      titleBangla: 'শ্রেণিবিন্যাসের ৭টি ধাপ, নেস্টেড হায়ারার্কি ও মানুষের শ্রেণিবিন্যাস',
      learningGoal: 'শ্রেণিবিন্যাসের ৭টি ধাপ ক্রমানুসারে লিখতে, নেস্টেড হায়ারার্কি ও বৈশিষ্ট্য-জীবসংখ্যার বিপরীত সম্পর্ক ব্যাখ্যা করতে এবং মানুষের প্রতিটি ধাপের অন্তর্ভুক্তির কারণ মুখস্থ বলতে পারবে।',
      explanation: `### ১. শ্রেণিবিন্যাসের ৭টি ধাপ ও বিপরীত সম্পর্ক
আন্তর্জাতিক কোড চিহ্নিত ৭টি মূল ধাপ (বড় থেকে ছোট):
**১. রাজ্য (Kingdom) → ২. পর্ব (Phylum) / বিভাগ (Division) → ৩. শ্রেণি (Class) → ৪. বর্গ (Order) → ৫. গোত্র (Family) → ৬. গণ (Genus) → ৭. প্রজাতি (Species)**।
- **গোল্ডেন রুল:** যত **উপরের ধাপ**, বৈশিষ্ট্যের সংখ্যা তত **কম** ও অন্তর্ভুক্ত জীবের সংখ্যা তত **বেশি**। আর যত **নিচের ধাপ**, বৈশিষ্ট্যের সংখ্যা তত **বেশি** ও জীবের সংখ্যা তত **কম**।

### ২. নেস্টেড হায়ারার্কি (Nested Hierarchy)
- উপরের ধাপ বড় একটি **সেট** এবং নিচের ধাপ তার **উপসেট** (রাজ্যের উপসেট পর্ব, পর্বের উপসেট শ্রেণি, শ্রেণির উপসেট বর্গ...)—এই পদ্ধতিকে **নেস্টেড হায়ারার্কি** বলে।
- পুনরাবৃত্তি এড়াতে আগের ধাপের যে বৈশিষ্ট্য পরের ধাপেও থাকে, সেগুলো উহ্য রাখা হয়।

### ৩. মানুষের (*Homo sapiens*) ৭ ধাপের শ্রেণিবিন্যাস ও কারণ (অবশ্যই মুখস্থ)
| ধাপ | মানুষের অবস্থান | অন্তর্ভুক্তির কারণ (বই অনুযায়ী) |
| :--- | :--- | :--- |
| **রাজ্য (Kingdom)** | Animalia | সুকেন্দ্রিক কোষবিশিষ্ট, বহুকোষী, পরভোজী এবং জটিল টিস্যুতন্ত্র আছে। |
| **পর্ব (Phylum)** | Chordata | জীবনের কোনো এক পর্যায়ে নটোকর্ড থাকে। |
| **শ্রেণি (Class)** | Mammalia | বাচ্চাকে বুকের দুধ খাওয়ায় এবং লোম/চুল আছে। |
| **বর্গ (Order)** | Primate | আঁকড়ে ধরার উপযোগী হাত এবং দৃষ্টিশক্তি বেশি উন্নত। |
| **গোত্র (Family)** | Hominidae | শিম্পাঞ্জি, গরিলা, ওরাংওটাং প্রভৃতির সাথে সাদৃশ্য আছে। |
| **গণ (Genus)** | *Homo* | দেহের অনুপাতে মস্তিষ্ক সবচেয়ে বড় এবং খাড়াভাবে দুই পায়ে হাঁটতে পারে। |
| **প্রজাতি (Species)** | *Homo sapiens* | চওড়া এবং খাড়া কপাল, খুলির হাড় *Homo* গণের অন্য প্রজাতির তুলনায় পাতলা এবং বুদ্ধিবৃত্তিকভাবে উন্নত। |`,
      importantTerms: [
        { termBangla: 'নেস্টেড হায়ারার্কি', termEnglish: 'Nested Hierarchy', definition: 'শ্রেণিবিন্যাসের যে পদ্ধতিতে উপরের ধাপ বড় সেট এবং তার নিচের ধাপ হলো তার উপসেট।' },
        { termBangla: 'পর্ব / বিভাগ', termEnglish: 'Phylum / Division', definition: 'রাজ্যের ঠিক নিচের ধাপ—প্রাণীদের ক্ষেত্রে পর্ব (Phylum) ও উদ্ভিদের ক্ষেত্রে বিভাগ (Division)।' },
        { termBangla: 'প্রাইমেট', termEnglish: 'Primate', definition: 'মানুষের বর্গ (Order)—আঁকড়ে ধরার উপযোগী হাত ও উন্নত দৃষ্টিশক্তি এর শনাক্তকারী কারণ।' },
      ],
      workedExample: {
        problem: 'মানুষ কোন বর্গের অন্তর্ভুক্ত প্রাণী? ব্যাখ্যা করো। (পাঠ্যবই সংক্ষিপ্ত প্রশ্ন ১)',
        stepByStepSolution: 'মানুষ Primate বর্গের (Order) অন্তর্ভুক্ত প্রাণী। কারণ মানুষের আঁকড়ে ধরার উপযোগী হাত রয়েছে এবং দৃষ্টিশক্তি অন্যান্য অনেক স্তন্যপায়ীর তুলনায় বেশি উন্নত।',
      },
      memoryAid: '৭ ধাপের ছন্দ: “রা-প-শ্রে-ব-গো-গ-প্র” (রাজ্য → পর্ব → শ্রেণি → বর্গ → গোত্র → গণ → প্রজাতি) এবং ইংরেজিতে “King Philip Came Over For Good Soup” (K-P-C-O-F-G-S)!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 1.5: দ্বিপদ নামকরণ পদ্ধতি (+ Interactive Lab)
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_biology_ch1_5',
    chapter1.id,
    5,
    '১.৫ দ্বিপদ নামকরণ পদ্ধতি ও ২১টি বৈজ্ঞানিক নাম (Binomial Nomenclature Lab)',
    'les_ssc_biology_ch1_5',
    {
      titleBangla: 'দ্বিপদ নামকরণের ৮টি নিয়ম (a–h), ICBN/ICZN ও ২১টি বৈজ্ঞানিক নাম মুখস্থ কৌশল',
      learningGoal: 'দ্বিপদ নামকরণের প্রবর্তক ও ৮টি আন্তর্জাতিক নিয়ম (a–h) নির্ভুলভাবে প্রয়োগ করতে এবং পাঠ্যবইয়ের ২১টি জীবের বৈজ্ঞানিক নাম শুদ্ধ বানান ও ফরম্যাটে লিখতে পারবে।',
      explanation: `### ১. দ্বিপদ নামকরণ ও আন্তর্জাতিক কোড
- দুটি পদ—প্রথম অংশ **গণ (Genus)** ও দ্বিতীয় অংশ **প্রজাতি (Species)**—নিয়ে গঠিত বৈজ্ঞানিক নামকে **দ্বিপদ নাম** (যেমন গোল আলু *Solanum tuberosum*) বলে।
- উদ্ভিদের নাম **ICBN** (International Code of Botanical Nomenclature) এবং প্রাণীর নাম **ICZN** (International Code of Zoological Nomenclature) অনুযায়ী হয়।
- **1753** সালে সুইডিশ বিজ্ঞানী **ক্যারোলাস লিনিয়াস** তাঁর *Species plantarum* বইয়ে দ্বিপদ নামকরণ প্রবর্তন করেন এবং প্রথম শ্রেণি, বর্গ, গণ ও প্রজাতি ধাপগুলো ব্যবহার করেন।

### ২. দ্বিপদ নামকরণের ৮টি নিয়ম (a–h) — একনজরে
- **(a) ল্যাটিন রূপ:** ল্যাটিন ভাষায় বা ল্যাটিনের মতো করে (যেমন সাজিদ আলী হাওলাদার আবিষ্কৃত ঢাকার ব্যাঙ *Zakerana dhaka* — কাজী জাকের হোসেনের সম্মানে)।
- **(b) দুটি পদ:** ১ম = গণ, ২য় = প্রজাতি (যেমন রুই মাছ *Labeo rohita*)।
- **(c) অনন্যতা:** প্রতিটি নাম অনন্য (unique)—একই নাম দুটি পৃথক জীবের জন্য নিষিদ্ধ।
- **(d) বড়-ছোট অক্ষর:** গণের ১ম অক্ষর বড়, বাকি সব ছোট; প্রজাতি পুরোপুরি ছোট অক্ষরে (*Allium cepa*, *Panthera leo*)।
- **(e) মুদ্রণে ইটালিক:** ছাপানোর সময় সর্বদা ইটালিক (*Oryza sativa*, *Catla catla*)।
- **(f) হাতে আলাদা দাগ:** হাতে লেখায় গণ ও প্রজাতির নিচে **আলাদা আলাদা দাগ** দিতে হবে।
- **(g) অগ্রাধিকার আইন:** একাধিক বিজ্ঞানী ভিন্ন নাম দিলে **প্রথম বিজ্ঞানীর** প্রদত্ত নামই গৃহীত হবে।
- **(h) নামদাতা ও সাল:** শেষে প্রথম নামদাতার সংক্ষিপ্ত নাম যুক্ত করা যায় (*Homo sapiens* L., *Oryza sativa* L.)।

### ৩. পাঠ্যবইয়ের ২১টি বৈজ্ঞানিক নাম (মুখস্থ গ্রুপ)
- **উদ্ভিদ (৮টি):** ধান (*Oryza sativa*), পাট (*Corchorus capsularis*), আম (*Mangifera indica*), কাঁঠাল (*Artocarpus heterophyllus*), শাপলা (*Nymphaea nouchali*), জবা (*Hibiscus rosa-sinensis*), গোল আলু (*Solanum tuberosum*), পিঁয়াজ (*Allium cepa*)।
- **জীবাণু (২টি):** কলেরা (*Vibrio cholerae*), ম্যালেরিয়া (*Plasmodium vivax*)।
- **প্রাণী (১১টি):** আরশোলা (*Periplaneta americana*), মৌমাছি (*Apis indica*), ইলিশ (*Tenualosa ilisha*), রুই (*Labeo rohita*), কাতল (*Catla catla*), কুনো ব্যাঙ (*Duttaphrynus melanostictus* / পূর্বনাম *Bufo melanostictus*), ঢাকার ব্যাঙ (*Zakerana dhaka*), দোয়েল (*Copsychus saularis*), রয়েল বেঙ্গল টাইগার (*Panthera tigris*), সিংহ (*Panthera leo*), মানুষ (*Homo sapiens*)।`,
      interactiveWidgetUrl: '/uploads/interactive/taxonomy-nomenclature-lab.html',
      importantTerms: [
        { termBangla: 'ICBN ও ICZN', termEnglish: 'Botanical & Zoological Codes', definition: 'উদ্ভিদের নামকরণের আন্তর্জাতিক কোড ICBN এবং প্রাণীর নামকরণের আন্তর্জাতিক কোড ICZN।' },
        { termBangla: 'অগ্রাধিকার আইন', termEnglish: 'Law of Priority', definition: 'একই জীবকে একাধিক বিজ্ঞানী ভিন্ন নাম দিলে প্রথম বিজ্ঞানীর দেওয়া নামটিই বৈধ হিসেবে গৃহীত হওয়ার নিয়ম।' },
        { termBangla: 'Zakerana dhaka', termEnglish: 'Dhaka Frog', definition: 'সাজিদ আলী হাওলাদার আবিষ্কৃত ঢাকার ব্যাঙ—কাজী জাকের হোসেনের সম্মানে গণের নাম Zakerana।' },
      ],
      workedExample: {
        problem: 'একজন শিক্ষার্থী খাতায় আমের বৈজ্ঞানিক নাম লিখল “mangifera Indica” (একটানা নিচে দাগ দিয়ে)। এতে কয়টি ভুল আছে এবং শুদ্ধ রূপ কী?',
        stepByStepSolution: 'মোট ৩টি ভুল আছে:\n১. গণের প্রথম অক্ষর বড় (M) হতে হবে।\n২. প্রজাতিক পদের প্রথম অক্ষর ছোট (i) হতে হবে।\n৩. হাতে লেখায় একটানা দাগ নয়, গণ ও প্রজাতির নিচে আলাদা আলাদা দাগ দিতে হবে।\nশুদ্ধ মুদ্রণ রূপ: Mangifera indica (ইটালিক)।',
      },
      memoryAid: 'জুটি ধরে মুখস্থ করো: indica শেষে ২টি (আম Mangifera indica, মৌমাছি Apis indica) · Panthera শুরুতে ২টি (বাঘ Panthera tigris, সিংহ Panthera leo) · কাতল = Catla catla · ইলিশ = ilisha · কলেরা = cholerae!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // Upsert all 80 verified questions
  for (const q of biologyChapter1AllQuestions) {
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
    'top_ssc_biology_ch1_1',
    'top_ssc_biology_ch1_2',
    'top_ssc_biology_ch1_3',
    'top_ssc_biology_ch1_4',
    'top_ssc_biology_ch1_5',
  ];

  await prisma.lesson.deleteMany({
    where: {
      topic: { chapterId: chapter1.id },
      topicId: { notIn: activeTopicIds },
    },
  });

  await prisma.topic.deleteMany({
    where: {
      chapterId: chapter1.id,
      id: { notIn: activeTopicIds },
    },
  });

  console.log(`✅ SSC Biology Chapter 1 seeded (${biologyChapter1AllQuestions.length} verified questions).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedBiologyChapter1(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Biology Chapter 1 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
