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
    // Generate a summary for the snippet
    console.log(`Generating summary for snippet...`);
    const summary = await aiService.generateSummary(text);
    console.log(`Generated summary ${summary} for ${text}`);

    // Save the snippet to the database
    console.log(`Saving snippet to the database...`);
    const snippet = await prisma.snippet.create({
      data: {
        text,
        summary,
      },
    });
    console.log(`Saved snippet ${snippet.id} to the database`);

    return snippet;
  }

  /**
   * Retrieves all snippets from the database.
   * @returns An array of Snippet objects.
   */
  async getSnippets(): Promise<Snippet[]> {
    // Retrieve all snippets from the database
    console.log(`Retrieving snippets from the database...`);
    const snippets = await prisma.snippet.findMany();
    console.log(`Retrieved ${snippets.length} snippets from the database`);

    return snippets;
  }

  /**
   * Retrieves a single snippet by its ID.
   * @param id - The unique identifier of the snippet.
   * @returns The Snippet object if found, otherwise null.
   */
  async getSnippetById(id: string): Promise<Snippet | null> {
    try {
      // Retrieve a single snippet by its ID
      console.log(`Retrieving snippet ${id} from the database...`);
      const snippet = await prisma.snippet.findUnique({ where: { id } });
      console.log(`Retrieved snippet ${id} from the database`);

      return snippet;
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}
