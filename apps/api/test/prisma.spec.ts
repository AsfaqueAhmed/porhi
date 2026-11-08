import { describe, it, expect, beforeAll, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/database/prisma.service';
import { PrismaModule } from '../src/database/prisma.module';
import { AppModule } from '../src/app.module';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined and instantiate properly', () => {
    expect(service).toBeDefined();
  });

  it('should expose all 10 schema models', () => {
    expect(service.user).toBeDefined();
    expect(service.subject).toBeDefined();
    expect(service.chapter).toBeDefined();
    expect(service.topic).toBeDefined();
    expect(service.lesson).toBeDefined();
    expect(service.question).toBeDefined();
    expect(service.examSession).toBeDefined();
    expect(service.revisionMistake).toBeDefined();
    expect(service.contentReview).toBeDefined();
    expect(service.eventLog).toBeDefined();
  });

  it('should connect on onModuleInit and disconnect on onModuleDestroy', async () => {
    const connectSpy = vi.spyOn(service, '$connect').mockResolvedValue(undefined as never);
    const disconnectSpy = vi.spyOn(service, '$disconnect').mockResolvedValue(undefined as never);

    await service.onModuleInit();
    expect(connectSpy).toHaveBeenCalledTimes(1);

    await service.onModuleDestroy();
    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });

  it('should be provided globally via PrismaModule and accessible through AppModule', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const appPrismaService = module.get<PrismaService>(PrismaService);
    expect(appPrismaService).toBeDefined();
    expect(appPrismaService.user).toBeDefined();
  });
});
