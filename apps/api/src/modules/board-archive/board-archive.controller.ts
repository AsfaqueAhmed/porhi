import { Controller, Get, Inject, Query } from '@nestjs/common';
import { BoardArchiveQuery, BoardArchiveService } from './board-archive.service';

@Controller('board-archive')
export class BoardArchiveController {
  constructor(
    @Inject(BoardArchiveService)
    private readonly boardArchiveService: BoardArchiveService,
  ) {}

  @Get('filters')
  async getFilters() {
    return this.boardArchiveService.getFilters();
  }

  @Get('questions')
  async getQuestions(@Query() query: BoardArchiveQuery) {
    return this.boardArchiveService.getQuestions(query);
  }
}
