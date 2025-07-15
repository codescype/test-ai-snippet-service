import { Elysia } from 'elysia';
import { node } from '@elysiajs/node';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';

import { serverAppHostName } from '@ai-snippet-service/shared';

// Setup the Elysia server
export const app = new Elysia({
  adapter: node(),
  serve: {
    hostname: serverAppHostName,
  },
})
  // Add CORS middleware to enable requests from different origins
  .use(cors())

  // Add Swagger middleware for API documentation
  .use(swagger())

  // Add an error handler to catch errors on the route
  .onError(({ status, code, error }) => {
    console.error('Error:', error);

    return {
      status,
      message: code,
    };
  })

  // Define a simple route for the root path
  .get('/', () => 'Welcome to the AI Snippet Service Server!');
