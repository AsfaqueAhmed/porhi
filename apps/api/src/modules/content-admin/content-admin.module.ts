import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { ContentAdminController } from './content-admin.controller';
import { ContentAdminService } from './content-admin.service';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ContentAdminController],
  providers: [ContentAdminService, RolesGuard],
  exports: [ContentAdminService, RolesGuard],
})
export class ContentAdminModule {}
