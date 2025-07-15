import 'dotenv/config';

import { app } from './app';
import { serverAppPort, serverAppBaseURL } from '@ai-snippet-service/shared';

// Start the server by listening on the specified host and port
app.listen(serverAppPort, () => {
  // Log the server URL to the console
  console.log(`🦊 Server is running at ${serverAppBaseURL}`);
  console.log(
    `📖 API documentation is available at ${serverAppBaseURL}/swagger`
  );
});
