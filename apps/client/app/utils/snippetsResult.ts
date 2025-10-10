import { Snippet } from "@ai-snippet-service/shared";

type Status = 'success' | 'error';
type Message = string | null;

export interface SnippetsResult {
  status: Status;
  message: Message;
  snippets: Snippet[] | null;
}

export interface SnippetResult {
  status: Status;
  message: Message;
  snippet: Snippet | null;
}
