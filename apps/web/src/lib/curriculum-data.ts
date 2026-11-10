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

  return {
    topicId,
    topicTitle: 'গতি (Motion)',
    chapterId: 'chap_ssc_physics_ch2',
    chapterTitle: 'দ্বিতীয় অধ্যায়: গতি (Motion)',
    subjectId: 'sub_ssc_physics',
  };
}
