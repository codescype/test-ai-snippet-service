import { serverAppBaseURL } from '@ai-snippet-service/shared'
console.log(`🚨 Server should be running at ${serverAppBaseURL}`);

// Set up the API call function to make API calls to the server
export async function callAPIServer<T>(
  endpointPath: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${serverAppBaseURL}${endpointPath}`, options);
  const data = await res.json();

  console.info(`∴ Received a data ${data}`);

  if (data.error) throw new Error(data.error);

  return data;
};
