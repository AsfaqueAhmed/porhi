import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '@prisma/client';
import { MediaCategory } from '@pori/shared';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../content-admin/guards/roles.guard';
import { Roles } from '../content-admin/decorators/roles.decorator';
import { MediaAdminService } from './media-admin.service';

@Controller('admin/media')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MediaAdminController {
  constructor(
    @Inject(MediaAdminService)
    private readonly mediaAdminService: MediaAdminService,
  ) {}

  @Post('upload')
  @Roles(Role.EDITOR, Role.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body('category') category?: MediaCategory,
  ) {
    if (!file) {
      throw new BadRequestException('file is required');
    }
    return this.mediaAdminService.processUpload(file, category);
  }
}
