import { Module } from '@nestjs/common';
import { MediaAdminController } from './media-admin.controller';
import { MediaPublicController } from './media-public.controller';
import { MediaAdminService } from './media-admin.service';

@Module({
  controllers: [MediaAdminController, MediaPublicController],
  providers: [MediaAdminService],
  exports: [MediaAdminService],
})
export class MediaAdminModule {}
