import { Module } from '@nestjs/common';
import { BoardArchiveController } from './board-archive.controller';
import { BoardArchiveService } from './board-archive.service';

@Module({
  controllers: [BoardArchiveController],
  providers: [BoardArchiveService],
  exports: [BoardArchiveService],
})
export class BoardArchiveModule {}
