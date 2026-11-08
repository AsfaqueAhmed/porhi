import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';
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
      },
      contentReview: {
        create: vi.fn(),
        findMany: vi.fn(),
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
    it('should return pending draft and correction lessons and questions', async () => {
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
        where: { status: { in: [ContentStatus.DRAFT, ContentStatus.CORRECTION] } },
        orderBy: { updatedAt: 'desc' },
      });
      expect(mockPrisma.question.findMany).toHaveBeenCalledWith({
        where: { status: { in: [ContentStatus.DRAFT, ContentStatus.CORRECTION] } },
        orderBy: { updatedAt: 'desc' },
      });
      expect(result).toEqual({
        lessons: pendingLessons,
        questions: pendingQuestions,
      });
    });
  });

  describe('getContentReviews', () => {
    it('should return chronological audit history for content item', async () => {
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
        },
      ];

      mockPrisma.contentReview.findMany.mockResolvedValue(reviewAuditHistory);

      const result = await service.getContentReviews('les_1');

      expect(mockPrisma.contentReview.findMany).toHaveBeenCalledWith({
        where: { contentId: 'les_1' },
        orderBy: { createdAt: 'asc' },
      });
      expect(result).toEqual(reviewAuditHistory);
    });
  });
});
