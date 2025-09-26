import OpenAI from 'openai';
import { AIService } from './ai.service.interface';

/**
 * OpenAI Implementation of AIService.
 */
export class OpenAIService implements AIService {
  /**
   * @param ai - An instance of the OpenAI client
   */
  constructor(private ai = new OpenAI({ apiKey: process.env.AI_API_KEY })) {}

  /**
   * Generates a summary for the given text using OpenAI.
   * @param text - The text to summarize
   * @returns The summary string
   */
  public async generateSummary(text: string): Promise<string> {
    const prompt = `Summarize the following text in 30 words or less:\n\n${text}`;

    try {
      const response = await this.ai.chat.completions.create({
        model: 'gpt-4.1-nano-2025-04-14',
        messages: [{ role: 'user', content: prompt }],
        max_completion_tokens: 50,
      });
      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('OpenAI error:', error);
      throw new Error('Failed to generate summary');
    }
  }
}
