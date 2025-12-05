/**
 * Interface for LLMs that handles AI-related operations.
 */
export interface LLM {
  /**
   * Generates a summary for the given text.
   * @param prompt - The prompt to execute
   * @returns The summary string
   */
  generateSummary(prompt: string): Promise<string>;
}
