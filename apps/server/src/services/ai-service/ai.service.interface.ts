/**
 * Interface for AI services that provide text summarization.
 */
export interface AIService {
  /**
   * Generates a summary for the given text.
   * @param text - The text to summarize
   * @returns The summary string
   */
  generateSummary(text: string): Promise<string>;
}
