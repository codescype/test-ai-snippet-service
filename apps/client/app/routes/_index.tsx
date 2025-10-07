import { Snippet } from '@ai-snippet-service/shared';
import type { ActionFunctionArgs } from '@remix-run/node';

import CreateSnippet from '~/components/CreateSnippet';
import { callAPIServer } from '~/utils/apiServer';
import { SnippetResult } from '~/utils/snippetsResult';
import { isWordsCountMoreThan } from '~/utils/wordCount';

export async function action({
  request,
}: ActionFunctionArgs): Promise<SnippetResult> {
  const formData = await request.formData();
  const text = formData.get('text') as string;

  // Check if the text is empty
  if (!text || text.trim().length === 0) {
    return { status: 'error', message: 'Text is required', snippet: null };
  }
  // Check if the word count is below the limit
  if (!isWordsCountMoreThan(text, 30)) {
    return {
      status: 'error',
      message: 'Text must be at least 30 words',
      snippet: null,
    };
  }

  try {
    const snippet = (await callAPIServer('/snippets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text }),
    })) as Snippet;

    return {
      status: 'success',
      message: 'Snippet created successfully',
      snippet,
    };
  } catch (error) {
    console.error(error);

    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to create snippet',
      snippet: null,
    };
  }
}

export default function Index() {
  return <CreateSnippet />;
}
