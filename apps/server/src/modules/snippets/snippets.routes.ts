import { Elysia, t } from 'elysia';
import { SnippetsController } from './snippets.controller';

const SnippetSchema = t.Object({
  id: t.String(),
  text: t.String(),
  summary: t.String(),
});

const ErrorSchema = t.Object({
  error: t.String(),
  status: t.Number(),
});

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
            response: {
              200: SnippetSchema,
              400: ErrorSchema,
            },
          }
        )

        // Get all snippets
        .get(
          '/',
          ({ snippetsController }) => snippetsController.getSnippets(),
          {
            response: {
              200: t.Array(SnippetSchema),
            },
          }
        )

        // Get a snippet by ID
        .get(
          '/:id',
          async ({ params, status, snippetsController }) => {
            const snippet = await snippetsController.getSnippetById(params.id);

            if (!snippet) {
              // throw instead of returning a status 404
              // to satisfy Elysia's requirement for non success responses
              throw status(404, {
                error: 'Snippet not found',
                status: 404,
              });
            }

            return snippet;
          },
          {
            params: t.Object({
              id: t.String({ minLength: 1 }),
            }),
            response: {
              200: SnippetSchema,
              404: ErrorSchema,
            },
          }
        )
    );
  });
