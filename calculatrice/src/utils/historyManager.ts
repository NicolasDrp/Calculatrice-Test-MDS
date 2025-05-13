export type HistoryEntry = {
  expression: string;
  result: string;
};

export const addToHistory = (
  history: HistoryEntry[],
  expression: string,
  result: string
): HistoryEntry[] => {
  return [...history, { expression, result }];
};

export const clearHistory = (): HistoryEntry[] => {
  return [];
};
