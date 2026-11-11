export interface TopicItem {
  id: string;
  chapterId: string;
  orderIndex: number;
  titleBangla: string;
}

export interface ChapterItem {
  id: string;
  subjectId: string;
  orderIndex: number;
  titleBangla: string;
  topics: TopicItem[];
}

export const DEFAULT_CHAPTERS: ChapterItem[] = [
  {
    id: 'chap_ssc_physics_ch1',
    subjectId: 'sub_ssc_physics',
    orderIndex: 1,
    titleBangla: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
    topics: [
      { id: 'top_ssc_physics_ch1_1', chapterId: 'chap_ssc_physics_ch1', orderIndex: 1, titleBangla: '১.১ পদার্থবিজ্ঞান (Physics)' },
      { id: 'top_ssc_physics_ch1_2', chapterId: 'chap_ssc_physics_ch1', orderIndex: 2, titleBangla: '১.২ পদার্থবিজ্ঞানের পরিসর (Scope of Physics)' },
      { id: 'top_ssc_physics_ch1_3', chapterId: 'chap_ssc_physics_ch1', orderIndex: 3, titleBangla: '১.৩ পদার্থবিজ্ঞানের ক্রমবিকাশ (Development of Physics)' },
      { id: 'top_ssc_physics_ch1_4', chapterId: 'chap_ssc_physics_ch1', orderIndex: 4, titleBangla: '১.৪ পদার্থবিজ্ঞানের উদ্দেশ্য (Objectives of Physics)' },
      { id: 'top_ssc_physics_ch1_5', chapterId: 'chap_ssc_physics_ch1', orderIndex: 5, titleBangla: '১.৫ ভৌত রাশি ও তাদের পরিমাপ (Physical Quantities)' },
      { id: 'top_ssc_physics_ch1_6', chapterId: 'chap_ssc_physics_ch1', orderIndex: 6, titleBangla: '১.৬ পরিমাপের যন্ত্রপাতি (Measuring Instruments)' },
      { id: 'top_ssc_physics_ch1_7', chapterId: 'chap_ssc_physics_ch1', orderIndex: 7, titleBangla: '১.৭ পরিমাপের ত্রুটি ও নির্ভুলতা (Error and Accuracy)' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch2',
    subjectId: 'sub_ssc_physics',
    orderIndex: 2,
    titleBangla: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
    topics: [
      { id: 'top_ssc_physics_ch2_1', chapterId: 'chap_ssc_physics_ch2', orderIndex: 1, titleBangla: '২.১ স্থিতি এবং গতি (Rest and Motion)' },
      { id: 'top_ssc_physics_ch2_2', chapterId: 'chap_ssc_physics_ch2', orderIndex: 2, titleBangla: '২.২ বিভিন্ন প্রকার গতি (Different Types of Motion)' },
      { id: 'top_ssc_physics_ch2_3', chapterId: 'chap_ssc_physics_ch2', orderIndex: 3, titleBangla: '২.৩ স্কেলার ও ভেক্টর রাশি (Scalar and Vector)' },
      { id: 'top_ssc_physics_ch2_4', chapterId: 'chap_ssc_physics_ch2', orderIndex: 4, titleBangla: '২.৪ দূরত্ব ও সরণ (Distance and Displacement)' },
      { id: 'top_ssc_physics_ch2_5', chapterId: 'chap_ssc_physics_ch2', orderIndex: 5, titleBangla: '২.৫ দ্রুতি ও বেগ (Speed and Velocity)' },
      { id: 'top_ssc_physics_ch2_6', chapterId: 'chap_ssc_physics_ch2', orderIndex: 6, titleBangla: '২.৬ ত্বরণ ও মন্দন (Acceleration and Deceleration)' },
      { id: 'top_ssc_physics_ch2_7', chapterId: 'chap_ssc_physics_ch2', orderIndex: 7, titleBangla: '২.৭ গতির সমীকরণ (Equations of Motion)' },
      { id: 'top_ssc_physics_ch2_8', chapterId: 'chap_ssc_physics_ch2', orderIndex: 8, titleBangla: '২.৮ পতনশীল বস্তুর সূত্র ও লেখচিত্র (Falling Bodies & Graphs)' },
      { id: 'top_ssc_physics_motion_eq', chapterId: 'chap_ssc_physics_ch2', orderIndex: 9, titleBangla: 'গতির সমীকরণ ও সমাধান' },
      { id: 'topic-motion-3', chapterId: 'chap_ssc_physics_ch2', orderIndex: 10, titleBangla: 'গতির সমীকরণসমূহ ও গাণিতিক বিশ্লেষণ' },
      { id: 'topic-motion-1', chapterId: 'chap_ssc_physics_ch2', orderIndex: 11, titleBangla: 'স্থিতি এবং গতি' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch3',
    subjectId: 'sub_ssc_physics',
    orderIndex: 3,
    titleBangla: 'তৃতীয় অধ্যায়: বল (Force)',
    topics: [
      { id: 'top_ssc_physics_ch3_1', chapterId: 'chap_ssc_physics_ch3', orderIndex: 1, titleBangla: '৩.১ জড়তা ও বলের ধারণা (Inertia and Force)' },
      { id: 'top_ssc_physics_ch3_2', chapterId: 'chap_ssc_physics_ch3', orderIndex: 2, titleBangla: '৩.২ মৌলিক বলের প্রকৃতি (Fundamental Forces)' },
      { id: 'top_ssc_physics_ch3_3', chapterId: 'chap_ssc_physics_ch3', orderIndex: 3, titleBangla: '৩.৩ সাম্য ও অসাম্য বল (Balanced and Unbalanced Forces)' },
      { id: 'top_ssc_physics_ch3_4', chapterId: 'chap_ssc_physics_ch3', orderIndex: 4, titleBangla: '৩.৪ বেগের ওপর বলের প্রভাব (How Force Changes Velocity)' },
      { id: 'top_ssc_physics_ch3_5', chapterId: 'chap_ssc_physics_ch3', orderIndex: 5, titleBangla: '৩.৫ নিউটনের দ্বিতীয় সূত্র ও বল পরিমাপ (Newton’s Second Law & Lab)' },
      { id: 'top_ssc_physics_ch3_6', chapterId: 'chap_ssc_physics_ch3', orderIndex: 6, titleBangla: '৩.৬ নিউটনের তৃতীয় সূত্র: ক্রিয়া ও প্রতিক্রিয়া (Action and Reaction)' },
      { id: 'top_ssc_physics_ch3_7', chapterId: 'chap_ssc_physics_ch3', orderIndex: 7, titleBangla: '৩.৭ নিরাপদ ভ্রমণে বল ও গতি (Forces in Safe Travel)' },
      { id: 'top_ssc_physics_ch3_8', chapterId: 'chap_ssc_physics_ch3', orderIndex: 8, titleBangla: '৩.৮ ভরবেগ সংরক্ষণ ও সংঘর্ষ (Conservation of Momentum & Lab)' },
      { id: 'top_ssc_physics_ch3_9', chapterId: 'chap_ssc_physics_ch3', orderIndex: 9, titleBangla: '৩.৯ ঘর্ষণ বলের ধরন ও বৈশিষ্ট্য (Types of Friction & Lab)' },
      { id: 'top_ssc_physics_ch3_10', chapterId: 'chap_ssc_physics_ch3', orderIndex: 10, titleBangla: '৩.১০ ঘর্ষণ, গতি ও ব্যবহার (Friction: Effects and Uses)' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch4',
    subjectId: 'sub_ssc_physics',
    orderIndex: 4,
    titleBangla: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি (Work, Power, and Energy)',
    topics: [
      { id: 'top_ssc_physics_ch4_1', chapterId: 'chap_ssc_physics_ch4', orderIndex: 1, titleBangla: '৪.১ কাজ (Work)' },
      { id: 'top_ssc_physics_ch4_2', chapterId: 'chap_ssc_physics_ch4', orderIndex: 2, titleBangla: '৪.২ শক্তি ও শক্তির বিভিন্ন রূপ (Energy and Forms of Energy)' },
      { id: 'top_ssc_physics_ch4_3', chapterId: 'chap_ssc_physics_ch4', orderIndex: 3, titleBangla: '৪.৩ গতিশক্তি ও বিভবশক্তি (Kinetic and Potential Energy)' },
      { id: 'top_ssc_physics_ch4_4', chapterId: 'chap_ssc_physics_ch4', orderIndex: 4, titleBangla: '৪.৪ শক্তির নিত্যতা ও রূপান্তর (Conservation & Transformation of Energy & Lab)' },
      { id: 'top_ssc_physics_ch4_5', chapterId: 'chap_ssc_physics_ch4', orderIndex: 5, titleBangla: '৪.৫ শক্তির উৎস ও পরিবেশের প্রভাব (Energy Sources and Environment)' },
      { id: 'top_ssc_physics_ch4_6', chapterId: 'chap_ssc_physics_ch4', orderIndex: 6, titleBangla: '৪.৬ ভর ও শক্তির সম্পর্ক (Mass–Energy Equivalence, E=mc²)' },
      { id: 'top_ssc_physics_ch4_7', chapterId: 'chap_ssc_physics_ch4', orderIndex: 7, titleBangla: '৪.৭ ক্ষমতা (Power)' },
      { id: 'top_ssc_physics_ch4_8', chapterId: 'chap_ssc_physics_ch4', orderIndex: 8, titleBangla: '৪.৮ কর্মদক্ষতা (Efficiency & Lab)' },
    ],
  },
  {
    id: 'chap_ssc_physics_ch6',
    subjectId: 'sub_ssc_physics',
    orderIndex: 6,
    titleBangla: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব (Effect of Heat on Matter)',
    topics: [
      { id: 'top_ssc_physics_ch6_1', chapterId: 'chap_ssc_physics_ch6', orderIndex: 1, titleBangla: '৬.১ তাপ ও তাপমাত্রা (Heat and Temperature)' },
      { id: 'top_ssc_physics_ch6_2', chapterId: 'chap_ssc_physics_ch6', orderIndex: 2, titleBangla: '৬.২ তাপমাত্রিক ধর্ম ও তাপমাত্রার স্কেল (Thermometric Properties and Scales)' },
      { id: 'top_ssc_physics_ch6_3', chapterId: 'chap_ssc_physics_ch6', orderIndex: 3, titleBangla: '৬.৩ পদার্থের তাপীয় প্রসারণ (Thermal Expansion of Matter & Lab)' },
      { id: 'top_ssc_physics_ch6_4', chapterId: 'chap_ssc_physics_ch6', orderIndex: 4, titleBangla: '৬.৪ অবস্থার পরিবর্তন, সুপ্ততাপ ও বাষ্পীভবন (Change of State, Latent Heat and Evaporation)' },
      { id: 'top_ssc_physics_ch6_5', chapterId: 'chap_ssc_physics_ch6', orderIndex: 5, titleBangla: '৬.৫ আপেক্ষিক তাপ ও তাপধারণক্ষমতা (Specific Heat and Heat Capacity)' },
      { id: 'top_ssc_physics_ch6_6', chapterId: 'chap_ssc_physics_ch6', orderIndex: 6, titleBangla: '৬.৬ ক্যালরিমিতির মূলনীতি (Principles of Calorimetry & Lab)' },
      { id: 'top_ssc_physics_ch6_7', chapterId: 'chap_ssc_physics_ch6', orderIndex: 7, titleBangla: '৬.৭ গলনাঙ্ক ও স্ফুটনাঙ্কের ওপর চাপের প্রভাব (Effect of Pressure on Melting and Boiling Points)' },
    ],
  },
];

export interface ResolvedTopicHierarchy {
  topicId: string;
  topicTitle: string;
  chapterId: string;
  chapterTitle: string;
  subjectId: string;
}

export function findTopicHierarchy(topicId: string, customChapters: ChapterItem[] = DEFAULT_CHAPTERS): ResolvedTopicHierarchy {
  const chaptersToSearch = customChapters && customChapters.length > 0 ? customChapters : DEFAULT_CHAPTERS;

  for (const ch of chaptersToSearch) {
    const topic = ch.topics?.find((t) => t.id === topicId);
    if (topic) {
      return {
        topicId: topic.id,
        topicTitle: topic.titleBangla,
        chapterId: ch.id,
        chapterTitle: ch.titleBangla,
        subjectId: ch.subjectId || 'sub_ssc_physics',
      };
    }
  }

  // Fallback by heuristic naming
  if (topicId.includes('ch1') || topicId.includes('measurement') || topicId.includes('fusis')) {
    return {
      topicId,
      topicTitle: 'ভৌত রাশি ও পরিমাপ',
      chapterId: 'chap_ssc_physics_ch1',
      chapterTitle: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
      subjectId: 'sub_ssc_physics',
    };
  }

  if (topicId.includes('ch3') || topicId.includes('force') || topicId.includes('inertia') || topicId.includes('friction') || topicId.includes('momentum') || topicId.includes('bol')) {
    return {
      topicId,
      topicTitle: 'বল (Force)',
      chapterId: 'chap_ssc_physics_ch3',
      chapterTitle: 'তৃতীয় অধ্যায়: বল (Force)',
      subjectId: 'sub_ssc_physics',
    };
  }

  if (topicId.includes('ch4') || topicId.includes('work') || topicId.includes('power') || topicId.includes('energy') || topicId.includes('kaj')) {
    return {
      topicId,
      topicTitle: 'কাজ, ক্ষমতা ও শক্তি',
      chapterId: 'chap_ssc_physics_ch4',
      chapterTitle: 'চতুর্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
      subjectId: 'sub_ssc_physics',
    };
  }

  if (topicId.includes('ch6') || topicId.includes('heat') || topicId.includes('temperature') || topicId.includes('tap') || topicId.includes('expansion') || topicId.includes('calorimetry')) {
    return {
      topicId,
      topicTitle: 'বস্তুর ওপর তাপের প্রভাব',
      chapterId: 'chap_ssc_physics_ch6',
      chapterTitle: 'ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব',
      subjectId: 'sub_ssc_physics',
    };
  }

  return {
    topicId,
    topicTitle: 'গতি (Motion)',
    chapterId: 'chap_ssc_physics_ch2',
    chapterTitle: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
    subjectId: 'sub_ssc_physics',
  };
}
