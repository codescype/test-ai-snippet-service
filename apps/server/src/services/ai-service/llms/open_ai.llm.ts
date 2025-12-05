import OpenAI from 'openai';
import { LLM } from './llm.interface';

/**
 * OpenAI LLM.
 */
export class OpenAiLLM implements LLM {
  private openAIClient: OpenAI;

  /**
   * @param ai - An instance of the OpenAI client
   */
  constructor() {
    try {
      // Use the provided open AI instance or create a new one
      this.openAIClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    } catch (error) {
      console.error('Error initializing OpenAI client:', error);
      throw new Error('Failed to initialize OpenAI client');
    }
  }


  public async generateSummary(prompt: string): Promise<string> {
    try {
      const response = await this.openAIClient.chat.completions.create({
        model: 'gpt-4.1-nano-2025-04-14',
        messages: [{ role: 'user', content: prompt }],
        max_completion_tokens: 50,
      });

      const summary = response.choices[0].message.content?.trim() ?? '';

      if (summary.length === 0) {
        throw new Error('Model returned an empty summary.');
      }

      return summary;
    } catch (error) {
      console.error('OpenAI error:', error);
      throw new Error('Failed to generate summary,');
    }
  }
}
