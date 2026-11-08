import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CurriculumService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

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

    return subjects.map((subject) => ({
      ...subject,
      chapterCount: subject._count?.chapters ?? 0,
    }));
  }

  async getChaptersBySubject(subjectId: string) {
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new NotFoundException(`Subject not found with id: ${subjectId}`);
    }

    return this.prisma.chapter.findMany({
      where: { subjectId },
      orderBy: { orderIndex: 'asc' },
      include: {
        topics: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });
  }
}
