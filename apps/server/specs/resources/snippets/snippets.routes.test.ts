import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { treaty } from '@elysiajs/eden';

import { app, type App } from '../../../src/app';
import { aiService } from '../../../src/services/ai-service';
import { prisma } from '../../../src/prisma/prisma';
import { Snippet } from '@ai-snippet-service/shared';

// #region Test Setup
// Create a test context type
type TestContext = {
  api: ReturnType<typeof treaty>;
  mockSnippet: Snippet;
  mockSnippets: Snippet[];
};

// Mock Prisma Client type
type PrismaClient = unknown;

// Setup test context and mocks
let testContext: TestContext;

// Create a test data
const MOCK_SNIPPET_ID = 'test-id-123';
const MOCK_SNIPPET_TEXT =
  'This is a test snippet with more than 50 characters to ensure proper validation and processing';
const MOCK_SUMMARY = 'AI generated summary for test snippet';
const MOCK_SNIPPET = {
  id: MOCK_SNIPPET_ID,
  text: MOCK_SNIPPET_TEXT,
  summary: MOCK_SUMMARY,
};

// Mock the AI Service
vi.mock('../../../src/services/ai-service');

// Mock the Prisma Client
vi.mock('../../../src/prisma/prisma', () => ({
  prisma: {
    snippet: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  } as unknown as PrismaClient,
}));

// Set up hooks to run before each test
beforeEach(() => {
  // Reset all mocks
  vi.clearAllMocks();

  // Create a fresh test context
  testContext = {
    api: treaty<App>(app),
    mockSnippet: { ...MOCK_SNIPPET },
    mockSnippets: [{ ...MOCK_SNIPPET }],
  };

  /* Set up default mock implementations */

  // Set up prisma mock implementations
  (prisma.snippet.findUnique as Mock).mockImplementation(({ where }) =>
    where.id === MOCK_SNIPPET_ID
      ? Promise.resolve(testContext.mockSnippet)
      : Promise.resolve(null)
  );
  (prisma.snippet.findMany as Mock).mockResolvedValue(testContext.mockSnippets);
  (prisma.snippet.create as Mock).mockResolvedValue(testContext.mockSnippet);

  // Set up AI service mock implementations
  (aiService.generateSummary as Mock).mockResolvedValue(MOCK_SUMMARY);
});
// #endregion

// #region Test Suite
// Define the test suite
describe('Given that a user makes a request to a route in the Snippets route group', () => {
  describe('and it is a POST request to /snippets', () => {
    describe('when the request body text is empty', () => {
      it('it should return a 422 error', async () => {
        const response = await testContext.api.snippets
          .post({ text: '' })
          .catch((e: never) => e);

        expect(response.status).toBe(422);
      });
    });

    describe('when the request body has a valid text', () => {
      it('it should return a new snippet', async () => {
        // Setup mocks
        (aiService.generateSummary as Mock).mockResolvedValue(MOCK_SUMMARY);
        (prisma.snippet.create as Mock).mockResolvedValue(MOCK_SNIPPET);

        // Execute
        const response = await testContext.api.snippets.post({
          text: MOCK_SNIPPET_TEXT,
        });

        // Assert
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
          id: MOCK_SNIPPET_ID,
          text: MOCK_SNIPPET_TEXT.trim(),
          summary: MOCK_SUMMARY,
        });

        // Verify AI service was called with the correct text
        expect(aiService.generateSummary).toHaveBeenCalledWith(
          MOCK_SNIPPET_TEXT.trim()
        );

        // Verify database was called with correct data
        expect(prisma.snippet.create).toHaveBeenCalledWith({
          data: {
            text: MOCK_SNIPPET_TEXT.trim(),
            summary: MOCK_SUMMARY,
          },
        });
      });
    });
  });

  describe('when it is a GET request to /snippets', () => {
    it('it should return an array of all snippets', async () => {
      // Setup
      (prisma.snippet.findMany as Mock).mockResolvedValue(
        testContext.mockSnippets
      );

      // Execute
      const response = await testContext.api.snippets.get();

      // Assert
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data).toHaveLength(1);
      expect(response.data[0]).toMatchObject({
        id: expect.any(String),
        text: expect.any(String),
        summary: expect.any(String),
      });

      // Verify database was queried correctly
      expect(prisma.snippet.findMany).toHaveBeenCalled();
    });
  });

  describe('and it is a GET request to /snippets/:id', () => {
    describe('when an invalid ID is provided', () => {
      it('it should return a 404 error', async () => {
        // Setup
        (prisma.snippet.findUnique as Mock).mockResolvedValue(null);

        // Execute
        const response = await testContext.api
          .snippets({ id: 'invalid-id' })
          .get();

        // Assert
        expect(response.status).toBe(404);
      });
    });

    describe('when a valid ID is provided', () => {
      it('it should return the requested snippet', async () => {
        // Setup
        (prisma.snippet.findUnique as Mock).mockResolvedValue(
          testContext.mockSnippet
        );

        // Execute
        const response = await testContext.api
          .snippets({ id: MOCK_SNIPPET_ID })
          .get();

        // Assert
        expect(response.status).toBe(200);
        expect(response.data).toEqual(testContext.mockSnippet);
      });
    });
  });
});
// #endregion
