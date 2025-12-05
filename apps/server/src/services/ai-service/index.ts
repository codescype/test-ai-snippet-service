import { LLM } from './llms/llm.interface';
import { OpenAiLLM } from './llms/open_ai.llm';

/**
 * AIService to handle AI-related operations.
 */
class AIService {
  private llm: LLM;
  /**
   * @param llm - An LLM instance
   */
  constructor(llm: LLM) {
    if (!llm) {
      throw new Error('LLM instance is required');
    }
    this.llm = llm;
  }

  /**
   * Generates a summary for the given text using an LLM.
   * @param text - The text to summarize
   * @returns The summary string
   */
  public async generateSummary(text: string): Promise<string> {
    const prompt = `Summarize the following text in 30 words or less:\n\n${text}`;

    try {
      const summary = await this.llm.generateSummary(prompt);

      return summary;
    } catch (error) {
      console.error('AI Service error:', error);
      throw new Error('Failed to generate summary,');
    }
  }
}

export const aiService = new AIService(new OpenAiLLM());
