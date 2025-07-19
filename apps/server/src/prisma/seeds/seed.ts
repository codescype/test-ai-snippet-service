import { config } from 'dotenv';

import { prisma } from '../prisma';
import { seedSnippets } from './snippets.seed';

config({ path: '../../../../../.env' });

async function main() {
  seedSnippets();
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
