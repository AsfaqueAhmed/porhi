import { PrismaClient, ContentStatus } from '@prisma/client';
import { chapter6Questions } from './seed-chapter-6-questions';

export { chapter6Questions };

export async function seedChapter6(prisma: PrismaClient) {
  console.log('Seeding Chapter 6: বস্তুর ওপর তাপের প্রভাব (Effect of Heat on Matter) topics and lessons...');

  const chapterId = 'chap_ssc_physics_ch6';

  // Ensure chapter exists
  await prisma.chapter.upsert({
    where: { id: chapterId },
    update: {
      titleBangla: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব (Effect of Heat on Matter)',
      orderIndex: 6,
      subjectId: 'sub_ssc_physics',
    },
    create: {
      id: chapterId,
      titleBangla: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব (Effect of Heat on Matter)',
      orderIndex: 6,
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

  // =========================================================================
  // 1. Topic 6.1: তাপ ও তাপমাত্রা (Heat and Temperature)
  // =========================================================================
  await upsertTopicAndLesson(
    'top_ssc_physics_ch6_1',
    '৬.১ তাপ ও তাপমাত্রা (Heat and Temperature)',
    1,
    'les_ssc_physics_ch6_1',
    {
      titleBangla: 'তাপ ও তাপমাত্রা',
      learningGoal:
        'তাপ ও তাপমাত্রার ভৌত পার্থক্য, আণবিক গতিশক্তি, অভ্যন্তরীণ শক্তি এবং স্বতঃস্ফূর্ত তাপপ্রবাহের নীতি ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. তাপ ও তাপমাত্রা এক নয়
- **তাপ (Heat, Q):** তাপ হলো এক প্রকার শক্তি, যা দুটি বস্তুর মধ্যে তাপমাত্রার পার্থক্যের কারণে এক বস্তু থেকে অন্য বস্তুতে প্রবাহিত হয়। এর SI একক **জুল (J)** এবং মাত্রা সমীকরণ $[ML^2T^{-2}]$। প্রচলিত একক ক্যালরি ($1\\text{ cal} \\approx 4.184\\text{ J} \\approx 4.2\\text{ J}$)।
- **তাপমাত্রা (Temperature, T):** তাপমাত্রা হলো বস্তুর তাপীয় অবস্থা, যা নির্ধারণ করে বস্তুটি অন্য বস্তুর সংস্পর্শে এলে তাপ দেবে না নেবে। আণবিক গতিতত্ত্ব অনুসারে তাপমাত্রা হলো অণুগুলোর এলোমেলো গতির গড় গতিশক্তির পরিমাপ ($\\bar{E}_k \\propto T$)। এর SI একক **কেলভিন (K)**।

### ২. অভ্যন্তরীণ শক্তি ও তাপপ্রবাহের দিক
- কোনো বস্তুর অণুগুলোর গতিশক্তি ও স্থিতিশক্তির সমষ্টিকে **অভ্যন্তরীণ শক্তি (Internal Energy)** বলে।
- তাপপ্রবাহ মোট অভ্যন্তরীণ শক্তির পরিমাণের ওপর নির্ভর করে না; তা নির্ভর করে কেবল **তাপমাত্রার পার্থক্যের** ওপর। তাপ সর্বদা স্বতঃস্ফূর্তভাবে উচ্চ তাপমাত্রার বস্তু থেকে নিম্ন তাপমাত্রার বস্তুর দিকে প্রবাহিত হয়, যতক্ষণ না উভয়ের তাপমাত্রা সমান হয় অর্থাৎ **তাপীয় সাম্যাবস্থা (Thermal Equilibrium)** প্রতিষ্ঠিত হয়।`,
      importantTerms: [
        {
          termBangla: 'তাপ',
          termEnglish: 'Heat',
          definition: 'তাপমাত্রার পার্থক্যের কারণে এক বস্তু থেকে অন্য বস্তুতে স্থানান্তরিত শক্তি (একক: জুল)।',
        },
        {
          termBangla: 'তাপমাত্রা',
          termEnglish: 'Temperature',
          definition: 'বস্তুর তাপীয় অবস্থা ও অণুগুলোর গড় গতিশক্তির পরিমাপ (একক: কেলভিন)।',
        },
        {
          termBangla: 'অভ্যন্তরীণ শক্তি',
          termEnglish: 'Internal Energy',
          definition: 'বস্তুর অভ্যন্তরীণ সকল কণার মোট গতিশক্তি ও স্থিতিশক্তির সমষ্টি।',
        },
        {
          termBangla: 'তাপীয় সাম্যাবস্থা',
          termEnglish: 'Thermal Equilibrium',
          definition: 'উভয় বস্তুর তাপমাত্রা সমান হওয়ায় তাদের মধ্যে নিট তাপের আদান-প্রদান শূন্য হওয়ার অবস্থা।',
        },
      ],
      workedExample: {
        problem:
          'একটি পাত্রে ২০°C তাপমাত্রার ৫ কেজি পানি এবং অন্য পাত্রে ৮০°C তাপমাত্রার ২৫০ গ্রাম পানি রয়েছে। কোন পাত্রে মোট অভ্যন্তরীণ শক্তি বেশি এবং কোন পাত্র থেকে কোন পাত্রে তাপ প্রবাহিত হবে?',
        stepByStepSolution:
          '১. অভ্যন্তরীণ শক্তি $U \\propto msT$:\nপ্রথম পাত্রে: $m_A = 5\\text{ kg}, T_A = 20 + 273.15 = 293.15\\text{ K} \\implies U_A \\propto 5 \\times 293.15 = 1465.75$\nদ্বিতীয় পাত্রে: $m_B = 0.25\\text{ kg}, T_B = 80 + 273.15 = 353.15\\text{ K} \\implies U_B \\propto 0.25 \\times 353.15 = 88.29$\nসুতরাং প্রথম পাত্রে মোট অভ্যন্তরীণ শক্তি প্রায় ১৬.৬ গুণ বেশি।\n\n২. তাপপ্রবাহের দিক:\nযেহেতু দ্বিতীয় পাত্রের তাপমাত্রা ($80^\\circ\\text{C}$) প্রথম পাত্রের তাপমাত্রা ($20^\\circ\\text{C}$) অপেক্ষা বেশি, তাই তাপ দ্বিতীয় পাত্র থেকে প্রথম পাত্রে প্রবাহিত হবে।',
      },
      memoryAid: '“তাপ হলো শক্তির ভাণ্ডার, তাপমাত্রা তার লেভেল; উঁচু তল থেকে নিচু তলে তাপ দেবে যে বেল!”',
      status: ContentStatus.PUBLISHED,
    }
  );

  // =========================================================================
  // 2. Topic 6.2: তাপমাত্রিক ধর্ম ও স্কেল (Thermometric Properties & Scales)
  // =========================================================================
  await upsertTopicAndLesson(
    'top_ssc_physics_ch6_2',
    '৬.২ তাপমাত্রিক ধর্ম ও তাপমাত্রার স্কেল (Thermometric Properties and Scales)',
    2,
    'les_ssc_physics_ch6_2',
    {
      titleBangla: 'তাপমাত্রিক ধর্ম ও তাপমাত্রার স্কেল',
      learningGoal:
        'তাপমাত্রিক পদার্থ ও ধর্ম, সেলসিয়াস-ফারেনহাইট-কেলভিনের সম্পর্ক এবং থার্মোমিটারের ত্রুটি সংশোধন ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. তাপমাত্রিক ধর্ম ও পদার্থ
- যে পদার্থের ভৌত ধর্ম ব্যবহার করে থার্মোমিটার তৈরি করা হয় তাকে **তাপমাত্রিক পদার্থ** এবং ওই পরিবর্তিত ধর্মকে **তাপমাত্রিক ধর্ম** বলে।
- যেমন: পারদের আয়তন প্রসারণ, প্লাটিনাম তারের বৈদ্যুতিক রোধ, আবদ্ধ গ্যাসের চাপ এবং থার্মোকাপলের তড়িচ্চালক শক্তি (EMF)।

### ২. স্থিরবিন্দু ও স্কেলসমূহের মৌলিক সম্পর্ক
- **নিম্ন স্থিরবিন্দু (বরফবিন্দু, $\\theta_i$):** প্রমাণ চাপে বরফের গলনাঙ্ক ($0^\\circ\\text{C} = 32^\\circ\\text{F} = 273.15\\text{ K}$)।
- **ঊর্ধ্ব স্থিরবিন্দু (বাষ্পবিন্দু, $\\theta_s$):** প্রমাণ চাপে পানির স্ফুটনাঙ্ক ($100^\\circ\\text{C} = 212^\\circ\\text{F} = 373.15\\text{ K}$)।
- মৌলিক ব্যবধানের সমীকরণ:
$$\\frac{\\theta - \\theta_i}{\\theta_s - \\theta_i} = \\text{ধ্রুবক} \\implies \\frac{C}{5} = \\frac{F-32}{9} = \\frac{K-273}{5}$$

### ৩. ত্রুটিপূর্ণ থার্মোমিটারের পাঠ
$$\\frac{X - X_i}{X_s - X_i} = \\frac{C}{100}$$
যেখানে $X_i$ বরফবিন্দুর পাঠ, $X_s$ বাষ্পবিন্দুর পাঠ এবং $X$ প্রদর্শিত পাঠ।`,
      importantTerms: [
        {
          termBangla: 'তাপমাত্রিক ধর্ম',
          termEnglish: 'Thermometric Property',
          definition: 'তাপমাত্রার সাথে সুষমভাবে পরিবর্তিত হওয়া ভৌত ধর্ম যা দিয়ে তাপমাত্রা মাপা হয়।',
        },
        {
          termBangla: 'মৌলিক ব্যবধান',
          termEnglish: 'Fundamental Interval',
          definition: 'ঊর্ধ্ব স্থিরবিন্দু ও নিম্ন স্থিরবিন্দুর মধ্যকার তাপমাত্রিক ব্যবধান।',
        },
        {
          termBangla: 'পরম শূন্য তাপমাত্রা',
          termEnglish: 'Absolute Zero',
          definition: '0 K বা -273.15°C; যে তাপমাত্রায় গ্যাসের আয়তন ও আণবিক গতিশক্তি তাত্ত্বিকভাবে শূন্য হয়।',
        },
      ],
      workedExample: {
        problem:
          'কোন তাপমাত্রায় সেলসিয়াস ও ফারেনহাইট স্কেলে পাঠ অভিন্ন হবে?',
        stepByStepSolution:
          'ধরি তাপমাত্রা $x$। সুতরাং $C = x$ এবং $F = x$।\nसूत्र: $\\frac{C}{5} = \\frac{F-32}{9}$\n$$\\frac{x}{5} = \\frac{x-32}{9} \\implies 9x = 5x - 160 \\implies 4x = -160 \\implies x = -40$$\nউত্তর: -40° তাপমাত্রায় সেলসিয়াস ও ফারেনহাইট স্কেলে একই পাঠ দেখায় ($-40^\\circ\\text{C} = -40^\\circ\\text{F}$)।',
      },
      memoryAid: '“C বাই ৫ সমান F মাইনাস ৩২ বাই ৯; কেলভিন পেতে সেলসিয়াসে ২৭৩ যোগ দিলেই ফাইন!”',
      status: ContentStatus.PUBLISHED,
    }
  );

  // =========================================================================
  // 3. Topic 6.3: পদার্থের তাপীয় প্রসারণ (Thermal Expansion of Matter)
  // =========================================================================
  await upsertTopicAndLesson(
    'top_ssc_physics_ch6_3',
    '৬.৩ পদার্থের তাপীয় প্রসারণ (Thermal Expansion of Matter)',
    3,
    'les_ssc_physics_ch6_3',
    {
      titleBangla: 'পদার্থের তাপীয় প্রসারণ',
      learningGoal:
        'কঠিন পদার্থের দৈর্ঘ্য, ক্ষেত্রফল ও আয়তন প্রসারণ সহগ, তরলের প্রকৃত ও আপাত প্রসারণ এবং পানির ব্যতিক্রমী প্রসারণ বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. কঠিন পদার্থের প্রসারণ সহগসমূহ
- **দৈর্ঘ্য প্রসারণ সহগ ($\\alpha$):** $\\Delta L = L_1 \\alpha \\Delta T \\implies \\alpha = \\frac{L_2 - L_1}{L_1 \\Delta T}$ (একক: $\\text{K}^{-1}$)।
- **ক্ষেত্র প্রসারণ সহগ ($\\beta$):** $\\Delta A = A_1 \\beta \\Delta T \\implies \\beta \\approx 2\\alpha$।
- **আয়তন প্রসারণ সহগ ($\\gamma$):** $\\Delta V = V_1 \\gamma \\Delta T \\implies \\gamma \\approx 3\\alpha$।
- **পারস্পরিক সম্পর্ক:** $\\frac{\\alpha}{1} = \\frac{\\beta}{2} = \\frac{\\gamma}{3}$।

### ২. তরলের প্রসারণ ও পানির ব্যতিক্রমী আচরণ
- তরলের প্রকৃত প্রসারণ ($\\gamma_r$) ও আপাত প্রসারণ ($\\gamma_a$):
$$\\gamma_r = \\gamma_a + \\gamma_g$$
যেখানে $\\gamma_g$ হলো পাত্রের উপাদানের আয়তন প্রসারণ সহগ।
- **পানির ব্যতিক্রমী প্রসারণ:** পানিকে 0°C থেকে উত্তপ্ত করলে 4°C পর্যন্ত আয়তন কমে এবং ঘনত্ব সর্বোচ্চ ($1000\\text{ kg/m}^3$) হয়। এরপর তাপমাত্রা বাড়লে স্বাভাবিকভাবে প্রসারিত হয়। এর ফলেই তীব্র শীতে হ্রদের নিচে জলজ প্রাণী বেঁচে থাকে।`,
      interactiveWidgetUrl: '/uploads/interactive/thermal-expansion-lab.html',
      importantTerms: [
        {
          termBangla: 'দৈর্ঘ্য প্রসারণ সহগ',
          termEnglish: 'Coefficient of Linear Expansion',
          definition: '১ মিটার দৈর্ঘ্যের দণ্ডের তাপমাত্রা ১ কেলভিন বাড়ালে যে দৈর্ঘ্য বৃদ্ধি পায় (\\alpha, একক: K⁻¹)।',
        },
        {
          termBangla: 'ক্ষেত্র প্রসারণ সহগ',
          termEnglish: 'Coefficient of Superficial Expansion',
          definition: '১ বর্গমিটার ক্ষেত্রফলের বস্তুর তাপমাত্রা ১ কেলভিন বাড়ালে ক্ষেত্রফল বৃদ্ধি (\\beta \\approx 2\\alpha)।',
        },
        {
          termBangla: 'পানির ব্যতিক্রমী প্রসারণ',
          termEnglish: 'Anomalous Expansion of Water',
          definition: '০°C থেকে ৪°C পর্যন্ত উত্তপ্ত করলে সংকোচন ও ৪°C-এ সর্বোচ্চ ঘনত্বের অনন্য ধর্ম।',
        },
      ],
      workedExample: {
        problem:
          '২০°C তাপমাত্রায় একটি রেললাইনের ইস্পাতের পাতের দৈর্ঘ্য ৩০ মিটার। গ্রীষ্মকালে তাপমাত্রা বেড়ে ৫৫°C হলে পাতের দৈর্ঘ্য বৃদ্ধি কত হবে? (ইস্পাতের $\\alpha = 11 \\times 10^{-6}\\text{ K}^{-1}$)',
        stepByStepSolution:
          '$L_1 = 30\\text{ m}$, $\\Delta T = 55 - 20 = 35\\text{ K}$, $\\alpha = 11 \\times 10^{-6}\\text{ K}^{-1}$।\n$$\\Delta L = L_1 \\alpha \\Delta T = 30 \\times (11 \\times 10^{-6}) \\times 35 = 0.01155\\text{ m} = 11.55\\text{ mm}$$\nউত্তর: ১১.৫৫ মিলিমিটার।',
      },
      memoryAid: '“আলফা দৈর্ঘ্যে একাই চলে, বিটা ক্ষেত্র দ্বিগুণ বলে; গামা ধরে তিনগুণ স্থান, চার ডিগ্রিতে পানির সর্বোচ্চ মান!”',
      status: ContentStatus.PUBLISHED,
    }
  );

  // =========================================================================
  // 4. Topic 6.4: অবস্থার পরিবর্তন, সুপ্ততাপ ও বাষ্পীভবন
  // =========================================================================
  await upsertTopicAndLesson(
    'top_ssc_physics_ch6_4',
    '৬.৪ অবস্থার পরিবর্তন, সুপ্ততাপ ও বাষ্পীভবন (Change of State, Latent Heat and Evaporation)',
    4,
    'les_ssc_physics_ch6_4',
    {
      titleBangla: 'অবস্থার পরিবর্তন, সুপ্ততাপ ও বাষ্পীভবন',
      learningGoal:
        'গলন ও বাষ্পীভবনের সুপ্ততাপ, দশান্তর প্রক্রিয়ায় তাপের হিসাব, বাষ্পায়নের নিয়ামক এবং বাষ্পীভবনে শীতলীকরণ ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. সুপ্ততাপ (Latent Heat)
- তাপমাত্রা অপরিবর্তিত রেখে একক ভরের কোনো পদার্থের অবস্থা পরিবর্তনের জন্য শোষিত বা বর্জিত তাপকে **সুপ্ততাপ ($L$)** বলে:
$$Q = m \\cdot L$$
- **গলনের আপেক্ষিক সুপ্ততাপ ($L_f$):** বরফের জন্য $L_f = 3.36 \\times 10^5\\text{ J/kg}$।
- **বাষ্পীভবনের আপেক্ষিক সুপ্ততাপ ($L_v$):** পানির জন্য $L_v = 2.26 \\times 10^6\\text{ J/kg}$।
- সুপ্ততাপ কণার গতিবেগ না বাড়িয়ে আন্তঃআণবিক আকর্ষণ বল ভেঙে দশান্তর ঘটাতে ব্যবহৃত হয়।

### ২. বাষ্পীভবনে শীতলীকরণ
- তরলের সর্বাধিক গতিশক্তির অণুগুলো পৃষ্ঠ থেকে উড়ে যাওয়ায় তরলে অবশিষ্ট অণুগুলোর গড় গতিশক্তি হ্রাস পায়। ফলে তাপমাত্রা কমে এবং শীতলতার সৃষ্টি হয় (যেমন মাটির কলসির পানি ঠান্ডা থাকা, ঘাম শুকালে স্বস্তি)।`,
      importantTerms: [
        {
          termBangla: 'সুপ্ততাপ',
          termEnglish: 'Latent Heat',
          definition: 'তাপমাত্রা স্থির রেখে বস্তুর অবস্থার পরিবর্তন ঘটাতে প্রয়োজনীয় তাপ (Q = mL)।',
        },
        {
          termBangla: 'গলনের আপেক্ষিক সুপ্ততাপ',
          termEnglish: 'Latent Heat of Fusion',
          definition: '১ কেজি বরফকে গলিয়ে পানিতে রূপান্তরের সুপ্ততাপ (L_f = 3.36 × 10⁵ J/kg)।',
        },
        {
          termBangla: 'বাষ্পীভবনের আপেক্ষিক সুপ্ততাপ',
          termEnglish: 'Latent Heat of Vaporization',
          definition: '১ কেজি পানিকে বাষ্পে রূপান্তরের সুপ্ততাপ (L_v = 2.26 × 10⁶ J/kg)।',
        },
      ],
      workedExample: {
        problem:
          '0°C তাপমাত্রার 500 g বরফকে 0°C তাপমাত্রার পানিতে রূপান্তর করতে কত তাপের প্রয়োজন? ($L_f = 3.36 \\times 10^5\\text{ J/kg}$)',
        stepByStepSolution:
          '$m = 500\\text{ g} = 0.5\\text{ kg}$।\n$$Q = m \\cdot L_f = 0.5 \\times (3.36 \\times 10^5) = 168,000\\text{ J} = 1.68 \\times 10^5\\text{ J}$$\nউত্তর: ১.৬৮ × ১০⁵ জুল।',
      },
      memoryAid: '“সুপ্ততাপ লুকিয়ে থাকে ভাঙতে কণার বন্ধন; তাপমাত্রা রয় স্থির যখন চলে অবস্থার ক্রন্দন!”',
      status: ContentStatus.PUBLISHED,
    }
  );

  // =========================================================================
  // 5. Topic 6.5: আপেক্ষিক তাপ ও তাপধারণক্ষমতা
  // =========================================================================
  await upsertTopicAndLesson(
    'top_ssc_physics_ch6_5',
    '৬.৫ আপেক্ষিক তাপ ও তাপধারণক্ষমতা (Specific Heat and Heat Capacity)',
    5,
    'les_ssc_physics_ch6_5',
    {
      titleBangla: 'আপেক্ষিক তাপ ও তাপধারণক্ষমতা',
      learningGoal:
        'তাপধারণক্ষমতা ও আপেক্ষিক তাপের সম্পর্ক, Q = msΔT সমীকরণ এবং পানির উচ্চ আপেক্ষিক তাপের গুরুত্ব ব্যাখ্যা করতে পারবে।',
      explanation: `### ১. তাপধারণক্ষমতা ও আপেক্ষিক তাপ
- **তাপধারণক্ষমতা ($C$):** কোনো বস্তুর সামগ্রিক তাপমাত্রা ১ কেলভিন বাড়াতে প্রয়োজনীয় তাপ ($C = \\frac{Q}{\\Delta T}$, একক: $\\text{J/K}$)।
- **আপেক্ষিক তাপ ($s$):** ১ কেজি পদার্থের তাপমাত্রা ১ কেলভিন বাড়াতে প্রয়োজনীয় তাপ ($s = \\frac{Q}{m \\Delta T}$, একক: $\\text{J/(kg}\\cdot\\text{K)}$)।
- **সম্পর্ক:** $C = m \\cdot s$ এবং শোষিত বা বর্জিত তাপ $Q = m \\cdot s \\cdot \\Delta T$।

### ২. পানির উচ্চ আপেক্ষিক তাপের গুরুত্ব
- পানির আপেক্ষিক তাপ $4200\\text{ J/(kg}\\cdot\\text{K)}$ অত্যন্ত বেশি হওয়ায় পানি ধীরে গরম হয় ও ধীরে ঠান্ডা হয়। ফলে সমুদ্র উপকূলের আবহাওয়া নাতিশীতোষ্ণ থাকে এবং গাড়ির ইঞ্জিনের কুল্যান্ট ও হট ওয়াটার ব্যাগে পানি ব্যবহৃত হয়।`,
      importantTerms: [
        {
          termBangla: 'তাপধারণক্ষমতা',
          termEnglish: 'Heat Capacity',
          definition: 'নির্দিষ্ট কোনো বস্তুর তাপমাত্রা ১ কেলভিন বাড়াতে প্রয়োজনীয় মোট তাপ (C = Q/ΔT = ms)।',
        },
        {
          termBangla: 'আপেক্ষিক তাপ',
          termEnglish: 'Specific Heat',
          definition: '১ কেজি পদার্থের তাপমাত্রা ১ কেলভিন বাড়াতে প্রয়োজনীয় তাপ (পানির জন্য ৪২০০ জুল/কেজি·কে)।',
        },
      ],
      workedExample: {
        problem:
          '২ কেজি পানির তাপমাত্রা ২০°C থেকে বৃদ্ধি করে ৮৫°C করতে কত তাপশক্তির প্রয়োজন? ($s = 4200\\text{ J/(kg}\\cdot\\text{K)}$)',
        stepByStepSolution:
          '$m = 2\\text{ kg}$, $s = 4200\\text{ J/(kg}\\cdot\\text{K)}$, $\\Delta T = 85 - 20 = 65\\text{ K}$।\n$$Q = ms\\Delta T = 2 \\times 4200 \\times 65 = 546,000\\text{ J} = 546\\text{ kJ}$$\nউত্তর: ৫৪৬ কিলোজুল।',
      },
      memoryAid: '“ভর আর এস গুণ দিলে পাই সি অর্থাৎ ক্যাপাসিটি; পানির ৪২০০ জুলে শান্ত থাকে সব সিটি!”',
      status: ContentStatus.PUBLISHED,
    }
  );

  // =========================================================================
  // 6. Topic 6.6: ক্যালরিমিতির মূলনীতি (Principles of Calorimetry)
  // =========================================================================
  await upsertTopicAndLesson(
    'top_ssc_physics_ch6_6',
    '৬.৬ ক্যালরিমিতির মূলনীতি (Principles of Calorimetry)',
    6,
    'les_ssc_physics_ch6_6',
    {
      titleBangla: 'ক্যালরিমিতির মূলনীতি',
      learningGoal:
        'ক্যালরিমিতির মূলনীতি (Q_lost = Q_gained), মিশ্রণের চূড়ান্ত সাম্যাবস্থার তাপমাত্রা এবং বরফ-পানির মিশ্রণের সমাধান করতে পারবে।',
      explanation: `### ১. ক্যালরিমিতির মূলনীতি
বিচ্ছিন্ন তাপীয় ব্যবস্থায় গরম বস্তুর বর্জিত মোট তাপ = ঠান্ডা বস্তুর গৃহীত মোট তাপ:
$$Q_{\\text{lost}} = Q_{\\text{gained}}$$
$$m_1 s_1 (T_1 - T_f) = m_2 s_2 (T_f - T_2)$$
$$T_f = \\frac{m_1 s_1 T_1 + m_2 s_2 T_2}{m_1 s_1 + m_2 s_2}$$

### ২. পানির সমতুল্য (W)
কোনো বস্তুর তাপমাত্রা ১ কেলভিন বাড়াতে যে তাপ লাগে, সেই তাপে যে পরিমাণ পানির তাপমাত্রা ১ কেলভিন বাড়ে তাকে পানির সমতুল্য ($W = ms$) বলে।`,
      interactiveWidgetUrl: '/uploads/interactive/calorimetry-lab.html',
      importantTerms: [
        {
          termBangla: 'ক্যালরিমিতির মূলনীতি',
          termEnglish: 'Principle of Calorimetry',
          definition: 'বিচ্ছিন্ন ব্যবস্থায় বর্জিত তাপ = গৃহীত তাপ (Q_lost = Q_gained)।',
        },
        {
          termBangla: 'পানির সমতুল্য',
          termEnglish: 'Water Equivalent',
          definition: 'কোনো বস্তুর তাপধারণক্ষমতার সমতুল্য পানির ভর (W = mc)।',
        },
      ],
      workedExample: {
        problem:
          '৯০°C তাপমাত্রার ১০০ গ্রাম তামার টুকরা ২০°C তাপমাত্রার ২০০ গ্রাম পানিতে ছেড়ে দিলে চূড়ান্ত তাপমাত্রা কত হবে? (তামার $s=400$, পানির $s=4200$)',
        stepByStepSolution:
          '$m_1 = 0.1\\text{ kg}, T_1 = 90^\\circ\\text{C}, s_1 = 400$; $m_2 = 0.2\\text{ kg}, T_2 = 20^\\circ\\text{C}, s_2 = 4200$।\n$$0.1 \\times 400 \\times (90 - T_f) = 0.2 \\times 4200 \\times (T_f - 20)$$\n$$40(90 - T_f) = 840(T_f - 20) \\implies 3600 - 40T_f = 840T_f - 16800$$\n$$880T_f = 20400 \\implies T_f = 23.18^\\circ\\text{C}$$\nউত্তর: ২৩.১৮°C।',
      },
      memoryAid: '“গরম ছাড়ে ঠান্ডা ধরে, মাঝখানে রয় সাম্য তাপ; লস্ট সমান গেইন্ড হলে ক্যালরিমিতির সঠিক মাপ!”',
      status: ContentStatus.PUBLISHED,
    }
  );

  // =========================================================================
  // 7. Topic 6.7: গলনাঙ্ক ও স্ফুটনাঙ্কের ওপর চাপের প্রভাব
  // =========================================================================
  await upsertTopicAndLesson(
    'top_ssc_physics_ch6_7',
    '৬.৭ গলনাঙ্ক ও স্ফুটনাঙ্কের ওপর চাপের প্রভাব (Effect of Pressure on Melting and Boiling Points)',
    7,
    'les_ssc_physics_ch6_7',
    {
      titleBangla: 'গলনাঙ্ক ও স্ফুটনাঙ্কের ওপর চাপের প্রভাব',
      learningGoal:
        'পুনঃশিলীভবন, বরফে স্কেটিং করার বৈজ্ঞানিক কারণ, প্রেসার কুকারের কার্যপ্রণালি এবং পাহাড়ে রান্নার কৌশল বিশ্লেষণ করতে পারবে।',
      explanation: `### ১. গলনাঙ্কের ওপর চাপের প্রভাব
- **গলনে আয়তন কমলে (বরফ):** চাপ বাড়ালে গলনাঙ্ক কমে ($0^\\circ\\text{C}$-এর নিচে নামে)।
- **গলনে আয়তন বাড়লে (মোম):** চাপ বাড়ালে গলনাঙ্ক বাড়ে।
- **পুনঃশিলীভবন (Regelation):** চাপে বরফ গলে যাওয়া এবং চাপ অপসরণে পুনরায় জমাট বাঁধার ঘটনা। এর ফলেই বরফে স্কেটিং ও স্নোবল তৈরি সম্ভব হয়।

### ২. স্ফুটনাঙ্কের ওপর চাপের প্রভাব
- চাপ বাড়ালে তরলের স্ফুটনাঙ্ক বৃদ্ধি পায় এবং চাপ কমালে স্ফুটনাঙ্ক হ্রাস পায়।
- **প্রেসার কুকার:** আবদ্ধ বাষ্পের চাপে স্ফুটনাঙ্ক বেড়ে প্রায় ১২০°C-১২৫°C হয়, ফলে খাবার দ্রুত সুসিদ্ধ হয় ও জ্বালানি সাশ্রয় হয়।
- **পাহাড়ি অঞ্চলে রান্না:** উচ্চতায় বায়ুচাপ কম থাকায় পানি প্রায় ৭০°C-৮০°C-এ ফুটে যায়, ফলে খোলা পাত্রে রান্না করা যায় না।`,
      importantTerms: [
        {
          termBangla: 'পুনঃশিলীভবন',
          termEnglish: 'Regelation',
          definition: 'চাপ প্রয়োগে গলনাঙ্ক কমে বরফ গলে যাওয়া এবং চাপ অপসারণে পুনরায় জমাট বাঁধার ধর্ম।',
        },
        {
          termBangla: 'প্রেসার কুকার',
          termEnglish: 'Pressure Cooker',
          definition: 'আবদ্ধ বাষ্পের উচ্চ চাপে পানির স্ফুটনাঙ্ক ১২০°C পর্যন্ত বাড়িয়ে দ্রুত রান্না করার পাত্র।',
        },
      ],
      workedExample: {
        problem:
          'এভারেস্টের চূড়ায় ডিম সেদ্ধ করতে খোলা পাত্রের চেয়ে প্রেসার কুকার কেন অপরিহার্য?',
        stepByStepSolution:
          'এভারেস্টে বায়ুচাপ কম থাকায় খোলা পাত্রের পানি প্রায় ৭০°C-এই ফুটতে শুরু করে, যা ডিমের প্রোটিন সেদ্ধ করার জন্য পর্যাপ্ত নয়। প্রেসার কুকারে বাষ্প আবদ্ধ থাকায় ভেতরের চাপ দ্বিগুণ হয়ে স্ফুটনাঙ্ক প্রায় ১২০°C-এ পৌঁছায়, ফলে ডিম দ্রুত সেদ্ধ হয়।',
      },
      memoryAid: '“চাপে কমে বরফের গলন, মোমের বাড়ে ভাই; প্রেসার কুকারে ১২০ ডিগ্রিতে দ্রুত খাবার পাই!”',
      status: ContentStatus.PUBLISHED,
    }
  );

  console.log('🎉 Successfully seeded all 7 topics and lessons for Chapter 6: বস্তুর ওপর তাপের প্রভাব!');

  console.log(`Seeding ${chapter6Questions.length} Chapter 6 MCQs and CQs...`);
  for (const q of chapter6Questions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: q as any,
      create: q as any,
    });
  }
  console.log(`✅ Successfully seeded ${chapter6Questions.length} MCQs and CQs for Chapter 6!`);
}

if (require.main === module || process.argv[1]?.includes('seed-chapter-6')) {
  const prisma = new PrismaClient();
  seedChapter6(prisma)
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
