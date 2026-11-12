import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';

@Controller('curriculum')
export class CurriculumController {
  constructor(@Inject(CurriculumService) private readonly curriculumService: CurriculumService) {}

  @Get('subjects')
  async getSubjects(
    @Query('classLevel') classLevel?: string,
    @Query('program') program?: string,
  ) {
    return this.curriculumService.getSubjects(classLevel, program);
  }

  @Get('subjects/:subjectId/chapters')
  async getChaptersBySubject(@Param('subjectId') subjectId: string) {
    return this.curriculumService.getChaptersBySubject(subjectId);
  }

  @Get('chapter/:chapterId/offline-pack')
  async getOfflineChapterPack(@Param('chapterId') chapterId: string) {
    return this.curriculumService.getOfflineChapterPack(chapterId);
  }
}
