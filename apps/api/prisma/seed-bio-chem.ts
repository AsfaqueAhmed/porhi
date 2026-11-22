import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

// Biology Chapters 1–14
import { seedBiologyChapter1 } from './seed-biology-chapter-1';
import { seedBiologyChapter2 } from './seed-biology-chapter-2';
import { seedBiologyChapter3 } from './seed-biology-chapter-3';
import { seedBiologyChapter4 } from './seed-biology-chapter-4';
import { seedBiologyChapter5 } from './seed-biology-chapter-5';
import { seedBiologyChapter6 } from './seed-biology-chapter-6';
import { seedBiologyChapter7 } from './seed-biology-chapter-7';
import { seedBiologyChapter8 } from './seed-biology-chapter-8';
import { seedBiologyChapter9 } from './seed-biology-chapter-9';
import { seedBiologyChapter10 } from './seed-biology-chapter-10';
import { seedBiologyChapter11 } from './seed-biology-chapter-11';
import { seedBiologyChapter12 } from './seed-biology-chapter-12';
import { seedBiologyChapter13 } from './seed-biology-chapter-13';
import { seedBiologyChapter14 } from './seed-biology-chapter-14';

// Chemistry Chapters 1–12
import { seedChemistryChapter1 } from './seed-chemistry-chapter-1';
import { seedChemistryChapter2 } from './seed-chemistry-chapter-2';
import { seedChemistryChapter3 } from './seed-chemistry-chapter-3';
import { seedChemistryChapter4 } from './seed-chemistry-chapter-4';
import { seedChemistryChapter5 } from './seed-chemistry-chapter-5';
import { seedChemistryChapter6 } from './seed-chemistry-chapter-6';
import { seedChemistryChapter7 } from './seed-chemistry-chapter-7';
import { seedChemistryChapter8 } from './seed-chemistry-chapter-8';
import { seedChemistryChapter9 } from './seed-chemistry-chapter-9';
import { seedChemistryChapter10 } from './seed-chemistry-chapter-10';
import { seedChemistryChapter11 } from './seed-chemistry-chapter-11';
import { seedChemistryChapter12 } from './seed-chemistry-chapter-12';

async function main() {
  const prisma = new PrismaClient();
  const startTime = Date.now();

  console.log('🚀 Starting targeted seed for SSC Biology (Chapters 1–14) and SSC Chemistry (Chapters 1–12)...');

  // Copy sample simulations into uploads/interactive
  const sampleSimSrcDir = path.join(__dirname, 'sample-simulations');
  const sampleSimDestDir = path.join(process.cwd(), 'uploads', 'interactive');
  if (fs.existsSync(sampleSimSrcDir)) {
    fs.mkdirSync(sampleSimDestDir, { recursive: true });
    const files = fs.readdirSync(sampleSimSrcDir);
    let copied = 0;
    for (const file of files) {
      if (file.endsWith('.html')) {
        fs.copyFileSync(path.join(sampleSimSrcDir, file), path.join(sampleSimDestDir, file));
        copied++;
      }
    }
    console.log(`📁 Synced ${copied} simulation labs into uploads/interactive`);
  }

  console.log('\n--- Seeding SSC Biology (Chapters 1–14) ---');
  await seedBiologyChapter1(prisma);
  await seedBiologyChapter2(prisma);
  await seedBiologyChapter3(prisma);
  await seedBiologyChapter4(prisma);
  await seedBiologyChapter5(prisma);
  await seedBiologyChapter6(prisma);
  await seedBiologyChapter7(prisma);
  await seedBiologyChapter8(prisma);
  await seedBiologyChapter9(prisma);
  await seedBiologyChapter10(prisma);
  await seedBiologyChapter11(prisma);
  await seedBiologyChapter12(prisma);
  await seedBiologyChapter13(prisma);
  await seedBiologyChapter14(prisma);

  console.log('\n--- Seeding SSC Chemistry (Chapters 1–12) ---');
  await seedChemistryChapter1(prisma);
  await seedChemistryChapter2(prisma);
  await seedChemistryChapter3(prisma);
  await seedChemistryChapter4(prisma);
  await seedChemistryChapter5(prisma);
  await seedChemistryChapter6(prisma);
  await seedChemistryChapter7(prisma);
  await seedChemistryChapter8(prisma);
  await seedChemistryChapter9(prisma);
  await seedChemistryChapter10(prisma);
  await seedChemistryChapter11(prisma);
  await seedChemistryChapter12(prisma);

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n🎉 Successfully completed Biology and Chemistry seeding in ${duration}s!`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
