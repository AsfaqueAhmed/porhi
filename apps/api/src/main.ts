import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';

function syncSampleSimulations(logger: Logger) {
  try {
    const candidateDirs = [
      path.join(process.cwd(), 'prisma', 'sample-simulations'),
      path.join(process.cwd(), 'apps', 'api', 'prisma', 'sample-simulations'),
      path.join(__dirname, '../../prisma/sample-simulations'),
      path.join(__dirname, '../../../prisma/sample-simulations'),
    ];
    const sampleDir = candidateDirs.find((d) => fs.existsSync(d));
    if (!sampleDir) return;

    const uploadDir = path.join(process.cwd(), 'uploads', 'interactive');
    fs.mkdirSync(uploadDir, { recursive: true });

    let synced = 0;
    for (const file of fs.readdirSync(sampleDir)) {
      if (file.endsWith('.html')) {
        const dest = path.join(uploadDir, file);
        if (!fs.existsSync(dest)) {
          fs.copyFileSync(path.join(sampleDir, file), dest);
          synced++;
        }
      }
    }
    if (synced > 0) {
      logger.log(`Auto-synced ${synced} missing simulation lab(s) into uploads/interactive`);
    }
  } catch (err) {
    logger.warn(`Failed to auto-sync sample simulations: ${err}`);
  }
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  syncSampleSimulations(logger);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableCors();
  app.enableShutdownHooks();

  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');
  logger.log(`poRi API running on port ${port} (0.0.0.0)`);
}

bootstrap();
