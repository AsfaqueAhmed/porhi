import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CurriculumModule } from './modules/curriculum/curriculum.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { PracticeModule } from './modules/practice/practice.module';
import { ExamModule } from './modules/exam/exam.module';
import { ContentAdminModule } from './modules/content-admin/content-admin.module';
import { MediaAdminModule } from './modules/media-admin/media-admin.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CurriculumModule,
    LessonModule,
    PracticeModule,
    ExamModule,
    ContentAdminModule,
    MediaAdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
