import { AIService } from "./ai.service.interface";
import { OpenAIService } from "./open_ai.ai.service";

export const aiService: AIService = new OpenAIService();
