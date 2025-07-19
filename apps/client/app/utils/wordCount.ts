export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

export function isWordsCountMoreThan(text: string, limit: number): boolean {
  return countWords(text) > limit;
}