import { useLoaderData } from '@remix-run/react';

import { Snippet } from '@ai-snippet-service/shared/snippets/snippet.model';
import { callAPIServer } from '~/utils/apiServer';

import SnippetDetails from '~/components/SnippetDetails';
import { LoaderFunctionArgs } from '@remix-run/node';

interface Result {
  status: 'success' | 'error';
  message: string | null;
  snippet: Snippet | null;
}

export async function loader({params}: LoaderFunctionArgs): Promise<Result> {
  try {
    const snippet = (await callAPIServer(`/snippets/${params.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })) as Snippet;

    return {
      status: 'success',
      message: 'Snippet has been loaded',
      snippet,
    };
  } catch (error) {
    console.error(error);

    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to load snippet',
      snippet: null,
    };
  }
}

export default function List() {
  const result = useLoaderData<Result>();

  return <SnippetDetails result={result} />;
}
