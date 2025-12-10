import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';

import { serverAppHostName } from '@ai-snippet-service/shared';
import { snippetsRoutes } from './resources/snippets/snippets.routes';

// Set up the Elysia server
export const app = new Elysia({
  serve: {
    hostname: serverAppHostName,
  },
})
  // Add CORS middleware to enable requests from different origins
  .use(cors())

  // Add Swagger middleware for API documentation
  .use(swagger())

  // Add an error handler to catch errors on the route
  .onError(({ error }) => {
    console.error('Error:', error);

    return error;
  })

  .use(snippetsRoutes)

  // Define a simple route for the root path
  .get('/', () => 'Welcome to the AI Snippet Service Server!');

// Export the type for TypeScript inference
export type App = typeof app;
