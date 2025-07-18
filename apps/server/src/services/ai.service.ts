import OpenAI from 'openai';

class AIService {
  private openai: OpenAI;

  constructor() {
    // Ensure the API key is available
    if (!process.env.AI_API_KEY) {
      throw new Error('AI_API_KEY is not defined in environment variables.');
    }
    this.openai = new OpenAI({ apiKey: process.env.AI_API_KEY });
  }

  public async generateSummary(text: string): Promise<string> {
    const prompt = `Summarize the following text in 30 words or less:\n\n${text}`;

    try {
      const response = await this.openai.chat.completions.create({
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

export const aiService = new AIService();
