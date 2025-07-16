import { Snippet } from '@ai-snippet-service/shared';
import { aiService } from '../../services/ai.service';
import { prisma } from '../../prisma/prisma';

export class SnippetsController {
  async createSnippet(text: string): Promise<Snippet> {
    const summary = await aiService.generateSummary(text);

    const snippet = await prisma.snippet.create({
      data: {
        text,
        summary,
      },
    });
      
      return snippet;
  }
}


