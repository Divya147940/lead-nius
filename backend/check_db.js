import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  try {
    const latest = await prisma.registration.findMany({
      take: 1,
      orderBy: { timestamp: 'desc' }
    });
    console.log('LATEST_REGISTRATION_CHECK:', JSON.stringify(latest, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
