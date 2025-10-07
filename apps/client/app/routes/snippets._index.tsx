import { Snippet } from '@ai-snippet-service/shared/snippets/snippet.model';
import { callAPIServer } from '~/utils/apiServer';

import SnippetsList from '~/components/SnippetsList';
import { SnippetsResult } from '~/utils/snippetsResult';


export async function loader(): Promise<SnippetsResult> {
  try {
    const snippets = (await callAPIServer('/snippets', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })) as Snippet[];

    return {
      status: 'success',
      message: 'Snippets list have been loaded',
      snippets,
    };
  } catch (error) {
    console.error(error);

    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to load snippets',
      snippets: null,
    };
  }
}

export default function List() {
  return <SnippetsList />;
}
