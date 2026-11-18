export interface TopicItem {
  id: string;
  chapterId: string;
  orderIndex: number;
  titleBangla: string;
  lessonCount?: number;
  hasInteractiveLab?: boolean;
  questionCount?: number;
  cqCount?: number;
}

export interface ChapterItem {
  id: string;
  subjectId: string;
  orderIndex: number;
  titleBangla: string;
  topics: TopicItem[];
}

export interface ResolvedTopicHierarchy {
  topicId: string;
  topicTitle: string;
  chapterId: string;
  chapterTitle: string;
  subjectId: string;
}

export interface AdjacentTopicsResult {
  prevTopic: (TopicItem & { chapterTitle: string }) | null;
  nextTopic: (TopicItem & { chapterTitle: string }) | null;
  currentChapter: ChapterItem | null;
  topicIndex: number;
  totalInChapter: number;
}

export function findAdjacentTopics(
  topicId: string,
  chapters: ChapterItem[] = [],
): AdjacentTopicsResult {
  if (!topicId || !chapters || chapters.length === 0) {
    return {
      prevTopic: null,
      nextTopic: null,
      currentChapter: null,
      topicIndex: 1,
      totalInChapter: 1,
    };
  }

  const flatTopics: Array<TopicItem & { chapterTitle: string; chapterRef: ChapterItem; indexInChapter: number }> = [];
  for (const ch of chapters) {
    (ch.topics || []).forEach((t, idx) => {
      flatTopics.push({
        ...t,
        chapterTitle: ch.titleBangla,
        chapterRef: ch,
        indexInChapter: idx + 1,
      });
    });
  }

  const foundIdx = flatTopics.findIndex((t) => t.id === topicId);
  if (foundIdx === -1) {
    return {
      prevTopic: null,
      nextTopic: null,
      currentChapter: null,
      topicIndex: 1,
      totalInChapter: 1,
    };
  }

  const current = flatTopics[foundIdx];
  const prev = foundIdx > 0 ? flatTopics[foundIdx - 1] : null;
  const next = foundIdx < flatTopics.length - 1 ? flatTopics[foundIdx + 1] : null;

  return {
    prevTopic: prev
      ? {
          id: prev.id,
          chapterId: prev.chapterId,
          orderIndex: prev.orderIndex,
          titleBangla: prev.titleBangla,
          lessonCount: prev.lessonCount,
          hasInteractiveLab: prev.hasInteractiveLab,
          questionCount: prev.questionCount,
          cqCount: prev.cqCount,
          chapterTitle: prev.chapterTitle,
        }
      : null,
    nextTopic: next
      ? {
          id: next.id,
          chapterId: next.chapterId,
          orderIndex: next.orderIndex,
          titleBangla: next.titleBangla,
          lessonCount: next.lessonCount,
          hasInteractiveLab: next.hasInteractiveLab,
          questionCount: next.questionCount,
          cqCount: next.cqCount,
          chapterTitle: next.chapterTitle,
        }
      : null,
    currentChapter: current.chapterRef,
    topicIndex: current.indexInChapter,
    totalInChapter: current.chapterRef.topics.length || 1,
  };
}

export function findTopicHierarchy(
  topicId: string,
  chapters: ChapterItem[] = [],
): ResolvedTopicHierarchy {
  for (const ch of chapters) {
    const topic = ch.topics?.find((t) => t.id === topicId);
    if (topic) {
      return {
        topicId: topic.id,
        topicTitle: topic.titleBangla,
        chapterId: ch.id,
        chapterTitle: ch.titleBangla,
        subjectId: ch.subjectId,
      };
    }
    if (ch.id === topicId) {
      return {
        topicId: ch.topics?.[0]?.id || topicId,
        topicTitle: ch.topics?.[0]?.titleBangla || ch.titleBangla,
        chapterId: ch.id,
        chapterTitle: ch.titleBangla,
        subjectId: ch.subjectId,
      };
    }
  }

  return {
    topicId,
    topicTitle: '',
    chapterId: '',
    chapterTitle: '',
    subjectId: '',
  };
}
