import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

const SUBJECT_CODE_ALIASES: Record<string, string> = {
  sub_ssc_physics: 'ssc_physics',
  'sub-ssc-phy': 'ssc_physics',
  'phy-ssc': 'ssc_physics',
  sub_ssc_chemistry: 'ssc_chemistry',
  'sub-ssc-chem': 'ssc_chemistry',
  'chem-ssc': 'ssc_chemistry',
};

@Injectable()
export class CurriculumService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async resolveSubject(subjectIdOrCode: string) {
    if (!subjectIdOrCode) return null;

    let subject = await this.prisma.subject.findUnique({
      where: { id: subjectIdOrCode },
    });

    if (!subject) {
      const aliasCode =
        SUBJECT_CODE_ALIASES[subjectIdOrCode.toLowerCase()] || subjectIdOrCode;
      subject = await this.prisma.subject.findUnique({
        where: { code: aliasCode },
      });
    }

    if (!subject && (this.prisma.subject as any).findFirst) {
      const aliasCode =
        SUBJECT_CODE_ALIASES[subjectIdOrCode.toLowerCase()] || subjectIdOrCode;
      subject = await (this.prisma.subject as any).findFirst({
        where: {
          OR: [{ id: subjectIdOrCode }, { code: subjectIdOrCode }, { code: aliasCode }],
        },
      });
    }

    return subject;
  }

  async getSubjects(classLevel?: string) {
    const subjects = await this.prisma.subject.findMany({
      where: classLevel ? { classLevel } : {},
      include: {
        _count: {
          select: { chapters: true },
        },
      },
      orderBy: { code: 'asc' },
    });

    return subjects.map((subject: any) => ({
      ...subject,
      chapterCount: subject._count?.chapters ?? 0,
    }));
  }

  async getChaptersBySubject(subjectId: string) {
    const subject = await this.resolveSubject(subjectId);

    if (!subject) {
      throw new NotFoundException(`Subject not found with id: ${subjectId}`);
    }

    const chapters = await this.prisma.chapter.findMany({
      where: { subjectId: subject.id },
      orderBy: { orderIndex: 'asc' },
      include: {
        topics: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    // Collect topic IDs if live lesson/question tables are available
    const allTopicIds = chapters.flatMap((c: any) =>
      Array.isArray(c.topics) ? c.topics.map((t: any) => t.id) : [],
    );

    let lessonsByTopic = new Map<string, any[]>();
    let questionsByTopic = new Map<string, any[]>();
    const hasLiveQueries =
      allTopicIds.length > 0 &&
      typeof (this.prisma as any).lesson?.findMany === 'function' &&
      typeof (this.prisma as any).question?.findMany === 'function';

    if (hasLiveQueries) {
      try {
        const [publishedLessons, publishedQuestions] = await Promise.all([
          (this.prisma as any).lesson.findMany({
            where: { topicId: { in: allTopicIds }, status: 'PUBLISHED' },
          }),
          (this.prisma as any).question.findMany({
            where: { topicId: { in: allTopicIds }, status: 'PUBLISHED' },
          }),
        ]);

        if (Array.isArray(publishedLessons)) {
          for (const l of publishedLessons) {
            const list = lessonsByTopic.get(l.topicId) || [];
            list.push(l);
            lessonsByTopic.set(l.topicId, list);
          }
        }
        if (Array.isArray(publishedQuestions)) {
          for (const q of publishedQuestions) {
            const list = questionsByTopic.get(q.topicId) || [];
            list.push(q);
            questionsByTopic.set(q.topicId, list);
          }
        }
      } catch {
        // Ignore enrichment query error in mock environments
      }
    }

    return chapters.map((chapter: any) => {
      if (!Array.isArray(chapter.topics)) return chapter;

      const topics = chapter.topics.map((topic: any) => {
        const inlineLessons = Array.isArray(topic.lessons)
          ? topic.lessons
          : lessonsByTopic.get(topic.id);
        const inlineQuestions = Array.isArray(topic.questions)
          ? topic.questions
          : questionsByTopic.get(topic.id);

        if (!inlineLessons && !inlineQuestions) {
          return topic;
        }

        const lessonsArr = inlineLessons || [];
        const questionsArr = inlineQuestions || [];
        const { lessons: _l, questions: _q, ...restTopic } = topic;

        return {
          ...restTopic,
          lessonCount: lessonsArr.length,
          hasInteractiveLab: lessonsArr.some(
            (l: any) => typeof l.interactiveWidgetUrl === 'string' && l.interactiveWidgetUrl.trim().length > 0,
          ),
          questionCount: questionsArr.filter((q: any) => !q.type || q.type === 'MCQ').length,
          cqCount: questionsArr.filter((q: any) => q.type === 'CQ_CREATIVE').length,
        };
      });

      return {
        ...chapter,
        topics,
      };
    });
  }
}
