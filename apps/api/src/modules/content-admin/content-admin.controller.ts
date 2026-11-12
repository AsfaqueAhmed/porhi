import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { ContentAdminService } from './content-admin.service';
import { ContentAdminLessonsService } from './content-admin-lessons.service';
import { CreateLessonAdminDto } from './dto/create-lesson-admin.dto';
import { CreateQuestionAdminDto } from './dto/create-question-admin.dto';
import { ReviewContentDto } from './dto/review-content.dto';
import { CreateChapterAdminDto } from './dto/create-chapter-admin.dto';
import { CreateTopicAdminDto } from './dto/create-topic-admin.dto';
import { CreateSubjectAdminDto } from './dto/create-subject-admin.dto';
import { ListQuestionsQueryDto } from './dto/list-questions-query.dto';
import { UpdateQuestionAdminDto } from './dto/update-question-admin.dto';
import { ListLessonsQueryDto } from './dto/list-lessons-query.dto';
import { UpdateLessonAdminDto } from './dto/update-lesson-admin.dto';
import {
  ListContentReportsQueryDto,
  ResolveContentReportDto,
} from './dto/content-reports-admin.dto';

@Controller('admin/content')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentAdminController {
  constructor(
    @Inject(ContentAdminService)
    private readonly contentAdminService: ContentAdminService,
    @Inject(ContentAdminLessonsService)
    private readonly contentAdminLessonsService: ContentAdminLessonsService,
  ) {}

  @Post('lessons')
  @Roles(Role.EDITOR, Role.ADMIN)
  async createLesson(@Body() dto: CreateLessonAdminDto) {
    return this.contentAdminLessonsService.createLesson(dto);
  }

  @Get('lessons')
  @Roles(Role.EDITOR, Role.REVIEWER, Role.ADMIN)
  async listLessons(@Query() query: ListLessonsQueryDto) {
    return this.contentAdminLessonsService.listLessons(query);
  }

  @Get('lessons/:id')
  @Roles(Role.EDITOR, Role.REVIEWER, Role.ADMIN)
  async getLessonById(@Param('id') id: string) {
    return this.contentAdminLessonsService.getLessonById(id);
  }

  @Patch('lessons/:id')
  @Roles(Role.EDITOR, Role.ADMIN)
  async updateLesson(
    @Param('id') id: string,
    @Body() dto: UpdateLessonAdminDto,
    @Req() req: { user: { id: string; role: Role } },
  ) {
    return this.contentAdminLessonsService.updateLesson(id, dto, req.user.role);
  }

  @Post('lessons/:id/archive')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.EDITOR, Role.ADMIN)
  async archiveLesson(
    @Param('id') id: string,
    @Req() req: { user: { id: string; role: Role } },
  ) {
    return this.contentAdminLessonsService.archiveLesson(id, req.user.role);
  }

  @Post('questions')
  @Roles(Role.EDITOR, Role.ADMIN)
  async createQuestion(@Body() dto: CreateQuestionAdminDto) {
    return this.contentAdminService.createQuestion(dto);
  }

  @Get('questions')
  @Roles(Role.EDITOR, Role.REVIEWER, Role.ADMIN)
  async listQuestions(@Query() query: ListQuestionsQueryDto) {
    return this.contentAdminService.listQuestions(query);
  }

  @Get('questions/:id')
  @Roles(Role.EDITOR, Role.REVIEWER, Role.ADMIN)
  async getQuestionById(@Param('id') id: string) {
    return this.contentAdminService.getQuestionById(id);
  }

  @Patch('questions/:id')
  @Roles(Role.EDITOR, Role.ADMIN)
  async updateQuestion(
    @Param('id') id: string,
    @Body() dto: UpdateQuestionAdminDto,
    @Req() req: { user: { id: string; role: Role } },
  ) {
    return this.contentAdminService.updateQuestion(id, dto, req.user.role);
  }

  @Post('questions/:id/archive')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.EDITOR, Role.ADMIN)
  async archiveQuestion(
    @Param('id') id: string,
    @Req() req: { user: { id: string; role: Role } },
  ) {
    return this.contentAdminService.archiveQuestion(id, req.user.role);
  }

  @Post('review')
  @Roles(Role.REVIEWER, Role.ADMIN)
  async reviewContent(
    @Req() req: { user: { id: string } },
    @Body() dto: ReviewContentDto,
  ) {
    return this.contentAdminService.reviewContent(req.user.id, dto);
  }

  @Get('pending')
  @Roles(Role.EDITOR, Role.REVIEWER, Role.ADMIN)
  async getPendingContent() {
    return this.contentAdminService.getPendingContent();
  }

  @Get('reviews/:contentId')
  @Roles(Role.EDITOR, Role.REVIEWER, Role.ADMIN)
  async getContentReviews(@Param('contentId') contentId: string) {
    return this.contentAdminService.getContentReviews(contentId);
  }

  @Post('chapters')
  @Roles(Role.EDITOR, Role.ADMIN)
  async createChapter(@Body() dto: CreateChapterAdminDto) {
    return this.contentAdminService.createChapter(dto);
  }

  @Post('topics')
  @Roles(Role.EDITOR, Role.ADMIN)
  async createTopic(@Body() dto: CreateTopicAdminDto) {
    return this.contentAdminService.createTopic(dto);
  }

  @Post('subjects/:subjectId/toggle-ready')
  @Roles(Role.ADMIN)
  async toggleSubjectReady(@Param('subjectId') subjectId: string) {
    return this.contentAdminService.toggleSubjectReady(subjectId);
  }

  @Post('subjects')
  @Roles(Role.ADMIN)
  async createSubject(@Body() dto: CreateSubjectAdminDto) {
    return this.contentAdminService.createSubject(dto);
  }

  @Get('topics/:topicId/content')
  @Roles(Role.EDITOR, Role.REVIEWER, Role.ADMIN)
  async getTopicContent(@Param('topicId') topicId: string) {
    return this.contentAdminService.getTopicContent(topicId);
  }

  @Get('reports')
  @Roles(Role.EDITOR, Role.REVIEWER, Role.ADMIN)
  async listContentReports(@Query() query: ListContentReportsQueryDto) {
    return this.contentAdminService.listContentReports(query);
  }

  @Patch('reports/:id')
  @Roles(Role.EDITOR, Role.REVIEWER, Role.ADMIN)
  async resolveContentReport(
    @Param('id') id: string,
    @Body() dto: ResolveContentReportDto,
    @Req() req: { user: { id: string; role: Role } },
  ) {
    return this.contentAdminService.resolveContentReport(
      id,
      dto,
      req.user.id,
      req.user.role,
    );
  }
}
