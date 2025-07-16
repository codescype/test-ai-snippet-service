import { Elysia, t } from 'elysia';
import { SnippetsController } from './snippets.controller';

export const snippetsRoutes = new Elysia()
  // Add an instance of Snippets Controller to the snippets route
  .decorate('snippetsController', new SnippetsController())

export const snippetsRoutes = new Elysia().group('/snippets', (app) => {
  return app.post('/', 'Welcome to Create Snippet Route', {
    body: t.Object({
      text: t.String(),
    }),
  });
});
