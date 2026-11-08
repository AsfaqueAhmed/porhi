import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { PrismaService } from '../../database/prisma.service';
import { ExplanationObject } from '@pori/shared';
import { ContentStatus } from '@prisma/client';

describe('PracticeService', () => {
  let practiceService: PracticeService;
  let prisma: {
    chapter: {
      findUnique: ReturnType<typeof vi.fn>;
    };
    question: {
      findMany: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
    };
    revisionMistake: {
      upsert: ReturnType<typeof vi.fn>;
    };
    eventLog: {
      create: ReturnType<typeof vi.fn>;
    };
  };

  const sampleExplanation: ExplanationObject = {
    directAnswer: 'নিউটনের দ্বিতীয় সূত্র অনুযায়ী $F = ma$।',
    coreConcept: 'বস্তুর ভরবেগের পরিবর্তনের হার তার ওপর প্রযুক্ত বলের সমানুপাতিক।',
    stepDerivation: 'আমরা জানি, $F = ma \\implies a = \\frac{F}{m} = \\frac{10}{2} = 5\\text{ m/s}^2$।',
    distractorAnalysis: {
      opt_b: 'এখানে ভুলবশত ভর ও বল গুণ করা হয়েছে ($20\\text{ m/s}^2$)',
      opt_c: 'এখানে বর্গমূল করা হয়েছে',
      opt_d: 'কোনো একক বিবেচনা করা হয়নি',
    },
    textbookCitation: {
      bookTitle: 'পদার্থবিজ্ঞান নবম-দশম শ্রেণি',
      chapterName: 'বল',
      pageNumber: 74,
    },
    proTipShortcut: 'ত্বরণ চাইলে সরাসরি বলকে ভর দিয়ে ভাগ করো।',
  };

  const sampleQuestion = {
    id: 'q_1',
    topicId: 'top_1',
    type: 'MCQ',
    stem: '$2\\text{ kg}$ ভরের বস্তুর ওপর $10\\text{ N}$ বল প্রয়োগ করলে ত্বরণ কত হবে?',
    options: [
      { id: 'opt_a', text: '$5\\text{ m/s}^2$', isCorrect: true },
      { id: 'opt_b', text: '$20\\text{ m/s}^2$', isCorrect: false },
      { id: 'opt_c', text: '$2.5\\text{ m/s}^2$', isCorrect: false },
      { id: 'opt_d', text: '$15\\text{ m/s}^2$', isCorrect: false },
    ],
    explanation: sampleExplanation,
    cqRubric: null,
    difficulty: 'MEDIUM',
    boardSource: 'Dhaka Board 2024',
    isVerified: true,
    version: 1,
  };

  beforeEach(() => {
    prisma = {
      chapter: {
        findUnique: vi.fn(),
      },
      question: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
      },
      revisionMistake: {
        upsert: vi.fn().mockResolvedValue({ id: 'm_1' }),
      },
      eventLog: {
        create: vi.fn().mockResolvedValue({ id: 'ev_1' }),
      },
    };

    practiceService = new PracticeService(prisma as unknown as PrismaService);
  });

  describe('getChapterQuestions', () => {
    it('should return chapter MCQs with options randomized and isCorrect stripped out, explanation omitted', async () => {
      prisma.chapter.findUnique.mockResolvedValue({ id: 'chap_1', titleBangla: 'বল' });
      prisma.question.findMany.mockResolvedValue([sampleQuestion]);

      const result = await practiceService.getChapterQuestions('chap_1');

      expect(prisma.chapter.findUnique).toHaveBeenCalledWith({
        where: { id: 'chap_1' },
      });

      expect(prisma.question.findMany).toHaveBeenCalledWith({
        where: {
          topic: { chapterId: 'chap_1' },
          type: 'MCQ',
          status: ContentStatus.PUBLISHED,
        },
      });

      expect(result).toHaveLength(1);
      const returnedQ = result[0];

      // Question metadata
      expect(returnedQ.id).toBe('q_1');
      expect(returnedQ.stem).toBe(sampleQuestion.stem);
      expect(returnedQ.difficulty).toBe('MEDIUM');

      // Explanation MUST NOT be returned in questions endpoint
      expect((returnedQ as any).explanation).toBeUndefined();

      // Options must have isCorrect stripped out
      expect(returnedQ.options).toHaveLength(4);
      for (const opt of returnedQ.options) {
        expect(opt).toHaveProperty('id');
        expect(opt).toHaveProperty('text');
        expect(opt).not.toHaveProperty('isCorrect');
      }

      // Check option IDs exist
      const optionIds = returnedQ.options.map((o: any) => o.id);
      expect(optionIds).toContain('opt_a');
      expect(optionIds).toContain('opt_b');
      expect(optionIds).toContain('opt_c');
      expect(optionIds).toContain('opt_d');
    });

    it('should throw NotFoundException if chapter does not exist', async () => {
      prisma.chapter.findUnique.mockResolvedValue(null);

      await expect(practiceService.getChapterQuestions('chap_non_existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('submitPractice', () => {
    it('should return isCorrect=true, correctOptionId, and explanation on correct submission', async () => {
      prisma.question.findUnique.mockResolvedValue(sampleQuestion);

      const result = await practiceService.submitPractice(
        { questionId: 'q_1', selectedOptionId: 'opt_a' },
        'usr_101',
      );

      expect(result.isCorrect).toBe(true);
      expect(result.correctOptionId).toBe('opt_a');
      expect(result.explanation).toEqual(sampleExplanation);

      // Should NOT record mistake for correct answer
      expect(prisma.revisionMistake.upsert).not.toHaveBeenCalled();

      // Should log PRACTICE_ATTEMPT event
      expect(prisma.eventLog.create).toHaveBeenCalledWith({
        data: {
          userId: 'usr_101',
          eventType: 'PRACTICE_ATTEMPT',
          payload: {
            questionId: 'q_1',
            selectedOptionId: 'opt_a',
            isCorrect: true,
          },
        },
      });
    });

    it('should return isCorrect=false, correctOptionId, explanation and upsert RevisionMistake on incorrect submission', async () => {
      prisma.question.findUnique.mockResolvedValue(sampleQuestion);

      const result = await practiceService.submitPractice(
        { questionId: 'q_1', selectedOptionId: 'opt_b' },
        'usr_101',
      );

      expect(result.isCorrect).toBe(false);
      expect(result.correctOptionId).toBe('opt_a');
      expect(result.explanation).toEqual(sampleExplanation);

      // Must upsert into RevisionMistake
      expect(prisma.revisionMistake.upsert).toHaveBeenCalledWith({
        where: {
          userId_questionId: {
            userId: 'usr_101',
            questionId: 'q_1',
          },
        },
        create: {
          userId: 'usr_101',
          questionId: 'q_1',
          resolved: false,
          attemptCount: 1,
        },
        update: {
          resolved: false,
          attemptCount: { increment: 1 },
        },
      });

      // Must log PRACTICE_ATTEMPT event
      expect(prisma.eventLog.create).toHaveBeenCalledWith({
        data: {
          userId: 'usr_101',
          eventType: 'PRACTICE_ATTEMPT',
          payload: {
            questionId: 'q_1',
            selectedOptionId: 'opt_b',
            isCorrect: false,
          },
        },
      });
    });

    it('should throw NotFoundException if question does not exist', async () => {
      prisma.question.findUnique.mockResolvedValue(null);

      await expect(
        practiceService.submitPractice({ questionId: 'missing_q', selectedOptionId: 'opt_a' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if questionId is missing or empty', async () => {
      await expect(
        practiceService.submitPractice({ questionId: '', selectedOptionId: 'opt_a' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if selectedOptionId is missing or empty', async () => {
      await expect(
        practiceService.submitPractice({ questionId: 'q_1', selectedOptionId: '' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if selectedOptionId does not belong to the question', async () => {
      prisma.question.findUnique.mockResolvedValue(sampleQuestion);

      await expect(
        practiceService.submitPractice({ questionId: 'q_1', selectedOptionId: 'invalid_opt' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should not fail submission if eventLog.create fails', async () => {
      prisma.question.findUnique.mockResolvedValue(sampleQuestion);
      prisma.eventLog.create.mockRejectedValue(new Error('EventLog connection error'));

      const result = await practiceService.submitPractice(
        { questionId: 'q_1', selectedOptionId: 'opt_a' },
        'usr_101',
      );

      expect(result.isCorrect).toBe(true);
      expect(result.correctOptionId).toBe('opt_a');
      expect(result.explanation).toEqual(sampleExplanation);
    });

    it('should validate answer without error when user is unauthenticated', async () => {
      prisma.question.findUnique.mockResolvedValue(sampleQuestion);

      const result = await practiceService.submitPractice({
        questionId: 'q_1',
        selectedOptionId: 'opt_b',
      });

      expect(result.isCorrect).toBe(false);
      expect(result.correctOptionId).toBe('opt_a');
      expect(result.explanation).toEqual(sampleExplanation);

      // Should not call db upsert/create when no user
      expect(prisma.revisionMistake.upsert).not.toHaveBeenCalled();
      expect(prisma.eventLog.create).not.toHaveBeenCalled();
    });
  });
});
