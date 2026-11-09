import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ContentAdminService } from './content-admin.service';
import { PrismaService } from '../../database/prisma.service';
import { ContentStatus } from '@prisma/client';

describe('ContentAdminService', () => {
  let service: ContentAdminService;
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = {
      $transaction: vi.fn(async (cb) => cb(mockPrisma)),
      topic: {
        findUnique: vi.fn(),
        create: vi.fn(),
        aggregate: vi.fn(),
      },
      lesson: {
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        findMany: vi.fn(),
      },
      question: {
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        findMany: vi.fn(),
        count: vi.fn(),
        groupBy: vi.fn(),
      },
      contentReview: {
        create: vi.fn(),
        findMany: vi.fn(),
      },
      subject: {
        findUnique: vi.fn(),
        update: vi.fn(),
        create: vi.fn(),
      },
      chapter: {
        findUnique: vi.fn(),
        create: vi.fn(),
        aggregate: vi.fn(),
      },
    };

    service = new ContentAdminService(mockPrisma as unknown as PrismaService);
  });

  describe('createLesson', () => {
    const createLessonDto = {
      topicId: 'topic_force_1',
      titleBangla: 'নিউটনের গতির সূত্রাবলী',
      learningGoal: 'নিউটনের তিনটি সূত্র ব্যাখ্যা করতে পারা',
      explanation: 'নিউটনের ১ম সূত্র জড়তা সম্পর্কে ধারণা দেয়। $F = ma$',
      importantTerms: [
        { termBangla: 'জড়তা', termEnglish: 'Inertia', definition: 'গতির পরিবর্তন রোধ করার প্রবণতা' },
      ],
      workedExample: {
        problem: '$2\\text{ kg}$ ভরের বস্তুর ওপর $10\\text{ N}$ বল প্রযুক্ত হলে ত্বরণ কত?',
        stepByStepSolution: '$a = F/m = 10/2 = 5\\text{ m/s}^2$',
      },
      memoryAid: '১ম সূত্র জড়তা, ২য় সূত্র বল, ৩য় সূত্র প্রতিক্রিয়া',
    };

    it('should create lesson in DRAFT status with version 1 when topic exists', async () => {
      mockPrisma.topic.findUnique.mockResolvedValue({ id: 'topic_force_1' });
      mockPrisma.lesson.create.mockResolvedValue({
        id: 'lesson_1',
        ...createLessonDto,
        status: ContentStatus.DRAFT,
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.createLesson(createLessonDto);

      expect(mockPrisma.topic.findUnique).toHaveBeenCalledWith({
        where: { id: 'topic_force_1' },
      });
      expect(mockPrisma.lesson.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          topicId: 'topic_force_1',
          titleBangla: createLessonDto.titleBangla,
          status: ContentStatus.DRAFT,
          version: 1,
        }),
      });
      expect(result.status).toBe(ContentStatus.DRAFT);
      expect(result.version).toBe(1);
    });

    it('should throw NotFoundException if topic does not exist', async () => {
      mockPrisma.topic.findUnique.mockResolvedValue(null);

      await expect(service.createLesson(createLessonDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrisma.lesson.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if importantTerms is not an array or missing termBangla', async () => {
      await expect(
        service.createLesson({
          ...createLessonDto,
          importantTerms: 'not-an-array' as any,
        }),
      ).rejects.toThrow(BadRequestException);

      await expect(
        service.createLesson({
          ...createLessonDto,
          importantTerms: [{ termEnglish: 'Inertia' } as any],
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('createQuestion', () => {
    const createQuestionDto = {
      topicId: 'topic_force_1',
      type: 'MCQ',
      stem: '$5\\text{ kg}$ ভরের বস্তুর ওপর $20\\text{ N}$ বল প্রযুক্ত হলে ত্বরণ কত?',
      options: [
        { id: 'opt_1', text: '$4\\text{ m/s}^2$', isCorrect: true },
        { id: 'opt_2', text: '$100\\text{ m/s}^2$', isCorrect: false },
      ],
      explanation: {
        directAnswer: 'সঠিক উত্তর $4\\text{ m/s}^2$',
        coreConcept: '$F = ma$',
      },
      difficulty: 'MEDIUM',
      boardSource: 'Dhaka Board 2024',
    };

    it('should create question in DRAFT status with version 1 when topic exists', async () => {
      mockPrisma.topic.findUnique.mockResolvedValue({ id: 'topic_force_1' });
      mockPrisma.question.create.mockResolvedValue({
        id: 'question_1',
        ...createQuestionDto,
        isVerified: false,
        status: ContentStatus.DRAFT,
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.createQuestion(createQuestionDto);

      expect(mockPrisma.topic.findUnique).toHaveBeenCalledWith({
        where: { id: 'topic_force_1' },
      });
      expect(mockPrisma.question.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          topicId: 'topic_force_1',
          stem: createQuestionDto.stem,
          status: ContentStatus.DRAFT,
          version: 1,
          isVerified: false,
        }),
      });
      expect(result.status).toBe(ContentStatus.DRAFT);
      expect(result.version).toBe(1);
    });

    it('should throw NotFoundException if topic does not exist', async () => {
      mockPrisma.topic.findUnique.mockResolvedValue(null);

      await expect(service.createQuestion(createQuestionDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrisma.question.create).not.toHaveBeenCalled();
    });

    it('should validate MCQ options and throw BadRequestException if invalid', async () => {
      // Less than 2 options
      await expect(
        service.createQuestion({
          ...createQuestionDto,
          options: [{ id: 'opt_1', text: 'ক', isCorrect: true }],
        }),
      ).rejects.toThrow(BadRequestException);

      // No correct option
      await expect(
        service.createQuestion({
          ...createQuestionDto,
          options: [
            { id: 'opt_1', text: 'ক', isCorrect: false },
            { id: 'opt_2', text: 'খ', isCorrect: false },
          ],
        }),
      ).rejects.toThrow(BadRequestException);

      // Multiple correct options
      await expect(
        service.createQuestion({
          ...createQuestionDto,
          options: [
            { id: 'opt_1', text: 'ক', isCorrect: true },
            { id: 'opt_2', text: 'খ', isCorrect: true },
          ],
        }),
      ).rejects.toThrow(BadRequestException);

      // Option missing isCorrect boolean
      await expect(
        service.createQuestion({
          ...createQuestionDto,
          options: [
            { id: 'opt_1', text: 'ক' } as any,
            { id: 'opt_2', text: 'খ', isCorrect: true },
          ],
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should validate explanation structure and throw BadRequestException if missing directAnswer or coreConcept', async () => {
      await expect(
        service.createQuestion({
          ...createQuestionDto,
          explanation: { directAnswer: 'উত্তর আছে' } as any,
        }),
      ).rejects.toThrow(BadRequestException);

      await expect(
        service.createQuestion({
          ...createQuestionDto,
          explanation: { coreConcept: 'কনসেপ্ট আছে' } as any,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('reviewContent', () => {
    it('should approve lesson, transition to PUBLISHED, increment version, and record review audit', async () => {
      mockPrisma.lesson.findUnique.mockResolvedValue({
        id: 'lesson_1',
        status: ContentStatus.DRAFT,
        version: 1,
      });
      mockPrisma.lesson.update.mockResolvedValue({
        id: 'lesson_1',
        status: ContentStatus.PUBLISHED,
        version: 2,
      });
      mockPrisma.contentReview.create.mockResolvedValue({
        id: 'rev_1',
        reviewerId: 'reviewer_1',
        contentType: 'LESSON',
        contentId: 'lesson_1',
        action: 'APPROVE',
        comment: 'Accurate and aligned with NCTB 2026',
        version: 2,
        createdAt: new Date(),
      });

      const result = await service.reviewContent('reviewer_1', {
        contentType: 'LESSON',
        contentId: 'lesson_1',
        action: 'APPROVE',
        comment: 'Accurate and aligned with NCTB 2026',
      });

      expect(mockPrisma.lesson.update).toHaveBeenCalledWith({
        where: { id: 'lesson_1' },
        data: {
          status: ContentStatus.PUBLISHED,
          version: { increment: 1 },
        },
      });
      expect(mockPrisma.contentReview.create).toHaveBeenCalledWith({
        data: {
          reviewerId: 'reviewer_1',
          contentType: 'LESSON',
          contentId: 'lesson_1',
          action: 'APPROVE',
          comment: 'Accurate and aligned with NCTB 2026',
          version: 2,
        },
      });
      expect(result.status).toBe(ContentStatus.PUBLISHED);
      expect(result.version).toBe(2);
    });

    it('should approve question, set isVerified to true, and increment version', async () => {
      mockPrisma.question.findUnique.mockResolvedValue({
        id: 'q_1',
        status: ContentStatus.DRAFT,
        version: 1,
      });
      mockPrisma.question.update.mockResolvedValue({
        id: 'q_1',
        status: ContentStatus.PUBLISHED,
        version: 2,
        isVerified: true,
      });
      mockPrisma.contentReview.create.mockResolvedValue({
        id: 'rev_2',
        reviewerId: 'reviewer_1',
        contentType: 'QUESTION',
        contentId: 'q_1',
        action: 'APPROVE',
        comment: 'Verified LaTeX formula',
        version: 2,
        createdAt: new Date(),
      });

      const result = await service.reviewContent('reviewer_1', {
        contentType: 'QUESTION',
        contentId: 'q_1',
        action: 'APPROVE',
        comment: 'Verified LaTeX formula',
      });

      expect(mockPrisma.question.update).toHaveBeenCalledWith({
        where: { id: 'q_1' },
        data: {
          status: ContentStatus.PUBLISHED,
          version: { increment: 1 },
          isVerified: true,
        },
      });
      expect(result.status).toBe(ContentStatus.PUBLISHED);
      expect(result.version).toBe(2);
    });

    it('should request changes on question, set status to CORRECTION, and keep version', async () => {
      mockPrisma.question.findUnique.mockResolvedValue({
        id: 'q_1',
        status: ContentStatus.DRAFT,
        version: 1,
      });
      mockPrisma.question.update.mockResolvedValue({
        id: 'q_1',
        status: ContentStatus.CORRECTION,
        version: 1,
        isVerified: false,
      });
      mockPrisma.contentReview.create.mockResolvedValue({
        id: 'rev_3',
        reviewerId: 'reviewer_1',
        contentType: 'QUESTION',
        contentId: 'q_1',
        action: 'REQUEST_CHANGES',
        comment: 'Fix typo in distractor analysis',
        version: 1,
        createdAt: new Date(),
      });

      const result = await service.reviewContent('reviewer_1', {
        contentType: 'QUESTION',
        contentId: 'q_1',
        action: 'REQUEST_CHANGES',
        comment: 'Fix typo in distractor analysis',
      });

      expect(mockPrisma.question.update).toHaveBeenCalledWith({
        where: { id: 'q_1' },
        data: {
          status: ContentStatus.CORRECTION,
          isVerified: false,
        },
      });
      expect(result.status).toBe(ContentStatus.CORRECTION);
      expect(result.version).toBe(1);
    });

    it('should reject content, set status to CORRECTION, and record audit', async () => {
      mockPrisma.lesson.findUnique.mockResolvedValue({
        id: 'lesson_1',
        status: ContentStatus.DRAFT,
        version: 1,
      });
      mockPrisma.lesson.update.mockResolvedValue({
        id: 'lesson_1',
        status: ContentStatus.CORRECTION,
        version: 1,
      });
      mockPrisma.contentReview.create.mockResolvedValue({
        id: 'rev_4',
        reviewerId: 'reviewer_1',
        contentType: 'LESSON',
        contentId: 'lesson_1',
        action: 'REJECT',
        comment: 'Out of syllabus',
        version: 1,
        createdAt: new Date(),
      });

      const result = await service.reviewContent(
        'reviewer_1',
        'LESSON',
        'lesson_1',
        'REJECT',
        'Out of syllabus',
      );

      expect(mockPrisma.lesson.update).toHaveBeenCalledWith({
        where: { id: 'lesson_1' },
        data: {
          status: ContentStatus.CORRECTION,
        },
      });
      expect(result.status).toBe(ContentStatus.CORRECTION);
    });

    it('should throw BadRequestException if rejecting or requesting changes without a comment', async () => {
      await expect(
        service.reviewContent('reviewer_1', {
          contentType: 'LESSON',
          contentId: 'lesson_1',
          action: 'REQUEST_CHANGES',
          // missing comment
        }),
      ).rejects.toThrow(BadRequestException);

      await expect(
        service.reviewContent('reviewer_1', {
          contentType: 'LESSON',
          contentId: 'lesson_1',
          action: 'REJECT',
          comment: '   ',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if content item does not exist', async () => {
      mockPrisma.lesson.findUnique.mockResolvedValue(null);

      await expect(
        service.reviewContent('reviewer_1', {
          contentType: 'LESSON',
          contentId: 'non_existent_lesson',
          action: 'APPROVE',
        }),
      ).rejects.toThrow(NotFoundException);

      expect(mockPrisma.lesson.update).not.toHaveBeenCalled();
      expect(mockPrisma.contentReview.create).not.toHaveBeenCalled();
    });
  });

  describe('getPendingContent', () => {
    it('should return pending draft, review, and correction lessons and questions', async () => {
      const pendingLessons = [
        { id: 'l_draft', status: ContentStatus.DRAFT, titleBangla: 'বল' },
        { id: 'l_corr', status: ContentStatus.CORRECTION, titleBangla: 'গতি' },
      ];
      const pendingQuestions = [
        { id: 'q_draft', status: ContentStatus.DRAFT, stem: 'প্রশ্ন ১' },
      ];

      mockPrisma.lesson.findMany.mockResolvedValue(pendingLessons);
      mockPrisma.question.findMany.mockResolvedValue(pendingQuestions);

      const result = await service.getPendingContent();

      expect(mockPrisma.lesson.findMany).toHaveBeenCalledWith({
        where: {
          status: {
            in: [ContentStatus.DRAFT, ContentStatus.REVIEW, ContentStatus.CORRECTION],
          },
        },
        orderBy: { updatedAt: 'desc' },
      });
      expect(mockPrisma.question.findMany).toHaveBeenCalledWith({
        where: {
          status: {
            in: [ContentStatus.DRAFT, ContentStatus.REVIEW, ContentStatus.CORRECTION],
          },
        },
        orderBy: { updatedAt: 'desc' },
      });
      expect(result).toEqual({
        lessons: pendingLessons,
        questions: pendingQuestions,
      });
    });
  });

  describe('getContentReviews', () => {
    it('should return chronological audit history with reviewer details', async () => {
      const reviewAuditHistory = [
        {
          id: 'rev_1',
          reviewerId: 'rev_usr_1',
          contentType: 'LESSON',
          contentId: 'les_1',
          action: 'REQUEST_CHANGES',
          comment: 'Clarify 2nd formula',
          version: 1,
          createdAt: new Date('2026-11-01T10:00:00Z'),
          reviewer: { id: 'rev_usr_1', fullName: 'Reviewer One', role: 'REVIEWER' },
        },
        {
          id: 'rev_2',
          reviewerId: 'rev_usr_2',
          contentType: 'LESSON',
          contentId: 'les_1',
          action: 'APPROVE',
          comment: 'Looks great now',
          version: 2,
          createdAt: new Date('2026-11-02T12:00:00Z'),
          reviewer: { id: 'rev_usr_2', fullName: 'Reviewer Two', role: 'REVIEWER' },
        },
      ];

      mockPrisma.contentReview.findMany.mockResolvedValue(reviewAuditHistory);

      const result = await service.getContentReviews('les_1');

      expect(mockPrisma.contentReview.findMany).toHaveBeenCalledWith({
        where: { contentId: 'les_1' },
        include: {
          reviewer: {
            select: {
              id: true,
              fullName: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: 'asc' },
      });
      expect(result).toEqual(reviewAuditHistory);
    });
  });

  describe('createChapter', () => {
    it('should create a chapter with calculated orderIndex when subject exists', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue({ id: 'sub_1', nameBangla: 'পদার্থবিজ্ঞান' });
      mockPrisma.chapter.aggregate.mockResolvedValue({ _max: { orderIndex: 2 } });
      mockPrisma.chapter.create.mockResolvedValue({
        id: 'chap_new',
        subjectId: 'sub_1',
        orderIndex: 3,
        titleBangla: 'তৃতীয় অধ্যায়: বল',
      });

      const res = await service.createChapter({
        subjectId: 'sub_1',
        titleBangla: 'তৃতীয় অধ্যায়: বল',
      });

      expect(res.id).toBe('chap_new');
      expect(mockPrisma.chapter.create).toHaveBeenCalledWith({
        data: {
          subjectId: 'sub_1',
          orderIndex: 3,
          titleBangla: 'তৃতীয় অধ্যায়: বল',
        },
      });
    });

    it('should throw NotFoundException if subject does not exist', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue(null);

      await expect(
        service.createChapter({
          subjectId: 'sub_unknown',
          titleBangla: 'অধ্যায়',
        }),
      ).rejects.toThrow('Subject not found');
    });
  });

  describe('createTopic', () => {
    it('should create a topic when chapter exists', async () => {
      mockPrisma.chapter.findUnique.mockResolvedValue({ id: 'chap_1', titleBangla: 'গতি' });
      mockPrisma.topic.aggregate.mockResolvedValue({ _max: { orderIndex: 1 } });
      mockPrisma.topic.create.mockResolvedValue({
        id: 'top_new',
        chapterId: 'chap_1',
        orderIndex: 2,
        titleBangla: 'বেগ ও দ্রুতি',
      });

      const res = await service.createTopic({
        chapterId: 'chap_1',
        titleBangla: 'বেগ ও দ্রুতি',
      });

      expect(res.id).toBe('top_new');
      expect(mockPrisma.topic.create).toHaveBeenCalledWith({
        data: {
          chapterId: 'chap_1',
          orderIndex: 2,
          titleBangla: 'বেগ ও দ্রুতি',
        },
      });
    });
  });

  describe('toggleSubjectReady', () => {
    it('should toggle readiness flag of subject', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue({ id: 'sub_1', isReady: false });
      mockPrisma.subject.update.mockResolvedValue({ id: 'sub_1', isReady: true });

      const res = await service.toggleSubjectReady('sub_1');
      expect(res.isReady).toBe(true);
      expect(mockPrisma.subject.update).toHaveBeenCalledWith({
        where: { id: 'sub_1' },
        data: { isReady: true },
      });
    });
  });

  describe('createSubject', () => {
    it('should create a subject when code is unique', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue(null);
      mockPrisma.subject.create.mockResolvedValue({
        id: 'sub_bio',
        code: 'ssc_biology',
        nameBangla: 'জীববিজ্ঞান',
        classLevel: 'CLASS_9_10',
        syllabusYear: 2026,
        isReady: false,
      });

      const res = await service.createSubject({
        code: 'ssc_biology',
        nameBangla: 'জীববিজ্ঞান',
        classLevel: 'CLASS_9_10',
      });

      expect(res.id).toBe('sub_bio');
      expect(mockPrisma.subject.create).toHaveBeenCalledWith({
        data: {
          code: 'ssc_biology',
          nameBangla: 'জীববিজ্ঞান',
          classLevel: 'CLASS_9_10',
          syllabusYear: 2026,
          isReady: false,
        },
      });
    });

    it('should throw BadRequestException if subject code already exists', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue({ id: 'sub_exist', code: 'ssc_physics' });

      await expect(
        service.createSubject({
          code: 'ssc_physics',
          nameBangla: 'পদার্থবিজ্ঞান',
          classLevel: 'CLASS_9_10',
        }),
      ).rejects.toThrow('already exists');
    });
  });

  describe('getTopicContent', () => {
    it('should return topic with its lessons and questions', async () => {
      mockPrisma.topic.findUnique.mockResolvedValue({ id: 'top_1', titleBangla: 'গতি' });
      mockPrisma.lesson.findMany.mockResolvedValue([{ id: 'les_1', titleBangla: 'গতির সমীকরণ' }]);
      mockPrisma.question.findMany.mockResolvedValue([{ id: 'q_1', stem: 'v = u + at' }]);

      const res = await service.getTopicContent('top_1');

      expect(res.topic.id).toBe('top_1');
      expect(res.lessons.length).toBe(1);
      expect(res.questions.length).toBe(1);
    });
  });

  describe('listQuestions', () => {
    const sampleQuestion = {
      id: 'q_motion_mcq_1',
      topicId: 'top_ssc_physics_motion_eq',
      type: 'MCQ',
      stem: 'স্থির অবস্থান থেকে $4\\text{ s}$ পর বেগ কত?',
      options: [
        { id: 'opt_q1_a', text: '$4\\text{ m/s}^2$', isCorrect: true },
        { id: 'opt_q1_b', text: '$64\\text{ m/s}^2$', isCorrect: false },
      ],
      explanation: {
        directAnswer: '৪',
        coreConcept: 'a = v/t',
      },
      cqRubric: null,
      difficulty: 'MEDIUM',
      boardSource: 'Dhaka Board 2022',
      isVerified: true,
      status: ContentStatus.PUBLISHED,
      version: 1,
      createdAt: new Date('2026-11-08T00:00:00Z'),
      updatedAt: new Date('2026-11-09T00:00:00Z'),
      topic: {
        id: 'top_ssc_physics_motion_eq',
        titleBangla: 'গতির সমীকরণ ও সমাধান',
        chapter: {
          id: 'chap_2',
          titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
          subject: {
            id: 'sub_phy',
            code: 'ssc_physics',
            nameBangla: 'পদার্থবিজ্ঞান',
          },
        },
      },
    };

    it('excludes ARCHIVED questions by default and computes statusCounts + pagination', async () => {
      mockPrisma.question.findMany.mockResolvedValue([sampleQuestion]);
      mockPrisma.question.count.mockResolvedValue(25);
      mockPrisma.question.groupBy.mockResolvedValue([
        { status: ContentStatus.PUBLISHED, _count: { _all: 20 } },
        { status: ContentStatus.DRAFT, _count: { _all: 3 } },
        { status: ContentStatus.REVIEW, _count: { _all: 2 } },
        { status: ContentStatus.ARCHIVED, _count: { _all: 4 } },
      ]);

      const res = await service.listQuestions({
        subjectId: 'sub_phy',
        chapterId: 'chap_2',
        topicId: 'top_ssc_physics_motion_eq',
        type: 'MCQ',
        search: 'Dhaka',
        page: '2',
        limit: '10',
      });

      const expectedBaseWhere = {
        topicId: 'top_ssc_physics_motion_eq',
        topic: {
          chapterId: 'chap_2',
          chapter: { subjectId: 'sub_phy' },
        },
        type: 'MCQ',
        OR: [
          { stem: { contains: 'Dhaka', mode: 'insensitive' } },
          { boardSource: { contains: 'Dhaka', mode: 'insensitive' } },
        ],
      };

      expect(mockPrisma.question.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            ...expectedBaseWhere,
            status: { not: 'ARCHIVED' },
          },
          orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
          skip: 10,
          take: 10,
        }),
      );
      expect(mockPrisma.question.count).toHaveBeenCalledWith({
        where: {
          ...expectedBaseWhere,
          status: { not: 'ARCHIVED' },
        },
      });
      expect(mockPrisma.question.groupBy).toHaveBeenCalledWith({
        by: ['status'],
        where: expectedBaseWhere,
        _count: { _all: true },
      });
      expect(res).toEqual({
        items: [sampleQuestion],
        total: 25,
        page: 2,
        limit: 10,
        totalPages: 3,
        statusCounts: {
          ALL: 25,
          DRAFT: 3,
          REVIEW: 2,
          CORRECTION: 0,
          PUBLISHED: 20,
          ARCHIVED: 4,
        },
      });
    });

    it('includes archived rows when status=ARCHIVED or includeArchived=true and clamps page/limit', async () => {
      mockPrisma.question.findMany.mockResolvedValue([]);
      mockPrisma.question.count.mockResolvedValue(0);
      mockPrisma.question.groupBy.mockResolvedValue([]);

      const archivedRes = await service.listQuestions({
        status: 'ARCHIVED' as ContentStatus,
        page: '0',
        limit: '250',
      });

      expect(mockPrisma.question.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: 'ARCHIVED' },
          skip: 0,
          take: 100,
        }),
      );
      expect(archivedRes.page).toBe(1);
      expect(archivedRes.limit).toBe(100);
      expect(archivedRes.totalPages).toBe(1);

      await service.listQuestions({ includeArchived: 'true' });
      expect(mockPrisma.question.findMany).toHaveBeenLastCalledWith(
        expect.objectContaining({
          where: {},
        }),
      );
    });

    it('uses defaults for empty query, ignores whitespace-only search, and counts CORRECTION in ALL', async () => {
      mockPrisma.question.findMany.mockResolvedValue([]);
      mockPrisma.question.count.mockResolvedValue(5);
      mockPrisma.question.groupBy.mockResolvedValue([
        { status: ContentStatus.CORRECTION, _count: { _all: 3 } },
        { status: ContentStatus.DRAFT, _count: { _all: 2 } },
      ]);

      const res = await service.listQuestions({ search: '   ' });

      expect(mockPrisma.question.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: { not: ContentStatus.ARCHIVED } },
          skip: 0,
          take: 20,
        }),
      );
      expect(mockPrisma.question.groupBy).toHaveBeenCalledWith({
        by: ['status'],
        where: {},
        _count: { _all: true },
      });
      expect(res.page).toBe(1);
      expect(res.limit).toBe(20);
      expect(res.totalPages).toBe(1);
      expect(res.statusCounts).toEqual({
        ALL: 5,
        DRAFT: 2,
        REVIEW: 0,
        CORRECTION: 3,
        PUBLISHED: 0,
        ARCHIVED: 0,
      });

      const emptyObjRes = await service.listQuestions({});
      expect(emptyObjRes.page).toBe(1);
      expect(emptyObjRes.limit).toBe(20);
    });

    it('clamps extreme page numbers so skip never overflows signed 32-bit integer limits', async () => {
      mockPrisma.question.findMany.mockResolvedValue([]);
      mockPrisma.question.count.mockResolvedValue(0);
      mockPrisma.question.groupBy.mockResolvedValue([]);

      const MAX_INT32 = 2_147_483_647;
      const expectedMaxPage = Math.floor(MAX_INT32 / 20) + 1;

      const res = await service.listQuestions({
        page: '9999999999',
        limit: '20',
      });

      expect(res.page).toBe(expectedMaxPage);
      expect(mockPrisma.question.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: (expectedMaxPage - 1) * 20,
          take: 20,
        }),
      );
      const callArgs = mockPrisma.question.findMany.mock.calls[0][0];
      expect(callArgs.skip).toBeLessThanOrEqual(MAX_INT32);

      const customLimitRes = await service.listQuestions({
        page: '999999999999',
        limit: '100',
      });
      const maxPageFor100 = Math.floor(MAX_INT32 / 100) + 1;
      expect(customLimitRes.page).toBe(maxPageFor100);
      const secondCallArgs = mockPrisma.question.findMany.mock.calls[1][0];
      expect(secondCallArgs.skip).toBe((maxPageFor100 - 1) * 100);
      expect(secondCallArgs.skip).toBeLessThanOrEqual(MAX_INT32);
    });

    it('throws BadRequestException for invalid query shape, invalid enums, or non-string filter inputs', async () => {
      await expect(service.listQuestions(null as any)).rejects.toThrow(BadRequestException);
      await expect(service.listQuestions([] as any)).rejects.toThrow(BadRequestException);
      await expect(service.listQuestions({ type: 'ESSAY' as any })).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.listQuestions({ type: '' as any })).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.listQuestions({ status: 'UNKNOWN' as any })).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.listQuestions({ includeArchived: 'yes' })).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.listQuestions({ subjectId: 123 as any })).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.listQuestions({ chapterId: 456 as any })).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.listQuestions({ topicId: true as any })).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.listQuestions({ search: { text: 'Dhaka' } as any })).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.listQuestions({ page: 2 as any })).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.listQuestions({ limit: 10 as any })).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getQuestionById', () => {
    it('returns question with full subject -> chapter -> topic hierarchy', async () => {
      const fullQuestion = {
        id: 'q_1',
        topicId: 'top_1',
        stem: 'প্রশ্ন',
        topic: {
          id: 'top_1',
          titleBangla: 'টপিক',
          chapter: {
            id: 'chap_1',
            titleBangla: 'অধ্যায়',
            subject: { id: 'sub_1', code: 'ssc_physics', nameBangla: 'পদার্থবিজ্ঞান' },
          },
        },
      };
      mockPrisma.question.findUnique.mockResolvedValue(fullQuestion);

      const res = await service.getQuestionById('q_1');

      expect(mockPrisma.question.findUnique).toHaveBeenCalledWith({
        where: { id: 'q_1' },
        include: {
          topic: {
            select: {
              id: true,
              titleBangla: true,
              chapter: {
                select: {
                  id: true,
                  titleBangla: true,
                  subject: {
                    select: { id: true, code: true, nameBangla: true },
                  },
                },
              },
            },
          },
        },
      });
      expect(res).toEqual(fullQuestion);
    });

    it('throws NotFoundException when question does not exist', async () => {
      mockPrisma.question.findUnique.mockResolvedValue(null);

      await expect(service.getQuestionById('missing_q')).rejects.toThrow(NotFoundException);
    });
  });
});
