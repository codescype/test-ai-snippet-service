import { describe, it, expect } from 'vitest';
import { treaty } from '@elysiajs/eden';

import { app } from '../../app';

// Set up Elysia treaty for tests
const request = treaty(app);

describe('Snippets Routes', () => {
  describe('POST /snippets - Create a Snippet', () => {
    describe('It validates the request', () => {
      it('returns a 422 validation error status when text is not provided', async () => {
        // @ts-expect-error so we can test the error.
        const { status } = await request.snippets.post();

        expect(status).toBe(422);
      });
    });
  });
});
