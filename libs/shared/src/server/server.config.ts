export const serverAppHostName = process.env.SERVER_APP_HOST ?? '127.0.0.1';
export const serverAppPort = process.env.SERVER_APP_PORT ?? 3000;
export const serverAppBaseURL = `http://${serverAppHostName}:${serverAppPort}`;
