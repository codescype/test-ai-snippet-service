import { Elysia, t } from 'elysia';

export const snippetsRoutes = new Elysia().group('/snippets', (app) => {
  return app.post('/', 'Welcome to Create Snippet Route', {
    body: t.Object({
      text: t.String(),
    }),
  });
});
