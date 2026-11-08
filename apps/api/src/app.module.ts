import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CurriculumModule } from './modules/curriculum/curriculum.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { PracticeModule } from './modules/practice/practice.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CurriculumModule,
    LessonModule,
    PracticeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

