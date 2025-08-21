import { Elysia, t } from 'elysia';
import { SnippetsController } from './snippets.controller';

export const snippetsRoutes = new Elysia()
  // Add an instance of Snippets Controller to the snippets route
  .decorate('snippetsController', new SnippetsController())

  .group('/snippets', (app) => {
    return (
      app
        // create a snippet
        .post(
          '/',
          ({ body, snippetsController }) =>
            snippetsController.createSnippet(body.text),
          {
            body: t.Object({
              text: t.String({ minLength: 1 }),
            }),
          }
        )

        // Get all snippets
        .get('/', ({ snippetsController }) => snippetsController.getSnippets())

        // Get a snippet by ID
        .get(
          '/:id',
          async ({ params, status, snippetsController }) => {
            const snippet = await snippetsController.findSnippet(params.id);

            if (!snippet) {
              // throw instead of returning a status 404
              // to satisfy Elysia's requirement for non success responses
              throw status(404);
            }
          },
          {
            params: t.Object({
              id: t.String({ minLength: 1 }),
            }),
          }
        )
    );
  });
