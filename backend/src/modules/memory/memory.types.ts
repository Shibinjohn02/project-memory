export const MEMORY_TYPES = [
  "decision",
  "action-item",
  "fact",
  "risk",
  "constraint",
  "open-question",
] as const;

export type MemoryType = typeof MEMORY_TYPES[number];

export interface CreateMemory {
  documentId: number;
  type: MemoryType;
  content: string;
  metadata: Record<string, unknown>;
}