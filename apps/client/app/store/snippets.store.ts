import { create } from 'zustand';

import { Snippet } from '@ai-snippet-service/shared';

// Define the states, setters, and actions for the snippet store
interface SnippetStore {
  // states
  snippets: Snippet[];
  selectedSnippet: Snippet | null;

  // actions
  setSnippets: (snippets: Snippet[]) => void;
  setSelectedSnippet: (snippet: Snippet | null) => void;
}

export const useSnippetStore = create<SnippetStore>((set) => ({
  snippets: [],
  selectedSnippet: null,
  setSnippets: (snippets) => set({ snippets }),
  setSelectedSnippet: (snippet) => set({ selectedSnippet: snippet }),
}));