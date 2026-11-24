import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  try {
    const updated = await prisma.$executeRawUnsafe(`
      UPDATE "Lesson"
      SET "interactiveWidgetUrl" = REPLACE("interactiveWidgetUrl", '/interactive/', '/uploads/interactive/')
      WHERE "interactiveWidgetUrl" LIKE '/interactive/%';
    `);
    console.log(`✅ Successfully updated ${updated} lesson(s) to use /uploads/interactive/ prefix.`);
  } catch (err) {
    console.error('❌ Failed to update lessons:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
