import { PrismaClient, ContentStatus } from '@prisma/client';
import { biologyChapter14QuestionsBatch1 } from './seed-biology-chapter-14-questions';
import { biologyChapter14QuestionsBatch2 } from './seed-biology-chapter-14-questions-batch2';
import { biologyChapter14QuestionsBatch3 } from './seed-biology-chapter-14-questions-batch3';
import { sscBiologySubject } from './seed-biology-chapter-1';

export const biologyChapter14AllQuestions = [
  ...biologyChapter14QuestionsBatch1,
  ...biologyChapter14QuestionsBatch2,
  ...biologyChapter14QuestionsBatch3,
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

export async function seedBiologyChapter14(prisma: PrismaClient) {
  console.log('🧬 Seeding SSC Biology Chapter 14 (জীবপ্রযুক্তি / Biotechnology)...');

  await prisma.subject.upsert({
    where: { code: sscBiologySubject.code },
    update: sscBiologySubject,
    create: sscBiologySubject,
  });

  const chapter14 = await prisma.chapter.upsert({
    where: { id: 'chap_ssc_biology_14' },
    update: {
      subjectId: sscBiologySubject.id,
      orderIndex: 14,
      titleBangla: 'চতুর্দশ অধ্যায়: জীবপ্রযুক্তি (Biotechnology)',
    },
    create: {
      id: 'chap_ssc_biology_14',
      subjectId: sscBiologySubject.id,
      orderIndex: 14,
      titleBangla: 'চতুর্দশ অধ্যায়: জীবপ্রযুক্তি (Biotechnology)',
    },
  });

  // -------------------------------------------------------------------------
  // Topic 14.1: জীবপ্রযুক্তির ধারণা, ইতিহাস ও পরিধি
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_biology_ch14_1',
    chapter14.id,
    1,
    '১৪.১ জীবপ্রযুক্তির ধারণা, ইতিহাস ও পরিধি (Concept and Scope of Biotechnology)',
    'les_ssc_biology_ch14_1',
    {
      titleBangla: 'জীবপ্রযুক্তির সংজ্ঞা, উৎপত্তি ও ঐতিহাসিক বিকাশ',
      learningGoal: 'জীবপ্রযুক্তি (Biotechnology) শব্দের উৎপত্তি, কার্ল এরেকির ১৯১৯ সালের অবদান, প্রাচীন গাঁজন প্রযুক্তি এবং আধুনিক আণবিক জেনেটিক্স ও ন্যানোটেকনোলজির সংযোগ অনুধাবন ও ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. জীবপ্রযুক্তির সংজ্ঞা ও প্রকৃতি
- **জীবপ্রযুক্তি (Biotechnology):** জীববিজ্ঞানের জ্ঞান এবং প্রায়োগিক প্রযুক্তির সমন্বিত ফলিত শাখা।
- কোনো জীবকোষ, অণুজীব বা তার অংশবিশেষ ব্যবহার করে মানবকল্যাণে নতুন কোনো বৈশিষ্ট্যসম্পন্ন জীবের উদ্ভাবন কিংবা কোনো প্রক্রিয়াজাত বা উপজাত দ্রব্য উৎপাদনের প্রযুক্তিই হলো জীবপ্রযুক্তি।

---

### ২. ঐতিহাসিক মাইলফলকসমূহ (Timeline)
1. **৮,০০০ বছর পূর্বে:** প্রাচীন মানবসভ্যতায় গাঁজন (Fermentation) ও চোলাইকরণের (Brewing) মাধ্যমে মদ, বিয়ার ও রুটি তৈরি।
2. **১৮৬৩ সাল:** গ্রেগর জোহান মেন্ডেল কর্তৃক মটরশুঁটিতে সংকরায়ণের মাধ্যমে বংশগতির মৌলিক সূত্র আবিষ্কার।
3. **১৯১৯ সাল:** হাঙ্গেরীয় কৃষি প্রকৌশলী **কার্ল এরেকি (Karl Ereky)** সর্বপ্রথম *Biotechnology* শব্দটি প্রবর্তন করেন।
4. **১৯৫৩ সাল:** জেমস ওয়াটসন ও ফ্রান্সিস ক্রিক কর্তৃক DNA ডাবল হেলিক্স মডেল আবিষ্কার।
5. **সাম্প্রতিক সময়:** জীববিজ্ঞানে ন্যানোটেকনোলজির সংযোজন, যার মাধ্যমে সুস্থ কোষে আঘাত না করে সরাসরি ক্যান্সার বা রোগাক্রান্ত কোষে ওষুধ পৌঁছে দেওয়া সম্ভব হচ্ছে। এছাড়া পাটের জীবনরহস্য (জিনোম সিকোয়েন্স) উন্মোচনে বাংলাদেশের ঐতিহাসিক সাফল্য।`,
      interactiveWidgetUrl: '/uploads/interactive/recombinant-dna-tissue-culture-lab.html',
      importantTerms: [
        { termBangla: 'জীবপ্রযুক্তি', termEnglish: 'Biotechnology', definition: 'মানবকল্যাণে জীব বা তার উপাদানকে রূপান্তর করে নতুন প্রযুক্তিগত পণ্য বা জীব তৈরির বিজ্ঞান।' },
        { termBangla: 'কার্ল এরেকি', termEnglish: 'Karl Ereky', definition: 'হাঙ্গেরীয় প্রকৌশলী যিনি ১৯১৯ সালে প্রথম Biotechnology শব্দটি প্রবর্তন করেন।' },
        { termBangla: 'গাঁজন', termEnglish: 'Fermentation', definition: 'অণুজীবের (যেমন ইস্ট) সহায়তায় অক্সিজেনের অনুপস্থিতিতে শর্করার রূপান্তর প্রক্রিয়া যা ৮০০০ বছর আগে শুরু হয়।' },
      ],
      workedExample: {
        problem: 'পরীক্ষায় প্রশ্ন: "গাঁজন কি জীবপ্রযুক্তির অংশ? উত্তরের সপক্ষে যুক্তি দাও।"',
        stepByStepSolution: '১. হ্যাঁ, গাঁজন জীবপ্রযুক্তির একটি সনাতন কিন্তু মৌলিক অংশ।\n২. সংজ্ঞানুসারে অণুজীব (ইস্ট) ব্যবহার করে মানুষের খাদ্য ও পানীয় রূপান্তরের প্রক্রিয়া জীবপ্রযুক্তির শর্ত পূরণ করে।\n৩. মানবজাতি প্রায় ৮০০০ বছর পূর্বে এটি আবিষ্কার করে ফলিত জৈবপ্রযুক্তির সূচনা করেছিল।',
      },
      memoryAid: 'সাল মনে রাখার ট্রিক: ১৮৬৩ (মেন্ডেল) → ১৯১৯ (কার্ল এরেকি) → ১৯৫৩ (ওয়াটসন ও ক্রিক DNA মডেল)!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 14.2: উদ্ভিদ টিস্যু কালচার প্রযুক্তি ও এর ধাপসমূহ
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_biology_ch14_2',
    chapter14.id,
    2,
    '১৪.২ উদ্ভিদ টিস্যু কালচার প্রযুক্তি ও এর ধাপসমূহ (Plant Tissue Culture Technique)',
    'les_ssc_biology_ch14_2',
    {
      titleBangla: 'টটিপোটেন্সি নীতি, এক্সপ্ল্যান্ট ও টিস্যু কালচারের ৫টি ধারাবাহিক ধাপ',
      learningGoal: 'উদ্ভিদের টটিপোটেন্সি ক্ষমতা, এক্সপ্ল্যান্ট নির্বাচন, অটোক্লেভে ১২১° সে. তাপমাত্রায় জীবাণুমুক্তকরণ, ক্যালাস ও অণুচারা উৎপাদন এবং অ্যাক্লাইমেটাইজেশনের ধারাবাহিক ধাপসমূহ নির্ভুলভাবে বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. টিস্যু কালচারের মূলনীতি
- **টটিপোটেন্সি (Totipotency):** উদ্ভিদের প্রতিটি সজীব দেহকোষের বিভাজিত ও রূপান্তরিত হয়ে একটি সম্পূর্ণ নতুন পূর্ণাঙ্গ উদ্ভিদ সৃষ্টি করার অন্তর্নিহিত জীবতাত্ত্বিক ক্ষমতা।
- **এক্সপ্ল্যান্ট (Explant):** টিস্যু কালচারের উদ্দেশ্যে মাতৃ উদ্ভিদ থেকে বিচ্ছিন্ন করা যেকোনো নির্বাচিত সজীব অংশ (যেমন শীর্ষমুকুল, পাতা, পর্ব ইত্যাদি)।

---

### ২. টিস্যু কালচারের ধারাবাহিক ৫টি ধাপ
1. **মাতৃ উদ্ভিদ নির্বাচন:** সুস্থ, সবল, উন্নত গুণসম্পন্ন ও রোগমুক্ত উদ্ভিদ নির্বাচন।
2. **কালচার মাধ্যম বা মিডিয়াম তৈরি:** ম্যাক্রো ও মাইক্রো খনিজ লবণ, ভিটামিন, ফাইটোহরমোন (অক্সিন ও সাইটোকাইনিন), সুক্রোজ (শক্তির উৎস) এবং প্রায়-কঠিন জেলি তৈরিতে জমাট বাঁধার উপাদান **অ্যাগার (Agar)** মিশ্রণ।
3. **জীবাণুমুক্ত কালচার প্রতিষ্ঠা (Autoclaving):** অটোক্লেভ যন্ত্রে **১২১° সেলসিয়াস তাপমাত্রায়**, **১৫ lb/sq. inch চাপে** **২০ মিনিট** রেখে মিডিয়াম জীবাণুমুক্তকরণ। এরপর নিয়ন্ত্রিত কক্ষে (**২৫±২° সেলসিয়াস**) রেখে এক্সপ্ল্যান্টের বিভাজনে অবয়বহীন টিস্যুপুঞ্জ **ক্যালাস (Callus)** ও পরবর্তীতে অণুচারা (Plantlets) উৎপাদন।
4. **মূল উৎপাদক মাধ্যমে স্থানান্তর:** চারায় মূল না গজালে বিটপগুলোকে মূল উৎপাদনকারী হরমোনযুক্ত মাধ্যমে স্থাপন।
5. **মাঠপর্যায়ে স্থানান্তর (অ্যাক্লাইমেটাইজেশন):** শেকড়ের অ্যাগার পানিতে ধুয়ে ল্যাবের ছোট টবে মাটির সাথে খাপ খাইয়ে পূর্ণাঙ্গ সজীব চারায় পরিণত করে মাঠে রোপণ।`,
      interactiveWidgetUrl: '/uploads/interactive/recombinant-dna-tissue-culture-lab.html',
      importantTerms: [
        { termBangla: 'টটিপোটেন্সি', termEnglish: 'Totipotency', definition: 'উদ্ভিদের একক সজীব কোষ থেকে পূর্ণাঙ্গ উদ্ভিদ সৃষ্টি করার অন্তর্নিহিত ক্ষমতা।' },
        { termBangla: 'এক্সপ্ল্যান্ট', termEnglish: 'Explant', definition: 'টিস্যু কালচারের উদ্দেশ্যে নির্বাচিত মাতৃ উদ্ভিদ থেকে বিচ্ছিন্ন করা ক্ষুদ্র উদ্ভিদাংশ।' },
        { termBangla: 'ক্যালাস', termEnglish: 'Callus', definition: 'পুষ্টি মাধ্যমে এক্সপ্ল্যান্টের কোষ বারবার বিভাজনের মাধ্যমে সৃষ্ট অবয়বহীন টিস্যুমণ্ড।' },
        { termBangla: 'অটোক্লেভ', termEnglish: 'Autoclave', definition: 'উচ্চ বাষ্পীয় চাপ ও তাপে (১২১° সে., ১৫ lb, ২০ মিনিট) কালচার মাধ্যম জীবাণুমুক্ত করার যন্ত্র।' },
      ],
      workedExample: {
        problem: 'একজন গবেষক টিস্যু কালচার মিডিয়ামকে ১০০° সেলসিয়াস তাপমাত্রায় ১০ মিনিট ফুটিয়ে এক্সপ্ল্যান্ট স্থাপন করলেন। কিন্তু কয়েক দিন পর মিডিয়ামে ছত্রাকের সংক্রমণ দেখা গেল। কারণ কী?',
        stepByStepSolution: '১. সাধারণ ফুটন্ত পানিতে (১০০° সে.) ব্যাকটেরিয়া ও ছত্রাকের স্পোর (Spores) ধ্বংস হয় না।\n২. সঠিক জীবাণুমুক্তকরণের জন্য অটোক্লেভ যন্ত্রে উচ্চ চাপে (১৫ lb/sq. inch) ১২১° সেলসিয়াস তাপমাত্রায় ২০ মিনিট নির্বীজন করা আবশ্যক ছিল।\n৩. অটোক্লেভের নিয়ম না মানায় জীবাণু বেঁচে থেকে সংক্রমণ ঘটিয়েছে।',
      },
      memoryAid: 'অটোক্লেভ শর্তাবলী: ১২১°C · ১৫ lb চাপ · ২০ মিনিট। ল্যাবের কক্ষ তাপমাত্রা: ২৫ ± ২°C!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 14.3: কৃষি ও অর্থনীতিতে টিস্যু কালচারের গুরুত্ব
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_biology_ch14_3',
    chapter14.id,
    3,
    '১৪.২.২ কৃষি ও অর্থনীতিতে টিস্যু কালচারের গুরুত্ব (Applications and Economic Importance)',
    'les_ssc_biology_ch14_3',
    {
      titleBangla: 'মেরিস্টেম কালচার, রোগমুক্ত আলু মাইক্রোটিউবার, অর্কিড শিল্প ও জোজোবা উদ্ভিদ',
      learningGoal: 'মেরিস্টেম কালচারের মাধ্যমে ভাইরাসমুক্ত চারা তৈরি, জর্জ মোরেলের অর্কিড বিপ্লব, আলুর মাইক্রোটিউবার এবং জোজোবা উদ্ভিদের মতো অর্থনৈতিক মাইলফলকসমূহ বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. মেরিস্টেম কালচার ও রোগমুক্ত চারা
- **মেরিস্টেম (Meristem):** উদ্ভিদের শীর্ষ বর্ধিষ্ণু অঞ্চল। দ্রুত কোষ বিভাজন ও পরিবহন কলার অনুপস্থিতির কারণে মেরিস্টেম সর্বদা ভাইরাস ও রোগমুক্ত থাকে।
- **মার্টিন (১৯৫২):** মেরিস্টেম কালচার করে সম্পূর্ণ ভাইরাসমুক্ত ডালিয়া ও আলু গাছ উদ্ভাবন করেন।
- **আলুর মাইক্রোটিউবার:** ল্যাবে টেস্টটিউবে রোগমুক্ত ক্ষুদ্র আলুগুটি বা মাইক্রোটিউবার তৈরি করে জমিতে সরাসরি বপন করা যায়।

---

### ২. অর্থনৈতিক ও আন্তর্জাতিক সাফল্য
- **জর্জ মোরেল (১৯৬৪):** সিম্বিডিয়াম (Cymbidium) অর্কিডের একটি মেরিস্টেম থেকে বছরে প্রায় **৪০ হাজার চারা** পাওয়ার পথ উন্মোচন করেন। থাইল্যান্ড প্রতি বছর **৫০ মিলিয়ন (৫ কোটি)** অর্কিড অণুচারা উৎপাদন ও ফুল রপ্তানি করে।
- **চন্দ্রমল্লিকা:** একটিমাত্র অঙ্গজ টুকরা থেকে বছরে প্রায় **৮৮ কোটি চারা** উৎপাদন সম্ভব।
- **জোজোবা (Jojoba):** মরু অঞ্চলের এই উদ্ভিদের তেল শুক্রাণু তিমির (Sperm whale) তেলের একমাত্র বিকল্প যা রকেট ও সুপারসনিক বিমানের ভারী ইঞ্জিনের লুব্রিকেন্ট হিসেবে অপরিহার্য।
- **সুগন্ধি জুঁই (Jasminum):** কোষ সাসপেনশন থেকে বাণিজ্যিক আতর তৈরি।
- **বাংলাদেশে অর্জন:** উন্নত কলা, বেল, কাঁঠাল, ডালশস্য, চিনাবাদাম, সরিষা, আলু এবং ঔষধি গাছ (**অশ্বগন্ধা ও সর্পগন্ধা**)-এর দ্রুত চারা উৎপাদন।`,
      interactiveWidgetUrl: '/uploads/interactive/recombinant-dna-tissue-culture-lab.html',
      importantTerms: [
        { termBangla: 'মেরিস্টেম কালচার', termEnglish: 'Meristem Culture', definition: 'উদ্ভিদের শীর্ষ বর্ধিষ্ণু ভাইরাসমুক্ত অংশ কালচার করে সম্পূর্ণ রোগমুক্ত চারা তৈরির প্রযুক্তি।' },
        { termBangla: 'মাইক্রোটিউবার', termEnglish: 'Microtuber', definition: 'টিস্যু কালচার ল্যাবে উৎপাদিত ভাইরাস-মুক্ত ক্ষুদ্রাকৃতির আলুবীজ।' },
        { termBangla: 'জোজোবা', termEnglish: 'Jojoba', definition: 'মরুভূমির তেলজাতীয় উদ্ভিদ যার তেল তিমির তেলের বিকল্প হিসেবে ভারী ইঞ্জিনে ব্যবহৃত হয়।' },
      ],
      workedExample: {
        problem: 'চন্দ্রমল্লিকার একটি ক্ষুদ্র উদ্ভিদাংশ থেকে যদি বছরে ৮৮ কোটি চারা পাওয়া যায়, তবে প্রচলিত অঙ্গজ প্রজননের তুলনায় এর প্রধান বাণিজ্যিক সুবিধা কী?',
        stepByStepSolution: '১. প্রচলিত পদ্ধতিতে একটি গাছ থেকে বছরে মাত্র কয়েকটি শাখা কাটিং সম্ভব।\n২. টিস্যু কালচারে কোষের দ্রুত বিভাজন ক্ষমতা কাজে লাগিয়ে সীমিত জায়গায় রোগমুক্ত কোটি কোটি চারা পাওয়া যায়, ফলে বাণিজ্যিক নার্সারি ও রপ্তানি আয়ে বিপ্লব ঘটে।',
      },
      memoryAid: 'মোরেল (১৯৬৪) = অর্কিড ৪০ হাজার · থাইল্যান্ড = ৫০ মিলিয়ন চারা · চন্দ্রমল্লিকা = ৮৮ কোটি চারা · তিমি তেলের বিকল্প = জোজোবা!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 14.4: জিন প্রকৌশল, রিকম্বিন্যান্ট DNA ও GMO বনাম ট্রান্সজেনিক জীব
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_biology_ch14_4',
    chapter14.id,
    4,
    '১৪.৩ জিন প্রকৌশল, রিকম্বিন্যান্ট DNA ও GMO (Genetic Engineering and Transgenic Organisms)',
    'les_ssc_biology_ch14_4',
    {
      titleBangla: 'জিন প্রকৌশল, জিন ক্লোনিং এবং GMO বনাম ট্রান্সজেনিক জীবের মৌলিক পার্থক্য',
      learningGoal: 'জেনেটিক ইঞ্জিনিয়ারিংয়ের ধারণা, সনাতন প্রজনন বনাম জিন প্রকৌশলের সুবিধা এবং GMO বনাম ট্রান্সজেনিক জীবের গভীর বৈজ্ঞানিক পার্থক্য বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. জিন প্রকৌশল বা জেনেটিক ইঞ্জিনিয়ারিং
- একটি জীব থেকে একটি নির্দিষ্ট কাঙ্ক্ষিত জিন বহনকারী DNA খণ্ড পৃথক করে সম্পূর্ণ ভিন্ন একটি জীবে স্থানান্তরের প্রযুক্তিই হলো জিন প্রকৌশল।
- এর ফলে যে নতুন সংযুক্ত DNA অণু তৈরি হয় তাকে **রিকম্বিন্যান্ট DNA (Recombinant DNA)** বলে।
- রিকম্বিন্যান্ট DNA-কে পোষক কোষে বারবার প্রতিলিপিত করার কৌশলকে **জিন ক্লোনিং (Gene cloning)** বলে।

---

### ২. GMO বনাম ট্রান্সজেনিক জীব (সুস্পষ্ট পার্থক্য)
- **GMO (Genetically Modified Organism):** যেকোনো কৃত্রিম উপায়ে (যেমন মিউটেশন, বিকিরণ, জিনোম সম্পাদন) কোনো জীবের জিনোমে পরিবর্তন আনা হলে তাকে GMO বলে।
- **ট্রান্সজেনিক জীব (Transgenic Organism):** কোনো জীবের জিনোমে যখন **সম্পূর্ণ ভিন্ন কোনো প্রজাতি** থেকে বহিরাগত জিন প্রবেশ করানো হয়, তখন তাকে সুনির্দিষ্টভাবে ট্রান্সজেনিক জীব বলে।
- **"সকল ট্রান্সজেনিক জীবই GMO, কিন্তু সকল GMO ট্রান্সজেনিক নয়।"**

---

### ৩. সনাতন প্রজনন বনাম জিন প্রকৌশল
- প্রচলিত প্রজননে কেবল একই বা নিকটবর্তী প্রজাতির মধ্যে সংকরায়ণ সম্ভব এবং কাঙ্ক্ষিত জিনের সাথে অনাকাঙ্ক্ষিত জিনও চলে আসে।
- জিন প্রকৌশলে দূরবর্তী যেকোনো প্রজাতির মধ্যে (যেমন ব্যাকটেরিয়া থেকে শস্যে) শুধুমাত্র একক কাঙ্ক্ষিত জিনটিই শতভাগ নিখুঁতভাবে স্থানান্তর করা যায়।`,
      interactiveWidgetUrl: '/uploads/interactive/recombinant-dna-tissue-culture-lab.html',
      importantTerms: [
        { termBangla: 'জিন প্রকৌশল', termEnglish: 'Genetic Engineering', definition: 'কোনো জীবের DNA-এর কাঙ্ক্ষিত অংশ অন্য জীবে স্থানান্তর করে কাঙ্ক্ষিত বৈশিষ্ট্য সৃষ্টির প্রযুক্তি।' },
        { termBangla: 'রিকম্বিন্যান্ট DNA', termEnglish: 'Recombinant DNA', definition: 'ভিন্ন দুটি উৎসের DNA খণ্ডকে একত্রিত করে তৈরি করা নতুন সংকর DNA অণু।' },
        { termBangla: 'GMO', termEnglish: 'Genetically Modified Organism', definition: 'কৃত্রিমভাবে জিনগত পরিবর্তন ঘটানো যেকোনো জীব।' },
        { termBangla: 'ট্রান্সজেনিক জীব', termEnglish: 'Transgenic Organism', definition: 'অন্য কোনো প্রজাতি থেকে বহিরাগত জিন প্রবেশ করানো বিশেষায়িত জীব।' },
      ],
      workedExample: {
        problem: 'কৃত্রিমভাবে গামা রশ্মি দিয়ে মিউটেশন ঘটিয়ে উন্নত করা গম এবং মাটিতে থাকা ব্যাকটেরিয়ার জিনযুক্ত বিটি বেগুন—উভয়ের মধ্যে কোনটি GMO এবং কোনটি ট্রান্সজেনিক?',
        stepByStepSolution: '১. উন্নত গমটির নিজস্ব জিনে পরিবর্তন আনা হয়েছে, কোনো বহিরাগত প্রজাতি নেই—তাই এটি GMO, কিন্তু ট্রান্সজেনিক নয়।\n২. বিটি বেগুনে মাটির ব্যাকটেরিয়া (Bacillus thuringiensis) থেকে বহিরাগত জিন প্রবেশ করানো হয়েছে—তাই এটি GMO এবং সুনির্দিষ্টভাবে ট্রান্সজেনিক জীব।',
      },
      memoryAid: 'মনে রাখো: Trans = Across (ভিন্ন প্রজাতি পেরিয়ে জিন আনা হলে ট্রান্সজেনিক)।',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 14.5: রিকম্বিন্যান্ট DNA তৈরির ধারাবাহিক ধাপ ও প্লাজমিড
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_biology_ch14_5',
    chapter14.id,
    5,
    '১৪.৩.১ রিকম্বিন্যান্ট DNA তৈরির ধারাবাহিক ধাপ ও প্লাজমিড (Steps of rDNA Technology)',
    'les_ssc_biology_ch14_5',
    {
      titleBangla: 'প্লাজমিড ভেক্টর, আণবিক কাঁচি ও আঠা এবং ট্রান্সফরমেশনের ধারাবাহিক ধাপ',
      learningGoal: 'E. coli প্লাজমিডের স্ব-বিভাজন ক্ষমতা, রেস্ট্রিকশন এনজাইমের স্টিকি এন্ড তৈরি, DNA লাইগেজের জোড়া লাগানো এবং ট্রান্সফরমেশনের ধাপসমূহ প্রবাহচিত্রের মাধ্যমে ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. প্লাজমিড (Plasmid) কী?
- ব্যাকটেরিয়ার সাইটোপ্লাজমে প্রধান বৃত্তাকার ক্রোমোজোমের বাইরে অবস্থিত **স্ব-বিভাজনক্ষম অতিরিক্ত বৃত্তাকার দ্বি-সূত্রক DNA অণু** হলো প্লাজমিড।
- মানুষের অন্ত্রে বসবাসকারী *Escherichia coli (E. coli)* ব্যাকটেরিয়ার প্লাজমিড জিন স্থানান্তরের প্রধান **বাহক বা ভেক্টর (Vector)** হিসেবে ব্যবহৃত হয়।

---

### ২. রিকম্বিন্যান্ট DNA তৈরির ৫টি ধারাবাহিক ধাপ (চিত্র ১৪.০২ অনুসারে)
1. **DNA পৃথকীকরণ:** দাতা জীব থেকে কাঙ্ক্ষিত জিনসহ DNA এবং *E. coli* থেকে প্লাজমিড DNA পৃথক করা।
2. **রেস্ট্রিকশন এনজাইম (আণবিক কাঁচি):** উভয় DNA-কে একই রেস্ট্রিকশন এনজাইম দিয়ে সুনির্দিষ্ট ক্ষারক ক্রমে কাটা হয়, ফলে পরস্পরের পরিপূরক **স্টিকি প্রান্ত (Sticky ends)** তৈরি হয়।
3. **DNA লাইগেজ (আণবিক আঠা):** কাটা প্লাজমিডের ফাঁকে কাঙ্ক্ষিত জিন বসিয়ে লাইগেজ এনজাইম দিয়ে জোড়া লাগিয়ে **রিকম্বিন্যান্ট প্লাজমিড DNA** গঠন।
4. **ট্রান্সফরমেশন (Transformation):** রিকম্বিন্যান্ট প্লাজমিডকে গ্রাহক ব্যাকটেরিয়া কোষে প্রবেশ করানো। যে ব্যাকটেরিয়া প্লাজমিড গ্রহণ করে তাকে ট্রান্সজেনিক ব্যাকটেরিয়া বলে।
5. **জিন ক্লোনিং ও বংশবৃদ্ধি:** উপযুক্ত মাধ্যমে ব্যাকটেরিয়ার দ্রুত দ্বি-ভাজন ঘটিয়ে কোটি কোটি প্রতিলিপি প্রস্তুত এবং কাঙ্ক্ষিত প্রোটিন (যেমন ইনসুলিন) আহরণ।

---

### ৩. আন্তর্জাতিক জীবনিরাপত্তা (Biosafety Guidelines)
- জিএমও ফসলের বিষাক্ততা (Toxicity) পরীক্ষা এবং প্রাকৃতিক বাস্তুতন্ত্রের ভারসাম্য রক্ষা করতে বিশ্বজুড়ে কড়া বায়োসেফটি নীতিমালা মেনে চলা বাধ্যতামূলক।`,
      interactiveWidgetUrl: '/uploads/interactive/recombinant-dna-tissue-culture-lab.html',
      importantTerms: [
        { termBangla: 'প্লাজমিড', termEnglish: 'Plasmid', definition: 'ব্যাকটেরিয়ার মূল ক্রোমোজোমের বাইরে অবস্থিত স্ব-বিভাজনক্ষম ক্ষুদ্র বৃত্তাকার দ্বি-সূত্রক DNA।' },
        { termBangla: 'রেস্ট্রিকশন এনজাইম', termEnglish: 'Restriction Enzyme', definition: 'DNA অণুকে নির্দিষ্ট স্থানে কাটার জন্য ব্যবহৃত আণবিক কাঁচি।' },
        { termBangla: 'DNA লাইগেজ', termEnglish: 'DNA Ligase', definition: 'কাটা DNA খণ্ডগুলোকে স্থায়ীভাবে জোড়া লাগানোর আণবিক আঠা এনজাইম।' },
        { termBangla: 'ট্রান্সফরমেশন', termEnglish: 'Transformation', definition: 'পোষক ব্যাকটেরিয়া কোষে বহিরাগত রিকম্বিন্যান্ট প্লাজমিড প্রবেশ করানোর পদ্ধতি।' },
      ],
      workedExample: {
        problem: 'রিকম্বিন্যান্ট DNA তৈরিতে প্লাজমিড এবং দাতার কাঙ্ক্ষিত জিন কাটার জন্য দুটি ভিন্ন রেস্ট্রিকশন এনজাইম ব্যবহার করলে কী ঘটবে?',
        stepByStepSolution: '১. ভিন্ন রেস্ট্রিকশন এনজাইম ব্যবহার করলে দুই DNA-এর কাটা প্রান্তের ক্ষারক অনুক্রম ভিন্ন হবে।\n২. ফলে কোনো পরিপূরক আঠালো মুখ বা স্টিকি প্রান্ত (Sticky ends) সৃষ্টি হবে না।\n৩. লাইগেজ এনজাইম এদের মধ্যে ফসফোডাইএস্টার বন্ধন তৈরি করতে পারবে না এবং রিকম্বিন্যান্ট DNA গঠিত হবে না।',
      },
      memoryAid: 'সূত্র মনে রাখো: কাঁচি = রেস্ট্রিকশন এনজাইম · আঠা = DNA লাইগেজ · ভেক্টর = প্লাজমিড · কোষে প্রবেশ = ট্রান্সফরমেশন!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Topic 14.6: কৃষি, প্রাণী, চিকিৎসা ও পরিবেশ সুরক্ষায় প্রয়োগ
  // -------------------------------------------------------------------------
  await upsertTopicAndLesson(
    prisma,
    'top_ssc_biology_ch14_6',
    chapter14.id,
    6,
    '১৪.৩.২ কৃষি, চিকিৎসা ও পরিবেশ সুরক্ষায় জীবপ্রযুক্তির প্রয়োগ (Applications and Biosafety)',
    'les_ssc_biology_ch14_6',
    {
      titleBangla: 'বিটি ফসল, গোল্ডেন রাইস, রিকম্বিন্যান্ট ইনসুলিন এবং সিউডোমোনাস ব্যাকটেরিয়ার ভূমিকা',
      learningGoal: 'শস্যের উন্নয়ন (বিটি ফসল, গোল্ডেন রাইস), প্রাণীর আকার ও পশম বৃদ্ধি, রিকম্বিন্যান্ট ইনসুলিন ও ইন্টারফেরন উৎপাদন এবং Pseudomonas দ্বারা পরিবেশের তেলদূষণমুক্তকরণ বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. শস্য উন্নয়নে প্রয়োগ
- **পোকামাকড় প্রতিরোধী বিটি ফসল:** *Bacillus thuringiensis (Bt)* ব্যাকটেরিয়ার ক্রিস্টাল প্রোটিন জিন শস্যে প্রবেশ করিয়ে **Bt তুলা, Bt ভুট্টা ও বিটি বেগুন** উদ্ভাবন। লেপিডোপটেরা (মথ) ও কলিওপটেরা (গুবরে পোকা) দমন করে।
- **ভাইরাস ও ছত্রাক প্রতিরোধী:** ভাইরাল কোট প্রোটিন জিন দিয়ে পেঁপের রিং স্পট ভাইরাস (PRSV), টমেটো মোজাইক (ToMV) প্রতিরোধ এবং আলুর লেট ব্লাইট ছত্রাক প্রতিরোধী জাত।
- **আগাছানাশক সহনশীল (Herbicide tolerant):** ভুট্টা, তুলা, সয়াবিন ও ক্যানোলা (Canola)।
- **পুষ্টিমান উন্নয়ন:** ভিটামিন-এ সমৃদ্ধ সোনালি চাল বা **গোল্ডেন রাইস (Golden Rice)** অন্ধত্ব প্রতিরোধ করে; রক্তস্বল্পতা রোধে আয়রন সমৃদ্ধ ধান।

---

### ২. প্রাণী ও মৎস্য ক্ষেত্রে
- **গাভী:** গরুর দুধে আমিষ বৃদ্ধির জন্য Protein C জিন স্থানান্তর।
- **ভেড়া:** হরমোন জিন দিয়ে মাংস বৃদ্ধি এবং ব্যাকটেরিয়ার **CysE ও CysM** জিন স্থানান্তরের মাধ্যমে উন্নত পশম (Wool) উৎপাদন।
- **মাছ:** স্যামন মাছের বৃদ্ধি হরমোন জিন দিয়ে মাগুর, কার্প ও তেলাপিয়া মাছের শারীরিক বৃদ্ধি প্রায় **৬০% বৃদ্ধি**।

---

### ৩. চিকিৎসা ও পরিবেশ সুরক্ষায়
- **হিউম্যান ইনসুলিন:** মানবদেহের ইনসুলিন জিন *E. coli* ও ইস্টে স্থাপন করে ডায়াবেটিসের জন্য বিশুদ্ধ বাণিজ্যিক ইনসুলিন উৎপাদন।
- **ইন্টারফেরন:** ইস্ট থেকে হেপাটাইটিস বি-ভাইরাসের প্রতিষেধক।
- **গ্রোথ হরমোন ও GM-CSF:** বামনত্ব (Dwarfism) নিরাময় ও ক্যান্সারের চিকিৎসায় কলোনি উদ্দীপক উপাদান।
- **পরিবেশ সুরক্ষায় Pseudomonas:** তেলবাহী জাহাজের দুর্ঘটনা ও কয়লাখনির পেট্রোলিয়াম হাইড্রোকার্বন বিনষ্ট করে পরিবেশ দ্রুত দূষণমুক্তকারী বিশেষ ব্যাকটেরিয়া।`,
      interactiveWidgetUrl: '/uploads/interactive/recombinant-dna-tissue-culture-lab.html',
      importantTerms: [
        { termBangla: 'বিটি বেগুন', termEnglish: 'Bt Brinjal', definition: 'Bacillus thuringiensis ব্যাকটেরিয়ার জিনযুক্ত কীটপতঙ্গ প্রতিরোধী ট্রান্সজেনিক বেগুন।' },
        { termBangla: 'গোল্ডেন রাইস', termEnglish: 'Golden Rice', definition: 'বিটা-ক্যারোটিন (ভিটামিন এ) সমৃদ্ধ সোনালি রঙের জেনেটিক্যালি পরিবর্তিত চাল।' },
        { termBangla: 'রিকম্বিন্যান্ট ইনসুলিন', termEnglish: 'Recombinant Insulin', definition: 'E. coli বা ইস্টে মানব জিন ক্লোনিংয়ের মাধ্যমে উৎপাদিত অ্যালার্জিমুক্ত নিরাপদ ইনসুলিন।' },
        { termBangla: 'Pseudomonas', termEnglish: 'Pseudomonas', definition: 'তেল ও বিষাক্ত হাইড্রোকার্বন ভেঙে পরিবেশের দূষণ দূরকারী বিশেষ ব্যাকটেরিয়া।' },
      ],
      workedExample: {
        problem: 'সনাতন পদ্ধতিতে প্রস্তুতকৃত পশুর ইনসুলিনের তুলনায় রিকম্বিন্যান্ট ইনসুলিনের সবচেয়ে বড় দুটি সুবিধা কী?',
        stepByStepSolution: '১. পূর্বে গরু বা শূকরের অগ্ন্যাশয় থেকে সংগৃহীত ইনসুলিনে প্রাণিজ প্রোটিন মিশ্রিত থাকায় মানবদেহে তীব্র অ্যালার্জি ও প্রতিরোধ ব্যবস্থা দেখা দিত। রিকম্বিন্যান্ট ইনসুলিন মানুষের নিজস্ব জিনের হুবহু প্রোটিন হওয়ায় কোনো অ্যালার্জি ঘটায় না।\n২. হাজার হাজার পশু নিধন ছাড়াই ল্যাবের বায়োরিঅ্যাক্টরে কোটি কোটি রোগীর জন্য সীমাহীন খাঁটি ইনসুলিন সুলভ মূল্যে প্রস্তুত করা সম্ভব।',
      },
      memoryAid: 'বিটি ফসল = পোকা দমন · গোল্ডেন রাইস = ভিটামিন এ · ভেড়ার পশম = CysE ও CysM · মাছ বৃদ্ধি = স্যামন জিন ৬০% · তেলখাদক = সিউডোমোনাস!',
      status: ContentStatus.PUBLISHED,
    },
  );

  // -------------------------------------------------------------------------
  // Upsert all 90 verified questions for Chapter 14
  // -------------------------------------------------------------------------
  console.log(`📝 Upserting ${biologyChapter14AllQuestions.length} verified questions for Biology Chapter 14...`);
  for (const q of biologyChapter14AllQuestions) {
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
    'top_ssc_biology_ch14_1',
    'top_ssc_biology_ch14_2',
    'top_ssc_biology_ch14_3',
    'top_ssc_biology_ch14_4',
    'top_ssc_biology_ch14_5',
    'top_ssc_biology_ch14_6',
  ];

  await prisma.lesson.deleteMany({
    where: {
      topic: { chapterId: chapter14.id },
      topicId: { notIn: activeTopicIds },
    },
  });

  await prisma.topic.deleteMany({
    where: {
      chapterId: chapter14.id,
      id: { notIn: activeTopicIds },
    },
  });

  console.log(`✅ SSC Biology Chapter 14 seeded (${biologyChapter14AllQuestions.length} verified questions).`);
}

if (require.main === module) {
  const allowOffline = process.env.ALLOW_OFFLINE_SEED === 'true';
  const prisma = new PrismaClient();
  seedBiologyChapter14(prisma)
    .catch((err) => {
      if (allowOffline) {
        console.warn('⚠️ Database unreachable during ALLOW_OFFLINE_SEED run:', err?.message || err);
        process.exit(0);
      }
      console.error('❌ Biology Chapter 14 seed failed:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
