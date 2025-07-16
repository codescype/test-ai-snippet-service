import { Elysia, t } from 'elysia';
import { SnippetsController } from './snippets.controller';

export const snippetsRoutes = new Elysia()
  // Add an instance of Snippets Controller to the snippets route
  .decorate('snippetsController', new SnippetsController())

  .group('/snippets', (app) => {
    return app.post(
      '/',
      async ({ body, status, snippetsController }) => {
        try {
          const snippets = await snippetsController.createSnippet(body.text);

          // Return the snippets as JSON
          return { ...snippets };
        } catch (error) {
          console.error(error);

          throw status(500);
        }
      },
      {
        body: t.Object({
          text: t.String({ minLength: 1 }),
        }),
      }
    );
  });
