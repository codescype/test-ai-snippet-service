import { prisma } from '../prisma';
import { testSnippets } from '@ai-snippet-service/shared';

export async function seedSnippets() {
  await prisma.snippet.deleteMany();

  for (const { text, summary } of testSnippets) {
    await prisma.snippet.create({
      data: {
        text,
        summary,
      },
    });
  }

  console.log('Database seeded with dummy snippets');
}
