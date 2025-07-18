import { serverAppBaseURL } from '@ai-snippet-service/shared';
console.log(`🚨 Server should be running at ${serverAppBaseURL}`);

// Set up the API call function to make API calls to the server
export async function callAPIServer<T>(
  endpointPath: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    const res = await fetch(`${serverAppBaseURL}${endpointPath}`, options);

    // Check if the response is not ok
    if (!res.ok) {
      throw new Error(
        `Failed to fetch from ${endpointPath}: ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      `∴ Error calling API server: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
