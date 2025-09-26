import { aiService } from './../../services/ai-service';
import { Snippet } from '@ai-snippet-service/shared';
import { prisma } from '../../prisma/prisma';

/**
 * Controller for managing code snippets.
 */
export class SnippetsController {
  /**
   * Creates a new snippet with a generated summary and saves it to the database.
   * @param text - The text content of the snippet.
   * @returns The created Snippet object.
   */
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

  /**
   * Retrieves all snippets from the database.
   * @returns An array of Snippet objects.
   */
  async getSnippets(): Promise<Snippet[]> {
    const snippets = await prisma.snippet.findMany();

    return snippets;
  }

  /**
   * Retrieves a single snippet by its ID.
   * @param id - The unique identifier of the snippet.
   * @returns The Snippet object if found, otherwise null.
   */
  async getSnippetById(id: string): Promise<Snippet | null> {
    try {
      const snippet = await prisma.snippet.findUnique({ where: { id } });

      return snippet;
    } catch (error) {
      console.error(error);

      return null;
    }
    
  }
}


