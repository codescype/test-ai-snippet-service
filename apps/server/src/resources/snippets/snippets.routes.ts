import { Elysia, t } from 'elysia';
import { SnippetsController } from './snippets.controller';

export const snippetsRoutes = new Elysia()
  // Add an instance of Snippets Controller to the snippets route
  .decorate('snippetsController', new SnippetsController())

  .group('/snippets', (app) => {
    return app
      .post(
        '/',
        async ({ body, status, snippetsController }) => {
          try {
            const snippet = await snippetsController.createSnippet(body.text);

            // Return the snippet as JSON
            return { ...snippet };
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
      )
      .get('/', async ({ status, snippetsController }) => {
        try {
          const snippets = await snippetsController.getSnippets();

          // Return the snippets as JSON
          return [...snippets];
        } catch (error) {
          console.error(error);

          throw status(500);
        }
      })
      .get(
        '/:id',
        async ({ params, status, snippetsController }) => {
          try {
            const snippet = await snippetsController.findSnippet(params.id);

            if (!snippet) {
              throw status(404);
            }

            // Return the snippet as JSON
            return { ...snippet };
          } catch (error) {
            console.error(error);

            if (
              typeof error === 'object' &&
              error !== null &&
              'code' in error &&
              typeof error.code === 'number'
            ) {
              throw status(error.code);
            } else {
              throw status(500);
            }
          }
        },
        {
          params: t.Object({
            id: t.String({ minLength: 1 }),
          }),
        }
      );
  });
