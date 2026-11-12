import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { PlannerService } from './planner.service';
import {
  AutoGeneratePlanDto,
  CreateStudyTaskDto,
  UpdateStudyTaskDto,
} from './dto/planner.dto';

@Controller('planner')
@UseGuards(OptionalJwtAuthGuard)
export class PlannerController {
  constructor(
    @Inject(PlannerService) private readonly plannerService: PlannerService,
  ) {}

  private requireUserId(req?: { user?: { id?: string } }): string {
    const userId = req?.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Student session required');
    }
    return userId;
  }

  @Get()
  async listTasks(@Req() req?: { user?: { id?: string } }) {
    return this.plannerService.listTasks(req?.user?.id);
  }

  @Post()
  async createTask(
    @Body() body: CreateStudyTaskDto,
    @Req() req?: { user?: { id?: string } },
  ) {
    return this.plannerService.createTask(this.requireUserId(req), body);
  }

  @Post('auto-generate')
  async autoGeneratePlan(
    @Body() body: AutoGeneratePlanDto,
    @Req() req?: { user?: { id?: string } },
  ) {
    return this.plannerService.autoGeneratePlan(this.requireUserId(req), body);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() body: UpdateStudyTaskDto,
    @Req() req?: { user?: { id?: string } },
  ) {
    return this.plannerService.updateTask(this.requireUserId(req), id, body);
  }

  @Delete(':id')
  async deleteTask(
    @Param('id') id: string,
    @Req() req?: { user?: { id?: string } },
  ) {
    return this.plannerService.deleteTask(this.requireUserId(req), id);
  }
}
