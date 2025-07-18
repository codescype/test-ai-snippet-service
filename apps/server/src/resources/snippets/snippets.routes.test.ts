import { describe, it, expect } from 'vitest';
import { treaty } from '@elysiajs/eden';

import { app } from '../../app';
import { aiService } from '../../services/ai.service';
import { prisma } from '../../prisma/prisma';

// Set up Elysia treaty for tests
const request = treaty(app);

// Set up mocks
vi.mock('../../services/ai.service');
vi.mock('../../prisma/prisma', () => ({
  prisma: {
    snippet: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

describe('Snippets Routes', () => {
  // Create a mock snippet
  const mockText =
    'Test text with over fifty words to ensure it meets the requirement for length, covering various topics like technology and innovation in a meaningful way for testing purposes.';
  const mockSummary = 'Mock summary';
  const mockSnippet = {
    id: 'mock-id',
    text: mockText,
    summary: mockSummary,
  };
  describe('POST /snippets - Create a Snippet', () => {
    it('returns a 422 validation error status when text is not provided', async () => {
      // @ts-expect-error so we can test the error.
      const { status } = await request.snippets.post();

      expect(status).toBe(422);
    });

    it('creates a snippet with summarized text', async () => {
      vi.mocked(aiService.generateSummary).mockResolvedValue(mockSummary);
      vi.mocked(prisma.snippet.create).mockResolvedValue(mockSnippet);

      const response = await request.snippets.post({ text: mockText });

      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockSnippet);
    });
  });

  describe('GET /snippets - Get all Snippets', () => {
    it('returns all snippets', async () => {
      vi.mocked(prisma.snippet.findMany).mockResolvedValue([mockSnippet]);

      const response = await request.snippets.get();

      expect(response.status).toBe(200);
      expect(response.data).toEqual([mockSnippet]);
    });
  });
});
