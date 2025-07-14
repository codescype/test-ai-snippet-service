import { Elysia } from 'elysia';
import { node } from '@elysiajs/node';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import 'dotenv/config';

import {
  serverAppHostName,
  serverAppPort,
  serverAppBaseURL,
} from '@ai-snippet-service/shared';

// Setup the Elysia server
new Elysia({
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
  .onError(({ code, error }) => {
    console.error('Error:', error);

    return {
      status: code,
      message: error,
    };
  })

  // Define a simple route for the root path
  .get('/', () => 'Welcome to the AI Snippet Service Server!')

  // Start the server by listening on the specified host and port
  .listen(serverAppPort, () => {
    // Log the server URL to the console
    console.log(`🦊 Server is running at ${serverAppBaseURL}`);
    console.log(
      `📖 API documentation is available at ${serverAppBaseURL}/swagger`
    );
  });
