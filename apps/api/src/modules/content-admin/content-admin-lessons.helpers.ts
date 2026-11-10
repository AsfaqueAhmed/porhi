import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ContentStatus, Prisma, Role } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { CreateLessonAdminDto } from './dto/create-lesson-admin.dto';

export interface NormalizedImportantTerm {
  termBangla: string;
  termEnglish: string;
  definition: string;
}

export function normalizeImportantTerms(
  raw: unknown,
  options: { requireAtLeastOne?: boolean } = {},
): NormalizedImportantTerm[] {
  if (!Array.isArray(raw)) {
    throw new BadRequestException('importantTerms must be an array of objects');
  }
  if (options.requireAtLeastOne && raw.length === 0) {
    throw new BadRequestException('importantTerms must contain at least one term');
  }

  return raw.map((term) => {
    if (!term || typeof term !== 'object' || Array.isArray(term)) {
      throw new BadRequestException(
        'Each importantTerm must be an object containing at least termBangla',
      );
    }
    const record = term as Record<string, unknown>;
    if (typeof record.termBangla !== 'string' || !record.termBangla.trim()) {
      throw new BadRequestException(
        'Each importantTerm must be an object containing at least termBangla',
      );
    }
    if (record.termEnglish !== undefined && typeof record.termEnglish !== 'string') {
      throw new BadRequestException('importantTerm.termEnglish must be a string');
    }
    if (record.definition !== undefined && typeof record.definition !== 'string') {
      throw new BadRequestException('importantTerm.definition must be a string');
    }
    return {
      termBangla: record.termBangla.trim(),
      termEnglish: typeof record.termEnglish === 'string' ? record.termEnglish.trim() : '',
      definition: typeof record.definition === 'string' ? record.definition.trim() : '',
    };
  });
}

export function normalizeWorkedExample(
  raw: unknown,
): { problem: string; stepByStepSolution: string } | null {
  if (raw === undefined || raw === null) {
    return null;
  }
  if (typeof raw !== 'object' || Array.isArray(raw)) {
    throw new BadRequestException('workedExample must be an object or null');
  }
  const record = raw as Record<string, unknown>;
  if (record.problem !== undefined && typeof record.problem !== 'string') {
    throw new BadRequestException('workedExample.problem must be a string');
  }
  if (
    record.stepByStepSolution !== undefined &&
    typeof record.stepByStepSolution !== 'string'
  ) {
    throw new BadRequestException('workedExample.stepByStepSolution must be a string');
  }
  const problem = typeof record.problem === 'string' ? record.problem.trim() : '';
  const stepByStepSolution =
    typeof record.stepByStepSolution === 'string' ? record.stepByStepSolution.trim() : '';
  if (!problem && !stepByStepSolution) {
    return null;
  }
  return { problem, stepByStepSolution };
}

export function normalizeMemoryAid(raw: unknown): string | null {
  if (raw === undefined || raw === null) {
    return null;
  }
  if (typeof raw !== 'string') {
    throw new BadRequestException('memoryAid must be a string or null');
  }
  const trimmed = raw.trim();
  return trimmed ? trimmed : null;
}

export function normalizeInteractiveWidgetUrl(raw: unknown): string | null {
  if (raw === undefined || raw === null) {
    return null;
  }
  if (typeof raw !== 'string') {
    throw new BadRequestException('interactiveWidgetUrl must be a string or null');
  }
  const trimmed = raw.trim();
  return trimmed ? trimmed : null;
}

export function validateRequiredLessonStrings(payload: {
  topicId?: unknown;
  titleBangla?: unknown;
  learningGoal?: unknown;
  explanation?: unknown;
}) {
  if (
    !payload.topicId ||
    typeof payload.topicId !== 'string' ||
    !payload.topicId.trim()
  ) {
    throw new BadRequestException('topicId is required');
  }
  if (
    !payload.titleBangla ||
    typeof payload.titleBangla !== 'string' ||
    !payload.titleBangla.trim()
  ) {
    throw new BadRequestException('titleBangla is required');
  }
  if (
    !payload.learningGoal ||
    typeof payload.learningGoal !== 'string' ||
    !payload.learningGoal.trim()
  ) {
    throw new BadRequestException('learningGoal is required');
  }
  if (
    !payload.explanation ||
    typeof payload.explanation !== 'string' ||
    !payload.explanation.trim()
  ) {
    throw new BadRequestException('explanation is required');
  }

  return {
    topicId: payload.topicId.trim(),
    titleBangla: payload.titleBangla.trim(),
    learningGoal: payload.learningGoal.trim(),
    explanation: payload.explanation.trim(),
  };
}

export function resolveLessonEditStatus(
  currentStatus: ContentStatus,
  actorRole: Role,
  preservePublished?: boolean,
  submitForReview?: boolean,
): ContentStatus {
  if (currentStatus === ContentStatus.PUBLISHED) {
    return preservePublished === true && actorRole === Role.ADMIN
      ? ContentStatus.PUBLISHED
      : ContentStatus.REVIEW;
  }
  if (
    currentStatus === ContentStatus.DRAFT ||
    currentStatus === ContentStatus.REVIEW ||
    currentStatus === ContentStatus.CORRECTION
  ) {
    return submitForReview === true ? ContentStatus.REVIEW : currentStatus;
  }
  return currentStatus;
}

export async function createLessonRecord(
  prisma: PrismaService,
  dto: CreateLessonAdminDto,
) {
  const strings = validateRequiredLessonStrings({
    topicId: dto?.topicId,
    titleBangla: dto?.titleBangla,
    learningGoal: dto?.learningGoal,
    explanation: dto?.explanation,
  });
  const importantTerms = normalizeImportantTerms(dto?.importantTerms, {
    requireAtLeastOne: true,
  });
  const workedExample = normalizeWorkedExample(dto?.workedExample);
  const memoryAid = normalizeMemoryAid(dto?.memoryAid);
  const interactiveWidgetUrl = normalizeInteractiveWidgetUrl(dto?.interactiveWidgetUrl);

  const topic = await prisma.topic.findUnique({
    where: { id: strings.topicId },
  });
  if (!topic) {
    throw new NotFoundException(`Topic with id ${strings.topicId} not found`);
  }

  return prisma.lesson.create({
    data: {
      topicId: strings.topicId,
      titleBangla: strings.titleBangla,
      learningGoal: strings.learningGoal,
      explanation: strings.explanation,
      interactiveWidgetUrl,
      importantTerms: importantTerms as unknown as Prisma.InputJsonValue,
      workedExample:
        workedExample !== null
          ? (workedExample as unknown as Prisma.InputJsonValue)
          : undefined,
      memoryAid,
      status: ContentStatus.DRAFT,
      version: 1,
    },
  });
}
